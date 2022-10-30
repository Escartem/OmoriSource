// ╒══════════════════════════════════════════════════════════════════════════════════╕
// █▐▐  Follower Control
// ╞══════════════════════════════════════════════════════════════════════════════════╡
/*:
 *  @plugindesc Options to control and enhance interaction with followers. 
 *  @author Exhydra
 *
 *  @param Interpreter Commands
 *  @desc (Advanced Option) Comma delimited list of allowed
          interpreter commands followers can use. 
 *  @default 205,212,213
 *
 *  @help
 * ▄ Plugin          ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄ ▄ ▄
 *
 *   ┌─ Version : 1.2
 *   ├─ Release : 14th July 2016
 *   ├─ Updated : 24rd July 2016
 *   └─ License : Free for Commercial and Non-Commercial Usage
 *
 * ▄ Plugin Commands ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄ ▄ ▄
 *
 *   ▪ exaFC.linkEvent boolean followerId eventId
 *   │
 *   │     Link or unlink a follower to an event on the current map. The 
 *   │ condition to start the follower event will match whatever is selected
 *   │ on the 'Trigger' drop-down menu within the linked event.
 *   │
 *   ├─boolean
 *   ├ Value(s) ► true, false
 *   │
 *   ├─followerId
 *   ├ Value(s) ► 0, 1, 2, (...)
 *   ├ Note     ► The 0th position is the 1st follower, and so on.
 *   │
 *   ├─eventId
 *   └ Value(s) ► Map Event ID
 *
 *   ▪ exaFC.followerInstruct boolean followerId
 *   │
 *   │     Enable or disable re-directing interpreter commands to a follower.
 *   │ Once enabled, you can set the Movement Route target to 'Player' and
 *   │ pass each command listed within to the selected follower. Should be
 *   │ used in conjunction with the 'exaFC.followerStop' plugin command.
 *   │
 *   ├─boolean
 *   ├ Value(s) ► true, false
 *   │
 *   ├─followerId
 *   ├ Value(s) ► 0, 1, 2, (...)
 *   ├ Note     ► The 0th position is the 1st follower, and so on. Value
 *   │            is only required to be included when enabling the
 *   └            command.
 *
 *   ▪ exaFC.moveType type followerId moveSpeed moveFrequency
 *   │
 *   │     Selects and/or changes the move type of a follower. Should be
 *   │ used in conjunction with the 'followerStop' and 'lockProperties'
 *   │ plugin command.
 *   │
 *   ├─type
 *   ├ Value(s) ► fixed, random, approach, custom, clear
 *   ├ Note     ► When selecting the 'custom' type, place the Movement
 *   │            Route you wish the follower to copy directly beneath
 *   │            the plugin command. The 'clear' option will erase
 *   │            the current memorized move route.
 *   │
 *   ├─followerId
 *   ├ Value(s) ► 0, 1, 2, (...)
 *   ├ Note     ► The 0th position is the 1st follower, and so on.
 *   │
 *   ├─moveSpeed
 *   ├ Value(s) ► Integer
 *   ├ Note     ► Value is optional.
 *   │
 *   ├─moveFrequency
 *   ├ Value(s) ► Integer
 *   └ Note     ► Value is optional.
 *
 *   ▪ exaFC.lockProperties boolean followerId
 *   │
 *   │     Lock or unlock the properties of a follower. By default,
 *   │ followers will mirror the movement speed as well as various
 *   │ other properties of the party leader. This command will stop
 *   │ the selected follower from doing so.
 *   │
 *   ├─boolean
 *   ├ Value(s) ► true, false
 *   │
 *   ├─followerId
 *   ├ Value(s) ► 0, 1, 2, (...)
 *   └ Note     ► The 0th position is the 1st follower, and so on.
 *
 *   ▪ exaFC.followerStop boolean
 *   │
 *   │     Enable or disable followers chasing the player.
 *   │
 *   ├─boolean
 *   └ Value(s) ► true, false
 *
 *   ▪ exaFC.followerCollision boolean
 *   │
 *   │     Enable or disable player collision with followers.
 *   │
 *   ├─boolean
 *   └ Value(s) ► true, false
 *
 *   ▪ exaFC.clearAll
 *   │
 *   │     Clears control properties from all followers.
 *   │
 *   └
 *
 * ▄ Examples        ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄ ▄ ▄
 *
 *   exaFC.linkEvent true 1 15
 *   └─Link the 2nd follower to the event with an ID of 15.
 *
 *   exaFC.linkEvent false 1
 *   └─Unlink the 2nd follower from the linked event.
 *
 *   exaFC.followerInstruct true 2
 *   └─Re-direct interpreter commands to the 3rd follower.
 *
 *   exaFC.followerInstruct false
 *   └─Disable interpreter command re-direct for all followers.
 *
 *   exaFC.followerStop true
 *   └─Disable followers chasing the player.
 *
 *   exaFC.followerCollision true
 *   └─Enables player collision with followers.
 *
 */
