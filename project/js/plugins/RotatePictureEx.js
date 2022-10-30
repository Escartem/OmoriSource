//=============================================================================
// RotatePictureEx.js
//=============================================================================

/*:
 * @plugindesc Rotate picture with specified angle and frame
 * @author Sasuke KANNAZUKI
 *
 * @help Plugin Command:
 * RotatePictureEx <pictureId> <angle> <frame> <waitFlag>
 * where <pictureId> must be the number of picture id.
 * <angle> must be the number to rotate angle. when positive value,
 *  it rotates clockwise. when negative value, it rotates reverse.
 * <frame> must be the natural number that frame to rotate.
 * <waitFlag> must be 0 or 1. when it is 1, wait until rotate is finished.
 *
 * for any parameter, you can set variable ID for following notation:
 * V20  # the value of game variable #20.
 *
 * ex:
 * RotatePictureEx 1 720 60 1   # rotate picture #1 720 degree in 60 frames
 *  and wait until rotation finished.
 * RotatePictureEx V10 720 V20 0  # rotate picutre whose number is the value of
 *  game variable #10, rotate 720 frames in the frames of the value of
 *  game variable #20
 *
 * note:
 * - command is invalid when the picture is not displayed.
 * - if you execute command when older rotation is not finished,
 * older rotation is cancelled.
 * - if you execute command when the picture is rolling by event command,
 * temporary stop event rolling and execute command instead.
 * - You can rotate picture with moving and/or changing tint,
 * by operating event command and plugin command simultaneously.
 *
 * Copyright:this plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */
/*:ja
 * @plugindesc ピクチャを指定した角度とフレーム数で回転させます
 * @author 神無月サスケ
 *
 * @help プラグインコマンド:
 * RotatePictureEx <pictureId> <angle> <frame> <waitFlag>
 * <pictureId> は、ピクチャIDにしてください。
 * <angle>は回転させたい角度(一周＝360)にしてください。
 *  正の値なら時計回り、負の値なら反時計回りになります。
 * <frame>は回転にかかるフレーム数(1以上)にしてください(1秒＝60フレーム)
 *  0か負の値を指定した場合、回転は行われません。
 * <waitFlag>が 1 なら回転が終わるまでウェイトします。0 ならウェイトしません。
 *
 * 各パラメータで、以下の書式で数字の代わりに変数IDを指定することが出来ます。
 * V20   # 変数20番の値
 *
 * 例：
 * RotatePictureEx 1 720 60 1   # 60フレームかけて720度回転させます。回転中は
 * ウェイトします。
 * RotatePictureEx V10 720 V20 0  # 変数10番の値のIDのピクチャを、
 * 変数20番の値のフレーム数で、720度回転させます。
 *
 * 注意:
 * - ピクチャが表示されていない時はプラグインコマンドは無効です。
 * - プラグインコマンドでの回転が終わらないうちに新たにプラグインコマンドで
 * 同じピクチャを回転させた場合、前の回転はキャンセルされます。
 * - イベントコマンドで回転させているピクチャにプラグインコマンドを実行した
 * 場合、イベントコマンドの回転を一旦休止して、こちらの回転を優先させます。
 * - 連続して「ピクチャの色調変更」や「ピクチャの移動」を実行することで、
 * 回転とそれらの操作を同時に行うことも可能です。
 *
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 */

(function() {

  //
  // process plugin commands
  //
  function argToNumber(arg) {
    var reg = (/^V([0-9]+)/i).exec(arg);
    if(reg){
      return $gameVariables.value(Number(reg[1])) || 0;
    } else {
      return Number(arg) || 0;
    }
  }

  var _Game_Interpreter_pluginCommand =
   Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === 'RotatePictureEx') {
      var pictureId = argToNumber(args[0]);
      var picture = $gameScreen.picture(pictureId);
      var angle = argToNumber(args[1]);
      var frame = argToNumber(args[2]);
      var needsWait = !!argToNumber(args[3]);
      if (angle !== 0 && frame > 0 && picture) {
        picture.setRotationWithFrame(angle, frame);
        if (needsWait) {
          $gameMap._interpreter.wait(frame);
        }
      }
    }
  };

  //
  // setting 'rotation with frame' mode.
  //
  var _Game_Picture_initRotation = Game_Picture.prototype.initRotation;
  Game_Picture.prototype.initRotation = function() {
    _Game_Picture_initRotation.call(this);
    this.resetRotationWithFrame();
  };

  Game_Picture.prototype.resetRotationWithFrame = function() {
    this._maxFrame = 0;
    this._frame = 0;
    this._maxAngle = 0;
  };

  Game_Picture.prototype.setRotationWithFrame = function(angle, frame) {
    this._maxFrame = frame;
    this._frame = 0;
    this._maxAngle = angle;
  };

  Game_Picture.prototype.isFrameSetMode = function() {
    this._maxFrame = this._maxFrame || 0;
    return this._maxFrame > 0;
  };

  //
  // find current angle
  //
  var _Game_Picture_updateRotation = Game_Picture.prototype.updateRotation;
  Game_Picture.prototype.updateRotation = function() {
    if (this.isFrameSetMode()) {
      if (++this._frame === this._maxFrame) {
        this._angle += this._maxAngle;
        this.resetRotationWithFrame();
      }
      return;
    }
    _Game_Picture_updateRotation.call(this);
  };

  var _Game_Picture_angle = Game_Picture.prototype.angle;
  Game_Picture.prototype.angle = function() {
    if (this.isFrameSetMode()) {
      var currenAngle = this._maxAngle * (this._frame / this._maxFrame);
      return _Game_Picture_angle.call(this) + currenAngle;
    }
    return _Game_Picture_angle.call(this);
  };

})();
