//=============================================================================
// Olivia Engine - Skip Cutscene - for RPG Maker MV version 1.6.1
// Olivia_SkipCutscene.js
//=============================================================================
 /*:
 * @plugindesc <SkipCutscene> for RPG Maker MV version 1.6.1.
 * @author Fallen Angel Olivia
 *
 * @help
 * This is a RPG Maker MV plugin that provides the functionality to skip ahead
 * in a cutscene. This is a quality of life addition for players that may have
 * played a certain scene already and would like to skip ahead. The player would
 * hold the cancel button (X on the keyboard or Right Click on the mouse) if the
 * ability to skip the cutscene is available. By holding it until the skip gauge
 * is full, the scene skips forward to the next available section.
 *
 * 
 *
 * -----------------
 * Plugin Parameters
 * -----------------
 *
 * Hold Duration: Duration in frames to hold Cancel button to skip a cutscene
 *
 * Filling Speed: Speed used while filling up the skip gauge
 *
 * Emptying Speed: Speed used while emptying out the skip gauge
 *
 * Skip Text: Text displayed for the skip gauge. You can use text codes here.
 *
 * Gauge Colors: Gauge colors used for the gradients. These use hex color codes.
 *
 * Gauge Position: X and Y positions for where the gauge would appear. You can
 * use 'auto' to have the plugin automatically calculate it for you, or you can
 * use JS code to determine the position yourself. Exact numbers are also fine.
 *
 * Fade Speed: How fast the skip gauge would fade out.
 *
 * 
 * 
 * ------------------------
 * Instructions: Label Tags
 * ------------------------
 * 
 * Not all scenes are skippable from the start. They need to be set up in a 
 * certain way for it to properly work. The setup involves Labels and require a
 * specific naming convention for the labels to allow skipping cutscenes.
 *
 * Label Tags:
 *
 * <Enable Skip>
 * - Once the scene has passed a label named <Enable Skip> the player will be
 * able to hold down the Cancel Button (X on the keyboard or Right Click on the
 * mouse) and skip forward to the next available <Skip Target> Label.
 *
 * <Disable Skip>
 * - If the scene has passed a label named <Disable Skip> then skipping the
 * cutscene will no longer become available for the player.
 *
 * <Skip Target>
 * - If the player decides to skip forward, then the screen will fade out. After
 * that, the scene will skip to the next available <Skip Target> label. You will
 * have to manually fade the screen back in afterwards.
 *
 * These labels cannot be used in tandem with parallel events. Parallel events
 * cannot have cutscene skipping capability.
 *
 *
 * 
 * --------
 * Examples
 * --------
 *
 * I highly recommend that you take a look at the sample project that could be
 * downloaded with this plugin on how to use it. It will teach you many core
 * basics on how to properly create your cutscene events to be usable with the
 * Skip Cutscene function.
 *
 *
 *
 * -------------------
 * W A R N I N G ! ! !
 * -------------------
 *
 * This plugin is made for RPG Maker MV versions 1.6.1 and below. If you update
 * RPG Maker MV past that and this plugin breaks, I am NOT responsible for it.
 *
 * ------------
 * Terms of Use
 * ------------
 * 
 * 1. These plugins may be used in free or commercial games.
 * 2. 'Fallen Angel Olivia' must be given credit in your games.
 * 3. You are allowed to edit the code.
 * 4. Do NOT change the filename, parameters, and information of the plugin.
 * 5. You are NOT allowed to redistribute these Plugins.
 * 6. You may NOT take code for your own released Plugins without credit.
 *
 * -------
 * Credits
 * -------
 *
 * If you are using this plugin, credit the following people:
 * 
 * - Fallen Angel Olivia
 *
 * @param 
 * @param 
 * @param ATTENTION!!!
 * @default READ THE HELP FILE
 * @param 
 * @param 
 *
 * @param Hold Duration
 * @type number
 * @min 1
 * @desc Duration in frames to hold Cancel button to skip a cutscene
 * @default 180
 *
 * @param
 *
 * @param Filling Speed
 * @type number
 * @min 1
 * @desc Speed used while filling up the skip gauge
 * @default 1
 *
 * @param Emptying Speed
 * @type number
 * @min 1
 * @desc Speed used while emptying out the skip gauge
 * @default 4
 *
 * @param
 *
 * @param Skip Text
 * @desc Text displayed for the skip gauge. You can use text codes here.
 * @default Hold \c[27]X\c[0] to skip cutscene
 *
 * @param
 * 
 * @param Gauge Color 1
 * @desc Gauge color used for the left half of the gauge gradient
 * This is a hex color code
 * @default #8781bd
 * 
 * @param Gauge Color 2
 * @desc Gauge color used for the right half of the gauge gradient
 * This is a hex color code
 * @default #bd8cbf
 *
 * @param Gauge Position X
 * @desc X position for the gauge.
 * Use 'auto' if you want the plugin to automatically calculate the position X. Otherwise, it will use code to calculate the position.
 * @default auto
 *
 * @param Gauge Position Y
 * @desc Y position for the gauge.
 * Use 'auto' if you want the plugin to automatically calculate the position Y. Otherwise, it will use code to calculate the position.
 * @default auto
 *
 * @param
 *
 * @param Fade Speed
 * @type number
 * @min 1
 * @desc How fast you wish for the skip gauge to fade out
 * @default 24
 * 
 *
 */
