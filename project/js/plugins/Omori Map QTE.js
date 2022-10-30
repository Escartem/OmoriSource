//=============================================================================
// TDS Map QTE's
// Version: 1.5
//=============================================================================
// Add to Imported List
var Imported = Imported || {} ; Imported.TDS_MapQTE = true;
// Initialize Alias Object
var _TDS_ = _TDS_ || {} ; _TDS_.MapQTE = _TDS_.MapQTE || {};
//=============================================================================
 /*:
 * @plugindesc
 * This plugin add event Quick Time Events.
 *
 * @author TDS
 *
 * @param Active QTE Switch ID
 * @desc ID of the switch to turn ON or OFF when QTE's are active.
 * @default 1
 *
 * @param QTE Result Variable ID
 * @desc ID of the variable to put QTE results into.
 * @default 1
 */
//=============================================================================
// Node.js path
var path = require('path');
// Get Parameters
var parameters = PluginManager.parameters("Omori Map QTE");
// Initialize Parameters
_TDS_.MapQTE.params = {};
_TDS_.MapQTE.params.activeQTESwitchID    = Number(parameters['Active QTE Switch ID'] || 1);
_TDS_.MapQTE.params.QTEResultVariableID  = Number(parameters['QTE Result Variable ID'] || 1);






//ImageManager.reserveSystem('QTE Arrow', 0, 1);
//ImageManager.reserveSystem('QTE_OMORI_ATLAS', 0, 1);



//=============================================================================
// ** Game_Interpreter
//-----------------------------------------------------------------------------
// The interpreter for running event commands.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.MapQTE.Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
//=============================================================================
// * Update Wait Mode
//=============================================================================
Game_Interpreter.prototype.updateWaitMode = function() {
  // If Input Mode is for wait
  if (this._waitMode === 'QTE') {
    // If Input has been pressed
    if (!$gameSwitches.value(_TDS_.MapQTE.params.activeQTESwitchID)) { return false; }
    return true;
  };
  // Return Original Function
  return _TDS_.MapQTE.Game_Interpreter_updateWaitMode.call(this);
};
//=============================================================================
// * Start Smash QTE
//=============================================================================
Game_Interpreter.prototype.startSmashQTE = function(segments, time, width) {
  // Turn ON QTE Switch
  $gameSwitches.setValue(_TDS_.MapQTE.params.activeQTESwitchID, true);
  // Get Window
  var win = SceneManager._scene._QTEWindowSmash;
  // If Window Exists
  if (win) {
    win.open();
    win.activate();
    win.setup(segments, time, width)
  };
  this.setWaitMode('QTE');
};
//=============================================================================
// * Start Stop the Arrow QTE
//=============================================================================
Game_Interpreter.prototype.startStopTheArrowQTE = function(direction, delay, x, y) {
  // Turn ON QTE Switch
  $gameSwitches.setValue(_TDS_.MapQTE.params.activeQTESwitchID, true);
  // Get Window
  var win = SceneManager._scene._QTEWindowStopTheArrow;
  // If Window Exists
  if (win) {
    win.open();
    win.activate();
    win.setup(direction, delay)
    if (x !== undefined) { win.x = x; };
    if (y !== undefined) { win.y = y; };
  };
  this.setWaitMode('QTE');
};
//=============================================================================
// * Start Hit the Mark QTE
//=============================================================================
Game_Interpreter.prototype.startHitTheMarkQTE = function(speed, index, x, y) {
  // Turn ON QTE Switch
  $gameSwitches.setValue(_TDS_.MapQTE.params.activeQTESwitchID, true);
  // Get Window
  var win = SceneManager._scene._QTEWindowHitTheMark;
  // If Window Exists
  if (win) {
    if (index === undefined) { index = Math.randomInt(12); };
    win.open();
    win.activate();
    win.setup(speed, index);
    if (x !== undefined) { win.x = x; };
    if (y !== undefined) { win.y = y; };
  };
  this.setWaitMode('QTE');
};




