//-----------------------------------------------------------------------------
// OMORI Minigame - BlackJack
//-----------------------------------------------------------------------------
function BlackJackCard(suit, type, index) {
    this.suit = suit;
    this.type = type;
    this.index = index;
    this.softAce = false;
}

BlackJackCard.prototype.value = function() {
    if (this.type === "A") return this.softAce ? 1 : 11; // Value can be one or eleven
    else if (this.type === "J" || this.type === "Q" || this.type === "K") return 10;
    else return parseInt(this.type);
}

function Scene_BlackJack() {
    this.initialize.apply(this, arguments);
}
Scene_BlackJack.prototype = Object.create(Scene_MenuBase.prototype);
Scene_BlackJack.prototype.constructor = Scene_MenuBase;

Scene_BlackJack.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);

    ImageManager.loadAtlas("MN_BlackJack");
    $gameSystem.saveBgm();
    AudioManager.stopAll();
    this._exitFade = 0;
    this._titleScreenActive = true;
    this._logo = null;
    this._deck = [];
    // In terms of wins during current play
    this._playerScore = 0;
    this._opponentScore = 0;

    // In terms of 21, cards
    this._playerHand = [];
    this._opponentHand = [];

    // Keep track of previous decision
    this._playerPreviousPlay;
    this._opponentPreviousPlay;
    this._previousWinner;
    this._playerStreak = 0;
    this._opponentStreak = 0;

    // Player earnings
    this._earnings = 100;

    // Bet
    this._wagerAmount = 0;

    // Game Started
    this._gameInProgress = false;
    this._courtesyOptions = false;
    this._resultsOpen = false;
    this._showingOpponentAction = false;
}

Scene_BlackJack.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    // Create Title Screen
    this._titleCommands = new Window_BJTitleCommands();
    this._titleCommands.setHandler('new', this.startGame.bind(this));
    this._titleCommands.setHandler('continue', this.continueGame.bind(this));
    this._titleCommands.setHandler('quit', this.commandExit.bind(this));
    this._titleCommands.setHandler('cancel', this.commandExit.bind(this));
    this.addWindow(this._titleCommands);
    this._titleCommands.visible = false;
    this._titleCommands.deactivate();

    // Create Visuals
    this._dataWindow = new Window_BlackJackData(0, 0);
    this._dataWindow.visible = false;
    this.addWindow(this._dataWindow);

    this._titleWindow = new Window_MinigameTitle();
    this.addWindow(this._titleWindow);
    this._titleWindow.visible = false;

    this._wagerWindow = new Window_Wager(0,0);
    this._wagerWindow.setHandler('5', this.commandWager5.bind(this));
    this._wagerWindow.setHandler('25', this.commandWager25.bind(this));
    this._wagerWindow.setHandler('100', this.commandWager100.bind(this));
    this._wagerWindow.setHandler('quit', this.commandQuit.bind(this));
    this.addWindow(this._wagerWindow);
    this._wagerWindow.deactivate();
    this._wagerWindow.visible = false;

    this._commandWindow = new Window_BlackJackCommands(0, 0);
    this._commandWindow.setHandler('stand', this.commandStand.bind(this));
    this._commandWindow.setHandler('hit', this.commandHit.bind(this));
    this.addWindow(this._commandWindow);

    this._commandWindow.deactivate();
    this._commandWindow.visible = false;
    this.startFadeIn(this.fadeSpeed(), false);
}

alias_Scene_BlackJack_createBackground = Scene_BlackJack.prototype.createBackground;
Scene_BlackJack.prototype.createBackground = function () {
    alias_Scene_BlackJack_createBackground.call(this);
    this.mainImage = new Sprite();
    this.mainImage.bitmap = ImageManager.loadPicture("blackjack_bg");
    this.addChildAt(this.mainImage, 1);
    this._titleScreenActive = true;
};

Scene_BlackJack.prototype.startGame = function () {
    this.startFadeOut(25);
    this._atLeastOneGameStarted = false;
    this._titleScreenActive = false;
    this.removeChild(this._logo);
    this._logo = null;
    this._musicDelay = 30; // Delay playing the music
    this._earnings = 100;
}

Scene_BlackJack.prototype.commandQuit = function () {
    if (this._gameInProgress) {
        this._commandWindow.activate(); return;
    }
    this.payOut();
    // Reset
    this.hardReset();

    this._dataWindow.contents.clear();
    this._commandWindow.deactivate();
    this._commandWindow.visible = false;

    this._gameResults = true;

}

