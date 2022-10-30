/*:
 * @plugindesc v1.00 Plugin to display a picture with a specific ID below characters
 * but above tilemap. (Even if used with YED_Tiled plugin).
 * @author Kentou
 *
 * @param Picture ID
 * @desc The ID of the picture which should be displayed below characters.
 * Default: 99
 * @default 99
 * 
 * @param Picture Z
 * @desc The Z-Index of the picture which should be displayed below characters.
 * Default: 2
 * @default 2
 * 
 * @help
 * If you display a picture with Show Picture command, use the configured Picture ID to
 * display the picture below the characters. All other picture commands behave
 * normally.
 */
var _createPictures = Spriteset_Base.prototype.createPictures;
Spriteset_Base.prototype.createPictures = function() {
    _createPictures.call(this);

    if (this._tilemap) {
        var params = PluginManager.parameters("KEN_PictureBelowChars");
        var picID = parseInt(params["Picture ID"]);    
        var sprite = this._pictureContainer.removeChildAt(picID - 1);
        sprite.z = sprite.zIndex = parseInt(params["Picture Z"]);
        this._tilemap.addChild(sprite);
    }
};