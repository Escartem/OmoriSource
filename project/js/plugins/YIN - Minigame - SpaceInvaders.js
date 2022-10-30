//-----------------------------------------------------------------------------
// OMORI Minigame - Space invaders
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
// * Object (Player/Enemy)
//-----------------------------------------------------------------------------
function SpaceInvaderObject() {
    this.initialize.apply(this, arguments);
}

SpaceInvaderObject.prototype = Object.create(Sprite_Base.prototype);
SpaceInvaderObject.prototype.constructor = SpaceInvaderObject;

SpaceInvaderObject.prototype.initialize = function (type, x, y, index) {
    Sprite_Base.prototype.initialize.call(this);
    this.type = type;
    this.dead = false;
    this.movingDown = false;
    this.hasPowerUp = false;
    if (this.type === 'player') {
        this.setupPlayer();
    } else if (this.type === 'powerUp') {
        this.setupPowerUp();
    } else {
        this.setupEnemy(type, x, y, index);
    }
}

SpaceInvaderObject.prototype.setupPlayer = function() {
    this.type = 'player';
    this.index = 0;
    this.currentHP = 3;
    this.speed = 3;
    this.shootDelay = 0;
    this.shootSpeed = 20;
    this.bulletSpeed = 6;
    this.bitmap = ImageManager.loadPicture('INVADER-Ship');
    this.x = 176;
    this.y = (Graphics.boxHeight - this.bitmap.height) / 2 + 78;
    this.hasPowerUp = false;
}

SpaceInvaderObject.prototype.setupPowerUp = function () {
    this.type = 'powerUp';
    this.index = 0;
    this.currentHP = 1;
    this.speed = Math.random() * (2 - 0.4) + 0.4;;
    this.shootDelay = 0;
    this.shootSpeed = 20;
    this.bulletSpeed = 0;
    this.bitmap = ImageManager.loadPicture('INVADER-PowerUp');
    this.x = 480;
    this.y = 140 + 80;
    this.hasPowerUp = false;
}

SpaceInvaderObject.prototype.setupEnemy = function(type, x, y, index) {
    this.index = index;
    this.x = x;
    this.y = y;
    this.movementTiming = 0;
    this.bulletSpeed = 1;
    this.shootDelay = 0;
    this.shootSpeed = 35;

    if (this.type === "Lv1") {
        this.hp = 1;
        this.currentHP = this.hp;
        this.speed = 60;
        this.points = 5;
        this.bitmap = ImageManager.loadPicture('INVADER-Enemy');
        this.bulletSpeed = 1;
        this.shootSpeed = 60;
    }
    if (this.type === "Lv2") {
        this.hp = 1;
        this.currentHP = this.hp;
        this.speed = 50;
        this.points = 20;
        this.bitmap = ImageManager.loadPicture('INVADER-Enemy');
        this.bulletSpeed = 2;
        this.shootSpeed = 45;
    }
    if (this.type === "Lv3") {
        this.hp = 2;
        this.currentHP = this.hp;
        this.speed = 30;
        this.points = 50;
        this.bitmap = ImageManager.loadPicture('INVADER-Enemy');
        this.bulletSpeed = 3;
        this.shootSpeed = 30;
    }
    if (this.type === "Lv4") {
        this.hp = 2;
        this.currentHP = this.hp;
        this.speed = 40;
        this.points = 75;
        this.bitmap = ImageManager.loadPicture('INVADER-Enemy');
        this.bulletSpeed = 2;
        this.shootSpeed = 45;
    }
    if (this.type === "Lv5") {
        this.hp = 2;
        this.currentHP = this.hp;
        this.speed = 25;
        this.points = 100;
        this.bitmap = ImageManager.loadPicture('INVADER-Enemy');
        this.bulletSpeed = 3;
        this.shootSpeed = 35;
    }
    if (this.type === "Lv6") {
        this.hp = 2;
        this.currentHP = this.hp;
        this.speed = 15;
        this.points = 125;
        this.bitmap = ImageManager.loadPicture('INVADER-Enemy');
        this.bulletSpeed = 4;
        this.shootSpeed = 20;
    }
    if (this.type === "Lv7") {
        this.hp = 2;
        this.currentHP = this.hp;
        this.speed = 50;
        this.points = 125;
        this.bitmap = ImageManager.loadPicture('INVADER-Enemy');
        this.bulletSpeed = 4;
        this.shootSpeed = 50;
    }
    if (this.type === "Lv8") {
        this.hp = 2;
        this.currentHP = this.hp;
        this.speed = 40;
        this.points = 150;
        this.bitmap = ImageManager.loadPicture('INVADER-Enemy');
        this.bulletSpeed = 3;
        this.shootSpeed = 20;
    }
    if (this.type === "Lv9") {
        this.hp = 2;
        this.currentHP = this.hp;
        this.speed = 20;
        this.points = 175;
        this.bitmap = ImageManager.loadPicture('INVADER-Enemy');
        this.bulletSpeed = 3;
        this.shootSpeed = 20;
    }
    if (this.type === "Lv10") {
        this.hp = 2;
        this.currentHP = this.hp;
        this.speed = 10;
        this.points = 250;
        this.bitmap = ImageManager.loadPicture('INVADER-Enemy');
        this.bulletSpeed = 3;
        this.shootSpeed = 20;
    }
    if (this.type === "Special") {
        this.hp = 1;
        this.currentHP = this.hp;
        this.speed = 10;
        this.points = 500;
        this.bitmap = ImageManager.loadPicture('INVADER-Enemy');
        this.bulletSpeed = 5;
        this.shootSpeed = 20;
    }
}

