/*:
-------------------------------------------------------------------------
@title Enemy Reinforcements
@author Hime --> HimeWorks (http://himeworks.com)
@date Aug 15, 2016
@version 1.3
@filename HIME_EnemyReinforcements.js
@url http://himeworks.com/2015/11/enemy-reinforcements-mv/

If you enjoy my work, consider supporting me on Patreon!

* https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

* Main Website: http://himeworks.com
* Facebook: https://www.facebook.com/himeworkscom/
* Twitter: https://twitter.com/HimeWorks
* Youtube: https://www.youtube.com/c/HimeWorks
* Tumblr: http://himeworks.tumblr.com/

-------------------------------------------------------------------------
@plugindesc Allows you to summon more enemies into the current battle
using event commands.
@help 
-------------------------------------------------------------------------
== Description ==

Video: https://youtu.be/ROy4nEoao-I

Do you want to add new enemies to battle, during the battle? This plugin
provides you with a variety of commands that allow you to create
more dynamic battles through enemy reinforcements.

You can create enemy skills that will essentially summon new enemies
to battle. Enemies can be added as a single enemy, or entire troops
of enemies.

Do you want to make sure a particular reinforcement does not already
exist? With this plugin, methods are provided to allow you to check
whether a certain enemy from a certain troop exists at a certain position.

If you want reinforcements to automatically disappear after a certain
amount of time has passed, you can easily do so by making a single
command to remove all enemy reinforcements from another troop!

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Contact me for commercial use

== Change Log ==

1.3 - Aug 15, 2016
 * Fix checking whether a certain member existed
1.2 - Nov 21, 2015
 * member ID's weren't normalized to 1-based
1.1 - Nov 17, 2015
 * fixed "needs alive" condition for checking if added
1.0 - Nov 16, 2015
 * initial release

== Usage ==

When enemies are added to the battle, there are two questions that
need to be answered: which enemy is added, and where are they placed?

This plugin uses troops in the database to set up the enemy positions.
The enemy that will be added depends on the enemy that you choose in a
troop, and their position will be based on where they are in the troop.

Keep this numbering system in mind as you read on.

-- Adding Enemy Troops --

You can add entire troops to the current battle. When a troop is added,
all enemies in the other troop will be added, whether they should appear
half-way or not. To add a troop into battle, use the plugin command:

  add_enemy_troop TROOP_ID

Where the TROOP_ID is the ID of the troop that you want to add.
For example, if the three slimes is troop 4, you would write

  add_enemy_troop 4

-- Adding Certain Enemies from Troops --

Instead of adding an entire troop, you may want to add a specific enemy
from a specific troop. To add a specific enemy, use the plugin command:

  add_enemy TROOP_MEMBER_ID from troop TROOP_ID

The TROOP_MEMBER_ID uses the numbering system that I described earlier.
So for example, if you wanted to add the second slime from the three\
slimes troop to battle, you would write

  add_enemy 2 from troop 4

-- Removing Enemy Troops --

If you wish to remove a troop that was added to the battle (for example,
they are all retreating or their summon time has expired), you can use
the plugin command

  remove_enemy_troop TROOP_ID

So for example if you want to remove the three slimes troop which is
troop 4, you can write

  remove_enemy_troop 4

-- Removing Certain Enemies from Troops --

You can also remove certain enemies from certain troops. Use the plugin
command:

  remove_enemy TROOP_MEMBER_ID from troop TROOP_ID

So for example, if you added the three slimes into the battle, but want
to remove the second one, you can say

  remove_enemy 2 from troop 4

And only that specific enemy will be removed.

-- Checking whether a troop exists --

To check whether an entire troop exists, you can use the script call

  $gameTroop.isTroopReinforcementAdded(troopId, checkIsAlive)

Which will return true if the specific troop exists. If you pass in
`true` for checking whether it's alive or not, it will return true if
any of the members from that troop are alive. If you don't pass in
anything, then it will return true if ANY members of the troop exists.

This is useful if you wanted the summons to only appear once (unless
you explicitly remove them).

-- Checking whether an enemy from a certain troop exists --

There are methods available for checking whether a certain troop member
exists. You can use this in a script call (such as a conditional branch):

  $gameTroop.isEnemyReinforcementAdded(troopID, memberId, checkIsAlive)

Which will return true if the specific member from the specified troop
exists, and whether it's alive or not. If you pass in `true` for whether
it's alive or not, you can force it to check whether the enemy exists and
is alive. 

For example, if you want to check if the second slime from troop 4 is
alive, you would write

  $gameTroop.isEnemyReinforcementAdded(4, 2, true)

-------------------------------------------------------------------------
 */ 
