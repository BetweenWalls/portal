# [Portal](https://BetweenWalls.github.io/portal/)

Character Planner for Diablo 2 (Vanilla, Path of Diablo, Project Diablo II)

### [Download](https://github.com/BetweenWalls/portal/archive/master.zip)

### Features (All Versions):
* all skill info up to level 60 & synergy calculations
* charm inventory
* saving/loading, URL-sharing

### Additional Features (PoD):
* equipment selection & modification (corrupting, socketing, upgrading)
* skill damage calculation
* all character stats
* mercenary selection
* snapshotting for buffs

### Controls:
* Click on the character's level or class to change them
* Use right click to remove points or items
* Shift and ctrl modify the amount added or removed (also works on items in the charm inventory)
* Corruptions may be selected via the narrow dropdowns to the left of each item dropdown
* Upgrading can be done by ctrl-clicking the equipped item (ctrl + right-click to downgrade)
* Snapshot effects by ctrl-clicking the effect's icon
* Add jewels/runes/gems to items by dragging them from the inventory to an equipment slot that has open sockets

#### Mobile Users:
If your phone doesn't have a way to emulate ctrl+click or shift+click, you can still use the URL to enter any character info. Toggle *Shareable URL* in the menu to see how it should be formatted. Example:

https://betweenwalls.github.io/portal/?v=PoD&class=sorceress&level=99&quests=1&strength=45&vitality=460

### Known Issues:
* Charms can't be moved into a new space below the original space if those spaces overlap
* Shift + Right Click in Firefox doesn't work (and still opens the default menu)
* Socketed gems/runes/jewels sometimes aren't aligned like they should be
* Snapshotted skills may not load correctly with saved files or shared URLs
* DoT (Damage over Time) stats are added without considering their time component
* Dual-Wielding damage may be incorrect (some on-weapon damage affixes affect both weapons)
* Minion damage may be incorrect (some bonuses from auras/items aren't included)

### Notes:
* Chance to Hit (displayed after Attack Rating) is an approximation for typical enemies at the character's level - it won't be accurate for bosses or monsters at much higher/lower levels
* Effective Magic Find (displayed after Magic Find) shows how much is applied to uniques

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
* character importing
* monster stat calculations
* debuff tracking
* party tracking (i.e. buffs from party members)
* pvp info
* dynamic item/skill recommendations

### Feedback:
Please report errors and incorrect information. Other feedback is welcome too.

Send feedback to [BetweenWalls](https://www.reddit.com/message/compose/?to=BetweenWalls) on reddit, or @BetweenWalls#2390 on discord.

Portal is open-source, so improvements can be contributed by anyone through github. Here are the basic steps:
* Create a duplicate version of this repository (fork)
* Edit the files
* Submit a pull request (i.e. request your changes be pulled into this version)