SpaceInvaderObject.prototype.update = function () {
    if (SceneManager._scene._gamePaused) return;
    // Object Movement
    if (this.type === 'player') { // Player Movement
        if (Input.isPressed('up') && !Input.isPressed('down')) {
            this.y -= this.speed;
            if (this.y < 140) this.y = 140;
        } else if (Input.isPressed('down') && !Input.isPressed('up')) {
            this.y += this.speed;
            if (this.y > 340) this.y = 340;
        }
        if (this.hasPowerUp) {
            this.powerUpTimer--;
            if (this.powerUpTimer <= 0) {
                this.hasPowerUp = false;
            }
        }
    } else if (this.type === 'powerUp') {
        this.x -= this.speed;
    } else { // Enemy Movement
        if (this.movementTiming <= 0) {
            this.movementTiming = this.speed;
            if (this.moveLeft) {
                this.x -= 24;
                this.moveLeft = false;
            } else {
                if (this.movingDown) this.y += 12;
                else this.y -= 12;
            }
        }
        this.movementTiming--;
    }
}

SpaceInvaderObject.prototype.shoot = function (angle) {
    var direction = this.type === 'player' ? 1 : -1;
    var offset = this.type === 'player' ? 18 : 20;
    var shot = new SpaceInvaderShot(this.x + (12 * direction), this.y + offset, this.bulletSpeed, direction, angle);
    SceneManager._scene.addChild(shot);
    return shot;
}

SpaceInvaderObject.prototype.flicker = function() {
    this._flicker = 40;
    if (this._flicker > 0) {
        if (this._flicker === 45 || this._flicker === 40 || this._flicker === 35 || this._flicker === 30 || this._flicker === 25) {
            this.visible = this.visible ? false : true;
        }
        this._flicker--;
        if (this._flicker <= 0) {
            this.visible = true;
        }
    }
}

//-----------------------------------------------------------------------------
// * Other Objects
//-----------------------------------------------------------------------------
function SpaceInvaderBarricade(x, y) {
    this.initialize(x, y);
}

SpaceInvaderBarricade.prototype = Object.create(Sprite_Base.prototype);
SpaceInvaderBarricade.prototype.constructor = SpaceInvaderBarricade;

SpaceInvaderBarricade.prototype.initialize = function (x, y) {
    Sprite_Base.prototype.initialize.call(this);
    this.x = x;
    this.y = y;

    this.bitmap = new Bitmap(32, 64);
    this.bitmap.fillRect(0, 0, 32, 64, '#5000bb'); // = ImageManager.loadPicture('INVADER-Barricade');
}

SpaceInvaderBarricade.prototype.takeDamage = function (x, y) {
    var x = Math.floor(x/2) * 2;
    var y = Math.floor(y/2) * 2;

    var shapes = [0, 1, 2, 3, 4];
    var curElement = shapes.length;
    var temp;
    var randomizedLoc;

    while (0 !== curElement) {
        randomizedLoc = Math.floor(Math.random() * curElement);
        curElement -= 1;
        temp = shapes[curElement];
        shapes[curElement] = shapes[randomizedLoc];
        shapes[randomizedLoc] = temp;
    }
    switch (shapes[0]) {
        case 0:
            this.bitmap.clearRect(x - 2, y - 2, 4, 4);
            this.bitmap.clearRect(x + 2, y - 4, 2, 4);
            this.bitmap.clearRect(x + 4, y, 2, 2);
            this.bitmap.clearRect(x + 2, y + 2, 2, 2);
            this.bitmap.clearRect(x - 4, y + 2, 2, 2);
            this.bitmap.clearRect(x - 6, y, 2, 2);
            this.bitmap.clearRect(x - 4, y - 4, 2, 2);
            this.bitmap.clearRect(x - 2, y - 6, 2, 2);
            break;
        case 1:
            this.bitmap.clearRect(x - 3, y - 2, 4, 4);
            this.bitmap.clearRect(x + 2, y - 4, 2, 4);
            this.bitmap.clearRect(x + 4, y, 2, 2);
            this.bitmap.clearRect(x + 1, y + 2, 4, 5);
            this.bitmap.clearRect(x - 4, y + 2, 2, 2);
            this.bitmap.clearRect(x - 6, y, 2, 2);
            this.bitmap.clearRect(x - 4, y - 4, 2, 2);
            this.bitmap.clearRect(x - 2, y - 6, 3, 3);
            break;
        case 2:
            this.bitmap.clearRect(x - 4, y - 3, 2, 2);
            this.bitmap.clearRect(x + 2, y - 4, 1, 1);
            this.bitmap.clearRect(x + 4, y, 2, 2);
            this.bitmap.clearRect(x + 2, y + 2, 2, 2);
            this.bitmap.clearRect(x - 4, y + 2, 4, 4);
            this.bitmap.clearRect(x - 6, y, 2, 2);
            this.bitmap.clearRect(x - 4, y - 4, 2, 2);
            this.bitmap.clearRect(x - 2, y - 6, 2, 2);
            break;
        case 3:
            this.bitmap.clearRect(x - 2, y, 5, 5);
            this.bitmap.clearRect(x + 2, y - 2, 2, 2);
            this.bitmap.clearRect(x + 4, y, 2, 2);
            this.bitmap.clearRect(x + 2, y + 2, 2, 2);
            this.bitmap.clearRect(x - 3, y + 3, 2, 2);
            this.bitmap.clearRect(x - 5, y + 5, 2, 2);
            this.bitmap.clearRect(x - 4, y - 4, 3, 3);
            this.bitmap.clearRect(x - 2, y - 6, 1, 1);
            break;
        case 4:
            this.bitmap.clearRect(x - 2, y - 2, 2, 2);
            this.bitmap.clearRect(x + 2, y - 4, 3, 2);
            this.bitmap.clearRect(x + 4, y, 4, 6);
            this.bitmap.clearRect(x + 2, y + 2, 1, 1);
            this.bitmap.clearRect(x - 4, y + 2, 2, 2);
            this.bitmap.clearRect(x - 6, y, 2, 2);
            this.bitmap.clearRect(x - 4, y - 4, 2, 2);
            this.bitmap.clearRect(x - 2, y - 6, 2, 2);
            break;
    }
}

