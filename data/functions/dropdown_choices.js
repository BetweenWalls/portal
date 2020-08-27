
/* Functions:
	corrupt
	equipMerc
	equip
	checkWield
	reloadOffhandCorruptions
	adjustCorruptionSockets
	addCharm
	addSocketable
*/
	
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

// equipMerc - Equips or unequips a mercenary item
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

// equip - Equips an item by adding its stats to the character, or unequips it if it's already equipped
//	group: equipment group
//	val: name of item
// ---------------------------------
function equip(group, val) {
	// TODO: consider renaming... switchItem()?  Also, split into multiple smaller functions
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
	
	return val;	// currently UNUSED
}