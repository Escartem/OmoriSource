//=============================================================================
// TDS Omori Name Input
// Version: 1.0
//=============================================================================
// Add to Imported List
var Imported = Imported || {} ; Imported.TDS_NameInput = true;
// Initialize Alias Object
var _TDS_ = _TDS_ || {} ; _TDS_.NameInput = _TDS_.NameInput || {};
//=============================================================================
 /*:
 * @plugindesc
 * Name Input for OMORI
 *
 * @param Name Variable ID
 * @desc Variable ID to put the name text into.
 * @default 1
 *
 * @author TDS
 *
 * @help
 * ============================================================================
 * * Script Calls
 * ============================================================================
 *
 *
 *
 */
//=============================================================================
// Node.js path
var path = require('path');
// Get Parameters
var parameters = PluginManager.parameters("Omori Name Input");
// Initialize Parameters
_TDS_.NameInput.params = {};
_TDS_.NameInput.params.nameVariableID = Number(parameters['Name Variable ID'] || 0);


//=============================================================================
// ** Keyboard Input
//-----------------------------------------------------------------------------
// The static class that handles input data from the keyboard.
//=============================================================================
function KeyboardInput() { throw new Error('This is a static class'); }
//=============================================================================
// * Class Values
//=============================================================================
KeyboardInput.keyRepeatWait = 24;
KeyboardInput.keyRepeatInterval = 6;
//=============================================================================
// * Key Mapper
//=============================================================================
KeyboardInput.keyMapper = {
  8:  'backspace',
  13: 'enter',
//  16: 'shift',
  32: 'space',
  46: 'delete',
};
//=============================================================================
// * Object Initialization
//=============================================================================
KeyboardInput.initialize = function() {
  this.clear();
  this._wrapNwjsAlert();
  this._setupEventHandlers();
  // Set Caps Lock Flag
  this._capsLock = false;
};
//=============================================================================
// * Clear
//=============================================================================
KeyboardInput.clear = function() {
  this._keyDown = false;
  this._currentState = {};
  this._previousState = {};
  this._currentEvents = {};
  this._latestButton = null;
  this._latestEvent = null;
  this._pressedTime = 0;
  this._date = 0;
};
//=============================================================================
// * Setup Event Handlers
//=============================================================================
KeyboardInput._setupEventHandlers = function() {
  document.addEventListener('keydown', this._onKeyDown.bind(this));
  document.addEventListener('keyup', this._onKeyUp.bind(this));
  window.addEventListener('blur', this._onLostFocus.bind(this));
};
//=============================================================================
// * Frame Update
//=============================================================================
KeyboardInput.update = function() {
  if (this._currentState[this._latestButton]) {
    this._pressedTime++;
  } else {
    this._latestButton = null;
    this._latestEvent = null;
  }
  for (var name in this._currentState) {
    if (this._currentState[name] && !this._previousState[name]) {
      this._latestButton = name;
      this._latestEvent = this._currentEvents[name];
      this._pressedTime = 0;
      this._date = Date.now();
    };
    this._previousState[name] = this._currentState[name];
  };
};
//=============================================================================
// * Wrap NWjs Alert
//=============================================================================
KeyboardInput._wrapNwjsAlert = function() {
  if (Utils.isNwjs()) {
    var _alert = window.alert;
    window.alert = function() {
      var gui = require('nw.gui');
      var win = gui.Window.get();
      _alert.apply(this, arguments);
      win.focus();
      KeyboardInput.clear();
    };
  }
};
//=============================================================================
// * Determine if Default Should be prevented
//=============================================================================
KeyboardInput._shouldPreventDefault = function(keyCode) {
  switch (keyCode) {
  case 33:    // pageup
  case 34:    // pagedown
  case 37:    // left arrow
  case 38:    // up arrow
  case 39:    // right arrow
  case 40:    // down arrow
    return true;
  };
  return false;
};
//=============================================================================
// * On Key Down
//=============================================================================
KeyboardInput._onKeyDown = function(event) {
  // Set Caps Lock State
  this._capsLock = event.getModifierState('CapsLock');
  if (this._shouldPreventDefault(event.keyCode)) {
    event.preventDefault();
  };
  // Get Mapped
  var mapped = KeyboardInput.keyMapper[event.keyCode];
  // Get Button Name
  var buttonName = mapped ? mapped : String.fromCharCode(event.keyCode);
  // String.fromCharCode()
  // If Button Name Exists
  if (buttonName) {
    // Set Current Events
    this._currentEvents[buttonName] = event;
    // Set Button Name Curent State
    this._currentState[buttonName] = true;
  };
};
//=============================================================================
// * On Key Up
//=============================================================================
KeyboardInput._onKeyUp = function(event) {
  // Set Caps Lock State
  this._capsLock = event.getModifierState('CapsLock');
  // Get Mapped
  var mapped = KeyboardInput.keyMapper[event.keyCode];
  // Get Button Name
  var buttonName = mapped ? mapped : String.fromCharCode(event.keyCode);
  // If Button Name Exists
  if (buttonName) {
    // Set Button Name Curent State
    this._currentState[buttonName] = false;
  }
  if (event.keyCode === 0) {  // For QtWebEngine on OS X
    this.clear();
  };
};
//=============================================================================
// * On Lost Focus
//=============================================================================
KeyboardInput._onLostFocus = function() { this.clear(); };
//=============================================================================
// * Determine if Caps Lock is on
//=============================================================================
KeyboardInput.isCapsLockOn = function() { return this._capsLock; };
//=============================================================================
// * Is Triggered
//=============================================================================
KeyboardInput.isTriggered = function(keyName) {
  return this._latestButton === keyName && this._pressedTime === 0;
};
//=============================================================================
// * Is Repeated
//=============================================================================
KeyboardInput.isRepeated = function(keyName) {
  return (this._latestButton === keyName &&
          (this._pressedTime === 0 ||
           (this._pressedTime >= this.keyRepeatWait &&
            this._pressedTime % this.keyRepeatInterval === 0)));
};




//=============================================================================
// ** SceneManager
//-----------------------------------------------------------------------------
// The static class that manages scene transitions.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.NameInput.SceneManager_initInput       = SceneManager.initInput;
_TDS_.NameInput.SceneManager_updateInputData = SceneManager.updateInputData;
//=============================================================================
// * Initialize Input
//=============================================================================
SceneManager.initInput = function() {
  // Run Original Function
  _TDS_.NameInput.SceneManager_initInput.call(this);
  // Initialize Keyboard Input
  KeyboardInput.initialize();
};
//=============================================================================
// * Update Input Data
//=============================================================================
SceneManager.updateInputData = function() {
  // Run Original Function
  _TDS_.NameInput.SceneManager_updateInputData.call(this);
  // Update Keyboard Input
  KeyboardInput.update()
};



//=============================================================================
// ** Game_Interpreter
//-----------------------------------------------------------------------------
// The interpreter for running event commands.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.NameInput.Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
//=============================================================================
// * Show Name Input Window
//=============================================================================
Game_Interpreter.prototype.showNameInputWindows = function(name = "", max = 7, wait = true) {
  // Show Name Input Windows
  SceneManager._scene.showNameInputWindows(name, max);
  // Set Wait
  if (wait) { this.setWaitMode('nameInput'); };
};
//=============================================================================
// * Update Wait Mode
//=============================================================================
Game_Interpreter.prototype.updateWaitMode = function() {
  // If Wait mode is name input
  if (this._waitMode === 'nameInput') {
    if (SceneManager._scene.isInputWindowActive()) { return true; };
    return false;
  };
  // Return original function
  return _TDS_.NameInput.Game_Interpreter_updateWaitMode.call(this);
};



