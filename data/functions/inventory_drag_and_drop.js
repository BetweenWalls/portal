
/* Functions:
	allowDrop
	drag
	drop
	trash
	handleSocket
	socket
	allowSocket
	dragSocketable
	trashSocketable
*/

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

// handleSocket - calls socket (other functionality is unused currently)
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
//	ident: id for item's UI element
//	override: currently unused (0), but could be changed (1) if a socketable item needs to be removed without having access to the event parameter
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
