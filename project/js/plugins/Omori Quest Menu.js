//=============================================================================
// TDS Omori Quest Menu
// Version: 1.3
//=============================================================================
// Add to Imported List
var Imported = Imported || {} ; Imported.TDS_QuestMenu = true;
// Initialize Alias Object
var _TDS_ = _TDS_ || {} ; _TDS_.QuestMenu = _TDS_.QuestMenu || {};
//=============================================================================
 /*:
 * @plugindesc
 * Quest Menu for OMORI.
 *
 * @author TDS
 *
 * @param Opening Message
 * @desc The Message to show when the quest menu is called.
 * @default ""
 *
 *
 * @param World Variable ID
 * @desc ID of the variable used to track the current world.
 * @default 1
 *
 * @help
 * ============================================================================
 * * Script Calls
 * ============================================================================
 *
 *  Use this script call to call the quest menu.
 *
 *    this.callQuestMenu();
 *
 *
 *
 *  Use this script call to add a quest.
 *
 *    this.addQuest(ID);
 *
 *    ID
 *    ^ Id of the quest.
 *
 *    Example:
 *
 *      this.addQuest('Quest4');
 *
 *
 *
 *  Use this script call to remove a quest.
 *
 *    this.removeQuest(ID);
 *
 *    ID
 *    ^ Id of the quest.
 *
 *    Example:
 *
 *      this.removeQuest('Quest4');
 *
 *
 *
 *  Use this script call to set the complete state of a quest.
 *
 *    this.setQuestCompleteState(ID, STATE);
 *
 *    ID
 *    ^ Id of the quest.
 *
 *    STATE
 *    ^ State of the quest. (true/false) (Optiona: Defaults to true)
 *
 *    Example:
 *
 *      this.setQuestCompleteState('Quest1');
 *
 *      this.setQuestCompleteState('Quest4', true);
 *
 *      this.setQuestCompleteState('Quest5', false);
 *
 *
 *  Use this script call to set a quest's message index.
 *
 *    this.setQuestMessageIndex(ID, INDEX);
 *
 *    ID
 *    ^ Id of the quest.
 *
 *    INDEX
 *    ^ Index value.
 *
 *    Example:
 *
 *      this.setQuestMessageIndex('Quest4', 1);
 *
 */
//=============================================================================
// Node.js path
var path = require('path');
// Get Parameters
var parameters = PluginManager.parameters("Omori Quest Menu");
// Initialize Parameters
_TDS_.QuestMenu.params = {};
_TDS_.QuestMenu.params.worldVariableID = Number(parameters['World Variable ID'] || 1);
_TDS_.QuestMenu.params.openingMessage  = String(parameters['Opening Message'] || '');




//=============================================================================
// ** DataManager
//-----------------------------------------------------------------------------
// The game object class for the party. Information such as gold and items is
// included.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.QuestMenu.DataManager_loadDatabase = DataManager.loadDatabase;
//=============================================================================
// * Load Database
//=============================================================================
DataManager.loadDatabase = function() {
  // Run Original Function
  _TDS_.QuestMenu.DataManager_loadDatabase.call(this);
  var path = require('path');
  var fs = require('fs');
  var yaml = require('./js/libs/js-yaml-master')
  // Load Quests
  window['$dataQuests'] = yaml.safeLoad(fs.readFileSync('data/Quests.yaml', 'utf8'));
};


