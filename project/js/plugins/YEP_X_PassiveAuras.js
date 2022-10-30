//=============================================================================
// Yanfly Engine Plugins - Passive Aura Effects
// YEP_X_PassiveAuras.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_PassiveAuras = true;

var Yanfly = Yanfly || {};
Yanfly.Aura = Yanfly.Aura || {};
Yanfly.Aura.version = 1.05;

//=============================================================================
 /*:
 * @plugindesc v1.05 (Requires YEP_AutoPassiveStates.js) Add aura effects
 * to various database objects.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires YEP_AutoPassiveStates. Make sure this plugin is located
 * under YEP_AutoPassiveStates in the plugin list.
 *
 * Passive Aura Effects are commonly found in many online multiplayer games
 * with RPG elements. When a battler can give out an aura, it will affect other
 * nearby battlers, too, either ally and/or foe. This plugin will allow states
 * to generate aura effects for other party members, opponents, or specifically
 * for actor and/or enemy parties.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * Use the following notetags to make a state generate auras.
 *
 * *NOTE* The notetags that affect alive members will affect members that have
 * at least 1 HP and not affected by the dead state. Even if they are immortal,
 * if they have 0 HP, they will not be affected by the alive aura effects as to
 * not conflict with the dead aura effects.
 *
 * *NOTE* The notetags that affect dead members will affect members that are
 * either affected by the death state or if their HP is at 0. The moment the
 * dead member has 1 HP or is no longer affected by the dead state, they will
 * no longer be affected by dead-only aura effects.
 *
 * State Notetags:
 *
 *   <Ally Aura: x>
 *   <Ally Aura: x, x, x>
 *   <Ally Aura: x through y>
 *   - This will cause the battler's allies to gain state(s) x (to y)
 *   while the battler is affected by the current state.
 *   *Note: A state cannot use itself in an aura effect.
 *
 *   <Alive Ally Aura: x>
 *   <Alive Ally Aura: x, x, x>
 *   <Alive Ally Aura: x through y>
 *   - This will cause the battler's alive allies to gain state(s) x (to y)
 *   while the battler is affected by the current state.
 *   *Note: A state cannot use itself in an aura effect.
 *
 *   <Dead Ally Aura: x>
 *   <Dead Ally Aura: x, x, x>
 *   <Dead Ally Aura: x through y>
 *   - This will cause the battler's dead allies to gain state(s) x (to y)
 *   while the battler is affected by the current state.
 *   *Note: A state cannot use itself in an aura effect.
 *
 *   <Foe Aura: x>
 *   <Foe Aura: x, x, x>
 *   <Foe Aura: x through y>
 *   - This will cause the battler's foes to gain state(s) x (to y)
 *   while the battler is affected by the current state.
 *   *Note: A state cannot use itself in an aura effect.
 *
 *   <Alive Foe Aura: x>
 *   <Alive Foe Aura: x, x, x>
 *   <Alive Foe Aura: x through y>
 *   - This will cause the battler's alive foes to gain state(s) x (to y)
 *   while the battler is affected by the current state.
 *   *Note: A state cannot use itself in an aura effect.
 *
 *   <Dead Foe Aura: x>
 *   <Dead Foe Aura: x, x, x>
 *   <Dead Foe Aura: x through y>
 *   - This will cause the battler's dead foes to gain state(s) x (to y)
 *   while the battler is affected by the current state.
 *   *Note: A state cannot use itself in an aura effect.
 *
 *   <Party Aura: x>
 *   <Party Aura: x, x, x>
 *   <Party Aura: x through y>
 *   - This will cause the Actor Party to gain state(s) x (to y)
 *   while the battler is affected by the current state.
 *   *Note: A state cannot use itself in an aura effect.
 *
 *   <Alive Party Aura: x>
 *   <Alive Party Aura: x, x, x>
 *   <Alive Party Aura: x through y>
 *   - This will cause the battler's alive Actor Party to gain state(s) x (to y)
 *   while the battler is affected by the current state.
 *   *Note: A state cannot use itself in an aura effect.
 *
 *   <Dead Party Aura: x>
 *   <Dead Party Aura: x, x, x>
 *   <Dead Party Aura: x through y>
 *   - This will cause the battler's dead Actor Party to gain state(s) x (to y)
 *   while the battler is affected by the current state.
 *   *Note: A state cannot use itself in an aura effect.
 *
 *   <Troop Aura: x>
 *   <Troop Aura: x, x, x>
 *   <Troop Aura: x through y>
 *   - This will cause the Enemy Troop to gain state(s) x (to y)
 *   while the battler is affected by the current state.
 *   *Note: A state cannot use itself in an aura effect.
 *
 *   <Alive Troop Aura: x>
 *   <Alive Troop Aura: x, x, x>
 *   <Alive Troop Aura: x through y>
 *   - This will cause the battler's alive Enemy Troop to gain state(s) x (to y)
 *   while the battler is affected by the current state.
 *   *Note: A state cannot use itself in an aura effect.
 *
 *   <Dead Troop Aura: x>
 *   <Dead Troop Aura: x, x, x>
 *   <Dead Troop Aura: x through y>
 *   - This will cause the battler's dead Enemy Troop to gain state(s) x (to y)
 *   while the battler is affected by the current state.
 *   *Note: A state cannot use itself in an aura effect.
 *
 *   <Everybody Aura: x>
 *   <Everybody Aura: x, x, x>
 *   <Everybody Aura: x through y>
 *   - This will cause the all active battlers to gain state(s) x (to y)
 *   while the battler is affected by the current state.
 *   *Note: A state cannot use itself in an aura effect.
 *
 *   <Alive Aura: x>
 *   <Alive Aura: x, x, x>
 *   <Alive Aura: x through y>
 *   - This will cause the all alive battlers to gain state(s) x (to y)
 *   while the battler is affected by the current state.
 *   *Note: A state cannot use itself in an aura effect.
 *
 *   <Dead Aura: x>
 *   <Dead Aura: x, x, x>
 *   <Dead Aura: x through y>
 *   - This will cause the all alive battlers to gain state(s) x (to y)
 *   while the battler is affected by the current state.
 *   *Note: A state cannot use itself in an aura effect.
 *
 * ============================================================================
 * Lunatic Mode - Custom Aura Conditions
 * ============================================================================
 *
 * For those with JavaScript experience and would like to make conditional aura
 * effects, you can use these notetags. Keep in mind, this conditional effect
 * is for the target delivered state and not the origin aura itself.
 *
 * State Notetags:
 *
 *   <Custom Aura Condition>
 *    if (user.hpRate() > 0.50) {
 *      condition = true;
 *    } else {
 *      condition = false;
 *    }
 *   </Custom Aura Condition>
 *   - The 'condition' variable will determine whether or not the target aura
 *   state will appear. If the 'condition' variable is 'true', then it will
 *   appear. If the 'condition' variable is 'false', then it will not appear.
 *   Remember, this notetag has to be placed in the target delivered state and
 *   not the origin aura itself.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.06:
 * - Updated for RPG Maker MV version 1.6.1.
 *
 * Version 1.05:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.04:
 * - Bug fixed where if an aura is applied as the last action of a turn, it
 * wouldn't take effect until the following turn.
 *
 * Version 1.03:
 * - Lunatic Mode fail safes added.
 *
 * Version 1.02:
 * - Added new notetags that affect specifically alive or dead allies. Alive
 * aura effects will affect only members with at least 1 HP and not affected by
 * the dead state. Dead aura effects will affect members with either 0 HP or
 * have the dead state.
 *
 * Version 1.01:
 * - Fixed a bug that would conflict with Taunt and Selection Core making some
 * aura effects randomly disappear.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Imported.YEP_AutoPassiveStates) {

//=============================================================================
// DataManager
//=============================================================================

Yanfly.Aura.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.Aura.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_X_PassiveAuras) {
    this.processAuraNotetags1($dataStates);
    Yanfly._loaded_YEP_X_PassiveAuras = true;
  }
  
  return true;
};

Yanfly.Aura.Types = [
  'friends', 'aliveFriends', 'deadFriends',
  'opponents', 'aliveOpponents', 'deadOpponents',
  'party', 'aliveParty', 'deadParty',
  'troop', 'aliveTroop', 'deadTroop',
  'all', 'aliveAll', 'deadAll'
];

DataManager.processAuraNotetags1 = function(group) {
  var note1 = /<(.*)[ ](?:AURA|STATE AURA):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note2 = /<(.*)[ ](?:AURA|STATE AURA):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.aura = {};
    for (a = 0; a < Yanfly.Aura.Types.length; ++a) {
      obj.aura[Yanfly.Aura.Types[a]] = [];
    }
    var evalMode = 'none';
    obj.auraConditionEval = '';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        var type = this.getNotetagAuraType(String(RegExp.$1));
        var array = JSON.parse('[' + RegExp.$2.match(/\d+/g) + ']');
        obj.aura[type] = obj.aura[type].concat(array);
        Yanfly.Util.removeArrayElement(obj.aura[type], obj.id);
      } else if (line.match(note2)) {
        var type = this.getNotetagAuraType(String(RegExp.$1));
        var range = Yanfly.Util.getRange(parseInt(RegExp.$2),
          parseInt(RegExp.$3));
        obj.aura[type] = obj.aura[type].concat(range);
        Yanfly.Util.removeArrayElement(obj.aura[type], obj.id);
      } else if (line.match(/<(?:CUSTOM AURA CONDITION)>/i)) {
        var evalMode = 'custom aura condition';
      } else if (line.match(/<\/(?:CUSTOM AURA CONDITION)>/i)) {
        var evalMode = 'none';
      } else if (evalMode === 'custom aura condition') {
        obj.auraConditionEval = obj.auraConditionEval + line + '\n';
      }
    }
  }
};

DataManager.getNotetagAuraType = function(str) {
  switch (str.toUpperCase()) {
  case 'ALLY':
  case 'ALLIES':
  case 'FRIEND':
  case 'FRIENDS':
  case 'FRIENDLY':
    return 'friends';
    break;

  case 'ALIVE ALLY':
  case 'ALIVE ALLIES':
  case 'ALIVE FRIEND':
  case 'ALIVE FRIENDS':
  case 'ALIVE FRIENDLY':
    return 'aliveFriends';
    break;

  case 'DEAD ALLY':
  case 'DEAD ALLIES':
  case 'DEAD FRIEND':
  case 'DEAD FRIENDS':
  case 'DEAD FRIENDLY':
    return 'deadFriends';
    break;

  case 'FOE':
  case 'FOES':
  case 'OPPONENT':
  case 'OPPONENTS':
  case 'OPPOSING':
    return 'opponents';
    break;

  case 'ALIVE FOE':
  case 'ALIVE FOES':
  case 'ALIVE OPPONENT':
  case 'ALIVE OPPONENTS':
  case 'ALIVE OPPOSING':
    return 'aliveOpponents';
    break;

  case 'DEAD FOE':
  case 'DEAD FOES':
  case 'DEAD OPPONENT':
  case 'DEAD OPPONENTS':
  case 'DEAD OPPOSING':
    return 'deadOpponents';
    break;

  case 'ACTOR':
  case 'ACTORS':
  case 'PARTY':
  case 'PARTIES':
    return 'party';
    break;

  case 'ALIVE ACTOR':
  case 'ALIVE ACTORS':
  case 'ALIVE PARTY':
  case 'ALIVE PARTIES':
    return 'aliveParty';
    break;

  case 'DEAD ACTOR':
  case 'DEAD ACTORS':
  case 'DEAD PARTY':
  case 'DEAD PARTIES':
    return 'deadParty';
    break;

  case 'ENEMY':
  case 'ENEMIES':
  case 'TROOP':
  case 'TROOPS':
    return 'troop';
    break;

  case 'ALIVE ENEMY':
  case 'ALIVE ENEMIES':
  case 'ALIVE TROOP':
  case 'ALIVE TROOPS':
    return 'aliveTroop';
    break;

  case 'DEAD ENEMY':
  case 'DEAD ENEMIES':
  case 'DEAD TROOP':
  case 'DEAD TROOPS':
    return 'deadTroop';
    break;

  default:
    return 'all';
  }
};

DataManager.isAuraState = function(state) {
  if (!state) return false;
  if (!state.aura) return false;
  var array = Yanfly.Aura.Types;
  var length = array.length;
  for (var i = 0; i < length; ++i) {
    if (state.aura[array[i]].length > 0) return true;
  }
  return false;
};

//=============================================================================
// BattleManager
//=============================================================================

BattleManager.refreshAllBattlers = function() {
  var members = $gameParty.members().concat($gameTroop.members());
  var length = members.length;
  for (var i = 0; i < length; ++i) {
    var member = members[i];
    if (member) member.refresh();
  }
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Yanfly.Aura.Game_BattlerBase_passiveStatesRaw =
  Game_BattlerBase.prototype.passiveStatesRaw;
Game_BattlerBase.prototype.passiveStatesRaw = function() {
  var array = Yanfly.Aura.Game_BattlerBase_passiveStatesRaw.call(this);
  if ($gameParty.inBattle()) {
    array = array.concat(this.validAuraStateIds());
  }
  return array.filter(Yanfly.Util.onlyUnique);
};

Game_BattlerBase.prototype.checkAuraAlive = function() {
  return this.hp > 0 && this.isAlive();
};

Game_BattlerBase.prototype.checkAuraDead = function() {
  return this.hp <= 0 || this.isDead();
};

Game_BattlerBase.prototype.validAuraStateIds = function() {
  var array = [];
  var states = this.auraStateIds();
  var length = states.length;
  for (var i = 0; i < length; ++i) {
    var stateId = states[i];
    if (this.meetAuraStateCondition(stateId)) array.push(stateId);
  }
  return array;
};

Game_BattlerBase.prototype.auraStateIds = function() {
  if ($gameTemp._isGatheringAuraData) return [];
  var array = [];
  var friends = this.friendsUnit();
  var opponents = this.opponentsUnit();
  $gameTemp._isGatheringAuraData = true;
  array = array.concat(friends.auraStateTypeIds('all'));
  array = array.concat(opponents.auraStateTypeIds('all'));
  array = array.concat(friends.auraStateTypeIds('friends'));
  array = array.concat(opponents.auraStateTypeIds('opponents'));
  if (this.checkAuraAlive()) {
    array = array.concat(friends.auraStateTypeIds('aliveAll'));
    array = array.concat(opponents.auraStateTypeIds('aliveAll'));
    array = array.concat(friends.auraStateTypeIds('aliveFriends'));
    array = array.concat(opponents.auraStateTypeIds('aliveOpponents'));
  } else if (this.checkAuraDead()) {
    array = array.concat(friends.auraStateTypeIds('deadAll'));
    array = array.concat(opponents.auraStateTypeIds('deadAll'));
    array = array.concat(friends.auraStateTypeIds('deadFriends'));
    array = array.concat(opponents.auraStateTypeIds('deadOpponents'));
  }
  $gameTemp._isGatheringAuraData = false;
  return array;
};

Game_BattlerBase.prototype.getAuraStateTypeId = function(type) {
  var array = [];
  var states = this.states();
  var length = states.length;
  for (var i = 0; i < length; ++i) {
    var state = states[i];
    if (!state) continue;
    if (!DataManager.isAuraState(state)) continue;
    array = array.concat(state.aura[type]);
  }
  return array;
};

Game_BattlerBase.prototype.meetAuraStateCondition = function(stateId) {
  this._checkAuraStateCondition = this._checkAuraStateCondition || [];
  if (this._checkAuraStateCondition.contains(stateId)) return false;
  var state = $dataStates[stateId];
  if (!state) return false;
  if (state.auraConditionEval === '') return true;
  return this.auraStateConditionEval(state);
};

Game_BattlerBase.prototype.auraStateConditionEval = function(state) {
  this._checkAuraStateCondition = this._checkAuraStateCondition || [];
  this._checkAuraStateCondition.push(state.id);
  var condition = true;
  var a = this;
  var user = this;
  var subject = this;
  var b = this;
  var target = this;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  var code = state.auraConditionEval;
  try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'PASSIVE AURA CUSTOM CONDITION ERROR');
    }
  var index = this._checkAuraStateCondition.indexOf(state.id);
  this._checkAuraStateCondition.splice(index, 1);
  return condition;
};

Yanfly.Aura.Game_BattlerBase_addNewState =
  Game_BattlerBase.prototype.addNewState;
Game_BattlerBase.prototype.addNewState = function(stateId) {
  Yanfly.Aura.Game_BattlerBase_addNewState.call(this, stateId);
  this.updateAuras(stateId);
};

Yanfly.Aura.Game_BattlerBase_eraseState =
  Game_BattlerBase.prototype.eraseState;
Game_BattlerBase.prototype.eraseState = function(stateId) {
  Yanfly.Aura.Game_BattlerBase_eraseState.call(this, stateId);
  this.updateAuras(stateId);
};

Game_BattlerBase.prototype.updateAuras = function(stateId) {
  var state = $dataStates[stateId];
  if (!state) return;
  aura = state.aura;
  if ((aura.all.length + aura.friends.length > 0) || aura.party.length > 0) {
    $gameParty.refreshMembers();
  }
  if ((aura.all.length + aura.opponents.length > 0) || aura.troop.length > 0) {
    $gameTroop.refreshMembers();
  }
};

//=============================================================================
// Game_Battler
//=============================================================================

Yanfly.Aura.Game_Battler_onTurnEnd = Game_Battler.prototype.onTurnEnd;
Game_Battler.prototype.onTurnEnd = function() {
  if ($gameParty.inBattle()) this.refresh();
  Yanfly.Aura.Game_Battler_onTurnEnd.call(this);
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.auraStateIds = function() {
  if ($gameTemp._isGatheringAuraData) return [];
  var array = Game_Battler.prototype.auraStateIds.call(this);
  var friends = this.friendsUnit();
  var opponents = this.opponentsUnit();
  $gameTemp._isGatheringAuraData = true;
  array = array.concat(friends.auraStateTypeIds('party'));
  array = array.concat(opponents.auraStateTypeIds('party'));
  if (this.checkAuraAlive()) {
    array = array.concat(friends.auraStateTypeIds('aliveParty'));
    array = array.concat(opponents.auraStateTypeIds('aliveParty'));
  } else if (this.checkAuraDead()) {
    array = array.concat(friends.auraStateTypeIds('deadParty'));
    array = array.concat(opponents.auraStateTypeIds('deadParty'));
  }
  $gameTemp._isGatheringAuraData = false;
  return array;
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.auraStateIds = function() {
  if ($gameTemp._isGatheringAuraData) return [];
  var array = Game_Battler.prototype.auraStateIds.call(this);
  var friends = this.friendsUnit();
  var opponents = this.opponentsUnit();
  $gameTemp._isGatheringAuraData = true;
  array = array.concat(friends.auraStateTypeIds('troop'));
  array = array.concat(opponents.auraStateTypeIds('troop'));
  if (this.checkAuraAlive()) {
    array = array.concat(friends.auraStateTypeIds('aliveTroop'));
    array = array.concat(opponents.auraStateTypeIds('aliveTroop'));
  } else if (this.checkAuraDead()) {
    array = array.concat(friends.auraStateTypeIds('deadTroop'));
    array = array.concat(opponents.auraStateTypeIds('deadTroop'));
  }
  $gameTemp._isGatheringAuraData = false;
  return array;
};

//=============================================================================
// Game_Unit
//=============================================================================

Game_Unit.prototype.allAliveMembers = function() {
  return this.members().filter(function(member) {
      return member.isAlive();
  });
};

Game_Unit.prototype.auraStateTypeIds = function(type) {
  var array = [];
  var members = this.allAliveMembers();
  var length = members.length;
  for (var i = 0; i < length; ++i) {
    var member = members[i];
    if (member) {
      array = array.concat(member.getAuraStateTypeId(type));
    }
  }
  return array;
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

Yanfly.Util.removeArrayElement = function(array, element) {
  while (array.indexOf(element) >= 0) {
    array.splice(array.indexOf(element), 1);
  }
};

//=============================================================================
// End of File
//=============================================================================
}; // Imported.YEP_AutoPassiveStates