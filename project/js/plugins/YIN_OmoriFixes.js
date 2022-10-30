//-----------------------------------------------------------------------------
// OMORI Fixes
//-----------------------------------------------------------------------------
//=============================================================================
// Longer fade after loading the game
//=============================================================================
Scene_Map.prototype.start = function() {
    Scene_Base.prototype.start.call(this);
    SceneManager.clearStack();
    if (SceneManager.isPreviousScene(Scene_OmoriFile)) {
        this.startFadeIn(this.fadeSpeed(), false);
    } else if (this._transfer) {
        this.fadeInForTransfer();
        this._mapNameWindow.open();
        $gameMap.autoplay();
    } else if (this.needsFadeIn()) {
        this.startFadeIn(this.fadeSpeed(), false);
    }
    this.menuCalling = false;
};

//-----------------------------------------------------------------------------
// Parallax Before Tiles on Load Fix (Overwritten)
//-----------------------------------------------------------------------------
Scene_Map.prototype.update = function() {
    this.updateDestination();
    this.updateMainMultiply();
    if (this.isSceneChangeOk()) {
        this.updateScene();
    } else if (SceneManager.isNextScene(Scene_Battle)) {
        this.updateEncounterEffect();
    }
    this.updateWaitCount();
    Scene_Base.prototype.update.call(this);
    if (!Yanfly._openedConsole) Yanfly.openConsole();
    this.updateCharacterTagInput();
};
//-----------------------------------------------------------------------------
// Emotion Elements Not Being Applied To Attacks Fix (Some Overwrites)
//-----------------------------------------------------------------------------
Game_Action.prototype.calcElementRate = function(target) {
    /*if (this.item().damage.elementId < 0) {
        return this.elementsMaxRate(target, this.subject().attackElements());
    } else {*/
        // YIN Instead of bypassing the subject's attack element, we want to use it if they are inflicted with an emotion.
        // If elementId == None or Normal Attack
        if (this.item().damage.elementId < 1) {
            // These are all base emotion states (non afraid)
            var emotionStates = [6, 7, 8, 10, 11, 12, 14, 15, 16];
            emotionStates = [...emotionStates, 119,120,121]; // Space Ex Boyfriend
            emotionStates = [...emotionStates, 122,123,197]; // Sweetheart
            emotionStates = [...emotionStates, 124,125,126]; // Unbread Twins
            // Search states for emotion states
            var emotionAfflicted;

            this.subject()._states.forEach(function(stateId) {
                // Do we have an emotion state on us?
                if (emotionStates.contains(stateId)) {
                    emotionAfflicted = true;
                }
            }, this);

            if (emotionAfflicted) {
                return target.elementRate(this.subject().attackElements()[0]); // If so, that is our attack element
            } else {
                return target.elementRate(this.item().damage.elementId);
            }
        } else {
        return target.elementRate(this.item().damage.elementId);
        }
    //}
};

//-----------------------------------------------------------------------------
// This allows an "effective/not effective" sound  
//-----------------------------------------------------------------------------
Game_Action.prototype.apply = function(target) {
    // Run Original Function
    _TDS_.OmoriBattleSystem.Game_Action_apply.call(this, target);
    // Get Result
    let result = target.result();
    // Check iff hit
    let hit = result.isHit();
  
    // If Hit
    if (hit) {
      // Get Element Rate
      let elementRate = this.calcElementRate(target);
  
      // Set elemental results
      result.elementStrong = elementRate > 1;
      result.elementWeak = elementRate < 1;
        if (result.hpDamage > 0) {
            if(!!result.critical) {
                AudioManager.playSe({ name: "BA_CRITICAL_HIT", volume: 250, pitch: 100, pan: 0});
            }
            else if (result.elementStrong) {
                AudioManager.playSe({ name: "se_impact_double", volume: 150, pitch: 100, pan: 0});
            } else if (result.elementWeak){
                AudioManager.playSe({ name: "se_impact_soft", volume: 150, pitch: 100, pan: 0});
            } else {
                SoundManager.playEnemyDamage();
            }
        }
    };

    // If Target is an enemy
    if (target.isEnemy()) {
        // Get Item
        let item = this.item();
        // If result was a hit
        if (hit) {
            // If scanning enemy
            if (item && item.meta.ScanEnemy && target.canScan()) {
                // Scan Enemy
                $gameParty.addScannedEnemy(target.enemyId());
            };
        };
    } else {
        // If result was a hit
        if (hit) {
            // If HP damage is more than 0
            if (result.hpDamage > 0) {
                // Increase Stress Count
                $gameParty.stressEnergyCount++;
            };
        };
    };
}

