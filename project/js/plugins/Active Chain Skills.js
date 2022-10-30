//=============================================================================
// TDS Active Chain Skills
// Version: 1.0
//=============================================================================
// Add to Imported List
var Imported = Imported || {} ; Imported.TDS_ActiveChainSkills = true;
// Initialize Alias Object
var _TDS_ = _TDS_ || {} ; _TDS_.ActiveChainSkills = _TDS_.ActiveChainSkills || {};
//=============================================================================
 /*:
 * @author TDS
 * @plugindesc
 * This script allows you to chain skills in a combo.
 *
 * @param Minimun Time
 * @desc How many frames minimum for chain allowance.
 * @default 120

 * @param Title Text
 * @desc Text displayed above the active chain skills as a title.
 * @default Active Chain Skills

 * @param Title Font Size
 * @desc Font size of the title text of active chain skills.
 * @default 20

 * @param Active Skill Sound
 * @desc Sound effect played whenever an active chain skill has been selected.
 * @default {"name": "Skill2", "pan": 0, "pitch": 100, "volume": 80}
 *
 ******************************************************************************
 * @param * Chain Input Text *
 ******************************************************************************
 * @param (↑) Up Skill ON
 * @desc
 * @default \C[17]↑\C[0]Chain:
 *
 * @param (↑) Up Skill OFF
 * @desc
 * @default \C[7]↑Chain:
 *
 * @param (↑) Up Skill ACT
 * @desc
 * @default \C[17]↑Chain:
 *
 ******************************************************************************
 *
 * @param (↓) Down Skill ON
 * @desc
 * @default \C[17]↓\C[0]Chain:
 *
 * @param (↓) Down Skill OFF
 * @desc
 * @default \C[7]↓Chain:
 *
 * @param (↓) Down Skill ACT
 * @desc
 * @default \C[17]↓Chain:
 *
 ******************************************************************************
 *
 * @param (←) Left Skill ON
 * @desc
 * @default \C[17]←\C[0]Attack:
 *
 * @param (←) Left Skill OFF
 * @desc
 * @default \C[7]←Attack:
 *
 * @param (←) Left Skill ACT
 * @desc
 * @default \C[17]←Attack:
 *
 ******************************************************************************
 *
 * @param (→) Right Skill ON
 * @desc
 * @default \C[17]→\C[0]Strike:
 *
 * @param (→) Right Skill OFF
 * @desc
 * @default \C[7]→Strike:
 *
 * @param (→) Right Skill ACT
 * @desc
 * @default \C[17]→Strike:
 *
 ******************************************************************************
 * @help
 *-----------------------------------------------------------------------------
 * * Skill Notetags - These notetags go in the skill notebox in the database.
 *-----------------------------------------------------------------------------
 * <ChainSkill: SkillId, Input>
 *  ^ This note tag allows you to set which skills can be chained to the one
 *    that has this note tag. Order in the notes reflects order of choice.
 *  ^ SkillId: Id of the skill that can be chained into.
 *  ^ Input: Name of the Input. (up, down, left, right, ok, cancel, control, tab, etc..)
 *
 * Examples:
 * <ChainSkill: 15, up>
 * <ChainSkill: 16, down>
 * <ChainSkill: 17, left>
 * <ChainSkill: 18, right>
 *
 * <ChainOnly>  (Case Sensitive.)
 *  ^ This makes the skill only usable only in chains. (Does not affect enemies.)
 */
//=============================================================================
// Get Plugin Parameters
var parameters = PluginManager.parameters('Active Chain Skills');
// Initialize Parameters
_TDS_.ActiveChainSkills.params = {};
// Get Chain Title
_TDS_.ActiveChainSkills.params.chainTitle = String(parameters['Title Text'] || 'Active Chain Skills');
// Get Chain Title Font Size
_TDS_.ActiveChainSkills.params.titleFontSize = Number(parameters['Title Font Size'] ||20);
// Get Minimun Input time (In Frames)
_TDS_.ActiveChainSkills.params.minimunInputTime = Number(parameters['Minimun Time'] || 120);
// Get Active Skill Sound
_TDS_.ActiveChainSkills.params.activeSkillSound =  JsonEx.parse(parameters['Active Skill Sound'] || '{"name": "Skill2", "pan": 0, "pitch": 100, "volume": 80}' );

