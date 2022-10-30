//-----------------------------------------------------------------------------
// OMORI Minigame - Snake
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
// * Player
//-----------------------------------------------------------------------------
function Snake() {
    this.initialize.apply(this, arguments);
}

Snake.prototype = Object.create(Sprite_Base.prototype);
Snake.prototype.constructor = Snake;

Snake.prototype.initialize = function (length) {
    Sprite_Base.prototype.initialize.call(this);
    this.length = length;
    this.speed = 0;
    this.movementTiming = 0;
    this.body = [];
    this.dead = false;
    this._direction = 8;
    this.dirSwitched = false;
    this.x = 0;
    this.y = 0;
    this.width = Graphics.boxWidth;
    this.height = Graphics.boxHeight;
    this.fullyExpanded = false;
    this.moves = 0;
}

Snake.prototype.setupPlayer = function() {
    for (var i = 0; i < this.length; i++) {
        var newBodyPart = new SnakePart(i, (Graphics.boxWidth - 32) / 2, (Graphics.boxHeight - 32) / 2, this);
        this.body.push(newBodyPart);
        this.addChild(newBodyPart);
    }
}

Snake.prototype.update = function () {
    Sprite_Base.prototype.update.call(this);
    if (this.flashing > 0) {
        this.flashing--;
        if (this.flashing % 8 === 0) this.visible = this.visible ? false : true;
        if (this.flashing <= 0) {
            this.visible = false;
            this.opacity = 0;
        }
        return;
    }
    if (SceneManager._scene._gamePaused) return;
    // Player
    if (this.speed > 0) {
        if (!this.dirSwitched) {
            if (Input.isPressed('up') && this._direction != 2) {
                this._direction = 8;
                this.dirSwitched = true;
            } else if (Input.isPressed('down') && this._direction != 8) {
                this._direction = 2;
                this.dirSwitched = true;
            } else if (Input.isPressed('left') && this._direction != 6) {
                this._direction = 4;
                this.dirSwitched = true;
            } else if (Input.isPressed('right') && this._direction != 4) {
                this._direction = 6;
                this.dirSwitched = true;
            }
        }
    }

    if (this.movementTiming <= 0) {
        this.movementTiming = this.speed;
        for (var i = 0; i < this.body.length; i++) {
            this.savePosition(this.body[i]);
            if (i === 0) {
                if (this._direction === 2) {
                    this.body[i]._direction = this._direction;
                    this.body[i].y += 32;
                } else if (this._direction === 8) {
                    this.body[i]._direction = this._direction;
                    this.body[i].y -= 32;
                } else if (this._direction === 4) {
                    this.body[i]._direction = this._direction;
                    this.body[i].x -= 32;
                } else if (this._direction === 6) {
                    this.body[i]._direction = this._direction;
                    this.body[i].x += 32;
                }
                this.dirSwitched = false;
            } else {
                this.body[i].x = this.body[i - 1].previousX;
                this.body[i].y = this.body[i - 1].previousY;
                this.body[i]._direction = this.body[i - 1].previousDir;
            }
            this.body[i].updateCharacterFrame();
            this.moves += 1;
            if (this.moves === 4) this.fullyExpanded = true;
            var se = {
                name: "mini_sme_move",
                volume: 100,
                pitch: 100,
                pan: 0
            };
            AudioManager.playSe(se);
        }
    }
    this.movementTiming--;
}

Snake.prototype.savePosition = function(snake) {
    snake.previousDir = snake._direction;
    snake.previousX = snake.x;
    snake.previousY = snake.y;
}

Snake.prototype.eat = function () {
    var se = {
        name: "mini_sme_eat",
        volume: 100,
        pitch: 100,
        pan: 0
    };
    AudioManager.playSe(se);
    var newBodyPart = new SnakePart(this.body[this.body.length - 1].id + 1, this.body[this.body.length - 1].x, this.body[this.body.length - 1].y, this);
    newBodyPart.updateCharacterFrame();
    this.body.push(newBodyPart);
    this.addChild(newBodyPart);
    this.length += 1;
    SceneManager._scene._score += 10;
    if (this.length % 4 === 0) {
        if (this.speed >= 20) {
            this.speed -= 5;
        } else if (this.speed >= 10) {
            this.speed -= 2;
        } else if (this.speed >= 5){
            this.speed -= 1;
        }
        SceneManager._scene._score += 55;
    }
    SceneManager._scene.updateUI();
}