// ╘══════════════════════════════════════════════════════════════════════════════════╛

// ╒══════════════════════════════════════════════════════════════════════════════════╕
// ■ [Object] Plugin
// ╘══════════════════════════════════════════════════════════════════════════════════╛

var Imported = Imported || {};
Imported.EXA_SimpleFollowerControl = true;

var EXA = EXA     || {};
EXA.FC  = EXA.FC  || {};

EXA.FC.pluginParams             = PluginManager.parameters('Exhydra_FollowerControl');
EXA.FC.pluginParams.allowedList = EXA.FC.pluginParams['Interpreter Commands'] || '205,212,213';
EXA.FC.pluginParams.allowedList.split(',').map(Number);

EXA.FC.followerControl          = false;
EXA.FC.followerControlId        = -1;
EXA.FC.followerStop             = false;
EXA.FC.followerCollision        = false;

// ╒══════════════════════════════════════════════════════════════════════════════════╕
// ■ [Object] Game_Interpreter
// ╘══════════════════════════════════════════════════════════════════════════════════╛

// ALIAS ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] pluginCommand
// └──────────────────────────────────────────────────────────────────────────────────┘

EXA.FC.Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;

Game_Interpreter.prototype.pluginCommand = function(command, args) {

	EXA.FC.Game_Interpreter_pluginCommand.call(this, command, args);

	if (command === 'exaFC.linkEvent') {
		var follower = $gamePlayer._followers.follower(args[1]);
		
		if (follower) {
			if (args[0] === 'true') {
				follower._fcEventId = Number(args[2]);
			} else {
				follower._fcEventId = -1;
			}
		}
	}

	if (command === 'exaFC.followerInstruct') {
		if (args[0] === 'true') {
			EXA.FC.followerControlId = Number(args[1]);
			EXA.FC.followerControl   = true;
		} else {
			EXA.FC.followerControlId = -1;
			EXA.FC.followerControl   = false;
		}
	}
	
	if (command === 'exaFC.moveType') {
		var follower = $gamePlayer._followers.follower(args[1]) || null;
		
		if (follower) {
			if (args[0]        === 'fixed') {
				follower._moveType = 0;
			} else if (args[0] === 'random') {
				follower._moveType = 1;
			} else if (args[0] === 'approach') {
				follower._moveType = 2;
			} else if (args[0] === 'custom') {
				if (this.nextEventCode() === 205) {
					var moveRoute = this._list[this._index + 1].parameters[1];

					follower.setMoveRoute(moveRoute);
					follower._moveType = 3;
					
					this._index = this._index + 2;
				} else {
					follower._moveType = 0;
				}
			} else if (args[0] === 'clear') {
				follower._moveType = 0;
				follower.setMoveRoute(null);
			}
			
			if (args[2]) {
				follower._moveSpeed = Number(args[2]);
			}
			
			if (args[3]) {
				follower._moveFrequency = Number(args[3]);
			}
		}
	}
	
	if (command === 'exaFC.lockProperties') {
		var followerId = Number(args[1]);
		var follower = $gamePlayer._followers.follower(followerId) || null;
		
		if (follower) {
			if (args[0] === 'true') {
				follower._fcRetainAttrib = true;
			} else {
				follower._fcRetainAttrib = false;
			}
		}
	}

	if (command === 'exaFC.followerStop') {
		EXA.FC.followerStop = (args[0] == 'true');
	}

	if (command === 'exaFC.followerCollision') {
		var toggle = (args[0] == 'true')
		EXA.FC.followerCollision = toggle;
		
		$gamePlayer._followers.forEach(function (follower) {
			follower.setThrough(!toggle);
		});
	}
	
	if (command === 'exaFC.clearAll') {
		EXA.FC.followerControlId = -1;
		EXA.FC.followerControl   = false;
		EXA.FC.followerStop      = false;
		EXA.FC.followerCollision = false;
		
		$gamePlayer._followers.forEach(function (follower) {
			follower._fcEventId          = -1;
			follower._moveType           = 0;
			follower._fcEventLock        = false;
			follower._fcPrelockDirection = 0;
			follower._fcRetainAttrib     = false;
			follower.setMoveRoute(null);
			follower.setThrough(true);
			follower.update();
		});
	}

}; // Game_Interpreter ‹‹ pluginCommand

