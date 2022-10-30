//=============================================================================
// TDS Message Save & Load
// Version: 1.0
//=============================================================================
// Add to Imported List
var Imported = Imported || {} ; Imported.TDS_OmoriSaveLoad = true;
// Initialize Alias Object
var _TDS_ = _TDS_ || {} ; _TDS_.OmoriSaveLoad = _TDS_.OmoriSaveLoad || {};
//=============================================================================
 /*:
 * @author TDS
 * @plugindesc
 * Combo Skills port from ACE.
 *
 *
 */
//=============================================================================



Game_Actor.prototype.faceSaveLoad = function() {
  var actor = this.actor();
  // When changing these the .png should not be required.
  switch (actor.id) {
    case 1: // Omori
    return "01_OMORI_BATTLE";
    case 2: // Aubrey
    return "02_AUBREY_BATTLE";
    case 3: // Kel
    return "03_KEL_BATTLE";
    case 4: // Hero
    return "04_HERO_BATTLE";
    case 8: // Omori
    return "01_FA_OMORI_BATTLE";
    case 9: // Aubrey
    return "02_FA_AUBREY_BATTLE";
    case 10: // Kel
    return "03_FA_KEL_BATTLE";
    case 11: // Hero
    return "04_FA_HERO_BATTLE";
    default:
      return "default_face_image_here"; // if ther is one?
  }
};

Game_Actor.prototype.faceSaveLoadIndex = function() {
  var actor = this.actor();
  // When changing these the .png should not be required.
  switch (actor.id) {
    case 1: // Omori
    return 0;
    case 2: // Aubrey
    return 0;
    case 3: // Kel
    return 0;
    case 4: // Hero
    return 0;
    default:
      return 0;
  }
};


//=============================================================================
// ** DataManager
//-----------------------------------------------------------------------------
// The static class that manages the database and game objects.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriSaveLoad.DataManager_makeSavefileInfo = DataManager.makeSavefileInfo;
//=============================================================================
// * Make Save File Information
//=============================================================================
DataManager.makeSavefileInfo = function() {
  // Get Original Info
  var info = _TDS_.OmoriSaveLoad.DataManager_makeSavefileInfo.call(this);
  // Get Leader
  var actor = $gameParty.leader();
  info.actorData = {name: actor.name(), level: actor.level, faceName: actor.faceSaveLoad(), faceIndex: actor.faceSaveLoadIndex()};
  info.chapter = $gameVariables.value(23);
  info.location = $gameMap.displayName();
  // Return Info
  return info;
};



//=============================================================================
// ** Game_Interpreter
//-----------------------------------------------------------------------------
// The interpreter for running event commands.
//=============================================================================
// * Call Save Menu
//=============================================================================
Game_Interpreter.prototype.callSaveMenu = function(save = true, load = true) {
  // Call Save Menu
  SceneManager.push(Scene_OmoriFile);
  SceneManager._nextScene.setup(save, load);
};



