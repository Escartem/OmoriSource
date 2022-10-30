//=============================================================================
// TDS Omori Battle System
// Version: 1.0
//=============================================================================
// Add to Imported List
var Imported = Imported || {} ; Imported.TDS_OmoriBattleSystem = true;
// Initialize Alias Object
var _TDS_ = _TDS_ || {} ; _TDS_.OmoriBattleSystem = _TDS_.OmoriBattleSystem || {};
//=============================================================================
 /*:
 * @plugindesc
 * Contains base functions and standards for OMORI.
 *
 * @author TDS
 *
 */
//=============================================================================


// // DISABLE GAMEPAD AND VOLUME
// Input._updateGamepadState = function(gamepad) { };
// ConfigManager.masterVolume = 0;
// AudioManager.playSe = function(se) {};

// let intantkill = Game_Action.prototype.apply
// Game_Action.prototype.apply = function(target) {
//   var result = target.result();
//   this.subject().clearResult();
//   result.clear();

//   if (target.isActor()) {
//     target.clearStates();
//     target.setHp(0);
//   } else {
//     intantkill.call(this, target);
//   }
// };



var yep_compatibilityTest = Game_Battler.prototype.startDamagePopup;
Game_Battler.prototype.startDamagePopup = function() {
  this.isDamagePopupRequested();
  yep_compatibilityTest.call(this);
};



Game_Party.prototype.actorIsAffectedByState = function(actorId, stateId) {
  return this.members().some(function(actor) {
    return actor && actor.actorId() == actorId && actor.isStateAffected(stateId);
  });
};


Game_Party.prototype.getOmori = function () {
  var actor = null;
  for (var i = 0; i < this.battleMembers().length; i++) {
    if (this.battleMembers()[i].actorId() === 1 || this.battleMembers()[i].actorId() === 8) {
      actor = this.battleMembers()[i];
      break;
    }
  }
  return actor;
};


BattleManager._showEncounterEffect = true;

BattleManager.setShowEncounterEffect = function(show) {
  BattleManager._showEncounterEffect = show;
}

var omori_scene_map_encounterEffectSpeed = Scene_Map.prototype.encounterEffectSpeed;
Scene_Map.prototype.encounterEffectSpeed = function() {
  if (BattleManager._showEncounterEffect) return omori_scene_map_encounterEffectSpeed.call(this);
  return 0;
};




//=============================================================================
// ** Scene_Boot
//-----------------------------------------------------------------------------
// The scene class for initializing the entire game.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriBattleSystem.Scene_Boot_loadSystemImages = Scene_Boot.loadSystemImages
//=============================================================================
// * Load System Images
//=============================================================================
Scene_Boot.loadSystemImages = function() {
  // Run Original Function
  _TDS_.OmoriBattleSystem.Scene_Boot_loadSystemImages.call(this);
  // ImageManager.reserveSystem('energy_stress_ekg_line');
  // ImageManager.reserveSystem('enemy_box');
  // ImageManager.reserveSystem('enemy_box_gradients')
  // ImageManager.reserveSystem('ACSArrows')
  // ImageManager.reserveSystem('items/i_43')
  // ImageManager.reserveSystem('BattleCommands_BlackSpace')
  // ImageManager.reserveSystem('ACS_Bubble')
};



//=============================================================================
// ** BattleManager
//-----------------------------------------------------------------------------
// The static class that manages battle progress.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriBattleSystem.BattleManager_setup = BattleManager.setup;
_TDS_.OmoriBattleSystem.BattleManager_initMembers = BattleManager.initMembers;
_TDS_.OmoriBattleSystem.BattleManager_isBusy = BattleManager.isBusy;
_TDS_.OmoriBattleSystem.BattleManager_startBattle = BattleManager.startBattle;
_TDS_.OmoriBattleSystem.BattleManager_endBattle   = BattleManager.endBattle;
_TDS_.OmoriBattleSystem.BattleManager_processDefeat = BattleManager.processDefeat;
_TDS_.OmoriBattleSystem.BattleManager_processAbort = BattleManager.processAbort;
_TDS_.OmoriBattleSystem.BattleManager_startTurn = BattleManager.startTurn;
//=============================================================================
// Class Variables
//=============================================================================
// BattleManager._retryObjList = ['gameTemp', 'gameSystem', 'gameTimer', 'gameMessage',
// 'gameSwitches', 'gameVariables', 'gameSelfSwitches', 'gameSelfVariables', 'gameActors',
// 'gameParty', 'gameTroop', 'gameMap', 'gamePlayer'];
BattleManager._retryObjList = ['gameTemp', 'gameSystem', 'gameTimer', 'gameMessage',
'gameSwitches', 'gameVariables', 'gameSelfSwitches', 'gameSelfVariables', 'gameActors',
'gameParty', 'gameTroop'];

// Set Battle Retried Flag
BattleManager._battleRetried = false;
// Battle Retry Setup Settings
BattleManager._battleRetrySetup = [0, true, true];

BattleManager._showDamage = true;
BattleManager._stressSpeed = 3;
BattleManager._showLowHpOverlay = true;
BattleManager._hideLowHpOverlay = false;
// Final Battle Phae Tracking
BattleManager._finalBattlePhase = 0;
//=============================================================================
// * Setup
//=============================================================================
BattleManager.setup = function(troopId, canEscape, canLose) {
  // Save Setup Data
  BattleManager._battleRetrySetup = [troopId, canEscape, canLose];
  // If Battle has not been retried
  if (!BattleManager._battleRetried) {
    // Reset Final Battle Phase Tracking
    BattleManager._finalBattlePhase = 0;
    // Make Battle Retry Data
    this.makeBattleRetryData();
  };
  // Run Original Function
  _TDS_.OmoriBattleSystem.BattleManager_setup.call(this, troopId, canEscape, canLose);
};
//=============================================================================
// * Initialize Members
//=============================================================================
BattleManager.initMembers = function() {
  // Run Original Function
  _TDS_.OmoriBattleSystem.BattleManager_initMembers.call(this);
  // Set Actor Command Index
  this._actorCommandIndex = 0;
  // Picture Display Layer
  this._pictureDisplayLayer = 'front';
  // Set hide low HP overlay to false
  this._hideLowHpOverlay = false;
};
//=============================================================================
// * Determine if Busy
//=============================================================================
BattleManager.isBusy = function() {
  // If Battle Intro is active return true
  if (this.isBattleIntroActive()) { return true; };
  // Return original function
  return _TDS_.OmoriBattleSystem.BattleManager_isBusy.call(this);
};
//=============================================================================
// * Start Battle
//=============================================================================
BattleManager.startBattle = function() {
  // Run Original Function
  _TDS_.OmoriBattleSystem.BattleManager_startBattle.call(this);
  // Increase Stress Count
  $gameParty.stressEnergyCount = 3;
  // Set Default Picture Display Layer
  this.setPictureDisplayLayer('top');

  // Get Scene
  const scene = SceneManager._scene;
  const spriteset = scene._spriteset;
  // Set Container
  let container = spriteset._pictureContainer;
  // Move Fade Layer to Scene
  scene.addChild(spriteset._fadeSprite);
};
//=============================================================================
// * End Battle
//=============================================================================
BattleManager.endBattle = function(result) {
  // Refresh Status
  this.refreshStatus();
  $gameParty.allMembers().forEach(function(actor) {
    actor._hasLeveled = false;
  });
  // Set Hide Low HP overlay flag to true
  this._hideLowHpOverlay = true;
  // Fadeout Battle Music
  if(!BattleManager.isBattleSameOfMapBgm()) {AudioManager.fadeOutBgm(2);}
  AudioManager.fadeOutBgs(2);
  // Fadeout BGS
  AudioManager.fadeOutDangerBgs(1);
  // Run Original Function
  _TDS_.OmoriBattleSystem.BattleManager_endBattle.call(this, result);
  // Stop Using victory face
  $gameParty.allMembers().forEach(function(actor) {
    actor._useVictoryFace = false;
  });
};
//=============================================================================
// * Play Victory ME
//=============================================================================
BattleManager.playVictoryMe = function() {
  // Play Victory ME
  AudioManager.playMe($gameSystem.victoryMe());
  // Loop Current ME
  AudioManager.loopCurrentME();
};
//=============================================================================
// * Process defeat
//=============================================================================
BattleManager.processDefeat = function() {
  this._logWindow.push('waitFrames', 30);
  this._logWindow.push('showGlobalDefeatMessage');
  // Run Original Function
  _TDS_.OmoriBattleSystem.BattleManager_processDefeat.call(this);
};
//=============================================================================
// * Process Abort
//=============================================================================
BattleManager.processAbort = function() {
  // Run Original Function
  _TDS_.OmoriBattleSystem.BattleManager_processAbort.call(this);
};
//=============================================================================
// * Start Turn
//=============================================================================
BattleManager.startTurn = function() {
  // Run Original Function
  _TDS_.OmoriBattleSystem.BattleManager_startTurn.call(this);
  // Reset Actor Command Index
  this._actorCommandIndex = 0;
};
//=============================================================================
// * Display Start Messages
//=============================================================================
BattleManager.displayStartMessages = function() { };
//=============================================================================
// * Display Escape Success Message
//=============================================================================
BattleManager.displayEscapeSuccessMessage = function() {
  this._logWindow.push('addText', TextManager.escapeStart.format($gameParty.name()));
  this._logWindow.push('wait');
};
//=============================================================================
// * Display Escape Failure Message
//=============================================================================
BattleManager.displayEscapeFailureMessage = function() {
  this._logWindow.push('addText', TextManager.escapeStart.format($gameParty.name()));
  this._logWindow.push('wait');
  this._logWindow.push('addText', '\\.' + TextManager.escapeFailure);
};
//=============================================================================
// * Display Victory
//=============================================================================
BattleManager.displayVictoryMessage = function() {
  this._logWindow.push('addText', TextManager.victory.format($gameParty.name()));
  this._logWindow.push('wait');
  this._logWindow.push('waitForInput')
};
//=============================================================================
// * Display Defeat Message
//=============================================================================
BattleManager.displayDefeatMessage = function() {
  this._logWindow.push('addText', TextManager.defeat.format($gameParty.name()));
  this._logWindow.push('wait', 60);
  //this._logWindow.push('waitForInput')
};
//=============================================================================
// * Display Exp
//=============================================================================
BattleManager.displayExp = function() {
  var exp = this._rewards.exp;
  if (exp > 0) {
    var text = TextManager.obtainExp.format(exp, TextManager.exp);
    this._logWindow.push('addText', '\\.' + text);
    this._logWindow.push('wait');
    this._logWindow.push('waitForInput')
  }
};
//=============================================================================
// * Display Gold
//=============================================================================
BattleManager.displayGold = function() {
  var gold = this._rewards.gold;
  if (gold > 0) {
    this._logWindow.push('addText', '\\.' + TextManager.obtainGold.format(gold));
    this._logWindow.push('wait');
    this._logWindow.push('waitForInput')
  }
};
//=============================================================================
// * Display Drop Items
//=============================================================================
BattleManager.displayDropItems = function() {
  var items = this._rewards.items;
  if (items.length > 0) {
    $gameMessage.newPage();
    items.forEach(function(item) {
      // $gameMessage.add(TextManager.obtainItem.format(item.name));
      this._logWindow.push('addText', TextManager.obtainItem.format(item.name));
      this._logWindow.push('wait');
    }, this);
    this._logWindow.push('waitForInput')
  }
};
//=============================================================================
// * Gain Experience
//=============================================================================
BattleManager.gainExp = function() {
  var exp = this._rewards.exp;
  $gameParty.allMembers().forEach(function(actor) {
      actor.gainExp(exp);
  });
  // Clear Game Message
  $gameMessage.clear();

  // Go Through Actors
  $gameParty.allMembers().forEach(function(actor) {
    // Go Through Data
    var data = actor._levelUpData;
    // If Data Exists
    if (data) {
      this._logWindow.push('clear');
      this._logWindow.push('playSE', {name: "BA_Happy", volume: 90, pitch: 100, pan: 0});
      this._logWindow.push('addText', TextManager.levelUp.format(actor._name, TextManager.level, data.level));
      this._logWindow.push('wait');
      this._logWindow.push('waitForInput');
      data.skills.forEach(function(skill) {
        this._logWindow.push('addText', TextManager.obtainSkill.format(skill.name));
        this._logWindow.push('wait');
      }, this);
      if (data.skills.length > 0) {
        this._logWindow.push('waitForInput')
      };
    };
    // Delete Actor Level Up Data
    delete actor._levelUpData;
  }, this);
  // Get Last Method
  var lastMethod = this._logWindow._methods[this._logWindow._methods.length-1];
  // If Last Method is not wait for input
  if (lastMethod && lastMethod.name !== 'waitForInput') {
    // if (this._logWindow._methods)
    this._logWindow.push('waitForInput')
  };
};
//=============================================================================
// * Display Start Messages
//=============================================================================
BattleManager.setBattleIntro = function(name) {
  // Set Battle Intro
  this._battleIntro = name;
};
//=============================================================================
// * Determine if Battle Intro is active
//=============================================================================
BattleManager.isBattleIntroActive = function() { return this._battleIntro; }
//=============================================================================
// * Make Battle Retry Data
//=============================================================================
BattleManager.makeBattleRetryData = function() {
  // Delete Previous Data
  if (this._battleRetryData) { delete this._battleRetryData; };
  // Initialize Battle Retry Data Object
  this._battleRetryData = {};
  // Get Object List
  let list = BattleManager._retryObjList;
  // Initialize Data Object
  let data = {};
  // Go Through List
  for (let i = 0; i < list.length; i++) {
    // Get Name
    let name = list[i];
    // Get Data Object
    let obj = window['$' + name];

    data[name] = window['$' + name];
    // // Make Deep copy of the object
    // this._battleRetryData[name] = JsonEx.makeDeepCopy(obj);
  };
  // Stringify Data
  this._battleRetryData = JsonEx.stringify(data);
};
//=============================================================================
// * Retry Processing
//=============================================================================
BattleManager.processRetry = function() {
  // Get Data
  let data = JsonEx.parse(this._battleRetryData);
  // If Data Exists
  if (data) {
    // Go Through List of Entries in data
    for (let [key, value] of Object.entries(data)) {
      // Set Data
      window['$' + key] = value;
    };
  };
  // return;
  BattleManager._battleRetried = true;
  // Set Final Battle Phase value
  $gameVariables.setValue(1220, BattleManager._finalBattlePhase);
  this.setup(...BattleManager._battleRetrySetup);
  SceneManager.goto(Scene_Battle);
};
//=============================================================================
// * Get Actor Input Order
//=============================================================================
BattleManager.getActorInputOrder = function() {
  let members = $gameParty.members();
  let order = $gameSwitches.value(7) ? [8, 10, 9, 11] : [1, 2, 3, 4];
  let list = []
  // Go through order
  for (let i = 0; i < order.length; i++) {
    let index = members.indexOf($gameActors.actor(order[i]));
    if (index > -1 && members[index].isAlive() && members[index].isBattleMember()) { list.push(index); }
  }
  // Return List
  return list;
};
//=============================================================================
// * Select Next Command
//=============================================================================
BattleManager.selectNextCommand = function() {
  if (this._actorCommandIndex < 0) { this._actorCommandIndex = 0;}
  // Set Index List
  let indexList = this.getActorInputOrder();
  // Set Actor Index
  this._actorIndex = indexList[this._actorCommandIndex];
  do {
    if (!this.actor() || !this.actor().selectNextCommand()) {
      this.changeActor(indexList[this._actorCommandIndex++], 'waiting');
      if (this._actorCommandIndex > indexList.length) {
        this.startTurn();
        break;
      };
    };
  } while (this.actor() && !this.actor().canInput());
};
//=============================================================================
// * Select Previous Command
//=============================================================================
BattleManager.selectPreviousCommand = function() {
  // Decrease Actor Command Index
  this._actorCommandIndex--
  // Set Index List
  let indexList = this.getActorInputOrder();
  // Set Actor Index
  this._actorIndex = indexList[this._actorCommandIndex];
  do {
    if (!this.actor() || !this.actor().selectPreviousCommand()) {
      // Get Actor
      let actor = this.actor();
      // If Actor exists
      if (actor) {
        // Get Current Action
        let currentAction = actor.currentAction();
        // Clear Current Action if it exists
        if (currentAction) { currentAction.clear(); };
      };
      this.changeActor(indexList[this._actorCommandIndex-1], 'undecided');
      // console.log(this._actorCommandIndex, this._actorIndex)
      if(!!this.actor() && !this.actor().canInput()) {this._actorCommandIndex--;}
      if (this._actorCommandIndex <= 0) {
        this._actorIndex = -1;
        this._actorCommandIndex = 0;
        return;
      }
    }
  } while (this.actor() && !this.actor().canInput());
  this.clearInputtingAction();
};
//=============================================================================
// * Set Picture Display Layer
//=============================================================================
BattleManager.setPictureDisplayLayer = function(layer = 'front') {
  // Set Picture Display Layer
  this._pictureDisplayLayer = layer.toLowerCase();
  // Get Scene
  const scene = SceneManager._scene;
  const spriteset = scene._spriteset;
  // Set Container
  let container = spriteset._pictureContainer;
  // Display Layer Switch Case
  switch (this._pictureDisplayLayer) {
    case 'top':
      // Add Container to the battle scene
      scene.addChild(this._spriteset._pictureContainer);
      break;
    case 'front':
      // Add child to original position
      spriteset.addChildAt(container, 2);
      break;
    case 'back':
      // Add child behind enemy sprites
      spriteset._battleField.addChildAt(container, 0);
      break;
  }
};
//=============================================================================
// * Start Fade Out
//=============================================================================
BattleManager.startFadeOut = function(duration, white) {
  // Start Fade Out
  SceneManager._scene.startFadeOut(duration, white);
};
//=============================================================================
// * Start Fade In
//=============================================================================
BattleManager.startFadeIn = function(duration, white) {
  // Start Fade Out
  SceneManager._scene.startFadeIn(duration, white);
};


BattleManager.setStressSpeed = function(speed) {
  this._stressSpeed = speed;
};

BattleManager.setShowHpOverlay = function(show) {
  this._showLowHpOverlay = show;
};



//=============================================================================
// ** Game_Enemy
//-----------------------------------------------------------------------------
// The game object class for an enemy.
//=============================================================================
// * Determine if Enemy can be scanned
//=============================================================================
Game_Enemy.prototype.canScan = function() {
  // Get Scan Immunity
  var scan = this.enemy().meta.ScanImmunity;
  // Return Scan State
  return scan === undefined ? true : false;
};



//=============================================================================
// ** Game_Action
//-----------------------------------------------------------------------------
// The game object class for a battle action.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriBattleSystem.Game_Action_apply = Game_Action.prototype.apply;
_TDS_.OmoriBattleSystem.Game_Action_clear = Game_Action.prototype.clear;
_TDS_.OmoriBattleSystem.Game_Action_isForOpponent = Game_Action.prototype.isForOpponent;
_TDS_.OmoriBattleSystem.Game_Action_isForFriend = Game_Action.prototype.isForFriend;
_TDS_.OmoriBattleSystem.Game_Action_needsSelection = Game_Action.prototype.needsSelection;
_TDS_.OmoriBattleSystem.Game_Action_makeTargets = Game_Action.prototype.makeTargets;
//=============================================================================
// * Apply
//=============================================================================
Game_Action.prototype.clear = function() {
  // Run Original Function
  _TDS_.OmoriBattleSystem.Game_Action_clear.call(this);
  // Clear Target Group (0: Party, 1: Enemies)
  this._targetGroup = null;
};
//=============================================================================
// * Set Target Group
//=============================================================================
Game_Action.prototype.setTargetGroup = function(index) { this._targetGroup = index; };
//=============================================================================
// * Determine if action can change target groups
//=============================================================================
Game_Action.prototype.canChangeTargetGroups = function() {
  // Get Item
  let item = this.item();
  // Return true if item has note tags
  if (item && item.meta['Enemy or Actor Select']) { return true; };
  // Return false by default
  return false;
};

//=============================================================================
// * Check if the user is targettable;
//=============================================================================

Game_Action.prototype.notTargetUser = function() {
  const item = this.item();
  if(!!item && !!item.meta["Not User"]) {return true;}
  return false;
}

//=============================================================================
// * Determine if Action is for opponent
//=============================================================================
Game_Action.prototype.isForOpponent = function() {
  if (this._targetGroup === 1) { return true; };
  // Return Original Function
  return _TDS_.OmoriBattleSystem.Game_Action_isForOpponent.call(this);
};
//=============================================================================
// * Determine if Action is for Friend
//=============================================================================
Game_Action.prototype.isForFriend = function() {
  if (this._targetGroup === 0) { return true; };
  // Return Original Function
  return _TDS_.OmoriBattleSystem.Game_Action_isForFriend.call(this);
};
//=============================================================================
// * Determine if Action needs Selection
//=============================================================================
Game_Action.prototype.needsSelection = function() {
  // If Action is for everybody return false
  if (this.isForEverybody()) { return false; };
  // Return Original Function
  return _TDS_.OmoriBattleSystem.Game_Action_needsSelection.call(this);
};
//=============================================================================
// * Determine if Action is for everybody
//=============================================================================
Game_Action.prototype.isForEverybody = function() {
  // Get Item
  let item = this.item();
  // If item exist
  if (item) {
    if (item.meta.Target && item.meta.Target.trim().toLowerCase() === 'everybody') {
      return true;
    }
  };
  // Return false by default
  return false;
};
//=============================================================================
// * Make Targets
//=============================================================================
Game_Action.prototype.makeTargets = function() {
  // If action is for everyone
  if (this.isForEverybody()) {
    // Initialize Target Array
    let targets = this.friendsUnit().aliveMembers().concat(this.opponentsUnit().aliveMembers());
    // Return Targets
    return this.repeatTargets(targets);
  };
  // Return Original Function
  return _TDS_.OmoriBattleSystem.Game_Action_makeTargets.call(this);
};
//=============================================================================
// * Apply
//=============================================================================
Game_Action.prototype.apply = function(target) {
  // Run Original Function
  _TDS_.OmoriBattleSystem.Game_Action_apply.call(this, target);
  // Get Result
  let result = target.result();
  // Check iff hit
  let hit = result.isHit();

  // If Hit
  if (hit) {
    // Get Element Rate
    let elementRate = this.calcElementRate(target);

    // Set elemental results
    result.elementStrong = elementRate > 1;
    result.elementWeak = elementRate < 1;

    console.log(this.subject().name(),  elementRate);
  };


  // If Target is an enemy
  if (target.isEnemy()) {
    // Get Item
    let item = this.item();
    // If result was a hit
    if (hit) {
      // If scanning enemy
      if (item && item.meta.ScanEnemy && target.canScan()) {
        // Scan Enemy
        $gameParty.addScannedEnemy(target.enemyId());
      };
    };
  } else {
    // If result was a hit
    if (hit) {
      // If HP damage is more than 0
      if (result.hpDamage > 0) {
        // Increase Stress Count
        $gameParty.stressEnergyCount++;
      };
    };
  };
};





