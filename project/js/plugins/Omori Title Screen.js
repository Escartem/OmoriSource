//=============================================================================
// TDS Omori Title Screen
// Version: 1.0
//=============================================================================
// Add to Imported List
var Imported = Imported || {} ; Imported.TDS_OmoriTitleScreen = true;
// Initialize Alias Object
var _TDS_ = _TDS_ || {} ; _TDS_.OmoriTitleScreen = _TDS_.OmoriTitleScreen || {};
//=============================================================================
 /*:
 * @plugindesc
 * Title screen for Omori
 *
 * @author TDS
 *
 */
//=============================================================================



_TDS_.OmoriTitleScreen.Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
  Scene_Base.prototype.start.call(this);
  SoundManager.preloadImportantSounds();
  if (DataManager.isBattleTest()) {
      DataManager.setupBattleTest();
      SceneManager.goto(Scene_Battle);
  } else if (DataManager.isEventTest()) {
      DataManager.setupEventTest();
      SceneManager.goto(Scene_Map);
  } else {
      this.checkPlayerLocation();
      DataManager.setupNewGame();
      SceneManager.goto(Scene_OmoriTitleScreen);
      Window_TitleCommand.initCommandPosition();
  }
  this.updateDocumentTitle();
};


//=============================================================================
// ** Scene_OmoriTitleScreen
//-----------------------------------------------------------------------------
// The scene class of the title screen.
//=============================================================================
function Scene_OmoriTitleScreen() { this.initialize.apply(this, arguments); }
Scene_OmoriTitleScreen.prototype = Object.create(Scene_BaseEX.prototype);
Scene_OmoriTitleScreen.prototype.constructor = Scene_OmoriTitleScreen;
//=============================================================================
// * Initialize Object
//=============================================================================
Scene_OmoriTitleScreen.prototype.initialize = function() {
  // Set Image reservation Id
  this._imageReservationId = 'title';
  // Super Call
  Scene_BaseEX.prototype.initialize.call(this);
  // Get Atlas Bitmap
  this._atlasBitmap = ImageManager.loadAtlas('Omori_TitleScreen');
  // World Type 0: Normal, 1: Dark space, 2: Red Space
  let tryFile = DataManager.readFromFile("File");
  let tryTitleData = DataManager.readFromFile("TITLEDATA");
  if(!!tryTitleData) {this._worldType = parseInt(tryTitleData);}
  else if(!!tryFile) {this._worldType = parseInt(tryFile);}
  if(typeof this._worldType === "undefined") {this._worldType = 0;}
  if(![0,444,445,446,447,448,449].contains(this._worldType)) {this._worldType = 0;}
  // Set Command Active Flag
  this._commandActive = false;
  // Options Active Flag
  this._optionsActive = false;
  // Set Command Index Flag
  this._commandIndex = 0;
  // Instant Intro Flag
  this._instantIntro = false;
  // Determine if can continue
  this._canContinue = false;
  // Check if Save files exist
  for (var i = 1; i < 7; i++) {
    if (StorageManager.exists(i)) { this._canContinue = true; break; }
  };
  this._instantIntro = true;
};


//=============================================================================
// * Prepare Scene
//=============================================================================
Scene_OmoriTitleScreen.prototype.prepare = function(index, instant = true) {
  // Set Command Index
  this._commandIndex = index;
  // Set Instant Intro Flag
  this._instantIntro = instant;
};
//=============================================================================
// * Initialize Atlas Lists
//=============================================================================
Scene_OmoriTitleScreen.prototype.initAtlastLists = function() {
  // Super Call
  Scene_BaseEX.prototype.initAtlastLists.call(this);
  // Add Required Atlas
  this.addRequiredAtlas('Omori_TitleScreen')
  // Reserve Images
  ImageManager.reserveParallax('Black', 0, this._imageReservationId);
  ImageManager.reserveParallax('polaroidBG_BS_sky', 0, this._imageReservationId);
  ImageManager.reservePicture('Blackspace_polaroidBG_FA_day', 0, this._imageReservationId);
  // Load Input Icons
  ImageManager.loadInputIcons();
};
//=============================================================================
// * Create
//=============================================================================
Scene_OmoriTitleScreen.prototype.create = function() {
  // Super Call
  Scene_BaseEX.prototype.create.call(this);


  this.createFilters();
  // Create Background
  this.createBackground();
  // Create Omori Sprite
  this.createOmoriSprite();
  // Create Title Sprites
  this.createTitleSprites();
  // Create Title Commands
  this.createTitleCommands();
  // Create Command Hints
  this.createCommandHints();
  // Create Version Text
  this.createVersionText();
  // Create Options Windows
  this.createOptionWindowsContainer();
  this.createHelpWindow();
  this.createGeneralOptionsWindow();
  this.createAudioOptionsWindow();
  this.createControllerOptionsWindow();
  this.createSystemOptionsWindow();
  this.createExitPromptWindow();
  this.createOptionCategoriesWindow();

  // Update world bitmaps
  this.updateWorldBitmaps();
  this.playBgm();
  this.playBgs();
  // this._backgroundSprite.filters = [this._glitchFilter]
};

Scene_OmoriTitleScreen.prototype.playBgm = function () {
  var name ="user_title";
  /*switch (this._worldType) {
    case 1:
      name = "user_title";
      break;
    case 2:
      name = "user_title";
      break;
    case 3:
      name = "user_title";
      //name = "bs_56_12_2";
      break;
    default:
      name = "user_title";
      break;
  }*/
  if(this._worldType === 449 || this._worldType === 447) {name = "duet_mari"} 
  else if(this._worldType === 448) {name = "AMB_forest"} 
  else if(this._worldType === 446) {name ="user_title";}
  else if(this._worldType === 445) {// Red Space
    name = "bs_listening";
  }
  else if(this._worldType === 444) {
    name = "bs_listening";
  }
  else {name ="user_title";}
  AudioManager.playBgm({name: name, volume: 100, pitch: 100});
};

Scene_OmoriTitleScreen.prototype.playBgs = function() {
  var name;
  var volume;
  if(this._worldType === 445) {// Red Space
    name = "amb_kettle";
    volume = 90;
  }
  else if(this._worldType === 447 || this._worldType === 449) {
    name = "AMB_forest";
    volume = 50;
  }
  if(!name) {return;}
  AudioManager.playBgs({name: name, volume: volume, pitch: 100});
}

