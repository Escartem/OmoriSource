// //=============================================================================
// // * Start
// //=============================================================================
// Scene_Menu.prototype.start = function() {
//   Scene_MenuBase.prototype.start.call(this);

//   if (!$tits) {
// //   //TEST
//   this._commandWindow.select(4);
//   // this._statusWindow.select(3);
//   this._commandWindow.deactivate();

//   this.commandOptions();

//     // $tits = true;
//   }


// };

// window['$tits'] = false;
// FIX ISSUE WITH CONTROLLER WINDOW WHERE EXITING IT MAKES
// A CURSOR BRIEFLY APPEAR WHEN CLOSING THE SCENE

//=============================================================================
// * Key Names
//=============================================================================
KeyboardInput.gamepadNames = {
  0: 'ok',        // A
  1: 'cancel',    // B
  2: 'shift',     // X
  3: 'menu',      // Y
  4: 'LB',        // LB
  5: 'RB',        // RB

  6: 'SIX6',
  7: 'SEVEN7',
  8: 'EIGHT8',
  9: 'NINE9',
  10: 'TEN10',
  11: 'ELEVEN11',

  12: 'up',       // D-pad up
  13: 'down',     // D-pad down
  14: 'left',     // D-pad left
  15: 'right',    // D-pad right
  16: 'SIXTEEN16',
};
//=============================================================================
// * Key Names
//=============================================================================
KeyboardInput.keyNames = {
  0: 'NO KEYCODE',
  3: 'break',
  8: 'backspace',
  9: 'tab',
  12: 'clear',
  13: 'enter',
  16: 'shift',
  // 17: 'ctrl',
  // 18: 'alt',
  19: 'pause/break',
  20: 'caps lock',
  21: 'hangul',
  25: 'hanja',
  27: 'escape',
  28: 'conversion',
  29: 'non-conversion',
  32: 'spacebar',
  33: 'page up',
  34: 'page down',
  35: 'end',
  36: 'home',
  37: 'left arrow',
  38: 'up arrow',
  39: 'right arrow',
  40: 'down arrow',
  41: 'select',
  42: 'print',
  43: 'execute',
  44: 'Print Screen',
  45: 'insert',
  46: 'delete',
  47: 'help',
  48: '0',
  49: '1',
  50: '2',
  51: '3',
  52: '4',
  53: '5',
  54: '6',
  55: '7',
  56: '8',
  57: '9',
  58: ':',
  59: 'semicolon (firefox), equals',
  60: '<',
  61: 'equals (firefox)',
  63: 'ß',
  64: '@ (firefox)',
  65: 'a',
  66: 'b',
  67: 'c',
  68: 'd',
  69: 'e',
  70: 'f',
  71: 'g',
  72: 'h',
  73: 'i',
  74: 'j',
  75: 'k',
  76: 'l',
  77: 'm',
  78: 'n',
  79: 'o',
  80: 'p',
  81: 'q',
  82: 'r',
  83: 's',
  84: 't',
  85: 'u',
  86: 'v',
  87: 'w',
  88: 'x',
  89: 'y',
  90: 'z',
  91: 'Windows Key / Left ⌘ / Chromebook Search key',
  92: 'right window key',
  93: 'Windows Menu / Right ⌘',
  95: 'sleep',
  96: 'numpad 0',
  97: 'numpad 1',
  98: 'numpad 2',
  99: 'numpad 3',
  100: 'numpad 4',
  101: 'numpad 5',
  102: 'numpad 6',
  103: 'numpad 7',
  104: 'numpad 8',
  105: 'numpad 9',
  106: 'multiply',
  107: 'add',
  108: 'numpad period (firefox)',
  109: 'subtract',
  110: 'decimal point',
  111: 'divide',
  112: 'f1',
  113: 'f2',
  114: 'f3',
  // 115: 'f4',
  // 116: 'f5',
  117: 'f6',
  118: 'f7',
  119: 'f8',
  // 120: 'f9',
  121: 'f10',
  122: 'f11',
  123: 'f12',
  124: 'f13',
  125: 'f14',
  126: 'f15',
  127: 'f16',
  128: 'f17',
  129: 'f18',
  130: 'f19',
  131: 'f20',
  132: 'f21',
  133: 'f22',
  134: 'f23',
  135: 'f24',
  144: 'num lock',
  145: 'scroll lock',
  160: '^',
  161: '!',
  162: '؛ (arabic semicolon)',
  163: '#',
  164: '$',
  165: 'ù',
  166: 'page backward',
  167: 'page forward',
  168: 'refresh',
  169: 'closing paren (AZERTY)',
  170: '*',
  171: '~ + * key',
  172: 'home key',
  173: 'minus (firefox), mute/unmute',
  174: 'decrease volume level',
  175: 'increase volume level',
  176: 'next',
  177: 'previous',
  178: 'stop',
  179: 'play/pause',
  180: 'e-mail',
  181: 'mute/unmute (firefox)',
  182: 'decrease volume level (firefox)',
  183: 'increase volume level (firefox)',
  186: ';',
  187: 'equal sign',
  188: 'comma',
  189: 'dash',
  190: '.',
  191: 'forward slash / ç',
  192: 'grave accent / ñ / æ / ö',
  193: '?, / or °',
  194: 'numpad period (chrome)',
  219: '[',
  220: "\\",
  221: ']',
  222: '\'',
  223: '`',
  224: 'left or right ⌘ key (firefox)',
  225: 'altgr',
  226: '< /git >, left back slash',
  230: 'GNOME Compose Key',
  231: 'ç',
  233: 'XF86Forward',
  234: 'XF86Back',
  235: 'non-conversion',
  240: 'alphanumeric',
  242: 'hiragana/katakana',
  243: 'half-width/full-width',
  244: 'kanji',
  251: "unlock trackpad (Chrome/Edge)",
  255: 'toggle touchpad',
};
//=============================================================================
// * Get Keyboard Key Name
//=============================================================================
KeyboardInput.getKeyName = function(key) {
  // Get Key Name
  var name = this.keyNames[key];
  return name ? name : 'ERROR!';
};
//=============================================================================
// * Get Gamepad Button Name Mapper
//=============================================================================
KeyboardInput.getGamepadButtonName = function(button) {
  // Get Key Name
  var name = this.gamepadNames[button];
  return name ? name : 'ERROR!';
};


















