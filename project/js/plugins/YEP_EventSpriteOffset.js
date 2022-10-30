//=============================================================================
// Yanfly Engine Plugins - Event Sprite Offset
// YEP_EventSpriteOffset.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_EventSpriteOffset = true;

var Yanfly = Yanfly || {};
Yanfly.EvSpOf = Yanfly.EvSpOf || {};
Yanfly.EvSpOf.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 Offset event sprites using notetags and comment tags!
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Events are bound to their tiles and their sprites are bound to their events.
 * Naturally, this would mean that the sprites would be bound to the tiles,
 * too, but sometimes, we'd like to offset the appearance of sprites so that
 * they don't look super uniform all of the time. This plugin gives you the
 * ability to offset sprites visually using notetags comment tags.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * To offset sprites using the event notetags, using the following below:
 *
 * Event Notetags:
 *
 *   <Sprite Offset X: +n>
 *   <Sprite Offset X: -n>
 *   - Replace 'n' with the number of pixels you wish to offset the horizontal
 *   position of the sprite by. A positive number moves the sprite to the
 *   right. A negative number moves the sprite to the left.
 *
 *   <Sprite Offset Y: +n>
 *   <Sprite Offset Y: -n>
 *   - Replace 'n' with the number of pixels you wish to offset the vertical
 *   position of the sprite by. A positive number moves the sprite down. A
 *   negative number moves the sprite up.
 *
 *   <Sprite Offset: +x, +y>
 *   <Sprite Offset: -x, -y>
 *   - If you wish to put sprite offset information on one line, use the above
 *   comment tag instead. Replace 'x' and 'y' with the values to offset the
 *   sprite by. Positive x will move the sprite right. Negative x will move the
 *   sprite left. Positive y will move the sprite down. Negative y will move
 *   the sprite up.
 *
 * ============================================================================
 * Comment Tags
 * ============================================================================
 *
 * To offset sprites using comments, make comments for each event page you want
 * the sprite to be offset in using the comment tags below:
 *
 * Comment Tags:
 *
 *   <Sprite Offset X: +n>
 *   <Sprite Offset X: -n>
 *   - Replace 'n' with the number of pixels you wish to offset the horizontal
 *   position of the sprite by. A positive number moves the sprite to the
 *   right. A negative number moves the sprite to the left.
 *   *NOTE*: This will take priority over event notetag sprite offsets.
 *
 *   <Sprite Offset Y: +n>
 *   <Sprite Offset Y: -n>
 *   - Replace 'n' with the number of pixels you wish to offset the vertical
 *   position of the sprite by. A positive number moves the sprite down. A
 *   negative number moves the sprite up.
 *   *NOTE*: This will take priority over event notetag sprite offsets.
 *
 *   <Sprite Offset: +x, +y>
 *   <Sprite Offset: -x, -y>
 *   - If you wish to put sprite offset information on one line, use the above
 *   comment tag instead. Replace 'x' and 'y' with the values to offset the
 *   sprite by. Positive x will move the sprite right. Negative x will move the
 *   sprite left. Positive y will move the sprite down. Negative y will move
 *   the sprite up.
 *   *NOTE*: This will take priority over event notetag sprite offsets.
 *
 * ============================================================================
 * Custom Movement Route - Script Calls
 * ============================================================================
 * 
 * If you wish to change an event sprite's offset after a page has been loaded,
 * you can issue a custom movement route script calls to alter it:
 *
 * Script Call:
 *
 *   this._spriteOffsetX = n
 *   this._spriteOffsetY = n
 *   - This sets the sprite offset X or Y values to 'n'. The same rules apply
 *   as the comment tags. A positive X goes right, a negative X goes left. A
 *   positive Y goes down, a negative Y goes up.
 *
 *   this._spriteOffsetX += n
 *   this._spriteOffsetY += n
 *   - Increases the sprite's offset X or Y by 'n'. The same rules apply as the
 *   comment tags. A positive X goes right, a negative X goes left. A positive
 *   Y goes down, a negative Y goes up.
 *
 *   this._spriteOffsetX -= n
 *   this._spriteOffsetY -= n
 *   - Decreases the sprite's offset X or Y by 'n'. The same rules apply as the
 *   comment tags. A positive X goes right, a negative X goes left. A positive
 *   Y goes down, a negative Y goes up.
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
 */