//=============================================================================
// ** Game_ActionResult
//-----------------------------------------------------------------------------
// The game object class for a result of a battle action. For convinience, all
// member variables in this class are public.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriBattleSystem.Game_ActionResult_clear = Game_ActionResult.prototype.clear;
//=============================================================================
// * Clear
//=============================================================================
Game_ActionResult.prototype.clear = function() {
  // Run Original Function
  _TDS_.OmoriBattleSystem.Game_ActionResult_clear.call(this);
  // Set Elemental Strong & Weak flags
  this.elementStrong = false;
  this.elementWeak = false;
};

















//=============================================================================
// ** Scene_Battle
//-----------------------------------------------------------------------------
// The scene class of the battle screen.
//=============================================================================
// Alias Listing
//=============================================================================


_TDS_.OmoriBattleSystem.Scene_Battle_initialize                 = Scene_Battle.prototype.initialize;
_TDS_.OmoriBattleSystem.Scene_Battle_create = Scene_Battle.prototype.create;


_TDS_.OmoriBattleSystem.Scene_Battle_start                      = Scene_Battle.prototype.start;
_TDS_.OmoriBattleSystem.Scene_Battle_update                     = Scene_Battle.prototype.update
_TDS_.OmoriBattleSystem.Scene_Battle_createDisplayObjects       = Scene_Battle.prototype.createDisplayObjects;
_TDS_.OmoriBattleSystem.Scene_Battle_createAllWindows           = Scene_Battle.prototype.createAllWindows;
_TDS_.OmoriBattleSystem.Scene_Battle_createActorCommandWindow   = Scene_Battle.prototype.createActorCommandWindow
_TDS_.OmoriBattleSystem.Scene_Battle_createStatusWindow         = Scene_Battle.prototype.createStatusWindow;
_TDS_.OmoriBattleSystem.Scene_Battle_createActorWindow          = Scene_Battle.prototype.createActorWindow;
_TDS_.OmoriBattleSystem.Scene_Battle_createEnemyWindow          = Scene_Battle.prototype.createEnemyWindow;
_TDS_.OmoriBattleSystem.Scene_Battle_commandFight               = Scene_Battle.prototype.commandFight;
_TDS_.OmoriBattleSystem.Scene_Battle_commandEscape              = Scene_Battle.prototype.commandEscape;
_TDS_.OmoriBattleSystem.Scene_Battle_selectActorSelection       = Scene_Battle.prototype.selectActorSelection;
_TDS_.OmoriBattleSystem.Scene_Battle_onActorOk                  = Scene_Battle.prototype.onActorOk;
_TDS_.OmoriBattleSystem.Scene_Battle_onActorCancel              = Scene_Battle.prototype.onActorCancel;


_TDS_.OmoriBattleSystem.Scene_Battle_selectEnemySelection       = Scene_Battle.prototype.selectEnemySelection;
_TDS_.OmoriBattleSystem.Scene_Battle_onEnemyOk                  = Scene_Battle.prototype.onEnemyOk;
_TDS_.OmoriBattleSystem.Scene_Battle_onEnemyCancel              = Scene_Battle.prototype.onEnemyCancel;



_TDS_.OmoriBattleSystem.Scene_Battle_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;
_TDS_.OmoriBattleSystem.Scene_Battle_startActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;


_TDS_.OmoriBattleSystem.Scene_Battle_commandItem                = Scene_Battle.prototype.commandItem;
_TDS_.OmoriBattleSystem.Scene_Battle_onItemCancel               = Scene_Battle.prototype.onItemCancel;
_TDS_.OmoriBattleSystem.Scene_Battle_onItemOk                   = Scene_Battle.prototype.onItemOk;


_TDS_.OmoriBattleSystem.Scene_Battle_commandSkill               = Scene_Battle.prototype.commandSkill;
_TDS_.OmoriBattleSystem.Scene_Battle_onSkillOk                  = Scene_Battle.prototype.onSkillOk;
_TDS_.OmoriBattleSystem.Scene_Battle_onSkillCancel              = Scene_Battle.prototype.onSkillCancel;

_TDS_.OmoriBattleSystem.Scene_Battle_selectNextCommand          = Scene_Battle.prototype.selectNextCommand;
_TDS_.OmoriBattleSystem.Scene_Battle_endCommandSelection        = Scene_Battle.prototype.endCommandSelection;
//=============================================================================
// * Object Initialization
//=============================================================================
Scene_Battle.prototype.initialize = function() {
  // Set Image reservation Id
  this._imageReservationId = 'battle';
  // Create Movement Object
  this.move = new Object_Movement();
  // Create Main Tone Filter
  this.createMainToneFilter();
  // Run Original Function
  _TDS_.OmoriBattleSystem.Scene_Battle_initialize.call(this);
};
//=============================================================================
// * Start Battle
//=============================================================================
Scene_Battle.prototype.start = function() {
  // Run Original Function
  _TDS_.OmoriBattleSystem.Scene_Battle_start.call(this);
  // Start Fade in
  // Fix for Party Command Window
  //this.startFadeIn(this.fadeSpeed(), $gameSwitches.value(369));
};
//=============================================================================
// * Create Fade Sprite
//=============================================================================
Scene_Battle.prototype.createFadeSprite = function(white) {
  // Run Original Function
  Scene_Base.prototype.createFadeSprite.call(this);
  // If fade sprite exists move it to the top
  if (this._fadeSprite) { this.addChild(this._fadeSprite); };
};
//=============================================================================
// * Create
//=============================================================================
Scene_Battle.prototype.create = function() {
  if (BattleManager._battleRetried) {
    BattleManager._waitingForRetryVideo = BattleManager._isFinalBattle;
    this._retryFadeInAnim = 20;
    this._currentRetryFadeInAnim = this._retryFadeInAnim;
    $gameScreen.startFadeOut(1);
    _TDS_.OmoriBattleSystem.Scene_Battle_create.call(this);
    this._stressBar.opacity = 0;
//    this._partyCommandWindow._commandSprites.forEach(function(sprite) {
//      sprite.opacity = 0;
//    });
    this._helpWindow.opacity = 255;
    this._logWindow.opacity = 255;
    this._logWindow.visible = true;
    this._partyCommandWindow.opacity = 0;
    this._actorWindow.opacity = 255;
    this._faceWindowsContainer.opacity = 255;
    this._scrollTextWindow.opacity = 255;
  //  this._partyCommandWindow._customCursorRectSpriteContainer.opacity = 0;
  } else {
    _TDS_.OmoriBattleSystem.Scene_Battle_create.call(this);
  }
};
//=============================================================================
// * Initialize Atlas Lists
//=============================================================================
Scene_Battle.prototype.initAtlastLists = function() {
  // Run Original Function
  Scene_Base.prototype.initAtlastLists.call(this);
  // Add Required Atlas
  this.addRequiredAtlas('battleATLAS');
};
//=============================================================================
// * Load Reserved Bitmaps
//=============================================================================
Scene_Battle.prototype.loadReservedBitmaps = function() {
  // Run Original Function
  Scene_Base.prototype.loadReservedBitmaps.call(this);
  // Load Input Icons
  ImageManager.loadInputIcons();
  // Reserve System Images
  ImageManager.reserveSystem('enemy_box',  0, this._imageReservationId);
  ImageManager.reserveSystem('enemy_box_gradients',  0, this._imageReservationId);
  ImageManager.reserveSystem('hp_icon',  0, this._imageReservationId);
};
//=============================================================================
// * Frame Update
//=============================================================================
Scene_Battle.prototype.update = function() {
  // Run Original Function
  _TDS_.OmoriBattleSystem.Scene_Battle_update.call(this);



  if (this._currentRetryFadeInAnim >= 0) {
    if (!BattleManager._waitingForRetryVideo) {
      $gameScreen.startFadeIn(this._retryFadeInAnim);
      var opacityPerUpdate = 255 / this._retryFadeInAnim;
      this._currentRetryFadeInAnim--;

      this._stressBar.opacity += opacityPerUpdate;
      this._partyCommandWindow._commandSprites.forEach(function(sprite) {
        sprite.opacity += opacityPerUpdate;
      });
      this._helpWindow.opacity += opacityPerUpdate;
      this._logWindow.opacity += opacityPerUpdate;
      this._logWindow.visible = true;
      //this._partyCommandWindow.opacity += opacityPerUpdate;
      this._actorWindow.opacity += opacityPerUpdate;
      this._faceWindowsContainer.opacity += opacityPerUpdate;
      this._scrollTextWindow.opacity += opacityPerUpdate;
      this._partyCommandWindow._customCursorRectSpriteContainer.opacity += opacityPerUpdate;
      BattleManager._battleRetried = false;
    }
  }
  // Update Movement Object
  this.move.update();
  // Update Main Tone Filter
  this.updateMainToneFilter();
};
//=============================================================================
// * Create Main Tone Filter
//=============================================================================
Scene_Battle.prototype.createMainToneFilter = function() {
  // Using Tone Filter Flag
  this._usingToneFilter = false;
  // Main Status Tone
  this._mainStatusTone = [0, 0, 0, 0];
  // Create Main Status Filter
  this._mainStatusToneFilter = new ToneFilter();
  // Adjust Tone Filter
  this._mainStatusToneFilter.adjustTone(this._mainStatusTone[0], this._mainStatusTone[1], this._mainStatusTone[2]);
  this._mainStatusToneFilter.adjustSaturation(-this._mainStatusTone[3]);

    // this._stressBar.filters = [this._mainStatusToneFilter]
    // this._logWindow.filters = [this._mainStatusToneFilter]
    // this._statusWindow.filters = [this._mainStatusToneFilter]
    // this._faceWindowsContainer.filters = [this._mainStatusToneFilter]
    // this._logWindow._scrollTextSprite.filters = [this._mainStatusToneFilter]
    // this._helpWindow.filters = [this._mainStatusToneFilter]


    // this._mainStatusContainer.filters = [this._mainStatusToneFilter];
    // this._mainStatusToneFilter.filterArea = new Rectangle(-margin, -margin, width, height);

   // this._mainStatusContainer.setBlendColor([255, 255, 0, 255])

   // var mainStatusList = [this._logWindow, this._stressBar];

   // for (var i = 0; i < mainStatusList.length; i++) {
   //   var obj = mainStatusList[i];
   //   obj.filters = [this._mainStatusToneFilter]
   // }

  // this._statusWindow.visible = false;
  // this._partyCommandWindow.visible = false;
  // this._actorCommandWindow.visible = false
};
//=============================================================================
// * Update Main Tone Filter
//=============================================================================
Scene_Battle.prototype.updateMainToneFilter = function() {
  // Get Message Busy Flag
  var messageBusy = $gameMessage.isBusy();
  var isFilterNotNeededBattle = [891,444,451,134,135,136].contains($gameTroop._troopId);
  // If Not using tone filter and message is busy
  if (!this._usingToneFilter && messageBusy && !isFilterNotNeededBattle) {
    // Set Using Tone filter flag
    this._usingToneFilter = true;
    // Get Main Status Objects
    var objects = [this._stressBar, this._faceWindowsContainer, this._logWindow._scrollTextSprite, this._helpWindow]
    // Set Main Status Objects Filters
    for (var i = 0; i < objects.length; i++) { objects[i].filters = [this._mainStatusToneFilter]; };
  };
  // If Using Tone filter
  if (this._usingToneFilter) {
    // Get Rate
    var rate = this._messageWindow.openness / 255;
    var tone = -100 * rate;
    // Set Main Status Tone
    this._mainStatusTone[0] = tone;
    this._mainStatusTone[1] = tone;
    this._mainStatusTone[2] = tone;
    // Set Main Status Tone Filter Tone
    this._mainStatusToneFilter.reset();
    this._mainStatusToneFilter.adjustTone(this._mainStatusTone[0], this._mainStatusTone[1], this._mainStatusTone[2]);
    this._mainStatusToneFilter.adjustSaturation(-this._mainStatusTone[3]);
    // If rate is 0 and message is not busy
    if (rate === 0 && !messageBusy) {
      // Set Using filter flag to false
      this._usingToneFilter = false;
      // Get Main Status Objects
      var objects = [this._stressBar, this._faceWindowsContainer, this._logWindow._scrollTextSprite, this._helpWindow]
      // Clear Main Status Objects Filters
      for (var i = 0; i < objects.length; i++) { objects[i].filters = [this._spriteset.getToneFilter()] };
    };
  };
};
//=============================================================================
// * Create All Windows
//=============================================================================
Scene_Battle.prototype.createAllWindows = function() {


  // Run Orignal Function
  _TDS_.OmoriBattleSystem.Scene_Battle_createAllWindows.call(this);

  this._partyCommandWindow.x = 140
  this._partyCommandWindow.y = Graphics.height //- 124;
  this._actorCommandWindow.x = 140;
  this._actorCommandWindow.y = Graphics.height //- 124;


  // Create Stress Bar
  this.createStressBar();


  // MAKE A NEW SPRITE CLASS THAT HANDLES THE BORDER EFFECT
  // AND TRACKS THINGS ASYNCRONOUSLY.

  var bitmap = new Bitmap(Graphics.width, Graphics.height);
  // bitmap.fillAll('rgba(255, 0, 0, 0.8)');


  // Create Low HP Overlay Sprite
  this._lowHpOverlay = new Sprite_BattleLowHpOverlay();
  this.addChild(this._lowHpOverlay)


  // this._windowTest = new Window_Base(0, 0, 400, 400);
  // this.addChild(this._windowTest)


  // this._battlerIntroBackground = new Sprite(new Bitmap(Graphics.width, Graphics.height));
  // this._battlerIntroBackground.bitmap.fillAll('rgba(255, 255, 255, 1)')
  // this.addChildAt(this._battlerIntroBackground, 1);


  // this._battlerIntroContainer = new Sprite(ImageManager.loadAtlas('battle_omori_intro'))
  // this._battlerIntroContainer.x = (Graphics.width / 2) - 100;
  // this._battlerIntroContainer.y = (Graphics.height / 2) + 22;

  // this._battlerIntroContainer.setFrame(0, 0, 375, 435)
  // this._battlerIntroContainer.anchor.set(0.5, 0.5)
  // this.addChildAt(this._battlerIntroContainer, 2);


};
//=============================================================================
// * Update Status Window
//=============================================================================
Scene_Battle.prototype.updateStatusWindow = function() { };
//=============================================================================
// * Update Window Position
//=============================================================================
Scene_Battle.prototype.updateWindowPositions = function() { };
//=============================================================================
// * Create Display Objects
//=============================================================================
Scene_Battle.prototype.createDisplayObjects = function() {
  // Run Original Function
  _TDS_.OmoriBattleSystem.Scene_Battle_createDisplayObjects.call(this);
  // Create Battle Intro container
  this.createBattleIntroContainer();
};
//=============================================================================
// * Create Battle Intro Container
//=============================================================================
Scene_Battle.prototype.createBattleIntroContainer = function() {
  // Create Battle Intro container Sprite
  this._battleIntroContainer = new Sprite_BattleIntroContainer(BattleManager._battleIntro);
  this.addChild(this._battleIntroContainer);
};
//=============================================================================
// * Create Actor Command Window
//=============================================================================
Scene_Battle.prototype.createActorCommandWindow = function() {
  // Run Original Function
  _TDS_.OmoriBattleSystem.Scene_Battle_createActorCommandWindow.call(this);
  this._actorCommandWindow.setHandler('guard',  this.commandItem.bind(this, 'snacks'));
  this._actorCommandWindow.setHandler('item',   this.commandItem.bind(this, 'toys'));
};
//=============================================================================
// * Create Status Window
//=============================================================================
Scene_Battle.prototype.createStatusWindow = function() {
  // Run Original Function
  _TDS_.OmoriBattleSystem.Scene_Battle_createStatusWindow.call(this);
  // Create Face Windows
  this.createFaceWindows();
};
//=============================================================================
// * Create Actor Window
//=============================================================================
Scene_Battle.prototype.createActorWindow = function() {
  // Run Original Function
  _TDS_.OmoriBattleSystem.Scene_Battle_createActorWindow.call(this);
  // Set Face Windows
  this._actorWindow._faceWindows = this._faceWindows;
  this._actorWindow.visible = false;
  // Set Group Target Swap
  this._actorWindow._groupTargetSwap = this.groupTargetSwap.bind(this, 0);
};
//=============================================================================
// * Create Actor Window
//=============================================================================
Scene_Battle.prototype.createEnemyWindow = function() {
  // Run Original Function
  _TDS_.OmoriBattleSystem.Scene_Battle_createEnemyWindow.call(this);
  // Set Group Target Swap
  this._enemyWindow._groupTargetSwap = this.groupTargetSwap.bind(this, 1);
  this._enemyWindow.y = Graphics.height;
};
//=============================================================================
// * Create Actor Window
//=============================================================================
Scene_Battle.prototype.groupTargetSwap = function(type) {
  // Get Action
  let action = BattleManager.inputtingAction();
  // Clear Input
  Input.update();
  // If Action Exists
  if (action && action.canChangeTargetGroups()) {
    if (type === 0) {
      action.setTargetGroup(1);
      this._actorWindow.deselect();
      this._actorWindow.deactivate();
      this.hidePartyCommand();
      this.hideItemWindow();
      this.hideSkillWindow();
      this._statusWindow.select(BattleManager.actor().battleStatusIndex());
      this.selectEnemySelection()
    } else {
      action.setTargetGroup(0);
      this._enemyWindow.deselect();
      this._enemyWindow.deactivate();
      // this._actorWindow.deselect();
      this._actorWindow.activate();
      this.selectActorSelection();
    };
  };
}
//=============================================================================
// * Create Help Window
//=============================================================================
Scene_Battle.prototype.createHelpWindow = function() {
  // Create Help Window
  this._helpWindow = new Window_OmoMenuHelp(360, 93);
  this._helpWindow.x = 140;
  this._helpWindow.y = -4
  this._helpWindow._iconRate = 0.75;
  this.addChild(this._helpWindow);
};
//=============================================================================
// * Create Skill Window
//=============================================================================
Scene_Battle.prototype.createSkillWindow = function() {
  var wy = this._helpWindow.y + this._helpWindow.height;
  var wh = this._statusWindow.y - wy;
  this._skillWindow = new Window_BattleSkill(140, Graphics.height + 30, 360, 100);
  this._skillWindow.setHelpWindow(this._helpWindow);
  this._skillWindow.setHandler('ok',     this.onSkillOk.bind(this));
  this._skillWindow.setHandler('cancel', this.onSkillCancel.bind(this));
  this.addWindow(this._skillWindow);
};
//=============================================================================
// * Create Item Window
//=============================================================================
Scene_Battle.prototype.createItemWindow = function() {
  this._itemWindow = new Window_BattleItem(140, Graphics.height + 30, 360, 100);
  this._itemWindow.setHelpWindow(this._helpWindow);
  this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
  this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
  this.addWindow(this._itemWindow);
};
//=============================================================================
// * Command Fight
//=============================================================================
Scene_Battle.prototype.commandFight = function() {
  if ($gameVariables.value(22) === 5) {
    BattleManager.selectNextCommand();
    let skill = $dataSkills[1];
    BattleManager.inputtingAction().setSkill(skill.id);
    BattleManager.actor().setLastBattleSkill(skill);
    this.selectNextCommand();
    return;
  };
  // Run Original Function
  _TDS_.OmoriBattleSystem.Scene_Battle_commandFight.call(this);
};
//=============================================================================
// * Command Escape
//=============================================================================
Scene_Battle.prototype.commandEscape = function() {
  // Run Original Function
  _TDS_.OmoriBattleSystem.Scene_Battle_commandEscape.call(this);


  // Hide Party Command
  this.hidePartyCommand();
};
//=============================================================================
// * Select Actor Selection
//=============================================================================
Scene_Battle.prototype.selectActorSelection = function() {
  // Run Original Function
  _TDS_.OmoriBattleSystem.Scene_Battle_selectActorSelection.call(this);
  // Select Selected Status Window Index
  this._actorWindow.select(this._statusWindow.index());
};
//=============================================================================
// * On Actor Ok
//=============================================================================
Scene_Battle.prototype.onActorOk = function() {
  // Get Action
  let action = BattleManager.inputtingAction();
  // Get Target
  let target = $gameParty.memberAtStatusIndex(this._actorWindow.index());
  // Get Actor Index
  let actorIndex = target.index();
  // If Action is for dead friend and target is not dead
  if (action.isForDeadFriend() && !target.isDead()) {
    SoundManager.playBuzzer();
    this._actorWindow.activate()
    return
  };
  if(action.notTargetUser() && BattleManager.actor().name() === target.name()) {
    SoundManager.playBuzzer();
    this._actorWindow.activate();
    return;
  }
  // Run Original Function
  _TDS_.OmoriBattleSystem.Scene_Battle_onActorOk.call(this);
  // Set Target
  action.setTarget(actorIndex);
  this.hideItemWindow();
  this.hideSkillWindow();
  this._skillWindow.visible = true;
  this._itemWindow.visible = true;
  this._helpWindow.hide();
  if(!BattleManager.actor()) {this._logWindow.clear();}
};
//=============================================================================
// * On Actor Cancel
//=============================================================================
Scene_Battle.prototype.onActorCancel = function() {
  // Run Original Function
  _TDS_.OmoriBattleSystem.Scene_Battle_onActorCancel.call(this);
  // Select Actor at battle status index
  this._statusWindow.select(BattleManager.actor().battleStatusIndex());

  // Current Symbol Switch Case
  switch (this._actorCommandWindow.currentSymbol()) {
    case 'attack':
      this.showPartyCommand();
    break;
    case 'skill':
      this.showPartyCommand();
      this.showSkillWindow();
      break;
    case 'item':
      this.showPartyCommand();
      this.showItemWindow();
      break;
    case 'guard':
      this._itemWindow.show();
      this._itemWindow.activate();
      this._itemWindow.callUpdateHelp();
      // this._itemWindow.select(1)
      this._helpWindow.show();
      // this._helpWindow.contents.fillAll('rgba(255, 0, 0,  0.5)')
    break;
  };
};
//=============================================================================
// * Select Enemy Selection
//=============================================================================
Scene_Battle.prototype.selectEnemySelection = function() {
  // Run Original Function
  _TDS_.OmoriBattleSystem.Scene_Battle_selectEnemySelection.call(this);
  this.hidePartyCommand();
  this.hideSkillWindow();
  this.hideItemWindow();
};
//=============================================================================
// * On Enemy Ok
//=============================================================================
Scene_Battle.prototype.onEnemyOk = function() {
  // Run Original Function
  _TDS_.OmoriBattleSystem.Scene_Battle_onEnemyOk.call(this);
  this.hideItemWindow();
  this.hideSkillWindow();
  this._skillWindow.visible = true;
  this._itemWindow.visible = true;
  this._helpWindow.hide();

  // Clear Troop Select
  $gameTroop.select(null);
  if(!BattleManager.actor()) {this._logWindow.clear();}
  // // Get Members
  // let members = $gameTroop.members();
  // for (let i = 0; i < members.length; i++) { members[i].deselect(); };
};
//=============================================================================
// * On Enemy Cancel
//=============================================================================
Scene_Battle.prototype.onEnemyCancel = function() {
  // Run Original Function
  _TDS_.OmoriBattleSystem.Scene_Battle_onEnemyCancel.call(this);
  switch (this._actorCommandWindow.currentSymbol()) {
  case 'attack':
  case 'actionSkill':
    this.showPartyCommand();
  break;
  case 'skill':
    this.showPartyCommand();
    this.showSkillWindow();
    break;
  case 'item':
    this.showPartyCommand();
    this.showItemWindow();
    break;
  }
};
//=============================================================================
// * Create Face Windows
//=============================================================================
Scene_Battle.prototype.createFaceWindows = function() {
  // Create Face Windows Container
  this._faceWindowsContainer = new Sprite();
  this.addChild(this._faceWindowsContainer);
  // Initialize
  this._faceWindowsContainer._displayLayersContainer = new Sprite();
  this._faceWindowsContainer.addChild(this._faceWindowsContainer._displayLayersContainer);
  // Get Layers container
  var layers = this._faceWindowsContainer._displayLayersContainer
  // Create Layer List
  var layerList = ['behind', 'statusBack', 'face', 'polaroid', 'front']
  // Create Layers
  for (var i = 0; i < layerList.length; i++) {
    var name = '_' + layerList[i];
    var layer = new Sprite();
    layers[name] = layer;
    layers.addChild(layer)
  }

  // Initialize Face Windows Array
  this._faceWindows = [];
  // Position Indexes
  var indexes = [2, 3, 0, 1]
  // Create Face Windows
  for (var i = 0; i < 4; i++) {
    // Get Index
    var index = i;
    var x = 14 + ((index % 2) * ((Graphics.width - 28) - 114));
    var y = 5  + (Math.floor(index / 2) * ((Graphics.height - 16) - 164));
    // Create Face Window
    var faceWindow = new Window_OmoriBattleActorStatus(i, layers, x, y);
    faceWindow.x = !faceWindow.actor() ? i % 2 ? Graphics.width : -faceWindow.windowWidth() : x;
    faceWindow.y = y;
    this._faceWindows[i] = faceWindow;
    this._faceWindowsContainer.addChild(faceWindow)
  };

  // Create Animation Sprite for Layers
  for (var i = 0; i < layerList.length; i++) {
    // Get Layer
    layer = layers['_' + layerList[i]]
    // Create Face Animation Sprite
    var sprite = new Sprite_BattleFaceAnimation();
    sprite._effectTarget = sprite;
    layers['_animation' + i] = sprite;
    layer.addChild(sprite);
  };

  // Set status Windows Face Windows
  this._statusWindow._faceWindows = this._faceWindows;
};
//=============================================================================
// * Create Face Windows
//=============================================================================
Scene_Battle.prototype.createStressBar = function() {
  // Create Stress Bar
  this._stressBar = new Sprite_StressBar();
  this._stressBar.x = 140;
  this._stressBar.y = Graphics.height - 56;
  this._stressBar.visible = !$gameSwitches.value(41);

  if ([2, 5, 6].contains($gameVariables.value(22))) {
    this._stressBar.visible = false;
  }
  this.addChildAt(this._stressBar,2);
};
//=============================================================================
// * Start Party Command Selection
//=============================================================================
Scene_Battle.prototype.startPartyCommandSelection = function() {
  // Run Original Function
  _TDS_.OmoriBattleSystem.Scene_Battle_startPartyCommandSelection.call(this);
  this._actorCommandWindow.open()
  this._actorCommandWindow.hide();
  this._partyCommandWindow.show();
  this._helpWindow.hide();
  this.showPartyCommand();
  this.pushPartyMessage();

  // // Add Starting Message
  // if ($gameParty.size() === 1) {
  //  this.addLogCommandMessage("What will OMORI do?");
  // } else {
  //  this.addLogCommandMessage("What will OMORI and friends do?");
  // };
};

