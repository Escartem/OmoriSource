//=============================================================================
// TDS Omori BlackLetter Map
// Version: 1.5
//=============================================================================
// Add to Imported List
var Imported = Imported || {} ; Imported.TDS_OmoriBlackLetterMap = true;
// Initialize Alias Object
var _TDS_ = _TDS_ || {} ; _TDS_.OmoriBlackLetterMap = _TDS_.OmoriBlackLetterMap || {};
//=============================================================================
 /*:
 * @plugindesc
 * This plugin shows the Omori Black Letter map.
 *
 * @author TDS
 *
 */
//=============================================================================





// ImageManager.loadSystem('blackletter_bg');
// ImageManager.loadSystem('blackLetter_map_atlas');

//=============================================================================
// ** Input
//-----------------------------------------------------------------------------
// The static class that handles input data from the keyboard and gamepads.
//=============================================================================
// * Key Mapper Keys
//=============================================================================
// Input.keyMapper['81'] = 'q';



// //=============================================================================
// // ** Scene_Map
// //-----------------------------------------------------------------------------
// // The scene class of the map screen.
// //=============================================================================
// // Alias Listing
// //=============================================================================
// _TDS_.OmoriBlackLetterMap.Scene_Map_updateScene = Scene_Map.prototype.updateScene;
// //=============================================================================
// // * Update Scene
// //=============================================================================
// Scene_Map.prototype.updateScene = function() {
//   // Run Original Function
//   _TDS_.OmoriBlackLetterMap.Scene_Map_updateScene.call(this);
//   if (!SceneManager.isSceneChanging()) {
//     this.updateCallBlackLetterMap();
//   };
// };
// //=============================================================================
// // * Update Call Black Letter Map
// //=============================================================================
// Scene_Map.prototype.updateCallBlackLetterMap = function() {
//   // If Q Is triggered
//   if (Input.isTriggered('pageup')) {
//     // If Disable switch is off
//     if (!$gameSwitches.value(18)) {
//       // Go to Black Letter Map Scene
//       SceneManager.push(Scene_OmoriBlackLetterMap);
//     };
//   };
// };

_TDS_.OmoriBlackLetterMap.Scene_Map_needsFadeIn = Scene_Map.prototype.needsFadeIn;
Scene_Map.prototype.needsFadeIn = function() {
  return  (_TDS_.OmoriBlackLetterMap.Scene_Map_needsFadeIn.call(this) || SceneManager.isPreviousScene(Scene_OmoriBlackLetterMap));
};

//=============================================================================
// ** Scene_OmoriBlackLetterMap
//-----------------------------------------------------------------------------
// This scene shows the Black Letter map
//=============================================================================
function Scene_OmoriBlackLetterMap() { this.initialize.apply(this, arguments);}
Scene_OmoriBlackLetterMap.prototype = Object.create(Scene_Base.prototype);
Scene_OmoriBlackLetterMap.prototype.constructor = Scene_OmoriBlackLetterMap;
//=============================================================================
// * Object Initialization
//=============================================================================
Scene_OmoriBlackLetterMap.prototype.initialize = function() {
  // Super Call
  Scene_Base.prototype.initialize.call(this);
};
//=============================================================================
// * Initialize Atlas Lists
//=============================================================================
Scene_OmoriBlackLetterMap.prototype.initAtlastLists = function() {
  // Run Original Function
  Scene_Base.prototype.initAtlastLists.call(this);
  // Add Required Atlas
  // this.addRequiredAtlas('blackletter_bg');
  this.addRequiredAtlas('blackLetter_map_atlas');
};
//=============================================================================
// * Create
//=============================================================================
Scene_OmoriBlackLetterMap.prototype.create = function() {
  // Super Call
  Scene_Base.prototype.create.call(this);
  // Create Map Sprite
  this._mapSprite = new Sprite_OmoBlackLetterMap();
  this.addChild(this._mapSprite);
};

Scene_OmoriBlackLetterMap.prototype.start = function() {
  Scene_Base.prototype.start.call(this);
  this.startFadeIn(this.slowFadeSpeed());
};

//=============================================================================
// * Frame Update
//=============================================================================
Scene_OmoriBlackLetterMap.prototype.update = function() {
  // Super Call
  Scene_Base.prototype.update.call(this);
  // If Cancel or Q is pressed
  if (Input.isTriggered('cancel') || Input.isTriggered('q')) {
    // If not busy
    if (!this.isBusy()) {
      // Play Cancel Sound
    //  SoundManager.playCancel();
      // Pop Scene
      this.popScene();
    };
  };
};



