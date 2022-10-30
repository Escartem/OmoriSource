//=============================================================================
// Gacha.js
//
// (c)2016 KADOKAWA CORPORATION./YOJI OJIMA
//=============================================================================

/*:
 * @plugindesc Get the item at random
 * @author Takeya Kimura
 *
 * @param Help Message Text
 * @desc The help message for gacha window. "Required Amount" is replaced with the Required Amount.
 * @default 1回Required Amount\Gでガチャを引きます
 *
 * @param Button Text
 * @desc The button text for gacha commands.
 * @default ガチャを引く
 *
 * @param Get Message Text
 * @desc The message of After receiving. "Item Name" is replaced with the received item name.
 * @default GET Item Name
 *
 * @param Show Item Description
 * @desc The switch of item description display
 * @default 0
 *
 * @param Effect
 * @desc The animation number for get effect.
 * @default 119
 * @require 1
 * @type animation
 *
 * @param Rank1 Effect
 * @desc The animation number for rank 1 effect. If you specify -1, does not display the animation.
 * @default -1
 * @require 1
 * @type animation
 *
 * @param Rank2 Effect
 * @desc The animation number for rank 2 effect. If you specify -1, does not display the animation.
 * @default -1
 * @require 1
 * @type animation
 *
 * @param Rank3 Effect
 * @desc The animation number for rank 3 effect. If you specify -1, does not display the animation.
 * @default -1
 * @require 1
 * @type animation
 *
 * @param Rank4 Effect
 * @desc The animation number for rank 4 effect. If you specify -1, does not display the animation.
 * @default -1
 * @require 1
 * @type animation
 *
 * @param Rank5 Effect
 * @desc The animation number for rank 5 effect. If you specify -1, does not display the animation.
 * @default -1
 * @require 1
 * @type animation
 *
 * @param ME
 * @desc The ME name for get music effect.
 * @default Organ
 * @require 1
 * @dir audio/me/
 * @type file
 *
 * @param  Required Amount
 * @desc The Gold for gacha.
 * @default 100
 *
 * @noteParam gachaImage
 * @noteRequire 1
 * @noteDir img/gacha/
 * @noteType file
 * @noteData items
 *
 * @help
 *
 * Plugin Command:
 *   Gacha open                 # Open the Gacha screen
 *   Gacha add item 1           # Add item #1 to the Gacha
 *   Gacha remove item 1        # Remove item #1 from the Gacha
 *   Gacha clear                # Clear the Gacha
 *
 *
 * Item Note:
 *   <gachaImage:image>        # Gacha image file name. Please image put in "img/gacha/" folder.
 *   <gachaNumLot:10>          # The number of the lottery.
 *   <gachaRank:5>             # The rank of the item(1-5).
 */

/*:ja
 * @plugindesc ランダムにアイテムを取得します。
 * @author Takeya Kimura
 *
 * @param Help Message Text
 * @desc ガチャ画面のヘルプメッセージです。「Required Amount」は消費Gと置換されます。
 * @default 1回Required Amount\Gでガチャを引きます
 *
 * @param Button Text
 * @desc ガチャボタンに表示するテキストです。
 * @default ガチャを引く
 *
 * @param Get Message Text
 * @desc ガチャを引いた後のメッセージです。「Item Name」は取得アイテム名と置換されます。
 * @default GET Item Name
 *
 * @param Show Item Description
 * @desc 1でアイテム取得時に説明を表示します。[0: 説明非表示 1: 説明表示]
 * @default 0
 *
 * @param Effect
 * @desc アイテム取得時のアニメーションIDを指定します。
 * @default 119
 * @require 1
 * @type animation
 *
 * @param Rank1 Effect
 * @desc ランク1の時のアニメーションIDを指定します。-1を指定するとアニメーションを表示しません。
 * @default -1
 * @require 1
 * @type animation
 *
 * @param Rank2 Effect
 * @desc ランク2の時のアニメーションIDを指定します。-1を指定するとアニメーションを表示しません。
 * @default -1
 * @require 1
 * @type animation
 *
 * @param Rank3 Effect
 * @desc ランク3の時のアニメーションIDを指定します。-1を指定するとアニメーションを表示しません。
 * @default -1
 * @require 1
 * @type animation
 *
 * @param Rank4 Effect
 * @desc ランク4の時のアニメーションIDを指定します。-1を指定するとアニメーションを表示しません。
 * @default -1
 * @require 1
 * @type animation
 *
 * @param Rank5 Effect
 * @desc ランク5の時のアニメーションIDを指定します。-1を指定するとアニメーションを表示しません。
 * @default -1
 * @require 1
 * @type animation
 *
 * @param ME
 * @desc アイテム取得時のMEを指定します。
 * @default Organ
 * @require 1
 * @dir audio/me/
 * @type file
 *
 * @param  Required Amount
 * @desc ガチャを引くのに必要なGです。
 * @default 100
 *
 * @noteParam gachaImage
 * @noteRequire 1
 * @noteDir img/gacha/
 * @noteType file
 * @noteData items
 *
 * @help
 *
 * Plugin Command:
 *   Gacha open                 # ガチャ画面を開きます。
 *   Gacha add item 1           # アイテム番号1をガチャ対象に追加します。
 *   Gacha remove item 1        # アイテム番号1をガチャ対象から外します。
 *   Gacha clear                # 全てのガチャ対象をクリアします。
 *
 *
 * Item Note:
 *   <gachaImage:image>        # ガチャアイテムの画像を指定します。画像はimg/gacha/フォルダ内に入れてください。
 *   <gachaNumLot:10>          # ガチャアイテムのくじ数を指定します。
 *   <gachaRank:5>             # ガチャアイテムのランクを1から5の間で指定します。
 */

