
var character_pd2_necromancer = {class_name:"Necromancer", strength:15, dexterity:25, vitality:15, energy:25, life:45, mana:25, stamina:179, levelup_life:2, levelup_stamina:1, levelup_mana:2, ar_per_dexterity:5, life_per_vitality:2, stamina_per_vitality:1, mana_per_energy:2, starting_strength:15, starting_dexterity:25, starting_vitality:15, starting_energy:25, ar_const:-10, block_const:6, skill_layout:"./images/PD2/necromancer.png", mana_regen:1.66,
	weapon_frames:{dagger:18, sword:[18,22], axe:[18,19], mace:[18,19], thrown:[18,18], staff:19, polearm:19, scepter:18, wand:18, javelin:18, spear:23, bow:17, crossbow:19},
	fcr_frames:15, fcr_bp:[0, 9, 18, 30, 48, 75, 125],
	fhr_frames:13, fhr_bp:[0, 5, 10, 16, 26, 39, 56, 86, 152, 377],
	fbr_frames:11, fbr_bp:[0, 6, 13, 20, 32, 52, 86, 174, 600],
	
	// getSkillData - gets skill info from the skills data table
	//	skill: skill object for the skill in question
	//	lvl: level of the skill
	//	elem: which element of the skill to return
	// result: value of the skill element at the specified level
	// ---------------------------------
	getSkillData : function(skill, lvl, elem) {
		var result = skill.data.values[elem][lvl];
		var diffResult = skill.data.values[elem][character.difficulty];
		
		var warrior_life = ~~skills[0].data.values[4][skills[0].level+skills[0].extra_levels];
		var warrior_damage = ~~skills[0].data.values[5][skills[0].level+skills[0].extra_levels];
		var mage_life = ~~skills[0].data.values[1][skills[0].level+skills[0].extra_levels];
		var mage_damage = ~~skills[0].data.values[2][skills[0].level+skills[0].extra_levels];
		var golem_life = ~~skills[4].data.values[1][skills[4].level+skills[4].extra_levels];
		var golem_attack = ~~skills[4].data.values[2][skills[4].level+skills[4].extra_levels];
		
		if (skill.name == "Raise Skeleton Warrior" && elem == 4) {			result += warrior_life }
		if (skill.name == "Raise Skeleton Warrior" && elem < 2) {			result = ((result + warrior_damage) * (1 + 0.08*skills[5].level + 0.08*skills[0].level)) }
		if (skill.name == "Raise Skeletal Mage" && elem == 9) {				result += mage_life }
		if (skill.name == "Raise Skeletal Mage" && elem > 0 && elem < 9) {	result *= (1 + 0.08*skills[1].level + mage_damage/100) }
		if (skill.name == "Clay Golem" && elem == 0) {						result += golem_attack }
		if (skill.name == "Clay Golem" && elem == 1) {						result += (35*skills[8].level) }
		if (skill.name == "Clay Golem" && elem == 2) {						result *= (1 + golem_life/100) }
		if (skill.name == "Clay Golem" && elem > 2 && elem < 5) {			result *= (1 + 0.20*skills[6].level + 0.20*skills[8].level + 0.20*skills[9].level) }
		if (skill.name == "Blood Golem" && elem == 0) {						result += (20*skills[3].level + golem_attack) }
		if (skill.name == "Blood Golem" && elem == 1) {						result += (35*skills[8].level) }
		if (skill.name == "Blood Golem" && elem == 2) {						result *= (1 + golem_life/100) }
		if (skill.name == "Blood Golem" && elem > 3 && elem < 6) {			result *= (1 + 0.15*skills[3].level + 0.15*skills[8].level + 0.15*skills[9].level) }
		if (skill.name == "Iron Golem" && elem == 2) {						result += (20*skills[3].level + golem_attack) }
		if (skill.name == "Iron Golem" && elem == 4) {						result *= (1 + golem_life/100) }
		if (skill.name == "Iron Golem" && elem < 2) {						result *= (1 + 0.05*skills[3].level + 0.05*skills[6].level + 0.05*skills[9].level) }
		if (skill.name == "Fire Golem" && elem == 0) {						result += (20*skills[3].level + golem_attack) }
		if (skill.name == "Fire Golem" && elem == 2) {						result *= (1 + golem_life/100) }
		if (skill.name == "Fire Golem" && elem > 2 && elem < 7) {			result *= (1 + 0.10*skills[3].level + 0.10*skills[6].level + 0.10*skills[8].level) }
		if (skill.name == "Golem Mastery" && elem == 0) {					result = 1 + Math.floor(skill.level/5) }
		
		if (skill.name == "Poison Dagger" && elem > 0 && elem < 3) {		result *= ((1 + 0.22*skills[15].level + 0.22*skills[19].level) * (1+character.pDamage/100)) }
		if (skill.name == "Desecrate" && elem < 2) {						result *= ((1 + 0.15*skills[11].level + 0.15*skills[19].level) * (1+character.pDamage/100)) }
		if (skill.name == "Poison Nova" && elem < 2) {						result *= ((1 + 0.16*skills[11].level + 0.16*skills[15].level) * (1+character.pDamage/100)) }
		if (skill.name == "Corpse Explosion" && elem > 0 && elem < 3) {		result *= (1 + 0.07*skills[20].level + 0.07*skills[15].level + 0.07*skills[10].level) }
		if (skill.name == "Corpse Explosion" && elem > 2 && elem < 5) {		result *= ((1 + 0.07*skills[20].level + 0.07*skills[15].level + 0.07*skills[10].level) * (1+character.fDamage/100)) }
		if (skill.name == "Teeth" && elem > 0 && elem < 3) {				result *= (1 + 0.25*skills[13].level + 0.25*skills[16].level + 0.25*skills[18].level) }
		if (skill.name == "Bone Spear" && elem > 0 && elem < 3) {			result *= (1 + 0.10*skills[12].level + 0.10*skills[18].level + 0.05*skills[13].level) }
		if (skill.name == "Bone Spirit" && elem < 2) {						result *= (1 + 0.10*skills[12].level + 0.10*skills[16].level + 0.05*skills[13].level) }
		if (skill.name == "Bone Armor" && elem == 0) {						result += (15*skills[17].level + 15*skills[31].level) }
		if (skill.name == "Bone Wall" && elem == 0) {						result *= (1 + 0.10*skills[13].level + 0.10*skills[31].level) }
		if (skill.name == "Bone Prison" && elem == 0) {						result *= (1 + 0.08*skills[13].level + 0.08*skills[17].level) }
		
		if (skill.name == "Curse Mastery" && elem == 0) {					result = 1 + Math.floor(skill.level/10) }
		if (skill.name == "Dark Pact" && elem > 0 && elem < 3) {			result *= (1 + 0.10*skills[32].level + 0.10*skills[24].level + 0.06*(skills[20].level+skills[21].level+skills[23].level+skills[25].level+skills[26].level+skills[27].level+skills[28].level+skills[29].level+skills[30].level)) }
		if (skill.name == "Dark Pact" && elem == 0) {						result = 4 + 0.6*Math.floor(skills[32].level/3) }
		if (skill.name == "Amplify Damage" && elem == 0) {					result = -10 - skill.level*2 - skills[32].level }
		if (skill.name == "Amplify Damage" && elem == 1) {					result += 0.6*Math.floor(skills[32].level/3) }
		if (skill.name == "Life Tap" && elem == 0) {						result = 8 + skill.level + Math.floor(skills[32].level/2) }
		if (skill.name == "Life Tap" && elem == 1) {						result += 0.6*Math.floor(skills[32].level/3) }
		if (skill.name == "Weaken" && elem == 0) {							result = -10 - Math.floor(skills[32].level/2) }
		if (skill.name == "Weaken" && elem == 1) {							result += 0.6*Math.floor(skills[32].level/3) }
		if (skill.name == "Decrepify" && elem == 0) {						result = -10 - skill.level - skills[32].level }
		if (skill.name == "Decrepify" && elem == 1) {						result = -15 - skill.level - skills[32].level }
		if (skill.name == "Decrepify" && elem == 2) {						result += 0.6*Math.floor(skills[32].level/3) }
		if (skill.name == "Lower Resist" && elem == 0) {					result = -10 - skill.level*2 - Math.floor(skills[32].level/2) }
		if (skill.name == "Lower Resist" && elem == 1) {					result += 0.6*Math.floor(skills[32].level/3) }
		if (skill.name == "Dim Vision" && elem == 0) {						result += -5*skills[32].level }
		if (skill.name == "Terror" && elem == 0) {							result = -5 - skill.level*2 - skills[32].level }
		if (skill.name == "Confuse" && elem == 0) {							result = 10 + skill.level*3 + skills[32].level }
		if (skill.name == "Attract" && elem == 0) {							result += -5*skills[32].level }
		
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
		var attack = 0;	// 0 = no basic damage, 1 = includes basic attack damage
		var spell = 2;	// 0 = uses attack rating, 1 = no attack rating, 2 = non-damaging
		
		// unsupported
		
		var result = {min:skillMin,max:skillMax,ar:skillAr};
		return result
	}
};

