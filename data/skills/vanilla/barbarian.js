
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
		if (skill.name == "Shout" && elem == 1) { 			result += (5*skills[6].level + 5*skills[9].level) }
		if (skill.name == "Battle Orders" && elem == 0) { 	result += (5*skills[3].level + 5*skills[9].level) }
		if (skill.name == "Battle Command" && elem == 0) { 	result += (5*skills[3].level + 5*skills[6].level) }
		
		if (skill.name == "Bash" && elem == 0) { 			result += (10*skills[22].level) }
		if (skill.name == "Bash" && elem == 1) { 			result += (10*skills[24].level) }
		if (skill.name == "Stun" && elem == 0) { 			result = 8*skills[20].level }
		if (skill.name == "Stun" && elem == 1) { 			result += (5*skills[22].level) }
		if (skill.name == "Stun" && elem == 2) { 			result = Math.min(10,(result * (1 + 0.05*skills[8].level))) }
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
		["Defense +%",100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,620,630,640,650,660,670,680,690,], 
		["Duration",20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,], 
]};
/*[ 4] Find Item		*/ var d133 = {values:[
		["% Chance",13,19,24,29,32,35,37,39,41,42,44,45,46,47,47,49,49,50,50,51,51,52,52,53,53,53,54,54,55,55,55,55,56,56,56,56,56,57,57,57,57,57,57,57,58,58,58,58,58,58,58,58,58,59,59,59,59,59,59,60,], 
]};
/*[ 5] Battle Cry		*/ var d141 = {values:[
		["Duration (seconds)",12,14.4,16.8,19.2,21.6,24,26.4,28.8,31.2,33.6,36,38.4,40.8,43.2,45.6,48,50.4,52.8,55.2,57.6,60,62.4,64.8,67.2,69.6,72,74.4,76.8,79.2,81.6,84,86.4,88.8,91.2,93.6,96,98.4,100.8,103.2,105.6,108,110.4,112.8,115.2,117.6,120,122.4,124.8,127.2,129.6,132,134.4,136.8,139.2,141.6,144,146.4,148.8,151.2,153.6,], 
		["Defense %",-50,-52,-54,-56,-58,-60,-62,-64,-66,-68,-70,-72,-74,-76,-78,-80,-82,-84,-86,-88,-90,-92,-94,-96,-98,-100,-102,-104,-106,-108,-110,-112,-114,-116,-118,-120,-122,-124,-126,-128,-130,-132,-134,-136,-138,-140,-142,-144,-146,-148,-150,-152,-154,-156,-158,-160,-162,-164,-166,-168,], 
		["Damage Reduction",-25,-26,-27,-28,-29,-30,-31,-32,-33,-34,-35,-36,-37,-38,-39,-40,-41,-42,-43,-44,-45,-46,-47,-48,-49,-50,-51,-52,-53,-54,-55,-56,-57,-58,-59,-60,-61,-62,-63,-64,-65,-66,-67,-68,-69,-70,-71,-72,-73,-74,-75,-76,-77,-78,-79,-80,-81,-82,-83,-84,], 
]};
/*[ 6] Battle Orders	*/ var d152 = {values:[
		["Duration",30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,620,], 
		["Max Stamina",35,38,41,44,47,50,53,56,59,62,65,68,71,74,77,80,83,86,89,92,95,98,101,104,107,110,113,116,119,122,125,128,131,134,137,140,143,146,149,152,155,158,161,164,167,170,173,176,179,182,185,188,191,194,197,200,203,206,209,212,], 
		["Max Life",35,38,41,44,47,50,53,56,59,62,65,68,71,74,77,80,83,86,89,92,95,98,101,104,107,110,113,116,119,122,125,128,131,134,137,140,143,146,149,152,155,158,161,164,167,170,173,176,179,182,185,188,191,194,197,200,203,206,209,212,], 
		["Max Mana",35,38,41,44,47,50,53,56,59,62,65,68,71,74,77,80,83,86,89,92,95,98,101,104,107,110,113,116,119,122,125,128,131,134,137,140,143,146,149,152,155,158,161,164,167,170,173,176,179,182,185,188,191,194,197,200,203,206,209,212,], 
]};
/*[ 7] Grim Ward		*/ var d153 = {values:[
		["Radius (yards)",2,2.6,3.3,4,4.6,5.3,6,6.6,7.3,8,8.6,9.3,10,10.6,11.3,12,12.6,13.3,14,14.6,15.3,16,16.6,17.3,18,18.6,19.3,20,20.6,21.3,22,22.6,23.3,24,24.6,25.3,26,26.6,27.3,28,28.6,29.3,30,30.6,31.3,32,32.6,33.3,34,34.6,35.3,36,36.6,37.3,38,38.6,39.3,40,40.6,41.3,], 
]};
/*[ 8] War Cry			*/ var d161 = {values:[
		["Damage min",20,26,32,38,44,50,56,62,69,76,83,90,97,104,111,118,126,134,142,150,158,166,175,184,193,202,211,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,], 
		["Damage max",30,36,42,48,54,60,66,72,79,86,93,100,107,114,121,128,136,144,152,160,168,176,185,194,203,212,221,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,], 
		["Stun Length",1,1.2,1.4,1.6,1.8,2,2.2,2.4,2.6,2.8,3,3.2,3.4,3.6,3.8,4,4.2,4.4,4.6,4.8,5,5.2,5.4,5.6,5.8,6,6.2,6.4,6.6,6.8,7,7.2,7.4,7.6,7.8,8,8.2,8.4,8.6,8.8,9,9.2,9.4,9.6,9.8,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,], 
		["Mana Cost",10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,], 
]};
/*[ 9] Battle Command	*/ var d162 = {values:[
		["Duration",5,15,25,35,45,55,65,75,85,95,105,115,125,135,145,155,165,175,185,195,205,215,225,235,245,255,265,275,285,295,305,315,325,335,345,355,365,375,385,395,405,415,425,435,445,455,465,475,485,495,505,515,525,535,545,555,565,575,585,595,], 
]};

