//=============================================================================
// Archeia Core Changes
// Version: 1.0
//=============================================================================
/*:
 * @plugindesc <Archeia_CoreChanges>
 * This plugin modifies the core script and adds new things.
 *
 * @author AEL
 *
 * @help
 *
 * Nothing needs to be done.
 *
 */
//=============================================================================

var Imported = Imported || {};
Imported.Archeia_CoreChanges = true;

//=============================================================================
// ** Parameter Check
//=============================================================================
var parameters = $plugins.filter(function(p) { 
	return p.description.contains('<Archeia_CoreChanges>') })[0].parameters;

//=============================================================================
// ** Set Parameters
//=============================================================================
var AEL = AEL || {};
AEL.Archeia_CoreChanges = AEL.Archeia_CoreChanges || {};

//-----------------------------------------------------------------------------
// * Fix Pixi FPS
//-----------------------------------------------------------------------------
/*(function(){
    const oldFPSMeter = FPSMeter;
    FPSMeter = function(){
        oldFPSMeter.apply(this);
        const FPSMeter_pause = this.pause;
        this.pause = function(){
            FPSMeter_pause.apply(this);
            //sadly, we can't get frameId because of the fpsmeter.js is minified
            //so, restart ticker in all case.
            PIXI.ticker.shared._requestId = null;
            PIXI.ticker.shared._requestIfNeeded();
        }
    }
})();*/

//-----------------------------------------------------------------------------
// * Pixi Texture Fix
//-----------------------------------------------------------------------------
PIXI.glCore.GLTexture.prototype.upload = function(source)
{
	this.bind();

	var gl = this.gl;

	gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha);

    var isVideo = !!source.videoWidth;
	var newWidth = isVideo ? source.videoWidth : source.width;
	var newHeight = isVideo ? source.videoHeight : source.height;

	if(newHeight !== this.height || newWidth !== this.width || isVideo)
	{
		gl.texImage2D(gl.TEXTURE_2D, 0, this.format, this.format, this.type, source);
	}
	else
	{
		gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, this.format, this.type, source);
	}

	this.width = newWidth;
	this.height = newHeight;

};

//-----------------------------------------------------------------------------
// * Remove smoothing from graphics
//-----------------------------------------------------------------------------
Graphics._centerElement = function(element) {
    var width = element.width * this._realScale;
    var height = element.height * this._realScale;
    element.style.position = 'absolute';
    element.style.margin = 'auto';
    element.style.top = 0;
    element.style.left = 0;
    element.style.right = 0;
    element.style.bottom = 0;
    element.style.width = width + 'px';
    element.style.height = height + 'px';
    element.style["image-rendering"] = "pixelated";
    element.style["font-smooth"] = "none";
};

//-----------------------------------------------------------------------------
// * Change Balloon Image based on Variable
//-----------------------------------------------------------------------------

Sprite_Balloon.prototype.loadBitmap = function() {
	this.bitmap = ImageManager.loadSystem($gameVariables.value(25));
    this.setFrame(0, 0, 0, 0);
};

//-----------------------------------------------------------------------------
// * Change Size for Balloon Icons to follow RMVXA Standards
//-----------------------------------------------------------------------------
Sprite_Balloon.prototype.updateFrame = function() {
    var w = 32;
    var h = 24;
    var sx = this.frameIndex() * w;
    var sy = (this._balloonId - 1) * h;
    this.setFrame(sx, sy, w, h);
};

