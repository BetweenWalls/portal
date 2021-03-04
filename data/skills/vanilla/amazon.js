
// TODO: update data for levels 1-60
// TODO: review stats & frame info

var character_amazon_vanilla = {class_name:"Amazon", strength:20, dexterity:25, vitality:20, energy:15, life:50, mana:15, stamina:184, levelup_life:2.5, levelup_stamina:1, levelup_mana:1.5, ar_per_dexterity:5, life_per_vitality:3, stamina_per_vitality:1, mana_per_energy:1.5, starting_strength:20, starting_dexterity:25, starting_vitality:20, starting_energy:15, ar_const:10, block_const:3, skill_layout:"./images/skill_trees/vanilla/amazon.png", mana_regen:1.66,
	weapon_frames:{dagger:12, sword:[13,17], axe:[13,17], mace:[13,17], thrown:[13,12], staff:17, polearm:17, scepter:13, wand:13, javelin:12, spear:17, bow:13, crossbow:19},
	// Skills that may adjust IAS breakpoints: Jab, Fend, Strafe
	fcr_frames:19, fcr_bp:[0, 7, 14, 22, 32, 48, 68, 99, 152],
	fhr_frames:11, fhr_bp:[0, 6, 13, 20, 32, 52, 86, 174, 600],
	fbr_frames:5, fbr_bp:[0, 13, 32, 86, 600],
	fbr_frames_alt:17, fbr_bp_alt:[0, 4, 6, 11, 15, 23, 29, 40, 56, 80, 120, 200, 480],	// 1-hand swinging weapons (axes, maces, swords, throwing axes, wands)
	
	// getSkillData - gets skill info from the skills data table
	//	skill: skill object for the skill in question
	//	lvl: level of the skill
	//	elem: which element of the skill to return
	// result: value of the skill element at the specified level
	// ---------------------------------
	getSkillData : function(skill, lvl, elem) {
		var result = skill.data.values[elem][lvl];
		
		if (skill.name == "Poison Javelin" && elem < 2) { 					result *= ((1 + 0.12*skills[6].level) * (1+character.pDamage/100)) }
		if (skill.name == "Plague Javelin" && elem > 0 && elem < 3) { 		result *= ((1 + 0.10*skills[2].level) * (1+character.pDamage/100)) }
		if (skill.name == "Power Strike" && elem > 0 && elem < 3) { 		result *= ((1 + 0.10*skills[4].level + 0.10*skills[5].level + 0.10*skills[8].level + 0.10*skills[9].level) * (1+character.lDamage/100)) }
		if (skill.name == "Lightning Bolt" && elem < 2) { 					result *= ((1 + 0.03*skills[1].level + 0.03*skills[5].level + 0.03*skills[8].level + 0.03*skills[9].level) * (1+character.lDamage/100)) }
		if (skill.name == "Charged Strike" && elem > 0 && elem < 3) { 		result *= ((1 + 0.10*skills[1].level + 0.10*skills[4].level + 0.10*skills[8].level + 0.10*skills[9].level) * (1+character.lDamage/100)) }
		if (skill.name == "Lightning Strike" && elem > 0 && elem < 3) { 	result *= ((1 + 0.08*skills[1].level + 0.08*skills[4].level + 0.08*skills[5].level + 0.08*skills[9].level) * (1+character.lDamage/100)) }
		if (skill.name == "Lightning Fury" && elem > 0 && elem < 3) { 		result *= ((1 + 0.01*skills[1].level + 0.01*skills[4].level + 0.01*skills[5].level + 0.01*skills[8].level) * (1+character.lDamage/100)) }
		
		if (skill.name == "Valkyrie" && elem == 0) { 						result = skill.data.values[elem][character.difficulty][lvl] * (1 + 0.20*skills[17].level) }
		if (skill.name == "Valkyrie" && elem == 1) { 						result += (40*skills[15].level) }
		
		if (skill.name == "Cold Arrow" && elem > 1 && elem < 4) { 			result *= ((1 + 0.12*skills[24].level) * (1+character.cDamage/100)) }
		if (skill.name == "Ice Arrow" && elem > 0 && elem < 3) { 			result *= ((1 + 0.08*skills[20].level) * (1+character.cDamage/100)) }
		if (skill.name == "Ice Arrow" && elem == 3) { 						result *= (1 + 0.05*skills[29].level) }
		if (skill.name == "Freezing Arrow" && elem == 0) { 					result = ~~skill.data.values[elem][skill.level] + 2.6-2.6*Math.min(1,skill.level) }
		if (skill.name == "Freezing Arrow" && elem > 1 && elem < 4) { 		result *= ((1 + 0.12*skills[20].level) * (1+character.cDamage/100)) }
		if (skill.name == "Freezing Arrow" && elem == 4) { 					result *= (1 + 0.05*skills[24].level) }
		if (skill.name == "Fire Arrow" && elem > 1 && elem < 4) { 			result *= ((1 + 0.12*skills[26].level) * (1+character.fDamage/100)) }
		if (skill.name == "Exploding Arrow" && elem > 0 && elem < 3) { 		result *= ((1 + 0.12*skills[23].level) * (1+character.fDamage/100)) }
		if (skill.name == "Immolation Arrow" && elem > 0 && elem < 3) { 	result *= ((1 + 0.10*skills[26].level) * (1+character.fDamage/100)) }
		if (skill.name == "Immolation Arrow" && elem > 2 && elem < 5) { 	result *= ((1 + 0.05*skills[23].level) * (1+character.fDamage/100)) }
		
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
		var attack = 0;	// 0 = no basic damage, 1 = includes basic attack damage, 2 = includes basic throw damage
		var spell = 2;	// 0 = uses attack rating, 1 = no attack rating, 2 = non-damaging
		var damage_enhanced = character.damage_bonus + character.e_damage;
		
		// unsupported
		
		var result = {min:skillMin,max:skillMax,ar:skillAr};
		return result
	},
	
	// setSkillAmounts - helps update class-related skill levels, called by calculateSkillAmounts()
	//	s: index of skill
	// ---------------------------------
	setSkillAmounts : function(s) {
		skills[s].extra_levels += character.skills_amazon
		if (s == 23 || s == 26 || s == 28) { skills[s].extra_levels += character.skills_fire_all }
		if (s < 10) {
			skills[s].extra_levels += character.skills_javelins
			skills[s].extra_levels += character.skills_tree1
		} else if (s > 19) {
			skills[s].extra_levels += character.skills_bows
			skills[s].extra_levels += character.skills_tree3
		} else {
			skills[s].extra_levels += character.skills_passives
			skills[s].extra_levels += character.skills_tree2
		}
	}
};

