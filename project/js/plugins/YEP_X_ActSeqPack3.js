//=============================================================================
// Yanfly Engine Plugins - Battle Engine Extension - Action Sequence Pack 3
// YEP_X_ActSeqPack3.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_ActSeqPack3 = true;

var Yanfly = Yanfly || {};
Yanfly.ASP3 = Yanfly.ASP3 || {};
Yanfly.ASP3.version = 1.05;

//=============================================================================
 /*:
 * @plugindesc v1.05 (Requires YEP_BattleEngineCore.js) Camera control is
 * added to the Battle Engine Core's action sequences.
 * @author Yanfly Engine Plugins
 *
 * @param Camera Option
 * @desc Options text used for Camera movement shown in battle.
 * @default Battle Camera
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Action Sequence Pack 3 plugin is an extension plugin for Yanfly Engine
 * Plugins' Battle Engine Core. This extension plugin will not work without the
 * main plugin.
 *
 * This extension plugin contains the more basic functions used for customized
 * action sequences on a visual scale. This plugin focuses on camera control
 * and screen zooming.
 *
 * ============================================================================
 * Action Sequences - ala Melody
 * ============================================================================
 *
 * Battle Engine Core includes Yanfly Engine Melody's Battle Engine system,
 * where each individual aspect of the skill and item effects can be controlled
 * to a degree. These are called Action Sequences, where each command in the
 * action sequence causes the game to perform a distinct individual action.
 *
 * Each skill and item consists of five different action sequences. They are as
 * follows:
 *
 * 1. Setup Actions
 *   They prepare the active battler before carrying out the bulk of the action
 * and its individual effects. Usually what you see here are things such as the
 * active battler moving forward a bit, unsheathing their weapon, etc. This step
 * will occur before the active battler expends their skill or item costs.
 *
 * 2. Whole Actions
 *   These actions will affect all of the targets simultaneously. Although this
 * section does not need to be used, most actions will use this for displaying
 * animations upon all enemies. This step occurs after skill and item costs.
 *
 * 3. Target Actions
 *   This section will affect all of the targets individually. Used primarily
 * for physical attacks that will deliver more personal forms of damage. Actions
 * that occur here will not affect other targets unless specifically ordered to
 * do so otherwise.
 *
 * 4. Follow Actions
 *   This section will dedicate towards cleanup work after the individual
 * targeting actions. Here, it'll do things such as removing immortal flags,
 * start up common events, and more.
 *
 * 5. Finish Actions
 *   This section will have the active battler close up the action sequence.
 * Usually stuff like running waits and holds at the last minute for skills and
 * items, moving back to place, and others.
 *
 * Now that you know each of the five steps each action sequence goes through,
 * here's the tags you can insert inside of skills and items. Pay attention to
 * each tag name.
 *
 * 1. <setup action>                                5. <finish action>
 *     action list                                      action list
 *     action list                                      action list
 *    </setup action>                                  </finish action>
 *
 * 2. <whole action>       3. <target action>       4. <follow action>
 *     action list             action list              action list
 *     action list             action list              action list
 *    </whole action>         </target action>         </follow action>
 *
 * They will do their own respective action sets. The methods to insert for the
 * action list can be found below in the core of the Help Manual.
 *
 * Furthermore, to prevent overflooding every single one of your database item's
 * noteboxes with action sequence lists, there's a shortcut you can take to copy
 * all of the setup actions, whole actions, target actions, follow actions, and
 * finish actions with just one line.
 *
 * <action copy: x:y>
 *
 * Replace x with "item" or "skill" to set the type for the action list code to
 * directly copy. The integer y is then the ID assigned for that particular
 * object type. For example, to copy 45th skill's action sequences, the code
 * would be <action copy: skill:45> for anything that will accept these action
 * codes. If you do use this notetag, it will take priority over any custom
 * that you've placed in the notebox.
 *
 * ============================================================================
 * Target Typing
 * ============================================================================
 *
 * You may notice that in some of the actions below will say "refer to target
 * typing" which is this section right here. Here's a quick run down on the
 * various targets you may select.
 *
 *   user; This will select the active battler.
 *   target, targets; These will select the active targets in question.
 *   actors, existing actors; These will select all living actors.
 *   all actors; This will select all actors including dead ones.
 *   dead actors: This will select only dead actors.
 *   actors not user; This will select all living actors except for the user.
 *   actor x; This will select the actor in slot x.
 *   character x; This will select the specific character with actor ID x.
 *   enemies, existing enemies; This will select all living enemies.
 *   all enemies; This will select all enemies, even dead.
 *   dead enemies: This will select only dead enemies.
 *   enemies not user; This will select all enemies except for the user.
 *   enemy x; This will select the enemy in slot x.
 *   friends; This will select the battler's alive allies.
 *   all friends; This will select the all of battler's allies, even dead.
 *   dead friends; This will select the battler's dead allies.
 *   friends not user; This will select the battler's allies except itself.
 *   friend x: This will select the battler's ally in slot x.
 *   opponents; This will select the battler's alive opponents.
 *   all opponents; This will select the all of the battler's opponents.
 *   dead opponents; This will select the battler's dead opponents.
 *   opponent x: This will select the battler's opponent in slot x.
 *   all alive; Selects all living actors and enemies.
 *   all members; Selects all living and dead actors and enemies.
 *   all dead; Selects all dead actors and enemies.
 *   all not user; This will select all living battlers except user.
 *   focus; Selects the active battler and its targets.
 *   not focus; Selects everything but the active battler and its targets.
 *
 * ============================================================================
 * Action Sequences - Action List
 * ============================================================================
 *
 * The following contains a list of the actions you can use inside the five
 * action sequences. Each action has a unique function and requires certain
 * formats to operate properly.
 *
 *=============================================================================
 * CAMERA CLAMP ON
 * CAMERA CLAMP OFF
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * By default, the camera clamp is on, which forces the camera to never pan
 * outside of the battlefield's boundaries. However, in the event you wish to
 * turn this off, use 'camera clamp off' to shut off the clamp. The clamp,
 * however, will be turned back on at the end of each 'perform finish' action.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: camera clamp on
 *                camera clamp off
 *=============================================================================
 *
 *=============================================================================
 * CAMERA FOCUS: target, (location), (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * CAMERA FOCUS: target, FRONT BASE, (frames)
 * CAMERA FOCUS: target, BASE, (frames)
 * CAMERA FOCUS: target, BACK BASE, (frames)
 * CAMERA FOCUS: target, FRONT CENTER, (frames)
 * CAMERA FOCUS: target, CENTER, (frames)
 * CAMERA FOCUS: target, BACK CENTER, (frames)
 * CAMERA FOCUS: target, FRONT HEAD, (frames)
 * CAMERA FOCUS: target, HEAD, (frames)
 * CAMERA FOCUS: target, BACK HEAD, (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This will focus on a target(s) (refer to target typing) and a location. If
 * the location is omitted, the camera will focus on the target(s)'s center.
 * Note: The camera will not shift past screen boundaries.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: camera focus: user
 *                camera focus: target, front, 40
 *                camera focus: enemies, center, 30
 *=============================================================================
 *
 *=============================================================================
 * CAMERA OFFSET: DIRECTION, DISTANCE
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * CAMERA OFFSET: LEFT, distance
 * CAMERA OFFSET: RIGHT, distance
 * CAMERA OFFSET: UP, distance
 * CAMERA OFFSET: DOWN, distance
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Offsets the camera a direction by (distance) amount.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: camera offset: left, 200
 *                camera offset: right, Graphics.boxWidth / 4
 *                camera offset: up, 300
 *                camera offset: down, $gameVariables.value(3);
 *=============================================================================
 *
 *=============================================================================
 * CAMERA PAN
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * CAMERA PAN: LEFT, distance, (frames)
 * CAMERA PAN: RIGHT, distance, (frames)
 * CAMERA PAN: UP, distance, (frames)
 * CAMERA PAN: DOWN, distance, (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Pans the camera a direction a certain distance in pixels. You can use a
 * combination of left/right and up/down to perform a diagonal camera pan.
 * Using 'frames' will allow you to adjust the duration of the camera pan.
 * Omitting 'frames' will set the camera pan duration to 30 frames.
 * Note: The camera will not shift past screen boundaries.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: camera pan: left, 200
 *                camera pan: up, 250
 *                camera pan: right, 500, 60
 *                camera pan: down: 300, 60
 *=============================================================================
 *
 *=============================================================================
 * CAMERA SCREEN
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * CAMERA SCREEN: TOP LEFT, (frames)
 * CAMERA SCREEN: FAR LEFT, (frames)
 * CAMERA SCREEN: BOTTOM LEFT, (frames)
 * CAMERA SCREEN: TOP CENTER, (frames)
 * CAMERA SCREEN: CENTER, (frames)
 * CAMERA SCREEN: BOTTOM CENTER, (frames)
 * CAMERA SCREEN: TOP RIGHT, (frames)
 * CAMERA SCREEN: FAR RIGHT, (frames)
 * CAMERA SCREEN: BOTTOM RIGHT, (frames)
 * CAMERA SCREEN: POINT, x, y, (frames)
 * CAMERA SCREEN: target, FRONT, (frames)
 * CAMERA SCREEN: target, BASE, (frames)
 * CAMERA SCREEN: target, BACK, (frames)
 * CAMERA SCREEN: target, FRONT CENTER, (frames)
 * CAMERA SCREEN: target, CENTER, (frames)
 * CAMERA SCREEN: target, BACK CENTER, (frames)
 * CAMERA SCREEN: target, FRONT TOP, (frames)
 * CAMERA SCREEN: target, TOP, (frames)
 * CAMERA SCREEN: target, BACK TOP, (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Moves the camera to a certain part of the screen. If you choose a target,
 * the camera will lock to that part of the target. Using (frames) will
 * determine the duration of the time the camera will move over to the target
 * location. Omitting (frames) will set the camera pan duration to 30 frames.
 * Note: The camera will not shift past screen boundaries.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: camera screen: top left
 *                camera screen: far right, 30
 *                camera screen: point, 400, 300, 60
 *                camera screen: user, base
 *                camera screen: targets, base, 60
 *=============================================================================
 *
 *=============================================================================
 * RESET CAMERA: (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Resets the camera location back to default location, which is the center of
 * the battlefield. Using (frames) will allow you to adjust the duration in
 * which the camera resets. Omitting 'frames' will set the camera to reset in
 * 30 frames.
 * Note: The camera will not shift past screen boundaries.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: reset camera
 *                reset camera: 30
 *=============================================================================
 *
 *=============================================================================
 * RESET ZOOM: (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Resets the camera zoom back to default zoom, which is 100%. Using (frames)
 * will allow you to adjust the duration in which the zoom resets. Omitting
 * 'frames' will set the zoom to reset in 30 frames.
 * Note: The camera will not shift past screen boundaries.
 * Note: Zooming only works with Sideview.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: reset zoom
 *                reset zoom: 30
 *=============================================================================
 *
 *=============================================================================
 * WAIT FOR CAMERA
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Waits for the camera to finish panning before going on to the next action in
 * the action sequence.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: wait for camera
 *=============================================================================
 *
 *=============================================================================
 * WAIT FOR ZOOM
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Waits for the zoom to finish changing before going on to the next action in
 * the action sequence.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: wait for zoom
 *=============================================================================
 *
 *=============================================================================
 * ZOOM: x%, (frames)
 * ZOOM: x.y, (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Zooms to x% or x.y rate. Using (frames) will allow you to adjust the
 * duration in which the zooming occurs. Omitting 'frames' will set the zoom
 * duration to 30 frames.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: zoom: 200%
 *                zoom: 1.5, 45
 *=============================================================================
 *
 * ============================================================================
 * Options Core Settings - Adding the New Options
 * ============================================================================
 *
 * If you are using YEP_OptionsCore.js, you can add a new Option using this
 * plugin. Here's the following code/parameter settings you can use with it.
 *
 * ---------
 * Settings:
 * ---------
 * 
 * Name:
 * \i[302]Battle Camera
 *
 * Help Description:
 * If ON, the camera in battle will move around.
 * If OFF, the camera in battle will be locked in place.
 *
 * Symbol:
 * battleCamera
 *
 * Show/Hide:
 * show = Imported.YEP_X_ActSeqPack3;
 *
 * Enable:
 * enabled = true;
 *
 * Ext:
 * ext = 0;
 *
 * ----------
 * Functions:
 * ----------
 * 
 * Make Option Code:
 * this.addCommand(name, symbol, enabled, ext);
 *
 * Draw Option Code:
 * var rect = this.itemRectForText(index);
 * var statusWidth = this.statusWidth();
 * var titleWidth = rect.width - statusWidth;
 * this.resetTextColor();
 * this.changePaintOpacity(this.isCommandEnabled(index));
 * this.drawOptionsName(index);
 * this.drawOptionsOnOff(index);
 *
 * Process OK Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * this.changeValue(symbol, !value);
 *
 * Cursor Right Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * this.changeValue(symbol, true);
 * 
 * Cursor Left Code:
 * var index = this.index();
 * var symbol = this.commandSymbol(index);
 * var value = this.getConfigValue(symbol);
 * this.changeValue(symbol, false);
 *
 * Default Config Code:
 * // Empty. Provided by this plugin.
 *
 * Save Config Code:
 * // Empty. Provided by this plugin.
 *
 * Load Config Code:
 * // Empty. Provided by this plugin.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.05:
 * - Compatibility update with YEP_OptionsCore.js.
 *
 * Version 1.04:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.03:
 * - Restriction on Camera and Zoom action sequences lifted from being Sideview
 * only. Use them at your own caution.
 *
 * Version 1.02a:
 * - Updated the Game_Screen.startZoom() function from beta to newest version.
 * - Decided to separate the methods as it breaks panning.
 * - Changed priority of IF action sequences to higher to no longer interfere
 * other action sequences.
 *
 * Version 1.01:
 * - Updated help file to include Character X for target typing.
 *
 * Version 1.00:
 * - Finished plugin!
 */
