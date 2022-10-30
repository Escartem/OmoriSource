//=============================================================================
// TDS Omori Item Shop
// Version: 1.1
//=============================================================================
// Add to Imported List
var Imported = Imported || {} ; Imported.TDS_OmoriItemShop = true;
// Initialize Alias Object
var _TDS_ = _TDS_ || {} ; _TDS_.OmoriItemShop = _TDS_.OmoriItemShop || {};
//=============================================================================
 /*:
 * @plugindesc
 * Omori Item Shop
 *
 * @author TDS
 *
 */
//=============================================================================


//=============================================================================
// ** Game_Temp
//-----------------------------------------------------------------------------
// The game object class for temporary data that is not included in save data.
//=============================================================================
// Alias Listing
//=============================================================================
_TDS_.OmoriItemShop.Game_Temp_initialize = Game_Temp.prototype.initialize;
//=============================================================================
// * Object Initialization
//=============================================================================
Game_Temp.prototype.initialize = function() {
  // Run Original Function
  _TDS_.OmoriItemShop.Game_Temp_initialize.call(this);
  // Clear Shop Data
  this.clearShopData();
};
//=============================================================================
// * Clear Shop Data
//=============================================================================
Game_Temp.prototype.clearShopData = function() {
  // Clear Shop Data
  this._shopData = {name: "", shopType: 0, goods: []};
};



//=============================================================================
// ** Game_Interpreter
//-----------------------------------------------------------------------------
// The interpreter for running event commands.
//=============================================================================
// * Setup Shop
//=============================================================================
Game_Interpreter.prototype.setupShop = function(name, type = 0) {
  // Clear Shop Data
  $gameTemp.clearShopData();
    // Get Data
  var data = $gameTemp._shopData;
  // Get Default Text
  var text = LanguageManager.getPluginText('itemShopMenu', 'defaultText');
  // Get Shop keeper
  var shopKeeper = LanguageManager.getPluginText('itemShopMenu', 'shopKeepers')[name.toLowerCase()]
  // Get World Index
  var worldIndex = SceneManager.currentWorldIndex();
  // Shop Type (0: Buy, 1: Sell)
  data.shopType = type;
  // Set Shop Name
  data.name = shopKeeper.shopName ? shopKeeper.shopName : text.shopName;
  // Show Mailbox Shop Keeper Flag
  data.showMailboxShopkeeper = shopKeeper.showMailboxShopkeeper !== undefined ? shopKeeper.showMailboxShopkeeper : false;
  // Set Transaction Header
  data.transactionHeader = data.shopType === 0 ? shopKeeper.buyHeader ? shopKeeper.buyHeader : text.buyHeader : shopKeeper.sellHeader ? shopKeeper.sellHeader : text.sellHeader;
  data.texts = {};
  // // If World Index is 1 (Dream World)
  // if (worldIndex === 1) {
  // Set Texts
  data.texts.maxItemMessage = 'Prologue_WHITESPACE.message_3';
  data.texts.notEnoughMoneyMessage = 'Prologue_WHITESPACE.message_3';
  data.texts.onItemListBuyOkMessage = 'Prologue_WHITESPACE.message_3';
  data.texts.onItemListSellOkMessage = 'Prologue_WHITESPACE.message_3';
  data.texts.itemBuyingPromptMessage = 'Prologue_WHITESPACE.message_3'
  data.texts.itemSellingPromptMessage = 'Prologue_WHITESPACE.message_3'
  data.texts.itemBuyingConfirmationMessage = 'Prologue_WHITESPACE.message_3'
  data.texts.itemSellingConfirmationMessage = 'Prologue_WHITESPACE.message_3'
  data.texts.itemBuyingCancelMessage = 'Prologue_WHITESPACE.message_3'
  data.texts.itemSellingCancelMessage = 'Prologue_WHITESPACE.message_3'
  // } else {


  // };
  // Go Through List of Entries and replace messages
  for (let [key, value] of Object.entries(shopKeeper.texts)) { data.texts[key] = value};
};
//=============================================================================
// * Shop Processing
//=============================================================================
Game_Interpreter.prototype.command302 = function() {
  if (!$gameParty.inBattle()) {
    var goods = [this._params];
    while (this.nextEventCode() === 605) {
      this._index++;
      goods.push(this.currentCommand().parameters);
    }
    // Set Shop Data Goods
    $gameTemp._shopData.goods = goods;
    // Snap Scene into bitmap
    /*let waitingInterval = setInterval(() => {
      if(SceneManager._scene._messageWindow._openness > 0) {return;}
      clearInterval(waitingInterval);
    }, 1)*/
    while(!!SceneManager._scene._messageWindow && SceneManager._scene._messageWindow._openness > 0) {
      SceneManager._scene._messageWindow._openness -= 16;  
    }
    $gameTemp._sceneSnapBitmap = SceneManager.snap();
    SceneManager.push(Scene_OmoriItemShop);
    SceneManager.prepareNextScene(goods, this._params[4]);    
  }
  return true;
};

