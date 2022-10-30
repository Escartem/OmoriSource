// ----------------------------------------------------------------------------
// OMORI Minigame - Pet Rocks
//-----------------------------------------------------------------------------
// Rock Template
//-----------------------------------------------------------------------------
function Rock() {
    this.initialize.apply(this, arguments);
}

Rock.prototype = Object.create(Sprite_Base.prototype);
Rock.prototype.construstor = Rock;

Rock.prototype.initialize = function(name) {
    Sprite_Base.prototype.initialize.call(this);
    // Defaults
    this.name = "ROCK-" + name;
    this.bitmap = ImageManager.loadPicture("ROCK-" + name);
    this.hp = 6;
    this.frequency = [33, 33, 33];
    this.options = ["rock", "paper", "scissors"];
    this.setSprite(false);
    this.setupRock(name);
}

Rock.prototype.setupRock = function(name) {
    switch (name) {
        case "Jash":
            this.hp = 3;
            this.frequency = [0, 0, 0];
            break;
        case "TomatoGirl":
            this.hp = 3;
            this.frequency = [60, 40, 0];
            break;
        case "RoseLad":
            this.hp = 3;
            this.frequency = [0, 60, 40];
            break;
        case "TheMuncherKing":
            this.hp = 3;
            this.frequency = [40, 0, 60];
            break;
        case "PapaChip":
            this.hp = 3;
            this.frequency = [50, 25, 25];
            break;
        case "Bunny":
            this.hp = 3;
            this.frequency = [25, 50, 25];
            break;
        case "SaucyK":
            this.hp = 6;
            this.frequency = [0, 0, 100];
            break;
        case "Pluto":
            this.hp = 6;
            this.frequency = [100, 0, 0];
            break;
        case "LilG":
            this.hp = 4;
            this.frequency = [33, 33, 33];
            break;
        case "P'terry":
            this.hp = 5;
            this.frequency = [25, 25, 50];
            break;
        case "CoolSNake":
            this.hp = 5;
            this.frequency = [25, 50, 25];
            break;
        case "Ocotaco":
            this.hp = 5;
            this.frequency = [50, 25, 25];
            break;
        case "OneWingAsh":
            this.hp = 9;
            this.frequency = [33, 33, 33];
            break;
    }
}

    Rock.prototype.setSprite = function(attacking) {
        var pw = 128;
        var ph = 128;
        if (attacking) {
            var sx = 1 * pw;
            var sy = 0;
            this.setFrame(sx, sy, pw, ph);
        } else {
            var sx = 0 * pw;
            var sy = 0;
            this.setFrame(sx, sy, pw, ph);
        }
    }

    Rock.prototype.flash = function() {
        this.flashing = 40;
    }

    Rock.prototype.update = function() {
        if(this.flashing > 0) {
            this.flashing --;
            if (this.flashing % 5 === 0) this.visible = this.visible ? false : true;
            if (this.flashing <= 0) this.visible = true;
        }
    }

function Rock_Result() {
    this.initialize.apply(this, arguments);
}

Rock_Result.prototype = Object.create(Sprite_Base.prototype);
Rock_Result.prototype.construstor = Rock_Result;

Rock_Result.prototype.initialize = function (x, y) {
    Sprite_Base.prototype.initialize.call(this);
    this.visible = false;
    this.bitmap = ImageManager.loadPicture('ROCK-Animation');
    this.x = x; this.y = y;
}

Rock_Result.prototype.setSprite = function (result, id) {
    var pw = 64;
    var ph = 64;
    if (result) {
        var sx = id * pw;
        if (result === "defend") var sy = 0;
        if (result === "hit") var sy = 1 * ph;
        if (result === "draw") var sy = 2 * ph;
        this.setFrame(sx, sy, pw, ph);
        this.visible = true;
    }
}

//=============================================================================
// Gameplay
//=============================================================================
function Scene_PetRocks() {
    this.initialize.apply(this, arguments);
}
Scene_PetRocks.prototype = Object.create(Scene_Base.prototype);
Scene_PetRocks.prototype.constructor = Scene_MenuBase;

