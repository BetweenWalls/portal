
fileInfo = {character:{class_name:""},skills:[],equipped:{charms:[]},corruptsEquipped:{},mercEquipped:{},socketed:{helm:[],armor:[],weapon:[],offhand:[]},effects:{},selectedSkill:["",""],mercenary:"",settings:{},ironGolem:""};
fileText = "";
character = {};
var skill_bonuses = {stamina_skillup:0, frw_skillup:0, defense_skillup:0, resistance_skillup:0, cstrike_skillup:0, ar_skillup:0, pierce_skillup:0, fRes_skillup:0, cRes_skillup:0, lRes_skillup:0, pRes_skillup:0, block_skillup:0, velocity_skillup:0, edged_damage:0, edged_ar:0, edged_cstrike:0, pole_damage:0, pole_ar:0, pole_cstrike:0, blunt_damage:0, blunt_ar:0, blunt_cstrike:0, thrown_damage:0, thrown_ar:0, thrown_pierce:0, claw_damage:0, claw_ar:0, claw_cstrike:0};
var base_stats = {level:1, skillpoints:0, statpoints:0, quests_completed:-1, running:-1, difficulty:3, strength_added:0, dexterity_added:0, vitality_added:0, energy_added:0, fRes_penalty:100, cRes_penalty:100, lRes_penalty:100, pRes_penalty:100, mRes_penalty:100, fRes:0, cRes:0, lRes:0, pRes:0, mRes:0, fRes_max_base:75, cRes_max_base:75, lRes_max_base:75, pRes_max_base:75, mRes_max_base:75, set_bonuses:[0,0,{},{},{},{},{}]}

var effects = {};
var duplicateEffects = {};
var skillList = []; var skillOptions = [];
var selectedSkill = [" ­ ­ ­ ­ Skill 1", " ­ ­ ­ ­ Skill 2"];

var offhandSetup = "";		// temporary variable
var tempSetup = 0;			// temporary variable
var mercenary = {name:"",level:1,base_aura:"",base_aura_level:1};
var offhandType = "none";
var lastCharm = "";			// last charm on mouse-over
var lastSocketable = "";	// last gem/rune/jewel on mouse-over
var lastSelected = "";
var settings = {coupling:1, autocast:1}
var monsterID = 2;
var MAX = 20;				// Highest Skill Hardpoints
var LIMIT = 60;				// Highest Skill Data
var RES_CAP = 95;

var socketed = {	// Gems/Runes/Jewels Socketed in Equipment
	helm:{sockets:0, socketsFilled:0, totals:{}, items:[{id:"",name:""},{id:"",name:""},{id:"",name:""}]},
	armor:{sockets:0, socketsFilled:0, totals:{}, items:[{id:"",name:""},{id:"",name:""},{id:"",name:""},{id:"",name:""}]},
	weapon:{sockets:0, socketsFilled:0, totals:{}, items:[{id:"",name:""},{id:"",name:""},{id:"",name:""},{id:"",name:""},{id:"",name:""},{id:"",name:""}]},
	offhand:{sockets:0, socketsFilled:0, totals:{}, items:[{id:"",name:""},{id:"",name:""},{id:"",name:""},{id:"",name:""},{id:"",name:""},{id:"",name:""}]},
};

