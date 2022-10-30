//=============================================================================
// TDS Map Character Tag
// Version: 1.0
//=============================================================================
// Add to Imported List
var Imported = Imported || {} ; Imported.TDS_MapCharacterTag = true;
// Initialize Alias Object
var _TDS_ = _TDS_ || {} ; _TDS_.MapCharacterTag = _TDS_.MapCharacterTag || {};
//=============================================================================
 /*:
 * @plugindesc
 * Shortcut for tag system
 *
 * @author TDS
 *
 *
 * @param Common Event ID
 * @desc ID of the common event to run after tagging.
 * @default 1
 *
 * @param Selected Variable ID
 * @desc ID of the variable to set selected tagged actor ID.
 * @default 1
 *
 *
 * @param Disable Switch ID
 * @desc ID of the switch used to disable the tagging system.
 * @default 1
 *
 *
 */
//=============================================================================
// Node.js path
var path = require('path');
// Get Parameters
var parameters = PluginManager.parameters("Map_Character_Tag");
// Initialize Parameters
_TDS_.MapCharacterTag.params = {};
_TDS_.MapCharacterTag.params.commonEventID      = Number(parameters['Common Event ID'] || 1);
_TDS_.MapCharacterTag.params.selectedVariableID = Number(parameters['Selected Variable ID'] || 1);
_TDS_.MapCharacterTag.params.disableSwitchID    = Number(parameters['Disable Switch ID'] || 1);


//=============================================================================
// ** Input
//-----------------------------------------------------------------------------
// The static class that handles input data from the keyboard and gamepads.
//=============================================================================
// Set Key Mapper A Key
Input.keyMapper[65] = 'tag';


//=============================================================================
// ** Scene_Map
//-----------------------------------------------------------------------------
// The scene class of the map screen.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.MapCharacterTag.Game_Player_canMove = Game_Player.prototype.canMove;
_TDS_.MapCharacterTag.Game_Player_canStartLocalEvents = Game_Player.prototype.canStartLocalEvents;
//=============================================================================
// * Can Use Map Character Tag
//=============================================================================
Game_Player.prototype.canUseCharacterTag = function() {
  // Get Scene
  const scene = SceneManager._scene;
  // If scene exists and has can use character tag function return it
  if (scene && scene.canUseCharacterTag) { return scene.canUseCharacterTag(); };
  return false;
};
//=============================================================================
// * Determine if player can start local events
//=============================================================================
Game_Player.prototype.canStartLocalEvents = function() {
  // If Map Character tag is visible
  if (SceneManager._scene._mapCharacterTag.opacity > 0) { return false; };
  // Return Original Function
  return _TDS_.MapCharacterTag.Game_Player_canStartLocalEvents.call(this);
};
//=============================================================================
// * Can Move
//=============================================================================
Game_Player.prototype.canMove = function() {
  // Input A is being pressed
  let scene = SceneManager._scene;
  let isTagging = scene._mapCharacterTag ? scene._mapCharacterTag.opacity > 0 : false;
  if (!!isTagging) { return false; };
  // return Original Function
  return _TDS_.MapCharacterTag.Game_Player_canMove.call(this);
};