Scene_PetRocks.prototype.initialize = function () {
    Scene_Base.prototype.initialize.call(this);
    this.startFadeIn(this.fadeSpeed(), false);
    ImageManager.loadAtlas("MN_PetRocks");
    ImageManager.loadPicture("Sequence/ROCK-Intro_01");
    ImageManager.loadPicture("Sequence/ROCK-Intro_02");
    ImageManager.loadPicture("Sequence/ROCK-Intro_03");
    ImageManager.loadPicture("Sequence/ROCK-Intro_04");
    ImageManager.loadPicture("Sequence/ROCK-Intro_05");
    ImageManager.loadPicture("Sequence/ROCK-Intro_06");
    ImageManager.loadPicture("Sequence/ROCK-Intro_07");

    this._titleShowing = true;
    this._gameEndTimer = 0;
    this._onStart = false;
}

Scene_PetRocks.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.mainImage = new Sprite();
    this.mainImage.bitmap = ImageManager.loadPicture('ROCK-Background');
    this.addChild(this.mainImage);

    this.startGame();
}

Scene_PetRocks.prototype.startGame = function(){
    var bgm = {
        name: "minigame_jash_title",
        volume: 100,
        pitch: 100,
        pan: 0
    };
    AudioManager.playBgm(bgm);

    this._player = new Rock("Jash");
    this.addChild(this._player);
    this._player.x = 160;
    this._player.y = 176;
    this._player.currentCombo = 1;

    this._opponent = new Rock($gameVariables.value(824));
    this.addChild(this._opponent);
    this._opponent.x = 640 - 160 - 128;
    this._opponent.y = 176;
    this._opponent.currentCombo = 1;

    this._options = new Window_PetRockOptions();
    this._options.setHandler('rock', this.onChoice.bind(this, "rock"));
    this._options.setHandler('paper', this.onChoice.bind(this, "paper"));
    this._options.setHandler('scissors', this.onChoice.bind(this, "scissors"));
    this.addChild(this._options);
    this._playerHearts = [];
    for (var i = 0; i < this._player.hp; i++) {
        var sprite = new Sprite();
        sprite.bitmap = ImageManager.loadPicture('ROCK-Heart');
        sprite.id = i;
        sprite.x = 174 + (i % 3 * 32);
        sprite.y = 106;
        this._playerHearts.push(sprite);
        this.addChild(sprite);
    }
    this._playerHearts.reverse();

    this._opponentHearts = [];
    for (var i = 0; i < this._opponent.hp; i++) {
        var sprite = new Sprite();
        sprite.bitmap = ImageManager.loadPicture('ROCK-Heart');
        sprite.x = 382 + (i % 3 * 32);
        sprite.id = i;
        if (i > 5) {
            sprite.y = 106 + 28 + 28;
        } else if (i > 2) {
            sprite.y = 106 + 28;
        } else {
            sprite.y = 106;
        }

        this._opponentHearts.push(sprite);
        this.addChild(sprite);
    }
    this._opponentHearts.reverse();

    this._comboCounter = new Sprite();
    this._comboCounter.bitmap = ImageManager.loadPicture("ROCK-ComboCounter");
    this._comboCounter.x = 320 - 37;
    this._comboCounter.y = 92;
    this.addChild(this._comboCounter);

    this._comboNumber = new Sprite();
    this._comboNumber.bitmap = ImageManager.loadPicture("ROCK-Combo1");
    this._comboNumber.x = 320;
    this._comboNumber.y = 114;
    this.addChild(this._comboNumber);
}

Scene_PetRocks.prototype.onChoice = function(choice) {
    if (!this._onStart) return;
    SoundManager.playOk();
    this._options.deactivate();
    this._optionPressed = 20;
    this._options.redrawCurrentItem();

    this._playerChoice = choice;
    this._opponentChoice = this.getOpponentChoice(this._opponent);

    this._playerIcon = new Sprite();
    this._playerIcon.bitmap = ImageManager.loadPicture("ROCK-OptionsSheet");
    this._playerIcon.x = 320 - 41;
    this._playerIcon.y = 240 - 48;

    this._opponentIcon = new Sprite();
    this._opponentIcon.bitmap = ImageManager.loadPicture("ROCK-OptionsSheet");
    this._opponentIcon.x = 320 + 41;
    this._opponentIcon.y = 240;
    this._opponentIcon.scaleX = -1;

    this._sfxDelay = 240;
}

