//=============================================================================
// ** Scene_OmoMenuItem
//-----------------------------------------------------------------------------
// The scene class of the item menu.
//=============================================================================
function Scene_OmoMenuItem() { this.initialize.apply(this, arguments); }
Scene_OmoMenuItem.prototype = Object.create(Scene_OmoMenuBase.prototype);
Scene_OmoMenuItem.prototype.constructor = Scene_OmoMenuItem;
//=============================================================================
// * Create
//=============================================================================
Scene_OmoMenuItem.prototype.create = function() {
  // Super Call
  Scene_OmoMenuBase.prototype.create.call(this);
  // Create Windows
  this.createItemConfirmationWindow();
  this.createItemTrashPromptWindow();
  this.createHelpWindow();
  this.createStatusWindows();
  this.createCategoryWindow();
  this.createItemListWindow();
  this.createCommandWindow();
};
//=============================================================================
// * Determine if Busy
//=============================================================================
Scene_OmoMenuItem.prototype.isBusy = function() {
  if (this.move.isMoving()) { return true; }
  return Scene_OmoMenuBase.prototype.isBusy.call(this);
};
//=============================================================================
// * Start
//=============================================================================
Scene_OmoMenuItem.prototype.start = function() {
  // Super Call
  Scene_OmoMenuBase.prototype.start.call(this);
  this.queue('showWindow', this._itemCategoryWindow, 15)
  this.queue('setWaitMode', 'movement');
  // Show Command Window
  this.queue(function() {
    this._itemCategoryWindow.activate();
  }.bind(this))
};
//=============================================================================
// * Create Status Window
//=============================================================================
Scene_OmoMenuItem.prototype.createStatusWindows = function() {
  // Super Call
  Scene_OmoMenuBase.prototype.createStatusWindows.call(this);
  this._statusWindow._okSoundEnabled = false;
  this._statusWindow.setHandler('ok', this.onStatusWindowOk.bind(this));
  this._statusWindow.setHandler('cancel', this.onStatusWindowCancel.bind(this));
  this._statusWindow.refresh();
};
//=============================================================================
// * Create Help Window
//=============================================================================
Scene_OmoMenuItem.prototype.createHelpWindow = function() {
  // Super Call
  Scene_OmoMenuBase.prototype.createHelpWindow.call(this);
  // Adjust Help Window
  this._helpWindow.width = 384
  this._helpWindow.height = 90
  this._helpWindow.x = 10;
  this._helpWindow.y = 64;
  this._helpWindow._hideY = 64;
  this._helpWindow._hideHeight = 0;
  this._helpWindow._showY = 108;
  this._helpWindow._showHeight = 90;
  this._helpWindow.createContents();
  this._helpWindow.height = 0;
  this._helpWindow._iconRate = 0.75;
};
//=============================================================================
// * Create Category Window
//=============================================================================
Scene_OmoMenuItem.prototype.createCategoryWindow = function() {
  // Create Item Category Window
  this._itemCategoryWindow = new Window_OmoMenuItemCategory();
  this._itemCategoryWindow.x = 10 ;
  this._itemCategoryWindow.y = 20;

  this._itemCategoryWindow._hideY = 20;
  this._itemCategoryWindow._hideHeight = this._itemCategoryWindow.height;
  this._itemCategoryWindow._showY = 64;
  this._itemCategoryWindow._showHeight = this._itemCategoryWindow.height;
  this._itemCategoryWindow.update();
  this._itemCategoryWindow.deactivate();
  this._itemCategoryWindow.setHandler('ok', this.onItemCategoryOk.bind(this));
  this._itemCategoryWindow.setHandler('cancel', this.onItemCategoryCancel.bind(this));
  this.addChild(this._itemCategoryWindow);
};
//=============================================================================
// * Create Item List Window
//=============================================================================
Scene_OmoMenuItem.prototype.createItemListWindow = function() {
  // Create Item List Window
  this._itemListWindow = new Window_OmoMenuItemList();
  this._itemListWindow.x = 394;
  this._itemListWindow.y = 0;
  this._itemListWindow.height = 0;
  this._itemListWindow.openness = 255;
  this._itemListWindow._hideY = 0;
  this._itemListWindow._hideHeight = 0;
  this._itemListWindow._showY = 64;
  this._itemListWindow._showHeight = this._itemListWindow.windowHeight();
  this._itemListWindow.setHandler('ok', this.onItemListOk.bind(this));
  this._itemListWindow.setHandler('cancel', this.onItemListCancel.bind(this));
  this._itemListWindow.setHelpWindow(this._helpWindow);
  this._itemCategoryWindow._itemWindow = this._itemListWindow;
  this._itemCategoryWindow.callUpdateHelp();
  this.addChild(this._itemListWindow);
};
//=============================================================================
// * Create Item Confirmation Window
//=============================================================================
Scene_OmoMenuItem.prototype.createItemConfirmationWindow = function() {
  // Create Item Confirmation Window
  this._itemComfirmationWindow = new Window_OmoMenuItemConfirmation();
  this._itemComfirmationWindow.x = 10;
  this._itemComfirmationWindow.y = 198 - this._itemComfirmationWindow.height;
  this._itemComfirmationWindow._hideY = 198 -  this._itemComfirmationWindow.height;
  this._itemComfirmationWindow._hideHeight = this._itemComfirmationWindow.height;
  this._itemComfirmationWindow._showY = 198;
  this._itemComfirmationWindow._showHeight = this._itemComfirmationWindow.height
  this._itemComfirmationWindow.openness = 255;
  this._itemComfirmationWindow.visible = false;
  this._itemComfirmationWindow.setHandler('use', this.onItemConfirmationUse.bind(this));
  this._itemComfirmationWindow.setHandler('trash', this.onItemConfirmationTrash.bind(this));
  this._itemComfirmationWindow.setHandler('cancel', this.onItemConfirmationCancel.bind(this));
  this.addChild(this._itemComfirmationWindow);
};
//=============================================================================
// * Create Item Trash Prompt Window
//=============================================================================
Scene_OmoMenuItem.prototype.createItemTrashPromptWindow = function() {
  // Create Item Trash Prompt Window
  this._itemTrashPromptWindow = new Window_OmoMenuItemTrashPromptWindow();
  this._itemTrashPromptWindow.x = this._itemComfirmationWindow.x + this._itemComfirmationWindow.width;
  this._itemTrashPromptWindow.y = 198 - this._itemTrashPromptWindow.height;

  this._itemTrashPromptWindow._hideY = 198 -  this._itemTrashPromptWindow.height;
  this._itemTrashPromptWindow._hideHeight = this._itemTrashPromptWindow.height;
  this._itemTrashPromptWindow._showY = 198;
  this._itemTrashPromptWindow._showHeight = this._itemTrashPromptWindow.height
  this._itemTrashPromptWindow.openness = 255;
  this._itemTrashPromptWindow.visible = false;


  this._itemTrashPromptWindow.setHandler('ok', this.onItemTrashPromptOk.bind(this));
  this._itemTrashPromptWindow.setHandler('cancel', this.onItemTrashPromptCancel.bind(this));
  this.addChild(this._itemTrashPromptWindow);
};
//=============================================================================
// * Item
//=============================================================================
Scene_OmoMenuItem.prototype.item = function() { return this._itemListWindow.item(); };
//=============================================================================
// * User
//=============================================================================
Scene_OmoMenuItem.prototype.user = function() {
  var members = $gameParty.movableMembers();
  var bestActor = members[0];
  var bestPha = 0;
  for (var i = 0; i < members.length; i++) {
    if (members[i].pha > bestPha) {
      bestPha = members[i].pha;
      bestActor = members[i];
    };
  };
  return bestActor;
};
//=============================================================================
// * Play Sound for Item
//=============================================================================
Scene_OmoMenuItem.prototype.playSeForItem = function() {
  SoundManager.playUseItem();
};
//=============================================================================
// * Item Category - Ok
//=============================================================================
Scene_OmoMenuItem.prototype.onItemCategoryOk = function() {
  // this._itemListWindow.open();
  // this._itemListWindow.activate();
  // this._itemListWindow.select(0)
  // this._helpWindow.open();
  // Show Item & Help Window
  this.queue(function() {
    this._itemListWindow.select(0);
    // Reset Height so when the window is recreated it will have properly sized contents
    this._itemListWindow.height = this._itemListWindow.windowHeight();
    this._itemListWindow.resetScroll()
    this._itemListWindow.refresh();
    this._itemListWindow.height = 0;
    this._itemListWindow.updateHelp();
    this.showWindow(this._helpWindow, 15);
    this.showWindow(this._itemListWindow, 15)
  }.bind(this))
  this.queue('setWaitMode', 'movement');
  // Show Command Window
  this.queue(function() {
    this._itemListWindow.activate();
  }.bind(this))
};
//=============================================================================
// * Item Category - Cancel
//=============================================================================
Scene_OmoMenuItem.prototype.onItemCategoryCancel = function() {
  this._statusWindow.deselect();
  this._statusWindow.deactivate();

  this.queue('hideWindow', this._itemCategoryWindow, 15)
  this.queue('setWaitMode', 'movement');
  // Show Command Window
  this.queue(function() {
    this.popScene();
    SceneManager._nextScene._commandWindow = this._commandWindow;
    SceneManager._nextScene._statusWindow = this._statusWindow;
  }.bind(this))
};
//=============================================================================
// * Item List - Ok
//=============================================================================
Scene_OmoMenuItem.prototype.onItemListOk = function() {

  this._itemComfirmationWindow.select(0);
  this._itemComfirmationWindow.setItem(this._itemListWindow.item());
  this._itemComfirmationWindow.visible = true;
  this.queue('showWindow', this._itemComfirmationWindow, 15);

  this.queue('setWaitMode', 'movement');
  // Show Command Window
  this.queue(function() {
    this._itemComfirmationWindow.activate();
  }.bind(this))
};
//=============================================================================
// * Item List - Cancel
//=============================================================================
Scene_OmoMenuItem.prototype.onItemListCancel = function() {
  // Wait (For Trash and Confirm windows in case they're moving)
  this.queue('setWaitMode', 'movement');
  // Show Item & Help Window
  this.queue(function() {
    this._itemTrashPromptWindow.visible = false;
    this._itemComfirmationWindow.visible = false;
    this.hideWindow(this._helpWindow, 15);
    this.hideWindow(this._itemListWindow, 15);
  }.bind(this))
  this.queue('setWaitMode', 'movement');
  // Show Command Window
  this.queue(function() {
    // Activate Item
    this._itemCategoryWindow.activate();
  }.bind(this))
};
//=============================================================================
// * Item Confirmation - Use
//=============================================================================
Scene_OmoMenuItem.prototype.onItemConfirmationUse = function() {
  // Get Item
  var item = this.item();
  let noTarget = !!item.meta["NoTarget"];
  let BeforeApplyEval = item.meta["BeforeApplyEval"];
  // If Item is a bestiary
  if (item.meta.Bestiary) {
    SceneManager.push(Scene_OmoriBestiary);
    return;
  };
  // If Item is a book
  if (item.meta.AlbumGroup) {
    SceneManager.push(Scene_OmoriPhotoAlbum);
    SceneManager.prepareNextScene($dataItems[item.id], 1);
    return;
  };
  this.queue('hideWindow', this._itemComfirmationWindow, 15);
  this.queue('setWaitMode', 'movement');
  // Show Command Window
  this.queue(function() {
    this._itemComfirmationWindow.visible = false;
    // Get Commands Text
    var text = LanguageManager.getPluginText('itemMenu', 'itemUse').confirm;
    // Get Text Index
    var textIndex = item ? item.meta.ItemCommandTextIndex ? Number(item.meta.ItemCommandTextIndex) : 0 : 0;
    // If Item is for all
    if(!!BeforeApplyEval) {
      eval(BeforeApplyEval.trim());
    }
    if(!!noTarget) {return this.onStatusWindowOk()}
    if (this.isItemForAll()) {
      this._statusWindow.setCursorText(text.all[textIndex]);
      this._statusWindow.setCursorAll(true);
    } else {
      this._statusWindow.setCursorText(text.single[textIndex]);
      this._statusWindow.setCursorAll(false);
    };
    this._statusWindow.select(0);
    this._statusWindow.activate();
  }.bind(this))
};
//=============================================================================
// * Item Confirmation - Trash
//=============================================================================
Scene_OmoMenuItem.prototype.onItemConfirmationTrash = function() {
  this._itemTrashPromptWindow.select(1);
  this._itemTrashPromptWindow.visible = true;
  this.queue('showWindow', this._itemTrashPromptWindow, 15);
  this.queue('setWaitMode', 'movement');
  // Show Command Window
  this.queue(function() {
    this._itemTrashPromptWindow.activate();
  }.bind(this))
};
//=============================================================================
// * Item Confirmation - Cancel
//=============================================================================
Scene_OmoMenuItem.prototype.onItemConfirmationCancel = function() {
  // this._itemComfirmationWindow.close();
  this._itemListWindow.refresh();
  // Get Item Count
  var itemCount = this._itemListWindow.maxItems();
  // If Item count is more than 0
  if (itemCount > 0) {
    this.queue('hideWindow', this._itemComfirmationWindow, 15);
    this.queue('setWaitMode', 'movement');
    // Show Command Window
    this.queue(function() {
      this._itemComfirmationWindow.visible = false;
      this._itemListWindow.activate();
      this._itemListWindow.selectAvailable();
    }.bind(this))
  } else {
    this._itemTrashPromptWindow.close();
    this._itemComfirmationWindow.close();
    this._itemListWindow.close();
    this._itemCategoryWindow.refresh();
    this._itemCategoryWindow.activate();
    this._helpWindow.close();
  };
};
//=============================================================================
// * Item Trash Prompt - Ok
//=============================================================================
Scene_OmoMenuItem.prototype.onItemTrashPromptOk = function() {
  // Get Item
  var item = this.item();
  // Lose Item
  this.queue('wait', 10);
  this.queue(() => AudioManager.playSe({ name: "GEN_multi1", volume: 90, pitch: 100, pan: 0}))
  this.queue('wait', 20);
  this.queue(() => {
    $gameParty.loseItem(item, 1, false);
    // If there's no items left
    if ($gameParty.numItems(item) <= 0) {
      // this._itemTrashPromptWindow.close();
      // this._itemComfirmationWindow.close();
      this._itemListWindow.refresh()
      // Get Item Count
      var itemCount = this._itemListWindow.maxItems();
      // If Item count is more than 0
      if (itemCount > 0) {
        this.hideWindow(this._itemTrashPromptWindow, 15);
        this.hideWindow(this._itemComfirmationWindow, 15);
        this._itemListWindow.activate();
        this._itemListWindow.selectAvailable()
      } else {
  
        this._helpWindow.contents.clear();
        this._itemCategoryWindow.refresh();
  
        // Wait for Movement
        this.queue('setWaitMode', 'movement');
        // Hide Windows
        this.queue(function() {
          this.hideWindow(this._itemTrashPromptWindow, 15);
          this.hideWindow(this._itemComfirmationWindow, 15);
        }.bind(this))
        this.queue('setWaitMode', 'movement');
        // Hide Windows
        this.queue(function() {
          this._itemTrashPromptWindow.visible = false;
          this._itemComfirmationWindow.visible = false;
          this.hideWindow(this._itemListWindow, 15);
          this.hideWindow(this._helpWindow, 15);
        }.bind(this));
        // Show Command Window
        this.queue(function() {
          this._itemCategoryWindow.activate();
        }.bind(this))
      };
    } else {
      this.hideWindow(this._itemTrashPromptWindow, 15);
      this._itemListWindow.refresh();
      // this._itemTrashPromptWindow.close();
      this._itemComfirmationWindow.activate();
    };
  })

};
//=============================================================================
// * Item Trash Prompt - Cancel
//=============================================================================
Scene_OmoMenuItem.prototype.onItemTrashPromptCancel = function() {
  this.queue('hideWindow', this._itemTrashPromptWindow, 15);
  this.queue('setWaitMode', 'movement');
  // Show Command Window
  this.queue(function() {
    this._itemTrashPromptWindow.visible = false;
    this._itemComfirmationWindow.activate();
  }.bind(this))
};
//=============================================================================
// * Status Window - Ok
//=============================================================================
Scene_OmoMenuItem.prototype.onStatusWindowOk = function() {
  // Get ITem
  var item = this.item();
  // If Item Can be used
  if (this.canUse()) {
    // Use Item
    this.useItem();
    if (item.animationId === 212) {
      AudioManager.playSe({ name: "BA_Heart_Heal", volume: 90, pitch: 100, pan: 0});
    } else if (item.animationId === 213) {
      AudioManager.playSe({ name: "BA_heal_juice", volume: 90, pitch: 100, pan: 0});
    } else if (item.animationId === 114) {
      AudioManager.playSe({ name: "BA_Heart_Heal", volume: 90, pitch: 100, pan: 0});
    }
    //this.playSeForItem();
    // Redraw Current Item
    this._itemListWindow.refresh();
    // Get Item Count
    var itemCount = $gameParty.numItems(item);
    // If Item Count is 0 or less
    if (itemCount <= 0) {
      // Refresh Item List Window
      this._itemListWindow.refresh();
      // Get Max Item Count
      var maxCount = this._itemListWindow.maxItems();
      // If Item count is more than 0
      if (maxCount > 0) {
        this._itemListWindow.selectAvailable();
        this._statusWindow.setCursorAll(false);
        this._statusWindow.deselect();
        this._statusWindow.deactivate();
        this._itemListWindow.refresh();
        this._itemListWindow.activate();
      } else {
        this._statusWindow.setCursorAll(false);
        this._statusWindow.deselect();
        this._statusWindow.deactivate();
        this._helpWindow.contents.clear();
        this._itemCategoryWindow.refresh();
        // Wait for Movement
        this.queue('setWaitMode', 'movement');
        // Hide Windows
        this.queue(function() {
          this.hideWindow(this._itemListWindow, 15);
          this.hideWindow(this._helpWindow, 15);
        }.bind(this))
        this.queue('setWaitMode', 'movement');
        // Show Command Window
        this.queue(function() {
          this._itemCategoryWindow.activate();
        }.bind(this))
      };
      return;
    }
  } else {
    // Play Buzzer Sound
    SoundManager.playBuzzer();
  }
  // Activate Status Window
  this._statusWindow.activate();
};
//=============================================================================
// * Status Window - Cancel
//=============================================================================
Scene_OmoMenuItem.prototype.onStatusWindowCancel = function() {
  this._statusWindow.setCursorAll(false);
  this._statusWindow.deselect();
  this._itemListWindow.activate();
};


