//=============================================================================
// TDS Omori Photo Album
// Version: 1.0
//=============================================================================
// Add to Imported List
var Imported = Imported || {} ; Imported.TDS_OmoriPhotoAlbum = true;
// Initialize Alias Object
var _TDS_ = _TDS_ || {} ; _TDS_.OmoriPhotoAlbum = _TDS_.OmoriPhotoAlbum || {};
//=============================================================================
 /*:
 * @plugindesc
 * Omori Photo Album Menu.
 *
 * @author TDS
 *
 */
//=============================================================================




//=============================================================================
// ** Game_Interpreter
//-----------------------------------------------------------------------------
// The interpreter for running event commands.
//=============================================================================
// * Call Album Menu
//=============================================================================
Game_Interpreter.prototype.callAlbumMenu = function(itemId, interfaceMode = 1) {
  SceneManager.push(Scene_OmoriPhotoAlbum);
  SceneManager.prepareNextScene($dataItems[itemId], interfaceMode);
};
//=============================================================================
// * Set Picture in Album
//=============================================================================
Game_Interpreter.prototype.setPictureInAlbum = function(album, index, id) {
  $gameParty.addPictureToAlbum(album, index, id);
};
//=============================================================================
// * Remove Picture in Album
//=============================================================================
Game_Interpreter.prototype.clearPictureInAlbum = function(album, index, id) {
  $gameParty.removePictureToAlbum(album, index, id);
};
//melon edit

//=============================================================================
// ** Game_Party
//-----------------------------------------------------------------------------
// The game object class for the party. Information such as gold and items is
// included.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriPhotoAlbum.Game_Party_initialize = Game_Party.prototype.initialize;
//=============================================================================
// * Object Initialize
//=============================================================================
Game_Party.prototype.initialize = function() {
  // Run Original Function
  _TDS_.OmoriPhotoAlbum.Game_Party_initialize.call(this);
  // Initialize Scanned Enemy List
  this._albumPictures = {};
  // Initialize the positions
  this._albumPicturePositions = {}
};
//=============================================================================
// * Create Picture Album
//=============================================================================
Game_Party.prototype.createPictureAlbum = function(album) {
  // Initialize Album if its undefined
  if (this._albumPictures[album] === undefined) { this._albumPictures[album] = []; };
};
//=============================================================================
// * Create Picture Album
//=============================================================================
Game_Party.prototype.randomizeAlbumPicturePositions = function(album, pictures, force = false) {
  // If album positions is undefined or forced
  if (this._albumPicturePositions[album] === undefined || force) {
    // Initialize Album
    let list = this._albumPicturePositions[album] = pictures.clone();
    // Set Index, Random Index, and Temporary Value
    var index = 0, randomIndex = 0, tempValue = 0;
    for (i = list.length - 1; i > 0; i -= 1) {
      randomIndex = Math.floor(Math.random() * (i + 1));
      temp = list[i];
      list[i] = list[randomIndex];
      list[randomIndex] = temp;
    };
  };
};
//=============================================================================
// * Add Picture to Album
//=============================================================================
Game_Party.prototype.albumSize = function(album) {
  // Create Picture Album
  this.createPictureAlbum(album);
  // Return Album Size
  return this._albumPictures[album].filter(Boolean).length
};
//=============================================================================
// * Add Picture to Album
//=============================================================================
Game_Party.prototype.addPictureToAlbum = function(album, index, id) {
  // Create Picture Album
  this.createPictureAlbum(album);  
  // Set Album Index Picture ID
  this._albumPictures[album][index] = id;
};
//=============================================================================
// * Remove Picture from Album
//=============================================================================
Game_Party.prototype.removePictureToAlbum = function(album, index, id) {
  // Create Picture Album
  this.createPictureAlbum(album);
  // Set Album Index Picture ID
  this._albumPictures[album][index] = undefined;
};
//melon edit

//=============================================================================
// * Add Picture to Album
//=============================================================================
Game_Party.prototype.getAlbumPictureAtIndex = function(album, index) {
  // If Album is undefined return
  if (this._albumPictures[album] === undefined) { return; };
  // Return Album Picture at Index
  return this._albumPictures[album][index];
};
//=============================================================================
// * Determine if Album has picture
//=============================================================================
Game_Party.prototype.albumHasPicture = function(album, index) {
  // If Album is undefined return
  if (this._albumPictures[album] === undefined) { return; };
  // Determine if Album Contains Index
  return this._albumPictures[album].contains(index);
}


_TDS_.OmoriPhotoAlbum.Scene_Map_needsFadeIn = Scene_Map.prototype.needsFadeIn;
Scene_Map.prototype.needsFadeIn = function() {
  return  (_TDS_.OmoriPhotoAlbum.Scene_Map_needsFadeIn.call(this) || SceneManager.isPreviousScene(Scene_OmoriPhotoAlbum));
};



