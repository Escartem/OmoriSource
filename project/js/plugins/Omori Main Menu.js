//=============================================================================
// TDS Omori Main Menu
// Version: 1.6
//=============================================================================
// Add to Imported List
var Imported = Imported || {} ; Imported.TDS_OmoriMainMenu = true;
// Initialize Alias Object
var _TDS_ = _TDS_ || {} ; _TDS_.OmoriMainMenu = _TDS_.OmoriMainMenu || {};
//=============================================================================
 /*:
 * @plugindesc
 * Main Menu for Omori.
 *
 * @author TDS
 *
 */
//=============================================================================



//=============================================================================
// ** Scene_Menu
//-----------------------------------------------------------------------------
// The scene class of the menu screen.
//=============================================================================
// * Object Initialization
//=============================================================================
Scene_Menu.prototype.initialize = function() {
  // Set Reservation ID
  this._imageReservationId = 'mainmenu'
  // Super Call
  Scene_MenuBase.prototype.initialize.call(this);
};
//=============================================================================
// * Initialize Atlas Lists
//=============================================================================
Scene_Menu.prototype.initAtlastLists = function() {
  // Run Original Function
  Scene_MenuBase.prototype.initAtlastLists.call(this);
};
//=============================================================================
// * Load Reserved Bitmaps
//=============================================================================
Scene_Menu.prototype.loadReservedBitmaps = function() {
  // Run Original Function
  Scene_MenuBase.prototype.loadReservedBitmaps.call(this);
  // Reserve System Images
  ImageManager.reserveSystem('newtagmenud', 0, this._imageReservationId);
};
//=============================================================================
// * Create
//=============================================================================
Scene_Menu.prototype.create = function() {
  Scene_MenuBase.prototype.create.call(this);

  // this._center = new Sprite(new Bitmap(Graphics.width, Graphics.height))
  // var spacing = 10;
  // this._center.bitmap.fillRect(0, 0, spacing, Graphics.height, 'rgba(255, 0, 0, 1)')
  // this._center.bitmap.fillRect(this._center.width - spacing, 0, spacing, Graphics.height, 'rgba(255, 0, 0, 1)')
  // this.addChild(this._center)

  // Create Windows
  this.createCommandWindow();
  this.createStatusWindows();
  this.createGoldWindow();
  //AudioManager.playSe({name: "sys_menu2", pan: 0, pitch: 100, volume: 90});
};
//=============================================================================
// * Determine if Busy
//=============================================================================
Scene_Menu.prototype.isBusy = function() {
  if (this._goldWindow && this._goldWindow.isClosing()) { return true; }
  return Scene_Base.prototype.isBusy.call(this);
};
//=============================================================================
// * Start
//=============================================================================
Scene_Menu.prototype.start = function() {
  // Super Call
  Scene_MenuBase.prototype.start.call(this);
//   //TEST
//   this._commandWindow.select(2);
// //   this._statusWindow.select(3);
//   this._commandWindow.deactivate();
//   this.onPersonalOk();
};
//=============================================================================
// * Set Command Window
//=============================================================================
Scene_Menu.prototype.setCommandWindow = function(win) {
  this._commandWindow = win;
};
//=============================================================================
// * Set Status Window
//=============================================================================
Scene_Menu.prototype.setStatusWindow = function(win) {
  this._statusWindow = win
};
//=============================================================================
// * Create Command Window
//=============================================================================
Scene_Menu.prototype.createCommandWindow = function() {
  // If Command Window Does Not Exist
  if (!this._commandWindow) {
    // Create Command Window
    this._commandWindow = new Window_MenuCommand(10, 10);
  } else {
    this._commandWindow.refresh();
  };
  this._commandWindow.activate();
  this._commandWindow.setHandler('talk',      this.commandTalk.bind(this));
  this._commandWindow.setHandler('item',      this.onPersonalOk.bind(this));
  this._commandWindow.setHandler('skill',     this.commandPersonal.bind(this));
  this._commandWindow.setHandler('equip',     this.commandPersonal.bind(this));
  this._commandWindow.setHandler('options',   this.commandOptions.bind(this));
  this._commandWindow.setHandler('cancel',    this.popScene.bind(this));
  this.addWindow(this._commandWindow);
};
//=============================================================================
// * Status Windows
//=============================================================================
Scene_Menu.prototype.createStatusWindows = function() {
  // Create Status Window
  if (!this._statusWindow) {
    // Create Status Window
    this._statusWindow = new Window_OmoMainMenuPartyStatus();
  };
  this._statusWindow._okSoundEnabled = true;
  this._statusWindow.y = Graphics.height;
  this._statusWindow.setHandler('ok',     this.onPersonalOk.bind(this));
  this._statusWindow.setHandler('cancel', this.onPersonalCancel.bind(this));
  this._statusWindow.setCursorText(LanguageManager.getPluginText('mainMenu', 'status').select);
  this.addChild(this._statusWindow);
};
//=============================================================================
// * Create Gold Window
//=============================================================================
Scene_Menu.prototype.createGoldWindow = function() {
  this._goldWindow = new Window_Gold(0, 0);
  this._goldWindow.x = (Graphics.boxWidth - this._goldWindow.width) - 10;
  this._goldWindow.y = (this._commandWindow.y + this._commandWindow.height) + 8;
  this._goldWindow.openness = 0;
  this._goldWindow.open();
  this.addWindow(this._goldWindow);
};
//=============================================================================
// * Command Window - Ok
//=============================================================================
Scene_Menu.prototype.commandTalk = function() {
  // If Stab switch is on
  if ($gameSwitches.value(4)) {
    this._statusWindow.setCursorText(LanguageManager.getPluginText('mainMenu', 'status').stab);
  } else {
    this._statusWindow.setCursorText(LanguageManager.getPluginText('mainMenu', 'status').tag);
  };
  this._commandWindow.deactivate();
  this._statusWindow.select(0);
  this._statusWindow.activate();
};
//=============================================================================
// * Command Window - Personal
//=============================================================================
Scene_Menu.prototype.commandPersonal = function() {
  this._statusWindow.setCursorText(LanguageManager.getPluginText('mainMenu', 'status').select);
  this._commandWindow.deactivate();
  this._statusWindow.select(0);
  this._statusWindow.activate();
};
//=============================================================================
// * Status Window - Cancel
//=============================================================================
Scene_Menu.prototype.onPersonalCancel = function() {
  this._statusWindow.deselect();
  this._commandWindow.activate();
};
//=============================================================================
// * Status Window - Ok
//=============================================================================
Scene_Menu.prototype.onPersonalOk = function() {
  this._goldWindow.close();
  switch (this._commandWindow.currentSymbol()) {
    case 'talk': return this.processTag() ;break;
    case 'item':  SceneManager.push(Scene_OmoMenuItem)   ;break;
    case 'skill': SceneManager.push(Scene_OmoMenuSkill)  ;break;
    case 'equip':  SceneManager.push(Scene_OmoMenuEquip) ;break;
  };
  // Transfer Command and Status Window to new Scene
  SceneManager._nextScene.setCommandWindow(this._commandWindow)
  SceneManager._nextScene.setStatusWindow(this._statusWindow);
};
//=============================================================================
// * Command Window - Options
//=============================================================================
Scene_Menu.prototype.commandOptions = function() {
  // Go to Option Scene
  SceneManager.push(Scene_OmoMenuOptions)
  // Transfer Command and Status Window to new Scene
  SceneManager._nextScene.setCommandWindow(this._commandWindow)
  SceneManager._nextScene.setStatusWindow(this._statusWindow);
};
//=============================================================================
// * Process Tag
//=============================================================================
Scene_Menu.prototype.processTag = function() {
  // Get Index
  var index = this._statusWindow.index();

  // If Stab switch is on
  if ($gameSwitches.value(4)) {

    if (index === 0) {
      // Reserve Common Event
      $gameTemp.reserveCommonEvent(34);
      // Go to Scene Map
      SceneManager.goto(Scene_Map);
    } else {
      // Play Buzzer
      SoundManager.playBuzzer();
      // this._commandWindow.activate();
      this._statusWindow.activate();
    }
    return;
  };
  // If Index is more than 0
  if (index > 0) {
    // Reopen Gold Window
    this._goldWindow.open()
    // Get Actor ID
    var actorId = $gameParty.members()[index].actorId();
    // Set Actor ID Variable
    $gameVariables.setValue(_TDS_.MapCharacterTag.params.selectedVariableID, actorId);
    // Reserve Common Event
    $gameTemp.reserveCommonEvent(_TDS_.MapCharacterTag.params.commonEventID);
  } else {
    // Play Buzzer
    SoundManager.playBuzzer();
    // Reopen Gold Window
    this._goldWindow.open()
    // this._commandWindow.activate();
    this._statusWindow.activate();
    // this._statusWindow.deselect();
    return;
  };
  // Go to Scene Map
  SceneManager.goto(Scene_Map);
};



