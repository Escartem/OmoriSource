/*=============================================================================
 * OMORI - Preset Animations
//=============================================================================
/*:
 * @plugindesc <OMO_PresetAnimations> Uses regions to add tile properties.
 * @author Archeia and TDS
 *
 * @help This plugin contains all event animation movements OMORI uses that
 * involves the usage of Frame Blocks from Custom Character Rectangles.js
*/

var Imported = Imported || {};
Imported.OMO_PresetAnimations = true;

//=============================================================================
// ** Parameter Check
//=============================================================================
var parameters = $plugins.filter(function(p) {
    return p.description.contains('<OMO_PresetAnimations>')
})[0].parameters;

//=============================================================================================================================================================================================================
// ** MAIN CAST ANIMATIONS
//=============================================================================================================================================================================================================

//=============================================================================================================================================================================================================
// ** DREAM WORLD ANIMATIONS
//=============================================================================================================================================================================================================

//=============================================================================
// ** TAG ANIMATIONS
// * Contains all the animations for Tag-related actions for the game.
//=============================================================================

//-----------------------------------------------------------------------------
// OMORI's Cut Animation
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceOmoriCut(idA);
//
Game_Interpreter.prototype.forceOmoriCut = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };
    // Get Direction
    var direction = $gamePlayer.direction();
    // Direction Case
    switch (direction) {
        case 2: // Down
            // Add Script call to move route
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 0)"] });
            // Add Wait command to move route
            route.list.push({ code: 15, parameters: [7] });
            // Add Play SE command to move route
            route.list.push({ code: 44, parameters: [{ name: 'SE_Cut', volume: 100, pitch: 100, pan: 0 }] });
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 1)"] });
            route.list.push({ code: 15, parameters: [7] });
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 1)"] });
            route.list.push({ code: 15, parameters: [7] });
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 1)"] });
            route.list.push({ code: 15, parameters: [7] });
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 0)"] });
            route.list.push({ code: 15, parameters: [7] });
            // This is required to end Movement Route.
            route.list.push({ code: 0, parameters: [] });
            break;

        case 4: // Left
            // Add Script call to move route
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 0)"] });
            // Add wait command to move route
            route.list.push({ code: 15, parameters: [7] });
            route.list.push({ code: 44, parameters: [{ name: 'SE_Cut', volume: 100, pitch: 100, pan: 0 }] });
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 0)"] });
            route.list.push({ code: 15, parameters: [7] });
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 0)"] });
            route.list.push({ code: 15, parameters: [7] });
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 1)"] });
            route.list.push({ code: 15, parameters: [7] });
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 1)"] });
            route.list.push({ code: 15, parameters: [7] });
            // This is required to end Movement Route.
            route.list.push({ code: 0, parameters: [] });
            break;

        case 6: // Right
            // Add Script call to move route
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 2)"] });
            // Add wait command to move route
            route.list.push({ code: 15, parameters: [7] });
            route.list.push({ code: 44, parameters: [{ name: 'SE_Cut', volume: 100, pitch: 100, pan: 0 }] });
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 2)"] });
            route.list.push({ code: 15, parameters: [7] });
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 3)"] });
            route.list.push({ code: 15, parameters: [7] });
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 3)"] });
            route.list.push({ code: 15, parameters: [7] });
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 3)"] });
            route.list.push({ code: 15, parameters: [7] });
            // This is required to end Movement Route.
            route.list.push({ code: 0, parameters: [] });
            break;

        case 8: // Up
            // Add Script call to move route
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 2)"] });
            // Add Wait command to move route
            route.list.push({ code: 15, parameters: [7] });
            // Add Play SE command to move route
            route.list.push({ code: 44, parameters: [{ name: 'SE_Cut', volume: 100, pitch: 100, pan: 0 }] });
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 2)"] });
            route.list.push({ code: 15, parameters: [7] });
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 3)"] });
            route.list.push({ code: 15, parameters: [7] });
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 3)"] });
            route.list.push({ code: 15, parameters: [7] });
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 3)"] });
            route.list.push({ code: 15, parameters: [7] });
            // This is required to end Movement Route.
            route.list.push({ code: 0, parameters: [] });
            break;
    }
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
        // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// AUBREY's Hammer Animation
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceAubreySmash(idA);
//
Game_Interpreter.prototype.forceAubreySmash = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };
    // Get Direction
    var direction = $gamePlayer.direction();
    // Direction Case
    switch (direction) {
        case 2: // Down
            // Add Script call to move route
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 0)"] });
            // Add Wait command to move route
            route.list.push({ code: 15, parameters: [2] });
            // Add Script call to move route
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 1)"] });
            // Add Wait command to move route
            route.list.push({ code: 15, parameters: [3] });
            // Add Script call to move route
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 1)"] });
            // Add Wait command to move route
            route.list.push({ code: 15, parameters: [4] });
            // Add Script call to move route
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 1)"] });
            // Add Wait command to move route
            route.list.push({ code: 15, parameters: [10] });
            // Add Play SE command to move route
            //route.list.push({ code: 44, parameters: [{ name: 'SE_Aub_Smash_01', volume: 100, pitch: 100, pan: 0 }] });
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 2)"] });
            route.list.push({ code: 15, parameters: [4] });
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 2)"] });
            route.list.push({ code: 15, parameters: [3] });
            // Add Play SE command to move route
            //route.list.push({ code: 44, parameters: [{ name: 'SE_Aub_Smash_02', volume: 100, pitch: 100, pan: 100 }] });
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 2)"] });
            route.list.push({ code: 15, parameters: [2] });
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 3)"] });
            route.list.push({ code: 15, parameters: [7] });
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 3)"] });
            route.list.push({ code: 15, parameters: [5] });
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 3)"] });
            route.list.push({ code: 15, parameters: [3] });
            // This is required to end Movement Route.
            route.list.push({ code: 0, parameters: [] });
            break;

        case 4: // Left
            // Add Script call to move route
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 0)"] });
            // Add Wait command to move route
            route.list.push({ code: 15, parameters: [2] });
            // Add Script call to move route
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 1)"] });
            // Add Wait command to move route
            route.list.push({ code: 15, parameters: [3] });
            // Add Script call to move route
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 1)"] });
            // Add Wait command to move route
            route.list.push({ code: 15, parameters: [4] });
            // Add Script call to move route
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 1)"] });
            // Add Wait command to move route
            route.list.push({ code: 15, parameters: [10] });
            // Add Play SE command to move route
            //route.list.push({ code: 44, parameters: [{ name: 'SE_Aub_Smash_01', volume: 100, pitch: 100, pan: 0 }] });
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 2)"] });
            route.list.push({ code: 15, parameters: [4] });
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 2)"] });
            route.list.push({ code: 15, parameters: [3] });
            // Add Play SE command to move route
            //route.list.push({ code: 44, parameters: [{ name: 'SE_Aub_Smash_02', volume: 100, pitch: 100, pan: 100 }] });
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 2)"] });
            route.list.push({ code: 15, parameters: [1] });
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 3)"] });
            route.list.push({ code: 15, parameters: [1] });
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 3)"] });
            route.list.push({ code: 15, parameters: [1] });
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 3)"] });
            route.list.push({ code: 15, parameters: [1] });

            // This is required to end Movement Route.
            route.list.push({ code: 0, parameters: [] });
            break;

        case 6: // Right
             // Add Script call to move route
             route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(8, 0)"] });
             // Add Wait command to move route
             route.list.push({ code: 15, parameters: [2] });
             // Add Script call to move route
             route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(6, 1)"] });
             // Add Wait command to move route
             route.list.push({ code: 15, parameters: [3] });
             // Add Script call to move route
             route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(7, 1)"] });
             // Add Wait command to move route
             route.list.push({ code: 15, parameters: [4] });
             // Add Script call to move route
             route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(8, 1)"] });
             // Add Wait command to move route
             route.list.push({ code: 15, parameters: [10] });
             // Add Play SE command to move route
             //route.list.push({ code: 44, parameters: [{ name: 'SE_Aub_Smash_01', volume: 100, pitch: 100, pan: 0 }] });
             route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(6, 2)"] });
             route.list.push({ code: 15, parameters: [4] });
             route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(7, 2)"] });
             route.list.push({ code: 15, parameters: [3] });
             // Add Play SE command to move route
             //route.list.push({ code: 44, parameters: [{ name: 'SE_Aub_Smash_02', volume: 100, pitch: 100, pan: 100 }] });
             route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(8, 2)"] });
             route.list.push({ code: 15, parameters: [1] });
             route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(6, 3)"] });
             route.list.push({ code: 15, parameters: [1] });
             route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(7, 3)"] });
             route.list.push({ code: 15, parameters: [1] });
             route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(8, 3)"] });
             route.list.push({ code: 15, parameters: [1] });

            // This is required to end Movement Route.
            route.list.push({ code: 0, parameters: [] });
            break;

        case 8: // Up
            // Add Script call to move route
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(11, 0)"] });
            // Add Wait command to move route
            route.list.push({ code: 15, parameters: [3] });
            // Add Script call to move route
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(10, 1)"] });
            // Add Wait command to move route
            route.list.push({ code: 15, parameters: [4] });
            // Add Script call to move route
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(9, 1)"] });
            // Add Wait command to move route
            route.list.push({ code: 15, parameters: [10] });
            // Add Script call to move route
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(11, 1)"] });
            // Add Play SE command to move route
            //route.list.push({ code: 44, parameters: [{ name: 'SE_Aub_Smash_01', volume: 100, pitch: 100, pan: 0 }] });
            route.list.push({ code: 15, parameters: [4] });
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(9, 2)"] });
            route.list.push({ code: 15, parameters: [3] });
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(10, 2)"] });
            route.list.push({ code: 15, parameters: [2] });
            // Add Play SE command to move route
            //route.list.push({ code: 44, parameters: [{ name: 'SE_Aub_Smash_02', volume: 100, pitch: 100, pan: 100 }] });
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(11, 2)"] });
            route.list.push({ code: 15, parameters: [3] });
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(9, 3)"] });
            route.list.push({ code: 15, parameters: [7] });
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(10, 3)"] });
            route.list.push({ code: 15, parameters: [3] });
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(11, 3)"] });
            route.list.push({ code: 15, parameters: [1] });
            // This is required to end Movement Route.
            route.list.push({ code: 0, parameters: [] });
            break;
    }
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
        // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Kel's Throwing Animation
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceKelThrowTag(idA);
//
Game_Interpreter.prototype.forceKelThrowTag = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };
    // Get Direction
    var direction = $gamePlayer.direction();
    // Direction Case
    switch (direction) {
        case 2: // Down
            // Add Script call to move route
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(6, 2)"] });
            // Add Wait command to move route
            route.list.push({ code: 15, parameters: [7] });
            // Add Script call to move route
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(7, 2)"] });
            // Add Wait command to move route
            route.list.push({ code: 15, parameters: [7] });
            // Add Script call to move route
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(8, 2)"] });
            // Add Wait command to move route
            route.list.push({ code: 15, parameters: [7] });
            // Add Play SE command to move route
            route.list.push({ code: 44, parameters: [{ name: 'BA_Scatter', volume: 100, pitch: 100, pan: 0 }] });
            // Add Script call to move route
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(6, 3)"] });
            // Add Wait command to move route
            route.list.push({ code: 15, parameters: [7] });
            // Add Script call to move route
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(7, 3)"] });
            // Add Wait command to move route
            route.list.push({ code: 15, parameters: [7] });
            // Add Script call to move route
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(8, 3)"] });
            // Add Wait command to move route
            route.list.push({ code: 15, parameters: [7] });
            // Restart to intial
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(null, null)"] });

            // This is required to end Movement Route.
            route.list.push({ code: 0, parameters: [] });
            break;

        case 4: // Left
            // Add Script call to move route
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 0)"] });
            // Add Wait command to move route
            route.list.push({ code: 15, parameters: [7] });
            // Add Script call to move route
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 0)"] });
            // Add Wait command to move route
            route.list.push({ code: 15, parameters: [7] });
            // Add Script call to move route
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 0)"] });
            // Add Wait command to move route
            route.list.push({ code: 15, parameters: [7] });
            // Add Play SE command to move route
            route.list.push({ code: 44, parameters: [{ name: 'BA_Scatter', volume: 100, pitch: 100, pan: 0 }] });
            // Add Script call to move route
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 1)"] });
            // Add Wait command to move route
            route.list.push({ code: 15, parameters: [7] });
            // Add Script call to move route
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 1)"] });
            // Add Wait command to move route
            route.list.push({ code: 15, parameters: [7] });
            // Add Script call to move route
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 1)"] });
            // Add Wait command to move route
            route.list.push({ code: 15, parameters: [7] });
            // Restart to intial
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(null, null)"] });

            // This is required to end Movement Route.
            route.list.push({ code: 0, parameters: [] });
            break;

        case 6: // Right
            // Add Script call to move route
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 2)"] });
            // Add Wait command to move route
            route.list.push({ code: 15, parameters: [7] });
            // Add Script call to move route
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 2)"] });
            // Add Wait command to move route
            route.list.push({ code: 15, parameters: [7] });
            // Add Script call to move route
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 2)"] });
            // Add Wait command to move route
            route.list.push({ code: 15, parameters: [7] });
            // Add Play SE command to move route
            route.list.push({ code: 44, parameters: [{ name: 'BA_Scatter', volume: 100, pitch: 100, pan: 0 }] });
            // Add Script call to move route
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 3)"] });
            // Add Wait command to move route
            route.list.push({ code: 15, parameters: [7] });
            // Add Script call to move route
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 3)"] });
            // Add Wait command to move route
            route.list.push({ code: 15, parameters: [7] });
            // Add Script call to move route
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 3)"] });
            // Add Wait command to move route
            route.list.push({ code: 15, parameters: [7] });
            // Restart to intial
            route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(null, null)"] });

            // This is required to end Movement Route.
            route.list.push({ code: 0, parameters: [] });
            break;

        case 8: // Up
           // Add Script call to move route
           route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(6, 0)"] });
           // Add Wait command to move route
           route.list.push({ code: 15, parameters: [7] });
           // Add Script call to move route
           route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(7, 0)"] });
           // Add Wait command to move route
           route.list.push({ code: 15, parameters: [7] });
           // Add Script call to move route
           route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(8, 0)"] });
           // Add Wait command to move route
           route.list.push({ code: 15, parameters: [7] });
           // Add Play SE command to move route
           route.list.push({ code: 44, parameters: [{ name: 'BA_Scatter', volume: 100, pitch: 100, pan: 0 }] });
           // Add Script call to move route
           route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(6, 1)"] });
           // Add Wait command to move route
           route.list.push({ code: 15, parameters: [7] });
           // Add Script call to move route
           route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(7, 1)"] });
           // Add Wait command to move route
           route.list.push({ code: 15, parameters: [7] });
           // Add Script call to move route
           route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(8, 1)"] });
           // Add Wait command to move route
           route.list.push({ code: 15, parameters: [7] });
           route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(null, null)"] });

            // This is required to end Movement Route.
            route.list.push({ code: 0, parameters: [] });
            break;
    }
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
        // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Kel's Ball Movement
