
var character_pd2_druid = {class_name:"Druid", strength:15, dexterity:20, vitality:25, energy:20, life:55, mana:20, stamina:184, levelup_life:1.5, levelup_stamina:1, levelup_mana:2, ar_per_dexterity:5, life_per_vitality:2, stamina_per_vitality:1, mana_per_energy:2, starting_strength:15, starting_dexterity:20, starting_vitality:25, starting_energy:20, ar_const:5, block_const:6, skill_layout:"./images/PD2/druid.png", mana_regen:1.66,	// block_const = 5 while shapeshifted
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
		
		if (skill.name == "Firestorm" && elem < 2) {					result *= ((1 + 0.23*skills[1].level + 0.23*skills[4].level) * (1+character.fDamage/100)) }
		if (skill.name == "Molten Boulder" && elem < 6) {				result *= (1 + 0.10*skills[4].level + 0.10*skills[7].level + 0.10*skills[9].level) }
		if (skill.name == "Molten Boulder" && elem > 1 && elem < 6) {	result *= (1+character.fDamage/100) }
		if (skill.name == "Fissure" && elem < 2) {						result *= ((1 + 0.06*skills[0].level + 0.06*skills[1].level) * (1+character.fDamage/100)) }
		if (skill.name == "Volcano" && elem < 4) {						result *= (1 + 0.08*skills[1].level + 0.08*skills[4].level + 0.08*skills[9].level) }
		if (skill.name == "Volcano" && elem > 1 && elem < 4) {			result *= (1+character.fDamage/100) }
		if (skill.name == "Armageddon" && elem > 2 && elem < 7) {		result *= ((1 + 0.08*skills[4].level + 0.08*skills[1].level + 0.08*skills[7].level) * (1+character.fDamage/100)) }
		if (skill.name == "Arctic Blast" && elem < 2) {					result *= ((1 + 0.25*skills[10].level + 0.18*skills[8].level + 0.18*skills[6].level + 0.18*skills[5].level) * (1+character.cDamage/100)) }
		if (skill.name == "Twister" && elem > 2 && elem < 4) {			result *= (1 + 0.15*skills[10].level + 0.15*skills[8].level + 0.15*skills[3].level) }
		if (skill.name == "Tornado" && elem < 2) {						result *= (1 + 0.11*skills[3].level + 0.11*skills[6].level + 0.11*skills[10].level) }
		if (skill.name == "Hurricane" && elem > 0 && elem < 3) {		result *= ((1 + 0.08*skills[3].level + 0.08*skills[8].level + 0.08*skills[6].level) * (1+character.cDamage/100)) }
		
		if (skill.name == "Hunger" && elem < 2) {						result = 10 + skill.level*1 }
		if (skill.name == "Shock Wave" && elem < 2) {					result *= (1 + 0.14*skills[13].level + 0.14*skills[6].level + 0.14*skills[8].level) }
		if (skill.name == "Rabies" && elem > 0 && elem < 3) {			result *= ((1 + 0.22*skills[22].level + 0.22*skills[14].level) * (1+character.pDamage/100)) }
		if (skill.name == "Fire Claws" && elem < 2) {					result *= ((1 + 0.22*skills[0].level + 0.22*skills[1].level + 0.22*skills[4].level + 0.22*skills[7].level) * (1+character.fDamage/100)) }
		
		if (skill.name == "Poison Creeper" && elem > 0 && elem < 3) {	result *= (1 + 0.08*skills[25].level + 0.08*skills[28].level + 0.08*skills[16].level) }
		if (skill.name == "Carrion Vine" && elem == 1) {				result += (2*skills[26].level + 2*skills[28].level) }
		if (skill.name == "Carrion Vine" && elem == 2) {				result += (4*skills[26].level + 4*skills[28].level) }
		if (skill.name == "Solar Creeper" && elem == 1) {				result += (1*skills[26].level + 1*skills[25].level) }
		if (skill.name == "Solar Creeper" && elem == 2) {				result += (3*skills[26].level + 3*skills[25].level) }
//		if (skill.name == "Heart of Wolverine" && elem == 0) {			result = skill.data.values[elem][character.difficulty][lvl] }
//		if (skill.name == "Spirit of Barbs" && elem == 0) {				result = skill.data.values[elem][character.difficulty][lvl] }
//		if (skill.name == "Oak Sage" && elem == 0) {					result = skill.data.values[elem][character.difficulty][lvl] }
		if (skill.name == "Oak Sage" && elem == 1) {					result += (0.5*skills[25].level + 0.5*skills[28].level) }
		if (skill.name == "Raven" && elem < 4) {						result *= (1 + 0.12*skills[24].level + 0.12*skills[27].level + 0.12*skills[30].level) }
//		if (skill.name == "Summon Spirit Wolf" && elem == 0) {			result = skill.data.values[elem][character.difficulty][lvl] }
		if (skill.name == "Summon Spirit Wolf" && elem>0 && elem<3) {	result *= (1 + 0.06*skills[21].level + 0.06*skills[27].level + 0.06*skills[30].level + 0.06*skills[11].level - 0.09*skills[13].level) }
		if (skill.name == "Summon Dire Wolf" && elem == 0) {			result += (25*skills[24].level) }
//		if (skill.name == "Summon Dire Wolf" && elem == 2) {			result = skill.data.values[elem][character.difficulty][lvl] }
		if (skill.name == "Summon Dire Wolf" && elem > 2 && elem < 5) {	result *= (1 + 0.04*skills[21].level + 0.04*skills[24].level + 0.04*skills[30].level + 0.04*skills[11].level - 0.06*skills[13].level) }
//		if (skill.name == "Summon Grizzly" && elem == 0) {				result = skill.data.values[elem][character.difficulty][lvl] }
		if (skill.name == "Summon Grizzly" && elem == 1) {				result += (25*skills[24].level) }
		if (skill.name == "Summon Grizzly" && elem > 2 && elem < 5) {	result *= (1 + 0.06*skills[21].level + 0.06*skills[24].level + 0.06*skills[27].level + 0.06*skills[13].level - 0.12*skills[11].level) }
		
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
		
		// unsupported
		
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
		
		// unsupported
		
		var result = {min:skillMin,max:skillMax,ar:skillAr};
		return result
	}
};

