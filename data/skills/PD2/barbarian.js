
var character_pd2_barbarian = {class_name:"Barbarian", strength:30, dexterity:20, vitality:25, energy:10, life:55, mana:10, stamina:192, levelup_life:2, levelup_stamina:1, levelup_mana:1, ar_per_dexterity:5, life_per_vitality:4, stamina_per_vitality:1, mana_per_energy:1, starting_strength:30, starting_dexterity:20, starting_vitality:25, starting_energy:10, ar_const:20, block_const:4, skill_layout:"./images/skill_trees/PD2/barbarian.png", mana_regen:1.66,
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
		
		if (skill.name == "War Cry" && elem < 2) { 			result *= (1 + 0.18*skills[0].level + 0.18*skills[5].level + 0.12*skills[2].level + 0.12*skills[3].level + 0.12*skills[6].level + 0.12*skills[9].level) }
		if (skill.name == "Battle Command" && elem == 0) { 	result = 1+Math.floor(skill.level/10) }
		if (skill.name == "Find Item" && elem == 0) { 		result += (1*skills[1].level) }
		if (skill.name == "Taunt" && elem == 0) {			result = 2 + Math.floor(0.25*skill.level) }
		
		if (skill.name == "Iron Skin" && elem == 0) {		result = Math.floor(skill.level/2) }
		if (skill.name == "Increased Speed" && elem == 0) {	result = Math.floor(2*skill.level) }
		if (skill.name == "Combat Reflexes" && elem == 0) {	result = Math.floor(2*skill.level) }
		
		if (skill.name == "Bash" && elem == 0) { 			result += (10*skills[19].level) }
		if (skill.name == "Bash" && elem == 1) { 			result += (12*skills[21].level + 12*skills[19].level) }
		if (skill.name == "Frenzy" && elem == 0) { 			result += (14*skills[28].level + 14*skills[21].level) }
		if (skill.name == "Stun" && elem == 0) { 			result = 8*skills[24].level }
		if (skill.name == "Stun" && elem == 1) { 			result += (5*skills[19].level) }
		if (skill.name == "Stun" && elem == 2) { 			result *= (1 + 0.05*skills[8].level) }
		if (skill.name == "Double Swing" && elem == 0) { 	result += (16*skills[18].level + 16*skills[21].level) }
		if (skill.name == "Leap" && elem == 0) { 			result = skill.data.values[elem][Math.max(1,skill.level)] }
		if (skill.name == "Concentrate" && elem == 0) { 	result = 30 + skill.level*2 + 2*skills[24].level }
		if (skill.name == "Concentrate" && elem == 3) { 	result += (12*skills[24].level + 12*skills[9].level) }
		if (skill.name == "Double Throw" && elem == 0) { 	result += (6*skills[28].level) }
		if (skill.name == "Leap Attack" && elem == 0) { 	result += (8*skills[22].level + 8*skills[24].level) }
		if (skill.name == "Berserk" && elem == 1) { 		result += (10*skills[2].level + 10*skills[14].level) }
		
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
		} else if (s > 17) {
			skills[s].extra_levels += character.skills_combat_barbarian
			skills[s].extra_levels += character.skills_tree3
		} else {
			skills[s].extra_levels += character.skills_masteries
			skills[s].extra_levels += character.skills_tree2
		}
	}
};