//=============================================================================
// ** Sprite_OmoBlackLetterMap
//-----------------------------------------------------------------------------
// This sprite is used to display the black letter map.
//=============================================================================
function Sprite_OmoBlackLetterMap() { this.initialize.apply(this, arguments);}
Sprite_OmoBlackLetterMap.prototype = Object.create(Sprite.prototype);
Sprite_OmoBlackLetterMap.prototype.constructor = Sprite_OmoBlackLetterMap;
//=============================================================================
// * Initialize Object
//=============================================================================
Sprite_OmoBlackLetterMap.prototype.initialize = function() {
  // Super Call
  Sprite.prototype.initialize.call(this);
  // Create Background Sprite
  this.createBackgroundSprite();
  // Create Overlay Sprites
  this.createOverlaySprites();
  // Create Text Counter Sprite
};
//=============================================================================
// * Create Background Sprite
//=============================================================================
Sprite_OmoBlackLetterMap.prototype.createBackgroundSprite = function() {
  // Create Background Sprite
  this._backgroundSprite = new Sprite(ImageManager.loadSystem('blackletter_bg'));
  this.addChild(this._backgroundSprite);
};
//=============================================================================
// * Create Overlay Sprites
//=============================================================================
Sprite_OmoBlackLetterMap.prototype.createOverlaySprites = function() {
  // Create Overlay Bitmap
  var bitmap = new Bitmap(Graphics.width, Graphics.height);
  // Get Background Bitmap
  var bgBitmap = ImageManager.loadAtlas('blackLetter_map_atlas');
  var bgBitmap50 = ImageManager.loadAtlas('blackLetter_map_50_atlas');
  // Get Map Data
  bgBitmap.addLoadListener(() => {
    bgBitmap50.addLoadListener(() => {
      var mapData = [
        {name: 'PYREFLY FOREST',   namePos: new Point(80, 195), rect: new Rectangle(0, 0, 193, 139), pos: new Point(111, 103),  blackSwitchId: 23, nameSwitchId: 30, blackSwitch50Id: 900 },
        // {name: 'Forgotten Pier',   namePos: new Point(200, 27), rect: new Rectangle(194, 0, 155, 120), pos: new Point(225, 52),  blackSwitchId: 21, nameSwitchId: 29 },
        {name: 'PINWHEEL FOREST',  namePos: new Point(440, 240), rect: new Rectangle(350, 0, 99, 107), pos: new Point(471, 128),  blackSwitchId: 24, nameSwitchId: 31, blackSwitch50Id: 901 },
        {name: 'SPROUT MOLE TOWN', namePos: new Point(25, 340), rect: new Rectangle(450, 0, 94, 80), pos: new Point(54, 267),  blackSwitchId: 25, nameSwitchId: 32, blackSwitch50Id: 902 },
        {name: 'VAST FOREST',  namePos: new Point(250, 300), rect: new Rectangle(0, 124, 640, 201), pos: new Point(-2, 143),  blackSwitchId: 26, nameSwitchId: 33, blackSwitch50Id: 903 },
        {name: 'DEEP WELL',        namePos: new Point(450, 355), rect: new Rectangle(0, 326, 418, 113), pos: new Point(119, 366),  blackSwitchId: 27, nameSwitchId: 34, blackSwitch50Id: 904 },
        {name: 'ORANGE OASIS',     namePos: new Point(20, 55), rect: new Rectangle(545, 0, 122, 102), pos: new Point(31, 85),  blackSwitchId: 28, nameSwitchId: 35, blackSwitch50Id: 905 },
        {name: 'OTHERWORLD',  namePos: new Point(450, 75), rect: new Rectangle(419, 326, 140, 209), pos: new Point(390, 21),  blackSwitchId: 29, nameSwitchId: 36, blackSwitch50Id: 906 },
      ]
      // Initialize Name Windows Array
      this._nameWindows = [];
      // Create Container for Name Windows
      this._nameWindowsContainer = new Sprite();
      // Go Through Map Data
      for (var i = 0; i < mapData.length; i++) {
        // Get Data
        var data = mapData[i];
        // Get Rect & Position
        var rect = data.rect, pos = data.pos;
        var test = Math.randomInt(100) > 50;
        // If Black switch ID is not on
        /*if (!$gameSwitches.value(data.blackSwitchId)) {
          if (!$gameSwitches.value(data.blackSwitch50Id)) {
          // Draw Black onto Bitmap
          bitmap.blt(bgBitmap50, rect.x, rect.y, rect.width, rect.height, pos.x, pos.y);
         } else {
          
         }
        };*/
          //if(!!$gameSwitches.value(data.blackSwitchId)) {bitmap.blt(bgBitmap, rect.x, rect.y, rect.width, rect.height, pos.x, pos.y);}
          //else if(!!$gameSwitches.value(data.blackSwitch50Id)) {bitmap.blt(bgBitmap50, rect.x, rect.y, rect.width, rect.height, pos.x, pos.y);}
          if(!!$gameSwitches.value(data.blackSwitch50Id)) {bitmap.blt(bgBitmap, rect.x, rect.y, rect.width, rect.height, pos.x, pos.y);}
          else {
            if(!$gameSwitches.value(data.blackSwitchId)) {
              bitmap.blt(bgBitmap50, rect.x, rect.y, rect.width, rect.height, pos.x, pos.y);
            }
          }
          // Get Name Position
          var namePos = data.namePos;
          var name = $gameSwitches.value(data.nameSwitchId) ? data.name : "???"
          // Create Window
          var win = new Window_OmoBlackLetterMapName(name);
          // Set Window Position
          win.x = namePos.x; win.y = namePos.y;
          this._nameWindows.push(win);
          this._nameWindowsContainer.addChild(win);
      };
      // Create Black Overlay Sprite
      this._blackOverlay = new Sprite(bitmap);
      this.addChild(this._blackOverlay)
    
      // Add Name Window container as a child
      this.addChild(this._nameWindowsContainer);
      this.createTextCounterSprite();
    }) 
  })
  
};
//=============================================================================
// * Create Text Counter Sprite
//=============================================================================
Sprite_OmoBlackLetterMap.prototype.createTextCounterSprite = function() {
  // Get Background Bitmap
  var bgBitmap = ImageManager.loadAtlas('blackLetter_map_atlas');
  // Create Bitmap
  var bitmap = new Bitmap(200, 40);
  bitmap.blt(bgBitmap, 450, 81, 39, 37, 5, 10);
  bitmap.textColor = '#000000';
  bitmap.outlineColor = 'rgba(255, 255, 255, 1)'
  bitmap.outlineWidth = 3;
  bitmap.drawText('%1/%2'.format($gameVariables.value(19), 26), 48, 0, 70, 55);
  this._textCounterSprite = new Sprite(bitmap);
  this._textCounterSprite.y = Graphics.height - 50;
  this.addChild(this._textCounterSprite);
};



