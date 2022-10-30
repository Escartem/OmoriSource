//=============================================================================
// Liquid's Lovely Plugin for Jasmin - Event Icons
// Liquid_EventIcons.js
//=============================================================================

var Imported = Imported || {};
Imported.Liquid_EventIcons = true;

var Liquid = Liquid || {};
Liquid.Eventcons = Liquid.Eventcons || {};
Liquid.Eventcons.version = 2.01;

//=============================================================================
/*:
 * @plugindesc v2 adds persistent balloon icons.
 * @author Liquidize
 *
 * @param ---General---
 * @default
 *
 * @param Icon Width
 * @parent ---General---
 * @type number
 * @min 0
 * @desc Determines the width of each icon frame.
 * Default: 32
 * @default 32
 *
 * @param Icon Height
 * @parent ---General---
 * @type number
 * @min 0
 * @desc Determines the height of each icon frame.
 * Default: 24
 * @default 24
 *
 * @param Default Sprite Sheet
 * @parent ---General---
 * @type string
 * @desc Determines the default sprite sheet to use for eventcons.
 * Default: quest
 * @default quest
 * 
 * @param Speed
 * @parent ---General---
 * @type number
 * @min 0
 * @desc Determines the speed at which the frame is updated.
 * Default: 16
 * @default 16
 * 
 * @param Wait Time
 * @parent ---General---
 * @type number
 * @min 0
 * @desc Helps determine the wait between each icon frame.
 * Default: 64
 * @default 64
 * 
 * @help
 * ============================================================================
 * Introduction and Instructions
 * ============================================================================
 *
 * To add an indicator add a note to the event with the following:
 * Indicator: IMAGE_NAME,INDEX
 * 
 * Example:
 * Indicator: quest,1
 * 
 * 
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 2.01:
 * - Fixed an issue where icons wouldn't change on the same map.
 * 
 * Version 2.00:
 * - Plugin redo!
 * 
 * Version 1.02:
 * - Added Plugin Command to change event icon
 * 
 * Version 1.01:
 * - Changed it so icons can be added via notes.
 * - Made icons persist through saves properly.
 * 
 * Version 1.00:
 * - Finished plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Liquid.Parameters = PluginManager.parameters('Liquid_EventIcons');
Liquid.Param = Liquid.Param || {};
Liquid.Param.EventconWidth = Number(Liquid.Parameters['Icon Width'] || 32);
Liquid.Param.EventconHeight = Number(Liquid.Parameters['Icon Height'] || 24);
Liquid.Param.EventconSheet = String(Liquid.Parameters['Default Sprite Sheet'] || 'quest');
Liquid.Param.EventconSpeed = Number(Liquid.Parameters['Speed'] || 16);
Liquid.Param.EventconWaitTime = Number(Liquid.Parameters['Wait Time'] || 64);

Liquid.Eventcons.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
    // Plugin Commands
    if (command === "ChangeEventcon") {
        if (args.length !== 4) {
            return;
        }
        var map = parseInt(args[0]);
        var event = parseInt(args[1]);
        var img = args[2];
        var index = parseInt(args[3]);
        if (!$eventData.hasCategory("eventcon")) $eventData.addCategory("eventcon");
        $eventData.setValueExt("eventcon", map, event, [img, index]);
        if (map === $gameMap.mapId()) {
            if ($gameMap._events[event]) {
                $gameMap._events[event].removeEventcon();
                $gameMap._events[event].setupEventcon(img,index);
            }
        }
    } else if (command === "RemoveEventcon") {
        if (args.length !== 2) {
            return;
        }
        var map = parseInt(args[0]);
        var event = parseInt(args[1]);
        if (!$eventData.hasCategory("eventcon")) $eventData.addCategory("eventcon");
        $eventData.setValueExt("eventcon", map, event);
        if (map === $gameMap.mapId()) {
            if ($gameMap._events[event]) {
                $gameMap._events[event].removeEventcon();
            }
        }
    }
    Liquid.Eventcons.Game_Interpreter_pluginCommand.call(this, command, args);
};

//=============================================================================
// TDS PATCH : USE SCRIPT CALL
// this.setEventIcon(42, 'quest', 1);
//=============================================================================
Game_Interpreter.prototype.setEventIcon = function(eventId, img, index) {
    var map = $gameMap.mapId();
    var event = $gameMap.event(eventId);
    if (!$eventData.hasCategory("eventcon")) $eventData.addCategory("eventcon");
    $eventData.setValueExt("eventcon", map, eventId, [img, index]);
    event.removeEventcon();
    event.setupEventcon(img, index);
    event.refresh();
  };

//=============================================================================
// Game_CharacterBase
//=============================================================================

Game_CharacterBase.prototype.setupEventcon = function (img, index) {
    if (this.isEventconPlaying()) {
        this.removeEventcon();
    }
    this._eventImg = img;
    this._eventIndex = index;
};

Game_CharacterBase.prototype.startEventcon = function () {
    this._eventconPlaying = true;
};

Game_CharacterBase.prototype.isEventconPlaying = function () {
    return this._eventIndex > 0 || this._eventconPlaying;
};

Game_CharacterBase.prototype.removeEventcon = function () {
    this._eventImg = null;
    this._eventIndex = -1;
    this._eventconPlaying = false;
};

Game_CharacterBase.prototype.eventconId = function () {
    return this._eventIndex;
};

Game_CharacterBase.prototype.eventconImg = function () {
    return this._eventImg;
};

Game_CharacterBase.prototype.endEventcon = function () {
    this._eventconPlaying = false;
};

//=============================================================================
// Game_Event
//=============================================================================
Liquid.Eventcons.Game_Event_refresh = Game_Event.prototype.refresh;
Game_Event.prototype.refresh = function () {
    if (!this._eventIndex) {
        if ($eventData.hasCategory("eventcon")) {
            var eventIconInfo = $eventData.value("eventcon", [this._mapId, this._eventId]);
            if (eventIconInfo) {
                this.setupEventcon(eventIconInfo[0], eventIconInfo[1]);
            }
        } else if (this.event().note.match(/(?:INDICATOR):[ ](.+)[,](\d+)/i)) {
            var img = String(RegExp.$1);
            var index = Number(RegExp.$2);
            this.setupEventcon(img, index);

            if (!$eventData.hasCategory("eventcon")) {
                $eventData.addCategory("eventcon");
            }
            $eventData.setValueExt("eventcon", this._mapId, this._eventId, [img, index]);
        }
    }
    Liquid.Eventcons.Game_Event_refresh.call(this);
};

//=============================================================================
// Sprite_Character
//=============================================================================

Liquid.Eventcons.Sprite_Character_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function () {
    Liquid.Eventcons.Sprite_Character_update.call(this);
    this.updateEventcon();
};

Sprite_Character.prototype.setupEventcon = function () {
    if (this._character.eventconId() > 0) {
        this.startEventcon();
        this._character.startEventcon();
        if (!this.currentEventcondId) {
            this.currentEventcondId = this._character.eventconId();
        }
        if (!this.currentEventcondImg) {
            this.currentEventcondImg = this._character.eventconImg();
        }
    }
};

Sprite_Character.prototype.startEventcon = function () {
    if (!this._eventconSprite || (this.currentEventcondId != this._character.eventconId()) || (this.currentEventcondImg != this._character.eventconImg())) {
        this.endEventcon();
        this._eventconSprite = new Sprite_EventCon();
        this._eventconSprite.setup(this._character.eventconImg(), this._character.eventconId());
        this.parent.addChild(this._eventconSprite);
        this.currentEventcondId = this._character.eventconId();
        this.currentEventcondImg = this._character.eventconImg();
    }
};

Sprite_Character.prototype.updateEventcon = function () {
    this.setupEventcon();
    if (this._eventconSprite) {
        this._eventconSprite.x = this.x;
        this._eventconSprite.y = this.y - this.height;
        if (!this._character.isEventconPlaying()) {
            this.endEventcon();
        }
    }
};

Sprite_Character.prototype.endEventcon = function () {
    if (this._eventconSprite) {
        this.parent.removeChild(this._eventconSprite);
        this._eventconSprite = null;
    }
};

Sprite_Character.prototype.isEventconPlaying = function () {
    return !!this._eventconSprite;
};
Liquid.Eventcons.Sprite_Character_updateAnimation = Sprite_Character.prototype.updateAnimation;
Sprite_Character.prototype.updateAnimation = function () {
    Liquid.Eventcons.Sprite_Character_updateAnimation.call(this);
    if (!this.isEventconPlaying()) {
        this._character.endEventcon();
    }
};

//=============================================================================
// Sprite_EventCon
//=============================================================================

function Sprite_EventCon() {
    this.initialize.apply(this, arguments);
}

Sprite_EventCon.prototype = Object.create(Sprite_Base.prototype);
Sprite_EventCon.prototype.constructor = Sprite_EventCon;

Sprite_EventCon.prototype.initialize = function () {
    Sprite_Base.prototype.initialize.call(this);
    this.initMembers();
};

Sprite_EventCon.prototype.initMembers = function () {
    this._eventconId = 0;
    this._eventconImg = Liquid.Param.EventconSheet
    this._duration = 0;
    this.anchor.x = 0.5;
    this.anchor.y = 1;
    this.z = 7;
};

Sprite_EventCon.prototype.loadBitmap = function () {
    this.bitmap = ImageManager.loadSystem(this._eventconImg);
    this.setFrame(0, 0, 0, 0);
};

Sprite_EventCon.prototype.setup = function (img, index) {
    this._eventconImg = img;
    this._eventconId = index;
    this._duration = 4 * this.speed() + this.waitTime();
    this.loadBitmap();
};

Sprite_EventCon.prototype.update = function () {
    Sprite_Base.prototype.update.call(this);
    if (this._duration > 0) {
        this._duration--;
        if (this._duration > 0) {
            this.updateFrame();
        } else {
            this._duration = 4 * this.speed() + this.waitTime();
        }
    }
};

Sprite_EventCon.prototype.updateFrame = function () {
    var w = Liquid.Param.EventconWidth;
    var h = Liquid.Param.EventconHeight;
    var sx = this.frameIndex() * w;
    var sy = (this._eventconId - 1) * h;
    this.setFrame(sx, sy, w, h);
};

Sprite_EventCon.prototype.speed = function () {
    return Liquid.Param.EventconSpeed;
};

Sprite_EventCon.prototype.waitTime = function () {
    return Liquid.Param.EventconWaitTime;
};

Sprite_EventCon.prototype.frameIndex = function () {
    var index = (this._duration - this.waitTime()) / this.speed();
    return 3 - Math.max(Math.floor(index), 0);
};

Sprite_EventCon.prototype.isPlaying = function () {
    return this._duration > 0;
};