//=============================================================================
// ** Scene_OmoriPhotoAlbum
//-----------------------------------------------------------------------------
// This scene shows the album
//=============================================================================
function Scene_OmoriPhotoAlbum() { this.initialize.apply(this, arguments);}
Scene_OmoriPhotoAlbum.prototype = Object.create(Scene_BaseEX.prototype);
Scene_OmoriPhotoAlbum.prototype.constructor = Scene_OmoriPhotoAlbum;
//=============================================================================
// * Object Initialization
//=============================================================================
Scene_OmoriPhotoAlbum.prototype.initialize = function() {
  // Set Image Reservation ID
  this._imageReservationId = 'photoAlbum';
  // Super Call
  Scene_BaseEX.prototype.initialize.call(this);
  // Interface Mode (0: Place, 1: Browse)
  this._interfaceMode = 0;
  // Viewing Mode Flag
  this._viewingMode = false;
  // Placing Mode Flag
  this._placingMode = false;
  // Browsing Mode Flag
  this._browsingMode = false;
  // Set Viewing Message Flag to false
  this._viewingMessage = false;
  // Set Viewing Index to 0
  this._viewingIndex = 0;
  // Set Block All Input flag
  this._blockAllInput = false;
  // Reset Flip Show Count
  this._flipShowCount = 0;
  // Flip Show Delay
  this._flipShowDelay = 100;
  // Required Picture Amount
  this._requiredPictures = 0;
  // Starting Page
  this._startingPage = 1;
};
//=============================================================================
// * Initialize Atlas Lists
//=============================================================================
Scene_OmoriPhotoAlbum.prototype.initAtlastLists = function() {
  // Run Original Function
  Scene_BaseEX.prototype.initAtlastLists.call(this);
};
//=============================================================================
// * Prepare
//=============================================================================
Scene_OmoriPhotoAlbum.prototype.prepare = function(item, interfaceMode = 0, requiredAmount = 0, page = 1) {
  // Set Required Amount
  this._requiredPictures = requiredAmount;
  // Set Interface Mode
  this._interfaceMode = interfaceMode;
  // Set Starting Page
  this._startingPage = page - 1;
  // Initialize Album Data
  this._albumData = {id: item.id};
  // Set Album Data Properties
  this._albumData.maxPages = Number(item.meta.AlbumMaxPages);
  this._albumData.maxImages = Number(item.meta.AlbumMaxPictures);
  this._albumData.group = item.meta.AlbumGroup.trim();
  this._albumData.bookImageName = item.meta.AlbumBookImage.trim();
  this._albumData.bookCoverImageName = item.meta.AlbumBookCoverImage.trim();
  this._albumData.pageTextImageName = item.meta.AlbumTextPageImage.trim();
  this._albumData.backgroundName = item.meta.AlbumBackground.trim();
  this._albumData.backgroundParallax = item.meta.AlbumParallax.trim();
  this._albumData.backgroundParallaxSpeed = new Point(Number(item.meta.ParallaxSpeedX), Number(item.meta.ParallaxSpeedY));
  this._albumData.defaultBackImageName = item.meta.AlbumDefaultBackImage.trim();

  // Initialize Picture Array
  var pictures = [];
  for (var i = 0; i < this._albumData.maxPages; i++) {
    // Get Data
    var data = item.meta["AlbumPage" + (i + 1) + "Pictures"]
    // If Data Exist
    if (data) {
      // Get Ids
      var ids = data.split(',').map(function(id) { return Number(id) });
      // Join ID's to Pictures Array
      pictures = pictures.concat(ids);
    } else {
      // Add Empty List
      pictures = pictures.concat([0, 0, 0, 0, 0, 0]);
    };
  };

  // Randomize Album Picture Positions
  $gameParty.randomizeAlbumPicturePositions(this._albumData.group, pictures);

  // // For testing remove when done
  // for (var i = 0; i < pictures.length; i++) {
  //   if (i > 0) {
  //     $gameParty.addPictureToAlbum(this._albumData.group, i, pictures[i]);
  //   };
  // };


  // Set album Pictures Array
  this._albumData.pictures = pictures;
  // Initialize Album Items
  this._albumData.albumItems = [];
  // Get Items
  var items = $gameParty.items().filter(function(item) { return item.meta.AlbumGraphicsName; }, this);

  // Atlas Checks Types
  var atlasChecks = ['thumbnailName', 'graphicsName', 'backGraphicsName'];
  // Go Through Items
  for (var i = 0; i < items.length; i++) {
    // Get Item
    var item = items[i];
    // Item Data
    var data = { id: item.id, group: item.meta.AlbumGroup.trim(), graphicsName: item.meta.AlbumGraphicsName.trim(),   thumbnailName: item.meta.AlbumThumbnailName.trim(), text: item.meta.AlbumText.trim()};
    if (item.meta.AlbumPlacingMessage) { data.placingMessage = item.meta.AlbumPlacingMessage.trim(); };
    // If Item has Back Graphics name
    if (item.meta.AlbumBackGraphicsName) {
      // Set Back Graphics Name
      data.backGraphicsName = item.meta.AlbumBackGraphicsName.trim();
    } else {
      // Set it from default back image name
      data.backGraphicsName = this._albumData.defaultBackImageName;
    };
    // If Group Matches Album group add it to item list
    if (data.group === this._albumData.group) { this._albumData.albumItems.push(data); };
    // Go Through atlas checks
    for (var i2 = 0; i2 < atlasChecks.length; i2++) {
      // Get Check Name
      var checkName = atlasChecks[i2];
      // Get Bitmap Name
      var bitmapName = '%1_%2'.format(data.group, data[checkName])
      // Get Atlas Path
      var atlasPath = 'img/pictures/' + bitmapName + '.png';
      // Get Atlas Name
      var atlasName = AtlasManager.getImageAtlasName(atlasPath);
      // If Atlas name exists
      if (atlasName) { this.addRequiredAtlas(atlasName); }
    };

    // // // FOR TESTING REMOVE WHEN DONE
    // if (i > -1 && data.group === this._albumData.group) {
    //   // Add Picture to album
    //   $gameParty.addPictureToAlbum(data.group, i, data.id);
    // };
  };

  // Load Background Images
  if (this._albumData.backgroundParallax) { ImageManager.loadPicture('%1_%2'.format(this._albumData.group, this._albumData.backgroundParallax)) };
  if (this._albumData.backgroundName) { ImageManager.loadPicture('%1_%2'.format(this._albumData.group, this._albumData.backgroundName)); };


  // Go Through Max Pages
  for (var i = 0; i < this._albumData.maxPages; i++) {
    // Get Bitmap Name
    var bitmapName = '%1_%2'.format(this._albumData.group, this._albumData.pageTextImageName + (i + 1));
    // // Get Bitmap
    // var bitmap = ImageManager.reservePicture(bitmapName, 0, this._imageReservationId);
    // Get Atlas Path
    var atlasPath = 'img/pictures/' + bitmapName + '.png';
    // Get Atlas Name
    var atlasName = AtlasManager.getImageAtlasName(atlasPath);
    // If Atlas name exists
    if (atlasName) { this.addRequiredAtlas(atlasName); }
  };
  // Add Required Atlas
  this.addRequiredAtlas('PhotoAlbumCovers'); 
  // Load Input Icons
  ImageManager.loadInputIcons();
  // Reserve Bitmap
  ImageManager.reserveSystem('ACSArrows', 0, this._imageReservationId);
};
//=============================================================================
// * Start
//=============================================================================
Scene_OmoriPhotoAlbum.prototype.start = function() {
  this.startFadeIn(this.slowFadeSpeed());
  // If Interface mode is 0 (Placing)
  if (this._interfaceMode === 0) {
    this.startPlacing();
  } else {
    this.startBrowsing();
  }
};
//=============================================================================
// * Start Placing
//=============================================================================
Scene_OmoriPhotoAlbum.prototype.startPlacing = function() {
  // If tutorial switch is on
  if ($gameSwitches.value(42)) {
    this._blockAllInput = true;
    this._albumPictureListWindow.y = Graphics.height
    var messages = ['dreamworld_extras_misc.message_2', 'dreamworld_extras_misc.message_3'];

    messages.forEach(function(message) {
      this.queue(function() {
        // Start Message
        this.startMessage(message);
      }.bind(this))

      // Wait
      this.queue('setWaitMode', 'message');

    }, this);
    this.queue('wait', 60);

    this.queue(function() {
      var duration = 15;
      // Set Duration
      var obj = this._albumPictureListWindow;
      var data = { obj: obj, properties: ['y', 'opacity', 'contentsOpacity'], from: {y: obj.y, opacity: obj.opacity, contentsOpacity: obj.contentsOpacity}, to: {y: Graphics.height - this._albumPictureListWindow.height, opacity: 255}, durations: {y: duration, opacity: duration, contentsOpacity: duration}}
      data.easing = Object_Movement.easeOutCirc;
      this.move.startMove(data);
    }.bind(this))

    this.queue('wait', 15);

    this.queue(function() {
      this._albumPictureListWindow.activate();
      this._albumPictureListWindow.select(0);
      this._blockAllInput = false;
    }.bind(this))
  } else {
    // Move Album Picture List window into screen
    this._albumPictureListWindow.y = Graphics.height - this._albumPictureListWindow.height;
    this._albumPictureListWindow.activate();
    this._albumPictureListWindow.select(0);
  };
};
//=============================================================================
// * Start Browsing
//=============================================================================
Scene_OmoriPhotoAlbum.prototype.startBrowsing = function() {
  // Move Album Picture List Outside the screen
  this._albumPictureListWindow.y = Graphics.height;
  // Move Album to center
  this._albumSprite.y = ((Graphics.height - 320) / 2);
  // Move Legend Window to Position
  this._legendWindow.y = -6;
  this._legendWindow.opacity = 255;
  this._legendWindow.contentsOpacity = 255;
  this._legendWindow.setTextList('browsing');
  this._albumSprite._usePictureCursor = false;
  this._albumSprite.activate();
  // Set Browsing Mode to true
  this._browsingMode = true;
};
//=============================================================================
// * Create
//=============================================================================
Scene_OmoriPhotoAlbum.prototype.create = function() {
  // Super Call
  Scene_BaseEX.prototype.create.call(this);
  // Create Background
  this.createBackground();
  this.createLegendWindow();
  // Create Viewing Sprites
  this.createPictureAlbum();
  // Create Album Picture List Window
  this.createAlbumPictureListWindow();
  // Create Viewing Sprites
  this.createViewingSprites();
  // Create Message Window
  this.createMessageWindow();
  // Create Picture Cursor
  this.createPictureCursor();
};
//=============================================================================
// * Create Background
//=============================================================================
Scene_OmoriPhotoAlbum.prototype.createBackground = function() {
  // Create Background Parallax
  this._backgroundParallax = new TilingSprite();
  this._backgroundParallax.move(0, 0, Graphics.width, Graphics.height);
  this.addChild(this._backgroundParallax)
  if (this._albumData.backgroundParallax) { 
    let bitmap = ImageManager.loadPicture('%1_%2'.format(this._albumData.group, this._albumData.backgroundParallax));
    
    bitmap.addLoadListener(() => this._backgroundParallax.bitmap = bitmap) 
  };
  // Create Background Sprite
  this._backgroundSprite = new Sprite();
  this.addChild(this._backgroundSprite);
  if (this._albumData.backgroundName) { 
    let bitmap = ImageManager.loadPicture('%1_%2'.format(this._albumData.group, this._albumData.backgroundName));
    bitmap.addLoadListener(() => this._backgroundSprite.bitmap =  bitmap);
  };
  
};
//=============================================================================
// * Create Legend Window
//=============================================================================
Scene_OmoriPhotoAlbum.prototype.createLegendWindow = function() {
  // Create Legend Window
  this._legendWindow = new Window_OmoriAlbumLegend();
  this._legendWindow.y = -this._legendWindow.height;
  this._legendWindow.opacity = 0;
  this._legendWindow.contentsOpacity = 0;
  this.addChild(this._legendWindow)
}
//=============================================================================
// * Create Picture Cursor
//=============================================================================
Scene_OmoriPhotoAlbum.prototype.createPictureCursor = function() {
  // Create Picture Cursor
  this._pictureCursor = new Sprite_OmoriAlbumPictureCursor(this._albumData);
  this._pictureCursor.x = 42;
  this._pictureCursor.y = 364;
  this.addChild(this._pictureCursor);
};
//=============================================================================
// * Create Picture Album
//=============================================================================
Scene_OmoriPhotoAlbum.prototype.createPictureAlbum = function() {
  // Create Album Sprite
  this._albumSprite = new Sprite_OmoriPictureAlbum(this._albumData, this._startingPage);
  this._albumSprite.x = (Graphics.width - 453) / 2;
  this._albumSprite.y = ((Graphics.height - 320) / 2) - 65;
  this._albumSprite.deactivate();
  this.addChild(this._albumSprite);
  // Create Closed Album Sprite
  this._closedAlbumSprite = new Sprite(ImageManager.loadPicture('%1_%2'.format(this._albumData.group, this._albumData.bookCoverImageName)))
  this._closedAlbumSprite.anchor.set(0.5, 0.5)
  this._closedAlbumSprite.x = Graphics.width / 2;
  this._closedAlbumSprite.y = Graphics.height / 2;
  this._closedAlbumSprite.visible = false;
  this.addChild(this._closedAlbumSprite);
};
//=============================================================================
// * Create Album Picture List Window
//=============================================================================
Scene_OmoriPhotoAlbum.prototype.createAlbumPictureListWindow = function() {
  // var width = 453, height = 320;
  this._albumPictureListWindow = new Window_OmoriPictureList(this._albumData);
  this._albumPictureListWindow.x = 0;
  this._albumPictureListWindow.y = Graphics.height - this._albumPictureListWindow.height;
  this._albumPictureListWindow.setHandler('ok', this.startPicturePlacing.bind(this));
  // this._albumPictureListWindow.setHandler('cancel', this.onPicturePlacingCancel.bind(this));
  this.addChild(this._albumPictureListWindow);
  // Set Album Sprite
  // this._albumPictureListWindow._albumSprite =  this._albumSprite;
}
//=============================================================================
// * Create Viewing Sprites
//=============================================================================
Scene_OmoriPhotoAlbum.prototype.createViewingSprites = function() {
  // Create Viewing Picture
  this._viewingPicture = new Sprite_OmoriAlbumBigPicture();
  this.addChild(this._viewingPicture);
  // Create Viewing Picture Slide
  this._viewingPictureSlide = new Sprite_OmoriAlbumBigPicture();
  this.addChild(this._viewingPictureSlide);


  // this._bigPictureSprite = new Sprite_OmoriAlbumBigPicture();
  // this._bigPictureSprite.x = Graphics.width  / 2;
  // this._bigPictureSprite.y = Graphics.height / 2;
  // this.addChild(this._bigPictureSprite );


  // Get Pointer Bitmap
  var pointerBitmap = ImageManager.loadSystem('ACSArrows');
  // Create Box Bitmap
  var boxBitmap = new Bitmap(45, 25);
  boxBitmap.fillAll('rgba(0, 0, 0, 1)')
  boxBitmap.fillRect(1, 1, boxBitmap.width - 2, boxBitmap.height - 2, 'rgba(255, 255, 255, 1)');
  boxBitmap.fillRect(4, 4, boxBitmap.width - 8, boxBitmap.height - 8, 'rgba(0, 0, 0, 1)');

  // // Get Pointer Bitmap
  // var pointerBitmap = ImageManager.loadSystem('ACSArrows');
  // // Create Box Bitmap
  // var boxBitmap = new Bitmap(55, 40);
  // boxBitmap.fillAll('rgba(0, 0, 0, 1)')
  // boxBitmap.fillRect(1, 1, boxBitmap.width - 2, boxBitmap.height - 2, 'rgba(255, 255, 255, 1)');
  // boxBitmap.fillRect(4, 4, boxBitmap.width - 8, boxBitmap.height - 8, 'rgba(0, 0, 0, 1)');

  // Create Viewing Picture Left Box
  this._viewingPictureLeftBox = new Sprite(boxBitmap);
  this._viewingPictureLeftBox.x = -this._viewingPictureLeftBox.width;
  this._viewingPictureLeftBox.y = (Graphics.height - this._viewingPictureLeftBox.height - 125) / 2;
  this._viewingPictureLeftBox.opacity = 0;
  this.addChild(this._viewingPictureLeftBox);
  // Create Viewing Picture Box Pointer Sprite
  this._viewingPictureLeftBox._pointerSprite = new Sprite(pointerBitmap);
  this._viewingPictureLeftBox._pointerSprite.x = 4;
  this._viewingPictureLeftBox._pointerSprite.y = -2;
  this._viewingPictureLeftBox._pointerSprite.setFrame(2 * 32, 0, 32, 32);
  this._viewingPictureLeftBox.addChild(this._viewingPictureLeftBox._pointerSprite);

  // Create Viewing Picture Right Box
  this._viewingPictureRightBox = new Sprite(boxBitmap);
  this._viewingPictureRightBox.x = (Graphics.width - this._viewingPictureRightBox.width);
  this._viewingPictureRightBox.y = (Graphics.height - this._viewingPictureRightBox.height - 125) / 2;
  this._viewingPictureRightBox.opacity = 0;
  this.addChild(this._viewingPictureRightBox);
  // Create Viewing Picture Box Pointer Sprite
  this._viewingPictureRightBox._pointerSprite = new Sprite(pointerBitmap);
  this._viewingPictureRightBox._pointerSprite.x = 38;
  this._viewingPictureRightBox._pointerSprite.y = -2;
  this._viewingPictureRightBox._pointerSprite.scale.x = -1;
  this._viewingPictureRightBox._pointerSprite.setFrame(2 * 32, 0, 32, 32);
  this._viewingPictureRightBox.addChild(this._viewingPictureRightBox._pointerSprite);

  // Get Flip Text
  var text = LanguageManager.getPluginText('albumMenu', 'flipText');
  var flipWidth = pointerBitmap.measureTextWidth(text);
  var flipBitmap = new Bitmap(flipWidth + 80, 30);

  flipBitmap.drawInputIcon('shift', 0, 4, false);
  flipBitmap.drawText(text, 0, -5, flipBitmap.width, flipBitmap.height, 'center');
  // flipBitmap.blt(pointerBitmap, 2 * 32, 0, 32, 29, 4, 0)
  // flipBitmap.blt(pointerBitmap, 1 * 32, 0, 32, 29, flipBitmap.width - 36, 0)
  // Create Flip Picture Box
  this._flipPictureBox = new Sprite(flipBitmap)
  this._flipPictureBox.x = (Graphics.width - flipBitmap.width) / 2
  this._flipPictureBox.y = Graphics.height - 30;
  this._flipPictureBox.opacity = 0;
  this.addChild(this._flipPictureBox);
};
//=============================================================================
// * Create Message Window
//=============================================================================
Scene_OmoriPhotoAlbum.prototype.createMessageWindow = function() {
  // Create Message Window
  this._messageWindow = new Window_Message();
  this.addChild(this._messageWindow);
  this._messageWindow.subWindows().forEach(function(window) {
      this.addChild(window);
  }, this);
};
//=============================================================================
// * Frame Update
//=============================================================================
Scene_OmoriPhotoAlbum.prototype.update = function() {
  // Super Call
  Scene_BaseEX.prototype.update.call(this);
  // Update Parallax Movement
  this.updateParallaxMovement();
  // Return if all input is being blocked
  if (this._blockAllInput) { return; }
  if(!!this._closedAlbumSprite.visible) {
    if(Input.isTriggered("ok") || Input.isTriggered("cancel")) {
      this._blockAllInput = true;
      this.queue('startFadeOut', 30, false)
      this.queue('wait', 30);
      this.queue(() => this.popScene());
      return Input.clear();
    }
  }


  // If Viewing Message
  if (this._viewingMessage) {
    // End Message
    if (!$gameMessage.isBusy()) { this.endMessage(); };
    return;
  } else if (this._placingMode) {
    // Update Picture Placgin
    this.updatePicturePlacing();
    return
  } else if (this._browsingMode) {
    // If Shift is triggered
    if (Input.isTriggered('shift')) {
      // Get Picture at index
      var picture = this._albumSprite.picture();
      // If Picture exists
      if (picture && !!this.hasComment(picture)) {
        // Start Message
        this.startMessage(picture.text)
      };
      return
    };
    // If Cancel is triggered
    if (Input.isTriggered('cancel')) {
      // If moving return
      if (this.move.isMoving()) { return; }
      // Block all input
      this._blockAllInput = true;
      // Pop scene
      this.popScene();
      return;
    };
    // If Ok is triggered
    if (Input.isTriggered('ok')) {
      // Get Picture at index
      var picture = this._albumSprite.picture();
      // If Picture Exists
      if (picture) {
        // Start Viewing Picture
        this.startViewingPicture();
      };
      return;
    };
  } else if (this._viewingMode) {
    // Update Viewing Mode
    this.updateViewingMode();
  } else {

    // If Cancel is triggered
    if (Input.isTriggered('cancel')) {
      // If moving return
      if (this.move.isMoving()) { return; }
      // Get Album Size
      var albumSize = $gameParty.albumSize(this._albumData.group);
      if (albumSize < this._requiredPictures) { return; }

      this._albumPictureListWindow.deactivate();
      this._blockAllInput = true;
      // Start Fadeout
      this.queue('startFadeOut', 30, false)
      this.queue('wait', 30);
      this.queue('popScene');
      return;
    };
  }
};
//=============================================================================
// * Update Parallax Movement
//=============================================================================
Scene_OmoriPhotoAlbum.prototype.updateParallaxMovement = function() {
  // Get Speed
  var speed = this._albumData.backgroundParallaxSpeed;
  // Move Parallax Origin X & Y
  this._backgroundParallax.origin.x += speed.x;
  this._backgroundParallax.origin.y += speed.y;
};
//=============================================================================
// * Start Message
//=============================================================================
Scene_OmoriPhotoAlbum.prototype.startMessage = function(message) {
  // Show Language Message
  $gameMessage.showLanguageMessage(message);
  // Deactivate Album Sprite
  this._albumSprite.deactivate();
  // Set Duration
  var duration = 15;

  if (this._browsingMode) {
    var obj = this._albumSprite;
    var data = { obj: obj, properties: ['y', 'opacity'], from: {y: obj.y, opacity: obj.opacity}, to: {y: ((Graphics.height - 320) / 2) - 55, opacity: 255}, durations: {y: duration, opacity: duration}}
    data.easing = Object_Movement.easeOutCirc;
    this.move.startMove(data);

    // Set Duration
    var obj = this._albumPictureListWindow;
    var data = { obj: obj, properties: ['y', 'opacity', 'contentsOpacity'], from: {y: obj.y, opacity: obj.opacity, contentsOpacity: obj.contentsOpacity}, to: {y: Graphics.height, opacity: 255}, durations: {y: duration, opacity: duration, contentsOpacity: duration}}
    data.easing = Object_Movement.easeOutCirc;
    this.move.startMove(data);


    var obj = this._legendWindow;
    var data = { obj: obj, properties: ['y', 'opacity', 'contentsOpacity'], from: {y: obj.y, opacity: obj.opacity, contentsOpacity: obj.contentsOpacity}, to: {y: -obj.height, opacity: 0, contentsOpacity: 0}, durations: {y: duration, opacity: duration, contentsOpacity: duration}}
    data.easing = Object_Movement.easeOutCirc;
    this.move.startMove(data);

  }

  // If Viewing Message
  this._viewingMessage = true;
};
//=============================================================================
// * End Message
//=============================================================================
Scene_OmoriPhotoAlbum.prototype.endMessage = function() {
  // If Viewing Message
  this._viewingMessage = false;
  // If in browsing mode
  if (this._browsingMode) {
    // Set Duration
    var duration = 15;
    var obj = this._albumSprite;
    var data = { obj: obj, properties: ['y', 'opacity'], from: {y: obj.y, opacity: obj.opacity}, to: {y: ((Graphics.height - 320) / 2), opacity: 255}, durations: {y: duration, opacity: duration}}

    data.easing = Object_Movement.easeOutCirc;
    this.move.startMove(data);

    data.onFinish = function() {
      this._albumSprite.activate();
    }.bind(this);

    var obj = this._legendWindow;
    var data = { obj: obj, properties: ['y', 'opacity', 'contentsOpacity'], from: {y: obj.y, opacity: obj.opacity, contentsOpacity: obj.contentsOpacity}, to: {y: -6, opacity: 255, contentsOpacity: 255}, durations: {y: duration, opacity: duration, contentsOpacity: duration}}
    data.easing = Object_Movement.easeOutCirc;
    this.move.startMove(data);
  };
};
//=============================================================================
// * Frame Update
//=============================================================================
Scene_OmoriPhotoAlbum.prototype.updatePicturePlacing = function() {
  // If Cancel Input
  if (Input.isTriggered('cancel')) {
    // End Picture Placing
    this.endPicturePlacing();
    return;
  };
  // If Ok Input is triggered
  if (Input.isTriggered('ok')) {
    // Place Picture in Album
    this.placePictureInAlbum();
    return;
  };
};
//=============================================================================
// * Start Picture Placing
//=============================================================================
Scene_OmoriPhotoAlbum.prototype.startPicturePlacing = function() {
  // Set Placing Mode flag to true
  this._placingMode = true;
  // Get Position and Picture
  var pos = this._albumPictureListWindow.pictureCursorPosition();
  var picture = this._albumPictureListWindow.picture();

    // this._albumSprite.activate();

  this.queue(function() {
    this._albumPictureListWindow.clearSelected();
    this._albumPictureListWindow._index = -1;
//    this._albumPictureListWindow.deselect();
    // Set Picture Cursor Position
    this._pictureCursor.x = pos.x;
    this._pictureCursor.y = pos.y;
    // Select Picture Cursor
    this._pictureCursor.select();
    // Set Picture Data
    this._pictureCursor.setPictureData(picture);
  }.bind(this))
  // Wait
  this.queue('wait', 8);

  this.queue(function() {
    // Set Duration
    var duration = 15;
    var obj = this._albumPictureListWindow;
    var data = { obj: obj, properties: ['y', 'opacity', 'contentsOpacity'], from: {y: obj.y, opacity: obj.opacity, contentsOpacity: obj.contentsOpacity}, to: {y: Graphics.height, opacity: 0, contentsOpacity: 0}, durations: {y: duration, opacity: duration, contentsOpacity: duration}}
    data.easing = Object_Movement.easeOutCirc;
    data.onFinish = function() {
      // this._albumPictureListWindow.activate();
    }.bind(this);
    this.move.startMove(data);

    var obj = this._legendWindow;
    var data = { obj: obj, properties: ['y', 'opacity', 'contentsOpacity'], from: {y: obj.y, opacity: obj.opacity, contentsOpacity: obj.contentsOpacity}, to: {y: -6, opacity: 255, contentsOpacity: 255}, durations: {y: duration, opacity: duration, contentsOpacity: duration}}
    data.easing = Object_Movement.easeOutCirc;
    this.move.startMove(data);

    var obj = this._albumSprite;
    var data = { obj: obj, properties: ['y', 'opacity'], from: {y: obj.y, opacity: obj.opacity}, to: {y: ((Graphics.height - 320) / 2), opacity: 255}, durations: {y: duration, opacity: duration}}
    data.easing = Object_Movement.easeOutCirc;
    this.move.startMove(data);

    this._albumSprite._pictureCursor = this._pictureCursor;
    this._albumSprite._index = 0;
    this._albumSprite.setHome(obj.x, ((Graphics.height - 320) / 2));
    this._albumSprite.updateCursorPosition();


  }.bind(this))
  // Wait
  this.queue('setWaitMode', 'movement');

  this.queue(function() {
    this._albumSprite.activate();
    // Set Placing Picture
    this._albumSprite.setPlacingPicture(picture);
  }.bind(this))
};
//=============================================================================
// * End Picture Placing
//=============================================================================
Scene_OmoriPhotoAlbum.prototype.endPicturePlacing = function() {
  // Set Placing Mode flag to true
  this._placingMode = false;
  // Set Album Sprite Picture Cursor to null
  this._albumSprite._pictureCursor = null;
  this._albumSprite.hidePictureBorder();
  this._albumSprite.deactivate();
  // Set Block All Input flag
  this._blockAllInput = true;    

  // Get Position and Picture
  var picture = this._pictureCursor._picture;

  // Refresh Album Picture List Window
  this._albumPictureListWindow.refresh();
  if (picture) {
    this._albumPictureListWindow.selectPictureByID(picture.id);
    this._albumPictureListWindow.clearSelected();
  } else {
    this._albumPictureListWindow.select(0);
  };
  // Get Position
  var pos = this._albumPictureListWindow.pictureCursorPosition();

  this.queue(function() {
    // Set Duration
    var duration = 15;
    var obj = this._albumPictureListWindow;
    var data = { obj: obj, properties: ['y', 'opacity', 'contentsOpacity'], from: {y: obj.y, opacity: obj.opacity, contentsOpacity: obj.contentsOpacity}, to: {y: Graphics.height - obj.height, opacity: 255, contentsOpacity: 255}, durations: {y: duration, opacity: duration, contentsOpacity: duration}}
    data.easing = Object_Movement.easeOutCirc;
    data.onFinish = function() {
      // this._albumPictureListWindow.activate();
    }.bind(this);
    this.move.startMove(data);

    var obj = this._legendWindow;
    var data = { obj: obj, properties: ['y', 'opacity', 'contentsOpacity'], from: {y: obj.y, opacity: obj.opacity, contentsOpacity: obj.contentsOpacity}, to: {y: -obj.height, opacity: 0, contentsOpacity: 0}, durations: {y: duration, opacity: duration, contentsOpacity: duration}}
    data.easing = Object_Movement.easeOutCirc;
    this.move.startMove(data);

    var obj = this._albumSprite;
    var data = { obj: obj, properties: ['y', 'opacity'], from: {y: obj.y, opacity: obj.opacity}, to: {y: ((Graphics.height - 320) / 2) - 65, opacity: 255}, durations: {y: duration, opacity: duration}}
    data.easing = Object_Movement.easeOutCirc;
    this.move.startMove(data);

    var obj = this._pictureCursor;
    var data = { obj: obj, properties: ['x', 'y'], from: {x: obj.x, y: obj.y}, to: {x: pos.x, y: (Graphics.height - this._albumPictureListWindow.height) + 15 }, durations: {x: duration, y: duration}}
    data.easing = Object_Movement.easeOutCirc;
    this.move.startMove(data);
  }.bind(this))
  // Wait
  this.queue('setWaitMode', 'movement');

  this.queue(function() {
    this._pictureCursor.deselect();
  }.bind(this))
  this.queue('wait', 5);

  this.queue(function() {
    // Set Block All Input flag
    this._blockAllInput = false;    
    // Update Input
    Input.update();
    // Set Picture Data to null
    this._pictureCursor.setPictureData(null);
    this._albumPictureListWindow.redrawCurrentItem();
    this._albumPictureListWindow.activate();
  }.bind(this))
};
//=============================================================================
// * Place Picture in Album
//=============================================================================
Scene_OmoriPhotoAlbum.prototype.placePictureInAlbum = function() {
  // Get Position and Picture
  var picture = this._pictureCursor._picture;
  // Get Picture ID
  var pictureId = this._albumData.pictures[this._albumSprite.pictureIndex()];


  // If Picture Matches Picture ID
  if (picture.id === pictureId) {
    // Set Block All Input flag
    this._blockAllInput = true;         
    // Set Placing mode to false
    this._placingMode = false;
    // Deselect Picture Cursor
    this.queue(function() { this._pictureCursor.deselect(); }.bind(this))
    this.queue('wait', 5);
    this.queue(function() {
      // Get Page Index
      var pageIndex = this._albumSprite.pictureIndex();
      var albumSlotId = this._albumData.pictures[pageIndex];
      // Add Picture to album
      $gameParty.addPictureToAlbum(this._albumData.group, pageIndex, picture.id);
      // Refresh Page
      this._albumSprite.refreshPage(2);
      // Refresh Album Picture List Window
      this._albumPictureListWindow.refresh();

      // Hide Border
      this._albumSprite.hidePictureBorder();
      // Set Album Sprite Picture Cursor to null
      this._albumSprite._pictureCursor = null;
      this._albumSprite.hidePictureBorder();
      this._albumSprite.deactivate();
      // Set Picture Data to null
      this._pictureCursor.setPictureData(null);
    }.bind(this))



    if (picture.placingMessage) {
      this.queue(function() {
        // Start Message
        this.startMessage(picture.placingMessage);
      }.bind(this))
      // Wait
      this.queue('setWaitMode', 'message');
    };


    this.queue(function() {
      // If Album is full
      if ($gameParty.albumSize(this._albumData.group) >= this._albumData.maxImages) { 
        this.queue('startAlbumFullAnimation')
        return
      };

      // Set Duration
      this._albumPictureListWindow.select(0); // For not having the effect of back;
      var duration = 15;
      var obj = this._albumPictureListWindow;
      var data = { obj: obj, properties: ['y', 'opacity', 'contentsOpacity'], from: {y: obj.y, opacity: obj.opacity, contentsOpacity: obj.contentsOpacity}, to: {y: Graphics.height - obj.height, opacity: 255, contentsOpacity: 255}, durations: {y: duration, opacity: duration, contentsOpacity: duration}}
      data.easing = Object_Movement.easeOutCirc;
      data.onFinish = function() {
        // this._albumPictureListWindow.activate();
      }.bind(this);
      this.move.startMove(data);

      var obj = this._legendWindow;
      var data = { obj: obj, properties: ['y', 'opacity', 'contentsOpacity'], from: {y: obj.y, opacity: obj.opacity, contentsOpacity: obj.contentsOpacity}, to: {y: -obj.height, opacity: 0, contentsOpacity: 0}, durations: {y: duration, opacity: duration, contentsOpacity: duration}}
      data.easing = Object_Movement.easeOutCirc;
      this.move.startMove(data);

      var obj = this._albumSprite;
      var data = { obj: obj, properties: ['y', 'opacity'], from: {y: obj.y, opacity: obj.opacity}, to: {y: ((Graphics.height - 320) / 2) - 65, opacity: 255}, durations: {y: duration, opacity: duration}}
      data.easing = Object_Movement.easeOutCirc;
      this.move.startMove(data);
    }.bind(this))
    // Wait
    this.queue('setWaitMode', 'movement');
    this.queue(function() {
      this._albumPictureListWindow.activate();
      // Set Block All Input flag
      this._blockAllInput = false;         

    }.bind(this))
  };
};
//=============================================================================
// * Start Album Full animation
//=============================================================================

