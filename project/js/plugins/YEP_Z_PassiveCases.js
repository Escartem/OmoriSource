//=============================================================================
// Yanfly Engine Plugins - Lunatic Pack - Passive Condition Cases
// YEP_Z_PassiveCases.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_Z_PassiveCases = true;

var Yanfly = Yanfly || {};
Yanfly.LunPasCas = Yanfly.LunPasCas || {};
Yanfly.LunPasCas.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.01 (Lunatic Pack) Create conditional cases for your passive
 * states through an easy and elaborate method!
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires the following plugins:
 * - Auto Passive States
 *
 * Passive States can be a powerful addition to a game, but if they are always
 * active throughout a battle, they can be a little too powerful. Sometimes,
 * you will want to limit the extent at which your passive states will be
 * active by imposing conditional cases upon them. If all of the passive's
 * conditional cases have been met, then the passive will become active. This
 * plugin adds a multitude of conditional cases for you to be able to use in
 * your game and limit certain passive states from having their effects active
 * at all times.
 *
 * *NOTE*: This plugin is best used with RPG Maker MV version 1.5.0+. You can
 * still use this plugin with a lower version number, but you will have a much
 * harder time altering the plugin parameters without it.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * Insert the following notetags into a state's notebox to give it a passive
 * condition case.
 *
 * State Notetags:
 *
 *   <Passive Condition Cases>
 *    condition
 *    condition
 *   </Passive Condition Cases>
 *   - Use the above format for adding conditions to your passive states.
 *   Replace the 'condition' text in between the <Passive Condition Cases>
 *   and </Passive Condition Cases> notetags with any of the following
 *   conditions below to prompt a condition type. You can insert multiple
 *   conditions to make a passive state require more conditions to be met
 *   before they can be active.
 *
 * =-=-=-= Conditions List =-=-=-=
 *
 *   --- Switch On/Off ---
 *
 *   Switch x On
 *   Switch x Off
 *   - Replace 'x' with a number value. This will make a conditional check if
 *   an event switch x is on or off. If the conditional check is met, then the
 *   conditional passive will become active if other conditions are met.
 *   SUGGESTED BY: Yanfly
 *
 *   --- Numerical Comparison Check ---
 *
 *   x >= y
 *   x <= y
 *   x > y
 *   x < y
 *   x != y
 *   x = y
 *   - This will require the condition to make a simple comparison check
 *   between x and y. These number comparisons will be '>=', '<=', '>', '<',
 *   '!=', and '=' (aka greater than or equal to, less than or equal to,
 *   greater than, less than, not equal to, and equal to respectively). Replace
 *   'x' and 'y' with a number, a percentage, 'HP', 'MP', 'TP', 'HP%', 'MP%',
 *   'TP%', 'MAXHP', 'MAXMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK', or
 *   'VARIABLE X' for comparison purposes.
 *
 *   If a percentage is being checked, it will be checked as if the % has
 *   been dropped off. For example, '50%' will be '50'.
 *
 *   SUGGESTED BY: Yanfly
 *
 *   --- Has/Not State ---
 *
 *   Has State x
 *   - Replace 'x' with the ID of the state you wish to check. If the user is
 *   affected by that state, then this conditional passive will become active
 *   as long as all other conditions are met.
 *   SUGGESTED BY: Goldschuss
 *
 *   Not State x
 *   - Replace 'x' with the ID of the state you wish to check. If the user is
 *   not affected by that state, then this conditional passive will become
 *   active as long as all other conditions are met.
 *   SUGGESTED BY: Goldschuss
 *
 *   --- Has/Not Buff/Debuff---
 *
 *   Has x Buff
 *   - Replace 'x' with 'MAXHP', 'MAXMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', or
 *   'LUK'. This will make a check to see if the user is currently buffed in
 *   that parameter. If the user is, the the conditional passive will become
 *   active as long as all other conditions are met.
 *   SUGGESTED BY: Yanfly
 *
 *   Has x Debuff
 *   - Replace 'x' with 'MAXHP', 'MAXMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', or
 *   'LUK'. This will make a check to see if the user is currently debuffed in
 *   that parameter. If the user is, the the conditional passive will become
 *   active as long as all other conditions are met.
 *   SUGGESTED BY: Yanfly
 *
 *   Not x Buff
 *   - Replace 'x' with 'MAXHP', 'MAXMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', or
 *   'LUK'. This will make a check to see if the user is currently not buffed
 *   in that parameter. If the user is, the the conditional passive will become
 *   active as long as all other conditions are met.
 *   SUGGESTED BY: Yanfly
 *
 *   Not x Debuff
 *   - Replace 'x' with 'MAXHP', 'MAXMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', or
 *   'LUK'. This will make a check to see if the user is currently not debuffed
 *   in that parameter. If the user is, the conditional passive will become
 *   active as long as all other conditions are met.
 *   SUGGESTED BY: Yanfly
 *
 *   --- Total Buffs/Debuffs ---
 *
 *   Total Buffs >= x
 *   Total Buffs <= x
 *   Total Buffs > x
 *   Total Buffs < x
 *   Total Buffs != x
 *   Total Buffs = x
 *   - Replace 'x' with a number value you wish to check relative to the number
 *   of buffs the user is currently affected by. If the turn check passes, the
 *   conditional passive will become active if other conditions are met.
 *   SUGGESTED BY: Alejandro SQ
 *
 *   Total Debuffs >= x
 *   Total Debuffs <= x
 *   Total Debuffs > x
 *   Total Debuffs < x
 *   Total Debuffs != x
 *   Total Debuffs = x
 *   - Replace 'x' with a number value you wish to check relative to the number
 *   of debuffs the user is currently affected by. If the turn check passes,
 *   the conditional passive will become active if other conditions are met.
 *   SUGGESTED BY: Alejandro SQ
 *
 *   --- Alive/Dead ---
 *
 *   Alive Actors/Enemies/Allies/Foes >= x
 *   Alive Actors/Enemies/Allies/Foes <= x
 *   Alive Actors/Enemies/Allies/Foes > x
 *   Alive Actors/Enemies/Allies/Foes < x
 *   Alive Actors/Enemies/Allies/Foes != x
 *   Alive Actors/Enemies/Allies/Foes = x
 *   - Replace 'x' with a number value you wish to check relative to the number
 *   of alive actors in the party, enemies in the troop, user's allies, or the
 *   user's foes. Use only one of the four above keywords ('actors', 'enemies',
 *   'allies', or 'foes'). If the member count check passes, the conditional
 *   passive will become active as long as all other conditions are met.
 *   SUGGESTED BY: Yanfly
 *
 *   Dead Actors/Enemies/Allies/Foes >= x
 *   Dead Actors/Enemies/Allies/Foes <= x
 *   Dead Actors/Enemies/Allies/Foes > x
 *   Dead Actors/Enemies/Allies/Foes < x
 *   Dead Actors/Enemies/Allies/Foes != x
 *   Dead Actors/Enemies/Allies/Foes = x
 *   - Replace 'x' with a number value you wish to check relative to the number
 *   of dead actors in the party, enemies in the troop, user's allies, or the
 *   user's foes. Use only one of the four above keywords ('actors', 'enemies',
 *   'allies', or 'foes'). If the member count check passes, the conditional
 *   passive will become active as long as all other conditions are met.
 *   SUGGESTED BY: Yanfly
 *
 *   --- Turn Count ---
 *
 *   Battle Turns >= x
 *   Battle Turns <= x
 *   Battle Turns > x
 *   Battle Turns < x
 *   Battle Turns != x
 *   Battle Turns = x
 *   - Replace 'x' with a number value you wish to check relative to the number
 *   of turns that passed in battle. If the turn check passes, the conditional
 *   passive will become active as long as all other conditions are met.
 *   SUGGESTED BY: Yanfly
 *
 *   --- Has Weapon/Armor ---
 *
 *   Has Weapon x
 *   - The user must be an actor or else this condition returns false. Replace
 *   'x' with the weapon ID you wish to check if the user has. If the user has
 *   it equipped, the condition will pass and will become active as long as
 *   all other conditions are met.
 *   SUGGESTED BY: Yanfly
 *
 *   Not Weapon x
 *   - The user must be an actor or else this condition returns false. Replace
 *   'x' with the weapon ID you wish to check if the user should not have. If
 *   the user doesn't have it equipped, the condition will pass and will become
 *   active as long as all other conditions are met.
 *   SUGGESTED BY: Yanfly
 *
 *   Has Armor x
 *   - The user must be an actor or else this condition returns false. Replace
 *   'x' with the armor ID you wish to check if the user has. If the user has
 *   it equipped, the condition will pass and will become active as long as
 *   all other conditions are met.
 *   SUGGESTED BY: Yanfly
 *
 *   Not Armor x
 *   - The user must be an actor or else this condition returns false. Replace
 *   'x' with the armor ID you wish to check if the user should not have. If
 *   the user doesn't have it equipped, the condition will pass and will become
 *   active as long as all other conditions are met.
 *   SUGGESTED BY: Yanfly
 *
 * ============================================================================
 * Lunatic Mode - Effect Code
 * ============================================================================
 *
 * For experienced users that know JavaScript and have RPG Maker MV 1.5.0+, you
 * can add new notetag effects that can be used by the plugin or alter the
 * effects of currently existing notetag effects from the plugin parameters
 * entry: Effect Code. It should look something like this:
 *
 * ---
 *
 * // -------------
 * // Switch On/Off
 * // -------------
 * if (data.match(/SWITCH[ ](\d+)[ ]ON/i)) {
 *   var switchId = parseInt(RegExp.$1);
 *   condition = $gameSwitches.value(switchId);
 * 
 * } else if (data.match(/SWITCH[ ](\d+)[ ]OFF/i)) {
 *   var switchId = parseInt(RegExp.$1);
 *   condition = !$gameSwitches.value(switchId);
 *
 * ...
 *
 * // -------------------------------
 * // Add new effects above this line
 * // -------------------------------
 * } else {
 *   skip = true;
 * }
 *
 * ---
 *
 * Here's what each of the variables used in this code bit refer to:
 *
 *   --------------------   ---------------------------------------------------
 *   Variable:              Refers to:
 *   --------------------   ---------------------------------------------------
 *   condition              Current condition setting. If it returns true, then
 *                          the current condition case passes. Otherwise, no.
 *                          The passive state needs all its condition cases to
 *                          to become an active passive state.
 *
 *   a                      Returns the action user
 *   user                   Returns the action user
 *   subject                Returns the action user
 *
 *   s[x]                   Return switch x (true/false)
 *   v[x]                   Return variable x's current value
 *
 *   skip                   Default: false. If true, returns the previous rate
 *
 * ---
 *
 * If you need to revert the Effect Code back to its original state, delete the
 * plugin from your plugin manager list and then add it again. The code will be
 * back to default.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Bypass the isDevToolsOpen() error when bad code is inserted into a script
 * call or custom Lunatic Mode code segment due to updating to MV 1.6.1.
 *
 * Version 1.00:
 * - Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @param Effect Code
 * @type note
 * @desc This is the code used for each of the notetag effects.
 * @default "// -------------\n// Switch On/Off\n// -------------\nif (data.match(/SWITCH[ ](\\d+)[ ]ON/i)) {\n  var switchId = parseInt(RegExp.$1);\n  condition = $gameSwitches.value(switchId);\n\n} else if (data.match(/SWITCH[ ](\\d+)[ ]OFF/i)) {\n  var switchId = parseInt(RegExp.$1);\n  condition = !$gameSwitches.value(switchId);\n\n// -------------\n// Has/Not State\n// -------------\n} else if (data.match(/HAS[ ]STATE[ ](\\d+)/i)) {\n  var stateId = parseInt(RegExp.$1);\n  condition = user.isStateAffected(stateId);\n\n} else if (data.match(/NOT[ ]STATE[ ](\\d+)/i)) {\n  var stateId = parseInt(RegExp.$1);\n  condition = !user.isStateAffected(stateId);\n\n// -------------------\n// Has/Not Buff/Debuff\n// -------------------\n} else if (data.match(/HAS[ ](.*)[ ]BUFF/i)) {\n  var str = String(RegExp.$1);\n  var paramId = DataManager.getParamId(str);\n  condition = user.isBuffAffected(paramId);\n\n} else if (data.match(/HAS[ ](.*)[ ]DEBUFF/i)) {\n  var str = String(RegExp.$1);\n  var paramId = DataManager.getParamId(str);\n  condition = user.isDebuffAffected(paramId);\n\n// --------------------\n// Has/Not Weapon/Armor\n// --------------------\n} else if (data.match(/HAS[ ]WEAPON[ ](\\d+)/i)) {\n  if (user.isActor()) {\n    var id = parseInt(RegExp.$1);\n    var item = $dataWeapons[id];\n    condition = user.hasWeapon(item);\n  } else {\n    condition = false;\n  }\n\n} else if (data.match(/NOT[ ]WEAPON[ ](\\d+)/i)) {\n  if (user.isActor()) {\n    var id = parseInt(RegExp.$1);\n    var item = $dataWeapons[id];\n    condition = !user.hasWeapon(item);\n  } else {\n    condition = false;\n  }\n\n} else if (data.match(/HAS[ ]ARMOR[ ](\\d+)/i)) {\n  if (user.isActor()) {\n    var id = parseInt(RegExp.$1);\n    var item = $dataArmors[id];\n    condition = user.hasArmor(item);\n  } else {\n    condition = false;\n  }\n\n} else if (data.match(/NOT[ ]ARMOR[ ](\\d+)/i)) {\n  if (user.isActor()) {\n    var id = parseInt(RegExp.$1);\n    var item = $dataArmors[id];\n    condition = !user.hasArmor(item);\n  } else {\n    condition = false;\n  }\n\n// ----------------------\n// Param Above/Below Stat\n// ----------------------\n} else if (data.match(/(.*)[ ](?:>|<|>=|<=|=|!=)[ ](.*)/i)) {\n  var check1 = String(RegExp.$1);\n  var check2 = String(RegExp.$2);\n  var value1 = DataManager.numberParameterCheck(check1, user);\n  var value2 = DataManager.numberParameterCheck(check2, user);\n  if (value1 !== null && value2 !== null) {\n    if (data.match(/>=/i)) {\n      condition = value1 >= value2;\n    } else if (data.match(/</i)) {\n      condition = value1 <= value2;\n    } else if (data.match(/>/i)) {\n      condition = value1 > value2;\n    } else if (data.match(/</i)) {\n      condition = value1 < value2;\n    } else if (data.match(/!=/i)) {\n      condition = value1 !== value2;\n    } else if (data.match(/=/i)) {\n      condition = value1 === value2;\n    } else {\n      skip = true;\n    }\n  } else {\n    condition = false;\n  }\n\n// -------------------------------\n// Add new effects above this line\n// -------------------------------\n} else {\n  skip = true;\n}"
 *
 */