/*[ 0] Howl				*/ var d111 = {values:[
		["Enemy Runs Up to # Yards",16,17.6,19.3,21,22.6,24.3,26,27.6,29.3,31,32.6,34.3,36,37.6,39.3,41,42.6,44.3,46,47.6,49.3,51,52.6,54.3,56,57.6,59.3,61,62.6,64.3,66,67.6,69.3,71,72.6,74.3,76,77.6,79.3,81,82.6,84.3,86,87.6,89.3,91,92.6,94.3,96,97.6,99.3,101,102.6,104.3,106,107.6,109.3,111,112.6,114.3,], 
]};
/*[ 1] Find Potion		*/ var d113 = {values:[
		["% Chance",15,27,36,44,50,55,59,62,66,68,71,73,75,77,78,80,81,82,83,84,85,86,87,88,88,89,90,90,91,91,92,92,93,93,93,94,94,95,95,95,95,96,96,96,97,97,97,97,98,98,98,98,98,99,99,99,99,99,99,100,], 
]};
/*[ 2] Taunt			*/ var d142 = {values:[
		["Duration (seconds)",], 
		["Target's Damage %",-5,-7,-9,-11,-13,-15,-17,-19,-21,-23,-25,-27,-29,-31,-33,-35,-37,-39,-41,-43,-45,-47,-49,-51,-53,-55,-57,-59,-61,-63,-65,-67,-69,-71,-73,-75,-77,-79,-81,-83,-85,-87,-89,-91,-93,-95,-97,-99,-101,-103,-105,-107,-109,-111,-113,-115,-117,-119,-121,-123,], 
		["Target's Attack %",-5,-7,-9,-11,-13,-15,-17,-19,-21,-23,-25,-27,-29,-31,-33,-35,-37,-39,-41,-43,-45,-47,-49,-51,-53,-55,-57,-59,-61,-63,-65,-67,-69,-71,-73,-75,-77,-79,-81,-83,-85,-87,-89,-91,-93,-95,-97,-99,-101,-103,-105,-107,-109,-111,-113,-115,-117,-119,-121,-123,], 
]};
/*[ 3] Shout			*/ var d121 = {values:[
		["Defense +%",25,35,45,55,65,75,85,95,105,115,125,135,145,155,165,175,185,195,205,215,225,235,245,255,265,275,285,295,305,315,325,335,345,355,365,375,385,395,405,415,425,435,445,455,465,475,485,495,505,515,525,535,545,555,565,575,585,595,605,615,], 
]};
/*[ 4] Find Item		*/ var d133 = {values:[
		["% Chance",7,13,18,22,25,27,29,31,33,34,35,36,37,38,39,40,40,41,41,42,42,43,43,44,44,44,45,45,45,45,46,46,46,46,46,47,47,47,47,47,47,48,48,48,48,48,48,48,48,49,49,49,49,49,49,49,49,49,49,50,], 
]};
/*[ 5] Battle Cry		*/ var d162 = {values:[
		["Duration (seconds)",5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,], 
		["Defense %",-15,-16,-17,-18,-19,-20,-21,-22,-23,-24,-25,-26,-27,-28,-29,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,], 
		["Physical Damage Resistance %",-5,-6,-7,-8,-9,-10,-11,-12,-13,-14,-15,-16,-17,-18,-19,-20,-21,-22,-23,-24,-25,-26,-26,-27,-27,-28,-28,-29,-29,-30,-30,-31,-31,-32,-32,-33,-33,-34,-34,-35,-35,-36,-36,-37,-37,-38,-38,-39,-39,-40,-40,-41,-41,-42,-42,-43,-43,-44,-44,-45,], 
]};
/*[ 6] Battle Orders	*/ var d151 = {values:[
		["Max Life",50,65,80,95,110,125,140,155,170,185,200,215,230,245,260,275,290,305,320,335,350,365,380,395,410,425,440,455,470,485,500,515,530,545,560,575,590,605,620,635,650,665,680,695,710,725,740,755,770,785,800,815,830,845,860,875,890,905,920,935,], 
		["Max Mana",25,32,40,47,55,62,70,77,85,92,100,107,115,122,130,137,145,152,160,167,175,182,190,197,205,212,220,227,235,242,250,257,265,272,280,287,295,302,310,317,325,332,340,347,355,362,370,377,385,392,400,407,415,422,430,437,445,452,460,467,], 
]};
/*[ 7] Grim Ward		*/ var d153 = {values:[
		["Attack Rating",130,150,170,190,210,230,250,270,290,310,330,350,370,390,410,430,450,470,490,510,530,550,570,590,610,630,650,670,690,710,730,750,770,790,810,830,850,870,890,910,930,950,970,990,1010,1030,1050,1070,1090,1110,1130,1150,1170,1190,1210,1230,1250,1270,1290,1310,], 
		["Damage +%",40,48,56,64,72,80,88,96,104,112,120,128,136,144,152,160,168,176,184,192,200,208,216,224,232,240,248,256,264,272,280,288,296,304,312,320,328,336,344,352,360,368,376,384,392,400,408,416,424,432,440,448,456,464,472,480,488,496,504,512,], 
		["Radius (yards)",10.6,11.3,12,12.6,13.3,14,14.6,15.3,16,16.6,17.3,18,18.6,19.3,20,20.6,21.3,22,22.6,23.3,24,24.6,25.3,26,26.6,27.3,28,28.6,29.3,30,30.6,31.3,32,32.6,33.3,34,34.6,35.3,36,36.6,37.3,38,38.6,39.3,40,40.6,41.3,42,42.6,43.3,44,44.6,45.3,46,46.6,47.3,48,48.6,49.3,50,], 
]};
/*[ 8] War Cry			*/ var d122 = {values:[
		["Damage (min)",2,3,4,5,6,7,8,9,12,15,18,21,24,27,30,33,43,53,63,73,83,93,110,127,144,161,178,195,219,243,267,291,315,339,363,387,411,435,459,483,507,531,555,579,603,627,651,675,699,723,747,771,795,819,843,867,891,915,939,963,], 
		["Damage (max)",4,5,6,7,8,9,10,11,14,17,20,23,26,29,32,35,45,55,65,75,85,95,112,129,146,163,180,197,221,245,269,293,317,341,365,389,413,437,461,485,509,533,557,581,605,629,653,677,701,725,749,773,797,821,845,869,893,917,941,965,], 
		["Radius (yards)",4.6,4.6,4.6,4.6,4.6,4.6,5.3,5.3,5.3,5.3,5.3,5.3,5.3,6,6,6,6,6,6,6,6.6,6.6,6.6,6.6,6.6,6.6,6.6,7.3,7.3,7.3,7.3,7.3,7.3,7.3,8,8,8,8,8,8,8,8.6,8.6,8.6,8.6,8.6,8.6,8.6,9.3,9.3,9.3,9.3,9.3,9.3,9.3,10,10,10,10,10,], 
		["Mana Cost",2,2.2,2.5,2.7,3,3.2,3.5,3.7,4,4.2,4.5,4.7,5,5.2,5.5,5.7,6,6.2,6.5,6.7,7,7.2,7.5,7.7,8,8.2,8.5,8.7,9,9.2,9.5,9.7,10,10.2,10.5,10.7,11,11.2,11.5,11.7,12,12.2,12.5,12.7,13,13.2,13.5,13.7,14,14.2,14.5,14.7,15,15.2,15.5,15.7,16,16.2,16.5,16.7,], 
]};
/*[ 9] Battle Command	*/ var d161 = {values:[
		["Bonus Skills",], 
		["Damage +%",20,23,26,29,32,35,38,41,44,47,50,53,56,59,62,65,68,71,74,77,80,83,86,89,92,95,98,101,104,107,110,113,116,119,122,125,128,131,134,137,140,143,146,149,152,155,158,161,164,167,170,173,176,179,182,185,188,191,194,197,], 
]};