// Initialize Input Data
_TDS_.ActiveChainSkills.params.inputData = {up: {}, down: {}, left: {}, right: {}};
// Up Data
_TDS_.ActiveChainSkills.params.inputData.up.on  = String(parameters['(↑) Up Skill ON']  || '\\C[17]↑\\C[0]Chain:  ');
_TDS_.ActiveChainSkills.params.inputData.up.off = String(parameters['(↑) Up Skill OFF'] || '\\C[7]↑Chain:  ');
_TDS_.ActiveChainSkills.params.inputData.up.act = String(parameters['(↑) Up Skill ACT'] || '\\C[17]↑Chain:  ');
// Down Data
_TDS_.ActiveChainSkills.params.inputData.down.on  = String(parameters['(↓) Down Skill ON']  || '\\C[17]↓\\C[0]Chain:  ');
_TDS_.ActiveChainSkills.params.inputData.down.off = String(parameters['(↓) Down Skill OFF'] || '\\C[7]↓Chain:  ');
_TDS_.ActiveChainSkills.params.inputData.down.act = String(parameters['(↓) Down Skill ACT'] || '\\C[17]↓Chain:  ');
// Left Data
_TDS_.ActiveChainSkills.params.inputData.left.on  = String(parameters['(←) Left Skill ON']  || '\\C[17]←\\C[0]Chain:  ');
_TDS_.ActiveChainSkills.params.inputData.left.off = String(parameters['(←) Left Skill OFF'] || '\\C[7]←Chain:  ');
_TDS_.ActiveChainSkills.params.inputData.left.act = String(parameters['(←) Left Skill ACT'] || '\\C[17]←Chain:  ');
// Right Data
_TDS_.ActiveChainSkills.params.inputData.right.on  = String(parameters['(→) Right Skill ON']  || '\\C[17]→\\C[0]Chain:  ');
_TDS_.ActiveChainSkills.params.inputData.right.off = String(parameters['(→) Right Skill OFF'] || '\\C[7]→Chain:  ');
_TDS_.ActiveChainSkills.params.inputData.right.act = String(parameters['(→) Right Skill ACT'] || '\\C[17]→Chain:  ');

//=============================================================================
// ** DataManager
//-----------------------------------------------------------------------------
// The static class that manages the database and game objects.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.ActiveChainSkills.DataManager_onLoad = DataManager.onLoad;
//=============================================================================
// * On Load Processing
//=============================================================================
DataManager.onLoad = function(object) {
  // Run Original Function
  _TDS_.ActiveChainSkills.DataManager_onLoad.call(this, object);
  // Set Array & Type
  var array = object, type = null;
  // Object Switch
  switch (object) {
    case $dataSkills: type = 'SKILL' ;break;
  }
  // If Type is not null
  if (type !== null) {
    // If Array is an array
    if (Array.isArray(array)) {
      // Go Through Array
      for (var i = 0; i < array.length; i++) {
        // Get Data
        var data = array[i];
        // Extract MetaData
        if (data) { this.extractActiveChainSkillMetaData(data, type); }
      }
    }
  }
};
//=============================================================================
// * Extract Active Chain Skill Meta Data
//=============================================================================
DataManager.extractActiveChainSkillMetaData = function(data, type) {
  // If Data has no notes return
  if (data.note.length <= 0)  { return; }
  // If Type is skill
  if (type === 'SKILL') {
    // Initialize Chain Skill List
    data.meta.chainSkillList = {};
    // Get Regular Expression
    var regExp = /<ChainSkill:(.+),(.+)>/ig;
    var str = data.note, arr;
    while ((arr = regExp.exec(str)) !== null) {
      // Set Parameter Swap Values
      data.meta.chainSkillList[arr[2].trim()] = Number(arr[1]);
    }
  }
};


//=============================================================================
// ** DataManager
//-----------------------------------------------------------------------------
// The static class that manages the database and game objects.
//=============================================================================
// * Set Active Chain Skill Window
//=============================================================================
BattleManager.setActiveChainSkillWindow = function(chainWindow) { this._activeChainSkillWindow = chainWindow; };


