//=============================================================================
// TDS Character Movement Graphics
// Version: 1.5
//=============================================================================
// Add to Imported List
var Imported = Imported || {} ; Imported.TDS_CharacterMovementGraphics = true;
// Initialize Alias Object
var _TDS_ = _TDS_ || {} ; _TDS_.CharacterMovementGraphics = _TDS_.CharacterMovementGraphics || {};
//=============================================================================
 /*:
 * @plugindesc
 * This plugins let's you set special graphics for character movements such as:
 * idle, walking, and running.
 *
 * @author TDS
 *
 * @help
 *
 * Use the following in a script call to set the movement graphics for an
 * actor:
 *
 *    $gameActors.actor(actorId).setMovementGraphics(idle, walking, running);
 *      ^ actorId: Actor database ID.
 *      ^ idle: Graphics name for idle. (Not moving)
 *      ^ walking: Graphics name for walking. (Normal walking)
 *      ^ running: Graphics name for running. (Moving and Dashing at the same time)
 *
 *    Example:
 *
 *      $gameActors.actor(1).setMovementGraphics('$NormalMale', '$NormalMale', '$Teen_Male%(8)');
 *
 *
 * Use the following in a script call to clear he movement graphics for an
 * actor:
 *
 *    $gameActors.actor(actorId).clearMovementGraphics();
 *      ^ actorId: Actor database ID.
 *
 *    Example:
 *
 *      $gameActors.actor(1).clearMovementGraphics();
 *
 */
//=============================================================================



//=============================================================================
// ** Game_Actor
//-----------------------------------------------------------------------------
// The game object class for an actor.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.CharacterMovementGraphics.Game_Actor_initMembers = Game_Actor.prototype.initMembers;
//=============================================================================
// * Initialize Members
//=============================================================================
Game_Actor.prototype.initMembers = function() {
  // Run Original Function
  _TDS_.CharacterMovementGraphics.Game_Actor_initMembers.call(this);
  // Initialize Character Movement Graphics
  this._characterMovementGraphics = {};
};
//=============================================================================
// * Set Movement Graphics
//=============================================================================
Game_Actor.prototype.setMovementGraphics = function(idle, walking, running) {
  // Set Character Movement Graphics
  this.setMovementGraphicData('idle', idle);
  this.setMovementGraphicData('walking', walking);
  this.setMovementGraphicData('running', running);    
};
//=============================================================================
// * Set Movement Graphic Data
//=============================================================================
Game_Actor.prototype.setMovementGraphicData = function(name, data) {
  // Set Default Data
  if (typeof data === 'string') { data = { name: data, index: 1 }; };
  // Set Character Movement Graphics Data
  this._characterMovementGraphics[name.toLowerCase()] = data;
};
//=============================================================================
// * Clear Movement Graphics
//=============================================================================
Game_Actor.prototype.clearMovementGraphics = function() {
  // Delete Character Movement Graphics
  delete this._characterMovementGraphics;
  // Initialize Character Movement Graphics
  this._characterMovementGraphics = {};
};



