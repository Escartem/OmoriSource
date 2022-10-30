//=============================================================================
// TDS Extra Followers
// Version: 1.0
//=============================================================================
// Add to Imported List
var Imported = Imported || {} ; Imported.TDS_ExtraFollowers = true;
// Initialize Alias Object
var _TDS_ = _TDS_ || {} ; _TDS_.ExtraFollowers = _TDS_.ExtraFollowers || {};
//=============================================================================
 /*:
 * @plugindesc
 * This plugin allows you to add extra followers to your party.
 *
 * @param Max Extra Followers
 * @desc Max amount of Extra Followers to add.
 * @default 4
 *
 * @author TDS
 *
 * @help
 * ============================================================================
 * * Script Calls
 * ============================================================================
 * 
 *    To clear all extra followers use the following script 
 *    call:
 * 
 *      this.clearExtraFollowers();
 *
 *
 *
 *
 *    To add an extra follower use the following script call:
 *
 *
 *      this.addExtraFollower(ID, NAME, INDEX, POSITION);
 *
 *      ID
 *      ^ Id used for tracking the follower.
 *    
 *      NAME:
 *      ^ Graphics name.
 *
 *      INDEX:
 *      ^ Graphics Index.
 *
 *      POSITION
 *      ^ Position of the extra follower. (1~8) 
 *       (Optional: Defaults to the last available position.)
 *    
 *      Examples:
 *
 *        this.addExtraFollower('OldMan', 'FA_CHURCH_MARKET', 1);
 *
 *
 *        this.addExtraFollower('girl', 'FA_CHURCH_MARKET', 3, 6);
 *
 *    
 *
 *
 *    To remove an extra follower use the following script call:
 *
 *      this.removeExtraFollower(POSITION);
 *
 *      POSITION:
 *      ^ Position of the extra follower. (1~8);
 *       (Optional: Defaults to the last position.)
 *
 *
 *      Examples:
 *
 *        this.removeExtraFollower();
 *
 *        this.removeExtraFollower(5);
 *
 *
 *
 *    To remove an extra follower by it's ID use the following
 *    script call:
 *
 *      $gamePlayer._followers.removeExtraFollower(ID);
 *
 *      ID
 *      ^ Follower Id.
 *
 *      Examples:
 *
 *        this.removeFollowerById('OldMan')
 * 
 */
//=============================================================================
// Node.js path
var path = require('path');
// Get Parameters
var parameters = PluginManager.parameters("Extra_Followers");
// Initialize Parameters
_TDS_.ExtraFollowers.params = {};
_TDS_.ExtraFollowers.params.maxExtraFollowers = Number(parameters['Max Extra Followers'] || 4);






