
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
		
		if (skill.name == "Combat Reflexes" && elem == 0) {	result = 10+20*skill.level }
		if (skill.name == "Iron Skin" && elem == 0) {		result = Math.floor(skill.level/2) }
		
		if (skill.name == "Bash" && elem == 0) { 			result += (10*skills[19].level) }
		if (skill.name == "Bash" && elem == 1) { 			result += (10*skills[21].level + 10*skills[20].level) }
		if (skill.name == "Frenzy" && elem == 1) { 			result += (6*skills[28].level + 6*skills[21].level) }
		if (skill.name == "Stun" && elem == 0) { 			result = 8*skills[24].level }
		if (skill.name == "Stun" && elem == 1) { 			result += (5*skills[19].level) }
		if (skill.name == "Stun" && elem == 2) { 			result *= (1 + 0.05*skills[8].level) }
		if (skill.name == "Double Swing" && elem == 0) { 	result += (8*skills[18].level) }
		if (skill.name == "Leap" && elem == 0) { 			result = 5 - 5*Math.ceil(skill.level/20) + ~~skill.data.values[elem][skill.level] }
		if (skill.name == "Concentrate" && elem == 0) { 	result = 30 + skill.level*2 + 1*skills[24].level }
		if (skill.name == "Concentrate" && elem == 3) { 	result += (6*skills[24].level + 6*skills[9].level) }
		if (skill.name == "Double Throw" && elem == 0) { 	result += (5*skills[28].level) }
		if (skill.name == "Leap Attack" && elem == 0) { 	result += (8*skills[22].level + 8*skills[24].level) }
		if (skill.name == "Berserk" && elem == 1) { 		result += (8*skills[2].level + 8*skills[14].level) }
		
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
		["Target's Damage %",-5,-7,-9,-11,-13,-15,-17,-19,-21,-23,-25,-27,-29,-31,-33,-35,-37,-39,-41,-43,-45,-47,-49,-51,-53,-55,-57,-59,-61,-63,-65,-67,-69,-71,-73,-75,-77,-79,-81,-83,-85,-87,-89,-91,-93,-95,-97,-99,-101,-103,-105,-107,-109,-111,-113,-115,-117,-119,-121,-123,], 
		["Target's Attack %",-5,-7,-9,-11,-13,-15,-17,-19,-21,-23,-25,-27,-29,-31,-33,-35,-37,-39,-41,-43,-45,-47,-49,-51,-53,-55,-57,-59,-61,-63,-65,-67,-69,-71,-73,-75,-77,-79,-81,-83,-85,-87,-89,-91,-93,-95,-97,-99,-101,-103,-105,-107,-109,-111,-113,-115,-117,-119,-121,-123,], 
]};
/*[ 3] Shout			*/ var d121 = {values:[
		["Defense +%",25,33,41,49,57,65,73,81,89,97,105,113,121,129,137,145,153,161,169,177,185,193,201,209,217,225,233,241,249,257,265,273,281,289,297,305,313,321,329,337,345,353,361,369,377,385,393,401,409,417,425,433,441,449,457,465,473,481,489,497,], 
]};
/*[ 4] Find Item		*/ var d133 = {values:[
		["% Chance",13,19,24,29,32,35,37,39,41,42,44,45,46,47,47,49,49,50,50,51,51,52,52,53,53,53,54,54,55,55,55,55,56,56,56,56,56,57,57,57,57,57,57,57,58,58,58,58,58,58,58,58,58,59,59,59,59,59,59,60,], 
]};
/*[ 5] Battle Cry		*/ var d162 = {values:[
		["Duration (seconds)",12,14.4,16.8,19.2,21.6,24,26.4,28.8,31.2,33.6,36,38.4,40.8,43.2,45.6,48,50.4,52.8,55.2,57.6,60,62.4,64.8,67.2,69.6,72,74.4,76.8,79.2,81.6,84,86.4,88.8,91.2,93.6,96,98.4,100.8,103.2,105.6,108,110.4,112.8,115.2,117.6,120,122.4,124.8,127.2,129.6,132,134.4,136.8,139.2,141.6,144,146.4,148.8,151.2,153.6,], 
		["Defense %",-15,-16,-17,-18,-19,-20,-21,-22,-23,-24,-25,-26,-27,-28,-29,-30,-31,-32,-33,-34,-35,-36,-37,-38,-39,-40,-41,-42,-43,-44,-45,-46,-47,-48,-49,-50,-51,-52,-53,-54,-55,-56,-57,-58,-59,-60,-61,-62,-63,-64,-65,-65,-65,-65,-65,-65,-65,-65,-65,-65,], 
		["Physical Damage Resistance %",-5,-6,-7,-8,-9,-10,-11,-12,-13,-14,-15,-16,-17,-18,-19,-20,-21,-22,-23,-24,-25,-26,-26,-27,-27,-28,-28,-29,-29,-30,-30,-31,-31,-32,-32,-33,-33,-34,-34,-35,-35,-36,-36,-37,-37,-38,-38,-39,-39,-40,-40,-41,-41,-42,-42,-43,-43,-44,-44,-45,], 
]};
/*[ 6] Battle Orders	*/ var d151 = {values:[
		["Max Life",50,65,80,95,110,125,140,155,170,185,200,215,230,245,260,275,290,305,320,335,350,365,380,395,410,425,440,455,470,485,500,515,530,545,560,575,590,605,620,635,650,665,680,695,710,725,740,755,770,785,800,815,830,845,860,875,890,905,920,935,], 
		["Max Mana",25,32,40,47,55,62,70,77,85,92,100,107,115,122,130,137,145,152,160,167,175,172,190,197,205,212,220,227,235,242,250,257,265,272,280,287,295,302,310,317,325,332,340,347,355,362,370,377,385,392,400,407,415,422,430,437,445,452,460,467,], 
]};
/*[ 7] Grim Ward		*/ var d153 = {values:[
		["Attack Rating",130,150,170,190,210,230,250,270,290,310,330,350,370,390,410,430,450,470,490,510,530,550,570,590,610,630,650,670,690,710,730,750,770,790,810,830,850,870,890,910,930,950,970,990,1010,1030,1050,1070,1090,1110,1130,1150,1170,1190,1210,1230,1250,1270,1290,1310,], 
		["Damage +%",35,40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,115,120,125,130,135,140,145,150,155,160,165,170,175,180,185,190,195,200,205,210,215,220,225,230,235,240,245,250,255,260,265,270,275,280,285,290,295,300,305,310,315,320,325,330,], 
		["Radius (yards)",16.6,18,19.3,20.6,22,23.3,24.6,26,27.3,28.6,30,31.3,32.6,34,35.3,36.6,38,39.3,40.6,42,43.3,44.6,46,47.3,48.6,50,51.3,52.6,54,55.3,56.6,58,59.3,60.6,62,63.3,64.6,66,67.3,68.6,70,71.3,72.6,74,75.3,76.6,78,79.3,80.6,82,83.3,84.6,86,87.3,88.6,90,91.3,92.6,94,95.3,], 
]};
/*[ 8] War Cry			*/ var d122 = {values:[
		["Damage min",2,3,4,5,6,7,8,9,11,13,15,17,19,21,23,25,33,41,49,57,65,73,89,105,121,137,153,169,193,217,241,265,289,313,337,361,385,409,433,457,481,505,529,553,577,601,625,649,673,697,721,745,769,793,817,841,865,889,913,937,], 
		["Damage max",4,5,6,7,8,9,10,11,13,15,17,19,21,23,25,27,35,43,51,59,67,75,91,107,123,139,155,171,195,219,243,267,291,315,339,363,387,411,435,459,483,507,531,555,579,603,627,651,675,699,723,747,771,795,819,843,867,891,915,939,], 
		["Radius (yards)",4.6,4.6,4.6,4.6,4.6,4.6,5.3,5.3,5.3,5.3,5.3,5.3,5.3,6,6,6,6,6,6,6,6.6,6.6,6.6,6.6,6.6,6.6,6.6,7.3,7.3,7.3,7.3,7.3,7.3,7.3,8,8,8,8,8,8,8,8.6,8.6,8.6,8.6,8.6,8.6,8.6,9.3,9.3,9.3,9.3,9.3,9.3,9.3,10,10,10,10,10,], 
		["Mana Cost",2,2.2,2.5,2.7,3,3.2,3.5,3.7,4,4.2,4.5,4.7,5,5.2,5.5,5.7,6,6.2,6.5,6.7,7,7.2,7.5,7.7,8,8.2,8.5,8.7,9,9.2,9.5,9.7,10,10.2,10.5,10.7,11,11.2,11.5,11.7,12,12.2,12.5,12.7,13,13.2,13.5,13.7,14,14.2,14.5,14.7,15,15.2,15.5,15.7,16,16.2,16.5,16.7,], 
]};
/*[ 9] Battle Command	*/ var d161 = {values:[
		["Bonus Skills",], 
		["Damage +%",20,23,26,29,32,35,38,41,44,47,50,53,56,59,62,65,68,71,74,77,80,83,86,89,92,95,98,101,104,107,110,113,116,119,122,125,128,131,134,137,140,143,146,149,152,155,158,161,164,167,170,173,176,179,182,185,188,191,194,197,], 
]};

