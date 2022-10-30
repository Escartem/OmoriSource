//=============================================================================
// Yanfly Engine Plugins - Event Step Animation Options
// YEP_EventStepAniOpt.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_EventStepAniOpt = true;

var Yanfly = Yanfly || {};
Yanfly.EvStAni = Yanfly.EvStAni || {};
Yanfly.EvStAni.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Stuff
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * To offset sprites using the event notetags, using the following below:
 *
 * Event Notetags:
 *
 *   <Step Animation: Left to Right>
 *   - Makes the event sprite's step behavior go from frame 0 to 1 to 2, then
 *   back to 0 instead of looping backwards.
 *
 *   <Step Animation: Right to Left>
 *   - Makes the event sprite's step behavior go from frame 2 to 1 to 0, then
 *   back to 2 instead of looping forwards.
 *
 *   <Step Animation: Spin Clockwise>
 *   <Step Animation: Spin CW>
 *   - Makes the event sprite's step behavior spin itself clockwise.
 *
 *   <Step Animation: Spin CounterClockwise>
 *   <Step Animation: Spin CCW>
 *   <Step Animation: Spin AntiClockwise>
 *   <Step Animation: Spin ACW>
 *   - Makes the event sprite's step behavior spin itself counterclockwise.
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
 *   <Step Animation: Left to Right>
 *   - Makes the event sprite's step behavior go from frame 0 to 1 to 2, then
 *   back to 0 instead of looping backwards.
 *   *NOTE*: This will take priority over event notetag step animations.
 *
 *   <Step Animation: Right to Left>
 *   - Makes the event sprite's step behavior go from frame 2 to 1 to 0, then
 *   back to 2 instead of looping forwards.
 *   *NOTE*: This will take priority over event notetag step animations.
 *
 *   <Step Animation: Spin Clockwise>
 *   <Step Animation: Spin CW>
 *   - Makes the event sprite's step behavior spin itself clockwise.
 *   *NOTE*: This will take priority over event notetag step animations.
 *
 *   <Step Animation: Spin CounterClockwise>
 *   <Step Animation: Spin CCW>
 *   <Step Animation: Spin AntiClockwise>
 *   <Step Animation: Spin ACW>
 *   - Makes the event sprite's step behavior spin itself counterclockwise.
 *   *NOTE*: This will take priority over event notetag step animations.
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

Yanfly.EvStAni.Game_CharacterBase_updatePattern =
  Game_CharacterBase.prototype.updatePattern;
Game_CharacterBase.prototype.updatePattern = function() {
  if (this._stepAnimationBehavior && this._stepAnimationBehavior !== 'LOOP') {
    if (this.hasStepAnime()) {
      return this.updateStepAnimationBehavior();
    }
  }
  Yanfly.EvStAni.Game_CharacterBase_updatePattern.call(this);
};

Game_CharacterBase.prototype.updateStepAnimationBehavior = function() {
  // Left to Right
  if (this._stepAnimationBehavior === 'LEFT TO RIGHT') {
    this._pattern += 1;
    if (this._pattern > 2) this._pattern = 0;

  // Right to Left
  } else if (this._stepAnimationBehavior === 'RIGHT TO LEFT') {
    this._pattern -= 1;
    if (this._pattern < 0) this._pattern = 2;

  // Spin Clockwise
  } else if (this._stepAnimationBehavior === 'SPIN CLOCKWISE') {
    this.turnRight90();

  // Spin Clockwise
  } else if (this._stepAnimationBehavior === 'SPIN CW') {
    this.turnRight90();

  // Spin CounterClockwise
  } else if (this._stepAnimationBehavior === 'SPIN COUNTERCLOCKWISE') {
    this.turnLeft90();

  // Spin CounterClockwise
  } else if (this._stepAnimationBehavior === 'SPIN CCW') {
    this.turnLeft90();

  // Spin CounterClockwise
  } else if (this._stepAnimationBehavior === 'SPIN ANTICLOCKWISE') {
    this.turnLeft90();

  // Spin CounterClockwise
  } else if (this._stepAnimationBehavior === 'SPIN ACW') {
    this.turnLeft90();

  }
};

//=============================================================================
// Game_Event
//=============================================================================

Yanfly.EvStAni.Game_Event_setupPageSettings =
  Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
  Yanfly.EvStAni.Game_Event_setupPageSettings.call(this);
  this.setupSpriteStepAnimationOptions();
};

Game_Event.prototype.setupSpriteStepAnimationOptions = function() {
  this._stepAnimationBehavior = 'LOOP';
  this.setupStepAnimationOptionNotetags();
  this.setupStepAnimationOptionCommentTags();
};

Game_Event.prototype.setupStepAnimationOptionNotetags = function() {
  if (this.event().note === '') return;
  var note1 = /<STEP ANIMATION:[ ](.*)>/i;
  if (this.event().note.match(note1)) {
    this._stepAnimationBehavior = String(RegExp.$1).toUpperCase().trim();
  }
};

Game_Event.prototype.setupStepAnimationOptionCommentTags = function() {
  if (!this.page()) return;
  var note1 = /<STEP ANIMATION:[ ](.*)>/i;
  var list = this.list();
  var length = list.length;
  for (var i = 0; i < length; ++i) {
    var ev = list[i];
    if ([108, 408].contains(ev.code)) {
      if (ev.parameters[0].match(note1)) {
        this._stepAnimationBehavior = String(RegExp.$1).toUpperCase().trim();
      }
    }
  }
};

//=============================================================================
// End of File
//=============================================================================