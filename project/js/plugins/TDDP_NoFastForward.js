//=============================================================================
// TDDP_NoFastForward
// Version: 2.1.0
//=============================================================================
var Imported = Imported || {};
Imported.TDDP_NoFastForward = "2.1.0";
/*:
 * @plugindesc 2.1.0 Disables the ability to fast forward move routes and/or text.                                                          id:TDDP_NoFastForward
 * @author Tor Damian Design / Galenmereth
 *
 * @param Disable for Move Routes
 * @desc If set to true this will disable fast-forwarding for Move Routes globally. Default is false.
 * @default false
 *
 * @param Disable for Show Text
 * @desc If set to true this will disable fast-forwarding for Show Text globally. Default is false.
 * @default false
 *
 * @help =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
 * Information
 * =~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~
 * For updates and easy to use documentation, please go to the plugin's website:
 * http://mvplugins.tordamian.com/?p=376
 *
 * There you can also download a PDF of the documentation for offline use, and
 * having the documentation in one cleanly presented place means you can always
 * be sure it's the most recent available.
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * Terms & Conditions
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * This plugin is free for both non-commercial and commercial use. Please see
 * http://mvplugins.tordamian.com/terms-of-use for the full terms of use.
 */
TDDP_NoFastForward = {};
(function($) {
    //=============================================================================
    // Setting up parameters and internal funcs. All bound to TDDP_NoFastForward object
    //=============================================================================
    $._parameters               = $plugins.filter(function(p){return p.description.contains("id:TDDP_NoFastForward")})[0].parameters;
    $._disableGlobalMoveRouteFF = Boolean($._parameters['Disable for Move Routes'] === 'true' || false);
    $._disableGlobalTextFF      = Boolean($._parameters['Disable for Show Text']   === 'true' || false);
    /**
    * Disable text Fast Forwarding
    * @method disableTextFF
    */
    $.disableTextFF = function() {
        this._textFfDisabled = true;
    }
    /**
    * Enable text Fast Forwarding
    * @method enableTextFF
    */
    $.enableTextFF = function() {
        this._textFfDisabled = false;
    }
    $.disableNextTextFF = function() {
        this._nextTextFfDisabled = true;
    }
    $.resetDisableNextTextFF = function() {
        this._nextTextFfDisabled = false;
    }
    /**
    * Get if text Fast Forwarding is disabled
    * @method isTextFfDisabled
    */
    $.isTextFfDisabled = function() {
        if (this._nextTextFfDisabled || this._textFfDisabled || this._disableGlobalTextFF) return true;
        return false;
    }
    //=============================================================================
    // Game_Interpreter - register plugin commands
    //=============================================================================
    /**
    * @CHANGED Adding DisableTextFF command
    */
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args)
        command = command.toUpperCase();
        if (command === 'ENABLETEXTFF') $.enableTextFF();
        if (command === 'DISABLETEXTFF') $.disableTextFF();
        if (command === 'DISABLENEXTTEXTFF') $.disableNextTextFF();
    };
    //=============================================================================
    // Scene_Map
    //=============================================================================
    /**
    * @CHANGED Adding support for disabling move route fast forward
    */
    Scene_Map_prototype_isFastForward = Scene_Map.prototype.isFastForward;
    Scene_Map.prototype.isFastForward = function() {
        if ($._disableGlobalMoveRouteFF) return false;
        return Scene_Map_prototype_isFastForward.call(this);
    };
    //=============================================================================
    // Window_Message
    //=============================================================================
    /**
    * @CHANGED Extending to run resetDisableNextTextFF()
    */
    Window_Message_prototype_onEndOfText = Window_Message.prototype.onEndOfText;
    Window_Message.prototype.onEndOfText = function() {
        $.resetDisableNextTextFF(); // Re-enable local text FF
        Window_Message_prototype_onEndOfText.call(this);
    };

    /**
    * @CHANGED Supports disabling text fast forward
    */
    var Window_Message_prototype_updateShowFast = Window_Message.prototype.updateShowFast;
    Window_Message.prototype.updateShowFast = function() {
        //if ($.isTextFfDisabled()) return false;
        if(!ConfigManager.textSkip) {return false;}
        return Window_Message_prototype_updateShowFast.call(this);
    };
})(TDDP_NoFastForward);
