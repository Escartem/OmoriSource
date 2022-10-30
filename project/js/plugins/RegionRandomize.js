//=============================================================================
// Region Randomize
//=============================================================================
 /*:
 * @plugindesc
 * Places an event on specificied region randomly.
 *
 *
 * Script Call:
 * $gameMap.randomPos(eventId, regionId);
 * 
 */
//=============================================================================
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