//=============================================================================
// ** Scene_OmoriFile
//-----------------------------------------------------------------------------
// This scene is used to handle saving & loading.
//=============================================================================
function Scene_OmoriFile() { this.initialize.apply(this, arguments); }
Scene_OmoriFile.prototype = Object.create(Scene_Base.prototype);
Scene_OmoriFile.prototype.constructor = Scene_OmoriFile;
//=============================================================================
// * Object Initialization
//=============================================================================
Scene_OmoriFile.prototype.initialize = function() {
  this._imageReservationId = 'file';
  // Super Call
  Scene_Base.prototype.initialize.call(this);
  // Save Index
  this._saveIndex = -1;
  // If Can Select Flag is true
  this._canSelect = false;
  // Set Load Success Flag
  this._loadSuccess = false;
  // Set Save & Load Flags
  this._canSave = true; this._canLoad = true;
};
//=============================================================================
// * Initialize Atlas Lists
//=============================================================================
Scene_OmoriFile.prototype.initAtlastLists = function() {
  // Super Call
  Scene_Base.prototype.initAtlastLists.call(this);
};
//=============================================================================
// * Load Reserved Bitmaps
//=============================================================================
Scene_OmoriFile.prototype.loadReservedBitmaps = function() {
  // Super Call
  Scene_Base.prototype.loadReservedBitmaps.call(this);
  // Go through save files
  for (var i = 1; i < 5; i++) {
    // Get Save Info
    const info = DataManager.loadSavefileInfo(i);
    // If Information Exists
    if (info) {
      // Get Actor Data
      const actor = info.actorData;
      // Reserve Face Image
      ImageManager.reserveFace(actor.faceName, actor.faceIndex, this._imageReservationId);
    };
  }

  ImageManager.reserveSystem('faceset_states', 0, this._imageReservationId);
  ImageManager.reserveParallax('polaroidBG_BS_sky', 0, this._imageReservationId);
};
//=============================================================================
// * Terminate
//=============================================================================
Scene_OmoriFile.prototype.setup = function(save, load) {
  // Set Save & Load Flags
  this._canSave = save; this._canLoad = load;
};
//=============================================================================
// * Terminate
//=============================================================================
Scene_OmoriFile.prototype.terminate = function() {
  Scene_Base.prototype.terminate.call(this);
  if (this._loadSuccess) {
    $gameSystem.onAfterLoad();
  };
};
//=============================================================================
// * Create
//=============================================================================
Scene_OmoriFile.prototype.create = function() {
  // Super Call
  Scene_Base.prototype.create.call(this);
  // Create Background
  this.createBackground();
  this.createCommandWindow();
  this.createfileWindows();
  // Create Prompt Window
  this.createPromptWindow();
};
//=============================================================================
// * Create Background
//=============================================================================
Scene_OmoriFile.prototype.createBackground = function() {
  // Create Background Sprite
  this._backgroundSprite = new TilingSprite();
  this._backgroundSprite.bitmap = ImageManager.loadParallax('SAVE_MENU_BG');
  this._backgroundSprite.move(0, 0, Graphics.width, Graphics.height);
  this.addChild(this._backgroundSprite);

  // let centerWidth = 42
  // let bitmap = new Bitmap(Graphics.width, Graphics.height);
  // bitmap.fillRect(0, 0, centerWidth, bitmap.height, 'rgba(255, 0, 0, 1)');
  // bitmap.fillRect(bitmap.width - centerWidth, 0, centerWidth, bitmap.height, 'rgba(255, 0, 0, 1)');

  // this._centerSprite = new Sprite(bitmap);
  // this.addChild(this._centerSprite);
};
//=============================================================================
// * Create Command Window
//=============================================================================
Scene_OmoriFile.prototype.createCommandWindow = function() {
  // Create Command Window
  this._commandWindow = new Window_OmoriFileCommand();
  this._commandWindow.setupFile(this._canSave, this._canLoad);
  this._commandWindow.setHandler('ok', this.onCommandWindowOk.bind(this));
  this._commandWindow.setHandler('cancel', this.onCommandWindowCancel.bind(this));
  this.addChild(this._commandWindow);
};
//=============================================================================
// * Create File Windows
//=============================================================================
Scene_OmoriFile.prototype.createfileWindows = function() {
  // Initialize File Windows Array
  this._fileWindows = [];

  let sx = this._commandWindow.x + this._commandWindow.width + 1;
  // Iterate 3 times
  for (var i = 0; i < 6; i++) {
    // Create Window
    var win = new Window_OmoriFileInformation(i);
    win.x = sx;
    win.y = 28 + (i * (win.height + 1))
    // Set Window
    this._fileWindows[i] = win;
    this.addChild(win);
  };
};
//=============================================================================
// * Create Prompt Window
//=============================================================================
Scene_OmoriFile.prototype.createPromptWindow = function() {
  // Create Prompt Window
  this._promptWindow = new Window_OmoriFilePrompt();
  // Set Handlers
  this._promptWindow.setHandler('ok', this.onPromptWindowOk.bind(this));
  this._promptWindow.setHandler('cancel', this.onPromptWindowCancel.bind(this));
  this._promptWindow.close();
  this._promptWindow.openness = 0;
  this._promptWindow.deactivate();
  this.addChild(this._promptWindow);
};
//=============================================================================
// * Frame Update
//=============================================================================
Scene_OmoriFile.prototype.update = function() {
  // Super Call
  Scene_Base.prototype.update.call(this);
  // Update Background
  this.updateBackground();
  // Update Select Input
  if (this._canSelect) { this.updateSelectInput(); };

  // if (Input.isTriggered('control')) {

  // //   this.onSavefileOk();

  //   for (var i = 0; i < this._fileWindows.length; i++) {
  //     // Set Window
  //     this._fileWindows[i].refresh();
  //   };

  // };
};
//=============================================================================
// * Get Save File ID
//=============================================================================
Scene_OmoriFile.prototype.savefileId = function() { return this._saveIndex + 1; };
//=============================================================================
// * Check if out of bounds
//=============================================================================
Scene_OmoriFile.prototype.isOutOfBounds = function() {
  let index = this._saveIndex;
  let win = this._fileWindows[index];
  if(win.y + win.height > Graphics.boxHeight) {return -28}
  if(index === 0) {
    if(win.y < 28) {return 28} 
  }
  if(win.y < 0) {return 28} 
  return 0;
}
//=============================================================================
// * Update Save Index Cursor
//=============================================================================
Scene_OmoriFile.prototype.updateSaveIndexCursor = function() {
  // Go Through File Windows
  for (var i = 0; i < this._fileWindows.length; i++) {
    // Get Window
    var win = this._fileWindows[i];
    // Set Selected STate
    this._saveIndex === i ? win.select() : win.deselect();
  };
};
//=============================================================================
// * Update Background
//=============================================================================
Scene_OmoriFile.prototype.updateBackground = function() {
  this._backgroundSprite.origin.y += 1;
};
//=============================================================================
// * Update Select Background
//=============================================================================
Scene_OmoriFile.prototype.updateSelectInput = function() {
  // If Ok
  if (Input.isTriggered('ok')) {
    // Call On Select Input Ok
    this.onSelectInputOk();
    return;
  };

  // If Cancel
  if (Input.isTriggered('cancel')) {
    // Play Cancel Sound
    SoundManager.playCancel();
    // On Select Input Cancel
    this.onSelectInputCancel();
    return;
  };

  // If Input Is repeated Up
  if (Input.isRepeated('up')) {
    // Play Cursor
    SoundManager.playCursor();
    // If Save index is 0
    if (this._saveIndex === 0) {
      // Set Save Index at the end
      this._saveIndex = this._fileWindows.length-1;
    } else {
      // Decrease Save Index
      this._saveIndex = (this._saveIndex - 1) % this._fileWindows.length;
    }
    // Update Save Index Cursor
    this.updateSaveIndexCursor();
    return;
  };
  // If Input Is repeated Down
  if (Input.isRepeated('down')) {
    // Play Cursor
    SoundManager.playCursor();
    // Increase Save Index
    this._saveIndex = (this._saveIndex + 1) % this._fileWindows.length;
    // Update Save Index Cursor
    this.updateSaveIndexCursor();
    return;
  };
  this.updatePlacement();
};

