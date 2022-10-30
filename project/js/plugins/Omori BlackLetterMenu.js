//=============================================================================
// TDS Omori BlackLetter Menu
// Version: 1.5
//=============================================================================
// Add to Imported List
var Imported = Imported || {} ; Imported.TDS_OmoriBlackLetterMenu = true;
// Initialize Alias Object
var _TDS_ = _TDS_ || {} ; _TDS_.OmoriBlackLetterMenu = _TDS_.OmoriBlackLetterMenu || {};
//=============================================================================
 /*:
 * @plugindesc
 * This plugin shows the Omori Black Letter menu.
 *
 * @author TDS
 *
 */
//=============================================================================




// ImageManager.loadSystem('Blackletters_menu');


//=============================================================================
// ** Game_Interpreter
//-----------------------------------------------------------------------------
// The interpreter for running event commands.
//=============================================================================
// * Call Black Letter menu
//=============================================================================
Game_Interpreter.prototype.callBlackLetterMenu = function(forced = true) {
  SceneManager.push(Scene_OmoBlackLetterMenu);
  SceneManager.prepareNextScene(forced);
};
//=============================================================================
// * Add Black Letter
//=============================================================================
Game_Interpreter.prototype.addBlackLetter = function() {
  // Get Letters
  var letters = Array.from(arguments).map(function(l) { return l.toUpperCase(); });
  // Get Blackletter Items
  var items = DataManager.getBlackletterItems();
  // Find Letter Item
  var findLetterItem = function(item, letter) {  }
  // Go Through Letters
  for (var i = 0; i < letters.length; i++) {
    // Get Letter
    var letter = letters[i];
    // Find Item
    var item = items.find(function(i) { return i.meta.Blackletter.trim().toUpperCase() === letter; })
    // If item exists
    if (item) {
      // If the party does not have the item already add it
      if (!$gameParty.hasItem(item)) {
        // Add Letter Item
        $gameParty.gainItem(item, 1);
        // Add Letter to Blackletters array
        $gameParty._blackLetters.push(item.id);
      };
    }
  };
  // Go through Items
  for (var i = 0; i < items.length; i++) {
    // Get Item
    var item = items[i];
    // Get Letter
    var letter = item.meta.Blackletter.trim();
    // If Letters Contains Blackletter
    if (letters.contains(letter)) {
      // If the party does not have the item already add it
      if (!$gameParty.hasItem(item)) {
        // Add Letter Item
        $gameParty.gainItem(item, 1);
        // Add Letter to Blackletters array
        $gameParty._blackLetters.push(item.id);
      };
    };
  };
};

_TDS_.OmoriBlackLetterMenu.Scene_Map_needsFadeIn = Scene_Map.prototype.needsFadeIn;
Scene_Map.prototype.needsFadeIn = function() {
  return  (_TDS_.OmoriBlackLetterMenu.Scene_Map_needsFadeIn.call(this) || SceneManager.isPreviousScene(Scene_OmoBlackLetterMenu));
};


