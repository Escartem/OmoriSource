//=============================================================================
// Olivia Engine - Horror Effects - for RPG Maker MV version 1.6.1
// Olivia_HorrorEffects.js
//=============================================================================
 /*:
 * @plugindesc <HorrorEffects> for RPG Maker MV version 1.6.1.
 * @author Fallen Angel Olivia
 *
 * @help
 * This is a RPG Maker MV plugin that will allow you to add visual horror
 * effects to your game's title screen, maps, events, pictures, battle, etc.
 * You can turn on individual effects at a time or multiple simultaneously. The
 * effects include a noise effect, a glitch effect, and a TV effect, which is
 * commonly seen used in most horror films. Now, you can use these effects in
 * RPG Maker MV, too!
 *
 * Be warned that this plugin was made in RPG Maker MV 1.6.1 and is untested in
 * lower versions so I cannot guarantee if it will work. To update to the
 * latest version, please download the update here to at least 1.6.1:
 * 
 * https://forums.rpgmakerweb.com/index.php?forums/rpg-maker-mv-releases.171/
 *
 *
 * 
 * -----------------
 * Plugin Parameters
 * -----------------
 *
 * Title1 Effects: Animate the Title1 image with noise, glitch, or TV effects?
 * This will be the first image used in the Database, System, Title Screen
 * setting for your game.
 *
 * Title2 Effects: Animate the Title2 image with noise, glitch, or TV effects?
 * This will be the second image used in the Database, System, Title Screen
 * setting for your game.
 *
 * Default Noise Settings: When applying noise effects to sprites in-game,
 * this will be the default settings used.
 *
 * Default Glitch Settings: When applying glitch effects to sprites in-game,
 * this will be the default settings used.
 *
 * Default TV Settings: When applying TV effects to sprites in-game,
 * this will be the default settings used.
 *
 * 
 *
 * ---------------
 * Plugin Commands
 * ---------------
 *
 * To apply horror effects to your game, use these plugin commands in the
 * following format:
 *
 *
 *
 * HorrorEffects target Create Noise
 * HorrorEffects target Create Glitch
 * HorrorEffects target Create TV
 * - Replace 'target' with a compatible effect target. This will create a horror
 * noise, glitch, or TV effect on the sprite.
 *
 * HorrorEffects target Remove Noise
 * HorrorEffects target Remove Glitch
 * HorrorEffects target Remove TV
 * - Replace 'target' with a compatible effect target. This will remove the
 * currently existing horror noise, glitch, or TV effect on the sprite.
 *
 * HorrorEffects target Clear
 * - Replace 'target' with a compatible effect target. This will remove all
 * noise, glitch, or TV effects from the sprite.
 *
 *
 *
 * HorrorEffects target Change Noise Rate x
 * - Replace 'target' with a compatible effect target. Replace 'x' with a number
 * value. The higher the number value, the more noise there is. The lower the
 * number value, the less noise there is. This can be a decimal value.
 *
 * HorrorEffects target Change Noise Animated true
 * HorrorEffects target Change Noise Animated false
 * - Replace 'target' with a compatible effect target. This will animate the
 * horror noise if true is used and stop animating the horror noise if false
 * is used instead.
 *
 *
 * 
 * HorrorEffects target Change Glitch Max x
 * - Replace 'target' with a compatible effect target. This will set the maximum
 * number of glitch slices to x.
 *
 * HorrorEffects target Change Glitch Min x
 * - Replace 'target' with a compatible effect target. This will set the minimum
 * number of glitch slices to x.
 *
 * HorrorEffects target Change Glitch Slice x
 * - Replace 'target' with a compatible effect target. This will set the maximum
 * and minimum number of glitch slices to x.
 *
 * HorrorEffects target Change Glitch Offset x
 * - Replace 'target' with a compatible effect target. This will set the glitch
 * offset (how wild it goes) to x. The higher the number, the further the glitch
 * can go. The lower the number, the closer to the base image it goes.
 *
 * HorrorEffects target Change Glitch Animated true
 * HorrorEffects target Change Glitch Animated false
 * - Replace 'target' with a compatible effect target. This will animate (true)
 * or remove the animation (false) of the glitch effect.
 *
 * HorrorEffects target Change Glitch Frequency x
 * - Replace 'target' with a compatible effect target. If animated, this will
 * set the glitch frequency to x frames.
 *
 * HorrorEffects target Change Glitch Strength x
 * - Replace 'target' with a compatible effect target. If animated, this will
 * set the glitch strength to x. The higher the number, the stronger the glitch
 * effect will last. The lower the number, the weaker the effect.
 *
 * HorrorEffects target Change Glitch Refresh
 * - Replace 'target' with a compatible effect target. Refreshes the current
 * glitched slices for a different setting.
 *
 *
 * HorrorEffects target Change TV Thickness x
 * - Replace 'target' with a compatible effect target. This will change the
 * line thickness of the TV effect. Larger numbers mean thicker lines.
 *
 * HorrorEffects target Change TV Corner x
 * - Replace 'target' with a compatible effect target. This will change the
 * corner size. Use a value between 0 and 1. The larger the number, the larger
 * the corners will be.
 *
 * HorrorEffects target Change TV Animated true
 * HorrorEffects target Change TV Animated false
 * - Replace 'target' with a compatible effect target. true will turn the TV
 * effect on. false will turn the TV effect off.
 *
 * HorrorEffects target Change TV Speed x
 * - Replace 'target' with a compatible effect target. This will change the
 * speed at which the TV animates.
 *
 * Targets
 *
 * These are things you can replace 'target' with:
 *
 * Screen
 * - Target becomes the visible map
 *
 * Battle
 * - Target becomes the battle screen
 *
 * Player
 * - Target becomes the first party member
 *
 * Follower x
 * - Target becomes the party member with slot x
 *
 * Event x
 * - Target becomes the map event with ID x
 *
 * Picture x
 * - Target becomes the picture with ID x
 *
 * Actor x
 * - Target becomes the actor with ID x
 *
 * Party x
 * - Target becomes the party member with slot x
 *
 * Enemy x
 * - Target becomes the battle enemy with index x
 *
 *
 *
 * ------------
 * Script Calls
 * ------------
 *
 * These script calls are used to create, remove, and change horror effects.
 *
 *
 *
 * Horror Effect Target Script Calls:
 *
 * target.createHorrorEffect('noise')
 * target.createHorrorEffect('glitch')
 * target.createHorrorEffect('tv')
 * - Replace 'target' with a compatible effect target. This will create a horror
 * noise, glitch, or TV effect on the sprite.
 *
 * target.removeHorrorEffect('noise')
 * target.removeHorrorEffect('glitch')
 * target.removeHorrorEffect('tv')
 * - Replace 'target' with a compatible effect target. This will remove the
 * currently existing horror noise, glitch, or TV effect on the sprite.
 * 
 * target.clearHorrorEffects()
 * - Replace 'target' with a compatible effect target. This will remove all
 * noise, glitch, or TV effects from the sprite.
 *
 * target.setHorrorEffectToValue('noise', 'noise', x)
 * - Replace 'target' with a compatible effect target. Replace 'x' with a number
 * value. The higher the number value, the more noise there is. The lower the
 * number value, the less noise there is. This can be a decimal value.
 *
 * target.setHorrorEffectToValue('noise', 'animated', true)
 * target.setHorrorEffectToValue('noise', 'animated', false)
 * - Replace 'target' with a compatible effect target. This will animate the
 * horror noise if true is used and stop animating the horror noise if false
 * is used instead.
 *
 * target.setHorrorEffectToValue('glitch', 'sliceMax', x)
 * - Replace 'target' with a compatible effect target. This will set the maximum
 * number of glitch slices to x.
 *
 * target.setHorrorEffectToValue('glitch', 'sliceMin', x)
 * - Replace 'target' with a compatible effect target. This will set the minimum
 * number of glitch slices to x.
 * 
 * target.setHorrorEffectToValue('glitch', 'slices', x)
 * - Replace 'target' with a compatible effect target. This will set the maximum
 * and minimum number of glitch slices to x.
 * 
 * target.setHorrorEffectToValue('glitch', 'offset', x)
 * - Replace 'target' with a compatible effect target. This will set the glitch
 * offset (how wild it goes) to x. The higher the number, the further the glitch
 * can go. The lower the number, the closer to the base image it goes.
 *
 * target.setHorrorEffectToValue('glitch', 'animated', true)
 * target.setHorrorEffectToValue('glitch', 'animated', false)
 * - Replace 'target' with a compatible effect target. This will animate (true)
 * or remove the animation (false) of the glitch effect.
 * 
 * target.setHorrorEffectToValue('glitch', 'aniFrequency', x)
 * - Replace 'target' with a compatible effect target. If animated, this will
 * set the glitch frequency to x frames.
 * 
 * target.setHorrorEffectToValue('glitch', 'aniStrength', x)
 * - Replace 'target' with a compatible effect target. If animated, this will
 * set the glitch strength to x. The higher the number, the stronger the glitch
 * effect will last. The lower the number, the weaker the effect.
 * 
 * target.setHorrorEffectToValue('tv', 'lineWidth', x)
 * - Replace 'target' with a compatible effect target. This will change the
 * line thickness of the TV effect. Larger numbers mean thicker lines.
 *
 * target.setHorrorEffectToValue('tv', 'vignetting', x)
 * - Replace 'target' with a compatible effect target. This will change the
 * corner size. Use a value between 0 and 1. The larger the number, the larger
 * the corners will be.
 *
 * target.setHorrorEffectToValue('tv', 'animated', true)
 * target.setHorrorEffectToValue('tv', 'animated', false)
 * - Replace 'target' with a compatible effect target. true will turn the TV
 * effect on. false will turn the TV effect off.
 *
 * target.setHorrorEffectToValue('tv', 'aniSpeed', x)
 * - Replace 'target' with a compatible effect target. This will change the
 * speed at which the TV animates.
 *
 * Targets
 *
 * These are things you can replace 'target' with:
 *
 * target = $gameScreen
 * - Target becomes the visible map
 *
 * target = $gameSystem
 * - Target becomes the battle screen
 *
 * target = $gamePlayer
 * - Target becomes the first party member
 *
 * target = $gameParty.members()[x]
 * - Target becomes the party member with index x
 *
 * target = $gameMap.event(x)
 * - Target becomes the map event with ID x
 *
 * target = $gameScreen.picture(x)
 * - Target becomes the picture with ID x
 *
 * target = $gameActors.actor(actorId);
 * - Target becomes the actor with ID x
 *
 * target = $gameTroop.members()[index];
 * - Target becomes the battle enemy with index x
 *
 *
 *
 * -------------------
 * W A R N I N G ! ! !
 * -------------------
 *
 * This plugin is made for RPG Maker MV versions 1.6.1. I have not tested this
 * plugin in lower versions so I cannot guarantee it works. To update to the
 * latest version, please download the update here to at least 1.6.1:
 * 
 * https://forums.rpgmakerweb.com/index.php?forums/rpg-maker-mv-releases.171/
 *
 * ------------
 * Terms of Use
 * ------------
 * 
 * 1. These plugins may be used in free or commercial games.
 * 2. 'Fallen Angel Olivia' must be given credit in your games.
 * 3. You are allowed to edit the code.
 * 4. Do NOT change the filename, parameters, and information of the plugin.
 * 5. You are NOT allowed to redistribute these Plugins.
 * 6. You may NOT take code for your own released Plugins.
 *
 * -------
 * Credits
 * -------
 *
 * If you are using this plugin, credit the following people:
 * 
 * - Fallen Angel Olivia
 *
 * @param 
 * @param 
 * @param ATTENTION!!!
 * @default READ THE HELP FILE
 * @param 
 * @param 
 *
 * @param Title1 Noise Effect
 * @type boolean
 * @on YES
 * @off NO
 * @desc Animate the Title1 image with a noise effect?
 * @default true
 *
 * @param Title1 Noise Rate
 * @text Noise Rate
 * @parent Title1 Noise Effect
 * @desc Noise rate to be used with the image.
 * @default 0.3
 *
 * @param Title1 Noise Animated
 * @text Noise Animated
 * @parent Title1 Noise Effect
 * @on YES
 * @off NO
 * @desc Animate the noise for the image?
 * @default true
 *
 * @param
 *
 * @param Title1 Glitch Effect
 * @type boolean
 * @on YES
 * @off NO
 * @desc Animate the Title1 image with a glitch effect?
 * @default true
 *
 * @param Title1 Glitch Slices
 * @text Glitch Slices
 * @parent Title1 Glitch Effect
 * @type number
 * @desc Glitch slices to be used with the image.
 * @default 10
 *
 * @param Title1 Glitch Offset
 * @text Glitch Offset
 * @parent Title1 Glitch Effect
 * @type number
 * @desc Default offset value
 * @default 100
 *
 * @param Title1 Glitch Animated
 * @text Glitch Animated
 * @parent Title1 Glitch Effect
 * @type boolean
 * @on YES
 * @off NO
 * @desc Animate the glitch effect?
 * @default true
 *
 * @param Title1 Glitch Animated Frequency
 * @text Glitch Frequency
 * @parent Title1 Glitch Animated
 * @type number
 * @min 1
 * @desc If animated, how frequent to make the glitch effect?
 * Lower = often     Higher = rarer
 * @default 300
 *
 * @param Title1 Glitch Animated Strength
 * @text Glitch Strength
 * @parent Title1 Glitch Animated
 * @type number
 * @min 1
 * @desc If animated, how strong is the glitch effect?
 * Lower = weaker     Higher = stronger
 * @default 30
 *
 * @param
 *
 * @param Title1 TV Effect
 * @type boolean
 * @on YES
 * @off NO
 * @desc Animate the Title1 image with a TV effect?
 * @default true
 * 
 * @param Title1 TV Line Thickness
 * @text Line Thickness
 * @parent Title1 TV Effect
 * @type number
 * @min 1
 * @desc Default TV line thickness
 * Lower = thinner     Higher = thicker
 * @default 5
 * 
 * @param Title1 TV Corner Size
 * @text Corner Size
 * @parent Title1 TV Effect
 * @desc Default TV line corner size
 * Lower = smaller     Higher = bigger
 * @default 0.3
 *
 * @param Title1 TV Animated
 * @parent Title1 TV Effect
 * @type boolean
 * @on YES
 * @off NO
 * @desc Animate the TV?
 * @default true
 *
 * @param Title1 TV Speed
 * @text TV Speed
 * @parent Title1 TV Animated
 * @desc Speed used to animate the TV if animated
 * Lower = slower     Higher = faster
 * @default 0.25
 *
 * @param
 *
  * @param Title2 Noise Effect
 * @type boolean
 * @on YES
 * @off NO
 * @desc Animate the Title2 image with a noise effect?
 * @default false
 *
 * @param Title2 Noise Rate
 * @text Noise Rate
 * @parent Title2 Noise Effect
 * @desc Noise rate to be used with the image.
 * @default 0.3
 *
 * @param Title2 Noise Animated
 * @text Noise Animated
 * @parent Title2 Noise Effect
 * @on YES
 * @off NO
 * @desc Animate the noise for the image?
 * @default true
 *
 * @param
 *
 * @param Title2 Glitch Effect
 * @type boolean
 * @on YES
 * @off NO
 * @desc Animate the Title2 image with a glitch effect?
 * @default true
 *
 * @param Title2 Glitch Slices
 * @text Glitch Slices
 * @parent Title2 Glitch Effect
 * @type number
 * @desc Glitch slices to be used with the image.
 * @default 10
 *
 * @param Title2 Glitch Offset
 * @text Glitch Offset
 * @parent Title2 Glitch Effect
 * @type number
 * @desc Default offset value
 * @default 20
 *
 * @param Title2 Glitch Animated
 * @text Glitch Animated
 * @parent Title2 Glitch Effect
 * @type boolean
 * @on YES
 * @off NO
 * @desc Animate the glitch effect?
 * @default true
 *
 * @param Title2 Glitch Animated Frequency
 * @text Glitch Frequency
 * @parent Title2 Glitch Animated
 * @type number
 * @min 1
 * @desc If animated, how frequent to make the glitch effect?
 * Lower = often     Higher = rarer
 * @default 200
 *
 * @param Title2 Glitch Animated Strength
 * @text Glitch Strength
 * @parent Title2 Glitch Animated
 * @type number
 * @min 1
 * @desc If animated, how strong is the glitch effect?
 * Lower = weaker     Higher = stronger
 * @default 10
 *
 * @param
 *
 * @param Title2 TV Effect
 * @type boolean
 * @on YES
 * @off NO
 * @desc Animate the Title2 image with a TV effect?
 * @default false
 * 
 * @param Title2 TV Line Thickness
 * @text Line Thickness
 * @parent Title2 TV Effect
 * @type number
 * @min 1
 * @desc Default TV line thickness
 * Lower = thinner     Higher = thicker
 * @default 5
 * 
 * @param Title2 TV Corner Size
 * @text Corner Size
 * @parent Title2 TV Effect
 * @desc Default TV line corner size
 * Lower = smaller     Higher = bigger
 * @default 0.3
 *
 * @param Title2 TV Animated
 * @parent Title2 TV Effect
 * @type boolean
 * @on YES
 * @off NO
 * @desc Animate the TV?
 * @default true
 *
 * @param Title2 TV Speed
 * @text TV Speed
 * @parent Title2 TV Animated
 * @desc Speed used to animate the TV if animated
 * Lower = slower     Higher = faster
 * @default 0.25
 *
 * @param
 *
 * @param Default Noise Settings
 *
 * @param Noise Default
 * @parent Default Noise Settings
 * @desc Default noise rate for new noise filters.
 * Lower = less     Higher = more
 * @default 0.5
 *
 * @param Noise Animated
 * @parent Default Noise Settings
 * @type boolean
 * @on YES
 * @off NO
 * @desc Animate the noise effect?
 * @default true
 *
 * @param
 *
 * @param Default Glitch Settings
 *
 * @param Glitch Slices
 * @parent Default Glitch Settings
 * @type number
 * @desc Default screen slices
 * @default 10
 *
 * @param Glitch Offset
 * @parent Default Glitch Settings
 * @type number
 * @desc Default offset value
 * @default 100
 *
 * @param Glitch Animated
 * @parent Default Glitch Settings
 * @type boolean
 * @on YES
 * @off NO
 * @desc Animate the glitch effect?
 * @default true
 *
 * @param Glitch Animated Frequency
 * @text Glitch Frequency
 * @parent Glitch Animated
 * @type number
 * @min 1
 * @desc If animated, how frequent to make the glitch effect?
 * Lower = often     Higher = rarer
 * @default 300
 *
 * @param Glitch Animated Strength
 * @text Glitch Strength
 * @parent Glitch Animated
 * @type number
 * @min 1
 * @desc If animated, how strong is the glitch effect?
 * Lower = weaker     Higher = stronger
 * @default 30
 *
 * @param
 *
 * @param Default TV Settings
 * 
 * @param TV Line Thickness
 * @parent Default TV Settings
 * @type number
 * @min 1
 * @desc Default TV line thickness
 * Lower = thinner     Higher = thicker
 * @default 5
 * 
 * @param TV Corner Size
 * @parent Default TV Settings
 * @desc Default TV line corner size
 * Lower = smaller     Higher = bigger
 * @default 0.3
 *
 * @param TV Animated
 * @parent Default TV Settings
 * @type boolean
 * @on YES
 * @off NO
 * @desc Animate the TV?
 * @default true
 *
 * @param TV Speed
 * @parent TV Animated
 * @desc Speed used to animate the TV if animated
 * Lower = slower     Higher = faster
 * @default 0.25
 *
 * @param
 *
 */