Yanfly.SVE.Game_Enemy_performDamage = Game_Enemy.prototype.performDamage;
Game_Enemy.prototype.performDamage = function() {
    if (!this.hasSVBattler()) {
      return Yanfly.SVE.Game_Enemy_performDamage.call(this);
    }
    Game_Battler.prototype.performDamage.call(this);
    if (this.isSpriteVisible()) {
      this.requestMotion(this.damageMotion());
    } else {
      $gameScreen.startShake(5, 5, 10);
    }
};

Game_Actor.prototype.performDamage = function() {
    Game_Battler.prototype.performDamage.call(this);
    if (this.isSpriteVisible()) {
        this.requestMotion('damage');
    } else {
        $gameScreen.startShake(5, 5, 10);
    }
};

//-----------------------------------------------------------------------------
// Bad Word Filter
//-----------------------------------------------------------------------------
var yinBadWords_init = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    yinBadWords_init.call(this);
    this._badWords = [ // Bad words should be all lowercase!
        // Bad Words
        "aids","anal","anus","areola","arse","ass","balls","bastard ","beaner","berk","biatch","bint","bitch",
        "blow","bogan","boner","boob","boom","breast","butt","cancer","chav","chink","clit","cocaine","cock",
        "coitus","commie","condom","coolie","coon","coomer","cracker","crap","crotch","cum","cunt","damn","ferro",
        "dago","dick","dildo","dilf","dong","drug","dumb","dyke","enema","erect","eskimo","fag","feck","fuck",
        "gay","gipsy","gfy","gook","gringo","gyp","hardon","heroin","herpes","hiv","hoe","hole","homo","honk",
        "hooker","horny","hymen","idiot","incest","injun","jap","jerkoff","jew","jigger ","jiz ","jizz","jock",
        "juggalo","kaffir","kafir","kigger","killer","kink","kkk","kock","koon","kotex","krap","kum","kunt",
        "lesbian","lesbo","loli","lsd","lube","lynch","mammy","meth","mick","milf","molest","mom","mong","moron",
        "muff","mulatto","muncher","munt","murder","muslim","nazi","negress ","negro","n1g","nlg","nig","nip",
        "nlgger","noonan","nooner","nuke","nut","oral","orga","orgies","orgy","oriental","paddy","pakeha","paki",
        "pansies","pansy","peni5","pen15","penis","perv","phuc","phuk","phuq","pi55","pimp","piss","playboy","pocha",
        "pocho","pohm","polack","poon","poop","porn","pu55i","pu55y","pube","puss","pygmy","quashie","queef","queer",
        "quim","racist","raghead","randy","rape","rapist","rectum","redneck","redskin","reefer","reestie","reject",
        "retard","rigger","rimjob","root","rump","russki","savage","scag","scat","schizo","schlong","screw","scrotum",
        "scrub","semen","sex","shag","shat","shit","skank","skum","slag","slant","slave","slut","smut","snatch","snot",
        "sodom","spade","spaz","sperm","spooge","spunk","squaw","strip","stupid","suicide","syphilis","tampon","tard",
        "teat","terrorist","teste","testicle","thot","tit","toilet","tramp","trannie","tranny","trojan","turd","twat","twink",
        "urine","uterus","vagina","vaginal","vibrate","virgin","vomit","vulva","wank","weenie","weewee","wetback",
        "whigger","whiskey","whitey","whore","wigger","willie","willy","wog","wop","wtf","wuss","xtc","xxx","yank",
        "yid","zigabo",
        // Names
        "aubrey","basil","bundy","gacy","hector","hero","hitler","jawsum","jinping","kel","kimjong","little","mari",
        "oj","osama","pluto","polly","putin","ripper","rococo","stalin","trump","zodiac",
        // Foreign Language Bad Words
        "puto","puta","cuck","mierda","pendejo","Nigga","Nibba","trap","perra","faggot","dilldoe","blacky","pniss",
        "biden","omori",
    ];
}

