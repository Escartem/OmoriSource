/*:
 * Yami Engine Delta - Sideview Battler Enhancement
 *
 * @plugindesc v1.1.0 This plugin allows user to use any kind of sideview battler.
 * @author Yami Engine Delta [Dr.Yami]
 *
 * @param [Default Setting]
 * @default
 *
 * @param Default Frames
 * @desc Default frames number for each pose.
 * @default 3
 *
 * @param Default Speed
 * @desc Default speed for each pose. The higher number, the slower motion is.
 * @default 12
 *
 * @param Default Frame Width
 * @desc Default frame width.
 * @default 96
 *
 * @param Default Frame Height
 * @desc Default frame height.
 * @default 96
 *
 * @param Enable Weapon
 * @desc Showing weapon for battler.
 * @default false
 *
 * @help
 * There is no Plugin Command for this plugin.
 *
 * ============================================================================
 * Actors & Enemies Notetags
 *
 * <Sideview Battler: FILENAME>
 * Enable custom sideview battler for actor/enemy with battler set FILENAME.
 *
 * <Sideview Battler Default>
 * Make this battler use default kind of battler (MV's SV Battlers).
 *
 * <Sideview Battler Frames: X>
 * Change default number of frames per pose for current battler.
 *
 * <Sideview Battler Speed: X>
 * Change default speed per pose for current battler. The higher number, the
 * slower motion is.
 *
 * <Sideview Battler Size: WIDTH, HEIGHT>
 * Change the frame sizes.
 *
 * <Sideview Battler Weapon: FLAG>
 * Set weapon showing enable for battler. FLAG can be true or false.
 *
 * <Sideview Battler Motion: NAME, INDEX>
 * Add new motion (pose) for current battler, index is row number (start from
 * zero).
 *
 * <Sideview Battler Motion>
 *   Name: NAME
 *   Index: INDEX
 *   Loop
 *   Frames: X
 *   Speed: Y
 * </Sideview Battler Motion>
 * Add new motion (pose) for current battler.
 * Loop is for looping motion.
 * Frames and Speed is for custom frames and speed from the default ones.
 * Loop, Frames and Speed can be omitted.
 * ============================================================================
 * Notes
 *
 * 1. Frame will be started from 0 (first frame of the pose).
 * 2. All default motions to be setup:
 *    walk      wait    chant   guard   damage
 *    evade     thrust  swing   missile skill
 *    spell     item    escape  victory dying
 *    abnormal  sleep   dead
 * 3. All battlers should have the motion "walk". If any of default motions is
 *    not setup, the "other" motion will be used, "walk" will be used instead
 *    if "other" hasn't been setup.
 * 4. Current version only support animated enemies with Yanfly's Animated
 *    Sideview Enemies. This will be standalone on next version.
 * 5. When using with Yanfly's Animated Sideview Enemies, the sprite width and
 *    height should be set manually instead of 'auto'.
 * ============================================================================
 * Compatible
 *
 * The plugin should be placed under any of other Core script, such as YEP -
 * Core Engine.
 *
 * The plugin should be placed under YEP - Battle Engine Core and YEP -
 * Animated Sideview Enemies if used.
 * ============================================================================
 * Action Sequences - Action List (For YEP - Battle Engine Core)
 *
 * CUSTOM MOTION type: target, (no weapon)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Forces the target to perform a custom motion defined by this plugin. Anything
 * besides above listed default motions should be called with this action instead.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Usage Example: attack animation: target
 *
 * ============================================================================
 */

/**
 * @namespace SideviewBattler
 * @memberof YED
 */

var YED = YED || {};

// init SideviewBattler module
YED.SideviewBattler = {};

// Imported
var Imported = Imported || {};
Imported.YED_SideviewBattler = true;

/* globals YED: false */