//=============================================================================

var Imported = Imported || {};
Imported.Olivia_Filters = true;

var Olivia = Olivia || {};

var parameters = $plugins.filter(function(p) { return p.description.contains('<HorrorEffects>') })[0].parameters;

Olivia.HorrorEffects = {
    // Title1
    Title1Settings: {
        Noise: eval(String(parameters['Title1 Noise Effect'])),
        NoiseRate: Number(parameters['Title1 Noise Rate']),
        NoiseAni: eval(String(parameters['Title1 Noise Animated'])),
        Glitch: eval(String(parameters['Title1 Glitch Effect'])),
        GlitchSlices: Number(parameters['Title1 Glitch Slices']),
        GlitchOffset: Number(parameters['Title1 Glitch Offset']),
        GlitchAni: eval(String(parameters['Title1 Glitch Animated'])),
        GlitchAniFreq: Number(parameters['Title1 Glitch Animated Frequency']),
        GlitchAniStr: Number(parameters['Title1 Glitch Animated Strength']),
        TV: eval(String(parameters['Title1 TV Effect'])),
        TVLineThickness: Number(parameters['Title1 TV Line Thickness']),
        TVCorner: Number(parameters['Title1 TV Corner Size']),
        TVAni: eval(String(parameters['Title1 TV Animated'])),
        TVAniSpeed: Number(parameters['Title1 TV Speed'])
    },
    // Title2
    Title2Settings: {
        Noise: eval(String(parameters['Title2 Noise Effect'])),
        NoiseRate: Number(parameters['Title2 Noise Rate']),
        NoiseAni: eval(String(parameters['Title2 Noise Animated'])),
        Glitch: eval(String(parameters['Title2 Glitch Effect'])),
        GlitchSlices: Number(parameters['Title2 Glitch Slices']),
        GlitchOffset: Number(parameters['Title2 Glitch Offset']),
        GlitchAni: eval(String(parameters['Title2 Glitch Animated'])),
        GlitchAniFreq: Number(parameters['Title2 Glitch Animated Frequency']),
        GlitchAniStr: Number(parameters['Title2 Glitch Animated Strength']),
        TV: eval(String(parameters['Title2 TV Effect'])),
        TVLineThickness: Number(parameters['Title2 TV Line Thickness']),
        TVCorner: Number(parameters['Title2 TV Corner Size']),
        TVAni: eval(String(parameters['Title2 TV Animated'])),
        TVAniSpeed: Number(parameters['Title2 TV Speed'])
    },
    // Noise
    NoiseRate: Number(parameters['Noise Default']),
    NoiseAni: eval(String(parameters['Noise Animated'])),
    // Glitch
    GlitchSlices: Number(parameters['Glitch Slices']),
    GlitchOffset: Number(parameters['Glitch Offset']),
    GlitchAni: eval(String(parameters['Glitch Animated'])),
    GlitchAniFreq: Number(parameters['Glitch Animated Frequency']),
    GlitchAniStr: Number(parameters['Glitch Animated Strength']),
    // TV
    TVLineThickness: Number(parameters['TV Line Thickness']),
    TVCorner: Number(parameters['TV Corner Size']),
    TVAni: eval(String(parameters['TV Animated'])),
    TVAniSpeed: Number(parameters['TV Speed']),
};

//-----------------------------------------------------------------------------
// Game_System
//
// The game object class for the system data.

Olivia.HorrorEffects.___Game_System_initialize___ = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Olivia.HorrorEffects.___Game_System_initialize___.call(this);
    this.clearHorrorEffects();
};

Game_System.prototype.clearHorrorEffects = function() {
    this._horrorFilters = {};
};

Game_System.prototype.createHorrorEffect = function(type) {
    if (this._horrorFilters === undefined) {
        this.clearHorrorEffects();
    }
    if (type.match(/noise/i) && !this._horrorFilters.noiseFilter) {
        this._horrorFilters.noiseFilter = {};
        this._horrorFilters.noiseFilter.noise = Olivia.HorrorEffects.NoiseRate;
        this._horrorFilters.noiseFilter.animated = Olivia.HorrorEffects.NoiseAni;
        this._horrorFilters.noiseFilter.needUpdate = true;
    } else if (type.match(/glitch/i) && !this._horrorFilters.glitchFilter) {
        this._horrorFilters.glitchFilter = {};
        this._horrorFilters.glitchFilter.slices = Olivia.HorrorEffects.GlitchSlices;
        this._horrorFilters.glitchFilter.offset = Olivia.HorrorEffects.GlitchOffset;
        this._horrorFilters.glitchFilter.sliceMin = Math.ceil(Olivia.HorrorEffects.GlitchSlices / 2);
        this._horrorFilters.glitchFilter.sliceMax = Olivia.HorrorEffects.GlitchSlices;
        this._horrorFilters.glitchFilter.animated = Olivia.HorrorEffects.GlitchAni;
        this._horrorFilters.glitchFilter.aniFrequency = Olivia.HorrorEffects.GlitchAniFreq;
        this._horrorFilters.glitchFilter.aniStrength = Olivia.HorrorEffects.GlitchAniStr;
        this._horrorFilters.glitchFilter.needUpdate = true;
    } else if (type.match(/tv/i) && !this._horrorFilters.tvFilter) {
        this._horrorFilters.tvFilter = {};
        this._horrorFilters.tvFilter.lineWidth = Olivia.HorrorEffects.TVLineThickness;
        this._horrorFilters.tvFilter.vignetting = Olivia.HorrorEffects.TVCorner;
        this._horrorFilters.tvFilter.animated = Olivia.HorrorEffects.TVAni;
        this._horrorFilters.tvFilter.aniSpeed = Olivia.HorrorEffects.TVAniSpeed;
        this._horrorFilters.tvFilter.needUpdate = true;
    }
};

Game_System.prototype.removeHorrorEffect = function(type) {
    if (this._horrorFilters === undefined) {
        this.clearHorrorEffects();
    }
    type += 'Filter';
    this._horrorFilters[type] = undefined;
};

Game_System.prototype.setHorrorEffectToValue = function(type, key, value) {
    if (this._horrorFilters === undefined) {
        this.clearHorrorEffects();
    }
    type += 'Filter';
    if (!!this._horrorFilters[type]) {
        this._horrorFilters[type][key] = value;
        this._horrorFilters[type].needUpdate = true;
    }
};

//-----------------------------------------------------------------------------
// Game_Screen
//
// The game object class for screen effect data, such as changes in color tone
// and flashes.

Olivia.HorrorEffects.___Game_Screen_clear___ = Game_Screen.prototype.clear;
Game_Screen.prototype.clear = function() {
    Olivia.HorrorEffects.___Game_Screen_clear___.call(this);
    this.clearHorrorEffects();
};

Game_Screen.prototype.clearHorrorEffects = function() {
    Game_System.prototype.clearHorrorEffects.call(this);
};

Game_Screen.prototype.createHorrorEffect = function(type) {
    Game_System.prototype.createHorrorEffect.call(this, type);
};

Game_Screen.prototype.removeHorrorEffect = function(type) {
    Game_System.prototype.removeHorrorEffect.call(this, type);
};

Game_Screen.prototype.setHorrorEffectToValue = function(type, key, value) {
    Game_System.prototype.setHorrorEffectToValue.call(this, type, key, value);
};

//-----------------------------------------------------------------------------
// Game_Picture
//
// The game object class for a picture.

Olivia.HorrorEffects.___Game_Picture_initialize___ = Game_Picture.prototype.initialize;
Game_Picture.prototype.initialize = function() {
    Olivia.HorrorEffects.___Game_Picture_initialize___.call(this);
    this._horrorFilters = this._horrorFilters || {};
};

Olivia.HorrorEffects.___Game_Picture_erase___ = Game_Picture.prototype.erase;
Game_Picture.prototype.erase = function() {
    Olivia.HorrorEffects.___Game_Picture_erase___.call(this);
    this.clearHorrorEffects();
};

Game_Picture.prototype.clearHorrorEffects = function() {
    Game_System.prototype.clearHorrorEffects.call(this);
};

Game_Picture.prototype.createHorrorEffect = function(type) {
    Game_System.prototype.createHorrorEffect.call(this, type);
};

Game_Picture.prototype.removeHorrorEffect = function(type) {
    Game_System.prototype.removeHorrorEffect.call(this, type);
};

Game_Picture.prototype.setHorrorEffectToValue = function(type, key, value) {
    Game_System.prototype.setHorrorEffectToValue.call(this, type, key, value);
};

//-----------------------------------------------------------------------------
// Game_BattlerBase
//
// The superclass of Game_Battler. It mainly contains parameters calculation.

Olivia.HorrorEffects.___Game_BattlerBase_initialize___ = Game_BattlerBase.prototype.initialize;
Game_BattlerBase.prototype.initialize = function() {
    Olivia.HorrorEffects.___Game_BattlerBase_initialize___.call(this);
    this.clearHorrorEffects();
};

Game_BattlerBase.prototype.clearHorrorEffects = function() {
    Game_System.prototype.clearHorrorEffects.call(this);
};

Game_BattlerBase.prototype.createHorrorEffect = function(type) {
    Game_System.prototype.createHorrorEffect.call(this, type);
};

Game_BattlerBase.prototype.removeHorrorEffect = function(type) {
    Game_System.prototype.removeHorrorEffect.call(this, type);
};

Game_BattlerBase.prototype.setHorrorEffectToValue = function(type, key, value) {
    Game_System.prototype.setHorrorEffectToValue.call(this, type, key, value);
};

//-----------------------------------------------------------------------------
// Game_CharacterBase
//
// The superclass of Game_Character. It handles basic information, such as
// coordinates and images, shared by all characters.

Olivia.HorrorEffects.___Game_CharacterBase_initMembers___ = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
    Olivia.HorrorEffects.___Game_CharacterBase_initMembers___.call(this);
    this.clearHorrorEffects();
};

Game_CharacterBase.prototype.clearHorrorEffects = function() {
    Game_System.prototype.clearHorrorEffects.call(this);
};

Game_CharacterBase.prototype.createHorrorEffect = function(type) {
    Game_System.prototype.createHorrorEffect.call(this, type);
};

Game_CharacterBase.prototype.removeHorrorEffect = function(type) {
    Game_System.prototype.removeHorrorEffect.call(this, type);
};

Game_CharacterBase.prototype.setHorrorEffectToValue = function(type, key, value) {
    Game_System.prototype.setHorrorEffectToValue.call(this, type, key, value);
};

//-----------------------------------------------------------------------------
// Game_Actor
//
// The game object class for an actor.

Olivia.HorrorEffects.___Game_Player_refresh___ = Game_Player.prototype.refresh;
Game_Player.prototype.refresh = function() {
    Olivia.HorrorEffects.___Game_Player_refresh___.call(this);
    if (!!$gameParty.leader()) {
        this._horrorFilters = JsonEx.makeDeepCopy($gameParty.leader()._horrorFilters);
    }
};

Game_Player.prototype.clearHorrorEffects = function() {
    if (!!$gameParty.leader()) {
        Game_System.prototype.clearHorrorEffects.call($gameParty.leader());
        this._horrorFilters = JsonEx.makeDeepCopy($gameParty.leader()._horrorFilters);
    }
};

Game_Player.prototype.createHorrorEffect = function(type) {
    if (!!$gameParty.leader()) {
        Game_System.prototype.createHorrorEffect.call($gameParty.leader(), type);
        this._horrorFilters = JsonEx.makeDeepCopy($gameParty.leader()._horrorFilters);
    }
};

Game_Player.prototype.removeHorrorEffect = function(type) {
    if (!!$gameParty.leader()) {
        Game_System.prototype.removeHorrorEffect.call($gameParty.leader(), type);
        this._horrorFilters = JsonEx.makeDeepCopy($gameParty.leader()._horrorFilters);
    }
};

Game_Player.prototype.setHorrorEffectToValue = function(type, key, value) {
    if (!!$gameParty.leader()) {
        Game_System.prototype.setHorrorEffectToValue.call($gameParty.leader(), type, key, value);
        this._horrorFilters = JsonEx.makeDeepCopy($gameParty.leader()._horrorFilters);
    }
};

//-----------------------------------------------------------------------------
// Game_Follower
//
// The game object class for a follower. A follower is an allied character,
// other than the front character, displayed in the party.

Olivia.HorrorEffects.___Game_Follower_refresh___ = Game_Follower.prototype.refresh;
Game_Follower.prototype.refresh = function() {
    Olivia.HorrorEffects.___Game_Follower_refresh___.call(this);
    if (!!this.actor()) {
        this._horrorFilters = JsonEx.makeDeepCopy(this.actor()._horrorFilters);
    }
};

Game_Follower.prototype.clearHorrorEffects = function() {
    if (!!this.actor()) {
        Game_System.prototype.clearHorrorEffects.call(this.actor());
        this._horrorFilters = JsonEx.makeDeepCopy(this.actor()._horrorFilters);
    }
};

Game_Follower.prototype.createHorrorEffect = function(type) {
    if (!!this.actor()) {
        Game_System.prototype.createHorrorEffect.call(this.actor(), type);
        this._horrorFilters = JsonEx.makeDeepCopy(this.actor()._horrorFilters);
    }
};

Game_Follower.prototype.removeHorrorEffect = function(type) {
    if (!!this.actor()) {
        Game_System.prototype.removeHorrorEffect.call(this.actor(), type);
        this._horrorFilters = JsonEx.makeDeepCopy(this.actor()._horrorFilters);
    }
};

Game_Follower.prototype.setHorrorEffectToValue = function(type, key, value) {
    if (!!this.actor()) {
        Game_System.prototype.setHorrorEffectToValue.call(this.actor(), type, key, value);
        this._horrorFilters = JsonEx.makeDeepCopy(this.actor()._horrorFilters);
    }
};

//-----------------------------------------------------------------------------
// Sprite
//
// The basic object that is rendered to the game screen.

Olivia.HorrorEffects.___Sprite_initialize___ = Sprite.prototype.initialize;
Sprite.prototype.initialize = function(bitmap) {
    this._horrorFilters = {};
    this._horrorFiltersSource = this._horrorFiltersSource || null;
    Olivia.HorrorEffects.___Sprite_initialize___.call(this, bitmap);
};

Olivia.HorrorEffects.___Sprite_update___ = Sprite.prototype.update;
Sprite.prototype.update = function() {
    this.synchronizeHorrorFiltersWithSource();
    Olivia.HorrorEffects.___Sprite_update___.call(this);
    this.updateHorrorEffects();
};

Sprite.prototype.synchronizeHorrorFiltersWithSource = function() {
    if (!!this._horrorFiltersSource && !!this._horrorFiltersSource._horrorFilters) {
        //if (this._picture) console.log(this._horrorFiltersSource)
        var source = this._horrorFiltersSource._horrorFilters;
        // Noise
        if (!!source.noiseFilter) {
            if (!this._horrorFilters.noiseFilter) {
                this.createHorrorNoise();
            }
            if (source.noiseFilter.needUpdate) {
                source.noiseFilter.needUpdate = false;
                var keys = ['noise', 'animated'];
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    this._horrorFilters.noiseFilter[key] = source.noiseFilter[key];
                }
            }
        } else {
            if (!!this._horrorFilters.noiseFilter) {
                this.removeHorrorNoise();
            }
        }
        // Glitch
        if (!!source.glitchFilter) {
            if (!this._horrorFilters.glitchFilter) {
                this.createHorrorGlitch();
            }
            if (source.glitchFilter.needUpdate) {
                source.glitchFilter.needUpdate = false;
                var keys = ['slices', 'offset', 'sliceMin', 'sliceMax', 'animated', 'aniFrequency', 'aniStrength', 'refreshRequest'];
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    this._horrorFilters.glitchFilter[key] = source.glitchFilter[key];
                    if (key === 'refreshRequest') {
                        source.glitchFilter[key] = false;
                    }
                }
            }
        } else {
            if (!!this._horrorFilters.glitchFilter) {
                this.removeHorrorGlitch();
            }
        }
        // TV
        if (!!source.tvFilter) {
            if (!this._horrorFilters.tvFilter) {
                this.createHorrorTV();
            }
            if (source.tvFilter.needUpdate) {
                source.tvFilter.needUpdate = false;
                var keys = ['lineWidth', 'vignetting', 'animated', 'aniSpeed'];
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    this._horrorFilters.tvFilter[key] = source.tvFilter[key];
                }
            }
        } else {
            if (!!this._horrorFilters.tvFilter) {
                this.removeHorrorTV();
            }
        }
    }
};

Sprite.prototype.updateHorrorEffects = function() {
    this.updateHorrorNoise();
    this.updateHorrorGlitch();
    this.updateHorrorTV();
};

Sprite.prototype.createHorrorFilter = function(filter) {
    this._filters = this._filters || [];
    this._filters.push(filter);
};

Sprite.prototype.removeHorrorFilter = function(filter) {
    var index = this._filters.indexOf(filter);
    this._filters.splice(index, 1);
    if (this._filters.length === 0) {
        this._filters = null;
    }
};

