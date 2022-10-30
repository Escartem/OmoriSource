//=============================================================================
// Gamefall Team Plugins - Bug fixes and Optimization for OMORI
// GTP_OmoriFixes.js    VERSION 3.5.1
//=============================================================================

var Imported = Imported || {};
Imported.GTP_OmoriFixes = true;

var Gamefall = Gamefall || {};
Gamefall.OmoriFixes = Gamefall.OmoriFixes || {};

// For .exe
// showDevTools()

//=============================================================================
 /*:
 * @plugindesc v3.5.1 Bug Fixes and Optimization for OMORI
 * @author Gamefall Team || Luca Mastroianni
 * @help
 * CHANGELOG:
 * VERSION 1.0.0: Plugin Released!
 * VERSION 1.0.1: Disable cursorPageup and cursorPagedown for Window_BattleActor
 * VERSION 1.1.1: Possible Sprite Jitter fix;
 * VERSION 2.0.0: Removed Jitter Fix, waiting to find a new method; MADE UPDATE METHOD AS RPG MAKER MZ
 * for avoiding cursor freeze.
 * VERSION 2.0.1: Improved faces not-loading fix; Update Debugger;
 * Scene Menu improvements;
 * VERSION 2.0.2: Added Run animation set in common event database at ID 997;
 * Removed "white dot" fixing Aries Animation Screen Effect
 * VERSION 2.0.3: Improved escape animation processing for not colliding with abort;
 * VERSION 2.0.4: Solved Sprout mole singing tomato bug;
 * VERSION 2.0.5: Added focus/unfocus events for Scene and WebAudio;
 * VERSION 2.0.6: Fixed problem with camera goings crazy on looping events;
 * VERSION 2.1.0: Children updates with a faster For/of instead of ForEach.
 * Added texture forced flush on the end of scenes.
 * VERSION 2.1.1: Solved Game Menu Freezes. They're related to the Set Wait Mode;
 * Solved bug related to renderer thay may freeze FPS; Added YSP Video Player 
 * to wait when window unfocused; Fixed focusing on minimize; Delta time to 1.1 for stabilizing;
 * Solved FPS delay when created Event Mini Label;
 * VERSION 2.1.2: New fix for faces un-loading -> BLT to Sprite. Icon not-loading possible solution
 * added.
 * VERSION 2.2.0: Added fix to YSP Video Player for not losing texture context; Added check to 
 * max video duration. Omori Final Battle Scene FIX;
 * VERSION 2.2.1: Damage Popup layer fix; 
 * VERSION 2.2.2: Fix for repeating skills; Fixing SOMETHING and OMORI transition battles;
 * VERSION 2.2.3: Force sprite clearing for faces;
 * VERSION 2.3.0: Removed face and icon sprite model for avoiding "Squishy Effect";
 * Reserving Release Energy Picture; Multihit Events;
 * VERSION 2.3.1: Replacing ForEach with For/Of loop for event refreshing; Remade fix for avoding events
 * to trigger on multihit.
 * VERSION 2.3.2: Improved looping audio logic; Added line for checking JUICE responsively;
 * VERSION 2.3.3: Sprite Balloon waiting time set equal to 0; Solved Horror Filter incompatibility;
 * VERSION 2.4.0: Added Permanent Data system; Added a QueueForScriptCall battle manager method;
 * VERSION 2.4.1: Added battle's fade in directly in code;
 * VERSION 2.4.2: Smoother transition for battle (Space Ex Husband);
 * VERSION 2.4.3: Fixed fear of drowning;
 * VERSION 2.4.4: Making status window to update when the action is ended; Added checker to add state;
 * VERSION 2.4.5: Fixing the "It had no effect." popping up on Death State; Adding waiting method for RANDOM ENEMY EMOTION
 * Better checker for the had not enough Juice string; Fixed Humprey battle;
 * VERSION 2.4.6: Added support for dynamic tone changer; Making video responsive to BGM volume; Added Angelic Voice Fix;
 * VERSION 2.4.7: Made Confetti, Rain Cloud, Air Horn skills by code;
 * VERSION 2.5.0: Removed debbuger log creation, It's probably not needed anymore;
 * New message FaceBox logic; Resolved moving damage Hack Away and similar;
 * VERSION 2.5.1: Fixed Jawsum troop; Coded Happy Gas as other ALL targets skills;
 * VERSION 2.6.0: Skill equipped when learned if there is room in the equipped skills; New facebox system;
 * VERSION 2.6.1: Added new GTP Skills;
 * VERSION 2.6.2: Added WriteToFile for ending title screen;
 * VERSION 2.7.0: New jitter fix test; Added wait for all SE methods;
 * VERSION 2.7.1: Added utility method; Removed some GTP Skills; Moved It had no Effect checker 
 * inside finish actions methods;
 * VERSION 2.7.2: Added Steam Overlay fix;
 * VERSION 2.7.3: Added checker for Archeia_Steamworks;
 * VERSION 2.7.4: Written a specific blur method for MAC, because the ticker on MacOs stops 
 * as soon as the click out window. Added warning message when Archeia Achivements is disabled (Temporary);
 * BGM and BGS of battle faded and MAP BGM and BGS restarted after scene terminate;
 * VERSION 2.8.0: Added Achivements:
 * VERSION 2.8.1: Solved bug related to added achievements; Edited the add state method;
 * VERSION 2.8.2: It had no effect specified only for certain Bosses' enemies; Added ZIndex for enemies;
 * VERSION 2.8.3: Removed other GTP Skills
 * VERSION 2.8.4: It had no effect re added only for emotional states and only for enemies (all);
 * Custom Forcing Battle Log;
 * VERSION 2.8.5: Added connection to ACHIEVEMENTS_COUNT in steamworks; Clearing damaged player
 * temp at the end of battles for being sure it not processes again;
 * VERSION 2.8.6: Added a seed random generator; Correctly cache damage popup;
 * VERSION 2.8.7: Clearing Neutral Face Switch at the end of each battle;
 * VERSION 2.9.0: Added MAC screen resolution fix;
 * VERSION 2.9.1: Added fix for tutorial troops; Force clear switch 466;
 * VERSION 2.9.2: Set start tint for Rare Bear;
 * VERSION 2.9.3: Permanent Data Manager fix and Greenworks compatiblity for MAC
 * VERSION 2.9.4: Added Second Chance message logic in code; Cleared FORCE PLOT AT ARMOR AT 
 * THE END OF EACH BATTLE
 * VERSION 3.0.0: Super game polishing; List too long for report all bugs;
 * VERSION 3.1.1: Added checker for avoiding crash when TDS Footprits is disabled;
 * VERSION 3.1.2: Solved issue with move route;
 * VERSION 3.1.3: Added "screen" blend mode for loading instances;
 * VERSION 3.2.0: Restored horizontal shake; improved no effect text; gamepad timestamp fix;
 * VERSION 3.2.1: New screen fix for MAC;
 * VERSION 3.2.2: Fixed play actor collapse; Added immortality ON/OFF when setup
 * and finish actions been replaced;
 * VERSION 3.2.3: Disabled F5; Resolved error related to victory confetti;
 * VERSION 3.2.4: Space Ex Husband improved flash code; Added blur filter in menu by GPU;
 * VERSION 3.2.5: Fixed menu blur;
 * VERSION 3.2.6: Fears wait for tint;
 * VERSION 3.3.0: New format for footstep sounds; Fixed Pluto vs Earth transition; Space Ex Husband
 * flash logic improved;
 * VERSION 3.5.0: RELEASE FINAL - Added encryption codes;
 * VERSION 3.5.1: COMPATIBILITY BETWEEN JP VERSIONS
 */
 //=============================================================================

