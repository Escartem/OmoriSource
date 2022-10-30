//=============================================================================
// TDS Omori BASE
// Version: 1.6
//=============================================================================
// Add to Imported List
var Imported = Imported || {} ; Imported.TDS_OmoriBASE = true;
// Initialize Alias Object
var _TDS_ = _TDS_ || {} ; _TDS_.OmoriBASE = _TDS_.OmoriBASE || {};
//=============================================================================
 /*:
 * @plugindesc
 * Contains base functions and standards for OMORI.
 *
 * @author TDS
 *
 */
//=============================================================================



window.focus();


//=============================================================================
// ** Bitmap
//-----------------------------------------------------------------------------
// The basic object that represents an image.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriBASE.Bitmap_initialize = Bitmap.prototype.initialize;
//=============================================================================
// * Object Initialization
//=============================================================================
Bitmap.prototype.initialize = function(width, height) {
  // Run Original Function
  _TDS_.OmoriBASE.Bitmap_initialize.call(this, width, height);
  // Default Input Icons
  this._defaultInputIcons = 'keyboardBlack24';
};
//=============================================================================
// * Get Default Input Icons
//=============================================================================
Bitmap.prototype.defaultInputIcons = function() {
  return !ConfigManager.gamepadTips ? this._defaultInputIcons : 'gamepadBlack24';
}

//=============================================================================
// * Determine Vendor Gamepad
//=============================================================================

Bitmap.prototype.determineVendorRect = function() {
  let gamepads = navigator.getGamepads();
  let currentGamepad;
  currentGamepad = !Input._lastGamepad ? gamepads[0] : gamepads[Input._lastGamepad];
  let rectChange = 72;
  let index = 2; // O - Default; 1 - SONY; 2 - XBOX, -1 Special Mapping;
  if(!currentGamepad) {return rectChange * index;}
  let gId = currentGamepad.id.toLowerCase();
  if(gId.contains("0810") && gId.contains("e501")) {index = -1;} // Particular unbranded controllers;
  else if(gId.contains("0079") && gId.contains("0011")) {index = -1;} // Dragon Inc
  else if(gId.contains("054c")) {index = 1;} // SONY
  else if(gId.contains("045e")) {index = 2;} // MICROSOFT
  else if(gId.contains("xbox")) {index = 2;} // XBOX
  else if(gId.contains("playstation")) {index = 1;} // PLAYSTATION
  else if(gId.contains("ps2")) {index = 1;} // PLAYSTATION
  else if(gId.contains("ps3")) {index = 1;} // PLAYSTATION
  else if(gId.contains("ps4")) {index = 1;} // PLAYSTATION
  else if(gId.contains("ps5")) {index = 1;} // PLAYSTATION
  else if(gId.contains("switch")) {index = 0;} // NINTENDO SWITCH 
  else if(currentGamepad.mapping === "standard") {index = 2}
  return rectChange * index;
}
//=============================================================================
// * Draw Input Icon
//=============================================================================
Bitmap.prototype.keyIconRects = function(key, type = this.defaultInputIcons(), side = 0) {
  // Get Language Data
  var data = LanguageManager.languageData().text.System.InputIcons[type];
  // Get Rects
  let kk = data.rects[key];
  let foundKey = !!kk;
  if(!kk) {
    kk = {
      "up": {x:0,y:0,width:24,height:24},
      "down": {x:24,y:0,width:24,height:24}
    }
  }
  var rects = JsonEx.makeDeepCopy(kk);
  // If Rects Don't Exist set it to empty
  if (rects === undefined) { rects = data.rects.EMPTY;}
  // Return Rect
  if(type === "gamepadBlack24" && !!foundKey) {
    let vendorRect = this.determineVendorRect();
    rects.up.x -= vendorRect;
    rects.down.x -= vendorRect;
  }  
  return rects;
};
//=============================================================================
// * Draw Input Icon
//=============================================================================
Bitmap.prototype.drawKeyIcon = function(key, x, y, type = this.defaultInputIcons(), side = 0) {
  // Get Language Data
  var data = LanguageManager.languageData().text.System.InputIcons[type];
  // Get Source
  var source = ImageManager.loadSystem('Input/' + data.source);
  // Get Rects
  var rects = data.rects[key];
  let rectsFound = !!rects;
  // If Rects Don't Exist set it to empty
  if (rects === undefined) { rects = {
    "up": {x:0,y:0,width:24,height:24},
    "down": {x:24,y:0,width:24,height:24}
  }}
  // Get Rect
  var rect = side === 0 ? rects.up : rects.down;
  // Determine key type;
  let rectX = rect.x;
  if(!!rectsFound) {
    if(type === "gamepadBlack24") {
      rectX -= this.determineVendorRect();
    }
  }
  // Transfer Rect to self
  this.blt(source, rectX, rect.y, rect.width, rect.height, x, y);
};
//=============================================================================
// * Draw Input Icon
//=============================================================================
Bitmap.prototype.drawInputIcon = function(input, x, y, gamepad = false, type = this.defaultInputIcons(), side = 0) {
  // Get Key Map
  gamepad = ConfigManager.gamepadTips;
  var map = gamepad ? Input.gamepadMapper : Input.keyMapper;
  // Get Key
  var key = Object.keys(map).find(key => map[key] === input);
  // Draw Key Icon
  this.drawKeyIcon(key, x, y, type, side);
};
//=============================================================================
// * Draw Aligned Key Icon
//=============================================================================
Bitmap.prototype.drawAlginedKeyIcon = function(input, x, y, width, height, align = 'center', type = this.defaultInputIcons(), side = 0) {
  // Get Language Data
  var data = LanguageManager.languageData().text.System.InputIcons[type];
  // Get Source
  var source = ImageManager.loadSystem('Input/' + data.source);
  // Get Rects
  var rects = this.keyIconRects(input, type);
  // Get Rect
  var rect = side === 0 ? rects.up : rects.down;
  // Get Center X & Y Positions
  var cx = 0, cy = (height - rect.height) / 2;
  // Alignment switch case
  switch (align) {
    case 'center': cx = (width - rect.width) / 2 ;break;
    case 'right':  cx = (width - rect.width)
    break;
  };
  // Transfer Rect to self
  this.blt(source, rect.x, rect.y, rect.width, rect.height, x + cx, y + cy);
}



//=============================================================================
// ** WebAudio
//-----------------------------------------------------------------------------
// The audio object of Web Audio API.
//=============================================================================
// * Fade to
//=============================================================================
WebAudio.prototype._fadeTo = function(vol, duration) {
  if (this._gainNode) {
    var gain = this._gainNode.gain;
    var currentTime = WebAudio._context.currentTime;
    gain.setValueAtTime(gain.value, currentTime);
    gain.linearRampToValueAtTime(vol, currentTime + duration);
  }
};


//=============================================================================
// ** AudioManager
//-----------------------------------------------------------------------------
// The static class that handles BGM, BGS, ME and SE.
//=============================================================================
// * Class Variables
//=============================================================================
// Extra Buffers array
AudioManager._extraBuffers = [];
//=============================================================================
// * Fade BGM to
//=============================================================================
AudioManager.fadeBgmTo = function(volume, duration) {
  if (this._bgmBuffer && this._currentBgm) {
    this._bgmBuffer._fadeTo(volume / 100, duration / 60);
  };
};
//=============================================================================
// * Fade BGS to
//=============================================================================
AudioManager.fadeBgsTo = function(volume, duration) {
  if (this._bgsBuffer && this._currentBgs) {
    this._bgsBuffer._fadeTo(volume / 100, duration / 60);
  };
};
//=============================================================================
// * Loop Current ME
//=============================================================================
AudioManager.loopCurrentME = function() {
  // If ME Buffer exists
  if (this._meBuffer) {
    // Get Position
    var pos = this._meBuffer.seek();
    // Replay ME (With looping)
    this._meBuffer.play(true, pos || 0);
  };
};
//=============================================================================
// * Play Current BGM once
//=============================================================================
AudioManager.playCurrentBGMOnce = function(switchId = 0) {
  // If BGM Buffer exists
  if (this._bgmBuffer) {
    // Get Position
    var pos = this._bgmBuffer.seek();
    // Replay BGM (With no looping)
    this._bgmBuffer.play(false, pos || 0);
    // Set Stop Listener to BGM Buffer
    this._bgmBuffer.addStopListener(function() {
      // If Switch Id is more than 0
      if (switchId > 0) {
        // Turn on Switch
        $gameSwitches.setValue(switchId, true);
      }
    })
  }
};
//=============================================================================
// * Play To Extra Buffer
//=============================================================================
AudioManager.playToExtraBuffer = function(index, type, sound, pos, loop = true) {
  // Get Buffer
  let buffer = this._extraBuffers[index];
  // If Buffer Exists
  if (buffer) {
    const path = require('path');
    // Get Folders
    const folders = buffer._url.split('/');
    // If type matches the folder of the buffer
    if (type === folders[folders.length-2]) {
      // Update Buffer Parameters
      this.updateBufferParameters(buffer, sound.volume, sound);
      return;
    } else {
      // Stop the existing buffer
      AudioManager.StopExtraBuffer(index);
    };
  };
  // If Sound has a valid name
  if (sound.name) {
    // Create Buffer
    buffer = this.createBuffer(type, sound.name);
    // Update Buffer Parameters
    this.updateBufferParameters(buffer, sound.volume, sound);
    // Play buffer
    buffer.play(loop, pos || 0);
    // If not looping
    if (loop === false) {
      // Add Stop listener to buffer if it does not loop
      buffer.addStopListener(this.StopExtraBuffer.bind(this, index));
    }
    // Set Buffet at index
    this._extraBuffers[index] = buffer;
  }
};
//=============================================================================
// * Stop Extra Buffer
//=============================================================================
AudioManager.StopExtraBuffer = function(index) {
  // Get Etra Buffer
  let buffer = this._extraBuffers[index];
  // If Buffer Exists
  if (buffer) {
    // Stop Buffer
    buffer.stop();
    // Remove buffer at index
    this._extraBuffers[index] = null;
  };
};
//=============================================================================
// * Stop Extra Buffer
//=============================================================================
AudioManager.fadeoutExtraBuffer = function(index, duration) {
  // Get Etra Buffer
  let buffer = this._extraBuffers[index];
  // If Buffer Exists
  if (buffer) {
    // Fadeout Buffer
    buffer.fadeOut(duration);
    // Remove buffer at index
    this._extraBuffers[index] = null;
  };
};
//=============================================================================
// * Clear Extra Buffers
//=============================================================================
AudioManager.ClearExtraBuffers = function() {
  // Go through Extra Buffers
  for (var i = 0; i < this._extraBuffers.length; i++) {
    // Stop Extra Buffers
    AudioManager.StopExtraBuffer(i);
  };
};



//=============================================================================
// ** Window
//-----------------------------------------------------------------------------
// The window in the game.
//=============================================================================
// * Define Openness (Set, Get)
//=============================================================================
Object.defineProperty(Window.prototype, 'openness', {
  get: function() { return this._openness; },
  set: function(value) {
    if (this._openness !== value) {
      this._openness = value.clamp(0, 255);
      // Openess Animations (0: Vertical, 1: Horizontal, 2: All)
      if (this._opennessType === 0) {
        this._windowSpriteContainer.scale.y = this._openness / 255;
        this._windowSpriteContainer.y = this.height / 2 * (1 - this._openness / 255);
      } else if (this._opennessType === 1) {
        this._windowSpriteContainer.x = this.width / 2 * (1 - this._openness / 255);
        this._windowSpriteContainer.scale.x = this._openness / 255;
      } else if (this._opennessType === 2) {
        this._windowSpriteContainer.scale.y = this._openness / 255;
        this._windowSpriteContainer.y = this.height / 2 * (1 - this._openness / 255);
        this._windowSpriteContainer.x = this.width / 2 * (1 - this._openness / 255);
        this._windowSpriteContainer.scale.x = this._openness / 255;
      };
    };
  },
  configurable: true
});




//=============================================================================
// ** Sprite
//-----------------------------------------------------------------------------
// The basic object that is rendered to the game screen.
//=============================================================================
// * Scale X Value
//=============================================================================
Object.defineProperty(Sprite.prototype, 'scaleX', {
  get: function() { return this.scale.x; },
  set: function(value) { this.scale.x = value; },
  configurable: true
});
//=============================================================================
// * Scale Y Value
//=============================================================================
Object.defineProperty(Sprite.prototype, 'scaleY', {
  get: function() { return this.scale.y; },
  set: function(value) { this.scale.y = value; },
  configurable: true
});



//=============================================================================
// ** Input
//-----------------------------------------------------------------------------
// The static class that handles input data from the keyboard and gamepads.
//=============================================================================
// * Get Input Key Code
//=============================================================================
Input.inputKeyCode = function(input, gamepad = false) {
  // Get Key Map
  gamepad = ConfigManager.gamepadTips;
  var map = gamepad ? Input.gamepadMapper : Input.keyMapper;
  // Return Key Code
  return Object.keys(map).find(key => map[key] === input);
};





//=============================================================================
// ** Scene_Boot
//-----------------------------------------------------------------------------
// The scene class for initializing the entire game.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriBASE.Scene_Boot_loadSystemWindowImage = Scene_Boot.prototype.loadSystemWindowImage;
//=============================================================================
// * Load System Images
//=============================================================================
Scene_Boot.prototype.loadSystemWindowImage = function () {
  // Run Original Function
  _TDS_.OmoriBASE.Scene_Boot_loadSystemWindowImage.call(this);
  // ImageManager.reserveSystem("hp_icon");
  // ImageManager.reserveSystem("mp_icon");
  // ImageManager.reserveSystem("equip_arrow");
  // ImageManager.reserveSystem("newtagmenud");
};



//=============================================================================
// ** DataManager
//-----------------------------------------------------------------------------
// The static class that manages the database and game objects.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriBASE.DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
//=============================================================================
// * Make Save File Information
//=============================================================================
DataManager.makeSavefileInfo = function() {
  // Get Info
  var info = _TDS_.OmoriBASE.DataManager_makeSavefileInfo.call(this);
  // Set World Index
  info.worldIndex = $gameVariables.value(22);
  // Return info
  return info;
};
//=============================================================================
// * Determine if Item has Toy Item Tag
//=============================================================================
DataManager.hasToyItemTag = function(item) { return item && item.note.match(/<Is Toy>/i); };
//=============================================================================
// * Determine if Item type
//=============================================================================
DataManager.isKeyItem        = function(item) { return this.isItem(item) && item.itypeId === 2};
DataManager.isConsumableItem = function(item) { return this.isItem(item) && item.itypeId === 1 && !this.hasToyItemTag(item); };
DataManager.isToyItem        = function(item) { return this.isItem(item) && item.itypeId === 1 && this.hasToyItemTag(item); };
//=============================================================================
// * Get Blackletter Items
//=============================================================================
DataManager.getBlackletterItems = function() {
  // Initialize List
  var list = [];
  // Go through ID's for blackletters
  for (var i = 850; i < 876; i++) {
    // Get Item
    var item = $dataItems[i];
    // If item has blackletter data
    if (item.meta.Blackletter) { list.push(item); };
  };
  // Return List
  return list;
};
//=============================================================================
// * Get Item Short Name
//=============================================================================
DataManager.itemShortName = function(item) {
  // If Item has short name
  if (item.meta.ShortName) {
    // Set Item Short Name
    item.shortName = item.meta.ShortName.trim();
  } else {
    // Set Short Name
    item.shortName = item.name;
  }
  // Return item short name
  return item.shortName;
};
//=============================================================================
// * Get Item Icon Data
//=============================================================================
DataManager.getItemIconGraphicsData = function(item) {
  // If Item has Icon Graphics Data already set
  if (item.meta.IconGraphicsData) { return item.meta.IconGraphicsData; };
  // Initialize Data
  var data = {name: '', index: 0, rows: 1, columns: 1};
  // Set Item Icon Index
  if (item.meta.IconIndex) { data.index = Number(item.meta.IconIndex); }
  // Apply Properties to data
  if (this.isKeyItem(item)) {
    data.name = 'itemImportant'; data.rows = 15, data.columns = 8;
  } else if (this.isConsumableItem(item)) {
    data.name = 'itemConsumables'; data.rows = 12, data.columns = 8;
  } else if (this.isToyItem(item)) {
    data.name = 'itemConsumables'; data.rows = 12, data.columns = 8;
  } else if (this.isWeapon(item)) {
    data.name = 'itemWeapons'; data.rows = 5, data.columns = 9;
  } else if (this.isArmor(item)) {
    data.name = 'itemCharms'; data.rows = 13, data.columns = 7;
  };
  // Set Item Icon Graphics Data
  item.meta.IconGraphicsData = data;
  // Get Item Icon Data
  return data;
};
//=============================================================================
// * Get Blackletter hangman word
//=============================================================================
DataManager.hangmanWord = function() { return "WELCOME TO BLACK SPACE"; };
//=============================================================================
// * Get Blackletter Collection State (Completed, Failed, Incomplete)
//=============================================================================
DataManager.blackLetterCollectionState = function(word = this.hangmanWord()) {
  // Get BlackletterItems
  var items = this.getBlackletterItems();
  // Get Unique Letters Array
  var letters = [...new Set(word.replace(/\s/g,'').split(''))].map(function(l) { return l.toUpperCase(); });
  // Initialize Right and Wrong Counts
  var rightCount = 0, wrongCount = 0;
  // Go through items
  for (var i = 0; i < items.length; i++) {
    // Get item
    var item = items[i];
    // If Party has item
    if ($gameParty.hasItem(item)) {
      // Get Blackletter from Item
      var blackletter = item.meta.Blackletter.trim().toUpperCase();
      // If Letters contains blackletter
      if (letters.contains(blackletter)) {
        // Increase Right Count
        rightCount++;
      } else {
        // Increase Wrong Count
        wrongCount++;
      };
    };
  };
  // Return 1 if wrong count is more or equal to 14 (Failure)
  if (wrongCount >= 14) { return 1; };
  // Return 0 if right count is or equal to the letters (Sucess)
  if (rightCount >= letters.length) { return 0; };
  // Return 2 by default (Incomplete)
  return 2;
};
//=============================================================================
// * Get animation Layer
//=============================================================================
DataManager.animationLayer = function(animation) {
  // If Animation Exists
  if (animation) {
    // If Animation Layer Is not undefined return it
    if (animation._animationLayer !== undefined) { return animation._animationLayer; }
    // Get Match
    var match = /<Layer:\s*(\d+)>/i.exec(animation.name);
    // Set Animation Layer
    animation._animationLayer = match ? Number(match[1]) : 3;
    // Return Animation Layer
    return animation._animationLayer;
  };
  // Return default animation layer
  return 3;
};
//=============================================================================
// * Convert Atlas JSON to YAML
//=============================================================================
DataManager.covertAtlasJSONtoYAML = function(name, folder = '') {
  const path = require('path');
  const fs = require('fs');
  const yaml = require('./js/libs/js-yaml-master')
  const base = path.dirname(process.mainModule.filename);
  const filePath = path.join(base, name);
  const filename = path.basename(filePath);
  // Make JSON Object
  let jsonObj = JSON.parse(fs.readFileSync(filePath + '.json', { encoding: 'utf8' }));
  // Make Yaml Object
  let yamlObj = {};
  // Get Image Name
  const image = path.basename(jsonObj.meta.image, '.png');
  // Get Frames
  const frames = jsonObj.frames;
  // Go Through List of Entries and replace messages
  for (let [key, value] of Object.entries(frames)) {
    // Create Destination Rectangle
    let rect = {x: value.spriteSourceSize.x, y: value.spriteSourceSize.y, width: value.sourceSize.w, height: value.sourceSize.h};
    // Create Source rectangle
    let srcRect = {x: value.frame.x, y: value.frame.y, width: value.frame.w, height: value.frame.h};
    // Create Yaml Key Object
    yamlObj[path.join(folder, key).replace(/\\/g, '/')] = {atlasName: image, rect:  rect, sourceRect: srcRect};
  };
  fs.writeFileSync(filePath + '.yaml', yaml.safeDump(yamlObj, {flowLevel: 1}));
};

  // img/pictures/OMO_BS.png:
  //   atlasName: Omori_TitleScreen
  //   rect: {x: 0, y: 0, width: 918, height: 351}
  //   sourceRect: {x: 0, y: 351, width: 918 , height: 351}

  // img/pictures/OMO_RS.png:
  //   atlasName: Omori_TitleScreen
  //   rect: {x: 0, y: 0, width: 918, height: 351}
  //   sourceRect: {x: 0, y: 702, width: 918 , height: 351}




//=============================================================================
// ** ConfigManager
//-----------------------------------------------------------------------------
// The static class that manages the configuration data.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriBASE.ConfigManager_makeData = ConfigManager.makeData;
_TDS_.OmoriBASE.ConfigManager_applyData = ConfigManager.applyData;
//=============================================================================
// * Class Variables
//=============================================================================
ConfigManager.characterStrafe = true;
ConfigManager.characterTurning = true;
ConfigManager.battleAnimations = true;
ConfigManager.battleAnimationSpeed = 0;
ConfigManager.battleLogSpeed = 1;
ConfigManager.screenResolution = 0;
ConfigManager.fullScreen = false;
ConfigManager.menuAnimations = true;
ConfigManager.gamepadTips = false;
ConfigManager.textSkip = false;
//=============================================================================
// * Check Event Trigger Touch
//=============================================================================
ConfigManager.makeData = function() {
  // Get Original Config
  var config = _TDS_.OmoriBASE.ConfigManager_makeData.call(this);
  // Set Config Settings
  config.characterStrafe = this.characterStrafe;
  config.battleAnimations = this.battleAnimations;
  config.battleAnimationSpeed = 0;
  config.battleLogSpeed = this.battleLogSpeed;
  config.screenResolution = this.screenResolution;
  config.fullScreen = this.fullScreen;
  config.menuAnimations = this.menuAnimations;
  config.keyboardInputMap = Input.keyMapper;
  config.gamepadInputMap = Input.gamepadMapper;
  config.gamepadTips = this.gamepadTips;
  config.textSkip = this.textSkip;
  // Return Config
  return config;
};
//=============================================================================
// * Apply Data
//=============================================================================
ConfigManager.applyData = function(config) {
  // Run Original Function
  _TDS_.OmoriBASE.ConfigManager_applyData.call(this, config);
  // List of Values to Check
  var initCheckList = ['characterStrafe', 'battleAnimations',
  'battleAnimationSpeed', 'battleLogSpeed', 'screenResolution',
  'fullScreen', 'menuAnimations']
  // Go Through Checl List
  for (var i = 0; i < initCheckList.length; i++) {
    // Get Name
    var name = initCheckList[i];
    // Set Default value if undefined
    if (config[name] === undefined) { config[name] = this[name]; };
  };
  // Set Screen Size
  Yanfly.Param.ScreenWidth = 640 * (config.screenResolution + 1);
  Yanfly.Param.ScreenHeight = 480 * (config.screenResolution+ 1) ;
  SceneManager._screenWidth  = Yanfly.Param.ScreenWidth;
  SceneManager._screenHeight = Yanfly.Param.ScreenHeight;
  // SceneManager._boxWidth     = Yanfly.Param.ScreenWidth;
  // SceneManager._boxHeight    = Yanfly.Param.ScreenHeight
  //Yanfly.updateResolution();
  //Yanfly.moveToCenter();
  this.characterTurning = config.characterTurning;
  this.characterStrafe = config.characterStrafe;
  this.battleAnimations = config.battleAnimations;
  this.battleAnimationSpeed = config.battleAnimationSpeed;
  this.battleLogSpeed = config.battleLogSpeed === undefined ? 1 : config.battleLogSpeed;
  this.screenResolution = config.screenResolution;
  this.fullScreen = config.fullScreen;
  this.menuAnimations = config.menuAnimations;
  this.gamepadTips = config.gamepadTips || false;
  this.textSkip = config.textSkip || false;
  // Set Input Maps
  Input.keyMapper = config.keyboardInputMap;
  Input.gamepadMapper = config.gamepadInputMap;
  // Set Default keys if undefined
  if (Input.keyMapper === undefined) { this.setDefaultKeyboardKeyMap(); };
  if (Input.gamepadMapper === undefined) { this.setDefaultGamepadKeyMap(); };
  // If Full Screen Request full screen
  if (config.fullScreen) { 
    Graphics._requestFullScreen(); 
  }
  else {
    Yanfly.updateResolution();
    Yanfly.moveToCenter();
  }

  if ( $gameSwitches) {
    // If Character Press Turn strafing exists
    if (_TDS_.CharacterPressTurn_Strafing) {
      // Set Strafe Switch
      $gameSwitches.setValue(_TDS_.CharacterPressTurn_Strafing.params.strafingDisableSwitchID, this.characterStrafe);
      // Set Turning Switch
      $gameSwitches.setValue(_TDS_.CharacterPressTurn_Strafing.params.pressDisableSwitchID, this.characterTurning)
    };
  };
};
//=============================================================================
// * Set Default Keyboard Map
//=============================================================================
ConfigManager.setDefaultKeyboardKeyMap = function() {
  Input.keyMapper = {
      9: 'tab',       // tab
      90: 'ok',       // enter
      16: 'shift',    // shift
      17: 'control',  // control
      65: 'tag',      // A
      88: 'escape',   // X
      37: 'left',     // left arrow
      38: 'up',       // up arrow
      39: 'right',    // right arrow
      40: 'down',     // down arrow
      81: 'pageup',   // Q
      87: 'pagedown', // W
      120: 'debug'    // F9
  };
};
//=============================================================================
// * Set Default Gamepad Key Map
//=============================================================================
ConfigManager.setDefaultGamepadKeyMap = function() {
  Input.gamepadMapper = {
    0: 'ok',        // A
    1: 'escape',    // B
    2: 'shift',     // X
    3: 'tag',      // Y
    4: 'pageup',    // LB
    5: 'pagedown',  // RB

    6: 'SIX6',
    7: 'SEVEN7',
    8: 'tab',
    9: 'NINE9',
    10: 'TEN10',
    11: 'ELEVEN11',

    12: 'up',       // D-pad up
    13: 'down',     // D-pad down
    14: 'left',     // D-pad left
    15: 'right',    // D-pad right
    16: 'SIXTEEN16',
  };
};
//=============================================================================
// * Set Default Keyboard Inputs
//=============================================================================
ConfigManager.setDefaultKeyboardKeyMap();
ConfigManager.setDefaultGamepadKeyMap();



ConfigManager.restoreDefaultConfig = function() {
  const fs = require("fs");
  const path = require('path');
  var base = path.dirname(process.mainModule.filename);
  base = path.join(base, 'save/');
  if(fs.existsSync(base + "config.rpgsave")) {fs.unlinkSync(base + "config.rpgsave");}
  ConfigManager.characterStrafe = true;
  ConfigManager.characterTurning = true;
  ConfigManager.battleAnimations = true;
  ConfigManager.battleAnimationSpeed = 0;
  ConfigManager.battleLogSpeed = 1;
  ConfigManager.screenResolution = 0;
  ConfigManager.fullScreen = false;
  ConfigManager.menuAnimations = true;
  ConfigManager.gamepadTips = false;
  ConfigManager.alwaysDash = false;
  ConfigManager.textSkip = false;
  this.setDefaultKeyboardKeyMap();
  this.setDefaultGamepadKeyMap();
	AudioManager._bgmVolume      = 70;
	AudioManager._bgsVolume      = 90;
	AudioManager._meVolume       = 90;
  AudioManager._seVolume       = 90;
  ConfigManager.bgmVolume = 70
  ConfigManager.bgsVolume = 90
  ConfigManager.meVolume  = 90
  ConfigManager.seVolume  = 90
  ConfigManager.applyData(ConfigManager);
  let needsRestore = confirm(LanguageManager.languageData().text.System.plugins.optionsMenu.alertMessages["restoreGeneral"]);
  if(!!needsRestore) {DataManager._restoreGlobalInfo();}
}