//=============================================================================

var Imported = Imported || {};
Imported.Olivia_SkipCutscene = true;

var Olivia = Olivia || {};

var parameters = $plugins.filter(function(p) { return p.description.contains('<SkipCutscene>') })[0].parameters;

Olivia.SkipCutscene = {
    holdDuration: Number(parameters['Hold Duration']),

    increaseSpeed: Number(parameters['Filling Speed']),
    decreaseSpeed: Number(parameters['Emptying Speed']),

    message: String(parameters['Skip Text']),

    gaugeColor1: String(parameters['Gauge Color 1']),
    gaugeColor2: String(parameters['Gauge Color 2']),
    gaugePositionX: String(parameters['Gauge Position X']),
    gaugePositionY: String(parameters['Gauge Position Y']),

    fadeSpeed: Number(parameters['Fade Speed']),
};

//-----------------------------------------------------------------------------
// Game_Interpreter
//
// The interpreter for running event commands.

Olivia.SkipCutscene.___Game_Interpreter_setup___ = Game_Interpreter.prototype.setup;
Game_Interpreter.prototype.setup = function(list, eventId) {
    if (!$gameParty.inBattle() && this._depth === 0) {
        if (!!eventId && !!$gameMap.event(eventId) && $gameMap.event(eventId)._trigger !== 4) {
            $gameTemp._canSkipCutscene = false;
            $gameTemp._skippingCutscene = false;
            SceneManager._scene._skipCutsceneDuration = 0;
        }
    }
    Olivia.SkipCutscene.___Game_Interpreter_setup___.call(this, list, eventId);
};

Olivia.SkipCutscene.___Game_Interpreter_terminate___ = Game_Interpreter.prototype.terminate;
Game_Interpreter.prototype.terminate = function() {
    if (!$gameParty.inBattle() && this._depth === 0) {
        if (!!this._eventId && !!$gameMap.event(this._eventId) && $gameMap.event(this._eventId)._trigger !== 4) {
            $gameTemp._canSkipCutscene = undefined;
            $gameTemp._skippingCutscene = undefined;
            SceneManager._scene._skipCutsceneDuration = 0;
        }
    }
    Olivia.SkipCutscene.___Game_Interpreter_terminate___.call(this);
};

Olivia.SkipCutscene.___Game_Interpreter_command118___ = Game_Interpreter.prototype.command118;
Game_Interpreter.prototype.command118 = function() {
    if (this._params[0].match(/<Enable Skip>/i)) {
        $gameTemp._canSkipCutscene = true;
        $gameTemp._skippingCutscene = false;
    } else if (this._params[0].match(/<Disable Skip>/i)) {
        $gameTemp._canSkipCutscene = false;
        $gameTemp._skippingCutscene = false;
    } else if (this._params[0].match(/<Skip Target>/i)) {
        $gameTemp._canSkipCutscene = false;
        $gameTemp._skippingCutscene = false;
    }
    return Olivia.SkipCutscene.___Game_Interpreter_command118___.call(this);
};

Game_Interpreter.prototype.processSkipCutscene = function() {
    var interpreter = this.getLatestInterpreter();
    if (!!interpreter._list) {
        for (var i = interpreter._index; i < interpreter._list.length; i++) {
            var command = interpreter._list[i];
            if (command.code === 118 && command.parameters[0].match(/<Skip Target>/i)) {
                interpreter.stopSkipCutscene(interpreter, i, true);
                return;
            }
        }
    }
    if (interpreter === this) {
        interpreter.stopSkipCutscene(interpreter, this._list.length - 1, false);
    } else {
        interpreter.terminate();
        this.processSkipCutscene();
    }
};

