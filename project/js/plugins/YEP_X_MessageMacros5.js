//=============================================================================
// Yanfly Engine Plugins - Message Core Extension - Message Macros 5
// YEP_X_MessageMacros5.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_MessageMacros4 = true;

var Yanfly = Yanfly || {};
Yanfly.MsgMacro = Yanfly.MsgMacro || {};
Yanfly.MsgMacro.version = 1.01;

//=============================================================================
 /*:
 * @plugindesc v1.00 (Requires YEP_MessageCore.js) Adds macros 401 to 500
 * for your game's message system.
 * @author Yanfly Engine Plugins
 *
 * @param ---Macro 401---
 * @default
 *
 * @param Macro 401 Text
 * @parent ---Macro 401---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 401 Name
 * @parent ---Macro 401---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 402---
 * @default
 *
 * @param Macro 402 Text
 * @parent ---Macro 402---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 402 Name
 * @parent ---Macro 402---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 403---
 * @default
 *
 * @param Macro 403 Text
 * @parent ---Macro 403---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 403 Name
 * @parent ---Macro 403---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 404---
 * @default
 *
 * @param Macro 404 Text
 * @parent ---Macro 404---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 404 Name
 * @parent ---Macro 404---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 405---
 * @default
 *
 * @param Macro 405 Text
 * @parent ---Macro 405---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 405 Name
 * @parent ---Macro 405---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 406---
 * @default
 *
 * @param Macro 406 Text
 * @parent ---Macro 406---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 406 Name
 * @parent ---Macro 406---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 407---
 * @default
 *
 * @param Macro 407 Text
 * @parent ---Macro 407---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 407 Name
 * @parent ---Macro 407---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 408---
 * @default
 *
 * @param Macro 408 Text
 * @parent ---Macro 408---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 408 Name
 * @parent ---Macro 408---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 409---
 * @default
 *
 * @param Macro 409 Text
 * @parent ---Macro 409---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 409 Name
 * @parent ---Macro 409---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 410---
 * @default
 *
 * @param Macro 410 Text
 * @parent ---Macro 410---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 410 Name
 * @parent ---Macro 410---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 411---
 * @default
 *
 * @param Macro 411 Text
 * @parent ---Macro 411---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 411 Name
 * @parent ---Macro 411---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 412---
 * @default
 *
 * @param Macro 412 Text
 * @parent ---Macro 412---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 412 Name
 * @parent ---Macro 412---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 413---
 * @default
 *
 * @param Macro 413 Text
 * @parent ---Macro 413---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 413 Name
 * @parent ---Macro 413---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 414---
 * @default
 *
 * @param Macro 414 Text
 * @parent ---Macro 414---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 414 Name
 * @parent ---Macro 414---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 415---
 * @default
 *
 * @param Macro 415 Text
 * @parent ---Macro 415---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 415 Name
 * @parent ---Macro 415---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 416---
 * @default
 *
 * @param Macro 416 Text
 * @parent ---Macro 416---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 416 Name
 * @parent ---Macro 416---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 417---
 * @default
 *
 * @param Macro 417 Text
 * @parent ---Macro 417---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 417 Name
 * @parent ---Macro 417---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 418---
 * @default
 *
 * @param Macro 418 Text
 * @parent ---Macro 418---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 418 Name
 * @parent ---Macro 418---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 419---
 * @default
 *
 * @param Macro 419 Text
 * @parent ---Macro 419---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 419 Name
 * @parent ---Macro 419---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 420---
 * @default
 *
 * @param Macro 420 Text
 * @parent ---Macro 420---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 420 Name
 * @parent ---Macro 420---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 421---
 * @default
 *
 * @param Macro 421 Text
 * @parent ---Macro 421---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 421 Name
 * @parent ---Macro 421---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 422---
 * @default
 *
 * @param Macro 422 Text
 * @parent ---Macro 422---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 422 Name
 * @parent ---Macro 422---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 423---
 * @default
 *
 * @param Macro 423 Text
 * @parent ---Macro 423---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 423 Name
 * @parent ---Macro 423---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 424---
 * @default
 *
 * @param Macro 424 Text
 * @parent ---Macro 424---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 424 Name
 * @parent ---Macro 424---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 425---
 * @default
 *
 * @param Macro 425 Text
 * @parent ---Macro 425---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 425 Name
 * @parent ---Macro 425---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 426---
 * @default
 *
 * @param Macro 426 Text
 * @parent ---Macro 426---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 426 Name
 * @parent ---Macro 426---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 427---
 * @default
 *
 * @param Macro 427 Text
 * @parent ---Macro 427---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 427 Name
 * @parent ---Macro 427---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 428---
 * @default
 *
 * @param Macro 428 Text
 * @parent ---Macro 428---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 428 Name
 * @parent ---Macro 428---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 429---
 * @default
 *
 * @param Macro 429 Text
 * @parent ---Macro 429---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 429 Name
 * @parent ---Macro 429---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 430---
 * @default
 *
 * @param Macro 430 Text
 * @parent ---Macro 430---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 430 Name
 * @parent ---Macro 430---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 431---
 * @default
 *
 * @param Macro 431 Text
 * @parent ---Macro 431---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 431 Name
 * @parent ---Macro 431---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 432---
 * @default
 *
 * @param Macro 432 Text
 * @parent ---Macro 432---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 432 Name
 * @parent ---Macro 432---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 433---
 * @default
 *
 * @param Macro 433 Text
 * @parent ---Macro 433---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 433 Name
 * @parent ---Macro 433---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 434---
 * @default
 *
 * @param Macro 434 Text
 * @parent ---Macro 434---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 434 Name
 * @parent ---Macro 434---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 435---
 * @default
 *
 * @param Macro 435 Text
 * @parent ---Macro 435---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 435 Name
 * @parent ---Macro 435---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 436---
 * @default
 *
 * @param Macro 436 Text
 * @parent ---Macro 436---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 436 Name
 * @parent ---Macro 436---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 437---
 * @default
 *
 * @param Macro 437 Text
 * @parent ---Macro 437---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 437 Name
 * @parent ---Macro 437---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 438---
 * @default
 *
 * @param Macro 438 Text
 * @parent ---Macro 438---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 438 Name
 * @parent ---Macro 438---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 439---
 * @default
 *
 * @param Macro 439 Text
 * @parent ---Macro 439---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 439 Name
 * @parent ---Macro 439---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 440---
 * @default
 *
 * @param Macro 440 Text
 * @parent ---Macro 440---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 440 Name
 * @parent ---Macro 440---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 441---
 * @default
 *
 * @param Macro 441 Text
 * @parent ---Macro 441---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 441 Name
 * @parent ---Macro 441---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 442---
 * @default
 *
 * @param Macro 442 Text
 * @parent ---Macro 442---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 442 Name
 * @parent ---Macro 442---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 443---
 * @default
 *
 * @param Macro 443 Text
 * @parent ---Macro 443---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 443 Name
 * @parent ---Macro 443---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 444---
 * @default
 *
 * @param Macro 444 Text
 * @parent ---Macro 444---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 444 Name
 * @parent ---Macro 444---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 445---
 * @default
 *
 * @param Macro 445 Text
 * @parent ---Macro 445---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 445 Name
 * @parent ---Macro 445---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 446---
 * @default
 *
 * @param Macro 446 Text
 * @parent ---Macro 446---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 446 Name
 * @parent ---Macro 446---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 447---
 * @default
 *
 * @param Macro 447 Text
 * @parent ---Macro 447---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 447 Name
 * @parent ---Macro 447---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 448---
 * @default
 *
 * @param Macro 448 Text
 * @parent ---Macro 448---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 448 Name
 * @parent ---Macro 448---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 449---
 * @default
 *
 * @param Macro 449 Text
 * @parent ---Macro 449---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 449 Name
 * @parent ---Macro 449---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 450---
 * @default
 *
 * @param Macro 450 Text
 * @parent ---Macro 450---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 450 Name
 * @parent ---Macro 450---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 451---
 * @default
 *
 * @param Macro 451 Text
 * @parent ---Macro 451---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 451 Name
 * @parent ---Macro 451---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 452---
 * @default
 *
 * @param Macro 452 Text
 * @parent ---Macro 452---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 452 Name
 * @parent ---Macro 452---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 453---
 * @default
 *
 * @param Macro 453 Text
 * @parent ---Macro 453---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 453 Name
 * @parent ---Macro 453---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 454---
 * @default
 *
 * @param Macro 454 Text
 * @parent ---Macro 454---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 454 Name
 * @parent ---Macro 454---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 455---
 * @default
 *
 * @param Macro 455 Text
 * @parent ---Macro 455---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 455 Name
 * @parent ---Macro 455---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 456---
 * @default
 *
 * @param Macro 456 Text
 * @parent ---Macro 456---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 456 Name
 * @parent ---Macro 456---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 457---
 * @default
 *
 * @param Macro 457 Text
 * @parent ---Macro 457---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 457 Name
 * @parent ---Macro 457---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 458---
 * @default
 *
 * @param Macro 458 Text
 * @parent ---Macro 458---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 458 Name
 * @parent ---Macro 458---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 459---
 * @default
 *
 * @param Macro 459 Text
 * @parent ---Macro 459---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 459 Name
 * @parent ---Macro 459---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 460---
 * @default
 *
 * @param Macro 460 Text
 * @parent ---Macro 460---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 460 Name
 * @parent ---Macro 460---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 461---
 * @default
 *
 * @param Macro 461 Text
 * @parent ---Macro 461---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 461 Name
 * @parent ---Macro 461---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 462---
 * @default
 *
 * @param Macro 462 Text
 * @parent ---Macro 462---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 462 Name
 * @parent ---Macro 462---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 463---
 * @default
 *
 * @param Macro 463 Text
 * @parent ---Macro 463---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 463 Name
 * @parent ---Macro 463---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 464---
 * @default
 *
 * @param Macro 464 Text
 * @parent ---Macro 464---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 464 Name
 * @parent ---Macro 464---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 465---
 * @default
 *
 * @param Macro 465 Text
 * @parent ---Macro 465---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 465 Name
 * @parent ---Macro 465---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 466---
 * @default
 *
 * @param Macro 466 Text
 * @parent ---Macro 466---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 466 Name
 * @parent ---Macro 466---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 467---
 * @default
 *
 * @param Macro 467 Text
 * @parent ---Macro 467---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 467 Name
 * @parent ---Macro 467---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 468---
 * @default
 *
 * @param Macro 468 Text
 * @parent ---Macro 468---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 468 Name
 * @parent ---Macro 468---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 469---
 * @default
 *
 * @param Macro 469 Text
 * @parent ---Macro 469---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 469 Name
 * @parent ---Macro 469---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 470---
 * @default
 *
 * @param Macro 470 Text
 * @parent ---Macro 470---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 470 Name
 * @parent ---Macro 470---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 471---
 * @default
 *
 * @param Macro 471 Text
 * @parent ---Macro 471---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 471 Name
 * @parent ---Macro 471---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 472---
 * @default
 *
 * @param Macro 472 Text
 * @parent ---Macro 472---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 472 Name
 * @parent ---Macro 472---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 473---
 * @default
 *
 * @param Macro 473 Text
 * @parent ---Macro 473---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 473 Name
 * @parent ---Macro 473---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 474---
 * @default
 *
 * @param Macro 474 Text
 * @parent ---Macro 474---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 474 Name
 * @parent ---Macro 474---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 475---
 * @default
 *
 * @param Macro 475 Text
 * @parent ---Macro 475---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 475 Name
 * @parent ---Macro 475---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 476---
 * @default
 *
 * @param Macro 476 Text
 * @parent ---Macro 476---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 476 Name
 * @parent ---Macro 476---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 477---
 * @default
 *
 * @param Macro 477 Text
 * @parent ---Macro 477---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 477 Name
 * @parent ---Macro 477---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 478---
 * @default
 *
 * @param Macro 478 Text
 * @parent ---Macro 478---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 478 Name
 * @parent ---Macro 478---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 479---
 * @default
 *
 * @param Macro 479 Text
 * @parent ---Macro 479---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 479 Name
 * @parent ---Macro 479---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 480---
 * @default
 *
 * @param Macro 480 Text
 * @parent ---Macro 480---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 480 Name
 * @parent ---Macro 480---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 481---
 * @default
 *
 * @param Macro 481 Text
 * @parent ---Macro 481---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 481 Name
 * @parent ---Macro 481---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 482---
 * @default
 *
 * @param Macro 482 Text
 * @parent ---Macro 482---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 482 Name
 * @parent ---Macro 482---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 483---
 * @default
 *
 * @param Macro 483 Text
 * @parent ---Macro 483---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 483 Name
 * @parent ---Macro 483---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 484---
 * @default
 *
 * @param Macro 484 Text
 * @parent ---Macro 484---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 484 Name
 * @parent ---Macro 484---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 485---
 * @default
 *
 * @param Macro 485 Text
 * @parent ---Macro 485---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 485 Name
 * @parent ---Macro 485---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 486---
 * @default
 *
 * @param Macro 486 Text
 * @parent ---Macro 486---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 486 Name
 * @parent ---Macro 486---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 487---
 * @default
 *
 * @param Macro 487 Text
 * @parent ---Macro 487---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 487 Name
 * @parent ---Macro 487---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 488---
 * @default
 *
 * @param Macro 488 Text
 * @parent ---Macro 488---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 488 Name
 * @parent ---Macro 488---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 489---
 * @default
 *
 * @param Macro 489 Text
 * @parent ---Macro 489---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 489 Name
 * @parent ---Macro 489---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 490---
 * @default
 *
 * @param Macro 490 Text
 * @parent ---Macro 490---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 490 Name
 * @parent ---Macro 490---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 491---
 * @default
 *
 * @param Macro 491 Text
 * @parent ---Macro 491---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 491 Name
 * @parent ---Macro 491---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 492---
 * @default
 *
 * @param Macro 492 Text
 * @parent ---Macro 492---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 492 Name
 * @parent ---Macro 492---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 493---
 * @default
 *
 * @param Macro 493 Text
 * @parent ---Macro 493---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 493 Name
 * @parent ---Macro 493---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 494---
 * @default
 *
 * @param Macro 494 Text
 * @parent ---Macro 494---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 494 Name
 * @parent ---Macro 494---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 495---
 * @default
 *
 * @param Macro 495 Text
 * @parent ---Macro 495---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 495 Name
 * @parent ---Macro 495---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 496---
 * @default
 *
 * @param Macro 496 Text
 * @parent ---Macro 496---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 496 Name
 * @parent ---Macro 496---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 497---
 * @default
 *
 * @param Macro 497 Text
 * @parent ---Macro 497---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 497 Name
 * @parent ---Macro 497---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 498---
 * @default
 *
 * @param Macro 498 Text
 * @parent ---Macro 498---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 498 Name
 * @parent ---Macro 498---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 499---
 * @default
 *
 * @param Macro 499 Text
 * @parent ---Macro 499---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 499 Name
 * @parent ---Macro 499---
 * @desc When using \m[x], you use the name instead of the ID.
 * @default undefined
 *
 * @param ---Macro 500---
 * @default
 *
 * @param Macro 500 Text
 * @parent ---Macro 500---
 * @desc When using \m[x], this will appear when using this
 * number. Text codes can be used.
 * @default undefined
 *
 * @param Macro 500 Name
 * @parent ---Macro 500---
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

Yanfly.Parameters = PluginManager.parameters('YEP_X_MessageMacros5');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.MacroMax = 500;
for (Yanfly.i = 401; Yanfly.i < Yanfly.Param.MacroMax + 1; ++Yanfly.i) {
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