(function($SideviewBattler) {
    /**
     * Enum for RegExp, used to notetags
     *
     * @readonly
     * @enum {RegExp}
     * @memberof YED.SideviewBattler
     */
    var Regexp = {
        /**
         * Filename for battler
         */
        FILENAME: /<Sideview Battler:[ ]*(.*)>/i,

        /**
         * Default type of set for battler
         */
        DEFAULT_TYPE: /<Sideview Battler Default>/i,

        /**
         * Default frames
         */
        FRAMES: /<Sideview Battler Frames:[ ]*(\d+)>/i,

        /**
         * Default frames
         */
        SPEED: /<Sideview Battler Speed:[ ]*(\d+)>/i,

        /**
         * Frame sizes
         */
        SIZES: /<Sideview Battler Size:[ ]*(\d+),[ ]*(\d+)>/i,

        /**
         * Enable Weapon
         */
        WEAPON_ENABLE: /<Sideview Battler Weapon:[ ]*(true|false)>/i,

        /**
         * Motions setup
         */
        MOTION_QUICK: /<Sideview Battler Motion:[ ]*(.*),[ ]*(\d+)>/i,

        /**
         * Motions setup
         */
        MOTION_BEGIN: /<Sideview Battler Motion>/i,

        /**
         * Motions setup
         */
        MOTION_END: /<\/Sideview Battler Motion>/i,

        /**
         * Motions setup
         */
        MOTION_NAME: /Name:[ ]*(.*)/i,

        /**
         * Motions setup
         */
        MOTION_INDEX: /Index:[ ]*(\d+)/i,

        /**
         * Motions setup
         */
        MOTION_LOOP: /Loop/i,

        /**
         * Motions setup
         */
        MOTION_FRAMES: /Frames:[ ]*(\d+)/i,

        /**
         * Motions setup
         */
        MOTION_SPEED: /Speed:[ ]*(\d+)/i,
    };

    $SideviewBattler.Regexp = Regexp;
}(YED.SideviewBattler));

/* globals YED: false */