//=============================================================================
// ** Scene_OmoBlackLetterMenu
//-----------------------------------------------------------------------------
// Class for displaying the blackletter collection interface.
//=============================================================================
function Scene_OmoBlackLetterMenu() { this.initialize.apply(this, arguments); }
Scene_OmoBlackLetterMenu.prototype = Object.create(Scene_BaseEX.prototype);
Scene_OmoBlackLetterMenu.prototype.constructor = Scene_OmoBlackLetterMenu;
//=============================================================================
// * Object Initialization
//=============================================================================
Scene_OmoBlackLetterMenu.prototype.initialize = function() {
  // Set Image reservation Id
  this._imageReservationId = 'hangman';
  // Super Call
  Scene_BaseEX.prototype.initialize.call(this);
  // Set Crashing flag to false
  this._crashing = false;
  // Nose Flag (If True apply random seed to noise filter)
  this._noise = false;
  // Get Black Letter Collection State
  this._collectionState = DataManager.blackLetterCollectionState();
  // Inert Flag (Done doing stuff)
  this._inert = $gameSwitches.value(45);
  if(this._collectionState === 1 && !this._inert) {
    var time = 32 / 60;
    AudioManager.fadeOutBgm(time);
    AudioManager.fadeOutBgs(time);
    AudioManager.fadeOutMe(time);
  }
};
//=============================================================================
// * Prepare
//=============================================================================
Scene_OmoBlackLetterMenu.prototype.prepare = function(forced = false) {
  // Set Forced flag
  this._forced = forced
};
//=============================================================================
// * Initialize Atlas Lists
//=============================================================================
Scene_OmoBlackLetterMenu.prototype.initAtlastLists = function() {
  // Super Call
  Scene_BaseEX.prototype.initAtlastLists.call(this);
};
//=============================================================================
// * Load Reserved Bitmaps
//=============================================================================
Scene_OmoBlackLetterMenu.prototype.loadReservedBitmaps = function() {
  // Super Call
  Scene_BaseEX.prototype.loadReservedBitmaps.call(this);
  // Reserve Hangman States Image
  ImageManager.reserveSystem('Blackletters_menu',  0, this._imageReservationId);
  ImageManager.reserveSystem('HangmanStates', 0, this._imageReservationId);
}
//=============================================================================
// * Start
//=============================================================================
Scene_OmoBlackLetterMenu.prototype.start = function() {
  // Super Call
  Scene_BaseEX.prototype.start.call(this);
  this.startFadeIn(this.slowFadeSpeed());
  // Turn on Switch if all letters collected
  if (this._collectionState === 0) {
    // Turn on switch
    $gameSwitches.setValue(15);
  }
};
//=============================================================================
// * Create
//=============================================================================
Scene_OmoBlackLetterMenu.prototype.create = function() {
  // Super Call
  Scene_BaseEX.prototype.create.call(this);

  // Create Background
  this.createBackground();
  // Create Window Container
  this._windowContainer = new Sprite();
  this.addChild(this._windowContainer);

  var items = DataManager.getBlackletterItems();

  $gameParty._blackLetterIndex = 0;
  $gameParty._blackLetters = [];
  // Go through Items
  for (var i = 0; i < items.length; i++) {
    // Get Item
    var item = items[i];
    // If Party has item
    if ($gameParty.hasItem(item)) {
      // Add Blackletter to Blackletters array
      $gameParty._blackLetters.push(item.id);
    };
  };

  // Create Windows
  this.createHangmanHeaderWindow();
  this.createHangmanHeaderHelpWindow();
  this.createBlackLetterListWindow();
  this.createHangmanBodyWindow();
  this.createHangmanWordWindow();

  // this._tvFilter = new PIXI.filters.CRTFilter();
  // // this._tvFilter.lineWidth = 1;
  // // this._tvFilter.vignetting = 1;
  // this._tvFilter.animated = true;
  // this._tvFilter.noise = 0.2;
  // this._tvFilter.noiseSize = 1;
  // this._tvFilter.seed = 0;
  // this._tvFilter.time = 0.5;
  // // this._tvFilter.aniSpeed = 10;

  this._glitchFilter = new PIXI.filters.GlitchFilter();

  this._glitchFilter.fillMode = 2;
  this._glitchFilter.slices = 0;
  this._glitchFilter.red = new Point(0, 0)

  this._glitchFilter.seed = 0;

  this._noiseFilter = new PIXI.filters.NoiseFilter();
  this._noiseFilter.animated = true;
  this._noiseFilter.noise = 0


  this._windowContainer._filters = [this._glitchFilter, this._noiseFilter]

  this._hangmanSomething = new Sprite(ImageManager.loadPicture('hangman_something'));
  // this._hangmanSomething.scale = 0.5;
  this._hangmanSomething.scale.set(0.1, 0.1);
  this._hangmanSomething.x = Graphics.width -200;
  this._hangmanSomething.y = 150;
  this._hangmanSomething.opacity = 0;
  this._hangmanSomething.filters = [this._glitchFilter]
  this._windowContainer.addChild(this._hangmanSomething);


  // this._horrorTest = new Sprite(new Bitmap(Graphics.width, Graphics.height));
  // this.addChild(this._horrorTest)
};
//=============================================================================
// * Create Background
//=============================================================================
Scene_OmoBlackLetterMenu.prototype.createBackground = function() {
  this._backgroundSprite = new Sprite();
  this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
  this.addChild(this._backgroundSprite);
};
//=============================================================================
// * Create Hangman Header Window
//=============================================================================
Scene_OmoBlackLetterMenu.prototype.createHangmanHeaderWindow = function() {
  // Create Hangman Header Window
  this._hangmanHeaderwindow = new Window_Base(0, 0, 0, 0);
  this._hangmanHeaderwindow.standardPadding = function() { return 4; };
  this._hangmanHeaderwindow.initialize(0, 0, 386, 45)
  this._hangmanHeaderwindow.fontSize = 38;
  // this._hangmanHeaderwindow.drawText('HANGMAN', 5, -7, 200, 40);

  this._hangmanHeaderwindow.drawBlackLetterText(LanguageManager.getMessageData("XX_BLUE.Omori_Blackletter_Menu").hangman, 5, 2, 26);
  this._windowContainer.addChild(this._hangmanHeaderwindow);
};
//=============================================================================
// * Create Hangman Header Help Window
//=============================================================================
Scene_OmoBlackLetterMenu.prototype.createHangmanHeaderHelpWindow = function() {
  // Get Header Window
  var header = this._hangmanHeaderwindow;
  // Create Hangman Header Window
  this._hangmanHeaderHelpwindow = new Window_Base(0, 0, 0, 0);
  this._hangmanHeaderHelpwindow.standardPadding = function() { return 4; };
  this._hangmanHeaderHelpwindow.initialize(0, header.height, header.width, 60)
  this._hangmanHeaderHelpwindow.contents.fontSize = 22;
  this._hangmanHeaderHelpwindow.drawText(LanguageManager.getMessageData("XX_BLUE.Omori_Blackletter_Menu").collect_desc, 5, -7, 400, 40);
  this._hangmanHeaderHelpwindow.drawText(LanguageManager.getMessageData("XX_BLUE.Omori_Blackletter_Menu").incorrect_desc, 5, 15, 400, 40);
  this._windowContainer.addChild(this._hangmanHeaderHelpwindow);
};
//=============================================================================
// * Create BlackLetter List window
//=============================================================================
Scene_OmoBlackLetterMenu.prototype.createBlackLetterListWindow = function() {
  // Create Black Letter List Window
  this._blackLetterListWindow = new Window_OmoBlackLetterList(this.hangmanWord());
  // Select the first letter if not forced
  if (!this._forced) { this._blackLetterListWindow.select(0); };
  this._windowContainer.addChild(this._blackLetterListWindow);
};
//=============================================================================
// * Create Hangman Body Window
//=============================================================================
Scene_OmoBlackLetterMenu.prototype.createHangmanBodyWindow = function() {
  // Create Hangman Body Window
  this._hangmanBodyWindow = new Window_OmoHangmanBody(this.hangmanWord());
  this._windowContainer.addChild(this._hangmanBodyWindow);
};
//=============================================================================
// * Create Hangman Word Window
//=============================================================================
Scene_OmoBlackLetterMenu.prototype.createHangmanWordWindow = function() {
  // Create Hangman Word Window
  this._hangmanWordWindow = new Window_OmoBlackLetterWord(this.hangmanWord(), this._forced);
  this._windowContainer.addChild(this._hangmanWordWindow);
};
//=============================================================================
// * Get Hangman Word
//=============================================================================
Scene_OmoBlackLetterMenu.prototype.hangmanWord = function() {
  return DataManager.hangmanWord();
};
//=============================================================================
// * Frame Update
//=============================================================================
Scene_OmoBlackLetterMenu.prototype.update = function() {
  // Super Call
  Scene_BaseEX.prototype.update.call(this);

  // If Noise Flag
  if (this._noise) {
    // Set Noise Filter Seed
    this._noiseFilter.seed = Math.random();
  };

  // If Not Crashing
  if (!this._crashing) {
    // If Failed
    if (!this._inert && this._collectionState === 1) {
      // If Hangman Body Window is not busy animating
      if (!this._hangmanBodyWindow.isBusyAnimating()) {
        // Start Crash
        this.startCrash();
      };
      return;
    };

    // If Input trigger cancel
    if (Input.isTriggered('cancel')) {
      // If Hangman Body Window is not busy animating
      //(!this.isBusy() && !this._hangmanBodyWindow.isBusyAnimating() && this._hangmanWordWindow._introPhase === -1)
      if (!this.isBusy()) {
        // Go to previous scene
    //    SoundManager.playCancel();
        SceneManager.pop();
        Input.clear();
        TouchInput.clear();
      };
    };
  };
};
//=============================================================================
// * Start Crash
//=============================================================================
Scene_OmoBlackLetterMenu.prototype.startCrash = function() {
  // Set Crashing Flag to true;
  this._crashing = true;
  // Turn on Switch
  $gameSwitches.setValue(45, true)
  // Save Game
  DataManager.saveGame(44);

    // return
  // Set Crashing Flag to true;
  this._crashing = true;
  // Reset Crash Count
  this._crashCount = 0;

  // Set Noise Filter Seed
  this._noiseFilter.seed = Math.random();

  this._crashPresses = 1//3 + Math.randomInt(3);

  this._heartBeatVolume = 1;

  AudioManager.playBgs({name: 'SEheartbeat', volume: 50, pitch: 100})
  this._noise = true;

  // TEST
  // this._hangmanSomething.opacity = 255;

  // this._noiseFilter.noise = 0.8

  // this.queueGlitch(15, 0);
  // this.queueGlitch(15, 10);
  // this.queue('performGlitch', 1);
  // this.queue('wait', 5);
  // this.queue('performGlitch', 0);

  // Introduction Phase
  this.queue('startFunctionWait', function() {
    // Increase Crash Count
    this._crashCount++
    // Increase Hangman Something Opacity
    this._hangmanSomething.opacity += 50;
    // If crash count has reached the end
    if (this._crashCount >= 24) {
      // SceneManager.startWindowShake(30);
      // Reset Crash Count
      this._crashCount = 0;
      return false;
    };
    return true;
  });

  this.queueGlitch(2, 0);
  this.queueGlitch(2, 0);
  this.queueGlitch(2, 0);
  this.queueGlitch(2, 0);

  this.queue(function() {
    // Close Game
    SceneManager.terminate()
  }.bind(this));

  this.queue(function() {
    // alert('tits')
    this._hangmanSomething.x = 100
    this._hangmanSomething.y = 0;
    this._hangmanSomething.scale.set(1, 1);
    this.addChild(this._hangmanSomething);
    AudioManager.playSe({name: 'mini_sme_move', volume: 100, pitch: 100})
    SceneManager.startWindowShake(30);

  }.bind(this))

  this.queueGlitch(2, 3);
  this.queueGlitch(2, 3);
  this.queueGlitch(2, 3);

  this.queue('wait', 2);

  this.queue(function() {
    this._hangmanSomething.opacity = 0;
    this._crashing = false;
  }.bind(this))

};
//=============================================================================
// * Perform Glitch
//=============================================================================
Scene_OmoBlackLetterMenu.prototype.queueGlitch = function(duration = 15, wait = 0) {
  // Perform glitch
  this.queue(function() {
    // Set Glitch Values
    AudioManager.playSe({name: 'mini_sme_move', volume: 100, pitch: 100})

    this._glitchFilter.seed = Math.random();
    this._glitchFilter.slices = 15 + Math.randomInt(10);
    this._glitchFilter.direction = Math.randomInt(10) * Math.sin(Graphics.frameCount);
  }.bind(this))
  this.queue('wait', duration);
  // Reset Filter
  this.queue(function() {
    // Reset
    this._glitchFilter.slices = 0
    this._glitchFilter.direction = 0
  }.bind(this))
  // If Wait duration is more than 0
  if (wait > 0) { this.queue('wait', wait); }
};