//=============================================================================
// * Push Party Message
//=============================================================================
Scene_Battle.prototype.pushPartyMessage = function() {
  // Get Party Size
  let size = $gameParty.size();
  // Get Message Source
  let source = LanguageManager.languageData().text.XX_GENERAL;
  // Error Message
  let message = 'ERRROR!';
  /*switch ($gameVariables.value(22)) {
    case 1:
      if (size === 1) {
    message = source.message_107.text;
      } else {
    message = source.message_100.text;
    };
    break;
    case 2:
      if (size === 1) {
        message = source.message_101.text;
      } else if (size === 2) {
        message = source.message_102.text;
      } else {
        message = source.message_103.text;
      };
      break;
    case 3:
    case 4:
    case 5:
    case 6: message = source.message_101.text ;break;
  };*/
  switch(size) {
    case 1:
      message = source.message_104.text.format($gameParty.leader().name());
      break;
    case 2:
      message = source.message_102.text.format($gameParty.leader().name(), $gameParty.members()[1].name());
      break;     
    default:
      message = source.message_100.text.format($gameParty.leader().name());
      break;          
  }
  // Add Log Command Message
  this.addLogCommandMessage(message);
}
//=============================================================================
// * Start Actor Command Selection
//=============================================================================
Scene_Battle.prototype.startActorCommandSelection = function() {
  // Run Original Function
  _TDS_.OmoriBattleSystem.Scene_Battle_startActorCommandSelection.call(this);
  // Open Party command Window
  this._partyCommandWindow.open();
  this._partyCommandWindow.hide();
  this._actorCommandWindow.openness = 255;
  this._actorCommandWindow.show();
  this._helpWindow.hide();
  // Select Actor at battle status index
  this._statusWindow.select(BattleManager.actor().battleStatusIndex());
  // Add Actor Action Prompt Log Text
  this.addActorActionPromptLogText();
  // Show Party Commands
  this.showPartyCommand();
};
//=============================================================================
// * Add Log Command Message
//=============================================================================
Scene_Battle.prototype.addActorActionPromptLogText = function() {
  // Get Actor
  var actor = BattleManager.actor();
  // If Actor Exists
  if (actor) {
    this.addLogCommandMessage(LanguageManager.languageData().text.XX_GENERAL.message_104.text.format(actor.name()));
  };
};
//=============================================================================
// * Add Log Command Message
//=============================================================================
Scene_Battle.prototype.addLogCommandMessage = function(text, clear = true, instant = true) {
  // Clear Log Window
  if (clear) { this._logWindow.clear(); }
  // If Instant
  if (instant) {
    // Add Text
    this._logWindow.addInstantText(text);
  } else {
    // Add Text
    this._logWindow.addText(text);
  };
};
//=============================================================================
// * Command Item
//=============================================================================
Scene_Battle.prototype.commandItem = function(category = 'consumables') {
  // Set Item Window Category
  this._itemWindow.setCategory(category);
  // Show Item Window
  this.showItemWindow();
  // Run Original Function
  _TDS_.OmoriBattleSystem.Scene_Battle_commandItem.call(this);
};
//=============================================================================
// * On Item Cancel
//=============================================================================
Scene_Battle.prototype.onItemCancel = function() {
  // Run Original Function
  _TDS_.OmoriBattleSystem.Scene_Battle_onItemCancel.call(this);
  this._itemWindow.show();
  // Hide Item Window
  this.hideItemWindow();
  this._helpWindow.hide();
  // Add Actor Action Prompt Log Text
  this.addActorActionPromptLogText();
};
//=============================================================================
// * On Item Ok
//=============================================================================
Scene_Battle.prototype.onItemOk = function() {
  // Get Action
  var action = BattleManager.inputtingAction();
  // Run Original Function
  _TDS_.OmoriBattleSystem.Scene_Battle_onItemOk.call(this);
  // Show Item Window
  this._itemWindow.show();
  this._helpWindow.hide();
  // If Action does not need selection
  if (!action.needsSelection()) {
    this.hideItemWindow();
    this.hideSkillWindow();
  } else {
    // Add Actor Action Prompt Log Text
    this.addLogCommandMessage(LanguageManager.languageData().text.XX_GENERAL.message_105.text);
    // If action can change target groups
    if (action.canChangeTargetGroups()) {
      // Add Actor Action Prompt Log Text
      this.addLogCommandMessage(LanguageManager.languageData().text.XX_GENERAL.message_106.text, false);
    };
  };
};
//=============================================================================
// * Command Skill
//=============================================================================
Scene_Battle.prototype.commandSkill = function() {
  // Run Original Function
  _TDS_.OmoriBattleSystem.Scene_Battle_commandSkill.call(this);
  this._skillWindow.show();
  this.showSkillWindow();
};
//=============================================================================
// * On Skill Ok
//=============================================================================
Scene_Battle.prototype.onSkillOk = function() {
  // Get Action
  var action = BattleManager.inputtingAction();
  // Run Original Function
  _TDS_.OmoriBattleSystem.Scene_Battle_onSkillOk.call(this);
  this._skillWindow.show();
  this._helpWindow.hide();
  // If Action does not need selection
  if (!action.needsSelection()) {
    this.hideItemWindow();
    this.hideSkillWindow();
  } else {
    // Add Actor Action Prompt Log Text
    this.addLogCommandMessage(LanguageManager.languageData().text.XX_GENERAL.message_105.text);
    // If action can change target groups
    if (action.canChangeTargetGroups()) {
      // Add Actor Action Prompt Log Text
      this.addLogCommandMessage(LanguageManager.languageData().text.XX_GENERAL.message_106.text, false);
    }
  };
};
//=============================================================================
// * On Skill Cancel
//=============================================================================
Scene_Battle.prototype.onSkillCancel = function() {
  // Run Original Function
  _TDS_.OmoriBattleSystem.Scene_Battle_onSkillCancel.call(this)
  // Add Actor Action Prompt Log Text
  this.addActorActionPromptLogText();
  this._skillWindow.show();
  this._helpWindow.hide();
  this.hideSkillWindow();
};
//=============================================================================
// * Select Next Command
//=============================================================================
Scene_Battle.prototype.selectNextCommand = function() {
  // Run Original Function
  _TDS_.OmoriBattleSystem.Scene_Battle_selectNextCommand.call(this);
  // If Not Inputting and there's no actor
  if (!BattleManager.isInputting() && !BattleManager.actor()) {
    this.hidePartyCommand();
  };
};
//=============================================================================
// * End Command Selection
//=============================================================================
Scene_Battle.prototype.endCommandSelection = function() {
  // Run Original Function
  _TDS_.OmoriBattleSystem.Scene_Battle_endCommandSelection.call(this);
  this._partyCommandWindow.open();
  this._actorCommandWindow.open();
};

//=============================================================================
// * Hide All menu Elements
//=============================================================================
Scene_Battle.prototype.hideAllMenuElements = function(duration = 15) {
  // Get Object
  var obj = this._stressBar;
  // Create Movement Data
  var data = {
    obj: obj, properties: ['y'],  from: {y: obj.y}, to: {y: Graphics.height}, durations: {y: duration},
    easing: Object_Movement.easeInCirc
  };
  this.move.startMove(data);

  // Get Object
  obj = this._partyCommandWindow;
  // Create Movement Data
  data = {
    obj: obj, properties: ['y'],  from: {y: obj.y}, to: {y: Graphics.height + 100}, durations: {y: duration},
    easing: Object_Movement.easeInCirc
  };
  this.move.startMove(data);

  // Get Object
  obj = this._actorCommandWindow;
  // Create Movement Data
  data = {
    obj: obj, properties: ['y'],  from: {y: obj.y}, to: {y: Graphics.height + 100}, durations: {y: duration},
    easing: Object_Movement.easeInCirc
  };
  this.move.startMove(data);

  // Get Object
  obj = this._logWindow;
  // Create Movement Data
  data = {
    obj: obj, properties: ['y'],  from: {y: obj.y}, to: {y: -100}, durations: {y: duration},
    easing: Object_Movement.easeInCirc
  };
  this.move.startMove(data);

  // Get Object
  obj = this._helpWindow;
  // Create Movement Data
  data = {
    obj: obj, properties: ['y'],  from: {y: obj.y}, to: {y: -100}, durations: {y: duration},
    easing: Object_Movement.easeInCirc
  };
  this.move.startMove(data);



  for (var i = 0; i < this._faceWindows.length; i++) {
    // Get Object
    var obj = this._faceWindows[i];
    // Create Movement Data
    data = {
      obj: obj, properties: ['x'],  from: {x: obj.x}, to: {x: i % 2 ? Graphics.width : -obj.windowWidth() }, durations: {x: duration},
      easing: Object_Movement.easeInCirc
    };
    this.move.startMove(data);
  };

};
//=============================================================================
// * Show All menu Elements
//=============================================================================
Scene_Battle.prototype.showAllMenuElements = function() {
  // Duration
  var duration = 15;
  // Get Object
  var obj = this._stressBar;
  // Create Movement Data
  var data = {
    obj: obj, properties: ['y'],  from: {y: obj.y}, to: {y: Graphics.height - 56}, durations: {y: duration},
    easing: Object_Movement.easeOutCirc
  };
  this.move.startMove(data);

  // Get Object
  obj = this._logWindow;
  // Create Movement Data
  data = {
    obj: obj, properties: ['y'],  from: {y: obj.y}, to: {y: -4}, durations: {y: duration},
    easing: Object_Movement.easeOutCirc
  };
  this.move.startMove(data);

  // Get Object
  obj = this._helpWindow;
  // Create Movement Data
  data = {
    obj: obj, properties: ['y'],  from: {y: obj.y}, to: {y: -4}, durations: {y: duration},
    easing: Object_Movement.easeOutCirc
  };
  this.move.startMove(data);

  for (var i = 0; i < this._faceWindows.length; i++) {
    // Get Object
    var obj = this._faceWindows[i];
    // If there's no actor continue to next window
    if (!obj.actor()) { continue; }
    // Create Movement Data
    data = {
      obj: obj, properties: ['x'],  from: {x: obj.x}, to: {x: obj._homePosition.x }, durations: {x: duration},
      easing: Object_Movement.easeOutCirc
    };
    this.move.startMove(data);
  };
};
//=============================================================================
// * Show Party Command
//=============================================================================
Scene_Battle.prototype.showPartyCommand = function() {
  // Duration
  var duration = 15
  // Get Object
  var obj = this._stressBar;
  // Create Movement Data
  var data = {
    obj: obj, properties: ['y'],  from: {y: obj.y}, to: {y: Graphics.height - 140}, durations: {y: duration},
    easing: Object_Movement.easeOutCirc
  };
  this.move.startMove(data);

  // Get Object
  obj = this._partyCommandWindow;
  // Create Movement Data
  data = {
    obj: obj, properties: ['y'],  from: {y: obj.y}, to: {y: Graphics.height - 92}, durations: {y: duration},
    easing: Object_Movement.easeOutCirc
  };
  this.move.startMove(data);

  // Get Object
  obj = this._actorCommandWindow;
  // Create Movement Data
  data = {
    obj: obj, properties: ['y'],  from: {y: obj.y}, to: {y: Graphics.height - 92}, durations: {y: duration},
    easing: Object_Movement.easeOutCirc
  };
  this.move.startMove(data);
};
//=============================================================================
// * Hide Party Command
//=============================================================================
Scene_Battle.prototype.hidePartyCommand = function() {
  // Duration
  var duration = 15
  // Get Object
  var obj = this._stressBar;
  // Create Movement Data
  var data = {
    obj: obj, properties: ['y'],  from: {y: obj.y}, to: {y: Graphics.height - 56}, durations: {y: duration},
    easing: Object_Movement.easeInCirc
  };
  this.move.startMove(data);

  // Get Object
  obj = this._partyCommandWindow;
  // Create Movement Data
  data = {
    obj: obj, properties: ['y'],  from: {y: obj.y}, to: {y: Graphics.height}, durations: {y: duration},
    easing: Object_Movement.easeInCirc
  };
  this.move.startMove(data);

  // Get Object
  obj = this._actorCommandWindow;
  // Create Movement Data
  data = {
    obj: obj, properties: ['y'],  from: {y: obj.y}, to: {y: Graphics.height}, durations: {y: duration},
    easing: Object_Movement.easeInCirc
  };
  this.move.startMove(data);
};
//=============================================================================
// * Show Item Window
//=============================================================================
Scene_Battle.prototype.showItemWindow = function() {
  // Duration
  var duration = 15
  // Get Object
  var obj = this._itemWindow;
  // Create Movement Data
  var data = {
    obj: obj, properties: ['y'],  from: {y: obj.y}, to: {y: Graphics.height - 65}, durations: {y: duration},
    easing: Object_Movement.easeOutCirc
  };
  this.move.startMove(data);
};
//=============================================================================
// * Hide Item Window
//=============================================================================
Scene_Battle.prototype.hideItemWindow = function() {
  // Duration
  var duration = 15
  // Get Object
  var obj = this._itemWindow;
  // Create Movement Data
  var data = {
    obj: obj, properties: ['y'],  from: {y: obj.y}, to: {y: Graphics.height + 30}, durations: {y: duration},
    easing: Object_Movement.easeInCirc
  };
  this.move.startMove(data);
};
//=============================================================================
// * Show Skill Window
//=============================================================================
Scene_Battle.prototype.showSkillWindow = function() {
  // Duration
  var duration = 15
  // Get Object
  var obj = this._skillWindow;
  // Create Movement Data
  var data = {
    obj: obj, properties: ['y'],  from: {y: obj.y}, to: {y: Graphics.height - 65}, durations: {y: duration},
    easing: Object_Movement.easeOutCirc
  };
  this.move.startMove(data);
};
//=============================================================================
// * Hide Skill Window
//=============================================================================
Scene_Battle.prototype.hideSkillWindow = function() {
  // Duration
  var duration = 15
  // Get Object
  var obj = this._skillWindow;
  // Create Movement Data
  var data = {
    obj: obj, properties: ['y'],  from: {y: obj.y}, to: {y: Graphics.height + 30}, durations: {y: duration},
    easing: Object_Movement.easeInCirc
  };
  this.move.startMove(data);
};





























//=============================================================================
// ** Sprite_BattleFaceAnimation
//-----------------------------------------------------------------------------
// This sprite is used to show animations on the battle face
//=============================================================================
class Sprite_BattleFaceAnimation extends Sprite_Base {
constructor() { super(); }
//=============================================================================
// * Start Animation
//=============================================================================
startAnimation(animation, mirror, delay) {
  var sprite = new Sprite_Battle_Animation();
  sprite.setup(this._effectTarget, animation, mirror, delay);
  // // If animation position is for screen
  // if (animation.position === 3) {
  //   // console.log(this.parent.parent)
  //   // console.log(this._screenParent)
  //   this.parent.addChild(sprite);
  // } else {
  // Add Child
  this.addChild(sprite);
  // // };
  // Add Sprite to animation sprites
  this._animationSprites.push(sprite);

  // Return Added Sprite
  return sprite;
  };
};



//=============================================================================
// ** Sprite_Battle_Animation
//-----------------------------------------------------------------------------
// This sprite is used to show animations in battle for the actors
//=============================================================================
function Sprite_Battle_Animation() { this.initialize.apply(this, arguments); }
Sprite_Battle_Animation.prototype = Object.create(Sprite_Animation.prototype);
Sprite_Battle_Animation.prototype.constructor = Sprite_Battle_Animation;
//=============================================================================
// * Object Initilization
//=============================================================================
Sprite_Battle_Animation.prototype.initMembers = function() {
  Sprite_Animation.prototype.initMembers.call(this);
  // Set Home Rectangle
  this._homeRect = new Rectangle(100, 0, 114, 164)
};
//=============================================================================
// * Set Home Position
//=============================================================================
Sprite_Battle_Animation.prototype.setHomePosition = function(x, y) {
  // Set Home Rect X & Y
  this._homeRect.x = x; this._homeRect.y = y;
};
//=============================================================================
// * Object Initilization
//=============================================================================
Sprite_Battle_Animation.prototype.updatePosition = function() {
  // If full screen
  if (this._animation.position === 3) {
      this.x = (Graphics.width / 2) + this.xOffset()
      this.y = (Graphics.height / 2) + this.yOffset()
  } else {
      // Get Home Rectangle
      var home = this._homeRect
      // Set Position
      this.x = home.x + (home.width / 2);
      this.y = home.y + home.height ;
    if (this._animation.position === 0) {
      this.y -= home.height;
    } else if (this._animation.position === 1) {
      this.y -= home.height / 2;
    };
  };
};
//=============================================================================
// * Object Initilization
//=============================================================================
Sprite_Battle_Animation.prototype.xOffset = function() {
  var node = this;
  var x = this.x
  while (node) {
      x -= node.x;
      node = node.parent;
  }
  return x;
}
//=============================================================================
// * Object Initilization
//=============================================================================
Sprite_Battle_Animation.prototype.yOffset = function() {
  var node = this;
  var y = this.y
  while (node) {
      y -= node.y;
      node = node.parent;
  }
  return y;
}



