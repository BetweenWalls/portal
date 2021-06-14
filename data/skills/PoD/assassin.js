
var character_assassin = {class_name:"Assassin", strength:20, dexterity:20, vitality:20, energy:25, life:50, mana:25, stamina:195, levelup_life:2, levelup_stamina:1.25, levelup_mana:1.5, ar_per_dexterity:5, life_per_vitality:3, stamina_per_vitality:1.25, mana_per_energy:1.75, starting_strength:20, starting_dexterity:20, starting_vitality:20, starting_energy:25, ar_const:15, block_const:3, skill_layout:"./images/skill_trees/PoD/assassin.png", mana_regen:1.66,
	weapon_frames:{dagger:14, sword:[14,22], axe:[14,18], mace:[14,18], thrown:[14,14], staff:18, polearm:18, scepter:14, wand:14, javelin:14, spear:22, bow:15, crossbow:20, claw:10},
	// Skills that may adjust IAS breakpoints: Laying Traps, Fists of Ember, Fists of Thunder, Blades of Ice, Dragon Claw, Dragon Tail, Dragon Talon
	fcr_frames:16, fcr_bp:[0, 8, 16, 27, 42, 65, 102, 174],
	fhr_frames:9, fhr_bp:[0, 7, 15, 27, 48, 86, 200],
	fbr_frames:5, fbr_bp:[0, 13, 32, 86, 600],
	
	// getSkillData - gets skill info from the skills data table
	//	skill: skill object for the skill in question
	//	lvl: level of the skill
	//	elem: which element of the skill to return
	// result: value of the skill element at the specified level
	// ---------------------------------
	getSkillData : function(skill, lvl, elem) {
		var result = skill.data.values[elem][lvl];
		
		if (skill.name == "Dragon Claw" && elem == 0) { 				result += (5*skills[9].level + 5*skills[13].level) }
		if (skill.name == "Dragon Talon" && elem == 0) { 				result = character.kick_min }
		if (skill.name == "Dragon Talon" && elem == 1) { 				result = Math.floor(1.5*character.kick_min) }
		if (skill.name == "Dragon Talon" && elem == 3) { 				result += (15*skills[7].level) }
		if (skill.name == "Dragon Flight" && elem == 0) { 				result = character.kick_min }
		if (skill.name == "Dragon Flight" && elem == 1) { 				result = Math.floor(1.5*character.kick_min) }
		if (skill.name == "Dragon Flight" && elem == 2) { 				result = Math.max(0.4, (6 - 0.5*character.charge_ember - 0.5*character.charge_thunder - 0.5*character.charge_ice - 0.5*character.charge_tiger - 0.5*character.charge_cobra)) }
		if (skill.name == "Fists of Fire" && elem < 6) { 				result *= ((1 + 0.05*(skills[2].level + skills[3].level + skills[4].level + skills[6].level)) * (1+character.fDamage/100)) }
		if (skill.name == "Claws of Thunder" && elem < 4) { 			result *= ((1 + 0.04*(skills[1].level + skills[3].level + skills[4].level + skills[6].level)) * (1+character.lDamage/100)) }
		if (skill.name == "Blades of Ice" && elem < 4) { 				result *= ((1 + 0.02*(skills[1].level + skills[2].level + skills[4].level + skills[6].level)) * (1+character.cDamage/100)) }
		
		if (skill.name == "Psychic Hammer" && elem < 4) { 				result *= (1 + (0.25*skills[14].level + 0.25*skills[17].level)) }
		if (skill.name == "Mind Blast" && elem > 0 && elem < 3) { 		result *= (1 + (0.21*skills[10].level + 0.21*skills[14].level)) }
		if (skill.name == "Mind Blast" && elem == 0) { 					result = (2.6 + (0.7 * Math.floor(skills[14].level / 5))) }
		if (skill.name == "Venom" && elem > 0 && elem < 3) { 			result *= ((1+character.pDamage/100)) }
		
		if (skill.name == "Fire Blast" && elem < 2) { 					result *= ((1 + (0.12*skills[21].level + 0.12*skills[23].level + 0.12*skills[24].level + 0.12*skills[27].level + 0.12*skills[28].level)) * (1+character.fDamage/100)) }
		if (skill.name == "Shock Web" && elem == 0) { 					result = Math.max(6, (skill.data.values[elem][lvl] + Math.floor(skills[20].level / 3))) }
		if (skill.name == "Shock Web" && elem < 3 && elem > 0) { 		result *= ((1 + (0.20*skills[21].level + 0.20*skills[26].level + 0.20*skills[28].level)) * (1+character.lDamage/100)) }
		if (skill.name == "Blade Throw" && elem < 3 && elem > 0) { 		result *= (1 + (0.16*skills[25].level + 0.16*skills[29].level)) }
		if (skill.name == "Charged Bolt Sentry" && elem == 0) { 		result = 5 + Math.floor(skills[26].level / 4) }
		if (skill.name == "Charged Bolt Sentry" && elem == 1) { 		result = 5 + Math.floor(skills[21].level / 3) }
		if (skill.name == "Charged Bolt Sentry" && elem<4 && elem>1) {	result *= ((1 + (0.20*skills[20].level + 0.20*skills[26].level + 0.20*skills[28].level)) * (1+character.lDamage/100)) }
		if (skill.name == "Wake of Fire" && elem < 2) { 				result *= ((1 + (0.18*skills[20].level + 0.18*skills[27].level)) * (1+character.fDamage/100)) }
		if (skill.name == "Lightning Sentry" && elem < 2) { 			result *= ((1 + (0.21*skills[21].level + 0.21*skills[23].level + 0.21*skills[28].level)) * (1+character.lDamage/100)) }
		if (skill.name == "Wake of Inferno" && elem == 0) { 			result = (1 + (0.04 * skills[24].level)) }
		if (skill.name == "Wake of Inferno" && elem < 3 && elem > 0) { 	result *= ((1 + (0.13*skills[21].level + 0.13*skills[28].level + 0.20*skills[24].level)) * (1+character.fDamage/100)) }
		if (skill.name == "Death Sentry" && elem == 0) { 				result = 5 + Math.floor(skills[20].level / 3) }
		if (skill.name == "Death Sentry" && elem < 4 && elem > 1) { 	result *= ((1 + (0.15*skills[26].level)) * (1+character.lDamage/100)) }
		if (skill.name == "Blade Shield" && elem < 4 && elem > 1) { 	result *= ((1 + (0.07*skills[22].level + 0.07*skills[25].level))) }
	return result
	},
	
	// getBuffData - gets a list of stats corresponding to a persisting buff
	//	effect: array element object for the buff
	// result: indexed array including stats affected and their values
	// ---------------------------------
	getBuffData : function(skill) {
		var id = skill.name.split(' ').join('_');
		var lvl = skill.level + skill.extra_levels;
		var result = {};
		var charges = 3;
		
		// TODO: update martial effects (charge_bonus variables are placeholders)
		
		if (skill.name == "Fists of Fire") { result.charge_ember = charges; result.fDamage_min = character.getSkillData(skill,lvl,0); result.fDamage_max = character.getSkillData(skill,lvl,1); result.duration = 5; result.charge_bonus_explosion = 1; result.charge_bonus_meteor = 1; }
		if (skill.name == "Claws of Thunder") { result.charge_thunder = charges; result.lDamage_min = character.getSkillData(skill,lvl,0); result.lDamage_max = character.getSkillData(skill,lvl,1); result.duration = 5; result.charge_bonus_fork = 1; result.charge_bonus_static = 1; }
		if (skill.name == "Blades of Ice") { result.charge_ice = charges; result.cDamage_min = character.getSkillData(skill,lvl,0); result.cDamage_max = character.getSkillData(skill,lvl,1); result.duration = 5; result.charge_bonus_icicles = 1; result.charge_bonus_accuracy = 1; }
		if (skill.name == "Tiger Strike") { result.charge_tiger = charges; result.damage_bonus = skill.data.values[2][lvl]; result.duration = 5; }
		if (skill.name == "Cobra Strike") { result.charge_cobra = charges; result.life_leech = skill.data.values[0][lvl]; result.mana_leech = skill.data.values[0][lvl]; result.duration = 5; result.monster_defense_per_hit = skill.data.values[1][lvl]; result.life_per_hit = skill.data.values[2][lvl]; result.mana_per_hit = skill.data.values[2][lvl]; }
		if (skill.name == "Burst of Speed") {
			if (effects[id].info.enabled == 1) { for (effect_id in effects) { if (effect_id != id && (effect_id.split("-")[0] == id || effect_id.split("-")[0] == "Fade")) { disableEffect(effect_id) } } }
			result.ias_skill = skill.data.values[0][lvl]; result.velocity = skill.data.values[1][lvl]; result.duration = skill.data.values[2][lvl];
		}
		if (skill.name == "Fade") {
			if (effects[id].info.enabled == 1) { for (effect_id in effects) { if (effect_id != id && (effect_id.split("-")[0] == id || effect_id.split("-")[0] == "Burst_of_Speed")) { disableEffect(effect_id) } } }
			result.curse_length_reduced = skill.data.values[0][lvl]; result.all_res = skill.data.values[1][lvl]; result.pdr = skill.data.values[2][lvl]; result.duration = skill.data.values[3][lvl];
		}
		if (skill.name == "Venom") {
			if (effects[id].info.enabled == 1) { for (effect_id in effects) { if (effect_id != id && effect_id.split("-")[0] == id) { disableEffect(effect_id) } } }
			result.pDamage_min = skill.data.values[1][lvl]; result.pDamage_max = skill.data.values[2][lvl]; result.pDamage_duration = 0.4; result.pDamage_duration_override = 0.4; result.duration = skill.data.values[0][lvl];
		}
		if (skill.name == "Cloak of Shadows") {
			if (effects[id].info.enabled == 1) { for (effect_id in effects) { if (effect_id != id && effect_id.split("-")[0] == id) { disableEffect(effect_id) } } }
			result.defense_bonus = skill.data.values[0][lvl]; result.enemy_defense = skill.data.values[1][lvl]; result.duration = 8;
		}
		if (skill.name == "Claw Mastery") { result.claw_damage = skill.data.values[0][lvl]; result.claw_ar = skill.data.values[1][lvl]; result.claw_cstrike = skill.data.values[2][lvl]; }
		if (skill.name == "Weapon Block") { result.block_skillup = skill.data.values[0][lvl]; }
		// debuffs: Cloak of Shadows?
		// No stat buffs:
		if (skill.name == "Shadow Warrior") { if (effects[id].info.enabled == 1) { disableEffect("Shadow_Master"); } }
		if (skill.name == "Shadow Master") { if (effects[id].info.enabled == 1) { disableEffect("Shadow_Warrior"); } }
		if (skill.name == "Blade Shield") { result.duration = skill.data.values[1][lvl]; }
		
	return result	
	},
	
	// getSkillDamage - returns the damage and attack rating for the selected skill
	//	skill: skill object for the selected skill
	//	ar: base attack rating
	//	min/max parameters: base damage of different types
	// ---------------------------------
	getSkillDamage : function(skill, ar, phys_min, phys_max, phys_mult, nonPhys_min, nonPhys_max) {
		var lvl = skill.level+skill.extra_levels;
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
		if (typeof(skill.damaging) != 'undefined') { attack = skill.damaging.attack; spell = skill.damaging.spell; }
		var kick_damage_min = 0; var kick_damage_max = 0; var kick_bonus = 0;
		var strTotal = (character.strength + character.all_attributes + character.level*character.strength_per_level);	// used in Kick calculations
		var e_damage_offhand = 0; if (offhandType == "weapon") { e_damage_offhand = (~~(equipped["offhand"].e_damage) + ~~(socketed["offhand"].totals.e_damage) + ~~(corruptsEquipped["offhand"].e_damage)) };
		var damage_enhanced = character.damage_bonus + character.e_damage - e_damage_offhand;

		if (skill.name == "Dragon Claw") { 				damage_bonus = character.getSkillData(skill,lvl,0); ar_bonus = character.getSkillData(skill,lvl,1); }
		else if (skill.name == "Fists of Fire") { 		ar_bonus = character.getSkillData(skill,lvl,8); }
		else if (skill.name == "Claws of Thunder") { 	ar_bonus = character.getSkillData(skill,lvl,5); }
		else if (skill.name == "Blades of Ice") { 		ar_bonus = character.getSkillData(skill,lvl,5); }
		else if (skill.name == "Tiger Strike") { 		ar_bonus = character.getSkillData(skill,lvl,3); }
		else if (skill.name == "Cobra Strike") { 		ar_bonus = character.getSkillData(skill,lvl,3); }
		else if (skill.name == "Dragon Talon") {		kick_damage_min = character.getSkillData(skill,lvl,0); kick_damage_max = character.getSkillData(skill,lvl,1); ar_bonus = character.getSkillData(skill,lvl,2); kick_bonus = 1.2*strTotal+character.getSkillData(skill,lvl,3); damage_bonus = character.getSkillData(skill,lvl,4); }
		else if (skill.name == "Dragon Flight") { 		kick_damage_min = character.getSkillData(skill,lvl,0); kick_damage_max = character.getSkillData(skill,lvl,1); kick_bonus = 1.2*strTotal+character.getSkillData(skill,lvl,3); ar_bonus = character.getSkillData(skill,lvl,4); }
		else if (skill.name == "Psychic Hammer") {		damage_min = character.getSkillData(skill,lvl,0); damage_max = character.getSkillData(skill,lvl,1); mDamage_min = character.getSkillData(skill,lvl,2); mDamage_max = character.getSkillData(skill,lvl,3); }
		else if (skill.name == "Mind Blast") {			damage_min = character.getSkillData(skill,lvl,0); damage_max = character.getSkillData(skill,lvl,1); }
	//	else if (skill.name == "Shadow Warrior") {}
	//	else if (skill.name == "Shadow Master") {}
		else if (skill.name == "Fire Blast") {			fDamage_min = character.getSkillData(skill,lvl,0); fDamage_max = character.getSkillData(skill,lvl,1); }
		else if (skill.name == "Shock Web") {			lDamage_min = character.getSkillData(skill,lvl,1); lDamage_max = character.getSkillData(skill,lvl,2); }
		else if (skill.name == "Blade Throw") {			weapon_damage = 50; ar_bonus = character.getSkillData(skill,lvl,0); damage_min = character.getSkillData(skill,lvl,1); damage_max = character.getSkillData(skill,lvl,2); }
		else if (skill.name == "Charged Bolt Sentry") {	lDamage_min = character.getSkillData(skill,lvl,2); lDamage_max = character.getSkillData(skill,lvl,3); }
		else if (skill.name == "Wake of Fire") {		fDamage_min = character.getSkillData(skill,lvl,0); fDamage_max = character.getSkillData(skill,lvl,1); }
		else if (skill.name == "Blade Fury") {			weapon_damage = 87; ar_bonus = character.getSkillData(skill,lvl,0); damage_min = character.getSkillData(skill,lvl,1); damage_max = character.getSkillData(skill,lvl,2); }
		else if (skill.name == "Lightning Sentry") {	lDamage_min = character.getSkillData(skill,lvl,0); lDamage_max = character.getSkillData(skill,lvl,1); }
		else if (skill.name == "Wake of Inferno") {		fDamage_min = character.getSkillData(skill,lvl,1); fDamage_max = character.getSkillData(skill,lvl,2); }
		else if (skill.name == "Death Sentry") {		lDamage_min = character.getSkillData(skill,lvl,2); lDamage_max = character.getSkillData(skill,lvl,3); }
		else if (skill.name == "Blade Shield") {		weapon_damage = 50; damage_min = character.getSkillData(skill,lvl,2); damage_max = character.getSkillData(skill,lvl,3); ar_bonus = character.getSkillData(skill,lvl,4); }
		
		if (typeof(skill.reqWeapon) != 'undefined') { var match = 0; for (let w = 0; w < skill.reqWeapon.length; w++) {
			if (equipped.weapon.type == skill.reqWeapon[w]) {
				if (skill.name == "Dual Strike") { if (equipped.offhand.type == "claw") { match = 1 } }
				else if (skill.name == "Dragon Talon" || skill.name == "Dragon Flight") { if (typeof(equipped.weapon.twoHanded) == 'undefined' || equipped.weapon.twoHanded == 0) { match = 1 } }
				else { match = 1 }
			}
		} if (match == 0) { spell = 2 } }
		
		var kick_min = (kick_damage_min+(character.level*character.kick_damage_per_level));
		var kick_max = (kick_damage_max+(character.level*character.kick_damage_per_level));
		if (kick_damage_min == 0) { kick_min = 0; kick_max = 0; }
		if (attack == 0) { phys_min = 0; phys_max = 0; phys_mult = 1; nonPhys_min = 0; nonPhys_max = 0; damage_enhanced = 0; }
		nonPhys_min += (fDamage_min + cDamage_min + lDamage_min + pDamage_min + mDamage_min);
		nonPhys_max += (fDamage_max + cDamage_max + lDamage_max + pDamage_max + mDamage_max);
		phys_min = (~~phys_min * (phys_mult + damage_bonus/100) * (1 + (weapon_damage-100)/100) + ((damage_min + kick_min) * (1+(damage_bonus+damage_enhanced+kick_bonus)/100)));
		phys_max = (~~phys_max * (phys_mult + damage_bonus/100) * (1 + (weapon_damage-100)/100) + ((damage_max + kick_max) * (1+(damage_bonus+damage_enhanced+(character.level*character.e_max_damage_per_level)+kick_bonus)/100)));
		if (spell != 2) { skillMin = Math.floor(phys_min+nonPhys_min); skillMax = Math.floor(phys_max+nonPhys_max); }
		if (spell == 0) { skillAr = Math.floor(ar*(1+ar_bonus/100)); }
		
		var result = {min:skillMin,max:skillMax,ar:skillAr};
		return result
	},
	
	// setSkillAmounts - helps update class-related skill levels, called by calculateSkillAmounts()
	//	s: index of skill
	// ---------------------------------
	setSkillAmounts : function(s) {
		skills[s].extra_levels += character.skills_assassin
		if (s == 1 || s == 20 || s == 24 || s == 27) { skills[s].extra_levels += character.skills_fire_all }
		if (s == 3) { skills[s].extra_levels += character.skills_cold_all }
		if (s == 2 || s == 21 || s == 23 || s == 26 || s == 28) { skills[s].extra_levels += character.skills_lightning_all }
		if (s == 18) { skills[s].extra_levels += character.skills_poison_all }
		if (s == 10) { skills[s].extra_levels += character.skills_magic_all }
		if (s < 9) {
			skills[s].extra_levels += character.skills_martial
			skills[s].extra_levels += character.skills_tree1
		} else if (s > 19) {
			skills[s].extra_levels += character.skills_traps
			skills[s].extra_levels += character.skills_tree3
		} else {
			skills[s].extra_levels += character.skills_shadow
			skills[s].extra_levels += character.skills_tree2
		}
	}
};