(function($) {

	//###############################################################################
	//
	// 12/08 GAMEPAD SELECTION FIX
	//
	//###############################################################################

	Input._updateGamepadState = function(gamepad) {
		var lastState = this._gamepadStates[gamepad.index] || [];
		var newState = [];
		var buttons = gamepad.buttons;
		var axes = gamepad.axes;
		var threshold = 0.5;
		newState[12] = false;
		newState[13] = false;
		newState[14] = false;
		newState[15] = false;
		for (var i = 0; i < buttons.length; i++) {
			newState[i] = buttons[i].pressed;
		}
		if (axes[1] < -threshold) {
			newState[12] = true;    // up
		} else if (axes[1] > threshold) {
			newState[13] = true;    // down
		}
		if (axes[0] < -threshold) {
			newState[14] = true;    // left
		} else if (axes[0] > threshold) {
			newState[15] = true;    // right
		}
		for (var j = 0; j < newState.length; j++) {
			if (newState[j] !== lastState[j]) {
				var buttonName = this.gamepadMapper[j];
				if (buttonName) {
					if(newState[j]) {Input._lastGamepad = gamepad.index}
					this._currentState[buttonName] = newState[j];
				}
			}
		}
		this._gamepadStates[gamepad.index] = newState;
	};	

	//Input._onLostFocus = function() {}

	//###############################################################################
	//
	// 11/30 MAC FIX for screen resolution
	//
	//###############################################################################

	const _old_yanfly_updateResolution = Yanfly.updateResolution;
	Yanfly.updateResolution = function() {
		const os = require("os");
		if(os.platform() !== "darwin") {return _old_yanfly_updateResolution.call(this);}
		const nw = require("nw.gui");
		const nw_window = nw.Window.get();
		let resizeWidth = Yanfly.Param.ScreenWidth - window.innerWidth;
		let resizeHeight = Yanfly.Param.ScreenHeight - window.innerHeight;
		nw_window.moveBy(-1 * Math.ceil(resizeWidth/2), -1 * Math.ceil(resizeHeight/2));
		nw_window.resizeBy(resizeWidth, resizeHeight);

	}

	Yanfly.moveToCenter = function() {
		// Get Window X & Y Coordinates
		var x = (window.screen.width - Yanfly.Param.ScreenWidth) / 2
		var y = (window.screen.height - Yanfly.Param.ScreenHeight) / 2
		x = Math.floor(x);
		y = Math.floor(y);
		// Center Window
		const os = require("os");
		if(os.platform() !== "darwin") {window.moveTo(x,y)}
		else {
			const nw = require("nw.gui");
			const nw_window = nw.Window.get();
			nw_window.moveTo(x,y)
		}
	}

	$.Shake_Method = function() {
		if(Utils.isMac()) {
			const nw = require("nw.gui");
			const nw_window = nw.Window.get();
			nw_window.moveTo($.store_coordinates[0] + Math.round(8*Math.random()), $.store_coordinates[1] + Math.round(8*Math.random()));
		}
		else {
			window.moveTo($.store_coordinates[0] + (8*Math.random()), $.store_coordinates[1] + (8*Math.random()));
		}
	}

	$.Window_Shake = function(remove) {
		if(!Graphics._isFullScreen()) {return false;}
		if(!!remove) {
			SceneManager.ticker.remove(this.Shake_Method, this);
			$.store_coordinates = [];
			return;
		}
		if(Utils.isMac()) {
			const nw = require("nw.gui");
			const nw_window = nw.Window.get();
			$.store_coordinates = [nw_window.x, nw_window.y];
		}
		else {
			$.store_coordinates = [window.screenX, window.screenY];
		}
		SceneManager.ticker.add(this.Shake_Method, this);
	}

	//###############################################################################
	//
	// IMAGE MANAGER
	//
	//###############################################################################

	/*ImageManager = class extends ImageManager {

		static loadBitmap(folder, filename, hue, smooth) {
			let bitmap = super.loadBitmap(folder, filename, hue, smooth)
			if(this.isReady()) {return bitmap;}
			if(!$gameParty.inBattle()) {
				if(!!$gameMap._interpreter.isRunning()) {
					$gameMap._interpreter.setWaitMode("image");
				}
			}
			return bitmap;
		}
		
	}*/

	//###############################################################################
	//
	// MATH
	//
	//###############################################################################

	Math._lastRand = 0;

	Math.seedRandom = function(max) {
		//let rand = (Graphics.frameCount*Math.PI) % 1;
		Math._lastRand = (new Date().getTime()*Math.PI) % 1;
		return Math.floor(max * rand);
	}
	
	//Math.randomInt = function(max) {return Math.seedRandom(max);}

	//###############################################################################
	//
	// UTILS
	//
	//###############################################################################

	Utils = class extends Utils {
		static range(size, startAt = 0) {
			return [...Array(size).keys()].map(i => i + startAt);
		}
		
		static forceStatusRefresh() {
			return SceneManager._scene._statusWindow.refresh();
		}

		static isMac() {
			return this._isMac;
		}

		static setMac(value = false) {
			return this._isMac = value;
		}
	}

	//###############################################################################
	//
	// CONSTANTS
	//
	//###############################################################################

	const DEFAULT_COLOR = [0,0,0,0];
	const BLACK_TINT = [-255,-255,-255,255];

	//###############################################################################
	//
	// DEBUGGER
	//
	//###############################################################################

	Debugger = class {

		static jitterDebug() {
			let player = $gamePlayer;
			this._jitterWindow = new Window_Base(0,0,Math.floor(Graphics.boxWidth / 1.5), 36 * 4);
			this._jitterWindow.refresh = function() {
				this.contents.clear();
				this.drawText(`SX: ${player.screenX()}`, 0, this.lineHeight() * 0, this.contents.width, "left");
				this.drawText(`SY: ${player.screenY()}`, 0, this.lineHeight() * 0, this.contents.width, "right");
				this.drawText(`DX: ${$gameMap.displayX()}`, 0, this.lineHeight() * 1, this.contents.width, "left");
				this.drawText(`DY: ${$gameMap.displayY()}`, 0, this.lineHeight() * 1, this.contents.width, "right");
				this.drawText(`SCX: ${player.scrolledX()}`, 0, this.lineHeight() * 2, this.contents.width, "left");
				this.drawText(`SCY: ${player.scrolledY()}`, 0, this.lineHeight() * 2, this.contents.width, "right");
			}
			this._jitterWindow.update = function() {
				Window_Base.prototype.update.call(this);
				this.refresh();
			}
			SceneManager._scene.addChild(this._jitterWindow);
		}

		static clearJitterDebug() {
			this._jitterWindow.parent.removeChild(this._jitterWindow);
		}

		static weakenEnemies() {
			return $gameTroop.members().forEach(m => m._hp = 1)
		}

		static weakenActors() {
			return $gameParty.members().forEach(m => m._hp = 1)
		}

		static getMap() {
			let id = $gameMap.mapId();
			return console.table($dataMapInfos[id]);
		}

		static unlockBlackLetters() {
			for(let i = 0; i < 26; i++) {
				if($gameParty.hasItem($dataItems[850 + i])) {continue;}
				$gameParty.gainItem($dataItems[850 + i], 1);
				$gameSwitches.setValue(1101 + i, true);
			}
		}

		static unlockRequiredLetters() {
			let requiredLetters = [850,851,852,854,860,861,862,864,865,868,869,872];
			let switches = [1101,1102,1103,1105,1111,1112,1113,1115,1116,1119,1120,1123];
			for(let i = 0; i < requiredLetters.length; i++) {
				$gameParty.gainItem($dataItems[requiredLetters[i]], 1);
				$gameSwitches.setValue(switches[i], true);
			}
		}

		static loseContext() {
			const canv = Graphics._canvas;
			let ctx = canv.getContext("webgl", {});
			if(!!ctx) {
				console.log("Forcefully destroying context...");
				ctx.getExtension("WEBGL_lose_context").loseContext();
			}
		}
	}

	//###############################################################################
	//
	// SCENE BOOT
	//
	//###############################################################################


	Scene_Boot = class extends Scene_Boot {

		start() {
			super.start();
			this.determineOS();
			if(!!this.hasSteamwork()) {
				this.getAchievementsData();
			}
			else if(!this.hasSteamwork() && !Utils.isOptionValid("test")) {
				throw new Error("Steam has not been detected.")
			}
			if(!Utils.isOptionValid("test") && window.navigator.plugins.namedItem('Native Client') !== null) {
				throw new Error("This game does not work in SDK mode.")
			}
			if(Utils.isMac()) {
				const nw = require("nw.gui");
				const nw_window = nw.Window.get();
				nw_window.on("restore", () => {
					if(!Graphics._isFullScreen()) {return;}
					Yanfly.updateResolution();
					Yanfly.moveToCenter();
				})
			}
			this.initNWScreen();
		}

		hasSteamwork() {
			if(!Imported.Archeia_Steamworks) {return false;}
			return !!SceneManager.steamworksInitialized();
		}

		getAchievementsData() {
			$._achievementsCount = $gameSystem.getNumberOfAchievements();
			$._achievementsUnlocked = [];
			let achievementNames = $gameSystem.getAchievements();
			for(let ach of achievementNames) {
				steamworks.getAchievement(ach, (unlocked) => {
					if(!!unlocked) {$._achievementsUnlocked.push(ach)}
				})
			}
		}

		determineOS() {
			const os = require("os");
			Utils.setMac(os.platform() === "darwin");
		}
		
		initNWScreen() {
			const nw = require("nw.gui");
			nw.Screen.Init();
			nw.Screen.on('displayAdded', () => {
				setTimeout(() => {
					Yanfly.updateResolution();
					Yanfly.moveToCenter();
				}, 100)

			});
			nw.Screen.on('displayRemoved', () => {
				setTimeout(() => {
					Yanfly.updateResolution();
					Yanfly.moveToCenter();
				}, 100)
			});
			nw.Screen.on('displayBoundsChanged', () => {
				setTimeout(() => {
					Yanfly.updateResolution();
					Yanfly.moveToCenter();
				}, 100)
			});
		}
	}

	//###############################################################################
	//
	// BITMAP
	//
	//###############################################################################

	Bitmap = class extends Bitmap {

		removeLoadListeners() {
			if(!this._image) {return;}
			this._image.removeEventListener('load', this._loadListener);
			this._image.removeEventListener('error', this._errorListener);
			this._loadListeners = [];
		}

		/*_drawTextBody(text, tx, ty, maxWidth) {
			var context = this._context;
			context.imageSmoothingEnabled = false;
			tx = Math.ceil(tx);
			ty = Math.ceil(ty);
			maxWidth = Math.ceil(maxWidth);
			return super._drawTextBody(text, tx, ty, maxWidth)
		}*/

	}



	//###############################################################################
	//
	// SCENE BASE
	//
	//###############################################################################

	const _old_scene_base_detachReservation = Scene_Base.prototype.detachReservation;
	Scene_Base.prototype.detachReservation = function() {
		_old_scene_base_detachReservation.call(this);
		this.forceFlush();
	}

	const _old_scene_base_checkGameover = Scene_Base.prototype.checkGameover;	
	Scene_Base.prototype.checkGameover = function() {
		let OMORI = $gameActors.actor(1);
		let OMORI_DEAD = OMORI.isDead() || OMORI.hp <= 0
		if(!$gameParty.inBattle() && OMORI_DEAD && OMORI.index() > -1) {
			return SceneManager.goto(Scene_Gameover);
		}
		_old_scene_base_checkGameover.call(this);
	};

	//###############################################################################
	//
	// SCENE BASE EX
	//
	//###############################################################################

	Scene_BaseEX.prototype.clearQueue = function() {
		this.clearFunctionListIndex();
		this.clearFunctionList();
	}

	Scene_BaseEX.prototype.clearWaitMode = function() {return this.setWaitMode('')}

	//###############################################################################
	//
	// SCENE OMO MENU BASE
	//
	//###############################################################################

	const _old_omo_menu_scene_menuBase_showWindows = Scene_OmoMenuBase.prototype.showWindows;
	Scene_OmoMenuBase.prototype.showWindows = function() {
		this.clearQueue(); 
		this.clearWaitMode(); 
		_old_omo_menu_scene_menuBase_showWindows.call(this);
	}

	const _old_omo_menu_scene_menuBase_hideWindows = Scene_OmoMenuBase.prototype.hideWindows;
	Scene_OmoMenuBase.prototype.hideWindows = function() {
		this.clearQueue(); 
		this.clearWaitMode(); 
		_old_omo_menu_scene_menuBase_hideWindows.call(this);
	}

	const _old_scene_omo_menu_createBackground = Scene_OmoMenuBase.prototype.createBackground;
	Scene_OmoMenuBase.prototype.createBackground = function() {
		_old_scene_omo_menu_createBackground.call(this);
		this._backgroundSprite.blur = new PIXI.filters.BlurFilter();
		this._backgroundSprite.filters = [this._backgroundSprite.blur];
		this._backgroundSprite.blur.blur = 1;
		this._backgroundSprite.blur.padding = 0;
	};

	const _scene_omomenuBase_stop = Scene_OmoMenuBase.prototype.stop;
	Scene_OmoMenuBase.prototype.stop = function() {
		if(SceneManager.isNextScene(Scene_Gameover)) {this.startFadeOut(30)}
		_scene_omomenuBase_stop.call(this);
	}

	//###############################################################################
	//
	// SCENE OMO MENU SKILL
	//
	//###############################################################################

	const _old_omo_menu_scene_skill_hideActorEquipWindow = Scene_OmoMenuSkill.prototype.hideActorEquipWindow;
	Scene_OmoMenuSkill.prototype.hideActorEquipWindow = function(index) {
		this.clearQueue(); // Be Sure to clear the QUEUE;
		this.clearWaitMode(); // Be sure to clear Wait Mode;
		return _old_omo_menu_scene_skill_hideActorEquipWindow.call(this, index);
	}

	const _old_omo_menu_scene_skill_onActorSkillControlUse = Scene_OmoMenuSkill.prototype.onActorSkillControlUse;
	Scene_OmoMenuSkill.prototype.onActorSkillControlUse = function() {
		this.clearQueue(); 
		this.clearWaitMode(); 
		_old_omo_menu_scene_skill_onActorSkillControlUse.call(this);
	}

	const _old_omo_menu_scene_skill_showActorSkillEquipWindow = Scene_OmoMenuSkill.prototype.showActorSkillEquipWindow;
	Scene_OmoMenuSkill.prototype.showActorSkillEquipWindow = function(index) {
		this.clearQueue(); 
		this.clearWaitMode(); 
		_old_omo_menu_scene_skill_showActorSkillEquipWindow.call(this, index);
	}

	//###############################################################################
	//
	// SCENE OMO MENU EQUIP
	//
	//###############################################################################

	const _old_omo_menu_scene_equip_hideActorEquipWindow = Scene_OmoMenuEquip.prototype.hideActorEquipWindow;
	Scene_OmoMenuEquip.prototype.hideActorEquipWindow = function(index) {
		this.clearQueue(); // Being Sure to clear the QUEUE;
		this.clearWaitMode();
		return _old_omo_menu_scene_equip_hideActorEquipWindow.call(this, index);
	}

	const _old_omo_menu_scene_equip_showActorEquipWindow = Scene_OmoMenuEquip.prototype.showActorEquipWindow;
	Scene_OmoMenuEquip.prototype.showActorEquipWindow = function(index) { 
		this.clearQueue(); // Being Sure to clear the QUEUE;
		this.clearWaitMode();
		_old_omo_menu_scene_equip_showActorEquipWindow.call(this, index);
		this._helpWindow.setItem(this._actorEquipWindow.equipmentAtIndex(0));
	}

	//###############################################################################
	//
	// SCENE OMO MENU ITEM
	//
	//###############################################################################

	Scene_OmoMenuItem = class extends Scene_OmoMenuItem {

		start() {
			this.clearQueue();
			this.clearWaitMode();
			return super.start();
		}

		onStatusWindowOk() {
			this.clearQueue(); 
			this.clearWaitMode(); 
			return super.onStatusWindowOk();			
		}

		onItemCategoryOk() {
			this.clearQueue(); 
			this.clearWaitMode(); 
			return super.onItemCategoryOk();
		}

		onItemCategoryCancel() {
			this.clearQueue(); 
			this.clearWaitMode(); 
			return super.onItemCategoryCancel();
		}

		onItemListOk() {
			this.clearQueue(); 
			this.clearWaitMode(); 			
			return super.onItemListOk();
		}

		onItemListCancel() {
			this.clearQueue(); 
			this.clearWaitMode(); 
			return super.onItemListCancel();
		}

		onItemConfirmationUse() {
			this.clearQueue(); 
			this.clearWaitMode(); 
			return super.onItemConfirmationUse();
		}

		onItemConfirmationTrash() {
			this.clearQueue(); 
			this.clearWaitMode(); 
			return super.onItemConfirmationTrash();
		}

		onItemConfirmationCancel() {
			this.clearQueue(); 
			this.clearWaitMode(); 
			return super.onItemConfirmationCancel();
		}

		onItemTrashPromptOk() {
			this.clearQueue(); 
			this.clearWaitMode(); 
			return super.onItemTrashPromptOk();
		}

		onItemTrashPromptCancel() {
			this.clearQueue(); 
			this.clearWaitMode(); 
			return super.onItemTrashPromptCancel();
		}

		onStatusWindowOk() {
			this.clearQueue(); 
			this.clearWaitMode(); 
			return super.onStatusWindowOk();
		}
	}

	//###############################################################################
	//
	// GAME BATTLER
	//
	//###############################################################################

	Game_Battler.prototype._isEmotionalState = function(stateId) {
		return [6,7,8,10,11,12,14,15,16,18].contains(stateId)
	}

	Game_Battler.prototype._isStateState = function(stateId) {
		return [89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106].contains(stateId)
	}

	const _old_game_battler_addState = Game_Battler.prototype.addState;
	Game_Battler.prototype.addState = function(stateId) {
		let addable = this.isStateAddable(stateId) && !this.isStateAffected(stateId);
		_old_game_battler_addState.call(this, stateId);
		let paperBag = this.isActor() && this.isEquipped($dataArmors[49]);
		if(!!paperBag) {
			if(!!this._isEmotionalState(stateId)) {this._noEffectMessage = true;}
		}
		if(!!this._isStateState(stateId) && !addable) {this._noStateMessage = true;}
		if(this.isEnemy()) {
			var exhusband = $dataEnemies[402]
			if(stateId === this.deathStateId() && this.name() === exhusband.name && !this._immortalState) {
				let baseId =  this.enemy().meta.TransformBaseID;
				if(parseInt(baseId) !== this.enemyId()) {
					$gameScreen.setFlashWait(60);
					$gameScreen.startFlash([255,255,255,255], 130);
				}
			}
			if(!!this._isEmotionalState(stateId) && !addable) {this._noEffectMessage = true;}
		}
	}

	Game_Battler.prototype.isEmotionAddable = function(type) {
		switch(type.toLowerCase()) {
			case "happy":
				if(this.isStateAffected(7)) {return this.isStateAddable(8);}
				else if(this.isStateAffected(6)) {return this.isStateAddable(7);}
				else {return this.isStateAddable(6)}
			case "sad":
				if(this.isStateAffected(11)) {return this.isStateAddable(12);}
				else if(this.isStateAffected(10)) {return this.isStateAddable(11);}
				else {return this.isStateAddable(10)}
			case "angry":
				if(this.isStateAffected(15)) {return this.isStateAddable(16);}
				else if(this.isStateAffected(14)) {return this.isStateAddable(15);}
				else {return this.isStateAddable(14)}
			case "afraid":
				return this.isStateAddable(18);
		}
	}

	Game_Battler.prototype.isEmotionAffected = function(type, noCustom = false) {
		let Space_Ex_Boyfriend_Angry = this.isStateAffected(119) || this.isStateAffected(120) || this.isStateAffected(121);
		let Sweetheart_Happy = this.isStateAffected(197) || this.isStateAffected(122) || this.isStateAffected(123);
		let Unbread_Twins_Sad = this.isStateAffected(124) || this.isStateAffected(125) || this.isStateAffected(126);
		if(!!noCustom) {
			Space_Ex_Boyfriend_Angry = false;
			Sweetheart_Happy = false;
			Unbread_Twins_Sad = false;
		}
		switch(type.toLowerCase()) {
			case "happy":
				return this.isStateAffected(6) || this.isStateAffected(7) || this.isStateAffected(8) || Sweetheart_Happy;
			case "sad":
				return this.isStateAffected(10) || this.isStateAffected(11) || this.isStateAffected(12) || Unbread_Twins_Sad;
			case "angry":
				return this.isStateAffected(14) || this.isStateAffected(15) || this.isStateAffected(16) || Space_Ex_Boyfriend_Angry;
			case "afraid":
				return this.isStateAffected(18);
		}
	}

	Game_Battler.prototype.isAnyEmotionAffected = function(noCustom = false) {
		return !!this.isEmotionAffected("happy", noCustom) || !!this.isEmotionAffected("angry", noCustom) || !!this.isEmotionAffected("sad", noCustom) || !!this.isEmotionAffected("afraid", noCustom)
	}
	//=======================================================================
	// Removing Guard Skill ID
	
	//=======================================================================
	// Just for be REALLY sure that these flags clears correctly

	const _old_game_battler_onTurnStart = Game_Battler.prototype.onTurnStart;
	Game_Battler.prototype.onTurnStart = function() {
		_old_game_battler_onTurnStart.call(this);
		this._noEffectMessage = undefined;
		this._noStateMessage = undefined;
	};

	const _old_game_battler_onTurnEnd = Game_Battler.prototype.onTurnEnd;
	Game_Battler.prototype.onTurnEnd = function() {
		_old_game_battler_onTurnEnd.call(this);
		this._noEffectMessage = undefined;
		this._noStateMessage = undefined;
	};

	const _old_game_battler_onBattleEnd = Game_Battler.prototype.onBattleEnd;
	Game_Battler.prototype.onBattleEnd = function() {
		_old_game_battler_onBattleEnd.call(this);
		this._noEffectMessage = undefined;
		this._noStateMessage = undefined;
	};

	const _old_game_battler_onBattleStart = Game_Battler.prototype.onBattleStart;
	Game_Battler.prototype.onBattleStart = function() {
		_old_game_battler_onBattleStart.call(this);
		this._noEffectMessage = undefined;
		this._noStateMessage = undefined;
	};

	//###############################################################################
	//
	// GAME MAP
	//
	//###############################################################################

	//==================================================================
	// Sprite and Map Jitter FIX


	Game_Map = class extends Game_Map {

		displayX() {return /*Math.floor*/(this._displayX * $gameMap.tileWidth()) / $gameMap.tileWidth();}
		displayY() {return /*Math.floor*/(this._displayY * $gameMap.tileHeight()) / $gameMap.tileHeight();}

		refresh() {
			for(let event of this.events()) {event.refresh();}
			for(let event of this._commonEvents) {event.refresh();}
			this.refreshTileEvents();
			this._needsRefresh = false;
		}

		refreshTileEvents() {
			this.tileEvents = this.events().filter(event => { 
				return !!event && event.isTile();
			})
		}

		displayName() {
			const loc = LanguageManager.getMessageData("XX_BLUE.Map_Display_Names")
			const id = $gameMap.mapId()
			if(!loc[id]) {
				return super.displayName();
			}
			return loc[id];
		}
		
	}

	//###############################################################################
	//
	// WINDOW MESSAGE
	//
	//###############################################################################

	Window_Message.prototype.createFaceBoxWindows = function() {
		this._faceBoxWindowContainer = new Sprite();
		let tx = (this.x + this.width + 2);
		this._faceBoxWindowContainer.x = ((Graphics.width - 16) + tx + 2) - tx;
		this._faceBoxWindow = new Window_MessageFaceBox();
		this._faceBoxWindow.x = -(this._faceBoxWindow.width+2)
		this._faceBoxWindow.openness = 0;
		this._faceBoxWindowContainer.addChild(this._faceBoxWindow);
	}

	Window_Message.prototype.loadMessageFace = function() {
		_TDS_.OmoriBASE.Window_Message_loadMessageFace.call(this);
		if($gameMessage.faceName() !== '') {
			this._faceBoxWindow.setup($gameMessage.faceName(), $gameMessage.faceIndex(), $gameMessage._faceBackgroundColor);
			this._faceBoxWindow.refresh();
			this._faceBoxWindow.open();
		}
		else {
			this._faceBoxWindow.close();
			this._faceBoxWindow.clear();
			this._faceBoxWindow.refresh();
		}
	}

	//###############################################################################
	//
	// WINDOW MESSAGE FACE BOX
	//
	//###############################################################################
	
	//==================================================================
	// This should fix the not loading faces issue

	  Window_MessageFaceBox = class extends Window_MessageFaceBox {

			// 10/07 -> Added DIRECTLY the loaded bitmap to drawFace;
			refresh() {
				this._stopFace = false;
				this._faceReady = false;
				if(!this._faceBitmap) {return super.refresh();}
				this._faceBitmap.addLoadListener(() => super.refresh());
			}

			drawFace(faceName, faceIndex, x, y, width, height) {
				if(!!this._stopFace) {return this._faceReady = true;}
				width = width || Window_Base._faceWidth;
				height = height || Window_Base._faceHeight;
				var bitmap = !!this._faceBitmap ? this._faceBitmap : ImageManager.loadFace(faceName);
				var pw = Window_Base._faceWidth;
				var ph = Window_Base._faceHeight;
				var sw = Math.min(width, pw);
				var sh = Math.min(height, ph);
				var dx = Math.floor(x + Math.max(width - pw, 0) / 2);
				var dy = Math.floor(y + Math.max(height - ph, 0) / 2);
				var sx = faceIndex % 4 * pw + (pw - sw) / 2;
				var sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
				// 10/19 Replaced blt with SPRITE;
				this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy);
				this.clear();
				this._faceReady = true;
			}

			clear() {
				this._stopFace = true;
				if(!!this._faceBitmap) {this._faceBitmap.removeLoadListeners();}
				return super.clear();
			}

			isFaceReady() {return !!this._faceReady}
	  }

	//###############################################################################
	//
	// GRAPHICS
	//
	//###############################################################################


	Graphics = class extends Graphics {

		//==================================================================
		// This fix is needed for bug #30 to hide clipboard textBase;
		static _createClipboardText() {
			super._createClipboardText();
			this._clipboardText.style.visibility = "hidden";
		}

		static _createCanvas() {
			this._overlayFix = document.createElement("canvas");
			this._overlayFix.width = window.screen.width;
			this._overlayFix.height = window.screen.height;
			this._overlayFix.style.top = "0px";
			this._overlayFix.style.left = "0px";
			this._overlayFix.style.margin = "none"
			this._overlayFix.style.position = "absolute"
			document.body.appendChild(this._overlayFix);
			super._createCanvas();
		}

		static _restoreContext() {
			if(this._renderer.type !== PIXI.RENDERER_TYPE.WEBGL || this._rendererType === "canvas") {
				// This condition is needed for avoiding problems 
				// with canvas or Unknown renderer.
				return;
			}
			const gl = this._renderer.gl;
			if(!gl.isContextLost()) {return;}
			if(!this._webglContext) {return;}
			this._webglContext.restoreContext();
		}

		static render(stage) {
			if (this._skipCount === 0) {
				this._restoreContext();
				var startTime = Date.now();
				if (stage) {
					this._renderer.render(stage);
					if (this._renderer.gl && this._renderer.gl.flush) {
						this._renderer.gl.flush();
					}
				}
				var endTime = Date.now();
				var elapsed = endTime - startTime;
				this._skipCount = Math.min(Math.floor(elapsed / 15), this._maxSkip);
				this._rendered = true;
			} else {
				this._skipCount = Math.max(this._skipCount - 1, 0);
				this._rendered = false;
			}
			/*this._renderer.render(stage);
			if (this._renderer.gl && this._renderer.gl.flush) {
				this._renderer.gl.flush();
			}
			this._rendered = true;*/
			//this.frameCount++;
			// Sinusoidal Frame Counts
			this.frameCount = (this.frameCount + 1) % 1024;
		}

		static _setupPixi() {
			PIXI.settings.RENDER_OPTIONS.roundPixels = true;

			PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
			PIXI.settings.PRECISION_FRAGMENT = PIXI.PRECISION.HIGH
		}

		static _createRenderer() {
			this._setupPixi();
			super._createRenderer();
			if(!!this._renderer.gl) {
				this._webglContext = this._renderer.gl.getExtension("WEBGL_lose_context");
			}
		}

		static _isFullScreen() {
			const os = require("os");
			if(os.platform() !== "darwin") {return super._isFullScreen();}
			const nw = require("nw.gui");
			const nw_window = nw.Window.get();
			return !nw_window.isFullscreen;			
		}

		static _requestFullScreen() {
			const os = require("os");
			if(os.platform() !== "darwin") {return super._requestFullScreen();}
			const nw = require("nw.gui");
			const nw_window = nw.Window.get();
			return nw_window.enterFullscreen();			
		}

		static _cancelFullScreen() {
			const os = require("os");
			if(os.platform() !== "darwin") {return super._cancelFullScreen();}
			const nw = require("nw.gui");
			const nw_window = nw.Window.get();
			nw_window.leaveFullscreen();	
		}

		static _paintUpperCanvas() {
			if(!!this._loadingImage && this._loadingCount >= 20) {
				this._upperCanvas.style.mixBlendMode = "screen"
			}
			return super._paintUpperCanvas();
		}

		static _onKeyDown(event) {
			if (!event.ctrlKey && !event.altKey) {
				switch (event.keyCode) {
				case 113:   // F2
					event.preventDefault();
					this._switchFPSMeter();
					break;
				case 114:   // F3
				case 115:   // F4
					event.preventDefault();
					break;
				}
			}
		}

		static _playVideo(src) {
			this._video.volume = ConfigManager.bgmVolume / 100;
			return super._playVideo(src);
		}

		static _updateErrorPrinter() {
			this._errorPrinter.width = this._width * 0.9;
			this._errorPrinter.height = this._height * 0.5;
			this._errorPrinter.style.textAlign = 'left';
			//this._errorPrinter.style.textShadow = '1px 1px 3px #000';
			this._errorPrinter.style.fontFamily = "GameFont"
			this._errorPrinter.style.fontSize = '28px';
			this._errorPrinter.style.zIndex = 99;
			this._errorPrinter.style.padding = "4px"
			this._centerElement(this._errorPrinter);			
		}

		static _applyCanvasFilter() {
			Graphics._renderer.clear();
		}

		static _makeErrorHtml(name, message) {
			return ('<font color="red"><b>' + name + '</b></font><br>' +
			'<font color="white">' + message + '</font><br>');			
		}

		static _makeFullErrorHtml(name,message,stack) {
			var text = '';
			if(message === "Steam has not been detected." || message === "This game does not work in SDK mode.") {
				name = "";
				stack = [stack[1], ""];
			} 
			for (var i = 2; i < stack.length; ++i) {
			  text += '<font color=white>' + stack[i] + '</font><br>';
			}
			return ('<font color="white"><b>' + stack[0] + '</b></font><br>' +
			  '<font color="white"><b>' + stack[1] + '</b></font><br>' + text);			
		}

		static openSteamBugPage() {
			window.nw.Shell.openExternal("https://steamcommunity.com/app/1150690/discussions/0/2995422276377408303/")
		}

		static processErrorStackMessage(stack) {
			var data = stack.split(/(?:\r\n|\r|\n)/);
			data.unshift('OMORI has encountered a bug. Please report it on <a href="#" onclick="Graphics.openSteamBugPage()" style="color:green;">Steam</a><br>');
			for (var i = 1; i < data.length; ++i) {
			  data[i] = data[i].replace(/[\(](.*[\/])/, '(');
			}
			return data;
		}
	}

	//###############################################################################
	//
	// YAMI VIDEO PLAYER
	//
	//###############################################################################

	ysp.VideoPlayer.pauseVideos = function() {
		let videoMap = this.getVideoMap();
		if(Object.keys(videoMap).length <= 0) {return;}
		for(let videoId in videoMap) {
			let video = videoMap[videoId];
			if(!video) {continue;}
			if(!video.texture) {continue;}
			if(video.texture.baseTexture.source.paused) {continue;}
			video.texture.baseTexture.source.pause();
		}
	}

	ysp.VideoPlayer.playVideos = function() {
		let videoMap = this.getVideoMap();
		if(Object.keys(videoMap).length <= 0) {return;}
		for(let videoId in videoMap) {
			let video = videoMap[videoId];
			if(!video) {continue;}
			if(!video.texture) {continue;}
			if(!video.texture.baseTexture.source.paused) {continue;}
			if(!!this.hasVideoFinished(parseInt(videoId))) {continue;}
			video.texture.baseTexture.source.play();
		}
	}

	const _old_ysp_VideoPlayer_newVideo = ysp.VideoPlayer.newVideo;
	ysp.VideoPlayer.newVideo = function(videoName, id = "video") {
		let video = _old_ysp_VideoPlayer_newVideo.call(this, videoName, id);
		video.update = function() {
			video.texture.update();
			if(video.width !== video.texture.baseTexture.width || video.height !== video.texture.baseTexture.height) {
				video.width = video.texture.baseTexture.width;
				video.height = video.texture.baseTexture.height;
			}
		}
		// Making video responsive to BGM audio;
		video.texture.baseTexture.source.volume = video.texture.baseTexture.source.volume * (ConfigManager.bgmVolume / 100);
		video.texture.baseTexture.loop = false;
		video.texture.baseTexture.source.loop = false; // Being sure that the video does not loop;
		return video;
	}

	ysp.VideoPlayer.hasVideoFinished = function(id) {
		let video = this.getVideoById(id);
		if(!video) {
			console.warning("It seems that video of ID \"" + String(id) + "\" was not playing. The method will return TRUE");
			return true;
		}
		let source = video.texture.baseTexture.source;
		return source.currentTime >= source.duration;
	}

	//###############################################################################
	//
	// PIXI CONTAINER
	//
	//###############################################################################

	PIXI.Container.prototype.forceFlush = function() {
		for(let i = this.children.length; i >= 0; i--) {
			let child = this.children[i];
			if(!!child) {child.destroy({children:true, texture:true})}
		}
		this.removeChildren();
	}

	//###############################################################################
	//
	// SPRITE
	//
	//###############################################################################


	Olivia.HorrorEffects.___Sprite_update___ = function() {
		for(let child of this.children) {
			if(!!child.update) {child.update();}
		}
	}

	//###############################################################################
	//
	// SPRITE CHARACTER
	//
	//###############################################################################

	const _old_sprite_character_setupMiniLabel = Sprite_Character.prototype.setupMiniLabel;
	Sprite_Character.prototype.setupMiniLabel = function() {
		if(!!this.parent && typeof this._labelDelay === "undefined") {
			let wait = this.parent.getChildIndex(this);
			this._labelDelay = wait;
		}
		if(this._labelDelay > 0) {return this._labelDelay--;}
		return _old_sprite_character_setupMiniLabel.call(this);
	}

	//###############################################################################
	//
	// SPRITE ENEMY
	//
	//###############################################################################

	const _old_sprite_enemy_updateSelectionEffect = Sprite_Enemy.prototype.updateSelectionEffect;
	Sprite_Enemy.prototype.updateSelectionEffect = function() {
		if(!$gameParty.inBattle()) {return _old_sprite_enemy_updateSelectionEffect.call(this);}
		const unblinkingTroops = [336,344,351,353,358,365,367,368,372,373,377,437,441,442,443,444,445,451,564,565,566,570,571,575,576,592,891];
		if(unblinkingTroops.contains($gameTroop._troopId)) {return;}
		return _old_sprite_enemy_updateSelectionEffect.call(this);
	};

	//###############################################################################
	//
	// SCENE MANAGER
	//
	//###############################################################################

	SceneManager._smoothDeltaTime = 1;
	SceneManager._elapsedTime = 0;

	SceneManager = class extends SceneManager {

		static update(deltaTime) {
			Graphics.tickStart();
			try {
				const n = this.determineRepeatNumber(deltaTime);
				for (let i = 0; i < n; i++) {
					this.updateManagers();
					this.updateMain();
				}
			} catch (e) {
				this.catchException(e);
			}
			this.renderScene();
			Graphics.tickEnd();
		}

		static determineRepeatNumber(deltaTime) {
			this._smoothDeltaTime *= 0.8;
			this._smoothDeltaTime += Math.min(deltaTime, 2) * 0.2;
			if (this._smoothDeltaTime >= 0.9) {
				this._elapsedTime = 0;
				return Math.round(this._smoothDeltaTime);
			} else {
				this._elapsedTime += deltaTime;
				if (this._elapsedTime >= 1) {
					this._elapsedTime -= 1;
					return 1;
				}
				return 0;
			}			
		}


		static requestUpdate() {
			if (!this.ticker) {
				this.ticker = new PIXI.ticker.Ticker();
				this.ticker.maxFPS = 60;
				this.ticker.add(this.update, this); 
				this.ticker.start();
				// Make On Minimize Event
				const nw = require("nw.gui");
				const win = nw.Window.get();
				const os = require("os");
				win.on("minimize", () => {
					this._minimizeHandler = setInterval(() => {
						if(WebAudio._masterVolume <= 0) {clearInterval(this._minimizeHandler)}
						this.updateWebAudio();
						this.updateVideos();
					}, 25)
				})
				if(os.platform() === "darwin") {
					win.on("blur", () => {
						this._minimizeHandler = setInterval(() => {
							if(WebAudio._masterVolume <= 0) {clearInterval(this._minimizeHandler)}
							this.updateWebAudio();
							this.updateVideos();
						}, 25)
					})					
				}
				win.on("restore", () => {this._clearMinimizeHandler()})
				return;
			}
			else {
				if(this._stopped && this.ticker.started) {this.ticker.stop();}
				else if(!this.ticker.started) {this.ticker.start();}
				return;
			}
		}

		static _clearMinimizeHandler() {
			if(!!this._minimizeHandler) {
				clearInterval(this._minimizeHandler);
				this._minimizeHandler = undefined;
			}
		}

		static tickStart() {}
		static tickEnd() {}

		static stop() {
			this.ticker.stop();
			this._stopped = true;
		}

		static updateMain() {
			this.updateOverlayFix();
			this.updateInputData();
			this.changeScene();
			this.updateScene();
			this.updateWebAudio();
			this.updateVideos();
		}

		static updateOverlayFix() {
			if(!!Graphics._overlayFix) {
				if(Graphics.frameCount % 2 === 0) {
					let ctx = Graphics._overlayFix.getContext("2d");
					ctx.clearRect(0,0,window.screen.width, window.screen.height);
				}
			}
		}

		static updateInputData() {
			if(!this.isFocus()) {return;}
			return super.updateInputData();
		}

		static updateWebAudio() {
			if(!!this.isFocus()) {
				if(WebAudio._context.state === "suspended") {
					this._clearMinimizeHandler();
					WebAudio._context.resume();
				}
				WebAudio.setMasterVolume(Math.min(WebAudio._masterVolume + 0.05, 1));
			}
			else if(!this.isFocus()) {
				WebAudio.setMasterVolume(Math.max(WebAudio._masterVolume - 0.05, 0));
				if(WebAudio._masterVolume <= 0 && WebAudio._context.state !== "suspended") {WebAudio._context.suspend();}
			}
		}

		static updateVideos() {
			if(!this.isFocus()) {
				if(!!Graphics.isVideoPlaying()) {Graphics._video.pause();}
				return ysp.VideoPlayer.pauseVideos();
			}
			else if(!!this.isFocus()) {
				if(Graphics.isVideoPlaying() && Graphics._video.currentTime < Graphics._video.duration) {
					//Graphics._video.volume = !!Graphics._video.volume ? Graphics._video.volume * (ConfigManager.bgmVolume / 100) : 1;
					Graphics._video.play()
				}
				return ysp.VideoPlayer.playVideos();
			}
		}

		static isFocus() {
			// Check if there is game focus
			try {
				let neededVisibilityCheck = Utils.isMac() ? true : (document.visibilityState !== "hidden")
				return window.top.document.hasFocus() && neededVisibilityCheck;
			} catch(e) {
				return true; // Safe measure;
			}
		}

		static updateScene() {
			if (this._scene) {
				if (!this._sceneStarted && this._scene.isReady()) {
					this._scene.start();
					this._sceneStarted = true;
					this.onSceneStart();
				}
				if (this.isCurrentSceneStarted() && !!this.isFocus()) {
					this._scene.update();
				}
			}
		}

		static renderScene() {
			if(!this.isFocus()) {return;}
			return super.renderScene();
		}

		static onKeyDown(event) {
			if(Utils.isOptionValid("test")) {return super.onKeyDown(event);}
			if(event.keyCode !== 116) {return super.onKeyDown(event)}
		}

		static snapForBackground(forceAppear = true) {
			if(!!SceneManager.isNextScene(Scene_Battle)) {return;}
			if(!!$gameParty.inBattle()) {
				let spriteset = this._scene._spriteset;
				if(spriteset.battleback1Name() === '' && spriteset.battleback2Name() === '') {return}
			}
			this._backgroundBitmap = this.snap();
			if(!SceneManager.isNextScene(Scene_Menu) && forceAppear) {
				this._backgroundBitmap.blur();	
			}	
		}
	}

	//###############################################################################
	//
	// WINDOW BATTLE ACTOR
	//
	//###############################################################################

	Window_BattleActor.prototype.cursorPageup = function() {}
	Window_BattleActor.prototype.cursorPagedown = function() {}

	//###############################################################################
	//
	// DATA MANAGER
	//
	//###############################################################################

	DataManager = class extends DataManager {

		static addActionEffects(obj, array) {
			if(obj.repeats > 1) {
				obj.isRepeatingSkill = true;
				array[array.length] = ["EVAL", ["BattleManager._suspendEvents = true"]]
			}
			super.addActionEffects(obj, array);
			if(obj.isRepeatingSkill) {
				array[array.length] = ["EVAL", ["BattleManager._suspendEvents = undefined"]]
			}
		}

		static convertSequenceLine(obj, line, actionType) {
			if(actionType <= 0 || actionType > 5) {return;}
			super.convertSequenceLine(obj, line, actionType);
			if(actionType === 1) {
				obj.setupActions = [...obj.setupActions, ['IMMORTAL', ['TARGETS', 'TRUE']]]
			}
			if(actionType === 5) {
				obj.finishActions = [['IMMORTAL', ['TARGETS', 'FALSE']], ['WAIT FOR EFFECT'], ...obj.finishActions];
			}
		}

		static forceWriteToFile(world = 0) {
			DataManager.writeToFile(world, "TITLEDATA");
		}

		static loadGameWithoutRescue(savefileId) {
			var globalInfo = this.loadGlobalInfo();
			if (this.isThisGameFile(savefileId)) {
				var json = StorageManager.load(savefileId);
				if(!json) {throw new Error("The content of your savefile has been altered or it has been corrupted.");}
				this.createGameObjects();
				this.extractSaveContents(JsonEx.parse(json));
				this._lastAccessedId = savefileId;
				return true;
			} else {
				return false;
			}
		}

		static setupNewGame() {
			super.setupNewGame();
			$gameTemp._toneBelowUI = undefined; // Added 01/04 -> Failsafe needed?
			Playtime_Manager.clear();
		}

		static _rescueLoadGame(savefileId) {
			try {
				var json = StorageManager.load(savefileId);
				this.createGameObjects();
				this.extractSaveContents(JsonEx.parse(json));
				return true;
			} catch(e) {
				return false;
			}			
		}

		static _restoreGlobalInfo() {
			let globalInfo = [];
			let maxSaveFiles = 6;
			let recoverIndex = 0;
			let loadMap = false;

			function recovery() {
				if(recoverIndex >= maxSaveFiles) {
					SceneManager.ticker.remove(recovery);
					DataManager.saveGlobalInfo(globalInfo);
					DataManager.setupNewGame();
					return;
				}
				let savefileId = recoverIndex + 1;
				if(!!loadMap) {
					if(!$dataMap) {return;}
					globalInfo[savefileId] = DataManager.makeSavefileInfo();
					loadMap = false;
					recoverIndex++;
					return;
				}
				if(!DataManager._rescueLoadGame(savefileId)) {
					recoverIndex++;
					return;
				}
				else {
					DataManager.loadMapData($gameMap.mapId());
					loadMap = true;
				}
			}
			SceneManager.ticker.add(recovery);
		}
	}

	Yanfly.UCE.DataManager_loadGame = function(savefileId) {
		try {
			return this.loadGameWithoutRescue(savefileId);
		} catch (e) {
			if(Utils.isOptionValid("test")) {console.error(e)}
			else {alert("Loading Issue - " + e)};
			return false;
		}		
	}

	//###############################################################################
	//
	// GAME SCREEN
	//
	//###############################################################################

	Game_Screen = class extends Game_Screen {

		setFlashWait(value) {
			return this._flashWait = value;
		}

		updateFlash() {
			if(this._flashWait > 0) {return this._flashWait--;}
			return super.updateFlash();
		}
	}

	//###############################################################################
	//
	// PLAYTIME MANAGER
	//
	//###############################################################################

	Playtime_Manager = class {

		static snap() {
			return Date.now();
		}

		static clear() {
			this.accumulator = this.snap();
		}

		static saveTime() {
			let timeAtSave = this.snap() - this.accumulator;
			return timeAtSave;
		}
	}

	//###############################################################################
	//
	// GAME SYSTEM
	//
	//###############################################################################

	Game_System = class extends Game_System {

		initialize() {
			super.initialize();
			this._playtime = 0;
		}

		clearAchievement(code, callback, err) {
			if(!Imported.Archeia_Steamworks) {return console.warn("Archeia Achivement is disabled. If you're on MAC, the problem is related to a problem with the library that is going to be fixed. - LUCA")}
			if(!callback) {
				callback = () => {
					if(!!$._achievementsUnlocked.contains(code)) {$._achievementsUnlocked.splice($._achievementsUnlocked.indexOf(code), 1)}
				}
			}
			return super.clearAchievement(code, callback, err);			
		}

		unlockAchievement(code, callback, err) {
			if(!Imported.Archeia_Steamworks) {return console.warn("Archeia Achivement is disabled. If you're on MAC, the problem is related to a problem with the library that is going to be fixed. - LUCA")}
			if(!callback) {
				callback = () => {
					if(!err) {
						if(!$._achievementsUnlocked.contains(code)) {$._achievementsUnlocked.push(code)}
						if($._achievementsUnlocked.length === $._achievementsCount - 1) {
							$gameSystem.unlockAchievement("IT_IS_ALL_A_DREAM");
						}
					}
					
				}
			}
			return super.unlockAchievement(code, callback, err);
		}

		clearAllAchievements() {
			if(!Imported.Archeia_Steamworks) {return console.warn("Archeia Achivement is disabled. If you're on MAC, the problem is related to a problem with the library that is going to be fixed. - LUCA")}
			const achievements = this.getAchievements();
			if(!!achievements) {
				for(let achievement of achievements) {
					this.clearAchievement(achievement);
				}
			}
		}

		onBeforeSave() {
			super.onBeforeSave();
			let saveTime = Playtime_Manager.saveTime();
			this._playtime = this._playtime + saveTime;
			Playtime_Manager.clear();
		}

		onAfterLoad() { // Just for preventing last battle skill and commands;
			super.onAfterLoad();
			if(!this._playtime) {
				this._playtime = Math.floor((this._framesOnSave*1000)/60);
			}
			Playtime_Manager.clear();
			//=============================================	
			// Clearing EXA Followers global variables on
			// load.
			EXA.FC.followerControl          = false;
			EXA.FC.followerControlId        = -1;
			EXA.FC.followerStop             = false;
			EXA.FC.followerCollision        = false;
			//=============================================	
			$gameParty.members().forEach(member => {
				member.setLastBattleSkill(null);
				member.setLastCommandSymbol('');
			})
			if(!!$gamePlayer._followers) {
				// 01/20 FIX FOR BLACKSPACE SPRITE SHIFT
				let follower = $gamePlayer._followers.follower(0);
				if(follower._spriteOffsetX === 32 && follower._spriteOffsetY === -18) {
					follower._spriteOffsetX = 0
					follower._spriteOffsetY = 0
				}
			}
		}

		playtime() {
			if(!this._playtime) {
				return super.playtime();
			}
			let snap = Playtime_Manager.snap();
			let acc = Playtime_Manager.accumulator;
			return Math.floor((snap - acc + this._playtime) / 1000)
		}
	}

	//###############################################################################
	//
	// SPRITESET BASE
	//
	//###############################################################################

	const _old_spritesetbase_createScreenEffectFilters = Spriteset_Base.prototype.createScreenEffectFilters;
	Spriteset_Base.prototype.createScreenEffectFilters = function() {
		_old_spritesetbase_createScreenEffectFilters.call(this);
		this._ase_wave_filter.enabled = false;
	}

	//###############################################################################
	//
	// SPRITESET BASE
	//
	//###############################################################################

	Spriteset_Battle = class extends Spriteset_Battle {

		getToneFilter() {return this._toneFilter;}

	}

	//###############################################################################
	//
	// GAME UNIT
	//
	//###############################################################################

	Game_Unit.prototype.getLowestIndexMember = function() {
		let members = this.aliveMembers();
		let indexes = members.map(e => e.index());
		indexes.sort();
		return indexes[0]; // Get lowest index;
	}

	//###############################################################################
	//
	// GAME TROOP
	//
	//###############################################################################

	Game_Troop = class extends Game_Troop {

		isWhiteTransitionTroop() {
			return [426].contains(this._troopId); // Space Ex Husband
		}

		isHumphreyBattle() {
			return [436,437,438,439,440,606].contains(this._troopId);
		}

		waitForEmotion() {
			let data = this.troop();
			let turnZero = data.pages.filter(page => page.conditions.turnA === 0 && page.conditions.turnB === 0 && page.conditions.turnValid);
			if(turnZero.length <= 0) {return false;}
			let wait = false;
			const RANDOM_EMOTION_CE = 985;
			for(let event of turnZero) {
				if(event.list.some(command => command.code === 117 && command.parameters[0] === RANDOM_EMOTION_CE)) { // Random Emotion Common Event
					wait = true;
					break;
				}
			}
			let tutorialTroops = [541,542,543];
			let rareBear = [167,168,189];
			let pluto_and_earth = [616];
			let FEARS = [336,344,351,353,358,365,367,368,372,373,375,377,441,442,564,565,566]
			return wait || tutorialTroops.contains(this._troopId) || rareBear.contains(this._troopId) || pluto_and_earth.contains(this._troopId) || FEARS.contains(this._troopId);
		}

		areSummonTroops() {
			return [410,427,603].contains(this._troopId);
		}

	}

	//###############################################################################
	//
	// SCENE MAP
	//
	//###############################################################################

	Scene_Map = class extends Scene_Map {

		start() {
			super.start();
			$gameParty.refreshMembers();
		}

		needsFadeIn() {
			const troops = [445];
			if(SceneManager.isPreviousScene(Scene_Battle) && !!troops.contains($gameTroop._troopId)) {return false;}
			return super.needsFadeIn();
		}	
		
		updateEncounterEffect() {
			if (this._encounterEffectDuration > 0) {
				this._encounterEffectDuration--;
				let speed = this.encounterEffectSpeed();
				var n = speed - this._encounterEffectDuration;
				if(n === Math.floor(speed / 2)) {
					BattleManager.playBattleBgm();
					if(!$gameTroop.isWhiteTransitionTroop()) {this.startFadeOut(this.fadeSpeed(), false);}
				}
			}
		}
		
		terminate() {
			super.terminate();
			// 12/16 Clearing Run Away Switch
			if(!!SceneManager.isNextScene(Scene_Map)) {
				$gameSwitches.setValue(950,false);
			}
			// Clear all footprints;
			if(!!Imported.TDS_Footprints) {
				$gameMap.initFootprints();
				SceneManager._scene._spriteset._footprintsContainer.removeAll();
			}
		}
	}

	Yanfly.BEC.BattleManager_initMembers = function() {
		this._phase = 'init';
		this._canEscape = false;
		this._canLose = false;
		this._battleTest = false;
		this._preemptive = false;
		this._surprise = false;
		this._actorIndex = -1;
		this._actionForcedBattler = null;
		if(!this._battleRetried) {
			this._mapBgm = null;
			this._mapBgs = null;
			this._eventCallback = null;
		}
		this._actionBattlers = [];
		this._subject = null;
		this._action = null;
		this._targets = [];
		this._logWindow = null;
		this._statusWindow = null;
		this._spriteset = null;
		this._escapeRatio = 0;
		this._escaped = false;
		this._rewards = {};
		this._turnForced = false;
	}

	//###############################################################################
	//
	// SCENE BATTLE
	//
	//###############################################################################

	Scene_Battle = class extends Scene_Battle {
		
		createDisplayObjects() {
			super.createDisplayObjects();
			this.addToneFilterCompatibility();
		}

		addToneFilterCompatibility() {
			for(let window of this._windowLayer.children) {
				if(window instanceof Window_Message ||
					window instanceof Window_Gold ||
					window instanceof Window_ChoiceList ||
					window instanceof Window_NumberInput ||
					window instanceof Window_EventItem ||
					window instanceof Window_ScrollText ||
					window instanceof Window_SnatchItem) {continue;}
				if(!window._filters) {window._filters = [this._spriteset.getToneFilter()]}
				else {window._filters.push(this._spriteset.getToneFilter());}
			}
			if(!this._faceWindowsContainer._filters) {this._faceWindowsContainer._filters = [this._spriteset.getToneFilter()]}
			else {this._faceWindowsContainer._filters.push(this._spriteset.getToneFilter());}

			this._stressBar._filters = [this._spriteset.getToneFilter()];
			this._helpWindow._filters = [this._spriteset.getToneFilter()];
			this._logWindow._scrollTextSprite._filters = [this._spriteset.getToneFilter()];
		}

		commandEscape() {
			BattleManager.setEscapeMode(true);
			super.commandEscape();	
		}

		_defaultStart() {
			Scene_Base.prototype.start.call(this);
			BattleManager.playBattleBgm();
			BattleManager.startBattle();
		}

		_createGpWhite() {
			this._gpWhite = new Sprite();
			this._gpWhite.bitmap = new Bitmap(Graphics.boxWidth, Graphics.boxHeight);
			this._gpWhite.bitmap.fillAll("white");
			this.addChild(this._gpWhite);
		}

		needsGpWhite() {
			if(!!BattleManager._battleIntro && BattleManager._battleIntro === "finalbattle") {return true;}
			if($gameTroop.isWhiteTransitionTroop()) {return true;}
			return false;
		}

		setStartTint() {
			if(!!$gameSwitches.value(1615)) {$gameScreen.startTint([-187,-204,-102,170], 8)} // Hush Puppy Fight
			else {
				let troopId = $gameTroop._troopId;
				if(troopId === 444) {$gameScreen.startTint(BLACK_TINT, 0)} // Fear of Drowning;
				else if(!$gameSwitches.value(466)) {$gameScreen.startTint(DEFAULT_COLOR, 8)} // [BS Fight]
			}
		}

		start() {
			if(this.needsGpWhite()) {
				this._createGpWhite();
				this._defaultStart();
			}
			else {
				if(!$gameTroop.isWhiteTransitionTroop()) {this.startFadeIn(this.fadeSpeed(), $gameSwitches.value(369));}
				this._defaultStart();
			}
			// Tint Manager;
			if(!$gameTroop.waitForEmotion() && !$gameTroop.areSummonTroops()) {this.setStartTint();}
			this._helpWindow.hide();
		}

		updateGpWhite() {
			if(!!BattleManager.isBattleIntroActive() || $gameTroop._troopId === 891) {return;} // Avoid Overwrite on Omori Final Battle
			if(!this._gpWhite) {return;}
			if(this._gpWhite.alpha > 0) {this._gpWhite.alpha -= 0.05}
			if(this._gpWhite.alpha <= 0) {
				this.removeChild(this._gpWhite);
				this._gpWhite = undefined;
			}
		}

		update() {
			this.updateGpWhite();
			return super.update();
		}

		stop() {
			Scene_Base.prototype.stop.call(this);
			let troops = [445] // Troops that does not need fade: SOMETHING
			if(!troops.contains($gameTroop._troopId)) {
				if (this.needsSlowFadeOut()) {
					this.startFadeOut(this.slowFadeSpeed(), false);
				} else {
					this.startFadeOut(this.fadeSpeed(), false);
				}  				
			}
			this._statusWindow.close();
			this._partyCommandWindow.close();
			this._actorCommandWindow.close();
		}

		terminate() {
			super.terminate();
			BattleManager.replayBgmAndBgs();
			// 11/29 Be sure to clear neutral face;
			$gameSwitches.setValue(92, false);
			// 11/29 Be sure to clear BS Fight;
			$gameSwitches.setValue(466, false);
			// 12/03 Be sure to clear Force Plot Armor
			$gameSwitches.setValue(1600, false);
			// 12/04 Be sure to remove unconsciuos and to restor 1HP;
			for(let actor of $gameParty.members()) {
				//if(!actor.isDead()) {continue;}
				actor.removeState(1); // Death State ID
				actor.revive();
				actor._playedCollapseSound = false;
			}
			// 02/04 FAILSAFE FOR BLACK SCREEN GLITCH
			BattleManager._battleRetried = false;
		}

		_needsMainToneUpdate() {
			return (!!$gameSwitches.value(1615) || 
					$gameTroop.isHumphreyBattle() || 
					!!$gameTemp._toneBelowUI)
		}

		updateMainToneFilter() {
			let objects = [this._stressBar, this._faceWindowsContainer, this._logWindow._scrollTextSprite, this._helpWindow]
			let mainWindows = [this._actorCommandWindow, this._logWindow, this._partyCommandWindow, this._skillWindow, this._itemWindow];
			if(!!this._needsMainToneUpdate()) { // Needs checker on battle end?
				for(let obj of objects) {obj.filters = [];}
				for(let obj of mainWindows) {obj.filters = [];}
			}
			else {
				let hasToneFilter = objects[0].filters.length > 0;
				if(!hasToneFilter) {
					for(let obj of mainWindows) {obj.filters = [this._spriteset.getToneFilter()];}
					this._usingToneFilter = true;
				}
			}
			return super.updateMainToneFilter();
		}
	}

	//###############################################################################
	//
	// BATTLE MANAGER
	//
	//###############################################################################

	BattleManager = class extends BattleManager {

		static setup(troopId, canEscape, canLose) {
			super.setup(troopId, canEscape, canLose);
			this._escapeAnimationPlayed = false; // Reset escape animation;
			this._escapeByCommand = false;
			if(!!$gameTroop.isHumphreyBattle()) {
				$gameTemp._bb1Name = $gameMap.battleback1Name();
			}
			else {$gameTemp._bb1Name = undefined;}
		}

		static update() {
			switch(this._phase) {

				case "escape_animation":
					if(!$gameSwitches.value(1601)) {
						this._escapeAnimationPlayed = true;
						return this.processAbort()
					}
					return $gameTroop._interpreter.update();
				default:
					return super.update();
			}
		}

		static processAbort() {
			if(!this._escaped) {return super.processAbort()}
			if(!this._escapeAnimationPlayed && !!this._escaped && !!this._escapeByCommand) {
				this._phase = "escape_animation";
				$gameTemp.reserveCommonEvent(997); // Escape Common Event;
				$gameSwitches.setValue(1601, true); // Party Immunity Switch
				$gameTroop._interpreter.setupReservedCommonEvent();
				AudioManager.fadeOutBgm(2);
				return;
			}
			return super.processAbort();
		}

		static setEscapeMode(value) {
			return this._escapeByCommand = value;
		}

		static displayEscapeFailureMessage() {
			super.displayEscapeFailureMessage();
			this.setEscapeMode(false);
		}

		static updateEvent() {
			if(!!this._suspendEvents) {return false;}
			return super.updateEvent();
		}

		static queueForceScriptCall(ev) {
			let command = {
				code:355,
				indent:0,
				parameters:[ev]
			}
			$gameTemp.forceActionQueue(command);
			this.clearResults();
			if (this.isTickBased()) this._phase = 'action';
		}

		static endAction() {
			super.endAction();
			[...$gameParty.members(), ...$gameTroop.members()].forEach(b => {
				b._noEffectMessage = undefined;
				b._noStateMessage = undefined;
			})
			SceneManager._scene._statusWindow.refresh();
		}

		static forceCustomBattleLog(tar = undefined) {
			if(!!tar) {return this._logWindow.displayActionResults(this._subject, tar);}
			for(let target of this._allTargets) {
				this._logWindow.displayActionResults(this._subject, target);
			}
			
		}

		static endBattle(result) { // Being sure that Plot Armor is cleared at the end of the battle;
			$.Force_Clear_Plot_Armor();
			super.endBattle(result);
		}

		static createFinishActions() {
			super.createFinishActions();
			let ACS_SKILLS = [
				47,48,50,51,53,54,55,56,57,59,60,61, // OMORI ACS, RELEASE ENERGY AND RELEASE STRESS
				87,88,90,91,93,94,97,98,99,100,101, // AUBREY ACS
				127,128,130,131,133,134,137,138,139, // KEL ACS
				167,170,172,173,175,176,178,179,180 // HERO ACS
			];
			let ACS_CHECK = [46,49,52,86,89,92,126,129,132,168,171,174]; // CHECKS
			let IMMORTAL_COMMAND = ["IMMORTAL", ["TARGETS", "FALSE"]];
			let item = this._action.item();
			let skillId = item.id;
			if(DataManager.isSkill(item)) {
				if(ACS_SKILLS.contains(skillId)) {
					let immortalIndex = this._actionList.findIndex(x => x[0].contains("IMMORTAL"));
					if(immortalIndex > -1) {
						this._actionList.splice(immortalIndex, 1);
					}
					
				}
				if(ACS_CHECK.contains(skillId)) {
					let immortalIndex = this._actionList.findIndex(x => x[0].contains("IMMORTAL"));
					if(immortalIndex > -1) {
						this._actionList.splice(immortalIndex, 1);
					}
					this._actionList.push(["EVAL", ["$gameTroop.members().forEach(m => m.removeImmortal())"]])	
					this._actionList.push(['WAIT FOR EFFECT'])				
				}
			}
			if(!!$gameTemp._addToFinishActions) {
				this._actionList = [...this._actionList, ...$gameTemp._addToFinishActions];
				$gameTemp._addToFinishActions = undefined;
			}
		}

		static queueForceAction(user, skillId, target, clearResult = true) {
			if (target === undefined) {
				var targetIndex = 0;
			  } else if (typeof target === 'number') {
				var targetIndex = target;
			  } else {
				var targetIndex = target.index();
			  }
			  var param = [
				user.isEnemy() ? 0 : 1,
				user.isActor() ? user.actorId() : user.index(),
				skillId,
				targetIndex
			  ];
			  var command = {
				code: 339,
				indent: 0,
				parameters: param
			  }
			  $gameTemp.forceActionQueue(command);
			  if(!!clearResult) {this.clearResults();}
			  if (this.isTickBased()) this._phase = 'action';
		}

		static isBattleSameOfMapBgm() {
			if(!this._mapBgm) {return false;}
			if(!AudioManager._currentBgm) {return false;}
			return AudioManager._currentBgm.name === this._mapBgm.name;
		}

		static processRetry() {
			if(!!$gameTroop.isHumphreyBattle() && !!$gameTemp._bb1Name) {
				$gameMap.changeBattleback($gameTemp._bb1Name, $gameMap.battleback2Name());
			}			
			return super.processRetry();
		}
	}

	Yanfly.BEC.BattleManager_processTurn = function() {
		var subject = this._subject;
		var action = subject.currentAction();
		if (action) {
			action.prepare();
			if (action.isValid()) {
				this.startAction();
			}
			else {
				//===================================
				// Addon for checking JUICE
				if(DataManager.isSkill(action.item())) {
					if(subject.mp < action.item().mpCost) {
						this._logWindow.push("addText", subject.name().toUpperCase() + " does not have enough JUICE!");
						this._logWindow.push("wait");
					}
				}		
				//===================================
			}
			subject.removeCurrentAction();
		} else {
			subject.onAllActionsEnd();
			this.refreshStatus();
			this._logWindow.displayAutoAffectedStatus(subject);
			this._logWindow.displayCurrentState(subject);
			this._logWindow.displayRegeneration(subject);
			this._subject = this.getNextSubject();
		}
	}
	

	Yanfly.BEC.BattleManager_processVictory = function() {
		$gameParty.removeBattleStates();
		$gameParty.performVictory();
		this.playVictoryMe();
		//this.replayBgmAndBgs();
		this.makeRewards();
		this.displayVictoryMessage();
		this.displayRewards();
		this.gainRewards();
		this.endBattle(0);
	}

	_TDS_.OmoriBattleSystem.BattleManager_processDefeat = function() {
		this.displayDefeatMessage();
		this.playDefeatMe();
		if (this._canLose) {
			//this.replayBgmAndBgs();
		} else {
			AudioManager.stopBgm();
		}
		this.endBattle(2);		
	}

	Yanfly.BEC.BattleManager_processAbort = function() {
		$gameParty.removeBattleStates();
		//this.replayBgmAndBgs();
		this.endBattle(1);		
	}
	
	//###############################################################################
	//
	// GAME INTERPRETER
	//
	//###############################################################################

	Game_Interpreter = class extends Game_Interpreter {

		clearSingingMiniGameTomatoes(callback) {
			var events = $gameTemp._singingMiniGame.events;
			for(let event of events) {
				let tomato = event._singing.tomato;
				if (!tomato._inThrowMotion && tomato._opacity > 0) {
					if (tomato._fadeOutDelay > 0) {
						tomato._fadeOutDelay--
					} else {
						tomato._opacity = Math.max(tomato._opacity - 25, 0);
					}
				}
			}
			if(!events.every(e => e._singing.tomato._opacity <= 0)) {return;}
			return callback();
		}

		spritesetLowerLayer() {
			return SceneManager._scene._spriteset._baseSprite;
		}
	}

	//###############################################################################
	//
	// WEB AUDIO
	//
	//###############################################################################

	WebAudio = class extends WebAudio {

		_createEndTimer() {
			if(!!this._sourceNode && !this._sourceNode.loop) {
				let endTime = this._startTime + this._totalTime / this._pitch;
				let ticker = SceneManager.ticker;
				this._endTimer = function() {
					if(WebAudio._context.currentTime >= endTime) {this.stop();}
				}
				ticker.add(this._endTimer, this);
			}
		}

		_removeEndTimer() {
			if(!!this._endTimer) {
				let ticker = SceneManager.ticker;
				ticker.remove(this._endTimer, this);
				this._endTimer = undefined;
			}
		}

		play(loop, offset) {
			if(offset < 0) {offset = 0;}
			return super.play(loop, offset);
		}

		_removeNodes() {
			try {
				super._removeNodes();
			} catch(e) {}
		}
	}


	//###############################################################################
	//
	// SPRITE BATTLER
	//
	//###############################################################################

	Sprite_Battler.prototype.setupDamagePopup = function() {
		if (this._battler.isDamagePopupRequested()) {
		  if (this._battler.isSpriteVisible()) {
			var sprite = new Sprite_Damage();
			sprite.x = this.x + this.damageOffsetX();
			sprite.y = this.y + this.damageOffsetY();
			sprite.setup(this._battler);
			this.pushDamageSprite(sprite);
			SceneManager._scene.addChild(sprite);
			//this._battler.clearResult();
		  }
		} else {
		  this._battler.clearDamagePopup();
		}
	};

	const _old_sprite_battler_setBattler = Sprite_Battler.prototype.setBattler; 
	Sprite_Battler.prototype.setBattler = function(battler) {
		_old_sprite_battler_setBattler.call(this, battler);
		if(!battler) {return;}
		let data = !!battler.isEnemy() ? battler.enemy() : battler.actor();
		if(!!data.meta["ZIndex"]) {
			this.z = parseInt(data.meta["ZIndex"].trim());
		}
	}

	Sprite_Battler.prototype.updateDamagePopup = function() {
		this.setupDamagePopup();
		if (this._damages.length > 0) {
			for (var i = 0; i < this._damages.length; i++) {
				this._damages[i].update();
			}
			if (!this._damages[0].isPlaying()) {
				this._damages[0].parent.removeChild(this._damages[0]);
				this._damages.shift();
			}
		}
	};	


	//###############################################################################
	//
	// AUDIO MANAGER
	//
	//###############################################################################

	AudioManager._bgmVolume      = 70;
	AudioManager._bgsVolume      = 90;
	AudioManager._meVolume       = 90;
	AudioManager._seVolume       = 90;

	AudioManager.areAllSECompleted = function() {
		if(this._seBuffers.length <= 0) {return true;}
		return this._seBuffers.every(buff => !buff.isPlaying())
	}

	//###############################################################################
	//
	// CONFIG MANAGER
	//
	//###############################################################################

	ConfigManager = class extends ConfigManager {

		static _determineDefaultValues(name) {
			switch(name) {
				case "bgmVolume": return 70;
				case "bgsVolume": return 90;
				case "seVolume": return 90;
				case "meVolume": return 90;					
			}
		}

		static readVolume(config, name) {
			let value = config[name];
			if(value === undefined) {return this._determineDefaultValues(name);}
			return super.readVolume(config, name);
		}
	}
	
	Object.defineProperty(ConfigManager, 'commandRemember', {
		get: function() {
			return true; // Force Command Remember to TRUE
		},
		configurable: true
	});

	//###############################################################################
	//
	// GAME ACTOR
	//
	//###############################################################################

	Game_Actor = class extends Game_Actor {

		onBattleEnd() {
			super.onBattleEnd();
			this.setLastCommandSymbol('');
			this.setLastBattleSkill(null);
			// 11/26 Be sure to clear the damaged face temp:
			$gameTemp._damagedPlayer = undefined;
		}

		learnSkill(skillId) {
			let isNewSkill = this._skills.indexOf(skillId) < 0;
			super.learnSkill(skillId);
			if(!isNewSkill) {return;}
			let index = this._equippedSkills.indexOf(0);
			if(index < 0) {return;}
			return this.equipSkill(index, skillId);
		}
	}

	Game_Actor.prototype.performCollapse = function() {
		Game_Battler.prototype.performCollapse.call(this);
		if ($gameParty.inBattle() && !this._playedCollapseSound) {
			if(![1,8].contains(this.actorId())) {SoundManager.playActorCollapse();}
			this._playedCollapseSound = true;
		}
	};
	
	//###############################################################################
	//
	// SCENE MENU
	//
	//###############################################################################

	const _old_scene_menu_createBackground = Scene_Menu.prototype.createBackground;
	Scene_Menu.prototype.createBackground = function() {
		_old_scene_menu_createBackground.call(this);
		this._backgroundSprite.blur = new PIXI.filters.BlurFilter();
		this._backgroundSprite.filters = [this._backgroundSprite.blur];
		this._backgroundSprite.blur.blur = 1;
		this._backgroundSprite.blur.padding = 0;
	}

	//###############################################################################
	//
	// VARIOUS TYPE OF FIXES
	//
	//###############################################################################

	// 0 - SAD; 1 - ANGRY; 2 - HAPPY;
	$.Random_Player_Emotion = function(target) {
		let rand = Math.randomInt(3);
		// Random Emotion for Omori;
		switch(rand) {
			case 0:
				if(target.isStateAffected(11)) {target.addState(12);}
				else if(target.isStateAffected(10)) {target.addState(11);}
				else {target.addState(10);}
				break;
			case 1:
				if(target.isStateAffected(15)) {target.addState(16);}
				else if(target.isStateAffected(14)) {target.addState(15);}
				else {target.addState(14);}
				break;
			case 2:
				if(target.isStateAffected(7)) {target.addState(8);}
				else if(target.isStateAffected(6)) {target.addState(7);}
				else {target.addState(6);}
				break;
		}
		SceneManager._scene._statusWindow.refresh();
	}

	$.Process_Second_Chance_Message = function(target) {
		if(target.actorId() !== 1) {return;} // If it's not OMORI do not process;
		if(!!$gameSwitches.value(1613)) { // PLOT ARMOR MESSAGE and FORCE PLOT ARMOR ?
			$gameSwitches.setValue(1613, false); // Plot Armor Message;
			$gameTemp._secondChance = true; // Activating second chance face;
			$gameSwitches.setValue(2000, true); // Preparing Plot Armor Battle Event Switch;
			SceneManager._scene._statusWindow.refresh();
			let Bubble_Toggle = $gameSwitches.value(6);
			if(!!Bubble_Toggle) {
				$gameTemp._addToFinishActions = [
					["EVAL", [`$gameSwitches.setValue(6, false)`]],
					["EVAL", [`$gameMessage.showLanguageMessage("xx_battle_text.message_1000")`]],
					["EVAL", [`$gameSwitches.setValue(6, true)`]]
				]
			}
			else {
				$gameTemp._addToFinishActions = [
					["EVAL", [`$gameMessage.showLanguageMessage("xx_battle_text.message_1000")`]]
				]
			}
		}

	}

	$.Force_Clear_Plot_Armor = function() {
		$gameActors.actor(1).removeState(299); // First Hit;
		$gameActors.actor(1).removeState(300); // Plot Armor;
		$gameTemp._secondChance = false;
	}

	$.Print_Something_Txt = function() {
		const path = require("path");
		const fs = require("fs")
		const os = require("os");
		var base = path.dirname(process.mainModule.filename);
		var deskDir = `${base}`;
		fs.writeFileSync(deskDir + `___for_${$gameActors.actor(8).name()}___.txt`, `............. ...   ............................... ..... ............. ..... ..
		...........           .    ..       .   . .. ...    .  ..     .. ...    .  ..   
		...........   ..     .     .  .    OOZZZZZO    .    ..  ...  ...   .    ..  ... 
		...........                .. .OZZZZZZZZZZZZZO,     .   .     ..  ..    .   .   
		............. ..  . .  .    ZZZZZZZZZZZZZZZZZZZZO.... ... ... ... ... ... ... ..
		............. ...   ... ?ZZZZZZZZZZZZZZZZZZZZZZZMMZO......  ........ .........  
		....................  MZZZZZZZZZZZZZZZZZZZZZZZZZZZMZZZ .........................
		.....  .  .........MMMZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ........................
		   . .    ....... OZZMMZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ$......................
		   . .    .......ZZZOMMMMMMMMMZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ ....................
		 . . .    ......NZZMNMMMMMMMMMMNNZZMMMNMOMMOM8ZZZZZZZZZZZZZZI...................
		 .   . . ......OMZZZMMMMMMMMMMMMMZZZMMMMMMZZMZZZZZZZZZZZZZZZZ...................
		.. ... .. ....MZZZOMMMMMMMMMMMMMMZNMMMMMMMZMMZZZZZZZZZZZZZZZZZ, ................
		.............MMZMZZZZMMMMZMMMMMMMMMMZZMMMMMZZZZZZZZMZZMOZZZMMZZ~................
		   ..   . ..=MMZMMMZMZZMZOMMMMMMMMMMMMMMMMZZZZZZZZZZZZMOZMMMMZZZ................
		............MOMZNOOOMMMMZZDONMMMMMMMMMMMOOZZMDZOZOMOZZNNNMMMMMMOZ~..............
			. . . .ZMMMZZZZMZZZMMMDMMMMMMMMMMMMMMZZZZZMDOZMZOMMMZMOMZMZZZZ .............
		 .  ..  . MZMMZZZMZZZOZOZZZMOMMMMMMMMMZZZMMMMZZ8MMMMMMZZMZZMZMMZZZZ.............
		..........ZMZZOZOZZZMZZMZZDONMMMMMMMMM.,OMMMZZMMMMMMMMMMMMMMMMMMMZZ ............
		 .  .    ZMOMZOMOMMMMZZMMZDOMOOMMMOMM=.. ,MMMMMMMMMMMZMMMZMMMMMMMMZI............
		.. ...  ZOMMMMMMMMMMMMZOZMDO8ZMMOMMMZ.....MMMMMMMMMMMMMMMMMMMMMMMMOZ............
		........ZZMMZMMMMMMZZMMZZMMMMZMMMMMM,. ...IMMMMMMMMMMMMMMMMMMMMMMMMZ$...........
		.......8ZZMMMMMMMOMMZZMMZZZZZMMMMMM7.......IMMMMMMMMMMMMMMMMMMMMMMMOZ...........
		. .... O8DMMDDDZZMMOODOZZZDZDDDZMD~.........MMMMMMMMMMMMMMMMMMMMMMMMD...........
		 .  ..MMZOMMMOMZZMMZZMMZZOZZMMMZMZ:.........,MMMMMMMMMMMMMMMMMMMMMMMMO .........
		..... MNZZZZZMMZZMOZZZZZZZDZZZZMZM. .........OMMMMMMMMMMMMMMMMMMMMMMOM .........
		......MNZZZZZZZZZ8NZZZZNZZ8ZZZNM8~. .........~MMMMMMMM8M8ZMMMMMMMMMMM8 .........
		.....MMNZZZZZZZZMZMOMMONOMMZOMZZ..............~MMMMMMZMOMMZMMZMZOMMMMMZ.........
		....IMMMDDZZZZDZDDMZDMMMMMNDDMOZ...............=MMDDZMDZ8DOZZZZZZZDMDMM ........
		....MMMZZMZZZZMMMMMMMMMOMZMMMZM:.............. =ZMMMZMZZZZZZZZZZZZZMZZM:........
		....MMMMOZMMZMMZZMMMMMMMMMMMMOZ.................IMMMMMOZZZZZZZZZZZZZZZZM........
		...MMMNOON8MMNMMMMMMMMMMMMMMMM...................ZMZO88ZNZZZZZZZZZZZZNMN8.......
		...MMZMNZZMMMMMMMMMMMMMMMMMMMM. ................,+MZZMMMZMOZZMOZZZZOZZZZO.......
		...MMZMNOMMMMMMMMMMMMMMMMMMMMZ. ..................MMZMZMZZMMMZMOZZDZZZZZM.......
		.. MMMMMMMMMMMMMMMMMMMMMMMMMM. ...................MMMMMMMMMMMMMMMZDZZZZZZ+......
		..MMMMMMMMMMMMMMMMMMMMMMMMMMM................... .=MMMMMMMMMMMMMMODMMMZZZO .....
		..MMMMMMMMMMMMMMMMMMMMMMMMMMN. ...... ~+..........,MMOZMMZMMMMMMMMMMNMOZZZ,.....
		. MMMMMMMMMMMMMMMMMMMMMMMMMMN. ...,ZTHERE'SM,...... MMMMMMOZMMMMMMMMMMMMZMO.....
		. MMMMMMMMMMMMMMMMMMMMMMMMMMD, ...NSOMETHINGM.......MZMMMMZMMMMMMMMMMMMMMMM.....
		.MMMMMMMMMMMMMMMMMMMMMMMMMMMD ....MMBEHINDMMM,......M8MDMMNMMMMMMMMMMMMMMMM.....
		. MMMMMMMMMMMMMMMMMMMMMMMMMMD.....MMMMYOUMMMM .... .ZZMZOMMMMMMMMMMMMMMMMMM.....
		. MMMMMMMMMMMMMMMMMMMMMMMMMMM.....:MMMMMMMMM.......MZOMOMZMOMMMMMMMMMMMMMMM.....
		. MMMMMMMMMMMMMMMMMMMMMMMMMMMI......=?MMMM.........MMMZMMMOZMZMMMMMMMMMMZZZ.....
		.,MMMMMMMMMMMMMMMMMMMMMMMMMMMM.....................MMMMMMMMMZZMOMMMMMMMMMMO.....
		.MMMMMMMMMMMMMMMMMMMMMMMMMMMMM....................+MMMMMMMMMDZMD8MDDMMMMMMD.....
		.MMMMMMMMMMMMMMMMMMMMMMMMMMMMM.................. .MMMMMMMMMMZMMMMMDMNMMMMZZ.....
		.MMMMMMMMMMMMMMMMMMMMMMMMMMMMM.................. .MMMMMMMMMMMMMMMMMMOMMMZZZM....
		.MMMMMMMMMMMMMMMMMMMMMMMMMMMMM, .... ............ZMMMMMMMMMMMMMMMMMMMMMMMZMM....
		 MMMMMMMMMMMMMMMMMMMMMMMMMMMMMZ,.................MMMMMMMMMMMMMMMMMDMMMMMZOMM....
		.MMMMMMMMMMMMMMMMMMMMMMMMMMMMMM.................ZMMMMMMMMMMMMMMMMMMMMMMMMMOM....
		. MMMMMMMMMMMMMMMMMMMMMMMMMMMMMM...............:MMMMMMMMMMMMMMMMMMMMMMMMMZZZ....
		..MMMMMMMMMMMMMMMMMMMMMMMMMMMMMM...............+MMMMMMMMMMMMMMMMMMMMMMMMZZZZ....
		..MMMMMMMMMMMMMOMMZMMMMMMMMMMMMM .............=MMMMMMMMMMMMMMMMMMMMMMMMMZZZZ....
		..MMMMMMMMMMMMMMZZMMMMMMMMMMMMMMZ,.......... OMMMMMMMMMMMMMMMMMMMMMMZMMZZZZZ....
		.. MMMMMMMMMMMMOOZMMMMMMMMMMMMMMMZ: .........MMMMMMMMMMMMMMMMMMMMMMMOMMMZZZZI...
		.. MMNMM8MMNODZZO8MMMMMMMMMMMMMMMMZ:........MMMMMMMMMM8MMMMMMMMMNMM88ZM8ZZZZ+...
		.. MMMZ8MZZZMZZZZMMMMMMMMMMMMMMMMMMZ.......IMMMMMMMMMMMMMMMMMMMOMMDMZZZZZZZZZ...
		..MMMMMMM$OOZZZZOMMMMMMMMMMMMMMMMMMM.... .OMMMMMMMMMMMMMMMMMMMMMMZZOZZZZZZZZZ...
		..MMMMZNOZZZZZZZZMZZMMMMMMMMMMMMMMMM=. ..=MMMMMMMMMMMMMMMMMMNMZZZMZZZZZMMZZZZ...
		..MMMMM8ZZZZZZZZMMMMMMMMMMMMMMMMMMMMMM .IMMMMMMMMMMMMMMMZMMMMMMZZMDMZOZMZZZZZ...
		..MMMMMNNNZZZZZN8ZDMMMMMMMMMMMMMMMMMMM..MMMMMMMMMMMMMMMM8MMDMNZMMNMM88ZZZZZZZ...
		..MMMMMMMMZZZZZZMZMMMMMMMMMMMMMMMMMMMMZZMMMMMMMMMMMMMMMMMZZMMMOMMMMMZMMZZZZZZ ..
		..MMMMMMMZZMZZZMZMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMOMMMMMMMMMMZMZZZZ ..
		...MMMMMMMZMOMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMZMMMMMMMDMMOOMMMMZZ ..
		...MMMMMZMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMZMMZMZZ ..
		...MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMZMMMMMMMMMMMMMMMMMMMMMMMMZZ ..
		...MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM...
		...MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMZMMMMMMMMMMMMMMMMMMMMMMM...
		...MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMZMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM ..
		....MMMMMMMMMMMMMMMOZOMMMMMMOMZZMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM...
		....MMMMMMMMMMMZMMMMMMMMMMMMMMZMMMMMMMMMMMMMMMMMMMMMMMMMMZMMMMMMMMMMMMMMMMMMM...
		....MMMMMMMMMMMMMMMMMMMZZZDZOMZZMZZZZZMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM...
		....MMMMMMMMMMMMMMMMMMMMMMMMNOZZZZZZZZZMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM...
		....MMMMMMMMMMMMMMMMMMMMMMMZMOZZZZZZZZZZMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM7...
		....MMMMMMMMMMMMMMMMMMMMMMMMMMMMZZZZZZZZZOMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM7...
		....DMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMZZZZZZZMMMMMNZZZMMMMMMMMMMMMMMMMMMMMMMMMZ....
		....DMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMZZZZZZZZZMMM8MZZZZZZMMMMMMMMMMMMMMMMMMMMZ....
		.... MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMZZZZZZZZDMMMZZZZZZMMMMMMMMMMZMOMMMMMMMM....
		.....MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMZZZZZZZMMMMMZZZZZMMMMMMMMMMMMMOMMMMMMM....
		.... MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMZZZZZMZ8ONOZZZZMMMMMMMMMMMMMMOMMMMMM....
		.....MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMZZMZZOZZZZZZM=...,MMMMMMMMMMMMMMM....
		..... MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMZ8ZOZZZZZZ. .....MMMMMMMOMMMMMMM....
		......MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMZMMOZZZZZZZM .......MZOMMMMMMMMMMM....
		......MMMMMMMMMMM. ..... MMMMMMMMMMMMMMMMMMMMZZZZZZZZ..........MMMMMMMMMMMMM....
		......MMMZMMMMMM..........MMMMMMMMMMMMMMMMMMMMZZZZZZM..........NMMMMMMMMMMMM....
		......MMZMZMMMM=...... . ..MMMMMMMMMMMMMMMMMMDODZMMM.. .. ......MMMMMMMMMMMM. ..
		......MMZ$ZMMMM............MMMMMMMMMMMMMMMMMMNMMONM,............NMMMMMMMMMMO....
		.......MMOMZZOM,...... ....+MMMMMMMMMMMMMMMMMMMNMNM ............ MMMMMMMMM8Z....
		.......MZZZOZMO....... .....MMMMMMMMMMMMZMMMMMMMMMM..............MMMMMMMMMMM....
		.......MZOZZZZ .............MMMMMMMMMMMMMMZZMMMMMM.... ...........MMMMMMMMNO....
		.......NZMZZOM .............MMMMMMMMMMMMMMMMMMMMMM................MMMMMMMZO+....
		.......ZZZMZZZ ... .   .... MMMMMMMMMMMMMMMMMMMMM .... ......... .7MMMMMMOM+....
		.......MMZMZZN..............:MMMMMMMMMMMMMMMMMMMM,................ MMMMMOMN?....
		.......MMOOMM................MMMMMMMMMMMMMMMMMMMM .................MMMMMMZM+....
		........OMZMM ........ ..... MMMMMMMMMMMMMMMMMMMM ..................MMMMMZN+....
		........MMMMM...............:MMMMMMMMMMMMMMMMMMM. ..................MMMMMMM+....
		........MMMMM............... MMMMMMMMMMMMMMMMMMM. .... .............:MMMMMM+....
		........MMMMM... ..... . ....MMMMMMMMMMMMMMMMMMM. .... ......... ... MMMMMM ....
		........NMMM ................MMMMMMMMMMMMMMMMMM....... ..............MMMMMO.....
		.........MZO ......... . ....MMMMMMMMMMMMMMMMMM . ............. . .. MMMMMO.....
		........,O8M.......... ......MMMMMMMMMMMMMMMMMM ..................... MMMM:.....
		.........ZMM................ MMMMMMMMMMMMMMZM8M.......................$MMM .....
		........ MM... ............. MMMMMMMMMMMMMMMZNM.. ...................  MMZ......
		........ MM..... ..... .... .MMMMMMMMMMMMMMMMMM.. .... ......... .. . .MMM .....
		........ MM .......... ......MMMMMMMMMMMMMMMMM?.. .... .............. . MM .....
		........ 8M........... . .. .MMMMMMMMMMMMMMMMM. . .... .. ......... . ..M. .. ..
		........ ZM... ..............MMMMMMMMMMMMMMMMM .. ................... ..M ......
		.........Z ........... .... .NMMMMMMMMMMMMMMMM... ... ..... ..... ... ......... 
		.......... ........... ...... MMMMMMMMMMMMMMMM... ................... ..........
		............................. MMMMMMMMMMMMMMMM... ................... ..........
		............................. MMMMMMMMMMMMMMM+... ................... ..........
		............................. MMMMMMMMMMMMMMM...................................
		...................... .. ... MMMMMMMMMMMMMMM.... .... ......... .... .... .....
		............................. MMMMMMMMMMMMMMM.... .... ......... .... .... .....
		............................. MMMMMMMMMMMMMM:.... ................... ..........
		............................. MMMMMMMMMMMMMM..... ................... ..........
		............................. MMMMMMMMMMMMMM..... ................... ..........
		...................... ...... MMMMMMMMMMMMMM .... .............. .... ..........
		..................... ....... MMMMMMMMMMMMZ  .... .... ......... .... .... .....
		............................. MMMMOMMMMMMOM ..... ................... ..........
		..............................MMMMOMMMMMZMM. .... .... ......... .... .... .....
		..............................MMMMD8DD8OZZZ ..... .... .............. .... .....
		...............................MMMOZMMZZZZZ...... .... .............. .... .....
		...............................MMMMMZMZZZZZ ....................................
		..... ... ............ ....... MMZZMZZZZZZZ  .... .... ......... .... .... .....
		..............................$MZZZOOZZZZZZ...... ................... ..........
		...................... ....... ZZZOZZZZZZZ....... .... .............. .... .....
		 ........ .....................MZZOZZZZZZZ....... ................... ..........
		...................... ........MZOOZZZZZZZ....... ................... ..........
		.....................  ........MM88ZOZNZZZ ...... .... .............. .... .....
		..  . ... .....................MMMZMMMMZZZO...... ................... ..........
		...............................MMMMOMMZ$ZM.. .... .... ......... .... .... .....
		...............................MMM8ZNMDMMD......................................
		..  ... . ............ .........MMMMMMMMMO . .... .... ......... .... .... .....
		................................MMMMMMMZ8M......................................
		.....................  ........ MMNMMMMZM. ...... .... .............. .... .....
		...................... .. ......MMMMMMMMZ. . .... .... ......... .... .... .....
		................................MMMDMMMMD ......................................
		................................MMMZMMOMM........ ............ ...... ..........
		...................... .. ...... MOOMZMM . . .... .... ......... .... .... .....
		...................... .... .....MMMMMMM.. ...... ................... ..........
		.................................MMMMZMM......... ................... ..........
		.................................MMMMZM ......... ................... ..........
		.................................MMMZOM ......... ................... ..........
		.................................MMMOMM  ... .... .... ......... .... .... .....
		...................... .. . .....MNZZZ$... ...... ............ ...... ..........
		................................ MMMMZ:.........................................
		..................... ..... ...  MMMZM... ... ... ............... ... ..........
		...................... ..........,MMMM.... ...... ................... ..........
		...................... .......... MMZM.... ...... ................... ..........
		..................... ..... ... ..MMM ... .. .... .............. .... ..........
		..................................MMM ........... ................... ..........
		........................... ......MMM....... .... .... ......... .... .... .....
		..................................MMM............ ................... ..........
		...................... .. ... ... MM ..... . .... .... ......... .... .... .....
		.....................  .... ... ..MM ....  ...... .... .............. .... .....
		..................................DM............. ................... ..........
		....... . .........................=............. ................... ..........
		...................................+............. ................... ..........
		......... ...........  ........ .... ....  . .... .... ......... .... .... .....
		................................................................................
		.. .. . . ............ ........ .... ..... ...... .... .............. .... .....
		`)	
	}

	$.parseNoEffectEmotion = function(tname, em) {
		if(em.toLowerCase().contains("afraid")) {
		  return target.name() + " cannot be more AFRAID!\r\n";
		}
		let finalString = `${tname} can't get ${em}`;
		if(finalString.length >= 40) {
		  let voinIndex = 0;
		  for(let i = 40; i >= 0; i--) {
			if(finalString[i] === " ") {
			  voinIndex = i;
			  break;
			}
		  }
		  finalString = [finalString.slice(0, voinIndex).trim(), "\r\n", finalString.slice(voinIndex).trimLeft()].join('')
		}
		return finalString;
	  }


		$.parseNoStateChange = function(tname,stat,hl) {
			let noStateChangeText = `${tname}'s ${stat} can't go`
			let second = `any ${hl}`; // TARGET NAME - STAT - HIGHER/LOWER
			let complete = `${noStateChangeText} ${second}`;
			if(complete.length < 40) {
				BattleManager.addText(complete, 16)
			}
			else {
				BattleManager.addText(noStateChangeText, 1)
				BattleManager.addText(second, 16)
			}
		}

	//###############################################################################
	//
	// SPRITE BALLOON
	//
	//###############################################################################

	Sprite_Balloon.prototype.waitTime = function() {return 0;};

	//###############################################################################
	//
	// WINDOW BATTLE LOG
	//
	//###############################################################################

	Yanfly.BEC.Window_BattleLog_displayAddedStates = function(target) {
		target.result().addedStateObjects().forEach(function(state) {
			var stateMsg = target.isActor() ? state.message1 : state.message2;
			if (state.id === target.deathStateId()) {
				this.push('performCollapse', target);
			}
			if(state.id === target.deathStateId() && target.isActor()) {
				if([1,8,9,10,11].contains(target.actorId())) {
					stateMsg = " blacked out!";
				}
			}
			if (stateMsg) {
				this.push('popBaseLine');
				this.push('pushBaseLine');
				this.push('addText', target.name() + stateMsg);
				this.push('waitForEffect');
			}
		}, this);		
	}

	// SPEED UP ACS
	Window_BattleLog = class extends Window_BattleLog {

		updateWaitCount() {
			let ACS_SKILLS = [46,49,52,86,89,92,126,129,132,168,171,174]; 
			let currentSkill = !!BattleManager._action && BattleManager._action._item ? BattleManager._action._item.object() : null;
			let skillId = !!DataManager.isSkill(currentSkill) ? currentSkill.id : 0;
			if(BattleManager._phase === "battleEnd") {return super.updateWaitCount();}
			if(!!skillId && ACS_SKILLS.contains(skillId) && this._waitCount > 0) {this._waitCount = 0;}
			return super.updateWaitCount();
		}
	}

})(Gamefall.OmoriFixes);