Game_Interpreter.prototype.getLatestInterpreter = function() {
    var interpreter = this;
    while (!!interpreter._childInterpreter && !!interpreter._childInterpreter._list) {
        interpreter = interpreter._childInterpreter;
    }
    return interpreter;
};

Game_Interpreter.prototype.stopSkipCutscene = function(interpreter, targetLine, foundTarget) {
    interpreter._waitMode = '';
    interpreter.wait(interpreter.fadeSpeed());
    $gameScreen.startFadeOut(interpreter.fadeSpeed());
    if (interpreter === this) {
        $gameTemp._canSkipCutscene = false;
        $gameTemp._skippingCutscene = true;
    }
    SceneManager._scene._skipCutsceneDuration = 0;
    interpreter.jumpTo(targetLine);
    if (!foundTarget) {
        $gameScreen.startFadeIn(interpreter.fadeSpeed());
        if ($gameTemp.isPlaytest()) {
            alert('You do not have a <Skip Target> Label Tag for this event!\nAdd the <Skip Target> Label to your event to make Skip Cutscene work properly.');
        }
    }
};

//-----------------------------------------------------------------------------
// Window_Message
//
// The window for displaying text messages.

Olivia.SkipCutscene.___Scene_Map_updateMainMultiply___ = Scene_Map.prototype.updateMainMultiply;
Scene_Map.prototype.updateMainMultiply = function() {
    Olivia.SkipCutscene.___Scene_Map_updateMainMultiply___.call(this);
    if (!!$gameTemp._canSkipCutscene) {
        this.updateSkipCutscene();
    }
};

Scene_Map.prototype.isSkipCutscene = function() {
    return ($gameMap.isEventRunning() && !SceneManager.isSceneChanging() && Input.isLongPressed('cancel'));
};

Scene_Map.prototype.updateSkipCutscene = function() {
    this._skipCutsceneDuration = this._skipCutsceneDuration || 0;
    if (this.isSkipCutscene()) {
        this._skipCutsceneDuration += Olivia.SkipCutscene.increaseSpeed;
        if (this._skipCutsceneDuration >= Olivia.SkipCutscene.holdDuration) {
            this.processSkipCutscene();
        }
    } else {
        this._skipCutsceneDuration = Math.max(0, this._skipCutsceneDuration - Olivia.SkipCutscene.decreaseSpeed);
    }
};

Scene_Map.prototype.processSkipCutscene = function() {
    // Switch check to see if skip cutscene was processed.
    $gameSwitches.setValue(40, true);
    $gameMap._interpreter.processSkipCutscene();
};

Olivia.SkipCutscene.___Scene_Map_createAllWindows___ = Scene_Map.prototype.createAllWindows;
Scene_Map.prototype.createAllWindows = function() {
    Olivia.SkipCutscene.___Scene_Map_createAllWindows___.call(this);
    this._skipCutsceneWindow = new Window_SkipCutscene();
    this.addChild(this._skipCutsceneWindow);
};

//-----------------------------------------------------------------------------
// Window_Selectable
//
// The window for displaying text messages.

Olivia.SkipCutscene.___Window_Selectable_isOkTriggered___ = Window_Selectable.prototype.isOkTriggered;
Window_Selectable.prototype.isOkTriggered = function() {
    if (!!$gameTemp._skippingCutscene) {
        return true;
    } else {
        return Olivia.SkipCutscene.___Window_Selectable_isOkTriggered___.call(this);
    }
};

//-----------------------------------------------------------------------------
// Window_Message
//
// The window for displaying text messages.

Olivia.SkipCutscene.___Window_Message_isTriggered___ = Window_Message.prototype.isTriggered;
Window_Message.prototype.isTriggered = function() {
    if (!!$gameTemp._skippingCutscene) {
        return true;
    } else if (!!$gameTemp._canSkipCutscene && Input.isRepeated('cancel')) {
        return false;
    } else {
        return Olivia.SkipCutscene.___Window_Message_isTriggered___.call(this);
    }
};

//-----------------------------------------------------------------------------
// Window_ChoiceList
//
// The window used for the event command [Show Choices].

