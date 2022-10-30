//=============================================================================
// FilterController.js
// ----------------------------------------------------------------------------
// Copyright (c) 2018 Tsukimi
// ----------------------------------------------------------------------------
// Version
// 2.0.9 2019/04/15 add filter enable/disable
// 2.0.8 2018/02/26 add Displacement Filter
// 2.0.7 2018/02/10 fix character id wrong bug again, add two new filters
// 2.0.6 2018/02/02 fix character wrong bug, make special condition(filterArea) for bulge pinch
// 2.0.5 2018/01/30 ※add new target Object(target->specified char/pic only)
//                  ※add six new filter Controller
//                  ※fix godray-filter iOS bug(temporarily. wait for pixi official update)
//                  ->see here: https://github.com/pixijs/pixi-filters/pull/140
// 2.0.1 2018/01/23 fix metaArray bug
// 2.0.0 2018/01/23 refactor code. change version because no comatibility with v1.x
// *****
// 1.0.4 2018/01/08 効果ターゲット追加、Godrayにパラメータ追加
// 1.0.0 2018/01/03 リリース
//=============================================================================

/*:
 * @plugindesc FilterController
 * @author Tsukimi
 * 
 * 
 * @param Use Decimal in Variables
 * @desc allow decimal when using game variables or not.
 * precision to 3 decimal digits.(0.001)  value: true/false
 * @default true
 * 
 * @param displacementImage
 * @text Displacement Map image
 * @desc name of displacement map image.
 * put under img/pictures/ folder
 * @default DisplacementMap
 * 
 * @param enabledAll-Settings
 * @text FilterEffectsEnabled(All) ON/OFF Settings
 * 
 * @param enabledAll-ShowInOptionMenu
 * @text Show in Option Menu
 * @parent enabledAll-Settings
 * @desc Show FilterEffectsEnabled(All) in Option Menu
 * @type boolean
 * @default true
 * 
 * @param enabledAll-Text
 * @text Option Menu Text
 * @parent enabledAll-Settings
 * @desc text of FilterEnabled(All) option in option menu
 * @default Filter Effects
 * 
 * @param enabledAll-DefaultValue
 * @text default ON/OFF state
 * @parent enabledAll-Settings
 * @desc default value of FilterEnabled(All), false -> don't apply any filter effects
 * @type boolean
 * @default true
 * 
 * @help
 * *** pixi-filter Controller
 * Author: Tsukimi
 * This plugin is a controller, to control pixi-filters,
 * making fancy effects.
 * 
 * *** Notice !!! ***
 * this is an webGL depending effect.
 * If your RMMV version is below 1.5.0 and your game
 * will be on website/smartphone, this effect may not work.
 * (OK for desktop application, even with version below 1.5.0)
 * 
 * 
 * You can create filters by three method:
 * 1. Plugin Command
 * 2. Map Tags(->map dependent filter)
 * 3. Event Tags(->event dependent filter)
 * 
 * 
 * *** Filter Parameter List:
 * ---------------------------
 * https://github.com/cji3bp62000/hello-world/blob/master/RMMVplugins/FIlterController/filter-list.jpg
 * please download the above image
 * to check name and parameters of each filter.
 * 
 * 
 * *** Plugin Command:
 * ---------------------------
 * 
 * 　createFilter <id> <filterType> <filter-target> (<character>)
 * 　　create filter.
 * 
 * 　　id: id of this controller. choose a name you like!
 * 　　filtertype: please look at the list of filter-type.
 * 　　filter-target: what will be included in the effect.
 * 　　　0: screen(map+pictures)
 * 　　　1: whole-screen(including message window)
 *      2: map(tiles+characters), 21(← +parallax)
 *      3: tiles, 31(tiles+parallax)
 *      4: all characers
 *      4000+id: character#id (id-> -1:game Player, 
 *                             0:this event, 1~: event#id)
 *      5: all pictures
 *      5000+id: picture#id (id-> picture#id)
 * 
 *    character: optional parameter. Make filter Location 
 *               depend on character, and will erase itself
 *               when leaving current map.
 *      ~-1: game Player (inBattle: enemy id)
 *        0: this event  (inBattle: current actor)
 *       1~: event ID    (inBattle: party member id)
 *       screen: screen.(mostly used for restricting to current map)
 * 
 * 　　example:
 * 　　　createFilter tw#1 twist 0
 * 　　　createFilter GLOW godray 2 screen
 * 　　　createFilter tw2 twist 3999     (effect only apply to game Player)
 * 　　　createFilter tw2 twist 5001     (effect only apply to pic#1)
 * 
 * 
 * 　eraseFilter <id>
 * 　　erase the filter of controller name <id>.
 * 
 * 
 *   setFilter <id> <filter parameters ...>
 *    set the filter<id> to the <parameters>.
 *    please take a look at filter parameter list.
 * 
 *    Take twist as example.
 *    assume I created a twist filter named tw#1.
 *    twist has 4 parameters: x,y,radius,angle;
 *    so write:
 * 　　　setFilter tw#1 0 0 96 4
 * 
 * 　　Besides numbers, you can also set:
 * 　　x: Don't change from current parameter value
 * 　　v<Number>: value of Game Variable<Number>
 * 　　r<#1>~<#2>: Random value between #1 and #2.
 * 　　            #1 and #2 can also be variables.
 * 　　example:
 * 　　　setFilter tw#1 v1 v2 r50~v3 x
 * 
 * 
 *   enableFilter <id> <true/false>
 * 　　enable or disable the filter.
 * 　　could be use as pausing filter effect.
 * 　　example:
 * 　　　setFilter tw#1 v1 v2 r50~v3 x
 * 
 * 
 *   moveFilter <id> <filter parameters ...> <duration>
 *    move filter<id> to <parameters> within <duration>
 * 
 * 　　example:
 * 　　　moveFilter tw#1 0 0 96 4 60
 * 
 * 
 *   moveFilterQ <id> <filter parameters ...> <duration>
 *    push the movement to Queue. will execute next move
 *    after the last move is end.
 * 
 * 　　example:
 * 　　　moveFilterQ tw#1 0 0 96 4 60
 * 　　　moveFilterQ tw#1 x x x x 120
 * 　　　　(↑ no param changing -> wait 120f between move)
 * 
 * 
 *   eraseFilterAfterMove <id>
 *    erase Filter itself after move and moveQueue are end.
 * 
 * 
 *   setFilterSpeed <id> <speed>
 *    some filter has auto-animation(such as godray).
 *    set the animation speed.
 * 　　　default value: godray, shockwave : 0.01
 * 　　　               oldfilm, noise    : 1
 * 　　　               crt               : 0.25
 * 　　　               reflection        : 0.1
 * 
 * 
 * 
 * *** Map Tags/Event Tags:
 * ---------------------------
 * 
 * 　<Filter:[id],[filterType],[filter-target]>
 * 　　Basically same as createfilter.
 * 　　Creating filter when entering map.
 * 　　<char> will be set to the eventID/screen.
 * 
 * 　　example:
 * 　　　<Filter:GODRAY#1,godray,0>
 * 
 * 
 * 　<SetFilter:[id],[filter parameters ...]>
 * 　　Basically same as setfilter.
 * 　　Set the parameter created by <Filter:...>.
 * 
 * 　　example:
 * 　　　<Filter:GODRAY#1,godray,0>
 * 　　　<SetFilter:GODRAY#1,-30,0.5,2.5,1>
 * 
 * 
 * 　<SetFilterSpeed:[id],[speed]>
 * 　　Basically same as setfilterSpeed.
 * 　　Set the parameter created by <Filter:...>.
 * 
 * 　　example:
 * 　　　<Filter:GODRAY#1,godray,0>
 * 　　　<SetFilterSpeed:GODRAY#1,0.03>
 * 
 */

/*:ja
 * @plugindesc FilterController
 * @author Tsukimi
 * 
 * @param 変数に小数点が使えるようにする
 * @desc trueにすると、変数に小数点が使えるようになる
 * 小数点四位以下四捨五入。 入力値：true/false
 * @default true
 * 
 * @param displacementImage
 * @text Displacement画像名
 * @desc Displacementの画像の名前。
 * 画像を img/pictures/ に入れてください。
 * @default DisplacementMap
 * 
 * @param enabledAll-Settings
 * @text フィルター効果ON/OFF設定
 * 
 * @param enabledAll-ShowInOptionMenu
 * @text オプションメニューに表示する
 * @parent enabledAll-Settings
 * @desc 「フィルター効果」のON/OFFをゲーム内のオプションメニューから設定出来るようにする
 * @type boolean
 * @default true
 * 
 * @param enabledAll-Text
 * @text オプションメニューでの文言
 * @parent enabledAll-Settings
 * @desc ゲーム内オプションでのフィルター効果ON/OFFの文言
 * @default フィルター効果
 * 
 * @param enabledAll-DefaultValue
 * @text フィルター効果ON/OFFの初期値
 * @parent enabledAll-Settings
 * @desc フィルター効果ON/OFFの初期値；OFF→全フィルターを適用しない
 * @type boolean
 * @default true
 * 
 * @help
 * 
 * 画面エフェクトの詰め合わせ
 * 作者：ツキミ
 * 
 * 説明：
 * pixiビルドインの filters をコントロールしやすくするための
 * プラグインです。
 * 
 * 詳しい説明は、
 * https://forum.tkool.jp/index.php?threads/.603/
 * を見てください。
 * 
 * ***************************************************
 * プラグインコマンド：
 *  イベントコマンド「プラグインコマンド」から実行。
 *  （パラメータの間は半角スペースで区切る）
 * 
 * 　createFilter [id] [エフェクト名] [効果ターゲット] ([キャラID])
 *    画面エフェクトを作る。
 *    - id: エフェクトに付ける識別名。 数字でなくてもいい。
 *    - エフェクト名: エフェクトの種類。
 *    - 効果ターゲット: 0: 画面
 *                   1: 全画面(メッセージウィンドウ含む)
 *                   2: マップ（全キャラ+地形タイル）、21:（前記+parallax）
 *                   3: 地形タイル、31: タイル+parallax
 *                   4: 全キャラ
 *                   4000+x: 特定キャラ(x-> -1: 自キャラ, 
 *                           0: このイベント, 1以上: 該当イベント)
 *                   5: 全ピクチャ
 *                   5000+x: 特定ピクチャ (x-> ピクチャ番号)
 *      、、 、
 * 
 *    - (キャラID): 指定した場合はエフェクトを該当キャラに付けて、
 *                 マップ/バトル から離れるとエフェクトは消える。
 *        マップ： -1: 自キャラ, 0: このイベント, 1以上: 該当イベント
 *        バトル： -1以下: 敵キャラ, 0: このキャラ, 1以上: 見方キャラ
 *  
 *        ※エフェクトをマップ/バトル限定にしたい、でもどのキャラにも
 *        　付けたくない場合は screen を入力。
 * 
 *    例: createFilter 1 twist 0 -1
 *    　  createFilter 発光 godray 1 screen
 * 
 * 
 *   eraseFilter [id]
 *    画面エフェクトを消す。
 * 
 *    例: eraseFilter 発光
 * 
 * 
 *   enableFilter [id] [true/false]
 *    フィルタのアクティブ状態を切り替える。
 * 　　フィルタ効果の一時中断にも使える。
 * 
 *    例: enableFilter 1 true
 * 
 * 
 *   setFilter [id] [該当エフェクトのパラメータ ...]
 *    画面エフェクトのパラメータを設定する。
 *     - ※パラメータについては後ほど説明する。
 * 
 *    例: moveFilter 1 0
 * 
 * 
 *   moveFilter [id] [該当エフェクトのパラメータ ...] [時間]
 *    画面エフェクトのパラメータを移動、調整する。
 *    時間の単位はフレーム。
 * 
 *    例: moveFilter 1 0 60
 *        
 * 
 *   moveFilterQ [id] [該当エフェクトのパラメータ ...] [時間]
 *    画面エフェクトのパラメータを移動、調整する。
 *     moveFilterとの違いは、moveFilterは前の移動を取り消して、
 *     新しい移動ルートで移動する。
 *     こちらは連続して実行すると、移動ルートを一つずつ実行していく。
 *     （移動コマンドの列）
 * 
 *    例: moveFilterQ 1 25 60
 *    　  moveFilterQ 1 45 120
 *    　  moveFilterQ 1 50 30
 * 
 * 
 *   eraseFilterAfterMove [id]
 *    画面エフェクトを現在指定している移動ルートを全部実行した後、
 *    自動で消す。
 * 
 *    例: eraseFilterAfterMove 1
 * 
 * 
 *   setFilterSpeed [id] [変化スピード]
 *    アニメのあるエフェクトの変化スピードを指定する。
 *     主にgodray(陽射し), shockwave(波動), oldfilm(古い映像)
 *     のことを指す。
 *     デフォルト: godray, shockwave : 0.01
 *     　　　　　  oldfilm           : 1
 *     　　　　　  crt               : 0.25
 *     　　　　　  reflection        : 0.1
 * 
 *    例: createFilter 陽射し godray 0
 *    　  setFilterSpeed 陽射し 0.03
 * 
 * 
 * ***************************************************
 * 各エフェクトのパラメータ：
 * https://github.com/cji3bp62000/hello-world/blob/master/RMMVplugins/FIlterController/filter-list(jp).jpg
 * 
 * 例えば,setFilter でbulgePinch のパラメータを調整したい時は、
 * createFilter 1 bulgePinch 0
 * setFilter 1号 408 312 96 1
 * 　x->408, y->312, 半径->96, 強度->1 になるように設定する。
 * 
 * パラメータは数字以外、以下の文字も設定可能です。
 * 　x: 現在のパラメータ（パラメータを変えない）
 * 　v<数字>: 変数番号<数字>の値を代入する
 * 　r<#1>~<#2>: #1~#2の間の乱数生成。
 * 　            #1と#2もv<数字>で指定可能。
 * 　例:
 * 　　setFilter 1号 v1 v2 r50~v3 x
 * 
 * ***************************************************
 * 
 * マップタグ、イベントタグ
 *  マップ開始時に自動でエフェクトを作り出し、マップから離れると
 *  エフェクトを消す。
 *  イベントのメモ欄に所定の書式で記入してください。
 * 
 *   <Filter:[id],[エフェクト名],[効果ターゲット]>
 *    - 基本的にcreateFilterと同じ。
 *       マップのメモ欄に記入すると画面依存に、
 *       イベントのメモ欄に記入するとイベント依存になる。
 * 
 *   例: <Filter:発光,godray,0>
 * 
 * 
 *   <SetFilter:[id],[該当エフェクトのパラメータ ...]>
 *    - setFilterと同じ。
 *       基本的に上の<Filter>で作ったエフェクトを設定する時に
 *       使ってください。
 * 
 *   例: <Filter:発光,godray,0>
 *   　  <SetFilter:発光,-30,0.5,2.5,1>
 * 
 * 
 *   <SetFilterSpeed:[id],[変化スピード]>
 *    - setFilterSpeedと同じ。
 *       基本的に上の<Filter>で作ったエフェクトを設定する時に
 *       使ってください。
 * 
 *   例: <Filter:発光,godray,0>
 *   　  <SetFilterSpeed:発光,0.03>
 * 
 * 
 */

//=============================================================================
// Filter_Controller
//
// The Controller class for a filter.
//=============================================================================
function Filter_Controller() {
    this.initialize.apply(this, arguments);
};
 
