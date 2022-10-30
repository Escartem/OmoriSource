//-----------------------------------------------------------------------------
//  Galv's Move Route Extras
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  GALV_MoveRouteExtras.js
//-----------------------------------------------------------------------------
//  2015-11-05 - Version 1.1 - added ability to change graphic to a frame
//  2015-10-23 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_MoveRouteExtras = true;

var Galv = Galv || {};        // Galv's main object
Galv.MRE = Galv.MRE || {};    // Galv's Move Route Extra's stuff

//-----------------------------------------------------------------------------
/*:
 * @plugindesc Additional SCRIPT commands to use within MOVE ROUTES
 * View the plugin "Help" to view available commands.
 * @author Galv - galvs-scripts.com
 
 * @help
 *   Galv's Move Route Extras
 * ----------------------------------------------------------------------------
 * This script enables users to use commands in the 'script' function of
 * MOVE ROUTES. The available commands are listed below.
 *
 * ----------------------------------------------------------------------------
 *   SCRIPT calls for MOVE ROUTES
 * ----------------------------------------------------------------------------
 * this.jump_forward(x);        // Jump forward x tiles
 * this.jump_to(x,y);           // Jump to x,y co-ordinates on the map
 * this.jump_to(i);             // Jump to character's x,y location
 *                              // i = event id. Make it 0 for player
 * this.step_toward(x,y);       // Step toward x,y co-ordinates on the map
 * this.step_toward(i);         // Step toward a character's x,y location
 *                              // i = event id. 0 works for player, too
 * this.step_away(x,y);         // Step away from x,y co-ordinates on the map
 * this.step_away(i);           // Step away from a character's x,y location
 *                              // i = event id. 0 works for player, too
 * this.turn_toward(x,y);       // Face toward x,y co-ordinates on the map
 * this.turn_toward(i);         // Face toward a character's x,y location
 *                              // i = event id. 0 works for player, too
 * this.turn_away(x,y);         // Turn away from x,y map co-ordinates
 * this.turn_away(i);           // Turn away from a character's x,y location
 *                              // i = event id. 0 works for player, too
 * this.sswitch("n",status);    // Change self switch "n" to status true/false
 * this.rwait(low,high);        // wait a random time between low and high
 *
 * this.fade(s);                // s is the fade speed.
 *                              // Positive fades in, Negative fades out.
 * this.step_rand(id,id,id);    // Move randomly only on specified region id's
 *                              // Multiple id's can be used, comma separated
 * this.repeat_begin(n);        // Repeat the next move commands between this..
 * this.repeat_end();           // and repeat_end n number of times
 *
 * this.set_frame("name",index,pattern,direction)   // set graphic to a frame
 *
 * // "name"    - is the characterset file name
 * // index     - the number of the character in the characterset (1-8)
 * // pattern   - the stepping frame (1-3)
 * // direction - the direction the event is facing (2,4,6,8)
 * // Once a character has been set to a frame, it wont change when moving
 * // until you restore the character using the below move route script:
 *
 * this.restore_frame()         // unlocks the frame chosen in set_frame
 *
 *
 * // Below are a couple of useful codes that work without this script
 * this.requestBalloon(n);      // Displays the balloon that has id of n
 * this.requestAnimation(n);    // Displays animation that has id of n
 *
 * ----------------------------------------------------------------------------
 *   EXAMPLES OF USE
 * ----------------------------------------------------------------------------
 * this.jump_forward(3);        // Jumps 3 tiles the direction character faces
 * this.jump_to(5);             // Jump to event 5's position
 * this.jump_to(10,16);         // Jump to x10, y15
 * this.step_toward(3);         // Takes a step toward event 3's position
 * this.step_away(12,8);        // Takes a step away from x12, y8 co-ordinates
 * this.sswitch("A",true);      // Turns self switch "A" ON for event
 * this.sswitch("B",false);     // Turns self switch "B" OFF for event
 * this.rwait(60,120);          // Waits randomly between 60 and 120 frames
 * this.fade(-10);              // Fades out character
 * this.step_rand(1,4,7);       // Take a step randomly, only on regions 1,4,7
 * this.requestAnimation(2);    // Shows animation 2 on character
 * ----------------------------------------------------------------------------
 */

//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