//=============================================================================
// ** Window_MenuCommand
//-----------------------------------------------------------------------------
// The window for selecting a command on the menu screen.
//=============================================================================
// * Settings
//=============================================================================
Window_MenuCommand.prototype.isUsingCustomCursorRectSprite = function() { return true; };
Window_MenuCommand.prototype.lineHeight = function () { return 24; };
Window_MenuCommand.prototype.standardFontSize = function () { return LanguageManager.getMessageData("XX_BLUE.Window_MenuCommand").standardFontSize; };
Window_MenuCommand.prototype.windowWidth = function () { return Graphics.width - 20; };
Window_MenuCommand.prototype.spacing = function () {  return 12; };
Window_MenuCommand.prototype.standardPadding = function () { return 15; };
Window_MenuCommand.prototype.numVisibleRows = function () { return 1; };
Window_MenuCommand.prototype.maxCols = function () { return this.maxItems(); };
Window_MenuCommand.prototype.customCursorRectYOffset = function() { return 1; }
Window_MenuCommand.prototype.customCursorRectTextXOffset = function() { return 20; }
//=============================================================================
// * Item Rect For Text
//=============================================================================
Window_MenuCommand.prototype.itemRectForText = function (index) {
  var rect = Window_Command.prototype.itemRectForText.call(this, index);
  rect.y -= 3;
  return rect;
};
//=============================================================================
// * Make Command List
//=============================================================================
Window_MenuCommand.prototype.makeCommandList = function () {
  // Get Command Text
  var text = LanguageManager.getPluginText('mainMenu', 'commands');
  // Get Tag Text
  var tagText = text[0][0];
  const unlockedTag = $gameSwitches.value(17);
  const stabSwitch = $gameSwitches.value(4);
  const disableSwitch  = $gameSwitches.value(5);

  if (unlockedTag) { tagText = text[0][1]; };
  if (stabSwitch === true) { tagText = text[0][2]; };

  this.addCommand(tagText, 'talk', disableSwitch);
  this.addCommand(text[1], 'equip', $gameParty.members().length > 0);
  this.addCommand(text[2], 'item', $gameParty.hasValidPocketItems());
  this.addCommand(text[3], 'skill', $gameParty.members().length > 0);
  this.addCommand(text[4], 'options');
};

Window_MenuCommand.prototype.drawItem = function(index) {
  const stabSwitch = $gameSwitches.value(4);
  if (stabSwitch == true && index == 0){
  //  this.resetTextColor();
    this.changeTextColor(this.textColor(9));
  }
  else {
    this.resetTextColor();
  }
  var rect = this.itemRectForText(index);
  var align = this.itemTextAlign();
  this.changePaintOpacity(this.isCommandEnabled(index));
  this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
};



//=============================================================================
// ** Window_Gold
//-----------------------------------------------------------------------------
// The window for displaying the party's gold.
//=============================================================================
// * Settings
//=============================================================================
Window_Gold.prototype.windowWidth = function() { return 108 + 20; };
Window_Gold.prototype.windowHeight = function() { return 40; };
Window_Gold.prototype.standardPadding = function() { return 0; };
Window_Gold.prototype.lineHeight = function() { return 28; };
//=============================================================================
// * Refresh
//=============================================================================
Window_Gold.prototype.refresh = function() {
  var x = this.textPadding();
  var width = this.contents.width - this.textPadding() * 2;
  this.contents.clear();
  // this.contents.fontSize = value
  const loc_position = LanguageManager.getMessageData("XX_BLUE.Window_Gold").drawCurrencyValue_position
  this.drawCurrencyValue(this.value(), this.currencyUnit(), eval(loc_position[0]), loc_position[1], width);
};



//=============================================================================
// ** Window_OmoMainMenuPartyStatus
//-----------------------------------------------------------------------------
// The window for showing Menu Party Status and for selection.
//=============================================================================
function Window_OmoMainMenuPartyStatus() { this.initialize.apply(this, arguments); }
Window_OmoMainMenuPartyStatus.prototype = Object.create(Window_Selectable.prototype);
Window_OmoMainMenuPartyStatus.prototype.constructor = Window_OmoMainMenuPartyStatus;
//=============================================================================
// * Object Initialization
//=============================================================================
Window_OmoMainMenuPartyStatus.prototype.initialize = function() {
  // Super Call
  Window_Selectable.prototype.initialize.call(this, 0, 0, 1, 1);
  // Enable Ok Sound
  this._okSoundEnabled = true;
  // Create Status Windows
  this.createStatusWindows();
  // Create Cursor
  this.createCursor();
};
//=============================================================================
// * Settings
//=============================================================================
Window_OmoMainMenuPartyStatus.prototype.standardPadding = function() { return 0; }
Window_OmoMainMenuPartyStatus.prototype.windowWidth = function () { return 143; };
Window_OmoMainMenuPartyStatus.prototype.windowHeight = function() { return 109; }
Window_OmoMainMenuPartyStatus.prototype.maxItems = function() { return $gameParty.size();};
Window_OmoMainMenuPartyStatus.prototype.maxCols = function() { return $gameParty.size();};
//=============================================================================
// * Actor
//=============================================================================
Window_OmoMainMenuPartyStatus.prototype.actor = function(index) {
  // Set Default Index
  if (index === undefined) { index = this.index(); };
  return this._statusWindows[index].actor();
};
//=============================================================================
// * Play Ok Sound
//=============================================================================
Window_OmoMainMenuPartyStatus.prototype.playOkSound = function() {
  // Play Ok Sound
  if (this._okSoundEnabled) { Window_Selectable.prototype.playOkSound.call(this); };
};
//=============================================================================
// * Get Party (Considers rearrangement)
//=============================================================================
Window_OmoMainMenuPartyStatus.prototype.party = function() {
  // Initialize List
  var list = [];
  // Go Through List
  for (var i = 0; i < this._statusWindows.length; i++) {
    // Add Actor
    list.push(this._statusWindows[i].actor())
  }
  // Return List
  return list;
};
//=============================================================================
// * Update Arrow
//=============================================================================
Window_OmoMainMenuPartyStatus.prototype._updateArrows = function() {
  this._downArrowSprite.visible = false;
  this._upArrowSprite.visible = false;
};
//=============================================================================
// * Create Status Windows
//=============================================================================
Window_OmoMainMenuPartyStatus.prototype.createStatusWindows = function() {
  // Initialize Status Windows Array
  this._statusWindows = [];
  // Go Through Party Size
  for (var i = 0; i < $gameParty.size(); i++) {
    // Create Window
    var win = new Window_OmoMainMenuActorStatus(i);
    win.x = 10 + (i * (win.width + 0));
    win.y = -win.height;
    win._originX = win.x;
    this._statusWindows[i] = win;
    this.addChild(win);
  };
};
//=============================================================================
// * Sort Status Window
//=============================================================================
Window_OmoMainMenuPartyStatus.prototype.sortStatusWindows = function(pos) {
  // Set Position Flag
  if (pos === undefined) { pos = true; }
  // Sort Status Windows by original actor index
  this._statusWindows.sort(function(a, b) { return a._actorIndex - b._actorIndex; });
  // If Reset position flag
  if (pos) {
    for (var i = 0; i < this._statusWindows.length; i++) {
      var win = this._statusWindows[i]
      win.x = 10 + (i * (win.width + 0));
    };
  };
};
//=============================================================================
// * Reorder Status Window
//=============================================================================
Window_OmoMainMenuPartyStatus.prototype.reorderStatusWindows = function(from, to) {
  this._statusWindows.splice(to, 0, this._statusWindows.splice(from, 1)[0]);
  for (var i = 0; i < this._statusWindows.length; i++) {
    var win = this._statusWindows[i]
    win.x = 10 + (i * (win.width + 0));
  };
};
//=============================================================================
// * Create Cursor
//=============================================================================
Window_OmoMainMenuPartyStatus.prototype.createCursor = function() {
  this._cursorWindow = new Window_OmoWindowIndexCursor();
  this._cursorWindow.visible = false;
  this._cursorWindow.setText(LanguageManager.getMessageData("XX_BLUE.Map_Character_Tag").select_who);
  this._cursorWindow.y = -285;
  this.addChild(this._cursorWindow);
};
//=============================================================================
// * Set Cursor Text
//=============================================================================
Window_OmoMainMenuPartyStatus.prototype.setCursorText = function(text) {
  // Set Cursor Text
  this._cursorWindow.setText(text);
};
//=============================================================================
// * Update Cursor
//=============================================================================
Window_OmoMainMenuPartyStatus.prototype.updateCursor = function() {
  // Get Index
  var index = this.index();
  // If Status Windows Exist
  if (this._statusWindows) {
    // If Cursor for all
    if (this._cursorAll) {
      for (var i = 0; i < this._statusWindows.length; i++) {
        this._statusWindows[i].animateFace(true);
      };
      // Set Position to center
      this._cursorWindow.x = ((Graphics.width - this._cursorWindow.width) / 2);
      this._cursorWindow.y = -279;
      this._cursorWindow.visible = true;
    } else if (this.isCursorVisible()) {
      for (var i = 0; i < this._statusWindows.length; i++) {
        this._statusWindows[i].animateFace(i === index);
      };
      var win = this._statusWindows[index]
      this._cursorWindow.x = win.x + ((win.width - this._cursorWindow.width) / 2);
      this._cursorWindow.y = win.y - 170;
      this._cursorWindow.visible = true;
    } else {
      for (var i = 0; i < this._statusWindows.length; i++) {
        this._statusWindows[i].animateFace(false);
      };
      this._cursorWindow.visible = false;
    };
  };
};
//=============================================================================
// * Refresh
//=============================================================================
Window_OmoMainMenuPartyStatus.prototype.refresh = function() {
  // Go through all windows and refresh their contents
  for (var i = 0; i < this._statusWindows.length; i++) { this._statusWindows[i].refresh(); };
};