//=============================================================================
// ** Sprite_StressBar
//-----------------------------------------------------------------------------
// This sprite is used to display the stress bar.
//=============================================================================
function Sprite_StressBar() { this.initialize.apply(this, arguments); }
Sprite_StressBar.prototype = Object.create(Sprite.prototype);
Sprite_StressBar.prototype.constructor = Sprite_StressBar;
//=============================================================================
// * Object Initilization
//=============================================================================
Sprite_StressBar.prototype.initialize = function() {
  // Super Call
  Sprite.prototype.initialize.call(this);
  // Line X
  this._lx = 0;
  // EKG Row
  this._ekgRow = 0;
  // Set Pending EKG Row
  this._pendingEKGRow = -1;
  this._pendingIndex = -1;
  this._frameCount = 0;
  // Create Sprites
  this.createBackgroundSprite();
  this.createEKGLineSprites();
};
//=============================================================================
// * Create Create Background Sprite
//=============================================================================
Sprite_StressBar.prototype.createBackgroundSprite = function() {
  // Create Background Sprite
  this._background = new Sprite();
  this.addChild(this._background);
  this.updateBackgroundImage();
};
//=============================================================================
// * Create EKG Line Sprites
//=============================================================================
Sprite_StressBar.prototype.createEKGLineSprites = function() {
  // Create EKG Line Sprite
  this._ekgLine = new Sprite(new Bitmap(290, 28));
  this._ekgLine.x = 20;
  this._ekgLine.y = 8//14;
  this.addChild(this._ekgLine);
  // Create EKG Line Bitmap
  this._ekgLineBitmap = new Bitmap(290, 28);
  // Create EKG New Line Bitmap
  this._ekgLineNewBitmap = new Bitmap(290, 28);

  // Create EKG Text Sprite
  this._ekgText = new Sprite(new Bitmap(33, 33));
  this._ekgText.x = 320;
  this._ekgText.y = 7;
  this._ekgText.bitmap.fontSize = 28;
  this.addChild(this._ekgText);
  // Refresh EKG Bitmap
  this.refreshEKGBitmap();
};
//=============================================================================
// * Refresh EKG Bitmap
//=============================================================================
Sprite_StressBar.prototype.refreshEKGBitmap = function(index = this._ekgRow) {

  let ekgName = 'energy_stress_ekg_line';
  switch ($gameVariables.value(22)) {
    case 1: ekgName = 'energy_dw_line' ;break;
    case 3: ekgName = 'energy_stress_ekg_line' ;break;
    case 4: ekgName = 'energy_stress_ekg_line' ;break;
  };
  // Get Bitmap
  var bitmap = ImageManager.loadSystem(ekgName);
  // Clear & Transfer Bitmap
  this._ekgLineBitmap.clear();
  this._ekgLineBitmap.blt(bitmap, 0, index * 28, bitmap.width, 28, 0, 0);
  // If Pending EKG Row is valid
  if (this._pendingEKGRow >= 0) {
    this._ekgLineNewBitmap.clear()
    this._ekgLineNewBitmap.blt(bitmap, 0, this._pendingEKGRow * 28, bitmap.width, 28, 0, 0);
  };

  // if ($gameParty.actorIsAffectedByState(1, 20) || $gameParty.actorIsAffectedByState(8, 20)) {
  //   this._pendingIndex = Math.floor();
  // };
};
//=============================================================================
// * Draw Stress Count Value
//=============================================================================
Sprite_StressBar.prototype.drawStressCountValue = function(value = this._ekgRow) {
  // Clear Text
  this._ekgText.bitmap.clear();
  // Refresh EKG Bitmap
  this._ekgText.bitmap.drawText(value.clamp(0, 10).padZero(2), 0, -4, this._ekgText.bitmap.width, this._ekgText.bitmap.height, 'center');
};
//=============================================================================
// * Frame Update
//=============================================================================
Sprite_StressBar.prototype.update = function() {
  // Super Call
  Sprite.prototype.update.call(this);

  // Determine if stressed
  let stressed = $gameParty.actorIsAffectedByState(1, 20) || $gameParty.actorIsAffectedByState(8, 20);
  // Get Energy
  let energy = $gameParty.stressEnergyCount;

  // If Stressed Set energy to 10
  if (stressed) { energy = 10; }

  // Increase Frame Count
  this._frameCount = (this._frameCount + 1) % 60;

  // If Energy does not match ekg row
  if (energy !== this._ekgRow) {
    // If energy is at max and troop is 415
    if (energy === 10 && $gameTroop._troopId === 451) {
      // Set Pending EKG row to 11
      this._pendingEKGRow = 11;
    } else {
      // Set Pending EKG Row to match energy
      this._pendingEKGRow = energy;
    };

    // Update Background Image
    this.updateBackgroundImage();
    // Draw stress Count value
    if(!stressed) {this.drawStressCountValue(energy);}

  };


  // If frame count is 0
  if (this._frameCount && this._frameCount % BattleManager._stressSpeed === 0) {
    // If Stressed
    if (energy >= 10 && [3,4].contains($gameVariables.value(22)) && !!stressed) {
      // Draw Stress Count Value
      this.drawStressCountValue(Math.randomInt(11));
    }
  }


  // Update Line
  this.updateLine(stressed)



  // return;

  // if (Input.isTriggered('up')) {

  // $gameParty.stressEnergyCount++
  //  return;
  // }

  // if (Input.isTriggered('down')) {

  //   $gameParty.stressEnergyCount--;
  //  return;
  // }



  // if ($gameParty.actorIsAffectedByState(1, 20) || $gameParty.actorIsAffectedByState(8, 20)) {
  //   energy = 10;
  // }

  // // If Energy count does not match EKG
  // if (energy !== this._pendingEKGRow && energy !== this._ekgRow) {

  //   if (energy === 10 && $gameTroop._troopId === 451) {
  //     this._pendingEKGRow = 11;
  //   } else {
  //     this._pendingEKGRow = energy;
  //   };
  //   this.updateBackgroundImage();
  // };



  // if (this._frameCount && this._frameCount % BattleManager._stressSpeed == 0) {
  //   if ($gameParty.actorIsAffectedByState(1, 20) || $gameParty.actorIsAffectedByState(8, 20)) {
  //     this.refreshEKGBitmap();
  //   }
  // }

  // if (energy !== this._pendingIndex) {
  //   this._ekgText.bitmap.clear();
  //   this._ekgText.bitmap.drawText(this._pendingIndex.clamp(0, 10).padZero(2), 0, -4, this._ekgText.bitmap.width, this._ekgText.bitmap.height, 'center');
  //   this._pendingIndex = energy;
  // }

  // this._frameCount++;
  // if (this._frameCount > 60) this._frameCount = 0;

  // var speed = 1
  // for (var i = 0; i < speed; i++) {
  //   this.updateLine()
  // };
};
//=============================================================================
// * Determine if Line Connects
//=============================================================================
Sprite_StressBar.prototype.canLinesConnect = function(x = this._lx, bitmap = this._ekgLineBitmap, bitmap2 = this._ekgLineNewBitmap) {
  //if (x <= 0) { return true; }
  //if (x >= bitmap.width) { return true; };
  // Points Array
  var points = [];
  for (var i = 0; i < bitmap.height; i++) {
    if (this.isLineAtCenter(bitmap, x, i)) { points.push(i);}
  };
  // Go Through Points
  for (var i = 0; i < points.length; i++) {
    // Get Y Point
    var y = points[i];
    if (this.isLineAtCenter(bitmap2, x + 1, y)) {
     return true;
   };
  };
  // Return False
  return true;
};
//=============================================================================
// * Determine if Line Connects
//=============================================================================
Sprite_StressBar.prototype.isLineAtCenter = function(bitmap = this._ekgLineBitmap, x = this._lx, y = 14) {
//  console.log(bitmap.getAlphaPixel(x, y))
  if (bitmap.getAlphaPixel(x, y) === 0) { return false; }
  // Return true by default
  return true;
};
//=============================================================================
// * Update Line
//=============================================================================
Sprite_StressBar.prototype.updateLine = function(stressed) {
  if (this._pendingEKGRow >= 0) {
    if (this.canLinesConnect()) {
      this._ekgRow = this._pendingEKGRow;
      this._pendingEKGRow = -1;
      this.refreshEKGBitmap();
      if(!stressed) {this.drawStressCountValue(this._ekgRow);}
    };
  };
  var bitmap = this._ekgLineBitmap;
  var space = 40
  this._lx = (this._lx + 1) % (bitmap.width + space)
  this._ekgLine.bitmap.blt(bitmap, this._lx, 0, 1, bitmap.height, this._lx, 0);
  this._ekgLine.bitmap.clearRect(this._lx - space, 0, 1, bitmap.height);
};
//=============================================================================
// * Update Background Image
//=============================================================================
Sprite_StressBar.prototype.updateBackgroundImage = function() {
  // Get Background Name
  let backgroundName = 'StressBar_DreamWorld';
  // Set Index to 0
  let index = 0;
  // Set Default Rows
  let rows = 5;
  // Get Stress
  let stress = $gameParty.stressEnergyCount;

  if ($gameParty.actorIsAffectedByState(1, 20) || $gameParty.actorIsAffectedByState(8, 20)) {
    stress = 10;
  }

  switch ($gameVariables.value(22)) {
    case 1:
      // Set Index
      index = Math.min(Math.max(Math.floor(stress / 2), 0), 4);
    break;
    case 3:
    case 4:
      backgroundName = 'StressBar_BlackSpace';
      rows = 4;
      if (stress === 10) {
        index = 2;
      } else if (stress > 6 && stress < 10) {
        index = 2;
      } else if (stress > 3 && stress <= 6) {
        index = 1;
      } else {
        index = 0;
      };
    break;
  };
  // Get Bitmap
  let bitmap = ImageManager.loadSystem(backgroundName);
  // Get Height
  let height = bitmap.height / rows;
  // Set Background Bitmap
  this._background.bitmap = bitmap;
  // Set Background Frame
  bitmap.addLoadListener(() => this._background.setFrame(0, index * height, bitmap.width, height));
};
// //=============================================================================
// // * Update Background Animation
// //=============================================================================
// Sprite_StressBar.prototype.updateBackgroundAnimation = function() {
//   // Get Animation object
//   let anim = this._backAnim;
//   // If Animation has more than 1 frame
//   if (anim.animate && anim.maxFrames > 1) {
//     // Decrease Delay
//     anim.delay--;
//     // If Animation delay is or less
//     if (anim.delay <= 0) {
//       // Increase Frame
//       anim.frame = (anim.frame + 1) % anim.maxFrames;
//       anim.delay = anim.maxDelay;
//       // Set Frame
//       this._background.setFrame(0, anim.frame * this._background.height, this._background.width, this._background.height);
//     };
//   };
// };




//=============================================================================
// ** Sprite_Actor
//-----------------------------------------------------------------------------
// The sprite for displaying an actor.
//=============================================================================
// * Setup Animation (Overwritten to Prevent it from using animations.)
//=============================================================================
Sprite_Actor.prototype.setupAnimation = function() { };
//=============================================================================
// * Setup Animation (Overwritten to Prevent it from clearing damage)
//=============================================================================
Sprite_Actor.prototype.setupDamagePopup = function() { };





//=============================================================================
// ** Window_OmoriBattleActorStatus
//-----------------------------------------------------------------------------
// This window displays the quest list header.
//=============================================================================
function Window_OmoriBattleActorStatus() { this.initialize.apply(this, arguments); }
Window_OmoriBattleActorStatus.prototype = Object.create(Window_Base.prototype);
Window_OmoriBattleActorStatus.prototype.constructor = Window_OmoriBattleActorStatus;
//=============================================================================
// * Initialize Object
//=============================================================================
Window_OmoriBattleActorStatus.prototype.initialize = function(index, layers, x, y) {
  // Set Home Position
  this._homePosition = new Point(x, y);
  // Set Display Layers Object
  this._displayLayers = layers
  // Set Actor Index
  this._actorIndex = index;
  // Animation Values
  this._hpAnim = {current: -2, target: 0, old: -1, duration: 0 };
  this._mpAnim = {current: -2, target: 0, old: -1, duration: 0 };
  // Selected Flag
  this._selected = false;
  this._overlayOpacity = 0;
  this._overlayAngle = 0;
  // ACS Bubble Opacity Duration
  this._acsBubbleOpacityDuration = 0;
  this._acsBubbleOpacity = 0;
  // Overlay Animation
  this._overlayAnim = {side: 0, delay: 15}
  // Initialize Damage Sprites Array
  this._damageSprites = [];
  this._removeDamageSprites = [];
  this._popupCount = 0;
  // Super Call
  Window_Base.prototype.initialize.call(this, 14, 100, this.windowWidth(), this.windowHeight());
  this.opacity = 0;
  // Create Sprites
  this.createSprites();
  // Draw Contents
  this.refresh();
};
//=============================================================================
// * Settings
//=============================================================================
Window_OmoriBattleActorStatus.prototype.standardPadding = function() { return 0; };
Window_OmoriBattleActorStatus.prototype.windowWidth = function() { return 114; };
Window_OmoriBattleActorStatus.prototype.windowHeight = function() { return 164; };
//=============================================================================
// * Get Actor
//=============================================================================
Window_OmoriBattleActorStatus.prototype.actor = function() {
  return $gameParty.memberAtStatusIndex(this._actorIndex)
};
//=============================================================================
// * Create Sprite
//=============================================================================
Window_OmoriBattleActorStatus.prototype.createSprites = function() {
  // Get Layers
  var layers = this._displayLayers;
  // Get Position
  var pos = this._homePosition;

  // Create status Back Sprite
  this._statusBackSprite = new Sprite();
  this._statusBackSprite.bitmap = ImageManager.loadSystem('faceset_states')
  this._statusBackSprite.x = pos.x + 7;
  this._statusBackSprite.y = pos.y + 17;
  this.setStatusBack(0, false);
  layers._statusBack.addChild(this._statusBackSprite);

  // Create Face Sprite
  this._faceSprite = new Sprite_OmoMenuStatusFace();
  this._faceSprite.x = pos.x + (this.width - 106) / 2;
  this._faceSprite.y = pos.y + 15
  layers._face.addChild(this._faceSprite);
  // Set Actor
  this._faceSprite.actor = this.actor();

  // Face Mask
  this._faceMask = new Sprite(new Bitmap(this.width - 14, 92))
  this._faceMask.x = 7;
  this._faceMask.y = 25;
  this._faceMask.bitmap.fillAll('rgba(255, 255, 255, 1)')
  this._faceSprite.mask =  this._faceMask;
  this.addChild(this._faceMask);


  // // Face Mask
  // this._faceMask = new PIXI.Graphics();
  // this._faceMask.beginFill(0xFFF);
  // // this._faceMask.drawRect(7, 25, this.width - 14, 92);
  // this._faceMask.endFill();
  // // this._faceSprite.mask = this._faceMask
  // this.addChild(this._faceMask)

  // Create Polaroid Sprite
  this._polaroidSprite = new Sprite(ImageManager.loadSystem('player_box'));
  this._polaroidSprite.x = pos.x;
  this._polaroidSprite.y = pos.y;
  layers._polaroid.addChild(this._polaroidSprite);

  // Create HP Bar
  this._hpBarSprite = new Sprite(ImageManager.loadSystem('bar_gradients'));
  this._hpBarSprite.x = pos.x + 28
  this._hpBarSprite.y = pos.y + 127;
  this._hpBarSprite.setFrame(0, 0, 81, 12);
  layers._polaroid.addChild(this._hpBarSprite);

  // Create HP Bar
  this._mpBarSprite = new Sprite(ImageManager.loadSystem('bar_gradients'));
  this._mpBarSprite.x = pos.x + 28
  this._mpBarSprite.y = pos.y + 146;
  this._mpBarSprite.setFrame(0, 19, 81, 12);
  layers._polaroid.addChild(this._mpBarSprite);

  // Create State Sprite
  this._stateSprite = new Sprite(ImageManager.loadSystem('statelist'));
  this._stateSprite.anchor.set(0.5, 0.5);
  this._stateSprite.x = pos.x + this.width / 2;
  this._stateSprite.y = pos.y + 14;
  this._stateSprite.setFrame(0, 0 * 24, 134, 24)
  layers._polaroid.addChild(this._stateSprite);

  // Create Selected Overlay
  this._selectedOverlay = new Sprite(ImageManager.loadSystem('target_selected'))
  this._selectedOverlay.x = pos.x + -12
  this._selectedOverlay.y = pos.y + -3
  this._selectedOverlay.opacity = 0;
  layers._polaroid.addChild(this._selectedOverlay);

  // Create Status Particle Emitters
  this.createStatusParticleEmitters();

  // Create ACS Bubble Sprites
  this.createACSBubbleSprites();

  layers._polaroid.addChild(this._windowContentsSprite)
  this._windowContentsSprite.x = pos.x;
  this._windowContentsSprite.y = pos.y;

  // Create Damage Container
  this._damageContainer = new Sprite();
  layers._polaroid.addChild(this._damageContainer);
};

//=============================================================================
// * Create Status Particle Emitters
//=============================================================================
Window_OmoriBattleActorStatus.prototype.createStatusParticleEmitters = function() {
  // Get Layers
  var layers = this._displayLayers;
  // Get Position
  var pos = this._homePosition;
  // Get Layer List
  var layerList = [layers._statusBack, layers._face, layers._polaroid]
  // Initialize Particle Emitters
  this._statusParticleEmitters = [];
  // Go Through Layer List
  for (var i = 0; i < layerList.length; i++) {
    // Get Layer
    var layer = layerList[i];
    // Create Particle Emitter
    var sprite = new Sprite_BattleFaceStatusEmitter();
    sprite.x = pos.x + this.width / 2;
    sprite.y = pos.y + 120;
    // sprite.mask = this._faceMask
    // Add Particle to Array
    this._statusParticleEmitters[i] = sprite;
    // Add Particle Emitter to Layer
    layer.addChild(sprite);
  };
  // Set The Mask of the last sprite to null
  sprite.mask = null;
};
//=============================================================================
// * Create ACS Bubble Sprites
//=============================================================================
Window_OmoriBattleActorStatus.prototype.createACSBubbleSprites = function() {
  // Create ACS Bubble container
  this._acsBubbleContainer = new Sprite();
  this._acsBubbleContainer.opacity = 0;
  this.addChild(this._acsBubbleContainer);
  // Action Chain Skills Bubble Sprites
  this._acsBubbleSprites = [];
  // Bubbles
  var bubbles = [[0, 1, 2], [4, 5,6], [9, 8, 7], [12, 11, 10]];
  // Create Bubble Sprites
  for (var i = 0; i < 3; i++) {
    // Create Sprite
    var sprite = new Sprite_ACSBubble(this._actorIndex);
    sprite.updatePosition(i);
    this._acsBubbleSprites[i] = sprite;
    this._acsBubbleContainer.addChild(sprite);
  };
};
//=============================================================================
// * Refresh
//=============================================================================
Window_OmoriBattleActorStatus.prototype.refresh = function() {
  // Get Actor
  var actor = this.actor();
  // If Actor Exists
  if (actor) {
    this.setStatusBack(actor.statusBackIndex());
    this.setStatusHeader(actor.statusListIndex());
    this._faceSprite.setAnimRow(actor.statusFaceIndex())
    this.setupStatusParticles(actor.statusStateParticlesData())
  };
  // Draws Actor Index for testing and tracking
  // this.contents.drawText(this._actorIndex, 10, 0, 50, 50);
};
//=============================================================================
// * Draw HP
//=============================================================================
Window_OmoriBattleActorStatus.prototype.drawHP = function(hp, maxHP) {
  this.contents.fontSize = LanguageManager.getMessageData("XX_BLUE.Window_OmoriBattleActorStatus").drawHP_contents_fontsize;
  var y = 112
  const loc_position = LanguageManager.getMessageData("XX_BLUE.Window_OmoriBattleActorStatus").drawHP_contents_clearRect_position;
  this.contents.clearRect(loc_position[0], eval(loc_position[1]), this.width, 24);
  var maxText = ' ' + maxHP
  var width = this.textWidth(maxText) + 11;
  this.drawText(hp, 0, y, this.width - width, 'right');
  this.drawText(maxText, 0, y, this.width - 10,'right');
  this.drawText('/', 0, y + 1, this.width - width + 5,'right');
  this.resetFontSettings();
};
//=============================================================================
// * Draw HP
//=============================================================================
Window_OmoriBattleActorStatus.prototype.drawMP = function(mp, maxMP) {
  this.contents.fontSize = LanguageManager.getMessageData("XX_BLUE.Window_OmoriBattleActorStatus").drawMP_contents_fontsize;
  var y = 131;
  this.contents.clearRect(0, y + 10, this.width, 24);
  var maxText = ' ' + maxMP
  var width = this.textWidth(maxText) + 11;
  this.drawText(mp, 0, y, this.width - width, 'right');
  this.drawText(maxText, 0, y, this.width - 10,'right');
  this.drawText('/', 0, y + 1, this.width - width + 5,'right');
  this.resetFontSettings()
};
//=============================================================================
// * Frame Update
//=============================================================================
Window_OmoriBattleActorStatus.prototype.update = function() {
  // Super Call
  Window_Base.prototype.update.call(this);
  // Update Positions
  this.updatePositions();
  // Update Status back fading
  this.updateStatusBackFade();
  // Update Bars
  this.updateBars();
  // Update Animation
  this.updateAnimation();
  // Update Overlay
  this.updateOverlay()
  // Update Damage
  this.updateDamage();
  // Update ACS Bubbles
  this.updateACSBubbles();
};
//=============================================================================
// * Update Positions
//=============================================================================
Window_OmoriBattleActorStatus.prototype.updatePositions = function() {


  this._statusBackSprite.x = this.x + 7;
  this._statusBackSprite.y = this.y + 17;

  this._faceSprite.x = this.x + (this.width - 106) / 2;
  this._faceSprite.y = this.y + 15

  this._polaroidSprite.x = this.x;
  this._polaroidSprite.y = this.y;

  this._hpBarSprite.x = this.x + 28
  this._hpBarSprite.y = this.y + 127;

  this._mpBarSprite.x = this.x + 28
  this._mpBarSprite.y = this.y + 146;

  this._stateSprite.x = this.x + this.width / 2;
  this._stateSprite.y = this.y + 14;

  this._selectedOverlay.x = this.x + -12
  this._selectedOverlay.y = this.y + -3

  this._windowContentsSprite.x = this.x;
  this._windowContentsSprite.y = this.y;

  // Go Through Layer List
  for (var i = 0; i < this._statusParticleEmitters.length; i++) {
    // Create Particle Emitter
    var sprite = this._statusParticleEmitters[i]
    sprite.x = this.x + this.width / 2;
    sprite.y = this.y + 120;
  };
};
//=============================================================================
// * Set Status Header
//=============================================================================
Window_OmoriBattleActorStatus.prototype.setStatusHeader = function(index) {
  this._stateSprite._frame.y = index * 24;
  this._stateSprite._refresh()
};
//=============================================================================
// * Start Animation
//=============================================================================
Window_OmoriBattleActorStatus.prototype.setStatusBack = function(index, fade = true) {

  // If Fade flag
  if (fade) {
    // Create Sprite
    var sprite = new Sprite(ImageManager.loadSystem('faceset_states'));
    // Get Status Back Frame
    var frame = this._statusBackSprite._frame;
    // Set Sprite Frame
    sprite.setFrame(frame.x, frame.y, frame.width, frame.height);
    // Add Sprite to Status Back Sprite
    this._statusBackSprite.addChildAt(sprite, 0)
  };
  var width = 100, height = 100;
  var sx = (index % 4) * height;
  var sy = Math.floor(index / 4) * width;
  this._statusBackSprite.setFrame(sx, sy, width, height);
};
//=============================================================================
// * Setup Status State Particles
//=============================================================================
Window_OmoriBattleActorStatus.prototype.setupStatusParticles = function(data) {
  // Get Layers
  var layers = ['behind', 'front', 'top'];
  // If Data Exists
  if (data) {
    // Go through layers
    for (var i = 0; i < layers.length; i++) {
      // Get Layer Data
      var layerData = data[layers[i]];
      // Get Particles
      var particles = this._statusParticleEmitters[i];
      // If Layer Data Exists
      if (layerData) {
        particles.setupGenerator(layerData)
        particles.activate();
      } else {
        // Clear and Deactivate
        particles.clear(); particles.deactivate();
      }
    }
  } else {
    // Go through layers
    for (var i = 0; i < layers.length; i++) {
      // Get Particles
      var particles = this._statusParticleEmitters[i];
      // Clear and Deactivate
      particles.clear(); particles.deactivate();
    }
  };
};
//=============================================================================
// * Start Animation
//=============================================================================
Window_OmoriBattleActorStatus.prototype.startAnimation = function(layer, animation, mirror, delay) {
  // Set Default Animation Layer
  var animLayer = this._displayLayers._animation4
  switch (layer) {
    case 0: animLayer = this._displayLayers._animation0 ;break;
    case 1: animLayer = this._displayLayers._animation1 ;break;
    case 2: animLayer = this._displayLayers._animation2 ;break;
    case 3: animLayer = this._displayLayers._animation4 ;break;
  };
  // Get Layers
  var sprite = animLayer.startAnimation(animation, false, 0);
  sprite.setHomePosition(this._homePosition.x, this._homePosition.y);
};
//=============================================================================
// * Update Animation
//=============================================================================
Window_OmoriBattleActorStatus.prototype.updateAnimation = function() {
  // Get Actor
  var actor = this.actor();
  // If Actor
  if (actor) {
    while (actor.isAnimationRequested()) {
      var data = actor.shiftAnimation();
      var animation = $dataAnimations[data.animationId];
      var mirror = data.mirror;
      var delay = animation.position === 3 ? 0 : data.delay;
      var layer = DataManager.animationLayer(animation);
      this.startAnimation(layer, animation, mirror, delay);
    };
  };
};
//=============================================================================
// * Update Status Back Fade
//=============================================================================
Window_OmoriBattleActorStatus.prototype.updateStatusBackFade = function() {
  // If Status Back Sprite has children
  if (this._statusBackSprite.children.length > 0) {
    // Remove Flag
    var remove = false;
    // Get  Children
    var children = this._statusBackSprite.children;
    // Go Through children
    for (var i = 0; i < children.length; i++) {
      var sprite = children[i];
      // Decrease Opacity
      sprite.opacity -= 10;
      // If sprite opacity is 0 or less
      if (sprite.opacity <= 0) { remove = true; };
    };
    // If remove flag is true
    if (remove) {
      // Go Through children
      children.forEach(function(child) {
        // If Child opacity is 0 or less remove from parent
        if (child.opacity <= 0) { this._statusBackSprite.removeChild(child); };
      }, this);
    }
  };
};
//=============================================================================
// * Update Damage
//=============================================================================
Window_OmoriBattleActorStatus.prototype.updateDamage = function() {
  // Get Actor
  var actor = this.actor();
  // If Actor Exists
  if (actor) {
    if (actor.isDamagePopupRequested()) {
      // Create Damage sprite
      var damage = new Sprite_Damage();
      damage.x = this.width / 2;
      damage.y = this.height - (40 + (20 * Math.floor(actor._damagePopup.length / 3))) + (40 * this._popupCount);
      damage.x += this._homePosition.x;
      damage.y += this._homePosition.y + 2;
      damage.setup(actor);
      // Get Result
      var result = actor._damagePopup[0] || actor.result();
      this._damageContainer.addChild(damage);
      this._damageSprites.push(damage);
      // If Damage is more than 0
      if (result.hpDamage > 0) {
        // Set Damage Face Animation
        if(!$gameTemp._secondChance || actor.actorId() !== 1) {this._faceSprite.setAnimRow(9)}
      };
      this._popupCount++;
      // Clear Results
      //actor.clearDamagePopup();
      //actor.clearResult();
    }
    else {
      if(this._popupCount > 0) {this._popupCount = 0;}
    }
  };

  // Go Through Damage Sprites
  for (var i = 0; i < this._damageSprites.length; i++) {
    // Get Sprite
    var sprite = this._damageSprites[i];
    // If Damage is not playing anymore
    if (!sprite.isPlaying()) { this._removeDamageSprites.push(sprite); };
  };
  // If Removed Damage Sprites length is more than 0
  if (this._removeDamageSprites.length > 0) {
    // Go Through Removed Damage Sprites
    for (var i = 0; i < this._removeDamageSprites.length; i++) {
      // Get Sprite
      var sprite = this._removeDamageSprites[i];
      // Get Index
      var index = this._damageSprites.indexOf(sprite);
      // If Index exist
      if (index >= 0) { this._damageSprites.splice(index, 1); };
      // Remove Sprite
      this._damageContainer.removeChild(sprite);
    };
    // Clear Remove Damage sprites
    this._removeDamageSprites = [];
  };
};
//=============================================================================
// * Update Bars
//=============================================================================
Window_OmoriBattleActorStatus.prototype.updateBars = function() {
  // Get Actor
  var actor = this.actor();

  // If Actor Exists
  if (actor) {
    // Get Animation
    var anim = this._hpAnim
    if (actor.hp !== anim.old) {
      anim.target = actor.hp;
      anim.old = actor.hp
      anim.duration = Math.abs(anim.current - anim.target).clamp(0, 30);;
    };
    anim = this._mpAnim
    if (actor.mp !== anim.old) {
      anim.target = actor.mp;
      anim.old = actor.mp
      anim.duration = Math.abs(anim.current - anim.target).clamp(0, 30);;
    };
  };

  // If HP Animation Duration is more than 0
  if (this._hpAnim.duration > 0) {
    var anim = this._hpAnim;
    anim.current = (anim.current * (anim.duration - 1) + anim.target) / anim.duration;
    anim.duration--;
    this.drawHP(Math.round(anim.current), actor.mhp)
    var width = (anim.current / actor.mhp) * 81;
    this._hpBarSprite._frame.width = width;
    this._hpBarSprite._refresh();
  }
  // If MP Animation Duration is more than 0
  if (this._mpAnim.duration > 0) {
    var anim = this._mpAnim;
    anim.current = (anim.current * (anim.duration - 1) + anim.target) / anim.duration;
    anim.duration--;
    this.drawMP(Math.round(anim.current), actor.mmp)
    var width = (anim.current / actor.mmp) * 81;
    this._mpBarSprite._frame.width = width;
    this._mpBarSprite._refresh();
  };
};
//=============================================================================
// * Update Bars
//=============================================================================
Window_OmoriBattleActorStatus.prototype.updateOverlay = function() {
  // If Selected
  if (this._selected) {
    // Get Animation
    var anim = this._overlayAnim;
    // If Animation delay is 0
    if (anim.delay <= 0) {
      if (anim.side === 0) {
        this._selectedOverlay.opacity += 15;
        if (this._selectedOverlay.opacity >= 255) {
          anim.side = 1; anim.delay = 40;
        };
      } else {
        this._selectedOverlay.opacity -= 15;
        if (this._selectedOverlay.opacity <= 0) {
          anim.side = 0; anim.delay = 10;
        };
      };
    } else {
      // Decrease Delay
      anim.delay--
    };
  } else if (this._selectedOverlay.opacity > 0 || this._overlayAnim.side === 1) {
    // Decrease Opacity
    this._selectedOverlay.opacity -= 25;
    // If Overlay opacity is 0 or less (Finished fading out)
    if (this._selectedOverlay.opacity <= 0) {
      // Reset Side & Delay
      this._overlayAnim.side = 0;
      this._overlayAnim.delay = 0;
    };
  };
};
//=============================================================================
// * Show ACS Bubbles
//=============================================================================
Window_OmoriBattleActorStatus.prototype.showACSBubbles = function(duration = 15) {
  this._acsBubbleOpacityDuration = duration;
  this._acsBubbleOpacity = 255
};
//=============================================================================
// * Hide ACS Bubbles
//=============================================================================
Window_OmoriBattleActorStatus.prototype.hideACSBubbles = function(duration = 15) {
  this._acsBubbleOpacityDuration = duration;
  this._acsBubbleOpacity = 0
};
//=============================================================================
// * Setup ACS Bubbles
//=============================================================================
Window_OmoriBattleActorStatus.prototype.setupACSBubbles = function(list) {
  // Get Actor
  var actor = this.actor();
  for (var i = 0; i < this._acsBubbleSprites.length; i++) {
    // Get Skill
    var data = list[i];
    // Get Bubble
    var bubble = this._acsBubbleSprites[i];
    // Update Position
    bubble.updatePosition(i);
    // If Data
    if (data) {
      // Get Skill
      var skill = data[1];
      // Bubble Index
      var bubbleIndex = skill.meta.ChainSkillIcon === undefined ? 0 : Number(skill.meta.ChainSkillIcon);
      // If Skill is Chain Skill Energy Release And Energy is at max
      if (skill.meta.ChainSkillEnergyRelease  && $gameParty.stressEnergyCount >= 10) {
        // Change Index
        bubbleIndex = $gameParty.size() === 1 ?  3 : 2;
        bubble.startShake();
      } else {
        bubble.stopShake();
      };
      // Set Bubble Index
      bubble.setBubbleIndex(bubbleIndex);
      bubble.setArrowDirection(data[0]);
      actor.canUse(skill) ? bubble.activate() : bubble.deactivate();
    };
  };
};
//=============================================================================
// * Select ACS Bubble
//=============================================================================
Window_OmoriBattleActorStatus.prototype.selectACSBubble = function(direction) {
  for (var i = 0; i < this._acsBubbleSprites.length; i++) {
    // Get Bubble
    var bubble = this._acsBubbleSprites[i];
    if (bubble._arrowDirection === direction) {
       bubble.fadeOpacity(255, 5)
    } else {
       bubble.deactivate();
       bubble.fadeOpacity(0, 5)
    };
  };
};
//=============================================================================
// * Update ACS Bubbles
//=============================================================================
Window_OmoriBattleActorStatus.prototype.updateACSBubbles = function() {
  // Get Sprite
  var sprite = this._acsBubbleContainer;
  // If ACS Bubble duration is more than 0
  if (this._acsBubbleOpacityDuration > 0) {
    var d = this._acsBubbleOpacityDuration;
    sprite.opacity = (sprite.opacity * (d - 1) + this._acsBubbleOpacity) / d;
    this._acsBubbleOpacityDuration--;
  };
};



