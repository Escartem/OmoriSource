// Copyright (c) 2017-2019 fuku
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//

// 最新版は↓から
// http://www5f.biglobe.ne.jp/~fuku-labo/library/etc/

/*:
 * @plugindesc 書いただけ詰め合わせ
 * @author fuku
 *
 * @help いろんなプラグインの素詰め合わせです。
 * 書いただけで一切テストしておりませんので、多分動きません。
 *
 * 必要に応じて抽出/修正してお使いください。
 * バグ報告などがあった場合はある程度対応します。
*/

//////////////////////////////////////
//中途半端な位置にスクロールするとマップやイベントの描画がずれる場合がある問題の修正

var Fuku_Plugins=Fuku_Plugins||{};
Fuku_Plugins.FixScrollFloatingPointError={Version:2};

var sm_updateMain=Scene_Map.prototype.updateMain;
Scene_Map.prototype.updateMain=function(){
	sm_updateMain.call(this);
	
	var w=$gameMap.tileWidth()*16777216;
	var h=$gameMap.tileHeight()*16777216;
	$gameMap._displayX=Math.round($gameMap._displayX*w)/w;
	$gameMap._displayY=Math.round($gameMap._displayY*h)/h;
};

//////////////////////////////////////
//低速スクロール時にマップとイベントの移動タイミングがずれる問題の修正

var Fuku_Plugins=Fuku_Plugins||{};
Fuku_Plugins.FixUnmatchMapAndEventFragCoordProcess={Version:1};

Game_CharacterBase.prototype.screenX = function() {
    var tw = $gameMap.tileWidth();
    return Math.ceil(this.scrolledX() * tw + tw / 2);
};

Game_CharacterBase.prototype.screenY = function() {
    var th = $gameMap.tileHeight();
    return Math.ceil(this.scrolledY() * th + th -
                      this.shiftY() - this.jumpHeight());
};


//////////////////////////////////////
//色調変更スプライトが正常に描画できないことがある問題の修正

var Fuku_Plugins=Fuku_Plugins||{};
Fuku_Plugins.FixToneChangedSpriteDrawError={Version:1};

var sp_createTinter=Sprite.prototype._createTinter;
Sprite.prototype._createTinter=function(w,h){
   sp_createTinter.apply(this,arguments);
   this._tintTexture.mipmap=false;
};