/*[ 0] Firestorm		*/ var d111 = {index:[0,""], values:[
		["burning min",3,4,5,7,8,9,10,11,12,14,15,16,17,18,19,21,23,25,28,30,], 
		["burning max",7,9,11,14,16,18,21,23,25,28,30,32,35,37,39,42,45,49,52,56,], 
]};
/*[ 1] Molten Boulder	*/ var d121 = {index:[0,""], values:[
		["damage min",1,2,3,4,5,6,7,8,10,12,14,16,18,20,22,24,29,34,39,44,], 
		["damage max",2,3,4,5,6,7,8,9,11,13,15,17,19,21,23,25,31,37,43,49,], 
		["fire min",1,2,3,4,5,6,7,8,10,12,14,16,18,20,22,24,30,36,42,44,], 
		["fire max",1,2,3,4,5,6,7,8,10,12,14,16,18,20,22,24,31,38,45,49,], 
		["burning min",2,3,4,5,7,8,9,10,12,15,17,19,22,24,26,29,36,43,50,57,], 
		["burning max",4,5,7,8,9,10,11,12,15,17,19,22,24,26,29,31,38,45,52,59,], 
		["Mana Cost",5,5.1,5.2,5.3,5.5,5.6,5.7,5.8,6,6.1,6.2,6.3,6.5,6.6,6.7,6.8,7,7.1,7.2,7.3,], 
]};
/*[ 2] Gust				*/ var d143 = {index:[0,""], values:[
		["Cooldown (Seconds)",6.3,6.1,5.9,5.7,5.5,5.3,5.1,4.9,4.7,4.5,4.3,4.1,3.9,3.7,3.5,3.3,3.1,2.9,2.7,2.5,], 
]};
/*[ 3] Arctic Blast		*/ var d113 = {index:[0,""], values:[
		["cold min",6,11,16,21,26,31,36,41,48,55,62,69,76,83,91,98,110,123,136,149,], 
		["cold max",11,16,21,26,32,37,42,47,54,62,69,76,84,91,99,106,119,133,146,159,], 
		["Cold Length (Seconds)",4,4.6,5.2,5.8,6.4,7,7.6,8.2,8.8,9.4,10,10.6,11.2,11.8,12.4,13,13.6,14.2,14.8,15.4,], 
		["Range (Yards)",3.3,3.3,3.3,3.3,4,4,4,4,4.6,4.6,4.6,4.6,5.3,5.3,5.3,5.3,6,6,6,6,], 
		["Mana Cost",1,1,2,2,3,3,3,4,4,5,5,5,6,6,7,7,7,8,8,8,], 
]};
/*[ 4] Fissure			*/ var d131 = {index:[0,""], values:[
		["fire min",16,23,30,36,43,50,57,63,77,90,104,117,131,144,157,171,189,207,225,243,], 
		["fire max",28,34,41,48,54,61,68,75,88,101,115,128,142,155,169,182,202,222,243,263,], 
]};
/*[ 5] Cyclone Armor	*/ var d123 = {index:[0,""], values:[
		["Damage Absorbed",65,85,105,125,145,165,185,205,225,245,265,285,305,325,345,365,385,405,425,445,], 
		["Mana Cost",5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,], 
]};
/*[ 6] Twister			*/ var d132 = {index:[1,""], values:[
		["Mana Cost",4.2,4.5,4.7,5,5.2,5.5,5.7,6,6.2,6.5,6.7,7,7.2,7.5,7.7,8,8.2,8.5,8.7,8.7,], 
		["Twisters",2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,], 
		["damage min",6,8,10,12,13,15,17,18,22,25,29,32,36,39,43,46,57,68,79,90,], 
		["damage max",9,11,13,16,18,20,23,25,29,33,37,41,45,49,53,57,68,79,90,101,], 
]};
/*[ 7] Volcano			*/ var d151 = {index:[0,""], values:[
		["damage min",9,11,13,16,18,20,23,25,30,34,39,44,48,53,58,62,69,76,83,90,], 
		["damage max",11,13,16,18,20,23,25,27,32,37,41,46,51,56,60,64,71,78,85,62,], 
		["fire min",9,11,13,16,18,20,23,25,30,34,39,44,48,53,58,62,69,76,83,90,], 
		["fire max",11,13,16,18,20,23,25,27,32,37,41,46,51,56,60,64,71,78,85,62,], 
]};
/*[ 8] Tornado			*/ var d152 = {index:[0,""], values:[
		["damage min",30,40,50,59,69,79,89,98,115,132,150,167,184,201,218,235,259,284,308,333,], 
		["damage max",42,52,62,71,81,91,101,111,129,147,165,184,202,220,239,257,283,308,334,359,], 
]};
/*[ 9] Armageddon		*/ var d161 = {index:[1," seconds<br>Radius: 3.3 yards<br>Mana Cost: 35"], values:[
		["Duration (Seconds)",60,66,69,72,75,78,81,84,87,90,93,96,99,102,105,108,111,114,117,117,], 
		["damage min",18,31,43,55,68,80,93,105,121,137,153,169,186,202,218,234,254,174,293,313,], 
		["damage max",55,68,80,93,105,117,130,142,161,179,198,217,235,254,272,291,313,336,358,380,], 
		["fire min",18,31,43,55,68,80,93,105,121,137,153,169,186,202,218,234,254,174,293,313,], 
		["fire max",55,68,80,93,105,117,130,142,161,179,198,217,235,254,272,291,313,336,358,380,], 
		["burning min",14,22,30,38,48,56,64,72,83,92,105,112,123,132,142,152,164,175,186,198,], 
		["burning max",18,28,36,44,52,62,70,78,89,98,108,118,128,138,148,158,169,180,192,203,], 
]};
/*[10] Hurricane		*/ var d162 = {index:[1," seconds<br>Radius: 6 yards<br>Mana Cost: 30"], values:[
		["Duration (Seconds)",60,63,66,69,72,75,78,81,84,97,90,93,96,99,102,105,108,111,114,117,], 
		["cold min",31,39,48,57,65,74,83,91,104,116,128,141,153,166,178,190,205,220,235,250,], 
		["cold max",62,70,79,88,96,105,114,112,135,147,159,172,184,197,209,221,236,251,266,281,], 
]};