Scene_BlackJack.prototype.gameOver = function() {
    AudioManager.stopAll();
    this.hardReset();
    this._commandWindow.deactivate();
    this._commandWindow.visible = false;

    this._wagerWindow.visible = false;
    this._wagerWindow.deactivate();

    this._dataWindow.visible = false;

    this._titleWindow.refresh(LanguageManager.getMessageData("blackjack_minigame.message_0").text);
    this._titleWindow.visible = true;

    this._gameResults = true;
}

Scene_BlackJack.prototype.continueGame = function () {
    this.startGame();
    this._earnings = $gameVariables.value(827);
    this.updateData();
}

Scene_BlackJack.prototype.toTitle = function () {
    AudioManager.stopAll();
    this._titleScreenActive = true;
    this.mainImage.bitmap = ImageManager.loadPicture("blackjack_bg");
    this._wagerWindow.visible = false;
    this._wagerWindow.deactivate();

    this._titleWindow.visible = false;

    this._titleScreenActive = true;
    if ($gameVariables.value(827) > 0) {
        this._titleCommands.select(1);
    }
}

Scene_BlackJack.prototype.commandExit = function () {
    this._exitFade = 30;
    this.startFadeOut(30);
};

Scene_BlackJack.prototype.commandWager5 = function () {
    this.setWagerAmount(5);
}

Scene_BlackJack.prototype.commandWager25 = function () {
    this.setWagerAmount(25);
}

Scene_BlackJack.prototype.commandWager100 = function () {
    this.setWagerAmount(100);
}

Scene_BlackJack.prototype.commandWager500 = function () {
    this.setWagerAmount(500);
}

Scene_BlackJack.prototype.setWagerAmount = function(amount) {
    if (!(this._earnings >= amount)) {
        this._titleWindow.refresh(LanguageManager.getMessageData("blackjack_minigame.message_1").text + amount);
        this._timer = 90;
        this._wagerWindow.activate();
        return;
    }
    this._wagerAmount = amount;
    this._titleWindow.visible = false;
    this._wagerWindow.deactivate();
    this._wagerWindow.visible = false;
    this.updateData();
    this._dataWindow.visible = true;
    this._commandWindow.activate();
    this._commandWindow.visible = true;
    this._commandWindow.select(0);
    this.commandDeal();
}

Scene_BlackJack.prototype.commandDeal = function() {
    this._dataWindow.visible = true;
    this._titleWindow.visible = false;
    this._deck = [];
    this.softReset();

    // Create the cards in the deck
    var suits = ["Diamond", "Spade", "Heart", "Club"];
    var types = ["K", "Q", "J", 10, 9, 8, 7, 6, 5, 4, 3, 2, "A"];
    var index = 0;
    suits.forEach(suit => {
        types.forEach(type => {
            var card = new BlackJackCard(suit, type, index);
            this._deck.push(card);
            index ++;
        })
    });

    // Randomize Deck
    var curElement = this._deck.length;
    var temp;
    var randomizedLoc;

    while (0 !== curElement) {
        randomizedLoc = Math.floor(Math.random() * curElement);
        curElement -= 1;
        temp = this._deck[curElement];
        this._deck[curElement] = this._deck[randomizedLoc];
        this._deck[randomizedLoc] = temp;
    }

    // Deal first 2 cards to player
    this._playerHand.unshift(this._deck[0]);
    this._deck.splice(0, 1);
    this._playerHand.unshift(this._deck[0]);
    this._deck.splice(0, 1);

    // Deal first 2 cards to oppnonent
    this._opponentHand.unshift(this._deck[0]);
    this._deck.splice(0, 1);
    this._opponentHand.unshift(this._deck[0]);
    this._deck.splice(0, 1);

    this._gameInProgress = true;
    this._courtesyOptions = false;
    this._atLeastOneGameStarted = true;
    this._commandWindow.select(0);
    this.checkWinConditions();
    this.updateData();
    this.switchPhase('player');
}

Scene_BlackJack.prototype.commandHit = function() {
    var se = {
        name: "mini_bj_cardplace",
        volume: 100,
        pitch: 100,
        pan: 0
    };
    AudioManager.playSe(se);
    this._playerHand.unshift(this._deck[0]);
    this._deck.splice(0, 1);
    this._playerPreviousPlay = 'hit';
    this.checkWinConditions();
    this.updateData();
    if (this._gameInProgress) {
        this.switchPhase('opponent');
    }
}

Scene_BlackJack.prototype.opponentHit = function() {
    this.showActionImage('BJ-HIT');
    var se = {
        name: "mini_bj_cardplace",
        volume: 100,
        pitch: 100,
        pan: 0
    };
    AudioManager.playSe(se);
    this._opponentHand.unshift(this._deck[0]);
    this._deck.splice(0, 1);
    this._opponentPreviousPlay = 'hit';
    this.checkWinConditions();
    this.updateData();
    if (this._gameInProgress) {
        this.switchPhase('player');
    }
}

