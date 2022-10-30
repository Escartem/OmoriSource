//-----------------------------------------------------------------------------
//  Galv's Event Detectors
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  GALV_EventDetectors.js
//-----------------------------------------------------------------------------
//  2016-08-21 - Version 1.2 - fixes to 'non detected' frequency
//  2016-08-20 - Version 1.1 - fixed bug when no terrain or regions specified
//  2016-08-01 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_EventDetectors = true;

var Galv = Galv || {};          // Galv's main object
Galv.DETECT = Galv.DETECT || {};        // Galv's stuff

//-----------------------------------------------------------------------------
/*:
 * @plugindesc Have events activate when player gets in range and line of sight.
 * 
 * @author Galv - galvs-scripts.com
 *
 * @param LOS Blocking Terrain
 * @desc Terrain tag ID's for tiles that block line of sight, separated by commas
 * @default 5,6
 *
 * @param LOS Blocking Regions
 * @desc Region ID's for tiles that block line of sight, separated by commas
 * @default 1,2
 *
 * @param Tile Size
 * @desc The pixel size of the tiles you are using.
 * Default: 48
 * @default 48
 *
 * @param Search Limit
 * @desc Amount of checks for default pathfinding. Larger might cause lag, smaller might make returning home fail
 * Default: 12
 * @default 24
 *
 * @param --- Behaviors ---
 * @desc
 * @default
 *
 * @param Behavior 0
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 1
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 2
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 3
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 4
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 5
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 6
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 7
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 8
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 9
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 10
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 11
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 12
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 13
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 14
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 15
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 16
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 17
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 18
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 19
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @param Behavior 20
 * @desc Behavior of event if detecting. (see help file)
 * moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 * @default
 *
 * @help
 *   Galv's Event Detectors
 * ----------------------------------------------------------------------------
 * This is a basic event detection plugin. It can allow events to detect the
 * player within a certain range and within line of sight.
 * Line of sight is 180 degrees in the event's front arc. Regions, terrain tags
 * or events can be set to block line of sight to the player.
 * Region Id's and terrain tag Id's are set using the plugin settings. To make
 * an event block line of sight, you need to use a COMMENT inside an event
 * page that has a text tag as follows:
 *
 *   <block_los>
 *
 * An event that has an active page with this tag will block line of sight. If
 * the page is changed to one without the tag, it will not block LOS.
 *
 * ----------------------------------------------------------------------------
 *
 * ----------------------------------------------------------------------------
 *   Conditional Branch SCRIPT
 * ----------------------------------------------------------------------------
 * You can use the below script call to check if an event can detect the player
 * at the time the conditional branch is called. (Yes this can be used in a
 * parallel process event if required)
 *
 *   Galv.DETECT.event(id,dist,los)   // id = event ID that is a detector
 *                                    // dist = tile distance from player
 *                                    // los = true or false for line of sight
 *
 * This will return true if the player is in distance range of the event and
 * if los is true, it will also check if player is in line of sight to it.
 * ----------------------------------------------------------------------------
 *
 * ----------------------------------------------------------------------------
 *   Event command SCRIPT
 * ----------------------------------------------------------------------------
 *     $gameSystem._undetectable = x;   // x can be true or false. When true
 *                                      // player cannot be detected
 * ----------------------------------------------------------------------------
 *
 * ----------------------------------------------------------------------------
 *   Behaviors
 * ----------------------------------------------------------------------------
 * Behaviors can be used to set up an event's reaction from within the custom
 * 'Autonomous Movement' settings of the event. The plugin settings has many
 * behaviors you can set up with the following settings:
 *
 *       moveTypeBefore,moveTypeAfter,dist,los,speed,freq,balloon
 *
 * moveTypes can be one of the following:
 *            approach, flee, search, freeze, rand, return
 *            approach  - event moves toward player, no pathfinding
 *            flee   - event moves away from player
 *            search - event moves toward player's last detected position with
 *                   - default rpgmaker pathfinding. The 'search limit' sets
 *                   - how far an event will find its way to player or return
 *            freeze - event doesn't move
 *            rand   - event moves randomly
 *            return - event saves it's original position and returns to this
 *                     position when not detecting the player.
 * dist    = distance in number of tiles from the event that it can detect
 * los     = 0 or 1... 1 to use line of sight or 0 to not for detecting
 * speed   = the change of move speed while detecting (1-6)
 * freq    = the change of move frequency while detecting (1-5)
 * balloon = the balloon id to show when event detects player
 *
 * HOW TO USE
 * To set an event to follow a behavior, you need to use a 'SCRIPT' command
 * inside of a custom Autonomous Move Route as follows:
 *
 *       this.detector(id);
 *
 * This will use the chosen Behavior id (from the numbers in the plugin setup).
 * The 'moveTypeBefore' selection above and the event page's speed and freq
 * control the event's default movement when not detecting.
 *
 * See demo for examples
 */



//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

