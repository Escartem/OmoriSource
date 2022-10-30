//=============================================================================
//  ExtraMovementFrames.js
//=============================================================================
//  Version: 1.0.3
//  Date: 10 November 2015
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/*:
 * @author Modern Algebra (rmrk.net)
 * @plugindesc Set sprites with more than 3 frames of animation
 * 
 * @param Cycle Time
 * @desc The normal number of frames to complete animation cycle for custom sprites
 * @default 60
 * 
 * @param Default Idle Frame
 * @desc The idle frame for custom sprites unless changed in the filename
 * @default 0
 * 
 * @param Default Pattern
 * @desc Set patterns for custom sprites unless changed in the filename.
 * @default []
 * 
 * @help INSTRUCTIONS:
 * 
 * To create sprites that have more than 3 frames of animation, you need
 * to rename the character graphic to something of the form:
 *
 *      RegularName%(x)
 *          x : the number of frames in each character sprite
 * 
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * EXAMPLES:
 * 
 *     $001-Fighter01%(4)
 *         // This graphic is a single character with four frames of animation.
 * 
 *     022-Actors12%(6)
 *         // This graphic would be interpreted as a character sheet of 8 
 *         // characters each having six frames of animation.
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * 
 * Additionally, this script also allows you to specify the "idle" frame (the 
 * frame where the sprite is not moving), and also the pattern if you wish to so
 * specify. In essence, all you need to do is add those integers after the
 * number of frames:
 * 
 *     Regular_Name%(x y z1 z2 ... zn)
 *         x : the number of frames in each character sprite
 *         y : the idle frame (the frame shown when sprite is not moving)
 *         z1 ... zn : the pattern.
 * 
 * If you choose to specify a pattern, then the idle frame is not automatically 
 * included in the pattern and should be repeated if you want it to appear
 * 
 * When naming your files, be aware that the first frame in a sprite is index 0, 
 * the second frame is index 1, etc.
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * EXAMPLES:
 * 
 *     $003-Fighter03%(4 2)
 *         // This graphic is a single character with four frames of animation. 
 *         // The idle frame is 2 (the third one over). The pattern when moving 
 *         // would be 2 3 0 1, 2 3 0 1, etc. (unless default patterns set - 
 *         // see below)
 * 
 *     032-People05%(4 0 1 0 3 2)
 *         // This graphic would be interpreted as a character sheet of 8 
 *         // characters, each having four frames of animation. The idle frame is 
 *         // 0 (the first in the sheet), and the pattern is 1 0 3 2, 
 *         // 1 0 3 2, etc.
 * 
 *     $003-Fighter03%(6 0 1 2 3 4 5)
 *         // This graphic is a single character with six frames of animation. 
 *         // The idle frame is 0 (the first frame). The pattern when moving 
 *         // is 1 2 3 4 5, 1 2 3 4 5, etc. 
 * ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * PLUGIN SETTINGS:
 * 
 *     Cycle Time = 60
 * 
 * Cycle Time is the number of frames it will take to complete a full 
 * animation cycle for custom sprites at normal speed. It must be set to an
 * integer.
 * 
 * 
 *     Default Idle Frame = 0
 * 
 * If you do not specify an idle frame for custom sprites in the file name, then it
 * will be this frame. You must set this to an integer.
 * 
 *     Default Pattern = []
 * 
 * If you do not specify a pattern, then what happens depends on what you write 
 * in the plugin setting for "Default Pattern". For this setting, you have the 
 * option of writing in arrays of numbers in the following format:
 * 
 *     [x y z1 z2 ... zn]
 *         x : number of frames in the sprites for which this pattern is default
 *         y : idle frame
 *         z1 z2 ... zn : the pattern
 * 
 * If you have setup one of those arrays for the number of frames which this
 * custom sprite has, then it will use that pattern and idle frame.
 * 
 * If you have not set up a default pattern for this number of frames, then the 
 * animation will simply cycle through the number of frames, starting with the 
 * idle frame and moving right. The idle frame will be included in the animation.
 *
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * EXAMPLES
 * 
 *     Default Pattern = [5 1 2 3 4 3 2]
 *         // Whenever you set up a custom sprite that has 5 frames of animation
 *         // but do not specify a pattern, the idle frame will be 1 and the
 *         // pattern will be 2 3 4 3 2, 2 3 4 3 2, etc.
 * 
 *     Default Pattern = [5 1 2 3 4 3 2], [6 0 1 2 5 4 3 0]
 *         // Whenever you set up a custom sprite that has 5 frames of animation
 *         // but do not specify a pattern, the idle frame will be 1 and the
 *         // pattern will be 2 3 4 3 2, 2 3 4 3 2, etc.
 *         // Whenever you set up a custom sprite that has 6 frames of animation
 *         // but do not specify a pattern, the idle frame will be 0 and the 
 *         // pattern will be 1 2 5 4 3 0, 1 2 5 4 3 0, etc.
 */
//=============================================================================

