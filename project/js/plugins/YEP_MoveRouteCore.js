//=============================================================================
// Yanfly Engine Plugins - Move Route Core
// YEP_MoveRouteCore.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_MoveRouteCore = true;

var Yanfly = Yanfly || {};
Yanfly.MoveRoute = Yanfly.MoveRoute || {};
Yanfly.MoveRoute.version = 1.03;

//=============================================================================
 /*:
 * @plugindesc v1.03 Expand the number of movement options for the move
 * route events using this plugin.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * RPG Maker MV gives us a lot of various commands to use for our Move Routes.
 * However, it still imposes a lot of limitations on the system for what else
 * could still be potentially useful for move route commands. This plugin will
 * provide additional methods to construct move routes for your events and
 * allow you to streamline the move route creation process.
 *
 * ============================================================================
 * Instructions - Simplified Movement Routes
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
 * UP: x
 * LEFT: x
 * RIGHT: x
 * DOWN: x
 * UPPER LEFT: x
 * UPPER RIGHT: x
 * LOWER LEFT: x
 * LOWER RIGHT: x
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * This will make the designated event move the noted direction x amount of
 * times. This is no different than inserting a direction multiple times with
 * editor, but this is meant to serve as a way to consolidate commands.
 * Replace x with an integar value.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Up: 10
 *          Left: 7
 *          Down: 3
 *          Right: 4
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * ANIMATION: x
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Play animation x on the designated event.
 * Replace x with an integar value.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Animation: 10
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * BALLOON: x
 * BALLOON: EXCLAMATION
 * BALLOON: !
 * BALLOON: QUESTION
 * BALLOON: ?
 * BALLOON: MUSIC NOTE
 * BALLOON: HEART
 * BALLOON: ANGER
 * BALLOON: SWEAT
 * BALLOON: COBWEB
 * BALLOON: SILENCE
 * BALLOON: ...
 * BALLOON: LIGHT BULB
 * BALLOON: ZZZ
 * BALLOON: USER 1
 * BALLOON: USER 2
 * BALLOON: USER 3
 * BALLOON: USER 4
 * BALLOON: USER 5
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Plays balloon ID x on the designated event.
 * Replace x with an integar value or replace it with one of the strings shown
 * above to produce that specific balloon.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Balloon: 5
 *          Balloon: Heart
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * ICON BALLOON: x
 * ICON BALLOON: x to y
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Requires YEP_IconBalloons.
 * This will make the designated event display an icon balloon using icon x
 * or x to y if the latter is used.
 * Replace x and y with integar values.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Turn Away: 20, 30
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * JUMP FORWARD: x
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * The designated event will jump in the direction it is facing x tiles.
 * Replace x an integar value.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Jump Forward: 5
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * JUMP TO: x, y
 * JUMP TO: EVENT x
 * JUMP TO: PLAYER
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * The designated event will jump to either the coordinates x, y, or event x on
 * the map (if event x is present), or to the player's location.
 * Replace x and y with integar values.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Jump To: 20, 30
 *          Jump To: Event 5
 *          Jump To: Player
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * MOVE TO: x, y
 * MOVE TO: EVENT x
 * MOVE TO: PLAYER
 *
 * AVOID MOVE TO: x, y
 * AVOID MOVE TO: EVENT x
 * AVOID MOVE TO: PLAYER
 *
 * CRASH MOVE TO: x, y
 * CRASH MOVE TO: EVENT x
 * CRASH MOVE TO: PLAYER
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * The designated event will move to either the coordinates x, y, or event x on
 * the map (if event x is present), or to the player's location. The designated
 * event will determine what is the best route within 12 iterations to reach
 * the marked location. The designated event will keep repeating this command
 * until it has reached the coordinates.
 *
 * Replace x and y with integar values.
 *
 * 'Move To' and 'Avoid Move To' will make the designated event move around the
 * player and the player's followers when calculating a path to move to.
 *
 * 'Crash Move To' will allow collision with the player and/or followers.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Move To: 20, 30
 *          Move To: Event 5
 *          Move To: Player
 *          Avoid Move To: 30, 40
 *          Crash Move To: 40, 50
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * PATTERN LOCK: x
 * PATTERN UNLOCK
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * For some reason, RPG Maker MV does not allow you to set the currently used
 * pattern (sprite frame) within the Move Route editor. This command will allow
 * you to do so. If Pattern Lock is used, the sprite will remain locked in that
 * pattern position until unlocked.
 * Replace x an integar value.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Pattern Lock: 0
 *          Pattern Lock: 2
 *          Pattern Unlock
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * SELF SWITCH x: ON
 * SELF SWITCH x: OFF
 * SELF SWITCH x: TOGGLE
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * This will turn the self switch designed event (unless it's the player) to
 * either On, Off, or Toggle it On/Off.
 * Replace x with A, B, C, or D.
 * Those using YEP_SelfSwVar.js can use numbers, too.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Self Switch A: On
 *          Self Switch B: Off
 *          Self Switch 123: Toggle
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * SELF VARIABLE x: y
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Requires YEP_SelfSwVar.js. This will set the self variable x for the
 * designated event (unless it's the player) to y.
 * Replace x with an integar value.
 * Replace y with an integar value or code.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Self Variable A: On
 *          Self Variable B: Off
 *          Self Variable 123: Toggle
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * STEP AWAY FROM: x, y
 * STEP AWAY FROM: EVENT x
 * STEP AWAY FROM: PLAYER
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * This will make the designated event step one tile away from map coordinates
 * x, y, or event x on the map (if event x is present), or from the player's
 * current location.
 * Replace x and y with integar values.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Step Away: 20, 30
 *          Step Away: Event 5
 *          Step Away: Player
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * STEP TOWARD: x, y
 * STEP TOWARD: EVENT x
 * STEP TOWARD: PLAYER
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * This will make the designated event step one tile toward map coordinates
 * x, y, or event x on the map (if event x is present), or to the player's
 * current location.
 * Replace x and y with integar values.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Step Toward: 20, 30
 *          Step Toward: Event 5
 *          Step Toward: Player
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * TELEPORT: x, y
 * TELEPORT: EVENT x
 * TELEPORT: PLAYER
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * This will instantly teleport the designated event to coordinates x, y, or
 * event x on the map (if event x is present), or to the player's current
 * location on the map.
 * Replace x and y with integar values.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Teleport: 20, 30
 *          Teleport: Event 5
 *          Teleport: Player
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * TURN AWAY FROM: x, y
 * TURN AWAY FROM: EVENT x
 * TURN AWAY FROM: PLAYER
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * This will make the designated event turn away from map coordinates x, y, or
 * event x on the map (if event x is present), or from the player's location.
 * Replace x and y with integar values.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Turn Away: 20, 30
 *          Turn Away: Event 5
 *          Turn Away: Player
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * TURN TOWARDS: x, y
 * TURN TOWARDS: EVENT x
 * TURN TOWARDS: PLAYER
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * This will make the designated event turn towards tile toward map coordinates
 * x, y, or event x on the map (if event x is present), or to the player's
 * current location.
 * Replace x and y with integar values.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Example: Turn Towards: 50, 60
 *          Turn Towards: Event 5
 *          Turn Towards: Player
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * And that's it for the specialized movement routes you can use.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * These are some notetags you can utilize for your events.
 *
 * Event Notetags:
 *
 *   <Always Update Movement>
 *   - Most events don't update unless they're close to the screen. But any
 *   event with this notetag will always be updating regardless of whether they
 *   are close to the screen or not.
 *
 * ============================================================================
 * Lunatic Mode - Script Calls
 * ============================================================================
 *
 * For those with JavaScript experience and would like to use the raw command
 * functions without resorting to the simplified commands, you can use the
 * following code inside of a Script:
 *
 *   this.jumpForward(x)
 *   - Replace x with the amount of tiles you want the designated event to jump
 *   forward. x will be automatically rounded to the nearest integar value if
 *   it is a float value.
 *
 *   this.jumpToPoint(x, y)
 *   - Replace x and y with the coordinates you wish for the designated event
 *   to jump towards. x and y will be automatically rounded to the nearest
 *   integar value if it is a float value.
 *
 *   this.jumpToEvent(x)
 *   - Replace x with the ID of the event you wish for the designated event to
 *   jump towards. x will be automatically rounded to the nearest integar value
 *   if it is a float value. If 0 is used, it will refer to the player.
 *
 *   this.moveRepeat(direction, times)
 *   - This will make the designated event move in 'direction' a certain amount
 *   of 'times'. Replace 'direction' with the number value you wish the event
 *   to move in (refer to NumPad) and replace 'times' with the number of times
 *   to step in that direction.
 *
 *   this.moveToPoint(x, y)
 *   - This will calculate the best possible movement route for the designated
 *   event to reach coordinates x, y within 12 iterations. The designated event
 *   will keep repeating this command until it has reached the coordinates.
 *   This will cause the designated event to go around the player and followers
 *   on the map without colliding into them.
 *
 *   this.moveToPoint(x, y, true)
 *   - This will calculate the best possible movement route for the designated
 *   event to reach coordinates x, y within 12 iterations. The designated event
 *   will keep repeating this command until it has reached the coordinates.
 *   This will cause the designated event to crash into the player and/or any
 *   followers if they are in the path way.
 *
 *   this.moveToEvent(x)
 *   - This will calculate the best possible movement route for the designated
 *   event to reach event x within 12 iterations. The designated event will
 *   keep repeating this command until it has reached the coordinates. If 0 is
 *   used, it will refer to the player. This will cause the designated event to
 *   go around the player and followers on the map without colliding into them.
 *
 *   this.moveToEvent(x, true)
 *   - This will calculate the best possible movement route for the designated
 *   event to reach event x within 12 iterations. The designated event will
 *   keep repeating this command until it has reached the coordinates. If 0 is
 *   used, it will refer to the player. This will cause the designated event to
 *   crash into the player and/or any followers if they are in the path way.
 *
 *   this.requestAnimation(x)
 *   - Replace x with the animation ID you want to play on the designated
 *   event. x will be automatically rounded to the nearest integar value if it
 *   is a float value.
 *
 *   this.requestBalloon(x)
 *   - Replace x with the balloon ID you want to play on the designated event.
 *   x will be automatically rounded to the nearest integar value if it is a
 *   float value.
 *
 *   this.stepAwayFromPoint(x, y)
 *   - Replace x and y with the coordinates you wish for the designated event
 *   to step away from. x and y will be automatically rounded to the nearest
 *   integar value if it is a float value.
 *
 *   this.stepAwayFromEvent(x)
 *   - Replace x with the ID of the event you wish for the designated event to
 *   step away from. x will be automatically rounded to the nearest integar
 *   value if it is a float value. If 0 is used, it will refer to the player.
 *
 *   this.stepTowardPoint(x, y)
 *   - Replace x and y with the coordinates you wish for the designated event
 *   to step towards. x and y will be automatically rounded to the nearest
 *   integar value if it is a float value.
 *
 *   this.stepTowardPoint(x, y)
 *   - Replace x and y with the coordinates you wish for the designated event
 *   to step towards. x and y will be automatically rounded to the nearest
 *   integar value if it is a float value.
 *
 *   this.stepTowardEvent(x)
 *   - Replace x with the ID of the event you wish for the designated event to
 *   step towards. x will be automatically rounded to the nearest integar value
 *   if it is a float value. If 0 is used, it will refer to the player.
 *
 *   this.teleportToPoint(x, y)
 *   - Replace x and y with the coordinates you wish for the designated event
 *   to teleport to. x and y will be automatically rounded to the nearest
 *   integar value if it is a float value.
 *
 *   this.teleportToEvent(x)
 *   - Replace x with the ID of the event you wish for the designated event to
 *   teleport to. x will be automatically rounded to the nearest integar value
 *   if it is a float value. If 0 is used, it will refer to the player.
 *
 *   this.turnAwayFromPoint(x, y)
 *   - Replace x and y with the coordinates you wish for the designated event
 *   to turn away from. x and y will be automatically rounded to the nearest
 *   integar value if it is a float value.
 *
 *   this.turnAwayFromEvent(x)
 *   - Replace x with the ID of the event you wish for the designated event to
 *   turn away from. x will be automatically rounded to the nearest integar
 *   value if it is a float value. If 0 is used, it will refer to the player.
 *
 *   this.turnTowardPoint(x, y)
 *   - Replace x and y with the coordinates you wish for the designated event
 *   to turn towards. x and y will be automatically rounded to the nearest
 *   integar value if it is a float value.
 *
 *   this.turnTowardEvent(x)
 *   - Replace x with the ID of the event you wish for the designated event to
 *   turn towards. x will be automatically rounded to the nearest integar value
 *   if it is a float value. If 0 is used, it will refer to the player.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.03:
 * - Bypass the isDevToolsOpen() error when bad code is inserted into a script
 * call or custom Lunatic Mode code segment due to updating to MV 1.6.1.
 *
 * Version 1.02:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.01:
 * - Bug fixed for the repeated commands that caused the commands to add upon
 * one another.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Game_Character
//=============================================================================

Yanfly.MoveRoute.Game_Character_setMoveRoute =
  Game_Character.prototype.setMoveRoute;
Game_Character.prototype.setMoveRoute = function(moveRoute) {
  var route = JsonEx.makeDeepCopy(moveRoute);
  Yanfly.MoveRoute.Game_Character_setMoveRoute.call(this, route);
};

Yanfly.MoveRoute.Game_Character_processMoveCommand =
  Game_Character.prototype.processMoveCommand;
Game_Character.prototype.processMoveCommand = function(command) {
  var gc = Game_Character;
  switch (command.code) {
  case gc.ROUTE_SCRIPT:
    this.processMoveRouteScriptCall(command.parameters[0]);
    break;
  default:
    Yanfly.MoveRoute.Game_Character_processMoveCommand.call(this, command);
    break;
  }
};

Game_Character.prototype.processMoveRouteScriptCall = function(line) {
  // EVAL
  if (line.match(/EVAL:[ ](.*)/i)) {
    this.processMoveRouteEval(String(RegExp.$1));
  // ANIMATION
  } else if (line.match(/(?:ANIMATION|REQUEST ANIMATION):[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    this.requestAnimation(x);
  // ICON BALLOON
  } else if (line.match(/(?:ICON BALLOON|REQUEST ICON BALLOON):[ ](.*)/i)) {
    var str = String(RegExp.$1);
    this.processMoveRouteIconBalloon(str);
  // BALLOON
  } else if (line.match(/(?:BALLOON|REQUEST BALLOON):[ ](.*)/i)) {
    var str = String(RegExp.$1);
    this.processMoveRouteBalloon(str);
  // JUMP FORWARD
  } else if (line.match(/(?:JUMP FORWARD|JUMP FORWARDS):[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    this.jumpForward(x);
  // JUMP TO: POINT
  } else if (line.match(/JUMP[ ](?:TO|TOWARD|TOWARDS):[ ](\d+),[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    var y = parseInt(RegExp.$2);
    this.jumpToPoint(x, y);
  // JUMP TO: EVENT
  } else if (line.match(/JUMP[ ](?:TO|TOWARD|TOWARDS):[ ]EVENT[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    this.jumpToEvent(x);
  // JUMP TO: PLAYER
  } else if (line.match(/JUMP[ ](?:TO|TOWARD|TOWARDS):[ ]PLAYER/i)) {
    this.jumpToEvent(0);
  // MOVE TO: POINT
  } else if (line.match(/MOVE[ ](?:TO|TOWARD|TOWARDS):[ ](\d+),[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    var y = parseInt(RegExp.$2);
    var collision = this.checkCollisionKeywords(line);
    this.moveToPoint(x, y, collision);
  // MOVE TO: EVENT
  } else if (line.match(/MOVE[ ](?:TO|TOWARD|TOWARDS):[ ]EVENT[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    var collision = this.checkCollisionKeywords(line);
    this.moveToEvent(x, collision);
  // MOVE TO: PLAYER
  } else if (line.match(/MOVE[ ](?:TO|TOWARD|TOWARDS):[ ]PLAYER/i)) {
    this.moveToEvent(0);
  // PATTERN LOCK
  } else if (line.match(/(?:PATTERN LOCK):[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    this.patternLock(x);
  // PATTERN UNLOCK
  } else if (line.match(/(?:PATTERN UNLOCK)/i)) {
    this.patternUnlock();
  // SELF SWITCH: ON
  } else if (line.match(/(?:SELF SWITCH)[ ](.*):[ ]ON/i)) {
    var str = String(RegExp.$1);
    this.processMoveRouteSelfSwitch(str, 'on');
  // SELF SWITCH: OFF
  } else if (line.match(/(?:SELF SWITCH)[ ](.*):[ ]OFF/i)) {
    var str = String(RegExp.$1);
    this.processMoveRouteSelfSwitch(str, 'off');
  // SELF SWITCH: TOGGLE
  } else if (line.match(/(?:SELF SWITCH)[ ](.*):[ ]TOGGLE/i)) {
    var str = String(RegExp.$1);
    this.processMoveRouteSelfSwitch(str, 'toggle');
  // SELF VARIABLE
  } else if (line.match(/(?:SELF VARIABLE)[ ](.*):[ ](.*)/i)) {
    var str = String(RegExp.$1);
    var code = String(RegExp.$2);
    this.processMoveRouteSelfVariable(str, code);
  // STEP AWAY FROM: POINT
  } else if (line.match(/(?:STEP AWAY|STEP AWAY FROM):[ ](\d+),[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    var y = parseInt(RegExp.$2);
    this.stepAwayFromPoint(x, y);
  // STEP AWAY FROM: EVENT
  } else if (line.match(/(?:STEP AWAY|STEP AWAY FROM):[ ]EVENT[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    this.stepAwayFromEvent(x);
  // STEP AWAY FROM: PLAYER
  } else if (line.match(/(?:STEP AWAY|STEP AWAY FROM):[ ]PLAYER/i)) {
    this.stepAwayFromEvent(0);
  // STEP TOWARD: POINT
  } else if (line.match(/(?:STEP TOWARD|STEP TOWARDS):[ ](\d+),[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    var y = parseInt(RegExp.$2);
    this.stepTowardPoint(x, y);
  // STEP TOWARD: EVENT
  } else if (line.match(/(?:STEP TOWARD|STEP TOWARDS):[ ]EVENT[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    this.stepTowardEvent(x);
  // STEP TOWARD: PLAYER
  } else if (line.match(/(?:STEP TOWARD|STEP TOWARDS):[ ]PLAYER/i)) {
    this.stepTowardEvent(0);
  // TELEPORT: POINT
  } else if (line.match(/(?:TELEPORT|TELEPORT TO):[ ](\d+),[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    var y = parseInt(RegExp.$2);
    this.teleportToPoint(x, y);
  // TELEPORT: EVENT
  } else if (line.match(/(?:TELEPORT):[ ]EVENT[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    this.teleportToEvent(x);
  // TELEPORT: PLAYER
  } else if (line.match(/(?:TELEPORT):[ ]PLAYER/i)) {
    this.teleportToEvent(0);
  // TURN AWAY FROM: POINT
  } else if (line.match(/(?:TURN AWAY FROM|TURN AWAY):[ ](\d+),[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    var y = parseInt(RegExp.$2);
    this.turnAwayFromPoint(x, y);
  // TURN AWAY FROM: EVENT
  } else if (line.match(/(?:TURN AWAY FROM|TURN AWAY):[ ]EVENT[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    this.turnAwayFromEvent(x);
  // TURN AWAY FROM: PLAYER
  } else if (line.match(/(?:TURN AWAY FROM|TURN AWAY):[ ]PLAYER/i)) {
    this.turnAwayFromEvent(0);
  // TURN TOWARD: POINT
  } else if (line.match(/(?:TURN TOWARD|TURN TOWARDS):[ ](\d+),[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    var y = parseInt(RegExp.$2);
    this.turnTowardPoint(x, y);
  // TURN TOWARD: EVENT
  } else if (line.match(/(?:TURN TOWARD|TURN TOWARDS):[ ]EVENT[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    this.turnTowardEvent(x);
  // TURN TOWARD: PLAYER
  } else if (line.match(/(?:TURN TOWARD|TURN TOWARDS):[ ]PLAYER/i)) {
    this.turnTowardEvent(0);
  // MOVE DIRECTION
  } else if (line.match(/(?:MOVE LOWER LEFT|LOWER LEFT):[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    this.moveRepeat(1, x);
  } else if (line.match(/(?:MOVE LOWER RIGHT|LOWER RIGHT):[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    this.moveRepeat(3, x);
  } else if (line.match(/(?:MOVE UPPER LEFT|UPPER LEFT):[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    this.moveRepeat(7, x);
  } else if (line.match(/(?:MOVE UPPER RIGHT|UPPER RIGHT):[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    this.moveRepeat(9, x);
  } else if (line.match(/(?:MOVE UP|UP):[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    this.moveRepeat(8, x);
  } else if (line.match(/(?:MOVE DOWN|DOWN):[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    this.moveRepeat(2, x);
  } else if (line.match(/(?:MOVE LEFT|LEFT):[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    this.moveRepeat(4, x);
  } else if (line.match(/(?:MOVE RIGHT|RIGHT):[ ](\d+)/i)) {
    var x = parseInt(RegExp.$1);
    this.moveRepeat(6, x);
  // ELSE/EVAL
  } else {
    this.processMoveRouteEval(line);
  }
};

Game_Character.prototype.checkCollisionKeywords = function(line) {
  if (line.match(/(?:CRASH|COLLIDE|COLLISION|ENCOUNTER|TOUCH)/i)) {
    return true;
  } else if (line.match(/(?:AVOID|EVADE|DODGE)/i)) {
    return false;
  } else {
    return false;
  }
};

Game_Character.prototype.processMoveRouteEval = function(code) {
  var a = this;
  var b = this;
  var player = $gamePlayer;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  try {
    eval(code);
  } catch (e) {
    Yanfly.Util.displayError(e, code, 'MOVE ROUTE SCRIPT ERROR');
  }
};

Game_Character.prototype.processMoveRouteIconBalloon = function(str) {
  if (!Yanfly.IBalloon) return;
  if (str.match(/(\d+)[ ]TO[ ](\d+)/i)) {
    var iconIndex1 = parseInt(RegExp.$1);
    var iconIndex2 = parseInt(RegExp.$2);
  } else if (str.match(/(\d+)/i)) {
    var iconIndex1 = parseInt(RegExp.$1);
    var iconIndex2 = iconIndex1;
  } else {
    return;
  }
  this.setIconBalloon(iconIndex1, iconIndex2);
};

Game_Character.prototype.processMoveRouteBalloon = function(str) {
  var id = 0;
  if (str.match(/(?:EXCLAMATION|\!)/i)) {
    id = 1;
  } else if (str.match(/(?:QUESTION|\?)/i)) {
    id = 2;
  } else if (str.match(/(?:MUSIC NOTE|MUSIC|NOTE)/i)) {
    id = 3;
  } else if (str.match(/(?:HEART|LOVE)/i)) {
    id = 4;
  } else if (str.match(/(?:ANGER)/i)) {
    id = 5;
  } else if (str.match(/(?:SWEAT)/i)) {
    id = 6;
  } else if (str.match(/(?:COBWEB)/i)) {
    id = 7;
  } else if (str.match(/(?:SILENCE|\.\.\.)/i)) {
    id = 8;
  } else if (str.match(/(?:LIGHT BULB|LIGHT|BULB)/i)) {
    id = 9;
  } else if (str.match(/(?:ZZZ|ZZ|Z)/i)) {
    id = 10;
  } else if (str.match(/(?:USER|USER-DEFINED|USER DEFINED)[ ](\d+)/i)) {
    id = 10 + parseInt(RegExp.$1);
  }
  this.requestBalloon(id);
};

Game_Character.prototype.processMoveRouteSelfSwitch = function(str, setting) {
  if (this === $gamePlayer) return;
  if (Imported.YEP_SelfSwVar && str.match(/(\d+)/i)) {
    var keyName = 'SELF SWITCH ' + parseInt(RegExp.$1);
  } else {
    var keyName = str.toUpperCase();
  }
  var key = [$gameMap.mapId(), this.eventId(), keyName];
  if (setting.toUpperCase() === 'ON') {
    $gameSelfSwitches.setValue(key, true);
  } else if (setting.toUpperCase() === 'OFF') {
    $gameSelfSwitches.setValue(key, false);
  } else if (setting.toUpperCase() === 'TOGGLE') {
    $gameSelfSwitches.setValue(key, !$gameSelfSwitches.value(key));
  }
};

Game_Character.prototype.processMoveRouteSelfVariable = function(str, code) {
  if (!Imported.YEP_SelfSwVar) return;
  if (this === $gamePlayer) return;
  if (str.match(/(\d+)/i)) {
    var keyName = 'SELF VARIABLE ' + parseInt(RegExp.$1);
  } else {
    var keyName = str.toUpperCase();
  }
  var key = [$gameMap.mapId(), this.eventId(), keyName];
  try {
    var value = eval(code);
  } catch (e) {
    var value = 0;
    Yanfly.Util.displayError(e, code, 'MOVE ROUTE SELF VARIABLE SCRIPT ERROR');
  }
  $gameSelfSwitches.setValue(key, value);
};

// Simplified Functions

Game_Character.prototype.jumpForward = function(distance) {
  distance = Math.round(distance);
  var direction = this.direction();
  var dx = 0;
  var dy = 0;
  switch (direction) {
  case 1:
    dx = -distance;
    dy = distance;
    break;
  case 2:
    dy = distance;
    break;
  case 3:
    dx = distance;
    dy = distance;
    break;
  case 4:
    dx = -distance;
    break;
  case 6:
    dx = distance;
    break;
  case 7:
    dx = -distance;
    dy = -distance;
    break;
  case 8:
    dy = -distance;
    break;
  case 9:
    dx = distance;
    dy = -distance;
    break;
  }
  this.jump(dx, dy);
};

Game_Character.prototype.jumpToPoint = function(x, y) {
  x = Math.round(x);
  y = Math.round(y);
  dx = (this.x - x) * -1;
  dy = (this.y - y) * -1;
  this.jump(dx, dy);
};

Game_Character.prototype.jumpToEvent = function(eventId) {
  if (eventId === 0) {
    var x = $gamePlayer.x;
    var y = $gamePlayer.y;
    this.jumpToPoint(x, y);
  } else {
    var ev = $gameMap.event(eventId);
    if (!ev) return;
    var x = ev.x;
    var y = ev.y;
    this.jumpToPoint(x, y);
  }
};

Game_Character.prototype.moveRepeat = function(direction, times) {
  times = times || 0;
  times = Math.round(times);
  var command = {
    code: 1,
    indent: null,
    parameters: []
  }
  var gc = Game_Character;
  switch (direction) {
  case 1:
    command.code = gc.ROUTE_MOVE_LOWER_L;
    break;
  case 2:
    command.code = gc.ROUTE_MOVE_DOWN;
    break;
  case 3:
    command.code = gc.ROUTE_MOVE_LOWER_R;
    break;
  case 4:
    command.code = gc.ROUTE_MOVE_LEFT;
    break;
  case 5:
    return;
    break;
  case 6:
    command.code = gc.ROUTE_MOVE_RIGHT;
    break;
  case 7:
    command.code = gc.ROUTE_MOVE_UPPER_L;
    break;
  case 8:
    command.code = gc.ROUTE_MOVE_UP;
    break;
  case 9:
    command.code = gc.ROUTE_MOVE_UPPER_R;
    break;
  }
  this._moveRoute = JsonEx.makeDeepCopy(this._moveRoute);
  while (times--) {
    this._moveRoute.list.splice(this._moveRouteIndex + 1, 0, command);
  }
};

Game_CharacterBase.prototype.moveToPoint = function(x, y, collision) {
  collision = collision || false;
  x = Math.round(x);
  y = Math.round(y);
  if (collision) $gameTemp._moveAllowPlayerCollision = true;
  var direction = this.findDirectionTo(x, y);
  if (collision) $gameTemp._moveAllowPlayerCollision = false;
  if (direction > 0) this.moveStraight(direction);
  if (this.x !== x || this.y !== y) this._moveRouteIndex -= 1;
  this.setMovementSuccess(true);
};

Game_CharacterBase.prototype.moveTowardPoint = function(x, y, collision) {
  this.moveToPoint(x, y, collision);
};

Game_Character.prototype.moveToEvent = function(eventId, collision) {
  collision = collision || false;
  if (eventId === 0) {
    var x = $gamePlayer.x;
    var y = $gamePlayer.y;
    this.moveToPoint(x, y, collision);
  } else {
    var ev = $gameMap.event(eventId);
    if (!ev) return;
    var x = ev.x;
    var y = ev.y;
    this.moveToPoint(x, y, collision);
  }
};

Game_Character.prototype.patternLock = function(index) {
  index = Math.round(index);
  this._patternMoveRouteLocked = true;
  this.setPattern(index);
};

Game_Character.prototype.patternUnlock = function() {
  this._patternMoveRouteLocked = false;
};

Game_Character.prototype.stepAwayFromPoint = function(x, y) {
  var sx = this.deltaXFrom(Math.round(x));
  var sy = this.deltaYFrom(Math.round(y));
  if (Math.abs(sx) > Math.abs(sy)) {
    this.moveStraight(sx > 0 ? 6 : 4);
    if (!this.isMovementSucceeded() && sy !== 0) {
      this.moveStraight(sy > 0 ? 2 : 8);
    }
  } else if (sy !== 0) {
    this.moveStraight(sy > 0 ? 2 : 8);
    if (!this.isMovementSucceeded() && sx !== 0) {
      this.moveStraight(sx > 0 ? 6 : 4);
    }
  }
};

Game_Character.prototype.stepAwayFromEvent = function(eventId) {
  if (eventId === 0) {
    var x = $gamePlayer.x;
    var y = $gamePlayer.y;
    this.stepAwayFromPoint(x, y);
  } else {
    var ev = $gameMap.event(eventId);
    if (!ev) return;
    var x = ev.x;
    var y = ev.y;
    this.stepAwayFromPoint(x, y);
  }
};

Game_Character.prototype.stepTowardPoint = function(x, y) {
  var sx = this.deltaXFrom(Math.round(x));
  var sy = this.deltaYFrom(Math.round(y));
  if (Math.abs(sx) > Math.abs(sy)) {
    this.moveStraight(sx > 0 ? 4 : 6);
    if (!this.isMovementSucceeded() && sy !== 0) {
      this.moveStraight(sy > 0 ? 8 : 2);
    }
  } else if (sy !== 0) {
    this.moveStraight(sy > 0 ? 8 : 2);
    if (!this.isMovementSucceeded() && sx !== 0) {
      this.moveStraight(sx > 0 ? 4 : 6);
    }
  }
};

Game_Character.prototype.stepTowardEvent = function(eventId) {
  if (eventId === 0) {
    var x = $gamePlayer.x;
    var y = $gamePlayer.y;
    this.stepTowardPoint(x, y);
  } else {
    var ev = $gameMap.event(eventId);
    if (!ev) return;
    var x = ev.x;
    var y = ev.y;
    this.stepTowardPoint(x, y);
  }
};

Game_Character.prototype.teleportToPoint = function(x, y) {
  x = Math.round(x);
  y = Math.round(y);
  this.locate(x, y);
};

Game_Character.prototype.teleportToEvent = function(eventId) {
  if (eventId === 0) {
    var x = $gamePlayer.x;
    var y = $gamePlayer.y;
    this.teleportToPoint(x, y);
  } else {
    var ev = $gameMap.event(eventId);
    if (!ev) return;
    var x = ev.x;
    var y = ev.y;
    this.teleportToPoint(x, y);
  }
};

Game_Character.prototype.turnAwayFromPoint = function(x, y) {
  x = Math.round(x);
  y = Math.round(y);
  var sx = this.deltaXFrom(x);
  var sy = this.deltaYFrom(y);
  if (Math.abs(sx) > Math.abs(sy)) {
    this.setDirection(sx > 0 ? 6 : 4);
  } else if (sy !== 0) {
    this.setDirection(sy > 0 ? 2 : 8);
  }
};

Game_Character.prototype.turnAwayFromEvent = function(eventId) {
  if (eventId === 0) {
    var x = $gamePlayer.x;
    var y = $gamePlayer.y;
    this.turnAwayFromPoint(x, y);
  } else {
    var ev = $gameMap.event(eventId);
    if (!ev) return;
    var x = ev.x;
    var y = ev.y;
    this.turnAwayFromPoint(x, y);
  }
};

Game_Character.prototype.turnTowardPoint = function(x, y) {
  x = Math.round(x);
  y = Math.round(y);
  var sx = this.deltaXFrom(x);
  var sy = this.deltaYFrom(y);
  if (Math.abs(sx) > Math.abs(sy)) {
    this.setDirection(sx > 0 ? 4 : 6);
  } else if (sy !== 0) {
    this.setDirection(sy > 0 ? 8 : 2);
  }
};

Game_Character.prototype.turnTowardEvent = function(eventId) {
  if (eventId === 0) {
    var x = $gamePlayer.x;
    var y = $gamePlayer.y;
    this.turnTowardPoint(x, y);
  } else {
    var ev = $gameMap.event(eventId);
    if (!ev) return;
    var x = ev.x;
    var y = ev.y;
    this.turnTowardPoint(x, y);
  }
};

//=============================================================================
// Game_CharacterBase
//=============================================================================

Yanfly.MoveRoute.Game_CharacterBase_isNearTheScreen =
  Game_CharacterBase.prototype.isNearTheScreen;
Game_CharacterBase.prototype.isNearTheScreen = function() {
  if (this._isAlwaysUpdateMovement) return true;
  return Yanfly.MoveRoute.Game_CharacterBase_isNearTheScreen.call(this);
};

Yanfly.MoveRoute.Game_CharacterBase_updatePattern =
  Game_CharacterBase.prototype.updatePattern;
Game_CharacterBase.prototype.updatePattern = function() {
  if (this._patternMoveRouteLocked) return;
  Yanfly.MoveRoute.Game_CharacterBase_updatePattern.call(this);
};

Yanfly.MoveRoute.Game_CharacterBase_requestAnimation =
  Game_CharacterBase.prototype.requestAnimation;
Game_CharacterBase.prototype.requestAnimation = function(animationId) {
  animationId = Math.round(animationId);
  Yanfly.MoveRoute.Game_CharacterBase_requestAnimation.call(this, animationId);
};

//=============================================================================
// Game_Event
//=============================================================================

Yanfly.MoveRoute.Game_Event_updateSelfMovement =  
  Game_Event.prototype.updateSelfMovement;
Game_Event.prototype.updateSelfMovement = function() {
  if (this._isAlwaysUpdateMovement === undefined) this.checkUpdateSelfMove();
  Yanfly.MoveRoute.Game_Event_updateSelfMovement.call(this);
};

Game_Event.prototype.checkUpdateSelfMove = function() {
  var note = this.event().note;
  this._isAlwaysUpdateMovement = note.match(/<ALWAYS UPDATE MOVEMENT>/i);
};

Yanfly.MoveRoute.Game_Event_isPlayerCollided =
  Game_Event.prototype.isCollidedWithPlayerCharacters;
Game_Event.prototype.isCollidedWithPlayerCharacters = function(x, y) {
  if ($gameTemp._moveAllowPlayerCollision) return false;
  return Yanfly.MoveRoute.Game_Event_isPlayerCollided.call(this, x, y);
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.displayError = function(e, code, message) {
  console.log(message);
  console.log(code || 'NON-EXISTENT');
  console.error(e);
  if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= "1.6.0") return;
  if (Utils.isNwjs() && Utils.isOptionValid('test')) {
    if (!require('nw.gui').Window.get().isDevToolsOpen()) {
      require('nw.gui').Window.get().showDevTools();
    }
  }
};

//=============================================================================
// End of File
//=============================================================================