/*[10] General Mastery	*/ var d211 = {values:[
		["Damage +%",30,38,46,54,62,70,78,86,94,102,110,118,126,134,142,150,158,166,174,182,190,198,206,214,222,230,238,246,254,262,270,278,286,294,302,310,318,326,334,342,350,358,366,374,382,390,398,406,414,422,430,438,446,454,462,470,478,486,494,502,], 
		["Attack +%",28,38,48,58,68,78,88,98,108,118,128,138,148,158,168,178,188,198,208,218,228,238,248,258,268,278,288,298,308,318,328,338,348,358,368,378,388,398,408,418,428,438,448,458,468,478,488,498,508,518,528,538,548,558,568,578,588,598,608,618,], 
		["Chance of Critical Strike %",5,9,12,15,17,19,20,21,23,23,24,25,26,26,27,28,28,28,29,29,29,30,30,30,30,31,31,31,31,31,32,32,33,32,32,32,32,33,33,33,33,33,33,33,33,33,33,33,34,34,34,34,34,34,34,34,34,34,34,35,], 
]};
/*[11]Pole/Spear Mastery*/ var d222 = {values:[
		["Damage +%",30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,620,], 
		["Attack +%",30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,620,], 
		["Chance of Critical Strike %",5,9,12,15,17,19,20,21,23,23,24,25,26,26,27,28,28,28,29,29,29,30,30,30,30,31,31,31,31,31,32,32,32,32,32,32,32,33,33,33,33,33,33,33,33,33,33,33,34,34,34,34,34,34,34,34,34,34,34,35,], 
]};
/*[12]*/
/*[13] Throwing Mastery	*/ var d213 = {values:[
		["Pierce %",15,17,19,21,23,25,27,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,], 
		["Damage +%",30,34,38,42,46,50,54,58,62,66,70,74,78,82,86,90,94,98,102,106,110,114,118,122,126,130,134,138,142,146,150,154,158,162,166,170,174,178,182,186,190,194,198,202,206,210,214,218,222,226,230,234,238,242,246,250,254,258,262,266,], 
		["Attack +%",30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,620,], 
		["Chance of Critical Strike %",5,9,12,15,17,19,20,21,23,23,24,25,26,26,27,28,28,28,29,29,29,30,30,30,30,31,31,31,31,31,32,32,32,32,32,32,32,33,33,33,33,33,33,33,33,33,33,33,34,34,34,34,34,34,34,34,34,34,34,34,], 
]};
/*[14] Combat Reflexes	*/ var d231 = {values:[
		["Faster Hit Recovery %",], 
		["Max Life",30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,620,], 
		["Stamina Bonus +%",30,45,60,75,90,105,120,135,150,165,180,195,210,225,240,255,270,285,300,315,330,345,360,375,390,405,420,435,450,465,480,495,510,525,540,555,570,585,600,615,630,645,660,675,690,705,720,735,750,765,780,795,810,825,840,855,870,885,900,915,], 
]};
/*[15] Iron Skin		*/ var d243 = {values:[
		["Physical Damage Reduction +%",], 
		["Defense +%",30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,620,], 
]};
/*[16] Increased Speed	*/ var d251 = {values:[
		["Increased Attack Speed",], 
		["Walk/Run Speed +%",13,18,22,25,28,30,32,33,35,36,37,38,39,40,40,41,41,42,42,43,43,43,44,44,44,45,45,45,46,46,46,46,46,46,46,47,47,47,47,47,47,48,48,48,48,48,48,48,49,49,49,49,49,49,49,49,49,49,49,50,], 
]};
/*[17]Natural Resistance*/ var d263 = {values:[
		["Resistances +%",11,20,27,33,37,41,44,46,49,51,53,54,56,57,58,60,60,61,62,63,63,64,65,66,66,66,66,67,67,67,67,68,68,68,68,69,69,69,69,70,70,70,70,71,71,71,71,72,72,72,72,73,73,73,73,74,74,74,74,75,], 
]};

