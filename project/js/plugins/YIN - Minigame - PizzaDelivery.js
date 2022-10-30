//-----------------------------------------------------------------------------
// OMORI Minigame - Pizza Delivery
//-----------------------------------------------------------------------------

Game_Interpreter.prototype.initPizzaDelivery = function () {
    ImageManager.loadPicture("PIZZA-Background");
    ImageManager.loadAtlas("MN_PizzaItems");

    $gameSystem._chosenHouses = [];
    $gameSystem._checkedHouses = [];

    var _pizzaHouse1 = this.generateHouse(1);
    var _pizzaHouse2 = this.generateHouse(2);
    var _pizzaHouse3 = this.generateHouse(3);

    this._pizzaHouse1 = _pizzaHouse1;
    this._pizzaHouse2 = _pizzaHouse2;
    this._pizzaHouse3 = _pizzaHouse3;

    // this.checkImages();
}

Game_Interpreter.prototype.checkImages = function () {
    var houseText = this.houseHints();
    for (var i = 1; i < 37; i++) {
        // console.log(houseText[i]);
        for (var j = 0; j < houseText[i].length; j++) {
            // console.log(houseText[i][j]);
            text = houseText[i][j];
            text = text.split(" ");
            for (var word = 0; word < text.length; word++) {
                ImageManager.loadPicture('PIZZA-' + text[word]);
            }
        }
    }
}

Game_Interpreter.prototype.houseHints = function () {
    return LanguageManager.getMessageData("XX_BLUE.Yin_Pizza_Delivery").houseHints
}

Game_Interpreter.prototype.generateHouse = function (neighborhood) {
    var neighborhoodHouses = {
        1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        2: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        3: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
    }

    var houseHintsPt1 = this.houseHints();
    var chosenHouse = $gameSystem.randomizeArray(neighborhoodHouses[neighborhood])[0];

    while (!chosenHouse || $gameSystem._chosenHouses.contains(chosenHouse)) {
        chosenHouse = $gameSystem.randomizeArray(neighborhoodHouses[neighborhood])[0];
    }
    // console.log(chosenHouse);


    $gameSystem._chosenHouses.push(chosenHouse);
    var wordPool = houseHintsPt1[chosenHouse];

    $gameSystem.randomizeArray(wordPool);
    var description1 = wordPool[0];
    wordPool.splice(0, 1);

    $gameSystem.randomizeArray(wordPool);
    var description2 = wordPool[0];
    wordPool.splice(0, 1);

    $gameSystem.pizza = [description1, description2];

    var partPool = LanguageManager.getMessageData("XX_BLUE.Yin_Pizza_Delivery").partPool.slice()

    $gameSystem.randomizeArray(partPool);
    var part = partPool[0];
    let desLink = LanguageManager.getMessageData("XX_BLUE.Yin_Pizza_Delivery").descriptionLink
    var text = part + $gameSystem.pizza[0] + desLink + $gameSystem.pizza[1];
    let theNo = LanguageManager.getMessageData("XX_BLUE.Yin_Pizza_Delivery").theNo
    if (text.contains(theNo[0])) {
        text = text.replace(theNo[0], theNo[1]);
    }

    return text;
}

Game_Interpreter.prototype.showPizzaNote = function (text) {
    AudioManager.playSe({name: 'GEN_mess_paper', volume: 100, pitch: 100})
    if (text === 0) text = this._pizzaHouse1;
    if (text === 1) text = this._pizzaHouse2;
    if (text === 2) text = this._pizzaHouse3;

    var note = SceneManager._scene._pizzaNote = new Window_PizzaDeliveryNote(text);
    SceneManager._scene.addChild(note);
}

Game_Interpreter.prototype.correctHouse = function (houseID) {
    if (houseID === $gameSystem._chosenHouses[$gameVariables.value(817)]) return true;
    return false;
}

Game_Interpreter.prototype.checkedHouseAlready = function () {
    if (!$gameSystem._checkedHouses.contains($gameVariables.value(822))) {
        $gameSystem._checkedHouses.push($gameVariables.value(822));
        return false;
    }
    return true;
}