Gamefall.PermanentData = Gamefall.PermanentData || {};

(function($) {

	//###############################################################################
	//
	// PERMANENT MANAGER
	//
	//###############################################################################

	Permanent_Manager = class {

		static dataFolder() {
			const pp = require("path");
			const os = require("os");
			let folder = process.env.LOCALAPPDATA;
			if(os.platform() === "darwin") {
				folder = pp.join(process.env.HOME, "Library/Preferences/")
			}
			return folder;
		}

		static determineOmoriFolder() {
			const os = require("os");
			let folder = "OMORI/";
			if(os.platform() === "darwin") {
				folder = "com.omocat.omori/"
			}
			return folder;			
		}

		static load() {
			const pp = require("path");
			const fs = require("fs");
			const data_folder = this.dataFolder();
			const folder = pp.join(data_folder, this.determineOmoriFolder());
			this._cutsceneData = {};
			fs.readFile(folder + "CUTSCENE.json", (err, data) => {
				if(!!err) {throw new Error(err)}
				if(!data) {return this._cutsceneData = {};}
				this._cutsceneData = JSON.parse(data);
			})
		}

		static save() {
			const pp = require("path");
			const fs = require("fs");
			const data_folder = this.dataFolder();
			const omori_folder = this.determineOmoriFolder();
			const folder = pp.join(data_folder, omori_folder);
			fs.stat(folder, (err, stat) => {
				if(!stat || !!err) {fs.mkdirSync(folder);}
				let data = JSON.stringify(this._cutsceneData);
				fs.writeFile(folder + "CUTSCENE.json", data, err => {
					if(!!err) {
						console.error("An error has occured during permanent data saving process!");
						throw new Error(err);
					}
				})	
			})			
		}

		static isCutsceneSkippable(key) {
			return !!this._cutsceneData[key];
		}

		static addCutscene(key) {
			if(!!this._cutsceneData[key]) {return;}
			this._cutsceneData[key] = true;
			this.save();
		} 

		static _deletePermanentCutscenes() {
			const pp = require("path");
			const fs = require("fs");
			const data_folder = this.dataFolder();
			const folder = pp.join(data_folder, this.determineOmoriFolder());
			fs.unlink(folder + "CUTSCENE.json", err => {
				if(!!err) {
					console.error("CUTSCENE.json can't be erased!");
					throw new Error(err);
				}
				else {
					this._cutsceneData = {};
					console.info("CUTSCENE.json has been correctly deleted.")
				}
			})			
		}

		static cutsceneData() {return this._cutsceneData}
	}

	Permanent_Manager.load();

})(Gamefall.PermanentData);