var __filters=function(e,t){"use strict";var n="attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}",r="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform float gamma;\nuniform float contrast;\nuniform float saturation;\nuniform float brightness;\nuniform float red;\nuniform float green;\nuniform float blue;\nuniform float alpha;\n\nvoid main(void)\n{\n    vec4 c = texture2D(uSampler, vTextureCoord);\n\n    if (c.a > 0.0) {\n        c.rgb /= c.a;\n\n        vec3 rgb = pow(c.rgb, vec3(1. / gamma));\n        rgb = mix(vec3(.5), mix(vec3(dot(vec3(.2125, .7154, .0721), rgb)), rgb, saturation), contrast);\n        rgb.r *= red;\n        rgb.g *= green;\n        rgb.b *= blue;\n        c.rgb = rgb * brightness;\n\n        c.rgb *= c.a;\n    }\n\n    gl_FragColor = c * alpha;\n}\n",o=function(e){function t(t){e.call(this,n,r),Object.assign(this,{gamma:1,saturation:1,contrast:1,brightness:1,red:1,green:1,blue:1,alpha:1},t)}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.apply=function(e,t,n,r){this.uniforms.gamma=Math.max(this.gamma,1e-4),this.uniforms.saturation=this.saturation,this.uniforms.contrast=this.contrast,this.uniforms.brightness=this.brightness,this.uniforms.red=this.red,this.uniforms.green=this.green,this.uniforms.blue=this.blue,this.uniforms.alpha=this.alpha,e.applyFilter(this,t,n,r)},t}(t.Filter),i=n,l="\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec2 uOffset;\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n\n    // Sample top left pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y + uOffset.y));\n\n    // Sample top right pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y + uOffset.y));\n\n    // Sample bottom right pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y - uOffset.y));\n\n    // Sample bottom left pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y - uOffset.y));\n\n    // Average\n    color *= 0.25;\n\n    gl_FragColor = color;\n}",s="\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec2 uOffset;\nuniform vec4 filterClamp;\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n\n    // Sample top left pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y + uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Sample top right pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y + uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Sample bottom right pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y - uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Sample bottom left pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y - uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Average\n    color *= 0.25;\n\n    gl_FragColor = color;\n}\n",a=function(e){function n(n,r,o){void 0===n&&(n=4),void 0===r&&(r=3),void 0===o&&(o=!1),e.call(this,i,o?s:l),this.uniforms.uOffset=new Float32Array(2),this._pixelSize=new t.Point,this.pixelSize=1,this._clamp=o,this._kernels=null,Array.isArray(n)?this.kernels=n:(this._blur=n,this.quality=r)}e&&(n.__proto__=e),n.prototype=Object.create(e&&e.prototype),n.prototype.constructor=n;var r={kernels:{configurable:!0},clamp:{configurable:!0},pixelSize:{configurable:!0},quality:{configurable:!0},blur:{configurable:!0}};return n.prototype.apply=function(e,t,n,r){var o,i=this.pixelSize.x/t.size.width,l=this.pixelSize.y/t.size.height;if(1===this._quality||0===this._blur)o=this._kernels[0]+.5,this.uniforms.uOffset[0]=o*i,this.uniforms.uOffset[1]=o*l,e.applyFilter(this,t,n,r);else{for(var s,a=e.getRenderTarget(!0),u=t,c=a,f=this._quality-1,h=0;h<f;h++)o=this._kernels[h]+.5,this.uniforms.uOffset[0]=o*i,this.uniforms.uOffset[1]=o*l,e.applyFilter(this,u,c,!0),s=u,u=c,c=s;o=this._kernels[f]+.5,this.uniforms.uOffset[0]=o*i,this.uniforms.uOffset[1]=o*l,e.applyFilter(this,u,n,r),e.returnRenderTarget(a)}},n.prototype._generateKernels=function(){var e=this._blur,t=this._quality,n=[e];if(e>0)for(var r=e,o=e/t,i=1;i<t;i++)r-=o,n.push(r);this._kernels=n},r.kernels.get=function(){return this._kernels},r.kernels.set=function(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max.apply(Math,e)):(this._kernels=[0],this._quality=1)},r.clamp.get=function(){return this._clamp},r.pixelSize.set=function(e){"number"==typeof e?(this._pixelSize.x=e,this._pixelSize.y=e):Array.isArray(e)?(this._pixelSize.x=e[0],this._pixelSize.y=e[1]):e instanceof t.Point?(this._pixelSize.x=e.x,this._pixelSize.y=e.y):(this._pixelSize.x=1,this._pixelSize.y=1)},r.pixelSize.get=function(){return this._pixelSize},r.quality.get=function(){return this._quality},r.quality.set=function(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()},r.blur.get=function(){return this._blur},r.blur.set=function(e){this._blur=e,this._generateKernels()},Object.defineProperties(n.prototype,r),n}(t.Filter),u=n,c="\nuniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\n\nuniform float threshold;\n\nvoid main() {\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    // A simple & fast algorithm for getting brightness.\n    // It's inaccuracy , but good enought for this feature.\n    float _max = max(max(color.r, color.g), color.b);\n    float _min = min(min(color.r, color.g), color.b);\n    float brightness = (_max + _min) * 0.5;\n\n    if(brightness > threshold) {\n        gl_FragColor = color;\n    } else {\n        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);\n    }\n}\n",f=function(e){function t(t){void 0===t&&(t=.5),e.call(this,u,c),this.threshold=t}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={threshold:{configurable:!0}};return n.threshold.get=function(){return this.uniforms.threshold},n.threshold.set=function(e){this.uniforms.threshold=e},Object.defineProperties(t.prototype,n),t}(t.Filter),h="uniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\n\nuniform sampler2D bloomTexture;\nuniform float bloomScale;\nuniform float brightness;\n\nvoid main() {\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    color.rgb *= brightness;\n    vec4 bloomColor = vec4(texture2D(bloomTexture, vTextureCoord).rgb, 0.0);\n    bloomColor.rgb *= bloomScale;\n    gl_FragColor = color + bloomColor;\n}\n",p=function(e){function n(n){e.call(this,u,h),"number"==typeof n&&(n={threshold:n}),n=Object.assign({threshold:.5,bloomScale:1,brightness:1,kernels:null,blur:8,quality:4,pixelSize:1,resolution:t.settings.RESOLUTION},n),this.bloomScale=n.bloomScale,this.brightness=n.brightness;var r=n.kernels,o=n.blur,i=n.quality,l=n.pixelSize,s=n.resolution;this._extractFilter=new f(n.threshold),this._extractFilter.resolution=s,this._blurFilter=r?new a(r):new a(o,i),this.pixelSize=l,this.resolution=s}e&&(n.__proto__=e),n.prototype=Object.create(e&&e.prototype),n.prototype.constructor=n;var r={resolution:{configurable:!0},threshold:{configurable:!0},kernels:{configurable:!0},blur:{configurable:!0},quality:{configurable:!0},pixelSize:{configurable:!0}};return n.prototype.apply=function(e,t,n,r,o){var i=e.getRenderTarget(!0);this._extractFilter.apply(e,t,i,!0,o);var l=e.getRenderTarget(!0);this._blurFilter.apply(e,i,l,!0,o),this.uniforms.bloomScale=this.bloomScale,this.uniforms.brightness=this.brightness,this.uniforms.bloomTexture=l,e.applyFilter(this,t,n,r),e.returnRenderTarget(l),e.returnRenderTarget(i)},r.resolution.get=function(){return this._resolution},r.resolution.set=function(e){this._resolution=e,this._extractFilter&&(this._extractFilter.resolution=e),this._blurFilter&&(this._blurFilter.resolution=e)},r.threshold.get=function(){return this._extractFilter.threshold},r.threshold.set=function(e){this._extractFilter.threshold=e},r.kernels.get=function(){return this._blurFilter.kernels},r.kernels.set=function(e){this._blurFilter.kernels=e},r.blur.get=function(){return this._blurFilter.blur},r.blur.set=function(e){this._blurFilter.blur=e},r.quality.get=function(){return this._blurFilter.quality},r.quality.set=function(e){this._blurFilter.quality=e},r.pixelSize.get=function(){return this._blurFilter.pixelSize},r.pixelSize.set=function(e){this._blurFilter.pixelSize=e},Object.defineProperties(n.prototype,r),n}(t.Filter),d=n,m="varying vec2 vTextureCoord;\n\nuniform vec4 filterArea;\nuniform float pixelSize;\nuniform sampler2D uSampler;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvec2 pixelate(vec2 coord, vec2 size)\n{\n    return floor( coord / size ) * size;\n}\n\nvec2 getMod(vec2 coord, vec2 size)\n{\n    return mod( coord , size) / size;\n}\n\nfloat character(float n, vec2 p)\n{\n    p = floor(p*vec2(4.0, -4.0) + 2.5);\n    if (clamp(p.x, 0.0, 4.0) == p.x && clamp(p.y, 0.0, 4.0) == p.y)\n    {\n        if (int(mod(n/exp2(p.x + 5.0*p.y), 2.0)) == 1) return 1.0;\n    }\n    return 0.0;\n}\n\nvoid main()\n{\n    vec2 coord = mapCoord(vTextureCoord);\n\n    // get the rounded color..\n    vec2 pixCoord = pixelate(coord, vec2(pixelSize));\n    pixCoord = unmapCoord(pixCoord);\n\n    vec4 color = texture2D(uSampler, pixCoord);\n\n    // determine the character to use\n    float gray = (color.r + color.g + color.b) / 3.0;\n\n    float n =  65536.0;             // .\n    if (gray > 0.2) n = 65600.0;    // :\n    if (gray > 0.3) n = 332772.0;   // *\n    if (gray > 0.4) n = 15255086.0; // o\n    if (gray > 0.5) n = 23385164.0; // &\n    if (gray > 0.6) n = 15252014.0; // 8\n    if (gray > 0.7) n = 13199452.0; // @\n    if (gray > 0.8) n = 11512810.0; // #\n\n    // get the mod..\n    vec2 modd = getMod(coord, vec2(pixelSize));\n\n    gl_FragColor = color * character( n, vec2(-1.0) + modd * 2.0);\n\n}",g=function(e){function t(t){void 0===t&&(t=8),e.call(this,d,m),this.size=t}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={size:{configurable:!0}};return n.size.get=function(){return this.uniforms.pixelSize},n.size.set=function(e){this.uniforms.pixelSize=e},Object.defineProperties(t.prototype,n),t}(t.Filter),v=n,x="precision mediump float;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform float transformX;\nuniform float transformY;\nuniform vec3 lightColor;\nuniform float lightAlpha;\nuniform vec3 shadowColor;\nuniform float shadowAlpha;\n\nvoid main(void) {\n    vec2 transform = vec2(1.0 / filterArea) * vec2(transformX, transformY);\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    float light = texture2D(uSampler, vTextureCoord - transform).a;\n    float shadow = texture2D(uSampler, vTextureCoord + transform).a;\n\n    color.rgb = mix(color.rgb, lightColor, clamp((color.a - light) * lightAlpha, 0.0, 1.0));\n    color.rgb = mix(color.rgb, shadowColor, clamp((color.a - shadow) * shadowAlpha, 0.0, 1.0));\n    gl_FragColor = vec4(color.rgb * color.a, color.a);\n}\n",y=function(e){function n(t){void 0===t&&(t={}),e.call(this,v,x),this.uniforms.lightColor=new Float32Array(3),this.uniforms.shadowColor=new Float32Array(3),t=Object.assign({rotation:45,thickness:2,lightColor:16777215,lightAlpha:.7,shadowColor:0,shadowAlpha:.7},t),this.rotation=t.rotation,this.thickness=t.thickness,this.lightColor=t.lightColor,this.lightAlpha=t.lightAlpha,this.shadowColor=t.shadowColor,this.shadowAlpha=t.shadowAlpha}e&&(n.__proto__=e),n.prototype=Object.create(e&&e.prototype),n.prototype.constructor=n;var r={rotation:{configurable:!0},thickness:{configurable:!0},lightColor:{configurable:!0},lightAlpha:{configurable:!0},shadowColor:{configurable:!0},shadowAlpha:{configurable:!0}};return n.prototype._updateTransform=function(){this.uniforms.transformX=this._thickness*Math.cos(this._angle),this.uniforms.transformY=this._thickness*Math.sin(this._angle)},r.rotation.get=function(){return this._angle/t.DEG_TO_RAD},r.rotation.set=function(e){this._angle=e*t.DEG_TO_RAD,this._updateTransform()},r.thickness.get=function(){return this._thickness},r.thickness.set=function(e){this._thickness=e,this._updateTransform()},r.lightColor.get=function(){return t.utils.rgb2hex(this.uniforms.lightColor)},r.lightColor.set=function(e){t.utils.hex2rgb(e,this.uniforms.lightColor)},r.lightAlpha.get=function(){return this.uniforms.lightAlpha},r.lightAlpha.set=function(e){this.uniforms.lightAlpha=e},r.shadowColor.get=function(){return t.utils.rgb2hex(this.uniforms.shadowColor)},r.shadowColor.set=function(e){t.utils.hex2rgb(e,this.uniforms.shadowColor)},r.shadowAlpha.get=function(){return this.uniforms.shadowAlpha},r.shadowAlpha.set=function(e){this.uniforms.shadowAlpha=e},Object.defineProperties(n.prototype,r),n}(t.Filter),_=t.filters,b=_.BlurXFilter,C=_.BlurYFilter,S=_.AlphaFilter,F=function(e){function n(n,r,o,i){var l,s;void 0===n&&(n=2),void 0===r&&(r=4),void 0===o&&(o=t.settings.RESOLUTION),void 0===i&&(i=5),e.call(this),"number"==typeof n?(l=n,s=n):n instanceof t.Point?(l=n.x,s=n.y):Array.isArray(n)&&(l=n[0],s=n[1]),this.blurXFilter=new b(l,r,o,i),this.blurYFilter=new C(s,r,o,i),this.blurYFilter.blendMode=t.BLEND_MODES.SCREEN,this.defaultFilter=new S}e&&(n.__proto__=e),n.prototype=Object.create(e&&e.prototype),n.prototype.constructor=n;var r={blur:{configurable:!0},blurX:{configurable:!0},blurY:{configurable:!0}};return n.prototype.apply=function(e,t,n){var r=e.getRenderTarget(!0);this.defaultFilter.apply(e,t,n),this.blurXFilter.apply(e,t,r),this.blurYFilter.apply(e,r,n),e.returnRenderTarget(r)},r.blur.get=function(){return this.blurXFilter.blur},r.blur.set=function(e){this.blurXFilter.blur=this.blurYFilter.blur=e},r.blurX.get=function(){return this.blurXFilter.blur},r.blurX.set=function(e){this.blurXFilter.blur=e},r.blurY.get=function(){return this.blurYFilter.blur},r.blurY.set=function(e){this.blurYFilter.blur=e},Object.defineProperties(n.prototype,r),n}(t.Filter),z=n,A="uniform float radius;\nuniform float strength;\nuniform vec2 center;\nuniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform vec2 dimensions;\n\nvoid main()\n{\n    vec2 coord = vTextureCoord * filterArea.xy;\n    coord -= center * dimensions.xy;\n    float distance = length(coord);\n    if (distance < radius) {\n        float percent = distance / radius;\n        if (strength > 0.0) {\n            coord *= mix(1.0, smoothstep(0.0, radius / distance, percent), strength * 0.75);\n        } else {\n            coord *= mix(1.0, pow(percent, 1.0 + strength * 0.75) * radius / distance, 1.0 - percent);\n        }\n    }\n    coord += center * dimensions.xy;\n    coord /= filterArea.xy;\n    vec2 clampedCoord = clamp(coord, filterClamp.xy, filterClamp.zw);\n    vec4 color = texture2D(uSampler, clampedCoord);\n    if (coord != clampedCoord) {\n        color *= max(0.0, 1.0 - length(coord - clampedCoord));\n    }\n\n    gl_FragColor = color;\n}\n",w=function(e){function t(t,n,r){e.call(this,z,A),this.uniforms.dimensions=new Float32Array(2),this.center=t||[.5,.5],this.radius=n||100,this.strength=r||1}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={radius:{configurable:!0},strength:{configurable:!0},center:{configurable:!0}};return t.prototype.apply=function(e,t,n,r){this.uniforms.dimensions[0]=t.sourceFrame.width,this.uniforms.dimensions[1]=t.sourceFrame.height,e.applyFilter(this,t,n,r)},n.radius.get=function(){return this.uniforms.radius},n.radius.set=function(e){this.uniforms.radius=e},n.strength.get=function(){return this.uniforms.strength},n.strength.set=function(e){this.uniforms.strength=e},n.center.get=function(){return this.uniforms.center},n.center.set=function(e){this.uniforms.center=e},Object.defineProperties(t.prototype,n),t}(t.Filter),T=n,D="\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform sampler2D colorMap;\n\nuniform float _mix;\nuniform float _size;\nuniform float _sliceSize;\nuniform float _slicePixelSize;\nuniform float _sliceInnerSize;\n\nvoid main() {\n    vec4 color = texture2D(uSampler, vTextureCoord.xy);\n\n    float sliceIndex = color.b * (_size - 1.0);\n    float zSlice0 = floor(sliceIndex);\n    float zSlice1 = ceil(sliceIndex);\n\n    float xOffset = _slicePixelSize * 0.5 + color.r * _sliceInnerSize;\n    float s0 = xOffset + zSlice0 * _sliceSize;\n    float s1 = xOffset + zSlice1 * _sliceSize;\n    vec4 slice0Color = texture2D(colorMap, vec2(s0, color.g));\n    vec4 slice1Color = texture2D(colorMap, vec2(s1, color.g));\n    vec4 adjusted = mix(slice0Color, slice1Color, fract(sliceIndex));\n\n    gl_FragColor = mix(color, adjusted, _mix);\n}\n",O=function(e){function n(t,n,r){void 0===n&&(n=!1),void 0===r&&(r=1),e.call(this,T,D),this._size=0,this._sliceSize=0,this._slicePixelSize=0,this._sliceInnerSize=0,this._scaleMode=null,this._nearest=!1,this.nearest=n,this.mix=r,this.colorMap=t}e&&(n.__proto__=e),n.prototype=Object.create(e&&e.prototype),n.prototype.constructor=n;var r={colorSize:{configurable:!0},colorMap:{configurable:!0},nearest:{configurable:!0}};return n.prototype.apply=function(e,t,n,r){this.uniforms._mix=this.mix,e.applyFilter(this,t,n,r)},r.colorSize.get=function(){return this._size},r.colorMap.get=function(){return this._colorMap},r.colorMap.set=function(e){e instanceof t.Texture||(e=t.Texture.from(e)),e&&e.baseTexture&&(e.baseTexture.scaleMode=this._scaleMode,e.baseTexture.mipmap=!1,this._size=e.height,this._sliceSize=1/this._size,this._slicePixelSize=this._sliceSize/this._size,this._sliceInnerSize=this._slicePixelSize*(this._size-1),this.uniforms._size=this._size,this.uniforms._sliceSize=this._sliceSize,this.uniforms._slicePixelSize=this._slicePixelSize,this.uniforms._sliceInnerSize=this._sliceInnerSize,this.uniforms.colorMap=e),this._colorMap=e},r.nearest.get=function(){return this._nearest},r.nearest.set=function(e){this._nearest=e,this._scaleMode=e?t.SCALE_MODES.NEAREST:t.SCALE_MODES.LINEAR;var n=this._colorMap;n&&n.baseTexture&&(n.baseTexture._glTextures={},n.baseTexture.scaleMode=this._scaleMode,n.baseTexture.mipmap=!1,n._updateID++,n.baseTexture.emit("update",n.baseTexture))},n.prototype.updateColorMap=function(){var e=this._colorMap;e&&e.baseTexture&&(e._updateID++,e.baseTexture.emit("update",e.baseTexture),this.colorMap=e)},n.prototype.destroy=function(t){this._colorMap&&this._colorMap.destroy(t),e.prototype.destroy.call(this)},Object.defineProperties(n.prototype,r),n}(t.Filter),P=n,M="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec3 originalColor;\nuniform vec3 newColor;\nuniform float epsilon;\nvoid main(void) {\n    vec4 currentColor = texture2D(uSampler, vTextureCoord);\n    vec3 colorDiff = originalColor - (currentColor.rgb / max(currentColor.a, 0.0000000001));\n    float colorDistance = length(colorDiff);\n    float doReplace = step(colorDistance, epsilon);\n    gl_FragColor = vec4(mix(currentColor.rgb, (newColor + colorDiff) * currentColor.a, doReplace), currentColor.a);\n}\n",R=function(e){function n(t,n,r){void 0===t&&(t=16711680),void 0===n&&(n=0),void 0===r&&(r=.4),e.call(this,P,M),this.uniforms.originalColor=new Float32Array(3),this.uniforms.newColor=new Float32Array(3),this.originalColor=t,this.newColor=n,this.epsilon=r}e&&(n.__proto__=e),n.prototype=Object.create(e&&e.prototype),n.prototype.constructor=n;var r={originalColor:{configurable:!0},newColor:{configurable:!0},epsilon:{configurable:!0}};return r.originalColor.set=function(e){var n=this.uniforms.originalColor;"number"==typeof e?(t.utils.hex2rgb(e,n),this._originalColor=e):(n[0]=e[0],n[1]=e[1],n[2]=e[2],this._originalColor=t.utils.rgb2hex(n))},r.originalColor.get=function(){return this._originalColor},r.newColor.set=function(e){var n=this.uniforms.newColor;"number"==typeof e?(t.utils.hex2rgb(e,n),this._newColor=e):(n[0]=e[0],n[1]=e[1],n[2]=e[2],this._newColor=t.utils.rgb2hex(n))},r.newColor.get=function(){return this._newColor},r.epsilon.set=function(e){this.uniforms.epsilon=e},r.epsilon.get=function(){return this.uniforms.epsilon},Object.defineProperties(n.prototype,r),n}(t.Filter),j=n,L="precision mediump float;\n\nvarying mediump vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec2 texelSize;\nuniform float matrix[9];\n\nvoid main(void)\n{\n   vec4 c11 = texture2D(uSampler, vTextureCoord - texelSize); // top left\n   vec4 c12 = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - texelSize.y)); // top center\n   vec4 c13 = texture2D(uSampler, vec2(vTextureCoord.x + texelSize.x, vTextureCoord.y - texelSize.y)); // top right\n\n   vec4 c21 = texture2D(uSampler, vec2(vTextureCoord.x - texelSize.x, vTextureCoord.y)); // mid left\n   vec4 c22 = texture2D(uSampler, vTextureCoord); // mid center\n   vec4 c23 = texture2D(uSampler, vec2(vTextureCoord.x + texelSize.x, vTextureCoord.y)); // mid right\n\n   vec4 c31 = texture2D(uSampler, vec2(vTextureCoord.x - texelSize.x, vTextureCoord.y + texelSize.y)); // bottom left\n   vec4 c32 = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + texelSize.y)); // bottom center\n   vec4 c33 = texture2D(uSampler, vTextureCoord + texelSize); // bottom right\n\n   gl_FragColor =\n       c11 * matrix[0] + c12 * matrix[1] + c13 * matrix[2] +\n       c21 * matrix[3] + c22 * matrix[4] + c23 * matrix[5] +\n       c31 * matrix[6] + c32 * matrix[7] + c33 * matrix[8];\n\n   gl_FragColor.a = c22.a;\n}\n",k=function(e){function t(t,n,r){e.call(this,j,L),this.uniforms.texelSize=new Float32Array(9),this.matrix=t,this.width=n,this.height=r}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={matrix:{configurable:!0},width:{configurable:!0},height:{configurable:!0}};return n.matrix.get=function(){return this.uniforms.matrix},n.matrix.set=function(e){this.uniforms.matrix=new Float32Array(e)},n.width.get=function(){return 1/this.uniforms.texelSize[0]},n.width.set=function(e){this.uniforms.texelSize[0]=1/e},n.height.get=function(){return 1/this.uniforms.texelSize[1]},n.height.set=function(e){this.uniforms.texelSize[1]=1/e},Object.defineProperties(t.prototype,n),t}(t.Filter),I=n,E="precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    float lum = length(texture2D(uSampler, vTextureCoord.xy).rgb);\n\n    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n\n    if (lum < 1.00)\n    {\n        if (mod(gl_FragCoord.x + gl_FragCoord.y, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.75)\n    {\n        if (mod(gl_FragCoord.x - gl_FragCoord.y, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.50)\n    {\n        if (mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.3)\n    {\n        if (mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n}\n",B=function(e){function t(){e.call(this,I,E)}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t}(t.Filter),X=n,q="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\nuniform vec2 dimensions;\n\nconst float SQRT_2 = 1.414213;\n\nconst float light = 1.0;\n\nuniform float curvature;\nuniform float lineWidth;\nuniform float lineContrast;\nuniform bool verticalLine;\nuniform float noise;\nuniform float noiseSize;\n\nuniform float vignetting;\nuniform float vignettingAlpha;\nuniform float vignettingBlur;\n\nuniform float seed;\nuniform float time;\n\nfloat rand(vec2 co) {\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main(void)\n{\n    vec2 pixelCoord = vTextureCoord.xy * filterArea.xy;\n    vec2 coord = pixelCoord / dimensions;\n\n    vec2 dir = vec2(coord - vec2(0.5, 0.5));\n\n    float _c = curvature > 0. ? curvature : 1.;\n    float k = curvature > 0. ?(length(dir * dir) * 0.25 * _c * _c + 0.935 * _c) : 1.;\n    vec2 uv = dir * k;\n\n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n    vec3 rgb = gl_FragColor.rgb;\n\n\n    if (noise > 0.0 && noiseSize > 0.0)\n    {\n        pixelCoord.x = floor(pixelCoord.x / noiseSize);\n        pixelCoord.y = floor(pixelCoord.y / noiseSize);\n        float _noise = rand(pixelCoord * noiseSize * seed) - 0.5;\n        rgb += _noise * noise;\n    }\n\n    if (lineWidth > 0.0) {\n        float v = (verticalLine ? uv.x * dimensions.x : uv.y * dimensions.y) * min(1.0, 2.0 / lineWidth ) / _c;\n        float j = 1. + cos(v * 1.2 - time) * 0.5 * lineContrast;\n        rgb *= j;\n        float segment = verticalLine ? mod((dir.x + .5) * dimensions.x, 4.) : mod((dir.y + .5) * dimensions.y, 4.);\n        rgb *= 0.99 + ceil(segment) * 0.015;\n    }\n\n    if (vignetting > 0.0)\n    {\n        float outter = SQRT_2 - vignetting * SQRT_2;\n        float darker = clamp((outter - length(dir) * SQRT_2) / ( 0.00001 + vignettingBlur * SQRT_2), 0.0, 1.0);\n        rgb *= darker + (1.0 - darker) * (1.0 - vignettingAlpha);\n    }\n\n    gl_FragColor.rgb = rgb;\n}\n",N=function(e){function t(t){e.call(this,X,q),this.uniforms.dimensions=new Float32Array(2),this.time=0,this.seed=0,Object.assign(this,{curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,seed:0,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0},t)}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={curvature:{configurable:!0},lineWidth:{configurable:!0},lineContrast:{configurable:!0},verticalLine:{configurable:!0},noise:{configurable:!0},noiseSize:{configurable:!0},vignetting:{configurable:!0},vignettingAlpha:{configurable:!0},vignettingBlur:{configurable:!0}};return t.prototype.apply=function(e,t,n,r){this.uniforms.dimensions[0]=t.sourceFrame.width,this.uniforms.dimensions[1]=t.sourceFrame.height,this.uniforms.seed=this.seed,this.uniforms.time=this.time,e.applyFilter(this,t,n,r)},n.curvature.set=function(e){this.uniforms.curvature=e},n.curvature.get=function(){return this.uniforms.curvature},n.lineWidth.set=function(e){this.uniforms.lineWidth=e},n.lineWidth.get=function(){return this.uniforms.lineWidth},n.lineContrast.set=function(e){this.uniforms.lineContrast=e},n.lineContrast.get=function(){return this.uniforms.lineContrast},n.verticalLine.set=function(e){this.uniforms.verticalLine=e},n.verticalLine.get=function(){return this.uniforms.verticalLine},n.noise.set=function(e){this.uniforms.noise=e},n.noise.get=function(){return this.uniforms.noise},n.noiseSize.set=function(e){this.uniforms.noiseSize=e},n.noiseSize.get=function(){return this.uniforms.noiseSize},n.vignetting.set=function(e){this.uniforms.vignetting=e},n.vignetting.get=function(){return this.uniforms.vignetting},n.vignettingAlpha.set=function(e){this.uniforms.vignettingAlpha=e},n.vignettingAlpha.get=function(){return this.uniforms.vignettingAlpha},n.vignettingBlur.set=function(e){this.uniforms.vignettingBlur=e},n.vignettingBlur.get=function(){return this.uniforms.vignettingBlur},Object.defineProperties(t.prototype,n),t}(t.Filter),G=n,K="precision mediump float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform vec4 filterArea;\nuniform sampler2D uSampler;\n\nuniform float angle;\nuniform float scale;\n\nfloat pattern()\n{\n   float s = sin(angle), c = cos(angle);\n   vec2 tex = vTextureCoord * filterArea.xy;\n   vec2 point = vec2(\n       c * tex.x - s * tex.y,\n       s * tex.x + c * tex.y\n   ) * scale;\n   return (sin(point.x) * sin(point.y)) * 4.0;\n}\n\nvoid main()\n{\n   vec4 color = texture2D(uSampler, vTextureCoord);\n   float average = (color.r + color.g + color.b) / 3.0;\n   gl_FragColor = vec4(vec3(average * 10.0 - 5.0 + pattern()), color.a);\n}\n",Y=function(e){function t(t,n){void 0===t&&(t=1),void 0===n&&(n=5),e.call(this,G,K),this.scale=t,this.angle=n}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={scale:{configurable:!0},angle:{configurable:!0}};return n.scale.get=function(){return this.uniforms.scale},n.scale.set=function(e){this.uniforms.scale=e},n.angle.get=function(){return this.uniforms.angle},n.angle.set=function(e){this.uniforms.angle=e},Object.defineProperties(t.prototype,n),t}(t.Filter),W=n,Q="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float alpha;\nuniform vec3 color;\nvoid main(void){\n    vec4 sample = texture2D(uSampler, vTextureCoord);\n\n    // Un-premultiply alpha before applying the color\n    if (sample.a > 0.0) {\n        sample.rgb /= sample.a;\n    }\n\n    // Premultiply alpha again\n    sample.rgb = color.rgb * sample.a;\n\n    // alpha user alpha\n    sample *= alpha;\n\n    gl_FragColor = sample;\n}",U=function(e){function n(n){n&&n.constructor!==Object&&(console.warn("DropShadowFilter now uses options instead of (rotation, distance, blur, color, alpha)"),n={rotation:n},void 0!==arguments[1]&&(n.distance=arguments[1]),void 0!==arguments[2]&&(n.blur=arguments[2]),void 0!==arguments[3]&&(n.color=arguments[3]),void 0!==arguments[4]&&(n.alpha=arguments[4])),n=Object.assign({rotation:45,distance:5,color:0,alpha:.5,shadowOnly:!1,kernels:null,blur:2,quality:3,pixelSize:1,resolution:t.settings.RESOLUTION},n),e.call(this);var r=n.kernels,o=n.blur,i=n.quality,l=n.pixelSize,s=n.resolution;this._tintFilter=new t.Filter(W,Q),this._tintFilter.uniforms.color=new Float32Array(4),this._tintFilter.resolution=s,this._blurFilter=r?new a(r):new a(o,i),this.pixelSize=l,this.resolution=s,this.targetTransform=new t.Matrix;var u=n.shadowOnly,c=n.rotation,f=n.distance,h=n.alpha,p=n.color;this.shadowOnly=u,this.rotation=c,this.distance=f,this.alpha=h,this.color=p,this._updatePadding()}e&&(n.__proto__=e),n.prototype=Object.create(e&&e.prototype),n.prototype.constructor=n;var r={resolution:{configurable:!0},distance:{configurable:!0},rotation:{configurable:!0},alpha:{configurable:!0},color:{configurable:!0},kernels:{configurable:!0},blur:{configurable:!0},quality:{configurable:!0},pixelSize:{configurable:!0}};return n.prototype.apply=function(e,t,n,r){var o=e.getRenderTarget();o.transform=this.targetTransform,this._tintFilter.apply(e,t,o,!0),o.transform=null,this._blurFilter.apply(e,o,n),!0!==this.shadowOnly&&e.applyFilter(this,t,n,r),e.returnRenderTarget(o)},n.prototype._updatePadding=function(){this.padding=this.distance+2*this.blur},n.prototype._updateTargetTransform=function(){this.targetTransform.tx=this.distance*Math.cos(this.angle),this.targetTransform.ty=this.distance*Math.sin(this.angle)},r.resolution.get=function(){return this._resolution},r.resolution.set=function(e){this._resolution=e,this._tintFilter&&(this._tintFilter.resolution=e),this._blurFilter&&(this._blurFilter.resolution=e)},r.distance.get=function(){return this._distance},r.distance.set=function(e){this._distance=e,this._updatePadding(),this._updateTargetTransform()},r.rotation.get=function(){return this.angle/t.DEG_TO_RAD},r.rotation.set=function(e){this.angle=e*t.DEG_TO_RAD,this._updateTargetTransform()},r.alpha.get=function(){return this._tintFilter.uniforms.alpha},r.alpha.set=function(e){this._tintFilter.uniforms.alpha=e},r.color.get=function(){return t.utils.rgb2hex(this._tintFilter.uniforms.color)},r.color.set=function(e){t.utils.hex2rgb(e,this._tintFilter.uniforms.color)},r.kernels.get=function(){return this._blurFilter.kernels},r.kernels.set=function(e){this._blurFilter.kernels=e},r.blur.get=function(){return this._blurFilter.blur},r.blur.set=function(e){this._blurFilter.blur=e,this._updatePadding()},r.quality.get=function(){return this._blurFilter.quality},r.quality.set=function(e){this._blurFilter.quality=e},r.pixelSize.get=function(){return this._blurFilter.pixelSize},r.pixelSize.set=function(e){this._blurFilter.pixelSize=e},Object.defineProperties(n.prototype,r),n}(t.Filter),Z=n,V="precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float strength;\nuniform vec4 filterArea;\n\n\nvoid main(void)\n{\n\tvec2 onePixel = vec2(1.0 / filterArea);\n\n\tvec4 color;\n\n\tcolor.rgb = vec3(0.5);\n\n\tcolor -= texture2D(uSampler, vTextureCoord - onePixel) * strength;\n\tcolor += texture2D(uSampler, vTextureCoord + onePixel) * strength;\n\n\tcolor.rgb = vec3((color.r + color.g + color.b) / 3.0);\n\n\tfloat alpha = texture2D(uSampler, vTextureCoord).a;\n\n\tgl_FragColor = vec4(color.rgb * alpha, alpha);\n}\n",H=function(e){function t(t){void 0===t&&(t=5),e.call(this,Z,V),this.strength=t}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={strength:{configurable:!0}};return n.strength.get=function(){return this.uniforms.strength},n.strength.set=function(e){this.uniforms.strength=e},Object.defineProperties(t.prototype,n),t}(t.Filter),$=n,J="// precision highp float;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform vec2 dimensions;\nuniform float aspect;\n\nuniform sampler2D displacementMap;\nuniform float offset;\nuniform float sinDir;\nuniform float cosDir;\nuniform int fillMode;\n\nuniform float seed;\nuniform vec2 red;\nuniform vec2 green;\nuniform vec2 blue;\n\nconst int TRANSPARENT = 0;\nconst int ORIGINAL = 1;\nconst int LOOP = 2;\nconst int CLAMP = 3;\nconst int MIRROR = 4;\n\nvoid main(void)\n{\n    vec2 coord = (vTextureCoord * filterArea.xy) / dimensions;\n\n    if (coord.x > 1.0 || coord.y > 1.0) {\n        return;\n    }\n\n    float cx = coord.x - 0.5;\n    float cy = (coord.y - 0.5) * aspect;\n    float ny = (-sinDir * cx + cosDir * cy) / aspect + 0.5;\n\n    // displacementMap: repeat\n    // ny = ny > 1.0 ? ny - 1.0 : (ny < 0.0 ? 1.0 + ny : ny);\n\n    // displacementMap: mirror\n    ny = ny > 1.0 ? 2.0 - ny : (ny < 0.0 ? -ny : ny);\n\n    vec4 dc = texture2D(displacementMap, vec2(0.5, ny));\n\n    float displacement = (dc.r - dc.g) * (offset / filterArea.x);\n\n    coord = vTextureCoord + vec2(cosDir * displacement, sinDir * displacement * aspect);\n\n    if (fillMode == CLAMP) {\n        coord = clamp(coord, filterClamp.xy, filterClamp.zw);\n    } else {\n        if( coord.x > filterClamp.z ) {\n            if (fillMode == ORIGINAL) {\n                gl_FragColor = texture2D(uSampler, vTextureCoord);\n                return;\n            } else if (fillMode == LOOP) {\n                coord.x -= filterClamp.z;\n            } else if (fillMode == MIRROR) {\n                coord.x = filterClamp.z * 2.0 - coord.x;\n            } else {\n                gl_FragColor = vec4(0., 0., 0., 0.);\n                return;\n            }\n        } else if( coord.x < filterClamp.x ) {\n            if (fillMode == ORIGINAL) {\n                gl_FragColor = texture2D(uSampler, vTextureCoord);\n                return;\n            } else if (fillMode == LOOP) {\n                coord.x += filterClamp.z;\n            } else if (fillMode == MIRROR) {\n                coord.x *= -filterClamp.z;\n            } else {\n                gl_FragColor = vec4(0., 0., 0., 0.);\n                return;\n            }\n        }\n\n        if( coord.y > filterClamp.w ) {\n            if (fillMode == ORIGINAL) {\n                gl_FragColor = texture2D(uSampler, vTextureCoord);\n                return;\n            } else if (fillMode == LOOP) {\n                coord.y -= filterClamp.w;\n            } else if (fillMode == MIRROR) {\n                coord.y = filterClamp.w * 2.0 - coord.y;\n            } else {\n                gl_FragColor = vec4(0., 0., 0., 0.);\n                return;\n            }\n        } else if( coord.y < filterClamp.y ) {\n            if (fillMode == ORIGINAL) {\n                gl_FragColor = texture2D(uSampler, vTextureCoord);\n                return;\n            } else if (fillMode == LOOP) {\n                coord.y += filterClamp.w;\n            } else if (fillMode == MIRROR) {\n                coord.y *= -filterClamp.w;\n            } else {\n                gl_FragColor = vec4(0., 0., 0., 0.);\n                return;\n            }\n        }\n    }\n\n    gl_FragColor.r = texture2D(uSampler, coord + red * (1.0 - seed * 0.4) / filterArea.xy).r;\n    gl_FragColor.g = texture2D(uSampler, coord + green * (1.0 - seed * 0.3) / filterArea.xy).g;\n    gl_FragColor.b = texture2D(uSampler, coord + blue * (1.0 - seed * 0.2) / filterArea.xy).b;\n    gl_FragColor.a = texture2D(uSampler, coord).a;\n}\n",ee=function(e){function n(n){void 0===n&&(n={}),e.call(this,$,J),this.uniforms.dimensions=new Float32Array(2),n=Object.assign({slices:5,offset:100,direction:0,fillMode:0,average:!1,seed:0,red:[0,0],green:[0,0],blue:[0,0],minSize:8,sampleSize:512},n),this.direction=n.direction,this.red=n.red,this.green=n.green,this.blue=n.blue,this.offset=n.offset,this.fillMode=n.fillMode,this.average=n.average,this.seed=n.seed,this.minSize=n.minSize,this.sampleSize=n.sampleSize,this._canvas=document.createElement("canvas"),this._canvas.width=4,this._canvas.height=this.sampleSize,this.texture=t.Texture.fromCanvas(this._canvas,t.SCALE_MODES.NEAREST),this._slices=0,this.slices=n.slices}e&&(n.__proto__=e),n.prototype=Object.create(e&&e.prototype),n.prototype.constructor=n;var r={sizes:{configurable:!0},offsets:{configurable:!0},slices:{configurable:!0},direction:{configurable:!0},red:{configurable:!0},green:{configurable:!0},blue:{configurable:!0}};return n.prototype.apply=function(e,t,n,r){var o=t.sourceFrame.width,i=t.sourceFrame.height;this.uniforms.dimensions[0]=o,this.uniforms.dimensions[1]=i,this.uniforms.aspect=i/o,this.uniforms.seed=this.seed,this.uniforms.offset=this.offset,this.uniforms.fillMode=this.fillMode,e.applyFilter(this,t,n,r)},n.prototype._randomizeSizes=function(){var e=this._sizes,t=this._slices-1,n=this.sampleSize,r=Math.min(this.minSize/n,.9/this._slices);if(this.average){for(var o=this._slices,i=1,l=0;l<t;l++){var s=i/(o-l),a=Math.max(s*(1-.6*Math.random()),r);e[l]=a,i-=a}e[t]=i}else{for(var u=1,c=Math.sqrt(1/this._slices),f=0;f<t;f++){var h=Math.max(c*u*Math.random(),r);e[f]=h,u-=h}e[t]=u}this.shuffle()},n.prototype.shuffle=function(){for(var e=this._sizes,t=this._slices-1;t>0;t--){var n=Math.random()*t>>0,r=e[t];e[t]=e[n],e[n]=r}},n.prototype._randomizeOffsets=function(){for(var e=0;e<this._slices;e++)this._offsets[e]=Math.random()*(Math.random()<.5?-1:1)},n.prototype.refresh=function(){this._randomizeSizes(),this._randomizeOffsets(),this.redraw()},n.prototype.redraw=function(){var e,t=this.sampleSize,n=this.texture,r=this._canvas.getContext("2d");r.clearRect(0,0,8,t);for(var o=0,i=0;i<this._slices;i++){e=Math.floor(256*this._offsets[i]);var l=this._sizes[i]*t,s=e>0?e:0,a=e<0?-e:0;r.fillStyle="rgba("+s+", "+a+", 0, 1)",r.fillRect(0,o>>0,t,l+1>>0),o+=l}n.baseTexture.emit("update",n.baseTexture),this.uniforms.displacementMap=n},r.sizes.set=function(e){for(var t=Math.min(this._slices,e.length),n=0;n<t;n++)this._sizes[n]=e[n]},r.sizes.get=function(){return this._sizes},r.offsets.set=function(e){for(var t=Math.min(this._slices,e.length),n=0;n<t;n++)this._offsets[n]=e[n]},r.offsets.get=function(){return this._offsets},r.slices.get=function(){return this._slices},r.slices.set=function(e){this._slices!==e&&(this._slices=e,this.uniforms.slices=e,this._sizes=this.uniforms.slicesWidth=new Float32Array(e),this._offsets=this.uniforms.slicesOffset=new Float32Array(e),this.refresh())},r.direction.get=function(){return this._direction},r.direction.set=function(e){if(this._direction!==e){this._direction=e;var n=e*t.DEG_TO_RAD;this.uniforms.sinDir=Math.sin(n),this.uniforms.cosDir=Math.cos(n)}},r.red.get=function(){return this.uniforms.red},r.red.set=function(e){this.uniforms.red=e},r.green.get=function(){return this.uniforms.green},r.green.set=function(e){this.uniforms.green=e},r.blue.get=function(){return this.uniforms.blue},r.blue.set=function(e){this.uniforms.blue=e},n.prototype.destroy=function(){this.texture.destroy(!0),this.texture=null,this._canvas=null,this.red=null,this.green=null,this.blue=null,this._sizes=null,this._offsets=null},Object.defineProperties(n.prototype,r),n}(t.Filter);ee.TRANSPARENT=0,ee.ORIGINAL=1,ee.LOOP=2,ee.CLAMP=3,ee.MIRROR=4;var te=n,ne="varying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\n\nuniform float distance;\nuniform float outerStrength;\nuniform float innerStrength;\nuniform vec4 glowColor;\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nconst float PI = 3.14159265358979323846264;\n\nvoid main(void) {\n    vec2 px = vec2(1.0 / filterArea.x, 1.0 / filterArea.y);\n    vec4 ownColor = texture2D(uSampler, vTextureCoord);\n    vec4 curColor;\n    float totalAlpha = 0.0;\n    float maxTotalAlpha = 0.0;\n    float cosAngle;\n    float sinAngle;\n    vec2 displaced;\n    for (float angle = 0.0; angle <= PI * 2.0; angle += %QUALITY_DIST%) {\n       cosAngle = cos(angle);\n       sinAngle = sin(angle);\n       for (float curDistance = 1.0; curDistance <= %DIST%; curDistance++) {\n           displaced.x = vTextureCoord.x + cosAngle * curDistance * px.x;\n           displaced.y = vTextureCoord.y + sinAngle * curDistance * px.y;\n           curColor = texture2D(uSampler, clamp(displaced, filterClamp.xy, filterClamp.zw));\n           totalAlpha += (distance - curDistance) * curColor.a;\n           maxTotalAlpha += (distance - curDistance);\n       }\n    }\n    maxTotalAlpha = max(maxTotalAlpha, 0.0001);\n\n    ownColor.a = max(ownColor.a, 0.0001);\n    ownColor.rgb = ownColor.rgb / ownColor.a;\n    float outerGlowAlpha = (totalAlpha / maxTotalAlpha)  * outerStrength * (1. - ownColor.a);\n    float innerGlowAlpha = ((maxTotalAlpha - totalAlpha) / maxTotalAlpha) * innerStrength * ownColor.a;\n    float resultAlpha = (ownColor.a + outerGlowAlpha);\n    gl_FragColor = vec4(mix(mix(ownColor.rgb, glowColor.rgb, innerGlowAlpha / ownColor.a), glowColor.rgb, outerGlowAlpha / resultAlpha) * resultAlpha, resultAlpha);\n}\n",re=function(e){function n(t,n,r,o,i){void 0===t&&(t=10),void 0===n&&(n=4),void 0===r&&(r=0),void 0===o&&(o=16777215),void 0===i&&(i=.1),e.call(this,te,ne.replace(/%QUALITY_DIST%/gi,""+(1/i/t).toFixed(7)).replace(/%DIST%/gi,""+t.toFixed(7))),this.uniforms.glowColor=new Float32Array([0,0,0,1]),this.distance=t,this.color=o,this.outerStrength=n,this.innerStrength=r}e&&(n.__proto__=e),n.prototype=Object.create(e&&e.prototype),n.prototype.constructor=n;var r={color:{configurable:!0},distance:{configurable:!0},outerStrength:{configurable:!0},innerStrength:{configurable:!0}};return r.color.get=function(){return t.utils.rgb2hex(this.uniforms.glowColor)},r.color.set=function(e){t.utils.hex2rgb(e,this.uniforms.glowColor)},r.distance.get=function(){return this.uniforms.distance},r.distance.set=function(e){this.uniforms.distance=e},r.outerStrength.get=function(){return this.uniforms.outerStrength},r.outerStrength.set=function(e){this.uniforms.outerStrength=e},r.innerStrength.get=function(){return this.uniforms.innerStrength},r.innerStrength.set=function(e){this.uniforms.innerStrength=e},Object.defineProperties(n.prototype,r),n}(t.Filter),oe=n,ie="vec3 mod289(vec3 x)\n{\n    return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec4 mod289(vec4 x)\n{\n    return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec4 permute(vec4 x)\n{\n    return mod289(((x * 34.0) + 1.0) * x);\n}\nvec4 taylorInvSqrt(vec4 r)\n{\n    return 1.79284291400159 - 0.85373472095314 * r;\n}\nvec3 fade(vec3 t)\n{\n    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);\n}\n// Classic Perlin noise, periodic variant\nfloat pnoise(vec3 P, vec3 rep)\n{\n    vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period\n    vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period\n    Pi0 = mod289(Pi0);\n    Pi1 = mod289(Pi1);\n    vec3 Pf0 = fract(P); // Fractional part for interpolation\n    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n    vec4 iy = vec4(Pi0.yy, Pi1.yy);\n    vec4 iz0 = Pi0.zzzz;\n    vec4 iz1 = Pi1.zzzz;\n    vec4 ixy = permute(permute(ix) + iy);\n    vec4 ixy0 = permute(ixy + iz0);\n    vec4 ixy1 = permute(ixy + iz1);\n    vec4 gx0 = ixy0 * (1.0 / 7.0);\n    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n    gx0 = fract(gx0);\n    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n    vec4 sz0 = step(gz0, vec4(0.0));\n    gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n    gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n    vec4 gx1 = ixy1 * (1.0 / 7.0);\n    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n    gx1 = fract(gx1);\n    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n    vec4 sz1 = step(gz1, vec4(0.0));\n    gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n    gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n    vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);\n    vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);\n    vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);\n    vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);\n    vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);\n    vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);\n    vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);\n    vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);\n    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n    g000 *= norm0.x;\n    g010 *= norm0.y;\n    g100 *= norm0.z;\n    g110 *= norm0.w;\n    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n    g001 *= norm1.x;\n    g011 *= norm1.y;\n    g101 *= norm1.z;\n    g111 *= norm1.w;\n    float n000 = dot(g000, Pf0);\n    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n    float n111 = dot(g111, Pf1);\n    vec3 fade_xyz = fade(Pf0);\n    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);\n    return 2.2 * n_xyz;\n}\nfloat turb(vec3 P, vec3 rep, float lacunarity, float gain)\n{\n    float sum = 0.0;\n    float sc = 1.0;\n    float totalgain = 1.0;\n    for (float i = 0.0; i < 6.0; i++)\n    {\n        sum += totalgain * pnoise(P * sc, rep);\n        sc *= lacunarity;\n        totalgain *= gain;\n    }\n    return abs(sum);\n}\n",le="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec2 dimensions;\n\nuniform vec2 light;\nuniform bool parallel;\nuniform float aspect;\n\nuniform float gain;\nuniform float lacunarity;\nuniform float time;\n\n${perlin}\n\nvoid main(void) {\n    vec2 coord = vTextureCoord * filterArea.xy / dimensions.xy;\n\n    float d;\n\n    if (parallel) {\n        float _cos = light.x;\n        float _sin = light.y;\n        d = (_cos * coord.x) + (_sin * coord.y * aspect);\n    } else {\n        float dx = coord.x - light.x / dimensions.x;\n        float dy = (coord.y - light.y / dimensions.y) * aspect;\n        float dis = sqrt(dx * dx + dy * dy) + 0.00001;\n        d = dy / dis;\n    }\n\n    vec3 dir = vec3(d, d, 0.0);\n\n    float noise = turb(dir + vec3(time, 0.0, 62.1 + time) * 0.05, vec3(480.0, 320.0, 480.0), lacunarity, gain);\n    noise = mix(noise, 0.0, 0.3);\n    //fade vertically.\n    vec4 mist = vec4(noise, noise, noise, 1.0) * (1.0 - coord.y);\n    mist.a = 1.0;\n\n    gl_FragColor = texture2D(uSampler, vTextureCoord) + mist;\n}\n",se=function(e){function n(n){e.call(this,oe,le.replace("${perlin}",ie)),this.uniforms.dimensions=new Float32Array(2),"number"==typeof n&&(console.warn("GodrayFilter now uses options instead of (angle, gain, lacunarity, time)"),n={angle:n},void 0!==arguments[1]&&(n.gain=arguments[1]),void 0!==arguments[2]&&(n.lacunarity=arguments[2]),void 0!==arguments[3]&&(n.time=arguments[3])),n=Object.assign({angle:30,gain:.5,lacunarity:2.5,time:0,parallel:!0,center:[0,0]},n),this._angleLight=new t.Point,this.angle=n.angle,this.gain=n.gain,this.lacunarity=n.lacunarity,this.parallel=n.parallel,this.center=n.center,this.time=n.time}e&&(n.__proto__=e),n.prototype=Object.create(e&&e.prototype),n.prototype.constructor=n;var r={angle:{configurable:!0},gain:{configurable:!0},lacunarity:{configurable:!0}};return n.prototype.apply=function(e,t,n,r){var o=t.sourceFrame,i=o.width,l=o.height;this.uniforms.light=this.parallel?this._angleLight:this.center,this.uniforms.parallel=this.parallel,this.uniforms.dimensions[0]=i,this.uniforms.dimensions[1]=l,this.uniforms.aspect=l/i,this.uniforms.time=this.time,e.applyFilter(this,t,n,r)},r.angle.get=function(){return this._angle},r.angle.set=function(e){this._angle=e;var n=e*t.DEG_TO_RAD;this._angleLight.x=Math.cos(n),this._angleLight.y=Math.sin(n)},r.gain.get=function(){return this.uniforms.gain},r.gain.set=function(e){this.uniforms.gain=e},r.lacunarity.get=function(){return this.uniforms.lacunarity},r.lacunarity.set=function(e){this.uniforms.lacunarity=e},Object.defineProperties(n.prototype,r),n}(t.Filter),ae=n,ue="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform vec2 uVelocity;\nuniform int uKernelSize;\nuniform float uOffset;\n\nconst int MAX_KERNEL_SIZE = 2048;\n\n// Notice:\n// the perfect way:\n//    int kernelSize = min(uKernelSize, MAX_KERNELSIZE);\n// BUT in real use-case , uKernelSize < MAX_KERNELSIZE almost always.\n// So use uKernelSize directly.\n\nvoid main(void)\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    if (uKernelSize == 0)\n    {\n        gl_FragColor = color;\n        return;\n    }\n\n    vec2 velocity = uVelocity / filterArea.xy;\n    float offset = -uOffset / length(uVelocity) - 0.5;\n    int k = uKernelSize - 1;\n\n    for(int i = 0; i < MAX_KERNEL_SIZE - 1; i++) {\n        if (i == k) {\n            break;\n        }\n        vec2 bias = velocity * (float(i) / float(k) + offset);\n        color += texture2D(uSampler, vTextureCoord + bias);\n    }\n    gl_FragColor = color / float(uKernelSize);\n}\n",ce=function(e){function n(n,r,o){void 0===n&&(n=[0,0]),void 0===r&&(r=5),void 0===o&&(o=0),e.call(this,ae,ue),this.uniforms.uVelocity=new Float32Array(2),this._velocity=new t.ObservablePoint(this.velocityChanged,this),this.velocity=n,this.kernelSize=r,this.offset=o}e&&(n.__proto__=e),n.prototype=Object.create(e&&e.prototype),n.prototype.constructor=n;var r={velocity:{configurable:!0},offset:{configurable:!0}};return n.prototype.apply=function(e,t,n,r){var o=this.velocity,i=o.x,l=o.y;this.uniforms.uKernelSize=0!==i||0!==l?this.kernelSize:0,e.applyFilter(this,t,n,r)},r.velocity.set=function(e){Array.isArray(e)?this._velocity.set(e[0],e[1]):(e instanceof t.Point||e instanceof t.ObservablePoint)&&this._velocity.copy(e)},r.velocity.get=function(){return this._velocity},n.prototype.velocityChanged=function(){this.uniforms.uVelocity[0]=this._velocity.x,this.uniforms.uVelocity[1]=this._velocity.y},r.offset.set=function(e){this.uniforms.uOffset=e},r.offset.get=function(){return this.uniforms.uOffset},Object.defineProperties(n.prototype,r),n}(t.Filter),fe=n,he="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform float epsilon;\n\nconst int MAX_COLORS = %maxColors%;\n\nuniform vec3 originalColors[MAX_COLORS];\nuniform vec3 targetColors[MAX_COLORS];\n\nvoid main(void)\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n\n    float alpha = gl_FragColor.a;\n    if (alpha < 0.0001)\n    {\n      return;\n    }\n\n    vec3 color = gl_FragColor.rgb / alpha;\n\n    for(int i = 0; i < MAX_COLORS; i++)\n    {\n      vec3 origColor = originalColors[i];\n      if (origColor.r < 0.0)\n      {\n        break;\n      }\n      vec3 colorDiff = origColor - color;\n      if (length(colorDiff) < epsilon)\n      {\n        vec3 targetColor = targetColors[i];\n        gl_FragColor = vec4((targetColor + colorDiff) * alpha, alpha);\n        return;\n      }\n    }\n}\n",pe=function(e){function n(t,n,r){void 0===n&&(n=.05),void 0===r&&(r=null),r=r||t.length,e.call(this,fe,he.replace(/%maxColors%/g,r)),this.epsilon=n,this._maxColors=r,this._replacements=null,this.uniforms.originalColors=new Float32Array(3*r),this.uniforms.targetColors=new Float32Array(3*r),this.replacements=t}e&&(n.__proto__=e),n.prototype=Object.create(e&&e.prototype),n.prototype.constructor=n;var r={replacements:{configurable:!0},maxColors:{configurable:!0},epsilon:{configurable:!0}};return r.replacements.set=function(e){var n=this.uniforms.originalColors,r=this.uniforms.targetColors,o=e.length;if(o>this._maxColors)throw"Length of replacements ("+o+") exceeds the maximum colors length ("+this._maxColors+")";n[3*o]=-1;for(var i=0;i<o;i++){var l=e[i],s=l[0];"number"==typeof s?s=t.utils.hex2rgb(s):l[0]=t.utils.rgb2hex(s),n[3*i]=s[0],n[3*i+1]=s[1],n[3*i+2]=s[2];var a=l[1];"number"==typeof a?a=t.utils.hex2rgb(a):l[1]=t.utils.rgb2hex(a),r[3*i]=a[0],r[3*i+1]=a[1],r[3*i+2]=a[2]}this._replacements=e},r.replacements.get=function(){return this._replacements},n.prototype.refresh=function(){this.replacements=this._replacements},r.maxColors.get=function(){return this._maxColors},r.epsilon.set=function(e){this.uniforms.epsilon=e},r.epsilon.get=function(){return this.uniforms.epsilon},Object.defineProperties(n.prototype,r),n}(t.Filter),de=n,me="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec2 dimensions;\n\nuniform float sepia;\nuniform float noise;\nuniform float noiseSize;\nuniform float scratch;\nuniform float scratchDensity;\nuniform float scratchWidth;\nuniform float vignetting;\nuniform float vignettingAlpha;\nuniform float vignettingBlur;\nuniform float seed;\n\nconst float SQRT_2 = 1.414213;\nconst vec3 SEPIA_RGB = vec3(112.0 / 255.0, 66.0 / 255.0, 20.0 / 255.0);\n\nfloat rand(vec2 co) {\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvec3 Overlay(vec3 src, vec3 dst)\n{\n    // if (dst <= 0.5) then: 2 * src * dst\n    // if (dst > 0.5) then: 1 - 2 * (1 - dst) * (1 - src)\n    return vec3((dst.x <= 0.5) ? (2.0 * src.x * dst.x) : (1.0 - 2.0 * (1.0 - dst.x) * (1.0 - src.x)),\n                (dst.y <= 0.5) ? (2.0 * src.y * dst.y) : (1.0 - 2.0 * (1.0 - dst.y) * (1.0 - src.y)),\n                (dst.z <= 0.5) ? (2.0 * src.z * dst.z) : (1.0 - 2.0 * (1.0 - dst.z) * (1.0 - src.z)));\n}\n\n\nvoid main()\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n    vec3 color = gl_FragColor.rgb;\n\n    if (sepia > 0.0)\n    {\n        float gray = (color.x + color.y + color.z) / 3.0;\n        vec3 grayscale = vec3(gray);\n\n        color = Overlay(SEPIA_RGB, grayscale);\n\n        color = grayscale + sepia * (color - grayscale);\n    }\n\n    vec2 coord = vTextureCoord * filterArea.xy / dimensions.xy;\n\n    if (vignetting > 0.0)\n    {\n        float outter = SQRT_2 - vignetting * SQRT_2;\n        vec2 dir = vec2(vec2(0.5, 0.5) - coord);\n        dir.y *= dimensions.y / dimensions.x;\n        float darker = clamp((outter - length(dir) * SQRT_2) / ( 0.00001 + vignettingBlur * SQRT_2), 0.0, 1.0);\n        color.rgb *= darker + (1.0 - darker) * (1.0 - vignettingAlpha);\n    }\n\n    if (scratchDensity > seed && scratch != 0.0)\n    {\n        float phase = seed * 256.0;\n        float s = mod(floor(phase), 2.0);\n        float dist = 1.0 / scratchDensity;\n        float d = distance(coord, vec2(seed * dist, abs(s - seed * dist)));\n        if (d < seed * 0.6 + 0.4)\n        {\n            highp float period = scratchDensity * 10.0;\n\n            float xx = coord.x * period + phase;\n            float aa = abs(mod(xx, 0.5) * 4.0);\n            float bb = mod(floor(xx / 0.5), 2.0);\n            float yy = (1.0 - bb) * aa + bb * (2.0 - aa);\n\n            float kk = 2.0 * period;\n            float dw = scratchWidth / dimensions.x * (0.75 + seed);\n            float dh = dw * kk;\n\n            float tine = (yy - (2.0 - dh));\n\n            if (tine > 0.0) {\n                float _sign = sign(scratch);\n\n                tine = s * tine / period + scratch + 0.1;\n                tine = clamp(tine + 1.0, 0.5 + _sign * 0.5, 1.5 + _sign * 0.5);\n\n                color.rgb *= tine;\n            }\n        }\n    }\n\n    if (noise > 0.0 && noiseSize > 0.0)\n    {\n        vec2 pixelCoord = vTextureCoord.xy * filterArea.xy;\n        pixelCoord.x = floor(pixelCoord.x / noiseSize);\n        pixelCoord.y = floor(pixelCoord.y / noiseSize);\n        // vec2 d = pixelCoord * noiseSize * vec2(1024.0 + seed * 512.0, 1024.0 - seed * 512.0);\n        // float _noise = snoise(d) * 0.5;\n        float _noise = rand(pixelCoord * noiseSize * seed) - 0.5;\n        color += _noise * noise;\n    }\n\n    gl_FragColor.rgb = color;\n}\n",ge=function(e){function t(t,n){void 0===n&&(n=0),e.call(this,de,me),this.uniforms.dimensions=new Float32Array(2),"number"==typeof t?(this.seed=t,t=null):this.seed=n,Object.assign(this,{sepia:.3,noise:.3,noiseSize:1,scratch:.5,scratchDensity:.3,scratchWidth:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3},t)}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={sepia:{configurable:!0},noise:{configurable:!0},noiseSize:{configurable:!0},scratch:{configurable:!0},scratchDensity:{configurable:!0},scratchWidth:{configurable:!0},vignetting:{configurable:!0},vignettingAlpha:{configurable:!0},vignettingBlur:{configurable:!0}};return t.prototype.apply=function(e,t,n,r){this.uniforms.dimensions[0]=t.sourceFrame.width,this.uniforms.dimensions[1]=t.sourceFrame.height,this.uniforms.seed=this.seed,e.applyFilter(this,t,n,r)},n.sepia.set=function(e){this.uniforms.sepia=e},n.sepia.get=function(){return this.uniforms.sepia},n.noise.set=function(e){this.uniforms.noise=e},n.noise.get=function(){return this.uniforms.noise},n.noiseSize.set=function(e){this.uniforms.noiseSize=e},n.noiseSize.get=function(){return this.uniforms.noiseSize},n.scratch.set=function(e){this.uniforms.scratch=e},n.scratch.get=function(){return this.uniforms.scratch},n.scratchDensity.set=function(e){this.uniforms.scratchDensity=e},n.scratchDensity.get=function(){return this.uniforms.scratchDensity},n.scratchWidth.set=function(e){this.uniforms.scratchWidth=e},n.scratchWidth.get=function(){return this.uniforms.scratchWidth},n.vignetting.set=function(e){this.uniforms.vignetting=e},n.vignetting.get=function(){return this.uniforms.vignetting},n.vignettingAlpha.set=function(e){this.uniforms.vignettingAlpha=e},n.vignettingAlpha.get=function(){return this.uniforms.vignettingAlpha},n.vignettingBlur.set=function(e){this.uniforms.vignettingBlur=e},n.vignettingBlur.get=function(){return this.uniforms.vignettingBlur},Object.defineProperties(t.prototype,n),t}(t.Filter),ve=n,xe="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec2 thickness;\nuniform vec4 outlineColor;\nuniform vec4 filterClamp;\n\nconst float DOUBLE_PI = 3.14159265358979323846264 * 2.;\n\nvoid main(void) {\n    vec4 ownColor = texture2D(uSampler, vTextureCoord);\n    vec4 curColor;\n    float maxAlpha = 0.;\n    vec2 displaced;\n    for (float angle = 0.; angle <= DOUBLE_PI; angle += ${angleStep}) {\n        displaced.x = vTextureCoord.x + thickness.x * cos(angle);\n        displaced.y = vTextureCoord.y + thickness.y * sin(angle);\n        curColor = texture2D(uSampler, clamp(displaced, filterClamp.xy, filterClamp.zw));\n        maxAlpha = max(maxAlpha, curColor.a);\n    }\n    float resultAlpha = max(maxAlpha, ownColor.a);\n    gl_FragColor = vec4((ownColor.rgb + outlineColor.rgb * (1. - ownColor.a)) * resultAlpha, resultAlpha);\n}\n",ye=function(e){function n(t,r,o){void 0===t&&(t=1),void 0===r&&(r=0),void 0===o&&(o=.1);var i=Math.max(o*n.MAX_SAMPLES,n.MIN_SAMPLES),l=(2*Math.PI/i).toFixed(7);e.call(this,ve,xe.replace(/\$\{angleStep\}/,l)),this.uniforms.thickness=new Float32Array([0,0]),this.thickness=t,this.uniforms.outlineColor=new Float32Array([0,0,0,1]),this.color=r,this.quality=o}e&&(n.__proto__=e),n.prototype=Object.create(e&&e.prototype),n.prototype.constructor=n;var r={color:{configurable:!0}};return n.prototype.apply=function(e,t,n,r){this.uniforms.thickness[0]=this.thickness/t.size.width,this.uniforms.thickness[1]=this.thickness/t.size.height,e.applyFilter(this,t,n,r)},r.color.get=function(){return t.utils.rgb2hex(this.uniforms.outlineColor)},r.color.set=function(e){t.utils.hex2rgb(e,this.uniforms.outlineColor)},Object.defineProperties(n.prototype,r),n}(t.Filter);ye.MIN_SAMPLES=1,ye.MAX_SAMPLES=100;var _e=n,be="precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform vec2 size;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvec2 pixelate(vec2 coord, vec2 size)\n{\n\treturn floor( coord / size ) * size;\n}\n\nvoid main(void)\n{\n    vec2 coord = mapCoord(vTextureCoord);\n\n    coord = pixelate(coord, size);\n\n    coord = unmapCoord(coord);\n\n    gl_FragColor = texture2D(uSampler, coord);\n}\n",Ce=function(e){function t(t){void 0===t&&(t=10),e.call(this,_e,be),this.size=t}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={size:{configurable:!0}};return n.size.get=function(){return this.uniforms.size},n.size.set=function(e){"number"==typeof e&&(e=[e,e]),this.uniforms.size=e},Object.defineProperties(t.prototype,n),t}(t.Filter),Se=n,Fe="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform float uRadian;\nuniform vec2 uCenter;\nuniform float uRadius;\nuniform int uKernelSize;\n\nconst int MAX_KERNEL_SIZE = 2048;\n\nvoid main(void)\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    if (uKernelSize == 0)\n    {\n        gl_FragColor = color;\n        return;\n    }\n\n    float aspect = filterArea.y / filterArea.x;\n    vec2 center = uCenter.xy / filterArea.xy;\n    float gradient = uRadius / filterArea.x * 0.3;\n    float radius = uRadius / filterArea.x - gradient * 0.5;\n    int k = uKernelSize - 1;\n\n    vec2 coord = vTextureCoord;\n    vec2 dir = vec2(center - coord);\n    float dist = length(vec2(dir.x, dir.y * aspect));\n\n    float radianStep = uRadian;\n    if (radius >= 0.0 && dist > radius) {\n        float delta = dist - radius;\n        float gap = gradient;\n        float scale = 1.0 - abs(delta / gap);\n        if (scale <= 0.0) {\n            gl_FragColor = color;\n            return;\n        }\n        radianStep *= scale;\n    }\n    radianStep /= float(k);\n\n    float s = sin(radianStep);\n    float c = cos(radianStep);\n    mat2 rotationMatrix = mat2(vec2(c, -s), vec2(s, c));\n\n    for(int i = 0; i < MAX_KERNEL_SIZE - 1; i++) {\n        if (i == k) {\n            break;\n        }\n\n        coord -= center;\n        coord.y *= aspect;\n        coord = rotationMatrix * coord;\n        coord.y /= aspect;\n        coord += center;\n\n        vec4 sample = texture2D(uSampler, coord);\n\n        // switch to pre-multiplied alpha to correctly blur transparent images\n        // sample.rgb *= sample.a;\n\n        color += sample;\n    }\n\n    gl_FragColor = color / float(uKernelSize);\n}\n",ze=function(e){function t(t,n,r,o){void 0===t&&(t=0),void 0===n&&(n=[0,0]),void 0===r&&(r=5),void 0===o&&(o=-1),e.call(this,Se,Fe),this._angle=0,this.angle=t,this.center=n,this.kernelSize=r,this.radius=o}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={angle:{configurable:!0},center:{configurable:!0},radius:{configurable:!0}};return t.prototype.apply=function(e,t,n,r){this.uniforms.uKernelSize=0!==this._angle?this.kernelSize:0,e.applyFilter(this,t,n,r)},n.angle.set=function(e){this._angle=e,this.uniforms.uRadian=e*Math.PI/180},n.angle.get=function(){return this._angle},n.center.get=function(){return this.uniforms.uCenter},n.center.set=function(e){this.uniforms.uCenter=e},n.radius.get=function(){return this.uniforms.uRadius},n.radius.set=function(e){(e<0||e===1/0)&&(e=-1),this.uniforms.uRadius=e},Object.defineProperties(t.prototype,n),t}(t.Filter),Ae=n,we="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform vec2 dimensions;\n\nuniform bool mirror;\nuniform float boundary;\nuniform vec2 amplitude;\nuniform vec2 waveLength;\nuniform vec2 alpha;\nuniform float time;\n\nfloat rand(vec2 co) {\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main(void)\n{\n    vec2 pixelCoord = vTextureCoord.xy * filterArea.xy;\n    vec2 coord = pixelCoord / dimensions;\n\n    if (coord.y < boundary) {\n        gl_FragColor = texture2D(uSampler, vTextureCoord);\n        return;\n    }\n\n    float k = (coord.y - boundary) / (1. - boundary + 0.0001);\n    float areaY = boundary * dimensions.y / filterArea.y;\n    float v = areaY + areaY - vTextureCoord.y;\n    float y = mirror ? v : vTextureCoord.y;\n\n    float _amplitude = ((amplitude.y - amplitude.x) * k + amplitude.x ) / filterArea.x;\n    float _waveLength = ((waveLength.y - waveLength.x) * k + waveLength.x) / filterArea.y;\n    float _alpha = (alpha.y - alpha.x) * k + alpha.x;\n\n    float x = vTextureCoord.x + cos(v * 6.28 / _waveLength - time) * _amplitude;\n    x = clamp(x, filterClamp.x, filterClamp.z);\n\n    vec4 color = texture2D(uSampler, vec2(x, y));\n\n    gl_FragColor = color * _alpha;\n}\n",Te=function(e){function t(t){e.call(this,Ae,we),this.uniforms.amplitude=new Float32Array(2),this.uniforms.waveLength=new Float32Array(2),this.uniforms.alpha=new Float32Array(2),this.uniforms.dimensions=new Float32Array(2),Object.assign(this,{mirror:!0,boundary:.5,amplitude:[0,20],waveLength:[30,100],alpha:[1,1],time:0},t)}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={mirror:{configurable:!0},boundary:{configurable:!0},amplitude:{configurable:!0},waveLength:{configurable:!0},alpha:{configurable:!0}};return t.prototype.apply=function(e,t,n,r){this.uniforms.dimensions[0]=t.sourceFrame.width,this.uniforms.dimensions[1]=t.sourceFrame.height,this.uniforms.time=this.time,e.applyFilter(this,t,n,r)},n.mirror.set=function(e){this.uniforms.mirror=e},n.mirror.get=function(){return this.uniforms.mirror},n.boundary.set=function(e){this.uniforms.boundary=e},n.boundary.get=function(){return this.uniforms.boundary},n.amplitude.set=function(e){this.uniforms.amplitude[0]=e[0],this.uniforms.amplitude[1]=e[1]},n.amplitude.get=function(){return this.uniforms.amplitude},n.waveLength.set=function(e){this.uniforms.waveLength[0]=e[0],this.uniforms.waveLength[1]=e[1]},n.waveLength.get=function(){return this.uniforms.waveLength},n.alpha.set=function(e){this.uniforms.alpha[0]=e[0],this.uniforms.alpha[1]=e[1]},n.alpha.get=function(){return this.uniforms.alpha},Object.defineProperties(t.prototype,n),t}(t.Filter),De=n,Oe="precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec2 red;\nuniform vec2 green;\nuniform vec2 blue;\n\nvoid main(void)\n{\n   gl_FragColor.r = texture2D(uSampler, vTextureCoord + red/filterArea.xy).r;\n   gl_FragColor.g = texture2D(uSampler, vTextureCoord + green/filterArea.xy).g;\n   gl_FragColor.b = texture2D(uSampler, vTextureCoord + blue/filterArea.xy).b;\n   gl_FragColor.a = texture2D(uSampler, vTextureCoord).a;\n}\n",Pe=function(e){function t(t,n,r){void 0===t&&(t=[-10,0]),void 0===n&&(n=[0,10]),void 0===r&&(r=[0,0]),e.call(this,De,Oe),this.red=t,this.green=n,this.blue=r}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={red:{configurable:!0},green:{configurable:!0},blue:{configurable:!0}};return n.red.get=function(){return this.uniforms.red},n.red.set=function(e){this.uniforms.red=e},n.green.get=function(){return this.uniforms.green},n.green.set=function(e){this.uniforms.green=e},n.blue.get=function(){return this.uniforms.blue},n.blue.set=function(e){this.uniforms.blue=e},Object.defineProperties(t.prototype,n),t}(t.Filter),Me=n,Re="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\n\nuniform vec2 center;\n\nuniform float amplitude;\nuniform float wavelength;\n// uniform float power;\nuniform float brightness;\nuniform float speed;\nuniform float radius;\n\nuniform float time;\n\nconst float PI = 3.14159;\n\nvoid main()\n{\n    float halfWavelength = wavelength * 0.5 / filterArea.x;\n    float maxRadius = radius / filterArea.x;\n    float currentRadius = time * speed / filterArea.x;\n\n    float fade = 1.0;\n\n    if (maxRadius > 0.0) {\n        if (currentRadius > maxRadius) {\n            gl_FragColor = texture2D(uSampler, vTextureCoord);\n            return;\n        }\n        fade = 1.0 - pow(currentRadius / maxRadius, 2.0);\n    }\n\n    vec2 dir = vec2(vTextureCoord - center / filterArea.xy);\n    dir.y *= filterArea.y / filterArea.x;\n    float dist = length(dir);\n\n    if (dist <= 0.0 || dist < currentRadius - halfWavelength || dist > currentRadius + halfWavelength) {\n        gl_FragColor = texture2D(uSampler, vTextureCoord);\n        return;\n    }\n\n    vec2 diffUV = normalize(dir);\n\n    float diff = (dist - currentRadius) / halfWavelength;\n\n    float p = 1.0 - pow(abs(diff), 2.0);\n\n    // float powDiff = diff * pow(p, 2.0) * ( amplitude * fade );\n    float powDiff = 1.25 * sin(diff * PI) * p * ( amplitude * fade );\n\n    vec2 offset = diffUV * powDiff / filterArea.xy;\n\n    // Do clamp :\n    vec2 coord = vTextureCoord + offset;\n    vec2 clampedCoord = clamp(coord, filterClamp.xy, filterClamp.zw);\n    vec4 color = texture2D(uSampler, clampedCoord);\n    if (coord != clampedCoord) {\n        color *= max(0.0, 1.0 - length(coord - clampedCoord));\n    }\n\n    // No clamp :\n    // gl_FragColor = texture2D(uSampler, vTextureCoord + offset);\n\n    color.rgb *= 1.0 + (brightness - 1.0) * p * fade;\n\n    gl_FragColor = color;\n}\n",je=function(e){function t(t,n,r){void 0===t&&(t=[0,0]),void 0===n&&(n={}),void 0===r&&(r=0),e.call(this,Me,Re),this.center=t,Array.isArray(n)&&(console.warn("Deprecated Warning: ShockwaveFilter params Array has been changed to options Object."),n={}),n=Object.assign({amplitude:30,wavelength:160,brightness:1,speed:500,radius:-1},n),this.amplitude=n.amplitude,this.wavelength=n.wavelength,this.brightness=n.brightness,this.speed=n.speed,this.radius=n.radius,this.time=r}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={center:{configurable:!0},amplitude:{configurable:!0},wavelength:{configurable:!0},brightness:{configurable:!0},speed:{configurable:!0},radius:{configurable:!0}};return t.prototype.apply=function(e,t,n,r){this.uniforms.time=this.time,e.applyFilter(this,t,n,r)},n.center.get=function(){return this.uniforms.center},n.center.set=function(e){this.uniforms.center=e},n.amplitude.get=function(){return this.uniforms.amplitude},n.amplitude.set=function(e){this.uniforms.amplitude=e},n.wavelength.get=function(){return this.uniforms.wavelength},n.wavelength.set=function(e){this.uniforms.wavelength=e},n.brightness.get=function(){return this.uniforms.brightness},n.brightness.set=function(e){this.uniforms.brightness=e},n.speed.get=function(){return this.uniforms.speed},n.speed.set=function(e){this.uniforms.speed=e},n.radius.get=function(){return this.uniforms.radius},n.radius.set=function(e){this.uniforms.radius=e},Object.defineProperties(t.prototype,n),t}(t.Filter),Le=n,ke="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform sampler2D uLightmap;\nuniform vec4 filterArea;\nuniform vec2 dimensions;\nuniform vec4 ambientColor;\nvoid main() {\n    vec4 diffuseColor = texture2D(uSampler, vTextureCoord);\n    vec2 lightCoord = (vTextureCoord * filterArea.xy) / dimensions;\n    vec4 light = texture2D(uLightmap, lightCoord);\n    vec3 ambient = ambientColor.rgb * ambientColor.a;\n    vec3 intensity = ambient + light.rgb;\n    vec3 finalColor = diffuseColor.rgb * intensity;\n    gl_FragColor = vec4(finalColor, diffuseColor.a);\n}\n",Ie=function(e){function n(t,n,r){void 0===n&&(n=0),void 0===r&&(r=1),e.call(this,Le,ke),this.uniforms.dimensions=new Float32Array(2),this.uniforms.ambientColor=new Float32Array([0,0,0,r]),this.texture=t,this.color=n}e&&(n.__proto__=e),n.prototype=Object.create(e&&e.prototype),n.prototype.constructor=n;var r={texture:{configurable:!0},color:{configurable:!0},alpha:{configurable:!0}};return n.prototype.apply=function(e,t,n,r){this.uniforms.dimensions[0]=t.sourceFrame.width,this.uniforms.dimensions[1]=t.sourceFrame.height,e.applyFilter(this,t,n,r)},r.texture.get=function(){return this.uniforms.uLightmap},r.texture.set=function(e){this.uniforms.uLightmap=e},r.color.set=function(e){var n=this.uniforms.ambientColor;"number"==typeof e?(t.utils.hex2rgb(e,n),this._color=e):(n[0]=e[0],n[1]=e[1],n[2]=e[2],n[3]=e[3],this._color=t.utils.rgb2hex(n))},r.color.get=function(){return this._color},r.alpha.get=function(){return this.uniforms.ambientColor[3]},r.alpha.set=function(e){this.uniforms.ambientColor[3]=e},Object.defineProperties(n.prototype,r),n}(t.Filter),Ee=n,Be="varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float blur;\nuniform float gradientBlur;\nuniform vec2 start;\nuniform vec2 end;\nuniform vec2 delta;\nuniform vec2 texSize;\n\nfloat random(vec3 scale, float seed)\n{\n    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);\n}\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n    float total = 0.0;\n\n    float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);\n    vec2 normal = normalize(vec2(start.y - end.y, end.x - start.x));\n    float radius = smoothstep(0.0, 1.0, abs(dot(vTextureCoord * texSize - start, normal)) / gradientBlur) * blur;\n\n    for (float t = -30.0; t <= 30.0; t++)\n    {\n        float percent = (t + offset - 0.5) / 30.0;\n        float weight = 1.0 - abs(percent);\n        vec4 sample = texture2D(uSampler, vTextureCoord + delta / texSize * percent * radius);\n        sample.rgb *= sample.a;\n        color += sample * weight;\n        total += weight;\n    }\n\n    color /= total;\n    color.rgb /= color.a + 0.00001;\n\n    gl_FragColor = color;\n}\n",Xe=function(e){function n(n,r,o,i){void 0===n&&(n=100),void 0===r&&(r=600),void 0===o&&(o=null),void 0===i&&(i=null),e.call(this,Ee,Be),this.uniforms.blur=n,this.uniforms.gradientBlur=r,this.uniforms.start=o||new t.Point(0,window.innerHeight/2),this.uniforms.end=i||new t.Point(600,window.innerHeight/2),this.uniforms.delta=new t.Point(30,30),this.uniforms.texSize=new t.Point(window.innerWidth,window.innerHeight),this.updateDelta()}e&&(n.__proto__=e),n.prototype=Object.create(e&&e.prototype),n.prototype.constructor=n;var r={blur:{configurable:!0},gradientBlur:{configurable:!0},start:{configurable:!0},end:{configurable:!0}};return n.prototype.updateDelta=function(){this.uniforms.delta.x=0,this.uniforms.delta.y=0},r.blur.get=function(){return this.uniforms.blur},r.blur.set=function(e){this.uniforms.blur=e},r.gradientBlur.get=function(){return this.uniforms.gradientBlur},r.gradientBlur.set=function(e){this.uniforms.gradientBlur=e},r.start.get=function(){return this.uniforms.start},r.start.set=function(e){this.uniforms.start=e,this.updateDelta()},r.end.get=function(){return this.uniforms.end},r.end.set=function(e){this.uniforms.end=e,this.updateDelta()},Object.defineProperties(n.prototype,r),n}(t.Filter),qe=function(e){function t(){e.apply(this,arguments)}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.updateDelta=function(){var e=this.uniforms.end.x-this.uniforms.start.x,t=this.uniforms.end.y-this.uniforms.start.y,n=Math.sqrt(e*e+t*t);this.uniforms.delta.x=e/n,this.uniforms.delta.y=t/n},t}(Xe),Ne=function(e){function t(){e.apply(this,arguments)}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.updateDelta=function(){var e=this.uniforms.end.x-this.uniforms.start.x,t=this.uniforms.end.y-this.uniforms.start.y,n=Math.sqrt(e*e+t*t);this.uniforms.delta.x=-t/n,this.uniforms.delta.y=e/n},t}(Xe),Ge=function(e){function t(t,n,r,o){void 0===t&&(t=100),void 0===n&&(n=600),void 0===r&&(r=null),void 0===o&&(o=null),e.call(this),this.tiltShiftXFilter=new qe(t,n,r,o),this.tiltShiftYFilter=new Ne(t,n,r,o)}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={blur:{configurable:!0},gradientBlur:{configurable:!0},start:{configurable:!0},end:{configurable:!0}};return t.prototype.apply=function(e,t,n){var r=e.getRenderTarget(!0);this.tiltShiftXFilter.apply(e,t,r),this.tiltShiftYFilter.apply(e,r,n),e.returnRenderTarget(r)},n.blur.get=function(){return this.tiltShiftXFilter.blur},n.blur.set=function(e){this.tiltShiftXFilter.blur=this.tiltShiftYFilter.blur=e},n.gradientBlur.get=function(){return this.tiltShiftXFilter.gradientBlur},n.gradientBlur.set=function(e){this.tiltShiftXFilter.gradientBlur=this.tiltShiftYFilter.gradientBlur=e},n.start.get=function(){return this.tiltShiftXFilter.start},n.start.set=function(e){this.tiltShiftXFilter.start=this.tiltShiftYFilter.start=e},n.end.get=function(){return this.tiltShiftXFilter.end},n.end.set=function(e){this.tiltShiftXFilter.end=this.tiltShiftYFilter.end=e},Object.defineProperties(t.prototype,n),t}(t.Filter),Ke=n,Ye="varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float radius;\nuniform float angle;\nuniform vec2 offset;\nuniform vec4 filterArea;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvec2 twist(vec2 coord)\n{\n    coord -= offset;\n\n    float dist = length(coord);\n\n    if (dist < radius)\n    {\n        float ratioDist = (radius - dist) / radius;\n        float angleMod = ratioDist * ratioDist * angle;\n        float s = sin(angleMod);\n        float c = cos(angleMod);\n        coord = vec2(coord.x * c - coord.y * s, coord.x * s + coord.y * c);\n    }\n\n    coord += offset;\n\n    return coord;\n}\n\nvoid main(void)\n{\n\n    vec2 coord = mapCoord(vTextureCoord);\n\n    coord = twist(coord);\n\n    coord = unmapCoord(coord);\n\n    gl_FragColor = texture2D(uSampler, coord );\n\n}\n",We=function(e){function t(t,n,r){void 0===t&&(t=200),void 0===n&&(n=4),void 0===r&&(r=20),e.call(this,Ke,Ye),this.radius=t,this.angle=n,this.padding=r}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={offset:{configurable:!0},radius:{configurable:!0},angle:{configurable:!0}};return n.offset.get=function(){return this.uniforms.offset},n.offset.set=function(e){this.uniforms.offset=e},n.radius.get=function(){return this.uniforms.radius},n.radius.set=function(e){this.uniforms.radius=e},n.angle.get=function(){return this.uniforms.angle},n.angle.set=function(e){this.uniforms.angle=e},Object.defineProperties(t.prototype,n),t}(t.Filter),Qe=n,Ue="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform vec2 uCenter;\nuniform float uStrength;\nuniform float uInnerRadius;\nuniform float uRadius;\n\nconst float MAX_KERNEL_SIZE = 32.0;\n\nfloat random(vec3 scale, float seed) {\n    // use the fragment position for a different seed per-pixel\n    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);\n}\n\nvoid main() {\n\n    float minGradient = uInnerRadius * 0.3;\n    float innerRadius = (uInnerRadius + minGradient * 0.5) / filterArea.x;\n\n    float gradient = uRadius * 0.3;\n    float radius = (uRadius - gradient * 0.5) / filterArea.x;\n\n    float countLimit = MAX_KERNEL_SIZE;\n\n    vec2 dir = vec2(uCenter.xy / filterArea.xy - vTextureCoord);\n    float dist = length(vec2(dir.x, dir.y * filterArea.y / filterArea.x));\n\n    float strength = uStrength;\n\n    float delta = 0.0;\n    float gap;\n    if (dist < innerRadius) {\n        delta = innerRadius - dist;\n        gap = minGradient;\n    } else if (radius >= 0.0 && dist > radius) { // radius < 0 means it's infinity\n        delta = dist - radius;\n        gap = gradient;\n    }\n\n    if (delta > 0.0) {\n        float normalCount = gap / filterArea.x;\n        delta = (normalCount - delta) / normalCount;\n        countLimit *= delta;\n        strength *= delta;\n        if (countLimit < 1.0)\n        {\n            gl_FragColor = texture2D(uSampler, vTextureCoord);\n            return;\n        }\n    }\n\n    // randomize the lookup values to hide the fixed number of samples\n    float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);\n\n    float total = 0.0;\n    vec4 color = vec4(0.0);\n\n    dir *= strength;\n\n    for (float t = 0.0; t < MAX_KERNEL_SIZE; t++) {\n        float percent = (t + offset) / MAX_KERNEL_SIZE;\n        float weight = 4.0 * (percent - percent * percent);\n        vec2 p = vTextureCoord + dir * percent;\n        vec4 sample = texture2D(uSampler, p);\n\n        // switch to pre-multiplied alpha to correctly blur transparent images\n        // sample.rgb *= sample.a;\n\n        color += sample * weight;\n        total += weight;\n\n        if (t > countLimit){\n            break;\n        }\n    }\n\n    color /= total;\n    // switch back from pre-multiplied alpha\n    color.rgb /= color.a + 0.00001;\n\n    gl_FragColor = color;\n}\n",Ze=function(e){function t(t,n,r,o){void 0===t&&(t=.1),void 0===n&&(n=[0,0]),void 0===r&&(r=0),void 0===o&&(o=-1),e.call(this,Qe,Ue),this.center=n,this.strength=t,this.innerRadius=r,this.radius=o}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={center:{configurable:!0},strength:{configurable:!0},innerRadius:{configurable:!0},radius:{configurable:!0}};return n.center.get=function(){return this.uniforms.uCenter},n.center.set=function(e){this.uniforms.uCenter=e},n.strength.get=function(){return this.uniforms.uStrength},n.strength.set=function(e){this.uniforms.uStrength=e},n.innerRadius.get=function(){return this.uniforms.uInnerRadius},n.innerRadius.set=function(e){this.uniforms.uInnerRadius=e},n.radius.get=function(){return this.uniforms.uRadius},n.radius.set=function(e){(e<0||e===1/0)&&(e=-1),this.uniforms.uRadius=e},Object.defineProperties(t.prototype,n),t}(t.Filter);return e.AdjustmentFilter=o,e.AdvancedBloomFilter=p,e.AsciiFilter=g,e.BevelFilter=y,e.BloomFilter=F,e.BulgePinchFilter=w,e.ColorMapFilter=O,e.ColorReplaceFilter=R,e.ConvolutionFilter=k,e.CrossHatchFilter=B,e.CRTFilter=N,e.DotFilter=Y,e.DropShadowFilter=U,e.EmbossFilter=H,e.GlitchFilter=ee,e.GlowFilter=re,e.GodrayFilter=se,e.KawaseBlurFilter=a,e.MotionBlurFilter=ce,e.MultiColorReplaceFilter=pe,e.OldFilmFilter=ge,e.OutlineFilter=ye,e.PixelateFilter=Ce,e.RadialBlurFilter=ze,e.ReflectionFilter=Te,e.RGBSplitFilter=Pe,e.ShockwaveFilter=je,e.SimpleLightmapFilter=Ie,e.TiltShiftFilter=Ge,e.TiltShiftAxisFilter=Xe,e.TiltShiftXFilter=qe,e.TiltShiftYFilter=Ne,e.TwistFilter=We,e.ZoomBlurFilter=Ze,e}({},PIXI);Object.assign(PIXI.filters,this?this.__filters:__filters);