//=============================================================================
// ** Scene_OmoMenuOptions
//-----------------------------------------------------------------------------
// The scene class of the equipment screen.
//=============================================================================
function Scene_OmoMenuOptions() { this.initialize.apply(this, arguments); }
Scene_OmoMenuOptions.prototype = Object.create(Scene_OmoMenuBase.prototype);
Scene_OmoMenuOptions.prototype.constructor = Scene_OmoMenuOptions;
//=============================================================================
// * Create
//=============================================================================
Scene_OmoMenuOptions.prototype.create = function() {
  // Super Call
  Scene_OmoMenuBase.prototype.create.call(this);
  this.createHelpWindow();
  this.createStatusWindows();
  this.createGoldWindow();

  this.createGeneralOptionsWindow();
  this.createAudioOptionsWindow();
  this.createControllerOptionsWindow();
  this.createSystemOptionsWindow();
  this.createOptionCategoriesWindow();
  // this.createHelpWindow();
  this.createCommandWindow();
  this.createExitPromptWindow();
};
//=============================================================================
// * Initialize Atlas Lists
//=============================================================================
Scene_OmoMenuOptions.prototype.initAtlastLists = function() {
  // Super Call
  Scene_MenuBase.prototype.initAtlastLists.call(this);
  // Load Input Icons
  ImageManager.loadInputIcons();
};
//=============================================================================
// * Start
//=============================================================================
Scene_OmoMenuOptions.prototype.start = function() {
  // Super Call
  Scene_OmoMenuBase.prototype.start.call(this);
  // Show Windows
  this.showWindows();
};
//=============================================================================
// * Create Help Window
//=============================================================================
Scene_OmoMenuOptions.prototype.createHelpWindow = function() {
  // Create Help Window
  this._helpWindow = new Window_OmoMenuOptionsHelp();
  this._helpWindow.x = 10;
  this._helpWindow.y = 10;
  this.addChild(this._helpWindow);
};
//=============================================================================
// * Create Gold Window
//=============================================================================
Scene_OmoMenuOptions.prototype.createGoldWindow = function() {
  this._goldWindow = new Window_Gold(0, 0);
  this._goldWindow.x = (Graphics.boxWidth - this._goldWindow.width) - 10;
  this._goldWindow.y = (this._commandWindow.y + this._commandWindow.height) + 8;
  this._goldWindow.openness = 255;
  this._goldWindow.close();
  this.addChild(this._goldWindow);
};
//=============================================================================
// * Create Option Categories Window
//=============================================================================
Scene_OmoMenuOptions.prototype.createOptionCategoriesWindow = function() {
  // Create Options Categories Window
  this._optionCategoriesWindow = new Window_OmoMenuOptionsCategory();
  this._optionCategoriesWindow.x = 10;
  this._optionCategoriesWindow.y = 10;
  this._optionCategoriesWindow.deactivate();

  this._optionCategoriesWindow.setHandler('ok', this.onCategoryOk.bind(this));
  this._optionCategoriesWindow.setHandler('cancel', this.onCategoryCancel.bind(this));
  this.addChild(this._optionCategoriesWindow);

  // Get Option Windows
  var optionWindows = this.optionWindows();
  // Set Option Categories Window Option Windows
  this._optionCategoriesWindow._optionWindows = optionWindows;
  // Set Help Window for Option Windows
  for (var i = 0; i < optionWindows.length; i++) { optionWindows[i]._helpWindow = this._helpWindow; };
  // Call Update Help
  this._optionCategoriesWindow.callUpdateHelp();
};
//=============================================================================
// * Create General Options Window
//=============================================================================
Scene_OmoMenuOptions.prototype.createGeneralOptionsWindow = function() {
  // Create General Options Window
  this._generalOptionsWindow = new Window_OmoMenuOptionsGeneral();
  this._generalOptionsWindow.x = 10;
  this._generalOptionsWindow.y = 10;
  this._generalOptionsWindow.setHandler('cancel', this.onOptionWindowCancel.bind(this));
  this._generalOptionsWindow.height = 0;
  this._generalOptionsWindow.visible = false;
  this.addChild(this._generalOptionsWindow);
};
//=============================================================================
// * Create Audio Options Window
//=============================================================================
Scene_OmoMenuOptions.prototype.createAudioOptionsWindow = function() {
  // Create Audio Options Window
  this._audioOptionsWindow = new Window_OmoMenuOptionsAudio();
  this._audioOptionsWindow.x = 10;
  this._audioOptionsWindow.y = 10;
  this._audioOptionsWindow.setHandler('cancel', this.onOptionWindowCancel.bind(this));
  this._audioOptionsWindow.height = 0;
  this._audioOptionsWindow.visible = false;
  this.addChild(this._audioOptionsWindow);
};
//=============================================================================
// * Create Controller Options Window
//=============================================================================
Scene_OmoMenuOptions.prototype.createControllerOptionsWindow = function() {
  // Create Control Options Window
  this._controlOptionsWindow = new Window_OmoMenuOptionsControls();
  this._controlOptionsWindow.x = 10;
  this._controlOptionsWindow.y = 10;
  this._controlOptionsWindow.setHandler('cancel', this.onOptionWindowCancel.bind(this));
  this._controlOptionsWindow.height = 0;
  this._controlOptionsWindow.visible = false;
  this.addChild(this._controlOptionsWindow);
};
//=============================================================================
// * Create System Options Window
//=============================================================================
Scene_OmoMenuOptions.prototype.createSystemOptionsWindow = function() {
  // Create System Option Window
  this._systemOptionsWindow = new Window_OmoMenuOptionsSystem();
  this._systemOptionsWindow.x = 10;
  this._systemOptionsWindow.y = 10;
  this._systemOptionsWindow.setHandler('cancel', this.onOptionWindowCancel.bind(this));
  this._systemOptionsWindow.setHandler('restoreConfig', () => {
    ConfigManager.restoreDefaultConfig();
    this._controlOptionsWindow.makeOptionsList()
    this._generalOptionsWindow.makeOptionsList();
    this._audioOptionsWindow.makeOptionsList();
    
    this._controlOptionsWindow.refresh()
    this._controlOptionsWindow.select(0);
    this._generalOptionsWindow.refresh();
    this._generalOptionsWindow.select(0);
    this._audioOptionsWindow.refresh();
    this._systemOptionsWindow.refresh();
    this._systemOptionsWindow.activate();
    Input.clear();
  });
  this._systemOptionsWindow.setHandler('load', this.goToLoad.bind(this));
  this._systemOptionsWindow.setHandler('toTitleScreen', this.startExitPrompt.bind(this, 1));  
  this._systemOptionsWindow.setHandler('exit', this.startExitPrompt.bind(this, 0));  
  this.addChild(this._systemOptionsWindow);
};
//=============================================================================
// * Create Exit Prompt Window
//=============================================================================
Scene_OmoMenuOptions.prototype.createExitPromptWindow = function() {
  // Create Exit Prompt Window
  this._exitPromptWindow = new Window_OmoMenuOptionsExitPromptWindow();
  this._exitPromptWindow.x = (Graphics.width - this._exitPromptWindow.width) / 2;
  this._exitPromptWindow.y = (Graphics.height - this._exitPromptWindow.height) / 2  
  this._exitPromptWindow.setHandler('yes', this.onExitPromptYes.bind(this));
  this._exitPromptWindow.setHandler('cancel', this.onExitPromptCancel.bind(this));
  this.addChild(this._exitPromptWindow);
};
//=============================================================================
// * Get All Option Windows
//=============================================================================
Scene_OmoMenuOptions.prototype.optionWindows = function() {
  return [this._generalOptionsWindow, this._audioOptionsWindow, this._controlOptionsWindow, this._systemOptionsWindow]
}
//=============================================================================
// * On Option Category Ok
//=============================================================================
Scene_OmoMenuOptions.prototype.onCategoryOk = function() {
  // Get Category Window
  var categoryWindow = this.optionWindows()[this._optionCategoriesWindow.index()];
  // If Category Window Exists
  if (categoryWindow) {
    categoryWindow.activate();
    categoryWindow.select(0);
  } else {
    // Activate Categories Window
    this._optionCategoriesWindow.activate();
  };
};
//=============================================================================
// * On Option Category Cancel
//=============================================================================
Scene_OmoMenuOptions.prototype.onCategoryCancel = function() {
  // Save Configuration
  ConfigManager.save();
  this.hideWindows();
  // this._statusWindow.deselect();
  // this._statusWindow.deactivate();

  // this.queue('hideWindow', this._itemCategoryWindow, 15)
  // this.queue('setWaitMode', 'movement');
  // // Show Command Window
  // this.queue(function() {
  //   this.popScene();
  //   SceneManager._nextScene._commandWindow = this._commandWindow;
  //   SceneManager._nextScene._statusWindow = this._statusWindow;
  // }.bind(this))
};
//=============================================================================
// * On Option Window Cancel
//=============================================================================
Scene_OmoMenuOptions.prototype.onOptionWindowCancel = function() {
  // Get Category Window
  var categoryWindow = this.optionWindows()[this._optionCategoriesWindow.index()];
  // If Category Window Exists
  if (categoryWindow) {
    categoryWindow.select(0);
    categoryWindow.refresh();
  };
  // Clear Help Window Text
  this._helpWindow.clear()
  // Activate Categories Window
  this._optionCategoriesWindow.activate();
};
//=============================================================================
// * Restore Default Configuration
//=============================================================================

/*Scene_OmoMenuBase.prototype.restoreDefaultConfiguration = function() {

}*/