//=============================================================================
// ** SceneManager
//-----------------------------------------------------------------------------
// The static class that manages scene transitions.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriBASE.SceneManager_updateMain = SceneManager.updateMain;
_TDS_.OmoriBASE.SceneManager_isCurrentSceneBusy = SceneManager.isCurrentSceneBusy;
//=============================================================================
// * Class Variables
//=============================================================================
SceneManager._windowOriginX = null;
SceneManager._windowOriginY = null;
SceneManager._windowShakeDuration = 0;
//=============================================================================
// * Determine if Current Scene is Busy
//=============================================================================
SceneManager.isCurrentSceneBusy = function() {
  // If There are images in the request queue return true
  if (ImageManager._requestQueue._queue.length > 0) { return true; }
  // Run Original Function
  return _TDS_.OmoriBASE.SceneManager_isCurrentSceneBusy.call(this);
};
//=============================================================================
// * Get Current World Index
//=============================================================================
SceneManager.currentWorldIndex = function() {
  // Get World Index
  var index = $gameVariables.value(22);
  // Return index if its more than 0
  if (index > 0) { return index; };
  // Return 1 (Dream world) as default
  return 1;
};
//=============================================================================
// * Update Main
//=============================================================================
SceneManager.startWindowShake = function(duration) {
  // Save Window Positions
  if (SceneManager._windowOriginX === null) { SceneManager._windowOriginX = window.screenX; };
  if (SceneManager._windowOriginY === null) { SceneManager._windowOriginY = window.screenY; };
  // Set Shake Duration
  SceneManager._windowShakeDuration = duration;
  // Set Scene Pivo Point
  this._scene.pivot.x = Graphics.width / 2;
  this._scene.pivot.y = Graphics.height / 2;
};
//=============================================================================
// * Stop Window Shake
//=============================================================================
SceneManager.stopWindowShake = function(duration) {
  // Get Scene
  var scene = this._scene;
  // Reset Scene Properties
  scene.scale.x = 1.0;
  scene.scale.y = 1.0;
  scene.x = 0;
  scene.y = 0;
  scene.pivot.x = 0;
  scene.pivot.y = 0;
  // If Window Origin Positions X & Y are not null
  if (SceneManager._windowOriginX !== null && SceneManager._windowOriginY !== null) {
    // Reset Window Position
    window.moveTo(SceneManager._windowOriginX, SceneManager._windowOriginY);
  }
  // Reset Shake Duration
  SceneManager._windowShakeDuration = 0;
};
//=============================================================================
// * Update Main
//=============================================================================
SceneManager.updateMain = function() {
  // Run Original Function
  _TDS_.OmoriBASE.SceneManager_updateMain.call(this);

  // if (Input.isTriggered('control')) {
  //   this.startWindowShake(20);
  // };

  // Update Window shake
  this.updateWindowShake();
};
//=============================================================================
// * Update Window Shake
//=============================================================================
SceneManager.updateWindowShake = function() {
  // If Duration is more than 0
  if (SceneManager._windowShakeDuration > 0) {
    // Decrease Duration
    SceneManager._windowShakeDuration--;
    // Get Scene
    var scene = this._scene;

    // Get Sin
    var sin = Math.sin(Graphics.frameCount)
    // Set Scene Position
    scene.x = Math.randomInt(Graphics.width / 2) * sin;
    scene.y = Math.randomInt(Graphics.height / 2) * sin;

    scene.x += Math.randomInt(200) * sin;
    scene.y += Math.randomInt(200) * sin;

    scene.scale.x = 1.0 + Math.random();
    scene.scale.y = 1.0 + Math.random();
    // Reverse Zoom X 50% of the time
    if (Math.randomInt(100) > 50) { scene.scale.x = -scene.scale.x; };
    // Reverse Zoom Y 5% of the time
    if (Math.randomInt(100) < 5) { scene.scale.y = -scene.scale.y; };
    // Set Shake Power
    var shakePower = 75;
    // Get Window X & Y Offset
    var screenX = Math.randomInt(100) > 50 ? -Math.randomInt(shakePower) : Math.randomInt(shakePower);
    var screenY = Math.randomInt(100) > 50 ? -Math.randomInt(shakePower) : Math.randomInt(shakePower);
    // Move Window to Position
    window.moveTo(SceneManager._windowOriginX + screenX, SceneManager._windowOriginY + screenY);

    // If Duration is 0 or less
    if (SceneManager._windowShakeDuration <= 0) {
      // Stop Window Shake
      this.stopWindowShake();
    };
  };
};



//=============================================================================
// ** ImageManager
//-----------------------------------------------------------------------------
// The static class that loads images, creates bitmap objects and retains them.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriBASE.ImageManager_loadNormalBitmap = ImageManager.loadNormalBitmap;
//=============================================================================
// * Determine if Ready
//=============================================================================
ImageManager.isReady = function() {
  return this._imageCache.isReady() && this._requestQueue._queue.length <= 0;
};
//=============================================================================
// * Load Input Icons
//=============================================================================
ImageManager.loadInputIcons = function() {
  this.reserveSystem('Input/24x24_black_all', 0, 'system');
  this.reserveSystem('Input/24x24_all', 0, 'system');
};


//=============================================================================
// ** SoundManager
//-----------------------------------------------------------------------------
// The static class that plays sound effects defined in the database.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriBASE.SoundManager_playEnemyDamage = SoundManager.playEnemyDamage;
_TDS_.OmoriBASE.SoundManager_playActorCollapse = SoundManager.playActorCollapse;
//=============================================================================
// * Play Enemy Damage Sound Effect
//=============================================================================
SoundManager._blockEnemySound = false;
//=============================================================================
// * Play Enemy Damage Sound Effect
//=============================================================================
SoundManager.playEnemyDamage = function() {
  // Return if enemy sound is being blocked
  if (SoundManager._blockEnemySound) { return; }
  // Current World Index Switch Case
  if($gameParty.inBattle() && [445].contains($gameTroop._troopId)) {return _TDS_.OmoriBASE.SoundManager_playEnemyDamage.call(this);}
  switch (SceneManager.currentWorldIndex()) {
    case 3: // Black Space
       AudioManager.playStaticSe({ name: 'BA_sad', volume: 100, pitch: 0, pan: 0})
      break;
    default:
      // Run Original Function
      _TDS_.OmoriBASE.SoundManager_playEnemyDamage.call(this);
      break;
  };
};
//=============================================================================
// * Play Actor Collapse Sound
//=============================================================================
SoundManager.playActorCollapse = function() {
  // If in battle and switch 95 is on return
  if ($gameParty.inBattle() && $gameSwitches.value(95))  { return; }
  // Run Original Function
  _TDS_.OmoriBASE.SoundManager_playActorCollapse.call(this);
};



//=============================================================================
// ** Game_Temp
//-----------------------------------------------------------------------------
// The game object class for temporary data that is not included in save data.
//=============================================================================
// * Determine if Common Event is for battle use only
//=============================================================================
Game_Temp.prototype.isCommonEventForBattleOnly = function(id) {
  // Set Default ID
  if (id === undefined) { id = this._commonEventId; }
  // Get Common Event
  var commonEvent = $dataCommonEvents[id]
  // If Common event exists
  if (commonEvent) {
    // Return Regexp Match
    return commonEvent.name.match(/\[BATTLEONLY\]/i);
  } else {
    return false;
  };
};



//=============================================================================
// ** Game_System
//-----------------------------------------------------------------------------
// The game object class for the system data.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriBASE.Game_System_initialize = Game_System.prototype.initialize;
_TDS_.OmoriBASE.Game_System_onAfterLoad = Game_System.prototype.onAfterLoad;
//=============================================================================
// * Object Initialization
//=============================================================================
Game_System.prototype.initialize = function() {
  // Run Original Function
  _TDS_.OmoriBASE.Game_System_initialize.call(this);
  // It's Magic!
  this._originalMagicalSeed = Math.randomInt(100);
  // It's Just magical
  this._magicalSeed = this._originalMagicalSeed;
};
//=============================================================================
// * Replant Magical Seed
//=============================================================================
Game_System.prototype.replantMagicalSeed = function(seed = this._originalMagicalSeed) {
  this._magicalSeed = seed;
};
//=============================================================================
// * Grow Magical Seed
//=============================================================================
Game_System.prototype.growMagicalSeed = function() {
  this._magicalSeed = ((this._magicalSeed + 1) % 100).clamp(1, 100)
};
//=============================================================================
// * Get Magical Seed
//=============================================================================
Game_System.prototype.getMagicalSeed = function(offset = 0, float = true) {
  // Set Value
  const value = this._magicalSeed + offset;
  // Get Base Number
  const base = 2516837;
  // Grow Magical Seed
  this.growMagicalSeed();
  // Return Value
  return float ? value * 16807 % base / base : value * 16807 % base;
}
//=============================================================================
// * After Load Processing
//=============================================================================
Game_System.prototype.onAfterLoad = function() {
  // Run Original Function
  _TDS_.OmoriBASE.Game_System_onAfterLoad.call(this);
  // Run Common Event
  $gameTemp.reserveCommonEvent(40);
  // If Character starfing exists
  if (_TDS_.CharacterPressTurn_Strafing) {
    // Set Strafe Switch
    $gameSwitches.setValue(_TDS_.CharacterPressTurn_Strafing.params.strafingDisableSwitchID, ConfigManager.characterStrafe)
  };
};


//=============================================================================
// ** Game_Picture
//-----------------------------------------------------------------------------
// The game object class for a picture.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriBASE.Game_Picture_initBasic = Game_Picture.prototype.initBasic;
//=============================================================================
// * Initialize Basic
//=============================================================================
Game_Picture.prototype.initBasic = function() {
  // Run Original Function
  _TDS_.OmoriBASE.Game_Picture_initBasic.call(this);
  // Pinned to map flag
  this._pinnedToMap = false;
};
//=============================================================================
// * Pin Picture to Map
//=============================================================================
Game_Picture.prototype.pinToMap = function(state = true) { this._pinnedToMap = state; };
//=============================================================================
// * Determine if Pinned to map
//=============================================================================
Game_Picture.prototype.isPinnedToMap = function() { return this._pinnedToMap; };
Game_Picture.prototype.followShake = function(value) {return this._followShake = value}
Game_Picture.prototype.isFollowingShake = function() {return !!this._followShake}



//=============================================================================
// ** Game_Message
//-----------------------------------------------------------------------------
// The game object class for the state of the message window that displays text
// or selections, etc.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriBASE.Game_Message_clear = Game_Message.prototype.clear;
//=============================================================================
// * Clear
//=============================================================================
Game_Message.prototype.clear = function() {
  // Run Original Function
  _TDS_.OmoriBASE.Game_Message_clear.call(this);
  // Clear Extra Faces Array
  this._extraFaces = [];
  // Face Background Color
  this._faceBackgroundColor = null;
};
//=============================================================================
// * Get Extra Faces
//=============================================================================
Game_Message.prototype.extraFaces = function() { return this._extraFaces };
//=============================================================================
// * Get Face Count
//=============================================================================
Game_Message.prototype.faceCount = function() {
  // Set Initial Count
  var count = this._faceName === '' ? 0 : 1;
  // Return total amount of faces
  return count + this._extraFaces.length;
};
//=============================================================================
// * Set Extra Face
//=============================================================================
Game_Message.prototype.setExtraFace = function(index, faceName, faceIndex, color = null) {
  // Set Extra Faces Face at Index
  this._extraFaces[index] = {faceName: faceName, faceIndex: faceIndex, color: color};
};


//=============================================================================
// ** Game_Map
//-----------------------------------------------------------------------------
// The game object class for a map. It contains scrolling and passage
// determination functions.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriBASE.Game_Map_initialize = Game_Map.prototype.initialize;
_TDS_.OmoriBASE.Game_Map_setup = Game_Map.prototype.setup;
_TDS_.OmoriBASE.Game_Map_setupScroll = Game_Map.prototype.setupScroll;
_TDS_.OmoriBASE.Game_Map_updateScroll = Game_Map.prototype.updateScroll;
//=============================================================================
// * Object Initialization
//=============================================================================
Game_Map.prototype.initialize = function() {
  // Run Original Function
  _TDS_.OmoriBASE.Game_Map_initialize.call(this);
  // Initialize Region Move Directions
  this._regionMovedirections = {};
};
//=============================================================================
// * Setup
//=============================================================================
Game_Map.prototype.setup = function(mapId) {
  // Run Original Function
  _TDS_.OmoriBASE.Game_Map_setup.call(this, mapId);
  // Setup Position Move Direction
  this.setupPositionMoveDirection();
};
//=============================================================================
// * Setup Scrolling
//=============================================================================
Game_Map.prototype.setupScroll = function() {
  // Run Original Function
  _TDS_.OmoriBASE.Game_Map_setupScroll.call(this);
  // Initialize Scrolling Values
  this._scrollStart = null;
  this._scrollTarget = null;
  this._scrollDuration = 0;
  this._scrollingTime = 0;
};
//=============================================================================
// * Setup Position Move Direction
//=============================================================================
Game_Map.prototype.setupPositionMoveDirection = function() {
  // Initialize Region Move Directions
  this._regionMovedirections = {};
};
//=============================================================================
// * Set Region Move direction
//=============================================================================
Game_Map.prototype.setRegionMoveDirection = function(regionId, direction = 0) {
  this._regionMovedirections[regionId] = direction;
};
//=============================================================================
// * Get Position Auto Move Direction
//=============================================================================
Game_Map.prototype.positionAutoMoveDirection = function(x, y) {
  // Get Region ID
  var regionId = this.regionId(x, y);
  // If region move directions exist
  if (this._regionMovedirections[regionId] !== undefined) { return this._regionMovedirections[regionId]; };
  // Return 0 by default
  return 0;
};
//=============================================================================
// * Scroll to target
//=============================================================================
Game_Map.prototype.scrollToTarget = function(x, y, duration) {
  // Get End X & Y Values
  const endX = this.width() - this.screenTileX();
  const endY = this.height() - this.screenTileY();
  // Clamp X & Y Target values
  x = endX < 0 ? endX / 2 : x.clamp(0, endX)
  y = endY < 0 ? endY / 2 : y.clamp(0, endY);
  // Set Scrolling Target
  this._scrollStart = new Point(this._displayX, this._displayY);
  this._scrollTarget = new Point(x, y);
  this._scrollDuration = duration;
  this._scrollingTime = 0;
};
//=============================================================================
// * Update Scrolling
//=============================================================================
Game_Map.prototype.updateScroll = function() {
  // If Scrolling Duration is more than 0
  if (this._scrollDuration > 0) {
    // Update Lerp Scrolling
    this.updateLerpScrolling();
    return;
  }
  // Run Original Function
  _TDS_.OmoriBASE.Game_Map_updateScroll.call(this);

 // if (Input.isTriggered('control')) {
 //     this.scrollToTarget(Math.randomInt($dataMap.width), Math.randomInt($dataMap.height), 60);
 //   //  this.scrollToTarget(0, 0, 60);
 //     return;
 //  }
};
//=============================================================================
// * Update Linear Interpolation Scrolling
//=============================================================================
Game_Map.prototype.updateLerpScrolling = function() {
  // Increase Scrolling Time
  this._scrollingTime++;
  // Get Time, X and Y coordinates
  let t = this._scrollingTime / this._scrollDuration;
  let x = (1 - t) * this._scrollStart.x + t * this._scrollTarget.x;
  let y = (1 - t) * this._scrollStart.y + t * this._scrollTarget.y;
  // Set Display Position
  this.setDisplayPos(x, y);
  // If Scrolling time is equal or more than scroll duration
  if (this._scrollingTime >= this._scrollDuration) {
    // Reset Scrolling Values
    this._scrollTarget = null;
    this._scrollDuration = 0;
  }
};


_TDS_.OmoriBASE.Game_Map_isDashDisabled = Game_Map.prototype.isDashDisabled;
Game_Map.prototype.isDashDisabled = function() {
  return _TDS_.OmoriBASE.Game_Map_isDashDisabled.call(this) || this.isLadder($gamePlayer.x, $gamePlayer.y);
};



//=============================================================================
// ** Game_Event
//-----------------------------------------------------------------------------
// The game object class for an event. It contains functionality for event page
// switching and running parallel process events.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriBASE.Game_Event_isEventAllTouchTrigger = Game_Event.prototype.checkEventTriggerTouch;
_TDS_.OmoriBASE.Game_Event_setupCopyEvent = Game_Event.prototype.setupCopyEvent;
_TDS_.OmoriBASE.Game_Event_canSeePlayer = Game_Event.prototype.canSeePlayer;
_TDS_.OmoriBASE.Game_Event_updateChaseMovement = Game_Event.prototype.updateChaseMovement;
//=============================================================================
// * Determine if Event is All Touch Trigger
//=============================================================================
Game_Event.prototype.isEventAllTouchTrigger = function () {
  if (this._allTouchTrigger) { return true; }
  // Get Event
  var event = this.event();
  // If event exists
  if (event) {
    // If event has meta data
    if (event.meta) { return event.meta.AllTouchTrigger; };
  };
  // Return false by default
  return false;
};
//=============================================================================
// * Check Event Trigger Touch
//=============================================================================
Game_Event.prototype.setupCopyEvent = function() {
  // Run Original Function
  _TDS_.OmoriBASE.Game_Event_setupCopyEvent.call(this);
  // If Copied Event
  if (this._copiedEvent) {
    // Set All Touch Trigger flag for events
    this._allTouchTrigger = this.event().note.contains('<AllTouchTrigger>')
  };
};
//=============================================================================
// * Check Event Trigger Touch
//=============================================================================
Game_Event.prototype.checkEventTriggerTouch = function (x, y) {
  // Run Original Function
  _TDS_.OmoriBASE.Game_Event_isEventAllTouchTrigger.call(this, x, y);
  // If It's an all touch event and its not starting already
  if (this.isEventAllTouchTrigger() && !this.isStarting()) {
    if (!$gameMap.isEventRunning()) {
      if ($gamePlayer.pos(x, y)) {
        if (!this.isJumping() && this.isNormalPriority()) {
          this.start();
        };
      };
    };
  };
};
// //=============================================================================
// // * Determine if Event can see player
// //=============================================================================
// Game_Event.prototype.canSeePlayer = function() {
//   // Return False if map character tag opacity is more than 0
//   if (SceneManager._scene._mapCharacterTag.opacity > 0) { return false; };
//   // Return Original Function
//   return _TDS_.OmoriBASE.Game_Event_canSeePlayer.call(this);
// };


Game_Event.prototype.updateChaseMovement = function() {
  // Return if map character tag opacity is more than 0
  if (SceneManager._scene._mapCharacterTag.opacity > 0) { return; };

  // Run Original Function
  _TDS_.OmoriBASE.Game_Event_updateChaseMovement.call(this);

};


//=============================================================================
// ** Game_Interpreter
//-----------------------------------------------------------------------------
// The interpreter for running event commands.
//=============================================================================
_TDS_.OmoriBASE.Game_Interpreter_clear = Game_Interpreter.prototype.clear;
_TDS_.OmoriBASE.Game_Interpreter_terminate = Game_Interpreter.prototype.terminate;
_TDS_.OmoriBASE.Game_Interpreter_requestImages = Game_Interpreter.requestImages;
//=============================================================================
// * Clear
//=============================================================================
Game_Interpreter.prototype.clear = function() {
  // Run Original Function
  _TDS_.OmoriBASE.Game_Interpreter_clear.call(this);
  // Reset Requested Image Count
  this._requestedImageCount = 0;
};
//=============================================================================
// * Setup Event
//=============================================================================
Game_Interpreter.prototype.setup = function(list, eventId) {
  this.clear();
  this._mapId = $gameMap.mapId();
  this._eventId = eventId || 0;
  this._list = list;
  this._requestedImageCount = Game_Interpreter.requestImages(list, undefined, this._eventId);
};
//=============================================================================
// * Terminate
//=============================================================================
Game_Interpreter.prototype.terminate = function() {
  // If Images were requested
  if (this._requestedImageCount > 0) {
    // Release Temporary Images
    ImageManager.releaseReservation(this.temporaryReservationId());
  };
  // Run Original Function
  _TDS_.OmoriBASE.Game_Interpreter_terminate.call(this);
};
//=============================================================================
// * Get Temporary Reservation ID
//=============================================================================
Game_Interpreter.prototype.temporaryReservationId = function() {
  return 'TEMP_EVENT_' + this._eventId;
};
//=============================================================================
// * Wait on Bitmap
//=============================================================================
Game_Interpreter.prototype.waitForBitmap = function(bitmap) {
  // If Bitmap is not ready and width and height less than 0
  if (ImageManager.isReady() && bitmap && (!bitmap.isReady() || bitmap.width <= 0 || bitmap.height <= 0)) {
    // Wait 10 frames
    this.wait(10);
    // Go through list in reverse
    for (var i = this._index; i >= 0; i--) {
      // Get Command
      const command = this._list[i];
      // If at the top of the script call
      if (command.code === 355) {
        this._index = i-1;
        break;
      };
    }
  };
};
//=============================================================================
// * Request Images
//=============================================================================
Game_Interpreter.requestImages = function(list, commonList, id = 0){
  // Set Count
  let count = 0;
  // If List Exists
  if (list) {
    // If List exists
    if (list) {
      // Get First Command
      const command = list[0];
      // If its an event command and contains the tag
      if (command.code === 108 && command.parameters[0].contains("<IgnoreEventImageLoading>")) {
        return 0;
      };
    };
    // Get Temporary Reservation ID
    const reservationId = 'TEMP_EVENT_' + id;
    // Go Through list
    for (var i = 0; i < list.length; i++) {
      // Get Command
      const command = list[i];
      // Command Code Switch Case
      switch(command.code){
        // Plugin Command
        case 356:
          // Get Arguments and command name
          const args = command.parameters[0].split(" ");
          const commandName = args.shift();
          // If Command Name is for showing message
          if (commandName === 'ShowMessage') {
            // Get Message Data
            const data = LanguageManager.getMessageData(args[0]);
            // If Fceset is not empty
            if (data.faceset !== "") {
              // Request Face Image
              ImageManager.reserveFace(data.faceset, 0, reservationId);
              // Increase Count
              count++;
            };
            // If Data has Extra Faces
            if (data.extraFaces) {
              // Go Through Extra Fraces
              for (var i = 0; i < data.extraFaces.length; i++) {
                // Request Extra Faces Image
                ImageManager.loadFace(data.extraFaces[i].faceset);
                /// Increase Load Count
                count++;
              };
            };
          };
        break;
      }
    };
  };
  // Run Original Function
  _TDS_.OmoriBASE.Game_Interpreter_requestImages.call(this, list, commonList);
  // Return Total Count
  return count;
}
//=============================================================================
// * Set Character Input Icon
//=============================================================================
Game_Interpreter.prototype.setCharacterInputIcon = function(input, id = 0) {
  // Get Character
  var character = this.character(id);
  // If Character Exists
  if (character) {
    // Setup Input Icon
    character.setupInputIcon(input);
  };
};
//=============================================================================
// * Remove Character Input Icon
//=============================================================================
Game_Interpreter.prototype.removeCharacterInputIcon = function(id) {
  // Get Character
  var character = this.character(id);
  // If Character Exists
  if (character) {
    // Clear Input Icon
    character.clearInputIcon();
  };
};
//=============================================================================
// * Pin Picture to map
//=============================================================================
Game_Interpreter.prototype.pinPictureToMap = function(pictureId, state = true) {
  // Get Picture
  var picture = $gameScreen.picture(pictureId);
  // If Picture exists set pin to map state
  if (picture) { picture.pinToMap(state); };
};