(function() {
    "use strict";
    
    //=============================================================================
    //  Plugin parameter
    //  
    //=============================================================================
    var pluginName = 'FilterController';
    var getParamString = function(paramNames) {
        if (!Array.isArray(paramNames)) paramNames = [paramNames];
        for (var i = 0; i < paramNames.length; i++) {
            var name = PluginManager.parameters(pluginName)[paramNames[i]];
            if (name) return name;
        }
        return null;
    };
    var getParamBoolean = function(paramNames) {
        var value = getParamString(paramNames);
        return (value || '').toUpperCase() === 'TRUE';
    };
    
    if(getParamBoolean(['Use Decimal in Variables', '変数に小数点が使えるようにする'])) {
        
        var _Game_Variables_setValue = Game_Variables.prototype.setValue;
        Game_Variables.prototype.setValue = function(variableId, value) {
            if (variableId > 0 && variableId < $dataSystem.variables.length) {
                if (typeof value === 'number') {
                    value = Math.round(value * 1000 + 0.0000001) / 1000;
                    this._data[variableId] = value;
                    this.onChange();
                }
                else _Game_Variables_setValue.apply(this, arguments);
            }
        };
    }
    
    var TKMDisplacementMap = getParamString('displacementImage') || '';
    
    //=============================================================================
    // Game_Interpreter
    //  プラグインコマンド[P_DRAG]などを追加定義します。
    //=============================================================================
    
    var _Game_Interpreter_pluginCommand      = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.apply(this, arguments);
        var id, dur;
        switch ((command || '').toUpperCase()) {
            case 'CREATEFILTER' :
                id = args[0];
                var filterType = args[1];
                var filterTarget = parseInt(args[2]) || 0;
                if(filterTarget === 4000) filterTarget += this._eventId;
                var char;
                if(args.length > 3) {
                    if(args[3] === "screen") char = 0;
                    else {
                        char = Number(args[3]); 
                        if(char === 0) { // this event/battle unit
                            if( !$gameParty.inBattle() ) char = this._eventId || 0;
                            else {
                                var sub = BattleManager._subject, index = 0;
                                if(sub) {
                                    index = $gameTroop.members().indexOf(sub);
                                    if(index >= 0) {
                                        index = -(index+1);
                                    } else {
                                        index = $gameParty.members().indexOf(sub);
                                        if(index < 0) index = 0;
                                        else index++;
                                    }
                                }
                                char = index;
                            }
                        }
                    }
                }
                $gameMap.createFilter(id,filterType,filterTarget,char);
                break;
                
            case 'SETFILTER' :
                id = args[0];
                $gameMap.setFilter( id , ParamProcess(args.slice(1)) );
                break;
                
            case 'ENABLEFILTER' :
                id = args[0];
                $gameMap.enableFilter( id , getBoolean(args[1]) );
                break;
                
            case 'MOVEFILTER' :
                id = args[0];
                dur = Number(args[args.length-1]) || 1 ;
                $gameMap.moveFilter(id , ParamProcess(args.slice(1,-1)), dur);
                break;
                
            case 'MOVEFILTERQ' :
                id = args[0];
                var dur = Number(args[args.length-1]) || 1 ;
                $gameMap.moveFilterQueue(id , ParamProcess(args.slice(1,-1)), dur);
                break;
                
            case 'ERASEFILTER' :
                id = args[0];
                $gameMap.eraseFilter(id);
                break;
                
            case 'ERASEFILTERAFTERMOVE' :
                id = args[0];
                $gameMap.eraseFilterAfterMove(id);
                break;
                
            case 'SETFILTERSPEED' :
                id = args[0];
                $gameMap.setFilterAddiTime(id, Number(args[1]) || 0);
                break;
        }
    };
    
    // string -> number / undefined
    function getNumberOrX(string) {
        var num;
        if(string === '' || string === 'x') return undefined;
        var num = Number(string);
        if(typeof(num) === "number" && !isNaN(num)) return num;
        if(string[0] === 'v') {
            num = Number(string.slice(1)) || 0;
            return $gameVariables.value(num);
        }
        if(string[0] === 'r') {
            num = string.slice(1).split('~');
            var num1 = getNumberOrX(num[0]) || 0, 
                num2 = getNumberOrX(num[1]) || 0;
            if(num1>num2) {var t=num1; num1=num2; num2=t;}
            return ( Math.random()*(num2-num1) + num1 );
        }
        return undefined;
    };
    
    function getBoolean(string) {
        return (string || '').toUpperCase() === 'TRUE';
    };
    
    // resultArray:parameters
    // undefined parts are unused parts
    function ParamProcess(array) {
        var resultArray = [];
        for(var i = 0; i < array.length; i++) {
            resultArray.push( getNumberOrX(array[i]) );
        }
        return resultArray;
    };
    
    //=============================================================================
    // Filter_Controller
    //
    // The Controller class for a filter.
    //=============================================================================
    
    Filter_Controller.enabledAll = getParamBoolean("enabledAll-DefaultValue");
    
    Filter_Controller.prototype.initialize = function(filterName, id, targetObj, char, mapId) {
        this.initBasic(id, targetObj, char, mapId);
        this.initFilterParam(filterName);
        this.initTarget();
    };

    Filter_Controller.prototype.initBasic = function(id, targetObj, char, mapId) {
        this._filterType = "";
        this._erase = false;
        this._eraseAfterMove = false;
        this._moveQueue = [];
        this._time = 0;
        this._addiTime = 0;
        this._id = id;
        this._targetObj = targetObj;
        this._character = char;
        this._charMapId = mapId;
        this.currentParams = null;
        this.targetParams = null;
        
        this.enabled = true;
    };

    Filter_Controller.prototype.initTarget = function() {
        this.targetParams = this.currentParams.slice(); // fast array copy
        this._duration = 0;
    };
    //=============================================================================
    // Filter_Special_Initialization
    //=============================================================================
    var _FSInit = {};
    _FSInit["oldfilm"]    = function(filter) {
        filter.vignetting = 0;
        filter.vignettingAlpha = 0;
        filter.vignettingBlur = 0;
        filter.scratch = 0.7;
    };
    
    _FSInit["godray-np"]  = function(filter) {
        filter.parallel = false;
    };
    
    _FSInit["crt"]    = function(filter) {
        filter.vignetting = 0;
        filter.vignettingAlpha = 0;
        filter.vignettingBlur = 0;
    };

    _FSInit["reflection-m"] = function(filter) {
        filter.mirror = true;
    };

    _FSInit["reflection-w"] = function(filter) {
        filter.mirror = false;
    };

    _FSInit["motionblur"] = function(filter) {
        filter.kernelSize = 9;
    };
    
    Filter_Controller.filterSpecialInit = _FSInit;
    //=============================================================================
    // Filter_Special_Initialization_End
    //=============================================================================
    
    Filter_Controller.prototype.createFilter = function() {
        var filter;
        if(Filter_Controller.filterNameMap[this._filterType]) {
            if(Filter_Controller.filterNameMap[this._filterType] === PIXI.filters.DisplacementFilter)
                filter = this.createDisplacement();
            else
                filter = new Filter_Controller.filterNameMap[this._filterType]();
        }
        // special settings for filter
        var spInit = Filter_Controller.filterSpecialInit[this._filterType];
        if(!!spInit) {
            spInit.apply(this, [filter]);
        }
        return filter;
    };
    
    Filter_Controller.prototype.createDisplacement = function() {
        var s = new Sprite(ImageManager.loadPicture(TKMDisplacementMap));
        var f = new PIXI.filters.DisplacementFilter(s);
        SceneManager._scene.addChild(s);
        return f;
    };

    var _defaultParam = {};
    _defaultParam["bulgepinch"]     = [0,0,0,1];
    _defaultParam["radialblur"]     = [0,0,0,0,9];
    _defaultParam["godray"]         = [30,0.5,2.5,1.0];
    _defaultParam["ascii"]          = [8];
    _defaultParam["crosshatch"]     = [];
    _defaultParam["dot"]            = [5,1];
    _defaultParam["emboss"]         = [5];
    _defaultParam["shockwave"]      = [0,0,-1,30,160,1];
    _defaultParam["twist"]          = [0,0,0,4];
    _defaultParam["zoomblur"]       = [0,0,0,0.1];
    _defaultParam["noise"]          = [0.5];
    _defaultParam["blur"]           = [8];
    _defaultParam["oldfilm"]        = [0.5,0.15,0.3];
    _defaultParam["rgbsplit"]       = [0,0];
    _defaultParam["bloom"]          = [8,1,0.5,1];
    _defaultParam["godray-np"]      = [0,0,0.5,2.5,1.0];
    _defaultParam["adjustment"]     = [1,1,1,1,1,1,1,1];
    _defaultParam["pixelate"]       = [1,1];
    _defaultParam["crt"]            = [1,3,0.3,0.2,1];
    _defaultParam["reflection-m"]   = [0.5, 0,20, 30,100, 1,1];
    _defaultParam["reflection-w"]   = [0.5, 0,20, 30,100, 1,1];
    _defaultParam["motionblur"]     = [0,0];
    _defaultParam["glow"]           = [0,4,255,255,255];
    _defaultParam["displacement"]   = [1,1,20];
    
    Filter_Controller.defaultFilterParam = _defaultParam;
    
    Filter_Controller.prototype.initFilterParam = function(filterName) {
        this._filterType = filterName.toLowerCase();
        var defaultParam = Filter_Controller.defaultFilterParam[this._filterType];
        if( !defaultParam ) {
            this._filterType = "";
            this._erase = true;
            this.currentParams = [];
            return;
        }
        this.currentParams = defaultParam.slice(); // fast array copy
        switch(this._filterType) {
            case "godray":
            case "godray-np":
                this._addiTime = 0.01;
                break;

            case "shockwave":
                this._addiTime = 0.01;
                break;

            case "oldfilm":
                this._addiTime = 1;
                break;

            case "noise":
                this._addiTime = 1;
                break;

            case "crt":
                this._addiTime = 0.25;
                break;

            case "reflection-m":
            case "reflection-w":
                this._addiTime = 0.1;
                break;
                                   }
    };

    Filter_Controller.prototype.update = function() {
        this.updateMove();
        this.checkErase();
    };

    Filter_Controller.prototype.updateMove = function() {
        if(this._duration <= 0) {
            if(this._moveQueue.length > 0) {
                var targetData = this._moveQueue.shift();
                this.move(targetData[0], targetData[1]);
            }
            else if(this._eraseAfterMove) this.erase();
        }
        if (this._duration > 0) {
            var d = this._duration, cp = this.currentParams, tp = this.targetParams;
            for(var i = 0; i < cp.length; i++) {
                cp[i] = (cp[i] * (d - 1) + tp[i]) / d;
            }
            this._duration--;
        }
        this._time += this._addiTime;
    };

    Filter_Controller.prototype.checkErase = function() {
        if(typeof(this._character) === "number") {
            if( !!this._charMapId && !this.isOnCurrentMap() ) {
                this.erase();
            }
            else if(!this._charMapId && !$gameParty.inBattle()) {
                this.erase();
            }
        }
    };
    
    //=============================================================================
    //  updateFilter_Handler
    //  function handler of updating actual filter object
    //=============================================================================
    
    var _updateFilterHandler = {};
    
    var bp = function(filter, cp) {
        var loc = this.getCharLoc();
        filter.center = [ (loc[0] + cp[0]) / Graphics.width , (loc[1] + cp[1]) / Graphics.height];
        filter.radius   = cp[2];
        filter.strength = cp[3];
    };
    _updateFilterHandler["bulgepinch"] = bp;
    
    var rb = function(filter, cp) {
        var loc = this.getCharLoc();
        filter.center = [ (loc[0] + cp[0]), (loc[1] + cp[1]) ];
        filter.radius   = cp[2];
        filter.angle = cp[3];
        filter.kernelSize   = Math.round(cp[4]);
    };
    _updateFilterHandler["radialblur"] = rb;
    
    var gr = function(filter, cp) {
        filter.angle = cp[0];
        filter.gain = cp[1];
        filter.lacunarity = cp[2];
        filter.strength = cp[3];
        filter.time = this._time;
    };
    _updateFilterHandler["godray"] = gr;
    
    var as = function(filter, cp) {
        filter.size = cp[0];
    };
    _updateFilterHandler["ascii"] = as;
    
    var cs = function(filter, cp) {
    };
    _updateFilterHandler["crosshatch"] = cs;
    
    var dot = function(filter, cp) {
        filter.angle = cp[0];
        filter.scale = cp[1];
    };
    _updateFilterHandler["dot"] = dot;
    
    var em = function(filter, cp) {
        filter.strength = cp[0];
    };
    _updateFilterHandler["emboss"] = em;
    
    var sw = function(filter, cp) {
        var loc = this.getCharLoc();
        filter.center = [ (loc[0] + cp[0]), (loc[1] + cp[1]) ];
        filter.radius = cp[2];
        filter.amplitude = cp[3];
        filter.wavelength = cp[4];
        filter.brightness = cp[5];
        filter.time = this._time;
        if(this._time > 10) this.erase(); // 必要ある？
    };
    _updateFilterHandler["shockwave"] = sw;
    
    var tw = function(filter, cp) {
        var loc = this.getCharLoc();
        filter.offset = [ (loc[0] + cp[0]), (loc[1] + cp[1]) ];
        filter.radius = cp[2];
        filter.angle = cp[3];
    };
    _updateFilterHandler["twist"] = tw;
    
    var zb = function(filter, cp) {
        var loc = this.getCharLoc();
        filter.center = [ (loc[0] + cp[0]), (loc[1] + cp[1]) ];
        filter.innerRadius = cp[2];
        filter.strength = cp[3];
    };
    _updateFilterHandler["zoomblur"] = zb;
    
    var no = function(filter, cp) {
        filter.noise = cp[0];
        if(this._time > 1) {
            filter.seed = Math.random()*3;
            this._time = 0;
        }
    };
    _updateFilterHandler["noise"] = no;
    
    var blr = function(filter, cp) {
        filter.blur = cp[0];
    };
    _updateFilterHandler["blur"] = blr;
    
    var of = function(filter, cp) {
        filter.sepia = cp[0];
        filter.noise = cp[1];
        filter.scratchDensity = cp[2];
        if(this._time > 1) {
            filter.seed = Math.random();
            this._time = 0;
        }
    };
    _updateFilterHandler["oldfilm"] = of;
    
    var rgb = function(filter, cp) {
        var r = cp[0], sita = cp[1];
        filter.red = [r*Math.sin(Math.PI/180*sita), r*Math.cos(Math.PI/180*sita)];
        sita += 120;
        filter.green = [r*Math.sin(Math.PI/180*sita), r*Math.cos(Math.PI/180*sita)];
        sita += 120;
        filter.blue = [r*Math.sin(Math.PI/180*sita), r*Math.cos(Math.PI/180*sita)];
    };
    _updateFilterHandler["rgbsplit"] = rgb;

    
    var blm = function(filter, cp) {
        filter.blur = cp[0]
        filter.bloomScale = cp[1];
        filter.threshold = cp[2];
        filter.brightness = cp[3];
    };
    _updateFilterHandler["bloom"] = blm;
    
    var godnp = function(filter, cp) {
        var loc = this.getCharLoc();
        filter.center = [ (loc[0] + cp[0]), (loc[1] + cp[1]) ];
        filter.gain = cp[2];
        filter.lacunarity = cp[3];
        filter.strength = cp[4];
        filter.time = this._time;
    };
    _updateFilterHandler["godray-np"] = godnp;
    
     var adj = function(filter, cp) {
        filter.gamma = cp[0];
        filter.saturation = cp[1];
        filter.contrast = cp[2];
        filter.brightness = cp[3];
        filter.red = cp[4];
        filter.green = cp[5];
        filter.blue = cp[6];
        filter.alpha = cp[7];
    };
    _updateFilterHandler["adjustment"] = adj;
    
    var pixel = function(filter, cp) {
        filter.size = [cp[0], cp[1]];
    };
    _updateFilterHandler["pixelate"] = pixel;
    
    var crt = function(filter, cp) {
        filter.curvature = cp[0];
        filter.lineWidth = cp[1];
        filter.lineContrast = cp[2];
        filter.noise = cp[3];
        filter.noiseSize = cp[4];

        filter.seed = Math.random()*3;
        filter.time = this._time;
    };
    _updateFilterHandler["crt"] = crt;
    
    var ref = function(filter, cp) {
        var loc = this.getCharLoc();
        filter.boundary = cp[0] + loc[1] / Graphics.height;
        filter.amplitude = [cp[1], cp[2]];
        filter.waveLength = [cp[3], cp[4]];
        filter.alpha = [cp[5], cp[6]];

        filter.time = this._time;
    };
    _updateFilterHandler["reflection-m"] = ref;
    _updateFilterHandler["reflection-w"] = ref;
    
    var mblr = function(filter, cp) {
        filter.velocity = [cp[0], cp[1]];
    };
    _updateFilterHandler["motionblur"] = mblr;
    
    var glow = function(filter, cp) {
        filter.innerStrength = cp[0];
        filter.outerStrength = cp[1];
        // r,g,b to number(0x); ~~ is faster than floor()
        filter.color = (~~cp[2])*65536 + (~~cp[3])*256 + (~~cp[4]);
    };
    _updateFilterHandler["glow"] = glow;
    
    var disp = function(filter, cp) {
        filter.maskSprite.x += cp[0];
        filter.maskSprite.y += cp[1];
        filter.scale.x = filter.scale.y = cp[2];
        filter.maskSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
    };
    _updateFilterHandler["displacement"] = disp;
    
    Filter_Controller.updateFilterHandler = _updateFilterHandler;
    //=============================================================================
    //  updateFilter_Handler
    //  END!!
    //=============================================================================

    Filter_Controller.prototype.updateFilter = function(filter) {
        filter.enabled = Filter_Controller.enabledAll && this.enabled;
        
        var handler = Filter_Controller.updateFilterHandler[this._filterType];
        if( !handler ) return;
        handler.apply(this, [filter, this.currentParams]);
    };
    
    Filter_Controller.prototype.set = function(target) {
        this.clearMoveQueue();
        var cp = this.currentParams;
        for(var i = 0; i < cp.length; i++) {
            cp[i] = typeof(target[i]) === "number" ? target[i]:cp[i];
        }
        this.initTarget();
    };
    
    Filter_Controller.prototype.enable = function(enabled) {
        this.enabled = enabled;
    };

    Filter_Controller.prototype.move = function(target, duration) {
        this.initTarget();
        var tp = this.targetParams;
        for(var i = 0; i < tp.length; i++) {
            tp[i] = typeof(target[i]) === "number" ? target[i]:tp[i];
        }
        this._duration = duration;
    };

    Filter_Controller.prototype.moveQueue = function(target, duration) {
        this._moveQueue.push(arguments);
    };

    Filter_Controller.prototype.clearMoveQueue = function() {
        this._moveQueue = [];
    };

    Filter_Controller.prototype.erase = function() {
        this._erase = true;
    };

    Filter_Controller.prototype.eraseAfterMove = function() {
        this._eraseAfterMove = true;
    };

    Filter_Controller.prototype.isOnCurrentMap = function() {
        return this._charMapId === $gameMap.mapId();
    };
    
    Filter_Controller.prototype.isMapEventOnly = function() {
        return ( !!this._character && !!this._charMapId );
    };
    
    Filter_Controller.prototype.isBattleOnly = function() {
        return ( !!this._character && !this._charMapId );
    };

    Filter_Controller.prototype.setAddiTime = function(time) {
        this._addiTime = time || 0;
    };
    
    Filter_Controller.prototype.getCharLoc = function() {
        if(!this._character) return [0,0]; // no specified character
        if(!!this._charMapId) { // search event screen Loc
            if(this._character < 0) return [$gamePlayer.screenX(), $gamePlayer.screenY()];
            else {
                char = $gameMap.event(this._character);
                if(char) return [char.screenX(), char.screenY()];
            }
        }
        else { // search Battler screen X
            if(!$gameParty.inBattle()) return [0,0];
            var char;
            if(this._character < 0) char = BattleManager._spriteset._enemySprites[-this._character-1];
            else char = BattleManager._spriteset._actorSprites[this._character-1];
            if(char) return [char.x, char.y];
        }
        return [0,0];
    };

    //=============================================================================
    // Game_Map
    //
    // The game object class for a map. It contains scrolling and passage
    // determination functions.
    //=============================================================================

    var _Game_Map_initialize = Game_Map.prototype.initialize;
    Game_Map.prototype.initialize = function() {
        _Game_Map_initialize.apply(this, arguments);
        this._filterConArr = new Map();
    };

    Game_Map.prototype.createFilter = function(id, filter, targetObj, char) {
        var lastFilter = this._filterConArr.get(id);
        if(lastFilter) {
            SceneManager._scene.removeFilterOf(lastFilter);
        }
        targetObj = targetObj || 0;
        var f = new Filter_Controller( filter, id, targetObj, char, (typeof(char) === "number" && !$gameParty.inBattle() ? this.mapId():undefined) );
        this._filterConArr.set(id, f);
    };

    Game_Map.prototype.updateFilterConArr = function() {
        this._filterConArr.forEach(function(FC, key, map) {
            if( FC.isMapEventOnly() && $gameParty.inBattle() ) return;
            FC.update();
        });
    };
    
    Game_Map.prototype.getFilterController = function(id) {
        return this._filterConArr.get(id);
    };

    Game_Map.prototype.setFilter = function(id, target) {
        var filterController = this._filterConArr.get(id);
        if(filterController) {
            filterController.set(target || []);
            return true;
        }
        return false;
    };

    Game_Map.prototype.enableFilter = function(id, enabled) {
        var filterController = this._filterConArr.get(id);
        if(filterController) {
            filterController.enable(enabled);
            return true;
        }
        return false;
    };

    Game_Map.prototype.moveFilter = function(id, target, d) {
        var filterController = this._filterConArr.get(id);
        if(filterController) {
            filterController.clearMoveQueue();
            filterController.move(target || [], d || 1);
            return true;
        }
        return false;
    };

    Game_Map.prototype.moveFilterQueue = function(id, target, d) {
        var filterController = this._filterConArr.get(id);
        if(filterController) {
            filterController.moveQueue(target || [], d || 1);
            return true;
        }
        return false;
    };

    Game_Map.prototype.eraseFilter = function(id) {
        var filterController = this._filterConArr.get(id);
        if(filterController) {
            filterController.erase();
            return true;
        }
        return false;
    };

    Game_Map.prototype.eraseFilterAfterMove = function(id) {
        var filterController = this._filterConArr.get(id);
        if(filterController) {
            filterController.eraseAfterMove();
            return true;
        }
        return false;
    };

    Game_Map.prototype.setFilterAddiTime = function(id, time) {
        var filterController = this._filterConArr.get(id);
        if(filterController) {
            filterController.setAddiTime(time);
            return true;
        }
        return false;
    };

    //=============================================================================
    // Game_Screen
    //
    // The game object class for screen effect data, such as changes in color tone
    // and flashes.
    //=============================================================================
    
    var _Game_Screen_update = Game_Screen.prototype.update;
    Game_Screen.prototype.update = function(sceneActive) {
        _Game_Screen_update.apply(this, arguments);
        $gameMap.updateFilterConArr();
    };
    
    //=============================================================================
    // Game_CharacterBase
    //  拡張するプロパティを定義します。
    //=============================================================================
    var _DataManager_extractMetadata = DataManager.extractMetadata;
    DataManager.extractMetadata = function(data) {
        _DataManager_extractMetadata.apply(this, arguments);
        this.extractMetadataArray(data);
    };

    DataManager.extractMetadataArray = function(data) {
        var re = /<([^<>:]+)(:?)([^>]*)>/g;
        data.metaArray = {};
        var match = true;
        while (match) {
            match = re.exec(data.note);
            if (match) {
                var metaName = match[1];
                data.metaArray[metaName] = data.metaArray[metaName] || [];
                data.metaArray[metaName].push(match[2] === ':' ? match[3] : true);
            }
        }
    };
    
    //=============================================================================
    // Game_Map
    //  拡張するプロパティを定義します。
    //=============================================================================
    var _Game_Map_setup = Game_Map.prototype.setup;
    Game_Map.prototype.setup = function(mapId) {
        _Game_Map_setup.apply(this, arguments);
        this.setupTKMFilters();
    };

    Game_Map.prototype.setupTKMFilters = function() {
        if ($dataMap.metaArray === undefined) return;
        var fArray = $dataMap.metaArray.Filter;
        if(!fArray) return;
        for(var i = 0; i < fArray.length; i++) {
            var f = fArray[i].split(',');
            var id = f[0];
            var filterType = f[1];
            var targetObj = parseInt(f[2]) || 0;
            var char = 0;
            this.createFilter(id, filterType, targetObj, char);
        }
        var fSetArray = $dataMap.metaArray.SetFilter;
        if(!fSetArray) return;
        for(var i = 0; i < fSetArray.length; i++) {
            var f = fSetArray[i].split(',');
            var id = f[0];
                this.setFilter( id , ParamProcess(f.slice(1)) );
        }
        fSetArray = $dataMap.metaArray.SetFilterSpeed; 
        if(!fSetArray) return;
        for(var i = 0; i < fSetArray.length; i++) {
            var f = fSetArray[i].split(',');
            var id = f[0], speed =  Number(f[1]) || 0.01;
            var fc = this.getFilterController(id);
            if(fc) {
                this.setFilterAddiTime( id , speed );
            }
        }
    };
    
    //=============================================================================
    // Game_Event
    //  拡張するプロパティを定義します。
    //=============================================================================
    
    var _Game_Event_initialize = Game_Event.prototype.initialize;
    Game_Event.prototype.initialize = function(mapId, eventId) {
        _Game_Event_initialize.apply(this, arguments);
        this.setupTKMFilters();
    };

    Game_Event.prototype.setupTKMFilters = function() {
        if (this.event().metaArray === undefined) return;
        var fArray = this.event().metaArray.Filter;
        if(!fArray) return;
        for(var i = 0; i < fArray.length; i++) {
            var f = fArray[i].split(',');
            var id = f[0];
            var filterType = f[1];
            var targetObj = parseInt(f[2]) || 0;
            if(targetObj === 4000) targetObj += this._eventId;
            var char = this._eventId;
            $gameMap.createFilter(id, filterType, targetObj, char);
        }
        var fSetArray = this.event().metaArray.SetFilter;
        if(!fSetArray) return;
        for(var i = 0; i < fSetArray.length; i++) {
            var f = fSetArray[i].split(',');
            var id = f[0];
            $gameMap.setFilter( id , ParamProcess(f.slice(1)) );
        }
        fSetArray = this.event().metaArray.SetFilterSpeed; 
        if(!fSetArray) return;
        for(var i = 0; i < fSetArray.length; i++) {
            var f = fSetArray[i].split(',');
            var id = f[0], speed =  Number(f[1]) || 0.01;
            var fc = $gameMap.getFilterController(id);
            if(fc) {
                $gameMap.setFilterAddiTime( id , speed );
            }
        }
    };
 
    // セーブデータの生成
    // 返り値がセーブされるのでデータをcontentsに追加して返す
    var _makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function() {
        var contents = _makeSaveContents.call(this);
        contents._map_filterConArray = strMapToArray($gameMap._filterConArr);
        return contents;
    };
    
    // セーブデータの読み込み
    // 生成時と同じ形でデータがcontentsに入っているので、変数に格納する
    var extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        extractSaveContents.call(this, contents);
        $gameMap._filterConArr = new Map(contents._map_filterConArray);
        
    };
    
    function strMapToArray(strMap) {
        var arr = [];
        strMap.forEach(function(v, k, map) {
            // We don’t escape the key '__proto__'
            // which can cause problems on older engines
            arr.push([k,v]);
        });
        return arr;
    };
    
    //=============================================================================
    // Scene_******
    //  拡張するプロパティを定義します。 filterConを観測してfilterを作ります。
    //=============================================================================
    
    var _Scene_Base_initialize = Scene_Base.prototype.initialize;
    Scene_Base.prototype.initialize = function() {
        _Scene_Base_initialize.apply(this, arguments);
        this._TKMFilters = new Map();
    };
    
    Scene_Base.prototype.applyTKMFilter = function(filter, targetObj) {
        var arr, targets = this.getTKMFilterObj(targetObj);
        for(var i = 0; i < targets.length; i++) {
            var target = targets[i];
            if(!target) continue;
            arr = target.filters || [];
            arr.push(filter);
            target.filters = arr;
            
             // tilemap use special rendering; needs manual area setting
            if( targetObj === 2 || targetObj === 3 || (filter instanceof PIXI.filters.BulgePinchFilter) || 
                targetObj === 21 || targetObj === 31) {
                var margin = 0;
                var width = Graphics.width + margin * 2;
                var height = Graphics.height + margin * 2;
                target.filterArea = new Rectangle(-margin, -margin, width, height);
            }
        }
    };

    Scene_Base.prototype.removeTKMFilter = function(filter, targetObj) {
        var arr, targets = this.getTKMFilterObj(targetObj);
        for(var i = 0; i < targets.length; i++) {
            var target = targets[i];
            if(!target) continue;
            arr = target.filters || [];
            var index = arr.indexOf(filter);
            if(index >= 0) arr.splice(index, 1);
            target.filters = arr;
        }
    };

    Scene_Base.prototype.getTKMFilterObj = function(targetObj) {
        var targets = [];
        if(targetObj >= 3990 && targetObj <= 4999) {
            if(!this._spriteset) return targets;
            if(!this._spriteset._characterSprites) return targets;
            var charSprites = this._spriteset._characterSprites;
            var index = targetObj-4000;
            if(index < 0) {
                if(charSprites[charSprites.length+index]) targets.push(charSprites[charSprites.length+index]);
            }
            else if(index > 0) {
                if(charSprites[index-1] && charSprites[index-1]._character && 
                   charSprites[index-1]._character._eventId === index) {
                    targets.push(charSprites[index-1]);
                } else {
                    charSprites.some(function(e, i, arr) {
                        if(e._character && e._character._eventId === index) {
                            targets.push(e);
                            return true;
                        }
                    }, this);
                }
            }
        }
        else if(targetObj > 5000 && targetObj <= 5999) {
            if(!this._spriteset) return targets;
            if(!this._spriteset._pictureContainer) return targets;
            var picContainer = this._spriteset._pictureContainer.children;
            var picId = $gameScreen.realPictureId(targetObj-5000);
            if(picContainer[picId]) targets.push(picContainer[picId-1]);
        }
        else {
        switch(targetObj) {
            case 0:
                targets = [this._spriteset];
                break;

            case 1:
                targets = [this];
                break;
                
            case 2:
                if(!!this._spriteset) targets = [this._spriteset._tilemap];
                break;

            case 21:
                if(!!this._spriteset) targets = [this._spriteset._baseSprite];
                break;
                
            case 3:
                if(!!this._spriteset) {
                    if(!!this._spriteset._tilemap) {
                        targets = [this._spriteset._tilemap.lowerZLayer, this._spriteset._tilemap.upperZLayer];
                    }
                }
                break;

                case 31:
                if(!!this._spriteset) {
                    if(!!this._spriteset._tilemap) {
                        targets = [this._spriteset._tilemap.lowerZLayer, this._spriteset._tilemap.upperZLayer, this._spriteset._parallax];
                    }
                }
                
            case 4:
                if(!!this._spriteset) {
                    targets = this._spriteset._characterSprites; // special
                }
                break;
                
            case 5:
                if(!!this._spriteset) {
                    targets = [this._spriteset._pictureContainer];
                }
                break;
                         }
            }
        return targets;
    };
    
    Scene_Base.prototype.removeFilterOf = function(FC) {
        if(this._TKMFilters.has(FC._id)) {
            this.removeTKMFilter(this._TKMFilters.get(FC._id), FC._targetObj);
            this._TKMFilters.delete(FC._id);
        }
    };
    
    var _Scene_Map_updateMain = Scene_Map.prototype.updateMain;
    Scene_Map.prototype.updateMain = function() {
        _Scene_Map_updateMain.apply(this, arguments);
        this.updateTKMfilters();
    };
    
    Scene_Map.prototype.updateTKMfilters = function() {
        $gameMap._filterConArr.forEach(function(FC, key, map) {
            var filter = this._TKMFilters.get(FC._id);
            if(FC._erase) {
                if(filter) {
                    // remove Filter from target
                    this.removeTKMFilter(filter, FC._targetObj);
                    this._TKMFilters.delete(FC._id);
                }
                map.delete(key);
                return;
            }
            if(!filter) {
                filter = FC.createFilter();
                this._TKMFilters.set(FC._id, filter);
                this.applyTKMFilter(filter, FC._targetObj);
            }
            FC.updateFilter(filter);
        }, this);
    };
    
    var _Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function() {
        _Scene_Battle_update.apply(this, arguments);
        this.updateTKMfilters();
    };
    
    Scene_Battle.prototype.updateTKMfilters = function() {
        $gameMap._filterConArr.forEach(function(FC, key, map) {
            if(FC.isMapEventOnly()) return;
            var filter = this._TKMFilters.get(FC._id);
            if(FC._erase) {
                if(filter) {
                    // remove Filter from target
                    this.removeTKMFilter(filter, FC._targetObj);
                }
                map.delete(key);
                return;
            }
            if(!filter) {
                filter = FC.createFilter();
                this._TKMFilters.set(FC._id, filter);
                this.applyTKMFilter(filter, FC._targetObj);
            }
            FC.updateFilter(filter);
        }, this);
    };
    
    
    //=============================================================================
    // Window_Options
    //  拡張するプロパティを定義します。
    //=============================================================================

    var _Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
    Window_Options.prototype.makeCommandList = function() {
        _Window_Options_makeCommandList.apply(this, arguments);
        this.addTKMFilterOptions();
    };
    
    Window_Options.prototype.addTKMFilterOptions = function() {
        if(getParamBoolean("enabledAll-ShowInOptionMenu"))
            this.addCommand(getParamString("enabledAll-Text"), 'TKMFilterEnabledAll');
    };
    
    Object.defineProperty(ConfigManager, 'TKMFilterEnabledAll', {
        get: function() {
            return !!Filter_Controller.enabledAll;
        },
        set: function(value) {
            Filter_Controller.enabledAll = !!value;
        },
        configurable: true
    });
    
    var _ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        var config = _ConfigManager_makeData.apply(this, arguments);
        config.TKMFilterEnabledAll = this.TKMFilterEnabledAll;
        return config;
    };

    var _ConfigManager_applyData = ConfigManager.applyData; 
    ConfigManager.applyData = function(config) {
        _ConfigManager_applyData.apply(this, arguments);
        if (config['TKMFilterEnabledAll'] === undefined) { // 初回読み込み？
            this.TKMFilterEnabledAll = Filter_Controller.enabledAll;
        } 
        else
            this.TKMFilterEnabledAll = this.readFlag(config, 'TKMFilterEnabledAll');
    };

})();

