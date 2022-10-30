//=============================================================================
// ★ Aries003_WeatherControl ★                                        1.0.0
//=============================================================================
/*:
 * @plugindesc Fine-tune in-game weather with various customizable features.
 * @author Aries
 *
 * @help
 * ★ Aries003_WeatherControl ★                                        1.0.0
 * ----------------------------------------------------------------------------
 * The Weather Control plugin allows you to control the existing 
 * weather effects with much more fine-grained authority, 
 * and adds 3 new weather effects that does not come with RPG Maker MV.
 * 
 * Control the look and feel of in-game weather by adjusting speed, angle, 
 * size, and assign an image for the 3 built-in weather effects.
 * 
 * Thunder strikes can occur periodically, flashing the screen and playing
 * a thunder sound effect. You can adjust the period and
 * randomness via parameters.
 * 
 * Plugin commands are also supplied that allow you to change images in-game.
 * This change is not saved between files.
 * ----------------------------------------------------------------------------
 * Listed below are plugin and script commands to adjust weather in-game.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Plugin: AriesToggleStormThunder [Flag]
 *  Script: Aries.P003_WCT.toggleStormThunder [Flag]
 *
 * Enables or disables thunderflashes during a Storm.
 * [Flag] - 'true' or 'false' without quotation marks.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Plugin: AriesWeather [Weather] [Power] [Duration]
 *  Script: $gameScreen.changeWeather([Weather], [Power], [Duration])
 * 
 * Sets the current weather.
 * [Weather] - 'none', 'rain', 'storm', 'snow', 'leaves', 'embers', 'shine' 
 * [Power] - A number between 1 to 9
 * [Duration] - The duration in frames of how long the transition occurs for.
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *  Plugin: AriesSetWeatherImage [Weather] [Filename]
 *  Script: Aries.P003_WCT.setWeatherImage([Weather], [Filename])
 * 
 * Sets the current weather.
 * [Weather] - 'none', 'rain', 'storm', 'snow', 'leaves', 'embers', 'shine' 
 * [Filename] - New image file for the weather effect.
 * ----------------------------------------------------------------------------
 * ★ Changelog
 * ----------------------------------------------------------------------------
 * 
 * @param Rain
 * @default
 * 
 * @param Detailed Settings (Rain)
 * @parent Rain
 * @default
 * 
 * @param Storm
 * @default
 * 
 * @param Detailed Settings (Storm)
 * @parent Storm
 * @default
 * 
 * @param Snow
 * @default
 * 
 * @param Detailed Settings (Snow)
 * @parent Snow
 * @default
 * 
 * @param Leaves
 * @default
 * 
 * @param Detailed Settings (Leaves)
 * @parent Leaves
 * @default
 * 
 * @param Embers
 * @default
 * 
 * @param Detailed Settings (Embers)
 * @parent Embers
 * @default
 * 
 * @param Shine
 * @default
 * 
 * @param Detailed Settings (Shine)
 * @parent Shine
 * @default
 * 
 * @param Rain Image
 * @parent Rain
 * @desc Define a Picture file for raindrops. (Place image in the Pictures folder.)
 * Valid: Any file name. Leave empty for default.
 * @default 
 * 
 * @param Raindrop Count Minimum
 * @parent Rain
 * @type number
 * @min 0
 * @max 999
 * @desc Amount of raindrops to create during Rain with the magnitude of 1.
 * Valid: A number between 0 to 999
 * @default 12
 * 
 * @param Raindrop Count Maximum
 * @parent Rain
 * @type number
 * @min 0
 * @max 999
 * @desc Amount of raindrops to create during Rain with the magnitude of 1.
 * Valid: A number between 0 to 999
 * @default 300
 * 
 * @param Raindrop Lifetime
 * @parent Detailed Settings (Rain)
 * @type number
 * @min 1
 * @max 30
 * @desc Controls how long a raindrop should last during Rain.
 * Valid: A number between 1 to 30
 * @default 5
 * 
 * @param Raindrop Speed
 * @parent Detailed Settings (Rain)
 * @type number
 * @min 1
 * @max 100
 * @desc Controls the speed of a raindrop during Rain.
 * Valid: A number between 1 to 100
 * @default 35
 * 
 * @param Raindrop Angle Base
 * @parent Detailed Settings (Rain)
 * @type number
 * @min -60
 * @max 60
 * @desc Controls the base angle at which raindrops fall during Rain.
 * Valid: A number between -60 to 60
 * @default 9
 * 
 * @param Raindrop Angle Variation
 * @parent Detailed Settings (Rain)
 * @type number
 * @min 0
 * @max 180
 * @desc Deviate raindrop angle up to X degrees during Rain. (4 is +-4°)
 * Valid: A number between 0 to 180
 * @default 4
 * 
 * @param Raindrop Opacity Base
 * @parent Detailed Settings (Rain)
 * @type number
 * @min 0
 * @max 255
 * @desc Controls the opacity of raindrops during Rain.
 * Valid: A number between 0 to 255
 * @default 180
 * 
 * @param Raindrop Opacity Variation
 * @parent Detailed Settings (Rain)
 * @type number
 * @min 0
 * @max 128
 * @desc Deviate raindrop opacity up to X value during Rain. (60 is +-60 opacity)
 * Valid: A number between 0 to 128
 * @default 60
 * 
 * @param Raindrop Size Variation
 * @parent Detailed Settings (Rain)
 * @type number
 * @min 0
 * @max 50
 * @desc Deviate raindrop sizes up to X% during Rain. (No effect when not using an image.)
 * Valid: A number between 0 to 50
 * @default 20
 * 
 * @param Storm Raindrop Lifetime
 * @parent Detailed Settings (Storm)
 * @type number
 * @min 1
 * @max 30
 * @desc Controls how long a raindrop should last during Storm.
 * Valid: A number between 1 to 30
 * @default 2
 * 
 * @param Storm Raindrop Speed
 * @parent Detailed Settings (Storm)
 * @type number
 * @min 1
 * @max 100
 * @desc Controls the speed of a raindrop during Storm.
 * Valid: A number between 1 to 100
 * @default 75
 * 
 * @param Storm Raindrop Angle Base
 * @parent Detailed Settings (Storm)
 * @type number
 * @min -60
 * @max 60
 * @desc Controls the base angle at which raindrops fall during Storm.
 * Valid: A number between -60 to 60
 * @default 18
 * 
 * @param Storm Raindrop Angle Variation
 * @parent Detailed Settings (Storm)
 * @type number
 * @min 0
 * @max 180
 * @desc Deviate raindrop angle up to X degrees during Storm. (12 is +-12°)
 * Valid: A number between 0 to 180
 * @default 12
 * 
 * @param Storm Raindrop Opacity Base
 * @parent Detailed Settings (Storm)
 * @type number
 * @min 0
 * @max 255
 * @desc Controls the opacity of raindrops during Storm.
 * Valid: A number between 0 to 255
 * @default 210
 * 
 * @param Storm Raindrop Opacity Variation
 * @parent Detailed Settings (Storm)
 * @type number
 * @min 0
 * @max 128
 * @desc Deviate raindrop opacity up to X value during Rain. (125 is +-125 opacity)
 * Valid: A number between 0 to 128
 * @default 125
 * 
 * @param Storm Raindrop Size Variation
 * @parent Detailed Settings (Storm)
 * @type number
 * @min 0
 * @max 50
 * @desc Deviate raindrop sizes up to X% during Storm. (No effect when not using an image.)
 * Valid: A number between 0 to 50
 * @default 33
 * 
 * @param Storm Thunder
 * @parent Storm
 * @type boolean
 * @on On
 * @off Off
 * @desc Flash the screen and play a sound effect occasionally during Storm.
 * Valid: True/False
 * @default true
 * 
 * @param Storm Thunder in Battle
 * @parent Storm Thunder
 * @type boolean
 * @on On
 * @off Off
 * @desc Allow thunderflashes to occur in battle. 
 * Valid: True/False
 * @default false
 * 
 * @param Thunder Sound
 * @parent Storm Thunder
 * @desc Sound effect to play when a thunderflash occurs.
 * Valid: Any file name.
 * @default Thunder9
 * 
 * @param Thunder Sound Volume
 * @parent Storm Thunder
 * @type number
 * @min 0
 * @max 100
 * @desc Volume of the sound effect played when a thunderflash occurs.
 * Valid: A number between 0 to 100.
 * @default 75
 * 
 * @param Thunder Sound Pitch
 * @parent Storm Thunder
 * @type number
 * @min 50
 * @max 150
 * @desc Pitch of the sound effect played when a thunderflash occurs.
 * Valid: A number between 50 to 150.
 * @default 100
 * 
 * @param Thunder Sound Pitch Variation
 * @parent Storm Thunder
 * @type number
 * @min 0
 * @max 50
 * @desc Deviate sound pitch up to X value when a thunderflash occurs.
 * Valid: A number between 0 to 50.
 * @default 15
 * 
 * @param Thunder Flash Power
 * @parent Storm Thunder
 * @type number
 * @min 0
 * @max 255
 * @desc Strength of the screen flash played when a thunderflash occurs.
 * Valid: A number between 0-255.
 * @default 180
 * 
 * @param Thunder Flash Variation
 * @parent Storm Thunder
 * @type number
 * @min 0
 * @max 128
 * @desc Deviate flash power up to X value when a thunderflash occurs.
 * Valid: A number between 0-128.
 * @default 50
 * 
 * @param Thunder Wait Time
 * @parent Storm Thunder
 * @type number
 * @desc Duration until the next thunderflash. (Adjusted based on Power)
 * Valid: Any number
 * @default 300
 * 
 * @param Thunder Wait Time Variation
 * @parent Storm Thunder
 * @type number
 * @desc Deviate wait time up to X value until the next thunderflash.
 * Valid: Any number
 * @default 45
 * 
 * @param Storm Image
 * @parent Storm
 * @desc Define a Picture file for raindrops (Storm). (Place image in the Pictures folder.)
 * Valid: Any file name. Leave empty for default.
 * @default 
 * 
 * @param Storm Raindrop Count Minimum
 * @parent Storm
 * @type number
 * @min 0
 * @max 999
 * @desc Amount of raindrops to create during a Storm with the magnitude of 1.
 * Valid: A number between 0 to 999
 * @default 75
 * 
 * @param Storm Raindrop Count Maximum
 * @parent Storm
 * @type number
 * @min 0
 * @max 999
 * @desc Amount of raindrops to create during a Storm with the magnitude of 9.
 * Valid: A number between 0 to 999
 * @default 350
 * 
 * @param Snow Image
 * @parent Snow
 * @desc Image used for snow.
 * Valid: Any file name. Leave empty for default.
 * @default 
 * 
 * @param Snow Count Minimum
 * @parent Snow
 * @type number
 * @min 0
 * @max 999
 * @desc Amount of raindrops to create during Snow with the magnitude of 1.
 * Valid: A number between 0 to 999
 * @default 12
 * 
 * @param Snow Count Maximum
 * @parent Snow
 * @type number
 * @min 0
 * @max 999
 * @desc Amount of raindrops to create during Snow with the magnitude of 9.
 * Valid: A number between 0 to 999
 * @default 320
 * 
 * @param Snowflake Lifetime
 * @parent Detailed Settings (Snow)
 * @type number
 * @min 1
 * @max 80
 * @desc Controls how long a snowflake should last during Snow.
 * Valid: A number between 1 to 200
 * @default 16
 * 
 * @param Snowflake Speed Base
 * @parent Detailed Settings (Snow)
 * @type number
 * @min 1
 * @max 200
 * @desc Controls the speed of a snowflake during Snow.
 * Valid: A number between 1 to 200
 * @default 25
 * 
 * @param Snowflake Speed Variation
 * @parent Detailed Settings (Snow)
 * @type number
 * @min 0
 * @max 50
 * @desc Deviate snowflake speed up to X value during Snow. (10 is +-10% speed)
 * Valid: A number between 0 to 50
 * @default 10
 * 
 * @param Snowflake Opacity Base
 * @parent Detailed Settings (Snow)
 * @type number
 * @min 0
 * @max 255
 * @desc Controls the opacity of snowflakes during Snow.
 * Valid: A number between 0 to 255
 * @default 220
 * 
 * @param Snowflake Opacity Variation
 * @parent Detailed Settings (Snow)
 * @type number
 * @min 0
 * @max 255
 * @desc Deviate snowflake opacity up to X value during Snow. (20 is +-20 opacity)
 * Valid: A number between 0 to 255
 * @default 20
 * 
 * @param Snowflake Size Variation
 * @parent Detailed Settings (Snow)
 * @type number
 * @min 0
 * @max 50
 * @desc Deviate snowflake sizes up to X% during Snow. (No effect when not using an image.)
 * Valid: A number between 0 to 50
 * @default 40
 * 
 * @param Leaf Image
 * @parent Leaves
 * @desc Image used for leaves. * Leaf weather effects do not appear when left empty.
 * Valid: Any file name. 
 * @default Leaf
 * 
 * @param Leaf Count Minimum
 * @parent Leaves
 * @type number
 * @min 0
 * @max 999
 * @desc Amount of leaves to create during Leaves with the magnitude of 1.
 * Valid: A number between 0 to 999
 * @default 10
 * 
 * @param Leaf Count Maximum
 * @parent Leaves
 * @type number
 * @min 0
 * @max 999
 * @desc Amount of leaves to create during Leaves with the magnitude of 9.
 * Valid: A number between 0 to 999
 * @default 100
 * 
 * @param Leaf Lifetime
 * @parent Detailed Settings (Leaves)
 * @type number
 * @min 1
 * @max 80
 * @desc Controls how long a leaf should last during Leaves.
 * Valid: A number between 1 to 200
 * @default 80
 * 
 * @param Leaf Speed Base
 * @parent Detailed Settings (Leaves)
 * @type number
 * @min 1
 * @max 15
 * @desc Controls the speed of a leaf during Leaves.
 * Valid: A number between 1 to 15
 * @default 3
 * 
 * @param Leaf Speed Variation
 * @parent Detailed Settings (Leaves)
 * @type number
 * @min 0
 * @max 5
 * @desc Deviate leaf speed up to X value during Leaves.
 * Valid: A number between 0 to 5
 * @default 2
 * 
 * @param Leaf Size Variation
 * @parent Detailed Settings (Leaves)
 * @type number
 * @min 0
 * @max 50
 * @desc Deviate leaf sizes up to X% during Leaves. 
 * Valid: A number between 0 to 50
 * @default 32
 * 
 * @param Embers Image
 * @parent Embers
 * @desc Image used for embers. * Embers weather do not appear when left empty.
 * Valid: Any file name. 
 * @default Embers
 * 
 * @param Embers Count Minimum
 * @parent Embers
 * @type number
 * @min 0
 * @max 999
 * @desc Amount of embers to create during Embers with the magnitude of 1.
 * Valid: A number between 0 to 999
 * @default 20
 * 
 * @param Embers Count Maximum
 * @parent Embers
 * @type number
 * @min 0
 * @max 999
 * @desc Amount of embers to create during Embers with the magnitude of 9.
 * Valid: A number between 0 to 999
 * @default 160
 * 
 * @param Embers Lifetime
 * @parent Detailed Settings (Embers)
 * @type number
 * @min 1
 * @max 80
 * @desc Controls how long embers should last during Embers.
 * Valid: A number between 1 to 200
 * @default 33
 * 
 * @param Embers Speed Base
 * @parent Detailed Settings (Embers)
 * @type number
 * @min 1
 * @max 60
 * @desc Controls the speed of embers during Embers.
 * Valid: A number between 1 to 60
 * @default 30
 * 
 * @param Embers Speed Variation
 * @parent Detailed Settings (Embers)
 * @type number
 * @min 0
 * @max 25
 * @desc Deviate embers speed up to X value during Embers.
 * Valid: A number between 0 to 25
 * @default 25
 * 
 * @param Embers Size Variation
 * @parent Detailed Settings (Embers)
 * @type number
 * @min 0
 * @max 50
 * @desc Deviate leaf sizes up to X% during Leaves. 
 * Valid: A number between 0 to 50
 * @default 40
 * 
 * @param Shine Image
 * @parent Shine
 * @desc Image used for shining effects.
 * Valid: Any file name. 
 * @default Shine
 * 
 * @param Shine Count Minimum
 * @parent Shine
 * @type number
 * @min 0
 * @max 999
 * @desc Amount of sparkles to create during Shine with the magnitude of 1.
 * Valid: A number between 0 to 999
 * @default 20
 * 
 * @param Shine Count Maximum
 * @parent Shine
 * @type number
 * @min 0
 * @max 999
 * @desc Amount of sparkles to create during Shine with the magnitude of 9.
 * Valid: A number between 0 to 999
 * @default 360
 * 
 * @param Shine Lifetime
 * @parent Detailed Settings (Shine)
 * @type number
 * @min 1
 * @max 25
 * @desc Controls how long sparkles should last during Shine.
 * Valid: A number between 1 to 25
 * @default 25
 * 
 * @param Shine Opacity Base
 * @parent Detailed Settings (Shine)
 * @type number
 * @min 0
 * @max 255
 * @desc Controls the opacity of sparkles during Shine.
 * Valid: A number between 0 to 255
 * @default 220
 * 
 * @param Shine Opacity Variation
 * @parent Detailed Settings (Shine)
 * @type number
 * @min 0
 * @max 255
 * @desc Deviate sparkle opacity up to X value during Shine.
 * Valid: A number between 0 to 255
 * @default 20
 * 
 * @param Shine Size Variation
 * @parent Detailed Settings (Shine)
 * @type number
 * @min 0
 * @max 90
 * @desc Deviate sparkle sizes up to X% during Shine. 
 * Valid: A number between 0 to 90
 * @default 80
 */