/*[10] General Mastery	*/ var d211 = {values:[
		["Damage +%",28,33,38,43,48,53,58,63,68,73,78,83,88,93,98,103,108,113,118,123,128,133,138,143,148,153,158,163,168,173,178,183,188,193,198,203,208,213,218,223,228,233,238,243,248,253,258,263,268,273,278,283,288,293,298,303,308,313,318,323,], 
		["Attack +%",28,38,48,58,68,78,88,98,108,118,128,138,148,158,168,178,188,198,208,218,228,238,248,258,268,278,288,298,308,318,328,338,348,358,368,378,388,398,408,418,428,438,448,458,468,478,488,498,508,518,528,538,548,558,568,578,588,598,608,618,], 
		["Chance of Critical Strike %",5,9,12,15,17,19,20,21,23,23,24,25,26,26,27,28,28,28,29,29,29,30,30,30,30,31,31,31,31,31,32,32,33,32,32,32,32,33,33,33,33,33,33,33,33,33,33,33,34,34,34,34,34,34,34,34,34,34,34,35,], 
]};
/*[11]Pole/Spear Mastery*/ var d222 = {values:[
		["Damage +%",30,36,42,48,54,60,66,72,78,84,90,96,102,108,114,120,126,132,138,144,150,156,162,168,174,180,186,192,198,204,210,216,222,228,234,240,246,252,258,264,270,276,282,288,294,300,306,312,318,324,330,336,342,348,354,360,366,372,378,384,], 
		["Attack +%",30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,620,], 
		["Chance of Critical Strike %",5,9,12,15,17,19,20,21,23,23,24,25,26,26,27,28,28,28,29,29,29,30,30,30,30,31,31,31,31,31,32,32,32,32,32,32,32,33,33,33,33,33,33,33,33,33,33,33,34,34,34,34,34,34,34,34,34,34,34,35,], 
]};
/*[12]*/
/*[13] Throwing Mastery	*/ var d213 = {values:[
		["Pierce %",15,17,19,21,23,25,27,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,], 
		["Damage +%",28,33,38,43,48,53,58,63,68,73,78,83,88,93,98,103,108,113,118,123,128,133,138,143,148,153,158,163,168,173,178,183,188,193,198,203,208,213,218,223,228,233,238,243,248,253,258,263,268,273,278,283,288,293,298,303,308,313,318,323,], 
		["Attack +%",30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,620,], 
		["Chance of Critical Strike %",5,9,12,15,17,19,20,21,23,23,24,25,26,26,27,28,28,28,29,29,29,30,30,30,30,31,31,31,31,31,32,32,32,32,32,32,32,33,33,33,33,33,33,33,33,33,33,33,34,34,34,34,34,34,34,34,34,34,34,34,], 
]};
/*[14] Combat Reflexes	*/ var d231 = {values:[
		["Max Life",], 
		["Faster Hit Recovery %",4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,], 
		["Stamina Bonus +%",30,45,60,75,90,105,120,135,150,165,180,195,210,225,240,255,270,285,300,315,330,345,360,375,390,405,420,435,450,465,480,495,510,525,540,555,570,585,600,615,630,645,660,675,690,705,720,735,750,765,780,795,810,825,840,855,870,885,900,915,], 
]};
/*[15] Iron Skin		*/ var d243 = {values:[
		["Physical Damage Reduction +%",], 
		["Defense +%",30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,620,], 
]};
/*[16] Increased Speed	*/ var d251 = {values:[
		["Walk/Run Speed +%",13,18,22,25,28,30,32,33,35,36,37,38,39,40,40,41,41,42,42,43,43,43,44,44,44,45,45,45,46,46,46,46,46,46,46,47,47,47,47,47,47,48,48,48,48,48,48,48,49,49,49,49,49,49,49,49,49,49,49,50,], 
]};
/*[17]Natural Resistance*/ var d263 = {values:[
		["Resistances +%",12,21,28,35,40,44,47,49,52,54,56,58,60,61,62,64,64,65,66,67,68,68,69,70,70,71,72,72,72,72,73,73,74,74,74,75,75,76,76,76,76,76,76,76,77,77,77,77,78,78,78,78,78,79,79,79,79,79,79,80,], 
]};