Scene_OmoriFile.prototype.updatePlacement = function() {
  if(this._saveIndex < 0) {return;}
  let bounds = this.isOutOfBounds();
  if(!bounds) {return;}
  for(let win of this._fileWindows) {
    win.y += bounds;
  }
}
//=============================================================================
// * On Command Window Ok
//=============================================================================
Scene_OmoriFile.prototype.onCommandWindowOk = function() {
  // Set Can select Flag to true
  this._canSelect = true;
  // Set Save Index to 0
  let latestFile = !!this._canSave ? DataManager.lastAccessedSavefileId() : DataManager.latestSavefileId();
  let maxSavefiles = 6;
  this._saveIndex = (latestFile - 1) % maxSavefiles;
  // Update Save Index Cursor
  this.updateSaveIndexCursor();
};
//=============================================================================
// * On Command Window Cancel
//=============================================================================
Scene_OmoriFile.prototype.onCommandWindowCancel = function() {
  // If Previous scene is title screen
  var isTitleScreen = SceneManager.isPreviousScene(Scene_OmoriTitleScreen);
  // Pop Scene
  this.popScene();
  // If Previous scene is tile scene
  if (isTitleScreen) {
    // Prepare Title Scene
    SceneManager._nextScene.prepare(1);
  }
};
//=============================================================================
// * On Select Input Ok
//=============================================================================
Scene_OmoriFile.prototype.onSelectInputOk = function() {
  // Get Index
  var index = this._commandWindow.index();
  // Get Save File ID
  var saveFileid = this.savefileId();
  // If Save
  if (index === 0) {
    // If File Exists
    if (StorageManager.exists(saveFileid)) {
      // Show Prompt Window
      this.showPromptWindow(LanguageManager.getMessageData("XX_BLUE.Omori_Save_Load").overwrite_file);
      // Set Can select Flag to false
      this._canSelect = false;
    } else {
      // Save The Game
      this.saveGame();
    };
  } else {
    // If File Exists
    if (StorageManager.exists(saveFileid)) {
      // Show Prompt Window
      this.showPromptWindow(LanguageManager.getMessageData("XX_BLUE.Omori_Save_Load").load_file);
      // Set Can select Flag to false
      this._canSelect = false;
    } else {
      // Play Buzzer Sound
      SoundManager.playBuzzer();
    };
  };
};
//=============================================================================
// * On Select Input Cancel
//=============================================================================
Scene_OmoriFile.prototype.onSelectInputCancel = function() {
  // Set Can select Flag to false
  this._canSelect = false;
  // Set Save Index to -1
  this._saveIndex = -1;
  // Update Save Index Cursor
  this.updateSaveIndexCursor();
  // Activate Command Window
  this._commandWindow.activate();
};
//=============================================================================
// * Show Prompt Window
//=============================================================================
Scene_OmoriFile.prototype.showPromptWindow = function(text) {
  // Set Prompt Window Text
  this._promptWindow.setPromptText(text);
  // Show Prompt Window
  this._promptWindow.open();
  this._promptWindow.select(1);
  this._promptWindow.activate();
};
//=============================================================================
// * On Prompt Window Ok
//=============================================================================
Scene_OmoriFile.prototype.onPromptWindowOk = function() {
  // Get Index
  var index = this._commandWindow.index();
  // If Save
  if (index === 0) {
    // Save The Game
    this.saveGame();
    // Close Prompt Window
    this._promptWindow.close();
    this._promptWindow.deactivate();
    // Set Can select Flag to true
    this._canSelect = true;
  } else {
    // Load Game
    this.loadGame();
  };
};
//=============================================================================
// * On Prompt Window Cancel
//=============================================================================
Scene_OmoriFile.prototype.onPromptWindowCancel = function() {
  // Close Prompt Window
  this._promptWindow.close();
  this._promptWindow.deactivate();
  // Set Can select Flag to true
  this._canSelect = true;
};
//=============================================================================
// * Save Game
//=============================================================================
Scene_OmoriFile.prototype.saveGame = function() {
  // On Before Save
  $gameSystem.onBeforeSave();
  // Get Save File ID
  var saveFileid = this.savefileId();
  // Get File Window
  var fileWindow = this._fileWindows[this._saveIndex];
  // Save Game
  if (DataManager.saveGame(saveFileid)) {
    SoundManager.playSave();
    StorageManager.cleanBackup(saveFileid);
    fileWindow.refresh();
  } else {
    SoundManager.playBuzzer();
  };
  // Deactivate Prompt Window
  this._promptWindow.deactivate();
  this._promptWindow.close();
  // Set Can select Flag to false
  this._canSelect = true;
  // Update Save Index Cursor
  this.updateSaveIndexCursor();
};
//=============================================================================
// * Load Game
//=============================================================================
Scene_OmoriFile.prototype.loadGame = function() {
  if (DataManager.loadGame(this.savefileId())) {

    SoundManager.playLoad();
    this.fadeOutAll();
    // Reload Map if Updated
    if ($gameSystem.versionId() !== $dataSystem.versionId) {
      $gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
      $gamePlayer.requestMapReload();
    };
    SceneManager.goto(Scene_Map);
    this._loadSuccess = true;
    // Close Prompt Window
    this._promptWindow.close();
    this._promptWindow.deactivate();
  } else {
    // Play Buzzer
    SoundManager.playBuzzer();
    // Close Prompt Window
    this._promptWindow.close();
    this._promptWindow.deactivate();
    // Set Can select Flag to true
    this._canSelect = true;
  };
};