// ALIAS ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] character
// └──────────────────────────────────────────────────────────────────────────────────┘

EXA.FC.Game_Interpreter_character = Game_Interpreter.prototype.character;

Game_Interpreter.prototype.character = function(param) {

	if (isNaN(param)) {
		var followerMatch = param.match(/fcF:(\d+)/);
		
		if (followerMatch) {
			var followerId = followerMatch[1];
			
			return $gamePlayer._followers.follower(followerId);
		}
    }

	return EXA.FC.Game_Interpreter_character.call(this, param);

}; // Game_Interpreter ‹‹ character

// ALIAS ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] executeCommand
// └──────────────────────────────────────────────────────────────────────────────────┘

EXA.FC.Game_Interpreter_executeCommand = Game_Interpreter.prototype.executeCommand;

Game_Interpreter.prototype.executeCommand = function() {
	
	if (EXA.FC.followerControl) {
		var command = this.currentCommand();

		if (command) {
			if (EXA.FC.pluginParams.allowedList.indexOf(command.code) != -1) {
				if (command.parameters[0] < 0) {
					command.parameters[0] = 'fcF:' + EXA.FC.followerControlId;
				}
			}
		}
	}
	
	return EXA.FC.Game_Interpreter_executeCommand.call(this);
	
}; // Game_Interpreter ‹‹ executeCommand

// ╒══════════════════════════════════════════════════════════════════════════════════╕
// ■ [Object] Game_Player
// ╘══════════════════════════════════════════════════════════════════════════════════╛

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] isCollidedWithCharacters
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_Player.prototype.isCollidedWithCharacters = function(x, y) {
	
	return this.isCollidedWithFollowers(x, y) ||
	       Game_CharacterBase.prototype.isCollidedWithCharacters.call(this, x, y);
	
}; // Game_Player ‹‹ isCollidedWithCharacters

// NEW ───────────────────────────────────────────────────────────────────────────────┐
// □ [Function] isCollidedWithFollowers
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_Player.prototype.isCollidedWithFollowers = function(x, y) {
	
	if (EXA.FC.followerCollision) {
		return this._followers.isSomeoneCollided(x, y);
	}
	return false;
	
}; // Game_Player ‹‹ isCollidedWithFollowers

// ALIAS ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] startMapEvent
// └──────────────────────────────────────────────────────────────────────────────────┘

EXA.FC.Game_Player_startMapEvent = Game_Player.prototype.startMapEvent;

Game_Player.prototype.startMapEvent = function(x, y, triggers, normal) {
	
    if (!$gameMap.isEventRunning()) {
        this._followers.forEach(function(follower, index) {
			if (follower._fcEventId > -1) {
				if (follower.pos(x, y)) {
					event = $gameMap.event(follower._fcEventId);
					if (event.isTriggerIn(triggers)) {
						event._fcFollowerId = index;
						event.start();
					}
				}
            }
        });
    }

	EXA.FC.Game_Player_startMapEvent.call(this, x, y, triggers, normal);

}; // Game_Player ‹‹ startMapEvent