(function($SideviewBattler) {
    /**
     * Shorten Dependencies
     */
    var Regexp = $SideviewBattler.Regexp;

    /**
     * Contains utility tools for module.
     *
     * @namespace Utils
     * @memberof YED.SideviewBattler
     */
    var Utils = {};

    /**
     * Contains module parsed parameters.
     *
     * @type {Object}
     * @memberOf YED.SideviewBattler.Utils
     */
    Utils.parameters = {};

    /**
     * Process parameters function.
     * Should be called with DataManager as current object.
     *
     * @function processParameters
     * @memberof YED.SideviewBattler.Utils
     */
    Utils.processParameters = function() {
        var parameters = PluginManager.parameters('YED_SideviewBattler'),
            result     = Utils.parameters;

        result['Default Frames'] =
            Number(parameters['Default Frames'] || 0);

        result['Default Speed'] =
            Number(parameters['Default Speed']  || 0);

        result['Default Frame Width'] =
            Number(parameters['Default Frame Width']  || 0);

        result['Default Frame Height'] =
            Number(parameters['Default Frame Height']  || 0);

        result['Enable Weapon'] =
            eval(parameters['Enable Weapon'].toLowerCase());
    };

    /**
     * Process notetag function.
     * Should be called with DataManager as current object.
     *
     * @function processNotetag
     * @memberof YED.SideviewBattler.Utils
     */
    Utils.processNotetags = function() {
        var groups = [$dataActors, $dataEnemies],
            group, obj,
            notedata, line,
            helpers = {}; // multiline notetag

        for (var j = 0; j < groups.length; j++) {
            group = groups[j];

            for (var i = 1; i < group.length; i++) {
                obj = group[i];
                notedata = obj.note.split(/[\r\n]+/);

                Utils._processProperties.call(this, obj);
                Utils._processMethods.call(this, obj);

                for (var n = 0; n < notedata.length; n++) {
                    line = notedata[n];
                    Utils._processNotetag.call(this, obj, line, helpers);
                }
            }
        }
    };

    /**
     * Add new properties into object.
     *
     * @function _processProperties
     * @memberof YED.SideviewBattler.Utils
     * @param  {Object} obj Data object
     * @private
     */
    Utils._processProperties = function(obj) {
        obj._sideviewBattler = {
            filename: "",
            default : false,
            frames  : Utils.parameters['Default Frames'],
            speed   : Utils.parameters['Default Speed'],
            weapon  : Utils.parameters['Enable Weapon'],
            sizes   : [
                Utils.parameters['Default Frame Width'],
                Utils.parameters['Default Frame Height']
            ],
            motions : {}
        };
    };

    /**
     * Add new methods into object.
     *
     * @function _processMethods
     * @memberof YED.SideviewBattler.Utils
     * @param  {Object} obj Data object
     * @private
     */
    Utils._processMethods = function(obj) {
        obj.getSideviewBattler = Utils.getSideviewBattler;
        obj.isSideviewBattler = Utils.isSideviewBattler;
    };

    /**
     * Process notetag for object.
     *
     * @function _processNotetag
     * @memberof YED.SideviewBattler.Utils
     * @param  {Object} obj Data object
     * @param  {String} notetag Notetag
     * @private
     */
    Utils._processNotetag = function(obj, notetag, helpers) {
        var sideviewBattler = obj._sideviewBattler,
            match,
            motion;

        match = notetag.match(Regexp.FILENAME);
        if (match) {
            sideviewBattler.filename = String(match[1]);
        }

        match = notetag.match(Regexp.DEFAULT_TYPE);
        if (match) {
            sideviewBattler.default = true;
        }

        match = notetag.match(Regexp.FRAMES);
        if (match) {
            sideviewBattler.frames = Number(match[1]);
        }

        match = notetag.match(Regexp.SPEED);
        if (match) {
            sideviewBattler.speed = Number(match[1]);
        }

        match = notetag.match(Regexp.SIZES);
        if (match) {
            sideviewBattler.sizes[0] = Number(match[1]);
            sideviewBattler.sizes[1] = Number(match[2]);
        }

        match = notetag.match(Regexp.WEAPON_ENABLE);
        if (match) {
            sideviewBattler.weapon = eval(match[1].toLowerCase());
        }

        match = notetag.match(Regexp.MOTION_QUICK);
        if (match) {
            motion = {};

            motion.name = match[1].toLowerCase();
            motion.index = Number(match[2]);

            sideviewBattler.motions[motion.name] = motion;
        }

        match = notetag.match(Regexp.MOTION_BEGIN);
        if (match) {
            helpers.motionFlag = true;
            helpers.motion = {};
            return;
        }

        match = notetag.match(Regexp.MOTION_END);
        if (match) {
            motion = helpers.motion;

            helpers.motionFlag = false;
            sideviewBattler.motions[motion.name] = motion;
            return;
        }

        if (helpers.motionFlag) {
            motion = helpers.motion;

            match = notetag.match(Regexp.MOTION_NAME);
            if (match) {
                motion.name = match[1].toLowerCase();
            }

            match = notetag.match(Regexp.MOTION_INDEX);
            if (match) {
                motion.index = Number(match[1]);
            }

            match = notetag.match(Regexp.MOTION_LOOP);
            if (match) {
                motion.loop = true;
            }

            match = notetag.match(Regexp.MOTION_FRAMES);
            if (match) {
                motion.frames = Number(match[1]);
            }

            match = notetag.match(Regexp.MOTION_SPEED);
            if (match) {
                motion.speed = Number(match[1]);
            }
        }
    };

    /**
     * Get sideview battler infos.
     * Should be attached to actor/enemy object.
     *
     * @function getSideviewBattler
     * @memberof YED.SideviewBattler.Utils
     * @return {Object}
     */
    Utils.getSideviewBattler = function() {
        return this._sideviewBattler;
    };

    /**
     * Check if is sideview battler.
     * Should be attached to actor/enemy object.
     *
     * @function getSideviewBattler
     * @memberof YED.SideviewBattler.Utils
     * @return {Object}
     */
    Utils.isSideviewBattler = function() {
        return this._sideviewBattler.filename !== ""
            && !this._sideviewBattler.default;
    };

    $SideviewBattler.Utils = Utils;
}(YED.SideviewBattler));

/* globals YED: false */

/**
 * Pre-processes and notetag parsing
 */
(function($SideviewBattler) {
    /**
     * Shorten Dependencies
     */
    var Utils = $SideviewBattler.Utils;

    /**
     * Aliasing methods
     */
    var _DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;

    /**
     * Extending: DataManager.isDatabaseLoaded
     *
     * Add notetags and parameters processing for module.
     */
    DataManager.isDatabaseLoaded = function() {
        var loaded = _DataManager_isDatabaseLoaded.call(this);

        if (!loaded) {
            return false;
        }

        Utils.processParameters.call(DataManager);
        Utils.processNotetags.call(DataManager);

        return true;
    };
}(YED.SideviewBattler));

