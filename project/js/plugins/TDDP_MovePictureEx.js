var Imported = Imported || {};
Imported.TDDP_MovePictureEx = "1.0.1";

/*:
@author Tor Damian Design / Galenmereth
@plugindesc 1.0.1 Plugin Command to use variables and relative values with Move Picture
@help
How it works
------------------------------------------------------------------------------
This plugin allows you to use variables for the values of Move Picture events,
as well as enabling you to omit properties (like x, opacity, and width) that
you do not want to change. It also allows you to use relative modifiers "+"
and "-" in your values, so you can for example make a picture move 100 pixels
from where it currently is, without having to keep track.

Integration with TDDP_AnimationCurves.

General usage
------------------------------------------------------------------------------
The Move Picture plugin command looks like this:

MovePicture <id> <property:value>

The id of the picture must come first. After that, the properties themselves
can be entered in any order you wish. Here's an example:

MovePicture 1 x:100 opacity:125 blendMode:Multiply duration:10

Any omitted properties default to their current values.
Values can also be relative, for example:

MovePicture 1 x:+150

This would move the picture 150 pixels to the right of where it currently is.
Likewise, negative values are supported as well:

MovePicture 99 y:-100 opacity:+25 width:-50

You can also use variables as values. This is done by simply typing a "v" and
the variable id, like so:

MovePicture 1 x:v1 y:v2

Blend Mode, Origin and Wait
------------------------------------------------------------------------------
For these properties, you do not have to use numbers as values. Instead, you
can use words as in the editor.

Property   | Possible values
- - - - - -|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  - -
Blend Mode | "normal", "additive", "multiply", "screen"
Origin     | "top_left", "center"
Wait       | true, false

Wait can also be written without ":<value>", as simply "wait". This makes it
true. Example:

MovePicture 1 y:500 wait

The alues will be lower-cased internally, so feel free to write them however
you want.

List of properties
------------------------------------------------------------------------------
Property in editor | Property name / shorthand | Default value if omitted
- - - - - - - - - -|- - - - - - - - - - - - - -|- - - - - - - - - - - - - - - 
Origin             | origin / or               | Current value
X                  | x                         | Current value
Y                  | y                         | Current value
Width              | width / w / scaleX        | Current value
Height             | height / h / scaleY       | Current value
Blend Mode         | blendMode / b             | Current value
Opacity            | opacity / op              | Current value
Wait               | wait                      | False
Duration           | duration / d              | 60
- - - - - - - - - -|- - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
Curve              | curve / c                 | Linear

Shorthands are shorter property names you can use if you find typing the whole
property name cumbersome.

NOTE: The "curve" property requires TDDP_AnimationCurves plugin.

TDDP_AnimationCurves integration
------------------------------------------------------------------------------
If you have the TDDP_AnimationCurves plugins installed, this plugin's
MovePicture Plugin Command works with it just like the built-in Move Picture
event command does.

You can also use the animation curves functions with this plugin directly
instead of having to make a separate Plugin Command entry in advance for it.
Simply type curve:<CurveFunction> and it'll work, like so:

MovePicture 1 curve:QuadInOut x: 200 y:100

However, if you want to have different curve for different properties, you'll
need separate Plugin Commands using TDDP_AnimationCurves' Plugin Command. This
is to avoid this plugin's Plugin Commands becoming very long and cumbersome to
read.

You can download TDDP_AnimationCurves here:
https://forums.rpgmakerweb.com/index.php?threads/animation-curves.108388/

Changelog
------------------------------------------------------------------------------
Date       | Version | Description
- - - - - -|- - - - -|- - - - - - - - - - - - - - - - - - - - - - - - - - - -  
03/05/2019 | 1.0.1   | Fix issue with unscoped origin var causing crashes with
           |         | my other plugins.

License
------------------------------------------------------------------------------
In short: Completely free, including for commercial use. Please consider
donating for further development of plugins and other material if you find
this plugin useful. See https://mvplugins.tordamian.com

MIT License

Copyright (c) 2019 Tor Damian Design

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

@param movePictureCommand
@text Move Picture command key
@desc If you want to use a shorter Plugin Command key for, set it here. Default is "MovePicture"
@type string
@default MovePicture
*/

