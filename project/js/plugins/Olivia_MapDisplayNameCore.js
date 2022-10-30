//=============================================================================
// Olivia Engine - Map Display Name Core - for RPG Maker MV version 1.6.1
// Olivia_MapDisplayNameCore.js
//=============================================================================
 /*:
 * @plugindesc <MapDisplayNameCore> for RPG Maker MV version 1.6.1.
 * @author Fallen Angel Olivia
 *
 * @help
 * This is a RPG Maker MV plugin that lets you control Map Display Names.
 * They can now use text codes, have unique gradient colors, and can have
 * custom defined fade times and duration.
 *
 * -----------------
 * Plugin Parameters
 * -----------------
 *
 * Change the plugin parameters to adjust the way your map name windows look.
 * 
 * - Text Distance: The amount of distance between the edge of the gradient to
 * the text in pixels.
 *
 * - Window Height: This is the height of the window.
 *
 * - Y Position:
 * Starting Y: This is the Y coordinate for the map display window when it
 * starts fades in.
 * Middle Y: This is the Y coordinate for the map display window when it
 * finishes fading in.
 * Ending Y: This is the Y coordinate for the map display window when it
 * finishes fading out.
 *
 * - Fade:
 * Fade In Time: The number of frames to fade in the map display name.
 * MIddle Time: The number of frames to wait before fading out.
 * Fade Out Time: The number of frames to fade out the map display name.
 *
 * - Dim Color
 * Dim Color 1: This is the default dim color 1 used. Use values in order of
 * Red, Green, Blue, Alpha.
 * Dim Color 2: This is the default dim color 2 used. Use values in order of
 * Red, Green, Blue, Alpha.
 *
 * -----------------
 * Custom Dim Colors
 * -----------------
 *
 * You can use custom Dim Colors for special maps. Put these notetags into
 * the map's note box.
 *
 * <Dim Color 1: r, g, b, a>
 * <Dim Color 2: r, g, b, a>
 *
 * r = red (0-255)
 * g = green (0-255)
 * b = blue (0-255)
 * a = alpha (0-100)
 *
 * For example, a yellow Dim Color 1 notetag would look like this:
 *
 * <Dim Color 1: 255, 255, 0, 60>
 *
 * -----------------
 * Text Code Support
 * -----------------
 *
 * Text codes like \n[1] and \v[2] are supported for map names. You can now
 * put them inside of the map name to have them display the data shown with
 * the text codes used.
 *
 * For example, "\n[1] Town" will be displayed as Harold Town.
 *
 * -----------------
 * Override Map Name
 * -----------------
 *
 * If you want to override the next map name that will be displayed, then use
 * this Script Call event:
 *
 * var text = "Next Name Displayed";
 * $gameMap.overrideMapName(text);
 *
 * The next map you enter will have the map name displaying the string in the
 * text variable you put inside the Script Call Event. Then, it will clear
 * itself and the next map you enter will have its usual name again and will no
 * longer have an override map name.
 *
 * If you want to clear the override map name, then make a Script Call Event
 * with this code:
 *
 * $gameMap.clearOverrideMapName();
 *
 * This will clear the override map name that is currently stored and the next
 * map you enter will have the regular name instead.
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
 * @param Text Distance
 * @type number
 * @desc The amount of distance between the edge of the gradient to the text in pixels.
 * @default 80
 *
 * @param 
 *
 * @param Window Height
 * @type number
 * @desc This is the height of the window.
 * @default 36
 *
 * @param 
 *
 * @param Y Position
 * 
 * @param Starting Y
 * @parent Y Position
 * @type number
 * @desc This is the Y coordinate for the map display window when it starts fades in.
 * @default 18
 * 
 * @param Middle Y
 * @parent Y Position
 * @type number
 * @desc This is the Y coordinate for the map display window when it finishes fading in.
 * @default 48
 * 
 * @param Ending Y
 * @parent Y Position
 * @type number
 * @desc This is the Y coordinate for the map display window when it finishes fading out.
 * @default 78
 *
 * @param 
 *
 * @param Fade
 * 
 * @param Fade In Time
 * @parent Fade
 * @type number
 * @desc The number of frames to fade in the map display name.
 * @default 60
 * 
 * @param Middle Time
 * @parent Fade
 * @type number
 * @desc The number of frames to wait before fading out.
 * @default 60
 * 
 * @param Fade Out Time
 * @parent Fade
 * @type number
 * @desc The number of frames to fade out the map display name.
 * @default 60
 *
 * @param
 *
 * @param Dim Color
 * 
 * @param Dim Color 1
 * @parent Dim Color
 * @desc This is the default dim color 1 used. Use values in order of Red, Green, Blue, Alpha.
 * @default rgba(0, 0, 0, 0.6)
 * 
 * @param Dim Color 2
 * @parent Dim Color
 * @desc This is the default dim color 2 used. Use values in order of Red, Green, Blue, Alpha.
 * @default rgba(0, 0, 0, 0)
 *
 *
 */
