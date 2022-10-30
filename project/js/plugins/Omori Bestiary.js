//=============================================================================
// TDS Omori Bestiary
// Version: 1.0
//=============================================================================
// Add to Imported List
var Imported = Imported || {} ; Imported.TDS_OmoriBestiary = true;
// Initialize Alias Object
var _TDS_ = _TDS_ || {} ; _TDS_.OmoriBestiary = _TDS_.OmoriBestiary || {};
//=============================================================================
 /*:
 * @plugindesc
 * Bestiary for Omori.
 *
 * @author TDS
 *
 */
//=============================================================================



//=============================================================================
// ** Game_Party
//-----------------------------------------------------------------------------
// The game object class for the party. Information such as gold and items is
// included.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriBestiary.Game_Party_initialize = Game_Party.prototype.initialize;
//=============================================================================
// * Object Initialize
//=============================================================================
Game_Party.prototype.initialize = function() {
  // Run Original Function
  _TDS_.OmoriBestiary.Game_Party_initialize.call(this);
  // Create List of Defeated Enemies
  this._defeatedEnemies = [];
};
//=============================================================================
// * Add Defeated Enemy
//=============================================================================
Game_Party.prototype.addDefeatedEnemy = function(id) {
  // Of Defeated Enemies array does not contain ID
  if (!this._defeatedEnemies.contains(id)) {
    // Add ID to defeated enemies array
    this._defeatedEnemies.push(id);
  };
  let allEnemies = Object.keys(LanguageManager.getTextData('Bestiary', 'Information')).map(Number);
  if(allEnemies.every(enemyId => this._defeatedEnemies.contains(enemyId))) {
    $gameSystem.unlockAchievement("FOES_FILED"); // Unlock complete bestiary achievement;
  }
};



//=============================================================================
// ** Game_Enemy
//-----------------------------------------------------------------------------
// The game object class for an enemy.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriBestiary.Game_Enemy_die = Game_Enemy.prototype.die;
_TDS_.OmoriBestiary.Game_Enemy_appear = Game_Enemy.prototype.appear;
_TDS_.OmoriBestiary.Game_Enemy_onBattleStart = Game_Enemy.prototype.onBattleStart 
//=============================================================================
// * Die
//=============================================================================
Game_Enemy.prototype.die = function() {
  // Run Original Fucntion
  _TDS_.OmoriBestiary.Game_Enemy_die.call(this);
  // Add Defeated Enemy
  $gameParty.addDefeatedEnemy(this.baseId());
};
//=============================================================================
// * Appear
//=============================================================================
Game_Enemy.prototype.appear = function() {
  // Run Original Function
  _TDS_.OmoriBestiary.Game_Enemy_appear.call(this);
  // Add Defeated Enemy
  $gameParty.addDefeatedEnemy(this.baseId());  
};
//=============================================================================
// * On battle start processing
//=============================================================================
Game_Enemy.prototype.onBattleStart = function() {
  // Run Original Function
  _TDS_.OmoriBestiary.Game_Enemy_onBattleStart.call(this);
  // If enemy has appeared
  if (this.isAppeared()) {
    // Add Defeated Enemy
    $gameParty.addDefeatedEnemy(this.baseId());      
  };
};