//=============================================================================
// ** Scene_OmoriItemShop
//-----------------------------------------------------------------------------
// This scene shows the album
//=============================================================================
function Scene_OmoriItemShop() { this.initialize.apply(this, arguments);}
Scene_OmoriItemShop.prototype = Object.create(Scene_BaseEX.prototype);
Scene_OmoriItemShop.prototype.constructor = Scene_OmoriItemShop;
//=============================================================================
// * Object Initialization
//=============================================================================
Scene_OmoriItemShop.prototype.initialize = function() {
  // Set Image reservation Id
  this._imageReservationId = 'itemshop';
  // Super Call
  Scene_BaseEX.prototype.initialize.call(this);
};
//=============================================================================
// * Initialize Atlas Lists
//=============================================================================
Scene_OmoriItemShop.prototype.initAtlastLists = function() {
  // Run Original Function
  Scene_BaseEX.prototype.initAtlastLists.call(this);
  // Load System Images
  ImageManager.reserveSystem('itemConsumables', 0,  this._imageReservationId)
  ImageManager.reserveSystem('itemCharms', 0,  this._imageReservationId)
  ImageManager.reserveSystem('itemWeapons', 0,  this._imageReservationId)
  ImageManager.reserveSystem('ItemIcons1', 0,  this._imageReservationId)
  ImageManager.reserveSystem('itemImportant', 0,  this._imageReservationId)
  ImageManager.reserveSystem('mailbox', 0, this._imageReservationId)
  ImageManager.reserveSystem('mailboxLegend', 0, this._imageReservationId)
};
//=============================================================================
// * Prepare
//=============================================================================
Scene_OmoriItemShop.prototype.prepare = function(goods, purchaseOnly) {
  this._goods = goods;
  this._purchaseOnly = purchaseOnly;
  this._item = null;
};
//=============================================================================
// * Determine if Busy
//=============================================================================
Scene_OmoriItemShop.prototype.isBusy = function() {
  // Return true if window is open
  if (this._messageWindow.isClosing()) { return true; };
  // Return original Function
  return Scene_Base.prototype.isBusy.call(this);
};
//=============================================================================
// * Start
//=============================================================================
Scene_OmoriItemShop.prototype.start = function() {
  // Run Original Function
  Scene_BaseEX.prototype.start.call(this);

  // Select first item
  this._itemListWindow.select(0);

  // Open Windows
  this._messageWindow.open();
  this._goldWindow.open();
  this._itemListWindow.open();
  this._shopHeaderWindow.open();
  // Set Duration
  var duration = 10;
  var obj = this._shopKeeperSprite;
  var data = { obj: obj, properties: ['opacity'], from: {opacity: obj.opacity}, to: {opacity: 255}, durations: {opacity: duration}}
  data.easing = Object_Movement.linearTween;
  this.move.startMove(data);
};
//=============================================================================
// * Terminate Scene
//=============================================================================
Scene_OmoriItemShop.prototype.terminate = function() {
  // Run Original Function
  Scene_BaseEX.prototype.terminate.call(this);
  // Clear Shop Data
  $gameTemp.clearShopData();
};
//=============================================================================
// * Create
//=============================================================================
Scene_OmoriItemShop.prototype.create = function() {
  // Super Call
  Scene_BaseEX.prototype.create.call(this);
  // Create Background
  this.createBackground();
  // Create Shop Keeper Sprite
  this.createShopKeeperSprite();
  // Create Windows
  this.createGoldWindow();
  this.createShopHeaderWindow()
  this.createItemListWindow()
  this.createTotalWindow();
  this.createMessageWindow();



  // this._goldWindow.y += 355 + 50;
  // this._goldWindow.x -= 120;
  // this._goldWindow.x += 145
  // this._goldWindow.opacity = 0;

  this._shopKeeperSprite.x = (this._messageWindow.x + this._messageWindow.width) - this._shopKeeperSprite.width - 50
  this._shopKeeperSprite.y = this._messageWindow.y - this._shopKeeperSprite.height + 30;
};
//=============================================================================
// * Create Background
//=============================================================================
Scene_OmoriItemShop.prototype.createBackground = function() {
  this._backgroundSprite = new Sprite();
  this._backgroundSprite.bitmap = $gameTemp._sceneSnapBitmap;
  this.addChild(this._backgroundSprite);
  // Clear Scene Snap Bitmap
  $gameTemp._sceneSnapBitmap = null;
};
//=============================================================================
// * Create Shop Keeper Sprite
//=============================================================================
Scene_OmoriItemShop.prototype.createShopKeeperSprite = function() {
  this._shopKeeperSprite = new Sprite(ImageManager.loadSystem('mailbox'));
  this._shopKeeperSprite.setFrame(0, 0, 251, 344);
  this._shopKeeperSprite.visible = $gameTemp._shopData.showMailboxShopkeeper;
  this._shopKeeperSprite.opacity = 0;
  this.addChild(this._shopKeeperSprite);
  // Create shop Keepers Face Sprite
  this._shopKeepersFaceSprite = new Sprite(ImageManager.loadSystem('mailbox'))
  this._shopKeepersFaceSprite.x = 50;
  this._shopKeepersFaceSprite.y = 65;
  this._shopKeeperSprite.addChild(this._shopKeepersFaceSprite);
  // Set Default shop keeper face
  this.setShopKeeperFace(0)
};
//=============================================================================
// * Create Gold Window
//=============================================================================
Scene_OmoriItemShop.prototype.createGoldWindow = function() {
  this._goldWindow = new Window_Gold(0, 0);
  this._goldWindow.x = (Graphics.boxWidth - this._goldWindow.width) - 16;
  this._goldWindow.y = 10;
  this._goldWindow.openness = 0;
  this.addChild(this._goldWindow);
};
//=============================================================================
// * Create Shop Header Window
//=============================================================================
Scene_OmoriItemShop.prototype.createShopHeaderWindow = function() {
  this._shopHeaderWindow = new Window_OmoriShopHeader();
  this._shopHeaderWindow.x = 16;
  this._shopHeaderWindow.y = 10;
  this.addChild(this._shopHeaderWindow);
};
//=============================================================================
// * Create Item List Window
//=============================================================================
Scene_OmoriItemShop.prototype.createItemListWindow = function() {
  this._itemListWindow = new Window_OmoriShopItemList();
  this._itemListWindow.x = 16
  this._itemListWindow.y = this._shopHeaderWindow.y + this._shopHeaderWindow.height;
  this._itemListWindow.setHandler('ok', this.onItemListOk.bind(this));
  this._itemListWindow.setHandler('cancel', this.popScene.bind(this));
  this._itemListWindow.callUpdateHelp();
  this.addChild(this._itemListWindow);
};
//=============================================================================
// * Create Total Window
//=============================================================================
Scene_OmoriItemShop.prototype.createTotalWindow = function() {
  this._totalWindow = new Window_OmoriShopTotal();
  this._totalWindow.x = (Graphics.width - this._totalWindow.width) - 16
  this._totalWindow.y = (Graphics.height - this._totalWindow.height) - 124;
  this._totalWindow.setHandlers(this.onTotalWindowOk.bind(this), this.onTotalWindowCancel.bind(this));
  this.addChild(this._totalWindow);
};
//=============================================================================
// * Create Message Window
//=============================================================================
Scene_OmoriItemShop.prototype.createMessageWindow = function() {
  // Create Message Window
  this._messageWindow = new WindowItemShopMessage();
  this.addChild(this._messageWindow);
  this._messageWindow.subWindows().forEach(function(window) {
      this.addChild(window);
  }, this);
  // Set Message Window Extra Windows
  this._messageWindow._itemListWindow = this._itemListWindow;
  this._messageWindow._totalWindow = this._totalWindow;
  // Set Item List Window Message Window
  this._itemListWindow._messageWindow = this._messageWindow;
};
//=============================================================================
// * Frame Update
//=============================================================================
Scene_OmoriItemShop.prototype.update = function() {
  // Super Call
  Scene_BaseEX.prototype.update.call(this);

};
//=============================================================================
// * Set Shop Keepers Face
//=============================================================================
Scene_OmoriItemShop.prototype.setShopKeeperFace = function(index = 0) {
  // Set Shop Keepers Face Sprite
  this._shopKeepersFaceSprite.setFrame(251, index * 28, 79, 28);
};
//=============================================================================
// * Wait for Message
//=============================================================================
Scene_OmoriItemShop.prototype.waitForMessage = function() {
  return $gameMessage.isBusy();
};
//=============================================================================
// * Pop Scene
//=============================================================================
Scene_OmoriItemShop.prototype.popScene = function() {
  this.queue(function() {
    // Close Windows
    this._goldWindow.close();
    this._itemListWindow.close();
    this._shopHeaderWindow.close();
    this._messageWindow.close();
    // Set Duration
    var duration = 10;
    var obj = this._shopKeeperSprite;
    var data = { obj: obj, properties: ['opacity'], from: {opacity: obj.opacity}, to: {opacity: 0}, durations: {opacity: duration}}
    data.easing = Object_Movement.linearTween;
    this.move.startMove(data);
  }.bind(this))

  this.queue('wait', 10);

  this.queue(function() {
    // Run Original Function
    Scene_Base.prototype.popScene.call(this);
  }.bind(this));
};
//=============================================================================
// * [OK] Item List
//=============================================================================
Scene_OmoriItemShop.prototype.onItemListOk = function() {
  // Get Item
  var item = this._itemListWindow.item();
  var price = this._itemListWindow.price();
  // Get Buying/Selling State
  var buying = $gameTemp._shopData.shopType === 0;
  var maxItems = buying ? 99 - $gameParty.numItems(item) : $gameParty.numItems(item);
  var canBuy = maxItems > 0
  var hasGold = price <= $gameParty.gold();
  // If can't buy or don't have gold
  if (buying && (!canBuy || !hasGold)) {
    // Show Max Item Message
    this.queue(function() {
      var message = '';
      // Add Messages
      if (!canBuy) { message = $gameTemp._shopData.texts.maxItemMessage}
      if (!hasGold) { message = $gameTemp._shopData.texts.notEnoughMoneyMessage};
      // Add Text
      $gameMessage.showLanguageMessage(message);
    }.bind(this))
    // Wait for Message
    this.queue('startFunctionWait', this.waitForMessage.bind(this))
    // Reactivate Item List Window
    this.queue(function() {
      this._itemListWindow.activate();
    }.bind(this))
    return;
  };

  // Activate Total Window
  this._totalWindow.open();
  this._totalWindow.setPrice(price, maxItems);
  this._totalWindow.activate();
  // If Buying
  if (buying) {
    // Add Text
    $gameMessage.showLanguageMessage($gameTemp._shopData.texts.onItemListBuyOkMessage);
  } else {
    // Add Text
    $gameMessage.showLanguageMessage($gameTemp._shopData.texts.onItemListSellOkMessage);
  };
};
//=============================================================================
// * [OK] Total Window
//=============================================================================
Scene_OmoriItemShop.prototype.onTotalWindowOk = function() {
  // Set Choice Callback Function
  $gameMessage.setChoiceCallback(this.onPurchaseChoice.bind(this));
  // If Buying
  if ($gameTemp._shopData.shopType === 0) {
    // Add Text
    $gameMessage.showLanguageMessage($gameTemp._shopData.texts.itemBuyingPromptMessage);
  } else {
    // Add Text
    $gameMessage.showLanguageMessage($gameTemp._shopData.texts.itemSellingPromptMessage);
  };
  // Get Buy Options Text
  var text = LanguageManager.getPluginText('itemShopMenu', 'buyOptions')
  // Set Choice Text
  $gameMessage.setChoices([text[0], text[1]], 0, 1)
};
//=============================================================================
// * [Cancel] Total Window
//=============================================================================
Scene_OmoriItemShop.prototype.onTotalWindowCancel = function() {
  // Terminate Message
  this._messageWindow.terminateMessage();
  this._itemListWindow.activate();
};
//=============================================================================
// * On Purchase Choice
//=============================================================================
Scene_OmoriItemShop.prototype.onPurchaseChoice = function(n) {
  // Clear Input
  Input.clear()
  // Initialize Message
  var message;
  // If Yes
  if (n === 0) {
    var item = this._itemListWindow.item();
    var total = this._totalWindow.totalPrice();
    // If Buying
    if ($gameTemp._shopData.shopType === 0) {
      // Lose Gold
    AudioManager.playSe({name: "SYS_cha_ching", pan: 0, pitch: 100, volume: 90});
      $gameParty.loseGold(total);
      // Gain Items
      $gameParty.gainItem(item, this._totalWindow._amount);
      // Set Confirm Message
      message = $gameTemp._shopData.texts.itemBuyingConfirmationMessage;
    } else {
      // Gain Gold
      $gameParty.gainGold(total);
      // Gain Items
          AudioManager.playSe({name: "SYS_cha_ching", pan: 0, pitch: 100, volume: 90});
      $gameParty.loseItem(item, this._totalWindow._amount);
      // Set Confirm Message
      message = $gameTemp._shopData.texts.itemSellingConfirmationMessage;
      // Refresh Item List Window
      this._itemListWindow.refresh();
    };
    // Refresh Gold Window
    this._goldWindow.refresh();
  } else {
    // If Buying
    if ($gameTemp._shopData.shopType === 0) {
      // Set Cancel Message
      message = $gameTemp._shopData.texts.itemBuyingCancelMessage;
    } else {
      // Set Cancel Message
      message = $gameTemp._shopData.texts.itemSellingCancelMessage;
    };
  };
  // If Message Exists
  if (message) {
    // Show Max Item Message
    this.queue(function() {
      // Clear Game Message
      $gameMessage.clear();
      // Add Text
      $gameMessage.showLanguageMessage(message);
    }.bind(this))
  };

  // Wait for Message
  this.queue('startFunctionWait', this.waitForMessage.bind(this))
  this.queue(function() {
    // Clear Game Message
    $gameMessage.clear();
    // Activate List Window
    this._itemListWindow.activate();
  }.bind(this))
};