//=========================================================
// 12/27 COMMAND HINTS

Scene_OmoriTitleScreen.prototype.createCommandHints = function() {
  this._commandHints = new Sprite(new Bitmap(Math.ceil(Graphics.boxWidth / 2.8), Math.ceil(Graphics.boxHeight / 8)))
  this.addChild(this._commandHints);
  this._commandHints.position.set(Graphics.boxWidth - this._commandHints.width,0);
  this.refreshCommandHints();
  //this._commandHints.bitmap
}

Scene_OmoriTitleScreen.prototype.refreshCommandHints = function() {
  this._commandHints.bitmap.clear();
  let confirm = LanguageManager.languageData().text.System.plugins.optionsMenu.buttonHints["confirm"]
  let cancel = LanguageManager.languageData().text.System.plugins.optionsMenu.buttonHints["cancel"]
  let iconSize = 24;
  let paddingY = 4;
  this._commandHints.bitmap.fontSize = LanguageManager.getMessageData("XX_BLUE.Scene_OmoriTitleScreen").commandHints_fontsize
  this._commandHints.bitmap.drawInputIcon("ok", 0, paddingY);
  let loc_position = LanguageManager.getMessageData("XX_BLUE.Scene_OmoriTitleScreen").commandHints_confirm_position
  this._commandHints.bitmap.drawText(confirm, eval(loc_position[0]), eval(loc_position[1]), this._commandHints.bitmap.width, 16, "left");
  this._commandHints.bitmap.drawInputIcon("escape", iconSize + 15 + this._commandHints.bitmap.measureTextWidth(confirm), paddingY);
  loc_position = LanguageManager.getMessageData("XX_BLUE.Scene_OmoriTitleScreen").commandHints_cancel_position
  this._commandHints.bitmap.drawText(cancel, eval(loc_position[0]), eval(loc_position[1]), this._commandHints.bitmap.width, 16, "left");
}

const _old_omo_menu_options_controls = Window_OmoMenuOptionsControls.prototype.createKeyPromptWindow
Window_OmoMenuOptionsControls.prototype.createKeyPromptWindow = function() {
  _old_omo_menu_options_controls.call(this);
  if(SceneManager._scene instanceof Scene_OmoriTitleScreen) {
    const _old_key_prompt_window_close = this._keyPromptWindow.close;
    this._keyPromptWindow.close = function() {
      _old_key_prompt_window_close.call(this);
      SceneManager._scene.refreshCommandHints();
    }
  }
}

Scene_OmoriTitleScreen.prototype.createVersionText = function() {
  this._gameVersion = new Sprite(new Bitmap(Math.ceil(Graphics.boxWidth / 8), 32))
  this.addChild(this._gameVersion);
  let padding = 4;
  const loc_position = LanguageManager.getMessageData("XX_BLUE.Scene_OmoriTitleScreen").gameVersion_position
  this._gameVersion.position.set(loc_position[0], loc_position[1]);
  this._gameVersion.bitmap.fontSize = LanguageManager.getMessageData("XX_BLUE.Scene_OmoriTitleScreen").gameVersion_fontsize;
  this._gameVersion.bitmap.drawText("V1.0.8", padding ,padding , this._gameVersion.bitmap.width, 16, "left");
}