/*[ 0] Dragon Claw		*/ var d112 = {values:[
		["damage",10,17,24,31,38,45,52,59,66,73,80,87,94,101,108,115,122,129,136,148,155,162,169,176,183,190,197,204,211,218,225,232,239,246,253,260,267,274,281,288,295,302,309,316,323,330,337,344,351,358,365,372,379,386,393,400,407,414,421,428,], 
		["attack rating",40,65,90,115,140,165,190,215,240,265,290,315,340,365,390,415,440,465,490,515,540,565,590,615,640,665,690,715,740,765,790,815,840,865,890,915,940,965,990,1015,1040,1065,1090,1115,1140,1165,1190,1215,1240,1265,1290,1315,1340,1365,1390,1415,1440,1465,1490,1515,], 
		["mana cost",1.3,1.4,1.5,1.5,1.6,1.6,1.7,1.8,1.8,1.9,2,2,2.1,2.1,2.2,2.3,2.3,2.4,2.5,2.5,2.6,2.7,2.7,2.8,2.9,2.9,3,3.1,3.1,3.2,3.3,3.3,3.4,3.5,3.5,3.6,3.7,3.7,3.8,3.9,3.9,4,4.1,4.1,4.2,4.3,4.3,4.4,4.5,4.5,4.6,4.7,4.7,4.8,4.9,4.9,5,5.1,5.1,5.2,], 
]};
/*[ 1] Fists of Fire	*/ var d123 = {values:[
		["fire attack min",6,11,16,21,26,31,36,41,51,61,71,81,91,101,111,121,141,161,181,201,221,241,271,301,331,361,391,421,461,501,541,581,621,661,701,741,781,821,861,901,941,981,1021,1061,1101,1141,1181,1221,1261,1301,1341,1381,1421,1461,1501,1541,1581,1621,1661,1701,], 
		["fire attack max",10,15,20,25,30,35,40,45,56,67,78,89,100,111,122,133,155,177,199,221,243,265,298,331,364,397,430,463,507,551,595,639,683,727,771,815,859,903,947,991,1035,1079,1123,1167,1211,1255,1299,1343,1387,1431,1475,1519,1563,1607,1651,1695,1739,1783,1827,1871,], 
		["explosion min",6,11,16,21,26,31,36,41,51,61,71,81,91,101,111,121,141,161,181,201,221,241,271,301,331,361,391,421,461,501,541,581,621,661,701,741,781,821,861,901,941,981,1021,1061,1101,1141,1181,1221,1261,1301,1341,1381,1421,1461,1501,1541,1581,1621,1661,1701,], 
		["explosion max",10,15,20,25,30,35,40,45,56,67,78,89,100,111,122,133,155,177,199,221,243,265,298,331,364,397,430,463,507,551,595,639,683,727,771,815,859,903,947,991,1035,1079,1123,1167,1211,1255,1299,1343,1387,1431,1475,1519,1563,1607,1651,1695,1739,1783,1827,1871,], 
		["meteor fire min",6,11,16,21,26,31,36,41,51,61,71,81,91,101,111,121,141,161,181,201,221,241,271,301,331,361,391,421,461,501,541,581,621,661,701,741,781,821,861,901,941,981,1021,1061,1101,1141,1181,1221,1261,1301,1341,1381,1421,1461,1501,1541,1581,1621,1661,1701,], 
		["meteor fire max",10,15,20,25,30,35,40,45,56,67,78,89,100,111,122,133,155,177,199,221,243,265,298,331,364,397,430,463,507,551,595,639,683,727,771,815,859,903,947,991,1035,1079,1123,1167,1211,1255,1299,1343,1387,1431,1475,1519,1563,1607,1651,1695,1739,1783,1827,1871,], 
		["meteor physical min",1,3,4,5,6,8,9,10,13,15,18,20,23,25,28,30,35,40,45,50,55,60,68,75,83,90,98,105,115,125,135,145,155,165,175,185,195,205,215,225,235,245,255,265,275,285,295,305,315,325,335,345,355,365,375,385,395,405,415,425,], 
		["meteor physical max",2,4,5,6,7,9,10,11,14,17,19,22,25,28,30,33,39,44,50,55,61,66,74,83,91,99,107,116,127,138,149,160,171,182,193,204,215,226,237,248,259,270,281,292,303,314,325,336,347,358,369,380,391,402,413,424,435,446,457,468,], 
		["attack",25,35,45,55,65,75,85,95,105,115,125,135,145,155,165,175,185,195,205,215,225,235,245,255,265,275,285,295,305,315,325,335,345,355,365,375,385,395,405,415,425,435,445,455,465,475,485,495,505,515,525,535,545,555,565,575,585,595,605,615,], 
]};
/*[ 2] Claws of Thunder	*/ var d143 = {values:[
		["lightning attack min",1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,], 
		["lightning attack max",80,100,120,140,160,180,200,220,260,300,340,380,420,460,500,540,600,660,720,780,840,900,980,1060,1140,1220,1300,1380,1480,1580,1680,1780,1880,1980,2080,2180,2280,2380,2480,2580,2680,2780,2880,2980,3080,3180,3280,3380,3480,3580,3680,3780,3880,3980,4080,4180,4280,4380,4480,4580,], 
		["lightning bolt min",1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,], 
		["lightning bolt max",80,100,120,140,160,180,200,220,260,300,340,380,420,460,500,540,600,660,720,780,840,900,980,1060,1140,1220,1300,1380,1480,1580,1680,1780,1880,1980,2080,2180,2280,2380,2480,2580,2680,2780,2880,2980,3080,3180,3280,3380,3480,3580,3680,3780,3880,3980,4080,4180,4280,4380,4480,4580,], 
		["field radius",2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,2.6,], 
		["attack",15,22,29,36,43,50,57,64,71,78,85,92,99,106,113,120,127,134,141,148,155,162,169,176,183,190,197,204,211,218,225,232,239,246,253,260,267,274,281,288,295,302,309,316,323,330,337,344,351,358,365,372,379,386,393,400,407,414,421,428,], 
]};
/*[ 3] Blades of Ice	*/ var d163 = {values:[
		["cold attack min",15,23,31,39,47,55,63,71,81,91,101,111,121,131,141,151,171,191,211,231,251,271,301,331,361,391,421,451,491,531,571,611,651,691,731,771,811,851,891,931,971,1011,1051,1091,1131,1171,1211,1250,1291,1331,1371,1411,1451,1491,1531,1571,1611,1651,1691,1731,], 
		["cold attack max",16,24,32,40,48,56,64,72,82,92,102,112,122,132,142,152,174,196,218,240,262,284,316,348,380,412,444,476,518,560,602,644,686,728,770,812,854,896,938,980,1022,1064,1106,1148,1190,1232,1274,1316,1358,1400,1442,1484,1526,1568,1610,1652,1694,1736,1778,1820,], 
		["cold icicle min",15,23,31,39,47,55,63,71,81,91,101,111,121,131,141,151,171,191,211,231,251,271,301,331,361,391,421,451,491,531,571,611,651,691,731,771,811,851,891,931,971,1011,1051,1091,1131,1171,1211,1250,1291,1331,1371,1411,1451,1491,1531,1571,1611,1651,1691,1731,], 
		["cold icicle max",16,24,32,40,48,56,64,72,82,92,102,112,122,132,142,152,174,196,218,240,262,284,316,348,380,412,444,476,518,560,602,644,686,728,770,812,854,896,938,980,1022,1064,1106,1148,1190,1232,1274,1316,1358,1400,1442,1484,1526,1568,1610,1652,1694,1736,1778,1820,], 
		["icicle duration",0.8,0.8,0.9,0.9,1,1,1.1,1.1,1.2,1.2,1.3,1.3,1.4,1.4,1.5,1.5,1.6,1.6,1.7,1.7,1.8,1.8,1.9,1.9,2,2,2.1,2.1,2.2,2.2,2.3,2.3,2.4,2.4,2.5,2.5,2.6,2.6,2.7,2.7,2.8,2.8,2.9,2.9,3,3,3.1,3.1,3.2,3.2,3.3,3.3,3.4,3.4,3.5,3.5,3.6,3.6,3.7,3.7,], 
		["attack",15,22,29,36,43,50,57,64,71,78,85,92,99,106,113,120,127,134,141,148,155,162,169,176,183,190,197,204,211,218,225,232,239,246,253,260,267,274,281,288,295,302,309,316,323,330,337,344,351,358,365,372,379,386,393,400,407,414,421,428,], 
]};
/*[ 4] Tiger Strike		*/ var d121 = {values:[
		["Charge 1",20,23,26,29,32,35,38,41,44,47,50,53,56,59,62,65,68,71,74,77,80,83,86,89,92,95,98,101,104,107,110,113,116,119,122,125,128,131,134,137,140,143,146,149,152,155,158,161,164,167,170,173,176,179,182,185,188,191,194,197,], 
		["Charge 2",40,46,52,58,64,70,76,82,88,94,100,106,112,118,124,130,136,142,148,154,160,166,172,178,184,190,196,202,208,214,220,226,232,238,244,250,256,262,268,274,280,286,292,298,304,310,316,322,328,334,340,346,352,358,364,370,376,382,388,394,], 
		["Charge 3",60,69,78,87,96,105,114,123,132,141,150,159,168,177,186,195,204,213,222,231,240,249,258,267,276,285,294,303,312,321,330,339,348,357,366,375,384,393,402,411,420,429,438,447,456,465,474,483,492,501,510,519,528,537,546,555,564,573,582,591,], 
		["Attack +%",15,22,29,36,43,50,57,64,71,78,85,92,99,106,113,120,127,134,141,148,155,162,169,176,183,190,197,204,211,218,225,232,239,246,253,260,267,274,281,288,295,302,309,316,323,330,337,344,351,358,365,372,379,386,393,400,407,414,421,428,], 
]};
/*[ 5] Dragon Talon		*/ var d122 = {values:[
		["footwear min",], 
		["footwear max",], 
		["attack rating",40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,620,630,], 
		["kick damage",12,19,26,33,40,47,54,61,68,75,82,89,96,103,110,117,124,131,138,145,152,159,166,173,180,187,194,201,208,215,222,229,236,243,250,257,264,271,278,285,292,299,306,313,320,327,334,341,348,355,362,369,376,383,390,397,404,411,418,425,], 
		["damage",12,18,24,30,36,42,48,54,60,66,72,78,84,90,96,102,108,114,120,126,132,138,144,150,156,162,168,174,180,186,192,198,204,210,216,222,228,234,240,246,252,258,264,270,276,282,288,294,300,306,312,318,324,330,336,342,348,354,360,366,], 
		["mana cost",5,5.1,5.2,5.3,5.5,5.6,5.7,5.8,6,6.1,6.2,6.3,6.5,6.6,6.7,6.8,7,7.1,7.2,7.3,7.5,7.6,7.7,7.8,8,8.1,8.2,8.3,8.5,8.6,8.7,8.8,9,9.1,9.2,9.3,9.5,9.6,9.7,9.8,10,10.1,10.2,10.3,10.5,10.6,10.7,10.8,11,11.1,11.2,11.3,11.5,11.6,11.7,11.8,12,12.1,12.2,12.3,], 
]};
/*[ 6] Cobra Strike		*/ var d141 = {values:[
		["life and mana stealing",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,], 
		["monster defense per hit",-2,-6,-10,-14,-18,-22,-26,-30,-34,-38,-42,-46,-50,-54,-58,-62,-66,-70,-74,-78,-82,-86,-90,-94,-98,-102,-106,-110,-114,-118,-122,-126,-130,-134,-138,-142,-146,-150,-154,-158,-162,-166,-170,-174,-178,-182,-186,-190,-194,-198,-202,-206,-210,-214,-218,-222,-226,-230,-234,-238,], 
		["life and mana gained on melee hit",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,], 
		["Attack +%",15,22,29,36,43,50,57,64,71,78,85,92,99,106,113,120,127,134,141,148,155,162,169,176,183,190,197,204,211,218,225,232,239,246,253,260,267,274,281,288,295,302,309,316,323,330,337,344,351,358,365,372,379,386,393,400,407,414,421,428,], 
]};
/*[ 7] Dragon Flight	*/ var d152 = {values:[
		["footwear min",], 
		["footwear max",], 
		["cooldown",], 
		["kick damage",16,23,30,37,44,51,58,65,72,79,86,93,100,107,114,121,128,135,142,149,156,163,170,177,184,191,198,205,212,219,226,233,240,247,254,261,268,275,282,289,296,303,310,317,324,331,338,345,352,359,366,373,380,387,394,401,408,415,422,429,], 
		["attack rating",60,85,110,135,160,185,210,235,260,285,310,335,360,385,410,435,460,485,510,535,560,585,610,635,660,685,710,735,760,785,810,835,860,885,910,935,960,985,1010,1035,1060,1085,1110,1135,1160,1185,1210,1235,1260,1285,1310,1335,1360,1385,1410,1435,1460,1485,1510,1535,], 
		["mana cost",15,14.7,14.5,14.2,14,13.7,13.5,13.2,13,12.7,12.5,12.2,12,11.7,11.5,11.2,11,10.7,10.5,10.2,10,9.7,9.5,9.2,9,8.7,8.5,8.2,8,7.7,7.5,7.2,7,6.7,6.5,6.2,6,5.7,5.5,5.2,5,4.7,4.5,4.2,4,3.7,3.5,3.2,3,2.7,2.5,2.2,2,1.7,1.5,1.2,1,0.7,0.5,0.2,], 
]};
/*[ 8]*/
/*[ 9] Claw Mastery		*/ var d212 = {values:[
		["damage",30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,115,120,125,130,135,140,145,150,155,160,165,170,175,180,185,190,195,200,205,210,215,220,225,230,235,240,245,250,255,260,265,270,275,280,285,290,295,300,305,310,315,320,325,], 
		["attack rating",50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,620,630,640,], 
		["chance",5,9,12,15,17,19,20,21,23,23,24,25,26,26,27,28,28,28,29,29,29,30,30,30,30,31,31,31,31,31,32,32,32,32,32,32,32,33,33,33,33,33,33,33,33,33,33,33,34,34,34,34,34,34,34,34,34,34,34,35,], 
]};
/*[10] Psychic Hammer	*/ var d213 = {values:[
		["damage min",1,2,3,4,5,6,7,8,9,11,12,14,15,17,18,20,23,26,29,32,35,38,43,49,54,60,65,71,79,87,95,103,111,119,127,135,143,151,159,167,175,183,191,199,207,215,223,231,239,247,255,263,271,279,287,295,303,311,319,327,], 
		["damage max",3,4,6,7,9,10,12,13,15,17,19,21,23,25,27,29,33,36,40,43,47,50,56,62,68,74,80,86,95,103,112,120,129,137,146,154,163,171,180,188,197,205,214,222,231,239,248,256,265,273,282,290,299,307,316,324,333,341,350,358,], 
		["magic min",1,2,3,4,5,6,7,8,9,11,12,14,15,17,18,20,23,26,29,32,35,38,43,49,54,60,65,71,79,87,95,103,111,119,127,135,143,151,159,167,175,183,191,199,207,215,223,231,239,247,255,263,271,279,287,295,303,311,319,327,], 
		["magic max",3,4,6,7,9,10,12,13,15,17,19,21,23,25,27,29,33,36,40,43,47,50,56,62,68,74,80,86,95,103,112,120,129,137,146,154,163,171,180,188,197,205,214,222,231,239,248,256,265,273,282,290,299,307,316,324,333,341,350,358,], 
		["mana cost",4,4.25,4.5,4.75,5,5.25,5.5,5.75,6,6.25,6.5,6.75,7,7.25,7.5,7.75,8,8.25,8.5,8.75,9,9.25,9.5,9.75,10,10.25,10.5,10.75,11,11.25,11.5,11.75,12,12.25,12.5,12.75,13,13.25,13.5,13.75,14,14.25,14.5,14.75,15,15.25,15.5,15.75,16,16.25,16.5,16.75,17,17.25,17.5,17.75,18,18.25,18.5,18.75,], 
]};
/*[11] Burst of Speed	*/ var d221 = {values:[
		["attack speed",21,27,31,34,37,39,41,42,44,45,46,47,48,49,50,51,51,51,52,52,53,53,54,54,54,55,55,55,55,55,56,56,56,56,56,57,57,57,57,57,57,58,58,58,58,58,58,58,59,59,59,59,59,59,59,59,59,59,59,60,], 
		["movement speed",23,29,34,39,42,45,47,49,51,52,54,55,56,57,57,59,59,60,60,61,61,62,62,63,63,63,64,64,65,65,65,65,66,66,66,66,66,67,67,67,67,67,67,67,68,68,68,68,68,68,68,68,68,69,69,69,69,69,69,70,], 
		["duration",120,136,152,168,184,200,216,232,248,264,280,296,312,328,344,360,376,392,408,424,440,456,472,488,504,520,536,552,568,584,600,616,632,648,664,680,696,712,728,744,760,776,792,808,824,840,856,872,888,904,920,936,952,968,984,1000,1016,1032,1048,1064,], 
]};
/*[12]*/
/*[13] Weapon Block		*/ var d232 = {values:[
		["chance",26,32,36,39,42,44,46,47,49,50,51,52,53,54,55,56,56,56,57,57,58,58,59,59,59,60,60,60,60,60,61,61,61,61,61,62,62,62,62,62,62,63,63,63,63,63,63,63,64,64,64,64,64,64,64,64,64,64,64,65,], 
]};
/*[14] Cloak of Shadows	*/ var d233 = {values:[
		["defense",10,13,16,19,22,25,28,31,34,37,40,43,46,49,52,55,58,61,64,67,70,73,76,79,82,85,88,91,94,97,100,103,106,109,112,115,118,121,124,127,130,133,136,139,142,145,148,151,154,157,160,163,166,169,172,175,178,181,184,187,], 
		["enemy defense",-15,-18,-21,-24,-27,-30,-33,-36,-39,-42,-45,-48,-51,-54,-57,-60,-63,-66,-69,-72,-75,-78,-81,-84,-87,-90,-93,-96,-99,-102,-105,-108,-111,-114,-117,-120,-123,-126,-129,-132,-135,-138,-141,-144,-147,-150,-153,-156,-159,-162,-165,-168,-171,-174,-177,-180,-183,-186,-189,-192,], 
]};
/*[15] Fade				*/ var d241 = {values:[
		["curse reduction",14,18,20,23,25,26,27,28,29,30,31,31,32,33,33,34,34,34,34,35,35,35,36,36,36,36,37,37,37,37,37,37,37,37,38,38,38,38,38,38,38,38,38,38,39,39,39,39,39,39,39,39,39,39,39,39,39,39,39,40,], 
		["resist",19,27,33,38,42,45,48,50,52,54,56,57,58,60,60,62,62,63,63,64,65,65,66,67,67,67,68,68,69,69,69,69,70,70,71,71,71,71,71,71,71,72,72,72,73,73,73,73,73,73,73,73,73,74,74,74,74,74,74,75,], 
		["phys resist",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,], 
		["duration",120,136,152,168,184,200,216,232,248,264,280,296,312,328,344,360,376,392,408,424,440,456,472,488,504,520,536,552,568,584,600,616,632,648,664,680,696,712,728,744,760,776,792,808,824,840,856,872,888,904,920,936,952,968,984,1000,1016,1032,1048,1064,], 
]};
/*[16] Shadow Warrior	*/ var d242 = {values:[
		["life",376,451,526,601,676,752,827,902,977,1052,1128,1203,1278,1353,1428,1504,1579,1654,1729,1804,1880,1955,2030,2105,2180,2256,2331,2406,2481,2556,2632,2707,2782,2857,2932,3008,3083,3158,3233,3308,3384,3459,3534,3609,3684,3760,3835,3910,3985,4060,4136,4211,4286,4361,4436,4512,4587,4662,4737,4812,], 
		["attack rating",50,100,150,200,250,300,350,400,450,500,550,600,650,700,750,800,850,900,950,1000,1050,1100,1150,1200,1250,1300,1350,1400,1450,1500,1550,1600,1650,1700,1750,1800,1850,1900,1950,2000,2050,2100,2150,2200,2250,2300,2350,2400,2450,2500,2550,2600,2650,2700,2750,2800,2850,2900,2950,3000,], 
		["defense",0,15,30,45,60,75,90,105,120,135,150,165,180,195,210,225,240,255,270,285,300,315,330,345,360,375,390,405,420,435,450,465,480,495,510,525,540,555,570,585,600,615,630,645,660,675,690,705,720,735,750,765,780,795,810,825,840,855,870,885,], 
		["mana cost",27,27,28,28,29,29,30,30,31,31,32,32,33,33,34,34,35,35,36,36,37,37,38,38,39,39,40,40,41,41,42,42,43,43,44,44,45,45,46,46,47,47,48,48,49,49,50,50,51,51,52,52,53,53,54,54,55,55,56,56,], 
]};
/*[17] Mind Blast		*/ var d253 = {values:[
		["radius",], 
		["damage min",15,25,35,45,55,65,75,85,100,115,130,144,160,175,189,205,225,246,268,289,310,331,357,383,409,435,461,487,523,559,595,631,667,703,739,775,811,847,883,919,955,991,1027,1063,1099,1135,1171,1207,1243,1279,1315,1351,1387,1423,1459,1495,1531,1567,1603,1639,], 
		["damage max",20,32,44,56,68,80,92,104,120,137,155,172,189,206,223,239,263,286,308,332,355,378,405,432,459,486,513,540,578,616,654,692,730,768,806,844,882,920,958,996,1034,1072,1110,1148,1186,1224,1262,1300,1338,1376,1414,1452,1490,1528,1566,1604,1642,1680,1718,1756,], 
]};
/*[18] Venom			*/ var d261 = {values:[
		["duration",120,128,136,144,152,160,168,176,184,192,200,208,216,224,232,240,248,256,264,272,280,288,296,304,312,320,328,336,344,352,360,368,376,384,392,400,408,416,424,432,440,448,456,464,472,480,488,496,504,512,520,528,536,544,552,560,568,576,584,592,], 
		["poison min",120,150,180,210,240,270,300,330,370,410,450,490,530,570,610,650,700,750,800,850,900,950,1010,1070,1130,1190,1250,1310,1380,1450,1520,1590,1660,1730,1800,1870,1940,2010,2080,2150,2220,2290,2360,2430,2500,2570,2640,2710,2780,2850,2920,2990,3060,3130,3200,3270,3340,3410,3480,3550,], 
		["poison max",160,190,220,250,280,310,340,370,410,450,490,530,570,610,650,690,740,790,840,890,940,990,1050,1110,1170,1230,1290,1350,1420,1490,1560,1630,1700,1770,1840,1910,1980,2050,2120,2190,2260,2330,2400,2470,2540,2610,2680,2750,2820,2890,2960,3030,3100,3170,3240,3310,3380,3450,3520,3590,], 
]};
/*[19] Shadow Master	*/ var d262 = {values:[
		["life",376,451,526,601,676,752,827,902,977,1052,1128,1203,1278,1353,1428,1504,1579,1654,1729,1804,1880,1955,2030,2105,2180,2256,2331,2406,2481,2556,2632,2707,2782,2857,2932,3008,3083,3158,3233,3308,3384,3459,3534,3609,3684,3760,3835,3910,3985,4060,4136,4211,4286,4361,4436,4512,4587,4662,4737,4812,], 
		["attack rating",50,100,150,200,250,300,350,400,450,500,550,600,650,700,750,800,850,900,950,1000,1050,1100,1150,1200,1250,1300,1350,1400,1450,1500,1550,1600,1650,1700,1750,1800,1850,1900,1950,2000,2050,2100,2150,2200,2250,2300,2350,2400,2450,2500,2550,2600,2650,2700,2750,2800,2850,2900,2950,3000,], 
		["resist",5,17,27,35,42,47,51,55,57,61,62,65,67,68,70,71,73,73,74,75,76,77,78,78,79,79,80,81,81,82,82,83,83,84,84,84,84,84,85,85,85,85,86,86,86,87,87,87,87,88,88,88,88,88,89,89,89,89,89,89,], 
		["mana cost",35,35,36,36,37,37,38,38,39,39,40,40,41,41,42,42,43,43,44,44,45,45,46,46,47,47,48,48,49,49,50,50,51,51,52,52,53,53,54,54,55,55,56,56,57,57,58,58,59,59,60,60,61,61,62,62,63,63,64,64,], 
]};

