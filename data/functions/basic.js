
/* Functions:
	startup
	reset
	init
	clearIconSources
	setIconSources
	updateSkillIcons
	changeLevel
	setIronGolem
	resetSkills
	resetEquipment
	resetCharms
	resetCorruptions
	toggleQuests
	toggleRunning
	changeVersion
	changeDifficulty
	toggleCoupling
	toggleAutocast
	toggleParameters
	changeMonster
	loadMonsters
	round
	getId
	getBaseId
	loadParams
*/

// startup - Resets everything and starts a new character
//	choice: name of new character class
// ---------------------------------
function startup(choice) {
	// TODO: prevent calculations from being done before info is loaded (e.g. when mouse is prepositioned over a skill while page loads)
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

// setIronGolem - sets Iron Golem info based on the item used to create it
//	val: the item's name
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
	updateURL()
	// Notes for adding per-quest options:
	// document.getElementById("quests").indeterminate = true;
	// Den of Evil, Radament's Lair, The Golden Bird, Lam Esen's Tome, The Fallen Angel, Prison of Ice
}

// toggleRunning - Toggles whether the character is running or walking/standing
//	running: name identifier for 'Running' checkbox element
// ---------------------------------
function toggleRunning(running) {
	if (running.checked == true) { character.running = 1 } else { character.running = 0 }
	updateStats()
	updateURL()
}

// changeVersion - Changes the version of the game
//	v: game version (1-3)
//  char_class: chosen character class or blank ("")
// ---------------------------------
function changeVersion(v, char_class) {
	if (game_version != v && v != 1) {
		game_version = v
		if (document.getElementById("version"+v).disabled != true) { document.getElementById("version"+v).checked = true }
		if (v == 1) {
			// TODO: implement vanilla info
		} else if (v == 2) {
			skills_all = {amazon:skills_amazon, assassin:skills_assassin, barbarian:skills_barbarian, druid:skills_druid, necromancer:skills_necromancer, paladin:skills_paladin, sorceress:skills_sorceress}
			character_all = {amazon:character_amazon, assassin:character_assassin, barbarian:character_barbarian, druid:character_druid, necromancer:character_necromancer, paladin:character_paladin, sorceress:character_sorceress, any:character_any}
			document.getElementById("stats").style.display = "block"
			document.getElementById("skill_details_active").style.display = "block"
			document.getElementById("gui_equipment").style.display = "block"
			document.getElementById("equipment_corruptions").style.display = "block"
			document.getElementById("equipment_a").style.display = "block"
			document.getElementById("equipment_b").style.display = "block"
			document.getElementById("side").style.display = "block"
			document.getElementById("nav_autocast").style.display = "block"
			document.getElementById("nav_running").style.display = "block"
			document.getElementById("debug_space").style.display = "none"
			document.getElementById("skill_details_inactive").style.display = "none"
		} else if (v == 3) {
			skills_all = {amazon:skills_pd2_amazon, assassin:skills_pd2_assassin, barbarian:skills_pd2_barbarian, druid:skills_pd2_druid, necromancer:skills_pd2_necromancer, paladin:skills_pd2_paladin, sorceress:skills_pd2_sorceress}
			character_all = {amazon:character_pd2_amazon, assassin:character_pd2_assassin, barbarian:character_pd2_barbarian, druid:character_pd2_druid, necromancer:character_pd2_necromancer, paladin:character_pd2_paladin, sorceress:character_pd2_sorceress, any:character_pd2_any}
			document.getElementById("stats").style.display = "none"
			document.getElementById("skill_details_active").style.display = "none"
			document.getElementById("gui_equipment").style.display = "none"
			document.getElementById("equipment_corruptions").style.display = "none"
			document.getElementById("equipment_a").style.display = "none"
			document.getElementById("equipment_b").style.display = "none"
			document.getElementById("side").style.display = "none"
			document.getElementById("nav_autocast").style.display = "none"
			document.getElementById("nav_running").style.display = "none"
			document.getElementById("debug_space").style.display = "block"
			document.getElementById("skill_details_inactive").style.display = "block"
		}
		
		// character class handling
		char_class = char_class.toLowerCase()
		var rand_class = character.class_name;
		var classes = ["amazon","assassin","barbarian","druid","necromancer","paladin","sorceress"];
		if (typeof(rand_class) == 'undefined') {	// select random class if page hasn't loaded yet
			var random = Math.floor(Math.random() * 7);
			var rand_class = classes[random];
		}
		if (classes.includes(char_class) == false) { char_class = rand_class }
		
		reset(char_class)
		
		// update URL
		params.set('v', v)
		if (settings.parameters == 1) {
			window.history.replaceState({}, '', `${location.pathname}?${params}`)
		} else {
			if (v == 3) { window.history.replaceState({}, '', `${location.pathname}?v=PD2`) }
			else { window.history.replaceState({}, '', `${location.pathname}`) }
		}
	}
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
	updateStats()
	if (selectedSkill[0] != " ­ ­ ­ ­ Skill 1") { checkSkill(selectedSkill[0], 1) }
	if (selectedSkill[1] != " ­ ­ ­ ­ Skill 2") { checkSkill(selectedSkill[1], 2) }
	updateURL()
}