Game_Interpreter.prototype.checkingCurrentHouse = function (houseID) {
    $gameVariables.setValue(822, houseID);
}

//=============================================================================
//
//=============================================================================
Game_System.prototype.randomizeArray = function (array) {
    if (!array) return;
    var curElement = array.length;
    var temp;
    var randomizedLoc;
    while (0 !== curElement) {
        randomizedLoc = Math.floor(Math.random() * curElement);
        curElement -= 1;
        temp = array[curElement];
        array[curElement] = array[randomizedLoc];
        array[randomizedLoc] = temp;
    };
    return array;
}

//=============================================================================
//
//=============================================================================
function Window_PizzaDeliveryNote() {
    this.initialize.apply(this, arguments);
}

Window_PizzaDeliveryNote.prototype = Object.create(Window_Base.prototype);
Window_PizzaDeliveryNote.prototype.constructor = Window_PizzaDeliveryNote;

Window_PizzaDeliveryNote.prototype.initialize = function (text) {
    var x = (Graphics.boxWidth - this.windowWidth()) / 2;
    var y = (Graphics.boxHeight - this.windowHeight()) / 3;
    Window_Base.prototype.initialize.call(this, x, y, this.windowWidth(), this.windowHeight());
    this.opacity = 0;
    this.refresh(text);
};

Window_PizzaDeliveryNote.prototype.standardPadding = function () {
    return 0;
}

Window_PizzaDeliveryNote.prototype.refresh = function (text) {
    this.contents.clear();
    this.visible = true;
    var bitmap = ImageManager.loadPicture('PIZZA-Background');
    this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0);
    text = text.split(" ");
    // console.log(text);
    var nextX = 24;
    var nextY = 32;
    for (var i = 0; i < text.length; i++) {
        var bitmap = ImageManager.loadPicture('PIZZA-' + text[i]);
        if (nextX + bitmap.width > 580) {
            nextX = 24;
            nextY += 64;
        }
        this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, nextX, nextY);
        nextX = nextX + bitmap.width + 20;
    }
}

Window_PizzaDeliveryNote.prototype.update = function () {
    Window_Base.prototype.update.call(this);
    if (Input.isTriggered("ok")) {
        this.closeNote();
    }
}

Window_PizzaDeliveryNote.prototype.windowWidth = function () {
    return Graphics.boxWidth - 20;
};

Window_PizzaDeliveryNote.prototype.windowHeight = function () {
    return Graphics.boxHeight - 40;
};

Window_PizzaDeliveryNote.prototype.closeNote = function () {
    this.close();
    this.visible = false;
    SceneManager._scene.removeChild(SceneManager._scene._pizzaNote);
}

var yin_updateCallMenu = Scene_Map.prototype.updateCallMenu;
Scene_Map.prototype.updateCallMenu = function () {
    if ($gamePlayer.canMove() && this.isMenuCalled() && $gameSwitches.value(818)) {
        if ((SceneManager._scene._pizzaNote && !SceneManager._scene._pizzaNote.visible)) {
            SceneManager._scene._pizzaNote.closeNote();
            $gameMap._interpreter.showPizzaNote($gameVariables.value(817));
            return;
        } else if (!SceneManager._scene._pizzaNote) {
            $gameMap._interpreter.showPizzaNote($gameVariables.value(817));
        }
    } else {
        yin_updateCallMenu.apply(this);
    }
}

var yin_Pizza_moveByInput = Game_Player.prototype.moveByInput;
Game_Player.prototype.moveByInput = function () {
    if (SceneManager._scene._pizzaNote && SceneManager._scene._pizzaNote.visible) return;
    yin_Pizza_moveByInput.call(this);
};

Game_Character.prototype.getRandomNPCGraphic = function () {
    this._opacity = 0;
    this._characterName = $gameSystem.randomizeArray(["FA_PizzaPeople_01", "FA_PizzaPeople_02"])[0];
    this._characterIndex = $gameSystem.randomizeArray([0, 1, 2, 3, 4, 5, 6, 7])[0];
    var frame = 1;
    this._direction = 2;
    this._pattern = this._originalPattern = frame % 3;
    this._priorityType = 2;
}