//=============================================================================
// ** Game_BattlerBase
//-----------------------------------------------------------------------------
// The superclass of Game_Battler. It mainly contains parameters calculation.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.ActiveChainSkills.Game_BattlerBase_meetsSkillConditions = Game_BattlerBase.prototype.meetsSkillConditions;
//=============================================================================
// * Determine if Skill Meets Use Conditions
//=============================================================================
Game_BattlerBase.prototype.meetsSkillConditions = function(skill) {
  // Return false if Chain skill is restricted
  if (this.isChainSkillRestrict(skill)) { return false; }
  // Return Original Function
  return _TDS_.ActiveChainSkills.Game_BattlerBase_meetsSkillConditions.call(this, skill);
};
//=============================================================================
// * Determine if Chain Skill is restricted
//=============================================================================
Game_BattlerBase.prototype.isChainSkillRestrict = function(skill) {
  if (!this.isActor()) { return false;}
  if (!$gameParty.inBattle()) { return false; }
  if (!skill.meta.ChainOnly) { return false; }
  return !this._activeChainEnabled;
};


//=============================================================================
// ** Game_Battler
//-----------------------------------------------------------------------------
// The superclass of Game_Actor and Game_Enemy. It contains methods for sprites
// and actions.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.ActiveChainSkills.Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
_TDS_.ActiveChainSkills.Game_Battler_onBattleEnd   = Game_Battler.prototype.onBattleEnd;
//=============================================================================
// * On Battle Start Processing
//=============================================================================
Game_Battler.prototype.onBattleStart = function() {
  // Run Original Function
  _TDS_.ActiveChainSkills.Game_Battler_onBattleStart.call(this);
  // Set Active Chain Enabled Flag to false
  this._activeChainEnabled = false;
};
//=============================================================================
// * On Battle End Processing
//=============================================================================
Game_Battler.prototype.onBattleEnd = function() {
  // Run Original Function
  _TDS_.ActiveChainSkills.Game_Battler_onBattleEnd.call(this);
  // Set Active Chain Enabled Flag to false
  this._activeChainEnabled = false;
};
//=============================================================================
// * Enable or Disable Active Chain
//=============================================================================
Game_Battler.prototype.enableActiveChain = function() { if (this.isActor()) { this._activeChainEnabled = true; } };
Game_Battler.prototype.disableActiveChain = function() { if (this.isActor()) { this._activeChainEnabled = false; } };
//=============================================================================
// * Add Active Skill Chain
//=============================================================================
Game_Battler.prototype.addActiveSkillChain = function(skillId) {
  // Create Action
  var action = new Game_Action(this);
  // Set Action Active Chain Skill
  action.setActiveChainSkill(skillId);
  // Add Action to Actions list
  this._actions.splice(1, 0, action);
};


//=============================================================================
// ** Game_Action
//-----------------------------------------------------------------------------
// The game object class for a battle action.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.ActiveChainSkills.Game_Action_isValid = Game_Action.prototype.isValid;
//=============================================================================
// * Set Active Chain Skill
//=============================================================================
Game_Action.prototype.setActiveChainSkill = function(skillId) {
  // Set Skill
  this.setSkill(skillId);
  // Set Target
  // this.subject().currentAction._targetIndex
  this.setTarget(this.subject()._lastTargetIndex);
  // Set Active Chain Skill
  this._activeChainSkill = true;
};
//=============================================================================
// * Determine if action is valid
//=============================================================================
Game_Action.prototype.isValid = function() {
  // Enable Active Chain
  if (this._activeChainSkill) { this.subject().enableActiveChain(); }
  // Get Original Result
  var result = _TDS_.ActiveChainSkills.Game_Action_isValid.call(this);
  // Disable Active Chain
  if (this._activeChainSkill) { this.subject().disableActiveChain(); }
  // Return Result
  return result;
};


//=============================================================================
// ** Scene_Battle
//-----------------------------------------------------------------------------
// The scene class of the battle screen.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.ActiveChainSkills.Scene_Battle_CreateAllWindows = Scene_Battle.prototype.createAllWindows;
//=============================================================================
// * Create All Windows
//=============================================================================
Scene_Battle.prototype.createAllWindows = function() {
  // Run Original Function
  _TDS_.ActiveChainSkills.Scene_Battle_CreateAllWindows.call(this);
  // Create Chain Skill Window
  this.createChainSkillWindow();
};
//=============================================================================
// * Create Chain Skill Window
//=============================================================================
Scene_Battle.prototype.createChainSkillWindow = function() {
  // Create Active Chain Skill Window
  this._activeChainSkillWindow = new Window_ChainSkillList();
  // Add Child
  this.addChild(this._activeChainSkillWindow);
  // Set Battle Manager Active Chain Skill Window
  BattleManager.setActiveChainSkillWindow(this._activeChainSkillWindow);
};