Window_OmoriInputLetters.prototype.onNameOk = function() {
    // Get Text
    var text = this._nameWindow.name();
    // If Text Length is more than 0
    if (text.length > 0) {
      if(text.toLowerCase() === "omocat") {
          $gameSystem.unlockAchievement("YOU_THINK_YOU_RE_CLEVER_HUH")
        }
      if (new RegExp($gameSystem._badWords.join("|")).test(text.toLowerCase())) { // YIN - Bad words check
        this.playBuzzerSound();
        return;
      }
      this.deactivate();
      this.close();
      this._nameWindow.close();
      if (_TDS_.NameInput.params.nameVariableID > 0) {
        $gameVariables.setValue(_TDS_.NameInput.params.nameVariableID, text);
      };
    } else {
      this.playBuzzerSound();
    };
};

//-----------------------------------------------------------------------------
// Title Screen Switch Check
//-----------------------------------------------------------------------------
DataManager.writeToFile = function(text, filename) {
    var fs = require('fs');
    var dirPath = StorageManager.localFileDirectoryPath();
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }
    // console.log("Writing File: " + filename + " Text: " + text);
    fs.writeFileSync(dirPath + '/' + filename, text);
}

DataManager.writeToFileAsync = function(text, filename, callback) {
    var fs = require('fs');
    var dirPath = StorageManager.localFileDirectoryPath();
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }
    // console.log("Writing File: " + filename + " Text: " + text);
    //fs.writeFileSync(dirPath + '/' + filename, text);   

    fs.writeFile(dirPath + '/' + filename, text, (err) => {
        if(!!callback) {callback()}
    })
}

DataManager.readFromFile = function(filename) {
    var fs = require('fs');
    var dirPath = StorageManager.localFileDirectoryPath();
    if (!fs.existsSync(dirPath + '/' + filename)) {
        return 0;
    }
    // console.log("Reading File: " + fs.readFileSync(dirPath + '/' + filename));
    return fs.readFileSync(dirPath + '/' + filename, "utf-8");
}

Scene_OmoriFile.prototype.createWaitingWindow = function() {
    let ww = Math.floor(Graphics.boxWidth/3);
    let wh = Window_Base.prototype.lineHeight.call(this) + 16;
    this._waitingWindow = new Window_Base(Math.ceil(Graphics.boxWidth / 2 - ww/2), Math.ceil(Graphics.boxHeight / 2 - wh/2));
    this._waitingWindow.hide();
    this.addChild(this._waitingWindow);
    const MAX_TIME = 3;
    this._waitingWindow.saveString = TextManager.message("saveWait");
    this._waitingWindow.wait = MAX_TIME;
    this._waitingWindow.refresh = function() {
        if(this.wait > 0) {return this.wait--;}
        this.saveString += ".";
        this.contents.clear();
        this.drawText(this.saveString,0,0,this.contents.width,"center");
        this.wait = MAX_TIME;
        if(this.saveString.contains("...")) {this.saveString.replace("...", "")}
    }
    this._waitingWindow.clear = function() {
        this.saveString = TextManager.message("saveWait");
        this.wait = MAX_TIME;
        this.hide();
    }
    this._waitingWindow.update = function() {
        Window_Base.prototype.update.call(this);
        if(!this.visible) {return;}
        this.refresh();
    }
}