/*[ 0] Skeleton Mastery	*/ var d111 = {index:[0,""], values:[
		["Magi Velocity"], 
		["Magi Life"], 
		["Magi Damage"], 
		["Magi Elemental Damage"], 
		["Skeleton Life",15,30,45,60,75,90,105,120,135,150,165,180,195,210,225,240,255,270,285,300,], 
		["Skeleton Damage",2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,], 
]};
/*[ 1] Skeleton Warrior	*/ var d113 = {index:[2,""], values:[
		["damage min",1,2,3,4,5,7,8,10,12,14,17,19,22,24,27,30,35,41,46,52,], 
		["damage max",2,3,4,5,6,8,10,12,14,16,18,21,23,26,29,32,37,43,48,54,], 
		["Attack Bonus",80,155,230,305,380,455,530,605,680,755,830,905,980,1055,1130,1205,1280,1355,1430,1505,1580,1655,1730,1805,1880,1955,2030,2405,2480,2555,], 
		["Defense",25,45,65,85,105,125,145,165,185,205,225,245,265,285,305,325,345,365,385,405,425,445,465,485,505,525,545,565,585,605,], 
		["Life",21,21,21,31,42,52,63,73,84,94,105,115,126,136,147,157,168,178,189,199,], 
		["# of Skeletons",1,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,8,8,8,], 
		["Mana Cost",6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,], 
]};
/*[ 2]*/
/*[ 3] Clay Golem		*/ var d122 = {index:[2,""], values:[
		["attack"], 
		["defense"], 
		["Hit Points",115,130,145,160,175,190,205,220,235,250,265,280,295,310,325,340,355,370,385,400,415,430,445,460,475,490,505,520,535,550,], 
		["damage min",11,22,33,44,55,66,77,88,99,110,121,132,143,154,165,176,187,198,209,220,231,242,253,264,275,286,297,308,319,330,], 
		["damage max",15,30,45,60,75,90,105,120,135,150,165,180,195,210,225,240,255,270,285,300,315,330,345,360,375,390,405,420,435,450,], 
		["Attack Bonus",20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340,360,380,400,420,440,460,480,500,520,540,560,580,600,], 
		["Slows Enemies %",3,6,9,11,12,13,14,15,16,17,17,18,18,19,19,20,20,20,20,21,21,21,21,22,22,22,22,22,22,22,], 
		["Mana Cost",7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13,13.5,14,14.5,15,15.5,16,16.5,17,17.5,18,18.5,19,19.5,20,20.5,21,21.5,22,], 
]};
/*[ 4] Golem Mastery	*/ var d131 = {index:[1,""], values:[
		["# Golems"], 
		["Hit Points +%",20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340,360,380,400,], 
		["Attack Bonus +X",25,50,75,100,125,150,175,200,225,250,275,300,325,350,375,400,425,450,475,500,], 
		["Velocity Increase +%",6,10,14,17,20,22,23,24,26,27,28,29,30,30,31,32,32,33,33,33,], 
]};
/*[ 5] Skeletal Mage	*/ var d133 = {index:[1," skeleton magi"], values:[
		["magi"], 
		["poison min"], 
		["poison max"], 
		["lightning min"], 
		["lightning max"], 
		["cold min"], 
		["cold max"], 
		["fire min"], 
		["fire max"], 
		["life"], 
		["mana cost"], 
]};
/*[ 6] Blood Golem		*/ var d142 = {index:[2,""], values:[
		["attack"], 
		["defense"], 
		["Life",859,1082,1305,1528,1751,1974,2197,2420,2643,2866,3089,3312,3535,3758,3981,4204,4427,4650,4873,5096,], 
		["Life on Hit",5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,], 
		["damage min",10,13,17,20,24,27,31,34,38,41,45,48,52,55,59,62,66,69,73,76,], 
		["damage max",27,36,45,55,64,74,83,93,102,112,121,130,140,149,159,168,178,187,197,206,], 
		["Mana Cost",25,29,33,37,41,45,49,53,57,61,65,69,73,77,81,85,89,93,97,101,], 
]};
/*[ 7] Blood Warp		*/ var d141 = {index:[0,""], values:[
		["Cooldown in seconds",6,5.8,5.6,5.4,5.2,5,4.8,4.6,4.4,4.2,4,3.8,3.6,3.4,3.2,3,2.8,2.6,2.4,2.2,2,1.8,1.6,1.4,1.2,1,0.8,0.6,0.4,0.2,], 
]};
/*[ 8] Iron Golem		*/ var d152 = {index:[4,""], values:[
		["damage min"], 
		["damage max"], 
		["attack"], 
		["defense"], 
		["Life",1372,1715,2058,2401,2744,3087,3430,3773,4116,4459,4802,5145,5488,5831,6174,6517,6860,7203,7546,7889,], 
		["Thorns %",150,165,180,195,210,225,240,255,270,285,300,315,330,345,360,375,390,405,420,435,], 
		["Defense Bonus",35,70,105,140,175,210,245,280,315,350,385,420,455,490,525,560,595,640,665,700,], 
]};
/*[ 9] Fire Golem		*/ var d162 = {index:[2,""], values:[
		["attack"], 
		["defense"], 
		["life"], 
		["fire min"], 
		["fire max"], 
		["holy fire min"], 
		["holy fire max"], 
		["mana cost"], 
]};
/*[10] Revive			*/ var d163 = {index:[1,""], values:[
		["# of Monsters",1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,], 
		["Damage %",2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,], 
		["Duration",120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,], 
]};