//=============================================================================
// ** Scene_Map
//-----------------------------------------------------------------------------
// The scene class of the map screen.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.NameInput.Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows
//=============================================================================
// * Create All Windows
//=============================================================================
Scene_Map.prototype.createAllWindows = function() {
  // Run Original Function
  _TDS_.NameInput.Scene_Map_createAllWindows.call(this);
  // Create Quest Windows
  this.createNameInputWindows();
};
//=============================================================================
// * Create Name Input Windows
//=============================================================================
Scene_Map.prototype.createNameInputWindows = function() {
  // Create Name Input Window
  this._nameInputNameWindow = new Window_OmoriNameInputName();
  this._nameInputNameWindow.x = 70;
  this._nameInputNameWindow.y = 60
  this.addWindow(this._nameInputNameWindow);
  // Create Name Input Letter Window
  /*this._nameInputLetterWindow = new Window_OmoriInputLetters()
  this._nameInputLetterWindow.x = 70;
  this._nameInputLetterWindow.y = this._nameInputNameWindow.y + this._nameInputNameWindow.height + 2;
  this._nameInputLetterWindow._nameWindow = this._nameInputNameWindow;
  this.addChild(this._nameInputLetterWindow);*/
  this._virtualKeyboard = new VirtualKeyboard()
  this._virtualKeyboard._nameWindow = this._nameInputNameWindow;
  this.addWindow(this._virtualKeyboard)
  this._virtualKeyboard.position.set(this._nameInputNameWindow.x,this._nameInputNameWindow.y + this._nameInputNameWindow.height)
};
//=============================================================================
// * Show Name Input Windows
//=============================================================================
Scene_Map.prototype.showNameInputWindows = function(name, max) {
  this._nameInputNameWindow._maxCharacters = max;
  this._nameInputNameWindow.width = this._nameInputNameWindow.windowWidth()
  this._nameInputNameWindow.createContents()
  this._nameInputNameWindow.refresh()
  this._nameInputNameWindow.clearName(name);
  this._nameInputNameWindow.open();
  /*this._nameInputLetterWindow.open();
  this._nameInputLetterWindow.activate();
  this._nameInputLetterWindow.select(0);*/
  this._virtualKeyboard.setup()
};
//=============================================================================
// * Hide Name Input Windows
//=============================================================================
Scene_Map.prototype.hideNameInputWindows = function() {
  this._nameInputNameWindow.close();
  this._nameInputNameWindow.deactivate();
  /*this._nameInputLetterWindow.close();
  this._nameInputLetterWindow.deactivate();*/
  this._virtualKeyboard.dispose()
};
//=============================================================================
// * Determine if Input Window is active
//=============================================================================
Scene_Map.prototype.isInputWindowActive = function() {
  return (this._nameInputNameWindow.openness > 0 || /*this._nameInputLetterWindow.active*/ this._virtualKeyboard.active)
};



//=============================================================================
// ** Window_OmoriNameInputName
//-----------------------------------------------------------------------------
// This window displays the typed name.
//=============================================================================
function Window_OmoriNameInputName() { this.initialize.apply(this, arguments); }
Window_OmoriNameInputName.prototype = Object.create(Window_Base.prototype);
Window_OmoriNameInputName.prototype.constructor = Window_OmoriNameInputName;
//=============================================================================
// * Initialize Object
//=============================================================================
Window_OmoriNameInputName.prototype.initialize = function(max) {
  // Set Max Characters
  this._maxCharacters = max === undefined ? 7 : max;
  // Super Call
  Window_Base.prototype.initialize.call(this, 12, 12, this.windowWidth(), this.windowHeight());
  this.openness = 0;
  this.deactivate();
  // Clear Name
  this.clearName('');
  // Draw Contents
  this.refresh();
};
//=============================================================================
// * Settings
//=============================================================================
Window_OmoriNameInputName.prototype.standardPadding = function() { return 4; };
Window_OmoriNameInputName.prototype.windowWidth = function() { return this._maxCharacters * 26; };
Window_OmoriNameInputName.prototype.windowHeight = function() { return 80; };
//=============================================================================
// * Openness Type (0: Vertical, 1: Horizontal, 2: All)
//=============================================================================
Window_OmoriNameInputName.prototype.standardOpennessType = function() { return 2;};
//=============================================================================
// * Refresh
//=============================================================================
Window_OmoriNameInputName.prototype.refresh = function() {
  // Clear Contents
  this.contents.clear();
  this.contents.fontSize = 23
  this.contents.drawText(LanguageManager.getMessageData("XX_BLUE.Omori_Name_Input").nameask, 0, 1, this.contents.width, this.contents.fontSize, 'center');
  this.contents.fillRect(0, 32, this.contents.width, 2, 'rgba(255, 255, 255, 1)');
  // Refresh Text
  this.refreshText();
};
//=============================================================================
// * Refresh
//=============================================================================
Window_OmoriNameInputName.prototype.clearName = function(name) {
  // Initialize Array
  this._text = [];
  // Get Letters
  var letters = name.split("");
  // Go Through Max Characters
  for (var i = 0; i < this._maxCharacters; i++) {
    // Get Letter
    var letter = letters[i];
    // Add Letter
    this._text.push(letter ? letter : " ");
  };
  // Set Text Index
  this._textIndex = Math.max(letters.length - 1, 0);
  // Refresh Text
  this.refreshText();
};
//=============================================================================
// * Get Current Inputted Name
//=============================================================================
Window_OmoriNameInputName.prototype.name = function() { return this._text.join("").trim(); };
//=============================================================================
// * Add Letter
//=============================================================================
Window_OmoriNameInputName.prototype.add = function(character) {
  if (this._textIndex < this._maxCharacters) {
    this._text[this._textIndex] = character;
    this._textIndex = Math.min(this._textIndex + 1, this._maxCharacters-1)
    this.refreshText()
    return true
  };
  return false;
};
//=============================================================================
// * Back
//=============================================================================
Window_OmoriNameInputName.prototype.back = function() {
  if (this._textIndex > -1) {
    this._text[this._textIndex] = '';
    this._textIndex = Math.max(this._textIndex - 1, 0);
    this.refreshText();
    return true
  };
  return false;
};
//=============================================================================
// * Refresh Text
//=============================================================================
Window_OmoriNameInputName.prototype.refreshText = function() {
  // Clear Rect
  this.contents.clearRect(0, 34, this.contents.width, this.contents.height - 34);
  this.contents.fontSize = 28
  // Space width
  var width = 20;
  // Go Through Text
  for (var i = 0; i < this._text.length; i++) {
    // Get Letter
    var letter = this._text[i];
    var x = 6 + (i * (width + 3));
    var y = 34
    this.contents.drawText(letter, x, y, width, this.contents.fontSize, 'center');
    this.contents.paintOpacity = this._textIndex === i ? 255 : 100;
    this.contents.fillRect(x, y + this.contents.fontSize + 4, width, 2, 'rgba(255, 255, 255, 1)');
    this.contents.paintOpacity = 255;
  };
};
























