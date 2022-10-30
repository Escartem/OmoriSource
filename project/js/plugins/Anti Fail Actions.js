//=============================================================================
// TDS Anti Fail Actions
//=============================================================================

/*:
 * @plugindesc Prevents failure messages from appearing in certain actions.
 *
 * @author TDS
 *
 * @help
 *
 * Action Note Tags:
 *
 * <AntiFail>
 *
*/

(function() {

//==============================================================================================
// ** Game_Action
//==============================================================================================
// Alias Listing
var tds_AntiFailActions_Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
//==============================================================================================
// * Apply Item User Effect
//==============================================================================================
Game_Action.prototype.applyItemUserEffect = function(target) {
  // Run Original Method
  tds_AntiFailActions_Game_Action_applyItemUserEffect.call(this, target);
  // If Anti Fail make success
  if (this.item().meta.AntiFail) { this.makeSuccess(target) }
};

})();