//=============================================================================
// ** Window_BattleLog
//-----------------------------------------------------------------------------
// The window for displaying battle progress. No frame is displayed, but it is
// handled as a window for convenience.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.ActiveChainSkills.Window_BattleLog_initialize           = Window_BattleLog.prototype.initialize;
_TDS_.ActiveChainSkills.Window_BattleLog_startAction          = Window_BattleLog.prototype.startAction;
_TDS_.ActiveChainSkills.Window_BattleLog_update               =  Window_BattleLog.prototype.update;
_TDS_.ActiveChainSkills.Window_BattleLog_updateWaitMode       = Window_BattleLog.prototype.updateWaitMode;
_TDS_.ActiveChainSkills.Window_BattleLog_displayAction        = Window_BattleLog.prototype.displayAction;
_TDS_.ActiveChainSkills.Window_BattleLog_displayActionResults = Window_BattleLog.prototype.displayActionResults;
//=============================================================================
// * Initialize Object
//=============================================================================
Window_BattleLog.prototype.initialize = function() {
  // Run Original Function
  _TDS_.ActiveChainSkills.Window_BattleLog_initialize.call(this);
  // Set Active Chain Skill Input Couner to 0
  this._activeChainSkillInputCounter = 0;
  // Set Active Chain Skill to 0
  this._activeChainSkill = 0;
};
//=============================================================================
// * Process Custom Code
//=============================================================================
Window_BattleLog.prototype.processCustomCode = function(code) { code(); };
//=============================================================================
// * Start Action
//=============================================================================
//Window_BattleLog.prototype.startAction = function(subject, action, targets) {
  // Enable Active Chain
//  this.push('processCustomCode',  function() { subject.enableActiveChain();});
  // Get Item
//  var item = action.item();
  // Show Chain List
//  this.push('showChainSkillList', subject, item);
  // Process Custom Code
//  this.push('processCustomCode', _TDS_.ActiveChainSkills.Window_BattleLog_startAction.bind(this, subject, action, targets));
  // Start Skill Chain Wait
