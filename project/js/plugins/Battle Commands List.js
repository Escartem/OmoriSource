//=============================================================================
// TDS Battle Commands List
// Version: 1.0
//=============================================================================
// Add to Imported List
var Imported = Imported || {} ; Imported.TDS_BattleCommandsList = true;
// Initialize Alias Object
var _TDS_ = _TDS_ || {} ; _TDS_.BattleCommandsList = _TDS_.BattleCommandsList || {};
//=============================================================================
 /*:
 * @plugindesc
 * This plugin allows you to set custom battle commands for actors and classes.
 *
 * @author TDS
 * @param Skill Type Names
 * @desc Names of skill types. (Used for skill list commands) (Use a , to separate and leave empty for default name.)
 * @default
 *
 * @help
 * ============================================================================
 * * Actor & Class Notetags
 * ============================================================================
 * Use the following note tags within the actor or class note boxes to
 * set the command list for the actor or class. (Actor note tags will 
 * override class tags.)
 *
 * <BattleCommandsList>
 * Command
 * </BattleCommandsList>
 *
 * Example:
 *
 * <BattleCommandsList> 
 * attack
 * defend
 * skillList
 * skillTypeList: 1
 * skill: 10
 * items
 * item: 2
 * </BattleCommandsList>
 *  
 * Command List:
 *
 *   attack
 *   ^ Adds default attack command to the commmand list.
 *
 *   defend
 *   ^ Adds default defense command to the command list.
 *
 *   skillList
 *   ^ Adds default skill command to the command list. (Shows all skills)
 *
 *   skillTypeList: SkillTypeId
 *   ^ Adds a skill list command which only shows a type of skill.
 *   ^ SkillTypeId: Id of the type of skill to show.
 *
 *   skill: ID
 *   ^ Adds a skill as a command.
 *   ^ ID: Id of the skill to set as a command.
 *
 *   items
 *   ^ Adds default item command to the command list. (Shows all items)
 *   
 *   item: ID
 *   ^ Adds an item as a command.
 *   ^ ID: ID of the item to set as a command.
 *   
 * ============================================================================
 * * Skill & Item Notetags
 * ============================================================================
 * These note tags will modify how items and skills are displayed or used
 * in the command window.
 *
 *   <CommandName: NAME>
 *   ^ This note tag allows you to set a display name for a skill or item
 *     when it is being displayed as a command.
 *   ^ NAME: Name to use as a command.
 *
 *   Example:
 *   <CommandName: Limit break>
 *
 *
 *   <CommandHideUntilSwitch: ID>
 *   ^ This note tag makes it so if a switch is not on the item or skill
 *     will not be displayed in the command list.
 *   ^ ID: ID of the switch to use.
 *
 *   Example:
 *   <CommandHideUntilSwitch: 5>
 *
 *
 *   <CommandHideUntilUsable>
 *   ^ This note tag makes it so if an item or skill cannot be used by
 *     the actor it will not be displayed in the command list.
 *
 *
 *   <CommandHideUntilLearned>
 *   ^ This note tag makes it so if a skill has not been learned by the
 *     actor it will not be displayed in the command list.
 */
//=============================================================================
// Node.js path
var path = require('path');
// Get Parameters
var parameters = PluginManager.parameters("Battle Commands List");
// Initialize After Battle Commmon Event Parameters
_TDS_.BattleCommandsList.params = {};
// Skill Type Custom Names
_TDS_.BattleCommandsList.params.sTypeNames = [''];
// Get Text
var text = parameters['Skill Type Names'];
// If Text is not empty
if (text !== '') {
  // Create List
  var list = text.split(/,/);
  // Go through List
  for (var i = 0; i < list.length; i++) {
    // Add Skill Type Name
    _TDS_.BattleCommandsList.params.sTypeNames.push(list[i].trim());
  }
}


