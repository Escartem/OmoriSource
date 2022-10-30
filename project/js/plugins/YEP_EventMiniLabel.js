//=============================================================================
// Yanfly Engine Plugins - Event Mini Label
// YEP_EventMiniLabel.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_EventMiniLabel = true;

var Yanfly = Yanfly || {};
Yanfly.EML = Yanfly.EML || {};
Yanfly.EML.version = 1.12

//=============================================================================
 /*:
 * @plugindesc v1.12 Creates miniature-sized labels over events to allow
 * you to insert whatever text you'd like in them.
 * @author Yanfly Engine Plugins
 *
 * @param Default Show
 * @desc Show mini labels by default?
 * @type boolean
 * @on YES
 * @off NO
 * NO - false     YES - true
 * @default true
 *
 * @param Minimum Width
 * @type number
 * @min 1
 * @desc What is the minimum width in pixels for mini labels?
 * @default 136
 *
 * @param Font Size
 * @type number
 * @min 1
 * @desc What is the font size used for text inside a mini label?
 * Default: 28
 * @default 20
 *
 * @param X Buffer
 * @type number
 * @desc Alter the X position of the label by this much.
 * @default 0
 *
 * @param Y Buffer
 * @type number
 * @desc Alter the Y position of the label by this much.
 * @default 36
 *
 * @param Battle Transition
 * @type boolean
 * @on YES
 * @off NO
 * @desc Show Event Mini label during battle transition?
 * NO - false     YES - true
 * @default false
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin lets you place text above the heads of various events using a
 * miniature label through a comment tag.
 *
 * ============================================================================
 * Comment Tags
 * ============================================================================
 *
 * Comment tags are 'notetags' used within the lines of an event's comments.
 * The reason I'm using the comment tags instead of the notetags is because
 * each page of an event can yield a different potential name.
 *
 * To use this, make a comment within the event you wish to make the mini
 * label for and insert the following:
 *
 *   <Mini Label: text>
 *   This will display the 'text' above the event. You can use text codes for
 *   this comment tag and it will create dynamic messages.
 *
 *   <Mini Label Font Size: x>
 *   This will change the font size used for the mini label to x. If this tag
 *   isn't used, the font size will be the default value in the parameters.
 *
 *   <Mini Label X Buffer: +x>
 *   <Mini Label X Buffer: -x>
 *   This will adjust the X buffer for the mini label by x value. If this tag
 *   isn't used, the X buffer will be the default value in the parameters.
 *
 *   <Mini Label Y Buffer: +x>
 *   <Mini Label Y Buffer: -x>
 *   This will adjust the Y buffer for the mini label by x value. If this tag
 *   isn't used, the Y buffer will be the default value in the parameters.
 *
 *   <Always Show Mini Label>
 *   This will make the mini label to always be shown, even when the plugin
 *   command to hide mini labels is used.
 *
 *   <Mini Label Range: x>
 *   The player will have to be within x tiles of this event in order for the
 *   mini label to appear visibly.
 *
 *   <Mini Label Require Facing>
 *   This will require the player to be facing the direction of the event in
 *   order for the mini label to appear.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * If you would like to shut off the Event Mini Label mid-game or turn it on,
 * you can use the following plugin commands:
 *
 * Plugin Command:
 *
 *   HideMiniLabel
 *   Hides all Event Mini Label.
 *
 *   ShowMiniLabel
 *   Shows all Event Mini Label.
 *
 *   RefreshMiniLabel
 *   Refreshes all Event Mini Labels on the map.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.12:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.11:
 * - Added 'Battle Transition' plugin parameter. Enabling this will allow you
 * to show the Event Mini Labels during the battle transition. Keeping it
 * disabled will hide them during the transition.
 *
 * Version 1.10:
 * - Mini Windows will now readjust their size to show at normal scale if the
 * map is zoomed in.
 *
 * Version 1.09:
 * - Fixed a bug that caused Mini Labels that started off as hidden to remain
 * hidden even after turning the Mini Labels on.
 *
 * Version 1.08:
 * - Added <Mini Label Require Facing> comment tag.
 * - Moved the priority of the Mini Labels to be later added to the spriteset
 * so they can stay on top of more effects.
 *
 * Version 1.07:
 * - Added more padding space so text doesn't get cut off.
 *
 * Version 1.06:
 * - Fixed a bug that caused some mini labels to show if the event was loaded
 * onto the map without any currently active pages.
 *
 * Version 1.05:
 * - Added 'X Buffer' plugin parameter and the <Mini Label X Buffer: +x> and
 * <Mini Label X Buffer: -x> comment tags to alter the X position of the event
 * mini label.
 *
 * Version 1.04:
 * - Added 'RefreshMiniLabel' plugin command to allow you to manually refresh
 * all mini labels on the map.
 *
 * Version 1.03:
 * - Optimized updating performance to reduce lag on maps with many events.
 *
 * Version 1.01:
 * - Fixed a bug that didn't update event labels under certain page conditions.
 * - Added <Mini Label Range: x> notetag.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_EventMiniLabel');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.EMWDefaultShow = eval(String(Yanfly.Parameters['Default Show']));
Yanfly.Param.EMWMinWidth = Number(Yanfly.Parameters['Minimum Width']);
Yanfly.Param.EMWFontSize = Number(Yanfly.Parameters['Font Size']);
Yanfly.Param.EMWBufferX = Number(Yanfly.Parameters['X Buffer']);
Yanfly.Param.EMWBufferY = Number(Yanfly.Parameters['Y Buffer']);
Yanfly.Param.EMWBatTran = eval(String(Yanfly.Parameters['Battle Transition']));

//=============================================================================
// Game_System
//=============================================================================

Yanfly.EML.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Yanfly.EML.Game_System_initialize.call(this);
    this.initEventMiniLabel();
};

Game_System.prototype.initEventMiniLabel = function() {
    this._showEventMiniLabel = Yanfly.Param.EMWDefaultShow;
};

Game_System.prototype.isShowEventMiniLabel = function() {
    if (this._showEventMiniLabel === undefined) this.initEventMiniLabel();
    return this._showEventMiniLabel;
};

Game_System.prototype.setEventMiniLabel = function(value) {
    this._showEventMiniLabel = value;
    Game_Interpreter.prototype.refreshEventMiniLabel.call(this);
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.EML.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.EML.Game_Interpreter_pluginCommand.call(this, command, args)
  if (command === 'HideMiniLabel') $gameSystem.setEventMiniLabel(false);
  if (command === 'ShowMiniLabel') $gameSystem.setEventMiniLabel(true);
  if (command === 'RefreshMiniLabel') this.refreshEventMiniLabel();
};

Game_Interpreter.prototype.refreshEventMiniLabel = function() {
    if ($gameParty.inBattle()) return;
    var scene = SceneManager._scene;
    if (scene instanceof Scene_Map) {
      scene.refreshAllMiniLabels();
    }
};

//=============================================================================
// Window_EventMiniLabel
//=============================================================================

function Window_EventMiniLabel() {
    this.initialize.apply(this, arguments);
}

Window_EventMiniLabel.prototype = Object.create(Window_Base.prototype);
Window_EventMiniLabel.prototype.constructor = Window_EventMiniLabel;

Window_EventMiniLabel.prototype.initialize = function() {
    this._bufferX = Yanfly.Param.EMWBufferX;
    this._bufferY = Yanfly.Param.EMWBufferY;
    this._fontSize = Yanfly.Param.EMWFontSize;
    this._alwaysShow = false;
    var width = Yanfly.Param.EMWMinWidth;
    var height = this.windowHeight();
    this._range = 500;
    this._reqFacing = false;
    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
    this.opacity = 0;
    this.contentsOpacity = 0;
    this._character = null;
    this._page = 0;
    this._text = '';
};

Window_EventMiniLabel.prototype.standardFontSize = function() {
    if (this._fontSize !== undefined) return this._fontSize;
    return Yanfly.Param.EMWFontSize;
};

Window_EventMiniLabel.prototype.windowHeight = function() {
    var height = this.fittingHeight(1)
    height = Math.max(height, 36 + this.standardPadding() * 2);
    return height;
};

Window_EventMiniLabel.prototype.lineHeight = function() {
    return this.standardFontSize() + 8;
};

Window_EventMiniLabel.prototype.bufferX = function() {
    if (this._bufferX !== undefined) return this._bufferX;
    return Yanfly.Param.EMWBufferX;
};

Window_EventMiniLabel.prototype.bufferY = function() {
    if (this._bufferY !== undefined) return this._bufferY;
    return Yanfly.Param.EMWBufferY;
};

Window_EventMiniLabel.prototype.setCharacter = function(character) {
    this.setText('');
    this._character = character;
    if (character._eventId) this.gatherDisplayData();
};

Window_EventMiniLabel.prototype.gatherDisplayData = function() {
    this._page = this._character.page();
    this._pageIndex = this._character._pageIndex;
    this._range = 500;
    this._bufferY = Yanfly.Param.EMWBufferY;
    this._fontSize = Yanfly.Param.EMWFontSize;
    this._alwaysShow = false;
    this._reqFacing = false;
    if (!this._character.page()) {
      return this.visible = false;
    }
    var list = this._character.list();
    var max = list.length;
    var comment = '';
    for (var i = 0; i < max; ++i) {
      var ev = list[i];
      if ([108, 408].contains(ev.code)) comment += ev.parameters[0] + '\n';
    }
    this.extractNotedata(comment);
};

Window_EventMiniLabel.prototype.extractNotedata = function(comment) {
  if (comment === '') return;
  var tag1 = /<(?:MINI WINDOW|MINI LABEL):[ ](.*)>/i;
  var tag2 = /<(?:MINI WINDOW FONT SIZE|MINI LABEL FONT SIZE):[ ](\d+)>/i;
  var tag3 = /<(?:MINI WINDOW Y BUFFER|MINI LABEL Y BUFFER):[ ]([\+\-]\d+)>/i;
  var tag4 = /<(?:ALWAYS SHOW MINI WINDOW|ALWAYS SHOW MINI LABEL)>/i;
  var tag5 = /<(?:MINI WINDOW RANGE|MINI LABEL RANGE):[ ](\d+)>/i;
  var tag6 = /<(?:MINI WINDOW X BUFFER|MINI LABEL X BUFFER):[ ]([\+\-]\d+)>/i;
  var tag7 = /<(?:MINI WINDOW REQUIRE FACING|MINI LABEL REQUIRE FACING)>/i;
  var notedata = comment.split(/[\r\n]+/);
  var text = '';
  for (var i = 0; i < notedata.length; ++i) {
    var line = notedata[i];
    if (line.match(tag1)) {
      text = String(RegExp.$1);
    } else if (line.match(tag2)) {
      this._fontSize = parseInt(RegExp.$1);
    } else if (line.match(tag3)) {
      this._bufferY = parseInt(RegExp.$1);
    } else if (line.match(tag4)) {
      this._alwaysShow = true;
    } else if (line.match(tag5)) {
      this._range = parseInt(RegExp.$1);
    } else if (line.match(tag6)) {
      this._bufferX = parseInt(RegExp.$1);
    } else if (line.match(tag7)) {
      this._reqFacing = true;
    }
  }
  this.setText(text);
  if (this._text === '' || !$gameSystem.isShowEventMiniLabel()) {
    this.visible = false;
    this.contentsOpacity = 0;
  } else {
    this.visible = true;
    if (this._reqFacing) {
      this.contentsOpacity = 0;
    } else {
      this.contentsOpacity = 255;
    }
  }

};

Window_EventMiniLabel.prototype.setText = function(text) {
    if (this._text === text) return;
    this._text = text;
    this.refresh();
};

Window_EventMiniLabel.prototype.refresh = function() {
    if (Imported.YEP_SelfSwVar) {
      $gameTemp.setSelfSwVarEvent(this._character._mapId, this._character._eventId);
    }
    this.contents.clear();
    var txWidth = this.textWidthEx(this._text);
    txWidth += this.textPadding() * 2;
    var width = txWidth;
    this.width = Math.max(width, Yanfly.Param.EMWMinWidth);
    this.width += this.standardPadding() * 2;
    this.height = this.windowHeight();
    this.createContents();
    var wx = (this.contents.width - txWidth) / 2;
    var wy = 0;
    this.drawTextEx(this._text, wx + this.textPadding(), wy);
    if (Imported.YEP_SelfSwVar) $gameTemp.clearSelfSwVarEvent();
};

Window_EventMiniLabel.prototype.forceRefresh = function() {
    this.refresh();
    this.updateOpacity();
};

Window_EventMiniLabel.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height);
};

Window_EventMiniLabel.prototype.update = function() {
    Window_Base.prototype.update.call(this);
    if (!this._character) return;
    if (!this._character._eventId) return;
    this.updatePage();
    if (this._text === '') return;
    this.updateOpacity();
};

Window_EventMiniLabel.prototype.updatePage = function() {
    if (this._pageIndex === this._character._pageIndex) return;
    this._pageIndex = this._character._pageIndex;
    this.contents.clear();
    this._text = '';
    this.gatherDisplayData();
};

Window_EventMiniLabel.prototype.updateOpacity = function() {
    if (this.showMiniLabel()) {
      this.show();
    } else {
      this.hide();
    }
};

Window_EventMiniLabel.prototype.show = function() {
    if (this.contentsOpacity >= 255) return;
    this.contentsOpacity += 16;
    this.visible = true;
};

Window_EventMiniLabel.prototype.hide = function() {
    if (this.contentsOpacity <= 0) {
      if (this.visible) this.visible = false;
      return;
    }
    this.contentsOpacity -= 16;
};

Window_EventMiniLabel.prototype.showMiniLabel = function() {
    if (this._alwaysShow) return true;
    if (!this.withinRange()) return false;
    if (!this.meetsFacingRequirements()) return false;
    if (!Yanfly.Param.EMWBatTran) {
      if (SceneManager._scene._encounterEffectDuration > 0) {
        this.contentsOpacity = 0;
        return false;
      }
    }
    return $gameSystem.isShowEventMiniLabel();
};

Window_EventMiniLabel.prototype.withinRange = function() {
    if (this._range >= 500) return true;
    var player = $gamePlayer;
    var chara = this._character;
    if (this._range >= Math.abs(player.x - chara.x)) {
      if (this._range >= Math.abs(player.y - chara.y)) {
        return true;
      }
    }
    return false;
};

Window_EventMiniLabel.prototype.meetsFacingRequirements = function() {
  if (!this._character) return true;
  if (!this._reqFacing) return true;
  var direction = $gamePlayer.direction();
  var playerX = $gamePlayer.x;
  var playerY = $gamePlayer.y;
  var eventX = this._character.x;
  var eventY = this._character.y;
  switch (direction) {
  case 1:
    return playerX >= eventX && playerY <= eventY;
    break;
  case 2:
    return playerY <= eventY;
    break;
  case 3:
    return playerX <= eventX && playerY <= eventY;
    break;
  case 4:
    return playerX >= eventX;
    break;
  case 6:
    return playerX <= eventX;
    break;
  case 7:
    return playerX >= eventX && playerY >= eventY;
    break;
  case 8:
    return playerY >= eventY;
    break;
  case 9:
    return playerX <= eventX && playerY >= eventY;
    break;
  default:
    return true;
    break;
  }
};

//=============================================================================
// Sprite_Character
//=============================================================================

Yanfly.EML.Sprite_Character_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() {
    Yanfly.EML.Sprite_Character_update.call(this);
    this.updateMiniLabel();
    this.updateMiniLabelZoom();
};

Sprite_Character.prototype.updateMiniLabel = function() {
    this.setupMiniLabel();
    if (!this._miniLabel) return;
    this.positionMiniLabel();
};

Sprite_Character.prototype.setupMiniLabel = function() {
    if (this._miniLabel) {
      if(this._miniLabel._text !== "") {
        if(!this._miniLabel.parent) {
          SceneManager._scene._spriteset.addChild(this._miniLabel);
        }
      }
      else if(this._miniLabel._text === "") {
        if(!!this._miniLabel.parent) {
          this._miniLabel.parent.removeChild(this._miniLabel);
        }        
      }
      return;
    }
    if (!SceneManager._scene._spriteset) return;
    this._miniLabel = new Window_EventMiniLabel();
    this._miniLabel.setCharacter(this._character);
    //this.parent.parent.addChild(this._miniLabel);
    if(this._miniLabel._text === "") {return;}
    SceneManager._scene._spriteset.addChild(this._miniLabel);
};

Sprite_Character.prototype.positionMiniLabel = function() {
    if(!this._miniLabel.parent) {return;}
    var win = this._miniLabel;
    var width = win.width * win.scale.x;
    win.x = this.x + width / -2 + win.bufferX();
    var height = win.height * win.scale.y;
    var buffer = win.bufferY() * win.scale.y;
    win.y = this.y + (this.height * -1) - height + buffer;
};

Sprite_Character.prototype.updateMiniLabelZoom = function() {
  if (!this._miniLabel) return;
  if (!this._miniLabel.parent) {return;}
  var spriteset = SceneManager._scene._spriteset;
  this._miniLabel.scale.x = 1 / spriteset.scale.x;
  this._miniLabel.scale.y = 1 / spriteset.scale.y;
};

Sprite_Character.prototype.refreshMiniLabel = function() {
    if (this._miniLabel) this._miniLabel.forceRefresh();
};

//=============================================================================
// Scene_Map
//=============================================================================

Scene_Map.prototype.refreshAllMiniLabels = function() {
    var length = this._spriteset._characterSprites.length;
    for (var i = 0; i < length; ++i) {
      var sp = this._spriteset._characterSprites[i];
      sp.refreshMiniLabel();
    }
};

//=============================================================================
// End of File
//=============================================================================
