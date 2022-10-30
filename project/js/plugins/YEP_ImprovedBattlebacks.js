//=============================================================================
// Yanfly Engine Plugins - Improved Battlebacks
// YEP_ImprovedBattlebacks.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_ImprovedBattlebacks = true;

var Yanfly = Yanfly || {};
Yanfly.IBB = Yanfly.IBB || {};
Yanfly.IBB.version = 1.02;

//=============================================================================
 /*:
 * @plugindesc v1.02 Changes how RPG Maker MV handles battlebacks.
 * Battlebacks are now more flexible with what they can do.
 * @author Yanfly Engine Plugins
 *
 * @param Scale Battlebacks
 * @type boolean
 * @on Scale
 * @off Normal
 * @desc Do you wish to scale battlebacks to resolution?
 * NO - false     YES - true
 * @default true
 *
 * @param Battleback Margin
 * @type number
 * @min 0
 * @desc Pixel margin of error for battlebacks if non-scaling
 * battlebacks are used. Default: 32
 * @default 32
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin remakes how RPG Maker MV handles battlebacks. By default, all
 * battlebacks are handled in a hard-structured fashion making them hard to
 * modify and alter to behave dynamically. This plugin reworks the way RPG
 * Maker MV's battlebacks behave using a more automatic and flexible means of
 * handling them, allowing battlebacks to added, removed, change its image,
 * fade in/out, adjust opacity settings, and scroll in various directions!
 *
 * If you are using YEP_CoreEngine and YEP_BattleEngineCore, place this plugin
 * under both of those plugins in the plugin list to ensure compatibility. The
 * action sequences provided by this plugin can only be used if the plugin
 * YEP_BattleEngineCore is installed in the plugin list above this plugin.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * You can use the following plugin commands to alter how battlebacks behave in
 * your game. Keep in mind that these plugin commands must be used while the
 * party is in battle.
 *
 * ---
 *
 * BATTLEBACK id ADD: folder, filename
 * BATTLEBACK id ADD: folder, filename, hue
 * - Replace 'id' with the battleback you wish to alter as a number larger than
 * 2 (i.e. 3 or above). Replace 'folder' with the exact folder name in your
 * project's 'img' folder (case sensitive). Replace 'filename' with the image
 * filename without the file extension (case sensitive). If 'hue' is used,
 * replace 'hue' with a number between 0 and 360 to change the hue of the image
 * used. This will add a new battleback stacked on top of battlebacks 1 and 2
 * with higher ID's being on top. When newly added, the new battleback will
 * start at opacity 0 and fade in with a duration of 20 frames.
 *
 * BATTLEBACK id REMOVE
 * - Replace 'id' with the battleback you wish to alter as a number larger than
 * 2 (i.e. 3 or above). This will remove the battleback from being shown. When
 * this command is used, the battleback will fade with a duration of 20 frames.
 * Once it reaches 0 opacity, the battleback will be removed from the battle.
 *
 * BATTLEBACK id CHANGE TO: folder, filename
 * BATTLEBACK id CHANGE TO: folder, filename, hue
 * - Replace 'id' with the battleback you wish to alter. Replace 'folder' with
 * the exact folder name in your project's 'img' folder (case sensitive).
 * Replace 'filename' with the image filename without the file extension (case
 * sensitive). This will change the designated battleback's image to use the
 * desired image depicted by the folder and filename. If 'hue' is used, replace
 * 'hue' with a number between 0 and 360 to change the hue of the image used.
 *
 * BATTLEBACK id FADE OUT
 * BATTLEBACK id FADE OUT: duration
 * BATTLEBACK id FADE IN
 * BATTLEBACK id FADE IN: duration
 * - Replace 'id' with the battleback you wish to alter. This will cause the
 * designated battleback to fade out/in. If 'duration' is used, replace it with
 * a number to indicate how many frames will be used for the fade out/in. If
 * no duration is specified, it will default to 20 frames.
 *
 * BATTLEBACK id OPACITY: n
 * BATTLEBACK id OPACITY: n%
 * - Replace 'id' with the battleback you wish to alter. Replace 'n' with the
 * opacity value you wish to achieve (from 0 to 255) or replace 'n%' with the
 * opacity rate you wish to set the battleback to (from 0% to 100%). This will
 * set the designated battleback's opacity to that value. If there are any fade
 * in or out commands occurring as this command is issued, they'll be disabled.
 *
 * BATTLEBACK id SCROLL SPEED X: +n
 * BATTLEBACK id SCROLL SPEED X: -n
 * BATTLEBACK id SCROLL SPEED Y: +n
 * BATTLEBACK id SCROLL SPEED Y: -n
 * - Replace 'id' with the battleback you wish to alter. Replace 'n' with the
 * value you wish to change the scroll speed X or scroll speed Y of. The higher
 * the 'n' value, the faster it scrolls.
 *
 * BATTLEBACK id RESET SCROLL SPEED
 * - Replace 'id' with the battleback you wish to alter. Resets the scroll
 * speeds for X and Y back to 0.
 *
 * ============================================================================
 * Yanfly Engine Plugins - Battle Engine Extension - Action Sequence Commands
 * ============================================================================
 *
 * If you have YEP_BattleEngineCore.js installed with this plugin located
 * underneath it in the Plugin Manager, you can make use of these extra
 * damage related action sequences.
 *
 *=============================================================================
 * BATTLEBACK id ADD: folder, filename
 * BATTLEBACK id ADD: folder, filename, hue
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Replace 'id' with the battleback you wish to alter as a number larger than 2
 * (i.e. 3 or above). Replace 'folder' with the exact folder name in your
 * project's 'img' folder (case sensitive). Replace 'filename' with the image
 * filename without the file extension (case sensitive). If 'hue' is used,
 * replace 'hue' with a number between 0 and 360 to change the hue of the image
 * used. This will add a new battleback stacked on top of battlebacks 1 and 2
 * with higher ID's being on top. When newly added, the new battleback will
 * start at opacity 0 and fade in with a duration of 20 frames.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: battleback 3 add: battlebacks1, GrassMazePool
 *                battleback 4 add: battlebacks2, GrassMaze, 180
 *=============================================================================
 *
 *=============================================================================
 * BATTLEBACK id REMOVE
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Replace 'id' with the battleback you wish to alter as a number larger than
 * 2 (i.e. 3 or above). This will remove the battleback from being shown. When
 * this command is used, the battleback will fade with a duration of 20 frames.
 * Once it reaches 0 opacity, the battleback will be removed from the battle.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: battleback 3 remove
 *                battleback 4 remove
 *=============================================================================
 *
 *=============================================================================
 * BATTLEBACK id CHANGE TO: folder, filename
 * BATTLEBACK id CHANGE TO: folder, filename, hue
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Replace 'id' with the battleback you wish to alter. Replace 'folder' with
 * the exact folder name in your project's 'img' folder (case sensitive).
 * Replace 'filename' with the image filename without the file extension (case
 * sensitive). This will change the designated battleback's image to use the
 * desired image depicted by the folder and filename. If 'hue' is used, replace
 * 'hue' with a number between 0 and 360 to change the hue of the image used.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: battleback 1 change to: parallaxes, SeaofClouds
 *                battleback 2 change to: battlebacks2, Ship, 180
 *=============================================================================
 *
 *=============================================================================
 * BATTLEBACK id FADE OUT
 * BATTLEBACK id FADE OUT: duration
 * BATTLEBACK id FADE IN
 * BATTLEBACK id FADE IN: duration
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Replace 'id' with the battleback you wish to alter. This will cause the
 * designated battleback to fade out/in. If 'duration' is used, replace it with
 * a number to indicate how many frames will be used for the fade out/in. If
 * no duration is specified, it will default to 20 frames.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: battleback 1 fade out
 *                battleback 2 fade out: 120
 *                battleback 1 fade in
 *                battleback 2 fade in: 180
 *=============================================================================
 *
 *=============================================================================
 * BATTLEBACK id OPACITY: n
 * BATTLEBACK id OPACITY: n%
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Replace 'id' with the battleback you wish to alter. Replace 'n' with the
 * opacity value you wish to achieve (from 0 to 255) or replace 'n%' with the
 * opacity rate you wish to set the battleback to (from 0% to 100%). This will
 * set the designated battleback's opacity to that value. If there are any fade
 * in or out commands occurring as this command is issued, they'll be disabled.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: battleback 1 opacity: 127
 *                battleback 2 opacity: 50%
 *=============================================================================
 *
 *=============================================================================
 * BATTLEBACK id SCROLL SPEED X: +n
 * BATTLEBACK id SCROLL SPEED X: -n
 * BATTLEBACK id SCROLL SPEED Y: +n
 * BATTLEBACK id SCROLL SPEED Y: -n
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Replace 'id' with the battleback you wish to alter. Replace 'n' with the
 * value you wish to change the scroll speed X or scroll speed Y of. The higher
 * the 'n' value, the faster it scrolls.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: battleback 1 scroll speed x: +1
 *                battleback 1 scroll speed y: +2
 *                battleback 2 scroll speed x: -3
 *                battleback 2 scroll speed y: -4
 *=============================================================================
 *
 *=============================================================================
 * BATTLEBACK id RESET SCROLL SPEED
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Replace 'id' with the battleback you wish to alter. Resets the scroll
 * speeds for X and Y back to 0.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: battleback 1 reset scroll speed
 *=============================================================================
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.02:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.01:
 * - Fixed a bug that wasn't returning the proper sequence checks with action
 * sequences.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_ImprovedBattlebacks');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.IBBScale = eval(String(Yanfly.Parameters['Scale Battlebacks']));
Yanfly.Param.IBBMargin = Number(Yanfly.Parameters['Battleback Margin']);

//=============================================================================
// BattleManager
//=============================================================================

BattleManager.alterBattleback = function(line) {
  if (line.match(/(?:BATTLEBACK|BATTLE BACK)[ ](\d+)/i)) {
    var id = Math.max(1, parseInt(RegExp.$1));
    var spriteset = SceneManager._scene._spriteset;
    if (!spriteset) return;
  } else {
    return;
  }
  // TESTING
  if (line.match(/TESTING/i)) {
    console.log('Test Passed');
  // CHANGE TO
  } else if (line.match(/CHANGE TO/i)) {
    if (line.match(/:[ ](.*),[ ](.*),[ ](\d+)/i)) {
      var folder = 'img/' + String(RegExp.$1) + '/';
      var filename = String(RegExp.$2);
      var hue = Number(RegExp.$3).clamp(0, 360);
    } else if (line.match(/:[ ](.*),[ ](.*)/i)) {
      var folder = 'img/' + String(RegExp.$1) + '/';
      var filename = String(RegExp.$2);
      var hue = 0;
    } else {
      return;
    }
    spriteset.changeBattlebackTo(id, folder, filename, hue);
  // FADE IN
  } else if (line.match(/FADE IN/i)) {
    if (line.match(/:[ ](\d+)/i)) {
      var duration = parseInt(RegExp.$1);
    } else {
      var duration = 20;
    }
    spriteset.battlebackFadeIn(id, duration);
  // FADE OUT
  } else if (line.match(/FADE OUT/i)) {
    if (line.match(/:[ ](\d+)/i)) {
      var duration = parseInt(RegExp.$1);
    } else {
      var duration = 20;
    }
    spriteset.battlebackFadeOut(id, duration);
  // OPACITY
  } else if (line.match(/OPACITY/i)) {
    if (line.match(/:[ ](\d+)([%％])/i)) {
      var rate = parseFloat(RegExp.$1) * 0.01;
      var value = Math.round(rate * 255);
    } else if (line.match(/:[ ](\d+)/i)) {
      var value = parseInt(RegExp.$1);
    } else {
      return;
    }
    spriteset.battlebackOpacity(id, value);
  // RESET SCROLL SPEED
  } else if (line.match(/RESET SCROLL SPEED/i)) {
    spriteset.resetScrollSpeeds(id);
  // SCROLL SPEED X
  } else if (line.match(/SCROLL SPEED X:[ ]([\+\-]\d+)/i)) {
    var speed = parseInt(RegExp.$1);
    spriteset.setBattlebackScrollSpeedX(id, speed);
  // SCROLL SPEED Y
  } else if (line.match(/SCROLL SPEED Y:[ ]([\+\-]\d+)/i)) {
    var speed = parseInt(RegExp.$1);
    spriteset.setBattlebackScrollSpeedY(id, speed);
  // ADD
  } else if (line.match(/ADD/i)) {
    if (line.match(/:[ ](.*),[ ](.*),[ ](\d+)/i)) {
      var folder = 'img/' + String(RegExp.$1) + '/';
      var filename = String(RegExp.$2);
      var hue = Number(RegExp.$3).clamp(0, 360);
    } else if (line.match(/:[ ](.*),[ ](.*)/i)) {
      var folder = 'img/' + String(RegExp.$1) + '/';
      var filename = String(RegExp.$2);
      var hue = 0;
    } else {
      return;
    }
    var bitmap = ImageManager.loadBitmap(folder, filename, hue, true);
    var opacity = 0;
    var duration = 20;
    spriteset.addNewBattleback(id, bitmap, opacity, duration);
  // REMOVE
  } else if (line.match(/REMOVE/i)) {
    spriteset.removeBattleback(id);
  }
};

if (Imported.YEP_BattleEngineCore) {

Yanfly.IBB.BattleManager_pAS = BattleManager.processActionSequence;
BattleManager.processActionSequence = function(actionName, actionArgs) {
  if (actionName.match(/(?:BATTLEBACK|BATTLE BACK)[ ](\d+)/i)) {
    var line = actionName + ': ';
    var str = '';
    var length = actionArgs.length;
    for (var i = 0; i < length; ++i) {
      str += actionArgs[i];
      if (i !== length - 1) str += ', ';
    }
    line += str.trim();
    this.alterBattleback(line);
    return false;
  } else {
    return Yanfly.IBB.BattleManager_pAS.call(this, actionName, actionArgs);
  }
};

}; // Imported.YEP_BattleEngineCore

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.IBB.Game_Interpreter_pluginCommand =
  Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.IBB.Game_Interpreter_pluginCommand.call(this, command, args);
  if (!$gameParty.inBattle()) return;
  BattleManager.alterBattleback(this._params[0]);
};

//=============================================================================
// Sprite_ImprovedBattleback
//=============================================================================

function Sprite_ImprovedBattleback() {
  this.initialize.apply(this, arguments);
}

Sprite_ImprovedBattleback.prototype = Object.create(TilingSprite.prototype);
Sprite_ImprovedBattleback.prototype.constructor = Sprite_ImprovedBattleback;

Sprite_ImprovedBattleback.prototype.initialize = function(bitmap, type) {
  this._type = type || 1;
  TilingSprite.prototype.initialize.call(this, bitmap);
  this.resetScrollSpeeds();
  this.resetFadeSettings();
};

Sprite_ImprovedBattleback.prototype.setup = function(bf, sp1) {
  this._initialLocationSetup = false;
  this._battleField = bf;
  this._sprite1 = sp1;
  var margin = Yanfly.Param.IBBMargin;
  var x = -this._battleField.x - margin;
  var y = -this._battleField.y;
  var w = Graphics.width + margin * 2;
  var h = Graphics.height + margin * 2;
  this.move(x, 0, w, h);
  if (this._sprite1 !== this) this._sprite1.setup(bf, sp1);
};

Sprite_ImprovedBattleback.prototype.update = function() {
  TilingSprite.prototype.update.call(this);
  this.updateInitialLocation();
  if (!this._initialLocationSetup) return;
  this.updateScroll();
  this.updateFadeOut();
  this.updateFadeIn();
};

Sprite_ImprovedBattleback.prototype.updateInitialLocation = function() {
  if (this._initialLocationSetup) return;
  if (!this._battleField) return;
  if (!this._sprite1) return;
  if (this._sprite1.bitmap.width <= 0) return;
  var bitmap = this.bitmap;
  if (!bitmap) return;
  if (bitmap.width <= 0) return;
  this._initialLocationSetup = true;
  if (Yanfly.Param.IBBScale) {
    this.setupScaling();
  } else {
    this.setupLocationX();
    this.setupLocationY();
  }
};

Sprite_ImprovedBattleback.prototype.setupScaling = function() {
  var ratioX = Graphics.boxWidth / this.bitmap.width;
  var ratioY = Graphics.boxHeight / this.bitmap.height;
  if (ratioX > 1.0) {
    this.scale.x = ratioX;
    this.x = 0;
  } else {
    this.setupLocationX();
  }
  if (ratioY > 1.0) {
    this.scale.y = ratioY;
    this.y = 0;
  } else {
    this.setupLocationY();
  }
};

Sprite_ImprovedBattleback.prototype.setupLocationX = function() {
  var width = this._battleField.width;
  var height = this._battleField.height;
  var sprite1 = this._sprite1;
  this.origin.x = sprite1.x + (this.bitmap.width - width) / 2;
};

Sprite_ImprovedBattleback.prototype.setupLocationY = function() {
  if (!$gameSystem.isSideView()) return;
  var width = this._battleField.width;
  var height = this._battleField.height;
  var sprite1 = this._sprite1;
  this.origin.y = sprite1.y + this.bitmap.height - height;
};

Sprite_ImprovedBattleback.prototype.updateScroll = function() {
  this.origin.x += this._scrollSpeedX;
  this.origin.y += this._scrollSpeedY;
};

Sprite_ImprovedBattleback.prototype.resetScrollSpeeds = function() {
  this._scrollSpeedX = 0;
  this._scrollSpeedY = 0;
};

Sprite_ImprovedBattleback.prototype.setScrollSpeedX = function(value) {
  this._scrollSpeedX = value;
};

Sprite_ImprovedBattleback.prototype.setScrollSpeedY = function(value) {
  this._scrollSpeedY = value;
};

Sprite_ImprovedBattleback.prototype.changeBitmap = function(bitmap) {
  if (!bitmap) return;
  if (bitmap.width <= 0) return;
  this.bitmap = bitmap;
  this._initialLocationSetup = false;
};

Sprite_ImprovedBattleback.prototype.resetFadeSettings = function() {
  this._fadeOutDuration = 0;
  this._fadeInDuration = 0;
};

Sprite_ImprovedBattleback.prototype.setFadeOut = function(duration) {
  this._fadeOutDuration = Math.round(duration);
};

Sprite_ImprovedBattleback.prototype.updateFadeOut = function() {
  if (this._fadeOutDuration <= 0) return;
  var d = this._fadeOutDuration;
  this.opacity = (this.opacity * (d - 1)) / d;
  --this._fadeOutDuration;
};

Sprite_ImprovedBattleback.prototype.setFadeIn = function(duration) {
  this._fadeInDuration = Math.round(duration);
};

Sprite_ImprovedBattleback.prototype.updateFadeIn = function() {
  if (this._fadeInDuration <= 0) return;
  var d = this._fadeInDuration;
  this.opacity = (this.opacity * (d - 1) + 255) / d;
  --this._fadeInDuration;
};

Sprite_ImprovedBattleback.prototype.setOpacity = function(value) {
  this.resetFadeSettings();
  this.opacity = Math.round(value);
};

//=============================================================================
// Spriteset_Battle
//=============================================================================

Spriteset_Battle.prototype.createBattleback = function() {
  this._loadingImages = [null];
  this._battlebackSprites = [null];
  this._battlebackToRemove = [];
  this._back1Sprite = new Sprite_ImprovedBattleback(this.battleback1Bitmap(),1);
  this._battlebackSprites.push(this._back1Sprite);
  this._back2Sprite = new Sprite_ImprovedBattleback(this.battleback2Bitmap(),2);
  this._battlebackSprites.push(this._back2Sprite);
  this._back1Sprite.setup(this._battleField, this._back1Sprite);
  this._back2Sprite.setup(this._battleField, this._back1Sprite);
  this._battleField.addChild(this._back1Sprite);
  this._battleField.addChild(this._back2Sprite);
};

Yanfly.IBB.Spriteset_Battle_updateBattleback =
  Spriteset_Battle.prototype.updateBattleback;
Spriteset_Battle.prototype.updateBattleback = function() {
  Yanfly.IBB.Spriteset_Battle_updateBattleback.call(this);
  if (!Imported.YEP_BattleEngineCore) this.updateBattlebackZCoordinates();
  this.updateBattlebackChangeTo();
  this.updateBattlebackRemoval();
};

Spriteset_Battle.prototype.locateBattleback = function() {
};

Spriteset_Battle.prototype.updateBattlebackZCoordinates = function() {
  this.updateBattlebackGroupRemove();
  this.updateBattlebackGroupAdd();
};

Spriteset_Battle.prototype.updateBattlebackGroupRemove = function() {
  if (!this._battlebackSprites) return;
  var length = this._battlebackSprites.length;
  for (var i = 0; i < length; ++i) {
    var sprite = this._battlebackSprites[i];
    if (sprite) this._battleField.removeChild(sprite);
  }
};

Spriteset_Battle.prototype.updateBattlebackGroupAdd = function() {
  if (!this._battlebackSprites) return;
  var length = this._battlebackSprites.length;
  for (var i = length; i > 0; --i) {
    var sprite = this._battlebackSprites[i];
    if (sprite) this._battleField.addChildAt(sprite, 0);
  }
};

Spriteset_Battle.prototype.setBattlebackScrollSpeedX = function(index, value) {
  if (!this._battlebackSprites) return;
  if (!this._battlebackSprites[index]) return;
  this._battlebackSprites[index].setScrollSpeedX(value);
};

Spriteset_Battle.prototype.setBattlebackScrollSpeedY = function(index, value) {
  if (!this._battlebackSprites) return;
  if (!this._battlebackSprites[index]) return;
  this._battlebackSprites[index].setScrollSpeedY(value);
};

Spriteset_Battle.prototype.resetScrollSpeeds = function(index) {
  if (!this._battlebackSprites) return;
  if (!this._battlebackSprites[index]) return;
  this._battlebackSprites[index].resetScrollSpeeds();
};

Spriteset_Battle.prototype.changeBattlebackTo = 
function(index, folder, file, h) {
  if (!this._battlebackSprites) return;
  if (!this._battlebackSprites[index]) return;
  this._loadingImages[index] = ImageManager.loadBitmap(folder, file, h, true);
};

Spriteset_Battle.prototype.updateBattlebackChangeTo = function() {
  var length = this._battlebackSprites.length;
  var pass = true;
  for (var i = 0; i < length; ++i) {
    var battleback = this._battlebackSprites[i];
    if (!battleback) continue;
    if (!this._loadingImages[i]) continue;
    if (this._loadingImages[i].width <= 0) {
      pass = false;
      break;
    }
  }
  if (!pass) return;
  for (var i = 0; i < length; ++i) {
    var battleback = this._battlebackSprites[i];
    if (!battleback) continue;
    if (!this._loadingImages[i]) continue;
    battleback.changeBitmap(this._loadingImages[i]);
    this._loadingImages[i] = null;
  }
};

Spriteset_Battle.prototype.battlebackFadeOut = function(index, duration) {
  if (!this._battlebackSprites) return;
  if (!this._battlebackSprites[index]) return;
  this._battlebackSprites[index].setFadeOut(duration);
};

Spriteset_Battle.prototype.battlebackFadeIn = function(index, duration) {
  if (!this._battlebackSprites) return;
  if (!this._battlebackSprites[index]) return;
  this._battlebackSprites[index].setFadeIn(duration);
};

Spriteset_Battle.prototype.battlebackOpacity = function(index, value) {
  if (!this._battlebackSprites) return;
  if (!this._battlebackSprites[index]) return;
  this._battlebackSprites[index].setOpacity(value);
};

Spriteset_Battle.prototype.addNewBattleback = 
function(index, bitmap, opacity, duration) {
  if (index <= 2) return;
  if (!this._battlebackSprites) return;
  if (this._battlebackSprites[index]) return;
  opacity = opacity || 0;
  if (duration === undefined) duration = 20;
  var battleback = new Sprite_ImprovedBattleback(bitmap, 3);
  battleback.setup(this._battleField, this._back1Sprite);
  battleback.setOpacity(opacity);
  battleback.setFadeIn(duration);
  this._battlebackSprites[index] = battleback;
  this.updateBattlebackZCoordinates();
};

Spriteset_Battle.prototype.removeBattleback = function(index, duration) {
  if (index <= 2) return;
  if (!this._battlebackSprites) return;
  if (!this._battlebackSprites[index]) return;
  if (duration === undefined) duration = 20;
  this._battlebackSprites[index].setFadeOut(duration);
  this._battlebackToRemove.push(index);
};

Spriteset_Battle.prototype.updateBattlebackRemoval = function() {
  var length = this._battlebackToRemove.length;
  var toRemove = [];
  for (var i = 0; i < length; ++i) {
    var id = this._battlebackToRemove[i];
    var battleback = this._battlebackSprites[id];
    if (battleback && battleback.opacity > 0) continue;
    this._battlebackSprites.splice(id, 1);
    if (!this._battlebackSprites[id]) toRemove.push(i);
  }
  var length = toRemove.length;
  for (var i = 0; i < length; ++i) {
    var id = toRemove[i];
    if (!this._battlebackSprites[id]) {
      var index = this._battlebackToRemove.indexOf(id);
      this._battlebackToRemove.splice(index, 1);
    }
  }
};

//=============================================================================
// End of File
//=============================================================================