var inv = [		// Charm Inventory
{onpickup:"?",pickup_x:0,pickup_y:0,empty:1,charms:[],in:["",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},
{x:1,y:1,empty:1,load:"",id:"h11"},{x:1,y:1,empty:1,load:"",id:"h21"},{x:1,y:1,empty:1,load:"",id:"h31"},{x:1,y:1,empty:1,load:"",id:"h41"},{x:1,y:1,empty:1,load:"",id:"h51"},{x:1,y:1,empty:1,load:"",id:"h61"},{x:1,y:1,empty:1,load:"",id:"h71"},{x:1,y:1,empty:1,load:"",id:"h81"},{x:1,y:1,empty:1,load:"",id:"h91"},{x:1,y:1,empty:1,load:"",id:"h01"},
{x:1,y:1,empty:1,load:"",id:"h12"},{x:1,y:1,empty:1,load:"",id:"h22"},{x:1,y:1,empty:1,load:"",id:"h32"},{x:1,y:1,empty:1,load:"",id:"h42"},{x:1,y:1,empty:1,load:"",id:"h52"},{x:1,y:1,empty:1,load:"",id:"h62"},{x:1,y:1,empty:1,load:"",id:"h72"},{x:1,y:1,empty:1,load:"",id:"h82"},{x:1,y:1,empty:1,load:"",id:"h92"},{x:1,y:1,empty:1,load:"",id:"h02"},
{x:1,y:1,empty:1,load:"",id:"h13"},{x:1,y:1,empty:1,load:"",id:"h23"},{x:1,y:1,empty:1,load:"",id:"h33"},{x:1,y:1,empty:1,load:"",id:"h43"},{x:1,y:1,empty:1,load:"",id:"h53"},{x:1,y:1,empty:1,load:"",id:"h63"},{x:1,y:1,empty:1,load:"",id:"h73"},{x:1,y:1,empty:1,load:"",id:"h83"},{x:1,y:1,empty:1,load:"",id:"h93"},{x:1,y:1,empty:1,load:"",id:"h03"},
{x:1,y:1,empty:1,load:"",id:"h14"},{x:1,y:1,empty:1,load:"",id:"h24"},{x:1,y:1,empty:1,load:"",id:"h34"},{x:1,y:1,empty:1,load:"",id:"h44"},{x:1,y:1,empty:1,load:"",id:"h54"},{x:1,y:1,empty:1,load:"",id:"h64"},{x:1,y:1,empty:1,load:"",id:"h74"},{x:1,y:1,empty:1,load:"",id:"h84"},{x:1,y:1,empty:1,load:"",id:"h94"},{x:1,y:1,empty:1,load:"",id:"h04"}
];

var colors = {
	White:"#dddddd",
	Gray:"#707070",
	Blue:"#6666bb",	
	Yellow:"#cccc77",
	Gold:"#9b885e",
	Green:"#00f000",
	DarkGreen:"#255d16",
	Tan:"#9b8c6d",
	Black:"Black",
	Orange:"#c48736",
	Purple:"#9b2aea",
	Red:"#cc6666",
	Indigo:"#9980ff"
};

// update - Updates everything
// ---------------------------------
function update() {
	checkOffhand()
	calculateSkillAmounts()
	updateStats()
	checkRequirements()
	updateSkills()
	if (selectedSkill[0] != " ­ ­ ­ ­ Skill 1") { checkSkill(selectedSkill[0], 1) }
	if (selectedSkill[1] != " ­ ­ ­ ­ Skill 2") { checkSkill(selectedSkill[1], 2) }
	checkIronGolem()
}

// getCharacterInfo - 
// return: 
// ---------------------------------
function getCharacterInfo() {
	var not_applicable = [0,1,2,3,'getSkillData','getBuffData','getSkillDamage','weapon_frames','wereform_frames','skill_layout','name','type','rarity','not','only','ctc','cskill','set_bonuses','group','size','upgrade','downgrade','aura','tier','weapon','armor','shield','max_sockets','duration','nonmetal','debug'];	// TODO: Prevent item qualities from being added as character qualities
	var charInfo = "{character:{";
	for (stat in character) {
		var halt = 0;
		for (let i = 0; i < not_applicable.length; i++) { if (stat == not_applicable[i]) { halt = 1 } }
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

// saveTextAsFile - 
// ---------------------------------
function saveTextAsFile() {
	document.getElementById("inputTextToSave").value = getCharacterInfo().split(",}").join("}").split(",]").join("]")
	fileText = getCharacterInfo().split(",}").join("}").split(",]").join("]")

	var textToSave = document.getElementById("inputTextToSave").value;
	var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
	var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);

	var downloadLink = document.createElement("a");
	downloadLink.download = "pod_"+character.class_name.toLowerCase();
	downloadLink.innerHTML = "Download File";
	downloadLink.href = textToSaveAsURL;
	downloadLink.onclick = destroyClickedElement;
	downloadLink.style.display = "none";
	document.body.appendChild(downloadLink);

	downloadLink.click();
	document.getElementById("inputTextToSave").value = ""
}

// destroyClickedElement - 
// ---------------------------------
function destroyClickedElement(event) {
	document.body.removeChild(event.target);
}

// loadFileAsText - 
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

// parseFile - 
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

// setCharacterInfo - 
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
	checkSkill(fileInfo.selectedSkill[0], 1)
	checkSkill(fileInfo.selectedSkill[1], 2)
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

// loadMonsters - 
// ---------------------------------
function loadMonsters() {
	var choices = '';
	for (mon in MonStats) {
		if (MonStats[mon][0] == 0) {
			var mon_id = MonStats[mon][1];
			var mon_name = MonStats[mon][2];
			var ex = MonStats[mon][13][MonStats[mon][13].length-1];
			var special = 0;
			if (ex != "1" && ex != "2" && ex != "3" && ex != "4" && ex != "5" && ex != "6" && ex != "7" && ex != "8" && ex != "9" && ex != "10") { special = 1 }
			if (special == 0 && ex == 1 && mon_id < 575) {
				choices += '<div class="nav-dropdown-content-item"><div class="nav-option"><input id="mon'+mon_id+'" type="radio" name="mon" onclick="changeMonster(this.id);"><label for="mon" onclick="changeMonster('+"'mon"+mon_id+"'"+');">'+mon_name+'</label></div></div>'
			}
			// TODO: Adjust selection menu to reduce displayed length - separate monsters by act?
		}
	}
	document.getElementById("monsters").innerHTML = choices
}

// loadEquipment - Loads equipment/charm info to the appropriate dropdowns
//	className: name of character class
// ---------------------------------
function loadEquipment(className) {
	var equipmentGroups = ["helm", "armor", "gloves", "boots", "belt", "amulet", "ring1", "ring2", "weapon", "offhand", "charms"];
	var equipmentDropdowns = ["dropdown_helm", "dropdown_armor", "dropdown_gloves", "dropdown_boots", "dropdown_belt", "dropdown_amulet", "dropdown_ring1", "dropdown_ring2", "dropdown_weapon", "dropdown_offhand", "dropdown_charms"]
	for (let i = 0; i < equipmentGroups.length; i++) { loadItems(equipmentGroups[i], equipmentDropdowns[i], className) }
	loadMisc()
	loadMerc()
	loadCorruptions()
	loadSocketables()
	loadGolem()
}

// loadItems - Creates a dropdown menu option
//	group: equipment's group
//	dropdown: name of the dropdown to edit
//	className: name of the character class
// ---------------------------------
function loadItems(group, dropdown, className) {
	if (group.length == 0) { document.getElementById(dropdown).innerHTML = "<option></option>" }
	else {
		var choices = "";
		var choices_offhand = "";
		for (itemNew in equipment[group]) {
			var item = equipment[group][itemNew];
			if (typeof(item.only) == 'undefined' || item.only == className) {
				var halt = 0;
				if (className == "clear") { halt = 1 }
				if (typeof(item.not) != 'undefined') { for (let l = 0; l < item.not.length; l++) { if (item.not[l] == className) { halt = 1 } } }
				if (className == "Rogue Scout") { if (group == "offhand" || (group == "weapon" && item.type != "bow" && item.type != "crossbow" && item.name != "Weapon")) { halt = 1 } }
				if (className == "Desert Guard") { if (group == "offhand" || (group == "weapon" && item.type != "polearm" && item.type != "spear" && item.name != "Weapon")) { halt = 1 } }
				if (className == "Iron Wolf") { if ((group == "offhand" && item.type != "shield" && item.name != "Offhand") || (group == "weapon" && (item.type != "sword" || typeof(item.twoHanded) != 'undefined') && item.name != "Weapon")) { halt = 1 } }
				if (className == "Barb (merc)") { if (group == "offhand" || (group == "weapon" && item.type != "sword" && item.name != "Weapon")) { halt = 1 } }
				if (halt == 0) {
					var addon = "";
					if (choices == "") {
						if (group != "charms") { addon = "<option selected>" + "­ ­ ­ ­ " + item.name + "</option>" }
						else { addon = "<option disabled selected>" + "­ ­ ­ ­ " + item.name + "</option>" }
					} else {
						if (typeof(item.debug) != 'undefined') { addon = "<option class='dropdown-debug'>" + item.name + "</option>" }
						else if (typeof(item.rarity) != 'undefined') { addon = "<option class='dropdown-"+item.rarity+"'>" + item.name + "</option>" }
						else { addon = "<option class='dropdown-unique'>" + item.name + "</option>" }
					}
					choices += addon
					if (className == "assassin" && item.name == "Offhand") { choices += offhandSetup }	// weapons inserted into offhand dropdown list
					if (className == "assassin" && item.type == "claw") { choices_offhand += addon }
					if (className == "barbarian" && item.name != "Weapon" && (typeof(item.twoHanded) == 'undefined' || item.twoHanded != 1 || item.type == "sword")) { choices_offhand += addon }
				}
			}
		}
		if (group == "weapon") { offhandSetup = choices_offhand }
		if (className == "barbarian" && group == "offhand") { choices += offhandSetup }	// weapons inserted into offhand dropdown list
		document.getElementById(dropdown).innerHTML = choices
	}
}

// loadMisc - Loads non-item effects to the 'Miscellaneous' dropdown menu
// ---------------------------------
function loadMisc() {
	var choices = "<option class='gray' disabled selected>­ ­ ­ ­ Miscellaneous</option>";
	for (let m = 1; m < non_items.length; m++) { choices += "<option>" + non_items[m].name + "</option>" }
	document.getElementById("dropdown_misc").innerHTML = choices
}

// loadSocketables - Loads jewels, runes, and gems to the 'Socketables' dropdown menu
// ---------------------------------
function loadSocketables() {
	var choices = "<option class='gray' disabled selected>­ ­ ­ ­ Socketables</option>";
	for (let m = 1; m < socketables.length; m++) {
		if (socketables[m].type == "rune") { choices += "<option class='dropdown-craft'>" + socketables[m].name + "</option>" }
		else if (typeof(socketables[m].rarity) != 'undefined') { choices += "<option class='dropdown-"+socketables[m].rarity+"'>" + socketables[m].name + "</option>" }
		else { choices += "<option>" + socketables[m].name + "</option>" }
	}
	document.getElementById("dropdown_socketables").innerHTML = choices
}

// loadMerc - Loads mercenaries to the 'Mercenary' dropdown menu
// ---------------------------------
function loadMerc() {
	var choices = "<option>­ ­ ­ ­ Mercenary</option>";
	for (let m = 1; m < mercenaries.length; m++) { choices += "<option>" + mercenaries[m].name + "</option>" }
	document.getElementById("dropdown_mercenary").innerHTML = choices
}

// setMercenary - Handles mercenary selection, including adding auras and loading mercenary items to the appropriate dropdown menus
//	merc: selected mercenary name
// ---------------------------------
function setMercenary(merc) {
	var mercEquipmentGroups = ["helm", "armor", "weapon", "offhand"];
	var mercEquipmentDropdowns = ["dropdown_merc_helm", "dropdown_merc_armor", "dropdown_merc_weapon", "dropdown_merc_offhand"];
	if (document.getElementById("dropdown_merc_helm").innerHTML != "") { equipMerc('helm', 'helm'); }
	if (document.getElementById("dropdown_merc_armor").innerHTML != "") { equipMerc('armor', 'armor'); }
	if (document.getElementById("dropdown_merc_weapon").innerHTML != "") { equipMerc('weapon', 'weapon'); }
	if (document.getElementById("dropdown_merc_offhand").innerHTML != "") { equipMerc('offhand', 'offhand'); }
	if (mercenary.base_aura != "") { removeEffect(mercenary.base_aura.split(' ').join('_')+"-mercenary"); mercenary.base_aura = ""; }
	var mercType = merc;
	if (merc == "none" || merc == "­ ­ ­ ­ Mercenary") {
		for (let i = 0; i < mercEquipmentGroups.length; i++) { loadItems(mercEquipmentGroups[i], mercEquipmentDropdowns[i], "clear") }
		document.getElementById("dropdown_mercenary").selectedIndex = 0;
	} else {
		if (merc == mercenaries[1].name) { mercType = "Rogue Scout" }
		if (merc == mercenaries[2].name || merc == mercenaries[3].name || merc == mercenaries[4].name) { mercType = "Desert Guard" }
		if (merc == mercenaries[5].name || merc == mercenaries[6].name || merc == mercenaries[7].name) { mercType = "Iron Wolf" }
		if (merc == mercenaries[8].name) { mercType = "Barb (merc)" }
		for (let i = 0; i < mercEquipmentGroups.length; i++) { loadItems(mercEquipmentGroups[i], mercEquipmentDropdowns[i], mercType) }
		for (let m = 1; m < mercenaries.length; m++) {
			if (merc == mercenaries[m].name) { document.getElementById("dropdown_mercenary").selectedIndex = m; if (mercenary.base_aura == "") {
				mercenary.level = Math.max(1,character.level-1)
				mercenary.base_aura_level = getMercenaryAuraLevel(mercenary.level)
				mercenary.base_aura = mercenaries[m].aura
				addEffect("aura",mercenary.base_aura,mercenary.base_aura_level,"mercenary")
			} }
		}
	}
	mercenary.name = merc
	if (document.getElementById("dropdown_merc_helm").innerHTML == "") { document.getElementById("dropdown_merc_helm").style.display = "none" } else { document.getElementById("dropdown_merc_helm").style.display = "block" }
	if (document.getElementById("dropdown_merc_armor").innerHTML == "") { document.getElementById("dropdown_merc_armor").style.display = "none" } else { document.getElementById("dropdown_merc_armor").style.display = "block" }
	if (document.getElementById("dropdown_merc_weapon").innerHTML == "") { document.getElementById("dropdown_merc_weapon").style.display = "none" } else { document.getElementById("dropdown_merc_weapon").style.display = "block" }
	if (document.getElementById("dropdown_merc_offhand").innerHTML == "") { document.getElementById("dropdown_merc_offhand").style.display = "none" } else { document.getElementById("dropdown_merc_offhand").style.display = "block" }
	if (merc == "none" || merc == "­ ­ ­ ­ Mercenary") { document.getElementById("mercenary_spacing").style.display = "none" } else { document.getElementById("mercenary_spacing").style.display = "block" }
	if (mercType == "Iron Wolf") { document.getElementById("mercenary_spacing2").style.display = "block" } else { document.getElementById("mercenary_spacing2").style.display = "none" }
	if (merc == "none" || merc == "­ ­ ­ ­ Mercenary") { document.getElementById("merc_space").style.display = "block" } else { document.getElementById("merc_space").style.display = "none" }
}

// updateMercenary - updates mercenary base aura
// ---------------------------------
function updateMercenary() {
	mercenary.level = Math.max(1,character.level-1)
	if (mercenary.base_aura != "") {
		if (mercenary.base_aura_level != getMercenaryAuraLevel(mercenary.level)) {
			mercenary.base_aura_level = getMercenaryAuraLevel(mercenary.level)
			removeEffect(mercenary.base_aura.split(' ').join('_')+"-mercenary")	// TODO: merge with effect update functions. Use disable/enable instead.
			addEffect("aura",mercenary.base_aura,mercenary.base_aura_level,"mercenary")
		}
	}
}

// getMercenaryAuraLevel - Get mercenary aura level
//	hlvl: level of mercenary (must be lower than clvl)
// return: aura level of mercenary
// ---------------------------------
function getMercenaryAuraLevel(hlvl) {
	var result = 1;
	var diff = 0.23;
	result = Math.min(18,Math.floor((1-diff)+diff*hlvl));
	//if (mercenary.base_aura == "Might") { result = Math.min(3,result) }	// TOCHECK: Confirm whether Barbarian Merc's aura maxes out at level 3 (compared to level 18 for other mercenaries)
	//old calculation for aura level:
	//if (hlvl > 9 && hlvl < 31) { result = (3+((hlvl-9)*10/32)) }
	//else if (hlvl > 30 && hlvl < 55) { result = (10+((hlvl-31)*10/32)) }
	//else if (hlvl > 54) { result = 18 }
	result += ~~mercenary.all_skills + Math.ceil(mercenary.all_skills_per_level*mercenary.level)
	return result;
}

// loadCorruptions - Loads corruption options
// ---------------------------------
function loadCorruptions() {
	var groups = ["helm", "armor", "gloves", "boots", "belt", "amulet", "ring1", "ring2", "weapon", "offhand"];
	for (let i = 0; i < groups.length; i++) {
		var choices = "<option>­ ­ ­ ­ Corruption</option>";
		for (let m = 1; m < corruptions[groups[i]].length; m++) {
			if (groups[i] == "offhand") { if (corruptions[groups[i]][m].base == "shield") { choices += "<option>" + corruptions[groups[i]][m].name + "</option>" } }
			else { choices += "<option>" + corruptions[groups[i]][m].name + "</option>" }
		}
		document.getElementById("corruptions_"+groups[i]).innerHTML = choices
	}
}

// loadGolem - 
// ---------------------------------
function loadGolem() {
	var choices = "<option>­ ­ ­ ­ Iron Golem</option>";
	for (group in corruptsEquipped) {
		for (itemNew in equipment[group]) {
			var item = equipment[group][itemNew];
			var metal = true;
			if (group == "amulet" || group == "ring1" || group == "ring2" || item.type == "quiver" || item.special > 0 || item.rarity == "magic" || item.only == "Desert Guard" || item.only == "Iron Wolf" || item.only == "Barb (merc)" || item.nonmetal == 1) { metal = false }
			else if (typeof(item.base) != 'undefined') { if (typeof(bases[getBaseId(item.base)].nonmetal) != 'undefined') { if (bases[getBaseId(item.base)].nonmetal == 1) { metal = false } } }
			if (metal == true) {
				var addon = "";
				if (item == equipment[group][0]) { addon = "<option class='gray-all' style='color:gray' disabled>" + item.name + "</option>" }
				else if (typeof(item.rarity) != 'undefined') { addon = "<option class='dropdown-"+item.rarity+"'>" + item.name + "</option>" }
				else { addon = "<option class='dropdown-unique'>" + item.name + "</option>" }
				choices += addon
			}
		}
	}
	document.getElementById("dropdown_golem").innerHTML = choices
}

// startup - Resets everything and starts a new character
//	choice: name of new character class
// ---------------------------------
function startup(choice) {
	var character_setup = character_all[choice]
	for (stat in character_setup) { character[stat] = character_setup[stat] }
	//loadMonsters()
	setMercenary("none")
	setIronGolem("none")
	loadEquipment(choice)
	clearIconSources()
	resetEffects()
	resetSkills()
	resetEquipment()
	effects = {}
	calculateSkillAmounts()
	updateSkills()
	document.getElementById("quests").checked = 0
	document.getElementById("running").checked = 0
	document.getElementById("difficulty3").checked = 1
	skills = skills_all[choice]
	for (stat in base_stats) { character[stat] = base_stats[stat] }
	for (stat in unequipped) { character[stat] = unequipped[stat] }
	for (stat in character_setup) { character[stat] = character_setup[stat] }
	setIconSources(choice)
	updateSkillIcons()
	document.getElementById("skill_tree").src = character_setup.skill_layout
	init()
	updateStats()
}

// reset - Calls startup() with the specified class name
//	name: string class name
// ---------------------------------
function reset(name) { startup(name.toLowerCase()); }

// init - Initiates mouse functions
// ---------------------------------
function init() {
	document.getElementById("skillmap").onmouseout = function() {skillOut()};
	for (let s = 0, len = skills.length; s < len; s++) {
		document.getElementById("s"+skills[s].key).onmouseover = function() {skillHover(skills[s])};
		document.getElementById("s"+skills[s].key).onclick = function() {skillUp(event,skills[s],1)};
		document.getElementById("s"+skills[s].key).oncontextmenu = function() {skillDown(event,skills[s])};
	}
}

// clearIconSources - Removes all active skill icons
// ---------------------------------
function clearIconSources() {
	for (let s = 0; s < skills.length; s++) {
		var iconId = "i"+skills[s].key
		document.getElementById(iconId).src = "./images/skills/none.png"
		document.getElementById(iconId).style.visibility = "hidden"
	}
}

// setIconSources - Sets new active skill icons based on character class
//	className: name of character class
// ---------------------------------
function setIconSources(className) {
	var prefix = "./images/skills/"+className+"/";
	for (let s = 0, len = skills.length; s < len; s++) {
		var iconId = "i"+skills[s].key;
		document.getElementById(iconId).src = prefix+skills[s].name+".png"
	}
}

// updateSkillIcons - Handles whether active skill icons are hidden or shown
// ---------------------------------
function updateSkillIcons() {
	for (let s = 0; s < skills.length; s++) {
		var iconId = "i"+skills[s].key;
		var show = 1;
		if (skills[s].req.length > 0) { for (let i = 0; i < skills[s].req.length; i++) {
			if (skills[skills[s].req[i]].level == 0) { show = 0; }
		} }
		if (character.level < skills[s].reqlvl) { show = 0; }
		if (show == 1) { document.getElementById(iconId).style.visibility = "visible" }
		else { document.getElementById(iconId).style.visibility = "hidden" }
	}
}

// changeLevel - Modifies the character's level
//	input: positive or negative change (-1 or 1)
// ---------------------------------
function changeLevel(event, input) {
	var levels = 1
	if (event != null) {
		if (event.shiftKey) { levels = 10 }
		if (event.ctrlKey) { levels = 100 }
	}
	if (input < 0) {
		if (levels > character.level-1) { levels = (character.level-1) }
		if (levels > character.skillpoints) { levels = character.skillpoints }
		if (levels*5 > character.statpoints) { levels = Math.floor(character.statpoints/5) }
		levels *= input
	}
	var maxup = 99 - character.level
	if (levels > maxup) { levels = maxup }
	if (levels != 0) {
		character.level += levels
		character.skillpoints += levels
		character.statpoints += 5*levels
		character.stamina += character.levelup_stamina*levels
		character.life += character.levelup_life*levels
		character.mana += character.levelup_mana*levels
	}
	updateMercenary()
	update()
}

// setIronGolem - 
//	val: 
// ---------------------------------
function setIronGolem(val) {
	golemItem = {name:"none"}
	if (val == "none" || val == "­ ­ ­ ­ Iron Golem") { document.getElementById("dropdown_golem").selectedIndex = 0 }
	else {
		var groups = ["helm","armor","gloves","boots","belt","weapon","offhand"];
		for (let g = 0; g < groups.length; g++) { for (item in equipment[groups[g]]) {
			if (equipment[groups[g]][item].name == val) {
				for (affix in equipment[groups[g]][item]) {
					// TODO: Add other item stats and display them somewhere?
					if (affix == "name" || affix == "aura_lvl" || affix == "aura") {
						golemItem[affix] = equipment[groups[g]][item][affix]
					}
				}
			}
		} }
	}
	for (id in effects) { if (id.split("-")[0] == "Iron_Golem") {
		for (affix in effects[id]) { if (affix != "info") {
			character[affix] -= effects[id][affix]	// stats are added to the character via getBuffData()
			effects[id][affix] = unequipped[affix]
		} }
		updateEffect(id)
	} }
	update()
	updateAllEffects()
}

// reloadOffhandCorruptions - reloads corruption dropdown options for offhands (when the selected item changes types)
//	kind: the group/type of the selected item
// ---------------------------------
function reloadOffhandCorruptions(kind) {
	// trash socketed items first
	for (affix in socketed.offhand.totals) { character[affix] -= socketed.offhand.totals[affix] }
	socketed.offhand.totals = {}
	for (let i = 0; i < socketed.offhand.items.length; i++) { socketed.offhand.items[i] = {id:socketed.offhand.items[i].id,name:socketed.offhand.items[i].name} }
	
	corrupt("offhand", "offhand")
	var choices = "<option>­ ­ ­ ­ Corruption</option>";
	for (let m = 1; m < corruptions["offhand"].length; m++) {
		if (corruptions["offhand"][m].base == kind) {
			choices += "<option>" + corruptions["offhand"][m].name + "</option>"
		}
	}
	document.getElementById("corruptions_offhand").innerHTML = choices
	document.getElementById("corruptions_offhand").selectedIndex = 0
}

// adjustCorruptionSockets - Adjusts the sockets granted by corruptions
//	group: item group (helm, armor, weapon, offhand)
// ---------------------------------
function adjustCorruptionSockets(group) {
	var max = 0;
	if (equipped[group].max_sockets > 0 && corruptsEquipped[group].name != group) {
		max = ~~equipped[group].max_sockets;
		if (equipped[group].ethereal > 0 || equipped[group].sockets > 0 || equipped[group].rarity == "rw" || equipped[group].rarity == "common" || equipped[group].type == "quiver") { max = 0 }
		if (max != corruptsEquipped[group].sockets) {
			character.sockets -= corruptsEquipped[group].sockets
			corruptsEquipped[group].sockets = max
			character.sockets += max
		}
	}
	if (max == 0 && equipped[group].name != "none" && corruptsEquipped[group].name == "+ Sockets") { corrupt(group, group) }
	updateStats()
}

// corrupt - Sets a corruption outcome for an item
//	group: name of item's group
//	val: name of corruption
// ---------------------------------
function corrupt(group, val) {
	for (old_affix in corruptsEquipped[group]) {
		character[old_affix] -= corruptsEquipped[group][old_affix]
		corruptsEquipped[group][old_affix] = unequipped[old_affix]
	}
	if (val == "­ ­ ­ ­ Corruption" || val == "none" || val == group || equipped[group].ethereal > 0 || equipped[group].sockets > 0 || equipped[group].rarity == "rw" || equipped[group].rarity == "common" || (group == "offhand" && equipped[group].type != "quiver" && equipped.weapon.twoHanded == 1 && (equipped.weapon.type != "sword" || character.class_name != "Barbarian"))) { document.getElementById("corruptions_"+group).selectedIndex = 0 }
	else {
		for (outcome in corruptions[group]) {
			if (corruptions[group][outcome].name == val && (group != "offhand" || (offhandType == corruptions[group][outcome].base || offhandType == "none"))) {
				for (affix in corruptions[group][outcome]) {
					corruptsEquipped[group][affix] = corruptions[group][outcome][affix]
					if (affix != "name" && affix != "base") {
						character[affix] += corruptions[group][outcome][affix]
					}
				}
			}
		}
		if (val == "+ Sockets") { adjustCorruptionSockets(group) }
	}
	updateSocketTotals()
	update()
}

// mercEquip - Equips or unequips a mercenary item
//	group: name of item's group
//	val: name of item
// ---------------------------------
function equipMerc(group, val) {
	var auraName = "";
	var auraLevel = 0;
	for (old_affix in mercEquipped[group]) {
		if (old_affix == "aura" || old_affix == "aura_lvl" || old_affix == "name" || old_affix == "type" || old_affix == "base" || old_affix == "only" || old_affix == "not" || old_affix == "img") {
			if (old_affix == "aura") {
				removeEffect(mercEquipped[group][old_affix].split(' ').join('_')+"-mercenary_"+group)
			}
		} else {
			mercenary[old_affix] -= mercEquipped[group][old_affix]
		}
	}
	mercEquipped[group] = {name:"none"}
	if (group == val) { document.getElementById(("dropdown_merc_"+group)).selectedIndex = 0 }
	else {
		for (item in equipment[group]) {
			if (equipment[group][item].name == val) {
				// add affixes from base item
				if (typeof(equipment[group][item]["base"]) != 'undefined') {	// TODO: Combine with duplicate code from equip()
					var base = getBaseId(equipment[group][item].base);
					var multEth = 1;
					var multED = 1;
					var multReq = 1;
					var reqEth = 0;
					if (typeof(equipment[group][item]["ethereal"]) != 'undefined') { if (equipment[group][item]["ethereal"] == 1) { multEth = 1.5; reqEth = 10; } }
					if (typeof(equipment[group][item]["e_def"]) != 'undefined') { multED += (equipment[group][item]["e_def"]/100) }
					if (typeof(equipment[group][item]["req"]) != 'undefined') { multReq += (equipment[group][item]["req"]/100) }
					for (affix in bases[base]) {
						if (affix != "group" && affix != "type" && affix != "upgrade" && affix != "downgrade" && affix != "subtype" && affix != "only" && affix != "def_low" && affix != "def_high" && affix != "durability" && affix != "range" && affix != "twoHands") {
							if (typeof(mercEquipped[group][affix]) == 'undefined') { mercEquipped[group][affix] = unequipped[affix] }	// undefined (new) affixes get initialized to zero
							if (affix == "base_damage_min" || affix == "base_damage_max") {
								mercEquipped[group][affix] = Math.ceil(multEth*bases[base][affix])
								mercenary[affix] += Math.ceil(multEth*bases[base][affix])
							} else if (affix == "req_strength" || affix == "req_dexterity") {
								mercEquipped[group][affix] = Math.max(0,Math.ceil(multReq*bases[base][affix] - reqEth))
							} else {
								mercEquipped[group][affix] = bases[base][affix]
								mercenary[affix] += bases[base][affix]
							}
						}
					}
				}
				// add regular affixes
				for (affix in equipment[group][item]) {
					if (typeof(mercEquipped[group][affix]) == 'undefined') { mercEquipped[group][affix] = unequipped[affix] }
					if (affix == "damage_vs_undead") {
						mercEquipped[group][affix] += equipment[group][item][affix]
						mercenary[affix] += equipment[group][item][affix]
					} else if (affix == "name" || affix == "type" || affix == "base" || affix == "only" || affix == "not" || affix == "img" || affix == "rarity" || affix == "req" || affix == "ethereal" || affix == "indestructible" || affix == "autorepair" || affix == "autoreplenish" || affix == "stack_size" || affix == "set_bonuses" || affix == "pod_changes" || affix == "aura_lvl" || affix == "twoHanded" || affix == "sockets" || affix == "e_def" || affix == "ctc" || affix == "cskill" || affix == "aura" || affix == "req_strength" || affix == "req_dexterity") {
						if (affix == "req_strength" || affix == "req_dexterity") {
							if (equipment[group][item][affix] > mercEquipped[group][affix]) { mercEquipped[group][affix] = equipment[group][item][affix] }
						} else {
							mercEquipped[group][affix] = equipment[group][item][affix]
							if (affix == "aura") { auraName = equipment[group][item][affix]; auraLevel = equipment[group][item].aura_lvl; }
						}
					} else {
						if (affix == "sup" || affix == "e_damage") {
							if (typeof(mercEquipped[group]["e_damage"]) == 'undefined') { mercEquipped[group]["e_damage"] = unequipped["e_damage"] }
							if (affix == "sup") { mercEquipped[group][affix] = equipment[group][item][affix] }
							mercEquipped[group]["e_damage"] += equipment[group][item][affix]
							mercenary["e_damage"] += equipment[group][item][affix]
						} else {
							mercEquipped[group][affix] = equipment[group][item][affix]
							mercenary[affix] += equipment[group][item][affix]
						}
					}
				}
				// TODO: implement set bonuses for mercenaries
			}
		}
		updateMercenary()
	}
	if (auraName != "" && auraLevel != 0) {
		addEffect("aura",auraName,auraLevel,"mercenary_"+group)
	}
	updateStats()
	updateAllEffects()
}
	
// equip - Equips an item by adding its stats to the character, or unequips it if it's already equipped			// TODO: consider renaming... switchItem()?  Also, split into multiple smaller functions
//	group: equipment group
//	val: name of item
// ---------------------------------
function equip(group, val) {
	var auraName = "";
	var auraLevel = 0;
	var cskillName = ["","",""];
	var cskillLevel = [0,0,0];
	var ctcskillName = ["","","",""];
	var ctcskillLevel = [0,0,0,0];
	var old_set_bonuses = "";
	var old_set = "";
	var old_set_before = 0;
	var old_set_after = 0;
	var set_bonuses = "";
	var set = "";
	var set_before = 0;
	var set_after = 0;
	
	// check if item was imported from a different category (offhand weapons)
	var src_group = group;
	var found = 0;
	if (group == "offhand") { for (item in equipment[group]) { if (equipment[group][item].name == val) { found = 1 } } }
	if (found == 0 && group == "offhand") { src_group = "weapon" }
	var itemType = "";
	var twoHanded = 0;
	for (item in equipment[src_group]) { if (equipment[src_group][item].name == val) { twoHanded = ~~equipment[src_group][item].twoHanded; if (typeof(equipment[src_group][item].type) != 'undefined') { itemType = equipment[src_group][item].type } } }
	
	for (old_affix in equipped[group]) { if (old_affix == "set_bonuses") { old_set_bonuses = equipped[group].set_bonuses } }
	for (item in equipment[src_group]) { if (equipment[src_group][item].name == val) { if (typeof(equipment[src_group][item].set_bonuses) != 'undefined') { set_bonuses = equipment[src_group][item].set_bonuses } } }
	if (set_bonuses != "") { set = set_bonuses[0]; set_before = character[set]; }
	if (old_set_bonuses != "") { old_set = old_set_bonuses[0]; old_set_before = character[old_set]; }
	
	// if replacing an item, previous item's affixes are removed from character
	for (old_affix in equipped[group]) {
		if (typeof(character[old_affix]) != 'undefined') { character[old_affix] -= equipped[group][old_affix] }
		if (old_affix == "aura") { removeEffect(equipped[group][old_affix].split(' ').join('_')+"-"+group) }
		if (old_affix == "cskill") {
			for (let i = 0; i < equipped[group].cskill.length; i++) {
				var cskill_name = equipped[group].cskill[i][1];
				for (cskill in effect_cskills) { if (cskill.split('_').join(' ') == cskill_name) { removeEffect(cskill+"-"+group) } }
			}
		}
		if (old_affix == "ctc") {
			for (let i = 0; i < equipped[group].ctc.length; i++) {
				var ctcskill_name = equipped[group].ctc[i][2];
				for (ctcskill in effect_ctcskills) { if (ctcskill.split('_').join(' ') == ctcskill_name) { removeEffect(ctcskill+"-"+group) } }
			}
		}
		if (old_affix != "set_bonuses") { equipped[group][old_affix] = unequipped[old_affix] }
	}
	// remove set bonuses from previous item
	if (old_set_bonuses != "") {
		old_set_after = character[old_set];
		if (old_set_before > old_set_after) {
			var before = Math.round(old_set_before,0)
			var after = Math.round(old_set_after,0)
			// remove set bonuses for old item
			for (let i = 1; i <= before; i++) {
				for (affix in equipped[group]["set_bonuses"][i]) {
					character[affix] -= equipped[group]["set_bonuses"][i][affix]
				}
			}
			equipped[group]["set_bonuses"][1] = 0	// save "state" for invalid/outdated set info
			if (before > after) {
				// remove old set bonus for other equipped items in the set (only if the removed set item wasn't a duplicate of another set item, i.e. ring)
				for (set_group in equipped) {
					if (set_group != group && equipped[set_group]["set_bonuses"] != null) {
						if (equipped[set_group]["set_bonuses"][0] == old_set && equipped[set_group]["set_bonuses"][1] == 1) {	// same set as removed item & set info is valid
							for (affix in equipped[set_group]["set_bonuses"][before]) {
								character[affix] -= equipped[set_group]["set_bonuses"][before][affix]
							}
						}
					}
				}
				// remove shared set bonuses
				for (affix in sets[old_set][before]) {
					if (character.class_name == "Sorceress" && (affix == "oskill_Fire_Ball" || affix == "oskill_Fire_Wall" || affix == "oskill_Meteor")) {
						character[affix] -= 3
					} else {
						character[affix] -= sets[old_set][before][affix]
					}
				}
			}
		}
	}
	// reset item object, to preserve normal affix order
	equipped[group] = {name:"none",tier:0}
	if (group == "weapon" || group == "offhand") { equipped[group].type = "" }
	if (group == "weapon") { equipped[group].twoHanded = 0 }	// this line may be unnecessary
	// add affixes to character
	for (item in equipment[src_group]) {
		if (equipment[src_group][item].name == val) {
			// add affixes from base item
			if (typeof(equipment[src_group][item]["base"]) != 'undefined') {
				var base = getBaseId(equipment[src_group][item].base);
				var multEth = 1;
				var multED = 1;
				var multReq = 1;
				var reqEth = 0;
				if (typeof(equipment[src_group][item]["ethereal"]) != 'undefined') { if (equipment[src_group][item]["ethereal"] == 1) { multEth = 1.5; reqEth = 10; } }
				if (typeof(equipment[src_group][item]["e_def"]) != 'undefined') { multED += (equipment[src_group][item]["e_def"]/100) }
				if (typeof(equipment[src_group][item]["req"]) != 'undefined') { multReq += (equipment[src_group][item]["req"]/100) }
				if (typeof(bases[base]) != 'undefined') { for (affix in bases[base]) {
					if (affix != "group" && affix != "type" && affix != "upgrade" && affix != "downgrade" && affix != "subtype" && affix != "only" && affix != "def_low" && affix != "def_high" && affix != "durability" && affix != "range" && affix != "twoHands" && affix != "nonmetal") {	// test: twoHands still unused elsewhere? okay here?
						if (typeof(equipped[group][affix]) == 'undefined') { equipped[group][affix] = unequipped[affix] }	// undefined (new) affixes get initialized to zero
						if (affix == "base_damage_min" || affix == "base_damage_max" || affix == "throw_min" || affix == "throw_max" || affix == "base_min_alternate" || affix == "base_max_alternate") {
							equipped[group][affix] = Math.ceil(multEth*bases[base][affix])
							character[affix] += Math.ceil(multEth*bases[base][affix])
						} else if (affix == "req_strength" || affix == "req_dexterity") {
							equipped[group][affix] = Math.max(0,Math.ceil(multReq*bases[base][affix] - reqEth))
						} else if (affix == "tier") {
							equipped[group][affix] = bases[base][affix]
							equipped[group]["original_tier"] = bases[base][affix]
						} else {
							equipped[group][affix] = bases[base][affix]
							character[affix] += bases[base][affix]
						}
					}
				} }
			}
			// add regular affixes
			for (affix in equipment[src_group][item]) {
				if (typeof(equipped[group][affix]) == 'undefined') { equipped[group][affix] = unequipped[affix] }	// initialize undefined affixes
				if (affix == "damage_vs_undead") {									// damage_vs_undead is the only additive affix included in both bases[] (automods) and equipment[] (regular affixes)
					equipped[group][affix] += equipment[src_group][item][affix]
					character[affix] += equipment[src_group][item][affix]
				} else if (affix == "name" || affix == "type" || affix == "base" || affix == "only" || affix == "not" || affix == "img" || affix == "rarity" || affix == "req" || affix == "ethereal" || affix == "indestructible" || affix == "autorepair" || affix == "autoreplenish" || affix == "stack_size" || affix == "set_bonuses" || affix == "pod_changes" || affix == "twoHanded" || affix == "sockets" || affix == "e_def" || affix == "ctc" || affix == "cskill" || affix == "aura" || affix == "aura_lvl" || affix == "req_strength" || affix == "req_dexterity") {	// no need to add these as character affixes
					equipped[group][affix] = equipment[src_group][item][affix]
					if (affix == "req_strength" || affix == "req_dexterity") {
						if (equipment[src_group][item][affix] > equipped[group][affix]) { equipped[group][affix] = equipment[src_group][item][affix] }	// these affixes aren't additive (only the largest matters)
					} else {
						equipped[group][affix] = equipment[src_group][item][affix]
						if (affix == "aura") { auraName = equipment[src_group][item][affix]; auraLevel = equipment[src_group][item].aura_lvl; }
						if (affix == "cskill") {
							for (let i = 0; i < equipped[group].cskill.length; i++) {
								var cskill_level = equipped[group].cskill[i][0];
								var cskill_name = equipped[group].cskill[i][1];
								for (cskill in effect_cskills) { if (cskill.split('_').join(' ') == cskill_name) { cskillName[i] = cskill_name; cskillLevel[i] = cskill_level; } }
							}
						}
						if (affix == "ctc") {
							for (let i = 0; i < equipped[group].ctc.length; i++) {
								var ctcskill_level = equipped[group].ctc[i][1];
								var ctcskill_name = equipped[group].ctc[i][2];
								for (ctcskill in effect_ctcskills) { if (ctcskill.split('_').join(' ') == ctcskill_name) { ctcskillName[i] = ctcskill_name; ctcskillLevel[i] = ctcskill_level; } }
							}
						}
					}
				} else {
					if ((affix == "sup" || affix == "e_damage") && src_group == "weapon") {
						if (typeof(equipped[group]["e_damage"]) == 'undefined') { equipped[group]["e_damage"] = unequipped["e_damage"] }
						if (affix == "sup") { equipped[group][affix] = equipment[src_group][item][affix] }
						equipped[group]["e_damage"] += equipment[src_group][item][affix]
						character["e_damage"] += equipment[src_group][item][affix]
					} else {
						// TODO: implement "sup" for e_defense
						equipped[group][affix] = equipment[src_group][item][affix]
						var oskill_info = "";
						for (let o = 0; o < oskills.length; o++) { if (affix == oskills[o]) { oskill_info = oskills_info[oskills[o]] } }
						if (oskill_info != "") {
							if (oskill_info.native_class == character.class_name.toLowerCase()) { if (equipment[src_group][item][affix] > 3) { equipped[group][affix] -= (equipment[src_group][item][affix]-3) } }	// oskills are capped at 3 for 'native' classes
							character[affix] += equipped[group][affix]
						} else {
							character[affix] += equipment[src_group][item][affix]
						}
					}
				}
			}
		}
	}
	// add set bonuses
	if (set_bonuses != "") {
		set_after = character[set];
		if (set_before < set_after) {
			var before = Math.round(set_before,0)
			var after = Math.round(set_after,0)
			// add set bonuses for new item
			for (let i = 1; i <= after; i++) {
				for (affix in set_bonuses[i]) {
					character[affix] += set_bonuses[i][affix]
				}
			}
			equipped[group]["set_bonuses"][1] = 1	// valid set info
			if (before < after) {
				// add new set bonus for other equipped items in the set
				for (set_group in equipped) {
					if (set_group != group && equipped[set_group]["set_bonuses"] != null) {
						if (equipped[set_group]["set_bonuses"][0] == set && equipped[set_group]["set_bonuses"][1] == 1) {
							for (affix in equipped[set_group]["set_bonuses"][after]) {
								character[affix] += equipped[set_group]["set_bonuses"][after][affix]
							}
						}
					}
				}
				// add shared set bonuses
				for (affix in sets[set][after]) {
					if (character.class_name == "Sorceress" && (affix == "oskill_Fire_Ball" || affix == "oskill_Fire_Wall" || affix == "oskill_Meteor")) {
						character[affix] += 3
					} else {
						character[affix] += sets[set][after][affix]
					}
				}
			}
		}
	}
	// prevent incompatible weapon/offhand combinations
	if (equipped.weapon.name != "none" && equipped.offhand.name != "none") {
		if (group == "offhand") {
			if (itemType == "quiver" && equipped.weapon.type != "bow" && equipped.weapon.type != "crossbow") { equip('weapon', 'none') }
			else if (itemType != "quiver" && equipped.weapon.twoHanded == 1 && (equipped.weapon.type != "sword" || character.class_name != "Barbarian")) { equip('weapon', 'none') }
			else if (itemType == "claw" && equipped.weapon.type != "claw") { equip('weapon', 'none') }
		} else if (group == "weapon") {
			if (equipped.offhand.type == "quiver" && itemType != "bow" && itemType != "crossbow") { equip('offhand', 'none') }
			else if (equipped.offhand.type != "quiver" && twoHanded == 1 && (itemType != "sword" || character.class_name != "Barbarian")) { equip('offhand', 'none'); }
			else if (itemType != "claw" && equipped.offhand.type == "claw") { equip('offhand', 'none') }
		}
	}
	// adjust damage for 2-handed swords if wielded differently
	if (character.class_name == "Barbarian") {
		if (equipped.weapon.name != "none" && equipped.offhand.name != "none") {
			if (equipped.weapon.type == "sword" && equipped.weapon.twoHanded == 1) { checkWield("weapon", 1) }
			if (equipped.offhand.type == "sword" && equipped.offhand.twoHanded == 1) { checkWield("offhand", 1) }
		} else {
			if (equipped.weapon.type == "sword" && equipped.weapon.twoHanded == 1) { checkWield("weapon", 2) }
			if (equipped.offhand.type == "sword" && equipped.offhand.twoHanded == 1) { checkWield("offhand", 2) }
		}
	}
	// remove incompatible corruptions
	if (equipped[group].ethereal > 0 || equipped[group].sockets > 0 || equipped[group].rarity == "rw" || equipped[group].rarity == "common" || (group == "offhand" && (equipped[group].type == "shield" || equipped[group].type == "quiver") && equipped[group].type != corruptsEquipped[group].base)) { corrupt(group, group) }
	if (corruptsEquipped[group].name == "+ Sockets") { adjustCorruptionSockets(group) }
	if (group == "offhand") {
		// reload corruption options when the selected type changes
		if (equipped[group].type == "shield") { if (offhandType == "quiver" || offhandType == "weapon") { offhandType = "shield"; reloadOffhandCorruptions("shield"); } }
		else if (equipped[group].type == "quiver") { if (offhandType != "quiver") { offhandType = "quiver"; reloadOffhandCorruptions("quiver"); } }
		else if (equipped[group].name != "none") { if (offhandType != "weapon") { offhandType = "weapon"; reloadOffhandCorruptions("weapon"); } }
		else { if (offhandType == "quiver" || offhandType == "weapon") { offhandType = "none"; reloadOffhandCorruptions("shield"); } }
		if (equipped[group].type == "shield") { offhandType = "shield" } else if (equipped[group].name == "none") { offhandType = "none" }
	}
	else if (group == "weapon") {
		if (equipped.offhand.type != "quiver" && twoHanded == 1 && (itemType != "sword" || character.class_name != "Barbarian") && corruptsEquipped.offhand.name != "none") { reloadOffhandCorruptions("shield"); }
	}
	if (val == group || val == "none") { document.getElementById(("dropdown_"+group)).selectedIndex = 0; }
	// set inventory image
	if (equipped[group].name != "none") {
		var src = "";
		var base = "";
		if (typeof(equipped[group].img) != 'undefined') { src = equipped[group].img }
		if (typeof(equipped[group].base) != 'undefined') { base = equipped[group].base }
		document.getElementById(group+"_image").src = getItemImage(group,base,src)
	} else {
		var img = "./images/items/none.png"
		if (group == "helm" || group == "armor" || group == "boots" || group == "belt" || group == "weapon" || group == "offhand") { img = "./images/items/blank_"+group+".png" }
		document.getElementById(group+"_image").src = img
		document.getElementById("tooltip_inventory").style.display = "none"
	}
	
	if (auraName != "" && auraLevel != 0) {		// TODO: Why does this break things if called earlier? (item image wasn't appearing)
		addEffect("aura",auraName,auraLevel,group)
	}
	for (let i = 0; i < cskillName.length; i++) {
		if (cskillName[i] != "" && cskillLevel[i] != 0) {
			addEffect("cskill",cskillName[i],cskillLevel[i],group)
		}
	}
	for (let i = 0; i < ctcskillName.length; i++) {
		if (ctcskillName[i] != "" && ctcskillLevel[i] != 0) {
			addEffect("ctcskill",ctcskillName[i],ctcskillLevel[i],group)
		}
	}
	update()
	updateAllEffects()
}

// checkWield - Adjust base damage for two-handed swords (dependent on whether wielded with 1 or 2 hands)
//	group: item's group (weapon or offhand)
//	hands_used: number of hands used to wield the weapon
// ---------------------------------
function checkWield(group, hands_used) {
		var base_min = equipped[group].base_damage_min;
		var base_max = equipped[group].base_damage_max;
		var min_alt = equipped[group].base_min_alternate;
		var max_alt = equipped[group].base_max_alternate;
		var swap = 0;
		if (hands_used == 2) { if (base_min < min_alt) { swap = 1 } }
		else { if (base_min > min_alt) { swap = 1 } }
		if (swap == 1) {
			character.base_damage_min -= base_min
			character.base_damage_max -= base_max
			equipped[group].base_damage_min = min_alt
			equipped[group].base_damage_max = max_alt
			equipped[group].base_min_alternate = base_min
			equipped[group].base_max_alternate = base_max
			character.base_damage_min += min_alt
			character.base_damage_max += max_alt
		}
}

// resetSkills - Resets functionality for skills
// ---------------------------------
function resetSkills() {
	for (bonus in skill_bonuses) { character[bonus] = skill_bonuses[bonus] }
	for (s = 0, len = skills.length; s < len; s++) {
		skills[s].level = 0
		skills[s].extra_levels = 0
		skills[s].force_levels = 0
		document.getElementById("p"+skills[s].key).innerHTML = ""
		document.getElementById("s"+skills[s].key).onmouseover = function() {mouseOut};
		document.getElementById("s"+skills[s].key).onclick = function() {mouseOut};
		document.getElementById("s"+skills[s].key).oncontextmenu = function() {mouseOut};
	}
	document.getElementById("dropdown_skill1").innerHTML = "<option class='gray-all' style='color:gray' disabled selected>" + " ­ ­ ­ ­ Skill 1" + "</option>"
	document.getElementById("dropdown_skill2").innerHTML = "<option class='gray-all' style='color:gray' disabled selected>" + " ­ ­ ­ ­ Skill 2" + "</option>"
}

// resetEquipment - Resets all items
// ---------------------------------
function resetEquipment() {
	for (group in corruptsEquipped) { equip(group, "none") }
	resetCharms()
	resetCorruptions()
}

// resetCharms - Resets all charms
// ---------------------------------
function resetCharms() {
	var group = "charms"
	for (charm in equipped[group]) {
		for (old_affix in equipped[group][charm]) {
			character[old_affix] -= equipped[group][charm][old_affix]
			equipped[group][charm][old_affix] = unequipped[old_affix]
		}
	}
	for (let s = 1; s < inv[0]["in"].length; s++) { inv[0]["in"][s] = "" }
	for (let t = 1; t < inv.length; t++) {
		inv[t].empty = 1
		inv[t].id
		document.getElementById(inv[t].id).innerHTML = ""
	}
}

// resetCorruptions - Resets all corruptions
// ---------------------------------
function resetCorruptions() {
	for (group in corruptsEquipped) { corrupt(group, "none") }
}

// addCharm - Adds a charm to the inventory
//	val: the name of the charm
// ---------------------------------
function addCharm(val) {
	var charm_img = {prefix:"./images/items/charms/", small:["charm1_paw.png","charm1_disc.png","charm1_coin.png"], large:["charm2_page.png","charm2_horn.png","charm2_lantern.png"], grand:["charm3_lace.png","charm3_eye.png","charm3_monster.png"]};
	var charmImage = charm_img.prefix+"debug_plus.png";
	var charmHeight = "";
	var charmWidth = "29";
	var size = "";
	var charm_y = 1;
	var nameVal = val;
	var charmItem = "";
	for (item in equipment["charms"]) {
		if (equipment["charms"][item].name == val) {
			charmItem = equipment["charms"][item]
			size = charmItem.size
		}
	}
	var autoCast = settings.autocast;
	var r = Math.floor((Math.random() * 3));
	if (size == "grand") { charmHeight = "88"; charmImage = charm_img.prefix+charm_img.grand[r]; charm_y = 3; }
	else if (size == "large") { charmHeight = "59"; charmImage = charm_img.prefix+charm_img.large[r]; charm_y = 2; }
	else if (size == "small") { charmHeight = "29"; charmImage = charm_img.prefix+charm_img.small[r]; charm_y = 1; }
	if (typeof(charmItem.debug) != 'undefined') {
		if (val == "+20 skills") { charmHeight = "29"; charmImage = charm_img.prefix+"debug_II.png"; charm_y = 1; }
		else if (val == "+1 skill") { charmHeight = "29"; charmImage = charm_img.prefix+"debug_D.png"; charm_y = 1; }
		else if (val == "+1 (each) skill") { charmHeight = "29"; charmImage = charm_img.prefix+"debug_P.png"; charm_y = 1;
			if (autoCast == 1) { toggleAutocast("autocast"); document.getElementById("autocast").checked = 0; }
		}
		else if (val == "everything") { charmHeight = "29"; charmImage = charm_img.prefix+"debug_face.png"; charm_y = 1; }
		else { charmHeight = "29"; charmImage = charm_img.prefix+"debug_skull.png"; charm_y = 1; }
	}
	
	var allow = 1;
	for (let c = 1; c <= inv[0].in.length; c++) {
		if (inv[0].in[c] == val) {
			if (val == "Annihilus" || val == "Hellfire Torch" || val == "Gheed's Fortune") { allow = 0 } }
	}
	if (allow == 1) {
		if (val != "Annihilus" && val != "Hellfire Torch" && val != "Gheed's Fortune") {
			var append = "" + Math.floor((Math.random() * 999999) + 1);	// generate "unique" ID for charm
			val = val + "_" + append
		}
		if (nameVal == "Annihilus") { charmImage = charm_img.prefix+"charm1u.png"; }
		if (nameVal == "Hellfire Torch") { charmImage = charm_img.prefix+"charm2u.png"; }
		if (nameVal == "Gheed's Fortune") { charmImage = charm_img.prefix+"charm3u.png"; }
		if (nameVal == "Horadric Sigil") { charmImage = charm_img.prefix+"charm3s.png"; }
		var charmHTML = '<img style="width: ' + charmWidth + '; height: ' + charmHeight + '; pointer-events: auto;" id="' + val + '" src="' + charmImage + '" draggable="true" ondragstart="drag(event)" width="' + charmWidth + '" height="' + charmHeight + '" oncontextmenu="trash(event)" onmouseover="itemHover(event, this.value)" onmouseout="itemOut()" onclick="itemSelect(event)">';
		var insertion = "";
		var space_found = 0;
		var empty = 1;
		var i = 0;
		for (let x = 1; x <= 10; x++) {
			for (let y = 0; y < 4; y++) {
				i = y*10 + x
				empty = 1
				if (space_found == 0 && charm_y + (y+1) <= 5) {
					if (inv[i].empty == 0) { empty = 0 }
					if (charm_y > 1 && inv[i+10].empty == 0) { empty = 0 }
					if (charm_y > 2 && inv[i+20].empty == 0) { empty = 0 }
				} else { empty = 0 }
				if (empty == 1) { space_found = i }
			}
		}
		if (space_found > 0) {
			var i = space_found;
			insertion = inv[i].id;
			inv[i].empty = 0
			inv[0].in[i] = val
			if (charm_y > 1) { inv[i+10].empty = 0; inv[0].in[i+10] = val; }
			if (charm_y > 2) { inv[i+20].empty = 0; inv[0].in[i+20] = val; }
			document.getElementById(insertion).innerHTML += charmHTML;
			var ch = "charms";
			equipped[ch][val] = {}
			for (item in equipment[ch]) {
				if (equipment[ch][item].name == nameVal) {
					for (affix in equipment[ch][item]) {
						equipped[ch][val][affix] = equipment[ch][item][affix]
						if (affix != "name" && affix != "only" && affix != "rarity" && affix != "size" && affix != "pod_changes" && affix != "req_level") {
							character[affix] += equipment[ch][item][affix]
						}
					}
				}
			}
		}
	}
	document.getElementById("dropdown_charms").selectedIndex = 0
	// update
//	calculateSkillAmounts()
//	updateStats()
//	updateSkills()
//	if (selectedSkill[0] != " ­ ­ ­ ­ Skill 1") { checkSkill(selectedSkill[0], 1) }
//	if (selectedSkill[1] != " ­ ­ ­ ­ Skill 2") { checkSkill(selectedSkill[1], 2) }
	updateAllEffects()
	if (settings.autocast != autoCast) { toggleAutocast("autocast"); settings.autocast = 1; document.getElementById("autocast").checked = 1; }
}

// addSocketable - Adds a jewel, rune, or gem to the inventory
//	val: the name of the socketable item
// ---------------------------------
function addSocketable(val) {
	// TODO: Reduce duplicated code from addCharm()?
	var prefix = "./images/items/socketables/";
	var jewels = ["Jewel_blue.png","Jewel_green.png","Jewel_peach.png","Jewel_purple.png","Jewel_red.png","Jewel_white.png",];
	var itemImage = "";
	var nameVal = val;
	var item = "";
	for (sock in socketables) { if (socketables[sock].name == val) { item = socketables[sock] } }
	var r = Math.floor((Math.random() * 6));
	if (item.type == "jewel") { itemImage = prefix + "jewel/" + jewels[r] }
	else if (item.type == "rune" || item.type == "gem") { itemImage = prefix + item.type+"/" + item.name.split(' ').join('_') + ".png" }
	else if (item.type == "other") { itemImage = prefix + item.name+".png" }
	else { itemImage = prefix + "debug_plus.png" }
	
	var append = "_" + Math.floor((Math.random() * 999999) + 1);	// generate "unique" ID for item
	val = val + append
	
	var socketable = 'socketable';
	var itemHTML = '<img style="width: 28; height: 28; pointer-events: auto; z-index:5;" id="' + val + '" src="' + itemImage + '" draggable="true" ondragstart="dragSocketable(event)" width="28" height="28" oncontextmenu="trashSocketable(event,this.id,0)" onmouseover="itemHover(event, this.value)" onmouseout="itemOut()" onclick="socketableSelect(event)">';
	var insertion = "";
	var space_found = 0;
	var empty = 1;
	var i = 0;
	for (let x = 1; x <= 10; x++) {
		for (let y = 0; y < 4; y++) {
			i = y*10 + x
			empty = 1
			if (space_found == 0 && 1 + (y+1) <= 5) {
				if (inv[i].empty == 0) { empty = 0 }
			} else { empty = 0 }
			if (empty == 1) { space_found = i }
		}
	}
	if (space_found > 0) {
		var i = space_found;
		insertion = inv[i].id;
		inv[i].empty = 0
		inv[0].in[i] = val
		tempSetup = i
		document.getElementById(insertion).innerHTML += itemHTML;
	}
	document.getElementById("dropdown_socketables").selectedIndex = 0
	
	return val;
}

// addEffect - 
//	origin: what kind of source the effect has ("skill", "aura", "misc")
//	name: name of the chosen effect
//	num: index, or aura level
//	other: "mercenary" or the item type which is granting the aura
// ---------------------------------
function addEffect(origin, name, num, other) {
	if (origin == "misc") { name = non_items[num].effect; document.getElementById("dropdown_misc").selectedIndex = 0; }
	var id = name.split(' ').join('_');
	if (other != "") { id += ("-"+other) }
	if (document.getElementById(id) == null) { initializeEffect(origin,name,num,other) }
	else { trackDuplicateEffects(name) }
	updateAllEffects()
}

// initializeEffect - 
//	origin: what kind of source the effect has ("skill", "aura", "misc")
//	name: name of the chosen effect
//	num: index, or aura level
//	other: "mercenary" or the item type which is granting the aura
// ---------------------------------
function initializeEffect(origin, name, num, other) {
	var id = name.split(' ').join('_');
	if (other != "") { id += ("-"+other) }
	var prefix = "./images/effects/";
	var fileType = ".png";
	if (origin == "misc") {fileType = ".gif"}
	if (origin == "skill") { prefix = "./images/skills/"+character.class_name.toLowerCase()+"/"; }
	if (origin == "oskill") { prefix = "./images/skills/"+oskills_info["oskill_"+id].native_class+"/"; }
	var iconOff = prefix+"dark/"+name+" dark.png";
	var iconOn = prefix+name+fileType;
	
	var newDiv = document.createElement("div");
	var dClass = document.createAttribute("class");			dClass.value = "effect-container";				newDiv.setAttributeNode(dClass);
	var dId = document.createAttribute("id");			dId.value = id;							newDiv.setAttributeNode(dId);
	var dHoverOn = document.createAttribute("onmouseover");		dHoverOn.value = "hoverEffectOn(this.id)";			newDiv.setAttributeNode(dHoverOn);
	var dHoverOff = document.createAttribute("onmouseout");		dHoverOff.value = "hoverEffectOff()";				newDiv.setAttributeNode(dHoverOff);
	var dClickLeft = document.createAttribute("onclick");		dClickLeft.value = "leftClickEffect(event,this.id)";		newDiv.setAttributeNode(dClickLeft);
	var dClickRight = document.createAttribute("oncontextmenu");	dClickRight.value = "rightClickEffect(event,this.id,1)";	newDiv.setAttributeNode(dClickRight);
	
	var newEffect = document.createElement("img");
	var eClass = document.createAttribute("class");			eClass.value = "effect";					newEffect.setAttributeNode(eClass);
	var eId = document.createAttribute("id");			eId.value = id+"_e";						newEffect.setAttributeNode(eId);
	var eSrc = document.createAttribute("src");			eSrc.value = iconOff;						newEffect.setAttributeNode(eSrc);
	newDiv.appendChild(newEffect)
	
	var newEffectSnapshot = document.createElement("img");
	var oClass = document.createAttribute("class");			oClass.value = "effect";					newEffectSnapshot.setAttributeNode(oClass);
	var oId = document.createAttribute("id");			oId.value = id+"_ss";						newEffectSnapshot.setAttributeNode(oId);
	var oSrc = document.createAttribute("src");			oSrc.value = "./images/skills/none.png";			newEffectSnapshot.setAttributeNode(oSrc);
	newDiv.appendChild(newEffectSnapshot)
	
	var effectGUI = document.getElementById("side");
	effectGUI.appendChild(newDiv);
	
	if (typeof(effects[id]) == 'undefined') { effects[id] = {info:{}} }
	
	effects[id].info.enabled = 0
	effects[id].info.imageOff = iconOff
	effects[id].info.imageOn = iconOn
	effects[id].info.origin = origin
	effects[id].info.index = num
	effects[id].info.other = other
	effects[id].info.snapshot = 0
	effects[id].info.level = num
	setEffectData(origin,name,num,other)
	
	if (settings.autocast == 1) { toggleEffect(id) }	// TODO: should also toggle-on if effect is always-active
	adjustStackedAuras()
}

// setEffectData - 
//	origin: what kind of source the effect has ("skill", "aura", "misc")
//	name: name of the chosen effect
//	num: index, or aura level
//	other: "mercenary" for auras
// ---------------------------------
function setEffectData(origin, name, num, other) {
	var id = name.split(' ').join('_');
	if (other != "") { id += ("-"+other) }
	var data = {};
	var lvl = effects[id].info.index
	if (origin == "aura") { data = getAuraData(name,num,other) }
	else if (origin == "skill") { data = character.getBuffData(skills[num]); lvl = skills[num].level + skills[num].extra_levels; }
	else if (origin == "oskill") { var skill = skills_all[oskills_info["oskill_"+id].native_class][num]; data = character_any.getBuffData(skill); lvl = character["oskill_"+skill.name.split(" ").join("_")] + character.all_skills + Math.ceil(character.all_skills_per_level*character.level); }
	else if (origin == "misc") { data = getMiscData(name,num); }
	else if (origin == "cskill") { data = getCSkillData(name,num,other) }
	else if (origin == "ctcskill") { data = getCTCSkillData(name,num,other) }
	if (effects[id].info.snapshot == 0) { effects[id].info.level = lvl }
	if (effects[id].info.snapshot == 0) { for (affix in data) { effects[id][affix] = data[affix] } }
	// TODO: remove 'snapshot' for class effects if their base skill level decreases?
}

// rightClickEffect - 
//	id: the effect's id
//	direct: whether the effect icon was clicked directly (1 or null)
// ---------------------------------
function rightClickEffect(event, id, direct) {
	var mod = 0;
	if (event != null) { if (event.ctrlKey) { mod = 1 } }
	if (mod > 0) {
		var idName = id.split("-")[0];
		if ((effects[id].info.origin == "skill" && skills[effects[id].info.index].effect > 3) || (effects[id].info.origin == "oskill" && (id == "Battle_Orders" || id == "Battle_Command" || id == "Shiver_Armor")) || (effects[id].info.origin == "cskill" && (idName != "Inner_Sight" && idName != "Heart_of_Wolverine" && idName != "Oak_Sage" && idName != "Spirit_of_Barbs" && idName != "Blood_Golem" && idName != "Iron_Golem")) || effects[id].info.origin == "ctcskill") {
			effects[id].info.snapshot = 0
			document.getElementById(id+"_ss").src = "./images/skills/none.png"
			updateAllEffects()
			update()
			if (typeof(effects[id].info.enabled) == 'undefined') { hoverEffectOff() }
		}
	} else {
		removeEffect(id,direct)
	}
}

// leftClickEffect - 
//	id: the effect's id
// ---------------------------------
function leftClickEffect(event, id) {
	var mod = 0;
	if (event != null) { if (event.ctrlKey) { mod = 1 } }
	if (mod > 0) {
		var idName = id.split("-")[0];
		if ((effects[id].info.origin == "skill" && skills[effects[id].info.index].effect > 3) || (effects[id].info.origin == "oskill" && (id == "Battle_Orders" || id == "Battle_Command" || id == "Shiver_Armor")) || (effects[id].info.origin == "cskill" && (idName != "Inner_Sight" && idName != "Heart_of_Wolverine" && idName != "Oak_Sage" && idName != "Spirit_of_Barbs" && idName != "Blood_Golem" && idName != "Iron_Golem")) || effects[id].info.origin == "ctcskill") {
			if (effects[id].info.snapshot == 0) {
				effects[id].info.snapshot = 1;
				document.getElementById(id+"_ss").src = "./images/skills/snapshot.png";
			} else {
				effects[id].info.snapshot = 0;
				document.getElementById(id+"_ss").src = "./images/skills/none.png";
			}
			updateAllEffects()
			update()
			if (typeof(effects[id].info.enabled) == 'undefined') { hoverEffectOff() }
		}
	} else {
		toggleEffect(id)
	}
}

// removeEffect - 
//	id: the effect's id
//	direct: whether the effect icon was clicked directly (1 or null)
// ---------------------------------
function removeEffect(id, direct) {
	if (document.getElementById(id) != null) { if (effects[id].info.snapshot != 1) {
		var on = effects[id].info.enabled;
		var halt = 0;
		if (direct != null && effects[id].info.origin != "misc") { halt = 1 }
		if (effects[id].info.origin == "skill") {
			halt = 1;
			var skill = skills[effects[id].info.index];
			if (typeof(skill.effect) != 'undefined') { if (skill.effect > 0) { if (skill.level == 0 && skill.force_levels == 0) { halt = 0 } } }
		}
		if (effects[id].info.enabled == 1) { disableEffect(id) }
		update()
		if (halt == 0) {
			document.getElementById(id).remove();
			effects[id] = null
			for (effect_id in effects) { if (effects[effect_id] != null) { duplicateEffects[effect_id] = effects[effect_id] } }
			effects = duplicateEffects
			duplicateEffects = {}
			var secondary = "";
			var secondary_level = 0;
			if (on == 1) {
				for (effect_id in effects) { if (typeof(effects[effect_id].info.enabled) != 'undefined') { if (effects[effect_id].info.level > secondary_level) { secondary = effect_id; secondary_level = effects[effect_id].info.level; } } }
				if (secondary != "") { enableEffect(secondary) }
			}
			document.getElementById("tooltip_effect").style.display = "none"
			updateAllEffects()
		}
		adjustStackedAuras()
	} }
}

// toggleEffect - 
//	id: the effect's id
// ---------------------------------
function toggleEffect(id) {
	if (effects[id].info.enabled == 1) {
		disableEffect(id)
	} else {
		if (id.split("-")[0] == "Iron_Golem") { if (typeof(golemItem.aura) != 'undefined') { if (golemItem.aura != "") { for (effect_id in effects) { if (effect_id.split("-")[0] == getId(golemItem.aura)) { disableEffect(effect_id) } } } } }
		enableEffect(id)
	}
	updateEffect(id)	// current effect prioritized
	updateAllEffects()
}

// disableEffect - 
//	id: the effect's id
// ---------------------------------
function disableEffect(id) {
	if (document.getElementById(id) != null && effects[id].info.enabled == 1) {
		effects[id].info.enabled = 0
		document.getElementById(id+"_e").src = effects[id].info.imageOff
		for (affix in effects[id]) { if (affix != "info") { character[affix] -= effects[id][affix] } }
		//update() or updateEffect(id)?
	}
}

// enableEffect - 
//	id: the effect's id
// ---------------------------------
function enableEffect(id) {
	if (document.getElementById(id) != null && effects[id].info.enabled == 0) {
		effects[id].info.enabled = 1
		document.getElementById(id+"_e").src = effects[id].info.imageOn
		for (affix in effects[id]) { if (affix != "info") { character[affix] += effects[id][affix] } }
		if (effects[id].info.origin == "cskill" || effects[id].info.origin == "ctcskill") { disableEffect(id.split("-")[0]) }
	}
}

// updateAllEffects - 
// ---------------------------------
function updateAllEffects() {
	calculateSkillAmounts()
	// updates skill effects
	for (let s = 0; s < skills.length; s++) {
		var skill = skills[s];
		if (typeof(skill.effect) != 'undefined') { if (skill.effect > 0) {
			var id = skill.name.split(' ').join('_');
			if (skill.level > 0 || skill.force_levels > 0) {
				if (document.getElementById(id) == null) { addEffect("skill",skill.name,skill.i,"") }
				else { updateEffect(id) }
			} else {
				if (document.getElementById(id) != null) { removeEffect(id) }
			}
		} }
	}
	// updates oskill effects
	if (character.class_name != null) {
		for (let o = 0; o < oskills.length; o++) {
			var natClass = oskills_info[oskills[o]].native_class;
			if (natClass != "none" && natClass != character.class_name.toLowerCase()) {
				var skill = skills_all[natClass][oskills_info[oskills[o]].i]
				if (typeof(skill.effect) != 'undefined') { if (skill.effect > 0) {
					var id = skill.name.split(' ').join('_');
					if (character[oskills[o]] > 0) {
						if (document.getElementById(id) == null) { addEffect("oskill",skill.name,skill.i,"") }
						else { updateEffect(id) }
					} else {
						if (document.getElementById(id) != null) { removeEffect(id) }
					}
				} }
			}
		}
	}
	// updates cskill effects
	for (id in effects) { if (effects[id].info.origin == "cskill") {
		var match = 0;
		var group = effects[id].info.other;
		var cskill_level = effects[id].info.index;
		var cskill_name = id.split("-")[0].split("_").join(" ");
		if (typeof(equipped[group].cskill) != 'undefined' && equipped[group].cskill != "") {
			for (unit in equipped[group].cskill) {
				if (cskill_level == equipped[group].cskill[unit][0] && cskill_name == equipped[group].cskill[unit][1]) { match = 1 }
			}
		}
		if (match == 0) { removeEffect(id) }
	} }
	// updates ctcskill effects
	for (id in effects) { if (effects[id].info.origin == "ctcskill") {
		var match = 0;
		var group = effects[id].info.other;
		var ctcskill_level = effects[id].info.index;
		var ctcskill_name = id.split("-")[0].split("_").join(" ");
		if (typeof(equipped[group].ctc) != 'undefined' && equipped[group].ctc != "") {
			for (unit in equipped[group].ctc) {
				if (ctcskill_level == equipped[group].ctc[unit][1] && ctcskill_name == equipped[group].ctc[unit][2]) { match = 1 }
			}
		}
		if (match == 0) { removeEffect(id) }
	} }
	update()	// needed?
	// disables duplicate effects (non-skills)
	for (id in effects) { if (document.getElementById(id) != null) { if (document.getElementById(id).getAttribute("class") == "hide") { document.getElementById(id).setAttribute("class","effect-container") } } }
	var checkedEffects = {};
	for (id in effects) { checkedEffects[id] = 0 }
	for (id1 in effects) {
		if (typeof(effects[id1].info.enabled) != 'undefined' && effects[id1].info.origin != "skill" && effects[id1].info.origin != "oskill") {
			for (id2 in effects) {
				if (id1 != id2 && checkedEffects[id2] != 1 && typeof(effects[id2].info.enabled) != 'undefined' && effects[id2].info.origin != "skill" && effects[id2].info.origin != "oskill") {
					var effect1 = id1.split('-')[0];
					var effect2 = id2.split('-')[0];
					if (effect1 == effect2) {
						if (document.getElementById(id1).getAttribute("class") != "hide" && document.getElementById(id2).getAttribute("class") != "hide") {
							var magnitude1 = effects[id1].info.level;
							var magnitude2 = effects[id2].info.level;
							if (magnitude1 > magnitude2) {
								document.getElementById(id2).setAttribute("class","hide");
								document.getElementById(id1).setAttribute("class","effect-container");
							} else {
								document.getElementById(id1).setAttribute("class","hide");
								document.getElementById(id2).setAttribute("class","effect-container");
							}
						}
					}
				}
			}
		}
		checkedEffects[id1] = 1
	}
	for (id in effects) { if (typeof(effects[id].info.enabled) != 'undefined') { if (document.getElementById(id).getAttribute("class") == "hide") { disableEffect(id) } } }
	// disables duplicate effects (skills)
	if (character.class_name == "Paladin") { for (id1 in effects) {
		if (typeof(effects[id1].info.enabled) != 'undefined' && effects[id1].info.enabled == 1 && effects[id1].info.origin == "skill") {
			for (id2 in effects) {
				if (typeof(effects[id2].info.enabled) != 'undefined' && id1 != id2 && effects[id2].info.enabled == 1 && effects[id2].info.origin != "skill" && document.getElementById(id2).getAttribute("class") != "hide") {
					var effect1 = id1.split('-')[0];
					var effect2 = id2.split('-')[0];
					if (effect1 == effect2) {
						var magnitude1 = effects[id1].info.level;
						var magnitude2 = effects[id2].info.level;
						if (magnitude1 >= magnitude2) { disableEffect(id2); enableEffect(id1); }
						else { disableEffect(id1); enableEffect(id2); }
					}
				}
			}
		}
		update()	// needed?
	} }
	// disable incompatible effects
	for (id in effects) {
		if (id == "Fists_of_Ember") { if (equipped.weapon.type != "claw" && equipped.weapon.type != "dagger") { disableEffect(id) } }
		else if (id == "Fists_of_Thunder") { if (equipped.weapon.type != "claw" && equipped.weapon.type != "dagger") { disableEffect(id) } }
		else if (id == "Fists_of_Ice") { if (equipped.weapon.type != "claw" && equipped.weapon.type != "dagger") { disableEffect(id) } }
		else if (id == "Frenzy") { if (offhandType != "weapon") { disableEffect(id) } }
		else if (id == "Maul") { if (effects["Werebear"].info.enabled != 1) { disableEffect(id) } }
		else if (id == "Feral_Rage") { if (effects["Werewolf"].info.enabled != 1) { disableEffect(id) } }
		else if (id == "Holy_Shield") { if (offhandType != "shield") { disableEffect(id) } }
		else if (id == "Weapon_Block") { if (equipped.weapon.type != "claw" || equipped.offhand.type != "claw") { disableEffect(id) } }
	//	else if (id == "Claw_Mastery") { if (equipped.weapon.type != "claw" && equipped.offhand.type != "claw") { disableEffect(id) } else { enableEffect(id) } }
	//	else if (id == "Edged_Weapon_Mastery") { if (equipped.weapon.type != "sword" && equipped.weapon.type != "axe" && equipped.weapon.type != "dagger" && equipped.offhand.type != "sword" && equipped.offhand.type != "axe" && equipped.offhand.type != "dagger") { disableEffect(id) } else { enableEffect(id) } }
	//	else if (id == "Pole_Weapon_Mastery") { if (equipped.weapon.type != "polearm" && equipped.weapon.type != "spear" && equipped.offhand.type != "polearm" && equipped.offhand.type != "spear") { disableEffect(id) } else { enableEffect(id) } }
	//	else if (id == "Blunt_Weapon_Mastery") { if (equipped.weapon.type != "mace" && equipped.weapon.type != "scepter" && equipped.weapon.type != "staff" && equipped.weapon.type != "wand" && equipped.offhand.type != "mace" && equipped.offhand.type != "scepter" && equipped.offhand.type != "staff" && equipped.offhand.type != "wand") { disableEffect(id) } else { enableEffect(id) } }
	//	else if (id == "Thrown_Weapon_Mastery") { if (equipped.weapon.type != "thrown" && equipped.weapon.type != "javelin" && equipped.offhand.type != "thrown" && equipped.offhand.type != "javelin") { disableEffect(id) } else { enableEffect(id) } }
	}
	for (id in effects) { if (typeof(effects[id].info.enabled) != 'undefined') { if (effects[id].info.enabled == 1) { if (id.split("-")[0] == "Iron_Golem") {
		if (typeof(golemItem.aura) != 'undefined') { if (golemItem.aura != "" && golemItem.aura != "Righteous Fire") {
			var aura = golemItem.aura; var aura_lvl = golemItem.aura_lvl;
			for (effect_id in effects) {
				if (typeof(effects[effect_id].info.enabled) != 'undefined') { if (effects[effect_id].info.enabled == 1) {
					if (getId(aura) == effect_id.split('-')[0]) { disableEffect(id) }
				} }
			}
		} }
	} } } }
	update()
}

// updateEffect - 
//	id: the effect's id
// ---------------------------------
function updateEffect(id) {
	var origin = effects[id].info.origin;
	var index = effects[id].info.index;
	var other = effects[id].info.other;
	var name = id.split('-')[0].split('_').join(' ');
	var active = effects[id].info.enabled;
	var old_data = {}
	for (affix in effects[id]) { if (affix != "info") { old_data[affix] = effects[id][affix] } }
	
	setEffectData(origin,name,index,other)
	if (active == 1) {
		for (affix in old_data) { character[affix] -= old_data[affix] }
		effects[id].info.enabled = 0
		enableEffect(id)
	}
}

// adjustStackedAuras - 
// ---------------------------------
function adjustStackedAuras() {
	/* Possible Stacking Auras
		Holy Shock	Dream helm, Dream shield
		Holy Fire	Dragon armor, Dragon shield, Hand of Justice weapons
		Thorns		Edge bow, Bramble armor
		Redemption	Phoenix shield, Phoenix weapons
		Holy Freeze	Doom weapons
		Fanaticism	Beast Weapons
		Might		Last Wish weapons
		Sanctuary	Azurewrath/Lawbringer weapons
	*/
	var stackableAuras = ["Holy_Shock","Holy_Fire","Thorns","Redemption","Holy_Freeze","Fanaticism","Might","Sanctuary"];
	var stackedAuras = [0,0,0,0,0,0,0,0];
	var stackedLevels = [0,0,0,0,0,0,0,0];
	for (id in effects) {
		if (typeof(effects[id].info.enabled) != 'undefined' && effects[id].info.origin == "aura" && effects[id].info.other.split('_')[0] != "mercenary" && effects[id].info.other != "combined") {
			var effect = id.split('-')[0];
			for (let i = 0; i < stackableAuras.length; i++) {
				if (effect == stackableAuras[i]) {
					stackedAuras[i] += 1
					stackedLevels[i] += effects[id].info.index
				}
			}
		}
	}
	for (let i = 0; i < stackedAuras.length; i++) {
		var active = false;
		var id = stackableAuras[i]+"-combined";
		if (typeof(effects[id]) != 'undefined') { if (typeof(effects[id].info.enabled) != 'undefined') { active = true } }
		if (stackedAuras[i] > 1) {
			if (active == false) { addEffect("aura",stackableAuras[i].split("_").join(" "),stackedLevels[i],"combined") }
			else { effects[id].info.index = stackedLevels[i]; updateEffect(id); }
		} else {
			if (active != false) { removeEffect(id,null) }
		}
	}
}

// hoverEffectOn - 
//	id: the effect's id
// ---------------------------------
function hoverEffectOn(id) {
	var idName = id.split("-")[0];
	var name = idName.split("_").join(" ");
	document.getElementById("tooltip_effect").style.display = "block"
	var offset = 30;
	var done = false;
	for (effect_id in effects) {
		if (id == effect_id) { done = true }
		if (done == false) {
			if (effects[effect_id] != null) { if (typeof(effects[effect_id].info.enabled) != 'undefined') {
				if (document.getElementById(effect_id).getAttribute("class") != "hide") { offset += 36 }
			} }
		}
	}
	var origin = effects[id].info.origin;
	var other = effects[id].info.other;
	var level = "Level "+effects[id].info.level; if (name == "Lifted Spirit" || name == "Righteous Fire" || origin == "misc") { level = "" }
	var source = "";
	var note = "";
	var affixes = "";
	for (affix in effects[id]) { if (affix != "info" && affix != "duration" && affix != "radius") {
		if (stats[affix] != unequipped[affix] && stats[affix] != 1) {
			var affix_info = getAffixLine(affix,"effects",id,"");
			if (affix_info[1] != 0) { affixes += affix_info[0]+"<br>" }
		}
	} }
	if (origin != "skill" && origin != "oskill" && origin != "misc") {
		source = "Source: "
		var group = other;
		var other_minion = other.split("_")[0];
		if (other_minion == "mercenary") {
			group = other.split("_")[1]
			if (other == "mercenary") { source += "Mercenary" }
			else { source += "Mercenary - "+mercEquipped[group].name }
		} else if (other_minion == "combined") {
			source = "Multiple Sources"
		} else {
			source += equipped[group].name
		}
		if (origin == "cskill") { for (let i = 0; i < equipped[group].cskill.length; i++) { if (equipped[group].cskill[i][1] == name) { note = "<br>"+equipped[group].cskill[i][2]+" charges" } } }
		else if (origin == "ctcskill") { for (let i = 0; i < equipped[group].ctc.length; i++) { if (equipped[group].ctc[i][2] == name) { note = "<br>"+equipped[group].ctc[i][0]+"% chance to cast "+equipped[group].ctc[i][3] } } }
	} else if (origin == "oskill") {
		for (group in equipped) { if (typeof(equipped[group]["oskill_"+idName]) != 'undefined') { if (equipped[group]["oskill_"+idName] > 0) { source = "Source: "+equipped[group].name } } }
		if (source == "" && (id == "Battle_Command" || id == "Battle_Orders")) { source = "Source: Call to Arms (unequipped)" }
		if (source == "" && id == "Shiver_Armor") { source = "Source: Medusa's Gaze (unequipped)" }
	} else if (origin == "misc") {
		source = "Source: "+non_items[effects[id].info.index].name.split(":")[0]
	}
	if (typeof(effects[id].duration) != 'undefined') { if (effects[id].duration != 0) { note += "<br>Duration: "+effects[id].duration+" seconds" } }
	if (source == "Source: Potion") { note += " each" }
	if (id.split("-")[0] == "Iron_Golem" && golemItem.name != "none") {
		note += "<br>Item: "+golemItem.name.split(" ­ ")[0]
		if (affixes != "") { note += "<br>"+golemItem.aura }
	}
	if (typeof(effects[id].radius) != 'undefined') { if (effects[id].radius != 0) { note += "<br>Radius: "+effects[id].radius+" yards" } }
	if (level != "" && source != "") { level += "<br>" }
	if (source != "") { source = source.split(" ­ ")[0] }
	document.getElementById("tooltip_effect").style.top = offset+"px"
	document.getElementById("effect_name").innerHTML = name
	document.getElementById("effect_info").innerHTML = level+source+note
	document.getElementById("effect_affixes").innerHTML = affixes
}

// hoverEffectOff - 
// ---------------------------------
function hoverEffectOff() {
	document.getElementById("tooltip_effect").style.display = "none"
}

// resetEffects - Removes all effects
// ---------------------------------
function resetEffects() {
	for (id in effects) { if (typeof(effects[id].info.snapshot) != 'undefined') { effects[id].info.snapshot = 0 } }
	updateAllEffects()
	for (id in effects) { if (document.getElementById(id) != null) { removeEffect(id) } }
}

// getAuraData - gets a list of stats corresponding to the aura (excludes synergy bonuses)
//	aura: name of the aura
//	lvl: level of the aura (1+)
//	source: "mercenary" or the item type which is granting the aura
// result: indexed array of stats granted and their values
// ---------------------------------
function getAuraData(aura, lvl, source) {
	source = source.split('_')[0]
	var result = {};
	var a = -1;
	var auras = [];
	for (let u = 0; u < 20; u++) {
		if (skills_all["paladin"][u].name == aura) { auras = skills_all["paladin"]; a = u; }
	}
	for (let u = 0; u < auras_extra.length; u++) {
		if (auras_extra[u].name == aura) { auras = auras_extra; a = u; }
	}
	// Defensive Auras
	if (aura == "Prayer") { result.life_regen = 1; result.life_replenish = auras[a].data.values[0][lvl]; result.radius = 21.3; }
	else if (aura == "Resist Fire") { result.fRes = auras[a].data.values[1][lvl]; result.fRes_max = auras[a].data.values[2][lvl]; result.radius = 28; }
	else if (aura == "Defiance") { result.defense_bonus = auras[a].data.values[0][lvl]; result.radius = 21.3; }
	else if (aura == "Resist Cold") { result.cRes = auras[a].data.values[1][lvl]; result.cRes_max = auras[a].data.values[2][lvl]; result.radius = 28; }
	else if (aura == "Cleansing") { result.poison_length_reduced = auras[a].data.values[2][lvl]; result.curse_length_reduced = auras[a].data.values[2][lvl]; result.radius = 21.3; }
	else if (aura == "Resist Lightning") { result.lRes = auras[a].data.values[1][lvl]; result.lRes_max = auras[a].data.values[2][lvl]; result.radius = 28; }
	else if (aura == "Vigor") { result.velocity = auras[a].data.values[0][lvl]; result.max_stamina = auras[a].data.values[1][lvl]; result.heal_stam = auras[a].data.values[2][lvl]; result.radius = 21.3; }
	else if (aura == "Meditation") { result.mana_regen = auras[a].data.values[1][lvl]; result.radius = 21.3; }
	else if (aura == "Redemption") { result.redeem_chance = auras[a].data.values[0][lvl]; result.redeem_amount = auras[a].data.values[1][lvl]; result.radius = 16; }
	else if (aura == "Salvation") { result.fDamage = auras[a].data.values[0][lvl]; result.cDamage = auras[a].data.values[0][lvl]; result.lDamage = auras[a].data.values[0][lvl]; result.all_res = auras[a].data.values[1][lvl]; result.radius = 28; }
	// Offensive Auras
	else if (aura == "Might") { result.damage_bonus = auras[a].data.values[0][lvl]; result.radius = 16; }
	else if (aura == "Holy Fire") { result.fDamage_min = auras[a].data.values[0][lvl]; result.fDamage_max = auras[a].data.values[1][lvl]; result.radius = 12; }
	else if (aura == "Precision") { result.cstrike = auras[a].data.values[2][lvl]; result.ar_bonus = auras[a].data.values[3][lvl]; result.radius = 16; if (source == "mercenary" || source == "golem") { result.pierce = auras[a].data.values[1][lvl] } else { result.pierce = auras[a].data.values[0][lvl] }}
	else if (aura == "Blessed Aim") { result.ar_bonus = auras[a].data.values[2][lvl]; result.hammer_on_hit = auras[a].data.values[1][lvl]; result.radius = 16; }
	else if (aura == "Concentration") { result.ar_bonus = auras[a].data.values[0][lvl]; result.damage_bonus = auras[a].data.values[1][lvl]; result.hammer_bonus = auras[a].data.values[2][lvl]; result.radius = 16; }
	else if (aura == "Holy Freeze") { result.cDamage_min = auras[a].data.values[0][lvl]; result.cDamage_max = auras[a].data.values[1][lvl]; result.slow_enemies = auras[a].data.values[4][lvl]; result.radius = 13.3; }
	else if (aura == "Holy Shock") { result.lDamage_min = auras[a].data.values[0][lvl]; result.lDamage_max = auras[a].data.values[1][lvl]; result.radius = 18.6; }
	else if (aura == "Sanctuary") { result.damage_vs_undead = auras[a].data.values[0][lvl]; result.radius = 12.6; }
	else if (aura == "Fanaticism") { result.ias_skill = auras[a].data.values[2][lvl]; result.ar_bonus = auras[a].data.values[3][lvl]; result.radius = 12; if (source == "mercenary" || source == "golem") { result.damage_bonus = auras[a].data.values[0][lvl] } else { result.damage_bonus = auras[a].data.values[1][lvl] }}
	else if (aura == "Conviction") { result.enemy_defense = auras[a].data.values[0][lvl]; result.enemy_fRes = auras[a].data.values[1][lvl]; result.enemy_cRes = auras[a].data.values[1][lvl]; result.enemy_lRes = auras[a].data.values[1][lvl]; result.enemy_pRes = auras[a].data.values[1][lvl]; result.radius = 21.3; }
	// Others
	else if (aura == "Thorns") { result.thorns_reflect = auras[a].values[0][lvl]; result.radius = 16; }	// TODO: radius is a guess - get confirmation
	else if (aura == "Inner Sight") { result.enemy_defense_flat = auras[a].values[0][lvl]; result.enemy_defense_flat = auras[a].values[1][lvl]; }
	else if (aura == "Righteous Fire") { result.flamme = auras[a].values[0][lvl]; result.radius = 5; }		// No buffs. Deals 45% of max life as fire damage per second in a small area.
	else if (aura == "Lifted Spirit") { result.damage_bonus = auras[a].values[0][lvl]; result.fDamage = auras[a].values[0][lvl]; result.cDamage = auras[a].values[0][lvl]; result.lDamage = auras[a].values[0][lvl]; result.pDamage = auras[a].values[0][lvl]; result.radius = 16; }	// TODO: radius is a guess - get confirmation
	// Paladin Synergies
	if (character.class_name == "Paladin") {
		if (aura == "Cleansing") { result.life_replenish = Math.min(1,(skills[0].level+skills[0].force_levels))*~~(skills[0].data.values[0][skills[0].level+skills[0].extra_levels]); }
		else if (aura == "Meditation") { result.life_replenish = Math.min(1,(skills[0].level+skills[0].force_levels))*~~(skills[0].data.values[0][skills[0].level+skills[0].extra_levels]); }
		else if (aura == "Holy Fire") { 
			result.fDamage_min = auras[a].data.values[0][lvl] * (1 + 0.04*skills[1].level + 0.06*skills[9].level);
			result.fDamage_max = auras[a].data.values[1][lvl] * (1 + 0.04*skills[1].level + 0.06*skills[9].level); }
		else if (aura == "Holy Freeze") { 
			result.cDamage_min = auras[a].data.values[0][lvl] * (1 + 0.04*skills[3].level + 0.06*skills[9].level);
			result.cDamage_max = auras[a].data.values[1][lvl] * (1 + 0.04*skills[3].level + 0.06*skills[9].level); }
		else if (aura == "Holy Shock") { 
			result.lDamage_min = auras[a].data.values[0][lvl] * (1 + 0.04*skills[5].level + 0.06*skills[9].level);
			result.lDamage_max = auras[a].data.values[1][lvl] * (1 + 0.04*skills[5].level + 0.06*skills[9].level); }
	}
	return result;
}

// getCSkillData - gets a list of stats corresponding to the cskill (item charge-skill)
//	name: name of the skill
//	lvl: level of the skill (1+)
//	group: source item group for the skill
// result: indexed array of stats granted and their values
// ---------------------------------
function getCSkillData(name, lvl, group) {
	var result = {};
	var unit = getId(name);
	var id = unit+"-"+group;
	var skill = skills_all[effect_cskills[unit].native_class][effect_cskills[unit].i];
	// Amazon
	if (name == "Inner Sight") { result.enemy_defense_flat = skill.data.values[0][lvl]; result.radius = skill.data.values[1][lvl]; }
	else if (name == "Phase Run") { result.fhr = 30; result.velocity = 30; result.duration = skill.data.values[0][lvl]; }
	// Assassin
	else if (name == "Cloak of Shadows") { result.defense_bonus = skill.data.values[0][lvl]; result.enemy_defense = skill.data.values[1][lvl]; result.duration = 8; }
	else if (name == "Venom") { result.pDamage_min = skill.data.values[1][lvl]; result.pDamage_max = skill.data.values[2][lvl]; result.pDamage_duration = 0.4; result.pDamage_duration_override = 0.4; result.duration = skill.data.values[0][lvl]; }
	// Druid
	else if (name == "Cyclone Armor") { result.absorb_elemental = skill.data.values[0][lvl]; }
	else if (name == "Heart of Wolverine") { result.damage_bonus = skill.data.values[1][lvl]; result.ar_bonus = skill.data.values[2][lvl]; result.radius = skill.data.values[3][lvl]; }
	else if (name == "Oak Sage") { result.max_life = skill.data.values[1][lvl]; result.radius = skill.data.values[2][lvl]; }
	else if (name == "Spirit of Barbs") { result.thorns_reflect = skill.data.values[1][lvl]; result.radius = skill.data.values[2][lvl]; }
	// Necromancer
	else if (name == "Blood Golem") {
		if (effects[id].info.enabled == 1) { for (effect_id in effects) { var idName = effect_id.split("-")[0]; if (effect_id != id && (idName == "Blood_Golem" || idName == "Iron_Golem" || idName == "Clay_Golem" || idName == "Fire_Golem")) { disableEffect(effect_id) } } }
		result.life_per_ranged_hit = skill.data.values[3][lvl]; result.life_per_hit = skill.data.values[4][lvl]; result.radius = skill.data.values[5][lvl];
	}
	else if (name == "Iron Golem") {
		if (effects[id].info.enabled == 1) { for (effect_id in effects) { var idName = effect_id.split("-")[0]; if (effect_id != id && (idName == "Blood_Golem" || idName == "Iron_Golem" || idName == "Clay_Golem" || idName == "Fire_Golem")) { disableEffect(effect_id) } } }
		if (typeof(golemItem.aura) != 'undefined') { if (golemItem.aura != "") {
			var auraInfo = getAuraData(golemItem.aura, golemItem.aura_lvl, "golem");
			for (affix in auraInfo) { result[affix] = auraInfo[affix] }
		} }
	}
	else if (name == "Deadly Poison") {
		result.pDamage_min = skill.data.values[1][lvl]; result.pDamage_max = skill.data.values[2][lvl]; result.pDamage_duration = 2; result.pDamage_duration_override = 2; result.enemy_pRes = skill.data.values[3][lvl]; result.duration = skill.data.values[0][lvl];
		if (character.class_name == "Necromancer") {
			result.pDamage_min = skill.data.values[1][lvl] * (1 + (0.10*skills[15].level + 0.10*skills[19].level));
			result.pDamage_max = skill.data.values[2][lvl] * (1 + (0.10*skills[15].level + 0.10*skills[19].level));
		}
	}
	// Sorceress
	else if (name == "Enflame") {
		result.fDamage_min = skill.data.values[1][lvl]; result.fDamage_max = skill.data.values[2][lvl]; result.ar_bonus = skill.data.values[3][lvl]; result.duration = skill.data.values[0][lvl];
		if (character.class_name == "Sorceress") {
			result.fDamage_min = skill.data.values[1][lvl] * (1 + (0.12*skills[23].level)) * (1 + Math.min(1,(skills[30].level+skills[30].force_levels))*(~~skills[30].data.values[1][skills[30].level+skills[30].extra_levels])/100);
			result.fDamage_max = skill.data.values[2][lvl] * (1 + (0.12*skills[23].level)) * (1 + Math.min(1,(skills[30].level+skills[30].force_levels))*(~~skills[30].data.values[1][skills[30].level+skills[30].extra_levels])/100);
		}
	}
	return result;
}

// getCTCSkillData - gets a list of stats corresponding to the ctcskill (item chance-to-cast skill)
//	name: name of the skill
//	lvl: level of the skill (1+)
//	group: source item group for the skill
// result: indexed array of stats granted and their values
// ---------------------------------
function getCTCSkillData(name, lvl, group) {
	var result = {};
	var unit = getId(name);
	var effect_id = unit+"-"+group;
	var skill = skills_all[effect_ctcskills[unit].native_class][effect_ctcskills[unit].i];
	// Assassin
	if (name == "Fade") {
		if (effects[effect_id].info.enabled == 1) { for (id in effects) { if (id == "Burst_of_Speed" || id == unit) { disableEffect(id) } } }
		result.curse_length_reduced = skill.data.values[0][lvl]; result.all_res = skill.data.values[1][lvl]; result.pdr = skill.data.values[2][lvl]; result.duration = skill.data.values[3][lvl];
	}
	else if (name == "Venom") { result.pDamage_min = skill.data.values[1][lvl]; result.pDamage_max = skill.data.values[2][lvl]; result.pDamage_duration = 0.4; result.pDamage_duration_override = 0.4; result.duration = skill.data.values[0][lvl]; }
	// Druid
	else if (name == "Cyclone Armor") { result.absorb_elemental = skill.data.values[0][lvl]; }
	// Sorceress
	else if (name == "Chilling Armor") {
		if (effects[effect_id].info.enabled == 1) { for (id in effects) { if (id == "Shiver_Armor" || id == unit) { disableEffect(id) } } }
		result.defense_bonus = skill.data.values[1][lvl]; result.duration = skill.data.values[0][lvl];
	}
	else if (name == "Blaze") { result.life_regen = 2; result.duration = skill.data.values[0][lvl]; }
	else if (name == "Enflame") {
		result.fDamage_min = skill.data.values[1][lvl]; result.fDamage_max = skill.data.values[2][lvl]; result.ar_bonus = skill.data.values[3][lvl]; result.duration = skill.data.values[0][lvl];
		if (character.class_name == "Sorceress") {
			result.fDamage_min = skill.data.values[1][lvl] * (1 + (0.12*skills[23].level)) * (1 + Math.min(1,(skills[30].level+skills[30].force_levels))*(~~skills[30].data.values[1][skills[30].level+skills[30].extra_levels])/100);
			result.fDamage_max = skill.data.values[2][lvl] * (1 + (0.12*skills[23].level)) * (1 + Math.min(1,(skills[30].level+skills[30].force_levels))*(~~skills[30].data.values[1][skills[30].level+skills[30].extra_levels])/100);
		}
	}
	// Necromancer
	else if (name == "Flesh Offering") { result.duration = skill.data.values[0][lvl]; result.radius = skill.data.values[1][lvl]; }	// TODO: implement for summons: result.fcr = skill.data.values[2][lvl]; result.ias_skill = skill.data.values[3][lvl]; result.velocity = skill.data.values[4][lvl]; 
	return result;
}

// getMiscData - 
//	name: name of selected misc effect
//	index: index of the selected misc element
// return: affixes of the misc element
// ---------------------------------
function getMiscData(name, index) {
	var result = {};
	for (affix in non_items[index]) { if (affix != "i" && affix != "name" && affix != "recharge" && affix != "effect") {
		result[affix] = non_items[index][affix]
	} }
	return result
}

// toggleQuests - Toggles the completion of all quests and their rewards
//	quests: name identifier for 'Quests Completed' checkbox element
// ---------------------------------
function toggleQuests(quests) {
	if (quests.checked == false && (character.skillpoints < 12 || character.statpoints < 15)) { quests.checked = true }
	else {
		character.quests_completed *= -1
		var toggle = character.quests_completed
		character.skillpoints += (12*toggle)
		character.statpoints += (15*toggle)
		character.life += (60*toggle)
		character.fRes += (30*toggle)
		character.cRes += (30*toggle)
		character.lRes += (30*toggle)
		character.pRes += (30*toggle)
		// TODO: Include merchant price discount?
		updatePrimaryStats()
		updateOther()
	}
	//document.getElementById("quests").indeterminate = true;
	// Den of Evil
	// Radament's Lair
	// The Golden Bird
	// Lam Esen's Tome
	// The Fallen Angel
	// Prison of Ice
}

// toggleRunning - Toggles whether the character is running or walking/standing
//	running: name identifier for 'Running' checkbox element
// ---------------------------------
function toggleRunning(running) {
	if (running.checked == true) { character.running = 1 } else { character.running = 0 }
	updateStats()
}

// changeDifficulty - Changes the game difficulty
//	diff: game difficulty (1-3)
// ---------------------------------
function changeDifficulty(diff) {
	character.difficulty = diff
	var penalties = ["fRes_penalty", "cRes_penalty", "lRes_penalty", "pRes_penalty", "mRes_penalty"]
	for (let p = 0; p < penalties.length; p++) {
		if (diff == 1) { character[penalties[p]] = 0 }
		else if (diff == 2) { character[penalties[p]] = 40 }
		else if (diff == 3) { character[penalties[p]] = 100 }
	}
	//document.getElementById("difficulty"+diff).checked = true
	updatePrimaryStats()
	updateOther()
}

// changeMonster - Changes the target monster
//	mon_id: monster's id
// ---------------------------------
function changeMonster(mon_id) {
	monsterID = ~~mon_id.split("on")[1]
	document.getElementById(mon_id).checked = true
	updatePrimaryStats()
}

// toggleCoupling - Changes whether adding/removing skill points can affect character level
//	coupling: name identifier for 'Skill Level Coupling' checkbox element
// ---------------------------------
function toggleCoupling(coupling) {
	if (coupling.checked) { settings.coupling = 1 } else { settings.coupling = 0 }
}

// toggleAutocast - Changes whether buffs and auras are automatically enabled when added
//	autocast: name identifier for 'New Effects Begin Enabled' checkbox element
// ---------------------------------
function toggleAutocast(autocast) {
	if (autocast.checked) { settings.autocast = 1 } else { settings.autocast = 0 }
}

// getWeaponDamage - Calculates physical min/max damage and multiplier for an equipped weapon
//	str: total strength
//	dex: total dexterity
//	group: weapon's group ('weapon' or 'offhand')
//	thrown: 1 if the weapon is being thrown, otherwise 0
// return: array with [min damage, max damage, multiplier]
// ---------------------------------
function getWeaponDamage(str, dex, group, thrown) {
	var c = character;
	var type = equipped[group].type;
	var other = "offhand";
	if (group == "offhand") { other = "weapon" }
	// multiplier from stats
	var statBonus = 0;
	if (typeof(type) != 'undefined') { 
		if (type == "hammer") { statBonus = (str*1.1/100) }
		else if ((type == "spear" || type == "javelin") && equipped[group].only == "amazon") { statBonus = ((str*0.8/100)+(dex*0.5/100)) }
		else if (type == "bow" || type == "crossbow" || type == "javelin") { statBonus = (dex/100) }						// check if javelins are counted as missile weapons or throwing weapons
		else if (type == "dagger" || type == "thrown" || type == "claw" || type == "javelin") { statBonus = ((str*0.75/100)+(dex*0.75/100)) }	// check if javelins are counted as missile weapons or throwing weapons
		else  { statBonus = (str/100) }
	}
	// multiplier from skills
	var weapon_skillup = 0;
	if (type == "sword" || type == "axe" || type == "dagger") { weapon_skillup = c.edged_damage; c.ar_skillup = c.edged_ar; c.cstrike_skillup = c.edged_cstrike; }
	else if (type == "polearm" || type == "spear") { weapon_skillup = c.pole_damage; c.ar_skillup = c.pole_ar; c.cstrike_skillup = c.pole_cstrike; }
	else if (type == "mace" || type == "scepter" || type == "staff" || type == "hammer" || type == "club" || type == "wand") { weapon_skillup = c.blunt_damage; c.ar_skillup = c.blunt_ar; c.cstrike_skillup = c.blunt_cstrike; }
	else if (type == "thrown" || type == "javelin") { weapon_skillup = c.thrown_damage; c.ar_skillup = c.thrown_ar; c.pierce_skillup = c.thrown_pierce; }	// check if javelins can benefit from Pole Weapon Mastery
	else if (type == "claw") { weapon_skillup = c.claw_damage; c.ar_skillup = c.claw_ar; c.cstrike_skillup = c.claw_cstrike; }
	else { weapon_skillup = 0; c.ar_skillup = 0; c.cstrike_skillup = 0; c.pierce_skillup = 0; }
	var e_damage_other = 0;
	if (offhandType == "weapon") { e_damage_other = (~~(equipped[other].e_damage) + ~~(socketed[other].totals.e_damage) + ~~(corruptsEquipped[other].e_damage)); }
	var e_damage = c.e_damage + (c.level*c.e_max_damage_per_level) - e_damage_other;
	var base_min = equipped[group].base_damage_min;
	var base_max = equipped[group].base_damage_max;
	if (thrown == 1) { base_min = ~~(equipped[group].throw_min); base_max = ~~(equipped[group].throw_max); }
	var phys_min = (base_min * (1+e_damage/100) + c.damage_min + (c.level-1)*c.min_damage_per_level);
	var phys_max = (base_max * (1+e_damage/100) + c.damage_max + (c.level-1)*c.max_damage_per_level);
	var phys_mult = (1+statBonus+(c.damage_bonus+weapon_skillup)/100);
	var values = [phys_min, phys_max, phys_mult];
	
	return values
}

// getWeaponDamage - Calculates non-physical damage for an equipped weapon
//	group: weapon's group ('weapon' or 'offhand')
// return: indexed array with elemental/magic min/max damage values
// ---------------------------------
function getNonPhysWeaponDamage(group) {
	var c = character;
	var energyTotal = (c.energy + c.all_attributes)*(1+c.max_energy/100);
	var cDamage_sockets_filled = ~~(equipped.weapon.cDamage_per_socketed*socketed.weapon.socketsFilled)+~~(equipped.offhand.cDamage_per_socketed*socketed.offhand.socketsFilled);
	var f_min = c.fDamage_min*(1+c.fDamage/100);
	var f_max = (c.fDamage_max+(c.level*c.fDamage_max_per_level))*(1+c.fDamage/100);
	var c_min = (c.cDamage_min+(c.cDamage_per_ice*c.charge_ice)+cDamage_sockets_filled)*(1+c.cDamage/100);
	var c_max = (c.cDamage_max+(c.cDamage_per_ice*c.charge_ice)+(c.level*c.cDamage_max_per_level)+cDamage_sockets_filled)*(1+c.cDamage/100);
	var l_min = c.lDamage_min*(1+c.lDamage/100);
	var l_max = (c.lDamage_max+(Math.floor(energyTotal/2)*c.lDamage_max_per_2_energy))*(1+c.lDamage/100);
	var p_min = (c.pDamage_all+c.pDamage_min)*(1+c.pDamage/100);	// TODO: Damage over time should be separate from regular damage. Calculate poison bitrate.
	var p_max = (c.pDamage_all+c.pDamage_max)*(1+c.pDamage/100);	//	 Also, poison doesn't overlap from different sources?
	var m_min = c.mDamage_min;
	var m_max = c.mDamage_max;
	if (offhandType == "weapon") {
		if (group == "weapon") {
			f_min = (c.fDamage_min-~~(equipped.offhand.fDamage_min))*(1+c.fDamage/100);
			f_max = ((c.fDamage_max-~~(equipped.offhand.fDamage_max))+(c.level*c.fDamage_max_per_level))*(1+c.fDamage/100);
			c_min = ((c.cDamage_min-~~(equipped.offhand.cDamage_min))+(c.cDamage_per_ice*c.charge_ice)+cDamage_sockets_filled)*(1+c.cDamage/100);
			c_max = ((c.cDamage_max-~~(equipped.offhand.cDamage_max))+(c.cDamage_per_ice*c.charge_ice)+(c.level*c.cDamage_max_per_level)+cDamage_sockets_filled)*(1+c.cDamage/100);
			l_min = (c.lDamage_min-~~(equipped.offhand.lDamage_min))*(1+c.lDamage/100);
			l_max = ((c.lDamage_max-~~(equipped.offhand.lDamage_max))+(Math.floor(energyTotal/2)*c.lDamage_max_per_2_energy))*(1+c.lDamage/100);
			p_min = (c.pDamage_all+c.pDamage_min-~~(equipped.offhand.pDamage_min))*(1+c.pDamage/100);
			p_max = (c.pDamage_all+c.pDamage_max-~~(equipped.offhand.pDamage_max))*(1+c.pDamage/100);
			m_min = c.mDamage_min - ~~(equipped.offhand.mDamage_min);
			m_max = c.mDamage_max - ~~(equipped.offhand.mDamage_max);
		} else {
			f_min = (c.fDamage_min-~~(equipped.weapon.fDamage_min))*(1+c.fDamage/100);
			f_max = ((c.fDamage_max-~~(equipped.weapon.fDamage_max))+(c.level*c.fDamage_max_per_level))*(1+c.fDamage/100);
			c_min = ((c.cDamage_min-~~(equipped.weapon.cDamage_min))+(c.cDamage_per_ice*c.charge_ice)+cDamage_sockets_filled)*(1+c.cDamage/100);
			c_max = ((c.cDamage_max-~~(equipped.weapon.cDamage_max))+(c.cDamage_per_ice*c.charge_ice)+(c.level*c.cDamage_max_per_level)+cDamage_sockets_filled)*(1+c.cDamage/100);
			l_min = (c.lDamage_min-~~(equipped.weapon.lDamage_min))*(1+c.lDamage/100);
			l_max = ((c.lDamage_max-~~(equipped.weapon.lDamage_max))+(Math.floor(energyTotal/2)*c.lDamage_max_per_2_energy))*(1+c.lDamage/100);
			p_min = (c.pDamage_all+c.pDamage_min-~~(equipped.weapon.pDamage_min))*(1+c.pDamage/100);
			p_max = (c.pDamage_all+c.pDamage_max-~~(equipped.weapon.pDamage_max))*(1+c.pDamage/100);
			m_min = c.mDamage_min - ~~(equipped.weapon.mDamage_min);
			m_max = c.mDamage_max - ~~(equipped.weapon.mDamage_max);
		}
	}
	var values = {fMin:f_min,fMax:f_max,cMin:c_min,cMax:c_max,lMin:l_min,lMax:l_max,pMin:p_min,pMax:p_max,mMin:m_min,mMax:m_max};
	return values
}

// updateStats - Updates all stats
// ---------------------------------
function updateStats() { updatePrimaryStats(); updateOther(); updateSecondaryStats(); updateTertiaryStats(); }

// updatePrimaryStats - Updates stats shown by the default (original D2) stat page
// ---------------------------------
function updatePrimaryStats() {
	var c = character;
	var strTotal = (c.strength + c.all_attributes + (c.level-1)*c.strength_per_level);
	var dexTotal = (c.dexterity + c.all_attributes + (c.level-1)*c.dexterity_per_level);
	var vitTotal = (c.vitality + c.all_attributes + (c.level-1)*c.vitality_per_level);
	var energyTotal = (c.energy + c.all_attributes)*(1+c.max_energy/100);
	
	var life_addon = (vitTotal-c.starting_vitality)*c.life_per_vitality;
	var stamina_addon = (vitTotal-c.starting_vitality)*c.stamina_per_vitality;
	var mana_addon = (energyTotal-c.starting_energy)*c.mana_per_energy;
	
	var item_def = 0;
	for (group in corruptsEquipped) {
		if (typeof(equipped[group].base_defense) != 'undefined') { if (equipped[group].base_defense != unequipped.base_defense) {
			var multEth = 1;
			var multED = 1;
			if (typeof(equipped[group]["ethereal"]) != 'undefined') { if (equipped[group]["ethereal"] == 1) { multEth = 1.5; } }
			if (typeof(equipped[group]["e_def"]) != 'undefined') { multED += (equipped[group]["e_def"]/100) }
			if (typeof(corruptsEquipped[group]["e_def"]) != 'undefined') { multED += (corruptsEquipped[group]["e_def"]/100) }
			if (group == "helm" || group == "armor" || group == "weapon" || group == "offhand") { if (typeof(socketed[group].totals["e_def"]) != 'undefined') { multED += (socketed[group].totals["e_def"]/100) } }
			if (typeof(equipped[group].set_bonuses) != 'undefined') {
				for (let i = 2; i < equipped[group].set_bonuses.length; i++) { if (i <= character[equipped[group].set_bonuses[0]]) {
					for (affix in equipped[group].set_bonuses[i]) { if (affix == "e_def") { multED += equipped[group].set_bonuses[i][affix]/100 } }
				} }
			}
			equipped[group].item_defense = Math.ceil(multEth*multED*equipped[group].base_defense)// + ~~equipped[group].defense + Math.floor(~~equipped[group].defense_per_level*c.level)
			item_def += equipped[group].item_defense
			// TODO: Incorporate other defense affixes so item_defense can be referenced in the tooltip for total defense?
		} } else {
			//equipped[group].item_defense = ~~equipped[group].defense + Math.floor(~~equipped[group].defense_per_level*c.level)
		}
	}
	var def = (item_def + c.defense + c.level*c.defense_per_level + Math.floor(dexTotal/4)) * (1 + (c.defense_bonus + c.defense_skillup)/100);
	var ar = ((dexTotal - 7) * 5 + c.ar + c.level*c.ar_per_level + c.ar_const + (c.ar_per_socketed*socketed.offhand.socketsFilled)) * (1+(c.ar_skillup + c.ar_bonus + c.level*c.ar_bonus_per_level)/100) * (1+c.ar_shrine_bonus/100);
	
/*	// Poison Calculation Testing
	var pDamage = c.pDamage_all;
	var pDuration = c.pDamage_duration;
	var pFrames = pDuration*25;
	var pAmount = Math.floor(pDamage*256/pFrames + (pFrames-1)/pFrames);
	var pBite = pAmount*pFrames;
	var pTotal_duration = Math.floor(pFrames / c.pDamage_duration);	// sum
	var pTotal_damage = Math.round(pAmount * pTotal_duration);	// sum
	document.getElementById("f4").innerHTML = c.pDamage_all+" over "+c.pDamage_duration+"s = "+Math.round(pTotal_damage/((256/25)*pDuration))+" "+pBite/pFrames
	document.getElementById("c4").innerHTML = pAmount+" "+pTotal_duration+" "+Math.round(pTotal_damage/(pDamage/pDuration))
*/
	var physDamage = getWeaponDamage(strTotal,dexTotal,"weapon",0);
	var dmg = getNonPhysWeaponDamage("weapon");
	var basic_min = Math.floor(physDamage[0]*physDamage[2] + dmg.fMin + dmg.cMin + dmg.lMin + dmg.pMin + dmg.mMin);
	var basic_max = Math.floor(physDamage[1]*physDamage[2] + dmg.fMax + dmg.cMax + dmg.lMax + dmg.pMax + dmg.mMax);
	if (basic_min > 0 || basic_max > 0) { document.getElementById("basic_attack").innerHTML = basic_min + "-" + basic_max + " {"+Math.ceil((basic_min+basic_max)/2)+"}"}
	else { document.getElementById("basic_attack").innerHTML = "" }
	if (offhandType == "weapon") {
		var ohd = getNonPhysWeaponDamage("offhand");
		var physDamage_offhand = getWeaponDamage(strTotal,dexTotal,"offhand",0);
		var basic_min_offhand = Math.floor(physDamage_offhand[0]*physDamage_offhand[2] + ohd.fMin + ohd.cMin + ohd.lMin + ohd.pMin + ohd.mMin);
		var basic_max_offhand = Math.floor(physDamage_offhand[1]*physDamage_offhand[2] + ohd.fMax + ohd.cMax + ohd.lMax + ohd.pMax + ohd.mMax);
		if (equipped.weapon.name != "none") {
			if (basic_min_offhand > 0 || basic_max_offhand > 0) { document.getElementById("offhand_basic_damage").innerHTML = basic_min_offhand + "-" + basic_max_offhand + " {"+Math.ceil((basic_min_offhand+basic_max_offhand)/2)+"}"}
			else { document.getElementById("offhand_basic_damage").innerHTML = "" }
		} else {
			if (basic_min_offhand > 0 || basic_max_offhand > 0) { document.getElementById("basic_attack").innerHTML = basic_min_offhand + "-" + basic_max_offhand + " {"+Math.ceil((basic_min_offhand+basic_max_offhand)/2)+"}"; document.getElementById("offhand_basic").style.display = "none"; }
		}
	}
	
	var block_shield = c.block;
	if (c.class_name == "Amazon" || c.class_name == "Assassin" || c.class_name == "Barbarian") { block_shield -= 5 }
	if (c.class_name == "Druid" || (c.class_name == "Necromancer" && equipped.offhand.only != "necromancer") || c.class_name == "Sorceress") { block_shield -= 10 }
	var block = Math.min(((Math.max(0,block_shield) + c.ibc)*(dexTotal-15)/(c.level*2)),(block_shield+c.ibc))
	if (c.block_skillup > 0) { block = Math.min((c.block_skillup*(dexTotal-15)/(c.level*2)),c.block_skillup) }
	if (c.running > 0) { block = Math.min(25,block/3) }
	if (c.block > 0 || c.block_skillup > 0) {
		document.getElementById("block_label").style.visibility = "visible"
		document.getElementById("block").innerHTML = Math.floor(Math.min(75,block))+"%"
	} else {
		document.getElementById("block_label").style.visibility = "hidden"
		document.getElementById("block").innerHTML = ""
	}
	
	var enemy_lvl = ~~MonStats[monsterID][4+c.difficulty];
	enemy_lvl = Math.min(~~c.level,89)	// temp, sets 'area level' at the character's level
	var enemy_def = (MonStats[monsterID][8] * MonLevel[enemy_lvl][c.difficulty])/100;
	enemy_def = Math.max(0,enemy_def + enemy_def*(c.enemy_defense+c.target_defense)/100+c.enemy_defense_flat)
	var hit_chance = Math.round(Math.max(5,Math.min(95,(100 * ar / (ar + enemy_def)) * (2 * c.level / (c.level + enemy_lvl)))));

	document.getElementById("strength").innerHTML = Math.floor(strTotal)
	document.getElementById("dexterity").innerHTML = Math.floor(dexTotal)
	document.getElementById("vitality").innerHTML = Math.floor(vitTotal)
	document.getElementById("energy").innerHTML = Math.floor(energyTotal)
	document.getElementById("strength2").innerHTML = Math.floor(strTotal)
	document.getElementById("dexterity2").innerHTML = Math.floor(dexTotal)
	document.getElementById("vitality2").innerHTML = Math.floor(vitTotal)
	document.getElementById("energy2").innerHTML = Math.floor(energyTotal)
	document.getElementById("defense").innerHTML = Math.floor(def + c.melee_defense)
	if ((c.missile_defense-c.melee_defense) > 0) { document.getElementById("defense").innerHTML += " (+" + (c.missile_defense) + ")" }	// add difference when missile & melee defense are both present?
	if (c.running > 0) { document.getElementById("defense").style.color = "brown" }
	else { document.getElementById("defense").style.color = "gray" }
	document.getElementById("ar").innerHTML = Math.floor(ar)+" ("+hit_chance+"%)"
	document.getElementById("stamina").innerHTML = Math.floor((c.stamina + (c.level-1)*c.stamina_per_level + stamina_addon) * (1+c.stamina_skillup/100) * (1+c.max_stamina/100))
	var lifeTotal = Math.floor((c.life + (c.level-1)*c.life_per_level + life_addon) * (1 + c.max_life/100));
	document.getElementById("life").innerHTML = lifeTotal
	document.getElementById("mana").innerHTML = Math.floor((c.mana + (c.level-1)*c.mana_per_level + mana_addon) * (1 + c.max_mana/100))
	document.getElementById("level").innerHTML = c.level
	document.getElementById("class_name").innerHTML = c.class_name
	document.getElementById("remainingstats").innerHTML = c.statpoints
	document.getElementById("remainingskills").innerHTML = c.skillpoints
	document.getElementById("fres").innerHTML = (c.fRes + c.all_res - c.fRes_penalty + c.resistance_skillup) + " / " + Math.min(RES_CAP,(c.fRes_max_base + c.fRes_max + c.fRes_skillup)) + "%"
	document.getElementById("cres").innerHTML = (c.cRes + c.all_res - c.cRes_penalty + c.resistance_skillup) + " / " + Math.min(RES_CAP,(c.cRes_max_base + c.cRes_max + c.cRes_skillup)) + "%"
	document.getElementById("lres").innerHTML = (c.lRes + c.all_res - c.lRes_penalty + c.resistance_skillup) + " / " + Math.min(RES_CAP,(c.lRes_max_base + c.lRes_max + c.lRes_skillup)) + "%"
	document.getElementById("pres").innerHTML = (c.pRes + c.all_res - c.pRes_penalty + c.resistance_skillup) + " / " + Math.min(RES_CAP,(c.pRes_max_base + c.pRes_max + c.pRes_skillup)) + "%"
	var magicRes = (c.mRes - c.mRes_penalty)+"%";
	if (c.mDamage_reduced > 0) { magicRes += (" +"+c.mDamage_reduced) }
	document.getElementById("mres").innerHTML = magicRes
	
	var ias = c.ias + Math.floor(dexTotal/8)*c.ias_per_8_dexterity;
	var ias_total = ias + c.ias_skill;
	if (offhandType == "weapon" && typeof(equipped.offhand.ias) != 'undefined') { ias -= equipped.offhand.ias }
	document.getElementById("ias").innerHTML = ias_total; if (ias_total > 0) { document.getElementById("ias").innerHTML += "%" }
	if (equipped.weapon.type != "" && equipped.weapon.special != 1) {
		var weaponType = equipped.weapon.type;
		var eIAS = Math.floor(120*ias/(120+ias));
		var weaponFrames = 0;
		if (weaponType != "") {
			// TODO: Check weapon speed for 'thrown' weapons - additional baseSpeed (WSM) penalty of 30?
			// TODO: Add fpa/aps to skills (many skills attack multiple times at different speeds, or interact with IAS differently)
			if (weaponType == "club" || weaponType == "hammer") { weaponType = "mace" }
			weaponFrames = c.weapon_frames[weaponType];
			if (c.class_name == "Druid") {
				if (document.getElementById(getId(skills[11].name)) != null) { if (effects[getId(skills[11].name)].info.enabled == 1) { weaponFrames = c.wereform_frames[weaponType] } }
				if (document.getElementById(getId(skills[13].name)) != null) { if (effects[getId(skills[13].name)].info.enabled == 1) { weaponFrames = c.wereform_frames[weaponType] } }
			}
			if (weaponType == "sword" || weaponType == "axe" || weaponType == "mace") { if (equipped.weapon.twoHanded == 1) { weaponFrames = weaponFrames[1]; } else { weaponFrames = weaponFrames[0]; } }
		}
		weaponFrames += 1
		var frames_per_attack = Math.ceil((weaponFrames*256)/Math.floor(256 * (100 + c.ias_skill + eIAS - c.baseSpeed) / 100)) - 1;
		document.getElementById("ias").innerHTML += " ("+frames_per_attack+" fpa)"
	}
	if (c.flamme > 0) { document.getElementById("flamme").innerHTML = "Righteous Fire deals "+Math.floor((c.flamme/100*lifeTotal)*(1+c.fDamage/100))+" damage per second<br>" } else { document.getElementById("flamme").innerHTML = "" }
}

// updateSecondaryStats - Updates stats shown on the secondary (Path of Diablo) stat page
// ---------------------------------
function updateSecondaryStats() {
	var c = character;
	
	var physRes = ""; if (c.pdr > 0) { physRes = Math.min(50,c.pdr)+"% " }
	if (c.damage_reduced > 0) { physRes += ("+"+c.damage_reduced) }
	if (c.pdr == 0 && c.damage_reduced == 0) { physRes = 0 }
	document.getElementById("pdr").innerHTML = physRes

	var fAbs = ""; if (c.fAbsorb > 0) { fAbs = c.fAbsorb+"% " }
	if (c.fAbsorb_flat > 0 || c.fAbsorb_flat_per_level > 0) { fAbs += ("+"+Math.floor(c.fAbsorb_flat + (c.level*c.fAbsorb_flat_per_level))) }
	if (c.fAbsorb == 0 && c.fAbsorb_flat == 0 && c.fAbsorb_flat_per_level == 0) { fAbs = 0 }
	document.getElementById("fabsorb").innerHTML = fAbs
	var cAbs = ""; if (c.cAbsorb > 0) { cAbs = c.cAbsorb+"% " }
	if (c.cAbsorb_flat > 0 || c.cAbsorb_flat_per_level > 0) { cAbs += ("+"+Math.floor(c.cAbsorb_flat + (c.level*c.cAbsorb_flat_per_level))) }
	if (c.cAbsorb == 0 && c.cAbsorb_flat == 0 && c.cAbsorb_flat_per_level == 0) { cAbs = 0 }
	document.getElementById("cabsorb").innerHTML = cAbs
	var lAbs = ""; if (c.lAbsorb > 0) { lAbs = c.lAbsorb+"% " }
	if (c.lAbsorb_flat > 0) { lAbs += ("+"+c.lAbsorb_flat) }
	if (c.lAbsorb == 0 && c.lAbsorb_flat == 0) { lAbs = 0 }
	document.getElementById("labsorb").innerHTML = lAbs
	document.getElementById("mabsorb").innerHTML = c.mAbsorb_flat
	
	document.getElementById("cdr").innerHTML = c.cdr; if (c.cdr > 0) { document.getElementById("cdr").innerHTML += "%" }
	var fcrTotal = c.fcr + Math.floor(c.level*c.fcr_per_level);
	
	var fcr_f = c.fcr_frames;
	for (let i = 1; i < c.fcr_bp.length; i++) { if (fcrTotal >= c.fcr_bp[i]) { fcr_f -= 1 } }
	
	var fhr_f = c.fhr_frames;
	for (let i = 1; i < c.fhr_bp.length; i++) { if (c.fhr >= c.fhr_bp[i]) { fhr_f -= 1 } }
	if (c.class_name == "Paladin") { if (equipped.weapon.type == "spear" || equipped.weapon.type == "staff") {
		fhr_f = c.fhr_frames_alt;
		for (let i = 1; i < c.fhr_bp_alt.length; i++) { if (c.fhr >= c.fhr_bp_alt[i]) { fhr_f -= 1 } }
	} }
	if (c.class_name == "Druid") { if (equipped.weapon.twoHanded != 1 && (equipped.weapon.type == "axe" || equipped.weapon.type == "mace" || equipped.weapon.type == "sword" || equipped.weapon.type == "wand")) {	// TODO: Also include throwing axes?
		fhr_f = c.fhr_frames_alt;
		for (let i = 1; i < c.fhr_bp_alt.length; i++) { if (c.fhr >= c.fhr_bp_alt[i]) { fhr_f -= 1 } }
	} }
	
	var fbr_f = c.fbr_frames;
	for (let i = 1; i < c.fbr_bp.length; i++) { if (c.fbr >= c.fbr_bp[i]) { fbr_f -= 1 } }
	if (c.class_name == "Amazon") { if (equipped.weapon.twoHanded != 1 && (equipped.weapon.type == "axe" || equipped.weapon.type == "mace" || equipped.weapon.type == "sword" || equipped.weapon.type == "wand")) {	// TODO: Also include throwing axes?
		fbr_f = c.fbr_frames_alt;
		for (let i = 1; i < c.fbr_bp_alt.length; i++) { if (c.fbr >= c.fbr_bp_alt[i]) { fbr_f -= 1 } }
	} }
	if (c.class_name == "Paladin") { if (effects["Holy_Shield"] != null) { if (typeof(effects["Holy_Shield"].info.enabled) != 'undefined') { if (effects["Holy_Shield"].info.enabled == 1) {
		fbr_f = c.fbr_frames_alt;
		for (let i = 1; i < c.fbr_bp_alt.length; i++) { if (c.fbr >= c.fbr_bp_alt[i]) { fbr_f -= 1 } }
	} } } }
	
	if (effects["Werebear"] != null) { if (typeof(effects["Werebear"].info.enabled) != 'undefined') { if (effects["Werebear"].info.enabled == 1) {
		fcr_f = character_druid.fcr_frames_werebear
		for (let i = 1; i < character_druid.fcr_bp_werebear.length; i++) { if (fcrTotal >= character_druid.fcr_bp_werebear[i]) { fcr_f -= 1 } }
		fhr_f = character_druid.fhr_frames_werebear
		for (let i = 1; i < character_druid.fhr_bp_werebear.length; i++) { if (c.fhr >= character_druid.fhr_bp_werebear[i]) { fhr_f -= 1 } }
		fbr_f = character_druid.fbr_frames_werebear
		for (let i = 1; i < character_druid.fbr_bp_werebear.length; i++) { if (c.fbr >= character_druid.fbr_bp_werebear[i]) { fbr_f -= 1 } }
	} } }
	if (effects["Werewolf"] != null) { if (typeof(effects["Werewolf"].info.enabled) != 'undefined') { if (effects["Werewolf"].info.enabled == 1) {
		fcr_f = character_druid.fcr_frames_werewolf
		for (let i = 1; i < character_druid.fcr_bp_werewolf.length; i++) { if (fcrTotal >= character_druid.fcr_bp_werewolf[i]) { fcr_f -= 1 } }
		fhr_f = character_druid.fhr_frames_werewolf
		for (let i = 1; i < character_druid.fhr_bp_werewolf.length; i++) { if (c.fhr >= character_druid.fhr_bp_werewolf[i]) { fhr_f -= 1 } }
		fbr_f = character_druid.fbr_frames_werewolf
		for (let i = 1; i < character_druid.fbr_bp_werewolf.length; i++) { if (c.fbr >= character_druid.fbr_bp_werewolf[i]) { fbr_f -= 1 } }
	} } }
	
	document.getElementById("fcr").innerHTML = fcrTotal; if (fcrTotal > 0) { document.getElementById("fcr").innerHTML += "%" }
	document.getElementById("fhr").innerHTML = c.fhr; if (c.fhr > 0) { document.getElementById("fhr").innerHTML += "%" }
	document.getElementById("fbr").innerHTML = c.fbr; if (c.fbr > 0) { document.getElementById("fbr").innerHTML += "%" }
	if (fcrTotal > 0 || equipped.weapon.name != "none" || equipped.offhand.name != "none") { document.getElementById("fcr").innerHTML += " ("+fcr_f+"f)" }
	if (c.fhr > 0 || equipped.weapon.name != "none" || equipped.offhand.name != "none") { document.getElementById("fhr").innerHTML += " ("+fhr_f+"f)" }
	if (c.fbr > 0 || c.block > 0 || c.block_skillup > 0) { document.getElementById("fbr").innerHTML += " ("+fbr_f+"f)" }
	
	// actual movespeed
	var movespeed = 9;
	var movement = (1 + (Math.floor(150*c.frw/(150+c.frw)) + c.frw_skillup + c.velocity)/100);
	if (c.running > 0) { movespeed = round(9 * movement) } else { movespeed = round(6 * movement) }
	document.getElementById("velocity").innerHTML = movespeed + " yds/s"
	document.getElementById("frw").innerHTML = Math.floor(c.frw + c.frw_skillup); if (c.frw > 0 || c.frw_skillup > 0) { document.getElementById("frw").innerHTML += "%" }
	//document.getElementById("frw").innerHTML += " ("+movespeed+" yds/s)"
	
	document.getElementById("life_leech").innerHTML = c.life_leech; if (c.life_leech > 0) { document.getElementById("life_leech").innerHTML += "%" }
	document.getElementById("mana_leech").innerHTML = c.mana_leech; if (c.mana_leech > 0) { document.getElementById("mana_leech").innerHTML += "%" }
	var LPH = c.life_per_hit + "m , " + c.life_per_ranged_hit + "r";
	if (LPH == "0m , 0r") { LPH = 0 }
	document.getElementById("life_per_hit").innerHTML = LPH
	var MPH = c.mana_per_hit + "m , " + c.mana_per_ranged_hit + "r";
	if (MPH == "0m , 0r") { MPH = 0 }
	document.getElementById("mana_per_hit").innerHTML = MPH
	
	document.getElementById("fdamage").innerHTML = c.fDamage; if (c.fDamage > 0) { document.getElementById("fdamage").innerHTML += "%" }
	document.getElementById("cdamage").innerHTML = c.cDamage; if (c.cDamage > 0) { document.getElementById("cdamage").innerHTML += "%" }
	document.getElementById("ldamage").innerHTML = c.lDamage; if (c.lDamage > 0) { document.getElementById("ldamage").innerHTML += "%" }
	document.getElementById("pdamage").innerHTML = c.pDamage; if (c.pDamage > 0) { document.getElementById("pdamage").innerHTML += "%" }
	document.getElementById("fpierce").innerHTML = c.fPierce; if (c.fPierce > 0) { document.getElementById("fpierce").innerHTML += "%" }
	document.getElementById("cpierce").innerHTML = c.cPierce; if (c.cPierce > 0) { document.getElementById("cpierce").innerHTML += "%" }
	document.getElementById("lpierce").innerHTML = c.lPierce; if (c.lPierce > 0) { document.getElementById("lpierce").innerHTML += "%" }
	document.getElementById("ppierce").innerHTML = c.pPierce; if (c.pPierce > 0) { document.getElementById("ppierce").innerHTML += "%" }
	
	document.getElementById("pierce").innerHTML = c.pierce + c.pierce_skillup; if (c.pierce > 0 || c.pierce_skillup > 0) { document.getElementById("pierce").innerHTML += "%" }
	document.getElementById("cblow").innerHTML = c.cblow; if (c.cblow > 0) { document.getElementById("cblow").innerHTML += "%" }
	document.getElementById("dstrike").innerHTML = c.dstrike + Math.floor(c.level*c.dstrike_per_level); if (c.dstrike > 0 || c.dstrike_per_level > 0) { document.getElementById("dstrike").innerHTML += "%" }
	document.getElementById("cstrike").innerHTML = c.cstrike + c.cstrike_skillup; if (c.cstrike > 0 || c.cstrike_skillup > 0) { document.getElementById("cstrike").innerHTML += "%" }
	document.getElementById("owounds").innerHTML = c.owounds; if (c.owounds > 0) { document.getElementById("owounds").innerHTML += "%" }
	
	var mf = Math.floor(c.mf + c.level*c.mf_per_level);
	var eMF = Math.floor(mf*250/(mf+250));
	document.getElementById("mf").innerHTML = mf; if (c.mf != 0 || c.mf_per_level != 0) { document.getElementById("mf").innerHTML += "% ("+eMF+"%)" }
	document.getElementById("gf").innerHTML = c.gf; if (c.gf != 0) { document.getElementById("gf").innerHTML += "%" }
	
	document.getElementById("damage_vs_demons").innerHTML = c.damage_vs_demons; if (c.damage_vs_demons > 0) { document.getElementById("damage_vs_demons").innerHTML += "%" }
	document.getElementById("damage_vs_undead").innerHTML = Math.floor(c.damage_vs_undead + c.level*c.damage_vs_undead_per_level); if (c.damage_vs_undead > 0 || c.damage_vs_undead_per_level > 0) { document.getElementById("damage_vs_undead").innerHTML += "%" }
	document.getElementById("ar_vs_demons").innerHTML = c.ar_vs_demons
	document.getElementById("ar_vs_undead").innerHTML = Math.floor(c.ar_vs_undead + c.level*c.ar_vs_undead_per_level)
	
	if (c.life_per_demon_kill > 0) { document.getElementById("life_per_kill").innerHTML = c.life_per_kill + " , " + c.life_per_demon_kill + " (demons)" } else { document.getElementById("life_per_kill").innerHTML = c.life_per_kill }
	document.getElementById("mana_per_kill").innerHTML = c.mana_per_kill
	var lifeRegen = "";
	if (c.life_regen > 0) { lifeRegen = c.life_regen+"% " }; if (c.life_replenish > 0) { lifeRegen += ("+"+c.life_replenish) }; if (c.life_regen == 0 && c.life_replenish == 0) { lifeRegen = 0 }
	document.getElementById("life_regen").innerHTML = lifeRegen
	document.getElementById("mana_regen").innerHTML = Math.round(c.mana_regen,1)+"%"
	
	document.getElementById("damage_to_mana").innerHTML = c.damage_to_mana; if (c.damage_to_mana > 0) { document.getElementById("damage_to_mana").innerHTML += "%" }
	
	document.getElementById("enemy_fres").innerHTML = c.enemy_fRes; if (c.enemy_fRes < 0) { document.getElementById("enemy_fres").innerHTML += "%" }
	document.getElementById("enemy_cres").innerHTML = c.enemy_cRes; if (c.enemy_cRes < 0) { document.getElementById("enemy_cres").innerHTML += "%" }
	document.getElementById("enemy_lres").innerHTML = c.enemy_lRes; if (c.enemy_lRes < 0) { document.getElementById("enemy_lres").innerHTML += "%" }
	document.getElementById("enemy_pres").innerHTML = c.enemy_pRes; if (c.enemy_pRes < 0) { document.getElementById("enemy_pres").innerHTML += "%" }
}

// updateTertiaryStats - Updates other stats
// ---------------------------------
function updateTertiaryStats() {
	var c = character;
	document.getElementById("poison_reduction").innerHTML = Math.min(75,c.poison_length_reduced); if (c.poison_length_reduced > 0) { document.getElementById("poison_reduction").innerHTML += "%" }
	document.getElementById("curse_reduction").innerHTML = Math.min(75,c.curse_length_reduced); if (c.curse_length_reduced > 0) { document.getElementById("curse_reduction").innerHTML += "%" }
	var thorns = c.thorns_reflect;
	if (c.thorns_reflect == 0) { thorns = Math.floor(c.thorns_lightning + c.thorns + c.level*c.thorns_per_level) } else { thorns += "%"; if (c.thorns > 0 || c.thorns_per_level > 0) { thorns += (" +"+Math.floor(c.thorns_lightning + c.thorns + c.level*c.thorns_per_level)) } }
	document.getElementById("thorns").innerHTML = thorns
	var lightRadius = "";
	if (c.light_radius > 0) { lightRadius = "+"+c.light_radius + " to Light Radius<br>" } else if (c.light_radius < 0) { lightRadius = c.light_radius + " to Light Radius<br>" } else { lightRadius = "" }
	document.getElementById("light_radius").innerHTML = lightRadius
	if (c.slower_stam_drain > 0) { document.getElementById("slower_stam_drain").innerHTML = "+"+c.slower_stam_drain+"% Slower Stamina Drain<br>" } else { document.getElementById("slower_stam_drain").innerHTML = "" }
	if (c.heal_stam > 0 || c.heal_stam_per_level > 0) { document.getElementById("heal_stam").innerHTML = "Heal Stamina +" + Math.floor(c.heal_stam + c.level*c.heal_stam_per_level)+"%<br>" } else { document.getElementById("heal_stam").innerHTML = "" }
	var enemyDef = "";
	if (c.enemy_defense != 0 || c.target_defense != 0) { enemyDef += (Math.min(99,(c.enemy_defense + c.target_defense))+"%"); if (c.enemy_defense_flat != 0 || c.monster_defense_per_hit != 0) { enemyDef += ", " } }
	if (c.enemy_defense_flat != 0) { enemyDef += c.enemy_defense_flat; if (c.monster_defense_per_hit != 0) { enemyDef += ", " } }
	if (c.monster_defense_per_hit != 0) { enemyDef += (c.monster_defense_per_hit+" per hit") }
	if (enemyDef == "") { enemyDef = "0"}
	document.getElementById("enemy_defense").innerHTML = enemyDef
	var enemyBlind = "";
	if (c.blind_on_hit > 0) { enemyBlind = "Hit Blinds Target"; if (c.blind_on_hit > 1) { enemyBlind += (" +"+c.blind_on_hit+"<br>"); } else { enemyBlind += "<br>" } }
	document.getElementById("blind_on_hit").innerHTML = enemyBlind
	if (c.flee_on_hit > 0) { document.getElementById("flee_on_hit").innerHTML = "Hit Causes Monster to Flee " + Math.min(100,c.flee_on_hit) + "%<br>" } else { document.getElementById("flee_on_hit").innerHTML = "" }
	if (c.discount > 0) { document.getElementById("discount").innerHTML = "Vendor Prices Reduced by " + c.discount + "%<br>" } else { document.getElementById("discount").innerHTML = "" }
	
	if (c.itd > 0) { document.getElementById("itd").innerHTML = "Ignore Target Defense<br>" } else { document.getElementById("itd").innerHTML = "" }
	if (c.pmh > 0) { document.getElementById("pmh").innerHTML = "Prevent Monster Heal<br>" } else { document.getElementById("pmh").innerHTML = "" }
	if (c.cbf > 0) { document.getElementById("cbf").innerHTML = "Cannot Be Frozen<br>" }
	else if (c.half_freeze > 0) { document.getElementById("cbf").innerHTML = "Half Freeze Duration<br>" }
	else { document.getElementById("cbf").innerHTML = "" }
	if (c.knockback > 0) { document.getElementById("knockback").innerHTML = "Knockback<br>" } else { document.getElementById("knockback").innerHTML = "" }
	if (c.melee_splash > 0) { document.getElementById("melee_splash").innerHTML = "Melee Attacks deal Splash Damage<br>" } else { document.getElementById("melee_splash").innerHTML = "" }
	if (c.slows_target > 0 || c.slow_enemies > 0) { document.getElementById("slow_target").innerHTML = "Targets Slowed " + (c.slows_target + c.slow_enemies)+"%<br>" } else { document.getElementById("slow_target").innerHTML = "" }
	if (c.freezes_target > 1) { document.getElementById("freezes_target").innerHTML = "Freezes Target +" + c.freezes_target + "<br>" }
	else if (c.freezes_target > 0) { document.getElementById("freezes_target").innerHTML = "Freezes Target<br>" }
	else { document.getElementById("freezes_target").innerHTML = "" }
	if (c.peace > 0) { document.getElementById("peace").innerHTML = "Slain Monsters Rest in Peace<br>" } else { document.getElementById("peace").innerHTML = "" }
	if (c.glow > 0) { document.getElementById("glow").innerHTML = "Character is Glowing<br>" } else { document.getElementById("glow").innerHTML = "" }
	var statlines = "";
	if (c.summon_damage > 0) { statlines += "Summons deal +"+c.summon_damage+"% Increased Damage<br>" }
	if (c.summon_defense > 0) { statlines += "Summons have +"+c.summon_defense+"% Enhanced Defense<br>" }
	if (c.bonus_corpse_explosion > 0) { statlines += "Corpse Explosion deals +"+c.bonus_corpse_explosion+"% of Maximum Corpse life<br>" }
	if (c.phys_Lightning_Surge > 0) { statlines += "Lightning Surge Deals "+c.phys_Lightning_Surge+"% Extra Damage As Physical<br>" }
	if (c.extraValkyrie > 0) { statlines += "Can Summon One Additional Valkyrie<br>" }
	if (c.extraGrizzly > 0) { statlines += "Can Summon One Additional Grizzly Bear<br>" }
	if (c.extraFireGolem > 0) { statlines += "Can Summon One Additional Fire Golem<br>" }
	if (c.extraHydra > 0) { statlines += "Can Summon One Additional Hydra<br>" }
	if (c.radius_FreezingArrow > 0) { statlines += "+"+c.radius_FreezingArrow+"% to Freezing Arrow Radius<br>" }
	if (c.reset_cooldown_on_kill > 0) { statlines += c.reset_cooldown_on_kill+"% Chance to Reset Skill Cooldown on Kill<br>" }
	if (c.cdr_on_striking > 0) { statlines += "Gain "+c.cdr_on_striking+"% Reduced Skill Cooldown For 4 Seconds On Striking<br>" }
	if (c.reanimate > 0) { statlines += c.reanimate+"% Reanimate As: Returned<br>" }
	if (c.experience > 0) { statlines += "+"+c.experience+"% Experience Gained<br>" }
	document.getElementById("statlines").innerHTML = statlines
	updateCTC()
	updateChargeSkills()
}

// updateCTC - 
// ---------------------------------
function updateCTC() {
	var stats = "";
	for (group in equipped) {
		if (typeof(equipped[group].ctc) != 'undefined') {
			if (equipped[group].ctc != "") {
				for (let i = 0; i < equipped[group].ctc.length; i++) {
					var stat = equipped[group].ctc[i][0]+"% chance to cast level "+equipped[group].ctc[i][1]+" "+equipped[group].ctc[i][2]+" "+equipped[group].ctc[i][3];
					stats += (stat + "<br>")
				}
			}
		}
	}
	// TODO: Add socketed ctc effects to socketed.totals so this can be simplified? Duplicate code in equipmentHover()
	var ctc_possible = ["100% chance to cast level 29 Blaze when you level up","100% chance to cast level 43 Frost Nova when you level up","100% chance to cast level 41 Nova when you level up","100% chance to cast level 23 Venom when you level up"];
	var ctc_included = [0,0,0,0];
	for (group in socketed) {
		for (let i = 0; i < socketed[group].items.length; i++) { for (affix in socketed[group].items[i]) { if (affix == "ctc") {
			var source = socketed[group].items[i];
			for (let j = 0; j < source[affix].length; j++) {
				var line = source[affix][j][0]+"% chance to cast level "+source[affix][j][1]+" "+source[affix][j][2]+" "+source[affix][j][3];
				for (let k = 0; k < ctc_possible.length; k++) { if (line == ctc_possible[k]) {
					if (ctc_included[k] == 0) { stats += line+"<br>" }
					ctc_included[k] = 1
				} }
			}
		} } }
	}
	document.getElementById("ctc").innerHTML = stats
}

// updateChargeSkills - 
// ---------------------------------
function updateChargeSkills() {
	var stats = "";
	for (group in equipped) {
		if (typeof(equipped[group].cskill) != 'undefined') {
			if (equipped[group].cskill != "") {
				for (let i = 0; i < equipped[group].cskill.length; i++) {
					var stat = "Level "+equipped[group].cskill[i][0]+" "+equipped[group].cskill[i][1]+" ("+equipped[group].cskill[i][2]+" charges)";
					stats += (stat + "<br>")
				}
			}
		}
	}
	document.getElementById("cskill").innerHTML = stats
}

// updateOther - Updates other interface elements
// ---------------------------------
function updateOther() {
	var c = character;
	if (c.statpoints == 0) {
		document.getElementById("remainingstats").innerHTML = ""
		document.getElementById("hide_statpoints").style.visibility = "visible"
	} else {
		document.getElementById("hide_statpoints").style.visibility = "hidden"
	}
	if (c.skillpoints == 0) {
		document.getElementById("remainingskills").innerHTML = ""
		document.getElementById("hide_skillpoints").style.visibility = "visible"
	} else {
		document.getElementById("hide_skillpoints").style.visibility = "hidden"
	}
	if (c.level == 1 && c.statpoints == 0 && c.quests_completed < 0) {
		document.getElementById("hide_stats").style.visibility = "visible"
	} else {
		document.getElementById("hide_stats").style.visibility = "hidden"
	}
	updateSkillIcons()
	checkRequirements()
	
	// update available sockets - TODO: move this to a more suitable 'update' function
	for (group in socketed) {
		socketed[group].sockets = (~~(equipped[group].sockets) + ~~(corruptsEquipped[group].sockets))
		removeInvalidSockets(group)
	}
}

// calculateSkillAmounts - Updates skill levels
// ---------------------------------
function calculateSkillAmounts() {
	// TODO: move function to character files?
	for (s = 0; s < skills.length; s++) {
		skills[s].extra_levels = 0
		skills[s].extra_levels += character.all_skills + Math.ceil(character.all_skills_per_level*character.level)
		skills[s].extra_levels += character.skills_class
		var display = skills[s].level;
		var skill_id = "skill_" + getId(skills[s].name);
		skills[s].force_levels = character[skill_id]
		var oskill_id = "o"+skill_id;
		if (typeof(character[oskill_id]) != 'undefined') { skills[s].force_levels += character[oskill_id] }
		// TODO: use skills_all to store calculated offskill levels?
		if (character.class_name == "Amazon") {
			skills[s].extra_levels += character.skills_amazon
			if (s < 10) {
				skills[s].extra_levels += character.skills_javelins
				skills[s].extra_levels += character.skills_tree1
				if (s == 2 || s == 6) { skills[s].extra_levels += character.skills_poison_all }
			} else if (s > 19) {
				skills[s].extra_levels += character.skills_bows
				skills[s].extra_levels += character.skills_tree3
				if (s == 23 || s == 26 || s == 28) { skills[s].extra_levels += character.skills_fire_all }
				if (s == 20 || s == 24 || s == 29) { skills[s].extra_levels += character.skills_cold_all }
			} else {
				skills[s].extra_levels += character.skills_passives
				skills[s].extra_levels += character.skills_tree2
			}
		} else if (character.class_name == "Assassin") {
			skills[s].extra_levels += character.skills_assassin
			if (s == 1 || s == 6 || s == 20 || s == 24 || s == 27) { skills[s].extra_levels += character.skills_fire_all }
			if (s < 9) {
				skills[s].extra_levels += character.skills_martial
				skills[s].extra_levels += character.skills_tree1
				if (s == 3 || s == 8) { skills[s].extra_levels += character.skills_cold_all }
			} else if (s > 19) {
				skills[s].extra_levels += character.skills_traps
				skills[s].extra_levels += character.skills_tree3
			} else {
				skills[s].extra_levels += character.skills_shadow
				skills[s].extra_levels += character.skills_tree2
			}
		} else if (character.class_name == "Barbarian") {
			skills[s].extra_levels += character.skills_barbarian
			if (s < 10) {
				skills[s].extra_levels += character.skills_warcries
				skills[s].extra_levels += character.skills_tree1
			} else if (s > 17) {
				skills[s].extra_levels += character.skills_combat_barbarian
				skills[s].extra_levels += character.skills_tree3
			} else {
				skills[s].extra_levels += character.skills_masteries
				skills[s].extra_levels += character.skills_tree2
			}
		} else if (character.class_name == "Druid") {
			skills[s].extra_levels += character.skills_druid
			if (s == 16 || s == 22) { skills[s].extra_levels += character.skills_poison_all }
			if (s == 0 || s == 1 || s == 2 || s == 4 || s == 7 || s == 9 || s == 17) { skills[s].extra_levels += character.skills_fire_all }
			if (s < 11) {
				skills[s].extra_levels += character.skills_elemental
				skills[s].extra_levels += character.skills_tree1
				if (s == 3 || s == 10) { skills[s].extra_levels += character.skills_cold_all }
			} else if (s > 20) {
				skills[s].extra_levels += character.skills_summoning_druid
				skills[s].extra_levels += character.skills_tree3
			} else { skills[s].extra_levels += character.skills_shapeshifting
				skills[s].extra_levels += character.skills_tree2
			}
		} else if (character.class_name == "Necromancer") {
			skills[s].extra_levels += character.skills_necromancer
			if (s == 9 || s == 14) { skills[s].extra_levels += character.skills_fire_all }
			if (s < 11) {
				skills[s].extra_levels += character.skills_summoning_necromancer
				skills[s].extra_levels += character.skills_tree1
			} else if (s > 19) {
				skills[s].extra_levels += character.skills_curses
				skills[s].extra_levels += character.skills_tree3
			} else {
				skills[s].extra_levels += character.skills_poisonBone
				skills[s].extra_levels += character.skills_tree2
				if (s == 11 || s == 15 || s == 19) { skills[s].extra_levels += character.skills_poison_all }
			}
		} else if (character.class_name == "Paladin") {
			skills[s].extra_levels += character.skills_paladin
			if (s < 10) {
				skills[s].extra_levels += character.skills_defensive
				skills[s].extra_levels += character.skills_tree1
			} else if (s > 19) {
				skills[s].extra_levels += character.skills_combat_paladin
				skills[s].extra_levels += character.skills_tree3
			} else {
				skills[s].extra_levels += character.skills_offensive
				skills[s].extra_levels += character.skills_tree2
				if (s == 11) { skills[s].extra_levels += character.skills_fire_all }
				if (s == 15) { skills[s].extra_levels += character.skills_cold_all }
			}
		} else if (character.class_name == "Sorceress") {
			skills[s].extra_levels += character.skills_sorceress
			if (s < 11) {
				skills[s].extra_levels += character.skills_cold
				skills[s].extra_levels += character.skills_tree1
				skills[s].extra_levels += character.skills_cold_all
			} else if (s > 21) {
				skills[s].extra_levels += character.skills_fire
				skills[s].extra_levels += character.skills_tree3
				skills[s].extra_levels += character.skills_fire_all
			} else {
				skills[s].extra_levels += character.skills_lightning
				skills[s].extra_levels += character.skills_tree2
			}
		}
		skills[s].extra_levels += skills[s].force_levels
		display += skills[s].extra_levels
		if (skills[s].level > 0 || skills[s].force_levels > 0) {
			document.getElementById("p"+skills[s].key).innerHTML = display
		} else { document.getElementById("p"+skills[s].key).innerHTML = "" }
	}
	var skillChoices = "";
	for (let s = 0; s < skills.length; s++) {
		if (skills[s].level > 0 || skills[s].force_levels > 0) { skillChoices += '<option class="gray">'+skills[s].name+'</option>' }
	}
}

// checkRequirements - Recolors stats/skills based on unmet item/skill/level requirements
// ---------------------------------
function checkRequirements() {
	var highest_level = 1; var highest_str = 0; var highest_dex = 0;
	for (group in equipped) {
		if (group == "charms") { for (item in equipped[group]) {
			if (equipped[group][item].req_level > highest_level) { highest_level = equipped[group][item].req_level }
			if (equipped[group][item].req_strength > highest_str) { highest_str = equipped[group][item].req_strength }
			if (equipped[group][item].req_dexterity > highest_dex) { highest_dex = equipped[group][item].req_dexterity }
		} }
		if (equipped[group].req_level > highest_level) { highest_level = equipped[group].req_level }
		if (equipped[group].req_strength > highest_str) { highest_str = equipped[group].req_strength }
		if (equipped[group].req_dexterity > highest_dex) { highest_dex = equipped[group].req_dexterity }
	}
	character.req_level = highest_level
	character.req_strength = highest_str
	character.req_dexterity = highest_dex
	if (character.req_level > character.level) {
		document.getElementById("level").style.color = "#ff8080" }
	else { document.getElementById("level").style.color = "white" }
	if (character.req_strength > (character.strength+character.all_attributes+(character.level*character.strength_per_level))) {
		document.getElementById("strength").style.color = "#ff8080" }
	else { document.getElementById("strength").style.color = "white" }
	if (character.req_dexterity > (character.dexterity+character.all_attributes)) {
		document.getElementById("dexterity").style.color = "#ff8080" }
	else { document.getElementById("dexterity").style.color = "white" }
	for (let s = 0; s < skills.length; s++) {
		var req_met = 1;
		if (skills[s].level > Math.max(0,(character.level - skills[s].reqlvl + 1))) { req_met = 0 }
		if (skills[s].force_levels == 0 && skills[s].req.length > 0 && req_met == 1) { for (let r = 0; r < skills[s].req.length; r++) {
			if (skills[skills[s].req[r]].level == 0) { req_met = 0 }
		} }
		if (req_met == 0) {
			document.getElementById("p"+skills[s].key).style.color = "#ff8080"; }	// red
		else if (skills[s].extra_levels > 0) {
			document.getElementById("p"+skills[s].key).style.color = "#8080ff"; }	// blue
		else { document.getElementById("p"+skills[s].key).style.color = "white"; }
		if (skills[s].level > 0 || skills[s].force_levels > 0) {
			document.getElementById("p"+skills[s].key).innerHTML = (skills[s].level + skills[s].extra_levels);
		}
	}
}

// addStat - Raises the selected stat
//	stat: button identifier (string) for corresponding stat
// ---------------------------------
function addStat(event, stat) {
	var points = 1
	if (event.shiftKey) { points = 10 }
	if (event.ctrlKey) { points = 100 }
	if (character.statpoints < points) { points = character.statpoints }
	if (character.statpoints >= points) {
		if (stat == "btn_strength") {		character.strength += points;	character.strength_added += points; }
		else if (stat == "btn_dexterity") {	character.dexterity += points;	character.dexterity_added += points; }
		else if (stat == "btn_vitality") {	character.vitality += points;	character.vitality_added += points; }
		else if (stat == "btn_energy") {	character.energy += points;	character.energy_added += points; }
		character.statpoints -= points
		updateAllEffects()
	}
}

// removeStat - Lowers the selected stat
//	stat: button identifier (string) for corresponding stat
// ---------------------------------
function removeStat(event, stat) {
	var points = 1
	if (event.shiftKey) { points = 10 }
	if (event.ctrlKey) { points = 100 }
	if ((stat == "btn_strength")) {
		if (points > character.strength_added) { points = character.strength_added }
		character.strength -= points
		character.strength_added -= points
	} else if ((stat == "btn_dexterity")) {
		if (points > character.dexterity_added) { points = character.dexterity_added }
		character.dexterity -= points
		character.dexterity_added -= points
	} else if ((stat == "btn_vitality")) {
		if (points > character.vitality_added) { points = character.vitality_added }
		character.vitality -= points
		character.vitality_added -= points
	} else if ((stat == "btn_energy")) {
		if (points > character.energy_added) { points = character.energy_added }
		character.energy -= points
		character.energy_added -= points
	} else { points = 0 }
	character.statpoints += points
	updateAllEffects()
}

// skillUp - Raises the skill level
//	skill: the skill to modify
//	levels: number of levels to add (1 by default)
// ---------------------------------
function skillUp(event, skill, levels) {
	var old_level = skill.level;
	if (levels == 1 && event != null) {
		if (event.shiftKey) { levels = 10 }
		if (event.ctrlKey) { levels = 20 }
	}
	if (old_level+levels > MAX) { levels = MAX-old_level }
	if (levels > (99-character.level) + character.skillpoints) { levels = (99-(character.level) + character.skillpoints) }
	if (settings.coupling == 0 && levels > character.skillpoints) { levels = character.skillpoints }
	if (character.level <= 99-levels || character.skillpoints >= levels) {
		skill.level += levels
		if (skill.level > old_level) {
			if (levels <= character.skillpoints) {
				character.skillpoints -= levels
				levels = 0
			} else {
				levels -= character.skillpoints
				character.skillpoints = 0
			}
			if (levels > 0) {
				character.level += levels
				character.statpoints += (5*levels)
				character.life += (character.levelup_life*levels)
				character.stamina += (character.levelup_stamina*levels)
				character.mana += (character.levelup_mana*levels)
			}
		}
	}
	skillHover(skill)
    if (skill.bindable > 0 && (old_level == 0 || (old_level > 0 && skill.level == 0 && skill.force_levels == 0))) {
	updateSkills()
    }
	updateMercenary()
//	for (let s = 0; s < skills.length; s++) { modifyEffect(skills[s]) }
	if (selectedSkill[0] != " ­ ­ ­ ­ Skill 1") { checkSkill(selectedSkill[0], 1) }
	if (selectedSkill[1] != " ­ ­ ­ ­ Skill 2") { checkSkill(selectedSkill[1], 2) }
	updateAllEffects()
	for (effect in effects) { updateEffect(effect) }
}

// skillDown - Lowers the skill level
//	skill: the skill to modify
// ---------------------------------
function skillDown(event, skill) {
	// TODO: Allow even when all statpoints have been used (just increase available skillpoints without changing character's level)
	var old_level = skill.level
	var levels = 1
	if (event.shiftKey) { levels = 10 }
	if (event.ctrlKey) { levels = 20 }
	if (old_level-levels < 0) { levels = old_level }
	var maxdown = character.level - 1
	var maxstatdown = character.statpoints
	var levels_temp = 0;
	if (character.quests_completed > 0 && character.skillpoints < 12) { levels_temp = 12 - character.skillpoints; maxdown += levels_temp; maxstatdown += (levels_temp*5) }
	if (levels > maxdown) { levels = maxdown }
	if (settings.coupling == 1) {
		if (levels <= maxdown && 5*levels <= maxstatdown) {
			if (character.quests_completed > 0 && character.skillpoints < 12) {
				if (levels_temp > levels) { levels_temp = levels }
				skill.level -= levels_temp
				character.skillpoints += levels_temp
				levels -= levels_temp
			}
			skill.level -= levels
			if (skill.level < old_level) {
				character.level -= levels
				character.statpoints -= 5*levels
				character.life -= (character.levelup_life*levels)
				character.stamina -= (character.levelup_stamina*levels)
				character.mana -= (character.levelup_mana*levels)
			}
		} else if (levels <= maxdown) {
			skill.level -= levels
			character.skillpoints += levels
		}
	} else {
		skill.level -= levels
		character.skillpoints += levels
	}
	skillHover(skill)
    if (skill.bindable > 0 && (old_level == 0 || (old_level > 0 && skill.level == 0 && skill.force_levels == 0))) {
	updateSkills()
    }
	updateMercenary()
	if (selectedSkill[0] != " ­ ­ ­ ­ Skill 1") { checkSkill(selectedSkill[0], 1) }
	if (selectedSkill[1] != " ­ ­ ­ ­ Skill 2") { checkSkill(selectedSkill[1], 2) }
	updateAllEffects()
	for (effect in effects) { updateEffect(effect) }
}

// skillHover - Shows skill description tooltip on mouse-over
//	skill: the mouse-over'ed skill
// ---------------------------------
function skillHover(skill) {
	document.getElementById("title").innerHTML = skill.name
	document.getElementById("description").innerHTML = skill.description
	document.getElementById("graytext").innerHTML = skill.graytext
	document.getElementById("syn_title").innerHTML = skill.syn_title
	document.getElementById("syn_text").innerHTML = skill.syn_text
	document.getElementById("tooltip").style = skill.style
	var levels = 0;
	var next_display = "";
	var current_display = "";
	var pre_display = "";
	var next_value = 0;
	var current_value = 0;
	for (let i = 0, len = skill.data.values.length; i < len; i++) {
		next_display += skill.text[i]
		if (skill.level == 0 && skill.force_levels == 0) {
			next_value = character.getSkillData(skill, skill.level+1, i)
		} else {
			next_value = character.getSkillData(skill, (skill.level+skill.extra_levels+1), i)
		}
		next_value = round(next_value)
		next_display += next_value
		
		current_display += skill.text[i]
		//if (skill.level+skill.extra_levels <= LIMIT) { levels = skill.level+skill.extra_levels } else { levels = LIMIT }
		levels = skill.level+skill.extra_levels
		current_value = character.getSkillData(skill, levels, i)
		current_value = round(current_value)
		current_display += current_value
		
		if (skill.data.index[0] == (i+1)) {
			if (skill.level > 0) { pre_display += current_display } else { pre_display += next_display }
			current_display = ""
			next_display = ""
		}
	}
	pre_display += skill.data.index[1]
	if (skill.level > 0 || skill.force_levels > 0) {
		if (skill.data.index[0] > 0) { pre_display = "<br>" + pre_display }
		if (skill.level > 0) { pre_display += "<br>" }
		pre_display += "<br>Current Skill Level: " + (levels) + "<br>"
		current_display += skill.text[skill.data.values.length] + "<br>"
		document.getElementById("next_level_text").innerHTML = "<br>Next Level"
	} else {
		document.getElementById("next_level_text").innerHTML = "<br>First Level"
		current_display = ""
		if (skill.data.index[0] > 0) { pre_display = "<br>" + pre_display + "<br>" }
	}
	if (skill.level < MAX && (skill.level+skill.extra_levels < LIMIT)) { next_display += skill.text[skill.data.values.length] } else { next_display = "(maximum level reached)" }
	document.getElementById("next").innerHTML = next_display
	document.getElementById("current").innerHTML = current_display
	document.getElementById("pretext").innerHTML = pre_display
	
	if (skill.level == 0 || (skill.level > 0 && skill.data.index[0] > 0)) {
		document.getElementById("description").innerHTML = skill.description + "<br>"
	}
	calculateSkillAmounts()
	updateStats()
	showBaseLevels(skill)
}

// showBaseLevels - Shows base levels for a skill
//	skill: the skill to use
// ---------------------------------
function showBaseLevels(skill) {
	if ((skill.extra_levels > 0 && skill.level > 0) || skill.force_levels > 0) {
		document.getElementById("p"+skill.key).style.color = "#999999";
		document.getElementById("p"+skill.key).innerHTML = skill.level;
	}
}

// updateSkills - 
// ---------------------------------
function updateSkills() {
	var choices = "";
	var k = 1;
	var oskillList = [];
	var oskillOptions = [];
	for (let o = 0; o < oskills.length; o++) {
		if (character[oskills[o]] > 0) {
			var natClass = oskills_info[oskills[o]].native_class;
			if (character.class_name.toLowerCase() != natClass) {
				var natIndex = oskills_info[oskills[o]].i;
				var addSkill = 0;
				if (natClass != "none") { if (skills_all[natClass][natIndex].bindable > 0) { addSkill = 1 } } else { addSkill = 1 }
				if (addSkill == 1) {
					oskillList[k] = oskills_info[oskills[o]].name
					oskillOptions[k] = "<option class='gray-all'>" + oskills_info[oskills[o]].name + "</option>"
					choices += oskillOptions[k]
					k++
				}
			}
		}
	}
	skillList = oskillList;
	skillOptions = oskillOptions;
	for (let s = 0; s < skills.length; s++) {
		if (skills[s].bindable > 0 && (skills[s].level > 0 || skills[s].force_levels > 0)) {
			skillList[k] = skills[s].name
			skillOptions[k] = "<option class='gray-all'>" + skills[s].name + "</option>"
			choices += skillOptions[k]
			k++
		}
	}
	
	// TODO: make less inefficient, include oskills
	for (let s = 0; s < skills.length; s++) {
		if (skills[s].level == 0 && skills[s].force_levels == 0) {
			if (selectedSkill[0] == skills[s].name) { selectedSkill[0] = " ­ ­ ­ ­ Skill 1" }
			if (selectedSkill[1] == skills[s].name) { selectedSkill[1] = " ­ ­ ­ ­ Skill 2" }
		}
	}

	document.getElementById("dropdown_skill1").innerHTML = "<option class='gray-all' style='color:gray' disabled>" + " ­ ­ ­ ­ Skill 1" + "</option>" + choices
	document.getElementById("dropdown_skill2").innerHTML = "<option class='gray-all' style='color:gray' disabled>" + " ­ ­ ­ ­ Skill 2" + "</option>" + choices
	var selectedIndex = [0,0];
	for (let l = 0; l < skillList.length; l++) {
		if (skillList[l] == selectedSkill[0]) { selectedIndex[0] = l }
		if (skillList[l] == selectedSkill[1]) { selectedIndex[1] = l }
	}
	document.getElementById("dropdown_skill1").selectedIndex = selectedIndex[0]
	document.getElementById("dropdown_skill2").selectedIndex = selectedIndex[1]
	if (selectedSkill[0] == " ­ ­ ­ ­ Skill 1") { document.getElementById("skill1_info").innerHTML = ":"; document.getElementById("ar_skill1").innerHTML = ""; }
	if (selectedSkill[1] == " ­ ­ ­ ­ Skill 2") { document.getElementById("skill2_info").innerHTML = ":"; document.getElementById("ar_skill2").innerHTML = ""; }
}

// checkSkill - 
//	skillName: skill name displayed in dropdown
//	num: 1 or 2 (for skill1 or skill2)
// ---------------------------------
function checkSkill(skillName, num) {
	if (skillName == " ­ ­ ­ ­ Skill "+num) { document.getElementById("dropdown_skill"+num).selectedIndex = 0 }
	if (document.getElementById("dropdown_skill"+num).selectedIndex == 0) { skillName = " ­ ­ ­ ­ Skill "+num }
	selectedSkill[num-1] = skillName
	var native_skill = 0;
	var skill = {};
	var index = 0;
	for (let s = 0; s < skills.length; s++) { if (skillName == skills[s].name) {
		native_skill = 1
		skill = skills[s]
	} }
	
	var c = character;
	var strTotal = (c.strength + c.all_attributes + (c.level-1)*c.strength_per_level);
	var dexTotal = (c.dexterity + c.all_attributes + (c.level-1)*c.dexterity_per_level);
	var energyTotal = Math.floor((c.energy + c.all_attributes)*(1+c.max_energy/100));
	var ar = ((dexTotal - 7) * 5 + c.ar + c.level*c.ar_per_level + c.ar_const) * (1+(c.ar_skillup + c.ar_bonus + c.level*c.ar_bonus_per_level)/100) * (1+c.ar_shrine_bonus/100);

	var physDamage = [0,0,1];
	if (skillName == "Poison Javelin" || skillName == "Lightning Bolt" || skillName == "Plague Javelin" || skillName == "Lightning Fury" || skillName == "Power Throw" || skillName == "Ethereal Throw") {
		physDamage = getWeaponDamage(strTotal,dexTotal,"weapon",1);
	} else { physDamage = getWeaponDamage(strTotal,dexTotal,"weapon",0); }
	var dmg = {fMin:0,fMax:0,cMin:0,cMax:0,lMin:0,lMax:0,pMin:0,pMax:0,mMin:0,mMax:0};
	dmg = getNonPhysWeaponDamage("weapon")
	var nonPhys_min = Math.floor(dmg.fMin + dmg.cMin + dmg.lMin + dmg.pMin + dmg.mMin);
	var nonPhys_max = Math.floor(dmg.fMax + dmg.cMax + dmg.lMax + dmg.pMax + dmg.mMax);
	
	if (skillName != " ­ ­ ­ ­ Skill 1" && skillName != " ­ ­ ­ ­ Skill 2") {
		var outcome = {min:0,max:0,ar:0};
		if (native_skill == 0) { outcome = character_any.getSkillDamage(skillName, ar, physDamage[0], physDamage[1], physDamage[2], nonPhys_min, nonPhys_max); }
		else { outcome = c.getSkillDamage(skill, ar, physDamage[0], physDamage[1], physDamage[2], nonPhys_min, nonPhys_max); }
		
		var enemy_lvl = ~~MonStats[monsterID][4+c.difficulty];
		enemy_lvl = Math.min(~~c.level,89)	// temp, sets 'area level' at the character's level
		var enemy_def = (MonStats[monsterID][8] * MonLevel[enemy_lvl][c.difficulty])/100;
		enemy_def = Math.max(0,enemy_def + enemy_def*(c.enemy_defense+c.target_defense)/100+c.enemy_defense_flat)
		var hit_chance = Math.round(Math.max(5,Math.min(95,(100 * outcome.ar / (outcome.ar + enemy_def)) * (2 * c.level / (c.level + enemy_lvl)))));
		
		var output = ": " + outcome.min + "-" + outcome.max + " {"+Math.ceil((outcome.min+outcome.max)/2)+"}";
		if (~~outcome.min != 0 && ~~outcome.max != 0) { document.getElementById("skill"+num+"_info").innerHTML = output } else { document.getElementById("skill"+num+"_info").innerHTML = ":" }
		if (outcome.ar != 0) { document.getElementById("ar_skill"+num).innerHTML = "AR: " + outcome.ar + " ("+hit_chance+"%)" } else { document.getElementById("ar_skill"+num).innerHTML = "" }
	}
	if (offhandType == "weapon" && (skillName == "Dual Strike" || skillName == "Frenzy" || skillName == "Whirlwind") && equipped.weapon.name != "none") {
		document.getElementById("offhand_skill"+num).style.display = "inline"
		document.getElementById("offhand_skill"+num).style.margin = "0px 0px 0px "+(document.getElementById("dropdown_skill"+num).clientWidth+10)+"px"
		var physDamage_offhand = getWeaponDamage(strTotal,dexTotal,"offhand",0);
		var ohd = getNonPhysWeaponDamage("offhand");
		var nonPhys_min_offhand = Math.floor(ohd.fMin + ohd.cMin + ohd.lMin + ohd.pMin + ohd.mMin);
		var nonPhys_max_offhand = Math.floor(ohd.fMax + ohd.cMax + ohd.lMax + ohd.pMax + ohd.mMax);
		var outcome = {min:0,max:0,ar:0};
		outcome = c.getSkillDamage(skill, ar, physDamage_offhand[0], physDamage_offhand[1], physDamage_offhand[2], nonPhys_min_offhand, nonPhys_max_offhand);
		var output = outcome.min + "-" + outcome.max + " {"+Math.ceil((outcome.min+outcome.max)/2)+"}";
		if (outcome.min != 0 && outcome.max != 0) { document.getElementById("offhand_skill"+num+"_damage").innerHTML = output }
		//if (outcome.ar != 0) { document.getElementById("ar_skill"+num).innerHTML += " ... " + outcome.ar }
	} else {
		document.getElementById("offhand_skill"+num).style.display = "none"
	}
	if (skillName == "Lightning Surge" || skillName == "Chain Lightning") {
		var fcrTotal = character.fcr + character.level*character.fcr_per_level;
		var fcr_f = c.fcr_frames_alt;
		for (let i = 1; i < c.fcr_bp_alt.length; i++) { if (fcrTotal >= c.fcr_bp_alt[i]) { fcr_f -= 1 } }
		document.getElementById("ar_skill"+num).innerHTML = "Cast Rate: "+fcr_f+" frames"
	}
	
	updateSkills()
}	

// round - Rounds and returns a number
//	num: number to round
// return: rounded number (no decimals if above 33 or ending in ".0")
// ---------------------------------
function round(num) {
	// TODO: Always round damage/life numbers
	var temp = num;
	var decimals = (toString(num) + ".");
	if (num >= 33) { temp = Math.round(num) }
	else {
		decimals = decimals.split(".");
		if (decimals[1].length > 1) { temp = num.toFixed(1) }
		else { temp = (Math.round((num + Number.EPSILON) * 10) / 10) }
	}
	return temp;
}

// skillOut - Hides skill tooltip
// ---------------------------------
function skillOut() {
	document.getElementById("tooltip").style.display="none"
	checkRequirements()
}

// itemOut - hides item tooltip for Charm Inventory
// ---------------------------------
function itemOut() {
	document.getElementById("tooltip_inventory").style.display = "none"
}

// itemHover - Shows item tooltip on mouse-over for Charm Inventory
//	id: unique string identifier for item
// ---------------------------------
function itemHover(ev, id) {
	var base = "";
	var type = "charm";
	var index = 0;
	var transfer = 0;
	var color = "White";
	for (let i = 1; i < inv.length; i++) { if (inv[i].id == id) { transfer = i } }
	var val = inv[0]["in"][transfer];
	var name = val.split("_")[0];
	var height = 1;
	if (typeof(equipped["charms"][val]) == 'undefined') { for (let k = 0; k < socketables.length; k++) { if (socketables[k].name == name) { type = socketables[k].type; index = k; } } }
	if (type == "charm") {
		//name = equipped.charms[val].name
		color = "Indigo"
		if (name == "Annihilus" || name == "Hellfire Torch" || name == "Gheed's Fortune" || name == "Horadric Sigil") { color = "Gold" }
		if (equipped["charms"][val].size != "small" && equipped["charms"][val].size != "large" && equipped["charms"][val].size != "grand") { color = "Red" }
		lastCharm = name
		if (equipped["charms"][val].size == "large") { height = 2; base = "<br>Large Charm"; }
		else if (equipped["charms"][val].size == "grand") { height = 3; base = "<br>Grand Charm"; }
		else { base = "<br>Small Charm" }
		if (name.substr(0,3) == "+1 " && height == 3) { name = name.substr(3) }
		if (equipped["charms"][val].rarity == "magic" || equipped["charms"][val].debug == 1) { base = "" }
	} else {
		if (type == "rune") { color = "Orange" }
		else if (socketables[index].rarity == "unique") { color = "Gold" }
		else if (socketables[index].rarity == "magic") { color = "Blue" }
		else if (socketables[index].rarity == "rare") { color = "Yellow" }
		lastSocketable = name
		name = name.split(" (")[0]
		if (type == "jewel" && socketables[index].rarity != "magic") { base = "<br>Jewel" }
	}

	var cell_x = id[1]-1; if (cell_x == -1) { cell_x = 9 }
	var cell_y = id[2]-1 + height;
	var offset_x = 350;
	var offset_y = 433;
	offset_x += (10+cell_x*28)
	offset_y += (124+cell_y*29)
	var main_affixes = "";
	var affixes = "";
	if (type == "charm" && name != "+1 (each) skill") {
		affixes = ""
		for (affix in equipped["charms"][val]) {
			if (stats[affix] != unequipped[affix] && stats[affix] != 1) {
				var affix_info = getAffixLine(affix,"charms",val,"");
				if (affix_info[1] != 0) {
					if (affix == "req_level") { main_affixes += affix_info[0]+"<br>" }
					else { affixes += affix_info[0]+"<br>" }
				}
			}
		}
	} else if (type == "jewel" || type == "rune" || type == "gem" || type == "other") {
		for (affix in socketables[index]) {
			if (stats[affix] != unequipped[affix] && stats[affix] != 1) {
				var affix_info = getAffixLine(affix,"socketables",index,"");
				if (affix_info[1] != 0) {
					if (affix == "req_level") { main_affixes += affix_info[0]+"<br>" }
					else { affixes += affix_info[0]+"<br>" }
				}
			}
		}
		for (affix in socketables[index]) { if (affix == "weapon" || affix == "armor" || affix == "shield") {
			affixes += (affix[0].toUpperCase()+affix.slice(1)+":<br>")
			for (affix_sub in socketables[index][affix]) { if (affix_sub != "pDamage_duration") {	// why does it break with pDamage_duration?
				var affix_info = getAffixLine(affix_sub,"socketables",index,affix);
				if (affix_info[1] != 0) { affixes += affix_info[0]+"<br>" }
			} }
		} }
	}
	document.getElementById("item_name").style.color = colors[color]
	document.getElementById("item_name").innerHTML = name+base
	document.getElementById("item_info").innerHTML = main_affixes
	document.getElementById("item_corruption").innerHTML = ""
	document.getElementById("item_affixes").innerHTML = affixes
	document.getElementById("item_set_affixes").innerHTML = ""
	document.getElementById("item_socketed_affixes").innerHTML = ""
	document.getElementById("item_group_affixes").innerHTML = ""
	document.getElementById("tooltip_inventory").style.display = "block"
	var wid = Math.floor(document.getElementById("tooltip_inventory").getBoundingClientRect().width/2);
	document.getElementById("tooltip_inventory").style.top = offset_y+"px"
	document.getElementById("tooltip_inventory").style.left = (offset_x-wid)+"px"
	if (name == "") { document.getElementById("tooltip_inventory").style.left = 950+"px" }
	
	// TODO better system:
	
	// start with cell divs at high z-index
	// on mouseover, use cell info...
	// if cell is not empty
	//	if cell is not main-cell of occupying item			// main-cell: top cell when traversing inv[].in
	//		lower z-index of cell  (pushes the item above, so it can be grabbed while all its other individual cells are surfaced)
	// then, 
	// on mouseout: raise z-level of cell 
	//
	// ...this should fix the bug that prevents charms from being moved into an overlapping space below themselves (or to the right for future items wider than 1 space)
	
}

// itemSelect - Duplicates the selected charm
//	id: unique string identifier for charm
// ---------------------------------
function itemSelect(ev) {
	var dup = 0;
	if (ev.shiftKey) { dup = 1 }
	if (ev.ctrlKey) { dup = 10 }
	if (dup > 0) {
		if (name != "Annihilus" && name != "Hellfire Torch" && name != "Gheed's Fortune") {
			for (let d = 0; d < dup; d++) {
				addCharm(lastCharm)
			}
		}
	}
}

// allowDrop - Handles placement validation for Charm Inventory
//	cell: position of item in 10x4 inventory (1-40)
//	y: height of item (1-3)
// ---------------------------------
function allowDrop(ev, cell, y) {
	if (inv[0].pickup_y + y <= 5) {
		var allow = 1
		if (inv[cell].empty == 0 && inv[0].in[cell] != inv[0].onpickup) { allow = 0 }
		if (inv[0].pickup_y > 1 && inv[cell+10].empty == 0 && inv[0].in[cell+10] != inv[0].onpickup) { allow = 0 }
		if (inv[0].pickup_y > 2 && inv[cell+20].empty == 0 && inv[0].in[cell+20] != inv[0].onpickup) { allow = 0 }
		if (allow == 1) {
			var inEquipment = 0;
			var val = inv[0].onpickup;
			var groups = ["helm", "armor", "weapon", "offhand"];
			for (group in equipped) { if (val == equipped[group].name) { inEquipment = 1 } }
			if (inEquipment == 0) { ev.preventDefault(); }
		}
	}
}

// drag - Handles item dragging for Charm Inventory
// ---------------------------------
function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
	inv[0].onpickup = ev.target.id
	var height = document.getElementById(inv[0].onpickup).height;
	if (height > 80) { inv[0].pickup_y = 3 }
	else if (height > 50) { inv[0].pickup_y = 2 }
	else { inv[0].pickup_y = 1 }
}

// drop - Handles item dropping for Charm Inventory
//	cell: 1-40 (upper left position of item in 10x4 inventory)
// ---------------------------------
function drop(ev,cell) {
	// TODO: Is any of this similar enough to addCharm() or addSocketable() to be combined?
	ev.preventDefault();
	var val = inv[0].onpickup;
	var data = ev.dataTransfer.getData("text");
	ev.target.appendChild(document.getElementById(data));
	for (s = 1; s <= inv[0].in.length; s++) {
		if (inv[0].in[s] == inv[0].onpickup) { inv[s].empty = 1; inv[0].in[s] = ""; 
			inv[s].y = 1;
			document.getElementById(inv[s].id).style = "position: absolute; width: 29px; height: 29px; z-index: 3;";
		}
	}
	inv[cell].empty = 0
	inv[0].in[cell] = inv[0].onpickup
	if (inv[0].pickup_y > 1) { inv[cell+10].empty = 0; inv[0].in[cell+10] = inv[0].onpickup; inv[cell].y = 2; }
	if (inv[0].pickup_y > 2) { inv[cell+20].empty = 0; inv[0].in[cell+20] = inv[0].onpickup; inv[cell].y = 3; }
	inv[0].onpickup = "none"
	
	// Remove affixes if unsocketed from equipment
	var socketable = 0;
	var name = val.split('_')[0];
	for (let k = 0; k < socketables.length; k++) { if (socketables[k].name == name) { socketable = 1 } }
	if (socketable == 1) {
		var groups = ["helm", "armor", "weapon", "offhand"];
		for (let g = 0; g < groups.length; g++) {
			for (let i = 0; i < socketed[groups[g]].items.length; i++) {
				if (val == socketed[groups[g]].items[i].id) {
					for (affix in socketed[groups[g]].items[i]) { if (affix != "id") {
						character[affix] -= socketed[groups[g]].items[i][affix]
						socketed[groups[g]].totals[affix] -= socketed[groups[g]].items[i][affix]
					} }
					socketed[groups[g]].items[i] = {id:"",name:""}
					socketed[groups[g]].socketsFilled -= 1
				}
			}
		}
		// update
		calculateSkillAmounts()
		updateStats()
		updateSkills()
		if (selectedSkill[0] != " ­ ­ ­ ­ Skill 1") { checkSkill(selectedSkill[0], 1) }
		if (selectedSkill[1] != " ­ ­ ­ ­ Skill 2") { checkSkill(selectedSkill[1], 2) }
		// updateAllEffects()?
	}
}

// trash - Handles item removal for Charm Inventory
// ---------------------------------
function trash(ev) {
	var val = ev.target.id;
	var name = val.split('_')[0];
	var group = "charms"
//	if (name == "+1 (each) skill") { for (let i = 0; i < skills.length; i++) { if (skills[i].level == 0) { removeEffect(getId(skills[i].name)) } } }	// && skills[i].force_levels <= 1
	for (old_affix in equipped[group][val]) {
		character[old_affix] -= equipped[group][val][old_affix]
		equipped[group][val][old_affix] = unequipped[old_affix]
	}
	for (let s = 1; s <= inv[0].in.length; s++) {
		if (inv[0].in[s] == ev.target.id) {
			inv[s].empty = 1;
			inv[0].in[s] = "";
		}
	}
	ev.target.remove();
	
	// find/remove duplicates
	var dup = 0;
	if (ev.shiftKey) { dup = 9 }
	if (ev.ctrlKey) { dup = 39 }
	if (dup > 0) {
		for (let d = 0; d < inv[0].in.length; d++) {
			if (dup > 0 && name == inv[0].in[d].split('_')[0]) {
				val = inv[0].in[d];
				var size = equipped[group][val].size
				for (old_affix in equipped[group][val]) {
					character[old_affix] -= equipped[group][val][old_affix]
					equipped[group][val][old_affix] = unequipped[old_affix]
				}
				inv[0].in[d] = "";
				inv[d].empty = 1;
				if (size == "large" || size == "grand") { inv[d+10].empty = 1; inv[0].in[d+10] = ""; }
				if (size == "grand") { inv[d+20].empty = 1; inv[0].in[d+20] = ""; }
				document.getElementById(val).remove()
				dup--
			}
		}
	}
	calculateSkillAmounts()
	updateStats()
	updateSkills()
	if (selectedSkill[0] != " ­ ­ ­ ­ Skill 1") { checkSkill(selectedSkill[0], 1) }
	if (selectedSkill[1] != " ­ ­ ­ ­ Skill 2") { checkSkill(selectedSkill[1], 2) }
	updateAllEffects()
	document.getElementById("tooltip_inventory").style.display = "none"
}

// getItemImage - gets the image filename for the specified item
//	group: item's group
//	base_name: item base (use "" if none)
//	source: specified file name, if it has one (use "" if none)
// return: filename of item's image
// ---------------------------------
function getItemImage(group, base_name, source) {
	var prefix = "./images/items/"
	var filename = source
	var base = getBaseId(base_name);
	if (base_name != "") {
		if (base_name == "Bolts") { prefix += group + "/" }	// only bolts have explicit bases so far (other quivers are assumed to be arrows) ...but importantly, neither are included in bases[]
		else {
			prefix += (bases[base].group + "/")
			if (bases[base].group == "weapon") {
				var type = equipped[group].type;
				if (type == "hammer" || type == "club") { type = "mace" }
				prefix += (type + "/")
			}
		}
		if (source != "") {
			prefix += "special/"
		} else {
			if (base_name == "Tiara" || base_name == "Diadem" || base_name == "Bolts") {
				filename = base_name
			} else {
				if (typeof(bases[base].downgrade) != 'undefined') {
					filename = bases[base].downgrade
					base = getBaseId(bases[base].downgrade)
					if (typeof(bases[base].downgrade) != 'undefined') {
						filename = bases[base].downgrade
					}
				} else {
					filename = base_name
				}
			}
		}
	} else {
		// quest weapons, unique quiver/jewelry
		if (source != "") {
			if (group == "weapon" || (group == "offhand" && offhandType == "weapon")) {
				var type = equipped[group].type;
				if (type == "hammer" || type == "club") { type = "mace" }
				prefix += ("weapon/" + type + "/special/")
			} else {
				prefix += (group + "/")
				prefix += "special/"
			}
		// jewelry, quivers (arrows)
		} else {
			if (group == "amulet" || group == "ring1" || group == "ring2") {
				if (group == "amulet") { prefix += "amulet/"; filename = "Amulet_" + Math.ceil(Math.random() * 3); }
				else { prefix += "ring/"; filename = "Ring_" + Math.ceil(Math.random() * 5); }
			} else if (group == "offhand") {
				prefix += "offhand/"; filename = "Arrows";
			}
		}
	}
	filename = prefix + filename.split(" ").join("_") + ".png"
	return filename
}

// socketableSelect - Duplicates the selected socketable item (gem, rune, jewel)
// ---------------------------------
function socketableSelect(ev) {
	var dup = 0;
	if (ev.shiftKey) { dup = 1 }
	if (ev.ctrlKey) { dup = 10 }
	if (dup > 0) { for (let d = 0; d < dup; d++) { addSocketable(lastSocketable) } }
}

// equipmentHover - shows equipment info on mouse-over
//	group: equipment group name
// ---------------------------------
function equipmentHover(group) {
	var offset_x = 350;
	var offset_y = 433;
	var groupId = group;
	if (group == "helm" || group == "armor" || group == "weapon" || group == "offhand") { groupId += "_" }
	var name = "";
	var sock = "";
	var base = "";
	if (equipped[group].name != "none" && (group == "helm" || group == "armor" || (group == "weapon" && equipped[group].type != "javelin" && equipped[group].type != "thrown") || (group == "offhand" && equipped[group].type != "quiver"))) {
		var sockets = ~~corruptsEquipped[group].sockets + ~~equipped[group].sockets;
		sockets = Math.min(sockets,equipped[group].max_sockets)
		if (socketed[group].sockets > 0 || equipped[group].sockets > 0) {
			if (corruptsEquipped[group].name == "none") { sock = "<font color='"+colors.Gray+"'> ["+sockets+"]</font>" }
			else { sock = "<font color='"+colors.Red+"'> ["+sockets+"]</font>" }
		}
	}
	if (typeof(equipped[group].base) != 'undefined' && equipped[group].base != "") { base = equipped[group].base }
	else if (equipped[group].name != "none" && (group == "ring1" || group == "ring2")) { base = "Ring" }
	else if (equipped[group].name != "none" && group == "amulet") { base = "Amulet" }
	else if (equipped[group].type == "quiver") { base = "Arrows" }
	else if (equipped[group].type == "jewel") { base = "Jewel" }
	else if (equipped[group].size == "small") { base = "Small Charm" }
	else if (equipped[group].size == "large") { base = "Large Charm" }
	else if (equipped[group].size == "grand") { base = "Grand Charm" }
	
	if (equipped[group].name != "none") { name = equipped[group].name.split(" ­ ")[0].split(" (")[0]; }
	if (base.split("_")[0] != "Special") { base = "<br>"+base }
	if (equipped[group].rarity == "common" || equipped[group].rarity == "magic") { base = "" }
	var corruption = "";
	var affixes = "";
	var main_affixes = "";
	var socketed_affixes = "";
	var set_affixes = "";
	var set_group_affixes = "";
	if (equipped[group].name != "none" && corruptsEquipped[group].name != "none") {
		for (affix in corruptsEquipped[group]) {
			if (stats[affix] != unequipped[affix] && stats[affix] != 1) {
				var halt = 0; if (affix == "sockets" && corruptsEquipped[group].name != "+ Sockets") { halt = 1; }
				var affix_info = getAffixLine(affix,"corruptsEquipped",group,"");
				if (affix_info[1] != 0 && halt == 0) { corruption += affix_info[0]+"<br>" }
			}
		}
	}
	for (affix in equipped[group]) {
		if (equipped[group][affix] != unequipped[affix] && stats[affix] != unequipped[affix] && stats[affix] != 1 && affix != "velocity" && affix != "smite_min") {
			var affix_info = getAffixLine(affix,"equipped",group,"");
			if (affix_info[1] != 0) {
				if (affix == "base_damage_min" || affix == "base_defense" || affix == "req_level" || affix == "req_strength" || affix == "req_dexterity" || affix == "durability" || affix == "baseSpeed" || affix == "range" || affix == "throw_min" || affix == "base_min_alternate" || affix == "block" || affix == "velocity") { main_affixes += affix_info[0]+"<br>" }
				else { affixes += affix_info[0]+"<br>" }
			}
		}
	}
	if (equipped[group].name != "none" && (group == "helm" || group == "armor" || group == "weapon" || group == "offhand")) {
		updateSocketTotals()
		for (affix in socketed[group].totals) {
			if (stats[affix] != unequipped[affix] && stats[affix] != 1 && affix != "req_level" && affix != "ctc") {
				var affix_info = getAffixLine(affix,"socketed",group,"");
				if (affix_info[1] != 0) { socketed_affixes += affix_info[0]+"<br>" }
			}
		}
		var ctc_possible = ["100% chance to cast level 29 Blaze when you level up","100% chance to cast level 43 Frost Nova when you level up","100% chance to cast level 41 Nova when you level up","100% chance to cast level 23 Venom when you level up"];
		var ctc_included = [0,0,0,0];
		for (let i = 0; i < socketed[group].items.length; i++) { for (affix in socketed[group].items[i]) { if (affix == "ctc") {
			var source = socketed[group].items[i];
			var affix_line = "";
			for (let j = 0; j < source[affix].length; j++) {
				var line = source[affix][j][0]+"% chance to cast level "+source[affix][j][1]+" "+source[affix][j][2]+" "+source[affix][j][3];
				for (let k = 0; k < ctc_possible.length; k++) { if (line == ctc_possible[k]) {
					if (ctc_included[k] == 0) { affix_line += line+"<br>" }
					ctc_included[k] = 1
				} }
			}
			socketed_affixes += affix_line
		} } }
	}
	// TODO: Reduce duplicated code from set bonuses - rewrite getAffixLine?
	if (typeof(equipped[group].rarity) != 'undefined') { if (equipped[group].rarity == "set") {
		var bonuses = equipped[group].set_bonuses;
		var set = bonuses[0];
		var group_bonuses = sets[set];
		var amount = Math.round(character[set]);
		var list_bonuses = {};
		var list_group_bonuses = {};
		for (let i = 1; i < bonuses.length; i++) {
			if (amount >= i) {
				for (affix in bonuses[i]) {
					if (typeof(list_bonuses[affix]) == 'undefined') { list_bonuses[affix] = 0 }
					list_bonuses[affix] += bonuses[i][affix]
				}
			}
		}
		for (let i = 1; i < group_bonuses.length; i++) {
			if (amount >= i) {
				for (affix in group_bonuses[i]) {
					if (typeof(list_group_bonuses[affix]) == 'undefined') { list_group_bonuses[affix] = 0 }
					list_group_bonuses[affix] += group_bonuses[i][affix]
				}
			}
		}
		for (affix in list_bonuses) { if (stats[affix] != unequipped[affix] && stats[affix] != 1) {
			var source = list_bonuses;
			var affix_line = "";
			var value = source[affix];
			var value_combined = ~~value;
			var halt = false;
			var both = 0;
			var stat = stats[affix];
			if (stat.alt != null) {
				if (typeof(source[stat.index[0]]) != 'undefined' && typeof(source[stat.index[1]]) != 'undefined') { if (source[stat.index[0]] > 0 && source[stat.index[1]] > 0) { both = 1; if (stat.index[1] == affix) { halt = true } } }
				if (both == 0) { stat = null; stat = stats_alternate[affix]; }
			}
			for (let i = 0; i < stat.index.length; i++) {
				value = source[stat.index[i]]
				if (value == 'undefined') { value = 0 }
				if (isNaN(value) == false) { value_combined += value }
				var rounding = true;
				if (stat.mult != null) {
					if (stat.mult[i] != 1) { value *= character[stat.mult[i]] }
					else { rounding = false }
				}
				if (isNaN(value) == false && rounding == true) { value = round(value) }
				var affix_text = stat.format[i];
				if (value < 0 && affix_text[affix_text.length-1] == "+") { affix_text = affix_text.slice(0,affix_text.length-1) }
				affix_line += affix_text
				affix_line += value
			}
			var affix_text = stat.format[stat.index.length];
			affix_line += affix_text
			if (halt == true) { value_combined = 0 }
			if (value_combined != 0) { set_affixes += affix_line+"<br>" }
		} }
		for (affix in list_group_bonuses) { if (stats[affix] != unequipped[affix] && stats[affix] != 1) {
			var source = list_group_bonuses;
			var affix_line = "";
			var value = source[affix];
			var value_combined = ~~value;
			var halt = false;
			var both = 0;
			var stat = stats[affix];
			if (stat.alt != null) {
				if (typeof(source[stat.index[0]]) != 'undefined' && typeof(source[stat.index[1]]) != 'undefined') { if (source[stat.index[0]] > 0 && source[stat.index[1]] > 0) { both = 1; if (stat.index[1] == affix) { halt = true } } }
				if (both == 0) { stat = null; stat = stats_alternate[affix]; }
			}
			for (let i = 0; i < stat.index.length; i++) {
				value = source[stat.index[i]]
				if (value == 'undefined') { value = 0 }
				if (isNaN(value) == false) { value_combined += value }
				var rounding = true;
				if (stat.mult != null) {
					if (stat.mult[i] != 1) { value *= character[stat.mult[i]] }
					else { rounding = false }
				}
				if (isNaN(value) == false && rounding == true) { value = round(value) }
				var affix_text = stat.format[i];
				if (value < 0 && affix_text[affix_text.length-1] == "+") { affix_text = affix_text.slice(0,affix_text.length-1) }
				affix_line += affix_text
				affix_line += value
			}
			var affix_text = stat.format[stat.index.length];
			affix_line += affix_text
			if (halt == true) { value_combined = 0 }
			if (value_combined != 0) { set_group_affixes += affix_line+"<br>" }
		} }
		if (set_group_affixes != "") { set_group_affixes = "<br>"+group_bonuses[0]+":<br>"+set_group_affixes }
	} }
	if (socketed_affixes != "") { socketed_affixes = "<br>"+socketed_affixes }
	var runeword = "";
	if (equipped[group].rarity == "rw") {
		var rw_name = equipped[group].name.split(" ­ ")[0].split(" ").join("_").split("'").join("");
		var runes = "";
		var i = 0;
		for (i = 0; i < runewords[rw_name].length; i++) { runes += runewords[rw_name][i]; }
		runeword = "<br>"+"<font color='"+colors.Gold+"'>'"+runes+"'</font>"
		name = "<font color='"+colors.Gold+"'>"+name+"</font>"
		affixes += "Socketed ("+i+")<br>"
	}
	document.getElementById("item_name").innerHTML = name+sock+base+runeword
	document.getElementById("item_info").innerHTML = main_affixes
	document.getElementById("item_corruption").innerHTML = corruption
	document.getElementById("item_affixes").innerHTML = affixes
	document.getElementById("item_set_affixes").innerHTML = set_affixes
	document.getElementById("item_socketed_affixes").innerHTML = socketed_affixes
	document.getElementById("item_group_affixes").innerHTML = set_group_affixes
	
	var textColor = "Gold";
	if (equipped[group].rarity == "set") { textColor = "Green" }
	else if (equipped[group].rarity == "magic") { textColor = "Blue" }
	else if (equipped[group].rarity == "rare") { textColor = "Yellow" }
	else if (equipped[group].rarity == "craft") { textColor = "Orange" }
	else if ((equipped[group].rarity == "common" || equipped[group].rarity == "rw") && equipped[group].ethereal == 1) { textColor = "Gray" }
	else if (equipped[group].rarity == "common" || equipped[group].rarity == "rw") { textColor = "White" }
	document.getElementById("item_name").style.color = colors[textColor]
	document.getElementById("tooltip_inventory").style.display = "block"
	
	var wid = Math.floor(document.getElementById(groupId).getBoundingClientRect().width/2 - document.getElementById("tooltip_inventory").getBoundingClientRect().width/2);
	if (name != "") {
		if (groupId == "helm_") { offset_x += 2*30+wid; offset_y += 60;
		} else if (groupId == "armor_") { offset_x += 4*30+wid; offset_y += 90;
		} else if (groupId == "gloves") { offset_x += 6*30+wid; offset_y += 60;
		} else if (groupId == "boots") { offset_x += 6*30+wid; offset_y += 120;
		} else if (groupId == "belt") { offset_x += 4*30+wid; offset_y += 120;
		} else if (groupId == "amulet") { offset_x += 2.5*30+wid; offset_y += 90;
		} else if (groupId == "ring1") { offset_x += 2*30+wid; offset_y += 120;
		} else if (groupId == "ring2") { offset_x += 3*30+wid; offset_y += 120;
		} else if (groupId == "weapon_") { offset_x += 0+wid; offset_y += 120;
		} else if (groupId == "offhand_") { offset_x += 8*30+wid; offset_y += 120;
		}
		document.getElementById("tooltip_inventory").style.top = offset_y+"px"
		document.getElementById("tooltip_inventory").style.left = offset_x+"px"
	}
	if (name == "") { document.getElementById("tooltip_inventory").style.left = 950+"px" }
}

// equipmentOut - stops showing equipment info (mouse-over ends)
// ---------------------------------
function equipmentOut() {
	document.getElementById("tooltip_inventory").style.left = 350+"px"	// why does the prevent misalignment?
	document.getElementById("tooltip_inventory").style.display = "none"
}

// getAffixLine - determines how an affix should be displayed
//	affix: name of the affix
//	loc: location of the affix
//	group: group of affix
//	subgroup: subgroup of affix (for socketables)
// return: the formatted affix line and combined value of affixes used
// ---------------------------------
function getAffixLine(affix, loc, group, subgroup) {
	var source;
	if (loc == "equipped") { source = equipped[group]; }
	else if (loc == "corruptsEquipped") { source = corruptsEquipped[group]; }
	else if (loc == "charms") { source = equipped.charms[group]; }
	else if (loc == "socketables") { source = socketables[group]; if (subgroup != "") { source = socketables[group][subgroup] } }
	else if (loc == "socketed") { source = socketed[group].totals; }
	else if (loc = "effects") { source = effects[group]; }
	var affix_line = "";
	var value = source[affix];
	var value_combined = ~~value;
	var halt = false;
	var both = 0;
	var stat = stats[affix];
	if (affix != "ctc" && affix != "cskill" && affix != "set_bonuses") {
		if (stat.alt != null) {
			if (typeof(source[stat.index[0]]) != 'undefined' && typeof(source[stat.index[1]]) != 'undefined') { if (source[stat.index[0]] > 0 && source[stat.index[1]] > 0) { both = 1; if (stat.index[1] == affix) { halt = true } } }
			if (both == 0) { stat = null; stat = stats_alternate[affix]; }
		}
		for (let i = 0; i < stat.index.length; i++) {
			value = source[stat.index[i]]
			if (value == 'undefined') { value = 0 }
			if (isNaN(value) == false) { value_combined += value }
			var rounding = true;
			if (stat.mult != null) {
				if (stat.mult[i] != 1) {
					value *= character[stat.mult[i]]
					if (affix == "all_skills_per_level") { value = Math.ceil(value) }
				}
				else { rounding = false }
			}
			if (isNaN(value) == false && rounding == true) { value = round(value) }
			var affix_text = stat.format[i];
			if (value < 0 && affix_text[affix_text.length-1] == "+") { affix_text = affix_text.slice(0,affix_text.length-1) }
			affix_line += affix_text
			affix_line += value
		}
		var affix_text = stat.format[stat.index.length];
		if (affix_text == " to Class Skills") { affix_text = " to "+character.class_name+" Skills" }
		affix_line += affix_text
		if (affix == "aura" && (source[affix] == "Lifted Spirit" || source[affix] == "Righteous Fire")) { affix_line = source[affix]+" Aura when Equipped" }
		if (halt == true) { value_combined = 0 }
	} else {
		affix_line == ""; value_combined = 1;
		if (affix == "ctc") {
			for (let i = 0; i < source[affix].length; i++) {
				var line = source[affix][i][0]+"% chance to cast level "+source[affix][i][1]+" "+source[affix][i][2]+" "+source[affix][i][3];
				affix_line += line
				if (i < source[affix].length-1) { affix_line += "<br>" }
			}
		} else if (affix == "cskill") {
			for (let i = 0; i < source[affix].length; i++) {
				var line = "Level "+source[affix][i][0]+" "+source[affix][i][1]+" ("+source[affix][i][2]+" charges)";
				affix_line += line
				if (i < source[affix].length-1) { affix_line += "<br>" }
			}
		}
	}
	var result = [affix_line,value_combined];
	return result
}

// handleSocket - 
//	group: equipment group name
//	source: inventory space to drag from if event is null
// ---------------------------------
function handleSocket(event, group, source) {
	// TODO: Modify so that it can be used as a way to 'hack' socketables to display within bounds?
	var ident = "";
	if (source > 0) { ident = inv[0].in[source] }
	else { ident = event.dataTransfer.getData("text") }
	socket(event,group,source)
//	trashSocketable(event,ident,1)
//	var newId = addSocketable(ident.split("_")[0])
//	var newSource = 1; for (let s = 1; s <= inv[0].in.length; s++) { if (inv[0].in[s] == newId) { newSource = s } }
//	socket(null,group,newSource)
}

// socket - Adds a socketable item (jewel, rune, gem) to equipment
//	group: equipment group name
//	source: inventory space to drag from if event is null (used when loading a character)
// ---------------------------------
function socket(event, group, source) {
	if (event == null && source > 0) {
		var id = inv[0].in[source];
		document.getElementById(group).appendChild(document.getElementById(id))
	} else {
		event.preventDefault();
		var data = event.dataTransfer.getData("text");
		document.getElementById(group).appendChild(document.getElementById(data))
	}
	// equipment destination
	var spaceFound = 0;
	var index = 0;
	for (let i = 0; i < socketed[group].items.length; i++) { if (socketed[group].items[i].name == "") { spaceFound = 1; index = i; } }	// TODO: reverse order to clarify saved file?
	if (spaceFound == 1) {
		var name = inv[0].onpickup.split('_')[0];
		// Remove previous affixes, if being moved from another equipment item
		var groups = ["helm", "armor", "weapon", "offhand"];
		for (let g = 0; g < groups.length; g++) {
			for (let i = 0; i < socketed[groups[g]].items.length; i++) {
				if (inv[0].onpickup == socketed[groups[g]].items[i].id) {
					for (affix in socketed[groups[g]].items[i]) { if (affix != "id") {
						character[affix] -= socketed[groups[g]].items[i][affix]
						socketed[groups[g]].totals[affix] -= socketed[groups[g]].items[i][affix]
					} }
					socketed[groups[g]].items[i] = {id:"",name:""}
					socketed[groups[g]].socketsFilled -= 1
				}
			}
		}
		// Add affixes
		for (let k = 0; k < socketables.length; k++) { if (socketables[k].name == name) {
			socketed[group].items[index].id = inv[0].onpickup
			for (affix in socketables[k]) {
				if (affix != "type" && affix != "rarity" && affix != "img") {
					var affix_dest = affix;
					if (affix == "e_damage") { if (group == "weapon" || (group == "offhand" && offhandType == "weapon")) { /*don't change*/ } else { affix_dest = "damage_bonus" } }
					if (typeof(socketed[group].totals[affix_dest]) == 'undefined') { socketed[group].totals[affix_dest] = 0 }
					socketed[group].items[index][affix_dest] = socketables[k][affix]
					character[affix_dest] += socketables[k][affix]
					socketed[group].totals[affix_dest] += socketables[k][affix]
				}
				if (affix == group || (affix == "armor" && group == "helm") || (affix == "armor" && group == "offhand" && typeof(socketables[k]["shield"]) == 'undefined' && offhandType != "weapon") || (affix == "shield" && group == "offhand" && offhandType != "weapon") || (affix == "weapon" && group == "offhand" && offhandType == "weapon")) {
					for (groupAffix in socketables[k][affix]) {
						if (typeof(socketed[group].totals[groupAffix]) == 'undefined') { socketed[group].totals[groupAffix] = 0 }
						socketed[group].items[index][groupAffix] = socketables[k][affix][groupAffix]
						character[groupAffix] += socketables[k][affix][groupAffix]
						socketed[group].totals[groupAffix] += socketables[k][affix][groupAffix]
					}
				}
			}
		} }
		socketed[group].socketsFilled += 1
		calculateSkillAmounts()
		updateStats()
		updateSkills()
		if (selectedSkill[0] != " ­ ­ ­ ­ Skill 1") { checkSkill(selectedSkill[0], 1) }
		if (selectedSkill[1] != " ­ ­ ­ ­ Skill 2") { checkSkill(selectedSkill[1], 2) }
		// updateAllEffects()?
	}
	// inventory destination
	for (let s = 1; s <= inv[0].in.length; s++) {
		if (inv[0].in[s] == inv[0].onpickup) {
			inv[s].empty = 1; inv[0].in[s] = ""; inv[s].y = 1;
			document.getElementById(inv[s].id).style = "position: absolute; width: 28px; height: 28px; z-index: 3;";
		}
	}
	inv[0].onpickup = "none"
}

// ---------------------------------
function adjustDefenseSocket(group) {
/*	var multEth = 1;
	var multED = 1 + socketables[k][affix][groupAffix]/100;
	if (typeof(equipped[group]["ethereal"]) != 'undefined') { if (equipped[group]["ethereal"] == 1) { multEth = 1.5; } }
	if (typeof(equipped[group]["e_def"]) != 'undefined') { multED += (equipped[group]["e_def"]/100) }
	var def_change = 0;
	if (equipped[group].name != "none") {
		var base = getBaseId(equipped[group].base);
		var defense_old = equipped[group].base_defense;
		var defense_new = Math.floor(bases[base].base_defense * multEth * multED);
		def_change = defense_new - defense_old
	}
	if (typeof(socketed[group].totals["base_defense"]) == 'undefined') { socketed[group].totals["base_defense"] = 0 }
	socketed[group].items[index]["base_defense"] = def_change
	character["defense"] += socketed[group].items[index]["base_defense"]
	socketed[group].totals["base_defense"] += socketed[group].items[index]["base_defense"]
*/
}

// allowSocket - Checks on mouse-over whether a socketable item may be added
//	group: equipment group being mouse-over'd
// ---------------------------------
function allowSocket(event, group) {
	socketed[group].sockets = ~~equipped[group].sockets + ~~corruptsEquipped[group].sockets
	var allow = 0;
	if (socketed[group].sockets > 0 && socketed[group].socketsFilled < socketed[group].sockets) {
		var name = inv[0].onpickup.split('_')[0];
		for (let k = 0; k < socketables.length; k++) {
			if (socketables[k].name == name) { if (socketed[group].socketsFilled < socketed[group].sockets) { allow = 1 } }
		}
	}
	if (allow == 1) {
		var spaceAvailable = 0;
		for (let i = 0; i < socketed[group].items.length; i++) {
			if (socketed[group].items[i].name == "") { spaceAvailable = 1; }
		}
		if (spaceAvailable == 1) { event.preventDefault(); }
	}
}

// dragSocketable - Handles item dragging for socketables (gems, runes, jewels)
// ---------------------------------
function dragSocketable(ev) {
//	ev.dataTransfer.setData("text", ev.target.id);
//	inv[0].onpickup = ev.target.id
//	inv[0].pickup_y = 1
	drag(ev)
}

// trashSocketable - Handles item removal for socketables (gems, runes, jewels)
//	ident: 
//	override: 
// ---------------------------------
function trashSocketable(event, ident, override) {
	var val = ident;
	var target = document.getElementById(ident);
	var dup = 0;
	if (override == 0) {
		val = event.target.id
		target = event.target
		if (event.shiftKey) { dup = 9 }
		if (event.ctrlKey) { dup = 39 }
	}
	var nameVal = val.split('_')[0];
	// removed from equipment
	var groups = ["helm", "armor", "weapon", "offhand"];
	for (let g = 0; g < groups.length; g++) {
		for (let i = 0; i < socketed[groups[g]].items.length; i++) {
			if (val == socketed[groups[g]].items[i].id) {
				for (affix in socketed[groups[g]].items[i]) {
					if (affix != "id" && affix != "name") {
						character[affix] -= socketed[groups[g]].items[i][affix]
						socketed[groups[g]].totals[affix] -= socketed[groups[g]].items[i][affix]
					}
				}
				socketed[groups[g]].items[i] = {id:"",name:""}
				socketed[groups[g]].socketsFilled -= 1
			}
		}
	}
	// removed from inventory
	for (s = 1; s <= inv[0].in.length; s++) {
		if (inv[0].in[s] == val) {
			inv[s].empty = 1;
			inv[0].in[s] = "";
		}
	}
	
	target.remove()
	
	// find/remove duplicates
	if (dup > 0) {
		for (let d = 0; d < inv[0].in.length; d++) {
			if (dup > 0 && nameVal == inv[0].in[d].split('_')[0]) {
				val = inv[0].in[d];
				inv[0].in[d] = "";
				inv[d].empty = 1;
				document.getElementById(val).remove()
				dup--
			}
		}
	}
	
	// update
	calculateSkillAmounts()
	updateStats()
	updateSkills()
	if (selectedSkill[0] != " ­ ­ ­ ­ Skill 1") { checkSkill(selectedSkill[0], 1) }
	if (selectedSkill[1] != " ­ ­ ­ ­ Skill 2") { checkSkill(selectedSkill[1], 2) }
	// updateAllEffects()?
	document.getElementById("tooltip_inventory").style.display = "none"
}

// removeInvalidSockets - Handles indirect removal/validation of socketables
//	group: the item group which is socketed
// ---------------------------------
function removeInvalidSockets(group) {
//	if (socketed[group].socketsFilled > socketed[group].sockets) {
		var invalidSockets = Math.max(0, socketed[group].socketsFilled - socketed[group].sockets)
		if (socketed[group].sockets == 0) { invalidSockets = 6 }
		for (let i = socketed[group].items.length-1; i >= 0; i--) {
			if (socketed[group].items[i].name != "" && invalidSockets > 0) {
				for (affix in socketed[group].items[i]) { if (affix != "id") { character[affix] -= socketed[group].items[i][affix] } }
				document.getElementById(socketed[group].items[i].id).remove();
				socketed[group].socketsFilled -= 1
				socketed[group].items[i] = {id:"",name:""}
				invalidSockets -= 1
			}
		}
//	}
}

// inventoryLeftClick - 
//	group: equipment group name
// ---------------------------------
function inventoryLeftClick(event, group) {
	var mod = 0;
	if (event.shiftKey) { mod = 1 }
	if (event.ctrlKey) { mod = 2 }
	if (mod > 0) {
		changeBase(group, "upgrade")
	} else {
		// TODO: simulate click() on appropriate equipment dropdown menu?
	}
}

// inventoryRightClick - 
//	group: equipment group name
// ---------------------------------
function inventoryRightClick(event, group) {
	var mod = 0;
	if (event.shiftKey) { mod = 1 }
	if (event.ctrlKey) { mod = 2 }
	if (mod > 0) {
		changeBase(group, "downgrade")
	} else {
		equip(group, group)	// right click = unequip
	}
}

// changeBase - Modifies the base for an equipped item (upgrading)
//	group: equipment group to modify
//	change: what kind of change to make ("upgrade" or "downgrade")
// ---------------------------------
function changeBase(group, change) {
	var base_name = equipped[group].base;
	if (typeof(equipped[group].base) == 'undefined' && typeof(equipped[group].special) != 'undefined') { base_name = "Special_0" }
	var base = getBaseId(base_name);
	var halt = 0;
	if ((typeof(equipped[group].rarity) == 'undefined' || equipped[group].rarity == "unique" || equipped[group].rarity == "set") && change == "downgrade" && equipped[group].tier <= equipped[group].original_tier) { halt = 1 }		// prevents unique/set from being downgraded below their baseline
	//if (typeof(equipped[group].rarity) != 'undefined' && equipped[group].rarity != "unique" && equipped[group].rarity != "rare" && equipped[group].rarity != "set") { halt = 1 }	// limit to unique/rare/set
	if (typeof(bases[base][change]) != 'undefined' && halt == 0) {
		base = bases[base][change];
		equipped[group].base = base;
		base = getBaseId(base)
		var multEth = 1;
		var multED = 1;
		var multReq = 1;
		var reqEth = 0;
		if (typeof(equipped[group]["ethereal"]) != 'undefined') { if (equipped[group]["ethereal"] == 1) { multEth = 1.5; reqEth = 10; } }
		if (typeof(equipped[group]["e_def"]) != 'undefined') { multED += (equipped[group]["e_def"]/100) }
		if (typeof(equipped[group]["req"]) != 'undefined') { multReq += (equipped[group]["req"]/100) }
		for (affix in bases[base]) { if (affix != "group" && affix != "type" && affix != "upgrade" && affix != "downgrade" && affix != "subtype" && affix != "only" && affix != "def_low" && affix != "def_high" && affix != "durability" && affix != "range" && affix != "twoHands") {
		/*	if (affix == "base_defense") {
				character[affix] -= equipped[group][affix]
				equipped[group][affix] = Math.ceil(multEth*multED*bases[base][affix])
				character[affix] += equipped[group][affix]
			} else 
		*/	if (affix == "base_damage_min" || affix == "base_damage_max" || affix == "throw_min" || affix == "throw_max" || affix == "base_min_alternate" || affix == "base_max_alternate") {
				character[affix] -= equipped[group][affix]
				equipped[group][affix] = Math.ceil(multEth*bases[base][affix])
				character[affix] += equipped[group][affix]
			} else if (affix == "req_strength" || affix == "req_dexterity") {
				equipped[group][affix] = Math.max(0,Math.ceil(multReq*bases[base][affix] - reqEth))
			} else if (affix == "req_lvl") {
				equipped[group]["tier"] = bases[base]["tier"]
				var req_change = (5 * (equipped[group].tier - equipped[group].original_tier));
				equipped[group][affix] = bases[base][affix] + req_change
			} else {		// any affixes that are undefined should not be checked (base upgrades/downgrades share the same affixes)
				character[affix] -= equipped[group][affix]
				equipped[group][affix] = bases[base][affix]
				character[affix] += bases[base][affix]
			}
		} }
		if (equipped[group].tier == equipped[group].original_tier) {	// used to reset affixes such as req_lvl, req_strength, req_dexterity (since they are often different from the base affixes)
			var name = equipped[group].name;
			equip(group,"none");
			equip(group,name);
			var options = document.getElementById("dropdown_"+group).options;
			for (let i = 0; i < options.length; i++) { if (options[i].innerHTML == equipped[group].name) {  document.getElementById("dropdown_"+group).selectedIndex = i } }
		}
		if (base == "Special_0") { var name = equipped[group].name; equip(group,"none"); equip(group,name); }
		if (base == "Special_1" || base == "Special_2" || base == "Special_3") { document.getElementById(group+"_image").src = "./images/items/weapon/axe/Hand_Axe.png" }
	}
	if (corruptsEquipped[group].name == "+ Sockets") { adjustCorruptionSockets(group) }
	updateSocketTotals()
	equipmentOut()
	equipmentHover(group)
	// update
	calculateSkillAmounts()
	updateStats()
	updateSkills()
	if (selectedSkill[0] != " ­ ­ ­ ­ Skill 1") { checkSkill(selectedSkill[0], 1) }
	if (selectedSkill[1] != " ­ ­ ­ ­ Skill 2") { checkSkill(selectedSkill[1], 2) }
	// updateAllEffects()?
}

// getId - gets the ID for the given name
//	name: the name to be changed
// return: the ID for name (name with spaces replaced with underscores)
// ---------------------------------
function getId(name) {
	return name.split(' ').join('_');
}

// getBaseId - gets the base ID for the given base
//	base_name: the item's base name
// return: the base ID (base with spaces, hyphens, and apostrophes removed)
// ---------------------------------
function getBaseId(base_name) {
	return base_name.split(" ").join("_").split("-").join("_").split("s'").join("s").split("'s").join("s");
}

// checkIronGolem - 
// ---------------------------------
function checkIronGolem() {
	var active = false;
	for (effect in effects) { if (effect.split("-")[0] == "Iron_Golem" && typeof(effects[effect].info.enabled) != 'undefined') { if (effects[effect].info.enabled == 1) { active = true } } }
	if (active != false) { document.getElementById("golem").style.display = "block"; document.getElementById("golem_spacing").style.display = "block"; }
	else { document.getElementById("golem").style.display = "none"; document.getElementById("golem_spacing").style.display = "none" }
}

// checkOffhand - 
// ---------------------------------
function checkOffhand() {
	if (offhandType == "weapon") {
		document.getElementById("offhand_basic").style.display = "inline"
	} else {
		document.getElementById("offhand_basic").style.display = "none"
		document.getElementById("offhand_skill1").style.display = "none"
		document.getElementById("offhand_skill2").style.display = "none"
	}
}

// hoverStatOn - 
//	stat:
// ---------------------------------
function hoverStatOn(stat) {
	document.getElementById(stat).style.color = "gray"
	document.getElementById(stat).innerHTML = character["starting_"+stat]+character[stat+"_added"]
}

// hoverStatOff - 
//	stat:
// ---------------------------------
function hoverStatOff(stat) {
	document.getElementById(stat).style.color = "white"
	updatePrimaryStats()
	checkRequirements()
}

// updateSocketTotals()
// ---------------------------------
function updateSocketTotals() {
	var groups = ["helm", "armor", "weapon", "offhand"];
	for (let g = 0; g < groups.length; g++) {
		socketed[groups[g]].totals = {}
		for (let i = 0; i < socketed[groups[g]].items.length; i++) {
			for (affix in socketed[groups[g]].items[i]) { if (affix != "id" && affix != "name") {
				if (typeof(socketed[groups[g]].totals[affix]) == 'undefined') { socketed[groups[g]].totals[affix] = 0 }
				socketed[groups[g]].totals[affix] += socketed[groups[g]].items[i][affix]
			} }
		}
	}
}

// Notes for Organization Overhaul:
//   TODO...
//   variable names for item classification 
//		slot - equipment slot for item  ("helm","armor","boots","gloves","belt","amulet","ring1","ring2","weapon","offhand")
//		group - similar to slot, but generalized for the item  ("helm","armor","boots","gloves","belt","amulet","ring","weapon","offhand","charm","socketable")
//		subgroup - in between group/type, maybe? might allow "helm","shield", and combo weapons ("throwing weapon","amazon_weapon"...) to be used via the same variable? or would a true/false system (so multiple variables can be checked) be more convenient?
//		type - more specific to the item  ("armor","boots","gloves","belt","amulet","ring","charm" are the same, but "helm","weapon","offhand","socketable" have more variety - "helm","circlet","barbarian helm","druid helm",    "axe","mace","sword","dagger","throwing weapon","javelin","spear","polearm","bow","crossbow","staff","wand","scepter","claw","orb","amazon weapon",    "shield","paladin shield","necromancer shield","quiver",    "jewel","rune","gem","misc")
//		subtype - "club","mace","hammer"?
//   variable names for item affixes
//		item affix variables (from item_affixes.js) can be converted to whatever is needed 1:1 (so variables being worked with may be more human-readable)
//		item affix codes (used in filters) cannot all be converted 1:1 from other variables
//			sometimes multiple codes refer to the same variable
//			sometimes codes refer to calculated values
//		min/max damage variables
//			damage over time
//				poison damage - values used for calculation (from item_affixes.js or elsewhere) are different than tooltip displayed values
//				...how to calculate from poison 'bitrate'?
//				burning damage - should this have its own variables?
//			variable names (e.g. fDamage_min, fDamage_max, fDamage)
//				replace fDamage (percent bonus) with bonus_fDamage
//				...same for other 3 elements, magic, & physical
//		e_def/defense_bonus - distinction needed?
//		e_damage/damage_bonus - distinction needed?
//   data organization for item affixes
//		available affixes
//			when base item is updated (ilvl, group, type, base, rarity, name), available affixes may change (any affix that is already selected should remain selected if possible)
//			...add variables to 'data' to store selected categories/values so they can be easily compared to list of newly available affix categories 
//			...maybe info can be shown when considering things in the opposite direction? for example, show the ilvl range for the currently available affixes?
//   user interface
//		is there a way to indicate if/when an item's filter display would change?  (so the user doesn't need to test so many combinations)
//		...maybe just using non-item differences like CLVL, DIFFICULTY, CHARSTAT15, etc.
//

// PATCH 19 TODO:
//	* what happened to the damage conversion with Molten Strike?
//	* why is Meteor damage not matching expected values with Fire Mastery?