Game_Interpreter.prototype.pictureFollowShake = function(pictureId, state = true) {
  // Get Picture
  var picture = $gameScreen.picture(pictureId);
  // If Picture exists set pin to map state
  if (picture) { picture.followShake(state); };
};
//=============================================================================
// * Key Item Culling (Force to 1)
//=============================================================================
Game_Interpreter.prototype.keyItemCull = function() {
  // List of Items to cull
  var list = [850, 851, 852, 853, 854, 855, 856, 857, 858, 859, 860, 861, 862, 863, 864, 865, 866, 867, 868, 869, 870, 871, 872, 873, 874, 875];
  // Set Quantity of Items in list to 1
  for (var i = 0; i < list.length; i++) {
    // Get Item Id
    var id = list[i];
    // If Item Exists
    if ($gameParty._items[id]) { $gameParty._items[id] = 1; };
  };
};
//=============================================================================
// * Set event Icon
//=============================================================================
Game_Interpreter.prototype.setEventIcon = function(eventId, img, index) {
  var map = $gameMap.mapId();
  var event = $gameMap.event(eventId);
  if (!$eventData.hasCategory("eventcon")) $eventData.addCategory("eventcon");
  $eventData.setValueExt("eventcon", map, eventId, [img, index]);
  event.removeEventcon();
  event.setupEventcon(img, index);
  event.refresh();
};
//=============================================================================
// * Change World Item Container
//=============================================================================
Game_Interpreter.prototype.changeWorldItemContainer = function(world = SceneManager.currentWorldIndex()) {
  // Change World Item Container
  $gameParty.changeWorldItemContainer(world);
};
//=============================================================================
// * Setup Ambience
//=============================================================================
Game_Interpreter.prototype.setupAmbience = function(name, x = 0, y = 0, custom = false) {
  // Get Ambience Data
  var data = $gamePlayer._ambienceData;
  // Set Ambience Data
  data.name = name;
  data.x = x; data.y = data.useCustomPosition = custom;
  // Setup Ambience Bitmap
  SceneManager._scene._spriteset.setupAmbienceBitmaps(data.name);
};
//=============================================================================
// * Initialize Singing Mini Game
//=============================================================================
Game_Interpreter.prototype.initSingingMiniGame = function() {
  // Initialize Singing Mini Game
  $gameTemp._singingMiniGame = {singingLevel: 26, finished: false};
  // Get Mole Events
  $gameTemp._singingMiniGame.events = $gameMap.events().filter(function(event) { return event.event().meta.SingingMole });
  // Get Tomato Events
  $gameTemp._singingMiniGame.tomatoEvents = $gameMap.events().filter(function(event) { return event.event().meta.Tomato });
  // Go through Events
  for (var i = 0; i < $gameTemp._singingMiniGame.events.length; i++) {
    // Get Mole Event
    var event = $gameTemp._singingMiniGame.events[i];
    // Get Tomato Event
    var tomato = $gameTemp._singingMiniGame.tomatoEvents[i];
    tomato.setDirectionFix(false)
    tomato.setImage('DW_SleepingMoles', 0);
    tomato.setDirection(4)
    tomato.setDirectionFix(true)
    tomato.setPosition(event._x, event._y);
    tomato._opacity = 0;
    // Initialize Singing Variables
    event._singing = {level: 3, oldLevel: 3, maxTimer: 120, timerVariance: 5, timerSize: 30}
    // Reset Timer
    event._singing.timer = event._singing.maxTimer + ((1 + Math.randomInt(event._singing.timerVariance)) * event._singing.timerSize)
    // Set Tomato Event
    event._singing.tomato = tomato;
    event.setImage('DW_SleepingMoles', 0);
    event.setDirection(2);
    event.setStepAnime(true)
  };
  // Play BGM
  AudioManager.playBgm({name: 'event_bride_miraculously_good', volume: 100, pitch: 100});
};
//=============================================================================
// * Wake Up singing moles
//=============================================================================
Game_Interpreter.prototype.wakeUpSingingMoles = function(x = $gamePlayer._x) {
  // If there's no singing mini game return
  if (!$gameTemp._singingMiniGame) { return; };
  // If Mini game is finished
  if ($gameTemp._singingMiniGame.finished) { return; }
  // Get Events
  var events = $gameTemp._singingMiniGame.events;
  // Go Through Events
  for (var i = 0; i < events.length; i++) {
    // Get Event
    var event = events[i];
    // If Event X matches set X
    if (event._x === x) {
      // Get Singing values
      var singing = event._singing;
      // Get Tomato Event
      var tomato = singing.tomato;
      // If Singing level is less than 2
      if (singing.level < 2 && !tomato._inThrowMotion) {
        // Set Tomato Direction
        tomato.setDirectionFix(false)
        tomato.setDirection(4)
        tomato.setDirectionFix(true)
        tomato.setPosition(tomato.x, 15);
        tomato._opacity = 255;
        tomato.setMoveSpeed(2)
        tomato._inThrowMotion = true;
        tomato._fadeOutDelay = 20;
        tomato.jump(0, -$gameMap.deltaY(tomato._y, event._y))
      };
    };
  };
};
//=============================================================================
// * Update Singing Mini Game
//=============================================================================
Game_Interpreter.prototype.updateSingingMiniGame = function() {
  // If mini game finished
  if ($gameTemp._singingMiniGame.finished) {
    // Get Events
    var events = $gameTemp._singingMiniGame.events;
    // Go Through Events
    for (var i = 0; i < events.length; i++) {
      // Get Event
      var event = events[i];
      // Get Singing values
      var singing = event._singing;
      // Get Tomato
      var tomato = singing.tomato;
      // If Tomato has been thrown but is finished jumping
      if (tomato._inThrowMotion && !tomato.isJumping()) {
        tomato.setDirectionFix(false)
        tomato.setDirection(8)
        tomato.setDirectionFix(true)
        // tomato._opacity = 0;
        tomato._inThrowMotion = false;
        tomato.setMoveSpeed(event.moveSpeed());
        // Reset Singing Level
        singing.oldLevel = singing.level = 2;
        // Refresh Singing event Graphics
        this.refreshSingingEventGraphics(event);
        continue;
      };

      if (!tomato._inThrowMotion && tomato._opacity > 0) {
        if (tomato._fadeOutDelay > 0) {
          tomato._fadeOutDelay--
        } else {
          tomato._opacity -= 25;
        }
      }
    }
    // console.log($gameTemp._singingMiniGame.singingLevel)
   return;
 };

 // If audio manager has bgm buffer
  if (AudioManager._bgmBuffer) {
    // Get song position
    var pos = AudioManager._bgmBuffer.seek();
    // If song is over
    if (pos >= 31) {
      // Stop BGM
      AudioManager.stopBgm();
      // Set Finished Flag to true
      $gameTemp._singingMiniGame.finished = true;
      return
    }
  };

  // Get Events
  var events = $gameTemp._singingMiniGame.events;
  // Set Level Count
  var singingLevel = 0;
  // Go Through Events
  for (var i = 0; i < events.length; i++) {
    // Get Event
    var event = events[i];
    // Get Singing values
    var singing = event._singing;
    // Get Tomato
    var tomato = singing.tomato;
    // If Tomato has been thrown but is finished jumping
    if (tomato._inThrowMotion && !tomato.isJumping()) {
      tomato.setDirectionFix(false)
      tomato.setDirection(8)
      AudioManager.playSe({name: "ft_gross", volume: 100, pitch: 100});
      tomato.setDirectionFix(true)
      // tomato._opacity = 0;
      tomato._inThrowMotion = false;
      tomato.setMoveSpeed(event.moveSpeed());
      tomato.jump(0, 0)
      // Jump
      event.jump(0, 0);
      // Reset Singing Level
      singing.oldLevel = singing.level = 2;
      // Reset Timer
      singing.timer = singing.maxTimer + (1 + Math.randomInt(singing.timerVariance) * singing.timerSize);

      // Refresh Singing event Graphics
      this.refreshSingingEventGraphics(event);
      // Increase Singing Level
      singingLevel += singing.level;
      continue;
    };

    if (!tomato._inThrowMotion && tomato._opacity > 0) {
      if (tomato._fadeOutDelay > 0) {
        tomato._fadeOutDelay--
      } else {
        tomato._opacity -= 25;
      }
    }

    // If Singing Timer is 0 or less
    if (singing.timer <= 0) {
      // Decrease Singing Level
      if (singing.level > 0) { singing.level--; };
      // Reset Timer
      singing.timer = singing.maxTimer + (1 + Math.randomInt(singing.timerVariance) * singing.timerSize);
    } else {
      // Decrease Singing Timer
      singing.timer--;
    }
    // If Singing Level is not the same as old level
    if (singing.level !== singing.oldLevel) {
      // Update Old Level
      singing.oldLevel = singing.level;
      // Refresh Singing event Graphics
      this.refreshSingingEventGraphics(event);
    };
    // Increase Singing Level
    singingLevel += singing.level;
  };
  // If Singing Level does not match old singing level
  if (singingLevel !== $gameTemp._singingMiniGame.singingLevel) {
    // Set Singing Level
    $gameTemp._singingMiniGame.singingLevel = singingLevel;
    // Update Singing Event BGM
    this.updateSingingEventBGM(singingLevel);
  };
};
//=============================================================================
// * Update Singing Mini Game
//=============================================================================
Game_Interpreter.prototype.refreshSingingEventGraphics = function(event) {
  // Get Singing values
  var singing = event._singing;
  // Singing Level switch case
  switch (singing.level) {
    case 0:
      event.setImage('DW_SleepingMoles', 1);
      event.setDirection(4);
      break;
    case 1:
      event.setImage('DW_SleepingMoles', 1);
      event.setDirection(2);
      break;
    case 2:
      event.setImage('DW_SleepingMoles', 0);
      event.setDirection(2);
      break;
  };
};
//=============================================================================
// * Update Singing Event BGM
//=============================================================================
Game_Interpreter.prototype.updateSingingEventBGM = function(singingCount) {
  // Set Song Level
  var level = 0;
  // Check Singing count to set level
  if (singingCount > 20) {
    level = 2;
  } else if (singingCount < 20 && singingCount > 6) {
    level = 1;
  } else {
    level = 0;
  }
  // Get Song Name
  var name = ['event_bride_absolute_evil', 'event_bride_horrible','event_bride_miraculously_good'][level]
  // Get BGM Buffer
  var bgm = AudioManager._bgmBuffer;
  // Play BGM
  AudioManager.playBgm({name: name, volume: 100, pitch: 100}, bgm ? bgm.seek() : undefined, false);
};




//=============================================================================
// ** Game_Action
//-----------------------------------------------------------------------------
// The game object class for a battle action.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriBASE.Game_Action_testItemEffect = Game_Action.prototype.testItemEffect;
//=============================================================================
// * Test Item Effect
//=============================================================================
Game_Action.prototype.testItemEffect = function(target, effect) {
  // If Code is for Common Events
  if (effect.code === Game_Action.EFFECT_COMMON_EVENT) {
    // If Not in battle and the common event is for battle only
    if (!$gameParty.inBattle() && $gameTemp.isCommonEventForBattleOnly(effect.dataId)) {
      return false;
    };
  };
  // Return Original Function
  return _TDS_.OmoriBASE.Game_Action_testItemEffect.call(this, target, effect);
};


_TDS_.OmoriBASE.Game_Actor_changeLevel = Game_Actor.prototype.changeLevel;
Game_Actor.prototype.changeLevel = function(level, show) {
  _TDS_.OmoriBASE.Game_Actor_changeLevel.call(this, level, show);
  if ($gameParty.inBattle()) {
    AudioManager.playSe({name: "BA_Level_Up", volume: 100, pitch: 100});
  }
};

//=============================================================================
// ** Game_Party
//-----------------------------------------------------------------------------
// The game object class for the party. Information such as gold and items is
// included.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriBASE.Game_Party_initialize = Game_Party.prototype.initialize;
_TDS_.OmoriBASE.Game_Party_allMembers = Game_Party.prototype.allMembers
_TDS_.OmoriBASE.Game_Party_gainItem   = Game_Party.prototype.gainItem
//=============================================================================
// * Object Initialize
//=============================================================================
Game_Party.prototype.initialize = function() {
  // Run Original Function
  _TDS_.OmoriBASE.Game_Party_initialize.call(this);
  // Initialize Scanned Enemy List
  this._scannedEnemyList = [];
  // Black letters list
  this._blackLetters = [];
  // BlackLetter Index
  this._blackLetterIndex = 0;
  // Set Last Item Data
  this._lastItemData = {id: 0, type: 0, amount: 0}
  // Initialize Stress Energy Count
  this.stressEnergyCount = 0;
  // Initialize World Items container
  this.initWorldItemsContainer();
};
//=============================================================================
// * Stress Energy Count
//=============================================================================
Object.defineProperty(Game_Party.prototype, 'stressEnergyCount', {
  get: function() {return this._stressEnergyCount;},
  set: function (value) {
    this._stressEnergyCount = value.clamp(0, 10);
  },
  configurable: true
});
//=============================================================================
// * Determine if Party has type of items
//=============================================================================
Game_Party.prototype.hasKeyItems = function(hidden = false) {
  return this.items().some(function(item) {
    if (!hidden && item.meta.HideInMenu) { return false; }
    return DataManager.isKeyItem(item)
  })
};
Game_Party.prototype.hasConsumableItems = function(hidden = false) {
  return this.items().some(function(item) {
    if (!hidden && item.meta.HideInMenu) { return false; }
    return DataManager.isConsumableItem(item)
  })
};
Game_Party.prototype.hasToyItems = function(hidden = false) {
  return this.items().some(function(item) {
    if (!hidden && item.meta.HideInMenu) { return false; }
    return DataManager.isToyItem(item)
  })
};
//=============================================================================
// * Determine if Party has valid pocket items
//=============================================================================
Game_Party.prototype.hasValidPocketItems = function() {
  return this.items().some(function(item) {
    if (item.meta.HideInMenu) { return false; }
    if (DataManager.isKeyItem(item) || DataManager.isConsumableItem(item) || DataManager.isToyItem(item)) { return true; };
    return false;
  })
};
//=============================================================================
// * Determine if Party is in Faraway
//=============================================================================
Game_Party.prototype.isInFaraway = function() { return $gameSwitches.value(7); };
//=============================================================================
// * Initialize Worlds Item container
//=============================================================================
Game_Party.prototype.initWorldItemsContainer = function() {
  // Initialize World Item container Object
  this._worldItemsContainer = {}
  // Set Last World Item Index
  this._lastWorldItemIndex = SceneManager.currentWorldIndex();
  // Create 5 world item container objects
  for (var i = 0; i < 5; i++) {
    // Set World Container Object
    this._worldItemsContainer[i] = {items: {}, weapons: {}, armors: {}}
  };
};
//=============================================================================
// * Change Worlds Item container
//=============================================================================
Game_Party.prototype.changeWorldItemContainer = function(world = SceneManager.currentWorldIndex()) {
  // Get Last Container & New Container
  var lastContainer = this._worldItemsContainer[this._lastWorldItemIndex];
  var newContainer = this._worldItemsContainer[world];
  // Save current to current container
  Object.assign(lastContainer.items, this._items);
  Object.assign(lastContainer.weapons, this._weapons);
  Object.assign(lastContainer.armors, this._armors);
  // Set Item Lists
  this._items = newContainer.items;
  this._weapons = newContainer.weapons;
  this._armors = newContainer.armors;
  // Update Last World Item Index
  this._lastWorldItemIndex = world;
  // Get Containers
  var containers = [[this._items, $dataItems], [this._weapons, $dataWeapons], [this._armors, $dataArmors]];
  // Go through Containers
  for (var i = 0; i < containers.length; i++) {
    // Get List
    var container = containers[i][0];
    var itemData = containers[i][1];
    var list = Object.keys(container);
    // Go through container list
    for (var i2 = 0; i2 < list.length; i2++) {
      // Get ID
      var id = list[i2];
      // Get Item
      var item = itemData[id];
      // If Item exists but does not match the world index
      if (item && item.meta.WorldIndex && Number(item.meta.WorldIndex) !== world) {
        // Delete Item from container
        delete container[id];
      };
    };
  };
};
//=============================================================================
// * Get Number of Items available in battle
//=============================================================================
Game_Party.prototype.battleNumItems = function(item) {
  // Get Container
  let container = this.itemContainer(item);
  // Set starting total
  let total =  container ? container[item.id] || 0 : 0;
  // Get All members
  let members = this.allMembers();
  // Get Active Actor
  let actor = BattleManager.actor();
  // Get Actor Current Action
  let currentAction = actor.currentAction();
  // Go through members
  for (var i = 0; i < members.length; i++) {
    // Get Member
    let member = members[i];
    // Go Through Actions
    for (var i2 = 0; i2 < member._actions.length; i2++) {
      // Get Actions
      let action = member._actions[i2];
      // If action is the current one for selecting continue on
      if (action === currentAction) { continue; };
      // If Action is for an item and it matches the id
      if (action.isItem() && action._item.itemId() === item.id) { total--; };
    };
  }
  // Return total
  return Math.max(0, total);
};
//=============================================================================
// * Get All Members
//=============================================================================
Game_Party.prototype.allMembers = function() {
  // If in Faraway
  if (this.isInFaraway()) {
    return this._actors.map(function(id) {
      // Get Actor
      var actor = $gameActors.actor(id);
      // If Actor has Faraway Id
      if (actor._farawayActorId) { return $gameActors.actor(actor._farawayActorId); };
      // Return Default Actor
      return actor
    });
  } else {
    // Return Original Function
    return _TDS_.OmoriBASE.Game_Party_allMembers.call(this);
  }
};
//=============================================================================
// * Get Last Gained Item
//=============================================================================
Game_Party.prototype.lastGainedItem = function() {
  switch (this._lastItemData.type) {
    case 0: return $dataItems[this._lastItemData.id] ;break;
    case 1: return $dataWeapons[this._lastItemData.id] ;break;
    case 2: return $dataArmors[this._lastItemData.id] ;break;
  };
};
//=============================================================================
// * Gain Item
//=============================================================================
Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
  // // If Amount is more than 0
  if (item) {
    // Get Container
    var container = this.itemContainer(item);
    // Get Equipment and Armor Type
    var equipmentType = item.etypeId
    var armorType = item.atypeId
    // Set Last Gained Item Type (Item)
    this._lastItemData.type = 0;
    // Set Item ID
    this._lastItemData.id = item.id
    // Set Last Item Data Amount
    this._lastItemData.amount = amount;
    // If Weapon
    if (armorType === undefined && equipmentType !== undefined) {
      // Set Last Gained Item Type (Weapon)
      this._lastItemData.type = 1;
    } else if (armorType !== undefined && equipmentType !== undefined) {
      // Set Last Gained Item Type (Armor)
      this._lastItemData.type = 2;
    };

    if (this.inBattle()) {
    //  AudioManager.playSe({name: "SYS_NewSkill", volume: 100, pitch: 100});
    }

  };
  // Run Original Function
  _TDS_.OmoriBASE.Game_Party_gainItem.call(this, item, amount, includeEquip);
};
//=============================================================================
// * Sort Members for Tag
//=============================================================================
Game_Party.prototype.sortMembersForTag = function(leaderId) {
  // Get Default Party Configuration


  /*var original = [1, 2, 3, 4];

  if ($gameSwitches.value(1038)) {
    original = [1,2,3,4];
  } else if ($gameSwitches.value(1037)) {
    original = [1,2,3];
  } else if ($gameSwitches.value(1036)) {
    original = [1,3];
  }*/
  if ($gameVariables.value(22) === 2) {
    original = [8, 10, 9, 11];
    // Set Party
    this._actors = original.clone();
    // Get Index
    var index = this._actors.indexOf(leaderId);
    // If Index is valid
    if (index > -1) {
      this._actors.splice(index, 1);
      this._actors.splice(0, 0, leaderId);
    };
  }
  else {
    let leader = this._actors.splice(this._actors.indexOf(leaderId), 1);
    this._actors.sort((a,b) => a - b)
    this._actors = [...leader, ...this._actors]
  }
  // Refresh Player
  $gamePlayer.refresh();
};
//=============================================================================
// * Add Scanned Enemy
//=============================================================================
Game_Party.prototype.addScannedEnemy = function(id) {
  // Add Scanned Enemy to list
  if (!this._scannedEnemyList.contains(id)) { this._scannedEnemyList.push(id); };
};
//=============================================================================
// * Get Member at Status Index
//=============================================================================
Game_Party.prototype.memberAtStatusIndex = function(index) {
  return this.battleMembers().find(function(actor) {
    return actor.battleStatusIndex() === index;
  });
};
//=============================================================================
// * Get Last Black letter obtained
//=============================================================================
Game_Party.prototype.lastBlackLetter = function(obj = false) {
  // If there are blackletters
  if (this._blackLetters.length > 0) {
    // Get Item
    var item =  $dataItems[this._blackLetters[this._blackLetters.length-1]];
    // Return the last item or letter
    return obj ? item : item.meta.Blackletter.trim().toUpperCase();
  };
  // Return empty or null
  return obj ? null : " " ;
};




//=============================================================================
// ** Game_Troop
//-----------------------------------------------------------------------------
// The game object class for a troop and the battle-related data.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriBASE.Game_Troop_clear = Game_Troop.prototype.clear;
_TDS_.OmoriBASE.Game_Troop_setup = Game_Troop.prototype.setup;
_TDS_.OmoriBASE.Game_Troop_meetsConditions = Game_Troop.prototype.meetsConditions;
_TDS_.OmoriBASE.Game_Troop_isAllDead = Game_Troop.prototype.isAllDead;
//=============================================================================
// * Setup
//=============================================================================
// Game_Troop.prototype.setup = function(troopId) {
//   // Run Original Function
//   _TDS_.OmoriBASE.Game_Troop_setup.call(this, troopId);
//   // Apply Battle Position Offsets
//   this._enemies.forEach(function(e) { e.applyBattlePositionOffsets(); }, this);
// };
//=============================================================================
// * Ignore page conditions
//=============================================================================
Game_Troop.prototype.ignorePage = function(page) {
  // If Ignore Pages does not Contains Page
  if (!this._ingorePages.contains(page)) {
    // Add to ignore pages array
    this._ingorePages.push(page);
  };
};
//=============================================================================
// * Stop Ignore page conditions
//=============================================================================
Game_Troop.prototype.stopIgnorePage = function(page) {
  // Get Index
  var index = this._ingorePages.indexOf(page);
  // If Index exists delete it
  if (index >= 0) { this._ingorePages.splice(index, 1); }
};
//=============================================================================
// * Clear
//=============================================================================
Game_Troop.prototype.clear = function() {
  // Run Original Function
  _TDS_.OmoriBASE.Game_Troop_clear.call(this);
  // Clear Ignore Pages Array
  this._ingorePages = [];
};
//=============================================================================
// * Determine if conditions are met
//=============================================================================
Game_Troop.prototype.meetsConditions = function(page) {
  // Get Page Index
  var pageIndex = this.troop().pages.indexOf(page);
  // If Ignore Pages does Contains Page
  if (this._ingorePages.contains(pageIndex)) { return false; };
  // Return Original Function
  return _TDS_.OmoriBASE.Game_Troop_meetsConditions.call(this, page);
};
//=============================================================================
// * Determine if all dead
//=============================================================================
Game_Troop.prototype.isAllDead = function() {
  // If Battle Intro is active return false
  if (BattleManager.isBattleIntroActive()) { return false; };
  // Return Original Function
  return _TDS_.OmoriBASE.Game_Troop_isAllDead.call(this);
};

//=============================================================================
// ** Game_Actor
//-----------------------------------------------------------------------------
// The game object class for an actor.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriBASE.Game_Actor_setup          = Game_Actor.prototype.setup;
_TDS_.OmoriBASE.Game_Actor_initMembers    = Game_Actor.prototype.initMembers;
_TDS_.OmoriBASE.Game_Actor_initSkills     = Game_Actor.prototype.initSkills;
_TDS_.OmoriBASE.Game_Actor_canPaySkillCost = Game_Actor.prototype.canPaySkillCost;
_TDS_.OmoriBASE.Game_Actor_paySkillCost   = Game_Actor.prototype.paySkillCost;
_TDS_.OmoriBASE.Game_Actor_displayLevelUp = Game_Actor.prototype.displayLevelUp;
_TDS_.OmoriBASE.Game_Actor_onBattleStart  = Game_Actor.prototype.onBattleStart;
_TDS_.OmoriBASE.Game_Actor_performVictory = Game_Actor.prototype.performVictory
_TDS_.OmoriBASE.Game_Actor_addState       = Game_Actor.prototype.addState
//=============================================================================
// * Get Actor Battle Status Face Name
//=============================================================================
Game_Actor.prototype.battleStatusFaceName = function() {
  // If Battle Face Name Exists return it
  if (this._battleFaceName) { return this._battleFaceName; };
  // Get Name
  var name = this.actor().meta.BattleStatusFaceName;
  // Return Trimmed Name
  if (name) { return name.trim(); }
  return;
};
//=============================================================================
// * Get Actor Menu Status Face Name
//=============================================================================
Game_Actor.prototype.menuStatusFaceName = function() {
  // Get Name
  let name = this.actor().meta.MenuStatusFaceName;
  // Return Trimmed Name
  if (name) { return name.trim(); }
  return;
};
//=============================================================================
// * Initialize Members
//=============================================================================
Game_Actor.prototype.initMembers = function () {
  // Run Original Function
  _TDS_.OmoriBASE.Game_Actor_initMembers.call(this);
  // Initialize Equipped Skills
  this._equippedSkills = [];
  // Initialize Locked Equipment Slots
  this._lockedEquipmentSlots = [];
  // Disabled Battle Commands
  this._disabledBattleCommands = [];
  // Set Faraway ActorID to null
  this._farawayActorId = null;
  // Use Victory Face Flag
  this._useVictoryFace = false;
  // Battle Face Name
  this._battleFaceName = null;
};
//=============================================================================
// * Setup
//=============================================================================
Game_Actor.prototype.setup = function(actorId) {
  // Run Original Function
  _TDS_.OmoriBASE.Game_Actor_setup.call(this, actorId);
  // Get Actor
  var actor = $dataActors[actorId];
  // Get Faraway Actor ID
  var farawayActorId = actor.meta.FarawayActorId;
  if (farawayActorId) {
    this._farawayActorId = Number(farawayActorId);
  };
};
//=============================================================================
// * On Battle Start
//=============================================================================
Game_Actor.prototype.onBattleStart = function() {
  // Run Original Function
  _TDS_.OmoriBASE.Game_Actor_onBattleStart.call(this);
  // Set Victory Face to False
  this._useVictoryFace = false;
};
//=============================================================================
// * Perform Victory
//=============================================================================
Game_Actor.prototype.performVictory = function() {
  // Run Original Function
  _TDS_.OmoriBASE.Game_Actor_performVictory.call(this);
  // Set Use Victory face flag to true
  this._useVictoryFace = true;
};
//=============================================================================
// * Determine if can pay skill cost
//=============================================================================
Game_Actor.prototype.canPaySkillCost = function(skill) {
  // If in Battle
  if ($gameParty.inBattle()) {
    // If Skill has Energy Cost
    if (skill.meta.EnergyCost) {
      // If skill does not have energy cost
      if (Number(skill.meta.EnergyCost) > $gameParty.stressEnergyCount) { return false; }
    };
  };
  // Return Original Function
  return _TDS_.OmoriBASE.Game_Actor_canPaySkillCost.call(this, skill);
};
//=============================================================================
// * Pay Skill Cost
//=============================================================================
Game_Actor.prototype.paySkillCost = function(skill) {
  // Run Original function
  _TDS_.OmoriBASE.Game_Actor_paySkillCost.call(this, skill);
  // If in Battle
  if ($gameParty.inBattle()) {
    // If Skill has Energy Cost
    if (skill.meta.EnergyCost) {
      // Reduce Stress Energy Count
      $gameParty.stressEnergyCount -= Number(skill.meta.EnergyCost);
    };
  };
};
//=============================================================================
// * Determine if Equipment Slot is locked
//=============================================================================
Game_Actor.prototype.isEquipmentSlotLocked = function (slot) {
  return this._lockedEquipmentSlots.contains(slot);
};

