//-----------------------------------------------------------------------------
// OMORI Minigame - Home Alone
//-----------------------------------------------------------------------------
//----------------------------------------------------------------------------
// Show Choice Edits
//----------------------------------------------------------------------------
var yin_GameInterpreter_setupChoices = Game_Interpreter.prototype.setupChoices;
Game_Interpreter.prototype.setupChoices = function (params) {
    if ($gameSystem._washingDishes) {
        if (params[0][0] === "DishList" || $gameSystem._washingDishes) {
            params[0] = $gameSystem._dishList;
        }
    }
    yin_GameInterpreter_setupChoices.call(this, params);
};


//=============================================================================
// Window_ChoiceList Edits
//=============================================================================
var yin_WindowChoiceList_callOkHandler = Window_ChoiceList.prototype.callOkHandler;
Window_ChoiceList.prototype.callOkHandler = function () {
    if ($gameSystem._washingDishes) {
        $gameVariables.setValue(806, LanguageManager.getMessageData($gameSystem._dishList[this.index()]).text.replace('[S]', '').toUpperCase());
        $gameVariables.setValue(807, this.index());
    }
    yin_WindowChoiceList_callOkHandler.call(this);
};

var yin_WindowChoiceList_makeCommandList = Window_ChoiceList.prototype.makeCommandList;
Window_ChoiceList.prototype.makeCommandList = function () {
    if ($gameSystem._washingDishes) {
        for (var i = 0; i < $gameMessage.choices().length; i++) {
            if ($gameMessage.choices()[i].contains("farawaytown_")) {
                var item = LanguageManager.getMessageData($gameMessage.choices()[i]).text.replace('[S]', '').toUpperCase();
                $gameMessage.choices()[i] = item;
            }
        }
    }
    yin_WindowChoiceList_makeCommandList.call(this);
};

var yin_Window_ChoiceList_home_maxChoiceWidth = Window_ChoiceList.prototype.maxChoiceWidth;
Window_ChoiceList.prototype.maxChoiceWidth = function () {
    if ($gameSystem._washingDishes) {
        var maxWidth = 96;
        var choices = $gameMessage.choices();

        for (var i = 0; i < choices.length; i++) {
            if (choices[i].contains("farawaytown_")) {
                choices[i] = LanguageManager.getMessageData(choices[i]).text.replace('[S]', '').toUpperCase();
            }
            var choiceWidth = this.textWidthEx(choices[i]) + this.textPadding() * 2;
            if (maxWidth < choiceWidth) {
                maxWidth = choiceWidth;
            }
        }
        return maxWidth + 40;
    } else {
        return yin_Window_ChoiceList_home_maxChoiceWidth.call(this);
    }
};

var yin_WindowChoiceList_numVisibleRows = Window_ChoiceList.prototype.numVisibleRows;
Window_ChoiceList.prototype.numVisibleRows = function () {
    if ($gameSystem._washingDishes) {
        var choices = $gameMessage.choices();
        var numLines = choices.length > 11 ? 11 : choices.length;
        return numLines;
    }
    return yin_WindowChoiceList_numVisibleRows.call(this);
};

var yin_WindowChoiceList_home_refreshArrows = Window_ChoiceList.prototype._refreshArrows;
Window_ChoiceList.prototype._refreshArrows = function() {
    yin_WindowChoiceList_home_refreshArrows.call(this);
    if ($gameSystem._washingDishes) {
        this._downArrowSprite.move(this.width - 16, this.height - 12);
        this._upArrowSprite.move(this.width - 16, 12);
    }
}