//=============================================================================
// ** Window_OmoriShopHeader
//-----------------------------------------------------------------------------
// This window displays the shop's header.
//=============================================================================
function Window_OmoriShopHeader() { this.initialize.apply(this, arguments); }
Window_OmoriShopHeader.prototype = Object.create(Window_Base.prototype);
Window_OmoriShopHeader.prototype.constructor = Window_OmoriShopHeader;
//=============================================================================
// * Initialize Object
//=============================================================================
Window_OmoriShopHeader.prototype.initialize = function() {
  // Super Call
  Window_Base.prototype.initialize.call(this, 0, 0, 250, 45);
  // Set Openness
  this.openness = 0;
  // Refresh
  this.refresh();
};
//=============================================================================
// * Settings
//=============================================================================
Window_OmoriShopHeader.prototype.standardPadding = function() { return 4 };
Window_OmoriShopHeader.prototype.standardFontSize = function() { return 24; };
//=============================================================================
// * Refresh
//=============================================================================
Window_OmoriShopHeader.prototype.refresh = function() {
  // Clear Contents
  this.contents.clear();
  // Draw Header Text
  this.contents.drawText($gameTemp._shopData.name, 5, -5, this.contents.width - 10, this.contents.height);
};



//=============================================================================
// ** Window_OmoriShopTotal
//-----------------------------------------------------------------------------
// This window displays the shop's total amount to buy or sell.
//=============================================================================
function Window_OmoriShopTotal() { this.initialize.apply(this, arguments); }
Window_OmoriShopTotal.prototype = Object.create(Window_Base.prototype);
Window_OmoriShopTotal.prototype.constructor = Window_OmoriShopTotal;
//=============================================================================
// * Initialize Object
//=============================================================================
Window_OmoriShopTotal.prototype.initialize = function() {
  // Amount Count
  this._amount = 0;
  // Set Price
  this._price = 0;
  // Set Max Amount
  this._maxAmount = 0;
  // Super Call
  Window_Base.prototype.initialize.call(this, 0, 0, 215, 55);
  // Create Arrow Sprites
  this.createArrowSprites();
  // Refresh
  this.refresh();
  // Deactivate
  this.deactivate();
  // Set Openness to 0
  this.openness = 0;
};
//=============================================================================
// * Settings
//=============================================================================
Window_OmoriShopTotal.prototype.standardPadding = function() { return 4 };
Window_OmoriShopTotal.prototype.standardFontSize = function() { return 24; };
//=============================================================================
// * Get Total Price
//=============================================================================
Window_OmoriShopTotal.prototype.totalPrice = function() { return this._price * this._amount; };
//=============================================================================
// * Set Handlers
//=============================================================================
Window_OmoriShopTotal.prototype.setHandlers = function(okHandler, cancelHandler) {
  this._okhandler = okHandler;
  this._cancelHandler = cancelHandler;
};
//=============================================================================
// * Set Price
//=============================================================================
Window_OmoriShopTotal.prototype.setPrice = function(price, maxAmount = 99) {
  // Set Price
  this._price = price;
  // Reset Amount
  this._amount = 1;
  // Set Max Amount
  this._maxAmount = maxAmount;
  // Draw Shopping Values
  this.drawShoppingValues();
  // Update Arrow Visibility
  this.updateArrowVisibility();
};
//=============================================================================
// * Update Openness
//=============================================================================
Object.defineProperty(Window_OmoriShopTotal.prototype, 'openness', {
  get: function() { return this._openness; },
  set: function(value) {
    if (this._openness !== value) {
      this._openness = value.clamp(0, 255);
      this._windowSpriteContainer.scale.y = this._openness / 255;
      this._windowSpriteContainer.y = this.height / 2 * (1 - this._openness / 255);

      if (this._leftArrowSprite) { this._leftArrowSprite.visible = this._openness === 255; };
      if (this._rightArrowSprite) { this._rightArrowSprite.visible = this._openness === 255; };
    }
  },
  configurable: true
});
//=============================================================================
// * Create Arrow Sprites
//=============================================================================
Window_OmoriShopTotal.prototype.createArrowSprites = function() {
  // Get Initial Arrow Area
  var p = 24;
  var q = p/2;
  var sx = 96+p;
  var sy = 0+p;
  // Create Left Arrow Sprite
  this._leftArrowSprite = new Sprite(ImageManager.loadSystem('Window'))
  this._leftArrowSprite.x = this.width - 67
  this._leftArrowSprite.y = 5;//this.height - 30
  this._leftArrowSprite.setFrame(sx-q, sy+q, p, p);
  this.addChild(this._leftArrowSprite);
  // Create Right Arrow Sprite
  this._rightArrowSprite = new Sprite(ImageManager.loadSystem('Window'))
  this._rightArrowSprite.x = this.width - 35
  this._rightArrowSprite.y = 5;//this.height - 30
  this._rightArrowSprite.setFrame(sx+p, sy+q, p, p);
  this.addChild(this._rightArrowSprite);
  // Update Arrow Visibility
  this.updateArrowVisibility();
};
//=============================================================================
// * Refresh
//=============================================================================
Window_OmoriShopTotal.prototype.refresh = function() {
  // Clear Contents
  this.contents.clear();
  // Draw Headers
  this.contents.drawText(LanguageManager.getMessageData("XX_BLUE.Omori_Item_Shop").total_price, 5, 20, this.contents.width - 10, 20);
  this.contents.drawText(LanguageManager.getMessageData("XX_BLUE.Omori_Item_Shop").amount, 5, 0, this.contents.width - 10, 20);
  // Draw Shopping Values
  this.drawShoppingValues();
};
//=============================================================================
// * Refresh
//=============================================================================
Window_OmoriShopTotal.prototype.drawShoppingValues = function() {
  // Clear Rect
  this.contents.clearRect(this.contents.width - 90, 0, 90, this.contents.height);
  this.contents.fontSize = this.standardFontSize();
  // this.contents.fillRect(this.contents.width - 90, 0, 90, this.contents.height, 'rgba(255, 0, 0, 0.5)');

  // Draw Total Price
  // this.drawCurrencyValue(this.totalPrice(), 'C', 0, 12, this.contents.width - 10)


  this.contents.drawText('%1 %2'.format(Yanfly.Util.toGroup(this.totalPrice()), this.worldCurrencyUnit()), 0, 20, this.contents.width - 5, 20, 'right');
  // Draw Amount
  this.contents.drawText(this._amount, this.contents.width - 55, 0, 50, 20, 'center');
};
//=============================================================================
// * Frame Update
//=============================================================================
Window_OmoriShopTotal.prototype.update = function() {
  // Super Call
  Window_Base.prototype.update.call(this);
  // Update Amount Input
  this.updateAmountInput();
};
//=============================================================================
// * Update Amount Input
//=============================================================================
Window_OmoriShopTotal.prototype.updateAmountInput = function() {
  // If Active
  if (this.active && !$gameMessage.hasText()) {
    if (Input.isTriggered('ok')) {
      this.deactivate();
      this.close()
      // Call OK Handler
      this._okhandler();
      return;
    }

    if (Input.isTriggered('cancel')) {
      this.deactivate();
      this.close()
      // Call Cancel Hanlder
      this._cancelHandler();
      return
    }

    if (Input.isRepeated('right')) {
      var gold = $gameParty.gold();

      var nextPrice = $gameTemp._shopData.shopType === 0 ? (this._amount + 1) * this._price : 0;
      if (this._amount < this._maxAmount && gold >= nextPrice) {
      AudioManager.playSe({name: "sys_cursor1", pan: 0, pitch: 100, volume: 90});
        this._amount++;
        this.drawShoppingValues();
        this.updateArrowVisibility();
      };
      return;
    };

    if (Input.isRepeated('up')) {
      var gold = $gameParty.gold();
      var maxPrice = $gameTemp._shopData.shopType === 0 ? Math.min(Math.floor(gold / this._price), this._maxAmount) : this._maxAmount;

      if (this._amount < this._maxAmount) {
      AudioManager.playSe({name: "sys_cursor1", pan: 0, pitch: 100, volume: 90});
        this._amount = Math.min(this._amount + 10, maxPrice);
        this.drawShoppingValues();
        this.updateArrowVisibility();
      };
      return;
    };

    if (Input.isRepeated('left')) {
      // If Amount is more than 0

      if (this._amount > 1) {
        // Decrease Amount
      AudioManager.playSe({name: "sys_cursor1", pan: 0, pitch: 100, volume: 90});
        this._amount--;
        this.drawShoppingValues();
        this.updateArrowVisibility();
      };
      return
    }

    if (Input.isRepeated('down')) {
      // If Amount is more than 0
      if (this._amount > 0) {
        AudioManager.playSe({name: "sys_cursor1", pan: 0, pitch: 100, volume: 90});
        this._amount = Math.max(this._amount - 10, 1);
        this.drawShoppingValues();
        this.updateArrowVisibility();
      };
      return
    };
  };
};
//=============================================================================
// * Update Arrow Visibility
//=============================================================================
Window_OmoriShopTotal.prototype.updateArrowVisibility = function() {
  // Get Total Price
  var buying = $gameTemp._shopData.shopType === 0;
  var totalPrice = buying ? this.totalPrice() : 0;
  var nextPrice = buying ? (this._amount + 1) * this._price : -1;
  var gold = $gameParty.gold();

  if (totalPrice >= gold || gold < nextPrice || this._amount >= this._maxAmount ) {
    this._rightArrowSprite.opacity = 160;
  } else {
    this._rightArrowSprite.opacity = 255;
  };

  if (this._amount <= 1) {
    this._leftArrowSprite.opacity = 160;
  } else {
    this._leftArrowSprite.opacity = 255;
  };
};