//=============================================================================
// * Determine if Equipment Slot is locked
//=============================================================================
Game_Actor.prototype.isSkillLocked = function () {
  return this._lockedEquipmentSlots.contains(slot);
};
//=============================================================================
// * Lock Equipment Slots
//=============================================================================
Game_Actor.prototype.lockEquipmentSlots = function () {
  for (var i = 0; i < arguments.length; i++) {
    var slot = arguments[i];
    if (!this._lockedEquipmentSlots.contains(slot)) { this._lockedEquipmentSlots.push(slot); };
  };
};
//=============================================================================
// * Unlock Equipment Slots
//=============================================================================
Game_Actor.prototype.unlockEquipmentSlots = function () {
  // Get Slots
  var slots = Array.from(arguments);
  this._lockedEquipmentSlots = this._lockedEquipmentSlots.filter(function(slotId) {
    return !slots.contains(slotId);
  }, this)
};
//=============================================================================
// * Determine if Battle Command is disabled
//=============================================================================
Game_Actor.prototype.isBattleCommandDisabled = function(index) { return this._disabledBattleCommands.contains(index); };
//=============================================================================
// * Disable Battle Command
//=============================================================================
Game_Actor.prototype.disableBattleCommands = function() {
  for (var i = 0; i < arguments.length; i++) {
    var command = arguments[i];
    if (!this._disabledBattleCommands.contains(command)) { this._disabledBattleCommands.push(command); };
  };
};
//=============================================================================
// * Enable Battle Command
//=============================================================================
Game_Actor.prototype.enableBattleCommands = function() {
  // Get Commands
  var commands = Array.from(arguments);
  this._disabledBattleCommands = this._disabledBattleCommands.filter(function(id) {
    return !commands.contains(id);
  }, this);
};
//=============================================================================
// * Get Status State Particles Data
//=============================================================================
Game_Actor.prototype.statusStateParticlesData = function () {
  // Get Main State
  var state = this.states()[0];
  // If State Exists
  if (state) {
    // If State Particle Data is not undefined
    if (state.meta.particlesData === undefined) {
      // Initialize State Particle Data
      state.meta.particlesData = {}
      // Get Layers
      var layers = ['Behind', 'Front', 'Top'];
      // Go through Layers
      for (var i = 0; i < layers.length; i++) {
        // Get Layer Name
        var layer = layers[i]
        // Get Particle Name
        var particleName = state.meta["Particle" + layer];
        // If Particle Name Exists
        if (particleName) {
          // Set Particle Data for Particle Name
          state.meta.particlesData[layer.toLowerCase()] = particleName.trim().toLowerCase();
        };
      };
    };
    // Return State particle Data
    return state.meta.particlesData;
  };
  // Return default
  return null;
};
//=============================================================================
// * Get Status Face Index
//=============================================================================
Game_Actor.prototype.statusFaceIndex = function () {
  if(!!$gameTemp._secondChance && this.actorId() === 1) {return 3;}
  if(!!$gameTemp._damagedPlayer) {return 2;}
  // If Use victory face and is alive
  if (this._useVictoryFace && this.isAlive()) {
    // Return victory face
    return 10;
  };
  // Check for second Chance;
  // Get Main State
  var state = this.states()[0];
  // If State
  if (state) {
    // If Alt switch index exist
    if (state.meta.AltIndexSwitch) {
      // If alt switch is on
      if ($gameSwitches.value(Number(state.meta.AltIndexSwitch))) {
        // Return alternate face index
        return Number(state.meta.AltStateFaceIndex)
      };
    }
    // If face index exists return it
    //if(state.id === this.deathStateId() && this.actorId() === 1) {return 9;}
    if (state.meta.StateFaceIndex) { return Number(state.meta.StateFaceIndex); };
  };
  // Get Fear Index
  const fearIndex = this.actor().meta.FearBattleFaceIndex;
  // If Fear index is valid and switch 92 is on
  if (fearIndex && $gameSwitches.value(92)) {
    return Number(fearIndex)
  }
  // Return default
  return 0;
};
//=============================================================================
// * Get Status Back Index
//=============================================================================
Game_Actor.prototype.statusBackIndex = function () {
  // Omori
  if($gameTemp._secondChance && this.actorId() === 1) {return 11;}
  // Get Main State
  var state = this.states()[0];
  // If State
  if (state && state.meta.StateBackIndex) {
    return Number(state.meta.StateBackIndex);
  };
  // Return default
  return 0;
};
//=============================================================================
// * Get Status List Index
//=============================================================================
Game_Actor.prototype.statusListIndex = function () {
  // Get Main State
  var state = this.states()[0];
  // If State
  if (state) {
    // Get World Index
    let worldIndex = SceneManager.currentWorldIndex();
    // Get Tag Name
    let tagName = 'World_' + worldIndex + '_StateListIndex'
    // If State has world state list index
    if (state.meta[tagName]) {
      return Number(state.meta[tagName]);
    } else if (state.meta.StateListIndex) {
      return Number(state.meta.StateListIndex);
    };
  };
  // Return default
  return 0;
};
//=============================================================================
// * Get Party Member Status Order
//=============================================================================
Game_Actor.prototype.battleStatusIndex = function () {
  return Number(this.actor().meta.BattleStatusIndex);
};
//=============================================================================
// * Initialize Skills
//=============================================================================
Game_Actor.prototype.initSkills = function () {
  // Run Original Function
  _TDS_.OmoriBASE.Game_Actor_initSkills.call(this);
  // Set Initial Equipped Skills
  this._equippedSkills = [0, 0, 0, 0];
  // Locked Equipped Skills
  this._lockedEquippedSkills = [false, false, false, false];
  // Set Locked Skills
  this._lockedSkills = [];
};
//=============================================================================
// * Get Skills
//=============================================================================
Game_Actor.prototype.skills = function () {
  // Get List
  var list = [];
  this._equippedSkills.concat(this.addedSkills()).forEach(function (id) {
    if (!$dataSkills[id]) {
      list.push(null);
    } else {
      if (!list.contains($dataSkills[id])) {
        list.push($dataSkills[id]);
      };
    };
  });
  return list;
};
//=============================================================================
// * Get List of Skills
//=============================================================================
Game_Actor.prototype.skillsList = function () {
  var list = [];
  this._skills.concat(this.addedSkills()).forEach(function(id) {
    if (!list.contains($dataSkills[id])) {
      list.push($dataSkills[id]);
    }
  });
  return list;
};
//=============================================================================
// * Determine if Skill Equip Slot is locked
//=============================================================================
Game_Actor.prototype.isEquipSkillSlotLocked = function (slot) {
  // Get Skill Id
  const skillId = this._equippedSkills[slot];
  if (this._lockedSkills.contains(skillId)) { return true; }
  return this._lockedEquippedSkills[slot];
};
//=============================================================================
// * Determine if Skill is equippable
//=============================================================================
Game_Actor.prototype.canEquipSkill = function (skill) {
  // If skill does not exist
  if (!skill) { return false;}
  // If Equipped Skill contains skill id
  if (this._equippedSkills.contains(skill.id)) { return false; };
  // If Hide in menu tag exists
  if (skill.meta.HideInMenu) { return false; }
  // Return true;
  return true;
};
//=============================================================================
// * Get Equippable Skills
//=============================================================================
Game_Actor.prototype.equipableSkills = function () {
  // Initialize List
  var list = [];
  // Go through Skills
  for (var i = 0; i < this._skills.length; i++) {
    // Get Skill ID
    var id = this._skills[i];
    // Get Skill
    var skill = $dataSkills[id];
    // If Skill can be equipped add it to list
    if (this.canEquipSkill(skill)) {  list.push($dataSkills[id]); };
  };
  // Return List
  return list
};
//=============================================================================
// * Lock Equip Skill
//=============================================================================
Game_Actor.prototype.lockEquipSkill = function () {
  // Go Through arguments skill ids
  for (var i = 0; i < arguments.length; i++) {
    // Get ID
    const id = arguments[i];
    // If Locked Skills array does not contain skill id
    if (!this._lockedSkills.contains(id)) {
      // Add skill to locked skills
      this._lockedSkills.push(id);
    };
  };
};
//=============================================================================
// * Unlock Equip Skill
//=============================================================================
Game_Actor.prototype.unlockEquipSkill = function () {
  // Get List of Arrays
  const list = Array.from(arguments);
  // Remove locked skill
  this._lockedSkills = this._lockedSkills.filter(id => !list.contains(id));
};
//=============================================================================
// * Equip Skill
//=============================================================================
Game_Actor.prototype.equipSkill = function (equipIndex, skillId) {
  this._equippedSkills[equipIndex] = skillId;
};
//=============================================================================
// * Unequip Skill
//=============================================================================
Game_Actor.prototype.unequipSkill = function (equipIndex, learn) {
  // Set learn flag to true
  if (learn === undefined) { learn = true; }
  // Get Skill Id
  var skillId = this._equippedSkills[equipIndex];
  // If Learn and Skill Id is more than 0
  if (learn && skillId > 0) { this.learnSkill(skillId); }
  // Set Skill Id at equip index to 0
  this._equippedSkills[equipIndex] = 0;
};
//=============================================================================
// * Display Level Up
//=============================================================================
Game_Actor.prototype.displayLevelUp = function(newSkills) {
  // If In Battle
  if (SceneManager._scene.constructor === Scene_Battle) {
    // Create Level Up Data Object
    this._levelUpData = {level: this._level, skills: newSkills};
  };
  // Run Original Function
  _TDS_.OmoriBASE.Game_Actor_displayLevelUp.call(this, newSkills);
};
//=============================================================================
// * Change Experience
//=============================================================================
Game_Actor.prototype.changeExp = function(exp, show) {
  this._exp[this._classId] = Math.max(exp, 0);
  var lastLevel = this._level;
  // Use skillsList instead of skills to track total number skills
  var lastSkills = this.skillsList();
  while (!this.isMaxLevel() && this.currentExp() >= this.nextLevelExp()) {
      this.levelUp();
  }
  while (this.currentExp() < this.currentLevelExp()) {
      this.levelDown();
  }
  if (show && this._level > lastLevel) {
      this.displayLevelUp(this.findNewSkills(lastSkills));
  }
  this.refresh();
};
//=============================================================================
// * Find new Skills
//=============================================================================
Game_Actor.prototype.findNewSkills = function(lastSkills) {
  // Use skillsList instead of skills to track total number skills
  var newSkills = this.skillsList();
  for (var i = 0; i < lastSkills.length; i++) {
    var index = newSkills.indexOf(lastSkills[i]);
    if (index >= 0) {
      newSkills.splice(index, 1);
    }
  };
  return newSkills;
};
// //=============================================================================
// // * Add State
// //=============================================================================
// Game_Actor.prototype.addState = function(stateId) {
//   // If state id is 20 and actor ID is 1 or 8
//   if (stateId === 20 && [1, 8].contains(this.actorId())) {
//     // If State can be added
//     if (this.isStateAddable(stateId)) {
//       // If not affected by state
//       if (!this.isStateAffected(stateId)) {
//         // Set Energy to max
//         $gameParty.energy = 10;
//       };
//     };
//   };
//   // Run Original Function
//   _TDS_.OmoriBASE.Game_Actor_addState.call(this, stateId);
// };




//=============================================================================
// ** Game_Enemy
//-----------------------------------------------------------------------------
// The game object class for an enemy.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriBASE.Game_Enemy_setup = Game_Enemy.prototype.setup;
_TDS_.OmoriBASE.Game_Enemy_screenX = Game_Enemy.prototype.screenX;
_TDS_.OmoriBASE.Game_Enemy_screenY = Game_Enemy.prototype.screenY;
//=============================================================================
// * Setup
//=============================================================================
Game_Enemy.prototype.setup = function(enemyId, x, y) {
  // Run Original Function
  _TDS_.OmoriBASE.Game_Enemy_setup.call(this, enemyId, x, y);
  // State Transforming flag
  this._isStateTransforming = false;
  // Apply Battle Position Offsets
  this.applyBattlePositionOffsets();
};
//=============================================================================
// * Add State
//=============================================================================
Game_Enemy.prototype.addState = function(stateId) {
  // Run Original Function
  Game_Battler.prototype.addState.call(this, stateId);
  // Refresh Emotion State transform
  this.refreshEmotionStateTransform();
};
//=============================================================================
// * Remove State
//=============================================================================
Game_Enemy.prototype.removeState = function(stateId) {
  // Run Original Function
  Game_Battler.prototype.removeState.call(this, stateId);
  // Refresh Emotion State transform
  this.refreshEmotionStateTransform();
};
//=============================================================================
// * Get State Emotion
//=============================================================================
Game_Battler.prototype.getStateEmotion = function() {
  // Get States
  var states = this.states();
  // Go Through States
  for (var i = 0; i < states.length; i++) {
    // Get STate
    var state = states[i];
    // If State has transform emotion
    if (state.meta.TransformEmotion) {
      // Return Transform Emotion
      return state.meta.TransformEmotion.trim().toLowerCase();
    }
  };
  // Return normal by default
  return "normal";
};
//=============================================================================
// * Refresh Emotion State Transform
//=============================================================================
Game_Enemy.prototype.refreshEmotionStateTransform = function() {
  // If Not Dead
  if (!this.isDead() && !this._isStateTransforming) {
    // Get Emotion
    var emotion = this.getStateEmotion();
    // Get base Id
    var baseId = this.enemy().meta.TransformBaseID;
    // Set Base ID
    baseId = baseId ? Number(baseId) : this._enemyId;
    // Set Transform ID
    var transformId = this._enemyId;
    // Switch Case Emotion
    switch (emotion) {
      case 'normal': transformId = baseId ;break;
      case 'happy': transformId = baseId + 1 ;break;
      case 'sad': transformId = baseId + 2 ;break;
      case 'angry': transformId = baseId + 3 ;break;
      break;
    };
    // If Transform Id
    if (transformId !== this._enemyId) {
      this._isStateTransforming = true;
      if(this.name() === "SPACE EX-HUSBAND") {
        $gameScreen.setFlashWait(60)
        $gameScreen.startFlash([255,255,255,255], 130)
      }
      this.transform(transformId)
      this._isStateTransforming = false;
    };
  };

};
//=============================================================================
// * Get Base ID
//=============================================================================
Game_Enemy.prototype.baseId = function() {
  // Get Base ID
  var baseId = this.enemy().meta.TransformBaseID;
  let foeId = this.enemy().meta.FoeEntry;
  // Return base ID
  if(!!foeId) {return parseInt(foeId.trim())}
  return baseId ? Number(baseId) : this._enemyId;
};
//=============================================================================
// * Determine if Enemy has been scanned
//=============================================================================
Game_Enemy.prototype.isScanned = function() { return $gameParty._scannedEnemyList.contains(this.enemyId()); };
//=============================================================================
// * Get Battle Status Position
//=============================================================================
Game_Enemy.prototype.battleStatusPosition = function() {
  var meta = this.enemy().meta;
  if (meta.StatusPosition) { return Number(meta.StatusPosition); };
  return 4
};
//=============================================================================
// * Get Battle Status Cursor Position
//=============================================================================
Game_Enemy.prototype.battleStatusCursorPosition = function() {
  var meta = this.enemy().meta;
  if (meta.StatusCursorPosition) { return Number(meta.StatusCursorPosition); };
  return 3;
};
//=============================================================================
// * Get Battle Status X Offset
//=============================================================================
Game_Enemy.prototype.battleStatusXOffset = function() {
  var meta = this.enemy().meta;
  if (meta.StatusXOffset) { return Number(meta.StatusXOffset); };
  return 0;
};
//=============================================================================
// * Get Battle Status Y Offset
//=============================================================================
Game_Enemy.prototype.battleStatusYOffset = function() {
  var meta = this.enemy().meta;
  if (meta.StatusYOffset) { return Number(meta.StatusYOffset); };
  return 0;
};
//=============================================================================
// * Apply Battle Positions Offsets
//=============================================================================
Game_Enemy.prototype.applyBattlePositionOffsets = function() {
  // Get Data
  var data = $dataEnemies[this.baseId()];
  // Set Offset if it does exist
  if (data.meta.PositionOffsetX === undefined) {
    var match = data.note.match(/<(?:Position Offset X):[ ]*([-]?\d+)>/i);
    data.meta.PositionOffsetX = match ? Number(match[1]) : 0
  };
  // Set Offset if it does exist
  if (data.meta.PositionOffsetY === undefined) {
    var match = data.note.match(/<(?:Position Offset Y):[ ]*([-]?\d+)>/i);
    data.meta.PositionOffsetY = match ? Number(match[1]) : 0
  };
  // Increase Position by X & YOffsets
  this._screenX += data.meta.PositionOffsetX;
  this._screenY += data.meta.PositionOffsetY;
};
//=============================================================================
// * Get Battle Damage X Offset
//=============================================================================
Game_Enemy.prototype.battleDamageXOffset = function() {
  var meta = this.enemy().meta;
  if (meta.DamageOffsetX) { return Number(meta.DamageOffsetX); };
  return 0;
};
//=============================================================================
// * Get Battle Damage Y Offset
//=============================================================================
Game_Enemy.prototype.battleDamageYOffset = function() {
  var meta = this.enemy().meta;
  if (meta.DamageOffsetY) { return Number(meta.DamageOffsetY); };
  return 0;
};


//=============================================================================
// ** Game_CharacterBase
//-----------------------------------------------------------------------------
// The superclass of Game_Character. It handles basic information, such as
// coordinates and images, shared by all characters.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriBASE.Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
_TDS_.OmoriBASE.Game_CharacterBase_update = Game_CharacterBase.prototype.update;
_TDS_.OmoriBASE.Game_CharacterBase_setImage = Game_CharacterBase.prototype.setImage;
//=============================================================================
// * Initialize Members
//=============================================================================
Game_CharacterBase.prototype.initMembers = function() {
  // Set Single Frame Flag to false
  this._singleFrame = false;
  // Run Original Function
  _TDS_.OmoriBASE.Game_CharacterBase_initMembers.call(this);
  // Clear Bobble
  this.clearBobble();
  // Clear Input Icon
  this.clearInputIcon();
  // Clear Spin
  this.clearSpin();
  // Clear Shadow
  this.clearShadow();
  // Clear custom Frame Animations
  this.clearCustomFrameAnimation();

  // this._customFrameAnimationList.push({duration: 20, name: 'DW_OMORI', index: 4, direction: 2, frame: 0})
  // this._customFrameAnimationList.push({duration: 20, name: 'DW_OMORI', index: 4, direction: 2, frame: 1})
  // this._customFrameAnimationList.push({duration: 20, name: 'DW_OMORI', index: 4, direction: 2, frame: 2})
};
//=============================================================================
// * Frame Update
//=============================================================================
Game_CharacterBase.prototype.update = function() {
  // Run Original Function
  _TDS_.OmoriBASE.Game_CharacterBase_update.call(this);
  // Update Spinning
  this.updateSpinning();
  // Update Custom Frame Animation
  this.updateCustomFrameAnimation();
};
//=============================================================================
// * Determine if Single Frame
//=============================================================================
Game_CharacterBase.prototype.isSingleFrame = function() { return this._singleFrame; };
//=============================================================================
// * Get Position Auto Move Direction
//=============================================================================
Game_CharacterBase.prototype.positionAutoMoveDirection = function() {
  return $gameMap.positionAutoMoveDirection(this._x, this._y);
};
//=============================================================================
// * Set Image
//=============================================================================
Game_CharacterBase.prototype.setImage = function(characterName, characterIndex) {
  // Run Original Function
  _TDS_.OmoriBASE.Game_CharacterBase_setImage.call(this, characterName, characterIndex);
  // Set Single Frame Flag
  this._singleFrame = characterName.match(/\[SF\]/g) !== null;
};
//=============================================================================
// * Clear Shadow
//=============================================================================
Game_CharacterBase.prototype.clearShadow = function() { this._shadow = null; };
//=============================================================================
// * Setup Shadow
//=============================================================================
Game_CharacterBase.prototype.setupShadow = function() {
  // Setup Shadow
  this._shadow = {opacity: 160, angle: 180, x: 0, y: 0, scaleY: 1};
  // Return Shadow
  return this._shadow;
};
//=============================================================================
// * Clear Bobble
//=============================================================================
Game_CharacterBase.prototype.clearBobble = function() {
  // Set Bobble to null
  this._bobble = null;
};
//=============================================================================
// * Set Bobble
//=============================================================================
Game_CharacterBase.prototype.setBobble = function(base, speed, amplitude) {
  // Set Bobble Object
  this._bobble = {base: 0.5, speed: 0.05, amplitude: 1.25};
  // Set Values
  if (base !== undefined) { this._bobble.base = base; };
  if (speed !== undefined) { this._bobble.speed = speed; };
  if (amplitude !== undefined) { this._bobble.amplitude = amplitude; };
};
//=============================================================================
// * Clear Input Icon
//=============================================================================
Game_CharacterBase.prototype.clearInputIcon = function() {
  // Set Input Icon to null
  this._inputIcon = null;
};
//=============================================================================
// * Setup Input Icon
//=============================================================================
Game_CharacterBase.prototype.setupInputIcon = function(input, key = false, gamepad = false) {
  // Set Input Icon Data
  this._inputIcon = {input: input, key: key, gamepad: gamepad};
  // Return Input Icon Data
  return this._inputIcon;
}
//=============================================================================
// * Clear Spin
//=============================================================================
Game_CharacterBase.prototype.clearSpin = function() {
  this._spinCount = 0;
  this._spinDelay = 0;
  this._spinDelayCount = 0;
}
//=============================================================================
// * Start Spin
//=============================================================================
Game_CharacterBase.prototype.startSpin = function(times, delay = 10) {
  this._spinCount = times;
  this._spinDelay = delay;
  this._spinDelayCount = delay;
}
//=============================================================================
// * Update Spinning
//=============================================================================
Game_CharacterBase.prototype.updateSpinning = function() {
  // If Spin count is more than 0
  if (this._spinCount > 0) {
    // Decrease Spin delay count
    this._spinDelayCount--;
    // If Spin Delay count is 0 or less
    if (this._spinDelayCount <= 0) {
      // Decrease Spin Count
      this._spinCount--;
      // Change
      switch (this.direction()) {
        case 2: this._direction = 6 ;break;
        case 4: this._direction = 2 ;break;
        case 6: this._direction = 8 ;break;
        case 8: this._direction = 4 ;break;
      };
      // Reset Spin Delay Count
      this._spinDelayCount = this._spinDelay;
    };
  };
};
//=============================================================================
// * Clear Custom Frame Animations
//=============================================================================
Game_CharacterBase.prototype.clearCustomFrameAnimation = function() {
  this._customFrameAnimation = null;
};
//=============================================================================
// * Clear Custom Frame Animations
//=============================================================================
Game_CharacterBase.prototype.startCustomFrameAnimation = function(list, repeats  = 0) {
  // Get First Animation
  var firstAnim = list[0];
  // Set Custom Frame Animation
  this._customFrameAnimation = {index: 0, count: firstAnim.duration, repeat: repeats, animationList: list.clone()}
  // If first frame has SE play it
  if (firstAnim.se) { AudioManager.playSe(firstAnim.se); };
};
//=============================================================================
// * Start Preset Frame Animation
//=============================================================================
Game_CharacterBase.prototype.startPresetFrameAnimation = function(name) {

  // switch (name) {
  //   case 'TEST':
  //     var dur = 10
  //     var name = 'DW_OMORI'
  //     var list = [];

  //     switch (this.direction()) {
  //       case 2: // Down
  //         list.push({duration: dur, name: name, index: 7, direction: 4, frame: 0})
  //         list.push({duration: dur, name: name, index: 7, direction: 4, frame: 1})
  //         list.push({duration: dur, name: name, index: 7, direction: 4, frame: 2})
  //         list.push({duration: dur, name: name, index: 7, direction: 4, frame: 1, se: {name: '', volume: 100, pitch: 100, pan: 100}})
  //       break;
  //       case 4: // Left
  //       break;
  //       case 6: // Right
  //       break;
  //       case 8: // Up
  //       break;
  //     };
  //     this.startCustomFrameAnimation(list, 2)
  //     break;
  //   case 'STAB':


  //   break;
  // }
};
//=============================================================================
// * Update Custom Frame Animation
//=============================================================================
Game_CharacterBase.prototype.updateCustomFrameAnimation = function() {
  // Get Data
  var data = this._customFrameAnimation;
  // If Custom frame Animation has animations
  if (data) {
    // Get Animation
    var anim = data.animationList[data.index];
    // Reduce Duration
    data.count--;
    // Set Animation Data
    this.setImage(anim.name, anim.index);
    this._direction = anim.direction;
    this.setPattern(anim.frame);
    // If Data count is 0 or less
    if (data.count <= 0) {
      // Increase Index
      data.index = (data.index + 1) % data.animationList.length;
      // Get New Animation
      var newAnim = data.animationList[data.index];
      // Reset Count
      data.count = newAnim.duration;
      // If new animation has sound effect, play it
      if (newAnim.se) { AudioManager.playSe(se); };

      if (data.index >= data.animationList.length-1) {
        // Decrease Repeats
        data.repeat--;
        // If repeat is 0 or less
        if (data.repeat <= 0) {
          this.clearCustomFrameAnimation();
          return;
        }
      };
    };
  };
};



//=============================================================================
// ** Game_Player
//-----------------------------------------------------------------------------
// The game object class for the player. It contains event starting
// determinants and map scrolling functions.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriBASE.Game_Player_initMembers = Game_Player.prototype.initMembers;
_TDS_.OmoriBASE.Game_Player_getInputDirection = Game_Player.prototype.getInputDirection;
_TDS_.OmoriBASE.Game_Player_updateNonmoving = Game_Player.prototype.updateNonmoving
//=============================================================================
// * Initialize Members
//=============================================================================
Game_Player.prototype.initMembers = function() {
  // Clear Blocked Inputs
  this.clearBlockedMovementInputs();
  // Clear Ambience Data
  this.clearAmbienceData();
  // Run Original Function
  _TDS_.OmoriBASE.Game_Player_initMembers.call(this);
};
//=============================================================================
// * Clear Blocked Inputs
//=============================================================================
Game_Player.prototype.clearBlockedMovementInputs = function() {
  // Clear Blocked Inputs Array
  this._blockedMovementInputs = [];
};
//=============================================================================
// * Block Movement Inputs
//=============================================================================
Game_Player.prototype.blockMovementInputs = function() {
  // Go through directions
  for (var i = 0; i < arguments.length; i++) {
    // Get Direction
    var dir = arguments[i]
    // Get Index
    var index = this._blockedMovementInputs.indexOf(dir)
    // If blocked movement inputs does not contain direction
    if (index === -1) { this._blockedMovementInputs.push(dir) }
  };
};
//=============================================================================
// * Unblock Movement Inputs
//=============================================================================
Game_Player.prototype.unblockMovementInputs = function() {
  // Go through directions
  for (var i = 0; i < arguments.length; i++) {
    // Get Direction
    var dir = arguments[i]
    // Get Index
    var index = this._blockedMovementInputs.indexOf(dir)
    // If blocked movement inputs contains input
    if (index > -1) { this._blockedMovementInputs.splice(index, 1) }
  };
};
//=============================================================================
// * Get Input Direction
//=============================================================================
Game_Player.prototype.getInputDirection = function() {
  // Get Original Direction
  var direction = _TDS_.OmoriBASE.Game_Player_getInputDirection.call(this);
  // If blocked movement inputs exist
  if (this._blockedMovementInputs) {
    // Get Index
    var index = this._blockedMovementInputs.indexOf(direction)
    // If Index is more than -1
    if (index > -1) { return 0; };
  };
  // Return direction
  return direction;
};
//=============================================================================
// * Update Non Moving
//=============================================================================
Game_Player.prototype.updateNonmoving = function(wasMoving) {
  // Run Original Function
  _TDS_.OmoriBASE.Game_Player_updateNonmoving.call(this, wasMoving);
  // If No map event is running
  if (!$gameMap.isEventRunning()) {
    // If was moving
    if (wasMoving) {
      // Get Position Auto Move Direction
      var dir = this.positionAutoMoveDirection();
      // If it's more than 0 move in that direction
      if (dir > 0) {
        this.moveStraight(dir);
      // this.gatherFollowers();
      };
    };
  };
};
//=============================================================================
// * Clear Ambience Data
//=============================================================================
Game_Player.prototype.clearAmbienceData = function() {
  // Initialize Ambience Data
  this._ambienceData = {name: '', x: 0, y: 0, opacity: 255, useCustomPosition: false};
};
//=============================================================================
// * Get Ambience Screen X
//=============================================================================
Game_Player.prototype.ambienceScreenX = function() {
  // Get Ambience Data
  var data = this._ambienceData;
  if (data.useCustomPosition) { return data.x; };
  return this.screenX();
}
//=============================================================================
// * Get Ambience Screen Y
//=============================================================================
Game_Player.prototype.ambienceScreenY = function() {
  // Get Ambience Data
  var data = this._ambienceData;
  if (data.useCustomPosition) { return data.y; };
  return this.screenY() - 10;
}



//=============================================================================
// ** Game_Follower
//-----------------------------------------------------------------------------
// The game object class for a follower. A follower is an allied character,
// other than the front character, displayed in the party.
//=============================================================================
// * Update Position Audio Move
//=============================================================================
Game_Follower.prototype.updatePositionAutoMove = function() {
  // Get Position Auto Move Direction
  var dir = this.positionAutoMoveDirection();
  // If it's more than 0 move in that direction
  if (dir > 0 && !this.isMoving()) {
    this.moveStraight(dir);
    return true;
  }
  return false;
};



//=============================================================================
// ** Game_Followers
//-----------------------------------------------------------------------------
// The wrapper class for a follower array.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriBASE.Game_Followers_update  = Game_Followers.prototype.update
//=============================================================================
// * Frame Update
//=============================================================================
Game_Followers.prototype.update = function() {
  if (!this.areGathering()) {
    var lastIndex = 0;
    for (var i = 0; i < this._data.length; i++) {
      var follower = this._data[i];
      if (!follower.isMoving()) {
        var moved = follower.updatePositionAutoMove();
        if (moved) {
          this.updateMove()
          lastIndex = i + 1;
        };
      };
      // If last index is more than 0
      if (lastIndex > 0) {

        // for (var i = this._data.length - 1; i >= 0; i--) {
        //     var precedingCharacter = (i > 0 ? this._data[i - 1] : $gamePlayer);
        //     this._data[i].chaseCharacter(precedingCharacter);
        // }
        // for (var i = lastIndex; i >= 0; i--) {

        //   if (i <= 0) { break; }
        for (var i = lastIndex; i < this._data.length; i++) {
          var prevFollower = this._data[i-1];
          var follower = this._data[i];
          follower.chaseCharacter(prevFollower);
        };
      };
    };
  };
  // Run Original Function
  _TDS_.OmoriBASE.Game_Followers_update.call(this);
};