//=============================================================================
// ** Window_OmoriInputLetters
//-----------------------------------------------------------------------------
// This window handles drawing of pictures and selection.
//=============================================================================
function Window_OmoriInputLetters() { this.initialize.apply(this, arguments); }
Window_OmoriInputLetters.prototype = Object.create(Window_Selectable.prototype);
Window_OmoriInputLetters.prototype.constructor = Window_OmoriInputLetters;
//=============================================================================
// * Initialize Object
//=============================================================================
Window_OmoriInputLetters.prototype.initialize = function() {
  // Super Call
  Window_Selectable.prototype.initialize.call(this, 0, 0, this.windowWidth(), this.windowHeight());
  this.refresh()
  this.openness = 0;
  this.deactivate();
};
//=============================================================================
// * Settings
//=============================================================================
Window_OmoriInputLetters.prototype.isUsingCustomCursorRectSprite = function() { return true; };
Window_OmoriInputLetters.prototype.standardPadding = function() { return 4; };
Window_OmoriInputLetters.prototype.windowWidth = function() { return 500; };
Window_OmoriInputLetters.prototype.windowHeight = function() { return 250; };
Window_OmoriInputLetters.prototype.customCursorRectXOffset = function() { 
  if([58,59].contains(this.index())) {return -18;}
  return -12; 
};
Window_OmoriInputLetters.prototype.customCursorRectBitmapName = function() { return 'name_cursor'; }
Window_OmoriInputLetters.prototype.maxCols = function() { return 10; };
Window_OmoriInputLetters.prototype.maxItems = function() { return 60; };
//=============================================================================
// * Openness Type (0: Vertical, 1: Horizontal, 2: All)
//=============================================================================
Window_OmoriInputLetters.prototype.standardOpennessType = function() { return 2;};
//=============================================================================
// * Create Custom Cursor Rect
//=============================================================================
Window_OmoriInputLetters.prototype.initCustomCursorRect = function() {
  // Run Original Function
  Window_Selectable.prototype.initCustomCursorRect.call(this);
  // Change Cursor Animation Speed
  this._customCursorRectSprite.initCursorAnimation(0.15, 0.25);
};
//=============================================================================
// * Get Table
//=============================================================================
Window_OmoriInputLetters.prototype.table = function() {
  // Return Input Keys Table
  return LanguageManager.getInputKeysTable();
};
//=============================================================================
// * Get Selected Character
//=============================================================================
Window_OmoriInputLetters.prototype.character = function(index = this._index) {
  // Get Character
  return this.table()[index];
};
//=============================================================================
// * Item Rect
//=============================================================================
Window_OmoriInputLetters.prototype.itemRect = function(index) {
  var rect = new Rectangle(0, 0, 42, this.lineHeight());
  rect.x = 20 + (index % 10 * 42 + Math.floor(index % 10 / 5) * 24);
  rect.y = 10 + (Math.floor(index / 10) * this.lineHeight());
  // Return Rect
  return rect;
};
//=============================================================================
// * Refresh
//=============================================================================
Window_OmoriInputLetters.prototype.refresh = function() {
  // Get Table
  var table = this.table();
  this.contents.clear();
  this.resetTextColor();
  for (var i = 0; i < this.maxItems(); i++) {
    var rect = this.itemRect(i);
    this.drawText(table[i], rect.x, rect.y, rect.width, 'center');
  };
};
//=============================================================================
// * Cursor Down
//=============================================================================
Window_OmoriInputLetters.prototype.cursorDown = function(wrap) {
  // Get Next Character
  var nextChar = this.character(this._index + 10);
  if (nextChar === '') {
    return;
  };
  if (this._index < 60 || wrap) {
    this._index = (this._index + 10) % 60;
  };
  this.updateCursor();
};
//=============================================================================
// * Cursor Up
//=============================================================================
Window_OmoriInputLetters.prototype.cursorUp = function(wrap) {
  if (this._index <= 9) { 
    this._index += 50;
    // Get Next Character
    let nextChar = this.character(this._index);
    // If next character is empty
    if (nextChar === '') {
      for (var i = 0; i < this.maxRows(); i++) {
        var nC = this.character(this._index - 10);
        if (nC === undefined) { break; }
        if (nC !== '') { this._index -= 10; break;}
      };
    }
    this.updateCursor();    
    return;
  };

  if (this._index > 0 || wrap) {
    this._index = (this._index + 80) % 90;
  };
  // Update Cursor
  this.updateCursor();
};
//=============================================================================
// * Cursor Right
//=============================================================================
Window_OmoriInputLetters.prototype.cursorRight = function(wrap) {
  // Get Next Character
  var nextChar = this.character(this._index + 1);
  if (nextChar === '') {
    for (var i = 0; i < this.maxCols(); i++) {
      var nC = this.character(this._index + i + 1)
      if (nC === undefined) { break; }
      if (nC !== '') { this._index += (i + 1); break;}
    };
    this.updateCursor();
    return;
  };
  if (this._index % 10 < 9) {
    this._index++;
  } else if (wrap) {
    this._index -= 9;
  };
  this.updateCursor();
};
//=============================================================================
// * Cursor Left
//=============================================================================
Window_OmoriInputLetters.prototype.cursorLeft = function(wrap) {
  // Get Next Character
  var nextChar = this.character(this._index - 1);
  if (nextChar === '') {
    for (var i = 0; i < this.maxCols(); i++) {
      var nC = this.character(this._index - (i + 1))
      if (nC === undefined) { break; }
      if (nC !== '') { this._index -= (i + 1); break;}
    };
    this.updateCursor();
    return;
  };
  if (this._index % 10 > 0) {
    this._index--;
  } else if (wrap) {
    this._index += 9;
  };
  this.updateCursor();
};
//=============================================================================
// * Process Touch
//=============================================================================
Window_OmoriInputLetters.prototype.onTouch = function(triggered) {
  var lastIndex = this.index();
  var x = this.canvasToLocalX(TouchInput.x);
  var y = this.canvasToLocalY(TouchInput.y);
  var hitIndex = this.hitTest(x, y);
  if (hitIndex >= 0) {
      if (hitIndex === this.index()) {
        if (triggered && this.isTouchOkEnabled()) {
          this.processOk();
        }
      } else if (this.isCursorMovable()) {
        if (this.character(hitIndex) !== '') { this.select(hitIndex); };
      }
  } else if (this._stayCount >= 10) {
    if (y < this.padding) {
      this.cursorUp();
    } else if (y >= this.height - this.padding) {
      this.cursorDown();
    }
  }
  if (this.index() !== lastIndex) {
    SoundManager.playCursor();
  }
};
//=============================================================================
// * Process Handling
//=============================================================================
Window_OmoriInputLetters.prototype.processHandling = function() {
  if (this.isOpen() && this.active) {
    // if (KeyboardInput.isRepeated('enter')) {
    //   this.processOk();
    // };

    if (Input.isTriggered('ok')) {
      this.processOk();
    };

    if (Input.isTriggered('cancel')) {
      this.processBack();
    };
  };
};
//=============================================================================
// * Determine if OK
//=============================================================================
Window_OmoriInputLetters.prototype.isOk = function() { return this._index === 59; };
//=============================================================================
// * Determine if BackSpace
//=============================================================================
Window_OmoriInputLetters.prototype.isBackSpace = function() { return this._index === 58; };
//=============================================================================
// * Process Back
//=============================================================================
Window_OmoriInputLetters.prototype.processBack = function() {
  if (this._nameWindow) {
    if (this._nameWindow.back()) {
      SoundManager.playCancel();
    };
  };
};
//=============================================================================
// * Process Ok
//=============================================================================
Window_OmoriInputLetters.prototype.processOk = function() {
  // Get Character
  var character = this.character();
  if (this.isBackSpace()) {
    this.processBack();
  } else if (this.isOk()) {
    this.onNameOk();
  } else if (character) {
    if (this._nameWindow) {
      if (this._nameWindow.add(character)) {
        SoundManager.playOk();
      } else {
        SoundManager.playBuzzer();
      };
    };
  };

};
//=============================================================================
// * Process Handling
//=============================================================================
Window_OmoriInputLetters.prototype.onNameOk = function() {
  // Get Text
  var text = this._nameWindow.name();
  // If Text Length is more than 0
  if (text.length > 0) {
    if(text.toLowerCase() === LanguageManager.getMessageData("XX_BLUE.OMOCAT").text.toLowerCase()) {$gameSystem.unlockAchievement("YOU_THINK_YOU_RE_CLEVER_HUH")}
    if (new RegExp($gameSystem._badWords.join("|")).test(text.toLowerCase())) { // YIN - Bad words check
      //console.log("That's totally inappropriate");
      this.playBuzzerSound();
      return;
    }
    //console.log("That is acceptable.")
    this.deactivate();
    this.close();
    this._nameWindow.close();
    if (_TDS_.NameInput.params.nameVariableID > 0) {
      $gameVariables.setValue(_TDS_.NameInput.params.nameVariableID, text);
    };
  } else {
    this.playBuzzerSound();
  };
};
//=============================================================================
// * Frame Update
//=============================================================================
Window_OmoriInputLetters.prototype.update = function() {
  // Super Call
  Window_Selectable.prototype.update.call(this);
  // Update Key Input
  this.updateKeyInput();
};
//=============================================================================
// * Update Key Input
//=============================================================================
Window_OmoriInputLetters.prototype.updateKeyInput = function() {
  return
  if (!this.isOpenAndActive()) { return; }
  // Get Key
  var key = KeyboardInput._latestButton;
  // Return if Key is null
  if (key === null) { return; }
  // If Backspace
  if (KeyboardInput.isRepeated('backspace')) {
    this.processBack();
    return;
  };
  // If Space
  if (KeyboardInput.isRepeated('space')) { return; };
  if (KeyboardInput.isRepeated('enter')) { return; };

  // Set UpperCase Flag
  var upperCase = Input.isPressed('shift');
  if (KeyboardInput.isCapsLockOn()) { upperCase = true; }
  // If Key is pressed
  if (KeyboardInput.isRepeated(key)) {
    // If Key is usable
    if (this.isKeyAlphabetical(key)) {
      // Convert key to lowercase if necessary
      key = upperCase ? key : key.toLowerCase();
      if (this._nameWindow) {
        if (this._nameWindow.add(key)) {
          SoundManager.playOk();
        } else {
          SoundManager.playBuzzer();
        };
      };
    };
  };
};
//=============================================================================
// * Determine if key is Alphabetical
//=============================================================================
Window_OmoriInputLetters.prototype.isKeyAlphabetical = function(key) { return /^[a-z ]*$/i.test(key); };

