//=============================================================================
// Yanfly Engine Plugins - Message Core Extension - Message Macros 4
// YEP_X_MessageMacros4.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_MessageMacros4 = true;

var Yanfly = Yanfly || {};
Yanfly.MsgMacro = Yanfly.MsgMacro || {};
Yanfly.MsgMacro.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.00 (Requires YEP_MessageCore.js) Adds macros 301 to 400
 * for your game's message system.
 * @author Yanfly Engine Plugins
 *
 * @param ---Macro 301---
 * @default
 *
 * @param Macro 301 Text
 * @parent ---Macro 301---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 301 Name
 * @parent ---Macro 301---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 302---
 * @default
 *
 * @param Macro 302 Text
 * @parent ---Macro 302---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 302 Name
 * @parent ---Macro 302---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 303---
 * @default
 *
 * @param Macro 303 Text
 * @parent ---Macro 303---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 303 Name
 * @parent ---Macro 303---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 304---
 * @default
 *
 * @param Macro 304 Text
 * @parent ---Macro 304---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 304 Name
 * @parent ---Macro 304---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 305---
 * @default
 *
 * @param Macro 305 Text
 * @parent ---Macro 305---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 305 Name
 * @parent ---Macro 305---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 306---
 * @default
 *
 * @param Macro 306 Text
 * @parent ---Macro 306---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 306 Name
 * @parent ---Macro 306---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 307---
 * @default
 *
 * @param Macro 307 Text
 * @parent ---Macro 307---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 307 Name
 * @parent ---Macro 307---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 308---
 * @default
 *
 * @param Macro 308 Text
 * @parent ---Macro 308---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 308 Name
 * @parent ---Macro 308---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 309---
 * @default
 *
 * @param Macro 309 Text
 * @parent ---Macro 309---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 309 Name
 * @parent ---Macro 309---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 310---
 * @default
 *
 * @param Macro 310 Text
 * @parent ---Macro 310---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 310 Name
 * @parent ---Macro 310---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 311---
 * @default
 *
 * @param Macro 311 Text
 * @parent ---Macro 311---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 311 Name
 * @parent ---Macro 311---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 312---
 * @default
 *
 * @param Macro 312 Text
 * @parent ---Macro 312---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 312 Name
 * @parent ---Macro 312---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 313---
 * @default
 *
 * @param Macro 313 Text
 * @parent ---Macro 313---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 313 Name
 * @parent ---Macro 313---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 314---
 * @default
 *
 * @param Macro 314 Text
 * @parent ---Macro 314---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 314 Name
 * @parent ---Macro 314---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 315---
 * @default
 *
 * @param Macro 315 Text
 * @parent ---Macro 315---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 315 Name
 * @parent ---Macro 315---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 316---
 * @default
 *
 * @param Macro 316 Text
 * @parent ---Macro 316---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 316 Name
 * @parent ---Macro 316---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 317---
 * @default
 *
 * @param Macro 317 Text
 * @parent ---Macro 317---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 317 Name
 * @parent ---Macro 317---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 318---
 * @default
 *
 * @param Macro 318 Text
 * @parent ---Macro 318---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 318 Name
 * @parent ---Macro 318---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 319---
 * @default
 *
 * @param Macro 319 Text
 * @parent ---Macro 319---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 319 Name
 * @parent ---Macro 319---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 320---
 * @default
 *
 * @param Macro 320 Text
 * @parent ---Macro 320---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 320 Name
 * @parent ---Macro 320---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 321---
 * @default
 *
 * @param Macro 321 Text
 * @parent ---Macro 321---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 321 Name
 * @parent ---Macro 321---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 322---
 * @default
 *
 * @param Macro 322 Text
 * @parent ---Macro 322---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 322 Name
 * @parent ---Macro 322---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 323---
 * @default
 *
 * @param Macro 323 Text
 * @parent ---Macro 323---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 323 Name
 * @parent ---Macro 323---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 324---
 * @default
 *
 * @param Macro 324 Text
 * @parent ---Macro 324---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 324 Name
 * @parent ---Macro 324---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 325---
 * @default
 *
 * @param Macro 325 Text
 * @parent ---Macro 325---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 325 Name
 * @parent ---Macro 325---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 326---
 * @default
 *
 * @param Macro 326 Text
 * @parent ---Macro 326---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 326 Name
 * @parent ---Macro 326---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 327---
 * @default
 *
 * @param Macro 327 Text
 * @parent ---Macro 327---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 327 Name
 * @parent ---Macro 327---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 328---
 * @default
 *
 * @param Macro 328 Text
 * @parent ---Macro 328---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 328 Name
 * @parent ---Macro 328---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 329---
 * @default
 *
 * @param Macro 329 Text
 * @parent ---Macro 329---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 329 Name
 * @parent ---Macro 329---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 330---
 * @default
 *
 * @param Macro 330 Text
 * @parent ---Macro 330---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 330 Name
 * @parent ---Macro 330---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 331---
 * @default
 *
 * @param Macro 331 Text
 * @parent ---Macro 331---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 331 Name
 * @parent ---Macro 331---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 332---
 * @default
 *
 * @param Macro 332 Text
 * @parent ---Macro 332---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 332 Name
 * @parent ---Macro 332---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 333---
 * @default
 *
 * @param Macro 333 Text
 * @parent ---Macro 333---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 333 Name
 * @parent ---Macro 333---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 334---
 * @default
 *
 * @param Macro 334 Text
 * @parent ---Macro 334---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 334 Name
 * @parent ---Macro 334---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 335---
 * @default
 *
 * @param Macro 335 Text
 * @parent ---Macro 335---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 335 Name
 * @parent ---Macro 335---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 336---
 * @default
 *
 * @param Macro 336 Text
 * @parent ---Macro 336---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 336 Name
 * @parent ---Macro 336---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 337---
 * @default
 *
 * @param Macro 337 Text
 * @parent ---Macro 337---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 337 Name
 * @parent ---Macro 337---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 338---
 * @default
 *
 * @param Macro 338 Text
 * @parent ---Macro 338---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 338 Name
 * @parent ---Macro 338---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 339---
 * @default
 *
 * @param Macro 339 Text
 * @parent ---Macro 339---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 339 Name
 * @parent ---Macro 339---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 340---
 * @default
 *
 * @param Macro 340 Text
 * @parent ---Macro 340---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 340 Name
 * @parent ---Macro 340---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 341---
 * @default
 *
 * @param Macro 341 Text
 * @parent ---Macro 341---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 341 Name
 * @parent ---Macro 341---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 342---
 * @default
 *
 * @param Macro 342 Text
 * @parent ---Macro 342---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 342 Name
 * @parent ---Macro 342---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 343---
 * @default
 *
 * @param Macro 343 Text
 * @parent ---Macro 343---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 343 Name
 * @parent ---Macro 343---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 344---
 * @default
 *
 * @param Macro 344 Text
 * @parent ---Macro 344---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 344 Name
 * @parent ---Macro 344---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 345---
 * @default
 *
 * @param Macro 345 Text
 * @parent ---Macro 345---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 345 Name
 * @parent ---Macro 345---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 346---
 * @default
 *
 * @param Macro 346 Text
 * @parent ---Macro 346---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 346 Name
 * @parent ---Macro 346---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 347---
 * @default
 *
 * @param Macro 347 Text
 * @parent ---Macro 347---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 347 Name
 * @parent ---Macro 347---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 348---
 * @default
 *
 * @param Macro 348 Text
 * @parent ---Macro 348---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 348 Name
 * @parent ---Macro 348---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 349---
 * @default
 *
 * @param Macro 349 Text
 * @parent ---Macro 349---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 349 Name
 * @parent ---Macro 349---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 350---
 * @default
 *
 * @param Macro 350 Text
 * @parent ---Macro 350---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 350 Name
 * @parent ---Macro 350---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 351---
 * @default
 *
 * @param Macro 351 Text
 * @parent ---Macro 351---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 351 Name
 * @parent ---Macro 351---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 352---
 * @default
 *
 * @param Macro 352 Text
 * @parent ---Macro 352---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 352 Name
 * @parent ---Macro 352---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 353---
 * @default
 *
 * @param Macro 353 Text
 * @parent ---Macro 353---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 353 Name
 * @parent ---Macro 353---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 354---
 * @default
 *
 * @param Macro 354 Text
 * @parent ---Macro 354---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 354 Name
 * @parent ---Macro 354---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 355---
 * @default
 *
 * @param Macro 355 Text
 * @parent ---Macro 355---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 355 Name
 * @parent ---Macro 355---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 356---
 * @default
 *
 * @param Macro 356 Text
 * @parent ---Macro 356---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 356 Name
 * @parent ---Macro 356---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 357---
 * @default
 *
 * @param Macro 357 Text
 * @parent ---Macro 357---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 357 Name
 * @parent ---Macro 357---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 358---
 * @default
 *
 * @param Macro 358 Text
 * @parent ---Macro 358---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 358 Name
 * @parent ---Macro 358---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 359---
 * @default
 *
 * @param Macro 359 Text
 * @parent ---Macro 359---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 359 Name
 * @parent ---Macro 359---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 360---
 * @default
 *
 * @param Macro 360 Text
 * @parent ---Macro 360---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 360 Name
 * @parent ---Macro 360---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 361---
 * @default
 *
 * @param Macro 361 Text
 * @parent ---Macro 361---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 361 Name
 * @parent ---Macro 361---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 362---
 * @default
 *
 * @param Macro 362 Text
 * @parent ---Macro 362---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 362 Name
 * @parent ---Macro 362---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 363---
 * @default
 *
 * @param Macro 363 Text
 * @parent ---Macro 363---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 363 Name
 * @parent ---Macro 363---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 364---
 * @default
 *
 * @param Macro 364 Text
 * @parent ---Macro 364---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 364 Name
 * @parent ---Macro 364---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 365---
 * @default
 *
 * @param Macro 365 Text
 * @parent ---Macro 365---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 365 Name
 * @parent ---Macro 365---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 366---
 * @default
 *
 * @param Macro 366 Text
 * @parent ---Macro 366---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 366 Name
 * @parent ---Macro 366---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 367---
 * @default
 *
 * @param Macro 367 Text
 * @parent ---Macro 367---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 367 Name
 * @parent ---Macro 367---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 368---
 * @default
 *
 * @param Macro 368 Text
 * @parent ---Macro 368---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 368 Name
 * @parent ---Macro 368---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 369---
 * @default
 *
 * @param Macro 369 Text
 * @parent ---Macro 369---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 369 Name
 * @parent ---Macro 369---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 370---
 * @default
 *
 * @param Macro 370 Text
 * @parent ---Macro 370---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 370 Name
 * @parent ---Macro 370---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 371---
 * @default
 *
 * @param Macro 371 Text
 * @parent ---Macro 371---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 371 Name
 * @parent ---Macro 371---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 372---
 * @default
 *
 * @param Macro 372 Text
 * @parent ---Macro 372---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 372 Name
 * @parent ---Macro 372---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 373---
 * @default
 *
 * @param Macro 373 Text
 * @parent ---Macro 373---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 373 Name
 * @parent ---Macro 373---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 374---
 * @default
 *
 * @param Macro 374 Text
 * @parent ---Macro 374---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 374 Name
 * @parent ---Macro 374---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 375---
 * @default
 *
 * @param Macro 375 Text
 * @parent ---Macro 375---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 375 Name
 * @parent ---Macro 375---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 376---
 * @default
 *
 * @param Macro 376 Text
 * @parent ---Macro 376---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 376 Name
 * @parent ---Macro 376---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 377---
 * @default
 *
 * @param Macro 377 Text
 * @parent ---Macro 377---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 377 Name
 * @parent ---Macro 377---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 378---
 * @default
 *
 * @param Macro 378 Text
 * @parent ---Macro 378---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 378 Name
 * @parent ---Macro 378---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 379---
 * @default
 *
 * @param Macro 379 Text
 * @parent ---Macro 379---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 379 Name
 * @parent ---Macro 379---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 380---
 * @default
 *
 * @param Macro 380 Text
 * @parent ---Macro 380---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 380 Name
 * @parent ---Macro 380---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 381---
 * @default
 *
 * @param Macro 381 Text
 * @parent ---Macro 381---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 381 Name
 * @parent ---Macro 381---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 382---
 * @default
 *
 * @param Macro 382 Text
 * @parent ---Macro 382---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 382 Name
 * @parent ---Macro 382---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 383---
 * @default
 *
 * @param Macro 383 Text
 * @parent ---Macro 383---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 383 Name
 * @parent ---Macro 383---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 384---
 * @default
 *
 * @param Macro 384 Text
 * @parent ---Macro 384---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 384 Name
 * @parent ---Macro 384---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 385---
 * @default
 *
 * @param Macro 385 Text
 * @parent ---Macro 385---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 385 Name
 * @parent ---Macro 385---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 386---
 * @default
 *
 * @param Macro 386 Text
 * @parent ---Macro 386---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 386 Name
 * @parent ---Macro 386---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 387---
 * @default
 *
 * @param Macro 387 Text
 * @parent ---Macro 387---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 387 Name
 * @parent ---Macro 387---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 388---
 * @default
 *
 * @param Macro 388 Text
 * @parent ---Macro 388---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 388 Name
 * @parent ---Macro 388---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 389---
 * @default
 *
 * @param Macro 389 Text
 * @parent ---Macro 389---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 389 Name
 * @parent ---Macro 389---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 390---
 * @default
 *
 * @param Macro 390 Text
 * @parent ---Macro 390---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 390 Name
 * @parent ---Macro 390---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 391---
 * @default
 *
 * @param Macro 391 Text
 * @parent ---Macro 391---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 391 Name
 * @parent ---Macro 391---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 392---
 * @default
 *
 * @param Macro 392 Text
 * @parent ---Macro 392---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 392 Name
 * @parent ---Macro 392---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 393---
 * @default
 *
 * @param Macro 393 Text
 * @parent ---Macro 393---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 393 Name
 * @parent ---Macro 393---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 394---
 * @default
 *
 * @param Macro 394 Text
 * @parent ---Macro 394---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 394 Name
 * @parent ---Macro 394---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 395---
 * @default
 *
 * @param Macro 395 Text
 * @parent ---Macro 395---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 395 Name
 * @parent ---Macro 395---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 396---
 * @default
 *
 * @param Macro 396 Text
 * @parent ---Macro 396---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 396 Name
 * @parent ---Macro 396---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 397---
 * @default
 *
 * @param Macro 397 Text
 * @parent ---Macro 397---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 397 Name
 * @parent ---Macro 397---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 398---
 * @default
 *
 * @param Macro 398 Text
 * @parent ---Macro 398---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 398 Name
 * @parent ---Macro 398---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 399---
 * @default
 *
 * @param Macro 399 Text
 * @parent ---Macro 399---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 399 Name
 * @parent ---Macro 399---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 400---
 * @default
 *
 * @param Macro 400 Text
 * @parent ---Macro 400---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 400 Name
 * @parent ---Macro 400---
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

Yanfly.Parameters = PluginManager.parameters('YEP_X_MessageMacros4');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.MacroMax = 400;
for (Yanfly.i = 301; Yanfly.i < Yanfly.Param.MacroMax + 1; ++Yanfly.i) {
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