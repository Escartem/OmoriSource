var Imported = Imported || {};
Imported.TDDP_AnimationCurves = "1.0.3";

/*:
@author Tor Damian Design / Galenmereth
@plugindesc 1.0.3b Apply animation curves (easing functions) to Move Picture commands using simple Plugin Commands
@help
How it works
------------------------------------------------------------------------------
This plugin allows you to set animation curves (so-called easing functions)
to be used with Move Picture and Tint Picture events.

Demo mode
------------------------------------------------------------------------------
When playtesting your game, you can hit the demo key (default F11) to show
a visual representation of all the supported animation curves and their names.

If you hover over these with your mouse an animation plays, showing how the
curve affects a red ball's Y axis movement

General use
------------------------------------------------------------------------------
The Plugin Commands must be placed *before* the Move Picture or Tint Picture
events that they are to affect. They do not have to be placed within the same
event window, however, so you can put them in Common Events if you wish.

Once a Move Picture or Tint Picture event is fired off, the curves you
specified using the Plugin Commands are reset to use MV's default until you
add new Plugin Command entries.

Use the following Plugin Command syntax:
AnimationCurve <CurveFunction> <Property(optional)>

Example:
AnimationCurve QuadOut x

See the bottom of this help text for all available animation curves.

# Set curve for all properties
If you omit the property at the end in the Plugin Command (the x in the above
example), then the plugin will use the animation curve for all properties: x,
y, scaleX, scaleY, and opacity.

# Linear is the default fallback
When you do include a property, but have not added any Plugin Command entry
without a property, then all other properties are animated using linear
interpolation, which is MV's default.

# Different curves for different properties
This can be done by adding multiple Plugin Commands with an animation curve
for individual properties.

For example:
AnimationCurve ElasticInOut x
AnimationCurve QuadOut y
AnimationCurve CubicInOut opacity

If the above three PluginCommands are placed before a Move Picture event, then
the x, y and opacity properties are animated with their respective curves,
whilst the remainder (scaleX, scaleY) are animated with the default linear
interpolation.

Move Picture specific properties
------------------------------------------------------------------------------
The following properties are available for Move Picture events:

x, y, scaleX, scaleY, and opacity

scaleX corresponds to the "Width" property in the Move Picture event window,
and scaleY corresponds to the "Height" property.

Tint Picture specific properties
------------------------------------------------------------------------------
The following properties are available for Tint Picture events:

red, green, blue, gray

These correspond with the color sliders in the Tint Picture event window.

Supported animation curve functions
------------------------------------------------------------------------------
QuadIn      QuadOut      QuadInOut
CubicIn     CubicOut     CubicInOut
QuartIn     QuartOut     QuartInOut
QuintIn     QuintOut     QuintInOut
SineIn      SineOut      SineInOut
ExpoIn      ExpoOut      ExpoInOut
CircIn      CircOut      CircInOut
ElasticIn   ElasticOut   ElasticInOut
BackIn      BackOut      BackInOut
BounceIn    BounceOut    BounceInOut

Linear (MV default)

Key codes
------------------------------------------------------------------------------
Visit this URL for a complete overview:
https://keycode.info/

Some common key codes:
F10: 121
F11: 122 (default)
F12: 123

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

@param Demo hotkey
@desc Key code for the hotkey used to display ingame curve demo overlay. See help for codes. Default 122 = F11 key
@type number
@default 122

@param Plugin Command key
@desc The plugin's "key" to use in Plugin Commands. You can customize this if you want to type less, or have a conflict
@type string
@default AnimationCurve
*/

/**
 * @callback EasingFunction
 * @param {number} t The current time
 * @param {number} b The beginning value
 * @param {number} c The change in value (target value - beginning value)
 * @param {number} d Duration
 */

/**
 * Wrapper object for all globally available properties of this plugin
 * @namespace
 */