(function () {
    if (!Imported.YEP_BattleEngineCore) {
        return;
    }

    var _BattleManager_processActionSequence = BattleManager.processActionSequence;
    BattleManager.processActionSequence = function (actionName, actionArgs) {
        if (actionName.match(/CUSTOM MOTION[ ](.*)/i)) {
            return this.actionCustomMotionTarget(String(RegExp.$1), actionArgs);
        }
        return _BattleManager_processActionSequence.call(this,
            actionName, actionArgs);
    };

    BattleManager.actionCustomMotionTarget = function (name, actionArgs) {
        var movers = this.makeActionTargets(actionArgs[0]);
        if (movers.length < 1) return true;
        if (actionArgs[1] && actionArgs[1].toUpperCase() === 'NO WEAPON') {
            var showWeapon = false;
        } else {
            var showWeapon = true;
        }
        movers.forEach(function (mover) {
            mover.forceMotion(name.toLowerCase());
        });
        return false;
    };
} ());
(function() {
    Game_Battler.prototype.getBattler = function() {
        var battler;

        if (this.isActor()) {
            battler = this.actor();
        }

        if (this.isEnemy()) {
            battler = this.enemy();
        }

        return !!battler ? battler : null;
    };

    Game_Battler.prototype.getSideviewBattler = function() {
        var battler = this.getBattler();

        return !!battler ? battler.getSideviewBattler() : null;
    };

    Game_Battler.prototype.isSideviewBattler = function() {
        var battler = this.getBattler();

        return !!battler ? battler.isSideviewBattler() : false;
    };

    Game_Battler.prototype.isUseWeapon = function() {
        var sideviewBattler = this.getSideviewBattler();

        if (!this.isSideviewBattler()) {
            return true;
        }

        return sideviewBattler.weapon;
    };

    Game_Battler.prototype.getSideviewFilename = function() {
        var sideviewBattler = this.getSideviewBattler();

        if (!this.isSideviewBattler()) {
            return null;
        }

        return sideviewBattler.filename;
    };

    Game_Battler.prototype.getSideviewSizes = function() {
        var sideviewBattler = this.getSideviewBattler();

        if (!this.isSideviewBattler()) {
            return null;
        }

        return sideviewBattler.sizes;
    };

    Game_Battler.prototype.getSideviewMotions = function() {
        var sideviewBattler = this.getSideviewBattler();

        if (!this.isSideviewBattler()) {
            return null;
        }

        return sideviewBattler.motions;
    };

    Game_Battler.prototype.getFallbackMotion = function() {
        var motions = this.getSideviewMotions();

        if (!this.isSideviewBattler()) {
            return null;
        }

        if (!!motions.other) {
            return motions.other;
        }

        return motions.walk;
    };

    Game_Battler.prototype.getSideviewMotion = function(motionName) {
        var motions = this.getSideviewMotions();

        if (!motionName) {
            return null;
        }

        if (!this.isSideviewBattler()) {
            return null;
        }

        if (!motions[motionName]) {
            return this.getFallbackMotion();
        }

        return motions[motionName];
    };

    Game_Battler.prototype.getSideviewFrames = function(motionName) {
        var sideviewBattler = this.getSideviewBattler(),
            motion = this.getSideviewMotion(motionName);

        if (!this.isSideviewBattler()) {
            return null;
        }

        if (!!motion && !!motion.frames) {
            return motion.frames;
        }

        return sideviewBattler.frames;
    };

    Game_Battler.prototype.getSideviewSpeed = function(motionName) {
        var sideviewBattler = this.getSideviewBattler(),
            motion = this.getSideviewMotion(motionName);

        if (!this.isSideviewBattler()) {
            return null;
        }

        if (!!motion && !!motion.speed) {
            return motion.speed;
        }

        return sideviewBattler.speed;
    };
}());

(function() {
    /**
     * Aliasing methods
     */
    var _Game_Actor_battlerName
        = Game_Actor.prototype.battlerName;

    Game_Actor.prototype.battlerName = function() {
        if (this.isSideviewBattler()) {
            return this.getSideviewFilename();
        }

        return _Game_Actor_battlerName.call(this);
    };
}());

(function() {
    /**
     * Aliasing methods
     */
    var _Game_Enemy_battlerName
        = Game_Enemy.prototype.battlerName;

    Game_Enemy.prototype.battlerName = function() {
        if (this.isSideviewBattler()) {
            return this.getSideviewFilename();
        }

        return _Game_Enemy_battlerName.call(this);
    };
}());