//=============================================================================
// Game_System Edits and Additions
//=============================================================================
var yin_GameSystem_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    yin_GameSystem_initialize.call(this);
    this._washingDishes = false;
    this._dishList = ['farawaytown_extras_misc.message_32', 'farawaytown_extras_misc.message_33', 
                      'farawaytown_extras_misc.message_34', 'farawaytown_extras_misc.message_35', 
                      'farawaytown_extras_misc.message_36', 'farawaytown_extras_misc.message_37', 
                      'farawaytown_extras_misc.message_39', 'farawaytown_extras_misc.message_40', 
                      'farawaytown_extras_misc.message_41', 'farawaytown_extras_misc.message_42', 
                      'farawaytown_extras_misc.message_43', 'farawaytown_extras_misc.message_44', 
                      'farawaytown_extras_misc.message_45'];
    this.shuffleDishList();

    this._bigBox = [
        // Toys
        'farawaytown_extras_misc.message_140', 'farawaytown_extras_misc.message_141', 'farawaytown_extras_misc.message_142', 'farawaytown_extras_misc.message_143', 'farawaytown_extras_misc.message_144', 'farawaytown_extras_misc.message_145',
        'farawaytown_extras_misc.message_146', 'farawaytown_extras_misc.message_147', 'farawaytown_extras_misc.message_148', 'farawaytown_extras_misc.message_149', 'farawaytown_extras_misc.message_150', 'farawaytown_extras_misc.message_151',
        'farawaytown_extras_misc.message_152', 'farawaytown_extras_misc.message_153', 'farawaytown_extras_misc.message_154', 'farawaytown_extras_misc.message_155',
        // Books
        'farawaytown_extras_misc.message_157', 'farawaytown_extras_misc.message_160', 'farawaytown_extras_misc.message_161', 
        'farawaytown_extras_misc.message_162', 'farawaytown_extras_misc.message_164', 'farawaytown_extras_misc.message_165', 
        'farawaytown_extras_misc.message_167', 'farawaytown_extras_misc.message_170',
        // Trash
        'farawaytown_extras_misc.message_171', 'farawaytown_extras_misc.message_172', 'farawaytown_extras_misc.message_173', 
        'farawaytown_extras_misc.message_174', 'farawaytown_extras_misc.message_175'
    ]
    this._toyBox = [];
    this._bookBox = [];
    this._trashBox = [];
}

Game_System.prototype.shuffleDishList = function () {
    var curElement = this._dishList.length;
    var temp;
    var randomizedLoc;

    while (0 !== curElement) {
        randomizedLoc = Math.floor(Math.random() * curElement);
        curElement -= 1;
        temp = this._dishList[curElement];
        this._dishList[curElement] = this._dishList[randomizedLoc];
        this._dishList[randomizedLoc] = temp;
    }
}

Game_System.prototype.shuffleSortingObjects = function () {
    var curElement = this._bigBox.length;
    var temp;
    var randomizedLoc;

    while (0 !== curElement) {
        randomizedLoc = Math.floor(Math.random() * curElement);
        curElement -= 1;
        temp = this._bigBox[curElement];
        this._bigBox[curElement] = this._bigBox[randomizedLoc];
        this._bigBox[randomizedLoc] = temp;
    }
    $gameVariables.setValue(810, LanguageManager.getMessageData(this._bigBox[0]).text.replace(/\[BOOK]|\[TOY]|\[TRASH]/i, '').toUpperCase());
}

Game_System.prototype.calculateSortingPercentage = function() {
    var amountOfToys = 0;
    var amountOfBooks = 0;
    var amountOfTrash = 0;

    var toysInToyBox = 0;
    var booksInBookBox = 0;
    var trashInTrashBox = 0;
    // Get all toys
    for (var i = 0; i < this._toyBox.length; i++) {
        if (LanguageManager.getMessageData(this._toyBox[i]).text.contains('[TOY]')) {
            amountOfToys++;
            toysInToyBox++;
        }
    }
    for (var i = 0; i < this._trashBox.length; i++) {
        if (LanguageManager.getMessageData(this._trashBox[i]).text.contains('[TOY]')) amountOfToys++;
    }
    for (var i = 0; i < this._bookBox.length; i++) {
        if (LanguageManager.getMessageData(this._bookBox[i]).text.contains('[TOY]')) amountOfToys++;
    }

    // Get all books
    for (var i = 0; i < this._toyBox.length; i++) {
        if (LanguageManager.getMessageData(this._toyBox[i]).text.contains('[BOOK]')) amountOfBooks++;
    }
    for (var i = 0; i < this._trashBox.length; i++) {
        if (LanguageManager.getMessageData(this._trashBox[i]).text.contains('[BOOK]')) amountOfBooks++;
    }
    for (var i = 0; i < this._bookBox.length; i++) {
        if (LanguageManager.getMessageData(this._bookBox[i]).text.contains('[BOOK]')) {
            amountOfBooks++;
            booksInBookBox++;
        }
    }
    
    // Get all trash
    for (var i = 0; i < this._toyBox.length; i++) {
        if (LanguageManager.getMessageData(this._toyBox[i]).text.contains('[TRASH]')) amountOfTrash++;
    }
    for (var i = 0; i < this._trashBox.length; i++) {
        if (LanguageManager.getMessageData(this._trashBox[i]).text.contains('[TRASH]')) {
            amountOfTrash++;
            trashInTrashBox++;
        }
    }
    for (var i = 0; i < this._bookBox.length; i++) {
        if (LanguageManager.getMessageData(this._bookBox[i]).text.contains('[TRASH]')) amountOfTrash++;
    }

    var amountOfEverything = amountOfToys + amountOfBooks + amountOfTrash;
    var amountInCorrectPlace = toysInToyBox + booksInBookBox + trashInTrashBox;
    var percentageOfCorrect = amountInCorrectPlace / amountOfEverything * 100;
    // console.log('TOTAL - ' + percentageOfCorrect + '%');
    var percentageOfToysCorrect = toysInToyBox / amountOfToys * 100;
    // console.log('TOYS - ' + percentageOfToysCorrect + '%');
    var percentageOfBooksCorrect = booksInBookBox / amountOfBooks * 100;
    // console.log('BOOKS - ' + percentageOfBooksCorrect + '%');
    var percentageOfTrashCorrect = trashInTrashBox / amountOfTrash * 100;
    // console.log('TRASH - ' + percentageOfTrashCorrect + '%');

    $gameVariables.setValue(809, percentageOfCorrect);
}

