
/* Functions:
	update
	getWeaponDamage
	getNonPhysWeaponDamage
	updateStats
	updatePrimaryStats
	updateSecondaryStats
	updateTertiaryStats
	updateCTC
	updateChargeSkills
	updateOther
	removeInvalidSockets
	calculateSkillAmounts
	checkRequirements
	updateSkills
	checkSkill
	checkIronGolem
	checkOffhand
	updateSocketTotals
	updateURL
*/

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
	if (loaded == 1) { updateURL() }
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
	if (type == "sword" || type == "axe" || type == "dagger") { weapon_skillup = c.edged_damage; c.ar_skillup2 = c.edged_ar; c.cstrike_skillup = c.edged_cstrike; }
	else if (type == "polearm" || type == "spear") { weapon_skillup = c.pole_damage; c.ar_skillup2 = c.pole_ar; c.cstrike_skillup = c.pole_cstrike; }
	else if (type == "mace" || type == "scepter" || type == "staff" || type == "hammer" || type == "club" || type == "wand") { weapon_skillup = c.blunt_damage; c.ar_skillup2 = c.blunt_ar; c.cstrike_skillup = c.blunt_cstrike; }
	else if (type == "thrown" || type == "javelin") { weapon_skillup = c.thrown_damage; c.ar_skillup2 = c.thrown_ar; c.pierce_skillup = c.thrown_pierce; }	// check if javelins can benefit from Pole Weapon Mastery
	else if (type == "claw") { weapon_skillup = c.claw_damage; c.ar_skillup2 = c.claw_ar; c.cstrike_skillup = c.claw_cstrike; }
	else { weapon_skillup = 0; c.ar_skillup2 = 0; c.cstrike_skillup = 0; c.pierce_skillup = 0; }
	var e_damage_other = 0;
	var phys_min_other = 0;
	var phys_max_other = 0;
	if (offhandType == "weapon") {
		e_damage_other = (~~(equipped[other].e_damage) + ~~(socketed[other].totals.e_damage) + ~~(corruptsEquipped[other].e_damage))
		phys_min_other = ~~equipped[other].damage_min + c.level*~~equipped[other].min_damage_per_level
		phys_max_other = ~~equipped[other].damage_max + c.level*~~equipped[other].max_damage_per_level
	}
	var e_damage = c.e_damage - e_damage_other;
	var base_min = equipped[group].base_damage_min;
	var base_max = equipped[group].base_damage_max;
	if (thrown == 1) { base_min = ~~(equipped[group].throw_min); base_max = ~~(equipped[group].throw_max); }
	var phys_min = (base_min * (1+e_damage/100) + c.damage_min + c.level*c.min_damage_per_level - phys_min_other);
	var phys_max = (base_max * (1+(e_damage+(c.level*c.e_max_damage_per_level))/100) + c.damage_max + c.level*c.max_damage_per_level - phys_max_other);
	var phys_mult = (1+statBonus+(c.damage_bonus+weapon_skillup)/100);
	var values = [phys_min, phys_max, phys_mult];
	
	return values
}

// getNonPhysWeaponDamage - Calculates non-physical damage for an equipped weapon
//	group: weapon's group ('weapon' or 'offhand')
// return: indexed array with elemental/magic min/max damage values
// ---------------------------------
function getNonPhysWeaponDamage(group) {
	var c = character;
	var other = "offhand";
	if (group == "offhand") { other = "weapon" }
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
		f_min = (c.fDamage_min-~~(equipped[other].fDamage_min))*(1+c.fDamage/100);
		f_max = ((c.fDamage_max-~~(equipped[other].fDamage_max))+(c.level*c.fDamage_max_per_level))*(1+c.fDamage/100);
		c_min = ((c.cDamage_min-~~(equipped[other].cDamage_min))+(c.cDamage_per_ice*c.charge_ice)+cDamage_sockets_filled)*(1+c.cDamage/100);
		c_max = ((c.cDamage_max-~~(equipped[other].cDamage_max))+(c.cDamage_per_ice*c.charge_ice)+(c.level*c.cDamage_max_per_level)+cDamage_sockets_filled)*(1+c.cDamage/100);
		l_min = (c.lDamage_min-~~(equipped[other].lDamage_min))*(1+c.lDamage/100);
		l_max = ((c.lDamage_max-~~(equipped[other].lDamage_max))+(Math.floor(energyTotal/2)*c.lDamage_max_per_2_energy))*(1+c.lDamage/100);
		p_min = (c.pDamage_all+c.pDamage_min-~~(equipped[other].pDamage_min))*(1+c.pDamage/100);
		p_max = (c.pDamage_all+c.pDamage_max-~~(equipped[other].pDamage_max))*(1+c.pDamage/100);
		m_min = c.mDamage_min - ~~(equipped[other].mDamage_min);
		m_max = c.mDamage_max - ~~(equipped[other].mDamage_max);
	}
	var values = {fMin:f_min,fMax:f_max,cMin:c_min,cMax:c_max,lMin:l_min,lMax:l_max,pMin:p_min,pMax:p_max,mMin:m_min,mMax:m_max};
	return values
}