//=============================================================================
// ** Window_OmoBlackLetterList
//-----------------------------------------------------------------------------
// The window for showing blackletters in the blackletter menu.
//=============================================================================
function Window_OmoBlackLetterList() { this.initialize.apply(this, arguments); }
Window_OmoBlackLetterList.prototype = Object.create(Window_Command.prototype);
Window_OmoBlackLetterList.prototype.constructor = Window_OmoBlackLetterList;
//=============================================================================
// * Object Initialization
//=============================================================================
Window_OmoBlackLetterList.prototype.initialize = function(word = "") {
  // Set Hangman Word
  this._hangmanWord = word
  // Super Call
  Window_Command.prototype.initialize.call(this, 0, 105);
  // Select Letter
  this.selectLetter($gameParty.lastBlackLetter());
};
//=============================================================================
// * Settings
//=============================================================================
Window_OmoBlackLetterList.prototype.isUsingCustomCursorRectSprite = function() { return true; };
Window_OmoBlackLetterList.prototype.standardPadding = function() { return 10; }
Window_OmoBlackLetterList.prototype.windowWidth = function () { return 386; };
Window_OmoBlackLetterList.prototype.windowHeight = function() { return 360 - 55; };
Window_OmoBlackLetterList.prototype.maxCols = function() { return 1;};
Window_OmoBlackLetterList.prototype.itemHeight = function() { return 34 + 1; };
Window_OmoBlackLetterList.prototype.spacing = function() { return 5; };
Window_OmoBlackLetterList.prototype.customCursorRectXOffset = function() { return 8; }
Window_OmoBlackLetterList.prototype.customCursorRectYOffset = function() { return 0; }
Window_OmoBlackLetterList.prototype.playOkSound = function() { };
//=============================================================================
// * Refresh Arrows
//=============================================================================
Window_OmoBlackLetterList.prototype._refreshArrows = function() {
  // Run Original Function
  Window_Command.prototype._refreshArrows.call(this);
  var w = this._width;
  var h = this._height;
  var p = 28;
  var q = p/2;
  this._downArrowSprite.move(w - q, h - q);
  this._upArrowSprite.move(w - q, q);
};
//=============================================================================
// * Select Letter
//=============================================================================
Window_OmoBlackLetterList.prototype.selectLetter = function(letter) {
  // Convert Letter to Uppercase
  letter = letter.toUpperCase();
  // Go through list
  for (var i = 0; i < this._list.length; i++) {
    // Get Command
    var command = this._list[i];
    // If Command letter matches letter
    if (command.ext.letter === letter) {
      // Select command at index
      this.select(i);
      break
    };
  };
};
//=============================================================================
// * Make Command List
//=============================================================================
Window_OmoBlackLetterList.prototype.makeCommandList = function() {
  // Get Blackletter Items
  var items = DataManager.getBlackletterItems();
  // Go through Items
  for (var i = 0; i < items.length; i++) {
    // Get Item
    var item = items[i];
    // Get Data
    var data = {letter: item.meta.Blackletter.trim(), clue: item.meta.BlackLetterClue.trim(), itemId: item.id };
    // Add Command
    this.addCommand(item.name, 'ok', true, data)
  };
};
//=============================================================================
// * Draw Item
//=============================================================================
Window_OmoBlackLetterList.prototype.drawItem = function(index) {
  // Get Item Rect
  var rect = this.itemRect(index);
  // Get Data
  var data = this._list[index].ext;
  // Draw Clue
  this.contents.fontSize = 24;
  this.changeTextColor(this.textColor(0))
  this.drawText(data.clue, 75, rect.y - 5, rect.width - 135, rect.height);
  // Adjust Rect
  rect.x = rect.width - (rect.height + 10)
  rect.height -= 6
  rect.width = rect.height;
  // Draw Blackletter Text
  this.drawBlackLetterText(data.letter, 35, rect.y);
  // Move rect Y
  rect.y += 3;
  // Fill Check mark box
  this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, 'rgba(255, 255, 255, 1)');
  this.contents.clearRect(rect.x + 3, rect.y + 3, rect.width - 6, rect.height - 6);
  // Change Font Size
  this.contents.fontSize = 20;
  // Get State (Right, Wrong, Empty)
  var state = 2;
  // If Item is obtained
  if ($gameParty.hasItem($dataItems[data.itemId])) {
    // Set State
    state = this._hangmanWord.contains(data.letter) ? 0 : 1;
  };
  // Get Symbol
  var symbol = ['✓', '✕', ''][state];
  // Get Color
  var color = [3, 2, 0][state];

  var symbolsImage = ImageManager.loadSystem('HangmanStates');
  this.contents.blt(symbolsImage, 20 * state, 0, 20, 20, rect.x + 5, rect.y + 4, 20, 20);
};
//=============================================================================
// * Draw Option Segment
//=============================================================================
Window_OmoBlackLetterList.prototype.drawOptionSegment = function(header, options, spacing, rect) {
  // Draw Header
  this.contents.drawText(header, rect.x + 50, rect.y, rect.width, 24);
  // Go Through Options
  for (var i = 0; i < options.length; i++) {
    // Draw Options
    this.contents.drawText(options[i], rect.x + (100 + (i * spacing)), rect.y + 35, rect.width, 24)
  };
};
//=============================================================================
// * Frame Update
//=============================================================================
Window_OmoBlackLetterList.prototype.update = function(index) {
  // Run Original Function
  Window_Command.prototype.update.call(this);
};