//=============================================================================
// ** Scene_Map
//-----------------------------------------------------------------------------
// The scene class of the map screen.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.MapCharacterTag.Scene_Map_createDisplayObjects = Scene_Map.prototype.createDisplayObjects;
_TDS_.MapCharacterTag.Scene_Map_update = Scene_Map.prototype.update;
_TDS_.MapCharacterTag.Scene_Map_terminate = Scene_Map.prototype.terminate;
//=============================================================================
// * Create Display Objects
//=============================================================================
Scene_Map.prototype.createDisplayObjects = function() {
  // Run Original Function
  _TDS_.MapCharacterTag.Scene_Map_createDisplayObjects.call(this);
  // Create Map Character Tag
  this.createMapCharacterTag();
};
//=============================================================================
// * Terminate
//=============================================================================
Scene_Map.prototype.terminate = function() {
  // Hide Map Character Tag
  this._mapCharacterTag.visible = false;
  // Run Original Function
  _TDS_.MapCharacterTag.Scene_Map_terminate.call(this);
};
//=============================================================================
// * Frame Update
//=============================================================================
Scene_Map.prototype.update = function() {
  // Run Original Function
  _TDS_.MapCharacterTag.Scene_Map_update.call(this);
  // Update Character Tag
  this.updateCharacterTagInput();
};
//=============================================================================
// * Create Map Character Tag
//=============================================================================
Scene_Map.prototype.createMapCharacterTag = function() {
  // Create Map Character Tag Sprite
  this._mapCharacterTag = new Sprite_MapCharacterTag();
  this.addChild(this._mapCharacterTag);
};
//=============================================================================
// * Determine if Character Tag can be used
//=============================================================================
Scene_Map.prototype.canUseCharacterTag = function() { 
  // If Event is running return false
  if ($gameMap.isEventRunning()) { return false; };
  // If Party size is 1 or less
  if ($gameParty.size() <= 1) { return false;};
  // If Disable Switch is on return false
  if ($gameSwitches.value(_TDS_.MapCharacterTag.params.disableSwitchID)) { return false; }
  let scene = SceneManager._scene;
  let isProcessingAnyMovement = !!$gamePlayer.isMoving() || !!$gamePlayer.followers().areMoving() || Input.isPressed("left") || Input.isPressed("right") || Input.isPressed("up") || Input.isPressed("down");
  if (!!isProcessingAnyMovement) {return false;}
  // Return true by default
  return true;
};
//=============================================================================
// * Update Character Tag
//=============================================================================
Scene_Map.prototype.updateCharacterTagInput = function() {
  // If Input Trigger A
  if (Input.isTriggered('tag')) {
    // If Can use Character Tag
    if (this.canUseCharacterTag()) {  
      // Get Tag
      var tag = this._mapCharacterTag;
      // If Tag is Finished
      if (tag._finished) {
        // Show Tag
        tag.show();    
      };  
    };
  };  
};