//=============================================================================
// * Go To Load
//=============================================================================
Scene_OmoMenuBase.prototype.goToLoad = function() {
  // Save Configuration
  ConfigManager.save();
  // Call Save Menu
  SceneManager.push(Scene_OmoriFile);
  SceneManager._stack.pop();
  SceneManager._nextScene.setup(false, true);
};
//=============================================================================
// * Start Exit Prompt
//=============================================================================
Scene_OmoMenuBase.prototype.startExitPrompt = function(type) {
  this._exitPromptWindow.refresh(type);
  this._exitPromptWindow.select(1);
  this._exitPromptWindow.open();
  this._exitPromptWindow.activate();
};
//=============================================================================
// * On Exit Prompt Window Cancel
//=============================================================================
Scene_OmoMenuBase.prototype.onExitPromptCancel = function() {
  this._exitPromptWindow.deactivate();  
  this._exitPromptWindow.close();  
  this._systemOptionsWindow.activate();  
}
//=============================================================================
// * On Exit Prompt Window Yes
//=============================================================================
Scene_OmoMenuBase.prototype.onExitPromptYes = function() {
  // Fadeout All
  this.fadeOutAll();
  // Exit the game
  let type = this._exitPromptWindow._type;
  if(!type) {SceneManager.exit();}
  else {SceneManager.goto(Scene_OmoriTitleScreen)}
};
//=============================================================================
// * Start
//=============================================================================
Scene_OmoMenuOptions.prototype.update = function() {
  // Super Call
  Scene_OmoMenuBase.prototype.update.call(this);
  // Update Keyboard Input
  KeyboardInput.update()
};
//=============================================================================
// * Show Windows
//=============================================================================
Scene_OmoMenuBase.prototype.showWindows = function() {
  // Show Categories Window and Hide Status
  this.queue(function() {
    var duration = 15;
    // Go Through Status Windows
    for (var i = 0; i < this._statusWindow._statusWindows.length; i++) {
      var obj = this._statusWindow._statusWindows[i];
      var data = { obj: obj, properties: ['y', 'contentsOpacity'], from: {y: obj.y, contentsOpacity: obj.contentsOpacity}, to: {y: 110, contentsOpacity: 0}, durations: {y: duration, contentsOpacity: duration}}
      data.easing = Object_Movement.easeInCirc;
      this.move.startMove(data);
    };
    var obj = this._optionCategoriesWindow;
    var duration = 10;
    var data = { obj: obj, properties: ['y'], from: {y: obj.y}, to: {y: 64}, durations: {y: duration}}
    data.easing = Object_Movement.easeOutCirc;
    this.move.startMove(data);
  }.bind(this))
  this.queue('setWaitMode', 'movement');

  // Show Categories Window and Hide Status
  this.queue(function() {
    var duration = 15;
    var windows = this.optionWindows()
    // Go Through Option Windows Windows
    for (var i = 0; i < windows.length; i++) {
      var obj = windows[i];
      obj.y = this._optionCategoriesWindow.y;
      var data = { obj: obj, properties: ['y', 'height'], from: {y: obj.y, height: obj.height}, to: {y: 108, height: 318}, durations: {y: duration, height: duration}}
      data.easing = Object_Movement.easeOutCirc;
      this.move.startMove(data);
    }
  }.bind(this))
  this.queue('setWaitMode', 'movement');

  // Show Categories Window and Hide Status
  this.queue(function() {
    var obj = this._helpWindow;
    obj.y = Graphics.height - ((obj.height * 2) + 10);
    var duration = 10;
    var data = { obj: obj, properties: ['y'], from: {y: obj.y}, to: {y: obj.y + obj.height}, durations: {y: duration}}
    data.easing = Object_Movement.easeOutCirc;
    this.move.startMove(data);
  }.bind(this))
  this.queue('setWaitMode', 'movement');


  // Show Categories Window and Hide Status
  this.queue(function() {
    this._optionCategoriesWindow.activate();
  }.bind(this))
  this.queue('setWaitMode', 'movement');
};
//=============================================================================
// * Show Windows
//=============================================================================
Scene_OmoMenuBase.prototype.hideWindows = function() {

  // Show Categories Window and Hide Status
  this.queue(function() {
    var obj = this._helpWindow;
    var duration = 10;
    var data = { obj: obj, properties: ['y'], from: {y: obj.y}, to: {y: obj.y - obj.height}, durations: {y: duration}}
    data.easing = Object_Movement.easeOutCirc;
    this.move.startMove(data);
  }.bind(this))
  this.queue('setWaitMode', 'movement');



  // Show Categories Window and Hide Status
  this.queue(function() {
    this._helpWindow.y = 10;
    var duration = 15;
    var windows = this.optionWindows();
    // Go Through Option Windows Windows
    for (var i = 0; i < windows.length; i++) {
      var obj = windows[i];
      // Set Help window to null and deselect (Prevents visual error)
      obj._helpWindow = null;
      obj.deselect()
      var data = { obj: obj, properties: ['y', 'height'], from: {y: obj.y, height: obj.height}, to: {y: this._optionCategoriesWindow.y, height: 0}, durations: {y: duration, height: duration}}
      data.easing = Object_Movement.easeOutCirc;
      this.move.startMove(data);
    };

    // Go Through Status Windows
    for (var i = 0; i < this._statusWindow._statusWindows.length; i++) {
      var obj = this._statusWindow._statusWindows[i];
      var data = { obj: obj, properties: ['y', 'contentsOpacity'], from: {y: obj.y, contentsOpacity: obj.contentsOpacity}, to: {y: -110, contentsOpacity: 255}, durations: {y: duration, contentsOpacity: duration}}
      data.easing = Object_Movement.easeOutCirc;
      this.move.startMove(data);
    }

  }.bind(this))
  this.queue('setWaitMode', 'movement');


  // Hide categories window
  this.queue(function() {
    var obj = this._optionCategoriesWindow;
    var duration = 10;
    var data = { obj: obj, properties: ['y'], from: {y: obj.y}, to: {y: 10}, durations: {y: duration}}
    data.easing = Object_Movement.easeOutCirc;
    this.move.startMove(data);
  }.bind(this))

  this.queue('setWaitMode', 'movement');

  // Show Command Window
  this.queue(function() {

    this.popScene();
    SceneManager._nextScene._commandWindow = this._commandWindow;
    SceneManager._nextScene._statusWindow = this._statusWindow;
  }.bind(this))
};






















//=============================================================================
// ** Window_OmoMenuOptionsCategory
//-----------------------------------------------------------------------------
// The window for selecting option categories in the options menu
//=============================================================================
function Window_OmoMenuOptionsCategory() { this.initialize.apply(this, arguments); }
Window_OmoMenuOptionsCategory.prototype = Object.create(Window_Command.prototype);
Window_OmoMenuOptionsCategory.prototype.constructor = Window_OmoMenuOptionsCategory;
//=============================================================================
// * Settings
//=============================================================================
Window_OmoMenuOptionsCategory.prototype.isUsingCustomCursorRectSprite = function() { return true; };
Window_OmoMenuOptionsCategory.prototype.standardPadding = function() { return 10; }
Window_OmoMenuOptionsCategory.prototype.windowWidth = function() { return Graphics.width - 20; }
Window_OmoMenuOptionsCategory.prototype.maxCols = function() { return 4; };
Window_OmoMenuOptionsCategory.prototype.lineHeight = function() { return 24; };
Window_OmoMenuOptionsCategory.prototype.standardFontSize = function() { return LanguageManager.getMessageData("XX_BLUE.Window_OmoMenuOptionsCategory").standardFontSize; };
Window_OmoMenuOptionsCategory.prototype.customCursorRectYOffset = function() { return 4; }
Window_OmoMenuOptionsCategory.prototype.customCursorRectTextXOffset = function() { return 25; }
//=============================================================================
// * Make Command List
//=============================================================================
Window_OmoMenuOptionsCategory.prototype.makeCommandList = function() {
  const localization = LanguageManager.getMessageData("XX_BLUE.Omori_Mainmenu_Sceneoptions").commands
  this.addCommand(localization[0], 'ok');
  this.addCommand(localization[1], 'ok');
  // this.addCommand('GAMEPLAY', 'ok');
  this.addCommand(localization[2], 'ok');
  this.addCommand(localization[3], 'ok');
};
//=============================================================================
// * Item Rect
//=============================================================================
Window_OmoMenuOptionsCategory.prototype.itemRect = function(index) {
  // Get rect
  var rect = Window_Command.prototype.itemRect.call(this, index);
  // rect.width += 20;
  rect.y -= 3;
  // // If Index 1 (For Visual centering)
  // if (index === 1) { rect.x += 20 };
  // Return Rect
  return rect;
};
//=============================================================================
// * Call Update Help
//=============================================================================
Window_OmoMenuOptionsCategory.prototype.callUpdateHelp = function() {
  // Run Original Function
  Window_Command.prototype.callUpdateHelp.call(this);

  if (this._optionWindows) {
    // Get Index
    var index = this.index();
    for (var i = 0; i < this._optionWindows.length; i++) {
      this._optionWindows[i].visible = i === index;
    };
  };
};







//=============================================================================
// ** Window_OmoMenuOptionsHelp
//-----------------------------------------------------------------------------
// The window for selecting option categories in the options menu
//=============================================================================
function Window_OmoMenuOptionsHelp() { this.initialize.apply(this, arguments); }
Window_OmoMenuOptionsHelp.prototype = Object.create(Window_Base.prototype);
Window_OmoMenuOptionsHelp.prototype.constructor = Window_OmoMenuOptionsHelp;
//=============================================================================
// * Object Initialization
//=============================================================================
Window_OmoMenuOptionsHelp.prototype.initialize = function() {
  // Super Call
  Window_Base.prototype.initialize.call(this, 10, 0, this.windowWidth(), this.windowHeight());
};
//=============================================================================
// * Settings
//=============================================================================
Window_OmoMenuOptionsHelp.prototype.standardPadding = function() { return 8; }
Window_OmoMenuOptionsHelp.prototype.windowHeight = function() { return 44; }
Window_OmoMenuOptionsHelp.prototype.windowWidth = function() { return Graphics.width - 20; }
Window_OmoMenuOptionsHelp.prototype.lineHeight = function() { return 24; };
Window_OmoMenuOptionsHelp.prototype.customCursorRectTextXOffset = function() { return 25; }
//=============================================================================
// * Clear
//=============================================================================
Window_OmoMenuOptionsHelp.prototype.clear = function() { this.contents.clear(); };
//=============================================================================
// * Call Update Help
//=============================================================================
Window_OmoMenuOptionsHelp.prototype.setText = function(text) {
  // Clear Contents
  this.contents.clear();
  // Draw Text
  this.contents.drawText(text, 5, 0, this.contents.width, this.contents.height - 8);
};