//=============================================================================
// ** DataManager
//-----------------------------------------------------------------------------
// The static class that manages the database and game objects.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.BattleCommandsList.DataManager_onLoad = DataManager.onLoad;
//=============================================================================
// * On Load Processing
//=============================================================================
DataManager.onLoad = function(object) {
  // Run Original Function
  _TDS_.BattleCommandsList.DataManager_onLoad.call(this, object);
  // Set Array & Type
  var array = object, type = null;
  // Object Switch
  switch (object) {
    case $dataActors:  type = 'ACTOR' ;break;
    // case $dataClasses: type = 'CLASS' ;break;
    // case $dataItems:   type = 'ITEM'  ;break;
    // case $dataSkills:  type = 'SKILL' ;break;
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
        if (data) { this.extractActorBattleListMetaData(data, type); }
      }
    }
  }
};
//=============================================================================
// * Extract Meta Data
//=============================================================================
DataManager.extractActorBattleListMetaData = function(data, type) {
  // If Data has no notes return
  if (data.note.length <= 0)  { return; }
  // If Type is Actor
  if (type === 'ACTOR' || type === 'CLASS') {
    // If Data Meta has Info Text
    // Get Regexp
    var noteData = data.note.split(/[\r\n]+/);
    var regS = /<BattleCommandsList>/i, regE = /<\/BattleCommandsList>/;
    // Set Addline Flag to false
    var addLine = false;
    // Convert Battle Command List
    data.meta.BattleCommandsList = [];
    // Go Through Note Data
    for (var i = 0; i < noteData.length; i++) {
      var line = noteData[i];
      if (line.match(regS)) { addLine = true ; continue ;}
      if (line.match(regE)) { addLine = false ; continue ;}
      // If add line flag is true
      if (addLine) { 
        var commandData = line.split(/:/i); 
        data.meta.BattleCommandsList.push({ type: commandData[0].toLowerCase(), id: Number(commandData[1]) })
      }
    }
  }
};




//=============================================================================
// ** Game_Actor
//-----------------------------------------------------------------------------
// The game object class for an actor.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.BattleCommandsList.Game_Actor_setup = Game_Actor.prototype.setup;
//=============================================================================
// * Setup
//=============================================================================
Game_Actor.prototype.setup = function(actorId) {
  // Run Original Function
  _TDS_.BattleCommandsList.Game_Actor_setup.call(this, actorId);
  // Initialize Battle Command List
  this.initBattleCommandsList();
};

//=============================================================================
// * Initialize Actor Battle Commands List
//=============================================================================
Game_Actor.prototype.initBattleCommandsList = function() { 
  // Get Actor & Current Class
  var actor = this.actor(), currentClass = this.currentClass();
  // Find Corrent Battle Command List
  if (actor.meta.BattleCommandsList) {
    // Set Battle Command List
    this._battleCommandsList = actor.meta.BattleCommandsList.clone();
  } else if (currentClass.meta.BattleCommandsList) {
    // Set Battle Command List
    this._battleCommandsList = currentClass.meta.BattleCommandsList.clone();
  } else  {
    // Set Battle Command List
    this._battleCommandsList = []  
  }
};
//=============================================================================
// * Determine if Battler has custom battle commands
//=============================================================================
Game_Actor.prototype.hasCustomBattleCommands = function() { return this._battleCommandsList.length > 0; };
//=============================================================================
// * Get Actor Battle Commands List
//=============================================================================
Game_Actor.prototype.battleCommandsList = function() { return this._battleCommandsList; };
//=============================================================================
// * Determine if Actor can show item battle command
//=============================================================================
Game_Actor.prototype.canShowItemBattleCommand = function(item) { 
  if (item.meta.CommandHideUntilUsable && !this.canUse(item)) { return false; };
  if (item.meta.CommandHideUntilLearned && !this.isLearnedSkill(item.id)) { return false; };
  if (item.meta.CommandHideUntilSwitch && !$gameSwitches.value(Number(item.meta.CommandHideUntilSwitch))) { return false; };
  // Return true by default
  return true;
};