//=============================================================================
// ** Window_OmoMainMenuActorStatus
//-----------------------------------------------------------------------------
// The window for showing the main status in status menus.
//=============================================================================
function Window_OmoMainMenuActorStatus() { this.initialize.apply(this, arguments); }
Window_OmoMainMenuActorStatus.prototype = Object.create(Window_Base.prototype);
Window_OmoMainMenuActorStatus.prototype.constructor = Window_OmoMainMenuActorStatus;
//=============================================================================
// * Object Initialization
//=============================================================================
Window_OmoMainMenuActorStatus.prototype.initialize = function(index) {
  // Set Actor Index
  this._actorIndex = index;
  // Super Call
  Window_Base.prototype.initialize.call(this, 0, 0, this.windowWidth(), this.windowHeight());
  // Create Back Sprite
  this.createBackSprite();
  // Create Face Sprite
  this.createFaceSprite();
  // Refresh
  this.refresh();
  // Set Opacity to 0
  this.opacity = 0;
};
//=============================================================================
// * Settings
//=============================================================================
Window_OmoMainMenuActorStatus.prototype.standardPadding = function() { return 0; }
Window_OmoMainMenuActorStatus.prototype.windowWidth = function () { return 155; };
Window_OmoMainMenuActorStatus.prototype.windowHeight = function() { return 109; }
//=============================================================================
// * Contents Opacity
//=============================================================================
Object.defineProperty(Window_OmoMainMenuActorStatus.prototype, 'contentsOpacity', {
  get: function() { return this._windowContentsSprite.alpha * 255; },
  set: function(value) {
    value = value.clamp(0, 255)
    this._windowContentsSprite.alpha = value / 255;
    // Set Opacity for back sprites
    if (this._faceSprite) { this._faceSprite.opacity = value; };
    if (this._backSprite) { this._backSprite.opacity = value; }
  },
  configurable: true
});
//=============================================================================
// * Actor
//=============================================================================
Window_OmoMainMenuActorStatus.prototype.actor = function() { return $gameParty.allMembers()[this._actorIndex]; };
//=============================================================================
// * Create Back Sprite
//=============================================================================
Window_OmoMainMenuActorStatus.prototype.createBackSprite = function() {
  // Create Back Sprite
  this._backSprite = new Sprite(ImageManager.loadSystem('newtagmenud'));
  this._backSprite.setFrame(0, 0, this.windowWidth(), 109);
  this.addChildToBack(this._backSprite);
};
//=============================================================================
// * Create Face Sprite
//=============================================================================
Window_OmoMainMenuActorStatus.prototype.createFaceSprite = function() {
  // Create Face Sprite
  this._faceSprite = new Sprite_OmoMenuStatusFace();
  this._faceSprite.y = -this._faceSprite.height;
  this._faceSprite.x = 143;
  this._faceSprite.deactivate();
  this._faceSprite._inMenu = true;
  this._faceSprite.anchor.x = 0.5;
  this.addChild(this._faceSprite);
};
//=============================================================================
// * Create Face Sprite
//=============================================================================
Window_OmoMainMenuActorStatus.prototype.animateFace = function(bool) {
  // Set Face Sprite Animation
  this._faceSprite._active = bool;
};
//=============================================================================
// * Refresh
//=============================================================================
Window_OmoMainMenuActorStatus.prototype.refresh = function() {
  // Clear Contents
  this.contents.clear();
  // Get Actor
  var actor = this.actor();
  // If Actor Exists
  if (actor) {
    // Get World Index
    let worldIndex = SceneManager.currentWorldIndex();
    // Set Face Sprite Actor
    this._faceSprite.actor = actor;
    this._faceSprite.y = -this._faceSprite.height;
    this._faceSprite.x = Math.floor(143 / 2);
    this.contents.textColor = 'rgba(0, 0, 0, 1)';
    this.contents.outlineWidth = 0;
    this.contents.fontSize = LanguageManager.getMessageData("XX_BLUE.Window_OmoMainMenuActorStatus").refresh_contents_fontsize;
    let loc_position = LanguageManager.getMessageData("XX_BLUE.Window_OmoMainMenuActorStatus").refresh_drawText_position;
    this.drawText(actor.name(), loc_position[0], loc_position[1], this.contents.width);
    this.contents.fontSize = LanguageManager.getMessageData("XX_BLUE.Window_OmoMainMenuActorStatus").refresh_contents_fontsize2;
    this.contents.textColor = 'rgba(255, 255, 255, 1)';
    // If world index is not 2
    if (worldIndex !== 2) {
      // Get Exp Rate parts
      let exp = actor.currentLevelExp();
      let currentExp = actor.currentExp() - exp;
      let nextExp = actor.nextLevelExp() - exp;
      // Set Rate
      let rate = currentExp / nextExp;
      rate = Math.min(rate, 1);
      this.contents.gradientFillRect(2, 30, 151 * rate, 15, 'rgba(51, 0, 196, 1)', 'rgba(254, 145, 246, 1)');
      this.drawText("%1 %2".format(LanguageManager.getMessageData("XX_BLUE.Omori_Mainmenu").lvl, actor._level), 12, 18, this.contents.width);
    };
    // Get Bar Bitmap
    var bitmap = ImageManager.loadSystem('newtagmenud');
    // Draw HP Bar & HP
    this.contents.blt(bitmap, 0, 109, 116 * actor.hpRate(), 14, 29, 56);
    loc_position = LanguageManager.getMessageData("XX_BLUE.Window_OmoMainMenuActorStatus").refresh_drawTextHP_position;
    this.drawText(actor.hp + '/' + actor.mhp, loc_position[0], loc_position[1], this.contents.width - 26, 'right');
    // Draw MP Bar & MP
    loc_position = LanguageManager.getMessageData("XX_BLUE.Window_OmoMainMenuActorStatus").refresh_drawTextMP_position;
    this.contents.blt(bitmap, 0, 123, 116 * actor.mpRate(), 14, 29, 84  );
    this.drawText(actor.mp + '/' + actor.mmp, loc_position[0], loc_position[1], this.contents.width - 26, 'right');
  };
};
//=============================================================================
// * Frame Update
//=============================================================================
Window_OmoMainMenuActorStatus.prototype.update = function() {
    // Super Call
  Window_Base.prototype.update.call(this);
};




























































