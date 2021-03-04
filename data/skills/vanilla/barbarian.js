
// TODO: update data for levels 1-60
// TODO: review stats & frame info

var character_barbarian_vanilla = {class_name:"Barbarian", strength:30, dexterity:20, vitality:25, energy:10, life:55, mana:10, stamina:192, levelup_life:2, levelup_stamina:1, levelup_mana:1, ar_per_dexterity:5, life_per_vitality:4, stamina_per_vitality:1, mana_per_energy:1, starting_strength:30, starting_dexterity:20, starting_vitality:25, starting_energy:10, ar_const:20, block_const:4, skill_layout:"./images/skill_trees/vanilla/barbarian.png", mana_regen:1.66,
	weapon_frames:{dagger:15, sword:[15,17], axe:[15,18], mace:[15,18], thrown:[15,15], staff:18, polearm:18, scepter:15, wand:15, javelin:15, spear:18, bow:14, crossbow:19},
	// Skills that may adjust IAS breakpoints: Frenzy, Whirlwind, Concentrate, Bash, Stun, Cleave
	fcr_frames:13, fcr_bp:[0, 20, 37, 63, 105, 200],
	fhr_frames:9, fhr_bp:[0, 7, 15, 27, 48, 86, 200],
	fbr_frames:7, fbr_bp:[0, 9, 20, 42, 86, 280],
	
	// getSkillData - gets skill info from the skills data table
	//	skill: skill object for the skill in question
	//	lvl: level of the skill
	//	elem: which element of the skill to return
	// result: value of the skill element at the specified level
	// ---------------------------------
	getSkillData : function(skill, lvl, elem) {
		var result = skill.data.values[elem][lvl];
		
		if (skill.name == "War Cry" && elem < 2) { 			result *= (1 + 0.06*skills[0].level + 0.06*skills[2].level + 0.06*skills[5].level) }
		if (skill.name == "Shout" && elem == 1) { 			result = (300 + 5*skills[6].level + 5*skills[9].level) }
		if (skill.name == "Battle Orders" && elem == 0) { 	result = (300 + 5*skills[3].level + 5*skills[9].level) }
		if (skill.name == "Battle Command" && elem == 0) { 	result = (300 + 5*skills[3].level + 5*skills[6].level) }
		
		if (skill.name == "Bash" && elem == 0) { 			result += (10*skills[22].level) }
		if (skill.name == "Bash" && elem == 1) { 			result += (10*skills[24].level) }
		if (skill.name == "Stun" && elem == 0) { 			result = 8*skills[20].level }
		if (skill.name == "Stun" && elem == 1) { 			result += (5*skills[22].level) }
		if (skill.name == "Stun" && elem == 2) { 			result *= (1 + 0.05*skills[8].level) }
		if (skill.name == "Concentrate" && elem == 0) { 	result = 1*skills[23].level }
		if (skill.name == "Concentrate" && elem == 3) { 	result += (5*skills[20].level + 10*skills[6].level) }
		if (skill.name == "Leap Attack" && elem == 0) { 	result += (10*skills[25].level) }
		if (skill.name == "Double Swing" && elem == 0) { 	result = 10*skills[20].level }
		if (skill.name == "Double Throw" && elem == 0) { 	result = 8*skills[21].level }
		if (skill.name == "Berserk" && elem == 1) { 		result += (10*skills[0].level + 10*skills[3].level) }
		if (skill.name == "Frenzy" && elem == 0) { 			result = 1*skills[23].level }
		if (skill.name == "Frenzy" && elem == 1) { 			result += (4*skills[28].level + 4*skills[21].level) }
		
	return result
	},
	
	// getBuffData - gets a list of stats corresponding to a persisting buff
	//	effect: array element object for the buff
	// result: indexed array including stats affected and their values
	// ---------------------------------
	getBuffData : function(skill) {
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
		if (typeof(skill.damaging) != 'undefined') { attack = skill.damaging.attack; spell = skill.damaging.spell; }
		
		// unsupported
		
		var result = {min:skillMin,max:skillMax,ar:skillAr};
		return result
	},
	
	// setSkillAmounts - helps update class-related skill levels, called by calculateSkillAmounts()
	//	s: index of skill
	// ---------------------------------
	setSkillAmounts : function(s) {
		skills[s].extra_levels += character.skills_barbarian
		if (s < 10) {
			skills[s].extra_levels += character.skills_warcries
			skills[s].extra_levels += character.skills_tree1
		} else if (s > 19) {
			skills[s].extra_levels += character.skills_combat_barbarian
			skills[s].extra_levels += character.skills_tree3
		} else {
			skills[s].extra_levels += character.skills_masteries
			skills[s].extra_levels += character.skills_tree2
		}
	}
};