//=============================================================================
// ** Sprite_MapCharacterTag
//-----------------------------------------------------------------------------
// Ring Menu for Omori's tag system on the map.
//=============================================================================
function Sprite_MapCharacterTag() { this.initialize.apply(this, arguments);}
Sprite_MapCharacterTag.prototype = Object.create(Sprite.prototype);
Sprite_MapCharacterTag.prototype.constructor = Sprite_MapCharacterTag;
//=============================================================================
// * Initialize Object
//=============================================================================
Sprite_MapCharacterTag.prototype.initialize = function() {
  // Super Call
  Sprite.prototype.initialize.call(this);
  // Initialize Settings
  this.initSettings();
  // Create Background
  this.createBackground();
  // Create Party Sprites
  this.createPartySprites();
};
//=============================================================================
// * Create Background
//=============================================================================
Sprite_MapCharacterTag.prototype.createBackground = function() { 
  // Create Background
  this._backgroundSprite = new Sprite();
  this.addChild(this._backgroundSprite); 
};
//=============================================================================
// * Initialize Settings
//=============================================================================
Sprite_MapCharacterTag.prototype.initSettings = function() { 
  // Amount of Frames for Startup Animation
  this._startUpFrames = 13;
  // Animation Frames for Movement Animation
  this._movingFrames = 10;
  // Radius of the ring
  this._ringRadius = 160;
  // Animation Steps
  this._steps = -1;
  // Set Center X & Y Valeus
  this._centerX = Graphics.width / 2;
  this._centerY = (Graphics.height / 2) - 10;
  // Animation Type (Start, Wait, Move Right, Move Left)
  this._anim = '';
  // Set Index to 
  this._index = 0;
  // Set Opacity to 0
  this.opacity = 0;
  // Set Released To false
  this._released = false;  
  // Finished Flag
  this._finished = true;
};
//=============================================================================
// * Create Party Sprites
//=============================================================================
Sprite_MapCharacterTag.prototype.createPartySprites = function() { 
  // Initialize Party Sprites
  this._partySprites = [];
  // Create Party Sprites Container
  this._partySpritesContainer = new Sprite()
  this._partySpritesContainer.opacity = 0;
  this.addChild(this._partySpritesContainer);
  // Iterate
  for (var i = 0; i < 4; i++) {
    var sprite = new Sprite_MapCharacterTagFace();
    let text = LanguageManager.getMessageData("XX_BLUE.Map_Character_Tag").leader
    sprite.setText(text);
    sprite.x = this._centerX;
    sprite.y = this._centerY;    
    this._partySprites[i] = sprite;    
    this._partySpritesContainer.addChild(sprite)
  };
  // Create Leader Sprite
  this._leaderSprite = new Sprite_MapCharacterTagFace();
  this._leaderSprite.x = this._centerX;
  this._leaderSprite.y = this._centerY;
  this._leaderSprite.showText();
  let tagtext = LanguageManager.getMessageData("XX_BLUE.Map_Character_Tag").tag_who
  this._leaderSprite.setText(tagtext)
  this.addChild(this._leaderSprite);
  // Refresh Party Sprites
  this.refreshPartySprites();
};
//=============================================================================
// * Refresh Party Sprites
//=============================================================================
Sprite_MapCharacterTag.prototype.refreshPartySprites = function() { 
  for (var i = 0; i < this._partySprites.length; i++) {
    // Get Sprite
    var sprite = this._partySprites[i];
    // Get Actor
    var actor = $gameParty.members()[i];
    sprite._faceSprite.actor = actor;
    // Set Visibility
    sprite.visible = actor !== undefined; 
  };
  // Set Leader Sprite Face Sprite
  this._leaderSprite._faceSprite.actor = $gameParty.leader();  
};
//=============================================================================
// * Reset Party Sprites
//=============================================================================
Sprite_MapCharacterTag.prototype.resetPartySprites = function() { 
  for (var i = 0; i < this._partySprites.length; i++) {
    // Get Sprite
    var sprite = this._partySprites[i];
    sprite.x = this._centerX;
    sprite.y = this._centerY;
  };
};
//=============================================================================
// * Activate & Deactivate
//=============================================================================
Sprite_MapCharacterTag.prototype.activate   = function() { this._active = true; };
Sprite_MapCharacterTag.prototype.deactivate = function() { this._active = false; };
//=============================================================================
// * Determine if Animating
//=============================================================================
Sprite_MapCharacterTag.prototype.isAnimating = function() { return this._steps > -1; };
//=============================================================================
// * Determine if Inputs can be made
//=============================================================================
Sprite_MapCharacterTag.prototype.isInputable = function() { 
  if (this.isAnimating()) { return false; };
  if (this._released) { return false; };
  return true;
};
//=============================================================================
// * Get Max Items
//=============================================================================
Sprite_MapCharacterTag.prototype.maxItems = function() { return $gameParty.size(); };
//=============================================================================
// * Frame Update
//=============================================================================
Sprite_MapCharacterTag.prototype.update = function() {
  // Super Call
  Sprite.prototype.update.call(this);
  // Update Animations
  this.updateAnimations();
  // Update Input
  this.updateInput()
};
//=============================================================================
// * Move Left
//=============================================================================
Sprite_MapCharacterTag.prototype.moveLeft = function() {
  // Set Steps
  this._steps = this._movingFrames;    
  // Set Max
  var max = this.maxItems();
  // Set Index
  this._index = (this._index - 1 + max) % max;
  // Set Animation
  this._anim = 'moveLeft';
};
//=============================================================================
// * Move Right
//=============================================================================
Sprite_MapCharacterTag.prototype.moveRight = function() {
  // Set Steps
  this._steps = this._movingFrames;    
  // Set Index
  this._index = (this._index + 1) % this.maxItems();
  // Set Animation
  this._anim = 'moveRight'
};
//=============================================================================
// * Show
//=============================================================================
Sprite_MapCharacterTag.prototype.show = function() {
  // Set Index to 
  this._index = 0;  
  // Refresh Party Sprites
  this.refreshPartySprites();
  // Reset Party Sprites
  this.resetPartySprites();
  // Snap Background Bitmap
  SceneManager.snapForBackground(false);
  // Set Background Bitmap
  this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
  this._backgroundSprite.opacity = 0;
  this._backgroundSprite.blur = new PIXI.filters.BlurFilter();
  this._backgroundSprite.filters = [this._backgroundSprite.blur];
  this._backgroundSprite.blur.blur = 1;
  this._backgroundSprite.blur.padding = 0;
  // Set Party Sprites container Opacity
  this._partySpritesContainer.opacity = 0;  
  // Start Startup Animation
  this.startStartupAnim();
  // Set Released To false
  this._released = false;
  // Finished Flag
  this._finished = false;
};
//=============================================================================
// * Update Animations
//=============================================================================
Sprite_MapCharacterTag.prototype.onFinish = function() {
  this._anim = null;
  this._steps = -1;
  this._backgroundSprite.bitmap = null;
  this._released = false;
  // Finished Flag
  this._finished = true;  
  // If Index is more than 0
  if (this._index > 0) {
    // Get Actor ID
    var actorId = $gameParty.members()[this._index].actorId();
    // Set Actor ID Variable
    $gameVariables.setValue(_TDS_.MapCharacterTag.params.selectedVariableID, actorId);
    // Reserve Common Event
    $gameTemp.reserveCommonEvent(_TDS_.MapCharacterTag.params.commonEventID);
  };
  // Reset Index
  this._index = 0;
};
//=============================================================================
// * Update Animations
//=============================================================================
Sprite_MapCharacterTag.prototype.updateAnimations = function() {
  // Set Release Flag
  if (!this._released) {
    // Set Active Flag
    this._active = Input.isPressed('tag');
    if (!this._active) {
      this._released = true;
      return;
    };
  } else if (!this._finished && this._released) {    
    // If Not Active
    this.opacity -= 30;
    // If Opacity is 0 or less set showing to false
    if (this.opacity <= 0) { 
      // On Finish
      this.onFinish();
    };
    return; 
  };
  // If Steps is more than -1
  if (!this._released && this._steps > -1) {
    // Animation Switch Case
    switch (this._anim) {
      case 'start':
        this.updateStartupAnim();
        break;
      case 'moveLeft':
        this.updateMoveAnim(1);
        break;
      case 'moveRight':
        this.updateMoveAnim(0)
        break;
      default:
        // statements_def
        break;
    };
  }
};
//=============================================================================
// * Update Input
//=============================================================================
Sprite_MapCharacterTag.prototype.updateInput = function() {
  // If Inputable
  if (this.isInputable()) { 
    // Left Input
    if (Input.isRepeated('left')) { this.moveLeft(); };
    // Right Input
    if (Input.isRepeated('right')) { this.moveRight(); };        
  };
};
//=============================================================================
// * Start Startup Animation
//=============================================================================
Sprite_MapCharacterTag.prototype.startStartupAnim = function() {
  // Animation Steps
  this._steps = this._startUpFrames;
  // Set Animation Type
  this._anim = 'start';
};
//=============================================================================
// * Update Startup Animation
//=============================================================================
Sprite_MapCharacterTag.prototype.updateStartupAnim = function() {
  // If Opacity is not at max
  if (this.opacity < 255) {
    // Increase Opacity
    this.opacity += 60;
    this._backgroundSprite.opacity += 60;
    return;    
  }

  var max = this.maxItems();
  var d1 = 2.0 * Math.PI / max;
  var d2 = 1.0 * Math.PI / this._startUpFrames;
  var r = this._ringRadius - 1.0 * this._ringRadius * this._steps / this._startUpFrames;
  for (var i = 0; i < max; i++) {
    // Get Sprite
    var sprite = this._partySprites[i];
    var d = d1 * i + d2 * this._steps;
    sprite.x = this._centerX + (r * Math.sin(d));
    sprite.y = this._centerY - (r * Math.cos(d));
    sprite.hideText();
    sprite._faceSprite.deactivate();
  };

  // If Steps are more than 0
  if (this._steps > 0) {
    // Set party container opacity
    this._partySpritesContainer.opacity = (this._partySpritesContainer.opacity * (this._steps - 1) + 255) / this._steps;
  };

  // Decrease Steps
  this._steps--;
  // If Animation is over
  if (this._steps < 0) { this.updateWaitAnim(); };
};
//=============================================================================
// * Update Wait Animation
//=============================================================================
Sprite_MapCharacterTag.prototype.updateWaitAnim = function() {
  var max = this.maxItems(); 
  var d = 2.0 * Math.PI / max;
  // Go Through Sprites
  for (var i = 0; i < max; i++) {
    // Get Sprite
    var sprite = this._partySprites[i];
    var j = i - this._index;
    sprite.x = (this._centerX + (this._ringRadius * Math.sin(d * j)));
    sprite.y = this._centerY - ((this._ringRadius * Math.cos(d * j)))

    if (i === this._index) {
      sprite.showText();
      sprite._faceSprite.activate();
    } else {
      sprite._faceSprite.deactivate();
      sprite.hideText();
    }
  };
};
//=============================================================================
// * Update Move Animation
//=============================================================================
Sprite_MapCharacterTag.prototype.updateMoveAnim = function(mode) {
  var max = this.maxItems();   
  var d1 = 2.0 * Math.PI / max;
  var d2 = d1 / this._movingFrames;
  if (mode !== 0) { d2 *= -1; }; 
  for (var i = 0; i < max; i++) {
    // Get Sprite
    var sprite = this._partySprites[i];
    var j = i - this._index;    
    var d = d1 * j + d2 * this._steps;
    sprite.x = (this._centerX + (this._ringRadius * Math.sin(d)));
    sprite.y = this._centerY - ((this._ringRadius * Math.cos(d)))
    sprite.hideText();
  };
  // Decrease Steps
  this._steps--;
  // If Animation is over
  if (this._steps < 0) { this.updateWaitAnim(); };  
};