//=============================================================================
// ** Window_ActorCommand
//-----------------------------------------------------------------------------
// The window for selecting an actor's action on the battle screen.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriBattleSystem.Window_ActorCommand_makeCommandList = Window_ActorCommand.prototype.makeCommandList;
//=============================================================================
// * Object Initilization
//=============================================================================
Window_ActorCommand.prototype.initialize = function() {
  // Set Custom Cursor X Offset
  this._customCursorXOffset = 0;
  // Set Max Command Columns
  this._commandMaxCols = 2;
  // Super Call
  Window_Command.prototype.initialize.call(this, 0, 0);
  // Create Command Sprites
  this.createCommandSprites()
  this.opacity = 0;
  this.deactivate();
  this._actor = null;
  this.openness = 0;
};
//=============================================================================
// * Settings
//=============================================================================
Window_ActorCommand.prototype.windowWidth = function() { return 360; };
Window_ActorCommand.prototype.numVisibleRows = function() { return 4; };
Window_ActorCommand.prototype.isUsingCustomCursorRectSprite = function() { return true; };
Window_ActorCommand.prototype.maxCols = function() { return this._commandMaxCols; };
Window_ActorCommand.prototype.standardPadding = function() { return 0; };
Window_ActorCommand.prototype.itemHeight = function() { return 59 - 17; };
Window_ActorCommand.prototype.itemWidth = function() { return 178; };
Window_ActorCommand.prototype.customCursorRectXOffset = function() { return this._customCursorXOffset; }
Window_ActorCommand.prototype.customCursorRectYOffset = function() { return 0; }
Window_ActorCommand.prototype.spacing = function() { return 4; };
//=============================================================================
// * Item Rect
//=============================================================================
Window_ActorCommand.prototype.itemRect = function(index) {
  // Get Rect
  var rect = Window_Command.prototype.itemRect.call(this, index);
  // rect.x += 15;
  // rect.y -= 5;
  // console.log(index, rect)
  return rect;
};
//=============================================================================
// * Make Command List
//=============================================================================
Window_ActorCommand.prototype.makeCommandList = function() {
  // Run Original Function
  _TDS_.OmoriBattleSystem.Window_ActorCommand_makeCommandList.call(this);
  // If world index is 3
  if ($gameVariables.value(22) === 3 || $gameVariables.value(22) === 4) {
    // Remove all commands past the second one
    this._list.splice(2, 99);
  };
};
//=============================================================================
// * Draw Item
//=============================================================================
Window_ActorCommand.prototype.drawItem = function(index) {};
//=============================================================================
// * Determine if Current Item is Enabled
//=============================================================================
Window_ActorCommand.prototype.isCurrentItemEnabled = function() {
  // If Command is disabled return false
  if (this._actor && this._actor.isBattleCommandDisabled(this.index())) { return false; }

  // Return Original Function
  return Window_Command.prototype.isCurrentItemEnabled.call(this);
};
//=============================================================================
// * Create Command Sprites
//=============================================================================
Window_ActorCommand.prototype.createCommandSprites = function() {
  // Set Command Name
  let commandName = 'BattleCommands_DreamWorld';
  // Set Default Custom cursor X Offset
  this._customCursorXOffset = 12;
  // Set Default Max Columns
  this._commandMaxCols = 2;
  // Set Command
  switch ($gameVariables.value(22)) {
    case 1:
      commandName = 'BattleCommands_DreamWorld';
      this._commandMaxCols = 2;
    break;
    case 2: commandName = 'BattleCommands_Faraway' ;break;
    case 3:
      commandName = 'BattleCommands_BlackSpace';
      this._customCursorXOffset = 90;
      this._commandMaxCols = 1;
      // commandName = 'BattleCommands_BS_ATK_SKILL';
      // this._commandMaxCols = 1;
      // this._customCursorXOffset = 90;
      // break;
    case 4:
      commandName = 'BattleCommands_BlackSpace';
      this._customCursorXOffset = 90;
      this._commandMaxCols = 1;
      break;
    case 5:
      commandName = 'BattleCommands_BlackSpace';
      this._customCursorXOffset = 90;
      this._commandMaxCols = 1;
    break;
  };
  // Initialize Command Sprites Array
  this._commandSprites = [];
  // Get Bitmap
  var bitmap = ImageManager.loadSystem(commandName);
  var sw = bitmap.width / this._commandMaxCols;
  var sh = bitmap.height / 2;

  for (var i = 0; i < 4; i++) {
    // Create Command Sprite
    let sprite = new Sprite(bitmap);
    // Get Item Rectangle
    let rect = this.itemRect(i);

    let sx = (i % this._commandMaxCols) * sw;
    let sy = Math.floor(i / this._commandMaxCols) * sh;
    sprite.setFrame(sx, sy, sw, sh, 0, 0);
  //  sprite.x = rect.x - ((i % 2) * 2);
    sprite.x = rect.x;
    sprite.y = rect.y;
    this._commandSprites[i] = sprite;
    this.addChildToBack(sprite)
  };
};



//=============================================================================
// ** Window_BattleStatus
//-----------------------------------------------------------------------------
// The window for displaying the status of party members on the battle screen.
//=============================================================================
// * Object Initilization
//=============================================================================
Window_BattleStatus.prototype.initialize = function() {
  // Super Call
  Window_Selectable.prototype.initialize.call(this, 30, 0, 1, 1);
  // Window_Selectable.prototype.initialize.call(this, 30 + 100, 0 + 100, 1 + 300, 1 + 300);
  this.opacity = 0;
};
//=============================================================================
// * Update Arrows
//=============================================================================
Window_BattleStatus.prototype._updateArrows = function() {
  this._downArrowSprite.visible = false;
  this._upArrowSprite.visible = false;
};
//=============================================================================
// * Settings
//=============================================================================
Window_BattleStatus.prototype.maxCols = function() { return 2;};
//=============================================================================
// * Refresh
//=============================================================================
Window_BattleStatus.prototype.refresh = function() {
  // If Face Windows Exist
  if (this._faceWindows) {
    // Go Through Face Windows
    for (var i = 0; i < this._faceWindows.length; i++) {
      // Refresh Face Windows
      this._faceWindows[i].refresh();
    };
  };
};
//=============================================================================
// * Update Cursor
//=============================================================================
Window_BattleStatus.prototype.updateCursor = function() {
  // Super Call
  Window_Selectable.prototype.updateCursor.call(this);
  // Update Selected Face Windows
  this.updateSelectedFaceWindows();
};
//=============================================================================
// * Update Selected face windows
//=============================================================================
Window_BattleStatus.prototype.updateSelectedFaceWindows = function() {
  // If Face Windows Exist
  if (this._faceWindows) {
    // Go Through Face Windows
    for (var i = 0; i < this._faceWindows.length; i++) {
      // Set Selected State of face window
      this._faceWindows[i]._selected = i === this._index;
    };
  };
};
//=============================================================================
// * Find Next Index in Direction
//=============================================================================
Window_BattleStatus.prototype.findNextIndexInDirection = function(direction, index = this.index()) {
  switch (direction) {
    case 'up':
      // Index Switch Case
      switch (index) {
        case 2: // Omori
          if ($gameParty.memberAtStatusIndex(0)) { return 0; };
          if ($gameParty.memberAtStatusIndex(1)) { return 1; };

        break;
        case 3: // Hero
          if ($gameParty.memberAtStatusIndex(1)) { return 1; };
          if ($gameParty.memberAtStatusIndex(0)) { return 0; };
        break;
      };
    break;
    case 'down':
      // Index Switch Case
      switch (index) {
        case 0: // Aubrey
          if ($gameParty.memberAtStatusIndex(2)) { return 2; };
          if ($gameParty.memberAtStatusIndex(3)) { return 3; };
        break;
        case 1: // Kel
          if ($gameParty.memberAtStatusIndex(3)) { return 3; };
          if ($gameParty.memberAtStatusIndex(2)) { return 2; };
        break;
      };

    break;
    case 'left':
      // Index Switch Case
      switch (index) {
        case 1: // Kel
          if ($gameParty.memberAtStatusIndex(0)) { return 0; };
          if ($gameParty.memberAtStatusIndex(2)) { return 2; };
        break;
        case 3: // Hero
          if ($gameParty.memberAtStatusIndex(2)) { return 2; };
          if ($gameParty.memberAtStatusIndex(0)) { return 0; };
        break;
      };

    break;
    case 'right':
      // Index Switch Case
      switch (index) {
        case 0: // Aubrey
          if ($gameParty.memberAtStatusIndex(1)) { return 1; };
          if ($gameParty.memberAtStatusIndex(3)) { return 3; };
        break;
        case 2: // Omori
          if ($gameParty.memberAtStatusIndex(3)) { return 3; };
          if ($gameParty.memberAtStatusIndex(1)) { return 1; };
        break;

      };
    break;
  };
  // Return provided Index
  return index;
};
//=============================================================================
// * Update Index from Direction
//=============================================================================
Window_BattleStatus.prototype.updateIndexFromDirection = function(direction, index = this.index()) {
  // If Index is more than -1
  if (index >= 0) {
    // Set Index
    this._index = this.findNextIndexInDirection(direction, index);
    // Update Cursor
    this.updateCursor();
    // Update Selected face windows
    this.updateSelectedFaceWindows();
  };
};
//=============================================================================
// * Cursor Up
//=============================================================================
Window_BattleStatus.prototype.cursorUp = function(wrap) {
  this.updateIndexFromDirection('up');
};
//=============================================================================
// * Cursor Down
//=============================================================================
Window_BattleStatus.prototype.cursorDown = function(wrap) {
  this.updateIndexFromDirection('down');
};
//=============================================================================
// * Cursor Left
//=============================================================================
Window_BattleStatus.prototype.cursorLeft = function(wrap) {
    this.updateIndexFromDirection('left');
};
//=============================================================================
// * Cursor Left
//=============================================================================
Window_BattleStatus.prototype.cursorRight = function(wrap) {
  this.updateIndexFromDirection('right');
};
//=============================================================================
// * Show Actor chain Skill bubbles
//=============================================================================
Window_BattleStatus.prototype.showActorChainSkillBubbles = function(actor, list) {
  // Go Through Windows
  for (var i = 0; i < this._faceWindows.length; i++) {
    var win = this._faceWindows[i];
    var selected = win.actor() === actor;
    if (selected) {
      win.showACSBubbles(15);
      win.setupACSBubbles(list);
    } else {
      win.hideACSBubbles(15);
    };
  };
};
//=============================================================================
// * Select Actor Chain Skill Bubble
//=============================================================================
Window_BattleStatus.prototype.selectActorChainSkillBubble = function(actor, direction) {
  // Go Through Windows
  for (var i = 0; i < this._faceWindows.length; i++) {
    var win = this._faceWindows[i];
    var selected = win.actor() === actor;
    // If Selected
    if (selected) {
      win.selectACSBubble(direction)
      break
    };
  };
};



//=============================================================================
// ** Window_BattleActor
//-----------------------------------------------------------------------------
// The window for selecting a target actor on the battle screen.
//=============================================================================
// * Frame Update
//=============================================================================
Window_BattleActor.prototype.update = function() {
  // Super Call
  Window_Selectable.prototype.update.call(this);
  // If Input Shift is triggered
  if (this.active && Input.isTriggered('shift')) {
    // Call Group Target Swap
    if (this._groupTargetSwap) { this._groupTargetSwap(); };
  };
};
//=============================================================================
// * Determine if ok is enabled
//=============================================================================
Window_BattleActor.prototype.isOkEnabled = function() {
  // let actor = this.actor();
  // if (this._selectDead && actor) return actor.isDead();
  return Window_Selectable.prototype.isOkEnabled.call(this);
};



//=============================================================================
// ** Window_BattleEnemy
//-----------------------------------------------------------------------------
// The window for selecting a target enemy on the battle screen.
//=============================================================================
// * Frame Update
//=============================================================================
Window_BattleEnemy.prototype.update = function() {
  // Super Call
  Window_Selectable.prototype.update.call(this);
  // If Input Shift is triggered
  if (this.active && Input.isTriggered('shift')) {
    // Call Group Target Swap
    if (this._groupTargetSwap) { this._groupTargetSwap(); };
  };
};



//=============================================================================
// ** Window_PartyCommand
//-----------------------------------------------------------------------------
// The window for selecting an actor's action on the battle screen.
//=============================================================================
// * Object Initilization
//=============================================================================
Window_PartyCommand.prototype.initialize = function() {
  Window_Command.prototype.initialize.call(this, 0, 0);
  this.opacity = 0;
  this.createCommandSprites();
  this.createEscapeBlockSprites();
  this.deactivate();
};
//=============================================================================
// * Settings
//=============================================================================
Window_PartyCommand.prototype.windowWidth = function() { return 360; };
Window_PartyCommand.prototype.numVisibleRows = function() { return 4; };
Window_PartyCommand.prototype.isUsingCustomCursorRectSprite = function() { return true; };
Window_PartyCommand.prototype.maxCols = function() { return 1; };
Window_PartyCommand.prototype.standardPadding = function() { return 0; };
Window_PartyCommand.prototype.itemHeight = function() { return 39; };