Snake.prototype.flash = function () {
    this.flashing = 80;
}

//-----------------------------------------------------------------------------
// * Other Objects
//-----------------------------------------------------------------------------
function SnakePart(id, x, y) {
    this.initialize(id, x, y);
}

SnakePart.prototype = Object.create(Sprite_Base.prototype);
SnakePart.prototype.constructor = SnakePart;

SnakePart.prototype.initialize = function (id, x, y, snake) {

    Sprite_Base.prototype.initialize.call(this);
    this.parent = snake;
    this.id = id;
    this.x = x;
    this.y = y;
    this.previousX = x;
    this.previousY = y;
    this._direction = 2;
    this.visible = false;

    // Head and Tail should have unique sprites
    this.bitmap = ImageManager.loadPicture('SNAKE-Body');
}

SnakePart.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);
    this.updateCharacterFrame();
}

SnakePart.prototype.updateCharacterFrame = function () {
    if (!this.parent) return;
    var pw = 32;
    var ph = 32;
    if (this.id === 0) {
        var sx = 0;
        var sy = 0 + ((this._direction - 2) / 2) * ph;
    } else if (this.id === this.parent.length - 1) {
        var sx = 2 * pw;
        var sy = 0 + ((this._direction - 2) / 2) * ph;
    } else {
        var sx = 1 * pw;
        var sy = 0 + ((this._direction - 2) / 2) * ph;
    }
    this.setFrame(sx, sy, pw, ph);
    if (SceneManager._scene._resultsOpen) {
        if (!this.visible) this.visible = true;
    }
}

//=============================================================================
// * Game
//=============================================================================
function Scene_Snake() {
    this.initialize.apply(this, arguments);
}
Scene_Snake.prototype = Object.create(Scene_Base.prototype);
Scene_Snake.prototype.constructor = Scene_MenuBase;

Scene_Snake.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
    ImageManager.loadAtlas("MN_Snake");
    ImageManager.loadAtlas("MN_Invader");
    this._exitFade = 0;
    this._titleShowing = true;
    this._gamePaused = true;

    this._lives = 3;
    this._score = 0;
    this._food = null;

    // Game Started
    this._gameInProgress = false;
    this._resultsOpen = false;
    this._startingGame = false;
}

Scene_Snake.prototype.create = function () {
    Scene_Base.prototype.create.call(this);
    this.createBackground();
    this._UIWindow = new Window_SnakeUI();
    this.addChild(this._UIWindow);
    this._UIWindow.visible = false;
}

Scene_Snake.prototype.createBackground = function () {
    this.mainImage = new Sprite();
    this.mainImage.bitmap = ImageManager.loadPicture("SNAKE-Background");
    this.mainImage.x = 160;
    this.mainImage.y = 96;
    this.addChild(this.mainImage);
};

Scene_Snake.prototype.startGame = function() {
    this._player = new Snake(1);
    this.addChild(this._player);

    this._player.setupPlayer();
    this.createFood();
    this._titleShowing = false;
    this._logo = null;
    this.removeChild(this._boundary);
    this._boundary = null;
    this.removeChild(this._upSnake);
    this.removeChild(this._downSnake);
    this.removeChild(this._leftSnake);
    this.removeChild(this._rightSnake);
    this._startingGame = false;
    this._gamePaused = false;
    this._gameInProgress = true;
    this._UIWindow.visible = true;
    this._player.speed = 30;
    this.updateUI();
}

Scene_Snake.prototype.updateUI = function() {
    this._UIWindow._lives = this._lives;
    this._UIWindow._score = this._score;
    this._UIWindow.refresh();
}

