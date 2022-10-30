//=============================================================================
// TDS Atlas Loader
// Version: 1.3
//=============================================================================
// Add to Imported List
var Imported = Imported || {} ; Imported.TDS_AtlasLoader = true;
// Initialize Alias Object
var _TDS_ = _TDS_ || {} ; _TDS_.AtlasLoader = _TDS_.AtlasLoader || {};
//=============================================================================
 /*:
 * @plugindesc
 * Atlas loading BETA.
 *
 * @author TDS
 *
 */
//=============================================================================



//=============================================================================
// ** SceneManager
//-----------------------------------------------------------------------------
// The static class that manages scene transitions.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.AtlasLoader.SceneManager_isCurrentSceneBusy = SceneManager.isCurrentSceneBusy;
//=============================================================================
// * Determine if Current scene is busy
//=============================================================================
SceneManager.isCurrentSceneBusy = function() {
  // Return true if
  if (this._scene && this._nextScene) {
    // If Not all atlases are loaded return true
    if (!this._nextScene.areAllRequiredAtlasLoaded()) { return true; }
  };
  // Return Original Function
  return _TDS_.AtlasLoader.SceneManager_isCurrentSceneBusy.call(this);
};




//=============================================================================
// ** AtlasManager
//-----------------------------------------------------------------------------
// This static class is used to handle bitmap fonts
//=============================================================================
function AtlasManager() { throw new Error('This is a static class'); }
//=============================================================================
// * Determine if Atlas has Data for key
//=============================================================================
AtlasManager.hasAltasData = function(key) {
  if ($atlasData) { return $atlasData.source[key] !== undefined; }
  return false;
};
//=============================================================================
// * Get Image Atlas Name
//=============================================================================
AtlasManager.getImageAtlasName = function(key) {
  // If Atlas key Exists
  if (this.hasAltasData(key)) {
    // Return Atlas name
    return $atlasData.source[key].atlasName;
  };
  // Return false
  return false;
};
//=============================================================================
// * Initialize Atlas Data
//=============================================================================
AtlasManager.initAtlasData = function() {
  // If Atlas is undefined
  if (window['$atlasData'] === undefined) {
    var path = require('path');
    var fs = require('fs');
    var yaml = require('./js/libs/js-yaml-master')
    var base = path.dirname(process.mainModule.filename);
    // Get Folder
    var folder = '/img/atlases/';
    // Get FilePath
    var filePath = base + folder;
    // Get Directory List
    var dirList = fs.readdirSync(filePath);
    // Get Atlas File
    var data = yaml.safeLoad(fs.readFileSync(base + '/data/Atlas.yaml', 'utf8'));
    // Set Atlas Data
    window['$atlasData'] = data;
  };
};
//=============================================================================
// * Make Bitmap
//=============================================================================
AtlasManager.makeBitmap = function(key) {
  // Get Data
  var data = $atlasData.source[key];
  // Get Data
  if (data) {
    // Get Function
    var func = data.makeFunction;
    // If Creation Function Exists
    if (data.makeFunction) {
      // Return Atlas Creation Function
      return AtlasManager[func.name](func.arguments);
    } else {
      // Create Bitmap
      var bitmap = new Bitmap(data.rect.width, data.rect.height);
      // Get Atlas Bitmap
      var atlasBitmap = ImageManager.loadAtlas(data.atlasName);
      atlasBitmap.addLoadListener(() => {
        let sr = data.sourceRect;
        if(!atlasBitmap.isReady()) {bitmap.fillAll('rgba(0, 255, 0, 1)')}
        else {bitmap.blt(atlasBitmap, sr.x, sr.y, sr.width, sr.height, data.rect.x, data.rect.y);}
      })
      // Check if Atlas bitmap is ready
      /*if (atlasBitmap.isReady()) {
        // Get Source Rect
        var sr = data.sourceRect;
        // Block Transfer
        bitmap.blt(atlasBitmap, sr.x, sr.y, sr.width, sr.height, data.rect.x, data.rect.y);
      } else {
        // Make Bitmap green if atlas is not loaded
        if ($gameTemp.isPlaytest()) {
                // Make Bitmap green if atlas is not loaded
                bitmap.fillAll('rgba(0, 255, 0, 1)');
        }
      };*/
      // Return bitmap
      return bitmap;
    };
  };
  // Return Empty Bitmap
  return ImageManager.loadEmptyBitmap();
};
//=============================================================================
// * Make WindowSkin
//=============================================================================
AtlasManager.makeWindowSkin = function() {
  // Create Bitmap
  var bitmap = new Bitmap(192, 192);
  // Get Atlas Bitmap
  var atlasBitmap =  ImageManager.loadAtlas('Atlas1');

  // Fill Background Color
  bitmap.fillRect(0, 0, 96, 96, 'rgba(0, 255, 0, 1)')

  // Transfer Border
  var cw = 10, ch = 10
  bitmap.blt(atlasBitmap, 0, 0, cw, ch, 96, 0);
  bitmap.blt(atlasBitmap, 10, 0, cw, ch, 96 + 96 - cw, 0);
  bitmap.blt(atlasBitmap, 0, 10, cw, ch, 96, 96 - ch);
  bitmap.blt(atlasBitmap, 10, 10, cw, ch, 96 + 96 - cw, 96 - ch);

  bitmap.blt(atlasBitmap, 11, 0, 1, ch, 96 + cw, 0, 96 - (cw *2))
  bitmap.blt(atlasBitmap, 11, 10, 1, ch, 96 + cw, 96 - ch, 96 - (cw *2))
  bitmap.blt(atlasBitmap, 0, 11, cw, 1, 96, ch, cw, 96 - (ch *2))
  bitmap.blt(atlasBitmap, 0, 11, cw, 1, 96 + 96 - 5, ch, cw, 96 - (ch *2))

  // Transfer Colors
  for (var i = 0; i < 32; i++) {
    var px = (i % 20);
    var py = 20 + Math.floor(i / 20);
    var color = atlasBitmap.getPixel(px, py);
    var dx = 96 + (i % 8) * 12;
    var dy = 144 + Math.floor(i / 8) * 12;
    bitmap.fillRect(dx, dy, 12, 12, color);
  }
  // Return Bitmap
  return bitmap;
};
//=============================================================================
// * Purge All Atlas Images
//=============================================================================
AtlasManager.purgeAllAtlasImages = function(name) {
  // Get Atlas Images
  const altasImages = Object.entries($atlasData.source).filter(arr => arr[1].atlasName === name);
  // Go through atlas images
  for (var i = 0; i < altasImages.length; i++) {
    // Get Key
    const key = altasImages[i][0];
    // Delete Cache Item
    delete ImageManager._imageCache._items[key];
  };
};
//=============================================================================
// * Load System Atlas Images
//=============================================================================
AtlasManager.loadSystemAtlasImages = function() {
  // // If Atlas is undefined
  // if (window['$atlasData'] === undefined) {

  //   // Get Atlas File
  //   var data = yaml.safeLoad(fs.readFileSync(base + '/data/Atlas.yaml', 'utf8'));
  //   // Set Atlas Data
  //   window['$atlasData'] = data;
  // };
  // // Load All Atlas Images
  // this.loadAllAtlasImages();

};
//=============================================================================
// * Load All Atlas Images
//=============================================================================
AtlasManager.loadAllAtlasImages = function() {
  var path = require('path');
  var fs = require('fs');
  var yaml = require('./js/libs/js-yaml-master')
  var base = path.dirname(process.mainModule.filename);
  // Get Folder
  var folder = '/img/atlases/';
  // Get FilePath
  var filePath = base + folder;
  // Get Directory List
  var dirList = fs.readdirSync(filePath);
  // // If Atlas is undefined
  // if (window['$atlasData'] === undefined) {
  //   // Get Atlas File
  //   var data = yaml.safeLoad(fs.readFileSync(base + '/data/Atlas.yaml', 'utf8'));
  //   // Set Atlas Data
  //   window['$atlasData'] = data;
  // };
  // Go Through Directory
  for (var i = 0; i < dirList.length; i++) {
    // Get Directory
    var directory = dirList[i];
    // Get Format
    var format = path.extname(dirList[i]);
    // Get Filename
    var filename = path.basename(directory, format);
    // If an image
    if (format === '.png') {
      // Load Atlas
      ImageManager.loadAtlas(filename)
    };
  };
};