//=============================================================================
// ** Scene_OmoriBestiary
//-----------------------------------------------------------------------------
// This scene is used to show the bestiary.
//=============================================================================
function Scene_OmoriBestiary() { this.initialize.apply(this, arguments);}
Scene_OmoriBestiary.prototype = Object.create(Scene_BaseEX.prototype);
Scene_OmoriBestiary.prototype.constructor = Scene_OmoriBestiary;
//=============================================================================
// * Object Initialization
//=============================================================================
Scene_OmoriBestiary.prototype.initialize = function() {
  // Set Image reservation id
  this._imageReservationId = 'bestiary';
  // Create Enemy Object
  this._enemy = new Game_Enemy(1, 0, 0);
  // Super Call
  Scene_BaseEX.prototype.initialize.call(this);
};
//=============================================================================
// * Initialize Atlas Lists
//=============================================================================
Scene_OmoriBestiary.prototype.initAtlastLists = function() {
  // Super Call
  Scene_BaseEX.prototype.initAtlastLists.call(this);

  // // Go Through List of Entries
  // for (let [id, obj] of Object.entries(LanguageManager.getTextData('Bestiary', 'Information'))) {
  //   // Reserve Battleback
  //   ImageManager.reserveBattleback1(obj.background.name, 0, this._imageReservationId);
  //   // Get Filename
  //   var name = $dataEnemies[Number(id)].sideviewBattler[0];
  //   // If name
  //   if (name) { ImageManager.reserveSvActor(name, 0, this._imageReservationId); };
  // }
};
//=============================================================================
// * Start
//=============================================================================
Scene_OmoriBestiary.prototype.start = function() {
  // Super Call
  Scene_BaseEX.prototype.start.call(this);
  // Start Fade in
  this.startFadeIn(this.slowFadeSpeed(), false);
};
//=============================================================================
// * Create
//=============================================================================
Scene_OmoriBestiary.prototype.create = function() {
  // Super Call
  Scene_BaseEX.prototype.create.call(this);

  this.createEnemyWindow();
  this.createEnemyNameWindow();
  this.createEnemyListWindow();

  // Create Enemy Text Window
  this._enemyTextWindow = new Window_OmoBestiaryEnemyText();
  this._enemyTextWindow.y = Graphics.height - this._enemyTextWindow.height
  this._enemyTextWindow.x = Graphics.width - this._enemyTextWindow.width;
  this._enemyTextWindow.visible = false;
  this.addChild(this._enemyTextWindow)

  this.onListChangeUpdate();
};
//=============================================================================
// * Create Enemy Window
//=============================================================================
Scene_OmoriBestiary.prototype.createEnemyWindow = function() {
  // Create Enemy Window
  this._enemyWindow = new Window_OmoBestiaryEnemy(this._enemy);
  this.addChild(this._enemyWindow);
};
//=============================================================================
// * Create Enemy Name Window
//=============================================================================
Scene_OmoriBestiary.prototype.createEnemyNameWindow = function() {
  // Create Enemy Name Window
  this._enemyNameWindow = new Window_OmoBestiaryEnemyName();
  this._enemyNameWindow.x = Graphics.width - this._enemyNameWindow.width;
  this.addChild(this._enemyNameWindow)
};
//=============================================================================
// * Create Enemy List Window
//=============================================================================
Scene_OmoriBestiary.prototype.createEnemyListWindow = function() {
  // Create Enemy List Window
  this._enemyListWindow = new Window_OmoBestiaryEnemyList();
  this._enemyListWindow.x = Graphics.width - this._enemyListWindow.width;
  this._enemyListWindow.y = Graphics.height - this._enemyListWindow.height;
  this._enemyListWindow.setHandler('ok', this.onEnemyListOk.bind(this))
  this._enemyListWindow.setHandler('cancel', this.popScene.bind(this))
  this._enemyListWindow._onCursorChangeFunct = this.onListChangeUpdate.bind(this);
  this.addChild(this._enemyListWindow);
};
//=============================================================================
// * Frame Update
//=============================================================================
Scene_OmoriBestiary.prototype.update = function() {
  // Super Call
  Scene_BaseEX.prototype.update.call(this);

  // If Enemy Text Window is visible
  if (this._enemyTextWindow.visible) {
    if (Input.isTriggered('cancel')) {
      SoundManager.playCancel();
      this._enemyListWindow._onCursorChangeFunct = undefined;
      this._enemyListWindow.activate();
      this._enemyTextWindow.visible = false;
      this._enemyListWindow._onCursorChangeFunct = this.onListChangeUpdate.bind(this);
      return;
    }
    if (Input.isTriggered('left')) {
      this._enemyListWindow.selectPreviousEnemy();
      this.onListChangeUpdate();
      this.onEnemyListOk();
    };
    if (Input.isTriggered('right')) {
      this._enemyListWindow.selectNextEnemy();
      this.onListChangeUpdate();
      this.onEnemyListOk()
    };
  };
};
//=============================================================================
// * On List Change Update
//=============================================================================
Scene_OmoriBestiary.prototype.onListChangeUpdate = function() {
  // Get Enemy ID
  var enemyId =  this._enemyListWindow.enemyId();
  // Get Enemy Sprite
  var enemySprite = this._enemyWindow._enemySprite;
  // If the enemy ID is more than 0
  if (enemyId > 0) {
    this._enemyWindow.clearOpacity();
    enemySprite.removeChildren();
    // If enemy ID has changed transform
    this._enemy.transform(enemyId);
    // Get Data
    var data = LanguageManager.getTextData('Bestiary', 'Information')[enemyId];
    // Get Background Data
    var background = data.background;
    // Draw Name
    this._enemyNameWindow.drawName(this._enemyListWindow.enemyName(data));
    // Set Home Position
    enemySprite.setHome(data.position.x, data.position.y)
    // Set Enemy Sprite to visible
    enemySprite.visible = true;
    // Start Enemy Sprite Motion
    enemySprite.startMotion("other");
    // Update Enemy Sprite
    enemySprite.update();
    // Set Background
    this._enemyWindow.setBackground(background.name, background.x, background.y)
  } else {
    // Make Enemy Sprite invisible
    enemySprite.setHome(-Graphics.width, -Graphics.height)
    // Draw Name
    this._enemyNameWindow.drawName(LanguageManager.getTextData('Bestiary', 'EmptyEnemyName'))
    // Set Background
    this._enemyWindow.setBackground(null);
  };
};
//=============================================================================
// * [OK] Enemy List
//=============================================================================
Scene_OmoriBestiary.prototype.onEnemyListOk = function() {
  // Get Enemy ID
  var enemyId =  this._enemyListWindow.enemyId();
  // Get Data
  var data = LanguageManager.getTextData('Bestiary', 'Information')[enemyId];
  // Make Enemy Text Window Visible
  this._enemyTextWindow.visible = true;

  // Get Lines
  var lines = data.text.split(/[\r\n]/g);
  // Get Conditional Text
  var conditionalText = data.conditionalText;
  // If Conditional Text Exists
  if (conditionalText) {
    // Go through conditional text
    for (var i = 0; i < conditionalText.length; i++) {
      // Get text Data
      var textData = conditionalText[i];
      // Check if all switches are active
      if (textData.switchIds.every(function(id) { return $gameSwitches.value(id); })){
        // Get Line Index
        var lineIndex = textData.line === null ? lines.length : textData.line;
        // Get Extra Lines
        var extraLines = textData.text.split(/[\r\n]/g);
        // Add extra lines to main lines array
        lines.splice(lineIndex, 0, ...extraLines)
      };
    };
  }

  // Draw Lines
  this._enemyTextWindow.drawLines(lines);
  // Get Character
  var character = this._enemyTextWindow._enemyCharacter;
  let sprite = this._enemyTextWindow._characterSprite;
  // If Character Data Exists
  if (data.character) {
    // Set Character Image
    character.setImage(data.character.name, data.character.index);
  } else {
    // Set Character Image to nothing
    character.setImage('', 0);
  };
  // Update Sprite
  sprite.update()
  // Update Character
  this._enemyTextWindow.updateCharacter();
  this._enemyTextWindow._characterSprite.update();
};