//=============================================================================
// ** Window_OmoMenuOptionsGeneral
//-----------------------------------------------------------------------------
// The window for showing general options in the options menu.
//=============================================================================
function Window_OmoMenuOptionsGeneral() { this.initialize.apply(this, arguments); }
Window_OmoMenuOptionsGeneral.prototype = Object.create(Window_Selectable.prototype);
Window_OmoMenuOptionsGeneral.prototype.constructor = Window_OmoMenuOptionsGeneral;
//=============================================================================
// * Object Initialization
//=============================================================================
Window_OmoMenuOptionsGeneral.prototype.initialize = function() {
  // Make Options List
  this.makeOptionsList();
  // Super Call
  Window_Selectable.prototype.initialize.call(this, 0, 0, this.windowWidth(), this.windowHeight());
  // Create Option Cursors
  this.createOptionCursors();
  this.select(0);
  this.refresh();
};
//=============================================================================
// * Settings
//=============================================================================
Window_OmoMenuOptionsGeneral.prototype.isUsingCustomCursorRectSprite = function() { return true; };
Window_OmoMenuOptionsGeneral.prototype.standardPadding = function() { return 8; }
Window_OmoMenuOptionsGeneral.prototype.windowWidth = function () { return Graphics.width -  20; };
Window_OmoMenuOptionsGeneral.prototype.windowHeight = function() { return 318; }
Window_OmoMenuOptionsGeneral.prototype.maxItems = function() { return this._optionsList.length;};
Window_OmoMenuOptionsGeneral.prototype.maxCols = function() { return 1;};
Window_OmoMenuOptionsGeneral.prototype.itemHeight = function() { return 75; };
Window_OmoMenuOptionsGeneral.prototype.spacing = function() { return 5; };
Window_OmoMenuOptionsGeneral.prototype.customCursorRectXOffset = function() { return 15; }
Window_OmoMenuOptionsGeneral.prototype.customCursorRectYOffset = function() { return -18; }
//=============================================================================
// * Height
//=============================================================================
Object.defineProperty(Window_OmoMenuOptionsGeneral.prototype, 'height', {
  get: function() { return this._height; },
  set: function(value) {
    this._height = value;
    this._refreshAllParts();
    // If Option Cursors Exist
    if (this._optionCursors) {
      for (var i = 0; i < this._optionCursors.length; i++) {
        var sprite = this._optionCursors[i];
        sprite.visible = value >= (sprite.y + sprite.height)
      };
    }
  },
  configurable: true
});
//=============================================================================
// * Refresh Arrows
//=============================================================================
Window_OmoMenuOptionsGeneral.prototype._refreshArrows = function() {
  // Run Original Function
  Window_Selectable.prototype._refreshArrows.call(this);
  var w = this._width;
  var h = this._height;
  var p = 28;
  var q = p/2;
  this._downArrowSprite.move(w - q, h - q);
  this._upArrowSprite.move(w - q, q);
};
//=============================================================================
// * Create Option Cursors
//=============================================================================
Window_OmoMenuOptionsGeneral.prototype.createOptionCursors = function() {
  // Initialize Option Cursors
  this._optionCursors = [];
  // Create Cursor Sprites
  for (var i = 0; i < 4; i++) {
    // Create Sprite
    var sprite = new Sprite_WindowCustomCursor(undefined, this.customCursorRectBitmapName());
    sprite.deactivate();
    sprite.visible = false;
    sprite.setColorTone([-80, -80, -80, 255]);
    this._customCursorRectSpriteContainer.addChild(sprite);
    // Add Sprite to Option Cursors
    this._optionCursors[i] = sprite;
  };
};

Window_OmoMenuOptionsGeneral.prototype._updateArrows = function() {
  Window.prototype._updateArrows.call(this);
  this._downArrowSprite.visible = this._downArrowSprite.visible && !!this.active;
  this._upArrowSprite.visible = this._upArrowSprite.visible && !!this.active;
};
//=============================================================================
// * Make Options List
//=============================================================================
Window_OmoMenuOptionsGeneral.prototype.makeOptionsList = function() {
  // Get Text
  var text = LanguageManager.getPluginText('optionsMenu', 'general')
  // Get Config
  var config = ConfigManager;
  // Get Options
  var options = Object.keys(text);
  // Initialize Options List
  this._optionsList = [];
  // Go through Options
  for (var i = 0; i < options.length; i++) {
    // Get Name
    var name = options[i]
    // Get Data
    var data = text[name];
    // Create Option
    var option = {header: (data.text + ':'), options: Array.from(data.options), helpText: data.help, spacing: data.spacing};

    // If Bool index
    if (data.boolIndex) {
      // Set Index by state
      option.index = config[name] ? 0 : 1
    } else {
      // Set index
      option.index = config[name];
    };
    // Add Option
    this._optionsList.push(option);
  };
}
//=============================================================================
// * Draw Item
//=============================================================================
Window_OmoMenuOptionsGeneral.prototype.drawItem = function(index) {
  // Get Item Rect
  var rect = this.itemRect(index);
  // Get Data
  var data = this._optionsList[index];
  // If Data Exists
  if (data) {
    // Draw Option Segment
    this.drawOptionSegment(data.header, data.options, data.spacing, rect);
  };
};
//=============================================================================
// * Draw Option Segment
//=============================================================================
Window_OmoMenuOptionsGeneral.prototype.drawOptionSegment = function(header, options, spacing, rect) {
  // Draw Header
  this.contents.drawText(header, rect.x + 50, rect.y, rect.width, 24);
  // Go Through Options
  for (var i = 0; i < options.length; i++) {
    // Draw Options
    this.contents.drawText(options[i], rect.x + (100 + (i * spacing)), rect.y + 35, rect.width, 24)
  };
};
//=============================================================================
// * Frame Update
//=============================================================================
Window_OmoMenuOptionsGeneral.prototype.update = function(index) {
  // Check FullScreen Status
  var fullScreen = Graphics._isFullScreen();
  // Full Screen Check
  /*if (!fullScreen && this._optionsList[1].index !== 0) {
    this._optionsList[1].index = 0;
    this.updateCursor();
  };
  if (fullScreen && this._optionsList[1].index !== 1) {
    this._optionsList[1].index = 1;
    this.updateCursor();
  };*/
  // Run Original Function
  if(!!this._processDelay) {
    if(this._processDelay > 0) {
      this._processDelay--;
      if(this._processDelay === 8) {
        this._optionsList[this.index()].index === 0 ? Graphics._requestFullScreen() : Graphics._cancelFullScreen();
      }
      if(this._processDelay <= 0) {
        let gamepad = navigator.getGamepads()[Input._lastGamepad];
        if(!gamepad) {return;}
        for(let button of gamepad.buttons) {
          let descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(button), "pressed");
          Object.defineProperty(button, "pressed", descriptor);
        }
      }
      return;
    }
  }
  Window_Selectable.prototype.update.call(this);
};
//=============================================================================
// * Call Update Help
//=============================================================================
Window_OmoMenuOptionsGeneral.prototype.callUpdateHelp = function() {
  // Run Original Function
  Window_Selectable.prototype.callUpdateHelp.call(this);
  // If Help Window Exist
  if (this._helpWindow) {
    this._helpWindow.setText(this._optionsList[this.index()].helpText);
  };
};
//=============================================================================
// * Cursor Right
//=============================================================================
Window_OmoMenuOptionsGeneral.prototype.cursorRight = function(wrap) {
  // Super Call
  Window_Selectable.prototype.cursorRight.call(this, wrap);
  // Get Data
  var data = this._optionsList[this.index()];
  // Get Data
  if(this.index() === 0 && !Graphics._isFullScreen()) {
    SoundManager.playBuzzer();
    return;
  } 
  if (data) {
    // Set Data Index
    data.index = (data.index + 1) % data.options.length;
    // Process Option Command
    this.processOptionCommand();
    // Update Cursor
    this.updateCursor();
  }
};
//=============================================================================
// * Cursor Left
//=============================================================================
Window_OmoMenuOptionsGeneral.prototype.cursorLeft = function(wrap) {
  // Super Call
  Window_Selectable.prototype.cursorLeft.call(this, wrap);
  // Get Data
  var data = this._optionsList[this.index()];
  // Get Data
  if(this.index() === 0 && !Graphics._isFullScreen()) {
    SoundManager.playBuzzer();
    return;
  } 
  if (data) {
    // Get Max Items
    var maxItems = data.options.length;
    // Set Data Index
    data.index = (data.index - 1 + maxItems) % maxItems;
    // Process Option Command
    this.processOptionCommand();
    // Update Cursor
    this.updateCursor();
  };
};
//=============================================================================
// * Update Cursor
//=============================================================================
Window_OmoMenuOptionsGeneral.prototype.updateCursor = function() {
  // Run Original Function
  Window_Selectable.prototype.updateCursor.call(this);
  // Get Top Row
  var topRow = this.topRow();
  // Get Index
  var index = this.index();
  // If Option cursors Exist
  if (this._optionCursors) {
    // Go through Option Cursors
    for (var i = 0; i < this._optionCursors.length; i++) {
      // Get Sprite
      var sprite = this._optionCursors[i];
      // Get Real Index
      var realIndex = topRow + i;
      // Get Data
      var data = this._optionsList[realIndex];
      // Get Selected State
      var selected = this.active ? realIndex === index : false;
      // If Data Exists
      if (data) {
        // Get Item Rect
        var rect = this.itemRect(realIndex);
        // Set Sprite Color
        sprite.setColorTone(selected ? [0, 0, 0, 0] : [-80, -80, -80, 255])
        // Activate Selected Sprite
        selected ? sprite.activate() : sprite.deactivate();
        // Set Sprite Positions
        sprite.x = (rect.x + 65) +  (data.index * data.spacing);
        sprite.y = rect.y + 60;
        // Make Sprite Visible
        sprite.visible = this.height >= sprite.y + sprite.height;
      } else {
        // Deactivate Sprite
        sprite.deactivate();
        // Make Sprite Invisible
        sprite.visible = false;
      };
    };
  }
};
//=============================================================================
// * Process Option Command
//=============================================================================
Window_OmoMenuOptionsGeneral.prototype.processOptionCommand = function() {
  // Get Index
  var index = this.index();
  // Get Data
  var data = this._optionsList[index];
  // Switch Case Index
  switch (index) {
    case 0: // Screen Resolution
      // Set Width & Height
      Yanfly.Param.ScreenWidth = 640 * (data.index + 1);
      Yanfly.Param.ScreenHeight = 480 * (data.index + 1) ;
      SceneManager._screenWidth  = Yanfly.Param.ScreenWidth;
      SceneManager._screenHeight = Yanfly.Param.ScreenHeight;
      // SceneManager._boxWidth     = Yanfly.Param.ScreenWidth;
      // SceneManager._boxHeight    = Yanfly.Param.ScreenHeight
      Yanfly.updateResolution();
      Yanfly.moveToCenter();
      //window.moveTo(x, y);
      // Set Config Manager Screen Resolution
      ConfigManager.screenResolution = data.index;
    break;
    case 1: // Fullscreen
      // Set data Index
      //data.index === 0 ? Graphics._requestFullScreen() : Graphics._cancelFullScreen();
      // Set config manager Full screen state
      ConfigManager.fullScreen = data.index === 0 ? true : false;
      this._processDelay = 20;
      //Input.update();
    break;
    case 2: 
      ConfigManager.gamepadTips = data.index === 0 ? false : true;
      if(SceneManager._scene instanceof Scene_OmoriTitleScreen) {
        SceneManager._scene.refreshCommandHints(); // Refresh command title hints;
      }
      break;
    case 3: ConfigManager.textSkip = data.index === 0 ? true : false; break;
    //case 3: ConfigManager.battleAnimations = data.index === 0 ? true : false ;break;
    //case 4: ConfigManager.battleAnimationSpeed = data.index ;break;
    case 4: ConfigManager.battleLogSpeed = data.index; ;break;
    case 5: ConfigManager.alwaysDash = data.index === 0 ? true : false ;break;
  };
};




