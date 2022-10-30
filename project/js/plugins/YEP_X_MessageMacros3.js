//=============================================================================
// Yanfly Engine Plugins - Message Core Extension - Message Macros 3
// YEP_X_MessageMacros3.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_MessageMacros3 = true;

var Yanfly = Yanfly || {};
Yanfly.MsgMacro = Yanfly.MsgMacro || {};
Yanfly.MsgMacro.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.00 (Requires YEP_MessageCore.js) Adds macros 201 to 300
 * for your game's message system.
 * @author Yanfly Engine Plugins
 *
 * @param ---Macro 201---
 * @default
 *
 * @param Macro 201 Text
 * @parent ---Macro 201---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 201 Name
 * @parent ---Macro 201---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 202---
 * @default
 *
 * @param Macro 202 Text
 * @parent ---Macro 202---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 202 Name
 * @parent ---Macro 202---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 203---
 * @default
 *
 * @param Macro 203 Text
 * @parent ---Macro 203---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 203 Name
 * @parent ---Macro 203---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 204---
 * @default
 *
 * @param Macro 204 Text
 * @parent ---Macro 204---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 204 Name
 * @parent ---Macro 204---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 205---
 * @default
 *
 * @param Macro 205 Text
 * @parent ---Macro 205---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 205 Name
 * @parent ---Macro 205---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 206---
 * @default
 *
 * @param Macro 206 Text
 * @parent ---Macro 206---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 206 Name
 * @parent ---Macro 206---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 207---
 * @default
 *
 * @param Macro 207 Text
 * @parent ---Macro 207---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 207 Name
 * @parent ---Macro 207---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 208---
 * @default
 *
 * @param Macro 208 Text
 * @parent ---Macro 208---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 208 Name
 * @parent ---Macro 208---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 209---
 * @default
 *
 * @param Macro 209 Text
 * @parent ---Macro 209---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 209 Name
 * @parent ---Macro 209---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 210---
 * @default
 *
 * @param Macro 210 Text
 * @parent ---Macro 210---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 210 Name
 * @parent ---Macro 210---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 211---
 * @default
 *
 * @param Macro 211 Text
 * @parent ---Macro 211---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 211 Name
 * @parent ---Macro 211---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 212---
 * @default
 *
 * @param Macro 212 Text
 * @parent ---Macro 212---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 212 Name
 * @parent ---Macro 212---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 213---
 * @default
 *
 * @param Macro 213 Text
 * @parent ---Macro 213---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 213 Name
 * @parent ---Macro 213---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 214---
 * @default
 *
 * @param Macro 214 Text
 * @parent ---Macro 214---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 214 Name
 * @parent ---Macro 214---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 215---
 * @default
 *
 * @param Macro 215 Text
 * @parent ---Macro 215---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 215 Name
 * @parent ---Macro 215---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 216---
 * @default
 *
 * @param Macro 216 Text
 * @parent ---Macro 216---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 216 Name
 * @parent ---Macro 216---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 217---
 * @default
 *
 * @param Macro 217 Text
 * @parent ---Macro 217---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 217 Name
 * @parent ---Macro 217---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 218---
 * @default
 *
 * @param Macro 218 Text
 * @parent ---Macro 218---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 218 Name
 * @parent ---Macro 218---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 219---
 * @default
 *
 * @param Macro 219 Text
 * @parent ---Macro 219---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 219 Name
 * @parent ---Macro 219---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 220---
 * @default
 *
 * @param Macro 220 Text
 * @parent ---Macro 220---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 220 Name
 * @parent ---Macro 220---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 221---
 * @default
 *
 * @param Macro 221 Text
 * @parent ---Macro 221---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 221 Name
 * @parent ---Macro 221---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 222---
 * @default
 *
 * @param Macro 222 Text
 * @parent ---Macro 222---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 222 Name
 * @parent ---Macro 222---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 223---
 * @default
 *
 * @param Macro 223 Text
 * @parent ---Macro 223---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 223 Name
 * @parent ---Macro 223---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 224---
 * @default
 *
 * @param Macro 224 Text
 * @parent ---Macro 224---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 224 Name
 * @parent ---Macro 224---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 225---
 * @default
 *
 * @param Macro 225 Text
 * @parent ---Macro 225---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 225 Name
 * @parent ---Macro 225---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 226---
 * @default
 *
 * @param Macro 226 Text
 * @parent ---Macro 226---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 226 Name
 * @parent ---Macro 226---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 227---
 * @default
 *
 * @param Macro 227 Text
 * @parent ---Macro 227---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 227 Name
 * @parent ---Macro 227---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 228---
 * @default
 *
 * @param Macro 228 Text
 * @parent ---Macro 228---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 228 Name
 * @parent ---Macro 228---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 229---
 * @default
 *
 * @param Macro 229 Text
 * @parent ---Macro 229---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 229 Name
 * @parent ---Macro 229---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 230---
 * @default
 *
 * @param Macro 230 Text
 * @parent ---Macro 230---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 230 Name
 * @parent ---Macro 230---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 231---
 * @default
 *
 * @param Macro 231 Text
 * @parent ---Macro 231---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 231 Name
 * @parent ---Macro 231---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 232---
 * @default
 *
 * @param Macro 232 Text
 * @parent ---Macro 232---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 232 Name
 * @parent ---Macro 232---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 233---
 * @default
 *
 * @param Macro 233 Text
 * @parent ---Macro 233---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 233 Name
 * @parent ---Macro 233---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 234---
 * @default
 *
 * @param Macro 234 Text
 * @parent ---Macro 234---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 234 Name
 * @parent ---Macro 234---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 235---
 * @default
 *
 * @param Macro 235 Text
 * @parent ---Macro 235---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 235 Name
 * @parent ---Macro 235---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 236---
 * @default
 *
 * @param Macro 236 Text
 * @parent ---Macro 236---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 236 Name
 * @parent ---Macro 236---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 237---
 * @default
 *
 * @param Macro 237 Text
 * @parent ---Macro 237---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 237 Name
 * @parent ---Macro 237---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 238---
 * @default
 *
 * @param Macro 238 Text
 * @parent ---Macro 238---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 238 Name
 * @parent ---Macro 238---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 239---
 * @default
 *
 * @param Macro 239 Text
 * @parent ---Macro 239---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 239 Name
 * @parent ---Macro 239---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 240---
 * @default
 *
 * @param Macro 240 Text
 * @parent ---Macro 240---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 240 Name
 * @parent ---Macro 240---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 241---
 * @default
 *
 * @param Macro 241 Text
 * @parent ---Macro 241---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 241 Name
 * @parent ---Macro 241---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 242---
 * @default
 *
 * @param Macro 242 Text
 * @parent ---Macro 242---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 242 Name
 * @parent ---Macro 242---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 243---
 * @default
 *
 * @param Macro 243 Text
 * @parent ---Macro 243---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 243 Name
 * @parent ---Macro 243---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 244---
 * @default
 *
 * @param Macro 244 Text
 * @parent ---Macro 244---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 244 Name
 * @parent ---Macro 244---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 245---
 * @default
 *
 * @param Macro 245 Text
 * @parent ---Macro 245---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 245 Name
 * @parent ---Macro 245---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 246---
 * @default
 *
 * @param Macro 246 Text
 * @parent ---Macro 246---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 246 Name
 * @parent ---Macro 246---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 247---
 * @default
 *
 * @param Macro 247 Text
 * @parent ---Macro 247---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 247 Name
 * @parent ---Macro 247---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 248---
 * @default
 *
 * @param Macro 248 Text
 * @parent ---Macro 248---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 248 Name
 * @parent ---Macro 248---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 249---
 * @default
 *
 * @param Macro 249 Text
 * @parent ---Macro 249---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 249 Name
 * @parent ---Macro 249---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 250---
 * @default
 *
 * @param Macro 250 Text
 * @parent ---Macro 250---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 250 Name
 * @parent ---Macro 250---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 251---
 * @default
 *
 * @param Macro 251 Text
 * @parent ---Macro 251---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 251 Name
 * @parent ---Macro 251---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 252---
 * @default
 *
 * @param Macro 252 Text
 * @parent ---Macro 252---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 252 Name
 * @parent ---Macro 252---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 253---
 * @default
 *
 * @param Macro 253 Text
 * @parent ---Macro 253---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 253 Name
 * @parent ---Macro 253---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 254---
 * @default
 *
 * @param Macro 254 Text
 * @parent ---Macro 254---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 254 Name
 * @parent ---Macro 254---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 255---
 * @default
 *
 * @param Macro 255 Text
 * @parent ---Macro 255---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 255 Name
 * @parent ---Macro 255---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 256---
 * @default
 *
 * @param Macro 256 Text
 * @parent ---Macro 256---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 256 Name
 * @parent ---Macro 256---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 257---
 * @default
 *
 * @param Macro 257 Text
 * @parent ---Macro 257---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 257 Name
 * @parent ---Macro 257---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 258---
 * @default
 *
 * @param Macro 258 Text
 * @parent ---Macro 258---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 258 Name
 * @parent ---Macro 258---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 259---
 * @default
 *
 * @param Macro 259 Text
 * @parent ---Macro 259---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 259 Name
 * @parent ---Macro 259---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 260---
 * @default
 *
 * @param Macro 260 Text
 * @parent ---Macro 260---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 260 Name
 * @parent ---Macro 260---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 261---
 * @default
 *
 * @param Macro 261 Text
 * @parent ---Macro 261---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 261 Name
 * @parent ---Macro 261---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 262---
 * @default
 *
 * @param Macro 262 Text
 * @parent ---Macro 262---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 262 Name
 * @parent ---Macro 262---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 263---
 * @default
 *
 * @param Macro 263 Text
 * @parent ---Macro 263---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 263 Name
 * @parent ---Macro 263---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 264---
 * @default
 *
 * @param Macro 264 Text
 * @parent ---Macro 264---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 264 Name
 * @parent ---Macro 264---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 265---
 * @default
 *
 * @param Macro 265 Text
 * @parent ---Macro 265---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 265 Name
 * @parent ---Macro 265---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 266---
 * @default
 *
 * @param Macro 266 Text
 * @parent ---Macro 266---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 266 Name
 * @parent ---Macro 266---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 267---
 * @default
 *
 * @param Macro 267 Text
 * @parent ---Macro 267---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 267 Name
 * @parent ---Macro 267---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 268---
 * @default
 *
 * @param Macro 268 Text
 * @parent ---Macro 268---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 268 Name
 * @parent ---Macro 268---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 269---
 * @default
 *
 * @param Macro 269 Text
 * @parent ---Macro 269---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 269 Name
 * @parent ---Macro 269---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 270---
 * @default
 *
 * @param Macro 270 Text
 * @parent ---Macro 270---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 270 Name
 * @parent ---Macro 270---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 271---
 * @default
 *
 * @param Macro 271 Text
 * @parent ---Macro 271---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 271 Name
 * @parent ---Macro 271---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 272---
 * @default
 *
 * @param Macro 272 Text
 * @parent ---Macro 272---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 272 Name
 * @parent ---Macro 272---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 273---
 * @default
 *
 * @param Macro 273 Text
 * @parent ---Macro 273---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 273 Name
 * @parent ---Macro 273---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 274---
 * @default
 *
 * @param Macro 274 Text
 * @parent ---Macro 274---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 274 Name
 * @parent ---Macro 274---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 275---
 * @default
 *
 * @param Macro 275 Text
 * @parent ---Macro 275---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 275 Name
 * @parent ---Macro 275---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 276---
 * @default
 *
 * @param Macro 276 Text
 * @parent ---Macro 276---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 276 Name
 * @parent ---Macro 276---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 277---
 * @default
 *
 * @param Macro 277 Text
 * @parent ---Macro 277---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 277 Name
 * @parent ---Macro 277---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 278---
 * @default
 *
 * @param Macro 278 Text
 * @parent ---Macro 278---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 278 Name
 * @parent ---Macro 278---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 279---
 * @default
 *
 * @param Macro 279 Text
 * @parent ---Macro 279---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 279 Name
 * @parent ---Macro 279---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 280---
 * @default
 *
 * @param Macro 280 Text
 * @parent ---Macro 280---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 280 Name
 * @parent ---Macro 280---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 281---
 * @default
 *
 * @param Macro 281 Text
 * @parent ---Macro 281---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 281 Name
 * @parent ---Macro 281---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 282---
 * @default
 *
 * @param Macro 282 Text
 * @parent ---Macro 282---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 282 Name
 * @parent ---Macro 282---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 283---
 * @default
 *
 * @param Macro 283 Text
 * @parent ---Macro 283---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 283 Name
 * @parent ---Macro 283---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 284---
 * @default
 *
 * @param Macro 284 Text
 * @parent ---Macro 284---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 284 Name
 * @parent ---Macro 284---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 285---
 * @default
 *
 * @param Macro 285 Text
 * @parent ---Macro 285---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 285 Name
 * @parent ---Macro 285---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 286---
 * @default
 *
 * @param Macro 286 Text
 * @parent ---Macro 286---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 286 Name
 * @parent ---Macro 286---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 287---
 * @default
 *
 * @param Macro 287 Text
 * @parent ---Macro 287---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 287 Name
 * @parent ---Macro 287---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 288---
 * @default
 *
 * @param Macro 288 Text
 * @parent ---Macro 288---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 288 Name
 * @parent ---Macro 288---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 289---
 * @default
 *
 * @param Macro 289 Text
 * @parent ---Macro 289---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 289 Name
 * @parent ---Macro 289---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 290---
 * @default
 *
 * @param Macro 290 Text
 * @parent ---Macro 290---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 290 Name
 * @parent ---Macro 290---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 291---
 * @default
 *
 * @param Macro 291 Text
 * @parent ---Macro 291---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 291 Name
 * @parent ---Macro 291---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 292---
 * @default
 *
 * @param Macro 292 Text
 * @parent ---Macro 292---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 292 Name
 * @parent ---Macro 292---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 293---
 * @default
 *
 * @param Macro 293 Text
 * @parent ---Macro 293---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 293 Name
 * @parent ---Macro 293---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 294---
 * @default
 *
 * @param Macro 294 Text
 * @parent ---Macro 294---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 294 Name
 * @parent ---Macro 294---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 295---
 * @default
 *
 * @param Macro 295 Text
 * @parent ---Macro 295---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 295 Name
 * @parent ---Macro 295---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 296---
 * @default
 *
 * @param Macro 296 Text
 * @parent ---Macro 296---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 296 Name
 * @parent ---Macro 296---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 297---
 * @default
 *
 * @param Macro 297 Text
 * @parent ---Macro 297---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 297 Name
 * @parent ---Macro 297---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 298---
 * @default
 *
 * @param Macro 298 Text
 * @parent ---Macro 298---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 298 Name
 * @parent ---Macro 298---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 299---
 * @default
 *
 * @param Macro 299 Text
 * @parent ---Macro 299---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 299 Name
 * @parent ---Macro 299---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 300---
 * @default
 *
 * @param Macro 300 Text
 * @parent ---Macro 300---
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

Yanfly.Parameters = PluginManager.parameters('YEP_X_MessageMacros3');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.MacroMax = 300;
for (Yanfly.i = 201; Yanfly.i < Yanfly.Param.MacroMax + 1; ++Yanfly.i) {
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