//=============================================================================
// ** Window_OmoriFileInformation
//-----------------------------------------------------------------------------
// The window for showing picture items for sorting
//=============================================================================
function Window_OmoriFileInformation() { this.initialize.apply(this, arguments); };
Window_OmoriFileInformation.prototype = Object.create(Window_Base.prototype);
Window_OmoriFileInformation.prototype.constructor = Window_OmoriFileInformation;
//=============================================================================
// * Object Initialization
//=============================================================================
Window_OmoriFileInformation.prototype.initialize = function(index) {
  // Set Index
  this._index = index;
  // Super Call
  Window_Base.prototype.initialize.call(this, 0, 0, this.windowWidth(), this.windowHeight());
  // Create Cursor Sprite
  this.createCursorSprite();
  // Refresh
  this.refresh();
  // Deselect
  this.deselect();
};
//=============================================================================
// * Settings
//=============================================================================
Window_OmoriFileInformation.prototype.standardPadding = function() { return 4}
Window_OmoriFileInformation.prototype.windowWidth = function () { return 382 + 54; };
Window_OmoriFileInformation.prototype.windowHeight = function() { return 142; }
//=============================================================================
// * Create Cursor Sprite
//=============================================================================
Window_OmoriFileInformation.prototype.createCursorSprite = function() {
  // Create Cursor Sprite
  this._cursorSprite = new Sprite_WindowCustomCursor();
  this._cursorSprite.x = 10//-32;
  this._cursorSprite.y = 20;
  this.addChild(this._cursorSprite);
};
//=============================================================================
// * Select
//=============================================================================
Window_OmoriFileInformation.prototype.select = function() {
  this._cursorSprite.visible = true;
  this.contentsOpacity = 255;
};
//=============================================================================
// * Deselect
//=============================================================================
Window_OmoriFileInformation.prototype.deselect = function() {
  this._cursorSprite.visible = false;
  this.contentsOpacity = 100;
};
//=============================================================================
// * Refresh
//=============================================================================
Window_OmoriFileInformation.prototype.refresh = function() {
  // Clear Contents
  this.contents.clear();
  // Get Color
  var color = 'rgba(255, 255, 255, 1)';
  // Get ID
  var id = this._index + 1;
  var valid = DataManager.isThisGameFile(id);
  var info = DataManager.loadSavefileInfo(id);

  // Draw Lines
  this.contents.fillRect(0, 29, this.contents.width, 3, color);
  for (var i = 0; i < 3; i++) {
    var y = 55 + (i * 25)
    this.contents.fillRect(113, y, this.contents.width - 117, 1, color);
  };


  // Draw File
  this.contents.fontSize = LanguageManager.getMessageData("XX_BLUE.Window_OmoriFileInformation").refresh_contents_fontsize;
  let loc_position = LanguageManager.getMessageData("XX_BLUE.Window_OmoriFileInformation").file_position
  this.contents.drawText(LanguageManager.getMessageData("XX_BLUE.Omori_Save_Load").file.format(id), loc_position[0], loc_position[1], 100, this.contents.fontSize);
  // If Valid
  if (valid) {
    loc_position = LanguageManager.getMessageData("XX_BLUE.Window_OmoriFileInformation").refresh_drawText_position;
    let chap = LanguageManager.getMessageData("XX_BLUE.Chapter_Names")[info.chapter]
    if(!chap) {
      chap = info.chapter
    }
    this.contents.drawText(chap, loc_position[0], loc_position[1], this.contents.width, this.contents.fontSize);
    this.contents.fontSize = 28;

    let backBitmap = ImageManager.loadSystem('faceset_states');
    let width = backBitmap.width / 4;
    let height = backBitmap.height / 5;
    // this.contents.blt(backBitmap, 0, 0, width, height, 0, 34, width + 10, height);
    this.contents.blt(backBitmap, 0, 0, width, height, 1, 33);
    // Get Actor
    var actor = info.actorData
    // Draw Actor Face
    let bit = ImageManager.loadFace(actor.faceName);
    bit.addLoadListener(() => this.drawFace(actor.faceName, actor.faceIndex, -2, this.contents.height - Window_Base._faceHeight + 7, Window_Base._faceWidth, height - 2));
    // Draw Actor Name
    this.contents.fontSize = 24;
    this.contents.drawText(actor.name, 118, 30, 100, 24);
    // Draw Level
    loc_position = LanguageManager.getMessageData("XX_BLUE.Window_OmoriFileInformation").level_position;
    this.contents.drawText(LanguageManager.getMessageData("XX_BLUE.Omori_Save_Load").level, loc_position[0], loc_position[1], 100, 24);
    this.contents.drawText(actor.level, loc_position[0], loc_position[1], 70, 24, 'right');
    // Draw Total PlayTime
    loc_position = LanguageManager.getMessageData("XX_BLUE.Window_OmoriFileInformation").playtime_position;
    this.contents.drawText(LanguageManager.getMessageData("XX_BLUE.Omori_Save_Load").playtime, 118, 55, 200, 24);
    this.contents.drawText(info.playtime, loc_position[0], loc_position[1], 100, 24);
    // Draw Location
    this.contents.drawText(LanguageManager.getMessageData("XX_BLUE.Omori_Save_Load").location, 118, 80, 200, 24);
    this.contents.drawText(info.location, 205, 80, 210, 24, 'right');
  };

  // Draw Border
  this.contents.fillRect(102, 32, 3, 102, 'rgba(255, 255, 255, 1)')
  this.contents.fillRect(0, 29, 108, 3, 'rgba(255, 255, 255, 1)')
};