Scene_BlackJack.prototype.commandStand = function() {
    this._playerPreviousPlay = 'stand';
    this.checkWinConditions();
    this.updateData();
    if (this._gameInProgress) {
        this.switchPhase('opponent');
    }
}

Scene_BlackJack.prototype.opponentStand = function() {
    this.showActionImage('BJ-STAY');
    this._opponentPreviousPlay = 'stand';
    this.checkWinConditions();
    this.updateData();
    if (this._gameInProgress) {
        this.switchPhase('player');
    }
}

Scene_BlackJack.prototype.softReset = function() {
    this._deck = [];
    this._playerHand = [];
    this._opponentHand = [];

    this._playerPreviousPlay = null;
    this._opponentPreviousPlay = null;

    this._gameInProgress = false;
    this._courtesyOptions = false;
    this._resultsOpen = false;
    this._showingOpponentAction = false;
}

Scene_BlackJack.prototype.hardReset = function() {
    this._deck = [];
    // In terms of wins during current play
    this._playerScore = 0;
    this._opponentScore = 0;

    // In terms of 21, cards
    this._playerHand = [];
    this._opponentHand = [];

    // Keep track of previous decision
    this._playerPreviousPlay;
    this._opponentPreviousPlay;
    this._previousWinner;
    this._playerStreak = 0;
    this._opponentStreak = 0;

    // Player earnings
    this._earnings = $gameVariables.value(827) || 0;

    // Bet
    this._wagerAmount = 0;

    // Game Started
    this._gameInProgress = false;
    this._courtesyOptions = false;
    this._resultsOpen = false;
    this._showingOpponentAction = false;

}

Scene_BlackJack.prototype.switchPhase = function(turnOwner) {
    if (turnOwner === "opponent") {
        // Play turn animation/image for opponent
        // Opponent AI (Hit or Stand)
        if (this.getCurrentHandValue('player') >= 21) {
            this._commandWindow.activate();
            return;
        } else if (this.getCurrentHandValue('opponent') < 17) {
            this.opponentHit();
            this._commandWindow.activate();
        } else {
            this.opponentStand();
            this._commandWindow.activate();
        }

    } else {
        // Play turn animation/image for player
        // Hand control to player
        this._commandWindow.activate();
    }
}

Scene_BlackJack.prototype.getCurrentHandValue = function(turnOwner) {
    var value = 0;
    if (turnOwner === 'player') {
        this._playerHand.forEach(card => {
            value += card.value();
        });
        // Account for any aces that might be bringing up the value unnecessarily
        while (value > 21) {
            for (var i = 0; i < this._playerHand.length; i++) {
                if (this._playerHand[i].type === 'A' && value > 21) {
                    this._playerHand[i].softAce = true;
                    value -= 10;
                }
                if (value <= 21) break;
            }
            break
        }
    } else {
        this._opponentHand.forEach(card => {
            value += card.value();
        });
        // Account for any aces that might be bringing up the value unnecessarily
        while (value > 21) {
            for (var i = 0; i < this._opponentHand.length; i++) {
                if (this._opponentHand[i].type === 'A', value > 21) {
                    this._opponentHand[i].softAce = true;
                    value -= 10;
                }
                if (value <= 21) break;
            }
            break
        }
    }
    value = 0;
    // Try again
    if (turnOwner === 'player') {
        console.log("Player: ")
        this._playerHand.forEach(card => {
            value += card.value();
        });
    } else {
        console.log("Opponent: ")
        this._opponentHand.forEach(card => {
            value += card.value();
        });
    }
    console.log(value);
    return value;
}

Scene_BlackJack.prototype.courtesyOptions = function() {
    // YOU'VE ALREADY LOST!
    this._courtesyOptions = true;
    this.switchPhase('player');
}

Scene_BlackJack.prototype.endGame = function(winner) {
    this._gameInProgress = false;
    if (winner === 'player' && this._previousWinner != 'opponent'){
        this._playerStreak += 1;
        this._opponentStreak = 0;
    } else if (winner === 'opponent' && this._previousWinner != 'player') {
        this._playerStreak = 0;
        this._opponentStreak += 1;
    } else {
        this._opponentStreak = 0; this._playerStreak = 0;
    }
    if (winner === 'player') {
        this._playerScore += 1;
        this._earnings += this._wagerAmount * this._playerStreak;
        // console.log(this._wagerAmount + ' * ' + this._playerStreak);
    } else if (winner === 'opponent') {
        this._opponentScore += 1;
        this._earnings -= this._wagerAmount * this._opponentStreak;
        // console.log(this._wagerAmount + ' * ' + this._opponentStreak);
    }
    this.updateData();
}