const _old_scene_OmoriFile_create = Scene_OmoriFile.prototype.create;
Scene_OmoriFile.prototype.create = function() {
    _old_scene_OmoriFile_create.call(this);
    this.createWaitingWindow(); // Create New Waiting Window
}

Scene_OmoriFile.prototype.backupSaveFile = function(callback) {
    /*const fs = require("fs");
    const ncp = require("ncp");
    const pp = require("path")
    const savePath = StorageManager.localFileDirectoryPath();
    const destination_folder = pp.join(Permanent_Manager.dataFolder(), Permanent_Manager.determineOmoriFolder()); // Taking this from my Permanent Manager system;
    ncp(savePath, destination_folder + "save", () => {
        if(!!callback) {callback()}
    })*/
    callback();

}

Scene_OmoriFile.prototype.saveGame = function() {
    // On Before Save
    $gameSystem.onBeforeSave();
    // Get Save File ID
    var saveFileid = this.savefileId();
    // Get File Window
    var fileWindow = this._fileWindows[this._saveIndex];
    // Save Game
    this._promptWindow.deactivate();
    this._promptWindow.close();
    this._waitingWindow.show(); // Show Waiting Window;
    if (DataManager.saveGame(saveFileid)) {
    SoundManager.playSave();
    StorageManager.cleanBackup(saveFileid);
    var world;
    if($gameSwitches.value(448) && $gameSwitches.value(447)) {
        world = 449 // Special Flag When both the switches are on;
    }
    else if ($gameSwitches.value(448)) {
        world = 448;
    } else if ($gameSwitches.value(447)) {
        world = 447;
    } else if ($gameSwitches.value(446)) {
        world = 446;
    } else if ($gameSwitches.value(445)) {
        world = 445;
    } else if ($gameSwitches.value(444)) {
        world = 444;
    } else {
        world = 0
    }
    DataManager.writeToFileAsync(world, "TITLEDATA", () => {
        this.backupSaveFile(() => {
            fileWindow.refresh();
            // Deactivate Prompt Window
            this._waitingWindow.clear();
            // Set Can select Flag to false
            this._canSelect = true;
            // Update Save Index Cursor
            this.updateSaveIndexCursor();
        })
    });
    //   console.log(world); 
    } else {
    SoundManager.playBuzzer();
    // Deactivate Prompt Window
    this._promptWindow.deactivate();
    this._promptWindow.close();
    // Set Can select Flag to false
    this._canSelect = true;
    // Update Save Index Cursor
    this.updateSaveIndexCursor();
    };
};

//---------------------------------------------------------------------------
// Retry Audio Fix
//---------------------------------------------------------------------------
Scene_Gameover.prototype.updateRetryInput = function() {
    // Get Input Data
    const input = this._inputData;

    // If Input is Active
    if (input.active) {

        // If Ok input is triggered
        if (Input.isTriggered('ok')) {
            input.active = false;
            // Play Load sound
            SoundManager.playLoad();
            // Get Animation Object
            const anim = this._animData;

            if (input.index === 0) {
                if (anim.phase == 3) {
                anim.phase = 4;
                };
            } else {
                anim.phase = 8;
                this.fadeOutAll()
                anim.delay = 70;
            }
            return;
        };

        if (Input.isRepeated('left')) {
            SoundManager.playCursor();
            input.index = Math.abs((input.index - 1) % input.max);
            this.updateRetryInputCursorPosition(input.index);
            return
        };
        if (Input.isRepeated('right')) {
            SoundManager.playCursor();
            input.index = (input.index + 1) % input.max;
            this.updateRetryInputCursorPosition(input.index);
            return
        };
    };
};