Olivia.SkipCutscene.___Window_ChoiceList_isOkTriggered___ = Window_ChoiceList.prototype.isOkTriggered;
Window_ChoiceList.prototype.isOkTriggered = function() {
    if (!!$gameTemp._skippingCutscene) {
        return true;
    } else {
        return Olivia.SkipCutscene.___Window_ChoiceList_isOkTriggered___.call(this);
    }
};

//-----------------------------------------------------------------------------
// Window_NumberInput
//
// The window used for the event command [Input Number].

Olivia.SkipCutscene.___Window_NumberInput_isOkTriggered___ = Window_NumberInput.prototype.isOkTriggered;
Window_NumberInput.prototype.isOkTriggered = function() {
    if (!!$gameTemp._skippingCutscene) {
        return true;
    } else {
        return Olivia.SkipCutscene.___Window_NumberInput_isOkTriggered___.call(this);
    }
};

//-----------------------------------------------------------------------------
// Window_SkipCutscene
//
// The window for displaying the description of the selected item.

function Window_SkipCutscene() {
    this.initialize.apply(this, arguments);
}

Window_SkipCutscene.prototype = Object.create(Window_Base.prototype);
Window_SkipCutscene.prototype.constructor = Window_SkipCutscene;

Window_SkipCutscene.prototype.initialize = function() {
    var width = Graphics.boxWidth;
    var height = this.fittingHeight(1);
    Window_Base.prototype.initialize.call(this, this.textPadding() * 4, 0, width, height);
    if (Olivia.SkipCutscene.gaugePositionY === 'auto') {
        this.y = Graphics.boxHeight - 240;
    } else {
        this.y = eval(Olivia.SkipCutscene.gaugePositionY);
    }
    this.opacity = 0;
    this.contentsOpacity = 0;
    this.refresh();
};

Window_SkipCutscene.prototype.standardPadding = function() {
    return 0;
};

Window_SkipCutscene.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height);
};

Window_SkipCutscene.prototype.createChildSprite = function() {
    var width = this.textWidthEx(Olivia.SkipCutscene.message);
    width += this.textPadding() * 4;
    var height = this.lineHeight();
    this._gaugeSpriteRate = new Sprite();
    this._gaugeSpriteRate.bitmap = new Bitmap(width - 2, height - 2);
    var color1 = Olivia.SkipCutscene.gaugeColor1;
    var color2 = Olivia.SkipCutscene.gaugeColor2;
    this._gaugeSpriteRate.bitmap.gradientFillRect(0, 0, width - 2, height - 2, color1, color2);
    this._gaugeSpriteRate.x = 1;
    this._gaugeSpriteRate.y = 1;
    this.addChildToBack(this._gaugeSpriteRate);
    this._gaugeSpriteBack = new Sprite();
    this._gaugeSpriteBack.bitmap = new Bitmap(width, height);
    this._gaugeSpriteBack.bitmap.fillRect(0, 0, width, height, this.gaugeBackColor());
    this.addChildToBack(this._gaugeSpriteBack);
    if (Olivia.SkipCutscene.gaugePositionX === 'auto') {
        this.x = Math.round((Graphics.boxWidth - width) / 2);
    } else {
        this.x = eval(Olivia.SkipCutscene.gaugePositionX);
    }
};

Window_SkipCutscene.prototype.refresh = function() {
    this.drawTextEx(Olivia.SkipCutscene.message, this.textPadding() * 2, 0);
    this.createChildSprite();
};

Window_SkipCutscene.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    this.updateOpacity();
    if (!!this._gaugeSpriteRate) {
        this.updateGaugeSprites();
    }
};

Window_SkipCutscene.prototype.updateOpacity = function() {
    if (!!$gameTemp._canSkipCutscene && !!SceneManager._scene._skipCutsceneDuration) {
        var change = Olivia.SkipCutscene.fadeSpeed;
    } else {
        var change = -1 * Olivia.SkipCutscene.fadeSpeed;
    }
    this.contentsOpacity += change;
};

Window_SkipCutscene.prototype.updateGaugeSprites = function() {
    this._gaugeSpriteRate.opacity = this.contentsOpacity;
    this._gaugeSpriteBack.opacity = this.contentsOpacity;
    if (!!$gameTemp._skippingCutscene) {
        var rate = 1.0;
    } else {
        var rate = SceneManager._scene._skipCutsceneDuration / Olivia.SkipCutscene.holdDuration;
    }
    var width = rate * this._gaugeSpriteRate.bitmap.width;
    this._gaugeSpriteRate.setFrame(0, 0, width, this._gaugeSpriteRate.height);
};



