//=============================================================================

if (Imported.YEP_BattleEngineCore) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_ActSeqPack3');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.ASP3CameraOption = String(Yanfly.Parameters['Camera Option']);

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.ASP3.BattleManager_processActionSequence =
  BattleManager.processActionSequence;
BattleManager.processActionSequence = function(actionName, actionArgs) {
  // CAMERA CLAMP
  if (['CAMERA CLAMP ON', 'CAMERA CLAMP OFF'].contains(actionName)) {
    return this.actionCameraClamp(actionName);
  }
  // CAMERA FOCUS
  if (['CAMERA FOCUS', 'FOCUS CAMERA'].contains(actionName)) {
    return this.actionCameraFocus(actionArgs);
  }
  // CAMERA OFFSET
  if (['CAMERA OFFSET', 'OFFSET CAMERA'].contains(actionName)) {
    return this.actionCameraOffset(actionArgs);
  }
  // CAMERA PAN
  if (['CAMERA PAN', 'PAN CAMERA'].contains(actionName)) {
    return this.actionCameraPan(actionArgs);
  }
  // CAMERA SCREEN
  if (actionName === 'CAMERA SCREEN') {
    return this.actionCameraScreen(actionArgs);
  }
  // RESET CAMERA
  if (actionName === 'RESET CAMERA') {
    return this.actionResetCamera(actionArgs);
  }
  // RESET ZOOM
  if (actionName === 'RESET ZOOM') {
    return this.actionResetZoom(actionArgs);
  }
  // WAIT FOR CAMERA
  if (actionName === 'WAIT FOR CAMERA') {
    return this.actionWaitForCamera();
  }
  // WAIT FOR ZOOM
  if (actionName === 'WAIT FOR ZOOM') {
    return this.actionWaitForZoom();
  }
  // ZOOM
  if (actionName === 'ZOOM') {
    return this.actionZoom(actionArgs);
  }
  return Yanfly.ASP3.BattleManager_processActionSequence.call(this,
    actionName, actionArgs);
};