//=============================================================================

Yanfly.PluginRequirements = function() {
  return Imported.YEP_AutoPassiveStates;
};

if (Yanfly.PluginRequirements()) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_Z_PassiveCases');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.LunPasCasEffect = JSON.parse(Yanfly.Parameters['Effect Code']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.LunPasCas.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.LunPasCas.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_Z_PassiveCases) {
    this.processLunPasCasNotetags1($dataStates);
    Yanfly._loaded_YEP_Z_PassiveCases = true;
  }
  
  return true;
};

DataManager.processLunPasCasNotetags1 = function(group) {
  var note1 = /<(?:PASSIVE CONDITION CASE|PASSIVE CONDITION CASES)>/i;
  var note2 = /<\/(?:PASSIVE CONDITION CASE|PASSIVE CONDITION CASES)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.passiveCondition = obj.passiveCondition || '';
    obj.passiveConditionCases = [];
    var evalMode = 'none';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        evalMode = 'passive condition case';
      } else if (line.match(note2)) {
        evalMode = 'none';
        obj.passiveCondition = obj.passiveCondition || '\n\n';
      } else if (evalMode === 'passive condition case') {
        obj.passiveConditionCases.push(line);
      }
    }
  }
};

DataManager.getParamId = function(str) {
  switch (str.toUpperCase()) {
  case 'HP':
  case 'MAXHP':
  case 'MAX HP':
    return 0;
    break;
  case 'MP':
  case 'MAXMP':
  case 'MAX MP':
  case 'SP':
  case 'MAXSP':
  case 'MAX SP':
    return 1;
    break;
  case 'ATK':
  case 'STR':
    return 2;
    break;
  case 'DEF':
    return 3;
    break;
  case 'MAT':
  case 'INT':
  case 'SPI':
    return 4;
    break;
  case 'MDF':
  case 'RES':
    return 5;
    break;
  case 'AGI':
  case 'SPD':
    return 6;
    break;
  case 'LUK':
    return 7;
    break;
  default:
    return -1;
    break;
  }
};

