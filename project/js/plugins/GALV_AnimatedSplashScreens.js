//-----------------------------------------------------------------------------
//  Galv's Animated Splash Screens
//-----------------------------------------------------------------------------
//  For: RPGMAKER MV
//  GALV_AnimatedSplashScreens.js
//-----------------------------------------------------------------------------
//  2016-10-22 - Version 1.1 - fixed database battle tst
//  2016-04-25 - Version 1.0 - release
//-----------------------------------------------------------------------------
// Terms can be found at:
// galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_AnimatedSplashScreens = true;

var Galv = Galv || {};          // Galv's main object
Galv.ASPLASH = Galv.ASPLASH || {};        // Galv's stuff

//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.1.1) Set up animated splash screens that show before the title screen.
 *
 * @author Galv - galvs-scripts.com
 *
 * @param ----- SPLASH SCREENS -----
 * @desc
 * @default
 *
 * @param Splash Images
 * @desc image,timer,fade,animId - See help file for more info.
 * @default image,150,8,0|image,150,8,0
 *
 * @param Splash Background
 * @desc The color (eg. #000000) or image (from /img/system/) of background during splash images
 * @default #333
 *
 * @param Splash Skip
 * @desc Skip option can be: ALL (to skip all images), ONE (to skip just one), NONE (disable skipping)
 * @default ONE
 *
 * @help
 *   Galv's Animated Splash Screens
 * ----------------------------------------------------------------------------
 * This plugin allows you to make animated splash screens that display before
 * the title screen. All splash images used in this plugin are taken from:
 * /img/system/
 *
 * The "Splash Images" plugin setting is where you set up all your splash
 * images and you can have as many as you like.
 * Each splash image has the following required values:
 *
 * image,timer,fade,animId
 *
 * image - the image name from /img/system/ folder
 * timer - how many frames the image will remain on the screen
 * fade - the speed the image fades in/out (lower is slower)
 * animId - the animation played (from database) when image is faded in
 *
 * You can have multiple splash images separated by "|" symbol.
 * EXAMPLE:
 * image1,150,8,3|image2,150,8,2|image3,150,8,0
 * ----------------------------------------------------------------------------
 */



//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

(function() {

Galv.ASPLASH.splashed = false;

// Splash Screens
Galv.ASPLASH.splashImgs = PluginManager.parameters('Galv_AnimatedSplashScreens')["Splash Images"].split("|");
for (i = 0; i < Galv.ASPLASH.splashImgs.length; i++) {
	var array = new Object(Galv.ASPLASH.splashImgs[i].split(","));
	Galv.ASPLASH.splashImgs[i] = {};
	Galv.ASPLASH.splashImgs[i].image = array[0];
	Galv.ASPLASH.splashImgs[i].timer = Number(array[1]);
	Galv.ASPLASH.splashImgs[i].fade = Number(array[2]);
	Galv.ASPLASH.splashImgs[i].anim = Number(array[3]);
};

Galv.ASPLASH.splashBg = PluginManager.parameters('Galv_AnimatedSplashScreens')["Splash Background"];
Galv.ASPLASH.splashSkip = PluginManager.parameters('Galv_AnimatedSplashScreens')["Splash Skip"].toLowerCase();



Galv.ASPLASH.Scene_Boot_loadSystemImages = Scene_Boot.loadSystemImages;
Scene_Boot.loadSystemImages = function() {
	Galv.ASPLASH.Scene_Boot_loadSystemImages.call(this);

    for (var i = 0; i < Galv.ASPLASH.splashImgs.length; i++) {
		ImageManager.loadSystem(Galv.ASPLASH.splashImgs[i].image);

	};
};

// SCENE SPLASHSCREENS
//-----------------------------------------------------------------------------

Galv.ASPLASH.SceneManager_goto = SceneManager.goto;
SceneManager.goto = function(sceneClass) {
	if (!Galv.ASPLASH.splashed && $dataActors && !DataManager.isBattleTest()) {
		if(!!StorageManager.exists(44)) {
			Galv.ASPLASH.splashed = true;
			return Galv.ASPLASH.SceneManager_goto.call(this,sceneClass);
		}
		sceneClass = Scene_SplashScreens
	}; // if no splash has played this boot, steal scene
	Galv.ASPLASH.SceneManager_goto.call(this,sceneClass);
};


// SCENE SPLASHSCREENS
//-----------------------------------------------------------------------------

function Scene_SplashScreens() {
    this.initialize.apply(this, arguments);
}

Scene_SplashScreens.prototype = Object.create(Scene_Base.prototype);
Scene_SplashScreens.prototype.constructor = Scene_SplashScreens;

Scene_SplashScreens.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
};

Scene_SplashScreens.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
	this.setVars();
    this.createBackground();
	this.createSplashes();
};

Scene_SplashScreens.prototype.setVars = function() {
	this._splashIndex = 0;  // the splash being displayed
	this._ticker = 0;       // length timer
	this._fadeIn = true;    // fadein start
};

Scene_SplashScreens.prototype.createBackground = function() {
	if (Galv.ASPLASH.splashBg[0] == "#") {
		var w = Graphics.boxWidth;
		var h = Graphics.boxHeight;
		this._backSprite = new Sprite();
		this._backSprite.bitmap = new Bitmap(w,h);
		this._backSprite.bitmap.fillRect(0, 0, w, h, Galv.ASPLASH.splashBg);
	} else {
		this._backSprite = new Sprite(ImageManager.loadSystem(Galv.ASPLASH.splashBg));
		this.centerSprite(this._backSprite);
	};
    this.addChild(this._backSprite);
};

Scene_SplashScreens.prototype.createSplashes = function() {
	this._sprites = [];
	for (i = 0; i < Galv.ASPLASH.splashImgs.length; i++) {
		this._sprites[i] = new Sprite_SplashImage(i);
		this.centerSprite(this._sprites[i]);
		this.addChild(this._sprites[i]);
	};
};

Scene_SplashScreens.prototype.centerSprite = function(sprite) {
    sprite.x = Graphics.width / 2;
    sprite.y = Graphics.height / 2;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
};

Scene_SplashScreens.prototype.sprite = function() {
	return this._sprites[this._splashIndex];
};

Scene_SplashScreens.prototype.splash = function() {
	return Galv.ASPLASH.splashImgs[this._splashIndex];
};

Scene_SplashScreens.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SceneManager.clearStack();
    this.centerSprite(this._backSprite);
    this.startFadeIn(this.fadeSpeed(), false);
};