//=============================================================================
// ** Window_OmoMenuOptionsAudio
//-----------------------------------------------------------------------------
// The window for showing audio options in the options menu
//=============================================================================
function Window_OmoMenuOptionsAudio() { this.initialize.apply(this, arguments); }
Window_OmoMenuOptionsAudio.prototype = Object.create(Window_Selectable.prototype);
Window_OmoMenuOptionsAudio.prototype.constructor = Window_OmoMenuOptionsAudio;
//=============================================================================
// * Object Initialization
//=============================================================================
Window_OmoMenuOptionsAudio.prototype.initialize = function() {
  // Make Options List
  this.makeOptionsList();
  // Super Call
  Window_Selectable.prototype.initialize.call(this, 0, 0, this.windowWidth(), this.windowHeight());
  // Create Volume Bars
  this.createVolumeBars();
  this.select(0);
  // Refresh
  this.refresh();
};
//=============================================================================
// * Settings
//=============================================================================
Window_OmoMenuOptionsAudio.prototype.isUsingCustomCursorRectSprite = function() { return true; };
Window_OmoMenuOptionsAudio.prototype.standardPadding = function() { return 8; }
Window_OmoMenuOptionsAudio.prototype.windowWidth = function () { return Graphics.width -  20; };
Window_OmoMenuOptionsAudio.prototype.windowHeight = function() { return 318; }
Window_OmoMenuOptionsAudio.prototype.maxItems = function() { return this._optionsList.length;};
Window_OmoMenuOptionsAudio.prototype.maxCols = function() { return 1;};
Window_OmoMenuOptionsAudio.prototype.itemHeight = function() { return 75; };
Window_OmoMenuOptionsAudio.prototype.spacing = function() { return 5; };
Window_OmoMenuOptionsAudio.prototype.customCursorRectXOffset = function() { return 15; }
Window_OmoMenuOptionsAudio.prototype.customCursorRectYOffset = function() { return -18; }
//=============================================================================
// * Height
//=============================================================================
Object.defineProperty(Window_OmoMenuOptionsAudio.prototype, 'height', {
  get: function() { return this._height; },
  set: function(value) {
    this._height = value;
    this._refreshAllParts();
    // If Volume Sprites Exist
    if (this._volumeSprites) {
      for (var i = 0; i < this._volumeSprites.length; i++) {
        var sprite = this._volumeSprites[i];
        sprite.visible = value >= (sprite.y + sprite.height)
      };
    }
  },
  configurable: true
});
//=============================================================================
// * Create Volume Bars
//=============================================================================
Window_OmoMenuOptionsAudio.prototype.createVolumeBars = function() {
  // Initialize Volume Sprites
  this._volumeSprites = [];
  // Create Bitmap
  var bitmap = new Bitmap(400, 40);
  // Iterate from 0 to 100
  for (var i = 0; i < 100; i++) {
    var x = (i + 4 ) + (i % 2);;
    var x = (i * 4);
    bitmap.fillRect(x, 0, 2, 20, 'rgba(100, 100, 100, 1)');
    bitmap.fillRect(x, 20, 2, 20, 'rgba(255, 255, 255, 1)');
  };
  // Create Sprites
  for (var i = 0; i < 8; i++) {
    var sprite = new Sprite(bitmap);
    var index = Math.floor(i / 2);
    var rect = this.itemRect(index);
    sprite.x = rect.x + 60;
    sprite.y = rect.y + 50;
    // sprite.y += (i % 2) * 20;
    sprite.setFrame(0, (i % 2) * 20, bitmap.width, 20);
    this._volumeSprites.push(sprite);
    this.addChild(sprite);
  };
};
//=============================================================================
// * Make Options List
//=============================================================================
Window_OmoMenuOptionsAudio.prototype.makeOptionsList = function() {
  // Get Text
  var text = LanguageManager.getPluginText('optionsMenu', 'audio')
  // Get Config
  var config = ConfigManager;
  // Get Options
  var options = Object.keys(text);
  // Initialize Options List
  this._optionsList = [];
  // Go Through Options
  for (var i = 0; i < options.length; i++) {
    // Get Name
    var name = options[i];
    // Get Data
    var data = text[name];
    // Add Option
    this._optionsList.push({header: data.text + ':', config: name, volume: AudioManager[name], helpText: data.help});
  };
}
//=============================================================================
// * Draw Item
//=============================================================================
Window_OmoMenuOptionsAudio.prototype.drawItem = function(index) {
  // Get Item Rect
  var rect = this.itemRect(index);
  // Get Data
  var data = this._optionsList[index];
  // If Data Exists
  if (data) {
    // Draw Header
    this.contents.drawText(data.header, rect.x + 50, rect.y, rect.width, 24);
    // Update volume bar
    this.updateVolumeBar(index, data.volume);
  };
};
//=============================================================================
// * Call Update Help
//=============================================================================
Window_OmoMenuOptionsAudio.prototype.callUpdateHelp = function() {
  // Run Original Function
  Window_Selectable.prototype.callUpdateHelp.call(this);
  // If Help Window Exist
  if (this._helpWindow) {
    this._helpWindow.setText(this._optionsList[this.index()].helpText);
  };
};
//=============================================================================
// * Cursor Right
//=============================================================================
Window_OmoMenuOptionsAudio.prototype.cursorRight = function(wrap) {
  // Super Call
  Window_Selectable.prototype.cursorRight.call(this, wrap);
  // Get Data
  var data = this._optionsList[this.index()];
  // Get Data
  if (data) {
    var rate = Input.isLongPressed('right') ? 5 : 1
    data.volume = Math.min(data.volume + rate, 100);
    this.updateVolumeBar(this.index(), data.volume);
  };
};
//=============================================================================
// * Cursor Left
//=============================================================================
Window_OmoMenuOptionsAudio.prototype.cursorLeft = function(wrap) {
  // Super Call
  Window_Selectable.prototype.cursorLeft.call(this, wrap);
  // Get Data
  var data = this._optionsList[this.index()];
  // Get Data
  if (data) {
    var rate = Input.isLongPressed('left') ? 5 : 1
    data.volume = Math.max(data.volume - rate, 0);
    this.updateVolumeBar(this.index(), data.volume);
  };
};
//=============================================================================
// * Cursor Left
//=============================================================================
Window_OmoMenuOptionsAudio.prototype.updateVolumeBar = function(index, volume) {
  // Get Data
  var data = this._optionsList[index];
  // Get Back and Front Sprite
  var front = this._volumeSprites[(index * 2) + 1 ];
  front._frame.width = volume * 4;
  front._refresh();
  // Get Itm Rect
  var rect = this.itemRect(index);
  rect.x += 415; rect.y += 27; rect.width = 100; rect.height = 40;
  this.contents.clearRect(rect.x, rect.y, rect.width, rect.height)
  this.contents.drawText(volume + '%', rect.x, rect.y, rect.width, rect.height, 'right');
  // Set Volume
  ConfigManager[data.config] = volume;
};