//=============================================================================
// ** Window_OmoriFileCommand
//-----------------------------------------------------------------------------
// The window for selecting a command on the menu screen.
//=============================================================================
function Window_OmoriFileCommand() { this.initialize.apply(this, arguments); }
Window_OmoriFileCommand.prototype = Object.create(Window_Command.prototype);
Window_OmoriFileCommand.prototype.constructor = Window_OmoriFileCommand;
//=============================================================================
// * Object Initialization
//=============================================================================
Window_OmoriFileCommand.prototype.initialize = function() {
  // Super Call
  Window_Command.prototype.initialize.call(this, 42, 28);
  // Setup File
  this.setupFile(true, true);
};
//=============================================================================
// * Settings
//=============================================================================
Window_OmoriFileCommand.prototype.isUsingCustomCursorRectSprite = function() { return true; };
Window_OmoriFileCommand.prototype.lineHeight = function () { return 24; };
Window_OmoriFileCommand.prototype.windowWidth = function () { return 119; };
Window_OmoriFileCommand.prototype.windowHeight = function () { return 64; };
Window_OmoriFileCommand.prototype.standardPadding = function () { return 4; };
Window_OmoriFileCommand.prototype.numVisibleRows = function () { return 2; };
Window_OmoriFileCommand.prototype.maxCols = function () { return 1; };
Window_OmoriFileCommand.prototype.customCursorRectYOffset = function() { return 5; }
Window_OmoriFileCommand.prototype.customCursorRectTextXOffset = function() { return 40; }
//=============================================================================
// * Setup File
//=============================================================================
Window_OmoriFileCommand.prototype.setupFile = function (save, load) {
  // Set Save & Load Flags
  this._canSave = save; this._canLoad = load;
  if(!!this._canSave) {this.select(0);}
  else if(!!this._canLoad) {this.select(1)}
  // Refresh
  this.refresh();
};
//=============================================================================
// * Make Command List
//=============================================================================
Window_OmoriFileCommand.prototype.makeCommandList = function () {
  const loc = LanguageManager.getMessageData("XX_BLUE.Omori_Save_Load")
  this.addCommand(loc.save_command, 'save', this._canSave);
  this.addCommand(loc.load_command, 'load', this._canLoad);
};