Scene_Snake.prototype.update = function() {
    Scene_Base.prototype.update.call(this);
    if (this._exitFade > 0) {
        this._exitFade--;
        if (this._logo) this._logo.opacity -= 12;
        if (this.mainImage) this.mainImage.opacity -= 12;
        if (this._pressKey) this._pressKey.opacity -= 12;
        if (this._UIWindow) this._UIWindow.opacity -= 12;
        if (this._player) this._player.opacity -= 12;
        if (this._upSnake) this._upSnake.opacity -= 12;
        if (this._downSnake) this._downSnake.opacity -= 12;
        if (this._leftSnake) this._leftSnake.opacity -= 12;
        if (this._rightSnake) this._rightSnake.opacity -= 12;
        if (this._exitFade <= 0) {
            this.removeChild(this._logo);
            this.removeChild(this.mainImage);
            this.removeChild(this._pressKey);
            if (this._resultImg) this.removeChild(this._resultImg);
            this.removeChild(this._player);
            this.removeChild(this._UIWindow);
            this.removeChild(this._upSnake);
            this.removeChild(this._downSnake);
            this.removeChild(this._leftSnake);
            this.removeChild(this._rightSnake);
            this.removeChild(this._boundary);

            this.popScene();
            $gameSystem.replayBgm();
        }
        return;
    }


    if (this._resultTimer > 0) {
        this._resultTimer--;
        return;
    }
    if (this._titleShowing) {
        if (Input.isTriggered('cancel')) {
            $gameParty._gold += 1;
            this._exitFade = 30;
            return;
        }
        if (!this._logo) {
            this._logo = new Sprite();
            this._logo.bitmap = ImageManager.loadPicture("SNAKE-Title");
            this._logo.x = 227;
            this._logo.y = 96 + 64;
            this.addChild(this._logo);

            this._pressKey = new Sprite();
            this._pressKey.bitmap = ImageManager.loadPicture("SNAKE-Prompt");
            this._pressKey.x = 214;
            this._pressKey.y = 326;
            this.addChild(this._pressKey);

            this._leftSnake = new Sprite();
            this._leftSnake.bitmap = ImageManager.loadPicture("SNAKE-TitleLoop");
            this._leftSnake.x = 600 * 2;
            this._leftSnake.y = 356;
            this._leftSnake.scaleX = -1;
            this.addChild(this._leftSnake);

            this._rightSnake = new Sprite();
            this._rightSnake.bitmap = ImageManager.loadPicture("SNAKE-TitleLoop");
            this._rightSnake.x = -400;
            this._rightSnake.y = 100;
            this.addChild(this._rightSnake);

            this._upSnake = new Sprite();
            this._upSnake.bitmap = ImageManager.loadPicture("SNAKE-TitleVertLoop");
            this._upSnake.x = 164;
            this._upSnake.y = 480 * 2;
            this._upSnake.scaleY = -1;
            this.addChild(this._upSnake);

            this._downSnake = new Sprite();
            this._downSnake.bitmap = ImageManager.loadPicture("SNAKE-TitleVertLoop");
            this._downSnake.x = 640 - 160-32-4;
            this._downSnake.y = 100 - 538 - 4;
            this.addChild(this._downSnake);

            this._boundary = new Sprite();
            this._boundary.bitmap = ImageManager.loadPicture("INVADER-Boundary");
            this._boundary.x = 0;
            this._boundary.y = 0;
            this.addChild(this._boundary);

            this._rightSnakes = true;
            this._leftSnakes = false;
            this._upSnakes = false;
            this._downSnakes = false;
        }

        if (this._player && this._player.flashing) {
            return;
        }

        if (this._rightSnakes) {
            this._rightSnake.x += 1;

            if (this._rightSnake.x > 480) {
                this._rightSnakes = false;

                this._leftSnake.x = 600 * 2;
                this._leftSnake.y = 356;
                this._leftSnakes = true;
            }
        } else if (this._leftSnakes) {
            this._leftSnake.x -= 1;

            if (this._leftSnake.x < 124) {
                this._leftSnakes = false;

                this._upSnake.x = 164;
                this._upSnake.y = 480 * 2;
                this._upSnakes = true;
            }
        } else if (this._upSnakes) {
            this._upSnake.y -= 1;

            if (this._upSnake.y < -14) {
                this._upSnakes = false;

                this._downSnake.x = 454;
                this._downSnake.y = 100 - 538 - 4;
                this._downSnakes = true;
            }
        } else if (this._downSnakes) {
            this._downSnake.y += 1;

            if (this._downSnake.y > 538) {
                this._downSnakes = false;

                this._rightSnake.x = -538;
                this._rightSnake.y = 100;
                this._rightSnakes = true;
            }
        }

        if (Input.isTriggered('ok')) {
            if (this._flicker > 0) return;
            var se = {
                name: "mini_sme_start",
                volume: 100,
                pitch: 100,
                pan: 0
            };
            AudioManager.playSe(se);
            this._flicker = 40;
        }
        if (this._flicker > 0) {
            if (this._flicker === 45 || this._flicker === 40 || this._flicker === 35 || this._flicker === 30 || this._flicker === 25) {
                this._pressKey.visible = this._pressKey.visible ? false : true;
            }
            this._flicker--;
            if (this._flicker <= 0) {
                this.removeChild(this._pressKey);
                this.removeChild(this._logo);
                this.startGame();

            }
        }
    }

    //=========================================================================
    // Win/Lose/Die
    //=========================================================================
    if (this._resultsOpen) {
        if (Input.isTriggered('ok')) {
            if (this._gameOver || this._gameComplete) {
                this._gameComplete = false;
                this.goToTitle();
            } else if (this._player.dead) {
                this.respawnPlayer();
            }
        }
        return;
    }
    // Check For Food
    if (this._player && this.checkCollide()) {
        this._player.eat();
        this.createFood();
    };

    // Check Dead
    if (this._player && this._player.body[0] && (this._player.body[0].x < 192 || this._player.body[0].x > this._UIWindow.width + 96 ||
        this._player.body[0].y < 144 || this._player.body[0].y > this._UIWindow.height + 32) ||
        (this.collideSelf() && this._player.fullyExpanded && this._player.body.length > 2)) {

        this._resultImg = new Sprite();
        this._resultImg.bitmap = ImageManager.loadPicture("SNAKE-Lose");
        this._resultImg.x = 227;
        this._resultImg.y = 160;
        this.addChild(this._resultImg);
        var se = {
            name: "mini_sme_die",
            volume: 100,
            pitch: 100,
            pan: 0
        };
        AudioManager.playSe(se);
        this._player.flash();
        this._lives -= 1;
        this.updateUI();
        this._player.dead = true;
        this._gamePaused = true;
        this._resultsOpen = true;
        this._resultTimer = 120;
    }
    // Check Win Conditions
    if (this._gamePaused) return;
    this.checkStageComplete();
    
    //=========================================================================
    // Update SNAKE Graphic
    //=========================================================================
    // this._player.updateCharacterFrame();

}