/*[11] Poison Dagger	*/ var d211 = {index:[0,""], values:[
		["% Poison Pierce",-1,-2,-3,-4,-5,-6,-7,-8,-9,-10,-11,-12,-13,-14,-15,-16,-17,-18,-19,-20,], 
		["poison min",3,6,9,12,15,18,21,25,37,50,62,75,87,100,112,125,156,187,218,250,281,312,368,425,481,537,593,650,731,812,], 
		["poison max",6,9,12,15,18,21,25,28,40,53,65,78,90,103,115,128,159,190,221,253,284,315,371,428,484,540,596,653,734,815,], 
		["Attack Rating Bonus %",30,50,70,90,110,130,150,170,190,210,230,250,270,290,310,330,350,370,390,410,430,450,470,490,510,530,550,570,590,610,], 
		["Mana Cost",1.5,1.6,1.7,1.8,1.9,2,2.1,2.2,2.3,2.4,2.5,2.6,2.7,2.8,2.9,3,3.1,3.2,3.3,3.4,3.5,3.6,3.7,3.8,3.9,4,4.1,4.2,4.3,4.4,], 
]};
/*[12] Teeth			*/ var d212 = {index:[0,""], values:[
		["teeth"], 
		["magic min"], 
		["magic max"], 
		["mana cost"], 
]};
/*[13] Bone Armor		*/ var d223 = {index:[0,""], values:[
		["absorbs"], 
		["mana cost"], 
]};
/*[14] Corpse Explosion	*/ var d221 = {index:[0,""], values:[
		["damage min"], 
		["damage max"], 
		["fire min"], 
		["fire max"], 
		["radius"], 
		["mana cost"], 
]};
/*[15] Desecrate		*/ var d231 = {index:[0,""], values:[
		["poison min"], 
		["poison max"], 
		["mana cost"], 
]};
/*[16] Bone Spear		*/ var d242 = {index:[0,""], values:[
		["spears",1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3], 
		["magic min"], 
		["magic max"], 
		["mana cost"], 
]};
/*[17] Bone Wall		*/ var d233 = {index:[0,""], values:[
		["life"], 
]};
/*[18] Bone Spirit		*/ var d262 = {index:[0,""], values:[
		["magic min"], 
		["magic max"], 
		["mana cost"], 
]};
/*[19] Poison Nova		*/ var d261 = {index:[0,""], values:[
		["poison min"], 
		["poison max"], 
]};
/*[31] Bone Prison		*/ var d253 = {index:[0,""], values:[
		["life"], 
		["mana cost"], 
]};