//=============================================================================
// ** Game_CharacterBase
//-----------------------------------------------------------------------------
// The superclass of Game_Character. It handles basic information, such as
// coordinates and images, shared by all characters.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.CharacterMovementGraphics.Game_CharacterBase_update = Game_CharacterBase.prototype.update;
//=============================================================================
// * Frame Update
//=============================================================================
Game_CharacterBase.prototype.update = function() {
  // Run Original Function
  _TDS_.CharacterMovementGraphics.Game_CharacterBase_update.call(this);
  // Update Movement Graphics
  this.updateMovementGraphics();
};
//=============================================================================
// * Determine if Movement Graphic should be updated
//=============================================================================
Game_CharacterBase.prototype.canUpdateMovementGraphics = function() { return false; };
//=============================================================================
// * Determine if running graphic should be used
//=============================================================================
Game_CharacterBase.prototype.shouldUseRunningGraphics = function() { return false; }
//=============================================================================
// * Determine if Character is climbing
//=============================================================================
Game_CharacterBase.prototype.isClimbing = function() { return this.regionId() === 90; };
//=============================================================================
// * Get Movement Graphics Source
//=============================================================================
Game_CharacterBase.prototype.movementGraphicsSource = function() { return null };
//=============================================================================
// * Update Movement Graphics
//=============================================================================
Game_CharacterBase.prototype.updateMovementGraphics = function() {
  // If Normal
  if (this.canUpdateMovementGraphics()) {
    // Get Actor
    var actor = this.movementGraphicsSource();
    // If Actor Exists
    if (actor) {
      // Get Graphics
      var graphics = actor._characterMovementGraphics;
      // Get Character Graphic Name
      var characterName = this.characterName();
      // Get character index
      var characterIndex = this.characterIndex();      
      // If Moving
      if (this.isMoving()) {
        // If Climbing
        if (this.isClimbing()) {
          if (graphics.climbing && (characterName !== graphics.climbing.name || characterIndex !== graphics.climbing.index)) { 
            let bitmap = ImageManager.loadCharacter(graphics.climbing.name);
            if(!bitmap.isReady()) {return;}
            this.setImage(graphics.climbing.name, graphics.climbing.index); 
          }
        } else {
          if (this.shouldUseRunningGraphics()) {        
            if (graphics.running && (characterName !== graphics.running.name || characterIndex !== graphics.running.index)) { 
              let bitmap = ImageManager.loadCharacter(graphics.running.name);
              if(!bitmap.isReady()) {return;}
              this.setImage(graphics.running.name, graphics.running.index); 
            }
          } else {
            if (graphics.walking && (characterName !== graphics.walking.name || characterIndex !== graphics.walking.index)) { 
              let bitmap = ImageManager.loadCharacter(graphics.walking.name);
              if(!bitmap.isReady()) {return;}
              this.setImage(graphics.walking.name, graphics.walking.index); 
            }
          };          
        };
      } else {
        // If Climbing
        if (this.isClimbing()) {
          if (graphics.climbing && (characterName !== graphics.climbing.name || characterIndex !== graphics.climbing.index)) { 
            let bitmap = ImageManager.loadCharacter(graphics.climbing.name);
            if(!bitmap.isReady()) {return;}
            this.setImage(graphics.climbing.name, graphics.climbing.index); 
          }          
        } else {
          if (graphics.idle && this._stopCount > 0 && (characterName !== graphics.idle.name || characterIndex !== graphics.idle.index)) { 
            let bitmap = ImageManager.loadCharacter(graphics.idle.name);
            if(!bitmap.isReady()) {return;}
            this.setImage(graphics.idle.name, graphics.idle.index); 
          }
        }        
      }
    }
  };
  // Update Toast
  this.updateToast();
};
//=============================================================================
// * Update Toast
//=============================================================================
Game_CharacterBase.prototype.updateToast = function() {
  // Get Actor
  var actor = this.movementGraphicsSource();  
  // If Actor exists
  if (actor) {
    // If Switch 12 is on
    if ($gameSwitches.value(12) === true) {
      // If Actor is dead
      if (actor.isDead()) {
        // Get Character Graphic Name
        var characterName = this.characterName();
        // If not on Toasted
        if (characterName !== '$Toasted') { this.setImage("$Toasted", 0); }
        this.setStepAnime(true);
      } else {
        this.setStepAnime(false);
      };
    };
  }
};



//=============================================================================
// ** Game_Player
//-----------------------------------------------------------------------------
// The game object class for the player. It contains event starting
// determinants and map scrolling functions.
//=============================================================================
// * Determine if Movement Graphic should be updated
//=============================================================================
Game_Player.prototype.canUpdateMovementGraphics = function() { return this.isNormal() && this.movementGraphicsSource().isAlive(); };
//=============================================================================
// * Get Movement Graphics Source
//=============================================================================
Game_Player.prototype.movementGraphicsSource = function() { return $gameParty.leader(); };
//=============================================================================
// * Determine if running graphic should be used
//=============================================================================
Game_Player.prototype.shouldUseRunningGraphics = function() { return this.isDashing(); }

Game_Player.prototype.getFollowers = function() {
  return this._followers;
};

Game_Followers.prototype.getFollowerById = function(id) {
  // Go Through Data
  for (var i = 0; i < this._data.length; i++) {
    // Get Follower
    var follower = this._data[i];
    // If Follower Graphics Data matches the ID
    if (follower._graphicsData && follower._graphicsData.id === id) {
      return follower;
    };
  };
  return null;
};