SpaceInvaderBarricade.prototype.checkIfDamaged = function(x, y) {
    x = x - this.x;
    y = y - this.y;

    var solid = this.bitmap._context.getImageData(x, y, 1, 1);
    if (solid.data[3] !== 0) {
        this.takeDamage(x, y);
        return true;
    }
    return false;
}

//-----------------------------------------------------------------------------
// * Ammo Objects
//-----------------------------------------------------------------------------
function SpaceInvaderShot(x, y, speed, direction, angle) {
    this.initialize(x, y, speed, direction, angle);
}

SpaceInvaderShot.prototype = Object.create(Sprite_Base.prototype);
SpaceInvaderShot.prototype.constructor = SpaceInvaderShot;

SpaceInvaderShot.prototype.initialize = function (x, y, speed, direction, angle) {
    Sprite_Base.prototype.initialize.call(this);

    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = speed;
    this.direction = direction;

    if (this.direction === 1) {
        this.bitmap = new Bitmap(7, 2);
        this.bitmap.fillRect(0, 0, 7, 2, '#ffffff'); // ImageManager.loadPicture('INVADER-PSHOT');
    } else {
        this.bitmap = new Bitmap(7, 2);
        this.bitmap.fillRect(0, 0, 7, 2, '#dc3aff'); // this.bitmap = ImageManager.loadPicture('INVADER-ESHOT');
    }
}

SpaceInvaderShot.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);
    if (SceneManager._scene._gamePaused) return;
    this.x += this.direction * this.speed;

    if (this.angle) {
        this.y += this.angle * (this.speed / 2);
    }
}

//=============================================================================
// * Game
//=============================================================================
function Scene_SpaceInvader() {
    this.initialize.apply(this, arguments);
}
Scene_SpaceInvader.prototype = Object.create(Scene_Base.prototype);
Scene_SpaceInvader.prototype.constructor = Scene_MenuBase;

Scene_SpaceInvader.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
    this._mapMusic = AudioManager.saveBgm();
    ImageManager.loadAtlas("MN_Invader");
    this._exitFade = 0;

    this._titleShowing = true;
    this._gamePaused = true;

    this._lives = 3;
    this._enemies = [];
    this._barricades = [];
    this._power = null;
    this.movingDown = false;
    this._bullets = [];
    this._score = 0;
    this._level = 1;

    // Game Started
    this._gameInProgress = false;
    this._resultsOpen = false;
    this._startingGame = false;

    var bgm = {
        name: "minigame_space",
        volume: 100,
        pitch: 100,
        pan: 0
    };
    AudioManager.playBgm(bgm);

    this.powerSpawnDelay = 0;
    this.powerSpawnSpeed = 20;
}

Scene_SpaceInvader.prototype.create = function () {
    Scene_Base.prototype.create.call(this);
    this.createBackground();
    this.startFadeIn(60, false);
    this._UIWindow = new Window_SpaceInvaderUI();
    this.addChild(this._UIWindow);
    this._UIWindow.visible = false;

    this._player = new SpaceInvaderObject('player');
    this.addChild(this._player);
    
}

Scene_SpaceInvader.prototype.createBackground = function () {
    this.mainImage = new Sprite();
    this.mainImage.bitmap = ImageManager.loadPicture("INVADER-Background");
    this.mainImage.x = 160;
    this.mainImage.y = 96;
    this.addChild(this.mainImage);

    this.parallaxStars = new TilingSprite();
    this.parallaxStars.bitmap = ImageManager.loadPicture("INVADER-Parallax");
    this.parallaxStars.move(160, 96, 320, 288);
    this.addChild(this.parallaxStars);
};