//=============================================================================
// ** Sprite_MapCharacterTagFace
//-----------------------------------------------------------------------------
// Animated Face Sprite for menus.
//=============================================================================
function Sprite_MapCharacterTagFace() { this.initialize.apply(this, arguments);}
Sprite_MapCharacterTagFace.prototype = Object.create(Sprite.prototype);
Sprite_MapCharacterTagFace.prototype.constructor = Sprite_MapCharacterTagFace;
//=============================================================================
// * Initialize Object
//=============================================================================
Sprite_MapCharacterTagFace.prototype.initialize = function() {
  // Super Call
  Sprite.prototype.initialize.call(this);
  // Set Center Position
  this.anchor.set(0.5, 0.5);
  // Create Sprites
  this.createBackgroundSprite();
  this.createTextSprite();  
  this.createFaceSprite();
  // Hide Text
  this.hideText();
};
//=============================================================================
// * Create Background Sprite
//=============================================================================
Sprite_MapCharacterTagFace.prototype.createBackgroundSprite = function() {
  var bitmap = new Bitmap(110, 110 + 34)
  bitmap.fillAll('rgba(0, 0, 0, 1)')
  bitmap.fillRect(1, 1, bitmap.width - 2, bitmap.height - 2, 'rgba(255, 255, 255, 1)')
  bitmap.fillRect(4, 4, bitmap.width - 8, 105, 'rgba(0, 0, 0, 1)')
  bitmap.fillRect(0, 113, bitmap.width, 1, 'rgba(0, 0, 0, 1)')
  bitmap.fillRect(4, 117, bitmap.width - 8, 22, 'rgba(0, 0, 0, 1)')
  this._backgroundSprite = new Sprite(bitmap);
  this._backgroundSprite.x = -(bitmap.width / 2);  
  this._backgroundSprite.y = -(110 / 2);    
  this.addChild(this._backgroundSprite);
};

