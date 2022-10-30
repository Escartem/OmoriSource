//=============================================================================
// Yanfly Engine Plugins - Message Core Extension - Message Macros 2
// YEP_X_MessageMacros2.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_MessageMacros2 = true;

var Yanfly = Yanfly || {};
Yanfly.MsgMacro = Yanfly.MsgMacro || {};
Yanfly.MsgMacro.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.00 (Requires YEP_MessageCore.js) Adds macros 101 to 200
 * for your game's message system.
 * @author Yanfly Engine Plugins
 *
 * @param ---Macro 101---
 * @default
 *
 * @param Macro 101 Text
 * @parent ---Macro 101---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 101 Name
 * @parent ---Macro 101---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 102---
 * @default
 *
 * @param Macro 102 Text
 * @parent ---Macro 102---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 102 Name
 * @parent ---Macro 102---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 103---
 * @default
 *
 * @param Macro 103 Text
 * @parent ---Macro 103---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 103 Name
 * @parent ---Macro 103---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 104---
 * @default
 *
 * @param Macro 104 Text
 * @parent ---Macro 104---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 104 Name
 * @parent ---Macro 104---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 105---
 * @default
 *
 * @param Macro 105 Text
 * @parent ---Macro 105---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 105 Name
 * @parent ---Macro 105---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 106---
 * @default
 *
 * @param Macro 106 Text
 * @parent ---Macro 106---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 106 Name
 * @parent ---Macro 106---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 107---
 * @default
 *
 * @param Macro 107 Text
 * @parent ---Macro 107---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 107 Name
 * @parent ---Macro 107---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 108---
 * @default
 *
 * @param Macro 108 Text
 * @parent ---Macro 108---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 108 Name
 * @parent ---Macro 108---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 109---
 * @default
 *
 * @param Macro 109 Text
 * @parent ---Macro 109---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 109 Name
 * @parent ---Macro 109---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 110---
 * @default
 *
 * @param Macro 110 Text
 * @parent ---Macro 110---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 110 Name
 * @parent ---Macro 110---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 111---
 * @default
 *
 * @param Macro 111 Text
 * @parent ---Macro 111---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 111 Name
 * @parent ---Macro 111---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 112---
 * @default
 *
 * @param Macro 112 Text
 * @parent ---Macro 112---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 112 Name
 * @parent ---Macro 112---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 113---
 * @default
 *
 * @param Macro 113 Text
 * @parent ---Macro 113---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 113 Name
 * @parent ---Macro 113---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 114---
 * @default
 *
 * @param Macro 114 Text
 * @parent ---Macro 114---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 114 Name
 * @parent ---Macro 114---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 115---
 * @default
 *
 * @param Macro 115 Text
 * @parent ---Macro 115---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 115 Name
 * @parent ---Macro 115---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 116---
 * @default
 *
 * @param Macro 116 Text
 * @parent ---Macro 116---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 116 Name
 * @parent ---Macro 116---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 117---
 * @default
 *
 * @param Macro 117 Text
 * @parent ---Macro 117---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 117 Name
 * @parent ---Macro 117---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 118---
 * @default
 *
 * @param Macro 118 Text
 * @parent ---Macro 118---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 118 Name
 * @parent ---Macro 118---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 119---
 * @default
 *
 * @param Macro 119 Text
 * @parent ---Macro 119---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 119 Name
 * @parent ---Macro 119---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 120---
 * @default
 *
 * @param Macro 120 Text
 * @parent ---Macro 120---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 120 Name
 * @parent ---Macro 120---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 121---
 * @default
 *
 * @param Macro 121 Text
 * @parent ---Macro 121---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 121 Name
 * @parent ---Macro 121---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 122---
 * @default
 *
 * @param Macro 122 Text
 * @parent ---Macro 122---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 122 Name
 * @parent ---Macro 122---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 123---
 * @default
 *
 * @param Macro 123 Text
 * @parent ---Macro 123---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 123 Name
 * @parent ---Macro 123---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 124---
 * @default
 *
 * @param Macro 124 Text
 * @parent ---Macro 124---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 124 Name
 * @parent ---Macro 124---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 125---
 * @default
 *
 * @param Macro 125 Text
 * @parent ---Macro 125---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 125 Name
 * @parent ---Macro 125---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 126---
 * @default
 *
 * @param Macro 126 Text
 * @parent ---Macro 126---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 126 Name
 * @parent ---Macro 126---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 127---
 * @default
 *
 * @param Macro 127 Text
 * @parent ---Macro 127---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 127 Name
 * @parent ---Macro 127---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 128---
 * @default
 *
 * @param Macro 128 Text
 * @parent ---Macro 128---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 128 Name
 * @parent ---Macro 128---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 129---
 * @default
 *
 * @param Macro 129 Text
 * @parent ---Macro 129---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 129 Name
 * @parent ---Macro 129---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 130---
 * @default
 *
 * @param Macro 130 Text
 * @parent ---Macro 130---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 130 Name
 * @parent ---Macro 130---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 131---
 * @default
 *
 * @param Macro 131 Text
 * @parent ---Macro 131---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 131 Name
 * @parent ---Macro 131---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 132---
 * @default
 *
 * @param Macro 132 Text
 * @parent ---Macro 132---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 132 Name
 * @parent ---Macro 132---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 133---
 * @default
 *
 * @param Macro 133 Text
 * @parent ---Macro 133---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 133 Name
 * @parent ---Macro 133---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 134---
 * @default
 *
 * @param Macro 134 Text
 * @parent ---Macro 134---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 134 Name
 * @parent ---Macro 134---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 135---
 * @default
 *
 * @param Macro 135 Text
 * @parent ---Macro 135---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 135 Name
 * @parent ---Macro 135---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 136---
 * @default
 *
 * @param Macro 136 Text
 * @parent ---Macro 136---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 136 Name
 * @parent ---Macro 136---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 137---
 * @default
 *
 * @param Macro 137 Text
 * @parent ---Macro 137---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 137 Name
 * @parent ---Macro 137---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 138---
 * @default
 *
 * @param Macro 138 Text
 * @parent ---Macro 138---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 138 Name
 * @parent ---Macro 138---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 139---
 * @default
 *
 * @param Macro 139 Text
 * @parent ---Macro 139---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 139 Name
 * @parent ---Macro 139---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 140---
 * @default
 *
 * @param Macro 140 Text
 * @parent ---Macro 140---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 140 Name
 * @parent ---Macro 140---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 141---
 * @default
 *
 * @param Macro 141 Text
 * @parent ---Macro 141---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 141 Name
 * @parent ---Macro 141---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 142---
 * @default
 *
 * @param Macro 142 Text
 * @parent ---Macro 142---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 142 Name
 * @parent ---Macro 142---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 143---
 * @default
 *
 * @param Macro 143 Text
 * @parent ---Macro 143---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 143 Name
 * @parent ---Macro 143---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 144---
 * @default
 *
 * @param Macro 144 Text
 * @parent ---Macro 144---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 144 Name
 * @parent ---Macro 144---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 145---
 * @default
 *
 * @param Macro 145 Text
 * @parent ---Macro 145---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 145 Name
 * @parent ---Macro 145---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 146---
 * @default
 *
 * @param Macro 146 Text
 * @parent ---Macro 146---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 146 Name
 * @parent ---Macro 146---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 147---
 * @default
 *
 * @param Macro 147 Text
 * @parent ---Macro 147---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 147 Name
 * @parent ---Macro 147---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 148---
 * @default
 *
 * @param Macro 148 Text
 * @parent ---Macro 148---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 148 Name
 * @parent ---Macro 148---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 149---
 * @default
 *
 * @param Macro 149 Text
 * @parent ---Macro 149---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 149 Name
 * @parent ---Macro 149---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 150---
 * @default
 *
 * @param Macro 150 Text
 * @parent ---Macro 150---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 150 Name
 * @parent ---Macro 150---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 151---
 * @default
 *
 * @param Macro 151 Text
 * @parent ---Macro 151---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 151 Name
 * @parent ---Macro 151---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 152---
 * @default
 *
 * @param Macro 152 Text
 * @parent ---Macro 152---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 152 Name
 * @parent ---Macro 152---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 153---
 * @default
 *
 * @param Macro 153 Text
 * @parent ---Macro 153---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 153 Name
 * @parent ---Macro 153---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 154---
 * @default
 *
 * @param Macro 154 Text
 * @parent ---Macro 154---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 154 Name
 * @parent ---Macro 154---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 155---
 * @default
 *
 * @param Macro 155 Text
 * @parent ---Macro 155---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 155 Name
 * @parent ---Macro 155---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 156---
 * @default
 *
 * @param Macro 156 Text
 * @parent ---Macro 156---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 156 Name
 * @parent ---Macro 156---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 157---
 * @default
 *
 * @param Macro 157 Text
 * @parent ---Macro 157---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 157 Name
 * @parent ---Macro 157---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 158---
 * @default
 *
 * @param Macro 158 Text
 * @parent ---Macro 158---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 158 Name
 * @parent ---Macro 158---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 159---
 * @default
 *
 * @param Macro 159 Text
 * @parent ---Macro 159---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 159 Name
 * @parent ---Macro 159---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 160---
 * @default
 *
 * @param Macro 160 Text
 * @parent ---Macro 160---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 160 Name
 * @parent ---Macro 160---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 161---
 * @default
 *
 * @param Macro 161 Text
 * @parent ---Macro 161---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 161 Name
 * @parent ---Macro 161---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 162---
 * @default
 *
 * @param Macro 162 Text
 * @parent ---Macro 162---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 162 Name
 * @parent ---Macro 162---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 163---
 * @default
 *
 * @param Macro 163 Text
 * @parent ---Macro 163---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 163 Name
 * @parent ---Macro 163---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 164---
 * @default
 *
 * @param Macro 164 Text
 * @parent ---Macro 164---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 164 Name
 * @parent ---Macro 164---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 165---
 * @default
 *
 * @param Macro 165 Text
 * @parent ---Macro 165---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 165 Name
 * @parent ---Macro 165---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 166---
 * @default
 *
 * @param Macro 166 Text
 * @parent ---Macro 166---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 166 Name
 * @parent ---Macro 166---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 167---
 * @default
 *
 * @param Macro 167 Text
 * @parent ---Macro 167---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 167 Name
 * @parent ---Macro 167---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 168---
 * @default
 *
 * @param Macro 168 Text
 * @parent ---Macro 168---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 168 Name
 * @parent ---Macro 168---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 169---
 * @default
 *
 * @param Macro 169 Text
 * @parent ---Macro 169---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 169 Name
 * @parent ---Macro 169---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 170---
 * @default
 *
 * @param Macro 170 Text
 * @parent ---Macro 170---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 170 Name
 * @parent ---Macro 170---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 171---
 * @default
 *
 * @param Macro 171 Text
 * @parent ---Macro 171---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 171 Name
 * @parent ---Macro 171---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 172---
 * @default
 *
 * @param Macro 172 Text
 * @parent ---Macro 172---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 172 Name
 * @parent ---Macro 172---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 173---
 * @default
 *
 * @param Macro 173 Text
 * @parent ---Macro 173---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 173 Name
 * @parent ---Macro 173---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 174---
 * @default
 *
 * @param Macro 174 Text
 * @parent ---Macro 174---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 174 Name
 * @parent ---Macro 174---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 175---
 * @default
 *
 * @param Macro 175 Text
 * @parent ---Macro 175---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 175 Name
 * @parent ---Macro 175---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 176---
 * @default
 *
 * @param Macro 176 Text
 * @parent ---Macro 176---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 176 Name
 * @parent ---Macro 176---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 177---
 * @default
 *
 * @param Macro 177 Text
 * @parent ---Macro 177---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 177 Name
 * @parent ---Macro 177---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 178---
 * @default
 *
 * @param Macro 178 Text
 * @parent ---Macro 178---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 178 Name
 * @parent ---Macro 178---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 179---
 * @default
 *
 * @param Macro 179 Text
 * @parent ---Macro 179---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 179 Name
 * @parent ---Macro 179---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 180---
 * @default
 *
 * @param Macro 180 Text
 * @parent ---Macro 180---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 180 Name
 * @parent ---Macro 180---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 181---
 * @default
 *
 * @param Macro 181 Text
 * @parent ---Macro 181---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 181 Name
 * @parent ---Macro 181---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 182---
 * @default
 *
 * @param Macro 182 Text
 * @parent ---Macro 182---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 182 Name
 * @parent ---Macro 182---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 183---
 * @default
 *
 * @param Macro 183 Text
 * @parent ---Macro 183---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 183 Name
 * @parent ---Macro 183---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 184---
 * @default
 *
 * @param Macro 184 Text
 * @parent ---Macro 184---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 184 Name
 * @parent ---Macro 184---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 185---
 * @default
 *
 * @param Macro 185 Text
 * @parent ---Macro 185---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 185 Name
 * @parent ---Macro 185---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 186---
 * @default
 *
 * @param Macro 186 Text
 * @parent ---Macro 186---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 186 Name
 * @parent ---Macro 186---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 187---
 * @default
 *
 * @param Macro 187 Text
 * @parent ---Macro 187---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 187 Name
 * @parent ---Macro 187---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 188---
 * @default
 *
 * @param Macro 188 Text
 * @parent ---Macro 188---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 188 Name
 * @parent ---Macro 188---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 189---
 * @default
 *
 * @param Macro 189 Text
 * @parent ---Macro 189---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 189 Name
 * @parent ---Macro 189---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 190---
 * @default
 *
 * @param Macro 190 Text
 * @parent ---Macro 190---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 190 Name
 * @parent ---Macro 190---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 191---
 * @default
 *
 * @param Macro 191 Text
 * @parent ---Macro 191---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 191 Name
 * @parent ---Macro 191---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 192---
 * @default
 *
 * @param Macro 192 Text
 * @parent ---Macro 192---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 192 Name
 * @parent ---Macro 192---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 193---
 * @default
 *
 * @param Macro 193 Text
 * @parent ---Macro 193---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 193 Name
 * @parent ---Macro 193---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 194---
 * @default
 *
 * @param Macro 194 Text
 * @parent ---Macro 194---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 194 Name
 * @parent ---Macro 194---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 195---
 * @default
 *
 * @param Macro 195 Text
 * @parent ---Macro 195---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 195 Name
 * @parent ---Macro 195---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 196---
 * @default
 *
 * @param Macro 196 Text
 * @parent ---Macro 196---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 196 Name
 * @parent ---Macro 196---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 197---
 * @default
 *
 * @param Macro 197 Text
 * @parent ---Macro 197---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 197 Name
 * @parent ---Macro 197---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 198---
 * @default
 *
 * @param Macro 198 Text
 * @parent ---Macro 198---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 198 Name
 * @parent ---Macro 198---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 199---
 * @default
 *
 * @param Macro 199 Text
 * @parent ---Macro 199---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 199 Name
 * @parent ---Macro 199---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 200---
 * @default
 *
 * @param Macro 200 Text
 * @parent ---Macro 200---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 200 Name
 * @parent ---Macro 200---
 * @desc When using \m[x], you use the name instead of the ID.
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
 * If you are using the other Message Macro extension plugins, place these
 * plugins in the Plugin Manager List in sequential order.
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 *
 * Refer to YEP_X_MessageMacros1.js's help file for instructions.
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

Yanfly.Parameters = PluginManager.parameters('YEP_X_MessageMacros2');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.MacroMax = 200;
for (Yanfly.i = 101; Yanfly.i < Yanfly.Param.MacroMax + 1; ++Yanfly.i) {
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
// End of File
//=============================================================================
};