/*[11] Werewolf			*/ var d211 = {index:[0,""], values:[
		["Magic and Physical damage Reduction",1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,], 
		["Magic and Physical damage Reduction",1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,], 
		["Attack Speed +%",20,28,35,40,45,48,51,53,56,57,59,61,62,63,64,66,66,67,68,68,], 
		["Damage +%",25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,115,120,], 
]};
/*[12] Lycanthropy		*/ var d212 = {index:[0,""], values:[
		["Max Life +%",4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,], 
		["Attack Rating %",50,62,74,86,98,110,122,134,146,158,170,182,194,206,218,230,242,254,266,278,], 
]};
/*[13] Werebear			*/ var d213 = {index:[0,""], values:[
		["Damage +%",55,67,79,91,103,115,127,139,151,163,175,187,199,211,223,235,247,259,271,283,], 
		["Defense +%",75,83,91,99,107,115,123,131,139,147,155,163,171,179,187,195,203,211,219,227,], 
]};
/*[14] Feral Rage		*/ var d221 = {index:[0,""], values:[
		["speed min",19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,19,], 
		["speed max",32,36,36,40,40,43,43,45,45,47,47,49,49,51,51,52,52,54,54,55,], 
		["life steal min",1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,], 
		["life steal max",3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,], 
		["Damage +%",50,55,60,65,70,75,80,85,90,95,100,105,110,115,120,125,130,135,140,145,], 
		["Attack +%",45,60,75,90,105,120,135,150,165,180,195,210,225,240,255,270,285,300,315,330,], 
]};
/*[15] Maul				*/ var d223 = {index:[0,""], values:[
		["Stun Length (Seconds)",1.2,1,0.8,0.6,0.4,0.2,0.2,0.2,0.2,0.2,0.2,0.2,0.2,0.2,0.2,0.2,0.2,0.2,0.2,0.2,], 
		["damage min",30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,], 
		["damage max",90,120,120,150,150,180,180,210,210,240,240,270,270,300,300,330,330,360,360,390,], 
		["Attack +%",50,70,90,110,130,150,170,190,210,230,250,270,290,310,330,350,370,390,410,430,], 
]};
/*[16] Rabies			*/ var d241 = {index:[0,""], values:[
		["attack",], 
		["poison min",], 
		["poison max",], 
]};
/*[17] Fire Claws		*/ var d252 = {index:[0,""], values:[
		["fire min",15,23,31,39,47,55,63,71,83,95,107,119,131,143,155,167,187,207,227,247,], 
		["fire max",20,28,36,44,52,60,68,76,88,100,112,124,136,148,160,172,194,216,238,260,], 
		["Attack +%",100,115,130,145,160,175,190,205,220,235,250,265,280,295,310,325,340,355,370,385,], 
]};
/*[18] Hunger			*/ var d232 = {index:[2," seconds"], values:[
		["Movement Speed%"], 
		["Duration"], 
		["Critical strike +%",5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,], 
		["Life Steal %",3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,], 
		["Mana Cost",3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,], 
]};
/*[19] Shock Wave		*/ var d243 = {index:[0,""], values:[
		["damage min",], 
		["damage max",], 
]};
/*[20] Fury				*/ var d261 = {index:[0,""], values:[
		["Attack +%",2.35,2.45,2.55,2.65,2.75,2.85,2.95,3.05,3.15,3.25,3.35,3.45,3.55,3.65,3.75,3.85,3.95,4.05,4.15,4.25,], 
		["Damage +%",1,1.2,1.4,1.6,1.8,2,2.2,2.4,2.6,2.8,3,3.2,3.4,3.6,3.8,4,4.2,4.4,4.6,4.8,], 
]};