Sprite.prototype.createHorrorNoise = function() {
    if (!this._horrorFilters.noiseFilter) {
        this._horrorFilters.noiseFilter = new PIXI.filters.NoiseFilter();
        this.createHorrorFilter(this._horrorFilters.noiseFilter);
    }
    this._horrorFilters.noiseFilter.noise = Olivia.HorrorEffects.NoiseRate;
    this._horrorFilters.noiseFilter.animated = Olivia.HorrorEffects.NoiseAni;
};

Sprite.prototype.removeHorrorNoise = function() {
    if (!!this._horrorFilters.noiseFilter) {
        this.removeHorrorFilter(this._horrorFilters.noiseFilter);
        this._horrorFilters.noiseFilter = undefined;
    }
};

Sprite.prototype.updateHorrorNoise = function() {
    if (!!this._horrorFilters.noiseFilter) {
        if (this._horrorFilters.noiseFilter.animated) {
            this._horrorFilters.noiseFilter.seed = Math.random() * 3;
        }
    }
};

Sprite.prototype.setHorrorNoiseRate = function(value) {
    if (!!this._horrorFilters.noiseFilter) {
        this._horrorFilters.noiseFilter.noise = value;
    }
};

Sprite.prototype.setHorrorNoiseAnimated = function(value) {
    if (!!this._horrorFilters.noiseFilter) {
        this._horrorFilters.noiseFilter.animated = value;
    }
};

