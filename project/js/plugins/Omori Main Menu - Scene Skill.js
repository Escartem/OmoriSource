//=============================================================================
// ** Scene_OmoMenuSkill
//-----------------------------------------------------------------------------
// The scene class of the skill screen.
//=============================================================================
function Scene_OmoMenuSkill() { this.initialize.apply(this, arguments); }
Scene_OmoMenuSkill.prototype = Object.create(Scene_OmoMenuBase.prototype);
Scene_OmoMenuSkill.prototype.constructor = Scene_OmoMenuSkill;
//=============================================================================
// * Create
//=============================================================================
Scene_OmoMenuSkill.prototype.create = function() {
  // Super Call
  Scene_OmoMenuBase.prototype.create.call(this);
  // Create Windows
  this.createHelpWindow();
  this.createCommandWindow();
  this.createStatusWindows();
  this.createActorSkillEquipWindow();
  this.createActorSkillListWindow();  
  this.createActorSkillControlWindow();
};
//=============================================================================
// * Start
//=============================================================================
Scene_OmoMenuSkill.prototype.start = function() {
  // Set Skill
  this._skill = null;
  // Super Call
  Scene_OmoMenuBase.prototype.start.call(this);
  // Get Actor Index
  var index = this._statusWindow.index();
  // If Index is more than 0
  if (index >= 0) {
    this.showActorSkillEquipWindow(index);
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
Scene_OmoMenuSkill.prototype.createStatusWindows = function() {
  // Super Call
  Scene_OmoMenuBase.prototype.createStatusWindows.call(this);
  this._statusWindow.setHandler('ok', this.onStatusWindowOk.bind(this));
  this._statusWindow.setHandler('cancel', this.onStatusWindowCancel.bind(this));
  this._statusWindow.refresh();  
};
//=============================================================================
// * Create Help Window
//=============================================================================
Scene_OmoMenuSkill.prototype.createHelpWindow = function() {
  // Super Call
  Scene_OmoMenuBase.prototype.createHelpWindow.call(this);
  // Adjust Help Window
  this._helpWindow.width = Graphics.width - 175;
  this._helpWindow.height = 109
  this._helpWindow.x = 10;
  this._helpWindow.y = Graphics.height - 244;
  this._helpWindow.createContents();
  this._helpWindow.width = 0;
};
//=============================================================================
// * Create Actor Equip Window
//=============================================================================
Scene_OmoMenuSkill.prototype.createActorSkillEquipWindow = function() {
  // Create Actor Equip Window
  this._actorSkillEquipWindow = new Window_OmoMenuActorSkillEquip();
  this._actorSkillEquipWindow.x = 10
  this._actorSkillEquipWindow.y = Graphics.height;
  this._actorSkillEquipWindow.setHandler('ok', this.onActorEquipSkillWindowOk.bind(this));
  this._actorSkillEquipWindow.setHandler('cancel', this.onActorEquipSkillWindowCancel.bind(this));  

  this._actorSkillEquipWindow.setHelpWindow(this._helpWindow);
  this.addChild(this._actorSkillEquipWindow);
  this._actorSkillEquipWindow.select(0);  
  this._actorSkillEquipWindow.deactivate();
  this._actorSkillEquipWindow.activate();
};
//=============================================================================
// * Create Actor Skill Control Window
//=============================================================================
Scene_OmoMenuSkill.prototype.createActorSkillControlWindow = function() {
  // Create Actor Equip status Window
  this._actorSkillControlWindow = new Window_OmoMenuSkillEquipControl();
  this._actorSkillControlWindow.x = 180;
  this._actorSkillControlWindow.y = 75;
  this._actorSkillControlWindow.setHandler('use', this.onActorSkillControlUse.bind(this));
  this._actorSkillControlWindow.setHandler('swap', this.onActorSkillControlSwap.bind(this));
  this._actorSkillControlWindow.setHandler('cancel', this.onActorSkillControlCancel.bind(this));
  this.addChild(this._actorSkillControlWindow);
};
//=============================================================================
// * Create Actor Equip Item Window
//=============================================================================
Scene_OmoMenuSkill.prototype.createActorSkillListWindow = function() {
  // Create Actor Equip Item Window
  this._actorSkillListWindow = new Window_OmoMenuActorSkillList();
  this._actorSkillListWindow.x = 0;
  this._actorSkillListWindow.y = Graphics.height - this._actorSkillListWindow.height;
  this._actorSkillListWindow.width = 0;  
  this._actorSkillListWindow.setHandler('ok', this.onActorSkillListWindowOk.bind(this));
  this._actorSkillListWindow.setHandler('cancel', this.onActorSkillListWindowCancel.bind(this));
  this._actorSkillListWindow.setHelpWindow(this._helpWindow);
  this.addChildAt(this._actorSkillListWindow, 3);
};
//=============================================================================
// * Item
//=============================================================================
Scene_OmoMenuSkill.prototype.item = function() { return this._skill; };
//=============================================================================
// * User
//=============================================================================
Scene_OmoMenuSkill.prototype.user = function() { return this._statusWindow.actor(0); };
//=============================================================================
// * Play Sound for Item
//=============================================================================
Scene_OmoMenuSkill.prototype.playSeForItem = function() {
  // If Skill and should play cook sound
  if (this._skill && this._skill.meta.PlayCookSound) {
    // Play Cook sound
    AudioManager.playSe({name: "BA_Heart_Heal", volume: ConfigManager.seVolume, pitch: 100});
    return;
  };
  // Play Default Use skill sound
  SoundManager.playUseSkill();
};
//=============================================================================
// * Status Window - Ok
//=============================================================================
Scene_OmoMenuSkill.prototype.onStatusWindowOk = function() {
  // If Skill Exists
  if (this._skill) {
    // If Item Can be used
    if (this.canUse()) {
      // Use Item
      this.useItem();
    } else {
      // Play Buzzer Sound
      SoundManager.playBuzzer();      
    }
    // Activate Status Window
    this._statusWindow.activate();
  } else {
    // Update Selected Index
    this._selectedIndex = this._statusWindow.index();
    // Show Actor Equip Window
    this.showActorSkillEquipWindow(this._selectedIndex); 
  };
};
//=============================================================================
// * Status Window - Cancel
//=============================================================================
Scene_OmoMenuSkill.prototype.onStatusWindowCancel = function() {
  // If Skill Exists
  if (this._skill) {    
    // this.clearFunctionListIndex();
    var windows = this._statusWindow._statusWindows;
    for (var i2 = 0; i2 < windows.length; i2++) {
      // Hide All actors except selected one
      if (i2 !== 0) { this.hideActorStatus(i2); }
    };    
    // Sort Status Windows
    this._statusWindow.setCursorAll(false);    
    this._statusWindow.sortStatusWindows(false);
    this._statusWindow.deselect();
    this._actorSkillEquipWindow.activate();
    this._skill = null;
  } else {
    this.popScene();
    this._statusWindow.deselect();
    this._statusWindow.deactivate();
    SceneManager._nextScene._commandWindow = this._commandWindow;
    SceneManager._nextScene._statusWindow = this._statusWindow;    
  };
};
//=============================================================================
// * Actor Equip Skill Window - Ok
//=============================================================================
Scene_OmoMenuSkill.prototype.onActorEquipSkillWindowOk = function() {
  // Get Index
  const index = this._actorSkillEquipWindow.index();
  // Get Skill
  var skill = this._actorSkillEquipWindow.skillAtIndex()
  // Get Actor
  var actor = this._actorSkillEquipWindow.actor();  
  // Set Skill
  this._skill = skill;

  // If Skill Exists
  if (skill && (this.canUse($gameParty.members()) || skill.meta.AlwaysUsableInMenu)) {
    this._actorSkillControlWindow.select(0);
    this._actorSkillControlWindow.open();
    this._actorSkillControlWindow.activate();
  } else {
    // If Skill is locked
    if (actor.isEquipSkillSlotLocked(index)) {
      this._actorSkillEquipWindow.activate();
    } else {
      // On Actor Skill Control swap
      this.onActorSkillControlSwap();      
    }
  };
  // Set Skill
  this._skill = null;
};
//=============================================================================
// * Actor Equip Window - Cancel
//=============================================================================
Scene_OmoMenuSkill.prototype.onActorEquipSkillWindowCancel = function() {
  // Sort Status Windows
  this._statusWindow.sortStatusWindows(false);
//  this._actorSkillEquipWindow.activate();
  this.hideActorEquipWindow(this._selectedIndex);
};
//=============================================================================
// * Actor Skill Control - Use
//=============================================================================
Scene_OmoMenuSkill.prototype.onActorSkillControlUse = function() {
  // Close Control Window
  this._actorSkillControlWindow.close();  
  // Set Function Index list index
  this.setFunctionListIndex(0);
  // Show All Actors Except The selected one
  this.queue(function() {   
    var windows = this._statusWindow._statusWindows;
    for (var i2 = 0; i2 < windows.length; i2++) {
      if (i2 !== this._selectedIndex) {
       this.showActorStatus(i2);
      };
    };    
    this._statusWindow.reorderStatusWindows(this._selectedIndex, 0);        
    this.hideHelpWindow();
  }.bind(this))  
  this.queue('setWaitMode', 'movement');
  // Activate Window
  this.queue(function() {   
    // Set Skill
    this._skill = this._actorSkillEquipWindow.skillAtIndex();
    // Disable Ok Sound
    this._statusWindow._okSoundEnabled = false;
    // If Item is for all
    if (this.isItemForAll()) {
      this._statusWindow.setCursorText(LanguageManager.getMessageData("XX_BLUE.Omori_Mainmenu_Sceneskill").use_on_all);
      this._statusWindow.setCursorAll(true);
    } else {
      this._statusWindow.setCursorText(LanguageManager.getMessageData("XX_BLUE.Omori_Mainmenu_Sceneskill").use_on_who);
      this._statusWindow.setCursorAll(false);      
    }
    this._statusWindow.activate();
    this._statusWindow.select(0);
  }.bind(this))    
  // Clear Function List Index 
  this.clearFunctionListIndex();
};
//=============================================================================
// * Actor Skill Control - Swap
//=============================================================================
Scene_OmoMenuSkill.prototype.onActorSkillControlSwap = function() {
  // Get Actor
  var actor = this._actorSkillEquipWindow.actor();  
  this.showHelpWindow();
  this.showSkillListWindow();
  this._actorSkillControlWindow.close();  
  this._actorSkillListWindow.setActor(actor);
  this._actorSkillListWindow.select(0);
  this._actorSkillListWindow.activate();
};
//=============================================================================
// * Actor Skill Control - Cancel
//=============================================================================
Scene_OmoMenuSkill.prototype.onActorSkillControlCancel = function() {
  this._actorSkillControlWindow.close();
  this._actorSkillEquipWindow.activate();
};
//=============================================================================
// * Actor Skill List Item Window - Ok
//=============================================================================
Scene_OmoMenuSkill.prototype.onActorSkillListWindowOk = function() {
  // Get Actor
  var actor = this._actorSkillEquipWindow.actor();
  // Get Skill
  var skill = this._actorSkillListWindow.item();
  // Get Slot Index
  var slotIndex = this._actorSkillEquipWindow.index();
  // Play Equip Sound
  SoundManager.playEquip();  
  // If Skill Exists
  if (skill) {
    // Unequip Skill
    actor.unequipSkill(slotIndex);    
    // Equip Skill
    actor.equipSkill(slotIndex, skill.id);
  } else {
    // Unequip Skill
    actor.unequipSkill(slotIndex);
  };
  // Refresh Windows
  this._actorSkillEquipWindow.refresh()
  this._actorSkillListWindow.refresh();
  this._actorSkillListWindow.activate();  
};
//=============================================================================
// * Actor Skill List Item Window - Cancel
//=============================================================================
Scene_OmoMenuSkill.prototype.onActorSkillListWindowCancel = function() {
  this._actorSkillEquipWindow.activate();
  this._actorSkillListWindow.deselect();
  this.hideSkillListWindow(15);
  if (!this._actorSkillEquipWindow.skillAtIndex()) {
    this.hideHelpWindow(15);    
  };
};
//=============================================================================
// * On Skill Equip Cursor Change
//=============================================================================
Scene_OmoMenuSkill.prototype.onSkillEquipCursorChange = function() {
  if (this._actorSkillEquipWindow.skillAtIndex()) {
    this.showHelpWindow(15);    
  } else {
    this.hideHelpWindow(15);    
  };
};
//=============================================================================
// * Show Skill List Window
//=============================================================================
Scene_OmoMenuSkill.prototype.showSkillListWindow = function(duration) { 
  // Set Default Duration
  if (duration === undefined) { duration = 15; };  
  // Show Item List Window
  this.showInfoWindow(this._actorSkillListWindow, duration);    
};
//=============================================================================
// * Hide Skill List Window
//=============================================================================
Scene_OmoMenuSkill.prototype.hideSkillListWindow = function(duration) { 
  // Set Default Duration
  if (duration === undefined) { duration = 15; };   
  // Hide Item List Window
  this.hideInfoWindow(this._actorSkillListWindow, duration);    
};
//=============================================================================
// * Show Actor Equip Window
//=============================================================================
Scene_OmoMenuSkill.prototype.showActorSkillEquipWindow = function(index) { 
  // For Refreshing the cursor
  //this._actorSkillEquipWindow.activate();
  this._actorSkillEquipWindow.select(0);
  this._actorSkillEquipWindow.update();
  this._actorSkillEquipWindow.deactivate();
  // Set Cursor Change Handler
  this._actorSkillEquipWindow.setHandler('onCursorChange', this.onSkillEquipCursorChange.bind(this));
  // Set Function Index list index
  this.setFunctionListIndex(0);
  // Set Actor Equip Window Index
  this._actorSkillEquipWindow.setActorIndex(index);  
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

  // Get Skill
  var skill = this._actorSkillEquipWindow.skillAtIndex();  
  // Set Duration
  var duration = 15;
  // If Index is more than 0
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
    var obj = this._actorSkillEquipWindow
    // Create Movement Data
    var data = { obj: obj, properties: ['y'], from: {y: obj.y}, to: {y: Graphics.height - this._actorSkillEquipWindow.height}, durations: {y: duration}, easing: Object_Movement.easeInCirc };
    // Start Move    
    this.move.startMove(data);
  }.bind(this))
  this.queue('setWaitMode', 'movement');

  // Show Help window
  this.queue(function() {   
    this._actorSkillEquipWindow.activate();
  }.bind(this))

  // If Equipment Exists Show help window
  if (skill) { this.queue('showHelpWindow', 15); };
  this.queue('setWaitMode', 'movement');
  // Clear Function List Index 
  this.clearFunctionListIndex();
};
//=============================================================================
// * Hide Actor Equip Window
//=============================================================================
Scene_OmoMenuSkill.prototype.hideActorEquipWindow = function(index) {
  // Set Cursor Change Handler
  this._actorSkillEquipWindow.setHandler('onCursorChange', null);
  if(!!this._statusWindow._statusWindows[index]) {
    this._statusWindow._statusWindows[index].animateFace(false); 
  }
  // Enable Ok Sound
  this._statusWindow._okSoundEnabled = true  
  // Set Function Index list index
  this.setFunctionListIndex(0);

  // this._actorSkillControlWindow.close();
  this.queue('hideHelpWindow', 15)
  this.queue('setWaitMode', 'movement');

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
    var obj = this._actorSkillEquipWindow
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
    // Sort Status Windows
    this._statusWindow.sortStatusWindows();

    var windows = this._statusWindow._statusWindows;
    for (var i2 = 0; i2 < windows.length; i2++) {
     this.showActorStatus(i2);
    };    
  }.bind(this))  
  this.queue('setWaitMode', 'movement');  

  // Show Help window
  this.queue(function() {   
    this._statusWindow.setCursorText(LanguageManager.getMessageData("XX_BLUE.Omori_Mainmenu").select_who);
    this._statusWindow.select(index);
    this._statusWindow.activate();
  }.bind(this))

  // Clear Function List Index 
  this.clearFunctionListIndex();
};





























