//=============================================================================
// * Show Window
//=============================================================================
Scene_OmoMenuItem.prototype.showWindow = function(obj, duration, newData) {
  // Create Movement Data
  var data = {
    obj: obj,
    properties: ['y', 'height'],
    from: {y: obj.y, height: obj.height},
    to: { y: obj._showY, height: obj._showHeight},
    durations: {y: duration, height: duration},
    easing: Object_Movement.easeOutCirc,
  };
  if (newData) { Object.assign(data, newData); };
  this.move.startMove(data);
};
//=============================================================================
// * Hide Window
//=============================================================================
Scene_OmoMenuItem.prototype.hideWindow = function(obj, duration, newData) {
  // Create Movement Data
  var data = {
    obj: obj,
    properties: ['y', 'height'],
    from: {y: obj.y, height: obj.height},
    to: { y: obj._hideY, height: obj._hideHeight},
    durations: {y: duration, height: duration},
    easing: Object_Movement.easeInCirc,
  };
  if (newData) { Object.assign(data, newData); };
  this.move.startMove(data);
};






















































































//=============================================================================
// ** Window_OmoMenuItemCategory
//-----------------------------------------------------------------------------
// The window for selecting item categories in the item menu
//=============================================================================
function Window_OmoMenuItemCategory() { this.initialize.apply(this, arguments); }
Window_OmoMenuItemCategory.prototype = Object.create(Window_Command.prototype);
Window_OmoMenuItemCategory.prototype.constructor = Window_OmoMenuItemCategory;
//=============================================================================
// * Settings
//=============================================================================
Window_OmoMenuItemCategory.prototype.isUsingCustomCursorRectSprite = function() { return true; };
Window_OmoMenuItemCategory.prototype.standardPadding = function() { return 10; }
Window_OmoMenuItemCategory.prototype.windowWidth = function() { return 384; }
Window_OmoMenuItemCategory.prototype.maxCols = function() { return 3; };
Window_OmoMenuItemCategory.prototype.lineHeight = function() { return 24; };
Window_OmoMenuItemCategory.prototype.standardFontSize = function() { return LanguageManager.getMessageData("XX_BLUE.Window_OmoMenuItemCategory").standardFontSize; };
Window_Selectable.prototype.customCursorRectYOffset = function() { return 4; }
Window_OmoMenuItemCategory.prototype.customCursorRectTextXOffset = function() { return 25; }
//=============================================================================
// * Make Command List
//=============================================================================
Window_OmoMenuItemCategory.prototype.makeCommandList = function() {
  // Get Commands Text
  var text = LanguageManager.getPluginText('itemMenu', 'categories')
  // Add Commands
  this.addCommand(text[0], 'consumables', $gameParty.hasConsumableItems());
  this.addCommand(text[1], 'toys', $gameParty.hasToyItems());
  this.addCommand(text[2], 'important', $gameParty.hasKeyItems());
};
//=============================================================================
// * Item Rect
//=============================================================================
Window_OmoMenuItemCategory.prototype.itemRect = function(index) {
  // Get rect
  var rect = Window_Command.prototype.itemRect.call(this, index);
  rect.width += 20;
  rect.y -= 3;
  // If Index 1 (For Visual centering)
  if (index === 1) { rect.x += 5 };
  // Return Rect
  return rect;
};
//=============================================================================
// * Call Update Help
//=============================================================================
Window_OmoMenuItemCategory.prototype.callUpdateHelp = function() {
  // Run Original Function
  Window_Command.prototype.callUpdateHelp.call(this);
  if (this.active && this._itemWindow) {
    // Set Item Window Category
    this._itemWindow.setCategory(this.currentSymbol());
  };
};



