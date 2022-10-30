//=============================================================================
// Yanfly Engine Plugins - Battle Engine Extension - Action Sequence Pack 2
// YEP_X_ActSeqPack2.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_ActSeqPack2 = true;

var Yanfly = Yanfly || {};
Yanfly.ASP2 = Yanfly.ASP2 || {};
Yanfly.ASP2.version = 1.12;

//=============================================================================
 /*:
 * @plugindesc v1.12 (Requires YEP_BattleEngineCore.js) Visual functions
 * are added to the Battle Engine Core's action sequences.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Action Sequence Pack 2 plugin is an extension plugin for Yanfly Engine
 * Plugins' Battle Engine Core. This extension plugin will not work without the
 * main plugin.
 *
 * This extension plugin contains the more basic functions used for customized
 * action sequences on a visual scale. This plugin focuses on making battlers
 * perform visual actions.
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
 * ATTACK ANIMATION: target, (mirror)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Displays the active battler's attack animation on the target(s). This will
 * be the animation determined by the actor's weapon(s). If it's an enemy, it
 * will be determined by the enemy's attack animation. If 'mirror' is used,
 * the animation will be flipped.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: attack animation: target
 *=============================================================================
 *
 *=============================================================================
 * ENEMY EFFECT: target, effect-type
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This affects enemies only. Makes the target display either a 'whiten' effect
 * or a 'blink' effect.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: enemy effect: targets, whiten
 *                enemy effect: targets, blink
 *=============================================================================
 *
 *=============================================================================
 * FACE target: args
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * FACE target1: FORWARD
 * FACE target1: BACKWARD
 * FACE target1: HOME
 * FACE target1: AWAY FROM HOME
 * FACE target1: POINT, x coordinate, y coordinate
 * FACE target1: AWAY FROM POINT, x coordinate, y coordinate
 * FACE target1: target2
 * FACE target1: AWAY FROM target2
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This will cause the battler to face a certain direction. Arguments can be
 * used in the above formats. This action sequence command will cause target1
 * to face any of those directions. If target2 is used, then target1 will face
 * directions relative to target2.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: face user: forward
 *                face target: backward
 *                face enemies: home
 *                face allies: away from home
 *                face target: point, 20, 40
 *                face target: away from point, 500, 600
 *                face user: target
 *                face target: away from user
 *=============================================================================
 *
 *=============================================================================
 * FADE OUT: (frames)
 * FADE IN: (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Fades the screen out and fades the screen in respectively. You can set the
 * amount of frames for the fading process. If you omit frames, 60 frames will
 * be used by default.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: fade out
 *                fade in: 10
 *=============================================================================
 *
 *=============================================================================
 * FLASH SCREEN: args
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * FLASH SCREEN: WHITE, (frames)
 * FLASH SCREEN: RED, (frames)
 * FLASH SCREEN: ORANGE, (frames)
 * FLASH SCREEN: YELLOW, (frames)
 * FLASH SCREEN: GREEN, (frames)
 * FLASH SCREEN: BLUE, (frames)
 * FLASH SCREEN: PURPLE, (frames)
 * FLASH SCREEN: MAGENTA, (frames)
 * FLASH SCREEN: BLACK, (frames)
 * FLASH SCREEN: (red), (green), (blue), (intensity), (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Causes the game screen to flash a set color. If for the arguments, you use a
 * color name, it will use a premade flash setting. If you choose to use your
 * own settings, use the red, green, blue, intensity format to determine what
 * color flash you would like. Red, green, blue, and intensity settings range
 * from 0 to 255. If frames are used, that will be the duration of the screen
 * flash. If omitted, the default frame count will be 60 frames.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: flash screen: white
 *                flash screen: red, 45
 *                flash screen: 128, 170, 214, 170
 *                flash screen: 68, 68, 68, 170, 45
 *=============================================================================
 *
 *=============================================================================
 * FLOAT target: (height), (frames)
 * FLOAT target: (height%), (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Causes the target to float into the air above the ground by height%. The
 * height is relative to the floating target. Using 100% means the target will
 * float above the ground 100% higher than its height. If no '%' sign is used,
 * the target will float that many pixels rather than a percentage of the
 * target's height. The frames determine how many frames it will take for the
 * target to reach that height. Using 0% for the height will bring the target
 * back to the ground.
 * Note: Floating only works with Sideview.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: float user: 200%
 *                float enemies: 500, 30
 *                float target: 0%, 30
 *=============================================================================
 *
 *=============================================================================
 * HIDE BATTLE HUD
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Hides the battle hud to not obstruct any animations being played. You
 * can reveal the battle hud again using 'show battle hud'.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: hide battle hud
 *=============================================================================
 *
 *=============================================================================
 * JUMP target: (height), (frames)
 * JUMP target: (height%), (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Causes the target to jump a height relative to the target itself. If the
 * target jumps a height of 200%, the height will be 200% of the target's
 * height. If no '%' sign is used, the target will jump that many pixels rather
 * than a percentage of the target's height. The frame count is how long the
 * target will be in the air. You can use this with the 'Move' action sequence
 * to make the target appear like it is jumping a distance.
 * Note: Jumping only works with Sideview.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: jump user: 150%
 *                jump target: 300, 60
 *=============================================================================
 *
 *=============================================================================
 * MOTION type: target, (no weapon)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * MOTION WALK: target
 * MOTION STANDBY: target
 * MOTION CHANT: target
 * MOTION GUARD: target
 * MOTION DAMAGE: target
 * MOTION EVADE: target
 * MOTION ATTACK: target
 * MOTION THRUST: target
 * MOTION SWING: target
 * MOTION MISSILE: target
 * MOTION SKILL: target
 * MOTION SPELL: target
 * MOTION ITEM: target
 * MOTION ESCAPE: target
 * MOTION VICTORY: target
 * MOTION DYING: target
 * MOTION ABNORMAL: target
 * MOTION SLEEP: target
 * MOTION DEAD: target
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Forces the target to perform the specific type of action in sideview. If you
 * issue an action sequence command for the target to perform 'attack', the
 * target will automatically determine based on the weapon it has equipped to
 * use either a thrust, swing, or missile motion. Attack, thrust, swing, and
 * missile will also display the target's weapon if the target has one.
 *
 * If 'no weapon' is used after the target, no weapons will be displayed. This
 * effect will only work with the Thrust, Swing, and Missile motions.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: motion walk: user
 *                motion thrust: user, no weapon
 *=============================================================================
 *
 *=============================================================================
 * MOVE target: args
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * MOVE target1: HOME, (frames)
 * MOVE target1: RETURN, (frames)
 * MOVE target1: FORWARD, (distance), (frames)
 * MOVE target1: BACKWARD, (distance), (frames)
 * MOVE target1: POINT, x coordinate, y coordinate, (frames)
 * MOVE target1: target2, BASE, (frames), (offset)
 * MOVE target1: target2, CENTER, (frames), (offset)
 * MOVE target1: target2, HEAD, (frames), (offset)
 * MOVE target1: target2, FRONT BASE, (frames), (offset)
 * MOVE target1: target2, FRONT CENTER, (frames), (offset)
 * MOVE target1: target2, FRONT HEAD, (frames), (offset)
 * MOVE target1: target2, BACK BASE, (frames), (offset)
 * MOVE target1: target2, BACK CENTER, (frames), (offset)
 * MOVE target1: target2, BACK HEAD, (frames), (offset)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This is a move command. Arguments can be used in the above formats. This
 * action sequence command will move target1 to any of those locations listed
 * in the arguments. If it's towards target2, you must include what location
 * relative to target2 for target1 to travel to.
 * Note: Moving only works with Sideview.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * You may be curious about the optional (offset) argument there for some of
 * the entries. You can insert any of the below arguments in place of (offset):
 *
 *   offset x +100
 *   offset x -200
 *   offset y +300
 *   offset y -400
 *
 * This will allow you to offset the distance to the destination by a flat
 * amount. Positive numbers would indicate forward while negative numbers will
 * indicate backward.
 *
 *   auto offset x +500
 *   auto offset x -600
 *
 * However, if you use either of the above, depending on if the user is an
 * actor or enemy and depending on the target (if there is one) is an actor or
 * an enemy, it will move them into position accordingly.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: move user: home, 20
 *                move target: forward, 48, 12
 *                move enemy 1: point, 400, 300
 *                move enemy 2: point, 500, 250, offset x -50, offset y -50
 *                move actor 3: target, front base, 20
 *                move user: target, front base, 20, auto offset x -100
 *=============================================================================
 *
 *=============================================================================
 * OPACITY target: x, (frames)
 * OPACITY target: x%, (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Changes the opacity of the target to x (0-255) or x% (0% to 100%). If you
 * use 'frames', that will be the frame duration for the change in opacity for
 * the target.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: opacity user: 50%, 30
 *                opacity not focus: 0
 *=============================================================================
 *
 *=============================================================================
 * SHOW BATTLE HUD
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If the battle hud was hidden using 'hide battle hud', use this to show the
 * battle hud back within the player's screen.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: show battle hud
 *=============================================================================
 *
 *=============================================================================
 * SHAKE SCREEN: (power), (speed), (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Causes the game screen to shake. Adjust the power from 0-9, speed from 0-9,
 * and the frames to alter the duration of the screen shaking. If those values
 * are omitted, they will default to 5 power, 5 speed, and 60 frames.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: shake screen
 *                shake screen: 9
 *                shake screen: 3, 9, 30
 *=============================================================================
 *
 *=============================================================================
 * TINT SCREEN: args
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * TINT SCREEN: NORMAL, (frames)
 * TINT SCREEN: DARK, (frames)
 * TINT SCREEN: SEPIA, (frames)
 * TINT SCREEN: SUNSET, (frames)
 * TINT SCREEN: NIGHT, (frames)
 * TINT SCREEN: (red), (green), (blue), (gray), (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Tints the battle screen. If using the arguments 'normal', 'dark', 'sepia',
 * 'sunset', or 'night' the screen will be be given a premade tint. If not,
 * then the arguments for red, green, blue, and gray values must be inputted
 * for the tint. Red, green, and blue can range from -255 to 255 while gray
 * will range from 0 to 255. If frames are used, that will be the duration for
 * which the screen will change to the tint. If omitted, the default amount of
 * frames used will be 60 frames.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: tint screen: normal
 *                tint screen: sepia, 30
 *                tint screen: 68, -34, -34, 0
 *                tint screen: 68, -68, 0, 68, 45
 *=============================================================================
 *
 *=============================================================================
 * WAIT FOR FLOAT
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Waits for all battler float changes to finish before going on to the next
 * action in the action sequence.
 * Note: Floating only works with Sideview.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: wait for float
 *=============================================================================
 *
 *=============================================================================
 * WAIT FOR JUMP
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Waits for all battler jumps to finish before going on to the next action
 * in the action sequence.
 * Note: Jumping only works with Sideview.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: wait for jump
 *=============================================================================
 *
 *=============================================================================
 * WAIT FOR OPACITY
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Waits for all battlers to finish changing opacity before going on to the
 * next action in the action sequence.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: wait for opacity
 *=============================================================================
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.12:
 * - Updated for RPG Maker MV version 1.5.0.
 * - Added new Offset X, Offset Y, arguments for the Move action sequence.
 *   Check the helpfile for more information.
 *
 * Version 1.11:
 * - Fixed a bug that caused enemies to not mirror the attack animation.
 *
 * Version 1.10a:
 * - Fixed a bug that caused scaled enemies to have their state icons and
 * overlays appear in odd places.
 * - Documentation update for Move, Float, and Jump related action sequences as
 * they only work in Sideview.
 *
 * Version 1.09:
 * - Animations played on a floating or jumping battlers 'Feet' location will
 * now be played at the base of the battler regardless of how high the battler
 * is floating. This is to provide a more consistent animation image.
 *
 * Version 1.08a:
 * - State Icon and State Overlays will now synch together for floating and
 * jumping battlers.
 *
 * Version 1.07c:
 * - Synchronized battle animations to floating and jumping battlers.
 * 
 * Version 1.06:
 * - Updated weapon motions for YEP_X_AnimatedSVEnemies to work with sideview
 * enemies.
 *
 * Version 1.05:
 * - Creating compatibility for a future plugin.
 *
 * Version 1.04a:
 * - Rewrote and updated movement formulas.
 *
 * Version 1.03:
 * - Made a change to Motion action sequence. 'Wait' is now substituted for
 * 'Standby' as to not confuse it with the actual Motion Wait action sequence.
 * - Added a 'no weapon' option to Motion action sequences. This new tag will
 * only affect the 'Thrust', 'Swing', and 'Missile' motions.
 *
 * Version 1.02:
 * - Added a check for motion attack to differentiate between actor and enemy.
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
// Parameters
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_ActSeqPack2');
Yanfly.Param = Yanfly.Param || {};

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.ASP2.BattleManager_processActionSequence =
  BattleManager.processActionSequence;
BattleManager.processActionSequence = function(actionName, actionArgs) {
  // ATTACK ANIMATION
  if (actionName === 'ATTACK ANIMATION') {
    return this.actionAttackAnimation(actionArgs);
  }
  // ENEMY EFFECT
  if (actionName === 'ENEMY EFFECT') {
    return this.actionEnemyEffect(actionArgs);
  }
  // FACE TARGET
  if (actionName.match(/FACE[ ](.*)/i)) {
    var string = String(RegExp.$1);
    if (this.makeActionTargets(string).length > 0) {
      return this.actionFace(string, actionArgs);
    }
  }
  // FADE IN, FADE OUT
  if (['FADE IN', 'FADE OUT'].contains(actionName)) {
    return this.actionFadeScreen(actionName, actionArgs);
  }
  // FLASH SCREEN
  if (actionName === 'FLASH SCREEN') {
    return this.actionFlashScreen(actionArgs);
  }
  // FLOAT TARGET
  if (actionName.match(/FLOAT[ ](.*)/i)) {
    var string = String(RegExp.$1);
    if (this.makeActionTargets(string).length > 0) {
      return this.actionFloat(string, actionArgs);
    }
  }
  // HIDE BATTLE HUD, SHOW BATTLE HUD
  if (['HIDE BATTLE HUD', 'SHOW BATTLE HUD'].contains(actionName)) {
    return this.actionBattleHud(actionName);
  }
  // JUMP TARGET
  if (actionName.match(/JUMP[ ](.*)/i)) {
    var string = String(RegExp.$1);
    if (this.makeActionTargets(string).length > 0) {
      return this.actionJump(string, actionArgs);
    }
  }
  // MOTION TYPE
  if (actionName.match(/MOTION[ ](.*)/i)) {
    return this.actionMotionTarget(String(RegExp.$1), actionArgs);
  }
  // MOVE TARGET
  if (actionName.match(/MOVE[ ](.*)/i)) {
    var string = String(RegExp.$1);
    if (this.makeActionTargets(string).length > 0) {
      return this.actionMove(string, actionArgs);
    }
  }
  // OPACITY TARGET
  if (actionName.match(/OPACITY[ ](.*)/i)) {
    var string = String(RegExp.$1);
    if (this.makeActionTargets(string).length > 0) {
      return this.actionOpacity(string, actionArgs);
    }
  }
  // SHAKE SCREEN
  if (actionName === 'SHAKE SCREEN') {
    return this.actionShakeScreen(actionArgs);
  }
  // TINT SCREEN
  if (actionName === 'TINT SCREEN') {
    return this.actionTintScreen(actionArgs);
  }
  // WAIT FOR FLOAT
  if (actionName === 'WAIT FOR FLOAT') {
    return this.actionWaitForFloat();
  }
  // WAIT FOR JUMP
  if (actionName === 'WAIT FOR JUMP') {
    return this.actionWaitForJump();
  }
  // WAIT FOR OPACITY
  if (actionName === 'WAIT FOR OPACITY') {
    return this.actionWaitForOpacity();
  }
  return Yanfly.ASP2.BattleManager_processActionSequence.call(this,
    actionName, actionArgs);
};

BattleManager.actionAttackAnimation = function(actionArgs) {
  var targets = this.makeActionTargets(actionArgs[0]);
  var mirror = false;
  if (actionArgs[1] && actionArgs[1].toUpperCase() === 'MIRROR') mirror = true;
  if (mirror) {
    this._logWindow.showActorAtkAniMirror(this._subject,
      targets.filter(Yanfly.Util.onlyUnique));
  } else {
    this._logWindow.showAttackAnimation(this._subject,
      targets.filter(Yanfly.Util.onlyUnique));
  }
  return true;
};

BattleManager.actionBattleHud = function(actionName) {
  if (actionName === 'HIDE BATTLE HUD') {
    this._windowLayer.x = Graphics.boxWidth * 495;
  } else if (actionName === 'SHOW BATTLE HUD') {
    this._windowLayer.x = 0;
  }
  return false;
}

BattleManager.actionEnemyEffect = function(actionArgs) {
    var targets = this.makeActionTargets(actionArgs[0]);
    if (targets.length < 1) return true;
    if (actionArgs[1].toUpperCase() === 'WHITEN') {
      targets.forEach(function(target) {
        if (target.isEnemy()) target.requestEffect('whiten');
      });
    } else if (actionArgs[1].toUpperCase() === 'BLINK') {
      targets.forEach(function(target) {
        if (target.isEnemy()) target.requestEffect('blink');
      });
    }
    return true;
};

BattleManager.actionFace = function(name, actionArgs) {
    var movers = this.makeActionTargets(name);
    if (movers.length < 1) return true;
    var cmd = actionArgs[0].toUpperCase();
    if (['FORWARD', 'NORMAL'].contains(cmd)) {
      movers.forEach(function(mover) {
        mover.spriteFaceForward();
      });
    } else if (['BACKWARD', 'MIRROR'].contains(cmd)) {
      movers.forEach(function(mover) {
        mover.spriteFaceBackward();
      });
    } else if (['HOME', 'ORIGIN'].contains(cmd)) {
      movers.forEach(function(mover) {
        mover.spriteFaceHome();
      });
    } else if (['AWAY FROM HOME', 'AWAY FROM ORIGIN'].contains(cmd)) {
      movers.forEach(function(mover) {
        mover.spriteFaceAwayHome();
      });
    } else if (['POINT', 'POSITION', 'COORDINATE', 'SCREEN', 'SCREEN POS',
    'COORDINATES'].contains(cmd)) {
      var destX = eval(actionArgs[1]) || 0;
      var destY = eval(actionArgs[2]) || 0;
      movers.forEach(function(mover) {
        mover.spriteFacePoint(destX, destY);
      });
    } else if (['AWAY FROM POINT', 'AWAY FROM POSITION', 'AWAY FROM COORDINATE',
    'AWAY FROM SCREEN', 'AWAY FROM SCREEN POS',
    'AWAY FROM COORDINATES'].contains(cmd)) {
      var destX = eval(actionArgs[1]) || 0;
      var destY = eval(actionArgs[2]) || 0;
      movers.forEach(function(mover) {
        mover.spriteFaceAwayPoint(destX, destY);
      });
    } else if (cmd.match(/AWAY[ ]FROM[ ](.*)/i)) {
      var targets = this.makeActionTargets(String(RegExp.$1));
      if (targets.length < 1) return false;
      var destX = 0;
      var destY = 0;
      targets.forEach(function(target) {
        destX += target.spritePosX();
        destY += target.spritePosY();
      }, this);
      destX /= targets.length;
      destY /= targets.length;
      movers.forEach(function(mover) {
        mover.spriteFaceAwayPoint(destX, destY);
      }, this);
    } else {
      var targets = this.makeActionTargets(actionArgs[0]);
      if (targets.length < 1) return false;
      var destX = 0;
      var destY = 0;
      targets.forEach(function(target) {
        destX += target.spritePosX();
        destY += target.spritePosY();
      }, this);
      destX /= targets.length;
      destY /= targets.length;
      movers.forEach(function(mover) {
        mover.spriteFacePoint(destX, destY);
      }, this);
    }
    return false;
};

BattleManager.actionFadeScreen = function(actionName, actionArgs) {
  var frames = actionArgs[0] || 60;
  if (actionName === 'FADE IN') {
    $gameScreen.startFadeIn(frames);
  } else if (actionName === 'FADE OUT') {
    $gameScreen.startFadeOut(frames);
  }
  return false;
};

BattleManager.actionFlashScreen = function(actionArgs) {
    if (actionArgs[0].toUpperCase() === 'WHITE') {
      var flash = [255, 255, 255, 255];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'RED') {
      var flash = [255, 0, 0, 255];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'ORANGE') {
      var flash = [255, 128, 0, 255];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'YELLOW') {
      var flash = [255, 255, 0, 255];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'GREEN') {
      var flash = [0, 255, 0, 255];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'BLUE') {
      var flash = [0, 128, 255, 255];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'PURPLE') {
      var flash = [128, 64, 255, 255];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'MAGENTA') {
      var flash = [255, 0, 255, 255];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'BLACK') {
      var flash = [0, 0, 0, 255];
      var frames = actionArgs[1] || 60;
    } else {
      var red = actionArgs[0] || 0;
      var green = actionArgs[1] || 0;
      var blue = actionArgs[2] || 0;
      var intensity = actionArgs[3] || 0;
      var frames = actionArgs[4] || 60;
      var flash = [parseInt(red), parseInt(green),
          parseInt(blue), parseInt(intensity)];
    }
    $gameScreen.startFlash(flash, frames);
    return false;
};

BattleManager.actionFloat = function(name, actionArgs) {
    var movers = this.makeActionTargets(name);
    if (movers.length < 1) return true;
    var cmd = actionArgs[0];
    var frames = actionArgs[1] || 12;
    var pixels = 0;
    if (cmd.match(/(\d+)([%％])/i)) {
      var floatPeak = parseFloat(RegExp.$1 * 0.01);
    } else if (cmd.match(/(\d+)/i)) {
      pixels = parseInt(RegExp.$1);
      var floatPeak = 0.0;
    } else {
      var floatPeak = 1.0;
    }
    movers.forEach(function(mover) {
      var floatRate = floatPeak + (pixels / mover.spriteHeight());
      mover.spriteFloat(floatRate, frames);
    });
    return false;
};

BattleManager.actionJump = function(name, actionArgs) {
    var movers = this.makeActionTargets(name);
    if (movers.length < 1) return true;
    var cmd = actionArgs[0];
    var frames = actionArgs[1] || 12;
    var pixels = 0;
    if (cmd.match(/(\d+)([%％])/i)) {
      var jumpPeak = parseFloat(RegExp.$1 * 0.01);
    } else if (cmd.match(/(\d+)/i)) {
      pixels = parseInt(RegExp.$1);
      var jumpPeak = 0.0;
    } else {
      var jumpPeak = 1.0;
    }
    movers.forEach(function(mover) {
      var jumpRate = jumpPeak + (pixels / mover.spriteHeight());
      mover.spriteJump(jumpRate, frames);
    });
    return true;
};

BattleManager.actionMotionTarget = function(name, actionArgs) {
    if (name.toUpperCase() === 'WAIT') return this.actionMotionWait(actionArgs);
    if (name.toUpperCase() === 'STANDBY') name = 'WAIT';
    var movers = this.makeActionTargets(actionArgs[0]);
    if (movers.length < 1) return true;
    var cmd = name.toLowerCase();
    var motion = 'wait';
    if (actionArgs[1] && actionArgs[1].toUpperCase() === 'NO WEAPON') {
      var showWeapon = false;
    } else {
      var showWeapon = true;
    }
    if (['wait', 'chant', 'guard', 'evade', 'skill', 'spell', 'item', 'escape',
    'victory', 'dying', 'abnormal', 'sleep', 'dead'].contains(cmd)) {
      motion = cmd;
    } else if (['walk', 'move'].contains(cmd)) {
      motion = 'walk';
    } else if (['damage', 'hit'].contains(cmd)) {
      motion = 'damage';
    } else if (['attack'].contains(cmd)) {
      movers.forEach(function(mover) {
        mover.performAttack();
      });
      return false;
    } else if (['randattack'].contains(cmd)) {
      var motions = ['thrust', 'swing', 'missile'];
      movers.forEach(function(mover) {
        var motion = motions[Math.floor(Math.random() * motions.length)];
        mover.forceMotion(motion);
      });
      return false;
    } else if (['thrust', 'swing', 'missile'].contains(cmd)) {
      motion = cmd;
      movers.forEach(function(mover) {
        mover.forceMotion(motion);
        if (mover.isActor() && showWeapon) {
          var weapons = mover.weapons();
          var wtypeId = weapons[0] ? weapons[0].wtypeId : 0;
          var attackMotion = $dataSystem.attackMotions[wtypeId];
          if (attackMotion && [0, 1, 2].contains(attackMotion.type)) {
            mover.startWeaponAnimation(attackMotion.weaponImageId);
          }
        }
        if (Imported.YEP_X_AnimatedSVEnemies) {
          if (mover.isEnemy() && mover.hasSVBattler() && showWeapon) {
            var attackMotion = $dataSystem.attackMotions[wtypeId];
            mover.startWeaponAnimation(mover.weaponImageId());
          }
        }
      });
      return false;
    }
    movers.forEach(function(mover) {
      mover.forceMotion(motion);
    });
    return false;
};

BattleManager.actionMove = function(name, actionArgs) {
    if (!$gameSystem.isSideView()) return true;
    var movers = this.makeActionTargets(name);
    if (movers.length < 1) return true;
    var cmd = actionArgs[0].toUpperCase();
    if (['HOME', 'ORIGIN'].contains(cmd)) {
      var frames = actionArgs[1] || 12;
      movers.forEach(function(mover) {
        mover.battler().startMove(0, 0, frames);
        mover.requestMotion('walk');
        mover.spriteFaceHome();
      });
    } else if (['RETURN'].contains(cmd)) {
      var frames = actionArgs[1] || 12;
      movers.forEach(function(mover) {
        mover.battler().startMove(0, 0, frames);
        mover.requestMotion('evade');
        mover.spriteFaceForward();
      });
    } else if (['FORWARD', 'FORWARDS', 'BACKWARD',
    'BACKWARDS'].contains(cmd)) {
      var distance = actionArgs[1] || Yanfly.Param.BECStepDist;
      if (['BACKWARD', 'BACKWARDS'].contains(cmd)) distance *= -1;
      var frames = actionArgs[2] || 12;
      movers.forEach(function(mover) {
        mover.battler().moveForward(distance, frames);
        mover.requestMotion('walk');
        if (['FORWARD', 'FORWARDS'].contains(cmd)) {
          mover.spriteFaceForward();
        } else {
          mover.spriteFaceBackward();
        }
      });
    } else if (['POINT', 'POSITION', 'COORDINATE', 'SCREEN', 'SCREEN POS',
    'COORDINATES'].contains(cmd)) {
      var destX = eval(actionArgs[1]) || 0;
      var destY = eval(actionArgs[2]) || 0;
      var frames = actionArgs[3] || 12;
      movers.forEach(function(mover) {
        var offsetX = BattleManager.actionMoveOffsetX(actionArgs, mover, mover);
        var offsetY = BattleManager.actionMoveOffsetY(actionArgs, mover, mover);
        mover.battler().moveToPoint(destX + offsetX, destY + offsetY, frames);
        mover.requestMotion('walk');
        mover.spriteFacePoint(destX, destY);
      });
    } else {
      var targets = this.makeActionTargets(actionArgs[0]);
      var frames = actionArgs[2] || 12;
      var type = actionArgs[1].toUpperCase();
      if (targets.length < 1) return false;
      for (var i = 0; i < movers.length; ++i) {
      	var mover = movers[i];
      	if (!mover) continue;
      	if (['BASE', 'FOOT', 'FEET'].contains(type)) {
	        var destX = this.actionMoveX(mover, targets, 'center');
	        var destY = this.actionMoveY(mover, targets, 'foot');
	      } else if (['CENTER', 'MIDDLE'].contains(type)) {
	        var destX = this.actionMoveX(mover, targets, 'center');
	        var destY = this.actionMoveY(mover, targets, 'center');
	      } else if (['HEAD', 'TOP'].contains(type)) {
	        var destX = this.actionMoveX(mover, targets, 'center');
	        var destY = this.actionMoveY(mover, targets, 'head');
	      } else if (['FRONT BASE', 'FRONT FOOT', 'FRONT FEET',
	      'FRONT'].contains(type)) {
	        var destX = this.actionMoveX(mover, targets, 'front');
	        var destY = this.actionMoveY(mover, targets, 'foot');
	      } else if (['BACK BASE', 'BACK FOOT', 'BACK FEET',
	      'BACK'].contains(type)) {
	      	var destX = this.actionMoveX(mover, targets, 'back');
	        var destY = this.actionMoveY(mover, targets, 'foot');
	      } else if (['FRONT CENTER', 'FRONT MIDDLE'].contains(type)) {
	        var destX = this.actionMoveX(mover, targets, 'front');
	        var destY = this.actionMoveY(mover, targets, 'center');
	      } else if (['BACK CENTER', 'BACK MIDDLE',].contains(type)) {
	        var destX = this.actionMoveX(mover, targets, 'back');
	        var destY = this.actionMoveY(mover, targets, 'center');
	      } else if (['FRONT HEAD', 'FRONT TOP'].contains(type)) {
	        var destX = this.actionMoveX(mover, targets, 'front');
	        var destY = this.actionMoveY(mover, targets, 'head');
	      } else if (['BACK HEAD', 'BACK TOP'].contains(type)) {
	        var destX = this.actionMoveX(mover, targets, 'back');
	        var destY = this.actionMoveY(mover, targets, 'head');
	      }
        var offsetX = this.actionMoveOffsetX(actionArgs, mover, targets[0]);
        var offsetY = this.actionMoveOffsetY(actionArgs, mover, targets[0]);
	      mover.battler().moveToPoint(destX + offsetX, destY + offsetY, frames);
        mover.spriteFacePoint(destX, destY);
      }
    }
    return true;
};

BattleManager.actionMoveX = function(mover, targets, value) {
		value = this.actionMoveXLocation(mover, targets, value);
		var max = targets.length;
		var moverWidth = mover.spriteWidth();
		if (value === 'center') {
			var destX = null;
		} else {
			var destX = (value === 'left') ? Graphics.boxWidth : 0;
		}
		for (var i = 0; i < max; ++i) {
			var target = targets[i];
			if (!target) continue;
			var targetWidth = target.spriteWidth();
			var point = target.spritePosX();
			if (value === 'center') {
				destX = (destX === null) ? 0 : destX;
				destX += point;
			} else if (value === 'left') {
				point -= targetWidth / 2;
				point -= (mover.isActor() ? 1 : 1) * moverWidth / 2;
				destX = Math.min(point, destX);
			} else {
				point += targetWidth / 2;
				point += (mover.isActor() ? 1 : 1) * moverWidth / 2;
				destX = Math.max(point, destX);
			}
		}
		if (value === 'center') destX /= max;
		return destX;
};

BattleManager.actionMoveXLocation = function(mover, targets, value) {
		if (value === 'center') return 'center';
		var actors = 0;
		var enemies = 0;
		var max = targets.length;
		for (var i = 0; i < max; ++i) {
			var target = targets[i];
			if (!target) continue;
			if (target.isActor()) actors += 1;
			if (target.isEnemy()) enemies += 1;
		}
		if (actors > 0 && enemies === 0) {
			return (value === 'front') ? 'left' : 'right';
		} else if (actors === 0 && enemies > 0) {
			return (value === 'front') ? 'right' : 'left';
		} else {
			if (mover.isActor()) {
				return (value === 'front') ? 'right' : 'left';
			} else { // enemy
				return (value === 'front') ? 'left' : 'right';
			}
		}
		return 'center';
};

BattleManager.actionMoveY = function(mover, targets, value) {
		var max = targets.length;
		var destY = 0;
		var point = (value === 'head') ? Graphics.boxHeight : 0;
		for (var i = 0; i < max; ++i) {
			var target = targets[i];
			if (!target) continue;
			if (value === 'head') {
				point = Math.min(target.spritePosY() - target.spriteHeight(), point);
			} else if (value === 'center') {
				point += target.spritePosY() - target.spriteHeight() / 2;
			} else { // foot
				point = Math.max(target.spritePosY(), point);
			}
		}
		destY = (value === 'center') ? point / max : point;
		return destY;
};

BattleManager.actionMoveOffsetX = function(actionArgs, user, target) {
  if (actionArgs && actionArgs.length > 0) {
    var length = actionArgs.length;
    for (var i = 0; i < length; ++i) {
      var line = actionArgs[i];
      if (line.match(/AUTO OFFSET X[ ]([\+\-]\d+)/i)) {
        var value = parseInt(RegExp.$1);
        if (user.isActor() && !target) {
          return value * -1;
        } else if (user.isEnemy() && !target) {
          return value;
        } else if (user.isActor() && target.isActor()) {
          return value;
        } else if (user.isActor() && target.isEnemy()) {
          return value * -1;
        } else if (user.isEnemy() && target.isEnemy()) {
          return value * -1;
        } else if (user.isEnemy() && target.isActor()) {
          return value;
        }
      } else if (line.match(/OFFSET X[ ]([\+\-]\d+)/i)) {
        return parseInt(RegExp.$1);
      }
    }
  }
  return 0;
};

BattleManager.actionMoveOffsetY = function(actionArgs, user, target) {
  if (actionArgs && actionArgs.length > 0) {
    var length = actionArgs.length;
    for (var i = 0; i < length; ++i) {
      var line = actionArgs[i];
      if (line.match(/AUTO OFFSET Y[ ]([\+\-]\d+)/i)) {
        return parseInt(RegExp.$1);
      } else if (line.match(/OFFSET Y[ ]([\+\-]\d+)/i)) {
        return parseInt(RegExp.$1);
      }
    }
  }
  return 0;
};

BattleManager.actionOpacity = function(name, actionArgs) {
    var targets = this.makeActionTargets(name);
    if (targets.length < 1) return true;
    var cmd = actionArgs[0];
    var frames = actionArgs[1] || 12;
    if (cmd.match(/(\d+)([%％])/i)) {
      var opacity = parseInt(RegExp.$1 * 0.01 * 255).clamp(0, 255);
    } else if (cmd.match(/(\d+)/i)) {
      var opacity = parseInt(RegExp.$1);
    } else {
      return false;
    }
    targets.forEach(function(target) {
      target.spriteOpacity(opacity, frames);
    });
    return false;
};

BattleManager.actionTintScreen = function(actionArgs) {
    if (actionArgs[0].toUpperCase() === 'NORMAL') {
      var tint = [0, 0, 0, 0];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'DARK') {
      var tint = [-68, -68, -68, 0];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'SEPIA') {
      var tint = [34, -34, -68, 170];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'SUNSET') {
      var tint = [68, -34, -34, 0];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'NIGHT') {
      var tint = [68, -68, 0, 68];
      var frames = actionArgs[1] || 60;
    } else {
      var red = actionArgs[0] || 0;
      var green = actionArgs[1] || 0;
      var blue = actionArgs[2] || 0;
      var gray = actionArgs[3] || 0;
      var frames = actionArgs[4] || 60;
      var tint = [parseInt(red), parseInt(green),
          parseInt(blue), parseInt(gray)];
    }
    $gameScreen.startTint(tint, frames);
    return false;
};

BattleManager.actionShakeScreen = function(actionArgs) {
    var power = actionArgs[0] || 5;
    var speed = actionArgs[1] || 5;
    var frames = actionArgs[2] || 60;
    $gameScreen.startShake(parseInt(power), parseInt(speed), parseInt(frames));
    return false;
};

BattleManager.actionWaitForFloat = function() {
    this._logWindow.waitForFloat();
    return false;
};

BattleManager.actionWaitForJump = function() {
    this._logWindow.waitForJump();
    return false;
};

BattleManager.actionWaitForOpacity = function() {
    this._logWindow.waitForOpacity();
    return false;
};

BattleManager.setWindowLayer = function(windowLayer) {
    this._windowLayer = windowLayer;
};

//=============================================================================
// Sprite_Battler
//=============================================================================

Yanfly.ASP2.Sprite_Battler_initMembers = Sprite_Battler.prototype.initMembers;
Sprite_Battler.prototype.initMembers = function() {
    Yanfly.ASP2.Sprite_Battler_initMembers.call(this);
    this.resetFloat();
    this.setupJump(0, 0);
    this.resetOpacity();
};

Sprite_Battler.prototype.resetFloat = function() {
    this._floatHeight = 0.0;
    this._floatTarget = 0;
    this._floatDur = 0;
    this._floatRate = 0;
};

Sprite_Battler.prototype.resetOpacity = function() {
    this._opacityTarget = 255;
    this._opacityDur = 0;
    this._opacityRate = 0;
    this._opacityChanging = false;
};

Sprite_Battler.prototype.setupFloat = function(floatHeight, floatDuration) {
    floatDuration = Math.max(1, floatDuration);
    this._floatTarget = floatHeight;
    this._floatDur = floatDuration;
    var rate = Math.abs(this._floatHeight - floatHeight) / floatDuration;
    this._floatRate = rate;
};

Sprite_Battler.prototype.setupJump = function(jumpHeight, jumpDuration) {
    this._jumpHeight = jumpHeight;
    this._jumpDur = jumpDuration;
    this._jumpFull = jumpDuration;
};

Sprite_Battler.prototype.setupOpacityChange = function(target, duration) {
    duration = Math.max(1, duration);
    this._opacityTarget = target;
    this._opacityDur = duration;
    var rate = Math.abs(this.opacity - target) / duration;
    this._opacityRate = rate;
    this._opacityChanging = true;
};

Yanfly.ASP2.Sprite_Battler_update = Sprite_Battler.prototype.update;
Sprite_Battler.prototype.update = function() {
    Yanfly.ASP2.Sprite_Battler_update.call(this);
    if (this._battler) {
      this.updateFloat();
      this.updateStateSprites();
      this.updateWeapon();
      this.updateOpacity();
    }
};

Sprite_Battler.prototype.updateFloat = function() {
    if (!this._battler) return;
    if (this._floatDur > 0) this._floatDur--;
    if (this._jumpDur > 0) this._jumpDur--;
    var baseY = this._battler.anchorY();
    var floatHeight = this.getFloatHeight();
    var jumpHeight = this.getJumpHeight();
    var height = floatHeight + jumpHeight;
    if (this._mainSprite && this._mainSprite.bitmap) {
      var rate = this._battler.spriteHeight() / this._mainSprite.height;
      this._mainSprite.anchor.y = (baseY + height * rate);
      this._weaponSprite.anchor.y = this._mainSprite.anchor.y;
    } else {
      this.anchor.y = (baseY + height);
    }
};

Sprite_Battler.prototype.updateStateSprites = function() {
    if (this._stateIconSprite) {
      var height = this._battler.spriteHeight() * -1;
      height -= Sprite_StateIcon._iconHeight;
      height /= this.scale.y;
      this._stateIconSprite.y = height;
    }
    if (this._stateSprite) {
      var height = (this._battler.spriteHeight() - 64 * this.scale.y) * -1;
      this._stateSprite.y = height;
    }
    var heightRate = 0;
    heightRate += this.getFloatHeight();
    heightRate += this.getJumpHeight();
    if (Imported.YEP_X_AnimatedSVEnemies) {
      if (this._enemy && this._enemy.isFloating()) {
        heightRate += this.addFloatingHeight();
      };
    }
    var height = this._battler.spriteHeight();
    if (this._stateIconSprite) {
      this._stateIconSprite.y += Math.ceil(heightRate * -height);
    }
    if (this._stateSprite) {
      this._stateSprite.y += Math.ceil(heightRate * -height);
    }
};

Sprite_Battler.prototype.updateWeapon = function() {
    if (!this._battler) return;
    if (!this._battler.isActor()) return;
    this._weaponSprite.anchor.y = this._mainSprite.anchor.y;
};

Sprite_Battler.prototype.getFloatHeight = function() {
    if (this._floatDur <= 0) {
      this._floatHeight = this._floatTarget;
    } else {
      var target = this._floatTarget;
      var rate = this._floatRate;
      if (this._floatHeight >= target) {
        this._floatHeight = Math.max(target, this._floatHeight - rate);
      } else {
        this._floatHeight = Math.min(target, this._floatHeight + rate);
      }
    }
    return this._floatHeight;
};

Sprite_Battler.prototype.getJumpHeight = function() {
    if (this._jumpDur <= 0) {
      return 0;
    } else {
      var x = this._jumpFull - this._jumpDur;
      var h = this._jumpFull / 2;
      var k = this._jumpHeight;
      var a = -k / Math.pow(h, 2);
      var height = a * Math.pow((x - h), 2) + k;
    }
    return height;
};

Sprite_Battler.prototype.updateOpacity = function() {
    if (this.antiOpacityChange()) return;
    this._opacityDur--;
    if (this._opacityDur <= 0) {
      if (this.opacity !== this._opacityTarget) {
        this.opacity = this._opacityTarget;
      }
      this._opacityChanging = false;
    } else {
      var target = this._opacityTarget;
      var rate = this._opacityRate;
      if (this.opacity >= target) {
        this.opacity = Math.max(target, this.opacity - rate);
      } else {
        this.opacity = Math.min(target, this.opacity + rate);
      }
    }
};

Sprite_Battler.prototype.antiOpacityChange = function() {
    if (!this._opacityChanging) return true;
    return false;
};

Sprite_Battler.prototype.isFloating = function() {
    return this._floatDur > 0;
};

Sprite_Battler.prototype.isJumping = function() {
    return this._jumpDur > 0;
};

Sprite_Battler.prototype.isChangingOpacity = function() {
    return this._opacityDur > 0;
};

//=============================================================================
// Sprite_Animation
//=============================================================================

Yanfly.ASP2.Sprite_Animation_updatePosition =
    Sprite_Animation.prototype.updatePosition;
Sprite_Animation.prototype.updatePosition = function() {
    Yanfly.ASP2.Sprite_Animation_updatePosition.call(this);
    if ([0, 1].contains(this._animation.position)) {
      if (this.isBattlerRelated()) this.updateBattlerPosition();
    }
};

Sprite_Animation.prototype.isBattlerRelated = function() {
    if (this._target instanceof Sprite_Battler) return true;
    if (this._target.parent instanceof Sprite_Battler) return true;
    return false;
};

Sprite_Animation.prototype.updateBattlerPosition = function() {
    if (this._target instanceof Sprite_Battler) {
      var target = this._target;
    } else if (this._target.parent instanceof Sprite_Battler) {
      var target = this._target.parent;
    } else {
      return;
    }
    if (!target.bitmap) return;
    if (target.bitmap.height <= 0) return;
    var heightRate = target.getFloatHeight() + target.getJumpHeight();
    var height = heightRate * target.bitmap.height;
    this.y -= height;
};

//=============================================================================
// Spriteset_Battle
//=============================================================================

Spriteset_Battle.prototype.isAnyoneFloating = function() {
    return this.battlerSprites().some(function(sprite) {
        return sprite.isFloating();
    });
};

Spriteset_Battle.prototype.isAnyoneJumping = function() {
    return this.battlerSprites().some(function(sprite) {
        return sprite.isJumping();
    });
};

Spriteset_Battle.prototype.isAnyoneChangingOpacity = function() {
    return this.battlerSprites().some(function(sprite) {
        return sprite.isChangingOpacity();
    });
};

//=============================================================================
// Game_Battler
//=============================================================================

Game_Battler.prototype.spriteFloat = function(floatHeight, floatDuration) {
    if (!this.battler()) return;
    if (!this.spriteCanMove()) return;
    if (!$gameSystem.isSideView()) return;
    this.battler().setupFloat(floatHeight, floatDuration);
};

Game_Battler.prototype.spriteJump = function(jumpHeight, jumpDuration) {
    if (!this.battler()) return;
    if (!this.spriteCanMove()) return;
    if (!$gameSystem.isSideView()) return;
    this.battler().setupJump(jumpHeight, jumpDuration);
};

Game_Battler.prototype.spriteOpacity = function(opacity, duration) {
    if (!this.battler()) return;
    this.battler().setupOpacityChange(opacity, duration);
};

//=============================================================================
// Scene_Battle
//=============================================================================

Yanfly.ASP2.Scene_Base_createWindowLayer =
    Scene_Base.prototype.createWindowLayer;
Scene_Base.prototype.createWindowLayer = function() {
    Yanfly.ASP2.Scene_Base_createWindowLayer.call(this);
    BattleManager.setWindowLayer(this._windowLayer);
};

//=============================================================================
// Window_BattleLog
//=============================================================================

Yanfly.ASP2.Window_BattleLog_updateWaitMode =
    Window_BattleLog.prototype.updateWaitMode;
Window_BattleLog.prototype.updateWaitMode = function() {
    if (this._waitMode === 'float') {
      if (this._spriteset.isAnyoneFloating()) return true;
    } else if (this._waitMode === 'jump') {
      if (this._spriteset.isAnyoneJumping()) return true;
    } else if (this._waitMode === 'opacity') {
      if (this._spriteset.isAnyoneChangingOpacity()) return true;
    }
    return Yanfly.ASP2.Window_BattleLog_updateWaitMode.call(this);
};

Window_BattleLog.prototype.waitForFloat = function() {
    this.setWaitMode('float');
};

Window_BattleLog.prototype.waitForJump = function() {
    this.setWaitMode('jump');
};

Window_BattleLog.prototype.waitForOpacity = function() {
    this.setWaitMode('opacity');
};

//=============================================================================
// End of File
//=============================================================================
};