//=============================================================================
// ** Scene_BaseEX
//-----------------------------------------------------------------------------
// The superclass of all scenes within the game.
//=============================================================================
function Scene_BaseEX() { this.initialize.apply(this, arguments); }
Scene_BaseEX.prototype = Object.create(Scene_Base.prototype);
Scene_BaseEX.prototype.constructor = Scene_BaseEX;
//=============================================================================
// * Initialize Object
//=============================================================================
Scene_BaseEX.prototype.initialize = function() {
  // Super Call
  Scene_Base.prototype.initialize.call(this);
  // Initialize Queue Function List
  this._queueFunctionList = [];
  // Function List Index if not null it will begin adding functions from that index
  this._queueFunctionListIndex = null;
  // Set Wait to 0
  this._waitCount = 0;
  // Set Wait function
  this._waitFunction = null;
  // Create Movement Object
  this.move = new Object_Movement();
};
//=============================================================================
// * Frame Update
//=============================================================================
Scene_BaseEX.prototype.update = function() {
  // Super Call
  Scene_Base.prototype.update.call(this);
  // Update Queue Processing
  this.updateQueueProcessing();
  // Update Movement Object
  this.move.update();
};
//=============================================================================
// * Wait
//=============================================================================
Scene_BaseEX.prototype.wait = function(amount) { this._waitCount = amount; };
//=============================================================================
// * Set Wait Mode
//=============================================================================
Scene_BaseEX.prototype.setWaitMode = function(waitMode) { this._waitMode = waitMode; };
//=============================================================================
// * Start Function Wait
//=============================================================================
Scene_BaseEX.prototype.startFunctionWait = function(funct) { this.setWaitMode('function'); this._waitFunction = funct; };
//=============================================================================
// * Set Function List Index
//=============================================================================
Scene_BaseEX.prototype.setFunctionListIndex = function(index) { this._queueFunctionListIndex = 0; };
//=============================================================================
// * Clear Function List Index
//=============================================================================
Scene_BaseEX.prototype.clearFunctionListIndex = function() { this._queueFunctionListIndex = null; };
//=============================================================================
// * Clear Function List
//=============================================================================
Scene_BaseEX.prototype.clearFunctionList = function() { this._queueFunctionList = []; };
//=============================================================================
// * Queue
//=============================================================================
Scene_BaseEX.prototype.queue = function(method) {
  // Initialize Object for list
  var obj;
  // If Method is a function
  if (typeof method === 'function') {
    // Set Object to function
    obj = method;
  } else {
    // Get Arguments
    var methodArgs = Array.prototype.slice.call(arguments, 1);
    // Set Object
    obj = { name: method, params: methodArgs };
  };
  // If Function List Index is null
  if (this._functionListIndex !== null) {
    // Add Object onto queue function index
    this._queueFunctionList.splice(this._queueFunctionListIndex, 0, obj);
    // Increase Queue List index
    this._queueFunctionListIndex++;
  } else {
    // Add Object to Queue Function List
    this._queueFunctionList.push(obj);
  };
};
//=============================================================================
// * Call Next Queue Function
//=============================================================================
Scene_BaseEX.prototype.callNextQueueFunction = function() {
  // If Function List Length is more than 0
  if (this._queueFunctionList.length > 0) {
    // Get Function Data
    var funct = this._queueFunctionList.shift();
    // Function Data is a function call it
    if (funct instanceof Function) { return funct.call(); }
    // If Function Name and function exist
    if (funct.name && this[funct.name]) {
      // Call Function
      this[funct.name].apply(this, funct.params);
    } else {
      throw new Error('Method not found: ' + funct.name);
    };
  };
};
//=============================================================================
// * Update Queue Processing
//=============================================================================
Scene_BaseEX.prototype.updateQueueProcessing = function() {
  // If Waiting
  if (this.updateWait()) { return true; }
  // Call Next Function
  this.callNextQueueFunction();
  // Return if Function list is more than 0
  if (this._queueFunctionList.length > 0) { return true; }
  // Return false (No function is running)
  return false;
};
//=============================================================================
// * Phase Updates
//=============================================================================
Scene_BaseEX.prototype.updateWait = function() {
  // Return State of update wait count and update wait mode
  return this.updateWaitCount() || this.updateWaitMode();
};
//=============================================================================
// * Update Wait Count
//=============================================================================
Scene_BaseEX.prototype.updateWaitCount = function() {
  // If Wait count is more than 0
  if (this._waitCount > 0) {
    // Decrease Wait Count
    this._waitCount--;
    // If Wait count is less than 0 reset it to 0
    if (this._waitCount < 0) { this._waitCount = 0; }
    // Return true (waiting)
    return true;
  }
  // Return false (not waiting)
  return false;
};
//=============================================================================
// * Update Wait Mode
//=============================================================================
Scene_BaseEX.prototype.updateWaitMode = function() {
  // Set Waiting to false
  var waiting = false;
  // Wait mode case
  switch (this._waitMode) {
  case 'message':
    waiting = $gameMessage.isBusy();
    break;
  case 'movement':
    waiting = this.move.isMoving();
    break;
  case 'function':
    // If wait function is not null set waiting flag to wait function result
    if (this._waitFunction !== null) { waiting = this._waitFunction(); };
    // If Not waiting set the wait function to null
    if (!waiting) { this._waitFunction = null; }
    break;
  };
  // If not waiting set wait mode to nothing
  if (!waiting) { this._waitMode = ''; }
  // Return waiting flag
  return waiting;
};













