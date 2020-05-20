<!------------------------------------------
Path of Diablo Planner

* Click on the character's level or class to change them
* Use right click to remove points or items
* Shift and ctrl modify the amount added or removed
* Upgrading can be done by ctrl-clicking the equipped item (ctrl + right-click to downgrade)

Current Known Issues:
* Charms can't be moved into a new space below the original space if they overlap eachother
* Shift + Right Click in Firefox doesn't work (and still opens the default menu)
* Enhanced Defense from corruptions (Helm/Body) or Pul Rune is applied to all armor instead of just that item
* Upgrading/Downgrading:
	* Any item can be upgraded/downgraded (instead of just rare/unique)
	* Unique items can be downgraded below their baseline
	* Required level/strength/dexterity may be inaccurate for upgraded/downgraded items
	* Unimplemented: upgrading/downgrading for quest weapons
* Unimplemented: mercenaries (everything except their auras)
* Unimplemented: offhand attacks
* Unimplemented: skill buffs from item-charges
* Unimplemented: option to 'snapshot' buffs
* Unimplemented: breakpoint info for FCR, FBR, FHR

Info: https://github.com/BetweenWalls/planner#planner

Text below this is formatted for the github info page
------------------------------------------>

# [Planner](https://BetweenWalls.github.io/planner/)

Character Skill Planner for Diablo 2: Path of Diablo

### [Download](https://github.com/BetweenWalls/planner/archive/master.zip)

### Features So Far:
* all skill info up to level 60
* synergy calculation for all skills
* display section for active skill(s)
* character stats
* mercenary selection
* equipment selection & modification (corrupting, socketing, upgrading)
* charm inventory

### Upcoming Plans:
* skill buffs from item-charges
* option to 'snapshot' buffs
* more breakpoint info
* mercenary stats & validation
* interface niceties

### Longterm Goals:
* character saving/sharing
* item description tooltips
* full GUI inventory/stash
* custom item creation & editing
* custom item-pool saving
* options for individual quests
* option for strict character validation (prevent invalid character states instead of just making text red)
* character importing
* monster stat calculations
* debuff tracking
* party tracking/planning
* pvp info
* character comparison tool
* comparison to original D2 skills/stats
* comparison of skill effectiveness per level/class
* dynamic item/skill recommendations

### Feedback:
[Reddit Thread](https://www.reddit.com/r/pathofdiablo/comments/f81e5u/character_skill_calculator_with_skill_info_up_to/)

[Github 'Wiki'](https://github.com/BetweenWalls/planner/wiki/Feedback-for-Skill-Planner)

This project will likely be made open-source at some point, but if you want to contribute directly before that point, any improvements would be welcome.
For anyone curious about the program code, the files can be edited with any text editor (I use Notepad++):
* **index.html**
  * Handles page layout
* **all.css**
  * Defines style elements
* **all.js**
  * Holds most of the program logic
* **all_equipment.js**
  * Contains item data
* **class .js files**  *(amazon, assassin, barbarian, druid, necromancer, paladin, sorceress, universal_skills)*
  * Contains skill data
