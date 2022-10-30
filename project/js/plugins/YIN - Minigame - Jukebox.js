//-----------------------------------------------------------------------------
// OMORI Minigame - Jukebox
//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
// Show Choice Edits
//-----------------------------------------------------------------------------
var yin_GameInterpreter_setupChoicesJukebox = Game_Interpreter.prototype.setupChoices;
Game_Interpreter.prototype.setupChoices = function (params) {
    if ($gameSystem._jukeboxList) console.log($gameSystem._jukeboxList.filter(function(x) { console.log(x, params[0][0]); return params[0][0] == x}));
    if (params[0][0] === "JukeboxList" || ($gameSystem._jukeboxList && $gameSystem._jukeboxList.contains(params[0][0]))) {
        params[0] = [];
        params[0] = params[0].concat($gameSystem._jukeboxList);
        if (!params[0].contains(["NEVERMIND, NEVERMIND"]) || params[0].contains(['farawaytown_extras_pizzaminigame.message_17', 'farawaytown_extras_pizzaminigame.message_17'])) {
            //console.log("PUSH NEVERMIND");
            params[0].push(['farawaytown_extras_pizzaminigame.message_17', 'farawaytown_extras_pizzaminigame.message_17']);
        }
        console.log(params[0]);
    }
    yin_GameInterpreter_setupChoicesJukebox.call(this, params);
};


//=============================================================================
// Window_ChoiceList Edits
//=============================================================================
var yin_WindowChoiceList_callOkHandlerJukebox = Window_ChoiceList.prototype.callOkHandler;
Window_ChoiceList.prototype.callOkHandler = function () {
    if ($gameSystem._jukeboxOn) {
        const loc_nevermind = LanguageManager.getMessageData('farawaytown_extras_pizzaminigame.message_17').text
        if (this._list[this.index()].name == loc_nevermind) {
            $gameMap._interpreter.command115();
        } else {
            console.log(LanguageManager.getMessageData($gameSystem._jukeboxList[this.index()][0]).text);
            if (LanguageManager.getMessageData($gameSystem._jukeboxList[this.index()][0]).text == "jb_omniboi") { // CHILL CD volume
                var bgm = {
                    name: LanguageManager.getMessageData($gameSystem._jukeboxList[this.index()][0]).text,
                    volume: 90,
                    pitch: 100,
                    pan: 0
                };
            } else {
                var bgm = {
                    name: LanguageManager.getMessageData($gameSystem._jukeboxList[this.index()][0]).text,
                    volume: 100,
                    pitch: 100,
                    pan: 0
                };
            }
            AudioManager.playBgm(bgm);
        }
        $gameSystem._jukeboxOn = false;
    }
    yin_WindowChoiceList_callOkHandlerJukebox.call(this);
};

var yin_WindowChoiceList_makeCommandListJukebox = Window_ChoiceList.prototype.makeCommandList;
Window_ChoiceList.prototype.makeCommandList = function () {
    if ($gameSystem._jukeboxOn) {
        for (var i = 0; i < $gameMessage.choices().length; i++) {
            if ($gameMessage.choices()[i][0].contains("farawaytown_")) {               
                var item = LanguageManager.getMessageData($gameMessage.choices()[i][1]).text;
                $gameMessage.choices()[i] = item.toUpperCase();
            }
        }
    }
    yin_WindowChoiceList_makeCommandListJukebox.call(this);
};

var yin_WindowChoiceList_numVisibleRowsJukebox = Window_ChoiceList.prototype.numVisibleRows;
Window_ChoiceList.prototype.numVisibleRows = function () {
    if ($gameSystem._jukeboxOn) {
        var choices = $gameMessage.choices();
        var numLines = choices.length > 11 ? 11 : choices.length;
        return numLines;
    }
    return yin_WindowChoiceList_numVisibleRowsJukebox.call(this);
};

