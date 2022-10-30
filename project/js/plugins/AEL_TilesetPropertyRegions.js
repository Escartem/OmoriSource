/*=============================================================================
 * Tileset Properties as Regions
//=============================================================================
/*:
 * @plugindesc <AEL_TilesetPropertyRegions> Uses regions to add tile properties. 
 * @author Archeia
 *
 * @param Ladder Region
 * @desc Region used for Ladder Tiles.
 * @default 2
 *
 * @param Counter Region
 * @desc Region used for Counter Tiles.
 * @default 3
 *
 * @param Damage Floor Region
 * @desc Region used for Damage Tiles.
 * @default 4
 *
 * @param Bush Region
 * @desc Region used for Bush Tiles.
 * @default 5
 *
 * @param Bush Height
 * @desc Region used for Bush Tiles.
 * @default 12
 *
 * @help This plugin adds tile properties like Ladder, Bush, Counter and Damage
 * Floor to regions. This plugin also does not have any plugin commands. 
*/

var Imported = Imported || {};
Imported.AEL_TilesetPropertyRegions = true;

//=============================================================================
// ** Parameter Check
//=============================================================================
var parameters = $plugins.filter(function(p) { 
	return p.description.contains('<AEL_TilesetPropertyRegions>') })[0].parameters;

//=============================================================================
// ** Set Parameters
//=============================================================================
var AEL = AEL || {};
AEL.TilesetPropertyRegions = AEL.TilesetPropertyRegions || {};
AEL.TilesetPropertyRegions.ladderRegion = Number(parameters['Ladder Region'] || 2);
AEL.TilesetPropertyRegions.counterRegion = Number(parameters['Counter Region'] || 3);
AEL.TilesetPropertyRegions.damageFloorRegion = Number(parameters['Damage Floor Region'] || 4);
AEL.TilesetPropertyRegions.bushRegion = Number(parameters['Bush Region'] || 5);
AEL.TilesetPropertyRegions.bushHeight = Number(parameters['Bush Height'] || 12);

//=============================================================================
// ** Game_Map
//-----------------------------------------------------------------------------
// The game object class for a map. It contains scrolling and passage
// determination functions.
//=============================================================================
// * Determine if Ladder
//=============================================================================
Game_Map.prototype.isLadder = function(x, y) {
	return this.isValid(x, y) && (this.checkLayeredTilesFlags(x, y, 0x20) || this.regionId(x, y) === AEL.TilesetPropertyRegions.ladderRegion);
};
//=============================================================================
// * Determine if Counter
//=============================================================================
Game_Map.prototype.isCounter = function(x, y) {
	return this.isValid(x, y) && (this.checkLayeredTilesFlags(x, y, 0x80) || this.regionId(x, y) === AEL.TilesetPropertyRegions.counterRegion);
};
//=============================================================================
// * Determine if Damage floor
//=============================================================================
Game_Map.prototype.isDamageFloor = function(x, y) {
	return this.isValid(x, y) && (this.checkLayeredTilesFlags(x, y, 0x100) || this.regionId(x, y) === AEL.TilesetPropertyRegions.damageFloorRegion);
};
//=============================================================================
// * Determine if Bush
//=============================================================================
Game_Map.prototype.isBush = function(x, y) {
	if(Imported.YED_Tiled){ // Add Compatibility with Tiled
	  // Check if on Region
	  var onRegion = this._regions !== undefined && this.regionId(x, y) === AEL.TilesetPropertyRegions.bushRegion;
	  return this.isValid(x, y) && (this.checkLayeredTilesFlags(x, y, 0x40) || onRegion)
	} else {
		return this.isValid(x, y) && (this.checkLayeredTilesFlags(x, y, 0x40) || this.regionId(x, y) === AEL.TilesetPropertyRegions.bushRegion);
	}
};

//=============================================================================
// * Change Bush Depth
//=============================================================================
Game_CharacterBase.prototype.refreshBushDepth = function() {
    if (this.isNormalPriority() && !this.isObjectCharacter() &&
            this.isOnBush() && !this.isJumping()) {
        if (!this.isMoving()) {
            this._bushDepth = AEL.TilesetPropertyRegions.bushHeight;
        }
    } else {
        this._bushDepth = 0;
    }
};