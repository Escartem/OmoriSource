//=============================================================================
// Yanfly Engine Plugins - Message Core Extension - Extended Message Pack 1
// YEP_X_ExtMesPack1.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_ExtMesPack1 = true;

var Yanfly = Yanfly || {};
Yanfly.EMP1 = Yanfly.EMP1 || {};
Yanfly.EMP1.version = 1.11;

//=============================================================================
 /*:
 * @plugindesc v1.12 (Requires YEP_MessageCore.js) Letter Sounds, NameBox
 * Background Types, Choice Control, and more!
 * @author Yanfly Engine Plugins
 *
 * @param ---Letter Sounds---
 * @default
 *
 * @param Enable Sound
 * @parent ---Letter Sounds---
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable letter by letter sounds by default?
 * NO - false     YES - true
 * @default true
 *
 * @param Sound Name
 * @parent ---Letter Sounds---
 * @type file
 * @dir audio/se/
 * @require 1
 * @desc The filename of the SE file. This is case sensitive.
 * Do not include file extension.
 * @default Cursor1
 *
 * @param Sound Volume
 * @parent ---Letter Sounds---
 * @type number
 * @min 0
 * @desc The sound volume of the sound effect.
 * @default 50
 *
 * @param Sound Pitch
 * @parent ---Letter Sounds---
 * @desc The pitch of the sound effect.
 * @default 100
 *
 * @param Pitch Variance
 * @parent ---Letter Sounds---
 * @desc The amount of pitch variance the sound will have.
 * @default 10
 *
 * @param Sound Pan
 * @parent ---Letter Sounds---
 * @desc The pan of the sound effect.
 * @default 0
 *
 * @param Pan Variance
 * @parent ---Letter Sounds---
 * @type number
 * @min 0
 * @desc The amount of pan variance the sound will have.
 * @default 10
 *
 * @param Sound Interval
 * @parent ---Letter Sounds---
 * @type number
 * @min 0
 * @desc How many letters should be skipped in between sounds?
 * @default 2
 *
 * @param Reset Sounds
 * @parent ---Letter Sounds---
 * @type boolean
 * @on Reset
 * @off Don't Reset
 * @desc Reset the letter sound at the start of each message?
 * NO - false     YES - true
 * @default false
 *
 * @param ---Message Anchor---
 * @default
 *
 * @param Default X
 * @parent ---Message Anchor---
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc When using the Message Position X mods, anchor X to
 * left     center     right
 * @default center
 *
 * @param Default Y
 * @parent ---Message Anchor---
 * @type combo
 * @option top
 * @option center
 * @option bottom
 * @desc When using the Message Position Y mods, anchor Y to
 * top     center     bottom
 * @default bottom
 *
 * @param Auto Row Full Face
 * @parent ---Message Anchor---
 * @type boolean
 * @on Show
 * @off Hide
 * @desc If using auto rows, show the full face art?
 * NO - false     YES - true
 * @default false
 *
 * @param ---Message Choices---
 * @default
 *
 * @param Max Rows
 * @parent ---Message Choices---
 * @type number
 * @min 1
 * @desc The maximum amount of rows to display for your choices.
 * Default: 6
 * @default 6
 *
 * @param Choice 1 Show Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is visible to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @param Choice 2 Show Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is visible to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @param Choice 3 Show Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is visible to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @param Choice 4 Show Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is visible to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @param Choice 5 Show Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is visible to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @param Choice 6 Show Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is visible to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @param Choice 7 Show Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is visible to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @param Choice 8 Show Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is visible to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @param Choice 9 Show Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is visible to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @param Choice 10 Show Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is visible to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @param Choice 11 Show Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is visible to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @param Choice 12 Show Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is visible to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @param Choice 13 Show Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is visible to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @param Choice 14 Show Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is visible to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @param Choice 15 Show Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is visible to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @param Choice 16 Show Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is visible to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @param Choice 17 Show Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is visible to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @param Choice 18 Show Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is visible to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @param Choice 19 Show Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is visible to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @param Choice 20 Show Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is visible to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @param Choice 1 On Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is enabled to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @param Choice 2 On Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is enabled to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @param Choice 3 On Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is enabled to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @param Choice 4 On Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is enabled to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @param Choice 5 On Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is enabled to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @param Choice 6 On Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is enabled to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @param Choice 7 On Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is enabled to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @param Choice 8 On Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is enabled to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @param Choice 9 On Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is enabled to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @param Choice 10 On Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is enabled to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @param Choice 11 On Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is enabled to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @param Choice 12 On Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is enabled to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @param Choice 13 On Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is enabled to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @param Choice 14 On Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is enabled to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @param Choice 15 On Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is enabled to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @param Choice 16 On Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is enabled to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @param Choice 17 On Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is enabled to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @param Choice 18 On Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is enabled to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @param Choice 19 On Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is enabled to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @param Choice 20 On Switch
 * @parent ---Message Choices---
 * @type switch
 * @desc You can tie whether or not a choice is enabled to a switch.
 * Use the switch ID you wish for this choice. 0 to not use.
 * @default 0
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires YEP_MessageCore.js to run.
 * Place this plugin under YEP_MessageCore.js in the plugin list.
 *
 * This plugin extends the amount of things the Message system can do in RPG
 * Maker MV. These features range from text sounds, more name window options,
 * face index control, hex colors, extended choice controls, and more precise
 * window positioning control. New text codes are also added to further ease
 * the usage of the message window.
 *
 * ============================================================================
 * Text Codes
 * ============================================================================
 *
 * By using certain text codes in your messages, you can have the game replace
 * them with the following:
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  LetterSound    Effect:
 *  \lson          - Turns Letter Sounds on.
 *  \lsoff         - Turns Letter Sounds off.
 *  \lsn<filename> - Changes Letter Sound to play filename. This is case
 *                 sensitive. Do not include the file extension.
 *  \lsv[x]        - Sets the volume of the Letter Sound to x.
 *  \lspi[x]       - Sets the pitch of the Letter Sound to x.
 *  \lspiv[x]      - Sets the pitch variance of the Letter Sound to x.
 *  \lspa[x]       - Sets the pan of the Letter Sound to x.
 *  \lspav[x]      - Sets the pan variance of the Letter Sound to x.
 *  \lsi[x]        - Sets the interval the Letter Sounds play to x.
 *
 *  *Note: Works for message window only.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  Enemy Name     Effect:
 *  \en[x]         - Gets the name of the enemy in Database position x.
 *  \et[x]         - Gets the name of the enemy in Troop position x.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  NameWindow: Effect:
 *  \n<x>       - Creates a name box with x string. Left side.
 *  \nc<x>      - Creates a name box with x string. Centered.
 *  \nr<x>      - Creates a name box with x string. Right side.
 *
 *  \nd<x>      - Creates a dimmed name box with x string. Left side.
 *  \ndc<x>     - Creates a dimmed name box with x string. Centered.
 *  \ndr<x>     - Creates a dimmed name box with x string. Right side.
 *
 *  \nt<x>      - Creates a transparent name box with x string. Left side.
 *  \ntc<x>     - Creates a transparent name box with x string. Centered.
 *  \ntr<x>     - Creates a transparent name box with x string. Right side.
 *
 *  *Note: Works for message window only.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * 
 *  MessagePosition  Effect:
 *  \msgposx[x]      - Sets the X position of the Message Window to x.
 *  \msgposx[auto]   - Sets the X position of the Message Window to default.
 *
 *  \msgposy[x]      - Sets the Y position of the Message Window to x.
 *  \msgposy[auto]   - Sets the Y position of the Message Window to default.
 *
 *  \msgevent[x]     - Map Field Only! Positions the X and Y position of the
 *                   Message Window relative to the event x's position. If you
 *                   use 0, the window will be placed relative to the player's
 *                   position on the map.
 *
 *  \msgactor[x]     - Requires Battle Engine Core. Battle Only! Puts the
 *                   message over actor x's head if actor is in the party.
 *                   Otherwise, the message will appear in normal location.
 *
 *  \msgparty[x]     - Requires Battle Engine Core. Battle Only! Puts the
 *                   message over party member x's head if member is present.
 *                   Otherwise, the message will appear in normal location.
 *
 *  \msgenemy[x]     - Requires Battle Engine Core. Battle Only! Puts the
 *                   message over enemy member x's head if member is present.
 *                   Otherwise, the message will appear in normal location.
 *
 *  \msgwidth[x]     - Sets the width of the Message Window to x.
 *  \msgwidth[auto]  - Sets the width of the Message Window to fit the text.
 *                   Do not use the auto function with Word Wrap.
 *
 *  \msgrows[x]      - Sets the rows of the Message Window to x.
 *  \msgrows[auto]   - Sets the rows of the Message Window to text.
 *                   Do not use the auto function with Word Wrap.
 *
 *  \auto            - Sets the width and rows of the Message window to fit the
 *                   current message window. Do not use this with Word Wrap.
 *
 *  \autoevent[x]    - Map Field Only! Sets the width and rows of the Message
 *                   window to fit the current message window and positions it
 *                   relative to event x. If you use 0, the window will be
 *                   placed relative to the player's position on the map. Do
 *                   not use this with Word Wrap.
 *
 *  \autoactor[x]    - Requires Battle Engine Core. Battle Only! Sets the width
 *                   and rows of the message window to fit the current message
 *                   window and puts the message over actor x's head if actor
 *                   is in the party. Otherwise, the message will appear in
 *                   normal location. Do not use this with Word Wrap.
 *
 *  \autoparty[x]    - Requires Battle Engine Core. Battle Only! Sets the width
 *                   and rows of the message window to fit the current message
 *                   window and puts the message over party member x's head if
 *                   member is present. Otherwise, the message will appear in
 *                   normal location. Do not use this with Word Wrap.
 *
 *  \autoenemy[x]    - Requires Battle Engine Core. Battle Only! Sets the width
 *                   and rows of the message window to fit the current message
 *                   window and puts the message over enemy member x's head if
 *                   member is present. Otherwise, the message will appear in
 *                   normal location. Do not use this with Word Wrap.
 *
 *  \msgreset        - Resets all of the positioning settings to default.
 *
 *  * Note: This setting change will remain for just the current message. Going
 *  to the next message will reset this setting back to whatever the default
 *  setting is in the plugin parameters for the Message Core. If you change the
 *  amount of rows past 4, it will not acquire the messages following. You will
 *  need to use the 'MessageRows x' plugin command to accomplish that. These
 *  notetags work for the message window only.
 *
 *  Do not use the [auto] width and row functions with Word Wrap. Word wrap
 *  will cause them to behave erratically.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  FaceIndex       Effect:
 *  \faceindex[x]   - Changes the face index of the currently used face
 *                  graphic to index x at the start of the message.
 *
 *  *Note: Works for message window only.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  DigitGroup   Effect:
 *  \dg[x]       - Groups the number value x with commas. 12345 becomes 12,345.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  HexColor     Effect:
 *  \hc[rrggbb]  - Changes the text color to a hex color code using red, green,
 *               blue format. For example, pure red is \hc[ff0000].
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  PlayTime     Effect:
 *  \playtime    - Displays the current playtime of the player.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 *  MapName      Effect:
 *  \map[x]      - Displays the map name of Map ID x. If x is 0, it will
 *               display the name of the map the player is currently on.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * You can use the following plugin commands to adjust a few of the settings
 * regarding the Message Window.
 *
 * Plugin Commands
 *
 *   --- Letter Sounds ---
 *
 *   EnableLetterSound
 *   DisableLetterSound
 *   - These commands will enable or disable the letter sounds respectively.
 *
 *   LetterSoundName Cursor2
 *   - This will replace the current letter sound with the written filename.
 *   The filename is case sensitive. Do not use the file extension.
 *
 *   LetterSoundVolume 100
 *   - This will change the letter sound volume to 100.
 *
 *   LetterSoundPitch 125
 *   - This will change the letter sound pitch to 125.
 *
 *   LetterSoundPitchVariance 10
 *   - This will cause the letter sound's pitch to fluctuate between -10 & 10.
 *
 *   LetterSoundPan 0
 *   - This will change the letter sound's pan to 0.
 *
 *   LetterSoundPanVariance 10
 *   - This will cause the letter sound's pan to fluctuate between -10 and 10.
 *
 *   LetterSoundInterval 2
 *   - This will change the interval at which the letter sounds are played to
 *   2 letters. Change it to 0 to play on every letter written out.
 *
 *   LetterSoundReset
 *   - This will reset the letter sounds to their default settings.
 *
 *   --- Choice Settings ---
 *
 *   ChoiceRowMax 4
 *   - This will set the maximum amount of visible choices to 4.
 *
 *   HideChoice 5
 *   - This will cause choice 5 to be hidden.
 *
 *   ShowChoice 6
 *   - This will cause choice 6 to be shown and no longer hidden.
 *
 *   ClearHiddenChoices
 *   - All choices become visible and are no longer hidden.
 *
 *   DisableChoice 1
 *   - This will cause choice 1 to be disabled.
 *
 *   EnableChoice 2
 *   - This will cause choice 2 to be enabled.
 *
 *   ClearDisabledChoices
 *   - All choices become enabled and are no longer disabled.
 *
 *   ClearChoiceSettings
 *   - All choices are shown and enabled.
 *
 *   --- Message Window Positions ---
 *
 *   MessageRows 6
 *   - Changes the Message Rows displayed to 6. If you are using continuous
 *   Show Text events, this will continue displaying the following lines's
 *   texts until it hits the row limit. Anything after that is cut off until
 *   the next message starts to avoid accidental overlap.
 *
 *   MessageWidth 400
 *   - Changes the Message Window Width to 400 pixels. This will cut off any
 *   words that are shown too far to the right so adjust accordingly!
 *
 *   MessagePositionX 300
 *   - Sets the Message Window's X Position to 300. This position will be
 *   relative to its horizontal anchor point.
 *
 *   MessagePositionY 400
 *   - Sets the Message Window's Y Position to 400. This position will be
 *   relative to its vertical anchor point.
 *
 *   MessagePositionXAuto
 *   - Sets the Message Window's X Position to be automatically fitted and not
 *   set relative to its horizontal anchor point.
 *
 *   MessagePositionYAuto
 *   - Sets the Message Window's Y Position to be automatically fitted and not
 *   set relative to its vertical anchor point.
 *
 *   MessageAnchorX left
 *   - Sets the Message Window's x anchor to 'left', 'center', or 'right' if
 *   you are using specified coordinates.
 *
 *   MessageAnchorY bottom
 *   - Sets the Message Window's y anchor to 'top', 'center', or 'bottom' if
 *   you are using specified coordinates.
 *
 *   MessagePositionReset
 *   - Resets both the Message Window's X and Y Positions to its automatic
 *   positions and not adjusted to its anchor points. The Message Width and the
 *   Message Rows.
 *
 * ============================================================================
 * Lunatic Mode - New JavaScript Functions
 * ============================================================================
 *
 * For those who would like to use script calls to alter Choice Settings, you
 * can use the following script calls:
 *
 * $gameSystem.hideChoice(x)
 * - This will cause choice x to be hidden.
 *
 * $gameSystem.showChoice(x)
 * - This will cause choice x to be shown.
 *
 * $gameSystem.clearHiddenChoices()
 * - This will clear all of the hidden choices and they will be shown.
 *
 * $gameSystem.disableChoice(x)
 * - This will cause choice x to be disabled.
 *
 * $gameSystem.enableChoice(x)
 * - This will cause choice x to be enabled.
 *
 * $gameSystem.clearDisabledChoices()
 * - This will clear all of the disabled choices and they will all be enabled.
 *
 * $gameSystem.clearChoiceSettings()
 * - This will clear all hidden and disabled settings.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.12:
 * - Updated message choices to properly show the correct number of rows if an
 * inadequate number of rows are visible.
 *
 * Version 1.11:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.10a:
 * - Fixed a bug that made auto-messages to not position themselves properly on
 * events that are using tiles for their images.
 * - Documentation update to fix documentation errors.
 *
 * Version 1.09:
 * - Fixed a bug with the pitch and pan variance doubling its value.
 *
 * Version 1.08:
 * - Fixed a bug that caused choices from 20 and onward to be hidden/disabled.
 *
 * Version 1.07:
 * - Plugin commands for hiding, showing, enabling, and disabling choices will
 * now synch with the appropriate switch if there is a switch involved.
 *
 * Version 1.06:
 * - Fixed a width issue with namebox windows used for clear and dimmed
 * nameboxes.
 *
 * Version 1.05:
 * - Added new plugin commands: HideChoice x, ShowChoice x, ClearHiddenChoices,
 * DisableChoice x, EnableChoice x, ClearDisabledChoices, ClearChoiceSettings
 * for those who wish to have more than 20 choices.
 * - Added new script calls. You can find them in the Lunatic Mode section
 * under Lunatic Mode - New JavaScript Functions. These are for people who want
 * to use more than 20 choices.
 *
 * Version 1.04a:
 * - Updated the Autosizing feature to work with \{ and \} text codes. Requires
 * v1.10 of Message Core.
 * - Fixed a bug that caused \msgRows[auto] to crash.
 *
 * Version 1.03:
 * - Fixed a bug that caused \., \|, \w[x] to not stall the \auto notetags.
 * - Fixed a bug involving show/enable switches.
 *
 * Version 1.02:
 * - Added \en[x] and \et[x] text codes to display database enemy names and
 * troop position enemy names respectively.
 *
 * Version 1.01:
 * - Fixed a bug where using an \auto text code with a \! in the same message
 * would cause a pause with an empty message.
 * - When using \|, \., or \w[x], the Letter Sound intervals will reset to 0 to
 * keep the Letter Sound feeling more natural.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Imported.YEP_MessageCore) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_ExtMesPack1');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.EMP1LetterSound = eval(String(Yanfly.Parameters['Enable Sound']));
Yanfly.Param.EMP1SoundName = String(Yanfly.Parameters['Sound Name']);
Yanfly.Param.EMP1SoundVolume = Number(Yanfly.Parameters['Sound Volume']);
Yanfly.Param.EMP1SoundPitch = Number(Yanfly.Parameters['Sound Pitch']);
Yanfly.Param.EMP1PitchVar = Number(Yanfly.Parameters['Pitch Variance']);
Yanfly.Param.EMP1SoundPan = Number(Yanfly.Parameters['Sound Pan']);
Yanfly.Param.EMP1PanVar = Number(Yanfly.Parameters['Pan Variance']);
Yanfly.Param.EMP1SoundInterval = Number(Yanfly.Parameters['Sound Interval']);
Yanfly.Param.EMP1LetterReset = eval(String(Yanfly.Parameters['Reset Sounds']));

Yanfly.Param.EMP1DefaultX = String(Yanfly.Parameters['Default X']);
Yanfly.Param.EMP1DefaultY = String(Yanfly.Parameters['Default Y']);
Yanfly.Param.EMP1FullFace = 
  eval(String(Yanfly.Parameters['Auto Row Full Face']));

Yanfly.Param.EMP1MaxRows = Number(Yanfly.Parameters['Max Rows']);
Yanfly.Param.EMP1ChoiceShow = [];
Yanfly.Param.EMP1ChoiceOn = [];
for (Yanfly.i = 1; Yanfly.i < 21; Yanfly.i += 1) {
  Yanfly.sName = 'Choice ' + Yanfly.i + ' Show Switch';
  Yanfly.oName = 'Choice ' + Yanfly.i + ' On Switch';
  Yanfly.Param.EMP1ChoiceShow.push(Number(Yanfly.Parameters[Yanfly.sName]));
  Yanfly.Param.EMP1ChoiceOn.push(Number(Yanfly.Parameters[Yanfly.oName]));
};

//=============================================================================
// SoundManager
//=============================================================================

SoundManager.playMessageSound = function() {
    AudioManager.playSe($gameSystem.getMessageSound());
};

//=============================================================================
// Game_System
//=============================================================================

Yanfly.EMP1.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    Yanfly.EMP1.Game_System_initialize.call(this);
    this.initMessageSounds();
    this.initMessageChoiceRowsMax();
    this.initMessagePosition();
};

Game_System.prototype.initMessageSounds = function() {
    this._msgSoundEnable = Yanfly.Param.EMP1LetterSound;
    this._msgSoundName = Yanfly.Param.EMP1SoundName;
    this._msgSoundVol = Yanfly.Param.EMP1SoundVolume;
    this._msgSoundPitch = Yanfly.Param.EMP1SoundPitch;
    this._msgSoundPitchVar = Yanfly.Param.EMP1PitchVar;
    this._msgSoundPan = Yanfly.Param.EMP1SoundPan;
    this._msgSoundPanVar = Yanfly.Param.EMP1PanVar;
    this._msgSoundInterval = Yanfly.Param.EMP1SoundInterval;
};

Game_System.prototype.getMessageSound = function() {
    if (this._msgSoundName === undefined) this.initMessageSounds();
    var obj = {
      name: this._msgSoundName,
      volume: this._msgSoundVol,
      pitch: this._msgSoundPitch,
      pan: this._msgSoundPan
    }
    var max = this._msgSoundPitch + this._msgSoundPitchVar;
    var min = this._msgSoundPitch - this._msgSoundPitchVar;
    obj['pitch'] = Math.floor(Math.random() * ( max - min + 1) + min);
    var max = this._msgSoundPan + this._msgSoundPanVar;
    var min = this._msgSoundPan - this._msgSoundPanVar;
    obj['pan'] = Math.floor(Math.random() * ( max - min + 1) + min);
    return obj;
};

Game_System.prototype.isMessageSoundEnabled = function() {
    if (this._msgSoundEnable === undefined) this.initMessageSounds();
    return this._msgSoundEnable;
};

Game_System.prototype.messageSoundInterval = function() {
    if (this._msgSoundInterval === undefined) this.initMessageSounds();
    return this._msgSoundInterval;
};

Game_System.prototype.initMessageChoiceRowsMax = function() {
    this._msgChoiceMax = Yanfly.Param.EMP1MaxRows;
};

Game_System.prototype.getMessageChoiceRows = function() {
    if (this._msgChoiceMax === undefined) this.initMessageChoiceRowsMax();
    return Math.max(1, this._msgChoiceMax);
};

Game_System.prototype.initChoiceShow = function() {
    if (this._msgChoiceShowInitialized) return;
    this._hideChoices = [];
    var length = Yanfly.Param.EMP1ChoiceShow.length;
    for (var i = 0; i < length; ++i) {
      var switchId = Yanfly.Param.EMP1ChoiceShow[i];
      if (switchId <= 0) continue;
      $gameSwitches.setValue(switchId, true);
    }
    this._msgChoiceShowInitialized = true;
};

Game_System.prototype.initChoiceEnable = function() {
    if (this._msgChoiceEnableInitialized) return;
    this._disableChoices = [];
    var length = Yanfly.Param.EMP1ChoiceOn.length;
    for (var i = 0; i < length; ++i) {
      var switchId = Yanfly.Param.EMP1ChoiceOn[i];
      if (switchId <= 0) continue;
      $gameSwitches.setValue(switchId, true);
    }
    this._msgChoiceEnableInitialized = true;
};

Game_System.prototype.isChoiceShown = function(id) {
    if (this._hideChoices === undefined) this._hideChoices = [];
    if (this._hideChoices.contains(id)) return false;
    if (id >= 20) return true;
    if (Yanfly.Param.EMP1ChoiceShow[id] <= 0) return true;
    return $gameSwitches.value(Yanfly.Param.EMP1ChoiceShow[id]);
};

Game_System.prototype.hideChoice = function(id) {
    if (this._hideChoices === undefined) this._hideChoices = [];
    id -= 1;
    if (id < 0) return;
    if (this._hideChoices.contains(id)) return;
    this._hideChoices.push(id);
    var switchId = Yanfly.Param.EMP1ChoiceShow[id];
    if (switchId) $gameSwitches.setValue(switchId, false);
};

Game_System.prototype.showChoice = function(id) {
    if (this._hideChoices === undefined) this._hideChoices = [];
    id -= 1;
    if (id < 0) return;
    if (!this._hideChoices.contains(id)) return;
    var index = this._hideChoices.indexOf(id);
    this._hideChoices.splice(index, 1);
    var switchId = Yanfly.Param.EMP1ChoiceShow[id];
    if (switchId) $gameSwitches.setValue(switchId, true);
};

Game_System.prototype.isChoiceEnabled = function(id) {
    if (this._disableChoices === undefined) this._disableChoices = [];
    if (this._disableChoices.contains(id)) return false;
    if (id >= 20) return true;
    if (Yanfly.Param.EMP1ChoiceOn[id] <= 0) return true;
    return $gameSwitches.value(Yanfly.Param.EMP1ChoiceOn[id]);
};

Game_System.prototype.disableChoice = function(id) {
    if (this._disableChoices === undefined) this._disableChoices = [];
    id -= 1;
    if (id < 0) return;
    if (this._disableChoices.contains(id)) return;
    this._disableChoices.push(id);
    var switchId = Yanfly.Param.EMP1ChoiceOn[id];
    if (switchId) $gameSwitches.setValue(switchId, false);
};

Game_System.prototype.enableChoice = function(id) {
    if (this._disableChoices === undefined) this._disableChoices = [];
    id -= 1;
    if (id < 0) return;
    if (!this._disableChoices.contains(id)) return;
    var index = this._disableChoices.indexOf(id);
    this._disableChoices.splice(index, 1);
    var switchId = Yanfly.Param.EMP1ChoiceOn[id];
    if (switchId) $gameSwitches.setValue(switchId, true);
};

Game_System.prototype.clearHiddenChoices = function() {
    this._msgChoiceShowInitialized = false;
    this.initChoiceShow();
};

Game_System.prototype.clearDisabledChoices = function() {
    this._msgChoiceEnableInitialized = false;
    this.initChoiceEnable();
};

Game_System.prototype.clearChoiceSettings = function() {
    this.clearHiddenChoices();
    this.clearDisabledChoices();
};

Game_System.prototype.initMessagePosition = function() {
    this._msgWindowPositionX = 'auto';
    this._msgWindowPositionY = 'auto';
    if (Yanfly.Param.EMP1DefaultX.match(/center/i)) {
      this._msgWindowAnchorX = 0.5;
    } else if (Yanfly.Param.EMP1DefaultX.match(/right/i)) {
      this._msgWindowAnchorX = 1;
    } else {
      this._msgWindowAnchorX = 0;
    }
    if (Yanfly.Param.EMP1DefaultY.match(/center/i)) {
      this._msgWindowAnchorY = 0.5;
    } else if (Yanfly.Param.EMP1DefaultY.match(/bottom/i)) {
      this._msgWindowAnchorY = 1;
    } else {
      this._msgWindowAnchorY = 0;
    }
};

Game_System.prototype.getMessagePositionX = function() {
    if (this._msgWindowPositionX === undefined) this.initMessagePosition();
    return this._msgWindowPositionX;
};

Game_System.prototype.getMessagePositionY = function() {
    if (this._msgWindowPositionY === undefined) this.initMessagePosition();
    return this._msgWindowPositionY;
};

Game_System.prototype.getMessageAnchorX = function() {
    if (this._msgWindowAnchorX === undefined) this.initMessagePosition();
    return this._msgWindowAnchorX;
};

Game_System.prototype.getMessageAnchorY = function() {
    if (this._msgWindowAnchorY === undefined) this.initMessagePosition();
    return this._msgWindowAnchorY;
};

Game_System.prototype.setMessagePositionX = function(value) {
    if (this._msgWindowPositionX === undefined) this.initMessagePosition();
    this._msgWindowPositionX = value;
};

Game_System.prototype.setMessagePositionY = function(value) {
    if (this._msgWindowPositionY === undefined) this.initMessagePosition();
    this._msgWindowPositionY = value;
};

Game_System.prototype.setMessageAnchorX = function(value) {
    if (this._msgWindowAnchorX === undefined) this.initMessagePosition();
    this._msgWindowAnchorX = value;
};

Game_System.prototype.setMessageAnchorY = function(value) {
    if (this._msgWindowAnchorY === undefined) this.initMessagePosition();
    this._msgWindowAnchorY = value;
};

//=============================================================================
// Game_CharacterBase
//=============================================================================

Game_CharacterBase.prototype.spriteHeight = function() {
    if (this._spriteHeight !== undefined) return this._spriteHeight;
    if (this.tileId() > 0) return $gameMap.tileHeight();
    var bitmap = ImageManager.loadCharacter(this.characterName());
    if (!bitmap) {
      this._spriteHeight = 0;
      return this._spriteHeight;
    }
    var bigCharacter = ImageManager.isBigCharacter(this.characterName());
    this._spriteHeight = bitmap.height;
    this._spriteHeight /= (bigCharacter) ? 4 : 8;
    return this._spriteHeight;
};

//=============================================================================
// Game_Interpreter
//=============================================================================

Yanfly.EMP1.Game_Interpreter_pluginCommand =
    Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
  Yanfly.EMP1.Game_Interpreter_pluginCommand.call(this, command, args);
  if ($gameSystem._msgSoundEnable === undefined) {
    $gameSystem.initMessageSounds();
  } else if (command === 'EnableLetterSound') {
    $gameSystem._msgSoundEnable = true;
  } else if (command === 'DisableLetterSound') {
    $gameSystem._msgSoundEnable = false;
  } else if (command === 'LetterSoundName') {
    this.changeLetterSoundName(args);
  } else if (command === 'LetterSoundVolume') {
    $gameSystem._msgSoundVol = parseInt(args[0]);
  } else if (command === 'LetterSoundPitch') {
    $gameSystem._msgSoundPitch = parseInt(args[0]);
  } else if (command === 'LetterSoundPitchVariance') {
    $gameSystem._msgSoundPitchVar = parseInt(args[0]);
  } else if (command === 'LetterSoundPan') {
    $gameSystem._msgSoundPan = parseInt(args[0]);
  } else if (command === 'LetterSoundPanVariance') {
    $gameSystem._msgSoundPanVar = parseInt(args[0]);
  } else if (command === 'LetterSoundInterval') {
    $gameSystem._msgSoundInterval = parseInt(args[0]);
  } else if (command === 'LetterSoundReset') {
    $gameSystem.initMessageSounds();
  } else if (command === 'ChoiceRowMax') {
    $gameSystem._msgChoiceMax = parseInt(args[0]);
  } else if (command === 'HideChoice') {
    $gameSystem.hideChoice(parseInt(args[0]));
  } else if (command === 'ShowChoice') {
    $gameSystem.showChoice(parseInt(args[0]));
  } else if (command === 'ClearHiddenChoices') {
    $gameSystem.clearHiddenChoices();
  } else if (command === 'DisableChoice') {
    $gameSystem.disableChoice(parseInt(args[0]));
  } else if (command === 'EnableChoice') {
    $gameSystem.enableChoice(parseInt(args[0]));
  } else if (command === 'ClearDisabledChoices') {
    $gameSystem.clearDisabledChoices();
  } else if (command === 'ClearChoiceSettings') {
    $gameSystem.clearChoiceSettings();
  } else if (command === 'MessagePositionX') {
    $gameSystem.setMessagePositionX(parseInt(args[0]));
  } else if (command === 'MessagePositionY') {
    $gameSystem.setMessagePositionY(parseInt(args[0]));
  } else if (command === 'MessagePositionXAuto') {
    $gameSystem.setMessagePositionX('auto');
  } else if (command === 'MessagePositionYAuto') {
    $gameSystem.setMessagePositionY('auto');
  } else if (command === 'MessageAnchorX') {
    this.setMessageAnchor(args[0], 'x');
  } else if (command === 'MessageAnchorY') {
    this.setMessageAnchor(args[0], 'y');
  } else if (command === 'MessagePositionReset') {
    $gameSystem.initMessagePosition();
    $gameSystem._messageRows = eval(Yanfly.Param.MSGDefaultRows);
    $gameSystem._messageWidth = eval(Yanfly.Param.MSGDefaultWidth);
  }
};

Game_Interpreter.prototype.changeLetterSoundName = function(args) {
  var text = '';
  if (args.length === 1) {
    $gameSystem._msgSoundName = String(args[0]);
    return;
  }
  for (var i = 0; i < args.length; ++i) {
    text = text + ' ' + args[i];
  }
  $gameSystem._msgSoundName = text;
};

Game_Interpreter.prototype.setMessageAnchor = function(string, type) {
    if (type === 'x') {
      if (string.match(/center/i)) {
        $gameSystem.setMessageAnchorX(0.5);
      } else if (string.match(/right/i)) {
        $gameSystem.setMessageAnchorX(1);
      } else {
        $gameSystem.setMessageAnchorX(0);
      }
    } else {
      if (string.match(/center/i)) {
        $gameSystem.setMessageAnchorY(0.5);
      } else if (string.match(/bottom/i)) {
        $gameSystem.setMessageAnchorY(1);
      } else {
        $gameSystem.setMessageAnchorY(0);
      }
    }
};

Yanfly.EMP1.Game_Interpreter_setupChoices =
    Game_Interpreter.prototype.setupChoices;
Game_Interpreter.prototype.setupChoices = function(params) {
    params = this.setupExtendedChoices();
    Yanfly.EMP1.Game_Interpreter_setupChoices.call(this, params);
};

Game_Interpreter.prototype.setupExtendedChoices = function() {
    this._currentIndex = this._index;
    var totalChoices = 0;
    ++this._index;
    while (this._index < this._list.length) {
      var cmd = this._list[this._index]
      if (cmd.indent === this._indent) {
        if (cmd.code === 404 && this._list[this._index + 1].code !== 102) {
          break
        } else if (cmd.code === 102) {
          this.adjustChoiceDefault(totalChoices, cmd);
          this.adjustChoiceCancel(totalChoices, cmd);
          this.pushExtraChoices(cmd);
          this._index -= 2;
        } else if (cmd.code === 402) {
          cmd.parameters[0] = totalChoices;
          totalChoices += 1;
        }
      }
      this._index += 1;
    }
    this._index = this._currentIndex;
    return this._list[this._currentIndex].parameters;
};

Game_Interpreter.prototype.adjustChoiceDefault = function(total, cmd) {
    if (cmd.parameters[2] < 0) return;
    var value = cmd.parameters[2] + total;
    this._list[this._currentIndex].parameters[2] = value;
};

Game_Interpreter.prototype.adjustChoiceCancel = function(total, cmd) {
    if (cmd.parameters[1] >= 0) {
      var value = cmd.parameters[1] + total;
      this._list[this._currentIndex].parameters[1] = value;
    } else if (cmd.parameters[1] === -2) {
      this._list[this._currentIndex].parameters[1] = cmd.parameters[1];
    }
};

Game_Interpreter.prototype.pushExtraChoices = function(cmd) {
    for (var i = 0; i < cmd.parameters[0].length; i++) {
      var choice = cmd.parameters[0][i];
      this._list[this._currentIndex].parameters[0].push(choice);
    }
    this._list.splice(this._index - 1, 2)
};

//=============================================================================
// Window_Base
//=============================================================================

Yanfly.EMP1.Window_Base_convertExtraEscapeCharacters =
    Window_Base.prototype.convertExtraEscapeCharacters;
Window_Base.prototype.convertExtraEscapeCharacters = function(text) {
  text = this.convertPlaytime(text);
  text = this.convertMapName(text);
  text = this.convertEnemyName(text);
  text = Yanfly.EMP1.Window_Base_convertExtraEscapeCharacters.call(this, text);
  text = this.convertDigitGrouping(text);
  return text;
};

Window_Base.prototype.convertPlaytime = function(text) {
    text = text.replace(/\x1bPLAYTIME/gi, function() {
      return $gameSystem.playtimeText();
    }.bind(this));
    return text;
};

Window_Base.prototype.convertMapName = function(text) {
    text = text.replace(/\x1bMAP\[(\d+)\]/gi, function() {
      var mapId = arguments[1];
      if (mapId <= 0) mapId = $gameMap.mapId();
      name = $dataMapInfos[mapId].name;
      return name;
    }.bind(this));
    return text;
};

Window_Base.prototype.convertEnemyName = function(text) {
    text = text.replace(/\x1bEN\[(\d+)\]/gi, function() {
      var enemyId = arguments[1];
      if (enemyId <= 0) return '';
      name = $dataEnemies[enemyId].name;
      return name;
    }.bind(this));
    text = text.replace(/\x1bET\[(\d+)\]/gi, function() {
      var index = Math.max(1, arguments[1] - 1);
      var enemy = $gameTroop.allMembers()[index];
      if (enemy) {
        return enemy.name();
      } else {
        return '';
      }
    }.bind(this));
    return text;
};

Window_Base.prototype.convertDigitGrouping = function(text) {
    text = text.replace(/\x1bDG\[(\d+)\]/gi, function() {
      return this.groupDigits(parseInt(arguments[1]));
    }.bind(this));
    return text;
};

Window_Base.prototype.groupDigits = function(number) {
    return Yanfly.Util.forceGroup(number);
};

Window_Base.prototype.obtainColorString = function(textState) {
    var arr = /^\[(.*?)\]/.exec(textState.text.slice(textState.index));
    if (arr) {
        textState.index += arr[0].length;
        return '#' + String(arr[0].slice(1, arr[0].length - 1));
    } else {
        return '#ffffff';
    }
};

Yanfly.EMP1.Window_Base_processEscapeCharacter =
    Window_Base.prototype.processEscapeCharacter;
Window_Base.prototype.processEscapeCharacter = function(code, textState) {
  switch (code) {
  case 'HC':
    var value = this.obtainColorString(textState).toLowerCase();
    this.changeTextColor(value);
    break;
  default:
    Yanfly.EMP1.Window_Base_processEscapeCharacter.call(this, code, textState);
    break;
  }
};

Window_Base.prototype.textHeightEx = function(text) {
    return this.getTextExHeight(text, 0, 0);
};

Window_Base.prototype.getTextExHeight = function(text, x, y) {
    if (text) {
        var textState = { index: 0, x: x, y: y, left: x };
        textState.text = this.convertEscapeCharacters(text);
        textState.height = this.calcTextHeight(textState, true);
        return textState.height;
    } else {
        return 0;
    }
};

//=============================================================================
// Window_ChoiceList
//=============================================================================

Yanfly.EMP1.Window_ChoiceList_numVisibleRows =
    Window_ChoiceList.prototype.numVisibleRows;
Window_ChoiceList.prototype.numVisibleRows = function() {
  var messageY = this._messageWindow.y;
  var messageHeight = this._messageWindow.height;
  var centerY = Graphics.boxHeight / 2;
  // var choices = $gameMessage.choices();
  // var numLines = choices.length;
  this.makeCommandList();
  var numLines = this._maxChoices;
  var maxLines = $gameSystem.getMessageChoiceRows();
  if (messageY < centerY && messageY + messageHeight > centerY) {
    maxLines = 4;
  }
  if (numLines > maxLines) {
    numLines = maxLines;
  }
  return Math.max(1, numLines);
};

Window_ChoiceList.prototype.makeCommandList = function() {
  this._maxChoices = 0;
  this._cancelAllowed = true;
  var choices = $gameMessage.choices();
  for (var i = 0; i < choices.length; i++) {
    if (!$gameSystem.isChoiceShown(i)) {
      if ($gameMessage.choiceCancelType() === i) this._cancelAllowed = false;
      continue;
    }
    this._maxChoices += 1;
    var enabled = $gameSystem.isChoiceEnabled(i);
    this.addCommand(choices[i], 'choice', enabled, i);
    if (!enabled) {
      if ($gameMessage.choiceCancelType() === i) this._cancelAllowed = false;
    }
  }
};

Yanfly.EMP1.Window_ChoiceList_drawItem = Window_ChoiceList.prototype.drawItem;
Window_ChoiceList.prototype.drawItem = function(index) {
    var enabled = this.isCommandEnabled(index);
    this.changePaintOpacity(enabled);
    Yanfly.EMP1.Window_ChoiceList_drawItem.call(this, index);
};

Window_ChoiceList.prototype.callOkHandler = function() {
    $gameMessage.onChoice(this.currentExt());
    this._messageWindow.terminateMessage();
    this.close();
};

Yanfly.EMP1.Window_ChoiceList_isCancelEnabled =
    Window_ChoiceList.prototype.isCancelEnabled;
Window_ChoiceList.prototype.isCancelEnabled = function() {
    if (!this._cancelAllowed) return false;
    return Yanfly.EMP1.Window_ChoiceList_isCancelEnabled.call(this);
};

//=============================================================================
// Window_NameBox
//=============================================================================

Yanfly.EMP1.Window_NameBox_refresh = Window_NameBox.prototype.refresh;
Window_NameBox.prototype.refresh = function(text, position) {
    var text = Yanfly.EMP1.Window_NameBox_refresh.call(this, text, position);
    this.setBackgroundType(0);
    if (eval(Yanfly.Param.MSGNameBoxClear)) {
      this.backOpacity = 0;
      this.opacity = 0;
    } else {
      this.backOpacity = this.standardBackOpacity();
      this.opacity = 255;
    }
    return text;
};

Window_NameBox.prototype.refreshDimmed = function(text, position) {
    var text = Yanfly.EMP1.Window_NameBox_refresh.call(this, text, position);
    this.setBackgroundType(1);
    return text;
};

Window_NameBox.prototype.refreshTransparent = function(text, position) {
    var text = Yanfly.EMP1.Window_NameBox_refresh.call(this, text, position);
    this.setBackgroundType(2);
    return text;
};

//=============================================================================
// Window_Message
//=============================================================================

Yanfly.EMP1.Window_Message_initialize = Window_Message.prototype.initialize;
Window_Message.prototype.initialize = function() {
    $gameSystem.initChoiceShow();
    $gameSystem.initChoiceEnable();
    this._needsMessageReset = false;
    Yanfly.EMP1.Window_Message_initialize.call(this);
};

Yanfly.EMP1.Window_Message_update = Window_Message.prototype.update;
Window_Message.prototype.update = function() {
    Yanfly.EMP1.Window_Message_update.call(this);
    if (this._lockPositionToEvent !== undefined) this.updateLockedPosition();
};

Yanfly.EMP1.Window_Message_newPage = Window_Message.prototype.newPage;
Window_Message.prototype.newPage = function(textState) {
    this._soundCount = 0;
    Yanfly.EMP1.Window_Message_newPage.call(this, textState);
};

Yanfly.EMP1.Window_Message_terminateMessage =
    Window_Message.prototype.terminateMessage;
Window_Message.prototype.terminateMessage = function() {
    Yanfly.EMP1.Window_Message_terminateMessage.call(this);
    if (Yanfly.Param.EMP1LetterReset) $gameSystem.initMessageSounds();
    if (this._needsMessageReset) this.messagePositionReset();
    this._lockPositionToEvent = undefined;
};

Yanfly.EMP1.Window_Message_updateMessage =
    Window_Message.prototype.updateMessage;
Window_Message.prototype.updateMessage = function() {
  var state = Yanfly.EMP1.Window_Message_updateMessage.call(this);
  if (state) {
    this._soundCount = this._soundCount || 0;
    if (this._soundCount-- <= 0) {
      this._soundCount = $gameSystem.messageSoundInterval();
      if ($gameSystem.isMessageSoundEnabled()) SoundManager.playMessageSound();
    }
  }
  return state;
};

Yanfly.EMP1.Window_Message_updatePlacement =
    Window_Message.prototype.updatePlacement;
Window_Message.prototype.updatePlacement = function() {
    Yanfly.EMP1.Window_Message_updatePlacement.call(this);
    this.updatePositionPlacement();
};

Window_Message.prototype.updatePositionPlacement = function() {
    if ($gameSystem.getMessagePositionX() !== 'auto') {
      this.updatePositionPlacementX();
    }
    if ($gameSystem.getMessagePositionY() !== 'auto') {
      this.updatePositionPlacementY();
    }
};

Window_Message.prototype.updatePositionPlacementX = function() {
    this.x = $gameSystem.getMessagePositionX();
    this.x -= Math.floor(this.width * $gameSystem.getMessageAnchorX())
    this.x = Math.max(0, this.x);
    this.x = Math.min(this.x, Graphics.boxWidth - this.width);
};

Window_Message.prototype.updatePositionPlacementY = function() {
    this.y = $gameSystem.getMessagePositionY();
    this.y -= Math.floor(this.height * $gameSystem.getMessageAnchorY());
    this.y = Math.max(0, this.y);
    this.y = Math.min(this.y, Graphics.boxHeight - this.height);
};

Yanfly.EMP1.Window_Message_convertNameBox =
    Window_Message.prototype.convertNameBox;
Window_Message.prototype.convertNameBox = function(text) {
    text = this.convertMessagePositions(text);
    text = this.convertLetterSounds(text);
    text = this.convertExtraNameBoxEffects(text);
    return Yanfly.EMP1.Window_Message_convertNameBox.call(this, text);
};

Window_Message.prototype.convertLetterSounds = function(text) {
    text = text.replace(/\x1bLSON/gi, '\x1bEMP[0]');
    text = text.replace(/\x1bLSOFF/gi, '\x1bEMP[1]');
    text = text.replace(/\x1bLSR/gi, '\x1bEMP[2]');
    return text;
};

Window_Message.prototype.convertMessagePositions = function(text) {
    // MSGPOSX
    text = text.replace(/\x1bMSGPOSX\[(.*?)\]/gi, function() {
      var value = 0;
      this._needsMessageReset = true;
      value = (arguments[1].match(/auto/i)) ? 'auto' : parseInt(arguments[1]);
      $gameSystem.setMessagePositionX(value);
      return '';
    }.bind(this));
    // MSGPOSY
    text = text.replace(/\x1bMSGPOSY\[(.*?)\]/gi, function() {
      var value = 0;
      this._needsMessageReset = true;
      value = (arguments[1].match(/auto/i)) ? 'auto' : parseInt(arguments[1]);
      $gameSystem.setMessagePositionY(value);
      return '';
    }.bind(this));
    // MSGEVENT
    text = text.replace(/\x1bMSGEVENT\[(\d+)\]/gi, function() {
      if (!$gameParty.inBattle()) {
        this._needsMessageReset = true;
        this.setMessagePositionEvent(arguments[1]);
      }
      return '';
    }.bind(this));
    // MSGACTOR
    text = text.replace(/\x1bMSGACTOR\[(\d+)\]/gi, function() {
      if ($gameParty.inBattle()) {
        this._needsMessageReset = true;
        var actorId = arguments[1];
        if (actorId === 0) actorId = $gameParty.members()[0]._actorId;
        this.setMessagePositionEvent(actorId);
      }
      return '';
    }.bind(this));
    // MSGPARTY
    text = text.replace(/\x1bMSGPARTY\[(\d+)\]/gi, function() {
      if ($gameParty.inBattle()) {
        this._needsMessageReset = true;
        var actorId = Math.max(0, arguments[1] - 1);
        var battler = $gameParty.allMembers()[actorId];
        if (battler) {
          actorId = battler._actorId;
        } else {
          actorId = Graphics.boxHeight * 495;
        }
        this.setMessagePositionEvent(actorId);
      }
      return '';
    }.bind(this));
    // MSGENEMY
    text = text.replace(/\x1bMSGENEMY\[(\d+)\]/gi, function() {
      if ($gameParty.inBattle()) {
        this._needsMessageReset = true;
        var enemyId = Math.max(0, arguments[1] - 1);
        var battler = $gameTroop.members()[enemyId];
        if (battler) {
          this.setMessagePositionEvent(-enemyId);
        }
      }
      return '';
    }.bind(this));
    // AUTOEVENT
    text = text.replace(/\x1bAUTOEVENT\[(\d+)\]/gi, function() {
      if (!$gameParty.inBattle() && !this._checkingWidth) {
        this._needsMessageReset = true;
        this.setMessagePositionEvent(arguments[1]);
        this._checkingWidth = true;
        this.getFittedMessageRows(text);
        var value = this.getFittedMessageWidth(text);
        $gameSystem._messageWidth = value;
        this._checkingWidth = false;
      }
      return '';
    }.bind(this));
    // AUTOACTOR
    text = text.replace(/\x1bAUTOACTOR\[(\d+)\]/gi, function() {
      if ($gameParty.inBattle() && !this._checkingWidth) {
        this._needsMessageReset = true;
        var actorId = arguments[1];
        if (actorId === 0) actorId = $gameParty.members()[0]._actorId;
        this.setMessagePositionEvent(actorId);
        this._checkingWidth = true;
        this.getFittedMessageRows(text);
        var value = this.getFittedMessageWidth(text);
        $gameSystem._messageWidth = value;
        this._checkingWidth = false;
      }
      return '';
    }.bind(this));
    // AUTOPARTY
    text = text.replace(/\x1bAUTOPARTY\[(\d+)\]/gi, function() {
      if ($gameParty.inBattle() && !this._checkingWidth) {
        this._needsMessageReset = true;
        var actorId = Math.max(0, arguments[1] - 1);
        var battler = $gameParty.allMembers()[actorId];
        if (battler) {
          actorId = battler._actorId;
        } else {
          actorId = Graphics.boxHeight * 495;
        }
        this.setMessagePositionEvent(actorId);
        this._checkingWidth = true;
        this.getFittedMessageRows(text);
        var value = this.getFittedMessageWidth(text);
        $gameSystem._messageWidth = value;
        this._checkingWidth = false;
      }
      return '';
    }.bind(this));
    // AUTOENEMY
    text = text.replace(/\x1bAUTOENEMY\[(\d+)\]/gi, function() {
      if ($gameParty.inBattle() && !this._checkingWidth) {
        this._needsMessageReset = true;
        var enemyId = Math.max(0, arguments[1] - 1);
        var battler = $gameTroop.members()[enemyId];
        if (battler) {
          this.setMessagePositionEvent(-enemyId);
        }
        this._checkingWidth = true;
        this.getFittedMessageRows(text);
        var value = this.getFittedMessageWidth(text);
        $gameSystem._messageWidth = value;
        this._checkingWidth = false;
      }
      return '';
    }.bind(this));
    // MSGROWS
    text = text.replace(/\x1bMSGROWS\[(.*?)\]/gi, function() {
      if (!this._checkingWidth) {
        this._checkingWidth = true;
        this._needsMessageReset = true;
        var value = 0;
        value = (arguments[1].match(/auto/i)) ? 'auto' : parseInt(arguments[1]);
        if (value === 'auto') {
          this.getFittedMessageRows(text);
        } else {
          $gameSystem._messageRows = value;
        }
        this._checkingWidth = false;
      }
      return '';
    }.bind(this));
    // MSGWIDTH
    text = text.replace(/\x1bMSGWIDTH\[(.*?)\]/gi, function() {
      if (!this._checkingWidth) {
        this._checkingWidth = true;
        var value = 0;
        this._needsMessageReset = true;
        value = (arguments[1].match(/auto/i)) ? 'auto' : parseInt(arguments[1]);
        if (value === 'auto') value = this.getFittedMessageWidth(text);
        $gameSystem._messageWidth = value;
        this._checkingWidth = false;
      }
      return '';
    }.bind(this));
    // AUTO
    text = text.replace(/\x1bAUTO/gi, function() {
      if (!this._checkingWidth) {
        this._checkingWidth = true;
        this._needsMessageReset = true;
        this.getFittedMessageRows(text);
        var value = this.getFittedMessageWidth(text);
        $gameSystem._messageWidth = value;
        this._checkingWidth = false;
      }
      return '';
    }.bind(this));
    // MSGRESET
    text = text.replace(/\x1bMSGRESET/gi, function() {
      this.messagePositionReset();
      this._needsMessageReset = true;
      return '';
    }.bind(this));
    return text;
};

Window_Message.prototype.setMessagePositionEvent = function(eventId) {
    this._lockPositionToEvent = eventId;
};

Window_Message.prototype.getFittedMessageRows = function(text) {
    var height = this.textHeightEx(text);
    if (Yanfly.Param.EMP1FullFace && this.newLineX() > 0) {
      height = Math.max(height, Window_Base._faceHeight);
    }
    $gameSystem._messageRows = height / this.lineHeight();
};

Window_Message.prototype.getFittedMessageWidth = function(text) {
    var value = 0;
    var lines = text.split('\n');
    var length = lines.length;
    for (var i = 0; i < length; ++i) {
      var line = lines[i];
      var lineWidth = this.textWidthEx(line);
      value = Math.max(value, lineWidth);
    }
    value += this.newLineX();
    value += this.standardPadding() * 2;
    value += this.textPadding();
    return value;
};

Window_Message.prototype.messagePositionReset = function() {
    $gameSystem.initMessagePosition();
    $gameSystem._messageRows = eval(Yanfly.Param.MSGDefaultRows);
    $gameSystem._messageWidth = eval(Yanfly.Param.MSGDefaultWidth);
    this._needsMessageReset = false;
};

Window_Message.prototype.convertExtraNameBoxEffects = function(text) {
    // Dimmed Namebox
    text = text.replace(/\x1bND\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refreshDimmed(arguments[1], 1);
    }, this);
    text = text.replace(/\x1bND1\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refreshDimmed(arguments[1], 1);
    }, this);
    text = text.replace(/\x1bND2\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refreshDimmed(arguments[1], 2);
    }, this);
    text = text.replace(/\x1bND3\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refreshDimmed(arguments[1], 3);
    }, this);
    text = text.replace(/\x1bNDC\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refreshDimmed(arguments[1], 3);
    }, this);
    text = text.replace(/\x1bND4\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refreshDimmed(arguments[1], 4);
    }, this);
    text = text.replace(/\x1bND5\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refreshDimmed(arguments[1], 5);
    }, this);
    text = text.replace(/\x1bNDR\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refreshDimmed(arguments[1], 5);
    }, this);
    // Transparent Namebox
    text = text.replace(/\x1bNT\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refreshTransparent(arguments[1], 1);
    }, this);
    text = text.replace(/\x1bNT1\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refreshTransparent(arguments[1], 1);
    }, this);
    text = text.replace(/\x1bNT2\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refreshTransparent(arguments[1], 2);
    }, this);
    text = text.replace(/\x1bNT3\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refreshTransparent(arguments[1], 3);
    }, this);
    text = text.replace(/\x1bNTC\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refreshTransparent(arguments[1], 3);
    }, this);
    text = text.replace(/\x1bNT4\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refreshTransparent(arguments[1], 4);
    }, this);
    text = text.replace(/\x1bNT5\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refreshTransparent(arguments[1], 5);
    }, this);
    text = text.replace(/\x1bNTR\<(.*?)\>/gi, function() {
        return Yanfly.nameWindow.refreshTransparent(arguments[1], 5);
    }, this);
    return text;
};

Window_Message.prototype.convertFaceIndexChange = function(text) {
  // FACEINDEX
  text = text.replace(/\x1bFACEINDEX\[(\d+)\]/gi, function() {
    var i = parseInt(arguments[1]);
    $gameMessage._faceIndex = i;
    return '';
  }.bind(this));
  return text
};

Yanfly.EMP1.Window_Message_convertMessageCharacters =
    Window_Message.prototype.convertMessageCharacters;
Window_Message.prototype.convertMessageCharacters = function(text) {
  text = Yanfly.EMP1.Window_Message_convertMessageCharacters.call(this, text);
  text = this.convertFaceIndexChange(text);
  return text;
};

Yanfly.EMP1.Window_Message_processEscapeCharacter =
    Window_Message.prototype.processEscapeCharacter;
Window_Message.prototype.processEscapeCharacter = function(code, textState) {
  switch (code) {
  case 'EMP':
    var id = this.obtainEscapeParam(textState);
    if (id === 0) $gameSystem._msgSoundEnable = true;
    if (id === 1) $gameSystem._msgSoundEnable = false;
    if (id === 2) $gameSystem.initMessageSounds();
    break;
  case 'LSN':
    var name = this.obtainEscapeString(textState);
    $gameSystem._msgSoundName = name;
    break;
  case 'LSV':
    var value = this.obtainEscapeParam(textState);
    $gameSystem._msgSoundVol = value;
    break;
  case 'LSPIV':
    var value = this.obtainEscapeParam(textState);
    $gameSystem._msgSoundPitchVar = value;
    break;
  case 'LSPI':
    var value = this.obtainEscapeParam(textState);
    $gameSystem._msgSoundPitch = value;
    break;
  case 'LSPAV':
    var value = this.obtainEscapeParam(textState);
    $gameSystem._msgSoundPanVar = value;
  case 'LSPA':
    var value = this.obtainEscapeParam(textState);
    $gameSystem._msgSoundPan = value;
    break;
  case 'LSI':
    var value = this.obtainEscapeParam(textState);
    $gameSystem._msgSoundInterval = value;
    break;
  case 'LSRESET':
    $gameSystem.initMessageSounds();
    break;
  default:
    Yanfly.EMP1.Window_Message_processEscapeCharacter.call(this, code,
      textState);
    break;
  }
};

Window_Message.prototype.updateLockedPosition = function() {
    eventId = this._lockPositionToEvent;
    var x = Graphics.boxWidth / 2;
    var y = Graphics.boxHeight;
    if ($gameParty.inBattle()) {
      if (Imported.YEP_BattleEngineCore) {
        if (eventId > 0) {
          var battler = $gameActors.actor(eventId);
          if (!$gameParty.battleMembers().contains(battler)) battler = null;
        } else {
          eventId *= -1;
          var battler = $gameTroop.members()[eventId];
        }
        if (battler) {
          x = battler.spritePosX();
          y = battler.spritePosY() - battler.spriteHeight();
        }
      }
    } else {
      if (eventId <= 0) {
        x = $gamePlayer.screenX();
        y = $gamePlayer.screenY();
        y -= $gamePlayer.spriteHeight();
      } else {
        var ev = $gameMap.event(eventId);
        if (ev) {
          x = ev.screenX();
          y = ev.screenY();
          y -= ev.spriteHeight();
        }
      }
    }
    $gameSystem.setMessagePositionX(x);
    $gameSystem.setMessagePositionY(y);
    this.updatePositionPlacement();
    this._nameWindow.adjustPositionX();
    this._nameWindow.adjustPositionY();
};

Yanfly.EMP1.Window_Message_startWait = Window_Message.prototype.startWait;
Window_Message.prototype.startWait = function(count) {
    if (this._checkingWidth) return;
    Yanfly.EMP1.Window_Message_startWait.call(this, count);
    this._soundCount = 0;
};

Yanfly.EMP1.Window_Message_startPause = Window_Message.prototype.startPause;
Window_Message.prototype.startPause = function() {
  if (this._checkingWidth) return;
  Yanfly.EMP1.Window_Message_startPause.call(this);
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.forceGroup = function(inVal) {
  if (typeof inVal !== 'string') { inVal = String(inVal); }
  return inVal.replace(/(^|[^\w.])(\d{4,})/g, function($0, $1, $2) {
    return $1 + $2.replace(/\d(?=(?:\d\d\d)+(?!\d))/g, "$&,");
  });
};

//=============================================================================
// End of File
//=============================================================================
};