Yanfly.ASP3.BattleManager_actionPerformFinish =
    BattleManager.actionPerformFinish;
BattleManager.actionPerformFinish = function() {
    this.actionResetZoom([30]);
    this.resetCamera([30]);
    return Yanfly.ASP3.BattleManager_actionPerformFinish.call(this);
};

BattleManager.actionCameraClamp = function(actionName) {
    if (!ConfigManager.battleCamera) return true;
    if (actionName === 'CAMERA CLAMP ON') {
      this._cameraClamp = true;
    } else if (actionName === 'CAMERA CLAMP OFF') {
      this._cameraClamp = false;
    }
    return true;
};

BattleManager.actionCameraFocus = function(actionArgs) {
    if (!ConfigManager.battleCamera) return true;
    this._cameraFocusGroup = this.makeActionTargets(actionArgs[0]);
    if (this._cameraFocusGroup.length < 1) return false;
    var type = (actionArgs[1]) ? actionArgs[1].toUpperCase() : 'CENTER';
    var frames = actionArgs[2] || 30;
    if (['FRONT BASE', 'FRONT FOOT', 'FRONT FEET'].contains(type)) {
      this._cameraFocusPosX = 'FRONT';
      this._cameraFocusPosY = 'BASE';
    } else if (['BASE', 'FOOT', 'FEET'].contains(type)) {
      this._cameraFocusPosX = 'MIDDLE';
      this._cameraFocusPosY = 'BASE';
    } else if (['BACK BASE', 'BACK FOOT', 'BACK FEET'].contains(type)) {
      this._cameraFocusPosX = 'BACK';
      this._cameraFocusPosY = 'BASE';
    } else if (['FRONT CENTER', 'FRONT MIDDLE', 'FRONT'].contains(type)) {
      this._cameraFocusPosX = 'FRONT';
      this._cameraFocusPosY = 'MIDDLE';
    } else if (['CENTER', 'MIDDLE'].contains(type)) {
      this._cameraFocusPosX = 'MIDDLE';
      this._cameraFocusPosY = 'MIDDLE';
    } else if (['BACK CENTER', 'BACK MIDDLE', 'BACK'].contains(type)) {
      this._cameraFocusPosX = 'BACK';
      this._cameraFocusPosY = 'MIDDLE';
    } else if (['FRONT HEAD', 'FRONT TOP'].contains(type)) {
      this._cameraFocusPosX = 'FRONT';
      this._cameraFocusPosY = 'TOP';
    } else if (['HEAD', 'TOP'].contains(type)) {
      this._cameraFocusPosX = 'MIDDLE';
      this._cameraFocusPosY = 'TOP';
    } else if (['BACK HEAD', 'BACK TOP'].contains(type)) {
      this._cameraFocusPosX = 'BACK';
      this._cameraFocusPosY = 'TOP';
    } else {
      this._cameraFocusPosX = 'MIDDLE';
      this._cameraFocusPosY = 'MIDDLE';
    }
    $gameScreen.setCameraDuration(frames)
    return true;
};