Scene_BlackJack.prototype.updateData = function() {
    this._dataWindow._playerHand = this._playerHand;
    this._dataWindow._opponentHand = this._opponentHand;
    this._dataWindow._playerScore = this._playerScore;
    this._dataWindow._opponentScore = this._opponentScore;
    this._dataWindow._currentEarnings = this._earnings;
    this._dataWindow._currentPlayerBonus = this._playerStreak + 1;
    this._dataWindow.refresh();
}

Scene_BlackJack.prototype.showResultImage = function(filename) {
    if (this._winner === "player"){
        var se = {
            name: "mini_bj_win",
            volume: 100,
            pitch: 100,
            pan: 0
        };
        AudioManager.playSe(se);
    } else if (this._winner === "opponent") {
        var se = {
            name: "mini_bj_lose",
            volume: 100,
            pitch: 100,
            pan: 0
        };
        AudioManager.playSe(se);
    }

    this._commandWindow.deactivate();
    this._dataWindow._showOpponentHand = true;
    this.updateData();
    this._result = new Sprite();
    this._result.bitmap = ImageManager.loadPicture(filename);
    this.addChild(this._result);
    this._resultsOpen = true;
    this._timer = 120;
}

Scene_BlackJack.prototype.showActionImage = function (filename) {
    this._timer = 90;
    this._commandWindow.deactivate();
    this.updateData();
    this._action = new Sprite();
    this._action.bitmap = ImageManager.loadPicture(filename);
    this.addChild(this._action);
    this._showingOpponentAction = true;
}

Scene_BlackJack.prototype.checkWinConditions = function() {
    var _playerValue = this.getCurrentHandValue('player');
    var _opponentValue = this.getCurrentHandValue('opponent');

    if (this._courtesyOptions) {
        this._courtesyOptions = false;
        this.setupResults("BJ-LOSE", "opponent");
        this._resultsDelay = 180;
        return;
    }
    // Check For 21
    if (_playerValue === 21 && _opponentValue === 21) {
        this.setupResults("BJ-TIE");
        this._resultsDelay = 120;
        // Check if natural (actually check the cards to see if it is an Ace + Face)
        return;
    } else if (_playerValue === 21) {
        this.setupResults("BJ-NATURAL", "player");
        this._resultsDelay = 120;
        return;
    } else if (_opponentValue === 21) {
        this.updateData();
        this.courtesyOptions();
        return;
    }

    // Check for BUST (Over 21)
    if (_playerValue > 21) {
        this.setupResults("BJ-BUST", "opponent");
        this._resultsDelay = 120;
        return;
    } else if (_opponentValue > 21){
        this.setupResults("BJ-WIN", "player");
        this._resultsDelay = 120;
        return;
    }

    // Check for game over
    if (this._playerPreviousPlay === 'stand' && this._opponentPreviousPlay === 'stand') {
        if (_playerValue === _opponentValue) {
            this.setupResults("BJ-TIE");
            this._resultsDelay = 120;
            return;
        } else if (_playerValue > _opponentValue) {
            this.setupResults("BJ-WIN", "player");
            this._resultsDelay = 120;
            return;
        } else if (_opponentValue > _playerValue) {
            this.setupResults("BJ-LOSE", "opponent");
            this._resultsDelay = 120;
            return;
        }

        return;
    }
    this.updateData();
}

Scene_BlackJack.prototype.setupResults = function(matchOutcome, winner) {
    this._matchOutcome = matchOutcome;
    this._winner = winner
}