/*[ 0] Jab				*/ var d111 = {values:[
		["attack rating bonus",25,40,55,70,85,100,115,130,145,160,175,190,205,220,235,250,265,280,295,310,325,340,355,370,385,400,415,430,445,460,475,490,505,520,535,550,565,580,595,610,625,640,655,670,685,700,715,730,745,760,775,790,805,820,835,850,865,880,895,910,], 
		["damage",15,30,45,60,75,90,105,120,135,150,165,180,195,210,225,240,255,270,285,300,315,330,345,360,375,390,405,420,435,450,465,480,495,510,525,540,555,570,585,600,615,630,645,660,675,690,705,720,735,750,765,780,795,810,825,840,855,870,885,900,], 
		["mana cost",1.5,1.7,2,2.2,2.5,2.7,3,3.2,3.5,3.7,4,4.2,4.5,4.7,5,5.2,5.5,5.7,6,6.2,6.5,6.7,7,7.2,7.5,7.7,8,8.2,8.5,8.7,9,9.2,9.5,9.7,10,10.2,10.5,10.7,11,11.2,11.5,11.7,12,12.2,12.5,12.7,13,13.2,13.5,13.7,14,14.2,14.5,14.7,15,15.2,15.5,15.7,16,16.2,], 
]};
/*[ 1] Power Strike		*/ var d122 = {values:[
		["attack rating bonus",20,32,44,56,68,80,92,104,116,128,140,152,164,176,188,200,212,224,236,248,260,272,284,296,308,320,332,344,356,368,380,392,404,416,428,440,452,464,476,488,500,512,524,536,548,560,572,584,596,608,620,632,644,656,668,680,692,704,716,728,], 
		["lightning min",1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,], 
		["lightning max",1,3,5,7,9,11,13,15,19,23,27,31,35,39,43,47,59,71,83,95,107,119,140,161,182,203,224,245,275,305,335,365,395,425,455,485,515,545,575,605,635,665,695,725,755,785,815,845,875,905,935,965,995,1025,1055,1085,1115,1145,1175,1205,], 
		["mana cost",2,2.1,2.3,2.5,2.7,2.9,3.1,3.3,3.5,3.6,3.8,4,4.2,4.4,4.6,4.8,5,5.1,5.3,5.5,5.7,5.9,6.1,6.3,6.5,6.6,6.8,7,7.2,7.4,7.6,7.8,8,8.1,8.3,8.5,8.7,8.9,9.1,9.3,9.5,9.6,9.8,10,10.2,10.4,10.6,10.8,11,11.1,11.3,11.5,11.7,11.9,12.1,12.3,12.5,12.6,12.8,13,], 
]};
/*[ 2] Poison Javelin	*/ var d123 = {values:[
		["poison min",2,4,6,9,11,13,16,18,25,32,39,46,53,60,67,74,88,102,116,131,145,159,187,215,143,271,299,327,384,440,496,552,609,665,721,777,834,890,946,1002,1059,1115,1171,1227,1284,1340,1396,1452,1509,1565,1621,1677,1734,1790,1846,1902,1959,2015,2071,2127,], 
		["poison max",5,7,10,12,15,17,19,22,29,37,44,51,58,66,73,80,95,110,124,139,154,168,198,227,256,286,315,344,403,461,520,579,637,696,754,813,871,930,989,1047,1106,1164,1223,1282,1340,1399,1457,1516,1575,1633,1692,1750,1809,1868,1926,1985,2043,2102,2161,2219,], 
		["mana cost",1.5,1.7,2,2.2,2.5,2.7,3,3.2,3.5,3.7,4,4.2,4.5,4.7,5,5.2,5.5,5.7,6,6.2,6.5,6.7,7,7.2,7.5,7.7,8,8.2,8.5,8.7,9,9.2,9.5,9.7,10,10.2,10.5,10.7,11,11.2,11.5,11.7,12,12.2,12.5,12.7,13,13.2,13.5,13.7,14,14.2,14.5,14.7,15,15.2,15.5,15.7,16,16.2,], 
]};
/*[ 3] Impale			*/ var d131 = {values:[
		["damage",35,45,55,65,75,85,95,105,115,125,135,145,155,165,175,185,195,205,215,225,235,245,255,265,275,285,295,305,315,325,335,345,355,365,375,385,395,405,415,425,435,445,455,465,475,485,495,505,515,525,535,545,555,565,575,585,595,605,615,625,], 
		["attack",35,45,55,65,75,85,95,105,115,125,135,145,155,165,175,185,195,205,215,225,235,245,255,265,275,285,295,305,315,325,335,345,355,365,375,385,395,405,415,425,435,445,455,465,475,485,495,505,515,525,535,545,555,565,575,585,595,605,615,625,], 
		["chance to lose durability",5,9,12,15,17,19,20,21,23,23,24,25,26,26,27,28,28,28,29,29,29,30,30,30,30,31,31,31,31,31,32,32,32,32,32,32,32,33,33,33,33,33,33,33,33,33,33,33,34,34,34,34,34,34,34,34,34,34,34,35,], 
		["mana cost",3,1.7,2,2.2,2.5,2.7,3,3.2,3.5,3.7,4,4.2,4.5,4.7,5,5.2,5.5,5.7,6,6.2,6.5,6.7,7,7.2,7.5,7.7,8,8.2,8.5,8.7,9,9.2,9.5,9.7,10,10.2,10.5,10.7,11,11.2,11.5,11.7,12,12.2,12.5,12.7,13,13.2,13.5,13.7,14,14.2,14.5,14.7,15,15.2,15.5,15.7,16,16.2,], 
]};
/*[ 4] Lightning Bolt	*/ var d133 = {values:[
		["lightning min",1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,], 
		["lightning max",40,52,64,76,88,100,112,124,150,176,202,228,254,280,306,332,386,440,494,548,602,656,738,820,902,984,1066,1148,1258,1368,1478,1588,1698,1808,1918,2028,2138,2248,2358,2468,2578,2688,2798,2908,3018,3128,3238,3348,3458,3568,3678,3788,3898,4008,4118,4228,4338,4448,4558,4668,], 
		["mana cost",4,4.2,4.5,4.7,5,5.2,5.5,5.7,6,6.2,6.5,6.7,7,7.2,7.5,7.7,8,8.2,8.5,8.7,9,9.2,9.5,9.7,10,10.2,10.5,10.7,11,11.2,11.5,11.7,12,12.2,12.5,12.7,13,13.2,13.5,13.7,14,14.2,14.5,14.7,15,15.2,15.5,15.7,16,16.2,16.5,16.7,17,17.2,17.5,17.7,18,18.2,18.5,18.7,], 
]};
/*[ 5] Charged Strike	*/ var d142 = {values:[
		["bolts",2,2,2,2,3,3,3,3,3,4,4,4,4,4,5,5,5,5,5,6,6,6,6,6,7,7,7,7,7,8,8,8,8,8,9,9,9,9,9,10,10,10,10,10,11,11,11,11,11,12,12,12,12,12,13,13,13,13,13,14,], 
		["lightning min",1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,], 
		["lightning max",40,52,64,76,88,100,112,124,140,156,172,188,204,220,236,252,272,292,312,332,352,372,396,420,444,468,492,516,544,572,600,628,656,684,712,740,768,796,824,852,880,908,936,964,992,1020,1048,1076,1104,1132,1160,1188,1216,1244,1272,1300,1328,1356,1384,1412,], 
		["mana cost",4,4.2,4.5,4.7,5,5.2,5.5,5.7,6,6.2,6.5,6.7,7,7.2,7.5,7.7,8,8.2,8.5,8.7,9,9.2,9.5,9.7,10,10.2,10.5,10.7,11,11.2,11.5,11.7,12,12.2,12.5,12.7,13,13.2,13.5,13.7,14,14.2,14.5,14.7,15,15.2,15.5,15.7,16,16.2,16.5,16.7,17,17.2,17.5,17.7,18,18.2,18.5,18.7,], 
]};
/*[ 6] Plague Javelin	*/ var d143 = {values:[
		["attack rating bonus",50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,620,630,640,], 
		["poison min",23,37,51,65,79,93,107,121,150,178,206,234,262,290,318,346,393,440,487,534,581,628,721,815,909,1003,1096,1190,1378,1565,1753,1940,2128,2315,2503,2690,2878,3065,3253,3440,3628,3815,4003,4190,4378,4565,4753,4940,5128,5315,5503,5690,5878,6065,6253,6440,6628,6815,7003,7190,], 
		["poison max",37,51,65,79,93,107,121,135,164,192,220,248,276,304,332,360,407,454,501,548,595,642,735,829,923,1017,1110,1204,1392,1579,1767,1954,2142,2329,2517,2704,2892,3079,3267,3454,3642,3829,4017,4204,4392,4579,4767,4954,5142,5329,5517,5704,5892,6079,6267,6454,6642,6829,7017,7204,], 
		["mana cost",7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13,13.5,14,14.5,15,15.5,16,16.5,17,17.5,18,18.5,19,19.5,20,20.5,21,21.5,22,22.5,23,23.5,24,24.5,25,25,26,26,27,27,28,28,29,29,30,30,31,31,32,32,33,33,34,34,35,35,36,36,], 
]};
/*[ 7] Fend				*/ var d151 = {values:[
		["attack rating bonus",160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,620,630,640,650,660,670,680,690,700,710,720,730,740,750,], 
		["damage",100,120,140,160,180,200,220,240,260,280,300,320,340,360,380,400,420,440,460,480,500,520,540,560,580,600,620,640,660,680,700,720,740,760,780,800,820,840,860,880,900,920,940,960,980,1000,1020,1040,1060,1080,1100,1120,1140,1160,1180,1200,1220,1240,1260,1280,], 
]};
/*[ 8] Lightning Strike	*/ var d162 = {values:[
		["hits",4,5,6,7,8,9,10,11,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,12,], 
		["lightning min",1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,], 
		["lightning max",25,35,45,55,65,75,85,95,115,135,155,175,195,215,235,255,290,325,360,395,430,465,520,575,630,685,740,795,870,945,1020,1095,1170,1245,1320,1395,1470,1545,1620,1695,1770,1845,1920,1995,2070,2145,2220,2295,2370,2445,2520,2595,2670,2745,2820,2895,2970,3045,3120,3195,], 
		["mana cost",6,6.2,6.5,6.7,7,7.2,7.5,7.7,8,8.2,8.5,8.7,9,9.2,9.5,9.7,10,10.2,10.5,10.7,11,11.2,11.5,11.7,12,12.2,12.5,12.7,13,13.2,13.5,13.7,14,14.2,14.5,14.7,15,15.2,15.5,15.7,16,16.2,16.5,16.7,17,17.2,17.5,17.7,18,18.2,18.5,18.7,19,19.2,19.5,19.7,20,20.2,20.5,20.7,], 
]};
/*[ 9] Lightning Fury	*/ var d163 = {values:[
		["bolts",2,2,2,2,3,3,3,3,3,4,4,4,4,4,5,5,5,5,5,6,6,6,6,6,7,7,7,7,7,8,8,8,8,8,9,9,9,9,9,10,10,10,10,10,11,11,11,11,11,12,12,12,12,12,13,13,13,13,13,14,], 
		["lightning min",1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,], 
		["lightning max",40,54,68,82,96,110,124,138,155,172,189,206,223,240,257,274,292,310,328,346,364,382,401,420,439,458,477,496,516,536,556,576,596,616,636,656,676,696,716,736,756,776,796,816,836,856,876,896,916,936,956,976,996,1016,1036,1056,1076,1096,1116,1136,], 
		["mana cost",10,10.5,11,11.5,12,12.5,13,13.5,14,14.5,15,15.5,16,16.5,17,17.5,18,18.5,19,19.5,20,20.5,21,21.5,22,22.5,23,23.5,24,24.5,25,25,26,26,27,27,28,28,29,29,30,30,31,31,32,32,33,33,34,34,35,35,36,36,37,37,38,38,39,39,], 
]};