// toggleCoupling - Changes whether adding/removing skill points can affect character level
//	coupling: name identifier for 'Skill Level Coupling' checkbox element
// ---------------------------------
function toggleCoupling(coupling) {
	if (coupling.checked) { settings.coupling = 1 } else { settings.coupling = 0 }
	updateURL()
}

// toggleAutocast - Changes whether buffs and auras are automatically enabled when added
//	autocast: name identifier for 'New Effects Begin Enabled' checkbox element
// ---------------------------------
function toggleAutocast(autocast) {
	if (autocast.checked) { settings.autocast = 1 } else { settings.autocast = 0 }
	updateURL()
}

// toggleParameters - Changes whether parameters are shown in the address bar
//	parameters: name identifier for 'URL Parameters' checkbox element
// ---------------------------------
function toggleParameters(parameters) {
	if (parameters.checked) {
		settings.parameters = 1
		params.set('url', ~~settings.parameters)
		window.history.replaceState({}, '', `${location.pathname}?${params}`)
	} else {
		settings.parameters = 0
		if (game_version == 3) { window.history.replaceState({}, '', `${location.pathname}?v=PD2`) }
		else { window.history.replaceState({}, '', `${location.pathname}`) }
	}
}

// changeMonster - Changes the target monster
//	mon_id: monster's id
// ---------------------------------
function changeMonster(mon_id) {
	monsterID = ~~mon_id.split("on")[1]
	document.getElementById(mon_id).checked = true
	updatePrimaryStats()
}

// loadMonsters - UNUSED
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

