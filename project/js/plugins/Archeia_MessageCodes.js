/*=============================================================================
 * Archeia - Message Codes
 * By Liquidize - htp://anima.mintkit.lol
 * Archeia_MessageCodes.js
 * Version: 1.02
 *
 * This plugin was created by Liquidize for use by Archeia and their team(s),
 * I do not request credit in any form, You are licensed to use this plugin in 
 * anyway you see fit, for any number of projects,games,websites,etc,etc.
 *
 *
 *=============================================================================*/
/*:
 * @plugindesc Plugin Description <Archeia_MessageCodes>
 * @author Liquidize
 *
 * @param Variable Set Code
 * @desc The escape code used to set a variable.
 * @default Var
 *
 * @param Variable Add Code
 * @desc The escape code used to do  the addition operation on a variable.
 * @default VarA
 *
 * @param Variable Sub Code
 * @desc The escape code used to do the subtraction operation on a variable.
 * @default VarS
 *
 * @param Variable Mul Code
 * @desc The escape code used to do the multiplication operation on a variable.
 * @default VarX
 *
 * @param Variable Div Code
 * @desc The escape code used to do the division operation on a variable.
 * @default VarD
 *
 * @param Variable Mod Code
 * @desc The escape code used do modulo on a variable.
 * @default VarM
 *
 * @param Common Event Code
 * @desc The escape code used to call a common event.
 * @default Com
 *
 *
 * @help
 * This plugin provides two additional escape codes for use in messages. The
 * first being an escape code to set the value of a variable, the second being
 * an escape code to call a common event.
 *
 * ---------------------------------------------------------------------------
 *
 * To use the escape code to set a variable follow the below format:
 *
 * \ESCAPECODEHERE[VARIABLEID,VALUE]
 *
 * E.G: \V[10,10]
 *
 * The above example will set the variable with ID 10, to be the value of 10.
 * The V is used as the escape code, as thats what the default value is. You can
 * change this value by editing the Variable Code parameter.
 *
 *
 *
 * ---------------------------------------------------------------------------
 *
 * To use the escape code to call a common event, use the following:
 *
 * \ESCAPECODEHERE[COMMONEVENTID]
 *
 * E.G: \C[1]
 *
 * The above example will call the common event with ID of 1. The escape code
 * used is C because that is the value of the default escape code, you can
 * change it in the parameters.
 *
 * ============================================================================
 * Change Log
 * ============================================================================
 *
 * Version 1.02:
 *            - Refactored Code
 *            - Added the ability to call events while in battle.
 *            - Added the other operations when setting variables (albeit buggy).
 *
 * Version 1.01a:
 *            - Another potential fix for things.
 *
 * Version 1.01:
 *            - Fixed an issue causing incompatibility with YEP_MessageCore.
 *            - Potential fix for instant common event execution.
 *
 * Version 1.0:
 *            - Finished Script!
 *
 *=============================================================================*/


var Imported = Imported || {};
var Archeia = Archeia || {};
Archeia.MessageCodes = Archeia.MessageCodes || {};
Archeia.Utils = Archeia.Utils || {};

