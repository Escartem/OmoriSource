//=============================================================================
// Yanfly Engine Plugins - Message Core Extension - Message Macros 1
// YEP_X_MessageMacros1.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_MessageMacros1 = true;

var Yanfly = Yanfly || {};
Yanfly.MsgMacro = Yanfly.MsgMacro || {};
Yanfly.MsgMacro.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.01 (Requires YEP_MessageCore.js) Adds macros 1 to 100
 * for your game's message system.
 * @author Yanfly Engine Plugins
 *
 * @param ---Setting---
 * @default
 *
 * @param Enable Quick Macro
 * @parent ---Setting---
 * @type boolean
 * @on YES
 * @off NO
 * @desc Allows you to use \harold in place of \m[harold].
 * NO - false     YES - true
 * @default false
 *
 * @param ---Macro 1---
 * @default
 *
 * @param Macro 1 Text
 * @parent ---Macro 1---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default \n<\c[6]\n[1]\c[0]>
 *
 * @param Macro 1 Name
 * @parent ---Macro 1---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default Harold
 *
 * @param ---Macro 2---
 * @default
 *
 * @param Macro 2 Text
 * @parent ---Macro 2---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default \n<\c[6]\n[2]\c[0]>
 *
 * @param Macro 2 Name
 * @parent ---Macro 2---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default Therese
 *
 * @param ---Macro 3---
 * @default
 *
 * @param Macro 3 Text
 * @parent ---Macro 3---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default \n<\c[6]\n[3]\c[0]>
 *
 * @param Macro 3 Name
 * @parent ---Macro 3---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default Marsha
 *
 * @param ---Macro 4---
 * @default
 *
 * @param Macro 4 Text
 * @parent ---Macro 4---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default \n<\c[6]\n[4]\c[0]>
 *
 * @param Macro 4 Name
 * @parent ---Macro 4---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default Lucius
 *
 * @param ---Macro 5---
 * @default
 *
 * @param Macro 5 Text
 * @parent ---Macro 5---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 5 Name
 * @parent ---Macro 5---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 6---
 * @default
 *
 * @param Macro 6 Text
 * @parent ---Macro 6---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 6 Name
 * @parent ---Macro 6---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 7---
 * @default
 *
 * @param Macro 7 Text
 * @parent ---Macro 7---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 7 Name
 * @parent ---Macro 7---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 8---
 * @default
 *
 * @param Macro 8 Text
 * @parent ---Macro 8---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 8 Name
 * @parent ---Macro 8---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 9---
 * @default
 *
 * @param Macro 9 Text
 * @parent ---Macro 9---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 9 Name
 * @parent ---Macro 9---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 10---
 * @default
 *
 * @param Macro 10 Text
 * @parent ---Macro 10---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 10 Name
 * @parent ---Macro 10---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 11---
 * @default
 *
 * @param Macro 11 Text
 * @parent ---Macro 11---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 11 Name
 * @parent ---Macro 11---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 12---
 * @default
 *
 * @param Macro 12 Text
 * @parent ---Macro 12---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 12 Name
 * @parent ---Macro 12---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 13---
 * @default
 *
 * @param Macro 13 Text
 * @parent ---Macro 13---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 13 Name
 * @parent ---Macro 13---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 14---
 * @default
 *
 * @param Macro 14 Text
 * @parent ---Macro 14---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 14 Name
 * @parent ---Macro 14---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 15---
 * @default
 *
 * @param Macro 15 Text
 * @parent ---Macro 15---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 15 Name
 * @parent ---Macro 15---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 16---
 * @default
 *
 * @param Macro 16 Text
 * @parent ---Macro 16---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 16 Name
 * @parent ---Macro 16---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 17---
 * @default
 *
 * @param Macro 17 Text
 * @parent ---Macro 17---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 17 Name
 * @parent ---Macro 17---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 18---
 * @default
 *
 * @param Macro 18 Text
 * @parent ---Macro 18---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 18 Name
 * @parent ---Macro 18---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 19---
 * @default
 *
 * @param Macro 19 Text
 * @parent ---Macro 19---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 19 Name
 * @parent ---Macro 19---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 20---
 * @default
 *
 * @param Macro 20 Text
 * @parent ---Macro 20---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 20 Name
 * @parent ---Macro 20---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 21---
 * @default
 *
 * @param Macro 21 Text
 * @parent ---Macro 21---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 21 Name
 * @parent ---Macro 21---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 22---
 * @default
 *
 * @param Macro 22 Text
 * @parent ---Macro 22---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 22 Name
 * @parent ---Macro 22---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 23---
 * @default
 *
 * @param Macro 23 Text
 * @parent ---Macro 23---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 23 Name
 * @parent ---Macro 23---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 24---
 * @default
 *
 * @param Macro 24 Text
 * @parent ---Macro 24---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 24 Name
 * @parent ---Macro 24---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 25---
 * @default
 *
 * @param Macro 25 Text
 * @parent ---Macro 25---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 25 Name
 * @parent ---Macro 25---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 26---
 * @default
 *
 * @param Macro 26 Text
 * @parent ---Macro 26---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 26 Name
 * @parent ---Macro 26---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 27---
 * @default
 *
 * @param Macro 27 Text
 * @parent ---Macro 27---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 27 Name
 * @parent ---Macro 27---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 28---
 * @default
 *
 * @param Macro 28 Text
 * @parent ---Macro 28---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 28 Name
 * @parent ---Macro 28---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 29---
 * @default
 *
 * @param Macro 29 Text
 * @parent ---Macro 29---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 29 Name
 * @parent ---Macro 29---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 30---
 * @default
 *
 * @param Macro 30 Text
 * @parent ---Macro 30---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 30 Name
 * @parent ---Macro 30---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 31---
 * @default
 *
 * @param Macro 31 Text
 * @parent ---Macro 31---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 31 Name
 * @parent ---Macro 31---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 32---
 * @default
 *
 * @param Macro 32 Text
 * @parent ---Macro 32---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 32 Name
 * @parent ---Macro 32---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 33---
 * @default
 *
 * @param Macro 33 Text
 * @parent ---Macro 33---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 33 Name
 * @parent ---Macro 33---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 34---
 * @default
 *
 * @param Macro 34 Text
 * @parent ---Macro 34---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 34 Name
 * @parent ---Macro 34---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 35---
 * @default
 *
 * @param Macro 35 Text
 * @parent ---Macro 35---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 35 Name
 * @parent ---Macro 35---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 36---
 * @default
 *
 * @param Macro 36 Text
 * @parent ---Macro 36---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 36 Name
 * @parent ---Macro 36---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 37---
 * @default
 *
 * @param Macro 37 Text
 * @parent ---Macro 37---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 37 Name
 * @parent ---Macro 37---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 38---
 * @default
 *
 * @param Macro 38 Text
 * @parent ---Macro 38---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 38 Name
 * @parent ---Macro 38---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 39---
 * @default
 *
 * @param Macro 39 Text
 * @parent ---Macro 39---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 39 Name
 * @parent ---Macro 39---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 40---
 * @default
 *
 * @param Macro 40 Text
 * @parent ---Macro 40---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 40 Name
 * @parent ---Macro 40---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 41---
 * @default
 *
 * @param Macro 41 Text
 * @parent ---Macro 41---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 41 Name
 * @parent ---Macro 41---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 42---
 * @default
 *
 * @param Macro 42 Text
 * @parent ---Macro 42---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default The Answer to the Ultimate Question of Life, the Universe, and Everything.
 *
 * @param Macro 42 Name
 * @parent ---Macro 42---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default Life
 *
 * @param ---Macro 43---
 * @default
 *
 * @param Macro 43 Text
 * @parent ---Macro 43---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 43 Name
 * @parent ---Macro 43---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 44---
 * @default
 *
 * @param Macro 44 Text
 * @parent ---Macro 44---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 44 Name
 * @parent ---Macro 44---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 45---
 * @default
 *
 * @param Macro 45 Text
 * @parent ---Macro 45---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 45 Name
 * @parent ---Macro 45---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 46---
 * @default
 *
 * @param Macro 46 Text
 * @parent ---Macro 46---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 46 Name
 * @parent ---Macro 46---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 47---
 * @default
 *
 * @param Macro 47 Text
 * @parent ---Macro 47---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 47 Name
 * @parent ---Macro 47---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 48---
 * @default
 *
 * @param Macro 48 Text
 * @parent ---Macro 48---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 48 Name
 * @parent ---Macro 48---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 49---
 * @default
 *
 * @param Macro 49 Text
 * @parent ---Macro 49---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 49 Name
 * @parent ---Macro 49---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 50---
 * @default
 *
 * @param Macro 50 Text
 * @parent ---Macro 50---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 50 Name
 * @parent ---Macro 50---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 51---
 * @default
 *
 * @param Macro 51 Text
 * @parent ---Macro 51---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 51 Name
 * @parent ---Macro 51---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 52---
 * @default
 *
 * @param Macro 52 Text
 * @parent ---Macro 52---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 52 Name
 * @parent ---Macro 52---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 53---
 * @default
 *
 * @param Macro 53 Text
 * @parent ---Macro 53---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 53 Name
 * @parent ---Macro 53---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 54---
 * @default
 *
 * @param Macro 54 Text
 * @parent ---Macro 54---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 54 Name
 * @parent ---Macro 54---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 55---
 * @default
 *
 * @param Macro 55 Text
 * @parent ---Macro 55---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 55 Name
 * @parent ---Macro 55---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 56---
 * @default
 *
 * @param Macro 56 Text
 * @parent ---Macro 56---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 56 Name
 * @parent ---Macro 56---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 57---
 * @default
 *
 * @param Macro 57 Text
 * @parent ---Macro 57---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 57 Name
 * @parent ---Macro 57---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 58---
 * @default
 *
 * @param Macro 58 Text
 * @parent ---Macro 58---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 58 Name
 * @parent ---Macro 58---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 59---
 * @default
 *
 * @param Macro 59 Text
 * @parent ---Macro 59---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 59 Name
 * @parent ---Macro 59---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 60---
 * @default
 *
 * @param Macro 60 Text
 * @parent ---Macro 60---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 60 Name
 * @parent ---Macro 60---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 61---
 * @default
 *
 * @param Macro 61 Text
 * @parent ---Macro 61---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 61 Name
 * @parent ---Macro 61---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 62---
 * @default
 *
 * @param Macro 62 Text
 * @parent ---Macro 62---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 62 Name
 * @parent ---Macro 62---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 63---
 * @default
 *
 * @param Macro 63 Text
 * @parent ---Macro 63---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 63 Name
 * @parent ---Macro 63---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 64---
 * @default
 *
 * @param Macro 64 Text
 * @parent ---Macro 64---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 64 Name
 * @parent ---Macro 64---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 65---
 * @default
 *
 * @param Macro 65 Text
 * @parent ---Macro 65---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 65 Name
 * @parent ---Macro 65---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 66---
 * @default
 *
 * @param Macro 66 Text
 * @parent ---Macro 66---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 66 Name
 * @parent ---Macro 66---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 67---
 * @default
 *
 * @param Macro 67 Text
 * @parent ---Macro 67---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 67 Name
 * @parent ---Macro 67---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 68---
 * @default
 *
 * @param Macro 68 Text
 * @parent ---Macro 68---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 68 Name
 * @parent ---Macro 68---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 69---
 * @default
 *
 * @param Macro 69 Text
 * @parent ---Macro 69---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 69 Name
 * @parent ---Macro 69---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 70---
 * @default
 *
 * @param Macro 70 Text
 * @parent ---Macro 70---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 70 Name
 * @parent ---Macro 70---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 71---
 * @default
 *
 * @param Macro 71 Text
 * @parent ---Macro 71---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 71 Name
 * @parent ---Macro 71---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 72---
 * @default
 *
 * @param Macro 72 Text
 * @parent ---Macro 72---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 72 Name
 * @parent ---Macro 72---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 73---
 * @default
 *
 * @param Macro 73 Text
 * @parent ---Macro 73---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 73 Name
 * @parent ---Macro 73---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 74---
 * @default
 *
 * @param Macro 74 Text
 * @parent ---Macro 74---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 74 Name
 * @parent ---Macro 74---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 75---
 * @default
 *
 * @param Macro 75 Text
 * @parent ---Macro 75---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 75 Name
 * @parent ---Macro 75---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 76---
 * @default
 *
 * @param Macro 76 Text
 * @parent ---Macro 76---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 76 Name
 * @parent ---Macro 76---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 77---
 * @default
 *
 * @param Macro 77 Text
 * @parent ---Macro 77---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 77 Name
 * @parent ---Macro 77---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 78---
 * @default
 *
 * @param Macro 78 Text
 * @parent ---Macro 78---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 78 Name
 * @parent ---Macro 78---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 79---
 * @default
 *
 * @param Macro 79 Text
 * @parent ---Macro 79---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 79 Name
 * @parent ---Macro 79---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 80---
 * @default
 *
 * @param Macro 80 Text
 * @parent ---Macro 80---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 80 Name
 * @parent ---Macro 80---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 81---
 * @default
 *
 * @param Macro 81 Text
 * @parent ---Macro 81---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 81 Name
 * @parent ---Macro 81---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 82---
 * @default
 *
 * @param Macro 82 Text
 * @parent ---Macro 82---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 82 Name
 * @parent ---Macro 82---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 83---
 * @default
 *
 * @param Macro 83 Text
 * @parent ---Macro 83---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 83 Name
 * @parent ---Macro 83---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 84---
 * @default
 *
 * @param Macro 84 Text
 * @parent ---Macro 84---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 84 Name
 * @parent ---Macro 84---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 85---
 * @default
 *
 * @param Macro 85 Text
 * @parent ---Macro 85---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 85 Name
 * @parent ---Macro 85---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 86---
 * @default
 *
 * @param Macro 86 Text
 * @parent ---Macro 86---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 86 Name
 * @parent ---Macro 86---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 87---
 * @default
 *
 * @param Macro 87 Text
 * @parent ---Macro 87---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 87 Name
 * @parent ---Macro 87---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 88---
 * @default
 *
 * @param Macro 88 Text
 * @parent ---Macro 88---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 88 Name
 * @parent ---Macro 88---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 89---
 * @default
 *
 * @param Macro 89 Text
 * @parent ---Macro 89---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 89 Name
 * @parent ---Macro 89---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 90---
 * @default
 *
 * @param Macro 90 Text
 * @parent ---Macro 90---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 90 Name
 * @parent ---Macro 90---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 91---
 * @default
 *
 * @param Macro 91 Text
 * @parent ---Macro 91---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 91 Name
 * @parent ---Macro 91---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 92---
 * @default
 *
 * @param Macro 92 Text
 * @parent ---Macro 92---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 92 Name
 * @parent ---Macro 92---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 93---
 * @default
 *
 * @param Macro 93 Text
 * @parent ---Macro 93---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 93 Name
 * @parent ---Macro 93---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 94---
 * @default
 *
 * @param Macro 94 Text
 * @parent ---Macro 94---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 94 Name
 * @parent ---Macro 94---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 95---
 * @default
 *
 * @param Macro 95 Text
 * @parent ---Macro 95---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 95 Name
 * @parent ---Macro 95---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 96---
 * @default
 *
 * @param Macro 96 Text
 * @parent ---Macro 96---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 96 Name
 * @parent ---Macro 96---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 97---
 * @default
 *
 * @param Macro 97 Text
 * @parent ---Macro 97---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 97 Name
 * @parent ---Macro 97---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 98---
 * @default
 *
 * @param Macro 98 Text
 * @parent ---Macro 98---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 98 Name
 * @parent ---Macro 98---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 99---
 * @default
 *
 * @param Macro 99 Text
 * @parent ---Macro 99---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 99 Name
 * @parent ---Macro 99---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 100---
 * @default
 *
 * @param Macro 100 Text
 * @parent ---Macro 100---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 100 Name
 * @parent ---Macro 100---
 * @desc When using \m[x], you can use the name instead of the ID.
 * @default undefined
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin requires YEP_MessageCore.js to run.
 * Place this plugin under YEP_MessageCore.js in the plugin list.
 *
 * Ever get tired of having to do \n<\c[6]\n[1]\c[0]>? With this plugin you can
 * create a macro where you can type \m[1] and it will do just that. This
 * is a utility plugin for RPG Maker MV developers. Using this plugin, you can
 * now develop macros for the message system or anywhere that uses text codes
 * in general. This plugin will allow you to define what macro ID's will change
 * into what text in-game!
 *
 * ============================================================================
 * Instructions - Setting Up Your macros
 * ============================================================================
 *
 * In the plugin parameters, you'll see something along the lines of
 *
 * ---Macro 1---
 * Macro 1 Text   \n<\c[6]\n[1]\c[0]>
 * Macro 1 Name   Harold
 *
 * How this works is, whenever you type out '\m[1]' in the Show Text event,
 * it will convert that to '\n<\c[6]\n[1]\c[0]>', which is then converted to
 * its own text codes. The text written out is assigned by Macro 1 Text's
 * plugin parameter settings.
 *
 * At the same time, if you cannot remember which macro would give yield to
 * '\n<\c[6]\n[1]\c[0]>', you can also type out '\m[Harold]' to give way to
 * the same deal as '\m[1]' to write out '\n<\c[6]\n[1]\c[0]>'.
 *
 * *** WARNING ***
 *
 * If for some reason you have multiple macros with the same name identifier,
 * then priority will be given to the macro with the lower ID. For example:
 *
 * ---Macro 10---
 * Macro 10 Text   Macro 10
 * Macro 10 Name   abc
 *
 * ---Macro 11---
 * Macro 11 Text   Macro 11
 * Macro 11 Name   abc
 *
 * Here, typing out '\m[abc]' will result in 'Macro 10' instead of 'Macro 11'.
 * This is because the macro name reference 'abc' has a lower ID for 10 than 11
 * does in the macro list.
 *
 * ============================================================================
 * Instructions - Quick Macros
 * ============================================================================
 *
 * In YEP_X_MessageMacros1.js, there is the option 'Enable Quick Macro'. If
 * this is set to true, then you can use macros in a quicker fashion. Assuming
 * that this is the setup:
 *
 * ---Macro 1---
 * Macro 1 Text   \n<\c[6]\n[1]\c[0]>
 * Macro 1 Name   Harold
 *
 * Then '\m[1]' would yield '\n<\c[6]\n[1]\c[0]>'. '\m[Harold]' would also
 * yield '\n<\c[6]\n[1]\c[0]>'. However, with quick macros enabled, then
 * '\Harold' would also yield '\n<\c[6]\n[1]\c[0]>' allowing you to type out
 * the macros even faster.
 *
 * *** WARNING ***
 *
 * However, there are some things to keep in mind. If you ever set up a macro
 * that will clash with other text codes, then the macro will take priority
 * over the text code. For example, if you made the quick macro '\c', then all
 * of the color text codes will cease to work as priority is given to the quick
 * macro instead.
 *
 * Furthermore, quick macros will give priority to quick macros with lower ID's
 * than quick macros with higher ID's if there are similar macro name setups.
 * For example:
 *
 * ---Macro 10---
 * Macro 10 Text   Macro 10
 * Macro 10 Name   abc
 *
 * ---Macro 11---
 * Macro 11 Text   Macro 11
 * Macro 11 Name   abc123
 *
 * Typing out '\abc123' will result in 'Macro 10' because Macro 10 has '\abc',
 * which contains the first three letters of '\abc123' and has a higher ID than
 * that of '\abc', which then gets the priority.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.01:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.00:
 * - Finished Plugin!
 */