var Aries = Aries || {};
var Imported = Imported || {};
Aries.P003_WCT = {};
Aries.P003_WCT.Param = PluginManager.parameters('Aries003_WeatherControl');

Aries.P003_WCT.RainImage  = String(Aries.P003_WCT.Param["Rain Image"]);
Aries.P003_WCT.RainMin    = Number(Aries.P003_WCT.Param["Raindrop Count Minimum"]);
Aries.P003_WCT.RainMax    = Number(Aries.P003_WCT.Param["Raindrop Count Maximum"]);
Aries.P003_WCT.RainLife   = Number(Aries.P003_WCT.Param["Raindrop Lifetime"]);
Aries.P003_WCT.RainSpeed  = Number(Aries.P003_WCT.Param["Raindrop Speed"]);
Aries.P003_WCT.RainAngleC = Number(Aries.P003_WCT.Param["Raindrop Angle Base"]);
Aries.P003_WCT.RainAlphaC = Number(Aries.P003_WCT.Param["Raindrop Opacity Base"]);
Aries.P003_WCT.RainAngleV = Number(Aries.P003_WCT.Param["Raindrop Angle Variation"]);
Aries.P003_WCT.RainAlphaV = Number(Aries.P003_WCT.Param["Raindrop Opacity Variation"]);
Aries.P003_WCT.RainSizeV  = Number(Aries.P003_WCT.Param["Raindrop Size Variation"]);