Scene_PetRocks.prototype.displayDecision = function() {
    // Check Who Won + Display Result
    if (this._playerChoice === "rock") {
        var sx = 2 * 82;
        if (this._opponentChoice === "rock") {
            // TIE
            this._rockResult = ["draw", "draw"];
            var ox = 2 * 82;
        } else if (this._opponentChoice === "paper") {
            // LOSE
            this._rockResult = ["hit", "defend"];
            var ox = 1 * 82;
        } else {
            // WIN
            this._rockResult = ["defend", "hit"];
            var ox = 0 * 82;
        }
    }
    if (this._playerChoice === "paper") {
        var sx = 1 * 82;
        if (this._opponentChoice === "paper") {
            // TIE
            this._rockResult = ["draw", "draw"];
            var ox = 1 * 82;
        } else if (this._opponentChoice === "scissors") {
            // LOSE
            this._rockResult = ["hit", "defend"];
            var ox = 0 * 82;
        } else {
            // WIN
            this._rockResult = ["defend", "hit"];
            var ox = 2 * 82;
        }
    }
    if (this._playerChoice === "scissors") {
        var sx = 0 * 82;
        if (this._opponentChoice === "scissors") {
            // TIE
            this._rockResult = ["draw", "draw"];
            var ox = 0 * 82;
        } else if (this._opponentChoice === "rock") {
            // LOSE
            this._rockResult = ["hit", "defend"];
            var ox = 2 * 82;
        } else {
            // WIN
            this._rockResult = ["defend", "hit"];
            var ox = 1 * 82;
        }
    }

    this._playerIcon.setFrame(sx, 0, 82, 44);
    this.addChild(this._playerIcon);
    this._opponentIcon.setFrame(ox, 0, 82, 44);
    this.addChild(this._opponentIcon);

    this._playerIcon.visible = true;
    this._opponentIcon.visible = true;

    this._resultsShowing = 75;
}

Scene_PetRocks.prototype.displayResults = function() {
    if (this._rockResult[0] === "hit") {
        var se = {
            name: "mini_coj_hurt",
            volume: 100,
            pitch: 100,
            pan: 0
        };
        AudioManager.playSe(se);
        this._opponent.setSprite(true);
    } else if (this._rockResult[0] === "defend") {
        var se = {
            name: "mini_coj_hit",
            volume: 100,
            pitch: 100,
            pan: 0
        };
        AudioManager.playSe(se);
        this._player.setSprite(true);
    } else {
        var se = {
            name: "mini_coj_draw",
            volume: 100,
            pitch: 100,
            pan: 0
        };
        AudioManager.playSe(se);
    }
    // Display Graphical Animations
    this._displayingAnimations = true;
    this._timer = 15;
    var x = 160 + 32;
    var y = 174 + 32;
    this._resultAnimation = new Rock_Result(x, y);
    this.addChild(this._resultAnimation);

    var x = 640 - 160 - 128 + 32;
    var y = 174 + 32;
    this._resultAnimationOpp = new Rock_Result(x, y);
    this.addChild(this._resultAnimationOpp);
}

Scene_PetRocks.prototype.getOpponentChoice = function(opponent) {
    var randomNum = Math.floor(Math.random() * 100);
    var weightAddition = 0;
    for (var i = 0; i < opponent.frequency.length; i++) {
        weightAddition += opponent.frequency[i];
        if (randomNum < weightAddition){
            this._opponentChoice = opponent.options[i];
            return opponent.options[i];
        }
    }
}

