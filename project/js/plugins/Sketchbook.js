//=============================================================================
// TDS Sketchbook
// Version: 1.0
//=============================================================================
// Add to Imported List
var Imported = Imported || {} ; Imported.TDS_SketchBook = true;
// Initialize Alias Object
var _TDS_ = _TDS_ || {} ; _TDS_.SketchBook = _TDS_.SketchBook || {};
//=============================================================================
 /*:
 * @plugindesc
 * Sketchbook scene.
 *
 * @author TDS
 *
 */
//=============================================================================

// Use Strict  
"use strict";
//=============================================================================
// ** Scene_Sketchbook
//-----------------------------------------------------------------------------
// Scene for handling sketchbook processing.
//=============================================================================
function Scene_Sketchbook() { this.initialize.apply(this, arguments); };
Scene_Sketchbook.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Sketchbook.prototype.constructor = Scene_Sketchbook;
//=============================================================================
// * Object Initialization
//=============================================================================
Scene_Sketchbook.prototype.initialize = function() {
  // Album Settings
  this._page = 0;
  this._maxPages = $gameVariables.value(42);
  this._sketchBookName = $gameVariables.value(43);
  // Get Size
  var size = $gameVariables.value(41);
  this._width = size[0];
  this._height = size[1];
  // Super Call
  Scene_MenuBase.prototype.initialize.call(this);
};
//=============================================================================
// * Initialize Atlas Lists
//=============================================================================
Scene_Sketchbook.prototype.initAtlastLists = function() {
  // Run Original Function
  Scene_MenuBase.prototype.initAtlastLists.call(this);
  // Get Bitmap Name
  var bitmapName = this._sketchBookName + this._page;
  // Get Atlas Path
  var atlasPath = 'img/pictures/' + bitmapName + '.png';    
  // Get Atlas Name
  var atlasName = AtlasManager.getImageAtlasName(atlasPath);
  // If Atlas name exists
  if (atlasName) { this.addRequiredAtlas(atlasName); }
};
//=============================================================================
// * Create
//=============================================================================
Scene_Sketchbook.prototype.create = function() {
  // Super Call
  Scene_MenuBase.prototype.create.call(this);
  // Create Objects
  this.createSketchWindow();
  this.createSketchBookSprite();
  this.createCursorSprites();
  this.onPageChange();
};
//=============================================================================
// * Create Sketch Window
//=============================================================================
Scene_Sketchbook.prototype.createSketchWindow = function() {
  // Create Back Window
  this._backWindow = new Window_Base(0, 0, this._width, this._height);
  this._backWindow.x = (Graphics.width - this._backWindow.width) / 2;
  this._backWindow.y = (Graphics.height - this._backWindow.height) / 2;  
  this.addChild(this._backWindow);
};
//=============================================================================
// * Create SketchBook Sprite
//=============================================================================
Scene_Sketchbook.prototype.createSketchBookSprite = function() {
  this._sketchBookSprite = new Sprite();
  this._sketchBookSprite.x = this._backWindow.x + 10;
  this._sketchBookSprite.y = this._backWindow.y + 10;
  this.addChild(this._sketchBookSprite);
};
//=============================================================================
// * Create Cursor Sprites
//=============================================================================
Scene_Sketchbook.prototype.createCursorSprites = function() {
  // Get Cursor Bitmap
  var bitmap = ImageManager.loadSystem("ACSArrows");

  this._leftCursorSprite = new Sprite(bitmap);
  this._leftCursorSprite.anchor.set(0.5, 0.5);
  this._leftCursorSprite.setFrame(64, 0, 32, 29);
  this._leftCursorSprite.x = this._backWindow.x - 10;
  this._leftCursorSprite.y = this._backWindow.y + (this._backWindow.height / 2)
  this.addChild(this._leftCursorSprite);

  this._rightCursorSprite = new Sprite(bitmap);
  this._rightCursorSprite.anchor.set(0.5, 0.5);
  this._rightCursorSprite.setFrame(32, 0, 32, 29);
  this._rightCursorSprite.x = this._backWindow.x + this._backWindow.width + 10;
  this._rightCursorSprite.y = this._backWindow.y + (this._backWindow.height / 2)
  this.addChild(this._rightCursorSprite);
};
//=============================================================================
// * Frame Update
//=============================================================================
Scene_Sketchbook.prototype.update = function() {
  // Super call
  Scene_MenuBase.prototype.update.call(this);
  // Update Cursor Animation
  this._leftCursorSprite.anchor.x = 0.5 - (Math.sin(Graphics.frameCount * 0.2) * 0.1);
  this._rightCursorSprite.anchor.x = 0.5 + (Math.sin(Graphics.frameCount * 0.2) * 0.1);

  if (Input.isRepeated('left')) {
    if (this._page > 0) {
      // Play Cursor sound
      SoundManager.playCursor();
      // Reduce Page
      this._page--;
      // On Page Change
      this.onPageChange();
    };
    return
  }

  if (Input.isRepeated('right')) {
    if (this._page < this._maxPages) {
      // Play Cursor sound
      SoundManager.playCursor();
      // Increase Page
      this._page++;
      // On Page Change
      this.onPageChange();
    };
    return
  }

  if (Input.isTriggered('menu')) {
    this.popScene();
    return
  }  
};
//=============================================================================
// * On Page Change
//=============================================================================
Scene_Sketchbook.prototype.onPageChange = function() {
  // Update Cursor Visibility
  this._leftCursorSprite.visible = this._page > 0;
  this._rightCursorSprite.visible = this._page < this._maxPages;
  // Set Sketcbook Sprite Bitmap
  this._sketchBookSprite.bitmap = ImageManager.loadPicture(this._sketchBookName + this._page)
};