/*[20] Fire Blast		*/ var d312 = {values:[
		["fire min",3,4,6,7,9,10,12,13,17,21,25,29,33,37,41,45,55,65,75,85,95,105,124,143,162,181,200,219,248,277,306,335,364,393,422,451,480,509,538,567,596,625,654,683,712,741,770,799,828,857,886,915,944,973,1002,1031,1060,1089,1118,1147,], 
		["fire max",4,6,9,11,14,16,19,21,27,32,38,43,49,54,60,65,77,89,101,113,125,137,159,181,203,225,247,269,302,335,368,401,434,467,500,533,566,599,632,665,698,731,764,797,830,863,896,929,962,995,1028,1061,1094,1127,1160,1193,1226,1259,1292,1325,], 
		["mana cost",3,3.1,3.2,3.3,3.5,3.6,3.7,3.8,4,4.1,4.2,4.3,4.5,4.6,4.7,4.8,5,5.1,5.2,5.3,5.5,5.6,5.7,5.8,6,6.1,6.2,6.3,6.5,6.6,6.7,6.8,7,7.1,7.2,7.3,7.5,7.6,7.7,7.8,8,8.1,8.2,8.3,8.5,8.6,8.7,8.8,9,9.1,9.2,9.3,9.5,9.6,9.7,9.8,10,10.1,10.2,10.3,], 
]};
/*[21] Shock Web		*/ var d321 = {values:[
		["spikes",6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,11,11,11,11,12,12,12,12,13,13,13,13,14,14,14,14,15,15,15,15,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,], 
		["lightning min",1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,], 
		["lightning max",10,13,16,19,22,25,28,31,37,43,49,55,61,67,73,79,89,99,109,119,129,139,154,169,184,199,214,229,250,271,292,313,334,355,376,397,418,439,460,481,502,523,544,565,586,607,628,649,670,691,712,733,754,775,796,817,838,859,880,901,], 
]};
/*[22] Blade Throw		*/ var d323 = {values:[
		["attack rating",5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,115,120,125,130,135,140,145,150,155,160,165,170,175,180,185,190,195,200,205,210,215,220,225,230,235,240,245,250,255,260,265,270,275,280,285,290,295,300,], 
		["damage min",6,9,12,15,18,21,24,27,31,35,39,43,47,51,55,59,64,69,74,79,84,89,94,99,104,109,114,119,124,129,134,139,144,149,154,159,164,169,174,179,184,189,194,199,204,209,214,219,224,229,234,239,244,249,254,259,264,269,274,279,], 
		["damage max",10,13,16,19,22,25,28,31,35,39,43,47,51,55,59,63,68,73,78,83,88,93,98,103,108,113,118,123,128,133,138,143,148,153,158,163,168,173,178,183,188,193,198,203,208,213,218,223,228,233,238,243,248,253,258,263,268,273,278,283,], 
]};
/*[23]Charged Bolt Sentry*/var d331 = {values:[
		["shoots",], 
		["charged bolts",], 
		["lightning min",1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,], 
		["lightning max",8,13,17,22,26,31,35,39.5,45.5,51.5,57.5,63.5,69.5,75.5,81.5,87.5,96.5,105.5,114.5,123.5,132.5,141.5,153.5,165.5,177.5,189.5,201.5,213.5,228.5,243.5,258.5,273.5,288.5,303.5,318.5,333.5,348.5,363.5,378.5,393.5,408.5,423.5,438.5,453.5,468.5,483.5,498.5,513.5,528.5,543.5,558.5,573.5,588.5,603.5,618.5,633.5,648.5,663.5,678.5,693.5,], 
]};
/*[24] Wake of Fire		*/ var d332 = {values:[
		["fire min",6,8,10,12,14,16,18,20,25,30,35,40,45,50,55,60,72,83,96,108,120,132,148,164,180,196,212,228,249,270,291,312,333,354,375,396,417,438,459,480,501,522,543,564,585,606,627,648,669,690,711,732,753,774,795,816,837,858,879,900,], 
		["fire max",12,15,18,21,24,27,30,33,39,45,51,57,63,68,75,81,93,107,120,133,146,159,176,193,210,227,244,261,283,305,327,349,371,393,415,437,459,481,503,525,547,569,591,613,635,657,679,701,723,745,767,789,811,833,855,877,899,921,943,965,], 
]};
/*[25] Blade Fury		*/ var d343 = {values:[
		["attack rating",10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,], 
		["damage min",8,11,14,17,20,23,26,29,34,39,44,49,54,59,64,69,77,85,93,101,109,117,125,133,141,149,157,165,173,181,189,197,205,213,221,229,237,245,253,261,269,277,285,293,301,309,317,325,333,341,349,357,365,373,381,389,397,405,413,421,], 
		["damage max",10,13,16,19,22,25,28,31,36,41,46,51,56,61,66,71,79,87,95,103,111,119,127,135,143,151,159,167,175,183,191,199,207,215,223,231,239,247,255,263,271,279,287,295,303,311,319,327,335,343,351,359,367,375,383,391,399,407,415,423,], 
		["mana cost",2,2.1,2.2,2.3,2.5,2.6,2.7,2.8,3,3.1,3.2,3.3,3.5,3.6,3.7,3.8,4,4.1,4.2,4.3,4.5,4.6,4.7,4.8,5,5.1,5.2,5.3,5.5,5.6,5.7,5.8,6,6.1,6.2,6.3,6.5,6.6,6.7,6.8,7,7.1,7.2,7.3,7.5,7.6,7.7,7.8,8,8.1,8.2,8.3,8.5,8.6,8.7,8.8,9,9.1,9.2,9.3,], 
]};
/*[26] Lightning Sentry	*/ var d351 = {values:[
		["lightning min",1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,], 
		["lightning max",20,30,39,50,60,70,80,89,106,122,137,154,170,186,201,218,246,274,301,330,358,386,424,462,500,538,576,614,664,714,764,814,864,914,964,1014,1064,1114,1164,1214,1264,1314,1364,1414,1464,1514,1564,1614,1664,1714,1764,1814,1864,1914,1964,2014,2064,2114,2164,2214,], 
]};
/*[27] Wake of Inferno	*/ var d352 = {values:[
		["channel time",910,964,1031,1097,1164,1231,1297,1364,1445,1527,1608,1689,1770,2745,2827,1056,1114,1185,1256,1327,1397,1468,1539,1625,1710,1795,1881,1966,2991,3077,], 
		["fire min",21,38,56,74,91,109,126,144,165,188,210,232,254,275,298,319,346,374,400,427,455,482,515.5,548.5,582,615.5,648.5,682,722.5,763.5,804,844.5,885,925,966,1006,1047,1087,1128,1168,1210,1250,1291,1331,1373,1413,1454,1494,1535,1575,1617,1657,1698,1738,1779,1819,1860,1900,1941,1981,], 
		["fire max",53,71,91,111,130,150,170,189,214,238,262,286,310,334,357,381,411,439,468,498,528,557,592.5,628,663.5,698.5,734,769.5,812.5,855,897.5,940.5,983,1026,1069,1111,1154,1197,1240,1282,1325,1368,1410,1453,1496,1538,1581,1624,1667,1709,1752,1795,1837,1880,1923,1965,2008,2051,2094,2136,], 
]};
/*[28] Death Sentry		*/ var d361 = {values:[
		["shoots",], 
		["radius",3.3,3.6,4,4.3,4.6,5,5.3,5.6,6,6.3,6.6,7,7.3,7.6,8,8.3,8.6,9,9.3,9.6,10,10.3,10.6,11,11.3,11.6,12,12.3,12.6,13,13.3,13.6,14,14.3,14.6,15,15.3,15.6,16,16.3,16.6,17,17.3,17.6,18,18.3,18.6,19,19.3,19.6,20,20.3,20.6,21,21.3,21.6,22,22.3,22.6,23,], 
		["lightning min",1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,], 
		["lightning max",50,57,65,74,82,90,97,105,120,134,148,162,176,190,203,217,242,265,290,314,338,362,392,422,452,482,512,542,578,614,650,686,722,758,794,830,866,902,938,974,1010,1046,1082,1118,1154,1190,1226,1262,1298,1334,1370,1406,1442,1478,1514,1550,1586,1622,1658,1694,], 
]};
/*[29] Blade Shield		*/ var d363 = {values:[
		["blades",1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,], 
		["duration",30,34,38,42,46,50,54,58,62,66,70,74,78,82,86,90,94,98,102,106,110,114,118,122,126,130,134,138,142,146,150,154,158,162,166,170,174,178,182,186,190,194,198,202,206,210,214,218,222,226,230,234,238,242,246,250,254,258,262,266,], 
		["damage min",6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,39,42,45,48,51,54,57,60,63,66,69,72,76,80,84,88,92,96,100,104,108,112,116,120,124,128,132,136,140,144,148,152,156,160,164,168,172,176,180,184,188,192,196,200,], 
		["damage max",8,10,12,14,16,18,20,22,25,28,31,34,37,40,43,46,49,52,55,58,61,64,68,72,76,80,84,88,92,96,100,104,108,112,116,120,124,128,132,136,140,144,148,152,156,160,164,168,172,176,180,184,188,192,196,200,204,208,212,216,], 
		["attack rating",10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,], 
		["mana cost",25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123,125,127,129,131,133,135,137,139,141,143,], 
]};

