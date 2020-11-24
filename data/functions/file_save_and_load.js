
/* Functions:
	getCharacterInfo
	saveTextAsFile
	destroyClickedElement
	loadFileAsText
	parseFile
	setCharacterInfo
*/

// getCharacterInfo - Gets character info and converts it to text format
// return: the formatted text
// ---------------------------------
function getCharacterInfo() {
	var not_applicable = [
		0,1,2,3,	// TODO: Fix, these should never be variable names (is an array being treated as a regular variable somewhere?)
		'getSkillData','getBuffData','getSkillDamage','skill_layout','weapon_frames','wereform_frames','fcr_bp','fcr_bp_alt','fcr_bp_werebear','fcr_bp_werewolf','fhr_bp','fhr_bp_alt','fhr_bp_werebear','fhr_bp_werewolf','fbr_bp','fbr_bp_alt','fbr_bp_werebear','fbr_bp_werewolf',
		'name','type','rarity','not','only','ctc','cskill','set_bonuses','group','size','upgrade','downgrade','aura','tier','weapon','armor','shield','max_sockets','duration','nonmetal','debug'	// TODO: Prevent item qualities from being added as character qualities
	];
	var charInfo = "{character:{";
	for (stat in character) {
		var halt = 0;
		for (let i = 0; i < not_applicable.length; i++) { if (stat == not_applicable[i]) { halt = 1 } }
		if (isNaN(Number(stat)) == false && character[stat] == "undefined") { halt = 1 }	// TODO: determine why numbers are being added to character (especially 0,1,2,3 which are being defined as NaN instead of just undefined)
		if ((typeof(unequipped[stat]) != 'undefined' && character[stat] == unequipped[stat]) || unequipped[stat] == "") { halt = 1 }
		if (halt == 0 || stat == "statpoints" || stat == "strength_added" || stat == "dexterity_added" || stat == "vitality_added" || stat == "energy_added" || stat == "strength" || stat == "dexterity" || stat == "vitality" || stat == "energy" || stat == "life" || stat == "mana" || stat == "stamina" || stat == "mana_regen") { charInfo += (stat+":"+character[stat]+",") }
	}
	charInfo += "},skills:["
	for (let s = 0; s < skills.length; s++) { charInfo += "["+skills[s].level+","+skills[s].extra_levels+","+skills[s].force_levels+"]," }
	charInfo += "],equipped:{"
	for (group in corruptsEquipped) { charInfo += (group+":{name:"+equipped[group].name+",tier:"+equipped[group].tier+"},") }
	charInfo += "charms:["
	for (charm in equipped.charms) { if (typeof(equipped.charms[charm].name) != 'undefined' && equipped.charms[charm].name != 'none') { charInfo += "'"+equipped.charms[charm].name+"'," } }
	charInfo += "]},corruptsEquipped:{"
	for (group in corruptsEquipped) { charInfo += (group+":{name:'"+corruptsEquipped[group].name+"'},") }
	charInfo += "},mercEquipped:{"
	for (group in mercEquipped) { charInfo += (group+":{name:'"+mercEquipped[group].name+"'},") }
	charInfo += "},socketed:{"
	for (group in socketed) {
		charInfo += group+":["
		for (let i = 0; i < socketed[group].items.length; i++) { charInfo += ("name:{'"+socketed[group].items[i].name+"'},") }
		charInfo += "],"
	}
	charInfo += "},effects:{"
	for (id in effects) { if (typeof(effects[id].info.enabled) != 'undefined') {
		charInfo += (id+":{enabled:"+effects[id].info.enabled+",snapshot:"+effects[id].info.snapshot)
		if (effects[id].info.snapshot == 1) {
			charInfo += (",origin:"+effects[id].info.origin+",index:"+effects[id].info.index)
			for (affix in effects[id]) { if (affix != "info") {
				charInfo += (","+affix+":"+effects[id][affix])
			} }
		}
		charInfo += "},"
	} }
	charInfo += "},selectedSkill:["+selectedSkill[0]+","+selectedSkill[1]
	charInfo += "],mercenary:'"+mercenary.name+"'"
	charInfo += ",settings:{coupling:"+settings.coupling+",autocast:"+settings.autocast
	charInfo += "},ironGolem:"+golemItem.name
	charInfo += "}"
	return charInfo
}

