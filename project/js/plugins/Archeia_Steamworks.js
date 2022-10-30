/*=============================================================================
 * iquidize - Steamworks
 * By Liquidize
 * Archeia_Steamworks.js
 * Version: 1.00
 *
 * Copyright (C) 2019 Dan "Liqudize" Deptula & Archeia
 *
 * This plugin is licensed to you, the user under the terms that you credit
 * Liquidize and Archeia in your game (commercial or free). The terms also include you leaving all
 * copyrights intact, you are however free to modify this file to add additional
 * functionality or fix bugs. 
 * 
 *=============================================================================*/
/*:
 * @plugindesc Plugin Description <Archeia_Steamworks>
 * @author Liquidize
 *
 * @param Steamworks Debug
 * @desc Enable or disable debug messages
 * @default false
 *
 * @help
 * ---------------------------------------------------------------------------
 * This plugin allows Steamworks integration into your RPG Maker Game.
 *
 *
 * ============================================================================
 * HOW-TO (USAGE)
 * ============================================================================
 *
 * The plugin is meant to be easily usable for non-developers via plugin commands.
 * Some things however require a "Callback" function, as they have to connect to
 * steams servers to get information, or do things (e.g: unlocking achievements)
 * these things may take some time, and therefore when using plugin commands that
 * require a callback, you should apply a wait before executing more logic.
 * The plugin is a wrapper for Greenworks module, meaning that
 * the functions used by the plugin commands are usable by developers in their
 * own plugins.
 *
 *
 * ----------------------------------------------------------------------------
 * PLUGIN COMMANDS
 * ----------------------------------------------------------------------------
 *
 * Plugin commands are case insensitive so any case is usable.
 * All plugins have the initial command prefix as "steamworks" followed by the
 * action name, and then the arguments for the action.
 *
 * All plugins that return a value, will return -1 if an error occurs. This
 * is so you can check if something bad happens with events.
 *
 * ----------------------------------------------------------------------------
 * GETTING THE USERS STEAM NAME
 * ----------------------------------------------------------------------------
 *
 * Action Name(s): steamname, screenname, or name
 *
 * Arguments: the variable id (a number) to place the name in.
 *
 * Callback(s): No.
 *
 * Usage Example(s):
 *
 * steamworks steamname 1
 * steamworks screenname 999
 * StEaMwOrKs NAME 626
 *
 * Usage Explanation:
 *
 * First we use the command steamworks, this lets the plugin command interpreter
 * know that we want to do a steamworks command, then we specify the action as
 * getting the steam name, we then use the variable provided (in the examples:
 * 1, 999 and 626) to store the steam name once we obtain it.
 *
 * ----------------------------------------------------------------------------
 * GETTING THE USERS STEAM ID/ACCOUNT ID
 * ----------------------------------------------------------------------------
 *
 * Action Name(s): steamid, accountid, or id
 *
 * Arguments: the variable id (a number) to place the steam id in.
 *
 * Callback(s): No.
 *
 * Usage Example(s):
 *
 * steamworks steamid 1
 * steamworks accountid 1333
 * StEaMwOrKs Id 909
 *
 * Usage Explanation:
 *
 * First we use the command steamworks, this lets the plugin command interpreter
 * know that we want to do a steamworks command, then we specify the action as
 * getting the steam id, we then use the variable provided (in the examples:
 * 1, 1333 and 909) to store the steam id once we obtain it.
 *
 * ----------------------------------------------------------------------------
 * GETTING THE USERS STATIC STEAM ID/STATIC ACCOUNT ID
 * ----------------------------------------------------------------------------
 *
 * Action Name(s): staticsteamid, staticid, or staticaccountid
 *
 * Arguments: the variable id (a number) to place the static id in.
 *
 * Callback(s): No.
 *
 * Usage Example(s):
 *
 * steamworks staticsteamid 2
 * steamworks staticid 2000
 * StEaMwOrKs staticaccountid 109
 *
 * Usage Explanation:
 *
 * First we use the command steamworks, this lets the plugin command interpreter
 * know that we want to do a steamworks command, then we specify the action as
 * getting the static steam id, we then use the variable provided (in the examples:
 * 2, 2000 and 109) to store the static steam id once we obtain it.
 *
 *
 * ----------------------------------------------------------------------------
 * GETTING THE USERS STEAM LEVEL
 * ----------------------------------------------------------------------------
 *
 * Action Name(s): level or steamlevel
 *
 * Arguments: the variable id (a number) to place the level in.
 *
 * Callback(s): No.
 *
 * Usage Example(s):
 *
 * steamworks level 2
 * steamworks steamlevel 987
 * StEaMWORKs STEAMLEVEL 1100
 *
 * Usage Explanation:
 *
 * First we use the command steamworks, this lets the plugin command interpreter
 * know that we want to do a steamworks command, then we specify the action as
 * getting the users steam level, we then use the variable provided (in the examples:
 * 2, 987 and 1100) to store the users steam level once we obtain it.
 *
 *
 * ----------------------------------------------------------------------------
 * GETTING THE NUMBER OF PLAYERS IN GAME NOW
 * ----------------------------------------------------------------------------
 *
 * Action Name(s): numofplayers or playercount
 *
 * Arguments: the variable id (a number) to place the amount of players in.
 *
 * Callback(s): Yes, so use a wait event.
 *
 * Usage Example(s):
 *
 * steamworks numofplayers 1
 * steamworks playercount 200
 * StEaMwOrKs NUMOFPLAYERS 10
 *
 * Usage Explanation:
 *
 * First we use the command steamworks, this lets the plugin command interpreter
 * know that we want to do a steamworks command, then we specify the action as
 * getting the amount of players in game, we then use the variable provided (in the examples:
 * 1, 200 and 10) to store the amount of players once it is obtained. This
 * is an action that requires a callback, and must connect to steams server. It
 * is advised to use a wait event to wait a few frames for this to occur.
 *
 * ----------------------------------------------------------------------------
 * GETTING THE NUMBER OF ACHIEVEMENTS IN YOUR GAME
 * ----------------------------------------------------------------------------
 *
 * Action Name(s): numofachievements or achievementcount
 *
 * Arguments: the variable id (a number) to place the returned value in.
 *
 * Callback(s): No.
 *
 * Usage Example(s):
 *
 * steamworks numofachievements 7
 * steamworks numofachievements 8
 * StEaMwOrKs achievementcount 9
 *
 * Usage Explanation:
 *
 * First we use the command steamworks, this lets the plugin command interpreter
 * know that we want to do a steamworks command, then we specify the action as
 * getting the amount of achievements the game as, we then use the variable
 * provided (in the examples: 7, 8 and 9) to store the amount of achievements
 * the game has.
 *
 * ----------------------------------------------------------------------------
 * GETTING IF THE USER HAS STEAM OVERLAY ENABLED
 * ----------------------------------------------------------------------------
 *
 * Action Name(s): overlayenabled, gameoverlayenabled or steamoverlayenabled
 *
 * Arguments: the variable id (a number) to place the returned value in.
 *
 * Callback(s): No.
 *
 * Usage Example(s):
 *
 * steamworks overlayenabled 10
 * steamworks gameoverlayenabled 11
 * StEaMwOrKs steamoverlayenabled 12
 *
 * Usage Explanation:
 *
 * First we use the command steamworks, this lets the plugin command interpreter
 * know that we want to do a steamworks command, then we specify the action as
 * getting whether the user has overlay enabled or not, we then use the variable
 * provided (in the examples: 10, 11 and 12) to store if they have the overlay
 * enabled or not in it.
 *
 * NOTE: The return values for this differ since this returns a boolean.
 * If an error occurs (such as Steamworks not being initialized) it returns -1
 * if the value is false it return 0, if the value is true it returns 1.
 *
 * ----------------------------------------------------------------------------
 * OPENING THE STEAM OVERLAY
 * ----------------------------------------------------------------------------
 *
 * Action Name(s): openoverlay, opensteamoverlay or opengameoverlay
 *
 * Arguments: the location to open to. The following are valid options:
 * Friends, Community, Players, Settings, OfficialGameGroup, Stats and Achievements
 *
 * Callback(s): No.
 *
 * Usage Example(s):
 *
 * steamworks openoverlay Friends
 * steamworks opensteamoverlay Settings
 * StEaMwOrKs opengameoverlay Achievements
 *
 * Usage Explanation:
 *
 * First we use the command steamworks, this lets the plugin command interpreter
 * know that we want to do a steamworks command, then we specify the action is to
 * open the game overlay to the Friends list, the Settings, and the Achievements
 * page.
 *
 * ----------------------------------------------------------------------------
 * OPENING THE STEAM OVERLAY TO A URL
 * ----------------------------------------------------------------------------
 *
 * Action Name(s): openoverlaytourl, opengameoverlayurl or opensteamovertourl
 *
 * Arguments: the url to open to.
 *
 * Callback(s): No.
 *
 * Usage Example(s):
 * steamworks opensteamoverlay http://archeia.moe
 * StEaMwOrKs opengameoverlay http://rpgmakerweb.com
 *
 * Usage Explanation:
 *
 * First we use the command steamworks, this lets the plugin command interpreter
 * know that we want to do a steamworks command, then we specify the action is to
 * open the game overlay to the specified url. The urls given in the examples
 * are urls to Liquidize's and Archeia's websites, as well as the website to
 * RPGMaker Web.
 *
 * ----------------------------------------------------------------------------
 * UNLOCKING AN ACHIEVEMENT
 * ----------------------------------------------------------------------------
 *
 * Action Name(s): activateachievement, giveachivement or grantachievement
 *
 * Arguments: the achievement name to unlock.
 *
 * Callback(s): Yes, this function requires a callback and therefore must
 * take some time, it is recommended to do a wait message if you want to do things
 * such as notify the player in game.
 *
 * Usage Example(s):
 *
 * steamworks activateachievement THE_BEST_ACHIEVEMENT_EVER
 * steamworks giveachivement WHAT_IS_MOE_BABY_DONT_MOE_ME_NO_MOE
 * StEaMwOrKs grantachievement BY_THE_POWER_OF_MEMES
 *
 * Usage Explanation:
 *
 * First we use the command steamworks, this lets the plugin command interpreter
 * know that we want to do a steamworks command, then we specify the action is to
 * unlock the specified achievement.
 *
 * Special Notes: The plugin command for this, uses a special call back that
 * executes the function to give, or take items and skills when an achievement
 * is acquired. For more information about this, see the notetag section.
 *
 *
 * ----------------------------------------------------------------------------
 * REMOVING/CLEARING/LOCKING AN ACHIEVEMENT
 * ----------------------------------------------------------------------------
 *
 * Action Name(s): deactivateachievement, clearachievement or getrekted
 *
 * Arguments: the achievement name to lock/remove.
 *
 * Callback(s): Yes, this function requires a callback and therefore must
 * take some time, it is recommended to do a wait message if you want to do things
 * such as notify the player in game.
 *
 * Usage Example(s):
 *
 * steamworks activateachievement THE_BEST_ACHIEVEMENT_EVER
 * steamworks giveachivement WHAT_IS_MOE_BABY_DONT_MOE_ME_NO_MOE
 * StEaMwOrKs grantachievement BEST_PLUGIN_2016
 *
 * Usage Explanation:
 *
 * First we use the command steamworks, this lets the plugin command interpreter
 * know that we want to do a steamworks command, then we specify the action is to
 * lock the specified achievement.
 *
 * Special Notes: The plugin command for this, uses a special call back that
 * executes the function to give, or take items and skills when an achievement
 * is removed/locked. For more information about this, see the notetag section.
 *
 * ============================================================================
 * NOTE TAGS
 * ============================================================================
 *
 * This plugin makes it easy for non-scripters to grant their users some rewards
 * for obtaining, or losing achievements. You do this by using note tags on the
 * specified objects.
 *
 * Note tags are case insensitive, so any casing will work.
 *
 * -----------------------------------------------------------------------------
 * ITEM,WEAPON, and ARMOR Note tags
 * -----------------------------------------------------------------------------
 * The below are note tags usable in Item, Weapon, or Armor objects.
 * -----------------------------------------------------------------------------
 * WHEN AN ACHIEVEMENT IS UNLOCKED
 * -----------------------------------------------------------------------------
 *
 * Notetag: <ACHIEVEMENT GRANT: ACHIEVEMENT_NAME,+/-AMOUNT_TO_GIVEHERE/>
 *
 * Aliases: <ACHIEVEMENT UNLOCKED: ACHIEVEMENT_NAME,+/-AMOUNT_TO_GIVEHERE/>
 *          <ACHIEVEMENT ACHIEVED: ACHIEVEMENT_NAME,+/-AMOUNT_TO_GIVEHERE/>
 *
 * Usage Example(s):
 *
 * <ACHIEVEMENT GRANT: MY_LOVELY_ACHIEVEMENT,+1/>
 * <ACHIEVEMENT ACHIEVED: MY_LOVELY_ACHIEVEMENT_SUPERMODE,-10/>
 *
 * Usage Explanation:
 *
 * The first example above will give the player 1 of the item,weapon,or armor
 * when the achievement called "MY_LOVELY_ACHIEVEMENT" is unlocked.
 *
 * The second example will take 10 of the item,weapon,or armor from the user if
 * the achievement "MY_LOVELY_ACHIEVEMENT_SUPERMODE" is unlocked.
 *
 * -----------------------------------------------------------------------------
 * WHEN AN ACHIEVEMENT IS REMOVED/LOCKED
 * -----------------------------------------------------------------------------
 *
 * Notetag: <ACHIEVEMENT CLEAR: ACHIEVEMENT_NAME,+/-AMOUNT_TO_GIVEHERE/>
 *
 * Aliases: <ACHIEVEMENT TAKEN: ACHIEVEMENT_NAME,+/-AMOUNT_TO_GIVEHERE/>
 *          <ACHIEVEMENT UNACHIEVED: ACHIEVEMENT_NAME,+/-AMOUNT_TO_GIVEHERE/>
 *          <ACHIEVEMENT REKTED: ACHIEVEMENT_NAME,+/-AMOUNT_TO_GIVEHERE/>
 *
 * Usage Example(s):
 *
 * <ACHIEVEMENT CLEAR: MY_LOVELY_ACHIEVEMENT,+1/>
 * <ACHIEVEMENT UNACHIEVED: MY_LOVELY_ACHIEVEMENT_SUPERMODE,-10/>
 *
 * Usage Explanation:
 *
 * The first example above will give the player 1 of the item,weapon,or armor
 * when the achievement called "MY_LOVELY_ACHIEVEMENT" is removed or locked.
 *
 * The second example will take 10 of the item,weapon,or armor from the user if
 * the achievement "MY_LOVELY_ACHIEVEMENT_SUPERMODE" is removed or locked.
 *
 * -----------------------------------------------------------------------------
 * Class Note tags
 * -----------------------------------------------------------------------------
 * The below are note tags usable in the Class object.
 *
 * -----------------------------------------------------------------------------
 * WHEN AN ACHIEVEMENT IS UNLOCKED
 * -----------------------------------------------------------------------------
 *
 * Notetag: <ACHIEVEMENT GRANT: ACHIEVEMENT_NAME,LEARN/UNLEARN,SKILL_ID/>
 *
 * Aliases: <ACHIEVEMENT UNLOCKED: ACHIEVEMENT_NAME,LEARN/UNLEARN,SKILL_ID/>
 *          <ACHIEVEMENT ACHIEVED: ACHIEVEMENT_NAME,LEARN/UNLEARN,SKILL_ID/>
 *
 * Usage Example(s):
 *
 * <ACHIEVEMENT GRANT: MY_LOVELY_ACHIEVEMENT,LEARN,1/>
 * <ACHIEVEMENT ACHIEVED: MY_LOVELY_ACHIEVEMENT_SUPERMODE,UNLEARN,99/>
 *
 * Usage Explanation:
 *
 * The first example above will give any party member, whose class has this tag,
 * the skill with ID 1, when this achievement is unlocked.
 *
 * The second example will take skill 99 from any party member, whose class has
 * this tag when this achievement (MY_LOVELY_ACHIEVEMENT_SUPERMODE) is unlocked.
 *
 * -----------------------------------------------------------------------------
 * WHEN AN ACHIEVEMENT IS REMOVED/LOCKED
 * -----------------------------------------------------------------------------
 *
 * Notetag: <ACHIEVEMENT CLEAR: ACHIEVEMENT_NAME,LEARN/UNLEARN,SKILL_ID/>
 *
 * Aliases: <ACHIEVEMENT TAKEN: ACHIEVEMENT_NAME,LEARN/UNLEARN,SKILL_ID/>
 *          <ACHIEVEMENT UNACHIEVED: ACHIEVEMENT_NAME,LEARN/UNLEARN,SKILL_ID/>
 *
 * Usage Example(s):
 *
 * <ACHIEVEMENT CLEAR: MY_LOVELY_ACHIEVEMENT,LEARN,1/>
 * <ACHIEVEMENT UNACHIEVED: MY_LOVELY_ACHIEVEMENT_SUPERMODE,UNLEARN,99/>
 *
 * Usage Explanation:
 *
 * The first example above will give any party member, whose class has this tag,
 * the skill with ID 1, when this achievement is removed/locked.
 *
 * The second example will take skill 99 from any party member, whose class has
 * this tag.
 *
 * ============================================================================
 * Change Log
 * ============================================================================
 *
 * Version 1.0:
 *            - Finished Script!
 *
 *=============================================================================*/