//  this.push('startChainSkillInputWait');
//};
//=============================================================================
// * Start Action
//=============================================================================
Window_BattleLog.prototype.startAction = function(subject, action, targets) {
  // Enable Active Chain
  this.push('processCustomCode',  function() { subject.enableActiveChain();});
  // Get Item
  var item = action.item();
  // Show Chain List
  this.push('showChainSkillList', subject, item);
  // Process Custom Code
  this.push('processCustomCode', _TDS_.ActiveChainSkills.Window_BattleLog_startAction.bind(this, subject, action, targets));
  // Clear Text
  this.push('clear');
  // Start Skill Chain Wait
  this.push('startChainSkillInputWait');
};
//=============================================================================
// * Display Action Results
//=============================================================================
Window_BattleLog.prototype.displayActionResults = function(subject, target) {
  // Run Original Function
  _TDS_.ActiveChainSkills.Window_BattleLog_displayActionResults.call(this, subject, target);
  // If Subject is an actor
  if (subject.isActor()) {
    // Get Chain Window
    var chainWindow = BattleManager._activeChainSkillWindow;
    // If Chain Window is visible
    if (chainWindow.visible) {
      // Set Wait mode to chain skill input
      this.push('setWaitMode', 'chainSkillInput');
      // Hide Chain List
      this.push('hideChainSkillList');
    }
    // Enable Active Chain
    this.push('processCustomCode',  function() { subject.disableActiveChain();});
  }
};
//=============================================================================
// * Show Chain Skill List
//=============================================================================
Window_BattleLog.prototype.showChainSkillList = function(subject, skill) {
  if (subject === undefined) { return; }
  if (!subject.isActor()) { return; }
  if (!DataManager.isSkill(skill)) { return; }
  // Set Active Chain Skill to 0
  // Get Chain Window
  var chainWindow = BattleManager._activeChainSkillWindow;
  this._activeChainSkill = 0;
  // Setup Chain Window
  chainWindow.setup(subject, skill);
  // If Chain Window is more than 0
  if (chainWindow._chainSkills.length > 0) { chainWindow.show(); }
};
//=============================================================================
// * Show Chain Skill List
//=============================================================================
Window_BattleLog.prototype.hideChainSkillList = function() {
  // Set Active Chain Skill to 0
  this._activeChainSkill = 0;
  // Hide Active Chain Skill Window
  BattleManager._activeChainSkillWindow.hide();
};
//=============================================================================
// * Start Chain Skill Input Wait
//=============================================================================
Window_BattleLog.prototype.startChainSkillInputWait = function() {
  // Set Active chain Skill Input Counter
  this._activeChainSkillInputCounter = _TDS_.ActiveChainSkills.params.minimunInputTime ;
};
//=============================================================================
// * Frame Update
//=============================================================================
Window_BattleLog.prototype.update = function() {
  // Get Chain Window
  var chainWindow = BattleManager._activeChainSkillWindow;
  // If Chain Window Exists and its visible
  if (chainWindow && chainWindow.visible) { this.updateChainkSkillInput(); }
  // Call Original Function
  _TDS_.ActiveChainSkills.Window_BattleLog_update.call(this);
};
//=============================================================================
// * Update Chain Skill Input
//=============================================================================
Window_BattleLog.prototype.updateChainkSkillInput = function() {
  // Get Chain Window
  var chainWindow = BattleManager._activeChainSkillWindow;
  // Get Chain Window Skill
  var chainSkills = chainWindow._chainSkills;
  // If Active Chain Skill is 0
  if (this._activeChainSkill === 0) {
    // Go Through Chain Skills
    for (var i = 0; i < chainSkills.length; i++) {
      // Get Input
      var input = chainSkills[i][0];
      // Get Skill
      var skill = chainSkills[i][1];
      // If Input is triggered
      if (Input.isTriggered(input)) {
        // Get Subject
        var subject = chainWindow._battler;
        if (!subject.canUse(skill)) { continue; }
        if (!subject.isLearnedSkill(skill.id)) { continue; }
        // Play Sound Effect
        AudioManager.playSe(_TDS_.ActiveChainSkills.params.activeSkillSound);
        // Set Chain Window Input
        chainWindow.chainInput = input;
        // Set Active Chain Skill Input Count to 12
        this._activeChainSkillInputCounter = 12;
        // Set Active Chain Skill Id
        this._activeChainSkill = skill.id;
        // Add Active Skill Chain to subject
        subject.addActiveSkillChain(skill.id);
        // Refresh Chain Window
        // Break Loop
        break;
      }
    }
  }
  // If Active Chain Skill Input counter is more than 0
  if (this._activeChainSkillInputCounter > 0) {
    // Decrease Active Chain Skill Input counter
    this._activeChainSkillInputCounter--;
    // Return True
    return true;
  }
};
//=============================================================================
// * Update Wait Mode
//=============================================================================
Window_BattleLog.prototype.updateWaitMode = function() {
  // If Wait mode is for chain skill input
  if (this._waitMode === 'chainSkillInput') {
    // If Active Chain Skill Input counter is more than 0
    if (this._activeChainSkillInputCounter > 0) { return true; }
  }
  // Return Original Function
  return _TDS_.ActiveChainSkills.Window_BattleLog_updateWaitMode.call(this);
};


//=============================================================================
// ** Window_ChainSkillList
//-----------------------------------------------------------------------------
// The window for displaying battle progress. No frame is displayed, but it is
// handled as a window for convenience.
//=============================================================================
function Window_ChainSkillList() { this.initialize.apply(this, arguments);}
Window_ChainSkillList.prototype = Object.create(Window_Base.prototype);
Window_ChainSkillList.prototype.constructor = Window_ChainSkillList;
//=============================================================================
// * Initialize Object
//=============================================================================
Window_ChainSkillList.prototype.initialize = function() {
  // Get Width
  var dw = Math.max(Math.round(Graphics.boxWidth / 2), 450);
  // Super Call
  Window_Base.prototype.initialize.call(this, -this.standardPadding(), 0, dw, this.fittingHeight(6));
  // Set Opacity to 0;
  this.opacity = 0;
  // Hide
  this.hide();
};
//=============================================================================
// * Setup
//=============================================================================
Window_ChainSkillList.prototype.setup = function(battler, skill) {
  // Set Battler
  this._battler = battler;
  // Set Skill
  this._skill = skill;
  // Initialize Chain Skills Array
  this._chainSkills = [];
  // If Skill has a chain skill list
  if (skill.meta.chainSkillList) {
    // Get Inputs
    var inputs = Object.keys(skill.meta.chainSkillList);
    // Go Through Inputs
    for (var i = 0; i < inputs.length; i++) {
      // Get Input
      var input = inputs[i];
      // Get Chain Skill
      var chainSkill = skill.meta.chainSkillList[input];
      // If Battler does not have skill
      if (!battler.isLearnedSkill(chainSkill)) { continue; }
      // Add Skill to Chain Skills array
      this._chainSkills.push([input, $dataSkills[chainSkill]]);
    }
  }
  // Set Y Coordinates
  this.y = Graphics.boxHeight - this.fittingHeight(4);
  this.y -= this.fittingHeight(this._chainSkills.length + 1);
  // Set Enabled Flag to true;
  this._enabled = true;
  // Refresh Contents
  this.refresh();
};
//=============================================================================
// * Show Window
//=============================================================================
Window_ChainSkillList.prototype.show = function() {
  // Activate Window
  this.activate();
  // Super Call
  Window_Base.prototype.show.call(this);
};
//=============================================================================
// * Chain Input
//=============================================================================
Object.defineProperty(Window_ChainSkillList.prototype, 'chainInput', {
    get: function() { return this._chainInput; },
    set: function(value) {
      // Set Chain Input
      this._chainInput = value;
      // Set Enabled Flag
      this._enabled = false;
      // Refresh if value is not null
      if (value !== null) { this.refresh(); }
    },
    configurable: true
});

