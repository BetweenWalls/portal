
var character_druid = {class_name:"Druid", strength:15, dexterity:20, vitality:25, energy:20, life:55, mana:20, stamina:184, levelup_life:1.5, levelup_stamina:1, levelup_mana:2, ar_per_dexterity:5, life_per_vitality:2, stamina_per_vitality:1, mana_per_energy:2, starting_strength:15, starting_dexterity:20, starting_vitality:25, starting_energy:20, ar_const:5, block_const:6, skill_layout:"./images/skill_trees/PoD/druid.png", mana_regen:1.66,	// block_const = 5 while shapeshifted
	weapon_frames:{dagger:18, sword:[18,20], axe:[18,16], mace:[18,16], thrown:[18,18], staff:16, polearm:16, scepter:18, wand:18, javelin:18, spear:22, bow:15, crossbow:19},
	wereform_frames:{dagger:22, sword:[22,25], axe:[22,20], mace:[22,23], thrown:[22,22], staff:20, polearm:20, scepter:22, wand:22, javelin:27, spear:27, bow:19, crossbow:24},	// incorrect info?
	// Skills that may adjust IAS breakpoints: Feral Rage, Hunger, Rabies, Fury
	fcr_frames:18, fcr_bp:[0, 4, 10, 19, 30, 46, 68, 99, 163],
	fcr_frames_werebear:16, fcr_bp_werebear:[0, 7, 15, 26, 40, 63, 99, 163],
	fcr_frames_werewolf:16, fcr_bp_werewolf:[0, 6, 14, 26, 40, 60, 95, 157],
	fhr_frames:13, fhr_bp:[0, 5, 10, 16, 26, 39, 56, 86, 152, 377],
	fhr_frames_alt:14, fhr_bp_alt:[0, 3, 7, 13, 19, 29, 42, 63, 99, 174, 456],	// 1-hand swinging weapons (axes, maces, swords, throwing axes, wands)
	fhr_frames_werebear:13, fhr_bp_werebear:[0, 5, 10, 16, 24, 37, 54, 86, 152, 360],
	fhr_frames_werewolf:7, fhr_bp_werewolf:[0, 9, 20, 42, 86, 280],
	fbr_frames:11, fbr_bp:[0, 6, 13, 20, 32, 52, 86, 174, 600],
	fbr_frames_werebear:12, fbr_bp_werebear:[0, 5, 10, 16, 27, 40, 65, 109, 223],
	fbr_frames_werewolf:9, fbr_bp_werewolf:[0, 7, 15, 27, 48, 86, 200],
	
	// getSkillData - gets skill info from the skills data table
	//	skill: skill object for the skill in question
	//	lvl: level of the skill
	//	elem: which element of the skill to return
	// result: value of the skill element at the specified level
	// ---------------------------------
	getSkillData : function(skill, lvl, elem) {
		var result = skill.data.values[elem][lvl];
		
		if (skill.name == "Firestorm" && elem > 0 && elem < 3) { 		result *= ((1 + (0.30*skills[1].level + 0.30*skills[4].level)) * (1+character.fDamage/100)) }
		if (skill.name == "Flame Dash" && elem == 0) { 					result = Math.min(8,Math.max(0.5, (8.4 - 0.4*skill.level))) }
		if (skill.name == "Flame Dash" && elem < 3 && elem > 0) { 		result *= ((1 + 0.10*skills[1].level + 0.01*((character.energy + character.all_attributes)*(1+character.max_energy/100))) * (1+character.fDamage/100)) }
		if (skill.name == "Molten Boulder" && elem < 2) { 				result *= (1 + (0.20*skills[7].level)) }
		if (skill.name == "Molten Boulder" && elem > 1 && elem < 4) { 	result *= ((1 + (0.23*skills[0].level)) * (1+character.fDamage/100)) }
		if (skill.name == "Molten Boulder" && elem > 3 && elem < 6) { 	result *= ((1 + (0.17*skills[0].level)) * (1+character.fDamage/100)) }
		if (skill.name == "Fissure" && elem < 2) { 						result *= ((1 + (0.15*skills[0].level + 0.15*skills[7].level)) * (1+character.fDamage/100)) }
		if (skill.name == "Volcano" && elem < 2) { 						result *= (1 + (0.20*skills[1].level)) }
		if (skill.name == "Volcano" && elem > 1 && elem < 4) { 			result *= ((1 + (0.14*skills[4].level + 0.14*skills[9].level)) * (1+character.fDamage/100)) }
		if (skill.name == "Armageddon" && elem == 0) { 					result += (2*skills[4].level) }
		if (skill.name == "Armageddon" && elem < 3 && elem > 0) { 		result *= (1 + (0.12*skills[1].level)) }
		if (skill.name == "Armageddon" && elem < 5 && elem > 2) { 		result *= ((1 + (0.12*skills[0].level + 0.12*skills[7].level)) * (1+character.fDamage/100)) }
		if (skill.name == "Arctic Blast" && elem < 2) { 				result *= ((1 + (0.10*skills[5].level + 0.10*skills[10].level)) * (1+character.cDamage/100)) }
		if (skill.name == "Twister" && elem < 2) { 						result *= (1 + (0.30*skills[8].level + 0.30*skills[10].level)) }
		if (skill.name == "Tornado" && elem < 2) { 						result *= (1 + (0.07*skills[5].level + 0.18*skills[6].level + 0.18*skills[10].level)) }
		if (skill.name == "Hurricane" && elem == 0) { 					result += (2*skills[5].level) }
		if (skill.name == "Hurricane" && elem < 3 && elem > 0) { 		result *= ((1 + (0.04*skills[3].level + 0.04*skills[6].level + 0.04*skills[8].level)) * (1+character.cDamage/100)) }
		
		if (skill.name == "Werewolf" && elem == 0) { if (skills[12].level > 0) { result = (10 + skills[12].data.values[1][skills[12].level+skills[12].extra_levels]) } else { result = 10 } }
		if (skill.name == "Werewolf" && elem == 3) { if (skills[12].level > 0) { result = (skills[12].data.values[0][skills[12].level+skills[12].extra_levels]) } else { result = 0 } }
		if (skill.name == "Werebear" && elem == 0) { if (skills[12].level > 0) { result = (15 + skills[12].data.values[1][skills[12].level+skills[12].extra_levels]) } else { result = 15 } }
		if (skill.name == "Werebear" && elem == 1) { if (skills[12].level > 0) { result += (skills[12].data.values[0][skills[12].level+skills[12].extra_levels]) } }
		if (skill.name == "Fire Claws" && elem < 2) {							 result *= ((1 + (0.10*skills[0].level + 0.10*skills[1].level + 0.10*skills[7].level + 0.10*skills[9].level)) * (1+character.fDamage/100)) }
		if (skill.name == "Shock Wave" && elem < 2) {							 result *= (1 + (0.08*skills[15].level)) }
		if (skill.name == "Rabies" && elem > 0 && elem < 3) {					 result *= ((1 + (0.20*skills[22].level + 0.20*skills[27].level)) * (1+character.pDamage/100)) }

		if (skill.name == "Raven" && elem < 3 && elem > 0) { 			result *= (1 + (0.20*skills[5].level + 0.20*skills[6].level + character.summon_damage/100)) }
		if (skill.name == "Raven" && elem < 5 && elem > 2) { 			result *= ((1 + 0.21*skills[3].level + 0.01*((character.energy + character.all_attributes)*(1+character.max_energy/100)) + character.summon_damage/100) * (1+character.cDamage/100)) }
		if (skill.name == "Summon Spirit Wolf" && elem == 0) { 			result = Math.min(7, skill.level) }
		if (skill.name == "Summon Spirit Wolf" && elem == 1) { if (skills[27].level > 0) { result = ((1 + (skills[27].data.values[6][skills[27].level+skills[27].extra_levels] / 100)) * skill.data.values[elem][character.difficulty]) } else { result = skill.data.values[elem][character.difficulty] } }
		if (skill.name == "Summon Spirit Wolf" && elem < 4 && elem > 1) { if (skills[30].level > 0) { result *= (1 + (skills[30].data.values[5][skills[30].level+skills[30].extra_levels] / 100) + character.summon_damage/100) } else { result *=  (1+character.summon_damage/100) } }
		if (skill.name == "Summon Dire Wolf" && elem == 0) { 			result = Math.min(3, skill.level) }
		if (skill.name == "Summon Dire Wolf" && elem == 1) { if (skills[24].level > 0) { result = skills[24].data.values[4][skills[24].level+skills[24].extra_levels] } else { result = 0 } }
		if (skill.name == "Summon Dire Wolf" && elem == 2) { if (skills[24].level > 0) { result = skills[24].data.values[5][skills[24].level+skills[24].extra_levels] } else { result = 0 } }
		if (skill.name == "Summon Dire Wolf" && elem == 3) { if (skill.level > 0) { result = ((1 + (skill.data.values[6][skill.level] / 100)) * skill.data.values[elem][character.difficulty]) } else { result = skill.data.values[elem][character.difficulty] } }	// Oak Sage...? (1 + ~~skills[26].data.values[1][skills[26].level+skills[26].extra_levels]/100)
		if (skill.name == "Summon Dire Wolf" && elem < 6 && elem > 3) { if (skills[30].level > 0) { result *= (1 + (skills[30].data.values[5][skills[30].level+skills[30].extra_levels] / 100) + character.summon_damage/100) } else { result *= (1+character.summon_damage/100) } }	// Heart of Wolverine:  + (~~skills[23].data.values[1][skills[23].level+skills[23].extra_levels]/100)
		if (skill.name == "Summon Grizzly" && elem == 0) { if (skills[27].level > 0) { result = ((1 + (skills[27].data.values[6][skills[27].level+skills[27].extra_levels] / 100)) * skill.data.values[elem][character.difficulty]) } else { result = skill.data.values[elem][character.difficulty] } }
		if (skill.name == "Summon Grizzly" && elem == 1) { if (skills[24].level > 0) { result = skills[24].data.values[4][skills[24].level+skills[24].extra_levels] } else { result = 0 } }
		if (skill.name == "Summon Grizzly" && elem == 2) { if (skills[24].level > 0) { result = skills[24].data.values[5][skills[24].level+skills[24].extra_levels] } else { result = 0 } }
		if (skill.name == "Summon Grizzly" && elem > 2 && elem < 5) { 	result *= (1+character.summon_damage/100) }
		if (skill.name == "Poison Creeper" && elem > 0 && elem < 3) { 	result *= (1+character.summon_damage/100) }
		if ((skill.name == "Poison Creeper" || skill.name == "Heart of Wolverine" || skill.name == "Carrion Vine" || skill.name == "Oak Sage" || skill.name == "Solar Creeper" || skill.name == "Spirit of Barbs") && elem == 0) { result = skill.data.values[elem][character.difficulty][lvl] }
		
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
		var lycan_damage = Math.min(1,(skills[12].level+skills[12].force_levels))*~~(skills[12].data.values[0][skills[12].level+skills[12].extra_levels]);
		var lycan_life = Math.min(1,(skills[12].level+skills[12].force_levels))*~~(skills[12].data.values[1][skills[12].level+skills[12].extra_levels]);
		
		if (skill.name == "Werewolf") {	// cannot be used with Werebear
			if (effects[id].info.enabled == 1) { disableEffect("Werebear") }
			result.max_life = (10 + lycan_life); result.max_stamina = 40; result.ar_bonus = skill.data.values[1][lvl]; result.ias_skill = skill.data.values[2][lvl]; result.damage_bonus = lycan_damage; result.duration = 1040;
		}
		if (skill.name == "Werebear") {	// cannot be used with Werewolf
			if (effects[id].info.enabled == 1) { disableEffect("Werewolf") }
			result.max_life = (15 + lycan_life); result.damage_bonus = skill.data.values[1][lvl] + lycan_damage; result.defense_bonus = skill.data.values[2][lvl]; result.duration = 1040;
		}
		if (skill.name == "Feral Rage") { result.velocity = skill.data.values[1][lvl]; result.life_leech = skill.data.values[3][lvl]; result.duration = 20; }	// TODO: Should only be useable with Werewolf
		if (skill.name == "Maul") { result.damage_bonus = skill.data.values[2][lvl]; result.duration = 20; }	// TODO: Should only be useable with Werebear
		if (skill.name == "Heart of Wolverine") {
			if (effects[id].info.enabled == 1) { for (effect_id in effects) { if (effect_id != id && effect_id.split("-")[0] == id) { disableEffect(effect_id) } } }
			result.damage_bonus = skill.data.values[1][lvl]; result.ar_bonus = skill.data.values[2][lvl]; result.radius = skill.data.values[3][lvl];
		}
		if (skill.name == "Oak Sage") {
			if (effects[id].info.enabled == 1) { for (effect_id in effects) { if (effect_id != id && effect_id.split("-")[0] == id) { disableEffect(effect_id) } } }
			result.max_life = skill.data.values[1][lvl]; result.radius = skill.data.values[2][lvl];
		}
		if (skill.name == "Spirit of Barbs") {
			if (effects[id].info.enabled == 1) { for (effect_id in effects) { if (effect_id != id && effect_id.split("-")[0] == id) { disableEffect(effect_id) } } }
			result.thorns_reflect = skill.data.values[1][lvl]; result.radius = skill.data.values[2][lvl];
		}
		if (skill.name == "Carrion Vine") { result.life_regen = skill.data.values[1][lvl]; }	// Check if "Heals: X percent" is equivalent to life_regen
		if (skill.name == "Solar Creeper") { result.mana_regen = skill.data.values[1][lvl]; }	// Check if "Mana Recovery Rate: X" is equivalent to mana_regen
		if (skill.name == "Cyclone Armor") {
			if (effects[id].info.enabled == 1) { for (effect_id in effects) { if (effect_id != id && effect_id.split("-")[0] == id) { disableEffect(effect_id) } } }
			result.absorb_elemental = skill.data.values[0][lvl];
		}
		// No stat buffs:
		if (skill.name == "Armageddon") { result.duration = skill.data.values[0][lvl]; }
		if (skill.name == "Hurricane") { result.duration = skill.data.values[0][lvl]; }
		if (skill.name == "Poison Creeper") {  }
		if (skill.name == "Raven") { result.amountSummoned = skill.data.values[0][lvl]; }
		if (skill.name == "Summon Spirit Wolf") { result.amountSummoned = skill.data.values[0][lvl]; }
		if (skill.name == "Summon Dire Wolf") { result.amountSummoned = skill.data.values[0][lvl]; }
		if (skill.name == "Summon Grizzly") { result.amountSummoned = 1+character.extraGrizzly; }
		
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
		var damage_enhanced = character.damage_bonus + character.e_damage;
		
		if (skill.name == "Firestorm") { 				attack = 0; spell = 1; fDamage_min = character.getSkillData(skill,lvl,1); fDamage_max = character.getSkillData(skill,lvl,2); }
		else if (skill.name == "Molten Boulder") { 		attack = 0; spell = 1; damage_min = character.getSkillData(skill,lvl,0); damage_max = character.getSkillData(skill,lvl,1); fDamage_min = character.getSkillData(skill,lvl,2); fDamage_max = character.getSkillData(skill,lvl,3); }
		else if (skill.name == "Flame Dash") { 			attack = 0; spell = 1; fDamage_min = character.getSkillData(skill,lvl,1); fDamage_max = character.getSkillData(skill,lvl,2); }
		else if (skill.name == "Arctic Blast") { 		attack = 0; spell = 1; cDamage_min = character.getSkillData(skill,lvl,0); cDamage_max = character.getSkillData(skill,lvl,1); }
		else if (skill.name == "Fissure") { 			attack = 0; spell = 1; fDamage_min = character.getSkillData(skill,lvl,0); fDamage_max = character.getSkillData(skill,lvl,1); }
		else if (skill.name == "Twister") { 			attack = 0; spell = 1; damage_min = character.getSkillData(skill,lvl,0); damage_max = character.getSkillData(skill,lvl,1); }
		else if (skill.name == "Volcano") { 			attack = 0; spell = 1; damage_min = character.getSkillData(skill,lvl,0); damage_max = character.getSkillData(skill,lvl,1); fDamage_min = character.getSkillData(skill,lvl,2); fDamage_max = character.getSkillData(skill,lvl,3); }
		else if (skill.name == "Tornado") { 			attack = 0; spell = 1; damage_min = character.getSkillData(skill,lvl,0); damage_max = character.getSkillData(skill,lvl,1); }
		else if (skill.name == "Armageddon") {			attack = 0; spell = 1; damage_min = character.getSkillData(skill,lvl,1); damage_max = character.getSkillData(skill,lvl,2); fDamage_min = character.getSkillData(skill,lvl,3); fDamage_max = character.getSkillData(skill,lvl,4); }
		else if (skill.name == "Hurricane") {			attack = 0; spell = 1; cDamage_min = character.getSkillData(skill,lvl,1); cDamage_max = character.getSkillData(skill,lvl,2); }
		else if (skill.name == "Feral Rage") {			attack = 1; spell = 0; ar_bonus = character.getSkillData(skill,lvl,5); damage_bonus = character.getSkillData(skill,lvl,4); }
		else if (skill.name == "Maul") { 				attack = 1; spell = 0; ar_bonus = character.getSkillData(skill,lvl,3); damage_bonus = character.getSkillData(skill,lvl,2); }
		else if (skill.name == "Rabies") { 				attack = 1; spell = 0; ar_bonus = character.getSkillData(skill,lvl,0); pDamage_min = character.getSkillData(skill,lvl,1); pDamage_max = character.getSkillData(skill,lvl,2); pDamage_duration = 4; }
		else if (skill.name == "Fire Claws") {			attack = 1; spell = 0; ar_bonus = character.getSkillData(skill,lvl,2); fDamage_min = character.getSkillData(skill,lvl,0); fDamage_max = character.getSkillData(skill,lvl,1); }
		else if (skill.name == "Hunger") { 				attack = 1; spell = 0; ar_bonus = character.getSkillData(skill,lvl,2); damage_bonus = -75; }
		else if (skill.name == "Shock Wave") {			attack = 1; spell = 0; weapon_damage = 25; damage_min = character.getSkillData(skill,lvl,0); damage_max = character.getSkillData(skill,lvl,1); }
		else if (skill.name == "Fury") { 				attack = 1; spell = 0; ar_bonus = character.getSkillData(skill,lvl,1); damage_bonus = character.getSkillData(skill,lvl,2); }
		else if (skill.name == "Raven") { 				attack = 0; spell = 1; damage_min = character.getSkillData(skill,lvl,1); damage_max = character.getSkillData(skill,lvl,2); cDamage_min = character.getSkillData(skill,lvl,3); cDamage_max = character.getSkillData(skill,lvl,4); }
		else if (skill.name == "Poison Creeper") { 		attack = 0; spell = 1; pDamage_min = character.getSkillData(skill,lvl,1); pDamage_max = character.getSkillData(skill,lvl,2); pDamage_duration = 5; }
		else if (skill.name == "Summon Spirit Wolf") {	attack = 0; spell = 1; damage_min = character.getSkillData(skill,lvl,2); damage_max = character.getSkillData(skill,lvl,3); ar_bonus = character.getSkillData(skill,lvl,4); }
		else if (skill.name == "Summon Dire Wolf") {	attack = 0; spell = 1; damage_min = character.getSkillData(skill,lvl,4); damage_max = character.getSkillData(skill,lvl,5); ar_bonus = character.getSkillData(skill,lvl,1); }
		else if (skill.name == "Summon Grizzly") { 		attack = 0; spell = 1; damage_min = character.getSkillData(skill,lvl,3); damage_max = character.getSkillData(skill,lvl,4); ar_bonus = character.getSkillData(skill,lvl,1); }
		
		if (skill.name == "Feral Rage" || skill.name == "Rabies" || skill.name == "Fury" || skill.name == "Maul" || skill.name == "Shock Wave" || skill.name == "Fire Claws" || skill.name == "Hunger") {
			var match = 0;
			var sk_wolf = skills[11].name.split(' ').join('_');
			var sk_bear = skills[13].name.split(' ').join('_');
			if (document.getElementById(sk_wolf) != null) { if (effects[sk_wolf].info.enabled == 1) { if (skill.name == "Feral Rage" || skill.name == "Rabies" || skill.name == "Fury" || skill.name == "Fire Claws" || skill.name == "Hunger") { match = 1 } } }
			if (document.getElementById(sk_bear) != null) { if (effects[sk_bear].info.enabled == 1) { if (skill.name == "Maul" || skill.name == "Shock Wave" || skill.name == "Fire Claws" || skill.name == "Hunger") { match = 1 } } }
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
	},
	
	// setSkillAmounts - helps update class-related skill levels, called by calculateSkillAmounts()
	//	s: index of skill
	// ---------------------------------
	setSkillAmounts : function(s) {
		skills[s].extra_levels += character.skills_druid
		if (s == 0 || s == 1 || s == 2 || s == 4 || s == 7 || s == 9 || s == 17) { skills[s].extra_levels += character.skills_fire_all }
		if (s == 3 || s == 10 || s == 21) { skills[s].extra_levels += character.skills_cold_all }
		if (s == 16 || s == 22) { skills[s].extra_levels += character.skills_poison_all }
		if (s < 11) {
			skills[s].extra_levels += character.skills_elemental
			skills[s].extra_levels += character.skills_tree1
		} else if (s > 20) {
			skills[s].extra_levels += character.skills_summoning_druid
			skills[s].extra_levels += character.skills_tree3
		} else {
			skills[s].extra_levels += character.skills_shapeshifting
			skills[s].extra_levels += character.skills_tree2
		}
	}
};

/*[ 0] Firestorm		*/ var d111 = {values:[
		["fire spread",0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,70,], 
		["fire min",2,4,7,9,11,14,16,18,25,32,39,46,53,60,67,75,85,96,106,117,127,138,158,178,198,217,237,257,294,330,366,402,439,475,511,547,584,620,656,693,730,766,802,839,875,911,948,984,1020,1057,1093,1129,1166,1202,1238,1275,1311,1347,1383,1420,], 
		["fire max",3,7,10,14,17,21,24,28,36,44,52,60,69,77,85,93,105,117,128,140,152,164,185,206,227,248,269,290,328,365,403,440,478,515,552,589,628,665,702,740,778,815,853,890,928,965,1003,1040,1078,1115,1153,1190,1228,1265,1303,1340,1378,1415,1453,1490,], 
		["mana cost",4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13,13.5,14,14.5,15,15.5,16,16.5,17,17.5,18,18.5,19,19.5,20,20.5,21,21.5,22,22.5,23,23.5,24,24.5,25,25.5,26,26.5,27,27.5,28,28.5,29,29.5,30,30.5,31,31.5,32,32.5,33,33.5,], 
]};
/*[ 1] Molten Boulder	*/ var d121 = {values:[
		["damage min",1,3,5,7,9,11,13,15,20,25,30,35,40,45,50,55,67,79,91,103,115,127,146,165,184,203,222,241,268,295,322,349,376,403,430,457,484,511,538,565,592,619,646,673,700,727,754,781,808,835,862,889,916,943,970,997,1024,1051,1078,1105,], 
		["damage max",2,5,8,11,14,17,20,23,29,35,41,47,53,59,65,71,84,97,110,123,136,149,169,189,209,229,249,269,297,325,353,381,409,437,465,493,521,549,577,605,633,661,689,717,745,773,801,829,857,885,913,941,969,997,1025,1053,1081,1109,1137,1165,], 
		["fire min",2,3,7,10,11,14,15,20,24,28,32,36,40,44,48,52,59,70,80,92,103,114,142,170,198,226,254,282,322,362,402,442,482,522,562,602,642,682,722,762,802,842,882,922,962,1002,1042,1082,1122,1162,1202,1242,1282,1322,1362,1402,1442,1482,1522,1562,], 
		["fire max",3,7,12,15,19,22,24,31,37,44,49,54,61,67,72,78,85,98,111,124,138,151,185,219,253,287,321,355,401,447,493,539,585,631,677,723,769,815,861,907,953,999,1045,1091,1137,1183,1229,1275,1321,1367,1413,1459,1505,1551,1597,1643,1689,1735,1781,1827,], 
		["avg fire min",1,3,4,8,9,12,15,16,21,26,31,36,39,44,50,54,64,73,83,92,102,111,122,132,143,153,164,174,186,198,210,221,233,245,257,269,281,293,305,317,329,341,353,365,377,389,401,413,425,437,449,461,473,485,497,509,521,533,545,557,], 
		["avg fire max",2,3,7,9,10,14,15,18,22,27,32,37,42,45,50,56,65,74,84,93,103,112,123,133,144,154,165,176,188,199,211,223,234,246,258,270,282,294,306,318,330,342,354,366,378,390,402,414,426,438,450,462,474,486,498,510,522,534,546,558,], 
		["mana cost",10,10.5,11,11.5,12,12.5,13,13.5,14,14.5,15,15.5,16,16.5,17,17.5,18,18.5,19,19.5,20,20.5,21,21.5,22,22.5,23,23.5,24,24.5,25,25.5,26,26.5,27,27.5,28,28.5,29,29.5,30,30.5,31,31.5,32,32.5,33,33.5,34,34.5,35,35.5,36,36.5,37,37.5,38,38.5,39,39.5,], 
]};
/*[ 2] Flame Dash		*/ var d122 = {values:[
		["cooldown",], 
		["fire min",40,55,70,85,100,115,130,145,165,185,205,225,245,265,285,305,335,365,395,425,455,485,525,565,605,645,685,725,775,825,875,925,975,1025,1075,1125,1175,1225,1275,1325,1375,1425,1475,1525,1575,1625,1675,1725,1775,1825,1875,1925,1975,2025,2075,2125,2175,2225,2275,2325,], 
		["fire max",47,63,79,95,111,127,143,159,180,201,222,243,264,285,306,327,357,387,417,447,477,507,547,587,627,667,707,747,797,847,897,947,997,1047,1097,1147,1197,1247,1297,1347,1397,1447,1497,1547,1597,1647,1697,1747,1797,1847,1897,1947,1997,2047,2097,2147,2197,2247,2297,2347,], 
		["mana cost",30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,], 
]};
/*[ 3] Arctic Blast		*/ var d123 = {values:[
		["cold min",16.66,47.91,79.16,110.41,141.66,172.91,204.16,235.41,276.3,316.66,357.28,397.91,438.53,479.16,519.78,560.41,608.33,656.25,704.16,752.8,800,847.91,910.41,972.91,1035.41,1097.91,1160.41,1222.91,1307.28,1391.5,1476.3,1560.41,1644.78,1729.16,1745.75,1897.91,1982.28,2066.66,2151.3,2235.41,2319.78,2404.16,2488.53,2572.91,2657.28,2741.66,2826.3,2910.41,2994.78,3079.16,3163.53,3247.91,3332.28,3416.66,3501.3,3585.41,3669.78,3754.16,3838.53,3922.91,], 
		["cold max",33.33,64.58,95.83,127.8,158.33,189.58,220.83,252.8,294.26,336.45,378.64,420.83,463.1,505.2,547.39,589.58,644.78,700,755.2,810.41,865.62,920.83,994.78,1068.75,1142.7,1216.66,1290.62,1364.58,1463.53,1562.45,1661.45,1760.41,1859.37,1958.33,1969.32,2156.25,2255.2,2354.16,2453.12,2552.8,2651.3,2750,2848.95,2947.91,3046.87,3145.83,3244.78,3343.75,3442.7,3541.66,3640.62,3739.58,3838.53,3937.5,4036.45,4135.41,4234.37,4333.33,4432.28,4531.25,], 
		["cold length",4,4.6,5.2,5.8,6.4,7,7.6,8.2,8.8,9.4,10,10.6,11.2,11.8,12.4,13,13.6,14.2,14.8,15.4,16,16.6,17.2,17.8,18.4,19,19.6,20.2,20.8,21.4,22,22.6,23.2,23.8,24.4,25,25.6,26.2,26.8,27.4,28,28.6,29.2,29.8,30.4,31,31.6,32.2,32.8,33.4,34,34.6,35.2,35.8,36.4,37,37.6,38.2,38.8,39.4,], 
		["range",5.3,6,6,6.6,6.6,7.3,7.3,8,8,8.6,8.6,9.3,9.3,10,10,10.6,10.6,11.3,11.3,12,12,12.6,12.6,13.3,13.3,14,14,14.6,14.6,15.3,15.3,16,16,16.6,16.6,17.3,17.3,18,18,18.6,18.6,19.3,19.3,20,20,20.6,20.6,21.3,21.3,22,22,22.6,22.6,23.3,23.3,24,24,24.6,24.6,25.3,], 
		["mana cost",4,4,5,5,5,5,5,6,6,6,6,6,7,7,7,7,7,8,8,8,8,8,9,9,9,9,9,10,10,10,10,10,11,11,11,11,11,12,12,12,12,12,13,13,13,13,13,14,14,14,14,14,15,15,15,15,15,16,16,16,], 
]};
/*[ 4] Fissure			*/ var d131 = {values:[
		["fire min",15,23,30,38,47,55,63,70,84,98,112,127,141,155,169,183,203,223,243,263,283,303,329,355,381,407,433,459,491,523,555,587,619,651,683,715,747,779,811,843,875,907,939,971,1003,1035,1067,1099,1131,1163,1195,1227,1259,1291,1323,1355,1387,1419,1451,1483,], 
		["fire max",25,35,45,55,65,75,85,95,112,127,143,158,175,190,207,223,244,267,289,311,333,355,383,411,439,467,495,523,558,593,628,663,698,733,768,803,838,873,908,943,978,1013,1048,1083,1118,1153,1188,1223,1258,1293,1328,1363,1398,1433,1468,1503,1538,1573,1608,1643,], 
]};
/*[ 5] Cyclone Armor	*/ var d133 = {values:[
		["absorb",60,90,120,150,180,210,240,270,300,330,360,390,420,450,480,510,540,570,600,630,660,690,720,750,780,810,840,870,900,930,960,990,1020,1050,1080,1110,1140,1170,1200,1230,1260,1290,1320,1350,1380,1410,1440,1470,1500,1530,1560,1590,1620,1650,1680,1710,1740,1770,1800,1830,], 
		["mana cost",5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,], 
]};
/*[ 6] Twister			*/ var d142 = {values:[
		["damage min",12,20,28,36,44,52,60,68,78,88,98,108,118,128,138,148,164,180,196,212,228,244,268,292,316,340,364,388,418,448,478,508,538,568,598,628,658,688,718,748,778,808,838,868,898,928,958,988,1018,1048,1078,1108,1138,1168,1198,1228,1258,1288,1318,1348,], 
		["damage max",16,24,32,40,48,56,64,72,82,92,102,112,122,132,142,152,168,184,200,216,232,248,272,296,320,344,368,392,422,452,482,512,542,572,602,632,662,692,722,752,782,812,842,872,902,932,962,992,1022,1052,1082,1112,1142,1172,1202,1232,1262,1292,1322,1352,], 
]};
/*[ 7] Volcano			*/ var d151 = {values:[
		["damage min",8,10,12,13,16,18,19,22,25,29,33,38,41,45,49,53,59,65,71,77,84,90,104,118,132,146,160,174,192,210,228,246,264,282,300,318,336,354,372,390,408,426,444,462,480,498,516,534,552,570,588,606,624,642,660,678,696,714,732,750,], 
		["damage max",10,13,16,18,22,24,28,30,37,43,48,54,60,66,72,78,88,98,108,118,129,139,155,171,187,203,219,235,257,279,301,323,345,367,389,411,433,455,477,499,521,543,565,587,609,631,653,675,697,719,741,763,785,807,829,851,873,895,917,939,], 
		["fire min",8,10,11,13,16,18,19,22,25,30,33,38,41,46,50,54,60,66,72,77,84,90,98,106,114,122,130,138,149,160,171,182,193,204,215,226,237,248,259,270,281,292,303,314,325,336,347,358,369,380,391,402,413,424,435,446,457,468,479,490,], 
		["fire max",10,11,13,16,18,19,22,24,27,32,36,39,44,47,52,55,61,68,74,80,86,92,100,108,116,124,132,140,153,166,179,192,205,218,231,244,257,270,283,296,309,322,335,348,361,374,387,400,413,426,439,452,465,478,491,504,517,530,543,556,], 
]};
/*[ 8] Tornado			*/ var d152 = {values:[
		["damage min",25,34,45,54,65,74,85,94,112,129,146,162,180,197,214,230,256,281,306,330,356,381,411,441,471,501,531,561,597,633,669,705,741,777,813,849,885,921,957,993,1029,1065,1101,1137,1173,1209,1245,1281,1317,1353,1389,1425,1461,1497,1533,1569,1605,1641,1677,1713,], 
		["damage max",35,46,58,70,82,94,106,118,138,157,176,194,214,233,252,270,298,325,352,378,406,433,465,497,529,561,593,625,663,701,739,777,815,853,891,929,967,1005,1043,1081,1119,1157,1195,1233,1271,1309,1347,1385,1423,1461,1499,1537,1575,1613,1651,1689,1727,1765,1803,1841,], 
]};
/*[ 9] Armageddon		*/ var d161 = {values:[
		["duration",12,12.2,12.4,12.6,12.8,13,13.2,13.4,13.6,13.8,14,14.2,14.4,14.6,14.8,15,15.2,15.4,15.6,15.8,16,16.2,16.4,16.6,16.8,17,17.2,17.4,17.6,17.8,18,18.2,18.4,18.6,18.8,19,19.2,19.4,19.6,19.8,20,20.2,20.4,20.6,20.8,21,21.2,21.4,21.6,21.8,22,22.2,22.4,22.6,22.8,23,23.2,23.4,23.6,23.8,], 
		["damage min",16,31,47,63,79,96,112,128,152,176,200,223,247,271,296,320,352,384,416,448,480,512,552,592,632,672,712,752,800,848,896,944,992,1040,1088,1136,1184,1232,1280,1328,1376,1424,1472,1520,1568,1616,1664,1712,1760,1808,1856,1904,1952,2000,2048,2096,2144,2192,2240,2288,], 
		["damage max",64,79,96,112,128,144,160,176,204,231,260,288,315,344,371,400,436,471,508,544,580,616,664,712,760,808,856,904,958,1012,1066,1120,1174,1228,1282,1336,1390,1444,1498,1552,1606,1660,1714,1768,1822,1876,1930,1984,2038,2092,2146,2200,2254,2308,2362,2416,2470,2524,2578,2632,], 
		["fire min",40,52,64,76,88,100,111,123,144,164,184,203,223,244,264,284,307,331,356,380,404,428,458,488,518,548,578,608,646,684,722,760,798,836,874,912,950,988,1026,1064,1102,1140,1178,1216,1254,1292,1330,1368,1406,1444,1482,1520,1558,1596,1634,1672,1710,1748,1786,1824,], 
		["fire max",75,89,102,117,131,144,159,173,197,221,244,269,293,317,340,365,390,417,443,469,495,521,553,585,617,649,681,713,753,793,833,873,913,953,993,1033,1073,1113,1153,1193,1233,1273,1313,1353,1393,1433,1473,1513,1553,1593,1633,1673,1713,1753,1793,1833,1873,1913,1953,1993,], 
]};
/*[10] Hurricane		*/ var d162 = {values:[
		["duration",14.2,14.4,14.6,14.8,15,15.2,15.4,15.6,15.8,16,16.2,16.4,16.6,16.8,17,17.2,17.4,17.6,17.8,18,18.2,18.4,18.6,18.8,19,19.2,19.4,19.6,19.8,20,20.2,20.4,20.6,20.8,21,21.2,21.4,21.6,21.8,22,22.2,22.4,22.6,22.8,23,23.2,23.4,23.6,23.8,24,24.2,24.4,24.6,24.8,25,25.2,25.4,25.6,25.8,26,], 
		["cold min",48,68,88,107,128,147,168,188,215,244,271,300,328,355,384,412,452,492,531,571,612,652,708,764,820,876,933,988,1060,1132,1204,1276,1348,1420,1492,1564,1636,1708,1780,1852,1924,1996,2068,2140,2212,2284,2356,2428,2500,2572,2644,2716,2788,2860,2932,3004,3076,3148,3220,3292,], 
		["cold max",70,92,113,136,157,179,202,223,256,289,322,355,388,421,454,488,531,576,620,663,708,752,813,874,935,996,1057,1118,1194,1270,1346,1422,1498,1574,1650,1726,1802,1878,1954,2030,2106,2182,2258,2334,2410,2486,2562,2638,2714,2790,2866,2942,3018,3094,3170,3246,3322,3398,3474,3550,], 
]};

/*[11] Werewolf			*/ var d211 = {values:[
		["life",], 
		["attack rating",50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,620,630,640,], 
		["attack speed",36,45,52,58,62,66,69,71,74,76,78,79,81,82,83,85,85,86,87,88,88,89,90,91,91,91,92,92,93,93,94,94,94,94,94,95,95,96,96,96,96,97,97,97,97,97,97,97,98,98,98,98,98,99,99,99,99,99,99,100,], 
		["damage",], 
]};
/*[12] Lycanthropy		*/ var d212 = {values:[
		["damage",10,13,16,19,22,25,28,31,34,37,40,43,46,49,52,55,58,61,64,67,70,73,76,79,82,85,88,91,94,97,100,103,106,109,112,115,118,121,124,127,130,133,136,139,142,145,148,151,154,157,160,163,166,169,172,175,178,181,184,187,], 
		["life",3,7,11,15,19,23,27,31,35,39,43,47,51,55,59,63,67,71,75,79,83,87,91,95,99,103,107,111,115,119,123,127,131,135,139,143,147,151,155,159,163,167,171,175,179,183,187,191,195,199,203,207,211,215,219,223,227,231,235,239,], 
]};
/*[13] Werebear			*/ var d223 = {values:[
		["life",], 
		["damage",60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,620,630,640,650,], 
		["defense",25,35,45,55,65,75,85,95,105,115,125,135,145,155,165,175,185,195,205,215,225,235,245,255,265,275,285,295,305,315,325,335,345,355,365,375,385,395,405,415,425,435,445,455,465,475,485,495,505,515,525,535,545,555,565,575,585,595,605,615,], 
]};
/*[14] Feral Rage		*/ var d231 = {values:[
		["movement speed min",19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,], 
		["movement speed max",32,36,36,40,40,43,43,45,45,47,47,49,49,51,51,52,52,54,54,55,55,56,56,57,57,58,58,58,58,59,59,60,60,60,60,61,61,61,61,62,62,62,62,63,63,63,63,64,64,64,64,64,64,65,65,65,65,65,65,65,], 
		["life steal min",4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,], 
		["life steal max",13,18,23,28,33,38,43,48,53,58,63,68,73,78,83,88,93,98,103,108,113,118,123,128,133,138,143,148,153,158,163,168,173,178,183,188,193,198,203,208,213,218,223,228,233,238,243,248,253,258,263,268,273,278,283,288,293,298,303,308,], 
		["damage",50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,620,630,640,], 
		["attack rating",40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,620,630,], 
]};
/*[15] Maul				*/ var d233 = {values:[
		["stun length",1.7,2.3,2.8,3.2,3.4,3.7,3.9,4,4.2,4.4,4.5,4.6,4.7,4.8,4.8,5,5,5,5.1,5.2,5.2,5.2,5.3,5.4,5.4,5.4,5.4,5.4,5.5,5.5,5.6,5.6,5.6,5.6,5.6,5.6,5.6,5.7,5.7,5.7,5.7,5.8,5.8,5.8,5.8,5.8,5.8,5.8,5.8,5.8,5.8,5.8,5.8,5.9,5.9,5.9,5.9,5.9,5.9,5.9,], 
		["damage min",40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,40,], 
		["damage max",120,160,160,200,200,240,240,280,280,320,320,360,360,400,400,440,440,480,480,520,520,560,560,600,600,640,640,680,680,720,720,760,760,800,800,840,840,880,880,920,920,960,960,1000,1000,1040,1040,1080,1080,1120,1120,1160,1160,1200,1200,1240,1240,1280,1280,1320,], 
		["attack rating",40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,620,630,], 
]};
/*[16] Rabies			*/ var d241 = {values:[
		["attack rating",50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,620,630,640,], 
		["poison min",56,103,150,196,243,290,337,384,459,534,609,684,759,834,909,984,1096,1209,1321,1434,1546,1659,1828,1996,2165,2334,2503,2671,2906,3140,3374,3609,3843,4078,4312,4547,4781,5016,5250,5485,5718,5953,6187,6422,6656,6890,7124,7359,7593,7828,8062,8296,8530,8765,9000,9234,9468,9703,9937,10171,], 
		["poison max",131,178,225,271,318,365,412,459,534,609,684,759,834,909,984,1059,1171,1284,1396,1509,1621,1734,1903,2071,2240,2409,2578,2746,2981,3215,3449,3684,3918,4153,4387,4622,4856,5091,5325,5560,5793,6028,6262,6497,6731,6965,7199,7434,7668,7903,8137,8371,8605,8840,9075,9309,9543,9778,10012,10246,], 
]};
/*[17] Fire Claws		*/ var d242 = {values:[
		["fire min",15,27,39,51,63,75,87,99,123,147,171,195,219,243,267,291,324,357,390,423,456,489,527,565,603,641,679,717,755,793,831,869,907,945,983,1021,1059,1097,1135,1173,1211,1249,1287,1325,1363,1401,1439,1477,1515,1553,1591,1629,1667,1705,1743,1781,1819,1857,1895,1933,], 
		["fire max",20,38,56,74,92,110,128,146,176,206,236,266,296,326,356,386,423,460,497,534,571,608,651,694,737,780,823,866,909,952,995,1038,1081,1124,1167,1210,1253,1296,1339,1382,1425,1468,1511,1554,1597,1640,1683,1726,1769,1812,1855,1898,1941,1984,2027,2070,2113,2156,2199,2242,], 
		["attack rating",50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,620,630,640,], 
		["mana cost",4,4.1,4.2,4.3,4.5,4.6,4.7,4.8,5,5.1,5.2,5.3,5.5,5.6,5.7,5.8,6,6.1,6.2,6.3,6.5,6.6,6.7,6.8,7,7.1,7.2,7.3,7.5,7.6,7.7,7.8,8,8.1,8.2,8.3,8.5,8.6,8.7,8.8,9,9.1,9.2,9.3,9.5,9.6,9.7,9.8,10,10.1,10.2,10.3,10.5,10.6,10.7,10.8,11,11.1,11.2,11.3,], 
]};
/*[18] Hunger			*/ var d252 = {values:[
		["life steal",72,90,104,116,125,132,138,143,149,152,156,159,162,165,167,170,171,173,174,176,177,179,180,182,182,183,185,185,186,186,188,188,189,189,189,191,191,192,192,192,192,194,194,194,195,195,195,195,197,197,197,197,197,198,198,198,198,198,198,200,], 
		["mana steal",72,90,104,116,125,132,138,143,149,152,156,159,162,165,167,170,171,173,174,176,177,179,180,182,182,183,185,185,186,186,188,188,189,189,189,191,191,192,192,192,192,194,194,194,195,195,195,195,197,197,197,197,197,198,198,198,198,198,198,200,], 
		["attack rating",50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,620,630,640,], 
]};
/*[19] Shock Wave		*/ var d253 = {values:[
		["damage min",11,17,23,28,35,41,47,53,61,69,77,85,94,102,109,117,128,139,151,162,172,183,198,213,228,243,258,273,294,315,336,357,378,399,420,441,462,483,504,525,546,567,588,609,630,651,672,693,714,735,756,777,798,819,840,861,882,903,924,945,], 
		["damage max",21,28,37,45,53,61,69,77,87,97,107,117,128,138,148,158,172,184,197,210,222,235,252,269,286,303,320,337,357,377,397,417,437,457,477,497,517,537,557,577,597,617,637,657,677,697,717,737,757,777,797,817,837,857,877,897,917,937,957,977,], 
]};
/*[20] Fury				*/ var d261 = {values:[
		["hits",2,3,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,], 
		["attack bonus",50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,620,630,640,], 
		["damage",100,117,134,151,168,185,202,219,236,253,270,287,304,321,338,355,372,389,406,423,440,457,474,491,508,525,542,559,576,593,610,627,644,661,678,695,712,729,746,763,780,797,814,831,848,865,882,899,916,933,950,967,984,1001,1018,1035,1052,1069,1086,1103,], 
]};

/*[21] Raven			*/ var d312 = {values:[
		["ravens",2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,20,], 
		["damage min",1,2,3,4,5,6,7,8,10,12,14,16,18,20,22,24,27,30,33,36,39,42,49,56,63,70,77,84,94,104,114,124,134,144,154,164,174,184,194,204,214,224,234,244,254,264,274,284,294,304,314,324,334,344,354,364,374,384,394,404,], 
		["damage max",2,3,4,5,6,7,8,9,11,13,15,17,19,21,23,25,29,33,37,41,45,49,57,65,73,81,89,97,108,119,130,141,152,163,174,185,196,207,218,229,240,251,262,273,284,295,306,317,328,339,350,361,372,383,394,405,416,427,438,449,], 
		["cold min",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,19,22,25,28,31,34,38,42,46,50,54,58,64,70,76,82,88,94,100,106,112,118,124,130,136,142,148,154,160,166,172,178,184,190,196,202,208,214,220,226,232,238,244,250,], 
		["cold max",1,2,3,4,5,6,7,8,10,12,14,16,18,20,22,24,27,30,33,36,39,42,47,52,57,62,67,72,78,84,90,96,102,108,114,120,126,132,138,144,150,156,162,168,174,180,186,192,198,204,210,216,222,228,234,240,246,252,258,264,], 
		["mana cost",1.2,1.7,2.2,2.7,3.2,3.7,4.2,4.7,5.2,5.7,6.2,6.7,7.2,7.7,8.2,8.7,9.2,9.7,10.2,10.7,11.2,11.7,12.2,12.7,13.2,13.7,14.2,14.7,15.2,15.7,16.2,16.7,17.2,17.7,18.2,18.7,19.2,19.7,20.2,20.7,21.2,21.7,22.2,22.7,23.2,23.7,24.2,24.7,25.2,25.7,26.2,26.7,27.2,27.7,28.2,28.7,29.2,29.7,30.2,30.7,], 
]};
/*[22] Poison Creeper	*/ var d313 = {values:[
		["life", 
			["life normal",145,181,217,254,290,326,362,398,435,471,507,543,580,616,652,688,724,761,797,833,869,906,942,978,1014,1051,1087,1123,1159,1196,1232,1268,1304,1341,1377,1413,1449,1486,1522,1558,1594,1631,1667,1703,1739,1776,1812,1848,1884,1921,1957,1993,2029,2066,2102,2138,2174,2211,2247,2283,], 
			["life nightmare",344,430,516,602,688,774,860,946,1032,1118,1204,1290,1376,1462,1548,1634,1720,1806,1892,1978,2064,2150,2236,2322,2408,2494,2580,2666,2752,2838,2924,3010,3096,3182,3268,3354,3440,3526,3612,3698,3784,3870,3956,4042,4128,4214,4300,4386,4472,4558,4644,4730,4816,4902,4988,5074,5160,5246,5332,5418,], 
			["life hell",571,713,856,999,1142,1284,1427,1570,1713,1855,1998,2141,2284,2426,2569,2712,2855,2997,3140,3283,3426,3568,3711,3854,3997,4139,4282,4425,4568,4710,4853,4996,5139,5281,5424,5567,5710,5852,5995,6138,6281,6423,6566,6709,6852,6994,7137,7280,7423,7565,7708,7851,7994,8136,8279,8422,8565,8707,8850,8993], 
		], 
		["poison min",46,62,78,93,109,125,140,156,187,218,250,281,312,343,375,406,531,656,781,906,1031,1156,1390,1625,1859,2093,2328,2562,2843,3125,3406,3687,3968,4250,4531,4812,5093,5375,5656,5937,6218,6500,6781,7062,7343,7625,7906,8187,8468,8750,9031,9312,9593,9875,10156,10437,10718,11000,11281,11562,], 
		["poison max",62,93,125,156,187,218,250,281,328,375,421,468,515,562,609,656,812,968,1125,1281,1437,1593,1921,2250,2578,2906,3234,3562,3937,4312,4687,5062,5437,5812,6187,6562,6937,7312,7687,8062,8437,8812,9187,9562,9937,10312,10687,11062,11437,11812,12187,12562,12937,13312,13687,14062,14437,14812,15187,15562,], 
]};
/*[23]Heart of Wolverine*/ var d321 = {values:[
		["life", 
			["life normal",95,142,190,237,285,332,380,427,475,522,570,617,665,712,760,807,855,902,950,997,1045,1092,1140,1187,1235,1282,1330,1377,1425,1472,1520,1567,1615,1662,1710,1757,1805,1852,1900,1947,1995,2042,2090,2137,2185,2232,2280,2327,2375,2422,2470,2517,2565,2612,2660,2707,2755,2802,2850,2897,], 
			["life nightmare",213,319,426,532,639,745,852,958,1065,1171,1278,1384,1491,1597,1704,1810,1917,2023,2130,2236,2343,2449,2556,2662,2769,2875,2982,3088,3195,3301,3408,3514,3621,3727,3834,3940,4047,4153,4260,4366,4473,4579,4686,4792,4899,5005,5112,5218,5325,5431,5538,5644,5751,5857,5964,6070,6177,6283,6390,6496,], 
			["life hell",374,561,748,935,1122,1309,1496,1683,1870,2057,2244,2431,2618,2805,2992,3179,3366,3553,3740,3927,4114,4301,4488,4675,4862,5049,5236,5423,5610,5797,5984,6171,6358,6545,6732,6919,7106,7293,7480,7667,7854,8041,8228,8415,8602,8789,8976,9163,9350,9537,9724,9911,10098,10285,10472,10659,10846,11033,11220,11407], 
		], 
		["damage",50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,620,630,640,], 
		["attack rating",100,115,130,145,160,175,190,205,220,235,250,265,280,295,310,325,340,355,370,385,400,415,430,445,460,475,490,505,520,535,550,565,580,595,610,625,640,655,670,685,700,715,730,745,760,775,790,805,820,835,850,865,880,895,910,925,940,955,970,985,], 
		["radius",20,21.3,22.6,24,25.3,26.6,28,29.3,30.6,32,33.3,34.6,36,37.3,38.6,40,41.3,42.6,44,45.3,46.6,48,49.3,50.6,52,53.3,54.6,56,57.3,58.6,60,61.3,62.6,64,65.3,66.6,68,69.3,70.6,72,73.3,74.6,76,77.3,78.6,80,81.3,82.6,84,85.3,86.6,88,89.3,90.6,92,93.3,94.6,96,97.3,98.6,], 
		["mana cost",20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,], 
]};
/*[24] Spirit Wolf		*/ var d322 = {values:[
		["wolves",], 
		["base life",71,110,320,], 
		["damage min",2,3,4,5,6,7,8,9,12,15,18,21,24,27,30,33,39,45,51,57,63,69,82,95,108,121,134,147,166,185,204,223,242,261,280,299,318,337,356,375,394,413,432,451,470,489,508,527,546,565,584,603,622,641,660,679,698,717,736,755,], 
		["damage max",6,7,8,9,10,11,12,13,19,25,31,37,43,49,55,61,73,85,97,109,121,133,152,171,190,209,228,247,274,301,328,355,382,409,436,463,490,517,544,571,598,625,652,679,706,733,760,787,814,841,868,895,922,949,976,1003,1030,1057,1084,1111,], 
		["attack rating",75,90,105,120,135,150,165,180,195,210,225,240,255,270,285,300,315,330,345,360,375,390,405,420,435,450,465,480,495,510,525,540,555,570,585,600,615,630,645,660,675,690,705,720,735,750,765,780,795,810,825,840,855,870,885,900,915,930,945,960,], 
		["defense",50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,620,630,640,], 
]};
/*[25] Carrion Vine		*/ var d333 = {values:[
		["life", 
			["life normal",145,181,217,254,290,326,362,398,435,471,507,543,580,616,652,688,724,761,797,833,869,905,942,978,1014,1050,1086,1123,1159,1195,1231,1267,1304,1340,1376,1412,1448,1485,1521,1557,1593,1629,1666,1702,1738,1774,1810,1847,1883,1919,1955,1991,2028,2064,2100,2136,2172,2209,2245,2281,], 
			["life nightmare",344,430,516,602,688,774,860,946,1032,1118,1204,1290,1376,1462,1548,1634,1720,1806,1892,1978,2064,2150,2236,2322,2408,2494,2580,2666,2752,2838,2924,3010,3096,3182,3268,3354,3440,3526,3612,3698,3784,3870,3956,4042,4128,4214,4300,4386,4472,4558,4644,4730,4816,4902,4988,5074,5160,5246,5332,5418,], 
			["life hell",571,713,856,999,1142,1284,1427,1570,1713,1855,1998,2141,2284,2426,2569,2712,2855,2997,3140,3283,3426,3568,3711,3854,3997,4139,4282,4425,4568,4710,4853,4996,5139,5281,5424,5567,5710,5852,5995,6138,6281,6423,6566,6709,6852,6994,7137,7280,7423,7565,7708,7851,7994,8136,8279,8422,8565,8707,8850,8993], 
		], 
		["heals",9,10,10,11,12,12,12,12,13,13,13,13,14,14,14,14,14,14,14,14,14,14,14,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,15,], 
]};
/*[26] Oak Sage			*/ var d341 = {values:[
		["life", 
			["life normal",95,106,118,129,140,152,163,175,186,197,209,220,231,243,254,266,277,288,300,311,323,334,345,357,368,380,391,402,414,425,437,448,459,471,482,494,505,516,528,539,551,562,573,585,596,608,619,630,642,653,665,676,687,699,710,722,733,744,756,767,], 
			["life nightmare",213,239,264,290,315,341,366,392,417,443,468,494,519,545,570,596,621,647,672,698,723,749,774,800,825,851,876,902,927,953,978,1004,1029,1055,1080,1106,1131,1157,1182,1208,1233,1259,1284,1310,1335,1361,1386,1412,1437,1463,1488,1514,1539,1565,1590,1616,1641,1667,1692,1718,], 
			["life hell",374,418,463,508,553,598,643,688,732,777,822,867,912,957,1002,1046,1091,1136,1181,1226,1271,1316,1360,1405,1450,1495,1540,1585,1630,1674,1719,1764,1809,1854,1899,1944,1988,2033,2078,2123,2168,2213,2258,2302,2347,2392,2437,2482,2527,2572,2616,2661,2706,2751,2796,2841,2886,2930,2975,3020], 
		], 
		["life bonus",12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60,63,66,69,72,75,78,81,84,87,90,93,96,99,102,105,108,111,114,117,120,123,126,129,132,135,138,141,144,147,150,153,156,159,162,165,168,171,174,177,180,183,186,189,], 
		["radius",20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,100,102,104,106,108,110,112,114,116,118,120,122,124,126,128,130,132,134,136,138,], 
		["mana cost",15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,], 
]};
/*[27] Dire Wolf		*/ var d342 = {values:[
		["wolves",], 
		["attack rating",], 
		["defense",], 
		["base life",199,428,770,], 
		["damage min",7,10,13,16,19,22,25,28,34,40,46,52,58,64,70,76,86,96,106,116,126,136,152,168,184,200,216,232,258,284,310,336,362,388,414,440,466,492,518,544,570,596,622,648,674,700,726,752,778,804,830,856,882,908,934,960,986,1012,1038,1064,], 
		["damage max",12,18,24,30,36,42,48,54,63,72,81,90,99,108,117,126,144,162,180,198,216,234,258,282,306,330,354,378,418,458,498,538,578,618,658,698,738,778,818,858,898,938,978,1018,1058,1098,1138,1178,1218,1258,1298,1338,1378,1418,1458,1498,1538,1578,1618,1658,], 
		["life bonus",75,90,105,120,135,150,165,180,195,210,225,240,255,270,285,300,315,330,345,360,375,390,405,420,435,450,465,480,495,510,525,540,555,570,585,600,615,630,645,660,675,690,705,720,735,750,765,780,795,810,825,840,855,870,885,900,915,930,945,960,], 
]};
/*[28] Solar Creeper	*/ var d353 = {values:[
		["life", 
			["life normal",145,174,203,232,261,290,319,348,377,406,435,464,493,522,551,580,609,638,667,696,725,754,783,812,841,870,899,928,957,986,1015,1044,1073,1102,1131,1160,1189,1218,1247,1276,1305,1334,1363,1392,1421,1450,1479,1508,1537,1566,1595,1624,1653,1682,1711,1740,1769,1798,1827,1856,], 
			["life nightmare",344,413,482,550,619,688,757,826,894,963,1032,1101,1169,1238,1307,1376,1445,1513,1582,1651,1720,1788,1857,1926,1995,2064,2132,2201,2270,2339,2407,2476,2545,2614,2683,2751,2820,2889,2958,3026,3095,3164,3233,3302,3370,3439,3508,3577,3645,3714,3783,3852,3921,3989,4058,4127,4196,4264,4333,4402,], 
			["life hell",571,685,799,913,1027,1142,1256,1370,1484,1598,1713,1827,1941,2055,2169,2284,2398,2512,2626,2740,2855,2969,3083,3197,3311,3426,3540,3654,3768,3882,3997,4111,4225,4339,4453,4568,4682,4796,4910,5024,5139,5253,5367,5481,5595,5710,5824,5938,6052,6166,6281,6395,6509,6623,6737,6852,6966,7080,7194,7308], 
		], 
		["mana recovery",2,2,3,4,4,4,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,], 
		["mana cost",14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,], 
]};
/*[29] Spirit of Barbs	*/ var d361 = {values:[
		["life", 
			["life normal",95,123,152,180,209,237,266,294,323,351,380,408,437,465,494,522,551,579,608,636,665,693,722,750,779,807,836,864,893,921,950,978,1007,1035,1064,1092,1121,1149,1178,1206,1235,1263,1292,1320,1349,1377,1406,1434,1463,1491,1520,1548,1577,1605,1634,1662,1691,1719,1748,1776,], 
			["life nightmare",213,277,341,405,469,532,596,660,724,788,852,916,980,1044,1108,1171,1235,1299,1363,1427,1491,1555,1619,1683,1747,1810,1874,1938,2002,2066,2130,2194,2258,2322,2386,2449,2513,2577,2641,2705,2769,2833,2897,2961,3025,3088,3152,3216,3280,3344,3408,3472,3536,3600,3664,3727,3791,3855,3919,3983,], 
			["life hell",374,486,598,710,822,935,1047,1159,1271,1383,1496,1608,1720,1832,1944,2057,2169,2281,2393,2505,2618,2730,2842,2954,3066,3179,3291,3403,3515,3627,3740,3852,3964,4076,4188,4301,4413,4525,4637,4749,4862,4974,5086,5198,5310,5423,5535,5647,5759,5871,5984,6096,6208,6320,6432,6545,6657,6769,6881,6993], 
		], 
		["damage returned",300,350,400,450,500,550,600,650,700,750,800,850,900,950,1000,1050,1100,1150,1200,1250,1300,1350,1400,1450,1500,1550,1600,1650,1700,1750,1800,1850,1900,1950,2000,2050,2100,2150,2200,2250,2300,2350,2400,2450,2500,2550,2600,2650,2700,2750,2800,2850,2900,2950,3000,3050,3100,3150,3200,3250,], 
		["radius",20,21.3,22.6,24,25.3,26.6,28,29.3,30.6,32,33.3,34.6,36,37.3,38.6,40,41.3,42.6,44,45.3,46.6,48,49.3,50.6,52,53.3,54.6,56,57.3,58.6,60,61.3,62.6,64,65.3,66.6,68,69.3,70.6,72,73.3,74.6,76,77.3,78.6,80,81.3,82.6,84,85.3,86.6,88,89.3,90.6,92,93.3,94.6,96,97.3,98.7,], 
		["mana cost",25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,], 
]};
/*[30] Grizzly			*/ var d362 = {values:[
		["base life",650,875,1350], 
		["attack rating",], 
		["defense",], 
		["damage min",87,117,151,189,230,275,323,375,448,527,611,700,795,895,1001,1112,1253,1401,1557,1720,1890,2067,2312,2568,2835,3113,3401,3700,4093,4501,4925,5363,5816,6284,6767,7266,7779,8307,8850,9408,9982,10570,11173,11791,12424,13073,13736,14414,15107,15815,16539,17277,18030,18798,19581,20380,21193,22021,22864,23722,], 
		["damage max",140,190,246,308,376,450,530,616,719,830,949,1074,1207,1346,1493,1648,1859,2081,2314,2557,2812,3077,3413,3764,4130,4510,4904,5312,5866,6441,7037,7654,8292,8951,9631,10332,11053,11796,12560,13345,14151,14978,15826,16695,17585,18496,19427,20380,21354,22349,23365,24402,25460,26539,27639,28760,29901,31064,32248,33453,], 
		["damage bonus",75,90,105,120,135,150,165,180,195,210,225,240,255,270,285,300,315,330,345,360,375,390,405,420,435,450,465,480,495,510,525,540,555,570,585,600,615,630,645,660,675,690,705,720,735,750,765,780,795,810,825,840,855,870,885,900,915,930,945,960,], 
]};

var skills_druid = [
{data:d111, key:"111", code:220, name:"Firestorm", i:0, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, bindable:2, description:"Unleash fiery chaos to burn your enemies", syn_title:"<br>Firestorm Receives Bonuses From:<br>", syn_text:"Molten Boulder: +30% Fire Damage per Level<br>Fissure: +30% Fire Damage per Level", graytext:"", index:[0,""], text:["+","% increased fire spread speed<br>Average Fire Damage: ","-"," per second<br>Mana Cost: ",""]},
{data:d121, key:"121", code:221, name:"Molten Boulder", i:1, req:[0], reqlvl:6, level:0, extra_levels:0, force_levels:0, bindable:2, description:"Launch a boulder of flaming hot magma<br>that knocks back your enemies", syn_title:"<br>Molten Boulder Receives Bonuses From:<br>", syn_text:"Volcano: +20% Damage per Level<br>Firestorm: +23% Fire Damage per Level<br>Firestorm: +17% Average Fire Damage per Second per Level", graytext:"", index:[0,""], text:["Damage: ","-","<br>Fire Damage: ","-","<br>Average Fire Damage: ","-"," per second<br>Mana Cost: ",""]},
{data:d122, key:"122", code:222, name:"Flame Dash", i:2, req:[1,0], reqlvl:6, level:0, extra_levels:0, force_levels:0, bindable:1, description:"Instantly teleport to a location and unleash a fiery<br>explosion that incinerates all enemies in your path", syn_title:"<br>Flame Dash Receives Bonuses From:<br>", syn_text:"Molten Boulder: +10% Fire Damage per Level<br>1% Increased Fire Damage per Energy", graytext:"<br>Cooldown Reduced by 0.4 Seconds per Base Level", index:[1," seconds"], text:["Cooldown: ","Fire Damage: ","-","<br>Mana Cost: ",""]},
{data:d123, key:"123", code:223, name:"Arctic Blast", i:3, req:[], reqlvl:6, level:0, extra_levels:0, force_levels:0, bindable:2, description:"Blast a continous jet of ice<br>to burn your enemies with frost<br><br>Minimum Mana Required to Cast: 4", syn_title:"<br>Arctic Blast Receives Bonuses From:<br>", syn_text:"Hurricane: +10% Cold Damage per Level<br>Cyclone Armor: +10% Cold Damage per Level", graytext:"", index:[0,""], text:["Average Cold Damage: ","-"," per second<br>Cold Length: "," seconds<br>Range: "," yards<br>Mana Cost: "," per second",""]},
{data:d131, key:"131", code:224, name:"Fissure", i:4, req:[1,0], reqlvl:12, level:0, extra_levels:0, force_levels:0, bindable:1, description:"Open volcanic vents below your enemies,<br>burning them to a crisp<br><br>Mana Cost: 15", syn_title:"<br>Fissure Receives Bonuses From:<br>", syn_text:"Firestorm: +15% Fire Damage per Level<br>Volcano: +15% Fire Damage per Level", graytext:"", index:[0,""], text:["Fire Damage: ","-","<br>Duration: 3.2 seconds",""]},
{data:d133, key:"133", code:225, name:"Cyclone Armor", i:5, req:[3], reqlvl:12, level:0, extra_levels:0, force_levels:0, effect:4, bindable:1, description:"Shield yourself from damage caused by<br>fire, cold, and lightning", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Absorbs "," damage<br>Mana Cost: ",""]},
{data:d142, key:"142", code:226, name:"Twister", i:6, req:[5,3], reqlvl:18, level:0, extra_levels:0, force_levels:0, bindable:2, description:"Release several small whirlwinds that<br>cut a path through your enemies<br><br>Stun Length: 1 second<br>Mana Cost: 7", syn_title:"<br>Twister Receives Bonuses From:<br>", syn_text:"Tornado: +30% Damage per Level<br>Hurricane: +30% Damage per Level", graytext:"", index:[0,""], text:["Damage: ","-",""]},
{data:d151, key:"151", code:227, name:"Volcano", i:7, req:[4,1,0], reqlvl:24, level:0, extra_levels:0, force_levels:0, bindable:1, description:"Summon forth a volcano to rain death<br>and destruction over your enemies<br><br>Mana Cost: 25", syn_title:"<br>Volcano Receives Bonuses From:<br>", syn_text:"Molten Boulder: +20% Physical Damage per Level<br>Fissure: +14% Fire Damage per Level<br>Armageddon: +14% Fire Damage per Level", graytext:"", index:[0,""], text:["Damage: ","-","<br>Fire Damage: ","-",""]},
{data:d152, key:"152", code:228, name:"Tornado", i:8, req:[6,5,3], reqlvl:24, level:0, extra_levels:0, force_levels:0, bindable:2, description:"Create a funnel of wind and debris<br>to blast your enemies<br><br>Mana Cost: 10", syn_title:"<br>Tornado Receives Bonuses From:<br>", syn_text:"Cyclone Armor: +7% Damage per Level<br>Twister: +18% Damage per Level<br>Hurricane: +18% Damage per Level", graytext:"", index:[0,""], text:["Damage: ","-",""]},
{data:d161, key:"161", code:229, name:"Armageddon", i:9, req:[7,4,1,0], reqlvl:30, level:0, extra_levels:0, force_levels:0, effect:0, bindable:2, description:"Create a meteor shower to rain fiery<br>destruction on nearby enemies", syn_title:"<br>Armageddon Receives Bonuses From:<br>", syn_text:"Fissure: +2 Seconds per Level<br>Firestorm: +12% Fire Damage per Level<br>Molten Boulder: +12% Physical Damage per Level<br>Volcano: +12% Fire Damage per Level", graytext:"", index:[1," seconds<br>Radius: 6 yards<br>Mana Cost: 30"], text:["Duration: ","Damage: ","-","<br>Fire Damage: ","-",""]},
{data:d162, key:"162", code:230, name:"Hurricane", i:10, req:[8,6,5,3], reqlvl:30, level:0, extra_levels:0, force_levels:0, effect:0, bindable:2, description:"Create a massive storm of wind and<br>debris to pound your enemies to bits", syn_title:"<br>Hurricane Receives Bonuses From:<br>", syn_text:"Cyclone Armor: +2 Seconds per Level<br>Twister: +4% Cold Damage per Level<br>Tornado: +4% Cold Damage per Level<br>Arctic Blast: +4% Cold Damage per Level", graytext:"", index:[1," seconds<br>Radius: 5.3 yards<br>Mana Cost: 35"], text:["Duration: ","Cold Damage: ","-",""]},

{data:d211, key:"211", code:231, name:"Werewolf", i:11, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, effect:5, bindable:1, description:"Transform into a werewolf", syn_title:"<br>Werewolf Receives Bonuses From:<br>", syn_text:"Lycanthropy", graytext:"", index:[1," percent<br>Stamina Bonus: +40 percent<br>Duration: 1040 seconds"], text:["Life: +","To Attack Rating: +"," percent<br>Attack Speed: +"," percent<br>Damage: +"," percent",""]},
{data:d212, key:"212", code:232, name:"Lycanthropy", i:12, req:[11], reqlvl:1, level:0, extra_levels:0, force_levels:0, bindable:0, description:"Passive - Improves damage and life<br>when in werewolf or werebear form", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Damage: +"," percent<br>Max Life: +"," percent",""]},
{data:d223, key:"223", code:233, name:"Werebear", i:13, req:[], reqlvl:6, level:0, extra_levels:0, force_levels:0, effect:5, bindable:1, description:"Transform into a werebear", syn_title:"<br>Werebear Receives Bonuses From:<br>", syn_text:"Lycanthropy", graytext:"", index:[1," percent<br>Duration: 1040 seconds"], text:["Life: +","Damage: +"," percent<br>Defense: +"," percent<br>Mana Cost: 15",""]},
{data:d231, key:"231", code:234, name:"Feral Rage", i:14, req:[11], reqlvl:12, level:0, extra_levels:0, force_levels:0, effect:4, bindable:2, description:"When in werewolf form,<br>go into a frenzied rage to steal<br>increasing amounts of life from your enemies<br>with successive hits<br><br>Mana Cost: 3<br>Duration: 20 seconds", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Walk/Run Speed: +","-"," percent<br>Life Steal: +","-"," percent<br>Damage: +"," percent<br>Attack Rating: +"," percent",""]},
{data:d233, key:"233", code:235, name:"Maul", i:15, req:[13], reqlvl:12, level:0, extra_levels:0, force_levels:0, effect:4, bindable:2, description:"When in werebear form,<br>maul your enemies<br>for increasing extra damage<br>with successive hits<br><br>Mana Cost: 3<br>Duration: 20 seconds", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Stun Length: "," seconds<br>Damage: +","-"," percent<br>Attack Rating: +"," percent",""]},
{data:d241, key:"241", code:236, name:"Rabies", i:16, req:[14,11], reqlvl:18, level:0, extra_levels:0, force_levels:0, bindable:2, description:"When in werewolf form,<br>bite your enemies<br>to inflict them with disease<br>that spreads to other monsters<br><br>Mana Cost: 10", syn_title:"<br>Rabies Receives Bonuses From:<br>", syn_text:"Poison Creeper: +20% Poison damage per Level<br>Summon Dire Wolf: +20% Poison Damage per Level", graytext:"", index:[0,""], text:["Attack Rating: +"," percent<br>Poison Damage: ","-","<br>over 4 seconds",""]},
{data:d242, key:"242", code:237, name:"Fire Claws", i:17, req:[14,15,11,13], reqlvl:18, level:0, extra_levels:0, force_levels:0, bindable:2, description:"When in werewolf or werebear<br>form, maul your enemies<br>with a fiery claw attack<br><br>Deals 100% of Fire Weapon Damage as Splash Damage<br>Radius: 7 yards", syn_title:"<br>Fire Claws Receives Bonuses From:<br>", syn_text:"Firestorm: +10% Fire Damage per Level<br>Molten Boulder: +10% Fire Damage per Level<br>Volcano: +10% Fire Damage per Level<br>Armageddon: +10% Fire Damage per Level", graytext:"", index:[0,""], text:["Fire Damage: ","-","<br>Attack Rating: +"," percent<br>Mana Cost: ",""]},
{data:d252, key:"252", code:238, name:"Hunger", i:18, req:[17,14,15,11,13], reqlvl:24, level:0, extra_levels:0, force_levels:0, bindable:2, description:"When in werewolf or werebear<br>form, bite your enemies<br>to gain life and mana<br><br>Damage: -75 percent", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Life Steal: "," percent<br>Mana Steal: "," percent<br>Attack Rating: +"," percent<br>Mana Cost: 3",""]},
{data:d253, key:"253", code:239, name:"Shock Wave", i:19, req:[15,13], reqlvl:24, level:0, extra_levels:0, force_levels:0, bindable:2, description:"When in werebear form,<br>stomp to create a shock wave<br>that crushes enemies<br><br>Deals 25% of Weapon Damage", syn_title:"<br>Shock Wave Receives Bonuses From:<br>", syn_text:"Maul: +8% Damage per Level", graytext:"", index:[0,""], text:["Stun Length: 1.4 seconds<br>Damage: ","-","<br>Mana Cost: 7",""]},
{data:d261, key:"261", code:240, name:"Fury", i:20, req:[16,14,11], reqlvl:30, level:0, extra_levels:0, force_levels:0, bindable:2, description:"When in werewolf form, attack<br>either multiple adjacent targets<br>or one target multiple times", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:[""," hits<br>Attack Bonus: +"," percent<br>Damage: +"," percent<br>Mana Cost: 4",""]},

{data:d312, key:"312", code:241, name:"Raven", i:21, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, bindable:1, description:"Summon ravens to peck out<br>the eyes of your enemies<br><br>Raven attacks deal splash damage<br><br>3 Hits", syn_title:"<br>Raven Receives Bonuses From:<br>", syn_text:"Cyclone Armor: +20% Physical Damage per Level<br>Twister: +20% Physical Damage per Level<br>Arctic Blast: +21% Cold Damage per Level<br>1% Increased Cold Damage per Energy", graytext:"", index:[0,""], text:["Ravens: ","<br>Damage: ","-","<br>Cold Damage: ","-","<br>Mana Cost per Raven: ",""]},
{data:d313, key:"313", code:242, name:"Poison Creeper", i:22, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, effect:0, bindable:1, description:"Summon a vine that spreads<br>disease to all it contacts", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Life: ","<br>Poison Damage: ","-","<br>over 5 seconds<br>Mana Cost: 8"]},
{data:d321, key:"321", code:243, name:"Heart of Wolverine", i:23, req:[], reqlvl:6, level:0, extra_levels:0, force_levels:0, effect:5, bindable:1, description:"Summon a spirit pet that adds<br>to the damage and attack rating<br>of you and your party", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Life: ","<br>Damage: +"," percent<br>Attack Rating: +"," percent<br>Radius: "," yards<br>Mana Cost: ",""]},
{data:d322, key:"322", code:244, name:"Summon Spirit Wolf", i:24, req:[21], reqlvl:6, level:0, extra_levels:0, force_levels:0, bindable:1, description:"Summon a wolf to fight by your side", syn_title:"<br>Summon Spirit Wolf Receives Bonuses From:<br>", syn_text:"Summon Dire Wolf<br>Summon Grizzly", graytext:"<br>One Wolf per Base Level. Max: 7<br>", index:[2,""], text:["Wolves: ","<br>Mana Cost: 15<br>Life: ","Damage: ","-","<br>Attack Rating: +"," percent<br>Defense: +"," percent"]},
{data:d333, key:"333", code:245, name:"Carrion Vine", i:25, req:[22], reqlvl:12, level:0, extra_levels:0, force_levels:0, effect:4, bindable:1, description:"Summon a vine that eats corpses<br>and replenishes your life", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Life: ","<br>Heals: "," percent<br>Mana Cost: 10",""]},
{data:d341, key:"341", code:246, name:"Oak Sage", i:26, req:[23], reqlvl:18, level:0, extra_levels:0, force_levels:0, effect:5, bindable:1, description:"Summon a spirit pet that increases<br>life for you and your party", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Life: ","<br>Life: +"," percent<br>Radius: "," yards<br>Mana Cost: ",""]},
{data:d342, key:"342", code:247, name:"Summon Dire Wolf", i:27, req:[23,24,21], reqlvl:18, level:0, extra_levels:0, force_levels:0, bindable:1, description:"Summon a wolf that becomes enraged,<br>eating corpses to increase its damage", syn_title:"<br>Summon Dire Wolf Receives Bonuses From:<br>", syn_text:"Summon Spirit Wolf<br>Summon Grizzly", graytext:"<br>One Wolf per Base Level. Max: 3<br>", index:[3," percent"], text:["Wolves: ","<br>Mana Cost: 20<br>Attack Rating: +"," percent<br>Defense: +","Life: ","<br>Damage: ","-","<br>Life: +"," percent",""]},
{data:d353, key:"353", code:248, name:"Solar Creeper", i:28, req:[25,22], reqlvl:24, level:0, extra_levels:0, force_levels:0, effect:4, bindable:1, description:"Summon a vine that eats corpses<br>and replenishes your mana", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Life: ","<br>Mana Recovery Rate: "," percent<br>Mana Cost: ",""]},
{data:d361, key:"361", code:249, name:"Spirit of Barbs", i:29, req:[26,23], reqlvl:30, level:0, extra_levels:0, force_levels:0, effect:4, bindable:1, description:"Summon spirit pet that reflects damage<br>taken by you and your party<br>back at your enemies", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Life: ","<br>"," percent damage returned<br>Radius: "," yards<br>Mana Cost: ",""]},
{data:d362, key:"362", code:250, name:"Summon Grizzly", i:30, req:[27,23,24,21], reqlvl:30, level:0, extra_levels:0, force_levels:0, bindable:1, description:"Summon a ferocious grizzly bear", syn_title:"<br>Summon Grizzly Receives Bonuses From:<br>", syn_text:"Summon Spirit Wolf<br>Summon Dire Wolf", graytext:"", index:[3," percent"], text:["Mana Cost: 40<br>Life: ","<br>Attack Rating: +"," percent<br>Defense: +","Damage: ","-","<br>Damage: +"," percent",""]}
];