//=============================================================================
// ** Scene_OmoMenuBase
//-----------------------------------------------------------------------------
// Base Class for Omori Menu Scenes
//=============================================================================
function Scene_OmoMenuBase() { this.initialize.apply(this, arguments); }
Scene_OmoMenuBase.prototype = Object.create(Scene_BaseEX.prototype);
Scene_OmoMenuBase.prototype.constructor = Scene_OmoMenuBase;
//=============================================================================
// * Object Initialization
//=============================================================================
Scene_OmoMenuBase.prototype.initialize = function() {
  // Super Call
  Scene_BaseEX.prototype.initialize.call(this);
  // Set Background Bitmap to null
  this._backgroundBitmap = null;
};
//=============================================================================
// * Set Background Bitmap
//=============================================================================
Scene_OmoMenuBase.prototype.setBackgroundBitmap = function(bitmap) {
  this._backgroundBitmap = bitmap
};
//=============================================================================
// * Create
//=============================================================================
Scene_OmoMenuBase.prototype.create = function() {
  // Create Command Window
  this.createCommandWindow();
  // Super Call
  Scene_BaseEX.prototype.create.call(this);
  // Create Status Window
  this.createStatusWindow();
};
//=============================================================================
// * Set Command Window
//=============================================================================
Scene_OmoMenuBase.prototype.setCommandWindow = function(win) {
  this._commandWindow = win;
};
//=============================================================================
// * Set Status Window
//=============================================================================
Scene_OmoMenuBase.prototype.setStatusWindow = function(win) {
  this._statusWindow = win
};
//=============================================================================
// * Create Command Window
//=============================================================================
Scene_OmoMenuBase.prototype.createCommandWindow = function() {
  // If Command Window Does Not Exist
  if (!this._commandWindow) {
    // Create Command Window
    this._commandWindow = new Window_MenuCommand(10, 10);
  };
  // Deactivate
  this._commandWindow.deactivate();
  // Add Child
  this.addChild(this._commandWindow);
};
//=============================================================================
// * Status Windows
//=============================================================================
Scene_OmoMenuBase.prototype.createStatusWindows = function() {
  // Create Status Window
  if (!this._statusWindow) {
    // Create Status Window
    this._statusWindow = new Window_OmoMainMenuPartyStatus();
  };
  this._statusWindow.y = Graphics.height;
  this.addChild(this._statusWindow);
};
//=============================================================================
// * Create
//=============================================================================
Scene_OmoMenuBase.prototype.create = function() {
  // Super Call
  Scene_BaseEX.prototype.create.call(this);
  // Create Background
  this.createBackground();
  // // Create Windows
  // this.createHelpWindow();
};
//=============================================================================
// * Create Help Window
//=============================================================================
Scene_OmoMenuBase.prototype.createHelpWindow = function() {
  // Create Help Window
  this._helpWindow = new Window_OmoMenuHelp();
  this._helpWindow.x = 11;
  this._helpWindow.y = (Graphics.height - this._helpWindow.height) - 11
  this.addChild(this._helpWindow);
};
//=============================================================================
// * Create Background
//=============================================================================
Scene_OmoMenuBase.prototype.createBackground = function() {
  this._backgroundSprite = new Sprite();
  this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
  this.addChild(this._backgroundSprite);
};
//=============================================================================
// * Create Actor Equip Window
//=============================================================================
Scene_OmoMenuBase.prototype.hideActorStatus = function(index, duration) {
  // Set Default Duration
  if (duration === undefined) { duration = 15; };
  var obj = this._statusWindow._statusWindows[index];
  var data = { obj: obj, properties: ['y', 'contentsOpacity'], from: {y: obj.y, contentsOpacity: obj.contentsOpacity}, to: {y: 110, contentsOpacity: 0}, durations: {y: duration, contentsOpacity: duration}}
  data.easing = Object_Movement.easeInCirc;
  this.move.startMove(data);
};
//=============================================================================
// * Show Actor Status
//=============================================================================
Scene_OmoMenuBase.prototype.showActorStatus = function(index, duration) {
  // Set Default Duration
  if (duration === undefined) { duration = 15; };
  var obj = this._statusWindow._statusWindows[index];
  var data = { obj: obj, properties: ['y', 'contentsOpacity'], from: {y: obj.y, contentsOpacity: obj.contentsOpacity}, to: {y: -obj.height, contentsOpacity: 255}, durations: {y: duration, contentsOpacity: duration}}
  data.easing = Object_Movement.easeOutCirc;
  this.move.startMove(data);
};
//=============================================================================
// * Show Information Window (Help, Items)
//=============================================================================
Scene_OmoMenuBase.prototype.showInfoWindow = function(obj, duration) {
  // Create Movement Data
  var data = {
    obj: obj,
    properties: ['x', 'width'],
    from: {x: obj.x, width: obj.width},
    to: {x: 165, width: Graphics.width - 175},
    speeds: {},
  };
  data.speeds.x = Math.abs(data.from.x - data.to.x) / duration;
  data.speeds.width = Math.abs(data.from.width - data.to.width) / duration;
  // Start Move
  this.move.startMove(data);
};
//=============================================================================
// * Hide Information Window (Help, Items)
//=============================================================================
Scene_OmoMenuBase.prototype.hideInfoWindow = function(obj, duration) {
  // Create Movement Data
  let win_x = 10
  var data = {
    obj: obj,
    properties: ['x', 'width'],
    from: {x: obj.x, width: obj.width},
    to: {x: win_x, width: 0},
    speeds: {},
  };
  data.speeds.x = Math.abs(data.from.x - data.to.x) / duration;
  data.speeds.width = Math.abs(data.from.width - data.to.width) / duration;
  // Start Move
  this.move.startMove(data);
};
//=============================================================================
// * Show Help Window
//=============================================================================
Scene_OmoMenuBase.prototype.showHelpWindow = function(duration) {
  // Set Default Duration
  if (duration === undefined) { duration = 15; };
  // Show Help Window
  this.showInfoWindow(this._helpWindow, duration);
};
//=============================================================================
// * Hide Help Window
//=============================================================================
Scene_OmoMenuBase.prototype.hideHelpWindow = function(duration) {
  // Set Default Duration
  if (duration === undefined) { duration = 15; };
  // Show Help Window
  this.hideInfoWindow(this._helpWindow, duration);
};
//=============================================================================
// * Item
//=============================================================================
Scene_OmoMenuBase.prototype.item = function() { return this._itemWindow.item(); };
//=============================================================================
// * User
//=============================================================================
Scene_OmoMenuBase.prototype.user = function() { return null; };
//=============================================================================
// * Use Item
//=============================================================================
Scene_OmoMenuBase.prototype.useItem = function() {
  this.playSeForItem();
  this.user().useItem(this.item());
  this.applyItem();
  this._statusWindow.refresh();
  this.checkCommonEvent();
  this.checkGameover();
};
//=============================================================================
// * Determine if Item is for all
//=============================================================================
Scene_OmoMenuBase.prototype.isItemForAll = function() {
  var action = new Game_Action(this.user());
  action.setItemObject(this.item());
  return action.isForAll();
};
//=============================================================================
// * Item Target Actors
//=============================================================================
Scene_OmoMenuBase.prototype.itemTargetActors = function() {
  var action = new Game_Action(this.user());
  action.setItemObject(this.item());
  // Get Party from status window
  var party = this._statusWindow.party();
  // If Action is not for friend
  if (!action.isForFriend()) {
    return [];
  } else if (action.isForAll()) {
    return party;
  } else {
    return [this._statusWindow.actor()];
  };
};
//=============================================================================
// * Determine if Item can be used
//=============================================================================
Scene_OmoMenuBase.prototype.canUse = function(targets) {
  if(!this.user()) {return false}
  return this.user().canUse(this.item()) && this.isItemEffectsValid(targets);
};
//=============================================================================
// * Determine if item effects are valid
//=============================================================================
Scene_OmoMenuBase.prototype.isItemEffectsValid = function(targets) {
  var action = new Game_Action(this.user());
  action.setItemObject(this.item());
  // If Targets is undefined
  if (targets === undefined) { targets = this.itemTargetActors(); };
  return targets.some(function(target) { return action.testApply(target); }, this);
};
//=============================================================================
// * Apply Item
//=============================================================================
Scene_OmoMenuBase.prototype.applyItem = function() {
  var action = new Game_Action(this.user());
  action.setItemObject(this.item());
  this.itemTargetActors().forEach(function(target) {
    for (var i = 0; i < action.numRepeats(); i++) {
      action.apply(target);
    }
  }, this);
  action.applyGlobal();
};
//=============================================================================
// * Check Common Event
//=============================================================================
Scene_OmoMenuBase.prototype.checkCommonEvent = function () {
  // If Common Event is reserved
  if ($gameTemp.isCommonEventReserved()) {
    // Get Common Event Name
    var commonEvent = $gameTemp.reservedCommonEvent()
    // If common event name has BATTLEONLY tag
    if ($gameTemp.isCommonEventForBattleOnly()) {
      // Clear Common Event
      $gameTemp.clearCommonEvent();
    } else {
      // Go to Scene Map
      SceneManager.goto(Scene_Map);
    };
  };
};
















































// //=============================================================================
// // ** Scene_OmoMenuItem
// //-----------------------------------------------------------------------------
// // The scene class of the item menu.
// //=============================================================================
// function Scene_OmoMenuItem() { this.initialize.apply(this, arguments); }
// Scene_OmoMenuItem.prototype = Object.create(Scene_OmoMenuBase.prototype);
// Scene_OmoMenuItem.prototype.constructor = Scene_OmoMenuItem;
// //=============================================================================
// // * Create
// //=============================================================================
// Scene_OmoMenuItem.prototype.create = function() {
//   // Super Call
//   Scene_OmoMenuBase.prototype.create.call(this);
//   // Create Windows
//   this.createCategoryWindow();
//   this.createItemListWindow();
//   this.createItemConfirmationWindow();
//   this.createItemTrashPromptWindow();
//   this.createPartyStatusWindow();
//   // Close Help Window
//   this._helpWindow.openness = 0;
// };
// //=============================================================================
// // * Create Category Window
// //=============================================================================
// Scene_OmoMenuItem.prototype.createCategoryWindow = function() {
//   // Create Item Category Window
//   this._itemCategoryWindow = new Window_OmoMenuItemCategory();
//   this._itemCategoryWindow.x = (Graphics.width - this._itemCategoryWindow.width) - 11;
//   this._itemCategoryWindow.y = 65;
//   this._itemCategoryWindow.setHandler('ok', this.onItemCategoryOk.bind(this));
//   this._itemCategoryWindow.setHandler('cancel', this.popScene.bind(this));
//   this.addChild(this._itemCategoryWindow);
// };
// //=============================================================================
// // * Create Item List Window
// //=============================================================================
// Scene_OmoMenuItem.prototype.createItemListWindow = function() {
//   // Create Item List Window
//   this._itemListWindow = new Window_OmoMenuItemList();
//   this._itemListWindow.x = (Graphics.width - this._itemListWindow.width) - 11;
//   this._itemListWindow.y = (this._itemCategoryWindow.y + this._itemCategoryWindow.height)
//   this._itemListWindow.setHandler('ok', this.onItemListOk.bind(this));
//   this._itemListWindow.setHandler('cancel', this.onItemListCancel.bind(this));
//   this._itemListWindow.setHelpWindow(this._helpWindow);
//   this._itemCategoryWindow._itemWindow = this._itemListWindow;
//   this._itemCategoryWindow.callUpdateHelp();
//   this.addChild(this._itemListWindow);
// };
// //=============================================================================
// // * Create Item Confirmation Window
// //=============================================================================
// Scene_OmoMenuItem.prototype.createItemConfirmationWindow = function() {
//   // Create Item Confirmation Window
//   this._itemComfirmationWindow = new Window_OmoMenuItemConfirmation();
//   this._itemComfirmationWindow.x = (this._itemListWindow.x - this._itemComfirmationWindow.width);
//   this._itemComfirmationWindow.y = this._itemCategoryWindow.y
//   this._itemComfirmationWindow.setHandler('use', this.onItemConfirmationUse.bind(this));
//   this._itemComfirmationWindow.setHandler('trash', this.onItemConfirmationTrash.bind(this));
//   this._itemComfirmationWindow.setHandler('cancel', this.onItemConfirmationCancel.bind(this));
//   this.addChild(this._itemComfirmationWindow);
// };
// //=============================================================================
// // * Create Item Trash Prompt Window
// //=============================================================================
// Scene_OmoMenuItem.prototype.createItemTrashPromptWindow = function() {
//   // Create Item Trash Prompt Window
//   this._itemTrashPromptWindow = new Window_OmoMenuItemTrashPromptWindow();
//   this._itemTrashPromptWindow.x = this._itemComfirmationWindow.x;
//   this._itemTrashPromptWindow.y = (this._itemComfirmationWindow.y + this._itemComfirmationWindow.height);
//   this._itemTrashPromptWindow.setHandler('ok', this.onItemTrashPromptOk.bind(this));
//   this._itemTrashPromptWindow.setHandler('cancel', this.onItemTrashPromptCancel.bind(this));
//   this.addChild(this._itemTrashPromptWindow);
// };
// //=============================================================================
// // * Create Party Status Window
// //=============================================================================
// Scene_OmoMenuItem.prototype.createPartyStatusWindow = function() {
//   // Create Party Status Window
//   this._partyStatusWindow = new Window_OmoMenuItemPartyStatus();
//   this._partyStatusWindow.x = this._itemListWindow.x - this._partyStatusWindow.width;
//   this._partyStatusWindow.y = (this._itemComfirmationWindow.y + this._itemComfirmationWindow.height);
//   this._partyStatusWindow.setHandler('ok', this.onItemUseOk.bind(this));
//   this._partyStatusWindow.setHandler('cancel', this.onItemUseCancel.bind(this));
//   this.addChild(this._partyStatusWindow);
// };
// //=============================================================================
// // * Get Item
// //=============================================================================
// Scene_OmoMenuItem.prototype.item = function() { return this._itemListWindow.item(); };
// //=============================================================================
// // * Get Item User
// //=============================================================================
// Scene_OmoMenuItem.prototype.user = function() {
//   var members = $gameParty.movableMembers();
//   var bestActor = members[0];
//   var bestPha = 0;
//   for (var i = 0; i < members.length; i++) {
//     if (members[i].pha > bestPha) {
//       bestPha = members[i].pha;
//       bestActor = members[i];
//     };
//   };
//   // Return best actor
//   return bestActor;
// };
// //=============================================================================
// // * Get Item Target Items
// //=============================================================================
// Scene_OmoMenuItem.prototype.itemTargetActors = function() {
//   var action = new Game_Action(this.user());
//   action.setItemObject(this.item());
//   if (!action.isForFriend()) {
//     return [];
//   } else if (action.isForAll()) {
//     return $gameParty.members();
//   } else {
//     return [this._partyStatusWindow.actor()];
//   }
// };