Gamefall.AchivementsImplementation = Gamefall.AchivementsImplementation || {};

(function($) {

	//###############################################################################
	//
	// INFO:
	// This closure will contains only methods that would be added/monkey patched
	// for unlocking achivements;
	//
	//###############################################################################

	//###############################################################################
	//
	// GAME PARTY
	//
	//###############################################################################

	Game_Party = class extends Game_Party {
		
		gainItem(item, amount, includeEquip) {
			super.gainItem(item, amount, includeEquip);
			if(!!item) {
				if(item.id === 13) {
					let tofuCount = $gameParty.numItems(item);
					if(tofuCount >= 99) {$gameSystem.unlockAchievement("SWEETHEART_I_MEAN_TOFU");}
				}
			}
		}
	}

	//###############################################################################
	//
	// SCENE OMO MENU ITEM
	//
	//###############################################################################

	const _old_omo_scene_menu_item_onItemTrashPromptOk = Scene_OmoMenuItem.prototype.onItemTrashPromptOk;
	Scene_OmoMenuItem.prototype.onItemTrashPromptOk = function() {
		$gameSystem.unlockAchievement("LITTERING_IS_BAD_RECYCLING_IS_BETTER")
		_old_omo_scene_menu_item_onItemTrashPromptOk.call(this);
	}

})(Gamefall.AchivementsImplementation);