Scene_BlackJack.prototype.update = function() {
    Scene_Base.prototype.update.call(this);
    if (this._exitFade > 0) {
        this._exitFade--;
        this._logo.opacity -= 12;
        if (this._exitFade <= 0) {
            this.removeChild(this._logo);
            this.removeChild(this.mainImage);
            this.removeChild(this._titleCommands);
            this.popScene();
            $gameSystem.replayBgm();
        }
        return;
    }

    if (this._resultsDelay > 0) {
        this._commandWindow.deactivate();
        this._resultsDelay--;
        if (this._resultsDelay <= 0) {
            this.showResultImage(this._matchOutcome);
            this.endGame(this._winner);
            this._winner = null;
            this._matchOutcome = null;
        }
    }
    if (this._musicDelay > 0) {
        this._musicDelay -= 1;
        if (this._musicDelay <= 0) {
            var bgm = {
                name: "minigame_blackjack",
                volume: 100,
                pitch: 100,
                pan: 0
            };
            AudioManager.playBgm(bgm);
            this.mainImage.bitmap = ImageManager.loadPicture("blackjack_layout");
            this._titleCommands.deactivate();
            this._titleCommands.visible = false;
            this._wagerWindow.activate();
            this._wagerWindow.visible = true;
            this._wagerWindow.select(0);
            this._titleWindow.visible = true;
            this._titleWindow.refresh(LanguageManager.getMessageData("blackjack_minigame.message_2").text + this._earnings + LanguageManager.getMessageData("blackjack_minigame.message_3").text);

            this.startFadeIn(100);
        }
    }
    if (this._gameResults) {
        if (Input.isTriggered('ok')) {
            this.toTitle();
            this._gameResults = false;
        }
    }
    if (this._titleScreenActive) {
        if (!this._logo) {
            this._logo = new Sprite();
            this._logo.bitmap = ImageManager.loadPicture("blackjack_logo");
            this._logo.x = (Graphics.boxWidth - 418) / 2;
            this._logo.y = Graphics.boxHeight;
            this.addChild(this._logo);

            this._frame = new Sprite();
            this._frame.bitmap = ImageManager.loadPicture("blackjack_frame");
            this.addChild(this._frame);

        } else if (this._logo && this._logo.y > 128) {
            this._logo.y -= 2;
            if (Input.isTriggered('ok') || Input.isTriggered('cancel')) {
                this._logo.y = 128;
                this._titleCommands.activate();
            }
        } else {
            if (this._titleCommands.visible === false) {
                this.removeChild(this._frame);
                this._frame = null;
                this._titleCommands.refresh();
                this._titleCommands.visible = true;
                this._titleCommands.activate();
            }
        }
    }
    if (this._timer > 0 && this._wagerWindow.visible) {
        this._timer --;
        if (this._timer <= 0) {
            this._titleWindow.refresh(LanguageManager.getMessageData("blackjack_minigame.message_2").text + this._earnings + LanguageManager.getMessageData("blackjack_minigame.message_3").text);
        }
    }
    if (this._showingOpponentAction){
        if (this._commandWindow.active) this._commandWindow.deactivate();
        if (this._timer > 0)  {
            this._timer --;
        }
        if (this._action) {
            if (Input.isTriggered('ok') || this._timer < 1) {
                if (this._action) this.removeChild(this._action);
                this._commandWindow.refresh();
                this._commandWindow.activate();
                this._commandWindow.visible = true;

                this.updateData();
                this._showingOpponentAction = false;
            }
        }
    }
    if (this._resultsOpen) {
        if (this._commandWindow.active) { this._commandWindow.deactivate(); }

        if (this._timer > 0) {
            this._timer--;
        } else {
            if (Input.isTriggered('ok')) {
                this.removeChild(this._result);
                this._commandWindow.refresh();
                this._commandWindow.deactivate();
                this._commandWindow.select(2);
                this._commandWindow.visible = false;
                this._dataWindow._showOpponentHand = false;
                if (this._earnings <= 0) {
                    this.gameOver();
                } else {
                    this._titleWindow.refresh(LanguageManager.getMessageData("blackjack_minigame.message_2").text + this._earnings + LanguageManager.getMessageData("blackjack_minigame.message_3").text);
                    this._titleWindow.visible = true;
                    this._dataWindow.visible = false;
                    this.softReset();
                    this._wagerWindow.activate();
                    this._wagerWindow.visible = true;
                }
                this.updateData();
                this._resultsOpen = false;
            }
        }
    }
}

Scene_BlackJack.prototype.payOut = function() {
    this._titleWindow.visible = true;
    if (this._atLeastOneGameStarted) this._titleWindow.refresh(LanguageManager.getMessageData("blackjack_minigame.message_2").text + this._earnings + "!");
    else this._titleWindow.refresh(LanguageManager.getMessageData("blackjack_minigame.message_8").text + this._earnings + "!");
    $gameVariables.setValue(827, this._earnings);
}

//=============================================================================
//
//=============================================================================
function Window_Wager() {
    this.initialize.apply(this, arguments);
}

Window_Wager.prototype = Object.create(Window_HorzCommand.prototype);
Window_Wager.prototype.constructor = Window_Wager;

Window_Wager.prototype.initialize = function () {
    var x = (Graphics.boxWidth - this.windowWidth()) / 2;
    var y = Graphics.boxHeight - 86;
    Window_HorzCommand.prototype.initialize.call(this, x, y);
    this.opacity = 0;
    this.refresh();
};

Window_Wager.prototype.standardPadding = function () {
    return 0;
};

Window_Wager.prototype.spacing = function () {
    return 12;
};

Window_Wager.prototype.windowWidth = function () {
    return Graphics.boxWidth - 108;
};

Window_Wager.prototype.windowHeight = function () {
    return this.fittingHeight(1);
};

Window_Wager.prototype.itemTextAlign = function () {
    return 'center';
};

Window_Wager.prototype.select = function (index) {
    this._index = index;
    this._stayCount = 0;
    this.ensureCursorVisible();
    this.updateCursor();
    this.callUpdateHelp();
    this.refresh();
};

