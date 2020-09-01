
/* Functions:
	addEffect
	initializeEffect
	setEffectData
	rightClickEffect
	leftClickEffect
	removeEffect
	toggleEffect
	disableEffect
	enableEffect
	updateAllEffects
	updateEffect
	adjustStackedAuras
	hoverEffectOn
	hoverEffectOff
	resetEffects
	getAuraData
	getCSkillData
	getCTCSkillData
	getMiscData
*/

// addEffect - Adds an effect with the given info (if it doesn't already exist)
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
	updateAllEffects()
}

// initializeEffect - Initializes an effect UI/data element
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

// setEffectData - Sets the effect's data (using current stat/skill values)
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

// rightClickEffect - Handles effect right clicks
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

// leftClickEffect - Handles effect left clicks
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

// removeEffect - Removes an effect
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

// toggleEffect - Toggles an effect on or off
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

// disableEffect - Disables an effect
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

// enableEffect - Enables an effect
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

// updateAllEffects - Updates all effects
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

// updateEffect - Updates a single effect
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

// adjustStackedAuras - Combines stackable auras if multiples exist
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

// hoverEffectOn - Shows the effect tooltip (on mouse-over)
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

// hoverEffectOff - Hides the effect tooltip
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
	else if (aura == "Concentration") { result.ar = auras[a].data.values[0][lvl]; result.damage_bonus = auras[a].data.values[1][lvl]; result.hammer_bonus = auras[a].data.values[2][lvl]; result.radius = 16; }
	else if (aura == "Holy Freeze") { result.cDamage_min = auras[a].data.values[0][lvl]; result.cDamage_max = auras[a].data.values[1][lvl]; result.slow_enemies = auras[a].data.values[4][lvl]; result.radius = 13.3; }
	else if (aura == "Holy Shock") { result.lDamage_min = auras[a].data.values[0][lvl]; result.lDamage_max = auras[a].data.values[1][lvl]; result.radius = 18.6; }
	else if (aura == "Sanctuary") { result.damage_vs_undead = auras[a].data.values[0][lvl]; result.radius = 12.6; }
	else if (aura == "Fanaticism") { result.radius = 12; if (source == "mercenary" || source == "golem") { result.damage_bonus = auras[a].data.values[0][lvl] } else { result.damage_bonus = auras[a].data.values[1][lvl]; result.ias_skill = auras[a].data.values[2][lvl]; result.ar_bonus = auras[a].data.values[3][lvl]; }}
	else if (aura == "Conviction") { result.enemy_defense = auras[a].data.values[0][lvl]; result.enemy_fRes = auras[a].data.values[1][lvl]; result.enemy_cRes = auras[a].data.values[1][lvl]; result.enemy_lRes = auras[a].data.values[1][lvl]; result.enemy_pRes = auras[a].data.values[1][lvl]; result.radius = 21.3; }
	// Others
	else if (aura == "Thorns") { result.thorns_reflect = auras[a].values[0][lvl]; result.radius = 16; }	// TOCHECK: radius is a guess - get confirmation
	else if (aura == "Inner Sight") { result.enemy_defense_flat = auras[a].values[0][lvl]; result.radius = auras[a].values[1][lvl]; }
	else if (aura == "Righteous Fire") { result.flamme = auras[a].values[0][lvl]; result.radius = 5; }		// No buffs. Deals 45% of max life as fire damage per second in a small area.
	else if (aura == "Lifted Spirit") { result.damage_bonus = auras[a].values[0][lvl]; result.fDamage = auras[a].values[0][lvl]; result.cDamage = auras[a].values[0][lvl]; result.lDamage = auras[a].values[0][lvl]; result.pDamage = auras[a].values[0][lvl]; result.radius = 16; }	// TOCHECK: radius is a guess - get confirmation
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
	else if (name == "Phase Run") { result.fhr = 30; result.velocity = 30; result.duration = skill.data.values[0][lvl]; result.reset_on_kill = skill.data.values[1][lvl]; }
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

// getMiscData - gets a list of stats corresponding to the miscellaneous effect (shrine/potion)
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
