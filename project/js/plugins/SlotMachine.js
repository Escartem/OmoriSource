//=============================================================================
// SlotMachine.js
//
// (c)2016 KADOKAWA CORPORATION./YOJI OJIMA
//=============================================================================

/*:
 * @plugindesc Slot Machine scene
 * @author Takeya Kimura
 *
 * @param Variable ID
 * @desc Variable ID for store the coin.
 * @default 11
 *
 * @param Help Text
 * @desc This text is a help message.
 * @default カーソルキーの上でベット、カーソルキーの下でスタート
 *
 * @param Won Text
 * @desc This text is a won message. "Win Coin" will be replaced with the number of coins won.
 * @default おめでとうございます！Win Coin枚獲得です！
 *
 * @param Lost Text
 * @desc This text is a lost message.
 * @default 残念でした。
 *
 * @param Replay Text
 * @desc This text is a replay message.
 * @default もう一度やりますか？
 *
 * @param CoinFull Text
 * @desc This text is a coin full message.
 * @default コイン枚数が制限に達しました。
 *
 * @param Bet Text
 * @desc This text is a bet command.
 * @default ベット
 *
 * @param Spin Text
 * @desc This text is a coin spin command.
 * @default スピン
 *
 * @param Yes Text
 * @desc This text is a coin "yes" command.
 * @default はい
 *
 * @param No Text
 * @desc This text is a "no" command.
 * @default いいえ
 *
 * @requiredAssets img/slotmachine/bet_line_1
 * @requiredAssets img/slotmachine/bet_line_2
 * @requiredAssets img/slotmachine/bet_line_3
 * @requiredAssets img/slotmachine/bg
 * @requiredAssets img/slotmachine/line_base
 * @requiredAssets img/slotmachine/reel
 * @requiredAssets img/slotmachine/scale_x1
 * @requiredAssets img/slotmachine/scale_x10
 * @requiredAssets img/slotmachine/scale_x100
 * @requiredAssets img/slotmachine/win_cursor
 * @requiredAssets audio/me/Victory1
 * @requiredAssets audio/se/Switch2
 *
 * @help
 * Plugin Command:
 *   SlotMachine open               # Open the slot machines
 *   SlotMachine expectation 0.5    # Set the expectation
 *   SlotMachine scale 0            # Set the scale [0 | 1 | 2](scale1 | scale10 | scale100)
 */

/*:ja
 * @plugindesc Slot Machine scene
 * @author Takeya Kimura
 *
 * @param Variable ID
 * @desc 所持コインの数を保管する変数ID
 * @default 11
 *
 * @param Help Text
 * @desc ヘルプメッセージです。
 * @default カーソルキーの上でベット、カーソルキーの下でスタート
 *
 * @param Won Text
 * @desc 勝利時のメッセージ。 "Win Coin"は獲得したコイン数に置換されます。
 * @default おめでとうございます！Win Coin枚獲得です！
 *
 * @param Lost Text
 * @desc 負けた時のメッセージ
 * @default 残念でした。
 *
 * @param Replay Text
 * @desc リプレイ時の選択メッセージ
 * @default もう一度やりますか？
 *
 * @param Coin Full Text
 * @desc コインが最大数に達した時のメッセージ
 * @default コイン枚数が制限に達しました。
 *
 * @param Bet Text
 * @desc ベットコマンドのテキスト
 * @default ベット
 *
 * @param Spin Text
 * @desc スピンコマンドのテキスト
 * @default スピン
 *
 * @param Yes Text
 * @desc はいコマンドのテキスト
 * @default はい
 *
 * @param No Text
 * @desc いいえコマンドのテキスト
 * @default いいえ
 *
 * @requiredAssets img/slotmachine/bet_line_1
 * @requiredAssets img/slotmachine/bet_line_2
 * @requiredAssets img/slotmachine/bet_line_3
 * @requiredAssets img/slotmachine/bg
 * @requiredAssets img/slotmachine/line_base
 * @requiredAssets img/slotmachine/reel
 * @requiredAssets img/slotmachine/scale_x1
 * @requiredAssets img/slotmachine/scale_x10
 * @requiredAssets img/slotmachine/scale_x100
 * @requiredAssets img/slotmachine/win_cursor
 * @requiredAssets audio/me/Victory1
 * @requiredAssets audio/se/Switch2
 *
 * @help
 * Plugin Command:
 *   SlotMachine open               # スロットマシーンを開きます
 *   SlotMachine expectation 0.5    # 期待値を0〜1の間で設定します。1に近づくほど当たりやすくなりますが、確実に当たるわけではありません。
 *   SlotMachine scale 0            # 倍率を設定します0は1倍、1は10倍、2は100倍です。
 */

function Window_SlotMachine() {
    this.initialize.apply(this, arguments);
};

function Window_ReplayCommand() {
    this.initialize.apply(this, arguments);
};

