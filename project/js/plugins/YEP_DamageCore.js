//=============================================================================
// Yanfly Engine Plugins - Damage Core
// YEP_DamageCore.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_DamageCore = true;

var Yanfly = Yanfly || {};
Yanfly.DMG = Yanfly.DMG || {};
Yanfly.DMG.version = 1.07;

//=============================================================================
 /*:
 * @plugindesc v1.07 Expand the control you have over the game's damage
 * calculation with more features and effects.
 * @author Yanfly Engine Plugins
 *
 * @param ---Damage Cap---
 * @default
 *
 * @param Enable Cap
 * @parent ---Damage Cap---
 * @type boolean
 * @on Damage Cap
 * @off No Damage Cap
 * @desc Do you wish to put a cap on your damage?
 * NO - false     YES - true     Default: false
 * @default true
 *
 * @param Maximum Damage
 * @parent ---Damage Cap---
 * @type number
 * @min 0
 * @desc If enabled, what is the default maximum damage?
 * @default 9999
 *
 * @param Maximum Healing
 * @parent ---Damage Cap---
 * @type number
 * @min 0
 * @desc If enabled, what is the default maximum healing?
 * @default 9999
 *
 * @param ---Damage Steps---
 * @default
 *
 * @param Damage Step 1
 * @parent ---Damage Steps---
 * @desc This is the step after the base value has been calculated.
 * Previous line: baseDamage = this.evalDamageFormula(target);
 * @default baseDamage = this.modifyBaseDamage(value, baseDamage, target);
 *
 * @param Damage Step 2
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default baseDamage *= this.calcElementRate(target);
 *
 * @param Damage Step 3
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default 
 *
 * @param Damage Step 4
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default 
 *
 * @param Damage Step 5
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default 
 *
 * @param Damage Step 6
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default critical = this.modifyCritical(critical, baseDamage, target);
 *
 * @param Damage Step 7
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default target.result().critical = critical;
 *
 * @param Damage Step 8
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default value = baseDamage;
 *
 * @param Damage Step 9
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default 
 *
 * @param Damage Step 10
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default if (baseDamage > 0) {
 *
 * @param Damage Step 11
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default value = this.applyDamageRate(value, baseDamage, target);
 *
 * @param Damage Step 12
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 13
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 14
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 15
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 16
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 17
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 18
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default }
 *
 * @param Damage Step 19
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 20
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default if (baseDamage < 0) {
 *
 * @param Damage Step 21
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default value = this.applyHealRate(value, baseDamage, target);
 *
 * @param Damage Step 22
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 23
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 24
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 25
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 26
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 27
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 28
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default }
 *
 * @param Damage Step 29
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 30
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default if (critical) {
 *
 * @param Damage Step 31
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default value = this.applyCriticalRate(value, baseDamage, target);
 *
 * @param Damage Step 32
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 33
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 34
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 35
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 36
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 37
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 38
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default }
 *
 * @param Damage Step 39
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 40
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default if (this.isPhysical()) {
 *
 * @param Damage Step 41
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default value = this.applyPhysicalRate(value, baseDamage, target);
 *
 * @param Damage Step 42
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 43
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 44
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 45
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 46
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 47
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default value = this.applyFlatPhysical(value, baseDamage, target);
 *
 * @param Damage Step 48
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default }
 *
 * @param Damage Step 49
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 50
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default if (this.isMagical()) {
 *
 * @param Damage Step 51
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default value = this.applyMagicalRate(value, baseDamage, target);
 *
 * @param Damage Step 52
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 53
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 54
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 55
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 56
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 57
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default value = this.applyFlatMagical(value, baseDamage, target);
 *
 * @param Damage Step 58
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default }
 *
 * @param Damage Step 59
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 60
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default if (baseDamage > 0) {
 *
 * @param Damage Step 61
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default value = this.applyFlatDamage(value, baseDamage, target);
 *
 * @param Damage Step 62
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 63
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 64
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 65
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 66
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 67
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 68
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default }
 *
 * @param Damage Step 69
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 70
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default if (baseDamage < 0) {
 *
 * @param Damage Step 71
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default value = this.applyFlatHeal(value, baseDamage, target);
 *
 * @param Damage Step 72
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 73
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 74
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 75
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 76
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 77
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 78
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default }
 *
 * @param Damage Step 79
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 80
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default if (critical) {
 *
 * @param Damage Step 81
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default value = this.applyFlatCritical(value, baseDamage, target);
 *
 * @param Damage Step 82
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 83
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 84
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 85
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 86
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 87
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 88
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default }
 *
 * @param Damage Step 89
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 90
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default value = this.applyVariance(value, item.damage.variance);
 *
 * @param Damage Step 91
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 92
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 93
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 94
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 95
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default value = this.applyGuard(value, target);
 *
 * @param Damage Step 96
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 97
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 98
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default
 *
 * @param Damage Step 99
 * @parent ---Damage Steps---
 * @desc This is the next step in the damage flow.
 * @default value = this.applyFlatGlobal(value, baseDamage, target);
 *
 * @param Damage Step 100
 * @parent ---Damage Steps---
 * @desc This is the final step in the damage flow.
 * Following line: return Math.round(value);
 * @default value = this.applyMinimumDamage(value, baseDamage, target);
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The game gives a lot of control over the damage formula, but it doesn't give
 * much control for everything else after calculating it. This plugin will give
 * you control over the order the damage formula is calculated in addition to
 * letting you insert your own changes to it at whatever you wish.
 *
 * If you have YEP_BattleEngineCore.js installed, place this plugin under
 * YEP_BattleEngineCore.js if you wish to make use of the extra features this
 * plugin has to offer.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are some notetags you can use to modify the damage caps.
 *
 * Skill and Item Notetag:
 *   <Bypass Damage Cap>
 *   This causes the skill/item to ignore the damage cap and go with the
 *   regular value of the calculated damage. This will cancel out any damage
 *   cap effects otherwise. This will take priority over any damage cap
 *   breaking effects.
 *
 * Actor, Class, Enemy, Weapon, Armor, and State Notetags:
 *   <Bypass Damage Cap>
 *   This will cause the related battler to bypass any damage capping effects
 *   and its skills/items will go with the uncapped calculated value.
 *
 *   <Damage Cap: x>
 *   <Heal Cap: x>
 *   This will set the skill to have a damage/healing cap of x. This will
 *   cancel out any damage cap bypassers. If a battler has more than one
 *   damage cap, it will go with the highest value. This means if an actor that
 *   has a weapon that brings the damage cap to 99,999 and an accessory that
 *   brings the damage cap to 999,999, then the battler's damage cap will be
 *   the highest value of 999,999.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are plugins you can use to set the damage cap rulings for your
 * game. Keep in mind that individual aspects such as equipment traits, skill
 * properties, etc. will take priority over these default caps.
 *
 * Plugin Command:
 *   SetDamageCap 9999     Sets the default damage cap to 9999.
 *   SetHealingCap 9999    Sets the default healing cap to 9999.
 *   EnableDamageCap       Enables default cap for both damage and healing.
 *   DisableDamageCap      Disables default cap for both damage and healing.
 *
 * ============================================================================
 * Lunatic Mode - Damage Formula
 * ============================================================================
 *
 * For those who think the damage formula box is too small and would like to
 * use the notebox instead to declare the damage formula, you can use the
 * notetags below:
 *
 * Skill and Item Notetags:
 *   <damage formula>
 *    value = 500;
 *    value += 2500;
 *   </damage formula>
 *   This will overwrite the damage formula found at the top and use the
 *   strings in the middle as the formula instead. Keep in mind that using
 *   comments here will cancel out anything following after. New variables can
 *   be used, too, to make damage calculations a bit easier.
 *
 *   value   - Refers to the amount that will become the base damage value.
 *   user    - Refers to the actor/enemy using the skill/item.
 *   subject - Refers to the actor/enemy using the skill/item.
 *   target  - Refers to the target actor/enemy on the receiving end of
 *             the skill/item.
 *
 * ============================================================================
 * Lunatic Mode - Damage Steps
 * ============================================================================
 *
 * The damage formula isn't all there is to calculating the damage that appears
 * at the very end. In this plugin's parameters towards the bottom, you'll see
 * a large list of Damage Steps. Each one of these steps is a line of code that
 * the damage count will run through in order to calculate and finalize the
 * damage output.
 *
 * The purpose of those parameters is to allow you ease of access on where you
 * want to insert code that is your own or custom code provided by another
 * plugin. Here's a quick reference on how the original damage flow looked like:
 *
 * Game_Action.prototype.makeDamageValue = function(target, critical) {
 *     var item = this.item();
 *     var baseDamage = this.evalDamageFormula(target);
 *     var value = baseDamage * this.calcElementRate(target);
 *     if (this.isPhysical()) {
 *         value *= target.pdr;
 *     }
 *     if (this.isMagical()) {
 *         value *= target.mdr;
 *     }
 *     if (baseDamage < 0) {
 *         value *= target.rec;
 *     }
 *     if (critical) {
 *         value = this.applyCritical(value);
 *     }
 *     value = this.applyVariance(value, item.damage.variance);
 *     value = this.applyGuard(value, target);
 *     value = Math.round(value);
 *     return value;
 * };
 *
 * In the vein of keeping everything organized, the following lines have been
 * incorporated into new functions:
 *
 * Formula                               New Function
 *   value *= target.pdr                   value = this.applyPhysicalRate
 *   value *= target.mdr                   value = this.applyMagicalRate
 *   value *= target.rec                   value = this.applyHealRate
 *   value = this.applyCritical(value)     value = this.applyCriticalRate
 *
 * ============================================================================
 * Yanfly Engine Plugins - Battle Engine Extension - Action Sequence Commands
 * ============================================================================
 *
 * If you have YEP_BattleEngineCore.js installed with this plugin located
 * underneath it in the Plugin Manager, you can make use of these extra
 * damage related action sequences.
 *
 *=============================================================================
 * BYPASS DAMAGE CAP
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This will override all damage caps. This is applied to healing, too.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: bypass damage cap
 *=============================================================================
 *
 *=============================================================================
 * DAMAGE CAP: x
 * HEALING CAP: x
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This sets the action's damage cap to x, overriding all over damage caps in
 * play except its own. This will also apply to healing, too.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: damage cap: 999
 *                healing cap: 999999
 *=============================================================================
 *
 *=============================================================================
 * DAMAGE RATE: x%
 * DAMAGE RATE: x.y
 * DAMAGE RATE: VARIABLE x
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This changes the damage rate across all types of damage (physical, magical,
 * and certain hit). The damage rate is reset at the end of each action
 * sequence. If you use a variable, it is treated as a percentage.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: damage rate: 50%
 *                damage rate: 8.667
 *                damage rate: variable 3
 *=============================================================================
 *
 *=============================================================================
 * FLAT DAMAGE: +x
 * FLAT DAMAGE: -x
 * FLAT DAMAGE: VARIABLE x
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This adds a flat damage across all types of damage (physical, magical, and
 * certain hit). The flat damage is reset at the end of each action sequence.
 * If you use a variable, it is added onto the damage.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: flat damage: +100
 *                flat damage: -250
 *                flat damage: variable 3
 *=============================================================================
 *
 *=============================================================================
 * FLAT GLOBAL: +x
 * FLAT GLOBAL: -x
 * FLAT GLOBAL: VARIABLE x
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This adds a flat global damage and heal across all types of damage
 * (physical, magical, and certain hit). The flat damage and heal is reset at
 * the end of each action sequence. If you use a variable, it is added onto the
 * damage and heal.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: flat global: +100
 *                flat global: -250
 *                flat global: variable 3
 *=============================================================================
 *
 *=============================================================================
 * FLAT HEAL: +x
 * FLAT HEAL: -x
 * FLAT HEAL: VARIABLE x
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This adds a flat heal across all types of damage (physical, magical, and
 * certain hit). The flat heal is reset at the end of each action sequence.
 * If you use a variable, it is added onto the heal.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: flat heal: +100
 *                flat heal: -250
 *                flat heal: variable 3
 *=============================================================================
 *
 *=============================================================================
 * GLOBAL RATE: x%
 * GLOBAL RATE: x.y
 * GLOBAL RATE: VARIABLE x
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This changes the damage and healing rates across all types of damage
 * (physical, magical, and certain hit). The damage and healing rates are reset
 * at the end of each action sequence. If you use a variable, it is treated as
 * a percentage.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: global rate: 50%
 *                global rate: 8.667
 *                global rate: variable 3
 *=============================================================================
 *
 *=============================================================================
 * HEAL RATE: x%
 * HEAL RATE: x.y
 * HEAL RATE: VARIABLE x
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This changes the healing rate across all types of damage (physical, magical,
 * and certain hit). The healing rate is reset at the end of each action
 * sequence. If you use a variable, it is treated as a percentage.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: heal rate: 50%
 *                heal rate: 8.667
 *                heal rate: variable 3
 *=============================================================================
 *
 *=============================================================================
 * RESET DAMAGE CAP
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This will reset the damage cap implemented by the Damage Cap action
 * sequence. This will also reset the effects of the Bypass Damage Cap
 * action sequence.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: reset damage cap
 *=============================================================================
 *
 *=============================================================================
 * RESET DAMAGE MODIFIERS
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This will cause all damage and healing modifiers caused by action sequences
 * to reset. While they normally reset at the end of each action sequence, this
 * will allow you to do it manually.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: reset damage modifiers
 *=============================================================================
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.07:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.06:
 * - Lunatic Mode fail safes added.
 *
 * Version 1.05:
 * - Added failsafe for damage cap check in case Lunatic Mode effects of other
 * plugins would push the damage past the capped amount.
 *
 * Version 1.04:
 * - Rewored Damage Steps 1 through 8. If you're updating from an old version,
 * please update the these manually:
 *   Step 1: baseDamage = this.modifyBaseDamage(value, baseDamage, target);
 *   Step 2: baseDamage *= this.calcElementRate(target);
 *   Steps 3 through 5: (empty)
 *   Step 6: critical = this.modifyCritical(critical, baseDamage, target);
 *   Step 7: target.result().critical = critical;
 *   Step 8: value = baseDamage;
 * - This change was made to Element Absorb and Disperse Damage better. This
 * damage step change is also more efficient in calculating damage effects that
 * alters the baseDamage.
 *
 * Version 1.03:
 * - Changed default parameter in Damage Step 4 from
 *   'baseDamage = this.modifyBaseDamage(value, baseDamage, target);' to
 *   'value = this.modifyBaseDamage(value, baseDamage, target);'
 * Be sure to manually change this yourself if you want to get things like the
 * Selection Control's Disperse Damage mechanic to work.
 *
 * Version 1.02:
 * - Updated for RPG Maker MV version 1.1.0.
 * - <Damage Formula> notetag now supports comments.
 *
 * Version 1.01:
 * - Fixed a bug with <Damage Formula> not recording custom formulas correctly.
 *
 * Version 1.00:
 * - Finished plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_DamageCore');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.DMGEnableCap = eval(String(Yanfly.Parameters['Enable Cap']));
Yanfly.Param.DMGMaxDamage = Number(Yanfly.Parameters['Maximum Damage']);
Yanfly.Param.DMGMaxHealing = Number(Yanfly.Parameters['Maximum Healing']);

Yanfly.SetupParameters = function() {
  Yanfly.DMG.DamageFlow = '';
  for (var i = 1; i <= 100; ++i) {
    var param = 'Damage Step ' + i;
    Yanfly.DMG.DamageFlow += String(Yanfly.Parameters[param]) + '\n';
  }
};
Yanfly.SetupParameters();

//=============================================================================
// DataManager
//=============================================================================

Yanfly.DMG.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Yanfly.DMG.DataManager_isDatabaseLoaded.call(this)) return false;
    if (!Yanfly._loaded_YEP_DamageCore) {
      this.processDMGNotetags1($dataSkills);
      this.processDMGNotetags1($dataItems);
      this.processDMGNotetags2($dataActors);
      this.processDMGNotetags2($dataClasses);
      this.processDMGNotetags2($dataEnemies);
      this.processDMGNotetags2($dataWeapons);
      this.processDMGNotetags2($dataArmors);
      this.processDMGNotetags2($dataStates);
      Yanfly._loaded_YEP_DamageCore = true;
    }
		return true;
};

DataManager.processDMGNotetags1 = function(group) {
  var noteD1 = /<(?:DAMAGE CAP|HEAL CAP|HEALING CAP):[ ](\d+)>/i;
  for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    var damageFormulaMode = false;
    obj.damage.custom = false;
    obj.breakDamageCap = false;
    obj.damageCap = undefined;

    for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
      if (line.match(/<(?:BREAK DAMAGE CAP|BYPASS DAMAGE CAP)>/i)) {
        obj.breakDamageCap = true;
        obj.damageCap = undefined;
      } else if (line.match(noteD1)) {
        obj.damageCap = parseInt(RegExp.$1);
        obj.breakDamageCap = false;
      } else if (line.match(/<(?:DAMAGE FORMULA)>/i)) {
				damageFormulaMode = true;
        obj.damage.formula = '';
        obj.damage.custom = true;
			} else if (line.match(/<\/(?:DAMAGE FORMULA)>/i)) {
				damageFormulaMode = false;
			} else if (damageFormulaMode) {
        obj.damage.formula = obj.damage.formula + line + '\n';
      }
		}
	}
};

DataManager.processDMGNotetags2 = function(group) {
  var noteD1 = /<(?:BREAK DAMAGE CAP|BYPASS DAMAGE CAP)>/i;
  var noteD2 = /<(?:DAMAGE CAP):[ ](\d+)>/i;
  var noteD3 = /<(?:HEAL CAP|HEALING CAP):[ ](\d+)>/i;
  for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.breakDamageCap = undefined;
    obj.damageCap = undefined;
    obj.healCap = undefined;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(noteD1)) {
				obj.breakDamageCap = true;
        obj.damageCap = undefined;
        obj.healCap = undefined;
      } else if (line.match(noteD2)) {
        obj.damageCap = parseInt(RegExp.$1);
        obj.breakDamageCap = undefined;
      } else if (line.match(noteD3)) {
        obj.healCap = parseInt(RegExp.$1) * -1;
        obj.breakDamageCap = undefined;
      }
		}
	}
};

//=============================================================================
// BattleManager
//=============================================================================

if (Imported.YEP_BattleEngineCore) {
Yanfly.DMG.BattleManager_processActionSequence =
  BattleManager.processActionSequence;
  BattleManager.processActionSequence = function(actionName, actionArgs) {
    // BYPASS DAMAGE CAP
    if (actionName === 'BYPASS DAMAGE CAP') {
      return this.actionBypassDamageCap();
    }
    // DAMAGE CAP, HEALING CAP
    if (actionName === 'DAMAGE CAP' || actionName === 'HEALING CAP') {
      return this.actionDamageCap(actionArgs);
    }
    // DAMAGE RATE
    if (actionName === 'DAMAGE RATE') {
      return this.actionDamageRate(actionArgs);
    }
    // FLAT DAMAGE
    if (actionName === 'FLAT DAMAGE') {
      return this.actionFlatDamage(actionArgs);
    }
    // FLAT GLOBAL
    if (actionName === 'FLAT GLOBAL') {
      return this.actionFlatGlobal(actionArgs);
    }
    // FLAT HEAL
    if (actionName === 'FLAT HEAL') {
      return this.actionFlatHeal(actionArgs);
    }
    // GLOBAL RATE
    if (actionName === 'GLOBAL RATE') {
      return this.actionGlobalRate(actionArgs);
    }
    // HEAL RATE
    if (actionName === 'HEAL RATE') {
      return this.actionHealRate(actionArgs);
    }
    // RESET DAMAGE CAP
    if (actionName === 'RESET DAMAGE CAP') {
      return this.actionResetDamageCap();
    }
    // RESET DAMAGE MODIFIERS
    if (actionName === 'RESET DAMAGE MODIFIERS') {
      return this.actionResetDamageModifiers();
    }
    return Yanfly.DMG.BattleManager_processActionSequence.call(this,
      actionName, actionArgs);
  };
};

BattleManager.actionBypassDamageCap = function() {
    $gameSystem.actSeqBypassDamageCap();
    return true;
};

BattleManager.actionDamageCap = function(actionArgs) {
    if (!actionArgs) return;
    if (actionArgs[0]) {
      var value = parseInt(actionArgs[0]);
      $gameSystem.setActSeqDamageCap(value);
    }
    return true;
};

BattleManager.actionDamageRate = function(actionArgs) {
    if (actionArgs[0].match(/(?:VARIABLE|VAR)[ ](\d+)/i)) {
      var value = parseFloat($gameVariables.value(parseInt(RegExp.$1)) * 0.01);
    } else if (actionArgs[0].match(/(\d+)([%％])/i)) {
      var value = parseFloat(RegExp.$1 * 0.01);
    } else if (actionArgs[0].match(/(\d+).(\d+)/i)) {
      var value = parseFloat(String(RegExp.$1) + '.' + String(RegExp.$1));
    } else {
      return true;
    }
    $gameSystem._damageRate = value;
    return true;
};

BattleManager.actionFlatDamage = function(actionArgs) {
    if (actionArgs[0].match(/(?:VARIABLE|VAR)[ ](\d+)/i)) {
      var value = parseInt($gameVariables.value(parseInt(RegExp.$1)));
    } else if (actionArgs[0].match(/([\+\-]\d+)/i)) {
      var value = parseInt(RegExp.$1);
    } else if (actionArgs[0].match(/(\d+)/i)) {
      var value = parseInt(RegExp.$1);
    } else {
      return true;
    }
    $gameSystem._flatDamage = value;
    return true;
};

BattleManager.actionFlatGlobal = function(actionArgs) {
    if (actionArgs[0].match(/(?:VARIABLE|VAR)[ ](\d+)/i)) {
      var value = parseInt($gameVariables.value(parseInt(RegExp.$1)));
    } else if (actionArgs[0].match(/([\+\-]\d+)/i)) {
      var value = parseInt(RegExp.$1);
    } else if (actionArgs[0].match(/(\d+)/i)) {
      var value = parseInt(RegExp.$1);
    } else {
      return true;
    }
    $gameSystem._flatDamage = value;
    $gameSystem._flatHeal = value;
    return true;
};

BattleManager.actionFlatHeal = function(actionArgs) {
    if (actionArgs[0].match(/(?:VARIABLE|VAR)[ ](\d+)/i)) {
      var value = parseInt($gameVariables.value(parseInt(RegExp.$1)));
    } else if (actionArgs[0].match(/([\+\-]\d+)/i)) {
      var value = parseInt(RegExp.$1);
    } else if (actionArgs[0].match(/(\d+)/i)) {
      var value = parseInt(RegExp.$1);
    } else {
      return true;
    }
    $gameSystem._flatHeal = value;
    return true;
};

BattleManager.actionGlobalRate = function(actionArgs) {
    if (actionArgs[0].match(/(?:VARIABLE|VAR)[ ](\d+)/i)) {
      var value = parseFloat($gameVariables.value(parseInt(RegExp.$1)) * 0.01);
    } else if (actionArgs[0].match(/(\d+)([%％])/i)) {
      var value = parseFloat(RegExp.$1 * 0.01);
    } else if (actionArgs[0].match(/(\d+).(\d+)/i)) {
      var value = parseFloat(String(RegExp.$1) + '.' + String(RegExp.$1));
    } else {
      return true;
    }
    $gameSystem._damageRate = value;
    $gameSystem._healRate = value;
    return true;
};

BattleManager.actionHealRate = function(actionArgs) {
    if (actionArgs[0].match(/(?:VARIABLE|VAR)[ ](\d+)/i)) {
      var value = parseFloat($gameVariables.value(parseInt(RegExp.$1)) * 0.01);
    } else if (actionArgs[0].match(/(\d+)([%％])/i)) {
      var value = parseFloat(RegExp.$1 * 0.01);
    } else if (actionArgs[0].match(/(\d+).(\d+)/i)) {
      var value = parseFloat(String(RegExp.$1) + '.' + String(RegExp.$1));
    } else {
      return true;
    }
    $gameSystem._healRate = value;
    return true;
};

BattleManager.actionResetDamageCap = function() {
    $gameSystem.resetActSeqDamageCap();
    return true;
};

BattleManager.actionResetDamageModifiers = function() {
    $gameSystem.resetDamageSettings();
    return true;
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.DMG.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Yanfly.DMG.Game_System_initialize.call(this);
    this.resetActSeqDamageCap();
    this.resetDamageSettings();
};

Game_System.prototype.resetActSeqDamageCap = function() {
    this._actSeqBypassDamageCap = false;
    this._actSeqDamageCap = undefined;
};

Game_System.prototype.actSeqBypassDamageCap = function() {
    this._actSeqBypassDamageCap = true;
};

Game_System.prototype.getActSeqBypassDamageCap = function() {
    return this._actSeqBypassDamageCap;
};

Game_System.prototype.setActSeqDamageCap = function(value) {
    this._actSeqDamageCap = value;
};

Game_System.prototype.getActSeqDamageCap = function() {
    return this._actSeqDamageCap;
};

Game_System.prototype.resetDamageSettings = function() {
    this._damageRate = 1.0;
    this._flatDamage = 0;
    this._healRate = 1.0;
    this._flatHeal = 0;
    this._defaultDamageCap = Yanfly.Param.DMGEnableCap;
};

Game_System.prototype.damageRate = function() {
    if (this._damageRate === undefined) this.resetDamageSettings();
    return this._damageRate;
};

Game_System.prototype.flatDamage = function() {
    if (this._flatDamage === undefined) this.resetDamageSettings();
    return this._flatDamage;
};

Game_System.prototype.healRate = function() {
    if (this._healRate === undefined) this.resetDamageSettings();
    return this._healRate;
};

Game_System.prototype.flatHeal = function() {
    if (this._flatHeal === undefined) this.resetDamageSettings();
    return this._flatHeal;
};

Game_System.prototype.isDamageCapped = function() {
    return this._defaultDamageCap;
};

Game_System.prototype.maximumDamage = function() {
    if (this._newDamageCap !== undefined) return this._newDamageCap;
    return Yanfly.Param.DMGMaxDamage;
};

Game_System.prototype.maximumHealing = function() {
    if (this._newHealingCap !== undefined) return this._newHealingCap;
    return Yanfly.Param.DMGMaxHealing * -1;
};

Game_System.prototype.setNewDamageCap = function(value, damage) {
    if (damage) {
      this._newDamageCap = value;
    } else {
      this._newHealingCap = value * -1;
    }
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Yanfly.DMG.Game_BattlerBase_refresh = Game_BattlerBase.prototype.refresh;
Game_BattlerBase.prototype.refresh = function() {
    Yanfly.DMG.Game_BattlerBase_refresh.call(this);
    this.resetDMGTempValues();
};

Game_BattlerBase.prototype.resetDMGTempValues = function() {
    this._isDMGCapped = undefined;
    this._maximumDamage = undefined;
    this._maximumHealing = undefined;
};

//=============================================================================
// Game_Battler
//=============================================================================

Yanfly.DMG.Game_Battler_performActionEnd =
    Game_Battler.prototype.performActionEnd;
Game_Battler.prototype.performActionEnd = function() {
    Yanfly.DMG.Game_Battler_performActionEnd.call(this);
    $gameSystem.resetDamageSettings();
};

Game_Battler.prototype.isDamageCapped = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state && state.breakDamageCap) return this._isDMGCapped = false;
    }
    return this._isDMGCapped = $gameSystem.isDamageCapped();
};

Game_Battler.prototype.maximumDamage = function() {
    var value = $gameSystem.maximumDamage();
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state && state.damageCap) value = Math.max(value, state.damageCap);
    }
    return value;
};

Game_Battler.prototype.maximumHealing = function() {
  var value = $gameSystem.maximumHealing();
  for (var i = 0; i < this.states().length; ++i) {
    var state = this.states()[i];
    if (state && state.healCap) value = Math.min(value, state.healCap);
  }
  return value;
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.isDamageCapped = function() {
  if (this._isDMGCapped !== undefined) return this._isDMGCapped;
  if (this.actor().breakDamageCap) return this._isDMGCapped = false;
  if (this.currentClass().breakDamageCap) return this._isDMGCapped = false;
  for (var i = 0; i < this.equips().length; ++i) {
    var equip = this.equips()[i];
    if (equip && equip.breakDamageCap) return this._isDMGCapped = false;
  }
  return Game_Battler.prototype.isDamageCapped.call(this);
};

Game_Actor.prototype.maximumDamage = function() {
    if (this._maximumDamage !== undefined) return this._maximumDamage;
    var value = Game_Battler.prototype.maximumDamage.call(this);
    if (this.actor().damageCap) {
      value = Math.max(value, this.actor().damageCap);
    }
    if (this.currentClass().damageCap) {
      value = Math.max(value, this.currentClass().damageCap);
    }
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (equip && equip.damageCap) value = Math.max(value, equip.damageCap);
    }
    return this._maximumDamage = value;
};

Game_Actor.prototype.maximumHealing = function() {
    if (this._maximumHealing !== undefined) return this._maximumHealing;
    var value = Game_Battler.prototype.maximumHealing.call(this);
    if (this.actor().healCap) {
      value = Math.min(value, this.actor().healCap);
    }
    if (this.currentClass().healCap) {
      value = Math.min(value, this.currentClass().healCap);
    }
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (equip && equip.healCap) value = Math.min(value, equip.healCap);
    }
    return this._maximumHealing = value;
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.isDamageCapped = function() {
  if (this._isDMGCapped !== undefined) return this._isDMGCapped;
  if (this.enemy().breakDamageCap) return this._isDMGCapped = false;
  return Game_Battler.prototype.isDamageCapped.call(this);
};

Game_Enemy.prototype.maximumDamage = function() {
    if (this._maximumDamage !== undefined) return this._maximumDamage;
    var value = Game_Battler.prototype.maximumDamage.call(this);
    if (this.enemy().damageCap) {
      value = Math.max(value, this.enemy().damageCap);
    }
    return this._maximumDamage = value;
};

Game_Enemy.prototype.maximumHealing = function() {
    if (this._maximumHealing !== undefined) return this._maximumHealing;
    var value = Game_Battler.prototype.maximumHealing.call(this);
    if (this.enemy().healCap) {
      value = Math.min(value, this.enemy().healCap);
    }
    return this._maximumHealing = value;
};

//=============================================================================
// Game_Action
//=============================================================================

Game_Action.prototype.makeDamageValue = function(target, critical) {
  var item = this.item();
  var a = this.subject();
  var b = target;
  var user = this.subject();
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var baseDamage = this.evalDamageFormula(target);
  var value = baseDamage;
  try {
    eval(Yanfly.DMG.DamageFlow);
  } catch (e) {
    Yanfly.Util.displayError(e, Yanfly.DMG.DamageFlow, 'DAMAGE FLOW ERROR');
  }
  return Math.round(value);
};

Game_Action.prototype.evalDamageFormula = function(target) {
  try {
    var item = this.item();
    var a = this.subject();
    var b = target;
    var user = this.subject();
    var subject = this.subject();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var sign = ([3, 4].contains(item.damage.type) ? -1 : 1);
    var value = 0;
    if (item.damage.custom) {
      eval(item.damage.formula);
      value = Math.max(value, 0) * sign;
    } else {
      value = Math.max(eval(item.damage.formula), 0) * sign;
    }
    return value;
  } catch (e) {
    if (item.damage.custom) {
      Yanfly.Util.displayError(e, item.damage.custom, 'DAMAGE FORMULA ERROR');
    } else {
      Yanfly.Util.displayError(e, item.damage.formula, 'DAMAGE FORMULA ERROR');
    }
    return 0;
  }
};

Game_Action.prototype.modifyCritical = function(critical, baseDamage, target) {
    return critical;
};

Game_Action.prototype.modifyBaseDamage = function(value, baseDamage, target) {
    return baseDamage;
};

Game_Action.prototype.applyDamageRate = function(value, baseDamage, target) {
    value *= $gameSystem.damageRate();
    value = Math.max(0, value);
    return value;
};

Game_Action.prototype.applyHealRate = function(value, baseDamage, target) {
    value *= $gameSystem.healRate();
    value *= target.rec;
    value = Math.min(0, value);
    return value;
};

Game_Action.prototype.applyCriticalRate = function(value, baseDamage, target) {
    value = this.applyCritical(value);
    return value;
};

Game_Action.prototype.applyPhysicalRate = function(value, baseDamage, target) {
    value *= target.pdr;
    return value;
};

Game_Action.prototype.applyFlatPhysical = function(value, baseDamage, target) {
    return value;
};

Game_Action.prototype.applyMagicalRate = function(value, baseDamage, target) {
    value *= target.mdr;
    return value;
};

Game_Action.prototype.applyFlatMagical = function(value, baseDamage, target) {
    return value;
};

Game_Action.prototype.applyFlatDamage = function(value, baseDamage, target) {
    value += $gameSystem.flatDamage();
    return value;
};

Game_Action.prototype.applyFlatHeal = function(value, baseDamage, target) {
    value -= $gameSystem.flatHeal();
    return value;
};

Game_Action.prototype.applyFlatCritical = function(value, baseDamage, target) {
    return value;
};

Game_Action.prototype.applyFlatGlobal = function(value, baseDamage, target) {
    return value;
};

Game_Action.prototype.applyMinimumDamage = function(value, baseDamage, target) {
    if (baseDamage > 0) {
      value = Math.max(0, value);
    } else if (baseDamage < 0) {
      value = Math.min(0, value);
    }
    if (this.isDamageCapped()) {
      if ($gameSystem.getActSeqDamageCap() !== undefined) {
        var min = $gameSystem.getActSeqDamageCap() * -1;
        var max = $gameSystem.getActSeqDamageCap();
      } else if (this.item().damageCap) {
        var min = this.item().damageCap * -1;
        var max = this.item().damageCap;
      } else {
        var min = this.subject().maximumHealing();
        var max = this.subject().maximumDamage();
      }
      value = value.clamp(min, max);
    }
    return value;
};

Game_Action.prototype.isDamageCapped = function() {
    var item = this.item();
    if ($gameSystem.getActSeqBypassDamageCap()) return false;
    if ($gameSystem.getActSeqDamageCap() !== undefined) return true;
    if (item.damageCap !== undefined) return true;
    if (item.breakDamageCap) return false;
    return this.subject().isDamageCapped();
};

Yanfly.DMG.Game_Action_executeHpDamage = Game_Action.prototype.executeHpDamage;
Game_Action.prototype.executeHpDamage = function(target, value) {
  value = this.applyMinimumDamage(value, value, target);
  Yanfly.DMG.Game_Action_executeHpDamage.call(this, target, value);
};

Yanfly.DMG.Game_Action_executeMpDamage = Game_Action.prototype.executeMpDamage;
Game_Action.prototype.executeMpDamage = function(target, value) {
  value = this.applyMinimumDamage(value, value, target);
  Yanfly.DMG.Game_Action_executeMpDamage.call(this, target, value);
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.DMG.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Yanfly.DMG.Game_Interpreter_pluginCommand.call(this, command, args)
    if (command === 'SetDamageCap') this.setDamageCap(args);
		if (command === 'SetHealingCap') this.setHealingCap(args);
    if (command === 'EnableDamageCap') this.setDefaultDamageCap(true);
    if (command === 'DisableDamageCap') this.setDefaultDamageCap(false);
};

Game_Interpreter.prototype.setDamageCap = function(args) {
    $gameSystem.setNewDamageCap(parseInt(args[0]), true);
};

Game_Interpreter.prototype.setHealingCap = function(args) {
    $gameSystem.setNewDamageCap(parseInt(args[0]), false);
};

Game_Interpreter.prototype.setDefaultDamageCap = function(value) {
    $gameSystem._defaultDamageCap = value;
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

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