//=============================================================================
// ** Game_Follower
//-----------------------------------------------------------------------------
// The game object class for a follower. A follower is an allied character,
// other than the front character, displayed in the party.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.CharacterMovementGraphics.Game_Follower_initialize = Game_Follower.prototype.initialize;
Game_Follower.prototype.initialize = function(memberIndex) {
  _TDS_.CharacterMovementGraphics.Game_Follower_initialize.call(this, memberIndex);
  this._characterMovementGraphics = null;
  this._hasCharacterMovementGraphics = false;
};

_TDS_.CharacterMovementGraphics.Game_Follower_update = Game_Follower.prototype.update;
//=============================================================================
// * Determine if Movement Graphic should be updated
//=============================================================================
Game_Follower.prototype.canUpdateMovementGraphics = function() { 
  // Get Source
  var source = this.movementGraphicsSource();
  // Return if source exists and is alive
  if (source) {
    return $gamePlayer.isNormal() && this.isVisible() && source && source.isAlive();
  } else {
    return this._graphicsData && this._graphicsData.id && this._hasCharacterMovementGraphics;
  }
};
//=============================================================================
// * Get Movement Graphics Source
//=============================================================================
Game_Follower.prototype.movementGraphicsSource = function() { return this.actor() };
//=============================================================================
// * Determine if running graphic should be used
//=============================================================================
Game_Follower.prototype.shouldUseRunningGraphics = function() { return $gamePlayer.isDashing(); }

//=============================================================================
// * Determine if running graphic should be used
//=============================================================================
Game_Follower.prototype.update = function() {
  // Run Original Version
  _TDS_.CharacterMovementGraphics.Game_Follower_update.call(this);
  // Update Toast
  this.updateToast();
};

//=============================================================================
// * Set Movement Graphics
//=============================================================================
Game_Follower.prototype.setMovementGraphics = function(idle, walking, running) {
  // Set Character Movement Graphics
  if (!this._characterMovementGraphics) this._characterMovementGraphics = {};
  this._hasCharacterMovementGraphics= true;
  this.setMovementGraphicData('idle', idle);
  this.setMovementGraphicData('walking', walking);
  this.setMovementGraphicData('running', running);    
};
//=============================================================================
// * Set Movement Graphic Data
//=============================================================================
Game_Follower.prototype.setMovementGraphicData = function(name, data) {
  if (!this._characterMovementGraphics) this._characterMovementGraphics = {};
  // Set Default Data
  if (typeof data === 'string') { data = { name: data, index: 1 }; };
  // Set Character Movement Graphics Data
  this._characterMovementGraphics[name.toLowerCase()] = data;
};
//=============================================================================
// * Clear Movement Graphics
//=============================================================================
Game_Follower.prototype.clearMovementGraphics = function() {
  // Delete Character Movement Graphics
  delete this._characterMovementGraphics;
  // Initialize Character Movement Graphics
  this._characterMovementGraphics = null;
  this._hasCharacterMovementGraphics = false;
};

