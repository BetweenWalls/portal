
var character_pd2_sorceress = {class_name:"Sorceress", strength:10, dexterity:25, vitality:10, energy:35, life:40, mana:35, stamina:174, levelup_life:1.5, levelup_stamina:1, levelup_mana:2, ar_per_dexterity:5, life_per_vitality:2, stamina_per_vitality:1, mana_per_energy:2, starting_strength:10, starting_dexterity:25, starting_vitality:10, starting_energy:35, ar_const:-15, block_const:5, skill_layout:"./images/PD2/sorceress.png", mana_regen:1.66,
	weapon_frames:{dagger:16, sword:[17,21], axe:[17,15], mace:[17,15], thrown:[17,16], staff:15, polearm:15, scepter:17, wand:17, javelin:16, spear:22, bow:16, crossbow:19, orb:17},
	fcr_frames:13, fcr_bp:[0, 9, 20, 37, 63, 105, 200],
	fcr_frames_alt:19, fcr_bp_alt:[0, 7, 15, 23, 35, 52, 78, 117, 194],	// Lightning Surge & Chain Lightning
	fhr_frames:15, fhr_bp:[0, 5, 9, 14, 20, 30, 42, 60, 86, 142, 280],
	fbr_frames:9, fbr_bp:[0, 7, 15, 27, 48, 86, 200],
	
	// getSkillData - gets skill info from the skills data table
	//	skill: skill object for the skill in question
	//	lvl: level of the skill
	//	elem: which element of the skill to return
	// result: value of the skill element at the specified level
	// ---------------------------------
	getSkillData : function(skill, lvl, elem) {
		var sk = skills;
		var c = character;
		var result = skill.data.values[elem][lvl];
		
		if (skill.name == "Cold Enchant" && elem > 0 && elem < 3) {		result *= ((1 + 0.25*sk[8].level) * (1+c.cDamage/100)) }
		if (skill.name == "Shiver Armor" && elem > 1 && elem < 4) {		result *= ((1 + 0.10*sk[1].level + 0.10*sk[8].level) * (1+c.cDamage/100)) }
		if (skill.name == "Chilling Armor" && elem > 1 && elem < 4) {	result *= ((1 + 0.10*sk[1].level + 0.10*sk[4].level) * (1+c.cDamage/100)) }
		if (skill.name == "Ice Bolt" && elem < 2) {						result *= ((1 + 0.20*sk[3].level + 0.20*sk[5].level) * (1+c.cDamage/100)) }
		if (skill.name == "Ice Blast" && elem < 2) {					result *= ((1 + 0.06*sk[0].level + 0.06*sk[5].level) * (1+c.cDamage/100)) }
		if (skill.name == "Frost Nova" && elem < 2) {					result *= ((1 + 0.16*sk[0].level + 0.16*sk[4].level) * (1+c.cDamage/100)) }
		if (skill.name == "Glacial Spike" && elem < 2) {				result *= ((1 + 0.05*sk[7].level + 0.05*sk[6].level) * (1+c.cDamage/100)) }
		if (skill.name == "Glacial Spike" && elem == 2) {				result = 2 * (1 + 0.05*sk[6].level) }
		if (skill.name == "Blizzard" && elem < 2) {						result *= ((1 + 0.09*sk[0].level + 0.09*sk[5].level) * (1+c.cDamage/100)) }
		if (skill.name == "Ice Barrage" && elem < 2) {					result *= ((1 + 0.07*sk[0].level + 0.07*sk[5].level) * (1+c.cDamage/100)) }
		if (skill.name == "Frozen Orb" && elem < 2) {					result *= ((1 + 0.03*sk[0].level + 0.03*sk[3].level) * (1+c.cDamage/100)) }
		
		if (skill.name == "Static Field" && elem == 0) {				result = 5 + 0.2*sk[20].level }
		if (skill.name == "Telekinesis" && elem < 2) {					result *= ((1 + 0.14*sk[11].level + 0.14*sk[14].level) * (1+c.lDamage/100)) }
		if (skill.name == "Teleport" && elem == 0) {					result = -50 + sk[20].level*1 }
		if (skill.name == "Charged Bolt" && elem < 2) {					result *= ((1 + 0.04*sk[13].level + 0.04*sk[15].level) * (1+c.lDamage/100)) }
		if (skill.name == "Lightning" && elem < 2) {					result *= ((1 + 0.06*sk[11].level + 0.06*sk[16].level) * (1+c.lDamage/100)) }
		if (skill.name == "Nova" && elem < 2) {							result *= ((1 + 0.03*sk[11].level + 0.03*sk[13].level) * (1+c.lDamage/100)) }
		if (skill.name == "Chain Lightning" && elem > 0 && elem < 3) {	result *= ((1 + 0.05*sk[11].level + 0.05*sk[15].level) * (1+c.lDamage/100)) }
		if (skill.name == "Thunder Storm" && elem > 1 && elem < 4) {	result *= ((1 + 0.04*sk[15].level + 0.04*sk[14].level) * (1+c.lDamage/100)) }
		
		if (skill.name == "Fire Bolt" && elem < 2) {					result *= ((1 + 0.20*sk[26].level + 0.20*sk[33].level) * (1+c.fDamage/100)) }
		if (skill.name == "Fire Ball" && elem > 0 && elem < 3) {		result *= ((1 + 0.14*sk[22].level + 0.14*sk[33].level) * (1+c.fDamage/100)) }
		if (skill.name == "Combustion" && elem < 2) {					result *= ((1 + 0.18*sk[22].level + 0.18*sk[26].level) * (1+c.fDamage/100)) }
		if (skill.name == "Inferno" && elem < 2) {						result *= ((1 + 0.20*sk[27].level + 0.20*sk[24].level) * (1+c.fDamage/100)) }
		if (skill.name == "Blaze" && elem > 0 && elem < 3) {			result *= ((1 + 0.04*sk[23].level + 0.01*sk[27].level) * (1+c.fDamage/100)) }
		if (skill.name == "Fire Wall" && elem < 2) {					result *= ((1 + 0.04*sk[23].level + 0.01*sk[25].level) * (1+c.fDamage/100)) }
		if (skill.name == "Meteor" && elem < 2) {						result *= (1 + 0.05*sk[26].level + 0.05*sk[27].level + 0.05*sk[25].level) }
		if (skill.name == "Meteor" && elem > 1 && elem < 6) {			result *= ((1 + 0.05*sk[26].level + 0.05*sk[27].level + 0.05*sk[25].level) * (1+c.fDamage/100)) }
		if (skill.name == "Lesser Hydra" && elem < 2) {					result *= ((1 + 0.16*sk[22].level + 0.16*sk[31].level) * (1+c.fDamage/100)) }
		if (skill.name == "Hydra" && elem < 2) {						result *= ((1 + 0.06*sk[22].level + 0.06*sk[32].level) * (1+c.fDamage/100)) }
		if (skill.name == "Enchant Fire" && elem > 0 && elem < 3) {		result *= ((1 + 0.15*sk[23].level) * (1+c.fDamage/100)) }
		
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
		
		if (skill.name == "Cold Mastery") { result.cPierce = skill.data.values[1][lvl]; result.cDamage = skill.data.values[0][lvl]; }
		if (skill.name == "Lightning Mastery") { result.lDamage = skill.data.values[0][lvl]; }
		if (skill.name == "Fire Mastery") { result.fPierce = skill.data.values[1][lvl]; result.fDamage = skill.data.values[0][lvl]; }
		
		// most 'effects' unsupported
		
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

/*[ 0] Ice Bolt			*/ var d112 = {index:[0,""], values:[
		["cold min",3,5,7,9,11,13,15,17,21,26,30,35,39,44,48,53,62,71,80,89,], 
		["cold max",5,8,11,14,17,20,23,26,33,40,47,54,61,68,75,82,99,117,134,152,], 
		["Cold Length (seconds)",6,6.4,6.8,7.2,7.6,8,8.4,8.8,9.2,9.6,10,10.4,10.8,11.2,11.6,12,12.4,12.8,13.2,13.6,], 
		["Mana Cost",2,2.2,2.5,2.7,3,3.2,3.5,3.7,4,4.2,4.5,4.7,5,5.2,5.5,5.7,6,6.2,6.5,6.7,], 
]};
/*[ 1] Cold Enchant		*/ var d113 = {index:[0,""], values:[
		["Duration (seconds)",144,168,192,216,240,264,288,312,336,360,384,408,432,456,480,504,528,552,576,600,], 
		["cold min",3,4,6,7,9,10,12,13,16,19,22,25,28,31,34,37,43,48,54,59,], 
		["cold max",4,6,9,11,14,16,19,21,25,29,33,37,41,45,49,53,60,66,73,79,], 
		["Mana Cost",25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,], 
]};
/*[ 2] Frost Nova		*/ var d121 = {index:[0,""], values:[
		["cold min",1,2,3,4,5,6,7,8,10,13,15,18,20,23,25,28,39,50,61,72,83,94,109,124,139,154,169,184,199,214,], 
		["cold max",2,3,4,5,6,7,8,9,13,17,21,25,29,33,37,41,58,74,91,107,124,140,158,176,194,212,230,248,266,284,], 
		["Cold Length (seconds)",8,8.2,8.4,8.6,8.8,9,9.2,9.4,9.6,9.8,10,10.2,10.4,10.6,10.8,11,11.2,11.4,11.6,11.8,12,12.2,12.4,12.6,12.8,13,13.2,13.4,13.6,13.8,], 
		["Mana Cost",16,16.5,17,17.5,18,18.5,19,19.5,20,20.5,21,21.5,22,22.5,23,23.5,24,24.5,25,25,26,26,27,27,28,28,29,29,30,30,], 
]};
/*[ 3] Ice Blast		*/ var d122 = {index:[0,""], values:[
		["cold min",5,11,17,23,29,35,41,47,59,71,83,95,107,119,131,143,164,185,206,227,248,269,297,325,353,381,409,439,472,507,], 
		["cold max",8,15,22,29,36,43,50,57,71,85,99,113,127,141,155,169,190,212,233,255,276,298,326,355,383,412,440,469,504,540,], 
		["Mana Cost",6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13,13.5,14,14.5,15,15.5,16,16.5,17,17.5,18,18.5,19,19.5,20,20.5,], 
]};
/*[ 4] Shiver Armor		*/ var d133 = {index:[0,""], values:[
		["duration"], 
		["defense"], 
		["cold min"], 
		["cold max"], 
		["cold length"], 
]};
/*[ 5] Glacial Spike	*/ var d142 = {index:[0,""], values:[
		["cold min"], 
		["cold max"], 
		["freeze length"], 
		["mana cost"], 
]};
/*[ 6] Blizzard			*/ var d151 = {index:[0,""], values:[
		["cold min"], 
		["cold max"], 
		["mana cost"], 
]};
/*[ 7] Ice Barrage		*/ var d152 = {index:[0,""], values:[
		["cold min"], 
		["cold max"], 
		["lances"], 
		["mana cost"], 
]};
/*[ 8] Chilling Armor	*/ var d153 = {index:[0,""], values:[
		["defense"], 
		["duration"], 
		["cold min"], 
		["cold max"], 
]};
/*[ 9] Frozen Orb		*/ var d161 = {index:[0,""], values:[
		["cold min",49,54,59,65,70,75,80,85,85,98,104,110,117,123,129,135,], 
		["cold max",54,60,66,71,77,83,88,94,94,108,114,121,128,135,141,148,], 
		["Cold Length (seconds)",8,8.2,8.4,8.6,8.8,9,9.2,9.4,9.6,9.8,10,10.2,10.4,10.6,10.8,11,], 
		["Mana Cost",14,14.5,15,15.5,16,16.5,17,17.5,18,18.5,18.5,19.5,20,20.5,21,21.5,], 
]};
/*[10] Cold Mastery		*/ var d162 = {index:[0,""], values:[
		["Cold Damage +%",10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,], 
		["Enemy Cold Resistance -%",5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,], 
]};

/*[11] Charged Bolt		*/ var d212 = {index:[0,""], values:[
		["lightning min",2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,11,12,13,], 
		["lightning max",4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,13,14,15,], 
		["# of Bolts",3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,], 
		["Mana Cost",3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,], 
]};
/*[12] Static Field		*/ var d211 = {index:[0,""], values:[
		["duration"], 
		["enemy lightning resist"], 
		["radius"], 
]};
/*[13] Telekinesis		*/ var d213 = {index:[0,""], values:[
		["lightning min"], 
		["lightning max"], 
]};
/*[14] Nova				*/ var d231 = {index:[0,""], values:[
		["lightning min"], 
		["lightning max"], 
		["mana cost"], 
]};
/*[15] Lightning		*/ var d232 = {index:[0,""], values:[
		["lightning min"], 
		["lightning max"], 
		["mana cost"], 
]};
/*[16] Chain Lightning	*/ var d252 = {index:[0,""], values:[
		["hits"], 
		["lightning min"], 
		["lightning max"], 
		["mana cost"], 
]};
/*[17] Teleport			*/ var d243 = {index:[1,"% Damage"], values:[
		["spell damage penalty"], 
		["mana cost"], 
]};
/*[18]*/
/*[19] Energy Shield	*/ var d263 = {index:[0,""], values:[
		["Duration (seconds)",144,204,264,324,384,444,504,564,624,684,744,804,864,924,984,1044,1104,1164,1224,1284,1344,1404,1464,1524,1584,1644,1704,1764,1824,1884,], 
		["Absorbs % Damage",10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,], 
]};
/*[20] Lightning Mastery*/ var d262 = {index:[0,""], values:[
		["Lightning Damage +%",50,62,74,86,98,110,122,134,146,168,180,192,204,216,228,240,252,264,276,288,300,312,324,336,348,360,372,384,396,408,], 
]};
/*[21] Thunder Storm	*/ var d251 = {index:[0,""], values:[
		["Delay between hits",1.9,1.9,1.8,1.8,1.7,1.7,1.6,1.6,1.5,1.5,1.4,1.4,1.3,1.3,1.2,1.2,1.1,1.1,1,1,1,1,1,1,1,1,1,1,1,1,], 
		["Duration (seconds)",32,40,48,56,62,70,78,86,94,102,120,128,136,144,152,160,168,176,184,192,200,208,216,224,232,240,248,256,264,272,], 
		["Lightning min",1,5,], 
		["Lightning max",187,195,], 
]};

/*[22] Fire Bolt		*/ var d312 = {index:[0,""], values:[
		["fire min"], 
		["fire max"], 
]};
/*[23] Warmth			*/ var d313 = {index:[0,""], values:[
		["mana recovery"], 
		["attack rating"], 
]};
/*[24] Blaze			*/ var d321 = {index:[0,""], values:[
		["duration"], 
		["fire min"], 
		["fire max"], 
		["mana cost"], 
]};
/*[25] Inferno			*/ var d311 = {index:[0,""], values:[
		["fire min"], 
		["fire max"], 
		["range"], 
		["mana cost"], 
]};
/*[26] Fire Ball		*/ var d332 = {index:[1," yards"], values:[
		["radius"], 
		["fire min"], 
		["fire max"], 
		["mana cost"], 
]};
/*[27] Fire Wall		*/ var d331 = {index:[0,""], values:[
		["fire min"], 
		["fire max"], 
		["wall length"], 
		["mana cost"], 
]};
/*[28] Enchant Fire		*/ var d343 = {index:[0,""], values:[
		["duration"], 
		["fire min"], 
		["fire max"], 
		["attack rating"], 
		["mana cost"], 
]};
/*[29] Meteor			*/ var d351 = {index:[0,""], values:[
		["damage min"], 
		["damage max"], 
		["fire min"], 
		["fire max"], 
		["burning min"], 
		["burning max"], 
		["mana cost"], 
]};
/*[30] Fire Mastery		*/ var d362 = {index:[0,""], values:[
		["Fire Damage Increase %",20,24,28,32,36,40,44,48,52,56,60,64,68,72,76,80,84,88,92,96,100,104,108,112,116,120,124,128,132,136,], 
		["- Enemy Fire Resistance %",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,], 
]};
/*[31] Hydra			*/ var d363 = {index:[0,""], values:[
		["fire min"], 
		["fire max"], 
		["mana cost"], 
]};
/*[32] Lesser Hydra		*/ var d333 = {index:[0,""], values:[
		["fire min"], 
		["fire max"], 
		["mana cost"], 
]};
/*[33] Combustion		*/ var d352 = {index:[0,""], values:[
		["fire min"], 
		["fire max"], 
		["mana cost"], 
]};

var skills_pd2_sorceress = [
{data:d112, key:"112", code:36, name:"Ice Bolt", i:0, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, bindable:2, style:"display: block; top: 82px; left: 72px;", description:"Creates a magical bolt of ice<br>that damages and slows your enemies", syn_title:"<br>Ice Bolt Receives Bonuses From:<br>", syn_text:"Ice Blast: +20% Cold Damage per Level<br>Glacial Spike: +20% Cold Damage per Level", graytext:"", text:["Cold Damage: ","-","<br>Cold Length: "," seconds<br>Mana Cost: ",""]},
{data:d113, key:"113", code:37, name:"Cold Enchant", i:1, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, effect:0, bindable:0, style:"display: block; top: 82px; left: 142px;", description:"Enchants equipped weapon of targetd character or minion<br>Adds cold damage to melee weapons<br>Adds one-third cold damage to ranged weapons", syn_title:"<br>Cold Enchant Receives Bonuses From:<br>", syn_text:"Chilling Armor: +25% Cold Damage per Level", graytext:"", text:["Duration: "," seconds<br>Cold Damage: ","-","<br>Mana Cost: ",""]},
{data:d121, key:"121", code:38, name:"Frost Nova", i:2, req:[], reqlvl:6, level:0, extra_levels:0, force_levels:0, bindable:2, style:"display: block; top: 150px; left: 2px;", description:"Creates an expanding ring of ice that damages<br>and slows all nearby enemies", syn_title:"<br>Frost Nova Receives Bonuses From:<br>", syn_text:"Ice Bolt: +16% Cold Damage per Level<br>Shiver Armor: +16% Cold Damage per Level", graytext:"", text:["Cold Damage: ","-","<br>Cold Length: "," seconds<br>Mana Cost: ",""]},
{data:d122, key:"122", code:39, name:"Ice Blast", i:3, req:[0], reqlvl:6, level:0, extra_levels:0, force_levels:0, bindable:2, style:"display: block; top: 150px; left: 72px;", description:"Creates a magical sphere of ice that<br>damages and freezes your enemy", syn_title:"<br>Ice Blast Receives Bonuses From:<br>", syn_text:"Ice Bolt: +6% Cold Damage per Level<br>Glacial Spike: +6% Cold Damage per Level", graytext:"", text:["Cold Damage: ","-","<br>Freezes for 2 seconds<br>Mana Cost: ",""]},
{data:d133, key:"133", code:40, name:"Shiver Armor", i:4, req:[1,3,0], reqlvl:12, level:0, extra_levels:0, force_levels:0, effect:0, bindable:1, style:"display: block; top: 218px; left: 142px;", description:"Increases your defense rating<br>Freezes and damages enemies that hit you", syn_title:"<br>Shiver Armor Receives Bonuses From:<br>", syn_text:"Cold Enchant: +10% Cold Damage per Level<br>Chilling Armor: +10% Cold Damage per Level", graytext:"", text:["Duration: "," seconds<br>Defense Bonus: "," percent<br>Cold Damage: ","-","<br>Cold Length: "," seconds<br>Mana Cost: 11"]},
{data:d142, key:"142", code:41, name:"Glacial Spike", i:5, req:[3,0], reqlvl:18, level:0, extra_levels:0, force_levels:0, bindable:2, style:"display: block; top: 286px; left: 72px;", description:"Creates a magical ice comet<br>that freezes or kills nearby enemies<br><br>Radius: 3.3 yards", syn_title:"<br>Glacial Spike Receives Bonuses From:<br>", syn_text:"Ice Barrage: +5% Cold Damage per Level<br>Blizzard: +5% Cold Damage per Level<br>Blizzard: +5% Freeze Length per Level", graytext:"", text:["Cold Damage: ","-","<br>Freezes for "," seconds<br>Mana Cost: ",""]},
{data:d151, key:"151", code:42, name:"Blizzard", i:6, req:[2,5,3,0], reqlvl:24, level:0, extra_levels:0, force_levels:0, bindable:1, style:"display: block; top: 354px; left: 2px;", description:"Summons massive shards of ice to destroy your enemies", syn_title:"<br>Blizzard Receives Bonuses From:<br>", syn_text:"Ice Bolt: +7% Cold Damage per Level<br>Glacial Spike: +7% Cold Damage per Level", graytext:"", text:["Radius: 4.6 yards<br>Cold Damage: ","-","<br>Duration: 2 seconds<br>Mana Cost: ",""]},
{data:d152, key:"152", code:43, name:"Ice Barrage", i:7, req:[5,3,0], reqlvl:24, level:0, extra_levels:0, force_levels:0, bindable:2, style:"display: block; top: 354px; left: 72px;", description:"Creates a barrage of magical ice lances<br>that damage and slow nearby enemies<br><br>Radius: 2.6 yards", syn_title:"<br>Ice Barrage Receives Bonuses From:<br>", syn_text:"Ice Bolt: +7% Cold Damage per Level<br>Glacial Spike: +7% Cold Damage per Level", graytext:"", text:["Cold Damage: ","-","<br>"," Ice Lances<br>Mana Cost: ",""]},
{data:d153, key:"153", code:44, name:"Chilling Armor", i:8, req:[4,1,3,0], reqlvl:24, level:0, extra_levels:0, force_levels:0, effect:0, bindable:1, style:"display: block; top: 354px; left: 142px;", description:"Increases defense and discharges a blizzard spike<br>in retaliation against ranged attackers<br>Damages melee attackers if you are hit", syn_title:"<br>Chilling Armor Receives Bonuses From:<br>", syn_text:"Cold Enchant: +10% Cold Damage per Level<br>Shiver Armor: +10% Cold Damage per Level", graytext:"", text:["Defense Bonus: "," percent<br>Duration: "," seconds<br>Cold Damage: ","-","<br>Mana Cost: 17",""]},
{data:d161, key:"161", code:45, name:"Frozen Orb", i:9, req:[6,2,5,3,0], reqlvl:30, level:0, extra_levels:0, force_levels:0, bindable:2, style:"display: block; top: 422px; left: 2px;", description:"Creates a magical globe that sprays a torrent of ice bolts<br>to lay waste to your enemies", syn_title:"<br>Frozen Orb Receives Bonuses From:<br>", syn_text:"Ice Bolt: +2% Cold Damage per Level<br>Ice Blast: +2% Cold Damage per Level", graytext:"", text:["Cold Damage: ","-","<br>Cold Length: "," seconds<br>Mana Cost: ",""]},
{data:d162, key:"162", code:46, name:"Cold Mastery", i:10, req:[], reqlvl:30, level:0, extra_levels:0, force_levels:0, effect:1, bindable:0, style:"display: block; top: 422px; left: 72px;", description:"Passive - Increases the damage of your cold skills<br>by piercing enemies' resistances to cold", syn_title:"", syn_text:"", graytext:"", text:["Cold Damage: +"," percent<br>Cold Pierce: +"," percent"]},

{data:d212, key:"212", code:47, name:"Charged Bolt", i:11, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, bindable:2, style:"display: block; top: 82px; left: 180px;", description:"Creates multiple, randomly directed<br>bolts of electrical energy", syn_title:"<br>Charged Bolt Receives Bonuses From:<br>", syn_text:"Telekinesis: +4% Lightning Damage per Level<br>Lightning: +4% Lightning Damage per Level", graytext:"", text:["Lightning Damage: ","-","<br>"," bolts<br>Mana Cost: ",""]},
{data:d211, key:"211", code:48, name:"Static Field", i:12, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, bindable:2, style:"display: block; top: 82px; left: 194px;", description:"Creates an electrical field that reduces life<br>of all nearby enemies<br>Lowers enemy lightning resistances for a short duration<br><br>Weakens enemies by 25 percent", syn_title:"<br>Static Field Receives Bonuses From:<br>", syn_text:"Lightning Mastery: +0.2 Seconds Duration per Level", graytext:"", text:["Duration: "," seconds<br>Enemy Lightning Resistances: "," percent<br>Radius: "," yards<br>Mana Cost: 9"]},
{data:d213, key:"213", code:49, name:"Telekinesis", i:13, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, bindable:1, style:"display: block; top: 82px; left: 264px;", description:"Uses the power of your mind to<br>pick up items, use objects,<br>and knock back enemies", syn_title:"<br>Telekinesis Receives Bonuses From:<br>", syn_text:"Charged Bolt: +14% Lightning Damage per Level<br>Nova: +14% Lightning Damage per Level", graytext:"", text:["Lightning Damage: ","-","<br>Mana Cost: 7",""]},
{data:d231, key:"231", code:50, name:"Nova", i:14, req:[11], reqlvl:12, level:0, extra_levels:0, force_levels:0, bindable:2, style:"display: block; top: 218px; left: 164px;", description:"Creates an expanding ring of lightning<br>to shock nearby enemies", syn_title:"<br>Nova Receives Bonuses From:<br>", syn_text:"Charged Bolt: +3% Lightning Damage per Level<br>Telekinesis: +3% Lightning Damage per Level", graytext:"", text:["Lightning Damage: ","-","<br>Mana Cost: ",""]},
{data:d232, key:"232", code:51, name:"Lightning", i:15, req:[11], reqlvl:12, level:0, extra_levels:0, force_levels:0, bindable:2, style:"display: block; top: 218px; left: 194px;", description:"Creates a powerful lightning bolt<br>to lay waste to your enemies", syn_title:"<br>Lightning Receives Bonuses From:<br>", syn_text:"Charged Bolt: +6% Lightning Damage per Level<br>Chain Lightning: +6% Lightning Damage per Level", graytext:"", text:["Lightning Damage: ","-","<br>Mana Cost: ",""]},
{data:d252, key:"252", code:52, name:"Chain Lightning", i:16, req:[15,11], reqlvl:24, level:0, extra_levels:0, force_levels:0, bindable:2, style:"display: block; top: 354px; left: 200px;", description:"Creates a bolt of lightning that<br>arcs through several targets", syn_title:"<br>Chain Lightning Receives Bonuses From:<br>", syn_text:"Charged Bolt: +5% Lightning Damage per Level<br>Lightning: +5% Lightning Damage per Level", graytext:"", text:[""," hits<br>Lightning Damage: ","-","<br>Mana Cost: ",""]},
{data:d243, key:"243", code:53, name:"Teleport", i:17, req:[13], reqlvl:18, level:0, extra_levels:0, force_levels:0, bindable:1, style:"display: block; top: 286px; left: 200px;", description:"Instantly move to a destination within your line of sight<br>and reduces the spell damage you deal for 1 second", syn_title:"", syn_text:"", graytext:"", text:["","Mana Cost: ",""]},
/*TODO: remove*/{data:d263, key:"263", code:54, name:"None", i:18, req:[], reqlvl:100, level:0, extra_levels:0, force_levels:0, bindable:0, style:"display: none;", description:"", syn_title:"", syn_text:"", graytext:"", text:[""]},
{data:d263, key:"263", code:55, name:"Energy Shield", i:19, req:[16,17,13,15,11], reqlvl:30, level:0, extra_levels:0, force_levels:0, effect:0, bindable:1, style:"display: block; top: 422px; left: 254px;", description:"Creates a magical shield that consumes mana<br>instead of health when you take damage", syn_title:"<br>Energy Shield Receives Bonuses From:<br>", syn_text:"Telekinesis", graytext:"", text:["Duration: "," seconds<br>Absorbs "," percent<br>Mana Cost: 5",""]},
{data:d262, key:"262", code:56, name:"Lightning Mastery", i:20, req:[], reqlvl:30, level:0, extra_levels:0, force_levels:0, effect:1, bindable:0, style:"display: block; top: 422px; left: 204px;", description:"Passive - Increases all damage caused by your lightning spells", syn_title:"", syn_text:"", graytext:"", text:["Lightning Damage: +"," percent",""]},
{data:d251, key:"251", code:57, name:"Thunder Storm", i:21, req:[15,14,11], reqlvl:24, level:0, extra_levels:0, force_levels:0, effect:0, bindable:1, style:"display: block; top: 354px; left: 174px;", description:"Summons a deadly thunderstorm that strikes<br>your enemies with bolts of lightning", syn_title:"<br>Thunder Storm Receives Bonuses From:<br>", syn_text:"Lightning: +4% Lightning Damage per Level<br>Nova: +4% Lightning Damage per Level", graytext:"", text:["Delay: "," seconds<br>Duration: "," seconds<br>Lightning Damage: ","-","<br>Mana Cost: 19"]},

{data:d312, key:"312", code:58, name:"Fire Bolt", i:22, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, bindable:2, style:"display: block; top: 82px; left: 376px;", description:"Creates a magical flaming missile<br><br>Mana Cost: 2.5", syn_title:"<br>Fire Bolt Receives Bonuses From:<br>", syn_text:"Fire Ball: +20% Fire Damage per Level<br>Combustion: +20% Fire Damage per Level", graytext:"", text:["Fire Damage: ","-",""]},
{data:d313, key:"313", code:59, name:"Warmth", i:23, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, effect:0, bindable:0, style:"display: block; top: 82px; left: 326px;", description:"Passive - Increases the rate at which you recover mana<br>and grants passive attack rating", syn_title:"", syn_text:"", graytext:"", text:[""," percent<br>+"," Attack Rating"]},
{data:d321, key:"321", code:60, name:"Blaze", i:24, req:[25], reqlvl:6, level:0, extra_levels:0, force_levels:0, effect:0, bindable:1, style:"display: block; top: 150px; left: 295px;", description:"Creates a wall of fire<br>in your wake to scorch your enemies", syn_title:"<br>Blaze Receives Bonuses From:<br>", syn_text:"Warmth: +4% Fire Damage per Level<br>Fire Wall: +1% Fire Damage per Level", graytext:"", text:["Fire Duration: "," seconds<br>Average Fire Damage: ","-"," per second<br>Mana Cost: ",""]},
{data:d311, key:"311", code:61, name:"Inferno", i:25, req:[], reqlvl:1, level:0, extra_levels:0, force_levels:0, bindable:2, style:"display: block; top: 82px; left: 286px;", description:"Creates a continuous jet of flame<br>to scorch your enemies<br><br>Minimum Mana Required to Cast: 4", syn_title:"<br>Inferno Receives Bonuses From:<br>", syn_text:"Fire Wall: +20% Fire Damage per Level<br>Blaze: +20% Fire Damage per Level", graytext:"", text:["Average Fire Damage: ","-"," per second<br>Range: "," yards<br>Mana Cost: "," per second"]},
{data:d332, key:"332", code:62, name:"Fire Ball", i:26, req:[22], reqlvl:12, level:0, extra_levels:0, force_levels:0, bindable:2, style:"display: block; top: 218px; left: 336px;", description:"Creates an explosive sphere of fiery death<br>to engulf your enemies", syn_title:"<br>Fire Ball Receives Bonuses From:<br>", syn_text:"Fire Bolt: +14% Fire Damage per Level<br>Combustion: +14% Fire Damage per Level", graytext:"", text:["Radius: ","Fire Damage: ","-","<br>Mana Cost: ",""]},
{data:d331, key:"331", code:63, name:"Fire Wall", i:27, req:[25,24], reqlvl:12, level:0, extra_levels:0, force_levels:0, bindable:1, style:"display: block; top: 218px; left: 266px;", description:"Creates a wall of flame that<br>blocks or burns your enemies", syn_title:"<br>Fire Wall Receives Bonuses From:<br>", syn_text:"Warmth: +4% Fire Damage per Level<br>Inferno: +1% Fire Damage per Level", graytext:"", text:["Fire Duration: 3.6 seconds<br>Average Fire Damage: ","-"," per second<br>"," yards<br>Mana Cost: ",""]},
{data:d343, key:"343", code:64, name:"Enchant Fire", i:28, req:[23,26,22,32], reqlvl:18, level:0, extra_levels:0, force_levels:0, effect:0, bindable:0, style:"display: block; top: 286px; left: 306px;", description:"Enchants equipped weapon of targeted character or minion<br>Adds fire damage to melee weapons<br>Adds one-third fire damage to ranged weapons", syn_title:"<br>Enchant Fire Receives Bonuses From:<br>", syn_text:"Warmth: +15% Fire Damage per Level", graytext:"", text:["Duration: ","<br>Fire Damage: ","-","<br>Attack Bonus: +"," percent<br>Mana Cost: ",""]},
{data:d351, key:"351", code:65, name:"Meteor", i:29, req:[26,27,22,25,24], reqlvl:24, level:0, extra_levels:0, force_levels:0, bindable:2, style:"display: block; top: 354px; left: 306px;", description:"Summons a meteor from the heavens<br>to crush and incinerate your enemies", syn_title:"<br>Meteor Receives Bonuses From:<br>", syn_text:"Fire Ball: +5% Damage per Level<br>Fire Wall: +5% Damage per Level<br>Inferno: +5% Damage per Level", graytext:"", text:["Damage: ","-","<br>Fire Damage: ","-","<br>Average Fire Damage: ","-"," per second<br>Mana Cost: ",""]},
{data:d362, key:"362", code:66, name:"Fire Mastery", i:30, req:[], reqlvl:30, level:0, extra_levels:0, force_levels:0, effect:1, bindable:0, style:"display: block; top: 422px; left: 306px;", description:"Passive - Increases all damage caused by your fire skills", syn_title:"", syn_text:"", graytext:"", text:["Fire Damage: +"," percent<br>Fire Pierce: +"," percent",""]},
{data:d363, key:"363", code:67, name:"Hydra", i:31, req:[28,23,26,22,32], reqlvl:30, level:0, extra_levels:0, force_levels:0, bindable:2, style:"display: block; top: 422px; left: 356px;", description:"Summons a multi-headed beast of flame that casts<br>fireball to reduce your enemies to ashes", syn_title:"<br>Hydra Receives Bonuses From:<br>", syn_text:"Fire Bolt: +6% Fire Damage per Level<br>Lesser Hydra: +6% Fire Damage per Level", graytext:"", text:["Duration: 10 seconds<br>Hydra Fire Damage: ","-","<br>Mana Cost: ",""]},
{data:d333, key:"333", code:305, name:"Lesser Hydra", i:32, req:[23], reqlvl:12, level:0, extra_levels:0, force_levels:0, bindable:2, style:"display: block; top: 218px; left: 356px;", description:"Summons a multi-headed beast of flame that casts<br>firebolt to reduce your enemies to ashes", syn_title:"<br>Hydra Receives Bonuses From:<br>", syn_text:"Fire Bolt: +16% Fire Damage per Level<br>Hydra: +16% Fire Damage per Level", graytext:"", text:["Duration: 10 seconds<br>Hydra Fire Damage: ","-","<br>Mana Cost: ",""]},
{data:d352, key:"352", code:306, name:"Combustion", i:33, req:[26,22], reqlvl:24, level:0, extra_levels:0, force_levels:0, bindable:2, style:"display: block; top: 354px; left: 276px;", description:"Creates an expanding ring of fire balls to engulf your enemies", syn_title:"<br>Combustion Receives Bonuses From:<br>", syn_text:"Fire Bolt: +18% Fire Damage per Level<br>Fire Ball: +18% Fire Damage per Level", graytext:"", text:["Fire Damage: ","-","<br>Mana Cost: ",""]},
];