//=============================================================================
// ** Window_Base
//-----------------------------------------------------------------------------
// The superclass of all windows within the game.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriBASE.Window_Base_initialize  = Window_Base.prototype.initialize;
_TDS_.OmoriBASE.Window_Base_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
_TDS_.OmoriBASE.Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters
_TDS_.OmoriBASE.Window_Base_convertExtraEscapeCharacters = Window_Base.prototype.convertExtraEscapeCharacters
//=============================================================================
// * Class Variables
//=============================================================================
Window_Base._faceWidth  = 106;
Window_Base._faceHeight = 106;
//=============================================================================
// * Object Initialization
//=============================================================================
Window_Base.prototype.initialize = function(x, y, width, height) {
  // Set Openness Type to default
  this._opennessType = this.standardOpennessType();
  // Run Original Function
  _TDS_.OmoriBASE.Window_Base_initialize.call(this, x, y, width, height);
};
//=============================================================================
// * Settings
//=============================================================================
Window_Base.prototype.standardBackOpacity = function() { return 255;};
//=============================================================================
// * Openness Type (0: Vertical, 1: Horizontal, 2: All)
//=============================================================================
Window_Base.prototype.standardOpennessType = function() { return 0;};
//=============================================================================
// * Open & Close Speeds
//=============================================================================
Window_Base.prototype.openSpeed  = function() { return 32; };
Window_Base.prototype.closeSpeed = function() { return 32; };
//=============================================================================
// * Convert Escape Character
//=============================================================================
Window_Base.prototype.convertEscapeCharacters = function(text) {
  // Get Text
  var text = _TDS_.OmoriBASE.Window_Base_convertEscapeCharacters.call(this, text);
  // Get Last Gained Item
  var item = $gameParty.lastGainedItem();
  // If Item Exists
  if (item) {
    // Get Amount
    var amount = $gameParty._lastItemData.amount;
    // If Amount is more than 0
    if (amount > 0) {

      if (amount === 1) {
        // Replace Code with Item Name
        text = text.replace(/\x1bitemget/ig, item.name);
      } else {
        // Replace Code with Item Name
        text = text.replace(/\x1bitemget/ig, item.name + ' x' + $gameParty._lastItemData.amount);
      };
    } else {
      if (amount < -1) {
        // Replace Code with Item Name
        text = text.replace(/\x1bitemget/ig, item.name + ' x' + Math.abs($gameParty._lastItemData.amount));
      } else {
        // Replace Code with Item Name
        text = text.replace(/\x1bitemget/ig, item.name);
      };
    };
  } else {
    text = text.replace(/\x1bitemget/ig, 'NULL ID #');
  };
  // Return Text
  return text;
};
//=============================================================================
// * Convert Extra Escape Character
//=============================================================================
Window_Base.prototype.convertExtraEscapeCharacters = function(text) {
  // \NI[n]
  text = text.replace(/\x1bNI\[(\d+)\]/gi, function() {
      // Get Item
      var item = $dataItems[parseInt(arguments[1])];
      // Get Color Text
      var colorText = '\x1bC[%1]'.format(this.itemColorIndex(item));
      return colorText + item.name + '\x1bc[0]';
  }.bind(this));

  // \NW[n]
  text = text.replace(/\x1bNW\[(\d+)\]/gi, function() {
    // Get Weapon
    var item = $dataWeapons[parseInt(arguments[1])];
    // Get Color Text
    var colorText = '\x1bC[%1]'.format(this.itemColorIndex(item));
    return colorText + item.name + '\x1bc[0]';
  }.bind(this));

  // \NA[n]
  text = text.replace(/\x1bNA\[(\d+)\]/gi, function() {
    // Get Armor
    var item = $dataArmors[parseInt(arguments[1])];
    // Get Color Text
    var colorText = '\x1bC[%1]'.format(this.itemColorIndex(item));
    return colorText + item.name + '\x1bc[0]';
  }.bind(this));
  // Return Original Function
  return _TDS_.OmoriBASE.Window_Base_convertExtraEscapeCharacters.call(this, text);
};
//=============================================================================
// * Process Escape Character
//=============================================================================
Window_Base.prototype.processEscapeCharacter = function(code, textState) {
  // Run Original Function
  _TDS_.OmoriBASE.Window_Base_processEscapeCharacter.call(this, code, textState);
  // Code Switch Case
  switch (code) {
    case 'ITEMGET':
      break
    case 'DII': // Draw Input Icon
    // Get Match
    var match = /^\[(.+)\]/.exec(textState.text.slice(textState.index));
    // Increase Text State Index
    textState.index += match[0].length;
    // Process Draw Input Icon
    this.processDrawInputIcon(match[1], textState)
    // console.log(code)
    break;
  };
};
//=============================================================================
// * Process Draw Input Icon
//=============================================================================
Window_Base.prototype.processDrawInputIcon = function(input, textState) {
  // Get Key
  const offset_data = LanguageManager.getMessageData("XX_BLUE.Window_Base").processDrawInputIconOffset
  var key = Input.inputKeyCode(input);
  // Get Rect
  var rect = this.contents.keyIconRects(key).up;
  // Add Padding Space
  textState.x += 4;
  // Draw Key Icon
  this.contents.drawAlginedKeyIcon(key, textState.x + offset_data[0], textState.y + offset_data[1], rect.width, textState.height);
  // Increase Texstate X position
  textState.x += rect.width + 4;
};
//=============================================================================
// * Draw Black Letter Text
//=============================================================================
Window_Base.prototype.drawBlackLetterText = function(text, x, y, space = 32, offset = 0) {
  // Split Letters
  var letters = text.split('');
  // Initialize Indexes
  var indexes = [];
  // Go Through Letters
  for (var i = 0; i < letters.length; i++) {
    // Get Code
    var code = letters[i].toUpperCase().charCodeAt(0);
    // If Code is valid for alphabet
    if (code > 64 && code < 91) {
      // Add Letter Index
      indexes.push((code - 64) - 1 );
    } else {
      // Add Empty Index
      indexes.push(-1);
    };
  };
  // Get bitmap
  var bitmap = ImageManager.loadSystem('Blackletters_menu');
  // Set Starting X
  var sx = x;
  // Go Through Indexes
  for (var i = 0; i < indexes.length; i++) {
    // Get Alphabet Index
    var index = indexes[i];
    if (index > -1) {
      var bx = (index % 5) * 32
      var by = Math.floor(index / 5) * 32
      this.contents.blt(bitmap, bx, by, 32, 32, sx, y);
      // Increase SX
      // sx += 32;
      sx += (space + offset);
    } else {
      // Increase SX by space
      sx += space;
    };
  };
};
//=============================================================================
// * Get Item Color Index
//=============================================================================
Window_Base.prototype.itemColorIndex = function(item) {
  // If Item is consumable
  if (DataManager.isConsumableItem(item)) { return 3};

  if (DataManager.isWeapon(item)) { return 2;}

  // Return 0 by default
  return 0;
};
//=============================================================================
// * Draw MP Icon
//=============================================================================
Window_Base.prototype.drawHPIcon = function(x, y) {
  // Get Icon
  var icon = ImageManager.loadSystem('hp_icon');
  this.contents.blt(icon, 0, 0, icon.width, icon.height, x, y)
};
//=============================================================================
// * Draw MP Icon
//=============================================================================
Window_Base.prototype.drawMPIcon = function(x, y) {
  // Get Icon
  var icon = ImageManager.loadSystem('mp_icon');
  this.contents.blt(icon, 0, 0, icon.width, icon.height, x, y)
};
//=============================================================================
// * Draw Short Actor HP
//=============================================================================
Window_Base.prototype.drawShortActorHP = function(actor, x, y) {
  // Get Icon
  var icon = ImageManager.loadSystem('hp_icon');
  this.contents.blt(icon, 0, 0, icon.width, icon.height, x, y)
  this.contents.fontSize = LanguageManager.getMessageData("XX_BLUE.Window_Base").drawShortActorHP_contents_fontsize;
  this.changeTextColor(this.hpColor(actor));
  this.drawText(actor.hp, x + icon.width + 4, y - 12, 100);
  this.resetFontSettings();
};
//=============================================================================
// * Draw Item Icon
//=============================================================================
Window_Base.prototype.drawItemIcon = function(item, x, y, rate = 1.0) {
  // Init Variables
  var name, rows, columns;
  // Get Item Graphics Data
  var data = DataManager.getItemIconGraphicsData(item);
  // Apply Icon Data
  var bitmap = ImageManager.loadSystem(data.name);
  // Transfer Icon Bitmap
  bitmap.addLoadListener(() => {
    var width = bitmap.width / data.columns;
    var height = bitmap.height / data.rows;
    var sX = (data.index % data.columns) * width;
    var sY = Math.floor(data.index / data.columns) * height;
    this.contents.blt(bitmap, sX, sY, width, height, x, y, width * rate, height * rate)
  });
  // this.contents.fillRect(x, y, width * rate, height * rate, 'rgba(255, 0, 0, 0.5)');
};
//=============================================================================
// * Draw Short Actor MP
//=============================================================================
Window_Base.prototype.drawShortActorMP = function(actor, x, y) {
  // Get Icon
  var icon = ImageManager.loadSystem('mp_icon');
  this.contents.blt(icon, 0, 0, icon.width, icon.height, x, y)
  this.contents.fontSize = 20;
  this.changeTextColor(this.mpColor(actor));
  this.drawText(actor.mp, x + icon.width + 4, y - 12, 100);
  this.resetFontSettings();
};
//=============================================================================
// * Update Open
//=============================================================================
Window_Base.prototype.updateOpen = function() {
  if (this._opening) {
    this.openness += this.openSpeed();
    if (this.isOpen()) { this._opening = false; };
  }
};
//=============================================================================
// * Update Close
//=============================================================================
Window_Base.prototype.updateClose = function() {
  if (this._closing) {
    this.openness -= this.closeSpeed();
    if (this.isClosed()) { this._closing = false; };
  }
};
//=============================================================================
// * Determine if using gold icon
//=============================================================================
Window_Base.prototype.worldGoldIcon = function() {
  // World Index switch case
  switch (SceneManager.currentWorldIndex()) {
    case 1: return 12 ;break;
    case 2: return 13 ;break;
  }
  return 12;
};
//=============================================================================
// * Determine if using gold icon
//=============================================================================
Window_Base.prototype.worldCurrencyUnit = function() {
  // World Index switch case
  const loc_data = LanguageManager.getMessageData("XX_BLUE.World_Currency_Unit")
  switch (SceneManager.currentWorldIndex()) {
    case 1: return loc_data.clams ;break;
    case 2: return loc_data.dollars ;break;
  };
  return loc_data.clams;
};
//=============================================================================
// * Determine if using gold icon
//=============================================================================
Window_Base.prototype.usingGoldIcon = function(unit) {
  if (unit !== TextManager.currencyUnit) return false;
  // If Gold icon is more than 0
  if (Yanfly.Icon.Gold > 0) {
    // Set Gold Icon
    Yanfly.Icon.Gold = this.worldGoldIcon();
  };
  return Yanfly.Icon.Gold > 0;
};



//=============================================================================
// ** Window_Selectable
//-----------------------------------------------------------------------------
// The window class with cursor movement and scroll functions.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriBASE.Window_Selectable_initialize      = Window_Selectable.prototype.initialize;
_TDS_.OmoriBASE.Window_Selectable_update          = Window_Selectable.prototype.update;
_TDS_.OmoriBASE.Window_Selectable_updateCursor    = Window_Selectable.prototype.updateCursor;
_TDS_.OmoriBASE.Window_Selectable_itemRectForText = Window_Selectable.prototype.itemRectForText;
//=============================================================================
// * Object Initialization
//=============================================================================
Window_Selectable.prototype.initialize = function(x, y, width, height) {
  // Run Original Function
  _TDS_.OmoriBASE.Window_Selectable_initialize.call(this, x, y, width, height);
  // If Using Custom Cursor Rect Sprite
  if (this.isUsingCustomCursorRectSprite()) {
    // Initialize Custom Rect
    this.initCustomCursorRect();
  };
};
//=============================================================================
// * Frame Update
//=============================================================================
Window_Selectable.prototype.update = function() {
  // Run Original Function
  _TDS_.OmoriBASE.Window_Selectable_update.call(this);
  // Update Custom Rect Sprite Visibility
  this.updateCustomCursorRectSpriteVisibility();
};
//=============================================================================
// * Determine if using custom cursor rectangle
//=============================================================================
Window_Selectable.prototype.isUsingCustomCursorRectSprite = function() { return false; };
//=============================================================================
// * Determine if custom cursor sprite should be visible
//=============================================================================
Window_Selectable.prototype.isCustomCursorRectSpriteVisible = function() {
  if (this.openness < 255) { return false; };
  if (!this.visible) { return false; };
  if (!this.isCursorVisible()) { return false; };
  if (this.index() < 0) { return false; };
  return true;
};
//=============================================================================
// * Get Custom Cursor Rect Offsets
//=============================================================================
Window_Selectable.prototype.customCursorRectXOffset = function() { return 8; }
Window_Selectable.prototype.customCursorRectYOffset = function() { return 0; }
Window_Selectable.prototype.customCursorRectTextXOffset = function() { return 16; }
Window_Selectable.prototype.customCursorRectTextYOffset = function() { return 0; }
Window_Selectable.prototype.customCursorRectTextWidthOffset = function() { return 0; }
Window_Selectable.prototype.customCursorRectBitmapName = function() { return 'cursor_menu'; }
//=============================================================================
// * Create Custom Cursor Rect
//=============================================================================
Window_Selectable.prototype.initCustomCursorRect = function() {
  // Initialize Cursor Rect Sprite
  this._customCursorsSprites = [];
  // Create Custom Cursor Rect Sprite Container
  this._customCursorRectSpriteContainer = new Sprite();
  this.addChild(this._customCursorRectSpriteContainer);
  // Create Custom Cursor Rect Sprite
  this._customCursorRectSprite = new Sprite_WindowCustomCursor(undefined, this.customCursorRectBitmapName());
  this._customCursorRectSpriteContainer.addChild(this._customCursorRectSprite);
};
//=============================================================================
// * Update Custom Cursor Rect Sprite Visibility
//=============================================================================
Window_Selectable.prototype.updateCustomCursorRectSpriteVisibility = function() {
  // Get Sprite
  var sprite = this._customCursorRectSprite;
  // If Sprite exists set visibility
  if (sprite) { sprite.visible = this.isCustomCursorRectSpriteVisible(); };
  // Custom Cursor Sprites Exist
  if (this._customCursorsSprites) {
    // Go Through Sprites
    for (var i = 0; i < this._customCursorsSprites.length; i++) {
      // Go Through Sprites
      var sprite = this._customCursorsSprites[i];
      // If Sprite exists set visibility
      if (sprite) { sprite.visible = this.isCustomCursorRectSpriteVisible(); };
    };
  };
};
//=============================================================================
// * Update Custom Cursor Rect Sprite
//=============================================================================
Window_Selectable.prototype.updateCustomCursorRectSprite = function(sprite, index) {
  // If Custom Rect Sprite Exists
  if (sprite) {
    // Get Index
    if (index === undefined) { index = this.index(); }
    // Get Rectangle
    var rect = this.itemRect(index);
    sprite.visible = this.isCustomCursorRectSpriteVisible();
    sprite.x = rect.x + this.customCursorRectXOffset();
    sprite.y = ((rect.y + this.standardPadding()) + Math.floor(rect.height / 2)) + this.customCursorRectYOffset();
    // Set Sprite active flag
    sprite._active = this.active;
    // If Active
    if (this.active) {
      sprite.setColorTone([0, 0, 0, 0]);
    } else {
      sprite.setColorTone([-80, -80, -80, 255]);
    };
  };
};
//=============================================================================
// * Item Rect For Text
//=============================================================================
Window_Selectable.prototype.itemRectForText = function(index) {
  // Get Rect
  var rect = _TDS_.OmoriBASE.Window_Selectable_itemRectForText.call(this, index);
  // Adjust Rect by Offset
  rect.x += this.customCursorRectTextXOffset();
  rect.y += this.customCursorRectTextYOffset();
  rect.width += this.customCursorRectTextWidthOffset();
  // Return Rect
  return rect;
};
//=============================================================================
// * Run Original Function
//=============================================================================
Window_Selectable.prototype.updateCursor = function() {
  // If Using Custom Cursor Rect Sprite
  if (this.isUsingCustomCursorRectSprite()) {
    // If Custom Cursor Sprites Exist
  if (this._customCursorsSprites) {
    if (this._cursorAll && this._customCursorsSprites.length <= 0) {
      // Get Current Index
      var index = this.index();
      var mainSprite = this._customCursorRectSprite
      // Get Top Row
      var topRow = this.topRow();
      var maxCols = this.maxCols();
      var pageItems = this.maxPageItems();
      // Iterate Page Items
      for (var i = 0; i < pageItems; i++) {
        var tIndex = ((topRow * maxCols)  + i);
        // If Top index is the same as main sprite index
        if (tIndex === index) { continue; }
        // Create Sprite
        var sprite = new Sprite_WindowCustomCursor(tIndex, this.customCursorRectBitmapName());
        // Set Sprite Angle
        sprite._angle = mainSprite._angle;
        this._customCursorRectSpriteContainer.addChild(sprite);
        // Initialize Cursor Rect Sprite
        this._customCursorsSprites[i] = sprite;
      };
    } else if (this._customCursorsSprites.length > 0) {
      // Go Through Sprites
      for (var i = 0; i < this._customCursorsSprites.length; i++) {
        // Go Through Sprites
        var sprite = this._customCursorsSprites[i];
        // If Sprite exists set visibility
        if (sprite) { this._customCursorRectSpriteContainer.removeChild(sprite); };
      };
      // Clear Array
      this._customCursorsSprites = [];
    };
  };
  // Update Custom Rect Sprite
  this.updateCustomCursorRectSprite(this._customCursorRectSprite);
  if (this._customCursorsSprites) {
    // Go Through Sprites
    for (var i = 0; i < this._customCursorsSprites.length; i++) {
      // Go Through Sprites
      var sprite = this._customCursorsSprites[i];
      // If Sprite exists set visibility
      if (sprite) { this.updateCustomCursorRectSprite(sprite, sprite._index); };
    };
  };
  return;
  } else {
    // Run Original Function
    _TDS_.OmoriBASE.Window_Selectable_updateCursor.call(this);
  };
};
//=============================================================================
// * Select Available Index
//=============================================================================
Window_Selectable.prototype.selectAvailable = function(index) {
  // Set Default Index
  if (index === undefined) { index = this.index(); }
  // Get Top Row & Max Top Row
  var topRow = this.topRow(), maxRow = this.maxTopRow();
  // Select Index
  this.select(Math.min(index, this.maxItems() - 1));
  // Set Top Row if it's beyond the current max
  if (topRow > maxRow) { this.setTopRow(maxRow); }
};




//=============================================================================
// ** Sprite_Picture
//-----------------------------------------------------------------------------
// The sprite for displaying a picture.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriBASE.Sprite_Picture_updatePosition = Sprite_Picture.prototype.updatePosition;
//=============================================================================
// * Select Available Index
//=============================================================================
Sprite_Picture.prototype.updatePosition = function() {
  // Run Original Function
  _TDS_.OmoriBASE.Sprite_Picture_updatePosition.call(this);
  // Get Picture
  var picture = this.picture();
  // If Picture is Pinned to Map
  if (picture.isPinnedToMap()) {
    // Set Picture Position
    this.x = picture.x() - ($gameMap.displayX() * $gameMap.tileWidth());
    this.y = picture.y() - ($gameMap.displayY() * $gameMap.tileHeight());
  };
  if(picture.isFollowingShake()) { this.y -= Math.round(2 * $gameScreen.shake());}
};





//=============================================================================
// ** Window_OmoMenuHelp
//-----------------------------------------------------------------------------
// The window for showing help text
//=============================================================================
function Window_OmoMenuHelp() { this.initialize.apply(this, arguments); }
Window_OmoMenuHelp.prototype = Object.create(Window_Base.prototype);
Window_OmoMenuHelp.prototype.constructor = Window_OmoMenuHelp;
//=============================================================================
// * Object Initialization
//=============================================================================
Window_OmoMenuHelp.prototype.initialize = function(width = this.windowWidth(), height = this.windowHeight()) {
  // Super Call
  Window_Base.prototype.initialize.call(this, 0, 0, width, height);
  // Icon Rate
  this._iconRate = 1.0;
  // Set Item to Null
  this.clear();
};
//=============================================================================
// * Settings
//=============================================================================
Window_OmoMenuHelp.prototype.standardPadding = function() { return 4; }
Window_OmoMenuHelp.prototype.windowWidth = function () { return Graphics.width - 22; };
Window_OmoMenuHelp.prototype.windowHeight = function() { return 114 - 24; }
Window_OmoMenuHelp.prototype.standardFontSize = function() { return LanguageManager.getMessageData("XX_BLUE.Window_OmoMenuHelp").refresh_description_fontsize; };
Window_OmoMenuHelp.prototype.calcTextHeight = function() { return 21; }
//=============================================================================
// * Refresh
//=============================================================================
Window_OmoMenuHelp.prototype.refresh = function() {
  // Clear Contents
  this.contents.clear();
  // If Item Exists
  if (this._item) {
    this.contents.fontSize = LanguageManager.getMessageData("XX_BLUE.Window_OmoMenuHelp").refresh_contents_fontsize;
    this.drawText(this._item.name, 6, -6, 200);
    this.contents.fontSize = this.standardFontSize();
    // replace with drawtextex
    let loc_position = LanguageManager.getMessageData("XX_BLUE.Window_OmoMenuHelp").refresh_position;
    this.drawTextEx(this._item.description, loc_position[0], loc_position[1], 28); // CHANGE: Item descriptions text
    // Get Icon width
    var width = 106 * this._iconRate;
    // Draw Item Icon
    this.drawItemIcon(this._item, this.contents.width - width, 0, this._iconRate);
    // Get Icon Name
    var iconName = this._item.meta.IconName;
    // If Icon Name Exists
    if (iconName) {
      // Get Bitmap
      // var bitmap = ImageManager.loadSystem('/items/' + iconName.trim());
      var bitmap = ImageManager.loadSystem(iconName.trim());
      // Create Icon Bitmap
      bitmap.addLoadListener(() => {
        var icon = new Bitmap(bitmap.width * this._iconRate, bitmap.height * this._iconRate);
        icon.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0, icon.width, icon.height);
        var padding = this.standardPadding()
        var x = this.contents.width - icon.width;
        var y = this.contents.height - icon.height;
        this.contents.blt(icon, 0, 0, icon.width, icon.height, x, y)
      })
    }
  };
};
//=============================================================================
// * Clear
//=============================================================================
Window_OmoMenuHelp.prototype.clear = function() { this.setItem(null); };
//=============================================================================
// * Set Battler (Yanfly Compatibility)
//=============================================================================
Window_OmoMenuHelp.prototype.setBattler = function() {};
//=============================================================================
// * Set Item
//=============================================================================
Window_OmoMenuHelp.prototype.setItem = function(item) {
  if (item !== this._item) {
    // Set Item
    this._item = item;
    // Refresh Contents
    this.refresh();
  };
};



//=============================================================================
// ** Window_OmoWindowIndexCursor
//-----------------------------------------------------------------------------
// The window for show actor status in the equip scene.
//=============================================================================
function Window_OmoWindowIndexCursor() { this.initialize.apply(this, arguments); }
Window_OmoWindowIndexCursor.prototype = Object.create(Window_Base.prototype);
Window_OmoWindowIndexCursor.prototype.constructor = Window_OmoWindowIndexCursor;
//=============================================================================
// * Object Initialization
//=============================================================================
Window_OmoWindowIndexCursor.prototype.initialize = function(index) {
  // Set Set
  this._text = '';
  // Super Call
  Window_Base.prototype.initialize.call(this, 0, 0, 100, 40);
  // Create Index Sprite
  this.createIndexSprite();
  // Refresh
  this.refresh();
};
//=============================================================================
// * Standard Padding
//=============================================================================
Window_OmoWindowIndexCursor.prototype.standardPadding = function() { return 10; }
//=============================================================================
// * Create Index Sprite
//=============================================================================
Window_OmoWindowIndexCursor.prototype.createIndexSprite = function() {
  this._indexSprite = new Sprite(ImageManager.loadSystem('ACSArrows'))
  this._indexSprite.anchor.set(0.5, 0.5);
  this._indexSprite.setFrame(0, 0, 32, 29);
  this.addChild(this._indexSprite);
};
//=============================================================================
// * Set Text
//=============================================================================
Window_OmoWindowIndexCursor.prototype.setText = function(text) {
  // If Text has changed
  if (text !== this._text) {
    // Set text
    this._text = text;
    // Redraw Window
    this.refresh();
  };
};
//=============================================================================
// * Refresh
//=============================================================================
Window_OmoWindowIndexCursor.prototype.refresh = function() {
  // Clear Contents
  let fontSize = LanguageManager.getMessageData("XX_BLUE.Window_OmoWindowIndexCursor").refresh_contents_fontsize;
  this.contents.fontSize = fontSize; // Change: Selection Text Size
  this.width = this.textWidth(this._text) + (this.standardPadding() * 2) + 10;
  this.createContents()
  this.contents.clear();
  this.contents.fontSize = fontSize; // Change: Selection Text Size
  // Draw Text
  const loc_position = LanguageManager.getMessageData("XX_BLUE.Window_OmoWindowIndexCursor").refresh_draw_text_position;
  this.drawText(this._text, loc_position[0], loc_position[1], this.contents.width, 'center');
  // Center Index Sprite
  this._indexSprite.x = this.width / 2;
  this._indexSprite.y = this.height + 5
};



//=============================================================================
// ** Sprite_OmoMenuStatusFace
//-----------------------------------------------------------------------------
// Animated Face Sprite for menus.
//=============================================================================
function Sprite_OmoMenuStatusFace() { this.initialize.apply(this, arguments);}
Sprite_OmoMenuStatusFace.prototype = Object.create(Sprite.prototype);
Sprite_OmoMenuStatusFace.prototype.constructor = Sprite_OmoMenuStatusFace;
//=============================================================================
// * Initialize Object
//=============================================================================
Sprite_OmoMenuStatusFace.prototype.initialize = function() {
  // Super Call
  Sprite.prototype.initialize.call(this);
  // Set Actor
  this._actor = null;
  // Animation Row
  this._animRow = 0;
  this._animDelay = this.defaultDelay();
  this._animFrame = 0;
  // Active Flag
  this._active = true;
  // In Menu Flag
  this._inMenu = false;
  // Set Face Width & Height
  this._faceWidth = 106;
  this._faceHeight = 106;
};
//=============================================================================
// * Update Bitmap
//=============================================================================
Sprite_OmoMenuStatusFace.prototype.updateBitmap = function() {
  // Get Actor
  var actor = this.actor
  // If Actor Exists and it has Battle Status Face Name
  if (actor) {
    // Face Name
    let faceName
    if (this._inMenu) {
      // Get Face Name
      faceName = actor.menuStatusFaceName();
      // Set Face Width & Height
      this._faceWidth = 124;
      this._faceHeight = 124;
    };
    // Set Default Face Name
    if (!faceName) {
      faceName = actor.battleStatusFaceName();
      // Set Face Width & Height
      this._faceWidth = 106;
      this._faceHeight = 106;
    };
    // Set Bitmap
    this.bitmap = ImageManager.loadFace(faceName);
  } else {
    this.bitmap = null;
  };
  // Update Frame
  this.updateFrame();
};



//=============================================================================
// * Actor
//=============================================================================
Object.defineProperty(Sprite_OmoMenuStatusFace.prototype, 'actor', {
  get: function() { return this._actor; },
  set: function(value) {
    // If Value is changing
    if (value !== this._actor) {
      this._actor = value;
      this.updateBitmap();
    }
  },
  configurable: true
})
//=============================================================================
// * Max Frames
//=============================================================================
Sprite_OmoMenuStatusFace.prototype.maxFrames = function() { return 3; };
//=============================================================================
// * Default Animation Delay
//=============================================================================
Sprite_OmoMenuStatusFace.prototype.defaultDelay = function() { return 12; };
//=============================================================================
// * Face Width & Height
//=============================================================================
Sprite_OmoMenuStatusFace.prototype.faceWidth = function() {  return this._faceWidth;  };
Sprite_OmoMenuStatusFace.prototype.faceHeight = function() {  return this._faceHeight; };
//=============================================================================
// * Activate & Deactivate
//=============================================================================
Sprite_OmoMenuStatusFace.prototype.activate   = function() { this._active = true; };
Sprite_OmoMenuStatusFace.prototype.deactivate = function() { this._active = false; };
//=============================================================================
// * Show & Hide
//=============================================================================
Sprite_OmoMenuStatusFace.prototype.show   = function() { this.visible = true; };
Sprite_OmoMenuStatusFace.prototype.hide = function() { this.visible = false; };
//=============================================================================
// * Update Frame
//=============================================================================
Sprite_OmoMenuStatusFace.prototype.setAnimRow = function(index) {
  // Set Animation Row
  this._animRow = index;
  // Update Frame
  this.updateFrame();
};
//=============================================================================
// * Frame Update
//=============================================================================
Sprite_OmoMenuStatusFace.prototype.update = function() {
  // Super Call
  Sprite.prototype.update.call(this);
  // If Active
  if (this._active) {
    // // If Animation Delay is more than 0
    if (this._animDelay > 0) {
      // Decrease Animation Value
      this._animDelay--;
    } else {
      // Reset Delay
      this._animDelay = this.defaultDelay();
      this._animFrame = (this._animFrame + 1) % this.maxFrames();
      // Update Frame
      this.updateFrame();
    };
  };
};
//=============================================================================
// * Update Frame
//=============================================================================
Sprite_OmoMenuStatusFace.prototype.updateFrame = function() {
  // Get Face Width & Height
  var fw = this.faceWidth(), fh = this.faceHeight();
  // Get Face X & Y
  var fx = (this._animFrame * fw);
  var fy = this._animRow * fh;
  // Set Frame
  this.setFrame(fx, fy, fw, fh);
};