//=============================================================================
// ** Scene_Map
//-----------------------------------------------------------------------------
// The scene class of the map screen.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.MapQTE.Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
//=============================================================================
// * Create Display Objects
//=============================================================================
Scene_Map.prototype.createDisplayObjects = function() {
  // Run Original Function
  _TDS_.MapQTE.Scene_Map_createDisplayObjects.call(this);
  // Create QTE Windows
  this.createQTEWindows();
};
//=============================================================================
// * Create QTE Windows
//=============================================================================
Scene_Map.prototype.createQTEWindows = function() {
  // Create Smash QTE Window
  this._QTEWindowSmash = new Window_OmoriMapQTESmash();
  this.addChild(this._QTEWindowSmash);
  // Create Stop the Arrow QTE window
  this._QTEWindowStopTheArrow = new Window_OmoriStopTheArrow();
  this.addChild(this._QTEWindowStopTheArrow);
  // // Create Hit The Mark QTE Window
  this._QTEWindowHitTheMark = new Window_OmoriHitTheMark();
  this.addChild(this._QTEWindowHitTheMark)
};








//=============================================================================
// ** Window_OmoriMapQTESmash
//-----------------------------------------------------------------------------
// This window is used to display the Smash QTE.
//=============================================================================
function Window_OmoriMapQTESmash() { this.initialize.apply(this, arguments); }
Window_OmoriMapQTESmash.prototype = Object.create(Window_Base.prototype);
Window_OmoriMapQTESmash.prototype.constructor = Window_OmoriMapQTESmash;
//=============================================================================
// * Initialize Object
//=============================================================================
Window_OmoriMapQTESmash.prototype.initialize = function() {

  // Completed Segments
  this._segment = 0;
  // Press Count
  this._pressCount = 0;
  // Press Timer
  this._timer = 300;
  // Max Timer
  this._maxTimer = 300;
  // Segment Presses
  this._segmentPresses = [5];
  // Alt State & Alt Delay
  this._altState = 0; this._altDelay = 0;
  // Close Delay
  this._closeDelay = 30;
  // Super Call
  Window_Base.prototype.initialize.call(this, 14, 14, this.windowWidth(), this.windowHeight());

  // Create Bar Sprite
  this.createBarSprite();
  // Create Parallax BAckground
  this.createParallaxBack();

  this.deactivate();
  this.openness = 0;
};
//=============================================================================
// * Settings
//=============================================================================
Window_OmoriMapQTESmash.prototype.standardPadding = function() { return 0; };
Window_OmoriMapQTESmash.prototype.windowWidth = function() { return 300; };
Window_OmoriMapQTESmash.prototype.windowHeight = function() { return 42 + 5; };
//=============================================================================
// * Define Openness
//=============================================================================
Object.defineProperty(Window_OmoriMapQTESmash.prototype, 'openness', {
  get: function() { return this._openness; },
  set: function(value) {
    // Super Call
    Object.getOwnPropertyDescriptor(Window.prototype, 'openness').set.call(this, value);
    // If Background Exists
    if (this._smashBarSprite) {
      var scale = this._openness / 255;
      this._smashBarSprite.scale.y = scale
      this._smashBarSprite.y = 5 + (this.height / 2 * (1 - this._openness / 255));

      this._parallaxBack.y = 4 + (this.height / 2 * (1 - this._openness / 255));
      this._parallaxBack.scale.y = scale

      this._timeBarSprite.y = (this.height - 7) + (this.height / 2 * (1 - this._openness / 255));
      this._timeBarSprite.scale.y = scale;
    };
  },
  configurable: true
});
//=============================================================================
// * Create Bar Sprite
//=============================================================================
Window_OmoriMapQTESmash.prototype.createParallaxBack = function() {
  this._parallaxBack = new TilingSprite();
  this._parallaxBack.bitmap = ImageManager.loadSystem('QTE Smash Background');
  this._parallaxBack.move(5, 5, this.width - 10, 32);
  this._parallaxBack.opacity = 180
  this.addChildToBack(this._parallaxBack);
}
//=============================================================================
// * Create Bar Sprite
//=============================================================================
Window_OmoriMapQTESmash.prototype.createBarSprite = function() {
  // Create Bitmap
  var bitmap = new Bitmap(this.width - 8, this.height - 37);
  bitmap.fillAll('rgba(255, 0, 0, 1)');
  // Create Bar Sprite
  this._smashBarSprite = new Sprite(bitmap);
  this._smashBarSprite.width = 0
  this._smashBarSprite.opacity = 180
  this._smashBarSprite.x = 5;
  this._smashBarSprite.y = 5;
  this.addChildToBack(this._smashBarSprite);

  // Create Time Bar Sprite
  this._timeBarSprite = new Sprite();
  this._timeBarSprite.x = 5;
  this._timeBarSprite.y = this.height - 7;
  this.addChild(this._timeBarSprite);
};
//=============================================================================
// * Setup
//=============================================================================
Window_OmoriMapQTESmash.prototype.setup = function(segments = [5], time = 10, width = 400) {
  // Set Values
  this._segment = 0;
  this._pressCount = 0;
  this._timer = time
  this._maxTimer = time;
  this._segmentPresses = segments.clone();
  this._closeDelay = 61;
  // Alt State & Alt Delay
  this._altState = 0; this._altDelay = 0;
  // Reset Blend Color
  this._smashBarSprite.setBlendColor([0, 0, 0, 0]);
  // Refresh Contents
  this.refresh();
  // Update Smash Bar
  this.updateSmashBar();
  // Update Timer Bar
  this.updateTimeBar();
};
//=============================================================================
// * Refresh
//=============================================================================
Window_OmoriMapQTESmash.prototype.refresh = function() {
  // Create Bitmap
  var bitmap = new Bitmap(this.width - 10, this.height - 15);
  bitmap.fillAll('rgba(255, 0, 0, 1)');
  // Create Bar Sprite
  this._smashBarSprite.bitmap = bitmap;
  // Recreate Contents
  this.createContents();
  // Create Time Bar Bitmap
  bitmap = new Bitmap(this.width - 10, 2);
  bitmap.fillAll('rgba(255, 255, 0, 1)');
  this._timeBarSprite.bitmap = bitmap;

  var segments = this._segmentPresses.length;
  this._segmentWidth = this.width / segments;

  this.contents.fillRect(4, this.height - 11, this.width - 8, 2, 'rgba(0, 0, 0, 1)');
  this.contents.fillRect(4, this.height - 10, this.width - 8, 2, 'rgba(255, 255, 255, 1)');

//  console.log( this._segmentWidth )
  for (var i = 1; i < segments; i++) {
    var x = i * this._segmentWidth;
    this.contents.fillRect(x - 1, 4, 3, this.height - 14, 'rgba(0, 0, 0, 1)');
    this.contents.fillRect(x, 4, 1, this.height - 14, 'rgba(255, 255, 255, 1)');
  };

  this.x = (Graphics.width - this.width) / 2;
  this.y = (Graphics.height - this.height) / 2;
};
//=============================================================================
// * Finish Processing
//=============================================================================
Window_OmoriMapQTESmash.prototype.finish = function() {
  // Turn ON QTE Switch
  $gameSwitches.setValue(_TDS_.MapQTE.params.activeQTESwitchID, false);
  // Set Achieved Segment
  $gameVariables.setValue(_TDS_.MapQTE.params.QTEResultVariableID, this._segment);
  // Close & Deactivate
  this.close(); this.deactivate();
};
//=============================================================================
// * Are Smash Keys Being Triggered
//=============================================================================
Window_OmoriMapQTESmash.prototype.isSmashTriggered = function() {
  return Input.isTriggered('ok');
};
//=============================================================================
// * Frame Update
//=============================================================================
Window_OmoriMapQTESmash.prototype.update = function() {
  // Super Call
  Window_Base.prototype.update.call(this);
  // If not open or active
  if (!this.isOpen() || !this.active) { return; };
  // Get Background Speed Rate
  var rate = this._segment / (Math.max(this._segmentPresses.length-1,1));
  // Get Speed
  var speed = Math.max(rate * 5, 1.5);
  // Move Parallax Back
  this._parallaxBack.origin.x -= speed;
  // If Timer is 0 or less
  if (this._timer <= 0) {
    // Finish
    this.finish();
    return;
  }

  if (this._timer > 0) { this._timer--; this.updateTimeBar(); };
  if (this._segment < this._segmentPresses.length) {

    if (this.isSmashTriggered()) {
      // Increase Press Count
      this._pressCount++;

      if (this._pressCount >= this._segmentPresses[this._segment]) {
        this._segment++;
        this._pressCount = 0;
        this.updateSmashBar();
      };
    };
  } else {
    // Decrease alt delay
    this._altDelay--;
    if (this._altDelay <= 0) {
      if (this._altState === 0) {
        this._smashBarSprite.setBlendColor([255, 255, 255, 255])
      } else {
        this._smashBarSprite.setBlendColor([0, 0, 0, 0]);
      };
      this._altState = (this._altState + 1) % 2
      this._altDelay = 10;
    };
    // Decrease Close Delay
    if (this._closeDelay > 0) { this._closeDelay--; }
    // If Timer is 0 or less or close delay is 0 or less
    if (this._timer <= 0 || this._closeDelay <= 0) { this.finish() }
  };
};
//=============================================================================
// * Update Smash Bar
//=============================================================================
Window_OmoriMapQTESmash.prototype.updateSmashBar = function() {
  // Get Original Width
  var width = this._segment * (this._segmentWidth );
  this._smashBarSprite.width = width - 3;
};
//=============================================================================
// * Update Time Bar
//=============================================================================
Window_OmoriMapQTESmash.prototype.updateTimeBar = function() {
  // Get Original Width
  var width = this._timeBarSprite.bitmap.width;
  var rate = this._timer / this._maxTimer;
  // Set Timer Width
  this._timeBarSprite.width = rate * width;
};