//=============================================================================

var Imported = Imported || {};
Imported.Olivia_MapDisplayNameCore = true;

var Olivia = Olivia || {};
Olivia.MapDisplayNameCore = Olivia.MapDisplayNameCore || {};

var parameters = $plugins.filter(function(p) { return p.description.contains('<MapDisplayNameCore>') })[0].parameters;

Olivia.MapDisplayNameCore.TextDistance = Number(parameters['Text Distance'] || 80);

Olivia.MapDisplayNameCore.WindowHeight = Number(parameters['Window Height'] || 36);

Olivia.MapDisplayNameCore.YPosition = {
  Starting: Number(parameters['Starting Y'] || 0),
  Middle:   Number(parameters['Middle Y'] || 0),
  Ending:   Number(parameters['Ending Y'] || 0)
}

Olivia.MapDisplayNameCore.Fade = {
  In:     Number(parameters['Fade In Time'] || 1),
  Middle: Number(parameters['Middle Time'] || 1),
  Out:    Number(parameters['Fade Out Time'] || 1)
}

Olivia.MapDisplayNameCore.DimColor = {
  Color1: String(parameters['Dim Color 1'] || 'rgba(0, 0, 0, 0.6)'),
  Color2: String(parameters['Dim Color 2'] || 'rgba(0, 0, 0, 0)')
}

//-----------------------------------------------------------------------------
// Game_Map
//
// The game object class for a map. It contains scrolling and passage
// determination functions.

Game_Map.prototype.overrideMapName = function(text) {
    this.overrideDisplayName(text);
};

Game_Map.prototype.overrideDisplayName = function(text) {
    this._overrideDisplayName = text;
};

Game_Map.prototype.clearOverrideMapName = function() {
    this.clearOverrideDisplayName();
};

Game_Map.prototype.clearOverrideDisplayName = function() {
    this._overrideDisplayName = undefined;
};

Game_Map.prototype.displayName = function() {
    if (this._overrideDisplayName) {
        return this._overrideDisplayName;
    } else {
        return $dataMap.displayName;
    }
};