Scene_OmoriPhotoAlbum.prototype.startAlbumFullAnimation = function() {
  // Start Fadeout
  this.queue('startFadeOut', 30, false)
  this.queue('wait', 40);

  // Set Block All Input flag
  this._blockAllInput = true;   
  let needsCoverToShow = this._albumData.id !== 914 || (this._albumData.id === 914 && $gameMap.mapId() === 393)     
  if (needsCoverToShow) {
    this.queue(function() {
      this._albumSprite.visible = false;
      this._legendWindow.visible = false;
      this._legendWindow.deactivate();
      // Deactivate album
      this._albumSprite.deactivate();
      this._albumPictureListWindow.deactivate();    
      // Make Closed Album Sprite Visible
      this._closedAlbumSprite.visible = true;
    }.bind(this))

    this.queue('startFadeIn', 30, false)
    this.queue('wait', 30);
    this.queue(() => {
      this._blockAllInput = false;
    })
    return;
  }

  this.queue(function() {
    this.popScene();
    // // Set Block All Input flag
    // this._blockAllInput = false;
  }.bind(this))

};

Scene_OmoriPhotoAlbum.prototype.hasComment = function(picture) {
  if(!picture) {return false;}
  if(!picture.text) {return false;}
  let data = LanguageManager.getMessageData(picture.text)
  return data.text !== "...";
}
//=============================================================================
// * Show Viewing Picture
//=============================================================================
Scene_OmoriPhotoAlbum.prototype.startViewingPicture = function() {
  // Set Duration
  var duration = 25;
  // Get Picture at index
  var picture = this._albumSprite.picture();
  // Set viewing mode to true
  this._viewingMode = true;
  // Set Browsing mode to false
  this._browsingMode = false;
  // Set Viewing Index
  this._viewingIndex = (this._albumSprite._page * this._albumSprite.maxPagePictures()) + this._albumSprite._index;
  // Set Flip Delay Count
  this._flipShowDelay = -1;

  // Setup Viewing Picture Bitmaps
  this._viewingPicture._facing = 0;
  this._viewingPicture.setupBitmaps(ImageManager.loadPicture('%1_%2'.format(this._albumData.group, picture.graphicsName)), ImageManager.loadPicture('%1_%2'.format(this._albumData.group, picture.backGraphicsName)))
  this._viewingPicture.x = (Graphics.width / 2)
  this._viewingPicture.y = Graphics.height + (this._viewingPicture.height / 2);
  // Deactivate album
  this._albumSprite.deactivate();

  var obj = this._viewingPicture;
  var data = { obj: obj, properties: ['x', 'y', 'opacity'], from: {x: obj.x, y: obj.y, opacity: obj.opacity}, to: {x: Graphics.width / 2, y: Graphics.height / 2, opacity: 255}, durations: {x: duration, y: duration, opacity: duration}}
  data.easing = Object_Movement.easeOutCirc;
  this.move.startMove(data);

  duration = 15;
  var obj = this._albumSprite;
  // var data = { obj: obj, properties: ['opacity'], from: {opacity: obj.opacity}, to: {opacity: 0}, durations: {opacity: duration}}
  var data = { obj: obj, properties: ['y', 'opacity'], from: {y: obj.y, opacity: obj.opacity}, to: {y: Graphics.height , opacity: 0}, durations: {y: duration, opacity: duration}}
  data.easing = Object_Movement.easeInCirc;
  this.move.startMove(data);

  duration = 25;
  var obj = this._legendWindow;
  var data = { obj: obj, properties: ['y', 'opacity', 'contentsOpacity'], from: {y: obj.y, opacity: obj.opacity, contentsOpacity: obj.contentsOpacity}, to: {y: -obj.height, opacity: 0, contentsOpacity: 0}, durations: {y: duration, opacity: duration, contentsOpacity: duration}}
  data.easing = Object_Movement.easeOutCirc;
  this.move.startMove(data);

  if(!!this.hasComment(picture)) {
    duration = 25;
    var obj = this._flipPictureBox
    var data = { obj: obj, properties: ['opacity'], from: {opacity: obj.opacity}, to: {opacity: 255}, durations: {opacity: duration}}
    data.easing = Object_Movement.easeInCirc;
    this.move.startMove(data);
  }




  if (this.previousViewingPictureExists()) {
    var obj = this._viewingPictureLeftBox;
    var data = { obj: obj, properties: ['x', 'opacity'], from: {x: obj.x, opacity: obj.opacity}, to: {x: 80, opacity: 255}, durations: {x: duration, opacity: duration}};
    data.easing = Object_Movement.easeOutCirc;
    this.move.startMove(data);
  };


  if (this.nextViewingPictureExists()) {
    var obj = this._viewingPictureRightBox;
    var data = { obj: obj, properties: ['x', 'opacity'], from: {x: obj.x, opacity: obj.opacity}, to: {x: (Graphics.width - obj.width) - 80, opacity: 255}, durations: {x: duration, opacity: duration}};
    data.easing = Object_Movement.easeOutCirc;
    this.move.startMove(data);
  };
};
//=============================================================================
// * End Viewing Picture
//=============================================================================
Scene_OmoriPhotoAlbum.prototype.endViewingPicture = function() {
  // Set viewing mode to false
  this._viewingMode = false;
  // Set Browsing mode to true
  this._browsingMode = true;
  var pageMax = this._albumSprite.maxPagePictures();
  var page = Math.floor(this._viewingIndex / pageMax);
  // Set Page
  this._albumSprite._page = page;
  this._albumSprite._index = this._viewingIndex % pageMax;
  this._albumSprite.updateCursorPosition();
  this._albumSprite.refreshPage(2);

  // Set Duration
  var duration = 25;

  var obj = this._albumSprite;
  // var data = { obj: obj, properties: ['opacity'], from: {opacity: obj.opacity}, to: {opacity: 255}, durations: {opacity: duration}}
  var data = { obj: obj, properties: ['y', 'opacity'], from: {y: obj.y, opacity: obj.opacity}, to: {y: ((Graphics.height - 320) / 2), opacity: 255}, durations: {y: duration, opacity: duration}}

  data.easing = Object_Movement.easeOutCirc;
  this.move.startMove(data);

  data.onFinish = function() {
    this._viewingMode = false;
    this._albumSprite.activate();
  }.bind(this);

  duration = 15;
  var obj = this._viewingPicture;
  var data = { obj: obj, properties: ['y', 'opacity'], from: {y: obj.y, opacity: obj.opacity}, to: {y: Graphics.height + (obj.height / 2), opacity: 0}, durations: {y: duration, opacity: duration}}
  data.easing = Object_Movement.easeInCirc;
  this.move.startMove(data);

  duration = 25;
  var obj = this._legendWindow;
  // var data = { obj: obj, properties: ['y', 'opacity'], from: {y: obj.y, opacity: obj.opacity}, to: {y: 0, opacity: 255}, durations: {y: duration, opacity: duration}};
  var data = { obj: obj, properties: ['y', 'opacity', 'contentsOpacity'], from: {y: obj.y, opacity: obj.opacity, contentsOpacity: obj.contentsOpacity}, to: {y: -6, opacity: 255, contentsOpacity: 255}, durations: {y: duration, opacity: duration, contentsOpacity: duration}}

  data.easing = Object_Movement.easeOutCirc;
  this.move.startMove(data);

  duration = 15;
  var obj = this._viewingPictureLeftBox;
  var data = { obj: obj, properties: ['x', 'opacity'], from: {x: obj.x, opacity: obj.opacity}, to: {x: -obj.width, opacity: 0}, durations: {x: duration, opacity: duration}};
  data.easing = Object_Movement.easeOutCirc;
  this.move.startMove(data);

  var obj = this._viewingPictureRightBox;
  var data = { obj: obj, properties: ['x', 'opacity'], from: {x: obj.x, opacity: obj.opacity}, to: {x: (Graphics.width + obj.width), opacity: 0}, durations: {x: duration, opacity: duration}};
  data.easing = Object_Movement.easeOutCirc;
  this.move.startMove(data);

  duration = 10;
  var obj = this._flipPictureBox
  var data = { obj: obj, properties: ['opacity'], from: {opacity: obj.opacity}, to: {opacity: 0}, durations: {opacity: duration}}
  data.easing = Object_Movement.easeInCirc;
  this.move.startMove(data);
};
//=============================================================================
// * Update Viewing Mode
//=============================================================================
Scene_OmoriPhotoAlbum.prototype.updateViewingMode = function() {

  /*if (this._flipShowDelay > 0) { this._flipShowDelay--; }
  if (this._flipShowDelay === 0) {
    var duration = 10;
    var obj = this._flipPictureBox
    var data = { obj: obj, properties: ['opacity'], from: {opacity: obj.opacity}, to: {opacity: 0}, durations: {opacity: duration}}
    data.easing = Object_Movement.easeInCirc;
    this.move.startMove(data);
    // Set Flip Show Delay to minus 1
    this._flipShowDelay = -1;
  };*/


  // If not moving
  if (!this.move.isMoving() && !this._viewingPicture.isFlipping()) {
    // If Shift is triggered
    if (Input.isTriggered('shift')) {
      // Get Page max and page
      var pageMax = this._albumSprite.maxPagePictures();
      var page = Math.floor(this._viewingIndex / pageMax);
      // Set Page
      this._albumSprite._page = page;
      this._albumSprite._index = this._viewingIndex % pageMax;
      // Get Picture at index
      var picture = this._albumSprite.picture();
      // If Picture exists
      if (picture && !!this.hasComment(picture)) {
        // Start Message
        this.startMessage(picture.text);
      };
      return
    };


    // If Left Input
    if (Input.isRepeated('left')) {
      this.showPrevViewingPicture();
      // Start Toggle Flip
      // this._viewingPicture.startToggleFlip();
      return
    };
    // If Right Input
    if (Input.isRepeated('right')) {
      // Start Toggle Flip
      this.showNextViewingPicture();
    //  this._viewingPicture.startToggleFlip();
      return
    };

    // If Left Input
    if (Input.isRepeated('up')) {
    //  this.showPrevViewingPicture();
      return
    };
    // If Right Input
    if (Input.isRepeated('down')) {
  //    this.showNextViewingPicture();
      return
    };

    // If Cancelled
    if (Input.isTriggered('cancel')) {
      // End Picture Viewing
      this.endViewingPicture();
      return;
    };
  };
};
//=============================================================================
// * UPDATE SHIFT BOX
//=============================================================================
Scene_OmoriPhotoAlbum.prototype.updateShiftToRead = function(picture) {
  if(!!this.hasComment(picture)) {
    duration = 25;
    var obj = this._flipPictureBox
    var data = { obj: obj, properties: ['opacity'], from: {opacity: obj.opacity}, to: {opacity: 255}, durations: {opacity: duration}}
    data.easing = Object_Movement.easeInCirc;
    this.move.startMove(data);
  }
  else {
    duration = 10;
    var obj = this._flipPictureBox
    var data = { obj: obj, properties: ['opacity'], from: {opacity: obj.opacity}, to: {opacity: 0}, durations: {opacity: duration}}
    data.easing = Object_Movement.easeInCirc;
    this.move.startMove(data);     
  }
}
//=============================================================================
// * Show Next Picture
//=============================================================================
Scene_OmoriPhotoAlbum.prototype.showNextViewingPicture = function(duration) {
  // Get Next Picture
  var nextPicture;
  // Get Max Per Page
  var maxPerPage = this._albumSprite.maxPagePictures();



  // Go Through Pictures
  for (var i = this._viewingIndex + 1; i <= this._albumData.maxImages; i++) {
    // Get Page Index
    var pageIndex = i % maxPerPage;
    // Get Page
    var page = Math.floor(i / maxPerPage);
    // Get Picture
    var picture = this._albumSprite.picture(pageIndex, page);
    // If Picture
    if (picture) {
      // Set Next Picture
      nextPicture = picture;
      // Set Viewing Index
      this._viewingIndex = i;
      break
    };
  };

  if (this.nextViewingPictureExists()) {
    // Set Duration
    var duration = 15;
    var obj = this._viewingPictureRightBox;

    var data = { obj: obj, properties: ['x', 'opacity'], from: {x: obj.x, opacity: obj.opacity}, to: {x: (Graphics.width - obj.width) - 80, opacity: 255}, durations: {x: duration, opacity: duration}};
    data.easing = Object_Movement.easeOutCirc;
    this.move.startMove(data);
  } else {
    // Set Duration
    var duration = 15;
    var obj = this._viewingPictureRightBox;
    var data = { obj: obj, properties: ['x', 'opacity'], from: {x: obj.x, opacity: obj.opacity}, to: {x: (Graphics.width + obj.width), opacity: 0}, durations: {x: duration, opacity: duration}};
    data.easing = Object_Movement.easeOutCirc;
    this.move.startMove(data);
  };

  if (this.previousViewingPictureExists()) {
    // Set Duration
    var duration = 15;

    var obj = this._viewingPictureLeftBox;
    var data = { obj: obj, properties: ['x', 'opacity'], from: {x: obj.x, opacity: obj.opacity}, to: {x: 80, opacity: 255}, durations: {x: duration, opacity: duration}};
    data.easing = Object_Movement.easeOutCirc;
    this.move.startMove(data);
  } else {
    // Set Duration
    var duration = 15;
    var obj = this._viewingPictureLeftBox;
    var data = { obj: obj, properties: ['x', 'opacity'], from: {x: obj.x, opacity: obj.opacity}, to: {x: -obj.width, opacity: 0}, durations: {x: duration, opacity: duration}};
    data.easing = Object_Movement.easeOutCirc;
    this.move.startMove(data);
  };




  // If Next Picture Exists
  if (nextPicture) {
    // Set Duration
    AudioManager.playSe({name: "SE_turn_page", pan: 0, pitch: 100, volume: 90});
    var duration = 25;
    var obj = this._viewingPicture;
    var data = { obj: obj, properties: ['x', 'opacity'], from: {x: obj.x, opacity: obj.opacity}, to: {x: Graphics.width / 2, opacity: 0}, durations: {x: duration, opacity: duration}}
    data.easing = Object_Movement.easeInCirc;
    this.move.startMove(data);

    // Reset Sliding Picture
    this._viewingPictureSlide.x = Graphics.width + (this._viewingPicture.width / 2);
    this._viewingPictureSlide.y = Graphics.height / 2
    // this._viewingPictureSlide.bitmap = ImageManager.loadPicture('%1_%2'.format(this._albumData.group, nextPicture.graphicsName));
    this._viewingPictureSlide.setupBitmaps(ImageManager.loadPicture('%1_%2'.format(this._albumData.group, nextPicture.graphicsName)), ImageManager.loadPicture('%1_%2'.format(this._albumData.group, nextPicture.backGraphicsName)));

    this.updateShiftToRead(nextPicture);

    var obj = this._viewingPictureSlide;
    var data = { obj: obj, properties: ['x', 'opacity'], from: {x: obj.x, opacity: obj.opacity}, to: {x: Graphics.width / 2, opacity: 255}, durations: {x: duration, opacity: duration}}
    data.easing = Object_Movement.easeOutCirc;
    data.onFinish = this.onPictureShowFinish.bind(this);
    this.move.startMove(data);
  };
};
//=============================================================================
// * Show Prev Picture
//=============================================================================
Scene_OmoriPhotoAlbum.prototype.showPrevViewingPicture = function(duration) {
  // Get Prev Picture
  var prevPicture;
  // Get Max Per Page
  var maxPerPage = this._albumSprite.maxPagePictures();


  // Go Through Pictures
  for (var i = this._viewingIndex - 1; i >= 0; i--) {
    // Get Page Index
    var pageIndex = i % maxPerPage;
    // Get Page
    var page = Math.floor(i / maxPerPage);
    // Get Picture
    var picture = this._albumSprite.picture(pageIndex, page);
    // If Picture
    if (picture) {
      // Set Prev Picture
      prevPicture = picture;
      // Set Viewing Index
      this._viewingIndex = i;
      break
    };
  };

  if (this.nextViewingPictureExists()) {
    // Set Duration
    var duration = 15;
    var obj = this._viewingPictureRightBox;
    var data = { obj: obj, properties: ['x', 'opacity'], from: {x: obj.x, opacity: obj.opacity}, to: {x: (Graphics.width - obj.width) - 80, opacity: 255}, durations: {x: duration, opacity: duration}};
    data.easing = Object_Movement.easeOutCirc;
    this.move.startMove(data);
  } else {
    // Set Duration
    var duration = 15;
    var obj = this._viewingPictureRightBox;
    var data = { obj: obj, properties: ['x', 'opacity'], from: {x: obj.x, opacity: obj.opacity}, to: {x: (Graphics.width + obj.width), opacity: 0}, durations: {x: duration, opacity: duration}};
    data.easing = Object_Movement.easeOutCirc;
    this.move.startMove(data);
  };

  if (this.previousViewingPictureExists()) {
    // Set Duration
    var duration = 15;
    var obj = this._viewingPictureLeftBox;
    var data = { obj: obj, properties: ['x', 'opacity'], from: {x: obj.x, opacity: obj.opacity}, to: {x: 80, opacity: 255}, durations: {x: duration, opacity: duration}};
    data.easing = Object_Movement.easeOutCirc;
    this.move.startMove(data);
  } else {
    // Set Duration
    var duration = 15;
    var obj = this._viewingPictureLeftBox;
    var data = { obj: obj, properties: ['x', 'opacity'], from: {x: obj.x, opacity: obj.opacity}, to: {x: -obj.width, opacity: 0}, durations: {x: duration, opacity: duration}};
    data.easing = Object_Movement.easeOutCirc;
    this.move.startMove(data);
  };

  // If Previous Picture Exists
  if (prevPicture) {
    // Set Duration
    AudioManager.playSe({name: "SE_turn_page", pan: 0, pitch: 100, volume: 90});
    var duration = 25;
    var obj = this._viewingPicture;
    var data = { obj: obj, properties: ['x', 'opacity'], from: {x: obj.x, opacity: obj.opacity}, to: {x: Graphics.width / 2, opacity: 0}, durations: {x: duration, opacity: duration}}
    data.easing = Object_Movement.easeInCirc;
    this.move.startMove(data);

    // Reset Sliding Picture
    this._viewingPictureSlide.x = -(Graphics.width + (this._viewingPicture.width / 2));
    this._viewingPictureSlide.y = Graphics.height / 2

    this.updateShiftToRead(prevPicture);
    // this._viewingPictureSlide.bitmap = ImageManager.loadPicture('%1_%2'.format(this._albumData.group, prevPicture.graphicsName));

    this._viewingPictureSlide.setupBitmaps(ImageManager.loadPicture('%1_%2'.format(this._albumData.group, prevPicture.graphicsName)), ImageManager.loadPicture('%1_%2'.format(this._albumData.group, prevPicture.backGraphicsName)));

    var obj = this._viewingPictureSlide;
    var data = { obj: obj, properties: ['x', 'opacity'], from: {x: obj.x, opacity: obj.opacity}, to: {x: Graphics.width / 2, opacity: 255}, durations: {x: duration, opacity: duration}}
    data.easing = Object_Movement.easeOutCirc;
    data.onFinish = this.onPictureShowFinish.bind(this);
    this.move.startMove(data);
  };
};
//=============================================================================
// * Show Prev Picture
//=============================================================================
Scene_OmoriPhotoAlbum.prototype.onPictureShowFinish = function() {
  // Set Facing to 0
  this._viewingPicture._facing = 0;
  // Set Front & Back Bitmaps
  this._viewingPicture.setupBitmaps(this._viewingPictureSlide._frontBitmap, this._viewingPictureSlide._backBitmap);

  // this._viewingPicture.x = 0;
  // this._viewingPicture.y = 0;
  this._viewingPicture.opacity = 255;
  // this._viewingPicture.x = Graphics.width;
  this._viewingPictureSlide.opacity = 0;;
};
//=============================================================================
// * Determine if Next Viewing Picture Exists
//=============================================================================
Scene_OmoriPhotoAlbum.prototype.nextViewingPictureExists = function() {
  // Get Next Picture
  var nextPicture;
  // Get Max Per Page
  var maxPerPage = this._albumSprite.maxPagePictures();
  // Go Through Pictures
  for (var i = this._viewingIndex + 1; i <= this._albumData.maxImages; i++) {
    // Get Page Index
    var pageIndex = i % maxPerPage;
    // Get Page
    var page = Math.floor(i / maxPerPage);
    // Get Picture
    var picture = this._albumSprite.picture(pageIndex, page);
    // If Picture
    if (picture) {
      // Set Next Picture
      nextPicture = picture;
      break
    };
  };
  // Return Next Picture
  return nextPicture;
};
//=============================================================================
// * Determine if Previous Viewing Picture Exists
//=============================================================================
Scene_OmoriPhotoAlbum.prototype.previousViewingPictureExists = function() {
  // Get Prev Picture
  var prevPicture;
  // Get Max Per Page
  var maxPerPage = this._albumSprite.maxPagePictures();
  // Go Through Pictures
  for (var i = this._viewingIndex - 1; i >= 0; i--) {
    // Get Page Index
    var pageIndex = i % maxPerPage;
    // Get Page
    var page = Math.floor(i / maxPerPage);
    // Get Picture
    var picture = this._albumSprite.picture(pageIndex, page);
    // If Picture
    if (picture) {
      // Set Prev Picture
      prevPicture = picture;
      break
    };
  };
  // Return Previous Picture
  return prevPicture
};



























