/*[18] Frenzy			*/ var d312 = {values:[
		["Duration (seconds)",9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,], 
		["Damage %",15,25,35,45,55,65,75,85,95,105,115,125,135,145,155,165,175,185,195,205,215,225,235,245,255,265,275,285,295,305,315,325,335,345,355,365,375,385,395,405,415,425,435,445,455,465,475,485,495,505,515,525,535,545,555,565,575,585,595,605,], 
		["Attack %",20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,], 
		["Attack Speed % min",7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,], 
		["Attack Speed % max",7,13,18,22,25,27,29,31,33,34,35,36,37,38,39,40,40,41,41,42,42,43,43,44,44,44,45,45,45,45,46,46,46,46,46,47,47,47,47,47,47,48,48,48,48,48,48,48,49,49,49,49,49,49,49,49,49,49,49,50,], 
		["Walk/Run Speed % min",27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,27,], 
		["Walk/Run Speed % max",32,34,36,38,40,42,44,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,], 
		["Mana Cost",3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,11,11,11,11,12,12,12,12,13,13,13,13,14,14,14,14,15,15,15,15,16,16,16,16,17,17,17,17,], 
]};
/*[19] Concentrate		*/ var d332 = {values:[
		["Magic Damage %",], 
		["Defense Bonus %",20,24,28,32,36,40,44,48,52,56,60,64,68,72,76,80,84,88,92,96,100,104,108,112,116,120,124,128,132,136,140,144,148,152,156,160,164,168,172,176,180,184,188,192,196,200,204,208,212,216,220,224,228,232,236,240,244,248,252,256,], 
		["Attack %",40,52,64,76,88,100,112,124,136,148,160,172,184,196,208,220,232,244,256,268,280,292,304,316,328,340,352,364,376,388,400,412,424,436,448,460,472,484,496,508,520,532,544,556,568,580,592,604,616,628,640,652,664,676,688,700,712,724,736,748,], 
		["Damage %",70,76,82,88,94,100,106,112,118,124,130,136,142,148,154,160,166,172,178,184,190,196,202,208,214,220,226,232,238,244,250,256,262,268,274,280,286,292,298,304,310,316,322,328,334,340,346,352,358,364,370,376,382,388,394,400,406,412,418,424,], 
]};
/*[20] Berserk			*/ var d352 = {values:[
		["Attack %",60,68,76,84,92,100,108,116,124,132,140,148,156,164,172,180,188,196,204,212,220,228,236,244,252,260,268,276,284,292,300,308,316,324,332,340,348,356,364,372,380,388,396,404,412,420,428,436,444,452,460,468,476,484,492,500,508,516,524,532,], 
		["Damage %",150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,620,630,640,650,660,670,680,690,700,710,720,730,740,], 
		["Physical Pierce %",5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123,], 
		["Physical Damage Resistance %",-5,-6,-7,-8,-9,-10,-11,-12,-13,-14,-15,-16,-17,-18,-19,-20,-21,-22,-23,-24,-25,-26,-27,-28,-29,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,-30,], 
]};
/*[21] Stun				*/ var d321 = {values:[
		["Damage",], 
		["Attack %",55,70,85,100,115,130,145,160,175,190,205,220,235,250,265,280,295,310,325,340,355,370,385,400,415,430,445,460,475,490,505,520,535,550,565,580,595,610,625,640,655,670,685,700,715,730,745,760,775,790,805,820,835,850,865,880,895,910,925,940,], 
		["Duration (seconds)",1.6,1.8,2,2.2,2.4,2.6,2.8,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,], 
]};
/*[22] Leap				*/ var d331 = {values:[
		["Knockback Radius (yards)",5.3,6,6.6,7.3,8,8.6,9.3,10,10,10,10,10,10,10,10,10,10,10,10,10,], 
		["Leap Distance (yards)",8.6,10,11.3,12,13.3,14,14,14.6,15.3,15.3,16,16.6,16.6,16.6,16.6,17.3,17.3,17.3,17.3,17.3,18,18,18,18,18,18,18.6,18.6,18.6,18.6,18.6,18.6,18.6,18.6,18.6,18.6,18.6,19.3,19.3,19.3,19.3,19.3,19.3,19.3,19.3,19.3,19.3,19.3,19.3,19.3,19.3,19.3,19.3,19.3,19.3,19.3,19.3,19.3,19.3,20,], 
]};
/*[23] Double Throw		*/ var d333 = {values:[
		["Damage %",45,51,57,63,69,75,81,87,93,99,105,111,117,123,129,135,141,147,153,159,165,171,177,183,189,195,201,207,213,219,225,231,237,243,249,255,261,267,273,279,285,291,297,303,309,315,321,327,333,339,345,351,357,363,369,375,381,387,393,399,], 
		["Bounces",3,3,4,4,4,5,5,5,6,6,6,7,7,7,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,], 
		["Attack %",35,45,55,65,75,85,95,105,115,125,135,145,155,165,175,185,195,205,215,225,235,245,255,265,275,285,295,305,315,325,335,345,355,365,375,385,395,405,415,425,435,445,455,465,475,485,495,505,515,525,535,545,555,565,575,585,595,605,615,625,], 
		["Mana Cost",3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,14,14,15,15,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,30,30,31,31,32,32,], 
]};
/*[24] Bash				*/ var d311 = {values:[
		["Attack %",35,55,75,95,115,135,155,175,195,215,235,255,275,295,315,335,355,375,395,415,435,455,475,495,515,535,555,575,595,615,635,655,675,695,715,735,755,775,795,815,835,855,875,895,915,935,955,975,995,1015,1035,1055,1075,1095,1115,1135,1155,1175,1195,1215,], 
		["Damage %",50,62,74,86,98,110,122,134,146,158,170,182,194,206,218,230,242,254,266,278,290,302,314,326,338,350,362,374,386,398,410,422,434,446,458,470,482,494,506,518,530,542,554,566,578,590,602,614,626,638,650,662,674,686,698,710,722,734,746,758,], 
		["Damage",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,], 
		["Mana Cost",2,2.2,2.5,2.7,3,3.2,3.5,3.7,4,4.2,4.5,4.7,5,5.2,5.5,5.7,6,6.2,6.5,6.7,7,7.2,7.5,7.7,8,8.2,8.5,8.7,9,9.2,9.5,9.7,10,10.2,10.5,10.7,11,11.2,11.5,11.7,12,12.2,12.5,12.7,13,13.2,13.5,13.7,14,14.2,14.5,14.7,15,15.2,15.5,15.7,16,16.2,16.5,16.7,], 
]};
/*[25] Leap Attack		*/ var d351 = {values:[
		["Damage %",10,18,26,34,42,50,58,66,74,82,90,98,106,114,122,130,138,146,154,162,170,178,186,194,202,210,218,226,234,242,250,258,266,274,282,290,298,306,314,322,330,338,346,354,362,370,378,386,394,402,410,418,426,434,442,450,458,466,474,482,], 
		["Mana Cost",7,7.2,7.5,7.7,8,8.2,8.5,8.7,9,9.2,9.5,9.7,10,10.2,10.5,10.7,11,11.2,11.5,11.7,12,12.2,12.5,12.7,13,13.2,13.5,13.7,14,14.2,14.5,14.7,15,15.2,15.5,15.7,16,16.2,16.5,16.7,17,17.2,17.5,17.7,18,18.2,18.5,18.7,19,19.2,19.5,19.7,20,20.2,20.5,20.7,21,21.2,21.5,21.7,], 
]};
/*[26]*/
/*[27] Whirlwind		*/ var d362 = {values:[
		["Velocity %",0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,65,], 
		["Damage %",25,29,33,37,41,45,49,53,57,61,65,69,73,77,81,85,89,93,97,101,105,109,113,117,121,125,129,133,137,141,145,149,153,157,161,165,169,173,177,181,185,189,193,197,201,205,209,213,217,221,225,229,233,237,241,245,249,253,257,261,], 
		["Attack %",80,84,88,92,96,100,104,108,112,116,120,124,128,132,136,140,144,148,152,156,160,164,168,172,176,180,184,188,192,196,200,204,208,212,216,220,224,228,232,236,240,244,248,252,256,260,264,268,272,276,280,284,288,292,296,300,304,308,312,316,], 
		["Mana Cost",12.5,13,13.5,14,14.5,15,15.5,16,16.5,17,17.5,18,18.5,19,19.5,20,20.5,21,21.5,22,22.5,23,23.5,24,24.5,25,25,26,26,27,27,28,28,29,29,30,30,31,31,32,32,33,33,34,34,35,35,36,36,37,37,38,38,39,39,40,40,41,41,42,], 
]};
/*[28] Double Swing		*/ var d323 = {values:[
		["Damage",0,14,28,42,56,70,84,98,112,126,140,154,168,182,196,210,224,238,252,266,280,294,308,322,336,350,364,378,392,406,420,434,448,462,476,490,504,518,532,546,560,574,588,602,616,630,644,658,672,686,700,714,728,742,756,770,784,798,812,826,], 
		["Attack %",20,32,44,56,68,80,92,104,116,128,140,152,164,176,188,200,212,224,236,248,260,272,284,296,308,320,332,344,356,368,380,392,404,416,428,440,452,464,476,488,500,512,524,536,548,560,572,584,596,608,620,632,644,656,668,680,692,704,716,728,], 
		["Mana Cost",1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,11,11,11,11,12,12,12,12,13,13,13,13,14,14,14,14,15,15,15,15,], 
]};