Gamefall.FPSMeter = Gamefall.FPSMeter || {};

(function($) {

	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	// FPSCounter
	//
	// This is based on Darsain's FPSMeter which is under the MIT license.
	// The original can be found at https://github.com/Darsain/fpsmeter.

	Omori_FPSCounter = function() {
		this.initialize(...arguments);
	};

	Omori_FPSCounter.prototype.initialize = function() {
		this._tickCount = 0;
		this._frameTime = 100;
		this._frameStart = 0;
		this._lastLoop = performance.now() - 100;
		this._showFps = true;
		this.fps = 0;
		this.duration = 0;
		this._createElements();
		this._update();
	};

	Omori_FPSCounter.prototype.startTick = function() {
		this._frameStart = performance.now();
	};

	Omori_FPSCounter.prototype.endTick = function() {
		const time = performance.now();
		const thisFrameTime = time - this._lastLoop;
		this._frameTime += (thisFrameTime - this._frameTime) / 12;
		this.fps = 1000 / this._frameTime;
		this.duration = Math.max(0, time - this._frameStart);
		this._lastLoop = time;
		if (this._tickCount++ % 15 === 0) {
			this._update();
		}
	};

	Omori_FPSCounter.prototype.switchMode = function() {
		if (this._boxDiv.style.display === "none") {
			this._boxDiv.style.display = "block";
			this._showFps = true;
		} else if (this._showFps) {
			this._showFps = false;
		} else {
			this._boxDiv.style.display = "none";
		}
		this._update();
	};

	Omori_FPSCounter.prototype.show = function() {
		this._boxDiv.style.display = "block";
		this._showFps = true;	
		this._update();	
	};

	Omori_FPSCounter.prototype.hide = function() {
		this._boxDiv.style.display = "none";
		this._showFps = false;	
		this._update();	
	};

	Omori_FPSCounter.prototype._createElements = function() {
		this._boxDiv = document.createElement("div");
		this._labelDiv = document.createElement("div");
		this._numberDiv = document.createElement("div");
		this._boxDiv.id = "fpsCounterBox";
		this._labelDiv.id = "fpsCounterLabel";
		this._numberDiv.id = "fpsCounterNumber";
		this._boxDiv.style.display = "none";
		this._boxDiv.appendChild(this._labelDiv);
		this._boxDiv.appendChild(this._numberDiv);
		document.body.appendChild(this._boxDiv);
	};

	Omori_FPSCounter.prototype._update = function() {
		const count = this._showFps ? this.fps : this.duration;
		this._labelDiv.textContent = this._showFps ? "FPS" : "ms";
		this._numberDiv.textContent = count.toFixed(0);
	};


	Graphics = class extends Graphics {
		static _createFPSMeter() {
			this._fpsMeter = new Omori_FPSCounter();
			this._fpsMeter.hide();
		}

		static _switchFPSMeter() {
			this._fpsMeter.switchMode();
		}

		static tickStart() {
			if(this._fpsMeter) {
				this._fpsMeter.startTick();
			}
		}

		static tickEnd() {
			if(this._fpsMeter) {
				this._fpsMeter.endTick();
			}
		}
	}

})(Gamefall.FPSMeter);