//=============================================================================
// * Create Background
//=============================================================================
Scene_OmoriTitleScreen.prototype.createBackground = function() {
	// Create Background Sprite
	this._backgroundSprite = new TilingSprite();
	this._backgroundSprite.move(0, 0, Graphics.width, Graphics.height);
  this.addChild(this._backgroundSprite);
  if(this._worldType === 448 || this._worldType === 447 || this._worldType === 449) {this._backgroundSprite.bitmap =   ImageManager.loadParallax('!polaroidBG_FA_day');} 
  else if(this._worldType === 446) {
		var bitmap = new Bitmap(Graphics.width, Graphics.height);
		bitmap.fillAll('rgba(255, 255, 255, 1)');
		this._backgroundSprite.bitmap = bitmap;    
  }
  else if(this._worldType === 445) {// Red Space
    this._backgroundSprite.bitmap = ImageManager.loadParallax('!parallax_black_space');
  }
  else if(this._worldType === 444) {
		var bitmap = new Bitmap(Graphics.width, Graphics.height);
		bitmap.fillAll('rgba(0, 0, 0, 1)');
		this._backgroundSprite.bitmap = bitmap;    
  }
  else if(this._worldType === 0) {
		var bitmap = new Bitmap(Graphics.width, Graphics.height);
		bitmap.fillAll('rgba(255, 255, 255, 1)');
		this._backgroundSprite.bitmap = bitmap;    
  }


	/*if (this._worldType === 0 || this._worldType === 446) { // White Space
		var bitmap = new Bitmap(Graphics.width, Graphics.height);
		bitmap.fillAll('rgba(255, 255, 255, 1)');
		this._backgroundSprite.bitmap = bitmap;
	} else if (this._worldType === 444) { // Black Space
		var bitmap = new Bitmap(Graphics.width, Graphics.height);
		bitmap.fillAll('rgba(0, 0, 0, 1)');
		this._backgroundSprite.bitmap = bitmap;
	} else if (this._worldType === 445) { // Red Space
		// Set Background Bitmap
		this._backgroundSprite.bitmap = ImageManager.loadParallax('!parallax_black_space');
	} else if (this._worldType === 447 || this._worldType == 448) { // Endings
		// Set Background Bitmap
		this._backgroundSprite.bitmap =   ImageManager.loadParallax('!polaroidBG_FA_day');
	};*/
};
//=============================================================================
// * Create Filters
//=============================================================================
Scene_OmoriTitleScreen.prototype.createFilters = function() {
  // Create GLitch Filter
  this._glitchFilter = new PIXI.filters.GlitchFilter();
  this._glitchFilter.fillMode = 2;
  this._glitchFilter.slices = 0;
  this._glitchFilter.seed = 0
  // Initialize Glitch Settings
  this._glitchSettings = {timer: 0, timing: 240, maxTiming: 240, times: 5, world: 2, active: false}
};
//=============================================================================
// * Create Background
//=============================================================================
Scene_OmoriTitleScreen.prototype.createOmoriSprite = function() {
  // Create Omori Sprite
	if (this._worldType != 448) {
		if (this._worldType === 0 || this._worldType === 446) {
			this._omoriSprite = new Sprite(ImageManager.loadPicture('OMO_WS'));
		} else if (this._worldType === 444) {
			this._omoriSprite = new Sprite(ImageManager.loadPicture('OMO_BS'));
		} else if (this._worldType === 445 || this._worldType === 447 || this._worldType === 449) {
      this._omoriSprite = new Sprite(ImageManager.loadPicture('OMO_RS'));
    }
		this._omoriSprite.anchor.set(0.5, 1)
		this._omoriSprite.x = Graphics.width / 2;
		this._omoriSprite.y = Graphics.height;
		this._omoriSprite.opacity = 0;
		this._omoriSprite.setFrame(0, 0, 0, 0);
		this._omoriSprite.filters = [this._glitchFilter];

		this._omoriSprite.visible = this._worldType !== 4;
		this._omoriSprite.filterArea = new PIXI.Rectangle(0, 0, Graphics.width, Graphics.height + Math.floor(Graphics.height / 6));
		this.addChild(this._omoriSprite);
	}
};
//=============================================================================
// * Create Title Sprites
//=============================================================================
Scene_OmoriTitleScreen.prototype.createTitleSprites = function() {
  // Create Title Text Container Sprite
  this._titleTextContainerSprite = new Sprite()
  this._titleTextContainerSprite.x = 167;
  this._titleTextContainerSprite.y = 130;
  this._titleTextContainerSprite.opacity = 0
  this.addChild(this._titleTextContainerSprite);

  // Create Lightbulb Sprite
	if (this._worldType === 0 || this._worldType === 446 || this._worldType === 447 || this._worldType === 448 || this._worldType === 449) {
		this._lightBulbSprite = new Sprite(ImageManager.loadPicture('OMO_BULB_WS'));
	} else if (this._worldType === 444 || this._worldType === 445) {
		this._lightBulbSprite = new Sprite(ImageManager.loadPicture('OMO_BULB_BS'));
	}
  this._lightBulbSprite.x = 120;
  this._lightBulbSprite.y = -2;
  //this._lightBulbSprite.y = 18;
  // this._lightBulbSprite.setFrame(0, 0, 68, 150)
  this._titleTextContainerSprite.addChild(this._lightBulbSprite);

  // Create Lightbulb Sprite
	if (this._worldType === 0 || this._worldType === 446 || this._worldType === 447 || this._worldType === 448 || this._worldType === 449) {
		this._lightBulbLinesSprite = new Sprite(ImageManager.loadPicture('OMO_BULB_WS_LINES'));
	} else if (this._worldType === 444 || this._worldType === 445) {
		this._lightBulbLinesSprite = new Sprite(ImageManager.loadPicture('OMO_BULB_BS_LINES'));
	}
  this._lightBulbLinesSprite.x = 120;
  this._lightBulbLinesSprite.y = 0;
  this._lightBulbLinesSprite.opacity = 0;
  this._lightBulbLinesSprite.setFrame(0, 0, 68, 150)
  this._titleTextContainerSprite.addChild(this._lightBulbLinesSprite);

  // Get String Bitmap
	if (this._worldType === 0 || this._worldType === 446 || this._worldType === 447 || this._worldType === 448 || this._worldType === 449) {
		var string = ImageManager.loadPicture('OMO_STRING_WS');
	} else if (this._worldType === 444 || this._worldType === 445) {
		var string = ImageManager.loadPicture('OMO_STRING_BS');
	}
  // Create Cable Bitmap
  var bitmap = new Bitmap(68, 300);
  bitmap.blt(string, 0, 0, string.width, string.height, 0, 0, string.width, 300)

  // Create Lightbulb cable sprite
  this._lightbulbCableSprite = new Sprite(bitmap)
  this._lightbulbCableSprite.x = this._lightBulbSprite.x;
  this._lightbulbCableSprite.y = -282//-bitmap.height;
  this._titleTextContainerSprite.addChild(this._lightbulbCableSprite);

  // Create Title Text Sprite
	if (this._worldType === 0 || this._worldType === 446 || this._worldType === 447 || this._worldType === 448 || this._worldType === 449) {
		this._titleTextSprite = new Sprite(ImageManager.loadPicture('OMO_TITLE_WS'));
	} else if (this._worldType === 444 || this._worldType === 445) {
		this._titleTextSprite = new Sprite(ImageManager.loadPicture('OMO_TITLE_BS'));
	}
  this._titleTextSprite.opacity = 0;
  this._titleTextContainerSprite.addChild(this._titleTextSprite)
};
//=============================================================================
// * Create Title Commands
//=============================================================================
Scene_OmoriTitleScreen.prototype.createTitleCommands = function() {
  // Initialize Title Comands
  this._titleCommands = [];
  // Text Array
  var textList = LanguageManager.getMessageData("XX_BLUE.Omori_Title_Screen").commands
  // Get Center X Position
  var centerX = Math.floor((Graphics.width - (156 * textList.length)) / 1.8)
  // Go Through Text Array
  for (var i = 0; i < textList.length; i++) {
    // Get Text
    var text = textList[i];
    // Create Window
    var win = new Window_OmoTitleScreenBox(text);
    // Set Wnidow Position
    win.x = centerX + (i * (130 + 39));
    win.y = Graphics.height //(Graphics.height - win.height) - 22
    // Select Window
    if (i === this._commandIndex) { win.select(0)}
    // Add window to title Commands
    this._titleCommands[i] = win;
    this.addChild(win)
  };
  // Set Continue text
  this._titleCommands[1].setText(textList[1], this._canContinue);

};
//=============================================================================
// * Create Options Windows Container
//=============================================================================
Scene_OmoriTitleScreen.prototype.createOptionWindowsContainer = function() {
  // Create Help Window Container
  this._optionsWindowsContainer = new Sprite();
  this._optionsWindowsContainer.x = 10;
  this._optionsWindowsContainer.y = -406;
  this._optionsWindowsContainer.opacity = 255;
  this.addChild(this._optionsWindowsContainer);
};
//=============================================================================
// * Create Help Window
//=============================================================================
Scene_OmoriTitleScreen.prototype.createHelpWindow = function() {
  // Create Help Window
  this._helpWindow = new Window_OmoMenuOptionsHelp();
  this._helpWindow.x = 0;
  this._helpWindow.y = Graphics.height - this._helpWindow.height - 10;
  this._optionsWindowsContainer.addChild(this._helpWindow);
};
//=============================================================================
// * Create Option Categories Window
//=============================================================================
Scene_OmoriTitleScreen.prototype.createOptionCategoriesWindow = function() {
  // Create Options Categories Window
  this._optionCategoriesWindow = new Window_OmoMenuOptionsCategory();
  this._optionCategoriesWindow.deactivate();

  this._optionCategoriesWindow.setHandler('ok', this.onCategoryOk.bind(this));
  this._optionCategoriesWindow.setHandler('cancel', this.onCategoryCancel.bind(this));
  this._optionsWindowsContainer.addChild(this._optionCategoriesWindow);

  // Get Option Windows
  var optionWindows = this.optionWindows();
  // Set Option Categories Window Option Windows
  this._optionCategoriesWindow._optionWindows = optionWindows;
  // Set Help Window for Option Windows
  for (var i = 0; i < optionWindows.length; i++) {
    optionWindows[i].y = this._optionCategoriesWindow.y + this._optionCategoriesWindow.height;
    optionWindows[i]._helpWindow = this._helpWindow;
  };
  // Set Help Window Position
  this._helpWindow.y = optionWindows[0].y + optionWindows[0].height;
  // Call Update Help
  this._optionCategoriesWindow.callUpdateHelp();
};
//=============================================================================
// * Create General Options Window
//=============================================================================
Scene_OmoriTitleScreen.prototype.createGeneralOptionsWindow = function() {
  // Create General Options Window
  this._generalOptionsWindow = new Window_OmoMenuOptionsGeneral();
  this._generalOptionsWindow.setHandler('cancel', this.onOptionWindowCancel.bind(this));
  this._generalOptionsWindow.deactivate()
  // Set Help Window Position
  this._helpWindow.y = this._generalOptionsWindow.y + this._generalOptionsWindow.height;

  // this._generalOptionsWindow.visible = false;
  this._optionsWindowsContainer.addChild(this._generalOptionsWindow);
};
//=============================================================================
// * Create Audio Options Window
//=============================================================================
Scene_OmoriTitleScreen.prototype.createAudioOptionsWindow = function() {
  // Create Audio Options Window
  this._audioOptionsWindow = new Window_OmoMenuOptionsAudio();
  this._audioOptionsWindow.setHandler('cancel', this.onOptionWindowCancel.bind(this));
  this._audioOptionsWindow.visible = false;
  this._optionsWindowsContainer.addChild(this._audioOptionsWindow);
};
//=============================================================================
// * Create Controller Options Window
//=============================================================================
Scene_OmoriTitleScreen.prototype.createControllerOptionsWindow = function() {
  // Create Control Options Window
  this._controlOptionsWindow = new Window_OmoMenuOptionsControls();
  this._controlOptionsWindow.setHandler('cancel', this.onOptionWindowCancel.bind(this));
  this._controlOptionsWindow.visible = false;
  this._optionsWindowsContainer.addChild(this._controlOptionsWindow);
};
//=============================================================================
// * Create System Options Window
//=============================================================================
Scene_OmoriTitleScreen.prototype.createSystemOptionsWindow = function() {
  // Create System Option Window
  this._systemOptionsWindow = new Window_OmoMenuOptionsSystem();
  this._systemOptionsWindow.setHandler('restoreConfig', () => {
    ConfigManager.restoreDefaultConfig();
    this._controlOptionsWindow.makeOptionsList()
    this._generalOptionsWindow.makeOptionsList();
    this._audioOptionsWindow.makeOptionsList();
    
    this._controlOptionsWindow.refresh()
    this._controlOptionsWindow.select(0);
    this._generalOptionsWindow.refresh();
    this._generalOptionsWindow.select(0);
    this._audioOptionsWindow.refresh();
    this._systemOptionsWindow.refresh();
    this._systemOptionsWindow.activate();
    Input.clear();
  });
  this._systemOptionsWindow.setHandler('cancel', this.onOptionWindowCancel.bind(this));
  this._systemOptionsWindow.setHandler('exit', this.startExitPrompt.bind(this));  
  this._optionsWindowsContainer.addChild(this._systemOptionsWindow);
};