Scene_SplashScreens.prototype.update = function() {
    Scene_Base.prototype.update.call(this);
	this.updateSplash();
};

Scene_SplashScreens.prototype.updateSplash = function() {
	if (this._fadeIn) {
		this.sprite().opacity += this.splash().fade;
		if (this.sprite().opacity >= 255) {
			this._fadeIn = false;
			this.sprite().doAnim();
		};
	} else {
		if (this._ticker < this.splash().timer) {
			this._ticker++;
		} else {
			this.sprite().opacity -= this.splash().fade;
			if (this.sprite().opacity <= 0) {
				if (!this._sprites[this._splashIndex + 1]) return this.endSplashes();
				this._splashIndex++;
				this._fadeIn = true;
				this._ticker = 0;
			};
		};
	};

	if (Input.isTriggered('ok')) {
		if (Galv.ASPLASH.splashSkip == 'one') {
			this._ticker = this.splash().timer;
			this._fadeIn = false;
		} else if (Galv.ASPLASH.splashSkip == 'all') {
			this._ticker = this.splash().timer;
			this._fadeIn = false;
			this._sprites[this._splashIndex + 1] = null;
		};
	};
};

Scene_SplashScreens.prototype.endSplashes = function() {
	Galv.ASPLASH.splashed = true;
//	SceneManager.goto(Scene_Title);
	SceneManager.goto(Scene_OmoriTitleScreen);
};



// SPRITE SPLASH
//-----------------------------------------------------------------------------

function Sprite_SplashImage() {
    this.initialize.apply(this, arguments);
}

Sprite_SplashImage.prototype = Object.create(Sprite_Base.prototype);
Sprite_SplashImage.prototype.constructor = Sprite_SplashImage;

Sprite_SplashImage.prototype.initialize = function(index) {
    Sprite_Base.prototype.initialize.call(this);
	this.bitmap = ImageManager.loadSystem(Galv.ASPLASH.splashImgs[index].image)
	this.opacity = 0;
	this._index = index;
};

Sprite_SplashImage.prototype.doAnim = function() {
	this._animId = Galv.ASPLASH.splashImgs[this._index].anim;
};

Sprite_SplashImage.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);
	this.updateAnimation();
};

Sprite_SplashImage.prototype.updateAnimation = function() {
    this.setupAnimation();
    if (!this.isAnimationPlaying()) {
       this._animationPlaying = false;
    }
};

Sprite_SplashImage.prototype.setupAnimation = function() {
    if (this._animId > 0) {
        var animation = $dataAnimations[this._animId];
        this.startAnimation(animation, false, 0);
		this._animId = 0;
		this._animationPlaying = true;
    }
};
})();