//=============================================================================
// ** Window_OmoBestiaryEnemy
//-----------------------------------------------------------------------------
// This window is used to show the enemy and the background for it.
//=============================================================================
function Window_OmoBestiaryEnemy() { this.initialize.apply(this, arguments); }
Window_OmoBestiaryEnemy.prototype = Object.create(Window_Base.prototype);
Window_OmoBestiaryEnemy.prototype.constructor = Window_OmoBestiaryEnemy;
//=============================================================================
// * Object Initialization
//=============================================================================
Window_OmoBestiaryEnemy.prototype.initialize = function(enemy) {
  // Super Call
  Window_Base.prototype.initialize.call(this, 0, 0, Graphics.width / 2, Graphics.height);
  // Get Enemy Object
  this._enemy = enemy
  // Create Cover Mask
  this.createCoverMask();
  // Create Background Sprite
  this.createBackgroundSprite();
  // Create Enemy Sprite
  this.createEnemySprite();
};
//=============================================================================
// * Standard Padding
//=============================================================================
Window_OmoBestiaryEnemy.prototype.standardPadding = function() { return 5; }
Window_OmoBestiaryEnemy.prototype.isUsingCustomCursorRectSprite = function() { return true; }
Window_OmoBestiaryEnemy.prototype.customCursorRectYOffset = function() { return -7; }
//=============================================================================
// * Refresh Arrows
//=============================================================================
Window_OmoBestiaryEnemy.prototype._refreshArrows = function() { };
//=============================================================================
// * Create Cover Mask
//=============================================================================
Window_OmoBestiaryEnemy.prototype.createCoverMask = function() {
  // Get Padding
  var padding = this.standardPadding();
  // Face Mask
  this._coverMask = new PIXI.Graphics();
  this._coverMask.beginFill(0xFFF);
  this._coverMask.drawRect(padding, padding, this.width - (padding * 2), this.height - (padding * 2));
  this._coverMask.endFill();
  this.addChild(this._coverMask)
};
//=============================================================================
// * Create Background Sprite
//=============================================================================
Window_OmoBestiaryEnemy.prototype.createBackgroundSprite = function() {
  // Create Background Sprite
  this._backgroundSprite = new Sprite(ImageManager.loadBattleback1('battleback_vf_default'));
  this._backgroundSprite.mask = this._coverMask;
  this.addChild(this._backgroundSprite);
};
//=============================================================================
// * Create Enemy Sprite
//=============================================================================
Window_OmoBestiaryEnemy.prototype.createEnemySprite = function() {
  // Create Background Sprite
  this._enemySprite = new Sprite_Enemy(this._enemy);
  this._enemySprite.mask = this._coverMask;
  this._enemySprite.createShadowSprite = function() { this._shadowSprite = new Sprite(); }
  this._enemySprite.getCurrentMotion = function() {
    let other = this._enemy.getSideviewMotion("other");
    if(!other) {return this._enemy.getSideviewMotion("walk")}
    return other;
  }
  this.addChild(this._enemySprite);
};
//=============================================================================
// * Set Background
//=============================================================================
Window_OmoBestiaryEnemy.prototype.setBackground = function(name = null, x = 0, y = 0) {
  // If name
  if (name) {
    // Set Background Bitmap
    this._backgroundSprite.bitmap = ImageManager.loadBattleback1(name)
    this._backgroundSprite.x = x;
    this._backgroundSprite.y = y;
  } else {
    // Set Background Bitmap to null
    this._backgroundSprite.bitmap = null;
  }
  this._opDelay = 6;
};