//=============================================================================
// * VIRTUAL KEYBOARD IMPLEMENTATION
//=============================================================================

// HANGUL
(function () {
  'use strict';
      /* Disassembled 초성(onset) */
  var CHO = [
          'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ',
          'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ',
          'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ',
          'ㅍ', 'ㅎ'
      ],
      /* Disassembled 중성(nucleus) */
      JUNG = [
          'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ',
          'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', ['ㅗ', 'ㅏ'], ['ㅗ', 'ㅐ'],
          ['ㅗ', 'ㅣ'], 'ㅛ', 'ㅜ', ['ㅜ', 'ㅓ'], ['ㅜ', 'ㅔ'], ['ㅜ', 'ㅣ'],
          'ㅠ', 'ㅡ', ['ㅡ', 'ㅣ'], 'ㅣ'
      ],
      /* Desassembled 종성(coda) */
      JONG = [
          '', 'ㄱ', 'ㄲ', ['ㄱ', 'ㅅ'], 'ㄴ', ['ㄴ', 'ㅈ'], ['ㄴ', 'ㅎ'], 'ㄷ', 'ㄹ',
          ['ㄹ', 'ㄱ'], ['ㄹ', 'ㅁ'], ['ㄹ', 'ㅂ'], ['ㄹ', 'ㅅ'], ['ㄹ', 'ㅌ'], ['ㄹ', 'ㅍ'], ['ㄹ', 'ㅎ'], 'ㅁ',
          'ㅂ', ['ㅂ', 'ㅅ'], 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
      ],
      /* 유니코드 한글 시작 위치 */
      HANGUL_OFFSET = 0xAC00, 
      /* 자음 */
      CONSONANTS = [
          'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄸ',
          'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ',
          'ㅁ', 'ㅂ', 'ㅃ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ',
          'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
      ],
      /* Assembled 초성 */
      COMPLETE_CHO = [
          'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ',
          'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ',
          'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
      ],
      /* Assembled 중성 */
      COMPLETE_JUNG = [
          'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ',
          'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ',
          'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ',
          'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'
      ],
      /* Assembled 종성 */
      COMPLETE_JONG = [
          '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ',
          'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ',
          'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
      ],
      /* 복잡한 자음: [ 자음1, 자음2, 자음1+자음2 ] */
      COMPLEX_CONSONANTS = [
          ['ㄱ', 'ㅅ', 'ㄳ'],
          ['ㄴ', 'ㅈ', 'ㄵ'],
          ['ㄴ', 'ㅎ', 'ㄶ'],
          ['ㄹ', 'ㄱ', 'ㄺ'],
          ['ㄹ', 'ㅁ', 'ㄻ'],
          ['ㄹ', 'ㅂ', 'ㄼ'],
          ['ㄹ', 'ㅅ', 'ㄽ'],
          ['ㄹ', 'ㅌ', 'ㄾ'],
          ['ㄹ', 'ㅍ', 'ㄿ'],
          ['ㄹ', 'ㅎ', 'ㅀ'],
          ['ㅂ', 'ㅅ', 'ㅄ']
      ],
      /* 복잡한 모음: [모음1, 모음2, 모음1+모음2] */
      COMPLEX_VOWELS = [
          ['ㅗ', 'ㅏ', 'ㅘ'],
          ['ㅗ', 'ㅐ', 'ㅙ'],
          ['ㅗ', 'ㅣ', 'ㅚ'],
          ['ㅜ', 'ㅓ', 'ㅝ'],
          ['ㅜ', 'ㅔ', 'ㅞ'],
          ['ㅜ', 'ㅣ', 'ㅟ'],
          ['ㅡ', 'ㅣ', 'ㅢ']
      ],
      CONSONANTS_HASH,
      CHO_HASH,
      JUNG_HASH,
      JONG_HASH,
      COMPLEX_CONSONANTS_HASH,
      COMPLEX_VOWELS_HASH
      ;

  function _makeHash(array) {
      var length = array.length,
          hash = { 0: 0 }
          ;
      for (var i = 0; i < length; i++) {
          if (array[i])
              hash[array[i].charCodeAt(0)] = i;
      }
      return hash;
  }

  CONSONANTS_HASH = _makeHash(CONSONANTS);
  CHO_HASH = _makeHash(COMPLETE_CHO);
  JUNG_HASH = _makeHash(COMPLETE_JUNG);
  JONG_HASH = _makeHash(COMPLETE_JONG);

  function _makeComplexHash(array) {
      var length = array.length,
          hash = {},
          code1,
          code2
          ;
      for (var i = 0; i < length; i++) {
          code1 = array[i][0].charCodeAt(0);
          code2 = array[i][1].charCodeAt(0);
          if (typeof hash[code1] === 'undefined') {
              hash[code1] = {};
          }
          hash[code1][code2] = array[i][2].charCodeAt(0);
      }
      return hash;
  }

  COMPLEX_CONSONANTS_HASH = _makeComplexHash(COMPLEX_CONSONANTS);
  COMPLEX_VOWELS_HASH = _makeComplexHash(COMPLEX_VOWELS);

  /* c 가 CONSONANTS의 멤버일 경우 true 반환 (c가 자음일 경우 true 반환) */ 
  function _isConsonant(c) {
      return typeof CONSONANTS_HASH[c] !== 'undefined';
  }
  /* c 가 COMPLETE_JUNG의 멤버일 경우 true 반환 (c 가 초성일 경우 true 반환) */
  function _isCho(c) {
      return typeof CHO_HASH[c] !== 'undefined';
  }
  /* c 가 COMPLETE_JUNG의 멤버일 경우 true 반환 (c 가 중성일 경우 true 반환) */
  function _isJung(c) {
      return typeof JUNG_HASH[c] !== 'undefined';
  }
  /* c 가 COMPLETE_JONG의 멤버일 경우 true 반환 (c 가 종성일 경우 true 반환) */
  function _isJong(c) {
      return typeof JONG_HASH[c] !== 'undefined';
  }
  /* c 가 한글일 경우 true 반환 */
  function _isHangul(c /* code number */) {
      return 0xAC00 <= c && c <= 0xd7a3;
  }
  /* a와 b가 중성으로서 결합할 수 있는 경우 COMPLEX_VOWELS_HASH[a][b] 값(결합한 종성의 유니코드 값) 반환 */
  function _isJungJoinable(a, b) {
      return (COMPLEX_VOWELS_HASH[a] && COMPLEX_VOWELS_HASH[a][b]) ? COMPLEX_VOWELS_HASH[a][b] : false;
  }
  /* a와 b가 종성으로서 결합할 수 있는 경우 COMPLEX_CONSONANTS_HASH[a][b] 값(결합한 종성의 유니코드 값) 반환 */
  function _isJongJoinable(a, b) {
      return COMPLEX_CONSONANTS_HASH[a] && COMPLEX_CONSONANTS_HASH[a][b] ? COMPLEX_CONSONANTS_HASH[a][b] : false;
  }
  
  var disassemble = function (string, grouped) {
      /* 입력값이 NULL일 경우 에러 발생 */
      if (string === null) {
          throw new Error('Arguments cannot be null');
      }
      /* 입력값이 'object' 타입인 경우 문자열로 병합 */
      if (typeof string === 'object') {
          string = string.join('');
      }
      
      var result = [],
          length = string.length,
          cho,
          jung,
          jong,
          code,
          r
          ;
      /* 모든 문자에 대해 확인 */
      for (var i = 0; i < length; i++) {
          var temp = [];
          
          code = string.charCodeAt(i); //문자를 유니코드값으로 변환해 code에 저장
          /* i번째 문자(code)가 완성된 한글인 경우 */
          if (_isHangul(code)) {
              code -= HANGUL_OFFSET;
              jong = code % 28;
              jung = (code - jong) / 28 % 21;
              cho = parseInt((code - jong) / 28 / 21);
              temp.push(CHO[cho]); // temp 배열에 초성 추가
              /* 중성이 object형인 경우 (2 단일 모음의 조합인 경우) */
              if (typeof JUNG[jung] === 'object') {
                  temp = temp.concat(JUNG[jung]); // temp에 해당 중성의 모음들 추가
              /* 중성이 단일 모음으로 이루어진 경우 */
              } else {
                  temp.push(JUNG[jung]); // temp에 해당 모음 추가
              }
              /* 종성이 있는 경우 */
              if (jong > 0) {
                  /* 종성이 object형인 경우 (2 단일 자음의 조합인 경우) */
                  if (typeof JONG[jong] === 'object') {
                      temp = temp.concat(JONG[jong]); // temp에 해당 종성의 자음들 추가
                  /* 종성이 단일 자음으로 이루어진 경우 */
                  } else {
                      temp.push(JONG[jong]); // temp에 해당 자음 추가
                  }
              }
          /* i번째 문자(code)가 완성된 한글이 아니면서 CONSONANTS의 멤버일 경우 (자음일 경우)*/    
          } else if (_isConsonant(code)) {
              if (_isCho(code)) {
                  r = CHO[CHO_HASH[code]]; // 초성일 경우 해당 초성을 r에 저장
              } else {
                  r = JONG[JONG_HASH[code]]; // 종성일 경우 해당 종성을 r에 저장
              }
              if (typeof r === 'string') {
                  temp.push(r); // r이 string 형일 경우 temp에 추가
              } else {
                  temp = temp.concat(r); // 아닐 경우 temp에 r 배열의 요소들 추가
              }
          /* i번째 문자(code)가 완성된 한글이 아니면서 COMPLETE_JUNG의 멤버일 경우 (중성일 경우) */
          } else if (_isJung(code)) {
              r = JUNG[JUNG_HASH[code]]; // r에 해당 중성 저장
              if (typeof r === 'string') {
                  temp.push(r); // r이 string 형일 경우 temp에 추가
              } else {
                  temp = temp.concat(r); // 아닐 경우 temp에 r 배열의 요소들 추가
              }
          /* i번째 문자(code)가 한글이 아닐 경우 */
          } else {
              temp.push(string.charAt(i)); // temp에 i번째 문자를 추가
          }

          if (grouped) result.push(temp); //grouped가 설정된 경우 result에 temp 추가
          else result = result.concat(temp); //grouped가 설정되지 않은 경우 result에 temp의 요소들 추가
      }

      return result;
  };

  /* string으로 disassemle */
  var disassembleToString = function (str) {
      if (typeof str !== 'string') {
          return ''; // 입력값이 string형이 아닐 경우 빈 문자열 반환
      }
      str = disassemble(str); // str을 disassemble
      return str.join(''); // str을 문자열로 반환
  };

  /* string으로 assemble */
  var assemble = function (array) {
      if (typeof array === 'string') {
          array = disassemble(array); // 입력값이 string형인 경우 우선 disassemble
      }

      var result = [],
          length = array.length,
          code,
          stage = 0,
          complete_index = -1, //완성된 곳의 인덱스
          previous_code,
          jong_joined = false
          ;

      function _makeHangul(index) { // complete_index + 1부터 index까지를 greedy하게 한글로 만든다.
          var code,
              cho,
              jung1,
              jung2,
              jong1 = 0,
              jong2,
              hangul = ''
              ;

          jong_joined = false;
          if (complete_index + 1 > index) {
              return;
          }
          for (var step = 1; ; step++) {
              if (step === 1) {
                  cho = array[complete_index + step].charCodeAt(0); // 첫 자모를 cho에 저장
                  /* cho가 중성인 경우 */
                  if (_isJung(cho)) { // 첫번째 것이 모음이면 1) ㅏ같은 경우이거나 2) ㅙ같은 경우이다
                      /* cho의 다음 자모(jung1)가 범위 내에 있으면서 모음인 경우 */
                      if (complete_index + step + 1 <= index && _isJung(jung1 = array[complete_index + step + 1].charCodeAt(0))) { //다음것이 있고 모음이면
                          result.push(String.fromCharCode(_isJungJoinable(cho, jung1))); // cho와 jung1이 중성으로 조합가능한 경우 result에 조합한 문자 추가
                          complete_index = index; // complete_index에 index값 저장 (index까지 assemble 완료)
                          return;
                      /* cho의 다음 자모가 없거나 자음인 경우 (cho와 결합할 것이 없을때)*/
                      } else {
                          result.push(array[complete_index + step]); // result에 cho에 해당하는 자모값 추가
                          complete_index = index; // complete_index에 index값 저장 (index까지 assemble 완료)
                          return;
                      }
                  /* cho가 중성이 아니면서 초성도 아닌 경우 */
                  } else if (!_isCho(cho)) {
                      result.push(array[complete_index + step]); // result에 cho에 해당하는 자모값 추가
                      complete_index = index; // complete_index에 index값 저장 (index까지 assemble 완료)
                      return;
                  }
                  hangul = array[complete_index + step]; // hangul에 첫 자모값 저장
              } else if (step === 2) {
                  jung1 = array[complete_index + step].charCodeAt(0); // jung1에 두번째 자모 저장
                  /* jung1이 자음인 경우 */
                  if (_isCho(jung1)) { //두번째 또 자음이 오면 ㄳ 에서 ㅅ같은 경우이다
                      cho = _isJongJoinable(cho, jung1); // 앞의 초성(cho)과 jung1이 조합 가능한 경우 cho에 해당 조합을 저장한다
                      hangul = String.fromCharCode(cho); // hangul에 cho를 문자열로 반환해 저장한다.
                      result.push(hangul); // result에 hangul 추가
                      complete_index = index; // complete_index에 index값 저장 (index까지 assemble 완료)
                      return;
                  /* jung1이 자음이 아닌 경우 */
                  } else {
                      hangul = String.fromCharCode((CHO_HASH[cho] * 21 + JUNG_HASH[jung1]) * 28 + HANGUL_OFFSET); // cho와 jung1을 한글로 조합해 문자열로 반환 후 hangul에 저장
                  }
              } else if (step === 3) {
                  jung2 = array[complete_index + step].charCodeAt(0); // jung2에 세번째 자모 저장
                  if (_isJungJoinable(jung1, jung2)) {
                      jung1 = _isJungJoinable(jung1, jung2); // jung1과 jung2가 종성으로서 조합 가능한 경우 조합 해 jung1에 저장
                  } else {
                      jong1 = jung2; // jung1과 jung2가 종성으로서 조합 불가능한 경우 jung2값을 jong1에 저장
                  }
                  hangul = String.fromCharCode((CHO_HASH[cho] * 21 + JUNG_HASH[jung1]) * 28 + JONG_HASH[jong1] + HANGUL_OFFSET);
                  
              } else if (step === 4) {
                  jong2 = array[complete_index + step].charCodeAt(0); // jong2에 네번째 자모 저장
                  if (_isJongJoinable(jong1, jong2)) {
                      jong1 = _isJongJoinable(jong1, jong2); // jong1과 jong2가 종성으로서 조합 가능한 경우 조합 후 jong1에 저장
                  } else {
                      jong1 = jong2; // jong1과 jong2가 종성으로서 조합 불가능한 경우 jong2값을 jong1에 저장
                  }
                  hangul = String.fromCharCode((CHO_HASH[cho] * 21 + JUNG_HASH[jung1]) * 28 + JONG_HASH[jong1] + HANGUL_OFFSET); // cho, jung1, jong1를 한글로 조합해 문자열로 반환 후 hangul에 저장
              } else if (step === 5) {
                  jong2 = array[complete_index + step].charCodeAt(0); // jong2에 다섯번째 자모 저장
                  jong1 = _isJongJoinable(jong1, jong2); // jong1과 jong2를 종성으로서 조합해 jong1에 저장
                  hangul = String.fromCharCode((CHO_HASH[cho] * 21 + JUNG_HASH[jung1]) * 28 + JONG_HASH[jong1] + HANGUL_OFFSET); // cho, jung1, jong1를 한글로 조합해 문자열로 반환 후 hangul에 저장
              }

              if (complete_index + step >= index) {
                  result.push(hangul); // result에 hangul 추가 (조합 결과 추가)
                  complete_index = index;
                  return;
              }
          }
      }
      
      /* 모든 문자에 대해 확인 */
      for (var i = 0; i < length; i++) {
          code = array[i].charCodeAt(0);
          if (!_isCho(code) && !_isJung(code) && !_isJong(code)) { //초, 중, 종성 다 아니면
              _makeHangul(i - 1); // i-1번째 문자까지 우선 한글로 조합한 후
              _makeHangul(i); // i번째부터 다시 조합
              stage = 0;
              continue;
          }
          //console.log(stage, array[i]);
          if (stage === 0) { // 초성이 올 차례
              if (_isCho(code)) { // 초성이 오면 아무 문제 없다.
                  stage = 1;
              } else if (_isJung(code)) {
                  // 중성이오면 ㅐ 또는 ㅘ 인것이다. 바로 구분을 못한다. 따라서 특수한 stage인 stage4로 이동
                  stage = 4;
              }
          } else if (stage == 1) { //중성이 올 차례
              if (_isJung(code)) { //중성이 오면 문제없음 진행.
                  stage = 2;
              } else { //아니고 자음이오면 ㄻ같은 경우가 있고 ㄹㅋ같은 경우가 있다.
                  if (_isJongJoinable(previous_code, code)) {
                      // 합쳐질 수 있다면 ㄻ 같은 경우인데 이 뒤에 모음이 와서 ㄹ마 가 될수도 있고 초성이 올 수도 있다. 따라서 섣불리 완성할 수 없다. 이땐 stage5로 간다.
                      stage = 5;
                  } else { //합쳐질 수 없다면 앞 글자 완성 후 여전히 중성이 올 차례
                      _makeHangul(i - 1);
                  }
              }
          } else if (stage == 2) { //종성이 올 차례
              if (_isJong(code)) { //종성이 오면 다음엔 자음 또는 모음이 온다.
                  stage = 3;
              } else if (_isJung(code)) { //그런데 중성이 오면 앞의 모음과 합칠 수 있는지 본다.
                  if (_isJungJoinable(previous_code, code)) { //합칠 수 있으면 여전히 종성이 올 차례고 그대로 진행
                  } else { // 합칠 수 없다면 오타가 생긴 경우
                      _makeHangul(i - 1);
                      stage = 4;
                  }
              } else { // 받침이 안되는 자음이 오면 ㄸ 같은 이전까지 완성하고 다시시작
                  _makeHangul(i - 1);
                  stage = 1;
              }
          } else if (stage == 3) { // 종성이 하나 온 상태.
              if (_isJong(code)) { // 또 종성이면 합칠수 있는지 본다.
                  if (!jong_joined && _isJongJoinable(previous_code, code)) { //합칠 수 있으면 계속 진행. 왜냐하면 이번에 온 자음이 다음 글자의 초성이 될 수도 있기 때문. 대신 이 기회는 한번만
                      jong_joined = true;
                  } else { //없으면 한글자 완성
                      _makeHangul(i - 1);
                      stage = 1; // 이 종성이 초성이 되고 중성부터 시작
                  }
              } else if (_isCho(code)) { // 초성이면 한글자 완성.
                  _makeHangul(i - 1);
                  stage = 1; //이 글자가 초성이되므로 중성부터 시작
              } else if (_isJung(code)) { // 중성이면 이전 종성은 이 중성과 합쳐지고 앞 글자는 받침이 없다.
                  _makeHangul(i - 2);
                  stage = 2;
              }
          } else if (stage == 4) { // 중성이 하나 온 상태
              if (_isJung(code)) { //중성이 온 경우
                  if (_isJungJoinable(previous_code, code)) { //이전 중성과 합쳐질 수 있는 경우
                      _makeHangul(i);
                      stage = 0;
                  } else { //중성이 왔지만 못합치는 경우. ㅒㅗ 같은
                      _makeHangul(i - 1);
                  }
              } else { // 아니면 자음이 온 경우.
                  _makeHangul(i - 1);
                  stage = 1;
              }
          } else if (stage == 5) { // 초성이 연속해서 두개 온 상태 ㄺ
              if (_isJung(code)) { //이번에 중성이면 ㄹ가
                  _makeHangul(i - 2);
                  stage = 2;
              } else {
                  _makeHangul(i - 1);
                  stage = 1;
              }
          }
          previous_code = code;
      }
      _makeHangul(i - 1);
      return result.join('');
  };

  var search = function (a, b) {
      /* a 와 b 를 disassemble한 후 문자열로 반환해 ad, bd에 각각 저장 */
      var ad = disassemble(a).join(''),
          bd = disassemble(b).join('')
          ;

      return ad.indexOf(bd); // ad 에서 bd가 포함되는 인덱스를 찾아 반환
  };

  var rangeSearch = function (haystack, needle) {
      var hex = disassemble(haystack).join(''),
          nex = disassemble(needle).join(''),
          grouped = disassemble(haystack, true),
          re = new RegExp(nex, 'gi'),
          indices = [],
          result;

      if (!needle.length) return [];

      while ((result = re.exec(hex))) {
          indices.push(result.index);
      }

      function findStart(index) {
          for (var i = 0, length = 0; i < grouped.length; ++i) {
              length += grouped[i].length;
              if (index < length) return i;
          }
      }

      function findEnd(index) {
          for (var i = 0, length = 0; i < grouped.length; ++i) {
              length += grouped[i].length;
              if (index + nex.length <= length) return i;
          }
      }

      return indices.map(function (i) {
          return [findStart(i), findEnd(i)];
      });
  };

  function Searcher(string) {
      this.string = string;
      this.disassembled = disassemble(string).join('');
  }

  Searcher.prototype.search = function (string) {
      return disassemble(string).join('').indexOf(this.disassembled);
  };
  /* string이 자음으로 끝나는지 확인 */
  var endsWithConsonant = function (string) {
      if (typeof string === 'object') {
          string = string.join('');
      }

      var code = string.charCodeAt(string.length - 1);

      if (_isHangul(code)) { // 완성된 한글이면
          code -= HANGUL_OFFSET;
          var jong = code % 28;
          if (jong > 0) {
              return true;
          }
      } else if (_isConsonant(code)) { //자음이면
          return true;
      }
      return false;
  };

  /* string이 target 문자로 끝나는지 확인 */
  var endsWith = function (string, target) {
      return disassemble(string).pop() === target;
  };


  var hangul = {
      disassemble: disassemble,
      d: disassemble, // alias for disassemble
      disassembleToString: disassembleToString,
      ds: disassembleToString, // alias for disassembleToString
      assemble: assemble,
      a: assemble, // alias for assemble
      search: search,
      rangeSearch: rangeSearch,
      Searcher: Searcher,
      endsWithConsonant: endsWithConsonant,
      endsWith: endsWith,
      isHangul: function (c) {
          if (typeof c === 'string')
              c = c.charCodeAt(0);
          return _isHangul(c);
      },
      isComplete: function (c) {
          if (typeof c === 'string')
              c = c.charCodeAt(0);
          return _isHangul(c);
      },
      isConsonant: function (c) {
          if (typeof c === 'string')
              c = c.charCodeAt(0);
          return _isConsonant(c);
      },
      isVowel: function (c) {
          if (typeof c === 'string')
              c = c.charCodeAt(0);
          return _isJung(c);
      },
      isCho: function (c) {
          if (typeof c === 'string')
              c = c.charCodeAt(0);
          return _isCho(c);
      },
      isJong: function (c) {
          if (typeof c === 'string')
              c = c.charCodeAt(0);
          return _isJong(c);
      },
      isHangulAll: function (str) {
          if (typeof str !== 'string') return false;
          for (var i = 0; i < str.length; i++) {
              if (!_isHangul(str.charCodeAt(i))) return false;
          }
          return true;
      },
      isCompleteAll: function (str) {
          if (typeof str !== 'string') return false;
          for (var i = 0; i < str.length; i++) {
              if (!_isHangul(str.charCodeAt(i))) return false;
          }
          return true;
      },
      isConsonantAll: function (str) {
          if (typeof str !== 'string') return false;
          for (var i = 0; i < str.length; i++) {
              if (!_isConsonant(str.charCodeAt(i))) return false;
          }
          return true;
      },
      isVowelAll: function (str) {
          if (typeof str !== 'string') return false;
          for (var i = 0; i < str.length; i++) {
              if (!_isJung(str.charCodeAt(i))) return false;
          }
          return true;
      },
      isChoAll: function (str) {
          if (typeof str !== 'string') return false;
          for (var i = 0; i < str.length; i++) {
              if (!_isCho(str.charCodeAt(i))) return false;
          }
          return true;
      },
      isJongAll: function (str) {
          if (typeof str !== 'string') return false;
          for (var i = 0; i < str.length; i++) {
              if (!_isJong(str.charCodeAt(i))) return false;
          }
          return true;
      }
  };

  if (typeof define == 'function' && define.amd) {
      define(function () {
          return hangul;
      });
  } else if (typeof module !== 'undefined') {
      module.exports = hangul;
  } else {
      window.Hangul = hangul;
  }
})();