Gamefall.Encryption = Gamefall.Encryption || {};

(function($) {

	//###############################################################################
	//
	// DATA MANAGER
	//
	//###############################################################################	

	DataManager = class extends DataManager {

		static loadDatabase() {
			if(!!Utils.isOptionValid("test")) {return super.loadDatabase();}

			const path = require('path');
			const fs = require('fs');
			const yaml = require('./js/libs/js-yaml-master')  
			var base = path.dirname(process.mainModule.filename);
			if(window['$externalNotesData'] === undefined) {
				let noteBuffer = fs.readFileSync(base + '/data/Notes.yaml');
				noteBuffer = Encryption.decrypt(noteBuffer);
				window['$externalNotesData'] = yaml.safeLoad(noteBuffer.toString());
			}

			if(window["$dataQuests"] === undefined) {
				let questBuffer = fs.readFileSync(base + '/data/Quests.yaml');
				questBuffer = Encryption.decrypt(questBuffer);
				window["$dataQuests"] = yaml.safeLoad(questBuffer.toString());
			}
			for (var i = 0; i < this._databaseFiles.length; i++) {
				var name = this._databaseFiles[i].name;
				var src = this._databaseFiles[i].src.replace(".json", ".json");
				this.loadDataFile(name, src);
			}		
		}

		static loadDataFile(name, src) {
			if(!!Utils.isOptionValid("test")) {return super.loadDataFile(name, src);}
			const path = require('path');
			const fs = require('fs');
			var base = path.dirname(process.mainModule.filename);
			fs.readFile(base + "/data/" + src, (err, buffer) => {
				if(err) {throw new Error(err)}
				let decrypt = Encryption.decrypt(buffer);
				window[name] = JSON.parse(decrypt.toString());
				DataManager.onLoad(window[name]);
			});

		}

		static loadMapData(mapId) {
			if(!!Utils.isOptionValid("test")) {return super.loadMapData(mapId);}
			const path = require('path');
			const fs = require('fs');
			var base = path.dirname(process.mainModule.filename);
			if(mapId > 0) {
				let filename = 'Map%1.json'.format(mapId.padZero(3));
				this._mapLoader = false;
				window["$dataMap"] = null;
				Graphics.startLoading();
				fs.readFile(base + "/data/" + filename, (err, buffer) => {
					if(!!err) {
						Graphics.printLoadingError(base + "/data/" + filename);
						SceneManager.stop();
					}
					let decrypt = Encryption.decrypt(buffer);
					window["$dataMap"] = JSON.parse(decrypt.toString());
					DataManager.onLoad(window["$dataMap"])
					Graphics.endLoading();
					this._mapLoader = true;
				})
				this.loadTiledMapData(mapId)
			}
			else {
				this.makeEmptyMap();
				this.unloadTiledMapData();
			}
		}

		static loadTiledMapData(mapId) {
			if(!!Utils.isOptionValid("test")) {return super.loadTiledMapData(mapId);}
			const path = require('path');
			const fs = require('fs');
			var base = path.dirname(process.mainModule.filename);
			let mapName = `/maps/map${mapId}.json`;
			this.unloadTiledMapData();
			fs.readFile(base + mapName, (err, buffer) => {
				if(!!err) {
					console.error(err)
					Graphics.printLoadingError(base + mapName);
					SceneManager.stop();
				}
				let decrypt = Encryption.decrypt(buffer);
				DataManager._tempTiledData = JSON.parse(decrypt.toString());
	            DataManager.loadTilesetData();
	            DataManager._tiledLoaded = true;
			})
		}

		// Compatibility with YEP Call Event

		static loadCallMapData(mapId) {
			if(!!Utils.isOptionValid("test")) {return super.loadCallMapData(mapId);}
			if(mapId > 0) {
				let filename = 'Map%1.json'.format(mapId.padZero(3));
				this.loadDataFile("$callEventMap", filename);
			}
			else {
				$callEventMap = {};
				$callEventMap.data = [];
				$callEventMap.events = [];
				$callEventMap.width = 100;
				$callEventMap.height = 100;
				$callEventMap.scrollType = 3;			
			}
		}
	}

	//###############################################################################
	//
	// LANGUAGE MANAGER
	//
	//###############################################################################	

	LanguageManager = class extends LanguageManager {

		static loadLanguageFiles(language) {
			if(!!Utils.isOptionValid("test")) {return super.loadLanguageFiles(language);}
			const path = require('path');
			const fs = require('fs');
			const yaml = require('./js/libs/js-yaml-master')  
			var base = path.dirname(process.mainModule.filename);

			let folder = "/Languages/" + language + "/";
			let filePath = base + folder;
			let dirList = fs.readdirSync(filePath);
			this._data[language] = {text: {}};
			for(let directory of dirList) {
				let format = path.extname(directory);
				let filename = path.basename(directory, format);
				if(format === ".yaml") {
					let buff = fs.readFileSync(filePath + '/' + filename + format);
					buff = Encryption.decrypt(buff);
					this._data[language].text[filename] = yaml.safeLoad(buff.toString());
				}
			}

		}
	}

	LanguageManager.initialize();

	//###############################################################################
	//
	// ATLAS MANAGER
	//
	//###############################################################################	

	AtlasManager = class extends AtlasManager {

		static initAtlasData() {
			if(!!Utils.isOptionValid("test")) {return super.initAtlasData();}
			if(window["$atlasData"] === undefined) {
				const path = require("path");
				const fs = require("fs");
				const yaml = require('./js/libs/js-yaml-master')
				var base = path.dirname(process.mainModule.filename);
				let folder = '/img/atlases/';
				var filePath = base + folder;
				var dirList = fs.readdirSync(filePath);
				let yy = fs.readFileSync(base + '/data/Atlas.yaml');
				yy = Encryption.decrypt(yy);
				var data = yaml.safeLoad(yy);
				window['$atlasData'] = data;
			}
		}
	}

	// NEED TO CLEAR ATLAS PLUGIN! DON'T FORGET!!
	AtlasManager.initAtlasData()

})(Gamefall.Encryption);