//=============================================================================
// ** Sprite_WindowCustomCursor
//-----------------------------------------------------------------------------
// This sprite is used to display a custom cursor in windows.
//=============================================================================
function Sprite_WindowCustomCursor() { this.initialize.apply(this, arguments); }
Sprite_WindowCustomCursor.prototype = Object.create(Sprite.prototype);
Sprite_WindowCustomCursor.prototype.constructor = Sprite_WindowCustomCursor;
//=============================================================================
// * Object Initialization
//=============================================================================
Sprite_WindowCustomCursor.prototype.initialize = function(index, name) {
  // Super Call
  Sprite.prototype.initialize.call(this);
  // Set Index
  this._index = index;
  // Set Sprite X
  this.anchor.set(0.5, 0.5);
  // Setup Bitmap
  this.setupBitmap(name);
  // Initialize Cursor Animation
  this.initCursorAnimation();
  // Update Cursor Animation
  this.updateCursorAnimation();
};
//=============================================================================
// * Determine if Active
//=============================================================================
Sprite_WindowCustomCursor.prototype.isActive = function() { return this._active; };
//=============================================================================
// * Activate/Deactivate
//=============================================================================
Sprite_WindowCustomCursor.prototype.activate = function() { this._active = true; };
Sprite_WindowCustomCursor.prototype.deactivate = function() { this._active = false; };
//=============================================================================
// * Initialize Cursor Animation Values
//=============================================================================
Sprite_WindowCustomCursor.prototype.initCursorAnimation = function(area, speed, duration) {
  // Active Flag
  this._active = true;
  // Set Properties
  this._sineIndex = 0;
  this._speed = speed === undefined ? 0.5: speed;
  // Initialize Sine Y List
  this._sineYList = [];
  // Duration
  duration = duration === undefined ? 20 : duration;
  // Set Amplitude
  const amplitude = area === undefined ? 0.1 : area;
  // Generate Sine Y List
  for (var i = 0; i < duration; i++) {
    this._sineYList.push(Math.sin(i * (Math.PI / (duration / 2))) * amplitude);
  };
};
//=============================================================================
// * Setup Bitmap
//=============================================================================
Sprite_WindowCustomCursor.prototype.setupBitmap = function(name) {
  // Set Bitmap
  this.bitmap = ImageManager.loadSystem(name === undefined ? 'cursor_menu' : name);
};
//=============================================================================
// * Frame Update
//=============================================================================
Sprite_WindowCustomCursor.prototype.update = function() {
  // Super Call
  Sprite.prototype.update.call(this);
  // If Active
  if (this.isActive()) {
    // Update Cursor Animation
    this.updateCursorAnimation();
  };
};
//=============================================================================
// * Update Cursor Animation
//=============================================================================
Sprite_WindowCustomCursor.prototype.updateCursorAnimation = function() {
  // Get Index
  const index = Math.floor(this._sineIndex);
  // Set Anchor Position
  this.anchor.x = this._sineYList[index];
  // Increase Sine Index
  this._sineIndex = (this._sineIndex + this._speed) % this._sineYList.length;
};



//=============================================================================
// ** Sprite_InputButton
//-----------------------------------------------------------------------------
// Sprite for displaying animated inputs displays.
//=============================================================================
function Sprite_InputButton() { this.initialize.apply(this, arguments);}
Sprite_InputButton.prototype = Object.create(Sprite.prototype);
Sprite_InputButton.prototype.constructor = Sprite_InputButton;
//=============================================================================
// * Initialize Object
//=============================================================================
Sprite_InputButton.prototype.initialize = function() {
  // Super Call
  Sprite.prototype.initialize.call(this);
  // Set Icon Frame Maximum Delay
  this._iconFrameDelayMax = 20;
  // Set Input name
  this._inputName = '';
  // Set Input Key
  this._inputKey = 0;
  // Set Default Input Type
  this._inputType = 'keyboardBlack24';
  // Set Gamepad Flag
  this._gamepad = false;
  // Active Flag
  this._active = false;
};
//=============================================================================
// * Activate
//=============================================================================
Sprite_InputButton.prototype.activate   = function() { this._active = true; };
//=============================================================================
// * Deactivate
//=============================================================================
Sprite_InputButton.prototype.deactivate = function() {
  this._active = false;
  // Reset Animation
  this.resetAnimation();
  // Refresh Frame
  this.refreshFrame();
};
//=============================================================================
// * Reset Animation
//=============================================================================
Sprite_InputButton.prototype.resetAnimation = function() {
  // Set Icon Frame
  this._iconFrame = 0;
  // Set Icon Frame Delay
  this._iconFrameDelay = this._iconFrameDelayMax;
};
//=============================================================================
// * Refresh Frame
//=============================================================================
Sprite_InputButton.prototype.refreshFrame = function() {
  // Get Frame
  var frame = this._iconFrame === 0 ? this._iconRects.up : this._iconRects.down;
  // Set Frame
  this.setFrame(frame.x, frame.y, frame.width, frame.height);
};
//=============================================================================
// * Setup Key
//=============================================================================
Sprite_InputButton.prototype.setupKey = function(key, type = this._inputType, gamepad = this._gamepad) {
  // Get Language Data
  var data = LanguageManager.languageData().text.System.InputIcons[type];
  // Set Gamepad Flag
  this._gamepad = gamepad;
  // Set Input name
  this._inputName = '';
  // Set Input Key
  this._inputKey = key;
  // Set Bitmap
  this.bitmap = ImageManager.loadSystem('Input/' + data.source);
  // Set Icon Rects
  this._iconRects = this.bitmap.keyIconRects(this._inputKey, type);
  // Reset Animation
  this.resetAnimation();
  // Refresh Frame
  this.refreshFrame();
};
//=============================================================================
// * Setup Input
//=============================================================================
Sprite_InputButton.prototype.setupInput = function(input, type = this._inputType, gamepad = this._gamepad) {
  // Get Language Data
  var data = LanguageManager.languageData().text.System.InputIcons[type];
  // Set Gamepad Flag
  this._gamepad = gamepad;
  // Set Input name
  this._inputName = input;
  // Set Input Key
  this._inputKey = Input.inputKeyCode(input, gamepad);
  // Set Bitmap
  this.bitmap = ImageManager.loadSystem('Input/' + data.source);
  // Set Icon Rects
  this._iconRects = this.bitmap.keyIconRects(this._inputKey, type);
  // Reset Animation
  this.resetAnimation();
  // Refresh Frame
  this.refreshFrame();
};
//=============================================================================
// * Frame Update
//=============================================================================
Sprite_InputButton.prototype.update = function() {
  // Super Call
  Sprite.prototype.update.call(this);
  // Update Animation if Active
  if (this._active) { this.updateAnimation(); };
};
//=============================================================================
// * Update Animation
//=============================================================================
Sprite_InputButton.prototype.updateAnimation = function() {
  // If Icon Frame Delay is 0 or less
  if (this._iconFrameDelay <= 0) {
    // Set Icon Frame
    this._iconFrame = (this._iconFrame + 1) % 2;
    // Refresh Frame
    this.refreshFrame();
    // Set Icon Frame Delay
    this._iconFrameDelay = this._iconFrameDelayMax;
  } else {
    // Decrease Icon Frame Delay
    this._iconFrameDelay--;
  };
};




//=============================================================================
// ** Window_Message
//-----------------------------------------------------------------------------
// The window for displaying text messages.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriBASE.Window_Message_calcTextHeight   = Window_Message.prototype.calcTextHeight;
_TDS_.OmoriBASE.Window_Message_createSubWindows = Window_Message.prototype.createSubWindows;
_TDS_.OmoriBASE.Window_Message_updateLoading    = Window_Message.prototype.updateLoading;
_TDS_.OmoriBASE.Window_Message_updatePlacement  = Window_Message.prototype.updatePlacement;
_TDS_.OmoriBASE.Window_Message_loadMessageFace  = Window_Message.prototype.loadMessageFace;
//=============================================================================
// * Create Sub Windows
//=============================================================================
Window_Message.prototype.createSubWindows = function() {
  // Run Original Function
  _TDS_.OmoriBASE.Window_Message_createSubWindows.call(this);
  // Create Face Box Windows
  this.createFaceBoxWindows();
  // If In battle
  if (SceneManager._scene.constructor === Scene_Battle) {
    // Create Battle Message Tail
    this.createBattleMessageTail();
  };
  if (this._nameWindow) {
    // Set Name Window Position
    this._nameWindow.x = -300;
  };

  this._goldWindow.x = this._goldWindow.x - 20;
  this._goldWindow.y = this._goldWindow.y + 13;

};
//=============================================================================
// * Settings
//=============================================================================
Window_Message.prototype.newLineX = function() { return 10; };
Window_Message.prototype.lineHeight = function() { return 24; };
Window_Message.prototype.numVisibleRows = function() { return 4; };
Window_Message.prototype.standardPadding = function() { return 8; };
//=============================================================================
// * Window Width
//=============================================================================
Window_Message.prototype.windowWidth = function() {
  if ($gameParty.inBattle()) { return 360 }
  return Graphics.boxWidth - 32;
};
//=============================================================================
// * Openness Type (0: Vertical, 1: Horizontal, 2: All)
//=============================================================================
Window_Message.prototype.standardOpennessType = function() { return 2;};
//=============================================================================
// * Open & Close Speeds
//=============================================================================
Window_Message.prototype.openSpeed  = function() { return 25; };
Window_Message.prototype.closeSpeed = function() { return 25; };
//=============================================================================
// * Calculate Text Height
//=============================================================================
Window_Message.prototype.calcTextHeight = function(textState, all) {
  // Return Original Value Plus Offset
  return _TDS_.OmoriBASE.Window_Message_calcTextHeight.call(this, textState, all) - 7;
};
//=============================================================================
// * Determine If Battle Message Tail should be visible
//=============================================================================
Window_Message.prototype.isBattleMessageTailVisible = function() {
  return $gameSwitches.value(6);
};
//=============================================================================
// * Create Battle Message Tail
//=============================================================================
Window_Message.prototype.createBattleMessageTail = function() {
  // Create Sprite
  this._battleMessageTail = new Sprite(ImageManager.loadSystem('battle_speech_tail'));
  this._battleMessageTail.y = 4;
  this._battleMessageTail.visible = false;
  this._battleMessageTail.anchor.set(0.5, 1);
  this.addChild(this._battleMessageTail);
};
//=============================================================================
// * Draw Message Face
//=============================================================================
Window_Message.prototype.drawMessageFace = function() {
  ImageManager.releaseReservation(this._imageReservationId);
};
//=============================================================================
// * Load Message Face
//=============================================================================
Window_Message.prototype.loadMessageFace = function() {
  // Run Original Function
  _TDS_.OmoriBASE.Window_Message_loadMessageFace.call(this);
  // Get Extra Faces
  var faces = $gameMessage.extraFaces();
  // Get Box Window
  var boxWindow = this._faceBoxWindows[0];
  // Setup Box Window
  boxWindow.setup($gameMessage.faceName(), $gameMessage.faceIndex(), $gameMessage._faceBackgroundColor);
  $gameMessage.faceName() === '' ? boxWindow.close() : boxWindow.open();
  boxWindow.refresh();
  boxWindow.clear();
  // Go Through Face Box Windows
  for (var i = 1; i < this._faceBoxWindows.length; i++) {
    // Get Data
    var data = faces[i -1];
    // Get Box Window
    var boxWindow = this._faceBoxWindows[i];
    // If Data
    if (data) {
      // Setup Box Window
      boxWindow.setup(data.faceName, data.faceIndex, data.color);
      boxWindow.refresh();
      boxWindow.clear();
      boxWindow.open();
    } else {
      // Clear Box Window
      boxWindow.clear();
      boxWindow.close();
      boxWindow.refresh();
    };
  };
};
//=============================================================================
// * Update Placement
//=============================================================================
Window_Message.prototype.updatePlacement = function() {
  // Run Original Function
  _TDS_.OmoriBASE.Window_Message_updatePlacement.call(this);
  // Set Face Box Window Container Position
  this._faceBoxWindowContainer.y = this.y - 126
  // If Battle Message Tail
  if (this._battleMessageTail) {
    // Center it
    this._battleMessageTail.x = this.width / 2;
    // Set Battle Message Tail Visibility
    this._battleMessageTail.visible = this.isBattleMessageTailVisible();
  };
  if (this._positionType === 0) { this.y += 8 };
  if (this._positionType === 2) {
    if ($gameParty.inBattle()) {
      if ($gameSwitches.value(41) || [2, 5, 6].contains($gameVariables.value(22))) {
        this.y -= 11;
      } else {
        this.y -= 65;
      }
    } else {
      this.y -= 8
    }
  };
  // Set Gold position window
  this._goldWindow.y = this.y > 0 ? 12 : Graphics.boxHeight - this._goldWindow.height
};
//=============================================================================
// * Create Face Box Windows
//=============================================================================
Window_Message.prototype.createFaceBoxWindows = function() {
  // Initialize Face Box Windows Array
  this._faceBoxWindows = [];
  // Create FaceBoxWindow Container
  this._faceBoxWindowContainer = new Sprite();
  this._faceBoxWindowContainer.x = 0//Graphics.width
  for (var i = 0; i < 4; i++) {
    // Create Window
    var win = new Window_MessageFaceBox(i);
    win.x = -((i + 1) * (win.width + 2));
    win.openness = 0;
    // Set FaceBox Window
    this._faceBoxWindows[i] = win;
    this._faceBoxWindowContainer.addChild(win);
  };
};
//=============================================================================
// * Update Open
//=============================================================================
Window_Message.prototype.updateOpen = function() {
  if (this._opening) {
    // Super Call
    Window_Base.prototype.updateOpen.call(this);
    var rate = this.openness / 255
    /*var tx = (this.x + this.width + 2);
    this._faceBoxWindowContainer.x = ((Graphics.width - 16) + tx + 2) - (rate * tx);*/
    var d = Math.max((rate * 20), 1);
    this._nameWindow.x = (this._nameWindow.x * (d - 1) + 77) / d;
    if (this._battleMessageTail) {
      this._battleMessageTail.y = this._windowSpriteContainer.y + 4;
      this._battleMessageTail.scale.y = rate;
    };
  };
};
//=============================================================================
// * Update Close
//=============================================================================
Window_Message.prototype.updateClose = function() {
  if (this._closing) {
    // Super Call
    Window_Base.prototype.updateClose.call(this);
    var rate = this.openness / 255
   /* var tx = Graphics.width;
    this._faceBoxWindowContainer.x = (Graphics.width + tx + 2) - (rate * tx)*/
    var d = Math.max((rate * 20), 1);
    this._nameWindow.x = (this._nameWindow.x * (d - 1) + -300) / d;
    this._faceBoxWindow.openness = Math.min(this._faceBoxWindow.openness,this.openness);
    if (this._battleMessageTail) {
      this._battleMessageTail.y = this._windowSpriteContainer.y + 4;
      this._battleMessageTail.scale.y = rate;
    };
    if (this.isClosed()) {
      // Go Through Face Box Windows
      /*for (var i = 0; i < this._faceBoxWindows.length; i++) {
        this._faceBoxWindows[i].openness = 0;
      };*/
    };
  };
};
//=============================================================================
// * Refresh Pause Sign
//=============================================================================
Window_Message.prototype._refreshPauseSign = function() {
  this._windowPauseSignSprite.bitmap = ImageManager.loadSystem('cursor_menu');
  this._windowPauseSignSprite.anchor.x = 0.5;
  this._windowPauseSignSprite.anchor.y = 1;
  this._windowPauseSignSprite.alpha = 0;
  // Move Window Pause Sign Sprite
  this._windowPauseSignSprite.move(this._width - 40, this._height - 10);
};
//=============================================================================
// * Update Pause Sign
//=============================================================================
Window_Message.prototype._updatePauseSign = function() {
  //  Get Sprite
  var sprite = this._windowPauseSignSprite;
  // If not paused
  if (!this.pause) {
    // Set Alpha to 0
    sprite.alpha = 0;
  } else if (sprite.alpha < 1) {
    // Increase Alpha
    sprite.alpha = Math.min(sprite.alpha + 0.1, 1);
  }
  // Set Sprite visibility
  sprite.visible = this.isOpen();
  // Move sprite anchor X for animation effect
  sprite.anchor.x = 0.5 + (Math.sin(this._animationCount * 0.1) * 0.1)
};
//=============================================================================
// * Wordwrap Width
//=============================================================================
Window_Message.prototype.wordwrapWidth = function(){
  if (Yanfly.Param.MSGTightWrap && $gameMessage.faceName() !== '') {
    return this.contents.width - this.newLineX();
  }
  return Window_Base.prototype.wordwrapWidth.call(this) - 10;
};



//=============================================================================
// ** Window_NameBox
//-----------------------------------------------------------------------------
// The window for displaying names along text messages.
//=============================================================================
// * Settings
//=============================================================================
Window_NameBox.prototype.standardPadding = function() { return 12; };
Window_NameBox.prototype.lineHeight = function() { return 20; };
//=============================================================================
// * Openness Type (0: Vertical, 1: Horizontal, 2: All)
//=============================================================================
Window_NameBox.prototype.standardOpennessType = function() { return 2;};
//=============================================================================
// * Refresh
//=============================================================================
Window_NameBox.prototype.refresh = function(text, position) {
  this.show();
  this._lastNameText = text;
  this._text = Yanfly.Param.MSGNameBoxText + text;
  this._position = position;
  this.width = this.windowWidth();
  this.createContents();
  this.contents.clear();
  this.resetFontSettings();
  this.changeTextColor(this.textColor(Yanfly.Param.MSGNameBoxColor));
  var padding = eval(Yanfly.Param.MSGNameBoxPadding) / 2;
  const loc_position = LanguageManager.getMessageData("XX_BLUE.Window_NameBox").refresh_draw_text_position
  this.drawTextEx(this._text, eval(loc_position[0]), loc_position[1], this.contents.width);
  this._parentWindow.adjustWindowSettings();
  this._parentWindow.updatePlacement();
//  this.adjustPositionX();
  this.adjustPositionY();
  this.y -= 4;
  this.open();
  this.activate();
  this._closeCounter = 4;
  return '';
};



//=============================================================================
// ** Window_ChoiceList
//-----------------------------------------------------------------------------
// The window used for the event command [Show Choices].
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriBASE.Window_ChoiceList_updatePlacement = Window_ChoiceList.prototype.updatePlacement;
//=============================================================================
// * Settings
//=============================================================================
Window_ChoiceList.prototype.isUsingCustomCursorRectSprite = function() { return true; }
Window_ChoiceList.prototype.standardPadding = function() { return 10; };
Window_ChoiceList.prototype.customCursorRectTextXOffset = function() { return 32; }
Window_ChoiceList.prototype.customCursorRectTextYOffset = function() { return -5; }
Window_ChoiceList.prototype.lineHeight = function() { return 30; };
Window_ChoiceList.prototype.standardFontSize = function() { return LanguageManager.getMessageData("XX_BLUE.Window_ChoiceList").standardFontSize; };
//=============================================================================
// * Max Choice Width
//=============================================================================
Window_ChoiceList.prototype.maxChoiceWidth = function() {
  var maxWidth = 36;
  var choices = $gameMessage.choices();
  for (var i = 0; i < choices.length; i++) {
    var choiceWidth = this.textWidthEx(choices[i]) + this.textPadding() * 2;
    if (maxWidth < choiceWidth) {
      maxWidth = choiceWidth;
    };
  };
  return maxWidth + 28;
};
//=============================================================================
// * Calculate Text Height
//=============================================================================
Window_ChoiceList.prototype.calcTextHeight = function(textState, all) {
  return Window_Command.prototype.calcTextHeight.call(this, textState, all) - 3;
};
//=============================================================================
// * Update Placement
//=============================================================================
Window_ChoiceList.prototype.updatePlacement = function() {
  // Run Original Function
  _TDS_.OmoriBASE.Window_ChoiceList_updatePlacement.call(this);
  // Move Window
  this.x -= 18; this.y -= 8;
  var messageY = this._messageWindow.y;
  if (messageY >= Graphics.boxHeight / 2) {
    this.y -= 4;
  } else {
    this.y += 4;
  };
  // Get Face Window
  var faceWindow = this._messageWindow._faceBoxWindow;
  // Set Position based on face window
  if (!!$gameMessage.faceCount()) { this.x += faceWindow.x; };
};



//=============================================================================
// ** Window_Message
//-----------------------------------------------------------------------------
// The window for displaying text messages.
//=============================================================================
// * Settings
//=============================================================================
// Window_NumberInput.prototype.standardFontSize = function() { return 24; };
Window_NumberInput.prototype.standardPadding = function() { return 8; };
//=============================================================================
// * Update Placement
//=============================================================================
Window_NumberInput.prototype.updatePlacement = function() {
  let messageY = this._messageWindow.y;

  this.width = this.windowWidth();
  this.height = this.windowHeight();

  this.x = (this._messageWindow.x + this._messageWindow.width) - this.width
  this.y = messageY - this.height - 4;
};



//=============================================================================
// ** Sprite_Character
//-----------------------------------------------------------------------------
// The sprite for displaying a character.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriBASE.Sprite_Character_update = Sprite_Character.prototype.update;
_TDS_.OmoriBASE.Sprite_Character_updateCharacterFrame = Sprite_Character.prototype.updateCharacterFrame;
//=============================================================================
// * Frame Update
//=============================================================================
Sprite_Character.prototype.update = function() {
  // Run Original Function
  _TDS_.OmoriBASE.Sprite_Character_update.call(this);
  // Update Bobble Effect
  this.updateBobble();
  // Update Input Icon
  this.updateInputIcon();
  // Update Shadow
  this.updateShadow();
};
//=============================================================================
// * Update Character Frame
//=============================================================================
Sprite_Character.prototype.updateCharacterFrame = function() {
  // If Character Exists and Is single Framed
  if (this._character && this._character.isSingleFrame()) {
    // Set Frame
    this.setFrame(0, 0, this.bitmap.width, this.bitmap.height);
    return;
  };
  // Run Original Function
  _TDS_.OmoriBASE.Sprite_Character_updateCharacterFrame.call(this);
};
//=============================================================================
// * Update Bobble
//=============================================================================
Sprite_Character.prototype.updateBobble = function() {
  // Get Bobble Properties
  var bobble = this._character._bobble;
  // If Bobble
  if (bobble) {
    // Apply Bobble Effect
    this.anchor.y = bobble.base + (Math.sin(Graphics.frameCount * bobble.speed) * bobble.amplitude);
  } else {
    // Set Anchor Y to 1
    this.anchor.y = 1;
  };
};
//=============================================================================
// * Update Input Icon
//=============================================================================
Sprite_Character.prototype.updateInputIcon = function() {
  // Get Input
  var input = this._character._inputIcon;
  // If Input Icon Sprite Exists
  if (this._inputIconSprite) {
    // If Input Data exists
    if (input) {
      // If Scale is less than 1
      if (this._inputIconSprite.scale.x < 1) {
        var scale = this._inputIconSprite.scale.x + 0.1;
        this._inputIconSprite.scale.set(scale, scale)
        // Set Input Scale
        input.scale = scale;
      };
      // Set Position
      this._inputIconSprite.x = this.x;
      this._inputIconSprite.y = this.y - this.height - (this._inputIconSprite.height * this._inputIconSprite.anchor.y);
    } else {
      // If Scale is more than 0
      if (this._inputIconSprite.scale.x > 0.0) {
        var scale = Math.max(this._inputIconSprite.scale.x - 0.1, 0);
        this._inputIconSprite.scale.set(scale, scale);
        // Set Position
        this._inputIconSprite.x = this.x;
        this._inputIconSprite.y = this.y - this.height - (this._inputIconSprite.height * this._inputIconSprite.anchor.y);
      } else {
        this.parent.removeChild(this._inputIconSprite);
        this._inputIconSprite = null;
      };
    };
  } else {
    // If Input Data Exists
    if (input) {
      // Get Scale
      var scale = input.scale === undefined ? 0.0 : input.scale
      // Create Input Icon Sprite
      this._inputIconSprite = new Sprite_InputButton();
      this._inputIconSprite.scale.set(scale, scale);
      this._inputIconSprite.anchor.set(0.5, 0.5);
      this._inputIconSprite.activate();
      this._inputIconSprite.z = 7
      this.parent.addChild(this._inputIconSprite);
      // Set Position
      this._inputIconSprite.x = this.x;
      this._inputIconSprite.y = this.y - this.height - (this._inputIconSprite.height * this._inputIconSprite.anchor.y);
      // If Input is for key
      if (input.key) {
        this._inputIconSprite.setupKey(input.input);
      } else {
        this._inputIconSprite.setupInput(input.input);
      }
    };
  };
};
//=============================================================================
// * Update Shadow
//=============================================================================
Sprite_Character.prototype.updateShadow = function() {
  // Get Shadow Data
  var shadow = this._character._shadow;
  // If Shadow
  if (shadow) {
    // If Shadow Sprite does not exist
    if (!this._shadowSprite) {
      // Create shadow Sprite
      this._shadowSprite = new Sprite(this.bitmap);
      this._shadowSprite.anchor.set(0.5, 1);
      this._shadowSprite.setColorTone([-255, -255, -255, 0]);
      this._shadowSprite.scale.x = -1;
      this.addChild(this._shadowSprite);
    };
    // Get Frame
    var frame = this._frame
    // Set Frame
    this._shadowSprite.setFrame(frame.x, frame.y, frame.width, frame.height);
    // Set shadow Sprite Properties
    this._shadowSprite.opacity = shadow.opacity;
    this._shadowSprite.rotation = shadow.angle * Math.PI / 180;
    this._shadowSprite.scale.y = shadow.scaleY;
    this._shadowSprite.x = shadow.x;
    this._shadowSprite.y = shadow.y;
  } else {
    // If Shadow Sprite does  exist
    if (this._shadowSprite) {
      this.removeChild(this._shadowSprite);
      delete this._shadowSprite
    };
  };
};




// //=============================================================================
// // ** Sprite_Balloon
// //-----------------------------------------------------------------------------
// // The sprite for displaying a balloon icon.
// //=============================================================================
// // Alias Listing
// //=============================================================================
// _TDS_.OmoriBASE.Sprite_Balloon_initMembers = Sprite_Balloon.prototype.initMembers;
// _TDS_.OmoriBASE.Sprite_Balloon_setup = Sprite_Balloon.prototype.setup;
// _TDS_.OmoriBASE.Sprite_Balloon_updateFrame = Sprite_Balloon.prototype.updateFrame
// //=============================================================================
// // * Initialize Members
// //=============================================================================
// Sprite_Balloon.prototype.initMembers = function() {
//   // Run Original Function
//   _TDS_.OmoriBASE.Sprite_Balloon_initMembers.call(this);
//   // Set input Key
//   this._inputKey = 0;
// };
// //=============================================================================
// // * Setup balloon
// //=============================================================================
// Sprite_Balloon.prototype.setup = function(balloonId) {
//   // Run Original Function
//   _TDS_.OmoriBASE.Sprite_Balloon_setup.call(this, balloonId);
//   // Set Input key
//   this._inputKey = $gameVariables.value(40);
//   // If Input Key is not 0
//   if (this._inputKey !== 0) {
//     // Create Input Icon
//     this.createInputIcon();
//   };
// };
// //=============================================================================
// // * Create Input Icon
// //=============================================================================
// Sprite_Balloon.prototype.createInputIcon = function() {
//   // If Input Icon Sprite does not exist
//   if (!this._inputIconSprite) {
//     // Create Input Icon Sprite
//     this._inputIconSprite = new Sprite_InputButton()
//     this._inputIconSprite.anchor.set(0.5, 1);
//     this._inputIconSprite.activate();
//     this.addChild(this._inputIconSprite);
//   };
//   // Setupt Input
//   this._inputIconSprite.setupInput(this._inputKey);
// };
// //=============================================================================
// // * Update Frame
// //=============================================================================
// Sprite_Balloon.prototype.updateFrame = function() {
//   // If Input Icon sprite exists
//   if (this._inputIconSprite) {
//     // If duration is 1 or less
//     if (this._duration <= 1) {
//       // Remove Sprite
//       this.removeChild(this._inputIconSprite);
//       this._inputIconSprite = null
//     };
//   } else {
//     // Run Original Function
//     _TDS_.OmoriBASE.Sprite_Balloon_updateFrame.call(this);
//   };
// };