Window_Wager.prototype.drawItem = function (index) {
    this.contents.fontBold = false;
    this.contents.fontItalic = false;
    this.contents.fontSize = 20;
    this.contents.outlineColor = 'rgba(0, 0, 0, 0.5)';
    this.contents.outlineWidth = 0;
    this.changeTextColor(this.textColor(6));
    this.contents.fontFace = 'Helvetica';

    var rect = this.itemRectForText(index);
    if (this.currentSymbol() === this.commandSymbol(index)) {
        var bitmap = ImageManager.loadPicture('BJ-Button-Selected');
        if (this.isCommandEnabled(index)) this.changeTextColor(this.textColor(0));
        else this.changeTextColor(this.textColor(7));
    } else {
        var bitmap = ImageManager.loadPicture('BJ-Button');
    }

    this.contents.blt(bitmap, 0, 0, 124, 36, rect.x - 22, rect.y);

    var align = this.itemTextAlign();
    this.drawText(this.commandName(index), rect.x - 18, rect.y, rect.width, align);
}

Window_Wager.prototype.makeCommandList = function () {
    const bets = LanguageManager.getMessageData("XX_BLUE.Yin_Blackjack").bets
    this.addCommand(bets[0], '5')
    this.addCommand(bets[1], '25');
    this.addCommand(bets[2], '100');
    this.addCommand(bets[3], 'quit');
}

//=============================================================================
//
//=============================================================================
function Window_BlackJackCommands() {
    this.initialize.apply(this, arguments);
}

Window_BlackJackCommands.prototype = Object.create(Window_HorzCommand.prototype);
Window_BlackJackCommands.prototype.constructor = Window_BlackJackCommands;

Window_BlackJackCommands.prototype.initialize = function () {
    var x = (Graphics.boxWidth - this.windowWidth()) / 2;
    var y = Graphics.boxHeight - 86;
    Window_HorzCommand.prototype.initialize.call(this, x, y);
    this._gameInProgress = false;
    this.opacity = 0;
    this.refresh();
};

Window_BlackJackCommands.prototype.standardPadding = function () {
    return 0;
};

Window_BlackJackCommands.prototype.spacing = function () {
    return 12;
};

Window_BlackJackCommands.prototype.maxCols = function () {
    return 2;
};

Window_BlackJackCommands.prototype.windowWidth = function () {
    return 302;
};

Window_BlackJackCommands.prototype.windowHeight = function () {
    return this.fittingHeight(1);
};


Window_BlackJackCommands.prototype.itemTextAlign = function () {
    return 'center';
};

Window_BlackJackCommands.prototype.select = function (index) {
    this._index = index;
    this._stayCount = 0;
    this.ensureCursorVisible();
    this.updateCursor();
    this.callUpdateHelp();
    this.refresh();
};

Window_BlackJackCommands.prototype.drawItem = function(index) {
    this.contents.fontBold = false;
    this.contents.fontItalic = false;
    this.contents.fontSize = 20;
    this.contents.outlineColor = 'rgba(0, 0, 0, 0.5)';
    this.contents.outlineWidth = 0;
    this.changeTextColor(this.textColor(6));
    this.contents.fontFace = 'Helvetica';

    var rect = this.itemRectForText(index);
    if (this.currentSymbol() === this.commandSymbol(index)) {
        var bitmap = ImageManager.loadPicture('BJ-ButtonLong-Selected');
        if (this.isCommandEnabled(index)) this.changeTextColor(this.textColor(0));
        else this.changeTextColor(this.textColor(7));
    } else {
        var bitmap = ImageManager.loadPicture('BJ-ButtonLong');
    }
    if (!this.isCommandEnabled(index)) this.changeTextColor('#939393');

    this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, rect.x - 22, rect.y);

    var align = this.itemTextAlign();
    this.drawText(this.commandName(index), rect.x - 18, rect.y, rect.width, align);
}

Window_BlackJackCommands.prototype.makeCommandList = function () {
    const comm = LanguageManager.getMessageData("XX_BLUE.Yin_Blackjack").jack_commands
    this.addCommand(comm[0].toUpperCase(), 'stand');
    this.addCommand(comm[1].toUpperCase(), 'hit');
}

//=============================================================================
//
//=============================================================================
function Window_BlackJackData() {
    this.initialize.apply(this, arguments);
}

Window_BlackJackData.prototype = Object.create(Window_Base.prototype);
Window_BlackJackData.prototype.constructor = Window_BlackJackData;