/*[20] Amplify Damage	*/ var d312 = {index:[1," percent"], values:[
		["% Monster Physical Resistance Decreased",-12,-14,-16,-18,-20,-22,-24,-26,-28,-30,-32,-34,-36,-38,-40,-42,-44,-46,-48,-50,-52,-54,-56,-58,-60,-62,-64,-66,-68,-70,], 
		["Radius (yards)",4,4,4.6,4.6,4.6,5.3,5.3,5.3,6,6,6,6.6,6.6,6.6,7.3,7.3,7.3,8,8,8,8.6,8.6,8.6,9.3,9.3,9.3,10,10,10,10.6,], 
		["Duration (seconds)",4,4.2,4.4,4.6,4.8,5,5.2,5.4,5.6,5.8,6,6.2,6.4,6.6,6.8,7,7.2,7.4,7.6,7.8,8,8.2,8.4,8.6,8.8,9,9.2,9.4,9.6,9.8,], 
		["Mana Cost",2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13,13.5,14,14.5,15,15.5,16,16.5,], 
]};
/*[21] Dim Vision		*/ var d323 = {index:[0,""], values:[
		["- Enemy Attack Rating",-50,-65,-80,-95,-110,-125,-140,-155,-170,-185,-200,-215,-230,-245,-260,-275,-290,-305,-320,-335,-350,-365,-380,-395,-410,-425,-440,-455,-470,-485,], 
		["Radius (yards)",4,4,4.6,4.6,4.6,5.3,5.3,5.3,6,6,6,6.6,6.6,6.6,7.3,7.3,7.3,8,8,8,8.6,8.6,8.6,9.3,9.3,9.3,10,10,10,10.6,], 
		["Duration (seconds)",6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,], 
		["Mana Cost",6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13,13.5,14,14.5,15,15.5,16,16.5,17,17.5,18,18.5,19,19.5,20,20.5,], 
]};
/*[22] Dark Pact		*/ var d321 = {index:[0,""], values:[
		["radius"], 
		["magic min",9,15,22,29,36,42,49,56,65,74,83,92,101,110,119,128,140,151,162,174,185,196,212,228,234,259,275,291,309,327,], 
		["magic max",11,20,29,38,47,56,65,74,88,101,115,128,142,155,169,183,198,214,230,246,262,277,298,318,339,359,379,400,422,445,], 
		["Mana Cost",6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13,13.5,14,14.5,15,15.5,16,16.5,17,17.5,18,18.5,19,19.5,20,20.5,], 
]};
/*[23] Weaken			*/ var d342 = {index:[0,""], values:[
		["target damage"], 
		["radius"], 
		["duration"], 
		["mana cost"], 
]};
/*[24] Iron Maiden		*/ var d331 = {index:[0,""], values:[
		["damage returned"], 
		["duration"], 
		["radius"], 
		["mana cost"], 
]};
/*[25] Terror			*/ var d333 = {index:[1," percent<br>Duration: 3 seconds<br>Radius: 6.6 yards"], values:[
		["speed reduction"], 
		["mana cost"], 
]};
/*[26] Confuse			*/ var d343 = {index:[1," percent"], values:[
		["attack speed"], 
		["radius"], 
		["duration"], 
		["mana cost"], 
]};
/*[27] Life Tap			*/ var d332 = {index:[1," percent"], values:[
		["life steal"], 
		["radius"], 
		["duration"], 
		["mana cost"], 
]};
/*[28] Attract			*/ var d353 = {index:[0,""], values:[
		["enemy defense"], 
		["radius"], 
		["duration"], 
]};
/*[29] Decrepify		*/ var d351 = {index:[2," percent"], values:[
		["Enemy movement speed slowed by x%",-11,-12,-13,-14,-15,-16,-17,-18,-19,-20,-21,-22,-23,-24,-25,-26,-27,-28,-29,-30,-31,-32,-33,-34,-35,-36,-37,-38,-39,-40,], 
		["Enemies Attack speed and cast speed slowed by x%",-16,-17,-18,-19,-20,-21,-22,-23,-24,-25,-26,-27,-28,-29,-30,-31,-32,-33,-34,-35,-36,-37,-38,-39,-40,-41,-42,-43,-44,-45,], 
		["Radius (yards)",4,4,4.6,4.6,4.6,5.3,5.3,5.3,6,6,6,6.6,6.6,6.6,7.3,7.3,7.3,8,8,8,8.6,8.6,8.6,9.3,9.3,9.3,10,10,10,10.6,], 
		["Duration",4,4.4,4.8,5.2,5.6,6,6.4,6.8,7.2,7.6,8,8.4,8.8,9.2,9.6,10,10.4,10.8,11.2,11.6,12,12.4,12.8,13.2,13.6,14,14.4,14.8,15.2,15.6,], 
		["Mana Cost",11,11.5,12,12.5,13,13.5,14,14.5,15,15.5,16,16.5,17,17.5,18,18.5,19,19.5,20,20.5,21,21.5,22,22.5,23,23.5,24,24.5,25,25.5,], 
]};
/*[30] Lower Resist		*/ var d362 = {index:[1," percent"], values:[
		["Resist All -%",-12,-14,-16,-18,-20,-22,-24,-26,-28,-30,-32,-34,-36,-38,-40,-42,-44,-46,-48,-50,-52,-54,-56,-58,-60,-62,-64,-66,-68,-70,], 
		["Radius (yards)",6.6,6.6,7.3,7.3,7.3,8,8,8,8.6,8.6,8.6,9.3,9.3,10,10,10,10.6,10.6,10.6,11.3,11.3,11.3,12,12,12,12.6,12.6,12.6,12.6,13.3,], 
		["Duration (seconds)",8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,], 
		["Mana Cost",22,22.5,23,23.5,24,24.5,25,25.5,26,26.5,27,28,28.5,29,29.5,30,30.5,31,31.5,32,32.5,33,33.5,34,34.5,35,35.5,36,36.5,37,], 
]};
/*[32] Curse Mastery	*/ var d313 = {index:[0,""], values:[
		["maximum curses"], 
]};