//=============================================================================
// ** Window_OmoMenuItemList
//-----------------------------------------------------------------------------
// The window for selecting equipment for an actor
//=============================================================================
function Window_OmoMenuItemList() { this.initialize.apply(this, arguments); }
Window_OmoMenuItemList.prototype = Object.create(Window_ItemList.prototype);
Window_OmoMenuItemList.prototype.constructor = Window_OmoMenuItemList;
//=============================================================================
// * Object Initialization
//=============================================================================
Window_OmoMenuItemList.prototype.initialize = function() {
  // Super Call
  Window_ItemList.prototype.initialize.call(this, 0, 0, this.windowWidth(), this.windowHeight());
  // Set Category
  this.setCategory('consumables');
  this.deselect(0)
  this.deactivate()
  this.openness = 0;
};
//=============================================================================
// * Settings
//=============================================================================
Window_OmoMenuItemList.prototype.isUsingCustomCursorRectSprite = function() { return true; };
Window_OmoMenuItemList.prototype.standardPadding = function() { return 4;}
Window_OmoMenuItemList.prototype.windowWidth = function() { return 383 - 147; }
Window_OmoMenuItemList.prototype.windowHeight = function() { return 144 - 10; }
Window_OmoMenuItemList.prototype.maxCols = function() { return 1; };
Window_OmoMenuItemList.prototype.itemHeight = function() { return 26; };
Window_OmoMenuItemList.prototype.itemWidth = function() { return 200; };
//Window_OmoMenuItemList.prototype.spacing = function() { return 14; };
Window_OmoMenuItemList.prototype.customCursorRectXOffset = function() { return -2; }
Window_OmoMenuItemList.prototype.isEnabled = function() { return true; };
Window_OmoMenuItemList.prototype.customCursorRectTextXOffset = function() { return 24; }
Window_OmoMenuItemList.prototype.contentsWidth = function() { return this.windowWidth() - this.standardPadding() * 2; };
Window_OmoMenuItemList.prototype.contentsHeight = function() { return this.windowHeight() - this.standardPadding() * 2; };
//=============================================================================
// * Set Category
//=============================================================================
Window_OmoMenuItemList.prototype.setCategory = function(category) {
  // If Category has changed
  if (this._category !== category) {
    this._category = category;
    this.refresh();
  };
};
//=============================================================================
// * Determine if item should be included
//=============================================================================
Window_OmoMenuItemList.prototype.includes = function(item) {
  // If Item Exists and it's an item
  if (item && DataManager.isItem(item)) {
    if (item.meta.HideInMenu) { return false; };
    switch (this._category) {
    case 'consumables': return DataManager.isConsumableItem(item);
    case 'toys':        return DataManager.isToyItem(item);
    case 'important':   return DataManager.isKeyItem(item);
    };
  };
  return false;
};
//=============================================================================
// * Make Item List
//=============================================================================
Window_OmoMenuItemList.prototype.makeItemList = function() {
  // Run Original Function
  Window_ItemList.prototype.makeItemList.call(this);
  // Sort list
  this._data.sort(function(a, b) {
    var indexA = a.meta.ListIndex === undefined ? a.id : Number(a.meta.ListIndex);
    var indexB = b.meta.ListIndex === undefined ? b.id : Number(b.meta.ListIndex);
    // console.log(a, indexA);
    // console.log(b, indexB)
    return indexA - indexB;
  });
  if(this._category === "important") {
    this._data.sort((a,b) => {
      let priorityA = !!a.meta["ItemPriority"] ? parseInt(a.meta["ItemPriority"]) : 0;
      let priorityB = !!b.meta["ItemPriority"] ? parseInt(b.meta["ItemPriority"]) : 0;
      return priorityB - priorityA;
    })
  }
};
//=============================================================================
// * Get Item Rect
//=============================================================================
Window_OmoMenuItemList.prototype.itemRect = function(index) {
  // Get Item Rect
  var rect = Window_ItemList.prototype.itemRect.call(this, index);
  // Adjust Rect
  rect.x += 12;
  rect.y += 8;
  // Return rect
  return rect;
};
//=============================================================================
// * Refresh Arrows
//=============================================================================
Window_OmoMenuItemList.prototype._refreshArrows = function() {
  // Super Call
  Window_ItemList.prototype._refreshArrows.call(this);
  var w = this._width;
  var h = this._height;
  var p = 24;
  var q = p/2;
  this._downArrowSprite.move(w - q, h - q);
  this._upArrowSprite.move(w - q, q);
};


