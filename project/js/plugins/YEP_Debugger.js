//=============================================================================
// Yanfly Engine Plugins - Debugger
// YEP_Debugger.js
//=============================================================================

if (Utils.isNwjs() && Utils.isOptionValid('test')) {

var Imported = Imported || {};
Imported.YEP_Debugger = true;

var Yanfly = Yanfly || {};
Yanfly.Debug = Yanfly.Debug || {};
Yanfly.Debug.version = 2.07;

//=============================================================================
 /*:
 * @plugindesc v2.07 This is Yanfly's debugger plugin tool given to
 * faithful supporters to help you testplay your game better!
 * @author Yanfly Engine Plugins
 *
 * @param ---Startup---
 * @default
 *
 * @param Auto New Game
 * @parent ---Startup---
 * @type boolean
 * @on Auto-New Game
 * @off Normal
 * @desc Automatically start a new game upon test play.
 * ON - true     OFF - false
 * @default false
 *
 * @param Auto Show FPS
 * @parent ---Startup---
 * @type boolean
 * @on Show FPS
 * @off Hide FPS
 * @desc Automatically show FPS at the start of test play?
 * ON - true     OFF - false
 * @default false
 *
 * @param Auto Full Screen
 * @parent ---Startup---
 * @type boolean
 * @on Auto-Full Screen
 * @off Normal
 * @desc Automatically switch to full screen during test play?
 * ON - true     OFF - false
 * @default false
 *
 * @param Auto Console
 * @parent ---Startup---
 * @type boolean
 * @on Auto-Console
 * @off Normal
 * @desc Launch Console Window whenever an error occurs?
 * ON - true     OFF - false
 * @default false
 *
 * @param ---Visual---
 * @default
 *
 * @param Debug Window Tone
 * @parent ---Visual---
 * @desc This is the tone color used for debug windows.
 * @default 50, 50, 50, 0
 *
 * @param Console Messages
 * @type boolean
 * @on Display Errors
 * @off Don't Dispaly
 * @desc Display messages on the console when you're accessing the
 * debug menu? YES - true     NO - false
 * @default true
 *
 * @param ---Field---
 * @default
 *
 * @param Field Debug
 * @parent ---Field---
 * @type boolean
 * @on Field Debug
 * @off No Debug
 * @desc Enable field debug menu when clicking on events?
 * NO - false     YES - true
 * @default true
 *
 * @param Debug Menu Icon
 * @parent ---Field---
 * @type number
 * @min 0
 * @desc The icon used for the debug menu that will appear in the
 * upper right corner for the map. Use 0 to disable this.
 * @default 225
 *
 * @param ---Battle---
 * @default
 *
 * @param Battle Test TP Start
 * @parent ---Battle---
 * @desc This is the amount of TP to start test battles with.
 * 'value' is the amount of HP.
 * @default value = user.maxTp()
 *
 * @param Damage CTRL Modifier
 * @parent ---Battle---
 * @desc While holding down CTRL, alter damage like such:
 * 'value' is the damage amount. 
 * @default value *= -1
 *
 * @param Damage SHIFT Modifier
 * @parent ---Battle---
 * @desc While holding down SHIFT, alter damage like such:
 * 'value' is the damage amount.
 * @default value *= 10
 *
 * @param EXP CTRL Modifier
 * @parent ---Battle---
 * @desc While holding down CTRL, alter EXP like such:
 * 'rate' is the exp rate. 
 * @default rate *= 100
 *
 * @param EXP SHIFT Modifier
 * @parent ---Battle---
 * @desc While holding down SHIFT, alter EXP like such:
 * 'rate' is the exp rate.
 * @default rate *= 10
 *
 * @param Warning Message
 * @parent ---Battle---
 * @type boolean
 * @on Show Warnings
 * @off Hide Warnings
 * @desc Enable warning messages to be displayed in case Lunatic Mode
 * code goes wrong for HP/MP/TP. YES - true   NO - false
 * @default true
 *
 * @param Disable Variance
 * @parent ---Battle---
 * @type boolean
 * @on Enable Variance
 * @off Disable Variance
 * @desc Disable damage variance by default?
 * YES - true     NO - false
 * @default false
 *
 * @param 100% State Rate
 * @parent ---Battle---
 * @type boolean
 * @on 100% Rates
 * @off Normal Rates
 * @desc Enable 100% status proc rate by default?
 * YES - true     NO - false
 * @default false
 *
 * @param ---Spawn Options---
 * @default
 *
 * @param Spawn at Boat
 * @parent ---Spawn Options---
 * @type boolean
 * @on Add Option
 * @off Hide Option
 * @desc Add an option to the title command window to spawn
 * at the boat location. YES - true   NO - false
 * @default true
 *
 * @param Spawn at Ship
 * @parent ---Spawn Options---
 * @type boolean
 * @on Add Option
 * @off Hide Option
 * @desc Add an option to the title command window to spawn
 * at the ship location. YES - true   NO - false
 * @default true
 *
 * @param Spawn at Airship
 * @parent ---Spawn Options---
 * @type boolean
 * @on Add Option
 * @off Hide Option
 * @desc Add an option to the title command window to spawn
 * at the airship location. YES - true   NO - false
 * @default true
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This is the revamped version of the YEP Debugger to offer a larger degree of
 * flexibility in helping you testplay your games. Chances are, if you have
 * this plugin, are you most likely contributing to Yanfly's Patreon & helping
 * to support Yanfly's works for RPG Maker MV. Thank you very much as it is
 * highly appreciated for you to provide support!
 *
 * This plugin is made to help you test your game more efficiently by providing
 * extra debugging tools that don't normally come with RPG Maker MV. Note that
 * all of these features added by this plugin are disabled when the game is not
 * being played in Play Test or Battle Test mode.
 * 
 * ============================================================================
 * Features
 * ============================================================================
 *
 * The following is a list of the features that you'll find added to the
 * Debugger that are only available through Testplay.
 *
 * ----------------------------------------------------------------------------
 * F9 - Debug Menu
 * ----------------------------------------------------------------------------
 * 
 * By default, pressing the F9 key while on a map will open up a mini debug
 * menu that lets you alter switches and variables. This plugin extends the F9
 * key to almost all scenes and provides a huge variety of options. You can
 * access quick commands, alter switches and variables in a more efficient
 * manner, teleport to various maps, launch common events, enter battles of
 * your choice, modify actors and enemies, quickly apply states and buffs,
 * reach the main menu, or quickly alter the quantity of items, weapons, and/or
 * armors any time the menu is open.
 *
 * ----------------------------------------------------------------------------
 * Automatic New Game, FPS, Full Screen, and Console
 * ----------------------------------------------------------------------------
 *
 * Want to skip the title screen? You can do so by simply enabling it from the
 * plugin parameters. Every second of test-playing is important and sometimes
 * skipping straight to the map scene will save on that time.
 * 
 * Alternatively, you can save yourself a few keypresses as well by turning on
 * the FPS counter, Full Screen, and Console Window (whenever an error occurs).
 * This way, you can monitor your game closely, quickly, and efficiently.
 *
 * ----------------------------------------------------------------------------
 * Field Debug
 * ----------------------------------------------------------------------------
 *
 * Quick a few debug options have been added to the debugger that function
 * while on the map.
 *
 * If you hold down the 'control' button and left click on the map, your player
 * character will be instantly teleported to that location to save travel time.
 * This will be used mostly to bypass unnecessary areas and save more time for
 * testing your game.
 *
 * The Field Debug menu will appear when you right click on the map. Instead of
 * instantly taking you to the main menu when you right click, depending on
 * where you right click, a different set of options will appear. If you right
 * click on open ground, you are given the option to warp to that spot. If you
 * right click on an event, you are given some options to alter that event.
 *
 * The Debug Menu Icon will appear in the upper right corner of the map if you
 * have it enabled. Clicking it will prompt open a new set of quick options for
 * you to utilize to quickly debug your game and save on testing time.
 *
 * ----------------------------------------------------------------------------
 * Battle Debug
 * ----------------------------------------------------------------------------
 *
 * While in battle, pressing F9 and accessing the 'Quick' menu will allow you
 * to quickly choose whether or not to win a battle, lose a battle, or to
 * recover everything for the party.
 *
 * You can also quickly set the amount of TP to start with for the battle using
 * the plugin parameters in a formulaic manner, too. Starting from 0 TP each
 * battle test can make things rather slow. This will help speed things up.
 *
 * Other new debugging functions involve holding down 'control' or 'shift' as
 * damage calculations are made. You can alter them via a formula any way you
 * wish through the plugin parameters, but by default, holding down shift will
 * inflate the damage dealt by 10x while 'control' will change it to healing.
 * This is to quickly get through battles quickly or to shift things into favor
 * of a certain side quickly. On that note, holding down 'control' or 'shift'
 * while EXP is being gained can also alter the amount of EXP earned, too, to
 * reduce the need for grinding.
 *
 * -------------------
 * Version 2.02 Update
 * -------------------
 * There are now options to enable/disable variance for damage formulas inside
 * the Debug menu's 'Quick' menu while in battle. They will do exactly as they
 * are named. Disabling damage variance will allow you to accurately judge how
 * much damage a skill will actually do without all the
 * random variable interference.
 *
 * There are now options to enable 100% state rates or apply normal state rates
 * in the Debug menu's 'Quick' menu while in battle. Doing so will make all
 * states applied through skills using traits will have a 100% success rate,
 * removing the frustration of having to keep casting the skill over and over
 * again to test the effects of a state.
 *
 * ----------------------------------------------------------------------------
 * Spawn Options
 * ----------------------------------------------------------------------------
 *
 * A large portion of games have their own debug rooms. However, it's a bit of
 * a tedious work each time to set the starting location of the player to the
 * debug room each time and return it back. This plugin adds a new solution to
 * reduce that tedious work.
 *
 * What this plugin does is add to your title screen's command window extra
 * options that appear only in debug menu. These options are linked to where
 * you have placed your vehicles in the editor and will allow you to start a
 * new game in that vehicle's default location. If a vehicle does not have a
 * starting location, the option will not appear in the window to select.
 *
 * The purpose of this feature is to allow you to teleport to your debug room
 * quickly without the need to constantly switch the player's start location.
 * As vehicles see very little use (and when they do, their start location in
 * the game is usually changed by an event), having a vehicle as a secondary
 * anchor point makes for a nice shortcut to your debug room.
 *
 * ============================================================================
 * Special Thanks
 * ============================================================================
 *
 * I just wanted to say, thank you, to soome very special people:
 *
 * Archeia - Thank you for letting me into beta for RPG Maker MV. Always
 * keeping me updated and figuring things out together to make this the best
 * RPG Maker yet. Let's walk together towards success.
 *
 * FlyingDream - Thank you for all you've done to me. You have a very special
 * place in my heart and I'll never be able to get as far as I did without you
 * supporting me from behind like always. When it comes to support, you're
 * second to none. We had a lot of wonderful moments together that I'll never
 * ever forget for the rest of my life. Thank you.
 *
 * Rukaroa - Thank you for always staying a wonderful friend and giving me so
 * many ideas to work with. It's always a blast to work together with you.
 *
 * And to all my supporters - I'm happy you're all faithful users of mine and
 * had it not been for you believing in my work these past years, I probably
 * wouldn't even be here right now.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 2.04:
 * v2.00 - First ever v2 release!
 * v2.01 - Updated buff/debuff turns to last 5 turns minimum.
 * v2.02 - Added 'Disable Variance' and '100% State Rate' plugin parameters.
 * v2.03 - Added level changing options to 'Quick', 'Actor', and 'Enemy' menus.
 * v2.04 - Added skill learning options to 'Quick' and 'Actor' menus.
 * v2.05 - Fixed an error with item adding.
 * v2.06 - Updated for MV 1.5.0
 * v2.07 - Updated for MV 1.6.1
 *
 * Version 1.31:
 * - Last v1 release.
 *
 * Version 1.00:
 * - Finished Plugin
 * 
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.SetupParameters = function() {
  Yanfly.Max = Yanfly.Max || {};
  Yanfly.Param = Yanfly.Param || {};
  Yanfly.Icon = Yanfly.Icon || {};
  var params = PluginManager.parameters('YEP_Debugger');
  // General
  Yanfly.Param.DebugAutoNewGame = eval(String(params['Auto New Game']));
  Yanfly.Param.DebugAutoFPS = eval(String(params['Auto Show FPS']));
  Yanfly.Param.DebugAutoFS = eval(String(params['Auto Full Screen']));
  Yanfly.Param.DebugAutoConsole = eval(String(params['Auto Console']));
  // Visual
  Yanfly.Param.DebugWindowTone = String(params['Debug Window Tone']);
  Yanfly.Param.DebugWindowTone = this.Param.DebugWindowTone.split(',');
  var length = Yanfly.Param.DebugWindowTone.length;
  for (var i = 0; i < length; ++i) {
    Yanfly.Param.DebugWindowTone[i] =
      parseInt(Yanfly.Param.DebugWindowTone[i].trim());
  }
  Yanfly.Param.DebugConsoleMsg = eval(String(params['Console Messages']));
  // Field
  Yanfly.Param.DebugFieldDebug = eval(String(params['Field Debug']));
  Yanfly.Param.DebugMapIcon = Number(params['Debug Menu Icon']);
  // Battle
  Yanfly.Param.DebugTestTpStart = String(params['Battle Test TP Start']);
  Yanfly.Param.DebugModCtrl = String(params['Damage CTRL Modifier']);
  Yanfly.Param.DebugModShift = String(params['Damage SHIFT Modifier']);
  Yanfly.Param.DebugExpCtrl = String(params['EXP CTRL Modifier']);
  Yanfly.Param.DebugExpShift = String(params['EXP SHIFT Modifier']);
  Yanfly.Param.DebugWarning = eval(String(params['Warning Message']))
  Yanfly.Param.DebugVariance = eval(String(params['Disable Variance']))
  Yanfly.Param.DebugStateRate = eval(String(params['100% State Rate']))
  // Spawn Options
  Yanfly.Param.DebugSpawnBoat = eval(String(params['Spawn at Boat']));
  Yanfly.Param.DebugSpawnShip = eval(String(params['Spawn at Ship']));
  Yanfly.Param.DebugSpawnAirship = eval(String(params['Spawn at Airship']));
};
Yanfly.SetupParameters();

//=============================================================================
// DataManager
//=============================================================================

Yanfly.Debug.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.Debug.DataManager_isDatabaseLoaded.call(this)) return false;

  if (!Yanfly._loaded_YEP_Debugger) {
    Yanfly.Max = Yanfly.Max || {};
    Yanfly.Max.Actors = $dataActors.length;
    Yanfly.Max.Items = $dataItems.length;
    Yanfly.Max.Weapons = $dataWeapons.length;
    Yanfly.Max.Armors = $dataArmors.length;
    Yanfly._loaded_YEP_Debugger = true;
  }
  
  return true;
};

DataManager.loadTeleportMapData = function(mapId) {
  if (mapId > 0) {
    var filename = 'Map%1.json'.format(mapId.padZero(3));
    this.loadDataFile('$dataTeleportMap', filename);
  } else {
    this.makeEmptyMap();
  }
};

DataManager.debugStart = function(vehicle) {
  DataManager._debugStart = true;
  this.createGameObjects();
  this.selectSavefileForNewGame();
  $gameParty.setupStartingMembers();
  $gamePlayer.reserveTransfer(vehicle.startMapId,
    vehicle.startX, vehicle.startY);
  Graphics.frameCount = 0;
};

//=============================================================================
// SceneManager
//=============================================================================

Yanfly.Debug.SceneManager_onSceneCreate = SceneManager.onSceneCreate;
SceneManager.onSceneCreate = function() {
  Yanfly.Debug.SceneManager_onSceneCreate.call(this);
  if ($gameSystem) this._scene.createDebugWindows();
};

if (Yanfly.Param.DebugAutoConsole) {

Yanfly.Debug.Graphics_printError = Graphics.printError;
Graphics.printError = function(name, message) {
  var _debugWindow = require('nw.gui').Window.get().showDevTools();
  _debugWindow.moveTo(0, 0);
  window.focus();
  Yanfly.Debug.Graphics_printError.call(this, name, message);
};

}; // Yanfly.Param.DebugAutoConsole

var log = function(v) {
  var _debugWindow = require('nw.gui').Window.get().showDevTools();
  _debugWindow.moveTo(0, 0);
  console.log(v);
};

Yanfly.Debug.SceneManager_onKeyDown = SceneManager.onKeyDown;
SceneManager.onKeyDown = function(event) {
  if (!event.ctrlKey && !event.altKey && event.keyCode === 116) {
    if (Utils.isNwjs() && Utils.isOptionValid('test')) {
      var win = require('nw.gui').Window.get();
      win.closeDevTools();
    }
  }
  Yanfly.Debug.SceneManager_onKeyDown.call(this, event);
};

//=============================================================================
// BattleManager
//=============================================================================

BattleManager.closeWindowsForDebugAction = function() {
  var scene = SceneManager._scene;
  var length = scene.children.length;
  for (var i = 0; i < length; ++i) {
    var child = scene.children[i];
    if (child && child.windowskin) {
      child.deactivate();
      child.close();
    }
  }
  var length = scene._windowLayer.children.length;
  for (var i = 0; i < length; ++i) {
    var child = scene._windowLayer.children[i];
    if (child && child.windowskin) {
      child.deactivate();
      child.close();
    }
  }
  this.startTurn();
  this.update();
};

//=============================================================================
// Game_Temp
//=============================================================================

Game_Temp.prototype.isDisableDamageVariance = function() {
  if (this._debugDisableDamageVariance === undefined) {
    this._debugDisableDamageVariance = Yanfly.Param.DebugVariance;
  }
  return this._debugDisableDamageVariance;
};

Game_Temp.prototype.setDisableDamageVariance = function(value) {
  this._debugDisableDamageVariance = value;
};

Game_Temp.prototype.isPerfectStateRate = function() {
  if (this._debugPerfectStateRate === undefined) {
    this._debugPerfectStateRate = Yanfly.Param.DebugStateRate;
  }
  return this._debugPerfectStateRate;
};

Game_Temp.prototype.setPerfectStateRate = function(value) {
  this._debugPerfectStateRate = value;
};

Game_Temp.prototype.addAllSkills = function() {
  var group = $gameParty.members();
  var length = group.length;
  var skillLength = $dataSkills.length;
  while (length--) {
    var member = group.shift();
    if (member) {
      for (var i = 1; i < skillLength; ++i) {
        var skill = $dataSkills[i];
        if (skill) member.learnSkill(i);
      }
    }
  }
};

Game_Temp.prototype.addAllNamedSkills = function() {
  var group = $gameParty.members();
  var length = group.length;
  var skillLength = $dataSkills.length;
  while (length--) {
    var member = group.shift();
    if (member) {
      for (var i = 1; i < skillLength; ++i) {
        var skill = $dataSkills[i];
        if (!skill) continue;
        if (skill.name === '') continue;
        if (skill.stypeId < 1) continue;
        member.learnSkill(i);
      }
    }
  }
};

Game_Temp.prototype.removeAllSkills = function() {
  var group = $gameParty.members();
  var length = group.length;
  while (length--) {
    var member = group.shift();
    if (member) {
      member._skills = [];
    }
  }
};

//=============================================================================
// Game_Enemy
//=============================================================================

if (Imported.YEP_EnemyLevels) {

Game_Enemy.prototype.maxLevel = function() {
  return this.enemy().maxLevel;
};

} // Imported.YEP_EnemyLevels

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.Debug.Game_Action_makeDamageValue =
  Game_Action.prototype.makeDamageValue;
Game_Action.prototype.makeDamageValue = function(target, cri) {
  value = Yanfly.Debug.Game_Action_makeDamageValue.call(this, target, cri);
  if (Input.isPressed('shift')) eval(Yanfly.Param.DebugModShift);
  if (Input.isPressed('control')) eval(Yanfly.Param.DebugModCtrl);
  return value;
};

Yanfly.Debug.Game_Action_applyVariance = Game_Action.prototype.applyVariance;
Game_Action.prototype.applyVariance = function(damage, variance) {
  if ($gameTemp.isDisableDamageVariance()) variance = 0;
  return Yanfly.Debug.Game_Action_applyVariance.call(this, damage, variance);
};

Yanfly.Debug.Game_Action_itemEffectAddState =
  Game_Action.prototype.itemEffectAddState;
Game_Action.prototype.itemEffectAddState = function(target, effect) {
  if ($gameTemp.isPerfectStateRate() && effect) {
    if (effect.dataId === 0) {
      this.perfectEffectAddAttackState(target, effect);
    } else {
      this.perfectAddNormalState(target, effect);
    }
  } else {
    Yanfly.Debug.Game_Action_itemEffectAddState.call(this, target, effect);
  }
};

Game_Action.prototype.perfectEffectAddAttackState = function(target, effect) {
  this.subject().attackStates().forEach(function(stateId) {
    target.addState(stateId);
    this.makeSuccess(target);
  }.bind(this), target);
};

Game_Action.prototype.perfectAddNormalState = function(target, effect) {
  target.addState(effect.dataId);
  this.makeSuccess(target);
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

if (Yanfly.Param.DebugWarning) {

Game_BattlerBase.prototype.issueWarningNaN = function(value, type) {
  if (Yanfly.Param.DebugAutoConsole) {
    var _debugWindow = require('nw.gui').Window.get().showDevTools();
    _debugWindow.moveTo(0, 0);
  }
  console.log('---WARNING---')
  console.log('You just tried to change ' + type + ' into an illegal value: '
    + value);
  SoundManager.playBuzzer();
};

Yanfly.Debug.Game_BattlerBase_setHp = Game_BattlerBase.prototype.setHp;
Game_BattlerBase.prototype.setHp = function(hp) {
  if (isNaN(Number(hp))) return this.issueWarningNaN(hp, 'HP');
  Yanfly.Debug.Game_BattlerBase_setHp.call(this, hp);
};

Yanfly.Debug.Game_BattlerBase_setMp = Game_BattlerBase.prototype.setMp;
Game_BattlerBase.prototype.setMp = function(mp) {
  if (isNaN(Number(mp))) return this.issueWarningNaN(mp, 'MP');
  Yanfly.Debug.Game_BattlerBase_setMp.call(this, mp);
};

Yanfly.Debug.Game_BattlerBase_setTp = Game_BattlerBase.prototype.setTp;
Game_BattlerBase.prototype.setTp = function(tp) {
  if (isNaN(Number(tp))) return this.issueWarningNaN(tp, 'TP');
  Yanfly.Debug.Game_BattlerBase_setTp.call(this, tp);
};

}; // Yanfly.Param.DebugWarning

//=============================================================================
// Game_Battler
//=============================================================================

Yanfly.Debug.Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
Game_Battler.prototype.onBattleStart = function() {
  Yanfly.Debug.Game_Battler_onBattleStart.call(this);
  if (!BattleManager.isBattleTest()) return;
  var value = 0;
  var user = this;
  var target = this;
  var a = this;
  var b = this;
  var subject = this;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  eval(Yanfly.Param.DebugTestTpStart);
  this.gainTp(value);
};

//=============================================================================
// Game_Actor
//=============================================================================

Yanfly.Debug.Game_Actor_finalExpRate = Game_Actor.prototype.finalExpRate;
Game_Actor.prototype.finalExpRate = function() {
  var rate = Yanfly.Debug.Game_Actor_finalExpRate.call(this);
  if (Input.isPressed('shift')) eval(Yanfly.Param.DebugExpCtrl);
  if (Input.isPressed('control')) eval(Yanfly.Param.DebugExpShift);
  return rate;
};

//=============================================================================
// Game_Unit
//=============================================================================

Yanfly.Debug.Game_Unit_onBattleStart = Game_Unit.prototype.onBattleStart;
Game_Unit.prototype.onBattleStart = function() {
  if ($gameTemp._debugBattle) return;
  Yanfly.Debug.Game_Unit_onBattleStart.call(this);
};

Yanfly.Debug.Game_Unit_onBattleEnd = Game_Unit.prototype.onBattleEnd;
Game_Unit.prototype.onBattleEnd = function() {
  if ($gameTemp._debugBattle) return;
  Yanfly.Debug.Game_Unit_onBattleEnd.call(this);
};

//=============================================================================
// Game_Vehicle
//=============================================================================

Yanfly.Debug.Game_Vehicle_loadSystemSettings =
  Game_Vehicle.prototype.loadSystemSettings;
Game_Vehicle.prototype.loadSystemSettings = function() {
  if (DataManager._debugStart) {
    var vehicle = this.vehicle();
    this._mapId = 0;
    this.setPosition(0, 0);
    this.setImage(vehicle.characterName, vehicle.characterIndex);
  } else {
    Yanfly.Debug.Game_Vehicle_loadSystemSettings.call(this);
  }
};

//=============================================================================
// Scene_Base
//=============================================================================

Yanfly.Debug.Scene_Base_initialize = Scene_Base.prototype.initialize;
Scene_Base.prototype.initialize = function() {
  Yanfly.Debug.Scene_Base_initialize.call(this);
  this._debugActive = false;
  this._debugChildren = [];
};

Scene_Base.prototype.addDebugWindow = function(window) {
  this._debugChildren.push(window);
  this.addChild(window);
};

Scene_Base.prototype.createDebugWindows = function() {
  this._debugWindowHelp = new Window_Help();
  this._debugWindowHelp.setDebug();
  this.addDebugWindow(this._debugWindowHelp);
  this._debugWindowMenu = new Window_DebugMenu(this._debugWindowHelp);
  this.addDebugWindow(this._debugWindowMenu);
  this._debugWindowMenu.setHandler('cancel', this.debugClose.bind(this));
  this._debugWindowAction = new Window_DebugAction(this._debugWindowHelp);
  this.addDebugWindow(this._debugWindowAction);
  this._debugWindowMenu.setActionWindow(this._debugWindowAction);
  this._debugWindowAction.setHandler('cancel', this.debugActClose.bind(this));
};

Yanfly.Debug.Scene_Base_update = Scene_Base.prototype.update;
Scene_Base.prototype.update = function() {
  Yanfly.Debug.Scene_Base_update.call(this);
  if (this.isDebugCalled()) this.callDebug();
};

Scene_Base.prototype.updateDebugChildren = function() {
  this._debugChildren.forEach(function(child) {
    if (child.update) child.update();
  });
};

Yanfly.Debug.Scene_Base_updateChildren = Scene_Base.prototype.updateChildren;
Scene_Base.prototype.updateChildren = function() {
  if (this._debugActive) {
    this.updateDebugChildren();
  } else {
    Yanfly.Debug.Scene_Base_updateChildren.call(this);
  }
};

Scene_Base.prototype.isDebugCalled = function() {
  return Input.isTriggered('debug') && $gameTemp.isPlaytest() && $gameSystem;
};

Scene_Base.prototype.debugStop = function() {
  this._active = false;
  this._debugActive = true;
};

Scene_Base.prototype.debugResume = function() {
  this._active = true;
  this._debugActive = false;
};

Scene_Base.prototype.callDebug = function() {
  if (this._debugWindowHelp.isOpen()) {
    this.debugClose();
  } else {
    this.debugOpen();
  }
};

Scene_Base.prototype.debugOpen = function() {
  this.debugStop();
  this._debugWindowHelp.open();
  this._debugWindowMenu.open();
  this._debugWindowMenu.activate();
  this.onDebugOpen();
};

Scene_Base.prototype.debugMain = function() {
  this._debugWindowMenu.open();
  this._debugWindowMenu.activate();
  this._debugWindowAction.close();
  this._debugWindowAction.deactivate();
};

Scene_Base.prototype.onDebugOpen = function() {
  if (Yanfly.Param.DebugConsoleMsg) {
    console.log('--------------------------------------');
    console.log('Opening Yanfly Engine Plugins Debugger');
    console.log('--------------------------------------');
  }
  Input.keyMapper['prevEnd'] = Input.keyMapper[35];
  Input.keyMapper['prevHome'] = Input.keyMapper[36];
  Input.keyMapper[35] = 'end';
  Input.keyMapper[36] = 'home';
  if (Imported.YEP_ItemCore) $gameTemp.enableVarianceStock();
};

Scene_Base.prototype.debugClose = function() {
  this._debugWindowHelp.close();
  this._debugWindowMenu.close();
  this._debugWindowMenu.deactivate();
  this._debugWindowAction.close();
  this._debugWindowAction.deactivate();
  this.debugRefreshAllWindows();
  this.onDebugClose();
  this.debugResume();
};

Scene_Base.prototype.onDebugClose = function() {
  if (Yanfly.Param.DebugConsoleMsg) {
    console.log('--------------------------------------');
    console.log('Closing Yanfly Engine Plugins Debugger');
    console.log('--------------------------------------');
  }
  Input.keyMapper[35] = Input.keyMapper['prevEnd'];
  Input.keyMapper[36] = Input.keyMapper['prevHome'];
  Input.keyMapper['prevEnd'] = undefined;
  Input.keyMapper['prevHome'] = undefined;
  if (Imported.YEP_ItemCore) $gameTemp.disableVarianceStock();
};

Scene_Base.prototype.debugRefreshAllWindows = function() {
  var length = this.children.length;
  for (var i = 0; i < length; ++i) {
    var child = this.children[i];
    if (this.isChildValid(child)) child.refresh();
  }
  var length = this._windowLayer.children.length;
  for (var i = 0; i < length; ++i) {
    var child = this._windowLayer.children[i];
    if (this.isChildValid(child)) child.refresh();
  }
};

Scene_Base.prototype.isChildValid = function(child) {
  if (!child) return false;
  if (!child.windowskin) return false;
  if (typeof child.refresh !== 'function') return false;
  if (Imported.YEP_MessageCore) {
    if (child instanceof Window_NameBox) return false;
  }
  if (Imported.YEP_ItemSynthesis) {
    if (child instanceof Window_SynthesisIngredients) return false;
  }
  if (Imported.YEP_VictoryAftermath) {
    if (child instanceof Window_VictoryTitle) return false;
  }
  if (Imported.YEP_GabWindow) {
    if (child instanceof Window_Gab) return false; 
  }
  return true;
};

Scene_Base.prototype.debugActClose = function() {
  if (this._debugWindowAction._battler) {
    this._debugWindowAction.removeBattler();
  } else {
    this.debugMain();
  }
};

//=============================================================================
// Scene_Boot
//=============================================================================

if (Yanfly.Param.DebugAutoNewGame) {

Scene_Boot.prototype.start = function() {
  Scene_Base.prototype.start.call(this);
  SoundManager.preloadImportantSounds();
  if (DataManager.isBattleTest()) {
    DataManager.setupBattleTest();
    SceneManager.goto(Scene_Battle);
  } else if (DataManager.isEventTest()) {
    DataManager.setupEventTest();
    SceneManager.goto(Scene_Map);
  } else {
    this.newGame();
  }
  this.updateDocumentTitle();
};

Scene_Boot.prototype.newGame = function() {
  this.checkPlayerLocation();
  DataManager.setupNewGame();
  SceneManager.goto(Scene_Map);
};

}; // Yanfly.Param.DebugAutoNewGame

Yanfly.Debug.Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
  Yanfly.Debug.Scene_Boot_start.call(this);
  if (Yanfly.Param.DebugAutoFPS) Graphics._switchFPSMeter();
  if (Yanfly.Param.DebugAutoFS) Graphics._requestFullScreen();
};

//=============================================================================
// Scene_Title
//=============================================================================

Yanfly.Debug.Scene_Title_createCommandWindow =
  Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
  Yanfly.Debug.Scene_Title_createCommandWindow.call(this);
  DataManager._debugStart = false;
  this._commandWindow.setHandler('startBoat', this.debugBoat.bind(this));
  this._commandWindow.setHandler('startShip', this.debugShip.bind(this));
  this._commandWindow.setHandler('startAirship', this.debugAirship.bind(this));
};

Scene_Title.prototype.debugBoat = function() {
  DataManager.debugStart($dataSystem.boat);
  SceneManager.goto(Scene_Map);
};

Scene_Title.prototype.debugShip = function() {
  DataManager.debugStart($dataSystem.ship);
  SceneManager.goto(Scene_Map);
};

Scene_Title.prototype.debugAirship = function() {
  DataManager.debugStart($dataSystem.airship);
  SceneManager.goto(Scene_Map);
};

//=============================================================================
// Scene_Menu
//=============================================================================

Scene_Menu.prototype.commandDebug = function() {
  this.callDebug();
  this._commandWindow.activate();
};

//=============================================================================
// Scene_Map
//=============================================================================

Scene_Base.prototype.isMap = function() {
  return false;
};

Scene_Map.prototype.isMap = function() {
  return true;
};

Yanfly.Debug.Scene_Map_createDisplayObjects =
  Scene_Map.prototype.createDisplayObjects;
Scene_Map.prototype.createDisplayObjects = function() {
  Yanfly.Debug.Scene_Map_createDisplayObjects.call(this);
  Scene_Base.prototype.createDebugWindows.call(this);
};

Yanfly.Debug.Scene_Map_updateMain = Scene_Map.prototype.updateMain;
Scene_Map.prototype.updateMain = function() {
  if (this._debugActive) {
    $gameScreen.update();
  } else {
    Yanfly.Debug.Scene_Map_updateMain.call(this);
  }
};

Scene_Map.prototype.updateCallDebug = function() {
};

Scene_Map.prototype.debugOpen = function() {
  Scene_Base.prototype.debugOpen.call(this);
};

//=============================================================================
// Game_Map // From Debugger v1
//=============================================================================

Game_Map.prototype.getEventAtPos = function(x, y) {
  for (var i = 0; i < this.events().length; ++i) {
    var ev = this.events()[i];
    if (!ev) continue;
    if (ev.x === x && ev.y === y) return ev;
  }
  return null;
};

//=============================================================================
// Scene_Map // From Debugger v1
//=============================================================================

Yanfly.Debug.Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
    Yanfly.Debug.Scene_Map_createAllWindows.call(this);
    this.createFieldDebugWindow();
    this.createDebugMapIconWindow();
};

Yanfly.Debug.Scene_Map_processMapTouch = Scene_Map.prototype.processMapTouch;
Scene_Map.prototype.processMapTouch = function() {
  if (Yanfly.Param.DebugMapIcon && TouchInput.isTriggered()) {
    if (this._debugMapIconWindow &&
    this._debugMapIconWindow.isTouchedInsideFrame()) {
      $gameTemp._forcePlayerDebug = true;
      this.processFieldDebug();
      $gameTemp._forcePlayerDebug = undefined;
      return;
    }
  }
  if (Yanfly.Param.DebugFieldDebug) {
     if (this.isProcessFieldDebug()) return this.processFieldDebug();
  }
  if (this._fieldDebugWindow.isOpen()) return;
  Yanfly.Debug.Scene_Map_processMapTouch.call(this);
  if (TouchInput.isTriggered() && Input.isPressed('control')) {
    $gamePlayer.locate($gameTemp.destinationX(), $gameTemp.destinationY());
  }
};

Scene_Map.prototype.isProcessFieldDebug = function() {
    if (TouchInput.isCancelled()) return true;
    return false;
};

Scene_Map.prototype.processFieldDebug = function() {
    this._fieldDebugWindow.openness = 0;
    this._fieldDebugWindow.setup();
};

Scene_Map.prototype.closeFieldDebug = function() {
    this._fieldDebugWindow.close();
    this._fieldDebugWindow.deactivate();
};

Yanfly.Debug.Scene_Map_isMenuCalled = Scene_Map.prototype.isMenuCalled;
Scene_Map.prototype.isMenuCalled = function() {
  if (Yanfly.Param.DebugFieldDebug && TouchInput.isCancelled()) return false;
  return Yanfly.Debug.Scene_Map_isMenuCalled.call(this);
};

Scene_Map.prototype.createFieldDebugWindow = function() {
  this._fieldDebugWindow = new Window_FieldDebugCommand();
  this.addChild(this._fieldDebugWindow);
  var win = this._fieldDebugWindow
  win.setHandler('warp', this.debugWarp.bind(this));
  win.setHandler('main menu', this.debugMainMenu.bind(this));
  win.setHandler('call event', this.debugCallEvent.bind(this));
  win.setHandler('self switch', this.debugSelfSwitch.bind(this));
  win.setHandler('erase event', this.debugEraseEvent.bind(this));
  win.setHandler('menuToggle', this.debugToggleMenu.bind(this));
  win.setHandler('randomEncounter', this.debugRandomEncounter.bind(this));
  win.setHandler('encounterToggle', this.debugToggleEncounter.bind(this));
  win.setHandler('quickSave', this.debugQuickSave.bind(this));
  win.setHandler('quickLoad', this.debugQuickLoad.bind(this));
  win.setHandler('saveToggle', this.debugToggleSave.bind(this));
  win.setHandler('recoverAll', this.debugRecoverAll.bind(this));
  win.setHandler('fillTp', this.debugFillTp.bind(this));
  win.setHandler('hideDebugIcon', this.debugHideDebugIcon.bind(this));
  win.setHandler('showDebugIcon', this.debugShowDebugIcon.bind(this));
};

Scene_Map.prototype.createDebugMapIconWindow = function() {
  this._debugMapIconWindow = new Window_DebugMapIcon();
  this.addChild(this._debugMapIconWindow);
};

Scene_Map.prototype.debugWarp = function() {
  var x = $gameMap.canvasToMapX(this._fieldDebugWindow._clickedX);
  var y = $gameMap.canvasToMapY(this._fieldDebugWindow._clickedY);
  $gameTemp.setDestination(x, y);
  $gamePlayer.locate($gameTemp.destinationX(), $gameTemp.destinationY());
};

Scene_Map.prototype.debugMainMenu = function() {
  this._fieldDebugWindow.hide();
  this.callMenu();
};

Scene_Map.prototype.debugCallEvent = function() {
  var ev = this._fieldDebugWindow.getEventData();
  if (ev) ev.start();
};

Scene_Map.prototype.debugSelfSwitch = function() {
  var ev = this._fieldDebugWindow._clickedEvent;
  if (!ev) return;
  var key = [ev._mapId, ev._eventId, this._fieldDebugWindow.currentExt()];
  $gameSelfSwitches.setValue(key, !$gameSelfSwitches.value(key));
  this._fieldDebugWindow.open();
  this._fieldDebugWindow.activate();
  this._fieldDebugWindow.refresh();
};

Scene_Map.prototype.debugEraseEvent = function() {
  var ev = this._fieldDebugWindow._clickedEvent;
  if (!ev) return;
  $gameMap.eraseEvent(ev._eventId);
};

Scene_Map.prototype.debugToggleMenu = function() {
  if ($gameSystem.isMenuEnabled()) {
    $gameSystem.disableMenu();
  } else {
    $gameSystem.enableMenu();
  }
};

Scene_Map.prototype.debugRandomEncounter = function() {
  $gamePlayer._encounterCount = 0;
  this.updateEncounter();
};

Scene_Map.prototype.debugToggleEncounter = function() {
  if ($gameSystem.isEncounterEnabled()) {
    $gameSystem.disableEncounter();
  } else {
    $gameSystem.enableEncounter();
  }
};

Scene_Map.prototype.debugQuickSave = function() {
  SceneManager.push(Scene_Save);
};

Scene_Map.prototype.debugQuickLoad = function() {
  SceneManager.push(Scene_Load);
};

Scene_Map.prototype.debugToggleSave = function() {
  if ($gameSystem.isSaveEnabled()) {
    $gameSystem.disableSave();
  } else {
    $gameSystem.enableSave();
  }
};

Scene_Map.prototype.debugRecoverAll = function() {
  SoundManager.playRecovery();
  var length = $gameParty.members().length;
  for (var i = 0; i < length; ++i) {
    var member = $gameParty.members()[i];
    if (member) member.recoverAll();
  }
};

Scene_Map.prototype.debugFillTp = function() {
  SoundManager.playRecovery();
  var length = $gameParty.members().length;
  for (var i = 0; i < length; ++i) {
    var member = $gameParty.members()[i];
    if (member) member.gainTp(member.maxTp());
  }
};

Scene_Map.prototype.debugHideDebugIcon = function() {
  $gameTemp._debugHideIcon = true;
};

Scene_Map.prototype.debugShowDebugIcon = function() {
  $gameTemp._debugHideIcon = false;
};

//=============================================================================
// Window_FieldDebugCommand // From Debugger v1
//=============================================================================

function Window_FieldDebugCommand() {
    this.initialize.apply(this, arguments);
}

Window_FieldDebugCommand.prototype = Object.create(Window_Command.prototype);
Window_FieldDebugCommand.prototype.constructor = Window_FieldDebugCommand;

Window_FieldDebugCommand.prototype.initialize = function() {
  Window_Command.prototype.initialize.call(this, 0, 0);
  this.openness = 0;
  this.deactivate();
};

Window_FieldDebugCommand.prototype.windowWidth = function() {
  return this._maxWidth || 240;
};

Window_FieldDebugCommand.prototype.numVisibleRows = function() {
  return this.maxItems();
};

Window_FieldDebugCommand.prototype.itemTextAlign = function() {
  return 'center';
};

Window_FieldDebugCommand.prototype.makeCommandList = function() {
  this._maxWidth = 0;
  this.addWarpTo();
  this.addCommand('Main Menu', 'main menu');
  this.makeEventCommands();
  this.makePlayerCommands();
  if ($gameTemp._debugHideIcon) {
    var text = 'Show Debug Icon';
    this.addCommand(text, 'showDebugIcon');
  }
  this._maxWidth += this.standardPadding() * 4;
};

Window_FieldDebugCommand.prototype.makeEventCommands = function() {
  if (!this._clickedEvent) return;
  if ($gameTemp._forcePlayerDebug) return;
  this.addCommand(this._clickedEvent.event().name, 'call event');
  var key = [this._clickedEvent._mapId, this._clickedEvent._eventId, 'A'];
  var text = $gameSelfSwitches.value(key) ? ' ON' : 'OFF';
  this.addCommand('Self Switch A: ' + text, 'self switch', true, 'A');
  var key = [this._clickedEvent._mapId, this._clickedEvent._eventId, 'B'];
  var text = $gameSelfSwitches.value(key) ? ' ON' : 'OFF';
  this.addCommand('Self Switch B: ' + text, 'self switch', true, 'B');
  var key = [this._clickedEvent._mapId, this._clickedEvent._eventId, 'C'];
  var text = $gameSelfSwitches.value(key) ? ' ON' : 'OFF';
  this.addCommand('Self Switch C: ' + text, 'self switch', true, 'C');
  var key = [this._clickedEvent._mapId, this._clickedEvent._eventId, 'D'];
  var text = $gameSelfSwitches.value(key) ? ' ON' : 'OFF';
  this.addCommand('Self Switch D: ' + text, 'self switch', true, 'D');
  this.addCommand('Erase Event', 'erase event');
};

Window_FieldDebugCommand.prototype.makePlayerCommands = function() {
  var x = $gameMap.canvasToMapX(this._clickedX);
  var y = $gameMap.canvasToMapY(this._clickedY);
  if (!$gameTemp._forcePlayerDebug) {
    if (x !== $gamePlayer.x) return;
    if (y !== $gamePlayer.y) return;
  }
  // Menu Toggle
  if ($gameSystem.isMenuEnabled()) {
    var text = 'Disable Menu';
  } else {
    var text = 'Enable Menu';
  }
  this.addCommand(text, 'menuToggle');
  // Recover All
  this.addCommand('Recover All', 'recoverAll');
  this.addCommand('Fill TP', 'fillTp');
  // Random Encounter
  var text = 'Random Encounter';
  var enabled = $gamePlayer.makeEncounterTroopId();
  this.addCommand(text, 'randomEncounter', enabled);
  // Encounter Toggle
  if ($gameSystem.isEncounterEnabled()) {
    var text = 'Disable Encounters';
  } else {
    var text = 'Enable Encounters';
  }
  this.addCommand(text, 'encounterToggle');
  // Save Menu
  var text = 'Access Save Menu';
  this.addCommand(text, 'quickSave');
  // Load Menu
  var text = 'Access Load Menu';
  this.addCommand(text, 'quickLoad');
  // Save Toggle
  if ($gameSystem.isSaveEnabled()) {
    var text = 'Disable Save';
  } else {
    var text = 'Enable Save';
  }
  this.addCommand(text, 'saveToggle');
  // Corner Debug Menu
  if ($gameTemp._forcePlayerDebug) {
    var text = 'Hide Debug Icon';
    this.addCommand(text, 'hideDebugIcon');
  }
};

Window_FieldDebugCommand.prototype.addWarpTo = function() {
  if ($gameTemp._forcePlayerDebug) return;
  var x = $gameMap.canvasToMapX(this._clickedX);
  var y = $gameMap.canvasToMapY(this._clickedY);
  var text = 'Warp (X:' + x + ', Y:' + y + ')';
  this.addCommand(text, 'warp');
};

Window_FieldDebugCommand.prototype.addCommand = function(name, symbol, enabled,
ext) {
  Window_Command.prototype.addCommand.call(this, name, symbol, enabled, ext);
  if (!this._widthCalcEnabled) return;
  this._maxWidth = Math.max(this._maxWidth, this.textWidth(name));
  this._maxWidth = this._maxWidth.clamp(0, Graphics.boxWidth);
};

Window_FieldDebugCommand.prototype.setup = function() {
  SoundManager.playCursor();
  this._widthCalcEnabled = true;
  this._clickedX = TouchInput.x;
  this._clickedY = TouchInput.y;
  this.makeEventData();
  this.clearCommandList();
  this.makeCommandList();
  this.width = this.windowWidth();
  this.height = this.windowHeight();
  this.createContents();
  this.refresh();
  this.select(0);
  this.activate();
  this.open();
  this.show();
  this.updatePosition();
};

Window_FieldDebugCommand.prototype.makeEventData = function() {
  var x = $gameMap.canvasToMapX(this._clickedX);
  var y = $gameMap.canvasToMapY(this._clickedY);
  this._clickedEvent = $gameMap.getEventAtPos(x, y);
  if (this._clickedEvent) this._clickedEvent._balloonId = 1;
};

Window_FieldDebugCommand.prototype.getEventData = function() {
  return this._clickedEvent;
};

Window_FieldDebugCommand.prototype.updatePosition = function() {
  var x = TouchInput.x;
  var y = TouchInput.y;
  if ($gameTemp._forcePlayerDebug) {
    x = Graphics.boxWidth;
    y = 0;
  }
  this.x = x.clamp(0, Graphics.boxWidth - this.width);
  this.y = y.clamp(0, Graphics.boxHeight - this.height);
};

Window_FieldDebugCommand.prototype.processOk = function() {
  if (this.isCurrentItemEnabled()) this.processClose();
  Window_Selectable.prototype.processOk.call(this);
};

Window_FieldDebugCommand.prototype.processClose = function() {
  this.close();
  this.deactivate();
};

Window_FieldDebugCommand.prototype.processTouch = function() {
  if (!this.isOpenAndActive()) return;
  if (TouchInput.isTriggered() && !this.isTouchedInsideFrame()) {
    this.processClose();
  } else {
    Window_Selectable.prototype.processTouch.call(this);
  }
};

//=============================================================================
// Window_DebugMapIcon // From Debugger v1
//=============================================================================

function Window_DebugMapIcon() {
    this.initialize.apply(this, arguments);
}

Window_DebugMapIcon.prototype = Object.create(Window_Base.prototype);
Window_DebugMapIcon.prototype.constructor = Window_DebugMapIcon;

Window_DebugMapIcon.prototype.initialize = function() {
  var ww = Window_Base._iconWidth + this.standardPadding() * 2;
  var wh = Window_Base._iconHeight + this.standardPadding() * 2;
  var wx = Graphics.boxWidth - ww + this.standardPadding() / 2;
  var wy = 0 - this.standardPadding() / 2;
  Window_Base.prototype.initialize.call(this, wx, wy, ww, wh);
  this.refresh();
  this.opacity = 0;
};

Window_DebugMapIcon.prototype.refresh = function() {
  this.contents.clear();
  this.drawIcon(Yanfly.Param.DebugMapIcon, 2, 2);
};

Window_DebugMapIcon.prototype.update = function() {
  Window_Base.prototype.update.call(this);
  this.visible = !$gameTemp._debugHideIcon;
};

Window_DebugMapIcon.prototype.isTouchedInsideFrame = function() {
  if ($gameTemp._debugHideIcon) return false;
  var x = this.canvasToLocalX(TouchInput.x);
  var y = this.canvasToLocalY(TouchInput.y);
  return x >= 0 && y >= 0 && x < this.width && y < this.height;
};

//=============================================================================
// Scene_MapTeleport
//=============================================================================

function Scene_MapTeleport() {
    this.initialize.apply(this, arguments);
}

Scene_MapTeleport.prototype = Object.create(Scene_Map.prototype);
Scene_MapTeleport.prototype.constructor = Scene_MapTeleport;

Scene_MapTeleport.prototype.createDisplayObjects = function() {
  Scene_Map.prototype.createDisplayObjects.call(this);
  this.relocatePlayerToCenter();
  this.createRegionDisplayWindow();
  this.createCoordinatesWindow();
};

Scene_MapTeleport.prototype.createRegionDisplayWindow = function() {
  this._regionDisplayWindow = new Window_DebugRegionDisplay();
  this.addChild(this._regionDisplayWindow);
};

Scene_MapTeleport.prototype.createCoordinatesWindow = function() {
  this._coordinatesWindow = new Window_DebugCoordinates();
  this.addChild(this._coordinatesWindow);
};

Scene_MapTeleport.prototype.relocatePlayerToCenter = function() {
  var x = Math.floor($dataMap.width / 2);
  var y = Math.floor($dataMap.height / 2);
  $gamePlayer.locate(x, y);
};

Scene_MapTeleport.prototype.update = function() {
  Scene_Base.prototype.update.call(this);
  this.updateTouchInputControls();
  this.updateKeyInputControls();
};

Scene_MapTeleport.prototype.updateTouchInputControls = function() {
  if (!TouchInput.isTriggered()) return;
  var x = $gameMap.canvasToMapX(TouchInput.x);
  var y = $gameMap.canvasToMapY(TouchInput.y);
  if (x === $gamePlayer.x && y === $gamePlayer.y) {
    this.confirmAcceptLocation()
  } else {
    $gamePlayer.locate(x, y);
  }
};

Scene_MapTeleport.prototype.updateKeyInputControls = function() {
  if (Input.isRepeated('down')) this.updateLocation(0, 1);
  if (Input.isRepeated('left')) this.updateLocation(-1, 0);
  if (Input.isRepeated('right')) this.updateLocation(1, 0);
  if (Input.isRepeated('up')) this.updateLocation(0, -1);
  if (Input.isTriggered('ok')) this.confirmAcceptLocation();
  if (Input.isTriggered('cancel')) this.cancelLocation();
};

Scene_MapTeleport.prototype.updateLocation = function(x, y) {
  var dx = ($gamePlayer.x + x).clamp(0, $dataMap.width - 1);
  var dy = ($gamePlayer.y + y).clamp(0, $dataMap.height - 1);
  $gamePlayer.locate(dx, dy);
};

Scene_MapTeleport.prototype.confirmAcceptLocation = function() {
  SoundManager.playOk();
  SceneManager.push(Scene_Map);
};

Scene_MapTeleport.prototype.cancelLocation = function() {
  SoundManager.playCancel();
  var x = $gameTemp._preDebugTeleportX;
  var y = $gameTemp._preDebugTeleportY;
  var mapId = $gameTemp._preDebugTeleportMap;
  $gamePlayer.reserveTransfer(mapId, x, y, 2, 0);
  SceneManager.push(Scene_Map);
};

Scene_MapTeleport.prototype.debugOpen = function() {
};

Scene_MapTeleport.prototype.isMap = function() {
  return false;
};

//=============================================================================
// Window
//=============================================================================

Yanfly.Debug.Window_initialize = Window.prototype.initialize;
Window.prototype.initialize = function() {
  Yanfly.Debug.Window_initialize.call(this);
  this._isDebugWindow = false;
};

Window.prototype.setDebug = function() {
  this._isDebugWindow = true;
  this.opacity = 0;
  this.backOpacity = 0;
  this.contentsOpacity = 0;
  this.openness = 255;
};

Window.prototype.isDebug = function() {
  return this._isDebugWindow;
};

Yanfly.Debug.Window_isOpen = Window.prototype.isOpen;
Window.prototype.isOpen = function() {
  if (this.isDebug()) return this.opacity >= 255;
  return Yanfly.Debug.Window_isOpen.call(this);
};

Yanfly.Debug.Window_isClosed = Window.prototype.isClosed;
Window.prototype.isClosed = function() {
  if (this.isDebug()) return this.opacity <= 0;
  return Yanfly.Debug.Window_isClosed.call(this);
};

//=============================================================================
// Window_Base
//=============================================================================

Yanfly.Debug.Window_Base_updateOpen = Window_Base.prototype.updateOpen;
Window_Base.prototype.updateOpen = function() {
  if (this.isDebug() && this._opening) {
    this.opacity += 32;
    this.backOpacity += 24;
    this.contentsOpacity += 32;
    if (this.isOpen()) this._opening = false;
  } else {
    Yanfly.Debug.Window_Base_updateOpen.call(this);
  }
};

Yanfly.Debug.Window_Base_updateClose = Window_Base.prototype.updateClose;
Window_Base.prototype.updateClose = function() {
  if (this.isDebug() && this._closing) {
    this.opacity -= 32;
    this.backOpacity -= 24;
    this.contentsOpacity -= 32;
    if (this.isClosed()) this._closing = false;
  } else {
    Yanfly.Debug.Window_Base_updateClose.call(this);
  }
};

Yanfly.Debug.Window_Base_updateTone = Window_Base.prototype.updateTone;
Window_Base.prototype.updateTone = function() {
  if (this.isDebug()) {
    var tone = Yanfly.Param.DebugWindowTone;
    this.setTone(tone[0], tone[1], tone[2]);
  } else {
    Yanfly.Debug.Window_Base_updateTone.call(this);
  }
};

//=============================================================================
// Window_TitleCommand
//=============================================================================

Yanfly.Debug.Window_TitleCommand_makeCommandList =
  Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
  Yanfly.Debug.Window_TitleCommand_makeCommandList.call(this);
  this.addDebugCommands();
};

Window_TitleCommand.prototype.addDebugCommands = function() {
  if (Yanfly.Param.DebugSpawnBoat && $dataSystem.boat.startMapId > 0) {
    this.addCommand('Start:Boat', 'startBoat');
  }
  if (Yanfly.Param.DebugSpawnShip && $dataSystem.ship.startMapId > 0) {
    this.addCommand('Start:Ship', 'startShip');
  }
  if (Yanfly.Param.DebugSpawnAirship && $dataSystem.airship.startMapId > 0) {
    this.addCommand('Start:Airship', 'startAirship');
  }
};

//=============================================================================
// Window_DebugCoordinates
//=============================================================================

function Window_DebugCoordinates() {
  this.initialize.apply(this, arguments);
}

Window_DebugCoordinates.prototype = Object.create(Window_Base.prototype);
Window_DebugCoordinates.prototype.constructor = Window_DebugCoordinates;

Window_DebugCoordinates.prototype.initialize = function() {
  var width = Graphics.boxWidth;
  var height = this.fittingHeight(2);
  Window_Base.prototype.initialize.call(this, 0, 0, width, height);
  this._opacityCounter = 60;
  this._x = 0;
  this._y = 0;
};

Window_DebugCoordinates.prototype.refresh = function() {
  this.contents.clear();
  this._x = $gamePlayer.x;
  this._y = $gamePlayer.y;
  SoundManager.playCursor();
  this._opacityCounter = 60;
  this.opacity = 255;
  this.contentsOpacity = 255;
  var text = $dataMapInfos[$gameMap.mapId()].name;
  this.drawText(text, 0, 0, this.contents.width, 'center');
  text = this.getCoordinates();
  this.drawText(text, 0, this.lineHeight(), this.contents.width, 'center');
};

Window_DebugCoordinates.prototype.getCoordinates = function() {
  var text = 'X: ' + this._x;
  text += ', Y: ' + this._y;
  return text;
};

Window_DebugCoordinates.prototype.update = function() {
  Window_Base.prototype.update.call(this);
  this.updateOpacity();
  if (this._x !== $gamePlayer.x) {
    this.refresh();
  } else if (this._y !== $gamePlayer.y) {
    this.refresh();
  }
};

Window_DebugCoordinates.prototype.updateOpacity = function() {
  if (--this._opacityCounter < 0) {
    this.opacity -= 2;
    this.contentsOpacity -= 2;
  }
};

//=============================================================================
// Window_DebugRegionDisplay
//=============================================================================

function Window_DebugRegionDisplay() {
  this.initialize.apply(this, arguments);
}

Window_DebugRegionDisplay.prototype = Object.create(Window_Base.prototype);
Window_DebugRegionDisplay.prototype.constructor = Window_DebugRegionDisplay;

Window_DebugRegionDisplay.prototype.initialize = function() {
  var width = $gameMap.width() * $gameMap.tileWidth();
  var height = $gameMap.height() * $gameMap.tileHeight();
  width += this.standardPadding() * 2;
  height += this.standardPadding() * 2;
  var offset = this.standardPadding() * -1;
  Window_Base.prototype.initialize.call(this, -width, -height, width, height);
  this.x = 0;
  this.y = 0;
  this.opacity = 0;
  this.contentsOpacity = 128
  this._opacityCounter = 60;
  this._x = 0;
  this._y = 0;
  this.refresh();
};

Window_DebugRegionDisplay.prototype.update = function() {
  Window_Base.prototype.update.call(this);
  this.updateOpacity();
  if (this._x !== $gamePlayer.x) {
    this.updatePosition();
  } else if (this._y !== $gamePlayer.y) {
    this.updatePosition();
  }
};

Window_DebugRegionDisplay.prototype.updateOpacity = function() {
  if (--this._opacityCounter < 0) {
    this.contentsOpacity -= 1;
  }
};

Window_DebugRegionDisplay.prototype.updatePosition = function() {
  this.contentsOpacity = 128;
  this._opacityCounter = 60;
  this._x = $gamePlayer.x;
  this._y = $gamePlayer.y;
  var offset = this.standardPadding();
  this.x = -1 * ($gameMap.displayX() * $gameMap.tileWidth()) - offset;
  this.y = -1 * ($gameMap.displayY() * $gameMap.tileHeight()) - offset;
};

Window_DebugRegionDisplay.prototype.refresh = function() {
  this.contents.clear();
  for (var x = 0; x < $gameMap.width(); ++x) {
    for (var y = 0; y < $gameMap.height(); ++y) {
      if ($gameMap.regionId(x, y) > 0) this.drawRegion(x, y);
    }
  }
};

Window_DebugRegionDisplay.prototype.drawRegion = function(x, y) {
  var regionId = $gameMap.regionId(x, y);
  var rect = this.regionRect(x, y);
  this.drawRegionColor(regionId, rect);
  this.contents.drawText(regionId, rect.x, rect.y, rect.width, rect.height,
    'center');
};

Window_DebugRegionDisplay.prototype.regionRect = function(dx, dy) {
  return {
    x: dx * $gameMap.tileWidth(),
    y: dy * $gameMap.tileHeight(),
    width: $gameMap.tileWidth(),
    height: $gameMap.tileHeight()
  }
};

Window_DebugRegionDisplay.prototype.drawRegionColor = function(id, rect) {
  var color = '#ed145b';
  switch (id % 12) {
  case 0:
    color = '#ed145b';
    break;
  case 1:
    color = '#ed1c24';
    break;
  case 2:
    color = '#f7941d';
    break;
  case 3:
    color = '#fff200';
    break;
  case 4:
    color = '#a3d39c';
    break;
  case 5:
    color = '#00a651';
    break;
  case 6:
    color = '#00a99d';
    break;
  case 7:
    color = '#00bff3';
    break;
  case 8:
    color = '#0072bc';
    break;
  case 9:
    color = '#0054a6';
    break;
  case 10:
    color = '#a864a8';
    break;
  case 11:
    color = '#f06eaa';
    break;
  }
  this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color);
};

//=============================================================================
// Window_DebugCommand
//=============================================================================

function Window_DebugCommand() {
  this.initialize.apply(this, arguments);
};

Window_DebugCommand.prototype = Object.create(Window_Command.prototype);
Window_DebugCommand.prototype.constructor = Window_DebugCommand;

Window_DebugCommand.prototype.initialize = function(x, y, width, height) {
  this._windowWidth = width;
  this._windowHeight = height;
  Window_Command.prototype.initialize.call(this, x, y);
  this.setDebug();
  this.deactivate();
  this.opacity = 0;
  this.backOpacity = 0;
  this.contentsOpacity = 0;
};

Window_DebugCommand.prototype.windowWidth = function() {
  return this._windowWidth;
};

Window_DebugCommand.prototype.windowHeight = function() {
  return this._windowHeight;
};

Window_DebugCommand.prototype.addEmptyCommand = function() {
  this.addCommand('', 'none', false);
};

Window_DebugCommand.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height + this.lineHeight());
};

Window_DebugCommand.prototype.drawItem = function(index) {
  var rect = this.itemRectForText(index);
  var align = this.itemTextAlign();
  this.resetTextColor();
  this.changePaintOpacity(this.isCommandEnabled(index));
  var text = this.commandName(index);
  if (text.match('<CENTER>')) {
    text = text.replace('<CENTER>', '');
    var tw = this.textWidthEx(text);
    rect.x += (rect.width - tw) / 2;
  }
  this.drawTextEx(text, rect.x, rect.y);
};

Window_DebugCommand.prototype.processCursorMove = function() {
  if (this.isCursorMovable()) {
    var lastIndex = this.index();
    if (Input.isRepeated('down')) {
      this.cursorDown(Input.isTriggered('down'));
    }
    if (Input.isRepeated('up')) {
      this.cursorUp(Input.isTriggered('up'));
    }
    if (Input.isRepeated('right')) {
      this.cursorRight(Input.isTriggered('right'));
    }
    if (Input.isRepeated('left')) {
     this.cursorLeft(Input.isTriggered('left'));
    }
    if (!this.isHandled('pagedown') && Input.isRepeated('pagedown')) {
      this.cursorPagedown();
    }
    if (!this.isHandled('end') && Input.isRepeated('end')) {
      this.select(this.maxItems() - 1);
    };
    if (!this.isHandled('pageup') && Input.isRepeated('pageup')) {
      this.cursorPageup();
    }
    if (!this.isHandled('end') && Input.isRepeated('home')) {
      this.select(0);
    };
    if (this.index() !== lastIndex) {
      SoundManager.playCursor();
    }
  }
};

Window_DebugCommand.prototype.updateDebugHelp = function(symbol) {
  if (this._helpWindow) {
    var text = '';
    switch (symbol) {
    case 'actors':
      text = 'Modify the actors for your game.';
      break;
    case 'armors':
      text = 'Modify armor quantities.';
      break;
    case 'battle':
      text = 'Enter a battle of your choice.';
      break;
    case 'buffs':
      text = 'Apply buffs to actors and/or enemies.';
      break;
    case 'enemies':
      text = 'Modify the current set of enemies.';
      break;
    case 'events':
      text = 'Play a common event of your choice.';
      break;
    case 'exit':
      text = 'Exit the debug menu.'
      break;
    case 'items':
      text = 'Modify item quantities.';
      break;
    case 'menu':
      text = 'Access the main menu.'
      break;
    case 'quick':
      text = 'A set of quick debug actions.';
      break;
    case 'states':
      text = 'Apply states to actors and/or enemies.';
      break;
    case 'switch':
      text = 'Lets you manually adjust switches.';
      break;
    case 'teleport':
      text = 'Quickly teleport to a map you like.';
      break;
    case 'variable':
      text = 'Lets you manually adjust variables.';
      break;
    case 'weapons':
      text = 'Modify weapon quantities.';
      break;
    }
    this._helpWindow.setText(text)
  }
};

//=============================================================================
// Window_DebugMenu
//=============================================================================

function Window_DebugMenu() {
  this.initialize.apply(this, arguments);
};

Window_DebugMenu.prototype = Object.create(Window_DebugCommand.prototype);
Window_DebugMenu.prototype.constructor = Window_DebugMenu;

Window_DebugMenu.prototype.initialize = function(helpWindow) {
  var x = 0;
  var y = helpWindow.height;
  var width = Graphics.boxWidth;
  var height = Graphics.boxHeight - helpWindow.height;
  Window_DebugCommand.prototype.initialize.call(this, x, y, width, height);
  this.setHelpWindow(helpWindow);
};

Window_DebugMenu.prototype.setActionWindow = function(win) {
  this._actionWindow = win;
};

Window_DebugMenu.prototype.maxCols = function() {
  return 3;
};

Window_DebugMenu.prototype.spacing = function() {
    return 0;
};

Window_DebugMenu.prototype.itemHeight = function() {
  if (this._itemHeight) return this._itemHeight;
  this._itemHeight = Math.floor(this.contents.height / 5)
  return this._itemHeight;
};

Window_DebugMenu.prototype.makeCommandList = function() {
  // Row 1
  this.addCommand('Quick', 'quick', this.isEnabled('quick'));
  this.addCommand('Battle', 'battle', this.isEnabled('battle'));
  this.addCommand('Main Menu', 'menu', this.isEnabled('menu'));  
  // Row 2
  this.addCommand('Switches', 'switch', this.isEnabled('switch'));
  this.addCommand('Actors', 'actors', this.isEnabled('actors'));
  this.addCommand('Items', 'items', this.isEnabled('items'));
  // Row 3
  this.addCommand('Variables', 'variable', this.isEnabled('variable'));
  this.addCommand('Enemies', 'enemies', this.isEnabled('enemies'));
  this.addCommand('Weapons', 'weapons', this.isEnabled('weapons'));
  // Row 4
  this.addCommand('Teleport', 'teleport', this.isEnabled('teleport'));
  this.addCommand('States', 'states', this.isEnabled('states'));
  this.addCommand('Armors', 'armors', this.isEnabled('armors'));
  // Row 5
  this.addCommand('Common Event', 'events', this.isEnabled('events'));
  this.addCommand('Buffs', 'buffs', this.isEnabled('buffs'));
  this.addCommand('Exit', 'cancel', this.isEnabled('exit'));
};

Window_DebugMenu.prototype.isEnabled = function(symbol) {
  if (symbol === 'exit') return true;
  if (SceneManager._scene instanceof Scene_Title) return false;
  if (SceneManager._scene instanceof Scene_File) return false;
  if (SceneManager._scene instanceof Scene_Options) return false;
  if (SceneManager._scene instanceof Scene_GameEnd) return false;
  switch (symbol) {
  case 'battle':
    if (SceneManager._scene instanceof Scene_Battle) return false;
    return true;
    break;
  case 'menu':
    if (SceneManager._scene instanceof Scene_Map) return true;
    break;
  case 'teleport':
    return !DataManager.isBattleTest();
    break;
  case 'enemies':
    return (SceneManager._scene instanceof Scene_Battle);
    break;
  default:
    return true;
  }
  return false;
};

Window_DebugMenu.prototype.drawItem = function(index) {
  var rect = this.itemRectForText(index);
  var align = 'center';
  this.resetTextColor();
  this.changePaintOpacity(this.isCommandEnabled(index));
  var y = rect.y + Math.floor((rect.height - this.lineHeight()) / 2);
  this.drawText(this.commandName(index), rect.x, y, rect.width, align);
};

Window_DebugMenu.prototype.updateHelp = function() {
  this.updateDebugHelp(this.currentSymbol());
};

Window_DebugMenu.prototype.isHandled = function(symbol) {
  return true;
};

Window_DebugMenu.prototype.callHandler = function(symbol) {
  switch (symbol) {
  case 'cancel':
    Window_DebugCommand.prototype.callHandler.call(this, symbol);
    break;
  case 'menu':
    SceneManager._scene.debugClose();
    SceneManager.push(Scene_Menu);
    Window_MenuCommand.initCommandPosition();
    break;
  case 'pagedown':
    this.activate();
    this.selectSymbol('cancel');
    break;
  case 'pageup':
    this.activate();
    this.selectSymbol('quick');
    break;
  default:
    this.activateActionWindow(symbol);
    break;
  }
};

Window_DebugMenu.prototype.activateActionWindow = function(symbol) {
  this.deactivate();
  this.close();
  this._actionWindow.setSymbol(symbol);
  this._actionWindow.activate();
  this._actionWindow.open();
};

Window_DebugMenu.prototype.cursorDown = function(wrap) {
  this._index += this.maxCols();
  if (this._index >= 15) this._index -= 15;
  this.select(this._index);
};

Window_DebugMenu.prototype.cursorUp = function(wrap) {
  this._index -= this.maxCols();
  if (this._index < 0) this._index += 15;
  this.select(this._index);
};

Window_DebugMenu.prototype.cursorRight = function(wrap) {
  if (this._index % 3 < 2) {
    this._index++;
  } else {
    this._index -= 2;
  }
  this.select(this._index);
};

Window_DebugMenu.prototype.cursorLeft = function(wrap) {
  if (this._index % 3 > 0) {
    this._index--;
  } else {
    this._index += 2;
  }
  this.select(this._index);
};

//=============================================================================
// Window_DebugAction
//=============================================================================

function Window_DebugAction() {
  this.initialize.apply(this, arguments);
};

Window_DebugAction.prototype = Object.create(Window_DebugCommand.prototype);
Window_DebugAction.prototype.constructor = Window_DebugAction;

Window_DebugAction.prototype.initialize = function(helpWindow) {
  var x = 0;
  var y = helpWindow.height;
  var width = Graphics.boxWidth;
  var height = Graphics.boxHeight - helpWindow.height;
  this._symbol = 'none';
  Window_DebugCommand.prototype.initialize.call(this, x, y, width, height);
  this.setHelpWindow(helpWindow);
};

Window_DebugAction.prototype.maxCols = function() {
  if (this._battler) {
    switch (this._battlerType) {
    case 'main':
      return 1;
      break;
    default:
      return 1;
      break;
    }
  }
  switch (this._symbol) {
  case 'quick':
  case 'switch':
  case 'battle':
    return 3;
    break;
  case 'variable':
  case 'items':
  case 'weapons':
  case 'armors':
    return 7;
    break;
  case 'actors':
  case 'enemies':
  case 'states':
  case 'buffs':
    return 2;
    break;
  };
  return 1;
};

Window_DebugAction.prototype.spacing = function() {
  return 0;
};

Window_DebugAction.prototype.playOkSound = function() {
};

Window_DebugAction.prototype.itemHeight = function() {
  return this.lineHeight();
};

Window_DebugAction.prototype.itemRect = function(index) {
  var rect = Window_Selectable.prototype.itemRect.call(this, index);
  if (this._miniWidth === undefined) {
    this._miniWidth = Math.ceil(this.textWidth('+100+'));
  }
  if (this._cwidth === undefined) {
    this._cwidth = this.contents.width;
  }
  var miniWidth = this._miniWidth;
  switch (this._symbol) {
  case 'switch':
  case 'battle':
    if (index % 3 === 0) {
      rect.width = Math.floor(this._cwidth / 2);
    } else if (index % 3 === 1) {
      rect.width = Math.floor(this._cwidth / 4);
      rect.x = Math.floor(this._cwidth * 2 / 4);
    } else if (index % 3 === 2) {
      rect.width = Math.floor(this._cwidth / 4);
      rect.x = Math.floor(this._cwidth * 3 / 4);
    }
    break;
  case 'variable':
  case 'items':
  case 'weapons':
  case 'armors':
    if (index % 7 === 0 || index % 7 === 1 || index % 7 === 2) {
      rect.width = miniWidth;
      rect.x = index % 7 * rect.width;
    } else if (index % 7 === 4 || index % 7 === 5 || index % 7 === 6) {
      rect.width = miniWidth;
      rect.x = this._cwidth - (7 - index % 7) * rect.width;
    } else if (index % 7 === 3) {
      rect.width = this._cwidth - miniWidth * 6;
      rect.x = miniWidth * 3;
    }
    break;
  };
  return rect;
};

Window_DebugAction.prototype.setSymbol = function(symbol) {
  this.resetScroll();
  this._symbol = symbol;
  this._cachedKeyConfig = JsonEx.makeDeepCopy(Input.keyMapper);
  this.setupVariableKeyboard();
  switch (symbol) {
  case 'variable':
  case 'items':
  case 'weapons':
  case 'armors':
    this.clearCachedItemList();
    this.select(3);
    break;
  case 'actors':
  case 'enemies':
  case 'states':
  case 'buffs':
    this.select(2);
    break;
  default:
    this.select(0);
    break;
  }
  this.refresh();
};

Window_DebugAction.prototype.clearCachedItemList = function() {
  this._cachedItems = undefined;
  this._cachedWeapons = undefined;
  this._cachedArmors = undefined;
};

Window_DebugAction.prototype.close = function() {
  Window_DebugCommand.prototype.close.call(this);
  if (this._cachedKeyConfig) {
    Input.keyMapper = this._cachedKeyConfig;
    this._cachedKeyConfig = undefined;
  }
};

Window_DebugAction.prototype.setupVariableKeyboard = function() {
  Input.keyMapper[8] = 'backspace';
  Input.keyMapper[46] = 'delete';
  Input.keyMapper[48] = '0';  Input.keyMapper[96]  = '0';
  Input.keyMapper[49] = '1';  Input.keyMapper[97]  = '1';
  Input.keyMapper[50] = '2';  Input.keyMapper[98]  = '2';
  Input.keyMapper[51] = '3';  Input.keyMapper[99]  = '3';
  Input.keyMapper[52] = '4';  Input.keyMapper[100] = '4';
  Input.keyMapper[53] = '5';  Input.keyMapper[101] = '5';
  Input.keyMapper[54] = '6';  Input.keyMapper[102] = '6';
  Input.keyMapper[55] = '7';  Input.keyMapper[103] = '7';
  Input.keyMapper[56] = '8';  Input.keyMapper[104] = '8';
  Input.keyMapper[57] = '9';  Input.keyMapper[105] = '9';
  Input.keyMapper[107] = '+'; Input.keyMapper[187] = '+';
  Input.keyMapper[109] = '-'; Input.keyMapper[189] = '-';
  Input.keyMapper[192] = 'tilde';
};

Window_DebugAction.prototype.makeCommandList = function() {
  if (this._battler) return this.makeBattlerCommandList();
  switch (this._symbol) {
  case 'quick':
    this.makeQuickList();
    break;
  case 'switch':
    this.makeSwitchList();
    break;
  case 'variable':
    this.makeVariableList();
    break;
  case 'teleport':
    this.makeTeleportList();
    break;
  case 'events':
    this.makeCommonEventList();
    break;
  case 'battle':
    this.makeBattleList();
    break;
  case 'actors':
    this.makeActorList();
    break;
  case 'enemies':
    this.makeEnemyList();
    break;
  case 'states':
  case 'buffs':
    this.makeBattlerList();
    break;
  case 'items':
    this.makeItemList();
    break;
  case 'weapons':
    this.makeWeaponList();
    break;
  case 'armors':
    this.makeArmorList();
    break;
  }
};

Window_DebugAction.prototype.makeBattlerCommandList = function() {
  switch (this._battlerType) {
  case 'main':
    this.makeBattlerMainList();
    break;
  case 'states':
    this.makeBattlerStatesList();
    break;
  case 'buffs':
    this.makeBattlerBuffsList();
    break;
  }
};

Window_DebugAction.prototype.addFillerCommands = function() {
  while (this._list.length % this.maxCols() !== 0) {
    this.addCommand('', 'nothing');
  }
};

Window_DebugAction.prototype.addFillerLineBreak = function() {
  this.addFillerCommands();
  this.addCommand('', 'nothing');
  this.addFillerCommands();
};

Window_DebugAction.prototype.makeQuickList = function() {
  var text = '';
  if ($gameParty.inBattle()) {
    // 1st Row
    this.addCommand('\\i[32]Quick Win', 'quickWin');
    this.addCommand('\\i[1]Quick Lose', 'quickLose');
    this.addCommand('\\i[72]Recover All', 'quickRecoverAll');
    this.addCommand('\\i[78]Disable Variance', 'quickDisableVariance');
    this.addCommand('\\i[78]Enable Variance', 'quickEnableVariance');
    this.addCommand('\\i[78]Toggle Variance', 'quickToggleVariance');
    this.addCommand('\\i[18]Normal State Rate', 'quickDisablePerfectStateRate');
    this.addCommand('\\i[18]100% State Rate', 'quickEnablePerfectStateRate');
    this.addCommand('\\i[18]Toggle State Rate', 'quickToggleStateRate');
    this.addFillerLineBreak();
  }
  // Skill Resources
  text = 'Refill ' + TextManager.hp;
  text = '\\i[' + (Yanfly.Icon.Hp || 0) + ']' + text;
  this.addCommand(text, 'quickRefillHp');
  text = 'Refill ' + TextManager.mp;
  text = '\\i[' + (Yanfly.Icon.Mp || 0) + ']' + text;
  this.addCommand(text, 'quickRefillMp');
  text = 'Refill ' + TextManager.tp;
  text = '\\i[' + (Yanfly.Icon.Tp || 0) + ']' + text;
  this.addCommand(text, 'quickRefillTp');
  this.addCommand('\\i[2]Clear States', 'quickClearStates');
  if (Imported.YEP_X_LimitedSkillUses) {
    text = 'Refill Uses';
    text = '\\i[' + (Yanfly.Icon.LimitedUse || 0) + ']' + text;
    this.addCommand(text, 'quickRefillUses');
  }
  if (Imported.YEP_X_SkillCooldowns) {
    text = 'Reset Cooldowns';
    text = '\\i[' + (Yanfly.Icon.Cooldown || 0) + ']' + text;
    this.addCommand(text, 'quickResetCooldowns');
  }
  this.addFillerLineBreak();
  // Gold
  var icon = Yanfly.Icon.Gold || 0;
  text = Yanfly.Util.toGroup($gameParty.gold());
  this.addCommand(text, 'currentGold');
  text = '\\i[' + icon + ']Current ' + TextManager.currencyUnit;
  this.addCommand(text, 'nothing');
  text = '\\i[' + icon + ']Clear ' + TextManager.currencyUnit;
  this.addCommand(text, 'quickClearGold');
  text = '\\i[' + icon + ']' + '-1,000';
  this.addCommand(text, 'quickGold-1000');
  text = '\\i[' + icon + ']' + '=1,000';
  this.addCommand(text, 'quickGold=1000');
  text = '\\i[' + icon + ']' + '+1,000';
  this.addCommand(text, 'quickGold+1000');
  text = '\\i[' + icon + ']' + '-1,000,000';
  this.addCommand(text, 'quickGold-1000000');
  text = '\\i[' + icon + ']' + '=1,000,000';
  this.addCommand(text, 'quickGold=1000000');
  text = '\\i[' + icon + ']' + '+1,000,000';
  this.addCommand(text, 'quickGold+1000000');
  this.addFillerLineBreak();
  // Items
  var icon = $dataItems[1].iconIndex;
  text = '\\i[' + icon + ']All Items +1';
  this.addCommand(text, 'quickItems+1');
  text = '\\i[' + icon + ']All Items +10';
  this.addCommand(text, 'quickItems+10');
  text = '\\i[' + icon + ']All Items +MAX';
  this.addCommand(text, 'quickItems+MAX');
  // Weapons
  var icon = $dataWeapons[1].iconIndex;
  text = '\\i[' + icon + ']All Weapons +1';
  this.addCommand(text, 'quickWeapons+1');
  text = '\\i[' + icon + ']All Weapons +10';
  this.addCommand(text, 'quickWeapons+10');
  text = '\\i[' + icon + ']All Weapons +MAX';
  this.addCommand(text, 'quickWeapons+MAX');
  // Armors
  var icon = $dataArmors[1].iconIndex;
  text = '\\i[' + icon + ']All Armors +1';
  this.addCommand(text, 'quickArmors+1');
  text = '\\i[' + icon + ']All Armors +10';
  this.addCommand(text, 'quickArmors+10');
  text = '\\i[' + icon + ']All Armors +MAX';
  this.addCommand(text, 'quickArmors+MAX');
  // Levels
  this.addFillerLineBreak();
  var icon = 32;
  text = '\\i[' + icon + ']Party Level +1';
  this.addCommand(text, 'quickPartyLevel+1');
  text = '\\i[' + icon + ']Party Level +10';
  this.addCommand(text, 'quickPartyLevel+10');
  text = '\\i[' + icon + ']Party Level +MAX';
  this.addCommand(text, 'quickPartyLevel+MAX');
  var icon = 48;
  text = '\\i[' + icon + ']Party Level -1';
  this.addCommand(text, 'quickPartyLevel-1');
  text = '\\i[' + icon + ']Party Level -10';
  this.addCommand(text, 'quickPartyLevel-10');
  text = '\\i[' + icon + ']Party Level to 1';
  this.addCommand(text, 'quickPartyLevelto1');
  // Skills
  this.addFillerLineBreak();
  var icon = 79;
  text = '\\i[' + icon + ']Add All Skills';
  this.addCommand(text, 'quickAddAllSkills');
  text = '\\i[' + icon + ']Add All Named Skills';
  this.addCommand(text, 'quickAddAllNamedSkills');
  text = '\\i[' + icon + ']Remove All Skills';
  this.addCommand(text, 'quickRemoveAllSkills');
};

Window_DebugAction.prototype.makeSwitchList = function() {
  var switches = $dataSystem.switches;
  var length = switches.length;
  for (var i = 1; i < length; ++i) {
    var switchId = i;
    var switchName = $dataSystem.switches[i];
    // Switch Name
    if ($gameSwitches.value(i)) {
      if (switchName.length === 0) {
        switchName = '\\C[18]' + '! ATTENTION !';
      } else {
        switchName = '\\C[17]' + switchName;
      }
    } else {
      if (switchName.length === 0) {
        switchName = '\\C[8]' + '<Unnamed>';
      } else {
        switchName = '\\C[8]' + switchName;
      }
    }
    var fmt = '\\c[4]S%1:\\c[0]%2';
    var text = fmt.format(switchId.padZero(4), switchName);
    this.addCommand(text, 'switchToggle', true, switchId);
    // [ON]
    if ($gameSwitches.value(i)) {
      text = '\\C[0]<CENTER>' + '[ON]';
    } else {
      text = '\\C[8]<CENTER>' + '[ON]';
    }
    this.addCommand(text, 'switchOn', true, switchId);
    // [ON]
    if ($gameSwitches.value(i)) {
      text = '\\C[8]<CENTER>' + '[OFF]';
    } else {
      text = '\\C[0]<CENTER>' + '[OFF]';
    }
    this.addCommand(text, 'switchOff', true, switchId);
  }
};

Window_DebugAction.prototype.makeVariableList = function() {
  var variables = $dataSystem.variables;
  var length = variables.length;
  for (var i = 1; i < length; ++i) {
    var varId = i;
    var varName = $dataSystem.variables[i];
    var enabled = typeof $gameVariables.value(varId) === 'number';
    this.addCommand('<CENTER>-100', 'var-100', enabled, varId);
    this.addCommand('<CENTER>-10', 'var-10', enabled, varId);
    this.addCommand('<CENTER>-1', 'var-1', enabled, varId);
    // Variable Name
    if ($gameVariables.value(i)) {
      if (varName.length === 0) {
        varName = '\\C[18]' + '! ATTENTION !';
      } else {
        varName = '\\C[17]' + varName;
      }
    } else {
      if (varName.length === 0) {
        varName = '\\C[8]' + '<Unnamed>';
      } else {
        varName = '\\C[8]' + varName;
      }
    }
    var fmt = '\\c[4]V%1:\\c[0]%2';
    var text = fmt.format(varId.padZero(4), varName);
    this.addCommand(text, 'variableSet', true, varId);
    this.addCommand('<CENTER>+1', 'var+1', enabled, varId);
    this.addCommand('<CENTER>+10', 'var+10', enabled, varId);
    this.addCommand('<CENTER>+100', 'var+100', enabled, varId);
  }
};

Window_DebugAction.prototype.makeTeleportList = function() {
  var length = $dataMapInfos.length;
  for (var i = 1; i < length; ++i) {
    var mapId = i;
    if ($dataMapInfos[mapId] === null) continue;
    var mapName = $dataMapInfos[mapId].name;
    if (mapName.match(/<HIDE IN DEBUGGER>/i)) continue;
    var fmt = '\\c[4]M%1:\\c[0]%2';
    var text = fmt.format(mapId.padZero(3), mapName);
    this.addCommand(text, 'teleportMapId', true, mapId);
  }
};

Window_DebugAction.prototype.makeCommonEventList = function() {
  var length = $dataCommonEvents.length;
  for (var i = 1; i < length; ++i) {
    var eventId = i;
    if ($dataCommonEvents[eventId] === null) continue;
    var name = $dataCommonEvents[eventId].name;
    if (name === '') continue;
    var fmt = '\\c[4]C%1:\\c[0]%2';
    var text = fmt.format(eventId.padZero(4), name);
    this.addCommand(text, 'commonEvent', true, eventId);
  }
};

Window_DebugAction.prototype.makeBattleList = function() {
  var length = $dataTroops.length;
  for (var i = 1; i < length; ++i) {
    var troopId = i;
    if ($dataTroops[troopId] === null) continue;
    var name = $dataTroops[troopId].name;
    if (name === '') continue;
    var fmt = '\\c[4]B%1:\\c[0]%2';
    var text = fmt.format(troopId.padZero(4), name);
    var enabled = $dataTroops[troopId].members.length > 0;
    this.addCommand(text, 'battleNormal', enabled, troopId);
    var preemptive = '<CENTER>\\c[17]Preemptive';
    this.addCommand(preemptive, 'battleParty', enabled, troopId);
    var surprise = '<CENTER>\\c[18]Surprise';
    this.addCommand(surprise, 'battleTroop', enabled, troopId);
  }
};

Window_DebugAction.prototype.makeActorList = function() {
  var column1 = ['\\c[17]Actor List'];
  var column2 = [];
  // Create Column 1
  for (var i = 1; i < Yanfly.Max.Actors; ++i) {
    var actor = $gameActors.actor(i);
    if (actor) column1.push(actor);
  }
  // Create Column 2
  var bmembers = $gameParty.battleMembers();
  if (bmembers.length > 0) {
    column2.push('\\c[17]Battle Members');
    var length = bmembers.length;
    for (var i = 0; i < length; ++i) {
      var actor = bmembers[i];
      if (actor) column2.push(actor);
    }
  }
  var amembers = $gameParty.allMembers();
  if (amembers.length > 0 && amembers.length > bmembers.length) {
    column2.push('\\c[17]Reserve Members');
    var length = amembers.length;
    for (var i = 0; i < length; ++i) {
      var actor = amembers[i];
      if (actor && !bmembers.contains(actor)) column2.push(actor);
    }
  }
  // Add Commands
  var length = Math.max(column1.length, column2.length);
  for (var i = 0; i < length; ++i) {
    var member = column1[i];
    if (typeof member === 'string') {
      this.addCommand(member, 'none', true);
    } else if (member) {
      var name = member.name();
      var fmt = '\\c[4]A%1:\\c[0]%2';
      var text = fmt.format(member.actorId().padZero(4), name);
      this.addCommand(text, 'battlerMain', true, member);
    } else {
      this.addCommand('', 'none', true);
    }
    var member = column2[i];
    if (typeof member === 'string') {
      this.addCommand(member, 'none', true);
    } else if (member) {
      var name = member.name();
      var fmt = '\\c[4]A%1:\\c[0]%2';
      var text = fmt.format(member.actorId().padZero(4), name);
      this.addCommand(text, 'battlerMain', true, member);
    } else {
      this.addCommand('', 'none', true);
    }
  }
};

Window_DebugAction.prototype.makeEnemyList = function() {
  var column1 = ['\\c[17]Enemy List'];
  var column2 = [];
  // Create Column 1
  var members = $gameTroop.allMembers();
  var length = members.length;
  for (var i = 0; i < length; ++i) {
    var member = members[i];
    if (member) column1.push(member);
  }
  // Create Column 2
  var members = $gameTroop.aliveMembers();
  var length = members.length;
  if (length > 0) {
    column2.push('\\c[17]Alive Enemies');
    for (var i = 0; i < length; ++i) {
      var member = members[i];
      if (member) column2.push(member);
    }
  }
  var members = $gameTroop.deadMembers();
  var length = members.length;
  if (length > 0) {
    column2.push('\\c[17]Dead Enemies');
    for (var i = 0; i < length; ++i) {
      var member = members[i];
      if (member) column2.push(member);
    }
  }
  // Add Commands
  var length = Math.max(column1.length, column2.length);
  for (var i = 0; i < length; ++i) {
    var member = column1[i];
    if (typeof member === 'string') {
      this.addCommand(member, 'none', true);
    } else if (member) {
      var name = member.name();
      var fmt = '\\c[4]E%1:\\c[0]%2';
      var text = fmt.format(member.enemyId().padZero(4), name);
      this.addCommand(text, 'battlerMain', true, member);
    } else {
      this.addCommand('', 'none', true);
    }
    var member = column2[i];
    if (typeof member === 'string') {
      this.addCommand(member, 'none', true);
    } else if (member) {
      var name = member.name();
      var fmt = '\\c[4]E%1:\\c[0]%2';
      var text = fmt.format(member.enemyId().padZero(4), name);
      this.addCommand(text, 'battlerMain', true, member);
    } else {
      this.addCommand('', 'none', true);
    }
  }
};

Window_DebugAction.prototype.makeBattlerList = function() {
  var column1 = [];
  var column2 = [];
  if ($gameParty.inBattle()) {
    // In Battle
    var members = $gameParty.battleMembers();
    var length = members.length;
    if (length > 0) {
      column1.push('\\c[17]Battle Actors');
      for (var i = 0; i < length; ++i) {
        var member = members[i];
        if (member) column1.push(member);
      }
    }
    var members = $gameParty.allMembers();
    var length = members.length;
    if ((length - $gameParty.battleMembers().length) > 0) {
      column1.push('\\c[17]Reserve Actors');
      for (var i = 0; i < length; ++i) {
        var member = members[i];
        if (member && !column1.contains(member)) column1.push(member);
      }
    }
    var members = $gameTroop.aliveMembers();
    var length = members.length;
    if (length > 0) {
      column2.push('\\c[17]Alive Enemies');
      for (var i = 0; i < length; ++i) {
        var member = members[i];
        if (member) column2.push(member);
      }
    }
    var members = $gameTroop.deadMembers();
    var length = members.length;
    if (length > 0) {
      column2.push('\\c[17]Dead Enemies');
      for (var i = 0; i < length; ++i) {
        var member = members[i];
        if (member) column2.push(member);
      }
    }
  } else {
    // Not In Battle
    column1.push('\\c[17]Actor List');
    for (var i = 1; i < Yanfly.Max.Actors; ++i) {
      var actor = $gameActors.actor(i);
      if (actor) column1.push(actor);
    }
    var bmembers = $gameParty.battleMembers();
    if (bmembers.length > 0) {
      column2.push('\\c[17]Battle Members');
      var length = bmembers.length;
      for (var i = 0; i < length; ++i) {
        var actor = bmembers[i];
        if (actor) column2.push(actor);
      }
    }
    var amembers = $gameParty.allMembers();
    if (amembers.length > 0 && amembers.length > bmembers.length) {
      column2.push('\\c[17]Reserve Members');
      var length = amembers.length;
      for (var i = 0; i < length; ++i) {
        var actor = amembers[i];
        if (actor && !bmembers.contains(actor)) column2.push(actor);
      }
    }
  }
  // Add Commands
  var length = Math.max(column1.length, column2.length);
  for (var i = 0; i < length; ++i) {
    var member = column1[i];
    if (typeof member === 'string') {
      this.addCommand(member, 'none', true);
    } else if (member) {
      var name = member.name();
      var fmt = member.isActor() ? '\\c[4]A%1:\\c[0]%2' : '\\c[4]E%1:\\c[0]%2';
      var id = member.isActor() ? member.actorId() : member.enemyId();
      var text = fmt.format(id.padZero(4), name);
      this.addCommand(text, 'battlerList', true, member);
    } else {
      this.addCommand('', 'none', true);
    }
    var member = column2[i];
    if (typeof member === 'string') {
      this.addCommand(member, 'none', true);
    } else if (member) {
      var name = member.name();
      var fmt = member.isActor() ? '\\c[4]A%1:\\c[0]%2' : '\\c[4]E%1:\\c[0]%2';
      var id = member.isActor() ? member.actorId() : member.enemyId();
      var text = fmt.format(id.padZero(4), name);
      this.addCommand(text, 'battlerList', true, member);
    } else {
      this.addCommand('', 'none', true);
    }
  }
};

Window_DebugAction.prototype.setBattler = function(battler, type) {
  this._battler = battler;
  this._battlerType = type;
  this.select(0);
};

Window_DebugAction.prototype.removeBattler = function() {
  var ext = this._battler;
  this._battler = undefined;
  this._battlerType = undefined;
  this.refresh();
  this.selectExt(ext);
  this.activate();
};

Window_DebugAction.prototype.makeBattlerMainList = function() {
  this.addCommand('\\c[17]' + this._battler.name(), 'none');
  if (this._battler.isActor() && !$gameParty.inBattle()) {
    var inParty = $gameParty.allMembers().contains(this._battler);
    this.addCommand('Add to Party', 'battlerAddParty', !inParty);
    this.addCommand('Remove from Party', 'battlerRemoveParty', inParty);
  } else if (this._battler.isEnemy()) {
    var hidden = this._battler.isHidden();
    this.addCommand('Show Enemy', 'battlerShowEnemy', hidden);
    this.addCommand('Hide Enemy', 'battlerHideEnemy', !hidden);
  }
  // Parameters
  this.addCommand('<CENTER>\\c[17]Main Parameters', 'none');
  this.addCommand('Recover ' + TextManager.hp, 'battlerRecoverHp');
  this.addCommand('Recover ' + TextManager.mp, 'battlerRecoverMp');
  this.addCommand('Recover ' + TextManager.tp, 'battlerRecoverTp');
  this.addCommand('Clear States', 'battlerClearStates');
  this.addCommand('<CENTER>\\c[17]Base Parameters', 'none');
  if (this.battlerAddLevelOption()) {
    this.addCommand(TextManager.level, 'battlerBaseLevel');
  }
  for (var i = 0; i < 8; ++i) {
    var text = TextManager.param(i);
    this.addCommand(text, 'battlerBaseParam', true, i);
  }
  // Skills
  if (this._battler.isActor() && !$gameParty.inBattle()) {
    this.addCommand('<CENTER>\\c[17]Skills', 'none');
    this.addCommand('Add All Skills', 'battlerAddAllSkills');
    this.addCommand('Add All Named Skills', 'battlerAddAllNamedSkills');
    this.addCommand('Remove All Skills', 'battlerRemoveAllSkills');
  };
};

Window_DebugAction.prototype.battlerAddLevelOption = function() {
  if (this._battler.isActor()) return true;
  if (this._battler.isEnemy()) {
    if (Imported.YEP_EnemyLevels) return true;
  }
  return false;
};

Window_DebugAction.prototype.makeBattlerStatesList = function() {
  this.addCommand('\\c[17]' + this._battler.name(), 'none');
  this.addCommand('Clear States', 'battlerClearStates');
  this.addCommand('<CENTER>\\c[17]Sort States', 'none');
  this._sortStates = this._sortStates || 'id1';
  this.addCommand('Sort by ID', 'battlerStatesSortID');
  this.addCommand('Sort by Priority', 'battlerStatesSortPriority');
  this.addCommand('Sort by Name', 'battlerStatesSortName');
  this.addCommand('<CENTER>\\c[17]States List', 'none');
  var states = this.getSortDebugStates();
  var battlerStates = this._battler.states();
  var length = states.length;
  for (var i = 0; i < length; ++i) {
    var state = states[i];
    if (!state) continue;
    if (state.name === '') continue;
    var fmt = '\\c[4]T%1:\\i[%2]\\c[%3]%4';
    var id = state.id;
    var icon = state.iconIndex;
    var name = state.name;
    var color = battlerStates.contains($dataStates[state.id]) ? 0 : 8;
    var text = fmt.format(id.padZero(4), icon, color, name);
    this.addCommand(text, 'battlerState', true, state);
  }
};

Window_DebugAction.prototype.getSortDebugStates = function() {
  if (this._cachedStates) return this._cachedStates;
  var group = JsonEx.makeDeepCopy($dataStates);
  group.shift();
  if (this._sortStates === 'id1') {
    group.sort(function(a, b) {
      var t1 = a.id;
      var t2 = b.id;
      if (t1 !== t2) return t1 - t2;
      return a.name === b.name ? 0 : +(a.name > b.name) || -1;
    });
  } else if (this._sortStates === 'id2') {
    group.sort(function(a, b) {
      var t1 = a.id;
      var t2 = b.id;
      if (t1 !== t2) return t2 - t1;
      return a.name === b.name ? 0 : +(a.name > b.name) || -1;
    });
  } else if (this._sortStates === 'priority1') {
    group.sort(function(a, b) {
      var t1 = a.priority;
      var t2 = b.priority;
      if (t1 !== t2) return t1 - t2;
      return a.name === b.name ? 0 : +(a.name > b.name) || -1;
    });
  } else if (this._sortStates === 'priority2') {
    group.sort(function(a, b) {
      var t1 = a.priority;
      var t2 = b.priority;
      if (t1 !== t2) return t2 - t1;
      return a.name === b.name ? 0 : +(a.name > b.name) || -1;
    });
  } else if (this._sortStates === 'name1') {
    group.sort(function(a, b) {
      return a.name === b.name ? 0 : +(a.name > b.name) || -1;
    });
  } else if (this._sortStates === 'name2') {
    group.sort(function(a, b) {
      return a.name === b.name ? 0 : +(a.name < b.name) || -1;
    });
  }
  this._cachedStates = group;
  return this._cachedStates;
};

Window_DebugAction.prototype.makeBattlerBuffsList = function() {
  this.addCommand('\\c[17]' + this._battler.name(), 'none');
  this.addCommand('Clear Buffs', 'battlerClearBuffs');
  this.addCommand('Clear Debuffs', 'battlerClearDebuffs');
  this.addCommand('Clear Buffs & Debuffs', 'battlerClearBuffsDebuffs');
  this.addCommand('<CENTER>\\c[17]Main Parameters', 'none');
  for (var i = 0; i < 8; ++i) {
    var level = this._battler._buffs[i] || 1;
    var icon = this._battler.buffIconIndex(level, i);
    var name = TextManager.param(i);
    var fmt = '\\i[%1]\\c[4]%2';
    var text = fmt.format(icon, name);
    this.addCommand(text, 'battlerBuff', true, i);
  }
};

Window_DebugAction.prototype.addDebugItem = function(item) {
  if (!item) return;
  if (item.name === '') return;
  var enabled = true;
  if (Imported.YEP_ItemCore && item.baseItemId) {
    this.addCommand('', 'none');
    this.addCommand('<CENTER>\\}Delete', 'item-delete', enabled, item);
    this.addCommand('', 'none');
  } else if (Imported.YEP_ItemCore && DataManager.isIndependent(item)) {
    this.addCommand('', 'none');
    this.addCommand('<CENTER>\\}Clear', 'item-clear', enabled, item);
    this.addCommand('', 'none');
  } else {
    this.addCommand('<CENTER>Zero', 'item-max', enabled, item);
    this.addCommand('<CENTER>-10', 'item-10', enabled, item);
    this.addCommand('<CENTER>-1', 'item-1', enabled, item);
  }
  var fmt = '\\c[%5]%4%1\\i[%2]\\c[0]%3';
  var id = item.id;
  var icon = item.iconIndex;
  var name = item.name;
  if (DataManager.isItem(item)) {
    var type = 'I';
  } else if (DataManager.isWeapon(item)) {
    var type = 'W';
  } else {
    var type = 'A';
  }
  if (Imported.YEP_ItemCore && item.baseItemId) {
    var color = 5;
  } else {
    var color = 4;
  }
  var text = fmt.format(id.padZero(4), icon, name, type, color);
  this.addCommand(text, 'item', enabled, item);
  if (Imported.YEP_ItemCore && item.baseItemId) {
    this.addCommand('', 'none');
    this.addCommand('<CENTER>\\}Add', 'item-dupe', enabled, item);
    this.addCommand('', 'none');
  } else if (Imported.YEP_ItemCore && DataManager.isIndependent(item)) {
    this.addCommand('', 'none');
    this.addCommand('<CENTER>\\}Make', 'item-make', enabled, item);
    this.addCommand('', 'none');
  } else {
    this.addCommand('<CENTER>+1', 'item+1', enabled, item);
    this.addCommand('<CENTER>+10', 'item+10', enabled, item);
    this.addCommand('<CENTER>+MAX', 'item+max', enabled, item);
  }
};

Window_DebugAction.prototype.makeItemList = function() {
  var items = this.getDataItems();
  var length = items.length;
  for (var i = 0; i < length; ++i) {
    var id = items[i].id;
    var item = $dataItems[id];
    this.addDebugItem(item);
  }
};

Window_DebugAction.prototype.getDataItems = function() {
  if (this._cachedItems) return this._cachedItems;
  this._cachedItems = [];
  var length = $dataItems.length;
  for (var i = 0; i < length; ++i) {
    var item = $dataItems[i];
    if (item && item.name !== '') this._cachedItems.push(item);
  }
  return this._cachedItems;
};

Window_DebugAction.prototype.makeWeaponList = function() {
  var items = this.getDataWeapons();
  var length = items.length;
  for (var i = 0; i < length; ++i) {
    var id = items[i].id;
    var item = $dataWeapons[id];
    this.addDebugItem(item);
  }
};

Window_DebugAction.prototype.getDataWeapons = function() {
  if (this._cachedWeapons) return this._cachedWeapons;
  this._cachedWeapons = [];
  var length = $dataWeapons.length;
  for (var i = 0; i < length; ++i) {
    var item = $dataWeapons[i];
    if (item && item.name !== '') this._cachedWeapons.push(item);
  }
  return this._cachedWeapons;
};

Window_DebugAction.prototype.makeArmorList = function() {
  var items = this.getDataArmors();
  var length = items.length;
  for (var i = 0; i < length; ++i) {
    var id = items[i].id;
    var item = $dataArmors[id];
    this.addDebugItem(item);
  }
};

Window_DebugAction.prototype.getDataArmors = function() {
  if (this._cachedArmors) return this._cachedArmors;
  this._cachedArmors = [];
  var length = $dataArmors.length;
  for (var i = 0; i < length; ++i) {
    var item = $dataArmors[i];
    if (item && item.name !== '') this._cachedArmors.push(item);
  }
  return this._cachedArmors;
};

Window_DebugAction.prototype.drawItem = function(index) {
  var symbol = this._list[index].symbol;
  var ext = this._list[index].ext;
  var rect = this.itemRect(index);
  switch (symbol) {
  case 'currentGold':
    rect.width -= this.textPadding();
    this.drawText(this.commandName(index), rect.x, rect.y, rect.width, 'right');
    return;
    break;
  };
  Window_DebugCommand.prototype.drawItem.call(this, index);
  switch (symbol) {
  case 'variableSet':
    var value = Yanfly.Util.toGroup($gameVariables.value(ext));
    this.resetFontSettings();
    rect.width -= this.textPadding();
    this.drawText(value, rect.x, rect.y, rect.width, 'right');
    break;
  case 'battlerRecoverHp':
    var x = Math.floor(rect.x + rect.width / 3);
    var y = rect.y;
    var w = rect.width - x - this.textPadding();
    this.drawActorHp(this._battler, x, y, w);
    break;
  case 'battlerRecoverMp':
    var x = Math.floor(rect.x + rect.width / 3);
    var y = rect.y;
    var w = rect.width - x - this.textPadding();
    this.drawActorMp(this._battler, x, y, w);
    break;
  case 'battlerRecoverTp':
    var x = Math.floor(rect.x + rect.width / 3);
    var y = rect.y;
    var w = rect.width - x - this.textPadding();
    this.drawActorTp(this._battler, x, y, w);
    break;
  case 'battlerClearStates':
    var x = Math.floor(rect.x + rect.width / 3);
    var y = rect.y;
    var w = rect.width - x - this.textPadding();
    this.drawActorIcons(this._battler, x, y, w);
    break;
  case 'battlerBaseLevel':
    var x = Math.floor(rect.x + rect.width / 3);
    var y = rect.y;
    var w = rect.width - x - this.textPadding();
    this.drawActorLevel(this._battler, x, y, w, ext);
    break;
  case 'battlerBaseParam':
    var x = Math.floor(rect.x + rect.width / 3);
    var y = rect.y;
    var w = rect.width - x - this.textPadding();
    this.drawActorParam(this._battler, x, y, w, ext);
    break;
  case 'battlerState':
    var states = this._battler.states();
    var state = $dataStates[ext.id];
    var stateId = state.id;
    this.resetFontSettings();
    var x = Math.ceil(rect.width / 2);
    var y = rect.y;
    var w = Math.ceil(rect.width / 4);
    this.changePaintOpacity(states.contains(state));
    var text = states.contains(state) ? 'Affected' : 'Unaffected';
    this.drawText(text, x, y, w, 'center');
    x += w;
    var turns = this._battler._stateTurns[stateId] || 0;
    text = 'Turns: ' + turns;
    this.drawText(text, x, y, w, 'center');
    break;
  case 'battlerStatesSortID':
    if (this._sortStates === 'id2') {
      var text = 'High to Low';
      this.changeTextColor(this.textColor(17));
    } else if (this._sortStates === 'id1') {
      var text = 'Low to High';
      this.changeTextColor(this.textColor(17));
    } else {
      var text = 'Low to High';
      this.changeTextColor(this.textColor(0));
    }
    var x = rect.x;
    var y = rect.y;
    var w = rect.width - x - this.textPadding();
    this.drawText(text, x, y, w, 'right');
    break;
  case 'battlerStatesSortPriority':
    if (this._sortStates === 'priority2') {
      var text = 'High to Low';
      this.changeTextColor(this.textColor(17));
    } else if (this._sortStates === 'priority1') {
      var text = 'Low to High';
      this.changeTextColor(this.textColor(17));
    } else {
      var text = 'Low to High';
      this.changeTextColor(this.textColor(0));
    }
    var x = rect.x;
    var y = rect.y;
    var w = rect.width - x - this.textPadding();
    this.drawText(text, x, y, w, 'right');
    break;
  case 'battlerStatesSortName':
    if (this._sortStates === 'name2') {
      var text = 'Z to A';
      this.changeTextColor(this.textColor(17));
    } else if (this._sortStates === 'name1') {
      var text = 'A to Z';
      this.changeTextColor(this.textColor(17));
    } else {
      var text = 'A to Z';
      this.changeTextColor(this.textColor(0));
    }
    var x = rect.x;
    var y = rect.y;
    var w = rect.width - x - this.textPadding();
    this.drawText(text, x, y, w, 'right');
    break;
  case 'battlerBuff':
    var x = rect.x;
    var y = rect.y;
    var w = Math.ceil(rect.width / 2);
    var value = Yanfly.Util.toGroup(this._battler.param(ext));
    var stacks = this._battler._buffs[ext] || 0;
    var text = value;
    if (stacks > 0) {
      this.changeTextColor(this.powerUpColor());
    } else if (stacks < 0) {
      this.changeTextColor(this.powerDownColor());
    } else {
      this.changeTextColor(this.normalColor());
    }
    this.drawText(text, x, y, w - this.textPadding(), 'right');
    x += w + this.textPadding();
    w = Math.ceil(rect.width / 4);
    var rate = Math.floor(this._battler.paramBuffRate(ext) * 100);
    text = '(' + rate + '%)';
    this.drawText(text, x, y, w - this.textPadding(), 'left');
    x += w;
    this.resetFontSettings();
    text = 'Stacks: ' + Yanfly.Util.toGroup(stacks);
    this.drawText(text, x, y, w - this.textPadding(), 'center');
    break;
  case 'item':
    var x = rect.x;
    var y = rect.y;
    var w = rect.width - this.textPadding();
    Window_ItemList.prototype.drawItemNumber.call(this, ext, x, y, w);
    break;
  };
};

Window_DebugAction.prototype.needsNumber = function() {
  return true;
};

Window_DebugAction.prototype.drawItemCarryNumber = function(item, dx, dy, dw) {
  var text = '';
  if (item.baseItemId) {
    text = 'Independent';
  } else if (DataManager.isIndependent(item)) {
    text = 'Template';
  }
  if (text === '') return;
  this.resetFontSettings();
  this.makeFontSmaller();
  dw -= this.textPadding();
  this.drawText(text, dx, dy, dw, 'right');
};

Window_DebugAction.prototype.drawActorLevel = function(battler, x, y, w, id) {
  var rate = battler.level / battler.maxLevel();
  var color1 = this.textColor(30);
  var color2 = this.textColor(31);
  this.drawGauge(x, y, w, rate, color1, color2);
  var text = Yanfly.Util.toGroup(battler.level);
  this.drawText(text, x, y, w, 'right');
};

Window_DebugAction.prototype.drawActorParam = function(battler, x, y, w, id) {
  var rate = battler.param(id) / battler.paramMax(id);
  var color1 = this.textColor(30);
  var color2 = this.textColor(31);
  this.drawGauge(x, y, w, rate, color1, color2);
  var text = Yanfly.Util.toGroup(battler.param(id));
  if (battler._paramPlus[id] !== 0) {
    var add = '(';
    add += (battler._paramPlus[id] > 0) ? '+' : '';
    add += Yanfly.Util.toGroup(battler._paramPlus[id]) + ') ';
    text = add + text;
  }
  this.drawText(text, x, y, w, 'right');
};

Window_DebugAction.prototype.updateHelp = function() {
  this.updateDebugHelp(this._symbol);
};

Window_DebugAction.prototype.update = function() {
  Window_DebugCommand.prototype.update.call(this);
  this.processExtraKeys();
};

Window_DebugAction.prototype.processExtraKeys = function() {
  if (!this.isOpenAndActive()) return;
  if (this._battler) return this.processBattlerKeys();
  var symbol = this._symbol;
  switch (symbol) {
  case 'quick':
    this.processQuickKeys();
    break;
  case 'switch':
  case 'battle':
  case 'events':
    this.processQuickSelectKeys();
    break;
  case 'variable':
    this.processVariableKeys();
    break;
  }
};

Window_DebugAction.prototype.processVariableKeys = function() {
  if (this.currentSymbol() !== 'variableSet') return;
  var varId = this.currentExt();
  var value = Number($gameVariables.value(varId));
  if (value === NaN) value = 0;
  if (Input.isTriggered('delete')) {
    value = 0;
  } else if (Input.isRepeated('backspace')) {
    value = String(value);
    value = value.substring(0, value.length - 1);
    value = Number(value);
  } else if (Input.isRepeated('0')) {
    value = Number(String(value) + '0');
  } else if (Input.isRepeated('1')) {
    value = Number(String(value) + '1');
  } else if (Input.isRepeated('2')) {
    value = Number(String(value) + '2');
  } else if (Input.isRepeated('3')) {
    value = Number(String(value) + '3');
  } else if (Input.isRepeated('4')) {
    value = Number(String(value) + '4');
  } else if (Input.isRepeated('5')) {
    value = Number(String(value) + '5');
  } else if (Input.isRepeated('6')) {
    value = Number(String(value) + '6');
  } else if (Input.isRepeated('7')) {
    value = Number(String(value) + '7');
  } else if (Input.isRepeated('8')) {
    value = Number(String(value) + '8');
  } else if (Input.isRepeated('9')) {
    value = Number(String(value) + '9');
  } else if (Input.isTriggered('-')) {
    value = -1 * Math.abs(value);
  } else if (Input.isTriggered('+')) {
    value = Math.abs(value);
  } else {
    return;
  }
  SoundManager.playCursor();
  $gameVariables.setValue(varId, value);
  this.refresh();
  if (Yanfly.Param.DebugConsoleMsg) {
    console.log('V' + varId.padZero(4) + ': ' + 
      ($dataSystem.variables[varId] || '<Unnamed>') +
      ' set to ' + Yanfly.Util.toGroup($gameVariables.value(varId)));
  }
};

Window_DebugAction.prototype.processQuickKeys = function() {
  if (this.currentSymbol() !== 'currentGold') return;
  var value = $gameParty.gold();
  if (value === NaN) value = 0;
  if (Input.isTriggered('delete')) {
    value = 0;
  } else if (Input.isRepeated('backspace')) {
    value = String(value);
    value = value.substring(0, value.length - 1);
    value = Number(value);
  } else if (Input.isRepeated('0')) {
    value = Number(String(value) + '0');
  } else if (Input.isRepeated('1')) {
    value = Number(String(value) + '1');
  } else if (Input.isRepeated('2')) {
    value = Number(String(value) + '2');
  } else if (Input.isRepeated('3')) {
    value = Number(String(value) + '3');
  } else if (Input.isRepeated('4')) {
    value = Number(String(value) + '4');
  } else if (Input.isRepeated('5')) {
    value = Number(String(value) + '5');
  } else if (Input.isRepeated('6')) {
    value = Number(String(value) + '6');
  } else if (Input.isRepeated('7')) {
    value = Number(String(value) + '7');
  } else if (Input.isRepeated('8')) {
    value = Number(String(value) + '8');
  } else if (Input.isRepeated('9')) {
    value = Number(String(value) + '9');
  } else {
    return;
  }
  SoundManager.playCursor();
  $gameParty._gold = value.clamp(0, $gameParty.maxGold());
  this.refresh();
  if (Yanfly.Param.DebugConsoleMsg) {
    var text = 'Quick: Set ' + TextManager.currencyUnit;
    text += ' to ' + Yanfly.Util.toGroup($gameParty.gold());
    console.log(text);
  }
};

Window_DebugAction.prototype.processQuickSelectKeys = function() {
  if (Input.isTriggered('tilde')) {
    SoundManager.playCursor();
    this.select(0);
  } else if (Input.isTriggered('0')) {
    SoundManager.playCursor();
    this.select(this.maxItems() - 1);
    this.setTopRow(Math.floor(this.index() / this.maxCols()));
  } else if (Input.isTriggered('1')) {
    SoundManager.playCursor();
    this.selectExt(100);
    this.setTopRow(Math.floor(this.index() / this.maxCols()));
  } else if (Input.isTriggered('2')) {
    SoundManager.playCursor();
    this.selectExt(200);
    this.setTopRow(Math.floor(this.index() / this.maxCols()));
  } else if (Input.isTriggered('3')) {
    SoundManager.playCursor();
    this.selectExt(300);
    this.setTopRow(Math.floor(this.index() / this.maxCols()));
  } else if (Input.isTriggered('4')) {
    SoundManager.playCursor();
    this.selectExt(400);
    this.setTopRow(Math.floor(this.index() / this.maxCols()));
  } else if (Input.isTriggered('5')) {
    SoundManager.playCursor();
    this.selectExt(500);
    this.setTopRow(Math.floor(this.index() / this.maxCols()));
  } else if (Input.isTriggered('6')) {
    SoundManager.playCursor();
    this.selectExt(600);
    this.setTopRow(Math.floor(this.index() / this.maxCols()));
  } else if (Input.isTriggered('7')) {
    SoundManager.playCursor();
    this.selectExt(700);
    this.setTopRow(Math.floor(this.index() / this.maxCols()));
  } else if (Input.isTriggered('8')) {
    SoundManager.playCursor();
    this.selectExt(800);
    this.setTopRow(Math.floor(this.index() / this.maxCols()));
  } else if (Input.isTriggered('9')) {
    SoundManager.playCursor();
    this.selectExt(900);
    this.setTopRow(Math.floor(this.index() / this.maxCols()));
  }
};

Window_DebugAction.prototype.processBattlerKeys = function() {
  var value = undefined;
  var ext = this.currentExt();
  switch (this.currentSymbol()) {
  case 'battlerRecoverHp':
    value = this._battler.hp;
    break;
  case 'battlerRecoverMp':
    value = this._battler.mp;
    break;
  case 'battlerRecoverTp':
    value = this._battler.tp;
    break;
  case 'battlerBaseLevel':
    value = this._battler.level;
    break;
  case 'battlerBaseParam':
    value = this._battler._paramPlus[ext];
    break;
  case 'battlerState':
    value = this._battler._stateTurns[ext.id] || 0;
    break;
  case 'battlerBuff':
    value = this._battler._buffs[ext] || 0;
    break;
  }
  if (value === undefined) return;
  if (value === NaN) value = 0;
  if (Input.isTriggered('delete')) {
    value = 0;
  } else if (Input.isRepeated('backspace')) {
    value = String(value);
    value = value.substring(0, value.length - 1);
    if (value === '-') value = 0;
    value = Number(value);
  } else if (Input.isRepeated('0')) {
    value = Number(String(value) + '0');
  } else if (Input.isRepeated('1')) {
    value = Number(String(value) + '1');
  } else if (Input.isRepeated('2')) {
    value = Number(String(value) + '2');
  } else if (Input.isRepeated('3')) {
    value = Number(String(value) + '3');
  } else if (Input.isRepeated('4')) {
    value = Number(String(value) + '4');
  } else if (Input.isRepeated('5')) {
    value = Number(String(value) + '5');
  } else if (Input.isRepeated('6')) {
    value = Number(String(value) + '6');
  } else if (Input.isRepeated('7')) {
    value = Number(String(value) + '7');
  } else if (Input.isRepeated('8')) {
    value = Number(String(value) + '8');
  } else if (Input.isRepeated('9')) {
    value = Number(String(value) + '9');
  } else if (Input.isTriggered('-')) {
    value = -1 * Math.abs(value);
  } else if (Input.isTriggered('+')) {
    value = Math.abs(value);
  } else if (Input.isRepeated('left')) {
    var mod = 1;
    if (Input.isPressed('shift')) mod *= 10;
    if (Input.isPressed('control')) mod *= 100;
    value -= mod;
  } else if (Input.isRepeated('right')) {
    var mod = 1;
    if (Input.isPressed('shift')) mod *= 10;
    if (Input.isPressed('control')) mod *= 100;
    value += mod;
  } else {
    return;
  }
  SoundManager.playCursor();
  if (Yanfly.Param.DebugConsoleMsg) {
    var name = this._battler.name();
    var fmt = this._battler.isActor() ? 'A%1: %2' : 'E%1: %2';
    var id = this._battler.isActor() ? 
      this._battler.actorId() : this._battler.enemyId();
    var text = fmt.format(id.padZero(4), name);
  };
  switch (this.currentSymbol()) {
  case 'battlerRecoverHp':
    this._battler.setHp(value);
    text += ' - Changed ' + TextManager.hp + ' to ' + this._battler.hp;
    break;
  case 'battlerRecoverMp':
    this._battler.setMp(value);
    text += ' - Changed ' + TextManager.mp + ' to ' + this._battler.mp;
    break;
  case 'battlerRecoverTp':
    this._battler.setTp(value);
    text += ' - Changed ' + TextManager.tp + ' to ' + this._battler.tp;
    break;
  case 'battlerBaseLevel':
    value = value.clamp(1, this._battler.maxLevel());
    this._battler.changeLevel(value);
    this._battler.refresh();
    break;
  case 'battlerBaseParam':
    value = value.clamp(-999999999999999, 999999999999999);
    this._battler._paramPlus[this.currentExt()] = value;
    this._battler.refresh();
    break;
  case 'battlerState':
    this._battler._stateTurns[ext.id] = Math.max(0, value);
    text += ' - Changed ' + ext.name + ' turns to ' + value;
    var affected = this._battler.states().contains($dataStates[ext.id]);
    if (this._battler._stateTurns[ext.id] > 0 && !affected) {
      this._battler.addState(ext.id);
      this._battler._stateTurns[ext.id] = Math.max(0, value);
    } else if (this._battler._stateTurns[ext.id] <= 0 && affected) {
      this._battler.removeState(ext.id);
    }
    this._battler.clearResult();
    break;
  case 'battlerBuff':
    if (Imported.YEP_BuffsStatesCore) {
      var max = this._battler.maxBuffLimit(ext);
      var min = -1 * this._battler.maxBuffLimit(ext);
    } else {
      var max = 2;
      var min = -2;
    }
    this._battler._buffs[ext] = value.clamp(min, max);
    this._battler._buffTurns[ext] = Math.max(this._battler._buffTurns[ext], 5);
    this._battler.refresh();
    text += ' - ' + TextManager.param(ext) + ' Stacks changed to ';
    text += this._battler._buffs[ext];
    break;
  }
  this._battler.clearResult();
  this.refresh();
  if (Yanfly.Param.DebugConsoleMsg) console.log(text);
};

Window_DebugAction.prototype.callOkHandler = function() {
  this.activate();
  var symbol = this.currentSymbol();
  var ext = this.currentExt();
  switch (symbol) {
  case 'quickWin':
    if (Yanfly.Param.DebugConsoleMsg) console.log('Quick: Win Battle');
    SceneManager._scene.debugClose();
    $gameTroop.members().forEach(function(enemy) {
      enemy.setHp(0);
      enemy.performCollapse();
    });
    BattleManager.closeWindowsForDebugAction();
    break;
  case 'quickLose':
    if (Yanfly.Param.DebugConsoleMsg) console.log('Quick: Lose Battle');
    SceneManager._scene.debugClose();
    $gameParty.battleMembers().forEach(function(actor) {
      actor.setHp(0);
      actor.performCollapse();
      actor.requestMotion('dead');
    });
    BattleManager.closeWindowsForDebugAction();
    break;
  case 'quickRecoverAll':
    if (Yanfly.Param.DebugConsoleMsg) console.log('Quick: Recover All');
    $gameParty.battleMembers().forEach(function(actor) {
      actor.recoverAll();
    });
    break;
  case 'quickDisableVariance':
    if (Yanfly.Param.DebugConsoleMsg) console.log('Quick: Disable Variance');
    $gameTemp.setDisableDamageVariance(true);
    break;
  case 'quickEnableVariance':
    if (Yanfly.Param.DebugConsoleMsg) console.log('Quick: Enable Variance');
    $gameTemp.setDisableDamageVariance(false);
    break;
  case 'quickToggleVariance':
    if (Yanfly.Param.DebugConsoleMsg) console.log('Quick: Toggle Variance');
    var value = !$gameTemp.isDisableDamageVariance();
    $gameTemp.setDisableDamageVariance(false);
    break;
  case 'quickDisablePerfectStateRate':
    if (Yanfly.Param.DebugConsoleMsg) console.log('Quick: Normal State Rates');
    $gameTemp.setPerfectStateRate(false);
    break;
  case 'quickEnablePerfectStateRate':
    if (Yanfly.Param.DebugConsoleMsg) console.log('Quick: 100% State Rates');
    $gameTemp.setPerfectStateRate(true);
    break;
  case 'quickToggleStateRate':
    if (Yanfly.Param.DebugConsoleMsg) console.log('Quick: Toggle State Rates');
    var value = !$gameTemp.isPerfectStateRate();
    $gameTemp.setPerfectStateRate(false);
    break;
  case 'quickRefillHp':
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('Quick: Refill ' + TextManager.hp);
    }
    $gameParty.battleMembers().forEach(function(actor) {
      actor.setHp(actor.mhp);
    });
    break;
  case 'quickRefillMp':
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('Quick: Refill ' + TextManager.mp);
    }
    $gameParty.battleMembers().forEach(function(actor) {
      actor.setMp(actor.mmp);
    });
    break;
  case 'quickRefillTp':
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('Quick: Refill ' + TextManager.tp);
    }
    $gameParty.battleMembers().forEach(function(actor) {
      actor.setTp(actor.maxTp());
    });
    break;
  case 'quickClearStates':
    if (Yanfly.Param.DebugConsoleMsg) console.log('Quick: Clear States');
    $gameParty.battleMembers().forEach(function(actor) {
      actor.clearStates();
    });
    break;
  case 'quickRefillUses':
    if (Yanfly.Param.DebugConsoleMsg) console.log('Quick: Refill Uses');
    $gameParty.battleMembers().forEach(function(actor) {
      actor.initSkillLimitedUses();
    });
    break;
  case 'quickResetCooldowns':
  if (Yanfly.Param.DebugConsoleMsg) console.log('Quick: Reset Cooldowns');
    $gameParty.battleMembers().forEach(function(actor) {
      actor.clearCooldowns();
      actor.clearWarmups();
    });
    break;
  case 'switchToggle':
    var value = $gameSwitches.value(ext);
    $gameSwitches.setValue(ext, !value);
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('S' + ext.padZero(4) + ': ' + 
        ($dataSystem.switches[ext] || '<Unnamed>') +
        ' set to ' + ($gameSwitches.value(ext) ? 'ON' : 'OFF'));
    }
    break;
  case 'quickClearGold':
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('Quick: Clear All ' + TextManager.currencyUnit);
    }
    $gameParty._gold = 0;
    break;
  case 'quickGold-1000':
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('Quick: Lose 1,000 ' + TextManager.currencyUnit);
    }
    $gameParty.loseGold(1000);
    break;
  case 'quickGold=1000':
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('Quick: Set 1,000 ' + TextManager.currencyUnit);
    }
    $gameParty._gold = 1000;
    break;
  case 'quickGold+1000':
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('Quick: Gain 1,000 ' + TextManager.currencyUnit);
    }
    $gameParty.gainGold(1000);
    break;
  case 'quickGold-1000000':
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('Quick: Lose 1,000,000 ' + TextManager.currencyUnit);
    }
    $gameParty.loseGold(1000000);
    break;
  case 'quickGold=1000000':
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('Quick: Set 1,000,000 ' + TextManager.currencyUnit);
    }
    $gameParty._gold = 1000000;
    break;
  case 'quickGold+1000000':
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('Quick: Gain 1,000,000 ' + TextManager.currencyUnit);
    }
    $gameParty.gainGold(1000000);
    break;
  case 'quickItems+1':
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('Quick: All Items +1');
    }
    var length = $dataItems.length;
    length = Math.min(length, Yanfly.Max.Items);
    for (var i = 1; i < length; ++i) {
      var item = $dataItems[i];
      if (item && item.name) $gameParty.gainItem(item, 1);
    }
    break;
  case 'quickItems+10':
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('Quick: All Items +10');
    }
    var length = $dataItems.length;
    length = Math.min(length, Yanfly.Max.Items);
    for (var i = 1; i < length; ++i) {
      var item = $dataItems[i];
      if (item && item.name) $gameParty.gainItem(item, 10);
    }
    break;
  case 'quickItems+MAX':
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('Quick: All Items +MAX');
    }
    var length = $dataItems.length;
    length = Math.min(length, Yanfly.Max.Items);
    for (var i = 1; i < length; ++i) {
      var item = $dataItems[i];
      if (item && item.name) {
        var max = $gameParty.maxItems(item);
        $gameParty.gainItem(item, max);
      }
    }
    break;
  case 'quickWeapons+1':
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('Quick: All Weapons +1');
    }
    var length = $dataWeapons.length;
    length = Math.min(length, Yanfly.Max.Weapons);
    for (var i = 1; i < length; ++i) {
      var item = $dataWeapons[i];
      if (item && item.name) $gameParty.gainItem(item, 1);
    }
    break;
  case 'quickWeapons+10':
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('Quick: All Weapons +10');
    }
    var length = $dataWeapons.length;
    length = Math.min(length, Yanfly.Max.Weapons);
    for (var i = 1; i < length; ++i) {
      var item = $dataWeapons[i];
      if (item && item.name) $gameParty.gainItem(item, 10);
    }
    break;
  case 'quickWeapons+MAX':
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('Quick: All Weapons +MAX');
    }
    var length = $dataWeapons.length;
    length = Math.min(length, Yanfly.Max.Weapons);
    for (var i = 1; i < length; ++i) {
      var item = $dataWeapons[i];
      if (item && item.name) {
        var max = $gameParty.maxItems(item);
        $gameParty.gainItem(item, max);
      }
    }
    break;
  case 'quickArmors+1':
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('Quick: All Armors +1');
    }
    var length = $dataArmors.length;
    length = Math.min(length, Yanfly.Max.Armors);
    for (var i = 1; i < length; ++i) {
      var item = $dataArmors[i];
      if (item && item.name) $gameParty.gainItem(item, 1);
    }
    break;
  case 'quickArmors+10':
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('Quick: All Armors +10');
    }
    var length = $dataArmors.length;
    length = Math.min(length, Yanfly.Max.Armors);
    for (var i = 1; i < length; ++i) {
      var item = $dataArmors[i];
      if (item && item.name) $gameParty.gainItem(item, 10);
    }
    break;
  case 'quickArmors+MAX':
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('Quick: All Armors +MAX');
    }
    var length = $dataArmors.length;
    length = Math.min(length, Yanfly.Max.Armors);
    for (var i = 1; i < length; ++i) {
      var item = $dataArmors[i];
      if (item && item.name) {
        var max = $gameParty.maxItems(item);
        $gameParty.gainItem(item, max);
      }
    }
    break;
  case 'quickPartyLevel+1':
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('Quick: Party Level +1');
    }
    var group = $gameParty.members();
    var length = group.length;
    for (var i = 0; i < length; ++i) {
      var member = group[i];
      if (member) member.changeLevel(member.level + 1, false);
    }
    break;
  case 'quickPartyLevel+10':
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('Quick: Party Level +10');
    }
    var group = $gameParty.members();
    var length = group.length;
    for (var i = 0; i < length; ++i) {
      var member = group[i];
      if (member) member.changeLevel(member.level + 10, false);
    }
    break;
  case 'quickPartyLevel+MAX':
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('Quick: Party Level +MAX');
    }
    var group = $gameParty.members();
    var length = group.length;
    for (var i = 0; i < length; ++i) {
      var member = group[i];
      if (member) member.changeLevel(member.maxLevel(), false);
    }
    break;
  case 'quickPartyLevel-1':
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('Quick: Party Level -1');
    }
    var group = $gameParty.members();
    var length = group.length;
    for (var i = 0; i < length; ++i) {
      var member = group[i];
      if (member) member.changeLevel(member.level - 1, false);
    }
    break;
  case 'quickPartyLevel-10':
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('Quick: Party Level -10');
    }
    var group = $gameParty.members();
    var length = group.length;
    for (var i = 0; i < length; ++i) {
      var member = group[i];
      if (member) member.changeLevel(member.level - 10, false);
    }
    break;
  case 'quickPartyLevelto1':
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('Quick: Party Level to 1');
    }
    var group = $gameParty.members();
    var length = group.length;
    for (var i = 0; i < length; ++i) {
      var member = group[i];
      if (member) member.changeLevel(1, false);
    }
    break;
  case 'quickAddAllSkills':
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('Quick: Add All Skills');
    }
    $gameTemp.addAllSkills();
    break;
  case 'quickAddAllNamedSkills':
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('Quick: Add All Named Skills');
    }
    $gameTemp.addAllNamedSkills();
    break;
  case 'quickRemoveAllSkills':
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('Quick: Removal All Skills');
    }
    $gameTemp.removeAllSkills();
    break;
  case 'switchOn':
    $gameSwitches.setValue(ext, true);
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('S' + ext.padZero(4) + ': ' + 
        ($dataSystem.switches[ext] || '<Unnamed>') +
        ' set to ' + ($gameSwitches.value(ext) ? 'ON' : 'OFF'));
    }
    break;
  case 'switchOff':
    $gameSwitches.setValue(ext, false);
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('S' + ext.padZero(4) + ': ' + 
        ($dataSystem.switches[ext] || '<Unnamed>') +
        ' set to ' + ($gameSwitches.value(ext) ? 'ON' : 'OFF'));
    }
    break;
  case 'var-1':
    if (typeof $gameVariables.value(ext) !== 'number') return;
    var value = $gameVariables.value(ext);
    $gameVariables.setValue(ext, value - 1);
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('V' + ext.padZero(4) + ': ' + 
        ($dataSystem.variables[ext] || '<Unnamed>') +
        ' - 1 = ' + $gameVariables.value(ext));
    }
    break;
  case 'var-10':
    if (typeof $gameVariables.value(ext) !== 'number') return;
    var value = $gameVariables.value(ext);
    $gameVariables.setValue(ext, value - 10);
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('V' + ext.padZero(4) + ': ' + 
        ($dataSystem.variables[ext] || '<Unnamed>') +
        ' - 10 = ' + $gameVariables.value(ext));
    }
    break;
  case 'var-100':
    if (typeof $gameVariables.value(ext) !== 'number') return;
    var value = $gameVariables.value(ext);
    $gameVariables.setValue(ext, value - 100);
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('V' + ext.padZero(4) + ': ' + 
        ($dataSystem.variables[ext] || '<Unnamed>') +
        ' - 100 = ' + $gameVariables.value(ext));
    }
    break;
  case 'var+1':
    if (typeof $gameVariables.value(ext) !== 'number') return;
    var value = $gameVariables.value(ext);
    $gameVariables.setValue(ext, value + 1);
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('V' + ext.padZero(4) + ': ' + 
        ($dataSystem.variables[ext] || '<Unnamed>') +
        ' + 1 = ' + $gameVariables.value(ext));
    }
    break;
  case 'var+10':
    if (typeof $gameVariables.value(ext) !== 'number') return;
    var value = $gameVariables.value(ext);
    $gameVariables.setValue(ext, value + 10);
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('V' + ext.padZero(4) + ': ' + 
        ($dataSystem.variables[ext] || '<Unnamed>') +
        ' + 10 = ' + $gameVariables.value(ext));
    }
    break;
  case 'var+100':
    if (typeof $gameVariables.value(ext) !== 'number') return;
    var value = $gameVariables.value(ext);
    $gameVariables.setValue(ext, value + 100);
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('V' + ext.padZero(4) + ': ' + 
        ($dataSystem.variables[ext] || '<Unnamed>') +
        ' + 100 = ' + $gameVariables.value(ext));
    }
    break;
  case 'teleportMapId':
    var mapId = this.currentExt();
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('Teleporting to Map ' + mapId + '! Loading Teleporter.');
      console.log('...Please be patient as Teleporter loads.');
    };
    $gameTemp._preDebugTeleportX = $gamePlayer.x;
    $gameTemp._preDebugTeleportY = $gamePlayer.y;
    $gameTemp._preDebugTeleportMap = $gameMap.mapId();
    SceneManager._scene.debugClose();
    SceneManager.push(Scene_MapTeleport);
    $gamePlayer.reserveTransfer(mapId, 0, 0, 2, 0);
    break;
  case 'commonEvent':
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('C' + ext.padZero(4) + ': ' + 
        ($dataCommonEvents[ext].name || '<Unnamed>') +
        ' - Reserving Common Event');
      console.log('NOTE: Common Event will launch when possible!')
    };
    if (SceneManager._scene instanceof Scene_Map) {
      $gameTemp.reserveCommonEvent(ext);
    } else if (SceneManager._scene instanceof Scene_Battle) {
      $gameTemp.reserveCommonEvent(ext);
    } else {
      SceneManager.push(Scene_Map);
      $gameTemp.reserveCommonEvent(ext);
    }
    SceneManager._scene.debugClose();
    break;
  case 'battleNormal':
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('B' + ext.padZero(4) + ': ' + 
        ($dataTroops[ext].name || '<Unnamed>') +
        ' - Engaged! Normal Battle!');
    };
    SceneManager._scene.debugClose();
    SoundManager.playBattleStart();
    BattleManager.setup(ext, true, true);
    $gamePlayer.makeEncounterCount();
    SceneManager.push(Scene_Battle);
    break;
  case 'battleParty':
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('B' + ext.padZero(4) + ': ' + 
        ($dataTroops[ext].name || '<Unnamed>') +
        ' - Engaged! Party Advantage!');
    };
    SceneManager._scene.debugClose();
    SoundManager.playBattleStart();
    BattleManager.setup(ext, true, true);
    BattleManager._preemptive = true;
    $gamePlayer.makeEncounterCount();
    SceneManager.push(Scene_Battle);
    break;
  case 'battleTroop':
    if (Yanfly.Param.DebugConsoleMsg) {
      console.log('B' + ext.padZero(4) + ': ' + 
        ($dataTroops[ext].name || '<Unnamed>') +
        ' - Engaged! Enemy Advantage!');
    };
    SceneManager._scene.debugClose();
    SoundManager.playBattleStart();
    BattleManager.setup(ext, true, true);
    BattleManager._surprise = true;
    $gamePlayer.makeEncounterCount();
    SceneManager.push(Scene_Battle);
    break;
  case 'battlerMain':
    if (Yanfly.Param.DebugConsoleMsg) {
      var member = ext;
      if (!member) return;
      if (member.isActor()) {
        var name = member.name();
        var fmt = 'A%1: %2';
        var text = fmt.format(member.actorId().padZero(4), name);
      } else {
        var name = member.name();
        var fmt = 'E%1: %2';
        var text = fmt.format(member.enemyId().padZero(4), name);
      }
      console.log(text + ' - Battler Parameters Modification')
    };
    this.setBattler(member, 'main');
    break;
  case 'battlerAddParty':
    if (Yanfly.Param.DebugConsoleMsg) {
      var name = this._battler.name();
      var fmt = 'A%1: %2';
      var text = fmt.format(this._battler.actorId().padZero(4), name);
      console.log(text + ' - Added to Party');
    };
    $gameParty.addActor(this._battler.actorId());
    break;
  case 'battlerRemoveParty':
    if (Yanfly.Param.DebugConsoleMsg) {
      var name = this._battler.name();
      var fmt = 'A%1: %2';
      var text = fmt.format(this._battler.actorId().padZero(4), name);
      console.log(text + ' - Removed from Party');
    };
    $gameParty.removeActor(this._battler.actorId());
    break;
  case 'battlerRecoverHp':
    if (Yanfly.Param.DebugConsoleMsg) {
      var name = this._battler.name();
      var fmt = this._battler.isActor() ? 'A%1: %2' : 'E%1: %2';
      var id = this._battler.isActor() ? 
        this._battler.actorId() : this._battler.enemyId();
      var text = fmt.format(id.padZero(4), name);
      console.log(text + ' - Recovered Full ' + TextManager.hp);
    };
    this._battler.setHp(this._battler.mhp);
    break;
  case 'battlerRecoverMp':
    if (Yanfly.Param.DebugConsoleMsg) {
      var name = this._battler.name();
      var fmt = this._battler.isActor() ? 'A%1: %2' : 'E%1: %2';
      var id = this._battler.isActor() ? 
        this._battler.actorId() : this._battler.enemyId();
      var text = fmt.format(id.padZero(4), name);
      console.log(text + ' - Recovered Full ' + TextManager.mp);
    };
    this._battler.setMp(this._battler.mmp);
    break;
  case 'battlerRecoverTp':
    if (Yanfly.Param.DebugConsoleMsg) {
      var name = this._battler.name();
      var fmt = this._battler.isActor() ? 'A%1: %2' : 'E%1: %2';
      var id = this._battler.isActor() ? 
        this._battler.actorId() : this._battler.enemyId();
      var text = fmt.format(id.padZero(4), name);
      console.log(text + ' - Recovered Full ' + TextManager.tp);
    };
    this._battler.setTp(this._battler.maxTp());
    break;
  case 'battlerClearStates':
    if (Yanfly.Param.DebugConsoleMsg) {
      var name = this._battler.name();
      var fmt = this._battler.isActor() ? 'A%1: %2' : 'E%1: %2';
      var id = this._battler.isActor() ? 
        this._battler.actorId() : this._battler.enemyId();
      var text = fmt.format(id.padZero(4), name);
      console.log(text + ' - Cleared All Possible States');
    };
    this._battler.clearStates();
    this._battler.clearResult();
    break;
  case 'battlerShowEnemy':
    if (Yanfly.Param.DebugConsoleMsg) {
      var name = this._battler.name();
      var fmt = this._battler.isActor() ? 'A%1: %2' : 'E%1: %2';
      var id = this._battler.isActor() ? 
        this._battler.actorId() : this._battler.enemyId();
      var text = fmt.format(id.padZero(4), name);
      console.log(text + ' - Is now Shown');
    };
    this._battler.appear();
    this._battler.refresh();
    break;
  case 'battlerHideEnemy':
    if (Yanfly.Param.DebugConsoleMsg) {
      var name = this._battler.name();
      var fmt = this._battler.isActor() ? 'A%1: %2' : 'E%1: %2';
      var id = this._battler.isActor() ? 
        this._battler.actorId() : this._battler.enemyId();
      var text = fmt.format(id.padZero(4), name);
      console.log(text + ' - Is now Shown');
    };
    this._battler.hide();
    this._battler.refresh();
    break;
  case 'battlerList':
    if (Yanfly.Param.DebugConsoleMsg) {
      var member = ext;
      if (!member) return;
      if (member.isActor()) {
        var name = member.name();
        var fmt = 'A%1: %2';
        var text = fmt.format(member.actorId().padZero(4), name);
      } else {
        var name = member.name();
        var fmt = 'E%1: %2';
        var text = fmt.format(member.enemyId().padZero(4), name);
      }
      text += ' - Battler ' + (this._symbol === 'states' ? 'States' : 'Buffs');
      text += ' Modification';
      console.log(text);
    };
    this.setBattler(member, this._symbol);
    break;
  case 'battlerStatesSortID':
    this._sortStates = (this._sortStates === 'id1') ?
      'id2' : 'id1';
    if (Yanfly.Param.DebugConsoleMsg) {
      var text = 'Sort States: ID';
      console.log(text);
    }
    this._cachedStates = undefined;
    break;
  case 'battlerStatesSortPriority':
    this._sortStates = (this._sortStates === 'priority1') ?
      'priority2' : 'priority1';
    if (Yanfly.Param.DebugConsoleMsg) {
      var text = 'Sort States: Priority';
      console.log(text);
    }
    this._cachedStates = undefined;
    break;
  case 'battlerStatesSortName':
    this._sortStates = (this._sortStates === 'name1') ?
      'name2' : 'name1';
    if (Yanfly.Param.DebugConsoleMsg) {
      var text = 'Sort States: Name';
      console.log(text);
    }
    this._cachedStates = undefined;
    break;
  case 'battlerState':
    if (Yanfly.Param.DebugConsoleMsg) {
      var member = this._battler;
      if (!member) return;
      if (member.isActor()) {
        var name = member.name();
        var fmt = 'A%1: %2';
        var text = fmt.format(member.actorId().padZero(4), name);
      } else {
        var name = member.name();
        var fmt = 'E%1: %2';
        var text = fmt.format(member.enemyId().padZero(4), name);
      }
    };
    var state = ext;
    var states = member.states();
    var affected = states.contains($dataStates[state.id]);
    if (affected) {
      member.removeState(state.id);
    } else {
      member.addState(state.id);
    }
    member.clearResult();
    if (Yanfly.Param.DebugConsoleMsg) {
      states = member.states();
      if (states.contains($dataStates[state.id])) {
        text += ' - Applied State ' + state.name;
      } else {
        text += ' - Removed State ' + state.name;
      }
      console.log(text);
    };
    break;
  case 'battlerClearBuffs':
    for (var i = 0; i < 8; ++i) {
      var stacks = this._battler._buffs[i] || 0;
      if (stacks > 0) this._battler.removeBuff(i);
    }
    if (Yanfly.Param.DebugConsoleMsg) {
      var member = this._battler;
      if (!member) return;
      if (member.isActor()) {
        var name = member.name();
        var fmt = 'A%1: %2';
        var text = fmt.format(member.actorId().padZero(4), name);
      } else {
        var name = member.name();
        var fmt = 'E%1: %2';
        var text = fmt.format(member.enemyId().padZero(4), name);
      }
      text += ' - Cleared All Buffs';
      console.log(text);
    };
    break;
  case 'battlerClearDebuffs':
    for (var i = 0; i < 8; ++i) {
      var stacks = this._battler._buffs[i] || 0;
      if (stacks < 0) this._battler.removeBuff(i);
    }
    if (Yanfly.Param.DebugConsoleMsg) {
      var member = this._battler;
      if (!member) return;
      if (member.isActor()) {
        var name = member.name();
        var fmt = 'A%1: %2';
        var text = fmt.format(member.actorId().padZero(4), name);
      } else {
        var name = member.name();
        var fmt = 'E%1: %2';
        var text = fmt.format(member.enemyId().padZero(4), name);
      }
      text += ' - Cleared All Debuffs';
      console.log(text);
    };
    break;
  case 'battlerClearBuffsDebuffs':
    for (var i = 0; i < 8; ++i) {
      this._battler.removeBuff(i);
    }
    if (Yanfly.Param.DebugConsoleMsg) {
      var member = this._battler;
      if (!member) return;
      if (member.isActor()) {
        var name = member.name();
        var fmt = 'A%1: %2';
        var text = fmt.format(member.actorId().padZero(4), name);
      } else {
        var name = member.name();
        var fmt = 'E%1: %2';
        var text = fmt.format(member.enemyId().padZero(4), name);
      }
      text += ' - Cleared All Buffs & Debuffs';
      console.log(text);
    };
    break;
  case 'battlerBuff':
    if (this._battler.isBuffOrDebuffAffected(ext)) {
      this._battler.removeBuff(ext);
    } else {
      this._battler.addBuff(ext, 5);
    }
    if (Yanfly.Param.DebugConsoleMsg) {
      var member = this._battler;
      if (!member) return;
      if (member.isActor()) {
        var name = member.name();
        var fmt = 'A%1: %2';
        var text = fmt.format(member.actorId().padZero(4), name);
      } else {
        var name = member.name();
        var fmt = 'E%1: %2';
        var text = fmt.format(member.enemyId().padZero(4), name);
      }
      text += ' - Toggle ' + TextManager.param(ext) + ' Buff!';
      console.log(text);
    };
    break;
  case 'battlerAddAllSkills':
    var skillLength = $dataSkills.length;
    for (var i = 1; i < skillLength; ++i) {
      var skill = $dataSkills[i];
      if (skill) this._battler.learnSkill(i);
    }
    if (Yanfly.Param.DebugConsoleMsg) {
      var member = this._battler;
      if (!member) return;
      if (member.isActor()) {
        var name = member.name();
        var fmt = 'A%1: %2';
        var text = fmt.format(member.actorId().padZero(4), name);
      } else {
        var name = member.name();
        var fmt = 'E%1: %2';
        var text = fmt.format(member.enemyId().padZero(4), name);
      }
      text += ' - Add All Skills';
      console.log(text);
    };
    break;
  case 'battlerAddAllNamedSkills':
    var skillLength = $dataSkills.length;
    for (var i = 1; i < skillLength; ++i) {
      var skill = $dataSkills[i];
      if (!skill) continue;
      if (skill.name === '') continue;
      if (skill.stypeId < 1) continue;
      this._battler.learnSkill(i);
    }
    if (Yanfly.Param.DebugConsoleMsg) {
      var member = this._battler;
      if (!member) return;
      if (member.isActor()) {
        var name = member.name();
        var fmt = 'A%1: %2';
        var text = fmt.format(member.actorId().padZero(4), name);
      } else {
        var name = member.name();
        var fmt = 'E%1: %2';
        var text = fmt.format(member.enemyId().padZero(4), name);
      }
      text += ' - Add All Skills';
      console.log(text);
    };
    break;
  case 'battlerRemoveAllSkills':
    this._battler._skills = [];
    if (Yanfly.Param.DebugConsoleMsg) {
      var member = this._battler;
      if (!member) return;
      if (member.isActor()) {
        var name = member.name();
        var fmt = 'A%1: %2';
        var text = fmt.format(member.actorId().padZero(4), name);
      } else {
        var name = member.name();
        var fmt = 'E%1: %2';
        var text = fmt.format(member.enemyId().padZero(4), name);
      }
      text += ' - Add All Skills';
      console.log(text);
    };
    break;
  case 'item-max':
    var item = ext;
    if (Imported.YEP_ItemCore && DataManager.isIndependent(item)) {
      var num = 1;
    } else {
      var num = $gameParty.maxItems(item);
    }
    $gameParty.gainItem(item, -num);
    this.clearCachedItemList();
    if (Yanfly.Param.DebugConsoleMsg) {
      if (DataManager.isItem(item)) {
        var fmt = 'I%1: %2';
      } else if (DataManager.isWeapon(item)) {
        var fmt = 'W%1: %2';
      } else {
        var fmt = 'A%1: %2';
      }
      var id = item.id;
      var name = item.name;
      var text = fmt.format(id.padZero(4), name);
      text += ' - Set to zero in quantity';
      console.log(text);
    }
    break;
  case 'item-10':
    var item = ext;
    $gameParty.gainItem(item, -10);
    this.clearCachedItemList();
    if (Yanfly.Param.DebugConsoleMsg) {
      if (DataManager.isItem(item)) {
        var fmt = 'I%1: %2';
      } else if (DataManager.isWeapon(item)) {
        var fmt = 'W%1: %2';
      } else {
        var fmt = 'A%1: %2';
      }
      var id = item.id;
      var name = item.name;
      var text = fmt.format(id.padZero(4), name);
      text += ' - Reduced -10 in quantity';
      console.log(text);
    }
    break;
  case 'item-1':
    var item = ext;
    $gameParty.gainItem(item, -1);
    this.clearCachedItemList();
    var item = ext;
    if (Yanfly.Param.DebugConsoleMsg) {
      if (DataManager.isItem(item)) {
        var fmt = 'I%1: %2';
      } else if (DataManager.isWeapon(item)) {
        var fmt = 'W%1: %2';
      } else {
        var fmt = 'A%1: %2';
      }
      var id = item.id;
      var name = item.name;
      var text = fmt.format(id.padZero(4), name);
      text += ' - Reduced -1 in quantity';
      console.log(text);
    }
    break;
  case 'item+1':
    var item = ext;
    $gameParty.gainItem(item, 1);
    this.clearCachedItemList();
    var item = ext;
    if (Yanfly.Param.DebugConsoleMsg) {
      if (DataManager.isItem(item)) {
        var fmt = 'I%1: %2';
      } else if (DataManager.isWeapon(item)) {
        var fmt = 'W%1: %2';
      } else {
        var fmt = 'A%1: %2';
      }
      var id = item.id;
      var name = item.name;
      var text = fmt.format(id.padZero(4), name);
      text += ' - Added +1 in quantity';
      console.log(text);
    }
    break;
  case 'item+10':
    var item = ext;
    $gameParty.gainItem(item, 10);
    this.clearCachedItemList();
    if (Yanfly.Param.DebugConsoleMsg) {
      if (DataManager.isItem(item)) {
        var fmt = 'I%1: %2';
      } else if (DataManager.isWeapon(item)) {
        var fmt = 'W%1: %2';
      } else {
        var fmt = 'A%1: %2';
      }
      var id = item.id;
      var name = item.name;
      var text = fmt.format(id.padZero(4), name);
      text += ' - Added +10 in quantity';
      console.log(text);
    }
    break;
  case 'item+max':
    var item = ext;
    if (Imported.YEP_ItemCore && DataManager.isIndependent(item)) {
      var num = 1;
    } else {
      var num = $gameParty.maxItems(item);
    }
    $gameParty.gainItem(item, num);
    this.clearCachedItemList();
    if (Yanfly.Param.DebugConsoleMsg) {
      if (DataManager.isItem(item)) {
        var fmt = 'I%1: %2';
      } else if (DataManager.isWeapon(item)) {
        var fmt = 'W%1: %2';
      } else {
        var fmt = 'A%1: %2';
      }
      var id = item.id;
      var name = item.name;
      var text = fmt.format(id.padZero(4), name);
      text += ' - Set to maximum in quantity';
      console.log(text);
    }
    break;
  case 'item-make':
    var item = ext;
    $gameTemp.enableVarianceStock();
    $gameParty.gainItem(item, 1);
    $gameTemp.disableVarianceStock();
    this.clearCachedItemList();
    if (Yanfly.Param.DebugConsoleMsg) {
      if (DataManager.isItem(item)) {
        var fmt = 'I%1: %2';
      } else if (DataManager.isWeapon(item)) {
        var fmt = 'W%1: %2';
      } else {
        var fmt = 'A%1: %2';
      }
      var id = item.id;
      var name = item.name;
      var text = fmt.format(id.padZero(4), name);
      text += ' - Made independent ' + name + ' from template';
      console.log(text);
    }
    break;
  case 'item-clear':
    var item = ext;
    $gameParty.clearAllMatchingBaseItems(item, false);
    this.clearCachedItemList();
    if (Yanfly.Param.DebugConsoleMsg) {
      if (DataManager.isItem(item)) {
        var fmt = 'I%1: %2';
      } else if (DataManager.isWeapon(item)) {
        var fmt = 'W%1: %2';
      } else {
        var fmt = 'A%1: %2';
      }
      var id = item.id;
      var name = item.name;
      var text = fmt.format(id.padZero(4), name);
      text += ' - Cleared all un-equipped copies of ' + name;
      console.log(text);
    }
    break;
  case 'item-dupe':
    var itemId = ext.baseItemId;
    var group = DataManager.getDatabase(ext);
    var item = group[itemId];
    $gameTemp.enableVarianceStock();
    $gameParty.gainItem(item, 1);
    $gameTemp.disableVarianceStock();
    this.clearCachedItemList();
    if (Yanfly.Param.DebugConsoleMsg) {
      if (DataManager.isItem(item)) {
        var fmt = 'I%1: %2';
      } else if (DataManager.isWeapon(item)) {
        var fmt = 'W%1: %2';
      } else {
        var fmt = 'A%1: %2';
      }
      var id = item.id;
      var name = item.name;
      var text = fmt.format(id.padZero(4), name);
      text += ' - Made independent ' + name + ' from template';
      console.log(text);
    }
    break;
  case 'item-delete':
    var item = ext;
    if (Yanfly.Param.DebugConsoleMsg) {
      if (DataManager.isItem(item)) {
        var fmt = 'I%1: %2';
      } else if (DataManager.isWeapon(item)) {
        var fmt = 'W%1: %2';
      } else {
        var fmt = 'A%1: %2';
      }
      var id = item.id;
      var name = item.name;
      var text = fmt.format(id.padZero(4), name);
      if ($gameParty.checkItemIsEquipped(item)) {
        text += ' - Is currently equipped and cannot be removed';
      } else {
        text += ' - Removed ' + name;
      }
      console.log(text);
    }
    $gameParty.removeIndependentItem(item, false);
    DataManager.removeIndependentItem(item);
    this.clearCachedItemList();
    break;
  default:
    return;
  };
  SoundManager.playOk();
  this.refresh();
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

//=============================================================================
// End of File
//=============================================================================
};