// Initialize Atlas Data
//AtlasManager.initAtlasData()



//=============================================================================
// ** ImageManager
//-----------------------------------------------------------------------------
// The static class that loads images, creates bitmap objects and retains them.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.AtlasLoader.ImageManager_loadNormalBitmap    = ImageManager.loadNormalBitmap;
_TDS_.AtlasLoader.ImageManager_requestNormalBitmap = ImageManager.requestNormalBitmap
_TDS_.AtlasLoader.ImageManager_loadBitmap          = ImageManager.loadBitmap;
_TDS_.AtlasLoader.ImageManager_reserveBitmap       = ImageManager.reserveBitmap;
//=============================================================================
// * Load Atlas Image
//=============================================================================
ImageManager.loadAtlas = function(filename, hue) { return this.reserveBitmap('img/atlases/', filename, hue, false, 'atlas'); };
//=============================================================================
// * Load Atlas Bitmap
//=============================================================================
ImageManager.loadAtlasBitmap = function(filename) {
  return this.reserveNormalBitmap(filename, 0, 'atlas');
};
//=============================================================================
// * Load Atlas Key Bitmap
//=============================================================================
ImageManager.loadAtlasKeyBitmap = function(key) {
  // Get Decoded Key
  var dkey = decodeURIComponent(key);
  // If Atlas manager has key
  if (AtlasManager.hasAltasData(dkey)) {
    // Get Bitmap
    var bitmap = this._imageCache.get(key);
    // If There's no bitmap and there's atlas data for it
    if (!bitmap) {
      // Make Bitmap
      bitmap = AtlasManager.makeBitmap(dkey);
      bitmap.smooth = false;
      // Add to Image Cache
      this._imageCache.add(key, bitmap);
      // Return Bitmap
      return bitmap;
    };
    // Return Bitmap
    return bitmap;
  };
  // Return null
  return null;
};
//=============================================================================
// * Load Bitmap
//=============================================================================
ImageManager.loadBitmap = function(folder, filename, hue, smooth) {
  // If Filename is valid
  if (filename) {
    // Get Path
    var path = folder + encodeURIComponent(filename) + '.png';
    // Get Atlas Key Bitmap
    var bitmap = this.loadAtlasKeyBitmap(path);
    // Return bitmap if not null
    if (bitmap !== null) { return bitmap; };
  };
  // Return Original Function
  return _TDS_.AtlasLoader.ImageManager_loadBitmap.call(this, folder, filename, hue, smooth);
};
//=============================================================================
// * Reserve Bitmap
//=============================================================================
ImageManager.reserveBitmap = function(folder, filename, hue, smooth, reservationId) {
  // If Filename is valid
  if (filename) {
    // Get Path
    var path = folder + encodeURIComponent(filename) + '.png';
    // Get Atlas Key Bitmap
    var bitmap = this.loadAtlasKeyBitmap(path);
    // Return bitmap if not null
    if (bitmap !== null) { return bitmap; };
  };
  // Return Original Function
  return _TDS_.AtlasLoader.ImageManager_reserveBitmap.call(this, folder, filename, hue, smooth, reservationId);
};
//=============================================================================
// * Load Normal Bitmap
//=============================================================================
ImageManager.loadNormalBitmap = function(path, hue) {
  // Get Atlas Key Bitmap
  var bitmap = this.loadAtlasKeyBitmap(path);
  // Return bitmap if not null
  if (bitmap !== null) { return bitmap; };
  // Return Original Function
  return _TDS_.AtlasLoader.ImageManager_loadNormalBitmap.call(this, path, hue);
};
//=============================================================================
// * Request Normal Bitmap
//=============================================================================
ImageManager.requestNormalBitmap = function(path, hue){
  // Get Atlas Key Bitmap
  var bitmap = this.loadAtlasKeyBitmap(path);
  // Return bitmap if not null
  if (bitmap !== null) { return bitmap; };
  // Return Original Function
  return _TDS_.AtlasLoader.ImageManager_requestNormalBitmap.call(this, path, hue);
};


