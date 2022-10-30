//=============================================================================
// TDS Footprints
// Version: 1.6
//=============================================================================
// Add to Imported List
var Imported = Imported || {} ; Imported.TDS_Footprints = true;
// Initialize Alias Object
var _TDS_ = _TDS_ || {} ; _TDS_.Footprints = _TDS_.Footprints || {};
//=============================================================================
 /*:
 * @plugindesc
 * Adds footprints for characters.
 *
 * @author TDS
 *
 */
//=============================================================================



(function($) {
// Use Strict  
"use strict";


//=============================================================================
// ** SceneManager
//-----------------------------------------------------------------------------
// The static class that manages scene transitions.
//=============================================================================
// * Add Footprint
//=============================================================================
SceneManager.addFootprint = function(footprint) {
  // If on Scene Map
  if (SceneManager._scene.constructor === Scene_Map) {
    // Add Footprint object to map
    $gameMap.addFootprint(footprint);    
    // Get Container
    let container = SceneManager._scene._spriteset._footprintsContainer;
    // Add Footprint to container
    container.addFootprint(footprint);    
  };
};



//=============================================================================
// ** Game_CharacterBase
//-----------------------------------------------------------------------------
// The superclass of Game_Character. It handles basic information, such as
// coordinates and images, shared by all characters.
//=============================================================================
// Alias Listing
//=============================================================================
$.Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
$.Game_CharacterBase_moveStraight = Game_CharacterBase.prototype.moveStraight;
//=============================================================================
// * Initialize Members
//=============================================================================
Game_CharacterBase.prototype.initMembers = function() {
  // Run Original Function
  $.Game_CharacterBase_initMembers.call(this);
  // Set Disable Footprints flag
  this._disableFootprints = true;
  // Initialize Footprint position
  this._footprintPos = new Point();
  // Set Last Direction
  this._lastDirection = this._direction;
};
//=============================================================================
// * Determine if Character can create footprints
//=============================================================================
Game_CharacterBase.prototype.canCreateFootprints = function() {
  return !this._disableFootprints;
};
//=============================================================================
// * Move Straight
//=============================================================================
Game_CharacterBase.prototype.moveStraight = function(d) {
  // Get Old Values
  let oldX = this._realX, oldY = this._realY, oldDir = d;
  // Set Last Direction
  this._lastDirection = this._direction;  
  // Run Original Function
  $.Game_CharacterBase_moveStraight.call(this, d);
  // If position has changed
  if (!!this.isMoving()) {
    // Set Footprint Position
    if(typeof this._footprintPos === "undefined") {
      this._footprintPos = new Point();
    }
    this._footprintPos.set(oldX, oldY);
    // Process Footprint Movement    
    this.footprintMovement();
  };
};
//=============================================================================
// * Process Footprint Movement
//=============================================================================
Game_CharacterBase.prototype.footprintMovement = function() {
  // If Can Create Footprints
  if (this.canCreateFootprints()) {
    // Generate Footprint
    let footprint = this.genererateFootprint();
    if(!footprint) {return;}
    // Add Footprint
    SceneManager.addFootprint(footprint);
  };
};
//=============================================================================
// * Name of Character Footprints Graphic
//=============================================================================
Game_CharacterBase.prototype.footprintGraphicsName = function() {
  return 'footprints_turn';
}
//=============================================================================
// * Generate Footprint Object
//=============================================================================
Game_CharacterBase.prototype.genererateFootprint = function() {
  if($gameMap.regionId(this._footprintPos.x, this._footprintPos.y) !== 28) {return null;}
  // Create Footprint Object
  let footprint = new Game_Footprint();
  footprint._graphicsName = this.footprintGraphicsName();  
  footprint._frame = this.pattern();
  footprint._direction = this._direction;
  footprint._lastDirection = this._lastDirection;  
  footprint.setPosition(this._footprintPos.x, this._footprintPos.y);
  // Return Footprint
  return footprint;
};



//=============================================================================
// ** Game_Player
//-----------------------------------------------------------------------------
// The game object class for the player. It contains event starting
// determinants and map scrolling functions.
//=============================================================================
// * Determine if Character can create footprints
//=============================================================================
Game_Player.prototype.canCreateFootprints = function() {
  if ($gameSwitches.value(881)) { return false; };
  if (this.regionId() !== 28) { return false; };
  return true;
};
//=============================================================================
// * Name of Character Footprints Graphic
//=============================================================================
Game_Player.prototype.footprintGraphicsName = function() {
  if ($gameSwitches.value(84)) { return 'bloody_footprints'}
  return 'footprints_turn';
};



//=============================================================================
// ** Game_Follower
//-----------------------------------------------------------------------------
// The game object class for a follower. A follower is an allied character,
// other than the front character, displayed in the party.
//=============================================================================
// * Determine if Character can create footprints
//=============================================================================
Game_Follower.prototype.canCreateFootprints = function() {
  return false
};



//=============================================================================
// ** Game_Map
//-----------------------------------------------------------------------------
// The game object class for a map. It contains scrolling and passage
// determination functions.
//=============================================================================
// Alias Listing
//=============================================================================
$.Game_Map_initialize = Game_Map.prototype.initialize;
$.Game_Map_setup = Game_Map.prototype.setup;
//=============================================================================
// * Object Initialization
//=============================================================================
Game_Map.prototype.initialize = function() {
  // Run Original Function
  $.Game_Map_initialize.call(this); 
  // Initialize Footprints
  this.initFootprints();
};
//=============================================================================
// * Setup
//=============================================================================
Game_Map.prototype.setup = function(mapId) {
  // Run Original Function
  $.Game_Map_setup.call(this, mapId);
  // Initialize Footprints
  this.initFootprints();
};
//=============================================================================
// * Initialize Footprints
//=============================================================================
Game_Map.prototype.initFootprints = function() {
  // Initialize Footprints Array
  this._footprints = [];
};
//=============================================================================
// * Get Footprints
//=============================================================================
Game_Map.prototype.footprints = function() { return this._footprints; };
//=============================================================================
// * Add Footprints
//=============================================================================
Game_Map.prototype.addFootprint = function(footprint) {
  // If Footprint exist add it to array
  if (footprint) { this._footprints.push(footprint); };
};
//=============================================================================
// * Remove Footprints
//=============================================================================
Game_Map.prototype.removeFootprint = function(footprint) {
  // Get Fooprint Index
  var index = this._footprints.indexOf(footprint);
  // If Index is more than 0
  if (index >= 0) {
    footprint.remove();
    this._footprints.splice(index, 1);
  };
};



//=============================================================================
// ** Game_Footprint
//-----------------------------------------------------------------------------
// The game object class for footprints and other stepping effects.
//=============================================================================
function Game_Footprint() { this.initialize.apply(this, arguments); }
//=============================================================================
// * Object Initialization
//=============================================================================
Game_Footprint.prototype.initialize = function() {
  // Set X & Y Coordinates
  this._x = 0; this._y = 0;
  // Rows and Colums
  this._rows = 4;
  this._columns = 3;
  // Graphics Properties
  this._graphicsName = 'footprints_turn';
  this._index = 0;
  this._frame = 0;
  this._direction = 0;
  // Duration
  this._duration = 60;
  // Set Opacity
  this._opacity = 255;
  // Fading Speed
  this._fadeSpeed = 20;
  // Removed Flag
  this._removed = false;
};
//=============================================================================
// * Determine if finished
//=============================================================================
Game_Footprint.prototype.isFinished = function() {
  if (this._opacity <= 0) { return true;}
  if (this._removed) { return true; }
  return false;
};
//=============================================================================
// * Set Position
//=============================================================================
Game_Footprint.prototype.setPosition = function(x, y) { this._x = x, this._y = y};
//=============================================================================
// * Remove
//=============================================================================
Game_Footprint.prototype.remove = function() { this._removed = true; };
//=============================================================================
// * Setup Graphics
//=============================================================================
Game_Footprint.prototype.setupGraphics = function(name, rows = 4, columns = 4) { 
  // Set Graphics Properties
  this._graphicsName = name;
  this._rows = rows;
  this._columns = columns;
};
//=============================================================================
// * Frame Update
//=============================================================================
Game_Footprint.prototype.update = function() { 
  // Decrease Duration
  if (this._duration > 0 ) {
    // Reduce duration 
    this._duration--; 
  } else {
    // Reduce Opacity by fade speed
    this._opacity -= this._fadeSpeed;
  };
};


//=============================================================================
// ** Spriteset_Map
//-----------------------------------------------------------------------------
// The set of sprites on the map screen.
//=============================================================================
// Alias Listing
//=============================================================================
$.Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
//=============================================================================
// * Create Screen Sprites
//=============================================================================
Spriteset_Map.prototype.createLowerLayer = function() {
  // Run Original Function
  $.Spriteset_Map_createLowerLayer.call(this);
  // Create Footprints Layer
  this.createFootprintsLayer();
};
//=============================================================================
// * Create Footprints Layer
//=============================================================================
Spriteset_Map.prototype.createFootprintsLayer = function() {
  // Create Footprints Layer
  this._footprintsContainer = new Footprints_Container();
  this._footprintsContainer.z = 3;
  this._tilemap.addChild(this._footprintsContainer);
};


//=============================================================================
// ** Footprints Container
//-----------------------------------------------------------------------------
// Container for Footprints.
//=============================================================================
function Footprints_Container() { this.initialize.apply(this, arguments); }
Footprints_Container.prototype = Object.create(PIXI.Container.prototype);
Footprints_Container.prototype.constructor = Footprints_Container;
//=============================================================================
// * Object Initialization
//=============================================================================
Footprints_Container.prototype.initialize = function() {
  // Super Call
  PIXI.Container.call(this);
  // Set Width & Height
  this._width = Graphics.width;
  this._height = Graphics.height;
  // Origin Position
  this.origin = new Point();  
  // Initialize Sprites Array
  this._sprites = [];
  // Get Footprints
  let footprints = $gameMap.footprints();
  // Go through Footprint Objects
  for (let i = 0; i < footprints.length; i++) {
    // Get Footprint
    let footprint = footprints[i];
    // If footprint is not finished
    if (!footprint.isFinished()) {
      // Create Footprint
      this.addFootprint(footprint)
    };
  };
};
//=============================================================================
// * Add Footprint
//=============================================================================
Footprints_Container.prototype.addFootprint = function(footprint) {
  // Create Footprint Sprite
  var sprite = new Sprite_Footprint(footprint);
  // Add new Footprint Sprite
  this._sprites.push(sprite);
  // Add child
  this.addChild(sprite);
  // Return created sprite
  return sprite;
};
//=============================================================================
// * Remove Footprint
//=============================================================================
Footprints_Container.prototype.removeFootprint = function(sprite) {
  // Get Sprite Index
  let index = this._sprites.indexOf(sprite);
  // If Index is more than 0
  if (index >= 0) {
    // Remove footprint object from map
    $gameMap.removeFootprint(sprite._footprint);
    this._sprites.splice(index, 1);
    this.removeChild(sprite);
  };
};
//=============================================================================
// * Frame Update
//=============================================================================
Footprints_Container.prototype.update = function() {
  // Go through sprites
  /*this._sprites.forEach( function(sprite) {
    // Update Sprite Position
    sprite.x = sprite.screenX() - this.origin.x;
    sprite.y = sprite.screenY() - this.origin.y;
    // Update Sprite
    sprite.update();
    // If Sprite is Finished remove it
    if (sprite.isFinished()) { this.removeFootprint(sprite); };
  }, this);*/
  if(this._sprites.length <= 0) {return;}
  for(let sprite of this._sprites) {
    sprite.x = sprite.screenX() - this.origin.x;
    sprite.y = sprite.screenY() - this.origin.y;
    sprite.update();
    if(!!sprite.isFinished()) {this.removeFootprint(sprite)}
  }
};

//=============================================================================
// * Remove all footprints
//=============================================================================

Footprints_Container.prototype.removeAll = function() {
  if(this._sprites.length <= 0) {return;}
  for(let sprite of this._sprites) {
    this.removeFootprint(sprite);
  } 
}


//=============================================================================
// ** Sprite_Footprint
//-----------------------------------------------------------------------------
// Sprite for displaying footprints
//=============================================================================
function Sprite_Footprint() { this.initialize.apply(this, arguments);}
Sprite_Footprint.prototype = Object.create(Sprite.prototype);
Sprite_Footprint.prototype.constructor = Sprite_Footprint;
//=============================================================================
// * Initialize Object
//=============================================================================
Sprite_Footprint.prototype.initialize = function(footprint) {
  // Super Call
  Sprite.prototype.initialize.call(this);
  // Set Footprint Object
  this._footprint = footprint;
  // Setup Bitmap
  this.bitmap = ImageManager.loadCharacter(footprint._graphicsName);
    // Set Finished Flag
    this._finished = false;
    this._mapPos = new Point(footprint._x, footprint._y);
    // Set Opacity
    this.opacity = footprint._opacity;
  this.bitmap.addLoadListener(() => {
    this.setupBitmap(footprint);
  })

};
//=============================================================================
// * Determine if Finished
//=============================================================================
Sprite_Footprint.prototype.isFinished = function() { return this._finished; };
//=============================================================================
// * Screen X Position
//=============================================================================
Sprite_Footprint.prototype.screenX = function() { 
  const scrolledX  = $gameMap.adjustX(this._mapPos.x);
  const tw = $gameMap.tileWidth();
  return Math.round(scrolledX * tw);
};
//=============================================================================
// * Screen Y Position
//=============================================================================
Sprite_Footprint.prototype.screenY = function() { 
  const scrolledY  = $gameMap.adjustY(this._mapPos.y);
  const th = $gameMap.tileHeight();
  return Math.round(scrolledY * th) ;
};
//=============================================================================
// * Setup Bitmap
//=============================================================================
Sprite_Footprint.prototype.setupBitmap = function(footprint = this._footprint) {
  // Get Bitmap
  let lastDirection = footprint._lastDirection;
  let direction = footprint._direction
  let dIndex = (direction / 2) - 1;

  let width  = this.bitmap.width / (footprint._columns + 2);
  let height = this.bitmap.height / footprint._rows;

  let sy = dIndex * height;
  let sx = (footprint._frame % 3) * width;
  // If Direction does not match last direction
  if (direction !== lastDirection) {
    // Set Index
    let index = 0;
    // Set Skip Flag
    let skip = false;
    switch (lastDirection) {
      case 2:
        switch (direction) {
          case 4: index = 1 ;break;
          case 6: index = 0 ;break;
          case 2:
          case 8: skip = true ;break;
        };
      break;
      case 4:
        switch (direction) {
          case 2: index = 0 ;break;
          case 8: index = 1 ;break;
          case 4:
          case 6: skip = true ;break;
        };
      break;
      case 6:
        switch (direction) {
          case 2: index = 0 ;break;
          case 8: index = 1 ;break;
          case 4:
          case 6: skip = true ;break;
        };
      break;      
      case 8:
        switch (direction) {
          case 4: index = 1 ;break;
          case 6: index = 0 ;break;
          case 2:
          case 8: skip = true ;break;
        };
    }
    // If not skipping
    if (!skip) { 
      sx = (footprint._columns * width) + (index * width); 
      sy = ((lastDirection / 2) - 1) * height;
    };
  };
  // Set Frame
  this.setFrame(sx, sy, width, height);
};
//=============================================================================
// * Frame Update
//=============================================================================
Sprite_Footprint.prototype.update = function() {
  // Super Call
  Sprite.prototype.update.call(this);
  // If it has footprint object
  if (this._footprint) {
    // Update Footprint
    this._footprint.update();
    // Set Opacity
    this.opacity = this._footprint._opacity;
    // If footprint is finished
    if (this._footprint.isFinished()) {
      // Set Finished flag to true
      this._finished = true;
    }
  } else {
    // Set Finished flag to true
    this._finished = true;
  };
};


})(_TDS_.Footprints);