//=============================================================================
// ** Window_OmoBlackLetterMapName
//-----------------------------------------------------------------------------
// The window for displaying the name of a map section in the black letter map.
//=============================================================================
function Window_OmoBlackLetterMapName() { this.initialize.apply(this, arguments); }
Window_OmoBlackLetterMapName.prototype = Object.create(Window_Base.prototype);
Window_OmoBlackLetterMapName.prototype.constructor = Window_OmoBlackLetterMapName;
//=============================================================================
// * Object Initialization
//=============================================================================
Window_OmoBlackLetterMapName.prototype.initialize = function(name) {
  // Set Name
  this._name = name;
  // Super Call
  Window_Base.prototype.initialize.call(this, 0, 0, 300, 38);
  this.refresh();
};
//=============================================================================
// * Settings
//=============================================================================
Window_OmoBlackLetterMapName.prototype.standardPadding = function() { return 4; };
Window_OmoBlackLetterMapName.prototype.windowWidth = function() { return Graphics.width; };
//=============================================================================
// * Refresh
//=============================================================================
Window_OmoBlackLetterMapName.prototype.refresh = function() {
  // Clear Contents
  this.contents.clear();
  // Get Text Width
  var textWidth = this.textWidth(this._name);
  // Adjust Width
  this.width = textWidth + (this._name === "???" ? 24 : this.padding*2);
  this.contents.fontSize = 22;
  // Draw Name
  this.drawText(this._name, 0, -7, this.contentsWidth(), 'center');
};