//---------------------------------------------------------------------------
// More Retry Fixes
//---------------------------------------------------------------------------
var yin_gameover_createRetryWindows = Scene_Gameover.prototype.createRetryWindows;
Scene_Gameover.prototype.createRetryWindows = function() {
    this._retryQuestion = new Window_Base(0, 0, 0, 0);
    this._retryQuestion.standardPadding = function() { return 4; };

    this._retryQuestion.initialize(0, 0, Graphics.boxWidth, 32);
    this._retryQuestion.contents.fontSize = 26;

    this._retryQuestion.x = 0;
    this._retryQuestion.y = 380 - 48;
    this._retryQuestion.drawOpacity = 0;
    this._retryQuestion.opacity = 0;
    this._retryQuestion.textToDraw = this._isFinalBattle && this._finalBattlePhase >= 5 ? LanguageManager.getMessageData("XX_BLUE.Yin_Omori_Fixes").continue : LanguageManager.getMessageData("XX_BLUE.Yin_Omori_Fixes").retry;
    this._retryQuestion.textDrawn = "";
    this._retryQuestion.textIndex = -1;
    this._retryQuestion.isTextComplete = function() {
        return this.textDrawn === this.textToDraw;
    }
    this._retryQuestion.textDelay = 100;
    // Making the text already visible;
    this._retryQuestion.drawOpacity = 255;
    this._retryQuestion.update = function(animPhase) {
        if (animPhase == 2 || animPhase == 3) {
            if(!!this.isTextComplete()) {return;}
            if(this.textDelay > 0) {return this.textDelay--;}
            if (!this.isTextComplete()) {
                this.contents.clear();
                this.textIndex = Math.min(this.textIndex + 1, this.textToDraw.length);
                this.textDrawn += this.textToDraw[this.textIndex];
                this.contents.paintOpacity = this.drawOpacity;
                this.contents.drawText(this.textDrawn, 0, -4, this.contents.width, this.contents.height, 'center');
                SoundManager.playMessageSound();
                this.textDelay = 4;
            }
        } else if (animPhase == 4) {
            this.contents.clear();
            this.drawOpacity -= 4;
            this.contents.paintOpacity = this.drawOpacity;
            this.contents.drawText(this.textDrawn, 0, -4, this.contents.width, this.contents.height, 'center');
        }
    };
    this.addChild(this._retryQuestion);

    yin_gameover_createRetryWindows.call(this);
};

var yin_gameover_updatetransitionAnimation = Scene_Gameover.prototype.updateTransitionAnimation;
Scene_Gameover.prototype.updateTransitionAnimation = function() {
    yin_gameover_updatetransitionAnimation.call(this);
    let anim = this._animData;
    switch (anim.phase) {
        case 2:
        case 3:
            this._retryQuestion.update(anim.phase);
            break;
        case 4: 
            this._retryQuestion.update(anim.phase);
            break;
    }
}

//=============================================================================
// Black Letter Crash Title Screen Load
//=============================================================================
var yin_titlecrashload_initialize = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function(index) {
    yin_titlecrashload_initialize.call(this);
    if (StorageManager.exists(44)) {
        // LOAD SAVE 44
        if (DataManager.loadGame(44)) {
            // AudioManager.playSe({name: 'SE_red_hands', volume: 100, pitch: 100})
            
            this.fadeOutAll();
            // Reload Map if Updated
            if ($gameSystem.versionId() !== $dataSystem.versionId) {
              $gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
              $gamePlayer.requestMapReload();    
            };
            Graphics.frameCount = $gameSystem._framesOnSave || Graphics.frameCount;
            SceneManager.goto(Scene_Map);
            this._loadSuccess = true;
            StorageManager.remove(44);
        }
        return;
    }
}

//=============================================================================
// Cursor on continue when save games are available
//=============================================================================
var yin_titleContinue_create = Scene_OmoriTitleScreen.prototype.create;
Scene_OmoriTitleScreen.prototype.create = function() {
    // Super Call
    yin_titleContinue_create.call(this);
    if (this._canContinue) {
    this._commandIndex = 1;
    }
    // Update Command Window Selection
    this.updateCommandWindowSelection();
};