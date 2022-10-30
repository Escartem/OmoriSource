//=============================================================================
// Gamefall Team Plugins - Optimization for Omori taking in account 
// YEP_Core Updates;
// GTP_CoreUpdates.js    VERSION 1.0.1
//=============================================================================

var Imported = Imported || {};
Imported.GTP_CoreUpdates = true;

var Gamefall = Gamefall || {};
Gamefall.CoreUpdates = Gamefall.CoreUpdates || {};

//=============================================================================
 /*:
 * @plugindesc v1.0.1 Optimization for Omori taking in account YEP Core Updates
 * @author Gamefall Team || Luca Mastroianni
 * @help
 * CHANGELOG:
 * VERSION 1.0.0: Plugin Released!
 * VERSION 1.0.1: Reduced lag filtering events;
 */
 //=============================================================================

 (function($) {

// Replaced ForEach
Sprite.prototype.update = function() {
    var length = this.children.length;
    for (var i = 0; i < length; ++i) {
      var child = this.children[i];
      if(!child) {continue;}
      if (child && child.update) child.update();
    };
  };
  
  // Replaced ForEach
  Tilemap.prototype.update = function() {
    this.animationCount++;
    this.animationFrame = Math.floor(this.animationCount / 30);
    var length = this.children.length;
    for (var i = 0; i < length; ++i) {
      var child = this.children[i];
      if(!child) {continue;}
      if (child && child.update) child.update();
    }
    var length = this.bitmaps.length;
    for (var i = 0; i < length; ++i) {
      if (this.bitmaps[i]) this.bitmaps[i].touch();
    }
  };
  
  // Replaced ForEach
  TilingSprite.prototype.update = function() {
    var length = this.children.length;
    for (var i = 0; i < length; ++i) {
      var child = this.children[i];
      if (child && child.update) child.update();
    }
  };
  
  // Replaced ForEach
  Window.prototype.update = function() {
    if (this.active) this._animationCount++;
    var length = this.children.length;
    for (var i = 0; i < length; ++i) {
      var child = this.children[i];
      if (child && child.update) child.update();
    }
  };
  
  // Replaced ForEach
  WindowLayer.prototype.update = function() {
    var length = this.children.length;
    for (var i = 0; i < length; ++i) {
      var child = this.children[i];
      if (child && child.update) child.update();
    }
  };
  
  // Replaced ForEach
  Weather.prototype._updateAllSprites = function() {
    var maxSprites = Math.floor(this.power * 10);
    while (this._sprites.length < maxSprites) {
      this._addSprite();
    }
    while (this._sprites.length > maxSprites) {
      this._removeSprite();
    }
    var length = this._sprites.length;
    for (var i = 0; i < length; ++i) {
      var sprite = this._sprites[i];
      this._updateSprite(sprite);
      sprite.x = sprite.ax - this.origin.x;
      sprite.y = sprite.ay - this.origin.y;
    }
  };
    
  Game_Interpreter.prototype.setup = function(list, eventId) {
    this.clear();
    this._mapId = $gameMap.mapId();
    this._eventId = eventId || 0;
    this._list = list;
  };
  
  // Change Tileset Event: load instead of reserve
  Game_Interpreter.prototype.command282 = function() {
    var tileset = $dataTilesets[this._params[0]];
    for (var i = 0; i < tileset.tilesetNames.length; i++) {
      ImageManager.loadTileset(tileset.tilesetNames[i]);
    }
    if (ImageManager.isReady()) {
      $gameMap.changeTileset(this._params[0]);
      return true;
    } else {
      return false;
    }
  };

  // Ready preparation now refers to fully loaded instead of reservation
Sprite_Animation.prototype.isReady = function() {
    return ImageManager.isReady();
  };
  
  // Replaced ForEach
  Sprite_Animation.prototype.updateFrame = function() {
    if (this._duration > 0) {
      var frameIndex = this.currentFrameIndex();
      this.updateAllCellSprites(this._animation.frames[frameIndex]);
      var length = this._animation.timings.length;
      for (var i = 0; i < length; ++i) {
        var timing = this._animation.timings[i];
        if (timing.frame === frameIndex) this.processTimingData(timing);
      };
    }
  };
  
  // Cleaning algorithm up
  Sprite_Animation.prototype.updateCellSprite = function(sprite, cell) {
    var pattern = cell[0];
    if (pattern >= 0) {
      var sx = pattern % 5 * 192;
      var sy = Math.floor(pattern % 100 / 5) * 192;
      var mirror = this._mirror;
      sprite.bitmap = pattern < 100 ? this._bitmap1 : this._bitmap2;
      sprite.setFrame(sx, sy, 192, 192);
      sprite.x = cell[1];
      sprite.y = cell[2];
      if (this._mirror) {
          sprite.x *= -1;
      }
      sprite.rotation = cell[4] * Math.PI / 180;
      sprite.scale.x = cell[3] / 100;
      if ((cell[5] && !mirror) || (!cell[5] && mirror)) {
          sprite.scale.x *= -1;
      }
      sprite.scale.y = cell[3] / 100;
      sprite.opacity = cell[6];
      sprite.blendMode = cell[7];
      sprite.visible = true;
    } else {
      sprite.visible = false;
    }
  };

  Scene_Base.prototype.updateChildren = function() {
    var length = this.children.length;
    for (var i = 0; i < length; ++i) {
      var child = this.children[i];
      if(!child) {continue;}
      if (child.update) child.update();
    }
  };

  Scene_Boot.prototype.isGameFontLoaded = function() {
    if (Graphics.isFontLoaded('GameFont')) {
      return true;
    } else {
      var elapsed = Date.now() - this._startDate;
      if (elapsed >= 60000) {
        throw new Error('Failed to load GameFont');
      }
    }
  };


  Game_Map.prototype.eventsXy = function(x,y) {
    return this._events.filter(event => {return !!event && event.pos(x,y)})
  }

  Game_Map.prototype.eventsXyNt = function(x,y) {
    return this._events.filter(event => {return !!event && event.posNt(x,y)})
  }


	Encryption = class {

    static init() {
      this._key = "hello world";
      // this._key = String(window.nw.App.argv).replace("--", "");
    }

		static isTest() {
			return Utils.isOptionValid("test");
		}

		static decrypt(encrypted) {
      // Don't need to decrypt anything anymore :)

			// const crypto = require("crypto")
			// const iv = encrypted.slice(0,16);
			// encrypted = encrypted.slice(16);
			// const algorithm = "aes-256-ctr";
			// const decipher = crypto.createDecipheriv(algorithm, this._key, iv);
			// const result = Buffer.concat([decipher.update(encrypted), decipher.final()]);
			// return result;

      return encrypted;
		}
  }

  Encryption.init();

})(Gamefall.CoreUpdates);