//=============================================================================
// * Create Text Sprite
//=============================================================================
Sprite_MapCharacterTagFace.prototype.createTextSprite = function() {
  var bitmap = new Bitmap(110, 32);  
  this._textSprite = new Sprite(bitmap);
  this._textSprite.anchor.set(0.5, 0);
  this._textSprite.y = (144 / 2) - 18;
  this.addChild(this._textSprite);
};
//=============================================================================
// * Create Face Sprite
//=============================================================================
Sprite_MapCharacterTagFace.prototype.createFaceSprite = function() {
  // Create Face Sprite
  this._faceSprite = new Sprite_OmoMenuStatusFace();
  this._faceSprite.anchor.set(0.5, 0.5)
  this._faceSprite.actor = $gameParty.members()[0];
  this._faceSprite.deactivate();
  this.addChild(this._faceSprite);

  this._faceMask = new Sprite(new Bitmap(110,110))
  this._faceMask.x = -(110 / 2) + 2;  
  this._faceMask.y = -(110 / 2) + 2;  
  let white = 'rgba(255, 255, 255, 1)';
  this._faceMask.bitmap.fillRect(0,0,106,2, white)
  this._faceMask.bitmap.fillRect(104,0,2,106, white)
  this.addChild(this._faceMask);
};
//=============================================================================
// * Activate & Deactivate
//=============================================================================
Sprite_MapCharacterTagFace.prototype.activate   = function() { this._active = true; };
Sprite_MapCharacterTagFace.prototype.deactivate = function() { this._active = false; };
//=============================================================================
// * Show Text
//=============================================================================
Sprite_MapCharacterTagFace.prototype.setText = function(text) {
  var bitmap = this._textSprite.bitmap;
  bitmap.fontSize = LanguageManager.getMessageData("XX_BLUE.Sprite_MapCharacterTagFace").setText_fontsize;
  bitmap.drawText(text, 0, 0, bitmap.width, bitmap.height, 'center');
};
//=============================================================================
// * Show Text
//=============================================================================
Sprite_MapCharacterTagFace.prototype.showText = function() {
  this._backgroundSprite.setFrame(0, 0, 110, this._backgroundSprite.bitmap.height);
  this._textSprite.visible = true;
};
//=============================================================================
// * Hide Text
//=============================================================================
Sprite_MapCharacterTagFace.prototype.hideText = function() {
  this._backgroundSprite.setFrame(0, 0, 110, 114);
  this._textSprite.visible = false;
};