//=============================================================================
// ** Sprite_OmoriAlbumPictureCursor
//-----------------------------------------------------------------------------
// This sprite is used to display the picture album.
//=============================================================================
function Sprite_OmoriAlbumPictureCursor() { this.initialize.apply(this, arguments);}
Sprite_OmoriAlbumPictureCursor.prototype = Object.create(Sprite.prototype);
Sprite_OmoriAlbumPictureCursor.prototype.constructor = Sprite_OmoriAlbumPictureCursor;
//=============================================================================
// * Initialize Object
//=============================================================================
Sprite_OmoriAlbumPictureCursor.prototype.initialize = function(data) {
  // Set Album Data
  this._albumData = data;
  // Super Call
  Sprite.prototype.initialize.call(this);
  // Set Picture to null
  this._picture = null;
  // Create Movement Object
  this.move = new Object_Movement();
  // Create Sprites
  this.createSprites();
  // Selected flag
  this._selected = false;
};
//=============================================================================
// * Create Sprites
//=============================================================================
Sprite_OmoriAlbumPictureCursor.prototype.createSprites = function() {
  // Create Shadow Sprite
  this._shadowSprite = new Sprite(ImageManager.loadPicture('photo_shadow'));
  this._shadowSprite.visible = false;
  this.addChild(this._shadowSprite);
  // Create Picture Sprite
  this._pictureSprite = new Sprite();
  this._pictureSprite.x = -15;
  this._pictureSprite.y = -15;
  this.addChild(this._pictureSprite);
};
//=============================================================================
// * Select or Deselect
//=============================================================================
Sprite_OmoriAlbumPictureCursor.prototype.select = function() { this._selected = true; };
Sprite_OmoriAlbumPictureCursor.prototype.deselect = function() { this._selected = false; };
//=============================================================================
// * Frame Update
//=============================================================================
Sprite_OmoriAlbumPictureCursor.prototype.setPictureData = function(picture) {
  // Set Picture Data
  this._picture = picture;
  // If Picture Exists
  if (this._picture) {
    // Set Picture Bitmap
    this.setPictureBitmap(ImageManager.loadPicture('%1_%2'.format(this._albumData.group, picture.thumbnailName)))
  } else {
    // Set Picture Bitmap
    this.setPictureBitmap(null);
  }
};
//=============================================================================
// * Frame Update
//=============================================================================
Sprite_OmoriAlbumPictureCursor.prototype.setPictureBitmap = function(bitmap = null) {
  // Set Picture Sprite Bitmap
  this._pictureSprite.bitmap = bitmap;
  // Set Shadow Sprite Visibility
  this._shadowSprite.visible = bitmap !== null
};
//=============================================================================
// * Frame Update
//=============================================================================
Sprite_OmoriAlbumPictureCursor.prototype.update = function() {
  // Super Call
  Sprite.prototype.update.call(this);
  // Update Move
  this.move.update();
  // Update Selected Animation
  this.updateSelectedAnimation();
};
//=============================================================================
// * Update Selected Animation
//=============================================================================
Sprite_OmoriAlbumPictureCursor.prototype.updateSelectedAnimation = function() {
  // If Selected
  if (this._selected) {
    if ( this._pictureSprite.x > -7) { this._pictureSprite.x = Math.max(this._pictureSprite.x - 1, -7); };
    if ( this._pictureSprite.y > -7) { this._pictureSprite.y = Math.max(this._pictureSprite.y - 1, -7); };
  } else {
    if ( this._pictureSprite.x < 0) { this._pictureSprite.x = Math.min(this._pictureSprite.x + 1, 0); };
    if ( this._pictureSprite.y < 0) { this._pictureSprite.y = Math.min(this._pictureSprite.y + 1, 0); };
  };
};