//=============================================================================
// ** Scene_Map
//-----------------------------------------------------------------------------
// The scene class of the map screen.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriBASE.Scene_Map_createMessageWindow = Scene_Map.prototype.createMessageWindow;
_TDS_.OmoriBASE.Scene_Map_updateScene = Scene_Map.prototype.updateScene;
//=============================================================================
// * Create Message Window
//=============================================================================
Scene_Map.prototype.createMessageWindow = function() {
  // Run Original Function
  _TDS_.OmoriBASE.Scene_Map_createMessageWindow.call(this);
  // Get Container Index
  var containerIndex = this.children.indexOf(this._windowLayer);
  // Add Facebox Window Container as a Child (Behind Message Window)
  this.addChildAt(this._messageWindow._faceBoxWindowContainer, containerIndex - 1);
};
//=============================================================================
// * Update Scene
//=============================================================================
Scene_Map.prototype.updateScene = function() {
  // Run Original Function
  _TDS_.OmoriBASE.Scene_Map_updateScene.call(this);
  // If Scene is not changing
  if (!SceneManager.isSceneChanging()) {
    // Check for menu calls
    this.updateMapMenuCalls();
  };
};
//=============================================================================
// * Update Map Menu Calls
//=============================================================================
Scene_Map.prototype.updateMapMenuCalls = function() {
  if (!this.isMenuEnabled()) { return; }
  // If Q Is triggered
  if (Input.isTriggered('pageup')) {
    // World Index switch case
    switch (SceneManager.currentWorldIndex()) {
      case 1: // Dream World
            if ($gameSwitches.value(1210) == true) {
        SceneManager.push(Scene_OmoBlackLetterMenu);
      }
      break;
      case 2: // Faraway
      case 3: // Blackspace
      if ($gameSwitches.value(1210) == true) {
        SceneManager.push(Scene_OmoriPhotoAlbum);
        SceneManager.prepareNextScene($dataItems[914], 1);
      }
      break;
    };
  };
  // If W Is triggered
  if (Input.isTriggered('pagedown')) {
    // World Index switch case
    switch (SceneManager.currentWorldIndex()) {
      case 1: // Dream World
        if ($gameSwitches.value(1211) == true) {
          SceneManager.push(Scene_OmoriBlackLetterMap)
          }
      break;
      case 2: ;break;// Faraway
      case 3: // Blackspace
        if ($gameSwitches.value(1210) == true) {
        SceneManager.push(Scene_OmoriPhotoAlbum);
        SceneManager.prepareNextScene($dataItems[889], 1);
        }
      break;
    };
  };
};



//=============================================================================
// ** Scene_Gameover
//-----------------------------------------------------------------------------
// The scene class of the game over screen.
//=============================================================================
// Alias Listing
//=============================================================================
// _TDS_.OmoriBASE.Scene_Gameover_createMessageWindow = Scene_Map.prototype.createMessageWindow;
//=============================================================================
// * Object Initialization
//=============================================================================
Scene_Gameover.prototype.initialize = function() {
  // Set Image reservation Id
  this._imageReservationId = 'gameover';
  // Super Call
  Scene_Base.prototype.initialize.call(this);
  // Text Move Settings
  this._textModeSettings = {delay: 20, direction: 0, active: true}
  this._animData = {phase: 0, delay: 0, active: true};
  this._inputData = {index: 0, max: 2, active: false};
  if ($gameParty.inBattle()) {
    this._isFinalBattle = ($gameTroop.troop().id == 891); }
  else {
    this._isFinalBattle = false;
  };
  this._isInBattle = $gameParty.inBattle();
  // Get Final Battle Phase
  this._finalBattlePhase = $gameVariables.value(1220);
  BattleManager._isFinalBattle = this._isFinalBattle;

};
//=============================================================================
// * Load Reserved Bitmaps
//=============================================================================
Scene_Gameover.prototype.loadReservedBitmaps = function() {
  ImageManager.reserveSystem('GameOverBG', 0, this._imageReservationId);
  ImageManager.reserveSystem('GameOverText', 0, this._imageReservationId);
  ImageManager.reservePicture('name_input', 0, this._imageReservationId);
};
//=============================================================================
// * Create
//=============================================================================
Scene_Gameover.prototype.create = function() {
  // Super Call
  Scene_Base.prototype.create.call(this);
  this.playGameoverMusic();
  this.createBackground();
  this.createRetryWindows();
};

Yanfly.Core.Scene_Gameover_start = function() {
    Scene_Base.prototype.start.call(this);
    this.startFadeIn(this.slowFadeSpeed()*6, false);
}
//=============================================================================
// * Create Background
//=============================================================================
Scene_Gameover.prototype.createBackground = function() {
  // Create Backsprite
  this._backSprite = new Sprite();
  this._backSprite.bitmap = new Bitmap(Graphics.boxWidth, Graphics.boxHeight)//ImageManager.loadSystem('GameOverBG');
  this._backSprite.bitmap.fillAll("black");
  this.addChild(this._backSprite);
  // Create Game Over Text
  let bitmap = ImageManager.loadSystem('GameOverText');
  this._textSprite = new Sprite(bitmap);
  this._textSprite.x = (Graphics.width - bitmap.width) / 2;
  this._textSprite.baseY = Math.ceil((Graphics.height - bitmap.height) / 2.5)
  this._textSprite.y = this._textSprite.baseY;
  this.addChild(this._textSprite);

  // Create Omori Sprite
  bitmap = ImageManager.loadPicture('name_input');
  this._omoriSprite = new Sprite(bitmap);
  this._omoriSprite.x = (Graphics.width - bitmap.width) / 2;
  this._omoriSprite.y = ((Graphics.height - this._omoriSprite.width) / 2) + 74;
  this._omoriSprite.opacity = 0;
  this.addChild(this._omoriSprite);
};
//=============================================================================
// * Create Retry Windows
//=============================================================================
Scene_Gameover.prototype.createRetryWindows = function() {
  // Initialize Retry Windows Array
  this._retryWindows = [];
  // List of text
  let text = [LanguageManager.getMessageData("XX_SYSTEM.message_10").text, LanguageManager.getMessageData("XX_SYSTEM.message_11").text];
  // Go Through Text
  for (let i = 0; i < text.length; i++) {
    let win = new Window_Base(0, 0, 0, 0);
    win.standardPadding = function() { return 4; };
    win.initialize(0, 0, win.contents.measureTextWidth(text[i]) + win.standardPadding() * 4, 32)
    win.contents.fontSize = 26;

    win.x = Math.floor(Graphics.boxWidth / 2.6) + i * 100
    win.y = 380;
    win.drawOpacity = 0;
    win.opacity = 0;
    win.textToDraw = text[i];
    win.update = function(animPhase) {
      if (animPhase == 2) {
        if(!this.parent._retryQuestion.isTextComplete()) {return;}
        if (this.drawOpacity < 255) {
          this.contents.clear();
          this.drawOpacity += 2;
          this.opacity += 2;
          this.contents.paintOpacity = this.drawOpacity;
          win.contents.drawText(this.textToDraw, 0, -4, this.contents.width, this.contents.height, 'center');
        }
      } else if (animPhase == 4) {
        this.contents.clear();
        this.drawOpacity -= 4;
        this.opacity -= 4;
        this.contents.paintOpacity = this.drawOpacity;
        win.contents.drawText(this.textToDraw, 0, -4, this.contents.width, this.contents.height, 'center');
      }
    };
    this._retryWindows.push(win);
    this.addChild(win);
  };
  // Set Max Input
  this._inputData.max = text.length;
  // Create Retry Cursor Sprite
  this._retryCursorSprite = new Sprite_WindowCustomCursor(undefined, 'cursor_menu');
  this._retryCursorSprite.opacity = 0;
  this.addChild(this._retryCursorSprite);
};
//=============================================================================
// * Frame Update
//=============================================================================
Scene_Gameover.prototype.update = function() {
  // Frame Update
  Scene_Base.prototype.update.call(this);

  this.updateTransitionAnimation();
  this.updateTextPosition();
  this.updateRetryInput();
};
//=============================================================================
// * Update Transition Animation
//=============================================================================
Scene_Gameover.prototype.updateTransitionAnimation = function() {
  // Get Animation Data
  let anim = this._animData;
  // If Animation is active
  if (anim.active) {
    // If Animation has Delay
    if (anim.delay > 0) {
      // Reduce Delay
      anim.delay--
      return;
    };
    // Animation Phase Switch Case
    switch (anim.phase) {
      case 0: // Initial Delay
        anim.phase = 1;
          anim.delay = 80;
        if (this._isFinalBattle && this._finalBattlePhase >= 5) {
          AudioManager.playMe({name: 'xx_gameover_piano', volume: 100, pitch: 100, pan:0});
          //AudioManager.playCurrentBGMOnce();

          anim.delay = 500;

        } else if (!this._isFinalBattle) {
          AudioManager.playMe({name: 'xx_gameover', volume: 100, pitch: 100, pan:0});
          //AudioManager.playCurrentBGMOnce();

        }
        break;
      case 1: // Move Up
      if (this._isFinalBattle  && this._finalBattlePhase >= 5) {
        let centerY = ((Graphics.height - this._omoriSprite.width) / 2) + 74;
        let speed = 1;

        if(!this._textModeSettings.waiter) {
          this._textModeSettings.waiter = true;
          anim.delay = 60;
          return;
        }

        if(this._textSprite.opacity > 0) {
          this._textSprite.opacity = Math.max(this._textSprite.opacity - speed, 0);
          this._backSprite.opacity -= 16;
        }
        else {
          if(!this._textSprite.hasMadeDelay) {
            anim.delay = 250;
            this._textSprite.active = false;
            this._textSprite.hasMadeDelay = true;
            return;
          }
          this._omoriSprite.opacity += 10;
        }

        if (this._omoriSprite.opacity >= 255) {
          anim.phase = 2;
        }
      } else {
        if(!this._isInBattle) {
          anim.delay = 400;
          anim.phase = 7
        }
        else {anim.phase = 2;}
      }
        break;
        case 2:
            this._retryWindows[0].update(anim.phase);
            this._retryWindows[1].update(anim.phase);
            if (this._retryWindows[0].opacity >= 255) {
              this._retryCursorSprite.opacity = 255;
              this.updateRetryInputCursorPosition(0);
              anim.phase = 3;
              this._inputData.active = true;
            }
          break;
        case 4:
          this._retryWindows[0].update(anim.phase);
          this._retryWindows[1].update(anim.phase);
          this._retryCursorSprite.opacity -= 4;
          this._textSprite.opacity -= 4;
          this._backSprite.opacity -= 4;
          if (this._isFinalBattle  && this._finalBattlePhase >= 5) {
            this._omoriSprite.opacity -= 4;
          }

          if (this._backSprite.opacity <= 0) {
			  anim.phase = 5;
			  this.removeAddedChildren();
              BattleManager.processRetry();
          }
          break;

        case 7:
          this._textSprite.opacity -= 2;
          this._backSprite.opacity -= 2;
          if (this._backSprite.opacity <= 0) {
            anim.phase = 8;
          }
          break;

        case 8: // Fadeout
          if (this._fadeDuration <= 0) {
            // Hide container, prevents popup
            this.visible = false;
            // If In Final Battle
            if (this._isFinalBattle) {
              // Restore Leader to prevent a game over loop
			  $gameParty.members()[0].recoverAll();
			  this.removeAddedChildren();
              // If In final battle return to map
              SceneManager.goto(Scene_Map);
              // Reset Animation Phase
              anim.phase = -1;
            } else {
				this.removeAddedChildren();
              // Go to the title screen
              SceneManager.goto(Scene_OmoriTitleScreen);
              anim.phase = -1;
            };
          };
        break;
    };
  };
};

Scene_Gameover.prototype.removeAddedChildren = function() {
	for (var i = 0; i > this._retryWindows.length; i++) {
	  this._retryWindows[i] = null;
	  this.removeChild(this._retryWindows[i]);
	}
	this.removeChild(this._backSprite);
	this.removeChild(this._textSprite);
	//this.removeChild(this._omoriSprite);
	this.removeChild(this._retryCursorSprite);
  }

//=============================================================================
// * Update Text Position
//=============================================================================
Scene_Gameover.prototype.updateTextPosition = function() {
  // Get Animation Settings
  let anim = this._textModeSettings;
  // If active
  if (anim.active) {
    // Decrease Delay
    anim.delay--;
    // If Animation delay is 0 or less
    if (anim.delay <= 0) {
      // Reset Animation Delay
      anim.delay = 30;
      // Get Base Y
      let baseY = this._textSprite.baseY;
      let spacing = 3;
      if (anim.direction === 0) {
        let bottomY = baseY + (spacing * 2);
        this._textSprite.y = Math.min(this._textSprite.y + spacing, bottomY);
        if (this._textSprite.y >= bottomY) {
          anim.direction = 1;
        };
      } else {
        this._textSprite.y = Math.max(this._textSprite.y - spacing, baseY);
        if (this._textSprite.y <= baseY) {
          anim.direction = 0;
        };
      };
    };
  };
};
//=============================================================================
// * Update Retry Input
//=============================================================================
Scene_Gameover.prototype.updateRetryInput = function() {
  // Get Input Data
  const input = this._inputData;

  // If Input is Active
  if (input.active) {
    // If Ok input is triggered
    if (Input.isTriggered('ok')) {
      // Play Load sound
      SoundManager.playLoad();
      // Get Animation Object
      const anim = this._animData;

      if (input.index === 0) {
        if (anim.phase == 3) {
          anim.phase = 4;
        };
      } else {
        anim.phase = 8;
        input.active = false;
        this.fadeOutAll()
        anim.delay = 70;
      }
      return;
    };

    if (Input.isRepeated('left')) {
      SoundManager.playCursor();
      input.index = Math.abs((input.index - 1) % input.max);
      this.updateRetryInputCursorPosition(input.index);
      return
    };
    if (Input.isRepeated('right')) {
      SoundManager.playCursor();
      input.index = (input.index + 1) % input.max;
      this.updateRetryInputCursorPosition(input.index);
      return
    };
  };
};
//=============================================================================
// * Update Retry Input Cursor Position
//=============================================================================
Scene_Gameover.prototype.updateRetryInputCursorPosition = function(index = 0) {
  // Get Window
  let win = this._retryWindows[index];
  // If Window Exists
  if (win) {
    this._retryCursorSprite.x = win.x - 35;
    this._retryCursorSprite.y = win.y + (win.height / 2);
  };
};



//=============================================================================
// ** Window_MapName
//-----------------------------------------------------------------------------
// The window for displaying the map name on the map screen.
//=============================================================================
// * Object Initialization
//=============================================================================
Window_MapName.prototype.initialize = function() {
  var wight = this.windowWidth();
  var height = this.windowHeight();
  Window_Base.prototype.initialize.call(this, 20, 20, wight, height);
  this.opacity = 0;
  this.contentsOpacity = 0;
  this._showCount = 0;
  this.refresh();
};
//=============================================================================
// * Settings
//=============================================================================
Window_MapName.prototype.standardPadding = function() { return 4; };
Window_MapName.prototype.windowWidth = function() { return Graphics.width; };
//=============================================================================
// * Update Fade In
//=============================================================================
Window_MapName.prototype.updateFadeIn = function() {
  this.contentsOpacity += 16;
  this.opacity += 16;
  this.x = Math.min(20, this.x + 10);
};
//=============================================================================
// * Update Fade Out
//=============================================================================
Window_MapName.prototype.updateFadeOut = function() {
  this.contentsOpacity -= 16;
  this.opacity -= 16;
};
//=============================================================================
// * Refresh
//=============================================================================
Window_MapName.prototype.refresh = function() {
  this.contents.clear();
  // Get Name
  var name = $gameMap.displayName();
  // If Name
  if (name) {
    var textWidth = this.textWidth(name);
    this.width = textWidth + 24;
    this.x = -this.width;
    var width = this.contentsWidth();
    this.drawText(name, 0, -4, width, 'center');
  } else {
    // Set Width to 0
    this.width = 0;
  };
};



//=============================================================================
// ** Object_Movement
//-----------------------------------------------------------------------------
// This class is used to move object values.
//=============================================================================
function Object_Movement() { this.initialize.apply(this, arguments); }
Object_Movement.prototype.constructor = Object_Movement;
//=============================================================================
// * Object Initialization
//=============================================================================
Object_Movement.prototype.initialize = function() {
  // Movement List
  this._list = [];
  // Remove List
  this._removeList = [];
  // Active Flag
  this._active = true;
};
//=============================================================================
// * Tweens
//=============================================================================
Object_Movement.linearTween = function (t, b, c, d) { return c*t/d + b; };
// decelerating to zero velocity
Object_Movement.easeOutCirc = function (t, b, c, d) {
  t /= d; t--;
  return c * Math.sqrt(1 - t*t) + b;
};
// accelerating from zero velocity
Object_Movement.easeInCirc = function (t, b, c, d) {
  t /= d;
  return -c * (Math.sqrt(1 - t*t) - 1) + b;
};
//=============================================================================
// * Clear
//=============================================================================
Object_Movement.prototype.clear = function() {
  // Clear Array
  this.list.splice(0, this.list.length)
};
//=============================================================================
// * Determine if there is any movement
//=============================================================================
Object_Movement.prototype.isMoving = function() { return this._list.length > 0; };
//=============================================================================
// * Activate & Deactivate
//=============================================================================
Object_Movement.prototype.activate   = function() { this._active = true; };
Object_Movement.prototype.deactivate = function() { this._active = false; };
//=============================================================================
// * Start Move
//=============================================================================
Object_Movement.prototype.startMove = function(data, uniq) {
  // Set Unique Flag to true
  if (uniq === undefined) { uniq = true; }
  // If Unique Flag is true
  if (uniq) { this.removeMoveWithObject(data.obj); }
  // If Data has durations for tweening
  if (data.durations || data.duration) {
    // Set Default Easing
    var defaultEasing = data.easing ? data.easing : Object_Movement.linearTween;
    // Initialize Times
    data.times = {};
    // Initialize Easings
    data.easings = data.easings || {};
    // Get Duration Keys
    var durations = Object.keys(data.durations);
    // Set Initial Times
    for (var i = 0; i < durations.length; i++) {
      // Get Property
      var p = durations[i];
      // Set Initial Time
      data.times[p] = 0
      // Adjust To coordinates
      data.to[p] = (data.to[p] - data.from[p]);
      if (!data.easings[p]) {
        data.easings[p] = defaultEasing;
      };
    };
  } else {
    // Initialize Easings
    data.easings = data.easings || {};
  };
  // Add Data to list
  this._list.push(data);
};
//=============================================================================
// * Remove Movement with Object
//=============================================================================
Object_Movement.prototype.removeMoveWithObject = function(obj) {
  // Remove Move With Object
  this._list = this._list.filter(function(data) {
    return data.obj !== obj;
  });
};
//=============================================================================
// * Remove Movement Object
//=============================================================================
Object_Movement.prototype.removeMove = function(data) {
  // Get Index
  var index = this._list.indexOf(data);
  // If Index is more than 0
  if (index >= 0) { this._list.splice(index, 1); }
};
//=============================================================================
// * Update Movement Object
//=============================================================================
Object_Movement.prototype.updateMove = function(data) {
  // Get Properties
  var properties = data.properties;
  // Get Object
  var obj = data.obj;
  // Finished Flag
  var finished = true;
  // Go Through Properties
  for (var i = 0; i < properties.length; i++) {
    // Get Property
    var p = properties[i]
    // Get Easing
    var easing = data.easings[p];
    // Get Target Value
    var t = data.to[p];
    // If Easing
    if (easing) {
      // If Target is the same as current value
      if (t === obj[p]) { continue; }
      // Get Time
      var time = data.times[p];
      // Get Duration
      var dur = data.durations[p];
      if (time <= dur) {
        // Increase Time
        data.times[p]++
        // Set Object Property
        obj[p] = easing(time, data.from[p], data.to[p], dur);
        // Set Finished flag to false
        finished = false;
      };
    } else {
      // Get Source
      var s = obj[p];
      // Get Speed
      var spd = data.speeds[p];
      if (t < s) { obj[p] = Math.max(t, s - spd); }
      if (t > s) { obj[p] = Math.min(t, s + spd); }
      // Set Finished Flag
      if (t !== s) { finished = false; }
    };
  };
  // If Finished
  if (finished) {
    // If Finished Function Exists
    if (data.onFinish) { data.onFinish(); };
    // Add to remove list
    this._removeList.push(data);
  };
};
//=============================================================================
// * Frame Update
//=============================================================================
Object_Movement.prototype.update = function() {
  // Go Through List
  for (var i = 0; i < this._list.length; i++) {
    this.updateMove(this._list[i]);
  };
  // If Remove List Length is more than 0
  if (this._removeList.length > 0) {
    // Go Through Remove List
    for (var i = 0; i < this._removeList.length; i++) {
      // Remove Move
      this.removeMove(this._removeList[i]);
    };
    // Clear Remove List
    this._removeList = []
  }
};










//=============================================================================
// ** Window_MessageFaceBox
//-----------------------------------------------------------------------------
// This window displays faces for the message window.
//=============================================================================
function Window_MessageFaceBox() { this.initialize.apply(this, arguments); }
Window_MessageFaceBox.prototype = Object.create(Window_Base.prototype);
Window_MessageFaceBox.prototype.constructor = Window_MessageFaceBox;
//=============================================================================
// * Initialize Object
//=============================================================================
Window_MessageFaceBox.prototype.initialize = function(index) {
  // Set Index
  this._index = index;
  // Clear
  this.clear();
  // Super Call
  Window_Base.prototype.initialize.call(this, 0, 0, this.windowWidth(), this.windowHeight());
  // Create Background
  this.createBackground();
};
//=============================================================================
// * Define Openness
//=============================================================================
Object.defineProperty(Window_MessageFaceBox.prototype, 'openness', {
  get: function() { return this._openness; },
  set: function(value) {
    // Super Call
    Object.getOwnPropertyDescriptor(Window.prototype, 'openness').set.call(this, value);
    // If Background Exists
    if (this._background) {
      this._background.scale.x = this._windowSpriteContainer.scale.x;
      this._background.scale.y = this._windowSpriteContainer.scale.y;
      this._background.x = this._windowSpriteContainer.x + 5;
      this._background.y = this._windowSpriteContainer.y + 5;
    };
  },
  configurable: true
});
//=============================================================================
// * Settings
//=============================================================================
Window_MessageFaceBox.prototype.standardPadding = function() { return 5; };
Window_MessageFaceBox.prototype.windowWidth = function() { return 114; };
Window_MessageFaceBox.prototype.windowHeight = function() { return 114; };
Window_MessageFaceBox.prototype.standardOpennessType = function() { return 2;};
//=============================================================================
// * Determine if Face is ready
//=============================================================================
Window_MessageFaceBox.prototype.isFaceReady = function() {
  if (this._faceBitmap) { return this._faceBitmap.isReady(); };
  return true;
};
//=============================================================================
// * Create Background Sprite
//=============================================================================
Window_MessageFaceBox.prototype.createBackground = function() {
  // Create Background Sprite
  this._background = new Sprite(new Bitmap(this.width - 10, this.height - 10));
  this._background.x = 5
  this._background.y = 5;
  this.addChildToBack(this._background);
};
//=============================================================================
// * Clear
//=============================================================================
Window_MessageFaceBox.prototype.clear = function() {
  // Set Face Bitmap
  this._faceBitmap = null;
  // Face Name
  this._faceName = "";
  // Face Index
  this._faceIndex = 0;
};
//=============================================================================
// * Set Background Color
//=============================================================================
Window_MessageFaceBox.prototype.setBackgroundColor = function(color = 'rgba(0, 0, 0, 0)') {
  // If Color
  if (color) {
    // Set Background Bitmap Color
    this._background.bitmap.fillAll(color);
  } else {
    // Clear Background Bitmap Color
    this._background.bitmap.clear();
  };
};
//=============================================================================
// * Setup
//=============================================================================
Window_MessageFaceBox.prototype.setup = function(faceName, faceIndex, color = null) {
  // Set Face Index
  this._faceIndex = faceIndex;
  // Set Face Name
  this._faceName = faceName;
  // Set Face Bitmap
  this._faceBitmap = ImageManager.loadFace(faceName);
  // Set Background Color
  this.setBackgroundColor(color);
};
//=============================================================================
// * Refresh
//=============================================================================
Window_MessageFaceBox.prototype.refresh = function() {
  // Clear Contents
  this.contents.clear();
  // If Face Name
  if (this._faceName) {
    // Draw Face
    this.drawFace(this._faceName, this._faceIndex, 0, 0, 106, 106);
  };
};

















