Scene_Snake.prototype.createFood = function() {
    if (this._food) this.removeChild(this._food);

    this._food = new Sprite_Base();
    this._food.bitmap = ImageManager.loadPicture('SNAKE-Food');
    this.getFoodPos();
    while (this.anyTouchFood()) {
        this.getFoodPos();
    }
    this.addChild(this._food);
}

Scene_Snake.prototype.getFoodPos = function() {
    var minX = 192;
    var maxX = this._UIWindow.width + 64;
    var minY = 144;
    var maxY = this._UIWindow.height + 32;

    this._food.x = this.getRandomInt(minX, maxX);
    this._food.y = this.getRandomInt(minY, maxY);

    if (this._food.x > 0) this._food.x = Math.ceil(this._food.x / 32.0) * 32;
    else if (this._food.x < 0) this._food.x = Math.floor(this._food.x / 32.0) * 32;
    else this._food.x = 32;
    this._food.x += 16

    if (this._food.y > 0) this._food.y = Math.ceil(this._food.y / 32.0) * 32;
    else if (this._food.y < 0) this._food.y = Math.floor(this._food.y / 32.0) * 32;
    else this._food.y = 32;
}

Scene_Snake.prototype.getRandomInt = function(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Scene_Snake.prototype.anyTouchFood = function () {
    if (!this._player) return;
    for (var i = 0; i < this._player.body.length; i++) {
        var food = this._food;
        var part = this._player.body[i];
        if (food.x === part.x && food.y === part.y) {
            return true;
        }
    }
    return false;
}

Scene_Snake.prototype.checkCollide = function () {
    if (!this._food) return;
    var food = this._food;
    var snake = this._player.body[0];
    if (snake.x === food.x && snake.y === food.y) {
        return true;
    }
    return false;
}

Scene_Snake.prototype.collideSelf = function() {
    if (!this._player) return;
    for (var i = 1; i < this._player.body.length; i++) {
        var snake = this._player.body[0];
        var part = this._player.body[i];
        if (snake.x === part.x && snake.y === part.y) {
            return true;
        }
    }
    return false;
}

Scene_Snake.prototype.checkStageComplete = function () {
    if (this._player && this._player.length >= 56) {

        this._resultImg = new Sprite();
        this._resultImg.bitmap = ImageManager.loadPicture("SNAKE-Win");
        this._resultImg.x = 227;
        this._resultImg.y = 160;
        this.addChild(this._resultImg);

        this._gamePaused = true;
        this._resultsOpen = true;
        this._resultTimer = 120;
        this._gameComplete = true;
    }
}

Scene_Snake.prototype.goToTitle = function() {
    $gameVariables.setValue(621, this._score);
    for (var i = 0; i < this._player.body.length; i++) {
        this.removeChild(this._player.body[i]);
    }
    this._exitFade = 30;

    this.removeChild(this._food);
    this.removeChild(this._player);
    this._player.body = [];
    this._food = null;
    this._gameInProgress = false;
    this._gamePaused = true;
    this._score = 0;
    this._lives = 3;
    this._UIWindow.visible = false;
    this._resultsOpen = false;
    if (this._resultImg) {
        this._resultImg.visible = false;
        this.removeChild(this._resultImg);
        this._resultImg = null;
    }
    this._gameOver = false;
    return;

    this._titleShowing = true;
}

Scene_Snake.prototype.respawnPlayer = function () {
    if (this._lives <= 0) {
        this.goToTitle();
        return;
    }
    this._gameInProgress = true;
    this._gamePaused = false;
    this._resultsOpen = false;
    if (this._resultImg) {
        this._resultImg.visible = false;
        this.removeChild(this._resultImg);
        this._resultImg = null;
    }
    this._gameOver = false;

    for (var i = 0; i < this._player.body.length; i++) {
        this._player.moves = 0;
        this._player.fullyExpanded = false;
        this._player.body[i].x = (Graphics.boxWidth - 32) / 2;
        this._player.body[i].y = (Graphics.boxHeight - 32) / 2;
    }

    this._player.visible = true;
    this._player.opacity = 255;
    this._player.dead = false;
}

//-----------------------------------------------------------------------------
//
//-----------------------------------------------------------------------------
function Window_SnakeUI() {
    this.initialize.apply(this, arguments);
}

Window_SnakeUI.prototype = Object.create(Window_Base.prototype);
Window_SnakeUI.prototype.constructor = Window_SnakeUI;

Window_SnakeUI.prototype.initialize = function (text) {
    var x = (Graphics.boxWidth - this.windowWidth()) / 2;
    var y = (Graphics.boxHeight - this.windowHeight()) / 2;
    Window_Base.prototype.initialize.call(this, x, y, this.windowWidth(), this.windowHeight());
    this.opacity = 0;
    this._score = 0;
    this._lives = 2;
    this.refresh();
};

Window_SnakeUI.prototype.windowWidth = function() {
    return 320;
}

Window_SnakeUI.prototype.windowHeight = function () {
    return 288;
}

Window_SnakeUI.prototype.standardPadding = function () {
    return 0;
}

Window_SnakeUI.prototype.refresh = function() {
    this.contents.clear();

    var  bitmap = ImageManager.loadPicture('SNAKE-ScoreText');
    this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 22, 6);

    var line = ImageManager.loadPicture('SNAKE-Lines');
    this.contents.blt(line, 0, 0, line.width, line.height, 12, 32);

    var lifeIcon = ImageManager.loadPicture('SNAKE-Life');
    this.contents.blt(lifeIcon, 0, 0, lifeIcon.width, lifeIcon.height, 234, 2);
    var lives = "0" + this._lives.toString();
    for (var i = 0; i < lives.length; i++) {
        this.getNumber(parseInt(lives[i]), 260 + (i * 19), 8);
    }

    var score = this._score.toString();
    for (var i = 0; i < score.length; i++) {
        this.getNumber(parseInt(score[i]), 120 + (i * 19), 8);
    }
}

Window_SnakeUI.prototype.getNumber = function (index, x, y) {
    var bitmap = ImageManager.loadPicture('SNAKE-Numbers');
    var pw = bitmap.width / 10;
    var ph = bitmap.height;
    var n = index;
    var sx = n % 10 * pw;
    var sy = (Math.floor(n / 10)) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
}