/*[ 0] Howl				*/ var d111 = {values:[
		["Enemy Runs Up to # Yards",16,19.3,22.6,26,29.3,32.6,36,39.3,42.6,46,49.3,52.6,56,59.3,62.6,66,69.3,72.6,76,79.3,82.6,86,89.3,92.6,96,99.3,102.6,106,109.3,112.6,116,119.3,122.6,126,129.3,132.6,136,139.3,142.6,146,149.3,152.6,156,159.3,162.6,166,169.3,172.6,176,179.3,182.6,186,189.3,192.6,196,199.3,202.6,206,209.3,212.6,], 
		["Enemy Runs for # Seconds",3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,], 
]};
/*[ 1] Find Potion		*/ var d113 = {values:[
		["% Chance",15,27,36,44,50,55,59,62,66,68,71,73,75,77,78,80,81,82,83,84,85,86,87,88,88,89,90,90,91,91,92,92,93,93,93,94,94,95,95,95,95,96,96,96,97,97,97,97,98,98,98,98,98,99,99,99,99,99,99,100,], 
]};
/*[ 2] Taunt			*/ var d121 = {values:[
		["Target's Damage %",-5,-7,-9,-11,-13,-15,-17,-19,-21,-23,-25,-27,-29,-31,-33,-35,-37,-39,-41,-43,-45,-47,-49,-51,-53,-55,-57,-59,-61,-63,-65,-67,-69,-71,-73,-75,-77,-79,-81,-83,-85,-87,-89,-91,-93,-95,-97,-99,-101,-103,-105,-107,-109,-111,-113,-115,-117,-119,-121,-123,], 
		["Target's Attack %",-5,-7,-9,-11,-13,-15,-17,-19,-21,-23,-25,-27,-29,-31,-33,-35,-37,-39,-41,-43,-45,-47,-49,-51,-53,-55,-57,-59,-61,-63,-65,-67,-69,-71,-73,-75,-77,-79,-81,-83,-85,-87,-89,-91,-93,-95,-97,-99,-101,-103,-105,-107,-109,-111,-113,-115,-117,-119,-121,-123,], 
]};
/*[ 3] Shout			*/ var d122 = {values:[
		["Defense +%",25,33,41,49,57,65,73,81,89,97,105,113,121,129,137,145,153,161,169,177,185,193,201,209,217,225,233,241,249,257,265,273,281,289,297,305,313,321,329,337,345,353,361,369,377,385,393,401,409,417,425,433,441,449,457,465,473,481,489,497,], 
		["Duration",], 
]};
/*[ 4] Find Item		*/ var d133 = {values:[
		["% Chance",13,19,24,29,32,35,37,39,41,42,44,45,46,47,47,49,49,50,50,51,51,52,52,53,53,53,54,54,55,55,55,55,56,56,56,56,56,57,57,57,57,57,57,57,58,58,58,58,58,58,58,58,58,59,59,59,59,59,59,60,], 
]};
/*[ 5] Battle Cry		*/ var d141 = {values:[
		["Duration (seconds)",12,14.4,16.8,19.2,21.6,24,26.4,28.8,31.2,33.6,36,38.4,40.8,43.2,45.6,48,50.4,52.8,55.2,57.6,60,62.4,64.8,67.2,69.6,72,74.4,76.8,79.2,81.6,84,86.4,88.8,91.2,93.6,96,98.4,100.8,103.2,105.6,108,110.4,112.8,115.2,117.6,120,122.4,124.8,127.2,129.6,132,134.4,136.8,139.2,141.6,144,146.4,148.8,151.2,153.6,], 
		["Defense %",-15,-17,-19,-21,-23,-25,-27,-29,-31,-33,-35,-37,-39,-41,-43,-45,-47,-49,-51,-53,-55,-57,-59,-61,-63,-65,-65,-65,-65,-65,-65,-65,-65,-65,-65,-65,-65,-65,-65,-65,-65,-65,-65,-65,-65,-65,-65,-65,-65,-65,-65,-65,-65,-65,-65,-65,-65,-65,-65,-65,], 
		["Damage Reduction",-5,-6,-7,-8,-9,-10,-11,-12,-13,-14,-15,-16,-17,-18,-19,-20,-21,-22,-23,-24,-25,-26,-26,-27,-27,-28,-28,-29,-29,-30,-30,-31,-31,-32,-32,-33,-33,-34,-34,-35,-35,-36,-36,-37,-37,-38,-38,-39,-39,-40,-40,-41,-41,-42,-42,-43,-43,-44,-44,-45,], 
]};
/*[ 6] Battle Orders	*/ var d152 = {values:[
		["Duration",], 
		["Max Stamina",50,65,80,95,110,125,140,155,170,185,200,215,230,245,260,275,290,305,320,335,350,365,380,395,410,425,440,455,470,485,500,515,530,545,560,575,590,605,620,635,650,665,680,695,710,725,740,755,770,785,800,815,830,845,860,875,890,905,920,935,], 
		["Max Life",50,65,80,95,110,125,140,155,170,185,200,215,230,245,260,275,290,305,320,335,350,365,380,395,410,425,440,455,470,485,500,515,530,545,560,575,590,605,620,635,650,665,680,695,710,725,740,755,770,785,800,815,830,845,860,875,890,905,920,935,], 
		["Max Mana",25,32,40,47,55,62,70,77,85,92,100,107,115,122,130,137,145,152,160,167,175,172,190,197,205,212,220,227,235,242,250,257,265,272,280,287,295,302,310,317,325,332,340,347,355,362,370,377,385,392,400,407,415,422,430,437,445,452,460,467,], 
]};
/*[ 7] Grim Ward		*/ var d153 = {values:[
		["Radius (yards)",8,8.6,9.3,10,10.6,11.3,12,12.6,13.3,14,14.6,15.3,16,16.6,17.3,18,18.6,19.3,20,20.6,21.3,22,22.6,23.3,24,24.6,25.3,26,26.6,27.3,28,28.6,29.3,30,30.6,31.3,32,32.6,33.3,34,34.6,35.3,36,36.6,37.3,38,38.6,39.3,40,40.6,41.3,42,42.6,43.3,44,44.6,45.3,46,46.6,47.3,], 
]};
/*[ 8] War Cry			*/ var d161 = {values:[
		["Damage min",2,3,4,5,6,7,8,9,11,13,15,17,19,21,23,25,33,41,49,57,65,73,89,105,121,137,153,169,193,217,241,265,289,313,337,361,385,409,433,457,481,505,529,553,577,601,625,649,673,697,721,745,769,793,817,841,865,889,913,937,], 
		["Damage max",4,5,6,7,8,9,10,11,13,15,17,19,21,23,25,27,35,43,51,59,67,75,91,107,123,139,155,171,195,219,243,267,291,315,339,363,387,411,435,459,483,507,531,555,579,603,627,651,675,699,723,747,771,795,819,843,867,891,915,939,], 
		["Stun Length",4.6,4.6,4.6,4.6,4.6,4.6,5.3,5.3,5.3,5.3,5.3,5.3,5.3,6,6,6,6,6,6,6,6.6,6.6,6.6,6.6,6.6,6.6,6.6,7.3,7.3,7.3,7.3,7.3,7.3,7.3,8,8,8,8,8,8,8,8.6,8.6,8.6,8.6,8.6,8.6,8.6,9.3,9.3,9.3,9.3,9.3,9.3,9.3,10,10,10,10,10,], 
		["Mana Cost",2,2.2,2.5,2.7,3,3.2,3.5,3.7,4,4.2,4.5,4.7,5,5.2,5.5,5.7,6,6.2,6.5,6.7,7,7.2,7.5,7.7,8,8.2,8.5,8.7,9,9.2,9.5,9.7,10,10.2,10.5,10.7,11,11.2,11.5,11.7,12,12.2,12.5,12.7,13,13.2,13.5,13.7,14,14.2,14.5,14.7,15,15.2,15.5,15.7,16,16.2,16.5,16.7,], 
]};
/*[ 9] Battle Command	*/ var d162 = {values:[
		["Duration",], 
]};