//=============================================================================
// ** Sprite_OmoriAlbumBigPicture
//-----------------------------------------------------------------------------
// This sprite is used to display a large flippable picture.
//=============================================================================
function Sprite_OmoriAlbumBigPicture() { this.initialize.apply(this, arguments);}
Sprite_OmoriAlbumBigPicture.prototype = Object.create(Sprite.prototype);
Sprite_OmoriAlbumBigPicture.prototype.constructor = Sprite_OmoriAlbumBigPicture;
//=============================================================================
// * Initialize Object
//=============================================================================
Sprite_OmoriAlbumBigPicture.prototype.initialize = function(data) {
  // Super Call
  Sprite.prototype.initialize.call(this);
  // Set Anchor
  this.anchor.set(0.5, 0.5);
  // Set Flipping Values
  this._flipCount = 0;
  this._flipTarget = 0;
  this._facing = 0;
};
//=============================================================================
// * Determine if Flipping
//=============================================================================
Sprite_OmoriAlbumBigPicture.prototype.isFlipping = function() { return this._flipCount > 0; };
//=============================================================================
// * Setup Bitmaps
//=============================================================================
Sprite_OmoriAlbumBigPicture.prototype.setupBitmaps = function(front, back, refresh = true) {
  // Set Front and Back Bitmaps
  this._frontBitmap = front;
  this._backBitmap = back;
  // Set Bitmap
  this.bitmap = this._facing === 0 ? this._frontBitmap : this._backBitmap;
};
//=============================================================================
// * Start Flip
//=============================================================================
Sprite_OmoriAlbumBigPicture.prototype.startFlip = function(facing, duration = 10) {
  // If Facing is not the same as current one
  if (this._facing !== facing) {
    // Set Flipping Values
    this._facing = facing;
    this._flipCount = duration;
    this._flipPhase = 0;
    this._flipTarget = 0;
  };
};
//=============================================================================
// * Start Toggle Flip
//=============================================================================
Sprite_OmoriAlbumBigPicture.prototype.startToggleFlip = function(duration) {
  // Start Flip
  this.startFlip((this._facing + 1) % 2, duration);
};
//=============================================================================
// * Frame Update
//=============================================================================
Sprite_OmoriAlbumBigPicture.prototype.update = function() {
  // Super Call
  Sprite.prototype.update.call(this);
  // Update Flipping Animation
  this.updateFlippingAnimation();
};
//=============================================================================
// * Update Flipping Animation
//=============================================================================
Sprite_OmoriAlbumBigPicture.prototype.updateFlippingAnimation = function() {
  // If Flip count is more than 0.
  if (this._flipCount > 0) {
    var d = this._flipCount;
    var t = this._flipTarget;

    this.scale.x = (this.scale.x * (d - 1) + this._flipTarget) / d;
    // Decrease Flip Count
    this._flipCount--;
    // If Flip count is 0 and flip target is 0
    if (this._flipCount === 0 && this._flipTarget === 0) {
      // Increase Flip Target
      this._flipTarget = (this._flipTarget + 1) % 2
      this.bitmap = this._facing === 0 ? this._frontBitmap : this._backBitmap;
      this._flipCount = 10;
    }
  };
};