BattleManager.actionCameraOffset = function(actionArgs) {
    if (!ConfigManager.battleCamera) return true;
    var cmd = actionArgs[0].toUpperCase();
    if (['LEFT'].contains(cmd)) {
      this._cameraOffsetX = -1 * eval(actionArgs[1]) || 100;;
    } else if (['RIGHT'].contains(cmd)) {
      this._cameraOffsetX = eval(actionArgs[1]) || 100;;
    } else if (['UP'].contains(cmd)) {
      this._cameraOffsetY = -1 * eval(actionArgs[1]) || 100;;
    } else if (['DOWN'].contains(cmd)) {
      this._cameraOffsetY = eval(actionArgs[1]) || 100;;
    }
    return true;
};

BattleManager.actionCameraPan = function(actionArgs) {
    if (!ConfigManager.battleCamera) return true;
    var cmd = actionArgs[0].toUpperCase();
    var frames = 30;
    if (['LEFT'].contains(cmd)) {
      this._cameraX -= eval(actionArgs[1]) || 100;;
      frames = actionArgs[2] || 30;
    } else if (['RIGHT'].contains(cmd)) {
      this._cameraX += eval(actionArgs[1]) || 100;;
      frames = actionArgs[2] || 30;
    } else if (['UP'].contains(cmd)) {
      this._cameraY -= eval(actionArgs[1]) || 100;;
      frames = actionArgs[2] || 30;
    } else if (['DOWN'].contains(cmd)) {
      this._cameraY += eval(actionArgs[1]) || 100;;
      frames = actionArgs[2] || 30;
    }
    $gameScreen.setCameraDuration(frames)
    return true;
};