var TDDP_AnimationCurves = {
	/** 
	 * @property {Object} easingFunctions The available easing functions. Can be extended
	 */
	easingFunctions: {
		// Easing unctions below from open source reference by McGinley Smith
		// https://github.com/danro/jquery-easing/blob/master/jquery.easing.js

		/**
		 * @type {EasingFunction}
		 */
		QuadIn: function(t, b, c, d) {
			return c*(t/=d)*t + b;
		},
		/**
		 * @type {EasingFunction}
		 */
		QuadOut: function(t, b, c, d) {
			return -c *(t/=d)*(t-2) + b;
		},
		/**
		 * @type {EasingFunction}
		 */
		QuadInOut: function(t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t + b;
			return -c/2 * ((--t)*(t-2) - 1) + b;
		},
		/**
		 * @type {EasingFunction}
		 */
		CubicIn: function(t, b, c, d) {
			return c*(t/=d)*t*t + b;
		},
		/**
		 * @type {EasingFunction}
		 */
		CubicOut: function(t, b, c, d) {
			return c*((t=t/d-1)*t*t + 1) + b;
		},
		/**
		 * @type {EasingFunction}
		 */
		CubicInOut: function(t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t*t + b;
			return c/2*((t-=2)*t*t + 2) + b;
		},
		/**
		 * @type {EasingFunction}
		 */
		QuartIn: function(t, b, c, d) {
			return c*(t/=d)*t*t*t + b;
		},
		/**
		 * @type {EasingFunction}
		 */
		QuartOut: function(t, b, c, d) {
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		},
		/**
		 * @type {EasingFunction}
		 */
		QuartInOut: function(t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
			return -c/2 * ((t-=2)*t*t*t - 2) + b;
		},
		/**
		 * @type {EasingFunction}
		 */
		QuintIn: function(t, b, c, d) {
			return c*(t/=d)*t*t*t*t + b;
		},
		/**
		 * @type {EasingFunction}
		 */
		QuintOut: function(t, b, c, d) {
			return c*((t=t/d-1)*t*t*t*t + 1) + b;
		},
		/**
		 * @type {EasingFunction}
		 */
		QuintInOut: function(t, b, c, d) {
			if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
			return c/2*((t-=2)*t*t*t*t + 2) + b;
		},
		/**
		 * @type {EasingFunction}
		 */
		SineIn: function(t, b, c, d) {
			return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
		},
		/**
		 * @type {EasingFunction}
		 */
		SineOut: function(t, b, c, d) {
			return c * Math.sin(t/d * (Math.PI/2)) + b;
		},
		/**
		 * @type {EasingFunction}
		 */
		SineInOut: function(t, b, c, d) {
			return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
		},
		/**
		 * @type {EasingFunction}
		 */
		ExpoIn: function(t, b, c, d) {
			return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
		},
		/**
		 * @type {EasingFunction}
		 */
		ExpoOut: function(t, b, c, d) {
			return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
		},
		/**
		 * @type {EasingFunction}
		 */
		ExpoInOut: function(t, b, c, d) {
			if (t==0) return b;
			if (t==d) return b+c;
			if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
			return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
		},
		/**
		 * @type {EasingFunction}
		 */
		CircIn: function(t, b, c, d) {
			return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
		},
		/**
		 * @type {EasingFunction}
		 */
		CircOut: function(t, b, c, d) {
			return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
		},
		/**
		 * @type {EasingFunction}
		 */
		CircInOut: function(t, b, c, d) {
			if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
			return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
		},
		/**
		 * @type {EasingFunction}
		 */
		ElasticIn: function(t, b, c, d) {
			var s=1.70158;var p=0;var a=c;
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		},
		/**
		 * @type {EasingFunction}
		 */
		ElasticOut: function(t, b, c, d) {
			var s=1.70158;var p=0;var a=c;
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
		},
		/**
		 * @type {EasingFunction}
		 */
		ElasticInOut: function(t, b, c, d) {
			var s=1.70158;var p=0;var a=c;
			if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
		},
		/**
		 * @type {EasingFunction}
		 */
		BackIn: function(t, b, c, d) {
			var s = 1.70158;
			return c*(t/=d)*t*((s+1)*t - s) + b;
		},
		/**
		 * @type {EasingFunction}
		 */
		BackOut: function(t, b, c, d) {
			var s = 1.70158;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		},
		/**
		 * @type {EasingFunction}
		 */
		BackInOut: function(t, b, c, d) {
			var s = 1.70158; 
			if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
			return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
		},
		/**
		 * @type {EasingFunction}
		 */
		BounceIn: function(t, b, c, d) {
			return c - TDDP_AnimationCurves.easingFunctions.BounceOut(d-t, 0, c, d) + b;
		},
		/**
		 * @type {EasingFunction}
		 */
		BounceOut: function(t, b, c, d) {
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
		},
		/**
		 * @type {EasingFunction}
		 */
		BounceInOut: function(t, b, c, d) {
			if (t < d/2) return TDDP_AnimationCurves.easingFunctions.BounceIn(t*2, 0, c, d) * .5 + b;
			return TDDP_AnimationCurves.easingFunctions.BounceOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
		},
		/**
		 * @type {EasingFunction}
		 */
		Linear: function(t, b, c, d) {
			return c * (t/d) + b;
		}
	},
	
	/**
	 * @type {Object} The easingFunctions to use for the next call to Move Picture, if any
	 */
	nextEasingFunctions: undefined,

	/**
	 * @property {Function} origin Store of the original overwritten methods
	 * @returns {object}
	 */
	origin: undefined,

	/**
	 * @function setEasingFunction
	 * @param {EasingFunction} easingFunction The animation easingFunction function to use. @see TDDP_AnimationCurves.easingFunctions
 	 * @param {string} [property='general'] The property to tie the animation curve to
	 */
	setEasingFunction: function(easingFunction, property) {},

	/**
	 * Toggle showing demo and testing overlay ingame
	 * @function demo
	 */
	demo: function() {}
};