//=============================================================================
// * Clear Opacity
//=============================================================================
Window_OmoBestiaryEnemy.prototype.clearOpacity = function() {
  this._enemySprite.opacity = 0;
  this._backgroundSprite.opacity = 0;
}

//=============================================================================
// * Update Opacity
//=============================================================================

Window_OmoBestiaryEnemy.prototype.updateBEOpacity = function() {
  if(this._enemySprite.opacity >= 255 && this._backgroundSprite.opacity >= 255) {return;}
  this._enemySprite.opacity = Math.min(this._enemySprite.opacity + 8, 255);
  this._backgroundSprite.opacity = Math.min(this._backgroundSprite.opacity + 8, 255);
} 

//=============================================================================
// * Main Update Method
//=============================================================================

Window_OmoBestiaryEnemy.prototype.update = function() {
  Window_Base.prototype.update.call(this);
  if(--this._opDelay > 0) {return;}
  this.updateBEOpacity();
}

//=============================================================================
// ** Window_OmoBestiaryEnemyName
//-----------------------------------------------------------------------------
// This window is used to show the enemy name as a header
//=============================================================================
function Window_OmoBestiaryEnemyName() { this.initialize.apply(this, arguments); }
Window_OmoBestiaryEnemyName.prototype = Object.create(Window_Base.prototype);
Window_OmoBestiaryEnemyName.prototype.constructor = Window_OmoBestiaryEnemyName;
//=============================================================================
// * Object Initialization
//=============================================================================
Window_OmoBestiaryEnemyName.prototype.initialize = function() {
  // Super Call
  Window_Base.prototype.initialize.call(this, 0, 0, Graphics.width / 2, 48);
};
//=============================================================================
// * Standard Padding
//=============================================================================
Window_OmoBestiaryEnemyName.prototype.standardPadding = function() { return 4; }
//=============================================================================
// * Draw Name
//=============================================================================
Window_OmoBestiaryEnemyName.prototype.drawName = function(name) {
  // Clear Contents
  this.contents.clear()
  // Draw Name
  this.contents.drawText(name, 15, -5, this.contents.width - 30, this.contents.height);
};