//=============================================================================
// ** Window_OmoMenuOptionsControls
//-----------------------------------------------------------------------------
// The window for showing audio options in the options menu
//=============================================================================
function Window_OmoMenuOptionsControls() { this.initialize.apply(this, arguments); }
Window_OmoMenuOptionsControls.prototype = Object.create(Window_Selectable.prototype);
Window_OmoMenuOptionsControls.prototype.constructor = Window_OmoMenuOptionsControls;
//=============================================================================
// * Object Initialization
//=============================================================================
Window_OmoMenuOptionsControls.prototype.initialize = function() {
  // Set Waiting for Input Flag
  this._waitingForInput = false;
  // Make Options List
  this.makeOptionsList();
  // Super Call
  Window_Selectable.prototype.initialize.call(this, 0, 0, this.windowWidth(), this.windowHeight());
  // Create Key Prompt Window
  this.createKeyPromptWindow();
  // Set Ok Handler
  this.setHandler('ok', this.onCommandOk.bind(this));
  this.select(0);
  // Refresh
  this.refresh();
};
//=============================================================================
// * Settings
//=============================================================================
Window_OmoMenuOptionsControls.prototype.isUsingCustomCursorRectSprite = function() { return true; };
Window_OmoMenuOptionsControls.prototype.standardPadding = function() { return 8; }
Window_OmoMenuOptionsControls.prototype.windowWidth = function () { return Graphics.width -  20; };
Window_OmoMenuOptionsControls.prototype.windowHeight = function() { return 318; }
Window_OmoMenuOptionsControls.prototype.maxItems = function() { return this._optionsList.length;};
Window_OmoMenuOptionsControls.prototype.maxCols = function() { return 2;};
Window_OmoMenuOptionsControls.prototype.itemHeight = function() { return 30; };
Window_OmoMenuOptionsControls.prototype.itemWidth = function() { return 200; };
Window_OmoMenuOptionsControls.prototype.spacing = function() { return 5; };
Window_OmoMenuOptionsControls.prototype.customCursorRectXOffset = function() { return 15; }
Window_OmoMenuOptionsControls.prototype.customCursorRectYOffset = function() { return 5; }
Window_OmoMenuOptionsControls.prototype.maxPageRows = function() {
  var pageHeight = (this.height - 40) - this.padding * 2;
  return Math.floor(pageHeight / this.itemHeight());
};
//=============================================================================
// * Height
//=============================================================================
Object.defineProperty(Window_OmoMenuOptionsControls.prototype, 'height', {
  get: function() { return this._height; },
  set: function(value) {
    this._height = value;
    this._refreshAllParts();
    // Get Cursor Sprite
    var sprite = this._customCursorRectSprite;
    // Set Sprite Visibility
    if (sprite) { sprite.visible = this._height >= (sprite.y + sprite.height); };
  },
  configurable: true
});
//=============================================================================
// * Determine if Gamepad Exists
//=============================================================================
Window_OmoMenuOptionsControls.prototype.hasGamePad = function() {
  // If Navigator can get gamepads
  if (navigator.getGamepads) {
    // Get Gamepads
    var gamepads = navigator.getGamepads();
    // Has gamepad flag
    var hasGamePad = false;
    // Go Through Gamepads
    for (var i = 0; i < gamepads.length; i++) {
      // Set Has gamepad flag to true
      if (gamepads[i] !== null) { hasGamePad = true; };
    };
    // Return Gamepad flag
    return hasGamePad;
  };
  // Return false
  return false;
};
//=============================================================================
// * Create Key Prompt Window
//=============================================================================
Window_OmoMenuOptionsControls.prototype.createKeyPromptWindow = function() {
  // Create Key Prompt Window
  this._keyPromptWindow = new Window_Base(0, 0, this.windowWidth(), 51);
  this._keyPromptWindow.drawText(LanguageManager.getPluginText('optionsMenu', 'controls').pressKeyPrompt, 0, -15, this._keyPromptWindow.contents.width, 'center');
  this._keyPromptWindow.y = (this.height - this._keyPromptWindow.height) / 2;
  this._keyPromptWindow.openness = 0;
  this.addChild(this._keyPromptWindow);
};
//=============================================================================
// * Refresh Arrows
//=============================================================================
Window_OmoMenuOptionsControls.prototype._refreshArrows = function() {
  // Run Original Function
  Window_Selectable.prototype._refreshArrows.call(this);
  var w = this._width;
  var h = this._height;
  var p = 28;
  var q = p/2;
  this._downArrowSprite.move(w - q, h - q);
  this._upArrowSprite.move(w - q, q);
};
//=============================================================================
// * Make Options List
//=============================================================================
Window_OmoMenuOptionsControls.prototype.itemRect = function(index) {
  // Get rect
  var rect = Window_Selectable.prototype.itemRect.call(this, index);
  rect.x += 150;
  rect.y += 40;
  // Return Rect
  return rect;
};
//=============================================================================
// * Make Options List
//=============================================================================
Window_OmoMenuOptionsControls.prototype.makeOptionsList = function() {
  // Backup Options List
  let old_options;
  if(!!this._optionsList) {old_options = this._optionsList.slice();}
  // Initialize Options List
  this._optionsList = [];
  // Get KeyMappers
  var keyMapper = Object.entries(Input.keyMapper);
  var gamepadMapper = Object.entries(Input.gamepadMapper);
  // Get Source Text
  var text = LanguageManager.getPluginText('optionsMenu', 'controls');
  // Get Input Names
  var inputNames = Object.keys(text.inputNames);

  var directionInputs = [12, 13, 14, 15];
  // Go through input Names
  for (var i = 0; i < inputNames.length; i++) {
    // Get Input
    var input = inputNames[i];
    // Get Column
    var column = (i % 2);
    // Get Key
    var key = Number(keyMapper.find(function(arr) { return arr[1] === input })[0]);
    // Add Options to List
    this._optionsList.push({header: text.inputNames[input], name: String(LanguageManager.getInputName('keyboard', key)).toUpperCase(), key: key, map: input, keyboard: true })
    // Get Key
    var key = Number(gamepadMapper.find(function(arr) { return arr[1] === input })[0]);
    // Add Options to List
    this._optionsList.push({header: text.inputNames[input], name:  String(LanguageManager.getInputName('gamepad', key)).toUpperCase(), key: key, map: input, gamepad: true, direction: directionInputs.contains(key) })
  };
  this._optionsList.push({header: '', name: text.resetAll, resetKeyboard: true})
  this._optionsList.push({header: '', name: text.resetAll, resetGamepad: true})
};

//=============================================================================
// * preventNumpadToDirectional
//=============================================================================
Window_OmoMenuOptionsControls.prototype.preventNumpadToDirectional = function(key, input) {
  let numpad = [97,98,99,100,101,102,103,104,105,106];
  let lowered_input = input.toLowerCase();
  let isDirectional = lowered_input.contains("right") || lowered_input.contains("left") || lowered_input.contains("up") || lowered_input.contains("down");
  if(!!isDirectional && numpad.contains(key)) {return true;}
  return false;
}

