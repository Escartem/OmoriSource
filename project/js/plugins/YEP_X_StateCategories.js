//=============================================================================
// Yanfly Engine Plugins - Buffs & States Extension - State Categories
// YEP_X_StateCategories.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_StateCategories = true;

var Yanfly = Yanfly || {};
Yanfly.StC = Yanfly.StC || {};
Yanfly.StC.version = 1.07;

//=============================================================================
 /*:
 * @plugindesc v1.07 (Requires YEP_BuffsStatesCore.js) Sets up categories
 * for your states to make control over them easier.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires YEP_BuffsStatesCore. Make sure this plugin is located
 * under YEP_BuffsStatesCore in the plugin list.
 *
 * This plugin allows you to set categories for your states. They can be one
 * category, multiple categories, or no categories. With this in mind, there's
 * a few new features this plugin provides that pertains to this category
 * system such as removal of states under a certain category and the ability to
 * have them bypass certain key removal aspects such as on Death removal or
 * Recover All removal.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * Use the following notetags to alter various properties revolving around
 * state categories for your database objects.
 *
 * State Notetags:
 *
 *   <Category: text>
 *   Adds the 'text' category to this state. You can insert multiples of this
 *   notetag to give a state multiple categories.
 *
 *   <Category: Bypass Death Removal>
 *   Adds the 'Bypass Death Removal' category to the state. This is a category
 *   utilized by the plugin to bypass removal of it upon death.
 *
 *   <Category: Bypass Recover All Removal>
 *   Adds the 'Bypass Recover All Removal' category to the state. This is a
 *   category utilized by the plugin to bypass removal of it upon using the
 *   Recover All event.
 *
 *   <Category: Group Defeat>
 *   Adds the 'Group Defeat' category to the state. If all group members are
 *   afflicted by states that have this effect, it is considered a lost battle.
 *
 * Skill and Item Notetags:
 *
 *   <Remove State Category: text>
 *   Causes this action to remove all states from category 'text' from the
 *   action's target. This will not attempt to remove passive states.
 *
 *   <Remove x State Category: text>
 *   Causes this action to remove x states from category 'text' from the
 *   action's target. The states removed will be the front x states of highest
 *   to lowest priority with the matching category text. This will not attempt
 *   to remove passive states.
 *
 * ============================================================================
 * Lunatic Mode - Custom State Category Removal
 * ============================================================================
 *
 * For those with JavaScript experience and would like to remove a dynamic
 * number of states of a pertaining category, you can do so with the following
 * notetags!
 *
 * Skill and Item Notetags:
 *
 *   <Custom Remove State Category: text>
 *    value += user.level;
 *    value -= target.level;
 *   </Custom Remove State Category: text>
 *   The 'value' variable is the amount of states to be removed by the action.
 *   If there was a <Remove x State Category: text> in the skill/item notebox,
 *   then the 'value' variable will start off with that amount. If not, the
 *   'value' variable will start off at 1.
 *
 * ============================================================================
 * Lunatic Mode - New JavaScript Functions
 * ============================================================================
 *
 * For those with JavaScript experience, you can use the following functions
 * newly added with this plugin. The 'battler' variable refers to either an
 * actor or an enemy.
 *
 * --- Functions ---
 *
 * battler.removeStateCategoryAll('text');
 * - This will remove all states of the category 'text' from the battler.
 * Replace 'text' with the category name but keep the quotes. This will not
 * attempt to remove passive states.
 *
 * battler.removeStateCategory('text', x);
 * - This will remove x states of the category 'text' from the battler. Replace
 * 'text' with the category name but keep the quotes. Replace x with a number.
 * This will not attempt to remove passive states.
 *
 * battler.isStateCategoryAffected('text')
 * - This will return a 'true' or 'false' after checking if battler is affected
 * by a state with category 'text'. Replace 'text' with the category name but
 * keep the quotes. This will check even passive states.
 *
 * battler.getStateCategoryAffectedCount('text');
 * - This will return a number value to see how many states (passives included)
 * the battler is affected by with the category 'text'. Replace 'text' with the
 * category name but keep the quotes.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.07:
 * - Bypass the isDevToolsOpen() error when bad code is inserted into a script
 * call or custom Lunatic Mode code segment due to updating to MV 1.6.1.
 *
 * Version 1.06:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.05a:
 * - Lunatic Mode fail safes added.
 * - Fixed a documentation error with <Custom Remove State Category: text>.
 *
 * Version 1.04:
 * - Compatibility update with Selection Control to not game over the player
 * while there are still members alive.
 *
 * Version 1.03:
 * - States with <Category: Bypass Death Removal> can now be added onto already
 * dead battlers.
 *
 * Version 1.02:
 * - When using the JavaScript functions, the categories will now automatically
 * be converted to uppercase to function with the rest of the plugin.
 *
 * Version 1.01:
 * - Added <Category: Group Defeat> effect.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Imported.YEP_BuffsStatesCore) {

//=============================================================================
// DataManager
//=============================================================================

Yanfly.StC.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.StC.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_X_StateCategories) {
    this.processStCNotetags1($dataStates);
    this.processStCNotetags2($dataSkills);
    this.processStCNotetags2($dataItems);
    Yanfly._loaded_YEP_X_StateCategories = true;
  }
  
  return true;
};

DataManager.processStCNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.category = [];

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<CATEGORY:[ ](.*)>/i)) {
        obj.category.push(String(RegExp.$1).toUpperCase())
      }
    }
  }
};

DataManager.processStCNotetags2 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.removeCategory = {};
    var evalMode = 'none';
    var evalLine = '';
    obj.removeCategoryEval = {};

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<REMOVE STATE CATEGORY:[ ](.*)>/i)) {
        var category = String(RegExp.$1).toUpperCase().trim();
        obj.removeCategory[category] = 'ALL';
      } else if (line.match(/<REMOVE[ ](\d+)[ ]STATE CATEGORY:[ ](.*)>/i)) {
        var value = parseInt(RegExp.$1);
        var category = String(RegExp.$2).toUpperCase().trim();
        obj.removeCategory[category] = value;
      } else if (line.match(/<CUSTOM REMOVE STATE CATEGORY:[ ](.*)>/i)) {
        var evalMode = 'custom remove state category';
        var evalLine = '';
      } else if (line.match(/<\/CUSTOM REMOVE STATE CATEGORY:[ ](.*)>/i)) {
        var category = String(RegExp.$1).toUpperCase().trim();
        obj.removeCategory[category] = obj.removeCategory[category] || 1;
        obj.removeCategoryEval[category] = evalLine;
        var evalMode = 'none';
        var evalLine = '';
      } else if (evalMode === 'custom remove state category') {
        evalLine = evalLine + line + '\n';
      }
    }
  }
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Yanfly.StC.Game_BattlerBase_die = Game_BattlerBase.prototype.die;
Game_BattlerBase.prototype.die = function() {
    $gameTemp._deathStateClear = true;
    Yanfly.StC.Game_BattlerBase_die.call(this);
    $gameTemp._deathStateClear = false;
};

Yanfly.StC.Game_BattlerBase_recoverAll = Game_BattlerBase.prototype.recoverAll;
Game_BattlerBase.prototype.recoverAll = function() {
    $gameTemp._recoverAllClear = true;
    Yanfly.StC.Game_BattlerBase_recoverAll.call(this);
    $gameTemp._recoverAllClear = false;
};

Yanfly.StC.Game_BattlerBase_clearStates =
    Game_BattlerBase.prototype.clearStates;
Game_BattlerBase.prototype.clearStates = function() {
  if (this.isCustomClearStates()) {
    var states = JsonEx.makeDeepCopy(this._states);
    var turns = JsonEx.makeDeepCopy(this._stateTurns);
  }
  Yanfly.StC.Game_BattlerBase_clearStates.call(this);
  if (this.isCustomClearStates()) this.retainCustomClearStates(states, turns);
};

Game_BattlerBase.prototype.isCustomClearStates = function() {
    if ($gameTemp._deathStateClear) return true;
    if ($gameTemp._recoverAllClear) return true;
    return false;
};

Game_BattlerBase.prototype.retainCustomClearStates = function(states, turns) {
    var length = states.length;
    var removed = false;
    for (var i = 0; i < length; ++i) {
      var id = states[i];
      var state = $dataStates[id];
      if (!state) continue;
      if ($gameTemp._deathStateClear) {
        if (state.category.contains('BYPASS DEATH REMOVAL')) {
          this._states.push(id);
          this._stateTurns[id] = turns[id];
          removed = true;
        }
      }
      if ($gameTemp._recoverAllClear) {
        if (state.category.contains('BYPASS RECOVER ALL REMOVAL')) {
          this._states.push(id);
          this._stateTurns[id] = turns[id];
          removed = true;
        }
      }
    }
    if (removed) this.sortStates();
};

//=============================================================================
// Game_Battler
//=============================================================================

Yanfly.StC.Game_Battler_refresh = Game_Battler.prototype.refresh;
Game_Battler.prototype.refresh = function() {
    this._groupDefeat = undefined;
    Yanfly.StC.Game_Battler_refresh.call(this);
};

Yanfly.StC.Game_Battler_isStateAddable = Game_Battler.prototype.isStateAddable;
Game_Battler.prototype.isStateAddable = function(stateId) {
  var state = $dataStates[stateId];
  if (state && state.category.contains('BYPASS DEATH REMOVAL')) {
    return (!this.isStateResist(stateId) &&
           !this._result.isStateRemoved(stateId) &&
           !this.isStateRestrict(stateId));
  }
  return Yanfly.StC.Game_Battler_isStateAddable.call(this, stateId);
};

Game_Battler.prototype.removeStateCategoryEffect = function(obj, user) {
    var categories = obj.removeCategory;
    for (var category in categories) {
      var value = categories[category];
      if (value === 'ALL') {
        this.removeStateCategoryAll(category);
      } else {
        value = this.removeStateCategoryEval(value, obj, category, user);
        this.removeStateCategory(category, value);
      }
    }
};

Game_Battler.prototype.removeStateCategoryEval = function(value, obj, c, user) {
    if (!obj.removeCategoryEval[c]) return value;
    var formula = obj.removeCategoryEval[c];
    var category = c;
    var item = obj;
    var skill = obj;
    var a = user;
    var subject = user;
    var b = this;
    var target = this;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    try {
      eval(formula);
    } catch (e) {
      Yanfly.Util.displayError(e, formula, 'REMOVE STATE CATEGORY ERROR');
    }
    return value;
};

Game_Battler.prototype.removeStateCategoryAll = function(category) {
    category = category.toUpperCase().trim();
    var states = JsonEx.makeDeepCopy(this._states);
    var length = states.length;
    for (var i = 0; i < length; ++i) {
      var id = states[i];
      var state = $dataStates[id];
      if (!state) continue;
      if (state.category.contains(category)) this.removeState(id);
    }
};

Game_Battler.prototype.removeStateCategory = function(category, count) {
    category = category.toUpperCase().trim();
    count = count || 0;
    var states = JsonEx.makeDeepCopy(this._states);
    var length = states.length;
    var value = 0;
    for (var i = 0; i < length; ++i) {
      if (value >= count) return;
      var id = states[i];
      var state = $dataStates[id];
      if (!state) continue;
      if (state.category.contains(category)) {
        this.removeState(id);
        value += 1;
      }
    }
};

Game_Battler.prototype.isStateCategoryAffected = function(category) {
    category = category.toUpperCase().trim();
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.category.contains(category.toUpperCase())) return true;
    }
    return false;
};

Game_Battler.prototype.getStateCategoryAffectedCount = function(category) {
    category = category.toUpperCase().trim();
    var count = 0;
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.category.contains(category.toUpperCase())) count += 1;
    }
    return count;
};

Game_Battler.prototype.isGroupDefeatAffected = function() {
    if (this._groupDefeat !== undefined) return this._groupDefeat;
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var state = this.states()[i];
      if (state.category.contains('GROUP DEFEAT')) {
        this._groupDefeat = true;
        return this._groupDefeat;
      }
    }
    this._groupDefeat = false;
    return this._groupDefeat;
};

//=============================================================================
// Game_Unit
//=============================================================================

Yanfly.StC.Game_Unit_isAllDead = Game_Unit.prototype.isAllDead;
Game_Unit.prototype.isAllDead = function() {
  $gameTemp._checkAllAliveMembers = true;
  var length = this.aliveMembers().length;
  var count = 0;
  for (var i = 0; i < length; ++i) {
    var member = this.aliveMembers()[i];
    if (member && member.isGroupDefeatAffected()) {
      count += 1;
    }
  }
  if (count >= length) {
    $gameTemp._checkAllAliveMembers = undefined;
    return true;
  }
  var value = Yanfly.StC.Game_Unit_isAllDead.call(this);
  $gameTemp._checkAllAliveMembers = undefined;
  return value;
};

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.StC.Game_Action_applyItemUserEffect =
    Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
    Yanfly.StC.Game_Action_applyItemUserEffect.call(this, target);
    if (this.item() && this.item().removeCategory) {
      this.applyStateCategoryRemovalEffect(target);
    }
};

Game_Action.prototype.applyStateCategoryRemovalEffect = function(target) {
  target.removeStateCategoryEffect(this.item(), this.subject());
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
// End of File
//=============================================================================
};