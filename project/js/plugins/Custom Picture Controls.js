//=============================================================================
// TDS Custom Picture Controls
// Version: 1.2
//=============================================================================
// Add to Imported List
var Imported = Imported || {} ; Imported.TDS_CustomPictureControls = true;
// Initialize Alias Object
var _TDS_ = _TDS_ || {} ; _TDS_.CustomPictureControls = _TDS_.CustomPictureControls || {};
//=============================================================================
 /*:
 * @plugindesc
 * This plugin add custom controls as well as pictures for effects.
 *
 * @author TDS
 *
 */
//=============================================================================



//=============================================================================
// ** Game_Interpreter
//-----------------------------------------------------------------------------
// The interpreter for running event commands.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.CustomPictureControls.Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
//=============================================================================
// * Update Wait mode
//=============================================================================
Game_Interpreter.prototype.updateWaitMode = function() {
  // If Wait for picture animation
  if (this._waitMode === 'pictureAnimation') {
    // Get Picture
    var picture = $gameScreen.picture(this._lastAnimatingPicture);
    // If Picture exists and has a finite animation
    if (picture && picture.hasAnimation(true)) { return true; }
    // Set Last animating Picture to null
    this._lastAnimatingPicture = null;
  };
  // Return Original Function
  return _TDS_.CustomPictureControls.Game_Interpreter_updateWaitMode.call(this);
};
//=============================================================================
// * Get Picture Sprite
//=============================================================================
Game_Interpreter.prototype.getPictureSprite = function(pictureId) {
  return SceneManager._scene._spriteset._pictureContainer.children[pictureId]
};
//=============================================================================
// * Remove Picture Custom Frames
//=============================================================================
Game_Interpreter.prototype.removePictureCustomFrames = function(pictureId) {
  // Get Picture
  try {
    var picture = $gameScreen.picture(pictureId);
    // If Picture Exists
    if (picture) {
      // Clear Picture Custom Frame
      picture.clearCustomFrame();
      // Reset Picture Frame
      this.getPictureSprite.resetFrame() 
    };
  } catch(e) {}
};
//=============================================================================
// * Setup Picture Custom Frames
//=============================================================================
Game_Interpreter.prototype.setupPictureCustomFrames = function(pictureId, width, height, hFrames, vFrames) {
  // Get Vertical & Horizontal Sizes
  var fWidth = width / hFrames;
  var fHeight = height / vFrames;
  // Get Total Frames
  var totalFrames = hFrames * vFrames;
  // Initialize Rects Array
  var rects = []
  // Go Through Total frames
  for (var i = 0; i < totalFrames; i++) { rects.push(new Rectangle((i % hFrames) * fWidth, Math.floor(i / hFrames) * fHeight, fWidth, fHeight)); };
  // Setup Picture Frames
  $gameScreen.picture(pictureId).setupCustomFrame(rects);
};
//=============================================================================
// * Set Picture Frame Index
//=============================================================================
Game_Interpreter.prototype.setPictureFrameIndex = function(pictureId, index) {
  // Get Picture
  var picture = $gameScreen.picture(pictureId)
  // Set frame Index
  picture.setCustomFrameIndex(index)
  // Update Custom Frame
  this.getPictureSprite(pictureId).updateCustomFrame();
};
//=============================================================================
// * Set Picture Animation
//=============================================================================
Game_Interpreter.prototype.setPictureAnimation = function(pictureId, frames, delay, loops = Infinity, wait = true) {
  // Get Picture
  var picture = $gameScreen.picture(pictureId);
  // If Picture exists
  if (picture) {
    // Create animation
    var animation = {frames: [], loops: loops, index: 0}
    // Go Through Frames
    for (var i = 0; i < frames.length; i++) {
      // Get Frame
      var frame = frames[i];
      // If frame is an array
      if (Array.isArray(frame)) {
        // Add Frame to Animation
        animation.frames.push({frame: frame[0], delay: frame[1], maxDelay: frame[1]})        
      } else {
        // Add Frame to Animation        
        animation.frames.push({frame: frame, delay: delay, maxDelay: delay})        
      };      
    };
    // Set Custom Frame animation
    picture.setCustomFrameAnimation(animation);
    // Update Custom Frame
    this.getPictureSprite(pictureId).updateCustomFrame();  
    // If Wait and Loops is not infinite
    if (wait && loops !== Infinity) {
      // Set Wait mode
      this.setWaitMode('pictureAnimation')
      // Set Last Animating Picture
      this._lastAnimatingPicture = pictureId;
    };
  };
};