//=============================================================================
// ** Scene_AtlasMaker
//-----------------------------------------------------------------------------
// This scene is used to make atlas data
//=============================================================================
function Scene_AtlasMaker() { this.initialize.apply(this, arguments);}
Scene_AtlasMaker.prototype = Object.create(Scene_Base.prototype);
Scene_AtlasMaker.prototype.constructor = Scene_AtlasMaker;
//=============================================================================
// * Object Initialization
//=============================================================================
Scene_AtlasMaker.prototype.initialize = function() {
  // Super Call
  Scene_Base.prototype.initialize.call(this);
  this._sourceRectangle = new Rectangle(0, 0, 0, 0);
  this._destRectangle = new Rectangle(0, 0, 0, 0);
  this._atlasName = ""

  // Resize Window to Screen
  this.resizeWindowToScreen();

  this._fileInput = document.createElement('input');
  this._fileInput.accept = '.png'
  this._fileInput.type = 'file';

  this._fileInput.onchange = function() {
    this._atlasName = this._fileInput.value.replace(/^.*[\\\/]/, '').split('.')[0]
    this._atlasSprite.bitmap = ImageManager.loadAtlas(this._atlasName)
    this.showSource();
    // console.log(this.value)
  }.bind(this)

  // Get Atlas Load Button
  var button = AtlasMakerContainer._buttons.atlasLoadButton;
  button.onclick = function() { this._fileInput.click(); }.bind(this);

  // Get Source Rect Inputs
  var inputs = AtlasMakerContainer._sourceRectInputs;

  for (var i = 0; i < inputs.length; i++) {
    inputs[i].onchange = this.onSourceRectChange.bind(this, i);
  }

  // Get Source Rect Inputs
  var inputs = AtlasMakerContainer._rectInputs;
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].onchange = this.onDestRectChange.bind(this, i);
  }


  // Get Show Source Button
  var button = AtlasMakerContainer._buttons.showSource;
  button.onclick = this.showSource.bind(this)

  // Get Show Result Button
  var button = AtlasMakerContainer._buttons.showResult;
  button.onclick = this.showResult.bind(this)

  // Get Show Result Button
  var button = AtlasMakerContainer._buttons.generateYAML;
  button.onclick = this.makeYAML.bind(this)



  // Get Show Result Button
  var button = AtlasMakerContainer._buttons.copySize;
  button.onclick = function() {
    // Get Source Rect Inputs
    var sInputs = AtlasMakerContainer._sourceRectInputs;
    var rInputs = AtlasMakerContainer._rectInputs;

    rInputs[2].value = sInputs[2].value
    rInputs[3].value = sInputs[3].value
    this.onDestRectChange()
  }.bind(this);

  for (var i = 0; i < 4; i++) {
    // console.log(AtlasMakerContainer._buttons['step' + i])
    AtlasMakerContainer._buttons['step' + i].onclick = this.processStep.bind(this, i);
  }



  AtlasMakerContainer.show()

};
//=============================================================================
// * Resize Window to screen size
//=============================================================================
Scene_AtlasMaker.prototype.resizeWindowToScreen = function() {
  // Set Width & Height
  Yanfly.Param.ScreenWidth = window.screen.width
  Yanfly.Param.ScreenHeight = window.screen.height
  SceneManager._screenWidth  = Yanfly.Param.ScreenWidth;
  SceneManager._screenHeight = Yanfly.Param.ScreenHeight;
  // SceneManager._boxWidth     = Yanfly.Param.ScreenWidth;
  // SceneManager._boxHeight    = Yanfly.Param.ScreenHeight
  Yanfly.updateResolution();
  // Get Window X & Y Coordinates
  var x = (window.screen.width - Yanfly.Param.ScreenWidth) / 2
  var y = (window.screen.height - Yanfly.Param.ScreenHeight) / 2
  // Center Window
  window.moveTo(0, 0);



  Graphics.width = window.screen.width
  Graphics.height = window.screen.height

  Graphics._stretchEnabled = false;
  Graphics._updateAllElements

  this.x = 0;
  this.y = 32;
};
//=============================================================================
// * Create
//=============================================================================
Scene_AtlasMaker.prototype.create = function() {

  this._background = new Sprite(new Bitmap(Graphics.width, Graphics.height))
  this._background.bitmap.fillAll('rgba(255, 255, 255, 1)')
  this.addChild(this._background);


  // Create Atlas Container
  this._atlasContainer = new Sprite()
  this._atlasContainer.y = 100;
  this.addChild(this._atlasContainer)

  // Create Atlas Sprite
  this._atlasSprite = new Sprite();
  // this._atlasSprite.x = 100;
  // this._atlasSprite.y = 100
  // this._atlasSprite.scale.set(0.75, 0.75)
  this._atlasContainer.addChild(this._atlasSprite);
  this._atlasSprite.bitmap = ImageManager.loadAtlas('Faraway_PolaroidAtlas')


  this._atlasAreaSprite = new Sprite(new Bitmap(Graphics.width, Graphics.height));
  this._atlasAreaSprite.bitmap.fillAll('rgba(255, 0, 0, 0.5)')
  this._atlasSprite.addChild(this._atlasAreaSprite)



  this._resultBack = new Sprite(new Bitmap(Graphics.width, Graphics.height));
  this._resultBack.x = 25;
  this._resultBack.y = 25;
  this._resultBack.visible = false
  this._atlasContainer.addChild(this._resultBack)



  this._resultSprite = new Sprite();
  this._resultSprite.x = 25;
  this._resultSprite.y = 25;
  this._atlasContainer.addChild(this._resultSprite)



  this._cover = new Sprite(new Bitmap(Graphics.width, 100))
  this._cover.bitmap.fillAll('rgba(32, 32, 32, 1)')
  this.addChild(this._cover);



  // img/pictures/Faraway_FA_A_01.png:
  //   atlasName: FarawayAtlas_01
  //   rect: {x: 0, y: 0, width: 361, height: 437}
  //   sourceRect: {x: 0, y: 0, width: 361 , height: 437}

}
//=============================================================================
// * Frame Update
//=============================================================================
Scene_AtlasMaker.prototype.getAtlasFile = function() {

  // console.log(this._fileInput.value)
};
//=============================================================================
// * On Source Rect Change
//=============================================================================
Scene_AtlasMaker.prototype.onSourceRectChange = function(index) {
  // Get Source Rect Inputs
  var inputs = AtlasMakerContainer._sourceRectInputs;

  inputs[1].min = 0;
  inputs[1].max = this._atlasSprite.height


  // var maxWidth = ;
  // var maxHeight = this._atlasSprite.height

  this._sourceRectangle.x = inputs[0].value
  this._sourceRectangle.y = inputs[1].value
  this._sourceRectangle.width = inputs[2].value
  this._sourceRectangle.height = inputs[3].value


  this._atlasAreaSprite.setFrame(0, 0, this._sourceRectangle.width, this._sourceRectangle.height)
  this._atlasAreaSprite.x = this._sourceRectangle.x
  this._atlasAreaSprite.y = this._sourceRectangle.y

};
//=============================================================================
// * On Destination Rect Change
//=============================================================================
Scene_AtlasMaker.prototype.onDestRectChange = function() {
  // Get Source Rect Inputs
  var inputs = AtlasMakerContainer._rectInputs;

  this._destRectangle.x = inputs[0].value
  this._destRectangle.y = inputs[1].value
  this._destRectangle.width = inputs[2].value
  this._destRectangle.height = inputs[3].value
};
//=============================================================================
// * On Source Rect Change
//=============================================================================
Scene_AtlasMaker.prototype.showSource = function() {
  this._atlasSprite.x = 0
  this._atlasSprite.y = 0

  this._atlasSprite.visible = true;
  this._atlasAreaSprite.visible = true;
  this._resultSprite.visible = false
  this._resultBack.visible = false

};

//=============================================================================
// * On Source Rect Change
//=============================================================================
Scene_AtlasMaker.prototype.showResult = function() {
  this._atlasSprite.visible = false;
  this._atlasAreaSprite.visible = false;
  this._resultSprite.visible = true
  this._resultBack.visible = true

  var dRect = this._destRectangle;
  var sRect = this._sourceRectangle

  var srcBitmap = this._atlasSprite.bitmap;
  var bitmap = new Bitmap(dRect.width, dRect.height);

  bitmap.blt(srcBitmap, sRect.x, sRect.y, sRect.width, sRect.height, dRect.x, dRect.y);


  this._resultBack.bitmap.clear();
  this._resultBack.bitmap.fillRect(0, 0, bitmap.width, bitmap.height, 'rgba(32, 32, 32, 0.1)')

  this._resultSprite.bitmap = bitmap;
};
//=============================================================================
// * Process Step
//=============================================================================
Scene_AtlasMaker.prototype.processStep = function(index) {
  // Get Source Rect Inputs
  var inputs = AtlasMakerContainer._sourceRectInputs;

  var width = Number(inputs[2].value);
  var height = Number(inputs[3].value);

  switch (index) {
    case 0: // Up
      inputs[1].value = (Number(inputs[1].value) - height);
      break;
    case 1: // Down
      inputs[1].value = (Number(inputs[1].value) + height);
      break
    case 2: // Left
      inputs[0].value = (Number(inputs[0].value) - width);
      break
    case 3: // Right
      inputs[0].value = (Number(inputs[0].value) + width);
    break
  }
  this.onSourceRectChange();

};
//=============================================================================
// * Process Step
//=============================================================================
Scene_AtlasMaker.prototype.makeYAML = function() {
  var dRect = this._destRectangle;
  var sRect = this._sourceRectangle
  var text = `
  img/FOLDER/FILENAME.png:
    atlasName: ${this._atlasName}
    rect: {x: ${dRect.x}, y: ${dRect.y}, width: ${dRect.width}, height: ${dRect.height}}
    sourceRect: {x: ${sRect.x}, y: ${sRect.y}, width: ${sRect.width}, height: ${sRect.height}}
  `
  Graphics._passStringToClipboard(text)

  alert('YAML GENERATED! CHECK CLIPBOARD!')
};
//=============================================================================
// * Frame Update
//=============================================================================
Scene_AtlasMaker.prototype.update = function() {
  // Run Original Function
  Scene_Base.prototype.update.call(this);


  if (Input.isRepeated('up')) {

    this._atlasSprite.y -= (this._atlasSprite.height * 0.1)

    if (this._atlasSprite.y < -this._atlasSprite.height) { this._atlasSprite.y = -this._atlasSprite.height}
  };


  if (Input.isRepeated('down')) {

    this._atlasSprite.y += (this._atlasSprite.height * 0.1)
    if (this._atlasSprite.y > 0) { this._atlasSprite.y = 0}

  };


}























//=============================================================================
// ** AtlasMakerContainer
//----------------------------------------------------------------------------------------------
//  The static class that handles Atlas settings
//=============================================================================
function AtlasMakerContainer() { throw new Error('This is a static class'); }
//=============================================================================
// * Initialize
//=============================================================================
AtlasMakerContainer.initialize = function() {
  // Set Visibility
  this._visible = false;
  // Create Container
  this.createContainer();


  this.container.appendChild(this.createTextNode('ATLAS CONTROLS:', 5, 0));
  this.container.appendChild(this.createTextNode('SOURCE RECT: (X, Y, WIDTH, HEIGHT)', 300, 0));
  this.container.appendChild(this.createTextNode('RECT: (X, Y, WIDTH, HEIGHT)', 650, 0));

  this._sourceRectInputs = [];
  this._rectInputs = []

  for (var i = 0; i < 4; i++) {
    var numberInput = document.createElement("INPUT");
    numberInput.type = "number";
    numberInput.defaultValue = 0;
    numberInput.style.position = 'absolute';
    numberInput.style.left = (300 + (i * 70)) + 'px';
    numberInput.style.top = '30px';
    numberInput.style.width = '60px'
    this._sourceRectInputs[i] = numberInput
    this.container.appendChild(numberInput);

    var numberInput = document.createElement("INPUT");
    numberInput.type = "number";
    numberInput.defaultValue = 0;
    numberInput.style.position = 'absolute';
    numberInput.style.left = (650 + (i * 70)) + 'px';
    numberInput.style.top = '30px';
    numberInput.style.width = '60px'
    this._rectInputs[i] = numberInput
    this.container.appendChild(numberInput);
  }



  // Initialize Buttons Object
  this._buttons = {}


  var button = document.createElement("BUTTON");
  button.innerHTML = 'Load ATLAS IMAGE'
  button.style.position = 'absolute';
  button.style.left = '0px';
  button.style.top = '30px';
  this._buttons.atlasLoadButton = button;
  this.container.appendChild(button);


  var button = document.createElement("BUTTON");
  button.innerHTML = 'GENERATE YAML'
  button.style.position = 'absolute';
  button.style.left = '150px';
  button.style.top = '30px';
  this._buttons.generateYAML = button;
  this.container.appendChild(button);

  var button = document.createElement("BUTTON");
  button.innerHTML = 'SHOW SOURCE'
  button.style.position = 'absolute';
  button.style.left = '0px';
  button.style.top = '60px';
  this._buttons.showSource = button;
  this.container.appendChild(button);


  var button = document.createElement("BUTTON");
  button.innerHTML = 'SHOW RESULT'
  button.style.position = 'absolute';
  button.style.left = '130px';
  button.style.top = '60px';
  this._buttons.showResult = button;
  this.container.appendChild(button);



  var button = document.createElement("BUTTON");
  button.innerHTML = 'COPY SIZE'
  button.style.position = 'absolute';
  button.style.left = '650px';
  button.style.top = '60px';
  this._buttons.copySize = button;
  this.container.appendChild(button);



  var steps = ['↑', '↓', '←', '→']

  for (var i = 0; i < 4; i++) {
    var button = document.createElement("BUTTON");
    button.innerHTML = 'STEP ' + steps[i]
    button.style.position = 'absolute';
    button.style.left = (300 + (i * 70)) + 'px';
    button.style.top = '60px';
    this._buttons['step' + i] = button
    this.container.appendChild(button);
  }



  // // Create Text Node
  // var node = document.createElement('p');
  // node.innerHTML = text;
  // node.style.position = 'absolute';
  // node.style.margin = "0px";
  // node.style.left = x + 'px';
  // node.style.top = y + 'px';
  // // node.style.textShadow = '1px 1px 0 rgba(0,0,0,0.5)';
  // node.style.color = 'white';
  // node.style.fontSize = '16px';
  // node.style.fontWeight = 'bold';
};
//=============================================================================
// * Determine if Visible
//=============================================================================
AtlasMakerContainer.isVisible = function() { return this._visible };
//=============================================================================
// * Show
//=============================================================================
AtlasMakerContainer.show = function(toggle = true) {
  if (this._visible && toggle) {
    this.hide();
  } else {
    this._visible = true;
    this.container.style.top = '5px';
    this.container.style.opacity = 1;
  };
};
//=============================================================================
// * Hide
//=============================================================================
AtlasMakerContainer.hide = function() {
  this._visible = false;
  this.container.style.top = '-' + this.container.style.height;
  this.container.style.opacity = 0;
};
//=============================================================================
// * Create Container
//=============================================================================
AtlasMakerContainer.createContainer = function() {
  this.container = document.createElement('div');

  this.container.id = 'atlasControl';
  this.container.style.position = 'absolute';
  this.container.style.left = '5px';
  this.container.style.top = '-140px';
  this.container.style.width = (Graphics.width - 10) + 'px';
  this.container.style.height = '100px';
  // this.container.style.background = this.backColor();
  this.container.style.opacity = 0;
  this.container.style.zIndex = 10;
  this.container.style.transition = "top .5s, opacity .5s";

//  this.container.style.margin = 'auto';

  this.container.style.width = 'auto';
  this.container.style.right = '5px';


//position: absolute; left: 90px; right: 100px; width: auto;

  document.body.appendChild(this.container);
};
//=============================================================================
// * Create Text Node
//=============================================================================
AtlasMakerContainer.createTextNode = function(text = '', x, y) {
  // Create Text Node
  var node = document.createElement('p');
  node.innerHTML = text;
  node.style.position = 'absolute';
  node.style.margin = "0px";
  node.style.left = x + 'px';
  node.style.top = y + 'px';
  // node.style.textShadow = '1px 1px 0 rgba(0,0,0,0.5)';
  node.style.color = 'white';
  node.style.fontSize = '16px';
  node.style.fontWeight = 'bold';
  // Return Node
  return node;
};
//=============================================================================
// * Frame Update
//=============================================================================
AtlasMakerContainer.update = function() { };













var textToClipboard_createAllElements = Graphics._createAllElements
//=============================================================================
// * Create All Elements
//=============================================================================
Graphics._createAllElements = function() {
  // Create Cliboard Text
  this._createClipboardText();
  // Run Original Function
  textToClipboard_createAllElements.call(this);



  // "Tetas calientes que nunca se acaban\n\rY continan para siempre!"



  // Graphics._passStringToClipboard("'Did you ever hear the Tragedy of Darth Plagueis the wise? I thought not. It's not a story the Jedi would tell you. It's a Sith legend. Darth Plagueis was a Dark Lord of the Sith, so powerful and so wise he could use the Force to influence the midichlorians to create life... He had such a knowledge of the dark side that he could even keep the ones he cared about from dying. The dark side of the Force is a pathway to many abilities some consider to be unnatural. He became so powerful... the only thing he was afraid of was losing his power, which eventually, of course, he did. Unfortunately, he taught his apprentice everything he knew, then his apprentice killed him in his sleep. It's ironic he could save others from death, but not himself.'")


  AtlasMakerContainer.initialize()

  // Graphics._passStringToClipboard("Y̶̨̧̡̧̲͚̦͇̘̮̰̥̠̯̗͉͉͇̳̻̲̩̭̺̺̰̼͖̼̥̗̗̲̺̰̗̩͈̏͌̉͘͝Ờ̶̡̡̨̨̧̱͙͓̲̯͍͚̼̪̙̳̼͇̜̩̞͔̮̮̮̜̘̎̊̄̿̿̑̐̈̅͊̓́͌͑͆͋̑͌͑̆̈́͊̐̈̈́́́̿͒̀̚̕̕͘̚̚̕͜͜͝͠ͅƯ̸̢̧̧̻̹͓͉͓͉̹̜̰̠͈̰͙̫̺̥̬̭͖̪̺͇̥͉̠͇͓͙͙̲͈̲̥̦̲̱̤̏͆͂̏̿͊̿̓̓͜ͅͅ ̴̨̨̨̤̮͔̳͕̻̙̙̜̠̺͚̟̲̜͙͙̹͔͚͇̲͉͇̯̮̝̜͙̱͓̫͓̝̯̯̩͖̱̓͐̄͜͜L̴̩͍̜̗̥̝̠͍̳͂͘͜͜E̴̡̢̖̲̠͙͖̞̮̺̟̤͙̬̰͕̼͇͔̥̱̰͙͉̖̤̲̮̮̟̘̙͕̽͊́̀̉̔͠ͅF̷̨̡̡̛̭̤̺̻̖̮̥̩̩̗̤̖̼̽̓̈́̿͐̃͗̿̾͛̑̔͒̒͒͐͒̈̅͆̈́͊̂̔̒͑̌̆̑̇̂̚̚͘̚͜͝ͅŢ̵̬̟͎̙̱̱̞̝̹̹̹͍͓͇̝̦̥͕̈́̅͂͊̃̇͐̃͒͋̓̈́͊̒̇̓͒̅̏̊̉̈́̐̈́́̉̈́́̓̋́̊̕͝ͅ ̴̡̧̧̨̛̥̯̣̹̙̩̜̱̣̜̱̱̻̪̘͔͎̤͇͖̠̝͙͕͈̯̭̟̞͖̤͖̭̫̲̼̀̄̒̇̑̓̓̈́̊̓͊̾̿̾͌͂̊̎̌̍̐̀̀̑̔̈̋̊̕̕͘͝͝͝͠͠ͅḾ̷̛͖̮̞̠̪͔̳̲͕̯͈͇̤͇̩̹̥̻̭̰̞͓̮̫̓͒͛̆̄̓̾̏̔̌́̔̐̽̓͆̅̇̂͋̃̆̇̏̅̓̀͂̔͋̌͗͗̀̉͘̚̕̕͠͝Ę̸̧̨̢̢̛͉̤͍͎͈̰̫̙̞̣̩͎͖̠̘̳̖͖̣̠̜̬̺̥̙͚̞͔̟̲̮̲̤̄̊̌̈̆̉́̈́̊̾͌͂̋̆͂͋̐̔̉̍͗̒͋̿̅̋̎̇̎̃͂̔͌͒͆͘̕̚͜͝͝͝͝ͅ ̵̛͉̣̳̰̎͋̐͂͂̀͗̀́̒̌͛̀̂̀͌̀̈́́̆̄̈́̆͐̈́̋̉̀̔̔̕͘̚͝͝͠T̸̨̛͖̥͕̲̘͕͖͉͚̝̤͚̲̘͕̲̗̟͈͇̙̠̥̩̼̬̳̬͍̉̽̒͗̂̅͗̾͗̈́̎͜͜ͅỚ̴̲͉̥͍̘͕̹̙̖͙̳̬̜̝̬̜̣̗̻̥̞̠̮͋͌́̅͑̊̕͜ͅͅ ̵̢̪̱̪̤̯͇͖͆́̍̌̏͑̋͑̉̎̌̾͊͌̍̀́͆̍͂̈́͠͠D̸̡̧̡̢̨̲͍̝̟͖̙̹̬͓̘͉̹͈̥͔̝͍̞̘̮͍̳͖̟̼̞̝̝͚̮̏̿͗̀͊͊I̷̡̨̢̢̡̢̛̼̺͚̺͇͙͍̙̳͇͇̠͕̜̪̙̜̰̼͈̞̺͓̪̣̼̬̭̝̟̻͚̱̮̻̓͐̈́̌̆̋́̀͆̍͑̾͋̓̈́͜͜͝͠ͅE̵͔͉̠̪͕̥͋̑̊͒̋̈́̽̆̾̚͜͜͠͝ͅ!̸̨̨̹̩̦͖̗̮͚̬̺̱̣̙͓̲̞͇̹͔͗̔̈́̅̈́͆͑͜͜͝͝!̸̛̛̛̜̟̟͍̹̰͓̈́̅͒͋̊̈́̂͂͑̓̐̆͂̎́̓̐͌͐̾̿̌̒̋͊̑̕̚͘͝͝͠͠͝!̵̨̛̱̙̗͖̰̺̣̣̗͍̘̦͙̭̙̲͖̻̬͙̟͔͇̟̞̬̾̊̅̉̈́̌̐̂͊̊͌͒̿̉͒̒̿̍͗͂̉͌͘̕͜͜ͅ")
};
//=============================================================================
// * Create Clipboard Text Element
//=============================================================================
Graphics._createClipboardText = function() {
  // Create Input Element
  this._clipboardText = document.createElement('TEXTAREA');
  this._clipboardText.setAttribute("type", "text");
  this._clipboardText.id = 'ClipboardTest';
  document.body.appendChild(this._clipboardText);
}
//=============================================================================
// * Pass String to Clipboard
//=============================================================================
Graphics._passStringToClipboard = function(text) {
  this._clipboardText.value = text
  this._clipboardText.select();
  document.execCommand("copy");
  this._clipboardText.value = "";
}




function Scene_Blank() { this.initialize.apply(this, arguments);}
Scene_Blank.prototype = Object.create(Scene_Base.prototype);
Scene_Blank.prototype.constructor = Scene_Blank;

Scene_Blank.prototype.initialize = function() {
  Scene_Base.prototype.initialize.call(this);
  this.move = new Object_Movement();
};


Scene_Blank.prototype.prepareGraphics = function() {
  for (var i = 1; i < 49; i++) {
   ImageManager.loadPicture('Albums/Faraway/FA_A_' + i.padZero(2))
  }

  for (var i = 1; i < 7; i++) {
   ImageManager.loadPicture('Albums/Faraway/faraway_pg' + i)
  }

};


Scene_Blank.prototype.create = function() {
  Scene_Base.prototype.create.call(this);


//  this._testWindow = new Window_CommandTest()
  this._testWindow = new Window_OmoMenuHelp()
  this.addChild(this._testWindow)


  var bitmap = ImageManager.loadPicture('Albums/Faraway/faraway_pg1')

  var bltBitmap = new Bitmap(454, 320);
  bltBitmap.fillAll('rgba(255, 0, 0, 0.5)')
  bltBitmap.blt(bitmap, 0, 0, 454, 320, 0, 0)
  this._testSprite = new Sprite(bltBitmap)
  this.addChild(this._testSprite)


  this._placingSprite = new Sprite(bitmap);
  this._placingSprite.x = 454
  this.addChild(this._placingSprite);

};


Scene_Blank.prototype.update = function() {
  Scene_Base.prototype.update.call(this);
  // Update Move
  this.move.update();
  if (Input.isTriggered('control')) {


    var win = this._testWindow
    var data = {
      obj: win,
      properties: ['x', 'y'],
      from: {x: win.x, y: win.y, width: win.width, height: win.height },
      to: { x: 0, y: 0, width: Graphics.width, height: Graphics.height},
      durations: {x: 30, y: 30, width: 30, height: 30},
    };

    // data.onFinish = function() {
    //   alert('tits')
    // }
    // data.to.contentsOpacity = Math.randomInt(255);
    data.to.x = Math.randomInt(Graphics.width - this._testWindow.width);
    data.to.y = Math.randomInt(Graphics.height - this._testWindow.height);


    this.move.startMove(data);

    // this._testWindow.setCursorAll(!this._testWindow.cursorAll());
    // this._testWindow.updateCursor();
  }
};




//-----------------------------------------------------------------------------
// Window_CommandTest
//
// The window for selecting an actor's action on the battle screen.

function Window_CommandTest() { this.initialize.apply(this, arguments); }
Window_CommandTest.prototype = Object.create(Window_Command.prototype);
Window_CommandTest.prototype.constructor = Window_CommandTest;

Window_CommandTest.prototype.initialize = function() {
  Window_Command.prototype.initialize.call(this, 100, 100);
  this.openness = 255;
  this.activate()
};

Window_CommandTest.prototype.windowWidth = function() { return 350; };
Window_CommandTest.prototype.numVisibleRows = function() { return 4; };
Window_CommandTest.prototype.isUsingCustomCursorRectSprite = function() { return true; };

Window_CommandTest.prototype.maxCols = function() { return 2; };
Window_CommandTest.prototype.spacing = function() { return 24; };

Window_CommandTest.prototype.makeCommandList = function() {

  for (var i = 0; i < 20; i++) {
    this.addCommand('Tiddies ' + i, 'ok');
  };

};

// Window_CommandTest.prototype.textPadding = function() {
//   return 24;
// };

Window_CommandTest.prototype.drawItem = function(index) {
  var rect = this.itemRect(index);
  this.contents.fillRect(rect.x, rect.y, rect.width, rect.height - 1, 'rgba(255, 0, 0, 0.8)')

  var rect = this.itemRectForText(index);
  this.contents.fillRect(rect.x, rect.y, rect.width, rect.height - 1, 'rgba(0, 255, 0, 0.8)')

  Window_Command.prototype.drawItem.call(this, index);
}


















//=============================================================================
// ** Spriteset_Map
//-----------------------------------------------------------------------------
// The set of sprites on the map screen.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriBASE.Spriteset_Map_createScreenSprites = Spriteset_Map.prototype.createScreenSprites;
_TDS_.OmoriBASE.Spriteset_Map_update = Spriteset_Map.prototype.update;
//=============================================================================
// * Create Screen Sprites
//=============================================================================
Spriteset_Map.prototype.createScreenSprites = function() {
  // Create Light Ambien Overlay Sprite
  this.createLightAmbienceOverlaySprite();
  // Run Original Function
  _TDS_.OmoriBASE.Spriteset_Map_createScreenSprites.call(this);
};
//=============================================================================
// * Frame Update
//=============================================================================
Spriteset_Map.prototype.update = function() {
  // Run Original Function
  _TDS_.OmoriBASE.Spriteset_Map_update.call(this);
  // Update Light Ambience Overlay
  this.updateLightAmbienceOverlay()
};
//=============================================================================
// * Create Light Ambience Overlay Sprite
//=============================================================================
Spriteset_Map.prototype.createLightAmbienceOverlaySprite = function() {
  // Create Ambience Light Overlay Sprite
  this._ambienceLightOverlaySprite = new Sprite();
  this._ambienceLightOverlaySprite.anchor.set(0.5, 0.5)
  this.addChild(this._ambienceLightOverlaySprite);
  // Create Padding Sprite
  this._ambienceLightPadding1Sprite = new Sprite()
  this._ambienceLightPadding1Sprite.anchor.set(0.5, 2)
  this._ambienceLightOverlaySprite.addChild(this._ambienceLightPadding1Sprite);
  // Create Padding Sprite
  this._ambienceLightPadding2Sprite = new Sprite()
  this._ambienceLightPadding2Sprite.anchor.set(-1, 0.5)
  this._ambienceLightOverlaySprite.addChild(this._ambienceLightPadding2Sprite);
  // Get Ambience Data
  var data = $gamePlayer._ambienceData;
  // If data has name
  if (data.name) {
    // Setup Ambience Bitmap
    this.setupAmbienceBitmaps(data.name);
  };
};
//=============================================================================
// * Setup Ambience Bitmaps
//=============================================================================
Spriteset_Map.prototype.setupAmbienceBitmaps = function(name) {
  if (name) {
    // Set Ambience Bitmap
    this._ambienceLightOverlaySprite.bitmap =  ImageManager.loadPicture(name);
    // Get Color
    var color = 'rgba(0, 0, 0, 1)';
    // Set Padding Bitmaps
    this._ambienceLightPadding1Sprite.bitmap = new Bitmap(Graphics.width, Graphics.height / 2)
    this._ambienceLightPadding1Sprite.bitmap.fillAll(color)
    this._ambienceLightPadding2Sprite.bitmap = new Bitmap(Graphics.width / 2, Graphics.height * 2)
    this._ambienceLightPadding2Sprite.bitmap.fillAll(color)
  } else {
    // Clear Ambience Bitmaps
    this._ambienceLightOverlaySprite.bitmap = null;
    this._ambienceLightPadding1Sprite.bitmap = null;
    this._ambienceLightPadding2Sprite.bitmap = null;
  };
};
//=============================================================================
// * Hide or Show Ambience Overlay
//=============================================================================
Spriteset_Map.prototype.hideLightAmbienceOverlay = function() { this._ambienceLightOverlaySprite.visible = false; };
Spriteset_Map.prototype.showLightAmbienceOverlay = function() { this._ambienceLightOverlaySprite.visible = true; };
//=============================================================================
// * Update the Light Ambience Overlay
//=============================================================================
Spriteset_Map.prototype.updateLightAmbienceOverlay = function() {
  // If Ambience Light Overlay has a bitmap
  if (this._ambienceLightOverlaySprite.bitmap) {
    // Set The ambience overlay sprite x & y coordinates
    this._ambienceLightOverlaySprite.x = $gamePlayer.ambienceScreenX();
    this._ambienceLightOverlaySprite.y = $gamePlayer.ambienceScreenY();
    this._ambienceLightOverlaySprite.opacity = $gamePlayer._ambienceData.opacity;
    // Adjust padding sprites positions
    this._ambienceLightPadding1Sprite.anchor.y = this._ambienceLightOverlaySprite.y >= 240 ? 2 : -1;
    this._ambienceLightPadding2Sprite.anchor.x = this._ambienceLightOverlaySprite.x >= 320 ? 2 : -1;
  };
};


//=============================================================================
// * LOCALIZATION BASE ADDITION
//=============================================================================

(function() {

  Window_Base.prototype.processDrawIcon = function(iconIndex, textState) {
    const offset_data = LanguageManager.getMessageData("XX_BLUE.Window_Base").processDrawIconOffset
    this.drawIcon(iconIndex, textState.x + 2 + offset_data[0], textState.y + 2 + offset_data[1]);
    textState.x += Window_Base._iconWidth + 4;
  };

})();