Game_Follower.prototype.updateMovementGraphics = function() {
  // If Normal
  if (this.canUpdateMovementGraphics()) {
    // Get Actor
    var actor = this.movementGraphicsSource();
    // If Actor Exists
    if (actor) {
      // Get Graphics
      var graphics = actor._characterMovementGraphics;
      // Get Character Graphic Name
      var characterName = this.characterName();
      // Get character index
      var characterIndex = this.characterIndex();      
      // If Moving
      if (this.isMoving()) {
        // If Climbing
        if (this.isClimbing()) {
          if (characterName === "DW_BASIL" || characterName === "$DW_BASIL_RUN%(8)") {
            this._characterMovementGraphics.climbing = { name: "DW_Climb", index: 0 };
          }
          if (graphics.climbing && (characterName !== graphics.climbing.name || characterIndex !== graphics.climbing.index)) { 
            let bitmap = ImageManager.loadCharacter(graphics.climbing.name);
            if(!bitmap.isReady()) {return;}
            this.setImage(graphics.climbing.name, graphics.climbing.index); 
          }
        } else {
          if (this.shouldUseRunningGraphics()) {        
            if (graphics.running && (characterName !== graphics.running.name || characterIndex !== graphics.running.index)) { 
              let bitmap = ImageManager.loadCharacter(graphics.running.name);
              if(!bitmap.isReady()) {return;}
              this.setImage(graphics.running.name, graphics.running.index); 
            }
          } else {
            if (graphics.walking && (characterName !== graphics.walking.name || characterIndex !== graphics.walking.index)) { 
              let bitmap = ImageManager.loadCharacter(graphics.walking.name);
              if(!bitmap.isReady()) {return;}
              this.setImage(graphics.walking.name, graphics.walking.index); 
            }
          };          
        };
      } else {
        // If Climbing
        if (this.isClimbing()) {
          if (characterName === "DW_BASIL" || characterName === "$DW_BASIL_RUN%(8)") {
            this._characterMovementGraphics.climbing = { name: "DW_Climb", index: 0 };
          }
          if (graphics.climbing && (characterName !== graphics.climbing.name || characterIndex !== graphics.climbing.index)) { 
            let bitmap = ImageManager.loadCharacter(graphics.climbing.name);
            if(!bitmap.isReady()) {return;}
            this.setImage(graphics.climbing.name, graphics.climbing.index); 
          }          
        } else {
          if (graphics.idle && this._stopCount > 0 && (characterName !== graphics.idle.name || characterIndex !== graphics.idle.index)) { 
            let bitmap = ImageManager.loadCharacter(graphics.idle.name);
            if(!bitmap.isReady()) {return;}
            this.setImage(graphics.idle.name, graphics.idle.index); 
          }
        }        
      }
    } else if (this._characterMovementGraphics) {
      // Get Graphics
      var graphics = this._characterMovementGraphics;
      // Get Character Graphic Name
      var characterName = this.characterName();
      // Get character index
      var characterIndex = this.characterIndex();      
      // If Moving
      if (this.isMoving()) {
        // If Climbing
        if (this.isClimbing()) {
          if (characterName === "DW_BASIL" || characterName === "$DW_BASIL_RUN%(8)") {
            this._characterMovementGraphics.climbing = { name: "DW_Climb", index: 0 };
          }          
          if (graphics.climbing && (characterName !== graphics.climbing.name || characterIndex !== graphics.climbing.index)) { 
            let bitmap = ImageManager.loadCharacter(graphics.climbing.name);
            if(!bitmap.isReady()) {return;}
            this.setImage(graphics.climbing.name, graphics.climbing.index); 
          }
        } else {
          if (this.shouldUseRunningGraphics()) {        
            if (graphics.running && (characterName !== graphics.running.name || characterIndex !== graphics.running.index)) { 
              let bitmap = ImageManager.loadCharacter(graphics.running.name);
              if(!bitmap.isReady()) {return;}
              this.setImage(graphics.running.name, graphics.running.index); 
            }
          } else {
            if (graphics.walking && (characterName !== graphics.walking.name || characterIndex !== graphics.walking.index)) { 
              let bitmap = ImageManager.loadCharacter(graphics.walking.name);
              if(!bitmap.isReady()) {return;}
              this.setImage(graphics.walking.name, graphics.walking.index); 
            }
          };          
        };
      } else {
        // If Climbing
        if (this.isClimbing()) {
          if (characterName === "DW_BASIL" || characterName === "$DW_BASIL_RUN%(8)") {
            this._characterMovementGraphics.climbing = { name: "DW_Climb", index: 0 };
          }          
          if (graphics.climbing && (characterName !== graphics.climbing.name || characterIndex !== graphics.climbing.index)) { 
            let bitmap = ImageManager.loadCharacter(graphics.climbing.name);
            if(!bitmap.isReady()) {return;}
            this.setImage(graphics.climbing.name, graphics.climbing.index); 
          }          
        } else {
          if (graphics.idle && this._stopCount > 0 && (characterName !== graphics.idle.name || characterIndex !== graphics.idle.index)) { 
            let bitmap = ImageManager.loadCharacter(graphics.idle.name);
            if(!bitmap.isReady()) {return;}
            this.setImage(graphics.idle.name, graphics.idle.index); 
          }
        }        
      }
    }
  };
  // Update Toast
  this.updateToast();
};