(function() {

// Blocking terrain tag array
var tmp = PluginManager.parameters('Galv_EventDetectors')["LOS Blocking Terrain"].split(",");
Galv.DETECT.bTerrain = [];

if (tmp && tmp[0]) {
	for (var i = 0; i < tmp.length; i++) {
		Galv.DETECT.bTerrain.push(Number(tmp[i]));
	};
};


// Blocking regions array
tmp = PluginManager.parameters('Galv_EventDetectors')["LOS Blocking Regions"].split(",");
Galv.DETECT.bRegions = [];
if (tmp || tmp[0]) {
	for (var i = 0; i < tmp.length; i++) {
		Galv.DETECT.bRegions.push(Number(tmp[i]));
	};
};

// tile size
Galv.DETECT.tile = Number(PluginManager.parameters('Galv_EventDetectors')["Tile Size"]);
Galv.DETECT.searches = Number(PluginManager.parameters('Galv_EventDetectors')["Search Limit"]);

// Behaviors
Galv.DETECT.behaviors = {};
var i = 0;
do {
    tmp = PluginManager.parameters('Galv_EventDetectors')["Behavior " + i];
	if (tmp) {
		Galv.DETECT.behaviors[i] = tmp.split(",");
		for (var i2 = 2; i2 < Galv.DETECT.behaviors[i].length; i2++) {
			Galv.DETECT.behaviors[i][i2] = Number(Galv.DETECT.behaviors[i][i2]);
		};
	};
    i++;
}
while (tmp);

Galv.DETECT.event = function(id,dist,los) {
	if ($gameSystem._undetectable) return false;
	return $gameMap.event(id).distDetect(dist,los);
};

Galv.DETECT.dist = function(x1,y1,x2,y2) {
	return Math.sqrt(Math.pow(x1 - x2,2) + Math.pow(y1 - y2,2));
};

Galv.DETECT.isBlock = function(x,y) {
	var x = Math.round(x);
	var y = Math.round(y);
	if (Galv.DETECT.bRegions.contains($gameMap.regionId(x,y))) return true;
	if (Galv.DETECT.bTerrain.contains($gameMap.terrainTag(x,y))) return true;
	// Blocking event
	var blockEvent = false;
	$gameMap.eventsXy(x, y).forEach(function(event) {
		if (event._blockLos) return blockEvent = true;
	});
	return blockEvent;
};

Galv.DETECT.los = function(char1,char2) {
	var a = {x:char1.x, y:char1.y};
	var b = {x:char2.x, y:char2.y};

	// If in front
	switch (char2._direction) {
		case 2:
			if (b.y > a.y) return false;
			break;
		case 4:
			if (b.x < a.x) return false;
			break;
		case 6:
			if (b.x > a.x) return false;
			break;
		case 8:
			if (b.y < a.y) return false;
			break;
		default:
			
	};

	// Direct Line
	if (Math.abs(a.x - b.x) >= Math.abs(a.y - b.y)) {
		// h slope
		if (a.x == b.x) {
			var slope = null;
			var int = a.x;
		} else {
			var slope = (a.y - b.y) / (a.x - b.x);
			var int = a.y - slope * a.x;
		};

		for (var x = a.x; x <= b.x; x++) {
			var y = slope * x + int;
			if (Galv.DETECT.isBlock(x,y)) return false;
		}
		
		for (var x = a.x; x >= b.x; x--) {
			var y = slope * x + int;
			if (Galv.DETECT.isBlock(x,y)) return false;
		}
	} else if (Math.abs(a.y - b.y) >= Math.abs(a.x - b.x)) {
		// v slope
		if (a.y == b.y) {
			var slope = null;
			var int = a.y;
		} else {
			var slope = (a.x - b.x) / (a.y - b.y);
			var int = a.x - slope * a.y;
		};
	
		for (var y = a.y; y <= b.y; y++) {
			var x = slope * y + int;
			if (Galv.DETECT.isBlock(x,y)) return false;
		}
		
		for (var y = a.y; y >= b.y; y--) {
			var x = slope * y + int;
			if (Galv.DETECT.isBlock(x,y)) return false;
		}
	};
	return true;
};


Game_Character.prototype.searchLimit = function() {
    return Galv.DETECT.searches;
};


// GAME CHARACTER
//-----------------------------------------------------------------------------

Galv.DETECT.Game_Character_initMembers = Game_Character.prototype.initMembers;
Game_Character.prototype.initMembers = function() {
	this.setDetectVars();
	Galv.DETECT.Game_Character_initMembers.call(this);
};

Game_Character.prototype.distDetect = function(range,los,id,balloon) {
	var balloon = balloon || 0;
	var id = id || 0;
	var range = range * Galv.DETECT.tile;
	var target = id > 0 ? $gameMap.event(id) : $gamePlayer;
	var x1 = this.screenX();
	var y1 = this.screenY();
	var x2 = target.screenX();
	var y2 = target.screenY();
	
	var dist = Galv.DETECT.dist(x1,y1,x2,y2);

	if (dist <= range) { // If in radius range of target
		if ((los && Galv.DETECT.los(target,this)) || !los) {  // If LOS to target is not blocked
			this._dTarget = {x:target.x,y:target.y};  // Set target x,y each step when detected so if los is broken, event still moves to last seen x,y
			this.doDetected(id);
			return true;
		};
	};
	this.doUndetected(id);
	
	return false;
};

Game_Character.prototype.isDetecting = function(id) {
	return id ? this._detecting.contains(id) : this._detecting.length > 0;
};

Game_Character.prototype.doDetected = function(id) {
	if (!this._detecting.contains(id)) {
		this._detecting.push(id);
		if (!this._searchXY[0]) this._balloonId = this._detectBalloon;
	};
};

Game_Character.prototype.doUndetected = function(id) {
	var index = this._detecting.indexOf(id);
	if (index > -1) this._detecting.splice(index,1);
};

Game_Character.prototype.detector = function(id) {
	if ($gameSystem._undetectable) return;
	this._detectBalloon = Galv.DETECT.behaviors[id][6];
	var detected = this.distDetect(Galv.DETECT.behaviors[id][2],Galv.DETECT.behaviors[id][3]);

	if (detected) {
		this.doDetectMove(id,1); // do detected movement
	} else {
		if (this._searchXY[0]) {
			// do move toward last x,y position detected at
			this.moveTowardLastDetect();
		} else {
			this.doDetectMove(id,0); // do original movement
		};
	};
};

Game_Character.prototype.doDetectMove = function(id,type) {
	//type 1 = detect move
	//type 0 = after detect move
	if (type == 0) {
		this._moveSpeed = this._origMovement._moveSpeed;
		this._moveFrequency = this._origMovement._moveFrequency;
		
	} else {
		this._moveSpeed = Galv.DETECT.behaviors[id][4];
		this._moveFrequency = Galv.DETECT.behaviors[id][5];
	};
	
	
	switch (Galv.DETECT.behaviors[id][type]) {
		case 'approach':
			this.moveTowardPlayer();
			break;
		case 'flee':
			this.moveAwayFromPlayer();
			break;
		case 'search':
			if (this._detectPause <= 0) {
				this._moveFrequency = 5;
				this._searchXY = [$gamePlayer.x,$gamePlayer.y]; // get last detected x,y coords
				this.moveTowardLastDetect();
				this._detectPause = 30 * (5 - this._origMovement._moveFrequency) + 3;
			};
			this._detectPause -= 1;
			break;
		case 'rand':
		
			if (this._detectPause <= 0) {
				this._moveFrequency = 5;
				this.moveRandom();
				this._detectPause = 30 * (5 - this._origMovement._moveFrequency) + 1;
			};
			this._detectPause -= 1;
			break;
		case 'return':
			this._moveFrequency = 5;
			this.returnToSavedXY();  // move to original position
		case 'freeze':
		default:
			this.resetStopCount();
	};
	
};

Game_CharacterBase.prototype.returnToSavedXY = function() {
	if (this.x != this._origMovement.x || this.y != this._origMovement.y) {
		direction = this.findDirectionTo(this._origMovement.x,this._origMovement.y);
		if (direction > 0) {
			this.moveStraight(direction);
		}
	} else {
		this._direction = this._origMovement._direction;
		this.resetStopCount();
	};
};

Game_Character.prototype.setDetectVars = function() {
	this._detecting = [];
	this._searchXY = [];
	this._detectPause = 0;
	this._detectPauseTime = 40;
	this._origMovement = {'_moveFrequency':this._moveFrequency,'_moveSpeed':this._moveSpeed,'x':0,'y':0};
	this.searchActions = [
		'turnRight90',
		'turnLeft90',
		'turnLeft90',
		'turnRight90',
	];
	this.searchActions.reverse();
};

Game_Character.prototype.moveTowardLastDetect = function() {
	if (!this._searchXY[0]) {
		this._searchXY = [];
		this.resetStopCount();
	} else if (this._searchXY[0] == this.x && this._searchXY[1] == this.y) {
		if (this._searchTurnIndex > -1) {
			this[this.searchActions[this._searchTurnIndex]](); // run corresponding action
			// set searchXY to destination in case search actions move it
			this._searchXY[0] = this.x;
			this._searchXY[1] = this.y;
			this._searchTurnIndex -= 1;
			this._waitCount = 20;
		} else {
			this._searchXY = [];
			this.resetStopCount();
		}
	} else {
		this._searchTurnIndex = this.searchActions.length - 1;
		var direction = this.findDirectionTo(this._searchXY[0],this._searchXY[1]);
		if (direction > 0) {
			this.moveStraight(direction);
		}
	};
};


// GAME EVENT
//-----------------------------------------------------------------------------

Galv.DETECT.Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
	Galv.DETECT.Game_Event_setupPageSettings.call(this);
	this.setDetectStuff();
};

Game_Event.prototype.setDetectStuff = function() {
	this._detectBalloon = 0;
	var page = this.page();
	this._blockLos = false;
	if (page) {
		for (var i = 0; i < page.list.length; i++) {
			if (page.list[i].code == 108 && page.list[i].parameters[0].contains("<block_los>")) {
				this._blockLos = true;
				break;
			};
		};
		this._origMovement._moveSpeed = page.moveSpeed;
		this._origMovement._moveFrequency = page.moveFrequency;
		this._origMovement._direction = this._direction;
		this._origMovement.x = this.x;
		this._origMovement.y = this.y;
	};
};

})();