Aries.P003_WCT.StormImage  = String(Aries.P003_WCT.Param["Storm Image"]);
Aries.P003_WCT.StormMin    = Number(Aries.P003_WCT.Param["Storm Raindrop Count Minimum"]);
Aries.P003_WCT.StormMax    = Number(Aries.P003_WCT.Param["Storm Raindrop Count Maximum"]);
Aries.P003_WCT.StormLife   = Number(Aries.P003_WCT.Param["Storm Raindrop Lifetime"]);
Aries.P003_WCT.StormSpeed  = Number(Aries.P003_WCT.Param["Storm Raindrop Speed"]);
Aries.P003_WCT.StormAngleC = Number(Aries.P003_WCT.Param["Storm Raindrop Angle Base"]);
Aries.P003_WCT.StormAlphaC = Number(Aries.P003_WCT.Param["Storm Raindrop Opacity Base"]);
Aries.P003_WCT.StormAngleV = Number(Aries.P003_WCT.Param["Storm Raindrop Angle Variation"]);
Aries.P003_WCT.StormAlphaV = Number(Aries.P003_WCT.Param["Storm Raindrop Opacity Variation"]);
Aries.P003_WCT.StormSizeV  = Number(Aries.P003_WCT.Param["Storm Raindrop Size Variation"]);