/*[10] Inner Sight		*/ var d211 = {values:[
		["duration",8,12,16,20,24,28,32,36,40,44,48,52,56,60,64,68,72,76,80,84,88,92,96,100,104,108,112,116,120,124,128,132,136,140,144,148,152,156,160,164,168,172,176,180,184,188,192,196,200,204,208,212,216,220,224,228,232,236,240,244,], 
		["enemy attack",-1,-2,-3,-4,-5,-6,-7,-8,-9,-10,-11,-12,-13,-14,-15,-16,-17,-18,-19,-20,-21,-22,-23,-24,-25,-26,-27,-28,-29,-30,-31,-32,-33,-34,-35,-36,-37,-38,-39,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,], 
		["enemy defense",-40,-65,-90,-115,-140,-165,-190,-215,-260,-305,-350,-395,-440,-485,-530,-575,-635,-695,-755,-815,-875,-935,-1015,-1095,-1175,-1255,-1335,-1415,-1515,-1615,-1715,-1815,-1915,-2015,-2115,-2215,-2315,-2415,-2515,-2615,-2715,-2815,-2915,-3015,-3115,-3215,-3315,-3415,-3515,-3615,-3715,-3815,-3915,-4015,-4115,-4215,-4315,-4415,-4515,-4615,], 
		["radius",6.6,7.3,8,8.6,9.3,10,10.6,11.3,12,12.6,13.3,14,14.6,15.3,16,16.6,17.3,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,], 
]};
/*[11] Critical Strike	*/ var d213 = {values:[
		["crit",16,25,32,38,42,46,49,51,54,56,58,59,61,62,63,65,65,66,67,68,68,69,70,71,71,71,72,72,73,73,74,74,74,74,74,75,75,76,76,76,76,77,77,77,77,77,77,77,78,78,78,78,78,79,79,79,79,79,79,80,], 
]};
/*[12] Slow Missiles	*/ var d231 = {values:[
		["slow ranged attacks to",75,74,73,72,71,70,69,68,67,66,65,64,63,62,61,60,59,58,57,56,55,54,53,52,51,50,49,48,47,46,45,44,43,42,41,40,39,38,37,36,35,34,33,32,31,30,29,28,27,26,25,25,25,25,25,25,25,25,25,25,], 
]};
/*[13] Dodge			*/ var d222 = {values:[
		["chance",10,14,17,20,22,24,25,26,28,28,29,30,31,31,32,33,33,33,34,34,34,35,35,35,35,36,36,36,36,36,37,37,37,37,37,37,37,38,38,38,38,38,38,38,38,38,38,38,39,39,39,39,39,39,39,39,39,39,39,40,], 
]};
/*[14] Avoid			*/ var d232 = {values:[
		["chance",10,14,17,20,22,24,25,26,28,28,29,30,31,31,32,33,33,33,34,34,34,35,35,35,35,36,36,36,36,36,37,37,37,37,37,37,37,38,38,38,38,38,38,38,38,38,38,38,39,39,39,39,39,39,39,39,39,39,39,40,], 
]};
/*[15] Penetrate		*/ var d243 = {values:[
		["attack rating bonus",35,45,55,65,75,85,95,105,115,125,135,145,155,165,175,185,195,205,215,225,235,245,255,265,275,285,295,305,315,325,335,345,355,365,375,385,395,405,415,425,435,445,455,465,475,485,495,505,515,525,535,545,555,565,575,585,595,605,615,625,], 
]};
/*[16] Evade			*/ var d252 = {values:[
		["chance",10,14,17,20,22,24,25,26,28,28,29,30,31,31,32,33,33,33,34,34,34,35,35,35,35,36,36,36,36,36,37,37,37,37,37,37,37,38,38,38,38,38,38,38,38,38,38,38,39,39,39,39,39,39,39,39,39,39,39,40,], 
]};
/*[17] Decoy			*/ var d251 = {values:[
		["life",10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,], 
		["duration",10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,115,120,125,130,135,140,145,150,155,160,165,170,175,180,185,190,195,200,205,210,215,220,225,230,235,240,245,250,255,260,265,270,275,280,285,290,295,300,305,], 
		["mana cost",19,18.2,17.5,16.7,16,15.2,14.5,13.7,13,12.2,11.5,10.7,10,9.2,8.5,7.7,7,6.2,5.5,4.7,4,3.2,2.5,1.7,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,], 
]};
/*[18] Valkyrie			*/ var d261 = {values:[
		["Life", 
			["Life (Normal)",240,256,273,290,307,324,340,357,374,391,408,424,441,458,475,492,508,525,542,559,576,592,609,626,643,660,676,693,710,727,744,760,777,794,811,828,844,861,878,895,912,928,945,962,979,996,1012,1029,1046,1063,1080,1096,1113,1130,1147,1164,1180,1197,1214,1231,], 
			["Life (Nightmare)",340,363,387,411,435,459,482,506,530,554,578,601,625,649,673,697,720,744,768,792,816,839,863,887,911,935,958,982,1006,1030,1054,1077,1101,1125,1149,1173,1196,1220,1244,1268,1292,1315,1339,1363,1387,1411,1434,1458,1482,1506,1530,1553,1577,1601,1625,1649,1672,1696,1720,1744,], 
			["Life (Hell)",940,1005,1071,1137,1203,1269,1334,1400,1466,1532,1598,1663,1729,1795,1861,1927,1992,2058,2124,2190,2256,2321,2387,2453,2519,2585,2650,2716,2782,2848,2914,2979,3045,3111,3177,3243,3308,3374,3440,3506,3572,3637,3703,3769,3835,3901,3966,4032,4098,4164,4230,4295,4361,4427,4493,4559,4624,4690,4756,4822,], 
		], 
		["attack rating bonus",40,80,120,160,200,240,280,320,360,400,440,480,520,560,600,640,680,720,760,800,840,880,920,960,1000,1040,1080,1120,1160,1200,1240,1280,1320,1360,1400,1440,1480,1520,1560,1600,1640,1680,1720,1760,1800,1840,1880,1920,1960,2000,2040,2080,2120,2160,2200,2240,2280,2320,2360,2400,], 
		["mana cost",25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,], 
]};
/*[19] Pierce			*/ var d263 = {values:[
		["pierce",23,34,42,49,55,59,63,65,69,71,73,75,77,79,80,82,82,83,84,85,86,87,88,89,89,90,91,91,91,91,92,92,93,93,93,94,94,95,95,95,95,96,96,96,97,97,97,97,98,98,98,98,98,99,99,99,99,99,99,100,], 
]};

