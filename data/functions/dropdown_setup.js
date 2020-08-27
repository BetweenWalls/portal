
/* Functions:
	loadEquipment
	loadItems
	loadMisc
	loadSocketables
	loadCorruptions
	loadGolem
	loadMerc
	setMercenary
	updateMercenary
	getMercenaryAuraLevel
*/

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

// loadGolem - Loads options for the Iron Golem minion
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
	if (hlvl >= 9 && hlvl <= 42) { result = (3+Math.floor((hlvl-9)*7/32)) }
	else if (hlvl >= 43 && hlvl <= 74) { result = (11+((hlvl-43)*7/32)) }
	else if (hlvl >= 75) { result = 18 }
	result = Math.min(18,(result + ~~mercenary.all_skills + ~~Math.ceil(mercenary.all_skills_per_level*hlvl)))
	return result;
}
