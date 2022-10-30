//=============================================================================
// Yanfly Engine Plugins - Event Morpher
// YEP_EventMorpher.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_EventMorpher = true;

var Yanfly = Yanfly || {};
Yanfly.EventMorph = Yanfly.EventMorph || {};
Yanfly.EventMorph.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 Allows events to completely morph into another, copying
 * over all pages, conditions, and event commands.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * WARNING: This plugin is best used with RPG Maker MV 1.5.0 or above! This is
 * because the MV 1.5.0 editor allows for this plugin to be made in an orderly
 * and efficient manner. Please make sure your RPG Maker MV software is up to
 * date before using this plugin to make the most out of it.
 *
 * Those familiar with RPG Maker will know that you can change the way events
 * operate through different pages. However, what if you wanted one event to
 * completely change into another, aka morph? By morphing an event into another
 * event, the morphed event will completely replace all of its properties from
 * pages, conditions, event commands, etc. with the event it morphed into.
 *
 * This can allow for more progressive systems as the player goes through your
 * game. From things like plants to mineral veins to new NPC's hired to keep a
 * store running afloat, by morphing an event, you give it a new purpose and
 * ongoing functionality.
 *
 * Furthermore, this plugin allows you to preserve any morphs you want, so that
 * the next time the player loads your game, revisits the map with the morphed
 * event, or simply comes back from battle, the morph changes remain.
 *
 * More information will be explained in the Instructions section of this
 * plugin's help file.
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * Use the plugin parameter 'Template Maps' to select which maps your game will
 * preload maps from. These maps will contain the events that you want other
 * events to morph into. Any kind of event can be used as a morph template,
 * from trigger events to auto run events to parallel events.
 *
 * If you are using RPG Maker MV 1.5.0+ and wish to make use of template names,
 * add them through the 'Template Names' plugin parameter. The data from the
 * Template Names parameters can be changed and all events in-game that use
 * script calls with the respective Template Name will be updated accordingly.
 *
 * ============================================================================
 * Script Calls
 * ============================================================================
 *
 * To make events morph and change into something else, use the following
 * script call code:
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Morph Event - Script Calls
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *   Yanfly.MorphEvent(targetId, mapId, eventId, preserved)
 *   - This will cause the target event to morph into the designated event.
 *     - Replace 'targetId' with the ID of the target event you wish to morph.
 *     - Replace 'mapId' with the ID of the map with the event to morph into.
 *     - Replace 'eventId' with the ID of the event to morph the target into.
 *     - Replace 'preserved' with 'true' or 'false' to preserve the morph.*
 *
 *   * Example: Yanfly.MorphEvent(15, 1, 5, true);
 *   - Event 15 on the current Map will change into Map 1, Event 5's event.
 *   - This event will be preserved.
 *
 *   * Example: Yanfly.MorphEvent(20, 2, 10, false);
 *   - Event 20 on the current Map will change into Map 2, Event 10's event.
 *   - This event will NOT be preserved.
 *
 *   - - -
 *
 *   Yanfly.MorphEventTemplate(targetId, template, preserved)
 *   - This will cause the target event to morph based on the template name.
 *     - Replace 'targetId' with the ID of the target event you wish to morph.
 *     - Replace 'template' with a name from the 'Template Names' plugin param.
 *       This must be in 'string' form (surround the name with quotes).
 *     - Replace 'preserved' with 'true' or 'false' to preserve the morph.*
 *
 *   * Example: Yanfly.MorphEvent(15, 'StrawberryPlant', true);
 *   - Event 15 on the current Map will change into event marked by the
 *     'StrawberryPlant' template from the plugin parameters.
 *   - This event will be preserved.
 *
 *   * Example: Yanfly.MorphEvent(20, 'MineralVein', false);
 *   - Event 20 on the current Map will change into event marked by the
 *     'MineralVein' template from the plugin parameters.
 *   - This event will NOT be preserved.
 *
 *   - - -
 *
 * * Note: If a morph is preserved, it will remain morphed the next time
 * the player reenters the map.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Morph Removal - Script Calls
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *   Yanfly.RemoveMorph(targetId)
 *   - This will remove any morphed (and preserved) effects from the target
 *   on the current map.
 *     - Replace 'targetId' with the ID of the target event to remove morphing.
 *
 *   * Example: Yanfly.RemoveMorph(15)
 *   - The current map's event 15 will have its morphed effects removed.
 *   - All preserved morphing effects for this event will be removed.
 *
 *   - - -
 *
 *   Yanfly.RemovePreserveMorph(targetMapId, targetEventId)
 *   - This will remove any preserved morphed effect from a target event
 *   located on different map.
 *     - Replace 'targetMapId' with the ID of the map the target event is on.
 *     - Replace 'targetEventId' with the ID of the target event.
 *
 *   * Example: Yanfly.RemovePreserveMorph(10, 20)
 *   - Map 10's event 20 will have its morphed effects removed.
 *   - All preserved morphing effects for this event will be removed.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.00:
 * - Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @param ---General---
 * @default
 *
 * @param TemplateMaps
 * @text Template Maps
 * @parent ---General---
 * @type number[]
 * @min 1
 * @max 999
 * @desc A list of all the ID's of the maps that will be preloaded to
 * serve as template maps for this plugin.
 * @default ["1"]
 *
 * @param TemplateNames
 * @text Template Names
 * @parent ---General---
 * @type struct<Template>[]
 * @desc A list of templates made by name so you can use names
 * instead of mapID and eventID combinations with script calls.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Template Parameter Structure
 * ---------------------------------------------------------------------------
 */
