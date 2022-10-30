//=============================================================================
// Yanfly Engine Plugins - Region Events
// YEP_RegionEvents.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_RegionEvents = true;

var Yanfly = Yanfly || {};
Yanfly.RCE = Yanfly.RCE || {};
Yanfly.RCE.version = 1.03;

//=============================================================================
 /*:
 * @plugindesc v1.03 Make it so that whenever players step on certain
 * Region ID's, the game will play certain common events.
 * @author Yanfly Engine Plugins
 *
 * @param ---Regions 1 to 20---
 * @default
 *
 * @param Region 1
 * @parent ---Regions 1 to 20---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 2
 * @parent ---Regions 1 to 20---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 3
 * @parent ---Regions 1 to 20---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 4
 * @parent ---Regions 1 to 20---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 5
 * @parent ---Regions 1 to 20---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 6
 * @parent ---Regions 1 to 20---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 7
 * @parent ---Regions 1 to 20---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 8
 * @parent ---Regions 1 to 20---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 9
 * @parent ---Regions 1 to 20---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 10
 * @parent ---Regions 1 to 20---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 11
 * @parent ---Regions 1 to 20---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 12
 * @parent ---Regions 1 to 20---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 13
 * @parent ---Regions 1 to 20---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 14
 * @parent ---Regions 1 to 20---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 15
 * @parent ---Regions 1 to 20---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 16
 * @parent ---Regions 1 to 20---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 17
 * @parent ---Regions 1 to 20---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 18
 * @parent ---Regions 1 to 20---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 19
 * @parent ---Regions 1 to 20---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 20
 * @parent ---Regions 1 to 20---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param ---Regions 21 to 40---
 * @default
 *
 * @param Region 21
 * @parent ---Regions 21 to 40---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 22
 * @parent ---Regions 21 to 40---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 23
 * @parent ---Regions 21 to 40---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 24
 * @parent ---Regions 21 to 40---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 25
 * @parent ---Regions 21 to 40---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 26
 * @parent ---Regions 21 to 40---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 27
 * @parent ---Regions 21 to 40---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 28
 * @parent ---Regions 21 to 40---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 29
 * @parent ---Regions 21 to 40---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 30
 * @parent ---Regions 21 to 40---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 31
 * @parent ---Regions 21 to 40---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 32
 * @parent ---Regions 21 to 40---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 33
 * @parent ---Regions 21 to 40---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 34
 * @parent ---Regions 21 to 40---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 35
 * @parent ---Regions 21 to 40---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 36
 * @parent ---Regions 21 to 40---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 37
 * @parent ---Regions 21 to 40---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 38
 * @parent ---Regions 21 to 40---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 39
 * @parent ---Regions 21 to 40---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 40
 * @parent ---Regions 21 to 40---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param ---Regions 41 to 60---
 * @default
 *
 * @param Region 41
 * @parent ---Regions 41 to 60---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 42
 * @parent ---Regions 41 to 60---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 43
 * @parent ---Regions 41 to 60---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 44
 * @parent ---Regions 41 to 60---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 45
 * @parent ---Regions 41 to 60---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 46
 * @parent ---Regions 41 to 60---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 47
 * @parent ---Regions 41 to 60---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 48
 * @parent ---Regions 41 to 60---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 49
 * @parent ---Regions 41 to 60---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 50
 * @parent ---Regions 41 to 60---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 51
 * @parent ---Regions 41 to 60---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 52
 * @parent ---Regions 41 to 60---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 53
 * @parent ---Regions 41 to 60---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 54
 * @parent ---Regions 41 to 60---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 55
 * @parent ---Regions 41 to 60---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 56
 * @parent ---Regions 41 to 60---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 57
 * @parent ---Regions 41 to 60---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 58
 * @parent ---Regions 41 to 60---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 59
 * @parent ---Regions 41 to 60---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 60
 * @parent ---Regions 41 to 60---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param ---Regions 61 to 80---
 * @default
 *
 * @param Region 61
 * @parent ---Regions 61 to 80---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 62
 * @parent ---Regions 61 to 80---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 63
 * @parent ---Regions 61 to 80---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 64
 * @parent ---Regions 61 to 80---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 65
 * @parent ---Regions 61 to 80---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 66
 * @parent ---Regions 61 to 80---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 67
 * @parent ---Regions 61 to 80---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 68
 * @parent ---Regions 61 to 80---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 69
 * @parent ---Regions 61 to 80---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 70
 * @parent ---Regions 61 to 80---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 71
 * @parent ---Regions 61 to 80---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 72
 * @parent ---Regions 61 to 80---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 73
 * @parent ---Regions 61 to 80---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 74
 * @parent ---Regions 61 to 80---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 75
 * @parent ---Regions 61 to 80---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 76
 * @parent ---Regions 61 to 80---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 77
 * @parent ---Regions 61 to 80---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 78
 * @parent ---Regions 61 to 80---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 79
 * @parent ---Regions 61 to 80---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 80
 * @parent ---Regions 61 to 80---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param ---Regions 81 to 100---
 * @default
 *
 * @param Region 81
 * @parent ---Regions 81 to 100---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 82
 * @parent ---Regions 81 to 100---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 83
 * @parent ---Regions 81 to 100---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 84
 * @parent ---Regions 81 to 100---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 85
 * @parent ---Regions 81 to 100---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 86
 * @parent ---Regions 81 to 100---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 87
 * @parent ---Regions 81 to 100---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 88
 * @parent ---Regions 81 to 100---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 89
 * @parent ---Regions 81 to 100---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 90
 * @parent ---Regions 81 to 100---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 91
 * @parent ---Regions 81 to 100---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 92
 * @parent ---Regions 81 to 100---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 93
 * @parent ---Regions 81 to 100---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 94
 * @parent ---Regions 81 to 100---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 95
 * @parent ---Regions 81 to 100---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 96
 * @parent ---Regions 81 to 100---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 97
 * @parent ---Regions 81 to 100---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 98
 * @parent ---Regions 81 to 100---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 99
 * @parent ---Regions 81 to 100---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 100
 * @parent ---Regions 81 to 100---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param ---Regions 101 to 120---
 * @default
 *
 * @param Region 101
 * @parent ---Regions 101 to 120---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 102
 * @parent ---Regions 101 to 120---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 103
 * @parent ---Regions 101 to 120---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 104
 * @parent ---Regions 101 to 120---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 105
 * @parent ---Regions 101 to 120---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 106
 * @parent ---Regions 101 to 120---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 107
 * @parent ---Regions 101 to 120---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 108
 * @parent ---Regions 101 to 120---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 109
 * @parent ---Regions 101 to 120---
 * @type common_event
 * @desc The common event to play for this region when stepped on.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 110
 * @parent ---Regions 101 to 120---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 111
 * @parent ---Regions 101 to 120---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 112
 * @parent ---Regions 101 to 120---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 113
 * @parent ---Regions 101 to 120---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 114
 * @parent ---Regions 101 to 120---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 115
 * @parent ---Regions 101 to 120---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 116
 * @parent ---Regions 101 to 120---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 117
 * @parent ---Regions 101 to 120---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 118
 * @parent ---Regions 101 to 120---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 119
 * @parent ---Regions 101 to 120---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 120
 * @parent ---Regions 101 to 120---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param ---Regions 121 to 140---
 * @default
 *
 * @param Region 121
 * @parent ---Regions 121 to 140---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 122
 * @parent ---Regions 121 to 140---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 123
 * @parent ---Regions 121 to 140---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 124
 * @parent ---Regions 121 to 140---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 125
 * @parent ---Regions 121 to 140---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 126
 * @parent ---Regions 121 to 140---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 127
 * @parent ---Regions 121 to 140---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 128
 * @parent ---Regions 121 to 140---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 129
 * @parent ---Regions 121 to 140---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 130
 * @parent ---Regions 121 to 140---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 131
 * @parent ---Regions 121 to 140---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 132
 * @parent ---Regions 121 to 140---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 133
 * @parent ---Regions 121 to 140---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 134
 * @parent ---Regions 121 to 140---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 135
 * @parent ---Regions 121 to 140---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 136
 * @parent ---Regions 121 to 140---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 137
 * @parent ---Regions 121 to 140---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 138
 * @parent ---Regions 121 to 140---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 139
 * @parent ---Regions 121 to 140---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 140
 * @parent ---Regions 121 to 140---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param ---Regions 141 to 160---
 * @default
 *
 * @param Region 141
 * @parent ---Regions 141 to 160---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 142
 * @parent ---Regions 141 to 160---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 143
 * @parent ---Regions 141 to 160---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 144
 * @parent ---Regions 141 to 160---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 145
 * @parent ---Regions 141 to 160---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 146
 * @parent ---Regions 141 to 160---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 147
 * @parent ---Regions 141 to 160---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 148
 * @parent ---Regions 141 to 160---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 149
 * @parent ---Regions 141 to 160---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 150
 * @parent ---Regions 141 to 160---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 151
 * @parent ---Regions 141 to 160---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 152
 * @parent ---Regions 141 to 160---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 153
 * @parent ---Regions 141 to 160---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 154
 * @parent ---Regions 141 to 160---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 155
 * @parent ---Regions 141 to 160---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 156
 * @parent ---Regions 141 to 160---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 157
 * @parent ---Regions 141 to 160---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 158
 * @parent ---Regions 141 to 160---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 159
 * @parent ---Regions 141 to 160---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 160
 * @parent ---Regions 141 to 160---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param ---Regions 161 to 180---
 * @default
 *
 * @param Region 161
 * @parent ---Regions 161 to 180---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 162
 * @parent ---Regions 161 to 180---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 163
 * @parent ---Regions 161 to 180---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 164
 * @parent ---Regions 161 to 180---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 165
 * @parent ---Regions 161 to 180---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 166
 * @parent ---Regions 161 to 180---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 167
 * @parent ---Regions 161 to 180---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 168
 * @parent ---Regions 161 to 180---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 169
 * @parent ---Regions 161 to 180---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 170
 * @parent ---Regions 161 to 180---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 171
 * @parent ---Regions 161 to 180---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 172
 * @parent ---Regions 161 to 180---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 173
 * @parent ---Regions 161 to 180---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 174
 * @parent ---Regions 161 to 180---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 175
 * @parent ---Regions 161 to 180---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 176
 * @parent ---Regions 161 to 180---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 177
 * @parent ---Regions 161 to 180---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 178
 * @parent ---Regions 161 to 180---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 179
 * @parent ---Regions 161 to 180---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 180
 * @parent ---Regions 161 to 180---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param ---Regions 181 to 200---
 * @default
 *
 * @param Region 181
 * @parent ---Regions 181 to 200---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 182
 * @parent ---Regions 181 to 200---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 183
 * @parent ---Regions 181 to 200---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 184
 * @parent ---Regions 181 to 200---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 185
 * @parent ---Regions 181 to 200---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 186
 * @parent ---Regions 181 to 200---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 187
 * @parent ---Regions 181 to 200---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 188
 * @parent ---Regions 181 to 200---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 189
 * @parent ---Regions 181 to 200---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 190
 * @parent ---Regions 181 to 200---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 191
 * @parent ---Regions 181 to 200---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 192
 * @parent ---Regions 181 to 200---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 193
 * @parent ---Regions 181 to 200---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 194
 * @parent ---Regions 181 to 200---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 195
 * @parent ---Regions 181 to 200---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 196
 * @parent ---Regions 181 to 200---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 197
 * @parent ---Regions 181 to 200---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 198
 * @parent ---Regions 181 to 200---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 199
 * @parent ---Regions 181 to 200---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that region not trigger a common event.
 * @default 0
 *
 * @param Region 200
 * @parent ---Regions 181 to 200---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param ---Regions 201 to 220---
 * @default
 *
 * @param Region 201
 * @parent ---Regions 201 to 220---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 202
 * @parent ---Regions 201 to 220---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 203
 * @parent ---Regions 201 to 220---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 204
 * @parent ---Regions 201 to 220---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 205
 * @parent ---Regions 201 to 220---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 206
 * @parent ---Regions 201 to 220---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 207
 * @parent ---Regions 201 to 220---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 208
 * @parent ---Regions 201 to 220---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 209
 * @parent ---Regions 201 to 220---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 210
 * @parent ---Regions 201 to 220---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 211
 * @parent ---Regions 201 to 220---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 212
 * @parent ---Regions 201 to 220---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 213
 * @parent ---Regions 201 to 220---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 214
 * @parent ---Regions 201 to 220---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 215
 * @parent ---Regions 201 to 220---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 216
 * @parent ---Regions 201 to 220---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 217
 * @parent ---Regions 201 to 220---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 218
 * @parent ---Regions 201 to 220---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 219
 * @parent ---Regions 201 to 220---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 220
 * @parent ---Regions 201 to 220---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param ---Regions 221 to 240---
 * @default
 *
 * @param Region 221
 * @parent ---Regions 221 to 240---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 222
 * @parent ---Regions 221 to 240---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 223
 * @parent ---Regions 221 to 240---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 224
 * @parent ---Regions 221 to 240---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 225
 * @parent ---Regions 221 to 240---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 226
 * @parent ---Regions 221 to 240---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 227
 * @parent ---Regions 221 to 240---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 228
 * @parent ---Regions 221 to 240---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 229
 * @parent ---Regions 221 to 240---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 230
 * @parent ---Regions 221 to 240---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 231
 * @parent ---Regions 221 to 240---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 232
 * @parent ---Regions 221 to 240---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 233
 * @parent ---Regions 221 to 240---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 234
 * @parent ---Regions 221 to 240---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 235
 * @parent ---Regions 221 to 240---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 236
 * @parent ---Regions 221 to 240---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 237
 * @parent ---Regions 221 to 240---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 238
 * @parent ---Regions 221 to 240---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 239
 * @parent ---Regions 221 to 240---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 240
 * @parent ---Regions 221 to 240---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param ---Regions 241 to 255---
 * @default
 *
 * @param Region 241
 * @parent ---Regions 241 to 255---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 242
 * @parent ---Regions 241 to 255---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 243
 * @parent ---Regions 241 to 255---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 244
 * @parent ---Regions 241 to 255---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 245
 * @parent ---Regions 241 to 255---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 246
 * @parent ---Regions 241 to 255---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 247
 * @parent ---Regions 241 to 255---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 248
 * @parent ---Regions 241 to 255---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 249
 * @parent ---Regions 241 to 255---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 250
 * @parent ---Regions 241 to 255---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 251
 * @parent ---Regions 241 to 255---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 252
 * @parent ---Regions 241 to 255---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 253
 * @parent ---Regions 241 to 255---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 254
 * @parent ---Regions 241 to 255---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @param Region 255
 * @parent ---Regions 241 to 255---
 * @type common_event
 * @desc What common event to play for this Region when stepped upon.
 * Use 0 to have that Region not trigger a common event.
 * @default 0
 *
 * @help
 * ============================================================================
 * Introduction and Instructions
 * ============================================================================
 *
 * There are 255 Regions you can mark on your map. You can set it so that when
 * players step on those specific Regions, a Common Event will play each time
 * they step on it. To do so, bind a Common Event's ID to the Region number in
 * this plugin's parameters. It will make it so that any tile with that very
 * specific Region ID to trigger an on-Player Touch event using the Common
 * Event ID that you have marked for it.
 *
 * Keep in mind that if any common event occurs during a touch input, it will
 * clear the touch input as intended by the game engine.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * You can use this notetag inside of your maps.
 *
 * Map Notetags:
 *   <Region x Event: y>
 *   If the player steps onto a tile marked by Region x, it will run the
 *   common event y. This will override the default settings marked in the
 *   editor specifically for that map.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.03:
 * - Corrected an issue that would cause a region event to repeatedly trigger
 * if the mouse button is held down on the player.
 *
 * Version 1.02:
 * - Fixed a bug that prevented region events from trigger if the mouse button
 * is held down longer than usual.
 *
 * Version 1.01a:
 * - Fixed a bug with region event notetags that stopped working if it was used
 * to teleport onto the same map.
 *
 * Version 1.00:
 * - Finished plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_RegionEvents');
Yanfly.Param = Yanfly.Param || {};

Yanfly.RCE.RegionEvents = {};
for (Yanfly.i = 1; Yanfly.i <= 255; ++Yanfly.i) {
  Yanfly.line = "Number(Yanfly.Parameters['Region " + Yanfly.i + "'] || 0)";
  Yanfly.RCE.RegionEvents[Yanfly.i] = eval(Yanfly.line);
};

//=============================================================================
// DataManager
//=============================================================================

DataManager.processRECNotetags = function() {
  if (!$dataMap) return;
  if (!$dataMap.note) return;
  var notedata = $dataMap.note.split(/[\r\n]+/);
  $dataMap.regionCommonEvents = {};
  for (var i = 0; i < notedata.length; i++) {
    var line = notedata[i];
    if (line.match(/<(?:REGION)[ ](\d+)[ ](?:EVENT):[ ](\d+)>/i)) {
      $dataMap.regionCommonEvents[parseInt(RegExp.$1)] = parseInt(RegExp.$2);
    }
  }
};

//=============================================================================
// Game_Map
//=============================================================================

Yanfly.RCE.Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    if ($dataMap) DataManager.processRECNotetags();
    Yanfly.RCE.Game_Map_setup.call(this, mapId);
};

Game_Map.prototype.isRegionEvent = function(mx, my) {
    return (this.isValid(mx, my) && this.regionEventTag(mx, my));
};

Game_Map.prototype.getUniqueRegionCommonEvent = function(regionId) {
    if ($dataMap.regionCommonEvents === undefined) {
      DataManager.processRECNotetags();
    }
    if ($dataMap.regionCommonEvents && $dataMap.regionCommonEvents[regionId]) {
      return $dataMap.regionCommonEvents[regionId];
    }
    return 0;
};

Game_Map.prototype.regionEventTag = function(mx, my) {
    if (this.regionId(mx, my) <= 0) return false;
    var regionId = this.regionId(mx, my);
    if (this.getUniqueRegionCommonEvent(regionId) > 0) return true;
    return Yanfly.RCE.RegionEvents[regionId] > 0;
};

Game_Map.prototype.moveAfterCommonEvent = function() {
    var interpreter = $gameMap._interpreter;
    if (!interpreter._list) return false;
    if (interpreter.eventId() > 0) return false;
    var list = interpreter._list;
    if ($gameTemp.destinationX() === $gamePlayer.x &&
      $gameTemp.destinationY() === $gamePlayer.y) {
        $gameTemp.clearDestination();
    }
    for (var i = 0; i < list.length; ++i) {
      var code = list[i].code;
      if ([201, 205, 230, 232, 261, 301].contains(code)) return false;
    }
    return true;
};

//=============================================================================
// Game_Player
//=============================================================================

Yanfly.RCE.Game_Player_checkEventTriggerHere =
    Game_Player.prototype.checkEventTriggerHere;
Game_Player.prototype.checkEventTriggerHere = function(triggers) {
    if (!this.canStartLocalEvents()) return;
    if (!triggers.contains(0)) this.processRegionEvent();
    Yanfly.RCE.Game_Player_checkEventTriggerHere.call(this, triggers);
};

Game_Player.prototype.processRegionEvent = function() {
    if (!$gameMap.isRegionEvent(this.x, this.y)) return;
    if (Input.isTriggered('ok')) return;
    var regionId = $gameMap.regionId(this.x, this.y)
    if ($gameMap.getUniqueRegionCommonEvent(regionId) > 0) {
      var commonEventId = $gameMap.getUniqueRegionCommonEvent(regionId);
    } else {
      var commonEventId = Yanfly.RCE.RegionEvents[regionId];
    }
    $gameTemp.reserveCommonEvent(commonEventId);
};

Yanfly.RCE.Game_Player_canMove = Game_Player.prototype.canMove;
Game_Player.prototype.canMove = function() {
    if ($gameMessage.isBusy()) {
      return false;
    }
    if (this.isMoveRouteForcing() || this.areFollowersGathering()) {
        return false;
    }
    if (this._vehicleGettingOn || this._vehicleGettingOff) {
        return false;
    }
    if (this.isInVehicle() && !this.vehicle().canMove()) {
        return false;
    }
    if ($gameMap.isEventRunning() && $gameMap.moveAfterCommonEvent()) {
      return true;
    }
    return Yanfly.RCE.Game_Player_canMove.call(this);
};


//=============================================================================
// End of File
//=============================================================================