//=============================================================================
// * Refresh
//=============================================================================
Window_OmoMenuOptionsControls.prototype.refresh = function() {
  // Run Original Function
  Window_Selectable.prototype.refresh.call(this);
  // Draw Headers
  var width = (this.contents.width / 2) - 100
  // Get Source Text
  var text = LanguageManager.getPluginText('optionsMenu', 'controls');
  this.drawText(text.keyboardHeader, 200, 0, width);
  this.drawText(text.gamepadHeader, 400, 0, width);
};
//=============================================================================
// * Draw Item
//=============================================================================
Window_OmoMenuOptionsControls.prototype.drawItem = function(index) {
  // Get Item Rect
  var rect = this.itemRect(index);
  // Get Row
  var row = index % this.maxCols();
  // Get Data
  var data = this._optionsList[index];
  // If Row is 0
  if (row === 0) {
    // this.contents.drawInputIcon('', rect.x - 140, rect.y + 7);
    // Draw Header
    this.contents.drawText(data.header, rect.x - 140, rect.y, rect.width, rect.height);
  };
  // If Data Exists
  if (data) {
    rect.x += 50;
    // If Reset
    if (data.resetKeyboard || data.resetGamepad) {
      // Draw Header
      this.contents.drawText(data.name, rect.x, rect.y, rect.width, rect.height);
    };

    if (data.keyboard) {
      rect.x += 35;
      this.contents.drawKeyIcon(data.key, rect.x , rect.y + 7, "keyboardBlack24");
    }
    if (data.gamepad) {
      rect.x += 25;
      this.contents.drawKeyIcon(data.key, rect.x, rect.y + 7, 'gamepadBlack24', data.direction ? 1 : 0);
    };
   // console.log(data)
  };
};
//=============================================================================
// * Call Update Help
//=============================================================================
Window_OmoMenuOptionsControls.prototype.callUpdateHelp = function() {
  // Run Original Function
  Window_Selectable.prototype.callUpdateHelp.call(this);
  // If Help window exists
  if (this._helpWindow) {
    this._helpWindow.setText(LanguageManager.getPluginText('optionsMenu', 'controls').help)
  };
};
//=============================================================================
// * Frame Update
//=============================================================================
Window_OmoMenuOptionsControls.prototype.update = function() {
  // Run Original Function
  Window_Selectable.prototype.update.call(this);
  // If Waiting for Input
  if (this._waitingForInput) { this.updateInputReplacement(); };
};
//=============================================================================
// * On Command OK
//=============================================================================
Window_OmoMenuOptionsControls.prototype.onCommandOk = function() {
  // Get Data
  var data = this._optionsList[this.index()];
  // If Data Resets Keyboard
  if (data.resetKeyboard) {
    // Set Default Keyboard Mapping
    ConfigManager.setDefaultKeyboardKeyMap();
    this.makeOptionsList();
    this.refresh();
    this.activate();
  } else if (data.resetGamepad) {
    // Set Default Gamepad mapping
    ConfigManager.setDefaultGamepadKeyMap();
    this.makeOptionsList();
    this.refresh();
    this.activate();
  } else {
    // Get Index
    var index = this.index();
    // Get Column
    var column = index % 2;
    // Get Gamepad States
    var gamepadStates = Input._gamepadStates.filter(g => !!g.contains(true))[0]

    // Block Flag
    var block = false;
    var isWhat = -1; // 0 - Keyboard; 1 - Gamepad; 2 - Gamepad not detected;
    if (TouchInput.isPressed() || TouchInput.isTriggered()) { block = true;}
    if (column === 0) {
      if (gamepadStates && gamepadStates.contains(true)) { block = true; isWhat = 1; };
    } else {
      if (!this.hasGamePad()) { block = true; isWhat = 2;}
      else if (KeyboardInput._latestEvent) { block = true; isWhat = 0;}
    };
    // If Block
    if (block) {
      this.makeOptionsList();
      this.refresh();
      this.activate();
      this.pushInputWarningText(isWhat);
      return
    }
    // Set Waiting for Input to true
    this._waitingForInput = true;
    // Open Key Prompt Window
    this._keyPromptWindow.open();
  };
  // Set Gamepad Input Delay
  this._gamePadInputDelay = 30;
  // Clear Keyboard Input
  KeyboardInput.clear();
  Input.clear();
};
//=============================================================================
// * Push Input Warning Text
//=============================================================================

Window_OmoMenuOptionsControls.prototype.pushInputWarningText = function(type) {
  let text;
  switch(type) {
    case 0: // Keyboard
        text = LanguageManager.getPluginText('optionsMenu', 'inputWarning').gamepadMessage;
        break;
    case 1: // Gamepad
      text = LanguageManager.getPluginText('optionsMenu', 'inputWarning').keyboardMessage;
      break;
    case 2: // Gamepad not detected;
      text = LanguageManager.getPluginText('optionsMenu', 'inputWarning').gamepadNotDetected;
      break;
  }
  this._helpWindow.setText(text);
}

//=============================================================================
// * Update Input Replacement
//=============================================================================
Window_OmoMenuOptionsControls.prototype.updateInputReplacement = function() {
  // Get Index
  var index = this.index();
  // Get Column
  var column = index % 2;
  // If Column is 0 (Keyboard)
  if (column === 0) {
    // Get Event
    var event = KeyboardInput._latestEvent;
    // If Latest Event Exist
    if (event) {
      // Get Row
      var row = Math.floor(index / 2);
      // Get Data
      var data = this._optionsList[index];

      // Clear Input if Key Name does not exist
      // Keycode 91 is MetaLeft (Windows Button / Mac cmd)
      if (LanguageManager.getInputName('keyboard', event.keyCode) === undefined || !!this.preventNumpadToDirectional(event.keyCode,data.map) || event.keyCode === 91) {
        Input.clear();
        KeyboardInput.clear();
        return;
      };
      // Get Key Data
      var keyData = this._optionsList.find(function(o) { return o.keyboard && o.key === event.keyCode })
      // Get Existing Map
      var existingMap = Input.keyMapper[event.keyCode];
      // If Key Data Exists
      if (keyData) {
        delete Input.keyMapper[keyData.key];
        delete Input.keyMapper[data.key];
        Input.keyMapper[keyData.key] = data.map;
        Input.keyMapper[data.key] = keyData.map;
      } else {
        delete Input.keyMapper[data.key];
        Input.keyMapper[event.keyCode] = data.map;
      };
      // Clear Input
      Input.clear();
      KeyboardInput.clear();
      Input.update();
      // Remake Option List
      this.makeOptionsList();
      this.refresh();
      // console.log(column)
      this.activate();
      this._waitingForInput = false;
      // Close Key Prompt Window
      this._keyPromptWindow.close();
    }
  } else {
    // If Gamepad Input Delay is more than 0
    if (this._gamePadInputDelay > 0) {
      // Decrease Gamepad input delay
      this._gamePadInputDelay--;
      return;
    };
    // Get Gamepad States
    var gamepadStates = Input._gamepadStates.filter(g => !!g.contains(true))[0]
    // If cancel close the window
    if (Input.isTriggered('cancel')) {
      // If Gamepad States Exist
      if (gamepadStates) {
        // Get Input Index
        var inputIndex = gamepadStates.indexOf(true);
        if (inputIndex > -1) { return; }
      };
      this.activate();
      this._waitingForInput = false;
      // Close Key Prompt Window
      this._keyPromptWindow.close();
      return;
    };

    // If Gamepad States Exist
    if (gamepadStates) {
      // Get Input Index
      var inputIndex = gamepadStates.indexOf(true);
      // If Input Index is more than 0
      if (inputIndex > -1) {
        var buttonMap = Object.entries(Input.gamepadMapper);
        // Get Row
        var row = Math.floor(index / 2);
        // Get Key Data
        var keyData = this._optionsList[index];
        // Get Old Input
        var oldInput = Input.gamepadMapper[keyData.key];
        // Get Existing Map
        var newInput = Input.gamepadMapper[inputIndex];
        // Change Input
        Input.gamepadMapper[inputIndex] = oldInput;
        Input.gamepadMapper[keyData.key] = newInput;
        // Clear Input
        KeyboardInput.clear();
        Input.clear();
        Input.update();
        // Remake Option List
        this.makeOptionsList();
        this.refresh();
        this.select(index);
        this.activate();
        this._waitingForInput = false;
        // Close Key Prompt Window
        this._keyPromptWindow.close();
      };
    };
  };
};
// //=============================================================================
// // * Update Cursor
// //=============================================================================
// Window_OmoMenuOptionsControls.prototype.updateCursor = function() {
//   // Run Original Function
//   Window_Selectable.prototype.updateCursor.call(this);
//   // Get Top Row
//   var topRow = this.topRow();
//   // Get Index
//   var index = this.index();
//   // If Option cursors Exist
//   if (this._optionCursors) {
//     // Go through Option Cursors
//     for (var i = 0; i < this._optionCursors.length; i++) {
//       // Get Sprite
//       var sprite = this._optionCursors[i];
//       // Get Real Index
//       var realIndex = topRow + i;
//       // Get Data
//       var data = this._optionsList[realIndex];
//       // Get Selected State
//       var selected = this.active ? realIndex === index : false;
//       // If Data Exists
//       if (data) {
//         // Get Item Rect
//         var rect = this.itemRect(realIndex);
//         // Set Sprite Color
//         sprite.setColorTone(selected ? [0, 0, 0, 0] : [-80, -80, -80, 255])
//         // Activate Selected Sprite
//         selected ? sprite.activate() : sprite.deactivate();
//         // Set Sprite Positions
//         sprite.x = (rect.x + 65) +  (data.index * data.spacing);
//         sprite.y = rect.y + 60;
//         // Make Sprite Visible
//         // sprite.visible = this.height >= sprite.y + sprite.height;
//       } else {
//         // Deactivate Sprite
//         sprite.deactivate();
//         // Make Sprite Invisible
//         sprite.visible = false;
//       };
//     };
//   }
// };