/*[10] Sword Mastery	*/ var d211 = {values:[
		["Damage +%",28,33,38,43,48,53,58,63,68,73,78,83,88,93,98,103,108,113,118,123,128,133,138,143,148,153,158,163,168,173,178,183,188,193,198,203,208,213,218,223,228,233,238,243,248,253,258,263,268,273,278,283,288,293,298,303,308,313,318,323,], 
		["Attack +%",28,36,44,52,60,68,76,84,92,100,108,116,124,132,140,148,156,164,172,180,188,196,204,212,220,228,236,244,252,260,268,276,284,292,300,308,316,324,332,340,348,356,364,372,380,388,396,404,412,420,428,436,444,452,460,468,476,484,492,500,], 
		["Chance of Critical Strike %",5,9,12,15,17,19,20,21,23,23,24,25,26,26,27,28,28,28,29,29,29,30,30,30,30,31,31,31,31,31,32,32,33,32,32,32,32,33,33,33,33,33,33,33,33,33,33,33,34,34,34,34,34,34,34,34,34,34,34,35,], 
]};
/*[11] Axe Mastery		*/ var d212 = {values:[
		["Damage +%",28,33,38,43,48,53,58,63,68,73,78,83,88,93,98,103,108,113,118,123,128,133,138,143,148,153,158,163,168,173,178,183,188,193,198,203,208,213,218,223,228,233,238,243,248,253,258,263,268,273,278,283,288,293,298,303,308,313,318,323,], 
		["Attack +%",28,36,44,52,60,68,76,84,92,100,108,116,124,132,140,148,156,164,172,180,188,196,204,212,220,228,236,244,252,260,268,276,284,292,300,308,316,324,332,340,348,356,364,372,380,388,396,404,412,420,428,436,444,452,460,468,476,484,492,500,], 
		["Chance of Critical Strike %",5,9,12,15,17,19,20,21,23,23,24,25,26,26,27,28,28,28,29,29,29,30,30,30,30,31,31,31,31,31,32,32,33,32,32,32,32,33,33,33,33,33,33,33,33,33,33,33,34,34,34,34,34,34,34,34,34,34,34,35,], 
]};
/*[12] Mace Mastery		*/ var d213 = {values:[
		["Damage +%",28,33,38,43,48,53,58,63,68,73,78,83,88,93,98,103,108,113,118,123,128,133,138,143,148,153,158,163,168,173,178,183,188,193,198,203,208,213,218,223,228,233,238,243,248,253,258,263,268,273,278,283,288,293,298,303,308,313,318,323,], 
		["Attack +%",28,36,44,52,60,68,76,84,92,100,108,116,124,132,140,148,156,164,172,180,188,196,204,212,220,228,236,244,252,260,268,276,284,292,300,308,316,324,332,340,348,356,364,372,380,388,396,404,412,420,428,436,444,452,460,468,476,484,492,500,], 
		["Chance of Critical Strike %",5,9,12,15,17,19,20,21,23,23,24,25,26,26,27,28,28,28,29,29,29,30,30,30,30,31,31,31,31,31,32,32,33,32,32,32,32,33,33,33,33,33,33,33,33,33,33,33,34,34,34,34,34,34,34,34,34,34,34,35,], 
]};
/*[13] Polearm Mastery	*/ var d221 = {values:[
		["Damage +%",28,33,38,43,48,53,58,63,68,73,78,83,88,93,98,103,108,113,118,123,128,133,138,143,148,153,158,163,168,173,178,183,188,193,198,203,208,213,218,223,228,233,238,243,248,253,258,263,268,273,278,283,288,293,298,303,308,313,318,323,], 
		["Attack +%",30,38,46,54,62,70,78,86,94,102,110,118,126,134,142,150,158,166,174,182,190,198,206,214,222,230,238,246,254,262,270,278,286,294,302,310,318,326,334,342,350,358,366,374,382,390,398,406,414,422,430,438,446,454,462,470,478,486,494,502,], 
		["Chance of Critical Strike %",5,9,12,15,17,19,20,21,23,23,24,25,26,26,27,28,28,28,29,29,29,30,30,30,30,31,31,31,31,31,32,32,32,32,32,32,32,33,33,33,33,33,33,33,33,33,33,33,34,34,34,34,34,34,34,34,34,34,34,35,], 
]};
/*[14] Throwing Mastery	*/ var d222 = {values:[
		["Damage +%",28,33,38,43,48,53,58,63,68,73,78,83,88,93,98,103,108,113,118,123,128,133,138,143,148,153,158,163,168,173,178,183,188,193,198,203,208,213,218,223,228,233,238,243,248,253,258,263,268,273,278,283,288,293,298,303,308,313,318,323,], 
		["Attack +%",30,38,46,54,62,70,78,86,94,102,110,118,126,134,142,150,158,166,174,182,190,198,206,214,222,230,238,246,254,262,270,278,286,294,302,310,318,326,334,342,350,358,366,374,382,390,398,406,414,422,430,438,446,454,462,470,478,486,494,502,], 
		["Chance of Critical Strike %",5,9,12,15,17,19,20,21,23,23,24,25,26,26,27,28,28,28,29,29,29,30,30,30,30,31,31,31,31,31,32,32,32,32,32,32,32,33,33,33,33,33,33,33,33,33,33,33,34,34,34,34,34,34,34,34,34,34,34,35,], 
]};
/*[15] Spear Mastery	*/ var d223 = {values:[
		["Damage +%",28,33,38,43,48,53,58,63,68,73,78,83,88,93,98,103,108,113,118,123,128,133,138,143,148,153,158,163,168,173,178,183,188,193,198,203,208,213,218,223,228,233,238,243,248,253,258,263,268,273,278,283,288,293,298,303,308,313,318,323,], 
		["Attack +%",30,38,46,54,62,70,78,86,94,102,110,118,126,134,142,150,158,166,174,182,190,198,206,214,222,230,238,246,254,262,270,278,286,294,302,310,318,326,334,342,350,358,366,374,382,390,398,406,414,422,430,438,446,454,462,470,478,486,494,502,], 
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
		["Attack %",20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,115,120,125,130,135,140,145,150,155,160,165,170,175,180,185,190,195,200,205,210,215,220,225,230,235,240,245,250,255,260,265,270,275,280,285,290,295,300,305,310,315,], 
		["Damage %",50,55,60,65,70,75,80,85,90,95,100,105,110,115,120,125,130,135,140,145,150,155,160,165,170,175,180,185,190,195,200,205,210,215,220,225,230,235,240,245,250,255,260,265,270,275,280,285,290,295,300,305,310,315,320,325,330,335,340,345,], 
		["Damage",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,], 
]};
/*[21] Double Swing		*/ var d323 = {values:[
		["Damage",], 
		["Attack %",15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,115,120,125,130,135,140,145,150,155,160,165,170,175,180,185,190,195,200,205,210,215,220,225,230,235,240,245,250,255,260,265,270,275,280,285,290,295,300,305,310,], 
		["Mana Cost",1,0.875,0.75,0.625,0.5,0.375,0.25,0.125,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,], 
]};
/*[22] Concentrate		*/ var d342 = {values:[
		["Magic Damage %",], 
		["Defense Bonus %",100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,620,630,640,650,660,670,680,690,], 
		["Attack %",60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,620,630,640,650,], 
		["Damage %",70,75,80,85,90,95,100,105,110,115,120,125,130,135,140,145,150,155,160,165,170,175,180,185,190,195,200,205,210,215,220,225,230,235,240,245,250,255,260,265,270,275,280,285,290,295,300,305,310,315,320,325,330,335,340,345,350,355,360,365,], 
]};
/*[23] Berserk			*/ var d362 = {values:[
		["Attack %",100,115,130,145,160,175,190,205,220,235,250,265,280,295,310,325,340,355,370,385,400,415,430,445,460,475,490,505,520,535,550,565,580,595,610,625,640,655,670,685,700,715,730,745,760,775,790,805,820,835,850,865,880,895,910,925,940,955,970,985,], 
		["Magic Damage %",150,165,180,195,210,225,240,255,270,285,300,315,330,345,360,375,390,405,420,435,450,465,480,495,510,525,540,555,570,585,600,615,630,645,660,675,690,705,720,735,750,765,780,795,810,825,840,855,870,885,900,915,930,945,960,975,990,1005,1020,1035,], 
		["Debuff Duration (seconds)",2.72,2.48,2.28,2.12,2,1.92,1.84,1.76,1.68,1.64,1.6,1.56,1.52,1.48,1.44,1.4,1.4,1.36,1.36,1.32,1.32,1.28,1.28,1.24,1.24,1.24,1.2,1.2,1.2,1.2,1.16,1.16,1.16,1.16,1.16,1.12,1.12,1.12,1.12,1.12,1.12,1.08,1.08,1.08,1.08,1.08,1.08,1.08,1.04,1.04,1.04,1.04,1.04,1.04,1.04,1.04,1.04,1.04,1.04,1,], 
]};
/*[24] Stun				*/ var d332 = {values:[
		["Damage %",], 
		["Attack %",55,70,85,100,115,130,145,160,175,190,205,220,235,250,265,280,295,310,325,340,355,370,385,400,415,430,445,460,475,490,505,520,535,550,565,580,595,610,625,640,655,670,685,700,715,730,745,760,775,790,805,820,835,850,865,880,895,910,925,940,], 
		["Duration (seconds)",1.2,1.4,1.6,1.8,2,2.2,2.4,2.6,2.8,3,3.2,3.4,3.6,3.8,4,4.2,4.28,4.36,4.44,4.52,4.6,4.68,4.76,4.84,4.92,5,5.08,5.16,5.24,5.32,5.4,5.48,5.56,5.64,5.72,5.8,5.88,5.96,6.04,6.12,6.2,6.28,6.36,6.44,6.52,6.6,6.68,6.76,6.84,6.92,7,7.08,7.16,7.24,7.32,7.4,7.48,7.56,7.64,7.72,], 
]};
/*[25] Leap				*/ var d321 = {values:[
		["Leap Radius",4.6,7.3,8.6,10,11.3,12,12.6,13.3,14,14,14.6,14.6,15.3,16,16,16,16.6,16.6,16.6,16.6,17.3,17.3,17.3,17.3,17.3,18,18,18,18,18,18,18,18.6,18.6,18.6,18.6,18.6,18.6,18.6,18.6,18.6,18.6,18.6,18.6,19.3,19.3,19.3,19.3,19.3,19.3,19.3,19.3,19.3,19.3,19.3,19.3,19.3,19.3,19.3,20,], 
	//	["Knockback Radius",2.6,3.3,4,4.6,5.3,6,6.6,7.3,8,8.6,9.3,10,10.6,11.3,12,12.6,13.3,14,14.6,15.3,16,16.6,17.3,18,18.6,19.3,20,20.6,21.3,22,22.6,23.3,24,24.6,25.3,26,26.6,27.3,28,28.6,29.3,30,30.6,31.3,32,32.6,33.3,34,34.6,35.3,36,36.6,37.3,38,38.6,39.3,40,40.6,41.3,42,], 
]};
/*[26] Double Throw		*/ var d333 = {values:[
		["Damage %",], 
		["Attack %",20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390,400,410,420,430,440,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,610,], 
]};
/*[27] Leap Attack		*/ var d341 = {values:[
		["Damage %",100,130,160,190,220,250,280,310,340,370,400,430,460,490,520,550,580,610,640,670,700,730,760,790,820,850,880,910,940,970,1000,1030,1060,1090,1120,1150,1180,1210,1240,1270,1300,1330,1360,1390,1420,1450,1480,1510,1540,1570,1600,1630,1660,1690,1720,1750,1780,1810,1840,1870,], 
		["Attack %",50,65,80,95,110,125,140,155,170,185,200,215,230,245,260,275,290,305,320,335,350,365,380,395,410,425,440,455,470,485,500,515,530,545,560,575,590,605,620,635,650,665,680,695,710,725,740,755,770,785,800,815,830,845,860,875,890,905,920,935,], 
]};
/*[28] Frenzy			*/ var d353 = {values:[
		["Magic Damage %",], 
		["Damage %",90,95,100,105,110,115,120,125,130,135,140,145,150,155,160,165,170,175,180,185,190,195,200,205,210,215,220,225,230,235,240,245,250,255,260,265,270,275,280,285,290,295,300,305,310,315,320,325,330,335,340,345,350,355,360,365,370,375,380,385,], 
		["Attack %",100,107,114,121,128,135,142,149,156,163,170,177,184,191,198,205,212,219,226,233,240,247,254,261,268,275,282,289,296,303,310,317,324,331,338,345,352,359,366,373,380,387,394,401,408,415,422,429,436,443,450,457,464,471,478,485,492,499,506,513,], 
		["Attack Speed % min",7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,], 
		["Attack Speed % max",7,13,18,22,25,27,29,31,33,34,35,36,37,38,39,40,40,41,41,42,42,43,43,44,44,44,45,45,45,45,46,46,46,46,46,47,47,47,47,47,47,48,48,48,48,48,48,48,49,49,49,49,49,49,49,49,49,49,49,50,], 
		["Walk/Run Speed % min",47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,], 
		["Walk/Run Speed % max",47,68,84,99,110,119,126,131,138,142,147,151,155,158,160,164,165,167,169,171,173,174,176,178,178,180,182,182,183,183,185,185,187,187,187,189,189,191,191,191,191,192,192,192,194,194,194,194,196,196,196,196,196,198,198,198,198,198,198,200,], 
]};
/*[29] Whirlwind		*/ var d361 = {values:[
		["Damage %",-50,-42,-34,-26,-18,-10,-2,6,14,22,30,38,46,54,62,70,78,86,94,102,110,118,126,134,142,150,158,166,174,182,190,198,206,214,222,230,238,246,254,262,270,278,286,294,302,310,318,326,334,342,350,358,366,374,382,390,398,406,414,422,], 
		["Attack %",0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,105,110,115,120,125,130,135,140,145,150,155,160,165,170,175,180,185,190,195,200,205,210,215,220,225,230,235,240,245,250,255,260,265,270,275,280,285,290,295,], 
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

{data:d312, key:"312", code:152, name:"Bash", i:20, req:[], reqlvl:1, reqWeapon:["axe","mace","club","hammer","sword","dagger","thrown","javelin","scepter","wand","staff","spear","polearm"], level:0, extra_levels:0, force_levels:0, bindable:2, damaging:{attack:1,spell:0}, description:"Powerful blow that increases the damage done<br>to enemies and knocks them back", syn_title:"<br>Bash Receives Bonuses From:<br>", syn_text:"Stun: +10% Damage per Level<br>Concentrate: +10% Attack Rating per Level", graytext:"", index:[0,""], text:["Attack: +"," percent<br>Damage: +"," percent<br>Damage: +","<br>Mana Cost: 2"]},
{data:d323, key:"323", code:156, name:"Double Swing", i:21, req:[20], reqlvl:6, reqWeapon:["axe","mace","club","hammer","sword","dagger","thrown","javelin","scepter","wand"], level:0, extra_levels:0, force_levels:0, bindable:2, damaging:{attack:1,spell:0}, description:"When two weapon are equipped<br>attacks two targets if possible,<br>or one target twice", syn_title:"<br>Double Swing Receives Bonuses From:<br>", syn_text:"Bash: +10% Damage per Level", graytext:"", index:[1," percent"], text:["Damage: +","Attack: +"," percent<br>Mana Cost: ",""]},
{data:d342, key:"342", code:147, name:"Concentrate", i:22, req:[24,20], reqlvl:18, reqWeapon:["axe","mace","club","hammer","sword","dagger","thrown","javelin","scepter","wand","staff","spear","polearm"], level:0, extra_levels:0, force_levels:0, bindable:2, damaging:{attack:1,spell:0}, description:"Attack that is not interruptible and<br>improves attack and defense rating", syn_title:"<br>Concentrate Receives Bonuses From:<br>", syn_text:"Bash: +5% Damage per Level<br>Battle Orders: +10% Damage per Level<br>Berserk: +1% Magic Damage per Level", graytext:"", index:[1," percent"], text:["Magic Damage: +","Defense Bonus: +"," percent<br>Attack: +"," percent<br>Damage: +"," percent<br>Mana Cost: 2",""]},
{data:d362, key:"362", code:148, name:"Berserk", i:23, req:[24,22,20], reqlvl:30, reqWeapon:["axe","mace","club","hammer","sword","dagger","thrown","javelin","scepter","wand","staff","spear","polearm"], level:0, extra_levels:0, force_levels:0, bindable:2, damaging:{attack:1,spell:1}, description:"A powerful but reckless attack that<br>increases damage and attack rating<br>but decreases defense rating", syn_title:"<br>Berserk Receives Bonuses From:<br>", syn_text:"Howl: +10% Damage per Level<br>Shout: +10% Damage per Level", graytext:"", index:[0,""], text:["Attack: +"," percent<br>Magic Damage: +"," percent<br>Duration: "," seconds<br>Mana Cost: 4"]},
{data:d332, key:"332", code:149, name:"Stun", i:24, req:[20], reqlvl:12, reqWeapon:["axe","mace","club","hammer","sword","dagger","thrown","javelin","scepter","wand","staff","spear","polearm"], level:0, extra_levels:0, force_levels:0, bindable:2, damaging:{attack:1,spell:0}, description:"Stuns your target for a short time<br>and increases your attack rating", syn_title:"<br>Stun Receives Bonuses From:<br>", syn_text:"Bash: +8% Damage per Level<br>Concentrate: +5% Attack Rating per Level<br>War Cry +5% Duration per Level", graytext:"", index:[1," percent"], text:["Damage: +","Attack: +"," percent<br>Duration: "," seconds<br>Mana Cost: 2",""]},
{data:d321, key:"321", code:150, name:"Leap", i:25, req:[], reqlvl:6, level:0, extra_levels:0, force_levels:0, bindable:2, description:"Leaps away from danger<br>or into the fray", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Radius: "," yards<br>Mana Cost: 8"]},
{data:d333, key:"333", code:151, name:"Double Throw", i:26, req:[21,20], reqlvl:12, reqWeapon:["thrown","javelin"], level:0, extra_levels:0, force_levels:0, effect:0, bindable:2, damaging:{attack:2,spell:0}, description:"Allows you to throw two different<br>throwing weapons at the same time", syn_title:"<br>Double Throw Receives Bonuses From:<br>", syn_text:"Double Swing: +8% Damage per Level", graytext:"", index:[1," percent"], text:["Damage: +","To Attack Rating: +"," percent<br>Mana Cost: 1"]},
{data:d341, key:"341", code:153, name:"Leap Attack", i:27, req:[25], reqlvl:18, reqWeapon:["axe","mace","club","hammer","sword","dagger","thrown","javelin","scepter","wand","staff","spear","polearm"], level:0, extra_levels:0, force_levels:0, bindable:1, damaging:{attack:1,spell:0}, description:"Leaps to and attacks target enemy<br>in one swift assault", syn_title:"<br>Leap Attack Receives Bonuses From:<br>", syn_text:"Leap: +10% Damage per Level", graytext:"", index:[0,""], text:["Damage: +"," percent<br>Attack: +"," percent<br>Mana Cost: 9"]},
{data:d353, key:"353", code:146, name:"Frenzy", i:28, req:[26,21,20], reqlvl:24, reqWeapon:["axe","mace","club","hammer","sword","dagger","thrown","javelin","scepter","wand"], level:0, extra_levels:0, force_levels:0, effect:0, bindable:2, damaging:{attack:1,spell:0}, description:"Allows you to swing two weapons at once<br>East successful attack increases your overall speed<br>Requires you to equip two weapons", syn_title:"<br>Frenzy Receives Bonuses From:<br>", syn_text:"Double Swing: +8% Damage per Level<br>Taunt: +8% Damage per Level<br>Berserk: +1% Magic Damage per Level", graytext:"", index:[1," percent<br>Duration: 6 seconds"], text:["Magic Damage: +","Damage: +"," percent<br>Attack: +"," percent<br>Attack Speed: +","-"," percent<br>Walk/Run Speed: +","-"," percent<br>Mana Cost: 3"]},
{data:d361, key:"361", code:155, name:"Whirlwind", i:29, req:[27,25,22,24,20], reqlvl:30, reqWeapon:["axe","mace","club","hammer","sword","dagger","thrown","javelin","scepter","wand","staff","spear","polearm"], level:0, extra_levels:0, force_levels:0, bindable:2, damaging:{attack:1,spell:0}, description:"A whirling dance of death<br>that cuts a path through the<br>legions of your enemies", syn_title:"", syn_text:"", graytext:"", index:[0,""], text:["Damage: +"," percent<br>Attack: +"," percent<br>Mana Cost: ",""]},
];