Window_OmoMenuItemList.prototype._updateArrows = function() {
  Window.prototype._updateArrows.call(this);
  this._downArrowSprite.visible = this._downArrowSprite.visible && !!this.active;
  this._upArrowSprite.visible = this._upArrowSprite.visible && !!this.active;
};
//=============================================================================
// * Clear Item
//=============================================================================
Window_OmoMenuItemList.prototype.clearItem = function(index) {
  var rect = this.itemRect(index);
  this.contents.clearRect(rect.x, rect.y, rect.width + 5, rect.height);
};
//=============================================================================
// * Draw Item
//=============================================================================
Window_OmoMenuItemList.prototype.drawItem = function(index) {
  // Get Rect
  var rect = this.itemRectForText(index);
  // Get Item
  var item = this._data[index]
  // If Item
  if (item) {
    // Set Font Size
    this.contents.fontSize = LanguageManager.getMessageData("XX_BLUE.Window_OmoMenuItemList").drawItem_contents_fontsize;
    rect.width -= 20;
    // Draw Text
    this.contents.drawText(item.name, rect.x, rect.y, rect.width, rect.height);
    rect.width += 5
    const loc_position = LanguageManager.getMessageData("XX_BLUE.Window_OmoMenuItemList").drawItem_drawText_position;
    this.contents.drawText('x' + $gameParty.numItems(item), eval(loc_position[0]), eval(loc_position[1]), rect.width, rect.height);
  };
};