(function () {

    var parameters = PluginManager.parameters('Gacha');
    var message;
    var itemDescEnable = !!Number(parameters['Show Item Description'] || 0);
    var rankEffect = [];
    rankEffect.push(Number(parameters['Rank1 Effect'] || '-1'));
    rankEffect.push(Number(parameters['Rank2 Effect'] || '-1'));
    rankEffect.push(Number(parameters['Rank3 Effect'] || '-1'));
    rankEffect.push(Number(parameters['Rank4 Effect'] || '-1'));
    rankEffect.push(Number(parameters['Rank5 Effect'] || '-1'));
    var me = String(parameters['ME'] || 'Organ');
    var amount = Number(parameters['Required Amount'] || '100');
    var reg = /Required Amount/gi;
    

    Scene_Boot = class extends Scene_Boot {

        start() {
            super.start();
            message = LanguageManager.getMessageData("gacha_minigame.message_0").text;
            message = message.replace(reg, String(amount));
        }
    }


    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === "Gacha") {
            switch (args[0]) {
                case "open":
                    SceneManager.push(Scene_Gacha);
                    break;

                case 'add':
                    $gameSystem.addToGacha(args[1], Number(args[2]));
                    break;

                case 'remove':
                    $gameSystem.removeFromGacha(args[1], Number(args[2]));
                    break;

                case 'clear':
                    $gameSystem.clearGacha();
                    break;
            }
        }
    };
    // YIN
    Game_Interpreter.prototype.initGacha = function() {
        ImageManager.loadAtlas("gacha_prizes");
        // INIT GACHA
        this._gachaItem = null;
        this._gachaLot = [];

        this._rankSprite = new Sprite_GachaEffect();
        this._rankSprite.keepDisplay(true);
        SceneManager._scene.addChild(this._rankSprite);

        var wy = 120;
        var wh = 320;
        this._getWindow = new Window_GachaGet(0, wy, 280, wh);
        this._getWindow.itemDescEnable(itemDescEnable);
        this._getWindow.hide();
        SceneManager._scene.addWindow(this._getWindow);

        var numLot;
        var item, i, j;
        for (i = 1; i < $dataItems.length; i++) {
            item = $dataItems[i];
            if ($gameSystem.isInGacha(item)) {
                numLot = Number(item.meta.gachaNumLot || '0');
                for (j = 0; j < numLot; j++) {
                    this._gachaLot.push(item);
                }
            }
        }
        for (i = 1; i < $dataWeapons.length; i++) {
            item = $dataWeapons[i];
            if ($gameSystem.isInGacha(item)) {
                numLot = Number(item.meta.gachaNumLot || '0');
                for (j = 0; j < numLot; j++) {
                    this._gachaLot.push(item);
                }
            }
        }
        for (i = 1; i < $dataArmors.length; i++) {
            item = $dataArmors[i];
            if ($gameSystem.isInGacha(item)) {
                numLot = Number(item.meta.gachaNumLot || '0');
                for (j = 0; j < numLot; j++) {
                    this._gachaLot.push(item);
                }
            }
        }

        this._gachaItem = this._gachaLot[(Math.random() * this._gachaLot.length) >> 0];
        this._getWindow.setItem(this._gachaItem);
        $gameParty.gainItem(this._gachaItem, 1);
    }

    // YIN
    Game_Interpreter.prototype.displayGachaItem = function(item) {
        this._getWindow._gachaSprite.opacity = 0;
        this._moveGet = true;
        this._getWindow.x = (Graphics.boxWidth - this._getWindow.width) / 2;
        this._getWindow.y = 120;
        this._getWindow.show();
    }

    // YIN
    Game_Interpreter.prototype.removeGachaWindow = function() {
        this._gachaClosing = true;
    }

    var yin_Interpreter_Update = Game_Interpreter.prototype.update;
    Game_Interpreter.prototype.update = function () {
        yin_Interpreter_Update.call(this);
        if (this._gachaClosing) {
            this._getWindow._gachaSprite.opacity -= 20;
            this._rankSprite.opacity -= 28;
            if (this._getWindow._gachaSprite.opacity <= 0) {
                this._getWindow.close();
                this._gachaItem = null;
                this._gachaLot = [];
                this._rankSprite.allRemove();
                SceneManager._scene.removeChild(this._rankSprite);
                SceneManager._scene.removeChild(this._getWindow);

                this._getWindow = null;
                this._rankSprite = null;
                this._moveGet = null;
                this._gachaClosing = null;
            }
        }
        if (this._getWindow && this._getWindow._gachaSprite.opacity < 255 && this._moveGet) {
            this._getWindow._gachaSprite.opacity += 4;
            this._getWindow.y -= 5;
            if (this._getWindow.y <= 32) {
                this._getWindow.y = 32;
            }
            if (this._getWindow._gachaSprite.opacity >= 255) {
                this._getWindow._gachaSprite.opacity = 255;
            }
            if (this._getWindow._gachaSprite.opacity === 255 && this._getWindow.y === 32) {
                this._moveGet = false;
            }
        }
    }

    Game_System.prototype.addToGacha = function(type, dataId) {
        if (!this._GachaFlags) {
            this.clearGacha();
        }
        var typeIndex = this.gachaTypeToIndex(type);
        if (typeIndex >= 0) {
            this._GachaFlags[typeIndex][dataId] = true;
        }
    };

    Game_System.prototype.removeFromGacha = function(type, dataId) {
        if (this._GachaFlags) {
            var typeIndex = this.gachaTypeToIndex(type);
            if (typeIndex >= 0) {
                this._GachaFlags[typeIndex][dataId] = false;
            }
        }
    };

    Game_System.prototype.gachaTypeToIndex = function(type) {
        switch (type) {
            case 'item':
                return 0;
            case 'weapon':
                return 1;
            case 'armor':
                return 2;
            default:
                return -1;
        }
    };

    Game_System.prototype.clearGacha = function() {
        this._GachaFlags = [[], [], []];
    };

    Game_System.prototype.isInGacha = function(item) {
        if (this._GachaFlags && item) {
            var typeIndex = -1;
            if (DataManager.isItem(item)) {
                typeIndex = 0;
            } else if (DataManager.isWeapon(item)) {
                typeIndex = 1;
            } else if (DataManager.isArmor(item)) {
                typeIndex = 2;
            }
            if (typeIndex >= 0) {
                return !!this._GachaFlags[typeIndex][item.id];
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    function Window_GachaGet() {
        this.initialize.apply(this, arguments);
    }

    Window_GachaGet.prototype = Object.create(Window_Base.prototype);
    Window_GachaGet.prototype.constructor = Window_GachaGet;

    Window_GachaGet.prototype.initialize = function(x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.opacity = 0;
        this._item = null;
        this._itemDescEnable = true;
        this._gachaSprite = new Sprite();
        this._gachaSprite.anchor.x = 0.5;
        this._gachaSprite.anchor.y = 0.5; // bottom
        this._gachaSprite.x = width / 2;
        this._gachaSprite.y = Graphics.boxHeight - height - this._gachaSprite.height - this.standardPadding();
        this._gachaSprite.opacity = 0;
        this.addChildToBack(this._gachaSprite);
        this.refresh();
    };

    Window_GachaGet.prototype.isUsingCustomCursorRectSprite = function () { return true; };

    Window_GachaGet.prototype.itemDescEnable = function(value) {
        if (this._itemDescEnable !== value) {
            this._itemDescEnable = value;
            this.refresh();
        }
    };

    Window_GachaGet.prototype.setItem = function(item) {
        if (this._item !== item) {
            this._item = item;
            this.refresh();
        }
    };

    Window_GachaGet.prototype.update = function() {
        Window_Base.prototype.update.call(this);
        if (this._gachaSprite.bitmap) {
            var bitmapHeight = this._gachaSprite.bitmap.height;
            var contentsHeight = this.contents.height;
            if (this._itemDescEnable) {
                contentsHeight -= this.lineHeight() * 3
            }
            var scale = 1;
            if (bitmapHeight > contentsHeight) {
                scale = contentsHeight / bitmapHeight;
            }
            this._gachaSprite.scale.x = scale;
            this._gachaSprite.scale.y = scale;
        }
    };

    Window_GachaGet.prototype.refresh = function() {
        var item = this._item;
        this.contents.clear();

        if (this._itemDescEnable) {
            var y = this.contentsHeight() - this.lineHeight() * 3;
            this.drawHorzLine(y);
            this.drawDescription(0, y + this.lineHeight());
        }

        if (!item || !item.meta.gachaImage) {
            this._gachaSprite.bitmap = null;
            return;
        }
        else {
            var bitmap;
            bitmap = ImageManager.loadPicture(this._item.meta.gachaImage);
            this._gachaSprite.bitmap = bitmap;
            bitmap.smooth = true;
            if ([83,90,91,92,93].contains(this._item.id)) {
                this._gachaSprite.y = this._gachaSprite.y - 32;
            }
        }
    };

    Window_GachaGet.prototype.drawDescription = function(x, y) {
        if (this._item) this.drawTextEx(this._item.description, x, y);
    };

    Window_GachaGet.prototype.drawHorzLine = function(y) {
        var lineY = y + this.lineHeight() / 2 - 1;
        this.contents.paintOpacity = 48;
        this.contents.fillRect(0, lineY, this.contentsWidth(), 2, this.lineColor());
        this.contents.paintOpacity = 255;
    };

    Window_GachaGet.prototype.lineColor = function() {
        return this.normalColor();
    };



    function Sprite_GachaEffect() {
        this.initialize.apply(this, arguments);
    }

    Sprite_GachaEffect.prototype = Object.create(Sprite.prototype);
    Sprite_GachaEffect.prototype.constructor = Sprite_GachaEffect;

    Sprite_GachaEffect.prototype.initialize = function() {
        Sprite.prototype.initialize.call(this);
        this._animationSprites = [];
        this._endSprites = [];
        this._effectTarget = this;
        this._hiding = false;
        this._keepDisplay = false;
    };

    Sprite_GachaEffect.prototype.keepDisplay = function(value) {
        this._keepDisplay = value;
    };

    Sprite_GachaEffect.prototype.update = function() {
        Sprite.prototype.update.call(this);
        this.updateVisibility();
        this.updateAnimationSprites();
    };

    Sprite_GachaEffect.prototype.hide = function() {
        this._hiding = true;
        this.updateVisibility();
    };

    Sprite_GachaEffect.prototype.show = function() {
        this._hiding = false;
        this.updateVisibility();
    };

    Sprite_GachaEffect.prototype.updateVisibility = function() {
        this.visible = !this._hiding;
    };

    Sprite_GachaEffect.prototype.updateAnimationSprites = function() {
        if (this._animationSprites.length > 0) {
            var sprites = this._animationSprites.clone();
            this._animationSprites = [];
            for (var i = 0; i < sprites.length; i++) {
                var sprite = sprites[i];
                if (sprite.isPlaying()) {
                    this._animationSprites.push(sprite);
                } else {
                    if (!this._keepDisplay) {
                        sprite.remove();
                    }
                    else {
                        this._endSprites.push(sprite);
                    }
                }
            }
        }
    };

    Sprite_GachaEffect.prototype.startAnimation = function(animation, mirror, delay) {
        var sprite = new Sprite_Animation();
        sprite.setup(this._effectTarget, animation, mirror, delay);
        this.parent.addChild(sprite);
        this._animationSprites.push(sprite);
    };

    Sprite_GachaEffect.prototype.isAnimationPlaying = function() {
        return this._animationSprites.length > 0;
    };

    Sprite_GachaEffect.prototype.allRemove = function() {
        var sprites, sprite, i;
        if (this._animationSprites.length > 0) {
            sprites = this._animationSprites.clone();
            this._animationSprites = [];
            for (i = 0; i < sprites.length; i++) {
                sprite = sprites[i];
                sprite.remove();
            }
        }
        if (this._endSprites.length > 0) {
            sprites = this._endSprites.clone();
            this._endSprites = [];
            for (i = 0; i < sprites.length; i++) {
                sprite = sprites[i];
                sprite.remove();
            }
        }
    };

})();