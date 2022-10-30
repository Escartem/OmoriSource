//=============================================================================
// TDS Follower Control
// Version: 1.0
//=============================================================================
// Add to Imported List
var Imported = Imported || {} ; Imported.TDS_FollowerControl = true;
// Initialize Alias Object
var _TDS_ = _TDS_ || {} ; _TDS_.FollowerControl = _TDS_.FollowerControl || {};


//=============================================================================
// ** Game_Follower
//-----------------------------------------------------------------------------
// The game object class for a follower. A follower is an allied character,
// other than the front character, displayed in the party.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.FollowerControl.Game_Follower_initialize     = Game_Follower.prototype.initialize;
_TDS_.FollowerControl.Game_Follower_update         = Game_Follower.prototype.update;
_TDS_.FollowerControl.Game_Follower_chaseCharacter = Game_Follower.prototype.chaseCharacter;
//=============================================================================
// * Object Initialization
//=============================================================================
Game_Follower.prototype.initialize = function(memberIndex) {
  // Set Released Flag
  this._released = false;  
  // Run Original Function
  _TDS_.FollowerControl.Game_Follower_initialize.call(this, memberIndex);
};
//=============================================================================
// * Release/Enslave
//=============================================================================
Game_Follower.prototype.release = function() { this._released = true; };
Game_Follower.prototype.enslave = function() { this._released = false; };
//=============================================================================
// * Determine if Follower is Free
//=============================================================================
Game_Follower.prototype.isFree = function() { return this._released; };
//=============================================================================
// * Frame Update
//=============================================================================
Game_Follower.prototype.update = function() {
  // If Free
  if (this.isFree()) {
    // Update Character
    Game_Character.prototype.update.call(this);
    return;
  };
  // Run Original Function
  _TDS_.FollowerControl.Game_Follower_update.call(this);
};
//=============================================================================
// * Chase Character
//=============================================================================
Game_Follower.prototype.chaseCharacter = function(character) {
  // If Free
  if (this.isFree()) { return; };
  // Run Original Function
  _TDS_.FollowerControl.Game_Follower_chaseCharacter.call(this, character);
};
//=============================================================================
// * Refresh
//=============================================================================
Game_Follower.prototype.refresh = function() {
  var characterName = this.characterName();
  var characterIndex = this.characterIndex() 
  this.setImage(characterName, characterIndex);      
};
//=============================================================================
// * Character Name
//=============================================================================
Game_Follower.prototype.characterName = function() {
  // If Visible
  if (this.isVisible()) {
    if (this.actor().isDead()) { return '$Toast'; }
    return this.actor().characterName();
  };
  // Return Empty String
  return '';
};
//=============================================================================
// * Character Index
//=============================================================================
Game_Follower.prototype.characterIndex = function() {
  // If Visible
  if (this.isVisible()) {
    if (this.actor().isDead()) { return 5; }
    return this.actor().characterIndex();
  };
  return 0;
};


//=============================================================================
// ** Window_Base
//-----------------------------------------------------------------------------
// The interpreter for running event commands.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.FollowerControl.Game_Interpreter_clear     = Game_Interpreter.prototype.clear;
_TDS_.FollowerControl.Game_Interpreter_character = Game_Interpreter.prototype.character;
//=============================================================================
// * Clear
//=============================================================================
Game_Interpreter.prototype.clear = function() {
  // Run Original Function
  _TDS_.FollowerControl.Game_Interpreter_clear.call(this);
  // Clear Follower Character
  this.clearFollower();
};
//=============================================================================
// * Get Follower
//=============================================================================
Game_Interpreter.prototype.getFollower = function(index) { return $gamePlayer.followers().follower(index); };
//=============================================================================
// * Release Follower
//=============================================================================
Game_Interpreter.prototype.releaseFollower = function(index) {
  // Get Follower
  var follower = this.getFollower(index);
  // Release Follower
  if (follower) { follower.release(); }
};
//=============================================================================
// * Enslave Follower
//=============================================================================
Game_Interpreter.prototype.enslaveFollower = function(index) {
  // Get Follower
  var follower = this.getFollower(index);
  // Release Follower
  if (follower) { follower.enslave(); }
};
//=============================================================================
// * Set Follower Character
//=============================================================================
Game_Interpreter.prototype.controlFollower = function(index, release) {
  // If Release is undefined
  if (release === undefined) { release = true; }
  // Set Follower Character
  this._followerCharacter = this.getFollower(index);
  // Release Follower Character
  if (release) { this._followerCharacter.release(); }
};
//=============================================================================
// * Clear Follower Character
//=============================================================================
Game_Interpreter.prototype.clearFollower = function(index, enslave) {
  // If Enslaved is undefined
  if (enslave === undefined) { enslave = true; }
  // Enslave Character
  if (enslave && this._followerCharacter) { this._followerCharacter.enslave(); }
  // Set Follower Character to null
  this._followerCharacter = null;  
};
//=============================================================================
// * Get Character
//=============================================================================
Game_Interpreter.prototype.character = function(param) {
  // If Follower Character
  if (this._followerCharacter) {
    // Get Character
    var character = this._followerCharacter;
    // Return Character
    return character;
  };
  // Return Original Function
  return _TDS_.FollowerControl.Game_Interpreter_character.call(this, param);    
};


//  this.isVisible() ? this.actor().characterIndex() : 0;


  //   characterName =    //'!Flame';
  //   characterIndex = 5;

  // if (this._memberIndex === 1) {
  //   characterName = '!Flame';
  //   characterIndex = 4;
  // };