Gamefall.FootSound = Gamefall.FootSound || {};

(function($) {

	//###############################################################################
	//
	// GAME PLAYER
	//
	//###############################################################################

	Game_Player = class extends Game_Player {

		initMembers() {
			super.initMembers();
			this._footstepDisabled = false;
		}

		isFootSoundEnabled() {
			return !this._footstepDisabled;
		}

		switchFootstepSound(value) {
			return this._footstepSound = value;
		}

		canPlayFootsound() {
			return (!this.isOnLadder() && !$gameMap._interpreter.isRunning())
		}

		playFootSound() {
			if(!this.canPlayFootsound()) {return;}
			let sound = $gameMap.getFootsound($gamePlayer.x, $gamePlayer.y);
			if(!sound) {return;}
			return AudioManager.playSe(sound);
		}

		getFootsoundFrequency() {
			switch(this.maxPattern()) {
				case 4: return 2;
				case 8: return 3;
			}
		}

		updatePattern() {
			super.updatePattern();
			if(!!this.isMoving() && !!this.isFootSoundEnabled()) {
				if(this._pattern % this.getFootsoundFrequency() === 0) {this.playFootSound();}
			}
		}
	}

	//###############################################################################
	//
	// GAME MAP
	//
	//###############################################################################

	Game_Map = class extends Game_Map {

		setup(mapId) {
			super.setup(mapId);
			this.processFootstepSound();
		}

		getFootsound(x,y) {
			if(this._footsounds.length <= 0) {return;}
			let rect = this._footsounds.filter(r => r.contains(x,y));
			if(rect.length <= 0) {return null;}
			return rect[0].footsound;
		}

		processFootstepSound() {
			this._footsounds = [];
			let matches = $dataMap.note.match(/<FootSound:\s*(.*)>/g);
			if(!matches) {return;}
			if(matches.length <= 0) {return;}
			for(let data of matches) {
				let match = data.match(/<FootSound:\s*(.*)>/)[1].split(/\s*\|\s*/);
				let start_point = match[0].split(/\s*,\s*/).map(Number);
				let end_point = match[1].split(/\s*,\s*/).map(Number);
				let sound = match[2].split(/\s*,\s*/);
				let rw = Math.abs(start_point[0] - end_point[0]);
				let rh = Math.abs(start_point[1] - end_point[1]);
				let rect = new PIXI.Rectangle(start_point[0], start_point[1], rw, rh);
				rect.footsound = {name: sound[0], volume: parseInt(sound[1]), pitch:parseInt(sound[2]), pan:0}
				this._footsounds.push(rect);
			}
		}
	}

})(Gamefall.FootSound);