//=============================================================================
// ** Window_ActorCommand
//-----------------------------------------------------------------------------
// The window for selecting an actor's action on the battle screen.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.BattleCommandsList.Window_ActorCommand_makeCommandList = Window_ActorCommand.prototype.makeCommandList;
//=============================================================================
// * Make Command List
//=============================================================================
Window_ActorCommand.prototype.makeCommandList = function() {
  // If Actor has Custom Battle Commands
  if (this._actor && this._actor.hasCustomBattleCommands()) {
    // Make Custom Actor Command List
    this.makeCustomActorCommandList();
    return;
  };
  // Run Original Function
  _TDS_.BattleCommandsList.Window_ActorCommand_makeCommandList.call(this);  
};
//=============================================================================
// * Make Custom Actor Command List
//=============================================================================
Window_ActorCommand.prototype.makeCustomActorCommandList = function() { 
  // Get Actor
  var actor = this._actor;
  // Get Actor Battle Commands List
  var list = actor.battleCommandsList();
  // Go Through List
  for (var i = 0; i < list.length; i++) { this.addActorCustomCommand(list[i]); };
};
//=============================================================================
// * Add Actor Custom Command
//=============================================================================
Window_ActorCommand.prototype.addActorCustomCommand = function(obj) {  
  // Get Actor
  var actor = this._actor;
  // Object type case
  switch (obj.type.toLowerCase()) {
    case 'attack':    this.addAttackCommand() ;break;
    case 'skilllist': this.addSkillCommands() ;break;    
    case 'defend':    this.addGuardCommand()  ;break;
    case 'items':     this.addItemCommand()   ;break;
    case 'skilltypelist': 
      var stypeId = obj.id;
      var presetName = _TDS_.BattleCommandsList.params.sTypeNames[stypeId];
      // If Stype Names is not ''
      if (presetName && presetName !== '') {
        var name = presetName;
      } else {
        var name = $dataSystem.skillTypes[stypeId];
      }
      this.addCommand(name, 'skill', true, stypeId);    
      break;
    case 'skill': 
      // Get Skill
      var skill = $dataSkills[obj.id];
      // If Skill command can be shown
      if (actor.canShowItemBattleCommand(skill)) {
        // Get Skill Name
        var name = (skill.meta.CommandName || skill.name).trim();
        // Add Command
        this.addCommand(name, 'actionSkill', actor.canUse(skill), skill.id);        
      }
      break;
    case 'item':
      // Get Skill
      var item = $dataItems[obj.id];
      // If Item command can be shown
      if (actor.canShowItemBattleCommand(item)) { 
        // Get Item Name
        var name = (item.meta.CommandName || item.name).trim();        
        // Add Command
        this.addCommand(name, 'actionItem', actor.canUse(item), item.id);
      }
      break;
    default:
      this.addCommand('ERROR', 'ERROR', false);
      break;
  }
};

//=============================================================================
// ** Scene_Battle
//-----------------------------------------------------------------------------
// The scene class of the battle screen.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.BattleCommandsList.Scene_Battle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
_TDS_.BattleCommandsList.Scene_Battle_onEnemyCancel            = Scene_Battle.prototype.onEnemyCancel;
_TDS_.BattleCommandsList.Scene_Battle_onActorCancel            = Scene_Battle.prototype.onActorCancel;
//=============================================================================
// * Create Actor Command Window
//=============================================================================
Scene_Battle.prototype.createActorCommandWindow = function() {
  // Run Original Function
  _TDS_.BattleCommandsList.Scene_Battle_createActorCommandWindow.call(this);
  // Set Actor Command Window Handlers
  this._actorCommandWindow.setHandler('actionSkill',  this.commandActorCommandAction.bind(this));
  this._actorCommandWindow.setHandler('actionItem',   this.commandActorCommandAction.bind(this));
};
//=============================================================================
// * On Enemy Cancel
//=============================================================================
Scene_Battle.prototype.onEnemyCancel = function() {
  // Run Original Function
  _TDS_.BattleCommandsList.Scene_Battle_onEnemyCancel.call(this);
  switch (this._actorCommandWindow.currentSymbol()) {
  case 'actionSkill':
    this._actorCommandWindow.activate();
    break;
  case 'actionItem':
    this._actorCommandWindow.activate();
    break;
  }
};
//=============================================================================
// * On Actor Cancel
//=============================================================================
Scene_Battle.prototype.onActorCancel = function() {
  // Run Original Function
  _TDS_.BattleCommandsList.Scene_Battle_onActorCancel.call(this);
  switch (this._actorCommandWindow.currentSymbol()) {
  case 'actionSkill':
    this._actorCommandWindow.activate();
    break;
  case 'actionItem':
    this._actorCommandWindow.activate();
    break;
  }
};
//=============================================================================
// * Create Actor Command Window
//=============================================================================
Scene_Battle.prototype.commandActorCommandAction = function() { 
  var symbol = this._actorCommandWindow.currentSymbol();  
  var id = this._actorCommandWindow.currentExt();
  var action = BattleManager.inputtingAction();
  if (symbol === 'actionSkill') { action.setSkill(id); }
  if (symbol === 'actionItem')  { action.setItem(id); }
  this.onSelectAction();
}