Game_System.prototype.distributeItems = function() { // FOR TESTING!!! Auto sort the boxes randomly
    this._bigBox = [
        // Toys
        'farawaytown_extras_misc.message_140', 'farawaytown_extras_misc.message_141', 'farawaytown_extras_misc.message_142', 'farawaytown_extras_misc.message_143', 'farawaytown_extras_misc.message_144', 'farawaytown_extras_misc.message_145',
        'farawaytown_extras_misc.message_146', 'farawaytown_extras_misc.message_147', 'farawaytown_extras_misc.message_148', 'farawaytown_extras_misc.message_149', 'farawaytown_extras_misc.message_150', 'farawaytown_extras_misc.message_151',
        'farawaytown_extras_misc.message_152', 'farawaytown_extras_misc.message_153', 'farawaytown_extras_misc.message_154', 'farawaytown_extras_misc.message_155',
        // Books
        'farawaytown_extras_misc.message_156', 'farawaytown_extras_misc.message_157', 'farawaytown_extras_misc.message_158', 'farawaytown_extras_misc.message_159', 'farawaytown_extras_misc.message_160', 'farawaytown_extras_misc.message_161', 'farawaytown_extras_misc.message_162', 'farawaytown_extras_misc.message_163', 'farawaytown_extras_misc.message_164', 'farawaytown_extras_misc.message_165', 'farawaytown_extras_misc.message_166', 'farawaytown_extras_misc.message_167', 'farawaytown_extras_misc.message_168', 'farawaytown_extras_misc.message_169', 'farawaytown_extras_misc.message_170',
        // Trash
        'farawaytown_extras_misc.message_171', 'farawaytown_extras_misc.message_172', 'farawaytown_extras_misc.message_173', 'farawaytown_extras_misc.message_174', 'farawaytown_extras_misc.message_175'
    ]
    this._toyBox = [];
    this._bookBox = [];
    this._trashBox = [];

    var boxes = [this._toyBox, this._bookBox, this._trashBox];
    for (var i = 0; i < this._bigBox.length; i++) {
        var curElement = boxes.length;
        var temp;
        var randomizedLoc;

        while (0 !== curElement) {
            randomizedLoc = Math.floor(Math.random() * curElement);
            curElement -= 1;
            temp = boxes[curElement];
            boxes[curElement] = boxes[randomizedLoc];
            boxes[randomizedLoc] = temp;
        }
        boxes[0].push(this._bigBox[i]);
    }

    this._bigBox = [];
}


// var yin_chores_updateCallMenu = Scene_Map.prototype.updateCallMenu;
// Scene_Map.prototype.updateCallMenu = function () {
//     if (this.isMenuCalled() && $gameSwitches.value(814)) {
//         return;
//     } else {
//         yin_chores_updateCallMenu.apply(this);
//     }
// }