var skills_assassin = [
{data:d112, key:"112", code:251, name:"Dragon Claw", i:0, req:[], reqlvl:1, reqWeapon:["claw"], level:0, extra_levels:0, force_levels:0, bindable:2, damaging:{attack:1,spell:0}, description:"Slice and dice your enemies<br>while dual wielding weapons<br>[Requires Dual Claw Class Weapons]<br><br>Deals 100% of Weapon Damage", syn_title:"<br>Dual Strike Receives Bonuses From:<br>", syn_text:"Claw Mastery: +5% Damage per Level<br>Weapon Block: +5% Damage per Level", graytext:"", index:[0,""], text:["Damage: +"," percent<br>Attack Rating: +"," percent<br>Mana Cost: ",""]},
{data:d123, key:"123", code:252, name:"Fists of Fire", i:1, req:[0], reqlvl:6, reqWeapon:["claw","dagger"], level:0, extra_levels:0, force_levels:0, effect:3, bindable:2, damaging:{attack:1,spell:0}, description:"Claw-class Charge-up Skill<br><br>Charge 1 - Attacks deal Fire Damage<br>Charge 2 - Explosive Fiery Attack<br>Charge 3 - Meteor crashes down<br>Meteor Physical Damage Equal to 25% of Fire Damage", syn_title:"<br>Fists of Fire Receives Bonuses From:<br>", syn_text:"Charge-up Skills: +5% Fire Damage per Level", graytext:"", index:[0,""], text:["Fire Damage to Attacks: ","-","<br>Explosion Fire Damage: ","-","<br>Meteor Fire Damage: ","-","<br>Meteor Physical Damage: ","-","<br>Attack Rating: +"," percent<br>Mana Cost: 2"]},
{data:d143, key:"143", code:253, name:"Claws of Thunder", i:2, req:[1,0], reqlvl:18, reqWeapon:["claw","dagger"], level:0, extra_levels:0, force_levels:0, effect:3, bindable:2, damaging:{attack:1,spell:0}, description:"Claw-class Charge-up Skill<br><br>Charge 1 - Attacks deal Lightning Damage<br>Charge 2 - Lighting zaps nearby enemies<br>Targets up to 4 enemies<br>Charge 3 - Electrical field reduces enemy life<br>Weakens enemies by 5 percent", syn_title:"<br>Claws of Thunder Receives Bonuses From:<br>", syn_text:"Charge-up Skills: +4% Lightning Damage per Level", graytext:"", index:[0,""], text:["Lightning Damage to Attacks: ","-","<br>Bolts Lightning Damage: ","-","<br>Field Radius: "," yards<br>Attack Rating: +"," percent<br>Mana Cost: 4"]},
{data:d163, key:"163", code:254, name:"Blades of Ice", i:3, req:[7,5,2,1,0], reqlvl:30, reqWeapon:["claw","dagger"], level:0, extra_levels:0, force_levels:0, effect:3, bindable:2, damaging:{attack:1,spell:0}, description:"Claw-class Charge-up Skill<br><br>Charge 1 - Attacks deal Cold Damage<br>Charge 2 - Icicles seek nearby enemies<br>50% Weapon Damage<br>80% of Physical Attack Damage Converted to Cold<br>Charge 3 - Icicles chill enemies", syn_title:"<br>Blades of Ice Receives Bonuses From:<br>", syn_text:"Charge-up Skills: +2% Cold Damage per Level", graytext:"", index:[0,""], text:["Cold Damage to Attacks: ","-","<br>Icicles Cold Damage: ","-","<br>Icicles Cold Duration: "," seconds<br>Attack Rating: +"," percent<br>Mana Cost: 3"]},
{data:d121, key:"121", code:255, name:"Tiger Strike", i:4, req:[0], reqlvl:6, reqWeapon:["axe","mace","club","hammer","sword","dagger","thrown","javelin","scepter","wand","claw","staff","spear","polearm"], level:0, extra_levels:0, force_levels:0, effect:3, bindable:2, damaging:{attack:1,spell:0}, description:"Charge-up Skill<br><br>Charges - Attacks have enhanced damage", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Charge 1 - +"," percent damage<br>Charge 2 - +"," percent damage<br>Charge 3 - +"," percent damage<br>Attack: +"," percent<br>Mana Cost: 1"]},
{data:d122, key:"122", code:256, name:"Dragon Talon", i:5, req:[0], reqlvl:6, reqWeapon:["axe","mace","club","hammer","sword","dagger","thrown","javelin","scepter","claw","wand"], level:0, extra_levels:0, force_levels:0, bindable:2, damaging:{attack:1,spell:0}, description:"Triple kick your enemies<br>with deadly accuracy<br>[Requires One-Handed Melee Weapons]", syn_title:"<br>Dragon Talon Receives Bonuses From:<br>", syn_text:"Dragon Flight: +15% Kick Damage per Level", graytext:"", index:[2,"<br>Attacks three times"], text:["Deals 100% of Weapon Damage<br>Kick Damage from Footwear: ","-","Attack Rating: +"," percent<br>Kick Damage: +"," percent<br>Damage: +"," percent<br>Mana Cost: ",""]},
{data:d141, key:"141", code:257, name:"Cobra Strike", i:6, req:[4,0], reqlvl:18, reqWeapon:["axe","mace","club","hammer","sword","dagger","thrown","javelin","scepter","wand","claw","staff","spear","polearm"], level:0, extra_levels:0, force_levels:0, effect:3, bindable:2, damaging:{attack:1,spell:0}, description:"Charge-up Skill<br><br>Charge 1 - Attacks gain Life & Mana leech<br>Charge 2 - Each attack lowers defense of enemies<br>Charge 3 - Melee attacks grant life and mana", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["+"," percent life and mana stealing<br>"," to Monster Defense Per Hit<br>+"," Life and Mana Gained on Melee Hit<br>Attack Rating: +"," percent<br>Mana Cost: 2"]},
{data:d152, key:"152", code:258, name:"Dragon Flight", i:7, req:[5,0], reqlvl:24, reqWeapon:["axe","mace","club","hammer","sword","dagger","thrown","javelin","scepter","claw","wand"], level:0, extra_levels:0, force_levels:0, bindable:2, damaging:{attack:1,spell:0}, description:"Perform a teleporting kick attack that also<br>deals damage to enemies near your target<br>[Requires One-Handed Melee Weapons]", syn_title:"", syn_text:"", graytext:"", index:[3," seconds"], text:["Deals 100% of Weapon Damage<br>Kick Damage from Footwear: ","-","<br>Your Cold Damage Freezes Enemies<br><br>Cooldown Reduced by 0.5 seconds<br>per active Martial Arts Charges<br><br>Minimum Cooldown: 0.4 seconds<br>Cooldown: ","Kick Damage: +"," percent<br>Attack Rating: +"," percent<br>Mana Cost: ",""]},
/*TODO: remove*/{data:d212, key:"212", code:263, name:"None", i:8, req:[], reqlvl:100, level:0, extra_levels:0, force_levels:0, effect:0, bindable:0, description:"", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:[""]},
// TODO: Add info for Dragon Tail? (available from claws)

{data:d212, key:"212", code:260, name:"Claw Mastery", i:9, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, effect:1, bindable:0, description:"Passive - Improves your skill<br>with claw-class weapons", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Damage: +"," percent<br>Attack Rating: +"," percent<br>"," percent chance of Critical Strike",""]},
{data:d213, key:"213", code:261, name:"Psychic Hammer", i:10, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, bindable:2, damaging:{attack:0,spell:1}, description:"Use the power of your mind<br>to create a psychic blast<br>to crush and knock back your enemies", syn_title:"<br>Psychic Hammer Receives Bonuses From:<br>", syn_text:"Mind Blast: +25% Damage per Level<br>Cloak of Shadows: +25% Damage per Level<br>Cloak of Shadows: +25% Magic Damage per Level<br>Mind Blast: +25% Magic Damage per Level", graytext:"", index:[0,""], text:["Damage: ","-","<br>Magic damage: ","-","<br>Mana Cost: ",""]},
{data:d221, key:"221", code:262, name:"Burst of Speed", i:11, req:[9], reqlvl:6, level:0, extra_levels:0, force_levels:0, effect:5, bindable:1, description:"Increases attack and movement speed<br>for a period of time", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Attack Speed: +"," percent<br>Walk/Run Speed: +"," percent<br>Duration: "," seconds<br>Mana Cost: 10",""]},
/*TODO: remove*/{data:d232, key:"232", code:263, name:"None", i:12, req:[], reqlvl:100, level:0, extra_levels:0, force_levels:0, effect:0, bindable:0, description:"", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:[""]},
{data:d232, key:"232", code:264, name:"Weapon Block", i:13, req:[9], reqlvl:12, level:0, extra_levels:0, force_levels:0, effect:1, bindable:0, description:"Passive - Chance to block when<br>you are using dual claw-class weapons", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:[""," percent chance",""]},
{data:d233, key:"233", code:265, name:"Cloak of Shadows", i:14, req:[10], reqlvl:12, level:0, extra_levels:0, force_levels:0, effect:4, bindable:1, description:"Cast a shadow to blind nearby enemies,<br>lowering their defenses for a period of time<br><br>Range: 20 yards<br>Mana Cost: 13", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Duration: 8 seconds<br>Defense Bonus: +"," percent<br>Enemy Defense: "," percent",""]},
{data:d241, key:"241", code:266, name:"Fade", i:15, req:[11,9], reqlvl:18, level:0, extra_levels:0, force_levels:0, effect:5, bindable:1, description:"Raise all resistances and resist curses<br>for a period of time", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Reduces curse duration by "," percent<br>Resist All: "," percent<br>Physical Resistance: "," percent<br>Duration: "," seconds<br>Mana Cost: 10",""]},
{data:d242, key:"242", code:267, name:"Shadow Warrior", i:16, req:[13,14,9,10], reqlvl:18, level:0, extra_levels:0, force_levels:0, bindable:1, description:"Summon a shadow of yourself that mimics<br>your skills and fights by your side", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Life: ","<br>Attack Rating: +","<br>Defense Bonus: +"," percent<br>Mana Cost: ",""]},
{data:d253, key:"253", code:268, name:"Mind Blast", i:17, req:[14,10], reqlvl:24, level:0, extra_levels:0, force_levels:0, bindable:1, damaging:{attack:0,spell:1}, description:"Damage a group of enemies using<br>the power of your mind", syn_title:"<br>Mind Blast Receives Bonuses From:<br>", syn_text:"Psychic Hammer: +21% Damage per Level<br>Cloak of Shadows: +21% Damage per Level<br>Cloak of Shadows: +0.7 Radius per 5 Levels", graytext:"", index:[1," yards<br>Mana Cost: 15"], text:["Radius: ","Damage: ","-",""]},
{data:d261, key:"261", code:269, name:"Venom", i:18, req:[15,11,9], reqlvl:30, level:0, extra_levels:0, force_levels:0, effect:5, bindable:1, description:"Adds poison damage to your weapons<br><br>When active, poison damage<br>delivered by your weapon<br>always lasts for 0.4 seconds", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Duration: "," seconds<br>Poison Damage: ","-","<br>over 0.4 seconds<br>Mana Cost: 12",""]},
{data:d262, key:"262", code:270, name:"Shadow Master", i:19, req:[16,13,14,9,10], reqlvl:30, level:0, extra_levels:0, force_levels:0, bindable:1, description:"Summon a powerful shadow of yourself<br>to fight by your side", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Life: ","<br>Attack Rating: +","<br>Resist All: +"," percent<br>Mana Cost: ",""]},

{data:d312, key:"312", code:271, name:"Fire Blast", i:20, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, bindable:2, damaging:{attack:0,spell:1}, description:"Throw a fire bomb<br>to blast your enemies to bits<br><br>Radius: 3.3 yards", syn_title:"<br>Fire Blast Receives Bonuses From:<br>", syn_text:"Shock Web: +12% Fire Damage per Level<br>Charged Bolt Sentry: +12% Fire Damage per Level<br>Wake of Fire: +12% Fire Damage per Level<br>Wake of Inferno: +12% Fire Damage per Level<br>Death Sentry: +12% Fire Damage per Level", graytext:"", index:[0,""], text:["Fire Damage: ","-","<br>Mana Cost: ",""]},
{data:d321, key:"321", code:272, name:"Shock Web", i:21, req:[20], reqlvl:6, level:0, extra_levels:0, force_levels:0, bindable:2, damaging:{attack:0,spell:1}, description:"Throw a web of lightning<br>to shock your enemies", syn_title:"<br>Shock Web Receives Bonuses From: <br>", syn_text:"Fire Blast: +1 Missile per 3 Levels<br>Charged Bolt Sentry: +20% Lightning Damage per Level<br>Lightning Sentry: +20% Lightning Damage per Level<br>Death Sentry: +20% Lightning Damage per Level", graytext:"", index:[0,""], text:["Spikes: ","<br>Duration: 3.6 seconds<br>Lightning Damage: ","-"," per second<br>Mana Cost: 6",""]},
{data:d323, key:"323", code:273, name:"Blade Throw", i:22, req:[], reqlvl:6, level:0, extra_levels:0, force_levels:0, bindable:2, damaging:{attack:1,spell:0}, description:"Set a spinning blade to patrol<br>between you and target point<br><br>Deals 50% of Weapon Damage<br>Mana Cost: 7", syn_title:"<br>Blade Throw Receives Bonuses From:<br>", syn_text:"Blade Shield: +16% Damage per Level<br>Blade Fury: +16% Damage per Level", graytext:"", index:[0,""], text:["Attack Rating: +"," percent<br>Duration: 1 second<br>Damage: ","-",""]},
{data:d331, key:"331", code:274, name:"Charged Bolt Sentry", i:23, req:[21,20], reqlvl:12, level:0, extra_levels:0, force_levels:0, bindable:1, damaging:{attack:0,spell:1}, description:"A trap that emits Charged Bolts<br>at enemies that pass near", syn_title:"<br>Charged Bolt Sentry Receives Bonuses From:<br>", syn_text:"Shock Web: +1 Bolt per 3 Levels<br>Lightning Sentry: +1 Shot per 4 Levels<br>Fire Blast: +20% Lightning Damage per Level<br>Lightning Sentry: +20% Lightning Damage per Level<br>Death Sentry: +20% Lightning Damage per Level", graytext:"", index:[2," charged bolts<br>Mana Cost: 13"], text:["Shoots "," times<br>Releases ","Lightning Damage: ","-",""]},
{data:d332, key:"332", code:275, name:"Wake of Fire", i:24, req:[20], reqlvl:12, level:0, extra_levels:0, force_levels:0, bindable:1, damaging:{attack:0,spell:1}, description:"A trap that emits waves of fire<br><br>Shoots 5 Times", syn_title:"<br>Wake of Fire Receives Bonuses From:<br>", syn_text:"Fire Blast: +18% Fire Damage per Level<br>Wake of Inferno: +18% Fire Damage per Level", graytext:"", index:[0,""], text:["Fire Damage: ","-","<br>Mana Cost: 13",""]},
{data:d343, key:"343", code:276, name:"Blade Fury", i:25, req:[22,24,20], reqlvl:18, level:0, extra_levels:0, force_levels:0, bindable:2, damaging:{attack:1,spell:0}, description:"Throw spinning blades<br>to slice up your enemies<br><br>Deals 87% of Weapon Damage<br>Minimum Mana Required to Cast: 3", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Attack Rating: +"," percent<br>Damage: ","-","<br>Mana Cost: "," per blade",""]},
{data:d351, key:"351", code:277, name:"Lightning Sentry", i:26, req:[23,21,20], reqlvl:24, level:0, extra_levels:0, force_levels:0, bindable:1, damaging:{attack:0,spell:1}, description:"A trap that shoots lightning<br>to scorch passing enemies<br><br>Shoots 10 Times", syn_title:"<br>Lightning Sentry Receives Bonuses From:<br>", syn_text:"Shock Web: +21% Lightning Damage per Level<br>Charged Bolt Sentry: +21% Lightning Damage per Level<br>Death Sentry: +21% Lightning Damage per Level", graytext:"", index:[0,""], text:["Lightning Damage: ","-","<br>Mana Cost: 20",""]},
{data:d352, key:"352", code:278, name:"Wake of Inferno", i:27, req:[24,20], reqlvl:24, level:0, extra_levels:0, force_levels:0, bindable:1, damaging:{attack:0,spell:1}, description:"Trap that sprays fire at passing enemies", syn_title:"<br>Wake of Inferno Receives Bonuses From:<br>", syn_text:"Wake of Fire: +0.04 seconds Channel Time per Level<br>Fire Blast: +13% Fire Damage per Level<br>Wake of Fire: +20% Fire Damage per Level<br>Death Sentry: +13% Fire Damage per Level", graytext:"", index:[1," seconds"], text:["Shoots 10 Times<br>Channel time: ","Fire Damage: ","-","<br>Mana Cost: 20",""]},
{data:d361, key:"361", code:279, name:"Death Sentry", i:28, req:[26,23,21,20], reqlvl:30, level:0, extra_levels:0, force_levels:0, bindable:1, damaging:{attack:0,spell:1}, description:"Trap that shoots lightning at your enemies<br>or explodes nearby corpses laying waste to more enemies", syn_title:"<br>Death Sentry Receives Bonuses From:<br>", syn_text:"Fire Blast: +1 Shot per 3 Levels<br>Lightning Sentry: +15% Lightning Damage per Level", graytext:"", index:[1," Times"], text:["Corpse Explosion Damage: 21-29 percent of corpse life<br>Shoots ","Radius: "," yards<br>Lightning Damage: ","-","<br>Mana Cost: 20",""]},
{data:d363, key:"363", code:280, name:"Blade Shield", i:29, req:[25,22,24,20], reqlvl:30, level:0, extra_levels:0, force_levels:0, effect:0, damaging:{attack:1,spell:0}, bindable:1, description:"Spinning blades slice enemies<br>who stray too close<br><br>Deals 50% of Weapon Damage", syn_title:"<br>Blade Shield Receives Bonuses From:<br>", syn_text:"Blade Throw: +7% Damage per Level<br>Blade Fury: +7% Damage per Level", graytext:"", index:[0,""], text:["Shoots "," blade(s)<br>Duration: "," seconds<br>Damage: ","-","<br>Attack Rating: +"," percent<br>Mana Cost: ",""]}
];