/*[18] Frenzy			*/ var d312 = {values:[
		["Damage %",20,38,56,74,92,110,128,146,164,182,200,218,236,254,272,290,308,326,344,362,380,398,416,434,452,470,488,506,524,542,560,578,596,614,632,650,668,686,704,722,740,758,776,794,812,830,848,866,884,902,920,938,956,974,992,1010,1028,1046,1064,1082,], 
		["Attack %",20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,], 
		["Attack Speed % (min)",7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,], 
		["Attack Speed % (max)",7,13,18,22,25,27,29,31,33,34,35,36,37,38,39,40,40,41,41,42,42,43,43,44,44,44,45,45,45,45,46,46,46,46,46,47,47,47,47,47,47,48,48,48,48,48,48,48,49,49,49,49,49,49,49,49,49,49,49,50,], 
		["Walk/Run Speed % (min)",27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,], 
		["Walk/Run Speed % (max)",32,34,36,38,40,42,44,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,], 
		["Melee Splash Radius +% (min)",6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,], 
		["Melee Splash Radius +% (max)",6,12,16,19,22,24,26,27,29,30,31,32,33,34,35,36,36,36,37,37,38,38,39,39,39,40,40,40,40,40,41,41,41,41,41,42,42,42,42,42,42,43,43,43,43,43,43,44,44,44,44,44,44,45,45,45,45,45,45,46,], 
]};
/*[19] Concentrate		*/ var d332 = {values:[
		["Magic Damage %",], 
		["Defense Bonus %",20,24,28,32,36,40,44,48,52,56,60,64,68,72,76,80,84,88,92,96,100,104,108,112,116,120,124,128,132,136,140,144,148,152,156,160,164,168,172,176,180,184,188,192,196,200,204,208,212,216,220,224,228,232,236,240,244,248,252,256,], 
		["Attack %",40,52,64,76,88,100,112,124,136,148,160,172,184,196,208,220,232,244,256,268,280,292,304,316,328,340,352,364,376,388,400,412,424,436,448,460,472,484,496,508,520,532,544,556,568,580,592,604,616,628,640,652,664,676,688,700,712,724,736,748,], 
		["Damage %",70,86,102,118,134,150,166,182,198,214,230,246,262,278,294,310,326,342,358,374,390,406,422,438,454,470,486,502,518,534,550,566,582,598,614,630,646,662,678,694,710,726,742,758,774,790,806,822,838,854,870,886,902,918,934,950,966,982,998,1014,], 
]};
/*[20] Berserk			*/ var d352 = {values:[
		["Attack %",60,68,76,84,92,100,108,116,124,132,140,148,156,164,172,180,188,196,204,212,220,228,236,244,252,260,268,276,284,292,300,308,316,324,332,340,348,356,364,372,380,388,396,404,412,420,428,436,444,452,460,468,476,484,492,500,508,516,524,532,], 
		["Damage %",150,165,180,195,210,225,240,255,270,285,300,315,330,345,360,375,390,405,420,435,450,465,480,495,510,525,540,555,570,585,600,615,630,645,660,675,690,705,720,735,750,765,780,795,810,825,840,855,870,885,900,915,930,945,960,975,990,1005,1020,1035,], 
		["Physical Pierce %",5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,], 
		["Physical Damage Resistance %",-5,-6,-7,-8,-9,-10,-11,-12,-13,-14,-15,-16,-17,-18,-19,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,], 
]};
/*[21] Stun				*/ var d321 = {values:[
		["Damage",], 
		["Attack %",55,70,85,100,115,130,145,160,175,190,205,220,235,250,265,280,295,310,325,340,355,370,385,400,415,430,445,460,475,490,505,520,535,550,565,580,595,610,625,640,655,670,685,700,715,730,745,760,775,790,805,820,835,850,865,880,895,910,925,940,], 
		["Duration (seconds)",1,1.1,1.3,1.4,1.6,1.8,1.9,2.1,2.2,2.4,2.6,2.7,2.9,3,3.2,3.4,3.4,3.5,3.6,3.7,3.8,3.9,4,4,4.1,4.2,4.3,4.4,4.4,4.5,4.6,4.7,4.8,4.8,4.9,5,5.1,5.2,5.2,5.3,5.4,5.5,5.6,5.6,5.7,5.8,5.9,6,6,6.1,6.2,6.3,6.4,6.4,6.5,6.6,6.7,6.8,6.8,6.9,], 
]};
/*[22] Leap				*/ var d331 = {values:[
		["Knockback Radius (yards)",5.3,6,6.6,7.3,8,8.6,9.3,10,10,10,10,10,10,10,10,10,10,10,10,10,], 
		["Leap Distance (yards)",15.3,16.6,18,18.6,20,20.6,20.6,21.3,22,22,22.6,22.6,23.3,23.3,23.3,24,24,24,24,24,24.6,24.6,24.6,24.6,24.6,24.6,25.3,25.3,25.3,25.3,25.3,25.3,25.3,25.3,25.3,25.3,25.3,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26,26.6,], 
		["Mana Cost",5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13,13.5,14,14.5,15,15.5,16,16.5,17,17.5,18,18.5,19,19.5,20,20.5,21,21.5,22,22.5,23,23.5,24,24.5,25,25.5,26,26.5,27,27.5,28,28.5,29,29.5,30,30.5,31,31.5,32,32.5,33,33.5,34,34.5,], 
]};
/*[23] Double Throw		*/ var d333 = {values:[
		["Damage %",45,53,61,69,77,85,93,101,109,117,125,133,141,149,157,165,173,181,189,197,205,213,221,229,237,245,253,261,269,277,285,293,301,309,317,325,333,341,349,357,365,373,381,389,397,405,413,421,429,437,445,453,461,469,477,485,493,501,509,517,], 
		["Bounces",3,3,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,], 
		["Attack %",35,45,55,65,75,85,95,105,115,125,135,145,155,165,175,185,195,205,215,225,235,245,255,265,275,285,295,305,315,325,335,345,355,365,375,385,395,405,415,425,435,445,455,465,475,485,495,505,515,525,535,545,555,565,575,585,595,605,615,625,], 
		["Mana Cost",3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,30,30,31,31,32,32,], 
]};
/*[24] Bash				*/ var d311 = {values:[
		["Attack %",27,39,51,63,75,87,99,111,123,135,147,159,171,183,195,207,219,231,243,255,267,279,291,303,315,327,339,351,363,375,387,399,411,423,435,447,459,471,483,495,507,519,531,543,555,567,579,591,603,615,627,639,651,663,675,687,699,711,723,735,], 
		["Damage %",50,68,86,104,122,140,158,176,194,212,230,248,266,284,302,320,338,356,374,392,410,428,446,464,482,500,518,536,554,572,590,608,626,644,662,680,698,716,734,752,770,788,806,824,842,860,878,896,914,932,950,968,986,1004,1022,1040,1058,1076,1094,1112,], 
		["Damage",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,], 
		["Mana Cost",2,2.2,2.5,2.7,3,3.2,3.5,3.7,4,4.2,4.5,4.7,5,5.2,5.5,5.7,6,6.2,6.5,6.7,7,7.2,7.5,7.7,8,8.2,8.5,8.7,9,9.2,9.5,9.7,10,10.2,10.5,10.7,11,11.2,11.5,11.7,12,12.2,12.5,12.7,13,13.2,13.5,13.7,14,14.2,14.5,14.7,15,15.2,15.5,15.7,16,16.2,16.5,16.7,], 
]};
/*[25] Leap Attack		*/ var d351 = {values:[
		["Damage %",30,42,54,66,78,90,102,114,126,138,150,162,174,186,198,210,222,234,246,258,270,282,294,306,318,330,342,354,366,378,390,402,414,426,438,450,462,474,486,498,510,522,534,546,558,570,582,594,606,618,630,642,654,666,678,690,702,714,726,738,], 
		["Mana Cost",7,7.2,7.5,7.7,8,8.2,8.5,8.7,9,9.2,9.5,9.7,10,10.2,10.5,10.7,11,11.2,11.5,11.7,12,12.2,12.5,12.7,13,13.2,13.5,13.7,14,14.2,14.5,14.7,15,15.2,15.5,15.7,16,16.2,16.5,16.7,17,17.2,17.5,17.7,18,18.2,18.5,18.7,19,19.2,19.5,19.7,20,20.2,20.5,20.7,21,21.2,21.5,21.7,], 
]};
/*[26]*/
/*[27] Whirlwind		*/ var d362 = {values:[
		["Velocity %",0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,], 
		["Damage %",30,34,38,42,46,50,54,58,62,66,70,74,78,82,86,90,94,98,102,106,110,114,118,122,126,130,134,138,142,146,150,154,158,162,166,170,174,178,182,186,190,194,198,202,206,210,214,218,222,226,230,234,238,242,246,250,254,258,262,266,], 
		["Attack %",90,96,102,108,114,120,126,132,138,144,150,156,162,168,174,180,186,192,198,204,210,216,222,228,234,240,246,252,258,264,270,276,282,288,294,300,306,312,318,324,330,336,342,348,354,360,366,372,378,384,390,396,402,408,414,420,426,432,438,444,], 
		["Mana Cost",12.5,13,13.5,14,14.5,15,15.5,16,16.5,17,17.5,18,18.5,19,19.5,20,20.5,21,21.5,22,22.5,23,23.5,24,24.5,25,25,26,26,27,27,28,28,29,29,30,30,31,31,32,32,33,33,34,34,35,35,36,36,37,37,38,38,39,39,40,40,41,41,42,], 
]};
/*[28] Double Swing		*/ var d323 = {values:[
		["Damage",20,38,56,74,92,110,128,146,164,182,200,218,236,254,272,290,308,326,344,362,380,398,416,434,452,470,488,506,524,542,560,578,596,614,632,650,668,686,704,722,740,758,776,794,812,830,848,866,884,902,920,938,956,974,992,1010,1028,1046,1064,1082,], 
		["Attack %",20,32,44,56,68,80,92,104,116,128,140,152,164,176,188,200,212,224,236,248,260,272,284,296,308,320,332,344,356,368,380,392,404,416,428,440,452,464,476,488,500,512,524,536,548,560,572,584,596,608,620,632,644,656,668,680,692,704,716,728,], 
		["Mana Cost",1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,11,11,11,11,12,12,12,12,13,13,13,13,14,14,14,14,15,15,15,15,], 
]};

