
/* Functions:
	getItemImage
	itemSelect
	socketableSelect
	itemHover
	itemOut
	equipmentHover
	equipmentOut
	getAffixLine
	inventoryLeftClick
	inventoryRightClick
	changeBase
*/

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

// socketableSelect - Duplicates the selected socketable item (gem, rune, jewel)
// ---------------------------------
function socketableSelect(ev) {
	var dup = 0;
	if (ev.shiftKey) { dup = 1 }
	if (ev.ctrlKey) { dup = 10 }
	if (dup > 0) { for (let d = 0; d < dup; d++) { addSocketable(lastSocketable) } }
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

// itemOut - hides item tooltip for Charm Inventory
// ---------------------------------
function itemOut() {
	document.getElementById("tooltip_inventory").style.display = "none"
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

// inventoryLeftClick - Handles equipment inventory left clicks
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

// inventoryRightClick - Handles equipment inventory right clicks
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