//=============================================================================
// ** Game_Picture
//-----------------------------------------------------------------------------
// The game object class for a picture.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.CustomPictureControls.Game_Picture_initBasic = Game_Picture.prototype.initBasic;
_TDS_.CustomPictureControls.Game_Picture_update    = Game_Picture.prototype.update;
//=============================================================================
// * Initialize Basic
//=============================================================================
Game_Picture.prototype.initBasic = function() {
  // Run Original Function
   _TDS_.CustomPictureControls.Game_Picture_initBasic.call(this);
   // Initialize Frame Data
   this.clearCustomFrame()
};
//=============================================================================
// * Determine if Picture has animation
//=============================================================================
Game_Picture.prototype.hasAnimation = function(finite = false) {
  // Get Data
  var data = this._frameData;
  // If Frame data exists
  if (data && data.animation !== null) {
    // Return false if the animation is infinite
    if (finite && !data.animation.loops !== Infinity) { return true; };
    // Return true
    return true;
  };
  // Return false by default
  return false;
};
//=============================================================================
// * Clear Custom Frame
//=============================================================================
Game_Picture.prototype.clearCustomFrame = function() { this._frameData = null; };
//=============================================================================
// * Frame Update
//=============================================================================
Game_Picture.prototype.setupCustomFrame = function(frames) {
  // Initialize Frame Data
  this._frameData = {frames: frames, frameIndex: 0, animation: null, refreshFrame: true}
};
//=============================================================================
// * Frame Update
//=============================================================================
Game_Picture.prototype.setCustomFrameAnimation = function(animation) {
  // Get Data
  var data = this._frameData;
  // If Frame data exists
  if (data) {
    // Set Frame Data Animation
    data.animation = animation;
    // Set Custom Frame Index
    this.setCustomFrameIndex(animation.frames[animation.index].frame);
  };
};
//=============================================================================
// * Get Custom Frame
//=============================================================================
Game_Picture.prototype.removeCustomFrameAnimation = function() {
  // If Frame data exists
  if (this._frameData) { this._frameData.animation = null; };  
}
//=============================================================================
// * Set Custom Frame Index
//=============================================================================
Game_Picture.prototype.setCustomFrameIndex = function(index) {
  // If Frame data exists
  if (this._frameData) {
    // Set Frame index
    this._frameData.frameIndex = index;
    // Set Refresh frame flag
    this._frameData.refreshFrame = true;
  };
}
//=============================================================================
// * Determine if Frame needs refreshing
//=============================================================================
Game_Picture.prototype.needsFrameRefresh = function() {
  if (this._frameData) { return this._frameData.refreshFrame }
  return false;
};
//=============================================================================
// * Get Custom Frame
//=============================================================================
Game_Picture.prototype.customFrame = function() {
  return this._frameData.frames[this._frameData.frameIndex]
}
//=============================================================================
// * Frame Update
//=============================================================================
Game_Picture.prototype.update = function() {
  // Run Original Function
  _TDS_.CustomPictureControls.Game_Picture_update.call(this);
  // Update Frame Animation
  this.updateFrameAnimation();
};
//=============================================================================
// * Frame Frame Animation
//=============================================================================
Game_Picture.prototype.updateFrameAnimation = function() {
  // Get Data
  var data = this._frameData;
  // If Data and Animation Data exists
  if (data && data.animation) {
    // Get Animation
    var anim = data.animation;
    // Get Animation Frame
    var frameAnim = anim.frames[anim.index];
    // If Frame Animation Delay is 0 or less
    if (frameAnim.delay <= 0) {
      // Reset Frame Animation Max Delay
      frameAnim.delay = frameAnim.maxDelay;
      // Get MAx Frames
      var maxFrames = anim.frames.length;
      // If Animation has reached the end
      if (anim.index >= maxFrames-1) {
        // If Animation loops is more than 0
        if (anim.loops > 0) {
          // Decrease Animation loop count
          anim.loops--
          // Increase Index
          anim.index = (anim.index + 1) % maxFrames;             
        } else {
          // Remove Custom Frame Animation
          this.removeCustomFrameAnimation()
        };
      } else {
        // Increase Index
        anim.index = (anim.index + 1) % maxFrames;        
      };
      // Set Custom Frame Index
      this.setCustomFrameIndex(anim.frames[anim.index].frame)
    } else {
      // Decrease Frame Animation Delay
      frameAnim.delay--;
    };
  };
};


