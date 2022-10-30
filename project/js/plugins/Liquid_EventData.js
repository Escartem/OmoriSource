//=============================================================================
// Liquid's Lovely Plugin - Game_Event Data
// Liquid_EventData.js
//=============================================================================

var Imported = Imported || {};
Imported.Liquid_EventData = true;

var Liquid = Liquid || {};
Liquid.EventData = Liquid.EventData || {};
Liquid.EventData.version = 1.00;

//=============================================================================
/*:
 * @plugindesc v1.0 Easibly add saveable data to events
 * @author Liquidize
 * 
 * @help
 * ============================================================================
 * Introduction and Instructions
 * ============================================================================
 * 
 * This plugin adds a new data object that allows end users to store variables
 * and values for any event on any map and access said value in any script or
 * event through easy to use functions.
 * 
 * Functions are called via the $eventData global. It is similar in structure to
 * $gameVariables, $gameSwitches, and $gameSelfSwitches.
 * 
 * To make it easier for non-coders to use these functions in script calls to get
 * or set values, some of the functions that you are used to for $gameVariables
 * and the like have been "extended". These are as follows:
 * 
 * $eventData.valueExt(CATEGORY,MAP_ID,EVENT_ID) - This function works similar to
 * $gameVariables.value but for non programmers you need to specifiy every argument
 * and then the function will build the "special key" in order to access the value.
 * 
 * $eventData.setValueExt(CATEGORY,MAP_ID,EVENT_ID,VALUE) - This function like the
 * above "valueExt" function works similar to $gameVariable.setValue except, just like
 * the "valueExt" function you need to specify the Map and Event ID's as the function
 * will build the key for you.
 * 
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.00:
 * - Finished plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Liquid.Parameters = PluginManager.parameters('Liquid_EventData');
Liquid.Param = Liquid.Param || {};

// Define Global
var $eventData = null;

//=============================================================================
// DataManager
//=============================================================================

Liquid.EventData.DataManager_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
    $eventData = new Game_EventData();
    Liquid.EventData.DataManager_createGameObjects.call(this);
};

Liquid.EventData.DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    var contents = Liquid.EventData.DataManager_makeSaveContents.call(this);
    contents.eventData = $eventData;
    return contents;
};

Liquid.EventData.DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    Liquid.EventData.DataManager_extractSaveContents.call(this,contents);
    $eventData = contents.eventData;
};

//=============================================================================
// Game_EventData
//=============================================================================

// Constructor
function Game_EventData() {
    this.initialize.apply(this, arguments);
}

// Initializer, clears/builds the data object
Game_EventData.prototype.initialize = function () {
    this.clearAll();
};

// Adds a category to the data, specified by the argument "category"
// If no such category exists already
Game_EventData.prototype.addCategory = function (category) {
    if (category && !this._data[category]) {
        this._data[category] = {};
    }
};

// Removes a category from the data, specified by the "category"
// argument if said category exists. This deletes ALL the values and
// information for said category.
Game_EventData.prototype.removeCategory = function(category) {
    if (category && this._data[category]) {
        delete this._data[category];
    }
};

// This is basically a reset function, it clears
// the data and resets the object to default state 
// removing all categories and information
Game_EventData.prototype.clearAll = function () {
    this._data = {};
};

// This clears the specific category specified by
// "category".
Game_EventData.prototype.clear = function (category) {
    if (category) {
        this._data[category] = {};
    }
};

// Checks if the data contains the specified category
// Returns true if it does, false if not
Game_EventData.prototype.hasCategory = function(category) {
    if (category && this._data[category]) {
        return true;
    }
    return false;
};

// Gets the value of the specified key in the specified category.
// Key is formatted as an array of MAP ID and EVENT ID.
// e.g: [1,1] - Map 1 Event Id 1
Game_EventData.prototype.value = function(category, key) {
    return this._data[category][key];
};

// Extension of the value property to make calling the function easier for non-coders.
Game_EventData.prototype.valueExt = function(category, map, event, key) {
    if (category && map && event) {
        var key = [map, event];
        return this.value(category,key);
    }
};

// Sets the value of the specified key in the specified category with the specified value.
// The key is formated as an array of MAP ID and EVENT ID.
// e.g: [1,5] - For Map 1, Event 5
Game_EventData.prototype.setValue = function(category, key, value) {
    if (value) {
        this._data[category][key] = value;
    } else {
        delete this._data[category][key];
    }
    this.onChange();
};

// Extension of the setvalue function to make calling the function easier for non-coders.
Game_EventData.prototype.setValueExt = function(category,map,event,value) {
    if (category && map && event) {
        var key = [map, event];
        this.setValue(category,key,value);
    }
};

// This function is called when a value is changed to refresh the map.
Game_EventData.prototype.onChange = function () {
    $gameMap.requestRefresh();
};