Gamefall.JPWordWrap = Gamefall.JPWordWrap || {};

(function($) {

	function isTextInCurrentLanguage(text) {
		const lang = LanguageManager.defaultLanguage()
		switch(lang) {
			default:
				let englishOnly = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?☆ ]*$/;
				if(!englishOnly.test(text)) {return false}
				break;
			case "jp":
				let japaneseOnly = /^[\u3000-\u303F|\u3040-\u309F|\u30A0-\u30FF|\uFF00-\uFFEF|\u4E00-\u9FAF|\u2605-\u2606|\u2190-\u2195|\u203B|0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?☆ ]*$/g;
				if(!japaneseOnly.test(text)) {return false}
				break
			case "kr":
				let koreanOnly = /(^[\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3|0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?☆ ]*$)/g
				if(!koreanOnly.test(text)) {return false}
			case "sc":
				let scOnly = /^([\u4e00-\u9eff|\u3000-\u303F|0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?☆ ])*$/
				if(!scOnly.test(text)) {return false}
		}
		return true
	}


	//=====================================================================
	// This addition is inspired from DarkPlasma Japanese Word Wrap 
	// approach. Header:

	// DarkPlasma_WordWrapForJapanese
	// This software is released under the MIT license.
	// http://opensource.org/licenses/mit-license.php

	//###############################################################################
	//
	// WINDOW BASE
	//
	//###############################################################################

	$._enable_2byte_linebreak = false

	Window_Base.prototype.canLineBreak = function(type, char) {
		let chars;
		if(!type) { // Line Break Before
			chars = ",)]｝、〕〉》」』】〙〗〟’”｠»ゝゞーァィゥェォッャュョヮヵヶぁぃぅぇぉっゃゅょゎゕゖㇰㇱㇲㇳㇴㇵㇶㇷㇸㇹㇷ゚ㇺㇻㇼㇽㇾㇿ々〻‐゠–〜～?!‼⁇⁈⁉・:;/。.";
		}
		else { // Line Break After
			chars = "([｛〔〈《「『【〘〖〝‘“｟«"
		}
		return chars.includes(char);
	}

	Window_Base.prototype.isEasternLocale = function() {
		return !!$._enable_2byte_linebreak 
	}

	const _old_window_base_checkWordWrap = Window_Base.prototype.checkWordWrap;
	Window_Base.prototype.checkWordWrap = function(textState) {
		if(!this.isEasternLocale()) {return _old_window_base_checkWordWrap.call(this, textState);}
		if(!textState || textState.index === 0) {return false;}
		if(!this._wordWrap) {return false;}
		let newIndex = textState.index + 1;
		let nextChar = textState.text.substring(textState.index, newIndex);
		let size = this.textWidthExCheck(nextChar) * (this.contents.fontSize / this.standardFontSize());
		if(textState.x + size > this.wordwrapWidth()) {
			return !this.canLineBreak(0, nextChar)
		}
		// Check 2nd byte character;
		newIndex = textState.index + 2;
		nextChar =  textState.text.substring(textState.index, newIndex);
		size = this.textWidthExCheck(nextChar) * (this.contents.fontSize / this.standardFontSize());
		if(textState.x + size > this.wordwrapWidth()) {
			return this.canLineBreak(1, nextChar)
		}
		return false;
	}

	if(!!$._enable_2byte_linebreak) {
		_TDS_.TextEffects.Window_Base_processNormalCharacter = function(textState) {
			if (this.checkWordWrap(textState)) {
				if(!this._letterEffectsActive) {
					textState.index -= 1;
				}	
				return this.processNewLine(textState);
			}
			Yanfly.Message.Window_Base_processNormalCharacter.call(this, textState)		
		}
	}

	const _old_omomenuhelp_refresh = Window_OmoMenuHelp.prototype.refresh;
	Window_OmoMenuHelp.prototype.refresh = function() {
		if(!this.isEasternLocale()) {return _old_omomenuhelp_refresh.call(this)}
		if(!this._item) {return _old_omomenuhelp_refresh.call(this)}
		const _temp_item_description = this._item.description;
		this._item.description = "<WordWrap>" + this._item.description
		_old_omomenuhelp_refresh.call(this);
		this._item.description = _temp_item_description;
	}

	const _old_omomenuhelp_wordwrapWidth = Window_OmoMenuHelp.prototype.wordwrapWidth
	Window_OmoMenuHelp.prototype.wordwrapWidth = function() {
		if(!this.isEasternLocale()) {return _old_omomenuhelp_wordwrapWidth.call(this)}
		let diff = 8
		if(!!this._item) {
			if(!!this._item.meta.IconIndex) {
				diff = 8 + (106 * this._iconRate)
			}
		}
		return this.contents.width - diff
	}

	//###############################################################################
	//
	// SAVEFILES COMPATIBILITY - DATA MANAGER
	//
	//###############################################################################

	DataManager.actorNamesPerLanguage = [
		["OMORI", "オモリ", "오모리", "OMORI"],
		["AUBREY", "オーブリー", "오브리", "奥布里"],
		["KEL", "ケル", "켈", "凯"],
		["HERO", "ヒロ", "히로", "英雄"]
	];
	
	DataManager.chapterNamesPerLanguage = [
		["???", "???", "???", "？？？"],
		["MOVING DAY", "引越しの日", "이삿날", "搬家当天"],
		["ONE DAY LEFT...", "あと1日……", "이삿날까지 하루 남음...", "还有一天……"],
		["TWO DAYS LEFT...", "あと2日……", "이삿날까지 이틀 남음...", "还有两天……"],
		["THREE DAYS LEFT...", "あと3日……", "이삿날까지 사흘 남음...", "还有三天……"],
		["PROLOGUE", "プロローグ", "서장", "序章"]
	];

	DataManager.locationNamesPerLanguage = [
		["OUTSIDE","家の外","바깥","外面"],
		["MOM'S ROOM","お母さんの部屋","엄마의 방","妈妈的房间"],
		["BASIL'S HOUSE","バジルの家","바질의 집","贝瑟尔家"],
		["FARAWAY PARK","ハルバル公園","패러웨이 공원","遥远公园"],
		["SECRET LAKE","秘密の湖","비밀 호수","秘密湖泊"],
		["FOREST PLAYGROUND","森の遊び場","숲 놀이터","森林游乐场"],
		["VAST FOREST","ヒロビロ森","광대한 숲","辽阔森林"],
		["PINWHEEL FOREST","カザグルマ森","바람개비 숲","风车森林"],
		["ORANGE OASIS","オレンジオアシス","오렌지 오아시스","橙子绿"],
		["RAIN TOWN","アメフリの町","비의 마을","落雨镇"],
		["OTHERWORLD","イセカイ","별세계","异世界"],
		["FROZEN LAKE","ヒエビエ湖","얼어붙은 호수","结冰湖"],
		["SNOWGLOBE MOUNTAIN","スノードームマウンテン","스노우블로브 산","雪花球山"],
		["JUNKYARD","廃品投棄場","쓰레기장","垃圾场"],
		["PYREFLY FOREST","ヒバナ森","반딧불더미 숲","焚火虫森林"],
		["LOST FOREST","サイゴノ楽園","잃어버린 숲","迷失森林"],
		["SPROUT MOLE VILLAGE","ナエモグ村","두더지 새싹 마을","树苗鼹鼠村"],
		["SWEETHEART'S CASTLE","スイートハート城","스위트하트의 성","甜心城堡"],
		["LAST RESORT","サイゴノ楽園","최후의 도피처","最后度假村"],
		["UNDERWATER HIGHWAY","水中高速道路","수중 고속도로","水下高架"],
		["DEEPER WELL","シンエン井戸","더 깊은 우물","深井深处"],
		["HUMPHREY","ハンフリー","험프리","汉弗莱"],
		["BOSS RUSH","ボスラッシュ","보스 러시","头目反击战"],
		["THE ABYSS","ナラク","심연","深渊"],
		["BLACK SPACE","ブラックスペース","검은 공간","黑色空间"],
		["BASIL'S MEADOW","バジルの草原","바질의 꽃밭","贝瑟尔的草地"],
		["LOST LIBRARY","失われし図書館","잃어버린 도서관","失落图书馆"],
		["RECYCULTIST'S HQ","リサイカルト本部","재활용교도의 본부","回收教徒总部"],
		["BREAVEN","パンクチュアリ","빵천국","面包天堂"],
		["BACKSTAGE","バックステージ","무대 뒤편","后台"],
		["MEMORY LANE","思い出の道","추억의 뒤안길","回忆小道"],
		["NEIGHBOR'S BEDROOM","オトナリベッドルーム","이웃의 침실","邻居的卧室"]
	]

	DataManager = class extends DataManager {

		static convertNameToLanguage(type, name) {
			let myLanguageIndex = ['en', 'jp', 'kr', 'sc'].indexOf(LanguageManager.defaultLanguage());
			if (myLanguageIndex != -1) {
				let namesPerLanguage = type === 'actor'? this.actorNamesPerLanguage : type === "chapter" ? this.chapterNamesPerLanguage : this.locationNamesPerLanguage;
				for (let entryNum = 0; entryNum < namesPerLanguage.length; entryNum++) {
					for (let languageID = 0; languageID < namesPerLanguage[entryNum].length; languageID++) {
						if (languageID == myLanguageIndex) continue;
						if (name == namesPerLanguage[entryNum][languageID]) { // Name from other language detected
							return namesPerLanguage[entryNum][myLanguageIndex];
						};
					};
				};
			};
			return name;
		}

		static loadGameWithoutRescue(savefileId) {
			let result = super.loadGameWithoutRescue(savefileId);
			$gameSystem.initMessageFontSettings();
			for (let actorID = 1; actorID < $gameActors._data.length; actorID++) {
				let actor = $gameActors.actor(actorID);
				if (actor == null) continue;
				let name = actor.name();
				let newName = this.convertNameToLanguage('actor', name);
				if (newName != name)
					actor.setName(newName);
			};
			return result;
		}

		static loadSavefileInfo(savefileId) {
			var globalInfo = this.loadGlobalInfo();
			if (globalInfo && globalInfo[savefileId]) {
				globalInfo[savefileId].actorData.name = this.convertNameToLanguage('actor', globalInfo[savefileId].actorData.name);
				if(!isTextInCurrentLanguage(globalInfo[savefileId].actorData.name)) {
					const lang = LanguageManager.defaultLanguage();
					globalInfo[savefileId].actorData.name = LanguageManager._data[lang]["text"]["XX_BLUE"]["Omori_Name_Input"]["defaultname"] // Assuming this is Sunny as all the other characters that could save
					// are defined inside actorNamesPerLanguage array.
				}
				globalInfo[savefileId].chapter = this.convertNameToLanguage('chapter', globalInfo[savefileId].chapter);
				globalInfo[savefileId].location = this.convertNameToLanguage('location', globalInfo[savefileId].location)
			};
			return (globalInfo && globalInfo[savefileId]) ? globalInfo[savefileId] : null;
		}
	}

	//###############################################################################
	//
	// GAME ACTOR
	//
	//###############################################################################

	Game_Actor = class extends Game_Actor {

		name() {
			if(this._actorId !== 8) {return super.name()} // NOT SUNNY
			const lang = LanguageManager.defaultLanguage();
			const defaultName = LanguageManager._data[lang]["text"]["XX_BLUE"]["Omori_Name_Input"]["defaultname"]
			let name = this._name
			if(!isTextInCurrentLanguage(name)) {name = defaultName}
			return name
		}

	}

})(Gamefall.JPWordWrap)
