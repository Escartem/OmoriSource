//=============================================================================
// Yanfly Engine Plugins - Move Route Extension - Extended Move Pack 1
// YEP_X_ExtMovePack1.js
//=============================================================================

if (Imported.YEP_MoveRouteCore) {

var Imported = Imported || {};
Imported.YEP_X_ExtMovePack1 = true;

var Yanfly = Yanfly || {};
Yanfly.EMvP1 = Yanfly.EMvP1 || {};
Yanfly.EMvP1.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.01 (Requires YEP_MoveRouteCore.js) Adds extra movement
 * options to create specific behaviors in movement patterns.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires YEP_MoveRouteCore. Make sure this plugin is located
 * under YEP_MoveRouteCore in the plugin list.
 *
 * This plugin adds extra simplified move routes for your events with the main
 * intention of creating specific behaviors in movement patterns. The patterns
 * include the option to hug a side of the wall and move along that, moving a
 * single direction until coming to a stop, relative opacity adjusting, and
 * index shifting.
 *
 * ============================================================================
 * Instructions - Additional Simplified Movement Routes
 * ============================================================================
 *
 * If you want to make events move a certain way using the commands from this
 * plugin, do the following:
 * 
 * 1. Open the event you wish to move.
 * 2. Make a Movement Route command or Automatic Custom Route.
 * 3. Press "Script..."
 * 4. Type in any of the desired following commands:
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * HUG LEFT WALL
 * HUG RIGHT WALL
 *
 * AVOID HUG LEFT WALL
 * AVOID HUG RIGHT WALL
 *
 * CRASH HUG LEFT WALL
 * CRASH HUG RIGHT WALL
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * The designated event will move alongside the wall to its left/right. If
 * there is no wall to its left/right side, it will turn that direction and
 * move that direction if possible.
 *
 * 'Avoid Hug Left Wall' and 'Avoid Hug Right Wall' will make the event not
 * collide with the player character and the player's followers.
 *
 * 'Crash Hug Left Wall' and 'Crash Hug Right Wall' will allow collision with
 * the player and/or followers.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Hug Left Wall
 *          Hug Right Wall
 *          Avoid Hug Left Wall
 *          Avoid Hug Right Wall
 *          Crash Hug Left Wall
 *          Crash Hug Right Wall
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * INDEX: x
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Sets the designated event's current character graphic index to x without
 * needing to change its character graphic.
 * Replace x with integar values between 0 and 7.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Index: 5
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * INDEX: +x
 * INDEX: -x
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Adjusts the designated event's current character graphic index by +x or -x
 * without needing to change its character graphic as to move it a few stages.
 * The index cannot go under 0 and cannot go over 7.
 * Replace x with integar values between 0 and 7.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Index: +1
 *          Index: -2
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * MOVE UP UNTIL STOP
 * MOVE LEFT UNTIL STOP
 * MOVE RIGHT UNTIL STOP
 * MOVE DOWN UNTIL STOP
 * MOVE UPPER LEFT UNTIL STOP
 * MOVE UPPER RIGHT UNTIL STOP
 * MOVE LOWER LEFT UNTIL STOP
 * MOVE LOWER RIGHT UNTIL STOP
 *
 * AVOID MOVE UP UNTIL STOP
 * AVOID MOVE LEFT UNTIL STOP
 * AVOID MOVE RIGHT UNTIL STOP
 * AVOID MOVE DOWN UNTIL STOP
 * AVOID MOVE UPPER LEFT UNTIL STOP
 * AVOID MOVE UPPER RIGHT UNTIL STOP
 * AVOID MOVE LOWER LEFT UNTIL STOP
 * AVOID MOVE LOWER RIGHT UNTIL STOP
 *
 * CRASH MOVE UP UNTIL STOP
 * CRASH MOVE LEFT UNTIL STOP
 * CRASH MOVE RIGHT UNTIL STOP
 * CRASH MOVE DOWN UNTIL STOP
 * CRASH MOVE UPPER LEFT UNTIL STOP
 * CRASH MOVE UPPER RIGHT UNTIL STOP
 * CRASH MOVE LOWER LEFT UNTIL STOP
 * CRASH MOVE LOWER RIGHT UNTIL STOP
 *
 * MOVE FORWARD UNTIL STOP
 * AVOID MOVE FORWARD UNTIL STOP
 * CRASH MOVE FORWARD UNTIL STOP
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * The designated event will keep moving the noted direction until it it cannot
 * pass in that direction anymore. Once that happens, it will move onto the
 * next movement command in the move route list.
 *
 * The 'Avoid' versions of this command will make the event not collide with
 * the player character and the player's followers.
 *
 * The 'Crash' versions of this command will allow collision with the player
 * and/or followers.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Move Right Until Stop
 *          Avoid Move Left Until Stop
 *          Crash Move Forward Until Stop
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * OPACITY: +x
 * OPACITY: -x
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Adjusts the designated event's opacity value by +x or -x instead of a set
 * value like the editor's opacity command. The opacity value will be added
 * upon or subtracted upon the current opacity value.
 * Replace x with integar values.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Opacity: +50
 *          Opacity: -30
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * OPACITY: +x%
 * OPACITY: -x%
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Adjusts the designated event's opacity value by +x% or -x% instead of a set
 * value like the editor's opacity command. The opacity value will be added
 * upon or subtracted upon the current opacity value.
 * Replace x with integar values.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Opacity: +10%
 *          Opacity: -20%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * OPACITY: x%
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Sets the designated event's opacity value to x% instead of a set value like
 * the editor's opacity command. The opacity value will be automatically
 * adjusted to meet the demands of the sprite.
 * Replace x with integar values.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Opacity: 50%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Game_Character
//=============================================================================

Yanfly.EMvP1.Game_Character_processMoveRouteScriptCall =
  Game_Character.prototype.processMoveRouteScriptCall;
Game_Character.prototype.processMoveRouteScriptCall = function(line) {
  // EXTENDED MOVE PACK 1 ADDITIONS
  if (line === 'EXTENDED MOVE PACK 1') {
    return;
  // HUG LEFT WALL
  } else if (line.match(/(?:HUG LEFT|HUG LEFT WALL)/i)) {
    var collision = this.checkCollisionKeywords(line);
    this.processMoveHugWall('left', collision);
  // HUG RIGHT WALL
  } else if (line.match(/(?:HUG RIGHT|HUG RIGHT WALL)/i)) {
    var collision = this.checkCollisionKeywords(line);
    this.processMoveHugWall('right', collision);
  // INDEX: X
  } else if (line.match(/INDEX:[ ](\d+)/i)) {
    var value = parseInt(RegExp.$1);
    this.processIndexSet(value);
  // INDEX: +/-X
  } else if (line.match(/INDEX:[ ]([\+\-]\d+)/i)) {
    var value = parseInt(RegExp.$1);
    this.processIndexAdjust(value);
  // MOVE UNTIL WALL
  } else if (line.match(/MOVE[ ](.*)[ ](?:UNTIL WALL|UNTIL STOP)/i)) {
    var text = String(RegExp.$1);
    var collision = this.checkCollisionKeywords(line);
    this.processMoveUntilStop(text, collision);
  // OPACITY: /-X%
  } else if (line.match(/OPACITY:[ ](\d+)([%％])/i)) {
    var rate = parseInt(RegExp.$1) * 0.01;
    var value = Math.round(255 * rate);
    this.processOpacitySet(value);
  // OPACITY: +/-X%
  } else if (line.match(/OPACITY:[ ]([\+\-]\d+)([%％])/i)) {
    var rate = parseInt(RegExp.$1) * 0.01;
    var value = Math.round(255 * rate);
    this.processOpacityAdjust(value);
  // OPACITY: +/-X
  } else if (line.match(/OPACITY:[ ]([\+\-]\d+)/i)) {
    var value = parseInt(RegExp.$1);
    this.processOpacityAdjust(value);
  // ELSE
  } else {
    Yanfly.EMvP1.Game_Character_processMoveRouteScriptCall.call(this, line);
  }
};

Game_Character.prototype.processMoveHugWall = function(wall, collision) {
  collision = collision || false;
  var left = {}
  left[1] = 3;
  left[2] = 6;
  left[3] = 9;
  left[4] = 2;
  left[6] = 8;
  left[7] = 1;
  left[8] = 4;
  left[9] = 7;
  var right = {};
  right[1] = 7;
  right[2] = 4;
  right[3] = 1;
  right[4] = 8;
  right[6] = 2;
  right[7] = 9;
  right[8] = 6;
  right[9] = 3;
  if (wall === 'left') {
    var mainDir = left[this.direction()];
    var oppositeDir = right[this.direction()];
  } else if (wall === 'right') {
    var mainDir = right[this.direction()];
    var oppositeDir = left[this.direction()];
  } else {
    return;
  }
  if (collision) $gameTemp._moveAllowPlayerCollision = true;
  if (this.canPass(this.x, this.y, mainDir)) {
    if (wall === 'left') {
      this.turnLeft90();
    } else {
      this.turnRight90();
    }
  } else if (!this.canPass(this.x, this.y, this.direction())) {
    if (this.canPass(this.x, this.y, oppositeDir)) {
      if (wall === 'left') {
        this.turnRight90();
      } else {
        this.turnLeft90();
      }
    } else {
      this.turn180();
    }
  }
  if (this.canPass(this.x, this.y, this.direction())) {
    $gameTemp._moveAllowPlayerCollision = false;
    this.moveForward();
  }
  $gameTemp._moveAllowPlayerCollision = false;
};

Game_Character.prototype.processMoveUntilStop = function(line, collision) {
  var direction = 0;
  if (line.match(/UPPER RIGHT/i)) {
    direction = 9;
  } else if (line.match(/UPPER LEFT/i)) {
    direction = 7;
  } else if (line.match(/LOWER RIGHT/i)) {
    direction = 4;
  } else if (line.match(/LOWER LEFT/i)) {
    direction = 1;
  } else if (line.match(/UP/i)) {
    direction = 8;
  } else if (line.match(/RIGHT/i)) {
    direction = 6;
  } else if (line.match(/LEFT/i)) {
    direction = 4;
  } else if (line.match(/DOWN/i)) {
    direction = 2;
  } else if (line.match(/FORWARD/i)) {
    direction = this.direction();
  } else {
    return;
  }
  if (collision) $gameTemp._moveAllowPlayerCollision = true;
  if (this.canPass(this.x, this.y, direction)) {
    $gameTemp._moveAllowPlayerCollision = false;
    this.moveStraight(direction);
    this._moveRouteIndex -= 1;
  }
  $gameTemp._moveAllowPlayerCollision = false;
};

Game_Character.prototype.processOpacitySet = function(value) {
  this._opacity = Math.round(value);
  this._opacity = this._opacity.clamp(0, 255);
};

Game_Character.prototype.processOpacityAdjust = function(value) {
  this._opacity += Math.round(value);
  this._opacity = this._opacity.clamp(0, 255);
};

Game_Character.prototype.processIndexSet = function(value) {
  if (ImageManager.isBigCharacter(this._characterName)) return;
  var charName = this._characterName;
  value = value.clamp(0, 7);
  this.setImage(charName, value);
};

Game_Character.prototype.processIndexAdjust = function(value) {
  if (ImageManager.isBigCharacter(this._characterName)) return;
  var charName = this._characterName;
  value = this._characterIndex + value;
  value = value.clamp(0, 7);
  this.setImage(charName, value);
};

//=============================================================================
// End of File
//=============================================================================
} else {

var text = '================================================================\n';
text += 'YEP_X_ExtMovePack1 requires YEP_MoveRouteCore to be at the ';
text += 'latest version to run properly.\n\nPlease go to www.yanfly.moe and ';
text += 'update to the latest version for the YEP_MoveRouteCore plugin.\n';
text += '================================================================\n';
console.log(text);
require('nw.gui').Window.get().showDevTools();

} // Imported.YEP_MoveRouteCore