/*!
 * pixi-filters - v2.7.0
 * Compiled Sun, 13 Jan 2019 22:51:52 UTC
 *
 * pixi-filters is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var __filters=function(e,t){"use strict";var n="attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}",r="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform float gamma;\nuniform float contrast;\nuniform float saturation;\nuniform float brightness;\nuniform float red;\nuniform float green;\nuniform float blue;\nuniform float alpha;\n\nvoid main(void)\n{\n    vec4 c = texture2D(uSampler, vTextureCoord);\n\n    if (c.a > 0.0) {\n        c.rgb /= c.a;\n\n        vec3 rgb = pow(c.rgb, vec3(1. / gamma));\n        rgb = mix(vec3(.5), mix(vec3(dot(vec3(.2125, .7154, .0721), rgb)), rgb, saturation), contrast);\n        rgb.r *= red;\n        rgb.g *= green;\n        rgb.b *= blue;\n        c.rgb = rgb * brightness;\n\n        c.rgb *= c.a;\n    }\n\n    gl_FragColor = c * alpha;\n}\n",o=function(e){function t(t){e.call(this,n,r),Object.assign(this,{gamma:1,saturation:1,contrast:1,brightness:1,red:1,green:1,blue:1,alpha:1},t)}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.apply=function(e,t,n,r){this.uniforms.gamma=Math.max(this.gamma,1e-4),this.uniforms.saturation=this.saturation,this.uniforms.contrast=this.contrast,this.uniforms.brightness=this.brightness,this.uniforms.red=this.red,this.uniforms.green=this.green,this.uniforms.blue=this.blue,this.uniforms.alpha=this.alpha,e.applyFilter(this,t,n,r)},t}(t.Filter),i=n,l="\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec2 uOffset;\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n\n    // Sample top left pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y + uOffset.y));\n\n    // Sample top right pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y + uOffset.y));\n\n    // Sample bottom right pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y - uOffset.y));\n\n    // Sample bottom left pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y - uOffset.y));\n\n    // Average\n    color *= 0.25;\n\n    gl_FragColor = color;\n}",s="\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec2 uOffset;\nuniform vec4 filterClamp;\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n\n    // Sample top left pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y + uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Sample top right pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y + uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Sample bottom right pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y - uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Sample bottom left pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y - uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Average\n    color *= 0.25;\n\n    gl_FragColor = color;\n}\n",a=function(e){function n(n,r,o){void 0===n&&(n=4),void 0===r&&(r=3),void 0===o&&(o=!1),e.call(this,i,o?s:l),this.uniforms.uOffset=new Float32Array(2),this._pixelSize=new t.Point,this.pixelSize=1,this._clamp=o,this._kernels=null,Array.isArray(n)?this.kernels=n:(this._blur=n,this.quality=r)}e&&(n.__proto__=e),n.prototype=Object.create(e&&e.prototype),n.prototype.constructor=n;var r={kernels:{configurable:!0},clamp:{configurable:!0},pixelSize:{configurable:!0},quality:{configurable:!0},blur:{configurable:!0}};return n.prototype.apply=function(e,t,n,r){var o,i=this.pixelSize.x/t.size.width,l=this.pixelSize.y/t.size.height;if(1===this._quality||0===this._blur)o=this._kernels[0]+.5,this.uniforms.uOffset[0]=o*i,this.uniforms.uOffset[1]=o*l,e.applyFilter(this,t,n,r);else{for(var s,a=e.getRenderTarget(!0),u=t,c=a,f=this._quality-1,h=0;h<f;h++)o=this._kernels[h]+.5,this.uniforms.uOffset[0]=o*i,this.uniforms.uOffset[1]=o*l,e.applyFilter(this,u,c,!0),s=u,u=c,c=s;o=this._kernels[f]+.5,this.uniforms.uOffset[0]=o*i,this.uniforms.uOffset[1]=o*l,e.applyFilter(this,u,n,r),e.returnRenderTarget(a)}},n.prototype._generateKernels=function(){var e=this._blur,t=this._quality,n=[e];if(e>0)for(var r=e,o=e/t,i=1;i<t;i++)r-=o,n.push(r);this._kernels=n},r.kernels.get=function(){return this._kernels},r.kernels.set=function(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max.apply(Math,e)):(this._kernels=[0],this._quality=1)},r.clamp.get=function(){return this._clamp},r.pixelSize.set=function(e){"number"==typeof e?(this._pixelSize.x=e,this._pixelSize.y=e):Array.isArray(e)?(this._pixelSize.x=e[0],this._pixelSize.y=e[1]):e instanceof t.Point?(this._pixelSize.x=e.x,this._pixelSize.y=e.y):(this._pixelSize.x=1,this._pixelSize.y=1)},r.pixelSize.get=function(){return this._pixelSize},r.quality.get=function(){return this._quality},r.quality.set=function(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()},r.blur.get=function(){return this._blur},r.blur.set=function(e){this._blur=e,this._generateKernels()},Object.defineProperties(n.prototype,r),n}(t.Filter),u=n,c="\nuniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\n\nuniform float threshold;\n\nvoid main() {\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    // A simple & fast algorithm for getting brightness.\n    // It's inaccuracy , but good enought for this feature.\n    float _max = max(max(color.r, color.g), color.b);\n    float _min = min(min(color.r, color.g), color.b);\n    float brightness = (_max + _min) * 0.5;\n\n    if(brightness > threshold) {\n        gl_FragColor = color;\n    } else {\n        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);\n    }\n}\n",f=function(e){function t(t){void 0===t&&(t=.5),e.call(this,u,c),this.threshold=t}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={threshold:{configurable:!0}};return n.threshold.get=function(){return this.uniforms.threshold},n.threshold.set=function(e){this.uniforms.threshold=e},Object.defineProperties(t.prototype,n),t}(t.Filter),h="uniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\n\nuniform sampler2D bloomTexture;\nuniform float bloomScale;\nuniform float brightness;\n\nvoid main() {\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    color.rgb *= brightness;\n    vec4 bloomColor = vec4(texture2D(bloomTexture, vTextureCoord).rgb, 0.0);\n    bloomColor.rgb *= bloomScale;\n    gl_FragColor = color + bloomColor;\n}\n",p=function(e){function n(n){e.call(this,u,h),"number"==typeof n&&(n={threshold:n}),n=Object.assign({threshold:.5,bloomScale:1,brightness:1,kernels:null,blur:8,quality:4,pixelSize:1,resolution:t.settings.RESOLUTION},n),this.bloomScale=n.bloomScale,this.brightness=n.brightness;var r=n.kernels,o=n.blur,i=n.quality,l=n.pixelSize,s=n.resolution;this._extractFilter=new f(n.threshold),this._extractFilter.resolution=s,this._blurFilter=r?new a(r):new a(o,i),this.pixelSize=l,this.resolution=s}e&&(n.__proto__=e),n.prototype=Object.create(e&&e.prototype),n.prototype.constructor=n;var r={resolution:{configurable:!0},threshold:{configurable:!0},kernels:{configurable:!0},blur:{configurable:!0},quality:{configurable:!0},pixelSize:{configurable:!0}};return n.prototype.apply=function(e,t,n,r,o){var i=e.getRenderTarget(!0);this._extractFilter.apply(e,t,i,!0,o);var l=e.getRenderTarget(!0);this._blurFilter.apply(e,i,l,!0,o),this.uniforms.bloomScale=this.bloomScale,this.uniforms.brightness=this.brightness,this.uniforms.bloomTexture=l,e.applyFilter(this,t,n,r),e.returnRenderTarget(l),e.returnRenderTarget(i)},r.resolution.get=function(){return this._resolution},r.resolution.set=function(e){this._resolution=e,this._extractFilter&&(this._extractFilter.resolution=e),this._blurFilter&&(this._blurFilter.resolution=e)},r.threshold.get=function(){return this._extractFilter.threshold},r.threshold.set=function(e){this._extractFilter.threshold=e},r.kernels.get=function(){return this._blurFilter.kernels},r.kernels.set=function(e){this._blurFilter.kernels=e},r.blur.get=function(){return this._blurFilter.blur},r.blur.set=function(e){this._blurFilter.blur=e},r.quality.get=function(){return this._blurFilter.quality},r.quality.set=function(e){this._blurFilter.quality=e},r.pixelSize.get=function(){return this._blurFilter.pixelSize},r.pixelSize.set=function(e){this._blurFilter.pixelSize=e},Object.defineProperties(n.prototype,r),n}(t.Filter),d=n,m="varying vec2 vTextureCoord;\n\nuniform vec4 filterArea;\nuniform float pixelSize;\nuniform sampler2D uSampler;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvec2 pixelate(vec2 coord, vec2 size)\n{\n    return floor( coord / size ) * size;\n}\n\nvec2 getMod(vec2 coord, vec2 size)\n{\n    return mod( coord , size) / size;\n}\n\nfloat character(float n, vec2 p)\n{\n    p = floor(p*vec2(4.0, -4.0) + 2.5);\n    if (clamp(p.x, 0.0, 4.0) == p.x && clamp(p.y, 0.0, 4.0) == p.y)\n    {\n        if (int(mod(n/exp2(p.x + 5.0*p.y), 2.0)) == 1) return 1.0;\n    }\n    return 0.0;\n}\n\nvoid main()\n{\n    vec2 coord = mapCoord(vTextureCoord);\n\n    // get the rounded color..\n    vec2 pixCoord = pixelate(coord, vec2(pixelSize));\n    pixCoord = unmapCoord(pixCoord);\n\n    vec4 color = texture2D(uSampler, pixCoord);\n\n    // determine the character to use\n    float gray = (color.r + color.g + color.b) / 3.0;\n\n    float n =  65536.0;             // .\n    if (gray > 0.2) n = 65600.0;    // :\n    if (gray > 0.3) n = 332772.0;   // *\n    if (gray > 0.4) n = 15255086.0; // o\n    if (gray > 0.5) n = 23385164.0; // &\n    if (gray > 0.6) n = 15252014.0; // 8\n    if (gray > 0.7) n = 13199452.0; // @\n    if (gray > 0.8) n = 11512810.0; // #\n\n    // get the mod..\n    vec2 modd = getMod(coord, vec2(pixelSize));\n\n    gl_FragColor = color * character( n, vec2(-1.0) + modd * 2.0);\n\n}",g=function(e){function t(t){void 0===t&&(t=8),e.call(this,d,m),this.size=t}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={size:{configurable:!0}};return n.size.get=function(){return this.uniforms.pixelSize},n.size.set=function(e){this.uniforms.pixelSize=e},Object.defineProperties(t.prototype,n),t}(t.Filter),v=n,x="precision mediump float;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform float transformX;\nuniform float transformY;\nuniform vec3 lightColor;\nuniform float lightAlpha;\nuniform vec3 shadowColor;\nuniform float shadowAlpha;\n\nvoid main(void) {\n    vec2 transform = vec2(1.0 / filterArea) * vec2(transformX, transformY);\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    float light = texture2D(uSampler, vTextureCoord - transform).a;\n    float shadow = texture2D(uSampler, vTextureCoord + transform).a;\n\n    color.rgb = mix(color.rgb, lightColor, clamp((color.a - light) * lightAlpha, 0.0, 1.0));\n    color.rgb = mix(color.rgb, shadowColor, clamp((color.a - shadow) * shadowAlpha, 0.0, 1.0));\n    gl_FragColor = vec4(color.rgb * color.a, color.a);\n}\n",y=function(e){function n(t){void 0===t&&(t={}),e.call(this,v,x),this.uniforms.lightColor=new Float32Array(3),this.uniforms.shadowColor=new Float32Array(3),t=Object.assign({rotation:45,thickness:2,lightColor:16777215,lightAlpha:.7,shadowColor:0,shadowAlpha:.7},t),this.rotation=t.rotation,this.thickness=t.thickness,this.lightColor=t.lightColor,this.lightAlpha=t.lightAlpha,this.shadowColor=t.shadowColor,this.shadowAlpha=t.shadowAlpha}e&&(n.__proto__=e),n.prototype=Object.create(e&&e.prototype),n.prototype.constructor=n;var r={rotation:{configurable:!0},thickness:{configurable:!0},lightColor:{configurable:!0},lightAlpha:{configurable:!0},shadowColor:{configurable:!0},shadowAlpha:{configurable:!0}};return n.prototype._updateTransform=function(){this.uniforms.transformX=this._thickness*Math.cos(this._angle),this.uniforms.transformY=this._thickness*Math.sin(this._angle)},r.rotation.get=function(){return this._angle/t.DEG_TO_RAD},r.rotation.set=function(e){this._angle=e*t.DEG_TO_RAD,this._updateTransform()},r.thickness.get=function(){return this._thickness},r.thickness.set=function(e){this._thickness=e,this._updateTransform()},r.lightColor.get=function(){return t.utils.rgb2hex(this.uniforms.lightColor)},r.lightColor.set=function(e){t.utils.hex2rgb(e,this.uniforms.lightColor)},r.lightAlpha.get=function(){return this.uniforms.lightAlpha},r.lightAlpha.set=function(e){this.uniforms.lightAlpha=e},r.shadowColor.get=function(){return t.utils.rgb2hex(this.uniforms.shadowColor)},r.shadowColor.set=function(e){t.utils.hex2rgb(e,this.uniforms.shadowColor)},r.shadowAlpha.get=function(){return this.uniforms.shadowAlpha},r.shadowAlpha.set=function(e){this.uniforms.shadowAlpha=e},Object.defineProperties(n.prototype,r),n}(t.Filter),b=t.filters,_=b.BlurXFilter,C=b.BlurYFilter,S=b.AlphaFilter,F=function(e){function n(n,r,o,i){var l,s;void 0===n&&(n=2),void 0===r&&(r=4),void 0===o&&(o=t.settings.RESOLUTION),void 0===i&&(i=5),e.call(this),"number"==typeof n?(l=n,s=n):n instanceof t.Point?(l=n.x,s=n.y):Array.isArray(n)&&(l=n[0],s=n[1]),this.blurXFilter=new _(l,r,o,i),this.blurYFilter=new C(s,r,o,i),this.blurYFilter.blendMode=t.BLEND_MODES.SCREEN,this.defaultFilter=new S}e&&(n.__proto__=e),n.prototype=Object.create(e&&e.prototype),n.prototype.constructor=n;var r={blur:{configurable:!0},blurX:{configurable:!0},blurY:{configurable:!0}};return n.prototype.apply=function(e,t,n){var r=e.getRenderTarget(!0);this.defaultFilter.apply(e,t,n),this.blurXFilter.apply(e,t,r),this.blurYFilter.apply(e,r,n),e.returnRenderTarget(r)},r.blur.get=function(){return this.blurXFilter.blur},r.blur.set=function(e){this.blurXFilter.blur=this.blurYFilter.blur=e},r.blurX.get=function(){return this.blurXFilter.blur},r.blurX.set=function(e){this.blurXFilter.blur=e},r.blurY.get=function(){return this.blurYFilter.blur},r.blurY.set=function(e){this.blurYFilter.blur=e},Object.defineProperties(n.prototype,r),n}(t.Filter),z=n,A="uniform float radius;\nuniform float strength;\nuniform vec2 center;\nuniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform vec2 dimensions;\n\nvoid main()\n{\n    vec2 coord = vTextureCoord * filterArea.xy;\n    coord -= center * dimensions.xy;\n    float distance = length(coord);\n    if (distance < radius) {\n        float percent = distance / radius;\n        if (strength > 0.0) {\n            coord *= mix(1.0, smoothstep(0.0, radius / distance, percent), strength * 0.75);\n        } else {\n            coord *= mix(1.0, pow(percent, 1.0 + strength * 0.75) * radius / distance, 1.0 - percent);\n        }\n    }\n    coord += center * dimensions.xy;\n    coord /= filterArea.xy;\n    vec2 clampedCoord = clamp(coord, filterClamp.xy, filterClamp.zw);\n    vec4 color = texture2D(uSampler, clampedCoord);\n    if (coord != clampedCoord) {\n        color *= max(0.0, 1.0 - length(coord - clampedCoord));\n    }\n\n    gl_FragColor = color;\n}\n",w=function(e){function t(t,n,r){e.call(this,z,A),this.uniforms.dimensions=new Float32Array(2),this.center=t||[.5,.5],this.radius="number"==typeof n?n:100,this.strength="number"==typeof r?r:1}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={radius:{configurable:!0},strength:{configurable:!0},center:{configurable:!0}};return t.prototype.apply=function(e,t,n,r){this.uniforms.dimensions[0]=t.sourceFrame.width,this.uniforms.dimensions[1]=t.sourceFrame.height,e.applyFilter(this,t,n,r)},n.radius.get=function(){return this.uniforms.radius},n.radius.set=function(e){this.uniforms.radius=e},n.strength.get=function(){return this.uniforms.strength},n.strength.set=function(e){this.uniforms.strength=e},n.center.get=function(){return this.uniforms.center},n.center.set=function(e){this.uniforms.center=e},Object.defineProperties(t.prototype,n),t}(t.Filter),T=n,D="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform sampler2D colorMap;\nuniform float _mix;\nuniform float _size;\nuniform float _sliceSize;\nuniform float _slicePixelSize;\nuniform float _sliceInnerSize;\nvoid main() {\n    vec4 color = texture2D(uSampler, vTextureCoord.xy);\n\n    vec4 adjusted;\n    if (color.a > 0.0) {\n        color.rgb /= color.a;\n        float innerWidth = _size - 1.0;\n        float zSlice0 = min(floor(color.b * innerWidth), innerWidth);\n        float zSlice1 = min(zSlice0 + 1.0, innerWidth);\n        float xOffset = _slicePixelSize * 0.5 + color.r * _sliceInnerSize;\n        float s0 = xOffset + (zSlice0 * _sliceSize);\n        float s1 = xOffset + (zSlice1 * _sliceSize);\n        float yOffset = _sliceSize * 0.5 + color.g * (1.0 - _sliceSize);\n        vec4 slice0Color = texture2D(colorMap, vec2(s0,yOffset));\n        vec4 slice1Color = texture2D(colorMap, vec2(s1,yOffset));\n        float zOffset = fract(color.b * innerWidth);\n        adjusted = mix(slice0Color, slice1Color, zOffset);\n\n        color.rgb *= color.a;\n    }\n    gl_FragColor = vec4(mix(color, adjusted, _mix).rgb, color.a);\n\n}",O=function(e){function n(t,n,r){void 0===n&&(n=!1),void 0===r&&(r=1),e.call(this,T,D),this._size=0,this._sliceSize=0,this._slicePixelSize=0,this._sliceInnerSize=0,this._scaleMode=null,this._nearest=!1,this.nearest=n,this.mix=r,this.colorMap=t}e&&(n.__proto__=e),n.prototype=Object.create(e&&e.prototype),n.prototype.constructor=n;var r={colorSize:{configurable:!0},colorMap:{configurable:!0},nearest:{configurable:!0}};return n.prototype.apply=function(e,t,n,r){this.uniforms._mix=this.mix,e.applyFilter(this,t,n,r)},r.colorSize.get=function(){return this._size},r.colorMap.get=function(){return this._colorMap},r.colorMap.set=function(e){e instanceof t.Texture||(e=t.Texture.from(e)),e&&e.baseTexture&&(e.baseTexture.scaleMode=this._scaleMode,e.baseTexture.mipmap=!1,this._size=e.height,this._sliceSize=1/this._size,this._slicePixelSize=this._sliceSize/this._size,this._sliceInnerSize=this._slicePixelSize*(this._size-1),this.uniforms._size=this._size,this.uniforms._sliceSize=this._sliceSize,this.uniforms._slicePixelSize=this._slicePixelSize,this.uniforms._sliceInnerSize=this._sliceInnerSize,this.uniforms.colorMap=e),this._colorMap=e},r.nearest.get=function(){return this._nearest},r.nearest.set=function(e){this._nearest=e,this._scaleMode=e?t.SCALE_MODES.NEAREST:t.SCALE_MODES.LINEAR;var n=this._colorMap;n&&n.baseTexture&&(n.baseTexture._glTextures={},n.baseTexture.scaleMode=this._scaleMode,n.baseTexture.mipmap=!1,n._updateID++,n.baseTexture.emit("update",n.baseTexture))},n.prototype.updateColorMap=function(){var e=this._colorMap;e&&e.baseTexture&&(e._updateID++,e.baseTexture.emit("update",e.baseTexture),this.colorMap=e)},n.prototype.destroy=function(t){this._colorMap&&this._colorMap.destroy(t),e.prototype.destroy.call(this)},Object.defineProperties(n.prototype,r),n}(t.Filter),P=n,M="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec3 originalColor;\nuniform vec3 newColor;\nuniform float epsilon;\nvoid main(void) {\n    vec4 currentColor = texture2D(uSampler, vTextureCoord);\n    vec3 colorDiff = originalColor - (currentColor.rgb / max(currentColor.a, 0.0000000001));\n    float colorDistance = length(colorDiff);\n    float doReplace = step(colorDistance, epsilon);\n    gl_FragColor = vec4(mix(currentColor.rgb, (newColor + colorDiff) * currentColor.a, doReplace), currentColor.a);\n}\n",R=function(e){function n(t,n,r){void 0===t&&(t=16711680),void 0===n&&(n=0),void 0===r&&(r=.4),e.call(this,P,M),this.uniforms.originalColor=new Float32Array(3),this.uniforms.newColor=new Float32Array(3),this.originalColor=t,this.newColor=n,this.epsilon=r}e&&(n.__proto__=e),n.prototype=Object.create(e&&e.prototype),n.prototype.constructor=n;var r={originalColor:{configurable:!0},newColor:{configurable:!0},epsilon:{configurable:!0}};return r.originalColor.set=function(e){var n=this.uniforms.originalColor;"number"==typeof e?(t.utils.hex2rgb(e,n),this._originalColor=e):(n[0]=e[0],n[1]=e[1],n[2]=e[2],this._originalColor=t.utils.rgb2hex(n))},r.originalColor.get=function(){return this._originalColor},r.newColor.set=function(e){var n=this.uniforms.newColor;"number"==typeof e?(t.utils.hex2rgb(e,n),this._newColor=e):(n[0]=e[0],n[1]=e[1],n[2]=e[2],this._newColor=t.utils.rgb2hex(n))},r.newColor.get=function(){return this._newColor},r.epsilon.set=function(e){this.uniforms.epsilon=e},r.epsilon.get=function(){return this.uniforms.epsilon},Object.defineProperties(n.prototype,r),n}(t.Filter),j=n,L="precision mediump float;\n\nvarying mediump vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec2 texelSize;\nuniform float matrix[9];\n\nvoid main(void)\n{\n   vec4 c11 = texture2D(uSampler, vTextureCoord - texelSize); // top left\n   vec4 c12 = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - texelSize.y)); // top center\n   vec4 c13 = texture2D(uSampler, vec2(vTextureCoord.x + texelSize.x, vTextureCoord.y - texelSize.y)); // top right\n\n   vec4 c21 = texture2D(uSampler, vec2(vTextureCoord.x - texelSize.x, vTextureCoord.y)); // mid left\n   vec4 c22 = texture2D(uSampler, vTextureCoord); // mid center\n   vec4 c23 = texture2D(uSampler, vec2(vTextureCoord.x + texelSize.x, vTextureCoord.y)); // mid right\n\n   vec4 c31 = texture2D(uSampler, vec2(vTextureCoord.x - texelSize.x, vTextureCoord.y + texelSize.y)); // bottom left\n   vec4 c32 = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + texelSize.y)); // bottom center\n   vec4 c33 = texture2D(uSampler, vTextureCoord + texelSize); // bottom right\n\n   gl_FragColor =\n       c11 * matrix[0] + c12 * matrix[1] + c13 * matrix[2] +\n       c21 * matrix[3] + c22 * matrix[4] + c23 * matrix[5] +\n       c31 * matrix[6] + c32 * matrix[7] + c33 * matrix[8];\n\n   gl_FragColor.a = c22.a;\n}\n",k=function(e){function t(t,n,r){void 0===n&&(n=200),void 0===r&&(r=200),e.call(this,j,L),this.uniforms.texelSize=new Float32Array(2),this.uniforms.matrix=new Float32Array(9),void 0!==t&&(this.matrix=t),this.width=n,this.height=r}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={matrix:{configurable:!0},width:{configurable:!0},height:{configurable:!0}};return n.matrix.get=function(){return this.uniforms.matrix},n.matrix.set=function(e){var t=this;e.forEach(function(e,n){return t.uniforms.matrix[n]=e})},n.width.get=function(){return 1/this.uniforms.texelSize[0]},n.width.set=function(e){this.uniforms.texelSize[0]=1/e},n.height.get=function(){return 1/this.uniforms.texelSize[1]},n.height.set=function(e){this.uniforms.texelSize[1]=1/e},Object.defineProperties(t.prototype,n),t}(t.Filter),I=n,E="precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    float lum = length(texture2D(uSampler, vTextureCoord.xy).rgb);\n\n    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n\n    if (lum < 1.00)\n    {\n        if (mod(gl_FragCoord.x + gl_FragCoord.y, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.75)\n    {\n        if (mod(gl_FragCoord.x - gl_FragCoord.y, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.50)\n    {\n        if (mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.3)\n    {\n        if (mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n}\n",B=function(e){function t(){e.call(this,I,E)}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t}(t.Filter),X=n,q="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\nuniform vec2 dimensions;\n\nconst float SQRT_2 = 1.414213;\n\nconst float light = 1.0;\n\nuniform float curvature;\nuniform float lineWidth;\nuniform float lineContrast;\nuniform bool verticalLine;\nuniform float noise;\nuniform float noiseSize;\n\nuniform float vignetting;\nuniform float vignettingAlpha;\nuniform float vignettingBlur;\n\nuniform float seed;\nuniform float time;\n\nfloat rand(vec2 co) {\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main(void)\n{\n    vec2 pixelCoord = vTextureCoord.xy * filterArea.xy;\n    vec2 coord = pixelCoord / dimensions;\n\n    vec2 dir = vec2(coord - vec2(0.5, 0.5));\n\n    float _c = curvature > 0. ? curvature : 1.;\n    float k = curvature > 0. ?(length(dir * dir) * 0.25 * _c * _c + 0.935 * _c) : 1.;\n    vec2 uv = dir * k;\n\n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n    vec3 rgb = gl_FragColor.rgb;\n\n\n    if (noise > 0.0 && noiseSize > 0.0)\n    {\n        pixelCoord.x = floor(pixelCoord.x / noiseSize);\n        pixelCoord.y = floor(pixelCoord.y / noiseSize);\n        float _noise = rand(pixelCoord * noiseSize * seed) - 0.5;\n        rgb += _noise * noise;\n    }\n\n    if (lineWidth > 0.0) {\n        float v = (verticalLine ? uv.x * dimensions.x : uv.y * dimensions.y) * min(1.0, 2.0 / lineWidth ) / _c;\n        float j = 1. + cos(v * 1.2 - time) * 0.5 * lineContrast;\n        rgb *= j;\n        float segment = verticalLine ? mod((dir.x + .5) * dimensions.x, 4.) : mod((dir.y + .5) * dimensions.y, 4.);\n        rgb *= 0.99 + ceil(segment) * 0.015;\n    }\n\n    if (vignetting > 0.0)\n    {\n        float outter = SQRT_2 - vignetting * SQRT_2;\n        float darker = clamp((outter - length(dir) * SQRT_2) / ( 0.00001 + vignettingBlur * SQRT_2), 0.0, 1.0);\n        rgb *= darker + (1.0 - darker) * (1.0 - vignettingAlpha);\n    }\n\n    gl_FragColor.rgb = rgb;\n}\n",N=function(e){function t(t){e.call(this,X,q),this.uniforms.dimensions=new Float32Array(2),this.time=0,this.seed=0,Object.assign(this,{curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,seed:0,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0},t)}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={curvature:{configurable:!0},lineWidth:{configurable:!0},lineContrast:{configurable:!0},verticalLine:{configurable:!0},noise:{configurable:!0},noiseSize:{configurable:!0},vignetting:{configurable:!0},vignettingAlpha:{configurable:!0},vignettingBlur:{configurable:!0}};return t.prototype.apply=function(e,t,n,r){this.uniforms.dimensions[0]=t.sourceFrame.width,this.uniforms.dimensions[1]=t.sourceFrame.height,this.uniforms.seed=this.seed,this.uniforms.time=this.time,e.applyFilter(this,t,n,r)},n.curvature.set=function(e){this.uniforms.curvature=e},n.curvature.get=function(){return this.uniforms.curvature},n.lineWidth.set=function(e){this.uniforms.lineWidth=e},n.lineWidth.get=function(){return this.uniforms.lineWidth},n.lineContrast.set=function(e){this.uniforms.lineContrast=e},n.lineContrast.get=function(){return this.uniforms.lineContrast},n.verticalLine.set=function(e){this.uniforms.verticalLine=e},n.verticalLine.get=function(){return this.uniforms.verticalLine},n.noise.set=function(e){this.uniforms.noise=e},n.noise.get=function(){return this.uniforms.noise},n.noiseSize.set=function(e){this.uniforms.noiseSize=e},n.noiseSize.get=function(){return this.uniforms.noiseSize},n.vignetting.set=function(e){this.uniforms.vignetting=e},n.vignetting.get=function(){return this.uniforms.vignetting},n.vignettingAlpha.set=function(e){this.uniforms.vignettingAlpha=e},n.vignettingAlpha.get=function(){return this.uniforms.vignettingAlpha},n.vignettingBlur.set=function(e){this.uniforms.vignettingBlur=e},n.vignettingBlur.get=function(){return this.uniforms.vignettingBlur},Object.defineProperties(t.prototype,n),t}(t.Filter),W=n,G="precision mediump float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform vec4 filterArea;\nuniform sampler2D uSampler;\n\nuniform float angle;\nuniform float scale;\n\nfloat pattern()\n{\n   float s = sin(angle), c = cos(angle);\n   vec2 tex = vTextureCoord * filterArea.xy;\n   vec2 point = vec2(\n       c * tex.x - s * tex.y,\n       s * tex.x + c * tex.y\n   ) * scale;\n   return (sin(point.x) * sin(point.y)) * 4.0;\n}\n\nvoid main()\n{\n   vec4 color = texture2D(uSampler, vTextureCoord);\n   float average = (color.r + color.g + color.b) / 3.0;\n   gl_FragColor = vec4(vec3(average * 10.0 - 5.0 + pattern()), color.a);\n}\n",K=function(e){function t(t,n){void 0===t&&(t=1),void 0===n&&(n=5),e.call(this,W,G),this.scale=t,this.angle=n}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={scale:{configurable:!0},angle:{configurable:!0}};return n.scale.get=function(){return this.uniforms.scale},n.scale.set=function(e){this.uniforms.scale=e},n.angle.get=function(){return this.uniforms.angle},n.angle.set=function(e){this.uniforms.angle=e},Object.defineProperties(t.prototype,n),t}(t.Filter),Y=n,Q="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float alpha;\nuniform vec3 color;\nvoid main(void){\n    vec4 sample = texture2D(uSampler, vTextureCoord);\n\n    // Un-premultiply alpha before applying the color\n    if (sample.a > 0.0) {\n        sample.rgb /= sample.a;\n    }\n\n    // Premultiply alpha again\n    sample.rgb = color.rgb * sample.a;\n\n    // alpha user alpha\n    sample *= alpha;\n\n    gl_FragColor = sample;\n}",U=function(e){function n(n){n&&n.constructor!==Object&&(console.warn("DropShadowFilter now uses options instead of (rotation, distance, blur, color, alpha)"),n={rotation:n},void 0!==arguments[1]&&(n.distance=arguments[1]),void 0!==arguments[2]&&(n.blur=arguments[2]),void 0!==arguments[3]&&(n.color=arguments[3]),void 0!==arguments[4]&&(n.alpha=arguments[4])),n=Object.assign({rotation:45,distance:5,color:0,alpha:.5,shadowOnly:!1,kernels:null,blur:2,quality:3,pixelSize:1,resolution:t.settings.RESOLUTION},n),e.call(this);var r=n.kernels,o=n.blur,i=n.quality,l=n.pixelSize,s=n.resolution;this._tintFilter=new t.Filter(Y,Q),this._tintFilter.uniforms.color=new Float32Array(4),this._tintFilter.resolution=s,this._blurFilter=r?new a(r):new a(o,i),this.pixelSize=l,this.resolution=s,this.targetTransform=new t.Matrix;var u=n.shadowOnly,c=n.rotation,f=n.distance,h=n.alpha,p=n.color;this.shadowOnly=u,this.rotation=c,this.distance=f,this.alpha=h,this.color=p,this._updatePadding()}e&&(n.__proto__=e),n.prototype=Object.create(e&&e.prototype),n.prototype.constructor=n;var r={resolution:{configurable:!0},distance:{configurable:!0},rotation:{configurable:!0},alpha:{configurable:!0},color:{configurable:!0},kernels:{configurable:!0},blur:{configurable:!0},quality:{configurable:!0},pixelSize:{configurable:!0}};return n.prototype.apply=function(e,t,n,r){var o=e.getRenderTarget();o.transform=this.targetTransform,this._tintFilter.apply(e,t,o,!0),o.transform=null,this._blurFilter.apply(e,o,n,r),!0!==this.shadowOnly&&e.applyFilter(this,t,n,!1),e.returnRenderTarget(o)},n.prototype._updatePadding=function(){this.padding=this.distance+2*this.blur},n.prototype._updateTargetTransform=function(){this.targetTransform.tx=this.distance*Math.cos(this.angle),this.targetTransform.ty=this.distance*Math.sin(this.angle)},r.resolution.get=function(){return this._resolution},r.resolution.set=function(e){this._resolution=e,this._tintFilter&&(this._tintFilter.resolution=e),this._blurFilter&&(this._blurFilter.resolution=e)},r.distance.get=function(){return this._distance},r.distance.set=function(e){this._distance=e,this._updatePadding(),this._updateTargetTransform()},r.rotation.get=function(){return this.angle/t.DEG_TO_RAD},r.rotation.set=function(e){this.angle=e*t.DEG_TO_RAD,this._updateTargetTransform()},r.alpha.get=function(){return this._tintFilter.uniforms.alpha},r.alpha.set=function(e){this._tintFilter.uniforms.alpha=e},r.color.get=function(){return t.utils.rgb2hex(this._tintFilter.uniforms.color)},r.color.set=function(e){t.utils.hex2rgb(e,this._tintFilter.uniforms.color)},r.kernels.get=function(){return this._blurFilter.kernels},r.kernels.set=function(e){this._blurFilter.kernels=e},r.blur.get=function(){return this._blurFilter.blur},r.blur.set=function(e){this._blurFilter.blur=e,this._updatePadding()},r.quality.get=function(){return this._blurFilter.quality},r.quality.set=function(e){this._blurFilter.quality=e},r.pixelSize.get=function(){return this._blurFilter.pixelSize},r.pixelSize.set=function(e){this._blurFilter.pixelSize=e},Object.defineProperties(n.prototype,r),n}(t.Filter),Z=n,V="precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float strength;\nuniform vec4 filterArea;\n\n\nvoid main(void)\n{\n\tvec2 onePixel = vec2(1.0 / filterArea);\n\n\tvec4 color;\n\n\tcolor.rgb = vec3(0.5);\n\n\tcolor -= texture2D(uSampler, vTextureCoord - onePixel) * strength;\n\tcolor += texture2D(uSampler, vTextureCoord + onePixel) * strength;\n\n\tcolor.rgb = vec3((color.r + color.g + color.b) / 3.0);\n\n\tfloat alpha = texture2D(uSampler, vTextureCoord).a;\n\n\tgl_FragColor = vec4(color.rgb * alpha, alpha);\n}\n",H=function(e){function t(t){void 0===t&&(t=5),e.call(this,Z,V),this.strength=t}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={strength:{configurable:!0}};return n.strength.get=function(){return this.uniforms.strength},n.strength.set=function(e){this.uniforms.strength=e},Object.defineProperties(t.prototype,n),t}(t.Filter),$=n,J="// precision highp float;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform vec2 dimensions;\nuniform float aspect;\n\nuniform sampler2D displacementMap;\nuniform float offset;\nuniform float sinDir;\nuniform float cosDir;\nuniform int fillMode;\n\nuniform float seed;\nuniform vec2 red;\nuniform vec2 green;\nuniform vec2 blue;\n\nconst int TRANSPARENT = 0;\nconst int ORIGINAL = 1;\nconst int LOOP = 2;\nconst int CLAMP = 3;\nconst int MIRROR = 4;\n\nvoid main(void)\n{\n    vec2 coord = (vTextureCoord * filterArea.xy) / dimensions;\n\n    if (coord.x > 1.0 || coord.y > 1.0) {\n        return;\n    }\n\n    float cx = coord.x - 0.5;\n    float cy = (coord.y - 0.5) * aspect;\n    float ny = (-sinDir * cx + cosDir * cy) / aspect + 0.5;\n\n    // displacementMap: repeat\n    // ny = ny > 1.0 ? ny - 1.0 : (ny < 0.0 ? 1.0 + ny : ny);\n\n    // displacementMap: mirror\n    ny = ny > 1.0 ? 2.0 - ny : (ny < 0.0 ? -ny : ny);\n\n    vec4 dc = texture2D(displacementMap, vec2(0.5, ny));\n\n    float displacement = (dc.r - dc.g) * (offset / filterArea.x);\n\n    coord = vTextureCoord + vec2(cosDir * displacement, sinDir * displacement * aspect);\n\n    if (fillMode == CLAMP) {\n        coord = clamp(coord, filterClamp.xy, filterClamp.zw);\n    } else {\n        if( coord.x > filterClamp.z ) {\n            if (fillMode == ORIGINAL) {\n                gl_FragColor = texture2D(uSampler, vTextureCoord);\n                return;\n            } else if (fillMode == LOOP) {\n                coord.x -= filterClamp.z;\n            } else if (fillMode == MIRROR) {\n                coord.x = filterClamp.z * 2.0 - coord.x;\n            } else {\n                gl_FragColor = vec4(0., 0., 0., 0.);\n                return;\n            }\n        } else if( coord.x < filterClamp.x ) {\n            if (fillMode == ORIGINAL) {\n                gl_FragColor = texture2D(uSampler, vTextureCoord);\n                return;\n            } else if (fillMode == LOOP) {\n                coord.x += filterClamp.z;\n            } else if (fillMode == MIRROR) {\n                coord.x *= -filterClamp.z;\n            } else {\n                gl_FragColor = vec4(0., 0., 0., 0.);\n                return;\n            }\n        }\n\n        if( coord.y > filterClamp.w ) {\n            if (fillMode == ORIGINAL) {\n                gl_FragColor = texture2D(uSampler, vTextureCoord);\n                return;\n            } else if (fillMode == LOOP) {\n                coord.y -= filterClamp.w;\n            } else if (fillMode == MIRROR) {\n                coord.y = filterClamp.w * 2.0 - coord.y;\n            } else {\n                gl_FragColor = vec4(0., 0., 0., 0.);\n                return;\n            }\n        } else if( coord.y < filterClamp.y ) {\n            if (fillMode == ORIGINAL) {\n                gl_FragColor = texture2D(uSampler, vTextureCoord);\n                return;\n            } else if (fillMode == LOOP) {\n                coord.y += filterClamp.w;\n            } else if (fillMode == MIRROR) {\n                coord.y *= -filterClamp.w;\n            } else {\n                gl_FragColor = vec4(0., 0., 0., 0.);\n                return;\n            }\n        }\n    }\n\n    gl_FragColor.r = texture2D(uSampler, coord + red * (1.0 - seed * 0.4) / filterArea.xy).r;\n    gl_FragColor.g = texture2D(uSampler, coord + green * (1.0 - seed * 0.3) / filterArea.xy).g;\n    gl_FragColor.b = texture2D(uSampler, coord + blue * (1.0 - seed * 0.2) / filterArea.xy).b;\n    gl_FragColor.a = texture2D(uSampler, coord).a;\n}\n",ee=function(e){function n(n){void 0===n&&(n={}),e.call(this,$,J),this.uniforms.dimensions=new Float32Array(2),n=Object.assign({slices:5,offset:100,direction:0,fillMode:0,average:!1,seed:0,red:[0,0],green:[0,0],blue:[0,0],minSize:8,sampleSize:512},n),this.direction=n.direction,this.red=n.red,this.green=n.green,this.blue=n.blue,this.offset=n.offset,this.fillMode=n.fillMode,this.average=n.average,this.seed=n.seed,this.minSize=n.minSize,this.sampleSize=n.sampleSize,this._canvas=document.createElement("canvas"),this._canvas.width=4,this._canvas.height=this.sampleSize,this.texture=t.Texture.fromCanvas(this._canvas,t.SCALE_MODES.NEAREST),this._slices=0,this.slices=n.slices}e&&(n.__proto__=e),n.prototype=Object.create(e&&e.prototype),n.prototype.constructor=n;var r={sizes:{configurable:!0},offsets:{configurable:!0},slices:{configurable:!0},direction:{configurable:!0},red:{configurable:!0},green:{configurable:!0},blue:{configurable:!0}};return n.prototype.apply=function(e,t,n,r){var o=t.sourceFrame.width,i=t.sourceFrame.height;this.uniforms.dimensions[0]=o,this.uniforms.dimensions[1]=i,this.uniforms.aspect=i/o,this.uniforms.seed=this.seed,this.uniforms.offset=this.offset,this.uniforms.fillMode=this.fillMode,e.applyFilter(this,t,n,r)},n.prototype._randomizeSizes=function(){var e=this._sizes,t=this._slices-1,n=this.sampleSize,r=Math.min(this.minSize/n,.9/this._slices);if(this.average){for(var o=this._slices,i=1,l=0;l<t;l++){var s=i/(o-l),a=Math.max(s*(1-.6*Math.random()),r);e[l]=a,i-=a}e[t]=i}else{for(var u=1,c=Math.sqrt(1/this._slices),f=0;f<t;f++){var h=Math.max(c*u*Math.random(),r);e[f]=h,u-=h}e[t]=u}this.shuffle()},n.prototype.shuffle=function(){for(var e=this._sizes,t=this._slices-1;t>0;t--){var n=Math.random()*t>>0,r=e[t];e[t]=e[n],e[n]=r}},n.prototype._randomizeOffsets=function(){for(var e=0;e<this._slices;e++)this._offsets[e]=Math.random()*(Math.random()<.5?-1:1)},n.prototype.refresh=function(){this._randomizeSizes(),this._randomizeOffsets(),this.redraw()},n.prototype.redraw=function(){var e,t=this.sampleSize,n=this.texture,r=this._canvas.getContext("2d");r.clearRect(0,0,8,t);for(var o=0,i=0;i<this._slices;i++){e=Math.floor(256*this._offsets[i]);var l=this._sizes[i]*t,s=e>0?e:0,a=e<0?-e:0;r.fillStyle="rgba("+s+", "+a+", 0, 1)",r.fillRect(0,o>>0,t,l+1>>0),o+=l}n.baseTexture.update(),this.uniforms.displacementMap=n},r.sizes.set=function(e){for(var t=Math.min(this._slices,e.length),n=0;n<t;n++)this._sizes[n]=e[n]},r.sizes.get=function(){return this._sizes},r.offsets.set=function(e){for(var t=Math.min(this._slices,e.length),n=0;n<t;n++)this._offsets[n]=e[n]},r.offsets.get=function(){return this._offsets},r.slices.get=function(){return this._slices},r.slices.set=function(e){this._slices!==e&&(this._slices=e,this.uniforms.slices=e,this._sizes=this.uniforms.slicesWidth=new Float32Array(e),this._offsets=this.uniforms.slicesOffset=new Float32Array(e),this.refresh())},r.direction.get=function(){return this._direction},r.direction.set=function(e){if(this._direction!==e){this._direction=e;var n=e*t.DEG_TO_RAD;this.uniforms.sinDir=Math.sin(n),this.uniforms.cosDir=Math.cos(n)}},r.red.get=function(){return this.uniforms.red},r.red.set=function(e){this.uniforms.red=e},r.green.get=function(){return this.uniforms.green},r.green.set=function(e){this.uniforms.green=e},r.blue.get=function(){return this.uniforms.blue},r.blue.set=function(e){this.uniforms.blue=e},n.prototype.destroy=function(){this.texture.destroy(!0),this.texture=null,this._canvas=null,this.red=null,this.green=null,this.blue=null,this._sizes=null,this._offsets=null},Object.defineProperties(n.prototype,r),n}(t.Filter);ee.TRANSPARENT=0,ee.ORIGINAL=1,ee.LOOP=2,ee.CLAMP=3,ee.MIRROR=4;var te=n,ne="varying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\n\nuniform float distance;\nuniform float outerStrength;\nuniform float innerStrength;\nuniform vec4 glowColor;\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nconst float PI = 3.14159265358979323846264;\n\nvoid main(void) {\n    vec2 px = vec2(1.0 / filterArea.x, 1.0 / filterArea.y);\n    vec4 ownColor = texture2D(uSampler, vTextureCoord);\n    vec4 curColor;\n    float totalAlpha = 0.0;\n    float maxTotalAlpha = 0.0;\n    float cosAngle;\n    float sinAngle;\n    vec2 displaced;\n    for (float angle = 0.0; angle <= PI * 2.0; angle += %QUALITY_DIST%) {\n       cosAngle = cos(angle);\n       sinAngle = sin(angle);\n       for (float curDistance = 1.0; curDistance <= %DIST%; curDistance++) {\n           displaced.x = vTextureCoord.x + cosAngle * curDistance * px.x;\n           displaced.y = vTextureCoord.y + sinAngle * curDistance * px.y;\n           curColor = texture2D(uSampler, clamp(displaced, filterClamp.xy, filterClamp.zw));\n           totalAlpha += (distance - curDistance) * curColor.a;\n           maxTotalAlpha += (distance - curDistance);\n       }\n    }\n    maxTotalAlpha = max(maxTotalAlpha, 0.0001);\n\n    ownColor.a = max(ownColor.a, 0.0001);\n    ownColor.rgb = ownColor.rgb / ownColor.a;\n    float outerGlowAlpha = (totalAlpha / maxTotalAlpha)  * outerStrength * (1. - ownColor.a);\n    float innerGlowAlpha = ((maxTotalAlpha - totalAlpha) / maxTotalAlpha) * innerStrength * ownColor.a;\n    float resultAlpha = (ownColor.a + outerGlowAlpha);\n    gl_FragColor = vec4(mix(mix(ownColor.rgb, glowColor.rgb, innerGlowAlpha / ownColor.a), glowColor.rgb, outerGlowAlpha / resultAlpha) * resultAlpha, resultAlpha);\n}\n",re=function(e){function n(t,n,r,o,i){void 0===t&&(t=10),void 0===n&&(n=4),void 0===r&&(r=0),void 0===o&&(o=16777215),void 0===i&&(i=.1),e.call(this,te,ne.replace(/%QUALITY_DIST%/gi,""+(1/i/t).toFixed(7)).replace(/%DIST%/gi,""+t.toFixed(7))),this.uniforms.glowColor=new Float32Array([0,0,0,1]),this.distance=t,this.color=o,this.outerStrength=n,this.innerStrength=r}e&&(n.__proto__=e),n.prototype=Object.create(e&&e.prototype),n.prototype.constructor=n;var r={color:{configurable:!0},distance:{configurable:!0},outerStrength:{configurable:!0},innerStrength:{configurable:!0}};return r.color.get=function(){return t.utils.rgb2hex(this.uniforms.glowColor)},r.color.set=function(e){t.utils.hex2rgb(e,this.uniforms.glowColor)},r.distance.get=function(){return this.uniforms.distance},r.distance.set=function(e){this.uniforms.distance=e},r.outerStrength.get=function(){return this.uniforms.outerStrength},r.outerStrength.set=function(e){this.uniforms.outerStrength=e},r.innerStrength.get=function(){return this.uniforms.innerStrength},r.innerStrength.set=function(e){this.uniforms.innerStrength=e},Object.defineProperties(n.prototype,r),n}(t.Filter),oe=n,ie="vec3 mod289(vec3 x)\n{\n    return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec4 mod289(vec4 x)\n{\n    return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec4 permute(vec4 x)\n{\n    return mod289(((x * 34.0) + 1.0) * x);\n}\nvec4 taylorInvSqrt(vec4 r)\n{\n    return 1.79284291400159 - 0.85373472095314 * r;\n}\nvec3 fade(vec3 t)\n{\n    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);\n}\n// Classic Perlin noise, periodic variant\nfloat pnoise(vec3 P, vec3 rep)\n{\n    vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period\n    vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period\n    Pi0 = mod289(Pi0);\n    Pi1 = mod289(Pi1);\n    vec3 Pf0 = fract(P); // Fractional part for interpolation\n    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n    vec4 iy = vec4(Pi0.yy, Pi1.yy);\n    vec4 iz0 = Pi0.zzzz;\n    vec4 iz1 = Pi1.zzzz;\n    vec4 ixy = permute(permute(ix) + iy);\n    vec4 ixy0 = permute(ixy + iz0);\n    vec4 ixy1 = permute(ixy + iz1);\n    vec4 gx0 = ixy0 * (1.0 / 7.0);\n    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n    gx0 = fract(gx0);\n    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n    vec4 sz0 = step(gz0, vec4(0.0));\n    gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n    gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n    vec4 gx1 = ixy1 * (1.0 / 7.0);\n    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n    gx1 = fract(gx1);\n    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n    vec4 sz1 = step(gz1, vec4(0.0));\n    gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n    gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n    vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);\n    vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);\n    vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);\n    vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);\n    vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);\n    vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);\n    vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);\n    vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);\n    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n    g000 *= norm0.x;\n    g010 *= norm0.y;\n    g100 *= norm0.z;\n    g110 *= norm0.w;\n    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n    g001 *= norm1.x;\n    g011 *= norm1.y;\n    g101 *= norm1.z;\n    g111 *= norm1.w;\n    float n000 = dot(g000, Pf0);\n    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n    float n111 = dot(g111, Pf1);\n    vec3 fade_xyz = fade(Pf0);\n    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);\n    return 2.2 * n_xyz;\n}\nfloat turb(vec3 P, vec3 rep, float lacunarity, float gain)\n{\n    float sum = 0.0;\n    float sc = 1.0;\n    float totalgain = 1.0;\n    for (float i = 0.0; i < 6.0; i++)\n    {\n        sum += totalgain * pnoise(P * sc, rep);\n        sc *= lacunarity;\n        totalgain *= gain;\n    }\n    return abs(sum);\n}\n",le="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec2 dimensions;\n\nuniform vec2 light;\nuniform bool parallel;\nuniform float aspect;\n\nuniform float gain;\nuniform float lacunarity;\nuniform float time;\n\n${perlin}\n\nvoid main(void) {\n    vec2 coord = vTextureCoord * filterArea.xy / dimensions.xy;\n\n    float d;\n\n    if (parallel) {\n        float _cos = light.x;\n        float _sin = light.y;\n        d = (_cos * coord.x) + (_sin * coord.y * aspect);\n    } else {\n        float dx = coord.x - light.x / dimensions.x;\n        float dy = (coord.y - light.y / dimensions.y) * aspect;\n        float dis = sqrt(dx * dx + dy * dy) + 0.00001;\n        d = dy / dis;\n    }\n\n    vec3 dir = vec3(d, d, 0.0);\n\n    float noise = turb(dir + vec3(time, 0.0, 62.1 + time) * 0.05, vec3(480.0, 320.0, 480.0), lacunarity, gain);\n    noise = mix(noise, 0.0, 0.3);\n    //fade vertically.\n    vec4 mist = vec4(noise, noise, noise, 1.0) * (1.0 - coord.y);\n    mist.a = 1.0;\n\n    gl_FragColor = texture2D(uSampler, vTextureCoord) + mist;\n}\n",se=function(e){function n(n){e.call(this,oe,le.replace("${perlin}",ie)),this.uniforms.dimensions=new Float32Array(2),"number"==typeof n&&(console.warn("GodrayFilter now uses options instead of (angle, gain, lacunarity, time)"),n={angle:n},void 0!==arguments[1]&&(n.gain=arguments[1]),void 0!==arguments[2]&&(n.lacunarity=arguments[2]),void 0!==arguments[3]&&(n.time=arguments[3])),n=Object.assign({angle:30,gain:.5,lacunarity:2.5,time:0,parallel:!0,center:[0,0]},n),this._angleLight=new t.Point,this.angle=n.angle,this.gain=n.gain,this.lacunarity=n.lacunarity,this.parallel=n.parallel,this.center=n.center,this.time=n.time}e&&(n.__proto__=e),n.prototype=Object.create(e&&e.prototype),n.prototype.constructor=n;var r={angle:{configurable:!0},gain:{configurable:!0},lacunarity:{configurable:!0}};return n.prototype.apply=function(e,t,n,r){var o=t.sourceFrame,i=o.width,l=o.height;this.uniforms.light=this.parallel?this._angleLight:this.center,this.uniforms.parallel=this.parallel,this.uniforms.dimensions[0]=i,this.uniforms.dimensions[1]=l,this.uniforms.aspect=l/i,this.uniforms.time=this.time,e.applyFilter(this,t,n,r)},r.angle.get=function(){return this._angle},r.angle.set=function(e){this._angle=e;var n=e*t.DEG_TO_RAD;this._angleLight.x=Math.cos(n),this._angleLight.y=Math.sin(n)},r.gain.get=function(){return this.uniforms.gain},r.gain.set=function(e){this.uniforms.gain=e},r.lacunarity.get=function(){return this.uniforms.lacunarity},r.lacunarity.set=function(e){this.uniforms.lacunarity=e},Object.defineProperties(n.prototype,r),n}(t.Filter),ae=n,ue="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform vec2 uVelocity;\nuniform int uKernelSize;\nuniform float uOffset;\n\nconst int MAX_KERNEL_SIZE = 2048;\n\n// Notice:\n// the perfect way:\n//    int kernelSize = min(uKernelSize, MAX_KERNELSIZE);\n// BUT in real use-case , uKernelSize < MAX_KERNELSIZE almost always.\n// So use uKernelSize directly.\n\nvoid main(void)\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    if (uKernelSize == 0)\n    {\n        gl_FragColor = color;\n        return;\n    }\n\n    vec2 velocity = uVelocity / filterArea.xy;\n    float offset = -uOffset / length(uVelocity) - 0.5;\n    int k = uKernelSize - 1;\n\n    for(int i = 0; i < MAX_KERNEL_SIZE - 1; i++) {\n        if (i == k) {\n            break;\n        }\n        vec2 bias = velocity * (float(i) / float(k) + offset);\n        color += texture2D(uSampler, vTextureCoord + bias);\n    }\n    gl_FragColor = color / float(uKernelSize);\n}\n",ce=function(e){function n(n,r,o){void 0===n&&(n=[0,0]),void 0===r&&(r=5),void 0===o&&(o=0),e.call(this,ae,ue),this.uniforms.uVelocity=new Float32Array(2),this._velocity=new t.ObservablePoint(this.velocityChanged,this),this.velocity=n,this.kernelSize=r,this.offset=o}e&&(n.__proto__=e),n.prototype=Object.create(e&&e.prototype),n.prototype.constructor=n;var r={velocity:{configurable:!0},offset:{configurable:!0}};return n.prototype.apply=function(e,t,n,r){var o=this.velocity,i=o.x,l=o.y;this.uniforms.uKernelSize=0!==i||0!==l?this.kernelSize:0,e.applyFilter(this,t,n,r)},r.velocity.set=function(e){Array.isArray(e)?this._velocity.set(e[0],e[1]):(e instanceof t.Point||e instanceof t.ObservablePoint)&&this._velocity.copy(e)},r.velocity.get=function(){return this._velocity},n.prototype.velocityChanged=function(){this.uniforms.uVelocity[0]=this._velocity.x,this.uniforms.uVelocity[1]=this._velocity.y},r.offset.set=function(e){this.uniforms.uOffset=e},r.offset.get=function(){return this.uniforms.uOffset},Object.defineProperties(n.prototype,r),n}(t.Filter),fe=n,he="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform float epsilon;\n\nconst int MAX_COLORS = %maxColors%;\n\nuniform vec3 originalColors[MAX_COLORS];\nuniform vec3 targetColors[MAX_COLORS];\n\nvoid main(void)\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n\n    float alpha = gl_FragColor.a;\n    if (alpha < 0.0001)\n    {\n      return;\n    }\n\n    vec3 color = gl_FragColor.rgb / alpha;\n\n    for(int i = 0; i < MAX_COLORS; i++)\n    {\n      vec3 origColor = originalColors[i];\n      if (origColor.r < 0.0)\n      {\n        break;\n      }\n      vec3 colorDiff = origColor - color;\n      if (length(colorDiff) < epsilon)\n      {\n        vec3 targetColor = targetColors[i];\n        gl_FragColor = vec4((targetColor + colorDiff) * alpha, alpha);\n        return;\n      }\n    }\n}\n",pe=function(e){function n(t,n,r){void 0===n&&(n=.05),void 0===r&&(r=null),r=r||t.length,e.call(this,fe,he.replace(/%maxColors%/g,r)),this.epsilon=n,this._maxColors=r,this._replacements=null,this.uniforms.originalColors=new Float32Array(3*r),this.uniforms.targetColors=new Float32Array(3*r),this.replacements=t}e&&(n.__proto__=e),n.prototype=Object.create(e&&e.prototype),n.prototype.constructor=n;var r={replacements:{configurable:!0},maxColors:{configurable:!0},epsilon:{configurable:!0}};return r.replacements.set=function(e){var n=this.uniforms.originalColors,r=this.uniforms.targetColors,o=e.length;if(o>this._maxColors)throw"Length of replacements ("+o+") exceeds the maximum colors length ("+this._maxColors+")";n[3*o]=-1;for(var i=0;i<o;i++){var l=e[i],s=l[0];"number"==typeof s?s=t.utils.hex2rgb(s):l[0]=t.utils.rgb2hex(s),n[3*i]=s[0],n[3*i+1]=s[1],n[3*i+2]=s[2];var a=l[1];"number"==typeof a?a=t.utils.hex2rgb(a):l[1]=t.utils.rgb2hex(a),r[3*i]=a[0],r[3*i+1]=a[1],r[3*i+2]=a[2]}this._replacements=e},r.replacements.get=function(){return this._replacements},n.prototype.refresh=function(){this.replacements=this._replacements},r.maxColors.get=function(){return this._maxColors},r.epsilon.set=function(e){this.uniforms.epsilon=e},r.epsilon.get=function(){return this.uniforms.epsilon},Object.defineProperties(n.prototype,r),n}(t.Filter),de=n,me="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec2 dimensions;\n\nuniform float sepia;\nuniform float noise;\nuniform float noiseSize;\nuniform float scratch;\nuniform float scratchDensity;\nuniform float scratchWidth;\nuniform float vignetting;\nuniform float vignettingAlpha;\nuniform float vignettingBlur;\nuniform float seed;\n\nconst float SQRT_2 = 1.414213;\nconst vec3 SEPIA_RGB = vec3(112.0 / 255.0, 66.0 / 255.0, 20.0 / 255.0);\n\nfloat rand(vec2 co) {\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvec3 Overlay(vec3 src, vec3 dst)\n{\n    // if (dst <= 0.5) then: 2 * src * dst\n    // if (dst > 0.5) then: 1 - 2 * (1 - dst) * (1 - src)\n    return vec3((dst.x <= 0.5) ? (2.0 * src.x * dst.x) : (1.0 - 2.0 * (1.0 - dst.x) * (1.0 - src.x)),\n                (dst.y <= 0.5) ? (2.0 * src.y * dst.y) : (1.0 - 2.0 * (1.0 - dst.y) * (1.0 - src.y)),\n                (dst.z <= 0.5) ? (2.0 * src.z * dst.z) : (1.0 - 2.0 * (1.0 - dst.z) * (1.0 - src.z)));\n}\n\n\nvoid main()\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n    vec3 color = gl_FragColor.rgb;\n\n    if (sepia > 0.0)\n    {\n        float gray = (color.x + color.y + color.z) / 3.0;\n        vec3 grayscale = vec3(gray);\n\n        color = Overlay(SEPIA_RGB, grayscale);\n\n        color = grayscale + sepia * (color - grayscale);\n    }\n\n    vec2 coord = vTextureCoord * filterArea.xy / dimensions.xy;\n\n    if (vignetting > 0.0)\n    {\n        float outter = SQRT_2 - vignetting * SQRT_2;\n        vec2 dir = vec2(vec2(0.5, 0.5) - coord);\n        dir.y *= dimensions.y / dimensions.x;\n        float darker = clamp((outter - length(dir) * SQRT_2) / ( 0.00001 + vignettingBlur * SQRT_2), 0.0, 1.0);\n        color.rgb *= darker + (1.0 - darker) * (1.0 - vignettingAlpha);\n    }\n\n    if (scratchDensity > seed && scratch != 0.0)\n    {\n        float phase = seed * 256.0;\n        float s = mod(floor(phase), 2.0);\n        float dist = 1.0 / scratchDensity;\n        float d = distance(coord, vec2(seed * dist, abs(s - seed * dist)));\n        if (d < seed * 0.6 + 0.4)\n        {\n            highp float period = scratchDensity * 10.0;\n\n            float xx = coord.x * period + phase;\n            float aa = abs(mod(xx, 0.5) * 4.0);\n            float bb = mod(floor(xx / 0.5), 2.0);\n            float yy = (1.0 - bb) * aa + bb * (2.0 - aa);\n\n            float kk = 2.0 * period;\n            float dw = scratchWidth / dimensions.x * (0.75 + seed);\n            float dh = dw * kk;\n\n            float tine = (yy - (2.0 - dh));\n\n            if (tine > 0.0) {\n                float _sign = sign(scratch);\n\n                tine = s * tine / period + scratch + 0.1;\n                tine = clamp(tine + 1.0, 0.5 + _sign * 0.5, 1.5 + _sign * 0.5);\n\n                color.rgb *= tine;\n            }\n        }\n    }\n\n    if (noise > 0.0 && noiseSize > 0.0)\n    {\n        vec2 pixelCoord = vTextureCoord.xy * filterArea.xy;\n        pixelCoord.x = floor(pixelCoord.x / noiseSize);\n        pixelCoord.y = floor(pixelCoord.y / noiseSize);\n        // vec2 d = pixelCoord * noiseSize * vec2(1024.0 + seed * 512.0, 1024.0 - seed * 512.0);\n        // float _noise = snoise(d) * 0.5;\n        float _noise = rand(pixelCoord * noiseSize * seed) - 0.5;\n        color += _noise * noise;\n    }\n\n    gl_FragColor.rgb = color;\n}\n",ge=function(e){function t(t,n){void 0===n&&(n=0),e.call(this,de,me),this.uniforms.dimensions=new Float32Array(2),"number"==typeof t?(this.seed=t,t=null):this.seed=n,Object.assign(this,{sepia:.3,noise:.3,noiseSize:1,scratch:.5,scratchDensity:.3,scratchWidth:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3},t)}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={sepia:{configurable:!0},noise:{configurable:!0},noiseSize:{configurable:!0},scratch:{configurable:!0},scratchDensity:{configurable:!0},scratchWidth:{configurable:!0},vignetting:{configurable:!0},vignettingAlpha:{configurable:!0},vignettingBlur:{configurable:!0}};return t.prototype.apply=function(e,t,n,r){this.uniforms.dimensions[0]=t.sourceFrame.width,this.uniforms.dimensions[1]=t.sourceFrame.height,this.uniforms.seed=this.seed,e.applyFilter(this,t,n,r)},n.sepia.set=function(e){this.uniforms.sepia=e},n.sepia.get=function(){return this.uniforms.sepia},n.noise.set=function(e){this.uniforms.noise=e},n.noise.get=function(){return this.uniforms.noise},n.noiseSize.set=function(e){this.uniforms.noiseSize=e},n.noiseSize.get=function(){return this.uniforms.noiseSize},n.scratch.set=function(e){this.uniforms.scratch=e},n.scratch.get=function(){return this.uniforms.scratch},n.scratchDensity.set=function(e){this.uniforms.scratchDensity=e},n.scratchDensity.get=function(){return this.uniforms.scratchDensity},n.scratchWidth.set=function(e){this.uniforms.scratchWidth=e},n.scratchWidth.get=function(){return this.uniforms.scratchWidth},n.vignetting.set=function(e){this.uniforms.vignetting=e},n.vignetting.get=function(){return this.uniforms.vignetting},n.vignettingAlpha.set=function(e){this.uniforms.vignettingAlpha=e},n.vignettingAlpha.get=function(){return this.uniforms.vignettingAlpha},n.vignettingBlur.set=function(e){this.uniforms.vignettingBlur=e},n.vignettingBlur.get=function(){return this.uniforms.vignettingBlur},Object.defineProperties(t.prototype,n),t}(t.Filter),ve=n,xe="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec2 thickness;\nuniform vec4 outlineColor;\nuniform vec4 filterClamp;\n\nconst float DOUBLE_PI = 3.14159265358979323846264 * 2.;\n\nvoid main(void) {\n    vec4 ownColor = texture2D(uSampler, vTextureCoord);\n    vec4 curColor;\n    float maxAlpha = 0.;\n    vec2 displaced;\n    for (float angle = 0.; angle <= DOUBLE_PI; angle += ${angleStep}) {\n        displaced.x = vTextureCoord.x + thickness.x * cos(angle);\n        displaced.y = vTextureCoord.y + thickness.y * sin(angle);\n        curColor = texture2D(uSampler, clamp(displaced, filterClamp.xy, filterClamp.zw));\n        maxAlpha = max(maxAlpha, curColor.a);\n    }\n    float resultAlpha = max(maxAlpha, ownColor.a);\n    gl_FragColor = vec4((ownColor.rgb + outlineColor.rgb * (1. - ownColor.a)) * resultAlpha, resultAlpha);\n}\n",ye=function(e){function n(t,r,o){void 0===t&&(t=1),void 0===r&&(r=0),void 0===o&&(o=.1);var i=Math.max(o*n.MAX_SAMPLES,n.MIN_SAMPLES),l=(2*Math.PI/i).toFixed(7);e.call(this,ve,xe.replace(/\$\{angleStep\}/,l)),this.uniforms.thickness=new Float32Array([0,0]),this.thickness=t,this.uniforms.outlineColor=new Float32Array([0,0,0,1]),this.color=r,this.quality=o}e&&(n.__proto__=e),n.prototype=Object.create(e&&e.prototype),n.prototype.constructor=n;var r={color:{configurable:!0}};return n.prototype.apply=function(e,t,n,r){this.uniforms.thickness[0]=this.thickness/t.size.width,this.uniforms.thickness[1]=this.thickness/t.size.height,e.applyFilter(this,t,n,r)},r.color.get=function(){return t.utils.rgb2hex(this.uniforms.outlineColor)},r.color.set=function(e){t.utils.hex2rgb(e,this.uniforms.outlineColor)},Object.defineProperties(n.prototype,r),n}(t.Filter);ye.MIN_SAMPLES=1,ye.MAX_SAMPLES=100;var be=n,_e="precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform vec2 size;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvec2 pixelate(vec2 coord, vec2 size)\n{\n\treturn floor( coord / size ) * size;\n}\n\nvoid main(void)\n{\n    vec2 coord = mapCoord(vTextureCoord);\n\n    coord = pixelate(coord, size);\n\n    coord = unmapCoord(coord);\n\n    gl_FragColor = texture2D(uSampler, coord);\n}\n",Ce=function(e){function t(t){void 0===t&&(t=10),e.call(this,be,_e),this.size=t}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={size:{configurable:!0}};return n.size.get=function(){return this.uniforms.size},n.size.set=function(e){"number"==typeof e&&(e=[e,e]),this.uniforms.size=e},Object.defineProperties(t.prototype,n),t}(t.Filter),Se=n,Fe="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform float uRadian;\nuniform vec2 uCenter;\nuniform float uRadius;\nuniform int uKernelSize;\n\nconst int MAX_KERNEL_SIZE = 2048;\n\nvoid main(void)\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    if (uKernelSize == 0)\n    {\n        gl_FragColor = color;\n        return;\n    }\n\n    float aspect = filterArea.y / filterArea.x;\n    vec2 center = uCenter.xy / filterArea.xy;\n    float gradient = uRadius / filterArea.x * 0.3;\n    float radius = uRadius / filterArea.x - gradient * 0.5;\n    int k = uKernelSize - 1;\n\n    vec2 coord = vTextureCoord;\n    vec2 dir = vec2(center - coord);\n    float dist = length(vec2(dir.x, dir.y * aspect));\n\n    float radianStep = uRadian;\n    if (radius >= 0.0 && dist > radius) {\n        float delta = dist - radius;\n        float gap = gradient;\n        float scale = 1.0 - abs(delta / gap);\n        if (scale <= 0.0) {\n            gl_FragColor = color;\n            return;\n        }\n        radianStep *= scale;\n    }\n    radianStep /= float(k);\n\n    float s = sin(radianStep);\n    float c = cos(radianStep);\n    mat2 rotationMatrix = mat2(vec2(c, -s), vec2(s, c));\n\n    for(int i = 0; i < MAX_KERNEL_SIZE - 1; i++) {\n        if (i == k) {\n            break;\n        }\n\n        coord -= center;\n        coord.y *= aspect;\n        coord = rotationMatrix * coord;\n        coord.y /= aspect;\n        coord += center;\n\n        vec4 sample = texture2D(uSampler, coord);\n\n        // switch to pre-multiplied alpha to correctly blur transparent images\n        // sample.rgb *= sample.a;\n\n        color += sample;\n    }\n\n    gl_FragColor = color / float(uKernelSize);\n}\n",ze=function(e){function t(t,n,r,o){void 0===t&&(t=0),void 0===n&&(n=[0,0]),void 0===r&&(r=5),void 0===o&&(o=-1),e.call(this,Se,Fe),this._angle=0,this.angle=t,this.center=n,this.kernelSize=r,this.radius=o}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={angle:{configurable:!0},center:{configurable:!0},radius:{configurable:!0}};return t.prototype.apply=function(e,t,n,r){this.uniforms.uKernelSize=0!==this._angle?this.kernelSize:0,e.applyFilter(this,t,n,r)},n.angle.set=function(e){this._angle=e,this.uniforms.uRadian=e*Math.PI/180},n.angle.get=function(){return this._angle},n.center.get=function(){return this.uniforms.uCenter},n.center.set=function(e){this.uniforms.uCenter=e},n.radius.get=function(){return this.uniforms.uRadius},n.radius.set=function(e){(e<0||e===1/0)&&(e=-1),this.uniforms.uRadius=e},Object.defineProperties(t.prototype,n),t}(t.Filter),Ae=n,we="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform vec2 dimensions;\n\nuniform bool mirror;\nuniform float boundary;\nuniform vec2 amplitude;\nuniform vec2 waveLength;\nuniform vec2 alpha;\nuniform float time;\n\nfloat rand(vec2 co) {\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main(void)\n{\n    vec2 pixelCoord = vTextureCoord.xy * filterArea.xy;\n    vec2 coord = pixelCoord / dimensions;\n\n    if (coord.y < boundary) {\n        gl_FragColor = texture2D(uSampler, vTextureCoord);\n        return;\n    }\n\n    float k = (coord.y - boundary) / (1. - boundary + 0.0001);\n    float areaY = boundary * dimensions.y / filterArea.y;\n    float v = areaY + areaY - vTextureCoord.y;\n    float y = mirror ? v : vTextureCoord.y;\n\n    float _amplitude = ((amplitude.y - amplitude.x) * k + amplitude.x ) / filterArea.x;\n    float _waveLength = ((waveLength.y - waveLength.x) * k + waveLength.x) / filterArea.y;\n    float _alpha = (alpha.y - alpha.x) * k + alpha.x;\n\n    float x = vTextureCoord.x + cos(v * 6.28 / _waveLength - time) * _amplitude;\n    x = clamp(x, filterClamp.x, filterClamp.z);\n\n    vec4 color = texture2D(uSampler, vec2(x, y));\n\n    gl_FragColor = color * _alpha;\n}\n",Te=function(e){function t(t){e.call(this,Ae,we),this.uniforms.amplitude=new Float32Array(2),this.uniforms.waveLength=new Float32Array(2),this.uniforms.alpha=new Float32Array(2),this.uniforms.dimensions=new Float32Array(2),Object.assign(this,{mirror:!0,boundary:.5,amplitude:[0,20],waveLength:[30,100],alpha:[1,1],time:0},t)}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={mirror:{configurable:!0},boundary:{configurable:!0},amplitude:{configurable:!0},waveLength:{configurable:!0},alpha:{configurable:!0}};return t.prototype.apply=function(e,t,n,r){this.uniforms.dimensions[0]=t.sourceFrame.width,this.uniforms.dimensions[1]=t.sourceFrame.height,this.uniforms.time=this.time,e.applyFilter(this,t,n,r)},n.mirror.set=function(e){this.uniforms.mirror=e},n.mirror.get=function(){return this.uniforms.mirror},n.boundary.set=function(e){this.uniforms.boundary=e},n.boundary.get=function(){return this.uniforms.boundary},n.amplitude.set=function(e){this.uniforms.amplitude[0]=e[0],this.uniforms.amplitude[1]=e[1]},n.amplitude.get=function(){return this.uniforms.amplitude},n.waveLength.set=function(e){this.uniforms.waveLength[0]=e[0],this.uniforms.waveLength[1]=e[1]},n.waveLength.get=function(){return this.uniforms.waveLength},n.alpha.set=function(e){this.uniforms.alpha[0]=e[0],this.uniforms.alpha[1]=e[1]},n.alpha.get=function(){return this.uniforms.alpha},Object.defineProperties(t.prototype,n),t}(t.Filter),De=n,Oe="precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec2 red;\nuniform vec2 green;\nuniform vec2 blue;\n\nvoid main(void)\n{\n   gl_FragColor.r = texture2D(uSampler, vTextureCoord + red/filterArea.xy).r;\n   gl_FragColor.g = texture2D(uSampler, vTextureCoord + green/filterArea.xy).g;\n   gl_FragColor.b = texture2D(uSampler, vTextureCoord + blue/filterArea.xy).b;\n   gl_FragColor.a = texture2D(uSampler, vTextureCoord).a;\n}\n",Pe=function(e){function t(t,n,r){void 0===t&&(t=[-10,0]),void 0===n&&(n=[0,10]),void 0===r&&(r=[0,0]),e.call(this,De,Oe),this.red=t,this.green=n,this.blue=r}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={red:{configurable:!0},green:{configurable:!0},blue:{configurable:!0}};return n.red.get=function(){return this.uniforms.red},n.red.set=function(e){this.uniforms.red=e},n.green.get=function(){return this.uniforms.green},n.green.set=function(e){this.uniforms.green=e},n.blue.get=function(){return this.uniforms.blue},n.blue.set=function(e){this.uniforms.blue=e},Object.defineProperties(t.prototype,n),t}(t.Filter),Me=n,Re="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\n\nuniform vec2 center;\n\nuniform float amplitude;\nuniform float wavelength;\n// uniform float power;\nuniform float brightness;\nuniform float speed;\nuniform float radius;\n\nuniform float time;\n\nconst float PI = 3.14159;\n\nvoid main()\n{\n    float halfWavelength = wavelength * 0.5 / filterArea.x;\n    float maxRadius = radius / filterArea.x;\n    float currentRadius = time * speed / filterArea.x;\n\n    float fade = 1.0;\n\n    if (maxRadius > 0.0) {\n        if (currentRadius > maxRadius) {\n            gl_FragColor = texture2D(uSampler, vTextureCoord);\n            return;\n        }\n        fade = 1.0 - pow(currentRadius / maxRadius, 2.0);\n    }\n\n    vec2 dir = vec2(vTextureCoord - center / filterArea.xy);\n    dir.y *= filterArea.y / filterArea.x;\n    float dist = length(dir);\n\n    if (dist <= 0.0 || dist < currentRadius - halfWavelength || dist > currentRadius + halfWavelength) {\n        gl_FragColor = texture2D(uSampler, vTextureCoord);\n        return;\n    }\n\n    vec2 diffUV = normalize(dir);\n\n    float diff = (dist - currentRadius) / halfWavelength;\n\n    float p = 1.0 - pow(abs(diff), 2.0);\n\n    // float powDiff = diff * pow(p, 2.0) * ( amplitude * fade );\n    float powDiff = 1.25 * sin(diff * PI) * p * ( amplitude * fade );\n\n    vec2 offset = diffUV * powDiff / filterArea.xy;\n\n    // Do clamp :\n    vec2 coord = vTextureCoord + offset;\n    vec2 clampedCoord = clamp(coord, filterClamp.xy, filterClamp.zw);\n    vec4 color = texture2D(uSampler, clampedCoord);\n    if (coord != clampedCoord) {\n        color *= max(0.0, 1.0 - length(coord - clampedCoord));\n    }\n\n    // No clamp :\n    // gl_FragColor = texture2D(uSampler, vTextureCoord + offset);\n\n    color.rgb *= 1.0 + (brightness - 1.0) * p * fade;\n\n    gl_FragColor = color;\n}\n",je=function(e){function t(t,n,r){void 0===t&&(t=[0,0]),void 0===n&&(n={}),void 0===r&&(r=0),e.call(this,Me,Re),this.center=t,Array.isArray(n)&&(console.warn("Deprecated Warning: ShockwaveFilter params Array has been changed to options Object."),n={}),n=Object.assign({amplitude:30,wavelength:160,brightness:1,speed:500,radius:-1},n),this.amplitude=n.amplitude,this.wavelength=n.wavelength,this.brightness=n.brightness,this.speed=n.speed,this.radius=n.radius,this.time=r}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={center:{configurable:!0},amplitude:{configurable:!0},wavelength:{configurable:!0},brightness:{configurable:!0},speed:{configurable:!0},radius:{configurable:!0}};return t.prototype.apply=function(e,t,n,r){this.uniforms.time=this.time,e.applyFilter(this,t,n,r)},n.center.get=function(){return this.uniforms.center},n.center.set=function(e){this.uniforms.center=e},n.amplitude.get=function(){return this.uniforms.amplitude},n.amplitude.set=function(e){this.uniforms.amplitude=e},n.wavelength.get=function(){return this.uniforms.wavelength},n.wavelength.set=function(e){this.uniforms.wavelength=e},n.brightness.get=function(){return this.uniforms.brightness},n.brightness.set=function(e){this.uniforms.brightness=e},n.speed.get=function(){return this.uniforms.speed},n.speed.set=function(e){this.uniforms.speed=e},n.radius.get=function(){return this.uniforms.radius},n.radius.set=function(e){this.uniforms.radius=e},Object.defineProperties(t.prototype,n),t}(t.Filter),Le=n,ke="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform sampler2D uLightmap;\nuniform vec4 filterArea;\nuniform vec2 dimensions;\nuniform vec4 ambientColor;\nvoid main() {\n    vec4 diffuseColor = texture2D(uSampler, vTextureCoord);\n    vec2 lightCoord = (vTextureCoord * filterArea.xy) / dimensions;\n    vec4 light = texture2D(uLightmap, lightCoord);\n    vec3 ambient = ambientColor.rgb * ambientColor.a;\n    vec3 intensity = ambient + light.rgb;\n    vec3 finalColor = diffuseColor.rgb * intensity;\n    gl_FragColor = vec4(finalColor, diffuseColor.a);\n}\n",Ie=function(e){function n(t,n,r){void 0===n&&(n=0),void 0===r&&(r=1),e.call(this,Le,ke),this.uniforms.dimensions=new Float32Array(2),this.uniforms.ambientColor=new Float32Array([0,0,0,r]),this.texture=t,this.color=n}e&&(n.__proto__=e),n.prototype=Object.create(e&&e.prototype),n.prototype.constructor=n;var r={texture:{configurable:!0},color:{configurable:!0},alpha:{configurable:!0}};return n.prototype.apply=function(e,t,n,r){this.uniforms.dimensions[0]=t.sourceFrame.width,this.uniforms.dimensions[1]=t.sourceFrame.height,e.applyFilter(this,t,n,r)},r.texture.get=function(){return this.uniforms.uLightmap},r.texture.set=function(e){this.uniforms.uLightmap=e},r.color.set=function(e){var n=this.uniforms.ambientColor;"number"==typeof e?(t.utils.hex2rgb(e,n),this._color=e):(n[0]=e[0],n[1]=e[1],n[2]=e[2],n[3]=e[3],this._color=t.utils.rgb2hex(n))},r.color.get=function(){return this._color},r.alpha.get=function(){return this.uniforms.ambientColor[3]},r.alpha.set=function(e){this.uniforms.ambientColor[3]=e},Object.defineProperties(n.prototype,r),n}(t.Filter),Ee=n,Be="varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float blur;\nuniform float gradientBlur;\nuniform vec2 start;\nuniform vec2 end;\nuniform vec2 delta;\nuniform vec2 texSize;\n\nfloat random(vec3 scale, float seed)\n{\n    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);\n}\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n    float total = 0.0;\n\n    float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);\n    vec2 normal = normalize(vec2(start.y - end.y, end.x - start.x));\n    float radius = smoothstep(0.0, 1.0, abs(dot(vTextureCoord * texSize - start, normal)) / gradientBlur) * blur;\n\n    for (float t = -30.0; t <= 30.0; t++)\n    {\n        float percent = (t + offset - 0.5) / 30.0;\n        float weight = 1.0 - abs(percent);\n        vec4 sample = texture2D(uSampler, vTextureCoord + delta / texSize * percent * radius);\n        sample.rgb *= sample.a;\n        color += sample * weight;\n        total += weight;\n    }\n\n    color /= total;\n    color.rgb /= color.a + 0.00001;\n\n    gl_FragColor = color;\n}\n",Xe=function(e){function n(n,r,o,i){void 0===n&&(n=100),void 0===r&&(r=600),void 0===o&&(o=null),void 0===i&&(i=null),e.call(this,Ee,Be),this.uniforms.blur=n,this.uniforms.gradientBlur=r,this.uniforms.start=o||new t.Point(0,window.innerHeight/2),this.uniforms.end=i||new t.Point(600,window.innerHeight/2),this.uniforms.delta=new t.Point(30,30),this.uniforms.texSize=new t.Point(window.innerWidth,window.innerHeight),this.updateDelta()}e&&(n.__proto__=e),n.prototype=Object.create(e&&e.prototype),n.prototype.constructor=n;var r={blur:{configurable:!0},gradientBlur:{configurable:!0},start:{configurable:!0},end:{configurable:!0}};return n.prototype.updateDelta=function(){this.uniforms.delta.x=0,this.uniforms.delta.y=0},r.blur.get=function(){return this.uniforms.blur},r.blur.set=function(e){this.uniforms.blur=e},r.gradientBlur.get=function(){return this.uniforms.gradientBlur},r.gradientBlur.set=function(e){this.uniforms.gradientBlur=e},r.start.get=function(){return this.uniforms.start},r.start.set=function(e){this.uniforms.start=e,this.updateDelta()},r.end.get=function(){return this.uniforms.end},r.end.set=function(e){this.uniforms.end=e,this.updateDelta()},Object.defineProperties(n.prototype,r),n}(t.Filter),qe=function(e){function t(){e.apply(this,arguments)}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.updateDelta=function(){var e=this.uniforms.end.x-this.uniforms.start.x,t=this.uniforms.end.y-this.uniforms.start.y,n=Math.sqrt(e*e+t*t);this.uniforms.delta.x=e/n,this.uniforms.delta.y=t/n},t}(Xe),Ne=function(e){function t(){e.apply(this,arguments)}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.updateDelta=function(){var e=this.uniforms.end.x-this.uniforms.start.x,t=this.uniforms.end.y-this.uniforms.start.y,n=Math.sqrt(e*e+t*t);this.uniforms.delta.x=-t/n,this.uniforms.delta.y=e/n},t}(Xe),We=function(e){function t(t,n,r,o){void 0===t&&(t=100),void 0===n&&(n=600),void 0===r&&(r=null),void 0===o&&(o=null),e.call(this),this.tiltShiftXFilter=new qe(t,n,r,o),this.tiltShiftYFilter=new Ne(t,n,r,o)}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={blur:{configurable:!0},gradientBlur:{configurable:!0},start:{configurable:!0},end:{configurable:!0}};return t.prototype.apply=function(e,t,n){var r=e.getRenderTarget(!0);this.tiltShiftXFilter.apply(e,t,r),this.tiltShiftYFilter.apply(e,r,n),e.returnRenderTarget(r)},n.blur.get=function(){return this.tiltShiftXFilter.blur},n.blur.set=function(e){this.tiltShiftXFilter.blur=this.tiltShiftYFilter.blur=e},n.gradientBlur.get=function(){return this.tiltShiftXFilter.gradientBlur},n.gradientBlur.set=function(e){this.tiltShiftXFilter.gradientBlur=this.tiltShiftYFilter.gradientBlur=e},n.start.get=function(){return this.tiltShiftXFilter.start},n.start.set=function(e){this.tiltShiftXFilter.start=this.tiltShiftYFilter.start=e},n.end.get=function(){return this.tiltShiftXFilter.end},n.end.set=function(e){this.tiltShiftXFilter.end=this.tiltShiftYFilter.end=e},Object.defineProperties(t.prototype,n),t}(t.Filter),Ge=n,Ke="varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float radius;\nuniform float angle;\nuniform vec2 offset;\nuniform vec4 filterArea;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvec2 twist(vec2 coord)\n{\n    coord -= offset;\n\n    float dist = length(coord);\n\n    if (dist < radius)\n    {\n        float ratioDist = (radius - dist) / radius;\n        float angleMod = ratioDist * ratioDist * angle;\n        float s = sin(angleMod);\n        float c = cos(angleMod);\n        coord = vec2(coord.x * c - coord.y * s, coord.x * s + coord.y * c);\n    }\n\n    coord += offset;\n\n    return coord;\n}\n\nvoid main(void)\n{\n\n    vec2 coord = mapCoord(vTextureCoord);\n\n    coord = twist(coord);\n\n    coord = unmapCoord(coord);\n\n    gl_FragColor = texture2D(uSampler, coord );\n\n}\n",Ye=function(e){function t(t,n,r){void 0===t&&(t=200),void 0===n&&(n=4),void 0===r&&(r=20),e.call(this,Ge,Ke),this.radius=t,this.angle=n,this.padding=r}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={offset:{configurable:!0},radius:{configurable:!0},angle:{configurable:!0}};return n.offset.get=function(){return this.uniforms.offset},n.offset.set=function(e){this.uniforms.offset=e},n.radius.get=function(){return this.uniforms.radius},n.radius.set=function(e){this.uniforms.radius=e},n.angle.get=function(){return this.uniforms.angle},n.angle.set=function(e){this.uniforms.angle=e},Object.defineProperties(t.prototype,n),t}(t.Filter),Qe=n,Ue="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform vec2 uCenter;\nuniform float uStrength;\nuniform float uInnerRadius;\nuniform float uRadius;\n\nconst float MAX_KERNEL_SIZE = 32.0;\n\n// author: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/\nhighp float rand(vec2 co, float seed) {\n    const highp float a = 12.9898, b = 78.233, c = 43758.5453;\n    highp float dt = dot(co + seed, vec2(a, b)), sn = mod(dt, 3.14159);\n    return fract(sin(sn) * c + seed);\n}\n\nvoid main() {\n\n    float minGradient = uInnerRadius * 0.3;\n    float innerRadius = (uInnerRadius + minGradient * 0.5) / filterArea.x;\n\n    float gradient = uRadius * 0.3;\n    float radius = (uRadius - gradient * 0.5) / filterArea.x;\n\n    float countLimit = MAX_KERNEL_SIZE;\n\n    vec2 dir = vec2(uCenter.xy / filterArea.xy - vTextureCoord);\n    float dist = length(vec2(dir.x, dir.y * filterArea.y / filterArea.x));\n\n    float strength = uStrength;\n\n    float delta = 0.0;\n    float gap;\n    if (dist < innerRadius) {\n        delta = innerRadius - dist;\n        gap = minGradient;\n    } else if (radius >= 0.0 && dist > radius) { // radius < 0 means it's infinity\n        delta = dist - radius;\n        gap = gradient;\n    }\n\n    if (delta > 0.0) {\n        float normalCount = gap / filterArea.x;\n        delta = (normalCount - delta) / normalCount;\n        countLimit *= delta;\n        strength *= delta;\n        if (countLimit < 1.0)\n        {\n            gl_FragColor = texture2D(uSampler, vTextureCoord);\n            return;\n        }\n    }\n\n    // randomize the lookup values to hide the fixed number of samples\n    float offset = rand(vTextureCoord, 0.0);\n\n    float total = 0.0;\n    vec4 color = vec4(0.0);\n\n    dir *= strength;\n\n    for (float t = 0.0; t < MAX_KERNEL_SIZE; t++) {\n        float percent = (t + offset) / MAX_KERNEL_SIZE;\n        float weight = 4.0 * (percent - percent * percent);\n        vec2 p = vTextureCoord + dir * percent;\n        vec4 sample = texture2D(uSampler, p);\n\n        // switch to pre-multiplied alpha to correctly blur transparent images\n        // sample.rgb *= sample.a;\n\n        color += sample * weight;\n        total += weight;\n\n        if (t > countLimit){\n            break;\n        }\n    }\n\n    color /= total;\n    // switch back from pre-multiplied alpha\n    // color.rgb /= color.a + 0.00001;\n\n    gl_FragColor = color;\n}\n",Ze=function(e){function t(t,n,r,o){void 0===t&&(t=.1),void 0===n&&(n=[0,0]),void 0===r&&(r=0),void 0===o&&(o=-1),e.call(this,Qe,Ue),this.center=n,this.strength=t,this.innerRadius=r,this.radius=o}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={center:{configurable:!0},strength:{configurable:!0},innerRadius:{configurable:!0},radius:{configurable:!0}};return n.center.get=function(){return this.uniforms.uCenter},n.center.set=function(e){this.uniforms.uCenter=e},n.strength.get=function(){return this.uniforms.uStrength},n.strength.set=function(e){this.uniforms.uStrength=e},n.innerRadius.get=function(){return this.uniforms.uInnerRadius},n.innerRadius.set=function(e){this.uniforms.uInnerRadius=e},n.radius.get=function(){return this.uniforms.uRadius},n.radius.set=function(e){(e<0||e===1/0)&&(e=-1),this.uniforms.uRadius=e},Object.defineProperties(t.prototype,n),t}(t.Filter);return e.AdjustmentFilter=o,e.AdvancedBloomFilter=p,e.AsciiFilter=g,e.BevelFilter=y,e.BloomFilter=F,e.BulgePinchFilter=w,e.ColorMapFilter=O,e.ColorReplaceFilter=R,e.ConvolutionFilter=k,e.CrossHatchFilter=B,e.CRTFilter=N,e.DotFilter=K,e.DropShadowFilter=U,e.EmbossFilter=H,e.GlitchFilter=ee,e.GlowFilter=re,e.GodrayFilter=se,e.KawaseBlurFilter=a,e.MotionBlurFilter=ce,e.MultiColorReplaceFilter=pe,e.OldFilmFilter=ge,e.OutlineFilter=ye,e.PixelateFilter=Ce,e.RadialBlurFilter=ze,e.ReflectionFilter=Te,e.RGBSplitFilter=Pe,e.ShockwaveFilter=je,e.SimpleLightmapFilter=Ie,e.TiltShiftFilter=We,e.TiltShiftAxisFilter=Xe,e.TiltShiftXFilter=qe,e.TiltShiftYFilter=Ne,e.TwistFilter=Ye,e.ZoomBlurFilter=Ze,e}({},PIXI);Object.assign(PIXI.filters,this?this.__filters:__filters);
//# sourceMappingURL=pixi-filters.js.map



// Tsukimi-customized pixi-Godray Filter
/*!
 * @pixi/filter-godray - v2.6.0
 * Compiled Wed, 28 Feb 2018 22:04:57 UTC
 *
 * @pixi/filter-godray is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
!function(n,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("pixi.js")):"function"==typeof define&&define.amd?define(["exports","pixi.js"],e):e(n.__filters={},n.PIXI)}(this,function(n,e){"use strict";var t="attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}",i="vec3 mod289(vec3 x)\n{\n    return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec4 mod289(vec4 x)\n{\n    return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec4 permute(vec4 x)\n{\n    return mod289(((x * 34.0) + 1.0) * x);\n}\nvec4 taylorInvSqrt(vec4 r)\n{\n    return 1.79284291400159 - 0.85373472095314 * r;\n}\nvec3 fade(vec3 t)\n{\n    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);\n}\n// Classic Perlin noise, periodic variant\nfloat pnoise(vec3 P, vec3 rep)\n{\n    vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period\n    vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period\n    Pi0 = mod289(Pi0);\n    Pi1 = mod289(Pi1);\n    vec3 Pf0 = fract(P); // Fractional part for interpolation\n    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n    vec4 iy = vec4(Pi0.yy, Pi1.yy);\n    vec4 iz0 = Pi0.zzzz;\n    vec4 iz1 = Pi1.zzzz;\n    vec4 ixy = permute(permute(ix) + iy);\n    vec4 ixy0 = permute(ixy + iz0);\n    vec4 ixy1 = permute(ixy + iz1);\n    vec4 gx0 = ixy0 * (1.0 / 7.0);\n    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n    gx0 = fract(gx0);\n    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n    vec4 sz0 = step(gz0, vec4(0.0));\n    gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n    gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n    vec4 gx1 = ixy1 * (1.0 / 7.0);\n    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n    gx1 = fract(gx1);\n    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n    vec4 sz1 = step(gz1, vec4(0.0));\n    gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n    gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n    vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);\n    vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);\n    vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);\n    vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);\n    vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);\n    vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);\n    vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);\n    vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);\n    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n    g000 *= norm0.x;\n    g010 *= norm0.y;\n    g100 *= norm0.z;\n    g110 *= norm0.w;\n    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n    g001 *= norm1.x;\n    g011 *= norm1.y;\n    g101 *= norm1.z;\n    g111 *= norm1.w;\n    float n000 = dot(g000, Pf0);\n    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n    float n111 = dot(g111, Pf1);\n    vec3 fade_xyz = fade(Pf0);\n    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);\n    return 2.2 * n_xyz;\n}\nfloat turb(vec3 P, vec3 rep, float lacunarity, float gain)\n{\n    float sum = 0.0;\n    float sc = 1.0;\n    float totalgain = 1.0;\n    for (float i = 0.0; i < 6.0; i++)\n    {\n        sum += totalgain * pnoise(P * sc, rep);\n        sc *= lacunarity;\n        totalgain *= gain;\n    }\n    return abs(sum);\n}\n",o="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec2 dimensions;\n\nuniform vec2 light;\nuniform bool parallel;\nuniform float aspect;\n\nuniform float gain;\nuniform float lacunarity;\nuniform float time;\nuniform float strength;\n\n${perlin}\n\nvoid main(void) {\n    vec2 coord = vTextureCoord * filterArea.xy / dimensions.xy;\n\n    float d;\n\n    if (parallel) {\n        float _cos = light.x;\n        float _sin = light.y;\n        d = (_cos * coord.x) + (_sin * coord.y * aspect);\n    } else {\n        float dx = coord.x - light.x / dimensions.x;\n        float dy = (coord.y - light.y / dimensions.y) * aspect;\n        float dis = sqrt(dx * dx + dy * dy) + 0.00001;\n        d = dy / dis;\n    }\n\n    vec3 dir = vec3(d, d, 0.0);\n\n    float noise = turb(dir + vec3(time, 0.0, 62.1 + time) * 0.05, vec3(480.0, 320.0, 480.0), lacunarity, gain);\n    noise = mix(noise, 0.0, 0.3);\n    //fade vertically.\n    vec4 mist = vec4(noise, noise, noise, 1.0) * (1.0 - coord.y);\n    mist.a = 1.0;\n    \n    gl_FragColor = texture2D(uSampler, vTextureCoord) + mist * strength;\n}\n",r=function(n){function r(r){n.call(this,t,o.replace("${perlin}",i)),this.uniforms.dimensions=new Float32Array(2),"number"==typeof r&&(console.warn("GodrayFilter now uses options instead of (angle, gain, lacunarity, time, strength)"),r={angle:r},void 0!==arguments[1]&&(r.gain=arguments[1]),void 0!==arguments[2]&&(r.lacunarity=arguments[2]),void 0!==arguments[3]&&(r.time=arguments[3]),void 0!==arguments[4]&&(r.strength=arguments[4])),r=Object.assign({angle:30,gain:.5,lacunarity:2.5,time:0,parallel:!0,center:[0,0],strength:1},r),this._angleLight=new e.Point,this.angle=r.angle,this.gain=r.gain,this.lacunarity=r.lacunarity,this.parallel=r.parallel,this.center=r.center,this.time=r.time,this.strength=r.strength}n&&(r.__proto__=n),r.prototype=Object.create(n&&n.prototype),r.prototype.constructor=r;var a={angle:{configurable:!0},gain:{configurable:!0},lacunarity:{configurable:!0},strength:{configurable:!0}};return r.prototype.apply=function(n,e,t,i){var o=e.sourceFrame,r=o.width,a=o.height;this.uniforms.light=this.parallel?this._angleLight:this.center,this.uniforms.parallel=this.parallel,this.uniforms.dimensions[0]=r,this.uniforms.dimensions[1]=a,this.uniforms.aspect=a/r,this.uniforms.time=this.time,n.applyFilter(this,e,t,i)},a.angle.get=function(){return this._angle},a.angle.set=function(n){this._angle=n;var t=n*e.DEG_TO_RAD;this._angleLight.x=Math.cos(t),this._angleLight.y=Math.sin(t)},a.gain.get=function(){return this.uniforms.gain},a.gain.set=function(n){this.uniforms.gain=n},a.lacunarity.get=function(){return this.uniforms.lacunarity},a.lacunarity.set=function(n){this.uniforms.lacunarity=n},a.strength.get=function(){return this.uniforms.strength},a.strength.set=function(n){this.uniforms.strength=n},Object.defineProperties(r.prototype,a),r}(e.Filter);n.GodrayFilter=r,Object.defineProperty(n,"__esModule",{value:!0})}),Object.assign(PIXI.filters,this.__filters);
//# sourceMappingURL=filter-godray.js.map


var _FNMap = {};
_FNMap["bulgepinch"]     = PIXI.filters.BulgePinchFilter;
_FNMap["radialblur"]     = PIXI.filters.RadialBlurFilter;
_FNMap["godray"]         = PIXI.filters.GodrayFilter;
_FNMap["ascii"]          = PIXI.filters.AsciiFilter;
_FNMap["crosshatch"]     = PIXI.filters.CrossHatchFilter;
_FNMap["dot"]            = PIXI.filters.DotFilter;
_FNMap["emboss"]         = PIXI.filters.EmbossFilter;
_FNMap["shockwave"]      = PIXI.filters.ShockwaveFilter;
_FNMap["twist"]          = PIXI.filters.TwistFilter;
_FNMap["zoomblur"]       = PIXI.filters.ZoomBlurFilter;
_FNMap["noise"]          = PIXI.filters.NoiseFilter;
_FNMap["blur"]           = PIXI.filters.KawaseBlurFilter; // -> KawaseBlur: fast!
_FNMap["oldfilm"]        = PIXI.filters.OldFilmFilter;
_FNMap["rgbsplit"]       = PIXI.filters.RGBSplitFilter;
_FNMap["bloom"]          = PIXI.filters.AdvancedBloomFilter;
_FNMap["godray-np"]      = PIXI.filters.GodrayFilter;
_FNMap["adjustment"]     = PIXI.filters.AdjustmentFilter;
_FNMap["pixelate"]       = PIXI.filters.PixelateFilter;
_FNMap["crt"]            = PIXI.filters.CRTFilter;
_FNMap["reflection-m"]   = PIXI.filters.ReflectionFilter;
_FNMap["reflection-w"]   = PIXI.filters.ReflectionFilter;
_FNMap["motionblur"]     = PIXI.filters.MotionBlurFilter;
_FNMap["glow"]           = PIXI.filters.GlowFilter;
_FNMap["displacement"]   = PIXI.filters.DisplacementFilter;
    
Filter_Controller.filterNameMap = _FNMap;