//=============================================================================
// ** Game_Party
//-----------------------------------------------------------------------------
// The game object class for the party. Information such as gold and items is
// included.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.QuestMenu.Game_Party_initialize = Game_Party.prototype.initialize;
//=============================================================================
// * Object Initialization
//=============================================================================
Game_Party.prototype.initialize = function() {
  // Run Original Function
  _TDS_.QuestMenu.Game_Party_initialize.call(this);
  // Initialize Quest List
  this._questList = [];
  // Quest Stand By Message
  this._questStandByMessage = null;
};
//=============================================================================
// * Set Stand By Message
//=============================================================================
Game_Party.prototype.setQuestStandByMessage = function(message) {
  this._questStandByMessage = message;
};
//=============================================================================
// * Add Quest
//=============================================================================
Game_Party.prototype.addQuest = function(id, data = {}) {
  // If You don't have quest already
  if (!this.hasQuest(id, false)) {
    // Get World
    var world = $dataQuests.quests[id].world;
    // Create Quest Object
    var quest = {id: id, messageIndex: 0, world: world, complete: false};
    // Assign Data to Quest
    Object.assign(quest, data);
    // Add Quest to Quest List
    this._questList.push(quest)
    // Return Added Quest
    return quest;
  };
  // Return False
  return false;
};
//=============================================================================
// * Remove Quest
//=============================================================================
Game_Party.prototype.removeQuest = function(id) {
  // Get List of Quests to remove
  var list = this._questList.filter(function(quest) { return quest.id === id; } )
  // Go Through List
  for (var i = 0; i < list.length; i++) {
    // Get Index of Quest to remove
    var index = this._questList.indexOf(list[i]);
    // Remove Quest
    if (index >= 0) { this._questList.splice(index, 1); };
  };
};
//=============================================================================
// * Determine if you have quest already
//=============================================================================
Game_Party.prototype.hasQuest = function(id, completed = true) {
  return this._questList.some(function(quest) { return quest.id === id });
};
//=============================================================================
// * Get Completed Quest List
//=============================================================================
Game_Party.prototype.completedQuestList = function(world = 0) {
  return this._questList.filter(function(quest) { return quest.complete && quest.world === world; });
};
//=============================================================================
// * Get Incomplete Quest List
//=============================================================================
Game_Party.prototype.incompleteQuestList = function(world = 0) {
  return this._questList.filter(function(quest) { return !quest.complete && quest.world === world; });
};
//=============================================================================
// * Set Quest Complete State
//=============================================================================
Game_Party.prototype.setQuestCompleteState = function(id, state = true) {
  for (var i = 0; i < this._questList.length; i++) {
    var quest = this._questList[i];
    if (quest.id === id) { quest.complete = state; };
  };
};
//=============================================================================
// * Set Quest Message Index
//=============================================================================
Game_Party.prototype.setQuestMessageIndex = function(id, index) {
  // Get Quest
  var quest = this._questList.find(function(q) { return q.id === id; });
  // Set Quest Message Index
  if (quest) { quest.messageIndex = index; };
};



//=============================================================================
// ** Game_Interpreter
//-----------------------------------------------------------------------------
// The interpreter for running event commands.
//=============================================================================
// * Call Quest Menu
//=============================================================================
Game_Interpreter.prototype.callQuestMenu = function() {
  SceneManager.push(Scene_OmoriQuest);
};
//=============================================================================
// * Add Quest
//=============================================================================
Game_Interpreter.prototype.addQuest = function(id, data) {
  $gameParty.addQuest(id, data);
};
//=============================================================================
// * Remove Quest
//=============================================================================
Game_Interpreter.prototype.removeQuest = function(id) {
  $gameParty.removeQuest(id);
};
//=============================================================================
// * Set Quest Complete State
//=============================================================================
Game_Interpreter.prototype.setQuestCompleteState = function(id, state) {
  $gameParty.setQuestCompleteState(id, state);
};
//=============================================================================
// * Set Quest Message Index
//=============================================================================
Game_Interpreter.prototype.setQuestMessageIndex = function(id, index) {
  $gameParty.setQuestMessageIndex(id, index);
};



