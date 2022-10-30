
//=============================================================================
// ShowConsoleOnBootV_1_6_0.js
// @Author: Traverse, credits to Trapless for bringing attention that MV's
// v1.6.0 broke the original version and for trying to help fix it.
//=============================================================================
//
/*:
* This version "works" with RMMV V1.6.0 at the expense of being able to set
* the dimensions and position of the console via the script parameters.
* They must now be adjusted by hand, although note that v1.6.0 also saves the 
* dimensions and position of the console after adjustment.
*
* @plugindesc Shows the developer console on boot.
*
* @param Game Window X-Offset
* @desc Sideways position from the center where the game window is shifted. Default = 150.
* @default 150
*
* @param Game Window Y-Offset
* @desc Vertical position from the center where the game window is shifted. Default = 0.
* @default 0
*
* @param Autofocus
* @desc Will bring the game window in front of the console if set to "true".
* @default true
*
* @ No other settings required.
*/

(function() {
	var substrBegin = document.currentScript.src.lastIndexOf('/');
	var substrEnd = document.currentScript.src.indexOf('.js');
	var scriptName = document.currentScript.src.substring(substrBegin + 1, substrEnd);
	var parameters = PluginManager.parameters(scriptName);

	var win_x_offset = Number(parameters['Game Window X-Offset'] || 150);
	var win_y_offset = Number(parameters['Game Window Y-Offset'] || 0);
	var autofocus = String(parameters['Autofocus']);
	
	var _Scene_Boot_new_initialize_showconsole_24102015 = Scene_Boot.prototype.initialize;    
	Scene_Boot.prototype.initialize = function() {
		_Scene_Boot_new_initialize_showconsole_24102015.call(this);
		if (Utils.isNwjs() && Utils.isOptionValid('test')) {

			nw.Window.get().showDevTools('', function() {
				if (autofocus === 'true') {
					nw.Window.get().focus();
				};
			});
			nw.Window.get().moveBy(win_x_offset,win_y_offset);
			
		};
	};
	
}) ();