Scene_PetRocks.prototype.update = function() {
    Scene_Base.prototype.update.call(this);
    // Are you ready to clash animation
    if (this._titleShowing) {
        if (!this._titleSprite) {
            this._titleSprite = new Sprite();
            this._titleSprite.bitmap = ImageManager.loadPicture("Sequence/ROCK-Intro_01");
            this.addChild(this._titleSprite);
            this._titleAnimationTimer = 300;
            this._titleSpriteID = 1;
            this._options.deactivate();
        }
        if (this._titleSprite) {
            if (this._titleAnimationTimer % (this._titleSpriteID >= 6 ? 10 : 40) === 0) {
                this._titleSpriteID += 1;
                if(this._titleSpriteID > 7) {
                    this._titleSpriteID = 6;
                }
                this._titleSprite.bitmap = ImageManager.loadPicture("Sequence/ROCK-Intro_" + (this._titleSpriteID > 9 ? this._titleSpriteID : "0" + this._titleSpriteID));
            }
            this._titleAnimationTimer--;
            if (this._titleAnimationTimer <= 0) {
                this._titleShowing = false;
                this.removeChild(this._titleSprite);
                this._options.activate();
                var townsPeople = ["ROCK-TomatoGirl", "ROCK-RoseLad", "ROCK-TheMuncherKing", "ROCK-PapaChip", "ROCK-Bunny", "ROCK-SaucyK", "ROCK-Pluto"];
                var elite = ["ROCK-LilG", "ROCK-P'terry", "ROCK-CoolSNake", "ROCK-Ocotaco"];
                var champ = ["ROCK-OneWingAsh"];
                if (townsPeople.contains(this._opponent.name)) var name = "minigame_jash1";
                else if (elite.contains(this._opponent.name)) var name = "minigame_jash2";
                else if (champ.contains(this._opponent.name)) var name = "minigame_jash3"
                var bgm = {
                    name: name,
                    volume: 100,
                    pitch: 100,
                    pan: 0
                };
                AudioManager.playBgm(bgm);
                this._onStart = true;
            }
        }
        return;
    }

    if (this._sfxDelay > 0) {
        this._sfxDelay--;
        if (this._sfxDelay === 180) {
            var se = {
                name: "mini_coj_windup",
                volume: 100,
                pitch: 100,
                pan: 0
            };
            AudioManager.playSe(se);
        }
        if (this._sfxDelay === 120) {
            var se = {
                name: "mini_coj_windup",
                volume: 100,
                pitch: 100,
                pan: 0
            };
            AudioManager.playSe(se);
        }
        if (this._sfxDelay === 60) {
            var se = {
                name: "mini_coj_windup",
                volume: 100,
                pitch: 100,
                pan: 0
            };
            AudioManager.playSe(se);
        }
        if (this._sfxDelay <= 0) {
            this.displayDecision();
        }
    }

    if (this._resultsShowing > 0) {
        this._resultsShowing --;
        if (this._resultsShowing <= 0) {
            this.displayResults();
        }
    }

    if (this._optionPressed > 0) {
        this._optionPressed--;
        if (this._optionPressed <= 0) {
            this._options.redrawCurrentItem();
        }
    }

    // Show result animation of the clash
    if (this._displayingAnimations || this._timer > 0) {
        this._timer--;
        if (this._timer > 10 && this._timer < 15) {
            if (this._rockResult[0] ==="hit") this._player.flash();
            else if (this._rockResult[0] === "defend") this._opponent.flash();
            this._resultAnimation.setSprite(this._rockResult[0], 0);
            this._resultAnimationOpp.setSprite(this._rockResult[1], 0);
        }
        if (this._timer > 5 && this._timer < 10) {
            this._resultAnimation.setSprite(this._rockResult[0], 1);
            this._resultAnimationOpp.setSprite(this._rockResult[1], 1);
        }
        if (this._timer < 5) {
            this._resultAnimation.setSprite(this._rockResult[0], 2);
            this._resultAnimationOpp.setSprite(this._rockResult[1], 2);
        }

        if (this._timer <= 0) {
            if (this._rockResult[0] === "draw") { // TIE
                this._opponent.currentCombo = 1;
                this._player.currentCombo = 1;
            }
            if (this._rockResult[0] === "defend") { // WIN
                var damage = 1 * this._player.currentCombo;
                this.removeHearts("opponent", damage);
                this._opponent.hp -= damage;
                this._opponent.currentCombo = 1;
                this._player.currentCombo += 1;
                if (this._player.currentCombo > 3) this._player.currentCombo = 3;
            }
            if (this._rockResult[0] === "hit") { // LOSE
                var damage = 1 * this._opponent.currentCombo;
                this.removeHearts("player", damage);
                this._player.hp -= damage;
                this._player.currentCombo = 1;
                this._opponent.currentCombo += 1;
                if (this._opponent.currentCombo > 3) this._opponent.currentCombo = 3;

            }
            this._displayingAnimations = false;
            this.removeChild(this._resultAnimation);
            this.removeChild(this._resultAnimationOpp);
            this._player.setSprite(false);
            this._opponent.setSprite(false);

            this.removeChild(this._playerIcon);
            this.removeChild(this._opponentIcon);

            // Start Next Turn
            this._nextTurnDelay = 80;
            this.checkWinConditions();
        }
    }

    if (this._nextTurnDelay > 0) {
        this._nextTurnDelay--;
        if (this._nextTurnDelay <= 0) {
            if (this._gameEndTimer <= 0) {
                this._options.activate();
                this._comboNumber.bitmap = ImageManager.loadPicture("ROCK-Combo" + (this._player.currentCombo > 0 ? this._player.currentCombo : 1));
            }
        }
    }
    // Game over
    if (this._gameEndTimer > 0) {
        this._gameEndTimer--;
        if (this._gameEndTimer === 120) {
            if ($gameVariables.value(825) === "opponent") {
                var se = {
                    name: "mini_coj_lose",
                    volume: 100,
                    pitch: 100,
                    pan: 0
                };
                AudioManager.playSe(se);
            } else {
                var se = {
                    name: "mini_coj_win",
                    volume: 100,
                    pitch: 100,
                    pan: 0
                };
                AudioManager.playSe(se);
            }
        }
        if (this._gameEndTimer <= 0) {

            for (var i = 0 ;i < this.children.length; i++) {
                this.children[i].parent.removeChild(this.children[i]);
            }
            this.children = [];
            this.popScene();
            AudioManager.stopBgm();
        }
        return;
    }
}