//=============================================================================
// * OMORI NAME INPUT HANGUL
//=============================================================================

Window_OmoriNameInputName.prototype.addHangul = function(character) {
  let current_char = Hangul.d(this._text[this._textIndex])
  let char = Hangul.a(current_char.concat([character]))
  let result = true
  if(char.length <= 1) {
    this._text[this._textIndex] = char
  }
  else {
    char = char.split("")
    while(char.length > 0) {
      const last_char = char.shift()
      this._text[this._textIndex] = last_char
      if(char.length > 0) {
        this._textIndex = this._textIndex + 1
      }
      
      if(this._textIndex >= this._maxCharacters) {
        this._textIndex = this._maxCharacters - 1
        result = false
        break;
      }
    }
  }
  this.refreshText()
  return result
};

//=============================================================================
// * Back
//=============================================================================
Window_OmoriNameInputName.prototype.backHangul = function() {
  const char = this._text[this._textIndex]
  if(char === "") {
    return this.back()
  }
  let dis = Hangul.d(this._text[this._textIndex])
  dis.pop()
  dis = Hangul.a(dis)
  this._text[this._textIndex] = dis;
  this.refreshText()
  return true
};

//=============================================================================
// * VIRTUAL KEYBOARD
//=============================================================================

class VirtualKeyboard extends Window_Selectable {