//=============================================================================
// * Refresh
//=============================================================================
Window_ChainSkillList.prototype.refresh = function() {
  // Set Chain Input to null if enabled
  if (this._enabled) { this._chainInput = null; }
  // Clear Contents
  this.contents.clear();
  // Draw Background Color
  this.drawBackgroundColor();
  // Draw Chain Skill Title
  this.drawChainSkillTitle();
  // If Skill Exists
  if (this._skill) {
    // Draw Chain Skills
    this.drawChainSkills();
  }
};
//=============================================================================
// * Draw Background Color
//=============================================================================
Window_ChainSkillList.prototype.drawBackgroundColor = function() {
  // Get Height
  var dh = this.lineHeight() * (this._chainSkills.length + 1);
  this.contents.gradientFillRect(0, 0, this.contents.width, dh, 'rgba(0, 0, 0, 192)', 'rgba(0, 0, 0, 0)');
  this.contents.paintOpacity = 78;
  this.contents.fillRect(0, this.lineHeight() - 4, this.contents.width, 2, this.normalColor());
  this.contents.paintOpacity = 255;
};
//=============================================================================
// * Draw Chain Skills
//=============================================================================
Window_ChainSkillList.prototype.drawChainSkillTitle = function() {
  // Reset Font Settings
  this.resetFontSettings();
  this.contents.fontSize = _TDS_.ActiveChainSkills.params.titleFontSize;
  this.contents.fontItalic = true;
  // Draw Title
  this.drawText(_TDS_.ActiveChainSkills.params.chainTitle, 12, 0, this.contents.width - 24);
  // Reset Font Settings
  this.resetFontSettings();
};
//=============================================================================
// * Draw Chain Skills
//=============================================================================
Window_ChainSkillList.prototype.drawChainSkills = function() {
  // Set Starting X & Y
  var sx = 24, sy = this.lineHeight();
  // If Skill has a chain skill list
  if (this._skill.meta.chainSkillList) {
    // Get Inputs
    var inputs = Object.keys(this._skill.meta.chainSkillList);
    // Go Through Inputs
    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      var skill = $dataSkills[this._skill.meta.chainSkillList[input]];
      // If Skill has not been learned
      if (!this._battler.isLearnedSkill(skill.id)) { continue; }
      // Set Text
      var text = '';
      // Add Input Text Settings
      text = text + this.inputTextSettings(input, skill);
      // Add Format to Text
      text = text + '\\i[%1]%2'.format(skill.iconIndex, skill.name);
      // Draw Text
      this.drawTextEx(text, sx, sy);
      // Increase Starting Y
      sy += this.lineHeight();
    }
  }
};
//=============================================================================
// * Input Text Settings
//=============================================================================
Window_ChainSkillList.prototype.inputTextSettings = function(input, skill) {
  // Set Active Flag
  var active = (input === this._chainInput);
  // Initialize Text
  var text = '';
  // Get Input Data
  var inputData = _TDS_.ActiveChainSkills.params.inputData;
  // Get Input DAta
  if (inputData[input]) {
    // If Enabled and Battler can use skill
    if (this._enabled && this._battler.canUse(skill)) {
      // Set Text
      text = inputData[input].on;
    } else if (!this._enabled && active) {
      // Set Text
      text = inputData[input].act;
    } else {
      // Set Text
      text = inputData[input].off;
    }
  }
  // Return Text
  return text;
};