//=============================================================================
// ** Window_OmoBlackLetterWord
//-----------------------------------------------------------------------------
// The window for show blackletters in the blackletter menu.
//=============================================================================
function Window_OmoBlackLetterWord() { this.initialize.apply(this, arguments); }
Window_OmoBlackLetterWord.prototype = Object.create(Window_Base.prototype);
Window_OmoBlackLetterWord.prototype.constructor = Window_OmoBlackLetterWord;
//=============================================================================
// * Object Initialization
//=============================================================================
Window_OmoBlackLetterWord.prototype.initialize = function(word = "", forced = false) {
  // Set Hangman Word
  this._hangmanWord = word;
  // Set Forced state
  this._forced = forced;
  Window_Base.prototype.initialize.call(this, 0, Graphics.height -70, Graphics.width, 70);
  // Get Letter Collection State
  this._letterCollectionState = DataManager.blackLetterCollectionState();
  // Spin Index
  this._spinIndex = 0;
  // Set Intro Phase
  this._introPhase = -1;
  // Get Last Letter
  this._lastLetter = $gameParty.lastBlackLetter();
  // Create Letter Sprites
  this.createLetterSprites();
};
//=============================================================================
// * Create Letter Sprites
//=============================================================================
Window_OmoBlackLetterWord.prototype.createLetterSprites = function() {
  // Get Split Word
  var word = this._hangmanWord.split('');
  // Get bitmap
  var bitmap = ImageManager.loadSystem('Blackletters_menu');
  // Create Low Bitmap
  var lowBitmap = new Bitmap(32, 32);
  lowBitmap.fillRect(1, 30, 27, 2, 'rgba(255, 255, 255, 1)');
  // Initialize Blackletters Array
  var blackletters = [];
  // Get Blackletter Items
  var items = DataManager.getBlackletterItems();

  // Go through Items
  for (var i = 0; i < items.length; i++) {
    // Get Item
    var item = items[i];
    // If Party has item
    if ($gameParty.hasItem(item)) {
      // Add Blackletter to Blackletters array
      blackletters.push(item.meta.Blackletter.trim());
    };
  };

  // Initialize Letter Sprites
  this._letterSprites = [];
  // Set Starting X
  var sx = 29;
  // Go Through Word
  for (var i = 0; i < word.length; i++) {
    // Get Letter
    var letter = word[i].toUpperCase();
    // If Letter is not space
    if (letter !== " ") {
      // Create Sprite
      var sprite = new Sprite_OmoBlackletter(blackletters.contains(letter) ? letter : "");
      sprite.x = sx;
      sprite.y = 34;
      // If Forced and Letter matches the last letter
      if (this._forced && letter === this._lastLetter) {
        sprite.opacity = 0;
        this._introPhase = 0;
      };
      // Add Letter Sprite to Array
      this._letterSprites.push(sprite)
      // Add Child
      this.addChild(sprite);
      sx += 29;
    } else {
      sx += 20;
    };
  };
};
//=============================================================================
// * Settings
//=============================================================================
Window_OmoBlackLetterWord.prototype.standardPadding = function() { return 4; }
//=============================================================================
// * Refresh
//=============================================================================
Window_OmoBlackLetterWord.prototype.refresh = function() {
  // Clear Contents
  this.contents.clear();
};
//=============================================================================
// * Frame Update
//=============================================================================
Window_OmoBlackLetterWord.prototype.update = function() {
  // Super Call
  Window_Base.prototype.update.call(this);
  // Update Letter animation
  this.updateLetterAnimation();
};
//=============================================================================
// * Update Letter Animation
//=============================================================================
Window_OmoBlackLetterWord.prototype.updateLetterAnimation = function() {
  // If Intro Phase is equal or more than 0
  if (this._introPhase >= 0) {
    // Intro Phase switch case
    switch (this._introPhase) {
      case 0:
        // Set Finished Flag
        var finished = true;
        // Go Through Letter Sprites
        for (var i = 0; i < this._letterSprites.length; i++) {
          // Get Letter Sprite
          var sprite = this._letterSprites[i];
          // If Sprite Opacity is less than 255
          if (sprite.opacity < 255) {
            // Increase Opacity
            sprite.opacity += 5;
            // Set Finished to false
            finished = false;
          };
        };

        // If Finished
        if (finished) {
          // Go Through Letter Sprites
          for (var i = 0; i < this._letterSprites.length; i++) {
            // Get Letter Sprite
            var sprite = this._letterSprites[i];
            if (sprite._letter === this._lastLetter) { sprite.setupFlip(); };
          };
          // Set Intro Phase
          this._introPhase = 1;
        };
      break;
      case 1:
        // Set Finished Flag
        var finished = true;
        // Go Through Letter Sprites
        for (var i = 0; i < this._letterSprites.length; i++) {
          // If Flip duration is more than 0
          if (this._letterSprites[i]._flipDuration > 0) {
            // Set Finished to false
            finished = false;
          };
        };
        // If Finished
        if (finished) {
          // Go Through Letter Sprites
          for (var i = 0; i < this._letterSprites.length; i++) {
            // Get Letter Sprite
            var sprite = this._letterSprites[i];
            // If Not an empty spot
            if (sprite._letter !== "") { sprite.setupFlip(); };
          };
          // Set Intro Phase (Clear)
          this._introPhase = -1;
        };
      break;
    };
    return
  };


  // Return if not complete
  if (this._letterCollectionState !== 0) { return; }
  // If Spin index is more than 0
  if (this._spinIndex > 0) {
    // Get Sprite
    var sprite = this._letterSprites[this._spinIndex];
    // Get Last Sprite
    var lastSprite = this._letterSprites[this._spinIndex-1];
    // If Spin index is more or equal than amount of letters
    if (this._spinIndex >= this._letterSprites.length) {
      // Setup Flip
      sprite.setupFlip()
      // Increase Spin Index
      this._spinIndex = (this._spinIndex + 1) % this._letterSprites.length;
    } else {
      if (lastSprite && lastSprite._flipDirection === -1 && lastSprite._flipDuration <= 3) {
        // Setup Flip
        sprite.setupFlip()
        // Increase Spin Index
        this._spinIndex = (this._spinIndex + 1) % this._letterSprites.length;
      };
    };
  } else {
    // Get Last Sprite
    var lastSprite = this._letterSprites[this._letterSprites.length-1];
    if (lastSprite._flipDirection === 0) {
      // Get Sprite
      var sprite = this._letterSprites[this._spinIndex];
      // Setup Flip
      sprite.setupFlip();
      // Increase Spin Index
      this._spinIndex = (this._spinIndex + 1) % this._letterSprites.length;
    };
  }
};