  initialize() {
    const ww = Math.floor(Graphics.boxWidth / 1.2)
    const hh = Math.floor(Graphics.boxHeight / 2.5)
    const x = Graphics.boxWidth / 2 - ww / 2
    const y = Graphics.boxHeight / 2 - hh / 2
    super.initialize(x,y,ww,hh);
    this._layoutType = "default"
    this._isCaps = false
    this.openness = 0
    this.loadChineseLibrary()
    this.refresh()
  }

  isOkEnabled() {return true}

  isUsingCustomCursorRectSprite() {return true}
  customCursorRectBitmapName() {return "name_cursor"}
  customCursorRectXOffset() {return -12}

  add(char) {
    switch(this.getLanguage()) {
      case "KR":
        return this._nameWindow.addHangul(char)
      case "CH":
        if(char === " ") {return false}
        return this._candidateWindow.add(char)
      default:
        return this._nameWindow.add(char)
    }
  }

  back() {
    switch(this.getLanguage()) {
      case "KR":
        return this._nameWindow.backHangul()
      case "CH":
        return this._candidateWindow.back()
      default:
        return this._nameWindow.back()
    }
  }

  confirmEntry() {
    const entry = this._nameWindow.name()
    if(entry.length > 0) {
      if(entry.toLowerCase() === LanguageManager.getMessageData("XX_BLUE.OMOCAT").text.toLowerCase())
      {
      $gameSystem.unlockAchievement("YOU_THINK_YOU_RE_CLEVER_HUH")
      }
      if (new RegExp($gameSystem._badWords.join("|")).test(entry.toLowerCase())) { // YIN - Bad words check
        //console.log("That's totally inappropriate");
        this.playBuzzerSound();
        return;
      }
      this.dispose()
      this._nameWindow.close()
      if (_TDS_.NameInput.params.nameVariableID > 0) {
        $gameVariables.setValue(_TDS_.NameInput.params.nameVariableID, entry);
      };
    }
    else {
      this.playBuzzerSound();
    }
  }

