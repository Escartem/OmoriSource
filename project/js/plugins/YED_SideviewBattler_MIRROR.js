/*:
 * Yami Engine Delta - Sideview Battler Enhancement Add-On
 *
 * @plugindesc v1.0.0 This plugin allows user to use any kind of sideview battler.
 * @author Yami Engine Delta [Dr.Yami]
 * @help
 * There is no Plugin Command for this plugin.
 *
 * ============================================================================
 * Actors & Enemies Notetags
 *
 * <sprite mirrored> 
 * The sprite will be mirrored.
 *
*/

/**
 * @namespace SideviewBattler
 * @memberof YED
 */

(function() {
    var _processSVENotetags1 = DataManager.processSVENotetags1; 
    DataManager.processSVENotetags1 = function(group) {
        _processSVENotetags1.call(this, group);

        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            var notedata = obj.note.split(/[\r\n]+/);

            obj.spriteMirrored = false;

            for (var i = 0; i < notedata.length; i++) {
                var line = notedata[i];
                if (line.match(/<(?:SPRITE MIRRORED)>/i)) {
                    obj.spriteMirrored = true;
                } 
            }
        }
    };

    Game_Enemy.prototype.spriteScaleX = function() {
        if (this.enemy().spriteMirrored) return this.enemy().spriteScaleX * -1;
        return this.enemy().spriteScaleX;
    };
})();