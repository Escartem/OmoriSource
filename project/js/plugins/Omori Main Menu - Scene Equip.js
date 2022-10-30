//=============================================================================
// ** Scene_OmoMenuEquip
//-----------------------------------------------------------------------------
// The scene class of the equipment screen.
//=============================================================================
function Scene_OmoMenuEquip() { this.initialize.apply(this, arguments); }
Scene_OmoMenuEquip.prototype = Object.create(Scene_OmoMenuBase.prototype);
Scene_OmoMenuEquip.prototype.constructor = Scene_OmoMenuEquip;
//=============================================================================
// * Create
//=============================================================================
Scene_OmoMenuEquip.prototype.create = function() {
  // Super Call
  Scene_OmoMenuBase.prototype.create.call(this);

  // this._back = new Sprite(new Bitma  p(Graphics.width, Graphics.height))
  // this._back.bitmap.fillAll('rgba(255, 255, 255, 1)')
  // this.addChild(this._back);

  // this._center = new Sprite(new Bitmap(Graphics.width, Graphics.height))
  // var spacing = 10;
  // this._center.bitmap.fillRect(0, 0, spacing, Graphics.height, 'rgba(255, 0, 0, 1)')
  // this._center.bitmap.fillRect(this._center.width - spacing, 0, spacing, Graphics.height, 'rgba(255, 0, 0, 1)')
  // this.addChild(this._center)

  this.createHelpWindow();
  this.createCommandWindow();
  this.createStatusWindows();
  // Create Windows  
  this.createActorEquipWindow();
  this.createActorEquipStatusWindow();       
  this.createActorEquipItemWindow();
};
//=============================================================================
// * Initialize Atlas Lists
//=============================================================================
Scene_OmoMenuEquip.prototype.initAtlastLists = function() {
  // Run Original Function
  Scene_OmoMenuBase.prototype.initAtlastLists.call(this);
  // Add Required Atlas
  this.addRequiredAtlas('itemCharms');
  this.addRequiredAtlas('itemWeapon');
};
//=============================================================================
// * Start
//=============================================================================
Scene_OmoMenuEquip.prototype.start = function() {
  // Super Call
  Scene_OmoMenuBase.prototype.start.call(this);
  // Get Actor Index
  var index = this._statusWindow.index();
  // If Index is more than 0
  if (index >= 0) {
    this.showActorEquipWindow(index);
  } else {
    this._statusWindow.select(0);
    this._statusWindow.activate();
  };
  // Set Selected Inxed
  this._selectedIndex = index >= 0 ? index : 0;
};
//=============================================================================
// * Create Status Window
//=============================================================================
Scene_OmoMenuEquip.prototype.createStatusWindows = function() {
  // Super Call
  Scene_OmoMenuBase.prototype.createStatusWindows.call(this);
  this._statusWindow.setHandler('ok', this.onStatusWindowOk.bind(this));
  this._statusWindow.setHandler('cancel', this.onStatusWindowCancel.bind(this));
};
//=============================================================================
// * Create Help Window
//=============================================================================
Scene_OmoMenuEquip.prototype.createHelpWindow = function() {
  // Super Call
  Scene_OmoMenuBase.prototype.createHelpWindow.call(this);
  // Adjust Help Window
  this._helpWindow.width = (Graphics.width - 175);
  this._helpWindow.height = 109;
  this._helpWindow.x = 10;
  this._helpWindow.y = Graphics.height - 244;

  this._helpWindow.createContents();
  this._helpWindow.width = 0;
};
//=============================================================================
// * Create Actor Equip Window
//=============================================================================
Scene_OmoMenuEquip.prototype.createActorEquipWindow = function() {
  // Create Actor Equip Window
  this._actorEquipWindow = new Window_OmoMenuActorEquip();
  this._actorEquipWindow.x = 10
  this._actorEquipWindow.y = Graphics.height;
  this._actorEquipWindow.setHandler('ok', this.onActorEquipWindowOk.bind(this));
  this._actorEquipWindow.setHandler('cancel', this.onActorEquipWindowCancel.bind(this));  
  this._actorEquipWindow.setHelpWindow(this._helpWindow);
  this.addChild(this._actorEquipWindow);
  this._actorEquipWindow.select(0);  
  this._actorEquipWindow.deactivate();
};
//=============================================================================
// * Create Actor Equip Status Window
//=============================================================================
Scene_OmoMenuEquip.prototype.createActorEquipStatusWindow = function() {
  // Create Actor Equip status Window
  this._actorEquipStatus = new Window_OmoMenuEquipStatus();
  this._actorEquipStatus.x = 180//(Graphics.width - this._actorEquipStatus.width) - 11;
  this._actorEquipStatus.y = 66//this._actorEquipWindow.y + this._actorEquipWindow.height;
  this.addChild(this._actorEquipStatus);
  // Set Actor Equip Window Status Window
  this._actorEquipWindow._statusWindow = this._actorEquipStatus;
  this._actorEquipWindow.updateHelp();
};
//=============================================================================
// * Create Actor Equip Item Window
//=============================================================================
Scene_OmoMenuEquip.prototype.createActorEquipItemWindow = function() {
  // Create Actor Equip Item Window
  this._actorEquipItemWindow = new Window_OmoMenuActorEquipItem();
  this._actorEquipItemWindow.x = 0;
  this._actorEquipItemWindow.y = Graphics.height - this._actorEquipItemWindow.height;
  this._actorEquipItemWindow.width = 0;  
  this._actorEquipItemWindow.setHandler('ok', this.onActorEquipItemWindowOk.bind(this));
  this._actorEquipItemWindow.setHandler('cancel', this.onActorEquipItemWindowCancel.bind(this));
  this._actorEquipItemWindow.setHelpWindow(this._helpWindow);
  this._actorEquipItemWindow.setStatusWindow(this._actorEquipStatus);
  this.addChildAt(this._actorEquipItemWindow, 3);
};
//=============================================================================
// * Actor Equip Window - Ok
//=============================================================================
Scene_OmoMenuEquip.prototype.onStatusWindowOk = function() {
  // Update Selected Index
  this._selectedIndex = this._statusWindow.index();
  // Show Actor Equip Window
  this.showActorEquipWindow(this._selectedIndex); 
};
//=============================================================================
// * Actor Equip Window - Cancel
//=============================================================================
Scene_OmoMenuEquip.prototype.onStatusWindowCancel = function() {
  this.popScene();
  this._statusWindow.deselect();
  this._statusWindow.deactivate();
  SceneManager._nextScene._commandWindow = this._commandWindow;
  SceneManager._nextScene._statusWindow = this._statusWindow;    
};
//=============================================================================
// * Actor Equip Window - Ok
//=============================================================================
Scene_OmoMenuEquip.prototype.onActorEquipWindowOk = function() {
  // Get Actor
  var actor = this._actorEquipWindow.actor();
  // Get Slot Id
  var slotId = this._actorEquipWindow.slotIdAtIndex();
  this._actorEquipItemWindow.open();
  this._actorEquipItemWindow.setActor(actor);
  this._actorEquipItemWindow.setSlotId(slotId);
  this._actorEquipItemWindow.select(0);  
  this._actorEquipItemWindow.activate();
  this.showHelpWindow(15);
  this.showItemListWindow(15);
};
//=============================================================================
// * Actor Equip Window - Cancel
//=============================================================================
Scene_OmoMenuEquip.prototype.onActorEquipWindowCancel = function() {
  let index = this._selectedIndex;
  let win = this._statusWindow._statusWindows[index]
  if(!!this._actorEquipWindow.actor()) {
    this._selectedIndex = this._actorEquipWindow.actor().index();
  }
  this.hideActorEquipWindow(this._selectedIndex);
};
//=============================================================================
// * Actor Equip Item Window - Ok
//=============================================================================
Scene_OmoMenuEquip.prototype.onActorEquipItemWindowOk = function() {
  // Get Actor
  var actor = this._actorEquipWindow.actor();
  // Get Slot Id
  var slotId = this._actorEquipWindow.slotIdAtIndex() + 1;
  // If Equipment slot is locked
  if (actor.isEquipTypeLocked(slotId)) {
    SoundManager.playBuzzer();
    this._actorEquipItemWindow.activate();
    return; 
  } else {
    // Play Equip Sound
    SoundManager.playEquip();
    // Equip Item
    actor.changeEquip(slotId - 1, this._actorEquipItemWindow.item());
    this._actorEquipItemWindow.refresh();  
    this._actorEquipItemWindow.activate();
    this._actorEquipStatus.refresh();
    this._actorEquipWindow.refresh();
    this._statusWindow.refresh();
  };
};
//=============================================================================
// * Actor Equip Item Window - Cancel
//=============================================================================
Scene_OmoMenuEquip.prototype.onActorEquipItemWindowCancel = function() {
  this._actorEquipWindow.activate();
  this._actorEquipItemWindow.deselect();
  this._actorEquipStatus.setTempActor(null);
  this.hideItemListWindow(15);
  if (!this._actorEquipWindow.equipmentAtIndex()) {
    this.hideHelpWindow(15);    
  };
};
//=============================================================================
// * On Equip Cursor Change
//=============================================================================
Scene_OmoMenuEquip.prototype.onEquipCursorChange = function() {
  if (this._actorEquipWindow.equipmentAtIndex()) {
    this.showHelpWindow(15);    
  } else {
    this.hideHelpWindow(15);    
  };
};
//=============================================================================
// * Show Item List Window
//=============================================================================
Scene_OmoMenuEquip.prototype.showItemListWindow = function(duration) { 
  // Set Default Duration
  if (duration === undefined) { duration = 15; };  
  // Show Item List Window
  this.showInfoWindow(this._actorEquipItemWindow, duration);    
};
//=============================================================================
// * Hide Item List Window
//=============================================================================
Scene_OmoMenuEquip.prototype.hideItemListWindow = function(duration) { 
  // Set Default Duration
  if (duration === undefined) { duration = 15; };   
  // Hide Item List Window
  this.hideInfoWindow(this._actorEquipItemWindow, duration);    
};
//=============================================================================
// * Show Actor Equip Window
//=============================================================================
Scene_OmoMenuEquip.prototype.showActorEquipWindow = function(index) { 
  // For Refreshing the cursor
  //this._actorEquipWindow.activate();
  this._actorEquipWindow.select(0);
  this._actorEquipWindow.update();
  this._actorEquipWindow.deactivate();

  // On Equip Cursor Change Function
  this._actorEquipWindow._onEquipCursorChange = this.onEquipCursorChange.bind(this);
  // Set Function Index list index
  this.setFunctionListIndex(0);
  // Set Actor Equip Window Index
  this._actorEquipWindow.setActorIndex(index);  
  // Deactivate & selected Status Window
  this._statusWindow.deactivate()  
  this._statusWindow.deselect();

  // Hide All Actors Except The selected one
  this.queue(function() {   
    var windows = this._statusWindow._statusWindows;
    for (var i2 = 0; i2 < windows.length; i2++) {
     this.hideActorStatus(i2);
    };    
    // Show Actor
    this.showActorStatus(index, 10);
    this._statusWindow._statusWindows[index].animateFace(true);

  }.bind(this))  
  this.queue('setWaitMode', 'movement');

  // Get Equipment
  var equip = this._actorEquipWindow.equipmentAtIndex();  
  // Set Duration
  var duration = 15;

  if (index > 0) {
    // Move Actor Window to the First position
    this.queue(function() {   
      // Get Object
      var obj = this._statusWindow._statusWindows[index];
      // Create Movement Data
      var data = { 
        obj: obj,
        properties: ['x', 'y', 'contentsOpacity'], 
        from: {x: obj.x, y: obj.y, contentsOpacity: obj.contentsOpacity},
        to: {x: 10, y: -obj.height, contentsOpacity: 255},
        durations: {x: duration, y: duration, contentsOpacity: duration},
        easing: Object_Movement.easeOutCirc
      };
      this.move.startMove(data);
    }.bind(this))
    this.queue('setWaitMode', 'movement');
  };

  // Move Actor Window up to show equip window
  this.queue(function() {   
    // Get Object
    var obj = this._statusWindow._statusWindows[index];
    // Create Movement Data
    var data = { obj: obj, properties: ['y'], from: {y: obj.y}, to: {y: -244}, durations: {y: duration}, easing: Object_Movement.easeInCirc };
    // Start Move    
    this.move.startMove(data);
    // Get Object
    var obj = this._actorEquipWindow
    // Create Movement Data
    var data = { obj: obj, properties: ['y'], from: {y: obj.y}, to: {y: Graphics.height - this._actorEquipWindow.height}, durations: {y: duration}, easing: Object_Movement.easeInCirc };
    // Start Move    
    this.move.startMove(data);
  }.bind(this))
  this.queue('setWaitMode', 'movement');


  // If Equipment Exists Show help window
  if (equip) { this.queue('showHelpWindow', 15); };
  this.queue('setWaitMode', 'movement');

  // Show Help window
  this.queue(function() {   
    this._actorEquipWindow.activate();
    this._actorEquipStatus.open();
  }.bind(this))

  // Clear Function List Index 
  this.clearFunctionListIndex();
};
//=============================================================================
// * Hide Actor Equip Window
//=============================================================================
Scene_OmoMenuEquip.prototype.hideActorEquipWindow = function(index) {
  // On Equip Cursor Change Function
  this._actorEquipWindow._onEquipCursorChange = null;
  this._statusWindow._statusWindows[index].animateFace(false);
  // Set Function Index list index
  this.setFunctionListIndex(0);

  this._actorEquipStatus.close();
  this.queue('hideHelpWindow', 15)
  this.queue('setWaitMode', 'movement');

  this.queue('startFunctionWait', function() {
    return this._actorEquipStatus.isClosing();
  }.bind(this))

  // Set Duration
  var duration = 15;
  // Move Actor Window to the First position
  this.queue(function() {   
    // Get Object
    var obj = this._statusWindow._statusWindows[index];
    // Create Movement Data
    var data = { obj: obj, properties: ['y'], from: {y: obj.y}, to: {y: -obj.height}, durations: {y: duration}, easing: Object_Movement.easeOutCirc };
    // Start Move    
    this.move.startMove(data);
    // Get Object
    var obj = this._actorEquipWindow
    // Create Movement Data
    var data = { obj: obj, properties: ['y'], from: {y: obj.y}, to: {y: Graphics.height}, durations: {y: duration}, easing: Object_Movement.easeOutCirc };
    // Start Move    
    this.move.startMove(data);
  }.bind(this))

  this.queue('setWaitMode', 'movement');

  // Move Actor Window to their original position
  this.queue(function() {   
    // Get Object
    var obj = this._statusWindow._statusWindows[index];
    // Create Movement Data
    var data = { 
      obj: obj,
      properties: ['x', 'y', 'contentsOpacity'], 
      from: {x: obj.x, y: obj.y, contentsOpacity: obj.contentsOpacity},
      to: {x: obj._originX, y: -obj.height, contentsOpacity: 255},
      durations: {x: duration, y: duration, contentsOpacity: duration},
      easing: Object_Movement.easeInCirc
    };
    this.move.startMove(data);
  }.bind(this))
  this.queue('setWaitMode', 'movement');  

  // Show All Actors Except The selected one
  this.queue(function() {   
    var windows = this._statusWindow._statusWindows;
    for (var i2 = 0; i2 < windows.length; i2++) {
     this.showActorStatus(i2);
    };    
  }.bind(this))  
  this.queue('setWaitMode', 'movement');  

  // Show Help window
  this.queue(function() {   
    this._statusWindow.select(index);
    this._statusWindow.activate();
  }.bind(this))

  this.queue('setWaitMode', 'movement');    

  // Clear Function List Index 
  this.clearFunctionListIndex();
};

















































































































































