//=============================================================================
// ** Scene_OmoriQuest
//-----------------------------------------------------------------------------
// Base Class for Omori Menu Scenes
//=============================================================================
function Scene_OmoriQuest() { this.initialize.apply(this, arguments); }
Scene_OmoriQuest.prototype = Object.create(Scene_Base.prototype);
Scene_OmoriQuest.prototype.constructor = Scene_OmoriQuest;
//=============================================================================
// * Object Initialization
//=============================================================================
Scene_OmoriQuest.prototype.initialize = function() {
  // Super Call
  Scene_Base.prototype.initialize.call(this);
  // Update Window Cursors Flag
  this._updateWindowCursors = false;
};
//=============================================================================
// * Create
//=============================================================================
Scene_OmoriQuest.prototype.create = function() {
  // Super Call
  Scene_Base.prototype.create.call(this);
  // Create Background
  this.createBackground();
  // Create Quest Windows
  this.createQuestWindows();
  // Create Message Window
  this.createMessageWindow();
};
//=============================================================================
// * Create Background
//=============================================================================
Scene_OmoriQuest.prototype.start = function() {
  // Super Call
  Scene_Base.prototype.start.call(this);
  // If there's an opening message
  if (_TDS_.QuestMenu.params.openingMessage.length > 0) {
    // Set Starting Message
    $gameMessage.showLanguageMessage(_TDS_.QuestMenu.params.openingMessage);
  };
  // Set Update Wait Cursors Flag to true
  this._updateWindowCursors = true;
  this._questListWindow.updateCustomCursorRectSprite();
  this._questTypesWindows.updateCustomCursorRectSprite();
};
//=============================================================================
// * Create Background
//=============================================================================
Scene_OmoriQuest.prototype.createBackground = function() {
  this._backgroundSprite = new Sprite();
  this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
  this.addChild(this._backgroundSprite);
};
//=============================================================================
// * Create Quest Windows
//=============================================================================
Scene_OmoriQuest.prototype.createQuestWindows = function() {
  // Create Quest Header Window
  this._questHeaderWindow = new Window_OmoriQuestHeader()
  this.addChild(this._questHeaderWindow);
  // Create Quest Types Window
  this._questTypesWindows = new Window_OmoriQuestTypes();
  this._questTypesWindows.y = this._questHeaderWindow.y + this._questHeaderWindow.height + 2;
  this._questTypesWindows.setHandler('ok', this.onQuestTypesOk.bind(this));
  this._questTypesWindows.setHandler('cancel', this.popScene.bind(this));
  this.addChild(this._questTypesWindows);
  // Create Quest List Window
  this._questListWindow = new Window_OmoriQuestList();
  this._questListWindow.x = this._questTypesWindows.x + this._questTypesWindows.width + 2;
  this._questListWindow.y = this._questTypesWindows.y;
  this._questListWindow.setHandler('ok', this.onQuestListOk.bind(this));
  this._questListWindow.setHandler('cancel', this.onQuestListCancel.bind(this));
  this.addChild(this._questListWindow);

  // Set Quest List Window
  this._questTypesWindows._questlistWindow = this._questListWindow;
  this._questTypesWindows.callUpdateHelp();
};
//=============================================================================
// * Create Message Window
//=============================================================================
Scene_OmoriQuest.prototype.createMessageWindow = function() {
  this._messageWindow = new Window_OmoriQuestMessage();
  this.addChild(this._messageWindow);
  this._messageWindow.subWindows().forEach(function(window) {
    this.addChild(window);
  }, this);
  // Add Facebox Window Container as a Child
  this.addChild(this._messageWindow._faceBoxWindowContainer);
};
//=============================================================================
// * [OK] Quest Type
//=============================================================================
Scene_OmoriQuest.prototype.onQuestTypesOk = function() {
  this._questListWindow.select(0);
  this._questListWindow.activate();
};
//=============================================================================
// * [OK] Quest List
//=============================================================================
Scene_OmoriQuest.prototype.onQuestListOk = function() {
  this._questListWindow.activate();
  this._messageWindow._setStandbyMessage = true;
  // Get Messages
  var messages = this._questListWindow.selectedQuestMessages();
  $gameMessage.showLanguageMessage(messages[0]);
  // Clear Message List
  this._messageWindow.clearMessageList();
  for (var i = 1; i < messages.length; i++) {
    this._messageWindow.addMessage(messages[i]);
  };
  // Set Update Wait Cursors Flag to true
  this._updateWindowCursors = true;
  this._questListWindow.updateCustomCursorRectSprite();
  this._questTypesWindows.updateCustomCursorRectSprite();
};
//=============================================================================
// * [Cancel] Quest List
//=============================================================================
Scene_OmoriQuest.prototype.onQuestListCancel = function() {
  // Activate Quest Types Window
  this._questTypesWindows.activate();
  this._questListWindow.deselect();
};
//=============================================================================
// * Frame Update
//=============================================================================
Scene_OmoriQuest.prototype.update = function() {
  // Super Call
  Scene_Base.prototype.update.call(this);

  if (this._updateWindowCursors && !$gameMessage.isBusy()) {
    this._updateWindowCursors = false;
    this._questListWindow.updateCustomCursorRectSprite();
    this._questTypesWindows.updateCustomCursorRectSprite();
  };
  // if (Input.isTriggered('control')) {
  // }
};