Scene_OmoriTitleScreen.prototype.createExitPromptWindow = function() {
  // Create Exit Prompt Window
  this._exitPromptWindow = new Window_OmoMenuOptionsExitPromptWindow();
  this._exitPromptWindow.x = (Graphics.width - this._exitPromptWindow.width) / 2;
  this._exitPromptWindow.y = (Graphics.height - this._exitPromptWindow.height) / 2  
  this._exitPromptWindow.setHandler('yes', this.onExitPromptYes.bind(this));
  this._exitPromptWindow.setHandler('cancel', this.onExitPromptCancel.bind(this));
  this.addChild(this._exitPromptWindow);
};

Scene_OmoriTitleScreen.prototype.startExitPrompt = function() {
  this._exitPromptWindow.select(1);
  this._exitPromptWindow.open();
  this._exitPromptWindow.activate();
};
//=============================================================================
// * On Exit Prompt Window Cancel
//=============================================================================
Scene_OmoriTitleScreen.prototype.onExitPromptCancel = function() {
  this._exitPromptWindow.deactivate();  
  this._exitPromptWindow.close();  
  this._systemOptionsWindow.activate();  
}
//=============================================================================
// * On Exit Prompt Window Yes
//=============================================================================
Scene_OmoriTitleScreen.prototype.onExitPromptYes = function() {
  // Fadeout All
  this.fadeOutAll();
  // Exit the game
  SceneManager.exit();
};
//=
//=============================================================================
// * Get All Option Windows
//=============================================================================
Scene_OmoriTitleScreen.prototype.optionWindows = function() {
  return [this._generalOptionsWindow, this._audioOptionsWindow, this._controlOptionsWindow, this._systemOptionsWindow]
}
//=============================================================================
// * Initialize Frame Animations
//=============================================================================
Scene_OmoriTitleScreen.prototype.initFrameAnimations = function() {
  // Initialize Frame Animations
	if (this._omoriSprite){
		this._frameAnimations = [
			{sprite: this._omoriSprite, rect: new Rectangle(0, 0, 306, 350), frames: [0, 1, 2], frameIndex: 0, delayCount:  0, delay: 20, active: true},
			{sprite: this._lightBulbLinesSprite, rect: new Rectangle(0, 0, 68, 150), frames: [0, 1, 2, 1], frameIndex: 0, delayCount:  0, delay: 15, active: true}
		]
	} else {
		this._frameAnimations = [
			{sprite: this._lightBulbLinesSprite, rect: new Rectangle(0, 0, 68, 150), frames: [0, 1, 2, 1], frameIndex: 0, delayCount:  0, delay: 15, active: true}
		]
	}
  // Update Frame animations
  this.updateFrameAnimations();
};
//=============================================================================
// * Start
//=============================================================================
Scene_OmoriTitleScreen.prototype.start = function() {
  // Super Call
  Scene_BaseEX.prototype.start.call(this);
  // Initialize Frame Animations
  this.initFrameAnimations();
  // If Instant Intro Flag is true
  if (this._instantIntro) {
    this._titleTextContainerSprite.opacity = 255;
    this._titleTextContainerSprite.y = -30;
    this._titleTextSprite.opacity = 255;
    if (this._omoriSprite) this._omoriSprite.opacity = 255;
    this._lightBulbLinesSprite.opacity = 255;
    for (var i = 0; i < this._titleCommands.length; i++) {
      var win = this._titleCommands[i];
      win.y = (Graphics.height - win.height) - 15;
      win.opacity = 255;
      win.contentsOpacity = 255;
    };
    // Activate Commands
    this._commandActive = true;
	// Activate Bulb Light animation
	if (this._omoriSprite) this._frameAnimations[1].active = true;
	else this._frameAnimations[0].active = true;
    // Activate Glitch
  //  this._glitchSettings.active = this._worldType === 3;
  this._glitchSettings.active = this._worldType === 445
    return;
  };

  this.queue(function() {
    // Set Duration
    var duration = 60;
    var obj = this._titleTextContainerSprite;
    var data = { obj: obj, properties: ['opacity'], from: {opacity: obj.opacity}, to: {opacity: 255}, durations: {opacity: duration}}
    data.easing = Object_Movement.linearTween;
    this.move.startMove(data);
    if (this._omoriSprite) this._frameAnimations[1].active = true;
	else this._frameAnimations[0].active = true;
  }.bind(this))

  // Wait
  this.queue('setWaitMode', 'movement');
  // Wait
  this.queue('wait', 15);

  this.queue(function() {
    // Set Duration
    var duration = 60;
    var obj = this._titleTextSprite;
    var data = { obj: obj, properties: ['opacity'], from: {opacity: obj.opacity}, to: {opacity: 255}, durations: {opacity: duration}}
    data.easing = Object_Movement.linearTween;
    this.move.startMove(data);

    // Set Duration
    var duration = 60;
    var obj = this._lightBulbLinesSprite;
    var data = { obj: obj, properties: ['opacity'], from: {opacity: obj.opacity}, to: {opacity: 255}, durations: {opacity: duration}}
    data.easing = Object_Movement.linearTween;
    this.move.startMove(data);

  }.bind(this))

  // Wait
  this.queue('setWaitMode', 'movement');
  // Wait
  this.queue('wait', 30);

  this.queue(function() {
    // Set Duration
    var duration = 60;
    var obj = this._titleTextContainerSprite;
    var data = { obj: obj, properties: ['y'], from: {y: obj.y}, to: {y: -30}, durations: {y: duration}}
    data.easing = Object_Movement.linearTween;
    this.move.startMove(data);
  }.bind(this))

  // Wait
  this.queue('setWaitMode', 'movement');
  // Wait
  this.queue('wait', 30);
	if (this._omoriSprite) {
		this.queue(function() {
			// Set Duration
			var duration = 60;
			var obj = this._omoriSprite;
			var data = { obj: obj, properties: ['opacity'], from: {opacity: obj.opacity}, to: {opacity: 255}, durations: {opacity: duration}}
			data.easing = Object_Movement.linearTween;
			this.move.startMove(data);
		}.bind(this))

		// Wait
		this.queue('wait', 30);
	}


  for (var i = 0; i < this._titleCommands.length; i++) {
    // console.log(i)
    this.queue(function(index) {
      // Set Duration
      var duration = 30;
      var obj = this._titleCommands[index];
      obj.select(-1)
      var data = { obj: obj, properties: ['y', 'opacity', 'contentsOpacity'], from: {y: obj.y, opacity: obj.opacity, contentsOpacity: obj.contentsOpacity}, to: {y: (Graphics.height - obj.height) - 22, opacity: 255, contentsOpacity: 255}, durations: {y: duration, opacity: duration, contentsOpacity: duration}}
      data.easing = Object_Movement.easeOutCirc;
      this.move.startMove(data);
    }.bind(this, i))
    // Wait
    this.queue('wait', 15);
  };

  // console.log(i)
  this.queue(function() {
    // Activate Glitch
    this._glitchSettings.active =  this._worldType === 445
    // Activate Commands
    this._commandActive = true;
    // Update Command Window Selection
    this.updateCommandWindowSelection();
  }.bind(this, i))

};
//=============================================================================
// * Frame Update
//=============================================================================
Scene_OmoriTitleScreen.prototype.update = function() {
  Scene_BaseEX.prototype.update.call(this);
  // Update Frame Animations
  this.updateFrameAnimations();
  // Update Command Input
  this.updateCommandInput();
  // Update Effects
  this.updateEffects();
  // Move Bkacground Sprite
  this._backgroundSprite.origin.x += 0.5;
  this._backgroundSprite.origin.y -= 0.5;
};
//=============================================================================
// * Update Bitmaps
//=============================================================================
Scene_OmoriTitleScreen.prototype.updateWorldBitmaps = function(world = this._worldType, temp = false) {
  // Set Title Bitmap
  var titleTextBitmap = 'OMO_TITLE_WS';
  var lightbulbBitmap = 'OMO_BULB_WS';
  var stringBitmap = 'OMO_STRING_WS';
  var omoriBitmap = 'OMO_WS';
  var linesBitmap = 'OMO_BULB_WS_LINES';
  // Set World
  switch (world) {
	case 0: // White space
		break;
	case 446: // White space
		break;
	case 2: // Faraway
		omoriBitmap = 'OMO_RS'
		titleTextBitmap = 'OMO_TITLE_BS';
		lightbulbBitmap = 'OMO_BULB_BS';
		stringBitmap =  'OMO_STRING_BS';
		linesBitmap = 'OMO_BULB_BS_LINES';
    break;
  case 3: // Red Space Omori
    titleTextBitmap = 'OMO_TITLE_BS';
    lightbulbBitmap = 'OMO_BULB_BS';
    stringBitmap = 'OMO_STRING_BS';
    omoriBitmap = 'OMO_WS';
    linesBitmap = 'OMO_BULB_BS_LINES';
    break;
	case 444: // Black space
		omoriBitmap = 'OMO_BS';
		titleTextBitmap = 'OMO_TITLE_BS';
		lightbulbBitmap = 'OMO_BULB_BS';
		stringBitmap =  'OMO_STRING_BS';
		linesBitmap = 'OMO_BULB_BS_LINES'
		break;
	case 445: // Red space
		omoriBitmap = 'OMO_RS';
		titleTextBitmap = 'OMO_TITLE_BS';
		lightbulbBitmap = 'OMO_BULB_BS';
		stringBitmap =  'OMO_STRING_BS';
		linesBitmap = 'OMO_BULB_BS_LINES'
    break;
  case 449:
	case 447: // Ending Good
		omoriBitmap = 'OMO_RS';
		titleTextBitmap = 'OMO_TITLE_WS';
		lightbulbBitmap = 'OMO_BULB_WS';
		stringBitmap =  'OMO_STRING_WS';
		linesBitmap = 'OMO_BULB_WS_LINES'
		break;
	case 448: // Ending Bad
		titleTextBitmap = 'OMO_TITLE_WS';
		lightbulbBitmap = 'OMO_BULB_WS';
		stringBitmap =  'OMO_STRING_WS';
		linesBitmap = 'OMO_BULB_WS_LINES'
		break;
	};
	if (temp) {
	//    titleTextBitmap = 'OMO_TITLE_BS';
	//    lightbulbBitmap = 'OMO_BULB_BS';
	//    stringBitmap =  'OMO_STRING_BS';
	//    linesBitmap = 'OMO_BULB_BS_LINES'
	}

  if (this._omoriSprite) this._omoriSprite.bitmap = ImageManager.loadPicture(omoriBitmap)
  this._titleTextSprite.bitmap = ImageManager.loadPicture(titleTextBitmap)
  this._lightBulbSprite.bitmap = ImageManager.loadPicture(lightbulbBitmap);
  this._lightBulbLinesSprite.bitmap = ImageManager.loadPicture(linesBitmap);
  // Set Omori Sprite Width & Height
  if (this._omoriSprite) this._omoriSprite.width = 306;
  if (this._omoriSprite) this._omoriSprite.height = 350;
  // Let Lines Width & Height
  this._lightBulbLinesSprite.width = 68;
  this._lightBulbLinesSprite.height =  150;
  // Get String Bitmap
  var string = ImageManager.loadPicture(stringBitmap);
  // Create Cable Bitmap
  var bitmap = this._lightbulbCableSprite.bitmap;
  bitmap.clear();
  bitmap.blt(string, 0, 0, string.width, string.height, 0, 0, string.width, 300);

};
//=============================================================================
// * Update Effects
//=============================================================================
Scene_OmoriTitleScreen.prototype.updateEffects = function() {
  // Get Glitch Data
  var glitch = this._glitchSettings;
  // If glitch is active
  if (glitch.active) {
    // Reduce Glitch Timing
    glitch.timing--;
    // If glitch timing is 0 or less
    if (glitch.timing <= 0) {
      // Reduce glitch timer
      glitch.timer--
      // If glitch timer is 0 or less
      if (glitch.timer <= 0) {
        // Reset Glitch Timer
        glitch.timer = 3;
        if (glitch.times % 2 == 0) {
          this._glitchFilter.seed = 0;
          this._glitchFilter.slices = 0
          this._glitchFilter.direction = 0
        } else {
          this._glitchFilter.seed = Math.randomInt(100);
          this._glitchFilter.slices = 10 + Math.randomInt(10)
          this._glitchFilter.direction = Math.randomInt(10) * Math.sin(Graphics.frameCount);
        };
        // Reduce Amount of times to glitch
        glitch.times--;
        // If glitch times is 0 or less
        if (glitch.times <= 0) {
          // Set Glitch world
          glitch.world = glitch.world === 3 ? 2 : 3;
          // Update world bitmaps
          this.updateWorldBitmaps(glitch.world, true)
          // Reset Filter
          this._glitchFilter.seed = 0;
          this._glitchFilter.slices = 0
          this._glitchFilter.direction = 0
          // Reset Glitch Time and timing
          glitch.times = 5;
          glitch.timing = glitch.maxTiming;
        };
      };
    };
  };

return

};
//=============================================================================
// * Update Command Input
//=============================================================================
Scene_OmoriTitleScreen.prototype.updateCommandInput = function() {



  // If Command is Active
  if (this._commandActive && !this.move.isMoving()) {
    // this._commandIndex
    if (Input.isRepeated('left')) {
      // If Command index is more than 0
      if (this._commandIndex > 0) {
        // Decrease Index
        this._commandIndex--;
        AudioManager.playSe({name: "sys_cursor1", pan: 0, pitch: 100, volume: 90});
        // Update Command Window Selection
        this.updateCommandWindowSelection();
      };
    };
    // If Input is right
    if (Input.isRepeated('right')) {
      // If Command index is less than title commands length
      if (this._commandIndex < this._titleCommands.length-1) {
        // Increase Index
        this._commandIndex++;
        AudioManager.playSe({name: "sys_cursor1", pan: 0, pitch: 100, volume: 90});
        // Update Command Window Selection
        this.updateCommandWindowSelection();
      };
    };

    // If Input Trigger ok
    if (Input.isTriggered('ok')) {

      switch (this._commandIndex) {
        case 0: // New Game
          AudioManager.playSe({name: "SE_load", pan: 0, pitch: 100, volume: 90});
          this.commandNewGame();
          this._commandActive = false;
          this._optionsActive = false;
        break;
        case 1: // Continue

          if (this._canContinue) {
            AudioManager.playSe({name: "SYS_select", pan: 0, pitch: 100, volume: 90});
            this.commandContinue();
            this._commandActive = false;
            this._optionsActive = false;
          } else {
            SoundManager.playBuzzer();
          };
        break;
        case 2: // Options
          AudioManager.playSe({name: "SYS_select", pan: 0, pitch: 100, volume: 90});
          this.commandOptions();
          this._optionsActive = true;
          this._commandActive = false;
        break;
      }
    }
  };
};
//=============================================================================
// * Update Command Window Selection
//=============================================================================
Scene_OmoriTitleScreen.prototype.updateCommandWindowSelection = function() {
  // Go Through Title Commands
  for (var i = 0; i < this._titleCommands.length; i++) {
    // Get Window
    var win = this._titleCommands[i]
    // Select Window
    if (i === this._commandIndex) {
      // Select Title Command Window
      win.select(0)
    } else {
      // Deselect Title Command Window
      win.deselect();
    };
  };
};
//=============================================================================
// * Frame Update
//=============================================================================
Scene_OmoriTitleScreen.prototype.updateFrameAnimations = function() {
  // Go Through Animations
  for (var i = 0; i < this._frameAnimations.length; i++) {
    // Get Animation
    var anim = this._frameAnimations[i];
    // If Animation is active
    if (anim.active) {
      // If Animation Delay count is 0 or less
      if (anim.delayCount <= 0) {
        // Get Rectangle
        var rect = anim.rect;
        // Increase Current Frame
        anim.frameIndex = (anim.frameIndex + 1) % anim.frames.length;
        // Get Frame
        var frame = anim.frames[anim.frameIndex]
        // Set Animation Sprite Frame
        anim.sprite.setFrame(frame * rect.width, rect.y, rect.width, rect.height);
        // Reset Delay Count
        anim.delayCount = anim.delay;
      } else {
        // Decrease Delay Count
        anim.delayCount--
      };
    };
  };
};
//=============================================================================
// * Command new game
//=============================================================================
Scene_OmoriTitleScreen.prototype.commandNewGame = function() {
  DataManager.setupNewGame();
  this.fadeOutAll();

  //ConfigManager.load();
  SceneManager.goto(Scene_Map);
};
//=============================================================================
// * Command Continue
//=============================================================================
Scene_OmoriTitleScreen.prototype.commandContinue = function() {
  // Call Save Menu
  SceneManager.push(Scene_OmoriFile);
  SceneManager._nextScene.setup(false, true);
};
//=============================================================================
// * Options Command
//=============================================================================
Scene_OmoriTitleScreen.prototype.commandOptions = function() {


  this.queue(function() {
    for (var i = 0; i < this._titleCommands.length; i++) {
      // Set Duration
      var duration = 15;
      var obj = this._titleCommands[i];
      var data = { obj: obj, properties: ['y', 'opacity', 'contentsOpacity'], from: {y: obj.y, opacity: obj.opacity, contentsOpacity: obj.contentsOpacity}, to: {y: Graphics.height, opacity: 255, contentsOpacity: 255}, durations: {y: duration, opacity: duration, contentsOpacity: duration}}
      data.easing = Object_Movement.easeOutCirc;
      this.move.startMove(data);
    };
    // Set Duration
    var duration = 35;
    var obj = this._optionsWindowsContainer;
    var data = { obj: obj, properties: ['y', 'opacity'], from: {y: obj.y, opacity: obj.opacity}, to: {y: 37, opacity: 255}, durations: {y: duration, opacity: duration}}
    data.easing = Object_Movement.easeOutCirc;
    this.move.startMove(data);
  }.bind(this))

  // Wait
  this.queue('setWaitMode', 'movement');

  this.queue(function() {
    // Activate Option Category Window
    this._optionCategoriesWindow.activate();
    this._controlOptionsWindow.refresh();
  }.bind(this))
};
//=============================================================================
// * On Option Category Ok
//=============================================================================
Scene_OmoriTitleScreen.prototype.onCategoryOk = function() {
  // Get Category Window
  var categoryWindow = this.optionWindows()[this._optionCategoriesWindow.index()];
  // If Category Window Exists
  if (categoryWindow) {
    categoryWindow.activate();
    categoryWindow.select(0);
    categoryWindow.refresh()
  } else {
    // Activate Categories Window
    this._optionCategoriesWindow.activate();
  };
};
//=============================================================================
// * On Option Category Cancel
//=============================================================================
Scene_OmoriTitleScreen.prototype.onCategoryCancel = function() {
  // Save Configuration
  ConfigManager.save();

  this.queue(function() {
    for (var i = 0; i < this._titleCommands.length; i++) {
      // Set Duration
      var duration = 15;
      var obj = this._titleCommands[i];
      var data = { obj: obj, properties: ['y', 'opacity', 'contentsOpacity'], from: {y: obj.y, opacity: obj.opacity, contentsOpacity: obj.contentsOpacity}, to: {y: (Graphics.height - obj.height) - 22, opacity: 255, contentsOpacity: 255}, durations: {y: duration, opacity: duration, contentsOpacity: duration}}
      data.easing = Object_Movement.easeOutCirc;
      this.move.startMove(data);
    };
    // Set Duration
    var duration = 25;
    var obj = this._optionsWindowsContainer;
    var data = { obj: obj, properties: ['y', 'opacity'], from: {y: obj.y, opacity: obj.opacity}, to: {y: -406, opacity: 255}, durations: {y: duration, opacity: duration}}
    data.easing = Object_Movement.easeOutCirc;
    this.move.startMove(data);
  }.bind(this))

  // Wait
  this.queue('setWaitMode', 'movement');

  this.queue(function() {
    this._commandActive = true;
  }.bind(this))
};
//=============================================================================
// * On Option Window Cancel
//=============================================================================
Scene_OmoriTitleScreen.prototype.onOptionWindowCancel = function() {
  // Get Category Window
  var categoryWindow = this.optionWindows()[this._optionCategoriesWindow.index()];
  // If Category Window Exists
  if (categoryWindow) {
    categoryWindow.select(0);
    categoryWindow.refresh();
  };
  // Clear Help Window Text
  this._helpWindow.clear()
  // Activate Categories Window
  this._optionCategoriesWindow.activate();
};