// saveTextAsFile - Saves the current character info as a text file
// ---------------------------------
function saveTextAsFile() {
	document.getElementById("inputTextToSave").value = getCharacterInfo().split(",}").join("}").split(",]").join("]")
	fileText = getCharacterInfo().split(",}").join("}").split(",]").join("]")

	var textToSave = document.getElementById("inputTextToSave").value;
	var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
	var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
	
	var file_prefix = "pod_"; if (game_version == 3) { file_prefix = "pd2_" }
	var downloadLink = document.createElement("a");
	downloadLink.download = file_prefix+character.class_name.toLowerCase();
	downloadLink.innerHTML = "Download File";
	downloadLink.href = textToSaveAsURL;
	downloadLink.onclick = destroyClickedElement;
	downloadLink.style.display = "none";
	document.body.appendChild(downloadLink);

	downloadLink.click();
	document.getElementById("inputTextToSave").value = ""
}

// destroyClickedElement - removes the file window popup (after save)
// ---------------------------------
function destroyClickedElement(event) {
	document.body.removeChild(event.target);
}

// loadFileAsText - Loads character info from a text file
// ---------------------------------
function loadFileAsText() {
	var fileToLoad = document.getElementById("fileToLoad").files[0];
	var textFromFileLoaded = "";
	var fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent) {
		textFromFileLoaded = fileLoadedEvent.target.result;
		document.getElementById("inputTextToSave").value = fileLoadedEvent.target.result;
		parseFile(textFromFileLoaded)
		setCharacterInfo(fileInfo.character.class_name.toLowerCase())
	};
	fileReader.readAsText(fileToLoad, "UTF-8");
}

// parseFile - Processes the text and converts it back to useable data
//	file: text from file
// ---------------------------------
function parseFile(file) {
	fileInfo = {character:{class_name:""},skills:[],equipped:{charms:[]},corruptsEquipped:{},mercEquipped:{},socketed:{helm:[],armor:[],weapon:[],offhand:[]},effects:{},selectedSkill:["",""],mercenary:"",settings:{},ironGolem:""};	// reset fileInfo

	var new_character = file.split("character:{")[1].split("},skills:")[0].split(",");
	for (let i = 0; i < new_character.length; i++) {
		var split = new_character[i].split(":");
		var val = split[1];
		if (isNaN(Number(val)) == false) { val = Number(val) }
		fileInfo.character[split[0]] = val
	}
	var new_skills = file.split("skills:[[")[1].split("]],equipped:")[0].split("],[");
	for (let s = 0; s < new_skills.length; s++) {
		if (typeof(fileInfo.skills[s]) == 'undefined') { fileInfo.skills[s] = [] }
		fileInfo.skills[s][0] = ~~new_skills[s].split(",")[0]
		fileInfo.skills[s][1] = ~~new_skills[s].split(",")[1]
		fileInfo.skills[s][2] = ~~new_skills[s].split(",")[2]
	}
	var new_equipped = file.split("equipped:{")[1].split("},charms:")[0].split("},");
	for (let e = 0; e < new_equipped.length; e++) {
		var group = new_equipped[e].split(":{")[0];
		var stats = new_equipped[e].split(":{")[1].split(",");
		fileInfo.equipped[group] = {}
		for (let i = 0; i < stats.length; i++) {
			var stat = stats[i].split(":")[0];
			var value = stats[i].split(":")[1];
			fileInfo.equipped[group][stat] = value
		}
	}
	var new_corruptions = file.split("corruptsEquipped:{")[1].split(",mercEquipped:")[0].split(",");
	for (let e = 0; e < new_corruptions.length; e++) {
		var group = new_corruptions[e].split(":{")[0];
		var name = new_corruptions[e].split("name:'")[1].split("'}")[0];
		fileInfo.corruptsEquipped[group] = {}
		fileInfo.corruptsEquipped[group].name = name
	}
	var new_socketed = file.split("socketed:{")[1].split("},effects:")[0].split("],");
	for (let g = 0; g < new_socketed.length; g++) {
		var group = new_socketed[g].split(":[")[0];
		var new_socketedGroup = new_socketed[g].split(":[")[1].split("'},");
		for (let i = 0; i < new_socketedGroup.length; i++) {
			var name = new_socketedGroup[i].split(":{'")[1].split("'}")[0];
			fileInfo.socketed[group][i] = name
		}
	}
	var new_effects = file.split("effects:{")[1].split("},selectedSkill:")[0];
	if (new_effects != "") {
		new_effects = file.split("effects:{")[1].split("}},selectedSkill:")[0].split("},");
		for (let i = 0; i < new_effects.length; i++) {
			var id = new_effects[i].split(":{")[0];
			var stats = new_effects[i].split(":{")[1].split(",")
			fileInfo.effects[id] = {}
			fileInfo.effects[id].info = {}
			for (let t = 0; t < stats.length; t++) {
				var stat = stats[t].split(":")[0];
				var value = stats[t].split(":")[1];
				if (stat == "enabled" || stat == "snapshot" || stat == "index") {
					fileInfo.effects[id].info[stat] = ~~value
				} else if (stat == "origin") {
					fileInfo.effects[id].info[stat] = value
				} else {
					fileInfo.effects[id][stat] = ~~value
				}
			}
		}
	}
	var new_mercenary = file.split("mercenary:'")[1].split("',settings:")[0];
	fileInfo.mercenary = new_mercenary
	var new_mercEquipped = file.split("mercEquipped:{")[1].split("},socketed:")[0].split(",");
	for (let e = 0; e < new_mercEquipped.length; e++) {
		var group = new_mercEquipped[e].split(":{name:'")[0];
		var name = new_mercEquipped[e].split(":{name:'")[1].split("'}")[0];
		fileInfo.mercEquipped[group] = {}
		fileInfo.mercEquipped[group].name = name
	}
	var new_selectedSkill = file.split("selectedSkill:[")[1].split("],mercenary:")[0].split(",");
	fileInfo.selectedSkill[0] = new_selectedSkill[0]
	fileInfo.selectedSkill[1] = new_selectedSkill[1]
	var new_settings = file.split("settings:{")[1].split("},ironGolem")[0].split(",");
	for (let i = 0; i < new_settings.length; i++) {
		var setting = new_settings[i].split(":")[0];
		var value = new_settings[i].split(":")[1];
		fileInfo.settings[setting] = value
	}
	var new_charms = file.split("charms:[")[1].split("]},corruptsEquipped:")[0]
	if (new_charms.length > 0) {
		new_charms = file.split("charms:['")[1].split("']},corruptsEquipped:")[0].split("','");
		for (let i = 0; i < new_charms.length; i++) { fileInfo.equipped.charms[i] = new_charms[i] }
	}
	var new_golem = file.split("ironGolem:")[1].split("}")[0];
	fileInfo.ironGolem = new_golem
}

