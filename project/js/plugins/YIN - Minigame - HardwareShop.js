//-----------------------------------------------------------------------------
// OMORI Minigame - Hardware Organization
//-----------------------------------------------------------------------------
Game_Interpreter.prototype.initializeHardwareOrganizing = function() {
    var shelf1 = [];
    var shelf2 = [];
    var shelf3 = [];
    var shelf4 = [];
    var shelf5 = [];
    var shelf6 = [];

    $gameSystem.shelves = [];
    $gameSystem.shelves.push(shelf1);
    $gameSystem.shelves.push(shelf2);
    $gameSystem.shelves.push(shelf3);
    $gameSystem.shelves.push(shelf4);
    $gameSystem.shelves.push(shelf5);
    $gameSystem.shelves.push(shelf6);

    $gameSystem.products = [
        0, 0, 0, 0, 0, 0,       // DRILL
        10, 10, 10, 10, 10, 10, // TAPE
        3, 3, 3, 3, 3, 3,       // SHOVEL
        4, 4, 4, 4, 4, 4,       // SAW
        6, 6, 6, 6, 6, 6,       // HAMMER
        7, 7, 7, 7, 7, 7        // WRENCH
    ];

    //console.log($gameSystem.shelves[5])

    var curElement = $gameSystem.products.length;
    var temp;
    var randomizedLoc;
    while (0 !== curElement) {
        randomizedLoc = Math.floor(Math.random() * curElement);
        curElement -= 1;
        temp = $gameSystem.products[curElement];
        $gameSystem.products[curElement] = $gameSystem.products[randomizedLoc];
        $gameSystem.products[randomizedLoc] = temp;
    };

    for (var i = 0; i < $gameSystem.shelves.length; i++) {
        var shelf = $gameSystem.shelves[i];
        for (var j = 0; j < 6; j++) {
            shelf.push($gameSystem.products[0]);
            $gameSystem.products.shift();
        }
    }
}

Game_Interpreter.prototype.placeTool = function() {
    var shelf = $gameVariables.value(812);
    for (var i = 0; i < $gameSystem.shelves[shelf].length; i++) {
        if ($gameSystem.shelves[shelf][i] === -1) { // First empty space
            // console.log($gameSystem.shelves[shelf][i]);
            //
            if ($gameVariables.value(815) === LanguageManager.getMessageData("farawaytown_extras_hardwareminigame.message_3").text) $gameSystem.shelves[shelf][i] = 0;
            else if ($gameVariables.value(815) === LanguageManager.getMessageData("farawaytown_extras_hardwareminigame.message_4").text) $gameSystem.shelves[shelf][i] = 10;
            else if ($gameVariables.value(815) === LanguageManager.getMessageData("farawaytown_extras_hardwareminigame.message_5").text) $gameSystem.shelves[shelf][i] = 3;
            else if ($gameVariables.value(815) === LanguageManager.getMessageData("farawaytown_extras_hardwareminigame.message_6").text) $gameSystem.shelves[shelf][i] = 4;
            else if ($gameVariables.value(815) === LanguageManager.getMessageData("farawaytown_extras_hardwareminigame.message_7").text) $gameSystem.shelves[shelf][i] = 6;
            else if ($gameVariables.value(815) === LanguageManager.getMessageData("farawaytown_extras_hardwareminigame.message_8").text) $gameSystem.shelves[shelf][i] = 7;
            break;
        }
    }
    this.checkHardwareOrganization();
    /*
    console.log("Current Shelf: " + $gameVariables.value(812),
        "Index: " + $gameVariables.value(814),
        "Selected Item: " + $gameVariables.value(815),
        "Currently Held Item: " + $gameVariables.value(813));*/
}

Game_Interpreter.prototype.replaceTool = function() {
    var shelf = $gameVariables.value(812);
    //
    if ($gameVariables.value(813) === LanguageManager.getMessageData("farawaytown_extras_hardwareminigame.message_3").text) $gameSystem.shelves[shelf][$gameVariables.value(814)] = 0;
    else if ($gameVariables.value(813) === LanguageManager.getMessageData("farawaytown_extras_hardwareminigame.message_4").text) $gameSystem.shelves[shelf][$gameVariables.value(814)] = 10;
    else if ($gameVariables.value(813) === LanguageManager.getMessageData("farawaytown_extras_hardwareminigame.message_5").text) $gameSystem.shelves[shelf][$gameVariables.value(814)] = 3;
    else if ($gameVariables.value(813) === LanguageManager.getMessageData("farawaytown_extras_hardwareminigame.message_6").text) $gameSystem.shelves[shelf][$gameVariables.value(814)] = 4;
    else if ($gameVariables.value(813) === LanguageManager.getMessageData("farawaytown_extras_hardwareminigame.message_7").text) $gameSystem.shelves[shelf][$gameVariables.value(814)] = 6;
    else if ($gameVariables.value(813) === LanguageManager.getMessageData("farawaytown_extras_hardwareminigame.message_8").text) $gameSystem.shelves[shelf][$gameVariables.value(814)] = 7;
    this.checkHardwareOrganization();
    /*console.log("REPLACING " +  "Current Shelf: " + $gameVariables.value(812),
    "Index: " + $gameVariables.value(814),
    "Selected Item: " + $gameVariables.value(815),
    "Currently Held Item: " + $gameVariables.value(813));*/
}