//=============================================================================
// ** Window_OmoTitleScreenBox
//-----------------------------------------------------------------------------
// This window is used in the title screen to display commands.
//=============================================================================
function Window_OmoTitleScreenBox() { this.initialize.apply(this, arguments); }
Window_OmoTitleScreenBox.prototype = Object.create(Window_Selectable.prototype);
Window_OmoTitleScreenBox.prototype.constructor = Window_OmoTitleScreenBox;
//=============================================================================
// * Object Initialization
//=============================================================================
Window_OmoTitleScreenBox.prototype.initialize = function(text = '') {
  // Set Set
  this._text = text;
  // Super Call
  Window_Selectable.prototype.initialize.call(this, 0, 0, 160 - 30, 30);
  // BlueMoon - Fix Title Screen Spacing:
  this.width = this.textWidth(this._text) + this.standardPadding() * 6;
  this.createContents();
  // Set Opacity
  this.opacity = 0;
  this.contentsOpacity = 0;
  // Set Enabled Flag
  this._enabled = true;
  // Refresh
  this.refresh();
  // Activate
  this.activate();
};
//=============================================================================
// * Standard Padding
//=============================================================================
Window_OmoTitleScreenBox.prototype.standardPadding = function() { return 4; }
Window_OmoTitleScreenBox.prototype.isUsingCustomCursorRectSprite = function() { return true; }
Window_OmoTitleScreenBox.prototype.customCursorRectXOffset = function() { return -35; }
Window_OmoTitleScreenBox.prototype.customCursorRectYOffset = function() { return -7; }
//=============================================================================
// * Set Text
//=============================================================================
Window_OmoTitleScreenBox.prototype.setText = function(text, enabled = true) {
  // If Text has changed
  if (text !== this._text || enabled !== this._enabled) {
    // Set Enabled Flag
    this._enabled = enabled;
    // Set text
    this._text = text;
    // Redraw Window
    this.refresh();
  };
};
//=============================================================================
// * Refresh Arrows
//=============================================================================
Window_OmoTitleScreenBox.prototype._refreshArrows = function() { };
//=============================================================================
// * Refresh
//=============================================================================
Window_OmoTitleScreenBox.prototype.refresh = function() {
  Window_Selectable.prototype.refresh.call(this);
  // Clear Contents
  this.contents.clear();
  this.contents.fontSize = LanguageManager.getMessageData("XX_BLUE.Window_OmoTitleScreenBox").refresh_contents_fontsize;
  // Set Paint Opacity based on enabled flag
  this.changePaintOpacity(this._enabled);
  // Draw Text
  // this.drawText(this._text, 40, -13, this.contents.width);
  const loc_position = LanguageManager.getMessageData("XX_BLUE.Window_OmoTitleScreenBox").refresh_drawText_position;
  this.drawText(this._text, loc_position[0], loc_position[1], this.contents.width, 'center');
};



















