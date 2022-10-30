//=============================================================================
// TDS Text Effects
// Version: 1.0
//=============================================================================
// Add to Imported List
var Imported = Imported || {} ; Imported.TDS_TextEffects = true;
// Initialize Alias Object
var _TDS_ = _TDS_ || {} ; _TDS_.TextEffects = _TDS_.TextEffects || {};
//=============================================================================
 /*:
 * @plugindesc
 * Text Effects.
 *
 * @author TDS
 *
 * @param Effects
 *
 * @param SINV
 * @text Vertical Sinusoidal
 * @parent Effects
 * @type struct<SINVEffect>[]
 * @default []
 * @desc Vertical Sinusoidal wave effect. (Moves up and down in a wave)
 *
 * @param SINH
 * @text Horizontal Sinusoidal
 * @parent Effects
 * @type struct<SINHEffect>[]
 * @default []
 * @desc Horizontal Sinusoidal wave effect. (Moves left and right in a wave) 
 *
 * @param SHAKE
 * @text Shake
 * @parent Effects
 * @type struct<SHAKEEffect>[]
 * @default []
 * @desc Makes the text shake based on power set.
 *
 * @param RAINBOW
 * @text Rainbow
 * @parent Effects
 * @type struct<RAINBOWEffect>[]
 * @default []
 * @desc Cycles through colors to create a rainbow effect on the text.
 */

//=============================================================================
// * Parameter Structures
//=============================================================================
/*~struct~SINVEffect:
 * @param spacing
 * @text Spacing
 * @type number
 * @default 1
 * @desc Separation value of the wave.
 *
 * @param speed
 * @text Speed
 * @type number
 * @decimals 2
 * @default 0.50
 * @desc Movement speed of the wave.
 *
 * @param amplitude
 * @type Amplitude
 * @type number 
 * @decimals 2
 * @default 0.15
 * @desc Amount of space to move vertically up and down.
 *
 */ 
/*~struct~SINHEffect:
 * @param spacing
 * @text Spacing
 * @type number
 * @default 1
 * @desc Separation value of the wave.
 *
 * @param speed
 * @text Speed
 * @type number
 * @decimals 2
 * @default 0.50
 * @desc Movement speed of the wave.
 *
 * @param amplitude
 * @type Amplitude
 * @type number 
 * @decimals 2
 * @default 0.15
 * @desc Amount of space to move vertically up and down.
 *
 * @param anchor
 * @type Anchor
 * @type boolean 
 * @default false
 * @desc Use anchor point instead of X coordinate.
 * 
 */ 
/*~struct~SHAKEEffect:
 * @param powerX
 * @text Power X
 * @type number
 * @default 3
 * @desc X-Axis shaking power.
 *
 * @param powerY
 * @text Power Y
 * @type number
 * @default 3
 * @desc Y-Axis shaking power.
 *
 * @param timing
 * @text Timing
 * @type number
 * @default 1
 * @desc Amount of time to wait in frames between each movement.
 * 
 */ 
 /*~struct~RAINBOWEffect:
 * @param speed
 * @type Speed
 * @type number 
 * @decimals 2
 * @default 0.30
 * @desc Cycle speed for the rainbow
 *
 * @param amplitude
 * @text Amplitude
 * @type number
 * @default 128
 * @desc Amount of opacity to apply to rainbow cycles.
 *
 * @param center
 * @text Center
 * @type number
 * @default 128
 * @desc Opacity color from which amplitude will move to and from.
 * 
 * @param redPhase
 * @text Red Phase
 * @type number
 * @default 2
 * @desc Red color phase. Used for color application in the cycle.
 * 
 * @param greenPhase
 * @text Green Phase
 * @type number
 * @default 4
 * @desc Green color phase. Used for color application in the cycle.
 * 
 * @param bluePhase
 * @text Blue Phase
 * @type number
 * @default 6
 * @desc Blue color phase. Used for color application in the cycle.
 * 
 * @param opacity
 * @text Opacity
 * @type number
 * @default 255
 * @desc Base opacity of the rainbow color.
 *
 * @param useWaveOpacity
 * @text Use Wave Opacity
 * @type boolean
 * @default false
 * @desc If true it applies a wave effect to the opacity of the rainbow. 
 */ 