/*[10] Sword Mastery	*/ var d211 = {values:[
		["Damage +%",28,33,38,43,48,53,58,63,68,73,78,83,88,93,98,103,108,113,118,123,128,133,138,143,148,153,158,163,168,173,178,183,188,193,198,203,208,213,218,223,228,233,238,243,248,253,258,263,268,273,278,283,288,293,298,303,308,313,318,323,], 
		["Attack +%",28,44,60,76,92,108,124,140,156,172,188,204,220,236,252,268,284,300,316,332,348,364,380,396,412,428,444,460,476,492,508,524,540,556,572,588,604,620,636,652,668,684,700,716,732,748,764,780,796,812,828,844,860,876,892,908,924,940,956,972,], 
		["Chance of Critical Strike %",5,9,12,15,17,19,20,21,23,23,24,25,26,26,27,28,28,28,29,29,29,30,30,30,30,31,31,31,31,31,32,32,33,32,32,32,32,33,33,33,33,33,33,33,33,33,33,33,34,34,34,34,34,34,34,34,34,34,34,35,], 
]};
/*[11] Axe Mastery		*/ var d212 = {values:[
		["Damage +%",28,33,38,43,48,53,58,63,68,73,78,83,88,93,98,103,108,113,118,123,128,133,138,143,148,153,158,163,168,173,178,183,188,193,198,203,208,213,218,223,228,233,238,243,248,253,258,263,268,273,278,283,288,293,298,303,308,313,318,323,], 
		["Attack +%",28,44,60,76,92,108,124,140,156,172,188,204,220,236,252,268,284,300,316,332,348,364,380,396,412,428,444,460,476,492,508,524,540,556,572,588,604,620,636,652,668,684,700,716,732,748,764,780,796,812,828,844,860,876,892,908,924,940,956,972,], 
		["Chance of Critical Strike %",5,9,12,15,17,19,20,21,23,23,24,25,26,26,27,28,28,28,29,29,29,30,30,30,30,31,31,31,31,31,32,32,33,32,32,32,32,33,33,33,33,33,33,33,33,33,33,33,34,34,34,34,34,34,34,34,34,34,34,35,], 
]};
/*[12] Mace Mastery		*/ var d213 = {values:[
		["Damage +%",28,33,38,43,48,53,58,63,68,73,78,83,88,93,98,103,108,113,118,123,128,133,138,143,148,153,158,163,168,173,178,183,188,193,198,203,208,213,218,223,228,233,238,243,248,253,258,263,268,273,278,283,288,293,298,303,308,313,318,323,], 
		["Attack +%",28,44,60,76,92,108,124,140,156,172,188,204,220,236,252,268,284,300,316,332,348,364,380,396,412,428,444,460,476,492,508,524,540,556,572,588,604,620,636,652,668,684,700,716,732,748,764,780,796,812,828,844,860,876,892,908,924,940,956,972,], 
		["Chance of Critical Strike %",5,9,12,15,17,19,20,21,23,23,24,25,26,26,27,28,28,28,29,29,29,30,30,30,30,31,31,31,31,31,32,32,33,32,32,32,32,33,33,33,33,33,33,33,33,33,33,33,34,34,34,34,34,34,34,34,34,34,34,35,], 
]};
/*[13] Polearm Mastery	*/ var d221 = {values:[
		["Damage +%",28,33,38,43,48,53,58,63,68,73,78,83,88,93,98,103,108,113,118,123,128,133,138,143,148,153,158,163,168,173,178,183,188,193,198,203,208,213,218,223,228,233,238,243,248,253,258,263,268,273,278,283,288,293,298,303,308,313,318,323,], 
		["Attack +%",30,46,62,78,94,110,126,142,158,174,190,206,222,238,254,270,286,302,318,334,350,366,382,398,414,430,446,462,478,494,510,526,542,558,574,590,606,622,638,654,670,686,702,718,734,750,766,782,798,814,830,846,862,878,894,910,926,942,958,974,], 
		["Chance of Critical Strike %",5,9,12,15,17,19,20,21,23,23,24,25,26,26,27,28,28,28,29,29,29,30,30,30,30,31,31,31,31,31,32,32,32,32,32,32,32,33,33,33,33,33,33,33,33,33,33,33,34,34,34,34,34,34,34,34,34,34,34,35,], 
]};
/*[14] Throwing Mastery	*/ var d222 = {values:[
		["Damage +%",28,33,38,43,48,53,58,63,68,73,78,83,88,93,98,103,108,113,118,123,128,133,138,143,148,153,158,163,168,173,178,183,188,193,198,203,208,213,218,223,228,233,238,243,248,253,258,263,268,273,278,283,288,293,298,303,308,313,318,323,], 
		["Attack +%",30,46,62,78,94,110,126,142,158,174,190,206,222,238,254,270,286,302,318,334,350,366,382,398,414,430,446,462,478,494,510,526,542,558,574,590,606,622,638,654,670,686,702,718,734,750,766,782,798,814,830,846,862,878,894,910,926,942,958,974,], 
		["Chance of Critical Strike %",5,9,12,15,17,19,20,21,23,23,24,25,26,26,27,28,28,28,29,29,29,30,30,30,30,31,31,31,31,31,32,32,32,32,32,32,32,33,33,33,33,33,33,33,33,33,33,33,34,34,34,34,34,34,34,34,34,34,34,35,], 
]};
/*[15] Spear Mastery	*/ var d223 = {values:[
		["Damage +%",28,33,38,43,48,53,58,63,68,73,78,83,88,93,98,103,108,113,118,123,128,133,138,143,148,153,158,163,168,173,178,183,188,193,198,203,208,213,218,223,228,233,238,243,248,253,258,263,268,273,278,283,288,293,298,303,308,313,318,323,], 
		["Attack +%",30,46,62,78,94,110,126,142,158,174,190,206,222,238,254,270,286,302,318,334,350,366,382,398,414,430,446,462,478,494,510,526,542,558,574,590,606,622,638,654,670,686,702,718,734,750,766,782,798,814,830,846,862,878,894,910,926,942,958,974,], 
		["Chance of Critical Strike %",5,9,12,15,17,19,20,21,23,23,24,25,26,26,27,28,28,28,29,29,29,30,30,30,30,31,31,31,31,31,32,32,32,32,32,32,32,33,33,33,33,33,33,33,33,33,33,33,34,34,34,34,34,34,34,34,34,34,34,35,], 
]};
/*[16] Increased Stamina*/ var d231 = {values:[
		["Stamina Bonus +%",30,45,60,75,90,105,120,135,150,165,180,195,210,225,240,255,270,285,300,315,330,345,360,375,390,405,420,435,450,465,480,495,510,525,540,555,570,585,600,615,630,645,660,675,690,705,720,735,750,765,780,795,810,825,840,855,870,885,900,915,], 
]};
/*[17] Iron Skin		*/ var d243 = {values:[
		["Defense +%",30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,620,], 
]};
/*[18] Increased Speed	*/ var d251 = {values:[
		["Walk/Run Speed +%",13,18,22,25,28,30,32,33,35,36,37,38,39,40,40,41,41,42,42,43,43,43,44,44,44,45,45,45,46,46,46,46,46,46,46,47,47,47,47,47,47,48,48,48,48,48,48,48,49,49,49,49,49,49,49,49,49,49,49,50,], 
]};
/*[19]Natural Resistance*/ var d263 = {values:[
		["Resistances +%",12,21,28,35,40,44,47,49,52,54,56,58,60,61,62,64,64,65,66,67,68,68,69,70,70,71,72,72,72,72,73,73,74,74,74,75,75,76,76,76,76,76,76,76,77,77,77,77,78,78,78,78,78,79,79,79,79,79,79,80,], 
]};