Window_BlackJackData.prototype.initialize = function () {
    Window_Base.prototype.initialize.call(this, 0, 0, this.windowWidth(), this.windowHeight());
    this.opacity = 0;
    this._playerHand;
    this._opponentHand;
    this._playerScore = 0;
    this._opponentScore = 0;
    this._currentEarnings = 0
    this._currentPlayerBonus = 1;
    this._showOpponentHand = false;
    this.refresh();
}

Window_BlackJackData.prototype.windowWidth = function () {
    return Graphics.boxWidth;
};

Window_BlackJackData.prototype.windowHeight = function () {
    return Graphics.boxHeight;
};

Window_BlackJackData.prototype.refresh = function() {
    this.contents.clear();
    this.contents.fontBold = false;
    this.contents.fontItalic = false;
    this.contents.fontSize = 20;
    this.contents.outlineColor = 'rgba(0, 0, 0, 0.5)';
    this.contents.outlineWidth = 0;
    this.changeTextColor(this.textColor(6));
    this.contents.fontFace = 'Times New Roman';
    let dealerStreak = SceneManager._scene._opponentStreak > 0 ? LanguageManager.getMessageData("XX_BLUE.Yin_Blackjack").streak_string.format(SceneManager._scene._opponentStreak) : "";
    let playerStreak = SceneManager._scene._playerStreak > 0 ? LanguageManager.getMessageData("XX_BLUE.Yin_Blackjack").streak_string.format(SceneManager._scene._playerStreak) : "";
    this.drawText(LanguageManager.getMessageData("XX_BLUE.Yin_Blackjack").dealer_streak.format(dealerStreak), 48, 32, this.windowWidth());
    this.drawText(LanguageManager.getMessageData("XX_BLUE.Yin_Blackjack").player_streak.format(playerStreak), 48, 196, this.windowWidth());
    
    this.drawText(LanguageManager.getMessageData("XX_BLUE.Yin_Blackjack").score.format(this._opponentScore, this._playerScore), 0, 22, this.windowWidth() - 76, 'right');
    this.drawText(LanguageManager.getMessageData("XX_BLUE.Yin_Blackjack").bet.format(SceneManager._scene._wagerAmount, this._currentPlayerBonus, this._currentEarnings), 0, 40, this.windowWidth() - 76, 'right');

    var spacing = 96;
    if (this._playerHand != null) {
        for (var i = 0; i < this._playerHand.length; i++) {
            if (this._playerHand.length > 5) var spacing = 96 - ((this._playerHand.length - 5) * 14);
            this.getCardImage(this._playerHand[i].index, 64 + (spacing * i), 232);
            // this.drawText(this._playerHand[i].value(), 64 + (spacing * i), 340, 90, 'center');
        }
        // this.drawText(SceneManager._scene.getCurrentHandValue('player'), 32, 232 + 48);
    }

    if (this._opponentHand != null) {
        if (this._opponentHand.length > 5) var spacing = 96 - ((this._opponentHand.length - 5) * 14);
        for (var i = 0; i < this._opponentHand.length; i++) {
            if (i === 0 && !this._showOpponentHand) {
                var bitmap = ImageManager.loadPicture('CardBack');
                this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 64 + (spacing * i), 68);
            } else {
                this.getCardImage(this._opponentHand[i].index, 64 + (spacing * i), 68);
                // this.drawText(this._opponentHand[i].value(), 64 + (spacing * i), 176, 90, 'center');
            }
        }
        // this.drawText(SceneManager._scene.getCurrentHandValue('opponent'), 32, 68 + 48);
    }
    this.resetTextColor();
}

Window_BlackJackData.prototype.getCardImage = function(index, x, y) {
    var bitmap = ImageManager.loadPicture('Cards');
    var pw = bitmap.width / 13;
    var ph = bitmap.height / 4;
    var n = index;
    var sx = n % 13 * pw;
    var sy = (Math.floor(n / 13)) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
}

//=============================================================================
//
//=============================================================================
function Window_MinigameTitle() {
    this.initialize.apply(this, arguments);
}

Window_MinigameTitle.prototype = Object.create(Window_Base.prototype);
Window_MinigameTitle.prototype.constructor = Window_MinigameTitle;

Window_MinigameTitle.prototype.initialize = function () {
    var x = (Graphics.boxWidth - this.windowWidth()) / 2;
    var y = (Graphics.boxHeight - this.windowHeight()) / 3;
    Window_Base.prototype.initialize.call(this, x, y, this.windowWidth(), this.windowHeight());
    this.opacity = 0;
};