var Imported = Imported || {};
Imported.MA_ExtraMovementFrames = true;

var ModernAlgebra = ModernAlgebra || {};
ModernAlgebra.EMF = {};

(function() {
	
	// Get Script Name, in case user unexpectedly altered it
	//var path = document.currentScript.src;
	//var scriptName = path.substring(path.lastIndexOf('/')+1).match(/^(.+?)(\.[^.]*$|$)/)[1];
	
	// Set Parameters
  	ModernAlgebra.EMF.parameters = PluginManager.parameters("ExtraMovementFrames");
	ModernAlgebra.EMF.cycleTime = (+ModernAlgebra.EMF.parameters['Cycle Time']) || 60; // Default = 60
	ModernAlgebra.EMF.idleFrame = (+ModernAlgebra.EMF.parameters['Default Idle Frame']) || 0; // Default = 0
	ModernAlgebra.EMF.defaultPattern = [];
	
	var emfPattMatch = ModernAlgebra.EMF.parameters['Default Pattern'].match(/\[.+?\]/g); // Default []
	if (emfPattMatch) {
		// Get all arrays of numbers
		for (var i = 0; i < emfPattMatch.length; i++) {
			digitMatch = emfPattMatch[i].match(/\d+/g);
			if (digitMatch) { ModernAlgebra.EMF.defaultPattern.push(digitMatch.map(Number)); }
		}
	}
	
	//=========================================================================
	// ImageManager
	//=========================================================================
	// isEmfCharacter - Checks if filename is a customly animated sprite
	ImageManager.isEmfCharacter = function(filename) {
		return !!filename.match(/\%[\(\[][\d\s]+[\)\]]/); // check filename for %() or %[]
	};
	
	//=========================================================================
	// Game_CharacterBase
	//=========================================================================
	// initMembers 
	ModernAlgebra.EMF.GameCharacterBase_initMembers =
			Game_CharacterBase.prototype.initMembers;
	Game_CharacterBase.prototype.initMembers = function() {
		this.maClearEmfCharacterState();
		ModernAlgebra.EMF.GameCharacterBase_initMembers.apply(this, arguments); // original method
	};
	
	// maClearEmfCharacterState
	Game_CharacterBase.prototype.maClearEmfCharacterState = function() {
		this._isEmfCharacter = false;
		this._emfCharacterState = { frameNum: 3, idleFrame: ModernAlgebra.EMF.idleFrame, pattern: [2, 1, 0, 1] };
	};
	
	// isEmfCharacter - Check whether a customly animated sprites
	Game_CharacterBase.prototype.isEmfCharacter = function() {
		return this._isEmfCharacter;
	};
	
	// emfCharacterState - makes this._emfCharacterState public
	Game_CharacterBase.prototype.emfCharacterState = function() {
		return this._emfCharacterState;
	};
	
	// setImage - adjusts to call EMF setup method
	ModernAlgebra.EMF.GameCharacterBase_setImage =
			Game_CharacterBase.prototype.setImage;
	Game_CharacterBase.prototype.setImage = function(characterName, characterIndex) {
		const [oldCharName, oldCharIndex] = [this.characterName(), this.characterIndex()]
		ModernAlgebra.EMF.GameCharacterBase_setImage.apply(this, arguments); // original method
		this.maemfSetupEmfCharacter();
		if(oldCharName !== characterName) {this.resetPattern();}
		if(oldCharName === characterName && oldCharIndex !== characterIndex) {this.resetPattern();}
	};
	
	// maSetupEmfCharacter - setup custom animation sprite
	Game_CharacterBase.prototype.maemfSetupEmfCharacter = function() {
		this.maClearEmfCharacterState();
		var charName = this.characterName();
		if (ImageManager.isEmfCharacter(charName)) {
			var sign = charName.match(/(?:\%[\(\[])[\d\s]+(?:[\)\]])/);
			var signArgs = sign[0].match(/\d+/g); // array of digit strings
			if (signArgs) {
				this._isEmfCharacter = true;
				// Map arguments in file name to an array of numbers
				signArgs = signArgs.map(Number);
				signArgsLength = signArgs.length;
				this.emfCharacterState().frameNum = signArgs.shift();
				this.emfCharacterState().idleFrame = (signArgsLength > 1) ? signArgs.shift() : ModernAlgebra.EMF.idleFrame;
				if (signArgsLength > 2) {
					this.emfCharacterState().pattern = signArgs;
				} else {
					var success = false;
					// Check for a default match for this number of frames
					for (var i = 0; i < ModernAlgebra.EMF.defaultPattern.length; i++) {
						if (ModernAlgebra.EMF.defaultPattern[i][0] === this.emfCharacterState().frameNum) {
							this.emfCharacterState().idleFrame = ModernAlgebra.EMF.defaultPattern[i][1];
							this.emfCharacterState().pattern = ModernAlgebra.EMF.defaultPattern[i].slice(2, (ModernAlgebra.EMF.defaultPattern[i].length));
							success = true;
							break;
						}
					}
					// If still no pattern specified
					if (!success) {
						// Populate pattern with a simple cycle starting after idle
						this.emfCharacterState().pattern = [];
						var idleFramePlus = this.emfCharacterState().idleFrame + 1;
						for (var i = 0; i < this.emfCharacterState().frameNum; i++) {
							this.emfCharacterState().pattern.push((i + idleFramePlus) % this.emfCharacterState().frameNum);
						}
					}
				}
			}
		}
	};
	
	// animationWait
	ModernAlgebra.EMF.GameCharacterBase_animationWait = 
			Game_CharacterBase.prototype.animationWait;
	Game_CharacterBase.prototype.animationWait = function() {
		// If EMF Character
		if (this.isEmfCharacter()) {
			var realSpeed = this.realMoveSpeed();
			var frameNum = this.maxPattern();
			return Math.floor((8 - realSpeed)*(ModernAlgebra.EMF.cycleTime / (4*frameNum))); // CycleTime divided by number of frames in animation
		} else { 
			// Run Default Method - approx. 60 frames at normal speed
			return ModernAlgebra.EMF.GameCharacterBase_animationWait.apply(this, arguments) // original method 
		}
	};
	
	// maxPattern 
	ModernAlgebra.EMF.GameCharacterBase_maxPattern =
				Game_CharacterBase.prototype.maxPattern;
	Game_CharacterBase.prototype.maxPattern = function() {
		if (this.isEmfCharacter()) {
			return this.emfCharacterState().pattern.length; // Length of pattern array
		} else {
			return ModernAlgebra.EMF.GameCharacterBase_maxPattern.apply(this, arguments); // original method
		} 
	};
	
	// pattern
	ModernAlgebra.EMF.GameCharacterBase_pattern = 
			Game_CharacterBase.prototype.pattern;
	Game_CharacterBase.prototype.pattern = function() {
		if (this.isEmfCharacter()) {
			if (this._pattern < 0) {
				return this.emfCharacterState().idleFrame; // Idle Frame if _pattern < 0
			} else {
				var patternIndex = (this._pattern % this.emfCharacterState().pattern.length);
				return this.emfCharacterState().pattern[patternIndex]; // index of pattern array
			}
		} else {
			return ModernAlgebra.EMF.GameCharacterBase_pattern.apply(this, arguments); // original method
		}
	};
	
	// isOriginalPattern - Original pattern is -1 for custom sprites
	ModernAlgebra.EMF.GameCharacterBase_isOriginalpattern = 
			Game_CharacterBase.prototype.isOriginalPattern;
	Game_CharacterBase.prototype.isOriginalPattern = function() {
		if (this.isEmfCharacter()) {
			return this.pattern() === -1;
		} else {
			return ModernAlgebra.EMF.GameCharacterBase_isOriginalpattern.apply(this, arguments); // original method
		} 
	};
	
	// straighten - Straighten to original pattern
	ModernAlgebra.EMF.GameCharacterBase_straighten =
			Game_CharacterBase.prototype.straighten;
	Game_CharacterBase.prototype.straighten = function() {
		if (this.isEmfCharacter()) {
			if (this.hasWalkAnime() || this.hasStepAnime()) {
				this._pattern = -1;
			}
			this._animationCount = 0;
		} else {
			ModernAlgebra.EMF.GameCharacterBase_straighten.apply(this, arguments)
		}
	};
		
	// resetPattern - Idle is -1 for custom sprites
	ModernAlgebra.EMF.GameCharacterBase_resetPattern = 
			Game_CharacterBase.prototype.resetPattern;
	Game_CharacterBase.prototype.resetPattern = function() {
		if (this.isEmfCharacter()) {
			this.setPattern(-1);
		} else {
			ModernAlgebra.EMF.GameCharacterBase_resetPattern.apply(this, arguments); // original method
		} 
	};
	
	//=========================================================================
	// Game_Event
	//=========================================================================
	// setupPageSettings - adjust original pattern
	ModernAlgebra.EMF.GameEvent_setupPageSettings = 
			Game_Event.prototype.setupPageSettings;
	Game_Event.prototype.setupPageSettings = function() {
		ModernAlgebra.EMF.GameEvent_setupPageSettings.apply(this, arguments);
		// Original pattern is always idle for custom sprites
		if (this.isEmfCharacter()) { this._originalPattern = -1; }
		this.resetPattern();
	};
		
	//=========================================================================
	// Sprite_Character
	//=========================================================================
	// patternWidth - afjust based on number of frames
	ModernAlgebra.EMF.SpriteCharacter_patternWidth =
			Sprite_Character.prototype.patternWidth;
	Sprite_Character.prototype.patternWidth = function() {
		var pw = ModernAlgebra.EMF.SpriteCharacter_patternWidth.apply(this, arguments)
		if (this._character.isEmfCharacter()) {
			var frameNum = this._character.emfCharacterState().frameNum;
			return ((pw*3) / frameNum);
		} else {
			return pw;
		}
	};
	
})();