//=============================================================================
// ** Window_OmoriFilePrompt
//-----------------------------------------------------------------------------
// The window for selecting a command on the menu screen.
//=============================================================================
function Window_OmoriFilePrompt() { this.initialize.apply(this, arguments); }
Window_OmoriFilePrompt.prototype = Object.create(Window_Command.prototype);
Window_OmoriFilePrompt.prototype.constructor = Window_OmoriFilePrompt;
//=============================================================================
// * Object Initialization
//=============================================================================
Window_OmoriFilePrompt.prototype.initialize = function() {
  // Super Call
  Window_Command.prototype.initialize.call(this, 0, 0);
  // Center Window
  this.x = (Graphics.width - this.width) / 2;
  this.y = (Graphics.height - this.height) / 2;
  // Create Cover Sprite
  this.createCoverSprite();
};
//=============================================================================
// * Create Background
//=============================================================================
Window_OmoriFilePrompt.prototype.createCoverSprite = function() {
  var bitmap = new Bitmap(Graphics.width, Graphics.height);
  bitmap.fillAll('rgba(0, 0, 0, 0.5)')
  this._coverSprite = new Sprite(bitmap);
  this._coverSprite.x = -this.x;
  this._coverSprite.y = -this.y;
  this.addChildAt(this._coverSprite, 0);
};
//=============================================================================
// * Openness
//=============================================================================
Object.defineProperty(Window.prototype, 'openness', {
  get: function() { return this._openness; },
  set: function(value) {
      if (this._openness !== value) {
        this._openness = value.clamp(0, 255);
        this._windowSpriteContainer.scale.y = this._openness / 255;
        this._windowSpriteContainer.y = this.height / 2 * (1 - this._openness / 255);

        if (this._coverSprite) { this._coverSprite.opacity = this._openness; };
      }
  },
  configurable: true
});
//=============================================================================
// * Settings
//=============================================================================
Window_OmoriFilePrompt.prototype.isUsingCustomCursorRectSprite = function() { return true; };
Window_OmoriFilePrompt.prototype.lineHeight = function () { return 22; };
Window_OmoriFilePrompt.prototype.windowWidth = function () { return 220; };
Window_OmoriFilePrompt.prototype.windowHeight = function () { return 70 + 20; };
Window_OmoriFilePrompt.prototype.standardPadding = function () { return 4; };
Window_OmoriFilePrompt.prototype.numVisibleRows = function () { return 2; };
Window_OmoriFilePrompt.prototype.maxCols = function () { return 1; };
Window_OmoriFilePrompt.prototype.customCursorRectXOffset = function() { return 50; }
Window_OmoriFilePrompt.prototype.customCursorRectYOffset = function() { return 33; }
Window_OmoriFilePrompt.prototype.customCursorRectTextXOffset = function() { return 80; }
Window_OmoriFilePrompt.prototype.customCursorRectTextYOffset = function() { return 28; }
//=============================================================================
// * Setup File
//=============================================================================
Window_OmoriFilePrompt.prototype.setPromptText = function (text) {
  // Set Prompt Text
  this._promptText = text;
  // Refresh Contents
  this.refresh();
};
//=============================================================================
// * Make Command List
//=============================================================================
Window_OmoriFilePrompt.prototype.makeCommandList = function () {
  this.addCommand(LanguageManager.getMessageData("XX_SYSTEM.message_10").text, 'ok');
  this.addCommand(LanguageManager.getMessageData("XX_SYSTEM.message_11").text, 'cancel');
};
//=============================================================================
// * Refresh
//=============================================================================
Window_OmoriFilePrompt.prototype.refresh = function () {
  // Super Call
  Window_Command.prototype.refresh.call(this);
  this.contents.drawText(this._promptText, 0, 0, this.contents.width, 24, 'center');
}