// Load All Atlas Images (Yes for some reason it needs to be just here to work)
// AtlasManager.loadAllAtlasImages();
AtlasManager.loadSystemAtlasImages()


//=============================================================================
// ** Scene_Boot
//-----------------------------------------------------------------------------
// The scene class for initializing the entire game.
//=============================================================================
// * Determine if Scene is Busy
//=============================================================================
Scene_Boot.prototype.isBusy = function() {
  // If Image Manager is not ready return true
  if (!ImageManager.isReady()) {return true; }
  // Super Call
  return Scene_Base.prototype.isBusy.call(this);
};



//=============================================================================
// ** Scene_Base
//-----------------------------------------------------------------------------
// The Superclass of all scene within the game.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.AtlasLoader.Scene_Base_initialize = Scene_Base.prototype.initialize;
_TDS_.AtlasLoader.Scene_Base_terminate = Scene_Base.prototype.terminate
//=============================================================================
// * Determine if Scene is Busy
//=============================================================================
Scene_Base.prototype.initialize = function() {
  // Load Reserved Bitmaps
  this.loadReservedBitmaps();
  // Run Original Function
  _TDS_.AtlasLoader.Scene_Base_initialize.call(this);
  // Initialize Atlas List
  this.initAtlastLists();
  // Load Required Atlas Images
  this.loadRequiredAtlasImages();
};
//=============================================================================
// * Terminate the scene before switching to a another scene.
//=============================================================================
Scene_Base.prototype.terminate = function() {
  // Run Original Function
  _TDS_.AtlasLoader.Scene_Base_terminate.call(this);
  // Dump Required Atlases
  this.dumpRequiredAtlas();
}
//=============================================================================
// * Load Reserved Bitmaps
//=============================================================================
Scene_Base.prototype.loadReservedBitmaps = function() {};
//=============================================================================
// * Initialize Atlas Lists
//=============================================================================
Scene_Base.prototype.initAtlastLists = function() {
  // List of Atlases require for the scene to start
  this._requiredAtlasList = [];
  // List of Atlases to dump when scene is done
  this._dumpAtlasList = []
  // All Atlas Loaded Flag
  this._allAtlasLoaded = false;
};
//=============================================================================
// * Add Required Atlas
//=============================================================================
Scene_Base.prototype.addRequiredAtlas = function(name, dump = true) {
  // If Required Atlast list does not contain name
  if (!this._requiredAtlasList.contains(name)) {
    // Add it to required atlas list
    this._requiredAtlasList.push(name);
  };
  // If Dump and Dump atlas list does not contain name
  if (dump && !this._dumpAtlasList.contains(name)) {
    // Add it to dump atlas list
    this._dumpAtlasList.push(name);
   };
};
//=============================================================================
// * Load Required Atlas Images
//=============================================================================
Scene_Base.prototype.loadRequiredAtlasImages = function() {
  // Go Through Required Atlas List
  for (var i = 0; i < this._requiredAtlasList.length; i++) {
    ImageManager.loadAtlas(this._requiredAtlasList[i]);
  };
};
//=============================================================================
// * Dump Required Atlas Images
//=============================================================================
Scene_Base.prototype.dumpRequiredAtlas = function() {
  // Initialize Dump List
  var dumpList = this._dumpAtlasList.clone();
  // Get Next Scene
  var nextScene = SceneManager._nextScene;
  // If Next Scene Exists
  if (nextScene) {
    // Get Required Atlas List from Next Scene
    var nextRequiredAtlasList = nextScene._requiredAtlasList;
    // Go through required Atlas list
    for (var i = 0; i < nextRequiredAtlasList.length; i++) {
      // Get Index in dump list
      var index = dumpList.indexOf(nextRequiredAtlasList[i]);
      // Remove fro Dump list if it exists
      if (index >= 0) { dumpList.splice(index, 1); };
    };
  };
  // Go Through Dump List
  for (var i = 0; i < dumpList.length; i++) {
    // Get Atlas Name
    var atlasName = dumpList[i];
    // Get Atlas Key
    var key = 'img/atlases/' + atlasName + '.png:0'
    // Delete Cache Item
    delete ImageManager._imageCache._items[key];
  };
};
//=============================================================================
// * Check if all required atlases are loaded
//=============================================================================
Scene_Base.prototype.areAllRequiredAtlasLoaded = function() {
  // If Atlas loading has not started return false
  if (this._allAtlasLoaded) { return true; }
  // Set Loaded Flag
  var loaded = true;
  // Go Through Required Atlas List
  for (var i = 0; i < this._requiredAtlasList.length; i++) {
    // Get Bitmap
    var bitmap = ImageManager.loadAtlas(this._requiredAtlasList[i]);
    // If Bitmap Loading state is not loaded
    if (bitmap._loadingState !== 'loaded') {
      // Set loaded flag to false
      loaded = false;
      break
    };
  };
  // Set Loaded flag to false
  if (!ImageManager.isReady()) { loaded = false; }
  // If Loaded set All Atlas loaded flag to true
  if (loaded) { this._allAtlasLoaded = true; };
  // Return loaded flag
  return loaded;
};