/*[20] Cold Arrow		*/ var d321 = {values:[
		["conversion",1,2,3,4,5,6,], 
		["attack rating bonus",10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,], 
		["cold min",14,18,22,26,30,34,38,42,48,54,60,66,72,78,84,90,116,142,168,194,220,246,298,350,402,454,506,558,597,636,675,714,753,792,831,870,909,948,987,1026,1065,1104,1143,1182,1221,1260,1299,1338,1377,1416,1455,1494,1533,1572,1611,1650,1689,1728,1767,1806,], 
		["cold max",20,28,36,44,52,60,68,76,88,100,112,124,136,148,160,172,202,232,262,292,322,352,412,472,532,592,652,712,757,802,847,892,937,982,1027,1072,1117,1162,1207,1252,1297,1342,1387,1432,1477,1522,1567,1612,1657,1702,1747,1792,1837,1882,1927,1972,2017,2062,2107,2152,], 
		["freeze duration",1,], 
		["mana cost",1.5,1.6,1.7,1.8,2,2.1,2.2,2.3,2.5,2.6,2.7,2.8,3,3.1,3.2,3.3,3.5,3.6,3.7,3.8,4,4.1,4.2,4.3,4.5,4.6,4.7,4.8,5,5.1,5.2,5.3,5.5,5.6,5.7,5.8,6,6.1,6.2,6.3,6.5,6.6,6.7,6.8,7,7.1,7.2,7.3,7.5,7.6,7.7,7.8,8,8.1,8.2,8.3,8.5,8.6,8.7,8.8,], 
]};
/*[21] Magic Arrow		*/ var d312 = {values:[
		["conversion",1,2,3,4,5,6,], 
		["attack rating bonus",10,30,50,70,90,110,130,150,170,190,210,230,250,270,290,310,330,350,370,390,410,430,450,470,490,510,530,550,570,590,610,630,650,670,690,710,730,750,770,790,810,830,850,870,890,910,930,950,970,990,1010,1030,1050,1070,1090,1110,1130,1150,1170,1190,], 
		["added damage",3,4,5,6,7,8,9,10,12,14,16,18,20,22,24,26,34,42,50,58,66,74,90,106,122,138,154,170,186,202,218,234,250,266,282,298,314,330,346,362,378,394,410,426,442,458,474,490,506,522,538,554,570,586,602,618,634,650,666,682,], 
		["mana cost",2,2.1,2.2,2.3,2.5,2.6,2.7,2.8,3,3.1,3.2,3.3,3.5,3.6,3.7,3.8,4,4.1,4.2,4.3,4.5,4.6,4.7,4.8,5,5.1,5.2,5.3,5.5,5.6,5.7,5.8,6,6.1,6.2,6.3,6.5,6.6,6.7,6.8,7,7.1,7.2,7.3,7.5,7.6,7.7,7.8,8,8.1,8.2,8.3,8.5,8.6,8.7,8.8,9,9.1,9.2,9.3,], 
]};
/*[22] Multiple Shot	*/ var d322 = {values:[
		["arrows",3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,24,], 
		["mana cost",1.5,1.6,1.7,1.8,2,2.1,2.2,2.3,2.5,2.6,2.7,2.8,3,3.1,3.2,3.3,3.5,3.6,3.7,3.8,4,4.1,4.2,4.3,4.5,4.6,4.7,4.8,5,5.1,5.2,5.3,5.5,5.6,5.7,5.8,6,6.1,6.2,6.3,6.5,6.6,6.7,6.8,7,7.1,7.2,7.3,7.5,7.6,7.7,7.8,8,8.1,8.2,8.3,8.5,8.6,8.7,8.8,], 
]};
/*[23] Fire Arrow		*/ var d313 = {values:[
		["conversion",1,2,3,4,5,6,], 
		["attack rating bonus",10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,], 
		["fire min",6,8,10,12,14,16,18,20,24,28,32,36,40,44,48,52,67,82,97,112,127,142,172,202,232,262,292,322,342,362,382,402,422,442,462,482,502,522,542,562,582,602,622,642,662,682,702,722,742,762,782,802,822,842,862,882,902,922,942,962,], 
		["fire max",8,11,14,17,20,23,26,29,34,39,44,49,54,59,64,69,86,103,120,137,154,171,205,239,273,307,341,375,401,427,453,479,505,531,557,583,609,635,661,687,713,739,765,791,817,843,869,895,921,947,973,999,1025,1051,1077,1103,1129,1155,1181,1207,], 
		["mana cost",1.5,1.6,1.7,1.8,2,2.1,2.2,2.3,2.5,2.6,2.7,2.8,3,3.1,3.2,3.3,3.5,3.6,3.7,3.8,4,4.1,4.2,4.3,4.5,4.6,4.7,4.8,5,5.1,5.2,5.3,5.5,5.6,5.7,5.8,6,6.1,6.2,6.3,6.5,6.6,6.7,6.8,7,7.1,7.2,7.3,7.5,7.6,7.7,7.8,8,8.1,8.2,8.3,8.5,8.6,8.7,8.8,], 
]};
/*[24] Ice Arrow		*/ var d341 = {values:[
		["attack rating bonus",20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,], 
		["cold min",22,32,42,52,62,72,82,92,106,120,134,148,162,176,190,204,228,252,276,300,324,348,382,416,450,484,518,552,596,640,684,728,772,816,860,904,948,992,1036,1080,1124,1168,1212,1256,1300,1344,1388,1432,1476,1520,1564,1608,1652,1696,1740,1784,1828,1872,1916,1960,], 
		["cold max",36,47,58,69,80,91,102,113,129,145,161,177,193,209,225,241,267,293,319,345,371,397,433,469,505,541,577,613,659,705,751,797,843,889,935,981,1027,1073,1119,1165,1211,1257,1303,1349,1395,1441,1487,1533,1579,1625,1671,1717,1763,1809,1855,1901,1947,1993,2039,2085,], 
		["freeze duration",4,], 
		["mana cost",2,2.1,2.2,2.3,2.5,2.6,2.7,2.8,3,3.1,3.2,3.3,3.5,3.6,3.7,3.8,4,4.1,4.2,4.3,4.5,4.6,4.7,4.8,5,5.1,5.2,5.3,5.5,5.6,5.7,5.8,6,6.1,6.2,6.3,6.5,6.6,6.7,6.8,7,7.1,7.2,7.3,7.5,7.6,7.7,7.8,8,8.1,8.2,8.3,8.5,8.6,8.7,8.8,9,9.1,9.2,9.3,], 
]};
/*[25] Guided Arrow		*/ var d342 = {values:[
		["damage",0,3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60,63,66,69,72,75,78,81,84,87,90,93,96,99,102,105,108,111,114,117,120,123,126,129,132,135,138,141,144,147,150,153,156,159,162,165,168,171,174,177,], 
		["mana cost",8,7.7,7.5,7.2,7,6.7,6.5,6.2,6,5.7,5.5,5.2,5,4.7,4.5,4.2,4,3.7,3.5,3.2,3,2.7,2.5,2.2,2,1.7,1.5,1.2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,], 
]};
/*[26] Exploding Arrow	*/ var d333 = {values:[
		["attack rating bonus",20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,], 
		["fire min",2,7,12,17,22,27,32,37,44,51,58,65,72,79,86,93,106,119,132,145,158,171,190,209,228,247,266,285,310,335,360,385,410,435,460,485,510,535,560,585,610,635,660,685,710,735,760,785,810,835,860,885,910,935,960,985,1010,1035,1060,1085,], 
		["fire max",6,11,16,21,26,31,36,41,49,57,65,73,81,89,97,105,119,133,147,161,175,189,209,229,249,269,289,309,335,361,387,413,439,465,491,517,543,569,595,621,647,673,699,725,751,777,803,829,855,881,907,933,959,985,1011,1037,1063,1089,1115,1141,], 
		["mana cost",4,4.2,4.5,4.7,5,5.2,5.5,5.7,6,6.2,6.5,6.7,7,7.2,7.5,7.7,8,8.2,8.5,8.7,9,9.2,9.5,9.7,10,10.2,10.5,10.7,11,11.2,11.5,11.7,12,12.2,12.5,12.7,13,13.2,13.5,13.7,14,14.2,14.5,14.7,15,15.2,15.5,15.7,16,16.2,16.5,16.7,17,17.2,17.5,17.7,18,18.2,18.5,18.7,], 
]};
/*[27] Strafe			*/ var d352 = {values:[
		["targets",3,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,], 
		["damage",100,114,128,142,156,170,184,198,212,226,240,254,268,282,296,310,324,338,352,366,380,394,408,422,436,450,464,478,492,506,520,534,548,562,576,590,604,618,632,646,660,674,688,702,716,730,744,758,772,786,800,814,828,842,856,870,884,898,912,926,], 
]};
/*[28] Immolation Arrow	*/ var d353 = {values:[
		["attack rating bonus",30,39,48,57,66,75,84,93,102,111,120,129,138,147,156,165,174,183,192,201,210,219,228,237,246,255,264,273,282,291,300,309,318,327,336,345,354,363,372,381,390,399,408,417,426,435,444,453,462,471,480,489,498,507,516,525,534,543,552,561,], 
		["fire min",12,24,36,48,60,72,84,96,119,142,165,188,211,234,257,280,314,348,382,416,450,484,520,556,592,628,664,700,738,776,814,852,890,928,966,1004,1042,1080,1118,1156,1194,1232,1270,1308,1346,1384,1422,1460,1498,1536,1574,1612,1650,1688,1726,1764,1802,1840,1878,1916,], 
		["fire max",23,35,47,59,71,83,95,107,130,153,176,199,222,245,268,291,325,359,393,427,461,495,531,567,603,639,675,711,749,787,825,863,901,939,977,1015,1053,1091,1129,1167,1205,1243,1281,1319,1357,1395,1433,1471,1509,1547,1585,1623,1661,1699,1737,1775,1813,1851,1889,1927,], 
		["burning min",8,14,19,25,31,37,43,49,55,60,66,72,78,84,90,96,101,107,113,119,125,131,137,142,148,154,160,166,172,178,183,189,195,201,207,213,219,224,230,236,242,248,254,260,265,271,277,283,289,295,301,306,312,318,324,330,336,342,347,353,], 
		["burning max",10,16,22,28,33,39,45,51,57,63,69,75,80,86,92,98,104,110,116,121,127,133,139,145,151,157,162,168,174,180,186,192,198,203,209,215,221,227,233,239,244,250,256,262,268,274,280,285,291,297,303,309,315,321,326,332,338,344,350,356,], 
		["mana cost",6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13,13.5,14,14.5,15,15.5,16,16.5,17,17.5,18,18.5,19,19.5,20,20.5,21,21.5,22,22.5,23,23.5,24,24.5,25,25,26,26,27,27,28,28,29,29,30,30,31,31,32,32,33,33,34,34,35,35,], 
]};
/*[29] Freezing Arrow	*/ var d361 = {values:[
		["radius",2.6,2.6,2.6,3.3,3.3,3.3,3.3,4,4,4,4,4.6,4.6,4.6,4.6,5.3,5.3,5.3,5.3,6,], 
		["attack rating bonus",40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,620,630,], 
		["cold min",35,45,55,65,75,85,95,105,120,135,150,165,180,195,210,225,245,265,285,305,325,345,370,395,420,445,470,495,525,555,585,615,645,675,705,735,765,795,825,855,885,915,945,975,1005,1035,1065,1095,1125,1155,1185,1215,1245,1275,1305,1335,1365,1395,1425,1455,], 
		["cold max",55,65,75,85,95,105,115,125,140,155,170,185,200,215,230,245,265,285,305,325,345,365,390,415,440,465,490,515,545,575,605,635,665,695,725,755,785,815,845,875,905,935,965,995,1025,1055,1085,1115,1145,1175,1205,1235,1265,1295,1325,1355,1385,1415,1445,1475,], 
		["freeze duration",2,], 
		["mana cost",4.5,4.7,5,5.2,5.5,5.7,6,6.2,6.5,6.7,7,7.2,7.5,7.7,8,8.2,8.5,8.7,9,9.2,9.5,9.7,10,10.2,10.5,10.7,11,11.2,11.5,11.7,12,12.2,12.5,12.7,13,13.2,13.5,13.7,14,14.2,14.5,14.7,15,15.2,15.5,15.7,16,16.2,16.5,16.7,17,17.2,17.5,17.7,18,18.2,18.5,18.7,19,19.2,], 
]};