var skills_pd2_barbarian = [
{data:d111, key:"111", code:128, name:"Howl", i:0, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, bindable:1, description:"Sends nearby monsters<br>scrambling away in fear", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Enemy runs up to "," yards<br>Enemy runs for 3 seconds<br>Mana Cost: 4",""]},
{data:d113, key:"113", code:129, name:"Find Potion", i:1, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, bindable:1, description:"Use on the corpse of a slain monster<br>for a chance to find a potion", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:[""," percent chance<br>Mana Cost: 1",""]},
{data:d142, key:"142", code:130, name:"Taunt", i:2, req:[8,0], reqlvl:18, level:0, extra_levels:0, force_levels:0, bindable:1, description:"Enrages a monster into relentlessly attacking", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Target's Damage: "," percent<br>Target's Attack: "," percent<br>Mana Cost: 3",""]},
{data:d121, key:"121", code:131, name:"Shout", i:3, req:[0], reqlvl:6, level:0, extra_levels:0, force_levels:0, effect:0, bindable:1, description:"Warns of impending danger and improves the defense<br>rating of you and your party", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Defense: +"," percent<br>Duration: 300 seconds<br>Mana Cost: 6",""]},
{data:d133, key:"133", code:132, name:"Find Item", i:4, req:[1], reqlvl:12, level:0, extra_levels:0, force_levels:0, bindable:1, description:"Use on the corpse of a slain monster<br>to find hidden treasures", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:[""," percent chance<br>Mana Cost: 7",""]},
{data:d162, key:"162", code:133, name:"Battle Cry", i:5, req:[6,3,2,8,0], reqlvl:18, level:0, extra_levels:0, force_levels:0, bindable:1, description:"Fearsome cry that decreases<br>enemies' defense rating and physical resistance", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Duration: "," seconds<br>Defense: "," percent<br>Physical Damage Resistance: "," percent<br>Mana Cost: 5",""]},
{data:d151, key:"151", code:134, name:"Battle Orders", i:6, req:[3,0], reqlvl:24, level:0, extra_levels:0, force_levels:0, effect:0, bindable:1, description:"Improves the maximum mana, life and<br>stamina of you and your party", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Duration: 300 seconds<br>Max Life: "," percent<br>Max Mana: "," percent<br>Mana Cost: 7",""]},
{data:d153, key:"153", code:135, name:"Grim Ward", i:7, req:[2,8,0], reqlvl:24, level:0, extra_levels:0, force_levels:0, bindable:1, description:"Use on the corpse of a slain monster<br>to create a frightening totem<br>that increases damage and attack rating<br>for you and your party", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["+"," Attack Rating<br>Damage: +"," percent<br>Duration: 40 seconds<br>Radius: "," yards<br>Mana Cost: 4",""]},
{data:d122, key:"122", code:136, name:"War Cry", i:8, req:[0], reqlvl:6, level:0, extra_levels:0, force_levels:0, bindable:2, damaging:{attack:0,spell:1}, description:"Injures all nearby enemies", syn_title:"<br>War Cry Receives Bonuses From:<br>", syn_text:"Howl: +18% Damage per Level<br>Battle Cry: +18% Damage per Level<br>Taunt: +12% Damage per Level<br>Shout: +12% Damage per Level<br>Battle Command: +12% Damage per Level<br>Battle Orders: +12% Damage per Level", graytext:"", index:[0,""], text:["Damage: ","-","<br>Radius: "," yards<br>Mana Cost: ",""]},
{data:d161, key:"161", code:137, name:"Battle Command", i:9, req:[6,3,0], reqlvl:30, level:0, extra_levels:0, force_levels:0, effect:0, bindable:1, description:"Increases all current skill levels for you and your party", syn_title:"", syn_text:"", graytext:"", index:[1,""], text:["Grants an Additional Skill Level every 10 Base Levels<br>Bonus Skills: ","Damage: +"," percent<br>Duration: 300 seconds<br>Mana Cost: 11",""]},

{data:d211, key:"211", code:138, name:"General Mastery", i:10, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, effect:0, bindable:0, description:"Passive - Improves sword, axe and mace fighting skill", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Damage: +"," percent<br>Attack: +"," percent<br>"," percent chance of Critical Strike",""]},
{data:d222, key:"222", code:139, name:"Polearm and Spear Mastery", i:11, req:[], reqlvl:6, level:0, extra_levels:0, force_levels:0, effect:0, bindable:0, description:"Passive - Improves pole arm and spear skill", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Damage: +"," percent<br>Attack: +"," percent<br>"," percent chance of Critical Strike",""]},
/*TODO: remove*/{data:d213, key:"213", code:263, name:"None", i:12, req:[], reqlvl:100, level:0, extra_levels:0, force_levels:0, bindable:0, description:"", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:[""]},
{data:d213, key:"213", code:141, name:"Throwing Mastery", i:13, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, effect:0, bindable:0, description:"Passive - Improves thrown weapon skill", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Pierce: +"," percent<br>Damage: +"," percent<br>Attack: +"," percent<br>"," percent chance of Critical Strike",""]},
{data:d231, key:"231", code:142, name:"Combat Reflexes", i:14, req:[], reqlvl:12, level:0, extra_levels:0, force_levels:0, effect:0, bindable:0, description:"Passive - Increases stamina, hit recovery, and life", syn_title:"", syn_text:"", graytext:"", index:[1," life"], text:["Increases Max HP By 20 Every Base Level<br>Max Life: ","","% faster hit recovery<br>Stamina Bonus: +"," percent",""]},
{data:d243, key:"243", code:143, name:"Iron Skin", i:15, req:[], reqlvl:18, level:0, extra_levels:0, force_levels:0, effect:0, bindable:0, description:"Passive - Improves defense rating", syn_title:"", syn_text:"", graytext:"", index:[1," percent"], text:["Increases Physical Damage Reduction<br>by 1% Every 2 Base Levels<br>Physical Damage Reduction: ","+"," percent",""]},
{data:d251, key:"251", code:144, name:"Increased Speed", i:16, req:[14], reqlvl:24, level:0, extra_levels:0, force_levels:0, effect:0, bindable:0, description:"Passive - Increases walk and run speed", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Walk/Run Speed: +"," percent",""]},
{data:d263, key:"263", code:145, name:"Natural Resistance", i:17, req:[15], reqlvl:30, level:0, extra_levels:0, force_levels:0, effect:0, bindable:0, description:"Passive - Increases natural resistances<br>to elemental and poison damage", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Resistances: +"," percent",""]},

{data:d312, key:"323", code:146, name:"Frenzy", i:18, req:[28], reqlvl:6, reqWeapon:["axe","mace","club","hammer","sword","dagger","thrown","javelin","scepter","wand"], level:0, extra_levels:0, force_levels:0, effect:0, bindable:2, damaging:{attack:1,spell:0}, description:"Allows you to swing two weapons at once<br>East successful attack increases your overall speed<br>Requires you to equip two weapons", syn_title:"<br>Frenzy Receives Bonuses From:<br>", syn_text:"Double Swing: +6% Damage per Level<br>Stun: +6% Damage per Level", graytext:"", index:[0,""], text:["Duration: "," seconds<br>Damage: +"," percent<br>Attack: +"," percent<br>Attack Speed: +","-"," percent<br>Walk/Run Speed: +","-"," percent<br>Mana Cost: ",""]},
{data:d332, key:"332", code:147, name:"Concentrate", i:19, req:[28], reqlvl:18, reqWeapon:["axe","mace","club","hammer","sword","dagger","thrown","javelin","scepter","wand","staff","spear","polearm"], level:0, extra_levels:0, force_levels:0, bindable:2, damaging:{attack:1,spell:0}, description:"Attack that is not interruptible and<br>improves attack and defense rating and<br>converts physical damage to magic damage", syn_title:"<br>Concentrate Receives Bonuses From:<br>", syn_text:"Bash: +6% Damage per Level<br>Battle Command: +6% Damage per Level<br>Bash: +1% Magic Damage per Level", graytext:"", index:[1," percent"], text:["Converts 2% of Physical Damage to Magic Damage per Base Level<br>Magic Damage: +","Defense Bonus: +"," percent<br>Attack: +"," percent<br>Damage: +"," percent<br>Mana Cost: 2",""]},
{data:d352, key:"352", code:148, name:"Berserk", i:20, req:[19,28], reqlvl:24, reqWeapon:["axe","mace","club","hammer","sword","dagger","thrown","javelin","scepter","wand","staff","spear","polearm"], level:0, extra_levels:0, force_levels:0, bindable:2, damaging:{attack:1,spell:1}, description:"A powerful but reckless attack that<br>increases damage and attack rating but decreases<br>defense rating and physical damage resistance<br>Requires you to equip two weapons<br><br>Duration: 0.5 seconds", syn_title:"<br>Berserk Receives Bonuses From:<br>", syn_text:"Taunt: +8% Damage per Level<br>Combat Reflexes: +8% Damage per Level", graytext:"", index:[0,""], text:["Attack: +"," percent<br>Damage: +"," percent<br>Physical Pierce: +"," percent<br>Physical Damage Resistance: "," percent<br>Mana Cost: 4"]},
{data:d321, key:"321", code:149, name:"Stun", i:21, req:[24], reqlvl:6, reqWeapon:["axe","mace","club","hammer","sword","dagger","thrown","javelin","scepter","wand","staff","spear","polearm"], level:0, extra_levels:0, force_levels:0, bindable:2, damaging:{attack:1,spell:0}, description:"Stuns your target for a short time<br>and increases your attack rating", syn_title:"<br>Stun Receives Bonuses From:<br>", syn_text:"Bash: +8% Damage per Level<br>Concentrate: +5% Attack Rating per Level<br>War Cry +5% Duration per Level", graytext:"", index:[1," percent"], text:["Damage: +","Attack: +"," percent<br>Duration: "," seconds<br>Mana Cost: 2",""]},
{data:d331, key:"331", code:150, name:"Leap", i:22, req:[21,24], reqlvl:12, level:0, extra_levels:0, force_levels:0, bindable:2, description:"Leaps away from danger<br>or into the fray", syn_title:"", syn_text:"", graytext:"", index:[1," yards"], text:["Knockback Radius: ","Leap Distance: "," yards<br>Mana Cost: 20"]},
{data:d333, key:"333", code:151, name:"Double Throw", i:23, req:[28,18], reqlvl:18, reqWeapon:["thrown","javelin"], level:0, extra_levels:0, force_levels:0, effect:0, bindable:2, damaging:{attack:2,spell:0}, description:"Allows you to throw two different<br>throwing weapons at the same time<br>Weapons bounce to nearby enemies", syn_title:"<br>Double Throw Receives Bonuses From:<br>", syn_text:"Double Swing: +5% Damage per Level", graytext:"", index:[0,""], text:["First Hit Bonus Damage: +10 percent<br>Damage: +"," percent<br>"," bounces<br>To Attack Rating: +"," percent<br>Mana Cost: ",""]},
{data:d311, key:"311", code:152, name:"Bash", i:24, req:[], reqlvl:1, reqWeapon:["axe","mace","club","hammer","sword","dagger","thrown","javelin","scepter","wand","staff","spear","polearm"], level:0, extra_levels:0, force_levels:0, bindable:2, damaging:{attack:1,spell:0}, description:"Powerful blow that has a chance to knock back enemies", syn_title:"<br>Bash Receives Bonuses From:<br>", syn_text:"Stun: +10% Damage per Level<br>Berserk: +10% Damage per Level<br>Concentrate: +10% Attack Rating per Level", graytext:"", index:[0,""], text:["Attack: +"," percent<br>Damage: +"," percent<br>Damage: +","<br>Mana Cost: ",""]},
{data:d351, key:"351", code:153, name:"Leap Attack", i:25, req:[22,21,24,19,28], reqlvl:24, reqWeapon:["axe","mace","club","hammer","sword","dagger","thrown","javelin","scepter","wand","staff","spear","polearm"], level:0, extra_levels:0, force_levels:0, bindable:1, damaging:{attack:1,spell:0}, description:"Leaps to and attacks enemies<br>in a radius upon landing", syn_title:"<br>Leap Attack Receives Bonuses From:<br>", syn_text:"Leap: +8% Damage per Level<br>Bash: +8% Damage per Level", graytext:"", index:[0,""], text:["Damage: +"," percent<br>Mana Cost: ",""]},
/*TODO: remove*/{data:d362, key:"362", code:154, name:"None", i:26, req:[], reqlvl:100, level:0, extra_levels:0, force_levels:0, bindable:0, description:"", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:[""]},
{data:d362, key:"362", code:155, name:"Whirlwind", i:27, req:[20,19,28], reqlvl:30, reqWeapon:["axe","mace","club","hammer","sword","dagger","thrown","javelin","scepter","wand","staff","spear","polearm"], level:0, extra_levels:0, force_levels:0, bindable:2, damaging:{attack:1,spell:0}, description:"A whirling dance of death<br>that cuts a path through the<br>legions of your enemies", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Velocity: +"," percent<br>Damage: "," percent<br>Attack: +"," percent<br>Mana Cost: ",""]},
{data:d323, key:"312", code:146, name:"Double Swing", i:28, req:[], reqlvl:1, reqWeapon:["axe","mace","club","hammer","sword","dagger","thrown","javelin","scepter","wand"], level:0, extra_levels:0, force_levels:0, bindable:2, damaging:{attack:1,spell:0}, description:"When two weapon are equipped<br>attacks two targets if possible,<br>or one target twice", syn_title:"<br>Double Swing Receives Bonuses From:<br>", syn_text:"Frenzy: +8% Damage per Level", graytext:"", index:[0,""], text:["Damage: +"," percent<br>Attack: +"," percent<br>Mana Cost: ",""]},
];

/*
Barbarian S3 Changes

* Berserk now uses frenzy animation and requires two weapons
* Berserk now applies its physical pierce modifier to its splash damage
* Berserk’s attack rating per level reduced from 12% to 8%
* Berserk’s starting attack rating reduced from 240% to 60%

* Double swing now gains 14% enhanced damage per level
* Double swing is now a level 1 skill (it has swapped places with where frenzy previously was)
* Double swing’s frenzy synergy has been reduced from 14% per level to 8% per level
* Double swing now cost 1 mana at level 1 instead of 4
* Double swing mana cost now increases by 0.25 per level from .5
* Double swings base attack rating reduced from 75% to 20% 
* Double swings attack rating per level reduced from 20% to 12%

* Frenzy is now a level 6 skill and has swapped places with double swing on the skill tree
* Frenzy mana cost now increases by 0.25 per level
* Frenzy’s attack rating per level reduced from 18% to 10%

* Concentrate’s base attack rating reduced from 180% to 40%
* Concentrate’s attack rating per level increased from 10% to 12%

* Leap attack aoe increased by roughly 16%
* Leap attack now starts at maximum leap speed
* Leap attack no longer gains leap speed per level
* Leap attack now leeches at ½ efficiency instead of ¼ 

* Leap now starts at maximum leap speed
* Leap no longer gains leap speed per level
* Leap mana cost increased from 8 to 20

* Double throw damage per level reduced from 12% to 8%
* Double throw synergy reduced from 8% to 6%
* Double throw attack rating per level reduced from 15% to 10%
* Double throw’s base attack rating reduced from 175% to 35%

* Whirlwinds base attack rating reduced from 240% to 80%
* Whirlwinds attack rating per level reduced from 5% to 4%

* Spear and polearm mastery 16% attack rating per level reduced to 10%

* General mastery 16% attack rating per level reduced to 10%

* Throwing mastery 16% attack rating per level reduced to 10%

* Combat reflexes gains 20 life per base point instead of 10

* Grim ward can now be cast at range instead of melee
* Grim ward level 1 aura range increased from 16 to 25 (10.6 yards to 16.6 yards?)
* Grim ward aura range per level has been doubled

* Battle cry aoe travel speed increased by 25% (this also results in a slightly larger aoe)
* Battle cry -defense % per level reduced from 2% to 1%

* Howl now lasts 3 seconds at all levels (was already changed?)

* Taunt is now an aoe shout skill instead of single target (overridden)


Beta Patch 1
* Taunt has been temporarily disabled while we work to fix a bug

Beta Patch 2
* Leap attack reduced from 10% damage per level to 8%

Beta Patch 3
* Double throw base damage bonus reduced from 55% to 45%
* Double throw damage per level reduced from 8% to 6%
* Double throw synergies reduced from 6% to 5%

* Leap attack synergies reduced from 10% to 8%
* Leap attack now leeches at 1/3rd instead of 1/2

* Berserk now properly swings with two attacks

* Reverted taunt to original LoD (we don't have time to troubleshoot our new taunt and will have to bring it back in season 4)

*/