// Copyright (c) 2017 fuku
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//

// 最新版は↓から
// http://www5f.biglobe.ne.jp/~fuku-labo/library/etc/

/*:
 * @plugindesc イベントを震えさせる v1.00
 * @author fuku
 *
 * @help プレイヤーキャラクターやイベントを震えさせます。
 * イベントを震えさせた場合、マップを切り替えると効果が切れます。
 *
 * 使い方：全てスクリプトベースで操作します。
 * 
 * 震え開始(イベントID指定)：
 * Fuku_Plugins.EventTremble.start(number イベントID,number 震え強度,number 震え速度 [,number 実行周期])
 * 
 * 「イベントID」のイベント(-1でプレイヤー)を震えさせます。
 * 強度は震える幅で、速度は小数を使えます。
 * 実行周期は左右に一回震えて戻るまでを1として、指定した周期分震えたら停止します。
 * 実行周期を省略した場合、停止させるまで永続して震えます。
 * 例：Fuku_Plugins.EventTremble.start(-1,8,0.8);
 * 
 * 
 * 震え停止(イベントID指定)：
 * Fuku_Plugins.EventTremble.stop(number イベントID)
 * 
 * このプラグインで震えさせている「イベントID」のイベント(-1でプレイヤー)の震えを止めます。
 * 例：Fuku_Plugins.EventTremble.stop(-1);
 * 
 * 
 * 震え開始(イベントオブジェクト指定)：
 * Fuku_Plugins.EventTremble.startObject(Game_CharacterBase イベント,number 震え強度,number 震え速度 [,number 実行周期])
 * 
 * 指定したイベントを震えさせます。強度は震える幅で、速度は小数を使えます。
 * 実行周期は左右に一回震えて戻るまでを1として、指定した周期分震えたら停止します。
 * 実行周期を省略した場合、停止させるまで永続して震えます。
 * 例：Fuku_Plugins.EventTremble.startObject($gamePlayer,8,0.8);
 * 
 * 
 * 震え停止(イベントオブジェクト指定)：
 * Fuku_Plugins.EventTremble.stopObject(Game_CharacterBase イベント)
 * 
 * このプラグインで震えさせている、指定したイベントの震えを止めます。
 * 例：Fuku_Plugins.EventTremble.stopObject($gamePlayer);
*/

var Fuku_Plugins=Fuku_Plugins||{};
Fuku_Plugins.EventTremble={Version:100};

(function(){
'use strict';

var dm_extractSaveContents=DataManager.extractSaveContents;
DataManager.extractSaveContents=function(contents){
	dm_extractSaveContents.apply(this,arguments);
	
	var restore=function(ev){
			if(!ev) {return;}
			if(ev._fuku_trembleinfo){
				var power,speed,stop_cycle;
				power=ev._fuku_trembleinfo.power;
				speed=ev._fuku_trembleinfo.speed;
				stop_cycle=ev._fuku_trembleinfo.stop_cycle;
				ev._fuku_trembleinfo=undefined;
				if(power){
					Fuku_Plugins.EventTremble.startObject(ev,power,speed,stop_cycle);
				}
			}
		};
	restore($gamePlayer);
	$gameMap.events().forEach(restore);
};

var hook_screenX=function(){
	return this._fuku_trembleinfo.screenX.call(this)+this._fuku_trembleinfo.offsetx;
};
var hook_update=function(){
	var trembleinfo=this._fuku_trembleinfo;
	trembleinfo.update.apply(this,arguments);
	if(!trembleinfo.power)return;
	trembleinfo.ang+=trembleinfo.speed;
	trembleinfo.offsetx=Math.round(Math.sin(trembleinfo.ang)*trembleinfo.power);
	if(trembleinfo.stop_ang && (trembleinfo.ang>trembleinfo.stop_ang)){
		Fuku_Plugins.EventTremble.stopObject(this);
	}
};

Fuku_Plugins.EventTremble.startObject=function(event,power,speed,stop_cycle){
	if(!event._fuku_trembleinfo){
		event._fuku_trembleinfo={ang:0.0,offsetx:0,screenX:event.screenX,update:event.update};
		event.screenX=hook_screenX;
		event.update=hook_update;
	}
	event._fuku_trembleinfo.power=power;
	event._fuku_trembleinfo.speed=speed;
	if(stop_cycle){
		event._fuku_trembleinfo.stop_cycle=stop_cycle;
		event._fuku_trembleinfo.stop_ang=event._fuku_trembleinfo.ang+stop_cycle*Math.PI*2;
	}
	else{
		event._fuku_trembleinfo.stop_cycle=null;
		event._fuku_trembleinfo.stop_ang=null;
	}
	return true;
};
Fuku_Plugins.EventTremble.start=function(eventid,power,speed,stop_cycle){
	var event=(eventid<0?$gamePlayer:$gameMap.event(eventid));
	if(!event)return false;
	return Fuku_Plugins.EventTremble.startObject(event,power,speed,stop_cycle);
};
Fuku_Plugins.EventTremble.stopObject=function(event){
	if(!event._fuku_trembleinfo)return false;
	if((event.screenX===hook_screenX)&&(event.update===hook_update)){
		event.screenX=event._fuku_trembleinfo.screenX;
		event.update=event._fuku_trembleinfo.update;
		event._fuku_trembleinfo=undefined;
	}
	else{
		event._fuku_trembleinfo.power=null;
		event._fuku_trembleinfo.ang=0.0;
		event._fuku_trembleinfo.offsetx=0;
	}
	return true;
};
Fuku_Plugins.EventTremble.stop=function(eventid){
	var event=(eventid<0?$gamePlayer:$gameMap.event(eventid));
	if(!event)return false;
	return Fuku_Plugins.EventTremble.stopObject(event);
};
Fuku_Plugins.EventTremble.speed2cycleframe=function(speed){
	return Math.PI*2/speed;
};
})();