Aries.P003_WCT.StormThunder     = eval(Aries.P003_WCT.Param["Storm Thunder"]);
Aries.P003_WCT.StormThunderB    = eval(Aries.P003_WCT.Param["Storm Thunder in Battle"]);
Aries.P003_WCT.ThunderSound     = String(Aries.P003_WCT.Param["Thunder Sound"]);
Aries.P003_WCT.ThunderSEVol     = Number(Aries.P003_WCT.Param["Thunder Sound Volume"]);
Aries.P003_WCT.ThunderSEPitch   = Number(Aries.P003_WCT.Param["Thunder Sound Pitch"]);
Aries.P003_WCT.ThunderSEPitchV  = Number(Aries.P003_WCT.Param["Thunder Sound Pitch Variation"]);
Aries.P003_WCT.ThunderWait      = Number(Aries.P003_WCT.Param["Thunder Wait Time"]);
Aries.P003_WCT.ThunderWaitV     = Number(Aries.P003_WCT.Param["Thunder Wait Time Variation"]);
Aries.P003_WCT.ThunderFlash     = Number(Aries.P003_WCT.Param["Thunder Flash Power"]);
Aries.P003_WCT.ThunderFlashV    = Number(Aries.P003_WCT.Param["Thunder Flash Variation"]);

Aries.P003_WCT.SnowImage  = String(Aries.P003_WCT.Param["Snow Image"]);
Aries.P003_WCT.SnowMin    = Number(Aries.P003_WCT.Param["Snow Count Minimum"]);
Aries.P003_WCT.SnowMax    = Number(Aries.P003_WCT.Param["Snow Count Maximum"]);
Aries.P003_WCT.SnowLife   = Number(Aries.P003_WCT.Param["Snowflake Lifetime"]);
Aries.P003_WCT.SnowSpeedC = Number(Aries.P003_WCT.Param["Snowflake Speed Base"]);
Aries.P003_WCT.SnowAlphaC = Number(Aries.P003_WCT.Param["Snowflake Opacity Base"]);
Aries.P003_WCT.SnowSpeedV = Number(Aries.P003_WCT.Param["Snowflake Speed Variation"]);
Aries.P003_WCT.SnowAlphaV = Number(Aries.P003_WCT.Param["Snowflake Opacity Variation"]);
Aries.P003_WCT.SnowSizeV  = Number(Aries.P003_WCT.Param["Snowflake Size Variation"]);

Aries.P003_WCT.LeafImage  = String(Aries.P003_WCT.Param["Leaf Image"]);
Aries.P003_WCT.LeafMin    = Number(Aries.P003_WCT.Param["Leaf Count Minimum"]);
Aries.P003_WCT.LeafMax    = Number(Aries.P003_WCT.Param["Leaf Count Maximum"]);
Aries.P003_WCT.LeafLife   = Number(Aries.P003_WCT.Param["Leaf Lifetime"]);
Aries.P003_WCT.LeafSpeedC = Number(Aries.P003_WCT.Param["Leaf Speed Base"]);
Aries.P003_WCT.LeafSpeedV = Number(Aries.P003_WCT.Param["Leaf Speed Variation"]);
Aries.P003_WCT.LeafSizeV  = Number(Aries.P003_WCT.Param["Leaf Size Variation"]);