var TDDP_MovePictureEx = {};
(function($) {
	"use strict";
	//=============================================================================
	// Setting up plugin parameters
	//=============================================================================
	var parameters = PluginManager.parameters("TDDP_MovePictureEx");
	//=============================================================================
	// Set up general variables
	//=============================================================================
	var origin = {};
	//=============================================================================
	// Game_Interpreter - register plugin command
	//=============================================================================
	origin.Game_Interpreter = {};
	origin.Game_Interpreter.prototype_pluginCommand = Game_Interpreter.prototype.pluginCommand;

	/**
	 * @param {string} command
	 * @param {string[]} args
	 */
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		origin.Game_Interpreter.prototype_pluginCommand.call(this, command, args);

		if (command === parameters.movePictureCommand) _handleCommand(this, _movePicture, args);
	}
	//=============================================================================
	// Private methods
	//=============================================================================
	var _relativeProperties = ['x', 'y', 'scaleX', 'scaleY', 'opacity'];

	/**
	 * @typedef {Object} MovePictureParams
	 * @property {number} id The Picture ID
	 * @property {number} x
	 * @property {number} y
	 * @property {number} opacity
	 * @property {number} scaleX
	 * @property {number} scaleY
	 * @property {number} blendMode
	 * @property {number} origin
	 * @property {Boolean} wait
	 */

	/**
	 * @callback CommandHandler
	 * @param {Game_Interpreter} interpreter
	 * @param {MovePictureParams} p 
	 */

	/**
	 * @param {Game_Interpreter} interpreter 
	 * @param {CommandHandler} callback 
	 * @param {string[]} args 
	 */
	function _handleCommand(interpreter, callback, args) {
		var id = args.shift();
		if (id[0] == "v") {
			id = $gameVariables.value(Number(id.slice(1)));
		}
		else {
			id = Number(id);
		}
		
		var picture = $gameScreen.picture(id);

		// Picture not added, ignore command
		if (!picture) return;

		var params = {
			id: id
		};

		args.forEach(function(str) {
			var param = _parseCommandParam(str);

			if (param) {
				if (param.value[0] == "v") param.value = $gameVariables.value(Number(param.value.slice(1)));
				params[param.key] = param.value;
			}
		});

		// Check alternative syntax before considering curve animations
		params.scaleX = params.w || params.width || params.scaleX;
		params.scaleY = params.h || params.height || params.scaleY;
		params.opacity = params.op || params.opacity;
		params.curve = params.c || params.curve;

		if (params.curve && Imported.TDDP_AnimationCurves) {
			TDDP_AnimationCurves.setEasingFunction(params.curve, 'general');
		}

		// Fallback to alternative syntax or defaults if undefined
		params.x = params.x || picture.x();
		params.y = params.y || picture.y();
		params.scaleX = params.scaleX || picture.scaleX();
		params.scaleY = params.scaleY || picture.scaleY();
		params.opacity = params.opacity || picture.opacity();
		params.duration = Number(params.d || params.duration || 60);
		params.wait = params.wait || false;
		params.origin = params.or || params.origin || picture.origin();
		params.blendMode = params.b || params.blendMode || picture.blendMode();

		// Resolve relative property values
		_relativeProperties.forEach(function(prop) {
			if (params[prop][0] == '+') return params[prop] = picture[prop]() + Number(params[prop].slice(1));
			if (params[prop][0] == '-') return params[prop] = picture[prop]() - Number(params[prop].slice(1));
			params[prop] = Number(params[prop]);
		})

		// Convert blend mode to integer value if string
		if (typeof params.blendMode == "string") params.blendMode = _convertBlendModeString(params.blendMode);

		// Convert origin to integer value if string
		if (typeof params.origin == "string") params.origin = _convertOriginString(params.origin);

		callback(interpreter, params);
	}

	var _blendModes = ["normal", "additive", "multiply", "screen"];
	/**
	 * 
	 * @param {string} str String to convert
	 */
	function _convertBlendModeString(str) {
		return _blendModes.indexOf(str.toLowerCase()) || 0;
	}

	var _originIndices = ["upper_left", "center"]
	/**
	 * 
	 * @param {string} str String to convert
	 */
	function _convertOriginString(str) {
		return _originIndices.indexOf(str.toLowerCase()) || 0;
	}

	/**
	 * @param {Game_Interpreter} interpreter 
	 * @param {MovePictureParams} p 
	 */
	function _movePicture(interpreter, p) {
		$gameScreen.movePicture(p.id, p.origin, p.x, p.y, p.scaleX,
								p.scaleY, p.opacity, p.blendMode, p.duration);

		if (p.wait) {
			interpreter.wait(p.duration);
		}
	}

	/**
	 * CommandParam type
	 * @typedef {Object} CommandParam
	 * @param {string} key
	 * @param {any} value
	 */
 
	/**
	 * @type {RegExp} _pluginCommandParseRegExp
	 */
	var _pluginCommandParseRegExp = /([A-zA-Z]+):(\S+)/;

	/**
	 * Parse Plugin Command arguments
	 * @param {string} str String to parse
	 * @return {(CommandParam|undefined)}
	 */
	function _parseCommandParam(str) {
		if (str == "wait") return {key: "wait", value: true};
		if (str.length > 0) var parsed = _pluginCommandParseRegExp.exec(str);

		if (parsed && parsed[1]) {
			return {
				key: parsed[1],
				value: parsed[2]
			}
		}
		else {
			return undefined;
		}
	}
})(TDDP_MovePictureEx);