(function ($) {
    "use strict";

    var parameters = $plugins.filter(function (plugin) {
        return plugin.description.contains('<Archeia_MessageCodes>');
    });
    if (parameters.length === 0) {
        throw new Error("Couldn't find the parameters of Archeia_MessageCodes.");
    }

    $.Parameters = parameters[0].parameters;
    $.Param = {};
    $.Param.variableSetCode = String($.Parameters['Variable Set Code']);
    $.Param.variableAddCode = String($.Parameters['Variable Add Code']);
    $.Param.variableSubCode = String($.Parameters['Variable Sub Code']);
    $.Param.variableMulCode = String($.Parameters['Variable Mul Code']);
    $.Param.variableDivCode = String($.Parameters['Variable Div Code']);
    $.Param.variableModCode = String($.Parameters['Variable Mod Code']);
    $.Param.commonEventCode = String($.Parameters['Common Event Code']);

    //================================================================================
    // Window_Base
    //================================================================================

    Window_Base.prototype.obtainEscapeParamsArray = function (textState) {
        var arr = /^\[(\d+,\d+)]/.exec(textState.text.slice(textState.index));
        if (arr) {
            textState.index += arr[0].length;
            return arr[1].split(',');
        } else {
            return '';
        }
    };

    var Window_Message_processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
    Window_Message.prototype.processEscapeCharacter = function (code, textState) {
        if (code === $.Param.commonEventCode.toUpperCase()) {
            if ($gameParty && $gameParty.inBattle()) {
                $gameTroop.setupCommonEvent(parseInt(this.obtainEscapeParam(textState)));
            } else {
                $gameMap.setupCommonEvent(parseInt(this.obtainEscapeParam(textState)));
            }
        } else if (code === $.Param.variableSetCode.toUpperCase()) {
            this.changeVariable(this.obtainEscapeParamsArray(textState),0);
        } else if (code === $.Param.variableAddCode.toUpperCase()) {
            this.changeVariable(this.obtainEscapeParamsArray(textState),1);
        } else if (code === $.Param.variableSubCode.toUpperCase()) {
            this.changeVariable(this.obtainEscapeParamsArray(textState),2);
        } else if (code === $.Param.variableMulCode.toUpperCase()) {
            this.changeVariable(this.obtainEscapeParamsArray(textState),3);
        } else if (code === $.Param.variableDivCode.toUpperCase()) {
            this.changeVariable(this.obtainEscapeParamsArray(textState),4);
        } else if (code === $.Param.variableModCode.toUpperCase()) {
            this.changeVariable(this.obtainEscapeParamsArray(textState),5);
        } else {
            Window_Message_processEscapeCharacter.call(this, code, textState);
        }
    };

    Window_Message.prototype.changeVariable = function (data,operation) {
        if (data) {
            var varId = parseInt(data[0]);
            try {
                var oldVal = $gameVariables.value(varId);
                var val = parseInt(data[1]);

                switch (operation) {
                    case 0:
                        $gameVariables.setValue(varId,oldVal = val);
                        break;
                    case 1:
                        $gameVariables.setValue(varId,oldVal + val);
                        break;
                    case 2:
                        $gameVariables.setValue(varId,oldVal - val);
                        break;
                    case 3:
                        $gameVariables.setValue(varId,oldVal * val);
                        break;
                    case 4:
                        $gameVariables.setValue(varId,oldVal / val);
                        break;
                    case 5:
                        $gameVariables.setValue(varId,oldVal % val);
                        break;
                }
            } catch (e) {
                $gameVariables.setValue(varId,0);
            }
        }
    };


    //================================================================================
    // Game_Map
    //================================================================================

    Game_Map.prototype.setupCommonEvent = function (commonId) {
        var commonEvent = $dataCommonEvents[commonId];
        if (commonEvent) {
            var eventId = this._interpreter.isOnCurrentMap() ? this._interpreter._eventId : 0;
            this._interpreter.setupChild(commonEvent.list, eventId);
        }
    };

    Game_Map.prototype.stopCurrentEvent = function () {
        if (this.isEventRunning()) {
            this._interpreter.terminate();
        }
    };



    //================================================================================
    // Game_Troop
    //================================================================================


    Game_Troop.prototype.setupCommonEvent = function(commonId) {
        var commonEvent = $dataCommonEvents[commonId];
        if (commonEvent) {
            var eventId = this._interpreter.isOnCurrentMap() ? this._interpreter._eventId : 0;
            this._interpreter.setupChild(commonEvent.list, eventId);
        }
    };

    //================================================================================
    // UTILS
    //================================================================================

    // The below is a string formatting function that gives me/js/people/anyone/stuff
    // the ability to use C#/C styled string formatting using {0},{1} for parameters.

    Archeia.Utils.sformat = function () {
        var theString = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
            var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
            theString = theString.replace(regEx, arguments[i]);
        }
        return theString;
    };


})(Archeia.MessageCodes);

ArcheiaMessageCodes = Archeia.MessageCodes;
Imported["Archeia_MessageCodes"] = 1.02;