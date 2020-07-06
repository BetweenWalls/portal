
var character_any = {
	
	// getSkillData - gets skill info from the appropriate skills data table
	//	skill: skill object for the skill in question
	//	lvl: level of the skill
	//	elem: which element of the skill to return
	// result: value of the skill element at the specified level
	// ---------------------------------
	getSkillData : function(skillName, lvl, elem) {
		var skills = "";
		var skill = "";
		var nameMod = "oskill_"+skillName.split(" ").join("_");
		var natClass = oskills_info[nameMod].native_class;
		if (natClass != "none") { skills = skills_all[natClass]; skill = skills[oskills_info[nameMod].i]; }
		
		var sk_Ball_Lightning = {data:{values:[
				["lightning min",6.6,6.9,7.2,7.5,7.8,8.1,8.4,8.7,9,9.3,9.6,9.9,10.2,10.5,10.8,11.1,11.4,11.7,12,12.3,12.6,12.9,13.2,13.5,13.8,14.1,14.4,14.7,15,15.3,15.6,15.9,16.2,16.5,16.8,17.1,17.4,17.7,18,18.3,18.6,18.9,19.2,19.5,19.8,20.1,20.4,20.7,21,21.3,21.6,21.9,22.2,22.5,22.8,23.1,23.4,23.7,24,24.3], 
				["lightning max",44,64,84,104,124,144,176,208,240,272,304,351,398,445,492,539,601,663,725,787,849,943,1038,1132,1211,1308,1402,1496,1590,1684,1779,1873,1967,2061,2155,2249,2343,2437,2531,2625,2720,2814,2908,3002,3096,3190,3284,3378,3472,3566,3661,3755,3849,3943,4037,4131,4225,4319,4413,4507], 
				["mana cost",2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13,13.5,14,14.5,15,15.5,16,16.5,17,17.5,18,18.5,19,19.5,20,20.5,21,21.5,22,22.5,23,23.5,24,24.5,25,25.5,26,26.5,27,27.5,28,28.5,29,29.5,30,30.5,31,31.5,32]]}};
		if (skillName == "Ball Lightning") { skill = sk_Ball_Lightning }

		var result = skill.data.values[elem][lvl];
		var lycan_lvl = ~~character["oskill_lycanthropy"] + character.all_skills;
		var phys_min = ((1+(character.e_damage+character.damage_bonus)/100)*((character.level-1)*character.min_damage_per_level+character.base_damage_min))+character.damage_min;
		var phys_max = ((1+(character.e_damage+character.damage_bonus)/100)*((character.level-1)*character.max_damage_per_level+character.base_damage_max))+character.damage_max;
	
	// Universal
		if (skillName == "Ball Lightning" && elem < 2) {		result *= (1+character.lDamage/100) }
	// Barbarian
		if (skillName == "Battle Command" && elem == 0) {		result = 1 }
	// Druid
		if (skillName == "Flame Dash" && elem == 0) {			result = 8 }
		if (skillName == "Flame Dash" && elem < 3 && elem > 0) {	result *= ((1 + 0.01*(character.energy + character.all_attributes)*(1+character.max_energy/100)) * (1+character.fDamage/100)) }
		if (skillName == "Arctic Blast" && elem < 2) {			result *= (1+character.cDamage/100) }
		if (skillName == "Werewolf" && elem == 0) {			result = (15 + skills[12].data.values[1][lycan_lvl]) }
		if (skillName == "Werewolf" && elem == 3) {			result = (skills[12].data.values[0][lycan_lvl]) }
		if (skillName == "Werebear" && elem == 0) {			result = (25 + skills[12].data.values[1][lycan_lvl]) }
		if (skillName == "Werebear" && elem == 1) {			result += (skills[12].data.values[0][lycan_lvl]) }
		if (skillName == "Summon Dire Wolf" && elem == 3) {		result = ((1 + (skill.data.values[6][lvl] / 100)) * skill.data.values[elem][character.difficulty]) }
	// Necromancer
		if (skillName == "Desecrate" && elem > 0 && elem < 3) { 	result *= (1+character.pDamage/100) }
	// Paladin
		var phys_min = 0;
		var phys_max = 0;
		if (skillName == "Vengeance" && equipped.weapon.name != "none" && elem < 8) {
			phys_min = (character.base_damage_min * (1+character.e_damage/100) + character.damage_min + (character.level-1)*character.min_damage_per_level);
			phys_max = (character.base_damage_max * (1+character.e_damage/100) + character.damage_max + (character.level-1)*character.max_damage_per_level);
		}
		if (skillName == "Vengeance" && elem == 0) {			result = phys_min }
		if (skillName == "Vengeance" && elem == 1) {			result = phys_max }
		if (skillName == "Vengeance" && elem == 2) {			result = Math.floor(phys_min * (skill.data.values[8][lvl]/100) * (1+character.fDamage/100)) }
		if (skillName == "Vengeance" && elem == 3) {			result = Math.floor(phys_max * (skill.data.values[8][lvl]/100) * (1+character.fDamage/100)) }
		if (skillName == "Vengeance" && elem == 4) {			result = Math.floor(phys_min * (skill.data.values[9][lvl]/100) * (1+character.cDamage/100)) }
		if (skillName == "Vengeance" && elem == 5) {			result = Math.floor(phys_max * (skill.data.values[9][lvl]/100) * (1+character.cDamage/100)) }
		if (skillName == "Vengeance" && elem == 6) {			result = Math.floor(phys_min * (skill.data.values[10][lvl]/100) * (1+character.lDamage/100)) }
		if (skillName == "Vengeance" && elem == 7) {			result = Math.floor(phys_max * (skill.data.values[10][lvl]/100) * (1+character.lDamage/100)) }
	// Sorceress
		if (skillName == "Fire Ball" && elem < 2) { 			result *= (1+character.fDamage/100) }
		if (skillName == "Fire Wall" && elem < 2) { 			result *= (1+character.fDamage/100) }
		if (skillName == "Meteor" && elem < 2) { 			result *= (1+character.fDamage/100) }
		if (skillName == "Meteor" && elem < 4 && elem > 1) { 		result *= (1+character.fDamage/100) }
		if (skillName == "Hydra" && elem < 3 && elem > 0) { 		result *= (1+character.fDamage/100) }

	return result
	},

	// getBuffData - gets a list of stats corresponding to a persisting buff
	//	skill: 
	// result: indexed array including stats affected and their values
	// ---------------------------------
	getBuffData : function(skill) {
		var id = skill.name.split(' ').join('_');
		var lvl = character["oskill_"+skill.name.split(" ").join("_")] + character.all_skills;
		var result = {};
		var lycan_damage = ~~(skills_all["druid"][12].data.values[0][~~(character.oskill_Lycanthropy+character.all_skills)]);
		var lycan_life = ~~(skills_all["druid"][12].data.values[1][~~(character.oskill_Lycanthropy+character.all_skills)]);
		
		if (skill.name == "Inner Sight") { result.enemy_defense_flat = skill.data.values[0][lvl]; }	// TODO: Make always-active?
		if (skill.name == "Lethal Strike") { result.cstrike = skill.data.values[0][lvl]; }	// TODO: Make always-active
		if (skill.name == "Battle Command") { result.all_skills = 1; result.duration = skill.data.values[1][lvl]; }
		if (skill.name == "Shout") { result.defense_bonus = skill.data.values[0][lvl]; result.duration = skill.data.values[1][lvl]; }
		if (skill.name == "Battle Orders") { result.max_stamina = skill.data.values[1][lvl]; result.max_life = skill.data.values[2][lvl]; result.max_mana = skill.data.values[3][lvl]; result.duration = skill.data.values[0][lvl]; }
		if (skill.name == "Werewolf") {	// cannot be used with Werebear
			if (effects[id].info.enabled == 1) { disableEffect("Werebear") }
			result.max_life = (15 + lycan_life); result.max_stamina = 40; result.ar_bonus = skill.data.values[1][lvl]; result.ias_skill = skill.data.values[2][lvl]; result.damage_bonus = lycan_damage; result.duration = 1040;
		}
		if (skill.name == "Werebear") {	// cannot be used with Werewolf
			if (effects[id].info.enabled == 1) { disableEffect("Werewolf") }
			result.max_life = (25 + lycan_life); result.damage_bonus = skill.data.values[1][lvl] + lycan_damage; result.defense_bonus = skill.data.values[2][lvl]; result.duration = 1040;
		}
		if (skill.name == "Feral Rage") { result.velocity = skill.data.values[1][lvl]; result.life_leech = skill.data.values[3][lvl]; result.duration = 20; }
		if (skill.name == "Frigerate") {	// TODO: Make always-active?
			result.cDamage_min = skill.data.values[0][lvl];
			result.cDamage_max = skill.data.values[1][lvl];
			result.enemy_defense = skill.data.values[2][lvl];
		}
		if (skill.name == "Shiver Armor") {
			if (effects[id].info.enabled == 1) { for (effect_id in effects) { if (effect_id != id && effect_id.split("-")[0] == id) { disableEffect(effect_id) } } }
			result.defense_bonus = skill.data.values[1][lvl]; result.duration = skill.data.values[0][lvl];
		}
		if (skill.name == "Enflame") {		// TODO: Make always-active?
			if (effects[id].info.enabled == 1) { for (effect_id in effects) { if (effect_id != id && effect_id.split("-")[0] == id) { disableEffect(effect_id) } } }
			result.fDamage_min = skill.data.values[1][lvl];
			result.fDamage_max = skill.data.values[2][lvl];
			result.ar_bonus = skill.data.values[3][lvl];
		}
		if (skill.name == "Edged Weapon Mastery") { result.edged_damage = skill.data.values[0][lvl]; result.edged_ar = skill.data.values[1][lvl]; result.edged_cstrike = skill.data.values[2][lvl]; }
		if (skill.name == "Cold Mastery") { result.cPierce = skill.data.values[0][lvl]; result.cDamage = skill.data.values[1][lvl]; }
		if (skill.name == "Fire Mastery") { result.fPierce = skill.data.values[0][lvl]; result.fDamage = skill.data.values[1][lvl]; }
	
	return result
	},

	// getSkillDamage - gets the damage and attack rating for the selected skill
	//	skillName: name of selected skill
	//	num: 1 or 2 (skill1 or skill2)
	//	ar: base attack rating
	//	min/max parameters: base damage of different types
	// ---------------------------------
	getSkillDamage : function(skillName, ar, phys_min, phys_max, phys_mult, nonPhys_min, nonPhys_max) {
		var nameMod = "oskill_"+skillName.split(" ").join("_");
		var lvl = ~~character[nameMod] + character.all_skills;
		var ar_bonus = 0; var damage_bonus = 0; var weapon_damage = 100;
		var damage_min = 0; var damage_max = 0;
		var fDamage_min = 0; var fDamage_max = 0;
		var cDamage_min = 0; var cDamage_max = 0;
		var lDamage_min = 0; var lDamage_max = 0;
		var pDamage_min = 0; var pDamage_max = 0; var pDamage_duration = 0;
		var mDamage_min = 0; var mDamage_max = 0;
		var skillMin = 0; var skillMax = 0; var skillAr = 0;
		var attack = 0;	// 0 = no basic damage, 1 = includes basic attack damage
		var spell = 2;	// 0 = uses attack rating, 1 = no attack rating, 2 = non-damaging
		
		if (skillName == "Ball Lightning") {		attack = 0; spell = 1; lDamage_min = character_any.getSkillData(skillName,lvl,0); lDamage_max = character_any.getSkillData(skillName,lvl,1); }
		// else if (skillName == "Valkyrie") {		attack = 0; spell = 1; }
		else if (skillName == "Magic Arrow") {		attack = 1; spell = 0; mDamage_min = character_any.getSkillData(skillName,lvl,1); mDamage_max = character_any.getSkillData(skillName,lvl,2); }
		else if (skillName == "Multiple Shot") {	attack = 1; spell = 0; damage_min = character_any.getSkillData(skillName,lvl,0); damage_max = character_any.getSkillData(skillName,lvl,1); }
		else if (skillName == "Guided Arrow") {		attack = 1; spell = 1; weapon_damage = 150; damage_bonus = character_any.getSkillData(skillName,lvl,0); }
		else if (skillName == "Bash") { 		attack = 1; spell = 0; weapon_damage = 110; ar_bonus = character_any.getSkillData(skillName,lvl,2); damage_bonus = character_any.getSkillData(skillName,lvl,3); }
		else if (skillName == "Flame Dash") { 		attack = 0; spell = 1; lvl += character.skills_fire_all; fDamage_min = character_any.getSkillData(skillName,lvl,1); fDamage_max = character_any.getSkillData(skillName,lvl,2); }
		else if (skillName == "Arctic Blast") { 	attack = 0; spell = 1; lvl += character.skills_cold_all; cDamage_min = character_any.getSkillData(skillName,lvl,0); cDamage_max = character_any.getSkillData(skillName,lvl,1); }
		else if (skillName == "Feral Rage") {		attack = 1; spell = 0; ar_bonus = character_any.getSkillData(skillName,lvl,5); damage_bonus = character_any.getSkillData(skillName,lvl,4); }
		else if (skillName == "Summon Dire Wolf") {	attack = 0; spell = 1; damage_min = character_any.getSkillData(skillName,lvl,4); damage_max = character_any.getSkillData(skillName,lvl,5); ar_bonus = character_any.getSkillData(skillName,lvl,1); }
		else if (skillName == "Desecrate") {		attack = 0; spell = 1; lvl += character.skills_poison_all; pDamage_min = character_any.getSkillData(skillName,lvl,1); pDamage_max = character_any.getSkillData(skillName,lvl,2); pDamage_duration = 2; }
		else if (skillName == "Zeal") {			attack = 1; spell = 0; ar_bonus = character_any.getSkillData(skillName,lvl,0); damage_bonus = character_any.getSkillData(skillName,lvl,1); }
		else if (skillName == "Vengeance") {		attack = 1; spell = 0; fDamage_min = character_any.getSkillData(skillName,lvl,2); fDamage_max = character_any.getSkillData(skillName,lvl,3); cDamage_min = character_any.getSkillData(skillName,lvl,4); cDamage_max = character_any.getSkillData(skillName,lvl,5); lDamage_min = character_any.getSkillData(skillName,lvl,6); lDamage_max = character_any.getSkillData(skillName,lvl,7); ar_bonus = character_any.getSkillData(skillName,lvl,11); }
		else if (skillName == "Fire Ball") {		attack = 0; spell = 1; lvl += character.skills_fire_all; fDamage_min = character_any.getSkillData(skillName,lvl,0); fDamage_max = character_any.getSkillData(skillName,lvl,1); }
		else if (skillName == "Fire Wall") {		attack = 0; spell = 1; lvl += character.skills_fire_all; fDamage_min = character_any.getSkillData(skillName,lvl,0); fDamage_max = character_any.getSkillData(skillName,lvl,1); }
		else if (skillName == "Meteor") {		attack = 0; spell = 1; lvl += character.skills_fire_all; fDamage_min = character_any.getSkillData(skillName,lvl,0); fDamage_max = character_any.getSkillData(skillName,lvl,1); }
		else if (skillName == "Hydra") {		attack = 0; spell = 1; lvl += character.skills_fire_all; fDamage_min = character_any.getSkillData(skillName,lvl,1); fDamage_max = character_any.getSkillData(skillName,lvl,2); }

	//	TODO: check weapon requirements (only conflict would be a Passion bow, which grants Bash & Zeal...) & werewolf/werebear requirements
		if (skillName == "Feral Rage") {
			var match = 0;
			if (effects["Werewolf"].info.enabled == 1) { match = 1 }
			if (match == 0) { spell = 2 }
		}
		
		var damage_enhanced = character.damage_bonus + character.e_damage;
		if (attack == 0) { phys_min = 0; phys_max = 0; phys_mult = 1; nonPhys_min = 0; nonPhys_max = 0; damage_enhanced = 0; }
		nonPhys_min += (fDamage_min + cDamage_min + lDamage_min + pDamage_min + mDamage_min);
		nonPhys_max += (fDamage_max + cDamage_max + lDamage_max + pDamage_max + mDamage_max);
		phys_min = (~~phys_min * (phys_mult + (weapon_damage-100+damage_bonus)/100) + (damage_min * (1+(damage_bonus+damage_enhanced)/100)));
		phys_max = (~~phys_max * (phys_mult + (weapon_damage-100+damage_bonus)/100) + (damage_max * (1+(damage_bonus+damage_enhanced)/100)));
		if (spell != 2) { skillMin = Math.floor(phys_min+nonPhys_min); skillMax = Math.floor(phys_max+nonPhys_max); }
		if (spell == 0) { skillAr = Math.floor(ar*(1+ar_bonus/100)); }
		
		var result = {min:skillMin,max:skillMax,ar:skillAr};
		return result
	}
};