// updateStats - Updates all stats
// ---------------------------------
function updateStats() { if (loaded == 1) { updatePrimaryStats(); updateOther(); updateSecondaryStats(); updateTertiaryStats(); } }

// updatePrimaryStats - Updates stats shown by the default (original D2) stat page
// ---------------------------------
function updatePrimaryStats() {
	var c = character;
	var strTotal = (c.strength + c.all_attributes + c.level*c.strength_per_level);
	var dexTotal = (c.dexterity + c.all_attributes + c.level*c.dexterity_per_level);
	var vitTotal = (c.vitality + c.all_attributes + c.level*c.vitality_per_level);
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
	var ar = ((dexTotal - 7) * 5 + c.ar + c.level*c.ar_per_level + c.ar_const + (c.ar_per_socketed*socketed.offhand.socketsFilled)) * (1+(c.ar_skillup + c.ar_skillup2 + c.ar_bonus + c.level*c.ar_bonus_per_level)/100) * (1+c.ar_shrine_bonus/100);
	
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
	var block = (Math.max(0,block_shield) + c.ibc)*(dexTotal-15)/(c.level*2)
	if (c.block_skillup > 0) { block = Math.min((c.block_skillup*(dexTotal-15)/(c.level*2)),c.block_skillup) }
	if (c.running > 0) { block = Math.min(25,block/3) }
	if (c.block > 0 || c.block_skillup > 0) {
		document.getElementById("block_label").style.visibility = "visible"
		document.getElementById("block").innerHTML = Math.floor(Math.min(75,block))+"%"
	} else {
		document.getElementById("block_label").style.visibility = "hidden"
		document.getElementById("block").innerHTML = ""
	}
	
	//var enemy_lvl = ~~MonStats[monsterID][4+c.difficulty];
	var enemy_lvl = Math.min(~~c.level,89);	// temp, sets 'area level' at the character's level (or as close as possible if the area level isn't available in the selected difficulty)
	if (c.difficulty == 1) { enemy_lvl = Math.min(43,enemy_lvl) }
	else if (c.difficulty == 2) { enemy_lvl = Math.max(36,Math.min(66,enemy_lvl)) }
	else if (c.difficulty == 3) { enemy_lvl = Math.max(67,enemy_lvl) }
	var enemy_def = (~~MonStats[monsterID][8] * ~~MonLevel[enemy_lvl][c.difficulty])/100;
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
	document.getElementById("stamina").innerHTML = Math.floor((c.stamina + c.level*c.stamina_per_level + stamina_addon) * (1+c.stamina_skillup/100) * (1+c.max_stamina/100))
	var lifeTotal = Math.floor((c.life + c.level*c.life_per_level + life_addon) * (1 + c.max_life/100));
	document.getElementById("life").innerHTML = lifeTotal
	document.getElementById("mana").innerHTML = Math.floor((c.mana + c.level*c.mana_per_level + mana_addon) * (1 + c.max_mana/100))
	document.getElementById("level").innerHTML = c.level
	document.getElementById("class_name").innerHTML = c.class_name
	document.getElementById("remainingstats").innerHTML = c.statpoints
	document.getElementById("remainingskills").innerHTML = c.skillpoints
	document.getElementById("fres").innerHTML = (c.fRes + c.all_res - c.fRes_penalty + c.resistance_skillup) + " / " + Math.min(RES_CAP,(c.fRes_max_base + c.fRes_max + c.fRes_skillup)) + "%"
	document.getElementById("cres").innerHTML = (c.cRes + c.all_res - c.cRes_penalty + c.resistance_skillup) + " / " + Math.min(RES_CAP,(c.cRes_max_base + c.cRes_max + c.cRes_skillup)) + "%"
	document.getElementById("lres").innerHTML = (c.lRes + c.all_res - c.lRes_penalty + c.resistance_skillup) + " / " + Math.min(RES_CAP,(c.lRes_max_base + c.lRes_max + c.lRes_skillup)) + "%"
	document.getElementById("pres").innerHTML = (c.pRes + c.all_res - c.pRes_penalty + c.resistance_skillup) + " / " + Math.min(RES_CAP,(c.pRes_max_base + c.pRes_max + c.pRes_skillup)) + "%"
	var magicRes = c.mRes;
	if (c.mRes > 0 || c.mDamage_reduced > 0) { magicRes += "%" }
	if (c.mDamage_reduced > 0) { magicRes += (" +"+c.mDamage_reduced) }
	document.getElementById("mres").innerHTML = magicRes
	
	var ias = c.ias + Math.floor(dexTotal/8)*c.ias_per_8_dexterity;
	if (offhandType == "weapon" && typeof(equipped.offhand.ias) != 'undefined') { ias -= equipped.offhand.ias }
	var ias_total = ias + c.ias_skill;
	document.getElementById("ias").innerHTML = ias; if (ias > 0) { document.getElementById("ias").innerHTML += "%" }
	if (equipped.weapon.type != "" && equipped.weapon.special != 1) {
		var weaponType = equipped.weapon.type;
		var eIAS = Math.floor(120*ias/(120+ias));
		var weaponFrames = 0;
		var weaponSpeedModifier = c.baseSpeed - ~~equipped.offhand.baseSpeed;
		var anim_speed = 256;
		if (weaponType != "") {
			// TODO: Add fpa/aps to skills (many skills attack multiple times at different speeds, or interact with IAS differently (e.g. +30 WSM for throwing skills))
			if (weaponType == "club" || weaponType == "hammer") { weaponType = "mace" }
			weaponFrames = c.weapon_frames[weaponType];
			if (typeof(effects["Werewolf"]) != 'undefined') { if (effects["Werewolf"].info.enabled == 1) { weaponFrames = character_all.druid.wereform_frames[weaponType]; anim_speed = 256; } }
			if (typeof(effects["Werebear"]) != 'undefined') { if (effects["Werebear"].info.enabled == 1) { weaponFrames = character_all.druid.wereform_frames[weaponType]; anim_speed = 224; } }
			if (weaponType == "sword" || weaponType == "axe" || weaponType == "mace") { if (equipped.weapon.twoHanded == 1) { weaponFrames = weaponFrames[1]; } else { weaponFrames = weaponFrames[0]; } }
			if (weaponType == "thrown") { if (equipped.weapon.subtype == "dagger") { weaponFrames = weaponFrames[1]; } else { weaponFrames = weaponFrames[0]; } }
			if (weaponType == "claw") { anim_speed = 208 }	// can't interact with werewolf/werebear frames due to itemization
		}
		weaponFrames += 1
		var combined_ias = Math.min(175,Math.max(15,(100 + c.ias_skill + eIAS - weaponSpeedModifier)));
		var frames_per_attack = Math.ceil((weaponFrames*256)/Math.floor(anim_speed * combined_ias / 100)) - 1;
		if (weaponType == "claw") {
			var frames_per_attack_alternate = Math.ceil(((weaponFrames+1)*256)/Math.floor(anim_speed * combined_ias / 100)) - 1;
			frames_per_attack = (frames_per_attack + frames_per_attack_alternate) / 2
		}
		/*
		// TODO: implement wereform IAS frame info
		if (typeof(effects["Werewolf"]) != 'undefined' || typeof(effects["Werebear"]) != 'undefined') {	if (effects["Werewolf"].info.enabled == 1 || effects["Werebear"].info.enabled == 1) {
			var wereFrames = 0;
			var frames_neutral = 0;
			var frames_char = frames_per_attack;
			if (typeof(effects["Werewolf"]) != 'undefined') { if (effects["Werewolf"].info.enabled == 1) { wereFrames = 12; frames_neutral = 9; } }
			if (typeof(effects["Werebear"]) != 'undefined') { if (effects["Werebear"].info.enabled == 1) { wereFrames = 13; frames_neutral = 10; } }
			if (weaponType == "sword") { if (equipped.weapon.twoHanded == 1) { frames_char = wereFrames } }
			anim_speed = Math.floor(256*frames_neutral/Math.floor(256*frames_char/Math.floor((100+~~equipped.weapon.ias - weaponSpeedModifier)*256/100)))
			frames_per_attack = Math.ceil((wereFrames*256)/Math.floor(anim_speed * (100 + c.ias_skill + eIAS - weaponSpeedModifier) / 100)) - 1;
		} }
		*/
		// TODO: implement basic IAS breakpoints for dual-wielding
		if (offhandType != "weapon") {
			document.getElementById("ias").innerHTML += " ("+frames_per_attack+" fpa)"
		}
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
		fcr_f = character_all.druid.fcr_frames_werebear
		for (let i = 1; i < character_all.druid.fcr_bp_werebear.length; i++) { if (fcrTotal >= character_all.druid.fcr_bp_werebear[i]) { fcr_f -= 1 } }
		fhr_f = character_all.druid.fhr_frames_werebear
		for (let i = 1; i < character_all.druid.fhr_bp_werebear.length; i++) { if (c.fhr >= character_all.druid.fhr_bp_werebear[i]) { fhr_f -= 1 } }
		fbr_f = character_all.druid.fbr_frames_werebear
		for (let i = 1; i < character_all.druid.fbr_bp_werebear.length; i++) { if (c.fbr >= character_all.druid.fbr_bp_werebear[i]) { fbr_f -= 1 } }
	} } }
	if (effects["Werewolf"] != null) { if (typeof(effects["Werewolf"].info.enabled) != 'undefined') { if (effects["Werewolf"].info.enabled == 1) {
		fcr_f = character_all.druid.fcr_frames_werewolf
		for (let i = 1; i < character_all.druid.fcr_bp_werewolf.length; i++) { if (fcrTotal >= character_all.druid.fcr_bp_werewolf[i]) { fcr_f -= 1 } }
		fhr_f = character_all.druid.fhr_frames_werewolf
		for (let i = 1; i < character_all.druid.fhr_bp_werewolf.length; i++) { if (c.fhr >= character_all.druid.fhr_bp_werewolf[i]) { fhr_f -= 1 } }
		fbr_f = character_all.druid.fbr_frames_werewolf
		for (let i = 1; i < character_all.druid.fbr_bp_werewolf.length; i++) { if (c.fbr >= character_all.druid.fbr_bp_werewolf[i]) { fbr_f -= 1 } }
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
	document.getElementById("mana_regen").innerHTML = Math.round(c.mana_regen,1)+"%"	// TODO: mana_regen should multiply base regen (1.66%) instead of being additive? Or is the 1.66 value meant to be 166%?
	//var manaTotal = Math.floor((c.mana + c.level*c.mana_per_level + mana_addon) * (1 + c.max_mana/100));
	//var manaRegeneratedPerSecond = 25 * Math.floor(Math.floor(256*manaTotal/(25*120)) * ((100+c.mana_regen)/100)) / 256;
	
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
	var pLength = 0; if (c.difficulty == 2) { pLength = 40 }; if (c.difficulty == 3) { pLength = 100 };		// TODO: implement as character stat similar to resistance penalties?
	var cLength = c.curse_length_reduced;	// TODO: implement curse_length_reduced as multiplicative rather than additive?
	var cL_Cleansing = 0;
	var cL_Fade = 0;
	for (e in effects) {
		if (typeof(effects[e].info.enabled) != 'undefined') { if (effects[e].info.enabled == 1) {
			if (e.split("-")[0] == "Cleansing") { cL_Cleansing = effects[e].curse_length_reduced }
			if (e.split("-")[0] == "Fade") { cL_Fade = effects[e].curse_length_reduced }
		} }
	}
	if (cL_Cleansing > 0 && cL_Fade > 0) { cLength = 100 - Math.floor(100-cL_Cleansing - (100-cL_Cleansing)*(cL_Fade/100)) }
	document.getElementById("poison_reduction").innerHTML = Math.min(75,c.poison_length_reduced-pLength); if (c.poison_length_reduced-pLength != 0) { document.getElementById("poison_reduction").innerHTML += "%" };
	document.getElementById("curse_reduction").innerHTML = cLength; if (cLength > 0) { document.getElementById("curse_reduction").innerHTML += "%" };
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
	if (c.fade > 0) { statlines += "Character is Faded<br>" }
	if (c.all_skills_ember > 0) { statlines += "+"+c.all_skills_ember+" to All Skills when 5 Ember Charges are active<br>" }
	if (c.bonus_sanctuary_rate > 0) { statlines += "+"+c.bonus_sanctuary_rate+"% Increased Sanctuary Area Damage Rate<br>" }
	if (c.summon_damage > 0) { statlines += "Summons deal +"+c.summon_damage+"% Increased Damage<br>" }
	if (c.summon_defense > 0) { statlines += "Summons have +"+c.summon_defense+"% Enhanced Defense<br>" }
	if (c.bonus_corpse_explosion > 0) { statlines += "Corpse Explosion deals +"+c.bonus_corpse_explosion+"% of Maximum Corpse life<br>" }
	if (c.phys_Lightning_Surge > 0) { statlines += "Lightning Surge Deals "+c.phys_Lightning_Surge+"% Extra Damage As Physical<br>" }
	if (c.extraValkyrie > 0) { statlines += "Can Summon One Additional Valkyrie<br>" }
	if (c.extraGrizzly > 0) { statlines += "Can Summon One Additional Grizzly Bear<br>" }
	if (c.extraFireGolem > 0) { statlines += "Can Summon One Additional Fire Golem<br>" }
	if (c.extraHydra > 0) { statlines += "Can Summon One Additional Hydra<br>" }
	if (c.radius_FreezingArrow > 0) { statlines += "+"+c.radius_FreezingArrow+"% to Freezing Arrow Radius<br>" }
	if (c.explosive_attack > 0) { statlines += "Fires Explosive Arrows or Bolts<br>" }
	if (c.magic_attack > 0) { statlines += "Fires Magic Arrows<br>" }
	if (c.reset_cooldown_on_kill > 0) { statlines += c.reset_cooldown_on_kill+"% Chance to Reset Skill Cooldown on Kill<br>" }
	if (c.cdr_on_striking > 0) { statlines += "Gain "+c.cdr_on_striking+"% Reduced Skill Cooldown For 4 Seconds On Striking<br>" }
	if (c.reanimate > 0) { statlines += c.reanimate+"% Reanimate As: Returned<br>" }
	if (c.half_Battle_Orders > 0 && c.class_name != "Barbarian") { statlines += "Battle Order's life and mana bonuses are halved<br>" }
	if (c.extra_Bone_Spears > 0) { statlines += "Bone Spear fires "+c.extra_Bone_Spears+" Additional Projectiles<br>" }
	if (c.extra_conversion_Magic_Arrow > 0) { statlines += "+"+c.extra_conversion_Magic_Arrow+"% Magic Arrow Damage Converted to Magic<br>" }
	if (c.extra_arrows_Ice_Arrow > 0) { statlines += "Ice Arrow fires "+c.extra_arrows_Ice_Arrow+" Additional Arrows<br>" }
	if (c.extra_arrows_Cold_Arrow > 0) { statlines += "Cold Arrow fires "+c.extra_arrows_Cold_Arrow+" Additional Projectiles<br>" }
	if (c.extra_arrows_Magic_Arrow > 0) { statlines += "Magic Arrow fires "+c.extra_arrows_Magic_Arrow+" Additional Arrows<br>" }
	if (c.extra_arrows_Fire_Arrow > 0) { statlines += "Fire Arrow fires "+c.extra_arrows_Fire_Arrow+" Additional Arrows<br>" }
	if (c.experience > 0) { statlines += "+"+c.experience+"% Experience Gained<br>" }
	if (c.ctc_temp1 > 0) { statlines += "10% chance to cast level 15 Nova on striking<br>" }
	if (c.ctc_temp2 > 0) { statlines += "25% chance to cast level 5 Static Field when struck<br>" }
	document.getElementById("statlines").innerHTML = statlines
	updateCTC()
	updateChargeSkills()
}

// updateCTC - Updates CTC (chance to cast) stats gained from items
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

// updateChargeSkills - Updates CSkills (skills with limited charges) gained from items
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

// calculateSkillAmounts - Updates skill levels
// ---------------------------------
function calculateSkillAmounts() {
	// TODO: move function to character files?
	// TODO: make adjustments for PD2
	for (s = 0; s < skills.length; s++) {
		skills[s].extra_levels = 0
		skills[s].extra_levels += character.all_skills + Math.ceil(character.all_skills_per_level*character.level)
		skills[s].extra_levels += character.skills_class
		if (character.charge_ember == 5) { skills[s].extra_levels += character.all_skills_ember }
		var display = skills[s].level;
		var skill_id = "skill_" + getId(skills[s].name);
		skills[s].force_levels = character[skill_id]
		var oskill_id = "o"+skill_id;
		if (typeof(character[oskill_id]) != 'undefined') { skills[s].force_levels += Math.min(3,character[oskill_id]) }
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

// updateSkills - Updates the list of skills available in the skill dropdown menus
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

// checkSkill - Updates skill damage and other info for the selected skill
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
	var strTotal = (c.strength + c.all_attributes + c.level*c.strength_per_level);
	var dexTotal = (c.dexterity + c.all_attributes + c.level*c.dexterity_per_level);
	var energyTotal = Math.floor((c.energy + c.all_attributes)*(1+c.max_energy/100));
	var ar = ((dexTotal - 7) * 5 + c.ar + c.level*c.ar_per_level + c.ar_const) * (1+(c.ar_skillup + c.ar_skillup2 + c.ar_bonus + c.level*c.ar_bonus_per_level)/100) * (1+c.ar_shrine_bonus/100);

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
		if (native_skill == 0) { outcome = character_all.any.getSkillDamage(skillName, ar, physDamage[0], physDamage[1], physDamage[2], nonPhys_min, nonPhys_max); }
		else { outcome = c.getSkillDamage(skill, ar, physDamage[0], physDamage[1], physDamage[2], nonPhys_min, nonPhys_max); }
		
		//var enemy_lvl = ~~MonStats[monsterID][4+c.difficulty];
		var enemy_lvl = Math.min(~~c.level,89);	// temp, sets 'area level' at the character's level (or as close as possible if the area level isn't available in the selected difficulty)
		if (c.difficulty == 1) { enemy_lvl = Math.min(43,enemy_lvl) }
		else if (c.difficulty == 2) { enemy_lvl = Math.max(36,Math.min(66,enemy_lvl)) }
		else if (c.difficulty == 3) { enemy_lvl = Math.max(67,enemy_lvl) }
		var enemy_def = (MonStats[monsterID][8] * MonLevel[enemy_lvl][c.difficulty])/100;
		enemy_def = Math.max(0,enemy_def + enemy_def*(c.enemy_defense+c.target_defense)/100+c.enemy_defense_flat)
		var hit_chance = Math.round(Math.max(5,Math.min(95,(100 * outcome.ar / (outcome.ar + enemy_def)) * (2 * c.level / (c.level + enemy_lvl)))));
		
		var output = ": " + outcome.min + "-" + outcome.max + " {"+Math.ceil((outcome.min+outcome.max)/2)+"}";
		if (~~outcome.min != 0 && ~~outcome.max != 0) { document.getElementById("skill"+num+"_info").innerHTML = output } else { document.getElementById("skill"+num+"_info").innerHTML = ":" }
		if (outcome.ar != 0) { document.getElementById("ar_skill"+num).innerHTML = "AR: " + outcome.ar + " ("+hit_chance+"%)" } else { document.getElementById("ar_skill"+num).innerHTML = "" }
	}
	if (offhandType == "weapon" && (skillName == "Dual Strike" || skillName == "Double Swing" || skillName == "Frenzy" || skillName == "Whirlwind") && equipped.weapon.name != "none") {
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

// checkIronGolem - Handles whether the Iron Golem dropdown should be visible
// ---------------------------------
function checkIronGolem() {
	var active = false;
	for (effect in effects) { if (effect.split("-")[0] == "Iron_Golem" && typeof(effects[effect].info.enabled) != 'undefined') { if (effects[effect].info.enabled == 1) { active = true } } }
	if (active != false) { document.getElementById("golem").style.display = "block"; document.getElementById("golem_spacing").style.display = "block"; }
	else { document.getElementById("golem").style.display = "none"; document.getElementById("golem_spacing").style.display = "none" }
}

// checkOffhand - Handles whether a separate line for offhand damage should be visible
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

// updateSocketTotals - Updates the list of total stats gained from socketed jewels/runes/gems
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

// updateURL - Updates the character parameters in the browser URL
// ---------------------------------
function updateURL() {
	var param_quests = ~~character.quests_completed; if (param_quests == -1) { param_quests = 0 };
	var param_run = ~~character.running; if (param_run == -1) { param_run = 0 };
	
	//params.set('v', game_version)		// handled elsewhere currently
	params.set('class', character.class_name.toLowerCase())
	params.set('level', ~~character.level)
	params.set('difficulty', ~~character.difficulty)
	params.set('quests', param_quests)
	if (game_version == 2) { params.set('running', param_run) } else if (params.has('running')) { params.delete('running') }
	//params.set('running', param_run)
	params.set('strength', ~~character.strength_added)
	params.set('dexterity', ~~character.dexterity_added)
	params.set('vitality', ~~character.vitality_added)
	params.set('energy', ~~character.energy_added)
	params.set('url', ~~settings.parameters)
	params.set('coupling', ~~settings.coupling)
	if (game_version == 2) { params.set('autocast', ~~settings.autocast) } else if (params.has('autocast')) { params.delete('autocast') }
	//params.set('autocast', ~~settings.autocast)
	var param_skills = '';
	for (let s = 0; s < skills.length; s++) {
		var skill_level = skills[s].level;
		if (skill_level < 10) { skill_level = '0'+skill_level }
		param_skills += skill_level
	}
	params.set('skills', param_skills)
	params.delete('selected')
	for (group in corruptsEquipped) { params.delete(group) }
	params.delete('effect')
	params.delete('mercenary')
	params.delete('irongolem')
	
	if (game_version == 2) {	// these features are only available on the PoD version
		params.set('selected', selectedSkill[0]+','+selectedSkill[1])
		for (group in corruptsEquipped) {
			var param_equipped = equipped[group].name+','+equipped[group].tier+','+corruptsEquipped[group].name
			for (group_sock in socketed) { if (group == group_sock) {
				for (let i = 0; i < socketed[group].items.length; i++) {
					param_equipped += ','+socketed[group].items[i].name
				}
			} }
			params.set(group, param_equipped)
		}
	}
	
	for (id in effects) { if (typeof(effects[id].info.enabled) != 'undefined') {
		var param_effect = id+','+effects[id].info.enabled+','+effects[id].info.snapshot;
		if (effects[id].info.snapshot == 1) {
			param_effect += ','+effects[id].info.origin+','+effects[id].info.index
			for (affix in effects[id]) { if (affix != "info") {
				param_effect += ','+affix+','+effects[id][affix]
			} }
		}
		params.append('effect', param_effect)
	} }
		
	if (game_version == 2) {	// these features are only available on the PoD version
		var param_mercenary = mercenary.name;
		if (mercenary.name == "­ ­ ­ ­ Mercenary") { param_mercenary = "none" }
		for (group in mercEquipped) { param_mercenary += ','+mercEquipped[group].name }
		params.set('mercenary', param_mercenary)
		if (golemItem.name != "none") { params.set('irongolem', golemItem.name) }
	}
	
	params.delete('charm')
	for (charm in equipped.charms) { if (typeof(equipped.charms[charm].name) != 'undefined' && equipped.charms[charm].name != 'none') { params.append('charm', equipped.charms[charm].name) }}
	
	if (settings.parameters == 1) { window.history.replaceState({}, '', `${location.pathname}?${params}`) }
	
	// TODO: Shorten URL?
	//var params_string = params.toString();
	//params_string = params_string.split("%2C").join(",")
	//params_string = params_string.split("%C2%AD").join("~")
	//if (settings.parameters == 1) { window.history.replaceState({}, '', `${location.pathname}?`+params_string) }
}