Sprite.prototype.createHorrorGlitch = function() {
    if (!this._horrorFilters.glitchFilter) {
        this._horrorFilters.glitchFilter = new PIXI.filters.GlitchFilter();
        this.createHorrorFilter(this._horrorFilters.glitchFilter);
    }
    this._horrorFilters.glitchFilter.slices = Olivia.HorrorEffects.GlitchSlices;
    this._horrorFilters.glitchFilter.offset = Olivia.HorrorEffects.GlitchOffset;
    this._horrorFilters.glitchFilter.sliceMin = Math.ceil(Olivia.HorrorEffects.GlitchSlices / 2);
    this._horrorFilters.glitchFilter.sliceMax = Olivia.HorrorEffects.GlitchSlices;
    this._horrorFilters.glitchFilter.animated = Olivia.HorrorEffects.GlitchAni;
    this._horrorFilters.glitchFilter.aniFrequency = Olivia.HorrorEffects.GlitchAniFreq;
    this._horrorFilters.glitchFilter.aniStrength = Olivia.HorrorEffects.GlitchAniStr;
};

Sprite.prototype.removeHorrorGlitch = function() {
    if (!!this._horrorFilters.glitchFilter) {
        this.removeHorrorFilter(this._horrorFilters.glitchFilter);
        this._horrorFilters.glitchFilter = undefined;
    }
};