//-----------------------------------------------------------------------------
// * Disable Window Frame Stretching
//-----------------------------------------------------------------------------
(function() {
	
	Window.prototype._refreshFrame = function() {
	    var w = this._width;
	    var h = this._height;
	    var m = 24;
	    var bitmap = new Bitmap(w, h);

	    this._windowFrameSprite.bitmap = bitmap;
	    this._windowFrameSprite.setFrame(0, 0, w, h);

	    if (w > 0 && h > 0 && this._windowskin) {
	        var skin = this._windowskin;
	        var p = 96;
	        var q = 96;

	        //Creates easy references for original/new width and height
	        var oWid = p-m*2;
	        var nWid = w-m*2;
	        var oHei = p-m*2;
	        var nHei = h-m*2;

	        //Divides to find how many complete repeats for horizontal and vertical
	        var hRep = Math.floor(nWid / oWid);
	        var vRep = Math.floor(nHei / oHei);

	        //Finds remainders for the "fraction" remaining
	        var hRem = nWid % oWid;
	        var vRem = nHei % oHei;


	        //Top Side
	        for(var i = 0; i < hRep; i++) {
	        	bitmap.blt(skin, p+m, 0, oWid, m, m + (i*oWid), 0, oWid, m);
	        }
	        bitmap.blt(skin, p+m, 0, hRem, m, m + (oWid*hRep), 0, hRem, m);
	        //Bottom Side
	        for(var i = 0; i < hRep; i++) {
	        	bitmap.blt(skin, p+m, q-m, oWid, m, m + (i*oWid), h-m, oWid, m);
	        }
	        bitmap.blt(skin, p+m, q-m, hRem, m, m + (oWid*hRep), h-m, hRem, m);
	        //Left Side
	        for(var i = 0; i < vRep; i++) {
	        	bitmap.blt(skin, p, m, m, oHei, 0, m + (i*oHei), m, oHei);
	        }
	        bitmap.blt(skin, p, m, m, vRem, 0, m + (vRep*oHei), m, vRem);
	        //Right Side
	        for(var i = 0; i < vRep; i++) {
	        	bitmap.blt(skin, p+q-m, m, m, oHei, w-m, m + (i*oHei), m, oHei);
	        }
	        bitmap.blt(skin, p+q-m, m, m, vRem, w-m, m + (vRep*oHei), m, vRem);
	        
	        //Top-Left Corner
	        bitmap.blt(skin, p+0, 0+0, m, m, 0, 0, m, m);
	        //Top-Right Corner
	        bitmap.blt(skin, p+q-m, 0+0, m, m, w-m, 0, m, m);
	        //Bottom-Left Corner
	        bitmap.blt(skin, p+0, 0+q-m, m, m, 0, h-m, m, m);
	        //Bottom-Right Corner
	        bitmap.blt(skin, p+q-m, 0+q-m, m, m, w-m, h-m, m, m);
	    }
	};

})();

// //-----------------------------------------------------------------------------
// // * Adjust Player Walk Speed
// //-----------------------------------------------------------------------------
// Game_CharacterBase.prototype.realMoveSpeed = function() {
//     if (this.isDashing()) {
//         return Math.min(4, this._moveSpeed + 1);
//     } else {
//         return Math.max(3, this._moveSpeed - 1);
//     }
// };

//-----------------------------------------------------------------------------
// * Region Randomize
//-----------------------------------------------------------------------------
// Script Call:
// $gameMap.randomPos(eventId, regionId);
//-----------------------------------------------------------------------------
Game_Map.prototype.randomPos = function(eventId, regionId) {
	var coords = [];
  
	for (var x = 0; x < $dataMap.width; x++) {
	  for (var y = 0; y < $dataMap.height; y++) {
		var region = this.regionId(x, y);
		if (region == regionId) {
		  coords.push([x, y]);
		}
	  }
	}

	if (coords.length === 0) return;
	var idx = Math.randomInt(coords.length);
	var randomCoord = coords[idx];
  
	var event = this._events[eventId];
	event.setPosition(randomCoord[0], randomCoord[1]);
};
  
//-----------------------------------------------------------------------------
// * Disable Galv Camera
//-----------------------------------------------------------------------------
var temp_DataManager_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
  temp_DataManager_createGameObjects.call(this);
  $gameSwitches.setValue(5008, true);
}  

//-----------------------------------------------------------------------------
// * Remove Weather Dimming
//-----------------------------------------------------------------------------
var archeia_createDimmer = Weather.prototype._createDimmer;
Weather.prototype._createDimmer = function() {
	archeia_createDimmer.call(this);
    this._dimmerSprite.setColor(255, 255, 255);
};

//-----------------------------------------------------------------------------
// * Change Follower Graphic to either Idle/Walk/Run
//-----------------------------------------------------------------------------
// var archeia_Game_Player_isDashing = Game_Player.prototype.isDashing;
// Game_Player.prototype.isDashing = function() {
// 	archeia_Game_Player_isDashing.call(this);
// 	if $gameSwitches(18) === true {
		
// 	}
// };