var yin_Window_ChoiceList_maxChoiceWidth = Window_ChoiceList.prototype.maxChoiceWidth;
Window_ChoiceList.prototype.maxChoiceWidth = function () {
    if ($gameSystem._jukeboxOn) {
        var maxWidth = 96;
        var choices = $gameMessage.choices();
        
        for (var i = 0; i < choices.length; i++) {
            if ($gameMessage.choices()[i][0].contains("farawaytown_")) {
                var choiceWidth = this.textWidthEx(LanguageManager.getMessageData(choices[i][1]).text) + this.textPadding() * 2;
            } else {
                //console.log(choices[i]);
               var choiceWidth = this.textWidthEx(choices[i]) + this.textPadding() * 2;
            }          
            if (maxWidth < choiceWidth) {
                maxWidth = choiceWidth;
            }
        }
        return maxWidth + 32 + this.textPadding();
    } else {
        return yin_Window_ChoiceList_maxChoiceWidth.call(this);
    }
};

//=============================================================================
// Game_System Edits and Additions
//=============================================================================
var yin_GameSystem_initializeJukebox = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    yin_GameSystem_initializeJukebox.call(this);
    this._jukeboxListFull = { // All CD Items
        // Format: CD Item ID (For checking if the player has the CD):[language file to the filename (To play the correct song based on the item), language file to the song name (for the choice list)]
        198: ['sidequest_farawaytown_ginojukebox.message_20', 'sidequest_farawaytown_ginojukebox.message_200'], 
        199: ['sidequest_farawaytown_ginojukebox.message_21', 'sidequest_farawaytown_ginojukebox.message_201'], 
        200: ['sidequest_farawaytown_ginojukebox.message_22', 'sidequest_farawaytown_ginojukebox.message_202'],
        201: ['sidequest_farawaytown_ginojukebox.message_23', 'sidequest_farawaytown_ginojukebox.message_203'], 
        202: ['sidequest_farawaytown_ginojukebox.message_24', 'sidequest_farawaytown_ginojukebox.message_204'], 
        203: ['sidequest_farawaytown_ginojukebox.message_25', 'sidequest_farawaytown_ginojukebox.message_205'], 
        204: ['sidequest_farawaytown_ginojukebox.message_26', 'sidequest_farawaytown_ginojukebox.message_206'], 
        205: ['sidequest_farawaytown_ginojukebox.message_27', 'sidequest_farawaytown_ginojukebox.message_207'], 
        206: ['sidequest_farawaytown_ginojukebox.message_28', 'sidequest_farawaytown_ginojukebox.message_208'], 
        207: ['sidequest_farawaytown_ginojukebox.message_29', 'sidequest_farawaytown_ginojukebox.message_209'], 
        208: ['sidequest_farawaytown_ginojukebox.message_30', 'sidequest_farawaytown_ginojukebox.message_210'], 
        209: ['sidequest_farawaytown_ginojukebox.message_31', 'sidequest_farawaytown_ginojukebox.message_211'], 
        210: ['sidequest_farawaytown_ginojukebox.message_32', 'sidequest_farawaytown_ginojukebox.message_212']
    };
    this._jukeboxList = [];
}

Game_System.prototype.addJukeboxItem = function(songID) {
    this._jukeboxList.push(this._jukeboxListFull[songID]);
    $gameParty.gainItem($dataItems[songID], -1)
    var jukeboxCDs = [ // IDs of CD items (in the database)
        198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210
    ];
    if (this._jukeboxList.length >= jukeboxCDs.length){
        $gameSystem.unlockAchievement("MUSIC_CONNOISSEUR_OF_SORTS")
    }
}

Game_System.prototype.playerHasCD = function() {
    var jukeboxCDs = [ // IDs of CD items (in the database)
        198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210
    ];
    var cdsInInventory = [];
    for (var i = 0; i < jukeboxCDs.length; i++) {
        if ($gameParty.hasItem($dataItems[jukeboxCDs[i]])) {
            cdsInInventory.push($dataItems[jukeboxCDs[i]].id);
            $gameVariables.setValue(829, $dataItems[jukeboxCDs[i]].name);
            $gameVariables.setValue(830, $dataItems[jukeboxCDs[i]].id);
        }
    }
    return cdsInInventory;
}