Game_Interpreter.prototype.returnTool = function() {
    for (var shelf = 0; shelf < $gameSystem.shelves.length; shelf++) {
        console.log(shelf);
        for (var i = 0; i < $gameSystem.shelves[shelf].length; i++) {
            if ($gameSystem.shelves[shelf][i] === -1) { // First empty space
                // console.log($gameSystem.shelves[shelf][i]);
                //
                if ($gameVariables.value(815) === LanguageManager.getMessageData("farawaytown_extras_hardwareminigame.message_3").text) $gameSystem.shelves[shelf][i] = 0;
                else if ($gameVariables.value(815) === LanguageManager.getMessageData("farawaytown_extras_hardwareminigame.message_4").text) $gameSystem.shelves[shelf][i] = 10;
                else if ($gameVariables.value(815) === LanguageManager.getMessageData("farawaytown_extras_hardwareminigame.message_5").text) $gameSystem.shelves[shelf][i] = 3;
                else if ($gameVariables.value(815) === LanguageManager.getMessageData("farawaytown_extras_hardwareminigame.message_6").text) $gameSystem.shelves[shelf][i] = 4;
                else if ($gameVariables.value(815) === LanguageManager.getMessageData("farawaytown_extras_hardwareminigame.message_7").text) $gameSystem.shelves[shelf][i] = 6;
                else if ($gameVariables.value(815) === LanguageManager.getMessageData("farawaytown_extras_hardwareminigame.message_8").text) $gameSystem.shelves[shelf][i] = 7;
                break;
            }
        }
    }

    $gameVariables.setValue(813, -1);
    $gameVariables.setValue(814, -1);
    $gameVariables.setValue(815, 0);
}

var yin_GameInterpreter_setupChoicesShop = Game_Interpreter.prototype.setupChoices;
Game_Interpreter.prototype.setupChoices = function (params) {
    if ($gameSwitches.value(804)) {

        if (params[0][0] === "Hardware Shelf") {
            var shelfNum = $gameVariables.value(812);
            var shelfProducts = [];
            for (var i = 0; i < $gameSystem.shelves[shelfNum].length; i++) {
                if ($gameSystem.shelves[shelfNum][i] === -1) continue;
                else if ($gameSystem.shelves[shelfNum][i] === 0) shelfProducts.push(LanguageManager.getMessageData("farawaytown_extras_hardwareminigame.message_3").text);
                else if ($gameSystem.shelves[shelfNum][i] === 10) shelfProducts.push(LanguageManager.getMessageData("farawaytown_extras_hardwareminigame.message_4").text);
                else if ($gameSystem.shelves[shelfNum][i] === 3) shelfProducts.push(LanguageManager.getMessageData("farawaytown_extras_hardwareminigame.message_5").text);
                else if ($gameSystem.shelves[shelfNum][i] === 4) shelfProducts.push(LanguageManager.getMessageData("farawaytown_extras_hardwareminigame.message_6").text);
                else if ($gameSystem.shelves[shelfNum][i] === 6) shelfProducts.push(LanguageManager.getMessageData("farawaytown_extras_hardwareminigame.message_7").text);
                else if ($gameSystem.shelves[shelfNum][i] === 7) shelfProducts.push(LanguageManager.getMessageData("farawaytown_extras_hardwareminigame.message_8").text);
            }

            // for (var i = 0; i < $gameSystem.shelves[shelfNum].length; i++) {
            //     console.log("Shelf " + shelfNum + " Contents: " + this.getToolName($gameSystem.shelves[shelfNum][i]));
            // }

            // console.log("Shelf " + shelfNum + " Options List: " + shelfProducts);
            shelfProducts.push(LanguageManager.getMessageData("farawaytown_extras_pizzaminigame.message_17").text);
        }

        var choices = shelfProducts ? shelfProducts : params[0].clone();
        var cancelType = params[1];
        var defaultType = params.length > 2 ? params[2] : 0;
        var positionType = params.length > 3 ? params[3] : 2;
        var background = params.length > 4 ? params[4] : 0;

        // console.log(choices);
        $gameMessage.setChoices(choices, defaultType, cancelType);
        $gameMessage.setChoiceBackground(background);
        $gameMessage.setChoicePositionType(positionType);
        $gameMessage.setChoiceCallback(function (n) {
            this._branch[this._indent] = n;
        }.bind(this));
    } else yin_GameInterpreter_setupChoicesShop.call(this, params);
};