//=============================================================================
// ** Window_OmoriStopTheArrow
//-----------------------------------------------------------------------------
// This window is used to display the stop the arrow QTE.
//=============================================================================
function Window_OmoriStopTheArrow() { this.initialize.apply(this, arguments); }
Window_OmoriStopTheArrow.prototype = Object.create(Window_Base.prototype);
Window_OmoriStopTheArrow.prototype.constructor = Window_OmoriStopTheArrow;
//=============================================================================
// * Initialize Object
//=============================================================================
Window_OmoriStopTheArrow.prototype.initialize = function(index) {
  this._arrowIndex = 0;
  this._arrowDelay = 10;
  this._arrowDelayCount = 0;
  // Arrow Direction (0: Right, 1: Left)
  this._arrowDirection = 0;
  // Facing Direction
  this._facingDirection = 'up';
  // Set Container Y
  this._containerY = 0;
  // Super Call
  Window_Base.prototype.initialize.call(this, 14, 200, this.windowWidth(), this.windowHeight());
  ImageManager.loadSystem('QTE Arrow')
  // Create Background Sprite
  this.createBackgroundSprite();
  this.createArrowSprites();
  // Center Window
  this.x = (Graphics.width - this.width) / 2;
  this.y = (Graphics.height - this.height) / 2;
  // Close
  this.openness = 0;
  this.deactivate();
};
//=============================================================================
// * Settings
//=============================================================================
Window_OmoriStopTheArrow.prototype.standardPadding = function() { return 0; };
Window_OmoriStopTheArrow.prototype.windowWidth = function() { return 96; };
Window_OmoriStopTheArrow.prototype.windowHeight = function() { return 83; };
//=============================================================================
// * Define Openness
//=============================================================================
Object.defineProperty(Window_OmoriStopTheArrow.prototype, 'openness', {
  get: function() { return this._openness; },
  set: function(value) {
    // Super Call
    Object.getOwnPropertyDescriptor(Window.prototype, 'openness').set.call(this, value);
    // If Background Exists
    if (this._arrowContainer) {
      var scale = this._openness / 255;
      if (['up', 'down'].contains(this._facingDirection)) {
        this._arrowContainer.scale.x = 1;
        this._arrowContainer.scale.y = scale;
      } else {
        this._arrowContainer.scale.x = scale;
        this._arrowContainer.scale.y = 1;
      }
    };
  },
  configurable: true
});
//=============================================================================
// * Create Background Sprite
//=============================================================================
Window_OmoriStopTheArrow.prototype.createBackgroundSprite = function() {
  // Create Arrow Container
  this._arrowContainer = new Sprite();
  // this._arrowContainer.bitmap.fillAll('rgba(255, 0, 0, 1)');
  this._arrowContainer.pivot.x = 43;
  this._arrowContainer.pivot.y = 36.5;
  this._arrowContainer.x = this.width / 2;
  this._arrowContainer.y = this.height / 2;
  this.addChildToBack(this._arrowContainer);

  // Create Background Sprite
  // this._backgroundSprite = new Sprite(ImageManager.loadSystem('QTE Arrow'));
  this._backgroundSprite = new Sprite(ImageManager.loadSystem('QTE Arrow'));
  this._backgroundSprite.bitmap.addLoadListener(() => {this._backgroundSprite.setFrame(0, 0, 86,this._backgroundSprite.height)})

  // this._backgroundSprite.opacity = 120;
  // this._backgroundSprite.pivot.x = 43;
  // this._backgroundSprite.pivot.y = 36.5;
  // this._backgroundSprite.rotation = Math.PI / 16;
  // this._backgroundSprite.x = this.width / 2;
  // this._backgroundSprite.y = this.height / 2;
  this._arrowContainer.addChild(this._backgroundSprite);
  // this._backgroundSprite.rotation = (0 * 90) * Math.PI / 180
};
//=============================================================================
// * Create Arrow Sprites
//=============================================================================
Window_OmoriStopTheArrow.prototype.createArrowSprites = function() {
  // Initialize Arrow Sprites Array
  this._arrowSprites = [];
  var bit = ImageManager.loadSystem('QTE Arrow');
  // Create Sprites
  bit.addLoadListener(() => {
    for (var i = 0; i < 3; i++) {
      var sprite = new Sprite(ImageManager.loadSystem('QTE Arrow'));
      this._arrowSprites[i] = sprite;
      this._arrowContainer.addChild(sprite);
    };
  
    var sprite = this._arrowSprites[0];
    sprite.setFrame(86, 0, 39, sprite.bitmap.height);
    sprite.x = 7 - 5; sprite.y = 17 - 5;
  
  
    sprite = this._arrowSprites[1];
    sprite.setFrame(125, 0, 36, sprite.bitmap.height);
    sprite.x = 35 - 5; sprite.y = 12 - 5;
  
    sprite = this._arrowSprites[2];
    sprite.setFrame(163, 0, 36, sprite.bitmap.height);
    sprite.x = 63 - 5; sprite.y = 17 - 5;
  
    // Update Arrows Visibility
    this.updateArrowsVisibility();
  })
};
//=============================================================================
// * Setup
//=============================================================================
Window_OmoriStopTheArrow.prototype.setup = function(direction = 'up', delay = 10) {
  // Direction Switch Case
  switch (direction.toLowerCase()) {
    case 'up':
      this._arrowContainer.rotation = (0 * 90) * Math.PI / 180
      this.width = 96; this.height = 83;
    break;
    case 'left':
      this._arrowContainer.rotation = (3 * 90) * Math.PI / 180
      this.width = 96 - 14; this.height = 83 + 12;
    break;
    case 'right':
      this._arrowContainer.rotation = (1 * 90) * Math.PI / 180
      this.width = 96 - 14; this.height = 83 + 12;
    break;
    case 'down':
      this.width = 96; this.height = 83;
      this._arrowContainer.rotation = (2 * 90) * Math.PI / 180
    break;
  };
  // Set Facing Direction
  this._facingDirection = direction;
  // Reset Delay
  this._arrowIndex = Math.randomInt(this._arrowSprites.length);
  this._arrowDelay = delay;
  this._arrowDelayCount = 0;
  // Set Arrow Direction
  this._arrowDirection = 0;
  // Center Background Sprite
  this._arrowContainer.x = this.width / 2;
  this._arrowContainer.y = this.height / 2;
  // Update Arrow Visibility
  this.updateArrowsVisibility();
};
//=============================================================================
// * Frame Update
//=============================================================================
Window_OmoriStopTheArrow.prototype.update = function() {
  // Super Call
  Window_Base.prototype.update.call(this);

  // if (Input.isTriggered('control')) {

  //   if (this.isOpen()) { this.close(); };
  //   if (this.isClosed()) { this.open();};
  // };

  // var directions = ['up', 'down', 'left', 'right'];

  // for (var i = 0; i < directions.length; i++) {
  //   // Get Direction
  //   var direction = directions[i];
  //   if (Input.isTriggered(direction)) {
  //     this.setup(directions[i])
  //     break;
  //   }

  // }

  // If Open & Active
  if (this.active && this.isOpen()) {
    // If OK Input
    if (Input.isTriggered('ok')) {
     this.finish();
     return
    };
    // Increase Arrow Delay Count
    this._arrowDelayCount++;
    // If Arrow Delay Count is equal or more than arrow delay
    if (this._arrowDelayCount >=  this._arrowDelay) {
      // Reset Arrow Delay Count
      this._arrowDelayCount = 0;
      // If Arrow Direction is 0
      if (this._arrowDirection === 0) {
        // If Arrow has reached the other side
        if (this._arrowIndex >= this._arrowSprites.length-1) {
          // Reduce Index
          this._arrowIndex--;
              AudioManager.playSe({name: "sys_cursor1", pan: 0, pitch: 100, volume: 90});
          // Set Arrow Direction
          this._arrowDirection = 1;
        } else {
          // Increase Index
              AudioManager.playSe({name: "SYS_cursor", pan: 0, pitch: 100, volume: 90});
          this._arrowIndex++;
        };
      } else {
         if (this._arrowIndex <= 0) {
          // Increase Index
              AudioManager.playSe({name: "sys_cursor1", pan: 0, pitch: 100, volume: 90});
          this._arrowIndex++;

          // Set Arrow Direction
          this._arrowDirection = 0;
         } else {
              AudioManager.playSe({name: "SYS_cursor", pan: 0, pitch: 100, volume: 90});
          // Reduce Index
          this._arrowIndex--;
         };
      }
      this.updateArrowsVisibility();
    };
  };
};
//=============================================================================
// * Update Visibility of Arrows
//=============================================================================
Window_OmoriStopTheArrow.prototype.updateArrowsVisibility = function() {
  for (var i = 0; i < this._arrowSprites.length; i++) {
    this._arrowSprites[i].visible = (this._arrowIndex === i);
  };
};
//=============================================================================
// * Finish Processing
//=============================================================================
Window_OmoriStopTheArrow.prototype.finish = function() {
  // Turn ON QTE Switch
  $gameSwitches.setValue(_TDS_.MapQTE.params.activeQTESwitchID, false);
  // Set Achieved Segment
  $gameVariables.setValue(_TDS_.MapQTE.params.QTEResultVariableID, this._arrowIndex);
  // Close & Deactivate
  this.close(); this.deactivate();
};





