(function() {
Game_Character.prototype.repeat_times = 0;
Game_Character.prototype.repeat_start_index = 0;


// REPEATING COMMANDS
Game_Character.prototype.repeat_begin = function(times) {
	this.repeats = times - 1;
	this.repeat_start_index = this._moveRouteIndex;
};

Game_Character.prototype.repeat_end = function() {
	if (this.repeats > 0) {
		this._moveRouteIndex = this.repeat_start_index;
		this.repeats -= 1;
	};
};

// FADING
Game_Character.prototype.fade = function(speed) {
	// Change opacity
	this.setOpacity(this.opacity() + speed);
	// Repeat until finished
	if (speed > 0 && this.opacity() < 255) {
		this._moveRouteIndex -= 1;
	} else if (speed < 0 && this.opacity() > 0) {
		this._moveRouteIndex -= 1;
	};
};

// JUMP FORWARD 
Game_Character.prototype.jump_forward = function(count) {
	var sx = 0, sy = 0;
 
	switch (this.direction()) {
    case 2:
        sy = count;
        break;
    case 4:
        sx = -count;
        break;
    case 6:
        sx = count;
        break;
    case 8:
        sy = -count;
        break;
    };
	this.jump(sx,sy);
};
 
// JUMP TO
Game_Character.prototype.jump_to = function() {
	var sx = 0, sy = 0;
	
	if (arguments.length > 1) {
		// x,y coords
		sx = this.x - arguments[0];
		sy = this.y - arguments[1];
	} else if (arguments.length === 1) {
		// Character ID
		if (arguments[0] === 0) {
			// Is player
			sx = this.x - $gamePlayer.x;
			sy = this.y - $gamePlayer.y;
		} else {
			// Is event
			sx = this.x - $gameMap._events[arguments[0]].x;
			sy = this.y - $gameMap._events[arguments[0]].y;
		};
	};
	this.jump(-sx,-sy);
};
	 
// STEP TOWARD	 
Game_Character.prototype.step_toward = function() {
	var char = Galv.MRE.getMrChar(arguments);
	if (char) this.moveTowardCharacter(char);
};

// STEP AWAY
Game_Character.prototype.step_away = function() {
	var char = Galv.MRE.getMrChar(arguments);
	if (char) this.moveAwayFromCharacter(char);
};

// TURN TOWARD
Game_Character.prototype.turn_toward = function() {
	var char = Galv.MRE.getMrChar(arguments);
    if (char) this.turnTowardCharacter(char);
};

Game_Character.prototype.turn_away = function() {
	var char = Galv.MRE.getMrChar(arguments);
    if (char) this.turnAwayFromCharacter(char);
};


// GET MR CHARACTER
Galv.MRE.getMrChar = function(arguments) {
	var char = null;
	if (arguments.length > 1) {
		// Move toward x,y
		char = { x : arguments[0], y : arguments[1]	};
	} else if (arguments.length === 1) {
		if (arguments[0] === 0) {
			// Is player
			char = $gamePlayer;
		} else {
			// Is event
			char = $gameMap._events[arguments[0]];
		};
	};
	return char;
};



// SELF SWITCHES
Game_Character.prototype.sswitch = function(letter,status,eid,mapid) {
	var key = [mapid || $gameMap.mapId(), eid || this.eventId(), letter];
	$gameSelfSwitches.setValue(key, status);
};

// RANDOM WAIT
Game_Character.prototype.rwait = function(low,high) {
	this._waitCount = Math.randomInt(high - low) + low;
};

// MOVE RANDOM ON REGION
Game_Character.prototype.step_rand = function() {
    var d = 2 + Math.randomInt(4) * 2;
	
	// If region is not there, return false.
	var x2 = $gameMap.roundXWithDirection(this.x, d);
    var y2 = $gameMap.roundYWithDirection(this.y, d);
	var region_test = false;
	
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] === $gameMap.regionId(x2, y2)) {
			region_test = true;
			break;
        };
    };
	
	if (!region_test) return false;
    if (!$gameMap.isValid(x2, y2)) return false;
    if (this.canPass(this.x, this.y, d)) {
        this.moveStraight(d);
    };
};

// SET TO CHARACTER FRAME
Game_Character.prototype.set_frame = function(name,index,pattern,direction) {
	this.gstop = true;
	this._direction = direction;
	this._pattern = pattern - 1;
	this._characterName = name !== "" ? name : this._characterName;
	this._characterIndex = index - 1;
};

// RESTORE CHAR ANIMATION
Game_Character.prototype.restore_frame = function() {
	this.gstop = false;
};

// MOD
var Galv_Game_CharacterBase_updatePattern = Game_CharacterBase.prototype.updatePattern;
Game_CharacterBase.prototype.updatePattern = function() {
	if (this.gstop) return;
	Galv_Game_CharacterBase_updatePattern.call(this);
};

})();