//=============================================================================
// ** Window_OmoriQuestHeader
//-----------------------------------------------------------------------------
// This window displays the quest list header.
//=============================================================================
function Window_OmoriQuestHeader() { this.initialize.apply(this, arguments); }
Window_OmoriQuestHeader.prototype = Object.create(Window_Base.prototype);
Window_OmoriQuestHeader.prototype.constructor = Window_OmoriQuestHeader;
//=============================================================================
// * Initialize Object
//=============================================================================
Window_OmoriQuestHeader.prototype.initialize = function() {
  // Super Call
  Window_Base.prototype.initialize.call(this, 12, 12, this.windowWidth(), this.windowHeight());
  // // Close Window
  // this.openness = 0;
  // Draw Contents
  this.refresh();
};
//=============================================================================
// * Settings
//=============================================================================
Window_OmoriQuestHeader.prototype.standardPadding = function() { return 0; };
Window_OmoriQuestHeader.prototype.windowWidth = function() { return 164; };
Window_OmoriQuestHeader.prototype.windowHeight = function() { return 44; };
//=============================================================================
// * Refresh
//=============================================================================
Window_OmoriQuestHeader.prototype.refresh = function() {
  // Clear Contents
  this.contents.clear();
  // Draw Header
  this.contents.drawText(LanguageManager.getPluginText('questMenu', 'header'), 0, -6, this.contents.width, this.contents.height, 'center');
};



//=============================================================================
// ** Window_OmoriQuestTypes
//-----------------------------------------------------------------------------
// This window displays quest types (Completed, Incomplete).
//=============================================================================
function Window_OmoriQuestTypes() { this.initialize.apply(this, arguments); }
Window_OmoriQuestTypes.prototype = Object.create(Window_Command.prototype);
Window_OmoriQuestTypes.prototype.constructor = Window_OmoriQuestTypes;
//=============================================================================
// * Initialize Object
//=============================================================================
Window_OmoriQuestTypes.prototype.initialize = function() {
  // Super Call
  Window_Command.prototype.initialize.call(this, 12, 0);
  this.activate();
  this.select(0);
};
//=============================================================================
// * Settings
//=============================================================================
Window_OmoriQuestTypes.prototype.isUsingCustomCursorRectSprite = function() { return true; };
Window_OmoriQuestTypes.prototype.windowWidth = function() { return 184; };
Window_OmoriQuestTypes.prototype.windowHeight = function() { return 81; };
Window_OmoriQuestTypes.prototype.standardPadding = function() { return 8; };
Window_OmoriQuestTypes.prototype.customCursorRectTextXOffset = function() { return 35; };
Window_OmoriQuestTypes.prototype.customCursorRectXOffset = function() { return 10;  };
Window_OmoriQuestTypes.prototype.lineHeight = function() { return 28; };
Window_OmoriQuestTypes.prototype.standardFontSize = function() { return 24; };
//=============================================================================
// * Get Current World
//=============================================================================
Window_OmoriQuestTypes.prototype.currentWorld = function() {
  return $gameVariables.value(_TDS_.QuestMenu.params.worldVariableID);
};
//=============================================================================
// * Make Command List
//=============================================================================
Window_OmoriQuestTypes.prototype.makeCommandList = function() {
  var world = this.currentWorld();
  let questStates = LanguageManager.getPluginText('questMenu', 'questStates');
  this.addCommand(questStates[0], 'incomplete', $gameParty.incompleteQuestList(world).length > 0 );
  this.addCommand(questStates[1],  'complete', $gameParty.completedQuestList(world).length > 0);
};
//=============================================================================
// * Draw Item
//=============================================================================
Window_OmoriQuestTypes.prototype.drawItem = function(index) {
  // Get Item Rect
  var rect = this.itemRectForText(index);
  var align = this.itemTextAlign();
  this.resetTextColor();
  // Set Text Color
  this.changeTextColor(index === 1 ? 'rgba(0, 161, 4, 1)' : 'rgba(228, 50, 14, 1)');
  this.changePaintOpacity(this.isCommandEnabled(index));
  this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
};
//=============================================================================
// * Call Update Help
//=============================================================================
Window_OmoriQuestTypes.prototype.callUpdateHelp = function() {
  // Run Original Function
  Window_Command.prototype.callUpdateHelp.call(this);
  // if Quest List Window Exists
  if (this._questlistWindow) {
    var world = this.currentWorld();
    // Get List
    var list = this.index() === 0 ? $gameParty.incompleteQuestList(world) : $gameParty.completedQuestList(world);
    // Set Quest List
    this._questlistWindow.setQuestList(list);
  };
};
//=============================================================================
// * Process Cursor Move
//=============================================================================
Window_OmoriQuestTypes.prototype.processCursorMove = function() {
  // If a message is displaying
  if ($gameMessage.isBusy()) { return;};
  // Run Original Function
  Window_Command.prototype.processCursorMove.call(this);
};
//=============================================================================
// * Process Handling
//=============================================================================
Window_OmoriQuestTypes.prototype.processHandling = function() {
  // If a message is displaying
  if ($gameMessage.isBusy()) { return;};
  // Run Original Function
  Window_Command.prototype.processHandling.call(this);
};
//=============================================================================
// * Update Custom Cursor Rect Sprite
//=============================================================================
Window_OmoriQuestTypes.prototype.updateCustomCursorRectSprite = function(sprite, index) {
  // Set Sprite
  sprite = this._customCursorRectSprite;
  // If Custom Rect Sprite Exists
  if (sprite && $gameMessage.isBusy()) {
    // Set Sprite Tone Color
    sprite.setColorTone([-80, -80, -80, 255]);
    // Set Sprite active flag
    sprite._active = false;
    return;
  };
  // Run Original Function
  Window_Command.prototype.updateCustomCursorRectSprite.call(this, sprite, index);
};