Game_Map.prototype.displayNameDimColor1 = function() {
    if ($dataMap.note.match(/<DIM COLOR 1:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        var color = 'rgba(';
        color += parseInt(array[0]).clamp(0, 255) + ',';
        color += parseInt(array[1]).clamp(0, 255) + ',';
        color += parseInt(array[2]).clamp(0, 255) + ',';
        color += parseFloat(array[3] * 0.01).clamp(0, 1);
        return color + ')';
    } else {
        return Olivia.MapDisplayNameCore.DimColor.Color1;
    }
};

Game_Map.prototype.displayNameDimColor2 = function() {
    if ($dataMap.note.match(/<DIM COLOR 2:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        var color = 'rgba(';
        color += parseInt(array[0]).clamp(0, 255) + ',';
        color += parseInt(array[1]).clamp(0, 255) + ',';
        color += parseInt(array[2]).clamp(0, 255) + ',';
        color += parseFloat(array[3] * 0.01).clamp(0, 1);
        return color + ')';
    } else {
        return Olivia.MapDisplayNameCore.DimColor.Color2;
    }
};

//-----------------------------------------------------------------------------
// Window_MapName
//
// The window for displaying the map name on the map screen.

Window_MapName.prototype.initialize = function() {
    var x = 0;
    var y = Olivia.MapDisplayNameCore.YPosition.Starting;
    var width = this.windowWidth();
    var height = this.windowHeight();
    this.setupFadeRate();
    this.setupDisplayName();
    Window_Base.prototype.initialize.call(this, x, y, width, height);
    this._step = 'Fade In';
    this.opacity = 0;
    this.contentsOpacity = 0;
    this._showCount = 0;
    this.refresh();
};

Window_MapName.prototype.windowWidth = function() {
    return Graphics.boxWidth;
};

Window_MapName.prototype.windowHeight = function() {
    return Olivia.MapDisplayNameCore.WindowHeight;
};

Window_MapName.prototype.standardPadding = function() {
    return 0;
};

Window_MapName.prototype.setupFadeRate = function() {
    this._fadeInRate = Math.ceil(255 / Olivia.MapDisplayNameCore.Fade.In);
    this._fadeOutRate = Math.ceil(255 / Olivia.MapDisplayNameCore.Fade.Out);
};

Window_MapName.prototype.setupDisplayName = function() {
    this._text = $gameMap.displayName();
    $gameMap.clearOverrideDisplayName();
};

Window_MapName.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (this.isOpen() && this._showCount > 0 && $gameMap.isNameDisplayEnabled()) {
        this.updateStep();
    } else {
        this.updateFadeOut();
    }
};

Window_MapName.prototype.updateStep = function() {
    this._showCount--;
    var d = this._showCount;
    if (this._step === 'Fade In') {
        this.updateFadeIn();
        var targetY = Olivia.MapDisplayNameCore.YPosition.Middle;
        if (this._showCount <= 0) {
            this._showCount = Olivia.MapDisplayNameCore.Fade.Middle;
            this._step = 'Fade Middle';
        }
    } else if (this._step === 'Fade Middle') {
        this.contentsOpacity = 255;
        var targetY = Olivia.MapDisplayNameCore.YPosition.Middle;
        if (this._showCount <= 0) {
            this._showCount = Olivia.MapDisplayNameCore.Fade.Out;
            this._step = 'Fade Out';
        }
    } else {
        this.updateFadeOut();
        var targetY = Olivia.MapDisplayNameCore.YPosition.Ending;
        if (this._showCount <= 0) {
            this.close();
        }
    }
    if (d > 0) {
        this.y = (this.y * (d - 1) + targetY) / d;
    }
};

Window_MapName.prototype.updateFadeIn = function() {
    this.contentsOpacity += this._fadeInRate;
};

Window_MapName.prototype.updateFadeOut = function() {
    this.contentsOpacity -= this._fadeOutRate;
};

Window_MapName.prototype.open = function() {
    this._step = 'Fade In';
    this.refresh();
    this._showCount = Olivia.MapDisplayNameCore.Fade.In;
};

Window_MapName.prototype.refresh = function() {
    this.contents.clear();
    var text = this._text;
    if (text) {
        var width = this.textWidthEx(text);
        var distance = Olivia.MapDisplayNameCore.TextDistance;
        width += distance * 2;
        this.drawBackground(0, 0, width, this.windowHeight());
        this.drawTextEx(text, distance, 0);
    }
};

Window_MapName.prototype.dimColor1 = function() {
    return $gameMap.displayNameDimColor1();
};

Window_MapName.prototype.dimColor2 = function() {
    return $gameMap.displayNameDimColor2();
};

Window_MapName.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height);
};
