//=============================================================================
// ** Window_OmoMenuOptionsSystem
//-----------------------------------------------------------------------------
// The window for selecting option categories in the options menu
//=============================================================================
function Window_OmoMenuOptionsSystem() { this.initialize.apply(this, arguments); }
Window_OmoMenuOptionsSystem.prototype = Object.create(Window_Command.prototype);
Window_OmoMenuOptionsSystem.prototype.constructor = Window_OmoMenuOptionsSystem;
//=============================================================================
// * Object Initialization
//=============================================================================
Window_OmoMenuOptionsSystem.prototype.initialize = function() {
  // Super Call
  Window_Command.prototype.initialize.call(this, 0, 0);
  this.deactivate();
};
//=============================================================================
// * Settings
//=============================================================================
Window_OmoMenuOptionsSystem.prototype.isUsingCustomCursorRectSprite = function() { return true; };
Window_OmoMenuOptionsSystem.prototype.standardPadding = function() { return 10; }
Window_OmoMenuOptionsSystem.prototype.windowWidth = function () { return Graphics.width -  20; };
Window_OmoMenuOptionsSystem.prototype.windowHeight = function() { return 318; }
Window_OmoMenuOptionsSystem.prototype.maxCols = function() { return 1; };
Window_OmoMenuOptionsSystem.prototype.standardFontSize = function() { return 24; };
Window_OmoMenuOptionsSystem.prototype.customCursorRectYOffset = function() { return 4; }
Window_OmoMenuOptionsSystem.prototype.customCursorRectTextXOffset = function() { return 25; }
//=============================================================================
// * Make Command List
//=============================================================================
Window_OmoMenuOptionsSystem.prototype.makeCommandList = function() {
  const isOptionsScene = SceneManager._scene.constructor === Scene_OmoMenuOptions
  const isSceneTitle = SceneManager._scene instanceof Scene_OmoriTitleScreen;
  this.addCommand(LanguageManager.getPluginText('optionsMenu', 'system').restoreConfig.text, 'restoreConfig', isSceneTitle);
  this.addCommand(LanguageManager.getPluginText('optionsMenu', 'system').load.text, 'load', isOptionsScene);
  this.addCommand(LanguageManager.getPluginText('optionsMenu', 'system').toTitleScreen.text, 'toTitleScreen', isOptionsScene);  
  this.addCommand(LanguageManager.getPluginText('optionsMenu', 'system').exit.text, 'exit');  
};
//=============================================================================
// * Get Command Help Text
//=============================================================================
Window_OmoMenuOptionsSystem.prototype.getCommandHelpText = function(symbol = this.currentSymbol()) {
  // Symbol Switch Case
  switch (symbol) {
    case 'restoreConfig': return LanguageManager.getPluginText('optionsMenu', 'system').restoreConfig.help ;break;
    case 'load': return LanguageManager.getPluginText('optionsMenu', 'system').load.help ;break;
    case 'toTitleScreen': return LanguageManager.getPluginText('optionsMenu', 'system').toTitleScreen.help ;break;
    case 'exit': return LanguageManager.getPluginText('optionsMenu', 'system').exit.help ;break;
  }
  // Return error as default
  return "* ERROR!!! *";
};
//=============================================================================
// * Call Update Help
//=============================================================================
Window_OmoMenuOptionsSystem.prototype.callUpdateHelp = function() {
  // Run Original Function
  Window_Command.prototype.callUpdateHelp.call(this);
  if (this._helpWindow) {
    this._helpWindow.setText(this.getCommandHelpText());
  };
};




//=============================================================================
// ** Window_OmoMenuOptionsExitPromptWindow
//-----------------------------------------------------------------------------
// This Window is used to show a prompt for exiting the game.
//=============================================================================
function Window_OmoMenuOptionsExitPromptWindow() { this.initialize.apply(this, arguments); }
Window_OmoMenuOptionsExitPromptWindow.prototype = Object.create(Window_Command.prototype);
Window_OmoMenuOptionsExitPromptWindow.prototype.constructor = Window_OmoMenuOptionsExitPromptWindow;
//=============================================================================
// * Initialize Object
//=============================================================================
Window_OmoMenuOptionsExitPromptWindow.prototype.initialize = function() {
  // Super Call
  Window_Command.prototype.initialize.call(this, 0, 0);
  // Prompt Text
  this._promptText = LanguageManager.getPluginText('optionsMenu', 'system').exitPrompt.text;
  // Refresh Contents
  this.refresh();
  this.openness = 0;
  this.deactivate();
};
//=============================================================================
// * Settings
//=============================================================================
Window_OmoMenuOptionsExitPromptWindow.prototype.isUsingCustomCursorRectSprite = function() { return true; };
Window_OmoMenuOptionsExitPromptWindow.prototype.windowHeight   = function() { return 84 - 16; };
Window_OmoMenuOptionsExitPromptWindow.prototype.windowWidth    = function() { 
  if(!this._type) {return 200}
  return 232; 
};
Window_OmoMenuOptionsExitPromptWindow.prototype.maxCols = function() { return 2; };
Window_OmoMenuOptionsExitPromptWindow.prototype.spacing = function() { return 0; };
Window_OmoMenuOptionsExitPromptWindow.prototype.standardPadding = function() { return 0; };
Window_OmoMenuOptionsExitPromptWindow.prototype.itemHeight = function() { return 20; };
Window_OmoMenuOptionsExitPromptWindow.prototype.itemWidth = function() { return 75 + 10; };
Window_OmoMenuOptionsExitPromptWindow.prototype.standardFontSize = function() { return 24; };
const _old_OmoMenuOptionsExitPromptWindow_customCursorRectXOffset = Window_OmoMenuOptionsExitPromptWindow.prototype.customCursorRectXOffset;
Window_OmoMenuOptionsExitPromptWindow.prototype.customCursorRectXOffset = function() {
  if(!this._type) {return _old_OmoMenuOptionsExitPromptWindow_customCursorRectXOffset.call(this)}
  return _old_OmoMenuOptionsExitPromptWindow_customCursorRectXOffset.call(this) + 16;
}
//=============================================================================
// * Make Command List
//=============================================================================
Window_OmoMenuOptionsExitPromptWindow.prototype.makeCommandList = function() {
  // Get Commands Text
  var text = !this._type ? LanguageManager.getPluginText('optionsMenu', 'system').exitPrompt.commands : LanguageManager.getPluginText('optionsMenu', 'system').toTitleScreenPrompt.commands;
  this.addCommand(text[0],  'yes');
  this.addCommand(text[1],  'cancel');
};
//=============================================================================
// * Refresh
//=============================================================================
Window_OmoMenuOptionsExitPromptWindow.prototype.refresh = function(type = 0) {
  // Super Call
  this._type = type;
  this.width = this.windowWidth();
  this.createContents();
  Window_Command.prototype.refresh.call(this);
  this._promptText = !this._type ? LanguageManager.getPluginText('optionsMenu', 'system').exitPrompt.text : LanguageManager.getPluginText('optionsMenu', 'system').toTitleScreenPrompt.text
  this.drawText(this._promptText, 0, 0, this.contents.width, 'center');
};
//=============================================================================
// * Get Item Rect
//=============================================================================
Window_OmoMenuOptionsExitPromptWindow.prototype.itemRect = function(index) {
  var rect = Window_Command.prototype.itemRect.call(this, index);
//  rect.x += 10;
  rect.y += this.lineHeight() - 5;
  return rect;
};
//=============================================================================
// * Get Item Rect For Text
//=============================================================================
Window_OmoMenuOptionsExitPromptWindow.prototype.itemRectForText = function(index) {
  var rect = this.itemRect(index);
  rect.x += this.textPadding() + 35;
  if(!!this._type) {
    rect.x += 16;
  }
  rect.y -= 10;
  rect.width -= this.textPadding() * 2;
  return rect;
};