// //=============================================================================
// // * Item Category - Ok
// //=============================================================================
// Scene_OmoMenuItem.prototype.onItemCategoryOk = function() {
//   this._itemListWindow.open();
//   this._itemListWindow.activate();
//   this._itemListWindow.select(0)
//   this._helpWindow.open();
// };
// //=============================================================================
// // * Item List - Ok
// //=============================================================================
// Scene_OmoMenuItem.prototype.onItemListOk = function() {
//   this._itemComfirmationWindow.open();
//   this._itemComfirmationWindow.select(0);
//   this._itemComfirmationWindow.setItem(this._itemListWindow.item());
//   this._itemComfirmationWindow.activate();
// };
// //=============================================================================
// // * Item List - Cancel
// //=============================================================================
// Scene_OmoMenuItem.prototype.onItemListCancel = function() {
//   this._itemListWindow.close();
//   this._helpWindow.close();
//   this._itemCategoryWindow.activate();
//   this._itemCategoryWindow.refresh();
// };
// //=============================================================================
// // * Item Confirmation - Use
// //=============================================================================
// Scene_OmoMenuItem.prototype.onItemConfirmationUse = function() {
//   this._partyStatusWindow.open();
//   this._partyStatusWindow.refresh();
//   this._partyStatusWindow.select(0)
//   this._partyStatusWindow.activate();
// };
// //=============================================================================
// // * Item Confirmation - Trash
// //=============================================================================
// Scene_OmoMenuItem.prototype.onItemConfirmationTrash = function() {
//   this._itemTrashPromptWindow.open();
//   this._itemTrashPromptWindow.select(1);
//   this._itemTrashPromptWindow.activate();
// };
// //=============================================================================
// // * Item Confirmation - Cancel
// //=============================================================================
// Scene_OmoMenuItem.prototype.onItemConfirmationCancel = function() {

//   this._itemComfirmationWindow.close();
//   this._itemListWindow.refresh();

//   // Get Item Count
//   var itemCount = this._itemListWindow.maxItems();

//   // If Item count is more than 0
//   if (itemCount > 0) {
//     this._itemListWindow.activate();
//     this._itemListWindow.selectAvailable();
//   } else {
//     this._itemTrashPromptWindow.close();
//     this._itemComfirmationWindow.close();
//     this._itemListWindow.close();
//     this._itemCategoryWindow.refresh();
//     this._itemCategoryWindow.activate();
//     this._helpWindow.close();
//   };
// };
// //=============================================================================
// // * Item Trash Prompt - Ok
// //=============================================================================
// Scene_OmoMenuItem.prototype.onItemTrashPromptOk = function() {
//   // Get Item
//   var item = this.item();
//   // Lose Item
//   $gameParty.loseItem(item, 1, false);
//   // If there's no items left
//   if ($gameParty.numItems(item) <= 0) {
//     this._itemTrashPromptWindow.close();
//     this._itemComfirmationWindow.close();
//     this._itemListWindow.refresh()
//     // Get Item Count
//     var itemCount = this._itemListWindow.maxItems();
//     // If Item count is more than 0
//     if (itemCount > 0) {
//       this._itemListWindow.activate();
//       this._itemListWindow.selectAvailable()
//     } else {
//       this._itemTrashPromptWindow.close();
//       this._itemComfirmationWindow.close();
//       this._itemListWindow.close();
//       this._itemCategoryWindow.refresh();
//       this._itemCategoryWindow.activate();
//       this._helpWindow.close();
//     };
//   } else {
//     this._itemListWindow.redrawCurrentItem();
//     this._itemTrashPromptWindow.close();
//     this._itemComfirmationWindow.activate();
//   };
// };
// //=============================================================================
// // * Item Trash Prompt - Cancel
// //=============================================================================
// Scene_OmoMenuItem.prototype.onItemTrashPromptCancel = function() {
//   this._itemTrashPromptWindow.close();
//   this._itemComfirmationWindow.activate();
// };
// //=============================================================================
// // * On Item Use OK
// //=============================================================================
// Scene_OmoMenuItem.prototype.onItemUseOk = function() {
//   // Get Item
//   var item = this.item();
//   // If Player Can use Item
//   if (this.canUse()) {
//     // Use Item
//     this.useItem();
//     this._itemListWindow.redrawCurrentItem();
//   } else {
//     SoundManager.playBuzzer();
//   };

//   // $gameParty.setLastItem(this.item());
//   // this.determineItem();

//    this._partyStatusWindow.activate();
// };
// //=============================================================================
// // * On Item Use Cancel
// //=============================================================================
// Scene_OmoMenuItem.prototype.onItemUseCancel = function() {
//   this._partyStatusWindow.close();
//   this._itemComfirmationWindow.activate()
// };
// //=============================================================================
// // * Determine item
// //=============================================================================
// Scene_OmoMenuItem.prototype.determineItem = function() {
//   var action = new Game_Action(this.user());
//   var item = this.item();
//   action.setItemObject(item);

//   if (action.needsSelection()) {

//   };

