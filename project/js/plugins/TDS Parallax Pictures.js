//=============================================================================
// TDS Parallax Pictures
// Version: 1.0
//=============================================================================
// Add to Imported List
var Imported = Imported || {} ; Imported.TDS_ParallaxPictures = true;
// Initialize Alias Object
var _TDS_ = _TDS_ || {} ; _TDS_.ParallaxPictures = _TDS_.ParallaxPictures || {};
//=============================================================================
 /*:
 * @plugindesc
 * Adds the ability to set parallax effects to pictures
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
// * Set Picture as Parallax
//=============================================================================
Game_Interpreter.prototype.changeParallaxPictureSpeed = function(pictureId, xSpeed, ySpeed) {
  // Get Picture
  var picture = $gameScreen.picture(pictureId);
  // If Picture Exists
  if (picture) {
    // Set Picture X & Y Speeds
    picture._parallaxRect.x = xSpeed == undefined ? picture._parallaxRect.x : xSpeed;
    picture._parallaxRect.y = ySpeed == undefined ? picture._parallaxRect.y : ySpeed;
  };
};
//=============================================================================
// * Set Picture as Parallax
//=============================================================================
Game_Interpreter.prototype.setPictureAsParallax = function(width, height, xSpeed = 0, ySpeed = 0) {
  // If Next Event Code is 231
  if (this.nextEventCode() === 231) {
    // Increase Index
    this._index++;
    // Get Command
    var command = this.currentCommand();
    // Set Parameters and Indentation
    this._params = command.parameters;
    this._indent = command.indent;
    // Run Show Picture Command
    this.command231();
    // Get Picture
    var picture = $gameScreen.picture(this._params[0])
    // Setup Parallax
    picture.setupParallax(xSpeed, ySpeed, width, height);
  };
};



//=============================================================================
// ** Game_Picture
//-----------------------------------------------------------------------------
// The game object class for a picture.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.ParallaxPictures.Game_Picture_initBasic = Game_Picture.prototype.initBasic;
//=============================================================================
// * Initialize Basic Values
//=============================================================================
Game_Picture.prototype.initBasic = function() {
  // Run Original Function
  _TDS_.ParallaxPictures.Game_Picture_initBasic.call(this);
  // Clear Parallax
  this.clearParallax();
};
//=============================================================================
// * If Picture is Parallax
//=============================================================================
Game_Picture.prototype.isParallax = function() { return this._useParallax; };
//=============================================================================
// * Set Parallax
//=============================================================================
Game_Picture.prototype.setupParallax = function(x, y, width, height) { 
  // Set Parallax flag to true
  this._useParallax = true;
  // Set Parallax X & Y Speeds
  this._parallaxRect.x = x; this._parallaxRect.y = y;
  // Set Width & Height
  this._parallaxRect.width = width; this._parallaxRect.height = height;
};
//=============================================================================
// * Set Picture as Parallax
//=============================================================================
Game_Picture.prototype.clearParallax = function() { 
  // Set Use Parallax Flag to false
  this._useParallax = false;
  // Set Parallax Speeds
  this._parallaxRect = new Rectangle(0, 0, 0, 0)
};





//=============================================================================
// ** Sprite_Picture
//-----------------------------------------------------------------------------
// The sprite for displaying a picture.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.ParallaxPictures.Sprite_Picture_refresh     = Sprite_Picture.prototype._refresh
_TDS_.ParallaxPictures.Sprite_Picture_updateOther = Sprite_Picture.prototype.updateOther;
//=============================================================================
// * Refresh
//=============================================================================
Sprite_Picture.prototype._refresh = function() {
  // Get Picture
  var picture = this.picture();
  // If Picture exists
  if (picture) {
    // If Picture is Parallax
    if (picture.isParallax()) {
      // If Parallax Sprite does not Exists
      if (!this._parallaxSprite) {
        // Create Parallax Sprite
        this._parallaxSprite = new TilingSprite();
        this.addChild(this._parallaxSprite);
      };
      // Set Parallax Sprite Bitmap
      this._parallaxSprite.bitmap = this.bitmap;
      // Get Parallax Rectangle
      var rect = picture._parallaxRect;
      // Move Parallax Sprite
      this._parallaxSprite.move(this.x, this.y, rect.width, rect.height)
      // Remove Bitmap
      this.bitmap = null;
    } else {
      // If Parallax Sprite Exists
      if (this._parallaxSprite) { this.removeChild(this._parallaxSprite); };
    };
  };
  // Run Original Function
  _TDS_.ParallaxPictures.Sprite_Picture_refresh.call(this);
};
//=============================================================================
// * Update Other
//=============================================================================
Sprite_Picture.prototype.updateOther = function() {
  // Run Original Function
  _TDS_.ParallaxPictures.Sprite_Picture_updateOther.call(this);
  // If There is a Parallax Sprite
  if (this._parallaxSprite) {
    // Get Picture
    var picture = this.picture();
    var rect = picture._parallaxRect;
    this._parallaxSprite.origin.x += rect.x;
    this._parallaxSprite.origin.y += rect.y;
  };
};