(function() {
    /**
     * Aliasing methods
     */
    var _Sprite_Actor_initMembers
        = Sprite_Actor.prototype.initMembers;
    var _Sprite_Actor_setupWeaponAnimation
        = Sprite_Actor.prototype.setupWeaponAnimation;
    var _Sprite_Actor_startMotion
        = Sprite_Actor.prototype.startMotion;
    var _Sprite_Actor_forceMotion
        = Sprite_Actor.prototype.forceMotion;
    var _Sprite_Actor_motionSpeed
        = Sprite_Actor.prototype.motionSpeed;
    var _Sprite_Actor_updateFrame
        = Sprite_Actor.prototype.updateFrame;
    var _Sprite_Actor_updateMotionCount
        = Sprite_Actor.prototype.updateMotionCount;

    Sprite_Actor.prototype.initMembers = function() {
        _Sprite_Actor_initMembers.call(this);

        this._motionName = "";
    };

    Sprite_Actor.prototype.setupWeaponAnimation = function() {
        if (this._actor.isUseWeapon()) {
            _Sprite_Actor_setupWeaponAnimation.call(this);
            return;
        }

        this._actor.clearWeaponAnimation();
    };

    Sprite_Actor.prototype.startMotion = function(motionType) {
        if (this._actor.isSideviewBattler()) {
            this.startSideviewMotion(motionType);
            return;
        }

        _Sprite_Actor_startMotion.call(this, motionType);
    };

    Sprite_Actor.prototype.forceMotion = function(motionType) {
        if (this._actor.isSideviewBattler()) {
            this.forceSideviewMotion(motionType);
            return;
        }

        _Sprite_Actor_forceMotion.call(this, motionType);
    };

    Sprite_Actor.prototype.startSideviewMotion = function(motionType) {
        if (this._motionName !== motionType) {
            this._motionName = motionType;
            this._motionCount = 0;
            this._pattern = 0;
        }
    };

    Sprite_Actor.prototype.forceSideviewMotion = function(motionType) {
        this._motionName = motionType;
        this._motionCount = 0;
        this._pattern = 0;
    };

    Sprite_Actor.prototype.getCurrentMotion = function() {
        return this._actor.getSideviewMotion(this._motionName);
    };

    Sprite_Actor.prototype.frameSizes = function() {
        return this._actor.getSideviewSizes();
    };

    Sprite_Actor.prototype.motionFrames = function() {
        var motionName = this._motionName;

        if (this._actor.isSideviewBattler()) {
            return this._actor.getSideviewFrames(motionName);
        }

        return 3;
    };

    Sprite_Actor.prototype.motionSpeed = function() {
        var motionName = this._motionName;

        if (this._actor.isSideviewBattler()) {
            return this._actor.getSideviewSpeed(motionName);
        }

        return _Sprite_Actor_motionSpeed.call(this);
    };

    Sprite_Actor.prototype.updateFrame = function() {
        if (this._actor.isSideviewBattler()) {
            this.updateSideviewFrame();
            return;
        }

        _Sprite_Actor_updateFrame.call(this);
    };

    Sprite_Actor.prototype.updateSideviewFrame = function() {
        var bitmap = this._mainSprite.bitmap,
            motion = this.getCurrentMotion(),
            frameSizes = this.frameSizes();

        Sprite_Battler.prototype.updateFrame.call(this);

        if (bitmap) {
            var motionIndex = motion.index;
            var pattern = this._pattern;
            var cw = frameSizes[0];
            var ch = frameSizes[1];
            var cx = pattern;
            var cy = motionIndex;
            this._mainSprite.setFrame(cx * cw, cy * ch, cw, ch);
        }
    };

    Sprite_Actor.prototype.updateMotionCount = function() {
        if (this._actor.isSideviewBattler()) {
            this.updateSideviewMotionCount();
            return;
        }

        _Sprite_Actor_updateMotionCount.call(this);
    };

    Sprite_Actor.prototype.updateSideviewMotionCount = function() {
        var motion = this.getCurrentMotion(),
            speed  = this.motionSpeed(),
            frames = this.motionFrames();

        if (!!motion && ++this._motionCount >= speed) {
            if (!!motion.loop) {
                this._pattern = (this._pattern + 1) % frames;
            } else if (this._pattern < frames - 1) {
                this._pattern++;
            } else {
                this.refreshMotion();
            }
            this._motionCount = 0;
        }
    };
}());