//=============================================================================
// ** Window_OmoriHitTheMark
//-----------------------------------------------------------------------------
// This window is used to display the hit the mark QTE.
//=============================================================================
function Window_OmoriHitTheMark() { this.initialize.apply(this, arguments); }
Window_OmoriHitTheMark.prototype = Object.create(Window_Base.prototype);
Window_OmoriHitTheMark.prototype.constructor = Window_OmoriHitTheMark;
//=============================================================================
// * Initialize Object
//=============================================================================
Window_OmoriHitTheMark.prototype.initialize = function() {
  // Pointer Move Speed
  this._speed = 3;
  // Movement Direction
  this._direction = 0;
  // Set Target Index
  this._targetIndex = 0;
  // Set Target Width
  this._targetWidth = 3 + (this._speed * 2);
  // Target X
  this._targetX = 0;
  // Super Call
  Window_Base.prototype.initialize.call(this, 14, 0, this.windowWidth(), this.windowHeight());

  // Create Background Sprite
  this.createBackgroundSprite();
  // Create Pointer
  this.createPointer();
  // Center Window
  this.x = (Graphics.width - this.width) / 2;
  this.y = (Graphics.height - this.height) / 2;
  // Refresh Contents
  this.refresh();

  this.deactivate();
  this.openness = 0;
};
//=============================================================================
// * Settings
//=============================================================================
Window_OmoriHitTheMark.prototype.standardPadding = function() { return 0; };
Window_OmoriHitTheMark.prototype.windowWidth = function() { return 216; };
Window_OmoriHitTheMark.prototype.windowHeight = function() { return 66; };
//=============================================================================
// * Define Openness
//=============================================================================
Object.defineProperty(Window_OmoriHitTheMark.prototype, 'openness', {
  get: function() { return this._openness; },
  set: function(value) {
    // Super Call
    Object.getOwnPropertyDescriptor(Window.prototype, 'openness').set.call(this, value);
    // If Background Sprite Exists
    if (this._backgroundSprite) {
      var scale = this._openness / 255;
      this._backgroundSprite.scale.y = scale;
    };
    // If Background Exists
    if (this._smashBarSprite) {
      var scale = this._openness / 255;
      this._smashBarSprite.scale.y = scale
      this._smashBarSprite.y = 5 + (this.height / 2 * (1 - this._openness / 255));

      this._parallaxBack.y = 4 + (this.height / 2 * (1 - this._openness / 255));
      this._parallaxBack.scale.y = scale

      this._timeBarSprite.y = (this.height - 7) + (this.height / 2 * (1 - this._openness / 255));
      this._timeBarSprite.scale.y = scale;
    };
  },
  configurable: true
});
//=============================================================================
// * Create Background Sprite
//=============================================================================
Window_OmoriHitTheMark.prototype.createBackgroundSprite = function() {
  // Create Background Sprite
  this._backgroundSprite = new Sprite(ImageManager.loadSystem('QTE_OMORI_ATLAS'));
  this._backgroundSprite.bitmap.addLoadListener(() => {
    this._backgroundSprite.setFrame(0, 0, 206, 56);
    this._backgroundSprite.x = 5;
    this._backgroundSprite.y = 33;
    this._backgroundSprite.anchor.y = 0.5;
  })
  this.addChildToBack(this._backgroundSprite);
};
//=============================================================================
// * Create Pointer Sprite
//=============================================================================
Window_OmoriHitTheMark.prototype.createPointer = function() {
  // // Create Pointer Bitmap
  // var bitmap = new Bitmap(12, 6);
  // for (var i = 0; i < 6; i++) {
  //   var x = i
  //   var y = bitmap.height - i;
  //   var w = bitmap.width - (i * 2)
  //   bitmap.fillRect(x, y, w, 1, 'rgba(255, 255, 255, 1)');
  // };
  // // Create Pointer
  // this._pointer = new Sprite(bitmap);
  // this._pointer.x = 32
  // this._pointer.anchor.set(0.5, 0.5)
  // this._pointer.y = this.height - 8;
  // this._pointer.visible = false;
  // this.addChild(this._pointer);

  // Create Pointer
  this._pointer = new Sprite(ImageManager.loadSystem('ACSArrows'));
  this._pointer.setFrame(3 * 32, 0, 32, 29);
  this._pointer.x = 32
  this._pointer.anchor.set(0.5, 0.5)
  this._pointer.y = this.height + 5;
  this._pointer.visible = false;
  this.addChild(this._pointer);
};
//=============================================================================
// * Setup
//=============================================================================
Window_OmoriHitTheMark.prototype.setup = function(speed, index) {
  // Pointer Move Speed
  this._speed = speed;
  // Movement Direction
  this._direction = 0;
  // Set Target Index Randomly
  this._targetIndex = index;
  // Set Stop Flag to false
  this._stop = false;
  // Redraw Contents
  this.refresh();
};
//=============================================================================
// * Refresh
//=============================================================================
Window_OmoriHitTheMark.prototype.refresh = function() {
  // Clear Contents
  this.contents.clear();
  // Get Bitmap
  var bitmap = ImageManager.loadSystem('QTE_OMORI_ATLAS');
  // console.log(lineSpaceWidth)
  var index = this._targetIndex;
  // Get X Position
  var x = 11 + (index * 17) - index;
  // Set Paint Opacity
  this.contents.paintOpacity = 160;

  bitmap.addLoadListener(() => {
    switch (this._speed) {
      case 2:
        // Set Target Width
        this._targetWidth = 9;
        // Adjust X Position by speed
        x -= 4;
        // Transfer Bitmap to window
        this.contents.blt(bitmap, 209, 0, this._targetWidth, bitmap.height, x, 0);
      break;
      case 4:
        // Adjust X Position by speed
        x -= 7;
        // Set Target Width
        this._targetWidth = 15;
        // Transfer Bitmap to window
        this.contents.blt(bitmap, 225, 0, this._targetWidth, bitmap.height, x, 0);
      break;
    };
    this.contents.paintOpacity = 255;
  })

  // Set Target X
  this._targetX = x;
  // Set Paint Opacity
  
};
//=============================================================================
// * Finish Processing
//=============================================================================
Window_OmoriHitTheMark.prototype.finish = function() {
  var padding = 4;
  var startX = this._targetX - padding;
  var endX = this._targetX + this._targetWidth + padding;
  // Check if in Area
  var inArea = (startX < this._pointer.x && this._pointer.x < endX);
  // Turn Off QTE Switch
  $gameSwitches.setValue(_TDS_.MapQTE.params.activeQTESwitchID, false);
  // Set Achieved Segment
  $gameVariables.setValue(_TDS_.MapQTE.params.QTEResultVariableID, inArea ? 1 : 0);
  // Close & Deactivate
  this.close(); this.deactivate();
  // Set Visibility to true
  this._pointer.visible = false;
}
//=============================================================================
// * Frame Update
//=============================================================================
Window_OmoriHitTheMark.prototype.update = function() {
  // Super Call
  Window_Base.prototype.update.call(this);
  // Return if Stopped
  if (this._stop || !this.active) { return }
  // Set Visibility to true
  this._pointer.visible = true;
  // If Ok Triggered
  if (Input.isTriggered('ok')) {
    // Set stop flag to true
    this._stop = true;
    // Finish
    this.finish();
    return
  };


  // Get Speed
  var speed = this._speed;
  // Get Left & Right Borders
  var left = 11;
  var right = this.width - 11;

  // If Direction is 0 (Left)
  if (this._direction === 0) {
    if (this._pointer.x <= left ) {
      this._direction = 1;
    } else {
      this._pointer.x =  Math.max(this._pointer.x - speed, left);
    };
  } else {
    if (this._pointer.x >= right) {
      this._direction = 0;
    } else {
      this._pointer.x =  Math.min(this._pointer.x + speed, right);
    };
  };
};