/*~struct~Template:
 *
 * @param Name
 * @desc Name of the template. The template is used with
 * the script call: Yanfly.MorphEventTemplate
 * @default Untitled
 *
 * @param MapID
 * @text Map ID
 * @min 1
 * @max 999
 * @desc The ID of the map to be loaded when using this template.
 * Note: Will automatically add this ID to preloaded maps list.
 * @default 1
 *
 * @param EventID
 * @text Event ID
 * @min 1
 * @max 999
 * @desc The ID of the event to be morphed when using this template.
 * @default 1
 * 
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_EventMorpher');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.EventMorpherData = eval(Yanfly.Parameters['TemplateMaps']);
Yanfly.Param.EventMorpherList = JSON.parse(Yanfly.Parameters['TemplateNames']);

Yanfly.PreloadedMaps = Yanfly.PreloadedMaps || [];

Yanfly.loadMapData = function(mapId) {
  mapId = mapId.clamp(1, 999);
  if (Yanfly.PreloadedMaps[mapId]) return;
  if(Utils.isOptionValid("test")) {
    var src = 'Map%1.json'.format(mapId.padZero(3));
    var xhr = new XMLHttpRequest();
    var url = 'data/' + src;
    xhr.open('GET', url);
    xhr.overrideMimeType('application/json');
    xhr.onload = function() {
      if (xhr.status < 400) {
        Yanfly.PreloadedMaps[mapId] = JSON.parse(xhr.responseText);
      }
    };
    xhr.onerror = this._mapLoader || function() {
      DataManager._errorUrl = DataManager._errorUrl || url;
    };
    Yanfly.PreloadedMaps[mapId] = null;
    xhr.send();
  }
  else {
		const path = require('path');
		const fs = require('fs');
		var base = path.dirname(process.mainModule.filename);	
		let filename = 'Map%1.KEL'.format(mapId.padZero(3));
		Yanfly.PreloadedMaps[mapId] = null;	
		fs.readFile(base + "/data/" + filename, (err, data) => {
			data = Encryption.decrypt(data);
			Yanfly.PreloadedMaps[mapId] = JSON.parse(data.toString());
		})
  }
};

Yanfly.SetupParameters = function() {
  // Process Template Names
  Yanfly.EventMorph.Template = {};
  var length = Yanfly.Param.EventMorpherList.length;
  for (var i = 0; i < length; ++i) {
    var data = JSON.parse(Yanfly.Param.EventMorpherList[i]);
    var name = data.Name.toUpperCase();
    Yanfly.loadMapData(parseInt(data.MapID));
    Yanfly.EventMorph.Template[name] = {
      mapId: data.MapID,
      eventId: data.EventID
    }
  }
  // Preload Map Data List
  var data = Yanfly.Param.EventMorpherData;
  var length = data.length;
  for (var i = 0; i < length; ++i) {
    var mapId = parseInt(data[i]);
    Yanfly.loadMapData(mapId)
  }
};
Yanfly.SetupParameters();

//=============================================================================
// Yanfly Morph Event - Script Calls
//=============================================================================

Yanfly.MorphEventFailChecks = function(targetId, mapId, eventId) {
  var target = $gameMap.event(targetId);
  if (!target) {
    if ($gameTemp.isPlaytest()) {
      console.log('Target Event ID ' + targetId + ' does not exist. ' +
        'It cannot be used for the Yanfly.MorphEvent function.');
    }
    return true;
  }
  if (!Yanfly.PreloadedMaps[mapId]) {
    if ($gameTemp.isPlaytest()) {
      console.log('Map ID ' + mapId + ' has not been preloaded. ' +
        'It cannot be used for the Morph Event function.');
    }
    return true;
  }
  if (!Yanfly.PreloadedMaps[mapId].events[eventId]) {
    if ($gameTemp.isPlaytest()) {
      console.log('Map ID ' + mapId + ', Event ID ' + eventId + ' does not ' +
        'exist. It cannot be used for the Morph Event function.');
    }
    return true;
  }
  return false;
};

Yanfly.MorphEvent = function(targetId, mapId, eventId, preserved) {
  if ($gameParty.inBattle()) return;
  if (Yanfly.MorphEventFailChecks(targetId, mapId, eventId)) return;
  preserved = preserved || false;
  var target = $gameMap.event(targetId);
  if (!target) return;
  target.morphInto(mapId, eventId);
  if (preserved) $gameSystem.logPreservedEventMorph(target);
};

Yanfly.MorphEventTemplate = function(targetId, template, preserved) {
  var str = template.toUpperCase();
  if (Yanfly.EventMorph.Template[str]) {
    var mapId = Yanfly.EventMorph.Template[str].mapId;
    var eventId = Yanfly.EventMorph.Template[str].eventId;
    Yanfly.MorphEvent(targetId, mapId, eventId, preserved);
  } else {
    console.log('Template ' + template + ' does not exist to morph into!');
  }
};

Yanfly.RemoteMorphEvent = function(targetMapId, targetEventId, mapId, eventId) {
  if ($gameParty.inBattle() && $gameTemp.isPlaytest()) return;
  if ($gameMap.mapId() === targetMapId) {
    Yanfly.MorphEvent(targetEventId, mapId, eventId, true);
  } else {
    $gameSystem.logPreservedEventMorphRaw(targetMapId, targetEventId,
      mapId, eventId);
  }
};

Yanfly.RemoteMorphEventTemplate = function(targetMapId, targetEventId, name) {
  var str = name.toUpperCase();
  if (Yanfly.EventMorph.Template[str]) {
    var mapId = Yanfly.EventMorph.Template[str].mapId;
    var eventId = Yanfly.EventMorph.Template[str].eventId;
    Yanfly.RemoteMorphEvent(targetMapId, targetEventId, mapId, eventId);
  } else {
    console.log('Template ' + name + ' does not exist to morph into!');
  }
};

Yanfly.RemoveMorph = function(targetId) {
  var target = $gameMap.event(targetId);
  if (!target) return;
  target.removeMorph();
};

Yanfly.RemovePreserveMorph = function(targetMapId, targetId) {
  if ($gameParty.inBattle() && $gameTemp.isPlaytest()) return;
  if (targetMapId === $gameMap.mapId()) return Yanfly.RemoveMorph(targetId);
  $gameSystem.removePreservedEventMorph(targetMapId, targetId);
};

Yanfly.RemoteRemoveMorph = function(targetMapId, targetId) {
  Yanfly.RemovePreserveMorph(targetMapId, targetId);
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.EventMorph.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
  Yanfly.EventMorph.Game_System_initialize.call(this);
  this.initEventMorpher();
};

Game_System.prototype.initEventMorpher = function() {
  this._preservedEventMorphs = {};
};

Game_System.prototype.getPreservedEventMorphs = function() {
  if (this._preservedEventMorphs === undefined) this.initEventMorpher();
  return this._preservedEventMorphs;
};

Game_System.prototype.logPreservedEventMorphRaw = function(a, b, c, d) {
  var targetMapId = a;
  var targetEventId = b;
  var mapId = c;
  var eventId = d;

  var key = [targetMapId, targetEventId];
  var preserved = this.getPreservedEventMorphs();

  preserved[key] = {
    mapId: mapId,
    eventId: eventId
  }
};

Game_System.prototype.logPreservedEventMorph = function(target) {
  var targetMapId = $gameMap.mapId();
  var targetEventId = target.eventId();
  var mapId = target._morphMapId;
  var eventId = target._morphEventId;
  this.logPreservedEventMorphRaw(targetMapId, targetEventId, mapId, eventId);
};

Game_System.prototype.getPreservedEventMorph = function(mapId, eventId) {
  var preserved = this.getPreservedEventMorphs();
  var key = [mapId, eventId];
  return preserved[key];
};

Game_System.prototype.removePreservedEventMorph = function(mapId, eventId) {
  var preserved = this.getPreservedEventMorphs();
  var key = [mapId, eventId];
  preserved[key] = undefined;
};

//=============================================================================
// Game_Event
//=============================================================================

Yanfly.EventMorph.Game_Event_initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function(mapId, eventId) {
  this.initEventMorpher(mapId, eventId);
  Yanfly.EventMorph.Game_Event_initialize.call(this, mapId, eventId);
};

Game_Event.prototype.initEventMorpher = function(mapId, eventId) {
  this._morphed = false;
  this._morphMapId = mapId;
  this._morphEventId = eventId;
  var preserved = $gameSystem.getPreservedEventMorph(mapId, eventId);
  if (preserved) {
    var preservedId = this.eventId();
    var preservedX = $dataMap.events[eventId].x;
    var preservedY = $dataMap.events[eventId].y;
    this.morphInto(preserved.mapId, preserved.eventId);
    this._eventId = preservedId;
    var data = this.event();
    data.x = preservedX;
    data.y = preservedY;
  }
};

Yanfly.EventMorph.event = Game_Event.prototype.event;
Game_Event.prototype.event = function() {
  if (this._morphed) {
    return Yanfly.PreloadedMaps[this._morphMapId].events[this._morphEventId];
  } else {
    return Yanfly.EventMorph.event.call(this);
  }
};

Game_Event.prototype.morphInto = function(mapId, eventId) {
  this._morphed = true;
  this._morphMapId = mapId;
  this._morphEventId = eventId;
  this._pageIndex = -2;
  this.findProperPageIndex();
  this.setupPage();
  this.refresh();
  //this.forceGraphicalUpdate();
};

Game_Event.prototype.removeMorph = function() {
  $gameSystem.removePreservedEventMorph($gameMap.mapId(), this.eventId());
  this._morphed = false;
  this._pageIndex = -2;
  this.findProperPageIndex();
  this.setupPage();
  this.refresh();
  //this.forceGraphicalUpdate();
};

Game_Event.prototype.isEventMorphed = function() {
  if (this._morphed === undefined) {
    this.initEventMorpher(this._mapId, this._eventId);
  }
  return this._morphed;
};

Game_Event.prototype.getEventMorphedData = function() {
  if (this._morphed === undefined) {
    this.initEventMorpher(this._mapId, this._eventId);
  }
  return {
    mapId: this._morphMapId,
    eventId: this._morphEventId
  }
};

Game_Event.prototype.forceGraphicalUpdate = function() {
  var spriteset = SceneManager._scene._spriteset;
  if (!spriteset) return;
  var sprites = spriteset._characterSprites;
  var length = sprites.length;
  for (var i = 0; i < length; ++i) {
    var sprite = sprites[i];
    if (!sprite) continue;
    if (sprite._character !== this) continue;
    sprite.update();
  }
  spriteset.update();
};

//=============================================================================
// Game_Map
//=============================================================================

Yanfly.EventMorph.Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
  this.checkReloadForMorphedEvents(mapId);
  Yanfly.EventMorph.Game_Map_setup.call(this, mapId);
  this.processMorphedEvents();
};

Game_Map.prototype.checkReloadForMorphedEvents = function(mapId) {
  this._recordedMorphedEvents = false;
  if ($gamePlayer && $gamePlayer._needsMapReload) {
    if (mapId === this.mapId() && $gamePlayer) {
      this.recordMorphedEvents();
    }
  }
};

Game_Map.prototype.recordMorphedEvents = function() {
  this._recordedMorphedEvents = true;
  this._recordedMorphedEventData = {};
  var events = this.events();
  var length = events.length;
  for (var i = 0; i < length; ++i) {
    var ev = events[i];
    if (!ev) continue;
    if (!ev.isEventMorphed()) continue;
    this._recordedMorphedEventData[ev.eventId()] = ev.getEventMorphedData();
  }
};

Game_Map.prototype.processMorphedEvents = function() {
  if (!this._recordedMorphedEvents) return;
  for (var targetId in this._recordedMorphedEventData) {
    var data = this._recordedMorphedEventData[targetId];
    Yanfly.MorphEvent(targetId, data.mapId, data.eventId);
  }
  this._recordedMorphedEvents = false;
};

//=============================================================================
// End of File
//=============================================================================