Game_Interpreter.prototype.getToolName = function(id) {
    // console.log(id);
    if (id === -1) return "Nothing";
    else if (id === 0) return LanguageManager.getMessageData("farawaytown_extras_hardwareminigame.message_3").text;
    else if (id === 1) return LanguageManager.getMessageData("farawaytown_extras_hardwareminigame.message_4").text;
    else if (id === 3) return LanguageManager.getMessageData("farawaytown_extras_hardwareminigame.message_5").text;
    else if (id === 4) return LanguageManager.getMessageData("farawaytown_extras_hardwareminigame.message_6").text;
    else if (id === 6) return LanguageManager.getMessageData("farawaytown_extras_hardwareminigame.message_7").text;
    else if (id === 7) return LanguageManager.getMessageData("farawaytown_extras_hardwareminigame.message_8").text;
}

Game_Interpreter.prototype.checkHardwareOrganization = function() {
    for (var i = 0; i < $gameSystem.shelves.length; i++) {
        var shelf = $gameSystem.shelves[i];
        if (i === 0) var rightfulProduct = 0;
        if (i === 1) var rightfulProduct = 4;
        if (i === 2) var rightfulProduct = 10;
        if (i === 3) var rightfulProduct = 6;
        if (i === 4) var rightfulProduct = 3;
        if (i === 5) var rightfulProduct = 7;

        for (var j = 0; j < shelf.length; j++) {
            if (shelf[j] === rightfulProduct) {
                // console.log("Shelf " + i + ", Item " + j + ": TRUE");
                var result = true;
            } else {
                // console.log("Shelf " + i + ", Item " + j + ": FALSE");
                var result = false;
                j = shelf.length;
            }
        }
        if (!result) {
            break;
        }
        // console.log("Shelf " + i + result);
    }
    // console.log("Everything organized? " + result);
    return result;
};

//=============================================================================
// New Game_Character function for tools display
//=============================================================================
Game_Character.prototype.getToolGraphic = function (shelfItem) {
    if (shelfItem === 0) {
        var x = 0;
        var y = 0;
    } else if (shelfItem === 10) {
        var x = 1;
        var y = 3;
    } else if (shelfItem === 3) {
        var x = 0;
        var y = 1;
    } else if (shelfItem === 4) {
        var x = 1;
        var y = 1;
    } else if (shelfItem === 6) {
        var x = 0;
        var y = 2;
    } else if (shelfItem === 7) {
        var x = 1;
        var y = 2;
    }
    return this.setCustomFrameXY(x, y);
}
//=============================================================================
// Changes specific to the hardware shop minigame
//=============================================================================
var yin_WindowChoiceList_callOkHandlerShop = Window_ChoiceList.prototype.callOkHandler;
Window_ChoiceList.prototype.callOkHandler = function () {
    const loc_yes = LanguageManager.getMessageData("XX_GENERAL.message_4").text
    const loc_no = LanguageManager.getMessageData("XX_GENERAL.message_5").text
    const nevermind = LanguageManager.getMessageData("farawaytown_extras_pizzaminigame.message_17").text
    if ($gameSwitches.value(804) && this._list[this.index()].name !== loc_yes && this._list[this.index()].name !== loc_no) {
        if (this._list[this.index()].name === nevermind) {
            $gameMap._interpreter.command115();
        } else {
            $gameVariables.setValue(814, this.index());
            $gameVariables.setValue(815, this._list[this.index()].name);
        }
    }
    yin_WindowChoiceList_callOkHandlerShop.call(this);
};

var yin_WindowChoiceList_numVisibleRowsHardware = Window_ChoiceList.prototype.numVisibleRows;
Window_ChoiceList.prototype.numVisibleRows = function () {
    if ($gameSwitches.value(804)) {
        var choices = $gameMessage.choices();
        var numLines = choices.length > 7 ? 7 : choices.length;
        return numLines;
    }
    return yin_WindowChoiceList_numVisibleRowsHardware.call(this);
};