/*[20] Bash				*/ var d312 = {values:[
		["Attack %",35,55,75,95,115,135,155,175,195,215,235,255,275,295,315,335,355,375,395,415,435,455,475,495,515,535,555,575,595,615,635,655,675,695,715,735,755,775,795,815,835,855,875,895,915,935,955,975,995,1015,1035,1055,1075,1095,1115,1135,1155,1175,1195,1215,], 
		["Damage %",50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,620,630,640,], 
		["Damage",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,], 
		["Mana Cost",2,2.2,2.5,2.7,3,3.2,3.5,3.7,4,4.2,4.5,4.7,5,5.2,5.5,5.7,6,6.2,6.5,6.7,7,7.2,7.5,7.7,8,8.2,8.5,8.7,9,9.2,9.5,9.7,10,10.2,10.5,10.7,11,11.2,11.5,11.7,12,12.2,12.5,12.7,13,13.2,13.5,13.7,14,14.2,14.5,14.7,15,15.2,15.5,15.7,16,16.2,16.5,16.7,], 
]};
/*[21] Double Swing		*/ var d323 = {values:[
		["Damage",], 
		["Attack %",75,95,115,135,155,175,195,215,235,255,275,295,315,335,355,375,395,415,435,455,475,495,515,535,555,575,595,615,635,655,675,695,715,735,755,775,795,815,835,855,875,895,915,935,955,975,995,1015,1035,1055,1075,1095,1115,1135,1155,1175,1195,1215,1235,1255,], 
		["Mana Cost",4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,30,30,31,31,32,32,33,33,], 
]};
/*[22] Concentrate		*/ var d342 = {values:[
		["Magic Damage %",], 
		["Defense Bonus %",20,24,28,32,36,40,44,48,52,56,60,64,68,72,76,80,84,88,92,96,100,104,108,112,116,120,124,128,132,136,140,144,148,152,156,160,164,168,172,176,180,184,188,192,196,200,204,208,212,216,220,224,228,232,236,240,244,248,252,256,], 
		["Attack %",180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,620,630,640,650,660,670,680,690,700,710,720,730,740,750,760,770,], 
		["Damage %",70,76,82,88,94,100,106,112,118,124,130,136,142,148,154,160,166,172,178,184,190,196,202,208,214,220,226,232,238,244,250,256,262,268,274,280,286,292,298,304,310,316,322,328,334,340,346,352,358,364,370,376,382,388,394,400,406,412,418,424,], 
]};
/*[23] Berserk			*/ var d362 = {values:[
		["Attack %",240,252,264,276,288,300,312,324,336,348,360,372,384,396,408,420,432,444,456,468,480,492,504,516,528,540,552,564,576,588,600,612,624,636,648,660,672,684,696,708,720,732,744,756,768,780,792,804,816,828,840,852,864,876,888,900,912,924,936,948,], 
		["Magic Damage %",150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,620,630,640,650,660,670,680,690,700,710,720,730,740,], 
]};
/*[24] Stun				*/ var d332 = {values:[
		["Damage %",], 
		["Attack %",55,70,85,100,115,130,145,160,175,190,205,220,235,250,265,280,295,310,325,340,355,370,385,400,415,430,445,460,475,490,505,520,535,550,565,580,595,610,625,640,655,670,685,700,715,730,745,760,775,790,805,820,835,850,865,880,895,910,925,940,], 
		["Duration (seconds)",1.6,1.8,2,2.2,2.4,2.6,2.8,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,], 
]};
/*[25] Leap				*/ var d321 = {values:[
		["Radius",8.6,10,11.3,12,13.3,14,14,14.6,15.3,15.3,16,16.6,16.6,16.6,16.6,17.3,17.3,17.3,17.3,17.3,18,18,18,18,18,18,18.6,18.6,18.6,18.6,18.6,18.6,18.6,18.6,18.6,18.6,18.6,19.3,19.3,19.3,19.3,19.3,19.3,19.3,19.3,19.3,19.3,19.3,19.3,19.3,19.3,19.3,19.3,19.3,19.3,19.3,19.3,19.3,19.3,20,], 
]};
/*[26] Double Throw		*/ var d333 = {values:[
		["Damage %",], 
		["Attack %",175,190,205,220,235,250,265,280,295,310,325,340,355,370,385,400,415,430,445,460,475,490,505,520,535,550,565,580,595,610,625,640,655,670,685,700,715,730,745,760,775,790,805,820,835,850,865,880,895,910,925,940,955,970,985,1000,1015,1030,1045,1060,], 
		["Mana Cost",3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,30,30,31,31,32,32,], 
]};
/*[27] Leap Attack		*/ var d341 = {values:[
		["Damage %",10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,], 
		["Attack %",240,245,250,255,260,265,270,275,280,285,290,295,300,305,310,315,320,325,330,335,340,345,350,355,360,365,370,375,380,385,390,395,400,405,410,415,420,425,430,435,440,445,450,455,460,465,470,475,480,485,490,495,500,505,510,515,520,525,530,535,], 
		["Mana Cost",7,7.2,7.5,7.7,8,8.2,8.5,8.7,9,9.2,9.5,9.7,10,10.2,10.5,10.7,11,11.2,11.5,11.7,12,12.2,12.5,12.7,13,13.2,13.5,13.7,14,14.2,14.5,14.7,15,15.2,15.5,15.7,16,16.2,16.5,16.7,17,17.2,17.5,17.7,18,18.2,18.5,18.7,19,19.2,19.5,19.7,20,20.2,20.5,20.7,21,21.2,21.5,21.7,], 
]};
/*[28] Frenzy			*/ var d353 = {values:[
		["Magic Damage %",], 
		["Damage %",15,25,35,45,55,65,75,85,95,105,115,125,135,145,155,165,175,185,195,205,215,225,235,245,255,265,275,285,295,305,315,325,335,345,355,365,375,385,395,405,415,425,435,445,455,465,475,485,495,505,515,525,535,545,555,565,575,585,595,605,], 
		["Attack %",20,38,56,74,92,110,128,146,164,182,200,218,236,254,272,290,308,326,344,362,380,398,416,434,452,470,488,506,524,542,560,578,596,614,632,650,668,686,704,722,740,758,776,794,812,830,848,866,884,902,920,938,956,974,992,1010,1028,1046,1064,1082,], 
		["Attack Speed % min",7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,], 
		["Attack Speed % max",7,13,18,22,25,27,29,31,33,34,35,36,37,38,39,40,40,41,41,42,42,43,43,44,44,44,45,45,45,45,46,46,46,46,46,47,47,47,47,47,47,48,48,48,48,48,48,48,49,49,49,49,49,49,49,49,49,49,49,50,], 
		["Walk/Run Speed % min",27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,], 
		["Walk/Run Speed % max",32,34,36,38,40,42,44,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,], 
]};
/*[29] Whirlwind		*/ var d361 = {values:[
		["Damage %",50,56,62,68,74,80,86,92,98,104,110,116,122,128,134,140,146,152,158,164,170,176,182,188,194,200,206,212,218,224,230,236,242,248,254,260,266,272,278,284,290,296,302,308,314,320,326,332,338,344,350,356,362,368,374,380,386,392,398,404,], 
		["Attack %",240,245,250,255,260,265,270,275,280,285,290,295,300,305,310,315,320,325,330,335,340,345,350,355,360,365,370,375,380,385,390,395,400,405,410,415,420,425,430,435,440,445,450,455,460,465,470,475,480,485,490,495,500,505,510,515,520,525,530,535,], 
		["Mana Cost",12.5,13,13.5,14,14.5,15,15.5,16,16.5,17,17.5,18,18.5,19,19.5,20,20.5,21,21.5,22,22.5,23,23.5,24,24.5,25,25,26,26,27,27,28,28,29,29,30,30,31,31,32,32,33,33,34,34,35,35,36,36,37,37,38,38,39,39,40,40,41,41,42,], 
]};