// loadParams - load character details from URL parameters
// ---------------------------------
function loadParams() {
	// TODO: Implement more
	if (params.has('level') == true) {		// if level is a parameter, all parameters are checked
		var spent_skillpoints = 0;
		var param_level = ~~params.get('level');
		var param_diff = ~~params.get('difficulty');
		var param_quests = ~~params.get('quests');
		var param_run = ~~params.get('running');
		var param_str = ~~params.get('strength');
		var param_dex = ~~params.get('dexterity');
		var param_vit = ~~params.get('vitality');
		var param_ene = ~~params.get('energy');
		var param_url = ~~params.get('url');
		var param_coupling = ~~params.get('coupling');
		var param_autocast = ~~params.get('autocast');
		var param_skills = params.get('skills');
		var param_charms = params.getAll('charm');
		var param_helm = params.get('helm');
		character.level = param_level
		character.strength_added = param_str
		character.dexterity_added = param_dex
		character.vitality_added = param_vit
		character.energy_added = param_ene
		if (param_diff == 1 || param_diff == 2) {
			document.getElementById("difficulty"+param_diff).checked = true
			changeDifficulty(param_diff)
		}
		if (param_run == 1) {
			document.getElementById("running").checked = true
			toggleRunning(param_run)
			character.running = 1
		}
		if (param_quests == 1) {
			document.getElementById("quests").checked = true
			character.quests_completed = param_quests
			character.life += 60
			character.fRes += 30
			character.cRes += 30
			character.lRes += 30
			character.pRes += 30
		}
		if (param_url == 1) {
			document.getElementById("parameters").checked = true
			toggleParameters(param_url)
			// are these needed?
			settings.parameters = 1
			params.set('url', ~~settings.parameters)
			window.history.replaceState({}, '', `${location.pathname}?${params}`)
		}
	//	for (let s = 0; s < skills.length; s++) {
	//		skills[s].level = ~~params.get('s'+s)
	//		spent_skillpoints += skills[s].level
	//	}
		for (let s = 0; s < skills.length; s++) {
			skills[s].level = ~~(param_skills[s*2]+param_skills[s*2+1])
			spent_skillpoints += skills[s].level
		}
		character.skillpoints = character.level-1 + Math.max(0,character.quests_completed*12) - spent_skillpoints
		character.statpoints = (character.level-1)*5 + Math.max(0,character.quests_completed*15) - character.strength_added - character.dexterity_added - character.vitality_added - character.energy_added
		character.strength = character.starting_strength + character.strength_added
		character.dexterity = character.starting_dexterity + character.dexterity_added
		character.vitality = character.starting_vitality + character.vitality_added
		character.energy = character.starting_energy + character.energy_added
		character.life += (character.levelup_life*(character.level-1))
		character.mana += (character.levelup_mana*(character.level-1))
		character.stamina += (character.levelup_stamina*(character.level-1))
		if (game_version == 2) {
			/*
			for (group in corruptsEquipped) {	// equipment
				var options = document.getElementById("dropdown_"+group).options;
				for (let i = 0; i < options.length; i++) { if (options[i].innerHTML == fileInfo.equipped[group].name) {  document.getElementById("dropdown_"+group).selectedIndex = i } }
				equip(group,fileInfo.equipped[group].name)
			}
			for (group in corruptsEquipped) {	// corruptions
				var options = document.getElementById("corruptions_"+group).options;
				for (let i = 0; i < options.length; i++) { if (options[i].innerHTML == fileInfo.corruptsEquipped[group].name) {  document.getElementById("corruptions_"+group).selectedIndex = i } }
				corrupt(group,fileInfo.corruptsEquipped[group].name)
			}
			for (group in corruptsEquipped) {	// upgrades & downgrades
				var baseDiff = ~~fileInfo.equipped[group].tier - ~~equipped[group].tier;
				if (baseDiff < 0) { changeBase(group, "downgrade"); equipmentOut() }
				if (baseDiff > 0) { changeBase(group, "upgrade"); equipmentOut() }
			}
			*/
			// equipped ...	for each: name, tier (if not equal to original_tier)
			// corrupts	...	for each: name
			// socketed	...	names
			// effects	...	name, enabled, snapshot
			// selectedSkill
			// mercenary	... name
			// mercEquipped ... for each: name
			// settings	...	parameters, coupling, autocast
			// iron golem	... item name
		}
		for (let i = 0; i < param_charms.length; i++) { addCharm(param_charms[i]) }
		if (param_coupling == 0) {
			document.getElementById("coupling").checked = false
			//toggleCoupling(param_coupling)	// TODO: fix toggleCoupling parameter to take a boolean rather than the UI element
			settings.coupling = param_coupling
		}
		if (param_autocast == 0) {
			document.getElementById("autocast").checked = false
			//toggleAutocast(param_autocast)	// TODO: fix toggleAutocast parameter to take a boolean rather than the UI element
			settings.autocast = param_autocast
		}
	}
	updateSkills()
	updateAllEffects()
	updateURL()
}