//   if (action.isForFriend()) {
//     this.showSubWindow(this._actorWindow);
//     this._actorWindow.selectForItem(this.item());
//   } else {
//     this.useItem();
//     this.activateItemWindow();
//   }
// };
// //=============================================================================
// // * Determine if item can be used
// //=============================================================================
// Scene_OmoMenuItem.prototype.canUse = function() {
//   return this.user().canUse(this.item()) && this.isItemEffectsValid();
// };
// //=============================================================================
// // * Determine if item effects are valid
// //=============================================================================
// Scene_OmoMenuItem.prototype.isItemEffectsValid = function() {
//   var action = new Game_Action(this.user());
//   action.setItemObject(this.item());
//   return this.itemTargetActors().some(function(target) {
//     return action.testApply(target);
//   }, this);
// };
// //=============================================================================
// // * Use Item
// //=============================================================================
// Scene_OmoMenuItem.prototype.useItem = function() {
//   SoundManager.playUseItem();
//   this.user().useItem(this.item());
//   this.applyItem();
//   this.checkCommonEvent();
//   this.checkGameover();
//   this._partyStatusWindow.refresh();
// };
// //=============================================================================
// // * Apply Item
// //=============================================================================
// Scene_OmoMenuItem.prototype.applyItem = function() {
//     var action = new Game_Action(this.user());
//     action.setItemObject(this.item());
//     this.itemTargetActors().forEach(function(target) {
//       for (var i = 0; i < action.numRepeats(); i++) {
//         action.apply(target);
//       }
//     }, this);
//     action.applyGlobal();
// };
// //=============================================================================
// // * Check Common Event
// //=============================================================================
// Scene_OmoMenuItem.prototype.checkCommonEvent = function() {
//   if ($gameTemp.isCommonEventReserved()) {
//     SceneManager.goto(Scene_Map);
//   }
// };



// //=============================================================================
// // ** Window_OmoMenuItemCategory
// //-----------------------------------------------------------------------------
// // The window for selecting item categories in the item menu
// //=============================================================================
// function Window_OmoMenuItemCategory() { this.initialize.apply(this, arguments); }
// Window_OmoMenuItemCategory.prototype = Object.create(Window_Command.prototype);
// Window_OmoMenuItemCategory.prototype.constructor = Window_OmoMenuItemCategory;
// //=============================================================================
// // * Settings
// //=============================================================================
// Window_OmoMenuItemCategory.prototype.isUsingCustomCursorRectSprite = function() { return true; };
// Window_OmoMenuItemCategory.prototype.standardPadding = function() { return 10; }
// Window_OmoMenuItemCategory.prototype.windowWidth = function() { return 383; }
// Window_OmoMenuItemCategory.prototype.maxCols = function() { return 3; };
// Window_OmoMenuItemCategory.prototype.lineHeight = function() { return 24; };
// Window_OmoMenuItemCategory.prototype.standardFontSize = function() { return 20; };
// Window_OmoMenuItemCategory.prototype.textPadding = function () { return 14; };
// Window_OmoMenuItemCategory.prototype.spacing = function() { return 0; };
// //=============================================================================
// // * Make Command List
// //=============================================================================
// Window_OmoMenuItemCategory.prototype.makeCommandList = function() {
//   this.addCommand('CONSUMABLES', 'consumables', $gameParty.hasConsumableItems());
//   this.addCommand('TOYS', 'toys', $gameParty.hasToyItems());
//   this.addCommand('IMPORTANT', 'important', $gameParty.hasKeyItems());
// };
// //=============================================================================
// // * Item Rect
// //=============================================================================
// Window_OmoMenuItemCategory.prototype.itemRect = function(index) {
//   // Get rect
//   var rect = Window_Command.prototype.itemRect.call(this, index);
//   rect.width += 20;
//   // If Index 1 (For Visual centering)
//   if (index === 1) { rect.x += 20 };
//   // Return Rect
//   return rect;
// };
// //=============================================================================
// // * Call Update Help
// //=============================================================================
// Window_OmoMenuItemCategory.prototype.callUpdateHelp = function() {
//   // Run Original Function
//   Window_Command.prototype.callUpdateHelp.call(this);
//   if (this.active && this._itemWindow) {
//     // Set Item Window Category
//     this._itemWindow.setCategory(this.currentSymbol());
//   };
// };




// //=============================================================================
// // ** Window_OmoMenuItemConfirmation
// //-----------------------------------------------------------------------------
// // The window for selection actions to perform for items in the item menu.
// //=============================================================================
// function Window_OmoMenuItemConfirmation() { this.initialize.apply(this, arguments); }
// Window_OmoMenuItemConfirmation.prototype = Object.create(Window_Command.prototype);
// Window_OmoMenuItemConfirmation.prototype.constructor = Window_OmoMenuItemConfirmation;
// //=============================================================================
// // * Object Initialization
// //=============================================================================
// Window_OmoMenuItemConfirmation.prototype.initialize = function() {
//   // Super Call
//   Window_Command.prototype.initialize.call(this, 0, 0);
//   this.deactivate();
//   this.openness = 0;
//   // Set Item to null
//   this.setItem(null);
// };
// //=============================================================================
// // * Settings
// //=============================================================================
// Window_OmoMenuItemConfirmation.prototype.isUsingCustomCursorRectSprite = function() { return true; };
// Window_OmoMenuItemConfirmation.prototype.standardPadding = function() { return 10; }
// Window_OmoMenuItemConfirmation.prototype.windowWidth = function() { return 125; }
// Window_OmoMenuItemConfirmation.prototype.lineHeight = function() { return 24; };
// Window_OmoMenuItemConfirmation.prototype.standardFontSize = function() { return 20; };
// Window_OmoMenuItemConfirmation.prototype.textPadding = function () { return 14; };
// Window_OmoMenuItemConfirmation.prototype.spacing = function() { return 0; };
// //=============================================================================
// // * Set Item
// //=============================================================================
// Window_OmoMenuItemConfirmation.prototype.setItem = function(item) {
//   // Set Item
//   if (item !== this._item) { this._item = item; this.refresh(); }
// };
// //=============================================================================
// // * Make Command List
// //=============================================================================
// Window_OmoMenuItemConfirmation.prototype.makeCommandList = function() {
//   // Get Item
//   var item = this._item;
//   var enableUse   = item ? $gameParty.canUse(item) : false;
//   var enableTrash = item ? !DataManager.isKeyItem(item) : false;
//   this.addCommand('USE', 'use', enableUse);
//   this.addCommand('TRASH', 'trash', enableTrash);
// };




// //=============================================================================
// // ** Window_OmoMenuItemTrashPromptWindow
// //-----------------------------------------------------------------------------
// // This Window is used to show a prompt for trashing items
// //=============================================================================
// function Window_OmoMenuItemTrashPromptWindow() { this.initialize.apply(this, arguments); }
// Window_OmoMenuItemTrashPromptWindow.prototype = Object.create(Window_Command.prototype);
// Window_OmoMenuItemTrashPromptWindow.prototype.constructor = Window_OmoMenuItemTrashPromptWindow;
// //=============================================================================
// // * Initialize Object
// //=============================================================================
// Window_OmoMenuItemTrashPromptWindow.prototype.initialize = function() {
//   // Super Call
//   Window_Command.prototype.initialize.call(this, 0, 0);
//   // Prompt Text
//   this._promptText = 'ARE YOU SURE?';
//   // Refresh Contents
//   this.refresh();
//   this.openness = 0;
//   this.deactivate();
// };
// //=============================================================================
// // * Settings
// //=============================================================================
// Window_OmoMenuItemTrashPromptWindow.prototype.isUsingCustomCursorRectSprite = function() { return true; };
// Window_OmoMenuItemTrashPromptWindow.prototype.windowHeight   = function() { return 84; };
// Window_OmoMenuItemTrashPromptWindow.prototype.windowWidth    = function() { return 125; };
// Window_OmoMenuItemTrashPromptWindow.prototype.maxCols = function() { return 1; };
// Window_OmoMenuItemTrashPromptWindow.prototype.spacing = function() { return 0; };
// Window_OmoMenuItemTrashPromptWindow.prototype.standardPadding = function() { return 0; };
// Window_OmoMenuItemTrashPromptWindow.prototype.itemHeight = function() { return 20; };
// Window_OmoMenuItemTrashPromptWindow.prototype.standardFontSize = function() { return 20; };
// //=============================================================================
// // * Make Command List
// //=============================================================================
// Window_OmoMenuItemTrashPromptWindow.prototype.makeCommandList = function() {
//   this.addCommand('YES',  'yes');
//   this.addCommand('NO',  'cancel');
// };
// //=============================================================================
// // * Refresh
// //=============================================================================
// Window_OmoMenuItemTrashPromptWindow.prototype.refresh = function() {
//   // Super Call
//   Window_Command.prototype.refresh.call(this);
//   this.drawText(this._promptText, 0, 0, this.contents.width, 'center');
// };
// //=============================================================================
// // * Get Item Rect
// //=============================================================================
// Window_OmoMenuItemTrashPromptWindow.prototype.itemRect = function(index) {
//   var rect = Window_Command.prototype.itemRect.call(this, index);
//   rect.x += 10;
//   rect.y += this.lineHeight() - 5;
//   return rect;
// };
// //=============================================================================
// // * Get Item Rect For Text
// //=============================================================================
// Window_OmoMenuItemTrashPromptWindow.prototype.itemRectForText = function(index) {
//   var rect = this.itemRect(index);
//   rect.x += this.textPadding() + 40;
//   rect.y -= 10;
//   rect.width -= this.textPadding() * 2;
//   return rect;
// };