//=============================================================================
// ** Window_OmoMenuActorEquip
//-----------------------------------------------------------------------------
// The window for selecting actor equipment change.
//=============================================================================
function Window_OmoMenuActorEquip() { this.initialize.apply(this, arguments); }
Window_OmoMenuActorEquip.prototype = Object.create(Window_Selectable.prototype);
Window_OmoMenuActorEquip.prototype.constructor = Window_OmoMenuActorEquip;
//=============================================================================
// * Object Initialization
//=============================================================================
Window_OmoMenuActorEquip.prototype.initialize = function() {
  // Super Call
  Window_Selectable.prototype.initialize.call(this, 0, 0, this.windowWidth(), this.windowHeight());
  // Actor Index
  this._actorIndex = 0;
  // Deactivate
  this.deactivate();
  // Refresh
  this.refresh();
};
//=============================================================================
// * Settings
//=============================================================================
Window_OmoMenuActorEquip.prototype.isUsingCustomCursorRectSprite = function() { return true; };
Window_OmoMenuActorEquip.prototype.standardPadding = function() { return 0 }
Window_OmoMenuActorEquip.prototype.windowWidth = function() { return 155; }
Window_OmoMenuActorEquip.prototype.windowHeight = function() { return 135; }
Window_OmoMenuActorEquip.prototype.maxItems = function() { return 2; }
Window_OmoMenuActorEquip.prototype.maxCols = function() { return 1; };
Window_OmoMenuActorEquip.prototype.itemHeight = function() { return 26; };
Window_OmoMenuActorEquip.prototype.itemWidth = function() { return this.windowWidth() - 50; };
Window_OmoMenuActorEquip.prototype.spacing = function() { return 0; };
Window_OmoMenuActorEquip.prototype.customCursorRectXOffset = function() { return -35; }
Window_OmoMenuActorEquip.prototype.customCursorRectYOffset = function() { return 10; }
//=============================================================================
// * Get Actor
//=============================================================================
Window_OmoMenuActorEquip.prototype.setActorIndex = function(index) {
  // If Actor index has changed
  if (this._actorIndex !== index) {
    this._actorIndex = index;
    this.refresh();
  };
};
//=============================================================================
// * Get Actor
//=============================================================================
Window_OmoMenuActorEquip.prototype.actor = function() {
  // Return Actor at Index
  return $gameParty.members()[this._actorIndex];
};
//=============================================================================
// * Determine if Current Item is enabled
//=============================================================================
Window_OmoMenuActorEquip.prototype.isCurrentItemEnabled = function(index) {
  // Get Index
  if (index === undefined) { index = this.index(); }
  // Get Actor
  var actor = this.actor();
  // Get Equipped
  var equipped = this.equipmentAtIndex(index);
  // Get Slot ID at index
  const slotIdAtIndex = this.slotIdAtIndex(index);
  // If cannot change equipment
  if (!actor.isEquipChangeOk(slotIdAtIndex)) { return false; };
  // If Equipped return true
  if (equipped) { return true; };
  // Get Equipment
  var list = $gameParty.equipItems();
  // If There are no item
  if (list.length <= 0) { return false; }
  // Get Slot at Index
  var slotId = actor.equipSlots()[slotIdAtIndex];
  // Can Equip Flag
  var canEquip = list.some(function(item) { 
    return item.etypeId === slotId && actor.canEquip(item); 
  })
  // If cannot equip return false
  if (!canEquip) { return false;}
  // Return true by default
  return true;
};
//=============================================================================
// * Get Slot Id at index
//=============================================================================
Window_OmoMenuActorEquip.prototype.slotIdAtIndex = function(index) {
  // Get Index
  if (index === undefined) { index = this.index(); }; 
  // Return Slot Id
  return [0, 1][index];
};
//=============================================================================
// * Get Equipment At Index
//=============================================================================
Window_OmoMenuActorEquip.prototype.equipmentAtIndex = function(index) {
  // Get Index
  if (index === undefined) { index = this.index(); };  
  // Get Actor At Index
  var actor = this.actor();
  // If Actor Exists
  if (actor) {
    // Return Actor Equips slotted at index
    return actor.equips()[this.slotIdAtIndex(index)];
  };
  // Return null
  return null;
};
//=============================================================================
// * Get Item Rect
//=============================================================================
Window_OmoMenuActorEquip.prototype.itemRect = function(index) {
  // Get Item Rect
  var rect = Window_Selectable.prototype.itemRect.call(this, index);
  // Adjust Rect
  // rect.x += 188 
  rect.x += 42;
  rect.y = 26 + (index * 60);
  // Return rect
  return rect;
};
//=============================================================================
// * Refresh
//=============================================================================
Window_OmoMenuActorEquip.prototype.refresh = function() {
  // Run Original Function
  Window_Selectable.prototype.refresh.call(this);
  // Reset Font Settings
  this.resetFontSettings();  
  // Draw Headers
  this.contents.fontSize = 20;
  this.changePaintOpacity(true)  
  this.contents.fillRect(4, 28, this.width - 8, 2, 'rgba(255, 255, 255, 1)');
  this.contents.fillRect(4, 65, this.width - 8, 2, 'rgba(255, 255, 255, 1)'); 
  this.contents.fillRect(4, 90, this.width - 8, 2, 'rgba(255, 255, 255, 1)'); 
  this.drawText(LanguageManager.getPluginText('equipMenu', 'weapon'), 0, -4, this.width, 'center');
  this.drawText(LanguageManager.getPluginText('equipMenu', 'charm'), 0, 58, this.width, 'center');
};
//=============================================================================
// * Draw Item
//=============================================================================
Window_OmoMenuActorEquip.prototype.drawItem = function(index) {
  // Get Rect
  var rect = this.itemRect(index);
  // Get Equipment at index
  var equip = this.equipmentAtIndex(index);
  // Get Text
  var text = equip ? equip.name : '------------'
  // Determine if enabled
  var enabled = this.isCurrentItemEnabled(index);
  if (enabled) {
    this.changePaintOpacity(true);
    this.contents.textColor = 'rgba(255, 255, 255, 1)';    
  } else {
    this.changePaintOpacity(false);    
    this.contents.textColor = 'rgba(140, 140, 140, 1)';    
  };
  // Set Font Size
  this.contents.fontSize = 24;    
  // Draw Text
  this.contents.drawText(text, rect.x, rect.y + 5, rect.width, rect.height);
  this.changePaintOpacity(true)  
};
//=============================================================================
// * Update Help
//=============================================================================
Window_OmoMenuActorEquip.prototype.updateHelp = function() {
  // Run Original Function
  Window_Selectable.prototype.updateHelp.call(this);
  // Set Help Window Item
  this._helpWindow.setItem(this.equipmentAtIndex());
  // If Equip Cursor Change function exists
  if (this._onEquipCursorChange) { this._onEquipCursorChange(); };
  // Set Status Window Actor
  if (this._statusWindow) { this._statusWindow.setActor(this.actor()); };
};