Sprite.prototype.updateHorrorGlitch = function() {
    if (!!this._horrorFilters.glitchFilter) {
        if (this._horrorFiltersGlitchSpecial && this._horrorFilters.glitchFilter.animated) {
            var glitchFilter = new PIXI.filters.GlitchFilter();
            var keys = ['slices', 'offset', 'sliceMin', 'sliceMax', 'animated', 'aniFrequency', 'aniStrength', 'refreshRequest'];
            this._horrorFilters.glitchFilter.refreshRequest = false;
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                glitchFilter[key] = this._horrorFilters.glitchFilter[key];
            }
            var index = this._filters.indexOf(this._horrorFilters.glitchFilter);
            this._filters[index] = this.updateHorrorGlitchEffect(glitchFilter);
            this._horrorFilters.glitchFilter = this._filters[index];
        } if (this._horrorFiltersGlitchSpecial && this._horrorFilters.glitchFilter.refreshRequest) {
            this._horrorFilters.glitchFilter.refreshRequest = false;
            this._horrorFilters.glitchFilter.animated = false;
            var glitchFilter = new PIXI.filters.GlitchFilter();
            var keys = ['slices', 'offset', 'sliceMin', 'sliceMax', 'animated', 'aniFrequency', 'aniStrength', 'refreshRequest'];
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                glitchFilter[key] = this._horrorFilters.glitchFilter[key];
                if (key === 'refreshRequest') {
                    this._horrorFilters.glitchFilter[key] = false;
                }
            }
            var index = this._filters.indexOf(this._horrorFilters.glitchFilter);
            glitchFilter.refresh();
            this._filters[index] = this.updateHorrorGlitchEffect(glitchFilter);
            this._horrorFilters.glitchFilter = this._filters[index];
        } else {
            this.updateHorrorGlitchEffect(this._horrorFilters.glitchFilter);
        }
    }
};