BattleManager.actionCameraScreen = function(actionArgs) {
    if (!ConfigManager.battleCamera) return true;
    var cmd = actionArgs[0].toUpperCase();
    var frames = 30;
    if (['TOP LEFT', 'UPPER LEFT'].contains(cmd)) {
      this._cameraX = 0;
      this._cameraY = 0;
      frames = actionArgs[1] || 30;
    } else if (['FAR LEFT', 'ABSOLUTE LEFT'].contains(cmd)) {
      this._cameraX = 0;
      this._cameraY = Graphics.boxHeight / 2;
      frames = actionArgs[1] || 30;
    } else if (['BOTTOM LEFT', 'LOWER LEFT'].contains(cmd)) {
      this._cameraX = 0;
      this._cameraY = Graphics.boxHeight;
      frames = actionArgs[1] || 30;
    } else if (['TOP CENTER', 'UPPER CENTER'].contains(cmd)) {
      this._cameraX = Graphics.boxWidth / 2;
      this._cameraY = 0;
      frames = actionArgs[1] || 30;
    } else if (['CENTER', 'MIDDLE'].contains(cmd)) {
      this._cameraX = Graphics.boxWidth / 2;
      this._cameraY = Graphics.boxHeight / 2;
      frames = actionArgs[1] || 30;
    } else if (['BOTTOM CENTER', 'LOWER CENTER'].contains(cmd)) {
      this._cameraX = Graphics.boxWidth / 2;
      this._cameraY = Graphics.boxHeight;
      frames = actionArgs[1] || 30;
    } else if (['TOP RIGHT', 'UPPER RIGHT'].contains(cmd)) {
      this._cameraX = Graphics.boxWidth;
      this._cameraY = 0;
      frames = actionArgs[1] || 30;
    } else if (['FAR RIGHT', 'ABSOLUTE RIGHT'].contains(cmd)) {
      this._cameraX = Graphics.boxWidth;
      this._cameraY = Graphics.boxHeight / 2;
      frames = actionArgs[1] || 30;
    } else if (['BOTTOM RIGHT', 'LOWER RIGHT'].contains(cmd)) {
      this._cameraX = Graphics.boxWidth;
      this._cameraY = Graphics.boxHeight;
      frames = actionArgs[1] || 30;
    } else if (['POINT', 'POSITION', 'COORDINATE', 'SCREEN', 'SCREEN POS',
    'COORDINATES'].contains(cmd)) {
      this._cameraX = eval(actionArgs[1]) || 0;
      this._cameraY = eval(actionArgs[2]) || 0;
      frames = actionArgs[3] || 30;
    } else {
      var targets = this.makeActionTargets(actionArgs[0]);
      if (targets.length < 1) return false;
      var type = actionArgs[1].toUpperCase();
      var frames = actionArgs[2] || 30;
      if (['FRONT BASE', 'FRONT FOOT', 'FRONT FEET',
      'FRONT'].contains(type)) {
        this._cameraX = this.targetPosX(targets, 'FRONT');
        this._cameraY = this.targetPosY(targets, 'BASE');
      } else if (['BASE', 'FOOT', 'FEET'].contains(type)) {
        this._cameraX = this.targetPosX(targets, 'MIDDLE');
        this._cameraY = this.targetPosY(targets, 'BASE');
      } else if (['BACK BASE', 'BACK FOOT', 'BACK FEET',
      'BACK'].contains(type)) {
        this._cameraX = this.targetPosX(targets, 'BACK');
        this._cameraY = this.targetPosY(targets, 'BASE');
      } else if (['FRONT CENTER', 'FRONT MIDDLE'].contains(type)) {
        this._cameraX = this.targetPosX(targets, 'FRONT');
        this._cameraY = this.targetPosY(targets, 'MIDDLE');
      } else if (['CENTER', 'MIDDLE'].contains(type)) {
        this._cameraX = this.targetPosX(targets, 'MIDDLE');
        this._cameraY = this.targetPosY(targets, 'MIDDLE');
      } else if (['BACK CENTER', 'BACK MIDDLE',].contains(type)) {
        this._cameraX = this.targetPosX(targets, 'BACK');
        this._cameraY = this.targetPosY(targets, 'MIDDLE');
      } else if (['FRONT HEAD', 'FRONT TOP'].contains(type)) {
        this._cameraX = this.targetPosX(targets, 'FRONT');
        this._cameraY = this.targetPosY(targets, 'TOP');
      } else if (['HEAD', 'TOP'].contains(type)) {
        this._cameraX = this.targetPosX(targets, 'MIDDLE');
        this._cameraY = this.targetPosY(targets, 'TOP');
      } else if (['BACK HEAD', 'BACK TOP'].contains(type)) {
        this._cameraX = this.targetPosX(targets, 'BACK');
        this._cameraY = this.targetPosY(targets, 'TOP');
      } else {
        return true;
      }
    }
    $gameScreen.setCameraDuration(frames)
    return true;
};

