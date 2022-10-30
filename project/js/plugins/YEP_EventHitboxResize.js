//=============================================================================
// Yanfly Engine Plugins - Event Hitbox Resize
// YEP_EventHitboxResize.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_EventHitboxResize = true;

var Yanfly = Yanfly || {};
Yanfly.EvHbRs = Yanfly.EvHbRs || {};
Yanfly.EvHbRs.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 Allows you to make larger event hitboxes, making the event
 * able to be triggered from multiple tiles.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Events usually have a 1x1 tile-large hitbox. However, in some cases, you'd
 * eventually like to have a bigger object to interact with or would like to
 * expand the reach of an event's trigger area by a certain amount. This plugin
 * allows you to adjust the sizes of any event's hitbox through notetags and/or
 * comment tags.
 *
 * ============================================================================
 * Notetags and Comment Tags
 * ============================================================================
 *
 * To make an event's hitbox larger, use either notetags or comment tags to
 * apply the hitbox enlargement. If a notetag is used, this will apply to the
 * event no matter what the page is. If a comment tag is used, it will
 * overwrite whatever setting the notetags have.
 *
 * Event Notetag and Comment Tags:
 *
 *   <Hitbox Up: x>
 *   <Hitbox Left: x>
 *   <Hitbox Right: x>
 *   <Hitbox Down: x>
 *   - This will expand the hitbox upward, left, right, or down by x. The value
 *   inserted for x will extend the hitbox that direction by that many tiles.
 *   If any of these notetags are used, it will make the event immobile, unable
 *   to move unless the movement type is set to "Through", allowing it to pass
 *   through anything.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.00:
 * - Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 */
//=============================================================================

//=============================================================================
// Game_CharacterBase
//=============================================================================

Yanfly.EvHbRs.Game_CharacterBase_pos = Game_CharacterBase.prototype.pos;
Game_CharacterBase.prototype.pos = function(x, y) {
  if (this._addedHitboxUp !== undefined) {
    return this.isWithinHitboxes(x, y);
  } else {
    return Yanfly.EvHbRs.Game_CharacterBase_pos.call(this, x, y);
  }
};

Game_CharacterBase.prototype.isWithinHitboxes = function(x, y) {
  var left = this.x - this._addedHitboxLeft;
  var right = this.x + this._addedHitboxRight;
  var up = this.y - this._addedHitboxUp;
  var down = this.y + this._addedHitboxDown;
  return left <= x && x <= right && up <= y && y <= down;
};

Yanfly.EvHbRs.Game_CharacterBase_canPass = Game_CharacterBase.prototype.canPass;
Game_CharacterBase.prototype.canPass = function(x, y, d) {
  if (this._addedHitboxUp || this._addedHitboxLeft || this._addedHitboxRight ||
    this._addedHitboxDown) return this.isThrough();
  return Yanfly.EvHbRs.Game_CharacterBase_canPass.call(this, x, y, d);
};

Yanfly.EvHbRs.Game_CharBase_canPassDia =
  Game_CharacterBase.prototype.canPassDiagonally;
Game_CharacterBase.prototype.canPassDiagonally = function(x, y, horz, vert) {
  if (this._addedHitboxUp || this._addedHitboxLeft || this._addedHitboxRight ||
    this._addedHitboxDown) return this.isThrough();
  return Yanfly.EvHbRs.Game_CharBase_canPassDia.call(this, x, y, horz, vert);
};

//=============================================================================
// Game_Event
//=============================================================================

Yanfly.EvHbRs.Game_Event_setupPage = Game_Event.prototype.setupPage;
Game_Event.prototype.setupPage = function() {
  Yanfly.EvHbRs.Game_Event_setupPage.call(this);

  this._addedHitboxUp = 0;
  this._addedHitboxLeft = 0;
  this._addedHitboxRight = 0;
  this._addedHitboxDown = 0;

  this.setupEventHitboxResizeNotetags();
  this.setupEventHitboxResizeCommentTags();
};

Game_Event.prototype.setupEventHitboxResizeNotetags = function() {
  if (this.event().note === '') return;
  if (this.event().note.match(/<Hitbox (?:HEIGHT|UP):[ ](\d+)>/i)) {
    this._addedHitboxUp = parseInt(RegExp.$1);
  }
  if (this.event().note.match(/<Hitbox Left:[ ](\d+)>/i)) {
    this._addedHitboxLeft = parseInt(RegExp.$1);
  }
  if (this.event().note.match(/<Hitbox Right:[ ](\d+)>/i)) {
    this._addedHitboxRight = parseInt(RegExp.$1);
  }
  if (this.event().note.match(/<Hitbox Down:[ ](\d+)>/i)) {
    this._addedHitboxDown = parseInt(RegExp.$1);
  }
};

Game_Event.prototype.setupEventHitboxResizeCommentTags = function() {
  if (!this.page()) return;
  
  var list = this.list();
  var length = list.length;
  for (var i = 0; i < length; ++i) {
    var ev = list[i];
    if ([108, 408].contains(ev.code)) {
      if (ev.parameters[0].match(/<Hitbox (?:HEIGHT|UP):[ ](\d+)>/i)) {
        this._addedHitboxUp = parseInt(RegExp.$1);
      } else if (ev.parameters[0].match(/<Hitbox Left:[ ](\d+)>/i)) {
        this._addedHitboxLeft = parseInt(RegExp.$1);
      } else if (ev.parameters[0].match(/<Hitbox Right:[ ](\d+)>/i)) {
        this._addedHitboxRight = parseInt(RegExp.$1);
      } else if (ev.parameters[0].match(/<Hitbox Down:[ ](\d+)>/i)) {
        this._addedHitboxDown = parseInt(RegExp.$1);
      }
    }
  }
};

//=============================================================================
// End of File
//=============================================================================