//=============================================================================
// ** Window_OmoBestiaryEnemyText
//-----------------------------------------------------------------------------
// This window is used to show the enemy information text.
//=============================================================================
function Window_OmoBestiaryEnemyText() { this.initialize.apply(this, arguments); }
Window_OmoBestiaryEnemyText.prototype = Object.create(Window_Base.prototype);
Window_OmoBestiaryEnemyText.prototype.constructor = Window_OmoBestiaryEnemyText;
//=============================================================================
// * Object Initialization
//=============================================================================
Window_OmoBestiaryEnemyText.prototype.initialize = function() {
  // Super Call
  Window_Base.prototype.initialize.call(this, 0, 0, Graphics.width / 2, Graphics.height - 48);
  // Create Character
  this.createCharacter();
};
//=============================================================================
// * Create Character
//=============================================================================
Window_OmoBestiaryEnemyText.prototype.createCharacter = function() {
  // Create Character Object
  this._enemyCharacter = new Game_Character();
  // Set Character Image Properties
  this._enemyCharacter.setImage('', 0)
  this._enemyCharacter.setWalkAnime(true)
  this._enemyCharacter.setStepAnime(true)
  // Create Sprite Character
  this._characterSprite = new Sprite_Character(this._enemyCharacter);
  this._characterSprite.updatePosition = function() {};
  this.addChild(this._characterSprite);
};
//=============================================================================
// * Draw Information
//=============================================================================
Window_OmoBestiaryEnemyText.prototype.drawInformation = function(information) {
  // Clear Contents
  this.contents.clear();
  // Get Lines
  var lines = information.split(/[\r\n]/g);
  // Go Through Lines
  for (var i = 0; i < lines.length; i++) {
    // Draw Line
    this.drawText(lines[i], 0, -10 + (i * 24), this.contents.width, 24);
  };
};
//=============================================================================
// * Draw Information
//=============================================================================
Window_OmoBestiaryEnemyText.prototype.drawLines = function(lines) {
  // Clear Contents
  this.contents.clear();
  // Go Through Lines
  for (var i = 0; i < lines.length; i++) {
    // Draw Line
    this.drawText(lines[i], 0, -10 + (i * 28), this.contents.width, 24);
  };
};
//=============================================================================
// * Frame Update
//=============================================================================
Window_OmoBestiaryEnemyText.prototype.update = function() {
  // Super Call
  Window_Base.prototype.update.call(this);
  // Update Character
  this.updateCharacter();
};
//=============================================================================
// * Update Character
//=============================================================================
Window_OmoBestiaryEnemyText.prototype.updateCharacter = function() {
  // Update Character
  this._enemyCharacter.update();
  // Get Sprite
  var sprite = this._characterSprite;
  // Set Sprite Position
  sprite.x = this.width - (sprite._frame.width / 2) - 10;
  sprite.y = this.height - 10;
};