// //=============================================================================
// // ** Window_OmoMenuItemPartyStatus
// //-----------------------------------------------------------------------------
// // The window is for selecting party members in the item scene.
// //=============================================================================
// function Window_OmoMenuItemPartyStatus() { this.initialize.apply(this, arguments); }
// Window_OmoMenuItemPartyStatus.prototype = Object.create(Window_Selectable.prototype);
// Window_OmoMenuItemPartyStatus.prototype.constructor = Window_OmoMenuItemPartyStatus;
// //=============================================================================
// // * Object Initialization
// //=============================================================================
// Window_OmoMenuItemPartyStatus.prototype.initialize = function() {
//   // Header Text
//   this._headerText = 'USE ON WHO?';
//   // Super Call
//   Window_Selectable.prototype.initialize.call(this, 0, 0, this.windowWidth(), this.windowHeight());
//   // Refresh
//   this.refresh();
//   this.deselect()
//   this.deactivate();
//   this.openness = 0;
// };
// //=============================================================================
// // * Settings
// //=============================================================================
// Window_OmoMenuItemPartyStatus.prototype.isUsingCustomCursorRectSprite = function() { return true; };
// Window_OmoMenuItemPartyStatus.prototype.standardPadding = function() { return 0 }
// Window_OmoMenuItemPartyStatus.prototype.windowWidth = function() { return 224 }
// Window_OmoMenuItemPartyStatus.prototype.windowHeight = function() { return 38 + (this.maxItems() * this.itemHeight()); }
// Window_OmoMenuItemPartyStatus.prototype.maxItems = function() { return $gameParty.members().length; }
// Window_OmoMenuItemPartyStatus.prototype.maxCols = function() { return 1; };
// Window_OmoMenuItemPartyStatus.prototype.itemHeight = function() { return 24; };
// Window_OmoMenuItemPartyStatus.prototype.spacing = function() { return 0; };
// Window_OmoMenuItemPartyStatus.prototype.textPadding = function() { return 22; };
// Window_OmoMenuItemPartyStatus.prototype.customCursorRectYOffset = function() { return 2; }
// Window_OmoMenuItemPartyStatus.prototype.playOkSound = function() { };
// //=============================================================================
// // * Get Item Rect
// //=============================================================================
// Window_OmoMenuItemPartyStatus.prototype.itemRect = function(index) {
//   // Get Item Rect
//   var rect = Window_Selectable.prototype.itemRect.call(this, index);
//   rect.y += 24
//   // Return rect
//   return rect;
// };
// //=============================================================================
// // * Get Actor At index
// //=============================================================================
// Window_OmoMenuItemPartyStatus.prototype.actor = function(index) {
//   // Get Index
//   if (index === undefined) { index = this.index(); };
//   // Return Party Member
//   return $gameParty.members()[index];
// };
// //=============================================================================
// // * Refresh
// //=============================================================================
// Window_OmoMenuItemPartyStatus.prototype.refresh = function() {
//   // Run Original Function
//   Window_Selectable.prototype.refresh.call(this);
//   // Draw Headers
//   this.contents.fontSize = 18;
//   this.drawText(this._headerText, 8, -5, 200);
// };
// //=============================================================================
// // * Draw Item
// //=============================================================================
// Window_OmoMenuItemPartyStatus.prototype.drawItem = function(index) {
//   // Get Rect
//   var rect = this.itemRectForText(index);
//   // Get Actor
//   var actor = this.actor(index);
//   // If Actor Exists
//   if (actor) {
//     // Set Font Size
//     this.contents.fontSize = 24;
//     // Draw Text
//     this.contents.drawText(actor.name(), rect.x, rect.y, rect.width, rect.height);
//     this.drawShortActorHP(actor, rect.x + 75, rect.y + 7)
//     this.drawShortActorMP(actor, rect.x + 125, rect.y + 7)
//   };
// };



// //=============================================================================
// // ** Window_OmoMenuItemList
// //-----------------------------------------------------------------------------
// // The window for selecting equipment for an actor
// //=============================================================================
// function Window_OmoMenuItemList() { this.initialize.apply(this, arguments); }
// Window_OmoMenuItemList.prototype = Object.create(Window_ItemList.prototype);
// Window_OmoMenuItemList.prototype.constructor = Window_OmoMenuItemList;
// //=============================================================================
// // * Object Initialization
// //=============================================================================
// Window_OmoMenuItemList.prototype.initialize = function() {
//   // Super Call
//   Window_ItemList.prototype.initialize.call(this, 0, 0, this.windowWidth(), this.windowHeight());
//   // Set Category
//   this.setCategory('consumables');
//   this.deselect(0)
//   this.deactivate()
//   this.openness = 0;
// };
// //=============================================================================
// // * Settings
// //=============================================================================
// Window_OmoMenuItemList.prototype.isUsingCustomCursorRectSprite = function() { return true; };
// Window_OmoMenuItemList.prototype.standardPadding = function() { return 4;}
// Window_OmoMenuItemList.prototype.windowWidth = function() { return 383; }
// Window_OmoMenuItemList.prototype.windowHeight = function() { return 144; }
// Window_OmoMenuItemList.prototype.maxCols = function() { return 2; };
// Window_OmoMenuItemList.prototype.itemHeight = function() { return 28; };
// Window_OmoMenuItemList.prototype.itemWidth = function() { return 165; };
// Window_OmoMenuItemList.prototype.spacing = function() { return 14; };
// Window_OmoMenuItemList.prototype.customCursorRectXOffset = function() { return -2; }
// Window_OmoMenuItemList.prototype.isEnabled = function() { return true; };
// //=============================================================================
// // * Set Category
// //=============================================================================
// Window_OmoMenuItemList.prototype.setCategory = function(category) {
//   // If
//   if (this._category !== category) {
//     this._category = category;
//     this.refresh();
//   };
// };
// //=============================================================================
// // * Determine if item should be included
// //=============================================================================
// Window_OmoMenuItemList.prototype.includes = function(item) {
//   // If Item Exists and it's an item
//   if (item && DataManager.isItem(item)) {
//     switch (this._category) {
//     case 'consumables': return DataManager.isConsumableItem(item);
//     case 'toys':        return DataManager.isToyItem(item);
//     case 'important':   return DataManager.isKeyItem(item);
//     };
//   };
//   return false;
// };
// //=============================================================================
// // * Get Item Rect
// //=============================================================================
// Window_OmoMenuItemList.prototype.itemRect = function(index) {
//   // Get Item Rect
//   var rect = Window_ItemList.prototype.itemRect.call(this, index);
//   // Adjust Rect
//   rect.x += 12;
//   rect.y += 8;
//   // Return rect
//   return rect;
// };
// //=============================================================================
// // * Refresh Arrows
// //=============================================================================
// Window_OmoMenuItemList.prototype._refreshArrows = function() {
//   // Super Call
//   Window_ItemList.prototype._refreshArrows.call(this);
//   var w = this._width;
//   var h = this._height;
//   var p = 24;
//   var q = p/2;
//   this._downArrowSprite.move(w - q, h - q);
//   this._upArrowSprite.move(w - q, q);
// };
// //=============================================================================
// // * Clear Item
// //=============================================================================
// Window_OmoMenuItemList.prototype.clearItem = function(index) {
//   var rect = this.itemRect(index);
//   this.contents.clearRect(rect.x, rect.y, rect.width + 5, rect.height);
// };
// //=============================================================================
// // * Draw Item
// //=============================================================================
// Window_OmoMenuItemList.prototype.drawItem = function(index) {
//   // Get Rect
//   var rect = this.itemRectForText(index);
//   // Get Item
//   var item = this._data[index]
//   // If Item
//   if (item) {
//     // Set Font Size
//     this.contents.fontSize = 20;
//     rect.width -= 20;
//     // Draw Text
//     this.contents.drawText(item.name, rect.x, rect.y, rect.width, rect.height);
//     rect.width += 20
//     this.contents.drawText('x' + $gameParty.numItems(item), rect.x + rect.width - 18, rect.y, rect.width, rect.height);
//   };
// };
