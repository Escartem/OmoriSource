//=============================================================================
// TDS Map Fog
// Version: 1.0
//=============================================================================
// Add to Imported List
var Imported = Imported || {} ; Imported.TDS_MapFog = true;
// Initialize Alias Object
var _TDS_ = _TDS_ || {} ; _TDS_.MapFog = _TDS_.MapFog || {};
//=============================================================================
 /*:
 * @plugindesc
 * Adds fog sprites to map.
 *
 * @author TDS
 *
 */
//=============================================================================



(function($) {
// Use Strict  
"use strict";

//=============================================================================
// ** ImageManager
//-----------------------------------------------------------------------------
// The static class that loads images, creates bitmap objects and retains them.
//=============================================================================
// * Load Overlay Image
//=============================================================================
ImageManager.loadOverlay = function(filename, hue) {
    return this.loadBitmap('img/overlays/', filename, hue, true);
};

//=============================================================================
// ** Game_Interpreter
//-----------------------------------------------------------------------------
// The interpreter for running event commands.
//=============================================================================
// * Generate Map Fog
//=============================================================================
Game_Interpreter.prototype.generateMapFog = function() { return new Game_MapFog(); }; 
//=============================================================================
// * Create Map Fog
//=============================================================================
Game_Interpreter.prototype.createMapFog = function(id, fog) {
  // Get Container
  let container = SceneManager._scene._spriteset._mapFogContainer;
  // Add Map Fog
  $gameMap.addMapFog('fog1', fog);
  if (container) { container.addFog(id); };
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
  // Initialize Map Fog
  this.clearMapFogs();
};
//=============================================================================
// * Clear Map Fogs
//=============================================================================
Game_Map.prototype.clearMapFogs = function() {
  if (this._mapFogs) { delete this._mapFogs; }; 
  // Initialize Map Fogs Object
  this._mapFogs = {}
};
//=============================================================================
// * Get Map Fog
//=============================================================================
Game_Map.prototype.getMapFog = function(name) { return this._mapFogs[name]; };
//=============================================================================
// * Add Map Fog
//=============================================================================
Game_Map.prototype.addMapFog = function(name, fog) { this._mapFogs[name] = fog; };
//=============================================================================
// * Remove Map Fog
//=============================================================================
Game_Map.prototype.removeMapFog = function(name) { delete this._mapFogs[name]; };




//=============================================================================
// ** Game_MapFog
//-----------------------------------------------------------------------------
// The game object class for Map Fog.
//=============================================================================
function Game_MapFog() { this.initialize.apply(this, arguments); }
//=============================================================================
// * Object Initialization
//=============================================================================
Game_MapFog.prototype.initialize = function(id) {
  this._id = id;
  this.name = '';
  this.opacity = 255;
  this.blendMode = 0;
  this.scaleX = 1;
  this.scaleY = 1;
  this.moveX = 0;
  this.moveY = 0;
  this.width = Graphics.width;
  this.height = Graphics.height;
  this.mapBind = true;
  this.visible = true;
  this.deactivateOnInvisible = true;
  this.active = true;  
  this.priority = 0;
  this.origin = new Point();
  this.move = new Point();
};
//=============================================================================
// * Show
//=============================================================================
Game_MapFog.prototype.show = function() {
  this.visible = true;
  this.active = true;  
}


//=============================================================================
// ** Spriteset_Map
//-----------------------------------------------------------------------------
// The set of sprites on the map screen.
//=============================================================================
// Alias Listing
//=============================================================================
$.Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
//=============================================================================
// * Create Lower Layer
//=============================================================================
Spriteset_Map.prototype.createLowerLayer = function() {
  // Run Original Function
  $.Spriteset_Map_createLowerLayer.call(this);
  // Create Map Fog Container
  this.createMapFogContainer();
};
//=============================================================================
// * Create Map Fog Container
//=============================================================================
Spriteset_Map.prototype.createMapFogContainer = function() {
  // Create Map Fog Container
  this._mapFogContainer = new Sprite_MapFogContainer();
  this.addChild(this._mapFogContainer);
};


//=============================================================================
// ** MapFog Container
//-----------------------------------------------------------------------------
// Container for Map Fog.
//=============================================================================
function Sprite_MapFogContainer() { this.initialize.apply(this, arguments); }
Sprite_MapFogContainer.prototype = Object.create(PIXI.Container.prototype);
Sprite_MapFogContainer.prototype.constructor = Sprite_MapFogContainer;
//=============================================================================
// * Object Initialization
//=============================================================================
Sprite_MapFogContainer.prototype.initialize = function() {
  // Super Call
  PIXI.Container.call(this);

  // Initialize Sprites Array
  this._sprites = []
  // Get Map Fogs
  let mapFogs = Object.entries($gameMap._mapFogs)
  // Sort Map Fogs
  mapFogs = mapFogs.sort(function(a, b) {
    return a[1].priority - b[1].priority;
  });

  // Add Map Fog
  for (let i = 0; i < mapFogs.length; i++) { this.addFog(mapFogs[i][0]); };

  // this.addFog('titties');
  // this.addFog('fog2');  
  // // Set Width & Height
  // this._width = Graphics.width;
  // this._height = Graphics.height;
  // // Origin Position
  // this.origin = new Point();  
  // // Initialize Sprites Array
  // this._sprites = [];
  // // Get MapFog
  // let MapFog = $gameMap.MapFog();
  // // Go through Footprint Objects
  // for (let i = 0; i < MapFog.length; i++) {
  //   // Get Footprint
  //   let footprint = MapFog[i];
  //   // If footprint is not finished
  //   if (!footprint.isFinished()) {
  //     // Create Footprint
  //     this.addFootprint(footprint)
  //   };
  // };

  // this._fogSprite = new Sprite_MapFog();
  // this.addChild(this._fogSprite)
};
//=============================================================================
// * Add Fog
//=============================================================================
Sprite_MapFogContainer.prototype.addFog = function(id) {
  // Check for ID duplicates
  let idCheck = this._sprites.some(function(sprite) { return sprite._id === id });
  // If ID check then return
  if (idCheck) { return; };
  // Get Map fog data
  let data = $gameMap.getMapFog(id);
  // If Data Exists
  if (data) {
    let sprite = new Sprite_MapFog(id);
    this._sprites.push(sprite);
    this.addChild(sprite);
  };
};
//=============================================================================
// * Remove Fog
//=============================================================================
Sprite_MapFogContainer.prototype.removeFog = function(fog) {
  // Get Sprite Index
  let index = this._sprites.indexOf(fog);
  // If Index is more than 0
  if (index >= 0) {
    this._sprites.splice(index, 1);
    this.removeChild(fog);
  };
};
//=============================================================================
// * Frame Update
//=============================================================================
Sprite_MapFogContainer.prototype.update = function() {
  // Go through sprites
  this._sprites.forEach( function(sprite) {
    // Update Sprite
    sprite.update();
  }, this);
};


//=============================================================================
// ** Sprite_MapFog
//-----------------------------------------------------------------------------
// Sprite for displaying Map Fog.
//=============================================================================
function Sprite_MapFog() { this.initialize.apply(this, arguments);}
Sprite_MapFog.prototype = Object.create(TilingSprite.prototype);
Sprite_MapFog.prototype.constructor = Sprite_MapFog;
//=============================================================================
// * Initialize Object
//=============================================================================
Sprite_MapFog.prototype.initialize = function(id) {
  // Super Call
  TilingSprite.prototype.initialize.call(this);
  // Set ID
  this._id = id;
  // Set Bitmap name
  this._bitmapName = '';
  // Update
  this.update();
};
//=============================================================================
// * Frame Update
//=============================================================================
Sprite_MapFog.prototype.update = function() {
  // Super Call
  TilingSprite.prototype.update.call(this);
  // Get Data
  let data = $gameMap.getMapFog(this._id);
  // If Data Exists
  if (data && data.active) {
    // If Bitmap name has changed
    if (this._bitmapName !== data.name) {
      // Set bitmap
      this.bitmap = ImageManager.loadOverlay(data.name);
      this.move(0, 0, data.width, data.height);      
      this._bitmapName = data.name;
    };
    // Apply Data
    this.opacity = data.opacity;
    this.blendMode = data.blendMode;
    this.scale.x = data.scaleX;
    this.scale.y = data.scaleY;
    this.visible = data.visible;
    // Deactivate if not visible
    if (!data.visible && data.deactivateOnInvisible) { data.active = false; };
    // If Bitmap width is more than 0
    if (this.bitmap.width > 0) {
      // Set Base Origin Position
      data.origin.x = (data.origin.x + data.move.x) % this.bitmap.width;
      data.origin.y = (data.origin.y + data.move.y) % this.bitmap.height;
      // Set Origin
      this.origin.x = data.origin.x;
      this.origin.y = data.origin.y;
      // If Fog should be boudn to map
      if (data.mapBind) {
        this.origin.x += ($gameMap.displayX() * $gameMap.tileWidth())
        this.origin.y += ($gameMap.displayY() * $gameMap.tileHeight());        
      };
    };
  } else {
    // Remove From parent
    this.parent.removeFog(this);
  };
};



})(_TDS_.MapFog);











































