DataManager.numberParameterCheck = function(check, user) {
  // --------
  // HP/MP/TP
  // --------
  if (check.toUpperCase() === 'HP') {
    return user.hp;

  } else if (check.toUpperCase() === 'MP') {
    return user.mp;

  } else if (check.toUpperCase() === 'TP') {
    return user.tp;

  // -----------
  // HP%/MP%/TP%
  // -----------
  } else if (check.toUpperCase() === 'HP%') {
    return user.hpRate() * 100;

  } else if (check.toUpperCase() === 'MP%') {
    return user.mpRate() * 100;

  } else if (check.toUpperCase() === 'TP%') {
    return user.tpRate() * 100;

  // ------------
  // Battle Turns
  // ------------
  } else if (check.toUpperCase().match(/BATTLE TURN/i)) {
    return $gameTroop.turnCount();

  // -------------------
  // Total Buffs/Debuffs
  // -------------------
  } else if (check.toUpperCase().match(/TOTAL BUFF/i)) {
    return user.totalBuffs();

  } else if (check.toUpperCase().match(/TOTAL DEBUFF/i)) {
    return user.totalDebuffs();

  // --------------------------------
  // Alive Actors/Enemies/Allies/Foes
  // --------------------------------
  } else if (check.toUpperCase().match(/ALIVE ACTORS/i)) {
    return $gameParty.aliveMembers();

  } else if (check.toUpperCase().match(/ALIVE ENEMIES/i)) {
    return $gameTroop.aliveMembers();

  } else if (check.toUpperCase().match(/ALIVE ALLIES/i)) {
    var unit = user.friendsUnit();
    return unit.aliveMembers();

  } else if (check.toUpperCase().match(/ALIVE FOES/i)) {
    var unit = user.opponentsUnit();
    return unit.aliveMembers();

  // -------------------------------
  // Dead Actors/Enemies/Allies/Foes
  // -------------------------------
  } else if (check.toUpperCase().match(/DEAD ACTORS/i)) {
    return $gameParty.deadMembers();

  } else if (check.toUpperCase().match(/DEAD ENEMIES/i)) {
    return $gameTroop.deadMembers();

  } else if (check.toUpperCase().match(/DEAD ALLIES/i)) {
    var unit = user.friendsUnit();
    return unit.deadMembers();

  } else if (check.toUpperCase().match(/DEAD FOES/i)) {
    var unit = user.opponentsUnit();
    return unit.deadMembers();

  // --------
  // Variable
  // --------
  } else if (check.match(/(?:VAR|VARIABLE)[ ](\d+)/i)) {
    return $gameVariables.value(parseInt(RegExp.$1));

  // -----------------
  // Percentage/Number
  // -----------------
  } else if (check.match(/(\d+)([%％])/i)) {
    return parseFloat(RegExp.$1);

  } else if (check.match(/(\d+)/i)) {
    return parseInt(RegExp.$1);

  // ---------------
  // Everything Else
  // ---------------
  } else {
    var paramId = DataManager.getParamId(check);
    if (param >= 0) {
      return user.param(paramId);
    }
  }
  return null;
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Game_BattlerBase.prototype.totalBuffs = function() {
  var value = 0;
  for (var i = 0; i < 8; ++i) {
    if (this.isBuffAffected(i)) value += 1;
  }
  return value;
};

Game_BattlerBase.prototype.totalDebuffs = function() {
  var value = 0;
  for (var i = 0; i < 8; ++i) {
    if (this.isDebuffAffected(i)) value += 1;
  }
  return value;
};

Yanfly.LunPasCas.Game_BattlerBase_psc =
  Game_BattlerBase.prototype.passiveStateConditions;
Game_BattlerBase.prototype.passiveStateConditions = function(state) {
  var condition = Yanfly.LunPasCas.Game_BattlerBase_psc.call(this, state);
  if (!condition) return false;

  this._checkPassiveStateCondition = this._checkPassiveStateCondition || [];
  this._checkPassiveStateCondition.push(state.id);

  var cases = state.passiveConditionCases || [];
  var length = cases.length;
  for (var i = 0; i < length; ++i) {
    var data = cases[i];
    if (!this.passiveConditionCaseEval(state, data)) {
      var index = this._checkPassiveStateCondition.indexOf(state.id);
      this._checkPassiveStateCondition.splice(index, 1);
      return false;
    }
  }

  var index = this._checkPassiveStateCondition.indexOf(state.id);
  this._checkPassiveStateCondition.splice(index, 1);

  return true;
};

Game_BattlerBase.prototype.passiveConditionCaseEval = function(state, data) {
  var condition = true;
  var stateId = state.id;
  var a = this;
  var user = this;
  var subject = this;
  var b = this;
  var target = this;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;

  var skip = false;
  var value = 0;
  var rate = 1;

  var code = Yanfly.Param.LunPasCasEffect;
  try {
    eval(code);
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'PASSIVE CONDITION CASES EFFECT ERROR');
  }
  if (skip) return true;
  return condition;
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.displayError = function(e, code, message) {
  console.log(message);
  console.log(code || 'NON-EXISTENT');
  console.error(e);
  if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= "1.6.0") return;
  if (Utils.isNwjs() && Utils.isOptionValid('test')) {
    if (!require('nw.gui').Window.get().isDevToolsOpen()) {
      require('nw.gui').Window.get().showDevTools();
    }
  }
};