//=============================================================================
// ** Window_OmoriQuestList
//-----------------------------------------------------------------------------
// This window displays the list of available and completed quests
//=============================================================================
function Window_OmoriQuestList() { this.initialize.apply(this, arguments); }
Window_OmoriQuestList.prototype = Object.create(Window_Command.prototype);
Window_OmoriQuestList.prototype.constructor = Window_OmoriQuestList;
//=============================================================================
// * Initialize Object
//=============================================================================
Window_OmoriQuestList.prototype.initialize = function() {
  // Quest List
  this._questList = [];
  // Super Call
  Window_Command.prototype.initialize.call(this, 12, 0);
  // this.openness = 0;
  this.deactivate();
  this.deselect();
};
//=============================================================================
// * Settings
//=============================================================================
Window_OmoriQuestList.prototype.isUsingCustomCursorRectSprite = function() { return true; };
Window_OmoriQuestList.prototype.windowWidth = function() { return 360 };
Window_OmoriQuestList.prototype.windowHeight = function() { return 177; };
Window_OmoriQuestList.prototype.standardPadding = function() { return 8; };
Window_OmoriQuestList.prototype.customCursorRectTextXOffset = function() { return 35; };
Window_OmoriQuestList.prototype.lineHeight = function() { return 25; };
Window_OmoriQuestList.prototype.standardFontSize = function() { return 24; };
//=============================================================================
// * Set Quest List
//=============================================================================
Window_OmoriQuestList.prototype.setQuestList = function(list) {
  // Set List
  this._questList = list;
  // Refresh
  this.refresh();
  // Reset Scroll
  this.resetScroll();
};
//=============================================================================
// * Get Selected Quest Messages
//=============================================================================
Window_OmoriQuestList.prototype.selectedQuestMessages = function(index = this._index) {
  // Get Quest
  var quest = this._questList[index];
  // Return Quest
  return $dataQuests.quests[quest.id].text[quest.messageIndex];
};
//=============================================================================
// * Make Command List
//=============================================================================
Window_OmoriQuestList.prototype.makeCommandList = function() {
  // Get Language
  var language = LanguageManager._language;
  // Go Through Quest List
  for (var i = 0; i < this._questList.length; i++) {
    // Get Quest
    var quest = this._questList[i];
    // Get Data
    const loc = LanguageManager.getMessageData("XX_BLUE.Quest_Names")[quest.id]
    var data = $dataQuests.quests[quest.id];
    const questname = !loc ? data.name[language] : loc
    this.addCommand(questname, 'quest', true, quest)
  };
};
//=============================================================================
// * Draw Item
//=============================================================================
Window_OmoriQuestList.prototype.drawItem = function(index) {
  // Run Original Function
  Window_Command.prototype.drawItem.call(this, index);
  // Get Item Rect
  var rect = this.itemRect(index);
};
//=============================================================================
// * Refresh Arrows
//=============================================================================
Window_OmoriQuestList.prototype._refreshArrows = function() {
  // Super Call
  Window_Command.prototype._refreshArrows.call(this);
  var w = this._width;
  var h = this._height;
  var p = 24;
  var q = (p/2) + 5;
  this._downArrowSprite.move(w - q, h - q);
  this._upArrowSprite.move(w - q, q);
};
//=============================================================================
// * Process Cursor Move
//=============================================================================
Window_OmoriQuestList.prototype.processCursorMove = function() {
  // If a message is displaying
  if ($gameMessage.isBusy()) { return;};
  // Run Original Function
  Window_Command.prototype.processCursorMove.call(this);
};
//=============================================================================
// * Process Handling
//=============================================================================
Window_OmoriQuestList.prototype.processHandling = function() {
  // If a message is displaying
  if ($gameMessage.isBusy()) { return;};
  // Run Original Function
  Window_Command.prototype.processHandling.call(this);
};
//=============================================================================
// * Update Custom Cursor Rect Sprite
//=============================================================================
Window_OmoriQuestList.prototype.updateCustomCursorRectSprite = function(sprite, index) {
  // Set Sprite
  sprite = this._customCursorRectSprite;
  // If Custom Rect Sprite Exists
  if (sprite && $gameMessage.isBusy()) {
    // Set Sprite Tone Color
    sprite.setColorTone([-80, -80, -80, 255]);
    // Set Sprite active flag
    sprite._active = false;
    return;
  };
  // Run Original Function
  Window_Command.prototype.updateCustomCursorRectSprite.call(this, sprite, index);
};