  getLanguage() {
    return LanguageManager._language.toUpperCase()
  }

  loadChineseLibrary() {
    const language = this.getLanguage()
    if(language !== "CH") {return}
    const fs = require("fs")
    fs.readFile("./js/libs/pinyin.json", (err, data) => {
      if(!!err) {throw new Error(err)}
      this._pinyin = JSON.parse(data.toString())
      this._candidateWindow = new Window_Candidate(0, this.height)
      this.addChild(this._candidateWindow)
      this.setHandler("pageup", () => {
        this._candidateWindow.select(0)
        this._candidateWindow.activate()
      }) 
      this.setHandler("pagedown", () => {
        this._candidateWindow.select(0)
        this._candidateWindow.activate()
      }) 
      this._candidateWindow.setHandler("cancel", () => {
        this._candidateWindow.deactivate();
        this._candidateWindow.deselect()
        this.activate()
      })
      this._candidateWindow.setHandler("ok", () => {
        this._candidateWindow.getCandidate()
        this._candidateWindow.deselect()
        this.activate()
      })
      this._candidateWindow.open()
    })  
  }

  processOk() {
    const character = this.getCharacter();
    if(!!VirtualKeyboard[character]) {
      switch(character) {
        case "{lock}":
        case "{tradch}":
        case "{simpch}":
          SoundManager.playOk()
          if(!!this._candidateWindow) {
            this._candidateWindow.clearEntry()
          }
          this._isCaps = !this._isCaps
          this._layoutType = !!this._isCaps ? "shift" : "default"
          this.determineLayoutData()
          this.refresh()
          break;
        case "{confirm}":
          this.confirmEntry()
          break;
        case "{space}":
          this._nameWindow.add(" ")
          break;
        case "{bksp}":
          if(this.back()) {
            SoundManager.playCancel()
          }
          break;
        case "{larrow}":
          SoundManager.playCursor()
          this._nameWindow._textIndex = Math.max(this._nameWindow._textIndex - 1, 0)
          this._nameWindow.refreshText()
          break;
        case "{rarrow}":
          SoundManager.playCursor()
          this._nameWindow._textIndex = Math.min(this._nameWindow._textIndex + 1, this._nameWindow._maxCharacters - 1)
          this._nameWindow.refreshText()
          break;
      }
    }
    else {
      if(this.add(character)) {
        SoundManager.playOk()
      }
      else {
        SoundManager.playBuzzer()
      }
    }
  }

  setup() {
    this.activate()
    this.select(0)
    this.open()
  }

  dispose() {
    this.deactivate()
    this.close()
  }

  standardFontSize() {return 24}

  refresh() {
    this.determineLayoutData();
    super.refresh();
  }

  determineLayoutData() {
    const language = this.getLanguage()
    this._currentLayout = VirtualKeyboard[language][this._layoutType].map(l => l.split(" "))
    this._layoutCols = 0
    this._numberOfItems 
    for(let layout of this._currentLayout) {
      if(this._layoutCols < layout.length) {
        this._layoutCols = layout.length
      } 
    }
    this._currentLayout = this._currentLayout.map(l => {
      let res = []
      if(l.length >= this._layoutCols) {return l}
      let missing_cols = Math.abs(l.length - this._layoutCols)
      let back = []
      let forward = []
      for(let i = 0; i < missing_cols; i++) {
        if(i % 2 === 0) {
          back.push(" ")
        }
        else {
          forward.push(" ")
        }
      }
      return res.concat(back).concat(l).concat(forward)
    })
  }

  maxItems() {
    return this._layoutCols * this._currentLayout.length
  }

  maxCols() {
    return this._layoutCols
  }

  getCharacter(index = this.index()) {return this._currentLayout[Math.floor(index / this.maxCols())][index % this.maxCols()]}

  drawItem(index) {
    const rect = this.itemRect(index)
    let current_char = this.getCharacter(index)
    if(!!VirtualKeyboard[current_char]) {
      if(current_char === "{confirm}") {
        this.changeTextColor(this.textColor(1))
      }
      current_char = VirtualKeyboard[current_char]
    }
    this.drawText(current_char, rect.x, rect.y, rect.width, "center")
    this.resetTextColor()
  }
}