(function($) {
	//=============================================================================
	// Setting up plugin parameters
	//=============================================================================
	var parameters = $plugins.filter(function(p){return p.name == "TDDP_AnimationCurves"})[0].parameters;
	var demoHotkey = Number(parameters['Demo hotkey']);
	var pluginCommand = String(parameters['Plugin Command key']);

	//=============================================================================
	// Publicly accessible methods and variables (within namespace)
	//=============================================================================
	/**
	 * The easing function to use for the next Move Picture or MoveTint event
	 * @const {{Object.<string, EasingFunction>}}
	 * @example
	 * nextEasingFunctions['x'] => EasingFunction
	 */
	var nextEasingFunctions = undefined;
	$.nextEasingFunctions = function() { return nextEasingFunctions }

	/**
	 * Store of original overwritten methods
	 * @const {Object}
	 */
	var origin = {};
	$.origin = function() { return origin };

	/**
	 * @function setEasingFunction
	 * @param {EasingFunction|string} easingFunction The animation easingFunction to use. @see TDDP_AnimationCurves.easingFunctions
 	 * @param {string} [property='general'] The property to tie the animation curve to
	 */
	function setEasingFunction(easingFunction, property) {
		if (typeof easingFunction == 'string') {
			_validateEasingFunction(easingFunction);

			easingFunction = $.easingFunctions[easingFunction];
		}

		var property = property || 'general';

		_validateEasingProperty(property);

		_pushEasingFunction(property, easingFunction);
	};
	$.setEasingFunction = setEasingFunction;

	/**
	 * @const {PIXI.Application}
	 */
	var demoSurface = undefined;

	/**
	 * Toggle the ingame demo overlay
	 */
	function demo() {
		if (demoSurface) {
			document.body.removeChild(demoSurface.view);
			demoSurface = undefined;
			return;
		}
		_drawDemo();
	}
	$.demo = demo;

	//=============================================================================
	// Private internal functions
	//=============================================================================
	/**
	 * Validate an easing function. Throws an error if it doesn't match any
	 * key found. @see TDDP_AnimationCurves.easingFunctions
	 * @param {EasingFunction} easingFunction
	 */
	function _validateEasingFunction(easingFunction) {
		var valid = Object.keys($.easingFunctions).find(function(value){
			return value == easingFunction;
		}) !== undefined;

		if (!valid) throw new Error('TDDP_AnimationCurves | Invalid animation curve argument: "' + easingFunction + '". See plugin help for valid options.');
	}

	/**
	 * Whitelist of supported properties, to catch splelling ellols
	 * @type {string[]}
	 */
	var _propertyWhitelist = [
		'general',
		'x',
		'y',
		'scaleX',
		'scaleY',
		'opacity',
		'red',
		'blue',
		'green',
		'gray'
	]
	/**
	 * Validate an easing property using the _propertyWhitelist
	 * @param {string} easingProperty Property to validate
	 */
	function _validateEasingProperty(easingProperty) {
		var valid = _propertyWhitelist.indexOf(easingProperty) >= 0

		if (!valid) throw new Error('TDDP_AnimationCurves | Invalid target property: "' + easingProperty + '". See plugin help for valid options.');
	}

	/**
	 * Handle Plugin Command.
	 * Expects the following structure:
	 * args[0] = QuadOut - @see TDDP_AnimationCurves.easingFunctions
	 * args[1] = x, y, scaleX, scaleY, opacity - Default is 'general', meaning all
	 * @param {string[]} args
	 */
	function _handleCommand(args) {
		var easingFunction = args[0];

		if (easingFunction) {
			setEasingFunction(easingFunction, args[1]);
		}
	}

	/**
	 * @private
	 * @param {string} property 
	 * @param {EasingFunction} easingFunction 
	 */
	function _pushEasingFunction(property, easingFunction) {
		nextEasingFunctions = nextEasingFunctions || {};
		nextEasingFunctions[property] = easingFunction;
	}

	/**
	 * @callback EasingFunctionFactory
	 * @param {string} property The property to apply curve to
	 * @param {number} t Current time variable to pass on to EasingFunction
	 * @param {number} b Beginning value to pass on to EasingFunction
	 * @param {number} c The change in value to pass on to EasingFunction
	 * @param {number} d Duration to pass on to EasingFunction
	 */

	/**
	 * 
	 * @param {Object.<string, EasingFunction>} easingFuncs The map of EasingFunctions
	 * @param {string} property 
	 * @param {number} t Current time variable to pass on to EasingFunction
	 * @param {number} b Beginning value to pass on to EasingFunction
	 * @param {number} c The change in value to pass on to EasingFunction
	 * @param {number} d Duration to pass on to EasingFunction
	 */
	function _easingFunctionsFactory(easingFuncs, property, t, b, c, d) {
		var easingFunction = undefined;

		if (easingFuncs[property]) {
			easingFunction = easingFuncs[property];
		}
		else if (easingFuncs['general']) {
			easingFunction = easingFuncs['general'];
		}
		else {
			// Fall back to default 'Linear' EasingFunction if there's no general function defined. Linear is equal to MV's default.
			easingFunction = $.easingFunctions['Linear'];
		}

		return easingFunction(t, b, c, d);
	}

	/**
	 * Pluck the list of EasingFunctions, removing the list and wrapping them. @see _easingFunctionsFactory
	 * Resets nextEasingFunctions to undefined
	 * @return {(EasingFunctionFactory|undefined)}
	 */
	function _pluckEasingFunctions() {
		if (nextEasingFunctions) {
			var easingFunctions = _easingFunctionsFactory.bind(this, nextEasingFunctions);
	
			nextEasingFunctions = undefined;
			
			return easingFunctions;
		}
		else {
			return undefined;
		}
	}

	/**
	 * @callback ExecutableAnimFunction
	 * @param {number} time Current time
	 * @param {number} totalDuration
	 */

	/**
	 * Update movement of a Game_Picture instance using wrapped animation curve functions
	 * **this** is a *Game_Picture* instance
	 * @param {number} totalDuration
	 * @param {ExecutableAnimFunction[]} executableMoveFunctions
	 */
	var _updateMoveCurves = function(totalDuration, executableMoveFunctions) {
		if (this._duration < 0) return;
		
		var time = totalDuration - this._duration;

		executableMoveFunctions.forEach(function(func) {
			func(time, totalDuration);
		})

		this._duration--;
	}

	/**
	 * Update the tone of a Game_Picture instance using animation curve functions
	 * **this** is a *Game_Picture* instance
	 * @param {number} totalDuration 
	 * @param {ExecutableAnimFunction[]} executableTintFunctions
	 */
	var _updateToneCurves = function(totalDuration, executableTintFunctions) {
		if (this._toneDuration < 0) return;

		var time = totalDuration - this._toneDuration;

		executableTintFunctions.forEach(function(func) {
			func(time, totalDuration);
		})

		this._toneDuration--;
	}

	//=============================================================================
	// Game_Interpreter - register plugin command
	//=============================================================================
	origin.Game_Interpreter = {};
	origin.Game_Interpreter.pluginCommand = Game_Interpreter.prototype.pluginCommand;

	/**
	 * @param {string} command
	 * @param {string[]} args
	 */
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		origin.Game_Interpreter.pluginCommand.call(this, command, args);

		if (command === pluginCommand) _handleCommand(args);
	}

	//=============================================================================
	// Game_Picture - extend methods
	//=============================================================================
	origin.Game_Picture = {};

	/**
	 * List of overwritten or extended methods
	 */
	origin.Game_Picture.move = Game_Picture.prototype.move;
	origin.Game_Picture.tint = Game_Picture.prototype.tint;

	/**
	 * @param {number} originMode The picture ID origin - 0 = upper left, 1 = center
	 * @param {number} targetX
	 * @param {number} targetY
	 * @param {number} targetScaleX
	 * @param {number} targetScaleY
	 * @param {number} targetOpacity
	 * @param {number} blendMode
	 * @param {number} duration In frames
	 */
	Game_Picture.prototype.move = function(originMode, targetX, targetY, targetScaleX, targetScaleY, targetOpacity, blendMode, duration) {
		origin.Game_Picture.move.call(this, originMode, targetX, targetY, targetScaleX, targetScaleY, targetOpacity, blendMode, duration);

		var easingFunctions = _pluckEasingFunctions();

		/** @type {ExecutableAnimFunction[]} */
		var executableMoveFunctions = [];

		// Preconfiguring these anonymous functions means we avoid doing unnecessary if/else checks during each update steps.
		// This improves performance at the cost of an arguably negligible memory footprint.

		if (targetX != this._x) executableMoveFunctions.push(function(x, time, totalDuration) {
			this._x = easingFunctions('x', time, x, targetX - x, totalDuration);
		}.bind(this, this._x))

		if (targetY != this._y) executableMoveFunctions.push(function(y, time, totalDuration) {
			this._y = easingFunctions('y', time, y, targetY - y, totalDuration);
		}.bind(this, this._y))

		if (targetScaleX != this._scaleX) executableMoveFunctions.push(function(scaleX, time, totalDuration) {
			this._scaleX = easingFunctions('scaleX', time, scaleX, targetScaleX - scaleX, totalDuration);
		}.bind(this, this._scaleX))

		if (targetScaleY != this._scaleY) executableMoveFunctions.push(function(scaleY, time, totalDuration) {
			this._scaleY = easingFunctions('scaleX', time, scaleY, targetScaleY - scaleY, totalDuration);
		}.bind(this, this._scaleY))	

		if (targetOpacity != this._opacity) executableMoveFunctions.push(function(opacity, time, totalDuration) {
			this._opacity = easingFunctions('opacity', time, opacity, targetOpacity - opacity, totalDuration);
		}.bind(this, this._opacity))

		if (easingFunctions) {
			this.updateMove = _updateMoveCurves.bind(this, duration, executableMoveFunctions);
		}
		else {
			this.updateMove = Game_Picture.prototype.updateMove.bind(this);
		}

	}

	/**
	 * @const {string[]}
	 */
	var toneKeys = ['red', 'green', 'blue', 'gray']

	/**
	 * @param {number[]} tone
	 * @param {number} duration
	 */
	Game_Picture.prototype.tint = function(tone, duration) {
		origin.Game_Picture.tint.call(this, tone, duration);

		var easingFunctions = _pluckEasingFunctions();

		/** @type {ExecutableAnimFunction[]} */
		var executableTintFunctions = [];

		// As with Game_Picture.prototype.move, we preconfigure executable functions here for greater performance
		tone.forEach(function(toneTarget, index) {
			var toneKey = toneKeys[index];
			var toneOrigin = this._tone[index];

			if (toneTarget != this._tone[index]) {
				executableTintFunctions.push(function(time, totalDuration) {
					this._tone[index] = easingFunctions(toneKey, time, toneOrigin, toneTarget - toneOrigin, totalDuration);
				}.bind(this))
			}
		}.bind(this))

		if (easingFunctions) {
			this.updateTone = _updateToneCurves.bind(this, duration, executableTintFunctions);
		}
		else {
			this.updateTone = Game_Picture.prototype.updateTone.bind(this);
		}
	}

	//=============================================================================
	// Demo drawing method and key listener
	//=============================================================================
	/**
	 * Draws an ingame demo overlay to preview the animation curves
	 * This is a big function but it's only relevant during development. I'll
	 * likely compress it in the future.
	 */
	function _drawDemo() {
		var screenWidth = window.innerWidth;
		var screenHeight = window.innerHeight;
		var surface = new PIXI.Application({
			width: screenWidth,
			height:  screenHeight,
			autoResize: true,
			resolution: devicePixelRatio,
			transparent: true
		});

		demoSurface = surface;

		surface.view.style.overflow = 'hidden';
		surface.view.style.position = 'absolute';
		surface.view.style.top = 0;
		surface.view.style.left = 0;
		surface.view.style['z-index'] = 999;

		document.body.appendChild(surface.view);

		var container = new PIXI.Container();

		surface.stage.addChild(container);
		
		var bg = new PIXI.Graphics()
			.beginFill(0x333333, 0.8)
			.drawRect(0, 0, screenWidth, screenHeight)
			.endFill();

		container.addChild(bg);
		
		var easingFunctions = Object.keys($.easingFunctions);
		easingFunctions.pop() // Remove Linear

		var total = easingFunctions.length;
		var perRow = 5;
		var rows = Math.ceil(total / perRow);
		var margin = 10;
		var width = (screenWidth - (margin * perRow)) / perRow;
		var height = (screenHeight - (margin * rows)) / rows;
		
		easingFunctions.forEach(function(name, index) {
			var easingFunction = $.easingFunctions[name];
			var col = index % perRow;
			var row = Math.floor(index / perRow);
			var x = col * (width + margin);
			var y = row * (height + margin);
			
			var sprite = new PIXI.Sprite()
			.setTransform(x, y);
			sprite.interactive = true;
			sprite.buttonMode = true;

			var graph = new PIXI.Graphics()
				.beginFill(0xcdcdcd)
				.drawRect(0, 0, width, height)
				.endFill();

			var innerPadding = 15;

			graph
			.lineStyle(3, 0x999999)
			.moveTo(innerPadding, height - innerPadding);
			
			var graphResolution = width + height / 100;
			for (var i = 0; i < graphResolution; i++) {
				var cx = $.easingFunctions.Linear(i, innerPadding, width - (innerPadding * 2), graphResolution);
				var cy = easingFunction(i, height - innerPadding, -(height - (innerPadding * 2)), graphResolution);
				graph.lineTo(cx, cy);
			}

			sprite.addChild(graph);

			var text = new PIXI.Text(name, {
				fontFamily: 'Helvetica',
				fontSize: 24,
				fill: 0xffffff,
				align: 'center',
				dropShadow: true,
				dropShadowBlur: 6,
				dropShadowDistance: 2,
				dropShadowAlpha: 0.5
			})
			text.setTransform((width - text.width) / 2, (height - text.height) / 2);
			text.alpha = 0.85;

			sprite.addChild(text);

			var ball1 = new PIXI.Graphics()
				.beginFill(0x08080ff, 0.8)
				.drawCircle(0, 0, 5)
				.endFill()
				.setTransform(innerPadding, height - innerPadding);
			
			sprite.addChild(ball1);

			var ball2 = new PIXI.Graphics()
				.beginFill(0xee3333, 0.8)
				.drawCircle(0, 0, 5)
				.endFill()
				.setTransform(innerPadding, height - innerPadding);
			
			sprite.addChild(ball2);

			sprite.on('pointerover', function() {
				var time = 0;
				var duration = 90;
				var animator = function() {
					if (time >= duration) surface.ticker.remove(animator);
					var bx = $.easingFunctions.Linear(time, innerPadding, width - (innerPadding * 2), duration);
					var by = easingFunction(time, height - innerPadding, -(height - (innerPadding * 2)), duration);
					
					ball1.setTransform(bx, by);

					bx = easingFunction(time, innerPadding, width - (innerPadding * 2), duration);
					by = height - innerPadding;
					
					ball2.setTransform(bx, by);

					time++;
				}
				surface.ticker.add(animator);
			})

			container.addChild(sprite);
		})
	}
	/**
	 * Enable demo hotkey if game is in test mode
	 */
	if (Utils.isOptionValid('test')) {
		document.addEventListener('keydown', function(event) {
			if (event.keyCode == demoHotkey) { demo() }
		})
	}

})(TDDP_AnimationCurves);