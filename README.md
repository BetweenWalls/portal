# [Portal](https://BetweenWalls.github.io/portal/)

Character Planner for Diablo 2 (Path of Diablo & Project Diablo II)

### [Download](https://github.com/BetweenWalls/portal/archive/master.zip)

### Features:
* all skill info up to level 60 & synergy calculations
* display section for skill damage
* character stats
* mercenary selection
* equipment selection & modification (corrupting, socketing, upgrading)
* charm inventory
* snapshotting for buffs
* saving/loading

### Controls:
* Click on the character's level or class to change them
* Use right click to remove points or items
* Shift and ctrl modify the amount added or removed (also works on items in the charm inventory)
* Corruptions may be selected via the narrow dropdowns to the left of each item dropdown
* Upgrading can be done by ctrl-clicking the equipped item (ctrl + right-click to downgrade)
* Snapshot effects by ctrl-clicking the effect's icon
* Add jewels/runes/gems to items by dragging them from the inventory to an equipment slot that has open sockets

### Known Issues:
* Charms can't be moved into a new space below the original space if they overlap eachother
* Shift + Right Click in Firefox doesn't work (and still opens the default menu)
* Socketed gems/runes/jewels sometimes aren't aligned like they should be
* DoT (Damage over Time) stats are added without considering their time component
* Dual-Wielding damage may be incorrect (on-weapon damage affixes affect both weapons)

### Future Goals:
* mercenary stats
* total calculated damage for minions
* IAS breakpoint info (frames per attack) for skills which don't use normal breakpoints
* breakdown of attack damage by type
* skill effectiveness (dps, area affected, movement capability)
* full GUI inventory/stash
* custom item creation & affix editing
* custom item-pool saving
* options for individual quests
* option for strict character validation (prevent invalid character states instead of just making text red)
* character importing/sharing
* monster stat calculations
* debuff tracking
* party tracking (i.e. buffs from party members)
* pvp info
* comparison to original D2 skills/stats
* dynamic item/skill recommendations

### Feedback:
Feel free to message me ([BetweenWalls](https://www.reddit.com/message/compose/?to=BetweenWalls) on reddit, @BetweenWalls#2390 on discord)

Portal is open-source, so improvements can be contributed by anyone through github. Here are the basic steps:
* Create a duplicate version of this repository (fork)
* Edit the files
* Submit a pull request (i.e. request your changes be pulled into this version)