//=============================================================================
// ** Sprite_Picture
//-----------------------------------------------------------------------------
// The sprite for displaying a picture.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.CustomPictureControls.Sprite_Picture_initialize = Sprite_Picture.prototype.initialize;
_TDS_.CustomPictureControls.Sprite_Picture_updateOther = Sprite_Picture.prototype.updateOther;
_TDS_.CustomPictureControls.Sprite_Picture_updateBitmap = Sprite_Picture.prototype.updateBitmap
//=============================================================================
// * Object Initialization
//=============================================================================
Sprite_Picture.prototype.initialize = function(pictureId) {  
  // Get Picture Object
  let picture = $gameScreen.picture(pictureId);
  // If picture exists and it has frame data
  if (picture && picture._frameData) {
    // Set Refresh frame flag to true
    picture._frameData.refreshFrame = true;
  };
  // Run Original Function
  _TDS_.CustomPictureControls.Sprite_Picture_initialize.call(this, pictureId);
};
//=============================================================================
// * Update Bitmap
//=============================================================================
Sprite_Picture.prototype.updateBitmap = function() {
  // Run Original Function
  _TDS_.CustomPictureControls.Sprite_Picture_updateBitmap.call(this);
  // Get Picture Object
  var picture = this.picture();
  // If Picture Exists
  if (picture) {
    // If Picture has frame data
    if (picture._frameData) {
      // Update Custom Frame
      this.updateCustomFrame();
    } else {
      // Reset Frame
      this.resetFrame()      
    };
  };
};
//=============================================================================
// * Object Initialize
//=============================================================================
Sprite_Picture.prototype.updateOther = function() {
  // Run Original Function
  _TDS_.CustomPictureControls.Sprite_Picture_updateOther.call(this);
  // Update Custom Frame
  this.updateCustomFrame();
};
//=============================================================================
// * Update Custom Frame
//=============================================================================
Sprite_Picture.prototype.updateCustomFrame = function() {
  // Get Picture Data
  var picture = this.picture();
  // If Picture Frame needs Refresh
  if (picture && picture.needsFrameRefresh()) {
    // Get Custom Frame
    var rect = picture.customFrame();
    // Set Frame
    this.setFrame(rect.x, rect.y, rect.width, rect.height);
    // Set Refresh Flag to false
    picture._frameData.refreshFrame = false;
  };
};
//=============================================================================
// * Reset Frame
//=============================================================================
Sprite_Picture.prototype.resetFrame = function() {
  // If Bitmap Exist
  if (this.bitmap) {
    // Set Frame
    this.setFrame(0, 0, this.bitmap.width, this.bitmap.height);      
  } else {
    // Clear Frame
    this.setFrame(0, 0, 0, 0);          
  }
};