//=============================================================================
// ** Window_OmoHangmanBody
//-----------------------------------------------------------------------------
// The window for showing the hangman body in the hangman menu.
//=============================================================================
function Window_OmoHangmanBody() { this.initialize.apply(this, arguments); }
Window_OmoHangmanBody.prototype = Object.create(Window_Base.prototype);
Window_OmoHangmanBody.prototype.constructor = Window_OmoHangmanBody;
//=============================================================================
// * Object Initialization
//=============================================================================
Window_OmoHangmanBody.prototype.initialize = function(word = "") {
  // Set Hangman Word
  this._hangmanWord = word;
  // Animation Delay
  this._animationDelay = 30;
  // Inert Flag
  this._inert = $gameSwitches.value(45);
  // Get Width
  var width = 254;
  // Super Call
  Window_Base.prototype.initialize.call(this, Graphics.width - width, 0, width, 410);
  // Animation Settings
  this._anim = {part: null, duration: 10}
  // Create Background Sprite
  this.createBackgroundSprite();
  // Create Body Sprites
  this.createBodySprites();
  // Create Letter Sprites
  this.createLetterSprites();
};
//=============================================================================
// * Settings
//=============================================================================
Window_OmoHangmanBody.prototype.standardPadding = function() { return 4; }
//=============================================================================
// * Get Sheet Bitmap
//=============================================================================
Window_OmoHangmanBody.prototype.sheetBitmap = function() { return ImageManager.loadPicture('HANGMAN_Sheet'); };
//=============================================================================
// * Determine if busy animating
//=============================================================================
Window_OmoHangmanBody.prototype.isBusyAnimating = function() {
  if ($gameParty._blackLetterIndex < this._letterSprites.length) { return true; }
  if (this._anim.part !== null) { return true; }
  return false;
};
//=============================================================================
// * Create Background Sprite
//=============================================================================
Window_OmoHangmanBody.prototype.createBackgroundSprite = function() {
  // Create Background Sprite
  this._backgroundSprite = new Sprite(this.sheetBitmap());
  this._backgroundSprite.x = 3;
  this._backgroundSprite.y = 3;
  this._backgroundSprite.setFrame(2, 1, 247, 403);
  this.addChildToBack(this._backgroundSprite);
};
//=============================================================================
// * Create Letter Sprites
//=============================================================================
Window_OmoHangmanBody.prototype.createLetterSprites = function() {
  // Get Split Word
  var word = this._hangmanWord.split('');
  // Get bitmap
  var bitmap = ImageManager.loadSystem('Blackletters_menu');
  // Get Blackletters
  var blackLetters = $gameParty._blackLetters.map(function(id) { return $dataItems[id].meta.Blackletter.trim().toUpperCase(); });
  // Initialize Letter Sprites
  this._letterSprites = [];
  // Return if inert
  if (this._inert) { return; }
  // Get index
  var index = 0;
  // Go Through Word
  for (var i = 0; i < blackLetters.length; i++) {
    // Get Letter
    var letter = blackLetters[i];
    // If Letter is not space
    if (letter !== " " && !word.contains(letter)) {
      // Create Sprite
      var sprite = new Sprite_OmoBlackletter(letter);
      sprite.x = 24 + ((index % 7) * 34);
      sprite.y = 24 + (Math.floor(index / 7) *  34);
      sprite.opacity = index < $gameParty._blackLetterIndex ? 255 : 0;
      // Add Letter Sprite to Array
      this._letterSprites.push(sprite)
      // Add Child
      this.addChild(sprite);
      // Increase index
      index++
    };
  };
};
//=============================================================================
// * Create Body Sprites
//=============================================================================
Window_OmoHangmanBody.prototype.createBodySprites = function() {
  // Create Body Sprite Container
  this._bodySpriteContainer = new Sprite();
  this._bodySpriteContainer.y = 25
  this.addChild(this._bodySpriteContainer);

  // Return if inert
  if (this._inert) {
    this._smudgeSprite = new Sprite(this.sheetBitmap())

    this._backgroundSprite.setFrame(253, 4, 247, 403);
    this._bodySpriteContainer.addChild(this._backgroundSprite)
    return;
  }

  var source = [
   {name: "rope", x: 71, y: 76, rect: new Rectangle(253, 447,  21, 63)},
   {name: "base1", x: 84, y: 75, rect: new Rectangle(277, 447,  82, 21)},
   {name: "base2", x: 158, y: 88, rect: new Rectangle(253, 513,  21, 246)},
   {name: "base3", x: 88, y: 324, rect: new Rectangle(277, 471,  126, 15)},

   {name: "head", x: 46, y: 131, rect: new Rectangle(277, 489,  64, 63)},
   {name: "body", x: 68, y: 180, rect: new Rectangle(344, 489,  38, 52)},

   {name: "rightArm", x: 77, y: 192, rect: new Rectangle(385, 489,  7, 28)},
   {name: "leftArm", x: 87, y: 190, rect: new Rectangle(395, 489,  7, 32)},

   {name: "rightLeg", x: 75, y: 228, rect: new Rectangle(344, 544,  12, 35)},
   {name: "leftLeg", x: 93, y: 228, rect: new Rectangle(359, 544,  10, 32)},

   {name: "rightEye", x: 62, y: 165, rect: new Rectangle(277, 555,  12, 7)},
   {name: "leftEye", x: 81, y: 161, rect: new Rectangle(292, 555,  16, 7)},

   {name: "mouth", x: 74, y: 172, rect: new Rectangle(277, 565,  11, 7)},
   {name: "hair", x: 47, y: 134, rect: new Rectangle(277, 582,  65, 104)},
  ];

  // Body Sprites Object
  this._bodySprites = {};
  // Get Sheet Bitmap
  var bitmap = this.sheetBitmap();
  // Go Through Sources
  for (var i = 0; i < source.length; i++) {
    // Get Data From Source
    var data = source[i];
    // Create Sprite
    var sprite = new Sprite(bitmap);
    // If Index is less than blackletter index
    if (i < $gameParty._blackLetterIndex) {
      // Set Sprite Frame
      sprite.setFrame(data.rect.x, data.rect.y, data.rect.width, data.rect.height);
    } else {
      // Set Sprite Frame
      sprite.setFrame(data.rect.x, data.rect.y, 0, 0);
    };
    // Set Sprite Position
    sprite.y = data.y; sprite.x = data.x;
    // Set Source Rect
    sprite._srcRect = data.rect;
    // Set Index
    sprite._letterIndex = i;
    // Set Data
    this._bodySprites[data.name] = sprite;
    // Add Sprite to Body Sprite container
    this._bodySpriteContainer.addChild(sprite);
  };
};
//=============================================================================
// * Refresh
//=============================================================================
Window_OmoHangmanBody.prototype.refresh = function() {
  // Clear Contents
  this.contents.clear();
};
//=============================================================================
// * Frame Update
//=============================================================================
Window_OmoHangmanBody.prototype.update = function() {
  // Super Call
  Window_Base.prototype.update.call(this);
  // Update Blackletter index
  this.updateBlackLetterIndex();
  // Update Body Animations
  this.updateBodyAnimations();
};
//=============================================================================
// * Update Blackletter Index
//=============================================================================
Window_OmoHangmanBody.prototype.updateBlackLetterIndex = function() {
  // If Animation Delay is more than 0
  if (this._anim.part === null && this._animationDelay > 0) {
    // Decrease Animation Delay
    this._animationDelay--;
    return;
  };
  // Get Index
  var index = $gameParty._blackLetterIndex;
  // If Index is less than letter sprites length
  if (index < this._letterSprites.length) {
    // Get Animation
    var anim = this._anim;
    // If Animation part is null
    if (anim.part === null) {
      // Get Part
      var part = Object.keys(this._bodySprites)[index];
      // Setup Animation
      let dur = part === "mouth" ? 2 : 20
      this._anim = {part: part, duration: dur}
      // Increase Blackletter index
      $gameParty._blackLetterIndex++;
      // Set Animation Delay
      this._animationDelay = 30;
    };
  };
};
//=============================================================================
// * Update Body Animations
//=============================================================================
Window_OmoHangmanBody.prototype.updateBodyAnimations = function() {
  // Get Animation
  var anim = this._anim;
  // If Animation Part Exists
  if (anim.part) {
    // Get Sprite
    var sprite = this._bodySprites[anim.part];
    // Get Letter Sprite
    var letterSprite = this._letterSprites[sprite._letterIndex];
    // Get Duration
    var d = anim.duration;
    // Animation Part switch case
    switch (anim.part) {
      case 'rope':
      case 'base2':
      case 'rightArm':
      case 'leftArm':
      case 'rightLeg':
      case 'leftLeg':
      case 'head':
      case 'body':
      case 'hair':
        sprite.height = (sprite.height * (d - 1) + sprite._srcRect.height) / d;
        sprite.width = sprite._srcRect.width;
      break;
      case 'base1':
      case 'base3':
      case 'rightEye':
      case 'leftEye':
      case 'mouth':
        sprite.height = sprite._srcRect.height;
        sprite.width = (sprite.width * (d - 1) + sprite._srcRect.width) / d;
      break;
    };
    // If letter sprite exists
    if (letterSprite) {
      // Set Letter Sprite Opacity
      letterSprite.opacity = (letterSprite.opacity * (d - 1) + 255) / d;
    };
    if(anim.duration >= 20) {
      AudioManager.playSe({name: "SE_chalk", volume: 60, pitch:Math.randomInt(80) + 70, pan: 30})
    }
    // Decrease Duration
    anim.duration--;
    // Set Animation part to null if finished
    if (anim.duration <= 0) { anim.part = null; anim.duration = 1; };
  };
};