Sprite.prototype.updateHorrorGlitchEffect = function(glitchFilter) {
    if (glitchFilter.animated) {
        var frequency = Graphics.frameCount % glitchFilter.aniFrequency;
        var strength = glitchFilter.aniStrength;
        if (frequency < Math.randomInt(strength) + 1) {
            var difference = glitchFilter.sliceMax - glitchFilter.sliceMin
            var number = Math.randomInt(difference) + glitchFilter.sliceMax;
            glitchFilter.slices = number;
        } else {
            glitchFilter.slices = 0;
        }
    } else if (glitchFilter.slices === 0) {
        var difference = glitchFilter.sliceMax - glitchFilter.sliceMin
        var number = Math.randomInt(difference) + glitchFilter.sliceMax;
        glitchFilter.slices = number;
    } else if (glitchFilter.refreshRequest) {
        glitchFilter.refreshRequest = undefined;
        glitchFilter.refresh();
    }
    return glitchFilter;
};

Sprite.prototype.setHorrorGlitchSlices = function(value, min, max) {
    if (!!this._horrorFilters.glitchFilter) {
        if (min === undefined) {
            min = Math.ceil(value / 2);
        }
        if (max === undefined) {
            max = value;
        }
        this._horrorFilters.glitchFilter.sliceMin = min;
        this._horrorFilters.glitchFilter.sliceMax = max;
        this._horrorFilters.glitchFilter.slices = value;
        this._horrorFilters.glitchFilter.refresh();
    }
};