(function() {
    if (!Imported.YEP_X_AnimatedSVEnemies) {
        return;
    }
    /**
     * Aliasing methods
     */
    var _Sprite_Enemy_initMembers
        = Sprite_Enemy.prototype.initMembers;
    var _Sprite_Enemy_setupWeaponAnimation
        = Sprite_Enemy.prototype.setupWeaponAnimation;
    var _Sprite_Enemy_startMotion
        = Sprite_Enemy.prototype.startMotion;
    var _Sprite_Enemy_forceMotion
        = Sprite_Enemy.prototype.forceMotion;
    var _Sprite_Enemy_updateFrame
        = Sprite_Enemy.prototype.updateFrame;
    var _Sprite_Enemy_updateMotionCount
        = Sprite_Enemy.prototype.updateMotionCount;

    Sprite_Enemy.prototype.initMembers = function() {
        _Sprite_Enemy_initMembers.call(this);

        this._motionName = "";
    };

    Sprite_Enemy.prototype.setupWeaponAnimation = function() {
        if (this._enemy.isUseWeapon()) {
            _Sprite_Enemy_setupWeaponAnimation.call(this);
            return;
        }

        this._enemy.clearWeaponAnimation();
    };

    Sprite_Enemy.prototype.startMotion = function(motionType) {
        if (this._enemy.isSideviewBattler()) {
            this.startSideviewMotion(motionType);
            return;
        }

        _Sprite_Enemy_startMotion.call(this, motionType);
    };

    Sprite_Enemy.prototype.forceMotion = function(motionType) {
        if (this._enemy.isSideviewBattler()) {
            this.forceSideviewMotion(motionType);
            return;
        }

        _Sprite_Enemy_forceMotion.call(this, motionType);
    };

    Sprite_Enemy.prototype.startSideviewMotion = function(motionType) {
        if (this._motionName !== motionType) {
            this._motionName = motionType;
            this._motionCount = 0;
            this._pattern = 0;
        }
    };

    Sprite_Enemy.prototype.forceSideviewMotion = function(motionType) {
        this._motionName = motionType;
        this._motionCount = 0;
        this._pattern = 0;
    };

    Sprite_Enemy.prototype.getCurrentMotion = function() {
        return this._enemy.getSideviewMotion(this._motionName);
    };

    Sprite_Enemy.prototype.frameSizes = function() {
        return this._enemy.getSideviewSizes();
    };

    Sprite_Enemy.prototype.motionFrames = function() {
        var motionName = this._motionName;

        if (this._enemy.isSideviewBattler()) {
            return this._enemy.getSideviewFrames(motionName);
        }

        return 3;
    };

    Sprite_Enemy.prototype.motionSpeed = function() {
        var motionName = this._motionName;

        if (this._enemy.isSideviewBattler()) {
            return this._enemy.getSideviewSpeed(motionName);
        }

        return 12;
    };

    Sprite_Enemy.prototype.updateMotionCount = function() {
        if (this._enemy.isSideviewBattler()) {
            this.updateSideviewMotionCount();
            return;
        }

        _Sprite_Enemy_updateMotionCount.call(this);
    };

    Sprite_Enemy.prototype.updateSideviewMotionCount = function() {
        var motion = this.getCurrentMotion(),
            speed  = this.motionSpeed(),
            frames = this.motionFrames();

        if (!!motion && ++this._motionCount >= speed) {
            if (!!motion.loop) {
                this._pattern = (this._pattern + 1) % frames;
            } else if (this._pattern < frames - 1) {
                this._pattern++;
            } else {
                this.refreshMotion();
            }
            this._motionCount = 0;
        }
    };

    Sprite_Enemy.prototype.updateFrame = function() {
        if (this._enemy.isSideviewBattler()) {
            if (Imported.YEP_X_AnimatedSVEnemies) {
                this.updateSideviewFrame();
                return;
            }

            this.updateSideviewFrame();
            return;
        }

        _Sprite_Enemy_updateFrame.call(this);
    };

    // compatible with YEP - Animated Sideview Enemies
    Sprite_Enemy.prototype.updateSideviewFrame = function() {
        var bitmap = this._mainSprite.bitmap,
            motion = this.getCurrentMotion(),
            frameSizes = this.frameSizes();

        Sprite_Battler.prototype.updateFrame.call(this);

        if (bitmap.width <= 0) {
            return;
        }

        this._effectTarget = this._mainSprite;

        var motionIndex = motion.index;
        var pattern = this._pattern;
        var cw = frameSizes[0];
        var ch = frameSizes[1];
        var cx = pattern;
        var cy = motionIndex;
        var cdh = 0;

        if (this._effectType === 'bossCollapse') {
          cdh = ch - this._effectDuration;
        }

        this._mainSprite.setFrame(cx * cw, cy * ch, cw, ch - cdh);
        this.adjustMainBitmapSettings(bitmap);
        this.adjustSVShadowSettings();
    };
}());