var skills_pd2_necromancer = [
{data:d111, key:"111", code:66, name:"Skeleton Mastery", i:0, req:[1], reqlvl:1, level:0, extra_levels:0, force_levels:0, bindable:0, style:"display: block; top: 82px; left: 2px;", description:"Passive - Increases life, damage, and<br>velocity of raised skeletons", syn_title:"", syn_text:"", graytext:"", text:["Magi: Velocity: ","<br>Magi: Life: ","<br>Magi: Elemental Damage: "," percent<br>Skeletons: Velocity: ","<br>Skeletons: Life: ","<br>Skeletons: Damage: "," percent"]},
{data:d113, key:"113", code:67, name:"Raise Skeleton Warrior", i:1, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, bindable:1, style:"display: block; top: 82px; left: 142px;", description:"Cast on the corpse of a slain monster,<br>this raises a skeleton warrior that<br>fights for you", syn_title:"<br>Raise Skeleton Warrior Receives Bonuses From:<br>", syn_text:"Raise Skeletal Mage: +8% Damage per Level<br>Skeleton Mastery: +8% Damage per Level<br>Skeleton Mastery", graytext:"", text:["Damage: ","-","Attack: ","<br>Defense: ","<br>Life: ","<br>"," skeletons total<br>Mana Cost: ",""]},
/*TODO: remove*/{data:d122, key:"122", code:263, name:"None", i:2, req:[], reqlvl:100, level:0, extra_levels:0, force_levels:0, bindable:0, style:"display: none;", description:"", syn_title:"", syn_text:"", graytext:"", text:[""]},
{data:d122, key:"122", code:69, name:"Clay Golem", i:3, req:[], reqlvl:6, level:0, extra_levels:0, force_levels:0, bindable:1, style:"display: block; top: 150px; left: 72px;", description:"Creates a golem from the earth<br>to fight by your side", syn_title:"<br>Clay Golem Receives Bonuses From:<br>", syn_text:"Golem Mastery<br>Iron Golem: +35 Defense per Level<br>Blood Golem: +20% Damage per Level<br>Iron Golem: +20% Damage per Level<br>Fire Golem: +20% Damage per Level", graytext:"", text:["Attack: ","<br>Defense: ","Life: ","<br>Damage: ","-","<br>Attack Bonus: +","<br>Slows Enemies: "," percent<br>Mana Cost: ",""]},
{data:d131, key:"131", code:70, name:"Golem Mastery", i:4, req:[3], reqlvl:12, level:0, extra_levels:0, force_levels:0, effect:0, bindable:2, style:"display: block; top: 218px; left: 2px;", description:"Enhances speed and life of all your golems", syn_title:"", syn_text:"", graytext:"", text:["Can Summon an Extra Golem Every 5 Base Levels<br>Golems: ","Life: +"," percent<br>Attack Bonus: +","<br>Walk/Run Speed: +"," percent"]},
{data:d133, key:"133", code:71, name:"Raise Skeletal Mage", i:5, req:[1], reqlvl:12, level:0, extra_levels:0, force_levels:0, bindable:1, style:"display: block; top: 218px; left: 142px;", description:"Cast on the corpse of a slain monster,<br>this raises a skeleton mage that<br>fights for you", syn_title:"<br>Raise Skeletal Mage Receives Bonuses From:<br>", syn_text:"Raise Skeleton Warrior: +8% Elemental Damage per Level<br>Summon Mastery", graytext:"", text:["","Poison Damage: ","-"," over 0.5 Seconds<br>Lightning Damage: ","-","<br>Cold Damage: ","-","<br>Fire Damage: ","-","<br>Life: ","<br>Mana Cost: ",""]},
{data:d142, key:"142", code:72, name:"Blood Golem", i:6, req:[3], reqlvl:18, level:0, extra_levels:0, force_levels:0, effect:0, bindable:1, style:"display: block; top: 286px; left: 72px;", description:"A golem that steals the life of enemies<br>and shares it with you<br><br>1/4 of life stolen by golem is shared with you", syn_title:"<br>Blood Golem Receives Bonuses From:<br>", syn_text:"Golem Mastery<br>Clay Golem: +20 Attack Rating per Level<br>Iron Golem: +35 Defense per Level<br>Clay Golem: +15% Damage per Level<br>Iron Golem: +15% Damage per Level<br>Fire Golem: +15% Damage per Level", graytext:"", text:["Attack: ","<br>Defense: ","Life: ","<br>+"," Life Gained On Hit<br>Damage: ","-","<br>Mana Cost: ",""]},
{data:d141, key:"141", code:73, name:"Blood Warp", i:7, req:[], reqlvl:18, level:0, extra_levels:0, force_levels:0, bindable:1, style:"display: block; top: 286px; left: 2px;", description:"Instantly moves to a destination at the cost<br>of a percentage of max HP", syn_title:"", syn_text:"", graytext:"", text:["Cooldown: "," seconds<br>Life Cost: -12% Maximum HP<br>Mana Cost: 10"]},
{data:d152, key:"152", code:74, name:"Iron Golem", i:8, req:[6,3], reqlvl:24, level:0, extra_levels:0, force_levels:0, effect:0, bindable:1, style:"display: block; top: 354px; left: 72px;", description:"Transforms a metallic item into a golem that gains<br>the properties of the item", syn_title:"<br>Iron Golem Receives Bonuses From:<br>", syn_text:"Golem Mastery<br>Clay Golem: +5% Damage per Level<br>Blood Golem: +5% Damage per Level<br>Fire Golem: +5% Damage per Level", graytext:"", text:["Damage: ","-","<br>Attack: ","<br>Defense: ","Life: ","<br>Thorns Damage: "," percent damage returned<br>Defense Bonus: +","<br>Mana Cost: 35"]},
{data:d162, key:"162", code:75, name:"Fire Golem", i:9, req:[8,6,3], reqlvl:30, level:0, extra_levels:0, force_levels:0, bindable:1, style:"display: block; top: 422px; left: 72px;", description:"Creates a golem that converts the damage<br>it receives from fire into life", syn_title:"<br>Fire Golem Receives Bonuses From:<br>", syn_text:"Golem Mastery<br>Clay Golem: +20 Attack Rating per Level<br>Clay Golem: +10% Damage per Level<br>Blood Golem: +10% Damage per Level<br>Iron Golem: +10% Damage per Level", graytext:"", text:["Attack: ","<br>Defense: ","Life: ","<br>Absorbs 5 percent fire damage<br>Fire Damage: ","-","<br>Holy Fire: ","-","<br>Mana Cost: ",""]},
{data:d163, key:"163", code:76, name:"Revive", i:10, req:[5,1], reqlvl:30, level:0, extra_levels:0, force_levels:0, bindable:1, style:"display: block; top: 422px; left: 142px;", description:"Returns a monster to life<br>to fight by your side", syn_title:"", syn_text:"", graytext:"", text:["Monsters: ","Damage: +"," percent<br>Duration: "," seconds<br>Mana Cost: 45"]},

{data:d211, key:"211", code:77, name:"Poison Dagger", i:11, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, effect:0, bindable:1, style:"display: block; top: 82px; left: 204px;", description:"Adds poison to your dagger attacks", syn_title:"<br>Poison Dagger Receives Bonuses From:<br>", syn_text:"Desecrate: +22% Poison Damage per Level<br>Poison Nova: +22% Poison Damage per Level", graytext:"", text:["Pierces ","% Poison Resistance<br>Poison Damage: ","-","<br>over 2 seconds<br>Attack: "," percent<br>Mana Cost: ",""]},
{data:d212, key:"212", code:78, name:"Teeth", i:12, req:[], reqlvl:1, level:0	, extra_levels:0, force_levels:0, bindable:2, style:"display: block; top: 82px; left: 234px;", description:"Fires a barrage of summoned barbed teeth", syn_title:"<br>Teeth Receives Bonuses From:<br>", syn_text:"Bone Armor: +25% Magic Damage per Level<br>Bone Spear: +25% Magic Damage per Level<br>Bone Spirit: +25% Magic Damage per Level", graytext:"", text:[""," Teeth<br>Magic Damage: ","-","<br>Mana Cost: ",""]},
{data:d223, key:"223", code:79, name:"Bone Armor", i:13, req:[12], reqlvl:6, level:0, extra_levels:0, force_levels:0, effect:0, bindable:1, style:"display: block; top: 150px; left: 254px;", description:"Creates an orbiting shield of bone<br>that absorbs melee damage", syn_title:"<br>Bone Armor Receives Bonuses From:<br>", syn_text:"Bone Wall: +20 Damage Absorbed per Level<br>Bone Prison: +20 Damage Absorbed per Level", graytext:"", text:["Absorbs "," damage<br>Mana Cost: ",""]},
{data:d221, key:"221", code:80, name:"Corpse Explosion", i:14, req:[11], reqlvl:6, level:0, extra_levels:0, force_levels:0, bindable:2, style:"display: block; top: 150px; left: 234px;", description:"Cast on the corpse of a slain monster.<br>It explodes, damaging nearby enemies<br><br>Damage: 3-5 percent of corpse life", syn_title:"<br>Corpse Explosion Receives Bonuses From:<br>", syn_text:"Amplify Damage: +7% Damage per Level<br>Desecrate: +7% Damage per Level<br>Revive: +7% Damage per Level", graytext:"", text:["Damage: ","-","<br>Fire Damage: ","-","<br>Radius: "," yards<br>Mana Cost: ",""]},
{data:d231, key:"231", code:81, name:"Desecrate", i:15, req:[14,11], reqlvl:12, level:0, extra_levels:0, force_levels:0, bindable:1, style:"display: block; top: 218px; left: 204px;", description:"Summons 5 corpses and releases a deadly cloud of poison", syn_title:"<br>Desecrate Receives Bonuses From:<br>", syn_text:"Poison Dagger: +16% Poison Damage per Level<br>Poison Nova: +16% Poison Damage per Level", graytext:"", text:["Poison Damage: ","-","<br>over 3 seconds<br>Mana Cost: ",""]},
{data:d242, key:"242", code:82, name:"Bone Spear", i:16, req:[12], reqlvl:18, level:0, extra_levels:0, force_levels:0, bindable:2, style:"display: block; top: 286px; left: 154px;", description:"Summons a deadly spike of bone to impale your enemies<br><br>Fires an additional bone spear at levels 15 and 25", syn_title:"<br>Bone Spear Receives Bonuses From:<br>", syn_text:"Teeth: +10% Magic Damage per Level<br>Bone Spirit: +10% Magic Damage per Level<br>Bone Armor: +5% Magic Damage per Level", graytext:"", text:["Bone Spears: ","<br>Magic Damage: ","-","<br>Mana Cost: ",""]},
{data:d233, key:"233", code:83, name:"Bone Wall", i:17, req:[13,12], reqlvl:12, level:0, extra_levels:0, force_levels:0, bindable:1, style:"display: block; top: 218px; left: 304px;", description:"Creates an impassable barrier<br>of bone and debris", syn_title:"<br>Bone Wall Receives Bonuses From:<br>", syn_text:"Bone Armor: +10% Life per Level<br>Bone Prison: +10% Life per Level", graytext:"", text:["Life: ","<br>Duration: 24 seconds<br>Mana Cost: 17",""]},
{data:d262, key:"262", code:84, name:"Bone Spirit", i:18, req:[16,12], reqlvl:30, level:0, extra_levels:0, force_levels:0, bindable:2, style:"display: block; top: 422px; left: 254px;", description:"Releases a spirit of the restless undead that<br>tracks its target or finds one of its own", syn_title:"<br>Bone Spirit Receives Bonuses From:<br>", syn_text:"Teeth: +10% Magic Damage per Level<br>Bone Spear: +10% Magic Damage per Level<br>Bone Armor: +5% Magic Damage per Level", graytext:"", text:["Magic Damage: ","-","<br>Mana Cost: ",""]},
{data:d261, key:"261", code:85, name:"Poison Nova", i:19, req:[15,14,11], reqlvl:30, level:0, extra_levels:0, force_levels:0, bindable:2, style:"display: block; top: 422px; left: 140px;", description:"Emits an expanding ring of concentrated poison", syn_title:"<br>Poison Nova Receives Bonuses From:<br>", syn_text:"Poison Dagger: +15% Poison Damage per Level<br>Desecrate: +15% Poison Damage per Level", graytext:"", text:["Poison Damage: ","-","<br>over 2 seconds<br>Mana Cost: 20",""]},

{data:d312, key:"312", code:86, name:"Amplify Damage", i:20, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, bindable:1, style:"display: block; top: 82px; left: 206px;", description:"Curses a group of enemies, increasing<br>the non-magic damage they receive", syn_title:"<br>Amplify Damage Receives Bonuses From:<br>", syn_text:"Curse Mastery: +1% Reduced Physical Resistance per Level<br>Curse Mastery: +0.6 Radius per Three Levels", graytext:"", text:["Reduced Physical Damage Resistance Increased by 2% per Base Level<br>Physical Damage Resistance: ","Radius: "," yards<br>Duration: "," seconds<br>Mana Cost: ",""]},
{data:d323, key:"323", code:87, name:"Dim Vision", i:21, req:[], reqlvl:6, level:0, extra_levels:0, force_levels:0, bindable:1, style:"display: block; top: 150px; left: 346px;", description:"Curses a group of monsters,<br>reducing their vision radius and attack rating", syn_title:"<br>Dim Vision Receives Bonuses From:<br>", syn_text:"Curse Mastery: +5 Reduced Attack Rating per Level", graytext:"", text:[""," Attack Rating<br>Radius: "," yards<br>Duration: "," seconds<br>Mana Cost: ",""]},
{data:d321, key:"321", code:88, name:"Dark Pact", i:22, req:[20], reqlvl:6, level:0, extra_levels:0, force_levels:0, bindable:1, style:"display: block; top: 150px; left: 304px;", description:"Consumes the curses on enemies within an area<br>sealing a dark pact and dealing damage around<br>the enemy for each curse devoured", syn_title:"<br>Dark Pact Receives Bonuses From:<br>", syn_text:"Curse Mastery: +10% Magic Damage per Level<br>Curse Mastery: +0.6 Radius per Three Levels<br>Iron Maiden: +10% Magic Damage per Level<br>All Curses: +6% Magic Damage per Level", graytext:"", text:["Radius: "," yards<br>Magic Damage per Curse: ","-","<br>Mana Cost: ",""]},
{data:d342, key:"342", code:89, name:"Weaken", i:23, req:[27,20], reqlvl:18, level:0, extra_levels:0, force_levels:0, bindable:1, style:"display: block; top: 286px; left: 306px;", description:"Curses a group of enemies,<br>reducing the amount of damage they inflict", syn_title:"<br>Weaken Receives Bonuses From:<br>", syn_text:"Curse Mastery: +1% Reduced Damage per Two Levels<br>Curse Mastery: +0.6 Radius per Three Levels", graytext:"", text:["Target's Damage: "," percent<br>Radius: "," yards<br>Duration: "," seconds<br>Mana Cost: ",""]},
{data:d331, key:"331", code:90, name:"Iron Maiden", i:24, req:[22,20], reqlvl:12, level:0, extra_levels:0, force_levels:0, bindable:1, style:"display: block; top: 218px; left: 206px;", description:"Curses a group of enemies, causing them<br>to damage themselves when damaging others", syn_title:"<br>Iron Maiden Receives Bonuses From:<br>", syn_text:"Curse Mastery: +6% Increased Damage Returned to Enemies per Level<br>Curse Mastery: +0.6 Radius per Three Levels", graytext:"", text:[""," percent damage returned<br>Duration: "," seconds<br>Radius: "," yards<br>Mana Cost: ",""]},
{data:d333, key:"333", code:91, name:"Terror", i:25, req:[21], reqlvl:12, level:0, extra_levels:0, force_levels:0, bindable:1, style:"display: block; top: 218px; left: 306px;", description:"Curses a group of monsters,<br>causing them to flee in terror", syn_title:"<br>Terror Receives Bonuses From:<br>", syn_text:"Curse Mastery: +1% Reduced Movement Speed per Level", graytext:"", text:["Reduces Movement Speed by 2% per Base Level<br>Movement Speed: ","Mana Cost: ",""]},
{data:d343, key:"343", code:92, name:"Confuse", i:26, req:[25,21], reqlvl:18, level:0, extra_levels:0, force_levels:0, bindable:1, style:"display: block; top: 286px; left: 326px;", description:"Curses a monster to force it to attack random targets", syn_title:"<br>Confuse Receives Bonuses From:<br>", syn_text:"Curse Mastery: +1% Increased Attack Speed per Level", graytext:"", text:["Increases Monster Attack Speed by 3% per Base Level<br>Attack Speed: +","Radius: "," yards<br>Duration: "," seconds<br>Mana Cost: ",""]},
{data:d332, key:"332", code:93, name:"Life Tap", i:27, req:[20], reqlvl:12, level:0, extra_levels:0, force_levels:0, bindable:1, style:"display: block; top: 218px; left: 286px;", description:"Curses a group of monsters so that<br>damaging them gives the attacker life", syn_title:"<br>Life Tap Receives Bonuses From:<br>", syn_text:"Curse Mastery: +1% Increased Life Steal per Two Levels<br>Curse Mastery: +0.6 Radius per Three Levels", graytext:"", text:["Percent Life Steal Increases by 1% per Base Level<br>","Radius: "," yards<br>Duration: "," seconds<br>Mana Cost: ",""]},
{data:d353, key:"353", code:94, name:"Attract", i:28, req:[26,25,21], reqlvl:24, level:0, extra_levels:0, force_levels:0, bindable:1, style:"display: block; top: 354px; left: 326px;", description:"Curses a monster to become the<br>target of all nearby monsters<br>This curse may not be overridden by another curse", syn_title:"<br>Attract Receives Bonuses From:<br>", syn_text:"Curse Mastery: +5 Reduced Enemy Defense per Level", graytext:"", text:["Enemy Defense: ","<br>Radius: "," yards<br>Duration: "," seconds<br>Mana Cost: 17"]},
{data:d351, key:"351", code:95, name:"Decrepify", i:29, req:[23,27,20], reqlvl:24, level:0, extra_levels:0, force_levels:0, bindable:1, style:"display: block; top: 354px; left: 241px;", description:"Curses a group of enemies to slow their<br>movement speed, attack rate, and cast rate", syn_title:"<br>Decrepify Receives Bonuses From:<br>", syn_text:"Curse Mastery: +1% Reduced Attack and Cast Rate per Level<br>Curse Mastery: +0.6 Radius per Three Levels", graytext:"", text:["Reduced Movement Speed, Attack Rate, and Cast Rate<br>Increased by 1% per Base Level<br>Movement Speed: "," percent<br>Attack and Cast Rate: ","Radius: "," yards<br>Duration: "," seconds<br>Mana Cost: ",""]},
{data:d362, key:"362", code:96, name:"Lower Resist", i:30, req:[23,27,20], reqlvl:30, level:0, extra_levels:0, force_levels:0, bindable:1, style:"display: block; top: 422px; left: 266px;", description:"Curses an enemy to take more damage from all magical attacks<br>Lowers resistances of monsters<br>Lowers maximum resistances of hostile players", syn_title:"<br>Lower Resist Receives Bonuses From:<br>", syn_text:"Curse Mastery: +1% Lowered Resistances per Two Levels<br>Curse Mastery: +0.6 Radius per Three Levels", graytext:"", text:["Lowers Resistances by 2% per Base Level<br>Resist All: ","Radius: "," yards<br>Duration: "," seconds<br>Mana Cost: ",""]},

{data:d253, key:"253", code:300, name:"Bone Prison", i:31, req:[17,16,13,12], reqlvl:12, level:0, extra_levels:0, force_levels:0, bindable:1, style:"display: block; top: 354px; left: 304px;", description:"Creates a barrier of fossilized bone around your target", syn_title:"<br>Bone Prison Receives Bonuses From:<br>", syn_text:"Bone Armor: +8% Life per Level<br>Bone Wall: +8% Life per Level", graytext:"", text:["Life: ","<br>Duration: 24 seconds<br>Mana Cost: ",""]},

{data:d313, key:"313", code:301, name:"Curse Mastery", i:32, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, bindable:0, style:"display: block; top: 82px; left: 320px;", description:"Passive - Provides benefits to your curses and allows<br>you to apply an additional curse for every 10 base levels", syn_title:"", syn_text:"", graytext:"", text:["Maximum Curses: ",""]},
];
