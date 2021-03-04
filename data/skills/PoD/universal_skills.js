
// TODO/TOCHECK: Does Fire Ball work as a synergy for Meteor (and vice versa) if both are oskills?

var character_any = {
	
	// getSkillData - gets skill info from the appropriate skills data table
	//	skillName: name of skill
	//	lvl: level of the skill
	//	elem: which element of the skill to return
	// result: value of the skill element at the specified level
	// ---------------------------------
	getSkillData : function(skillName, lvl, elem) {
		var sk = "";
		var skill = "";
		var nameMod = "oskill_"+skillName.split(" ").join("_");
		var natClass = oskills_info[nameMod].native_class;
		if (natClass != "none") { sk = skills_all[natClass]; skill = sk[oskills_info[nameMod].i]; }
		
		var sk_Ball_Lightning = {data:{values:[
				["lightning min",10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10],
				["lightning max",30,44,58,72,86,100,125,150,175,200,236,272,308,344,380,427,474,521,568,615,662,720,778,836,894,952,1010,1068,1137,1206,1275,1344,1413,1482,1551,1620,1689,1758,1827,1896,1965,2034,2103,2172,2241,2310,2379,2448,2517,2586,2655,2724,2793,2862,2931,3000,3069,3138,3207,3276],
				["mana cost",2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13,13.5,14,14.5,15,15.5,16,16.5,17,17.5,18,18.5,19,19.5,20,20.5,21,21.5,22,22.5,23,23.5,24,24.5,25,25.5,26,26.5,27,27.5,28,28.5,29,29.5,30,30.5,31,31.5,32]]}};
		if (skillName == "Ball Lightning") { skill = sk_Ball_Lightning }

		var result = skill.data.values[elem][lvl];
		var lycan_lvl = ~~character["oskill_Lycanthropy"] + character.all_skills + Math.ceil(character.all_skills_per_level*character.level);
		var phys_min = ((1+(character.e_damage+character.damage_bonus)/100)*((character.level-1)*character.min_damage_per_level+character.base_damage_min))+character.damage_min;
		var phys_max = ((1+(character.e_damage+character.damage_bonus)/100)*((character.level-1)*character.max_damage_per_level+character.base_damage_max))+character.damage_max;
	
	// Universal
		if (skillName == "Ball Lightning" && elem < 2) {			result *= ((1 + 0.01*Math.floor((character.energy + character.all_attributes)*(1+character.max_energy/100)/3)) * (1+character.lDamage/100)) }
	// Barbarian
		if (skillName == "Battle Command" && elem == 0) {			result = 1 }
	// Druid
		if (skillName == "Flame Dash" && elem == 0) {				result = 8 }
		if (skillName == "Flame Dash" && elem < 3 && elem > 0) {	result *= ((1 + 0.01*(character.energy + character.all_attributes)*(1+character.max_energy/100)) * (1+character.fDamage/100)) }
		if (skillName == "Werewolf" && elem == 0) {					result = (10 + sk[12].data.values[1][lycan_lvl]) }
		if (skillName == "Werewolf" && elem == 3) {					result = (sk[12].data.values[0][lycan_lvl]) }
		if (skillName == "Werebear" && elem == 0) {					result = (15 + sk[12].data.values[1][lycan_lvl]) }
		if (skillName == "Werebear" && elem == 1) {					result += (sk[12].data.values[0][lycan_lvl]) }
		if (skillName == "Summon Dire Wolf" && elem == 3) {			result = ((1 + (skill.data.values[6][lvl] / 100)) * skill.data.values[elem][character.difficulty]) }
	// Necromancer
		if (skillName == "Desecrate" && elem > 0 && elem < 3) { 	result *= (1+character.pDamage/100) }
	// Paladin
		var phys_min = 0;
		var phys_max = 0;
		if (skillName == "Vengeance" && equipped.weapon.name != "none" && elem < 8) {
			phys_min = (character.base_damage_min * (1+character.e_damage/100) + character.damage_min + (character.level-1)*character.min_damage_per_level);
			phys_max = (character.base_damage_max * (1+character.e_damage/100) + character.damage_max + (character.level-1)*character.max_damage_per_level);
		}
		if (skillName == "Vengeance" && elem == 0) {				result = phys_min }
		if (skillName == "Vengeance" && elem == 1) {				result = phys_max }
		if (skillName == "Vengeance" && elem == 2) {				result = Math.floor(phys_min * (skill.data.values[8][lvl]/100) * (1+character.fDamage/100)) }
		if (skillName == "Vengeance" && elem == 3) {				result = Math.floor(phys_max * (skill.data.values[8][lvl]/100) * (1+character.fDamage/100)) }
		if (skillName == "Vengeance" && elem == 4) {				result = Math.floor(phys_min * (skill.data.values[9][lvl]/100) * (1+character.cDamage/100)) }
		if (skillName == "Vengeance" && elem == 5) {				result = Math.floor(phys_max * (skill.data.values[9][lvl]/100) * (1+character.cDamage/100)) }
		if (skillName == "Vengeance" && elem == 6) {				result = Math.floor(phys_min * (skill.data.values[10][lvl]/100) * (1+character.lDamage/100)) }
		if (skillName == "Vengeance" && elem == 7) {				result = Math.floor(phys_max * (skill.data.values[10][lvl]/100) * (1+character.lDamage/100)) }
	// Sorceress
		if (skillName == "Fire Ball" && elem < 2) { 				result *= (1+character.fDamage/100) }
		if (skillName == "Fire Wall" && elem < 2) { 				result *= (1+character.fDamage/100) }
		if (skillName == "Meteor" && elem < 2) { 					result *= (1+character.fDamage/100) }	// physical damage multipled by fire bonus (25% of total fire damage as extra physical damage)
		if (skillName == "Meteor" && elem < 4 && elem > 1) { 		result *= (1+character.fDamage/100) }
		if (skillName == "Meteor" && elem < 6 && elem > 3) { 		result *= (1+character.fDamage/100) }
		if (skillName == "Hydra" && elem < 3 && elem > 0) { 		result *= (1+character.fDamage/100) }

	return result
	},

	// getBuffData - gets a list of stats corresponding to a persisting buff
	//	skill: 
	// result: indexed array including stats affected and their values
	// ---------------------------------
	getBuffData : function(skill) {
		var id = skill.name.split(' ').join('_');
		var lvl = character["oskill_"+skill.name.split(" ").join("_")] + character.all_skills + Math.ceil(character.all_skills_per_level*character.level);
		var result = {};
		var lycan_lvl = ~~character["oskill_Lycanthropy"] + character.all_skills + Math.ceil(character.all_skills_per_level*character.level);
		var lycan_damage = ~~(skills_all["druid"][12].data.values[0][lycan_lvl]);
		var lycan_life = ~~(skills_all["druid"][12].data.values[1][lycan_lvl]);
		
		if (skill.name == "Inner Sight") { result.enemy_defense_flat = skill.data.values[0][lvl]; result.radius = skill.data.values[1][lvl]; }
		if (skill.name == "Lethal Strike") { result.cstrike = skill.data.values[0][lvl]; }
		if (skill.name == "Battle Command") { result.all_skills = 1; result.duration = skill.data.values[1][lvl]; }
		if (skill.name == "Battle Orders") { result.max_stamina = skill.data.values[1][lvl]; result.max_life = Math.round(skill.data.values[2][lvl]/2); result.max_mana = Math.round(skill.data.values[3][lvl]/2); result.duration = skill.data.values[0][lvl]; }
		if (skill.name == "Werewolf") {	// cannot be used with Werebear
			if (effects[id].info.enabled == 1) { disableEffect("Werebear") }
			result.max_life = (10 + lycan_life); result.max_stamina = 40; result.ar_bonus = skill.data.values[1][lvl]; result.ias_skill = skill.data.values[2][lvl]; result.damage_bonus = lycan_damage; result.duration = 1040;
		}
		if (skill.name == "Werebear") {	// cannot be used with Werewolf
			if (effects[id].info.enabled == 1) { disableEffect("Werewolf") }
			result.max_life = (15 + lycan_life); result.damage_bonus = skill.data.values[1][lvl] + lycan_damage; result.defense_bonus = skill.data.values[2][lvl]; result.duration = 1040;
		}
		if (skill.name == "Feral Rage") { result.velocity = skill.data.values[1][lvl]; result.life_leech = skill.data.values[3][lvl]; result.duration = 20; }
		if (skill.name == "Frigerate") {
			result.cDamage_min = skill.data.values[0][lvl] * (1+character.cDamage/100);
			result.cDamage_max = skill.data.values[1][lvl] * (1+character.cDamage/100);
			result.enemy_defense = skill.data.values[2][lvl]; result.radius = 16;
		}
		if (skill.name == "Shiver Armor") {
			if (effects[id].info.enabled == 1) { for (effect_id in effects) { if (effect_id != id && (effect_id.split("-")[0] == id || effect_id.split("-")[0] == "Chilling_Armor")) { disableEffect(effect_id) } } }
			result.defense_bonus = skill.data.values[1][lvl]; result.duration = skill.data.values[0][lvl];
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
		var lvl = ~~character[nameMod] + character.all_skills + Math.ceil(character.all_skills_per_level*character.level);
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
		var damage_enhanced = character.damage_bonus + character.e_damage;
		
		if (skillName == "Ball Lightning") {		attack = 0; spell = 1; lDamage_min = character_any.getSkillData(skillName,lvl,0); lDamage_max = character_any.getSkillData(skillName,lvl,1); }
		// else if (skillName == "Valkyrie") {		attack = 0; spell = 1; }
		else if (skillName == "Magic Arrow") {		attack = 1; spell = 0; mDamage_min = character_any.getSkillData(skillName,lvl,1); mDamage_max = character_any.getSkillData(skillName,lvl,2); }
		else if (skillName == "Multiple Shot") {	attack = 1; spell = 0; damage_min = character_any.getSkillData(skillName,lvl,0); damage_max = character_any.getSkillData(skillName,lvl,1); }
		else if (skillName == "Guided Arrow") {		attack = 1; spell = 1; weapon_damage = 150; damage_bonus = character_any.getSkillData(skillName,lvl,0); }
		else if (skillName == "Bash") { 			attack = 1; spell = 0; weapon_damage = 110; ar_bonus = character_any.getSkillData(skillName,lvl,2); damage_bonus = character_any.getSkillData(skillName,lvl,3); }
		else if (skillName == "Flame Dash") { 		attack = 0; spell = 1; lvl += character.skills_fire_all; fDamage_min = character_any.getSkillData(skillName,lvl,1); fDamage_max = character_any.getSkillData(skillName,lvl,2); }
		else if (skillName == "Feral Rage") {		attack = 1; spell = 0; ar_bonus = character_any.getSkillData(skillName,lvl,5); damage_bonus = character_any.getSkillData(skillName,lvl,4); }
		else if (skillName == "Summon Dire Wolf") {	attack = 0; spell = 1; damage_min = character_any.getSkillData(skillName,lvl,4); damage_max = character_any.getSkillData(skillName,lvl,5); ar_bonus = character_any.getSkillData(skillName,lvl,1); }
		else if (skillName == "Desecrate") {		attack = 0; spell = 1; lvl += character.skills_poison_all; pDamage_min = character_any.getSkillData(skillName,lvl,1); pDamage_max = character_any.getSkillData(skillName,lvl,2); pDamage_duration = 2; }
		else if (skillName == "Zeal") {				attack = 1; spell = 0; ar_bonus = character_any.getSkillData(skillName,lvl,0); damage_bonus = character_any.getSkillData(skillName,lvl,1); }
		else if (skillName == "Vengeance") {		attack = 1; spell = 0; fDamage_min = character_any.getSkillData(skillName,lvl,2); fDamage_max = character_any.getSkillData(skillName,lvl,3); cDamage_min = character_any.getSkillData(skillName,lvl,4); cDamage_max = character_any.getSkillData(skillName,lvl,5); lDamage_min = character_any.getSkillData(skillName,lvl,6); lDamage_max = character_any.getSkillData(skillName,lvl,7); ar_bonus = character_any.getSkillData(skillName,lvl,11); }
		else if (skillName == "Fire Ball") {		attack = 0; spell = 1; lvl += character.skills_fire_all; fDamage_min = character_any.getSkillData(skillName,lvl,0); fDamage_max = character_any.getSkillData(skillName,lvl,1); }
		else if (skillName == "Fire Wall") {		attack = 0; spell = 1; lvl += character.skills_fire_all; fDamage_min = character_any.getSkillData(skillName,lvl,0); fDamage_max = character_any.getSkillData(skillName,lvl,1); }
		else if (skillName == "Meteor") {			attack = 0; spell = 1; lvl += character.skills_fire_all; damage_min = character_any.getSkillData(skillName,lvl,0); damage_max = character_any.getSkillData(skillName,lvl,1); fDamage_min = character_any.getSkillData(skillName,lvl,2); fDamage_max = character_any.getSkillData(skillName,lvl,3); }
		else if (skillName == "Hydra") {			attack = 0; spell = 1; lvl += character.skills_fire_all; fDamage_min = character_any.getSkillData(skillName,lvl,1); fDamage_max = character_any.getSkillData(skillName,lvl,2); }
		else if (skillName == "Whirlwind") {		attack = 1; spell = 0; ar_bonus = character_any.getSkillData(skillName,lvl,1); damage_bonus = character_any.getSkillData(skillName,lvl,0); }
		
	//	TODO: check weapon requirements (only conflict would be a Passion bow, which grants Bash & Zeal...) & werewolf/werebear requirements
		if (skillName == "Feral Rage") {
			var match = 0;
			if (effects["Werewolf"].info.enabled == 1) { match = 1 }
			if (match == 0) { spell = 2 }
		}
		
		if (attack == 0) { phys_min = 0; phys_max = 0; phys_mult = 1; nonPhys_min = 0; nonPhys_max = 0; damage_enhanced = 0; }
		nonPhys_min += (fDamage_min + cDamage_min + lDamage_min + pDamage_min + mDamage_min);
		nonPhys_max += (fDamage_max + cDamage_max + lDamage_max + pDamage_max + mDamage_max);
		phys_min = (~~phys_min * (phys_mult + damage_bonus/100) * (1 + (weapon_damage-100)/100) + (damage_min * (1+(damage_bonus+damage_enhanced)/100)));
		phys_max = (~~phys_max * (phys_mult + damage_bonus/100) * (1 + (weapon_damage-100)/100) + (damage_max * (1+(damage_bonus+damage_enhanced+(character.level*character.e_max_damage_per_level))/100)));
		if (spell != 2) { skillMin = Math.floor(phys_min+nonPhys_min); skillMax = Math.floor(phys_max+nonPhys_max); }
		if (spell == 0) { skillAr = Math.floor(ar*(1+ar_bonus/100)); }
		
		var result = {min:skillMin,max:skillMax,ar:skillAr};
		return result
	}
};