var skills_amazon_vanilla = [
{data:d111, key:"111", code:6, name:"Jab", i:0, req:[], reqlvl:1, reqWeapon:["spear","javelin"], level:0, extra_levels:0, force_levels:0, bindable:2, description:"Attacks with a series of rapid thrusts<br>using a javelin or spear class weapon<br><br>Multiple Hits", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Attack: +"," percent<br>Damage: +"," percent<br>Mana Cost: ",""]},
{data:d122, key:"122", code:7, name:"Power Strike", i:1, req:[0], reqlvl:6, reqWeapon:["spear","javelin"], level:0, extra_levels:0, force_levels:0, bindable:2, description:"Adds lightning damage to attacks with<br>javelin and spear class weapons", syn_title:"<br>Power Strike Receives Bonuses From:<br>", syn_text:"Lightning Bolt: +10% Lightning Damage per Level<br>Charged Strike: +10% Lightning Damage per Level<br>Lightning Strike: +10% Lightning Damage per Level<br>Lightning Fury: +10% Lightning Damage per Level", graytext:"", index:[0,""], text:["To Attack Rating: +"," percent<br>Lightning Damage: ","-","<br>Mana Cost: ",""]},
{data:d123, key:"123", code:8, name:"Poison Javelin", i:2, req:[], reqlvl:6, reqWeapon:["javelin"], level:0, extra_levels:0, force_levels:0, bindable:2, description:"Magically enhances your javelin<br>to leave a trail of poison clouds", syn_title:"<br>Poison Javelin Receives Bonuses From:<br>", syn_text:"Plague Javelin: +12% Poison Damage per Level", graytext:"", index:[0,""], text:["Poison Damage: ","-","<br>over 8 seconds<br>Mana Cost: ",""]},
{data:d131, key:"131", code:9, name:"Impale", i:3, req:[0], reqlvl:12, reqWeapon:["spear","javelin"], level:0, extra_levels:0, force_levels:0, bindable:0, description:"Increases attack damage but rapidly degrades the weapon", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Damage: +"," percent<br>Attack: +"," percent<br>Chance of Losing Durability: "," percent<br>Mana Cost: 3",""]},
{data:d133, key:"133", code:10, name:"Lightning Bolt", i:4, req:[2], reqlvl:12, reqWeapon:["javelin"], level:0, extra_levels:0, force_levels:0, bindable:2, description:"Magically converts your javelin into a bolt of lightning<br><br>3/4 Weapon Damage<br>Converts 100% Physical Damage to Elemental Damage", syn_title:"<br>Lightning Bolt Receives Bonuses From:<br>", syn_text:"Power Strike: +3% Lightning Damage per Level<br>Charged Strike: +3% Lightning Damage per Level<br>Lightning Strike: +3% Lightning Damage per Level<br>Lightning Fury: +3% Lightning Damage per Level", graytext:"", index:[0,""], text:["Lightning Damage: ","-","<br>Mana Cost: ",""]},
{data:d142, key:"142", code:11, name:"Charged Strike", i:5, req:[4,2,1,0], reqlvl:18, reqWeapon:["spear","javelin"], level:0, extra_levels:0, force_levels:0, bindable:2, description:"Adds lightning damage to javelin and spear class weapons<br>and releases charged bolts upon impact", syn_title:"<br>Charged Strike Receives Bonuses From:<br>", syn_text:"Power Strike: +10% Lightning Damage per Level<br>Lightning Bolt: +10% Lightning Damage per Level<br>Lightning Strike: +10% Lightning Damage per Level<br>Lightning Fury: +10% Lightning Damage per Level", graytext:"", index:[0,""], text:["Releases "," charged bolts<br>Lightning Damage: ","-","<br>Mana Cost: ",""]},
{data:d143, key:"143", code:12, name:"Plague Javelin", i:6, req:[4,2], reqlvl:18, reqWeapon:["javelin"], level:0, extra_levels:0, force_levels:0, bindable:2, description:"Magically enhances your javelin to release<br>expanding clouds of poison upon impact", syn_title:"<br>Plague Javelin Receives Bonuses From:<br>", syn_text:"Poison Javelin: +10% Poison Damage per Level", graytext:"", index:[0,""], text:["Attack: +"," percent<br>Poison Damage: ","-","<br>over 3 seconds<br>Mana Cost: ",""]},
{data:d151, key:"151", code:13, name:"Fend", i:7, req:[3,0], reqlvl:24, reqWeapon:["spear","javelin"], level:0, extra_levels:0, force_levels:0, bindable:2, description:"Attacks all adjacent targets", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Attack Bonus: +"," percent<br>Damage: +"," percent<br>Mana Cost: 5",""]},
{data:d162, key:"162", code:14, name:"Lightning Strike", i:8, req:[5,4,2,1,0], reqlvl:30, reqWeapon:["spear","javelin"], level:0, extra_levels:0, force_levels:0, bindable:2, description:"Adds lightning damage to javelin and spear class weapons<br>and releases chain lightning upon impact", syn_title:"<br>Lightning Strike Receives Bonuses From:<br>", syn_text:"Power Strike: +8% Lightning Damage per Level<br>Lightning Bolt: +8% Lightning Damage per Level<br>Charged Strike: +8% Lightning Damage per Level<br>Lightning Fury: +8% Lightning Damage per Level", graytext:"", index:[0,""], text:[""," hits<br>Lightning Damage: ","-","<br>Mana Cost: ",""]},
{data:d163, key:"163", code:15, name:"Lightning Fury", i:9, req:[6,4,2], reqlvl:30, reqWeapon:["javelin"], level:0, extra_levels:0, force_levels:0, bindable:2, description:"Changes a thrown javelin into a powerful<br>bolt of lightning that splits on impact", syn_title:"<br>Lightning Fury Receives Bonuses From:<br>", syn_text:"Power Strike: +1% Lightning Damage per Level<br>Lightning Bolt: +1% Lightning Damage per Level<br>Charged Strike: +1% Lightning Damage per Level<br>Lightning Strike: +1% Lightning Damage per Level", graytext:"", index:[0,""], text:["Releases "," bolts<br>Lightning Damage: ","-","<br>Mana Cost: ",""]},

{data:d211, key:"211", code:16, name:"Inner Sight", i:10, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, effect:0, bindable:2, description:"Illuminates nearby enemies<br>making them easier to hit<br>for you and your party", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Duration: "," seconds<br>Enemy Defense: ","<br>Radius: "," yards<br>Mana Cost: 5"]},
{data:d213, key:"213", code:17, name:"Critical Strike", i:11, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, effect:0, bindable:0, description:"Passive - Your attacks have a chance to do double damage", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:[""," percent chance",""]},
{data:d231, key:"231", code:18, name:"Slow Missiles", i:12, req:[10], reqlvl:12, level:0, extra_levels:0, force_levels:0, effect:0, bindable:2, description:"Illuminates nearby enemies and slows their ranged attacks", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Duration: 5 seconds<br>Ranged Attacks slowed to "," percent<br>Radius: 12 yards<br>Mana Cost: 5"]},
{data:d222, key:"222", code:19, name:"Dodge", i:13, req:[], reqlvl:6, level:0, extra_levels:0, force_levels:0, effect:0, bindable:0, description:"Passive - You have a chance to dodge<br>a melee attack when attacking<br>or standing still", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:[""," percent chance",""]},
{data:d232, key:"232", code:20, name:"Avoid", i:14, req:[13], reqlvl:12, level:0, extra_levels:0, force_levels:0, effect:0, bindable:0, description:"Passive - You have a chance to dodge enemy missiles<br>when attacking or standing still", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:[""," percent chance",""]},
{data:d243, key:"243", code:21, name:"Penetrate", i:15, req:[11], reqlvl:18, level:0, extra_levels:0, force_levels:0, effect:0, bindable:0, description:"Passive - Increases your attack rating", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["To Attack Rating: +"," percent",""]},
{data:d252, key:"252", code:22, name:"Evade", i:16, req:[14,13], reqlvl:24, level:0, extra_levels:0, force_levels:0, effect:0, bindable:0, description:"Passive - You have a chance to dodge<br>a melee or missile attack<br>when walking or running", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:[""," percent chance",""]},
{data:d251, key:"251", code:23, name:"Decoy", i:17, req:[12,10], reqlvl:24, level:0, extra_levels:0, force_levels:0, bindable:1, description:"Creates a duplicate of yourself that<br>draws fire from enemies", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Life: +"," percent<br>Duration: "," seconds<br>Mana Cost: ",""]},
{data:d261, key:"261", code:24, name:"Valkyrie", i:18, req:[16,14,13,17,12,10], reqlvl:30, level:0, extra_levels:0, force_levels:0, bindable:1, description:"Summons a powerful Valkyrie ally", syn_title:"<br>Valkyrie Receives Bonuses From:<br>", syn_text:"Decoy: +20% Life per Level<br>Penetrate: +40 Attack Rating per Level<br>Critical Strike<br>Dodge<br>Avoid<br>Evade", graytext:"", index:[0,""], text:["Life: ","<br>Attack: +","<br>Mana Cost: ",""]},
{data:d263, key:"263", code:25, name:"Pierce", i:19, req:[15,11], reqlvl:30, level:0, extra_levels:0, force_levels:0, effect:0, bindable:0, description:"Passive - Your missiles have a chance to<br>pass through enemies that they hit", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:[""," percent pierce chance",""]},

{data:d321, key:"321", code:26, name:"Cold Arrow", i:20, req:[], reqlvl:6, reqWeapon:["bow","crossbow"], level:0, extra_levels:0, force_levels:0, bindable:2, description:"Magically enhances your arrows or bolts<br>by adding cold damage and a slowing effect<br>Cold arrows only do half of their regular damage", syn_title:"<br>Cold Arrow Receives Bonuses From:<br>", syn_text:"Ice Arrow: +12% Cold Damage per Level", graytext:"", index:[0,""], text:["Converts ","% Physical Damage to Elemental Damage<br>To Attack Rating: +"," percent<br>Cold Damage: ","-","<br>Cold Length: "," seconds<br>Mana Cost: ",""]},
{data:d312, key:"312", code:27, name:"Magic Arrow", i:21, req:[], reqlvl:1, reqWeapon:["bow","crossbow"], level:0, extra_levels:0, force_levels:0, bindable:2, description:"Creates a magical arrow or bolt<br>that does extra damage", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Converts ","% Physical Damage to Magic Damage<br>To Attack Rating: +"," percent<br>Damage: +","<br>Mana Cost: ",""]},
{data:d322, key:"322", code:28, name:"Multiple Shot", i:22, req:[21], reqlvl:6, reqWeapon:["bow","crossbow"], level:0, extra_levels:0, force_levels:0, bindable:2, description:"Magically splits one arrow<br>or bolt into many<br><br>3/4 Weapon Damage", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:[""," arrows<br>Mana Cost: ",""]},
{data:d313, key:"313", code:29, name:"Fire Arrow", i:23, req:[], reqlvl:1, reqWeapon:["bow","crossbow"], level:0, extra_levels:0, force_levels:0, bindable:2, description:"Magically enhances your arrows<br>or bolts with fire", syn_title:"<br>Fire Arrow Receives Bonuses From:<br>", syn_text:"Exploding Arrow: +12% Fire Damage per Level", graytext:"", index:[0,""], text:["Converts ","% Physical Damage to Elemental Damage<br>To Attack Rating: +"," percent<br>Fire Damage: ","-","<br>Mana Cost: ",""]},
{data:d341, key:"341", code:30, name:"Ice Arrow", i:24, req:[20], reqlvl:18, reqWeapon:["bow","crossbow"], level:0, extra_levels:0, force_levels:0, bindable:2, description:"Magically enhances your arrow or bolt<br>to freeze your enemies", syn_title:"<br>Ice Arrow Receives Bonuses From:<br>", syn_text:"Cold Arrow: +8% Cold Damage per Level<br>Freezing Arrow: +5% Freeze Length per Level", graytext:"", index:[0,""], text:["To Attack Rating: +"," percent<br>Cold Damage: ","-","<br>Freezes for "," seconds<br>Mana Cost: ",""]},
{data:d342, key:"342", code:31, name:"Guided Arrow", i:25, req:[22,21,20], reqlvl:18, reqWeapon:["bow","crossbow"], level:0, extra_levels:0, force_levels:0, bindable:2, description:"Enhances your arrows and bolts<br>to track your target<br>or seek one of its own<br>Always Hits", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Damage: +"," percent<br>Mana Cost: ",""]},
{data:d333, key:"333", code:32, name:"Exploding Arrow", i:26, req:[23,22,21], reqlvl:12, reqWeapon:["bow","crossbow"], level:0, extra_levels:0, force_levels:0, bindable:2, description:"Enchants an arrow or bolt that explodes on<br>contact, damaging all nearby enemies", syn_title:"<br>Exploding Arrow Receives Bonuses From:<br>", syn_text:"Fire Arrow: +12% Fire Damage per Level", graytext:"", index:[0,""], text:["To Attack Rating: +"," percent<br>Fire Damage: ","-","<br>Mana Cost: ",""]},
{data:d352, key:"352", code:33, name:"Strafe", i:27, req:[25,22,21,20], reqlvl:24, reqWeapon:["bow","crossbow"], level:0, extra_levels:0, force_levels:0, bindable:2, description:"Magically splits one arrow into several<br>that target multiple nearby enemies<br><br>3/4 Weapon Damage", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Attacks up to "," targets<br>Damage: +"," percent<br>Mana Cost: 11"]},
{data:d353, key:"353", code:34, name:"Immolation Arrow", i:28, req:[26,23,22,21], reqlvl:24, reqWeapon:["bow","crossbow"], level:0, extra_levels:0, force_levels:0, bindable:2, description:"Enhances arrows or bolts to<br>cause severe fire damage and<br>creates a pyre upon impact", syn_title:"<br>Immolation Arrow Receives Bonuses From:<br>", syn_text:"Fire Arrow: +5% Average Fire Damage per Second per Level<br>Exploding Arrow: +10% Fire Damage per Level", graytext:"", index:[0,""], text:["Attack: +"," percent<br>Fire Explosion Damage: ","-","<br>Fire Duration: 4 seconds<br>Average Fire Damage: ","-"," per second<br>Mana Cost: ",""]},
{data:d361, key:"361", code:35, name:"Freezing Arrow", i:29, req:[24,20], reqlvl:30, reqWeapon:["bow","crossbow"], level:0, extra_levels:0, force_levels:0, bindable:2, description:"Magically enhances an arrow or bolt<br>to freeze entire groups of monsters", syn_title:"<br>Freezing Arrow Receives Bonuses From:<br>", syn_text:"Cold Arrow: +12% Cold Damage per Level<br>Ice Arrow: +5% Freeze Length per Level", graytext:"", index:[1," yards"], text:["Radius: ","Attack: +"," percent<br>Cold Damage: ","-","<br>Freezes for "," second<br>Mana Cost: ",""]}
];