/*[21] Raven			*/ var d312 = {index:[0,""], values:[
		["cold min",2,2,3,3,4,4,5,5,7,7,8,9,10,11,12,13,22,30,39,47,], 
		["cold max",3,3,4,4,5,5,6,6,9,9,11,12,14,15,17,18,27,36,45,54,], 
		["damage min",2,2,3,3,4,4,5,5,7,7,8,9,10,11,12,13,22,30,39,47,], 
		["damage max",3,3,4,4,5,5,6,6,9,9,11,12,14,15,17,18,27,36,45,54,], 
		["Ravens",3,4,5,6,7,8,9,10,11,12,11,12,12,12,12,12,12,12,12,12,], 
		["Mana Cost",1.5,1.7,2,2.2,2.5,2.7,3,3.2,3.5,3.7,4,4.2,4.5,4.7,5,5.2,5.5,5.7,6,6.2,], 
]};
/*[22] Poison Creeper	*/ var d313 = {index:[0,""], values:[
		["Life (All Difficulties)",50,62,75,87,100,112,125,137,150,162,175,187,200,212,225,237,250,262,275,287,], 
		["poison min",4,7,10,12,15,18,21,23,28,33,37,42,47,52,56,61,67,73,78,84,], 
		["poison max",6,8,11,14,17,19,22,25,30,34,39,44,48,53,58,63,68,74,80,86,], 
]};
/*[23]Heart of Wolverine*/ var d321 = {index:[0,""], values:[
		["Life",
			["Life (Normal)",136,142,149,156,163,170,176,183,190,197,204,210,217,224,231,238,244,251,258,265,], 
			["Life (Nightmare)",336,], 
			["Life (Hell)",872,], 
		], 
		["Damage +%",20,27,34,41,48,55,62,69,76,83,90,97,104,111,118,125,132,139,146,153,], 
		["Attack Rating +%",25,32,39,46,53,60,67,74,81,88,95,102,109,116,123,130,137,144,151,158,], 
		["Radius X Yards",20,21.3,22.6,24,25.3,26.6,28,29.3,30.6,32,33.3,34.6,36,37.3,38.6,40,41.3,42.6,44,45.3,], 
		["Mana Cost",10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,], 
]};
/*[24] Spirit Wolf		*/ var d332 = {index:[1,""], values:[
		["Life",
			["Life (Normal)",113,], 
			["Life (Nightmare)",185,], 
			["Life (Hell)",219,], 
		], 
		["damage min",12,15,18,21,24,28,31,34,38,42,46,50,55,59,63,67,72,78,83,88,], 
		["damage max",18,21,24,28,31,34,37,40,44,48,53,57,61,65,69,73,79,84,89,94,], 
		["Wolves",1,2,3,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,], 
		["Passive Attack Rating Bonus +%",50,75,100,125,150,175,200,225,250,275,300,325,350,375,400,425,450,475,500,525,], 
		["Passive Defense Bonus +%",50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,], 
]};
/*[25] Carrion Vine		*/ var d333 = {index:[0,""], values:[
		["Life (All Difficulties)",95,118,142,166,190,213,237,261,285,308,332,356,380,403,427,451,475,498,522,546,], 
		["heal min",24,28,32,36,40,44,48,52,56,60,64,68,72,76,80,84,88,92,96,100,], 
		["heal max",44,48,52,56,60,64,68,72,76,80,84,88,92,96,100,104,108,112,116,120,], 
]};
/*[26] Oak Sage			*/ var d361 = {index:[0,""], values:[
		["Life",
			["Life (Normal)",120,120,121,121,121,122,123,124,126,126,127,128,128,129,130,130,132,133,133,134,], 
			["Life (Nightmare)",420,], 
			["Life (Hell)",1240,], 
		], 
		["Heals",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,], 
		["Life granted",65,75,85,95,105,115,125,135,145,155,165,175,185,195,205,215,225,235,245,255,], 
		["Radius X Yards",20,21.3,22.6,24,25.3,26.6,28,29.3,30.6,32,33.3,34.6,36,37.3,38.6,40,41.3,42.6,44,45.3,], 
		["Mana Cost",15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,], 
]};
/*[27] Dire Wolf		*/ var d352 = {index:[2," percent"], values:[
		["Attack Rating %",], 
		["Defense %",], 
		["Life",
			["Life (Normal)",171,], 
			["Life (Nightmare)",193,], 
			["Life (Hell)",216,], 
		], 
		["damage min",], 
		["damage max",], 
		["Wolves",], 
		["Life Bonus %",], 
]};
/*[28] Solar Creeper	*/ var d353 = {index:[0,""], values:[
		["Life (All Difficulties)",165,], 
		["mana recovery min",], 
		["mana recovery max",], 
		["mana cost",], 
]};
/*[29] Spirit of Barbs	*/ var d341 = {index:[0,""], values:[
		["Life",
			["Life (Normal)",213,244,276,308,340,372,404,436,468,500,532,564,596,628,660,692,724,756,788,820,], 
			["Life (Nightmare)",413,], 
			["Life (Hell)",1026,], 
		], 
		["Damage Returned",15,23,31,39,47,55,63,71,87,103,119,135,151,167,183,199,227,255,283,311,], 
		["Radius X Yards",20,21.3,22.6,24,25.3,26.6,28,29.3,30.6,32,33.3,34.6,36,37.3,38.6,40,41.3,42.6,44,45.3,], 
		["Mana Cost",25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,], 
]};
/*[30] Grizzly			*/ var d362 = {index:[3," percent"], values:[
		["Life",
			["Life (Normal)",676,], 
			["Life (Nightmare)",1352,], 
			["Life (Hell)",2028,], 
		], 
		["Attack Rating %",], 
		["Defense %",], 
		["damage min",], 
		["damage max",], 
		["Damage Bonus %",], 
]};