Window_MinigameTitle.prototype.refresh = function(text) {
    this.contents.clear();
    this.contents.fontBold = false;
    this.contents.fontItalic = false;
    this.contents.fontSize = 20;
    this.contents.outlineColor = 'rgba(0, 0, 0, 0.5)';
    this.contents.outlineWidth = 0;
    this.changeTextColor(this.textColor(6));
    this.contents.fontFace = 'Times New Roman';
    if (text && text.contains("<br>")) {
        var lines = text.split("<br>");
        var y = 0;
        for (var i = 0; i < lines.length; i++) {
            this.drawText(lines[i].trim(), -18, y, this.windowWidth(), 'center');
            y += 18;
        }
    } else {
        this.drawText(text, -18, 18, this.windowWidth(), 'center');
    }

}

Window_MinigameTitle.prototype.windowWidth = function () {
    return (Graphics.boxWidth / 2) + 64;
};

Window_MinigameTitle.prototype.windowHeight = function () {
    return this.fittingHeight(3);
};

//=============================================================================
//
//=============================================================================
function Window_BJTitleCommands() {
    this.initialize.apply(this, arguments);
}

Window_BJTitleCommands.prototype = Object.create(Window_HorzCommand.prototype);
Window_BJTitleCommands.prototype.constructor = Window_BJTitleCommands;

Window_BJTitleCommands.prototype.initialize = function () {
    var x = (Graphics.boxWidth - this.windowWidth()) / 2;
    var y = Graphics.boxHeight - 86;
    Window_HorzCommand.prototype.initialize.call(this, x, y);
    this.opacity = 0;
    this.refresh();
    if ($gameVariables.value(827) > 0) {
        this.select(1);
    }
};

Window_BJTitleCommands.prototype.standardPadding = function () {
    return 0;
};

Window_BJTitleCommands.prototype.spacing = function () {
    return 12;
};

Window_BJTitleCommands.prototype.maxCols = function () {
    return 3;
};

Window_BJTitleCommands.prototype.windowWidth = function () {
    return 459;
};

Window_BJTitleCommands.prototype.windowHeight = function () {
    return this.fittingHeight(1);
};


Window_BJTitleCommands.prototype.itemTextAlign = function () {
    return 'center';
};

Window_BJTitleCommands.prototype.select = function (index) {
    this._index = index;
    this._stayCount = 0;
    this.ensureCursorVisible();
    this.updateCursor();
    this.callUpdateHelp();
    this.refresh();
};

Window_BJTitleCommands.prototype.cursorRight = function (wrap) {
    var index = this.index();
    var maxItems = this.maxItems();
    var maxCols = this.maxCols();
    if (maxCols >= 2 && (index < maxItems - 1 || (wrap && this.isHorizontal()))) {
        if (this._list[index + 1] && this.isCommandEnabled(index + 1)) this.select((index + 1) % maxItems);
        else if (!this._list[index + 1]) {
            this.select(0);
        } else this.select(2);
    }
};

Window_BJTitleCommands.prototype.cursorLeft = function (wrap) {
    var index = this.index();
    var maxItems = this.maxItems();
    var maxCols = this.maxCols();
    if (maxCols >= 2 && (index > 0 || (wrap && this.isHorizontal()))) {
        if (this._list[index - 1] && this.isCommandEnabled(index - 1)) this.select((index - 1 + maxItems) % maxItems);
        else if (!this._list[index - 1] && this.isCommandEnabled(maxItems - 1)) {
            this.select(maxItems - 1);
        } else this.select(0);
    }
};

Window_BJTitleCommands.prototype.drawItem = function (index) {
    this.contents.fontBold = false;
    this.contents.fontItalic = false;
    this.contents.fontSize = 20;
    this.contents.outlineColor = 'rgba(0, 0, 0, 0.5)';
    this.contents.outlineWidth = 0;
    this.changeTextColor(this.textColor(6));
    this.contents.fontFace = 'Helvetica';

    var rect = this.itemRectForText(index);
    if (this.currentSymbol() === this.commandSymbol(index)) {
        var bitmap = ImageManager.loadPicture('BJ-ButtonLong-Selected');
        if (this.isCommandEnabled(index)) this.changeTextColor(this.textColor(0));
        else this.changeTextColor(this.textColor(7));
    } else {
        var bitmap = ImageManager.loadPicture('BJ-ButtonLong');
    }
    if (!this.isCommandEnabled(index)) this.changeTextColor('#939393');

    this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, rect.x - 22, rect.y);

    var align = this.itemTextAlign();
    this.drawText(this.commandName(index), rect.x - 18, rect.y, rect.width, align);
}

Window_BJTitleCommands.prototype.makeCommandList = function () {
    const commands = LanguageManager.getMessageData("XX_BLUE.Yin_Blackjack").maincommands
    this.addCommand(commands[0].toUpperCase(), 'new');
    this.addCommand(commands[1].toUpperCase(), 'continue', $gameVariables.value(827) >= 5);
    this.addCommand(commands[2].toUpperCase(), 'quit');
}