//=============================================================================

if (Imported.YEP_MessageCore) {

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_MessageMacros1');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.QuickMacro = String(Yanfly.Parameters['Enable Quick Macro']);
Yanfly.Param.QuickMacro = eval(Yanfly.Param.QuickMacro);

Yanfly.MsgMacroRef = Yanfly.MsgMacroRef || {};
Yanfly.MsgMacroArr = [undefined];
Yanfly.Param.MacroMax = 100;
for (Yanfly.i = 1; Yanfly.i < Yanfly.Param.MacroMax + 1; ++Yanfly.i) {
  Yanfly.tx = 'Macro ' + Yanfly.i + ' Text';
  Yanfly.MsgMacro[Yanfly.i] = String(Yanfly.Parameters[Yanfly.tx]);
  Yanfly.MsgMacro[Yanfly.i] = Yanfly.MsgMacro[Yanfly.i].replace(/\\/g, '\x1b');
  Yanfly.tx = 'Macro ' + Yanfly.i + ' Name';
  Yanfly.tx = String(Yanfly.Parameters[Yanfly.tx]);
  if (!Yanfly.MsgMacroRef[Yanfly.tx.toUpperCase()]) {
    Yanfly.MsgMacroRef[Yanfly.tx.toUpperCase()] = Yanfly.i;
  }
  Yanfly.MsgMacroArr[Yanfly.i] = new RegExp('\x1b' + Yanfly.tx, 'gi');
};

//=============================================================================
// Window_Base
//=============================================================================

Yanfly.MsgMacro.Window_Base_convertEscapeCharacters =
    Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function(text) {
    text = text.replace(/\\V\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\\V\[(\d+)\]/gi, function() {
        return $gameVariables.value(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\\N\[(\d+)\]/gi, function() {
        return this.actorName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\\P\[(\d+)\]/gi, function() {
        return this.partyMemberName(parseInt(arguments[1]));
    }.bind(this));
    text = this.convertMacroText(text);
    return Yanfly.MsgMacro.Window_Base_convertEscapeCharacters.call(this, text);
};

Window_Base.prototype.convertMacroText = function(text) {
    text = text.replace(/\\M\[(\d+)\]/gi, function() {
      return Yanfly.MsgMacro[arguments[1]];
    }.bind(this));
    text = text.replace(/\\M\[(.*?)\]/gi, function() {
      var name = arguments[1].toUpperCase();
      var macro = Yanfly.MsgMacroRef[name];
      return Yanfly.MsgMacro[macro];
    }.bind(this));
    return text;
};

if (Yanfly.Param.QuickMacro) {

Yanfly.MsgMacro.Window_Base_convertMacroText =
    Window_Base.prototype.convertMacroText;
Window_Base.prototype.convertMacroText = function(text) {
    text = Yanfly.MsgMacro.Window_Base_convertMacroText.call(this, text);
    text = text.replace(/\\/g, '\x1b');
    text = text.replace(/\x1b\x1b/g, 'YANFLYMACROTESTREVERSEDOUBLESLASH');
    var length = Yanfly.MsgMacroArr.length;
    for (var i = 0; i < length; ++i) {
      var code = Yanfly.MsgMacroArr[i];
      if (!code) continue;
      text = text.replace(code, function() {
        return Yanfly.MsgMacro[i];
      }.bind(this));
    }
    text = text.replace(/YANFLYMACROTESTREVERSEDOUBLESLASH/g, '\\\\');
    return text;
};

}; // Yanfly.Param.QuickMacro

//=============================================================================
// End of File
//=============================================================================
};