Scene_SpaceInvader.prototype.startGame = function() {
    this._titleShowing = false;
    this._getIntoPosition = false;
    this._logo = null;
    this.removeChild(this._boundary);
    this._boundary = null;
    this._startingGame = false;
    this._gamePaused = false;
    this._gameInProgress = true;
    this._UIWindow.visible = true;

    this.setupEnemies(1);
    this.setupBarricades(3);
    this.updateUI();
}

Scene_SpaceInvader.prototype.setupBarricades = function(amount) {
    for (var i = 0; i < amount; i++) {
        var yPos = 148;
        if (amount == 2) yPos += 42;
        if (amount == 1) yPos += 78;
        var newBarricade = new SpaceInvaderBarricade(176 + 48, yPos + (i * 78));
        this.addChild(newBarricade);
        this._barricades.push(newBarricade);
    }
}

Scene_SpaceInvader.prototype.clearEnemies = function() {
    if (this._enemies.length > 0) {
        for (var i = 0; i < this._enemies.length; i++) {
            this.removeChild(this._enemies[i]);
        }
        this._enemies = [];
    }
}

Scene_SpaceInvader.prototype.setupEnemies = function(level) {
    // Clear enemies from previous round
    this.clearEnemies();
    this.removeResultImg();

    if (level <= 3) { // Levels 1, 2, and 3
        var maxEnemies = 10;
        var startPositionX = 320;
        var startPositionY = 240;
        var horzSpacing = 32;
        var vertSpacing = 40;

        for (var i = 0; i < maxEnemies; i++) {
            var newEnemy = new SpaceInvaderObject('Lv' + level, startPositionX + (i % 5 * horzSpacing), startPositionY + (i % 2 * vertSpacing), i);
            this.addChild(newEnemy);
            this._enemies.push(newEnemy);
        }
        return;
    }

    if (level > 3 && level <= 6) { // Levels 4, 5, and 6
        var maxEnemies = 15;
        var startPositionX = 320;
        var startPositionY = 240;
        var horzSpacing = 32;
        var vertSpacing = 40;

        for (var i = 0; i < maxEnemies; i++) {
            var newEnemy = new SpaceInvaderObject('Lv' + level, startPositionX + (i % 5 * horzSpacing), startPositionY + (i % 3 * vertSpacing), i);
            this.addChild(newEnemy);
            this._enemies.push(newEnemy);
        }
        return;
    }

    if (level > 6) { // Levels 7, 8, 9, and 10
        var maxEnemies = 20;
        var startPositionX = 320;
        var startPositionY = 160;
        var horzSpacing = 32;
        var vertSpacing = 40;

        for (var i = 0; i < maxEnemies; i++) {
            var newEnemy = new SpaceInvaderObject('Lv' + level, startPositionX + (i % 5 * horzSpacing), startPositionY + (i % 4 * vertSpacing), i);
            this.addChild(newEnemy);
            this._enemies.push(newEnemy);
        }
        return;
    }
}

Scene_SpaceInvader.prototype.updateUI = function() {
    this._UIWindow._lives = this._lives;
    this._UIWindow._score = this._score;
    this._UIWindow.refresh();
}

Scene_SpaceInvader.prototype.updateTitle = function() {
    if (this._exitFade > 0) {
        this._exitFade--;
        if (this._logo) this._logo.opacity -= 12;
        if (this.mainImage) this.mainImage.opacity -= 12;
        if (this._pressKey) this._pressKey.opacity -= 12;
        if (this._UIWindow) this._UIWindow.opacity -= 12;
        if (this._player) this._player.opacity -= 12;
        if (this._parallaxStars) this._parallaxStars.opacity -= 12;

        if (this._exitFade <= 0) {
            this.removeChild(this._logo);
            this.removeChild(this._player);
            this.removeChild(this._UIWindow);
            this.removeChild(this.mainImage);
            this.removeChild(this.parallaxStars);
            this.removeChild(this._pressKey);

            this.popScene();
            $gameSystem.replayBgm();
        }
        return;
    }
    
    if (this._titleShowing) {
        if (Input.isTriggered('cancel')) {
            this.startFadeOut(30);
            $gameParty._gold += 1;
            this._exitFade = 30;
        }
        if (!this._logo) {
            this._player.visible = true;
            this._player.y = (Graphics.boxHeight - this._player.bitmap.height) / 2 + 78;

            this._logo = new Sprite();
            this._logo.bitmap = ImageManager.loadPicture("INVADER-Title");
            this._logo.x = 160 + 12;
            this._logo.y = 96 + 64;
            this.addChild(this._logo);

            this._pressKey = new Sprite();
            this._pressKey.bitmap = ImageManager.loadPicture("INVADER-Prompt");
            this._pressKey.x = 160 + 12;
            this._pressKey.y = 96 + 64;
            this.addChild(this._pressKey);
        }
        if (Input.isTriggered('ok')) {
            if (this._flicker || this._getIntoPosition) return;
            this._flicker = 40;
            var se = {
                name: "mini_csb_start",
                volume: 100,
                pitch: 100,
                pan: 0
            };
            AudioManager.playSe(se);
        }
        if (this._flicker > 0) {
            if (this._flicker === 45 || this._flicker === 40 || this._flicker === 35 || this._flicker === 30 || this._flicker === 25) {
                this._pressKey.visible = this._pressKey.visible ? false : true;
            }
            this._flicker--;
            if (this._flicker <= 0) {
                this.removeChild(this._pressKey);

                this._getIntoPosition = true;
                this.removeChild(this._logo);

            }
        }
        if (this._getIntoPosition) {
            this._pressKey = new Sprite();
            this._pressKey.bitmap = ImageManager.loadPicture("INVADER-Boundary");
            this.addChild(this._pressKey);

            this._player.x += 4;
            if (this._player.x > (this._UIWindow.width + this._UIWindow.x)) {
                this._player.x = this._UIWindow.x - this._player.width;
                // this._player.y = (Graphics.boxHeight - this._player.bitmap.height) / 2;
                this._startingGame = true;
            }
            if (this._player.x >= 176 && this._startingGame) this.startGame();
        }
    }
}

