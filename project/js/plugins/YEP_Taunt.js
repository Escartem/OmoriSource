//=============================================================================
// Yanfly Engine Plugins - Taunt
// YEP_Taunt.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_Taunt = true;

var Yanfly = Yanfly || {};
Yanfly.Taunt = Yanfly.Taunt || {};
Yanfly.Taunt.version = 1.02

//=============================================================================
 /*:
 * @plugindesc v1.02 Adds a Taunt mechanic to battle. Battlers with a
 * taunt property become the target of enemy focus.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Taunts add a new mechanic to battle. Whenever a unit has a member with a
 * taunt trait, the opposing unit's single target attacks and skills must focus
 * on the taunting unit. This adds aggro control for either unit and can add a
 * new level of depth for battle. Taunts are divided up into physical, magical,
 * and certain hit taunts which respectively aggro physical actions, magical
 * actions, and certain hit actions.
 *
 * If there are multiple users with taunt, the rival party can select which
 * taunt user to attack. This is to prevent a lockdown caused by a rival unit
 * making the battle impossible to progress.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are some notetags you can use to add taunt traits to your
 * various database objects.
 *
 * Actor, Class, Weapon, Armor, State, Enemy Notetags:
 *   <Physical Taunt>
 *   <Magical Taunt>
 *   <Certain Taunt>
 *   These three notetags enable the database object of choice to have the
 *   respective taunt mechanic against those types of actions. Physical taunts
 *   will cause the user to aggro all physical type of actions from the rival
 *   team. The same goes for magical taunts and certain taunts of their nature.
 *
 *   <Null Physical Taunt>
 *   <Null Magical Taunt>
 *   <Null Certain Taunt>
 *   This nullifies the respective taunt trait on the user (not the attacker).
 *   What this means is if a user originally has taunt through some form or
 *   means, having a null taunt trait applied will remove that taunt effect and
 *   the user will be treated as a normal target.
 *
 *   <Ignore Physical Taunt>
 *   <Ignore Magical Taunt>
 *   <Ignore Certain Taunt>
 *   This allows an attacker with this trait to ignore any taunts of the
 *   respective nature and gain access to all possible targets as if no taunts
 *   are in place.
 *
 * Skill and Item Notetag:
 *   <Bypass Taunt>
 *   This causes this skill/item to ignore taunts altogether and the skill/item
 *   is able to select single targets as if no taunts existed on the field.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.02:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.01:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// DataManager
//=============================================================================

Yanfly.Taunt.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.Taunt.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_Taunt) {
  	this.processTauntNotetags1($dataActors);
    this.processTauntNotetags1($dataClasses);
    this.processTauntNotetags1($dataWeapons);
    this.processTauntNotetags1($dataArmors);
    this.processTauntNotetags1($dataStates);
    this.processTauntNotetags1($dataEnemies);
    this.processTauntNotetags2($dataSkills);
    this.processTauntNotetags2($dataEnemies);
    Yanfly._loaded_YEP_Taunt = true;
  }
	return true;
};

DataManager.processTauntNotetags1 = function(group) {
	var note1 = /<(?:PHYSICAL TAUNT)>/i;
  var note2 = /<(?:MAGICAL TAUNT)>/i;
  var note3 = /<(?:CERTAIN TAUNT)>/i;
  var note4 = /<(?:NULL PHYSICAL TAUNT)>/i;
  var note5 = /<(?:NULL MAGICAL TAUNT)>/i
  var note6 = /<(?:NULL CERTAIN TAUNT)>/i
  var note7 = /<(?:IGNORE PHYSICAL TAUNT)>/i
  var note8 = /<(?:IGNORE MAGICAL TAUNT)>/i
  var note9 = /<(?:IGNORE CERTAIN TAUNT)>/i
  for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.physTaunt = false;
    obj.magicTaunt = false;
    obj.certainTaunt = false;

    obj.nullPhysTaunt = false;
    obj.nullMagicTaunt = false;
    obj.nullCertainTaunt = false;

    obj.ignorePhysTaunt = false;
    obj.ignoreMagicTaunt = false;
    obj.ignoreCertainTaunt = false;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				obj.physTaunt = true;
			} else if (line.match(note2)) {
				obj.magicTaunt = true;
      } else if (line.match(note3)) {
        obj.certainTaunt = true;
      } else if (line.match(note4)) {
				obj.nullPhysTaunt = true;
			} else if (line.match(note5)) {
				obj.nullMagicTaunt = true;
      } else if (line.match(note6)) {
        obj.nullCertainTaunt = true;
      } else if (line.match(note7)) {
				obj.ignorePhysTaunt = true;
			} else if (line.match(note8)) {
				obj.ignoreMagicTaunt = true;
      } else if (line.match(note9)) {
        obj.ignoreCertainTaunt = true;
      }
		}
	}
};

DataManager.processTauntNotetags2 = function(group) {
	var note1 = /<(?:BYPASS TAUNT)>/i;
  for (var n = 1; n < group.length; n++) {
		var obj = group[n];
		var notedata = obj.note.split(/[\r\n]+/);

    obj.bypassTaunt = false;

		for (var i = 0; i < notedata.length; i++) {
			var line = notedata[i];
			if (line.match(note1)) {
				obj.bypassTaunt = true;
			}
		}
	}
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Game_BattlerBase.prototype.tauntPhysical = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state.physTaunt) return true;
    }
    return false;
};

Game_BattlerBase.prototype.tauntMagical = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state.magicTaunt) return true;
    }
    return false;
};

Game_BattlerBase.prototype.tauntCertain = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state.certainTaunt) return true;
    }
    return false;
};

Game_BattlerBase.prototype.nullTauntPhysical = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state.nullPhysTaunt) return true;
    }
    return false;
};

Game_BattlerBase.prototype.nullTauntMagical = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state.nullMagicTaunt) return true;
    }
    return false;
};

Game_BattlerBase.prototype.nullTauntCertain = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state.nullCertainTaunt) return true;
    }
    return false;
};

Game_BattlerBase.prototype.ignoreTauntPhysical = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state.ignorePhysTaunt) return true;
    }
    return false;
};

Game_BattlerBase.prototype.ignoreTauntMagical = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state.ignoreMagicTaunt) return true;
    }
    return false;
};

Game_BattlerBase.prototype.ignoreTauntCertain = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (state.ignoreCertainTaunt) return true;
    }
    return false;
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.tauntPhysical = function() {
    if (this.nullTauntPhysical()) return false;
    if (this.actor().physTaunt) return true;
    if (this.currentClass().physTaunt) return true;
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (equip && equip.physTaunt) return true;
    }
    return Game_BattlerBase.prototype.tauntPhysical.call(this);
};

Game_Actor.prototype.tauntMagical = function() {
    if (this.nullTauntMagical()) return false;
    if (this.actor().magicTaunt) return true;
    if (this.currentClass().magicTaunt) return true;
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (equip && equip.magicTaunt) return true;
    }
    return Game_BattlerBase.prototype.tauntMagical.call(this);
};

Game_Actor.prototype.tauntCertain = function() {
    if (this.nullTauntCertain()) return false;
    if (this.actor().certainTaunt) return true;
    if (this.currentClass().certainTaunt) return true;
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (equip && equip.certainTaunt) return true;
    }
    return Game_BattlerBase.prototype.tauntCertain.call(this);
};

Game_Actor.prototype.nullTauntPhysical = function() {
    if (this.actor().nullPhysTaunt) return true;
    if (this.currentClass().nullPhysTaunt) return true;
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (equip && equip.nullPhysTaunt) return true;
    }
    return Game_BattlerBase.prototype.nullTauntPhysical.call(this);
};

Game_Actor.prototype.nullTauntMagical = function() {
    if (this.actor().nullMagicTaunt) return true;
    if (this.currentClass().nullMagicTaunt) return true;
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (equip && equip.nullMagicTaunt) return true;
    }
    return Game_BattlerBase.prototype.nullTauntMagical.call(this);
};

Game_Actor.prototype.nullTauntCertain = function() {
    if (this.actor().nullCertainTaunt) return true;
    if (this.currentClass().nullCertainTaunt) return true;
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (equip && equip.nullCertainTaunt) return true;
    }
    return Game_BattlerBase.prototype.nullTauntCertain.call(this);
};

Game_Actor.prototype.ignoreTauntPhysical = function() {
  if (this.actor().ignorePhysTaunt) return true;
  if (this.currentClass().ignorePhysTaunt) return true;
  for (var i = 0; i < this.equips().length; ++i) {
    var equip = this.equips()[i];
    if (equip && equip.ignorePhysTaunt) return true;
  }
  return Game_BattlerBase.prototype.ignoreTauntPhysical.call(this);
};

Game_Actor.prototype.ignoreTauntMagical = function() {
  if (this.actor().ignoreMagicTaunt) return true;
  if (this.currentClass().ignoreMagicTaunt) return true;
  for (var i = 0; i < this.equips().length; ++i) {
    var equip = this.equips()[i];
    if (equip && equip.ignoreMagicTaunt) return true;
  }
  return Game_BattlerBase.prototype.ignoreTauntMagical.call(this);
};

Game_Actor.prototype.ignoreTauntCertain = function() {
  if (this.actor().ignoreCertainTaunt) return true;
  if (this.currentClass().ignoreCertainTaunt) return true;
  for (var i = 0; i < this.equips().length; ++i) {
    var equip = this.equips()[i];
    if (equip && equip.ignoreCertainTaunt) return true;
  }
  return Game_BattlerBase.prototype.ignoreTauntCertain.call(this);
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.tauntPhysical = function() {
    if (this.nullTauntPhysical()) return false;
    if (this.enemy().physTaunt) return true;
    return Game_BattlerBase.prototype.tauntPhysical.call(this);
};

Game_Enemy.prototype.tauntMagical = function() {
    if (this.nullTauntMagical()) return false;
    if (this.enemy().magicTaunt) return true;
    return Game_BattlerBase.prototype.tauntMagical.call(this);
};

Game_Enemy.prototype.tauntCertain = function() {
    if (this.nullTauntCertain()) return false;
    if (this.enemy().certainTaunt) return true;
    return Game_BattlerBase.prototype.tauntCertain.call(this);
};

Game_Enemy.prototype.nullTauntPhysical = function() {
    if (this.enemy().nullPhysTaunt) return true;
    return Game_BattlerBase.prototype.nullTauntPhysical.call(this);
};

Game_Enemy.prototype.nullTauntMagical = function() {
    if (this.enemy().nullMagicTaunt) return true;
    return Game_BattlerBase.prototype.nullTauntMagical.call(this);
};

Game_Enemy.prototype.nullTauntCertain = function() {
    if (this.enemy().nullCertainTaunt) return true;
    return Game_BattlerBase.prototype.nullTauntCertain.call(this);
};

Game_Enemy.prototype.ignoreTauntPhysical = function() {
    if (this.enemy().ignorePhysTaunt) return true;
    return Game_BattlerBase.prototype.ignoreTauntPhysical.call(this);
};

Game_Enemy.prototype.ignoreTauntMagical = function() {
    if (this.enemy().ignoreMagicTaunt) return true;
    return Game_BattlerBase.prototype.ignoreTauntMagical.call(this);
};

Game_Enemy.prototype.ignoreTauntCertain = function() {
    if (this.enemy().nullCertainTaunt) return true;
    return Game_BattlerBase.prototype.ignoreTauntCertain.call(this);
};

//=============================================================================
// Game_Unit
//=============================================================================

Yanfly.Taunt.Game_Unit_aliveMembers = Game_Unit.prototype.aliveMembers;
Game_Unit.prototype.aliveMembers = function() {
    if (this._inBattle && $gameTemp._taunt) return this.tauntMembers();
    return Yanfly.Taunt.Game_Unit_aliveMembers.call(this);
};

Game_Unit.prototype.physicalTauntMembers = function() {
    return this.members().filter(function(member) {
        return member.isAlive() && member.tauntPhysical();
    });
};

Game_Unit.prototype.magicalTauntMembers = function() {
    return this.members().filter(function(member) {
        return member.isAlive() && member.tauntMagical();
    });
};

Game_Unit.prototype.certainTauntMembers = function() {
    return this.members().filter(function(member) {
        return member.isAlive() && member.tauntCertain();
    });
};

Game_Unit.prototype.tauntMembers = function() {
    var action;
    if ($gameTemp._tauntAction) {
      action = $gameTemp._tauntAction;
    } else if (BattleManager.inputtingAction()) {
      action = BattleManager.inputtingAction();
    } else {
      return Yanfly.Taunt.Game_Unit_aliveMembers.call(this);
    }
    if (!action.isTauntable()) {
      return Yanfly.Taunt.Game_Unit_aliveMembers.call(this);
    }
    if (action.isPhysical() && this.physicalTauntMembers().length > 0) {
      return this.physicalTauntMembers();
    } else if (action.isMagical() && this.magicalTauntMembers().length > 0) {
      return this.magicalTauntMembers();
    } else if (action.isCertainHit() && this.certainTauntMembers().length > 0) {
      return this.certainTauntMembers();
    }
    return Yanfly.Taunt.Game_Unit_aliveMembers.call(this);
};

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.Taunt.Game_Action_makeTargets =
    Game_Action.prototype.makeTargets;
Game_Action.prototype.makeTargets = function() {
    if (this.isValid() && this.isTauntable()) {
      $gameTemp._taunt = true;
      $gameTemp._tauntAction = this;
    }
    var value = Yanfly.Taunt.Game_Action_makeTargets.call(this);
    if (this.isValid() && this.isTauntable()) {
      $gameTemp._taunt = false;
    }
    $gameTemp._tauntAction = undefined;
    return value;
};

Game_Action.prototype.isTauntable = function() {
    if (!this.checkItemScope([1])) return false;
    if (this.item().bypassTaunt) return false;
    if (this.isPhysical() && this.subject().ignoreTauntPhysical()) return false;
    if (this.isMagical() && this.subject().ignoreTauntMagical()) return false;
    if (this.isCertainHit() && this.subject().ignoreTauntCertain()) return false;
    return true;
};

Yanfly.Taunt.Game_Action_targetsForOpponents =
		Game_Action.prototype.targetsForOpponents;
Game_Action.prototype.targetsForOpponents = function() {
    var targets = Yanfly.Taunt.Game_Action_targetsForOpponents.call(this);
		if (this.isValid() && this.isTauntable() && $gameTemp._taunt) {
			if (this.isForOne() && this._targetIndex >= 0) {
				targets = this.getTauntTarget(targets);
			}
		};
    return targets;
};

Game_Action.prototype.getTauntTarget = function(targets) {
		var unit = this.opponentsUnit();
		var target = unit.smoothTarget(this._targetIndex);
		if (this.isPhysical() && unit.physicalTauntMembers().length > 0) {
			if (!unit.physicalTauntMembers().contains(target)) {
				var group = unit.physicalTauntMembers();
				target = group[Math.floor(Math.random()*group.length)];
				targets = [target];
			}
		} else if (this.isMagical() && unit.magicalTauntMembers().length > 0) {
			if (!unit.magicalTauntMembers().contains(target)) {
				var group = unit.magicalTauntMembers();
				target = group[Math.floor(Math.random()*group.length)];
				targets = [target];
			}
		} else if (this.isCertainHit() && unit.certainTauntMembers().length > 0) {
			if (!unit.certainTauntMembers().contains(target)) {
				var group = unit.certainTauntMembers();
				target = group[Math.floor(Math.random()*group.length)];
				targets = [target];
			}
		}
		return targets;
};

//=============================================================================
// Scene_Battle
//=============================================================================

Yanfly.Taunt.Scene_Battle_selectEnemySelection =
    Scene_Battle.prototype.selectEnemySelection;
Scene_Battle.prototype.selectEnemySelection = function() {
    $gameTemp._taunt = true;
    Yanfly.Taunt.Scene_Battle_selectEnemySelection.call(this);
    $gameTemp._taunt = false;
};

//=============================================================================
// End of File
//=============================================================================
