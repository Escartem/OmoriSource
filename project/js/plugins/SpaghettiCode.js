// //=============================================================================
// // * Increase Game FPS
// //=============================================================================
// var _faster_ = Scene_Map_updateMainMultiply = Scene_Map.prototype.updateMainMultiply;
// Scene_Map.prototype.updateMainMultiply = function() {
//   _faster_.call(this);
//   this.updateMain();
// };

//=============================================================================
// ** Game_Interpreter
//-----------------------------------------------------------------------------
// The interpreter for running event commands.
//=============================================================================
// * Key Item Culling (Force to 1)
//=============================================================================
Game_Interpreter.prototype.keyItemCull = function() {
  // List of Items to cull
  var list = [850, 851, 852, 853, 854, 855, 856, 857, 858, 859, 860, 861, 862, 863, 864, 865, 866, 867, 868, 869, 870, 871, 872, 873, 874, 875];
  // Set Quantity of Items in list to 1
  for (var i = 0; i < list.length; i++) {
    // Get Item Id
    var id = list[i];
    // If Item Exists
    if ($gameParty._items[id]) { $gameParty._items[id] = 1; };
  };
};

//=============================================================================
// * Hide Event Markers
//=============================================================================
var Archeia = Archeia || {};
Archeia.Game_CharacterBase_isTransparent = Game_CharacterBase.prototype.isTransparent;
Game_CharacterBase.prototype.isTransparent = function() {
    if (this.characterName() === 'DEV_TEST') return true;
    return Archeia.Game_CharacterBase_isTransparent.call(this);;
};