//=============================================================================
// ** Window_OmoMenuItemConfirmation
//-----------------------------------------------------------------------------
// The window for selection actions to perform for items in the item menu.
//=============================================================================
function Window_OmoMenuItemConfirmation() { this.initialize.apply(this, arguments); }
Window_OmoMenuItemConfirmation.prototype = Object.create(Window_Command.prototype);
Window_OmoMenuItemConfirmation.prototype.constructor = Window_OmoMenuItemConfirmation;
//=============================================================================
// * Object Initialization
//=============================================================================
Window_OmoMenuItemConfirmation.prototype.initialize = function() {
  // Super Call
  Window_Command.prototype.initialize.call(this, 0, 0);
  this.deactivate();
  this.openness = 0;
  // Set Item to null
  this.setItem(null);
};
//=============================================================================
// * Settings
//=============================================================================
Window_OmoMenuItemConfirmation.prototype.isUsingCustomCursorRectSprite = function() { return true; };
Window_OmoMenuItemConfirmation.prototype.standardPadding = function() { return 5; }
Window_OmoMenuItemConfirmation.prototype.windowWidth = function() { return 115; }
Window_OmoMenuItemConfirmation.prototype.windowHeight = function() { return 68; }
Window_OmoMenuItemConfirmation.prototype.lineHeight = function() { return 24; };
Window_OmoMenuItemConfirmation.prototype.standardFontSize = function() { return LanguageManager.getMessageData("XX_BLUE.Window_OmoMenuItemConfirmation").standardFontSize; };
Window_OmoMenuItemConfirmation.prototype.spacing = function() { return 0; };
Window_OmoMenuItemConfirmation.prototype.customCursorRectTextXOffset = function() { return 30; }
//=============================================================================
// * Set Item
//=============================================================================
Window_OmoMenuItemConfirmation.prototype.setItem = function(item) {
  // Set Item
  if (item !== this._item) { this._item = item; this.refresh(); }
};
//=============================================================================
// * Make Command List
//=============================================================================
Window_OmoMenuItemConfirmation.prototype.makeCommandList = function() {
  // Get Item
  var item = this._item;
  var enableUse   = item ? this.parent.canUse($gameParty.members()) : false;
  var enableTrash = item ? !DataManager.isKeyItem(item) : false;
  // Get Commands Text
  var text = LanguageManager.getPluginText('itemMenu', 'itemUse').commands;
  // Get Text Index
  var textIndex = item ? item.meta.ItemCommandTextIndex ? Number(item.meta.ItemCommandTextIndex) : 0 : 0;
  // Add Commands
  this.addCommand(text[0][textIndex], 'use', enableUse);
  this.addCommand(text[1], 'trash', enableTrash);
};