//=============================================================================
// ** Window_OmoriQuestMessage
//-----------------------------------------------------------------------------
// This window displays quest message dialogue.
//=============================================================================
function Window_OmoriQuestMessage() { this.initialize.apply(this, arguments); }
Window_OmoriQuestMessage.prototype = Object.create(Window_Message.prototype);
Window_OmoriQuestMessage.prototype.constructor = Window_OmoriQuestMessage;
//=============================================================================
// * Initialize Object
//=============================================================================
Window_OmoriQuestMessage.prototype.initialize = function() {
  // Clear Message List
  this.clearMessageList();
  // Set Standby Message Flag
  this._setStandbyMessage = false;
  // Super Call
  Window_Message.prototype.initialize.call(this);
};
//=============================================================================
// * Clear Message List
//=============================================================================
Window_OmoriQuestMessage.prototype.clearMessageList = function() {
  this._messageList = [];
};
//=============================================================================
// * Clear Message List
//=============================================================================
Window_OmoriQuestMessage.prototype.addMessage = function(message) {
  this._messageList.push(message);
};
//=============================================================================
// * Set Stand By Message
//=============================================================================
Window_OmoriQuestMessage.prototype.setStandByMessage = function() { this._setStandbyMessage = true; }
//=============================================================================
// * Terminate Message
//=============================================================================
Window_OmoriQuestMessage.prototype.terminateMessage = function() {
  // Clear Game Message
  $gameMessage.clear();
  // If Message List Length is more than 0
  if (this._messageList.length > 0) {
    // Get Message
    var message = this._messageList.shift();
    // Show Language Message
    $gameMessage.showLanguageMessage(message);
    return;
  };
  // If set Standy Message Flag is true
  if (this._setStandbyMessage) {
    // If Stand By Message for Quests Exist
    if ($gameParty._questStandByMessage) {
      // Set Quest Standby Message
      $gameMessage.showLanguageMessage($gameParty._questStandByMessage);
    }
    // Set Standby Message to false
    this._setStandbyMessage = false;
  };
};