// ╒══════════════════════════════════════════════════════════════════════════════════╕
// ■ [Object] Game_Event
// ╘══════════════════════════════════════════════════════════════════════════════════╛

// ALIAS ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] initMembers
// └──────────────────────────────────────────────────────────────────────────────────┘

EXA.FC.Game_Event_initMembers = Game_Event.prototype.initMembers;

Game_Event.prototype.initMembers = function() {

	EXA.FC.Game_Event_initMembers.call(this);

    this._fcFollowerId = -1;

}; // Game_Event ‹‹ initMembers

// ALIAS ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] lock
// └──────────────────────────────────────────────────────────────────────────────────┘

EXA.FC.Game_Event_lock = Game_Event.prototype.lock;

Game_Event.prototype.lock = function() {
	
	EXA.FC.Game_Event_lock.call(this);
	
	if (this._fcFollowerId > -1) {
		$gamePlayer._followers.follower(this._fcFollowerId).lock();
	}
	
}; // Game_Event ‹‹ lock

// ALIAS ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] unlock
// └──────────────────────────────────────────────────────────────────────────────────┘

EXA.FC.Game_Event_unlock = Game_Event.prototype.unlock;

Game_Event.prototype.unlock = function() {

	EXA.FC.Game_Event_unlock.call(this);
	
	if (this._fcFollowerId > -1) {
		$gamePlayer._followers.follower(this._fcFollowerId).unlock();
		this._fcFollowerId = -1;
	}

}; // Game_Event ‹‹ unlock

// ╒══════════════════════════════════════════════════════════════════════════════════╕
// ■ [Object] Game_Follower
// ╘══════════════════════════════════════════════════════════════════════════════════╛

// ALIAS ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] initialize
// └──────────────────────────────────────────────────────────────────────────────────┘

EXA.FC.Game_Follower_initialize = Game_Follower.prototype.initialize;

Game_Follower.prototype.initialize = function(memberIndex) {

	EXA.FC.Game_Follower_initialize.call(this, memberIndex); 
	
	this._fcEventId          = -1;
	this._fcEventLock        = false;
	this._fcPrelockDirection = 0;
	this._fcRetainAttrib     = false;
	
}; // Game_Follower ‹‹ initialize

// ALIAS ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] update
// └──────────────────────────────────────────────────────────────────────────────────┘

EXA.FC.Game_Follower_update = Game_Follower.prototype.update;

Game_Follower.prototype.update = function() {
	
	if (this._fcRetainAttrib || EXA.FC.followerControl) {
		Game_Character.prototype.update.call(this);
	} else {
		EXA.FC.Game_Follower_update.call(this);
	}
	
}; // Game_Follower ‹‹ update

// NEW   ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] updateStop
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_Follower.prototype.updateStop = function() {
	
	if (this._fcEventLock) {
        this.resetStopCount();
    }
	
    Game_Character.prototype.updateStop.call(this);
	
    if (!this.isMoveRouteForcing()) {
        this.updateSelfMovement();
    }
	
}; // Game_Follower ‹‹ updateStop

// NEW   ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] lock
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_Follower.prototype.lock = function() {
	
    if (!this._fcEventLock) {
        this._fcPrelockDirection = this.direction();
        this.turnTowardPlayer();
        this._fcEventLock = true;
    }
	
}; // Game_Follower ‹‹ lock

// NEW   ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] unlock
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_Follower.prototype.unlock = function() {
	
    if (this._fcEventLock) {
        this._fcEventLock = false;
        this.setDirection(this._fcPrelockDirection);
    }

}; // Game_Follower ‹‹ unlock