var Imported = Imported || {} ;
var TH = TH || {};
Imported.EnemyReinforcements = 1;
TH.EnemyReinforcements = TH.EnemyReinforcements || {};

(function ($) {

  /* New. Refresh the spriteset to draw new enemies */
  BattleManager.refreshEnemyReinforcements = function() {
    if (this._spriteset) {
      this._spriteset.refreshEnemyReinforcements();
    }
  }
  
  /***************************************************************************/
  
  Spriteset_Battle.prototype.removeEnemies = function() {
    var sprites = this._enemySprites;
    for (var i = 0; i < sprites.length; i++) {
      this._battleField.removeChild(sprites[i]);
    }
  }
  
  /* Delete all enemy sprites and re-draw them */
  Spriteset_Battle.prototype.refreshEnemyReinforcements = function() {
    this.removeEnemies();
    this.createEnemies();
    // this.createEnemyReinforcements();
  }
  
  Spriteset_Battle.prototype.createEnemyReinforcements = function() {
    var enemies = $gameTroop.newReinforcements();
    var sprites = [];
    for (var i = 0; i < enemies.length; i++) {
      sprites[i] = new Sprite_Enemy(enemies[i]);
    }
    sprites.sort(this.compareEnemySprite.bind(this));
    for (var j = 0; j < sprites.length; j++) {
      this._enemySprites.push(sprites[j]);
      this._battleField.addChild(sprites[j]);
      
    }    
  };
  
  /***************************************************************************/

  var TH_EnemyReinforcements_Game_Enemy_setup = Game_Enemy.prototype.setup;
  Game_Enemy.prototype.setup = function(enemyId, x, y) {
    TH_EnemyReinforcements_Game_Enemy_setup.call(this, enemyId, x, y);
    this._troopId = $gameTroop.troop.id;
  }
  
  Game_Enemy.prototype.troopId = function() {
    return this._troopId;
  }
  
  Game_Enemy.prototype.troopMemberId = function() {
    return this._troopMemberId;
  }
  
  Game_Enemy.prototype.setTroopId = function(troopId) {
    this._troopId = troopId;
  };
  
  Game_Enemy.prototype.setTroopMemberId = function(memberId) {
    this._troopMemberId = memberId;
  };
  
  Game_Enemy.prototype.setupReinforcements = function(troopId, enemyId, x, y) {
    this.setup(enemyId, x, y);
    this._troopId = troopId;
  };
  
  /***************************************************************************/
  
  var TH_EnemyReinforcements_GameTroop_Setup = Game_Troop.prototype.setup;
  Game_Troop.prototype.setup = function(troopId) {
    TH_EnemyReinforcements_GameTroop_Setup.call(this, troopId);
    this.clearReinforcements();
  }
  
  Game_Troop.prototype.newReinforcements = function() {
    return this._newEnemies;
  };
  
  Game_Troop.prototype.clearReinforcements = function() {
    this._newEnemies = [];
  };
  
  Game_Troop.prototype.addReinforcementMember = function(troopId, memberId, member) {    
    if ($dataEnemies[member.enemyId]) {
      var enemyId = member.enemyId;
      var x = member.x;
      var y = member.y;
      var enemy = new Game_Enemy(enemyId, x, y);
      enemy.setTroopId(troopId);
      enemy.setTroopMemberId(memberId);
      if (member.hidden) {
          enemy.hide();
      }
      this._enemies.push(enemy);
      this._newEnemies.push(enemy);
    }   
  }
  
  Game_Troop.prototype.addEnemyReinforcement = function(troopId, memberId) {
    var member = $dataTroops[troopId].members[memberId - 1];
    this.addReinforcementMember(troopId, memberId, member);
    this.makeUniqueNames();
    BattleManager.refreshEnemyReinforcements();
  };
  
  Game_Troop.prototype.addTroopReinforcements = function(troopId) {
    var troop = $dataTroops[troopId];
    var enemyId;
    for (var i = 0; i < troop.members.length; i++) {
      var member = troop.members[i];
      this.addReinforcementMember(troopId, i, member);
    }
    this.makeUniqueNames();
    BattleManager.refreshEnemyReinforcements();
  };
  
  Game_Troop.prototype.removeEnemyReinforcement = function(troopId, memberId) {
    var member = $dataTroops[troopId].members[memberId - 1];
    var enemies = this._enemies;
    /* Start from the end of the array to avoid indexing issues */
    for (var i = enemies.length - 1; i > -1; i--) {
      if (enemies[i].troopId() === troopId && enemies[i].troopMemberId() === memberId) {
        this._enemies.splice(i, 1);
      }
    }
    BattleManager.refreshEnemyReinforcements();
  }
  
  Game_Troop.prototype.removeTroopReinforcements = function(troopId) {
    var enemies = this._enemies;
    /* Start from the end of the array to avoid indexing issues */
    for (var i = enemies.length - 1; i > -1; i--) {
      if (enemies[i].troopId() === troopId) {
        this._enemies.splice(i, 1);
      }
    }
    BattleManager.refreshEnemyReinforcements();
  };
  
  Game_Troop.prototype.isEnemyReinforcementAdded = function(troopId, memberId, needsAlive) {
    var enemies = this._enemies;
    for (var i = 0; i < enemies.length; i++) {
      if (enemies[i].troopId() === troopId && enemies[i].troopMemberId() === memberId) {        
        /* Needs to be alive */
        if (needsAlive) {
          if (enemies[i].isAlive()) {
            return true;
          }          
        }
        /* Doesn't need to be alive */
        else {
          return true;
        }
      }
    }
    return false;
  };
  
  Game_Troop.prototype.isTroopReinforcementAdded = function(troopId, needsAlive) {
    var enemies = this._enemies;
    for (var i = 0; i < enemies.length; i++) {
      if (enemies[i].troopId() === troopId) {
        /* Needs to be alive */
        if (needsAlive) {
          if (enemies[i].isAlive()) {
            return true;
          }          
        }
        /* Doesn't need to be alive */
        else {
          return true;
        }
      }
    }
    return false;
  };
  
  /***************************************************************************/

  var TH_EnemyReinforcements_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
  
    // specify enemy from a certain troop
    if (command.toLowerCase() === "add_enemy") {
      var troopId = Math.floor(args[3]);
      var memberId = Math.floor(args[0]);
      $gameTroop.addEnemyReinforcement(troopId, memberId)
    }
    // add entire troop
    else if (command.toLowerCase() === "add_enemy_troop") {
      var troopId = Math.floor(args[0]);
      $gameTroop.addTroopReinforcements(troopId);
    }
    else if (command.toLowerCase() === "remove_enemy") {
      var troopId = Math.floor(args[3]);
      var memberId = Math.floor(args[0]);
      $gameTroop.removeEnemyReinforcement(troopId, memberId);
    }
    else if (command.toLowerCase() === "remove_enemy_troop") {
      var troopId = Math.floor(args[0]);
      $gameTroop.removeTroopReinforcements(troopId);
    }
    else {
      TH_EnemyReinforcements_Game_Interpreter_pluginCommand.call(this, command, args);
    }
  };
})(TH.EnemyReinforcements);