//=============================================================================
// ** Game_Followers
//-----------------------------------------------------------------------------
// The wrapper class for a follower array.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.ExtraFollowers.Game_Followers_initialize = Game_Followers.prototype.initialize;
//=============================================================================
// * Object Initialization
//=============================================================================
Game_Followers.prototype.initialize = function() {
  // Run Original Function
  _TDS_.ExtraFollowers.Game_Followers_initialize.call(this);
  // Extra Start
  var extraStart = this._data.length;
  for (var i = 0; i < _TDS_.ExtraFollowers.params.maxExtraFollowers; i++) {
    this._data.push(new Game_Follower(extraStart + i + 1))
  };
};
//=============================================================================
// * Add Extra Follower Last
//=============================================================================
Game_Followers.prototype.nextExtraFollowerSlot = function() {
  // Get Starting Index
  var index = $gameParty.maxBattleMembers()-1;
  // Go Through Data
  for (var i = index; i < this._data.length; i++) {
    // Get Follower
    var follower = this._data[i];
    // Set Index
    index = i;
    // If Follower Graphics data is undefined
    if (follower._graphicsData === undefined) { break; }
  };
  // Return Index
  return index;
};
//=============================================================================
// * Last Extra Follower Slot
//=============================================================================
Game_Followers.prototype.lastExtraFollowerSlot = function() {
  // Start
  var start = $gameParty.maxBattleMembers()-1;
  // Get Starting Index
  var index = this._data.length-1
  // Go Through Data in reverse
  for (var i = this._data.length-1; i >= start; i--) {
    // Get Follower
    var follower = this._data[i];
    // Set Index
    index = i;
    if (follower._graphicsData !== undefined) { break; }
  };
  // Return Index
  return index;
};
//=============================================================================
// * Clear Extra Followers
//=============================================================================
Game_Followers.prototype.clearExtraFollowers = function() {
  // Go Through Data
  for (var i = 0; i < this._data.length; i++) {
    // Get Follower
    var follower = this._data[i];
    // Delete Follower Graphics Data
    delete follower._graphicsData;
  };
  // Refresh
  this.refresh();  
};
//=============================================================================
// * Add Extra Follower
//=============================================================================
Game_Followers.prototype.addExtraFollower = function(id, name, index, cIndex) {
  // Set default character index
  if (cIndex === undefined) { cIndex = this.nextExtraFollowerSlot(); };
  // Follower Object
  var follower = this._data[cIndex];
  // Set Graphics Data
  follower._graphicsData = {id: id, name: name, index: index};
  // Refresh
  this.refresh();
};
//=============================================================================
// * Add Extra Follower
//=============================================================================
Game_Followers.prototype.removeExtraFollower = function(index) {
  // Set Default Index
  if (index === undefined) { index = this.lastExtraFollowerSlot(); };
  // Follower Object
  var follower = this._data[index];
  // Delete Graphics Data
  delete follower._graphicsData;
  // Realign Extra Followers
  this.realignExtraFollowers();
  // Refresh
  this.refresh();
};
//=============================================================================
// * Remove Follower By ID
//=============================================================================
Game_Followers.prototype.removeFollowerById = function(id) {
  // Go Through Data
  for (var i = 0; i < this._data.length; i++) {
    // Get Follower
    var follower = this._data[i];
    // If Follower Graphics Data matches the ID
    if (follower._graphicsData && follower._graphicsData.id === id) {
      delete follower._graphicsData;
    };
  };
  // Realign Extra Followers
  this.realignExtraFollowers();  
  // Refresh
  this.refresh();  
};
//=============================================================================
// * Realign Extar Followers
//=============================================================================
Game_Followers.prototype.realignExtraFollowers = function(index) {
  var graphics = this._data.filter(function(follower) {
    return follower._graphicsData !== undefined;
  });
  // Get Starting Index
  var index = $gameParty.maxBattleMembers()-1;
  // Go Through Data
  for (var i = index; i < this._data.length; i++) {
    // Get Follower
    var follower = this._data[i];
    // Get Data
    var data = graphics[i - index];
    // Get Graphics Data
    var graphicsData = data ? Object.assign({}, data._graphicsData) : null;
    // Delete Follower Data
    delete follower._graphicsData
    // If Graphics DAta
    if (graphicsData) {
      // Set Graphics Data
      follower._graphicsData = graphicsData;      
    };
  };
};


//=============================================================================
// ** Game_Follower
//-----------------------------------------------------------------------------
// The game object class for a follower. A follower is an allied character,
// other than the front character, displayed in the party.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.ExtraFollowers.Game_Follower_isVisible = Game_Follower.prototype.isVisible;
_TDS_.ExtraFollowers.Game_Follower_refresh = Game_Follower.prototype.refresh;
//=============================================================================
// * Determine if visible
//=============================================================================
Game_Follower.prototype.isVisible = function() {
  // Return true if follower has graphics data
  if ($gamePlayer.followers().isVisible() && this._graphicsData) { return true; };
  // Return default
  return _TDS_.ExtraFollowers.Game_Follower_isVisible.call(this);
};
//=============================================================================
// * Add Extra Follower
//=============================================================================
Game_Follower.prototype.refresh = function() {
  // If Graphics Data Exists
  if (this._graphicsData) {
    this.setImage(this._graphicsData.name, this._graphicsData.index);
  } else {
    // Run Original Function
    _TDS_.ExtraFollowers.Game_Follower_refresh.call(this);
  }
};



//=============================================================================
// ** Game_Interpreter
//-----------------------------------------------------------------------------
// The interpreter for running event commands.
//=============================================================================
// * Clear Extra Followers
//=============================================================================
Game_Interpreter.prototype.clearExtraFollowers = function() {
  // Clear Extra Followers
  $gamePlayer._followers.clearExtraFollowers();
};
//=============================================================================
// * Add Extra Follower
//=============================================================================
Game_Interpreter.prototype.addExtraFollower = function(id, name, index, cIndex) {
  // Add Extra Follower
  $gamePlayer._followers.addExtraFollower(id, name, index, cIndex);
};
//=============================================================================
// * Remove Extra Follower
//=============================================================================
Game_Interpreter.prototype.removeExtraFollower = function(index) {
  // Remove Extra Follower
  $gamePlayer._followers.removeExtraFollower(index);
};
//=============================================================================
// * Remove Extra Follower by ID
//=============================================================================
Game_Interpreter.prototype.removeFollowerById = function(id) {
  // Remove Extra Follower
  $gamePlayer._followers.removeFollowerById(id);
};



