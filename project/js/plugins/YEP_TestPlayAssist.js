//=============================================================================
// Yanfly Engine Plugins - Test Play Assist
// YEP_TestPlayAssist.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_TestPlayAssist = true;

var Yanfly = Yanfly || {};
Yanfly.TPA = Yanfly.TPA || {};
Yanfly.TPA.version = 1.00;

//=============================================================================
 /*:
 * @plugindesc v1.00 Test playing can become a chore. This plugin offers new
 * features that would help make your test playing more flexible and efficient.
 * @author Yanfly Engine Plugins
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Test playing your game can be quite time consuming. Each second you spend on
 * the title screen, each time you accidentally picked Continue instead of 
 * New Game, the time it takes to turn on the FPS counter, and more. While each
 * of these take little time on their own, the amount of extra time wasted adds
 * up fast. This plugin will give you access to various features that will aim
 * to help you save more time when it comes to test playing your game. These
 * features will only occur during test play and will not run in finalized
 * versions of the game.
 * 
 * All of the following are optional and can be turned on/off:
 * 
 * Auto New Game
 * - This will automatically start a new game each time you hit test play. That
 * way, you can avoid selecting the Continue option by accident, go immediately
 * to where you've placed your Start Player position, and test whatever you
 * need to do.
 * 
 * On Switches
 * - This is a list of switches that will automatically turn on each time a new
 * game starts during Test Play. This can be helpful for activating/bypassing
 * certain events, starting parallel common events, etc.
 * 
 * Common event
 * - Run a specific common event each time a new game starts in test play. This
 * can be used for just about anything ranging from adding party members, giving
 * the party certain weapons, leveling up the party, etc.
 * 
 * Startup Code
 * - For those that know JavaScript, this code will be ran at the start of a
 * new game during test play. By default, the code included with this plugin
 * will add 10x of each item in the database that isn't a key item or hidden
 * item for better testing.
 * 
 * Show FPS
 * - Normally, one would press F2 to show the FPS meter. Enabling this plugin
 * parameter will turn it on automatically with each time to save you time.
 * 
 * Full Screen
 * - This will automatically full screen the game upon starting up during test
 * play to speed up any time you have to test the game in full screen without
 * needing to press the F4 key.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.00:
 * - Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @param AutoStart
 * @text Test Play - Auto New Game
 * @type boolean
 * @on YES
 * @off NO
 * @desc Automatically start a new game on test play?
 * @default false
 *
 * @param OnSwitches
 * @text Test Play - On Switches
 * @type switch[]
 * @desc Turns all of the following switches when a new game is
 * started during test play.
 * @default []
 *
 * @param CommonEvent
 * @text Test Play - Common Event
 * @type common_event
 * @desc Plays this common event whenever New Game is started during
 * test play. Leave this at zero to not use this function.
 * @default 0
 *
 * @param StartCode
 * @text Test Play - Startup Code
 * @type note
 * @desc Runs the following code upon starting up a new game during
 * test play. Remove all the code inside if you want.
 * @default "// Get 10x of each regular item. Exclude key/hidden items.\nfor (var i = 1; i < $dataItems.length; ++i) {\n  var item = $dataItems[i];\n  if (!item) continue;\n  if (item.itypeId !== 1) continue;\n  if (item.name.trim().length <= 0) continue;\n  $gameParty.gainItem(item, 10);\n}"
 *
 * @param AutoFPS
 * @text Test Play - Show FPS
 * @type boolean
 * @on YES
 * @off NO
 * @desc Show FPS when you launch the test play client.
 * @default false
 *
 * @param AutoFullScr
 * @text Test Play - Full Screen
 * @type boolean
 * @on YES
 * @off NO
 * @desc Automatically full screen the game client during test play.
 * @default false
 *
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_TestPlayAssist');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.DSUAAutoNewGame = eval(Yanfly.Parameters['AutoStart']) || false;
Yanfly.Param.DSUAOnSwitches = JSON.parse(Yanfly.Parameters['OnSwitches']) || "";
Yanfly.Param.DSUACommonEvent = Number(Yanfly.Parameters['CommonEvent']) || 0;
Yanfly.Param.DSUAStartCode = JSON.parse(Yanfly.Parameters['StartCode']) || "";
Yanfly.Param.DSUAAutoFPS = eval(Yanfly.Parameters['AutoFPS']) || false;
Yanfly.Param.DSUAAutoFullScr = eval(Yanfly.Parameters['AutoFullScr']) || false;

if (Utils.isNwjs() && Utils.isOptionValid('test')) {

//=============================================================================
// DataManager
//=============================================================================

Yanfly.TPA.DataManager_setupNewGame = DataManager.setupNewGame;
DataManager.setupNewGame = function() {
  Yanfly.TPA.DataManager_setupNewGame.call(this);
  this.setupNewGameTestPlayAssist();
};

DataManager.setupNewGameTestPlayAssist = function() {
  // Switch On
  for (var i = 0; i < Yanfly.Param.DSUAOnSwitches.length; ++i) {
    var switchId = Number(Yanfly.Param.DSUAOnSwitches[i]);
    if (switchId > 0) {
      $gameSwitches.setValue(switchId, true);
    }
  }
  // Common Event
  if (Yanfly.Param.DSUACommonEvent > 0) {
    $gameTemp.reserveCommonEvent(Yanfly.Param.DSUACommonEvent);
  }
  // Startup Code
  eval(Yanfly.Param.DSUAStartCode);
};

//=============================================================================
// Scene_Boot
//=============================================================================

Yanfly.TPA.Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
  if (this.isAutoStartNewGame()) {
    this.checkPlayerLocation();
    DataManager.setupNewGame();
    SceneManager.goto(Scene_Map);
  } else {
    Yanfly.TPA.Scene_Boot_start.call(this);
  }
  if (Yanfly.Param.DSUAAutoFPS) Graphics._switchFPSMeter();
  if (Yanfly.Param.DSUAAutoFullScr) Graphics._requestFullScreen();
};

Scene_Boot.prototype.isAutoStartNewGame = function() {
  return Yanfly.Param.DSUAAutoNewGame &&
         !DataManager.isBattleTest() &&
         !DataManager.isEventTest();
};

}; // (Utils.isNwjs() && Utils.isOptionValid('test'))

//=============================================================================
// End of File
//=============================================================================