// Scene_BaseEX.prototype.updateWaitCount = function() { return false };
// Scene_BaseEX.prototype.updateWaitMode = function() { return false; };



// //=============================================================================
// // * Start Move
// //=============================================================================
// Object_Movement.prototype.startMove = function(data, uniq) {
//   // Set Unique Flag to true
//   if (uniq === undefined) { uniq = true; }
//   // If Unique Flag is true
//   if (uniq) { this.removeMoveWithObject(data.obj); }


//   // If Data has durations for tweening
//   if (data.durations || data.duration) {
//     // Set Default Easing
//     var defaultEasing = data.easing ? data.easing : Object_Movement.linearTween;
//     // Initialize Times
//     data.times = {};
//     // Initialize Easings
//     data.easings = data.easings || {};
//     // Get Duration Keys
//     var durations = Object.keys(data.durations);
//     // Set Initial Times
//     for (var i = 0; i < durations.length; i++) {
//       data.durations[durations[i]] = 1;

//       // Get Property
//       var p = durations[i];
//       // Set Initial Time
//       data.times[p] = 0
//       // Adjust To coordinates
//       data.to[p] = (data.to[p] - data.from[p]);
//       if (!data.easings[p]) {
//         data.easings[p] = defaultEasing;
//       };
//     };
//   } else {
//     // Initialize Easings
//     data.easings = data.easings || {};
//   };
//   // Add Data to list
//   this._list.push(data);
// };














  // this._lightBulbSprite.y = 0;
  // this._lightBulbSprite.setFrame(277, 702, 68, 150)

  // this._viewingSprite = new Sprite(ImageManager.loadPicture('OMO_TITLE_1'))
  // this._viewingSprite.x = 250;
  // this.addChild(this._viewingSprite)

  // this._centerSprite = new Sprite(new Bitmap(1, Graphics.height))
  // this._centerSprite.x = Graphics.width / 2
  // this._centerSprite.bitmap.fillAll('rgba(255, 0, 0, 1)')
  // this.addChild(this._centerSprite)


  // // this._titleTextSprite.opacity = 255;
  // // this._titleTextContainerSprite.opacity = 255

  // // Face Mask
  // this._textMask = new PIXI.Graphics();
  // // this._textMask.beginFill(0xFFF);
  // // this._textMask.drawCircle(0, 0, 100)
  // // // this._textMask.drawRect(0, 0, 100, 200);
  // // this._textMask.endFill();

  // this._expandLightCount = 0;

  // this._titleTextSprite.mask = this._textMask

  // this._textMask.x = 155 - 10
  // this._textMask.y = 110

  // this._titleTextContainerSprite.addChild(this._textMask)