//=============================================================================
// ** Window_OmoMenuItemTrashPromptWindow
//-----------------------------------------------------------------------------
// This Window is used to show a prompt for trashing items
//=============================================================================
function Window_OmoMenuItemTrashPromptWindow() { this.initialize.apply(this, arguments); }
Window_OmoMenuItemTrashPromptWindow.prototype = Object.create(Window_Command.prototype);
Window_OmoMenuItemTrashPromptWindow.prototype.constructor = Window_OmoMenuItemTrashPromptWindow;
//=============================================================================
// * Initialize Object
//=============================================================================
Window_OmoMenuItemTrashPromptWindow.prototype.initialize = function() {
  // Super Call
  Window_Command.prototype.initialize.call(this, 0, 0);
  // Prompt Text
  this._promptText = LanguageManager.getPluginText('itemMenu', 'itemTrash').text;
  // Refresh Contents
  this.refresh();
  this.openness = 0;
  this.deactivate();
};
//=============================================================================
// * Settings
//=============================================================================
Window_OmoMenuItemTrashPromptWindow.prototype.isUsingCustomCursorRectSprite = function() { return true; };
Window_OmoMenuItemTrashPromptWindow.prototype.windowHeight   = function() { return 84 - 16; };
Window_OmoMenuItemTrashPromptWindow.prototype.windowWidth    = function() { return 125 + 50; };
Window_OmoMenuItemTrashPromptWindow.prototype.maxCols = function() { return 2; };
Window_OmoMenuItemTrashPromptWindow.prototype.spacing = function() { return 0; };
Window_OmoMenuItemTrashPromptWindow.prototype.standardPadding = function() { return 0; };
Window_OmoMenuItemTrashPromptWindow.prototype.itemHeight = function() { return 20; };
Window_OmoMenuItemTrashPromptWindow.prototype.itemWidth = function() { return 75 + 10; };
Window_OmoMenuItemTrashPromptWindow.prototype.standardFontSize = function() { return LanguageManager.getMessageData("XX_BLUE.Window_OmoMenuItemTrashPromptWindow").standardFontSize; };
//=============================================================================
// * Make Command List
//=============================================================================
Window_OmoMenuItemTrashPromptWindow.prototype.makeCommandList = function() {
  // Get Commands Text
  var text = LanguageManager.getPluginText('itemMenu', 'itemTrash').commands;
  this.addCommand(text[0],  'yes');
  this.addCommand(text[1],  'cancel');
};
//=============================================================================
// * Refresh
//=============================================================================
Window_OmoMenuItemTrashPromptWindow.prototype.refresh = function() {
  // Super Call
  Window_Command.prototype.refresh.call(this);
  this.drawText(this._promptText, 0, 0, this.contents.width, 'center');
};
//=============================================================================
// * Get Item Rect
//=============================================================================
Window_OmoMenuItemTrashPromptWindow.prototype.itemRect = function(index) {
  var rect = Window_Command.prototype.itemRect.call(this, index);
//  rect.x += 10;
  rect.y += this.lineHeight() - 5;
  return rect;
};
//=============================================================================
// * Get Item Rect For Text
//=============================================================================
Window_OmoMenuItemTrashPromptWindow.prototype.itemRectForText = function(index) {
  var rect = this.itemRect(index);
  rect.x += eval(LanguageManager.getMessageData("XX_BLUE.Window_OmoMenuItemTrashPromptWindow").itemRectForText_rectx);
  rect.y -= 10;
  rect.width -= this.textPadding() * 2;
  return rect;
};