Aries.P003_WCT.HeatImage  = String(Aries.P003_WCT.Param["Embers Image"]);
Aries.P003_WCT.HeatMin    = Number(Aries.P003_WCT.Param["Embers Count Minimum"]);
Aries.P003_WCT.HeatMax    = Number(Aries.P003_WCT.Param["Embers Count Maximum"]);
Aries.P003_WCT.HeatLife   = Number(Aries.P003_WCT.Param["Embers Lifetime"]);
Aries.P003_WCT.HeatSpeedC = Number(Aries.P003_WCT.Param["Embers Speed Base"]);
Aries.P003_WCT.HeatSpeedV = Number(Aries.P003_WCT.Param["Embers Speed Variation"]);
Aries.P003_WCT.HeatSizeV  = Number(Aries.P003_WCT.Param["Embers Size Variation"]);

Aries.P003_WCT.MysticImage  = String(Aries.P003_WCT.Param["Shine Image"]);
Aries.P003_WCT.MysticMin    = Number(Aries.P003_WCT.Param["Shine Count Minimum"]);
Aries.P003_WCT.MysticMax    = Number(Aries.P003_WCT.Param["Shine Count Maximum"]);
Aries.P003_WCT.MysticLife   = Number(Aries.P003_WCT.Param["Shine Lifetime"]);
Aries.P003_WCT.MysticAlphaC = Number(Aries.P003_WCT.Param["Shine Opacity Base"]);
Aries.P003_WCT.MysticAlphaV = Number(Aries.P003_WCT.Param["Shine Opacity Variation"]);
Aries.P003_WCT.MysticSizeV  = Number(Aries.P003_WCT.Param["Shine Size Variation"]);