const _old_Window_Party_Command_maxTopRow = Window_PartyCommand.prototype.maxTopRow;
Window_PartyCommand.prototype.maxTopRow = function() {
  if(typeof this.maxRows !== "function") {return 0;}
  return _old_Window_Party_Command_maxTopRow.call(this);
}
//=============================================================================
// * Play Ok sound
//=============================================================================
Window_PartyCommand.prototype.playOkSound = function() {
  // If world index is 5
  if (SceneManager.currentWorldIndex() === 5) {
    AudioManager.playSe({name: "SE_play", pan: 0, pitch: 100, volume: 90});
    return
  }
  // Play Default Ok sound
  Window_Command.prototype.playOkSound.call(this);
};
//=============================================================================
// * Item Rect
//=============================================================================
Window_PartyCommand.prototype.itemRect = function(index) {
  // Get Rect
  var rect = Window_Command.prototype.itemRect.call(this, index);
  if ($gameVariables.value(22) === 5) {
    rect.x += 95;
    rect.y += 20;
  } else {
    rect.x += [60, 80][index]
  };
  return rect;
};
//=============================================================================
// * Make Command List
//=============================================================================
Window_PartyCommand.prototype.makeCommandList = function() {
  this.addCommand(TextManager.fight,  'fight');
  if ($gameVariables.value(22) !== 5) {
    this.addCommand(TextManager.escape, 'escape', BattleManager.canEscape());
  };
};
//=============================================================================
// * Draw Item
//=============================================================================
Window_PartyCommand.prototype.drawItem = function(index) { };
//=============================================================================
// * Create Escape Block Sprites
//=============================================================================
Window_PartyCommand.prototype.createEscapeBlockSprites = function() {
  // Create Escape Block Container
  this._escapeBlockContainer = new Sprite();
  this.addChild(this._escapeBlockContainer);
};
//=============================================================================
// * Create Command Sprites
//=============================================================================
Window_PartyCommand.prototype.createCommandSprites = function() {
  // Set Command Name
  let commandName = 'party_command';
  let commandsSize = 2;
  // Set Command
  switch ($gameVariables.value(22)) {
    case 1: commandName = 'PartyCommands_DreamWorld' ;break;
    case 2: commandName = 'PartyCommands_Faraway' ;break;
//   case 3: commandName = 'party_command' ;break;
    case 3: commandName = 'PartyCommands_BlackSpace' ;break;
    case 4: commandName = 'PartyCommands_BlackSpace' ;break;
    case 5: commandName = 'PartyCommands_FinalBattle'; commandsSize = 1 ;break;
  };
  // Hard code it to for simplicty sake
  //if (BattleManager._battleRetried && $gameTroop._troopId == 891) {
  if ($gameVariables.value(1220) >= 5  && $gameTroop._troopId == 891) {
    commandName = 'PartyCommands_FinalBattle';
    commandsSize = 1;
  }

  // Initialize Command Sprites Array
  this._commandSprites = [];
  // Get Bitmap
  let bitmap = ImageManager.loadSystem(commandName);
  bitmap.addLoadListener(() => {
    if (commandsSize > 1) {
      let height = bitmap.height / commandsSize;
      for (var i = 0; i < commandsSize; i++) {
        var sprite = new Sprite(bitmap);
        sprite.setFrame(0, i * height, 360, height);
        sprite.y = i * (height + 3);
  
  
        this._commandSprites[i] = sprite;
        this.addChildToBack(sprite)
      };
    } else {
      let sprite = new Sprite(bitmap);
      sprite.setFrame(0, 0, 360, bitmap.height);
      sprite.y = 0;
      this._commandSprites[i] = sprite;
      this.addChildToBack(sprite)
    };
  })

};
//=============================================================================
// * Process Ok
//=============================================================================
Window_PartyCommand.prototype.processOk = function() {
  // Get World Index
  let world = $gameVariables.value(22);
  // Get Current Command symbol
  let symbol = this.currentSymbol();
  // If escape command and world is 4 or 5
  if (symbol === 'escape' && (world === 4 || world === 5)) {
    // If Escape Block Container has no children
    if (this._escapeBlockContainer.children.length === 0) {
      // Start Escape Block Effect
      this.startEscapeBlockEffect()
    };
    return;
  };
  // Remove Children
  this._escapeBlockContainer.removeChildren();
  // Run Original Function
  Window_Command.prototype.processOk.call(this);
};
//=============================================================================
// * Start Escape Block Effect
//=============================================================================
Window_PartyCommand.prototype.startEscapeBlockEffect = function() {
  // Set Spacing
  let spacing = [20, 0, 30]
  for (var s = 0; s < 2; s++) {
    for (var i = 0; i < 3; i++) {
      // Create Sprite
      let sprite = new Sprite_BattleBSRedHand(s);
      sprite.x = s === 0 ? (this.width - 60) + spacing[i] : -0 - spacing[i];
      sprite.y = (this.itemRect(1).y - 25) + i * 13;
      this._escapeBlockContainer.addChild(sprite);
    };
  };
};




//=============================================================================
// ** Sprite_BattleBSRedHand
//-----------------------------------------------------------------------------
// This sprite is used to display red hands in battle menus
//=============================================================================
function Sprite_BattleBSRedHand() { this.initialize.apply(this, arguments); }
Sprite_BattleBSRedHand.prototype = Object.create(Sprite.prototype);
Sprite_BattleBSRedHand.prototype.constructor = Sprite_BattleBSRedHand;
//=============================================================================
// * Object Initilization
//=============================================================================
Sprite_BattleBSRedHand.prototype.initialize = function(side = 0) {
  // Super Call
  Sprite.prototype.initialize.call(this);
  // Set Side
  this._side = side;
  // Setup Bitmap
  this.setupBitmap(side);

  AudioManager.playSe({name: "SE_red_hands", pan: 0, pitch: 100, volume: 90});
  // Set Move speed
  this._moveSpeed = side === 0 ? -4 : 4
  // Initialize Phase
  this._phase = 0;
  // Initialize Animation
  this._animation = {frame: Math.randomInt(4), frames: [0, 1, 2, 1], count: 0, delay: 7};
  // Initialize Opacity
  this.opacity = 0;
};
//=============================================================================
// * Setup bitmap
//=============================================================================
Sprite_BattleBSRedHand.prototype.setupBitmap = function(side) {
  // Get Bitmap
  let bitmap = ImageManager.loadSystem('bsRedHands');
  let width = bitmap.width / 3;
  let height = bitmap.height / 2;
  // Set Bitmap
  this.bitmap = bitmap;
  // Set Frame
  this.setFrame(0, side * height, width, height);
};
//=============================================================================
// * Frame Update
//=============================================================================
Sprite_BattleBSRedHand.prototype.update = function() {
  // Super Call
  Sprite.prototype.update.call(this);
  // Update Animation
  this.updateAnimation();
};
//=============================================================================
// * Update Animation
//=============================================================================
Sprite_BattleBSRedHand.prototype.updateAnimation = function() {

  if (this._phase === 0) {
    // Increase Opacity
    this.opacity += 30;
    // Move by Amount of Move Speed
    this.x += this._moveSpeed;
    // Set Phase
    if (this.opacity >= 255) { this._phase = 1;};
  } else if (this._phase === 1) {
    // Move Flag
    let move = true;
    // If side is 0
    if (this._side === 0) {
      move = this.x > 170;
    } else {
      move = this.x < 130;
    };
    // If can move
    if (move) {
      // Move by Amount of Move Speed
      this.x += this._moveSpeed;
    } else {
      // Set Phase
      this._phase = 2;
    };
  } else {
    // Decrease Opacity
    this.opacity -= 10;

    // If Opacity is 0 or less
    if (this.opacity <= 0) {
      // Remove Child
      this.parent.removeChild(this);
    };
  };

  // Get Animation
  let anim = this._animation;
  // Decrease Animation Count
  anim.count--;
  // If animation count is 0 or less
  if (anim.count <= 0) {
    // Increase Frame
    anim.frame = (anim.frame + 1) % anim.frames.length;
    // Set Frame
    this.setFrame(anim.frames[anim.frame] * this.width, this._frame.y, this.width, this.height);
    // Resets Animation Count
    anim.count = anim.delay;
  };
};





//=============================================================================
// ** Window_ItemListBack
//-----------------------------------------------------------------------------
// This window displays the quest list header.
//=============================================================================
function Window_ItemListBack() { this.initialize.apply(this, arguments); }
Window_ItemListBack.prototype = Object.create(Window_Base.prototype);
Window_ItemListBack.prototype.constructor = Window_ItemListBack;
//=============================================================================
// * Initialize Object
//=============================================================================
Window_ItemListBack.prototype.initialize = function(width, height) {
  // Super Call
  Window_Base.prototype.initialize.call(this, 0, -30, width, height);
  // Draw Separator
  this.contents.fillRect(0, 28, this.contents.width, 2, 'rgba(255, 255, 255, 2)')
};
//=============================================================================
// * Settings
//=============================================================================
Window_ItemListBack.prototype.standardPadding = function() { return 4 };
Window_ItemListBack.prototype.standardFontSize = function() { return 20; };
//=============================================================================
// * Calculate Text Height
//=============================================================================
Window_ItemListBack.prototype.setItem = function(item) {
  // Clear Rect
  this.contents.clearRect(0, 0, this.contents.width, 28);
  // If Item
  if (DataManager.isItem(item)) {
    // Set Bitmap Font color to null
    this.contents.bitmapFontColor = null;
    // Draw Item Count
    this.contents.drawText(LanguageManager.getMessageData("XX_BLUE.Omori_Battle_System").hold.format($gameParty.battleNumItems(item)), 6, 2, 100, 20);
    /*this.contents.drawText('EFFECT:', 0, 2, this.contents.width - 148, 20, 'right');
    // Set Default HP Bonus
    var hpBonus = 'N\\A', hpValue = 0;
    // If There's an HP bonus
    if (item.meta.HpEffect) {
      // Get Effect
      var effect = item.meta.HpEffect;
      // Rate Check
      var rateCheck = effect.match(/%$/) !== null;
      // Set HP Value
      hpValue = Number(effect.replace(/%$/, ''));
      // Set HP Bonus
      hpBonus = effect.trim();
    };*/

    // Set Default MP Bonus
    /*var mpBonus = 'N\\A', mpValue = 0;
    // If There's an MP bonus
    if (item.meta.MpEffect) {
      // Get Effect
      var effect = item.meta.MpEffect;
      // // Rate Check
      // var rateCheck = effect.match(/%$/) !== null;
      // Set HP Value
      mpValue = Number(effect.replace(/%$/, ''));
      // Set HP Bonus
      mpBonus = effect.trim();
    };*/

    // Set Color
    /*if (hpValue > 0) {
      // Set HP Bonus Value
      hpBonus = '+' + hpBonus;
     this.contents.bitmapFontColor = BitmapFontManager.hexToRGB(this.powerUpColor());
    } else if (hpBonus < 0) {
     this.contents.bitmapFontColor = BitmapFontManager.hexToRGB(this.powerDownColor());
    };
    this.contents.drawText(hpBonus, this.contents.width - 119, 2, 42, 20, 'center');*/

    // Set Bitmap Font color to null
   /* this.contents.bitmapFontColor = null;
    if (mpValue > 0) {
      // Adjust MP Bonus
      mpBonus = '+' + mpBonus;
      this.contents.bitmapFontColor = BitmapFontManager.hexToRGB(this.powerUpColor());
    } else if (mpBonus < 0) {
     this.contents.bitmapFontColor = BitmapFontManager.hexToRGB(this.powerDownColor());
    };
    this.contents.drawText(mpBonus, this.contents.width - 49, 2, 42, 20, 'center');
    // Draw Icons
    this.drawHPIcon(this.contents.width - 137, 6);
    this.drawMPIcon(this.contents.width - 70, 6);*/
  };
  // If Skill
  if (DataManager.isSkill(item)) {
    // Set Bitmap Font color to null
    this.contents.bitmapFontColor = null;
    this.contents.drawText(LanguageManager.getMessageData("XX_BLUE.Omori_Battle_System").cost, 6, 2, 100, 20);
    this.contents.drawText(this._actor.skillMpCost(item), 0, 2, 95, 20, 'right');
    this.drawMPIcon(100, 6);
  };
};




//=============================================================================
// ** Window_BattleItem
//-----------------------------------------------------------------------------
// The window for selecting an item to use on the battle screen.
//=============================================================================
// * Object Initialization
//=============================================================================
Window_BattleItem.prototype.initialize = function(x, y, width, height) {
  this._arrowBitmap = new Bitmap(50, 50);
  this._arrowBitmap.fillAll('rgba(255, 0, 0, 1)')
  // Super Call
  Window_ItemList.prototype.initialize.call(this, x, y + 30, width, 90);
  // Create Back Window
  this._backWindow = new Window_ItemListBack(width, height)
  this.addChildToBack(this._backWindow);
  this.opacity = 0;
  this.hide();

};
//=============================================================================
// * Settings
//=============================================================================
Window_BattleItem.prototype.isUsingCustomCursorRectSprite = function() { return true; };
Window_BattleItem.prototype.includes = function(item) { return $gameParty.canUse(item); };
Window_BattleItem.prototype.lineHeight = function() { return 24; };
Window_BattleItem.prototype.spacing = function() { return 0; };
Window_BattleItem.prototype.standardPadding = function() { return 10; };
Window_BattleItem.prototype.customCursorRectXOffset = function() { return -24; }
//=============================================================================
// * Determine if Item should be included
//=============================================================================
Window_BattleItem.prototype.includes = function(item) {
  if (!DataManager.isItem(item)) { return false; };
  if (!$gameParty.canUse(item)) { return false; }
  if ($gameParty.battleNumItems(item) <= 0) { return false; };
  // Category Switch Case
  switch (this._category) {
  case 'toys':
    return DataManager.isToyItem(item);
  case 'snacks':
      return DataManager.isConsumableItem(item);
  };
  // Return false by default
  return false;;
};
//=============================================================================
// * Item Rect
//=============================================================================
Window_BattleItem.prototype.itemRect = function(index) {
  // Get Rect
  var rect = Window_SkillList.prototype.itemRect.call(this, index);
  rect.x += 36;
  return rect;
};
//=============================================================================
// * Draw Item
//=============================================================================
Window_BattleItem.prototype.drawItem = function(index) {
  var item = this._data[index];
  this.contents.fontSize = 24;
  if (item) {
    var rect = this.itemRect(index);
    rect.width -= this.textPadding();
    rect.width -= 40;
    this.changePaintOpacity(this.isEnabled(item));
    // Get Name
    var name = DataManager.itemShortName(item);
    this.contents.drawText(name, rect.x, rect.y, rect.width, rect.height);
    this.changePaintOpacity(1);
  };
};
//=============================================================================
// * Refresh Arrows
//=============================================================================
Window_BattleItem.prototype._refreshArrows = function() {
  // Super Call
  Window_ItemList.prototype._refreshArrows.call(this);
  this._upArrowSprite.x = this._width - 12;
  this._downArrowSprite.x = this._upArrowSprite.x;
  this._downArrowSprite.y = this.height - 33;
};
//=============================================================================
// * Update Help
//=============================================================================
Window_BattleItem.prototype.updateHelp = function() {
  // Super Call
  Window_ItemList.prototype.updateHelp.call(this);
  if (this._backWindow) {
    this._backWindow._actor = this._actor;
    this._backWindow.setItem(this.item());
  };
};
//=============================================================================
// * On Cursor Down
//=============================================================================
Window_BattleItem.prototype.cursorDown = function(wrap) {
  var index = this.index();
  var maxItems = this.maxItems();
  var maxCols = this.maxCols();
  if (index < maxItems - maxCols) {
      this.select((index + maxCols) % maxItems);
  } else if (index < maxItems && maxItems > 2 && index === maxItems - 2) {
    this.select(maxItems-1);
  }
};




//=============================================================================
// ** Window_BattleSkill
//-----------------------------------------------------------------------------
// The window for selecting skills to use on the battle screen.
//=============================================================================
// * Object Initialization
//=============================================================================
Window_BattleSkill.prototype.initialize = function(x, y, width, height) {
  // Super Call
  Window_SkillList.prototype.initialize.call(this, x, y + 30, width, 90);
  // Create Back Window
  this._backWindow = new Window_ItemListBack(width, height)
  this.addChildToBack(this._backWindow);
  this.opacity = 0;
  this.hide();
};
//=============================================================================
// * Settings
//=============================================================================
Window_BattleSkill.prototype.isUsingCustomCursorRectSprite = function() { return true; };
//Window_BattleSkill.prototype.includes = function(item) { return Window_SkillList.prototype.includes };
Window_BattleSkill.prototype.lineHeight = function() { return 22; };
Window_BattleSkill.prototype.spacing = function() { return 0; };
Window_BattleSkill.prototype.standardPadding = function() { return 10; };
Window_BattleSkill.prototype.customCursorRectXOffset = function() { return -28; }
//=============================================================================
// * Determine if Item Should be included
//=============================================================================
Window_BattleSkill.prototype.includes = function(item) {
  if (item) { return true; }
  return false;
};
//=============================================================================
// * Item Rect
//=============================================================================
Window_BattleSkill.prototype.itemRect = function(index) {
  // Get Rect
  var rect = Window_SkillList.prototype.itemRect.call(this, index);
  rect.x += 36;
  return rect;
};
//=============================================================================
// * Select Last
//=============================================================================
Window_BattleSkill.prototype.selectLast = function() {
  // Return 0 if not remembering command
  if (!ConfigManager.commandRemember) { return this.select(0); };
  // Run Original Function
  Window_SkillList.prototype.selectLast.call(this);
};
//=============================================================================
// * Draw Item
//=============================================================================
Window_BattleSkill.prototype.drawItem = function(index) {
  var item = this._data[index];
  this.contents.fontSize = 24;
  if (item) {
    var rect = this.itemRect(index);
    rect.width -= this.textPadding();
    rect.width -= 40;
    this.changePaintOpacity(this.isEnabled(item));
    // Get Name
    var name = DataManager.itemShortName(item);
    this.contents.drawText(name, rect.x + 5, rect.y, rect.width, rect.height);
    this.changePaintOpacity(1);
  };
};
//=============================================================================
// * Refresh Arrows
//=============================================================================
Window_BattleSkill.prototype._refreshArrows = function() {
  // Super Call
  Window_SkillList.prototype._refreshArrows.call(this);
  var w = this._width;
  var h = this._height;
  var p = 24;
  var q = p/2;
  this._downArrowSprite.move(w - q, (h - q) + 6);
  this._upArrowSprite.move(w - q, q + 1);
};
//=============================================================================
// * Update Help
//=============================================================================
Window_BattleSkill.prototype.updateHelp = function() {
  // Super Call
  Window_SkillList.prototype.updateHelp.call(this);
  if (this._backWindow) {
    this._backWindow._actor = this._actor;
    this._backWindow.setItem(this.item());
  };
};



//=============================================================================
// ** AudioManager
//-----------------------------------------------------------------------------
// Adding a custom channel for Danger's BGS;
// 
//=============================================================================

AudioManager._dangerBgs = null;
AudioManager._dangerBgsBuffer = null;

AudioManager.playDangerBgs = function(bgs, pos) {
  if (!!AudioManager._dangerBgs && AudioManager._dangerBgs.name === bgs.name) {
      this.updateDangerBgsParameters(bgs);
  } else {
      this.stopDangerBgs();
      if (bgs.name) {
          this._dangerBgsBuffer = this.createBuffer('bgs', bgs.name);
          this.updateDangerBgsParameters(bgs);
          this._dangerBgsBuffer.play(true, pos || 0);
      }
  }
  this.updateDangersBgs(bgs, pos);
};

AudioManager.stopDangerBgs = function() {
  if (this._dangerBgsBuffer) {
      this._dangerBgsBuffer.stop();
      this._dangerBgsBuffer = null;
      this._dangerBgs = null;
  }
};

AudioManager.updateDangerBgsParameters = function(bgs) {
  this.updateBufferParameters(this._dangerBgsBuffer, this._bgsVolume, bgs);
};

AudioManager.updateDangersBgs = function(bgs, pos) {
  this._dangerBgs = {
      name: bgs.name,
      volume: bgs.volume,
      pitch: bgs.pitch,
      pan: bgs.pan,
      pos: pos
  };
};

AudioManager.fadeOutDangerBgs = function(duration) {
  if (this._dangerBgsBuffer && this._dangerBgs) {
      this._dangerBgsBuffer.fadeOut(duration);
      this._dangerBgs = null;
  }
};

//=============================================================================
// ** Sprite_ScrollingText
//-----------------------------------------------------------------------------
// This sprite is used to display scrolling text in log type
// situations.
//=============================================================================
function Sprite_ScrollingText() { this.initialize.apply(this, arguments); }
Sprite_ScrollingText.prototype = Object.create(Sprite.prototype);
Sprite_ScrollingText.prototype.constructor = Sprite_ScrollingText;
//=============================================================================
// * Object Initilization
//=============================================================================
Sprite_ScrollingText.prototype.initialize = function() {
  // Super Call
  Sprite.prototype.initialize.call(this);
  this.x = 14;
  this.y = 4;
  this.width = 360 - 28;
  this.height = 88 - 4;
  this.bitmap = new Bitmap(this.width, this.height);
  // Area Mask
  this._areaMask = new PIXI.Graphics();
  this._areaMask.beginFill(0xFFF);
  this._areaMask.drawRect(0, 0, this.width, this.height);
  this._areaMask.endFill()
  this.mask = this._areaMask
  this.addChild(this._areaMask);
  // Create Line Sprites Container
  this._lineSpritesContainer = new Sprite();
  this.addChild(this._lineSpritesContainer);

  // List of Sprites
  this._list = [];
  // Remove List
  this._removeList = [];
  // Create Window
  this._window = new Window_ScrollingTextSource(this.width, this.height);
  this._window.y = this.height;
  this.addChild(this._window);
};
//=============================================================================
// * Clear
//=============================================================================
Sprite_ScrollingText.prototype.clear = function() {
  for (var i = 0; i < this._list.length; i++) {
   this._lineSpritesContainer.removeChild(this._list[i])
  }
  this._list = [];
};
//=============================================================================
// * Line Width
//=============================================================================
Sprite_ScrollingText.prototype.lineWidth = function() {
  return this.width;
};
//=============================================================================
// * Add Line
//=============================================================================
Sprite_ScrollingText.prototype.addLine = function(text) {
  // Get Last
  var last = this._list[this._list.length - 1];
  // Get Text Data
  var textData = this._window.drawTextEx(text, 0, -4);
  // Create Bitmap
  var bitmap = new Bitmap(this.lineWidth(), textData.height);
  // bitmap.fillAll('rgba(255, 0, 0, 0.5)')
  // Transfer Window Contents
  bitmap.blt(this._window.contents, 0, 0, bitmap.width, bitmap.height, 0, 0);
  // Create Sprite
  var sprite = new Sprite(bitmap);
  sprite.y = last ? last.y + last.height : 0;
  sprite.opacity = 0;
  this._list.push(sprite)
  this._lineSpritesContainer.addChild(sprite);
  // Return Sprite
  return sprite;
};
//=============================================================================
// * Frame Update
//=============================================================================
Sprite_ScrollingText.prototype.update = function() {
  // Super Call
  Sprite.prototype.update.call(this);
  // Update Lines
  this.updateLines();
};
//=============================================================================
// * Update Lines
//=============================================================================
Sprite_ScrollingText.prototype.updateLines = function() {
  // If List is more than 0
  if (this._list.length > 0) {
    // Get First
    var first = this._list[0];
    // Get Last Sprite
    var last = this._list[this._list.length - 1];
    // Needs scrolling flag
    var needsScrolling = first.y < 0 && first.y >= -first.height || last.y + last.height > this.height;
    // If Needs scrolling
    if (needsScrolling ) {
      first.y = Math.max(first.y - 3, -first.height);
      first.opacity -= 20;
    };
    // If first has reached removal position
    if (first.y <= -first.height) {
      // Get Sprite
      var sprite = this._list.shift();
      this._lineSpritesContainer.removeChild(sprite);
      // Get Next Sprite
      var next = this._list[0];
      // If Next Sprite Exists set the Y to 0
      if (next) { next.y = 0; };
    };

    var fadeInSpeed = 30;
    if (first.y >= 0 && first.opacity < 255) { first.opacity += fadeInSpeed; };

    for (var i = 1; i < this._list.length; i++) {
      var sprite = this._list[i];
      var prev = this._list[i-1];
      sprite.y = (prev.y + prev.height)

      if (sprite.opacity < 255 && (sprite.y > 0 && sprite.y <= this.height)) {
        sprite.opacity += fadeInSpeed;
      };
    };
  };
};