BattleManager.actionResetCamera = function(actionArgs) {
    var duration = parseInt(actionArgs[0]) || 30;
    this.resetCamera(duration);
    return true;
};

BattleManager.actionResetZoom = function(actionArgs) {
    var duration = parseInt(actionArgs[0]) || 30;
    $gameScreen.startBattleZoom(1, duration);
    return true;
};

BattleManager.actionWaitForCamera = function() {
    if (!ConfigManager.battleCamera) return true;
    this._logWindow.waitForCamera();
    return false;
};

BattleManager.actionWaitForZoom = function() {
    if (!ConfigManager.battleCamera) return true;
    this._logWindow.waitForZoom();
    return false;
};

BattleManager.actionZoom = function(actionArgs) {
    if (!ConfigManager.battleCamera) return true;
    if (actionArgs[0].match(/(\d+)([%％])/i)) {
      var scale = parseFloat(RegExp.$1 * 0.01) || 1.0;
    } else {
      var scale = parseFloat(actionArgs[0]) || 1.0;
    }
    var duration = parseInt(actionArgs[1]) || 30;
    $gameScreen.startBattleZoom(scale, duration);
    return true;
};

Yanfly.ASP3.BattleManager_setup = BattleManager.setup;
BattleManager.setup = function(troopId, canEscape, canLose) {
    this.resetCamera();
    this.actionResetZoom([1]);
    Yanfly.ASP3.BattleManager_setup.call(this, troopId, canEscape, canLose);
};

