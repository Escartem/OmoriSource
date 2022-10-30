//=============================================================================
// Yanfly Engine Plugins - Event Spawner
// YEP_EventSpawner.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_EventSpawner = true;

var Yanfly = Yanfly || {};
Yanfly.EventSpawn = Yanfly.EventSpawn || {};
Yanfly.EventSpawn.version = 1.02;

//=============================================================================
 /*:
 * @plugindesc v1.02 Spawn premade events at specific locations or random
 * points marked by regions.
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
 * While in RPG Maker MV, there's the ability to make events hidden and reveal
 * themselves to make it look like they've spawned out of nothing. However,
 * there isn't an innate function to actually spawn an event from nothing. This
 * plugin will provide users the ability to actually spawn an event that is
 * premade and ready from another map(s).
 *
 * A spawned event will contain all the data from its original source, from the
 * event's page conditions to the event commands to the graphical settings. And
 * should the original source be updated in the future, the spawned event will
 * update as well. Spawned events can also be preserved and remain on the map
 * if the player reenters the map or reloads a save.
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
 * events to spawn as. Any kind of event can be used as a spawn template, from
 * trigger events to auto run events to parallel events.
 *
 * If you are using RPG Maker MV 1.5.0+ and wish to make use of template names,
 * add them through the 'Template Names' plugin parameter. The data from the
 * Template Names parameters can be changed and all events in-game that use
 * script calls with the respective Template Name will be updated accordingly.
 *
 * --------------------
 * Spawning Limitations
 * --------------------
 *
 * However, there are some rules that must be applied before an event can be
 * spawned at a desired location. They are as follows:
 *
 *   1. The spawn location must not be occupied by another event, even if the
 *      event is of a different priority level. This is to prevent overstacking
 *      and causing problems for the RPG Maker MV engine.
 *
 *   2. The spawn location cannot have a vehicle present. This is to prevent
 *      priority conflicts with the event when triggered.
 *
 *   3. The spawn location must exist on the map. It cannot have coordinates
 *      that are outside of the map's boundaries.
 *
 * As long as these rules are followed, the event will spawn properly provided
 * you follow the format used for the Script Calls listed in the section below.
 *
 * ============================================================================
 * Script Calls
 * ============================================================================
 *
 * To spawn events into your maps, use the following script calls:
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Spawn Event - Script Calls
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *   This will spawn a new event using the information from 'mapId' 'eventId'
 *   as its base. The new event's ID will start at 1001 (or whatever you've
 *   set the plugin parameter 'ID Starting Range' to) and onward.
 *
 *   - - -
 *
 *   Yanfly.SpawnEventAt(mapId, eventId, x, y, preserved)
 *   - This will spawn the desired event into the specific coordinates.
 *     - Replace 'mapId' with the ID of the map with the event to morph into.
 *     - Replace 'eventId' with the ID of the event to morph the target into.
 *     - Replace 'x' with the X position on the map to spawn the event at.
 *     - Replace 'y' with the Y position on the map to spawn the event at.
 *     - The X and Y positions MUST NOT have an event present at that location.
 *     - Replace 'preserved' with 'true' or 'false' to preserve the spawn.
 *
 *   * Example: Yanfly.SpawnEventAt(1, 5, 30, 40, true)
 *   - Map 1's Event 5 will be spawned at X, Y coordinates: 30, 40.
 *   - This event will be preserved.
 *
 *   * Example: Yanfly.SpawnEventAt(2, 10, 50, 60, false)
 *   - Map 2's Event 10 will be spawned at X, Y coordinates: 50, 60.
 *   - This event will NOT be preserved.
 *
 *   - - -
 *
 *   Yanfly.SpawnEventTemplateAt(template, x, y, preserved)
 *   - This will spawn the desired event by template name at the coordinates.
 *     - Replace 'template' with a name from the 'Template Names' plugin param.
 *       This must be in 'string' form (surround the name with quotes).
 *     - Replace 'x' with the X position on the map to spawn the event at.
 *     - Replace 'y' with the Y position on the map to spawn the event at.
 *     - The X and Y positions MUST NOT have an event present at that location.
 *     - Replace 'preserved' with 'true' or 'false' to preserve the spawn.
 *
 *   * Example: Yanfly.SpawnEventTemplateAt('StrawberryPlant', 30, 40, true)
 *   - The 'StrawberryPlant' template from the plugin parameters will be
 *     spawned at X, Y coordinates: 30, 40.
 *   - This event will be preserved.
 *
 *   * Example: Yanfly.SpawnEventTemplateAt('MineralVein', 50, 60, false)
 *   - The 'MineralVein' template from the plugin parameters will be
 *     spawned at X, Y coordinates: 50, 60.
 *   - This event will NOT be preserved.
 *
 *   - - -
 *
 *   Yanfly.SpawnEventInRegion(mapId, eventId, region, preserved)
 *   - This will spawn the desired event at a random place within a region(s).
 *     - Replace 'mapId' with the ID of the map with the event to morph into.
 *     - Replace 'eventId' with the ID of the event to morph the target into.
 *     - Replace 'region' with the ID of the region to spawn the event into.
 *       If you want to use multiple regions, place them in an array.
 *     - Replace 'preserved' with 'true' or 'false' to preserve the spawn.
 *
 *   * Example: Yanfly.SpawnEventInRegion(1, 5, 20, true)
 *   - Map 1's Event 5 will be spawned at a random point in region 20.
 *   - This event will be preserved.
 *
 *   * Example: Yanfly.SpawnEventInRegion(2, 10, [20, 25], true)
 *   - Map 2's Event 10 will be spawned at a random point in regions 20 or 25.
 *   - This event will NOT be preserved.
 *
 *   - - -
 *
 *   Yanfly.SpawnEventTemplateInRegion(template, region, preserved)
 *   - This will spawn the desired event at a random place within a region(s).
 *     - Replace 'template' with a name from the 'Template Names' plugin param.
 *       This must be in 'string' form (surround the name with quotes).
 *     - Replace 'region' with the ID of the region to spawn the event into.
 *       If you want to use multiple regions, place them in an array.
 *     - Replace 'preserved' with 'true' or 'false' to preserve the spawn.
 *
 *   * Example: Yanfly.SpawnEventTemplateInRegion('StrawberryPlant', 20, true)
 *   - The 'StrawberryPlant' template from the plugin parameters will be
 *     spawned at a random point in region 20.
 *   - This event will be preserved.
 *
 *   * Example: Yanfly.SpawnEventTemplateInRegion('MineralVein', [20, 25], true)
 *   - The 'MineralVein' template from the plugin parameters will be
 *     spawned at a random point in regions 20 or 25.
 *   - This event will NOT be preserved.
 *
 *   - - -
 *
 * * Note: If a spawned event is preserved, it will remain on that map when the
 * map is reloaded from a save file or revisited from a different map. If an
 * event is set up to not be preserved, it will automatically despawn itself
 * upon leaving the map.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Obtaining Spawned Event Data - Script Calls
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *   $gameMap.event(eventId)
 *   - This will grab the event as an object.
 *     - Replace 'eventId' with the ID of the event you wish to grab.
 *     - ID's past 1000 (or whatever you've set it to in the plugin parameters)
 *       are spawned events.
 *
 *   - - -
 *
 *   $gameMap.FirstSpawnedEvent()
 *   - This will grab the first available spawned event as an object.
 *   - If the first event has been despawned, the next on in the list will be
 *     returned as an object. If there are no spawned events left, this script
 *     call will return an undefined value.
 *
 *   - - -
 *
 *   $gameMap.FirstSpawnedEventID()
 *   - This will grab the first available spawned event's ID as a number.
 *   - If the first event has been despawned, the next on in the list will be
 *     returned as a number. If there are no spawned events left, this script
 *     call will return a value of 0.
 *
 *   - - -
 *
 *   $gameMap.LastSpawnedEvent()
 *   - This will grab the last available spawned event as an object.
 *   - If the last event has been despawned, the previous event in the list
 *     will be returned as an object. If there are no spawned events left, this
 *     script call will return an undefined value.
 *
 *   - - -
 *
 *   $gameMap.LastSpawnedEventID()
 *   - This will grab the last available spawned event's ID as a number.
 *   - If the last event has been despawned, the previous event ID on in the
 *     list will be returned as a number. If there are no spawned events left,
 *     this script call will return a value of 0.
 *
 *   - - -
 *
 *   $gameSystem.getMapSpawnedEventTotal()
 *   - Returns the total number of spawned events on that map ever (this number
 *     will include the spawned events that have despawned).
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Despawn Event - Script Calls
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *   Yanfly.DespawnEventID(eventId)
 *   - Despawn a target spawned event if you have the spawned event's ID.
 *     - Replace 'eventId' with the spawned event's ID.
 *
 *   * Example: Yanfly.DespawnEventID(1001)
 *   - This will despawn event 1001 on the current map.
 *   - The latest spawned event is no longer preserved.
 *
 *   * Example: Yanfly.DespawnEventID($gameMap.LastSpawnedEventID())
 *   - This will despawn the last spawned event based on ID on the current map.
 *   - Event 1001 is no longer preserved.
 *
 *   - - -
 *
 *   Yanfly.DespawnEvent(event)
 *   - Despawn a target spawned event object.
 *     - Replace 'event' with the spawned event object.
 *
 *   * Example: Yanfly.DespawnEvent($gameMap.FirstSpawnedEvent())
 *   - This will despawn the first spawned event on the current map.
 *   - First spawned event is no longer preserved.
 *
 *   - - -
 *
 *   Yanfly.ClearSpawnedEvents()
 *   - Clears the current map of all spawned events.
 *
 *   - - -
 *
 *   Yanfly.ClearSpawnedEvents(mapId)
 *   - Clears a specific map of all spawned events.
 *     - Replace 'mapId' with the mpa you wish to clear of spawned events.
 *
 *   * Example: Yanfly.ClearSpawnedEvents(10)
 *   - Clears all spawned events on map 10.
 *
 * * Note: When a spawned event is despawned, any preserved data will also be
 * removed in addition to the removed spawned event.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Bugfixed for irregular spawn ID's.
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
 * @param IdStartRange
 * @text ID Starting Range
 * @parent ---General---
 * @type number[]
 * @min 1000
 * @desc The starting range for the ID's of the events spawned.
 * Do not input a number under 1000. Recommended: 1000
 * @default 1000
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
 * the script call: 
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
 * @desc The ID of the event to be spawned when using this template.
 * @default 1
 * 
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_EventSpawner');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.EventSpawnerData = eval(Yanfly.Parameters['TemplateMaps']);
Yanfly.Param.EventSpawnerList = JSON.parse(Yanfly.Parameters['TemplateNames']);
Yanfly.Param.EventSpawnerID = Number(Yanfly.Parameters['IdStartRange']);

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
  Yanfly.EventSpawn.Template = {};
  var length = Yanfly.Param.EventSpawnerList.length;
  for (var i = 0; i < length; ++i) {
    var data = JSON.parse(Yanfly.Param.EventSpawnerList[i]);
    var name = data.Name.toUpperCase();
    Yanfly.loadMapData(parseInt(data.MapID));
    Yanfly.EventSpawn.Template[name] = {
      mapId: data.MapID,
      eventId: data.EventID
    }
  }
  // Preload Map Data List
  var data = Yanfly.Param.EventSpawnerData;
  var length = data.length;
  for (var i = 0; i < length; ++i) {
    var mapId = parseInt(data[i]);
    Yanfly.loadMapData(mapId)
  }
};
Yanfly.SetupParameters();

//=============================================================================
// Yanfly Spawn Event - Script Calls
//=============================================================================

Yanfly.SpawnEventFailChecks = function(mapId, eventId, x, y) {
  if (!Yanfly.PreloadedMaps[mapId]) {
    if ($gameTemp.isPlaytest()) {
      console.log('Map ID ' + mapId + ' has not been preloaded. ' +
        'It cannot be used for the Spawn Spawn function.');
    }
    return true;
  }
  if (!Yanfly.PreloadedMaps[mapId].events[eventId]) {
    if ($gameTemp.isPlaytest()) {
      console.log('Map ID ' + mapId + ', Event ID ' + eventId + ' does not ' +
        'exist. It cannot be used for the Spawn Event function.');
    }
    return true;
  }
  if ($gameMap.eventsXy(x, y).length > 0) {
    if ($gameTemp.isPlaytest()) {
      console.log('Cannot spawn event at ' + x + ', ' + y + '.' + 
        'There is already an event there.');
    }
    return true;
  }
  if ($gameMap.boat().posNt(x, y) || $gameMap.ship().posNt(x, y)) {
    if ($gameTemp.isPlaytest()) {
      console.log('Cannot spawn event at ' + x + ', ' + y + '.' + 
        'There is a vehicle there.');
    }
    return true;
  }
  if (x < 0 || x >= $gameMap.width() || y < 0 || y >= $gameMap.height()) {
    if ($gameTemp.isPlaytest()) {
      console.log('Cannot spawn event at ' + x + ', ' + y + '.' + 
        "This is outside of the map's boundaries.");
    }
    return true;
  }
  return false;
};

Yanfly.SpawnEvent = function(mapId, eventId, x, y, preserved) {
  if ($gameParty.inBattle()) return;
  if (Yanfly.SpawnEventFailChecks(mapId, eventId, x, y)) return;
  preserved = preserved || false;
  $gameMap.spawnEvent(mapId, eventId, x, y, preserved);
};

Yanfly.SpawnEventAt = function(mapId, eventId, x, y, preserved) {
  Yanfly.SpawnEvent(mapId, eventId, x, y, preserved);
};

Yanfly.SpawnEventInRegion = function(mapId, eventId, regions, preserved) {
  if (regions.constructor !== Array) regions = [regions];
  var data = $gameMap.validSpawnPoints(regions);
  if (data.length <= 0) return;
  random = data[Math.floor(Math.random() * data.length)];
  Yanfly.SpawnEvent(mapId, eventId, random[0], random[1], preserved);
};

Yanfly.SpawnEventTemplate = function(template, x, y, preserved) {
  var str = template.toUpperCase();
  if (Yanfly.EventSpawn.Template[str]) {
    var mapId = Yanfly.EventSpawn.Template[str].mapId;
    var eventId = Yanfly.EventSpawn.Template[str].eventId;
    Yanfly.SpawnEvent(mapId, eventId, x, y, preserved);
  } else {
    console.log('Template ' + template + ' does not exist to spawn from!');
  }
};

Yanfly.SpawnEventTemplateAt = function(template, x, y, preserved) {
  Yanfly.SpawnEventTemplate(template, x, y, preserved);
};

Yanfly.SpawnEventTemplateInRegion = function(template, regions, preserved) {
  var str = template.toUpperCase();
  if (Yanfly.EventSpawn.Template[str]) {
    var mapId = Yanfly.EventSpawn.Template[str].mapId;
    var eventId = Yanfly.EventSpawn.Template[str].eventId;
    Yanfly.SpawnEventInRegion(mapId, eventId, regions, preserved);
  } else {
    console.log('Template ' + template + ' does not exist to spawn from!');
  }
};

Yanfly.DespawnEvent = function(ev) {
  if (!ev) return;
  var eventId = ev.eventId();
  if (!ev.this._spawned) {
    if ($gameTemp.isPlaytest()) {
      console.log('Event ' + eventId + ' is not a valid spawned event.');
      return;
    }
  }
  Yanfly.DespawnEventID(eventId);
};

Yanfly.DespawnEventID = function(eventId) {
  if (eventId < Yanfly.Param.EventSpawnerID) {
    if ($gameTemp.isPlaytest()) {
      console.log('Event ID ' + eventId + ' is not a valid spawned event ID.');
      return;
    }
  }
  $gameMap.despawnEventId(eventId);
};

Yanfly.ClearSpawnedEvents = function(mapId) {
  mapId = mapId || $gameMap.mapId();
  var data = $gameSystem.getMapSpawnedEventData(mapId);
  var length = data.length;
  for (var i = 1; i < length; ++i) {
    var eventData = data[i];
    if (!eventData) continue;
    var eventId = eventData.eventId();
    if (mapId === $gameMap.mapId()) {
      Yanfly.DespawnEventID(eventId);
    } else {
      data[eventId - Yanfly.Param.EventSpawnerID] = null;
    }
  }
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.EventSpawn.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
  Yanfly.EventSpawn.Game_System_initialize.call(this);
  this.initEventSpawner()
};

Game_System.prototype.initEventSpawner = function() {
  this._MapSpawnedEventData = [];
};

Game_System.prototype.getMapSpawnedEventData = function(mapId) {
  if (this._MapSpawnedEventData === undefined) this.initEventSpawner();
  this._MapSpawnedEventData[mapId] = this._MapSpawnedEventData[mapId] || [null];
  return this._MapSpawnedEventData[mapId];
};

Game_System.prototype.getMapSpawnedEventTotal = function(mapId) {
  return this.getMapSpawnedEventData(mapId).length - 1;
};

Game_System.prototype.removeTemporaryMapSpawnedEvents = function(mapId) {
  var data = this.getMapSpawnedEventData(mapId);
  var length = data.length;
  for (var i = 1; i < length; ++i) {
    var eventData = data[i];
    if (!eventData) continue;
    if (eventData._spawnPreserved) continue;
    data[i] = null;
  }
};

//=============================================================================
// Game_Map
//=============================================================================

Yanfly.EventSpawn.Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
  this.setupSpawnedEvents(mapId);
  Yanfly.EventSpawn.Game_Map_setup.call(this, mapId);
  this.restoreSpawnedEvents();
};

Game_Map.prototype.setupSpawnedEvents = function(mapId) {
  if (mapId !== this.mapId() && $gamePlayer) {
    $gameSystem.removeTemporaryMapSpawnedEvents(this.mapId())
  }
  this._spawnedEvents = $gameSystem.getMapSpawnedEventData(mapId);
};

Game_Map.prototype.restoreSpawnedEvents = function() {
  var length = this._spawnedEvents.length;
  for (var i = 0; i < length; ++i) {
    var spawnedEvent = this._spawnedEvents[i];
    if (!spawnedEvent) continue;
    this._events[i + Yanfly.Param.EventSpawnerID] = spawnedEvent;
    spawnedEvent._pageIndex = -2;
    this._needsRefresh = true;
  }
};

Game_Map.prototype.spawnEvent = function(mapId, eventId, x, y, preserved) {
  var spawnId = this._spawnedEvents.length + Yanfly.Param.EventSpawnerID;
  $gameTemp._SpawnData = {
    baseMapId: this.mapId(),
    spawnId: spawnId,
    mapId: mapId,
    eventId: eventId, 
    x: x, 
    y: y,
    preserved: preserved
  };
  var spawnedEvent = new Game_Event(mapId, eventId);
  this._events[spawnId] = spawnedEvent;
  this._spawnedEvents[spawnId - Yanfly.Param.EventSpawnerID] = spawnedEvent;
  $gameTemp._SpawnData = undefined;
};

Game_Map.prototype.despawnEventId = function(eventId) {
  if (eventId < Yanfly.Param.EventSpawnerID) return;
  if (!this._spawnedEvents) return;
  var ev = this.event(eventId);
  ev.locate(-1, -1);
  this.eraseEvent(eventId);
  this._spawnedEvents[eventId - Yanfly.Param.EventSpawnerID] = null;
};

Game_Map.prototype.validSpawnPoints = function(regions) {
  var data = [];
  var width = this.width();
  var height = this.height();
  for (var x = 0; x < width; ++x) {
    for (var y = 0; y < height; ++y) {
      if (!regions.contains(this.regionId(x, y))) continue;
      if (this.eventsXy(x, y).length > 0) continue;
      if ($gamePlayer.x == x && $gamePlayer.y == y) continue;
      if (this.boat().posNt(x, y)) continue;
      if (this.ship().posNt(x, y)) continue;
      data.push([x, y]);
    }
  }
  return data;
};

Game_Map.prototype.FirstSpawnedEvent = function() {
  var length = this._spawnedEvents.length;
  for (var i = 0; i < length; ++i) {
    var eventData = this._spawnedEvents[i];
    if (eventData) return eventData;
  }
  return undefined;
};

Game_Map.prototype.FirstSpawnedEventID = function() {
  var eventData = this.FirstSpawnedEvent();
  if (eventData) {
    return eventData.eventId();
  } else {
    return 0;
  }
};

Game_Map.prototype.LastSpawnedEvent = function() {
  var length = this._spawnedEvents.length;
  for (var i = length; i >= 0; --i) {
    var eventData = this._spawnedEvents[i];
    if (eventData) return eventData;
  }
  return undefined;
};

Game_Map.prototype.LastSpawnedEventID = function() {
  var eventData = this.LastSpawnedEvent();
  if (eventData) {
    return eventData.eventId();
  } else {
    return 0;
  }
};

//=============================================================================
// Game_Event
//=============================================================================

Yanfly.EventSpawn.Game_Event_initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function(mapId, eventId) {
  this._spawned = !!$gameTemp._SpawnData;
  this.initPreSpawnEventData();
  Yanfly.EventSpawn.Game_Event_initialize.call(this, mapId, eventId);
  this.initPostSpawnEventData();
};

Game_Event.prototype.initPreSpawnEventData = function() {
  if ($gameTemp._SpawnData === undefined) return;
  var data = $gameTemp._SpawnData;
  this._spawnData = data;
  this._spawned = true;
  this._pageIndex = -2;
  
  this._mapId = data.baseMapId;
  this._eventId = data.spawnId;

  this._spawnId = data.spawnId;
  this._spawnMapId = data.mapId;
  this._spawnEventId = data.eventId;
  this._spawnPreserved = data.preserved;
};

Game_Event.prototype.initPostSpawnEventData = function() {
  if ($gameTemp._SpawnData === undefined) return;
  var data = $gameTemp._SpawnData;

  this._mapId = data.baseMapId;
  this._eventId = data.spawnId;

  this.locate(data.x, data.y);
  this.refresh();
  SceneManager._scene._spriteset.createSpawnedEvent(this);
};

Yanfly.EventSpawn.Game_Event_eventId = Game_Event.prototype.eventId;
Game_Event.prototype.eventId = function() {
  if (this._spawned) {
    return this._spawnId;
  } else {
    return Yanfly.EventSpawn.Game_Event_eventId.call(this);
  }
};

Yanfly.EventSpawn.event = Game_Event.prototype.event;
Game_Event.prototype.event = function() {
  if (this._spawned) {
    return Yanfly.PreloadedMaps[this._spawnMapId].events[this._spawnEventId];
  } else {
    return Yanfly.EventSpawn.event.call(this);
  }
};

//=============================================================================
// Spriteset_Map
//=============================================================================

Spriteset_Map.prototype.createSpawnedEvent = function(target) {
  this._characterSprites = this._characterSprites || [];
  var length = this._characterSprites.length;
  this._characterSprites[length] = new Sprite_Character(target);
  this._characterSprites[length].update();
  this._tilemap.addChild(this._characterSprites[length]);
};

//=============================================================================
// End of File
//=============================================================================