/*
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
    let container = SceneManager._scene._spriteset._MapFogContainer;
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
  // Set Disable MapFog flag
  this._disableMapFog = true;
  // Initialize Footprint position
  this._footprintPos = new Point();
  // Set Last Direction
  this._lastDirection = this._direction;
};
//=============================================================================
// * Determine if Character can create MapFog
//=============================================================================
Game_CharacterBase.prototype.canCreateMapFog = function() {
  return this._disableMapFog;
};
//=============================================================================
// * Move Straight
//=============================================================================
Game_CharacterBase.prototype.moveStraight = function(d) {
  // Get Old Values
  let oldX = this._x, oldY = this._y, oldDir = d;
  // Set Last Direction
  this._lastDirection = this._direction;  
  // Run Original Function
  $.Game_CharacterBase_moveStraight.call(this, d);
  // If position has changed
  if (oldX !== this._x || oldY !== this._y || oldDir !== this._direction) {
    // Set Footprint Position
    this._footprintPos.set(oldX, oldY);
    // Process Footprint Movement    
    this.footprintMovement();
  };
};
//=============================================================================
// * Process Footprint Movement
//=============================================================================
Game_CharacterBase.prototype.footprintMovement = function() {
  // If Can Create MapFog
  if (this.canCreateMapFog()) {
    // Add Footprint
    SceneManager.addFootprint(this.genererateFootprint());
  };
};
//=============================================================================
// * Generate Footprint Object
//=============================================================================
Game_CharacterBase.prototype.genererateFootprint = function() {
  // Create Footprint Object
  let footprint = new Game_MapFog();
  footprint._frame = this.pattern();
  footprint._direction = this._direction;
  footprint._lastDirection = this._lastDirection;  
  footprint.setPosition(this._footprintPos.x, this._footprintPos.y);
  // Return Footprint
  return footprint;
};



//=============================================================================
// ** Game_Follower
//-----------------------------------------------------------------------------
// The game object class for a follower. A follower is an allied character,
// other than the front character, displayed in the party.
//=============================================================================
// * Determine if Character can create MapFog
//=============================================================================
Game_Follower.prototype.canCreateMapFog = function() {
  return false
};









//=============================================================================
// ** Spriteset_Map
//-----------------------------------------------------------------------------
// The set of sprites on the map screen.
//=============================================================================
// Alias Listing
//=============================================================================
$.Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
$.Spriteset_Map_update = Spriteset_Map.prototype.update;
//=============================================================================
// * Create Screen Sprites
//=============================================================================
Spriteset_Map.prototype.createLowerLayer = function() {
  // Run Original Function
  $.Spriteset_Map_createLowerLayer.call(this);
  // Create MapFog Layer
  this.createMapFogLayer();
};
//=============================================================================
// * Frame Update
//=============================================================================
Spriteset_Map.prototype.update = function() {
  // Set MapFog Layer
  this._MapFogContainer.origin.x = $gameMap.displayX() * $gameMap.tileWidth();
  this._MapFogContainer.origin.y = $gameMap.displayY() * $gameMap.tileHeight();    
  // Run Original Function
  $.Spriteset_Map_update.call(this);
};
//=============================================================================
// * Create MapFog Layer
//=============================================================================
Spriteset_Map.prototype.createMapFogLayer = function() {
  // Create MapFog Layer
  this._MapFogContainer = new Sprite_MapFogContainer();
  this._MapFogContainer.z = 3;
  this._tilemap.addChild(this._MapFogContainer);
};





*/