var skills_pd2_barbarian = [
{data:d111, key:"111", code:128, name:"Howl", i:0, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, bindable:1, description:"Sends nearby monsters<br>scrambling away in fear", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Enemy runs up to "," yards<br>Enemy runs for 3 seconds<br>Mana Cost: 4",""]},
{data:d113, key:"113", code:129, name:"Find Potion", i:1, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, bindable:1, description:"Use on the corpse of a slain monster<br>for a chance to find a potion", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:[""," percent chance<br>Mana Cost: 1",""]},
{data:d142, key:"142", code:130, name:"Taunt", i:2, req:[8,0], reqlvl:18, level:0, extra_levels:0, force_levels:0, bindable:1, description:"Enrages nearby monsters into relentlessly attacking", syn_title:"", syn_text:"", graytext:"", index:[1," seconds"], text:["Duration Increases with Base Levels<br>Duration: ","Target's Damage: "," percent<br>Target's Attack: "," percent<br>Mana Cost: 3",""]},
{data:d121, key:"121", code:131, name:"Shout", i:3, req:[0], reqlvl:6, level:0, extra_levels:0, force_levels:0, effect:0, bindable:1, description:"Warns of impending danger and improves the defense<br>rating of you and your party", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Defense: +"," percent<br>Duration: 300 seconds<br>Mana Cost: 6",""]},
{data:d133, key:"133", code:132, name:"Find Item", i:4, req:[1], reqlvl:12, level:0, extra_levels:0, force_levels:0, bindable:1, description:"Use on the corpse of a slain monster<br>to find hidden treasures", syn_title:"<br>Double Throw Receives Bonuses From:<br>", syn_text:"Find Potion: +1% Chance per Level", graytext:"", index:[0,""], text:[""," percent chance<br>Mana Cost: 7",""],incomplete:1},
{data:d162, key:"162", code:133, name:"Battle Cry", i:5, req:[6,3,2,8,0], reqlvl:30, level:0, extra_levels:0, force_levels:0, bindable:1, description:"Fearsome cry that decreases<br>enemies' defense rating and physical damage resistance", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Duration: "," seconds<br>Defense: "," percent<br>Physical Damage Resistance: "," percent<br>Mana Cost: 5",""]},
{data:d151, key:"151", code:134, name:"Battle Orders", i:6, req:[3,0], reqlvl:24, level:0, extra_levels:0, force_levels:0, effect:0, bindable:1, description:"Improves the maximum mana and life<br>of you and your party", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Duration: 300 seconds<br>Max Life: +","<br>Max Mana: +","<br>Mana Cost: 7",""]},
{data:d153, key:"153", code:135, name:"Grim Ward", i:7, req:[2,8,0], reqlvl:24, level:0, extra_levels:0, force_levels:0, bindable:1, description:"Use on the corpse of a slain monster<br>to create a frightening totem<br>that increases damage and attack rating<br>for you and your party", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["+"," Attack Rating<br>Damage: +"," percent<br>Duration: 40 seconds<br>Radius: "," yards<br>Mana Cost: 4",""]},
{data:d122, key:"122", code:136, name:"War Cry", i:8, req:[0], reqlvl:6, level:0, extra_levels:0, force_levels:0, bindable:2, damaging:{attack:0,spell:1}, description:"Injures all nearby enemies", syn_title:"<br>War Cry Receives Bonuses From:<br>", syn_text:"Howl: +18% Damage per Level<br>Battle Cry: +18% Damage per Level<br>Taunt: +12% Damage per Level<br>Shout: +12% Damage per Level<br>Battle Command: +12% Damage per Level<br>Battle Orders: +12% Damage per Level", graytext:"", index:[0,""], text:["Damage: ","-","<br>Radius: "," yards<br>Mana Cost: ",""]},
{data:d161, key:"161", code:137, name:"Battle Command", i:9, req:[6,3,0], reqlvl:30, level:0, extra_levels:0, force_levels:0, effect:0, bindable:1, description:"Increases all current skill levels for you and your party", syn_title:"", syn_text:"", graytext:"", index:[1,""], text:["Grants an Additional Skill Level every 10 Base Levels<br>Bonus Skills: ","Damage: +"," percent<br>Duration: 300 seconds<br>Mana Cost: 11",""]},

{data:d211, key:"211", code:138, name:"General Mastery", i:10, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, effect:0, bindable:0, description:"Passive - Improves sword, axe, dagger, and blunt weapon fighting skill", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Damage: +"," percent<br>Attack: +"," percent<br>"," percent chance of Critical Strike",""]},
{data:d222, key:"222", code:139, name:"Polearm and Spear Mastery", i:11, req:[], reqlvl:6, level:0, extra_levels:0, force_levels:0, effect:0, bindable:0, description:"Passive - Improves polearm and spear skill", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Damage: +"," percent<br>Attack: +"," percent<br>"," percent chance of Critical Strike",""]},
/*TODO: remove*/{data:d213, key:"213", code:263, name:"None", i:12, req:[], reqlvl:100, level:0, extra_levels:0, force_levels:0, bindable:0, description:"", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:[""]},
{data:d213, key:"213", code:141, name:"Throwing Mastery", i:13, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, effect:0, bindable:0, description:"Passive - Improves thrown weapon skill", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Pierce: +"," percent<br>Damage: +"," percent<br>Attack: +"," percent<br>"," percent chance of Critical Strike",""]},
{data:d231, key:"231", code:142, name:"Combat Reflexes", i:14, req:[], reqlvl:12, level:0, extra_levels:0, force_levels:0, effect:0, bindable:0, description:"Passive - Increases stamina, hit recovery, and life", syn_title:"", syn_text:"", graytext:"", index:[1," percent"], text:["Increases Hit Recovery Rate by 2% per Base Level<br>Faster Hit Recovery: +","Max Life: +"," life<br>Stamina Bonus: +"," percent",""]},
{data:d243, key:"243", code:143, name:"Iron Skin", i:15, req:[], reqlvl:18, level:0, extra_levels:0, force_levels:0, effect:0, bindable:0, description:"Passive - Improves defense rating", syn_title:"", syn_text:"", graytext:"", index:[1," percent"], text:["Increases Physical Damage Reduction<br>by 1% Every 2 Base Levels<br>Physical Damage Reduction: ","+"," percent",""]},
{data:d251, key:"251", code:144, name:"Increased Speed", i:16, req:[14], reqlvl:24, level:0, extra_levels:0, force_levels:0, effect:0, bindable:0, description:"Passive - Increases walk and run speed", syn_title:"", syn_text:"", graytext:"", index:[1," percent"], text:["Increases Attack Speed by 2% per Base Level<br>Attack Speed: +","Walk/Run Speed: +"," percent",""]},
{data:d263, key:"263", code:145, name:"Natural Resistance", i:17, req:[15], reqlvl:30, level:0, extra_levels:0, force_levels:0, effect:0, bindable:0, description:"Passive - Increases natural resistances<br>to elemental and poison damage", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Resistances: +"," percent",""],incomplete:1},

{data:d312, key:"323", code:146, name:"Frenzy", i:18, req:[28], reqlvl:6, reqWeapon:["axe","mace","club","hammer","sword","dagger","thrown","javelin","scepter","wand"], level:0, extra_levels:0, force_levels:0, effect:0, bindable:2, damaging:{attack:1,spell:0}, description:"Allows you to swing two weapons at once<br>Each successful attack increases your overall speed<br>Requires you to equip two weapons<br><br>Mana Cost: 1", syn_title:"<br>Frenzy Receives Bonuses From:<br>", syn_text:"Double Swing: +14% Damage per Level<br>Stun: +14% Damage per Level", graytext:"", index:[0,""], text:["Duration: 15 seconds<br>Damage: +"," percent<br>Attack: +"," percent<br>Attack Speed: +","-"," percent<br>Walk/Run Speed: +","-"," percent<br>Increased Melee Splash Radius: ","-"," percent",""]},
{data:d332, key:"332", code:147, name:"Concentrate", i:19, req:[28], reqlvl:12, reqWeapon:["axe","mace","club","hammer","sword","dagger","thrown","javelin","scepter","wand","staff","spear","polearm"], level:0, extra_levels:0, force_levels:0, bindable:2, damaging:{attack:1,spell:0}, description:"Attack that is not interruptible and<br>improves attack and defense rating and<br>converts physical damage to magic damage", syn_title:"<br>Concentrate Receives Bonuses From:<br>", syn_text:"Bash: +2% Magic Damage per Level<br>Bash: +12% Damage per Level<br>Battle Command: +12% Damage per Level", graytext:"", index:[1," percent"], text:["Converts 2% of Physical Damage to Magic Damage per Base Level<br>Magic Damage: +","Defense Bonus: +"," percent<br>Attack: +"," percent<br>Damage: +"," percent<br>Mana Cost: 2",""]},
{data:d352, key:"352", code:148, name:"Berserk", i:20, req:[19,28], reqlvl:24, reqWeapon:["axe","mace","club","hammer","sword","dagger","thrown","javelin","scepter","wand","staff","spear","polearm"], level:0, extra_levels:0, force_levels:0, bindable:2, damaging:{attack:1,spell:1}, description:"A powerful but reckless attack that<br>increases damage and attack rating but decreases<br>defense rating and physical damage resistance<br>Requires you to equip two weapons<br><br>Duration: 0.5 seconds", syn_title:"<br>Berserk Receives Bonuses From:<br>", syn_text:"Taunt: +10% Damage per Level<br>Combat Reflexes: +10% Damage per Level", graytext:"", index:[0,""], text:["Attack: +"," percent<br>Damage: +"," percent<br>Physical Pierce: +"," percent<br>Physical Damage Resistance: "," percent<br>Mana Cost: 4"]},
{data:d321, key:"321", code:149, name:"Stun", i:21, req:[24], reqlvl:6, reqWeapon:["axe","mace","club","hammer","sword","dagger","thrown","javelin","scepter","wand","staff","spear","polearm"], level:0, extra_levels:0, force_levels:0, bindable:2, damaging:{attack:1,spell:0}, description:"Stuns enemies in an area for a<br>short time dealing bonus damage<br>and increases your attack rating<br><br>Deals 1/4 Weapon Damage", syn_title:"<br>Stun Receives Bonuses From:<br>", syn_text:"Bash: +8% Damage per Level<br>Concentrate: +5% Attack Rating per Level<br>War Cry +5% Duration per Level", graytext:"", index:[1," percent"], text:["Damage: +","Attack: +"," percent<br>Duration: "," seconds<br>Mana Cost: 2",""]},
{data:d331, key:"331", code:150, name:"Leap", i:22, req:[21,24], reqlvl:12, level:0, extra_levels:0, force_levels:0, bindable:2, description:"Leaps away from danger<br>or into the fray", syn_title:"", syn_text:"", graytext:"", index:[1," yards"], text:["Knockback Radius: ","Leap Distance: "," yards<br>Mana Cost: ",""],incomplete:1},
{data:d333, key:"333", code:151, name:"Double Throw", i:23, req:[28,18], reqlvl:12, reqWeapon:["thrown","javelin"], level:0, extra_levels:0, force_levels:0, effect:0, bindable:2, damaging:{attack:2,spell:0}, description:"Allows you to throw two different<br>throwing weapons at the same time<br>Weapons bounce to nearby enemies", syn_title:"<br>Double Throw Receives Bonuses From:<br>", syn_text:"Double Swing: +6% Damage per Level", graytext:"", index:[0,""], text:["Damage: +"," percent<br>"," bounces<br>To Attack Rating: +"," percent<br>Mana Cost: ",""]},
{data:d311, key:"311", code:152, name:"Bash", i:24, req:[], reqlvl:1, reqWeapon:["axe","mace","club","hammer","sword","dagger","thrown","javelin","scepter","wand","staff","spear","polearm"], level:0, extra_levels:0, force_levels:0, bindable:2, damaging:{attack:1,spell:0}, description:"Powerful blow that has a chance to knock back enemies", syn_title:"<br>Bash Receives Bonuses From:<br>", syn_text:"Stun: +12% Damage per Level<br>Concentrate: +12% Damage per Level<br>Concentrate: +10% Attack Rating per Level", graytext:"", index:[0,""], text:["Attack: +"," percent<br>Damage: +"," percent<br>Damage: +","<br>Mana Cost: ",""]},
{data:d351, key:"351", code:153, name:"Leap Attack", i:25, req:[22,21,24,19,28], reqlvl:24, reqWeapon:["axe","mace","club","hammer","sword","dagger","thrown","javelin","scepter","wand","staff","spear","polearm"], level:0, extra_levels:0, force_levels:0, bindable:1, damaging:{attack:1,spell:0}, description:"Leaps to and attacks enemies<br>in a radius upon landing", syn_title:"<br>Leap Attack Receives Bonuses From:<br>", syn_text:"Leap: +8% Damage per Level<br>Bash: +8% Damage per Level", graytext:"", index:[0,""], text:["Damage: +"," percent<br>Mana Cost: ",""]},
/*TODO: remove*/{data:d362, key:"362", code:154, name:"None", i:26, req:[], reqlvl:100, level:0, extra_levels:0, force_levels:0, bindable:0, description:"", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:[""]},
{data:d362, key:"362", code:155, name:"Whirlwind", i:27, req:[20,19,28], reqlvl:30, reqWeapon:["axe","mace","club","hammer","sword","dagger","thrown","javelin","scepter","wand","staff","spear","polearm"], level:0, extra_levels:0, force_levels:0, bindable:2, damaging:{attack:1,spell:0}, description:"A whirling dance of death<br>that cuts a path through the<br>legions of your enemies", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Velocity: +"," percent<br>Damage: +"," percent<br>Attack: +"," percent<br>Mana Cost: ",""]},
{data:d323, key:"312", code:146, name:"Double Swing", i:28, req:[], reqlvl:1, reqWeapon:["axe","mace","club","hammer","sword","dagger","thrown","javelin","scepter","wand"], level:0, extra_levels:0, force_levels:0, bindable:2, damaging:{attack:1,spell:0}, description:"When two weapons are equipped<br>attacks two targets if possible,<br>or one target twice", syn_title:"<br>Double Swing Receives Bonuses From:<br>", syn_text:"Frenzy: +16% Damage per Level<br>Stun: +16% Damage per Level", graytext:"", index:[0,""], text:["Damage: +"," percent<br>Attack: +"," percent<br>Mana Cost: ",""]},
];

/* Season 5 Changelog Notes - Barbarian

  addressed changes are tabbed over, changes that still need to be addressed do not have a preceding tab
  ~ means the change probably isn't reflected on the skill tooltip (purposefully ignored)
  # means the change is pending and the correct data is in Skill_Data_PD2.exc

  Closed Beta:
  
	General mastery now applies to daggers

	Battle cry duration reduced from 12 seconds + 0.4 seconds per level to 5 seconds at all levels
	Battle cry now caps at -30% to enemy defense from -65%

	Combat reflexes life per level reduced from 20 to 15
	Combat reflexes life per level now scales from soft points instead of hard points

	Bash berserk synergy has been replaced with concentrate

	Taunt duration now increases by .25 seconds every base level			// changes between level 0 and level 1

	Increased speed now gives 2% increased attack speed per base level

	Berserk now caps at 30% physical pierce
	Berserk physical pierce per level reduced from 2% to 1%

	Double swing synergies increased from 12% to 16%
	Double swing damage increased from 18% to 20%

	Stun level 1-16 duration scaling increased by 100%
	Stun now deals ¼ weapon damage from 100%
	**Stun Duration no longer capped at 3 seconds**

	Shouts defense per level increased from 8% to 10%

	Find item now has find potion as a synergy at 1% per level
	Find items 5-60% find item diminishing returns scaling reduced to 0-50%	...high levels may not be accurate, test in s5 sp

	Natural resistance 0-80% all resistance diminishing return scaling reduced to 0-75%

	Concentrates damage per level increased from 14% to 16%
	Concentrates bash synergy increased from 8% to 12%

	Double throw damage per level increased from 6% to 8%
	Double throw synergy damage per level increased from 5% to 6%

	Frenzy synergies increased from 10% to 14%
	Frenzy damage per level increased from 16% to 18%
	Frenzy level 1 damage bonus increased from 14% to 20%

	~ Whirlwind no longer attempts to do a normal attack when out of mana
	~ Whirlwind no longer attacks in place during a namelock and will now whirlwind back and forth through the monster
	Whirlwind damage per level reduced from 5% to 4%
	Whirlwind base enhanced damage bonus reduced from 35% to 30%
	~ Whirlwind now attacks 20% slower when dual wielding (6 frames during dual wielding compared to 5 when using a two handed weapon)

	Leap level 1 mana cost reduced from 20 to 5
	Leap mana cost per level reduced from **1** to .5 *(mana cost didn't scale before?)*
	Leap range increased from a diminishing return scaling of 10-30 to 20-40	...test in s5 sp
	~ leap travel speed increased by 33%


	Combat reflexes life per level reduced from 15 to 10
	Combat reflexes no longer provides 4% faster hit recovery at level 1
	Combat reflexes +1% faster hit recovery per level has been changed to +2% faster hit recovery per base point
	Battle cry is now properly capping at -30% target defense
	~ Stun is no longer usable in wolf form


	Double Swing level 1 damage changed from 18 to 20%
	
*/