//=============================================================================
// ** Window_OmoriShopItemList
//-----------------------------------------------------------------------------
// The window for selecting items in the shopping screen
//=============================================================================
function Window_OmoriShopItemList() { this.initialize.apply(this, arguments); };
Window_OmoriShopItemList.prototype = Object.create(Window_ItemList.prototype);
Window_OmoriShopItemList.prototype.constructor = Window_OmoriShopItemList;
//=============================================================================
// * Object Initialization
//=============================================================================
Window_OmoriShopItemList.prototype.initialize = function(x, y, width, height) {
  // Super Call
  Window_ItemList.prototype.initialize.call(this, 0, 0, 250, 290 - 37);

  this.refresh()
  this.openness = 0;
  this.select(0);
  this.activate();
};
//=============================================================================
// * Settings
//=============================================================================
Window_OmoriShopItemList.prototype.isUsingCustomCursorRectSprite = function() { return true; };
Window_OmoriShopItemList.prototype.includes = function(item) { return $gameParty.canUse(item); };
Window_OmoriShopItemList.prototype.maxCols = function() { return 1; };
Window_OmoriShopItemList.prototype.lineHeight = function() { return 27; };
Window_OmoriShopItemList.prototype.spacing = function() { return 0; };
Window_OmoriShopItemList.prototype.standardPadding = function() { return 10; };
Window_OmoriShopItemList.prototype.customCursorRectXOffset = function() { return 8; }
//=============================================================================
// * Determine if Item should be included
//=============================================================================
Window_OmoriShopItemList.prototype.includes = function(item) { return true; };
//=============================================================================
// * Make Item List
//=============================================================================
Window_OmoriShopItemList.prototype.makeItemList = function() {
  // Clear Data
  this._data = [];
  // If Buying
  if ($gameTemp._shopData.shopType === 0) {
    // Get shop Goods
    var shopGoods = $gameTemp._shopData.goods;
    // Go through Shop Goods
    for (var i = 0; i < shopGoods.length; i++) {
      // Get Goods
      var goods = shopGoods[i];
      // Set Item
      var item = null;
      // Goods Type case
      switch (goods[0]) {
      case 0: item = $dataItems[goods[1]] ;break;
      case 1: item = $dataWeapons[goods[1]] ;break;
      case 2: item = $dataArmors[goods[1]] ;break;
      };
      // If Item exists
      if (item) {
        // Add Object to Data
        this._data.push({item: item, price: goods[2] === 0 ? item.price : goods[3] });
      };
    };
  } else {
    // Get shop Goods
    var shopGoods = $gameParty.allItems();
    // Go through Shop Goods
    for (var i = 0; i < shopGoods.length; i++) {
      // Set Item
      var item = shopGoods[i];
      // If Item exists
      if (item && item.price > 0) {
        // Add Object to Data
        this._data.push({item: item, price: item.price});
      };
    };
  };
};
//=============================================================================
// * Get Item
//=============================================================================
Window_OmoriShopItemList.prototype.item = function() {
  if (this._data.length <= 0) { return null; }
  let index = this.index();
  if (index >= this._data.length) { return null; }
  return this._data && index >= 0 ? this._data[index].item : null;
};
//=============================================================================
// * Get Item Price
//=============================================================================
Window_OmoriShopItemList.prototype.price = function(index = this.index()) {
  // Get Price
  let price = this._data && index >= 0 ? this._data[index].price : null;
  // If Selling cut price in half
  if ($gameTemp._shopData.shopType === 1) { price /= 2; };
  // Return price
  return Math.round(price);
};
//=============================================================================
// * Determine if item is enabled
//=============================================================================
Window_OmoriShopItemList.prototype.isEnabled = function(item) {
  return item;
  return true
};
//=============================================================================
// * Item Rect
//=============================================================================
Window_OmoriShopItemList.prototype.itemRect = function(index) {
  // Get Rect
  var rect = Window_SkillList.prototype.itemRect.call(this, index);
  rect.y += 15
  // rect.x += 36;
  return rect;
};
//=============================================================================
// * Draw Item
//=============================================================================
Window_OmoriShopItemList.prototype.drawItem = function(index) {
  // Get Data
  var data = this._data[index];
  // Get Item
  var item = data.item;
  this.contents.fontSize = LanguageManager.getMessageData("XX_BLUE.Window_OmoriShopItemList").itemFontSize;
  if (item) {
    var rect = this.itemRect(index);
    rect.x += 32
    rect.width -= 40;
    this.changePaintOpacity(this.isEnabled(item));
    // this.contents.fillRect(rect.x, rect.y, rect.width - 50, rect.height, 'rgba(255, 0, 0, 0.5)')
    this.contents.drawText(item.name, rect.x, rect.y, rect.width - 50, rect.height);
    this.contents.drawText('%1 %2'.format(this.price(index), this.worldCurrencyUnit()), rect.x, rect.y, rect.width, rect.height, 'right');
    this.changePaintOpacity(1);
  };
};
//=============================================================================
// * Refresh
//=============================================================================
Window_OmoriShopItemList.prototype.refresh = function() {
  // Super Call
  Window_ItemList.prototype.refresh.call(this);
  this.contents.fontSize = LanguageManager.getMessageData("XX_BLUE.Window_OmoriShopItemList").transactionHeaderFontSize;
  this.contents.drawText($gameTemp._shopData.transactionHeader, 0, -5, this.contents.width - 10, 20)
  // Get Index
  let index = this.index();
  let maxItems = this.maxItems();
  // If Index exceeds or matches max items
  if (index >= maxItems) {
    // Set Index to last
    this._index = Math.max(0, maxItems-1);
  }
};
//=============================================================================
// * Refresh Arrows
//=============================================================================
Window_OmoriShopItemList.prototype._refreshArrows = function() {
  // Super Call
  Window_ItemList.prototype._refreshArrows.call(this);
  var w = this._width;
  var h = this._height;
  var p = 24;
  var q = p/2;
  this._downArrowSprite.move(w - q, (h - q) );
  this._upArrowSprite.move(w - q, q + 1);
};
//=============================================================================
// * Call Update Help
//=============================================================================
Window_OmoriShopItemList.prototype.callUpdateHelp = function() {
  // Super Call
  Window_ItemList.prototype.callUpdateHelp.call(this);
  if (this._messageWindow) {
    this._messageWindow.drawItem(this.item())
  };
};





