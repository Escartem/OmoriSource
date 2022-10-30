//=============================================================================
// Yanfly Engine Plugins - Steal & Snatch
// YEP_StealSnatch.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_StealSnatch = true;

var Yanfly = Yanfly || {};
Yanfly.Steal = Yanfly.Steal || {};
Yanfly.Steal.version = 1.09;

//=============================================================================
 /*:
 * @plugindesc v1.09 Allows your actors to be able to steal and snatch
 * items from enemies.
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Bonus Formula
 * @parent ---General---
 * @desc The custom formula used to determine stealing bonus rates.
 * @default (user.luk / (512 + user.luk)) / 3
 *
 * @param ---Auto Setup---
 * @default
 *
 * @param Gold Drop
 * @parent ---Auto Setup---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Automatically include enemy gold drop into stealable items?
 * NO - false     YES - true
 * @default true
 *
 * @param Gold Rate
 * @parent ---Auto Setup---
 * @type number
 * @decimals 2
 * @min 0
 * @desc If automatically include gold drop, what is the steal rate?
 * 0.00 - 0%     1.00 - 100%
 * @default 0.50
 *
 * @param Gold Removal
 * @parent ---Auto Setup---
 * @type boolean
 * @on YES
 * @off NO
 * @desc If using automatic gold, remove the rewards from the
 * enemy gold when defeated? NO - false   YES - true
 * @default true
 *
 * @param Drop Items
 * @parent ---Auto Setup---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Automatically include drop items into stealable items?
 * NO - false     YES - true
 * @default true
 *
 * @param Drop Rates
 * @parent ---Auto Setup---
 * @type number
 * @decimals 2
 * @min 0
 * @desc If drop items are included, adjust the rate by this much.
 * 0.00 - 0%     1.00 - 100%
 * @default 0.80
 *
 * @param Drop Removal
 * @parent ---Auto Setup---
 * @type boolean
 * @on YES
 * @off NO
 * @desc If using automatic drops, remove the rewards from the
 * enemy drops when defeated? NO - false   YES - true
 * @default true
 *
 * @param Automatic Debuff
 * @parent ---Auto Setup---
 * @type boolean
 * @on YES
 * @off NO
 * @desc If a weapon or armor gets stolen, automatically debuff the
 * enemy by the equipment's stats? NO - false   YES - true
 * @default true
 *
 * @param ---Battle Log---
 * @default
 *
 * @param Center Text
 * @parent ---Battle Log---
 * @type boolean
 * @on YES
 * @off NO
 * @desc If you're using Battle Engine Core, center text?
 * NO - false     YES - true
 * @default true
 *
 * @param Fail Text
 * @parent ---Battle Log---
 * @desc Text shown if failed to steal an item.
 * %1 - Actor     %2 - Target
 * @default %1 couldn't steal from %2.
 *
 * @param Success Text
 * @parent ---Battle Log---
 * @desc Text shown if successfully stole an item.
 * %1 - Actor   %2 - Target   %3 - Item   %4 - Icon
 * @default %1 steals %4%3 from %2!
 *
 * @param Steal Empty
 * @parent ---Battle Log---
 * @desc Text shown if target has nothing left to steal.
 * %1 - Target
 * @default %1 has nothing left to steal.
 *
 * @param Gold Format
 * @parent ---Battle Log---
 * @desc How the gold format will look when it's stolen.
 * %1 - Amount     %2 - Gold
 * @default %1 %2
 *
 * @param Steal Wait
 * @parent ---Battle Log---
 * @type number
 * @min 0
 * @desc If using the Battle Engine Core, this is how many frames
 * the message will wait.
 * @default 60
 *
 * @param ---Snatch Window---
 * @default
 *
 * @param Gold Help Text
 * @parent ---Snatch Window---
 * @desc Text used for gold in the Help Window.
 * %1 - Amount     %2 - Gold
 * @default There's %1 %2 for you to steal!
 *
 * @param Success Font Size
 * @parent ---Snatch Window---
 * @type number
 * @min 1
 * @desc Font size used for the success rate.
 * Default: 28
 * @default 20
 *
 * @param Decimal Places
 * @parent ---Snatch Window---
 * @type number
 * @min 0
 * @desc The amount of decimal places to display for rate.
 * @default 0
 *
 * @param Already Stolen
 * @parent ---Snatch Window---
 * @desc Text used for already stolen items.
 * @default Stolen
 *
 * @param ---Sound Effects---
 * @default
 *
 * @param Failure Sound
 * @parent ---Sound Effects---
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc Sound effect played when failed to steal.
 * If you don't want to play a sound effect, leave this empty.
 * @default Buzzer2
 *
 * @param Failure Volume
 * @parent ---Sound Effects---
 * @desc Volume for this sound effect.
 * @default 80
 *
 * @param Failure Pitch
 * @parent ---Sound Effects---
 * @desc Pitch for this sound effect.
 * @default 120
 * 
 * @param Failure Pan
 * @parent ---Sound Effects---
 * @desc Pan for this sound effect.
 * @default 0
 *
 * @param Empty Sound
 * @parent ---Sound Effects---
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc Sound effect played when there is nothing to steal.
 * If you don't want to play a sound effect, leave this empty.
 * @default Evasion1
 *
 * @param Empty Volume
 * @parent ---Sound Effects---
 * @desc Volume for this sound effect.
 * @default 80
 *
 * @param Empty Pitch
 * @parent ---Sound Effects---
 * @desc Pitch for this sound effect.
 * @default 120
 * 
 * @param Empty Pan
 * @parent ---Sound Effects---
 * @desc Pan for this sound effect.
 * @default 0
 *
 * @param Item Sound
 * @parent ---Sound Effects---
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc Sound effect played when stolen an item.
 * If you don't want to play a sound effect, leave this empty.
 * @default Item1
 *
 * @param Item Volume
 * @parent ---Sound Effects---
 * @desc Volume for this sound effect.
 * @default 80
 *
 * @param Item Pitch
 * @parent ---Sound Effects---
 * @desc Pitch for this sound effect.
 * @default 120
 * 
 * @param Item Pan
 * @parent ---Sound Effects---
 * @desc Pan for this sound effect.
 * @default 0
 *
 * @param Weapon Sound
 * @parent ---Sound Effects---
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc Sound effect played when stolen a weapon.
 * If you don't want to play a sound effect, leave this empty.
 * @default Equip1
 *
 * @param Weapon Volume
 * @parent ---Sound Effects---
 * @desc Volume for this sound effect.
 * @default 80
 *
 * @param Weapon Pitch
 * @parent ---Sound Effects---
 * @desc Pitch for this sound effect.
 * @default 120
 * 
 * @param Weapon Pan
 * @parent ---Sound Effects---
 * @desc Pan for this sound effect.
 * @default 0
 *
 * @param Armor Sound
 * @parent ---Sound Effects---
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc Sound effect played when stolen an armor.
 * If you don't want to play a sound effect, leave this empty.
 * @default Equip2
 *
 * @param Armor Volume
 * @parent ---Sound Effects---
 * @desc Volume for this sound effect.
 * @default 80
 *
 * @param Armor Pitch
 * @parent ---Sound Effects---
 * @desc Pitch for this sound effect.
 * @default 150
 * 
 * @param Armor Pan
 * @parent ---Sound Effects---
 * @desc Pan for this sound effect.
 * @default 0
 *
 * @param Gold Sound
 * @parent ---Sound Effects---
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc Sound effect played when stolen gold.
 * If you don't want to play a sound effect, leave this empty.
 * @default Shop2
 *
 * @param Gold Volume
 * @parent ---Sound Effects---
 * @desc Volume for this sound effect.
 * @default 80
 *
 * @param Gold Pitch
 * @parent ---Sound Effects---
 * @desc Pitch for this sound effect.
 * @default 120
 * 
 * @param Gold Pan
 * @parent ---Sound Effects---
 * @desc Pan for this sound effect.
 * @default 0
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Stealing is a commonly used mechanic found in many traditional RPG's. This
 * plugin enables you to replicate that mechanic and add more depth upon it.
 *
 * Enemies can have multiple items to steal in addition to their default drops.
 * When an actor goes to steal from an enemy, the actor has a percent change
 * for the steal attempt to be successful. If successful, the actor grabs a
 * random item from the stealable items pool and the party gains the said item.
 *
 * In addition to stealing, there is a new mechanic called 'Snatch'. While
 * stealing allows your actors to grab random items from the enemy, snatching
 * lets your actors target the item they want to steal and focus only on that
 * item alone.
 *
 * Another feature for this plugin is that stealing a piece of equipment can
 * now 'debuff' the enemy. If an actor steals a sword that gives 10 ATK, the
 * enemy will lose 10 ATK. This feature can be turned off. Also new (and
 * optional) is the ability to steal the enemy's drop items. Enemies won't
 * always necessarily drop their items after being defeated, but stealing from
 * them directly will allow your players to secure those items. Once an item is
 * stolen, it will not drop again at the end of battle.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * Use the following notetags to set up your steal effects.
 *
 * Enemy Notetags:
 *   <Steal Item x: y%>
 *   <Steal Weapon x: y%>
 *   <Steal Armor x: y%>
 *   <Steal Gold x: y%>
 *   Gives the enemy the respect item to be stolen. x is the item's ID while
 *   y% is the rate at which the item can be stolen from.
 *
 *   <Steal Potion: y%>
 *   <Steal Short Sword: y%>
 *   <Steal Round Shield: y%>
 *   If you decide to use names instead of item ID's, you can use the above
 *   notetag format. If you have multiple items with the same name, priority
 *   will be given to the item with the highest item ID in the order of items,
 *   weapons, and then armors.
 *
 *   <Steal Resist: +x%>
 *   <Steal Resist: -x%>
 *   This is the enemy's inherent resistance against stealing.
 *
 * Skill and Item Notetags:
 *   <Steal>
 *   <Steal: +x%>
 *   <Steal: -x%>
 *   This enables the skill/item to have steal properties. Actions with steal
 *   properties will have a chance of stealing an item. This notetag applies to
 *   all item types. If you use the notetag versions with +x% or -x%, the steal
 *   rate is increased/decreased by x%.
 *
 *   <Steal Item>
 *   <Steal Item: +x%>
 *   <Steal Item: -x%>
 *   This enables the skill/item to have steal properties. Actions with steal
 *   properties will have a chance of stealing an item. This notetag adds item
 *   types to the stealable item pool. If you use the notetag versions with +x%
 *   or -x%, the steal rate is increased/decreased for item types by x%.
 *
 *   <Steal Weapon>
 *   <Steal Weapon: +x%>
 *   <Steal Weapon: -x%>
 *   This enables the skill/item to have steal properties. Actions with steal
 *   properties will have a chance of stealing an item. This notetag adds
 *   weapon types to the stealable item pool. If you use the notetag versions
 *   with +x% or -x%, the steal rate is increased/decreased weapon item types
 *   by x%.
 *
 *   <Steal Armor>
 *   <Steal Armor: +x%>
 *   <Steal Armor: -x%>
 *   This enables the skill/item to have steal properties. Actions with steal
 *   properties will have a chance of stealing an item. This notetag adds armor
 *   types to the stealable item pool. If you use the notetag versions with +x%
 *   or -x%, the steal rate is increased/decreased for armor types by x%.
 *
 *   <Steal Gold>
 *   <Steal Gold: +x%>
 *   <Steal Gold: -x%>
 *   This enables the skill/item to have steal properties. Actions with steal
 *   properties will have a chance of stealing an item. This notetag adds gold
 *   types to the stealable item pool. If you use the notetag versions with +x%
 *   or -x%, the steal rate is increased/decreased for gold by x%.
 *
 *   <Snatch>
 *   <Snatch: +x%>
 *   <Snatch: -x%>
 *   This enables the skill/item to have snatch properties. Actions with snatch
 *   properties are able to select the exact item they wish to steal. This
 *   notetag applies to all item types. If you use the notetag versions with
 *   +x% or -x%, the snatch rate is increased/decreased by x%.
 *   * Note: Snatching only works on skills/items that target.
 *
 *   <Snatch Item>
 *   <Snatch Item: +x%>
 *   <Snatch Item: -x%>
 *   This enables the skill/item to have snatch properties. Actions with snatch
 *   properties are able to select the exact item they wish to steal. This
 *   notetag adds items to the pool. If you use the notetag versions with +x%
 *   or -x%, the snatch rate is increased/decreased by x% for items.
 *   * Note: Snatching only works on skills/items that target.
 *
 *   <Snatch Weapon>
 *   <Snatch Weapon: +x%>
 *   <Snatch Weapon: -x%>
 *   This enables the skill/item to have snatch properties. Actions with snatch
 *   properties are able to select the exact item they wish to steal. This
 *   notetag adds weapons to the pool. If you use the notetag versions with +x%
 *   or -x%, the snatch rate is increased/decreased by x% for weapons.
 *   * Note: Snatching only works on skills/items that target.
 *
 *   <Snatch Armor>
 *   <Snatch Armor: +x%>
 *   <Snatch Armor: -x%>
 *   This enables the skill/item to have snatch properties. Actions with snatch
 *   properties are able to select the exact item they wish to steal. This
 *   notetag adds armors to the pool. If you use the notetag versions with +x%
 *   or -x%, the snatch rate is increased/decreased by x% for armors.
 *   * Note: Snatching only works on skills/items that target.
 *
 *   <Snatch Gold>
 *   <Snatch Gold: +x%>
 *   <Snatch Gold: -x%>
 *   This enables the skill/item to have snatch properties. Actions with snatch
 *   properties are able to select the exact item they wish to steal. This
 *   notetag adds gold targets to the pool. If you use the notetag versions
 *   with +x% or -x%, the snatch rate is increased/decreased by x% for gold.
 *   * Note: Snatching only works on skills/items that target.
 *
 * Item, Weapon, and Armor Notetags:
 *   <Enable Automatic Debuff>
 *   <Disable Automatic Debuff>
 *   This let's you override the 'Automatic Effect' settings in the parameters
 *   for this individual item. Enabling it will cause any weapons and armors to
 *   debuff the enemy's parameters relative to the piece of equipment stolen.
 *   Disabling it will make no such thing occur. Automatic Debuffing is only
 *   applied to weapons and armors.
 *
 *   <Steal Sound Name: filename>
 *   If you wish to give an item a unique sound effect when stolen, use this
 *   notetag to accomplish that. Exclude file extensions from the 'filename'.
 *
 *   <Steal Sound Volume: x>
 *   To change the volume for this item's sound effect when it is stolen, use
 *   this notetag and replace x with the volume level desired.
 *
 *   <Steal Sound Pitch: x>
 *   To change the pitch for this item's sound effect when it is stolen, use
 *   this notetag and replace x with the pitch desired.
 *
 *   <Steal Sound Pan: x>
 *   To change the pan for this item's sound effect when it is stolen, use this
 *   notetag and replace x with the pan desired.
 *
 * Actor, Class, Weapon, Armor, and State Notetags:
 *   <Steal Rate: +x%>
 *   <Steal Rate: -x%>
 *   <Steal Type Rate: +x%>
 *   <Steal Type Rate: -x%>
 *   Increase/decrease the steal rate for the user by x%. If you use the 'Type'
 *   notetag, replace 'Type' with 'Item', 'Weapon', 'Armor', or 'Gold' to apply
 *   individual steal rate bonuses for just those types.
 *
 * ============================================================================
 * Lunatic Mode - Custom Steal Effects
 * ============================================================================
 *
 * For those with JavaScript experience and would like to create their own
 * custom steal rates for individual skills and/or items, you can use this
 * notetag to accomplish that:
 *
 * Skill and Item Notetags:
 *   <Custom Steal Rate>
 *   rate += user.hp / user.mhp;
 *   rate += user.level * 0.01;
 *   </Custom Steal Rate>
 *   The 'rate' variable is already predefined with the default calculations.
 *   You can either add onto it or overwrite it. The 'rate' variable is then
 *   returned after this for rate calculation. This formula is applied for both
 *   steal and snatching.
 *
 *   <Custom Steal Success Effect>
 *   if (item) {
 *     user.gainHp(item.price);
 *   }
 *   </Custom Steal Success Effect>
 *   This allows for custom effects to occur after successfully stealing any
 *   type of item. The 'item' variable refers to the stolen item.
 *
 * Item, Weapon, and Armor Notetags:
 *   <After Steal Effect>
 *   target.atk -= 10;
 *   user.addBuff(3, 5);
 *   </After Steal Effect>
 *   When this item, weapon, or piece of armor gets stolen, this piece of code
 *   will run affecting the target enemy it was stolen from. 'item' will refer
 *   to the item that was stolen. 'target' will refer to the target enemy the
 *   actor stole from. 'user' will refer to the actor stealing the item.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.09:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.08:
 * - Lunatic Mode fail safes added.
 *
 * Version 1.07:
 * - Fixed a bug with the <Steal Rate: +/-x%> notetags not working.
 *
 * Version 1.06:
 * - Added <Custom Steal Success Effect> Lunatic Mode notetag for skills and
 * item usage.
 *
 * Version 1.05a:
 * - Updated for RPG Maker MV version 1.1.0.
 * - Updated Imported name to YEP_StealSnatch.
 *
 * Version 1.04:
 * - Fixed a bug with <Steal Rate: +x%> notetag that caused the game to freeze.
 *
 * Version 1.03:
 * - Added 'Steal Wait' plugin parameter to add a wait time for those using the
 * Battle Engine Core.
 *
 * Version 1.02:
 * - Message Core's WordWrap will now apply to snatch item descriptions.
 *
 * Version 1.01:
 * - 'Success Text' plugin parameter now has %4 for you to add in an icon for
 * the item you just stole. This requires the most recent Battle Engine Core if
 * you are using it.
 * - If enemies have 0 gold, they will not be automatically included in the
 * list of stealable items.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_StealSnatch');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.StealBonusFormula = String(Yanfly.Parameters['Bonus Formula']);

Yanfly.Param.StealGold = eval(String(Yanfly.Parameters['Gold Drop']));
Yanfly.Param.StealGoldRate = Number(Yanfly.Parameters['Gold Rate']);
Yanfly.Param.StealGoldRemove = eval(String(Yanfly.Parameters['Gold Removal']));
Yanfly.Param.StealDrops = eval(String(Yanfly.Parameters['Drop Items']));
Yanfly.Param.StealDropRate = Number(Yanfly.Parameters['Drop Rates']);
Yanfly.Param.StealDropRemove = eval(String(Yanfly.Parameters['Drop Removal']));
Yanfly.Param.StealAutoEff = eval(String(Yanfly.Parameters['Automatic Debuff']));

Yanfly.Param.StealCenter = eval(String(Yanfly.Parameters['Center Text']));
Yanfly.Param.StealFail = String(Yanfly.Parameters['Fail Text']);
Yanfly.Param.StealSuccess = String(Yanfly.Parameters['Success Text']);
Yanfly.Param.StealEmpty = String(Yanfly.Parameters['Steal Empty']);
Yanfly.Param.StealGoldFmt = String(Yanfly.Parameters['Gold Format']);
Yanfly.Param.StealWait = Number(Yanfly.Parameters['Steal Wait']);

Yanfly.Param.SnatchHelpText = String(Yanfly.Parameters['Gold Help Text']);
Yanfly.Param.SnatchFontSize = Number(Yanfly.Parameters['Success Font Size']);
Yanfly.Param.SnatchDecimal = Number(Yanfly.Parameters['Decimal Places']);
Yanfly.Param.SnatchStolen = String(Yanfly.Parameters['Already Stolen']);

Yanfly.Param.StealSEFail = {
  name:   String(Yanfly.Parameters['Failure Sound']),
  volume: Number(Yanfly.Parameters['Failure Volume']),
  pitch:  Number(Yanfly.Parameters['Failure Pitch']),
  pan:    Number(Yanfly.Parameters['Failure Pan'])
};
Yanfly.Param.StealSEEmpty = {
  name:   String(Yanfly.Parameters['Empty Sound']),
  volume: Number(Yanfly.Parameters['Empty Volume']),
  pitch:  Number(Yanfly.Parameters['Empty Pitch']),
  pan:    Number(Yanfly.Parameters['Empty Pan'])
};
Yanfly.Param.StealSEItem = {
  name:   String(Yanfly.Parameters['Item Sound']),
  volume: Number(Yanfly.Parameters['Item Volume']),
  pitch:  Number(Yanfly.Parameters['Item Pitch']),
  pan:    Number(Yanfly.Parameters['Item Pan'])
};
Yanfly.Param.StealSEWeapon = {
  name:   String(Yanfly.Parameters['Weapon Sound']),
  volume: Number(Yanfly.Parameters['Weapon Volume']),
  pitch:  Number(Yanfly.Parameters['Weapon Pitch']),
  pan:    Number(Yanfly.Parameters['Weapon Pan'])
};
Yanfly.Param.StealSEArmor = {
  name:   String(Yanfly.Parameters['Armor Sound']),
  volume: Number(Yanfly.Parameters['Armor Volume']),
  pitch:  Number(Yanfly.Parameters['Armor Pitch']),
  pan:    Number(Yanfly.Parameters['Armor Pan'])
};
Yanfly.Param.StealSEGold = {
  name:   String(Yanfly.Parameters['Gold Sound']),
  volume: Number(Yanfly.Parameters['Gold Volume']),
  pitch:  Number(Yanfly.Parameters['Gold Pitch']),
  pan:    Number(Yanfly.Parameters['Gold Pan'])
};

//=============================================================================
// DataManager
//=============================================================================

Yanfly.Steal.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.Steal.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_StealSnatch) {
    this.processStealNotetagsI($dataItems);
    this.processStealNotetagsW($dataWeapons);
    this.processStealNotetagsA($dataArmors);
    this.processStealNotetags1($dataEnemies);
    this.processStealNotetags2($dataSkills);
    this.processStealNotetags2($dataItems);
    this.processStealNotetags3($dataItems);
    this.processStealNotetags3($dataWeapons);
    this.processStealNotetags3($dataArmors);
    this.processStealNotetags4($dataActors);
    this.processStealNotetags4($dataClasses);
    this.processStealNotetags4($dataWeapons);
    this.processStealNotetags4($dataArmors);
    this.processStealNotetags4($dataStates);
    Yanfly._loaded_YEP_StealSnatch = true;
  }
  return true;
};

DataManager.processStealNotetagsI = function(group) {
  if (Yanfly.ItemIdRef) return;
  Yanfly.ItemIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.ItemIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processStealNotetagsW = function(group) {
  if (Yanfly.WeaponIdRef) return;
  Yanfly.WeaponIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.WeaponIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processStealNotetagsA = function(group) {
  if (Yanfly.ArmorIdRef) return;
  Yanfly.ArmorIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.ArmorIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processStealNotetags1 = function(group) {
  var note1i = /<(?:STEAL I|STEAL ITEM)[ ](\d+):[ ](\d+)([%％])>/i;
  var note1w = /<(?:STEAL W|STEAL WEAPON)[ ](\d+):[ ](\d+)([%％])>/i;
  var note1a = /<(?:STEAL A|STEAL ARMOR)[ ](\d+):[ ](\d+)([%％])>/i;
  var note1g = /<(?:STEAL G|STEAL GOLD)[ ](\d+):[ ](\d+)([%％])>/i;
  var note1t = /<(?:STEAL)[ ](.*):[ ](\d+)([%％])>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    this.processAutoSetupSteal(obj);
    obj.stealResist = 0;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1i)) {
        var type = 'item';
        var id = parseInt(RegExp.$1);
        var rate = parseFloat(RegExp.$2);
        var entry = this.processCreateStealItem(type, id, rate);
        obj.stealableItems.push(entry);
      } else if (line.match(note1w)) {
        var type = 'weapon';
        var id = parseInt(RegExp.$1);
        var rate = parseFloat(RegExp.$2);
        var entry = this.processCreateStealItem(type, id, rate);
        obj.stealableItems.push(entry);
      } else if (line.match(note1a)) {
        var type = 'armor';
        var id = parseInt(RegExp.$1);
        var rate = parseFloat(RegExp.$2);
        var entry = this.processCreateStealItem(type, id, rate);
        obj.stealableItems.push(entry);
      } else if (line.match(note1g)) {
        var type = 'gold';
        var id = parseInt(RegExp.$1);
        var rate = parseFloat(RegExp.$2);
        var entry = this.processCreateStealItem(type, id, rate);
        obj.stealableItems.push(entry);
      } else if (line.match(note1t)) {
        var name = String(RegExp.$1).toUpperCase();
        var rate = parseFloat(RegExp.$2);
        if (Yanfly.ItemIdRef[name]) {
          var type = 'item';
          var id = Yanfly.ItemIdRef[name];
        } else if (Yanfly.WeaponIdRef[name]) {
          var type = 'weapon';
          var id = Yanfly.WeaponIdRef[name];
        } else if (Yanfly.ArmorIdRef[name]) {
          var type = 'armor';
          var id = Yanfly.ArmorIdRef[name];
        } else {
          continue;
        }
        var entry = this.processCreateStealItem(type, id, rate);
        obj.stealableItems.push(entry);
      } else if (line.match(/<(?:STEAL RESIST):[ ]([\+\-]\d+)([%％])>/i)) {
        obj.stealResist = parseFloat(RegExp.$1) * 0.01;
      }
    }
  }
};

DataManager.processAutoSetupSteal = function(obj) {
    obj.stealableItems = [];
    if (Yanfly.Param.StealGold && obj.gold > 0) {
      var rate = Yanfly.Param.StealGoldRate * 100;
      var entry = this.processCreateStealItem('gold', obj.gold, rate, true)
      obj.stealableItems.push(entry);
    }
    if (Yanfly.Param.StealDrops) {
      var max = obj.dropItems.length;
      for (var i = 0; i < max; ++i) {
        var drop = obj.dropItems[i];
        this.processConvertDropStealable(obj, drop);
      }
    }
};

DataManager.processConvertDropStealable = function(obj, drop) {
    if (!drop) return;
    if (drop.kind <= 0) return;
    switch (drop.kind) {
    case 1:
      var type = 'item';
      break;
    case 2:
      var type = 'weapon';
      break;
    case 3:
      var type = 'armor';
      break;
    }
    var id = drop.dataId;
    var rate = 1 / drop.denominator || 1;
    rate *= Yanfly.Param.StealDropRate;
    rate *= 100;
    var entry = this.processCreateStealItem(type, id, rate, true);
    obj.stealableItems.push(entry);
};

DataManager.processCreateStealItem = function(type, id, rate, drop) {
    drop = drop || false;
    var obj = {
      type: String(type).toLowerCase(),
      id: parseInt(id),
      rate: parseFloat(rate) * 0.01,
      isStolen: false,
      isDrop: drop
    }
    return obj;
};

DataManager.processStealNotetags2 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.steal = 'none';
    obj.stealRate = {
      all: 0,
      item: 0,
      weapon: 0,
      armor: 0,
      gold: 0
    };
    obj.stealType = [];
    var evalMode = 'none';
    obj.stealRateEval = '';
    obj.stealSuccessEval = '';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:STEAL)>/i)) {
        obj.steal = 'steal';
        obj.stealType = ['all'];
      } else if (line.match(/<(?:STEAL):[ ]([\+\-]\d+)([%％])>/i)) {
        obj.steal = 'steal';
        obj.stealType = ['all'];
        obj.stealRate['all'] = parseFloat(RegExp.$1) * 0.01;
      } else if (line.match(/<(?:STEAL ITEM)>/i)) {
        obj.steal = 'steal';
        obj.stealType.push('item');
      } else if (line.match(/<(?:STEAL ITEM):[ ]([\+\-]\d+)([%％])>/i)) {
        obj.steal = 'steal';
        obj.stealType.push('item');
        obj.stealRate['item'] = parseFloat(RegExp.$1) * 0.01;
      } else if (line.match(/<(?:STEAL WEAPON)>/i)) {
        obj.steal = 'steal';
        obj.stealType.push('weapon');
      } else if (line.match(/<(?:STEAL WEAPON):[ ]([\+\-]\d+)([%％])>/i)) {
        obj.steal = 'steal';
        obj.stealType.push('weapon');
        obj.stealRate['weapon'] = parseFloat(RegExp.$1) * 0.01;
      } else if (line.match(/<(?:STEAL ARMOR)>/i)) {
        obj.steal = 'steal';
        obj.stealType.push('armor');
      } else if (line.match(/<(?:STEAL ARMOR):[ ]([\+\-]\d+)([%％])>/i)) {
        obj.steal = 'steal';
        obj.stealType.push('armor');
        obj.stealRate['armor'] = parseFloat(RegExp.$1) * 0.01;
      } else if (line.match(/<(?:STEAL GOLD)>/i)) {
        obj.steal = 'steal';
        obj.stealType.push('gold');
      } else if (line.match(/<(?:STEAL GOLD):[ ]([\+\-]\d+)([%％])>/i)) {
        obj.steal = 'steal';
        obj.stealType.push('gold');
        obj.stealRate['gold'] = parseFloat(RegExp.$1) * 0.01;
      } else if (line.match(/<(?:SNATCH)>/i)) {
        obj.steal = 'snatch';
        obj.stealType = ['all'];
      } else if (line.match(/<(?:SNATCH):[ ]([\+\-]\d+)([%％])>/i)) {
        obj.steal = 'snatch';
        obj.stealType = ['all'];
        obj.stealRate['all'] = parseFloat(RegExp.$1) * 0.01;
      } else if (line.match(/<(?:SNATCH ITEM)>/i)) {
        obj.steal = 'snatch';
        obj.stealType.push('item');
      } else if (line.match(/<(?:SNATCH ITEM):[ ]([\+\-]\d+)([%％])>/i)) {
        obj.steal = 'snatch';
        obj.stealType.push('item');
        obj.stealRate['item'] = parseFloat(RegExp.$1) * 0.01;
      } else if (line.match(/<(?:SNATCH WEAPON)>/i)) {
        obj.steal = 'snatch';
        obj.stealType.push('weapon');
      } else if (line.match(/<(?:SNATCH WEAPON):[ ]([\+\-]\d+)([%％])>/i)) {
        obj.steal = 'snatch';
        obj.stealType.push('weapon');
        obj.stealRate['weapon'] = parseFloat(RegExp.$1) * 0.01;
      } else if (line.match(/<(?:SNATCH ARMOR)>/i)) {
        obj.steal = 'snatch';
        obj.stealType.push('armor');
      } else if (line.match(/<(?:SNATCH ARMOR):[ ]([\+\-]\d+)([%％])>/i)) {
        obj.steal = 'snatch';
        obj.stealType.push('armor');
        obj.stealRate['armor'] = parseFloat(RegExp.$1) * 0.01;
      } else if (line.match(/<(?:SNATCH GOLD)>/i)) {
        obj.steal = 'snatch';
        obj.stealType.push('gold');
      } else if (line.match(/<(?:SNATCH GOLD):[ ]([\+\-]\d+)([%％])>/i)) {
        obj.steal = 'snatch';
        obj.stealType.push('gold');
        obj.stealRate['gold'] = parseFloat(RegExp.$1) * 0.01;
      } else if (line.match(/<(?:CUSTOM STEAL RATE)>/i)) {
        evalMode = 'custom steal rate';
      } else if (line.match(/<\/(?:CUSTOM STEAL RATE)>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'custom steal rate') {
        obj.stealRateEval = obj.stealRateEval + line + '\n';
      } else if (line.match(/<(?:CUSTOM STEAL SUCCESS EFFECT)>/i)) {
        evalMode = 'custom steal success effect';
      } else if (line.match(/<\/(?:CUSTOM STEAL SUCCESS EFFECT)>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'custom steal success effect') {
        obj.stealSuccessEval = obj.stealSuccessEval + line + '\n';
      }
    }
  }
};

DataManager.processStealNotetags3 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    this.createStealSound(obj);
    obj.autoDebuff = Yanfly.Param.StealAutoEff;
    obj.afterStealEval = '';
    var evalMode = 'none';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:STEAL SOUND NAME):[ ](.*)>/i)) {
        var value = String(RegExp.$1);
        obj.stealSound['name'] = value;
      } else if (line.match(/<(?:STEAL SOUND VOLUME):[ ](\d+)>/i)) {
        var value = parseInt(RegExp.$1);
        obj.stealSound['volume'] = value;
      } else if (line.match(/<(?:STEAL SOUND PITCH):[ ](\d+)>/i)) {
        var value = parseInt(RegExp.$1);
        obj.stealSound['pitch'] = value;
      } else if (line.match(/<(?:STEAL SOUND PAN):[ ](\d+)>/i)) {
        var value = parseInt(RegExp.$1);
        obj.stealSound['pan'] = value;
      } else if (line.match(/<(?:ENABLE AUTOMATIC DEBUFF)>/i)) {
        obj.autoDebuff = true;
      } else if (line.match(/<(?:DISABLE AUTOMATIC DEBUFF)>/i)) {
        obj.autoDebuff = false;
      }
    }
    if (obj.autoDebuff) this.processAutomaticStealDebuff(obj);
    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:AFTER STEAL EFFECT)>/i)) {
        evalMode = 'after steal effect';
      } else if (line.match(/<\/(?:AFTER STEAL EFFECT)>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'after steal effect') {
        obj.afterStealEval = obj.afterStealEval + line + '\n';
      }
    }
  }
};

DataManager.processAutomaticStealDebuff = function(obj) {
    if (this.isItem(obj)) return;
    for (var i = 0; i < 8; ++i) {
      var line = 'target._paramPlus[' + i + '] -= item.params[' + i + ']';
      obj.afterStealEval = obj.afterStealEval + line + '\n';
    }
};

DataManager.createStealSound = function(obj) {
    if (this.isWeapon(obj)) {
      obj.stealSound = JsonEx.makeDeepCopy(Yanfly.Param.StealSEWeapon);
    } else if (this.isArmor(obj)) {
      obj.stealSound = JsonEx.makeDeepCopy(Yanfly.Param.StealSEArmor);
    } else {
      obj.stealSound = JsonEx.makeDeepCopy(Yanfly.Param.StealSEItem);
    }
};

DataManager.processStealNotetags4 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.stealRateBonus = [0, 0, 0, 0, 0];

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:STEAL RATE):[ ]([\+\-]\d+)([%％])>/i)) {
        var rate = parseFloat(RegExp.$1) * 0.01;
        for (var j = 0; j < 5; ++j) {
          obj.stealRateBonus[j] += rate;
        }
      } else if (line.match(/<(?:STEAL ITEM RATE):[ ]([\+\-]\d+)([%％])>/i)) {
        var rate = parseFloat(RegExp.$1) * 0.01;
        obj.stealRateBonus[1] += rate;
      } else if (line.match(/<(?:STEAL WEAPON RATE):[ ]([\+\-]\d+)([%％])>/i)) {
        var rate = parseFloat(RegExp.$1) * 0.01;
        obj.stealRateBonus[2] += rate;
      } else if (line.match(/<(?:STEAL ARMOR RATE):[ ]([\+\-]\d+)([%％])>/i)) {
        var rate = parseFloat(RegExp.$1) * 0.01;
        obj.stealRateBonus[3] += rate;
      } else if (line.match(/<(?:STEAL GOLD RATE):[ ]([\+\-]\d+)([%％])>/i)) {
        var rate = parseFloat(RegExp.$1) * 0.01;
        obj.stealRateBonus[4] += rate;
      }
    }
  }
};

//=============================================================================
// Game_Battler
//=============================================================================

Game_Battler.prototype.stealableItems = function() {
    return [];
};

Game_Battler.prototype.allItemsStolen = function(skill) {
    return false;
};

Game_Battler.prototype.stealRateBonus = function(type) {
    var rate = 0;
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      rate += state.stealRateBonus[type];
    }
    return rate;
};

Game_Battler.prototype.stealRateBonusType = function(type) {
    var arr = ['all', 'item', 'weapon', 'armor', 'gold'];
    var index = arr.indexOf(type);
    return this.stealRateBonus(index);
};

Game_Battler.prototype.afterStealEval = function(target, skill, item) {
    if (item.afterStealEval === '') return;
    var a = this;
    var user = this;
    var subject = this;
    var b = target;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var code = item.afterStealEval;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'AFTER STEAL CUSTOM EFFECT ERROR');
    }
    user.refresh();
    target.refresh();
};

Game_Battler.prototype.afterStealSuccessEval = function(target, skill, item) {
    if (skill.stealSuccessEval === '') return;
    var a = this;
    var user = this;
    var subject = this;
    var b = target;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var code = skill.stealSuccessEval;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'AFTER STEAL SUCCESS EFFECT ERROR');
    }
    user.refresh();
    target.refresh();
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.stealRateBonus = function(type) {
    var rate = Game_Battler.prototype.stealRateBonus.call(this, type);
    rate += this.actor().stealRateBonus[type];
    rate += this.currentClass().stealRateBonus[type];
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (!equip) continue;
      if (!equip.stealRateBonus) continue;
      rate += equip.stealRateBonus[type];
    }
    return rate;
};

//=============================================================================
// Game_Enemy
//=============================================================================

Yanfly.Steal.Game_Enemy_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
    Yanfly.Steal.Game_Enemy_setup.call(this, enemyId, x, y);
    this.createStealableItems();
};

Game_Enemy.prototype.createStealableItems = function() {
    this._stealableItems = JsonEx.makeDeepCopy(this.enemy().stealableItems);
};

Game_Enemy.prototype.stealableItems = function() {
    if (this._stealableItems === undefined) this.createStealableItems();
    return this._stealableItems;
};

Game_Enemy.prototype.allItemsStolen = function(skill) {
    if (this.stealableItems().length <= 0) return true;
    var max = this.stealableItems().length;
    for (var i = 0; i < max; ++i) {
      var stealable = this.stealableItems()[i];
      if (!skill.stealType.contains('all')) {
        if (!skill.stealType.contains(stealable.type)) continue;
      }
      if (!stealable.isStolen) return false;
    }
    return true;
};

Game_Enemy.prototype.stealResist = function() {
    var value = this.enemy().stealResist;
    return value;
};

if (Yanfly.Param.StealGoldRemove) {

Yanfly.Steal.Game_Enemy_gold = Game_Enemy.prototype.gold;
Game_Enemy.prototype.gold = function() {
    var gold = Yanfly.Steal.Game_Enemy_gold.call(this);
    var max = this.stealableItems().length;
    for (var i = 0; i < max; ++i) {
      var stealable = this.stealableItems()[i];
      if (stealable.type !== 'gold') continue;
      if (!stealable.isStolen) continue;
      if (!stealable.isDrop) continue;
      stealable.isDrop = false;
      gold = 0;
    }
    return gold;
};

} // Yanfly.Param.StealGoldRemove

if (Yanfly.Param.StealDropRemove) {

Yanfly.Steal.Game_Enemy_makeDropItems = Game_Enemy.prototype.makeDropItems;
Game_Enemy.prototype.makeDropItems = function() {
    var drops = Yanfly.Steal.Game_Enemy_makeDropItems.call(this);
    var max = this.stealableItems().length;
    for (var i = 0; i < max; ++i) {
      var stealable = this.stealableItems()[i];
      if (stealable.type === 'gold') continue;
      if (!stealable.isStolen) continue;
      if (!stealable.isDrop) continue;
      stealable.isDrop = false;
      var id = stealable.id;
      if (stealable.type === 'item') {
        var item = $dataItems[id];
      } else if (stealable.type === 'weapons') {
        var item = $dataWeapons[id];
      } else {
        var item = $dataArmors[id];
      }
      var index = drops.indexOf(item);
      drops.splice(index, 1);
    }
    return drops;
};

} // Yanfly.Param.StealDropRemove

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.Steal.Game_Action_applyItemUserEffect =
    Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
    Yanfly.Steal.Game_Action_applyItemUserEffect.call(this, target);
    this.applyItemStealEffect(target);
    this.applyItemSnatchEffect(target);
};

Game_Action.prototype.applyItemStealEffect = function(target) {
    if (!this.canProcessSteal(target)) return;
    if (target.allItemsStolen(this.item())) {
      return this.displayStealEmpty(target);
    }
    for (var i = 0; i < target.stealableItems().length; ++i) {
      var stealable = target.stealableItems()[i];
      if (!this.matchStealType(target, stealable)) continue;
      var rate = this.getStealableRate(target, stealable);
      var result = this.makeStealRandom(target, stealable) < rate;
      if (result) {
        this.getStealableItem(target, stealable);
        return;
      }
    }
    this.displayStealFailure(target);
};

Game_Action.prototype.applyItemSnatchEffect = function(target) {
    if (!this.canProcessSnatch(target)) return;
    var index = this._snatchTargetIndex || 0;
    var stealable = target.stealableItems()[index];
    if (this.matchStealType(target, stealable)) {
      var rate = this.getStealableRate(target, stealable);
      var result = this.makeStealRandom(target, stealable) < rate;
      if (result) {
        this.getStealableItem(target, stealable);
        return;
      }
    }
    this.displayStealFailure(target);
};

Game_Action.prototype.canProcessSteal = function(target) {
    if (!this.item()) return false;
    if (!this.subject().isActor()) return false;
    if (!target.isEnemy()) return false;
    return this.isStealAction();
};

Game_Action.prototype.isStealAction = function() {
    return this.item().steal === 'steal';
};

Game_Action.prototype.canProcessSnatch = function(target) {
    if (!this.item()) return false;
    if (!this.subject().isActor()) return false;
    if (!target.isEnemy()) return false;
    return this.isSnatchAction();
};

Game_Action.prototype.isSnatchAction = function() {
    if (!this.needsSelection()) return false;
    return this.item().steal === 'snatch';
};

Game_Action.prototype.matchStealType = function(target, stealable) {
    if (stealable.isStolen) return false;
    var skill = this.item();
    if (skill.stealType.contains('all')) return true;
    return skill.stealType.contains(stealable.type);
};

Game_Action.prototype.getStealableRate = function(target, stealable) {
    var rate = parseFloat(stealable.rate);
    rate += this.item().stealRate['all'];
    rate += this.item().stealRate[stealable.type];
    rate += this.subject().stealRateBonusType(stealable.type);
    rate += this.stealBonusFormula(target);
    rate -= target.stealResist();
    rate = this.customStealRateEval(target, stealable, rate);
    return rate;
};

Game_Action.prototype.stealBonusFormula = function(target) {
    var rate = 0;
    var item = this.item();
    var skill = this.item();
    var a = this.subject();
    var user = this.subject();
    var subject = this.subject();
    var b = target;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var code = Yanfly.Param.StealBonusFormula;
    try {
      rate = eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'STEAL BONUS FORMULA ERROR');
    }
    return rate;
};

Game_Action.prototype.customStealRateEval = function(target, stealable, rate) {
    if (this.item().stealRateEval === '') return rate;
    var item = this.item();
    var skill = this.item();
    var a = this.subject();
    var user = this.subject();
    var subject = this.subject();
    var b = target;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var code = skill.stealRateEval;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'STEAL RATE FORMULA ERROR');
    }
    return rate;
};

Game_Action.prototype.makeStealRandom = function(target, stealable) {
    var rate = Math.random();
    return rate;
};

Game_Action.prototype.getStealableItem = function(target, stealable) {
    stealable.isStolen = true;
    var id = stealable.id;
    var name = '';
    var icon = '';
    switch (stealable.type) {
    case 'item':
      var item = $dataItems[id];
      this.playStealSound(item.stealSound);
      $gameParty.gainItem(item, 1);
      var name = item.name;
      var icon = '\\i[' + item.iconIndex + ']';
      this.afterStealEffect(target, item);
      break;
    case 'weapon':
      var item = $dataWeapons[id];
      this.playStealSound(item.stealSound);
      $gameParty.gainItem(item, 1);
      var name = item.name;
      var icon = '\\i[' + item.iconIndex + ']';
      this.afterStealEffect(target, item);
      break;
    case 'armor':
      var item = $dataArmors[id];
      this.playStealSound(item.stealSound);
      $gameParty.gainItem(item, 1);
      var name = item.name;
      var icon = '\\i[' + item.iconIndex + ']';
      this.afterStealEffect(target, item);
      break;
    case 'gold':
      $gameParty.gainGold(id);
      this.playStealSound(Yanfly.Param.StealSEGold);
      var fmt = Yanfly.Param.StealGoldFmt;
      var name = fmt.format(Yanfly.Util.toGroup(id), TextManager.currencyUnit);
      if (Imported.YEP_CoreEngine && Yanfly.Icon.Gold > 0) {
        var icon = '\\i[' + Yanfly.Icon.Gold + ']';
      }
      this.subject().afterStealSuccessEval(target, this.item(), null);
      break;
    }
    this.makeBattleEngineCoreStealWait();
    var fmt = Yanfly.Param.StealSuccess;
    if (fmt === '') return;
    var text = fmt.format(this.subject().name(), target.name(), name, icon);
    this.displayStealText(text);
};

Game_Action.prototype.afterStealEffect = function(target, item) {
    this.subject().afterStealSuccessEval(target, this.item(), item);
    this.subject().afterStealEval(target, this.item(), item);
};

Game_Action.prototype.makeBattleEngineCoreStealWait = function() {
    if (!Imported.YEP_BattleEngineCore) return;
    var frames = Yanfly.Param.StealWait;
    if (frames > 0) BattleManager._actionList.push(['WAIT', [frames]]);
};

Game_Action.prototype.displayStealText = function(text) {
    if (!$gameParty.inBattle()) return;
    var scene = SceneManager._scene;
    if (text === '') return;
    if (!scene._logWindow) return;
    if (Yanfly.Param.StealCenter) text = '<CENTER>' + text;
    var win = scene._logWindow;
    win._lines.push(text);
    win.refresh();
};

Game_Action.prototype.playStealSound = function(sound) {
    if (!sound) return;
    if (sound.name && sound.name !== '') AudioManager.playSe(sound);
};

Game_Action.prototype.displayStealFailure = function(target) {
    this.playStealSound(Yanfly.Param.StealSEFail);
    var fmt = Yanfly.Param.StealFail;
    if (fmt === '') return;
    var text = fmt.format(this.subject().name(), target.name());
    this.displayStealText(text);
    this.makeBattleEngineCoreStealWait();
};

Game_Action.prototype.displayStealEmpty = function(target) {
    this.playStealSound(Yanfly.Param.StealSEEmpty);
    var fmt = Yanfly.Param.StealEmpty;
    if (fmt === '') return;
    var text = fmt.format(target.name());
    this.displayStealText(text);
    this.makeBattleEngineCoreStealWait();
};

Game_Action.prototype.setSnatchTarget = function(index) {
    this._snatchTargetIndex = index;
};

//=============================================================================
// Window_SnatchItem
//=============================================================================

function Window_SnatchItem() {
    this.initialize.apply(this, arguments);
}

Window_SnatchItem.prototype = Object.create(Window_ItemList.prototype);
Window_SnatchItem.prototype.constructor = Window_BattleItem;

Window_SnatchItem.prototype.initialize = function(itemWindow) {
    var wx = itemWindow.x;
    var wy = itemWindow.y;
    var ww = itemWindow.width;
    var wh = itemWindow.height;
    this._wordWrap = false;
    if (Imported.YEP_MessageCore && eval(Yanfly.Param.MSGDescWrap)) {
      this._wordWrap = true;
    }
    Window_ItemList.prototype.initialize.call(this, wx, wy, ww, wh);
    this.hide();
    this._enemy = null;
    this._action = null;
};

Window_SnatchItem.prototype.show = function() {
    this.select(0);
    this.showHelpWindow();
    Window_ItemList.prototype.show.call(this);
    this.activate();
};

Window_SnatchItem.prototype.hide = function() {
    this.hideHelpWindow();
    Window_ItemList.prototype.hide.call(this);
};

Window_SnatchItem.prototype.setDetails = function(enemy, action) {
    this._enemy = enemy;
    this._action = action;
    this.refresh();
    this.show();
};

Window_SnatchItem.prototype.isEnabled = function(stealable) {
    if (!stealable) return false;
    if (!this._action) return false;
    if (!this._action.item()) return false;
    if (stealable.isStolen) return false;
    if (this._action.item().stealType.contains('all')) return true;
    return this._action.item().stealType.contains(stealable.type);
};

Window_SnatchItem.prototype.makeItemList = function() {
    this._data = [];
    if (!this._enemy) return;
    this._data = this._enemy.stealableItems().clone();
};

Window_SnatchItem.prototype.drawItem = function(index) {
    var stealable = this._data[index];
    if (!stealable) return;
    var rect = this.itemRect(index);
    rect.width -= this.textPadding();
    this.resetFontSettings();
    this.drawStealable(stealable, rect.x, rect.y, rect.width);
    this.drawStealRate(stealable, rect.x, rect.y, rect.width);
};

Window_SnatchItem.prototype.drawStealable = function(stealable, wx, wy, ww) {
    var id = stealable.id;
    switch (stealable.type) {
    case 'item':
      var item = $dataItems[id];
      break;
    case 'weapon':
      var item = $dataWeapons[id];
      break;
    case 'armor':
      var item = $dataArmors[id];
      break;
    case 'gold':
      this.drawStealGold(stealable, wx, wy, ww)
      return;
      break;
    }
    this.changePaintOpacity(this.isEnabled(stealable));
    this.drawItemName(item, wx, wy, ww);
};

Window_SnatchItem.prototype.drawStealGold = function(stealable, wx, wy, ww) {
    var icon = (Imported.YEP_CoreEngine) ? Yanfly.Icon.Gold : 0;
    var iconBoxWidth = Window_Base._iconWidth + 4;
    this.resetTextColor();
    this.changePaintOpacity(this.isEnabled(stealable));
    this.drawIcon(icon, wx + 2, wy + 2);
    var fmt = Yanfly.Param.StealGoldFmt;
    var id = stealable.id;
    var text = fmt.format(Yanfly.Util.toGroup(id), TextManager.currencyUnit);
    this.drawText(text, wx + iconBoxWidth, wy, ww - iconBoxWidth);
};

Window_SnatchItem.prototype.drawStealRate = function(stealable, wx, wy, ww) {
    var decimals = Yanfly.Param.SnatchDecimal;
    if (stealable.isStolen) {
      var text = Yanfly.Param.SnatchStolen;
    } else {
      var rate = this._action.getStealableRate(this._enemy, stealable);
      rate = (rate * 100).clamp(0, 100);
      var text = rate.toFixed(decimals) + '%';
    }
    this.contents.fontSize = Yanfly.Param.SnatchFontSize;
    this.changePaintOpacity(this.isEnabled(stealable));
    this.drawText(text, wx, wy, ww, 'right');
};

Window_SnatchItem.prototype.updateHelp = function() {
    var stealable = this.item();
    if (!stealable) {
      this._helpWindow.setItem(null);
    } else {
      var text = this.getHelpText(stealable);
      this._helpWindow.setText(text);
    }
};

Window_SnatchItem.prototype.getHelpText = function(stealable) {
    var id = stealable.id;
    switch (stealable.type) {
    case 'item':
      var item = $dataItems[id];
      break;
    case 'weapon':
      var item = $dataWeapons[id];
      break;
    case 'armor':
      var item = $dataArmors[id];
      break;
    case 'gold':
      var fmt = Yanfly.Param.SnatchHelpText;
      var text = fmt.format(Yanfly.Util.toGroup(id), TextManager.currencyUnit);
      if (this._wordWrap) text = '<WordWrap>' + text;
      return text;
      break;
    }
    var text = item.description;
    if (this._wordWrap) text = '<WordWrap>' + text;
    return text;
};

//=============================================================================
// Scene_Battle
//=============================================================================

Yanfly.Steal.Scene_Battle_createDisplayObjects =
    Scene_Battle.prototype.createDisplayObjects;
Scene_Battle.prototype.createDisplayObjects = function() {
    Yanfly.Steal.Scene_Battle_createDisplayObjects.call(this);
    this.createSnatchWindow();
};

Yanfly.Steal.Scene_Battle_isAnyInputWindowActive =
    Scene_Battle.prototype.isAnyInputWindowActive;
Scene_Battle.prototype.isAnyInputWindowActive = function() {
    if (this._snatchWindow && this._snatchWindow.active) return true;
    return Yanfly.Steal.Scene_Battle_isAnyInputWindowActive.call(this);
};

Scene_Battle.prototype.createSnatchWindow = function() {
    this._snatchWindow = new Window_SnatchItem(this._itemWindow);
    this._snatchWindow.setHelpWindow(this._helpWindow);
    this._snatchWindow.setHandler('ok',     this.onSnatchOk.bind(this));
    this._snatchWindow.setHandler('cancel', this.onSnatchCancel.bind(this));
    this.addWindow(this._snatchWindow);
};

Yanfly.Steal.Scene_Battle_onEnemyOk = Scene_Battle.prototype.onEnemyOk;
Scene_Battle.prototype.onEnemyOk = function() {
    if (this.isShowSnatchWindow()) {
      this.activateSnatchWindow();
    } else {
      Yanfly.Steal.Scene_Battle_onEnemyOk.call(this);
    }
};

Scene_Battle.prototype.isShowSnatchWindow = function() {
    var action = BattleManager.inputtingAction();
    return action.isSnatchAction();
};

Scene_Battle.prototype.activateSnatchWindow = function() {
    var enemy = this._enemyWindow.enemy();
    var action = BattleManager.inputtingAction();
    this._snatchWindow.setDetails(enemy, action);
};

Scene_Battle.prototype.onSnatchOk = function() {
    var index = this._snatchWindow.index();
    var action = BattleManager.inputtingAction();
    action.setSnatchTarget(index);
    this._snatchWindow.hide();
    Yanfly.Steal.Scene_Battle_onEnemyOk.call(this);
};

Scene_Battle.prototype.onSnatchCancel = function() {
    this._snatchWindow.hide();
    this.selectEnemySelection();
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

if (!Yanfly.Util.toGroup) {
    Yanfly.Util.toGroup = function(inVal) {
        return inVal;
    }
};

Yanfly.Util.displayError = function(e, code, message) {
  console.log(message);
  console.log(code || 'NON-EXISTENT');
  console.error(e);
  if (Utils.isNwjs() && Utils.isOptionValid('test')) {
    if (!require('nw.gui').Window.get().isDevToolsOpen()) {
      require('nw.gui').Window.get().showDevTools();
    }
  }
};

//=============================================================================
// End of File
//=============================================================================