//=============================================================================
// ** Window_OmoBestiaryEnemyList
//-----------------------------------------------------------------------------
// This window is used to show a list of enemy names.
//=============================================================================
function Window_OmoBestiaryEnemyList() { this.initialize.apply(this, arguments); }
Window_OmoBestiaryEnemyList.prototype = Object.create(Window_Command.prototype);
Window_OmoBestiaryEnemyList.prototype.constructor = Window_OmoBestiaryEnemyList;
//=============================================================================
// * Object Initialization
//=============================================================================
Window_OmoBestiaryEnemyList.prototype.initialize = function() {
  // Get Entries for Sorted Bestiary list
  this._sortedBestiaryList =  Object.entries(LanguageManager.getTextData('Bestiary', 'Information'));
  // Sort list
  this._sortedBestiaryList.sort(function(a, b) {
    var indexA = a[1].listIndex === undefined ? Number(a[0]) : a[1].listIndex
    var indexB = b[1].listIndex === undefined ? Number(b[0]) : b[1].listIndex
    return indexA - indexB
  });
  // Super Call
  Window_Command.prototype.initialize.call(this, 0, 0);
};
//=============================================================================
// * Settings
//=============================================================================
Window_OmoBestiaryEnemyList.prototype.windowWidth = function() { return Graphics.width / 2; };
Window_OmoBestiaryEnemyList.prototype.windowHeight = function() { return Graphics.height - 48; };
Window_OmoBestiaryEnemyList.prototype.isUsingCustomCursorRectSprite = function() { return true; };
Window_OmoBestiaryEnemyList.prototype.customCursorRectXOffset = function() { return 14; }
Window_OmoBestiaryEnemyList.prototype.customCursorRectYOffset = function() { return 0; }
Window_OmoBestiaryEnemyList.prototype.customCursorRectTextXOffset = function() { return 30; }
Window_OmoBestiaryEnemyList.prototype.customCursorRectTextYOffset = function() { return -7; }
Window_OmoBestiaryEnemyList.prototype.customCursorRectTextWidthOffset = function() { return 0; }
Window_OmoBestiaryEnemyList.prototype.customCursorRectBitmapName = function() { return 'cursor_menu'; }
//=============================================================================
// * Get Enemy ID
//=============================================================================
Window_OmoBestiaryEnemyList.prototype.enemyId = function(index = this._index) {
  return this._list[index].ext;
};
//=============================================================================
// * Select Next Enemy
//=============================================================================
Window_OmoBestiaryEnemyList.prototype.selectNextEnemy = function() {
  // Get Starting Index
  var index = (this.index() + 1)
  if(index >= this.maxItems()) {
    index = 0;
  }
  var selected = false;
  // Go Through Items
  for (var i = index; i < this.maxItems(); i++) {
    // If item has a valid ID
    if (this._list[i].ext !== 0) {
      // audio
      AudioManager.playSe({name: "SE_turn_page", pan: 0, pitch: 100, volume: 90});
      // Select it
      this.select(i);
      selected = true;
      break;
    };
  };
  if(!!selected) {return;}
};
//=============================================================================
// * Select Previous Enemy
//=============================================================================
Window_OmoBestiaryEnemyList.prototype.selectPreviousEnemy = function() {
  // Get Starting Index
  var index = (this.index() - 1) < 0 ? this.maxItems() - 1 : this.index() - 1;
  // Go Through Items
  for (var i = index; i >= 0; i--) {
    // If item has a valid Id
    if (this._list[i].ext !== 0) {
      // audio
      AudioManager.playSe({name: "SE_turn_page", pan: 0, pitch: 100, volume: 90});
      // Select it
      this.select(i);
      break;
    };
  };
};
//=============================================================================
// * Make Command List
//=============================================================================
Window_OmoBestiaryEnemyList.prototype.makeCommandList = function() {
  // Get List
  var list = $gameParty._defeatedEnemies;
  // Go Through List of Entries
  for (let [id, obj] of this._sortedBestiaryList) {
    // Get Index
    var index = Number(id);
    // If Defeated Enemy list contains id
    if (list.contains(index)) {
      // Add Command
      this.addCommand(this.enemyName(obj), 'ok', true, index)
    } else {
      // Add Empty Command
      this.addCommand('------------------------------', 'nothing', false, 0)
    };
  };
};
//=============================================================================
// * Get Enemy Name
//=============================================================================
Window_OmoBestiaryEnemyList.prototype.enemyName = function(obj) {
  // If object has conditional names
  if (obj.conditionalNames) {
    // Get Names
    const names = obj.conditionalNames
    // Go Through Names
    for (var i = 0; i < names.length; i++) {
      // Get Data
      const data = names[i];
      // Check Switches
      let switches = data.switches.every(arr => $gameSwitches.value(arr[0]) === arr[1])

      if (switches) {
        return data.name;
      };
    };
  };
  // Return default name
  return obj.name
};
//=============================================================================
// * Draw Item
//=============================================================================
Window_OmoBestiaryEnemyList.prototype.drawItem = function(index) {
  var rect = this.itemRectForText(index);
  var align = this.itemTextAlign();
  this.resetTextColor();
  this.changePaintOpacity(true);
  this.drawText(this.commandName(index), rect.x, rect.y, rect.width - rect.x, align);
};
//=============================================================================
// * Refresh Arrows
//=============================================================================
Window_OmoBestiaryEnemyList.prototype._refreshArrows = function() {
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
// * Call Update Help
//=============================================================================
Window_OmoBestiaryEnemyList.prototype.callUpdateHelp = function() {
  // Super Call
  Window_Command.prototype.callUpdateHelp.call(this);
  // If active
  if (this.active) {
    // If On Cursor Change Function Exists
    if (this._onCursorChangeFunct) { this._onCursorChangeFunct(); };

  };
};