//=============================================================================
// ** WindowItemShopMessage
//-----------------------------------------------------------------------------
// This window displays shop text
//=============================================================================
function WindowItemShopMessage() { this.initialize.apply(this, arguments); }
WindowItemShopMessage.prototype = Object.create(Window_Message.prototype);
WindowItemShopMessage.prototype.constructor = WindowItemShopMessage;
//=============================================================================
// * Initialize Object
//=============================================================================
WindowItemShopMessage.prototype.initialize = function() {
  // Super Call
  Window_Message.prototype.initialize.call(this);
  // Fixes Name box window awkwardness
  // this.openness = 255;
  // this._nameWindow.x = 16;
  // this._nameWindow.open()
  // this.open()
};
//=============================================================================
// * Settings
//=============================================================================
// WindowItemShopMessage.prototype.standardPadding = function() { return 4; };
//=============================================================================
// * Draw Item
//=============================================================================
WindowItemShopMessage.prototype.drawItem = function(item) {
  // If Item exists
  if (item) {
    // Get Item Text
    var itemText = item.description;
    // Set Item Draw Flag to true
    this._drawingItemText = true;
    // Initialize Text State
    this._textState = {};
    this._textState.index = 0;
    this._textState.text = this.convertEscapeCharacters(itemText);
    this.newPage(this._textState);
    this._textState.x = 110;
    this._textState.y = 24;
    // Set Flags
    this._showFast = true;
    this._pauseSkip = true;
    this._wordWrap = true;
    // Unpause
    this.pause = false;
    // Set Sound count to max (Prevents sound from playing)
    this._soundCount = 99;
    // Update Message
    this.updateMessage();
    // Draw Item Icon
    this.drawItemIcon(item, 0, -5, 1)
    // Draw Item Name
    this.contents.drawText(item.name, 106, 0, this.contents.width - 106, 24)
    // Draw Owned amount
    this.contents.drawText('(%1: %2)'.format(LanguageManager.getPluginText('itemShopMenu', 'ownedText'),$gameParty.numItems(item)), 0, 0, this.contents.width-10, 24, 'right')
    // Set Item Draw Flag to false
    this._drawingItemText = false;
  };
};
//=============================================================================
// * New Line X
//=============================================================================
WindowItemShopMessage.prototype.newLineX = function() {
  if (this._drawingItemText) { return 110; };
  return Window_Message.prototype.newLineX.call(this);
};
//=============================================================================
// * Terminate Message
//=============================================================================
WindowItemShopMessage.prototype.terminateMessage = function() {
  // Run Original Function
  Window_Message.prototype.terminateMessage.call(this);
  this.open();
  if (this._nameWindow.openness > 0) {
    this._nameWindow.open();
  }
};
//=============================================================================
// * Convert Escape Characters
//=============================================================================
WindowItemShopMessage.prototype.convertEscapeCharacters = function(text) {
  // Get Item
  var item = this._itemListWindow.item();
  // Convert Tags into Text
  text = text.replace(/<SHOPITEM>/gi, item ? item.name : "");
  text = text.replace(/<SHOPAMOUNT>/gi, this._totalWindow._amount);
  text = text.replace(/<SHOPTOTAL>/gi, this._totalWindow.totalPrice());
  // Return Original Function
  return Window_Message.prototype.convertEscapeCharacters.call(this, text)
};
//=============================================================================
// * Draw Item
//=============================================================================
WindowItemShopMessage.prototype.processEscapeCharacter = function(code, textState) {
  // Code switch case
  switch (code) {
    case 'SHOPFACE':
      // Set Shop Keeper's face
      this.parent.setShopKeeperFace(this.obtainEscapeParam(textState))
    break;
  }
  // Run Original Function
  Window_Message.prototype.processEscapeCharacter.call(this, code, textState);
};