// Node.js path
var path = require('path');
// Get Parameters
var parameters = PluginManager.parameters("TDS Text Effects");
// Initialize After Battle Commmon Event Parameters
_TDS_.TextEffects.params = {};
_TDS_.TextEffects.letterEffects = {}

// List of Letter Effects
var letterEffects = ['SINV', 'SINH', 'SHAKE', 'RAINBOW']
// Go through letter effects
for (var i = 0; i < letterEffects.length; i++) {
  // Get Letter Effect Name
  var name = letterEffects[i];
  // Get Data List
  var dataList = JSON.parse(parameters[name]);
  // Initialize Letter Effects List
  var list = _TDS_.TextEffects.letterEffects[name] = [];
  // Go Through Data list
  for (var i2 = 0; i2 < dataList.length; i2++) {
    // Get Data
    var data = JSON.parse(dataList[i2])
    // Parse data
    Object.keys(data).map(function(key, index) { data[key] = JSON.parse(data[key])});
    // Set Data name
    data.name = name
    // Add data to list
    list.push(data);
  };
};


//=============================================================================
// ** Bitmap
//-----------------------------------------------------------------------------
// The basic object that represents an image.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.TextEffects.Bitmap_initialize = Bitmap.prototype.initialize;
_TDS_.TextEffects.Bitmap_drawText = Bitmap.prototype.drawText;
//=============================================================================
// * Object Initialization
//=============================================================================
Bitmap.prototype.initialize = function(width, height) {
  // Text Drawing Block flag
  this._blockTextDrawing = false;
  // Run Original Function
  _TDS_.TextEffects.Bitmap_initialize.call(this, width, height);
};
//=============================================================================
// * Block or Unblock text drawing
//=============================================================================
Bitmap.prototype.blockTextDrawing = function() { this._blockTextDrawing = true; }
Bitmap.prototype.unblockTextDrawing = function() { this._blockTextDrawing = false; }
//=============================================================================
// * Draw Text
//=============================================================================
Bitmap.prototype.drawText = function(text, x, y, maxWidth, lineHeight, align) {
  // If Block Text Drawing
  if (this._blockTextDrawing) { return; }
  // Run Original Function
  _TDS_.TextEffects.Bitmap_drawText.call(this, text, x, y, maxWidth, lineHeight, align);
};



