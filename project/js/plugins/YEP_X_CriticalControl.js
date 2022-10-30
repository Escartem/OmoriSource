//=============================================================================
// Yanfly Engine Plugins - Damage Extension - Critical Control
// YEP_X_CriticalControl.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_CriticalControl = true;

var Yanfly = Yanfly || {};
Yanfly.Crit = Yanfly.Crit || {};
Yanfly.Crit.version = 1.05;

//=============================================================================
 /*:
 * @plugindesc v1.05 (Requires YEP_DamageCore.js) Control over critical
 * hits have been added.
 * @author Yanfly Engine Plugins
 *
 * @param Critical Rate Formula
 * @desc This is the default critical hit rate formula.
 * Default: rate = user.cri * (1 - target.cev);
 * @default rate = user.cri * (1 - target.cev);
 *
 * @param Critical Multplier Formula
 * @desc This is the default formula used for a critical multiplier.
 * Default: value *= 3.0;
 * @default value *= 3.0 + bonus;
 *
 * @param Flat Critical Formula
 * @desc Add a little bonus to your critical hits with flat
 * increases in damage and/or healing.
 * @default value += ((baseDamage >= 0) ? 1 : -1) * 1.5 * user.luk + bonus;
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires YEP_DamageCore.
 * Make sure this plugin is located under YEP_DamageCore in the plugin list.
 *
 * This plugin allows you to modify the critical hit rate formula across a
 * global scale and for an individual skill/item scale.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 * You may use these notetags to adjust various factors for critical success
 * rates and critical damage adjustments.
 *
 * Skill and Item Notetags:
 *   <Critical Rate: x%>
 *   This sets the skill/item's critical hit rate to x%, ignoring any critical
 *   hit rate bonuses the user may have and ignoring any critical hit evasion
 *   bonuses the target may have.
 *   *Note: Using this tag sets the skill/item to enable Critical Hits.
 *
 *   <Critical Rate: x.y>
 *   This sets the skill/item's critical hit rate to the float x.y, ignoring
 *   any critical hit rate bonuses the user may have and ignoring any critical
 *   hit evasion bonuses the target may have.
 *   *Note: Using this tag sets the skill/item to enable Critical Hits.
 *
 *   <Critical Multiplier: x%>
 *   This sets the skill/item's critical damage multiplier as x% while still
 *   factoring in the user's critical damage multiplier bonuses.
 *   *Note: Using this tag sets the skill/item to enable Critical Hits.
 *
 *   <Critical Multiplier: x.y>
 *   This sets the skill/item's critical damage multiplier as x.y while still
 *   factoring in the user's critical damage multiplier bonuses.
 *   *Note: Using this tag sets the skill/item to enable Critical Hits.
 *
 *   <Flat Critical: x% stat>
 *   Increases the skill/item's flat critical bonus by x% of 'stat'. Replace
 *   'stat' with 'hp', 'mp', 'atk', 'def', 'mat', 'mdf', 'agi', or 'luk'. Using
 *   multiple instances of this notetag will override the previous.
 *
 * Actor, Class, Enemy, Weapon, Armor, and State Notetags:
 *   <Critical Multiplier: +x%>
 *   <Critical Multiplier: -x%>
 *   Alters the damage of a critical hit by x% for this actor, class, enemy,
 *   weapon, armor, or state. This is an additive trait.
 *
 *   <Flat Critical: +x>
 *   <Flat Critical: -x>
 *   Alters the damage of a critical hit by +x or -x for this actor, class,
 *   enemy, weapon, armor, or state. This is an additive trait.
 *
 *   <Certain Hit Critical Rate: +x%>
 *   <Certain Hit Critical Rate: -x%>
 *   Alters the critical hit rate chance of certain hit skills for the user by
 *   +x% or -x% if this notetag exists in the actor, class, enemy, weapon,
 *   armor, or state notetags. This is an additive trait.
 *
 *   <Physical Critical Rate: +x%>
 *   <Physical Critical Rate: -x%>
 *   Alters the physical critical rate chance of certain hit skills for the user
 *   by +x% or -x% if this notetag exists in the actor, class, enemy, weapon,
 *   armor, or state notetags. This is an additive trait.
 *
 *   <Magical Critical Rate: +x%>
 *   <Magical Critical Rate: -x%>
 *   Alters the magical critical rate chance of certain hit skills for the user
 *   by +x% or -x% if this notetag exists in the actor, class, enemy, weapon,
 *   armor, or state notetags. This is an additive trait.
 *
 * ============================================================================
 * Lunatic Mode - Critical Formulas
 * ============================================================================
 *
 * For those with a bit of JavaScript experience, you can create more in-depth
 * formulas for critical hits for individual skills.
 *
 * Skill and Item Notetags:
 *   <Critical Rate Formula>
 *   rate = user.cri + 0.2;
 *   rate -= 1 - target.cev;
 *   </Critical Rate Formula>
 *   This adjusts the critical hit success rate for the skill/item. You can use
 *   multiplie lines to write out the formula, and 'rate' will be the success
 *   rate used to determine the skill's critical success rate.
 *   *Note: Using this tag sets the skill/item to enable Critical Hits.
 *
 *   <Critical Multiplier Formula>
 *   value *= 3.0 + bonus;
 *   value *= $gameVariables.value(1) * 0.01;
 *   </Critical Multiplier Formula>
 *   This adjusts the critical multiplier formula for the skill/item. You can
 *   use multiple lines to write out the formula, and 'value' will be the amount
 *   of damage adjusted for the critical multiplier.
 *   *Note: Using this tag sets the skill/item to enable Critical Hits.
 *
 *   <Flat Critical Formula>
 *   value += 1.5 * user.luk + bonus;
 *   value -= 0.75 * target.luk;
 *   </Flat Critical Formula>
 *   This adjusts the flat critical formula for the skill/item if you wish for
 *   there to be one. This is primarily used for a flat increase in critical
 *   damage and is usually applied after all other applied multipliers.
 *   *Note: Remember to use a negative number for heals.
 *   *Note: Using this tag sets the skill/item to enable Critical Hits.
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
 * CRITICAL MULTIPLIER: x%
 * CRITICAL MULTIPLIER: x.y
 * CRITICAL MULTIPLIER: VARIABLE x
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This changes the critical multiplier for the skill/item until the end of the
 * action sequence. This will only take effect if there is a critical hit. If
 * you use a variable, it is treated as a percentage.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: critical multiplier: 50%
 *                critical multiplier: 8.667
 *                critical multiplier: variable 3
 *=============================================================================
 *
 *=============================================================================
 * FLAT CRITICAL: +x
 * FLAT CRITICAL: -x
 * FLAT CRITICAL: VARIABLE x
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This changes the flat critical increase for the skill/item until the end of
 * the action sequence. This will only take effect if there is a critical hit.
 * This will automatically adjust for damage or healing.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: flat critical: +100
 *                flat critical: -250
 *                flat critical: variable 3
 *=============================================================================
 *
 *=============================================================================
 * FORCE CRITICAL
 * FORCE NO CRITICAL
 * NORMAL CRITICAL
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This forces the following action effects in the action sequence to either
 * always be a critical hit or not a critical hit ignoring all other factors.
 * Using 'normal critical' will reduce the following action effects to use the
 * regular critical hit rate calculation.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: force critical
 *                force no critical
 *                normal critical
 *=============================================================================
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.05:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.04:
 * - Bug fixed where the physical critical modifier replaced the magical
 * critical modifier. This should be fixed now.
 *
 * Version 1.03:
 * - Lunatic Mode fail safes added.
 *
 * Version 1.02:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.01b:
 * - Fixed a bug regarding Lunatic Critical Hit Rates.
 * - Fixed a default formula that caused critical hits to heal unexpectedly.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Imported.YEP_DamageCore) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_CriticalControl');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.critRate = String(Yanfly.Parameters['Critical Rate Formula']);
Yanfly.Param.critMult = String(Yanfly.Parameters['Critical Multplier Formula']);
Yanfly.Param.flatCrit = String(Yanfly.Parameters['Flat Critical Formula']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.Crit.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.Crit.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_X_CriticalControl) {
    this.processCritNotetags1($dataSkills);
    this.processCritNotetags1($dataItems);
    this.processCritNotetags2($dataActors);
    this.processCritNotetags2($dataClasses);
    this.processCritNotetags2($dataWeapons);
    this.processCritNotetags2($dataArmors);
    this.processCritNotetags2($dataStates);
    this.processCritNotetags2($dataEnemies);
    Yanfly._loaded_YEP_X_CriticalControl = true;
  }
  return true;
};

DataManager.processCritNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    var evalMode = 'none';
    obj.critRate = Yanfly.Param.critRate;
    obj.critMult = Yanfly.Param.critMult;
    obj.flatCrit = Yanfly.Param.flatCrit;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:CRITICAL RATE):[ ](\d+)([%％])>/i)) {
        var rate = parseFloat(RegExp.$1 * 0.01);
        obj.critRate = 'rate = ' + String(rate);
        obj.damage.critical = true;
      } else if (line.match(/<(?:CRITICAL RATE):[ ](\d+).(\d+)>/i)) {
        var rate = parseFloat(String(RegExp.$1) + '.' + String(RegExp.$2));
        obj.critRate = 'rate = ' + String(rate);
        obj.damage.critical = true;
      } else if (line.match(/<(?:CRITICAL MULTIPLIER):[ ](\d+)([%％])>/i)) {
        var rate = parseFloat(RegExp.$1 * 0.01);
        obj.critMult = 'value *= ' + String(rate) + ' + bonus;';
        obj.damage.critical = true;
      } else if (line.match(/<(?:CRITICAL MULTIPLIER):[ ](\d+).(\d+)>/i)) {
        var rate = parseFloat(String(RegExp.$1) + '.' + String(RegExp.$2));
        obj.critMult = 'value *= ' + String(rate) + ' + bonus;';
        obj.damage.critical = true;
      } else if (line.match(/<(?:FLAT CRITICAL):[ ](\d+)([%％])[ ](.*)>/i)) {
        var rate = parseFloat(RegExp.$1 * 0.01);
        var stat = String(RegExp.$3).toLowerCase();
        obj.flatCrit = 'value += ((baseDamage > 0) ? 1 : -1)';
        obj.flatCrit = obj.flatCrit + ' * ' + String(rate) + ' * user.';
        obj.flatCrit = obj.flatCrit + stat + ' + bonus;'
        obj.damage.critical = true;
      } else if (line.match(/<(?:CRITICAL RATE FORMULA)>/i)) {
        evalMode = 'critical rate';
        obj.critRate = '';
        obj.damage.critical = true;
      } else if (line.match(/<\/(?:CRITICAL RATE FORMULA)>/i)) {
        evalMode = 'none';
      } else if (line.match(/<(?:CRITICAL MULTIPLIER FORMULA)>/i)) {
        evalMode = 'critical multiplier';
        obj.critMult = '';
        obj.damage.critical = true;
      } else if (line.match(/<\/(?:CRITICAL MULTIPLIER FORMULA)>/i)) {
        evalMode = 'none';
      } else if (line.match(/<(?:FLAT CRITICAL FORMULA)>/i)) {
        evalMode = 'flat critical';
        obj.flatCrit = '';
        obj.damage.critical = true;
      } else if (line.match(/<\/(?:FLAT CRITICAL FORMULA)>/i)) {
        evalMode = 'none';
      } else {
        if (evalMode === 'critical rate') {
          obj.critRate = obj.critRate + line + '\n';
        } else if (evalMode === 'critical multiplier') {
          obj.critMult = obj.critMult + line + '\n';
        } else if (evalMode === 'flat critical') {
          obj.flatCrit = obj.flatCrit + line + '\n';
        }
      }
    }
  }
};

DataManager.processCritNotetags2 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.critMultBonus = 0.0;
    obj.flatCritBonus = 0;
    obj.physicalCritRateBonus = 0.0;
    obj.magicalCritRateBonus = 0.0;
    obj.certainCritRateBonus = 0.0;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:CRITICAL MULTIPLIER):[ ]([\+\-]\d+)([%％])>/i)) {
        obj.critMultBonus = parseFloat(RegExp.$1 * 0.01);
      } else if (line.match(/<(?:FLAT CRITICAL):[ ]([\+\-]\d+)>/i)) {
        obj.flatCritBonus = parseInt(RegExp.$1);
      } else if
      (line.match(/<(?:PHYSICAL CRITICAL RATE):[ ]([\+\-]\d+)([%％])>/i)) {
        obj.physicalCritRateBonus = parseFloat(RegExp.$1 * 0.01);
      } else if
      (line.match(/<(?:MAGICAL CRITICAL RATE):[ ]([\+\-]\d+)([%％])>/i)) {
        obj.magicalCritRateBonus = parseFloat(RegExp.$1 * 0.01);
      } else if
      (line.match(/<(?:CERTAIN HIT CRITICAL RATE):[ ]([\+\-]\d+)([%％])>/i)) {
        obj.certainCritRateBonus = parseFloat(RegExp.$1 * 0.01);
      }
    }
  }
};

//=============================================================================
// BattleManager
//=============================================================================

if (Imported.YEP_BattleEngineCore) {
Yanfly.Crit.BattleManager_processActionSequence =
  BattleManager.processActionSequence;
  BattleManager.processActionSequence = function(actionName, actionArgs) {
    // CRITICAL MULTIPLIER
    if (actionName === 'CRITICAL MULTIPLIER') {
      return this.actionCriticalMultiplier(actionArgs);
    }
    // FLAT CRITICAL
    if (actionName === 'FLAT CRITICAL') {
      return this.actionFlatCritical(actionArgs);
    }
    // FORCE CRITICAL
    if (actionName === 'FORCE CRITICAL') {
      return this.actionForceCritical();
    }
    // FORCE NO CRITICAL
    if (actionName === 'FORCE NO CRITICAL') {
      return this.actionForceNoCritical();
    }
    // NORMAL CRITICAL
    if (actionName === 'NORMAL CRITICAL') {
      return this.actionNormalCritical();
    }
    return Yanfly.Crit.BattleManager_processActionSequence.call(this,
      actionName, actionArgs);
  };
};

BattleManager.actionCriticalMultiplier = function(actionArgs) {
    if (actionArgs[0].match(/(?:VARIABLE|VAR)[ ](\d+)/i)) {
      var value = parseFloat($gameVariables.value(parseInt(RegExp.$1)) * 0.01);
    } else if (actionArgs[0].match(/(\d+)([%％])/i)) {
      var value = parseFloat(RegExp.$1 * 0.01);
    } else if (actionArgs[0].match(/(\d+).(\d+)/i)) {
      var value = parseFloat(String(RegExp.$1) + '.' + String(RegExp.$1));
    } else {
      return true;
    }
    $gameSystem._critMult = value;
    return true;
};

BattleManager.actionFlatCritical = function(actionArgs) {
    if (actionArgs[0].match(/(?:VARIABLE|VAR)[ ](\d+)/i)) {
      var value = parseInt($gameVariables.value(parseInt(RegExp.$1)));
    } else if (actionArgs[0].match(/([\+\-]\d+)/i)) {
      var value = parseInt(RegExp.$1);
    } else if (actionArgs[0].match(/(\d+)/i)) {
      var value = parseInt(RegExp.$1);
    } else {
      return true;
    }
    $gameSystem._flatCrit = value;
    return true;
};

BattleManager.actionForceCritical = function(actionArgs) {
    $gameSystem._forceCritical = true;
    $gameSystem._forceNoCritical = false;
    return true;
};

BattleManager.actionForceNoCritical = function(actionArgs) {
    $gameSystem._forceCritical = false;
    $gameSystem._forceNoCritical = true;
    return true;
};

BattleManager.actionNormalCritical = function(actionArgs) {
    $gameSystem._forceCritical = false;
    $gameSystem._forceNoCritical = false;
    return true;
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.Crit.Game_System_rDS = Game_System.prototype.resetDamageSettings;
Game_System.prototype.resetDamageSettings = function() {
    Yanfly.Crit.Game_System_rDS.call(this);
    this._critMult = 1.0;
    this._flatCrit = 0;
    this._forceCritical = false;
    this._forceNoCritical = false;
};

Game_System.prototype.criticalMultiplier = function() {
    if (this._critMult === undefined) this.resetDamageSettings();
    return this._critMult;
};

Game_System.prototype.flatCritical = function() {
    if (this._flatCrit === undefined) this.resetDamageSettings();
    return this._flatCrit;
};

Game_System.prototype.forceCritical = function() {
    if (this._forceCritical === undefined) this.resetDamageSettings();
    return this._forceCritical;
};

Game_System.prototype.forceNoCritical = function() {
    if (this._forceNoCritical === undefined) this.resetDamageSettings();
    return this._forceNoCritical;
};

//=============================================================================
// Game_Battler
//=============================================================================

Game_Battler.prototype.criticalMultiplierBonus = function() {
    multiplier = 0.0;
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state) multiplier += state.critMultBonus;
    }
    return Math.max(0, multiplier);
};

Game_Battler.prototype.flatCriticalBonus = function() {
    value = 0;
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state) value += state.flatCritBonus;
    }
    return value;
};

Game_Battler.prototype.certainCritRateBonus = function() {
    multiplier = 0.0;
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state) multiplier += state.certainCritRateBonus;
    }
    return Math.max(0, multiplier);
};

Game_Battler.prototype.physicalCritRateBonus = function() {
    multiplier = 0.0;
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state) multiplier += state.physicalCritRateBonus;
    }
    return Math.max(0, multiplier);
};

Game_Battler.prototype.magicalCritRateBonus = function() {
    multiplier = 0.0;
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state) multiplier += state.magicalCritRateBonus;
    }
    return Math.max(0, multiplier);
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.criticalMultiplierBonus = function() {
    multiplier = Game_Battler.prototype.criticalMultiplierBonus.call(this);
    multiplier += this.actor().critMultBonus;
    multiplier += this.currentClass().critMultBonus;
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (equip) multiplier += equip.critMultBonus;
    }
    return multiplier;
};

Game_Actor.prototype.flatCriticalBonus = function() {
    value = Game_Battler.prototype.flatCriticalBonus.call(this);
    value += this.actor().flatCritBonus;
    value += this.currentClass().flatCritBonus;
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (equip) value += equip.flatCritBonus;
    }
    return value;
};

Game_Actor.prototype.certainCritRateBonus = function() {
    multiplier = Game_Battler.prototype.certainCritRateBonus.call(this);
    multiplier += this.actor().certainCritRateBonus;
    multiplier += this.currentClass().certainCritRateBonus;
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (equip) multiplier += equip.certainCritRateBonus;
    }
    return multiplier;
};

Game_Actor.prototype.physicalCritRateBonus = function() {
    multiplier = Game_Battler.prototype.physicalCritRateBonus.call(this);
    multiplier += this.actor().physicalCritRateBonus;
    multiplier += this.currentClass().physicalCritRateBonus;
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (equip) multiplier += equip.physicalCritRateBonus;
    }
    return multiplier;
};

Game_Actor.prototype.magicalCritRateBonus = function() {
    multiplier = Game_Battler.prototype.magicalCritRateBonus.call(this);
    multiplier += this.actor().magicalCritRateBonus;
    multiplier += this.currentClass().magicalCritRateBonus;
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (equip) multiplier += equip.magicalCritRateBonus;
    }
    return multiplier;
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.criticalMultiplierBonus = function() {
    multiplier = Game_Battler.prototype.criticalMultiplierBonus.call(this);
    multiplier += this.enemy().critMultBonus;
    return multiplier;
};

Game_Enemy.prototype.flatCriticalBonus = function() {
    value = Game_Battler.prototype.flatCriticalBonus.call(this);
    value += this.enemy().flatCritBonus;
    return value;
};

Game_Enemy.prototype.certainCritRateBonus = function() {
    multiplier = Game_Battler.prototype.certainCritRateBonus.call(this);
    multiplier += this.enemy().certainCritRateBonus;
    return multiplier;
};

Game_Enemy.prototype.physicalCritRateBonus = function() {
    multiplier = Game_Battler.prototype.physicalCritRateBonus.call(this);
    multiplier += this.enemy().physicalCritRateBonus;
    return multiplier;
};

Game_Enemy.prototype.magicalCritRateBonus = function() {
    multiplier = Game_Battler.prototype.magicalCritRateBonus.call(this);
    multiplier += this.enemy().magicalCritRateBonus;
    return multiplier;
};

//=============================================================================
// Game_Action
//=============================================================================

Game_Action.prototype.itemCri = function(target) {
    if (!this.item().damage.critical) return 0;
    var user = this.subject();
    var rate = this.applyItemCriticalRate(target);
    if (this.isCertainHit()) rate += user.certainCritRateBonus();
    if (this.isPhysical()) rate += user.physicalCritRateBonus();
    if (this.isMagical()) rate += user.magicalCritRateBonus();
    return rate;
};

Game_Action.prototype.applyItemCriticalRate = function(target) {
    var item = this.item();
    var a = this.subject();
    var b = target;
    var user = this.subject();
    var subject = this.subject();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var rate = 0;
    var bonus = user.criticalMultiplierBonus();
    var code = item.critRate;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'CRITICAL RATE FORMULA ERROR');
    }
    return rate;
};

Game_Action.prototype.applyCritical = function(value) {
    return value;
};

Yanfly.Crit.Game_Action_applyCritRate = Game_Action.prototype.applyCriticalRate;
Game_Action.prototype.applyCriticalRate = function(value, baseDamage, target) {
    value = Yanfly.Crit.Game_Action_applyCritRate.call(this, value, baseDamage,
        target);
    value = this.applyItemCriticalMult(value, baseDamage, target);
    value *= $gameSystem.criticalMultiplier();
    return value;
};

Yanfly.Crit.Game_Action_modifyCrit = Game_Action.prototype.modifyCritical;
Game_Action.prototype.modifyCritical = function(critical, baseDamage, target) {
    critical = Yanfly.Crit.Game_Action_modifyCrit.call(this, critical,
      baseDamage, target);
    if ($gameSystem.forceCritical()) critical = true;
    if ($gameSystem.forceNoCritical()) critical = false;
    return critical;
};

Game_Action.prototype.applyItemCriticalMult =
  function(value, baseDamage, target) {
    var item = this.item();
    var a = this.subject();
    var b = target;
    var user = this.subject();
    var subject = this.subject();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var bonus = user.criticalMultiplierBonus();
    var code = item.critMult;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'CRITICAL MULTIPLIER ERROR');
    }
    return value;
};

Yanfly.Crit.Game_Acion_applyFlatCrit = Game_Action.prototype.applyFlatCritical;
Game_Action.prototype.applyFlatCritical = function(value, baseDamage, target) {
    value = Yanfly.Crit.Game_Acion_applyFlatCrit.call(this, value,
        baseDamage, target);
    value = this.applyItemFlatCrit(value, baseDamage, target);
    if (baseDamage > 0) {
      value += $gameSystem.flatCritical();
    } else if (baseDamage < 0) {
      value -= $gameSystem.flatCritical();
    }
    return value;
};

Game_Action.prototype.applyItemFlatCrit = function(value, baseDamage, target) {
    var item = this.item();
    var a = this.subject();
    var b = target;
    var user = this.subject();
    var subject = this.subject();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var bonus = user.flatCriticalBonus();
    var code = item.flatCrit;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'CRITICAL FLAT BONUS ERROR');
    }
    return value;
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
};
