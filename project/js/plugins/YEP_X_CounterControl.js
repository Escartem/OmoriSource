//=============================================================================
// Yanfly Engine Plugins - Battle Engine Extension - Counter Control
// YEP_X_CounterControl.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_CounterControl = true;

var Yanfly = Yanfly || {};
Yanfly.Counter = Yanfly.Counter || {};
Yanfly.Counter.version = 1.08;

//=============================================================================
 /*:
 * @plugindesc v1.08 (Requires YEP_BattleEngineCore.js) Gives you more
 * control over how counters work in RPG Maker MV!
 * @author Yanfly Engine Plugins
 *
 * @param ---General---
 * @default
 *
 * @param Queue Max
 * @parent ---General---
 * @type number
 * @min 1
 * @desc What's the maximum size for the counter queue?
 * @default 20
 *
 * @param ---Default Traits---
 * @default
 *
 * @param Counter Skill
 * @parent ---Default Traits---
 * @type number
 * @min 1
 * @desc This is the default skill used for counterattacks.
 * Insert the skill ID here. Use 0 for the MV default.
 * @default 1
 *
 * @param Evade Counter
 * @parent ---Default Traits---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Counter skills to evade, then counter by default?
 * NO - false     YES - true
 * @default false
 *
 * @param Counter Name
 * @parent ---Default Traits---
 * @desc The default counter skill name used per skill.
 * %1 - Skill Name
 * @default Counter-%1
 *
 * @param Counter Icon
 * @parent ---Default Traits---
 * @type number
 * @min 0
 * @desc The icon ID used for counter attacks. Leave at 0
 * to use the default skill's icon.
 * @default 78
 *
 * @param Counter Total
 * @parent ---Default Traits---
 * @desc Default amount of counters per actor and enemy.
 * @default 1
 *
 * @param Ally Counter
 * @parent ---Default Traits---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Allow allies to counter the actions of other allies?
 * NO - false     YES - true
 * @default false
 *
 * @param ---Default Conditions---
 * @default
 *
 * @param Physical
 * @parent ---Default Conditions---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Require the countered action to be physical?
 * NO - false     YES - true
 * @default true
 *
 * @param Single Target
 * @parent ---Default Conditions---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Require the countered action scope to be single target?
 * NO - false     YES - true
 * @default true
 *
 * @param Not Counter
 * @parent ---Default Conditions---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Require the countered action to not be a counter?
 * NO - false     YES - true
 * @default false
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires YEP_BattleEngineCore. Make sure this plugin is located
 * under YEP_BattleEngineCore in the plugin list.
 *
 * If you are using Imported.YEP_X_BattleSysATB or Imported.YEP_X_BattleSysCTB,
 * place this plugin under those plugins in the plugin list.
 *
 * The default counterattack trait in RPG Maker MV doesn't give many options
 * for the developer. It's a skill that flatout cancels out the physical skill
 * of the attacker by evading it and then producing a normal attack from the
 * counterattacker. This plugin will give you more control over how counters
 * work in the sense that you can choose to have the counter connect first
 * before allowing the counter skill to proc.
 *
 * ============================================================================
 * Instructions - How Advanced Counters Work
 * ============================================================================
 *
 * A counterattack is an action that serves as a reaction to an action used by
 * an opposing battler unless the action is marked as able of being countered
 * by allied members.
 *
 * Now begins a clash between the attacker's anti-counter stat (newly added)
 * against the target's counter stat plus any of the action's modifiers. Once
 * the finalized counter rate is decided, a random number check is made to see
 * if the counter will pass. If it doesn't, no counter will occur. If it does,
 * the next step occurs.
 *
 * The target will then generate a pool of skills it can use as counters. It
 * will go in a priority list mentioned in the next section below. The battle
 * system will then go through the pool of skills in order and select the first
 * counter skill that meets all of the conditions required. If no skill is
 * selected, no skill will be used as a counter. All skills have a mandatory
 * requirement of being able to pay the skill's cost and can use it.
 *
 * Once the skill is selected, the counter skill is placed in the counter queue
 * and waits for the current attacker's turn to be over. Once over, the actions
 * in the counter queue will begin. The counterattacker will perform counter
 * actions without conflicting with their own turns. This process will repeat
 * itself until the counter queue is emptied.
 *
 * During the counter queue process, counter skills can trigger counter skills,
 * too. For that reason, there is a maximum queue size determined by the plugin
 * parameters. Once the queue count reaches this size, no more counter skills
 * will be added to the counter queue.
 *
 * ============================================================================
 * Instructions - Counter Skill Priority List
 * ============================================================================
 *
 * When the pool of counter skills is being generated, they will be generated
 * in the following order:
 *
 * 1. States - Highest Priority Notebox
 * 2. States - Lowest Priority Notebox
 * 3. Equipment - Weapons Notebox
 * 4. Equipment - Armors Notebox
 * 5. Actor - Current Class Notebox
 * 6. Actor - Actor Notebox
 * 7. Enemy - Enemy Notebox
 *
 * The order of the pool of counter skills matter in that when going through
 * the conditions of the counter skill to be used, the first counter skill
 * whose condition is met will be the one used.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * You can use the following notetags to alter counters in your game. Each of
 * these notetags will alter counters in a particular way.
 *
 * Actor and Enemy Notetags:
 *
 *   <Default Counter: x>
 *   <Default Counter: name>
 *   Sets the default counter skill to x. If it is left as 0, then the counter
 *   skill will be RPG Maker MV's default counter skill. If you are using the
 *   name of the skill, and there are multiple skills in the database with the
 *   same name, then priority will be given to the skill with the highest ID.
 *   *Note: Use 0 for x if you wish to add RPG Maker MV's default counter.
 *
 * Actor, Class, Enemy, Weapon, Armor, and State Notetags:
 *
 *   <Counter Skills: x>
 *   <Counter Skills: x, x, x>
 *   <Counter Skills: x to y>
 *   This will add to the list of possible counter skills for the battler.
 *   If multiple skill ID's are listed, then they're all added. Priority will
 *   be given to the counter skills listed earlier.
 *   *Note: Use 0 for x if you wish to add RPG Maker MV's default counter.
 *   *Note2: See the Counter List priority to see which skills will be given
 *   priority on the counter skill list.
 *
 *   <Counter Skill: name>
 *   This will add the named skill to the list of possible counter skills for
 *   the battler. If there are multiple skills in the database with the same
 *   name, then priority will be given to the skill with the highest ID.
 *   *Note: See the Counter List priority to see which skills will be given
 *   priority on the counter skill list.
 *
 *   <Counter Total: +x>
 *   <Counter Total: -x>
 *   Alters the number of times the battler can counter by x. This is the
 *   amount of times the battler can counter until the battler's turn comes up
 *   at which, the number of times is reset.
 *
 *   <Target Counter: x%>
 *   When this battler attacks an opponent target, this will cause the target
 *   counter rate to be altered by x% rate. If a target has 10% CNT, then a
 *   notetag of 50% will cause the counter rate to become 5%.
 *
 *   <Target Counter: +x%>
 *   <Target Counter: -x%>
 *   When this battler attacks an opponent target, this will cause the target
 *   counter rate to increase or decrease by x%. If a target has 10% CNT, then
 *   a notetag of +50% will cause the counter rate to become +60%.
 *
 *   <Evade Counter>
 *   This will change all counter skills used by the related battler to become
 *   evade counters regardless of their default nature. However, if the battler
 *   is affected by a trait that is <Hit Counter>, then priority will be given
 *   to the <Hit Counter> trait instead.
 *
 *   <Hit Counter>
 *   This will change all counter skills used by the related battler to become
 *   hit counters regardless of their default nature. If the battler is also
 *   affected by <Evade Counter>, this effect will take priority.
 *
 * Skill and Item Notetags:
 *
 *   <Ally Counter>
 *   Makes this action able to proc counter skills by allied members.
 *
 *   <Ally Cannot Counter>
 *   Makes this action unable to proc counter skills by allied members.
 *
 *   <Cannot Counter>
 *   Causes this action to be un-counterable. This means that it will always
 *   return a 0% counterattack possibility.
 *
 *   <Counter Rate: x%>
 *   This will cause this action to proc a counter from the target by x% rate.
 *   This means if the target has a 10% chance to counter and this notetag is
 *   50%, then the target will have a 5% chance to counter.
 *
 *   <Counter Rate: +x%>
 *   <Counter Rate: -x%>
 *   This will cause this action to proc a counter from the target by an
 *   additive x%. This means if the target has a 10% chance to counter and this
 *   notetag is +50%, then the target has a 60% chance to counter.
 *
 * Skill Notetags:
 *
 *   <Evade Counter>
 *   If this skill is being used as the counter skill, the battler will evade
 *   the current action and then counter.
 *
 *   <Hit Counter>
 *   If this skill is being used as the counter skill, the battler will take
 *   the hit against the current action and then counter.
 *
 *   <Counter Name: text>
 *   This changes the displayed name of the skill when used as a counter skill
 *   to 'text'.
 *
 *   <Counter Icon: x>
 *   This changes the displayed icon of the skill when used as a counter skill
 *   to x icon.
 *
 * ============================================================================
 * Notetags - Counter Conditions
 * ============================================================================
 *
 * When making your counter skills, you can have those counter skills respond
 * only to specific conditions. If all conditions are met, the counter skill
 * will occur. If a single condition isn't met, that counter skill will then be
 * skipped and the next one will be checked. To add counter conditions, use the
 * following notetags:
 *
 * Skill Notetags:
 *
 *   <Counter Condition>
 *    condition
 *    condition
 *   </Counter Condition>
 *   Replace the 'condition' text in between the notetags with the listed in
 *   the conditions list below to best fit what you want.
 *
 * --- Example ---
 *
 *   <Counter Condition>
 *    physical hit
 *    single target
 *   </Counter Condition>
 *   This skill will only be used as a counter skill if the current action is
 *   a physical hit that's single target.
 *
 * ============================================================================
 * Counter Condition List
 * ============================================================================
 *
 * Here is a list of all the counter conditions that come with this plugin that
 * you can use. Keep in mind that all of the counter conditions must be met
 * before a counter will take effect. If even a single counter condition fails
 * to be met, the counter skill will not proc.
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * ATTACKER param eval
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Replace 'param' with 'level', 'maxhp', 'hp', 'maxmp', 'mp', 'atk', 'def',
 * 'mat', 'mdf', 'agi', or 'luk'. This will run a check against the attacker's
 * parameter. If the check returns 'true', the counter condition is met. If it
 * returns 'false', the counter condition isn't met.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Attacker level > 50
 *            Attacker hp <= attacker.mhp * 0.50
 *            Attacker atk > defender.def
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * CERTAIN HIT
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If the current action used against the target is a certain hit, the counter
 * condition is met. If it isn't, the counter condition isn't met.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Certain Hit
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * COUNTER HIT
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If the current action used against the target is a counter skill, the
 * counter condition is met. If it isn't, the counter condition isn't met.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Counter Hit
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * DEFENDER param eval
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Replace 'param' with 'level', 'maxhp', 'hp', 'maxmp', 'mp', 'atk', 'def',
 * 'mat', 'mdf', 'agi', or 'luk'. This will run a check against the defender's
 * parameter. If the check returns 'true', the counter condition is met. If it
 * returns 'false', the counter condition isn't met.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Defender level > 50
 *            Defender hp <= defender.mhp * 0.50
 *            Defender atk > attacker.def
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * ELEMENT: x
 * ELEMENT: name
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If the current action used against the target has element X attached to it,
 * the counter condition is met. If it isn't, the counter condition isn't met.
 * Replace 'x' with the element ID or the element name in the database system
 * tab. If multiple elements share the same name, priority will be given to the
 * element with the highest ID.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Element: 4
 *            Element: Fire
 *            Element: Ice
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * EVAL: code
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * For those with JavaScript experience, you can use the above line to perform
 * an eval check to see if the conditions are met for the counter skill. If the
 * eval check returns 'true', the condition is met. If it returns 'false', the
 * condition isn't met.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Eval: attacker.name() === 'Harold'
 *            Eval: defender.hpRate() <= 0.50
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * ITEM: x
 * ITEM: name
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If the current aciton used against the target is item x, the counter
 * condition is met. If it isn't, the counter condition isn't met. Replace 'x'
 * with the item ID. If you choose to use the item name, and your database
 * has multiple items with the same name, priority will be given to the item
 * with the highest ID.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Item: 30
 *            Item: Bomb
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * MAGICAL HIT
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If the current action used against the target is a magical hit, the counter
 * condition is met. If it isn't, the counter condition isn't met.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Magical Hit
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * MULTI TARGET
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If the current action used against the target is a multi target action, the
 * counter condition is met. If it isn't, the counter condition isn't met.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Multi Target
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * NOT CERTAIN HIT
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If the current action used against the target is NOT certain hit, the
 * counter condition is met. If it is, the counter condition isn't met.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Not Certain Hit
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * NOT COUNTER HIT
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If the current action used against the target is NOT a counter skill, the
 * counter condition is met. If it is, the counter condition isn't met.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Not Counter Hit
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * NOT ELEMENT: x
 * NOT ELEMENT: name
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If the current action used against the target has element X attached to it,
 * the counter condition is NOT met. If it isn't, the counter condition is met.
 * Replace 'x' with the element ID or the element name in the database system
 * tab. If multiple elements share the same name, priority will be given to the
 * element with the highest ID.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Not Element: 4
 *            Not Element: Fire
 *            Not Element: Ice
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * NOT ITEM: x
 * NOT ITEM: name
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If the current aciton used against the target is NOT item x, the counter
 * condition is met. If it is, the counter condition isn't met. Replace 'x'
 * with the item ID. If you choose to use the item name, and your database
 * has multiple items with the same name, priority will be given to the item
 * with the highest ID.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Not Item: 30
 *            Not Item: Bomb
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * NOT MAGICAL HIT
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If the current action used against the target is NOT a magical hit, the
 * counter condition is met. If it is, the counter condition isn't met.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Not Magical Hit
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * NOT PHYSICAL HIT
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If the current action used against the target is NOT a physical hit, the
 * counter condition is met. If it is, the counter condition isn't met.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Not Physical Hit
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * NOT SKILL: x
 * NOT SKILL: name
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If the current aciton used against the target is NOT skill x, the counter
 * condition is met. If it is, the counter condition isn't met. Replace 'x'
 * with the skill ID. If you choose to use the skill name, and your database
 * has multiple skills with the same name, priority will be given to the skill
 * with the highest ID.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Not Skill: 50
 *            Not Skill: Firaga
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * NOT STYPE: x
 * NOT STYPE: name
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If the current action used against the target is NOT a skill and skill type
 * x, the counter condition is met. If it isn't the counter condition isn't
 * met. Replace 'x' with the Skill Type ID. If you choose to use the skill type
 * name and your database has multiple skill types with the same name, priority
 * will be given to the skill type with the highest ID.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Not Stype: 1
 *            Not Stype: Magic
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * PHYSICAL HIT
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If the current action used against the target is a physical hit, the counter
 * condition is met. If it isn't, the counter condition isn't met.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Physical Hit
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * RANDOM: x%
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This will run a random check. There is a x% chance that this counter check
 * will pass. If it passes, the counter condition is met. If it doesn't, the
 * counter condition isn't met.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Random: 30%
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * SINGLE TARGET
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If the current action used against the target is a single target action, the
 * counter condition is met. If it isn't, the counter condition isn't met.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Single Target
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * SKILL: x
 * SKILL: name
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If the current aciton used against the target is skill x, the counter
 * condition is met. If it isn't, the counter condition isn't met. Replace 'x'
 * with the skill ID. If you choose to use the skill name, and your database
 * has multiple skills with the same name, priority will be given to the skill
 * with the highest ID.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Skill: 50
 *            Skill: Firaga
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * STYPE: x
 * STYPE: name
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If the current action used against the target is a skill and skill type x,
 * the counter condition is met. If it isn't the counter condition isn't met.
 * Replace 'x' with the Skill Type ID. If you choose to use the skill type name
 * and your database has multiple skill types with the same name, priority will
 * be given to the skill type with the highest ID.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Stype: 1
 *            Stype: Magic
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * SWITCH x OFF
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If switch x is OFF (false) prior to the current action being used against
 * the target, the counter condition is met. If it is ON (true), the counter
 * condition isn't met.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Switch 10 Off
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * SWITCH x ON
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * If switch x is ON (ftrue) prior to the current action being used against
 * the target, the counter condition is met. If it is OFF (false), the counter
 * condition isn't met.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Switch 10 On
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 * VARIABLE x eval
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * This runs an eval check against variable x. If the eval check returns 'true'
 * the condition is met. If it returns 'false' then the condition isn't met.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Example:   Variable 15 >= 15
 *            Variable 16 <= 20
 *            Variable 17 === $gameParty.aliveMembers().length
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
 *
 * ============================================================================
 * Lunatic Mode - Custom Counter Skills
 * ============================================================================
 *
 * For those with JavaScript proficiency, you can use the following Lunatic
 * Mode notetags to give a dynamic set of skills granted for counter usage.
 *
 * Actor, Class, Enemy, Weapon, Armor, and State Notetags:
 *
 *   <Custom Counter Skills>
 *    if (user.name() === 'Harold') {
 *      skills.push(50, 51, 52);
 *    } else if (user.name() === 'Therese') {
 *      skills.push(53, 54, 55);
 *    } else if (user.name() === 'Marsha') {
 *      skills.push(56, 57, 58);
 *    } else if (user.name() === 'Lucius') {
 *      skills.push(59, 60, 61);
 *    }
 *   </Custom Counter Skills>
 *   The 'skills' variable is an array that will contain all the counter skills
 *   that will be added to the list of potential skills the battler can counter
 *   actions with provided that their requirements are met.
 *
 * ============================================================================
 * Lunatic Mode - Custom Counter Total
 * ============================================================================
 *
 * For those with JavaScript proficiency, you can use the following Lunatic
 * Mode notetags to give a dynamic counter total bonus:
 *
 * Actor, Class, Enemy, Weapon, Armor, and State Notetags:
 *
 *   <Custom Counter Total>
 *    value = user.level;
 *   </Custom Counter Total>
 *   The 'value' variable is the total amount of counters is increased or
 *   decreased by. If the total counter value reaches 0 or less than 0 for the
 *   battler, the battler is unable to use counter skills.
 *
 * ============================================================================
 * Lunatic Mode - Custom Target Counter Rate
 * ============================================================================
 *
 * For those with JavaScript proficiency, you can use the following Lunatic
 * Mode notetags to make the attacker's traits alter the target's CNT rate.
 *
 * Actor, Class, Enemy, Weapon, Armor, and State Notetags:
 *
 *   <Custom Target Counter Rate>
 *    rate -= user.hpRate();
 *   </Custom Target Counter Rate>
 *   The 'rate' variable is the final rate used to determine the counter rate
 *   the target has. It is already given the value calculated from the target's
 *   CNT value. This is calculated before the skill's custom counter rate.
 *
 * ============================================================================
 * Lunatic Mode - Custom Counter Rates
 * ============================================================================
 *
 * For those with JavaScript proficiency, you can use the following Lunatic
 * Mode notetags to give skills a dynamic chance for the target to counter.
 *
 * Skill and Item Notetags:
 *
 *   <Custom Counter Rate>
 *    rate += target.hpRate();
 *   </Custom Counter Rate>
 *   The 'rate' variable is the final rate used to determine the counter rate
 *   the target has. It is already given the value calculated from the target's
 *   CNT value plus any additional counter rate modifiers from the skill. This
 *   is calculated after the attacker's custom target counter rate.
 *
 * ============================================================================
 * Lunatic Mode - Custom Counter Condition
 * ============================================================================
 *
 * For those with JavaScript proficiency, you can use the following Luantic
 * Mode notetags to give counter skills a custom counter condition. While you
 * can do the same with an Eval condition, this notetag is for those who prefer
 * to take control over everything at once.
 *
 * Skill Notetags:
 *
 *   <Custom Counter Condition>
 *    if (attacker.name() === 'Harold') {
 *      condition = true;
 *    } else if (defender.name() === 'Therese') {
 *      condition = true;
 *    } else {
 *      condition = false;
 *    }
 *   </Custom Counter Condition>
 *   The 'condition' variable determines whether or not the counter skill will
 *   pass or fail. If the 'condition' variable returns 'true', the condition is
 *   met. If the 'condition' variable returns 'false', the condition fails to
 *   be met. Once the condition is met, the rest of the <Counter Condition>
 *   conditions will be checked.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.08:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.07a:
 * - Lunatic Mode fail safes added.
 * - Optimization update
 * 
 * Version 1.06:
 * - Updated for RPG Maker MV version 1.3.2.
 *
 * Version 1.05:
 * - Fixed a bug that caused the Eval: condition to not work and crash.
 * - Fixed an issue that caused default counter attacks to trigger upon magical
 * actions.
 *
 * Version 1.04:
 * - Fixed a bug that caused counter-countered actions to no longer disappear
 * from queue.
 *
 * Version 1.03:
 * - Fixed a bug that caused enemies to get a free action after a counter in
 * the DTB engine.
 *
 * Version 1.02:
 * - Fixed a bug that didn't replace the proper skill for the countered battler
 * appropriate causing some action effects to not proc correctly.
 *
 * Version 1.01:
 * - Fixed a bug that caused the <Counter Skills: 0> notetag to not work.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Imported.YEP_BattleEngineCore) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_CounterControl');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.CounterMaxQueue = Number(Yanfly.Parameters['Queue Max']);

Yanfly.Param.CounterDefault = Number(Yanfly.Parameters['Counter Skill']);
Yanfly.Param.CounterEvade = eval(String(Yanfly.Parameters['Evade Counter']));
Yanfly.Param.CounterFmt = String(Yanfly.Parameters['Counter Name']);
Yanfly.Param.CounterIcon = Number(Yanfly.Parameters['Counter Icon']);
Yanfly.Param.CounterTotal = Number(Yanfly.Parameters['Counter Total']);
Yanfly.Param.CounterAllyCnt = eval(String(Yanfly.Parameters['Ally Counter']));

Yanfly.Param.CounterConditions = [];
if (eval(String(Yanfly.Parameters['Physical']))) {
  Yanfly.Param.CounterConditions.push('PHYSICAL HIT');
};
if (eval(String(Yanfly.Parameters['Single Target']))) {
  Yanfly.Param.CounterConditions.push('SINGLE TARGET');
};
if (eval(String(Yanfly.Parameters['Not Counter']))) {
  Yanfly.Param.CounterConditions.push('NOT COUNTER HIT');
};

//=============================================================================
// DataManager
//=============================================================================

Yanfly.Counter.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
  if (!Yanfly.Counter.DataManager_isDatabaseLoaded.call(this)) return false;
  if (!Yanfly._loaded_YEP_X_CounterControl) {
    this.processCounterNotetagsI($dataItems);
    this.processCounterNotetagsW($dataWeapons);
    this.processCounterNotetagsA($dataArmors);
    this.processCounterNotetagsS($dataSkills);
    this.processCounterNotetagsT($dataStates);
    this.processCounterNotetagsSys($dataSystem);
    this.processCounterNotetags1($dataActors);
    this.processCounterNotetags1($dataEnemies);
    this.processCounterNotetags2($dataActors);
    this.processCounterNotetags2($dataClasses);
    this.processCounterNotetags2($dataEnemies);
    this.processCounterNotetags2($dataWeapons);
    this.processCounterNotetags2($dataArmors);
    this.processCounterNotetags2($dataStates);
    this.processCounterNotetags3($dataSkills);
    this.processCounterNotetags4($dataSkills);
    this.processCounterNotetags4($dataItems);
    Yanfly._loaded_YEP_X_CounterControl = true;
  }
  return true;
};

DataManager.processCounterNotetagsI = function(group) {
  if (Yanfly.ItemIdRef) return;
  Yanfly.ItemIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.ItemIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processCounterNotetagsW = function(group) {
  if (Yanfly.WeaponIdRef) return;
  Yanfly.WeaponIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.WeaponIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processCounterNotetagsA = function(group) {
  if (Yanfly.ArmorIdRef) return;
  Yanfly.ArmorIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.ArmorIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processCounterNotetagsS = function(group) {
  if (Yanfly.SkillIdRef) return;
  Yanfly.SkillIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.SkillIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processCounterNotetagsT = function(group) {
  if (Yanfly.StateIdRef) return;
  Yanfly.StateIdRef = {};
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    if (obj.name.length <= 0) continue;
    Yanfly.StateIdRef[obj.name.toUpperCase()] = n;
  }
};

DataManager.processCounterNotetagsSys = function(group) {
  Yanfly.STypeIdRef = {};
  for (var i = 1; i < group.skillTypes.length; ++i) {
    var name = group.skillTypes[i].toUpperCase();
    name = name.replace(/\\I\[(\d+)\]/gi, '');
    Yanfly.STypeIdRef[name] = i;
  }
  Yanfly.ElementIdRef = {};
  for (var i = 1; i < group.elements.length; ++i) {
    var name = group.elements[i].toUpperCase();
    name = name.replace(/\\I\[(\d+)\]/gi, '');
    Yanfly.ElementIdRef[name] = i;
  }
};

DataManager.processCounterNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.defaultCounter = Yanfly.Param.CounterDefault;
    obj.counterTotal = Yanfly.Param.CounterTotal;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<DEFAULT COUNTER:[ ](\d+)>/i)) {
        obj.defaultCounter = parseInt(RegExp.$1);
      } else if (line.match(/<DEFAULT COUNTER:[ ](.*)>/i)) {
        var name = String(RegExp.$1).toUpperCase();
        var id = Yanfly.SkillIdRef[name];
        if (id) obj.defaultCounter = id;
      }
    }
  }
};

DataManager.processCounterNotetags2 = function(group) {
  var noteA1 = /<(?:COUNTER SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var noteA2 = /<(?:COUNTER SKILLS):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.counterSkills = [];
    obj.counterTotal = 0;
    obj.targetCounterRate = 1;
    obj.targetCounterFlat = 0;
    obj.evadeCounter = false;
    obj.hitCounter = false;
    var evalMode = 'none';
    obj.counterTotalEval = '';
    obj.counterSkillsEval = '';
    obj.targetCounterRateEval = '';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(noteA1)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.counterSkills = obj.counterSkills.concat(array);
      } else if (line.match(noteA2)) {
        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
          parseInt(RegExp.$2));
        obj.counterSkills = obj.counterSkills.concat(range);
      } else if (line.match(/<(?:COUNTER SKILL):[ ](.*)>/i)) {
        var name = String(RegExp.$1).toUpperCase();
        var id = Yanfly.SkillIdRef[name];
        if (id) obj.counterSkills.push(id);
      } else if (line.match(/<(?:COUNTER TOTAL):[ ]([\+\-]\d+)>/i)) {
        obj.counterTotal = parseInt(RegExp.$1);
      } else if (line.match(/<(?:TARGET COUNTER):[ ](\d+)([%％])>/i)) {
        obj.targetCounterRate = parseFloat(RegExp.$1) * 0.01;
      } else if (line.match(/<(?:TARGET COUNTER):[ ]([\+\-]\d+)([%％])>/i)) {
        obj.targetCounterFlat = parseFloat(RegExp.$1) * 0.01;
      } else if (line.match(/<(?:EVADE COUNTER|COUNTER EVADE)>/i)) {
        obj.evadeCounter = true;
      } else if (line.match(/<(?:HIT COUNTER|COUNTER HIT)>/i)) {
        obj.hitCounter = true;
      } else if (line.match(/<CUSTOM COUNTER TOTAL>/i)) {
        evalMode = 'custom counter total';
      } else if (line.match(/<\/CUSTOM COUNTER TOTAL>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'custom counter total') {
        obj.counterTotalEval = obj.counterTotalEval + line + '\n';
      } else if (line.match(/<CUSTOM COUNTER SKILLS>/i)) {
        evalMode = 'custom counter skills';
      } else if (line.match(/<\/CUSTOM COUNTER SKILLS>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'custom counter skills') {
        obj.counterSkillsEval = obj.counterSkillsEval + line + '\n';
      } else if (line.match(/<CUSTOM TARGET COUNTER RATE>/i)) {
        evalMode = 'custom target counter rate';
      } else if (line.match(/<\/CUSTOM TARGET COUNTER RATE>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'custom target counter rate') {
        obj.targetCounterRateEval = obj.targetCounterRateEval + line + '\n';
      }
    }
  }
};

DataManager.processCounterNotetags3 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.evadeCounter = Yanfly.Param.CounterEvade;
    obj.counterName = Yanfly.Param.CounterFmt.format(obj.name);
    obj.counterIcon = Yanfly.Param.CounterIcon || obj.iconIndex;
    obj.cannotCounter = false;
    var evalMode = 'none';
    obj.counterConditions = Yanfly.Param.CounterConditions.slice();
    obj.counterConditionEval = '';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:EVADE COUNTER|COUNTER EVADE)>/i)) {
        obj.evadeCounter = true;
      } else if (line.match(/<(?:HIT COUNTER|COUNTER HIT)>/i)) {
        obj.evadeCounter = false;
      } else if (line.match(/<(?:COUNTER NAME):[ ](.*)>/i)) {
        obj.counterName = String(RegExp.$1);
      } else if (line.match(/<(?:COUNTER ICON):[ ](\d+)>/i)) {
        obj.counterIcon = String(RegExp.$1);
      } else if (line.match(/<CANNOT COUNTER>/i)) {
        obj.cannotCounter = true;
      } else if (line.match(/<(?:COUNTER CONDITION|COUNTER CONDITIONS)>/i)) {
        evalMode = 'counter condition';
        obj.counterConditions = [];
      } else if (line.match(/<\/(?:COUNTER CONDITION|COUNTER CONDITIONS)>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'counter condition') {
        obj.counterConditions.push(line);
      } else if (line.match(/<CUSTOM COUNTER CONDITION>/i)) {
        evalMode = 'custom counter condition';
      } else if (line.match(/<\/CUSTOM COUNTER CONDITION>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'custom counter condition') {
        obj.counterConditionEval = obj.counterConditionEval + line + '\n';
      }
    }
  }
};

DataManager.processCounterNotetags4 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.allyCounter = Yanfly.Param.CounterAllyCnt;
    obj.cannotCounter = false;
    obj.counterRate = 1;
    obj.counterMod = 0;
    var evalMode = 'none';
    obj.counterRateEval = '';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<ALLY COUNTER>/i)) {
        obj.allyCounter = true;
      } else if (line.match(/<ALLY CANNOT COUNTER>/i)) {
        obj.allyCounter = false;
      } else if (line.match(/<CANNOT COUNTER>/i)) {
        obj.cannotCounter = true;
      } else if (line.match(/<COUNTER RATE:[ ](\d+)([%％])>/i)) {
        obj.counterRate = parseFloat(RegExp.$1) * 0.01;
      } else if (line.match(/<COUNTER RATE:[ ]([\+\-]\d+)([%％])>/i)) {
        obj.counterMod = parseFloat(RegExp.$1) * 0.01;
      } else if (line.match(/<CUSTOM COUNTER RATE>/i)) {
        evalMode = 'custom counter rate';
      } else if (line.match(/<\/CUSTOM COUNTER RATE>/i)) {
        evalMode = 'none';
      } else if (evalMode === 'custom counter rate') {
        obj.counterRateEval = obj.counterRateEval + line + '\n';
      }
    }
  }
};

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.Counter.BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
    Yanfly.Counter.BattleManager_initMembers.call(this);
    this._counterQueue = [];
    this._counterSequence = 0;
    this._counterOriginalSubject = undefined;
    this._counterOriginalAction = undefined;
    this._countering = false;
};

BattleManager.isCountering = function() {
    return this._countering;
};

Yanfly.Counter.BattleManager_invokeCounter =
    BattleManager.invokeCounterAttack;
BattleManager.invokeCounterAttack = function(subject, target) {
  this._counterQueue = this._counterQueue || [];
  if (this.isValidCounterAction(target)) this._counterSequence += 1;
  if (!this.isMaxCounterQueue()) {
    if (this.isValidCounterAction(target)) target.payCounter();
  }
  if (target.canCounter()) {
    this._counterSkill = this.getCounterSkill(subject, target);
    this._counterQueue = this._counterQueue || [];
    if (this._counterSkill === null) {
      if (this._action.isPhysical() && target.canMove()) {
        Yanfly.Counter.BattleManager_invokeCounter.call(this, subject, target);
      } else {
        this.invokeNormalAction(subject, target);
      }
      return;
    } else if (this.evadeAndCounter(subject, target)) {
      target.performEvasion();
      target.forceEvadePopup();
      this.addCounterQueue(subject, target);
    } else if (this._counterSkill !== undefined) {
      this.invokeNormalAction(subject, target);
      this.addCounterQueue(subject, target);
    } else {
      if (this.isValidCounterAction(target)) {
        target.payCounter(-1);
        this._counterSequence -= 1;
      }
      this.invokeNormalAction(subject, target);
      return;
    }
    this._logWindow.displayActionResults(target, subject);
    if (subject.isDead()) subject.performCollapse();
  } else {
    this.invokeNormalAction(subject, target);
  }
};

BattleManager.getCounterSkill = function(subject, target) {
    target.makeCounterSkills();
    var skills = target.counterSkills();
    var length = skills.length;
    for (var i = 0; i < length; ++i) {
      var skill = skills[i];
      if (this.meetCounterConditions(skill, subject, target)) return skill;
    }
    return undefined;
};

BattleManager.meetCounterConditions = function(skill, subject, target) {
    if (skill === null) return true;
    if (!target.canUse(skill)) return false;
    if (!this.meetCounterConditionsEval(skill, subject, target));
    var condition = this.getCounterCondition(skill, subject, target);
    return condition;
};

BattleManager.meetCounterConditionsEval = function(skill, subject, target) {
    var action = this._action;
    if (this._action.item().counterConditionEval === '') return true;
    var condition = true;
    var a = subject;
    var user = subject;
    var attacker = subject;
    var b = target;
    var defender = target;
    var item = skill;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var code = this._action.item().counterConditionEval;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'COUNTER CONDITIONS EVAL ERROR');
    }
    return condition;
};

BattleManager.getCounterCondition = function(skill, subject, target) {
    var conditions = skill.counterConditions;
    var length = conditions.length;
    for (var i = 0; i < length; ++i) {
      var line = conditions[i];
      if (!this.checkCounterLine(line, skill, subject, target)) return false;
    }
    return true;
};

BattleManager.checkCounterLine = function(line, skill, subject, target) {
    // EVAL
    if (line.match(/EVAL:[ ](.*)/i)) {
      var value = String(RegExp.$1);
      return this.checkCounterEval(value, skill, subject, target);
    // CERTAIN HIT
    } else if (line.toUpperCase() === 'CERTAIN HIT') {
      return this.checkCounterHitType(Game_Action.HITTYPE_CERTAIN);
    // PHYSICAL HIT
    } else if (line.toUpperCase() === 'PHYSICAL HIT') {
      return this.checkCounterHitType(Game_Action.HITTYPE_PHYSICAL);
    // MAGICAL HIT
    } else if (line.toUpperCase() === 'MAGICAL HIT') {
      return this.checkCounterHitType(Game_Action.HITTYPE_MAGICAL);
    // NOT CERTAIN HIT
    } else if (line.toUpperCase() === 'NOT CERTAIN HIT') {
      return !this.checkCounterHitType(Game_Action.HITTYPE_CERTAIN);
    // NOT PHYSICAL HIT
    } else if (line.toUpperCase() === 'NOT PHYSICAL HIT') {
      return !this.checkCounterHitType(Game_Action.HITTYPE_PHYSICAL);
    // NOT MAGICAL HIT
    } else if (line.toUpperCase() === 'NOT MAGICAL HIT') {
      return !this.checkCounterHitType(Game_Action.HITTYPE_MAGICAL);
    // SINGLE TARGET
    } else if (line.toUpperCase() === 'SINGLE TARGET') {
      return this.checkCounterSingleTarget();
    // MULTI TARGET
    } else if (line.toUpperCase() === 'MULTI TARGET') {
      return !this.checkCounterSingleTarget();
    // COUNTER HIT
    } else if (line.toUpperCase() === 'COUNTER HIT') {
      return !this.checkCounterCounterHit();
    // NOT COUNTER HIT
    } else if (line.toUpperCase() === 'NOT COUNTER HIT') {
      return !this.checkCounterCounterHit();
    // RANDOM
    } else if (line.match(/RANDOM:[ ](\d+)([%％])/i)) {
      var value = parseFloat(RegExp.$1) * 0.01;
      return !this.checkCounterRandom(value);
    // NOT ELEMENT
    } else if (line.match(/NOT ELEMENT:[ ](.*)/i)) {
      var value = String(RegExp.$1);
      return !this.checkCounterElement(value);
    // ELEMENT
    } else if (line.match(/ELEMENT:[ ](.*)/i)) {
      var value = String(RegExp.$1);
      return this.checkCounterElement(value);
    // SWITCH ON
    } else if (line.match(/SWITCH[ ](\d+)[ ]ON/i)) {
      var value = parseInt(RegExp.$1);
      return this.checkCounterSwitch(value);
    // SWITCH OFF
    } else if (line.match(/SWITCH[ ](\d+)[ ]OFF/i)) {
      var value = parseInt(RegExp.$1);
      return !this.checkCounterSwitch(value);
    // VARIABLE
    } else if (line.match(/VARIABLE[ ](\d+)[ ](.*)/i)) {
      var varId = parseInt(RegExp.$1);
      var eval = String(RegExp.$2);
      eval = '$gameVariables.value(' + varId + ') ' + eval;
      return this.checkCounterEval(eval, skill, subject, target);
    // NOT SKILL
    } else if (line.match(/NOT SKILL:[ ](.*)/i)) {
      var value = String(RegExp.$1);
      return !this.checkCounterSkill(value);
    // SKILL
    } else if (line.match(/SKILL:[ ](.*)/i)) {
      var value = String(RegExp.$1);
      return this.checkCounterSkill(value);
    // NOT STYPE
    } else if (line.match(/NOT STYPE:[ ](.*)/i)) {
      var value = String(RegExp.$1);
      return !this.checkCounterStype(value);
    // STYPE
    } else if (line.match(/STYPE:[ ](.*)/i)) {
      var value = String(RegExp.$1);
      return this.checkCounterStype(value);
    // NOT ITEM
    } else if (line.match(/NOT ITEM:[ ](.*)/i)) {
      var value = String(RegExp.$1);
      return !this.checkCounterItem(value);
    // ITEM
    } else if (line.match(/ITEM:[ ](.*)/i)) {
      var value = String(RegExp.$1);
      return this.checkCounterItem(value);
    // ATTACKER PARAM
    } else if (line.match(/ATTACKER[ ](.*)[ ](.*)/i)) {
      var value1 = String(RegExp.$1);
      var value2 = String(RegExp.$1);
      return this.checkCounterAttacker(value1, value2, skill, subject, target);
    // DEFENDER PARAM
    } else if (line.match(/DEFENDER[ ](.*)[ ](.*)/i)) {
      var value1 = String(RegExp.$1);
      var value2 = String(RegExp.$1);
      return this.checkCounterDefender(value1, value2, skill, subject, target);
    // ELSE - NOTHING LISTED
    } else {
      return true;
    }
};

BattleManager.checkCounterEval = function(code, skill, subject, target) {
    var action = this._action;
    var a = subject;
    var user = subject;
    var attacker = subject;
    var b = target;
    var defender = target;
    var item = skill;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var code = code;
    try {
      return eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'COUNTER CHECK ERROR');
      return false;
    }
};

BattleManager.checkCounterHitType = function(value) {
    return this._action.item().hitType === value;
};

BattleManager.checkCounterCounterHit = function() {
    return this._action.isCounter();
};

BattleManager.checkCounterRandom = function(value) {
    return Math.random() < value;
};

BattleManager.checkCounterSingleTarget = function() {
    return this._action.isForOne();
};

BattleManager.checkCounterElement = function(value) {
    if (value.match(/(\d+)/i)) {
      var elementId = parseInt(RegExp.$1);
    } else {
      var elementId = Yanfly.ElementIdRef[value.toUpperCase()];
      if (!elementId) return true;
    }
    var actionElement = this._action.item().damage.elementId;
    if (actionElement < 0) {
      return this._subject.attackElements().contains(elementId);
    } else {
      return elementId === actionElement;
    }
};

BattleManager.checkCounterSwitch = function(value) {
    return $gameSwitches.value(value);
};

BattleManager.checkCounterSkill = function(value) {
    if (!this._action.isSkill()) return false;
    if (value.match(/(\d+)/i)) {
      var skillId = parseInt(RegExp.$1);
    } else {
      var skillId = Yanfly.SkillIdRef[value.toUpperCase()];
    }
    var skill = $dataSkills[skillId];
    return this._action.item() === skill;
};

BattleManager.checkCounterStype = function(value) {
    if (!this._action.isSkill()) return false;
    if (value.match(/(\d+)/i)) {
      var stypeId = parseInt(RegExp.$1);
    } else {
      var stypeId = Yanfly.STypeIdRef[value.toUpperCase()];
    }
    var skill = this._action.item();
    return skill.stypeId === stypeId;
};

BattleManager.checkCounterItem = function(value) {
    if (!this._action.isItem()) return false;
    if (value.match(/(\d+)/i)) {
      var itemId = parseInt(RegExp.$1);
    } else {
      var itemId = Yanfly.SkillIdRef[value.toUpperCase()];
    }
    var skill = $dataSkills[skillId];
    return this._action.item() === skill;
};

BattleManager.checkCounterAttacker = function(v1, v2, skill, subject, target) {
    var eval = 'subject.';
    if (['LEVEL', 'LV', 'LVL'].contains(v1.toUpperCase())) {
      eval += 'level';
    } else if (['MAX HP', 'MAXHP', 'MHP'].contains(v1.toUpperCase())) {
      eval += 'mhp';
    } else if (['HP', 'CURRENT HP'].contains(v1.toUpperCase())) {
      eval += 'hp';
    } else if (['MAX MP', 'MAXMP', 'MMP'].contains(v1.toUpperCase())) {
      eval += 'mmp';
    } else if (['MP', 'CURRENT MP'].contains(v1.toUpperCase())) {
      eval += 'mp';
    } else if (['ATK', 'STR'].contains(v1.toUpperCase())) {
      eval += 'atk';
    } else if (['DEF'].contains(v1.toUpperCase())) {
      eval += 'def';
    } else if (['MAT', 'INT', 'SPI'].contains(v1.toUpperCase())) {
      eval += 'mat';
    } else if (['MDF', 'RES'].contains(v1.toUpperCase())) {
      eval += 'mdf';
    } else if (['AGI', 'SPD'].contains(v1.toUpperCase())) {
      eval += 'agi';
    } else if (['LUK'].contains(v1.toUpperCase())) {
      eval += 'luk';
    } else {
      return false;
    }
    eval += ' ' + v2;
    return this.checkCounterEval(eval, skill, subject, target);
};

BattleManager.checkCounterDefender = function(v1, v2, skill, subject, target) {
    var eval = 'target.';
    if (['LEVEL', 'LV', 'LVL'].contains(v1.toUpperCase())) {
      eval += 'level';
    } else if (['MAX HP', 'MAXHP', 'MHP'].contains(v1.toUpperCase())) {
      eval += 'mhp';
    } else if (['HP', 'CURRENT HP'].contains(v1.toUpperCase())) {
      eval += 'hp';
    } else if (['MAX MP', 'MAXMP', 'MMP'].contains(v1.toUpperCase())) {
      eval += 'mmp';
    } else if (['MP', 'CURRENT MP'].contains(v1.toUpperCase())) {
      eval += 'mp';
    } else if (['ATK', 'STR'].contains(v1.toUpperCase())) {
      eval += 'atk';
    } else if (['DEF'].contains(v1.toUpperCase())) {
      eval += 'def';
    } else if (['MAT', 'INT', 'SPI'].contains(v1.toUpperCase())) {
      eval += 'mat';
    } else if (['MDF', 'RES'].contains(v1.toUpperCase())) {
      eval += 'mdf';
    } else if (['AGI', 'SPD'].contains(v1.toUpperCase())) {
      eval += 'agi';
    } else if (['LUK'].contains(v1.toUpperCase())) {
      eval += 'luk';
    } else {
      return false;
    }
    eval += ' ' + v2;
    return this.checkCounterEval(eval, skill, subject, target);
};

BattleManager.evadeAndCounter = function(subject, target) {
    if (this._counterSkill === undefined) return false;
    if (this._counterSkill === null) return false;
    if (target.forceHitCounter()) return false;
    if (target.forceEvadeCounter()) return true;
    return this._counterSkill.evadeCounter;
};

BattleManager.isValidCounterAction = function(target) {
    if (this._counterQueue.length <= 0) return true;
    return this._counterQueue[0].subject() !== target;
};

BattleManager.addCounterQueue = function(subject, target) {
    if (!target.canCounter()) return;
    if (!this.isValidCounterAction(target)) return;
    var action = new Game_Action(target);
    action.setSkill(this._counterSkill.id);
    action.setCounter();
    if (action.isForOpponent()) {
      action.setTarget(subject.index());
    } else {
      action.setTarget(target.index());
    }
    this._counterQueue = this._counterQueue || [];
    this._counterQueue.push(action);
    this._counterOriginalSubject = this._counterOriginalSubject || subject;
    this._counterOriginalAction = this._counterOriginalAction || this._action;
};

Yanfly.Counter.BattleManager_createFinishActions =
    BattleManager.createFinishActions;
BattleManager.createFinishActions = function() {
    Yanfly.Counter.BattleManager_createFinishActions.call(this);
    this._actionList.push(['START COUNTER PHASE']);
};

Yanfly.Counter.BattleManager_processActionSequence =
    BattleManager.processActionSequence;
BattleManager.processActionSequence = function(actionName, actionArgs) {
    // START COUNTER PHASE
    if (actionName === 'START COUNTER PHASE') {
      return this.actionStartCounterPhase();
    }
    return Yanfly.Counter.BattleManager_processActionSequence.call(this,
      actionName, actionArgs);
};

BattleManager.isMaxCounterQueue = function() {
    return this._counterSequence > Yanfly.Param.CounterMaxQueue;
};

BattleManager.actionStartCounterPhase = function() {
    this._counterQueue = this._counterQueue || [];
    var action = this._counterQueue.shift();
    if (this.isMaxCounterQueue() || !action) {
      this.actionEndCounterPhase();
    } else if (action && action.subject().isDead()) {
      this.actionStartCounterPhase();
    } else {
      this.actionPerformCounterPhase(action);
    }
    this._counterQueue = this._counterQueue || [];
};

BattleManager.actionEndCounterPhase = function() {
  this._countering = false;
  if (this._counterOriginalSubject) {
    this._subject = this._counterOriginalSubject;
    this._action = this._counterOriginalAction;
    if (this.isSetCounterOriginal()) {
      this._subject.setCounterAction(this._action);
    }
  }
  this._counterOriginalSubject = undefined;
  this._counterOriginalAction = undefined;
  this._counterSequence = 0;
  this._counterQueue = [];
};

BattleManager.isSetCounterOriginal = function() {
    if (this.isDTB()) return false;
    return true;
};

BattleManager.actionPerformCounterPhase = function(action) {
    this._countering = true;
    this._subject.removeCounterAction();
    this._subject = action.subject();
    this._action = action;
    var subject = this._subject;
    var targets = action.makeTargets();
    this.setTargets(targets);
    this._allTargets = targets.slice();
    this._individualTargets = targets.slice();
    this._phase = 'phaseChange';
    this._phaseSteps = ['setup', 'whole', 'target', 'follow', 'finish'];
    this._returnPhase = '';
    this._actionList = [];
    subject.useItem(this._action.item());
    this._action.applyGlobal();
    this._logWindow.startAction(this._subject, this._action, this._targets);
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Yanfly.Counter.Game_BattlerBase_updateStateActionStart =
    Game_BattlerBase.prototype.updateStateActionStart;
Game_BattlerBase.prototype.updateStateActionStart = function() {
    if (BattleManager.isCountering()) return;
    Yanfly.Counter.Game_BattlerBase_updateStateActionStart.call(this);
};

//=============================================================================
// Game_Battler
//=============================================================================

Yanfly.Counter.Game_Battler_refresh = Game_Battler.prototype.refresh;
Game_Battler.prototype.refresh = function() {
    this._counterTotalCache = undefined;
    Yanfly.Counter.Game_Battler_refresh.call(this);
};

Game_Battler.prototype.counterSkills = function() {
    if (this._counterSkills === undefined || this._counterSkills === []) {
      return [];
    }
    var array = [];
    var length = this._counterSkills.length;
    for (var i = 0; i < length; ++i) {
      var skillId = this._counterSkills[i];
      var skill = $dataSkills[skillId];
      array.push(skill);
    }
    return array;
};

Game_Battler.prototype.makeCounterSkills = function() {
    this._counterSkills = [];
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.states()[i];
      if (!obj) continue;
      if (obj.counterSkills) {
        Yanfly.Util.extend(this._counterSkills, obj.counterSkills);
      }
      this.extendCounterSkillsEval(obj);
    }
};

Game_Battler.prototype.extendCounterSkillsEval = function(obj) {
    if (!obj) return;
    if (!obj.counterSkillsEval) return;
    if (obj.counterSkillsEval === '') return;
    var skills = [];
    var a = this;
    var user = this;
    var subject = this;
    var b = this;
    var target = this;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var code = obj.counterSkillsEval;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'COUNTER SKILLS ERROR');
    }
    Yanfly.Util.extend(this._counterSkills, obj.counterSkills);
};

Yanfly.Counter.Game_Battler_onBattleStart =
    Game_Battler.prototype.onBattleStart;
Game_Battler.prototype.onBattleStart = function() {
    Yanfly.Counter.Game_Battler_onBattleStart.call(this);
    this._counters = 0;
};

Yanfly.Counter.Game_Battler_onTurnStart = Game_Battler.prototype.onTurnStart;
Game_Battler.prototype.onTurnStart = function() {
    Yanfly.Counter.Game_Battler_onTurnStart.call(this);
    this._counters = 0;
};

Game_Battler.prototype.counterTotal = function() {
    var value = Yanfly.Param.CounterTotal;
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.states()[i];
      if (!obj) continue;
      if (obj.counterTotal) value += obj.counterTotal;
      value += this.getCounterTotalEval(obj);
    }
    return value;
};

Game_Battler.prototype.getCounterTotalEval = function(obj) {
    if (!obj) return 0;
    if (!obj.counterTotalEval) return 0;
    if (obj.counterTotalEval === '') return 0;
    var value = 0;
    var a = this;
    var user = this;
    var subject = this;
    var b = this;
    var target = this;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var code = obj.counterTotalEval;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'COUNTER TOTAL ERROR');
    }
    return value;
};

Game_Battler.prototype.payCounter = function(value) {
    value = value || 1;
    this._counters += value;
};

Game_Battler.prototype.canCounter = function() {
    if (!this.canMove()) return false;
    return this.counterTotal() >= this._counters;
};

Game_Battler.prototype.targetCounterRate = function() {
    var rate = 1;
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.states()[i];
      if (!obj) continue;
      rate *= obj.targetCounterRate;
    }
    return rate;
};

Game_Battler.prototype.targetCounterFlat = function() {
    var value = 0;
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.states()[i];
      if (!obj) continue;
      value += obj.targetCounterFlat;
    }
    return value;
};

Game_Battler.prototype.targetCounterRateEval = function(rate, target, item) {
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.states()[i];
      rate = this.getTargetCntRateEval(obj, rate, target, item);
    }
    return rate;
};

Game_Battler.prototype.getTargetCntRateEval = function(obj, rate, trg, item) {
    if (!obj) return rate;
    if (!obj.targetCounterRateEval) return rate;
    if (obj.targetCounterRateEval === '') return rate;
    var skill = item;
    var a = this;
    var user = this;
    var subject = this;
    var b = trg;
    var target = trg;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var code = obj.targetCounterRateEval;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'TARGET COUNTER RATE ERROR');
    }
    return rate;
};

Game_Battler.prototype.forceEvadeCounter = function() {
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.states()[i];
      if (!obj) continue;
      if (obj.evadeCounter) return true;
    }
    return false;
};

Game_Battler.prototype.forceHitCounter = function() {
    var length = this.states().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.states()[i];
      if (!obj) continue;
      if (obj.hitCounter) return true;
    }
    return false;
};

Game_Battler.prototype.forceEvadePopup = function() {
    this._result = new Game_ActionResult();
    this._result.evaded = true;
    this.startDamagePopup();
    this.clearResult();
};

Game_Battler.prototype.setCounterAction = function(action) {
    if (!this._originalPreCounterActions) {
      this._originalPreCounterActions = JsonEx.makeDeepCopy(this._actions);
    }
    action.setCounter();
    this.setAction(0, action);
};

Game_Battler.prototype.removeCounterAction = function() {
    if (this._originalPreCounterActions) {
      this._actions = JsonEx.makeDeepCopy(this._originalPreCounterActions);
    }
    this._originalPreCounterActions = undefined;
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.makeCounterSkills = function() {
    Game_Battler.prototype.makeCounterSkills.call(this);
    var length = this.equips().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.equips()[i];
      if (!obj) continue;
      if (obj.counterSkills) {
        Yanfly.Util.extend(this._counterSkills, obj.counterSkills);
      }
      this.extendCounterSkillsEval(obj);
    }
    if (this.currentClass().counterSkills) {
      obj = this.currentClass();
      Yanfly.Util.extend(this._counterSkills, obj.counterSkills);
      this.extendCounterSkillsEval(obj);
    }
    if (this.actor().counterSkills) {
      obj = this.actor();
      Yanfly.Util.extend(this._counterSkills, obj.counterSkills);
      this.extendCounterSkillsEval(obj);
    }
    if (this._counterSkills.length <= 0) {
      this._counterSkills.push(obj.defaultCounter);
    }
};

Game_Actor.prototype.counterTotal = function() {
    if (this._counterTotalCache !== undefined) return this._counterTotalCache;
    var value = Game_Battler.prototype.counterTotal.call(this);
    var length = this.equips().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.equips()[i];
      if (!obj) continue;
      if (obj.counterTotal) value += obj.counterTotal;
      value += this.getCounterTotalEval(obj);
    }
    value += this.currentClass().counterTotal;
    value += this.getCounterTotalEval(this.currentClass());
    value += this.actor().counterTotal;
    value += this.getCounterTotalEval(this.actor());
    this._counterTotalCache = value;
    return this._counterTotalCache;
};

Game_Actor.prototype.targetCounterRate = function() {
    var rate = Game_Battler.prototype.targetCounterRate.call(this);
    var length = this.equips().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.equips()[i];
      if (!obj) continue;
      rate *= obj.targetCounterRate;
    }
    rate *= this.currentClass().targetCounterRate;
    rate *= this.actor().targetCounterRate;
    return rate;
};

Game_Actor.prototype.targetCounterFlat = function() {
    var value = Game_Battler.prototype.targetCounterFlat.call(this);
    var length = this.equips().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.equips()[i];
      if (!obj) continue;
      value += obj.targetCounterFlat;
    }
    value += this.currentClass().targetCounterFlat;
    value += this.actor().targetCounterFlat;
    return value;
};

Game_Actor.prototype.targetCounterRateEval = function(rate, target, item) {
    var rate = Game_Battler.prototype.targetCounterRateEval.call(this, rate,
      target, item);
    var length = this.equips().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.equips()[i];
      rate = this.getTargetCntRateEval(obj, rate, target, item);
    }
    rate = this.getTargetCntRateEval(this.currentClass(), rate, target, item);
    rate = this.getTargetCntRateEval(this.actor(), rate, target, item);
    return rate;
};

Game_Actor.prototype.forceEvadeCounter = function() {
    if (Game_Battler.prototype.forceEvadeCounter.call(this)) return true;
    if (this.actor().evadeCounter) return true;
    if (this.currentClass().evadeCounter) return true;
    var length = this.equips().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.equips()[i];
      if (!obj) continue;
      if (obj.evadeCounter) return true;
    }
    return false;
};

Game_Actor.prototype.forceHitCounter = function() {
    if (Game_Battler.prototype.forceHitCounter.call(this)) return true;
    if (this.actor().hitCounter) return true;
    if (this.currentClass().hitCounter) return true;
    var length = this.equips().length;
    for (var i = 0; i < length; ++i) {
      var obj = this.equips()[i];
      if (!obj) continue;
      if (obj.hitCounter) return true;
    }
    return false;
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.makeCounterSkills = function() {
    Game_Battler.prototype.makeCounterSkills.call(this);
    if (this.enemy().counterSkills) {
      obj = this.enemy();
      Yanfly.Util.extend(this._counterSkills, obj.counterSkills);
      this.extendCounterSkillsEval(obj);
    }
    if (this._counterSkills.length <= 0) {
      this._counterSkills.push(obj.defaultCounter);
    }
};

Game_Enemy.prototype.counterTotal = function() {
    if (this._counterTotalCache !== undefined) return this._counterTotalCache;
    var value = Game_Battler.prototype.counterTotal.call(this);
    value += this.enemy().counterTotal;
    value += this.getCounterTotalEval(this.enemy());
    this._counterTotalCache = value;
    return this._counterTotalCache;
};

Game_Enemy.prototype.targetCounterRate = function() {
    var rate = Game_Battler.prototype.targetCounterRate.call(this);
    rate *= this.enemy().targetCounterRate;
    return rate;
};

Game_Enemy.prototype.targetCounterFlat = function() {
    var value = Game_Battler.prototype.targetCounterFlat.call(this);
    value += this.enemy().targetCounterFlat;
    return value;
};

Game_Enemy.prototype.targetCounterRateEval = function(rate, target, item) {
    var rate = Game_Battler.prototype.targetCounterRateEval.call(this, rate,
      target, item);
    rate = this.getTargetCntRateEval(this.enemy(), rate, target, item);
    return rate;
};

Game_Enemy.prototype.forceEvadeCounter = function() {
    if (Game_Battler.prototype.forceEvadeCounter.call(this)) return true;
    if (this.enemy().evadeCounter) return true;
    return false;
};

Game_Enemy.prototype.forceHitCounter = function() {
    if (Game_Battler.prototype.forceHitCounter.call(this)) return true;
    if (this.enemy().hitCounter) return true;
    return false;
};

//=============================================================================
// Game_Action
//=============================================================================

Game_Action.prototype.itemCnt = function(target) {
    if (this.item().cannotCounter) return 0;
    if (!this.item().allyCounter) {
      if (target.isActor() === this.subject().isActor()) return 0;
    }
    if (!target.canMove()) return 0;
    if (!target.canCounter()) return 0;
    var rate = target.cnt;
    rate *= this.subject().targetCounterRate();
    rate *= this.item().counterRate;
    rate += this.subject().targetCounterFlat();
    rate += this.item().counterMod;
    rate = this.subject().targetCounterRateEval(rate, target, this.item());
    rate = this.customCounterRateEval(rate, target);
    return rate;
};

Game_Action.prototype.customCounterRateEval = function(rate, target) {
    if (this.item().counterRateEval === '') return rate;
    var item = this.item();
    var skill = this.item();
    var a = this.subject();
    var user = this.subject();
    var subject = this.subject();
    var b = target;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    var code = this.item().counterRateEval;
    try {
      eval(code);
    } catch (e) {
      Yanfly.Util.displayError(e, code, 'COUNTER RATE ERROR');
    }
    return rate;
};

if (Imported.YEP_X_BattleSysCTB) {

Yanfly.Counter.Game_Action_rebalanceCTBSpeed =
    Game_Action.prototype.rebalanceCTBSpeed;
Game_Action.prototype.rebalanceCTBSpeed = function(target) {
    if (BattleManager.isCountering()) return;
    Yanfly.Counter.Game_Action_rebalanceCTBSpeed.call(this, target);
};

}; // Imported.YEP_X_BattleSysCTB

Yanfly.Counter.Game_Action_clear = Game_Action.prototype.clear;
Game_Action.prototype.clear = function() {
    Yanfly.Counter.Game_Action_clear.call(this);
    this._isCounter = false;
    this._isForceMiss = false;
};

Game_Action.prototype.setCounter = function() {
    this._isCounter = true;
};

Game_Action.prototype.isCounter = function() {
    return this._isCounter;
};

//=============================================================================
// Window_BattleLog
//=============================================================================

Yanfly.Counter.Window_BattleLog_displayIcon =
    Window_BattleLog.prototype.displayIcon;
Window_BattleLog.prototype.displayIcon = function(item) {
    if (BattleManager.isCountering()) return item.counterIcon;
    return Yanfly.Counter.Window_BattleLog_displayIcon.call(this, item);
};

Yanfly.Counter.Window_BattleLog_displayText =
    Window_BattleLog.prototype.displayText;
Window_BattleLog.prototype.displayText = function(item) {
    if (BattleManager.isCountering()) return item.counterName;
    return Yanfly.Counter.Window_BattleLog_displayText.call(this, item);
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.extend = function (mainArray, otherArray) {
    otherArray.forEach(function(i) {
      mainArray.push(i)
    }, this);
}

Yanfly.Util.displayError = function(e, code, message) {
  console.log(message);
  console.log(code || 'NON-EXISTENT');
  console.error(e);
  if (Utils.isNwjs() && Utils.isOptionValid('test')) {
    if (!require('nw.gui').Window.get().isDevToolsOpen()) {
      require('nw.gui').Window.get().showDevTools();
    }
  }
};

//=============================================================================
// End of File
//=============================================================================
};