//=============================================================================
// ** Window_ScrollingTextSource
//-----------------------------------------------------------------------------
// This window displays the quest list header.
//=============================================================================
function Window_ScrollingTextSource() { this.initialize.apply(this, arguments); }
Window_ScrollingTextSource.prototype = Object.create(Window_Base.prototype);
Window_ScrollingTextSource.prototype.constructor = Window_ScrollingTextSource;
//=============================================================================
// * Initialize Object
//=============================================================================
Window_ScrollingTextSource.prototype.initialize = function(width, height) {
  // Super Call
  Window_Base.prototype.initialize.call(this, 0, 0, width, height);
};
//=============================================================================
// * Settings
//=============================================================================
Window_ScrollingTextSource.prototype.standardPadding = function() { return 0 };
Window_ScrollingTextSource.prototype.standardFontSize = function() { return LanguageManager.getMessageData("XX_BLUE.Window_ScrollingTextSource").standardFontSize; };
//=============================================================================
// * Clear Functions
//=============================================================================
Window_ScrollingTextSource.prototype._refreshBack = function() {};
Window_ScrollingTextSource.prototype._refreshFrame = function() { };
Window_ScrollingTextSource.prototype._refreshCursor = function() { };
Window_ScrollingTextSource.prototype._refreshArrows = function() { };
Window_ScrollingTextSource.prototype._refreshPauseSign = function() { };
Window_ScrollingTextSource.prototype._updateCursor = function() {
  this._windowCursorSprite.visible = false;
};
Window_ScrollingTextSource.prototype._updateArrows = function() {
  this._downArrowSprite.visible = false
  this._upArrowSprite.visible = false
};
Window_ScrollingTextSource.prototype._updatePauseSign = function() {
  var sprite = this._windowPauseSignSprite;
  sprite.visible = false;
};
//=============================================================================
// * Calculate Text Height
//=============================================================================
Window_ScrollingTextSource.prototype.calcTextHeight = function(textState, all) {
  return Window_Base.prototype.calcTextHeight.call(this, textState, all) - 5;
};
//=============================================================================
// * Draw Text Ex
//=============================================================================
Window_ScrollingTextSource.prototype.drawTextEx = function(text, x, y) {
  // Clear Contents
  this.contents.clear();
  // Reset Bitmap Font Color
  this.contents.bitmapFontColor = null;
  if (text) {
    var textState = { index: 0, x: x, y: y, left: x };
    textState.text = this.convertEscapeCharacters(text);
    textState.height = this.calcTextHeight(textState, false);
    this.resetFontSettings();
    while (textState.index < textState.text.length) {
        this.processCharacter(textState);
    }
    return textState
  } else {
    return 0;
  };
};
//=============================================================================
// * Process Draw Input Icon
//=============================================================================
Window_ScrollingTextSource.prototype.processDrawInputIcon = function(input, textState) {
  // Get Key
  var key = Input.inputKeyCode(input);
  // Get Rect
  var rect = this.contents.keyIconRects(key).up;
  // Add Padding Space
  textState.x += 4;
  // Draw Key Icon
  this.contents.drawAlginedKeyIcon(key, textState.x, textState.y + 5, rect.width, textState.height);
  // Increase Texstate X position
  textState.x += rect.width + 4;
};









//=============================================================================
// ** Window_BattleLog
//-----------------------------------------------------------------------------
// The window for displaying battle progress. No frame is displayed, but it is
// handled as a window for convenience.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriBattleSystem.Window_BattleLog_initialize             = Window_BattleLog.prototype.initialize;
_TDS_.OmoriBattleSystem.Window_BattleLog_clear                  = Window_BattleLog.prototype.clear;
_TDS_.OmoriBattleSystem.Window_BattleLog_addText                = Window_BattleLog.prototype.addText;
_TDS_.OmoriBattleSystem.Window_BattleLog_isBusy                 = Window_BattleLog.prototype.isBusy;
_TDS_.OmoriBattleSystem.Window_BattleLog_update                 = Window_BattleLog.prototype.update;
_TDS_.OmoriBattleSystem.Window_BattleLog_updateWait             = Window_BattleLog.prototype.updateWait;
_TDS_.OmoriBattleSystem.Window_BattleLog_showChainSkillList     = Window_BattleLog.prototype.showChainSkillList;
_TDS_.OmoriBattleSystem.Window_BattleLog_hideChainSkillList     = Window_BattleLog.prototype.hideChainSkillList;
_TDS_.OmoriBattleSystem.Window_BattleLog_updateChainkSkillInput = Window_BattleLog.prototype.updateChainkSkillInput
_TDS_.OmoriBattleSystem.Window_BattleLog_updateChainkSkillInput = Window_BattleLog.prototype.updateChainkSkillInput
_TDS_.OmoriBattleSystem.Window_BattleLog_performDamage          = Window_BattleLog.prototype.performDamage;
//=============================================================================
// * Object Initialization
//=============================================================================
Window_BattleLog.prototype.initialize = function() {
  // Run Original Function
  _TDS_.OmoriBattleSystem.Window_BattleLog_initialize.call(this);
  // Wait for Input Flag
  this._waitingForInput = false;
  // Set Initial Position
  this.x = 140;
  this.y = -4;
  // Create Scrolling Text
  this.createScrollTextSprite();
  // Set Opacity
  this.opacity = 255;
};
//=============================================================================
// * Settings
//=============================================================================
Window_BattleLog.prototype.windowWidth = function() { return 360; };
Window_BattleLog.prototype.windowHeight = function() { return 93 };
//=============================================================================
// * Clear Functions (Prevent usage)
//=============================================================================
Window_BattleLog.prototype.drawLineText = function() { };
Window_BattleLog.prototype.refresh = function() { };
//=============================================================================
// * Create Scroll Text Sprite
//=============================================================================
Window_BattleLog.prototype.createScrollTextSprite = function() {
  // Create Scroll Text Sprite
  this._scrollTextSprite = new Sprite_ScrollingText();
  this.addChild(this._scrollTextSprite);
};
//=============================================================================
// * Clear
//=============================================================================
Window_BattleLog.prototype.clear = function() {
  // Run Original Function
  _TDS_.OmoriBattleSystem.Window_BattleLog_clear.call(this);
  // Clear
  this._scrollTextSprite.clear();
};
//=============================================================================
// * Add Text
//=============================================================================
Window_BattleLog.prototype.addText = function(text) {
  // // If Scroll Text Sprite Exists Add it
   if (this._scrollTextSprite) {
     this._scrollTextSprite.addLine(text);
     if (ConfigManager.battleLogSpeed === 1) {
       this.push('wait');

     } else if (ConfigManager.battleLogSpeed === 2) {
       let currentSkill = !!BattleManager._action && BattleManager._action._item ? BattleManager._action._item.object() : null;
       let skillId = !!DataManager.isSkill(currentSkill) ? currentSkill.id : 0;
       let ACS_SKILLS = [
         46,47,48,49,50,51,52,53,54,55,56,57,59,60,61, // OMORI ACS, RELEASE ENERGY AND RELEASE STRESS
         86,87,88,89,90,91,92,93,94,97,98,99,100,101, // AUBREY ACS
         126,127,128,129,130,131,132,133,134,137,138,139, // KEL ACS
         168,167,170,171,172,173,174,175,176,178,179,180 // HERO ACS
        ];
       if(ACS_SKILLS.contains(skillId)) {
        this.push("wait"); 
       }
       else if(BattleManager._phase === "endBattle" || BattleManager._phase === "victory") {
         this.push("wait");
       } 
       else {
        this.push('wait');
        this.push('wait');
       }
     }
   };
  // Run Original Function
  _TDS_.OmoriBattleSystem.Window_BattleLog_addText.call(this, text);
};
//=============================================================================
// * Add Instant Text
//=============================================================================
Window_BattleLog.prototype.addInstantText = function(text) {
  // If Scroll Text Sprite Exists Add it
  if (this._scrollTextSprite) {
    // Add Sprite
    var sprite = this._scrollTextSprite.addLine(text);
    sprite.opacity = 255;
  };
};
//=============================================================================
// * Play Sound Effect
//=============================================================================
Window_BattleLog.prototype.playSE = function(se) {
  // Play Sound Effect
  AudioManager.playSe(se);
};
//=============================================================================
// * Wait For Input
//=============================================================================
Window_BattleLog.prototype.waitForInput = function() { this._waitingForInput = true; };
//=============================================================================
// * Wait For Input
//=============================================================================
Window_BattleLog.prototype.waitFrames = function(frames) { this._waitCount = frames; };
//=============================================================================
// * Determine if busy
//=============================================================================
Window_BattleLog.prototype.isBusy = function() {
  // Return Original Function
  return _TDS_.OmoriBattleSystem.Window_BattleLog_isBusy.call(this) || this._waitingForInput;
};
//=============================================================================
// * Frame Update
//=============================================================================
Window_BattleLog.prototype.update = function() {
  // Run Original Function
  _TDS_.OmoriBattleSystem.Window_BattleLog_update.call(this);
  // Update Scroll Text Sprite

  this._scrollTextSprite.update();

};
//=============================================================================
// * Update Wait
//=============================================================================
Window_BattleLog.prototype.updateWait = function() {
  // Return Original Function & Update Input Wait Check
  return _TDS_.OmoriBattleSystem.Window_BattleLog_updateWait.call(this) || this.updateInputWait();
};
//=============================================================================
// * Update Input Wait
//=============================================================================
Window_BattleLog.prototype.updateInputWait = function() {
  // If Waiting for Input and OK is pressed
  if (this._waitingForInput && Input.isTriggered('ok')) {
    // Set Waiting for Input flag to false
    this._waitingForInput = false;
  };
  // console.log(this._waitingForInput )
  // Return Waiting for Input State
  return this._waitingForInput;
};
//=============================================================================
// * Show Chain Skill List
//=============================================================================
Window_BattleLog.prototype.showChainSkillList = function(subject, skill) {
  // Disable Show Chain Skill
  if ($gameSwitches.value(41)) { return; }
  // Run Original Function
  _TDS_.OmoriBattleSystem.Window_BattleLog_showChainSkillList.call(this, subject, skill);
  if (subject === undefined) { return; }
  if (!subject.isActor()) { return; }
  if (!DataManager.isSkill(skill)) { return; }
  // Get Chain Window
  var chainWindow = BattleManager._activeChainSkillWindow;
  // If Chain Window is more than 0
  if (chainWindow._chainSkills.length > 0) {
    // Show Actor Chain Skill Bubbles
    BattleManager._statusWindow.showActorChainSkillBubbles(subject, chainWindow._chainSkills);
    // Set Chain Window Y Position
    chainWindow.y = Graphics.height;
  };
};
//=============================================================================
// * Hide Chain Skill List
//=============================================================================
Window_BattleLog.prototype.hideChainSkillList = function() {
  // Run Original Function
  _TDS_.OmoriBattleSystem.Window_BattleLog_hideChainSkillList.call(this);
  // Show Actor Chain Skill Bubbles
  BattleManager._statusWindow.showActorChainSkillBubbles(null);
};
//=============================================================================
// * Update Chain Skill Input
//=============================================================================
Window_BattleLog.prototype.updateChainkSkillInput = function() {
  // Get Chain Window
  var chainWindow = BattleManager._activeChainSkillWindow;
  // Get Last Input
  var lastInput = chainWindow.chainInput;
  // Run Original Function
  _TDS_.OmoriBattleSystem.Window_BattleLog_updateChainkSkillInput.call(this);
  // Get Chain Window
  var chainWindow = BattleManager._activeChainSkillWindow;
  // If Chain input is not null and last input is null
  if (chainWindow.chainInput !== null && lastInput === null) {
    // Get Subject
    var subject = chainWindow._battler;
    // Select Actor Chain Skill Bubble
    BattleManager._statusWindow.selectActorChainSkillBubble(subject, chainWindow.chainInput);
  }
};
//=============================================================================
// * Show Global Defeat Message
//=============================================================================
Window_BattleLog.prototype.showGlobalDefeatMessage = function() {
  // Show Message
//    $gameMessage.showLanguageMessage('xx_battle_text.message_1002')
};
//=============================================================================
// * Perform Damage
//=============================================================================
Window_BattleLog.prototype.performDamage = function(target) {
  // Initialize Result
  /*let result;
  // If Target is enemy
  if (target.isEnemy()) {
    // Get Result
    result = target.result();
    // If result is not elementally weak or strong
    if (!result.elementWeak && !result.elementStrong && SceneManager.currentWorldIndex() !== 3) {
      // Set result to null
      result = null;
    };
  };
  // If result has not been remove block enemy sound
  if (result) { SoundManager._blockEnemySound = true; };

  console.log(result);
  console.log('ALERT ELEMENT!!!!!!!')

  // Run Original Function
  _TDS_.OmoriBattleSystem.Window_BattleLog_performDamage.call(this, target);
  // If result exists
  if (result) {

    console.log("Is strong: " + result.elementStrong, "Is weak: " + result.elementWeak);
    // If Element strong
    if (result.elementStrong) {
      // Play Elemental Damage sound
      AudioManager.playSe({ name: "se_impact_double", volume: ConfigManager.seVolume, pitch: 100, pan: 0});
    } else if (result.elementWeak) {
      // Play Elemental Damage sound
      AudioManager.playSe({ name: "se_impact_soft", volume: ConfigManager.seVolume, pitch: 100, pan: 0});    
    };
  }
  // Unblock sound
  SoundManager._blockEnemySound = false;*/
  return _TDS_.OmoriBattleSystem.Window_BattleLog_performDamage.call(this, target);
};



//=============================================================================
// ** Sprite_EnemyBattlerStatus
//-----------------------------------------------------------------------------
// This sprite is used to display the status of the enemy in battle.
//=============================================================================
function Sprite_EnemyBattlerStatus() { this.initialize.apply(this, arguments); }
Sprite_EnemyBattlerStatus.prototype = Object.create(Sprite.prototype);
Sprite_EnemyBattlerStatus.prototype.constructor = Sprite_EnemyBattlerStatus;
//=============================================================================
// * Object Initilization
//=============================================================================
Sprite_EnemyBattlerStatus.prototype.initialize = function() {
  // Super Call
  Sprite.prototype.initialize.call(this);
  // Create Bitmap
  this.bitmap = new Bitmap(1, 1);
  // Create Cursor Sprite
  this.createCursorSprite();
};
//=============================================================================
// * Create Cursor Sprite
//=============================================================================
Sprite_EnemyBattlerStatus.prototype.createCursorSprite = function() {
  // Get Bitmap
  var bitmap = ImageManager.loadSystem('ACSArrows');
  // Create Cursor Sprite
  this._cursorSprite = new Sprite(bitmap);
  this._cursorSprite.setFrame(0, 0, bitmap.width / 4, bitmap.height);
  this.addChild(this._cursorSprite);
  // Set Cursor Position
  this.setCursorPosition(0);
};
//=============================================================================
// * Minimun Width
//=============================================================================
Sprite_EnemyBattlerStatus.prototype.minWidth = function() { return 120 };
//=============================================================================
// * Refresh Bitmap
//=============================================================================
Sprite_EnemyBattlerStatus.prototype.refreshBitmap = function(battler) {
  // If Battler Exists
  if (battler) {
    // Set Font Size
    this.bitmap.fontSize = 24;
//    this.bitmap.updateBitmapFont();
    // Get Battler Name
    var name = battler.name();
    // Get NameWidth
    var nameWidth = this.bitmap.measureTextWidth(name, true);
    // Recreate Bitmap
    this.bitmap = new Bitmap(Math.max(this.minWidth(), nameWidth + 20), 57);
    this.bitmap.fontSize = 24;
    this.bitmap.fillAll('rgba(255, 0, 0, 1)')
    // Get Back Bitmap
    var backBitmap = ImageManager.loadSystem('enemy_box');
    // Make Background
    this.bitmap.blt(backBitmap, 0, 0, 7, backBitmap.height, 0, 0);
    this.bitmap.blt(backBitmap, 7, 0, 1, backBitmap.height, 7, 0, this.width - 14);
    this.bitmap.blt(backBitmap, 8, 0, 7, backBitmap.height, this.width - 7, 0);
    // Draw Name
    this.bitmap.drawText(name, 0, 0, this.width, 27, 'center');
    var bar = ImageManager.loadSystem('enemy_box_gradients')
    var icon = ImageManager.loadSystem('hp_icon');
    var sx = (this.width - (bar.width + icon.width)) / 2
    var barHeight = bar.height / 2;
    this.bitmap.blt(icon, 0, 0, icon.width, icon.height, sx, this.height - (icon.height + 7));
    sx += icon.width;
    this.bitmap.blt(bar, 0, barHeight, bar.width, barHeight, sx, this.height - (barHeight + 9))
    this.bitmap.blt(bar, 0, 0, battler.hpRate() * bar.width, barHeight, sx, this.height - (barHeight + 9))
    // If Scanned
    if (battler.isScanned()) {
      // Draw HP
      this.bitmap.drawText(`${battler.hp}/${battler.mhp}`, sx, this.height - 29, bar.width - 3, 20, 'right');
    }
    // Refresh Cursor
    this.setCursorPosition(battler.battleStatusCursorPosition());
  };
};
//=============================================================================
// * Refresh Cursor
//=============================================================================
Sprite_EnemyBattlerStatus.prototype.setCursorPosition = function(position = 0) {
  // X Position
  var x = 0
  // Get Width
  var width = this._cursorSprite.width;
  // Switch Case Position
  switch (position) {
    case 0: // Top
      x = 3 * this._cursorSprite.width;
      this._cursorSprite.x = (this.width - width) / 2
      this._cursorSprite.y = -this._cursorSprite.height + 4;
    break;
    case 1: // Left
      x = 2 * this._cursorSprite.width;
      this._cursorSprite.x = -this._cursorSprite.width + 4;
      this._cursorSprite.y = (this.height - this._cursorSprite.height) / 2;
    break;
    case 2: // Right
      x = 1 * this._cursorSprite.width;
      this._cursorSprite.x = this.width - 5
      this._cursorSprite.y = (this.height - this._cursorSprite.height) / 2;
    break;
    case 3: // Bottom
      x = 0 * this._cursorSprite.width;
      this._cursorSprite.x = (this.width - width) / 2
      this._cursorSprite.y = this.height - 4;
    break;
  }
  // Set Cursor Frame X Position
  this._cursorSprite._frame.x = x;
  this._cursorSprite._refresh();
};



//=============================================================================
// ** Sprite_Enemy
//-----------------------------------------------------------------------------
// The sprite for displaying an enemy.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriBattleSystem.Sprite_Enemy_initMembers    = Sprite_Enemy.prototype.initMembers;
_TDS_.OmoriBattleSystem.Sprite_Enemy_setBattler     = Sprite_Enemy.prototype.setBattler;
_TDS_.OmoriBattleSystem.Sprite_Enemy_update         = Sprite_Enemy.prototype.update;
_TDS_.OmoriBattleSystem.Sprite_Enemy_updateCollapse = Sprite_Enemy.prototype.updateCollapse;
//=============================================================================
// * Initialize Members
//=============================================================================
Sprite_Enemy.prototype.initMembers = function() {
  // Run Original Function
  _TDS_.OmoriBattleSystem.Sprite_Enemy_initMembers.call(this);
  // Create Status Sprite
  this.createStatusSprite();
  // Set Fall on death flag to false
  this._fallOnDeath = false;
  // Locked Pattern
  this._fallLockedPattern = null;
};
//=============================================================================
// * Set Battler
// =============================================================================
Sprite_Enemy.prototype.setBattler = function(battler) {
  // Run Original Function
  _TDS_.OmoriBattleSystem.Sprite_Enemy_setBattler.call(this, battler);
  // If Enemy Exists
  if (this._enemy) {
    // Set Fall On Death flag
    this._fallOnDeath = this._enemy.enemy().meta.FallOnDeath;
  } else {
    // Set Fall on Death to false
    this._fallOnDeath = false;
  }
  // Locked Pattern
  this._fallLockedPattern = null;
};
//=============================================================================
// * Update Collapse
// =============================================================================
Sprite_Enemy.prototype.updateCollapse = function() {
  if (this._fallOnDeath) {
    // If Fall Lock Pattern is not null
    if (this._fallLockedPattern !== null) {
      // Set Pattern
      this._pattern = this._fallLockedPattern;
    };
    // If On last frame of motion
    if (this._pattern >= this.motionFrames() - 2 || this._fallLockedPattern !== null) {
      // Get Target Y
      var targetY = Graphics.height + this._mainSprite.height;
      // Move Position
      this._offsetY += Math.abs(targetY - this._homeY) / 32;
      // If fall locked pattern is null
      if (this._fallLockedPattern === null) {
        // Set Fall Locked Pattern
        this._fallLockedPattern = this._pattern;
      };
    } else {
      // Reset Duration to 0
      this._effectDuration = 32;
    };
  } else {
    // Run Original Function
    _TDS_.OmoriBattleSystem.Sprite_Enemy_updateCollapse.call(this);
  };
};
//=============================================================================
// * Frame Update
//=============================================================================
Sprite_Enemy.prototype.update = function() {
  // Run Original Function
  _TDS_.OmoriBattleSystem.Sprite_Enemy_update.call(this);
  // Update Status Sprite
  this.updateStatusSprite();


  // if (Input.isTriggered('control')) {
  //   // this._fallOnDeath = true;
  //   this._enemy.setHp(0)
  //   // this.startCollapse()
  // }
};
//=============================================================================
// * Create Status Sprite
//=============================================================================
Sprite_Enemy.prototype.createStatusSprite = function() {
  // Set Status Sprite
  this._statusSprite = new Sprite_EnemyBattlerStatus();
  //this.parent.addChild(this._statusSprite);
  // Status Shift Positions
  this._statusSprite.z = 2;
  this._statusShiftPositions =  [[-1, -1], [0, -1], [1, -1], [-1, 0],  [0, 0], [1, 0], [-1, 1],  [0, 1], [1, 1]]
};
//=============================================================================
// * Update Status Sprite
//=============================================================================
Sprite_Enemy.prototype.updateStatusSpritePosition = function() {
  // Set Initial Center Position
  this._statusSprite.x = -(this._statusSprite.width / 2)
  this._statusSprite.y = -((this.height + this._statusSprite.height) / 2);
  // Get Position
  var position = this._enemy.battleStatusPosition();
  // Shift Status Sprite Position
  this.shiftStatusSpritePosition(...this._statusShiftPositions[position])
  // Adjust by offsets
  this._statusSprite.x += this._enemy.battleStatusXOffset();
  this._statusSprite.y += this._enemy.battleStatusYOffset();
  // Get Last Index
  var lastIndex = this.children.length-1;
  // If Index of status sprite is less than last index
  /*if (this.children.indexOf(this._statusSprite) < lastIndex ) {
    this.addChildAt(this._statusSprite, lastIndex);
  };*/
  let globalPosition = this.toGlobal(this._statusSprite);
  this._statusSprite.position.set(globalPosition.x, globalPosition.y);
  if(!!this.parent) {
    if(!this._statusSprite.parent) {
      this.parent.parent.parent.parent.addChild(this._statusSprite)
      if(!!this._enemy.enemy().meta["sprite mirrored"]) {this._statusSprite.scale.x = -1;}
    }
  }
};
//=============================================================================
// * Shift Status Sprite Position
//=============================================================================
Sprite_Enemy.prototype.shiftStatusSpritePosition = function(x, y) {
  // X Coordinate Shift
  switch (x) {
    case -1: // Left
      this._statusSprite.x -= (this.width / 2);
    break;
    case 1: // Right
      this._statusSprite.x += (this.width / 2);
    break;
  };
  // Y Coordinate Shift
  switch (y) {
    case -1: // Top
      this._statusSprite.y -= (this.height / 2);
    break;
    case 1: // Bottom
      this._statusSprite.y += (this.height / 2);
    break;
  };
};
//=============================================================================
// * Update Status Sprite
//=============================================================================
Sprite_Enemy.prototype.updateStatusSprite = function() {
  // If Enemy
  if (this._enemy) {
    // Get Selected State
    var selected = this._enemy.isSelected()
    // If Selected and status sprite is not visible
    if (selected && !this._statusSprite.visible) {
      // Refresh Status Sprite
      this._statusSprite.refreshBitmap(this._enemy);
      // Update Status Sprite Position
      this.updateStatusSpritePosition();
    }
    // Set Visibility
    this._statusSprite.visible = selected;
  };
};
//=============================================================================
// * Damage Offset X
//=============================================================================
Sprite_Enemy.prototype.damageOffsetX = function() { return this._enemy ? this._enemy.battleDamageXOffset(): 0; };
//=============================================================================
// * Damage Offset Y
//=============================================================================
Sprite_Enemy.prototype.damageOffsetY = function() { return this._enemy ? this._enemy.battleDamageYOffset(): -8; };



