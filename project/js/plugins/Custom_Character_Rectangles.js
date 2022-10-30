//=============================================================================
// TDS Custom Character Rectangles
// Version: 1.0
//=============================================================================
// Add to Imported List
var Imported = Imported || {};
Imported.TDS_CustomCharacterRectangles = true;
// Initialize Alias Object
var _TDS_ = _TDS_ || {};
_TDS_.CustomCharacterRectangles = _TDS_.CustomCharacterRectangles || {};
//=============================================================================
/*:
 * @plugindesc
 * Description
 *
 * @author TDS
 *
 * ◆Set Movement Route：Player (Wait)
 *：                  ：◇Script：this.setCustomFrameXY(6, 1)
 *：                  ：◇Wait：5 frames
 *：                  ：◇Script：this.setCustomFrameXY(7, 1)
 *：                  ：◇Wait：5 frames
 *：                  ：◇Script：this.setCustomFrameXY(8, 1)
 *：                  ：◇Wait：5 frames
 * 
 * Example Script Calls:
 * $gameMap.event(36).setCustomFrameXY(0, 2);
 * $gamePlayer.setCustomFrameXY(7, 5);
 * 
 * To reset:
 * $gameMap.event(idA).setCustomFrameXY(null, null);
 */
//=============================================================================

//=============================================================================
// ** Game_CharacterBase
//-----------------------------------------------------------------------------
// The superclass of Game_Character. It handles basic information, such as
// coordinates and images, shared by all characters.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.CustomCharacterRectangles.Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
//=============================================================================
// * Initialize Members
//=============================================================================
Game_CharacterBase.prototype.initMembers = function() {
    // Set Custom Frame Properties to null
    this.setCustomFrameXYWH(null, null, null, null);
    // Run Original Function
    _TDS_.CustomCharacterRectangles.Game_CharacterBase_initMembers.call(this);
};
//=============================================================================
// * Set Custom frame X & Y
//=============================================================================
Game_CharacterBase.prototype.setCustomFrameXY = function(x, y) {
    // Set custom frame X & Y
    this._customFrameX = x;
    this._customFrameY = y;
};
//=============================================================================
// * Set Custom Frame Width & Height
//=============================================================================
Game_CharacterBase.prototype.setCustomFrameWH = function(width, height) {
    // Set custom frame Width & Height
    this._customFrameWidth = width;
    this._customFrameHeight = height;
};
//=============================================================================
// * Set Custom Frame X, Y, Width and Height
//=============================================================================
Game_CharacterBase.prototype.setCustomFrameXYWH = function(x, y, width, height) {
    // Set Custom Frame Properties
    this._customFrameX = x;
    this._customFrameY = y;
    this._customFrameWidth = width;
    this._customFrameHeight = height;
};

//=============================================================================
// ** Sprite_Character
//-----------------------------------------------------------------------------
// The sprite for displaying a character.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.CustomCharacterRectangles.Sprite_Character_characterBlockX = Sprite_Character.prototype.characterBlockX;
_TDS_.CustomCharacterRectangles.Sprite_Character_characterBlockY = Sprite_Character.prototype.characterBlockY;
_TDS_.CustomCharacterRectangles.Sprite_Character_characterPatternX = Sprite_Character.prototype.characterPatternX;
_TDS_.CustomCharacterRectangles.Sprite_Character_characterPatternY = Sprite_Character.prototype.characterPatternY;
_TDS_.CustomCharacterRectangles.Sprite_Character_patternWidth = Sprite_Character.prototype.patternWidth;
_TDS_.CustomCharacterRectangles.Sprite_Character_patternHeight = Sprite_Character.prototype.patternHeight;
//=============================================================================
// * Get Character Block X
//=============================================================================
Sprite_Character.prototype.characterBlockX = function() {
    // Get Custom Frame X
    var frameX = this._character._customFrameX;
    // Return Custom Frame X
    if (frameX !== null) { return frameX; };
    // Return Original Function
    return _TDS_.CustomCharacterRectangles.Sprite_Character_characterBlockX.call(this);
};
//=============================================================================
// * Get Character Block Y
//=============================================================================
Sprite_Character.prototype.characterBlockY = function() {
    // Get Custom Frame Y
    var frameY = this._character._customFrameY;
    // Return Custom Frame Y
    if (frameY !== null) { return frameY; };
    // Return Original Function
    return _TDS_.CustomCharacterRectangles.Sprite_Character_characterBlockY.call(this);
};
//=============================================================================
// * Get Character Pattern X
//=============================================================================
Sprite_Character.prototype.characterPatternX = function() {
    // Return 0 if using a custom frame
    if (this._character._customFrameX !== null) { return 0; };
    // Return Original Function
    return _TDS_.CustomCharacterRectangles.Sprite_Character_characterPatternX.call(this);
};
//=============================================================================
// * Get Character Pattern Y
//=============================================================================
Sprite_Character.prototype.characterPatternY = function() {
    // Return 0 if using a custom frame
    if (this._character._customFrameY !== null) { return 0; };
    // Return Original Function
    return _TDS_.CustomCharacterRectangles.Sprite_Character_characterPatternY.call(this);
};
//=============================================================================
// * Get Character Pattern Width
//=============================================================================
Sprite_Character.prototype.patternWidth = function() {
    // Get Custom Frame Width
    var frameWidth = this._character._customFrameWidth;
    // Return Custom Frame Width
    if (frameWidth !== null) { return frameWidth; };
    // Run Original Function
    return _TDS_.CustomCharacterRectangles.Sprite_Character_patternWidth.call(this);
};
//=============================================================================
// * Get Character Pattern Height
//=============================================================================
Sprite_Character.prototype.patternHeight = function() {
    // Get Custom Frame Width
    var frameHeight = this._character._customFrameHeight;
    // Return Custom Frame Width
    if (frameHeight !== null) { return frameHeight; };
    // Run Original Function
    return _TDS_.CustomCharacterRectangles.Sprite_Character_patternHeight.call(this);
};