// //=============================================================================
//  /*:
//  * @plugindesc
//  * Sketchbook menu
//  *
//  * @author rhyme
//  */

// //-----------------------------------------------------------------------------
// // Scene_Sketchbook
// //-----------------------------------------------------------------------------
// function Scene_Sketchbook() {
//     this.initialize.apply(this, arguments);
// }

// Scene_Sketchbook.prototype = Object.create(Scene_MenuBase.prototype);
//     Scene_Sketchbook.prototype.constructor = Scene_Sketchbook;

// // Initialize
// //-----------------------------------------------------------------------------
// Scene_Sketchbook.prototype.initialize = function() {
//     Scene_MenuBase.prototype.initialize.call(this);
// };

// Scene_Sketchbook.prototype.create = function() {
//     Scene_MenuBase.prototype.create.call(this);
//     this.createSketchWindow();
//     this.createSprites();
// };

// Scene_Sketchbook.prototype.createSketchWindow = function() {
//     this._sketchWindow = new Window_Sketchbook();
//     this.addWindow(this._sketchWindow);
// };

// Scene_Sketchbook.prototype.createSprites = function() {
//     var cursorImage = ImageManager.loadSystem("ACSArrows", 0);
//     this._spriteForeground = new Sprite();
//     this._spriteForeground.setFrame(0, 0, Graphics.width, Graphics.height);
//     this._spriteCursorLeft = new Sprite(cursorImage);
//     this._spriteCursorLeft.setFrame(32, 0, 32, 29);
//     this._spriteCursorLeft.x = Math.min(this._sketchWindow.x + this._sketchWindow.width - 16, Graphics.width - 36);
//     this._spriteCursorLeft.y = (Graphics.height / 2) - 15;
//     this._spriteCursorRight = new Sprite(cursorImage);
//     this._spriteCursorRight.setFrame(64, 0, 32, 29);
//     this._spriteCursorRight.x = Math.max(this._sketchWindow.x - 16, 36);
//     this._spriteCursorRight.y = (Graphics.height / 2) - 15;
//     this.addChild(this._spriteForeground);
//     this._spriteForeground.addChild(this._spriteCursorLeft);
//     this._spriteForeground.addChild(this._spriteCursorRight);
//     this._customCursorAngle = 0;
// };

// // Update
// //-----------------------------------------------------------------------------
// Scene_Sketchbook.prototype.update = function() {
//     Scene_MenuBase.prototype.update.call(this);
//     this._customCursorAngle = ((this._customCursorAngle + 0.15) % 50);
//     this._spriteCursorLeft.anchor.x =  0.5 - 0.1 * Math.sin(this._customCursorAngle);
//     this._spriteCursorRight.anchor.x = 0.5 + 0.1 * Math.sin(this._customCursorAngle);
//     if (this._sketchWindow.page() == 0) {
//         this._spriteCursorRight.visible = false;
//     } else {
//         this._spriteCursorRight.visible = true;
//     }
//     if (this._sketchWindow.page() == $gameVariables.value(10)) {
//         this._spriteCursorLeft.visible = false;
//     } else {
//         this._spriteCursorLeft.visible = true;
//     }
//     if (Input.isTriggered('left')) {
//         this._sketchWindow.prevPage();
//     }
//     if (Input.isTriggered('right')) {
//         this._sketchWindow.nextPage();
//     }
//     if (Input.isTriggered('menu')) {
//         this.popScene();
//     }