// Global for steam api
var steamworks = require("./js/libs/greenworks");

var Imported = Imported || {};
var Archeia = Archeia || {};
Archeia.Steamworks = Archeia.Steamworks || {};
Archeia.Utils = Archeia.Utils || {};

var parameters = $plugins.filter(function (plugin) {
        return plugin.description.contains('<Archeia_Steamworks>');
    });
    if (parameters.length === 0) {
        throw new Error("Couldn't find the parameters of Archeia_Steamworks.");
    }

    Archeia.Steamworks.Parameters = parameters[0].parameters;
    Archeia.Steamworks.Param = {};

    Archeia.Steamworks.Param.debugMode = false

    // Store a copy of the user.
    Archeia.Steamworks.CachedUser = null;



    //================================================================================
    // DataManager
    //================================================================================


    Archeia.Steamworks.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        if (!Archeia.Steamworks.DataManager_isDatabaseLoaded.call(this)) return false;
        this.processSteamworksItemNotetags($dataItems);
        this.processSteamworksItemNotetags($dataWeapons);
        this.processSteamworksItemNotetags($dataArmors);
        this.processSteamworksClassNotetags($dataClasses);
        return true;
    };

    DataManager.processSteamworksItemNotetags = function(group) {
        var note1 = /<(?:ACHIEVEMENT GRANT|achievement unlocked|achieved):[ ](.*),([+-]\d+)\/>/i;
        var note2 = /<(?:ACHIEVEMENT CLEAR|achievement taken|unachieved):[ ](.*),([-+]\d+)\/>/i;
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            var notedata = obj.note.split(/[\r\n]+/);

            obj.steamworks = {};
            obj.steamworks.achievementGrants = {};
            obj.steamworks.achievementClears = {};

            for (var i = 0; i < notedata.length; i++) {
                var line = notedata[i];
                if (line.match(note1)) {
                    var achievement = RegExp.$1;
                    var given = parseInt(RegExp.$2);
                    if (!obj.steamworks.achievementGrants[achievement]) {
                        obj.steamworks.achievementGrants[achievement] = given;
                    }
                } else if (line.match(note2)) {
                    var achievement = RegExp.$1;
                    var given = parseInt(RegExp.$2);
                    if (!obj.steamworks.achievementClears[achievement]) {
                        obj.steamworks.achievementClears[achievement] = given;
                    }
                }
            }
        }
    };

    DataManager.processSteamworksClassNotetags = function(group) {
        var note1 = /<(?:ACHIEVEMENT GRANT|achievement unlocked|achieved):[ ](.*),(LEARN|UNLEARN),(\d+)\/>/i;
        var note2 = /<(?:ACHIEVEMENT CLEAR|achievement taken|unachieved):[ ](.*),(LEARN|UNLEARN),(\d+)\/>/i;
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            var notedata = obj.note.split(/[\r\n]+/);

            obj.steamworks = {};
            obj.steamworks.achievementGrants = {};
            obj.steamworks.achievementClears = {};

            for (var i = 0; i < notedata.length; i++) {
                var line = notedata[i];
                if (line.match(note1)) {
                    obj.steamworks.achievementGrants[RegExp.$1] = obj.steamworks.achievementGrants[RegExp.$1] || {};
                    obj.steamworks.achievementGrants[RegExp.$1].learn =  obj.steamworks.achievementGrants[RegExp.$1].learn  || [];
                    obj.steamworks.achievementGrants[RegExp.$1].unlearn = obj.steamworks.achievementGrants[RegExp.$1].unlearn  || [];
                    var type = RegExp.$2.toLowerCase();
                    switch (type)
                    {
                        case "learn":
                            obj.steamworks.achievementGrants[RegExp.$1].learn.push(parseInt(RegExp.$3));
                            break;
                        case "unlearn":
                            obj.steamworks.achievementGrants[RegExp.$1].unlearn.push(parseInt(RegExp.$3));
                            break;
                    }
                } else if (line.match(note2)) {
                    obj.steamworks.achievementClears[RegExp.$1] = obj.steamworks.achievementClears[RegExp.$1] || {};
                    obj.steamworks.achievementClears[RegExp.$1].learn =  obj.steamworks.achievementClears[RegExp.$1].learn  || [];
                    obj.steamworks.achievementClears[RegExp.$1].unlearn =  obj.steamworks.achievementClears[RegExp.$1].unlearn  || [];
                    var type = RegExp.$2.toLowerCase();
                    switch (type)
                    {
                        case "learn":
                            obj.steamworks.achievementClears[RegExp.$1].learn.push(parseInt(RegExp.$3));
                            break;
                        case "unlearn":
                            obj.steamworks.achievementClears[RegExp.$1].unlearn.push(parseInt(RegExp.$3));
                            break;
                    }
                }
            }
        }
    };

    //================================================================================
    // SceneManager - initializes the API.
    //================================================================================

    Archeia.Steamworks.SceneManager_initialize = SceneManager.initialize;
    SceneManager.initialize = function() {
        this.initSteamworks();
        Archeia.Steamworks.SceneManager_initialize.call(this);
    };

    SceneManager.initSteamworks = function() {
        this._steamInitialized = steamworks.initAPI();
        if (this.steamworksInitialized() == true) {
            console.info("#### Initialized Steamworks API ####");
        } else {
            console.warn("Steamworks failed to initialize.");
        }
    };

    SceneManager.steamworksInitialized = function() {
      return this._steamInitialized;
    };


    //=============================================================================
    // SteamManager
    //=============================================================================
    function SteamManager() {
        throw new Error('This is a static class');
    }

    SteamManager.saveTextToCloud = function(file,contents,callback,errorcallback) {
        if (SceneManager.steamworksInitialized()) {
            steamworks.saveTextToFile(file,contents,function() {
                if (callback) {
                    callback();
                }
            }, function(err) {
                if (errorcallback) {
                    errorcallback(err);
                } else {
                    if (Archeia.Steamworks.Param.debugMode) {
                        console.error(Archeia.Utils.sformat("[ARCHEIA STEAMWORKS] Error when trying to save file to cloud. OUTPUT: '{0}'", err));
                    }
                }
            });
        }  else {
            if (Archeia.Steamworks.Param.debugMode){
                console.warn("[ARCHEIA STEAMWORKS] Unable to get save file to cloud. Is Steamworks Initialized? Does the player have cloud sync enabled?");
            }
        }
      };
  
      SteamManager.readTextFromCloud = function(file,callback,errorcallback) {
          if (SceneManager.steamworksInitialized()) {
              steamworks.readTextFromFile(file,function(contents) {
                  if (callback) {
                      callback(contents);
                  }
              }, function(err) {
                  if (errorcallback) {
                      errorcallback(err);
                  } else {
                      if (Archeia.Steamworks.Param.debugMode) {
                          console.error(Archeia.Utils.sformat("[ARCHEIA STEAMWORKS] Error when trying to read file from cloud. OUTPUT: '{0}'", err));
                      }
                  }
              });
          }  else {
              if (Archeia.Steamworks.Param.debugMode){
                  console.warn("[ARCHEIA STEAMWORKS] Unable to get red file from cloud. Is Steamworks Initialized? Does the player have cloud sync enabled?");
              }
          }
      };
  
      SteamManager.isCloudSyncEnabledForUser = function() {
          if (SceneManager.steamworksInitialized()) {
              return steamworks.isCloudEnabledForUser();
          }  else {
              if (Archeia.Steamworks.Param.debugMode){
                  console.warn("[ARCHEIA STEAMWORKS] Unable to get if cloud sync is enabled for user. Is Steamworks Initialized?");
              }
              return null;
          }
      };
  
      SteamManager.isCloudEnabled = function() {
          if (SceneManager.steamworksInitialized()) {
              return steamworks.isCloudEnabled();
          }  else {
              if (Archeia.Steamworks.Param.debugMode){
                  console.warn("[ARCHEIA STEAMWORKS] Unable to get if cloud sync is enabled. Is Steamworks Initialized?");
              }
              return null;
          }
      };
  
      SteamManager.enableCloud = function(flag) {
          if (SceneManager.steamworksInitialized()) {
              steamworks.enableCloud(flag);
          }  else {
              if (Archeia.Steamworks.Param.debugMode){
                  console.warn("[ARCHEIA STEAMWORKS] Unable to enable/disable cloud sync. Is Steamworks Initialized?");
              }
          }
      };
  
      SteamManager.getCloudQuota = function(callback,errorcallback) {
          if (SceneManager.steamworksInitialized()) {
             steamworks.getCloudQuota(function(total,available) {
                  if (callback) {
                     callback(total,available);
                  }
             },function(err){
                  if (errorcallback) {
                     errorcallback(err);
                  } else {
                      if (Archeia.Steamworks.Param.debugMode) {
                          console.error(Archeia.Utils.sformat("[ARCHEIA STEAMWORKS] Error when trying to get cloud quota. OUTPUT: '{0}'", err));
                      }
                  }
              });
          }  else {
              if (Archeia.Steamworks.Param.debugMode){
                  console.warn("[ARCHEIA STEAMWORKS] Unable to get if cloud sync is enabled. Is Steamworks Initialized?");
              }
          }
      };

    //================================================================================
    // Game_System
    //================================================================================

    Game_System.prototype.getSteamUserObject = function() {
        if (SceneManager.steamworksInitialized()) {
            return steamworks.getSteamId();
        } else {
            if (Archeia.Steamworks.Param.debugMode) console.warn("[ARCHEIA STEAMWORKS] Steamworks is not Initialized.");
            return null;
        }
    };

    Game_System.prototype.getSteamName = function() {
        if (this.getCachedSteamUser()) {
            return this.getCachedSteamUser().screenName;
        } else {
            if (Archeia.Steamworks.Param.debugMode) console.warn("[ARCHEIA STEAMWORKS] Unable to obtain Steam Name. Is Steamworks Initialized?");
            return null;
        }
    };

    Game_System.prototype.getSteamLevel = function() {
        if (this.getCachedSteamUser()) {
            return this.getCachedSteamUser().level;
        } else {
            if (Archeia.Steamworks.Param.debugMode) console.warn("[ARCHEIA STEAMWORKS] Unable to obtain Steam Level. Is Steamworks Initialized?");
            return null;
        }
    };

    Game_System.prototype.getSteamAccountId = function() {
        if (this.getCachedSteamUser()) {
            return this.getCachedSteamUser().accountId;
        } else {
            if (Archeia.Steamworks.Param.debugMode) console.warn("[ARCHEIA STEAMWORKS] Unable to obtain Account Id. Is Steamworks Initialized?");
            return null;
        }
    };

    Game_System.prototype.getSteamStaticAccountId = function() {
        if (this.getCachedSteamUser()) {
            return this.getCachedSteamUser().staticAccountId;
        } else {
            if (Archeia.Steamworks.Param.debugMode) console.warn("[ARCHEIA STEAMWORKS] Unable to obtain Static Account Id. Is Steamworks Initialized?");
            return null;
        }
    };

    Game_System.prototype.getCachedSteamUser = function() {
       if (Archeia.Steamworks.CachedUser) {
           return Archeia.Steamworks.CachedUser;
       } else {
           return Archeia.Steamworks.CachedUser = this.getSteamUserObject();
       }
    };


    Game_System.prototype.unlockAchievement = function(achievement,callback,errorcallback) {
      if (SceneManager.steamworksInitialized()) {
          steamworks.activateAchievement(achievement,function() {
              if (callback) {
                  callback(achievement);
              }
          }, function(err) {
              if (errorcallback) {
                  errorcallback(err);
              } else {
                  if (Archeia.Steamworks.Param.debugMode) {
                      console.error(Archeia.Utils.sformat("[ARCHEIA STEAMWORKS] Error when trying to unlock achievement '{0}' OUTPUT: '{1}'", achievement, err));
                  }
              }
          });
      } else {
          if (Archeia.Steamworks.Param.debugMode) {
              console.warn("[ARCHEIA STEAMWORKS] Unable to grant achievement. Is Steamworks Initialized?");
          }
      }
    };


    Game_System.prototype.forceUnlockAllAchievements = function() {
        var achievements = this.getAchievements();
        if (achievements) {
          for (var achievement of achievements) {
             this.unlockAchievement(achievement, null, null);
          }
        }
    };

    Game_System.prototype.getAchievements = function(){
        if (SceneManager.steamworksInitialized()) {
            return steamworks.getAchievementNames();
        } else {
            if (Archeia.Steamworks.Param.debugMode) {
                console.warn("[ARCHEIA STEAMWORKS] Unable to retrieve achievements. Is Steamworks Initialized?");
            }
            return null;
        }
    };

    Game_System.prototype.getNumberOfAchievements = function() {
        if (SceneManager.steamworksInitialized()) {
            return steamworks.getNumberOfAchievements();
        } else {
            if (Archeia.Steamworks.Param.debugMode) {
                console.warn("[ARCHEIA STEAMWORKS] Unable to retrieve achievement count. Is Steamworks Initialized?");
            }
            return null;
        }
    };

    Game_System.prototype.clearAchievement = function(achievement,callback,errorcallback) {
        if (SceneManager.steamworksInitialized()) {
            steamworks.clearAchievement(achievement,function() {
                if (callback) {
                    callback(achievement);
                }
            }, function(err) {
                if (errorcallback) {
                    errorcallback(err);
                } else {
                    if (Archeia.Steamworks.Param.debugMode) {
                        console.error(Archeia.Utils.sformat("[ARCHEIA STEAMWORKS] Error when trying to clear achievement '{0}' OUTPUT: '{1}'", achievement, err));
                    }
                }
            });
        } else {
            if (Archeia.Steamworks.Param.debugMode) {
                console.warn("[ARCHEIA STEAMWORKS] Unable to clear achievement. Is Steamworks Initialized?");
            }
        }
    };

    Game_System.prototype.getAchievement = function(achievement,callback,errorcallback) {
        if (SceneManager.steamworksInitialized()) {
            steamworks.getAchievement(achievement,function(achieved) {
                if (callback) {
                    callback(achieved,achievement);
                }
            }, function(err) {
                if (errorcallback) {
                    errorcallback(err);
                } else {
                    if (Archeia.Steamworks.Param.debugMode) {
                        console.error(Archeia.Utils.sformat("[ARCHEIA STEAMWORKS] Error when trying to get achievement '{0}' OUTPUT: '{1}'", achievement, err));
                    }
                }
            });
        } else {
            if (Archeia.Steamworks.Param.debugMode) {
                console.warn("[ARCHEIA STEAMWORKS] Unable to get achievement. Is Steamworks Initialized?");
            }
        }
    };

    Game_System.prototype.getCurrentGameLanguage = function() {
      if (SceneManager.steamworksInitialized()) {
          return steamworks.getCurrentGameLanguage();
      } else {
          if (Archeia.Steamworks.Param.debugMode){
              console.warn("[ARCHEIA STEAMWORKS] Unable to get game language. Is Steamworks Initialized?");
          }
          return null;
      }
    };

    Game_System.prototype.getNumberOfPlayers = function(callback,errorcallback) {
      if (SceneManager.steamworksInitialized()) {
          steamworks.getNumberOfPlayers(function(numofplayers){
              if (callback) {
                  callback(numofplayers);
              }
          },function(err){
              if (errorcallback) {
                  errorcallback(err);
              } else {
                  if (Archeia.Steamworks.Param.debugMode) {
                      console.error(Archeia.Utils.sformat("[ARCHEIA STEAMWORKS] Error when trying to get number of players. OUTPUT: '{0}'", err));
                  }
              }
          });
      }  else {
          if (Archeia.Steamworks.Param.debugMode){
              console.warn("[ARCHEIA STEAMWORKS] Unable to get number of players. Is Steamworks Initialized?");
          }
          return null;
      }
    };

    Game_System.prototype.activateGameOverlay = function(option) {
      if (SceneManager.steamworksInitialized()) {
          if (!option) {
              option = "Community";
          }
          steamworks.activateGameOverlay(option);
      } else {
          if (Archeia.Steamworks.Param.debugMode){
              console.warn("[ARCHEIA STEAMWORKS] Unable to open steam overlay. Is Steamworks Initialized? Does the player have game overlay enabled?");
          }
      }
    };

    Game_System.prototype.isGameOverlayEnabled = function() {
        if (SceneManager.steamworksInitialized()) {
            return steamworks.isGameOverlayEnabled();
        } else {
            if (Archeia.Steamworks.Param.debugMode){
                console.warn("[ARCHEIA STEAMWORKS] Unable to get if steam overlay is enabled. Is Steamworks Initialized?");
            }
            return null;
        }
    };

    Game_System.prototype.activateGameOverlayToWebpage = function(url) {
        if (SceneManager.steamworksInitialized()) {
            steamworks.activateGameOverlayToWebPage(url);
        } else {
            if (Archeia.Steamworks.Param.debugMode){
                console.warn("[ARCHEIA STEAMWORKS] Unable to get open game overlay to specified url. Is Steamworks Initialized? Does the player have Game overlay Enabled?");
            }
            return null;
        }
    };

    Game_System.prototype.onAchievementUnlocked = function(achievement) {
        $gameParty.members().forEach(function(member) {
           if (member.currentClass().steamworks.achievementGrants[achievement]) {
               if (member.currentClass().steamworks.achievementGrants[achievement].learn) {
                   for (var l = 0; l < member.currentClass().steamworks.achievementGrants[achievement].learn.length; l++ ){
                       member.learnSkill(member.currentClass().steamworks.achievementGrants[achievement].learn[l]);
                   }
               } if (member.currentClass().steamworks.achievementGrants[achievement].unlearn) {
                   for (var u = 0; u < member.currentClass().steamworks.achievementGrants[achievement].unlearn.length; u++ ){
                       member.forgetSkill(member.currentClass().steamworks.achievementGrants[achievement].unlearn[u]);
                   }
               }
           }
        });

        for (var i = 0; i < $dataItems.length; i++) {
            var item = $dataItems[i];
            if (item && item.steamworks) {
                if (item.steamworks.achievementGrants[achievement]) {
                    var given = item.steamworks.achievementGrants[achievement];
                    $gameParty.gainItem(item,given,true);
                }
            }
        }

        for (var w = 0; w < $dataWeapons.length; w++) {
            var weapon = $dataWeapons[w];
            if (weapon && weapon.steamworks) {
                if (weapon.steamworks.achievementGrants[achievement]) {
                    var given = weapon.steamworks.achievementGrants[achievement];
                    $gameParty.gainItem(weapon,given,true);
                }
            }
        }

        for (var a = 0; a < $dataArmors.length; a++) {
            var armor = $dataArmors[a];
            if (armor && armor.steamworks) {
                if (armor.steamworks.achievementGrants[achievement]) {
                    var given = armor.steamworks.achievementGrants[achievement];
                    $gameParty.gainItem(armor,given,true);
                }
            }
        }

    };

    Game_System.prototype.onAchievementCleared = function(achievement) {
        $gameParty.members().forEach(function(member) {
            if (member.currentClass().steamworks.achievementClears[achievement]) {
                if (member.currentClass().steamworks.achievementClears[achievement].learn) {
                    for (var l = 0; l < member.currentClass().steamworks.achievementClears[achievement].learn.length; l++ ){
                        member.learnSkill(member.currentClass().steamworks.achievementGrants[achievement].learn[l]);
                    }
                } if (member.currentClass().steamworks.achievementClears[achievement].unlearn) {
                    for (var u = 0; u < member.currentClass().steamworks.achievementClears[achievement].unlearn.length; u++ ){
                        member.forgetSkill(member.currentClass().steamworks.achievementClears[achievement].unlearn[u]);
                    }
                }
            }
        });

        for (var i = 0; i < $dataItems.length; i++) {
            var item = $dataItems[i];
            if (item && item.steamworks) {
                if (item.steamworks.achievementClears[achievement]) {
                    var given = item.steamworks.achievementClears[achievement];
                    $gameParty.gainItem(item,given,true);
                }
            }
        }

        for (var w = 0; w < $dataWeapons.length; w++) {
            var weapon = $dataWeapons[w];
            if (weapon && weapon.steamworks) {
                if (weapon.steamworks.achievementClears[achievement]) {
                    var given = weapon.steamworks.achievementClears[achievement];
                    $gameParty.gainItem(weapon,given,true);
                }
            }
        }

        for (var a = 0; a < $dataArmors.length; a++) {
            var armor = $dataArmors[a];
            if (armor && armor.steamworks) {
                if (armor.steamworks.achievementClears[achievement]) {
                    var given = armor.steamworks.achievementClears[achievement];
                    $gameParty.gainItem(armor,given,true);
                }
            }
        }
    };

    //================================================================================
    // Game_Interpreter
    //================================================================================

    Archeia.Steamworks.GameInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command,args) {
      if (command.toLowerCase() == "steamworks") {
          if (args.length < 1) return; // No action given.
          var action = args[0].toLowerCase();
          switch (action) {
              case "steamname":
              case "screenname":
              case "name":
                  if (args.length < 2) return; // No variable to put it in.
                  var steamname = $gameSystem.getSteamName();
                  if (steamname == null) steamname = -1; // failed to get name.
                  $gameVariables.setValue(parseInt(args[1]),steamname);
                  break;
              case "steamid":
              case "accountid":
              case "id":
                  if (args.length < 2) return; // No variable to put it in.
                  var steamid = $gameSystem.getSteamAccountId();
                  if (steamid == null) steamid = -1;
                  $gameVariables.setValue(parseInt(args[1]),steamid);
                  break;
              case "staticsteamid":
              case "staticid":
              case "staticaccountid":
                  if (args.length < 2) return; // No variable to put it in.
                  var statid = $gameSystem.getSteamStaticAccountId();
                  if (statid == null) statid = -1;
                  $gameVariables.setValue(parseInt(args[1]),statid);
                  break;
              case "level":
              case "steamlevel":
                  if (args.length < 2) return; // No variable to put it in.
                  var level = $gameSystem.getSteamLevel();
                  if (level == null) level = -1;
                  $gameVariables.setValue(parseInt(args[1]),level);
                  break;
              case "numofplayers":
              case "playercount":
                  if (args.length < 2) return; // No variable to put it in.
                  $gameSystem.getNumberOfPlayers(function(count) {
                      $gameVariables.setValue(parseInt(args[1]),count);
                  },function(err){
                      if (Archeia.Steamworks.Param.debugMode) {
                          console.error("[ARCHEIA STEAMWORKS] An error occurred when attempting to get player count. Is Steamworks Initialized?")
                      }
                      $gameVariables.setValue(parseInt(args[1]),-1);
                  });
                  break;
              case "numofachievements":
              case "achievementcount":
                  if (args.length < 2) return; // No variable to put it in.
                  var achievementcount = $gameSystem.getNumberOfAchievements();
                  if (achievementcount == null) achievementcount = -1;
                  $gameVariables.setValue(parseInt(args[1]),achievementcount);
                  break;
              case "overlayenabled":
              case "gameoverlayenabled":
              case "steamoverlayenabled":
                  if (args.length < 2) return; // No variable to put it in.
                  var overlayenabled = $gameSystem.isGameOverlayEnabled();
                  if (overlayenabled == null) overlayenabled = -1;
                  if (overlayenabled == true) overlayenabled = 1;
                  if (overlayenabled == false) overlayenabled = 0;
                  $gameVariables.setValue(parseInt(args[1]),overlayenabled);
                  break;
              case "openoverlay":
              case "opensteamoverlay":
              case "opengameoverlay":
                  if (args.length < 2) return; // No overlay option given.
                  $gameSystem.activateGameOverlay(args[1]);
                  break;
              case "openoverlaytourl":
              case "opengameoverlayurl":
              case "opensteamovertourl":
                  if (args.length < 2) return; // no url given.
                  args = args.splice(1,args.length - 1);
                  $gameSystem.activateGameOverlayToWebpage(args.join(''));
                  break;
              case "activateachievement":
              case "giveachivement":
              case "grantachievement":
                  if (args.length < 2) return; // no achievement name given.
                  args = args.splice(1,args.length - 1);
                  $gameSystem.unlockAchievement(args.join(''),$gameSystem.onAchievementUnlocked,null);
                  break;
              case "deactivateachievement":
              case "clearachievement":
                  if (args.length < 2) return; // no achievement name given.
                  args = args.splice(1,args.length - 1);
                  $gameSystem.clearAchievement(args.join(''),$gameSystem.onAchievementCleared,null);
                  break;
          }
      } else {
          Archeia.Steamworks.GameInterpreter_pluginCommand.call(this,command,args);
      }
    };

    //================================================================================
    // UTILS
    //================================================================================

    // The below is a string formatting function that gives me/js/people/anyone/stuff
    // the ability to use C#/C styled string formatting using {0},{1} for parameters.
    // I prefer this method, as it is what I'm used to.
    // - Liquidize
    if (!Archeia.Utils.sformat) {
        Archeia.Utils.sformat = function () {
            var theString = arguments[0];
            for (var i = 1; i < arguments.length; i++) {
                var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
                theString = theString.replace(regEx, arguments[i]);
            }
            return theString;
        };
    }

Imported["Archeia_Steamworks"] = 1.00;