Scene_PetRocks.prototype.removeHearts = function(rock, damage) {
    if (rock === "player") {
        rock = this._player;
        var hearts = this._playerHearts;
    } else {
        rock = this._opponent;
        var hearts = this._opponentHearts;
    }
    for (var i = 0; i < damage; i++) {
        if (hearts[i].alpha < 1) break;
        hearts[i].alpha -= 0.4;
    }
    for (var i = 0; i < damage; i++) {
        hearts.push(hearts.shift());
    }
}

Scene_PetRocks.prototype.checkWinConditions = function() {
    if (this._player.hp <= 0) {
        // Game Over
        this._player.alpha = 0.3;
        $gameVariables.setValue(825, "opponent");
        this._gameEndTimer = 180;
        this._options.deactivate();
    } else if (this._opponent.hp <= 0) {
        // You Win, But still game over
        // Put result in a variable for outside usage
        this._opponent.alpha = 0.3;
        $gameVariables.setValue(825, "player");
        this._gameEndTimer = 180;
        this._options.deactivate();
    }
}

//=============================================================================
// R P S
//=============================================================================
function Window_PetRockOptions() {
    this.initialize.apply(this, arguments);
}

Window_PetRockOptions.prototype = Object.create(Window_HorzCommand.prototype);
Window_PetRockOptions.prototype.constructor = Window_PetRockOptions;

Window_PetRockOptions.prototype.initialize = function () {
    Window_HorzCommand.prototype.initialize.call(this, 160, 375);
    this.opacity = 0;
};

Window_PetRockOptions.prototype.makeCommandList = function() {
    this.addCommand("Rock", 'rock', true);
    this.addCommand("Paper", 'paper', true);
    this.addCommand("Scissors", 'scissors', true);
}

Window_PetRockOptions.prototype.windowWidth = function() {
    return 330;
}

Window_PetRockOptions.prototype.windowHeight = function() {
    return 100;
}

Window_PetRockOptions.prototype.maxCols = function () {
    return 3;
};

Window_PetRockOptions.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    this.contents.clearRect(rect.x, rect.y, rect.width + 12, rect.height + 12);

    if (SceneManager._scene._optionPressed && this.currentSymbol() === this.commandSymbol(index)) {
        var addon = "Pressed";
    } else if (this.currentSymbol() === this.commandSymbol(index)) {
        var addon = "Selected";
    } else addon = "";

    var bitmap = ImageManager.loadPicture('ROCK-Button' + addon);
    this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, rect.x, rect.y);
}

Window_PetRockOptions.prototype.select = function(index) {
    this._index = index;
    this._stayCount = 0;
    this.ensureCursorVisible();
    this.updateCursor();
    this.callUpdateHelp();
    this.refresh();
}

Window_PetRockOptions.prototype._updateCursor = function () {
    this._windowCursorSprite.visible = false;
};