//=============================================================================
// ** Window_OmoMenuEquipStatus
//-----------------------------------------------------------------------------
// The window for show actor status in the equip scene.
//=============================================================================
function Window_OmoMenuEquipStatus() { this.initialize.apply(this, arguments); }
Window_OmoMenuEquipStatus.prototype = Object.create(Window_Base.prototype);
Window_OmoMenuEquipStatus.prototype.constructor = Window_OmoMenuEquipStatus;
//=============================================================================
// * Object Initialization
//=============================================================================
Window_OmoMenuEquipStatus.prototype.initialize = function() {
  // Super Call
  Window_Base.prototype.initialize.call(this, 0, 0, this.windowWidth(), this.windowHeight());
  // Create Bubble Sprites
  this.createBubbleSprites();   
  // Parameters to draw (Use 100+ for Xparam, 200+ For Sparam)
  this._params = [0,1,2, 3, 6, 7, [100, 8]];
  // Set Actor & Temp actor to null
  this._actor = null; this._tempActor = null
  // Set Openness to 0
  this.openness = 0; 
  // Refresh
  this.refresh();
};
//=============================================================================
// * Update Open
//=============================================================================
Window_OmoMenuEquipStatus.prototype.createBubbleSprites = function() {
  // Bubble Sprites Array
  this._bubbleSprites = [];
  // Bubble Positions
  var positions = [[9, -45, 110], [13, -20, 90]]
  // Go Through Positions
  for (var i = 0; i < positions.length; i++) {
    // Get Position
    var pos = positions[i];
    // Create Sprite
    var sprite = new Sprite(this.makeBubbleBitmap(pos[0]))
    sprite.anchor.set(0.5, 0.5);
    sprite.scale.set(0, 0);
    // Set Sprite coordinates
    sprite.x = pos[1]; sprite.y = pos[2];
    sprite._originY = sprite.y
    // Add Sprite to Bubble Sprites
    this._bubbleSprites[i] = sprite;
    this.addChild(sprite);
  }  
};
//=============================================================================
// * Close Window
//=============================================================================
Window_OmoMenuEquipStatus.prototype.close = function() {
  // Super CAll
  Window_Base.prototype.close.call(this);
  // Set Closing Flag to true
  this._closing = true;
};
//=============================================================================
// * Update Open
//=============================================================================
Window_OmoMenuEquipStatus.prototype.updateOpen = function() {
  if (this._opening) {  
    var prevDone = false;
    for (var i = 0; i < this._bubbleSprites.length; i++) {
      // Get Bubble Sprite Sprite
      var sprite = this._bubbleSprites[i];

      if (i === 0 || prevDone) {
        sprite.scale.x = Math.min(sprite.scale.x + 0.2, 1);
        sprite.scale.y = Math.min(sprite.scale.x + 0.2, 1);
      };
      prevDone = sprite.scale.x === 1
    };
    if (prevDone) { this.openness += 32; }
    if (this.isOpen()) {
      this._opening = false;
    }
  }
};
//=============================================================================
// * Update Close
//=============================================================================
Window_OmoMenuEquipStatus.prototype.updateClose = function() {
  if (this._closing) {

    // Decrease Openness
    this.openness -= 32;

    if (this.isClosed()) {
      var prevDone = false;

      for (var i = this._bubbleSprites.length-1; i >= 0; i--) {
        // Get Bubble Sprite Sprite
        var sprite = this._bubbleSprites[i];
        if (i === this._bubbleSprites.length-1 || prevDone) {
          sprite.scale.x = Math.max(sprite.scale.x - 0.2, 0);
          sprite.scale.y = Math.max(sprite.scale.x - 0.2, 0);
        };
        prevDone = sprite.scale.x === 0;
      };
      if (prevDone) { this._closing = false; }      
    }
  }
};
//=============================================================================
// * Make Bubble Bitmap
//=============================================================================
Window_OmoMenuEquipStatus.prototype.makeBubbleBitmap = function(size) {
  // Create Bitmap
  var bitmap = new Bitmap(size * 2, size * 2);
//  bitmap.fillAll('rgba(255, 0, 0, 1)')  
  // Set X & Y
  var x = size, y = size;
  // Draw Circle
  bitmap.drawCircle(x, y, size, 'rgba(0, 0, 0, 1)')
  bitmap.drawCircle(x, y, size - 1, 'rgba(255, 255, 255, 1)');
  bitmap.drawCircle(x, y, size - 3, 'rgba(0, 0, 0, 1)')    
  // Return Bitmap
  return bitmap
};
//=============================================================================
// * Settings
//=============================================================================
Window_OmoMenuEquipStatus.prototype.isUsingCustomCursorRectSprite = function() { return true; };
Window_OmoMenuEquipStatus.prototype.standardOpennessType = function() { return 2;};
Window_OmoMenuEquipStatus.prototype.standardPadding = function() { return 4; }
Window_OmoMenuEquipStatus.prototype.windowWidth = function () { return 237; };
Window_OmoMenuEquipStatus.prototype.windowHeight = function() { return 168; }
//=============================================================================
// * Set Actor
//=============================================================================
Window_OmoMenuEquipStatus.prototype.setActor = function(actor) {
  if (this._actor !== actor) {
    this._actor = actor;
    this.refresh();
  };
};
//=============================================================================
// * Set Temp Actor
//=============================================================================
Window_OmoMenuEquipStatus.prototype.setTempActor = function(tempActor) {
  if (this._tempActor !== tempActor) {
    this._tempActor = tempActor;
    this.refresh();
  };
};
//=============================================================================
// * Get Actor Parameter Value from id
//=============================================================================
Window_OmoMenuEquipStatus.prototype.actorParamValue = function(actor, param) {
  if (param >= 200) {
    return actor.sparam(param - 200);
  } else if (param >= 100 && param < 200) {
    return actor.xparam(param - 100) * 100;
  } else {
    return actor.param(param);
  };
};
//=============================================================================
// * Refresh
//=============================================================================
Window_OmoMenuEquipStatus.prototype.refresh = function() {
  // Clear Contents
  this.contents.clear();
  // Get Actor
  var actor = this._actor;
  // If Actor Exists
  if (actor) {
    // Get Arrow Bitmap
    var bitmap = ImageManager.loadSystem('equip_arrow');  
    // Stats (Use 100+ for Xparam, 200+ For Sparam)
    var stats = this._params;
    // Go Through Stats
    for (var i = 0; i < stats.length; i++) {
      // Get Param Index
      var paramIndex = stats[i];
      var paramSub = Array.isArray(paramIndex) ? paramIndex[1] : null;
      if (paramSub) { paramIndex = paramIndex[0]; }
      // Get First Value
      var value1 = this.actorParamValue(actor, paramIndex);
      // Get Param Name
      var paramName = TextManager.param(paramSub ? paramSub : paramIndex);
      if(paramName.toLowerCase() === "max hp") {paramName = "HEART";}
      if(paramName.toLowerCase() === "max mp") {paramName = "JUICE";}
      this.contents.fontSize = 20;    
      this.drawText(paramName.toUpperCase() + ':', 8, -5 + i * 21, 100)    
      this.drawText(value1, 132, -5 + i * 21, 100)
      this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 173, 13 + i * 21)
      // If Temp Actor Exists
      if (this._tempActor) {
        var value2 = this.actorParamValue(this._tempActor, paramIndex);
        this.resetTextColor();
        if (value1 < value2) {  this.contents.textColor = "#69ff90";}
        if (value1 > value2) {  this.contents.textColor = "#ff2b2b";}        
      } else {
        var value2 = '---';
      }
      this.drawText(value2, 132 + 56, -5 + i * 21, 100)
      this.resetTextColor();      
    };
  };
};
//=============================================================================
// * Frame Update
//=============================================================================
Window_OmoMenuEquipStatus.prototype.update = function() {
  // Super Call
  Window_Base.prototype.update.call(this);
  // Update Bubble Sprites
  this.updateBubbleSprites();
};
//=============================================================================
// * Update Bubble Sprites
//=============================================================================
Window_OmoMenuEquipStatus.prototype.updateBubbleSprites = function() { 
  // If Bubble Sprites Exist
  if (this._bubbleSprites && this.openness > 0) {
    // Go Through Bubble Sprites Array
    for (var i = 0; i < this._bubbleSprites.length; i++) {
      // Get Bubble Sprite Sprite
      var sprite = this._bubbleSprites[i];
      if (i === 0) {
        sprite.y = sprite._originY + 0.5 + (Math.sin(Graphics.frameCount * 0.05) * 5)
      } else {
        sprite.y = sprite._originY + 0.5 - (Math.sin(Graphics.frameCount * 0.05) * 5)
      };
    };
  };
};