BattleManager.resetCamera = function(duration) {
    this._cameraX = Graphics.boxWidth / 2;
    this._cameraY = Graphics.boxHeight / 2;
    this._cameraOffsetX = 0;
    this._cameraOffsetY = 0;
    this._cameraFocusGroup = [];
    this._cameraFocusPosX = 'BASE';
    this._cameraFocusPosY = 'BASE';
    this._cameraClamp = true;
    $gameScreen.setCameraDuration(duration);
};

BattleManager.cameraClamp = function() {
    return this._cameraClamp;
};

BattleManager.cameraX = function() {
    if (this._cameraFocusGroup.length > 0) {
      var value = this.cameraFocusX();
    } else {
      var value = this._cameraX;
    }
    value += this._cameraOffsetX;
    return value;
};

BattleManager.cameraY = function() {
    if (this._cameraFocusGroup.length > 0) {
      var value = this.cameraFocusY();
    } else {
      var value = this._cameraY;
    }
    value += this._cameraOffsetY;
    return value;
};

BattleManager.cameraFocusX = function() {
    var i = this.targetPosX(this._cameraFocusGroup, this._cameraFocusPosX);
    return i;
};

BattleManager.cameraFocusY = function() {
    var i = this.targetPosY(this._cameraFocusGroup, this._cameraFocusPosY);
    return i;
};

BattleManager.targetPosX = function(group, position) {
    var value = 0;
    if (position === 'MIDDLE') {
      for (var i = 0; i < group.length; ++i) {
        var battler = group[i];
        if (!battler) continue;
        value += battler.cameraPosX();
      }
    } else if (position === 'FRONT') {
      for (var i = 0; i < group.length; ++i) {
        var battler = group[i];
        if (!battler) continue;
        if (battler.isActor()) var offset = -1 * battler.spriteWidth() / 2;
        if (battler.isEnemy()) var offset = battler.spriteWidth() / 2;
        value = Math.max(battler.cameraPosX() + offset, value);
      }
      value *= group.length;
    } else if (position === 'BACK') {
      value = Graphics.boxWidth;
      for (var i = 0; i < group.length; ++i) {
        var battler = group[i];
        if (!battler) continue;
        if (battler.isActor()) var offset = battler.spriteWidth() / 2;
        if (battler.isEnemy()) var offset = -1 * battler.spriteWidth() / 2;
        value = Math.min(battler.cameraPosX() + offset, value);
      }
      value *= group.length;
    }
    value /= group.length;
    return value;
};

BattleManager.targetPosY = function(group, position) {
    var value = 0;
    if (position === 'BASE') {
      for (var i = 0; i < group.length; ++i) {
        var battler = group[i];
        if (!battler) continue;
        value = Math.max(battler.cameraPosY(), value);
      }
      value *= group.length;
    } else if (position === 'MIDDLE') {
      for (var i = 0; i < group.length; ++i) {
        var battler = group[i];
        if (!battler) continue;
        value += battler.cameraPosY() - battler.spriteHeight() / 2;
      }
    } else if (position === 'TOP') {
      value = Graphics.boxHeight;
      for (var i = 0; i < group.length; ++i) {
        var battler = group[i];
        if (!battler) continue;
        value = Math.min(battler.cameraPosY() - battler.spriteHeight(), value);
      }
      value *= group.length;
    }
    value /= group.length;
    return value;
};

//=============================================================================
// Spriteset_Battle
//=============================================================================

Spriteset_Battle.prototype.updatePosition = function() {
    var zoom = $gameScreen.zoomScale();
    var clamp = BattleManager.cameraClamp();
    this.scale.x = zoom;
    this.scale.y = zoom;
    var screenX = -1 * $gameScreen.zoomX() * zoom + Graphics.boxWidth / 2;
    var screenY = -1 * $gameScreen.zoomY() * zoom + Graphics.boxHeight / 2;
    if (clamp && zoom >= 1.0) {
      var clampX1 = -Graphics.boxWidth * zoom + Graphics.boxWidth;
      var clampY2 = -Graphics.boxHeight * zoom + Graphics.boxHeight;
      this.x = Math.round(screenX.clamp(clampX1, 0));
      this.y = Math.round(screenY.clamp(clampY2, 0));
    } else if (clamp && zoom < 1.0) {
      this.x = Math.round((Graphics.boxWidth - Graphics.boxWidth * zoom) / 2);
      this.y = Math.round((Graphics.boxHeight - Graphics.boxHeight * zoom) / 2);
    } else {
      this.x = Math.round(screenX);
      this.y = Math.round(screenY);
    }
    this.x += Math.round($gameScreen.shake());
};