Scene_SpaceInvader.prototype.updatePlayerShoot = function() {
    if (Input.isPressed('ok') && this._player.shootDelay <= 0) {
        if (this._player.hasPowerUp) {
            this._bullets.push(this._player.shoot(-1));
            this._bullets.push(this._player.shoot());
            this._bullets.push(this._player.shoot(1));
        } else {
            this._bullets.push(this._player.shoot());
        }
        this._player.shootDelay = this._player.shootSpeed;
        var se = {
            name: "mini_csb_laser",
            volume: 100,
            pitch: 100,
            pan: 0
        };
        AudioManager.playSe(se);
    } else if (Input.isTriggered('ok')) {
        if (this._player.hasPowerUp) {
            this._bullets.push(this._player.shoot(-1));
            this._bullets.push(this._player.shoot());
            this._bullets.push(this._player.shoot(1));
        } else {
            this._bullets.push(this._player.shoot());
        }
        this._player.shootDelay = this._player.shootSpeed;
        var se = {
            name: "mini_csb_laser",
            volume: 100,
            pitch: 100,
            pan: 0
        };
        AudioManager.playSe(se);
    }
    // When button is held, add delay to shooting so it does not come out like a laser
    if (this._player.shootDelay > 0) {
        this._player.shootDelay--;
    }
}

Scene_SpaceInvader.prototype.givePowerUp = function() {
    this._player.hasPowerUp = true;
    this._player.powerUpTimer = 300; // 5 seconds

    var se = {
        name: "mini_csb_start",
        volume: 100,
        pitch: 100,
        pan: 0
    };
    AudioManager.playSe(se);
}

Scene_SpaceInvader.prototype.updatePowerUpMovement = function() {
    if (!this._power) {
        var rando = Math.floor(Math.random() * Math.floor(1000));
        if (rando > 996 && !this._player.hasPowerUp && this.powerSpawnDelay <= 0) {
            this._power = new SpaceInvaderObject('powerUp');
            this._power.y = Math.floor(Math.random() * (340 - 140 + 1)) + 140;
            this.addChild(this._power);
            this.powerSpawnDelay = this.powerSpawnSpeed;
        }
    } else {
        if (this._power.x < this._UIWindow.x || this._power.x > (this._UIWindow.width + this._UIWindow.x) || this._power.y < this._UIWindow.y || this._power.y > (this._UIWindow.height + this._UIWindow.y)) {
            this.removeChild(this._power);
            this._power = null;
            return;
        }
        // Collision with player
        var p = this._player;

        if ((this._power.x > p.x && this._power.x < (p.x + p.width) && this._power.y > p.y  && this._power.y < (p.y + p.height)) ||
            (p.x > this._power.x && p.x < (this._power.x + this._power.width) && p.y > this._power.y && p.y < (this._power.y + this._power.width))) {
            this.givePowerUp();
            this.removeChild(this._power);
            this._power = null;
            this.updateUI();
            return;
        }
        if (!this._player.hasPowerUp) {
            if (this.powerSpawnDelay > 0) {
                this.powerSpawnDelay--;
            }
        }
    }
}

Scene_SpaceInvader.prototype.updateEnemyMovement = function() {
    for (var i = 0; i < this._enemies.length; i++) {
        if(!this._enemies[i]) {continue;}
        if (this._enemies[i].dead) continue;
        if (this._enemies[i].y <= 140 && !this.movingDown) {
            for (var j = 0; j < this._enemies.length; j++) {
                this._enemies[j].movingDown = true;
                this._enemies[j].moveLeft = true;
            }
            this.movingDown = true;
        } else if (this._enemies[i].y >= 340 && this.movingDown) {
            for (var j = 0; j < this._enemies.length; j++) {
                this._enemies[j].movingDown = false;
                this._enemies[j].moveLeft = true;
            }
            this.movingDown = false;
        }
        if(!this._player) {continue;}
        if(!!this._player.dead) {break;}
        if (this._enemies[i].x < this._player.x) { // Beyond the player's boundary
            this.playerDie();
            this.updateUI();
        }

        var p = this._player;
        if(!!this._player.dead) {break;}
        if (this._enemies[i].x > p.x && this._enemies[i].x < p.x + p.width && this._enemies[i].y > p.y && this._enemies[i].y < p.y + p.height) {
            this.playerDie();
            this.updateUI();
        }
    }

    //=========================================================================
    // Randomized enemy shooting
    //=========================================================================
    for (var i = 0; i < this._enemies.length; i++) {
        if (this._enemies[i].dead) continue;
        var rando = Math.floor(Math.random() * Math.floor(1000));
        if (rando > 996 && this._enemies[i].shootDelay <= 0) {
            this._bullets.push(this._enemies[i].shoot());
            this._enemies[i].shootDelay = this._enemies[i].shootSpeed;
        }
        if (this._enemies[i].shootDelay > 0) {
            this._enemies[i].shootDelay--;
        }
    }
}