var skills_pd2_druid = [
{data:d111, key:"111", code:220, name:"Firestorm", i:0, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, bindable:2, style:"display: block; top: 82px; left: 2px;", description:"Unleash fiery chaos to burn your enemies<br>Fire speed and range increase per level<br><br>Mana Cost: 4", syn_title:"<br>Firestorm Receives Bonuses From:<br>", syn_text:"Molten Boulder: +23% Fire Damage per Level<br>Fissure: +23% Fire Damage per Level", graytext:"", text:["Average Fire Damage: ","-"," per second"]},
{data:d121, key:"121", code:221, name:"Molten Boulder", i:1, req:[0], reqlvl:6, level:0, extra_levels:0, force_levels:0, bindable:2, style:"display: block; top: 150px; left: 2px;", description:"Launch a boulder of flaming hot magma<br>that knocks back your enemies<br>Boulder speed increases per level", syn_title:"<br>Molten Boulder Receives Bonuses From:<br>", syn_text:"Fissure: +10% Damage per Level<br>Volcano: +10% Damage per Level<br>Armageddon: +10% Damage per Level", graytext:"", text:["Damage: ","-","<br>Fire Damage: ","-","<br>Average Fire Damage: ","-"," per second<br>Mana Cost: ",""]},
{data:d143, key:"143", code:222, name:"Gust", i:2, req:[1,0], reqlvl:18, level:0, extra_levels:0, force_levels:0, bindable:1, style:"display: block; top: 286px; left: 72px;", description:"Instantly moves to a destination stunning<br>enemies upon arrival for .2 seconds", syn_title:"", syn_text:"", graytext:"", text:["Cooldown: "," seconds<br>Mana Cost: 20"]},
{data:d113, key:"113", code:223, name:"Arctic Blast", i:3, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, bindable:2, style:"display: block; top: 82px; left: 142px;", description:"Blast a continous jet of ice<br>to burn your enemies with frost<br><br>Minimum Mana Required to Cast: 4", syn_title:"<br>Arctic Blast Receives Bonuses From:<br>", syn_text:"Hurricane: +25% Cold Damage per Level<br>Tornado: +18% Cold Damage per Level<br>Twister: +18% Cold Damage per Level<br>Cyclone Armor: +18% Cold Damage per Level", graytext:"", text:["Average Cold Damage: ","-"," per second<br>Cold Length: "," seconds<br>Range: "," yards<br>Mana Cost: "," per second",""]},
{data:d131, key:"131", code:224, name:"Fissure", i:4, req:[1,0], reqlvl:12, level:0, extra_levels:0, force_levels:0, bindable:1, style:"display: block; top: 218px; left: 2px;", description:"Open volcanic vents below your enemies,<br>burning them to a crisp<br><br>Mana Cost: 10", syn_title:"<br>Fissure Receives Bonuses From:<br>", syn_text:"Firestorm: +6% Fire Damage per Level<br>Molten Boulder: +6% Fire Damage per Level", graytext:"", text:["Fire Damage: ","-","<br>Duration: 2.2 seconds",""]},
{data:d123, key:"123", code:225, name:"Cyclone Armor", i:5, req:[3], reqlvl:6, level:0, extra_levels:0, force_levels:0, effect:0, bindable:1, style:"display: block; top: 150px; left: 142px;", description:"Shield yourself from damage caused by<br>fire, cold, and lightning", syn_title:"", syn_text:"", graytext:"", text:["Absorbs "," damage<br>Mana Cost: ",""]},
{data:d132, key:"132", code:226, name:"Twister", i:6, req:[5,3], reqlvl:12, level:0, extra_levels:0, force_levels:0, bindable:2, style:"display: block; top: 218px; left: 72px;", description:"Release several small whirlwinds that<br>cut a path through your enemies", syn_title:"<br>Twister Receives Bonuses From:<br>", syn_text:"Hurricane: +15% Damage per Level<br>Tornado: +15% Damage per Level<br>Arctic Blast: +15% Damage per Level", graytext:"", text:["Mana Cost: ","Twisters: ","<br>Damage: ","-",""]},
{data:d151, key:"151", code:227, name:"Volcano", i:7, req:[4,1,0], reqlvl:24, level:0, extra_levels:0, force_levels:0, bindable:1, style:"display: block; top: 354px; left: 2px;", description:"Summon forth a volcano to rain death<br>and destruction over your enemies<br><br>Mana Cost: 12", syn_title:"<br>Volcano Receives Bonuses From:<br>", syn_text:"Molten Boulder: +8% Damage per Level<br>Fissure: +8% Damage per Level<br>Armageddon: +8% Damage per Level", graytext:"", text:["Damage: ","-","<br>Fire Damage: ","-",""]},
{data:d152, key:"152", code:228, name:"Tornado", i:8, req:[6,5,3], reqlvl:24, level:0, extra_levels:0, force_levels:0, bindable:2, style:"display: block; top: 354px; left: 72px;", description:"Create a funnel of wind and debris<br>to blast your enemies<br><br>Mana Cost: 10", syn_title:"<br>Tornado Receives Bonuses From:<br>", syn_text:"Arctic Blast: +11% Damage per Level<br>Twister: +11% Damage per Level<br>Hurricane: +11% Damage per Level", graytext:"", text:["Damage: ","-",""]},
{data:d161, key:"161", code:229, name:"Armageddon", i:9, req:[7,4,1,0], reqlvl:30, level:0, extra_levels:0, force_levels:0, effect:0, bindable:2, style:"display: block; top: 422px; left: 2px;", description:"Create a meteor shower to rain fiery<br>destruction on nearby enemies", syn_title:"<br>Armageddon Receives Bonuses From:<br>", syn_text:"Fissure: +8% Fire Damage per Level<br>Molten Boulder: +8% Fire Damage per Level<br>Volcano: +8% Fire Damage per Level", graytext:"", text:["Duration: ","Damage: ","-","<br>Fire Damage: ","-","<br>Average Fire Damage: ","-"," per second"]},
{data:d162, key:"162", code:230, name:"Hurricane", i:10, req:[8,6,5,3], reqlvl:30, level:0, extra_levels:0, force_levels:0, effect:0, bindable:2, style:"display: block; top: 422px; left: 72px;", description:"Create a massive storm of wind and<br>debris to pound your enemies to bits", syn_title:"<br>Hurricane Receives Bonuses From:<br>", syn_text:"Arctic Blast: +8% Damage per Level<br>Tornado: +8% Damage per Level<br>Twister: +8% Damage per Level", graytext:"", text:["Duration: ","Cold Damage: ","-",""]},

{data:d211, key:"211", code:231, name:"Werewolf", i:11, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, effect:0, bindable:1, style:"display: block; top: 82px; left: 204px;", description:"Transform into a werewolf<br><br>Mana Cost: 15", syn_title:"<br>Werewolf Receives Bonuses From:<br>", syn_text:"Lycanthropy", graytext:"", text:["Magic Damage Reduction: +","<br>Physical Damage Reduction: +","<br>Damage: +"," percent<br>Attack Speed: +"," percent",""]},
{data:d212, key:"212", code:232, name:"Lycanthropy", i:12, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, bindable:0, style:"display: block; top: 82px; left: 234px;", description:"Passive - Improves duration and life<br>when in werewolf or werebear form", syn_title:"", syn_text:"", graytext:"", text:["Max Life: +"," percent<br>To Attack Rating: +"," percent"]},
{data:d213, key:"213", code:233, name:"Werebear", i:13, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, effect:0, bindable:1, style:"display: block; top: 82px; left: 264px;", description:"Transform into a werebear<br><br>Mana Cost: 15", syn_title:"<br>Werebear Receives Bonuses From:<br>", syn_text:"Lycanthropy", graytext:"", text:["Damage: +"," percent<br>Defense: +"," percent"]},
{data:d221, key:"221", code:234, name:"Feral Rage", i:14, req:[11], reqlvl:6, level:0, extra_levels:0, force_levels:0, effect:0, bindable:2, style:"display: block; top: 150px; left: 164px;", description:"When in werewolf form,<br>go into a frenzied rage to steal<br>increasing amounts of life from your enemies<br>with successive hits<br><br>Mana Cost: 3<br>Duration: 20 seconds", syn_title:"", syn_text:"", graytext:"", text:["Walk/Run Speed: +","-"," percent<br>Life Steal: +","-"," percent<br>Damage: +"," percent<br>Attack: +"," percent"]},
{data:d223, key:"223", code:235, name:"Maul", i:15, req:[13], reqlvl:6, level:0, extra_levels:0, force_levels:0, effect:0, bindable:2, style:"display: block; top: 150px; left: 304px;", description:"When in werebear form,<br>maul your enemies<br>for increasing extra damage<br>with successive hits<br><br>Mana Cost: 3<br>Duration: 20 seconds", syn_title:"", syn_text:"", graytext:"", text:["Stun Length: "," seconds<br>Damage: +","-"," percent<br>Attack: +"," percent"]},
{data:d241, key:"241", code:236, name:"Rabies", i:16, req:[14,11], reqlvl:18, level:0, extra_levels:0, force_levels:0, bindable:2, style:"display: block; top: 286px; left: 184px;", description:"When in werewolf form,<br>bite your enemies<br>to inflict them with disease<br>that spreads to other monsters<br><br>Mana Cost: 10", syn_title:"<br>Rabies Receives Bonuses From:<br>", syn_text:"Poison Creeper: +22% Poison damage per Level<br>Feral Rage: +22% Poison Damage per Level", graytext:"", text:["Attack: +"," percent<br>Poison Damage: ","-","<br>over 5 seconds",""]},
{data:d252, key:"252", code:237, name:"Fire Claws", i:17, req:[], reqlvl:24, level:0, extra_levels:0, force_levels:0, bindable:2, style:"display: block; top: 354px; left: 144px;", description:"When in werewolf or werebear<br>form, maul your enemies<br>with a fiery claw attack", syn_title:"<br>Fire Claws Receives Bonuses From:<br>", syn_text:"Firestorm: +22% Fire Damage per Level<br>Molten Boulder: +22% Fire Damage per Level<br>Fissure: +22% Fire Damage per Level<br>Volcano: +22% Fire Damage per Level", graytext:"", text:["Fire Damage: ","-","<br>Attack: +"," percent<br>Mana Cost: 4"]},
{data:d232, key:"232", code:238, name:"Hunger", i:18, req:[15,13], reqlvl:12, level:0, extra_levels:0, force_levels:0, bindable:2, style:"display: block; top: 218px; left: 204px;", description:"While in werebear form, consume a corpse to temporarily<br>gain movement speed, critical strike and life steal", syn_title:"", syn_text:"", graytext:"", text:["Gains +1 Second Duration and +1% Movement Speed per Base Level<br>+","% Movement Speed<br>Duration: ",""," percent chance of Critical Strike<br>Life Steal: "," percent<br>Mana Cost: ",""]},
{data:d243, key:"243", code:239, name:"Shock Wave", i:19, req:[15,13], reqlvl:18, level:0, extra_levels:0, force_levels:0, bindable:2, style:"display: block; top: 286px; left: 254px;", description:"When in werebear form,<br>stomp to create a shock wave<br>that stuns nearby enemies", syn_title:"<br>Shock Wave Receives Bonuses From:<br>", syn_text:"Werebear: +14% Damage per Level<br>Twister: +14% Damage per Level<br>Tornado: +14% Damage per Level", graytext:"", text:["Stun Length: 0.2 seconds<br>Damage: ","-","<br>Mana Cost: 7"]},
{data:d261, key:"261", code:240, name:"Fury", i:20, req:[16,14,11], reqlvl:30, level:0, extra_levels:0, force_levels:0, bindable:2, style:"display: block; top: 422px; left: 204px;", description:"When in werewolf form, attack<br>either multiple adjacent targets<br>or one target multiple times", syn_title:"", syn_text:"", graytext:"", text:["3 hits<br>Attack Bonus: +"," percent<br>Damage: +"," percent<br>Mana Cost: 4"]},

{data:d312, key:"312", code:241, name:"Raven", i:21, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, bindable:1, style:"display: block; top: 82px; left: 266px;", description:"Summon ravens to peck out<br>the eyes of your enemies<br><br>Summon an Additional Raven per Cast every 10 Base Levels", syn_title:"<br>Raven Receives Bonuses From:<br>", syn_text:"Summon Spirit Wolf: +12% Damage per Level<br>Summon Dire Wolf: +12% Damage per Level<br>Summon Grizzly: +12% Damage per Level<br>", graytext:"", text:["Cold Damage: ","-","<br>Damage: ","-","<br>5 hits<br>Ravens: ","<br>Mana Cost: ",""]},
{data:d313, key:"313", code:242, name:"Poison Creeper", i:22, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, effect:0, bindable:1, style:"display: block; top: 82px; left: 376px;", description:"Summon a vine that spreads<br>disease to all it contacts", syn_title:"<br>Poison Creeper Receives Bonuses From:<br>", syn_text:"Carrion Vine: +8% Poison Damage per Level<br>Solar Creeper: +8% Poison Damage per Level<br>Rabies: +8% Poison Damage per Level", graytext:"", text:["Life: ","<br>Poison Damage: ","-","<br>over 4 seconds<br>Mana Cost: 8"]},
{data:d321, key:"321", code:243, name:"Heart of Wolverine", i:23, req:[], reqlvl:6, level:0, extra_levels:0, force_levels:0, effect:0, bindable:1, style:"display: block; top: 150px; left: 336px;", description:"Summon a spirit pet that adds<br>to the damage and attack rating<br>of you and your party", syn_title:"", syn_text:"", graytext:"", text:["Life: ","<br>Damage: +"," percent<br>Attack: +"," percent<br>Radius: "," yards<br>Mana Cost: ",""]},
{data:d332, key:"332", code:244, name:"Summon Spirit Wolf", i:24, req:[23,21], reqlvl:12, level:0, extra_levels:0, force_levels:0, bindable:1, style:"display: block; top: 218px; left: 366px;", description:"Summon a wolf with teleporting ability<br>to fight by your side", syn_title:"<br>Summon Spirit Wolf Receives Bonuses From:<br>", syn_text:"Raven: +6% Damage per Level<br>Summon Dire Wolf: +6% Damage per Level<br>Summon Grizzly: +6% Damage per Level<br>Werewolf: +6% Damage per Level<br>Werebear: -9% Damage per Level<br>", graytext:"", text:["Mana Cost: 15<br>Life: ","Damage: ","-","<br>Wolves: ","<br>Attack: +"," percent<br>Defense: +"," percent"]},
{data:d333, key:"333", code:245, name:"Carrion Vine", i:25, req:[22], reqlvl:12, level:0, extra_levels:0, force_levels:0, effect:0, bindable:1, style:"display: block; top: 218px; left: 406px;", description:"Summon a vine that eats corpses<br>and replenishes life for you and your party", syn_title:"<br>Carrion Vine Receives Bonuses From:<br>", syn_text:"Oak Sage: +2-4 Life Healed per Level<br>Solar Creeper: +2-4 Life Healed per Level", graytext:"", text:["Life: ","<br>Heals: ","-","<br>Mana Cost: 10"]},
{data:d361, key:"361", code:246, name:"Oak Sage", i:26, req:[29,23], reqlvl:30, level:0, extra_levels:0, force_levels:0, effect:0, bindable:1, style:"display: block; top: 422px; left: 326px;", description:"Summon a spirit pet that increases life and<br>grants health regeneration for you and your party", syn_title:"<br>Oak Sage Receives Bonuses From:<br>", syn_text:"Carrion Vine: +0.5 Health Regeneration per Level<br>Solar Creeper: +0.5 Health Regeneration per Level", graytext:"", text:["Life: ","<br>Heals: +","<br>Max Life: "," life<br>Radius: "," yards<br>Mana Cost: ",""]},
{data:d352, key:"352", code:247, name:"Summon Dire Wolf", i:27, req:[23,24,21], reqlvl:24, level:0, extra_levels:0, force_levels:0, bindable:1, style:"display: block; top: 354px; left: 336px;", description:"Summon a wolf that becomes enraged,<br>eating corpses to increase damage<br>it does to enemies", syn_title:"<br>Summon Dire Wolf Receives Bonuses From:<br>", syn_text:"Raven: +4% Damage per Level<br>Summon Spirit Wolf: +4% Damage per Level<br>Summon Spirit Wolf: +25% Attack Rating per Level<br>Summon Grizzly: +4% Damage per Level<br>Werewolf: +4% Damage per Level<br>Werebear: -6% Damage per Level<br>", graytext:"", text:["Mana Cost: 20<br>Attack: +"," percent<br>Defense: +","Life: ","<br>Damage: ","-","<br>Wolves: ","<br>Life: +"," percent"]},
{data:d353, key:"353", code:248, name:"Solar Creeper", i:28, req:[25,22], reqlvl:24, level:0, extra_levels:0, force_levels:0, effect:0, bindable:1, style:"display: block; top: 354px; left: 376px;", description:"Summon a vine that eats corpses<br>and recovers mana for you and your party", syn_title:"<br>Solar Creeper Receives Bonuses From:<br>", syn_text:"Oak Sage: +1-3 Mana Recovered per Level<br>Carrion Vine: +1-3 Mana Recovered per Level", graytext:"", text:["Life: ","<br>Mana Recovered: ","-","<br>Mana Cost: ",""]},
{data:d341, key:"341", code:249, name:"Spirit of Barbs", i:29, req:[23], reqlvl:18, level:0, extra_levels:0, force_levels:0, effect:0, bindable:1, style:"display: block; top: 286px; left: 296px;", description:"Summon spirit pet that reflects damage<br>taken by you and your party<br>back at your enemies", syn_title:"", syn_text:"", graytext:"", text:["Life: ","<br>Returns "," Damage to Attackers<br>Radius: "," yards<br>Mana Cost: ",""]},
{data:d362, key:"362", code:250, name:"Summon Grizzly", i:30, req:[27,23,24,21], reqlvl:30, level:0, extra_levels:0, force_levels:0, bindable:1, style:"display: block; top: 422px; left: 316px;", description:"Summon a ferocious grizzly bear<br>Can summon an additional grizzly bear at base level 20", syn_title:"<br>Summon Grizzly Receives Bonuses From:<br>", syn_text:"Raven: +6% Damage per Level<br>Summon Spirit Wolf: +25% Attack Rating per Level<br>Summon Spirit Wolf: +6% Damage per Level<br>Summon Dire Wolf: +6% Damage per Level<br>Werebear: +6% Damage per Level<br>Werewolf: -12% Damage per Level<br>", graytext:"", text:["Mana Cost: 40<br>Life: ","<br>Attack: +"," percent<br>Defense: +","Damage: ","-","<br>Damage: +"," percent"]}
];