//=============================================================================
// ** Sprite_Damage
//-----------------------------------------------------------------------------
// The sprite for displaying a popup damage.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriBattleSystem.Sprite_Damage_setup = Sprite_Damage.prototype.setup;
//=============================================================================
// * Setup
//=============================================================================
Sprite_Damage.prototype.setup = function(target) {
  // // Set Duration
  // this._duration = 40;
  // Run Original Function
  _TDS_.OmoriBattleSystem.Sprite_Damage_setup.call(this, target);
};
//=============================================================================
// * Digit Height
//=============================================================================
Sprite_Damage.prototype.digitHeight = function() {
  return this._damageBitmap ? this._damageBitmap.height / 7 : 0;
};
//=============================================================================
// * Create Miss
//=============================================================================
Sprite_Damage.prototype.createMiss = function() {
  var w = this.digitWidth();
  var h = this.digitHeight();
  var sprite = this.createChildSprite();
  sprite.setFrame(0, 4 * h, 48, h);
};
//=============================================================================
// * Create Miss
//=============================================================================
Sprite_Damage.prototype.createImmune = function() {
  var w = this.digitWidth();
  var h = this.digitHeight();
  var sprite = this.createChildSprite();
  sprite.setFrame(0, 5 * h, 82, h);
};
//=============================================================================
// * Create Digits
//=============================================================================
Sprite_Damage.prototype.createDigits = function(baseRow, value) {
  var string = Math.abs(value).toString();
  var row = baseRow + (value < 0 ? 1 : 0);
  var w = this.digitWidth();
  var h = this.digitHeight();
  for (var i = 0; i < string.length; i++) {
    var sprite = this.createChildSprite();
    var n = Number(string[i]);
    sprite.setFrame(n * w, row * h, w, h);
    sprite.x = (i - (string.length - 1) / 2) * (w - 8);
  }
};
//=============================================================================
// * Create Child Sprite
//=============================================================================
Sprite_Damage.prototype.createChildSprite = function() {
  var sprite = new Sprite();
  sprite.bitmap = this._damageBitmap;
  sprite.anchor.set(0.5, 1);
  sprite.y = -50;
  sprite.opacity = 0;
  this.addChild(sprite);
  return sprite;
};
//=============================================================================
// * Frame Update
//=============================================================================
Sprite_Damage.prototype.update = function() {
  // Super Call
  Sprite.prototype.update.call(this);
  // If Duration is more than 0
  if (this._duration > 0) {
    // Previously Done Flag
    var prevDone = true;
    for (var i = 0; i < this.children.length; i++) {
      // Get Sprite
      var sprite = this.children[i];
      // If Previous is done update child
      if (prevDone) { this.updateChild(sprite); };
      // Set Previous done flag
      prevDone = (sprite.y >= -20);
    };
    // If Previous is done decrease duration
    if (prevDone) { this._duration--; };
  }
  this.updateFlash();
  this.updateOpacity();
  if (!BattleManager._showDamage) {
    this.opacity = 0;
  }

};
//=============================================================================
// * Update Child
//=============================================================================
Sprite_Damage.prototype.updateChild = function(sprite) {
  // Move Sprite
  sprite.y = Math.min(sprite.y + 6, 0);
  // Increase Opacity of Sprite
  if (this._duration > 10) { sprite.opacity += 20};
  // Set Sprite Blend Color
  sprite.setBlendColor(this._flashColor);
};





//=============================================================================
// ** Sprite_ACSBubble
//-----------------------------------------------------------------------------
// This sprite is used to display ACS Bubbles
//=============================================================================
function Sprite_ACSBubble() { this.initialize.apply(this, arguments); }
Sprite_ACSBubble.prototype = Object.create(Sprite.prototype);
Sprite_ACSBubble.prototype.constructor = Sprite_ACSBubble;
//=============================================================================
// * Object Initilization
//=============================================================================
Sprite_ACSBubble.prototype.initialize = function(actorIndex) {
  // Super Call
  Sprite.prototype.initialize.call(this);
  // Active Flag
  this._active = true;
  // Set Actor Index
  this._actorIndex = actorIndex;
  // Bubble Index
  this._bubbleIndex = 0;
  // Target Opacity
  this._targetOpacity = 0;
  // Opacity Duration
  this._opacityDuration = 0;
  // Arrow Direction
  this._arrowDirection = 2;
  // Arrow Move Direction (0: up/down, 1: Left/Right)
  this._arrowMoveDirection = 0;
  this._arrowPositions = {2: [0, 0], 4: [0, 0], 6: [0, 0], 8: [0, 0]};
  // Shake Flag
  this._shake = false;
  this.createArrowSprite();
  this.setBubbleIndex(0);
  this.updatePosition(0);
};
//=============================================================================
// * Activate & Deactivate
//=============================================================================
Sprite_ACSBubble.prototype.activate   = function() { this._active = true; this.show() };
Sprite_ACSBubble.prototype.deactivate = function() { this._active = false; this.fadeOpacity(180, 10) };
//=============================================================================
// * Create Arrow Sprite
//=============================================================================
Sprite_ACSBubble.prototype.createArrowSprite = function() {
  this._arrowSprite = new Sprite(ImageManager.loadSystem('ACSArrows'));
  this._arrowSprite.anchor.set(0.5, 0.5);
  this.addChild(this._arrowSprite);
  this.setArrowDirection(this._arrowDirection);
};
//=============================================================================
// * Set Arrow Direction
//=============================================================================
Sprite_ACSBubble.prototype.setArrowDirection = function(direction) {
  // Arrow Direction
  this._arrowDirection = direction;
  // Get Bitmap
  var bitmap = ImageManager.loadSystem('ACSArrows');
  // Get Width
  var width = bitmap.width / 4;
  // Reset anchor
  this._arrowSprite.anchor.set(0.5, 0.5);
  // Direction Switch
  switch (direction) {
    case 'down':
    case 2: // Down
      this._arrowSprite.setFrame(0, 0, width, bitmap.height);
      this._arrowMoveDirection = 0;
      direction = 2;
    break;
    case'left':
    case 4: // Left
      this._arrowSprite.setFrame(2 * width, 0, width, bitmap.height);
      this._arrowMoveDirection = 1;
      direction = 4;
    break;
    case 'right':
    case 6: // Right
      this._arrowSprite.setFrame(1 * width, 0, width, bitmap.height);
      this._arrowMoveDirection = 1;
      direction = 6;
    break;
    case 'up':
    case 8: // Up
      this._arrowSprite.setFrame(3 * width, 0, width, bitmap.height);
      this._arrowMoveDirection = 0;
      direction = 8;
    break;
  };
  // Get Position
  var position = this._arrowPositions[direction];
  // If Position Exists
  if (position) {
    // Set Arrow Sprite Position
    this._arrowSprite.x = position[0];
    this._arrowSprite.y = position[1];
  };
};
//=============================================================================
// * Set Bubble Index
//=============================================================================
Sprite_ACSBubble.prototype.setBubbleIndex = function(index) {
  // Get Bitmap
  var bitmap = ImageManager.loadSystem('ACS_Bubble');
  // Get Width & Height
  var width = bitmap.width / 7, height = bitmap.height / 2;
  // Set Bitmap
  this.bitmap = bitmap;
  var x = (index % 7) * width
  var y = Math.floor(index / 7) * height;
  this.setFrame(x, y, width, height);
  // Set Bubble Index
  this._bubbleIndex = index;
  // Index Arrow Positions
  if ([0, 1, 2, 3].contains(index)) {
    // Set Arrow Positions
    this._arrowPositions = {2: [70, 85], 4: [15, 45], 6: [120, 45], 8: [70, 10]};
  } else if ([4, 5, 6].contains(index)) {
    // Set Arrow Positions
    this._arrowPositions = {2: [65, 95], 4: [5, 55], 6: [125, 55], 8: [65, 10]};
  } else if ([7, 8, 9].contains(index)) {
    // Set Arrow Positions
    this._arrowPositions = {2: [60, 85], 4: [5, 45], 6: [115, 45], 8: [60, 5]};
  } else if ([10, 11, 12].contains(index)) {
    // Set Arrow Positions
    this._arrowPositions = {2: [60, 90], 4: [5, 50], 6: [115, 50], 8: [60, 15]};
  };
  // Set Arrow Position
  this.setArrowDirection(this._arrowDirection);
};
//=============================================================================
// * Update Position
//=============================================================================
Sprite_ACSBubble.prototype.updatePosition = function(position) {
  //     // Set Position
  //     this.x = 0; this.y = 0;
  // return;
  switch (this._actorIndex) {
    case 0: // AUBREY
      switch (position) {
        case 0: this.x = 110; this.y = 45 ;break;
        case 1: this.x = 90; this.y = 110 ;break;
        case 2: this.x = 5; this.y = 140 ;break;
      }
    break;
    case 1: // HERO
      switch (position) {
        case 0: this.x = -115; this.y = 45 ;break;
        case 1: this.x = -105; this.y = 110 ;break;
        case 2: this.x = -15; this.y = 140 ;break;
      }
    break;
    case 2: // OMORI
      switch (position) {
        case 0: this.x = 5; this.y = -80 ;break;
        case 1: this.x = 95; this.y = -55 ;break;
        case 2: this.x = 110; this.y = 10 ;break;
      }
    break;
    case 3: // KEL
      switch (position) {
        case 0: this.x = -5; this.y = -70 ;break;
        case 1: this.x = -95; this.y = -55 ;break;
        case 2: this.x = -105; this.y = 10 ;break;
      }
    break;
    default:
      // Set Position
      this.x = 0; this.y = 0;
    break;
  };
};
//=============================================================================
// * Fade Opacity
//=============================================================================
Sprite_ACSBubble.prototype.fadeOpacity = function(opacity, duration) {
  // Target Opacity
  this._targetOpacity = opacity;
  // Opacity Duration
  this._opacityDuration = duration;
};
//=============================================================================
// * Show
//=============================================================================
Sprite_ACSBubble.prototype.show = function(duration = 15) {
  this.fadeOpacity(255, duration);
};
//=============================================================================
// * Hide
//=============================================================================
Sprite_ACSBubble.prototype.hide = function(duration = 15) {
  this.fadeOpacity(0, duration)
};
//=============================================================================
// * Start Shake
//=============================================================================
Sprite_ACSBubble.prototype.startShake = function() {
  // Set Shake Flag to true
  this._shake = true;
};
//=============================================================================
// * Stop Shake
//=============================================================================
Sprite_ACSBubble.prototype.stopShake = function() {
  // Set Shake Flag to true
  this._shake = false;
  // Reset Anchor
  this.anchor.set(0, 0);
  // Reset Blend Color
  this.setBlendColor([0, 0, 0, 0]);
};
//=============================================================================
// * Frame Update
//=============================================================================
Sprite_ACSBubble.prototype.update = function() {
  // Super Call
  Sprite.prototype.update.call(this);
  // Update Arrow Direction
  this.updateArrowDirection();
  // Update Opcity
  this.updateOpacity();
  // Update Shake
  this.updateShake();
};
//=============================================================================
// * Update Arrow Direction
//=============================================================================
Sprite_ACSBubble.prototype.updateArrowDirection = function() {
  // If Active
  if (this._active) {
    // If Arrow Direction is 0
    if (this._arrowMoveDirection === 0) {
      this._arrowSprite.anchor.y = 0.5 + (Math.sin(Graphics.frameCount * 0.13) * 0.15);
    } else {
      this._arrowSprite.anchor.x = 0.5 + (Math.sin(Graphics.frameCount * 0.13) * 0.15);
    };
  };
};
//=============================================================================
// * Update Opacity
//=============================================================================
Sprite_ACSBubble.prototype.updateOpacity = function() {
  // If Opacity duration is more than 0
  if (this._opacityDuration > 0) {
    var d = this._opacityDuration;
    this.opacity = (this.opacity * (d - 1) + this._targetOpacity) / d;
    this._opacityDuration--;
  };
  // If Active
  if (this._active) {
    this._arrowSprite.setColorTone([0, 0, 0, 0]);
  } else {
    this._arrowSprite.setColorTone([-80, -80, -80, 255]);
    return;
  };
};
//=============================================================================
// * Update Shake
//=============================================================================
Sprite_ACSBubble.prototype.updateShake = function() {
  // If Shake is true
  if (this._shake) {
    // Get Shake Power
    var power = 0.01
    if (Math.random() >= 0.5) {
      this.anchor.x = power;
    } else {
      this.anchor.x = -power;
    };
    if (Math.random() >= 0.5) {
      this.anchor.y = power;
    } else {
      this.anchor.y = -power;
    };
    var alpha =  64 + (Math.sin(Graphics.frameCount * 0.3) * 64);
    this.setBlendColor([255, 0, 0, alpha]);
  };
};



//=============================================================================
// ** Sprite_BattleLowHpOverlay
//-----------------------------------------------------------------------------
// This sprite is used to display the status of the enemy in battle.
//=============================================================================
function Sprite_BattleLowHpOverlay() { this.initialize.apply(this, arguments); }
Sprite_BattleLowHpOverlay.prototype = Object.create(Sprite.prototype);
Sprite_BattleLowHpOverlay.prototype.constructor = Sprite_BattleLowHpOverlay;
//=============================================================================
// * Object Initilization
//=============================================================================
Sprite_BattleLowHpOverlay.prototype.initialize = function() {
  // Super Call
  Sprite.prototype.initialize.call(this);
  // Set Bitmap
  this.bitmap = ImageManager.loadPicture('battle_lowhealth');
  // Get Actor
  this._actor = $gameParty.getOmori();
  // Set Opacity
  this.opacity = 102;
  // Opacity Chage Values
  this._opacityChange = 0;
  this._opacitySpeed = 5;
  this._opacitySide = 0;
  this._activeOpacity = -60;
  this._oldHp = null;
  // this._activeOpacity = 255;
  // Hidden Flag
  this._hidden = false;
  // Set Beep Counter
  this._beepCounter = 0;
  // Set Danger Rate
  this._dangerRate = 0;
  // Set HP Rate
  this._hpRate = 1;
  // Set Original BGM
  this._originalBGM = AudioManager.makeEmptyAudioObject();
  // AudioManager.saveBgm
  // this.setBlendColor([255, 0, 255, 255])
};
//=============================================================================
// * Frame Update
//=============================================================================
Sprite_BattleLowHpOverlay.prototype.update = function() {
  // Super Call
  Sprite.prototype.update.call(this);
  if (BattleManager._showLowHpOverlay == false) {
      this._hidden = true;
      this.opacity = 0;
      return;
  };


  if (BattleManager._hideLowHpOverlay) {
    if (this.opacity > 0) {
      this.opacity -= 10;
    }
    return;
  }

  // Set  Visibility
  this.visible = !$gameSwitches.value(93);
  // If Actor Exists
  if (this._actor) {
    // If Actor HP does not match old HP
    if (this._actor.hp !== this._oldHp) {
      // If BGM has changed
      if (!AudioManager.isCurrentBgm(this._originalBGM)) {
        // Save BGM
        this._originalBGM = AudioManager.saveBgm();
      };
      // Get low HP Rate (20%)
      var lowHpRate = 0.2;
      // Get HP Rate
      this._hpRate = this._actor.hpRate();
      var dangerMax = this._actor.mhp * lowHpRate;
      this._dangerRate = this._actor.hp / dangerMax;
      // Update Old HP
      this._oldHp = this._actor.hp;
      // Set Hidden State
      this._hidden = (this._hpRate > lowHpRate);
      // Reset Opacity Speed
      this._opacitySpeed = 0;
      // Get Original Volume
      var originalVolume = this._originalBGM.volume;
      // Set Volume
      var volume = originalVolume;
      // If Not hidden
      if (!this._hidden) {
        // Set Opacity Speed
        this._opacitySpeed = 4 + (5 - (5 * this._dangerRate));
        // If Actor HP is 0
        if (this._actor.hp === 0) {
          // Set Volume to 0
          volume = 0;
          // Play Low HP Background Sound
            AudioManager.playDangerBgs({name: '[sfx]battle_flatline', volume: 0, pitch: 100 })

        } else {
          // Play Low HP Background Sound
            AudioManager.playDangerBgs({name: 'boss_something_heartbeat', volume: 40, pitch: 100 + (50 - (50 * this._dangerRate)) })
            // Set Volume
        //  volume =  originalVolume * (this._hpRate <= 0.05 ? 0.05 : this._dangerRate);
            volume =  50;
        }
      } else {
        // Fadeout Background sound
        AudioManager.fadeOutDangerBgs(1);
      };
      // Get Current BGM
      var bgm = AudioManager._currentBgm;
      // If BGM
      if (bgm) {
        // Set BGM Volume
        //bgm.volume = volume;
        // Update BGM Parameters
        //AudioManager.updateBgmParameters(bgm);
      };
    };
  };
  // Update Opacity Changes
  if (this._hidden && this._activeOpacity > -60) {
    this._activeOpacity = Math.max(this._activeOpacity - 5, -60);
  } else if (!this._hidden && this._activeOpacity < 80) {
    this._activeOpacity = Math.min(this._activeOpacity + 5, 80);
  };

  // If Opacity side is 0
  if (this._opacitySide === 0) {
    var max = 60;
    this._opacityChange = Math.min(this._opacityChange + this._opacitySpeed, max);
    if (this._opacityChange === max) { this._opacitySide = 1; };
    // console.log(this._opacityChange)
  } else {
    var min = -60;
    this._opacityChange = Math.max(this._opacityChange - this._opacitySpeed, min);
    if (this._opacityChange === min) { this._opacitySide = 0; };
  }
  // Set Opacity
  this.opacity = this._activeOpacity + this._opacityChange;

  if (!this._hidden && this._actor.hp > 0 && this._hpRate <= 0.1) {
    // Decrease Beep Counter
    this._beepCounter--;
    // If Beep Counter is 0 or less
    if (this._beepCounter <= 0) {
      // Play Low HP Background Sound
      // AudioManager.playSe({name: '[sfx]battle_ekg_beep', volume: 100, pitch: 100 + (30 - (30 * this._dangerRate)) })
      AudioManager.playSe({name: '[sfx]battle_ekg_beep', volume: 50, pitch: 100 })
      this._beepCounter = 100 - (20 - (20 * this._dangerRate));
    };
  };

  // if (Input.isTriggered('shift')) {

  //   this._actor.setHp(6)
  //   // this._hidden = !this._hidden;
  // };

  // if (Input.isRepeated('left')) {
  //   this._actor.setHp(this._actor.hp - 1);

  // }
  // if (Input.isRepeated('right')) {
  //   this._actor.setHp(this._actor.hp + 1);
  // }


};



//=============================================================================
// ** Sprite_BattleIntroContainer
//-----------------------------------------------------------------------------
// This sprite is used to display battle introductions.
//=============================================================================
function Sprite_BattleIntroContainer() { this.initialize.apply(this, arguments); }
Sprite_BattleIntroContainer.prototype = Object.create(Sprite.prototype);
Sprite_BattleIntroContainer.prototype.constructor = Sprite_BattleIntroContainer;
//=============================================================================
// * Object Initilization
//=============================================================================
Sprite_BattleIntroContainer.prototype.initialize = function(type) {
  // Super Call
  Sprite.prototype.initialize.call(this);
  // Set Type
  this._type = type;
  // If type exists
  if (type) {
    // Type Switch Case
    switch (type.toLowerCase()) {
      case 'finalbattle': this.setupFinalBattleAnimation(); break;
    };
  };
};
//=============================================================================
// * Setup Animation: Final Battle
//=============================================================================
Sprite_BattleIntroContainer.prototype.setupFinalBattleAnimation = function() {
  let bitmap = ImageManager.loadPicture('omori_prebattle');
  // Create Animation Sprite
  SceneManager._scene.hideAllMenuElements(1);
  this._animationSprite = new Sprite();
  this.addChild(this._animationSprite);
  // Get Battler Sprite
  this._battlerSprite = SceneManager._scene._spriteset._enemySprites[0];
  this._battlerSprite._battler.hide();
  this._battlerSprite.visible = false;
  this._smallDelay = 15;
  bitmap.addLoadListener(() => {
    this._animationSprite.bitmap = bitmap;
    // Get Width & Height
    const width = bitmap.width / 6;
    const height = bitmap.height / 4;
  
    this._animationSprite.setFrame(0, 0, width, height);
    this._animationSprite.x = 67;
    this._animationSprite.y = Graphics.height - height;
  
    // Initialize Animation Data
    this._animationData = {index: 0, frames: 21, count: 10, delay: 10, };
  })
};
//=============================================================================
// * Frame Update
//=============================================================================
Sprite_BattleIntroContainer.prototype.update = function() {
  // Super Call
  Sprite.prototype.update.call(this);
  // If type exists
  if (this._type) {
    // Type Switch Case
    switch (this._type.toLowerCase()) {
      case 'finalbattle': this.updateFinalBattleAnimation();break;
    };
  };
};
//=============================================================================
// * Update Final Battle Animation
//=============================================================================
Sprite_BattleIntroContainer.prototype.updateFinalBattleAnimation = function() {
  // Get Animation Data
  if(!this._animationSprite || !this._animationSprite.bitmap) {return;}
  let scene = SceneManager._scene;
  if(!scene._gpWhite) {return;}
  if(this._smallDelay > 0) {return this._smallDelay--;}
  if(!!scene._gpWhite.parent) {
    if(scene._gpWhite.alpha > 0) {return scene._gpWhite.alpha -= 0.05;}
    else {
      $gameScreen.startTint([0,0,0,0], 1); // Makes tint Equal to 0;
      scene.removeChild(scene._gpWhite);
    }
  }
  let anim = this._animationData;
  // Decrease Animation Count
  anim.count--;
  // If animation count is 0 or less
  if (anim.count <= 0) {
    // Set Animation Count
    anim.count = anim.delay;
    // If Animation Index is less than animation frames
    if (anim.index < anim.frames) {
      // Increase Animation Index
      anim.index++;
    } else {
      this.visible = false;
      this.parent.removeChild(this);
      if(!this._battlerSprite._appeared) {
        this._battlerSprite._battler.appear();
        this._battlerSprite._effectDuration = 0;
        this._battlerSprite._appeared = true;
        this._battlerSprite.opacity = 255;
      }
      // Clear Battle Intro
      BattleManager.setBattleIntro(null);
      // show All menu elements
      SceneManager._scene.showAllMenuElements(30);
    };
    // Get Width & Height
    let width = this._animationSprite.width;
    let height = this._animationSprite.height;
    // Set Animation Sprite Frame
    this._animationSprite.setFrame((anim.index % 6) * width, Math.floor(anim.index / 6) * height, width, height);
  };
};