// setCharacterInfo - Sets character info from loaded text
//	className: name of character class
// ---------------------------------
function setCharacterInfo(className) {
	startup(className)
	if (settings.coupling == 0) { document.getElementById("coupling").checked = true; toggleCoupling(document.getElementById("coupling")); }
	if (settings.autocast == 0) { document.getElementById("autocast").checked = true; toggleAutocast(document.getElementById("autocast")); }
	if (character.difficulty != fileInfo.character.difficulty) { document.getElementById("difficulty3").checked = false; document.getElementById("difficulty"+fileInfo.character.difficulty).checked = true; changeDifficulty(fileInfo.character.difficulty) }
	if (character.running != fileInfo.character.running) { document.getElementById("running").checked = true; toggleRunning(document.getElementById("running")) }
	if (character.quests_completed != fileInfo.character.quests_completed) { document.getElementById("quests").checked = true; toggleQuests(document.getElementById("quests")) }
	for (let s = 0; s < skills.length; s++) { if (~~fileInfo.skills[s][0] > 0) { skillUp(null,skills[s],~~fileInfo.skills[s][0]) } }
	skillOut()
	for (group in corruptsEquipped) {
		var options = document.getElementById("dropdown_"+group).options;
		for (let i = 0; i < options.length; i++) { if (options[i].innerHTML == fileInfo.equipped[group].name) {  document.getElementById("dropdown_"+group).selectedIndex = i } }
		equip(group,fileInfo.equipped[group].name)
	}
	for (group in corruptsEquipped) {
		var options = document.getElementById("corruptions_"+group).options;
		for (let i = 0; i < options.length; i++) { if (options[i].innerHTML == fileInfo.corruptsEquipped[group].name) {  document.getElementById("corruptions_"+group).selectedIndex = i } }
		corrupt(group,fileInfo.corruptsEquipped[group].name)
	}
	for (group in corruptsEquipped) {
		var baseDiff = ~~fileInfo.equipped[group].tier - ~~equipped[group].tier;
		if (baseDiff < 0) { changeBase(group, "downgrade"); equipmentOut() }
		if (baseDiff > 0) { changeBase(group, "upgrade"); equipmentOut() }
	}
	for (group in corruptsEquipped) {
		var baseDiff = ~~fileInfo.equipped[group].tier - ~~equipped[group].tier;
		if (baseDiff < 0) { changeBase(group, "downgrade"); equipmentOut() }	// duplicated (things break for some reason when a while/for loop is used instead)
		if (baseDiff > 0) { changeBase(group, "upgrade"); equipmentOut() }		// duplicated (things break for some reason when a while/for loop is used instead)
	}
	character.level = fileInfo.character.level
	//for (let i = 1; i < fileInfo.character.level, i++) { changeLevel(null,1) }
	setMercenary(fileInfo.mercenary)
	for (group in mercEquipped) {
		if (fileInfo.mercEquipped[group].name != 'none') {
			var options = document.getElementById("dropdown_merc_"+group).options;
			for (let i = 0; i < options.length; i++) { if (options[i].innerHTML == fileInfo.mercEquipped[group].name) {  document.getElementById("dropdown_merc_"+group).selectedIndex = i } }
			equipMerc(group,fileInfo.mercEquipped[group].name)
		}
	}
	for (group in fileInfo.socketed) { for (let i = 0; i < fileInfo.socketed[group].length; i++) { if (fileInfo.socketed[group][i] != "") { addSocketable(fileInfo.socketed[group][i]); inv[tempSetup].load = group; tempSetup = 0; } } }
	for (let s = 1; s < inv[0].in.length; s++) { if (inv[s].empty != 1) { inv[0].onpickup = inv[0].in[s]; handleSocket(null,inv[s].load,s); } }	// socketables get moved to equipment
	for (effect in fileInfo.effects) { for (let i = 1; i < non_items.length; i++) {
		if (effect == non_items[i].effect) { addEffect('misc',non_items[i].name,i,'') }
	} }
	for (let i = 0; i < fileInfo.equipped.charms.length; i++) { addCharm(fileInfo.equipped.charms[i]) }
	for (let s = 0; s < skills.length; s++) { skills[s].level = ~~fileInfo.skills[s][0]; skills[s].extra_levels = ~~fileInfo.skills[s][1]; skills[s].force_levels = ~~fileInfo.skills[s][2]; }
	var options = document.getElementById("dropdown_golem").options;
	for (let i = 0; i < options.length; i++) { if (options[i].innerHTML == fileInfo.ironGolem) { document.getElementById("dropdown_golem").selectedIndex = i } }
	setIronGolem(fileInfo.ironGolem)
	selectedSkill[0] = fileInfo.selectedSkill[0]
	selectedSkill[1] = fileInfo.selectedSkill[1]
	for (effect in fileInfo.effects) { if (typeof(fileInfo.effects[effect].info.snapshot) != 'undefined') { if (fileInfo.effects[effect].info.snapshot == 1) {
		var active = 0;
		var new_effect = 0;
		if (typeof(effects[effect]) != 'undefined') {
			if (fileInfo.effects[effect].info.enabled == 1) { active = 1; toggleEffect(effect); }
		} else {
			new_effect = 1;
			var info = fileInfo.effects[effect].info;
			if (info.origin == "skill") { skills[info.index].level += 1 }
			if (info.origin == "oskill") { character["oskill_"+effect] += 1 }
			addEffect(info.origin,effect.split('_').join(' '),info.index,"")	// addEffect() doesn't work with zero skill levels, so this implementation is 'hacky'
			if (fileInfo.effects[effect].info.enabled == 1) { active = 1; toggleEffect(effect); }
		}
			effects[effect].info.snapshot = 1;
			document.getElementById(effect+"_ss").src = "./images/skills/snapshot.png";
			for (affix in fileInfo.effects[effect]) { if (affix != "info") {
				effects[effect][affix] = fileInfo.effects[effect][affix]
			} }
			if (active == 1) { toggleEffect(effect) }
			if (new_effect == 1) {
				var info = fileInfo.effects[effect].info;
				if (info.origin == "skill") { skills[info.index].level -= 1 }
				if (info.origin == "oskill") { character["oskill_"+effect] -= 1 }
			}
	} } }
	if (effects != {}) { for (effect in effects) { if (typeof(effects[effect].info.enabled) != 'undefined') { if (fileInfo.effects[effect].info.enabled != effects[effect].info.enabled) { toggleEffect(effect) } } } }
	for (stat in fileInfo.character) { character[stat] = fileInfo.character[stat] }
	if (settings.coupling != fileInfo.settings.coupling) { if (settings.coupling == 1) { document.getElementById("coupling").checked = false }; toggleCoupling(document.getElementById("coupling")) }
	if (settings.autocast != fileInfo.settings.autocast) { if (settings.autocast == 1) { document.getElementById("autocast").checked = false }; toggleAutocast(document.getElementById("autocast")) }
	//updateStats()
	document.getElementById("inputTextToSave").value = ""
	update()
	var class_names = ["","amazon","assassin","barbarian","druid","necromancer","paladin","sorceress"];
	for (let c = 1; c < class_names.length; c++) { if (character.class_name.toLowerCase() == class_names[c]) { document.getElementById("dropdown_class").selectedIndex = c } }
}
