//-----------------------------------------------------------------------------
//  Galv's Disable Mouse
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  DisableMouse.js
//-----------------------------------------------------------------------------
//  Version 1.0
//  2015-11-03 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_NoMouse = true;

//-----------------------------------------------------------------------------
/*:
 * @plugindesc Disables mouse clicks.
 * 
 * @author Galv - galvs-scripts.com
 *
 * @help
 * This space intentionally left blank.
 * 
 */

TouchInput._onMouseDown = function(event) {
	// Overwrite to do nothing
};