// NEW   ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] updateSelfMovement
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_Follower.prototype.updateSelfMovement = function() {
	
	if (this._moveType > 0) {
		if (!this._fcEventLock && this.isNearTheScreen() &&
				 this.checkStop(this.stopCountThreshold())) {
			switch (this._moveType) {
			case 1:
				this.moveTypeRandom();
				break;
			case 2:
				this.moveTypeTowardPlayer();
				break;
			case 3:
				this.moveTypeCustom();
				break;
			}
		}
	}

}; // Game_Follower ‹‹ updateSelfMovement

// NEW   ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] stopCountThreshold
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_Follower.prototype.stopCountThreshold = function() {
	
    return 30 * (5 - this.moveFrequency());
	
}; // Game_Follower ‹‹ stopCountThreshold

// NEW   ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] moveTypeRandom
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_Follower.prototype.moveTypeRandom = function() {
	
    switch (Math.randomInt(6)) {
    case 0: case 1:
        this.moveRandom();
        break;
    case 2: case 3: case 4:
        this.moveForward();
        break;
    case 5:
        this.resetStopCount();
        break;
    }
	
}; // Game_Follower ‹‹ moveTypeRandom

// NEW   ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] moveTypeTowardPlayer
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_Follower.prototype.moveTypeTowardPlayer = function() {
	
    if (this.isNearThePlayer()) {
        switch (Math.randomInt(6)) {
        case 0: case 1: case 2: case 3:
            this.moveTowardPlayer();
            break;
        case 4:
            this.moveRandom();
            break;
        case 5:
            this.moveForward();
            break;
        }
    } else {
        this.moveRandom();
    }
	
}; // Game_Follower ‹‹ moveTypeTowardPlayer

// NEW   ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] moveTypeCustom
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_Follower.prototype.moveTypeCustom = function() {

    this.updateRoutineMove();
	
}; // Game_Follower ‹‹ moveTypeCustom

// NEW   ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] isNearThePlayer
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_Follower.prototype.isNearThePlayer = function() {
	
    var sx = Math.abs(this.deltaXFrom($gamePlayer.x));
    var sy = Math.abs(this.deltaYFrom($gamePlayer.y));
    return sx + sy < 20;
	
}; // Game_Follower ‹‹ isNearThePlayer

// NEW   ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] isCollidedWithCharacters
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_Follower.prototype.isCollidedWithCharacters = function(x, y) {
	
	if (EXA.FC.followerCollision) {
		return (Game_Character.prototype.isCollidedWithCharacters.call(this, x, y) ||
				this.isCollidedWithPlayerCharacters(x, y));
	} else {
		return Game_Character.prototype.isCollidedWithCharacters.call(this, x, y);
	}

}; // Game_Follower ‹‹ isCollidedWithCharacters

// NEW   ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] isCollidedWithPlayerCharacters
// └──────────────────────────────────────────────────────────────────────────────────┘

Game_Follower.prototype.isCollidedWithPlayerCharacters = function(x, y) {
	
    return this.isNormalPriority() && $gamePlayer.isCollided(x, y);
	
}; // Game_Follower ‹‹ isCollidedWithPlayerCharacters

// ╒══════════════════════════════════════════════════════════════════════════════════╕
// ■ [Object] Game_Followers
// ╘══════════════════════════════════════════════════════════════════════════════════╛

// ALIAS ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] updateMove
// └──────────────────────────────────────────────────────────────────────────────────┘

EXA.FC.Game_Followers_updateMove = Game_Followers.prototype.updateMove;

Game_Followers.prototype.updateMove = function() {
	
	if (EXA.FC.followerStop) return;
	
	EXA.FC.Game_Followers_updateMove.call(this);
	
}; // Game_Followers ‹‹ updateMove

// ALIAS ─────────────────────────────────────────────────────────────────────────────┐
// □ [Function] jumpAll
// └──────────────────────────────────────────────────────────────────────────────────┘

EXA.FC.Game_Followers_jumpAll = Game_Followers.prototype.jumpAll;

Game_Followers.prototype.jumpAll = function() {
	
	if (EXA.FC.followerStop) return;
		
	EXA.FC.Game_Followers_jumpAll.call(this);
	
}; // Game_Followers ‹‹ jumpAll

// ▌▌██████████████████████████████████████ EOF █████████████████████████████████████▐▐