//=============================================================================
// ** Sprite_OmoBlackletter
//-----------------------------------------------------------------------------
// This sprite is for showing blackletters in the hangman menu.
//=============================================================================
function Sprite_OmoBlackletter() { this.initialize.apply(this, arguments); }
Sprite_OmoBlackletter.prototype = Object.create(Sprite.prototype);
Sprite_OmoBlackletter.prototype.constructor = Sprite_OmoBlackletter;
//=============================================================================
// * Object Initialization
//=============================================================================
Sprite_OmoBlackletter.prototype.initialize = function(letter = "") {
  // Super Call
  Sprite.prototype.initialize.call(this);
  // Set Centered anchor
  this.anchor.set(0.5, 0.5);
  // Set Letter
  this._letter = letter;
  // Setup Bitmap
  this.setupBitmap();
  // Set Default Flip Direction
  this._flipDirection = 0;
};
//=============================================================================
// * Setup Bitmap
//=============================================================================
Sprite_OmoBlackletter.prototype.setupBitmap = function() {
  // If Letter is empty
  if (this._letter === "") {
    // Set Bitmap
    this.bitmap = new Bitmap(32, 32);
    this.bitmap.fillRect(1, 30, 27, 2, 'rgba(255, 255, 255, 1)');
  } else {
    // Set Bitmap
    this.bitmap = ImageManager.loadSystem('Blackletters_menu');
    // Get Index
    var index = this._letter.charCodeAt(0) - 65;
    var bx = (index % 5) * 32
    var by = Math.floor(index / 5) * 32
    this.setFrame(bx, by, 32, 32);
  };
};
//=============================================================================
// * Setup Flip
//=============================================================================
Sprite_OmoBlackletter.prototype.setupFlip = function(duration = 15, times = 1) {
  this._flipDirection = -1;
  this._flipDuration = duration;
  this._flipTimes = times;
  this._baseFlipDuration = duration
};
//=============================================================================
// * Frame Update
//=============================================================================
Sprite_OmoBlackletter.prototype.update = function() {
  // Super Call
  Sprite.prototype.update.call(this);
  // If Flip Direction is not 0
  if (this._flipDirection !== 0) {
    var d = this._flipDuration
    // If Duration is more than 0
    if (d > 0) {
      // Set Scale
      this.scale.x  = (this.scale.x  * (d - 1) + this._flipDirection)  / d;
      // Decrease Flip Duration
      this._flipDuration--
      // IF Flip Duration is 0 or less and flip times is more than 0
      if (this._flipDuration <= 0) {
        if (this._flipTimes > 0) {
          // Swap Flip Direction
          this._flipDirection = this._flipDirection === -1 ? 1 : -1;
          this._flipDuration = this._baseFlipDuration;
          // Decrease Flip Times
          this._flipTimes--;
        } else {
          // Set Flip Direction to none
          this._flipDirection = 0;
        }
      };
    };
  }
};
