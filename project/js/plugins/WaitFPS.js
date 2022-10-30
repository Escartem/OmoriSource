//========================================
// WaitFPS.js
// by Tsukimi
// Last Updated: 2018.10.22
// update history:
// 2018.11.09 v0.2 add max Wait Time
// 2018.10.22 v0.1 finished
//========================================

/*:en
 * @plugindesc WaitFPS
 * @author Tsukimi
 * 
 * @param momentFPSThreshold
 * @text 瞬間FPS閾値
 * @type Number
 * @default 57
 * 
 * @param meanFPSFrames
 * @text 平均FPS計測フレーム数
 * @type Number
 * @default 3
 * 
 * @param meanFPSThreshold
 * @text 平均FPS閾値
 * @type Number
 * @default 50
 * 
 * @param maxWaitTime
 * @text 最大待ち時間
 * @type Number
 * @default 60
 * 
 * @help
 * 
 * WaitFPS
 * 作者：ツキミ
 * 
 * FPSが安定するまで待つプラグインです。
 * 主に「場所移動」後と重い処理後に使用されるかと思います。
 * 
 * ***************************************************
 * プラグインコマンド：
 *  イベントコマンド「プラグインコマンド」から実行。
 *  （パラメータの間は半角スペースで区切る）
 * 
 * 　WaitFPS
 * 　　FPSが閾値を超えない限り、次のコマンドを実行しません。
 * 
 */

(function() {
    'use strict';
    
    //===========================
    // plugin parameter
    //===========================
    var pluginName = 'WaitFPS';
    var getParamString = function(paramNames) {
        if (!Array.isArray(paramNames)) paramNames = [paramNames];
        for (var i = 0; i < paramNames.length; i++) {
            var name = PluginManager.parameters(pluginName)[paramNames[i]];
            if (name) return name;
        }
        return null;
    };
    
    var getParamNumber = function(paramNames) {
        return Number(getParamString(paramNames)) || 0;
    };
    
    var momentFPSThreshold = getParamNumber("momentFPSThreshold");
    var meanFPSThreshold = getParamNumber("meanFPSThreshold");
    var meanFPSFrames = getParamNumber("meanFPSFrames");
    var maxWaitTime = getParamNumber("maxWaitTime");
    
    //===========================
    // Game_Interpreter
    //  Plugin Command setting.
    //===========================
    
    var _Game_Interpreter_clear = Game_Interpreter.prototype.clear;
    Game_Interpreter.prototype.clear = function() {
        _Game_Interpreter_clear.apply(this, arguments);
        this._MFPSwait = maxWaitTime;
    };
    
    var _Game_Interpreter_pluginCommand      = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.apply(this, arguments);
        if((command || '').toUpperCase() !== "WAITFPS") return;
        
        this._waitCount = 1;
        this.setWaitMode("fps");
    };
    
    var _Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
    Game_Interpreter.prototype.updateWaitMode = function() {
        var waiting = false;
        if(this._waitMode == "fps") {
            this._MFPSwait--;
            waiting = !SceneManager.meetFPSCondition();
            if (!waiting || this._MFPSwait <= 0) {
                this._waitMode = '';
                this._MFPSwait = maxWaitTime;
            }
        }
        else waiting = _Game_Interpreter_updateWaitMode.apply(this, arguments);
        return waiting;
    };
    
    //===========================
    // SceneManager
    //===========================
    
    SceneManager._momentFPS = 0;
    SceneManager._meanFPSArr = [];
    
    SceneManager.meetFPSCondition = function() {
        var meanFPS = 0;
        for(var i = 0; i < this._meanFPSArr.length; i++) {
            meanFPS += this._meanFPSArr[i];
        }
        meanFPS /= this._meanFPSArr.length;
        return (this._momentFPS > momentFPSThreshold && meanFPS > meanFPSThreshold);
    };
    
    var _SceneManager_updateMain = SceneManager.updateMain;
    SceneManager.updateMain = function() {
        var newTime = this._getTimeInMsWithoutMobileSafari();
        var fTime = (newTime - this._currentTime) / 1000;
        this._momentFPS = 1/fTime;
        this._meanFPSArr.push(this._momentFPS);
        if(this._meanFPSArr.length > meanFPSFrames) this._meanFPSArr.shift();
        _SceneManager_updateMain.apply(this, arguments);
    };
    
})();