Sprite.prototype.setHorrorGlitchOffset = function(value) {
    if (!!this._horrorFilters.glitchFilter) {
        this._horrorFilters.glitchFilter.offset = value;
    }
};

Sprite.prototype.setHorrorGlitchAnimated = function(value) {
    if (!!this._horrorFilters.glitchFilter) {
        this._horrorFilters.glitchFilter.animated = value;
    }
};

Sprite.prototype.setHorrorGlitchFrequency = function(value) {
    if (!!this._horrorFilters.glitchFilter) {
        this._horrorFilters.glitchFilter.aniFrequency = value;
    }
};

Sprite.prototype.setHorrorGlitchStrength = function(value) {
    if (!!this._horrorFilters.glitchFilter) {
        this._horrorFilters.glitchFilter.aniStrength = value;
    }
};

Sprite.prototype.createHorrorTV = function() {
    if (!this._horrorFilters.tvFilter) {
        this._horrorFilters.tvFilter = new PIXI.filters.CRTFilter();
        this.createHorrorFilter(this._horrorFilters.tvFilter);
    }
    this._horrorFilters.tvFilter.lineWidth = Olivia.HorrorEffects.TVLineThickness;
    this._horrorFilters.tvFilter.vignetting = Olivia.HorrorEffects.TVCorner;
    this._horrorFilters.tvFilter.animated = Olivia.HorrorEffects.TVAni;
    this._horrorFilters.tvFilter.aniSpeed = Olivia.HorrorEffects.TVAniSpeed;
};

Sprite.prototype.removeHorrorTV = function() {
    if (!!this._horrorFilters.tvFilter) {
        this.removeHorrorFilter(this._horrorFilters.tvFilter);
        this._horrorFilters.tvFilter = undefined;
    }
};

Sprite.prototype.updateHorrorTV = function() {
    if (!!this._horrorFilters.tvFilter) {
        if (this._horrorFilters.tvFilter.animated) {
            this._horrorFilters.tvFilter.time += this._horrorFilters.tvFilter.aniSpeed;
        }
    }
};

Sprite.prototype.setHorrorTVLineThickness = function(value) {
    if (!!this._horrorFilters.tvFilter) {
        this._horrorFilters.tvFilter.lineWidth = value;
    }
};

Sprite.prototype.setHorrorTVCornerSize = function(value) {
    if (!!this._horrorFilters.tvFilter) {
        this._horrorFilters.tvFilter.vignetting = value;
    }
};

Sprite.prototype.setHorrorTVAnimated = function(value) {
    if (!!this._horrorFilters.tvFilter) {
        this._horrorFilters.tvFilter.animated = value;
    }
};

Sprite.prototype.setHorrorTVSpeed = function(value) {
    if (!!this._horrorFilters.tvFilter) {
        this._horrorFilters.tvFilter.aniSpeed = value;
    }
};

//-----------------------------------------------------------------------------
// Scene_Title
//
// The scene class of the title screen.

Olivia.HorrorEffects.___Scene_Title_createBackground___ = Scene_Title.prototype.createBackground;
Scene_Title.prototype.createBackground = function() {
    Olivia.HorrorEffects.___Scene_Title_createBackground___.call(this);
    this.applyTitleHorrorEffects(this._backSprite1, Olivia.HorrorEffects.Title1Settings);
    this.applyTitleHorrorEffects(this._backSprite2, Olivia.HorrorEffects.Title2Settings);
};

Scene_Title.prototype.applyTitleHorrorEffects = function(sprite, settings) {
    if (!!sprite && !!settings) {
        if (!!settings.Noise) {
            sprite.createHorrorNoise();
            sprite.setHorrorNoiseRate(settings.NoiseRate);
            sprite.setHorrorNoiseAnimated(settings.NoiseAni);
        }
        if (!!settings.Glitch) {
            sprite.createHorrorGlitch();
            sprite.setHorrorGlitchSlices(settings.GlitchSlices);
            sprite.setHorrorGlitchOffset(settings.GlitchOffset);
            sprite.setHorrorGlitchAnimated(settings.GlitchAni);
            sprite.setHorrorGlitchFrequency(settings.GlitchAniFreq);
            sprite.setHorrorGlitchStrength(settings.GlitchAniStr);
        }
        if (!!settings.TV) {
            sprite.createHorrorTV();
            sprite.setHorrorTVLineThickness(settings.TVLineThickness);
            sprite.setHorrorTVCornerSize(settings.TVCorner);
            sprite.setHorrorTVAnimated(settings.TVAni);
            sprite.setHorrorTVSpeed(settings.TVAniSpeed);
        }
    }
};

//-----------------------------------------------------------------------------
// Sprite_Character
//
// The sprite for displaying a character.

Olivia.HorrorEffects.___Sprite_Character_initialize___ = Sprite_Character.prototype.initialize;
Sprite_Character.prototype.initialize = function(character) {
    Olivia.HorrorEffects.___Sprite_Character_initialize___.call(this, character);
    this._horrorFiltersSource = character;
    this._horrorFiltersGlitchSpecial = true;
};

//-----------------------------------------------------------------------------
// Sprite_Picture
//
// The sprite for displaying a picture.

Olivia.HorrorEffects.___Sprite_Picture_initialize___ = Sprite_Picture.prototype.initialize;
Sprite_Picture.prototype.initialize = function(pictureId) {
    Olivia.HorrorEffects.___Sprite_Picture_initialize___.call(this, pictureId);
};

Olivia.HorrorEffects.___Sprite_Picture_updateBitmap___ = Sprite_Picture.prototype.updateBitmap;
Sprite_Picture.prototype.updateBitmap = function() {
    Olivia.HorrorEffects.___Sprite_Picture_updateBitmap___.call(this);
    if (this.visible && !this._horrorFiltersSource) {
        this._horrorFiltersSource = this.picture();
    } else {
        this._horrorFiltersSource = undefined;
    }
};

//-----------------------------------------------------------------------------
// Sprite_Battler
//
// The superclass of Sprite_Actor and Sprite_Enemy.

Olivia.HorrorEffects.___Sprite_Battler_setBattler___ = Sprite_Battler.prototype.setBattler;
Sprite_Battler.prototype.setBattler = function(battler) {
    Olivia.HorrorEffects.___Sprite_Battler_setBattler___.call(this, battler);
    this._horrorFiltersSource = battler;
    this._horrorFiltersGlitchSpecial = true;
};

//-----------------------------------------------------------------------------
// Spriteset_Map
//
// The set of sprites on the map screen.

Olivia.HorrorEffects.___Spriteset_Map_initialize___ = Spriteset_Map.prototype.initialize;
Spriteset_Map.prototype.initialize = function() {
    Olivia.HorrorEffects.___Spriteset_Map_initialize___.call(this);
    this._horrorFiltersSource = $gameScreen;
};

//-----------------------------------------------------------------------------
// Spriteset_Battle
//
// The set of sprites on the battle screen.

Olivia.HorrorEffects.___Spriteset_Battle_initialize___ = Spriteset_Battle.prototype.initialize;
Spriteset_Battle.prototype.initialize = function() {
    Olivia.HorrorEffects.___Spriteset_Battle_initialize___.call(this);
    this._horrorFiltersSource = $gameSystem;
};

//-----------------------------------------------------------------------------
// Game_Interpreter
//
// The interpreter for running event commands.

Olivia.HorrorEffects.___Game_Interpreter_pluginCommand___ = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    Olivia.HorrorEffects.___Game_Interpreter_pluginCommand___.call(this, command, args);
    if (command.match(/HorrorEffect/i)) {
        this.pluginCommandHorrorEffects(args);
    }
};

Game_Interpreter.prototype.pluginCommandHorrorEffects = function(args) {
    var target = this.getPluginCommandHorrorEffectsTarget(args);
    if (!!target) {
        this.processPluginCommandHorrorEffects(target, args);
    }
};

Game_Interpreter.prototype.getPluginCommandHorrorEffectsTarget = function(args) {
    var text = args.shift();
    if (text.match(/(?:Screen|Map)/i)) {
        return $gameScreen;
    } else if (text.match(/(?:System|Battle)/i)) {
        return $gameSystem;
    } else if (text.match(/Player/i)) {
        return $gamePlayer;
    } else if (text.match(/Follower/i)) {
        var index = parseInt(args.shift());
        if (!!index) {
            index -= 1;
            return $gamePlayer.followers()._data[index];
        } else {
            alert('A valid number must follow Follower in the HorrorEffect command');
            return null ;
        }
    } else if (text.match(/Event/i)) {
        var eventId = parseInt(args.shift());
        if (eventId === 0) {
            eventId = this._eventId
        }
        if (!!eventId) {
            return $gameMap.event(eventId);
        } else {
            alert('A valid ID must follow Event in the HorrorEffect command');
            return null;
        }
    } else if (text.match(/Picture/i)) {
        var pictureId = parseInt(args.shift());
        if (!!pictureId) {
            return $gameScreen.picture(pictureId);
        } else {
            alert('A valid ID must follow Picture in the HorrorEffect command');
            return null;
        }
    } else if (text.match(/Actor/i)) {
        var actorId = parseInt(args.shift());
        if (!!actorId) {
            return $gameActors.actor(actorId);
        } else {
            alert('A valid ID must follow Actor in the HorrorEffect command');
            return null;
        }
    } else if (text.match(/Party/i)) {
        var index = parseInt(args.shift());
        if (!!index) {
            index -= 1;
            return $gameParty.members()[index];
        } else {
            alert('A valid number must follow Party in the HorrorEffect command');
            return null;
        }
    } else if (text.match(/Enemy/i)) {
        var index = parseInt(args.shift());
        if (!!index) {
            index -= 1;
            return $gameTroop.members()[index];
        } else {
            alert('A valid number must follow Enemy in the HorrorEffect command');
            return null;
        }
    } else {
        alert('Invalid HorrorEffect target');
        return null;
    }
};

Game_Interpreter.prototype.processPluginCommandHorrorEffects = function(target, args) {
    var command = args.shift();
    if (command.match(/Create/i)) {
        var type = 1;
    } else if (command.match(/Remove/i)) {
        var type = 2;
    } else if (command.match(/Change/i)) {
        var type = 3;
    } else if (command.match(/Clear/i)) {
        target.removeHorrorEffect('noise');
        target.removeHorrorEffect('glitch');
        target.removeHorrorEffect('tv');
        target.clearHorrorEffects();
        return;
    } else {
        alert('Invalid HorrorEffect command type: please use Create, Remove, or Change');
        return null;
    }
    var command = args.shift();
    if (command.match(/(?:Noise|Glitch|TV)/i)) {
        if (type === 1) {
            target.createHorrorEffect(command.toLowerCase());
        } else if (type === 2) {
            target.removeHorrorEffect(command.toLowerCase());
        } else if (type === 3) {
            var type = command.toLowerCase();
            var key = args.shift();
            var value = 0;
            // Noise
            if (type === 'noise') {
                if (key.match(/rate/i)) {
                    key = 'noise';
                    value = parseFloat(args.shift());
                } else if (key.match(/animated/i)) {
                    key = 'animated';
                    value = eval(args.shift().toLowerCase());
                } else {
                    alert('Invalid HorrorEffect Change format. Please refer to help file');
                    return;
                }
            // Glitch
            } else if (type === 'glitch') {
                if (key.match(/max/i)) {
                    key = 'sliceMax';
                    value = parseInt(args.shift());
                } else if (key.match(/min/i)) {
                    key = 'sliceMin';
                    value = parseInt(args.shift());
                } else if (key.match(/slice/i)) {
                    key = 'slices';
                    value = parseInt(args.shift());
                    target.setHorrorEffectToValue(type, 'sliceMax', value);
                    target.setHorrorEffectToValue(type, 'sliceMin', value);
                } else if (key.match(/offset/i)) {
                    key = 'offset';
                    value = parseInt(args.shift());
                } else if (key.match(/animated/i)) {
                    key = 'animated';
                    value = eval(args.shift().toLowerCase());
                    if (value === false) {
                        target.setHorrorEffectToValue(type, 'refreshRequest', true);
                    }
                } else if (key.match(/frequency/i)) {
                    key = 'aniFrequency';
                    value = parseInt(args.shift());
                } else if (key.match(/strength/i)) {
                    key = 'aniStrength';
                    value = parseInt(args.shift());
                } else if (key.match(/refresh/i)) {
                    key = 'refreshRequest';
                    value = true;
                } else {
                    alert('Invalid HorrorEffect Change format. Please refer to help file');
                    return;
                }
            // TV
            } else if (type === 'tv') {
                if (key.match(/thick/i)) {
                    key = 'lineWidth';
                    value = parseInt(args.shift());
                } else if (key.match(/corner/i)) {
                    key = 'vignetting';
                    value = parseFloat(args.shift());
                } else if (key.match(/animated/i)) {
                    key = 'animated';
                    value = eval(args.shift().toLowerCase());
                } else if (key.match(/speed/i)) {
                    key = 'aniSpeed';
                    value = parseFloat(args.shift());
                } else {
                    alert('Invalid HorrorEffect Change format. Please refer to help file');
                    return;
                }
            // Invalid
            } else {
                alert('Invalid HorrorEffect Change format. Please refer to help file');
                return;
            }
            target.setHorrorEffectToValue(type, key, value);
        }
    } else {
        alert('Invalid HorrorEffect effect type: please use Noise, Glitch, or TV');
        return null;
    }
};
















 