var _aries_p003_pluginCommand=Game_Interpreter.prototype.pluginCommand;Game_Interpreter.prototype.pluginCommand=function(command,args){_aries_p003_pluginCommand.call(this,command,args);if(command==='AriesToggleStormThunder'){Aries.P003_WCT.toggleStormThunder(eval(args[0]))}else if(command==='AriesWeather'){$gameScreen.changeWeather(String(args[0]).toLowerCase(),args[1],args[2])}else if(command==='AriesSetWeatherImage'){Aries.P003_WCT.setWeatherImage(String(args[0]).toLowerCase(),String(args[1]).toLowerCase())}};Aries.P003_WCT.toggleStormThunder=function(flag){Aries.P003_WCT.StormThunder=flag};Aries.P003_WCT.setWeatherImage=function(weathertype,image){switch(weathertype){case 'rain':Aries.P003_WCT.RainImage=image;break;case 'storm':Aries.P003_WCT.StormImage=image;break;case 'snow':Aries.P003_WCT.SnowImage=image;break;case 'leaves':Aries.P003_WCT.LeafImage=image;break;case 'embers':Aries.P003_WCT.HeatImage=image;break;case 'shine':Aries.P003_WCT.MysticImage=image;break}
if(SceneManager._scene instanceof Scene_Map){SceneManager._scene._spriteset.refreshWeatherBitmaps()}};var _aries_p003_gameScreen_clearWeather=Game_Screen.prototype.clearWeather;Game_Screen.prototype.clearWeather=function(){_aries_p003_gameScreen_clearWeather.call(this);this._weatherWind=[0,0];this._stormThunderSound=''
this._stormThunderFlash=0;this._stormThunderCount=4*(Aries.P003_WCT.ThunderWait+Aries.P003_WCT.ThunderWaitV);this._stormThunderFrequency=0;this._snowBloom=0};var _aries_p003_gameScreen_updateWeather=Game_Screen.prototype.updateWeather;Game_Screen.prototype.updateWeather=function(){_aries_p003_gameScreen_updateWeather.call(this);if(this._weatherType==='storm'){if(Aries.P003_WCT.StormThunder===!0&&!$gameParty.inBattle()){this.updateStorm()}else if(Aries.P003_WCT.StormThunderB===!0&&$gameParty.inBattle()){this.updateStorm()}}};Game_Screen.prototype.updateStorm=function(){this._stormThunderCount-=(1+(0.5*Number(this._weatherPower)));if(this._stormThunderCount<=0){var alpha=Math.min((Aries.P003_WCT.ThunderFlash-Aries.P003_WCT.ThunderFlashV)+Math.randomInt(1+Aries.P003_WCT.ThunderFlashV*2),255);this.startFlash([255,255,255,alpha],4);if(Aries.P001_ASE!==undefined){Aries.P001_ASE.glow(18,2,3,0.75)}
this._stormThunderCount=4*((Aries.P003_WCT.ThunderWait-Aries.P003_WCT.ThunderWaitV)+Math.randomInt(1+Aries.P003_WCT.ThunderWaitV*2));thunderSound={name:Aries.P003_WCT.ThunderSound,pan:0,pitch:(Aries.P003_WCT.ThunderSEPitch-Aries.P003_WCT.ThunderSEPitchV)+Math.randomInt(1+Aries.P003_WCT.ThunderSEPitchV*2),volume:Aries.P003_WCT.ThunderSEVol};AudioManager.playStaticSe(thunderSound)}};Spriteset_Map.prototype.refreshWeatherBitmaps=function(){this._weather._createBitmaps()};Weather.prototype._createBitmaps=function(){this._createRainBitmap();this._createStormBitmap();this._createSnowBitmap();this._createLeafBitmap();this._createHeatBitmap();this._createMysticBitmap()};Weather.prototype._createRainBitmap=function(){if(Aries.P003_WCT.RainImage.length>0){this._rainBitmap=ImageManager.loadPicture(Aries.P003_WCT.RainImage)}else{this._rainBitmap=new Bitmap(1,60);this._rainBitmap.fillAll('white')}};Weather.prototype._createStormBitmap=function(){if(Aries.P003_WCT.StormImage.length>0){this._stormBitmap=ImageManager.loadPicture(Aries.P003_WCT.StormImage)}else{this._stormBitmap=new Bitmap(2,100);this._stormBitmap.fillAll('white')}};Weather.prototype._createSnowBitmap=function(){if(Aries.P003_WCT.SnowImage.length>0){this._snowBitmap=ImageManager.loadPicture(Aries.P003_WCT.SnowImage)}else{this._snowBitmap=new Bitmap(9,9);this._snowBitmap.drawCircle(4,4,4,'white')}};Weather.prototype._createLeafBitmap=function(){if(Aries.P003_WCT.LeafImage.length>0){this._leafBitmap=ImageManager.loadPicture(Aries.P003_WCT.LeafImage)}else{this._leafBitmap=new Bitmap(9,9);this._leafBitmap.drawCircle(4,4,4,'green')}};Weather.prototype._createHeatBitmap=function(){if(Aries.P003_WCT.HeatImage.length>0){this._heatBitmap=ImageManager.loadPicture(Aries.P003_WCT.HeatImage)}else{this._heatBitmap=new Bitmap(7,7);this._heatBitmap.drawCircle(3,3,3,'black')}};Weather.prototype._createMysticBitmap=function(){if(Aries.P003_WCT.MysticImage.length>0){this._mysticBitmap=ImageManager.loadPicture(Aries.P003_WCT.MysticImage)}else{this._mysticBitmap=new Bitmap(9,9);this._mysticBitmap.drawCircle(4,4,4,'white');this._mysticBitmap.rotateHue(Math.randomInt(359))}};Weather.prototype._addSprite=function(){var sprite=new Sprite_Weather(this.viewport);switch(this.type){case 'rain':var life=Aries.P003_WCT.RainLife;var size=0.01*((100-Aries.P003_WCT.RainSizeV)+Math.randomInt(1+Aries.P003_WCT.RainSizeV*2));var getangle=((Aries.P003_WCT.RainAngleC-Aries.P003_WCT.RainAngleV)+Math.randomInt(1+Aries.P003_WCT.RainAngleV*2));var alpha=((Aries.P003_WCT.RainAlphaC-Aries.P003_WCT.RainAlphaV)+Math.randomInt(1+Aries.P003_WCT.RainAlphaV*2));sprite.setUp('rain',life,size,getangle,alpha);sprite.blendMode=PIXI.BLEND_MODES.NORMAL;break;case 'storm':var life=Aries.P003_WCT.StormLife;var size=0.01*((100-Aries.P003_WCT.StormSizeV)+Math.randomInt(1+Aries.P003_WCT.StormSizeV*2));var getangle=((Aries.P003_WCT.StormAngleC-Aries.P003_WCT.StormAngleV)+Math.randomInt(1+Aries.P003_WCT.StormAngleV*2));var alpha=((Aries.P003_WCT.StormAlphaC-Aries.P003_WCT.StormAlphaV)+Math.randomInt(1+Aries.P003_WCT.StormAlphaV*2));sprite.setUp('storm',life,size,getangle,alpha);sprite.blendMode=PIXI.BLEND_MODES.NORMAL;break;case 'snow':var life=Aries.P003_WCT.SnowLife;var size=0.01*((100-Aries.P003_WCT.SnowSizeV)+Math.randomInt(1+Aries.P003_WCT.SnowSizeV*2));var getangle=(-1+Math.randomInt(3))*0.267;var alpha=((Aries.P003_WCT.SnowAlphaC-Aries.P003_WCT.SnowAlphaV)+Math.randomInt(1+Aries.P003_WCT.SnowAlphaV*2));var snowspeed=1.33+Math.randomInt(2);sprite.setUp('snow',life,size,getangle,alpha,snowspeed);sprite.blendMode=PIXI.BLEND_MODES.NORMAL;break;case 'leaves':var life=Aries.P003_WCT.LeafLife;var size=0.007*((100-Aries.P003_WCT.LeafSizeV)+Math.randomInt(1+Aries.P003_WCT.LeafSizeV*2));var getangle=Aries.P003_WCT.LeafSpeedV;var alpha=255;var snowspeed=0.83+Math.randomInt(2)
sprite.setUp('leaves',life,size,getangle,alpha,snowspeed);sprite.blendMode=PIXI.BLEND_MODES.NORMAL;break;case 'embers':var life=Aries.P003_WCT.HeatLife;var size=0.007*((100-Aries.P003_WCT.HeatSizeV)+Math.randomInt(1+Aries.P003_WCT.HeatSizeV*2));var getangle=Aries.P003_WCT.HeatSpeedV;var alpha=255;var snowspeed=0.83+Math.randomInt(2)
sprite.setUp('embers',life,size,getangle,alpha,snowspeed);sprite.blendMode=PIXI.BLEND_MODES.NORMAL;break;case 'shine':var life=Aries.P003_WCT.MysticLife;var size=0.007*((100-Aries.P003_WCT.MysticSizeV)+Math.randomInt(1+Aries.P003_WCT.MysticSizeV*2));var getangle=12;var alpha=((Aries.P003_WCT.MysticAlphaC-Aries.P003_WCT.MysticAlphaV)+Math.randomInt(1+Aries.P003_WCT.MysticAlphaV*2));var snowspeed=0.25*(2+Math.randomInt(3));sprite.setUp('shine',life,size,getangle,alpha,snowspeed);sprite.rotation=Math.random();sprite.opacity=0;break}
sprite.opacity=0;this._sprites.push(sprite);this.addChild(sprite)};Weather.prototype._getMaxSpriteCount=function(){var maxCount=0;switch(this.type){case 'rain':maxCount=Aries.P003_WCT.RainMin+(Aries.P003_WCT.RainMax*this.power*0.1);break;case 'storm':maxCount=Aries.P003_WCT.StormMin+(Aries.P003_WCT.StormMax*this.power*0.1);break;case 'snow':maxCount=Aries.P003_WCT.SnowMin+(Aries.P003_WCT.SnowMax*this.power*0.1);break;case 'leaves':maxCount=Aries.P003_WCT.LeafMin+(Aries.P003_WCT.LeafMax*this.power*0.1);break;case 'embers':maxCount=Aries.P003_WCT.HeatMin+(Aries.P003_WCT.HeatMax*this.power*0.1);break;case 'shine':maxCount=Aries.P003_WCT.MysticMin+(Aries.P003_WCT.MysticMax*this.power*0.1);break}
return maxCount};Weather.prototype._updateAllSprites=function(){var maxSprites=this._getMaxSpriteCount();if(this._sprites.length<maxSprites){this._addSprite()}
if(this._sprites.length>maxSprites){this._removeSprite()}
this._sprites.forEach(function(sprite){this._updateSprite(sprite);sprite.x=sprite.ax-this.origin.x;sprite.y=sprite.ay-this.origin.y},this)};Weather.prototype._updateSprite=function(sprite){sprite.update();switch(this.type){case 'rain':this._updateRainSprite(sprite);break;case 'storm':this._updateStormSprite(sprite);break;case 'snow':this._updateSnowSprite(sprite);break;case 'leaves':this._updateLeafSprite(sprite);break;case 'embers':this._updateHeatSprite(sprite);break;case 'shine':this._updateMysticSprite(sprite);break}
if(sprite._lifetime<=0&&sprite.opacity<=6){this._rebornSprite(sprite)}};Weather.prototype._updateRainSprite=function(sprite){sprite.bitmap=this._rainBitmap;sprite.rotation=sprite._anglev*(Math.PI/180);var velocity=sprite.getVelocity(Aries.P003_WCT.RainSpeed);sprite.ax+=velocity[0];sprite.ay+=velocity[1]};Weather.prototype._updateStormSprite=function(sprite){sprite.bitmap=this._stormBitmap;sprite.rotation=sprite._anglev*(Math.PI/180);var velocity=sprite.getVelocity(Aries.P003_WCT.StormSpeed);sprite.ax+=velocity[0];sprite.ay+=velocity[1]};Weather.prototype._updateSnowSprite=function(sprite){sprite.bitmap=this._snowBitmap;sprite.ax+=sprite._anglev;sprite.ay+=sprite._snowSpeed};Weather.prototype._updateLeafSprite=function(sprite){sprite.bitmap=this._leafBitmap;sprite.rotation+=0.025*sprite._anglev;sprite.ax+=2*Math.sin(0.0078*sprite._randomSeed);sprite.ay+=sprite._snowSpeed};Weather.prototype._updateHeatSprite=function(sprite){sprite.bitmap=this._heatBitmap;sprite.ax+=2*Math.sin(0.0139*sprite._randomSeed);sprite.ay-=sprite._snowSpeed};Weather.prototype._updateMysticSprite=function(sprite){sprite.bitmap=this._mysticBitmap};Weather.prototype._rebornSprite=function(sprite){sprite.ax=Math.randomInt(Graphics.width+500)-200+this.origin.x;sprite.ay=Math.randomInt(Graphics.height+600)-400+this.origin.y;switch(this.type){case 'rain':var life=Aries.P003_WCT.RainLife;var size=0.01*((100-Aries.P003_WCT.RainSizeV)+Math.randomInt(1+Aries.P003_WCT.RainSizeV*2));var getangle=((Aries.P003_WCT.RainAngleC-Aries.P003_WCT.RainAngleV)+Math.randomInt(1+Aries.P003_WCT.RainAngleV*2));var alpha=((Aries.P003_WCT.RainAlphaC-Aries.P003_WCT.RainAlphaV)+Math.randomInt(1+Aries.P003_WCT.RainAlphaV*2));sprite.setUp('rain',life,size,getangle,alpha);sprite.blendMode=PIXI.BLEND_MODES.NORMAL;break;case 'storm':var life=Aries.P003_WCT.StormLife;var size=0.01*((100-Aries.P003_WCT.StormSizeV)+Math.randomInt(1+Aries.P003_WCT.StormSizeV*2));var getangle=((Aries.P003_WCT.StormAngleC-Aries.P003_WCT.StormAngleV)+Math.randomInt(1+Aries.P003_WCT.StormAngleV*2));var alpha=((Aries.P003_WCT.StormAlphaC-Aries.P003_WCT.StormAlphaV)+Math.randomInt(1+Aries.P003_WCT.StormAlphaV*2));sprite.setUp('storm',life,size,getangle,alpha);sprite.blendMode=PIXI.BLEND_MODES.NORMAL;break;case 'snow':var life=Aries.P003_WCT.SnowLife;var size=0.01*((100-Aries.P003_WCT.SnowSizeV)+Math.randomInt(1+Aries.P003_WCT.SnowSizeV*2));var getangle=(-1+Math.randomInt(3))*0.267;var alpha=((Aries.P003_WCT.SnowAlphaC-Aries.P003_WCT.SnowAlphaV)+Math.randomInt(1+Aries.P003_WCT.SnowAlphaV*2));var snowspeed=1.33+Math.randomInt(2);sprite.setUp('snow',life,size,getangle,alpha,snowspeed);sprite.blendMode=PIXI.BLEND_MODES.NORMAL;break;case 'leaves':var life=Aries.P003_WCT.LeafLife;var size=0.007*((100-Aries.P003_WCT.LeafSizeV)+Math.randomInt(1+Aries.P003_WCT.LeafSizeV*2));var getangle=Aries.P003_WCT.LeafSpeedV;var alpha=255;var snowspeed=0.83+Math.randomInt(2)
sprite.setUp('leaves',life,size,getangle,alpha,snowspeed);sprite.blendMode=PIXI.BLEND_MODES.NORMAL;break;case 'embers':var life=Aries.P003_WCT.HeatLife;var size=0.007*((100-Aries.P003_WCT.HeatSizeV)+Math.randomInt(1+Aries.P003_WCT.HeatSizeV*2));var getangle=Aries.P003_WCT.HeatSpeedV;var alpha=255;var snowspeed=0.83+Math.randomInt(2)
sprite.setUp('embers',life,size,getangle,alpha,snowspeed);sprite.blendMode=PIXI.BLEND_MODES.NORMAL;break;case 'shine':var life=Aries.P003_WCT.MysticLife;var size=0.007*((100-Aries.P003_WCT.MysticSizeV)+Math.randomInt(1+Aries.P003_WCT.MysticSizeV*2));var getangle=12;var alpha=((Aries.P003_WCT.MysticAlphaC-Aries.P003_WCT.MysticAlphaV)+Math.randomInt(1+Aries.P003_WCT.MysticAlphaV*2));var snowspeed=0.25*(2+Math.randomInt(3));sprite.setUp('shine',life,size,getangle,alpha,snowspeed);sprite.rotation=Math.random();sprite.opacity=0;break}};function Sprite_Weather(){this.initialize.apply(this,arguments)}
Sprite_Weather.prototype=Object.create(Sprite.prototype);Sprite_Weather.prototype.constructor=Sprite_Weather;Sprite_Weather.prototype.initialize=function(){Sprite.prototype.initialize.call(this);this._type='none'
this._lifetime=0;this._size=0;this._anglev=0;this._alpha=0;this._snowSpeed=0;this.setUpDone=!1};Sprite_Weather.prototype.update=function(){if(this.setUpDone===!0){if(this._lifetime>0){if(this._type==='snow'){this.opacity=Math.min(this.opacity+24,this._alpha);this.scale.x=this._size;this.scale.y=this._size}else if(this._type==='shine'){this.opacity=Math.min(this.opacity+48,this._alpha);this.scale.x+=0.09;this.scale.y+=0.09}else if(this._type==='embers'){this.opacity=Math.min(this.opacity+32,this._alpha);var newTone=this.getColorTone();newTone[0]*=0.98;newTone[1]*=0.95;this.setColorTone(newTone);this.scale.x=this._size;this.scale.y=this._size}else{this.opacity=Math.min(this.opacity+72,this._alpha);this.scale.x=this._size;this.scale.y=this._size}
this._lifetime-=1;this._randomSeed-=1}else{if(this._type==='snow'){this.opacity-=16}else if(this._type==='shine'){this.opacity-=15;this.scale.x-=0.09;this.scale.y-=0.09}else if(this._type==='leaves'||this._type==='embers'){this.scale.x-=0.01;this.scale.y-=0.01;this.opacity-=8}else{this.opacity-=48}}}};Sprite_Weather.prototype.setUp=function(type,life,size,getangle,alpha,snowSpeed=0){this._type=type;this._lifetime=life+Math.randomInt(life*0.25);this._size=size;this._anglev=getangle;this._alpha=alpha;this._snowSpeed=snowSpeed;this._randomSeed=Math.randomInt(16777216);if(this._type==='shine'){this.scale.x=0;this.scale.y=0;this.anchor=new Point(0.5,0.5);this.blendMode=PIXI.BLEND_MODES.ADD;this.setColorTone([Math.randomInt(2)*-255,Math.randomInt(2)*-255,Math.randomInt(2)*-255,0])}else if(this._type==='leaves'){this.scale.x=1;this.scale.y=1;this.anchor=new Point(0.5,0.5);this.blendMode=PIXI.BLEND_MODES.NORMAL;this.setColorTone([0,0,0,0])}else if(this._type==='embers'){this.scale.x=1;this.scale.y=1;this.anchor=new Point(0.5,0.5);this.blendMode=PIXI.BLEND_MODES.NORMAL;this.setColorTone([255,200,0,0])}else{this.scale.x=1;this.scale.y=1;this.anchor=new Point(0,0);this.blendMode=PIXI.BLEND_MODES.NORMAL;this.setColorTone([0,0,0,0])}
this.setUpDone=!0};Sprite_Weather.prototype.getVelocity=function(speed){var speedX=speed*Math.cos(this._anglev*(Math.PI/180));var speedY=-1*speed*Math.sin(this._anglev*(Math.PI/180));return[speedY,speedX]};if(Aries.P001_ASE!==undefined){var _aries_p003_spritesetBase_createScreenEffectFilters=Spriteset_Base.prototype.createScreenEffectFilters;Spriteset_Base.prototype.createScreenEffectFilters=function(){_aries_p003_spritesetBase_createScreenEffectFilters.call(this);this._wct_glow_filter=new PIXI.filters.AdvancedBloomFilter();this._wct_glow_filter.enabled=!1;this._wct_glow_filter.brightness=0.5;this._wct_glow_filter.bloomScale=0.667;this._wct_glow_filter.blur=0;this._wct_glow_filter.threshold=0.05;this._filters.push(this._wct_glow_filter)};var _aries_p003_spritesetBase_updateScreenEffects=Spriteset_Base.prototype.updateScreenEffects;Spriteset_Base.prototype.updateScreenEffects=function(){_aries_p003_spritesetBase_updateScreenEffects.call(this);if(this._wct_glow_filter){switch($gameScreen.weatherType()){case 'rain':this._wct_glow_filter.enabled=!0;this._wct_glow_filter.bloomScale=0.035*$gameScreen.weatherPower();this._wct_glow_filter.brightness=1-(0.025*$gameScreen.weatherPower());this._wct_glow_filter.blur=0.1*$gameScreen.weatherPower();this._wct_glow_filter.threshold=0.075;this._wct_heat_filter.enabled=!1;break;case 'storm':this._wct_glow_filter.enabled=!0;this._wct_glow_filter.bloomScale=0.05*$gameScreen.weatherPower();this._wct_glow_filter.brightness=1-(0.06*$gameScreen.weatherPower());this._wct_glow_filter.blur=0.2*$gameScreen.weatherPower();this._wct_glow_filter.threshold=0.075;this._wct_heat_filter.enabled=!1;break;case 'snow':this._wct_glow_filter.enabled=!0;this._wct_glow_filter.bloomScale=0.1+(0.005*$gameScreen.weatherPower());this._wct_glow_filter.brightness=1+(0.001*$gameScreen.weatherPower());this._wct_glow_filter.blur=0.5+(0.1*$gameScreen.weatherPower());this._wct_glow_filter.threshold=0.667;this._wct_heat_filter.enabled=!1;break;case 'embers':this._wct_glow_filter.enabled=!0;this._wct_glow_filter.bloomScale=0.2+(0.015*$gameScreen.weatherPower());+0.2*(1+Math.sin(0.03*Graphics.frameCount));this._wct_glow_filter.brightness=1;this._wct_glow_filter.blur=6+(0.1*$gameScreen.weatherPower());this._wct_glow_filter.threshold=0.75;break;default:this._wct_glow_filter.enabled=!1;this._wct_glow_filter.bloomScale=1;this._wct_glow_filter.brightness=1;this._wct_glow_filter.blur=0;this._wct_glow_filter.threshold=1;break}}}}