//=============================================================================
// ** Window_Base
//-----------------------------------------------------------------------------
// The game object class for the party. Information such as gold and items is
// included.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.TextEffects.Window_Base__createAllParts = Window_Base.prototype._createAllParts;
_TDS_.TextEffects.Window_Base_initialize = Window_Base.prototype.initialize;
_TDS_.TextEffects.Window_Base_update = Window_Base.prototype.update
_TDS_.TextEffects.Window_Base_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter 
_TDS_.TextEffects.Window_Base_processNormalCharacter = Window_Base.prototype.processNormalCharacter;
//=============================================================================
// * Object Initialize
//=============================================================================
Window_Base.prototype.initialize = function(x, y, width, height) {
  // Initialize Letter Effects
  this.initLetterEffects();  
  // Super Call
  _TDS_.TextEffects.Window_Base_initialize.call(this, x, y, width, height);
};
//=============================================================================
// * Create All Parts
//=============================================================================
Window_Base.prototype._createAllParts = function() {
  // Super Call
  _TDS_.TextEffects.Window_Base__createAllParts.call(this);
  // Create Letter container
  this.createLetterEffectContainer();
};
//=============================================================================
// * Process Normal Character
//=============================================================================
Window_Base.prototype.processNormalCharacter = function(textState) {
  // If Character is not empty
  if (this.canCreateLetterEffectSprite()) {
    // Create Letter Effect Sprite
    this.createLetterEffectSprite(textState);
    // Block Text Drawing
    this.contents.blockTextDrawing();
  };
  // // Block Text Drawing
  // this.contents.unblockTextDrawing();


  // Super Call
  _TDS_.TextEffects.Window_Base_processNormalCharacter.call(this, textState);
};
//=============================================================================
// * Process Escape Character
//=============================================================================
Window_Base.prototype.processEscapeCharacter = function(code, textState) {
  // If Not ignoring letter effec escape codes
  if (!this.isIgnoringLetterEffectEscapeCodes()) {  
    switch (code) {
      case 'LETAG': // Tag effects
        // Set Letter Effect Tag
        this._letterEffectTag = this.obtainEscapeParam(textState);
      break
      case 'LESTP': // Stop all tagged
        // Get Tag
        var tag = this.obtainEscapeParam(textState);      
        // Go Through Letter Effects
        for (var i = 0; i < this._letterEffects.length; i++) {
          // Get Letter Effect
          var effect = this._letterEffects[i];
          // If the effect has a matching tag
          if (effect.tag === tag) {
            // Deactivate Effect
            effect.active = false
          };
        };
      break
      case 'LESYNCH':
        // Set Letter Effect Synch index
        this._letterEffectSynchIndex = this.obtainEscapeParam(textState);
      break
      case 'LETMR': // Set Timer
        // Get Time
        var time = this.obtainEscapeParam(textState);
        // If Time is 0
        if (time === 0) {
          // Set timer to null
          this._letterEffectTimer = null;
        } else {
          // Set Letter Effect timer time
          this._letterEffectTimer = time;
        };      
      break
      case 'LECLEAR': // Clear All Letter Effects
        // Go Through Letter Effects
        for (var i = 0; i < this._letterEffects.length; i++) {
          // Get Letter Effect
          var effect = this._letterEffects[i];
          // If the effect has no end index
          if (effect.endIndex === Infinity) {
            // Set Letter Effect End Index
            effect.endIndex = textState.index;
          };
        };        
        // Increase Text State Index (Accounts for needed space)
        textState.index++
      break;
      case 'SINV':
        // Setup Letter Effect
        this.setupLetterEffect(code, this.obtainEscapeParam(textState), textState);
      break;
      case 'SINH':
        // Setup Letter Effect
        this.setupLetterEffect(code, this.obtainEscapeParam(textState), textState);
      break;      
      case 'QUAKE':
        // Setup Letter Effect
        this.setupLetterEffect('SHAKE', this.obtainEscapeParam(textState), textState);
        break;
      case 'RAINBOW':
        // Setup Letter Effect
        this.setupLetterEffect(code, this.obtainEscapeParam(textState), textState);
        break;
    };
  };
  // Run Original Function
  _TDS_.TextEffects.Window_Base_processEscapeCharacter.call(this, code, textState);
};
//=============================================================================
// * Frame Update
//=============================================================================
Window_Base.prototype.update = function() {
  // Run Original Function
  _TDS_.TextEffects.Window_Base_update.call(this);
  // Update Letter Effects
  this.updateLetterEffects();
};
//=============================================================================
// * Initialize Letter Effects
//=============================================================================
Window_Base.prototype.initLetterEffects = function() {
  // Clear Letter Effect Sprites
  this.clearLetterEffectSprites();  
  // Initialize Letter Efffect Sprites
  this._letterEffectSprites = [];
  // Array of Letter Effects
  this._letterEffects = []
  // Array of Finished Letter Effects
  this._finishedLetterEffects = [];
  // Letter Effects Active flag
  this._letterEffectsActive = false;
  // Set Letter Effect Tag
  this._letterEffectTag = 0;
  // Set Letter Effect Timer to null
  this._letterEffectTimer = null;
  // Synch Next Letter Effect Sprite
  this._synchNextLetterEffectSprite = false;
  // Letter Effect Synch Index
  this._letterEffectSynchIndex = null;
};
//=============================================================================
// * Create Letter Container
//=============================================================================
Window_Base.prototype.createLetterEffectContainer = function() {
  // Create Letter container sprite
  this._letterEffectContainerSprite = new Sprite();
  this.addChild(this._letterEffectContainerSprite);
};
//=============================================================================
// * Determine if Letter Effect Sprite can be created
//=============================================================================
Window_Base.prototype.canCreateLetterEffectSprite = function() {
  if (this._checkWordWrapMode) { return false; }
  if (this._letterEffectsActive) { return true; }
  return false
};
//=============================================================================
// * Determine if Letter Effect Effect Escape Codes should be ignored
//=============================================================================
Window_Base.prototype.isIgnoringLetterEffectEscapeCodes = function() {
  if (this._checkWordWrapMode) { return true; }
  return false
};
//=============================================================================
// * Clear Letter Effect Sprites
//=============================================================================
Window_Base.prototype.clearLetterEffectSprites = function() {
  // If Letter Effect Sprites Exist
  if (this._letterEffectSprites) {
    // Go through Letter Effect Sprites
    for (var i = 0; i < this._letterEffectSprites.length; i++) {
      // Remove Child From container
      this._letterEffectContainerSprite.removeChild(this._letterEffectSprites[i]);
    };
  };
};
//=============================================================================
// * Setup Letter Effect
//=============================================================================
Window_Base.prototype.setupLetterEffect = function(code, index, textState) {
  // If Index is 0 (Stop)
  if (index === 0) {
    // Set Letter Effect End Index
    this.setLetterEffectEndIndex(code, textState);
  } else {
    // Add Letter Effect
    this.addLetterEffect(this.getLetterEffectBase(code, index-1, textState));
  };
  // If there are Letter Effects
  if (this._letterEffects.length > 0) {
    // Check Effect Active State
    var active = this._letterEffects.some(function(effect) {
      return textState.index < effect.endIndex;
    }, this);
    // Set Letter Effects Active Flag
    this._letterEffectsActive = active;
    // Bock or Unlock Text drawing
    active ? this.contents.blockTextDrawing() : this.contents.unblockTextDrawing()
  };

};
//=============================================================================
// * Add Letter Effect
//=============================================================================
Window_Base.prototype.getLetterEffectBase = function(name, index, textState) {
  // Create Effect
  var effect = Object.assign({active: true, tag: this._letterEffectTag, startIndex: textState.index, endIndex: Infinity}, _TDS_.TextEffects.letterEffects[name][index])
  // Set Timer
  if (this._letterEffectTimer !== null) { effect.timer = 60; };
  // Return Effect
  return effect
};
//=============================================================================
// * Add Letter Effect
//=============================================================================
Window_Base.prototype.addLetterEffect = function(effect) {
  // Add Letter Effec to Array
  this._letterEffects.push(effect);
  // Return effect
  return effect;
};
//=============================================================================
// * Set Letter Effect End Index
//=============================================================================
Window_Base.prototype.setLetterEffectEndIndex = function(name, textState) {
  // Go Through Letter Effects
  for (var i = 0; i < this._letterEffects.length; i++) {
    // Get Letter Effect
    var lEffect = this._letterEffects[i];
    // If It's a 
    if (lEffect.name === name && lEffect.endIndex === Infinity) {
      // Set Letter Effect End Index
      lEffect.endIndex = textState.index;
    };
  };  
};
//=============================================================================
// * Create Letter Effect Sprite
//=============================================================================
Window_Base.prototype.createLetterEffectSprite = function(textState) {
  // Get Character
  var c = textState.text[textState.index];
  // Get Character width
  var w = Math.round(this.textWidth(c));
  // If Character Is empty
  if (c === ' ') { return; }
  // Create Bitmap
  var bitmap = new Bitmap(w, textState.height + 10);
  // Copy Bitmap Settings
  bitmap.fontFace = this.contents.fontFace;
  bitmap.fontSize = this.contents.fontSize;
  bitmap.textColor = this.contents.textColor;

  // bitmap.fillAll('rgba(255, 0, 0, 0.5)')
  // Draw Character
  bitmap.drawText(c, 0, 0, bitmap.width, bitmap.height, 'center');
  // Create Sprite
  var sprite = new Sprite(bitmap)

  var padding = this.standardPadding();
  sprite.x = textState.x + padding;
  sprite.y = textState.y + padding - 5;


  // sprite.x = Math.floor(textState.x + padding + (w / 2));
  // sprite.y = textState.y + padding + (textState.height / 2) + 5;
  // sprite.x += 250;
  // sprite.y += 30
  // sprite.anchor.set(0.5, 0.5)
  // sprite.pivot.set(sprite.width / 2, (sprite.height / 2) + 5 )

    // sprite.scale.x += 0.1

    // sprite.pivot.set(0, 0);
    // sprite.anchor.set(0.5, 0.5)
    // sprite.scale.y += 0.1
    // sprite.rotation = 0 + (Math.sin((Graphics.frameCount + (index * 1)) * 0.1) * 1)    


  // Set Effect Data
  sprite._effectData = {origin: new Point(sprite.x, sprite.y), offset: new Point(), index: textState.index, position: this._letterEffectSprites.length, tag: this._letterEffectTag }
  // Add Sprite to Letter Sprites Array
  this._letterEffectSprites.push(sprite);
  // Add Sprite as Child to container
  this._letterEffectContainerSprite.addChild(sprite)  
  // If Letter Effect Synch index is not null
  if (this._letterEffectSynchIndex !== null) {
    // Go Through Letter Effects
    for (var i = 0; i < this._letterEffects.length; i++) {
      // Get Letter Effect
      var effect = this._letterEffects[i];
      // If the effect has a matching tag
      if (effect.tag === this._letterEffectSynchIndex) {
        // Set Effect Synch Sprite
        effect.synchSprite = sprite;
      };
    };
    // Set Letter Effect synch index to null
    this._letterEffectSynchIndex = null;
  }
};
//=============================================================================
// * Update Letter Effects
//=============================================================================
Window_Base.prototype.updateLetterEffects = function() {
  // Set Letter Effects Container Sprite Visibility
  this._letterEffectContainerSprite.visible = this.isOpen();
  // Get Letter Sprites
  var letterSprites = this._letterEffectSprites;
  // If Letter Effects Exist
  if (letterSprites.length > 0) {
    // Go through Letter Effects
    for (var i = 0; i <  this._letterEffects.length; i++) {
      // Get Effect
      var effect = this._letterEffects[i];
      // Get Synch Sprite
      var synchSprite = effect.synchSprite;
      // Go through Letter Sprites
      for (var i2 = 0; i2 < this._letterEffectSprites.length; i2++) {
        // Get Sprite
        var sprite = this._letterEffectSprites[i2];
        // If Synch Sprite Exists
        if (synchSprite) {
          // If Sprite matches synch sprite
          if (sprite === synchSprite) {
            // Apply Letter Effect to Sprite
            this.applyLetterEffectToSprite(effect, sprite);
          } else {
            // Get Effect Data
            var synchEffectData = synchSprite._effectData;
            var effectData = sprite._effectData;
            // If Effect Data Matches Effect Tag
            if (effectData.tag === effect.tag) {
              // Set Sprite Anchor
              sprite.anchor.set(synchSprite.anchor.x, synchSprite.anchor.y)
              // Set Sprite Position
              sprite.x = effectData.origin.x + synchEffectData.offset.x
              sprite.y = effectData.origin.y + synchEffectData.offset.y

              sprite.rotation = synchSprite.rotation;

              sprite.setBlendColor(synchSprite._blendColor)
            }
          }
        } else {
          // Apply Letter Effect to Sprite
          this.applyLetterEffectToSprite(effect, sprite);    
        };
      };
      // If Effect has a timer
      if (effect.timer && effect.endIndex !== Infinity) {
        // Decrease Effect Timer
        effect.timer--;
        // If Effect timer is 0 or less
        if (effect.timer <= 0) { effect.active = false; };
      };
      // Add Effect to Finished Letter Effects array if not active
      if (!effect.active) { this._finishedLetterEffects.push(effect) }
    };

    // If Finished Letter Effects has members
    if (this._finishedLetterEffects.length > 0) {
      // Get removed Indexes
      var removedIndexes = []
      // Go through finished effects
      for (var i = 0; i < this._finishedLetterEffects.length; i++) {
        // Get Effect
        var effect = this._finishedLetterEffects[i];
        // Get Index of Effect
        var index = this._letterEffects.indexOf(effect);
        // Remove Effect
        if (index >= 0) { this._letterEffects.splice(index, 1); } 
        // Add indexes to removed indexes array
        removedIndexes.push([effect.startIndex, effect.endIndex])
      };
      // Go through Letter Sprites
      for (var i = 0; i < this._letterEffectSprites.length; i++) {
        // Get Sprite
        var sprite = this._letterEffectSprites[i]  
        // Get Sprite Effect Data
        var effectData = sprite._effectData;
        // Reset Sprite Position
        sprite.x = effectData.origin.x
        sprite.y = effectData.origin.y        
        sprite.setBlendColor([0, 0, 0, 0])
      };
      // Clear Finished Letter Effects Array
      this._finishedLetterEffects = []
    };
  };
};
//=============================================================================
// * Apply Letter Effect to Sprite
//=============================================================================
Window_Base.prototype.applyLetterEffectToSprite = function(effect, sprite) {
  // Get Sprite Effect Data
  var effectData = sprite._effectData;
  // Get Index
  var index = effectData.index;
  // Check if Effect should run
  if (!effect.active) { return }
  if (index < effect.startIndex || index >= effect.endIndex) { return; }
  // Switch Case Effect name
  switch (effect.name) {    
    case 'test':
    break;
    case 'SINH':
      // Set Effect Anchor
      if (effect.anchor) { 
        // Set Anchor Position
        sprite.anchor.y = 0 + (Math.sin((Graphics.frameCount + (index * effect.spacing)) * effect.speed) * effect.amplitude)    
      } else {
        effectData.offset.x =  Math.round((Math.sin((Graphics.frameCount + (index * effect.spacing)) * effect.speed) * effect.amplitude))            
        sprite.x = effectData.origin.x + effectData.offset.x;
      }
      break;
    case 'SINV':
      sprite.anchor.y = 0 + (Math.sin((Graphics.frameCount + (index * effect.spacing)) * effect.speed) * effect.amplitude)    
    break
    case 'SHAKE':
      // If Frame Count matches timing
      if (Graphics.frameCount % effect.timing === 0) {
        // Set X & Y Offsets
        if (effect.powerX > 0) { effectData.offset.x = (Math.max(Math.randomInt(effect.powerX), 1) * (Math.randomInt(100) > 50 ? -1 : 1)) };
        if (effect.powerY > 0) { effectData.offset.y = (Math.max(Math.randomInt(effect.powerY), 1) * (Math.randomInt(100) > 50 ? -1 : 1)) };
        // Set Sprite Position
        sprite.x = effectData.origin.x + effectData.offset.x;
        sprite.y = effectData.origin.y + effectData.offset.y;
      };
      break
    case 'RAINBOW':
      var frame = Graphics.frameCount + index;
      var red = Math.sin(effect.speed * frame + effect.redPhase) * effect.amplitude + effect.center
      var green = Math.sin(effect.speed * frame + effect.greenPhase) * effect.amplitude + effect.center
      var blue = Math.sin(effect.speed * frame + effect.bluePhase) * effect.amplitude + effect.center
      var alpha = effect.useWaveOpacity ? Math.sin(effect.speed * frame) * effect.amplitude + effect.center : effect.opacity;
      // Set Sprite Color
      sprite.setBlendColor([red, green, blue, alpha])
    break;    
  }
};



//=============================================================================
// ** Window_Message
//-----------------------------------------------------------------------------
// The window for displaying text messages.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.TextEffects.Window_Message_startMessage = Window_Message.prototype.startMessage;
//=============================================================================
// * Start Message
//=============================================================================
Window_Message.prototype.startMessage = function() {
  // Initialize Letter Effects
  this.initLetterEffects();
  // Run Original Function
  _TDS_.TextEffects.Window_Message_startMessage.call(this);
};