//
// Script Call:
// var idA = $gameVariables.value(78);
// this.forceKellBall(idA);
//
Game_Interpreter.prototype.forceKellBall = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: false };
    // Add Script call to move route
    var x = $gameMap.event($gameVariables.value(31)).x + $gameVariables.value(35)
    var y = $gameMap.event($gameVariables.value(31)).y + $gameVariables.value(36)
    route.list.push({ code: 45, parameters: ["this.moveToPoint(x, y)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["$gameVariables.setValue(29, 99)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
        // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}



//-----------------------------------------------------------------------------
// KEL's Climb Animation
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceKelTag(idA);
//
Game_Interpreter.prototype.forceKelTag = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Play SE command to move route
    route.list.push({ code: 44, parameters: [{ name: 'SE_Cut', volume: 100, pitch: 100, pan: 100 }] });
    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });

    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
        // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Maverick Flip
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceMaverickFlip(idA);
//
Game_Interpreter.prototype.forceMaverickFlip = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Hero Charm
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceHeroCharm(idA);
//
Game_Interpreter.prototype.forceHeroCharm = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(6, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(7, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(8, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(6, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(7, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(8, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(6, 6)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}





//-----------------------------------------------------------------------------
// Aubrey Spin
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceAubreySpin(idA);
// Hold alt
Game_Interpreter.prototype.forceAubreySpin = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(9, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(10, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(11, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(9, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(10, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(11, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(9, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(10, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
        // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Aubrey Stump
//
// Script Call:
// var idA = $gameVariables.value(78);
// this.forceAubreyStump(idA);
//
Game_Interpreter.prototype.forceAubreyStump = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });


    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
        // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Aubrey Stuck
//
// Script Call:
// var idA = $gameVariables.value(78);
// this.forceAubreyStuck(idA);
//
Game_Interpreter.prototype.forceAubreyStuck = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });


    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
        // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Kel Pull Aubrey
//
// Script Call:
// var idA = $gameVariables.value(78);
// this.forceKellPullAub(idA);
//
Game_Interpreter.prototype.forceKellPullAub = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
        // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Kel Rolls
//
// Script Call:
// var idA = $gameVariables.value(78);
// this.forceKellRoll(idA);
//
Game_Interpreter.prototype.forceKellRoll = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(8, 7)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(9, 7)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(10, 7)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(11, 7)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
        // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Jump
//
// Script Call:
// var idA = $gameVariables.value(78);
// this.forcejump(idA);
//
Game_Interpreter.prototype.forcejump = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 14, parameters: [0, 0] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [3] });
    // Add Script call to move route
    route.list.push({ code: 14, parameters: [0, 0] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [3] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
        // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Basil Getting Up
//
// Script Call:
// var idA = $gameVariables.value(78);
// this.forceBasilGetUp(idA);
//
Game_Interpreter.prototype.forceBasilGetUp = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
        // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Basil Takes Photo
//
// Script Call:
// var idA = $gameVariables.value(78);
// this.forceBasilCheese(idA);
//
Game_Interpreter.prototype.forceBasilCheese = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [40] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
        // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Basil Photo Album
//
// Script Call:
// var idA = $gameVariables.value(78);
// this.forceBasilAlbum(idA);
//
Game_Interpreter.prototype.forceBasilAlbum = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [15] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
        // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Basil Tripped
//
// Script Call:
// var idA = $gameVariables.value(78);
// this.forceBasilTripped(idA);
//
Game_Interpreter.prototype.forceBasilTripped = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(6, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(7, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(8, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(6, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
     // Add Script call to move route
     route.list.push({ code: 45, parameters: ["$gameSelfSwitches.setValue([$gameMap._mapId, 7, 'B'], true);"] });
     // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(7, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
     // Add Script call to move route
     route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(8, 1)"] });
     // Add Wait command to move route
     route.list.push({ code: 15, parameters: [7] });
     // Add Script call to move route
     route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(6, 2)"] });
     // Add Wait command to move route
     route.list.push({ code: 15, parameters: [7] });
     // Add Script call to move route
     route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(7, 2)"] });
     // Add Wait command to move route
     route.list.push({ code: 15, parameters: [7] });
     // Add Script call to move route
     route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(8, 2)"] });
     // Add Wait command to move route
     route.list.push({ code: 15, parameters: [7] });
     // Add Script call to move route
     route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(6, 3)"] });
     // Add Wait command to move route
     route.list.push({ code: 15, parameters: [7] });
     // Add Script call to move route
     route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(7, 3)"] });
     // Add Wait command to move route
     route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
        // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//=============================================================================================================================================================================================================
// ** FARAWAY TOWN ANIMATIONS (MAIN CAST)
//=============================================================================================================================================================================================================

//-----------------------------------------------------------------------------
// PLAYER Photo Album
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceDanAlbum(idA);
Game_Interpreter.prototype.forceDanAlbum = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(6, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(7, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(8, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(6, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(7, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
        // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Aubrey Threat
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceAubreyThreat(idA);

Game_Interpreter.prototype.forceAubreyThreat = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
        // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Aubrey Fall
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceAubreyFall(idA);

Game_Interpreter.prototype.forceAubreyFall = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(9, 3)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(10, 3)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(11, 3)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(9, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(10, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(11, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(9, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(10, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(11, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });


    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
        // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Aubrey Fall 2
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceAubreyFall2(idA);

Game_Interpreter.prototype.forceAubreyFall2 = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(9, 3)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(10, 3)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(11, 3)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(9, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(10, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(11, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
        // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}


//-----------------------------------------------------------------------------
// Aubrey Stand
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceAubreyStand(idA);

Game_Interpreter.prototype.forceAubreyStand = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(11, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(10, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(9, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(11, 3)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(10, 3)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(9, 3)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
        // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Aubrey Angry
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceAubreyAngry(idA);

Game_Interpreter.prototype.forceAubreyAngry = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(9, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(10, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(11, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(9, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(11, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(9, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
        // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Kel Headrub
//
// Script Call:
// var idA = $gameVariables.value(78);
// this.forceKelHeadrub(idA);
//
Game_Interpreter.prototype.forceKelHeadrub = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [15] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [15] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [15] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [15] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [15] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [15] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
        // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Kel Pocket
//
// Script Call:
// var idA = $gameVariables.value(78);
// this.forceKelPocket(idA);
//
Game_Interpreter.prototype.forceKelPocket = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(6, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [15] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(7, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [15] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(8, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [15] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(6, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [15] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(7, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [15] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
        // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Kel BOO
//
// Script Call:
// var idA = $gameVariables.value(78);
// this.forceKelBOO(idA);
//
Game_Interpreter.prototype.forceKelBOO = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [15] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [15] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [15] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [15] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [15] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
        // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Hero Piano
//
// Script Call:
// var idA = $gameVariables.value(78);
// this.forceHeroPiano(idA);
//
Game_Interpreter.prototype.forceHeroPiano = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(7, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [15] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(8, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [15] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(7, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [15] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(8, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [15] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
        // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Hero Knock
//
// Script Call:
// var idA = $gameVariables.value(78);
// this.forceHeroKnock(idA);
//
Game_Interpreter.prototype.forceHeroKnock = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(null, null)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
        // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Basil Falling
//
// Script Call:
// var idA = $gameVariables.value(78);
// this.forceBasilFalling(idA);
//
Game_Interpreter.prototype.forceBasilFalling = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
        // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Basil Looking Up After Falling
//
// Script Call:
// var idA = $gameVariables.value(78);
// this.forceBasilLookUp(idA);
//
Game_Interpreter.prototype.forceBasilLookUp = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 6)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
        // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Basil Shears
//
// Script Call:
// var idA = $gameVariables.value(78);
// this.forceBasilShears(idA);
//
Game_Interpreter.prototype.forceBasilShears = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
        // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Basil Stab
//
// Script Call:
// var idA = $gameVariables.value(78);
// this.forceBasilStab(idA);
//
Game_Interpreter.prototype.forceBasilStab = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 6)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 6)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
        // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//=============================================================================================================================================================================================================
// ** DREAM WORLD ANIMATIONS
//=============================================================================================================================================================================================================

//-----------------------------------------------------------------------------
// DreamworldDoorOpen
//
// Script Call:
// var idA = $gameVariables.value(78);
// this.forceDreamworldDoorOpen(idA);
//
Game_Interpreter.prototype.forceDreamworldDoorOpen = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };


    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA);
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// DreamworldDoorClose
//
// Script Call:
// var idA = $gameVariables.value(78);
// this.forceDreamworldDoorClose(idA);
//
Game_Interpreter.prototype.forceDreamworldDoorClose = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 3)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 3)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 3)"] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA);
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
// BlackspaceDoorOpen
//
// Script Call:
// var idA = $gameVariables.value(78);
// this.forceBlackspaceDoorOpen(idA);
//
Game_Interpreter.prototype.forceBlackspaceDoorOpen = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };


    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA);
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// BlackspaceDoorClose
//
// Script Call:
// var idA = $gameVariables.value(78);
// this.forceBlackspaceDoorClose(idA);
//
Game_Interpreter.prototype.forceBlackspaceDoorClose = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 3)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 0)"] });
    // Add Script call to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA);
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}
//-----------------------------------------------------------------------------




//-----------------------------------------------------------------------------
// Dream World Photo Fall
//
// Script Call:
// var idA = $gameVariables.value(78);
// this.forceDWPhotoFall(idA);
//
Game_Interpreter.prototype.forceDWPhotoFall = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: false };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    // route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 1)"] });
    // // Add Wait command to move route
    // route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 3)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 3)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
        // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Dream World Junk
//
// Script Call:
// var idA = $gameVariables.value(78);
// this.forceDreamworldJunk(idA);
//
Game_Interpreter.prototype.forceDreamworldJunk = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };


    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA);
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Dream World Pink Gate
//
// Script Call:
// var idA = $gameVariables.value(78);
// this.forceDWGatePink(idA);
//
Game_Interpreter.prototype.forceDWGatePink = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });


    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA);
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Dream World Cyan Gate
//
// Script Call:
// var idA = $gameVariables.value(78);
// this.forceDWGateCyan(idA);
//
Game_Interpreter.prototype.forceDWGateCyan = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA);
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Dream World Silver Gate
//
// Script Call:
// var idA = $gameVariables.value(78);
// this.forceDWGateSilver(idA);
//
Game_Interpreter.prototype.forceDWGateSilver = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });


    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA);
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Dream World Copper Gate
//
// Script Call:
// var idA = $gameVariables.value(78);
// this.forceDWGateCopper(idA);
//
Game_Interpreter.prototype.forceDWGateCopper = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });


    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA);
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}
//-----------------------------------------------------------------------------
// Dream World Open Gate
//
// Script Call:
// var idA = $gameVariables.value(78);
// this.forceDWGateOpen(idA);
//
Game_Interpreter.prototype.forceDWGateOpen = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 3)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 3)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 3)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA);
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Dream World Space Boyfriend Awake
//
// Script Call:
// var idA = $gameVariables.value(78);
// this.forceSBFAwake(idA);
//
Game_Interpreter.prototype.forceSBFAwake = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 3)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 3)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA);
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}



//=============================================================================================================================================================================================================
// ** FARAWAY TOWN ANIMATIONS
//=============================================================================================================================================================================================================

//-----------------------------------------------------------------------------
// AngelJutsu
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceAngelJutsu(idA);
//
Game_Interpreter.prototype.forceAngelJutsu = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 6)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 6)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 6)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 7)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// AngelFallen
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceAngelFallen(idA);
//
Game_Interpreter.prototype.forceAngelFallen = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(7, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(8, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Angel Stand
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceAngelStand(idA);
//
Game_Interpreter.prototype.forceAngelStand = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(6, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(7, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(8, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Maverick Flip
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceMaverickFlip(idA);
//
Game_Interpreter.prototype.forceMaverickFlip = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Maverick Lame Pose
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceMaverickLamePose(idA);
//
Game_Interpreter.prototype.forceMaverickLamePose = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(6, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(7, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(8, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(7, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Maverick Kneel
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceMaverickKneel(idA);
//
Game_Interpreter.prototype.forceMaverickKneel = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(9, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(10, 6)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(11, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Maverick Kneel Stand
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceMaverickKneelStand(idA);
//
Game_Interpreter.prototype.forceMaverickKneelStand = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(10, 6)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(9, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Maverick Wig Fall
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceMaverickWigFall(idA);
//
Game_Interpreter.prototype.forceMaverickWigFall = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(10, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(11, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [30] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(9, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(10, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(11, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(10, 6)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}


//-----------------------------------------------------------------------------
// ArtistPainting
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceArtistPainting(idA);
//
Game_Interpreter.prototype.forceArtistPainting = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 6)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 6)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// AyeeGuffaw
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceAyeeGuffaw(idA);
//
Game_Interpreter.prototype.forceAyeeGuffaw = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// BebeBlush
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceBebeBlush(idA);
//
Game_Interpreter.prototype.forceBebeBlush = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 6)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 6)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// BebeMomHairflip
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceBebeMomHairflip(idA);
//
Game_Interpreter.prototype.forceBebeMomHairflip = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 6)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// BrandiHmph
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceBrandiHmph(idA);
//
Game_Interpreter.prototype.forceBrandiHmph = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// BrentStudying
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceBrentStudying(idA);
//
Game_Interpreter.prototype.forceBrentStudying = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 3)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });

    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
// Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// BrentSigh
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceBrentSigh(idA);
//
Game_Interpreter.prototype.forceBrentSigh = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// BrentsMomShakehead
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceBrentsMomShakehead(idA);
//
Game_Interpreter.prototype.forceBrentsMomShakehead = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// CandicePose
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceCandicePose(idA);
//
Game_Interpreter.prototype.forceCandicePose = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };


    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// CandiceSpin
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceCandiceSpin(idA);
//
Game_Interpreter.prototype.forceCandiceSpin = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };


    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 6)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 6)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Charlie Punch
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceCharliePunch(idA);
//
Game_Interpreter.prototype.forceCharliePunch = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this._spriteOffsetX -= 4"] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this._spriteOffsetX += 4"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 1)"] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this._spriteOffsetX += 4"] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// CharlieSpin
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceCharlieSpin(idA);
//
Game_Interpreter.prototype.forceCharlieSpin = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// CharlieHappy
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceCharlieHappy(idA);
//
Game_Interpreter.prototype.forceCharlieHappy = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// CharlieJutsu
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceCharlieJutsu(idA);
//
Game_Interpreter.prototype.forceCharlieJutsu = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(6, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(7, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(8, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(6, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(7, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(8, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(7, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// CharlieShaketree
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceCharlieShaketree(idA);
//
Game_Interpreter.prototype.forceCharlieShaketree = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(9, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(10, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(11, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(9, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(10, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(11, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(9, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(10, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(11, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(9, 3)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(10, 3)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(11, 3)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// CharliesMomSign
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceCharliesMomSigh(idA);
//
Game_Interpreter.prototype.forceCharliesMomSigh = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// CrisDadButtscratch
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceCrisDadButtscratch(idA);
//
Game_Interpreter.prototype.forceCrisDadButtscratch = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// FruitsellerExcited
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceFruitsellerExcited(idA);
//
Game_Interpreter.prototype.forceFruitsellerExcited = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// GroundskeeperFlexOops
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceGroundkeeperFlexOops(idA);
//
Game_Interpreter.prototype.forceGroundskeeperFlexOops = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 3)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// GroundskeeperFlex
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceGroundkeeperFlex(idA);
//
Game_Interpreter.prototype.forceGroundskeeperFlex = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// GroundskeeperLaugh
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceGroundkeeperLaugh(idA);
//
Game_Interpreter.prototype.forceGroundskeeperLaugh = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(6, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(7, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(8, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(7, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// JoysDadHeroic
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceJoysDadHeroic(idA);
//
Game_Interpreter.prototype.forceJoysDadHeroic = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };


    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// JoysDadNope
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceJoysDadNope(idA);
//
Game_Interpreter.prototype.forceJoysDadNope = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// KarenKiss
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceKarenKiss(idA);
//
Game_Interpreter.prototype.forceKarenKiss = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Heart
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceHeart(idA);
//
Game_Interpreter.prototype.forceHeart = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(6, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(7, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(8, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(6, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// KelsDadSigh
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceKelsDadSigh(idA);
//
Game_Interpreter.prototype.forceKelsDadSigh = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// KelsDadLaugh
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceKelsDadLaugh(idA);
//
Game_Interpreter.prototype.forceKelsDadLaugh = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// KelsMomLecture
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceKelsMomLecture(idA);
//
Game_Interpreter.prototype.forceKelsMomLecture = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// KevinRollover
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceKevinRollover(idA);
//
Game_Interpreter.prototype.forceKevinRollover = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// KevinPlayDead
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceKevinPlayDead(idA);
//
Game_Interpreter.prototype.forceKevinPlayDead = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 6)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// KevinShake
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceKevinShake(idA);
//
Game_Interpreter.prototype.forceKevinShake = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(9, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(10, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(11, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(9, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(10, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(11, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// KimHairflip
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceKimHairflip(idA);
//
Game_Interpreter.prototype.forceKimHairflip = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };


    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// MichaelPerforming
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceMichaelPerforming(idA);
//
Game_Interpreter.prototype.forceMichaelPerforming = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// MichaelTakeout
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceMichaelTakeout(idA);
//
Game_Interpreter.prototype.forceMichaelTakeout = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(7, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(7, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(7, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// MichaelPutback
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceMichaelPutback(idA);
//
Game_Interpreter.prototype.forceMichaelPutback = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(7, 3)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(7, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// MichaelLook
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceMichaelLook(idA);
//
Game_Interpreter.prototype.forceMichaelLook = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 6)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// MincyNotes
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceMincyNotes(idA);
//
Game_Interpreter.prototype.forceMincyNotes = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// MondoNope
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceMondoNope(idA);
//
Game_Interpreter.prototype.forceMondoNope = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// PedroFlick
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forcePedroFlick(idA);
//
Game_Interpreter.prototype.forcePedroFlick = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// PollyShy
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forcePollyShy(idA);
//
Game_Interpreter.prototype.forcePollyShy = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// PriestFlick
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forcePriestFlick(idA);
//
Game_Interpreter.prototype.forcePriestFlick = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// PriestReading
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forcePriestReading(idA);
//
Game_Interpreter.prototype.forcePriestReading = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// RaiIdol
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceRaiIdol(idA);
//
Game_Interpreter.prototype.forceRaiIdol = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 3)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 3)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 3)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// SeanKiss
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceSeanKiss(idA);
//
Game_Interpreter.prototype.forceSeanKiss = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Studying
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceStudying(idA);
//
Game_Interpreter.prototype.forceStudying = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 3)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 6)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// TimSpin
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceTimSpin(idA);
//
Game_Interpreter.prototype.forceTimSpin = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}


//-----------------------------------------------------------------------------
// TuckerSigh
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceTuckerSigh(idA);
//
Game_Interpreter.prototype.forceTuckerSigh = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 4)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 5)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// TuckerDance
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceTuckerDance(idA);
//
Game_Interpreter.prototype.forceTuckerDance = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(5, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(3, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(4, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//=============================================================================================================================================================================================================
// ** FARAWAY TOWN ANIMATIONS (objects)
//=============================================================================================================================================================================================================

//-----------------------------------------------------------------------------
// Leaves Falling
//
// Script Call:
// var idA = $gameVariables.value(8);
// this.forceFALeaves(idA);
//
Game_Interpreter.prototype.forceFALeaves = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: true };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: [""] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(10, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(11, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(9, 3)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(10, 3)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(11, 3)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(11, 7)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
    // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}

//-----------------------------------------------------------------------------
// Faraway Photo Fall
//
// Script Call:
// var idA = $gameVariables.value(78);
// this.forceFAPhotoFall(idA);
//
Game_Interpreter.prototype.forceFAPhotoFall = function(idA) {
    // Create Move Route Object
    var route = { list: [], repeat: false, skippable: true, wait: false };

    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 0)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 1)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(2, 2)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(0, 3)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });
    // Add Script call to move route
    route.list.push({ code: 45, parameters: ["this.setCustomFrameXY(1, 3)"] });
    // Add Wait command to move route
    route.list.push({ code: 15, parameters: [7] });

    // This is required to end Movement Route.
    route.list.push({ code: 0, parameters: [] });
    // Get Event (Using argument for ID)
    var event = $gameMap.event(idA)
        // Force event to follow move route
    event.forceMoveRoute(route);
    // Set Character for wait tracking
    this._character = event;
    // Set Wait mode so it waits until character is done moving before running other commands
    this.setWaitMode('route');
}