//=============================================================================
// ** Sprite_OmoriPictureAlbum
//-----------------------------------------------------------------------------
// This sprite is used to display the picture album.
//=============================================================================
function Sprite_OmoriPictureAlbum() { this.initialize.apply(this, arguments);}
Sprite_OmoriPictureAlbum.prototype = Object.create(Sprite.prototype);
Sprite_OmoriPictureAlbum.prototype.constructor = Sprite_OmoriPictureAlbum;
//=============================================================================
// * Initialize Object
//=============================================================================
Sprite_OmoriPictureAlbum.prototype.initialize = function(data, page = 0) {
  // Super Call
  Sprite.prototype.initialize.call(this);
  // Set Data
  this._albumData = data;
  // Active flag
  this._active = true;
  // Set Index
  this._index = 0;
  // Set Page
  this._page = page;
  // Picture Positions
  this._picturePositions = [[18, 19], [119, 108], [18, 202], [245, 19], [346, 108], [245, 202]];
  // Set Home
  this._home = new Point(0, 0);
  // Picture Object
  this._placingPicture = null;
  // Use Picture Cursor Flag
  this._usePictureCursor = true;
  // Create Movement Object
  this.move = new Object_Movement();
  // Create Background Sprite
  this.createBackgroundSprite();
  // Create Contents Sprite
  this.createContentsSprite();
  // Create Picture Border Sprite
  this.createPictureBorderSprite();
  // Create Page Sprite
  this.createPageSprite();
  // Create Page Legend Sprite
  this.createPageLegendSprite();
  // Create Cursor Sprites
  this.createCursorSprites();
  // // Refresh Page
  this.refreshPage(2);
};
//=============================================================================
// * Max Amount of pages
//=============================================================================
Sprite_OmoriPictureAlbum.prototype.maxPages = function() { return this._albumData.maxPages - 1; };
//=============================================================================
// * Max Amount of pictures per pages
//=============================================================================
Sprite_OmoriPictureAlbum.prototype.maxPagePictures = function() { return 6; };
//=============================================================================
// * Activate & Deactivate
//=============================================================================
Sprite_OmoriPictureAlbum.prototype.activate = function() { this._active = true; this.updateCursorPosition(); };
Sprite_OmoriPictureAlbum.prototype.deactivate = function() { this._active = false; this.updateCursorPosition(); };
//=============================================================================
// * Get Picture Index
//=============================================================================
Sprite_OmoriPictureAlbum.prototype.pictureIndex = function() {
  return (this._page * this.maxPagePictures()) + this._index;
};
//=============================================================================
// * Set Home Position
//=============================================================================
Sprite_OmoriPictureAlbum.prototype.setHome = function(x = this.x, y = this.y) { this._home.set(x, y); };
//=============================================================================
// * Get Picture Data at Index
//=============================================================================
Sprite_OmoriPictureAlbum.prototype.picture = function(index = this._index, page = this._page) {
  // Get Page Index
  var pageIndex = (page * this.maxPagePictures()) + index;
  // Get Item ID
  var itemId = $gameParty.getAlbumPictureAtIndex(this._albumData.group, pageIndex);
  // If Item ID exists
  if (itemId) {
    // Find Item Data in Array
    return this._albumData.albumItems.find(function(item) { return item.id === itemId; })
  };
  // Return Null
  return null;
};
//=============================================================================
// * Set Placing Picture
//=============================================================================
Sprite_OmoriPictureAlbum.prototype.setPlacingPicture = function(picture) {
  // Set Placing Picture
  this._placingPicture = picture;
  // Update Picture Border Visibility
  this.updatePictureBorderVisibility();
};
//=============================================================================
// * Create Background Sprite
//=============================================================================
Sprite_OmoriPictureAlbum.prototype.createBackgroundSprite = function() {
  // Get Filename
  var filename = '%1_%2'.format(this._albumData.group, this._albumData.bookImageName);
  // Create Background Sprite
  this._backgroundSprite = new Sprite(ImageManager.loadPicture(filename));
  this.addChild(this._backgroundSprite);
};
//=============================================================================
// * Create Contents Sprite
//=============================================================================
Sprite_OmoriPictureAlbum.prototype.createContentsSprite = function() {
  // Create Contents Sprite
  this._contentsSprite = new Sprite(new Bitmap(this._backgroundSprite.width, this._backgroundSprite.height));
  this.addChild(this._contentsSprite);
};
//=============================================================================
// * Create Picture Border Sprite
//=============================================================================
Sprite_OmoriPictureAlbum.prototype.createPictureBorderSprite = function() {
  // Create Picture Border Sprite
  this._pictureBorderSprite = new Sprite(ImageManager.loadPicture('puzzle_border'));
  this._pictureBorderSprite._amplitude = 128;
  this._pictureBorderSprite._angle = 0;
  this._pictureBorderSprite._angleSpeed = 0.12;
  this._pictureBorderSprite._delay = 0;

  this._pictureBorderSprite.visible = false;
  this.addChild(this._pictureBorderSprite);
};
//=============================================================================
// * Create Page Sprite
//=============================================================================
Sprite_OmoriPictureAlbum.prototype.createPageSprite = function() {
  // Get Width & Height for pages
  var width = this._contentsSprite.width / 2;
  var height = this._contentsSprite.height;
  // Create Cover Page Sprite
  this._coverPageSprite = new Sprite(new Bitmap(width, height));
  this._coverPageSprite.x = Math.floor(this._backgroundSprite.width / 2);
  this._coverPageSprite.anchor.set(0, 0);
  this.addChild(this._coverPageSprite)
  // Create Page Sprite
  this._pageSprite = new Sprite(new Bitmap(width, height));
  this._pageSprite.x = Math.floor(this._backgroundSprite.width / 2);
  this._pageSprite.opacity = 255;
  this._pageSprite.anchor.set(1, 0);
  this.addChild(this._pageSprite);
};
//=============================================================================
// * Create Cursor Sprites
//=============================================================================
Sprite_OmoriPictureAlbum.prototype.createPageLegendSprite = function() {
  // Create Bitmap
  var bitmap = new Bitmap(this._backgroundSprite.width + 130, 60);
  bitmap.fillAll('rgba(32, 32, 32, 0.5)')
  // bitmap.drawText('←', 5, 20, 40, 32)
  // bitmap.drawText('→', bitmap.width - 35, 20, 40, 32);

  var width = 60//48
  bitmap.fillRect(0, 0, width, bitmap.height, 'rgba(0, 0, 0, 1)')
  bitmap.fillRect(1, 1, width - 2, bitmap.height - 2, 'rgba(255, 255, 255, 1)')
  bitmap.fillRect(4, 4, width - 8, bitmap.height - 8, 'rgba(0, 0, 0, 1)')
  bitmap.fillRect(bitmap.width - width, 0, width, bitmap.height, 'rgba(0, 0, 0, 1)')
  bitmap.fillRect((bitmap.width - width) + 1, 1, width - 2, bitmap.height - 2, 'rgba(255, 255, 255, 1)')
  bitmap.fillRect((bitmap.width - width) + 4, 4, width - 8, bitmap.height - 8, 'rgba(0, 0, 0, 1)')
  bitmap.clearRect(width, 0, bitmap.width - (width * 2), bitmap.height);

  // Draw Input Icons
  bitmap.drawAlginedKeyIcon(Input.inputKeyCode('pageup'), 0, 5, width, 32, 'center')
  bitmap.drawAlginedKeyIcon(Input.inputKeyCode('pagedown'), bitmap.width - width, 5, width, 32, 'center')

  // Create Page Legend Sprite
  this._pageLegendSprite = new Sprite(bitmap);
  this._pageLegendSprite.x = -50 - 15;
  // this._pageLegendSprite.y = (this._backgroundSprite.height - this._pageLegendSprite.height)  / 2;
  // this._pageLegendSprite.y = this._backgroundSprite.height - this._pageLegendSprite.height
  // this._pageLegendSprite.y = -this._pageLegendSprite.height;
  this.addChild(this._pageLegendSprite);
};
//=============================================================================
// * Create Cursor Sprites
//=============================================================================
Sprite_OmoriPictureAlbum.prototype.createCursorSprites = function() {
  // Get Bitmap
  var bitmap = ImageManager.loadSystem('ACSArrows');
  this._cursorSprite = new Sprite_WindowCustomCursor();
  this._cursorSprite.x = -10;
  this._cursorSprite.y = 70;
  // this._cursorSprite.setFrame(32, 0, 32, 29)
  this.addChild(this._cursorSprite);

  // Create Left Page Cursor Sprite
  this._leftPageCursorSprite = new Sprite(bitmap);
  this._leftPageCursorSprite.x = -52;
  this._leftPageCursorSprite.y = 28;
  this._leftPageCursorSprite.setFrame(64, 0, 32, 29);
  this._leftPageCursorSprite.setColorTone([0, 0, 0, 255])
  this.addChild(this._leftPageCursorSprite);

  // Create Right Page Cursor Sprite
  this._rightPageCursorSprite = new Sprite(bitmap);
  this._rightPageCursorSprite.x = 435 + 40;
  this._rightPageCursorSprite.y = this._leftPageCursorSprite.y;
  this._rightPageCursorSprite.setFrame(32, 0, 32, 29);
  this._rightPageCursorSprite.setColorTone([0, 0, 0, 255])
  this.addChild(this._rightPageCursorSprite);

  // Update Page Cursor Visibility
  this.updatePageCursorVisibility();
};
//=============================================================================
// * Make Page Bitmap
//=============================================================================
Sprite_OmoriPictureAlbum.prototype.makePageBitmap = function(side) {
  // Create Bitmap
  var bitmap = new Bitmap(this._pageSprite.width, this._pageSprite.height)
  // Get Contents
  var contents = this._contentsSprite.bitmap;
  // Get Page Bitmap
  var pageBitmap = this._backgroundSprite.bitmap;
  // Get Starting X
  var sx = bitmap.width * side;
  // If Side is 0
  if (side === 0) {
    bitmap.blt(pageBitmap, sx + 2, 2, bitmap.width - 2, bitmap.height - 4, 2, 2);
  } else {
    bitmap.blt(pageBitmap, sx, 2, bitmap.width - 2, bitmap.height - 4, 0, 2);
  };
  // Transfer Contents to bitmap
  bitmap.blt(contents, sx, 0, bitmap.width, bitmap.height, 0, 0);
  // Return Bitmap
  return bitmap;
};
//=============================================================================
// * Refresh Page
//=============================================================================
Sprite_OmoriPictureAlbum.prototype.refreshPage = function(side, page = this._page) {
  // Set Ranges and Page Pics
  var startRange = 0;
  var endRange = 0;
  var pagePics = this.maxPagePictures() / 2;
  // Get contents
  var contents = this._contentsSprite.bitmap;
  var halfWidth = contents.width / 2;
  // Get Filename
  var filename = '%1_%2'.format(this._albumData.group, this._albumData.pageTextImageName + (page + 1));
  // Get Text Bitmap
  var textBitmap = ImageManager.loadPicture(filename);

  // Set Paint Opacity
  contents.paintOpacity = 179;
  // Switch Side Case
  switch (side) {
    case 0: // Left
      startRange = 0; endRange = pagePics;
      contents.clearRect(0, 0, halfWidth, contents.height)
      contents.blt(textBitmap, 0, 0, halfWidth, contents.height, 0, 0)
      break;
    case 1: // Right
      startRange = pagePics; endRange = pagePics * 2;
      contents.clearRect(halfWidth, 0, halfWidth, contents.height)
      contents.blt(textBitmap, halfWidth, 0, halfWidth, contents.height, halfWidth, 0)
      break;
    case 2: // All
      startRange = 0; endRange = pagePics * 2;
      // Clear Bitmap
      contents.clear();
      contents.blt(textBitmap, 0, 0, textBitmap.width, contents.height, 0, 0)
      break;
  };
  // Set Paint Opacity
  contents.paintOpacity = 255;
  // Positions
  var positions = this._picturePositions;
  // Go Through Ranges
  for (var i = startRange; i < endRange; i++) {
    // If Past max index
    if ((page * this.maxPagePictures()) + i > this._albumData.maxImages) { break; };
    // Get Data
    var data = this.picture(i, page);
    // Get Position
    var pos = positions[i];
    // Get X & Y Coordinates
    var x = pos[0], y = pos[1]
    // Get Data
    if (data) {
      // Get Filename
      var filename = '%1_%2'.format(this._albumData.group, data.thumbnailName);
      // Get Bitmap
      var bitmap = ImageManager.loadPicture(filename);
      this._contentsSprite.bitmap.blt(bitmap, 0, 0, bitmap.width, bitmap.height, pos[0], pos[1]);
    } else {
      // this._contentsSprite.bitmap.fillRect(pos[0], pos[1], 86, 101, 'rgba(200, 200, 200, 1)')
    }
  };
};
//=============================================================================
// * Show Picture Border
//=============================================================================
Sprite_OmoriPictureAlbum.prototype.showPictureBorder = function(index = this._index) {
  // Set Picture Border Visibility
  this._pictureBorderSprite.visible = true;
  // Set Picture Border Sprite Position
  this._pictureBorderSprite.x = this._picturePositions[index][0] - 34;
  this._pictureBorderSprite.y = this._picturePositions[index][1] - 46;
  // Reset Angle
  this._pictureBorderSprite._angle = 215//20;
  this._pictureBorderSprite.opacity = 0;
  this._pictureBorderSprite._skipDelay = true;
  // this._pictureBorderSprite._delay = 30;

  this.updatePictureBorder();
};
//=============================================================================
// * Hide Picture Border
//=============================================================================
Sprite_OmoriPictureAlbum.prototype.hidePictureBorder = function() {
  // Set Picture Border Visibility
  this._pictureBorderSprite.visible = false
  this._pictureBorderSprite._delay = 0;
  this._pictureBorderSprite.opacity = 0;
};
//=============================================================================
// * Frame Update
//=============================================================================
Sprite_OmoriPictureAlbum.prototype.update = function() {
  // Super Call
  Sprite.prototype.update.call(this);
  // Update Move
  this.move.update();
  // Update Cursor Input
  this.updateCursorInput();
  // Update Picture Border
  this.updatePictureBorder();
};
//=============================================================================
// * Update Picture Border
//=============================================================================
Sprite_OmoriPictureAlbum.prototype.updatePictureBorder = function() {
  // Get Sprite
  var sprite = this._pictureBorderSprite;

  if (!sprite.visible) { return; }
  if (sprite._delay <= 0) {
    sprite._amplitude = 130
    sprite._angleSpeed = 0.05
    var change = 127 + ((Math.sin(sprite._angle * sprite._angleSpeed) * sprite._amplitude));
    sprite.opacity = change
    sprite._angle = (sprite._angle + 1) % 500;
    if (sprite.opacity <= 0) {

      if (sprite._skipDelay ) {
        sprite._skipDelay = false;
        sprite._delay = 0;
      } else {
        sprite._delay = 120;
      }

      sprite._angle = 100;
    };
  } else {
    // Decrease Sprite Delay
    sprite._delay--;
  };
};
//=============================================================================
// * Update Cursor Input
//=============================================================================
Sprite_OmoriPictureAlbum.prototype.updateCursorInput = function() {
  // Return if nto active
  if (!this._active || this.move.isMoving()) { return; }
  // If Input Page Up is repeated
  if (Input.isRepeated('pageup')) {
    // Turn Page Right
    var oldPage = this._page;
    var page = (this._page - 1).clamp(0, this.maxPages());
    if(oldPage !== page) {this.hidePictureBorder();}
    this.turnPageRight();
    return;
  };
  // If Input Page Down is repeated
  if (Input.isRepeated('pagedown')) {
    // Turn Page Left
    var oldPage = this._page;
    var page = (this._page - 1).clamp(0, this.maxPages());
    if(oldPage !== page) {this.hidePictureBorder();}
    this.turnPageLeft();

    return;
  };
  // If Input Down is repeated
  if (Input.isRepeated('down')) {
    // If Index is 2 or 5
    if (this._index === 2 || this._index >= 5) { return; }
      // Get Page Index
      var pageIndex = (this._page * this.maxPagePictures()) + this._index;
      // If Less Than Max Images
      if (pageIndex < this._albumData.maxImages) {
        // Play cursor
        SoundManager.playCursor();
        // Increase Index
        this._index++;
        // Update Cursor Position
        this.updateCursorPosition();
      };
    return;
  };

  // If Input Up is repeated
  if (Input.isRepeated('up')) {
    // If Index is 0 or 3
    if (this._index === 0 || this._index === 3) { return; }
    // Play Cursor Sound
    SoundManager.playCursor();

    // Decrease Index
    this._index--;

    // Update Cursor Position
    this.updateCursorPosition();
    return;
  };

  // If Input Right is repeated
  if (Input.isRepeated('right')) {
    // Get Page Index
    var pageIndex = (this._page * this.maxPagePictures()) + this._index;
    // If Index is 4
    if (this._index === 4) {
      // Turn Page Left
      this.turnPageLeft();
      return;
    };
    // If Index is less than 3
    if (this._index < 3) {
      // If Less Than Max Images
      if (pageIndex + 3 <= this._albumData.maxImages) {
        // Increase Index
        this._index += 3;
      };
    } else {
      // If Less Than Max Images
      if (this._albumData.maxImages > 4) {
        // Set index to 4
        this._index = 4;
      };
    };
    // Play Cursor Sound
    SoundManager.playCursor();          
    // Update Cursor Position
    this.updateCursorPosition();
    return;
  };

  // If Input Left is repeated
  if (Input.isRepeated('left')) {
    if ([0, 2].contains(this._index)) {
      // Turn Page Right
      this.turnPageRight();
      return;
    };
    // Decrease Index
    this._index -= this._index === 1 ? 1 : 3;
    // Play Cursor Sound
    SoundManager.playCursor();      
    
    // Update Cursor Position
    this.updateCursorPosition();
    return;
  };
};
//=============================================================================
// * Update Cursor Position
//=============================================================================
Sprite_OmoriPictureAlbum.prototype.updateCursorPosition = function() {
  // If Index is 0 or more
  if (this._index >= 0) {
    // Get Position
    var pos = this._picturePositions[this._index % this.maxPagePictures()];
    this._cursorSprite.x = pos[0] - 10;
    this._cursorSprite.y = pos[1] + 55;
    this._cursorSprite.visible = this._usePictureCursor ? false : true;
    // If Picture Cursor
    if (this._pictureCursor) {
      var duration = 15;
      var obj = this._pictureCursor;
      var data = { obj: obj, properties: ['x', 'y'], from: {x: obj.x, y: obj.y}, to: {x: this._home.x + pos[0], y: this._home.y + pos[1] }, durations: {x: duration, y: duration}}
      data.easing = Object_Movement.easeOutCirc;
      this.move.startMove(data);
    };
  };
  // Update Page Cursor Visibility
  this.updatePageCursorVisibility();
  // Set Active State of the cursor
  this._active ? this._cursorSprite.activate() : this._cursorSprite.deactivate();
  this._cursorSprite.setColorTone(this._active ? [0, 0, 0, 0] : [-80, -80, -80, 255]);
  if(!!this.parent) {
    let picture = this.picture();
    this.parent._legendWindow.refresh(!!this.parent.hasComment(picture));
  }
};
//=============================================================================
// * Update Page Cursor Visibility
//=============================================================================
Sprite_OmoriPictureAlbum.prototype.updatePageCursorVisibility = function() {
  // Set Page Cursor Visibility
  // this._leftPageCursorSprite.visible = this._page > 0;
  // this._rightPageCursorSprite.visible = this._page < this.maxPages();
  // Set Active & Inactive Colors
  var activeColor = [0, 0, 0, 0], inactiveColor =[0, 0, 0, 255]
  this._leftPageCursorSprite.setColorTone(this._page > 0 ? activeColor :  inactiveColor);
  this._rightPageCursorSprite.setColorTone(this._page < this.maxPages() ? activeColor : inactiveColor);
};
//=============================================================================
// * Update Picture Border Visibility
//=============================================================================
Sprite_OmoriPictureAlbum.prototype.updatePictureBorderVisibility = function() {
  // Get Picture
  var picture = this._placingPicture;

  if (picture) {
    // Get Max Page Pictures
    var maxPagePics = this.maxPagePictures();
    var startIndex = this._page * maxPagePics
    // Hide Border Flag
    var hideBorder = true;
    // Iterate to Max Page Pictures
    for (var i = 0; i < maxPagePics; i++) {
      // Get Picture ID at position
      var positionId = this._albumData.pictures[startIndex + i];
      // If Position ID matches the picture ID
      if (positionId === picture.id) {
        // Show Picture Border
        this.showPictureBorder(i);
        // Hide Border
        hideBorder = false;
        break;
      };
    };
    // Hide Picture Border
    if (hideBorder) { this.hidePictureBorder(); };
  } else {
    // Hide Picture Border
    this.hidePictureBorder();
  }
};
//=============================================================================
// * Turn Page Right
//=============================================================================
Sprite_OmoriPictureAlbum.prototype.turnPageRight = function() {
  // Get Old Page
  var oldPage = this._page;
  // Set Page
  this._page = (this._page - 1).clamp(0, this.maxPages());
  // Update Cursor Page Visibility
  this.updatePageCursorVisibility();

  // If Old page is not the same as new page
  if (oldPage !== this._page) {
    // Get Bitmaps
    var leftBitmap = this.makePageBitmap(0);
    var rightBitmap = this.makePageBitmap(1);
    // Update Picture Side Graphics
    this.refreshPage(0);
    AudioManager.playSe({name: "SE_turn_page", pan: 0, pitch: 100, volume: 90});
    // Set Page Sprite Anchor
    this._pageSprite.anchor.x = 0;
    // Make Page Bitmap
    this._pageSprite.bitmap = leftBitmap
    // Set Page Sprite scale
    this._pageSprite.anchor.x = 1;
    // Set Cover Page Bitmap
    this._coverPageSprite.bitmap = rightBitmap;
    this._coverPageSprite.anchor.x = 0;

    // Update Picture Side Graphics
    this.refreshPage(2);

    var duration = 20;
    var obj = this._pageSprite;
    var data = { obj: obj, properties: ['scaleX'], from: {scaleX: obj.scaleX}, to: {scaleX: 0}, durations: {scaleX: duration}}
    data.easing = Object_Movement.easeOutCirc;
    this.move.startMove(data);

    data.onFinish = function() {
      var duration = 15;
      var obj = this._pageSprite;
      // Make Page Bitmap
      this._pageSprite.bitmap = this.makePageBitmap(1);
      obj.anchor.x = 0;
      var data = { obj: obj, properties: ['scaleX'], from: {scaleX: obj.scaleX}, to: {scaleX: 1.0}, durations: {scaleX: duration}}
      data.easing = Object_Movement.easeOutCirc;
      this.move.startMove(data);
      // Update Picture Border Visibility
      this.updatePictureBorderVisibility();

      // Run Original Function
      data.onFinish = function() {
        // Set Page Sprite Bitmap to null
        this._pageSprite.bitmap = null;
        this._coverPageSprite.bitmap = null;
      }.bind(this);
    }.bind(this);
  };
};