//=============================================================================

//=============================================================================
// Game_CharacterBase
//=============================================================================

Yanfly.EvSpOf.Game_CharacterBase_initMembers =
  Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
  Yanfly.EvSpOf.Game_CharacterBase_initMembers.call(this);
  this.initSpriteOffsets();
};

Game_CharacterBase.prototype.initSpriteOffsets = function() {
  this._spriteOffsetX = 0;
  this._spriteOffsetY = 0;
};

Yanfly.EvSpOf.Game_CharacterBase_screenX = Game_CharacterBase.prototype.screenX;
Game_CharacterBase.prototype.screenX = function() {
  var value = Yanfly.EvSpOf.Game_CharacterBase_screenX.call(this);
  value += this.spriteOffsetX();
  return Math.round(value);
};

Yanfly.EvSpOf.Game_CharacterBase_screenY = Game_CharacterBase.prototype.screenY;
Game_CharacterBase.prototype.screenY = function() {
  var value = Yanfly.EvSpOf.Game_CharacterBase_screenY.call(this);
  value += this.spriteOffsetY();
  return Math.round(value);
};

Game_CharacterBase.prototype.spriteOffsetX = function() {
  if (this._spriteOffsetX === undefined) this.initSpriteOffsets();
  var value = this._spriteOffsetX;
  return value;
};

Game_CharacterBase.prototype.spriteOffsetY = function() {
  if (this._spriteOffsetY === undefined) this.initSpriteOffsets();
  var value = this._spriteOffsetY;
  return value;
};

//=============================================================================
// Game_Event
//=============================================================================

Yanfly.EvSpOf.Game_Event_setupPageSettings =
  Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
  Yanfly.EvSpOf.Game_Event_setupPageSettings.call(this);
  this.setupSpriteOffsets();
};

Game_Event.prototype.setupSpriteOffsets = function() {
  this.initSpriteOffsets();
  this.setupNotetagSpriteOffsets();
  this.setupCommentTagSpriteOffsets();
};

Game_Event.prototype.setupNotetagSpriteOffsets = function() {
  if (this.event().note === '') return;
  var note1 = /<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i;
  var note2 = /<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i;
  var note3 = /<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i;
  if (this.event().note.match(note1)) {
    this._spriteOffsetX = parseInt(RegExp.$1);
  }
  if (this.event().note.match(note2)) {
    this._spriteOffsetY = parseInt(RegExp.$1);
  }
  if (this.event().note.match(note3)) {
    this._spriteOffsetX = parseInt(RegExp.$1);
    this._spriteOffsetY = parseInt(RegExp.$2);
  }
};

Game_Event.prototype.setupCommentTagSpriteOffsets = function() {
  if (!this.page()) return;
  var note1 = /<SPRITE OFFSET X:[ ]([\+\-]\d+)>/i;
  var note2 = /<SPRITE OFFSET Y:[ ]([\+\-]\d+)>/i;
  var note3 = /<SPRITE OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i;
  var list = this.list();
  var length = list.length;
  for (var i = 0; i < length; ++i) {
    var ev = list[i];
    if ([108, 408].contains(ev.code)) {
      if (ev.parameters[0].match(note1)) {
        this._spriteOffsetX = parseInt(RegExp.$1);
      }
      if (ev.parameters[0].match(note2)) {
        this._spriteOffsetY = parseInt(RegExp.$1);
      }
      if (ev.parameters[0].match(note3)) {
        this._spriteOffsetX = parseInt(RegExp.$1);
        this._spriteOffsetY = parseInt(RegExp.$2);
      }
    }
  }
};

//=============================================================================
// End of File
//=============================================================================