VirtualKeyboard.EN = {
  default: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "q w e r t y u i o p [ ] \\",
      "{lock} a s d f g h j k l ; '",
      "z x c v b n m , . / {confirm} {space}"
  ],
  shift: [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "Q W E R T Y U I O P { } |",
      '{lock} A S D F G H J K L : "',
      "Z X C V B N M < > ? {confirm} {space}",
  ]
}
VirtualKeyboard.JP = {
  default: [
      "1 2 3 4 5 6 7 8 9 0 - ^ \u00a5 {bksp}",
      "\u305f \u3066 \u3044 \u3059 \u304b \u3093 \u306a \u306b \u3089 \u305b \u309b \u309c \u3080",
      "{lock} \u3061 \u3068 \u3057 \u306f \u304D \u304f \u307e \u306e \u308a \u308c \u3051",
      "\u3064 \u3055 \u305d \u3072 \u3053 \u307f \u3082 \u306d \u308b \u3081 {confirm} {space}"
  ],
  shift: [
      "! \" # $ % & ' ( ) \u0301 = ~ | {bksp}",
      "\u305f \u3066 \u3043 \u3059 \u304b \u3093 \u306a \u306b \u3089 \u305b \u300c \u300d \u3080",
      "{lock} \u3061 \u3068 \u3057 \u306f \u304D \u304f \u307e \u306e \u308a \u308c \u3051",
      "\u3063 \u3055 \u305d \u3072 \u3053 \u307f \u3082 \u3001 \u3002 \u30fb {confirm} {space}"
  ],
}

VirtualKeyboard.KR = {
  default: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp} {rarrow} {larrow}",
      "ㅂ ㅈ ㄷ ㄱ ㅅ ㅛ ㅕ ㅑ ㅐ ㅔ [ ] \u20a9",
      "{lock} ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ ; '",
      "ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ , . / {confirm} {space}"
  ],
  shift: [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "ㅃ ㅉ ㄸ ㄲ ㅆ ㅛ ㅕ ㅑ ㅒ ㅖ { } |",
      '{lock} ㅁ ㄴ ㅇ ㄹ ㅎ ㅗ ㅓ ㅏ ㅣ : "',
      "ㅋ ㅌ ㅊ ㅍ ㅠ ㅜ ㅡ < > ? {confirm} {space}"
  ],
}
VirtualKeyboard.CH = {
  default: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "q w e r t y u i o p [ ] \\",
      "{tradch} a s d f g h j k l ; '",
      "z x c v b n m , . / {confirm} {space}"
  ],
  shift: [
      "~ \u3105 \u3109 \u02C7 \u02F4 \u3113 \u02CA \u02D9 \u311A \u311E \u3122 \u3126 + {bksp}",
      "\u3106 \u310A \u310D \u3110 \u3114 \u3117 \u3127 \u311B \u311F \u3123 { } |",
      '{simpch} \u3107 \u310B \u310E \u3111 \u3115 \u3118 \u3128 \u311C \u3120 \u3124 "',
      "\u3108 \u310C \u310F \u3112 \u3116 \u3119 \u3129 \u311D \u3121 \u3125 {confirm} {space}",
  ]
}

// UNICODES 
//VirtualKeyboard["{shift}"] = "\u21e7"
VirtualKeyboard["{lock}"] = "\u21eA"
VirtualKeyboard["{confirm}"] = "OK"//"\u23ce"
VirtualKeyboard["{space}"] = " "
VirtualKeyboard["{bksp}"] = "\u232b"
VirtualKeyboard["{rarrow}"] = "\u2192"
VirtualKeyboard["{larrow}"] = "\u2190"
VirtualKeyboard["{tradch}"] = "繁"
VirtualKeyboard["{simpch}"] = "简"

// ZHUYIN TO PINYIN
VirtualKeyboard.Z2P = {
  "ㄅ": "b", "ㄆ": "p", "ㄇ": "m", "ㄈ": "f",
  "ㄉ": "d", "ㄊ": "t", "ㄋ": "n", "ㄌ": "l",
  "ㄍ": "g", "ㄎ": "k", "ㄏ": "h",
  "ㄐ": "j", "ㄑ": "q", "ㄒ": "x",
  "ㄓ": "zh", "ㄔ": "ch", "ㄕ": "sh", "ㄖ": "r",
  "ㄗ": "z", "ㄘ": "c", "ㄙ": "s",

  // Rhymes
  "ㄚ": "a", "ㄛ": "o", "ㄜ": "e", "ㄝ": "e",
  "ㄧ": "i", "ㄨ": "u", "ㄩ": "v",
  "ㄞ": "ai", "ㄟ": "ei", "ㄦ": "er",
  "ㄠ": "ao", "ㄡ": "ou",
  "ㄢ": "an", "ㄣ": "en",
  "ㄤ": "ang", "ㄥ": "eng",

  "ㄨㄥ": "ong", "ㄧㄝ": "ie",
  "ㄧㄡ": "iu", "ㄧㄣ": "in", "ㄧㄥ": "ing",
  "ㄩㄝ": "ve",
  "ㄨㄣ": "un", "ㄩㄣ": "vn", "ㄧㄚ": "ia",
  "ㄨㄚ": "ua", "ㄨㄢ": "uan", "ㄩㄢ": "van",
  "ㄨㄞ": "uai", "ㄨㄛ": "uo", "ㄩㄥ": "iong",
  "ㄧㄤ": "iang", "ㄨㄤ": "uang", "ㄧㄢ": "ian",
  "ㄧㄠ": "iao", "ㄨㄟ": "ui",
}

//=============================================================================
// * CANDIDATE WINDOW
//=============================================================================

Window_Candidate = class extends Window_HorzCommand {

  initialize(x,y) {
    super.initialize(x,y)
    this.openness = 0
    this.deactivate()
    this.deselect()
    this._entry = ""
  }

  clearEntry() {
    this._entry = ""
    this.refresh()
  }

  isUsingCustomCursorRectSprite() {return true}
  customCursorRectBitmapName() {return "name_cursor"}
  customCursorRectXOffset() {return -12}

  windowWidth() {return SceneManager._scene._virtualKeyboard.width}
  windowHeight() {return super.windowHeight() + this.lineHeight()*2}
  maxCols() {return 8}

  z2p(entry) {
    if(!SceneManager._scene._virtualKeyboard._isCaps) {return entry}
    let zhuyin_arr = entry.split("")
    let zhuyin_index = 0
    let converted_string = ""
    while(zhuyin_index < zhuyin_arr.length) {
      let doubleChar = `${zhuyin_arr[zhuyin_index]}${zhuyin_arr[zhuyin_index + 1]}`
      let singleChar = `${zhuyin_arr[zhuyin_index]}`
      if(!!VirtualKeyboard.Z2P[doubleChar]) {
        converted_string += VirtualKeyboard.Z2P[doubleChar]
        zhuyin_index += 2
      }
      else if(!!VirtualKeyboard.Z2P[singleChar]) {
        converted_string += VirtualKeyboard.Z2P[singleChar]
        zhuyin_index += 1      
      }
      else {
        console.log("CHAR NOT FOUND!", singleChar, doubleChar)
        zhuyin_index += 1
      }
    }
    return converted_string
  }

  maxPageRows() {return 2}

  makeCommandList() {
    let input = this.z2p(this._entry)
    const dictionary = SceneManager._scene._virtualKeyboard._pinyin
    if(!dictionary[input]) {return;}
    const candidates = dictionary[input].split("")
    for(const candidate of candidates) {
      this.addCommand(candidate, "candidate")
    }
  }

  getCandidate() {
    let candidate = this._list[this.index()]
    if(!candidate) {return SoundManager.playBuzzer()}
    candidate = candidate.name
    SceneManager._scene._nameInputNameWindow.add(candidate)
    this._entry = ""
    this.refresh()
  }
  
  add(char) {
    this._entry += char
    this.refresh()
    return true
  }

  back() {
    if(this._entry.length <= 0) {
      return SceneManager._scene._nameInputNameWindow.back()
    }
    this._entry = this._entry.split("")
    this._entry.pop()
    this._entry = this._entry.join("")
    this.refresh()
    return true
  }

  refresh() {
    super.refresh()
    this.drawText(this._entry,0,0,this.contents.width, "left")
  }

  itemRect(index) {
    const rect = super.itemRect(index)
    rect.y += rect.height 
    return rect
  }

  drawItem(index) {
    const rect = this.itemRect(index)
    this.drawText(this.commandName(index), rect.x, rect.y, rect.width, "center")
  }

  setup() {
    this.select(0)
    this.activate()
  }
}