var skills_barbarian_vanilla = [
{data:d111, key:"111", code:128, name:"Howl", i:0, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, bindable:1, description:"Sends nearby monsters<br>scrambling away in fear", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Enemy runs up to "," yards<br>Enemy runs for "," seconds<br>Mana Cost: 4",""]},
{data:d113, key:"113", code:129, name:"Find Potion", i:1, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, bindable:1, description:"Use on the corpse of a slain monster<br>for a chance to find a potion", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:[""," percent chance<br>Mana Cost: 1",""]},
{data:d121, key:"121", code:130, name:"Taunt", i:2, req:[0], reqlvl:6, level:0, extra_levels:0, force_levels:0, bindable:1, description:"Enrages a monster into relentlessly attacking", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Target's Damage: "," percent<br>Target's Attack: "," percent<br>Mana Cost: 3",""]},
{data:d122, key:"122", code:131, name:"Shout", i:3, req:[0], reqlvl:6, level:0, extra_levels:0, force_levels:0, effect:0, bindable:1, description:"Warns of impending danger and improves the defense<br>rating of you and your party", syn_title:"<br>Shout Receives Bonuses From:<br>", syn_text:"Battle Orders: +5 Seconds per Level<br>Battle Command: +5 Seconds per Level", graytext:"", index:[0,""], text:["Defense: +"," percent<br>Duration: "," seconds<br>Mana Cost: 6",""]},
{data:d133, key:"133", code:132, name:"Find Item", i:4, req:[1], reqlvl:12, level:0, extra_levels:0, force_levels:0, bindable:1, description:"Use on the corpse of a slain monster<br>to find hidden treasures", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:[""," percent chance<br>Mana Cost: 7",""]},
{data:d141, key:"141", code:133, name:"Battle Cry", i:5, req:[2,0], reqlvl:18, level:0, extra_levels:0, force_levels:0, bindable:1, description:"Fearsome cry that decreases<br>enemies' defense rating and damage", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Duration: "," seconds<br>Defense: "," percent<br>Damage: "," percent<br>Mana Cost: 5",""]},
{data:d152, key:"152", code:134, name:"Battle Orders", i:6, req:[3,0], reqlvl:24, level:0, extra_levels:0, force_levels:0, effect:0, bindable:1, description:"Improves the maximum mana, life and<br>stamina of you and your party", syn_title:"<br>Battle Orders Receives Bonuses From:<br>", syn_text:"Shout: +5 Seconds per Level<br>Battle Command: +5 Seconds per Level", graytext:"", index:[0,""], text:["Duration: "," seconds<br>Max Stamina: "," percent<br>Max Life: "," percent<br>Max Mana: "," percent<br>Mana Cost: 7",""]},
{data:d153, key:"153", code:135, name:"Grim Ward", i:7, req:[4,1], reqlvl:24, level:0, extra_levels:0, force_levels:0, bindable:1, description:"Use on the corpse of a slain monster<br>to create a frightening totem<br>that causes nearby enemies to flee", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Duration: 40 seconds<br>Radius: "," yards<br>Mana Cost: 4",""]},
{data:d161, key:"161", code:136, name:"War Cry", i:8, req:[6,5,3,2,0], reqlvl:30, level:0, extra_levels:0, force_levels:0, bindable:2, damaging:{attack:0,spell:1}, description:"Injures and stuns all nearby enemies", syn_title:"<br>War Cry Receives Bonuses From:<br>", syn_text:"Howl: +6% Damage per Level<br>Taunt: +6% Damage per Level<br>Battle Cry: +6% Damage per Level", graytext:"", index:[0,""], text:["Damage: ","-","<br>Stun Length: "," seconds<br>Mana Cost: ",""]},
{data:d162, key:"162", code:137, name:"Battle Command", i:9, req:[6,3,0], reqlvl:30, level:0, extra_levels:0, force_levels:0, effect:0, bindable:1, description:"Increases all current skill levels for you and your party", syn_title:"<br>Battle Command Receives Bonuses From:<br>", syn_text:"Shout: +5 Seconds per Level<br>Battle Orders: +5 Seconds per Level", graytext:"", index:[0,""], text:["Duration: "," seconds<br>Mana Cost: 11",""]},

{data:d211, key:"211", code:138, name:"Sword Mastery", i:10, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, effect:0, bindable:0, description:"Passive - Improves sword, axe and mace fighting skill", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Damage: +"," percent<br>Attack: +"," percent<br>"," percent chance of Critical Strike",""]},
{data:d212, key:"212", code:139, name:"Axe Mastery", i:11, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, effect:0, bindable:0, description:"Passive - Improves pole arm and spear skill", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Damage: +"," percent<br>Attack: +"," percent<br>"," percent chance of Critical Strike",""]},
{data:d213, key:"213", code:140, name:"Mace Mastery", i:12, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, effect:0, bindable:0, description:"Passive - Improves sword, axe and mace fighting skill", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Damage: +"," percent<br>Attack: +"," percent<br>"," percent chance of Critical Strike",""]},
{data:d221, key:"221", code:141, name:"Polearm Mastery", i:13, req:[], reqlvl:6, level:0, extra_levels:0, force_levels:0, effect:0, bindable:0, description:"Passive - Improves sword, axe and mace fighting skill", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Damage: +"," percent<br>Attack: +"," percent<br>"," percent chance of Critical Strike",""]},
{data:d222, key:"222", code:157, name:"Throwing Mastery", i:14, req:[], reqlvl:6, level:0, extra_levels:0, force_levels:0, effect:0, bindable:0, description:"Passive - Improves thrown weapon skill", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Damage: +"," percent<br>Attack: +"," percent<br>"," percent chance of Critical Strike",""]},
{data:d223, key:"223", code:158, name:"Spear Mastery", i:15, req:[], reqlvl:6, level:0, extra_levels:0, force_levels:0, effect:0, bindable:0, description:"Passive - Improves sword, axe and mace fighting skill", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Damage: +"," percent<br>Attack: +"," percent<br>"," percent chance of Critical Strike",""]},
{data:d231, key:"231", code:142, name:"Increased Stamina", i:16, req:[], reqlvl:12, level:0, extra_levels:0, force_levels:0, effect:0, bindable:0, description:"Passive - Increases your stamina", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Stamina Bonus: +"," percent"]},
{data:d243, key:"243", code:143, name:"Iron Skin", i:17, req:[], reqlvl:18, level:0, extra_levels:0, force_levels:0, effect:0, bindable:0, description:"Passive - Improves defense rating", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["+"," percent"]},
{data:d251, key:"251", code:144, name:"Increased Speed", i:18, req:[16], reqlvl:24, level:0, extra_levels:0, force_levels:0, effect:0, bindable:0, description:"Passive - Increases walk and run speed", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Walk/Run Speed: +"," percent",""]},
{data:d263, key:"263", code:145, name:"Natural Resistance", i:19, req:[17], reqlvl:30, level:0, extra_levels:0, force_levels:0, effect:0, bindable:0, description:"Passive - Increases natural resistances<br>to elemental and poison damage", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Resistances: +"," percent",""]},

{data:d312, key:"312", code:152, name:"Bash", i:20, req:[], reqlvl:1, reqWeapon:["axe","mace","club","hammer","sword","dagger","thrown","javelin","scepter","wand","staff","spear","polearm"], level:0, extra_levels:0, force_levels:0, bindable:2, damaging:{attack:1,spell:0}, description:"Powerful blow that increases the damage done<br>to enemies and knocks them back", syn_title:"<br>Bash Receives Bonuses From:<br>", syn_text:"Stun: +10% Damage per Level<br>Concentrate: +10% Attack Rating per Level", graytext:"", index:[0,""], text:["Attack: +"," percent<br>Damage: +"," percent<br>Damage: +","<br>Mana Cost: ",""]},
{data:d323, key:"323", code:156, name:"Double Swing", i:21, req:[20], reqlvl:6, reqWeapon:["axe","mace","club","hammer","sword","dagger","thrown","javelin","scepter","wand"], level:0, extra_levels:0, force_levels:0, bindable:2, damaging:{attack:1,spell:0}, description:"When two weapon are equipped<br>attacks two targets if possible,<br>or one target twice", syn_title:"<br>Double Swing Receives Bonuses From:<br>", syn_text:"Bash: +10% Damage per Level", graytext:"", index:[1," percent"], text:["Damage: +","Attack: +"," percent<br>Mana Cost: ",""]},
{data:d342, key:"342", code:147, name:"Concentrate", i:22, req:[24,20], reqlvl:18, reqWeapon:["axe","mace","club","hammer","sword","dagger","thrown","javelin","scepter","wand","staff","spear","polearm"], level:0, extra_levels:0, force_levels:0, bindable:2, damaging:{attack:1,spell:0}, description:"Attack that is not interruptible and<br>improves attack and defense rating", syn_title:"<br>Concentrate Receives Bonuses From:<br>", syn_text:"Bash: +5% Damage per Level<br>Battle Orders: +10% Damage per Level<br>Berserk: +1% Magic Damage per Level", graytext:"", index:[1," percent"], text:["Magic Damage: +","Defense Bonus: +"," percent<br>Attack: +"," percent<br>Damage: +"," percent<br>Mana Cost: 2",""]},
{data:d362, key:"362", code:148, name:"Berserk", i:23, req:[24,22,20], reqlvl:30, reqWeapon:["axe","mace","club","hammer","sword","dagger","thrown","javelin","scepter","wand","staff","spear","polearm"], level:0, extra_levels:0, force_levels:0, bindable:2, damaging:{attack:1,spell:1}, description:"A powerful but reckless attack that<br>increases damage and attack rating<br>but decreases defense rating", syn_title:"<br>Berserk Receives Bonuses From:<br>", syn_text:"Howl: +10% Damage per Level<br>Shout: +10% Damage per Level", graytext:"", index:[0,""], text:["Attack: +"," percent<br>Magic Damage: +"," percent<br>Duration: 1.4 seconds<br>Mana Cost: 4"]},
{data:d332, key:"332", code:149, name:"Stun", i:24, req:[20], reqlvl:12, reqWeapon:["axe","mace","club","hammer","sword","dagger","thrown","javelin","scepter","wand","staff","spear","polearm"], level:0, extra_levels:0, force_levels:0, bindable:2, damaging:{attack:1,spell:0}, description:"Stuns your target for a short time<br>and increases your attack rating", syn_title:"<br>Stun Receives Bonuses From:<br>", syn_text:"Bash: +8% Damage per Level<br>Concentrate: +5% Attack Rating per Level<br>War Cry +5% Duration per Level", graytext:"", index:[1," percent"], text:["Damage: +","Attack: +"," percent<br>Duration: "," seconds<br>Mana Cost: 2",""]},
{data:d321, key:"321", code:150, name:"Leap", i:25, req:[], reqlvl:6, level:0, extra_levels:0, force_levels:0, bindable:2, description:"Leaps away from danger<br>or into the fray", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Radius: "," yards<br>Mana Cost: 8"]},
{data:d333, key:"333", code:151, name:"Double Throw", i:26, req:[21,20], reqlvl:18, reqWeapon:["thrown","javelin"], level:0, extra_levels:0, force_levels:0, effect:0, bindable:2, damaging:{attack:2,spell:0}, description:"Allows you to throw two different<br>throwing weapons at the same time", syn_title:"<br>Double Throw Receives Bonuses From:<br>", syn_text:"Double Swing: +8% Damage per Level", graytext:"", index:[1," percent"], text:["Damage: +","To Attack Rating: +"," percent<br>Mana Cost: ",""]},
{data:d341, key:"341", code:153, name:"Leap Attack", i:27, req:[25], reqlvl:18, reqWeapon:["axe","mace","club","hammer","sword","dagger","thrown","javelin","scepter","wand","staff","spear","polearm"], level:0, extra_levels:0, force_levels:0, bindable:1, damaging:{attack:1,spell:0}, description:"Leaps to and attacks target enemy<br>in one swift assault", syn_title:"<br>Leap Attack Receives Bonuses From:<br>", syn_text:"Leap: +10% Damage per Level", graytext:"", index:[0,""], text:["Damage: +"," percent<br>Attack: +"," percent<br>Mana Cost: ",""]},
{data:d353, key:"353", code:146, name:"Frenzy", i:28, req:[26,21,20], reqlvl:24, reqWeapon:["axe","mace","club","hammer","sword","dagger","thrown","javelin","scepter","wand"], level:0, extra_levels:0, force_levels:0, effect:0, bindable:2, damaging:{attack:1,spell:0}, description:"Allows you to swing two weapons at once<br>East successful attack increases your overall speed<br>Requires you to equip two weapons", syn_title:"<br>Frenzy Receives Bonuses From:<br>", syn_text:"Double Swing: +8% Damage per Level<br>Taunt: +8% Damage per Level<br>Berserk: +1% Magic Damage per Level", graytext:"", index:[1," percent<br>Duration: 6 seconds"], text:["Magic Damage: +","Damage: +"," percent<br>Attack: +"," percent<br>Attack Speed: +","-"," percent<br>Walk/Run Speed: +","-"," percent<br>Mana Cost: 3"]},
{data:d361, key:"361", code:155, name:"Whirlwind", i:29, req:[27,25,22,24,20], reqlvl:30, reqWeapon:["axe","mace","club","hammer","sword","dagger","thrown","javelin","scepter","wand","staff","spear","polearm"], level:0, extra_levels:0, force_levels:0, bindable:2, damaging:{attack:1,spell:0}, description:"A whirling dance of death<br>that cuts a path through the<br>legions of your enemies", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Damage: "," percent<br>Attack: +"," percent<br>Mana Cost: ",""]},
];