//=============================================================================
// ** Window_OmoMenuActorEquipItem
//-----------------------------------------------------------------------------
// The window for selecting equipment for an actor
//=============================================================================
function Window_OmoMenuActorEquipItem() { this.initialize.apply(this, arguments); }
Window_OmoMenuActorEquipItem.prototype = Object.create(Window_ItemList.prototype);
Window_OmoMenuActorEquipItem.prototype.constructor = Window_OmoMenuActorEquipItem;
//=============================================================================
// * Object Initialization
//=============================================================================
Window_OmoMenuActorEquipItem.prototype.initialize = function() {
  // Super Call
  Window_ItemList.prototype.initialize.call(this, 0, 0, this.windowWidth(), this.windowHeight());
  // Init Actor & Slot ID
  this._actor = null; this._slotId = 0;  
  this.deselect(0)
  this.deactivate()
};
//=============================================================================
// * Settings
//=============================================================================
Window_OmoMenuActorEquipItem.prototype.isUsingCustomCursorRectSprite = function() { return true; };
Window_OmoMenuActorEquipItem.prototype.standardPadding = function() { return 4;}
Window_OmoMenuActorEquipItem.prototype.windowWidth = function() { return 170 + 277 + 18; }
Window_OmoMenuActorEquipItem.prototype.windowHeight = function() { return 135; }
Window_OmoMenuActorEquipItem.prototype.maxCols = function() { return 1 +1; };
Window_OmoMenuActorEquipItem.prototype.itemHeight = function() { return 32 + 3 - 3; };
Window_OmoMenuActorEquipItem.prototype.itemWidth = function() { return 160  ; }; //this.windowWidth() - 50
Window_OmoMenuActorEquipItem.prototype.customCursorRectXOffset = function() { return 0; }
Window_OmoMenuActorEquipItem.prototype.customCursorRectYOffset = function() { return 5; }
Window_OmoMenuActorEquipItem.prototype.customCursorRectTextXOffset = function() { return 25; }
Window_OmoMenuActorEquipItem.prototype.isEnabled = function() { return true; };
Window_OmoMenuActorEquipItem.prototype.playOkSound = function() { };
Window_OmoMenuActorEquipItem.prototype.contentsWidth = function() { return this.windowWidth() - this.standardPadding() * 2; };
Window_OmoMenuActorEquipItem.prototype.contentsHeight = function() { return this.windowHeight() - this.standardPadding() * 2; };
//=============================================================================
// * Set Actor
//=============================================================================
Window_OmoMenuActorEquipItem.prototype.setActor = function(actor) {
  // Set Actor
  if (this._actor !== actor) {
    this._actor = actor;
    this.refresh();
  };
};
//=============================================================================
// * Set Slot Id
//=============================================================================
Window_OmoMenuActorEquipItem.prototype.setSlotId = function(slotId) {
  if (this._slotId !== slotId) {
    this._slotId = slotId;
    this.refresh();
  };
};
//=============================================================================
// * Set Status Window
//=============================================================================
Window_OmoMenuActorEquipItem.prototype.setStatusWindow = function(statusWindow) {
  this._statusWindow = statusWindow;
  this.callUpdateHelp();
};
//=============================================================================
// * Determine if item should be included
//=============================================================================
Window_OmoMenuActorEquipItem.prototype.includes = function(item) {
  if (item === null) { return true; }
  if (this._slotId < 0 || item.etypeId !== this._actor.equipSlots()[this._slotId]) {
    return false;
  };
  return this._actor.canEquip(item);
};
//=============================================================================
// * Get Item Rect
//=============================================================================
Window_OmoMenuActorEquipItem.prototype.itemRect = function(index) {
  // Get Item Rect
  var rect = Window_ItemList.prototype.itemRect.call(this, index);
  // // Adjust Rect
  rect.x += 8;
  rect.y += 22;
  // Return rect
  return rect;
};
//=============================================================================
// * Update Arrows
//=============================================================================
Window_OmoMenuActorEquipItem.prototype._updateArrows = function() {
  Window_ItemList.prototype._updateArrows.call(this);
  this._downArrowSprite.visible = this._downArrowSprite.visible && this.x > 10;
  this._upArrowSprite.visible = this._upArrowSprite.visible && this.x > 10;
};
//=============================================================================
// * Refresh Arrows
//=============================================================================
Window_OmoMenuActorEquipItem.prototype._refreshArrows = function() {
  // Super Call
  Window_ItemList.prototype._refreshArrows.call(this);
  var w = this._width;
  var h = this._height;
  var p = 24;
  var q = p/2;
  this._downArrowSprite.move(w - q, h - q);
  this._upArrowSprite.move(w - q, q + 24);
};
//=============================================================================
// * Refresh
//=============================================================================
Window_OmoMenuActorEquipItem.prototype.refresh = function() {
  // Run Original Function
  Window_ItemList.prototype.refresh.call(this);
  // Draw Headers
  this.contents.fontSize = 22;
  this.drawText(LanguageManager.getPluginText('equipMenu', 'replace'), 8, -8, this.contents.width);
};
//=============================================================================
// * Draw Item
//=============================================================================
Window_OmoMenuActorEquipItem.prototype.drawItem = function(index) {
  // Get Rect
  var rect = this.itemRectForText(index);
  // Get Item
  var item = this._data[index]
  // Set Item Text
  var text = item ? item.name : '------------'
  // Set Font Size
  this.contents.fontSize = 24;  
  // Draw Text
  this.contents.drawText(text, rect.x, rect.y, rect.width, rect.height);
};
//=============================================================================
// * Update Help
//=============================================================================
Window_OmoMenuActorEquipItem.prototype.updateHelp = function() {
  // Super Call
  Window_ItemList.prototype.updateHelp.call(this);
  if (this._actor && this._statusWindow) {
    var actor = JsonEx.makeDeepCopy(this._actor);
    actor.forceChangeEquip(this._slotId, this.item());
    this._statusWindow.setTempActor(actor);
  };
};