//=============================================================================
// * Turn Page Left
//=============================================================================
Sprite_OmoriPictureAlbum.prototype.turnPageLeft = function() {
  // Get Old Page
  var oldPage = this._page;
  // Set Page
  this._page = (this._page + 1).clamp(0, this.maxPages());

  // Get Page Index
  var pageIndex = (this._page * this.maxPagePictures()) + this._index;
  if (pageIndex > this._albumData.maxImages) {
    this._index -=  pageIndex % this._albumData.maxImages;
    this.updateCursorPosition();
  };
  // Update Picture Border Visibility
  this.updatePictureBorderVisibility();


  // If Old page is not the same as new page
  if (oldPage !== this._page) {
    // Get Bitmaps
    var leftBitmap = this.makePageBitmap(0);
    var rightBitmap = this.makePageBitmap(1);
    // Set Page Sprite Anchor

    AudioManager.playSe({name: "SE_turn_page", pan: 0, pitch: 100, volume: 90});
    this._pageSprite.anchor.x = 0;
    // Make Page Bitmap
    this._pageSprite.bitmap = rightBitmap
    // Set Page Sprite scale
    this._pageSprite.scale.x = 1;
    // Update Cursor Page Visibility
    this.updatePageCursorVisibility();

    // Set Cover Page Bitmap
    this._coverPageSprite.bitmap = leftBitmap;
    this._coverPageSprite.anchor.x = 1;
    // Update Picture Side Graphics
    this.refreshPage(2);

    var duration = 20;
    var obj = this._pageSprite;
    var data = { obj: obj, properties: ['scaleX'], from: {scaleX: obj.scaleX}, to: {scaleX: 0}, durations: {scaleX: duration}}
    data.easing = Object_Movement.easeOutCirc;
    this.move.startMove(data);

    data.onFinish = function() {
      var duration = 15;
      var obj = this._pageSprite;
      // Make Page Bitmap
      this._pageSprite.bitmap = this.makePageBitmap(0);
      obj.anchor.x = 1;
      var data = { obj: obj, properties: ['scaleX'], from: {scaleX: obj.scaleX}, to: {scaleX: 1.0}, durations: {scaleX: duration}}
      data.easing = Object_Movement.easeOutCirc;
      this.move.startMove(data);
      // Run Original Function
      data.onFinish = function() {
        // Set Page Sprite Bitmap to null
        this._pageSprite.bitmap = null;
        this._coverPageSprite.bitmap = null;
      }.bind(this);
    }.bind(this);
  };
};