//=============================================================================
// ** Window_OmoMenuActorSkillEquip
//-----------------------------------------------------------------------------
// The window for selecting actor skill equipment change.
//=============================================================================
function Window_OmoMenuActorSkillEquip() { this.initialize.apply(this, arguments); }
Window_OmoMenuActorSkillEquip.prototype = Object.create(Window_Selectable.prototype);
Window_OmoMenuActorSkillEquip.prototype.constructor = Window_OmoMenuActorSkillEquip;
//=============================================================================
// * Object Initialization
//=============================================================================
Window_OmoMenuActorSkillEquip.prototype.initialize = function() {
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
Window_OmoMenuActorSkillEquip.prototype.isUsingCustomCursorRectSprite = function() { return true; };
Window_OmoMenuActorSkillEquip.prototype.standardPadding = function() { return 0 }
Window_OmoMenuActorSkillEquip.prototype.windowWidth = function() { return 155; }
Window_OmoMenuActorSkillEquip.prototype.windowHeight = function() { return 135; }
Window_OmoMenuActorSkillEquip.prototype.maxItems = function() { return 4; }
Window_OmoMenuActorSkillEquip.prototype.maxCols = function() { return 1; };
Window_OmoMenuActorSkillEquip.prototype.itemHeight = function() { return 24; };
Window_OmoMenuActorSkillEquip.prototype.itemWidth = function() { return this.windowWidth() - 50; };
Window_OmoMenuActorSkillEquip.prototype.spacing = function() { return 0; };
Window_OmoMenuActorSkillEquip.prototype.customCursorRectXOffset = function() { return -35; }
Window_OmoMenuActorSkillEquip.prototype.customCursorRectYOffset = function() { return 10; }
//=============================================================================
// * Get Actor
//=============================================================================
Window_OmoMenuActorSkillEquip.prototype.setActorIndex = function(index) {
  // If Actor index has changed
  if (this._actorIndex !== index) {
    this._actorIndex = index;
    this.refresh();
  };
};
//=============================================================================
// * Get Actor
//=============================================================================
Window_OmoMenuActorSkillEquip.prototype.actor = function() {
  // Return Actor at Index
  return $gameParty.members()[this._actorIndex];
};
//=============================================================================
// * Get Skill at Index
//=============================================================================
Window_OmoMenuActorSkillEquip.prototype.skillAtIndex = function(index) {
  // Get Index
  if (index === undefined) { index = this.index(); };  
  // Get Actor At Index
  var actor = this.actor();
  // If Actor Exists
  if (actor) {
    // Return Actor Equips slotted at index
    return actor.skills()[index];
  };
  // Return null
  return null;
};
//=============================================================================
// * Get Item Rect
//=============================================================================
Window_OmoMenuActorSkillEquip.prototype.itemRect = function(index) {
  // Get Item Rect
  var rect = Window_Selectable.prototype.itemRect.call(this, index);
  // Adjust Rect
  // rect.x += 188 
  rect.x += 42;
  rect.y += 24;
  // Return rect
  return rect;
};
//=============================================================================
// * Determine if Current Item is enabled
//=============================================================================
Window_OmoMenuActorSkillEquip.prototype.isCurrentItemEnabled = function(index) {
  // Get Index
  if (index === undefined) { index = this.index(); }
  // Get Actor
  var actor = this.actor();
  // Get Equipped Skill
  var equipped = this.skillAtIndex(index);
  // Return true if equipped
  if(actor.isEquipSkillSlotLocked(index)) {return false;}
  if (equipped) { return true; }
  // Get Equippable Skills
  var list = actor.equipableSkills();
  // If There are no skills to equip
  if (list.length <= 0) { return false; }
  // Return true by default
  return true;
};

//=============================================================================
// * Refresh
//=============================================================================
Window_OmoMenuActorSkillEquip.prototype.refresh = function() {
  // Run Original Function
  Window_Selectable.prototype.refresh.call(this);
  // Reset Font Settings
  this.resetFontSettings();
  // Draw Headers
  this.contents.fontSize = 20;
  this.changePaintOpacity(true)  
  this.contents.fillRect(4, 28, this.width - 8, 2, 'rgba(255, 255, 255, 1)');
  this.drawText(LanguageManager.getPluginText('skillMenu', 'skills'), 0, -4, this.width, 'center');  
};
//=============================================================================
// * Draw Item
//=============================================================================
Window_OmoMenuActorSkillEquip.prototype.drawItem = function(index) {
  // Get Rect
  var rect = this.itemRect(index);
  // Get Skill at index
  var skill = this.skillAtIndex(index);
  // Determine if enabled
  var enabled = this.isCurrentItemEnabled(index);
  // If Enabled
  if (enabled) {
    this.changePaintOpacity(true);
    this.contents.textColor = 'rgba(255, 255, 255, 1)';    
  } else {
    this.changePaintOpacity(false);    
    this.contents.textColor = 'rgba(140, 140, 140, 1)';    
  };
  // Get Text
  var text = skill ? skill.name : '------------'
  this.contents.fontSize = LanguageManager.getMessageData("XX_BLUE.Window_OmoMenuActorSkillEquip").skillsFontSize;  
  // Draw Text
  this.contents.drawText(text, rect.x, rect.y + 5, rect.width, rect.height);
  this.changePaintOpacity(true);    
};
//=============================================================================
// * Update Help
//=============================================================================
Window_OmoMenuActorSkillEquip.prototype.updateHelp = function() {
  // Run Original Function
  Window_Selectable.prototype.updateHelp.call(this);
  // Set Help Window Item
  this._helpWindow.setItem(this.skillAtIndex());
  // Call on Cursor Change Handler
  this.callHandler('onCursorChange');
};



























//=============================================================================
// ** Window_OmoMenuSkillEquipControl
//-----------------------------------------------------------------------------
// The window for showing equip/swap prompt in the skill scene.
//=============================================================================
function Window_OmoMenuSkillEquipControl() { this.initialize.apply(this, arguments); }
Window_OmoMenuSkillEquipControl.prototype = Object.create(Window_Command.prototype);
Window_OmoMenuSkillEquipControl.prototype.constructor = Window_OmoMenuSkillEquipControl;
//=============================================================================
// * Object Initialization
//=============================================================================
Window_OmoMenuSkillEquipControl.prototype.initialize = function() {
  // Super Call
  Window_Command.prototype.initialize.call(this, 0, 0);
  // Create Bubble Sprites
  this.createBubbleSprites();   
  // Set Openness to 0
  this.openness = 0; 
  // Deactivate
  this.deactivate();
  // Refresh
  this.refresh();
};
//=============================================================================
// * Settings
//=============================================================================
Window_OmoMenuSkillEquipControl.prototype.isUsingCustomCursorRectSprite = function() { return true; };
Window_OmoMenuSkillEquipControl.prototype.standardOpennessType = function() { return 2;};
Window_OmoMenuSkillEquipControl.prototype.standardPadding = function() { return 4; }
Window_OmoMenuSkillEquipControl.prototype.windowWidth = function () { return 115; };
Window_OmoMenuSkillEquipControl.prototype.windowHeight = function() { return 95; }
Window_OmoMenuSkillEquipControl.prototype.lineHeight = function() { return 26; };
Window_OmoMenuSkillEquipControl.prototype.standardFontSize = function() { return 20; };
Window_OmoMenuSkillEquipControl.prototype.spacing = function() { return 0; };
Window_OmoMenuSkillEquipControl.prototype.standardFontSize = function() { return 28; };
Window_OmoMenuSkillEquipControl.prototype.customCursorRectTextXOffset = function() { return 32; }
Window_OmoMenuSkillEquipControl.prototype.customCursorRectYOffset = function() { return 5; }
//=============================================================================
// * Make Command List
//=============================================================================
Window_OmoMenuSkillEquipControl.prototype.makeCommandList = function() {
  this.addCommand(LanguageManager.getMessageData("XX_BLUE.Omori_Mainmenu_Sceneskill").use, 'use');
  this.addCommand(LanguageManager.getMessageData("XX_BLUE.Omori_Mainmenu_Sceneskill").swap, 'swap');
};
//=============================================================================
// * Update Open
//=============================================================================
Window_OmoMenuSkillEquipControl.prototype.createBubbleSprites = function() {
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
// * Update Open
//=============================================================================
Window_OmoMenuSkillEquipControl.prototype.updateOpen = function() {
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
Window_OmoMenuSkillEquipControl.prototype.updateClose = function() {
  if (this._closing) {
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
Window_OmoMenuSkillEquipControl.prototype.makeBubbleBitmap = function(size) {
  // Create Bitmap
  var bitmap = new Bitmap(size * 2, size * 2);
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
// * Refresh
//=============================================================================
Window_OmoMenuSkillEquipControl.prototype.refresh = function() { 
  // Super Call
  Window_Command.prototype.refresh.call(this);  

  this.contents.fontSize = 24;
  this.drawText(LanguageManager.getMessageData("XX_BLUE.Omori_Mainmenu_Sceneskill").do_what, 10, 0, this.contents.width);
};
//=============================================================================
// * Get Item Rect
//=============================================================================
Window_OmoMenuSkillEquipControl.prototype.itemRect = function(index) {
  var rect = Window_Command.prototype.itemRect.call(this, index);
  rect.y += 24;
  return rect;
};

//=============================================================================
// * Frame Update
//=============================================================================
Window_OmoMenuSkillEquipControl.prototype.update = function() {
  // Super Call
  Window_Command.prototype.update.call(this);
  // Update Bubble Sprites
  this.updateBubbleSprites();
};
//=============================================================================
// * Update Bubble Sprites
//=============================================================================
Window_OmoMenuSkillEquipControl.prototype.updateBubbleSprites = function() { 
  // If Bubble Sprites Exist
  if (this._bubbleSprites) {
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
// ** Window_OmoMenuActorSkillList
//-----------------------------------------------------------------------------
// The window for selecting skills to equip for an actor.
//=============================================================================
function Window_OmoMenuActorSkillList() { this.initialize.apply(this, arguments); }
Window_OmoMenuActorSkillList.prototype = Object.create(Window_SkillList.prototype);
Window_OmoMenuActorSkillList.prototype.constructor = Window_OmoMenuActorSkillList;
//=============================================================================
// * Object Initialization
//=============================================================================
Window_OmoMenuActorSkillList.prototype.initialize = function() {
  // Super Call
  Window_SkillList.prototype.initialize.call(this, 0, 0, this.windowWidth(), this.windowHeight());
  // Init Actor & Slot ID
  this._actor = null;
  this.deselect(0)
  this.deactivate()
};
//=============================================================================
// * Settings
//=============================================================================
Window_OmoMenuActorSkillList.prototype.isUsingCustomCursorRectSprite = function() { return true; };
Window_OmoMenuActorSkillList.prototype.standardPadding = function() { return 4;}
Window_OmoMenuActorSkillList.prototype.windowWidth = function() { return 170 + 277 + 18; }
Window_OmoMenuActorSkillList.prototype.windowHeight = function() { return 135; }
Window_OmoMenuActorSkillList.prototype.maxCols = function() { return 1 +1; };
Window_OmoMenuActorSkillList.prototype.itemHeight = function() { return 32 + 3 - 3; };
Window_OmoMenuActorSkillList.prototype.itemWidth = function() { return 160  ; }; //this.windowWidth() - 50
Window_OmoMenuActorSkillList.prototype.customCursorRectXOffset = function() { return 0; }
Window_OmoMenuActorSkillList.prototype.customCursorRectYOffset = function() { return 5; }
Window_OmoMenuActorSkillList.prototype.customCursorRectTextXOffset = function() { return 25; }
Window_OmoMenuActorSkillList.prototype.isEnabled = function() { return true; };
Window_OmoMenuActorSkillList.prototype.playOkSound = function() { };
Window_OmoMenuActorSkillList.prototype.contentsWidth = function() { return this.windowWidth() - this.standardPadding() * 2; };
Window_OmoMenuActorSkillList.prototype.contentsHeight = function() { return this.windowHeight() - this.standardPadding() * 2; };
//=============================================================================
// * Set Actor
//=============================================================================
Window_OmoMenuActorSkillList.prototype.setActor = function(actor) {
  // Set Actor
  if (this._actor !== actor) {
    this._actor = actor;
    this.refresh();
  };
};
//=============================================================================
// * Make Item List
//=============================================================================
Window_OmoMenuActorSkillList.prototype.makeItemList = function() {
  if (this._actor) {
    this._data = this._actor.equipableSkills().filter(function(item) {
      return this.includes(item);
    }, this);
  } else {
    this._data = [];
  };
  // Push Unequip Null Data
  this._data.push(null);
};
//=============================================================================
// * Determine if item should be included
//=============================================================================
Window_OmoMenuActorSkillList.prototype.includes = function(item) { return true; };
//=============================================================================
// * Determine if Item is enabled
//=============================================================================
Window_OmoMenuActorSkillList.prototype.isEnabled = function(item) { return true };
//=============================================================================
// * Get Item Rect
//=============================================================================
Window_OmoMenuActorSkillList.prototype.itemRect = function(index) {
  // Get Item Rect
  var rect = Window_SkillList.prototype.itemRect.call(this, index);
  // // Adjust Rect
  rect.x += 8;
  rect.y += 22;
  // Return rect
  return rect;
};

//=============================================================================
// * Update Arrows
//=============================================================================

Window_OmoMenuActorSkillList.prototype._updateArrows = function() {
  Window_ItemList.prototype._updateArrows.call(this);
  this._downArrowSprite.visible = this._downArrowSprite.visible && this.x > 10;
  this._upArrowSprite.visible = this._upArrowSprite.visible && this.x > 10;
};

//=============================================================================
// * Refresh Arrows
//=============================================================================
Window_OmoMenuActorSkillList.prototype._refreshArrows = function() {
  // Super Call
  Window_SkillList.prototype._refreshArrows.call(this);
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
Window_OmoMenuActorSkillList.prototype.refresh = function() {
  // Run Original Function
  Window_SkillList.prototype.refresh.call(this);
  // Draw Headers
  this.contents.fontSize = 22;
  this.drawText(LanguageManager.getPluginText('skillMenu', 'replace'), 8, -8, this.contents.width);
};
//=============================================================================
// * Draw Item
//=============================================================================
Window_OmoMenuActorSkillList.prototype.drawItem = function(index) {
  // Get Rect
  var rect = this.itemRectForText(index);
  // Get Item
  var item = this._data[index];
  // Determine if enabled
  var enabled = this.isCurrentItemEnabled(index);
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
Window_OmoMenuActorSkillList.prototype.updateHelp = function() {
  // Super Call
  Window_SkillList.prototype.updateHelp.call(this);
  // if (this._actor && this._statusWindow) {
  //   var actor = JsonEx.makeDeepCopy(this._actor);
  //   actor.forceChangeEquip(this._slotId, this.item());
  //   this._statusWindow.setTempActor(actor);
  // };
};