(function () {

    var parameters = PluginManager.parameters('SlotMachine');
    var variableId = Number(parameters['Variable ID'] || 11);
    var helpMessage;
    var winMessage;
    var lostMessage;
    var replayMessage = "";
    var coinFullMessage;
    var betText;
    var spinText;
    var yesText;
    var noText;
    var scale = 1;
    var expectation = 0.5;

    Scene_Boot = class extends Scene_Boot {

        start() {
            super.start();
            helpMessage = LanguageManager.getMessageData("slot_machine_minigame.message_0").text;
            winMessage = LanguageManager.getMessageData("slot_machine_minigame.message_1").text;
            lostMessage = LanguageManager.getMessageData("slot_machine_minigame.message_2").text;
            replayMessage = "";
            coinFullMessage = LanguageManager.getMessageData("slot_machine_minigame.message_4").text;
            betText = LanguageManager.getMessageData("slot_machine_minigame.message_5").text;
            spinText = LanguageManager.getMessageData("slot_machine_minigame.message_6").text;
            yesText = LanguageManager.getMessageData("XX_GENERAL.message_4").text;
            noText = LanguageManager.getMessageData("XX_GENERAL.message_5").text;
        }
    }
    
    //odds
    //You can set the odds.
    var odds = [];
    odds.push([]);
    odds[0].push(1); //000
    odds[0].push(2); //111
    odds[0].push(5); //222
    odds[0].push(10); //333
    odds[0].push(20); //444
    odds[0].push(100); //555
    odds.push([]);
    odds[1].push(2); //0000
    odds[1].push(10); //1111
    odds[1].push(20); //2222
    odds[1].push(100); //3333
    odds[1].push(200); //4444
    odds[1].push(1000); //5555
    odds.push([]);
    odds[2].push(20); //00000
    odds[2].push(100); //11111
    odds[2].push(200); //22222
    odds[2].push(1000); //33333
    odds[2].push(2000); //44444
    odds[2].push(10000); //55555
    
    //make reel
    //You can rearrange the order of the reel.
    //The number can not be changed.
    var reel = [];
    reel.push([0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5]);
    reel.push([5, 4, 3, 2, 1, 0, 5, 4, 3, 2, 1, 0, 5, 4, 3, 2, 1, 0]);
    reel.push([0, 0, 1, 1, 5, 2, 3, 3, 4, 4, 5, 5, 0, 1, 2, 3, 4, 5]);
    reel.push([2, 2, 4, 1, 3, 5, 0, 2, 4, 1, 3, 5, 0, 2, 4, 1, 3, 5]);
    reel.push([0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5]);
    
    function getCoin() {
        return $gameParty._gold;
    }
    
    function setCoin(value) {
        return $gameParty._gold = value;
    }
    
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);
        if (command === "SlotMachine") {
            switch (args[0]) {
                case "open":
                    SceneManager.push(Scene_SlotMachine);
                    break;
                case "expectation":
                    expectation = Number(args[1]);
                    break;
                case "scale":
                    switch (args[1]) {
                        case "0":
                            scale = 1;
                            break;
                        case "1":
                            scale = 10;
                            break;
                        case "2":
                            scale = 100;
                            break;
                        default :
                            scale = 1;
                            break;
                    }
                    break;
            }
        }
    };
    
    //-----------------------------------------------------------------------------
    // SLTReelSprite
    //
    // Slot Machine Reel Sprite
    
    function SLTReelSprite() {
        this.initialize.apply(this, arguments);
    }
    
    SLTReelSprite.prototype = Object.create(Sprite.prototype);
    SLTReelSprite.prototype.constructor = SLTReelSprite;
    
    SLTReelSprite.STOP = 0;
    SLTReelSprite.SPINNING = 1;
    SLTReelSprite.SPIN = 2;
    SLTReelSprite.STOPPING = 3;
    SLTReelSprite.FRAME_SPINNING = 40;
    SLTReelSprite.FRAME_SPIN = 60;
    SLTReelSprite.FRAME_STOPPING = 40;
    
    SLTReelSprite.prototype.initialize = function (bitmap) {
        Sprite.prototype.initialize.call(this, bitmap);
        this._numSpot = 18;
        this._spotHeight = 44;
        this._winSpot = 0;
        this._scrollY = 0;
        this._speedHigh = 30;
        this._speedLow = 4;
        this._status = 0;
        this._spinFrame = 0;
        this._spinEndFrame = SLTReelSprite.FRAME_SPIN;
    };
    
    Object.defineProperty(SLTReelSprite.prototype, 'status', {
        get: function () {
            return this._status;
        },
        configurable: true
    });
    
    SLTReelSprite.prototype.update = function () {
        Sprite.prototype.update.call(this);
    
        switch (this._status) {
    
            case SLTReelSprite.STOP:
                break;
    
            case SLTReelSprite.SPINNING:
                if (this._spinFrame > SLTReelSprite.FRAME_SPINNING) {
                    this._status = SLTReelSprite.SPIN;
                    AudioManager.playSe({ "name": "Slots_Spin", "volume": 90, "pitch": 100, "pan": 0 });
                    break;
                }
                this._scrollY = (this._scrollY + this._speedLow) % (this._numSpot * this._spotHeight);
                this.setFrame(
                    0,
                    this._spotHeight * this._numSpot * 2 - this._scrollY - this._spotHeight * 2,
                    92,
                    this._spotHeight * 3
                );
                this._spinFrame++;
                break;
    
            case SLTReelSprite.SPIN:
                if (this._spinFrame > this._spinEndFrame + SLTReelSprite.FRAME_SPINNING) {
                    this._status = SLTReelSprite.STOPPING;
                    this._scrollY = this._winSpot * this._spotHeight - this._spotHeight * 3;
                    break;
                }
                this._scrollY = (this._scrollY + this._speedHigh) % (this._numSpot * this._spotHeight);
                this.setFrame(
                    0,
                    this._spotHeight * this._numSpot * 2 - this._scrollY - this._spotHeight * 2,
                    92,
                    this._spotHeight * 3
                );
                this._spinFrame++;
                break;
    
            case SLTReelSprite.STOPPING:
                this._scrollY = (this._scrollY + this._speedLow) % (this._numSpot * this._spotHeight);
                if (this._scrollY > this._winSpot * this._spotHeight) {
                    this._scrollY = this._winSpot * this._spotHeight;
                    this._status = SLTReelSprite.STOP;
                    AudioManager.playSe({"name": "Slots_Stop", "volume": 90, "pitch": 100, "pan": 0});
                }
                this.setFrame(
                    0,
                    this._spotHeight * this._numSpot * 2 - this._scrollY - this._spotHeight * 2,
                    92,
                    this._spotHeight * 3
                );
                break;
        }
    };
    
    SLTReelSprite.prototype.setSpot = function (spot) {
        if (0 <= spot && spot < this._numSpot) {
            this._scrollY = this._spotHeight * spot;
            this.setFrame(
                0,
                this._spotHeight * this._numSpot * 2 - this._scrollY - this._spotHeight * 2,
                92,
                this._spotHeight * 3
            );
        }
    };
    
    SLTReelSprite.prototype.setWinSpot = function (spot) {
        this._winSpot = spot;
    };
    
    SLTReelSprite.prototype.setSpinEndFrame = function (frame) {
        this._spinEndFrame = frame;
    };
    
    SLTReelSprite.prototype.spin = function () {
        if (this._status === SLTReelSprite.STOP) {
            this._status = SLTReelSprite.SPINNING;
            this._spinFrame = 0;
        }
    };
    
    //-----------------------------------------------------------------------------
    // LotLineSprite
    //
    // This Sprite is draw lot line for the slot machines.
    
    function LotLineSprite() {
        this.initialize.apply(this, arguments);
    }
    
    LotLineSprite.prototype = Object.create(Sprite.prototype);
    LotLineSprite.prototype.constructor = LotLineSprite;
    
    LotLineSprite.prototype.initialize = function (bitmap) {
        Sprite.prototype.initialize.call(this, bitmap);
    
        var b1 = ImageManager.loadBitmap("img/slotmachine/", "bet_line_1");
        var b2 = ImageManager.loadBitmap("img/slotmachine/", "bet_line_2");
        var b3 = ImageManager.loadBitmap("img/slotmachine/", "bet_line_3");
        this._line1Sprite = new Sprite(b1);
        this._line2Sprite = new Sprite(b2);
        this._line3Sprite = new Sprite(b3);
        this._line1Sprite.x = 0;
        this._line1Sprite.y = 43;
        this._line2Sprite.x = 0;
        this._line2Sprite.y = 1;
        this._line3Sprite.x = 0;
        this._line3Sprite.y = 88;
        this.addChild(this._line1Sprite);
        this.addChild(this._line2Sprite);
        this.addChild(this._line3Sprite);
    };
    
    LotLineSprite.prototype.enableLine = function (line) {
        if (line === 0) {
            this._line1Sprite.visible = true;
        }
        else if (line === 1) {
            this._line2Sprite.visible = true;
        }
        else if (line === 2) {
            this._line3Sprite.visible = true;
        }
    };
    
    LotLineSprite.prototype.clear = function () {
        this._line1Sprite.visible = false;
        this._line2Sprite.visible = false;
        this._line3Sprite.visible = false;
    };
    
    //-----------------------------------------------------------------------------
    // InstructionCursorSprite
    //
    // Cursor indicating the winning
    
    function InstructionCursorSprite() {
        this.initialize.apply(this, arguments);
    }
    
    InstructionCursorSprite.prototype = Object.create(Sprite.prototype);
    InstructionCursorSprite.prototype.constructor = InstructionCursorSprite;
    
    InstructionCursorSprite.prototype.initialize = function (bitmap) {
        Sprite.prototype.initialize.call(this, bitmap);
    
        this._counter = 0;
    };
    
    InstructionCursorSprite.FRAME_BLINK = 10;
    InstructionCursorSprite.FRAME_BLINK_END = 190;
    
    InstructionCursorSprite.prototype.blink = function () {
        this._counter = 1;
    };
    
    InstructionCursorSprite.prototype.update = function () {
        Sprite.prototype.update.call(this);
    
        if (this._counter > 0) {
            if (this._counter > InstructionCursorSprite.FRAME_BLINK_END + 1) {
                this._counter = 0;
            }
            else {
                var s = this._counter / InstructionCursorSprite.FRAME_BLINK >> 0;
                this.visible = s % 2 === 0;
                this._counter++;
            }
        }
    };
    
    /**
     * @method drawImage
     * @param bitmap    source bitmap
     * @param sx        source x
     * @param sy        source y
     * @param sw        source width
     * @param sh        source height
     * @param dx        destination x
     * @param dy        destination y
     */
    Bitmap.prototype.drawImage = function(bitmap, sx, sy, sw, sh, dx, dy) {
        this._context.drawImage(bitmap.canvas, sx, sy, sw, sh, dx, dy, sw, sh);
        this._setDirty();
    };
    
    //-----------------------------------------------------------------------------
    // Scene_SlotMachine
    //
    // Will play the slot machine.
    
    function Scene_SlotMachine() {
        this.initialize.apply(this, arguments);
    }
    
    Scene_SlotMachine.prototype = Object.create(Scene_MenuBase.prototype);
    Scene_SlotMachine.prototype.constructor = Scene_SlotMachine;
    
    Scene_SlotMachine.COIN_MAX_VALUE = 99999999;
    Scene_SlotMachine.ODDS_MAX_VALUE = 100000;
    
    Scene_SlotMachine.prototype.initialize = function () {
        Scene_MenuBase.prototype.initialize.call(this);
        ImageManager.loadAtlas("MN_Slots");
        this._exitFade = 0;
        $gameSystem.saveBgm();
    
        var bgm = {
            name: "event_sw_gameshow",
            volume: 100,
            pitch: 100,
            pan: 0
        };
        AudioManager.playBgm(bgm);
        this._bet = 0;
        this._coin = getCoin();
        this._winSpot = null;
        this._spinStart = false;
        this._rollCount = 0;
        this._winCoin = 0;
        this._correctCoin = 0;
        this._winStep = 0;
        this._winMessage = "";
    
        //Winning percentage is calculated by the odds
        this._probability = [];
        this._probability.push([]);
        this._probability[0].push(0.70); //00
        this._probability[0].push(0.63); //11
        this._probability[0].push(0.54); //22
        this._probability[0].push(0.44); //33
        this._probability[0].push(0.38); //44
        this._probability[0].push(0.31); //55
    
        this._probability.push([]);
        this._probability[1].push((1 / this._probability[0][0]) *
            expectation * (1 / odds[0][0])); //000
        this._probability[1].push((1 / this._probability[0][1]) *
            expectation * (1 / odds[0][1])); //111
        this._probability[1].push((1 / this._probability[0][2]) *
            expectation * (1 / odds[0][2])); //222
        this._probability[1].push((1 / this._probability[0][3]) *
            expectation * (1 / odds[0][3])); //333
        this._probability[1].push((1 / this._probability[0][4]) *
            expectation * (1 / odds[0][4])); //444
        this._probability[1].push((1 / this._probability[0][5]) *
            expectation * (1 / odds[0][5])); //555
    
        this._probability.push([]);
        this._probability[2].push((1 / (this._probability[0][0] * this._probability[1][0])) *
            expectation * (1 / odds[1][0])); //0000
        this._probability[2].push((1 / (this._probability[0][1] * this._probability[1][1])) *
            expectation * (1 / odds[1][1])); //1111
        this._probability[2].push((1 / (this._probability[0][2] * this._probability[1][2])) *
            expectation * (1 / odds[1][2])); //2222
        this._probability[2].push((1 / (this._probability[0][3] * this._probability[1][3])) *
            expectation * (1 / odds[1][3])); //3333
        this._probability[2].push((1 / (this._probability[0][4] * this._probability[1][4])) *
            expectation * (1 / odds[1][4])); //4444
        this._probability[2].push((1 / (this._probability[0][5] * this._probability[1][5])) *
            expectation * (1 / odds[1][5])); //5555
    
        this._probability.push([]);
        this._probability[3].push((1 / (this._probability[0][0] * this._probability[1][0] * this._probability[2][0])) *
            expectation * (1 / odds[2][0])); //00000
        this._probability[3].push((1 / (this._probability[0][1] * this._probability[1][1] * this._probability[2][1])) *
            expectation * (1 / odds[2][1])); //11111
        this._probability[3].push((1 / (this._probability[0][2] * this._probability[1][2] * this._probability[2][2])) *
            expectation * (1 / odds[2][2])); //22222
        this._probability[3].push((1 / (this._probability[0][3] * this._probability[1][3] * this._probability[2][3])) *
            expectation * (1 / odds[2][3])); //33333
        this._probability[3].push((1 / (this._probability[0][4] * this._probability[1][4] * this._probability[2][4])) *
            expectation * (1 / odds[2][4])); //44444
        this._probability[3].push((1 / (this._probability[0][5] * this._probability[1][5] * this._probability[2][5])) *
            expectation * (1 / odds[2][5])); //55555
    
        //Interval Spin
        //this._startingTimer = null;
        //this._currentStartingReel = 0;
    
        if (this._coin > Scene_SlotMachine.COIN_MAX_VALUE) {
            this._coin = Scene_SlotMachine.COIN_MAX_VALUE;
        }
    };
    
    Scene_SlotMachine.prototype.create = function () {
        this.startFadeIn(30, false);
        this.createBackground();
        this._backgroundSprite.bitmap = ImageManager.loadBitmap("img/slotmachine/", "bg");
        this.createReels();
        this.createBetLine();
        this.createScale();
        this.updateActor();
        this.createWindowLayer();
        this.createHelpWindow();
        this.createInstruction();
        this.createSlotMachine();
        this.createSlotCommand();
        this.createReplayCommand();
    
        this.refreshStatus();
    
        if (this._coin < scale) {
            this._slotCommandWindow.disableBet();
        }
    };
    
    Scene_SlotMachine.prototype.start = function() {
        this.makeReel();
        this._instructionWindow.refresh();
        this._slotMachineWindow.refresh();
        this._helpWindow.setText(helpMessage);
    };
    
    Scene_SlotMachine.prototype.makeReel = function() {
        for (var i = 0; i < 5; i++) {
            for (var j = 0; j < 18; j++) {
                for (var k = 0; k < 3; k++) {
                    this._reels[i].bitmap.drawImage(
                        this._reelBitmap,
                        reel[i][j] * 92,
                        0,
                        92,
                        44,
                        0,
                        (44 * 18 * 3) - j * 44 - k * (18 * 44) - 44);
                }
            }
    
            this._reels[i].setSpot(Math.random() * 18 >> 0);
        }
    };
    
    Scene_SlotMachine.prototype.isSpinning = function() {
        var returnValue = false;
        for (var i = 0; i < 5; i++) {
            returnValue = returnValue || this._reels[i].status !== SLTReelSprite.STOP;
        }
        return returnValue;
    };
    
    Scene_SlotMachine.prototype.isWinCounting = function() {
        return this._winCoin > 0;
    };
    
    Scene_SlotMachine.prototype.createHelpWindow = function() {
        this._helpWindow = new Window_SlotsIntroduction(0, 0);
        this._helpWindow.width = 606;
        this.addWindow(this._helpWindow);
        this._helpWindow.height = 64;
        this._helpWindow.x = 18;
        this._helpWindow.y = Graphics.boxHeight - this._helpWindow.height - 10;
    };
    
    Scene_SlotMachine.prototype.createInstruction = function () {
        this._instructionWindow = new Window_SlotInstruction(0, 0, Graphics.boxWidth, 26 * 6 + 18 * 2);
        this._instructionWindow.setOdds(odds);
        this.addWindow(this._instructionWindow);
    };
    
    Scene_SlotMachine.prototype.createSlotMachine = function () {
        this._slotMachineWindow = new Window_SlotMachine(18, this._instructionWindow.height, 606, 130);
        this._slotMachineWindow.coin = this._coin;
        this._slotMachineWindow.bet = this._bet;
        this.addWindow(this._slotMachineWindow);
    };
    
    Scene_SlotMachine.prototype.createSlotCommand = function () {
        this._slotCommandWindow = new Window_SlotCommand(0, 0);
        this._slotCommandWindow.setHandler('bet', this.betCommand.bind(this));
        this._slotCommandWindow.setHandler('spin', this.spinCommand.bind(this));
        this._slotCommandWindow.setHandler('cancel', this.cancelCommand.bind(this));
        this.addWindow(this._slotCommandWindow); 
        this._slotCommandWindow.x = (Graphics.boxWidth - this._slotCommandWindow.width) / 2;
        this._slotCommandWindow.y = this._helpWindow.y - this._slotCommandWindow.height - 4;
    };
    
    Scene_SlotMachine.prototype.createReplayCommand = function () {
        this._replayCommandWindow = new Window_ReplayCommand(0, 0);
        this._replayCommandWindow.setHandler('yes', this.replayCommand.bind(this));
        this._replayCommandWindow.setHandler('no', this.cancelCommand.bind(this));
        this._replayCommandWindow.setHandler('cancel', this.cancelCommand.bind(this));
        this.addWindow(this._replayCommandWindow);
        this._replayCommandWindow.x = (Graphics.boxWidth - 16) - this._replayCommandWindow.width;
        this._replayCommandWindow.y = this._helpWindow.y - 4 - this._replayCommandWindow.height;
    };
    
    Scene_SlotMachine.prototype.createReels = function () {
        this._reelBitmap = ImageManager.loadBitmap("img/slotmachine/", "reel");
        this._reels = [];
        for (var i = 0; i < 5; i++) {
            var sprite = new SLTReelSprite(new Bitmap(92, 44 * 18 * 3));
            this._reels.push(sprite);
            sprite.x = 84 + i * 95;
            sprite.y = 172;
            sprite.setSpinEndFrame(SLTReelSprite.FRAME_SPIN + i * 44);
            sprite.setFrame(0, 0, 92, 44 * 3);
            this.addChild(sprite);
        }
    };
    
    Scene_SlotMachine.prototype.createBetLine = function () {
        var bitmap = ImageManager.loadBitmap("img/slotmachine/", "line_base");
        this._betLine = new LotLineSprite(bitmap);
        this._betLine.x = 34;
        this._betLine.y = 180;
        this._betLine.clear();
        this.addChild(this._betLine);
    };
    
    Scene_SlotMachine.prototype.createScale = function () {
        var bitmap;
        if (scale === 10) {
            bitmap = ImageManager.loadBitmap("img/slotmachine/", "scale_x10");
        }
        else if (scale === 100) {
            bitmap = ImageManager.loadBitmap("img/slotmachine/", "scale_x100");
        }
        else {
            bitmap = ImageManager.loadBitmap("img/slotmachine/", "scale_x1");
        }
        this._scale = new Sprite(bitmap);
        this._scale.x = 640-76;
        this._scale.y = 172;
        this.addChild(this._scale);
    };
    
    Scene_SlotMachine.prototype.cancelCommand = function () {
        this.startFadeOut(30);
        this._bet = 0;
        this.refreshStatus();
        setCoin(this._coin);
        this._exitFade = 30;
    };
    
    Scene_SlotMachine.prototype.betCommand = function () {
        if (this._bet < 3) {
            this._bet++;
            this._slotCommandWindow.enableSpin();
        }
        if (this._bet > 2) {
            this._slotCommandWindow.disableBet();
        }
        if (this._coin - this._bet * scale < scale) {
            this._slotCommandWindow.disableBet();
        }
    
        this.refreshStatus();
    
        this._slotCommandWindow.activate();
    };
    
    Scene_SlotMachine.prototype.spinCommand = function () {
        this._coin -= this._bet * scale;
        this._slotCommandWindow.deactivate();
        this._slotCommandWindow.close();
        this._helpWindow.close();
    
        this._winSpot = this.drawLot();
    
        var t = "";
        var i;
        for (i = 0; i < 5; i++) {
            t += reel[i][this._winSpot[i]];
        }
    
        this._rollCount++;
    
        this._spinStart = true;
        this._reels[0].setWinSpot(this._winSpot[0]);
        this._reels[1].setWinSpot(this._winSpot[1]);
        this._reels[2].setWinSpot(this._winSpot[2]);
        this._reels[3].setWinSpot(this._winSpot[3]);
        this._reels[4].setWinSpot(this._winSpot[4]);
        for (i = 0; i < 5; i++) {
            this._reels[i].spin();
        }
    };
    
    Scene_SlotMachine.prototype.result = function () {
        this._rollCount = 0;
    
        var win, tmp;
        win = this.judge(this._winSpot);
        tmp = win;
        if (this._coin + win > Scene_SlotMachine.COIN_MAX_VALUE) {
            win = Scene_SlotMachine.COIN_MAX_VALUE - this._coin;
        }
        this._winCoin = this._correctCoin = win;
    
        var time = 60 * 10;
        if (this._winCoin < time) {
            this._winStep = 1;
        }
        else {
            this._winStep = this._winCoin / time >> 0;
        }
    
        AudioManager.stopSe();
        if (this._winCoin > 0) {
            this._winMessage = winMessage;
            var reg = /Win Coin/gi;
            this._winMessage = this._winMessage.replace(reg, String(tmp));
            
            this._helpWindow.height = this._helpWindow.height + this._slotCommandWindow.height;
            this._helpWindow.y = Graphics.boxHeight - this._helpWindow.height - 10;
            this._replayCommandWindow.y = this._helpWindow.y - 4 - this._replayCommandWindow.height;
            this._helpWindow.setText(this._winMessage);
            this._helpWindow.open();
            AudioManager.playSe({"name": "Slots_Win", "volume": 90, "pitch": 100, "pan": 0});
        }
        else {
            this._helpWindow.height = this._helpWindow.height + this._slotCommandWindow.height;
            this._helpWindow.y = Graphics.boxHeight - this._helpWindow.height - 10;
            this._replayCommandWindow.y = this._helpWindow.y - 4 - this._replayCommandWindow.height;
            this._helpWindow.setText(lostMessage + '\n' + replayMessage);
            this._helpWindow.open();
            this._replayCommandWindow.open();
            this._replayCommandWindow.activate();
            AudioManager.playSe({ "name": "Slots_Lose", "volume": 90, "pitch": 100, "pan": 0 });
        }
    };

    Scene_SlotMachine.prototype.checkLine = function(line, match) {
        var value = null;
        var count = 0;
        for (var i = 0; i < line.length; i++) {
            if (line[i] != value) {
                value = line[i];
                count = 0;
            }
            count += 1;
            if (match <= count) {
                return [true, value];
            }
        }
        return false;
    }
    
    Scene_SlotMachine.prototype.judge = function (spot) {
        var result1 = [];
        result1.push(reel[0][(spot[0] + 1) % reel[0].length]);
        result1.push(reel[1][(spot[1] + 1) % reel[1].length]);
        result1.push(reel[2][(spot[2] + 1) % reel[2].length]);
        result1.push(reel[3][(spot[3] + 1) % reel[3].length]);
        result1.push(reel[4][(spot[4] + 1) % reel[4].length]);
        var result2 = [];
        result2.push(reel[0][spot[0]]);
        result2.push(reel[1][spot[1]]);
        result2.push(reel[2][spot[2]]);
        result2.push(reel[3][spot[3]]);
        result2.push(reel[4][spot[4]]);
        var result3 = [];
        result3.push(reel[0][(this._winSpot[0] - 1 + reel[0].length) % reel[0].length]);
        result3.push(reel[1][(this._winSpot[1] - 1 + reel[1].length) % reel[1].length]);
        result3.push(reel[2][(this._winSpot[2] - 1 + reel[2].length) % reel[2].length]);
        result3.push(reel[3][(this._winSpot[3] - 1 + reel[3].length) % reel[3].length]);
        result3.push(reel[4][(this._winSpot[4] - 1 + reel[4].length) % reel[4].length]);
        
        console.log(result1);
        console.log(result2);
        console.log(result3);

        var returnValue = 0;
        var cursorArray = this._makeCursorArray();
    
        //line1
        var i, base;
        var win = 0;
        base = result1[0];
        if (this._bet > 1) {
            i = 1;        
            if (this.checkLine != false) {
                if (this.checkLine(result1, 5)[0]) {
                    console.log("5 in a row of " + this.checkLine(result1, 5)[1]);
                    base = this.checkLine(result1, 5)[1];
                    i = 5;
                } else if (this.checkLine(result1, 4)[0]) {
                    console.log("4 in a row of " + this.checkLine(result1, 4)[1]);
                    base = this.checkLine(result1, 4)[1];
                    i = 4;
                } else if (this.checkLine(result1, 3)[0]) {
                    console.log("3 in a row of " + this.checkLine(result1, 3)[1]);
                    base = this.checkLine(result1, 3)[1];
                    i = 3;
                }
            }

            console.log(i);
            i--;
            if (i > 1) {
                win = scale * odds[i - 2][base];
                cursorArray[i - 2][base] = true;
                returnValue += win;
            }
        }
    
        //line2
        win = 0;
        base = result2[0];
        if (this._bet > 0) {
            i = 1;      
            if (this.checkLine != false) {
                if (this.checkLine(result2, 5)[0]) {
                    console.log("5 in a row of " + this.checkLine(result2, 5)[1]);
                    base = this.checkLine(result2, 5)[1];
                    i = 5;
                } else if (this.checkLine(result2, 4)[0]) {
                    console.log("4 in a row of " + this.checkLine(result2, 4)[1]);
                    base = this.checkLine(result2, 4)[1];
                    i = 4;
                } else if (this.checkLine(result2, 3)[0]) {
                    console.log("3 in a row of " + this.checkLine(result2, 3)[1]);
                    base = this.checkLine(result2, 3)[1];
                    i = 3;
                }
            }

            console.log(i);
            i--;
            if (i > 1) {
                win = scale * odds[i - 2][base];
                cursorArray[i - 2][base] = true;
                returnValue += win;
            }
        }
    
        //line3
        win = 0;
        base = result3[0];
        if (this._bet > 2) {
            i = 1;      
            if (this.checkLine != false) {
                if (this.checkLine(result3, 5)[0]) {
                    console.log("5 in a row of " + this.checkLine(result3, 5)[1]);
                    base = this.checkLine(result3, 5)[1];
                    i = 5;
                } else if (this.checkLine(result3, 4)[0]) {
                    console.log("4 in a row of " + this.checkLine(result3, 4)[1]);
                    base = this.checkLine(result3, 4)[1];
                    i = 4;
                } else if (this.checkLine(result3, 3)[0]) {
                    console.log("3 in a row of " + this.checkLine(result3, 3)[1]);
                    base = this.checkLine(result3, 3)[1];
                    i = 3;
                }
            }

            console.log(i);
            i--;
            if (i > 1) {
                win = scale * odds[i - 2][base];
                cursorArray[i - 2][base] = true;
                returnValue += win;
            }
        }
    
        this._instructionWindow.blinkCursor(cursorArray);
    
        return returnValue;
    };
    
    Scene_SlotMachine.prototype.drawLot = function () {
        var i, j, l;
        var s;
        var spot = [];
    
        spot.push(Math.random() * reel[0].length >> 0);
        spot.push(Math.random() * reel[1].length >> 0);
        spot.push(Math.random() * reel[2].length >> 0);
        spot.push(Math.random() * reel[3].length >> 0);
        spot.push(Math.random() * reel[4].length >> 0);
    
        //2〜5reel
        var l1, l2, l3;
        var r;
        var target1 = true;
        var target2 = true;
        var target3 = true;
        for (i = 1; i < 5; i++) {
    
            for (j = 0; j < reel[i].length; j++) {
                if (this.isWin(spot, i)) {
                    spot[i] = (spot[i] + 1) % reel[i].length;
                }
                else {
                    break;
                }
            }
    
            l = reel[i - 1].length;
            l1 = reel[i - 1][(spot[i - 1] + 1 + l) % l];
            l2 = reel[i - 1][(spot[i - 1] + 0 + l) % l];
            l3 = reel[i - 1][(spot[i - 1] - 1 + l) % l];
    
            l = reel[i].length;
    
            r = Math.random();
            if (r < this._probability[i - 1][l2] && target2) {
                s = reel[i].indexOf(l2);
                if (s >= 0) {
                    spot[i] = (s + 0 + l) % l;
                    target1 = false;
                    target3 = false;
                }
                else {
                    console.error("Illegal lottery. r:", i,"l2:", l2);
                }
            }
    
            r = Math.random();
            if (r < this._probability[i - 1][l1] && target1) {
                s = reel[i].indexOf(l1);
                if (s >= 0) {
                    spot[i] = (s - 1 + l) % l;
                    target2 = false;
                    target3 = false;
                }
                else {
                    console.error("Illegal lottery. r:", i,"l1:", l1);
                }
            }
    
            r = Math.random();
            if (r < this._probability[i - 1][l3] && target3) {
                s = reel[i].indexOf(l3);
                if (s >= 0) {
                    spot[i] = (s + 1 + l) % l;
                    target1 = false;
                    target2 = false;
                }
                else {
                    console.error("Illegal lottery. r:", i,"l3:", l3);
                }
            }
        }
    
        return spot;
    };
    
    /**
     *
     * @param spot
     * @param r
     * @return {boolean}
     */
    Scene_SlotMachine.prototype.isWin = function (spot, r) {
        return !!(
            reel[r - 1][(spot[r - 1] + 1) % reel[r - 1].length] === reel[r][(spot[r] + 1) % reel[r].length] ||
            reel[r - 1][(spot[r - 1] + 0) % reel[r - 1].length] === reel[r][(spot[r] + 0) % reel[r].length] ||
            reel[r - 1][(spot[r - 1] - 1) % reel[r - 1].length] === reel[r][(spot[r] - 1) % reel[r].length]
        );
    };
    
    Scene_SlotMachine.prototype.correct = function () {
        this._coin += this._correctCoin;
        this._correctCoin = 0;
        if (this._coin >= Scene_SlotMachine.COIN_MAX_VALUE) {
            this._helpWindow.setText(coinFullMessage);
        }
        else {
            this._helpWindow.setText(this._winMessage);
        }
        this._winMessage = "";
        this._replayCommandWindow.open();
        this._replayCommandWindow.activate();
    };
    
    Scene_SlotMachine.prototype.replayCommand = function () {
        this._slotCommandWindow.enableBet();
        this._slotCommandWindow.disableSpin();
        if (this._coin < scale) {
            this._slotCommandWindow.disableBet();
        }
        this._slotCommandWindow.select(0);
        this._replayCommandWindow.close();
        // Reset help window size
        this._helpWindow.height = 64;
        this._helpWindow.y = Graphics.boxHeight - this._helpWindow.height - 10;
        this._replayCommandWindow.y = this._helpWindow.y - 4 - this._replayCommandWindow.height;
    
        this._slotCommandWindow.open();
        this._slotCommandWindow.activate();
        this._helpWindow.setText(helpMessage);
    
        this._bet = 0;
        this.refreshStatus();
    };
    
    Scene_SlotMachine.prototype.refreshStatus = function () {
        this._slotMachineWindow.bet = this._bet * scale;
        this._slotMachineWindow.coin = this._coin - this._bet * scale;
    
        if (this._bet === 0) {
            this._betLine.clear();
        }
        else {
            this._betLine.enableLine(this._bet - 1);
        }
    };
    
    Scene_SlotMachine.prototype.update = function () {
        Scene_MenuBase.prototype.update.call(this);
        if (this._exitFade > 0) {
            this._exitFade--;
            this._backgroundSprite.opacity -= 50;
            for (var i = 0; i < this._reels.length; i++) {
                this._reels[i].opacity -= 50;
            }
            this._betLine.opacity -= 50;
            this._helpWindow.opacity -= 50;
            this._helpWindow.contentsOpacity -= 50;
            this._replayCommandWindow.opacity -= 50;
            this._replayCommandWindow.contentsOpacity -= 50;
            this._replayCommandWindow._customCursorRectSprite.opacity -= 50;
            this._slotCommandWindow.contentsOpacity -= 50;
            this._slotCommandWindow._customCursorRectSprite.opacity -= 50;
            this._instructionWindow.contentsOpacity -= 50;
            this._instructionWindow._counter = 0;
            this._instructionWindow.clearCursor();
            this._slotMachineWindow._windowCoinSprite.opacity -= 50;
            this._slotMachineWindow._windowBetSprite.opacity -= 50;
            this._scale.opacity -= 50;
            if (this._exitFade <= 0) {
                this.popScene();
                $gameSystem.replayBgm();
            }
            return;
        }
        var result = 0;
        if (this._spinStart && !this.isSpinning()) {
                this._spinStart = false;
                this.result();
        }
        else if (this.isWinCounting()) {
            if (this._winCoin <= this._winStep) {
                this._winCoin = 0;
                result = this._coin + this._correctCoin;
                this._slotMachineWindow.coin = result;
                this.correct();
                AudioManager.playSe({ "name": "Slots_Cha-Ching", "volume": 90, "pitch": 100, "pan": 0 });
            }
            else {
                this._winCoin -= this._winStep;
                result = this._coin + this._correctCoin - this._winCoin;
                this._slotMachineWindow.coin = result;
                AudioManager.playSe({ "name": "Slots_GainMoney", "volume": 90, "pitch": 100, "pan": 0 });
            }
        }
    
        if (Input.isRepeated('up') && this._slotCommandWindow.active) {
            if (this._slotCommandWindow.isAllowBet) {
                SoundManager.playOk();
                this.betCommand();
            }
            else {
                SoundManager.playBuzzer();
            }
        }
        if (Input.isRepeated('down') && this._slotCommandWindow.active) {
            if (this._slotCommandWindow.isAllowSpin && !this._spinStart) {
                SoundManager.playOk();
                this.spinCommand();
            }
        }
    };
    
    Scene_SlotMachine.prototype._makeCursorArray = function () {
        var returnValue = [];
        for (var i = 0; i < 3; i++) {
            returnValue.push([]);
            for (var j = 0; j < 6; j++) {
                returnValue[i].push(false);
            }
        }
        return returnValue;
    };
    
    //-----------------------------------------------------------------------------
    // Window_SlotInstruction
    //
    // This window is instruction card for the slot machines.
    
    function Window_SlotInstruction() {
        this.initialize.apply(this, arguments);
    }
    
    Window_SlotInstruction.prototype = Object.create(Window_Base.prototype);
    Window_SlotInstruction.prototype.constructor = Window_SlotInstruction;
    
    Window_SlotInstruction.prototype.initialize = function (x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
    
        this._cursol = [[],[],[]];
        var b = ImageManager.loadBitmap("img/slotmachine/", "win_cursor");
    
        var cx = 28;
        var cy = 22;
        var cw = 168;
        for (var i = 2; i >= 0; i--) {
            for (var j = 5; j >= 0; j--) {
                var sprite = new InstructionCursorSprite(b);
                this.addChild(sprite);
                sprite.x = cx + i * (cw + 24);
                sprite.y = cy + j * 20;
                this._cursol[2 - i].push(sprite);
            }
        }
        this.clearCursor();
    };
    
    Window_SlotInstruction.prototype.lineHeight = function () {
        return 20;
    };
    
    Window_SlotInstruction.prototype.refresh = function () {
        this.setBackgroundType(2);
        this.contents.clear();
    
        if (this._odds) {
            this.contents.fontSize = 22;
            var x = 28;
            var y = -2;
            var w = 168;
            this.drawText(this._odds[2][5], x, y, w, "right");
            y += this.lineHeight();
            this.drawText(this._odds[2][4], x, y, w, "right");
            y += this.lineHeight();
            this.drawText(this._odds[2][3], x, y, w, "right");
            y += this.lineHeight();
            this.drawText(this._odds[2][2], x, y, w, "right");
            y += this.lineHeight();
            this.drawText(this._odds[2][1], x, y, w, "right");
            y += this.lineHeight();
            this.drawText(this._odds[2][0], x, y, w, "right");
    
            x += w + 24;
            y = -2;
            this.drawText(this._odds[1][5], x, y, w, "right");
            y += this.lineHeight();
            this.drawText(this._odds[1][4], x, y, w, "right");
            y += this.lineHeight();
            this.drawText(this._odds[1][3], x, y, w, "right");
            y += this.lineHeight();
            this.drawText(this._odds[1][2], x, y, w, "right");
            y += this.lineHeight();
            this.drawText(this._odds[1][1], x, y, w, "right");
            y += this.lineHeight();
            this.drawText(this._odds[1][0], x, y, w, "right");
    
            x += w + 20;
            y = -2;
            this.drawText(this._odds[0][5], x, y, w, "right");
            y += this.lineHeight();
            this.drawText(this._odds[0][4], x, y, w, "right");
            y += this.lineHeight();
            this.drawText(this._odds[0][3], x, y, w, "right");
            y += this.lineHeight();
            this.drawText(this._odds[0][2], x, y, w, "right");
            y += this.lineHeight();
            this.drawText(this._odds[0][1], x, y, w, "right");
            y += this.lineHeight();
            this.drawText(this._odds[0][0], x, y, w, "right");
        }
        this.contents.fontSize = this.standardFontSize();
    
    };
    
    Window_SlotInstruction.prototype.setOdds = function (odds) {
        this._odds = odds;
    };
    
    Window_SlotInstruction.prototype.clearCursor = function () {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 6; j++) {
                this._cursol[i][j].visible = false;
                this._cursol[i][j]._counter = 0;

            }
        }
    };
    
    Window_SlotInstruction.prototype.blinkCursor = function (array) {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 6; j++) {
                if (array[i][j]) this._cursol[i][j].blink();
            }
        }
    };
    
    //-----------------------------------------------------------------------------
    // Window_SlotMachine
    //
    // This window is the slot machine body.
    
    Window_SlotMachine.prototype = Object.create(Window_Base.prototype);
    Window_SlotMachine.prototype.constructor = Window_SlotMachine;
    
    Window_SlotMachine.prototype.initialize = function(x, y, width, height) {
        Window_Base.prototype.initialize.call(this, x, y, width, height);
    
        this._lastCoin = 0;
        this._lastBet = 0;
        this._coin = 0;
        this._bet = 0;
    };
    
    /**
     * The bitmap used for the coin.
     *
     * @property coinContents
     * @type Bitmap
     */
    Object.defineProperty(Window_SlotMachine.prototype, 'coinContents', {
        get: function() {
            return this._windowCoinSprite.bitmap;
        },
        set: function(value) {
            this._windowCoinSprite.bitmap = value;
        },
        configurable: true
    });
    
    /**
     * The bitmap used for the bet.
     *
     * @property betContents
     * @type Bitmap
     */
    Object.defineProperty(Window_SlotMachine.prototype, 'betContents', {
        get: function() {
            return this._windowBetSprite.bitmap;
        },
        set: function(value) {
            this._windowBetSprite.bitmap = value;
        },
        configurable: true
    });
    
    /**
     * The coin.
     *
     * @property coin
     * @type Number
     */
    Object.defineProperty(Window_SlotMachine.prototype, 'coin', {
        get: function() {
            return this._coin;
        },
        set: function(value) {
            this._coin = value;
        },
        configurable: true
    });
    
    /**
     * The bet.
     *
     * @property bet
     * @type Number
     */
    Object.defineProperty(Window_SlotMachine.prototype, 'bet', {
        get: function() {
            return this._bet;
        },
        set: function(value) {
            this._bet = value;
        },
        configurable: true
    });
    
    Window_SlotMachine.prototype.updateBackground = function() {
        Window_Base.prototype.updateBackground.call(this);
        this.setBackgroundType(2);
    };
    
    Window_SlotMachine.prototype.start = function() {
    };
    
    Window_SlotMachine.prototype.createContents = function() {
        Window_Base.prototype.createContents.call(this);
    
        this.coinContents = new Bitmap(this.contents.measureTextWidth("99999999"), this.lineHeight());
        this.betContents = new Bitmap(this.contents.measureTextWidth("999"), this.lineHeight());
    };
    
    /**
     * @method _createAllParts
     * @private
     */
    Window_SlotMachine.prototype._createAllParts = function() {
        Window_Base.prototype._createAllParts.call(this);
    
        this._windowCoinSprite = new Sprite();
        this.addChild(this._windowCoinSprite);
        this._windowCoinSprite.move(250, 116);
    
        this._windowBetSprite = new Sprite();
        this.addChild(this._windowBetSprite);
        this._windowBetSprite.move(440, 116);
    };
    
    Window_SlotMachine.prototype.refresh = function() {
        this.setBackgroundType(2);
        this.refreshCoin();
        this.refreshBet();
    };
    
    Window_SlotMachine.prototype.update = function () {
        Window_Base.prototype.update.call(this);
    
        if (this._lastCoin !== this._coin) {
            this.refreshCoin();
            this._lastCoin = this._coin;
        }
    
        if (this._lastBet !== this._bet) {
            this.refreshBet();
            this._lastBet = this._bet;
        }
    };
    
    Window_SlotMachine.prototype.refreshCoin = function() {
        this.coinContents.clear();
        this.drawCoinText(this._coin, 0, 0, this.contents.measureTextWidth("9999"), "right");
    };
    
    Window_SlotMachine.prototype.refreshBet = function() {
        this.betContents.clear();
        this.drawBetText(this._bet, 0, 0, this.contents.measureTextWidth("999"), "right");
    };
    
    
    Window_SlotMachine.prototype.drawCoinText = function(text, x, y, maxWidth, align) {
        this.coinContents.drawText(text, x, y, maxWidth, this.lineHeight(), align);
    };
    
    Window_SlotMachine.prototype.drawBetText = function(text, x, y, maxWidth, align) {
        this.betContents.drawText(text, x, y, maxWidth, this.lineHeight(), align);
    };
    
    //-----------------------------------------------------------------------------
    // Window_SlotCommand
    //
    // This window is command window for the slot machines.
    
    function Window_SlotCommand() {
        this.initialize.apply(this, arguments);
    }
    
    Window_SlotCommand.prototype = Object.create(Window_HorzCommand.prototype);
    Window_SlotCommand.prototype.constructor = Window_SlotCommand;
    
    Window_SlotCommand.prototype.initialize = function (x, y) {
        this._betAllow = true;
        this._spinAllow = false;
        Window_HorzCommand.prototype.initialize.call(this, x, y);
        this.opacity = 0;
    };
    
    Window_SlotCommand.prototype.isUsingCustomCursorRectSprite = function () { return true; };
    
    Object.defineProperty(Window_SlotCommand.prototype, 'isAllowBet', {
        get: function () {
            return this._betAllow;
        },
        configurable: true
    });
    
    Object.defineProperty(Window_SlotCommand.prototype, 'isAllowSpin', {
        get: function () {
            return this._spinAllow;
        },
        configurable: true
    });
    
    Window_SlotCommand.prototype.standardPadding = function() {
        return 0;
    }
    
    Window_SlotCommand.prototype.spacing = function() {
        return 6;
    }
    
    Window_SlotCommand.prototype.enableBet = function () {
        this._betAllow = true;
        this.refresh();
    };
    
    Window_SlotCommand.prototype.disableBet = function () {
        this._betAllow = false;
        this.refresh();
    };
    
    Window_SlotCommand.prototype.enableSpin = function () {
        this._spinAllow = true;
        this.refresh();
    };
    
    Window_SlotCommand.prototype.disableSpin = function () {
        this._spinAllow = false;
        this.refresh();
    };
    
    Window_SlotCommand.prototype.makeCommandList = function () {
        this.addCommand(betText, 'bet', this._betAllow);
        this.addCommand(spinText, 'spin', this._spinAllow);
        this.addCommand(LanguageManager.getMessageData("slot_machine_minigame.message_7").text, 'cancel');
    };
    
    Window_SlotCommand.prototype.windowWidth = function () {
        return 420;
    };
    
    Window_SlotCommand.prototype.windowHeight = function () {
        return 48;
    };
    
    Window_SlotCommand.prototype.itemHeight = function () {
        return 48;
    };
    
    Window_SlotCommand.prototype.maxCols = function () {
        return 3;
    };
    
    Window_SlotCommand.prototype.itemTextAlign = function() {
        return "left";
    }
    
    Window_SlotCommand.prototype.drawItem = function (index) {
        var rect = this.itemRectForText(index);
        this.drawOptionBack(index, 0)
        var align = this.itemTextAlign();
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.drawText(this.commandName(index), rect.x + 24, rect.y + 2, rect.width, 'left');
    };
    
    Window_SlotCommand.prototype.drawOptionBack = function(index, x) {
        var rect = this.itemRectForText(index);
        this.changePaintOpacity(true);
        var m = 4;
        var x = 5 + ((rect.x - 26) < 0 ? 0 : rect.x - 26);
        var y = rect.y;
        var w = rect.width + 6;
        var h = rect.height;
    
        if (w > 0 && h > 0 && this._windowskin) {
            var p = 96;
            this.contents.blt(this._windowskin, 0, 0, p, p, x, 0, w, h);
            for (var y = 0; y < h; y += p) {
                for (var x = 0; x < w; x += p) {
                    this.contents.blt(this._windowskin, 0, p, p, p, x, y, p, p);
                }
            }
            var tone = this._colorTone;
            this.contents.adjustTone(tone[0], tone[1], tone[2]);
        }
    
        var x = 5 + ((rect.x - 26) < 0 ? 0 : rect.x - 26);
        var y = rect.y;
        var w = rect.width + 6;
        var h = rect.height;
        if (w > 0 && h > 0 && this._windowskin) {
            var skin = this._windowskin;
            var p = 96;
            var q = 96;
            this.contents.blt(skin, p + m, 0 + 0, p - m * 2, m, m + x, 0, w - m * 2, m); // Upper center
            this.contents.blt(skin, p + m, 0 + q - m, p - m * 2, m, m + x, h - m, w - m * 2, m); // lower center
            this.contents.blt(skin, p + 0, 0 + m, m, p - m * 2, x, m, m, h - m * 2); // left center
            this.contents.blt(skin, p + q - m, 0 + m, m, p - m * 2, x + (w - m), m, m, h - m * 2); // right center
            this.contents.blt(skin, p + 0, 0 + 0, m, m, x, 0, m, m); // top left corner
            this.contents.blt(skin, p + q - m, 0 + 0, m, m, x + (w - m), 0, m, m); // top right corner
            this.contents.blt(skin, p + 0, 0 + q - m, m, m, x, h - m, m, m); // bottom left corner
            this.contents.blt(skin, p + q - m, 0 + q - m, m, m, x + (w - m), h - m, m, m); // bottom right corner
        }
    }
    
    
    //-----------------------------------------------------------------------------
    // Window_ReplayCommand
    //
    // This window is replay command window for the slot machines.
    
    Window_ReplayCommand.prototype = Object.create(Window_Command.prototype);
    Window_ReplayCommand.prototype.constructor = Window_ReplayCommand;
    
    Window_ReplayCommand.prototype.initialize = function (x, y) {
        Window_HorzCommand.prototype.initialize.call(this, x, y);
        this.openness = 0;
    };
    
    Window_ReplayCommand.prototype.isUsingCustomCursorRectSprite = function () { return true; };
    
    Window_ReplayCommand.prototype.makeCommandList = function () {
        this.addCommand(yesText, 'yes');
        this.addCommand(noText, 'no');
    };
    
    Window_ReplayCommand.prototype.windowWidth = function () {
        return 96;
    };
    
    Window_ReplayCommand.prototype.windowHeight = function () {
        return 76;
    };
    
    Window_ReplayCommand.prototype.lineHeight = function() {
        return 26;
    }
    
    Window_ReplayCommand.prototype.standardPadding = function() {
        return 10;
    }
    
    Window_ReplayCommand.prototype.drawItem = function (index) {
        var rect = this.itemRectForText(index);
        var align = this.itemTextAlign();
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));
        this.drawText(this.commandName(index), rect.x + 8, rect.y, rect.width, align);
    };
    
    Window_ReplayCommand.prototype.itemTextAlign = function () {
        return "left";
    }
    
    function Window_SlotsIntroduction() {
        this.initialize.apply(this, arguments);
    }
    
    Window_SlotsIntroduction.prototype = Object.create(Window_Base.prototype);
    Window_SlotsIntroduction.prototype.constructor = Window_SlotsIntroduction;
    
    Window_SlotsIntroduction.prototype.initialize = function (x, y) {
        var width = this.windowWidth();
        var height = this.windowHeight();
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        // this.openness = 0;
    };
    
    Window_SlotsIntroduction.prototype.contentsHeight = function () {
        return (this.height * 3) - this.standardPadding() * 2;
    };
    
    Window_SlotsIntroduction.prototype.isUsingCustomCursorRectSprite = function () { return true; };
    
    Window_SlotsIntroduction.prototype.makeCommandList = function () {
        this.addCommand(yesText, 'yes');
        this.addCommand(noText, 'no');
    };
    
    Window_SlotsIntroduction.prototype.windowWidth = function () {
        return 606;
    };
    
    Window_SlotsIntroduction.prototype.windowHeight = function () {
        return 64;
    };
    
    Window_SlotsIntroduction.prototype.lineHeight = function() {
        return 26;
    }
    
    Window_SlotsIntroduction.prototype.standardPadding = function() {
        return 10;
    }
    
    Window_SlotsIntroduction.prototype.setText = function(text) {
        this.contents.clear();
        if (text && text.contains("<br>")) {
            var lines = text.split("<br>");
            var y = -2;
            for (var i = 0; i < lines.length; i++) {
                this.drawTextEx(lines[i].trim(), 8, y, this.contents.width);
                y += this.lineHeight();
            }
        } else {
            this.drawTextEx(text, 8, -2, this.contents.width);
        }
    };
    
    Window_SlotsIntroduction.prototype.itemTextAlign = function () {
        return "left";
    }
    
    })();
    