Scene_SpaceInvader.prototype.playerDie = function(bullet) {
    var se = {
        name: "mini_csb_death",
        volume: 100,
        pitch: 100,
        pan: 0
    };
    AudioManager.playSe(se);

    var color = [255, 255, 255, 255];
    $gameScreen.startFlash(color, 60);
    // Remove all bullets
    for (var i = 0; i < this._bullets.length; i++) {
        this.removeChild(this._bullets[i]);
    }
    this._bullets = [];

    this.removeChild(this._power);
    this._power = null;

    // Make player invisible
    this._player.visible = false;
    this._player.dead = true;
    this._player.hasPowerUp = false;
    // Pause all action
    this._gamePaused = true;

    // Remove life and respawn
    this._lives--;
    if (this._lives > 0) {
        this._gamePaused = true;
        this._resultsOpen = true;
        this._resultTimer = 60;
        this._resultImg = new Sprite();
        this._resultImg.bitmap = ImageManager.loadPicture("INVADER-Dead");
        this._resultImg.x = 160 + 12;
        this._resultImg.y = 96 + 64;
        this.addChild(this._resultImg);
    } else {
        AudioManager.stopBgm();
        this.clearEnemies();
        for (var i = 0; i < this._barricades.length; i++) {
            this.removeChild(this._barricades[i]);
        }
        // Remove all bullets
        for (var i = 0; i < this._bullets.length; i++) {
            this.removeChild(this._bullets[i]);
        }
        this._bullets = [];
        this._barricades = [];

        this.removeChild(this._power);
        this._power = null;
        this._gameOver = true;
        this._gamePaused = true;
        this._resultsOpen = true;
        this._resultTimer = 60;
        this._resultImg = new Sprite();
        this._resultImg.bitmap = ImageManager.loadPicture("INVADER-GameOver");
        this._resultImg.x = 160 + 12;
        this._resultImg.y = 96 + 64;
        this.addChild(this._resultImg);
    }
}

Scene_SpaceInvader.prototype.updateAllBullets = function() {
    for (var i = 0; i < this._bullets.length; i++) {
        this._bullets[i].update();
        // If bullet goes off screen
        if (this._bullets[i].x < this._UIWindow.x || this._bullets[i].x > (this._UIWindow.width + this._UIWindow.x) || this._bullets[i].y < this._UIWindow.y || this._bullets[i].y > (this._UIWindow.height + this._UIWindow.y) ) {
            this.removeChild(this._bullets[i]);
            this._bullets.splice(i, 1);
        }
        // Collision
        var collideObject = this.checkCollide(this._bullets[i]);
        if (collideObject != null) {
            if (collideObject.type) {
                if (collideObject.type === 'player') { // The player got hit!
                    this.playerDie();
                    this.removeChild(this._bullets[i]);
                    this._bullets.splice(i, 1);
                    i--;
                    this.updateUI();
                } else { // An enemy got hit!
                    var se = {
                        name: "mini_csb_enemy_ship_dead",
                        volume: 100,
                        pitch: 100,
                        pan: 0
                    };
                    AudioManager.playSe(se);

                    // Do damage
                    // collideObject.currentHP--;
                    // collideObject.flicker();
                    // if (collideObject.currentHP < 1) {
                    //     this._score += collideObject.points;

                    //     collideObject.dead = true;
                    //     collideObject.visible = false;
                    // }

                    this._score += collideObject.points;

                    collideObject.dead = true;
                    collideObject.visible = false;

                    this.removeChild(this._bullets[i]);
                    this._bullets.splice(i, 1);
                    i--;
                    this.updateUI();
                }
            } else {
                if (collideObject.checkIfDamaged(this._bullets[i].x, this._bullets[i].y)) {
                    this.removeChild(this._bullets[i]);
                    this._bullets.splice(i, 1);
                    i--;
                }
            }
            if (!this._resultImg && !this._resultsOpen) this.checkStageComplete();
        }
    }
}