//=============================================================================
// ** Window_OmoriAlbumLegend
//-----------------------------------------------------------------------------
// This window displays legend text in the Omori Album scene.
//=============================================================================
function Window_OmoriAlbumLegend() { this.initialize.apply(this, arguments); };
Window_OmoriAlbumLegend.prototype = Object.create(Window_Base.prototype);
Window_OmoriAlbumLegend.prototype.constructor = Window_OmoriAlbumLegend;
//=============================================================================
// * Initialize Object
//=============================================================================
Window_OmoriAlbumLegend.prototype.initialize = function() {
  // Super Call
  Window_Base.prototype.initialize.call(this, -5, -1, this.windowWidth(), this.windowHeight());
  // Set Text List
  this.setTextList('placing');
};
//=============================================================================
// * Settings
//=============================================================================
Window_OmoriAlbumLegend.prototype.windowWidth = function() { return Graphics.width + 10; };
Window_OmoriAlbumLegend.prototype.windowHeight = function() { return 35 };
Window_OmoriAlbumLegend.prototype.standardPadding = function() { return 4; }
//=============================================================================
// * Set Text List
//=============================================================================
Window_OmoriAlbumLegend.prototype.setTextList = function(name) {
  // Set Text List
  this._textList = name;
  // Redraw Contents
  this.refresh();
};
//=============================================================================
// * Refresh
//=============================================================================
Window_OmoriAlbumLegend.prototype.refresh = function(canRead = true) {
  // Clear Contents
  this.contents.clear();
  // Get Width
  var width = this.contents.width;
  // Get Text List
  var textList = LanguageManager.getPluginText('albumMenu', 'legendText')[this._textList];
  // If Text List Exists
  if (textList) {
    // Get Segment Width
    var segmentWidth = Math.floor(this.contents.width / textList.length);
    // Go through text list
    for (var i = 0; i < textList.length; i++) {
      // Get Data
      var data = textList[i];
      if(this._textList.toLowerCase() === "browsing" && i === 0 && !canRead) {continue;}
      var inputRects = data.inputs.map(input => this.contents.keyIconRects(Input.inputKeyCode(input)).up)
      // Get Total Width
      var tw = Math.floor(this.textWidth(data.text)) + 8;
      // Get Icons Width
      var iw = inputRects.reduce(function(r, rect) { return r + (rect.width + 2) }, 0);
      // Get Starting X position
      var sx = (i * segmentWidth) + ((segmentWidth - (tw + iw)) / 2)
      // Draw Header Text
      this.contents.drawText(data.text, sx, -4, tw, this.contents.height);
      // Get Starting Icon X Position
      var ix = sx + tw;
      // Go Through Inputs
      for (var i2 = 0; i2 < data.inputs.length; i2++) {
        // Get Input
        var input = data.inputs[i2];
        this.contents.drawInputIcon(input, ix, 2);
        // Increase Icon X
        ix += inputRects[i2].width;
      };
    };
  };
};



//=============================================================================
// ** Window_OmoriPictureList
//-----------------------------------------------------------------------------
// The window for showing picture items for sorting
//=============================================================================
function Window_OmoriPictureList() { this.initialize.apply(this, arguments); }
Window_OmoriPictureList.prototype = Object.create(Window_Selectable.prototype);
Window_OmoriPictureList.prototype.constructor = Window_OmoriPictureList;
//=============================================================================
// * Object Initialization
//=============================================================================
Window_OmoriPictureList.prototype.initialize = function(data) {
  // Initialize Data
  this._data = [];
  // Set Data
  this._albumData = data;
  // Get Album Spot ID
  this._albumSpotId = null;
  // Super Call
  Window_Selectable.prototype.initialize.call(this, 0, 0, this.windowWidth(), this.windowHeight());
  // Refresh Contents
  this.refresh();
};
//=============================================================================
// * Settings
//=============================================================================
Window_OmoriPictureList.prototype.isUsingCustomCursorRectSprite = function() { return true; };
Window_OmoriPictureList.prototype.standardPadding = function() { return 8; }
Window_OmoriPictureList.prototype.windowWidth = function () { return Graphics.width; };
Window_OmoriPictureList.prototype.windowHeight = function() { return 116 + 15; }
Window_OmoriPictureList.prototype.maxItems = function() { return this._data.length;};
Window_OmoriPictureList.prototype.maxCols = function() { return 5;};
Window_OmoriPictureList.prototype.itemHeight = function() { return 100 + 15; };
Window_OmoriPictureList.prototype.itemWidth = function() { return Window_Selectable.prototype.itemWidth.call(this) - 5 };
Window_OmoriPictureList.prototype.spacing = function() { return 5; };
Window_OmoriPictureList.prototype.customCursorRectXOffset = function() { return -8; }
Window_OmoriPictureList.prototype.customCursorRectYOffset = function() { return -35; }
//=============================================================================
// * Determine if Current Item is enabled
//=============================================================================
Window_OmoriPictureList.prototype.isCurrentItemEnabled = function() {
  return this._data[this.index()] !== undefined;
};
//=============================================================================
// * Refresh Arrows
//=============================================================================
Window_OmoriPictureList.prototype.itemRect = function(index) {
  var rect = Window_Selectable.prototype.itemRect.call(this, index);
  rect.x += 20;
  return rect;
};
//=============================================================================
// * Get Picture
//=============================================================================
Window_OmoriPictureList.prototype.picture = function() { return this._data[this.index()]; };
//=============================================================================
// * Set Spot Picture ID
//=============================================================================
Window_OmoriPictureList.prototype.setSpotPictureID = function(id) {
  this._albumSpotId = id;
  this.refresh();
};
//=============================================================================
// * Select Picture by ID
//=============================================================================
Window_OmoriPictureList.prototype.selectPictureByID = function(id) {
  // Go Through Data
  for (var i = 0; i < this._data.length; i++) {
    // Get Item
    var item = this._data[i];
    // If Item ID matches argument ID
    if (item.id === id) {
      // Select index
      this.select(i);
      break;
    };
  };
};
//=============================================================================
// * Get Picture Cursor X
//=============================================================================
Window_OmoriPictureList.prototype.pictureCursorPosition = function() {
  // Get Item Rect
  var rect = this.itemRect(this.index());
  var padding = this.standardPadding() * 2;
  return new Point(this.x + padding + rect.x + 6, this.y + padding + rect.y - 1);
};
//=============================================================================
// * On Cursr Down
//=============================================================================
Window_OmoriPictureList.prototype.cursorDown = function(wrap) {
  var index = this.index();
  var maxItems = this.maxItems();
  var maxCols = this.maxCols();
  if (index + maxCols > maxItems-1 && this.row() < this.maxRows()-1) {
    this.select(maxItems-1);
    return;
  };
  if (index < maxItems - maxCols || (wrap && maxCols === 1)) {
    this.select((index + maxCols) % maxItems);
    return
  };
};
//=============================================================================
// * Make Item List
//=============================================================================
Window_OmoriPictureList.prototype.makeItemList = function() {
  // Initialize Data
  this._data = [];
  // Get Items
  var items = this._albumData.albumItems;
  // Get Positions
  const positions = $gameParty._albumPicturePositions[this._albumData.group];
  // Go through Items
  for (var i = 0; i < items.length; i++) {
    // Get Item
    var item = items[i];
    // If Album does not have picture
    if (!$gameParty.albumHasPicture(this._albumData.group, item.id)) {
      // Add Item to DAta
      this._data.push(item);
    };
  };
  // Go through data
  this._data.sort(function(a, b) {
    return positions.indexOf(a.id) - positions.indexOf(b.id);
  });

  // // Randomize Item List Positions
  // this.shuffleItemList();
};
//=============================================================================
// * Shuffle Item List
//=============================================================================
Window_OmoriPictureList.prototype.shuffleItemList = function() {
  // // Set Index, Random Index, and Temporary Value
  // let index = 0, randomIndex = 0, tempValue = 0, seed;
  // // Replant THE SEED!
  // $gameSystem.replantMagicalSeed();
  // // Iterate Through Length
  // for (i = this._data.length - 1; i > 0; i -= 1) {
  //   // Get Seed
  //   temp = this._data[i];    
  //   seed = $gameSystem.getMagicalSeed(this._albumData.id);
  //   randomIndex = Math.floor(seed * (i + 1));
  //   this._data[i] = this._data[randomIndex];
  //   this._data[randomIndex] = temp;
  // };
};
//=============================================================================
// * Refresh Arrows
//=============================================================================
Window_OmoriPictureList.prototype._refreshArrows = function() {
  // Run Original Function
  Window_Selectable.prototype._refreshArrows.call(this);
  var w = this._width;
  var h = this._height;
  var p = 28;
  var q = p/2;
  this._downArrowSprite.move(w - q, h - q);
  this._upArrowSprite.move(w - q, q);
};
//=============================================================================
// * Refresh
//=============================================================================
Window_OmoriPictureList.prototype.refresh = function() {
  // Make Item List
  this.makeItemList();
  // Run Original Function
  Window_Selectable.prototype.refresh.call(this);
};
//=============================================================================
// * Clear Selected
//=============================================================================
Window_OmoriPictureList.prototype.clearSelected = function() { this.clearItem(this.index()); };
//=============================================================================
// * Draw Item
//=============================================================================
Window_OmoriPictureList.prototype.drawItem = function(index) {
  // Get Rect
  var rect = this.itemRect(index);
  // Get Data
  var data = this._data[index];
  // Get Filename
  var filename = '%1_%2'.format(this._albumData.group, data.thumbnailName);
  // Get Bitmap
  var bitmap = ImageManager.loadPicture(filename);
  // Get Width & Height
  var width = bitmap.width, height = bitmap.height;
  // Get X & Y
  var x = rect.x + (rect.width - width) / 2;
  var y = rect.y + (rect.height - height) / 2;
  // Transfer Bitmap to contents
  this.contents.blt(bitmap, 0, 0, width, height, x, y);
};

