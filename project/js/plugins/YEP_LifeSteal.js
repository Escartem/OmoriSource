//=============================================================================
// Yanfly Engine Plugins - Life Steal
// YEP_LifeSteal.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_LifeSteal = true;

var Yanfly = Yanfly || {};
Yanfly.LS = Yanfly.LS || {};
Yanfly.LS.version = 1.04;

//=============================================================================
 /*:
 * @plugindesc v1.04 Enables passive life steal traits without them being
 * active abilities but instead as passive traits.
 * @author Yanfly Engine Plugins
 *
 * @param Enable HP Overheal
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Allow Life Steal to drain more HP than damage?
 * NO - false     YES - true
 * @default false
 *
 * @param Enable MP Overheal
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Allow Life Steal to drain more MP than damage?
 * NO - false     YES - true
 * @default false
 *
 * @param Negative HP LifeSteal
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Allow HP Life Steal values to go negative and damage
 * the attacker? NO - false     YES - true
 * @default false
 *
 * @param Negative MP LifeSteal
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Allow MP Life Steal values to go negative and damage
 * the attacker? NO - false     YES - true
 * @default false
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Life Steal is a mechanic in RPG Maker MV that only exists in the form of
 * specific skills or items. There is no way to passively gain Life Steal from
 * physical, magical, or certain hit attacks. This plugin will allow you to set
 * passive Life Steal traits for physical, magical, and certain hit attacks for
 * both HP and MP values.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * You can use the following notetags to alter how Life Stealing works for the
 * various database entries.
 *
 * ---
 *
 * Skill and Item Notetags:
 *
 *   <HP Life Steal: x%>
 *   <MP Life Steal: x%>
 *   This causes this attack to life steal x% of HP or MP back relative to the
 *   amount of damage dealt.
 *
 *   <HP Life Steal: x>
 *   <MP Life Steal: x>
 *   This causes this attack to life steal exactly x amount of HP or MP back
 *   regardless of damage dealt.
 *
 *   <Cancel Life Steal>
 *   Makes this skill or item cancel any Life Steal effects from passively
 *   activating for this action. However, HP Drain and MP Drain will still
 *   still occur.
 *
 *   <Cancel HP Life Steal>
 *   <Cancel MP Life Steal>
 *   Specifically cancels out HP Life Steal or MP Life Steal effects from
 *   passively activating for this action. However, HP Drain and MP Drain will
 *   still occur.
 *
 * ---
 *
 * Actor, Class, Enemy, Weapon, Armor, State Notetags:
 *
 *   <HP Life Steal Physical: +x%>
 *   <HP Life Steal Magical: +x%>
 *   <HP Life Steal Certain: +x%>
 *
 *   <MP Life Steal Physical: +x%>
 *   <MP Life Steal Magical: +x%>
 *   <MP Life Steal Certain: +x%>
 *
 *   <HP Life Steal Physical: -x%>
 *   <HP Life Steal Magical: -x%>
 *   <HP Life Steal Certain: -x%>
 *
 *   <MP Life Steal Physical: -x%>
 *   <MP Life Steal Magical: -x%>
 *   <MP Life Steal Certain: -x%>
 *   This causes the related battler to multiplicatively increase its passive
 *   Life Steal by +x% or -x% of the damage dealt towards Physical, Magical, or
 *   Certain Hit type of attacks. This effect stacks multiplicatively.
 *
 *   <HP Life Steal Physical: +x>
 *   <HP Life Steal Magical: +x>
 *   <HP Life Steal Certain: +x>
 *
 *   <MP Life Steal Physical: +x>
 *   <MP Life Steal Magical: +x>
 *   <MP Life Steal Certain: +x>
 *
 *   <HP Life Steal Physical: -x>
 *   <HP Life Steal Magical: -x>
 *   <HP Life Steal Certain: -x>
 *
 *   <MP Life Steal Physical: -x>
 *   <MP Life Steal Magical: -x>
 *   <MP Life Steal Certain: -x>
 *   This causes the related battler to additively increase its passive Life
 *   Steal by a flat +x or -x of the damage dealt towards Physical, Magical, or
 *   Certain Hit type of attacks. This effect stacks additively.
 *
 *   <Guard Life Steal>
 *   The related battler cannot be life stolen from for both HP and MP.
 *
 *   <Guard HP Life Steal>
 *   <Guard MP Life Steal>
 *   The related battler cannot be life stolen from for either HP or MP.
 *
 *   <Cancel Life Steal>
 *   The related battler cannot passively life steal both HP and MP.
 *
 *   <Cancel HP Life Steal>
 *   <Cancel MP Life Steal>
 *   The related battler cannot passively life steal HP or MP specifically.
 *
 * ---
 *
 * ============================================================================
 * Lunatic Mode - Custom Life Steal
 * ============================================================================
 *
 * For those with JavaScript proficiency, you can utilize these notetags to
 * have your various database objects have dynamic Life Steal values.
 *
 * --- Skill and Item Notetags ---
 *
 *   <Custom HP Life Steal Rate>
 *    rate = user.hpRate();
 *   </Custom HP Life Steal Rate>
 *   
 *   <Custom MP Life Steal Rate>
 *    rate = user.hpRate();
 *   </Custom MP Life Steal Rate>
 *   The 'rate' variable is the amount of HP/MP that the skill/item will life
 *   steal from the target based on the damage dealt to the target. This is a
 *   percentile value.
 *
 *   --- --- ---
 *
 *   <Custom HP Life Steal Flat>
 *    flat = user.mhp;
 *   </Custom HP Life Steal Flat>
 *   
 *   <Custom MP Life Steal Flat>
 *    flat = user.mhp;
 *   </Custom MP Life Steal Flat>
 *   The 'flat' variable is the amount of HP/MP that the skill/item will life
 *   steal from the target based on the damage dealt to the target. This is a
 *   flat value.
 *
 * --- Actor, Class, Enemy, Weapon, Armor, State Notetags ---
 *
 *   <Custom HP Life Steal Physical Rate>
 *    rate = user.hpRate();
 *   </Custom HP Life Steal Physical Rate>
 *
 *   <Custom HP Life Steal Magical Rate>
 *    rate = user.hpRate();
 *   </Custom HP Life Steal Magical Rate>
 *
 *   <Custom HP Life Steal Certain Rate>
 *    rate = user.hpRate();
 *   </Custom HP Life Steal Certain Rate>
 *
 *   <Custom MP Life Steal Physical Rate>
 *    rate = user.hpRate();
 *   </Custom MP Life Steal Physical Rate>
 *
 *   <Custom MP Life Steal Magical Rate>
 *    rate = user.hpRate();
 *   </Custom MP Life Steal Magical Rate>
 *
 *   <Custom MP Life Steal Certain Rate>
 *    rate = user.hpRate();
 *   </Custom MP Life Steal Certain Rate>
 *   The 'rate' variable is the bonus amount of multiplicative rate the related
 *   user will life steal HP/MP from its target relative to the damage dealt.
 *   This is a percentile value and stacks multiplicatively.
 *
 *   --- --- ---
 *
 *   <Custom HP Life Steal Physical Flat>
 *    flat = user.mhp;
 *   </Custom HP Life Steal Physical Flat>
 *
 *   <Custom HP Life Steal Magical Flat>
 *    flat = user.mhp;
 *   </Custom HP Life Steal Magical Flat>
 *
 *   <Custom HP Life Steal Certain Flat>
 *    flat = user.mhp;
 *   </Custom HP Life Steal Certain Flat>
 *
 *   <Custom MP Life Steal Physical Flat>
 *    flat = user.mhp;
 *   </Custom MP Life Steal Physical Flat>
 *
 *   <Custom MP Life Steal Magical Flat>
 *    flat = user.mhp;
 *   </Custom MP Life Steal Magical Flat>
 *
 *   <Custom MP Life Steal Certain Flat>
 *    flat = user.mhp;
 *   </Custom MP Life Steal Certain Flat>
 *   The 'flat' variable is the bonus amount of flat bonus the related user
 *   will life steal HP/MP from its target relative to the damage dealt. This
 *   is a flat bonus value and stacks additively.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.04:
 * - Bypass the isDevToolsOpen() error when bad code is inserted into a script
 * call or custom Lunatic Mode code segment due to updating to MV 1.6.1.
 *
 * Version 1.03:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.02:
 * - Lunatic Mode fail safes added.
 *
 * Version 1.01:
 * - Updated for RPG Maker MV version 1.1.0.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_LifeSteal');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.LSHPOver = eval(String(Yanfly.Parameters['Enable HP Overheal']));
Yanfly.Param.LSMPOver = eval(String(Yanfly.Parameters['Enable MP Overheal']));

Yanfly.Param.LSHPNeg = eval(String(Yanfly.Parameters['Negative HP LifeSteal']));
Yanfly.Param.LSMPNeg = eval(String(Yanfly.Parameters['Negative MP LifeSteal']));

//=============================================================================
// DataManager
//=============================================================================

Yanfly.LS.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.LS.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_LifeSteal) {
    this.processLSNotetags1($dataActors);
    this.processLSNotetags1($dataClasses);
    this.processLSNotetags1($dataEnemies);
    this.processLSNotetags1($dataWeapons);
    this.processLSNotetags1($dataArmors);
    this.processLSNotetags1($dataStates);
    this.processLSNotetags2($dataSkills);
    this.processLSNotetags2($dataItems);
    Yanfly._loaded_YEP_LifeSteal = true;
  }
  return true;
};

DataManager.processLSNotetags1 = function(group) {
  var noteA1 = /<(.*)[ ]LIFE STEAL[ ](.*):[ ]([\+\-]\d+)([%％])>/i;
  var noteA2 = /<(.*)[ ]LIFE STEAL[ ](.*):[ ]([\+\-]\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.lifeSteal = {
      hpPhysicalRate: 0,
      hpMagicalRate: 0,
      hpCertainRate: 0,
      hpPhysicalFlat: 0,
      hpMagicalFlat: 0,
      hpCertainFlat: 0,

      mpPhysicalRate: 0,
      mpMagicalRate: 0,
      mpCertainRate: 0,
      mpPhysicalFlat: 0,
      mpMagicalFlat: 0,
      mpCertainFlat: 0,

      allGuard: false,
      hpGuard: false,
      mpGuard: false,

      allNull: false,
      hpNull: false,
      mpNull: false
    }
    var evalMode = 'none';
    var evalKey = '';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(noteA1)) {
        var type = String(RegExp.$1);
        var hit = String(RegExp.$2);
        var value = parseFloat(RegExp.$3) * 0.01;
        this.makeLifeStealKey(obj, type, hit, 'Rate', value);
      } else if (line.match(noteA2)) {
        var type = String(RegExp.$1);
        var hit = String(RegExp.$2);
        var value = parseInt(RegExp.$3);
        this.makeLifeStealKey(obj, type, hit, 'Flat', value);
      } else if (line.match(/<CUSTOM[ ](.*)[ ]LIFE STEAL[ ](.*)[ ](.*)>/i)) {
        var type = String(RegExp.$1).toLowerCase();
        var hit = String(RegExp.$2);
        var param = String(RegExp.$3);
        if (hit.match(/physical/i)) {
          hit = 'Physical';
        } else if (hit.match(/magical/i)) {
          hit = 'Magical';
        } else if (hit.match(/certain/i)) {
          hit = 'Certain';
        } else {
          continue;
        }
        if (param.match(/rate/i)) {
          param = 'Rate';
        } else if (param.match(/flat/i)) {
          param = 'Flat';
        } else {
          continue;
        }
        evalMode = 'custom lifesteal';
        evalKey = type + hit + param + 'Eval';
        obj.lifeSteal[evalKey] = '';
      } else if (line.match(/<\/CUSTOM[ ](.*)[ ]LIFE STEAL[ ](.*)[ ](.*)>/i)) {
        evalMode = 'none';
        evalKey = '';
      } else if (evalMode === 'custom lifesteal') {
        obj.lifeSteal[evalKey] = obj.lifeSteal[evalKey] + line + '\n';
      } else if (line.match(/<GUARD LIFE STEAL>/i)) {
        obj.lifeSteal['allGuard'] = true;
      } else if (line.match(/<GUARD HP LIFE STEAL>/i)) {
        obj.lifeSteal['hpGuard'] = true;
      } else if (line.match(/<GUARD MP LIFE STEAL>/i)) {
        obj.lifeSteal['mpGuard'] = true;
      } else if (line.match(/<CANCEL LIFE STEAL>/i)) {
        obj.lifeSteal['allNull'] = true;
      } else if (line.match(/<CANCEL HP LIFE STEAL>/i)) {
        obj.lifeSteal['hpNull'] = true;
      } else if (line.match(/<CANCEL MP LIFE STEAL>/i)) {
        obj.lifeSteal['mpNull'] = true;
      }
    }
  }
};

DataManager.makeLifeStealKey = function(obj, type, hit, param, value) {
    type = type.toLowerCase();
    if (!['hp', 'mp'].contains(type)) return;
    if (hit.match(/physical/i)) {
      hit = 'Physical';
    } else if (hit.match(/magical/i)) {
      hit = 'Magical';
    } else if (hit.match(/certain/i)) {
      hit = 'Certain';
    } else {
      return;
    }
    var key = type + hit + param;
    obj.lifeSteal[key] = value;
};

DataManager.processLSNotetags2 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.lifeSteal = {
      rate: 0,
      flat: 0,
      
      allNull: false,
      hpNull: false,
      mpNull: false
    }
    var evalMode = 'none';
    var evalKey = '';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(.*)[ ]LIFE STEAL:[ ](\d+)([%％])>/i)) {
        var type = String(RegExp.$1).toLowerCase();
        var value = parseFloat(RegExp.$2) * 0.01;
        var key = type + 'Rate';
        obj.lifeSteal[key] = value;
      } else if (line.match(/<(.*)[ ]LIFE STEAL:[ ](\d+)>/i)) {
        var type = String(RegExp.$1).toLowerCase();
        var value = parseInt(RegExp.$2);
        var key = type + 'Flat';
        obj.lifeSteal[key] = value;
      } else if (line.match(/<CUSTOM[ ](.*)[ ]LIFE STEAL[ ](.*)>/i)) {
        var type = String(RegExp.$1).toLowerCase();
        var param = String(RegExp.$2);
        if (param.match(/rate/i)) {
          param = 'Rate';
        } else if (param.match(/flat/i)) {
          param = 'Flat';
        } else {
          continue;
        }
        evalMode = 'custom lifesteal';
        evalKey = type + param + 'Eval';
        obj.lifeSteal[evalKey] = '';
      } else if (line.match(/<\/CUSTOM[ ](.*)[ ]LIFE STEAL[ ](.*)>/i)) {
        evalMode = 'none';
        evalKey = '';
      } else if (evalMode === 'custom lifesteal') {
        obj.lifeSteal[evalKey] = obj.lifeSteal[evalKey] + line + '\n';
      } else if (line.match(/<CANCEL LIFE STEAL>/i)) {
        obj.lifeSteal['allNull'] = true;
      } else if (line.match(/<CANCEL HP LIFE STEAL>/i)) {
        obj.lifeSteal['hpNull'] = true;
      } else if (line.match(/<CANCEL MP LIFE STEAL>/i)) {
        obj.lifeSteal['mpNull'] = true;
      }
    }
  }
};

//=============================================================================
// Game_Battler
//=============================================================================

Game_Battler.prototype.lifeSteal = function(damage, type, target, rate, flat) {
    if (!type) return;
    rate = 1 - (rate || 0);
    flat = flat || 0;
    rate *= 1 - this.getLifeStealRate(type + 'Rate', target);
    flat += this.getLifeStealFlat(type + 'Flat', target);
    if (Yanfly.Param.LSHPNeg) {
      var lifeSteal = Math.floor(damage * (1 - rate) + flat);
    } else {
      var lifeSteal = Math.max(0, Math.floor(damage * (1 - rate) + flat));
    }
    if (Yanfly.Param.LSHPOver) lifeSteal = Math.min(lifeSteal, damage);
    if (lifeSteal <= 0) return;
    this.gainHp(lifeSteal);
};

Game_Battler.prototype.magicSteal = function(damage, type, target, rate, flat) {
    if (!type) return;
    rate = 1 - (rate || 0);
    flat = flat || 0;
    rate *= 1 - this.getLifeStealRate(type + 'Rate', target);
    flat += this.getLifeStealFlat(type + 'Flat', target);
    if (Yanfly.Param.LSMPNeg) {
      var lifeSteal = Math.floor(damage * (1 - rate) + flat);
    } else {
      var lifeSteal = Math.max(0, Math.floor(damage * (1 - rate) + flat));
    }
    if (Yanfly.Param.LSMPOver) lifeSteal = Math.min(lifeSteal, damage);
    if (lifeSteal <= 0) return;
    this.gainMp(lifeSteal);
};

Game_Battler.prototype.getLifeStealRate = function(type, target) {
    rate = 1;
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.states()[i];
      if (obj && obj.lifeSteal && obj.lifeSteal[type]) {
        rate *= (1 - obj.lifeSteal[type]);
      }
      if (obj && obj.lifeSteal && obj.lifeSteal[type + 'Eval']) {
        var formula = obj.lifeSteal[type + 'Eval'];
        rate *= (1 - this.getLifeStealRateEval(formula, target));
      }
    }
    return 1 - rate;
};

Game_Battler.prototype.getLifeStealFlat = function(type, target) {
    value = 0;
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.states()[i];
      if (obj && obj.lifeSteal && obj.lifeSteal[type]) {
        value += obj.lifeSteal[type];
      }
      if (obj && obj.lifeSteal && obj.lifeSteal[type + 'Eval']) {
        var formula = obj.lifeSteal[type + 'Eval'];
        value += this.getLifeStealFlatEval(formula, target);
      }
    }
    return value;
};

Game_Battler.prototype.getLifeStealRateEval = function(formula, target) {
    target = target || this;
    var rate = 0;
    var a = this;
    var user = this;
    var subject = this;
    var b = target;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    try {
      eval(formula);
    } catch (e) {
      Yanfly.Util.displayError(e, formula, 'LIFE STEAL RATE FORMULA ERROR');
    }
    return rate;
};

Game_Battler.prototype.getLifeStealFlatEval = function(formula, target) {
    target = target || this;
    var flat = 0;
    var a = this;
    var user = this;
    var subject = this;
    var b = target;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    try {
      eval(formula);
    } catch (e) {
      Yanfly.Util.displayError(e, formula, 'LIFE STEAL FLAT FORMULA ERROR');
    }
    return flat;
};

Game_Battler.prototype.isLifeStealState = function(type) {
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.states()[i];
      if (obj && obj.lifeSteal && obj.lifeSteal[type]) return true;
    }
    return false;
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.getLifeStealRate = function(type, target) {
    rate = 1 - Game_Battler.prototype.getLifeStealRate.call(this, type, target);
    var length = this.equips().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.equips()[i];
      if (obj && obj.lifeSteal && obj.lifeSteal[type]) {
        rate *= (1 - obj.lifeSteal[type]);
      }
      if (obj && obj.lifeSteal && obj.lifeSteal[type + 'Eval']) {
        var formula = obj.lifeSteal[type + 'Eval'];
        rate *= (1 - this.getLifeStealRateEval(formula, target));
      }
    }
    rate *= (1 - this.actor().lifeSteal[type]);
    if (this.actor().lifeSteal[type + 'Eval']) {
      var formula = this.actor().lifeSteal[type + 'Eval'];
      rate *= (1 - this.getLifeStealRateEval(formula, target));
    }
    rate *= (1 - this.currentClass().lifeSteal[type]);
    if (this.currentClass().lifeSteal[type + 'Eval']) {
      var formula = this.currentClass().lifeSteal[type + 'Eval'];
      rate *= (1 - this.getLifeStealRateEval(formula, target));
    }
    return 1 - rate;
};

Game_Actor.prototype.getLifeStealFlat = function(type, target) {
    value = Game_Battler.prototype.getLifeStealFlat.call(this, type, target);
    var length = this.equips().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.equips()[i];
      if (obj && obj.lifeSteal && obj.lifeSteal[type]) {
        value += obj.lifeSteal[type];
      }
      if (obj && obj.lifeSteal && obj.lifeSteal[type + 'Eval']) {
        var formula = obj.lifeSteal[type + 'Eval'];
        value += this.getLifeStealFlatEval(formula, target);
      }
    }
    value += this.actor().lifeSteal[type];
    if (this.actor().lifeSteal[type + 'Eval']) {
      var formula = this.actor().lifeSteal[type + 'Eval'];
      value += this.getLifeStealFlatEval(formula, target);
    }
    value += this.currentClass().lifeSteal[type];
    if (this.currentClass().lifeSteal[type + 'Eval']) {
      var formula = this.currentClass().lifeSteal[type + 'Eval'];
      value += this.getLifeStealFlatEval(formula, target);
    }
    return value;
};

Game_Actor.prototype.isLifeStealState = function(type) {
    if (Game_Battler.prototype.isLifeStealState.call(this, type)) return true;
    var length = this.equips().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.equips()[i];
      if (obj && obj.lifeSteal && obj.lifeSteal[type]) return true;
    }
    if (this.actor().lifeSteal[type]) return true;
    if (this.currentClass().lifeSteal[type]) return true;
    return false;
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.getLifeStealRate = function(type, target) {
    rate = 1 - Game_Battler.prototype.getLifeStealRate.call(this, type, target);
    rate *= (1 - this.enemy().lifeSteal[type]);
    if (this.enemy().lifeSteal[type + 'Eval']) {
      var formula = this.enemy().lifeSteal[type + 'Eval'];
      rate *= (1 - this.getLifeStealRateEval(formula, target));
    }
    return 1 - rate;
};

Game_Enemy.prototype.getLifeStealFlat = function(type, target) {
    value = Game_Battler.prototype.getLifeStealFlat.call(this, type, target);
    value += this.enemy().lifeSteal[type];
    if (this.enemy().lifeSteal[type + 'Eval']) {
      var formula = this.enemy().lifeSteal[type + 'Eval'];
      value += this.getLifeStealFlatEval(formula, target);
    }
    return value;
};

Game_Enemy.prototype.isLifeStealState = function(type) {
    if (Game_Battler.prototype.isLifeStealState.call(this, type)) return true;
    if (this.enemy().lifeSteal[type]) return true;
    return false;
};

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.LS.Game_Action_executeHpDamage = Game_Action.prototype.executeHpDamage;
Game_Action.prototype.executeHpDamage = function(target, value) {
    Yanfly.LS.Game_Action_executeHpDamage.call(this, target, value);
    var damage = target._result.hpDamage;
    this.performLifeSteal(damage, target, value);
};

Yanfly.LS.Game_Action_executeMpDamage = Game_Action.prototype.executeMpDamage;
Game_Action.prototype.executeMpDamage = function(target, value) {
    Yanfly.LS.Game_Action_executeMpDamage.call(this, target, value);
    var damage = target._result.mpDamage;
    this.performLifeSteal(damage, target, value);
};

Game_Action.prototype.canLifeStealHp = function(damage, target, value) {
    if (this.item().lifeSteal) {
      if (this.item().lifeSteal['allNull']) return false;
      if (this.item().lifeSteal['hpNull']) return false;
    }
    if (this.subject().isLifeStealState('allNull')) return false;
    if (this.subject().isLifeStealState('hpNull')) return false;
    if (target.isLifeStealState('allGuard')) return false;
    if (target.isLifeStealState('hpGuard')) return false;
    return damage > 0;
};

Game_Action.prototype.canLifeStealMp = function(damage, target, value) {
    if (this.item().lifeSteal) {
      if (this.item().lifeSteal['allNull']) return false;
      if (this.item().lifeSteal['mpNull']) return false;
    }
    if (this.subject().isLifeStealState('allNull')) return false;
    if (this.subject().isLifeStealState('mpNull')) return false;
    if (target.isLifeStealState('allGuard')) return false;
    if (target.isLifeStealState('mpGuard')) return false;
    return damage > 0;
};

Game_Action.prototype.performLifeSteal = function(damage, target, value) {
    this.performHpLifeSteal(damage, target, value);
    this.performMpLifeSteal(damage, target, value);
};

Game_Action.prototype.performHpLifeSteal = function(damage, target, value) {
    if (this.canLifeStealHp(damage, target, value)) {
      var rate = this.getLifeStealRate(target, value, 'hp');
      var flat = this.getLifeStealFlat(target, value, 'hp');
      if (this.isPhysical()) {
        this.subject().lifeSteal(damage, 'hpPhysical', target, rate, flat);
      } else if (this.isMagical()) {
        this.subject().lifeSteal(damage, 'hpMagical', target, rate, flat);
      } else if (this.isCertainHit()) {
        this.subject().lifeSteal(damage, 'hpCertain', target, rate, flat);
      }
    }
};

Game_Action.prototype.performMpLifeSteal = function(damage, target, value) {
    if (this.canLifeStealMp(damage, target, value)) {
      var rate = this.getLifeStealRate(target, value, 'mp');
      var flat = this.getLifeStealFlat(target, value, 'mp');
      if (this.isPhysical()) {
        this.subject().magicSteal(damage, 'mpPhysical', target, rate, flat);
      } else if (this.isMagical()) {
        this.subject().magicSteal(damage, 'mpMagical', target, rate, flat);
      } else if (this.isCertainHit()) {
        this.subject().magicSteal(damage, 'mpCertain', target, rate, flat);
      }
    }
};

Game_Action.prototype.getLifeStealRate = function(target, value, type) {
    var rate = 1;
    if (this.item().lifeSteal[type + 'Rate']) {
      rate *= 1 - this.item().lifeSteal[type + 'Rate'];
    }
    if (this.item().lifeSteal[type + 'RateEval']) {
      var formula = this.item().lifeSteal[type + 'RateEval'];
      rate *= 1 - this.getLifeStealRateEval(formula, target, value);
    }
    return 1 - rate;
};

Game_Action.prototype.getLifeStealFlat = function(target, value, type) {
    var flat = 0;
    if (this.item().lifeSteal[type + 'Flat']) {
      flat += this.item().lifeSteal[type + 'Flat'];
    }
    if (this.item().lifeSteal[type + 'RateFlat']) {
      var formula = this.item().lifeSteal[type + 'RateFlat'];
      flat += this.getLifeStealFlatEval(formula, target, value);
    }
    return flat;
};

Game_Action.prototype.getLifeStealRateEval = function(formula, target, value) {
    var rate = 0;
    var a = this.subject();
    var user = this.subject();
    var subject = this.subject();
    var b = target;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var damage = value;
    var item = this.item();
    var skill = this.item();
    try {
      eval(formula);
    } catch (e) {
      Yanfly.Util.displayError(e, formula, 'LIFE STEAL RATE FORMULA ERROR');
    }
    return rate;
};

Game_Action.prototype.getLifeStealFlatEval = function(formula, target, value) {
    var flat = 0;
    var a = this.subject();
    var user = this.subject();
    var subject = this.subject();
    var b = target;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var damage = value;
    var item = this.item();
    var skill = this.item();
    try {
      eval(formula);
    } catch (e) {
      Yanfly.Util.displayError(e, formula, 'LIFE STEAL FLAT FORMULA ERROR');
    }
    return flat;
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.displayError = function(e, code, message) {
  console.log(message);
  console.log(code || 'NON-EXISTENT');
  console.error(e);
  if (Utils.RPGMAKER_VERSION && Utils.RPGMAKER_VERSION >= "1.6.0") return;
  if (Utils.isNwjs() && Utils.isOptionValid('test')) {
    if (!require('nw.gui').Window.get().isDevToolsOpen()) {
      require('nw.gui').Window.get().showDevTools();
    }
  }
};

//=============================================================================
// End of File
//=============================================================================