Scene_SpaceInvader.prototype.update = function() {
    Scene_Base.prototype.update.call(this);
    this.parallaxStars.origin.x += 0;
    this.parallaxStars.origin.y += 1;
    if (this._exitFade > 0) {
        this._exitFade--;
        if (this._logo) this._logo.opacity -= 12;
        if (this.mainImage) this.mainImage.opacity -= 12;
        if (this._pressKey) this._pressKey.opacity -= 12;
        if (this._UIWindow) this._UIWindow.opacity -= 12;
        if (this._player) this._player.opacity -= 12;
        if (this._parallaxStars) this._parallaxStars.opacity -= 12;

        if (this._exitFade <= 0) {
            this.removeChild(this._logo);
            this.removeChild(this._player);
            this.removeChild(this._UIWindow);
            this.removeChild(this.mainImage);
            this.removeChild(this.parallaxStars);
            this.removeChild(this._pressKey);

            this.popScene();
            $gameSystem.replayBgm();
        }
        return;
    }

    if (this._resultTimer > 0) {
        this._resultTimer--;
        return;
    }
    this.updateTitle();
    //=========================================================================
    // Win/Lose/Die
    //=========================================================================
    if (this._resultsOpen) {
        if (Input.isTriggered('ok')) {
            if (this._gameOver) {
                this.startFadeOut(12);
                this.goToTitle();
            } else if (this._gameComplete) {
                this.startFadeOut(12);
                this.goToTitle();
                this._gameComplete = false;
            } else if (this._nextStage) {
                this.removeResultImg();
                this.goToNextStage();
            } else if (this._player.dead) {
                this.respawnPlayer();
            }
        }
        return;
    }

    if (this._gamePaused) return;
    //=========================================================================
    // Player shoot on input
    //=========================================================================
    this.updatePlayerShoot();

    //=========================================================================
    // Enemy Movement
    //=========================================================================
    this.updateEnemyMovement();

    //=========================================================================
    // Power Up Movement
    //=========================================================================
    this.updatePowerUpMovement();

    //=========================================================================
    // Update all bullets
    //=========================================================================
    this.updateAllBullets();

}

Scene_SpaceInvader.prototype.removeResultImg = function() {
    if (this._resultImg) {
        this._resultsOpen = false;
        this._resultImg.visible = false;
        this.removeChild(this._resultImg);
        this._resultImg = null;
    }
}

Scene_SpaceInvader.prototype.checkCollide = function (bullet) {
    if (!bullet) return;
    for (var i = 0; i < this._barricades.length; i++) {
        var block = this._barricades[i];
        if (bullet.x > block.x && bullet.x < block.x + block.width && bullet.y > block.y && bullet.y < block.y + block.height) {
            return block;
        }

    }
    if (bullet.direction === -1) {
        var p = this._player;
        if (bullet.x > p.x && bullet.x < p.x + p.width && bullet.y > p.y && bullet.y < p.y + p.height) {
            return p;
        }
    } else {
        for (var i = 0; i < this._enemies.length; i++) {
            if (this._enemies[i] === null || this._enemies[i].dead) continue;
            e = this._enemies[i];
            if (bullet.x > e.x && bullet.x < e.x + e.width && bullet.y > e.y && bullet.y < e.y + e.height) {
                return e;
            }
        }
    }
}

Scene_SpaceInvader.prototype.checkStageComplete = function () {
    for (var i = 0; i < this._enemies.length; i++) {
        if (this._enemies[i].dead) {
            var allDead = true; continue;
        } else { var allDead = false; break; }
    }
    if (allDead) {
        var se = {
            name: "mini_csb_crisis_averted",
            volume: 100,
            pitch: 100,
            pan: 0
        };
        AudioManager.playSe(se);

        this._gamePaused = true;
        this._resultsOpen = true;
        this._resultTimer = 60;
        this._resultImg = new Sprite();
        this._resultImg.bitmap = ImageManager.loadPicture("INVADER-Complete");
        this._resultImg.x = 160 + 12;
        this._resultImg.y = 96 + 64;
        this.addChild(this._resultImg);
        this._nextStage = true;
    }
}

Scene_SpaceInvader.prototype.goToTitle = function() {
    this.clearEnemies();
    // Remove all barricades
    for (var i = 0; i < this._barricades.length; i++) {
        this.removeChild(this._barricades[i]);
    }
    // Remove all bullets
    for (var i = 0; i < this._bullets.length; i++) {
        this.removeChild(this._bullets[i]);
    }
    this._bullets = [];
    this._barricades = [];

    this.removeChild(this._power);
    this._power = null;

    this._gameInProgress = false;
    this._gamePaused = true;
    $gameVariables.setValue(641, this._score);
    this._score = 0;
    this._lives = 3;
    this._level = 1;
    this._UIWindow.visible = false;
    this.removeResultImg();
    this._gameOver = false;
    this.movingDown = false;
    
    this.startFadeOut(30);
    this._exitFade = 30;

    return;
    
    this._titleShowing = true;

    var bgm = {
        name: "SPACE ADVENTURES - REALISTIC SPACE SIMULATION",
        volume: 100,
        pitch: 100,
        pan: 0
    };
    AudioManager.playBgm(bgm);
}