//=============================================================================
// Game_Battler
//=============================================================================

Game_Battler.prototype.cameraPosX = function() {
    var value = this.spritePosX();
    return value;
};

Game_Battler.prototype.cameraPosY = function() {
    var value = this.spritePosY();
    if (Imported.YEP_X_ActSeqPack2) {
      value -= this.battler().getFloatHeight() * this.spriteHeight();
      value -= this.battler().getJumpHeight() * this.spriteHeight();
    }
    return value;
};

//=============================================================================
// Game_Screen
//=============================================================================

Yanfly.ASP3.Game_Screen_clearZoom = Game_Screen.prototype.clearZoom;
Game_Screen.prototype.clearZoom = function() {
    Yanfly.ASP3.Game_Screen_clearZoom.call(this);
    this._cameraDuration = 0;
};

Yanfly.ASP3.Game_Screen_update = Game_Screen.prototype.update;
Game_Screen.prototype.update = function() {
    Yanfly.ASP3.Game_Screen_update.call(this);
    this.updateBattleCamera();
};

Game_Screen.prototype.startBattleZoom = function(scale, duration) {
    this._zoomScaleTarget = scale;
    this._zoomDuration = duration;
};

Game_Screen.prototype.isZooming = function() {
    return this._zoomDuration > 0;
};

Game_Screen.prototype.setCameraDuration = function(duration) {
    this._cameraDuration = duration;
};

Game_Screen.prototype.updateBattleCamera = function() {
    if (!$gameParty.inBattle()) return;
    if (this._cameraDuration > 0) {
      var d = this._cameraDuration;
      var tx = BattleManager.cameraX();
      var ty = BattleManager.cameraY();
      this._zoomX = (this._zoomX * (d - 1) + tx) / d;
      this._zoomY = (this._zoomY * (d - 1) + ty) / d;
      this._cameraDuration--;
    } else {
      this._zoomX = BattleManager.cameraX();
      this._zoomY = BattleManager.cameraY();
    }
};

Game_Screen.prototype.isBattleCameraPanning = function() {
    if ($gameParty.inBattle()) return this._cameraDuration > 0;
    return false;
};

//=============================================================================
// ConfigManager
//=============================================================================

ConfigManager.battleCamera = true;

Yanfly.ASP3.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
    var config = Yanfly.ASP3.ConfigManager_makeData.call(this);
    config.battleCamera = this.battleCamera;
    return config;
};

Yanfly.ASP3.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
    Yanfly.ASP3.ConfigManager_applyData.call(this, config);
    this.battleCamera = this.readConfigBattleCamera(config, 'battleCamera');
};

ConfigManager.readConfigBattleCamera = function(config, name) {
    var value = config[name];
    if (value !== undefined) {
        return value;
    } else {
        return true;
    }
};

//=============================================================================
// Window_Options
//=============================================================================

Yanfly.ASP3.Window_Options_addGeneralOptions =
    Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function() {
    Yanfly.ASP3.Window_Options_addGeneralOptions.call(this);
    if (!Imported.YEP_OptionsCore) {
      this.addCommand(Yanfly.Param.ASP3CameraOption, 'battleCamera');
    }
};

//=============================================================================
// Window_BattleLog
//=============================================================================

Yanfly.ASP3.Window_BattleLog_updateWaitMode =
    Window_BattleLog.prototype.updateWaitMode;
Window_BattleLog.prototype.updateWaitMode = function() {
    if (this._waitMode === 'camera') {
      if ($gameScreen.isBattleCameraPanning()) return true;
    } else if (this._waitMode === 'zoom') {
      if ($gameScreen.isZooming()) return true;
    }
    return Yanfly.ASP3.Window_BattleLog_updateWaitMode.call(this);
};

Window_BattleLog.prototype.waitForCamera = function() {
    this.setWaitMode('camera');
};

Window_BattleLog.prototype.waitForZoom = function() {
    this.setWaitMode('zoom');
};

//=============================================================================
// Scene_Map
//=============================================================================

Yanfly.ASP3.Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
    Yanfly.ASP3.Scene_Map_onMapLoaded.call(this);
    $gameScreen.clearZoom();
};

//=============================================================================
// End of File
//=============================================================================
};