//=============================================================================
// Default Effect Code
//=============================================================================

if (false) {

// -------------
// Switch On/Off
// -------------
if (data.match(/SWITCH[ ](\d+)[ ]ON/i)) {
  var switchId = parseInt(RegExp.$1);
  condition = $gameSwitches.value(switchId);

} else if (data.match(/SWITCH[ ](\d+)[ ]OFF/i)) {
  var switchId = parseInt(RegExp.$1);
  condition = !$gameSwitches.value(switchId);

// -------------
// Has/Not State
// -------------
} else if (data.match(/HAS[ ]STATE[ ](\d+)/i)) {
  var stateId = parseInt(RegExp.$1);
  condition = user.isStateAffected(stateId);

} else if (data.match(/NOT[ ]STATE[ ](\d+)/i)) {
  var stateId = parseInt(RegExp.$1);
  condition = !user.isStateAffected(stateId);

// -------------------
// Has/Not Buff/Debuff
// -------------------
} else if (data.match(/HAS[ ](.*)[ ]BUFF/i)) {
  var str = String(RegExp.$1);
  var paramId = DataManager.getParamId(str);
  condition = user.isBuffAffected(paramId);

} else if (data.match(/HAS[ ](.*)[ ]DEBUFF/i)) {
  var str = String(RegExp.$1);
  var paramId = DataManager.getParamId(str);
  condition = user.isDebuffAffected(paramId);

// --------------------
// Has/Not Weapon/Armor
// --------------------
} else if (data.match(/HAS[ ]WEAPON[ ](\d+)/i)) {
  if (user.isActor()) {
    var id = parseInt(RegExp.$1);
    var item = $dataWeapons[id];
    condition = user.hasWeapon(item);
  } else {
    condition = false;
  }

} else if (data.match(/NOT[ ]WEAPON[ ](\d+)/i)) {
  if (user.isActor()) {
    var id = parseInt(RegExp.$1);
    var item = $dataWeapons[id];
    condition = !user.hasWeapon(item);
  } else {
    condition = false;
  }

} else if (data.match(/HAS[ ]ARMOR[ ](\d+)/i)) {
  if (user.isActor()) {
    var id = parseInt(RegExp.$1);
    var item = $dataArmors[id];
    condition = user.hasArmor(item);
  } else {
    condition = false;
  }

} else if (data.match(/NOT[ ]ARMOR[ ](\d+)/i)) {
  if (user.isActor()) {
    var id = parseInt(RegExp.$1);
    var item = $dataArmors[id];
    condition = !user.hasArmor(item);
  } else {
    condition = false;
  }

// ----------------------
// Param Above/Below Stat
// ----------------------
} else if (data.match(/(.*)[ ](?:>|<|>=|<=|=|!=)[ ](.*)/i)) {
  var check1 = String(RegExp.$1);
  var check2 = String(RegExp.$2);
  var value1 = DataManager.numberParameterCheck(check1, user);
  var value2 = DataManager.numberParameterCheck(check2, user);
  if (value1 !== null && value2 !== null) {
    if (data.match(/>=/i)) {
      condition = value1 >= value2;
    } else if (data.match(/</i)) {
      condition = value1 <= value2;
    } else if (data.match(/>/i)) {
      condition = value1 > value2;
    } else if (data.match(/</i)) {
      condition = value1 < value2;
    } else if (data.match(/!=/i)) {
      condition = value1 !== value2;
    } else if (data.match(/=/i)) {
      condition = value1 === value2;
    } else {
      skip = true;
    }
  } else {
    condition = false;
  }

// -------------------------------
// Add new effects above this line
// -------------------------------
} else {
  skip = true;
}

}; // Default Effect Code

//=============================================================================
// End of File
//=============================================================================
} else {

var text = '';
text += 'You are getting this error because you are trying to run ';
text += 'YEP_Z_PassiveCases without the required plugins. Please visit ';
text += 'Yanfly.moe and install the required plugins neede for this plugin ';
text += 'found in this plugin\'s help file before you can use it.';
console.log(text);
require('nw.gui').Window.get().showDevTools();

}; // Yanfly.PluginRequirements