Scene_SpaceInvader.prototype.goToNextStage = function () {
    this.clearEnemies();
    // Remove all bullets
    for (var i = 0; i < this._bullets.length; i++) {
        this.removeChild(this._bullets[i]);
    }
    this._bullets = [];
    // Remove all barricades
    for (var i = 0; i < this._barricades.length; i++) {
        this.removeChild(this._barricades[i]);
    }

    this.removeChild(this._power);
    this._power = null;
    this._barricades = [];
    this._nextStage = false;
    this._gameInProgress = true;
    this._gamePaused = false;
    this.removeResultImg();
    this._level += 1;
    this.movingDown = false;
    if (this._level > 10) {
        this._gamePaused = true;
        this._resultsOpen = true;
        this._resultTimer = 60;
        this._resultImg = new Sprite();
        this._resultImg.bitmap = ImageManager.loadPicture("INVADER-YouWin");
        this._resultImg.x = 160 + 12;
        this._resultImg.y = 96 + 64;
        this.addChild(this._resultImg);
       this._gameComplete = true;
    } else {
        this.setupEnemies(this._level);
        if (this._level <= 3) {
            this.setupBarricades(3);
        } else if (this._level > 3 && this._level <= 7) {
            this.setupBarricades(2);
        } else {
            this.setupBarricades(1);
        }
    }
}

Scene_SpaceInvader.prototype.goToStage = function(stageID) {
    this.clearEnemies();
    // Remove all bullets
    for (var i = 0; i < this._bullets.length; i++) {
        this.removeChild(this._bullets[i]);
    }
    this._bullets = [];
    // Remove all barricades
    for (var i = 0; i < this._barricades.length; i++) {
        this.removeChild(this._barricades[i]);
    }

    this.removeChild(this._power);
    this._power = null;
    this._barricades = [];
    this._nextStage = false;
    this._gameInProgress = true;
    this._gamePaused = false;
    this.removeResultImg();
    this._level = stageID;
    this.movingDown = false;
    if (this._level > 10) {
        this._gamePaused = true;
        this._resultsOpen = true;
        this._resultTimer = 60;
        this._resultImg = new Sprite();
        this._resultImg.bitmap = ImageManager.loadPicture("INVADER-YouWin");
        this._resultImg.x = 160 + 12;
        this._resultImg.y = 96 + 64;
        this.addChild(this._resultImg);
        this._gameComplete = true;
    } else {
        this.setupEnemies(this._level);
        if (this._level <= 3) {
            this.setupBarricades(3);
        } else if (this._level > 3 && this._level <= 7) {
            this.setupBarricades(2);
        } else {
            this.setupBarricades(1);
        }
    }
}

Scene_SpaceInvader.prototype.respawnPlayer = function () {
    this._gameInProgress = true;
    this._gamePaused = false;
    this.removeResultImg();
    this._gameOver = false;
    this._player.y = (Graphics.boxHeight - this._player.bitmap.height) / 2;
    this._player.visible = true;
    this._player.dead = false;

    this.movingDown = false;
    this.clearEnemies();
    this.setupEnemies(this._level);
}

//-----------------------------------------------------------------------------
//
//-----------------------------------------------------------------------------
function Window_SpaceInvaderUI() {
    this.initialize.apply(this, arguments);
}

Window_SpaceInvaderUI.prototype = Object.create(Window_Base.prototype);
Window_SpaceInvaderUI.prototype.constructor = Window_SpaceInvaderUI;

Window_SpaceInvaderUI.prototype.initialize = function (text) {
    var x = (Graphics.boxWidth - this.windowWidth()) / 2;
    var y = (Graphics.boxHeight - this.windowHeight()) / 2;
    Window_Base.prototype.initialize.call(this, x, y, this.windowWidth(), this.windowHeight());
    this.opacity = 0;
    this._score = 0;
    this._lives = 2;
    this.refresh();
};

Window_SpaceInvaderUI.prototype.windowWidth = function() {
    return 320;
}

Window_SpaceInvaderUI.prototype.windowHeight = function () {
    return 288;
}

Window_SpaceInvaderUI.prototype.standardPadding = function () {
    return 0;
}

Window_SpaceInvaderUI.prototype.refresh = function() {
    this.contents.clear();

    var  bitmap = ImageManager.loadPicture('INVADER-Text');
    this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 12, 12);

    var line = ImageManager.loadPicture('INVADER-UI-Line');
    this.contents.blt(line, 0, 0, line.width, line.height, 6, 32);

    for (var i = 0; i < this._lives - 1; i++) {
        var lives = ImageManager.loadPicture('INVADER-Ship');
        this.contents.blt(lives, 0, 0, lives.width, lives.height, (this.windowWidth() - 70) + (i * 32), 6);
    }

    var score = this._score.toString();
    for (var i = 0; i < score.length; i++) {
        this.getNumber(parseInt(score[i]), 70 + (i * 12), 12);
    }
}

Window_SpaceInvaderUI.prototype.getNumber = function (index, x, y) {
    var bitmap = ImageManager.loadPicture('INVADER-UI-Numbers');
    var pw = bitmap.width / 10;
    var ph = bitmap.height;
    var n = index;
    var sx = n % 10 * pw;
    var sy = (Math.floor(n / 10)) * ph;
    this.contents.blt(bitmap, sx, sy, pw, ph, x, y);
}
