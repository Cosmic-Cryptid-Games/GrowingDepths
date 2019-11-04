//=============================================================================
// TMPlugin - ジャンプアクション
// バージョン: 1.0.1
// 最終更新日: 2017/07/28
// 配布元    : http://hikimoki.sakura.ne.jp/
//-----------------------------------------------------------------------------
// Copyright (c) 2015 tomoaky
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @plugindesc マップシーンをそれっぽいアクションゲームにします。
 * 使用方法などは配布サイトを参照してください。
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param gravity
 * @type string
 * @desc 重力の強さ。
 * 初期値: 0.004
 * @default 0.004
 *
 * @param friction
 * @type string
 * @desc 通常の地形とイベントの摩擦の強さ。
 * 初期値: 0.001
 * @default 0.001
 *
 * @param stepsForTurn
 * @type number
 * @desc 何マスの移動で１ターン経過するか。
 * 初期値: 20
 * @default 20
 *
 * @param allDeadEvent
 * @type number
 * @desc 全滅時に起動するコモンイベント番号。
 * 初期値: 0
 * @default 0
 *
 * @param guardState
 * @type state
 * @desc 防御状態として扱うステート番号
 * 初期値: 2
 * @default 2
 *
 * @param guardMoveRate
 * @type number
 * @desc 防御状態の移動速度補正（％）
 * 初期値: 25
 * @default 25
 *
 * @param eventCollapse
 * @type boolean
 * @desc イベント戦闘不能時に崩壊エフェクトを使う。
 * 初期値: ON ( false = OFF 無効 / true = ON 有効 )
 * @default true
 *
 * @param hpGauge
 * @type boolean
 * @desc 足元にHPゲージを表示する機能を利用する。
 * 初期値: ON ( false = OFF 無効 / true = ON 有効 )
 * @default true
 *
 * @param flickWeight
 * @type number
 * @desc はじき飛ばせる重さの差。
 * 初期値: 1（ 0 なら同じ重さではじき飛ばせる )
 * @default 1
 *
 * @param flickSkill
 * @type skill
 * @desc はじき飛ばしのダメージ計算に使うスキル番号。
 * 初期値: 1（ 0 ならダメージなし )
 * @default 1
 *
 * @param stageRegion
 * @type number
 * @desc 足場として扱うリージョン番号。
 * 初期値: 60
 * @default 60
 *
 * @param wallRegion
 * @type number
 * @desc 壁として扱うリージョン番号。
 * 初期値: 61
 * @default 61
 *
 * @param slipWallRegion
 * @type number
 * @desc 壁ジャンプができない壁として扱うリージョン番号。
 * 初期値: 62
 * @default 62
 *
 * @param slipFloorRegion
 * @type number
 * @desc すべる床として扱うリージョン番号。
 * 初期値: 63
 * @default 63
 *
 * @param roughFloorRegion
 * @type number
 * @desc 移動速度半減の床として扱うリージョン番号。
 * 初期値: 64
 * @default 64
 *
 * @param marshFloorRegion
 * @type number
 * @desc 移動できない床として扱うリージョン番号。
 * 初期値: 65
 * @default 65
 *
 * @param waterTerrainTag
 * @type number
 * @desc 水中として扱う地形タグ番号。
 * 初期値: 1
 * @default 1
 *
 * @param levelupPopup
 * @type string
 * @desc レベルアップ時に表示するポップアップ。
 * 初期値: LEVEL UP!!
 * @default LEVEL UP!!
 *
 * @param levelupAnimationId
 * @desc レベルアップ時に表示するアニメーション番号。
 * 初期値: 46
 * @default 46
 * @require 1
 * @type animation
 *
 * @param attackToOk
 * @type boolean
 * @desc 攻撃ボタンをメニューの決定ボタンとしても使うかどうか
 * 初期値: ON ( false = OFF 無効 / true =  ON 有効 )
 * @default true
 *
 * @param jumpToCancel
 * @type boolean
 * @desc ジャンプボタンをメニューのキャンセルボタンとしても使うかどうか
 * 初期値: ON ( false = OFF 無効 / true = ON 有効 )
 * @default true
 *
 * @param useEventSeSwim
 * @type boolean
 * @desc 水に入ったときの効果音をイベントに適用する。
 * 初期値: ON ( false = OFF 無効 / true = ON 有効 )
 * @default true
 *
 * @param jumpSe
 * @desc ジャンプ効果音のファイル名。
 * 初期値: Crossbow
 * @default Crossbow
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param jumpSeParam
 * @type string
 * @desc ジャンプ効果音のパラメータ。
 * 初期値: {"volume":90, "pitch":100, "pan":0}
 * @default {"volume":90, "pitch":100, "pan":0}
 *
 * @param dashSe
 * @desc ダッシュ効果音のファイル名。
 * 初期値: Wind4
 * @default Wind4
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param dashSeParam
 * @type string
 * @desc ダッシュ効果音のパラメータ。
 * 初期値: {"volume":90, "pitch":50, "pan":0}
 * @default {"volume":90, "pitch":50, "pan":0}
 *
 * @param flickSe
 * @desc ダッシュはじき効果音のファイル名。
 * 初期値: Damage1
 * @default Damage1
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param flickSeParam
 * @type string
 * @desc ダッシュはじき効果音のパラメータ。
 * 初期値: {"volume":90, "pitch":100, "pan":0}
 * @default {"volume":90, "pitch":100, "pan":0}
 *
 * @param swimSe
 * @desc 入水効果音のファイル名。
 * 初期値: Water1
 * @default Water1
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param swimSeParam
 * @type string
 * @desc 入水効果音のパラメータ。
 * 初期値: {"volume":90, "pitch":100, "pan":0}
 * @default {"volume":90, "pitch":100, "pan":0}
 *
 * @param changeSe
 * @desc 操作キャラ切り替え効果音のファイル名。
 * 初期値: Sword1
 * @default Sword1
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param changeSeParam
 * @type string
 * @desc 操作キャラ切り替え効果音のパラメータ。
 * 初期値: {"volume":90, "pitch":100, "pan":0}
 * @default {"volume":90, "pitch":100, "pan":0}
 *
 * @param carrySe
 * @desc イベント持ち上げ効果音のファイル名。
 * 初期値: Cancel1
 * @default Cancel1
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param carrySeParam
 * @type string
 * @desc イベント持ち上げ効果音のパラメータ。
 * 初期値: {"volume":90, "pitch":70, "pan":0}
 * @default {"volume":90, "pitch":70, "pan":0}
 *
 * @param hurlSe
 * @desc イベント投げ効果音のファイル名。
 * 初期値: Evasion1
 * @default Evasion1
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param hurlSeParam
 * @type string
 * @desc イベント投げ効果音のパラメータ。
 * 初期値: {"volume":90, "pitch":70, "pan":0}
 * @default {"volume":90, "pitch":70, "pan":0}
 *
 * @param guardSe
 * @desc 防御効果音のファイル名。
 * 初期値: Equip1
 * @default Equip1
 * @require 1
 * @dir audio/se/
 * @type file
 *
 * @param guardSeParam
 * @type string
 * @desc 防御効果音のパラメータ。
 * 初期値: {"volume":90, "pitch":150, "pan":0}
 * @default {"volume":90, "pitch":150, "pan":0}
 *
 * @param enemyBulletsMax
 * @type number
 * @desc イベントの弾の最大数。
 * 初期値: 256
 * @default 256
 *
 * @param weaponSprite
 * @type boolean
 * @desc 弾発射時に武器画像を表示する。
 * 初期値: ON ( false = OFF 無効 / true = ON 有効 )
 * @default true
 *
 * @param autoDamageSe
 * @type boolean
 * @desc 着弾時に自動で効果音を再生する。
 * 初期値: ON (false = OFF 無効 / true = ON 有効 )
 * @default true
 *
 * @param bulletTypeName1
 * @desc 弾タイプ 1 の画像ファイル名。
 * 初期値: Bullet1
 * @default Bullet1
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param bulletTypeName2
 * @desc 弾タイプ 2 の画像ファイル名。
 * 初期値: Bullet1
 * @default Bullet1
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param bulletTypeName3
 * @desc 弾タイプ 3 の画像ファイル名。
 * 初期値: Bullet1
 * @default Bullet1
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param bulletTypeName4
 * @desc 弾タイプ 4 の画像ファイル名。
 * 初期値: Bullet1
 * @default Bullet1
 * @require 1
 * @dir img/system/
 * @type file
 *
 * @param bulletTypeSize
 * @type string
 * @desc 弾タイプごとの当たり判定のサイズ。
 * 初期値: 6,6,6,6
 * @default 6,6,6,6
 *
 * @param attackKey
 * @type string
 * @desc プレイヤーの弾発射に使用するキー
 * 初期値: Z
 * @default Z
 *
 * @param jumpKey
 * @type string
 * @desc プレイヤーのジャンプに使用するキー
 * 初期値: X
 * @default X
 *
 * @param dashKey
 * @type string
 * @desc プレイヤーのダッシュに使用するキー
 * 初期値: C
 * @default C
 *
 * @param padButtons
 * @type string
 * @desc 利用するパッドボタンのコード
 * 初期値: ok,cancel,menu,shift,attack,jump,pageup,pagedown
 * @default ok,cancel,menu,shift,attack,jump,pageup,pagedown
 *
 * @param padButtonNames
 * @type string
 * @desc Pad button name
 * Set button names in the same order as padButtons
 * @default decision, cancel, menu, dash, attack, jump, character change (previous), character change (next)
 *
 * @param defaultPadButtons
 * @type string
 * @desc initial placement of pad buttons
 * Default: Set the code corresponding to buttons 1-12
 * @default cancel, ok, shift, jump, pageup, pagedown, attack, menu, menu, menu, menu, menu
 *
 * @param padConfigCommand
 * @type string
 * @desc Pad button command name (empty to disable function)
 * Default: Pad button layout
 * @default pad button layout
 *
 * @param stepAnimeConstantA
 * @type string
 * @desc 足踏み速度定数Ａ
 * 初期値: 0.1
 * @default 0.1
 *
 * @param stepAnimeConstantB
 * @type string
 * @desc 足踏み速度定数Ｂ
 * 初期値: 300
 * @default 300
 *
 * @noteParam shot_se_name
 * @noteRequire 1
 * @noteDir audio/se/
 * @noteType file
 * @noteData weapons
 *
 * @requiredAssets img/system/TMJumpActionShield
 *
 * @help
 * TMPlugin-Jump Action ver1.0.1
 *
 * Usage:
 *
 * Please refer to the distribution site for details.
 *
 * This plug-in has been tested with RPG Maker MV Version 1.5.0.
 *
 * This plug-in is distributed under the MIT license for commercial use,
 * You can use it freely for remodeling and redistribution.
 *
 *
 * Memo field tags (actors, equipment, states):
 *
 * <move_speed: 0.05> # walking speed
 * <jump_speed: 0.14> # Jump power
 * <swim_speed: 0.02> # swim speed
 * <ladder_speed: 0.04> # Ladder speed
 * <accele: 0.003> # walking acceleration
 * <ladder_accele: 0.003> # Ladder acceleration
 * <jump_input: 0> # Jump additional input time
 * <swim_jump: 0.1> # Underwater jump power
 * <mulch_jump: 2> # Number of consecutive jumps
 * <weight: 2> # weight
 * <gravity: 0.0045> # gravity
 * <friction: 0> # friction
 * <wall_jump> # Wall jump
 * <dash_speed_x: 0.14> # Dash speed (horizontal direction)
 * <dash_speed_y: 0.06> # Dash speed (vertical)
 * <dash_count: 15> # Dash time
 * <dash_delay: 30> # Rigid time after dash
 * <dash_mp_cost: 0> # MP required for dash
 * <fall_guard: 50> # Fall damage resistance
 * <guard_speed: 15> # speed to enter defense state
 * <invincible_time: 30> # Invincible time after taking damage
 * <shot_way: 1> # Number of bullets fired simultaneously
 * <shot_space: 0.2> # Spacing between bullets (radians)
 * <shot_speed: 0.07> # bullet movement speed
 * <shot_count: 30> # bullet life
 * <shot_type: 1> # bullet type
 * <shot_index: 0> # bullet image index
 * <shot_skill: 1> # bullet skill number
 * <shot_delay: 10> # Rigid time after launch
 * <shot_se_name: Attack2> # File name of projectile sound effect
 * <shot_se_volume: 90> # Volume of bullet firing sound effect
 * <shot_se_pitch: 150> # Pitch of bullet firing sound effect
 *
 *
 * Memo field tag (event):
 *
 * <w: 0.375> # Hit judgment (size from the center to the left and right edges)
 * <h: 0.75> # Hit judgment (size from foot to head)
 * <enemy: 1> # Butler (enemy number)
 * <dead: A> # Butler self-switch when unable to fight
 * <repop: 300> # Time to re-appear (frame)
 * <lift> # lift attribute
 * <weight: 1> # weight
 * <gravity: 0.004> # gravity
 *
 *
 * Memo field tag (skill):
 *
 * <bullet_anime: 67> # Animation to play when landing
 * <map_through> # bullets penetrate ignoring terrain
 * <map_reflect> # When a bullet hits the terrain, it bounces without disappearing
 *
 * <time_bomb: 6 0 0.2 45 1 0 1>
 * Fire a new bullet when a bullet is deleted due to time out.
 * Parameters are from n to skillId of the plug-in command “nallShot”
 *     Set.
 *
 *
 * Plugin command:
 *
 * actGainHp -1 -5 # Deal 5 damage to players.
 * actGainHp 1 -100 # Deal 100 damage to event # 1.
 * actHp 1 2 # Assign event 1 HP to game variable 2.
 * actForceX -1 0.1 # Force the player's X speed to 0.1.
 * actForceY 1 -0.15 # Forcibly change the Y speed of event 1 to -0.15.
 * actForceStop -1 # Force the player speed to 0.
 * actChangeActor 2 # Change the operation character to Actor 2.
 * actHideHpGauge # Hide foot HP gauge
 * actShowHpGauge # Display current HP gauge
 *
 * actPopup -1 text # ff0000
 * Pop up red text to the player
 *
 * nwayShot eventId n space angle speed count type index skillId
 * eventId: The number of the event that fires the bullet (-1 for the player)
 * n: Number of bullets fired simultaneously
 * space: Spacing between bullets (radians)
 * angle: Fire direction (radian)
 * speed: bullet movement speed
 * count: bullet life
 * type: bullet type
 * index: Bullet image index
 * skillId: Bullet skill (for damage calculation, optional)
 *
 * nwayAim eventId n space angle speed count type index skillId
 * Same as nway_shot, but the direction the player is in the angle (radians)
 * Add automatically. If angle is 0, it will be targeted.
 *
 * nallShot eventId n angle speed count type index skillId
 * The bullets are fired in all directions, and the interval between bullets is set automatically.
 *
 * nallAim eventId n space angle speed count type index skillId
 * This is the target version of nall_shot.
 */

var MCAnimation = {
  WALK: 1,
  JUMP: 2,
  DASH: 3,
  FALLING: 4,
  WALLSLIDE: 5,
  IDLE: 6,
  fileNames: {
    1: "$MCWalk%(6 0 1 2 3 4 5)", //WALK
    2: "$JumpMC%(6 0 1 2 3 4 5)", //JUMP
    3: "$DashMC%(6 0 1 2 3 4 5)", //DASH
    4: "$FallMC%(6 0 1 2 3 4 5)", //FALL
    5: "$OwlDive%(6 0 1 2 3 4 5)", //WALLSLIDE
    6: "$SnakeAttack%(6 0 1 2 3 4 5)", //IDLE
  }
};

var Imported = Imported || {};
Imported.TMJumpAction = true;

if (!Imported.TMEventBase) {
  Imported.TMEventBase = true;
  (function() {

    //-----------------------------------------------------------------------------
    // Game_Event
    //

    var _Game_Event_setupPage = Game_Event.prototype.setupPage;
    Game_Event.prototype.setupPage = function() {
      _Game_Event_setupPage.call(this);
      if (this._pageIndex >= 0) this.loadCommentParams();
    };

    Game_Event.prototype.loadCommentParams = function() {
      this._commentParams = {};
      var re = /<([^<>:]+)(:?)([^>]*)>/g;
      var list = this.list();
      for (var i = 0; i < list.length; i++) {
        var command = list[i];
        if (command && command.code == 108 || command.code == 408) {
          for (;;) {
            var match = re.exec(command.parameters[0]);
            if (match) {
              this._commentParams[match[1]] = match[2] === ':' ? match[3] : true;
            } else {
              break;
            }
          }
        } else {
          break;
        }
      }
    };

    Game_Event.prototype.loadTagParam = function(paramName) {
      return this._commentParams[paramName] || this.event().meta[paramName] || null;
    };

  })();
}

function Game_Bullet() {
  this.initialize.apply(this, arguments);
}

(function() {

  var parameters = PluginManager.parameters('TMJumpAction');

  var deathCaseControlVariable = +(parameters['deathCaseControlVariable'] || 4);
  var enemyAggressionVariable = +(parameters['enemyAggressionVariable'] || 9);
  var actGravity = +(parameters['gravity'] || 0.004);
  var actFriction = +(parameters['friction'] || 0.001);
  var actStepsForTurn = +(parameters['stepsForTurn'] || 20);
  var actAllDeadEvent = +(parameters['allDeadEvent'] || 0);
  var actGuardStateId = +(parameters['guardState'] || 2);
  var actGuardMoveRate = +(parameters['guardMoveRate'] || 25);
  var actEventCollapse = JSON.parse(parameters['eventCollapse']);
  var actHpGauge = JSON.parse(parameters['hpGauge']);
  var actFlickWeight = +(parameters['flickWeight'] || 1);
  var actFlickSkill = +(parameters['flickSkill'] || 1);
  var actStageRegion = +(parameters['stageRegion'] || 60);
  var actWallRegion = +(parameters['wallRegion'] || 61);
  var actSlipWallRegion = +(parameters['slipWallRegion'] || 62);
  var actSlipFloorRegion = +(parameters['slipFloorRegion'] || 63);
  var actRoughFloorRegion = +(parameters['roughFloorRegion'] || 64);
  var actMarshFloorRegion = +(parameters['marshFloorRegion'] || 65);
  var actInstantKillRegion = +(parameters['instantKillRegion'] || 66);
  var actEnemyAngerRegion = +(parameters['enemyAngerRegion'] || 236);
  var actWaterTerrainTag = +(parameters['waterTerrainTag'] || 1);
  var actLevelupPopup = parameters['levelupPopup'];
  var actLevelupAnimationId = +(parameters['levelupAnimationId'] || 0);
  var actAttackToOk = JSON.parse(parameters['attackToOk']);
  var actJumpToCancel = JSON.parse(parameters['jumpToCancel']);
  var actUseEventSeSwim = JSON.parse(parameters['useEventSeSwim']);
  var actSeJump = JSON.parse(parameters['jumpSeParam'] || '{}');
  actSeJump.name = parameters['jumpSe'] || '';
  var actSeDash = JSON.parse(parameters['dashSeParam'] || '{}');
  actSeDash.name = parameters['dashSe'] || '';
  var actSeFlick = JSON.parse(parameters['flickSeParam'] || '{}');
  actSeFlick.name = parameters['flickSe'] || '';
  var actSeSwim = JSON.parse(parameters['swimSeParam'] || '{}');
  actSeSwim.name = parameters['swimSe'] || '';
  var actSeChange = JSON.parse(parameters['changeSeParam'] || '{}');
  actSeChange.name = parameters['changeSe'] || '';
  var actSeCarry = JSON.parse(parameters['carrySeParam'] || '{}');
  actSeCarry.name = parameters['carrySe'] || '';
  var actSeHurl = JSON.parse(parameters['hurlSeParam'] || '{}');
  actSeHurl.name = parameters['hurlSe'] || '';
  var actSeGuard = JSON.parse(parameters['guardSeParam'] || '{}');
  actSeGuard.name = parameters['guardSe'] || '';
  var actEnemyBulletsMax = +(parameters['enemyBulletsMax'] || 256);
  var actWeaponSprite = JSON.parse(parameters['weaponSprite']);
  var actAutoDamageSe = JSON.parse(parameters['autoDamageSe']);
  var actBulletNames = [];
  actBulletNames[1] = parameters['bulletTypeName1'];
  actBulletNames[2] = parameters['bulletTypeName2'];
  actBulletNames[3] = parameters['bulletTypeName3'];
  actBulletNames[4] = parameters['bulletTypeName4'];
  var actBulletSizes = parameters['bulletTypeSize'].split(',').map(function(n) {
    return +n / 48;
  });
  actBulletSizes.unshift(0);
  var padButtons = parameters['padButtons'].split(',');
  var padButtonNames = parameters['padButtonNames'].split(',');
  var defaultPadButtons = parameters['defaultPadButtons'].split(',');
  var padConfigCommand = parameters['padConfigCommand'];
  var actStepAnimeConstantA = +(parameters['stepAnimeConstantA'] || 0.1);
  var actStepAnimeConstantB = +(parameters['stepAnimeConstantB'] || 300);

  //-----------------------------------------------------------------------------
  // Input
  //

  if (parameters['attackKey']) {
    Input.keyMapper[parameters['attackKey'].charCodeAt()] = 'attack';
  }
  if (parameters['jumpKey']) {
    Input.keyMapper[parameters['jumpKey'].charCodeAt()] = 'jump';
  }
  if (parameters['dashKey']) {
    Input.keyMapper[parameters['dashKey'].charCodeAt()] = 'dash';
  }

  //-----------------------------------------------------------------------------
  // ConfigManager
  //

  ConfigManager.getPadButton = function(id) {
    return Input.gamepadMapper[id];
  };

  ConfigManager.setPadButton = function(id, code) {
    Input.gamepadMapper[id] = code;
  };

  var _ConfigManager_makeData = ConfigManager.makeData;
  ConfigManager.makeData = function() {
    var config = _ConfigManager_makeData.call(this);
    for (var i = 0; i < 12; i++) {
      config['padButton' + i] = this.getPadButton(i);
    }
    return config;
  };

  var _ConfigManager_applyData = ConfigManager.applyData;
  ConfigManager.applyData = function(config) {
    _ConfigManager_applyData.call(this, config);
    for (var i = 0; i < 12; i++) {
      this.setPadButton(i, this.readPadButton(config, i));
    }
  };

  ConfigManager.readPadButton = function(config, id) {
    return config['padButton' + id] || defaultPadButtons[id];
  };

  //-----------------------------------------------------------------------------
  // Game_System
  //

  var _Game_System_initialize = Game_System.prototype.initialize;
  Game_System.prototype.initialize = function() {
    _Game_System_initialize.call(this);
    this._actHpGaugeVisible = true; // add hp gauge
  };

  Game_System.prototype.isActHpGaugeVisible = function() {
    return this._actHpGaugeVisible;
  };

  Game_System.prototype.setActHpGaugeVisible = function(flag) {
    this._actHpGaugeVisible = flag;
  };

  //-----------------------------------------------------------------------------
  // Game_Action
  //

  var _Game_Action_setSubject = Game_Action.prototype.setSubject;
  Game_Action.prototype.setSubject = function(subject) {
    if (!subject.isActor() && !$gameParty.inBattle()) {
      this._subjectEnemyIndex = subject._screenX;
      this._subjectActorId = 0;
    } else {
      _Game_Action_setSubject.call(this, subject);
    }
  };

  var _Game_Action_subject = Game_Action.prototype.subject;
  Game_Action.prototype.subject = function() {
    if (this._subjectActorId == 0 && !$gameParty.inBattle()) {
      return $gameMap.event(this._subjectEnemyIndex).battler();
    } else {
      return _Game_Action_subject.call(this);
    }
  };

  //-----------------------------------------------------------------------------
  // Game_Battler
  //

  // member variable initialization
  var _Game_Battler_initMembers = Game_Battler.prototype.initMembers;
  Game_Battler.prototype.initMembers = function() {
    _Game_Battler_initMembers.call(this);
    this._actionResult = new Game_ActionResult();
  };

  // リザルトのクリア
  var _Game_Battler_clearResult = Game_Battler.prototype.clearResult;
  Game_Battler.prototype.clearResult = function() {
    this._actionResult.hpDamage += this._result.hpDamage;
    this._actionResult.missed |= this._result.missed;
    this._actionResult.evaded |= this._result.evaded;
    this._actionResult.critical |= this._result.critical;
    this._actionResult.addedStates = this._actionResult.addedStates.concat(this._result.addedStates);
    this._actionResult.removedStates = this._actionResult.removedStates.concat(this._result.removedStates);
    _Game_Battler_clearResult.call(this);
  };

  // バトル終了処理
  var _Game_Battler_onBattleEnd = Game_Battler.prototype.onBattleEnd;
  Game_Battler.prototype.onBattleEnd = function() {
    _Game_Battler_onBattleEnd.call(this);
    this.clearActionResult();
  };

  // ジャンプアクションリザルトのクリア
  Game_Battler.prototype.clearActionResult = function() {
    this._actionResult.clear();
  };

  // ダメージ効果音の再生
  Game_Battler.prototype.playDamageSe = function() {
    if (!actAutoDamageSe) return;
    SoundManager.playEnemyDamage();
  };

  // 回復効果音の再生
  Game_Battler.prototype.playRecovarySe = function() {
    if (!actAutoDamageSe) return;
    SoundManager.playRecovery();
  };

  // ミス効果音の再生
  Game_Battler.prototype.playMissSe = function() {
    if (!actAutoDamageSe) return;
    SoundManager.playMiss();
  };

  //-----------------------------------------------------------------------------
  // Game_Actor
  //

  // ダメージ床から受けるダメージ
  Game_Actor.prototype.basicFloorDamage = function() {
    return actFloorDamage;
  };

  // 何マスの移動で１ターン経過するか
  Game_Actor.prototype.stepsForTurn = function() {
    return actStepsForTurn;
  };

  // 付加されたステートの表示
  var _Game_Actor_showAddedStates = Game_Actor.prototype.showAddedStates;
  Game_Actor.prototype.showAddedStates = function() {
    if ($gameParty.inBattle()) {
      _Game_Actor_showAddedStates.call(this);
    }
  };

  // レベルアップの表示
  var _Game_Actor_displayLevelUp = Game_Actor.prototype.displayLevelUp;
  Game_Actor.prototype.displayLevelUp = function(newSkills) {
    if ($gameParty.inBattle()) {
      _Game_Actor_displayLevelUp.call(this, newSkills);
    } else {
      $gamePlayer.setMapPopup(actLevelupPopup, '#ffffff');
      $gamePlayer.requestAnimation(actLevelupAnimationId);
    }
  };

  // 解除されたステートの表示
  var _Game_Actor_showRemovedStates = Game_Actor.prototype.showRemovedStates;
  Game_Actor.prototype.showRemovedStates = function() {
    if ($gameParty.inBattle()) {
      _Game_Actor_showRemovedStates.call(this);
    }
  };

  // アクター（＋装備、ステート）のタグからパラメータ（数値）をロード
  Game_Actor.prototype.loadTagParam = function(param_name, default_value) {
    var result = +(this.actor().meta[param_name] || default_value);
    var equips = this.equips().concat(this.states());
    for (var i = 0; i < equips.length; i++) {
      if (equips[i] && equips[i].meta[param_name]) {
        result += +equips[i].meta[param_name];
      }
    }
    return result;
  };

  // アクター（＋装備、ステート）のタグからパラメータ（真偽値）をロード
  Game_Actor.prototype.loadTagBool = function(param_name) {
    var equips = this.equips().concat(this.states(), this.actor());
    for (var i = 0; i < equips.length; i++) {
      if (equips[i] && equips[i].meta[param_name]) return true;
    }
    return false;
  };

  // アクター（＋装備、ステート）のタグからパラメータ（文字列）をロード
  Game_Actor.prototype.loadTagString = function(param_name, default_value) {
    var equips = this.states().concat(this.equips(), this.actor());
    for (var i = equips.length - 1; i >= 0; i--) {
      if (equips[i] && equips[i].meta[param_name]) {
        return equips[i].meta[param_name];
      }
    }
    return default_value;
  };

  // ダメージ効果音の再生
  Game_Actor.prototype.playDamageSe = function() {
    if (!actAutoDamageSe) return;
    SoundManager.playActorDamage();
  };

  //-----------------------------------------------------------------------------
  // Game_Party
  //

  Game_Party.prototype.frontSlideActor = function() {
    for (var i = 0; i < this.size(); i++) {
      this._actors.push(this._actors.shift());
      if (!this.leader().isDead()) break;
    }
    $gamePlayer.refresh();
  };

  Game_Party.prototype.backSlideActor = function() {
    for (var i = 0; i < this.size(); i++) {
      this._actors.unshift(this._actors.pop());
      if (!this.leader().isDead()) break;
    }
    $gamePlayer.refresh();
  };

  Game_Party.prototype.sortActor = function(actorId) {
    for (var i = 0; i < this.size(); i++) {
      this._actors.push(this._actors.shift());
      if (this._actors[0] === actorId) break;
    }
    $gamePlayer.refresh();
  };

  //-----------------------------------------------------------------------------
  // Game_Map
  //

  // セットアップ
  var _Game_Map_setup = Game_Map.prototype.setup;
  Game_Map.prototype.setup = function(mapId) {
    _Game_Map_setup.call(this, mapId);
    this.setupBullets();
    this.CloudTimer = 700;
    this.CloudTimers = {};
    this.MaxCloudTimerValue = 1000;
    this.setupCloudTimer(12, 4);
  };
  
  //setup a timer that will allow the player to stand on `regionID` for
  //`this.MaxCloudTimerValue` frames.  It will gradually dim the `eventID` and then 
  //make the player no longer able to stand on `regionID`
  Game_Map.prototype.setupCloudTimer = function(regionID, eventID) {
  	this.CloudTimers[regionID] = {
  	  "EventID": eventID, 
  	  "timer": this.MaxCloudTimerValue,
  	  "Decreasing": "false",
  	}
  	console.log(this.CloudTimers);
  }

  // 弾のセットアップ
  Game_Map.prototype.setupBullets = function() {
    this._enemyBullets = [];
    this._aliveEnemyBullets = [];
    this._blankEnemyBullets = [];
    for (var i = 0; i < actEnemyBulletsMax; i++) {
      this._enemyBullets.push(new Game_Bullet());
      this._blankEnemyBullets.push(i);
    }
  };

  // 敵機弾を返す
  Game_Map.prototype.enemyBullets = function() {
    return this._enemyBullets;
  };

  // 乗り物は作らない
  Game_Map.prototype.createVehicles = function() {
    this._vehicles = [];
  };

  // 壁ジャンプが可能か判定する
  Game_Map.prototype.canWallJump = function(x, y, d) {
    if (!this.isValid(x, y)) return false;
    if (this.tileId(x, y, 5) === actSlipWallRegion) return false;
    return !this.isPassable(x, y, d);
  };

  // 通行チェック
  Game_Map.prototype.checkPassage = function(x, y, bit) {
    if (!this.isValid(x, y)) return false;
    var rg = this.tileId(x, y, 5);
    if (rg === actWallRegion || rg === actSlipWallRegion) return false;
    var flags = this.tilesetFlags();
    var tiles = this.allTiles(x, y);
    for (var i = 0; i < tiles.length; i++) {
      var flag = flags[tiles[i]];
      if (rg === actStageRegion) flag |= 1;
      
      //allow the player to stand on all the regionIDs for clouds
      for (var regionID in this.CloudTimers) {
      
      	//exclude _proto value
        if (this.CloudTimers.hasOwnProperty(regionID)) {
          //if the regionIDs match, then return "impassable" which allows 
          //standing and wall jumping
      	  if (rg === parseInt(regionID)) {
      	  	this.CloudTimers[regionID]["Decreasing"] = "true";
      	  	return false;
      	  }
        }
      }

      if ((flag & 0x10) !== 0) continue;      // [*] No effect on passage
      if ((flag & bit) === 0) return true;    // [o] Passable
      if ((flag & bit) === bit) return false; // [x] Impassable
    }
    return false;
  };

  // 弾の通行チェック
  Game_Map.prototype.checkPassageBullet = function(x, y) {
    if (!this.isValid(x, y)) return false;
    var rg = this.tileId(x, y, 5);
    if (rg === actWallRegion || rg === actSlipWallRegion) return false;
    var flags = this.tilesetFlags();
    var tiles = this.layeredTiles(x, y);
    for (var i = 0; i < tiles.length; i++) {
      var flag = flags[tiles[i]];
      if ((flag & 0x10) !== 0) continue;
      if ((flag & 0x0f) !== 0x0f) return true;
      if ((flag & 0x0f) !== 0) return false;
    }
    return false;
  };

  // フレーム更新
  var _Game_Map_update = Game_Map.prototype.update;
  Game_Map.prototype.update = function(sceneActive) {
    _Game_Map_update.call(this, sceneActive);
    this.updateBullets();
    
    //update cloud timers for the regions the player is allowed to step on
    for (var regionID in this.CloudTimers) {
      
      //exclude _proto value
      if (this.CloudTimers.hasOwnProperty(regionID)) {
        
      	if (this.CloudTimers[regionID]["Decreasing"] === "true") {
        
          //decrease timer
      	  this.CloudTimers[regionID]["timer"]--;
      	  console.log(regionID, "->", this.CloudTimers[regionID]["timer"]);
      	  
      	  //if the timer is 0 then delete the region from the timers and make the player
      	  //fall through this region again
      	  if (this.CloudTimers[regionID]["timer"] <= 0) {
      	    delete this.CloudTimers[regionID];
      	  } 
      	}
      }
    }
  };

  // 弾の更新
  Game_Map.prototype.updateBullets = function() {
    for (var i = this._aliveEnemyBullets.length - 1; i >= 0; i--) {
      var bi = this._aliveEnemyBullets[i];
      if (!this._enemyBullets[bi].update()) {
        this._aliveEnemyBullets.splice(i, 1);
        this._blankEnemyBullets.push(bi);
      }
    }
  };

  // 弾の追加
  Game_Map.prototype.addBullet = function(x, y, z, vx, vy, angle, count, type, index, enemyFlag, skillId, owner) {
    if (enemyFlag) {
      if (this._blankEnemyBullets.length > 0) {
        var bi = this._blankEnemyBullets.shift();
        this._enemyBullets[bi].setup(x, y, z, vx, vy, angle, count, type, index, true, skillId, owner);
        this._aliveEnemyBullets.push(bi);
      }
    }
  };

  // 敵機弾の全削除
  Game_Map.prototype.clearEnemyBullets = function() {
    for (var i = 0; i < this._aliveEnemyBullets.length; i++) {
      this._enemyBullets[this._aliveEnemyBullets[i]].erase();
    }
    this._blankEnemyBullets.concat(this._aliveEnemyBullets);
    this._aliveEnemyBullets = [];
  };

  // すべての弾を削除
  Game_Map.prototype.clearAllBullets = function() {
    this.clearEnemyBullets();
  };

  //-----------------------------------------------------------------------------
  // Game_Bullet
  //

  // 初期化
  Game_Bullet.prototype.initialize = function() {
    this._opacity = 0;
  };

  // セットアップ
  Game_Bullet.prototype.setup = function(x, y, z, vx, vy, angle, count, type, index, enemyFlag, skillId, owner) {
    this._opacity = 255;
    this._x = x;
    this._y = y;
    this._z = z;
    this._vx = vx;
    this._vy = vy;
    this._angle = angle;
    this._count = count;
    this._type = type;
    this._characterName = actBulletNames[this._type];
    this._characterIndex = index;
    this._enemyFlag = enemyFlag;
    this._skillId = skillId;
    this._owner = owner;
    this._collideSize = actBulletSizes[this._type];
    this._mapCollide = !$dataSkills[this._skillId].meta['map_through'];
    this._gravity = +$dataSkills[this._skillId].meta['gravity'];
  };

  // 存在状態判定
  Game_Bullet.prototype.isExist = function() {
    return this._characterName !== '';
  };

  // 敵機の弾判定
  Game_Bullet.prototype.isEnemy = function() {
    return this._enemyFlag;
  };

  // 弾タイプの取得
  Game_Bullet.prototype.type = function() {
    return this._type;
  };

  // 角度の取得
  Game_Bullet.prototype.angle = function() {
    return this._angle;
  };

  // 画面 X 座標の取得
  Game_Bullet.prototype.screenX = function() {
    var tw = $gameMap.tileWidth();
    return Math.round($gameMap.adjustX(this._x) * tw);
  };

  // 画面 Y 座標の取得
  Game_Bullet.prototype.screenY = function() {
    var th = $gameMap.tileHeight();
    return Math.round($gameMap.adjustY(this._y) * th);
  };

  // キャラクターがいる方向（角度）を取得
  Game_Bullet.prototype.angleToCharacter = function(character) {
    return Math.atan2(character._realY - character.collideH / 2 - this._y, character._realX - this._x);
  };

  // プレイヤーがいる方向（角度）を取得
  Game_Bullet.prototype.angleToPlayer = function() {
    return this.angleToCharacter($gamePlayer);
  };

  // フレーム更新
  Game_Bullet.prototype.update = function() {
    this._x += this._vx;
    this._y += this._vy;
    this._count--;
    if (this._count <= 0) {
      if ($dataSkills[this._skillId].meta['time_bomb']) this.timeBomb();
      this.erase();
    } else if (this.updateCollide()) {
      this.erase();
    }
    if (this._gravity) this._vy = Math.min(this._vy + this._gravity, 0.6);
    return this.isExist();
  };

  // 削除
  Game_Bullet.prototype.erase = function() {
    this._characterName = '';
    this._opacity = 0;
  };

  // 地形反射
  Game_Bullet.prototype.reflect = function() {
    this._x -= this._vx;
    if (this.collideMap()) {
      this._y -= this._vy;
      this._vy = 0 - this._vy;
    } else {
      this._y -= this._vy;
      this._vx = 0 - this._vx;
    }
  };

  // 時限爆弾
  Game_Bullet.prototype.timeBomb = function() {
    var a = $dataSkills[this._skillId].meta['time_bomb'].split(' ').map(Number);
    var space = Math.PI * 2 / a[0];
    for (var i = 0; i < a[0]; i++) {
      $gameMap.addBullet(this._x, this._y, 200 + i, Math.cos(a[1]) * a[2],
                         Math.sin(a[1]) * a[2], a[1], a[3], a[4], a[5],
                         this._enemyFlag, a[6], this._owner);
      a[1] += space;
    }
  };

  // 接触判定
  Game_Bullet.prototype.updateCollide = function() {
    if (this._mapCollide && this.collideMap()) {
      if ($dataSkills[this._skillId].meta['map_reflect']) {   // 弾反射の処理
        this.reflect();
        return false;
      } else {
        return true;
      }
    }
    if (this._enemyFlag) {
      if (this.collideCharacter($gamePlayer)) {
        this.executeDamage($gamePlayer);
        return true;
      }
    } else {
      var targets = $gameMap.events();
      for (i = 0; i < targets.length; i++) {
        var character = targets[i];
        if (this.collideCharacter(character)) {
          this.executeDamage(character);
          return true;
        }
      }
    }
    return false;
  };

  // 弾によるダメージ処理
  Game_Bullet.prototype.executeDamage = function(character) {
    if (character.isBattler() && this._owner.isBattler() && !character.isInvincible()) {
      character.applySkill(this._owner, this._skillId);
      if (character.battler()._result.isHit()) {
        character.setupInvincible();
        var animeId = $dataSkills[this._skillId].meta.bulletAnime;
        if (!animeId) animeId = $dataSkills[this._skillId].meta.bullet_anime;
        if (animeId) character.requestAnimation(+animeId);
      }
    }
  };

  // キャラクターと接触しているかどうかを返す
  Game_Bullet.prototype.collideCharacter = function(character) {
    if (!character.isNormalPriority()) return false;
    return this._x - this._collideSize <= character._realX + character._collideW &&
           this._x + this._collideSize >= character._realX - character._collideW &&
           this._y - this._collideSize <= character._realY &&
           this._y + this._collideSize >= character._realY - character._collideH;
  };

  // マップと接触しているかどうかを返す
  Game_Bullet.prototype.collideMap = function() {
    var x = Math.floor(this._x);
    var y = Math.floor(this._y);
    return !$gameMap.checkPassageBullet(x, y);
  }

  //-----------------------------------------------------------------------------
  // Game_CharacterBase
  //

  // member variable initialization
  var _Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
  Game_CharacterBase.prototype.initMembers = function() {
    _Game_CharacterBase_initMembers.call(this);
    
    this._CurrentAnimation = MCAnimation.WALK;
    this._needsRefresh = false;
    this._mapPopups = [];
    this._vx = 0;
    this._vy = 0;
    this._vxPlus = 0;
    this._lastY = 0;
    this._latestY = 0;
    this._previousY = 0;
    this._lastSwim = false;
    this._collideW = 0.375;
    this._collideH = 0.75;
    this._collideIds = [];
    this._landingObject = null;
    this._landingRegion = 0;
    this._ladder = false;
    this._lift = false;
    this._lockCount = 0;
    this._moveCount = 0;
    this._jumpInput = 0;
    this._dashCount = 0;
    this._canDash = true;
    this._friction = 0;
    this._moveSpeed = 0.05;
    this._wallJumpSpeed = 0.12;
    this._jumpSpeed = 0.14;
    this._swimSpeed = 0.02;
    this._dashSpeedX = 0.1;
    this._dashSpeedY = 0.03;
    this._ladderSpeed = 0.04;
    this._accele = 0.003
    this._ladderAccele = 0.003;
    this._jumpInputTime = 0;
    this._dashCountTime = 30;
    this._swimJump = 0.1;
    this._mulchJump = 2;
    this._weight = 0;
    this._gravity = actGravity;
    this._fallGuard = 0;
    this._invincibleCount = 0;
    this._invincibleTime = 10;
    this._carried = false;
    this._carryingObject = null;
  };

  // バトラーの取得
  Game_CharacterBase.prototype.battler = function() {
    return null;
  };

  // バトラーが設定されているか
  Game_CharacterBase.prototype.isBattler = function() {
    return this.battler() !== null;
  };

  // 移動状態判定
  Game_CharacterBase.prototype.isMoving = function() {
    return this._moveCount > 0;
  };

  // ダッシュ状態判定
  Game_CharacterBase.prototype.isDashing = function() {
    return this._dashCount > 0;
  };

  // 地面に立っているか
  Game_CharacterBase.prototype.isLanding = function() {
    return this._landingObject !== null;
  };

  // およぎ状態判定
  Game_CharacterBase.prototype.isSwimming = function() {
    return this.terrainTag() === actWaterTerrainTag;
  };

  // 持ち上げられ状態判定
  Game_CharacterBase.prototype.isCarried = function() {
    return this._carried;
  };

  // ガード状態判定
  Game_CharacterBase.prototype.isGuarding = function() {
    if (!this.isBattler()) return false;
    return this.battler().isStateAffected(actGuardStateId);
  };

  // ロック状態判定
  Game_CharacterBase.prototype.isLocking = function() {
    return this._lockCount > 0;
  };

  // 自分の重さで相手をはじき飛ばせるかチェック
  Game_CharacterBase.prototype.checkFlickWeight = function(weight) {
    return this._weight >= weight + actFlickWeight;
  };

  // 被弾後の無敵状態判定
  Game_CharacterBase.prototype.isInvincible = function() {
    return this._invincibleCount > 0;
  };

  // リフレッシュフラグを立てる
  Game_CharacterBase.prototype.requestRefresh = function() {
    this._needsRefresh = true;
  };

  // Set the movement speed
  Game_CharacterBase.prototype.setMoveSpeed = function(moveSpeed) {
    this._moveSpeed = moveSpeed / 100 + 0.02;
  };

  // 無敵状態のセット
  Game_CharacterBase.prototype.setupInvincible = function() {
    this._invincibleCount = this._invincibleTime;
    this.battler().requestEffect('blink');
  };

  // アニメーション間隔
  Game_CharacterBase.prototype.animationWait = function() {
    return (actStepAnimeConstantA - this._moveSpeed -
            (this.isDashing() ? 0.01 : 0)) * actStepAnimeConstantB;
  };

  // frame update
  Game_CharacterBase.prototype.update = function() {
    this.updateMove();
    this.updateAnimation();
    this.updateCollideIds();
    if (this.isDashing()) this.updateDashCount();
    if (this.isMoving()) {
      this.updateMoveCount();
    } else {
      this.updateStop();
    }
    if (this.isSwimming() !== this._lastSwim) this.updateSwiming();
    //if (this._needsRefresh) this.refresh();
    if (this.isInvincible()) this._invincibleCount--;
  };

  // Get screen X coordinate
  Game_CharacterBase.prototype.screenX = function() {
    var tw = $gameMap.tileWidth();
    return Math.round(this.scrolledX() * tw);
  };

  // Get screen Y coordinate
  Game_CharacterBase.prototype.screenY = function() {
    var th = $gameMap.tileHeight();
    return Math.round(this.scrolledY() * th);
  };
  
  //gets the player's x and y coordinates
  Game_CharacterBase.prototype.getWallJumpCalculations = function(x,y) {
    if (this._direction == 4) {
      var x = Math.floor(this._realX - this._collideW - 0.16);
	} else {
      var x = Math.floor(this._realX + this._collideW + 0.16);
    }
    var y = Math.floor(this._realY);
    return { x: x, y: y };
  }
  
  //checks if the player is against a wall and has 1 less than their max jumps
  Game_CharacterBase.prototype.currentlyCanWallJump = function() {
  	let {x, y} = this.getWallJumpCalculations();
    return $gameMap.canWallJump(x, y, this._direction) && (this._jumpCount != this._mulchJump || this.isFalling());
  }

  // move processing
  Game_CharacterBase.prototype.updateMove = function() {
    this.updateGravity();
    this.updateFriction();
    if ($gameSwitches.value(3) == true || $gameSwitches.value(4) == true) this.updateWind(); // if map has wind then update wind

    if (this._vx !== 0 || this._vxPlus !== 0) {
      this._realX += this._vx + this._vxPlus;
      if (this._through) {
        this._realX = this._realX.clamp(0, $gameMap.width());
      } else {
        if (this._vx > 0) {
          this.collideMapRight();
          this.collideCharacterRight();
        } else {
          this.collideMapLeft();
          this.collideCharacterLeft();
        }
      }
      this._x = Math.floor(this._realX);
    }
    if (this._vy !== 0) {
      this._landingObject = null;
      this._realY += this._vy;
      if (this._through) {
        this._realY = this._realY.clamp(0, $gameMap.height());
      } else {
        if (this._vy > 0) {
          this.collideMapDown();
          this.collideCharacterDown();
        } else {
          this.collideMapUp();
          this.collideCharacterUp();
        }
      }

      this._y = Math.floor(this._realY);
      this._lastY = Math.floor(this._realY);

    }
  };

  // 重力の処理
  Game_CharacterBase.prototype.updateGravity = function() {
    if (this._jumpPeak > this._realY && this._gravity > 0) {
      this.resetPeak();
    }
    this._vy = Math.min(this._vy + this._gravity, this.maxFallSpeed());
  };

  // 最大落下速度の取得
  Game_CharacterBase.prototype.maxFallSpeed = function() {
    return this.isSwimming() ? 0.04 : 0.35;
  };

  // 摩擦の処理
  Game_CharacterBase.prototype.updateFriction = function() {
    if (this.isLanding()) {
      if (Object.prototype.toString.call(this._landingObject) !== '[object Array]' &&
          this._landingObject._lift) {
        this._vxPlus = this._landingObject._vx;
      }
    } else {
      this._vxPlus = 0;
    }
  };

  // update wind
  Game_CharacterBase.prototype.updateWind = function() {
    
  };

  // 移動カウントの処理
  Game_CharacterBase.prototype.updateMoveCount = function() {
    this._moveCount--;
    if (this._moveCount == 0 && !this.isDashing()) {
      this._vx = 0;
      if (this._gravity == 0) this._vy = 0;
    }
  };

  // ダッシュカウントの処理
  Game_CharacterBase.prototype.updateDashCount = function() {
    this._dashCount--;
  };

  // 衝突しているキャラクターの処理
  Game_CharacterBase.prototype.updateCollideIds = function() {
    for(var i = this._collideIds.length - 1; i >= 0; i--) {
      var id = this._collideIds[i];
      var character = id < 0 ? $gamePlayer : $gameMap.event(id);
      if (!this.isCollide(character)) {
        this._collideIds.splice(i, 1);
      }
    }
  };

  // キャラクターとの直線距離を返す
  Game_CharacterBase.prototype.distFromCharacter = function(character) {
    var x = this._realX - character._realX;
    var y = this._realY - character._realY;
    return Math.sqrt(x * x + y * y);
  };

  // マップとの衝突判定（上方向）
  Game_CharacterBase.prototype.collideMapUp = function() {
    var lx = Math.floor(this._realX - this._collideW);
    var rx = Math.floor(this._realX + this._collideW);
    var y  = Math.floor(this._realY - this._collideH);
    for (var x = lx; x <= rx; x++) {
      if (!$gameMap.isPassable(x, y, 8)) {
        this._realY = y + 1.001 + this._collideH;
        this._vy = 0;
        this._jumpInput = 0;
        return;
      }
    }
  };

  // マップとの衝突判定（下方向）
  Game_CharacterBase.prototype.collideMapDown = function() {
    var y = Math.floor(this._realY);
    if (y === this._lastY) return;
    var lx = Math.floor(this._realX - this._collideW);
    var rx = Math.floor(this._realX + this._collideW);
    for (var x = lx; x <= rx; x++) {
      if (!$gameMap.isPassable(x, y, 2)) {
        if (this._ladder && $gameMap.isLadder(x, y)) continue;
        this._landingObject = [x, y];
        this._landingRegion = $gameMap.regionId(x, y);
        this.getLand(y - 0.001);
        return;
      }
    }
  };

  // マップとの衝突判定（左方向）
  Game_CharacterBase.prototype.collideMapLeft = function() {
    var ty = Math.floor(this._realY - this._collideH);
    var by = Math.floor(this._realY);
    var x = Math.floor(this._realX - this._collideW);
    for (var y = ty; y <= by; y++) {
      if (!$gameMap.isPassable(x, y, 4)) {
        this._realX = x + 1.001 + this._collideW;
        this._vx = 0;
        return;
      }
    }
  };

  // マップとの衝突判定（右方向）
  Game_CharacterBase.prototype.collideMapRight = function() {
    var ty = Math.floor(this._realY - this._collideH);
    var by = Math.floor(this._realY);
    var x = Math.floor(this._realX + this._collideW);
    for (var y = ty; y <= by; y++) {
      if (!$gameMap.isPassable(x, y, 6)) {
        this._realX = x - 0.001 - this._collideW;
        this._vx = 0;
        return;
      }
    }
  };

  // キャラクターとの衝突判定（上方向）
  Game_CharacterBase.prototype.collideCharacterUp = function() {
    var targets = this.collideTargets();
    for (var i = 0; i < targets.length; i++) {
      var character = targets[i];
      if (this.isCollide(character) && !character.isCarried()) {
        this.addCollideId(character.eventId());
        if (this.isNormalPriority() && character.isNormalPriority()) {
          if (this._lift) {
            character._realY = this._realY - this._collideH - 0.001;
            character._vy = this._vy;
            character._landingObject = this;
            character.resetJump();
          } else {
            this._realY = character._realY + this._collideH + 0.001;
            this._vy = 0;
            this._jumpInput = 0;
          }
        }
      }
    }
  };

  // キャラクターとの衝突判定（下方向）
  Game_CharacterBase.prototype.collideCharacterDown = function() {
    var targets = this.collideTargets();
    for (var i = 0; i < targets.length; i++) {
      var character = targets[i];
      if (this.isCollide(character) && !character.isCarried()) {
        this.addCollideId(character.eventId());
        if (this.isNormalPriority() && character.isNormalPriority()) {
          if (this._lift) {
            character._realY = this._realY + character._collideH + 0.001;
            character._jumpInput = 0;
            character._vy = this._vy;
          } else {
            this._landingObject = character;
            this._landingRegion = -1;
            this.getLand(character._realY - character._collideH - 0.001);
          }
        }
      }
    }
  };

  // キャラクターとの衝突判定（左方向）
  Game_CharacterBase.prototype.collideCharacterLeft = function() {
    var targets = this.collideTargets();
    for (var i = 0; i < targets.length; i++) {
      var character = targets[i];
      if (this.isCollide(character) && !character.isCarried()) {
        this.addCollideId(character.eventId());
        if (this.isNormalPriority() && character.isNormalPriority()) {
          if (this._lift || this._ladder) {
            character._realX = this._realX - this._collideW - 0.001 - character._collideW;
            character._vx = this._vx;
          } else {
            if (this.isDashing() && this.checkFlickWeight(character._weight)) {
              character.flick(this);
            }
            this._realX = character._realX + character._collideW + 0.001 + this._collideW;
            this._vx = 0;
          }
        }
      }
    }
  };

  // キャラクターとの衝突判定（右方向）
  Game_CharacterBase.prototype.collideCharacterRight = function() {
    var targets = this.collideTargets();
    for (var i = 0; i < targets.length; i++) {
      var character = targets[i];
      if (this.isCollide(character) && !character.isCarried()) {
        this.addCollideId(character.eventId());
        if (this.isNormalPriority() && character.isNormalPriority()) {
          if (this._lift || this._ladder) {
            character._realX = this._realX + this._collideW + 0.001 + character._collideW;
            character._vx = this._vx;
          } else {
            if (this.isDashing() && this.checkFlickWeight(character._weight)) {
              character.flick(this);
            }
            this._realX = character._realX - character._collideW - 0.001 - this._collideW;
            this._vx = 0;
          }
        }
      }
    }
  };

  // キャラクターとの衝突判定
  Game_CharacterBase.prototype.isCollide = function(character) {
    if (this.eventId() === character.eventId()) return false;
    return this._realX - this._collideW <= character._realX + character._collideW &&
           this._realX + this._collideW >= character._realX - character._collideW &&
           this._realY - this._collideH <= character._realY &&
           this._realY >= character._realY - character._collideH;
  };

  // 衝突判定を行う対象を返す
  Game_CharacterBase.prototype.collideTargets = function() {
    return $gameMap.events().concat($gamePlayer);
  };

  // 衝突している対象を追加する
  Game_CharacterBase.prototype.addCollideId = function(id) {
    if (this._collideIds.indexOf(id) == -1) {
      this._collideIds.push(id);
      this.checkEventTriggerCollide(id);
    }
  };

  Game_CharacterBase.prototype.changeAnimation = function(RequestedAnimation) {
  	  	if (this._CurrentAnimation !== RequestedAnimation) {
  		if (RequestedAnimation == MCAnimation.IDLE) {
  			this.setStepAnime(true);
  		} else {
  			this.setStepAnime(false);
  		}
    	this._CurrentAnimation = RequestedAnimation;
    	var CharacterSheetToLoad = MCAnimation.fileNames[RequestedAnimation]
    	$gameActors.actor(1).setCharacterImage(CharacterSheetToLoad, 1);
		$gamePlayer.refresh();
	}
  }

  // 地面に降りる
  Game_CharacterBase.prototype.getLand = function(y) {
    this._realY = y;
    this._vy = 0;
    this.resetJump();
    this.resetDash();    
    if (this._ladder) this.getOffLadder();
    this.resetPeak(); // if fallDamage is reimp, delete
  };

  // ジャンプカウントのリセット
  Game_CharacterBase.prototype.resetJump = function() {
    this._jumpCount = this._mulchJump;
    this._jumpInput = 0;
  };

  Game_CharacterBase.prototype.resetDash = function() {
    this._canDash = true;
  };

  // 最高到達点のリセット
  Game_CharacterBase.prototype.resetPeak = function() {
    this._jumpPeak = this._realY;
  };

  // 泳ぎ状態の更新
  Game_CharacterBase.prototype.updateSwiming = function() {
    this._lastSwim = !this._lastSwim;
  };

  // まっすぐに移動
  Game_CharacterBase.prototype.moveStraight = function(d) {
    this.setDirection(d);
    this._moveCount = Math.floor(1 / this._moveSpeed);
    if (d === 2) {
      this._vy = this._moveSpeed;
    } else if (d === 4) {
      this._vx = -this._moveSpeed;
    } else if (d === 6) {
      this._vx = this._moveSpeed;
    } else {
      this._vy = -this._moveSpeed;
    }
  };

  // ななめに移動
  Game_CharacterBase.prototype.moveDiagonally = function(horz, vert) {
    this.setDirection(horz);
    this._moveCount = Math.floor(1 / this._moveSpeed);
    this._vx = horz === 4 ? -this._moveSpeed : this._moveSpeed;
    this._vy = vert === 8 ? -this._moveSpeed : this._moveSpeed;
  };

  // ジャンプ
  Game_CharacterBase.prototype.jump = function(xPlus, yPlus) {
    if (this._jumpCount <= 0) return;
    this._jumpCount--;
    if (xPlus < 0) {
      this.setDirection(4);
      var speed = this._moveSpeed / 100 + 0.02;
      this._moveCount = Math.floor(1 / speed);
      this._vx = -speed;
    } else if (xPlus > 0) {
      this.setDirection(6);
      var speed = this._moveSpeed / 100 + 0.02;
      this._moveCount = Math.floor(1 / speed);
      this._vx = speed;
    }
    if (yPlus != 0) {
      this._vy = yPlus / 100;
    } else {
      this._vy = this.isSwimming() ? -this._swimJump : -this._jumpSpeed;
    }
    this.resetStopCount();
    this.straighten();
  };

  // ダッシュ（方向指定）
  Game_CharacterBase.prototype.dashFromDirection = function(direction) {
    var vx = direction === 4 ? -this._dashSpeedX : this._dashSpeedX;
    var vy = -this._dashSpeedY;
    this.dash(vx, vy);
  };

  // ダッシュ（速度指定）
  Game_CharacterBase.prototype.dash = function(vx, vy) {
    if (!this._canDash) return; //block dashing more than once
    this._canDash = false;
    this._vx = vx;
    this._vy = vy;
    this._dashCount = this._dashCountTime;
    this._moveCount = this._dashCount / 2;
    this.resetStopCount();
    this.straighten();

    AudioManager.playSe(actSeDash);
    //$gamePlayer.requestAnimation(122); //XXX
    this.changeAnimation(MCAnimation.DASH);
  };

  // はじかれ
  Game_CharacterBase.prototype.flick = function(user) {
    if (actFlickSkill > 0 && user.isBattler() && this.isBattler()) {
      this.applySkill(user, actFlickSkill);
    }
    this._vx = user._vx;
    var n = 1 + (user._weight - this._weight - actFlickWeight) / 2;
    this._moveCount = Math.floor(n / Math.abs(this._vx));
    AudioManager.playSe(actSeFlick);
  };

  // 持ち上げられる
  Game_CharacterBase.prototype.carry = function() {
    this._carried = true;
    this._through = true;
  };

  // 投げられる
  Game_CharacterBase.prototype.hurl = function() {
    this._carried = false;
    this._through = false;
    this._lastSwim = this.isSwimming();
  };

  // スキルの適用
  Game_CharacterBase.prototype.applySkill = function(user, skillId) {
    user.battler().clearActions();
    var action = new Game_Action(user.battler());
    action.setSkill(skillId);
    user.battler().setAction(0, action);
    user.battler().action(0).apply(this.battler());
  };

  // ダメージの処理
  Game_CharacterBase.prototype.updateDamage = function() {
    var battler = this.battler();
    battler.clearResult();
    if (battler._actionResult.hpDamage != 0) {
      battler._actionResult.hpAffected = true;
      battler._actionResult.missed = false;
      battler._actionResult.evaded = false;
      if (battler._actionResult.hpDamage > 0) {
        battler.playDamageSe();
      } else {
        battler.playRecovarySe();
      }
    } else if (battler._actionResult.missed ||
               battler._actionResult.evaded) {
      battler.playMissSe();
    }
    if (battler._actionResult.isStatusAffected()) {
      this.requestRefresh();
    }
  };

  // 座標のセット
  Game_CharacterBase.prototype.setPosition = function(x, y) {
    this._x = Math.floor(x);
    this._y = Math.floor(y);
    this._realX = x;
    this._realY = y;
  };

  // 指定位置へ移動
  var _Game_CharacterBase_locate = Game_CharacterBase.prototype.locate;
  Game_CharacterBase.prototype.locate = function(x, y) {
    _Game_CharacterBase_locate.call(this, x, y);
    this._vx = 0;
    this._vy = 0;
    this._lastY = -1;
    this._lastSwim = this.isSwimming();
    this._collideIds = [];
    this.resetPeak();
    this._carried = false;
    this._carryingObject = null;
  };

  // マップ用ポップアップのセット
  Game_CharacterBase.prototype.setMapPopup = function(text, color, ry, dy, g) {
    var popup = {};
    popup.text = text;
    popup.color = color;
    popup.ry = ry == null ? -40 : ry;
    popup.dy = dy == null ? -4 : dy;
    popup.g = g == null ? 0.5 : g;
    this._mapPopups.push(popup);
  };

  // マップ用ポップアップがたまっているかどうかを返す
  Game_CharacterBase.prototype.isMapPopupExist = function() {
    return this._mapPopups.length > 0;
  };

  // マップ用ポップアップをひとつ返す
  Game_CharacterBase.prototype.getMapPopup = function() {
    return this._mapPopups.shift();
  };

  //-----------------------------------------------------------------------------
  // Game_Character
  //

  // ランダムに移動
  Game_Character.prototype.moveRandom = function() {
    if (this._gravity == 0) {
      this.moveStraight(2 + Math.randomInt(4) * 2);
    } else {
      this.moveStraight(4 + Math.randomInt(2) * 2);
    }
  };

  // キャラクターの方を向く
  Game_Character.prototype.turnTowardCharacter = function(character) {
    var sx = this._realX - character._realX;
    var sy = this._realY - character._realY;
    if (Math.abs(sx) > Math.abs(sy)) {
      this.setDirection(sx > 0 ? 4 : 6);
    } else if (sy !== 0) {
      this.setDirection(sy > 0 ? 8 : 2);
    }
  };

  // キャラクターの反対を向く
  Game_Character.prototype.turnAwayFromCharacter = function(character) {
    var sx = this._realX - character._realX;
    var sy = this._realY - character._realY;
    if (Math.abs(sx) > Math.abs(sy)) {
      this.setDirection(sx > 0 ? 6 : 4);
    } else if (sy !== 0) {
      this.setDirection(sy > 0 ? 2 : 8);
    }
  };

  // キャラクターのいる方向（角度）を取得
  Game_Character.prototype.angleToCharacter = function(character) {
    return Math.atan2(character._realY - character._collideH / 2 - (this._realY - this._collideH / 2), character._realX - this._realX);
  };

  // プレイヤーのいる方向（角度）を取得
  Game_Character.prototype.angleToPlayer = function() {
    return this.angleToCharacter($gamePlayer);
  };

  // ｎ方向ショット
  Game_Character.prototype.nwayShot = function(n, space, angle, speed, count, type, index, skillId) {
    angle = angle - (space * (n - 1) / 2);
    for (var i = 0; i < n; i++) {
      $gameMap.addBullet(this._realX, this._realY - this._collideH / 2, 200 + i,
                         Math.cos(angle) * speed, Math.sin(angle) * speed, angle, count, type, index,
                         this.battler().isEnemy(), skillId, this);
      angle += space;
    }
  };

  // 自機狙いｎ方向ショット
  Game_Character.prototype.nwayAim = function(n, space, angle, speed, count, type, index, skillId) {
    var a = angle + this.angleToPlayer();
    this.nwayShot(n, space, a, speed, count, type, index, skillId);
  };

  // 全方位ショット
  Game_Character.prototype.nallShot = function(n, angle, speed, count, type, index, skillId) {
    var space = Math.PI * 2 / n;
    for (var i = 0; i < n; i++) {
      $gameMap.addBullet(this._realX, this._realY - this._collideH / 2, 200 + i,
                         Math.cos(angle) * speed, Math.sin(angle) * speed, angle, count, type, index,
                         this.battler().isEnemy(), skillId, this);
      angle += space;
    }
  };

  // 自機狙い全方位ショット
  Game_Character.prototype.nallAim = function(n, angle, speed, count, type, index, skillId) {
    var a = angle + this.angleToPlayer()
    this.nallShot(n, a, speed, count, type, index, skillId);
  };

  //-----------------------------------------------------------------------------
  // Game_Player
  //

  // メンバ変数の初期化
  var _Game_Player_initMembers = Game_Player.prototype.initMembers;
  Game_Player.prototype.initMembers = function() {
    _Game_Player_initMembers.call(this);
    this._realSteps = 0;
    this._carryPower = 0;
    this._wallJump = true;
    this._dashDelay = 0;
    this._dashDelayTime = 30;
    this._dashMpCost = 0;
    this._guardInput = 0;
    this._guardSpeed = 0;
    this._shotWay = 0;
    this._shotSpace = 0.2;
    this._shotSpeed = 0.1;
    this._shotCountTime = 30;
    this._shotDelayTime = 10;
    this._shotType = 1;
    this._shotIndex = 0;
    this._shotSkillId = 0;
    this._shotSeName = "";
    this._shotSeVolume = 0;
    this._shotSePitch = 0;
    this._carryingObject = null;
    this.jumpInputCountdown = 0;
    this.idleTimer = 0;
    this.idleFramesStartAnimation = 400;
  };

  // 画面中央の X 座標
  Game_Player.prototype.centerX = function() {
    return (Graphics.width / $gameMap.tileWidth() - 1) / 2.0 + 0.5;
  };

  // 画面中央の Y 座標
  Game_Player.prototype.centerY = function() {
    return (Graphics.height / $gameMap.tileHeight() - 1) / 2.0 + 0.5;
  };

  // イベントIDを返す
  Game_Player.prototype.eventId = function() {
    return -1;
  };

  // アクターの取得
  Game_Player.prototype.actor = function() {
    return $gameParty.leader();
  };

  // バトラーを返す
  Game_Player.prototype.battler = function() {
    return this.actor();
  };

  // バトラーが設定されているか
  Game_Player.prototype.isBattler = function() {
    return this.actor() ? true : false;
  };

  // ダッシュ状態判定
  Game_Player.prototype.isDashing = function() {
    return this._dashCount > 0;
  };

  // 持ち上げ状態の取得
  Game_Player.prototype.isCarrying = function() {
    return this._carryingObject !== null;
  };

  // 衝突判定を行う対象を返す
  Game_Player.prototype.collideTargets = function() {
    return $gameMap.events();
  };

  // はしごにつかまる
  Game_Player.prototype.getOnLadder = function(downFlag) {
    this._ladder = true;
    this._landingObject = null;
    this.setDirection(8);
    var lastRealX = this._realX;
    this._realX = Math.floor(this._realX) + 0.5;
    if (downFlag) this._realY += 0.04;
    this._lastY = Math.floor(this._realY);
    if (lastRealX < this._realX) {
      this.collideCharacterLeft();
    } else if (lastRealX > this._realX) {
      this.collideCharacterRight();
    }
    this._vx = 0;
    this._vy = 0;
    this.resetJump();
    this.resetPeak();
  };

  // はしごから降りる
  Game_Player.prototype.getOffLadder = function() {
    this._ladder = false;
    this.setDirection(Input.isPressed('left') ? 4 : 6);
  };

  // Triggering the collision event
  Game_Player.prototype.checkEventTriggerCollide = function(id) {
    if (!$gameMap.isEventRunning()) {
      var event = $gameMap.event(id);
  //    if (event.isTriggerIn([1, 2]) && event.isNormalPriority() === normal) {
      if (event.isTriggerIn([1, 2])) {
        event.start();
      }
    }
  };
  
  //if the player is in the enemy aggression region, let the enemies know
  //if the player is in the instant death region, kill them
  Game_Player.prototype.checkPlayerRegionOverlap = function(x, y) {
    var playerRegionID = $gameMap.regionId(x, y);
    var regionIDAbove = $gameMap.regionId(x, y - 1);
  
  	//If the player is in the enemy aggression region, set enemyAggressionVariable to 1
  	//otherwise set it to 0
  	if (playerRegionID === actEnemyAngerRegion) {
    	$gameVariables.setValue(enemyAggressionVariable, 1);
    } else {
    	$gameVariables.setValue(enemyAggressionVariable, 0);
    }
    
    //If the player is in the death region or just below spikes, then kill them
  	if (playerRegionID === actInstantKillRegion || regionIDAbove === actInstantKillRegion) {
  	
  		//prevent double death by setting deathCaseControlVariable to 1.  The common event
  		//sets the deathCaseControlVariable back to 0 once it finishes respawning
  		//the player, meaning that there's no way this "if" statement will be entered more
  		//than once per death
    	if ($gameVariables.value(deathCaseControlVariable) == 0) {
          	$gameVariables.setValue(deathCaseControlVariable, 1);
          	var battler = this.actor()
          	battler.addState(0001)
        }
    }
  }
  
  // frame update
  Game_Player.prototype.update = function(sceneActive) {
  	this.checkPlayerRegionOverlap($gamePlayer.x, $gamePlayer.y);

  	//prevent jumping for a certain while
  	//remove 1 tick every update frame
  	if (this.jumpInputCountdown > 0) {
  		this.jumpInputCountdown = this.jumpInputCountdown - 1;
  	}
  	
  	if (this.currentlyCanWallJump()) {
  		this.changeAnimation(MCAnimation.WALLSLIDE);
  	}

    var lastScrolledX = this.scrolledX();
    var lastScrolledY = this.scrolledY();
    var currentActor = this.actor();
    if (this.isLocking()) {
      this.updateLock();
    } else {
      if (sceneActive && this.canMove()) this.updateInput();
      var lastRealX = this._realX;
      var lastRealY = this._realY;
      Game_Character.prototype.update.call(this);
      this.updateSteps(lastRealX, lastRealY);
    }
    this.updateScroll(lastScrolledX, lastScrolledY);
    if (this.isBattler()) this.updateDamage();
  //  this._followers.update();
  };

  // input processing
  Game_Player.prototype.updateInput = function() {
  	this.updateIdleCount();
    this.carryByInput();
    if (this.isCarrying()) this._shotDelay = 1;
    this.attackByInput();
    this.moveByInput();
    this.jumpByInput();
    this.dashByInput();
    this.guardByInput();
    this.triggerButtonAction();
    //"if travelling downwards and not able to wall jump, change character image"
    if (this.isFalling() && !this.currentlyCanWallJump()) {
      this.changeAnimation(MCAnimation.FALLING);
    }
  };
  
  //If the player is dashing, then I don't care if they are falling,
  //otherwise check if the player has downards velocity
  Game_Player.prototype.isFalling = function() {
  	return !this.isDashing() && this._vy > 0;
  }
  
  Game_Player.prototype.updateIdleCount = function() {
  	//if the player has no vertical and horizontal velocity on this
  	//frame, then increment the idle counter. Otherwise set the idle timer to 0.
  	if (this._vx === 0 && this._vy === 0) {
  		this.idleTimer++;
  		if (this.idleTimer >= this.idleFramesStartAnimation) {
  			this.changeAnimation(MCAnimation.IDLE);
  		}
  	} else {
  		this.idleTimer = 0;
  	}
  }

  // Gravity handling
  Game_Player.prototype.updateGravity = function() {
    if (this._ladder || (this._jumpPeak > this._realY && this._gravity > 0)) {
      this.resetPeak();
      if (this._ladder) return;
    }
    Game_Character.prototype.updateGravity.call(this);
  };

  // friction handling
  Game_Player.prototype.updateFriction = function() {
    Game_Character.prototype.updateFriction.call(this);
    this._friction = 0;
    if (this._ladder) {
      var n = this.isMoving() ? 0 : actFriction;
      if (this._vy !== 0) {
        this._vy = this._vy > 0 ? Math.max(this._vy - n, 0) : Math.min(this._vy + n, 0);
      }
    } else {
      // Adjust so as not to exceed movement speed unless in dash state
      if (!this.isDashing()) {
        var n = this.isSwimming() ? this._swimSpeed : this._moveSpeed;

        if($gameSwitches.value(3) == true) { // WIND E TO W
          var r = this._moveSpeed * .75;
          var l = -this._moveSpeed * 3;
          if(this._vx < l) {
            this._vx = Math.min(this._vx + 0.005, l);
          } else if (this._vx > r) {
            this._vx = Math.max(this._vx - 0.005, r);
          }
        } else if ($gameSwitches.value(4) == true) {// wind W to E
          var l = -this._moveSpeed * .75;
          var r = this._moveSpeed * 2;
          if(this._vx < l) {
            this._vx =  Math.max(this._vx + 0.005, l);
          } else if (this._vx > r) {
            this._vx = Math.min(this._vx - 0.005, r);
          }
        } else { // NO WIND
          if (this._vx < -n) {
            this._vx = Math.min(this._vx + 0.005, -n);
          } else if (this._vx > n) {
            this._vx = Math.max(this._vx - 0.005, n);
          }
        }
      }
      if (this.isLanding()) {
        var n = actFriction;
        var speed = this._moveSpeed;
        if (this.isGuarding()) speed = speed * actGuardMoveRate / 100;
        switch (this._landingRegion) {
        case actSlipFloorRegion:
          this._friction = 0.0025;
          return;
        case actRoughFloorRegion:
          if (Math.abs(this._vx) > speed / 2) {
            this._vx = this._vx > 0 ? speed / 2 : -speed / 2;
          }
          break;
        case actMarshFloorRegion:
          this._vx = 0;
          return;
        case actInstantKillRegion:
          if ($gameVariables.value(deathCaseControlVariable) == 0) {
          	$gameVariables.setValue(deathCaseControlVariable, 1);
          	var battler = this.actor()
          	battler.addState(0001)
          }
          break;
        default:
          if (this.isGuarding() && Math.abs(this._vx) > speed) {
            this._vx = this._vx > 0 ? speed : -speed;
          }
          break;
        }
        if (!this.isMoving()) {
          if (this._vx > 0) {
            this._vx = Math.max(this._vx - n, 0);
          } else if (this._vx < 0) {
            this._vx = Math.min(this._vx + n, 0);
          }
        }
      }
    }
  };

  // 移動カウントの処理
  Game_Player.prototype.updateMoveCount = function() {
    this._moveCount--;
  };

  // handle lock state
  Game_Player.prototype.updateLock = function() {
    this._lockCount--;
    if (this._lockCount === 0 && this.battler().isDead()) {
      this.changeMember();
    }
  };

  // Lift by button operation (throw)
  Game_Player.prototype.carryByInput = function() {
    if (this.isCarrying()) {
      if (Input.isTriggered('attack')) {
        var target = this._carryingObject;
        var lastRealX = target._realX;
        target.collideMapLeft();
        if (lastRealX !== target._realX) {
          target._realX = lastRealX;
          return;
        }
        target.collideMapRight();
        if (lastRealX !== target._realX) {
          target._realX = lastRealX;
          return;
        }
        var lastRealY = target._realY;
        target.collideMapUp();
        if (lastRealY !== target._realY) {
          target._realY = lastRealY;
          return;
        }
        target.collideMapDown();
        if (lastRealY !== target._realY) {
          target._realY = lastRealY;
          return;
        }
        var targets = target.collideTargets();
        for (var i = 0; i < targets.length; i++) {
          var character = targets[i];
          if (!character._through && target.isCollide(character)) return;
        }
        this.executeHurl();
      }
    } else {
      if (Input.isTriggered('attack') && Input.isPressed('down') &&
          this.isLanding() && !this.isGuarding() &&
          Object.prototype.toString.call(this._landingObject) !== '[object Array]') {
        if (this._carryPower >= this._landingObject._weight) {
          this.executeCarry();
        } else {
          this._shotDelay = 1;
        }
      }
    }
  };

  // lift
  Game_Player.prototype.executeCarry = function() {
    this._carryingObject = $gameMap.event(this._landingObject.eventId());
    this._carryingObject.carry();
    this._landingObject = null;
    AudioManager.playSe(actSeCarry);
  };

  // throw
  Game_Player.prototype.executeHurl = function() {
    this._carryingObject.hurl();
    if (Input.isPressed('up')) {            // 上を押しながら投げた
      this._carryingObject.dash(this._vx, -0.14);
    } else if (Input.isPressed('down')) {   // 下を押しながら投げた
      if (this._direction === 4) {
        this._carryingObject.dash(-0.05, -0.02);
      } else if (this._direction === 6) {
        this._carryingObject.dash(0.05, -0.02);
      } else {
        this._carryingObject.dash(0, -0.02);
      }
    } else {    // 左右いずれかを押しながら、またはどちらも押さずに投げた
      if (this._direction === 4 || Input.isPressed('left')) {
        this._carryingObject.dash(-0.14, -0.03)
      } else if (this._direction === 6 || Input.isPressed('right')) {
        this._carryingObject.dash(0.14, -0.03)
      } else {
        this._carryingObject.dash(0, 0);
      }
    }
    this._carryingObject = null;
    this._shotDelay = 1;
    AudioManager.playSe(actSeHurl);
  };

  // Attack by button input
  Game_Player.prototype.attackByInput = function() {
    if (this._shotDelay > 0) {
      this._shotDelay--;
      this.removeGuard();         // 防御状態の解除
    } else {
      var n = this._shotWay;
      if (Input.isTriggered('attack') && n > 0) {
        var space = this._shotSpace;
        var speed = this._shotSpeed;
        var count = this._shotCountTime;
        var type = this._shotType;
        var index = this._shotIndex;
        if (this._shotSkillId > 0) {
          var skillId = this._shotSkillId;
        } else {
          var skillId = this.battler().attackSkillId();
        }
        if (this._ladder) {
          if (Input.isPressed('left')) {
            this.setDirection(4);
          } else if (Input.isPressed('right')) {
            this.setDirection(6);
          }
        }
        var pan = 0;
        if (this._direction == 4) {
          this.nwayShot(n, space, Math.PI, speed, count, type, index, skillId)
          pan = -10;
        } else if (this._direction == 6){
          this.nwayShot(n, space, 0, speed, count, type, index, skillId)
          pan = 10;
        } else {
          this.nwayShot(n, space, Math.PI * 1.5, speed, count, type, index, skillId)
        }
        this._shotDelay = this._shotDelayTime;
        if (actWeaponSprite) this.battler().performAttack();
        AudioManager.playSe({name:this._shotSeName, pitch:this._shotSePitch,
                             volume:this._shotSeVolume, pan:pan});
        this.removeGuard();         // 防御状態の解除
      }
    }
  };

  // Move by direction button input
  Game_Player.prototype.moveByInput = function() {
    if (this._ladder) {
      if (Input.isPressed('up')) {
        this.setDirection(8);
        this._vy = Math.max(this._vy - this._ladderAccele, -this._ladderSpeed);
        this._moveCount = 4;
        this.resetStopCount();
      } else if (Input.isPressed('down')) {
        this.setDirection(8);
        this._vy = Math.min(this._vy + this._ladderAccele, this._ladderSpeed);
        this._moveCount = 4;
        this.resetStopCount();
      }
      if (!this.isCollideLadder(false)) {
        this.getOffLadder();
      }
    } else {
      if (!this.isDashing()) {
        if (Input.isPressed('left')) {
          var speed = this.isGuarding() ? -this._moveSpeed * actGuardMoveRate / 100 : -this._moveSpeed;
          this.setDirection(4);
          if (this._vx > speed) {
            var accele = Math.max(this._accele - this._friction, 0);
            this._vx = Math.max(this._vx - accele, speed);
          }
          this._moveCount = 4;
        } else if (Input.isPressed('right')) {
          var speed = this.isGuarding() ? this._moveSpeed * actGuardMoveRate / 100  : this._moveSpeed;
          this.setDirection(6);
          if (this._vx < speed) {
            var accele = Math.max(this._accele - this._friction, 0);
            this._vx = Math.min(this._vx + accele, speed);
          }
          this._moveCount = 4;
        }
      }
      if (Input.isPressed('up')) {
        if (this.isCollideLadder(false)) this.getOnLadder(false);
      } else if (Input.isPressed('down')) {
        if (this.isCollideLadder(true)) this.getOnLadder(true);
      }
    }
  };
  
      // ジャンプカウントのリセット
  var _Game_Player_resetJump = Game_Player.prototype.resetJump;
  Game_Player.prototype.resetJump = function() {
  	_Game_Player_resetJump.call(this);
    if (this.idleTimer < this.idleFramesStartAnimation) {
    	this.changeAnimation(MCAnimation.WALK);
    }
  };

  // Jump processing by button input
  Game_Player.prototype.jumpByInput = function() {
    if (this._jumpInput > 0) {
      this._jumpInput--;
      if (Input.isPressed('jump')) {
        this._vy = -this._jumpSpeed;
      } else {
        this._jumpInput = 0;
      }
    }
    if (Input.isTriggered('jump')) {
      if (this.isSwimming()) {
        this.resetJump();
        this._jumpCount--;
      } else {

		//If you can wall jump, do it, (means you have used 1 jump and you're against a wall)
		//otherwise regular jump (if you can), 
		//otherwise exit routine
        if (this.currentlyCanWallJump()) {
          this.wallJump();
        } else if (this._jumpCount > 0 && this.jumpInputCountdown == 0) {
          this._jumpCount--;
          this.jumpInputCountdown = 15;
        } else {
          return;
	    }
      }
      if (this._ladder) {
        this.getOffLadder();
        if (Input.isPressed('down')) return;
      }
      this._jumpInput = this._jumpInputTime;
      if (this.isDashing()) {
        this._dashCount = this._dashCountTime;
        this._vx = this._direction == 4 ? -this._dashSpeedX : this._dashSpeedX
      }

      this._vy = this.isSwimming() ? -this._swimJump : -this._jumpSpeed;
      this.resetStopCount();
      this.straighten();
      AudioManager.playSe(actSeJump);
      this.changeAnimation(MCAnimation.JUMP);

	  //$gamePlayer.requestAnimation(122); //XXX
    }
  };

  // 壁ジャンプの X 方向処理
  Game_Player.prototype.wallJump = function() {
    this._vx = this._direction == 4 ? this._wallJumpSpeed : -this._wallJumpSpeed;
    //$gamePlayer.requestAnimation(122); //XXX
    this.setDirection(this.reverseDir(this._direction));
    this.resetPeak();
  };

  // ボタン入力によるダッシュ処理
  Game_Player.prototype.dashByInput = function() {
    if (this._dashDelay > 0) {
      this._dashDelay--;
      this.removeGuard();         // 防御状態の解除
    } else {
      var battler = this.actor();
      if (Input.isTriggered('dash') && !this.isSwimming() &&
          !$gameMap.isDashDisabled() && battler.mp >= this._dashMpCost) {
        if (this._ladder) {
          this.getOffLadder()
          if (Input.isPressed('left')) {
            this.setDirection(4);
          } else if (Input.isPressed('right')) {
            this.setDirection(6);
          }
        } else {
          if (!this._direction == 4) {
            this.setDirection(6);
          }
        }
        this.dashFromDirection(this._direction);
        this._dashDelay = this._dashDelayTime;
        this.removeGuard();         // 防御状態の解除
        if (this._dashMpCost > 0) battler.gainMp(-this._dashMpCost);
      }
    }
  };

  // ボタン入力によるガード処理
  Game_Player.prototype.guardByInput = function() {
    if (!actGuardStateId) return;
    if (Input.isPressed('down')) {
      if (this.isCarrying() || this._ladder || !this.isLanding() || this.isSwimming()) {
        this.removeGuard();
        return;
      }
      var battler = this.actor();
      if (battler && !battler.isStateAffected(actGuardStateId)) {
        this._guardInput += this._guardSpeed;
        if (this._guardInput > 600) {
          battler.addState(actGuardStateId);
          AudioManager.playSe(actSeGuard);
        }
      }
    } else {
      this.removeGuard();
    }
  };

  // ガードの解除
  Game_Player.prototype.removeGuard = function() {
    var battler = this.actor();
    this._guardInput = 0;
    if (battler) battler.removeState(actGuardStateId);
  };

  // 歩数の処理
  Game_Player.prototype.updateSteps = function(lastRealX, lastRealY) {
    this._realSteps += Math.max(Math.abs(this._realX - lastRealX), Math.abs(this._realY - lastRealY));
    if (this._realSteps >= 1) {
      if (this.isNormal()) {
        $gameParty.increaseSteps();
        if (this.actor()) this.actor().onPlayerWalk();
      }
      this._realSteps = 0;
    }
  };

  // Update wind
  Game_Player.prototype.updateWind = function() {
      Game_Character.prototype.updateWind.call(this);
      
      if($gameSwitches.value(3) == true) {
        this._vx -= this._moveSpeed / 50;
      } else if ($gameSwitches.value(4) == true) {
        this._vx += this._moveSpeed / 50;
      }
  }

  // 泳ぎ状態の更新
  Game_Player.prototype.updateSwiming = function() {
    Game_Character.prototype.updateSwiming.call(this);
    AudioManager.playSe(actSeSwim);
    this.resetPeak();
  };

  // マップイベントの起動
  Game_Player.prototype.startMapEvent = function(triggers, normal) {
    if (!$gameMap.isEventRunning()) {
      var targets = this.collideTargets();
      for (var i = 0; i < targets.length; i++) {
        var character = targets[i];
        if (this.isCollide(character)) {
          if (character.isTriggerIn(triggers) && character.isNormalPriority() === normal) {
            if (character.isBattler() && character.battler().isDead()) continue;
            character.start();
          }
        }
      }
    }
  };

  // 接触しているイベントの起動判定
  Game_Player.prototype.checkEventTriggerHere = function(triggers) {
    if (this.canStartLocalEvents()) this.startMapEvent(triggers, false);
  };

  // 正面のイベント起動判定
  Game_Player.prototype.checkEventTriggerThere = function(triggers) {
    var lastRealX = this._realX;
    this._realX += this._direction == 4 ? -this._collideW : this._collideW
    this.startMapEvent(triggers, true);
    this._realX += this._direction == 4 ? -0.5 : 0.5;
    if (!$gameMap.isAnyEventStarting() && $gameMap.isCounter(Math.floor(this._realX), this._y)) {
      this._realX += this._direction == 4 ? -0.5 : 0.5;
      this.startMapEvent(triggers, true);
    }
    this._realX = lastRealX;
  };

  // はしごと接触しているか
  Game_Player.prototype.isCollideLadder = function(downFlag) {
    var x = Math.floor(this._realX);
    if (downFlag) {
      if (!this.isLanding()) return false;
      var y = Math.floor(this._realY + 0.1);
      return $gameMap.isLadder(x, y);
    } else {
      var ty = Math.floor(this._realY - this._collideH);
      var by = Math.floor(this._realY);
      for (var y = ty; y <= by; y++) {
        if ($gameMap.isLadder(x, y)) return true;
      }
      return false;
    }
  };

  // 場所移動の実行
  Game_Player.prototype.performTransfer = function() {
    if (this.isTransferring()) {
      this.setDirection(this._newDirection);
      if (this._newMapId !== $gameMap.mapId() || this._needsMapReload) {
        $gameMap.setup(this._newMapId);
        this._needsMapReload = false;
      }
      this.locate(this._newX + 0.5, this._newY + 0.99);
      this.refresh();
      this.clearTransferInfo();
    }
  };

  // リフレッシュ
  Game_Player.prototype.refresh = function() {
    var actor = this.actor();
    if (actor) {
      var characterName   = actor.characterName();
      var characterIndex  = actor.characterIndex();
      var data = actor.actor();
      this._moveSpeed = +(data.meta['move_speed'] || 0.085);
      this._wallJumpSpeed = +(data.meta['wall_jump_speed'] || 0.12);
      this._jumpSpeed = +(data.meta['jump_speed'] || 0.14);
      this._swimSpeed = +(data.meta['swim_speed'] || 0.02);
      this._ladderSpeed = +(data.meta['ladder_speed'] || 0.04);
      this._accele = +(data.meta['accele'] || 0.003);
      this._ladderAccele = +(data.meta['ladder_accele'] || 0.003);
      this._jumpInputTime = +(data.meta['jump_input'] || 0);
      this._swimJump = +(data.meta['swim_jump'] || 0.1);
      this._mulchJump = +(data.meta['mulch_jump'] || 2);
      this._weight = +(data.meta['weight'] || 0);
      this._carryPower = +(data.meta['carry_power'] || 0);
      this._gravity = +(data.meta['gravity'] || 0.0045);
      this._dashSpeedX = +(data.meta['dash_speed_x'] || 0.14);
      this._dashSpeedY = +(data.meta['dash_speed_y'] || 0.06);
      this._dashCountTime = +(data.meta['dash_count'] || 15);
      this._dashDelayTime = +(data.meta['dash_delay'] || 30);
      this._dashMpCost = +(data.meta['dash_mp_cost'] || 0);
      this._collideW = +(data.meta['w'] || 0.375);
      this._collideH = +(data.meta['h'] || 0.75);
      this._fallGuard = +(data.meta['fall_guard'] || 0);
      this._guardSpeed = +(data.meta['guard_speed'] || 0);
      this._invincibleTime = +(data.meta['invincible_time'] || 30);
      this._shotWay = +(data.meta['shot_way'] || 0);
      this._shotSpace = +(data.meta['shot_space'] || 0.2);
      this._shotSpeed = +(data.meta['shot_speed'] || 0.1);
      this._shotCountTime = +(data.meta['shot_count'] || 30);
      this._shotDelayTime = +(data.meta['shot_delay'] || 10);
      var traitObjects = actor.equips().concat(actor.states());
      for (var i = 0; i < traitObjects.length; i++) {
        var obj = traitObjects[i];
        if (obj) {
          if (obj.meta['move_speed']) this._moveSpeed += +obj.meta['move_speed'];
          if (obj.meta['jump_speed']) this._jumpSpeed += +obj.meta['jump_speed'];
          if (obj.meta['swim_speed']) this._swimSpeed += +obj.meta['swim_speed'];
          if (obj.meta['ladder_speed']) this._ladderSpeed += +obj.meta['ladder_speed'];
          if (obj.meta['accele']) this._accele += +obj.meta['accele'];
          if (obj.meta['ladder_accele']) this._ladderAccele += +obj.meta['ladder_accele'];
          if (obj.meta['jump_input']) this._jumpInputTime += +obj.meta['jump_input'];
          if (obj.meta['swim_jump']) this._swimJump += +obj.meta['swim_jump'];
          if (obj.meta['mulch_jump']) this._mulchJump += +obj.meta['mulch_jump'];
          if (obj.meta['weight']) this._weight += +obj.meta['weight'];
          if (obj.meta['carry_power']) this._carryPower += +obj.meta['carry_power'];
          if (obj.meta['gravity']) this._gravity += +obj.meta['gravity'];
          if (obj.meta['dash_speed_x']) this._dashSpeedX += +obj.meta['dash_speed_x'];
          if (obj.meta['dash_speed_y']) this._dashSpeedY += +obj.meta['dash_speed_y'];
          if (obj.meta['dash_count']) this._dashCountTime += +obj.meta['dash_count'];
          if (obj.meta['dash_delay']) this._dashDelayTime += +obj.meta['dash_delay'];
          if (obj.meta['dash_mp_cost']) this._dashMpCost += +obj.meta['dash_mp_cost'];
          if (obj.meta['w']) this._collideW += +obj.meta['w'];
          if (obj.meta['h']) this._collideH += +obj.meta['h'];
          if (obj.meta['fall_guard']) this._fallGuard += +obj.meta['fall_guard'];
          if (obj.meta['guard_speed']) this._guardSpeed += +obj.meta['guard_speed'];
          if (obj.meta['invincible_time']) this._invincibleTime += +obj.meta['invincible_time'];
          if (obj.meta['shot_way']) this._shotWay += +obj.meta['shot_way'];
          if (obj.meta['shot_space']) this._shotSpace += +obj.meta['shot_space'];
          if (obj.meta['shot_speed']) this._shotSpeed += +obj.meta['shot_speed'];
          if (obj.meta['shot_count']) this._shotCountTime += +obj.meta['shot_count'];
          if (obj.meta['shot_delay']) this._shotDelayTime += +obj.meta['shot_delay'];
        }
      }
      //this._wallJump = actor.loadTagBool('wall_jump');
      this._shotType = +actor.loadTagString('shot_type', 1);
      this._shotIndex = +actor.loadTagString('shot_index', 0);
      this._shotSkillId = +actor.loadTagString('shot_skill', 0);
      this._shotSeName = actor.loadTagString('shot_se_name', '');
      this._shotSeVolume = +actor.loadTagString('shot_se_volume', 90);
      this._shotSePitch = +actor.loadTagString('shot_se_pitch', 100);
    } else {
      var characterName   = '';
      var characterIndex  = 0;
    }
    this.setImage(characterName, characterIndex);
    this._followers.refresh();
    this._needsRefresh = false;
  };

  // 飛行船の乗り降り
  Game_Player.prototype.getOnOffVehicle = function() {
    return false;
  };

  // まっすぐに移動
  Game_Player.prototype.moveStraight = function(d) {
    Game_Character.prototype.moveStraight.call(this, d);
  };

  // バトラーが戦闘不能になったときの処理
  Game_Player.prototype.battlerDead = function() {
    this._lockCount = 32;
    this.battler().requestEffect('collapse');
    SoundManager.playActorCollapse();
    if ($gameParty.isAllDead()) {
      $gameTemp.reserveCommonEvent(actAllDeadEvent);
    }
  };

  //-----------------------------------------------------------------------------
  // Game_Event (Enemies)
  //

  // 初期化
  Game_Event.prototype.initialize = function(mapId, eventId) {
    Game_Character.prototype.initialize.call(this);
    this._mapId = mapId;
    this._eventId = eventId;
    this._repopCount = 0;
    this.locate(this.event().x + 0.5, this.event().y + 1);
    this.refresh();
  };

  // メンバ変数の初期化
  var _Game_Event_initMembers = Game_Event.prototype.initMembers;
  Game_Event.prototype.initMembers = function() {
    _Game_Event_initMembers.call(this);
    this._enemyId = 0;
    this._battler = null;
    this._deadSelfSwitch = null;
    this._commentParams = {};
  };

  // バトラーの取得
  Game_Event.prototype.battler = function() {
    return this._battler;
  };

  // 衝突したイベントの起動
  Game_Event.prototype.checkEventTriggerCollide = function(id) {
    if (!$gameMap.isEventRunning() && id < 0) {
//      if (this.isTriggerIn([1, 2]) && this.isNormalPriority() === normal) {
      if (this.isTriggerIn([1, 2])) this.start();
    }
  };

  // リフレッシュ
  var _Game_Event_refresh = Game_Event.prototype.refresh;
  Game_Event.prototype.refresh = function() {
    _Game_Event_refresh.call(this);
    this._needsRefresh = false;
  };

  // イベントページのセットアップ
  var _Game_Event_setupPage = Game_Event.prototype.setupPage;
  Game_Event.prototype.setupPage = function() {
    _Game_Event_setupPage.call(this);
    if (this._pageIndex >= 0) {
      this._enemyId        = +this.loadTagParam('enemy') || 0;
      this._collideW       = +this.loadTagParam('w') || 0.375;
      this._collideH       = +this.loadTagParam('h') || 0.75;
      this._weight         = +this.loadTagParam('weight') || 0;
      this._deadSelfSwitch = this.loadTagParam('dead');
      this._repopTimer     = +this.loadTagParam('repop') || 0;
      if (this._repopTimer > 0) {
        this._repopCount = this._repopTimer;
      }
      var param = this.loadTagParam('gravity');
      this._gravity        = param ? +param : actGravity;
      this._lift           = this.loadTagParam('lift') || false;
      this.setupBattler();
    }
  };

  // バトラーのセットアップ
  Game_Event.prototype.setupBattler = function() {
    if (this._enemyId > 0) {
      this._battler = new Game_Enemy(this._enemyId, this.eventId(), 0);
    } else {
      this._battler = null;
    }
  };

  // フレーム更新
  var _Game_Event_update = Game_Event.prototype.update;
  Game_Event.prototype.update = function() {
    if (this._carried) {
      this._realX = $gamePlayer._realX;
      this._realY = $gamePlayer._realY - $gamePlayer._collideH - 0.001;
      this._x = Math.floor(this._realX);
      this._y = Math.floor(this._realY);
    } else {
      if (this.isLocking()) {
        this.updateLock();
      } else {
        _Game_Event_update.call(this);
        if (this._repopCount > 0) this.updateRepop();
      }
      if (this.isBattler()) this.updateDamage();
    }
  };

  // 摩擦の処理
  Game_Event.prototype.updateFriction = function() {
    Game_Character.prototype.updateFriction.call(this);
    if (!this.isMoving() && this._vx != 0) {
      if (!this.isDashing()) {
        var n = this.isSwimming() ? this._swimSpeed : this._moveSpeed;
        if (this._vx < -n) {
          this._vx = Math.min(this._vx + 0.005, -n);
        }
        if (this._vx > n) {
          this._vx = Math.max(this._vx - 0.005, n);
        }
      }
      if (this.isLanding()) {
        var n = actFriction;
        switch (this._landingRegion) {
        case actSlipFloorRegion:
          return;
        case actRoughFloorRegion:
          if (Math.abs(this._vx) > this._moveSpeed / 2) {
            this._vx = this._vx > 0 ? this._moveSpeed / 2 : -this._moveSpeed / 2;
          }
          break;
        case actMarshFloorRegion:
          this._vx = 0;
          return;
        }
        if (this._vx > 0) {
          this._vx = Math.max(this._vx - n, 0);
        } else {
          this._vx = Math.min(this._vx + n, 0);
        }
      }
    }
  };

  // リポップカウントの処理
  Game_Event.prototype.updateRepop = function() {
    this._repopCount--;
    if (this._repopCount === 0) {
      var key = [$gameMap.mapId(), this._eventId, this._deadSelfSwitch];
      if ($gameSelfSwitches.value(key)) {
        $gameSelfSwitches.setValue(key, false);
        this.refresh();
        this.requestAppear();
      }
    }
  };

  // 出現エフェクトのリクエスト
  Game_Event.prototype.requestAppear = function() {
    if (this.isBattler()) {
      if (actEventCollapse) this.battler().requestEffect('appear');
    }
  };

  // バトラーが戦闘不能になったときの処理
  Game_Event.prototype.battlerDead = function() {
    if (actEventCollapse) {
      this._lockCount = 32;
      this.battler().requestEffect('collapse');
      SoundManager.playEnemyCollapse();
    } else {
      this._lockCount = 1;
    }
  };

  // ロック状態の処理
  Game_Event.prototype.updateLock = function() {
    this._lockCount--;
    if (this._lockCount == 0) {
      if (this.battler().isDead()) {
        this.gainRewards();
        if (this._deadSelfSwitch !== null) {
          var key = [$gameMap.mapId(), this._eventId, this._deadSelfSwitch];
          $gameSelfSwitches.setValue(key, true);
          this.refresh();
          this.requestAppear();
        } else {
          this.erase();
        }
      }
    }
  };

  // 撃破報酬の獲得
  Game_Event.prototype.gainRewards = function() {
    var exp = this.battler().exp();
    if (exp > 0) this.gainRewardExp(exp);
    var gold = this.battler().gold();
    if (gold > 0) this.gainRewardGold(gold);
    var items = this.battler().makeDropItems();
    for (var i = 0; i < items.length; i++) {
      this.gainRewardItem(items[i], -16 - (items.length - i) * 24);
    }
  };

  // 撃破報酬（経験値）の獲得
  Game_Event.prototype.gainRewardExp = function(exp) {
    $gameParty.allMembers().forEach(function(actor) {
      actor.gainExp(exp);
    });
    this.setMapPopup('' + exp + TextManager.exp, '#ffe0ff', -40, -0.2, 0);
  };

  // 撃破報酬（お金）の獲得
  Game_Event.prototype.gainRewardGold = function(gold) {
    $gameParty.gainGold(gold);
    this.setMapPopup('' + gold + TextManager.currencyUnit, '#ffffe0', -64, -0.2, 0);
  };

  // 撃破報酬（アイテム）の獲得
  Game_Event.prototype.gainRewardItem = function(item, y) {
    $gameParty.gainItem(item, 1);
    this.setMapPopup('\\I[' + item.iconIndex + ']', '#000000', y, -4, 0.5);
  };

  // 泳ぎ状態の更新
  Game_Event.prototype.updateSwiming = function() {
    Game_Character.prototype.updateSwiming.call(this);
    if (actUseEventSeSwim) {
      var origin_volume = actSeSwim.volume;
      var volume = Math.floor(origin_volume * ((15 - this.distFromCharacter($gamePlayer))) / 15);
      var se = {};
      se.name = actSeSwim.name;
      se.volume = Math.min(Math.max(volume, 0), 100);
      se.pitch = actSeSwim.pitch;
      if (this._realX < $gamePlayer._realX) {
        se.pan = Math.max(Math.floor((this._realX - $gamePlayer._realX) * 10, -100));
      } else {
        se.pan = Math.min(Math.floor((this._realX - $gamePlayer._realX) * 10, 100));
      }
      AudioManager.playSe(se);
    }
  };

  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //
  var _Game_Interpreter_initialize = Game_Interpreter.prototype.initialize;
  Game_Interpreter.prototype.initialize = function(mapId, eventId) {
    _Game_Interpreter_initialize.call(this);
    this.mushroomSet = {};
  };
  
  Game_Interpreter.prototype.RegisterBossBaddie = function(eventId) {
  	if (this.BossEventID != eventId) {
  		this.BossEventID = eventId;
  	}	
  };
  
  //modified to set up a bounding box around the boss enemy, so if the player collides
  //with any part of the enemy they get killed
  _Game_Interpreter_update = Game_Interpreter.prototype.update;
  Game_Interpreter.prototype.update = function() {
    _Game_Interpreter_update.call(this);
    
    //if the boss event ID has been set, and the player isn't currently dying, then 
    //check if the player is within a certain area around the boss event
    if (this.BossEventID > 0 && $gameVariables.value(deathCaseControlVariable) == 0) {
    	
      //grab boss event
      var eve = $gameMap.event(this.BossEventID);
      //check in a bounding box around the event (currently set to the big owl)
      for (var x = eve.x - 2; x <= eve.x + 2; x++) {
        for (var y = eve.y - 10; y <= eve.y + 1; y++) {
        	
          //check if it is colliding, if so, set deathCaseControlVariable to 1
          if (eve.isCollidedWithPlayerCharacters(x, y)) {
            //this kills the player
            var PLAYER = $gameActors.actor(1)
            var HP = -1;
            var KO = true;
            Game_Interpreter.prototype.changeHp(PLAYER, HP, KO);
            $gameVariables.setValue(deathCaseControlVariable, 1);
          }
  		}
  	  }	
  	}
  }

  // イベントの位置変更
  Game_Interpreter.prototype.command203 = function() {
    var character = this.character(this._params[0]);
    if (character) {
      if (this._params[1] === 0) {  // Direct designation
        character.locate(this._params[2] + 0.5, this._params[3] + 1);
      } else if (this._params[1] === 1) {  // Designation with variables
        var x = $gameVariables.value(this._params[2] + 0.5);
        var y = $gameVariables.value(this._params[3] + 1);
        character.locate(x, y);
      } else {  // Exchange with another event
        var character2 = this.character(this._params[2]);
        if (character2) character.swap(character2);
      }
      if (this._params[4] > 0) character.setDirection(this._params[4]);
    }
    return true;
  };

  // 装備の変更
  var _Game_Interpreter_command319 = Game_Interpreter.prototype.command319;
  Game_Interpreter.prototype.command319 = function() {
    _Game_Interpreter_command319.call(this);
    if (!$gameParty.inBattle()) $gamePlayer.requestRefresh();
    return true;
  };
  
  /*
  adds a mushroom to the set after checking that it hasn't already been collected and 
  plays the collection sound.
  It adds the mushroom by identifying it with a key built by the following:
  	"locationID,x,y", 
  	
  	so by example: Map012, x=1, y=2
  	trackMushroom(12, 1, 2); 
  	
  	will use the key
  	"12,1,2"
  
  parameters:
  	locationID: ID of Current Map
  	x: x position of the mushroom
  	y: y position of the mushroom
  */
  Game_Interpreter.prototype.trackMushroom = function(locationID, x, y) {
  	console.log("trackMushroom called with locationID=", locationID, " x=", x, " and y=", y);
  	const loc = locationID.toString();
    const key = loc.concat(",", x, ",", y);
  	if (key in this.mushroomSet) return;
  	console.log("adding key:", key);
  	this.mushroomSet[key] = true;
  	console.log(this.mushroomSet);
  	
  	//play sound
  	mushroomCollectionSound = {
  		volume:50,
  		pitch:100,
  		pan:0,
  		name:"MushroomCollect"
  	}
  	
  	console.log("ding!");
  	AudioManager.playSe(mushroomCollectionSound);
  };
  
  // プラグインコマンド
  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === "trackMushroom") {
    	this.trackMushroom(args[0], args[1], args[2]);
    	
    } else if (command === 'actGainHp') {
      var character = this.character(args[0]);
      if (character && character.isBattler()) {
        character.battler().clearResult();
        character.battler().gainHp(+args[1]);
      }
    } else if (command === 'actHp') {
      var character = this.character(args[0]);
      if (character && character.isBattler()) {
        $gameVariables.setValue(+args[1], character.battler().hp);
      }
    } else if (command === 'actForceX') {
      var character = this.character(args[0]);
      if (character) character._vx = +args[1];
    } else if (command === 'actForceY') {
      var character = this.character(args[0]);
      if (character) character._vy = +args[1];
    } else if (command === 'actForceStop') {
      var character = this.character(args[0]);
      if (character) {
        character._vx = 0;
        character._vy = 0;
      }
    } else if (command === 'actChangeActor') {
      var actor = $gameActors.actor(+args[0]);
      if (actor && actor.isAlive() && $gameParty.members().contains(actor)) {
        var currentActorId = $gamePlayer.actor().actorId();
        $gameParty.sortActor(+args[0]);
        if (currentActorId !== $gamePlayer.actor().actorId()) {
          $gamePlayer.refresh();
          $gamePlayer.battler().requestEffect('appear');
        }
      }
    } else if (command === 'actPopup') {
      var character = this.character(args[0]);
      if (character) character.setMapPopup(args[1], args[2]);

    } else if (command === 'nwayShotWithEventID') {
      var character = $gameMap.event(args[9]);
      if (character && character.isBattler()) {
        if (!args[8]) args[8] = character.battler().attackSkillId();
        character.nwayShot(+args[1], +args[2], +args[3], +args[4],
                           +args[5], +args[6], +args[7], +args[8]);
      }
    } else if (command === 'nwayShot') {
      var character = this.character(args[0]);
      if (character && character.isBattler()) {
        if (!args[8]) args[8] = character.battler().attackSkillId();
        character.nwayShot(+args[1], +args[2], +args[3], +args[4],
                           +args[5], +args[6], +args[7], +args[8]);
      }
    } else if (command === 'nwayAim') {
      var character = this.character(args[0]);
      if (character && character.isBattler()) {
        if (!args[8]) args[8] = character.battler().attackSkillId();
        character.nwayAim(+args[1], +args[2], +args[3], +args[4],
                          +args[5], +args[6], +args[7], +args[8]);
      }
    } else if (command === 'nallShot') {
      var character = this.character(args[0]);
      if (character && character.isBattler()) {
        if (!args[7]) args[7] = character.battler().attackSkillId();
        character.nallShot(+args[1], +args[2], +args[3], +args[4],
                           +args[5], +args[6], +args[7]);
      }
    } else if (command === 'nallAim') {
      var character = this.character(args[0]);
      if (character && character.isBattler()) {
        if (!args[7]) args[7] = character.battler().attackSkillId();
        character.nallAim(+args[1], +args[2], +args[3], +args[4],
                          +args[5], +args[6], +args[7]);
      }
    } else if (command === 'actShowHpGauge') {
      $gameSystem.setActHpGaugeVisible(true);
    } else if (command === 'actHideHpGauge') {
      $gameSystem.setActHpGaugeVisible(false);
    }
  };

  //-----------------------------------------------------------------------------
  // Sprite_Bullet
  //

  function Sprite_Bullet() {
    this.initialize.apply(this, arguments);
  }

  Sprite_Bullet.prototype = Object.create(Sprite.prototype);
  Sprite_Bullet.prototype.constructor = Sprite_Bullet;

  // 初期化
  Sprite_Bullet.prototype.initialize = function(bullet) {
    Sprite.prototype.initialize.call(this);
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this._bullet = bullet;
    this._characterName = '';
    this._characterIndex = 0;
  };

  // フレーム更新
  Sprite_Bullet.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.opacity = this._bullet._opacity;
    if (this.opacity > 0) {
      this.updateBitmap();
      this.x = this._bullet.screenX();
      this.y = this._bullet.screenY();
      this.z = this._bullet._z;
      this.rotation = this._bullet.angle();
    }
  };

  // 転送元ビットマップの更新
  Sprite_Bullet.prototype.updateBitmap = function() {
    if (this.isImageChanged()) {
      this._characterName = this._bullet._characterName;
      this._characterIndex = this._bullet._characterIndex;
      this.setCharacterBitmap();
    }
  };

  // グラフィックの変更判定
  Sprite_Bullet.prototype.isImageChanged = function() {
    return this._characterName !== this._bullet.characterName ||
           this._characterIndex !== this._bullet.characterIndex;
  };

  // ビットマップの設定
  Sprite_Bullet.prototype.setCharacterBitmap = function() {
    this.bitmap = ImageManager.loadSystem(this._characterName);
    var pw = Math.floor(this.bitmap.width / 8);
    var sx = this._characterIndex * pw;
    this.setFrame(sx, 0, pw, this.bitmap.height);
    this.blendMode = this._characterName.charAt(0) === '!' ? 1 : 0;
  };

  //-----------------------------------------------------------------------------
  // Sprite_Shield
  //

  function Sprite_Shield() {
    this.initialize.apply(this, arguments);
  }

  Sprite_Shield.prototype = Object.create(Sprite.prototype);
  Sprite_Shield.prototype.constructor = Sprite_Shield;

  // 初期化
  Sprite_Shield.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this.anchor.x = 0.5;
    this.anchor.y = 1.0;
    this.bitmap = ImageManager.loadSystem('TMJumpActionShield');
  };

  //-----------------------------------------------------------------------------
  // Sprite_Character
  //

  // メンバ変数の初期化
  var _Sprite_Character_initMembers = Sprite_Character.prototype.initMembers;
  Sprite_Character.prototype.initMembers = function() {
    _Sprite_Character_initMembers.call(this);
    this._damages = [];
    this._popups = [];
    this._effectType = null;
    this._effectDuration = 0;
    this._shake = 0;
    this.createWeaponSprite();
  };

  // 武器スプライトの作成
  Sprite_Character.prototype.createWeaponSprite = function() {
    this._weaponSprite = new Sprite_Weapon();
    this.addChild(this._weaponSprite);
  };

  // 武器アニメーションのセットアップ
  Sprite_Character.prototype.setupWeaponAnimation = function() {
    if (this._character.battler().isWeaponAnimationRequested()) {
      this._weaponSprite.setup(this._character.battler().weaponImageId());
      this._character.battler().clearWeaponAnimation();
    }
  };

  // フレーム更新
  var _Sprite_Character_update = Sprite_Character.prototype.update;
  Sprite_Character.prototype.update = function() {
    _Sprite_Character_update.call(this);
    this.updateDamagePopup();
    this.updateMapPopup();
    if (this._character.isBattler()) {
      this.updateEffect();
      this.updateMotion();
      this.updateShield();
      if (actHpGauge) this.updateHpGauge();
    }
  };

  // その他の更新
  var _Sprite_Character_updateOther = Sprite_Character.prototype.updateOther;
  Sprite_Character.prototype.updateOther = function() {
    if (!this.isEffecting()) _Sprite_Character_updateOther.call(this);
  };

  // ダメージポップアップの更新
  Sprite_Character.prototype.updateDamagePopup = function() {
    if (this._character.isBattler()) this.setupDamagePopup();
    if (this._damages.length > 0) {
      for (var i = 0; i < this._damages.length; i++) {
        this._damages[i].update();
        this._damages[i].x = this.x;
        this._damages[i].y = this.y;
      }
      if (!this._damages[0].isPlaying()) {
        this.parent.removeChild(this._damages[0]);
        this._damages.shift();
      }
    }
  };

  // ダメージポップアップのセット
  Sprite_Character.prototype.setupDamagePopup = function() {
    var battler = this._character.battler();
    if (battler.isDamagePopupRequested()) {
      var sprite = new Sprite_MapDamage();
      sprite.x = this.x;
      sprite.y = this.y;
      sprite.z = this.z + 1;
      sprite.setup(battler);
      this._damages.push(sprite);
      this.parent.addChild(sprite);
      battler.clearDamagePopup();
      battler.clearActionResult();
    }
  };

  // マップ用ポップアップの更新
  Sprite_Character.prototype.updateMapPopup = function() {
    this.setupMapPopup();
    if (this._popups.length > 0) {
      for (var i = this._popups.length - 1; i >= 0; i--) {
        this._popups[i].update();
        this._popups[i].x = this.x;
        this._popups[i].y = this.y;
        if (!this._popups[i].isPlaying()) {
          this.parent.removeChild(this._popups[i]);
          this._popups.splice(i, 1);
        }
      }
    }
  };

  // マップ用ポップアップのセット
  Sprite_Character.prototype.setupMapPopup = function() {
    while (this._character.isMapPopupExist()) {
      var sprite = new Sprite_MapPopup();
      sprite.x = this.x;
      sprite.y = this.y;
      var popup = this._character.getMapPopup();
      var re = /\\I\[(\d+)\]/i;
      var match = re.exec(popup.text);
      if (match) {
        sprite.z = this.z + 1;
        sprite.setup(popup, Number(match[1]));
      } else {
        sprite.z = this.z + 2;
        sprite.setup(popup, -1);
      }
      this._popups.push(sprite);
      this.parent.addChild(sprite);
    }
  };

  // エフェクトのセット
  Sprite_Character.prototype.setupEffect = function() {
    if (this._character.battler().isEffectRequested()) {
      this.startEffect(this._character.battler().effectType());
      this._character.battler().clearEffect();
    }
  };

  // エフェクトの開始
  Sprite_Character.prototype.startEffect = function(effectType) {
    this._effectType = effectType;
    switch (this._effectType) {
    case 'appear':
      this.startAppear();
      break;
    case 'whiten':
      this.startWhiten();
      break;
    case 'blink':
      this.startBlink();
      break;
    case 'collapse':
      this.startCollapse();
      break;
    case 'bossCollapse':
      this.startBossCollapse();
      break;
    }
    this.revertToNormal();
  };

  // 出現エフェクトの開始
  Sprite_Character.prototype.startAppear = function() {
    this._effectDuration = 16;
  };

  // 白フラッシュエフェクトの開始
  Sprite_Character.prototype.startWhiten = function() {
    this._effectDuration = 16;
  };

  // 点滅エフェクトの開始
  Sprite_Character.prototype.startBlink = function() {
    this._effectDuration = this._character._invincibleTime;
  };

  // 崩壊エフェクトの開始
  Sprite_Character.prototype.startCollapse = function() {
    this._effectDuration = 32;
    this._appeared = false;
  };

  // ボス崩壊エフェクトの開始
  Sprite_Character.prototype.startBossCollapse = function() {
    this._effectDuration = this.bitmap.height;
    this._appeared = false;
  };

  // エフェクトの更新
  Sprite_Character.prototype.updateEffect = function() {
    this.setupEffect();
    if (this._effectDuration > 0) {
      this._effectDuration--;
      switch (this._effectType) {
      case 'appear':
        this.updateAppear();
        break;
      case 'whiten':
        this.updateWhiten();
        break;
      case 'blink':
        this.updateBlink();
        break;
      case 'collapse':
        this.updateCollapse();
        break;
      case 'bossCollapse':
        this.updateBossCollapse();
        break;
      }
      if (this._effectDuration === 0) {
        this._effectType = null;
        this.setBlendColor([0, 0, 0, 0]);
      }
    }
  };

  // エフェクトが実行中かどうか
  Sprite_Character.prototype.isEffecting = function() {
    return this._effectType !== null;
  };

  // スプライトのエフェクト設定を元に戻す
  Sprite_Character.prototype.revertToNormal = function() {
    this._shake = 0;
    this.blendMode = 0;
    this.opacity = 255;
    this.setBlendColor([0, 0, 0, 0]);
  };

  // 出現エフェクトの更新
  Sprite_Character.prototype.updateAppear = function() {
    this.opacity = (16 - this._effectDuration) * 16;
  };

  // 白フラッシュエフェクトの更新
  Sprite_Character.prototype.updateWhiten = function() {
    var alpha = 128 - (16 - this._effectDuration) * 10;
    this.setBlendColor([255, 255, 255, alpha]);
  };

  // 点滅エフェクトの更新
  Sprite_Character.prototype.updateBlink = function() {
    this.opacity = (this._effectDuration % 10 < 5) ? 255 : 0;
  };

  // 崩壊エフェクトの更新
  Sprite_Character.prototype.updateCollapse = function() {
    this.blendMode = Graphics.BLEND_ADD;
    this.setBlendColor([255, 128, 128, 128]);
    this.opacity *= this._effectDuration / (this._effectDuration + 1);
  };

  // ボス崩壊エフェクトの更新
  Sprite_Character.prototype.updateBossCollapse = function() {
    this._shake = this._effectDuration % 2 * 4 - 2;
    this.blendMode = Graphics.BLEND_ADD;
    this.opacity *= this._effectDuration / (this._effectDuration + 1);
    this.setBlendColor([255, 255, 255, 255 - this.opacity]);
    if (this._effectDuration % 20 === 19) {
      SoundManager.playBossCollapse2();
    }
  };

  // モーションの更新
  Sprite_Character.prototype.updateMotion = function() {
    this.setupWeaponAnimation();
    if (this._weaponSprite.isPlaying()) {
      if (this._character._direction == 4) {
        this._weaponSprite.scale.x = 1;
        this._weaponSprite.x = -16;
      } else {
        this._weaponSprite.scale.x = -1;
        this._weaponSprite.x = 16;
      }
    }
  };

  // HPゲージの更新
  Sprite_Character.prototype.updateHpGauge = function() {
    if (!this._hpGaugeSprite) {
      this._hpGaugeSprite = new Sprite_HpGauge(this._character);
      this._hpGaugeSprite.y = -2;
      this.addChild(this._hpGaugeSprite);
    }
  };

  // シールドの更新
  Sprite_Character.prototype.updateShield = function() {
    var battler = this._character.battler();
    if (this._shieldSprite) {
      this._shieldSprite.visible = battler.isStateAffected(actGuardStateId);
    } else {
      if (battler.isStateAffected(actGuardStateId)) {
        this._shieldSprite = new Sprite_Shield();
        this.addChild(this._shieldSprite);
      }
    }
  };

  // HPゲージとシールドのbushDepth対応
  var _Sprite_Character_createHalfBodySprites = Sprite_Character.prototype.createHalfBodySprites;
  Sprite_Character.prototype.createHalfBodySprites = function() {
    var flag = !this._upperBody;
    _Sprite_Character_createHalfBodySprites.call(this);
    if (flag) {
      if (this._hpGaugeSprite) this.addChild(this.removeChild(this._hpGaugeSprite));
      if (this._shieldSprite) this.addChild(this.removeChild(this._shieldSprite));
    }
  };

  //-----------------------------------------------------------------------------
  // Sprite_MapDamage
  //

  function Sprite_MapDamage() {
    this.initialize.apply(this, arguments);
  }

  Sprite_MapDamage.prototype = Object.create(Sprite_Damage.prototype);
  Sprite_MapDamage.prototype.constructor = Sprite_MapDamage;

  // セットアップ
  Sprite_MapDamage.prototype.setup = function(target) {
    var result = target._actionResult;
    if (result.missed || result.evaded) {
      this.createMiss();
    } else if (result.hpAffected) {
      this.createDigits(0, result.hpDamage);
    } else if (target.isAlive() && result.mpDamage !== 0) {
      this.createDigits(2, result.mpDamage);
    }
    if (result.critical) {
      this.setupCriticalEffect();
    }
  };

  //-----------------------------------------------------------------------------
  // Sprite_MapPopup
  //

  function Sprite_MapPopup() {
    this.initialize.apply(this, arguments);
  }

  Sprite_MapPopup.prototype = Object.create(Sprite.prototype);
  Sprite_MapPopup.prototype.constructor = Sprite_MapPopup;

  Sprite_MapPopup.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
    this._duration = 150;
  };

  Sprite_MapPopup.prototype.setup = function(popup, iconIndex) {
    var sprite = new Sprite();
    if (iconIndex >= 0) {
      sprite.bitmap = ImageManager.loadSystem('IconSet');
      var pw = Window_Base._iconWidth;
      var ph = Window_Base._iconHeight;
      var sx = iconIndex % 16 * pw;
      var sy = Math.floor(iconIndex / 16) * ph;
      sprite.setFrame(sx, sy, pw, ph);
    } else {
      sprite.bitmap = new Bitmap(160, 32);
      sprite.bitmap.outlineColor = 'black';
      sprite.bitmap.outlineWidth = 5;
      sprite.bitmap.fontSize = 28;
      sprite.bitmap.textColor = popup.color;
      sprite.bitmap.drawText(popup.text, 0, 0, 160, 32, 'center');
    }
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 1;
    sprite.y = popup.ry;
    sprite.ry = sprite.y;
    sprite.by = sprite.y + 40;
    sprite.dy = popup.dy;
    sprite.g = popup.g;
    this.addChild(sprite);
  };

  Sprite_MapPopup.prototype.update = function() {
    Sprite.prototype.update.call(this);
    if (this._duration > 0) {
      this._duration--;
      for (var i = 0; i < this.children.length; i++) {
        var sprite = this.children[i];
        sprite.dy += sprite.g;
        sprite.ry += sprite.dy;
        if (sprite.ry >= sprite.by) {
          sprite.ry = sprite.by;
          sprite.dy *= -0.6;
        }
        sprite.y = Math.round(sprite.ry);
      }
    }
    this.updateOpacity();
  };

  Sprite_MapPopup.prototype.updateOpacity = function() {
    if (this._duration < 10) {
      this.opacity = 255 * this._duration / 10;
    }
  };

  Sprite_MapPopup.prototype.isPlaying = function() {
    return this._duration > 0;
  };

  //-----------------------------------------------------------------------------
  // Sprite_HpGauge
  //

  function Sprite_HpGauge() {
    this.initialize.apply(this, arguments);
  }

  Sprite_HpGauge.prototype = Object.create(Sprite.prototype);
  Sprite_HpGauge.prototype.constructor = Sprite_HpGauge;

  Sprite_HpGauge.prototype.initialize = function(character) {
    this._character = character;
    this._battler = this._character.battler();
    Sprite.prototype.initialize.call(this);
    this.bitmap = new Bitmap(32, 4);
    this.z = 9;
    this.anchor.x = 0.5;
    this.anchor.y = 1;
  };

  Sprite_HpGauge.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.visible = $gameSystem.isActHpGaugeVisible();
    if (this._battler !== this._character.battler()) {
      this._battler = this._character.battler();
      if (!this._battler) { // バトラーが削除された場合はゲージを消去
        this._hp = 0;
        this.refresh();
      }
    }
    if (this._battler) {
      if (this._hp !== this._battler.hp || this._mhp !== this._battler.mhp) {
        this._hp = this._battler.hp;
        this._mhp = this._battler.mhp;
        this.refresh();
      }
    }
  };

  Sprite_HpGauge.prototype.refresh = function() {
    this.bitmap.clear();
    if (this._hp === 0) return;
    this.bitmap.fillRect(0, 0, 32, 4, '#000000');
    var w = Math.floor(this._hp / this._mhp * 30);
    this.bitmap.fillRect(1, 1, w, 2, this._hp === this._mhp ? '#fff060' : '#ffa030');
  };

  //-----------------------------------------------------------------------------
  // Spriteset_Map
  //

  var _Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
  Spriteset_Map.prototype.createLowerLayer = function() {
    _Spriteset_Map_createLowerLayer.call(this);
    this.createBullets();
  };

  // 弾スプライトの作成
  Spriteset_Map.prototype.createBullets = function() {
    this._bulletSprites = [];
    $gameMap.enemyBullets().forEach(function(bullet) {
      this._bulletSprites.push(new Sprite_Bullet(bullet));
      this._baseSprite.addChild(this._bulletSprites[this._bulletSprites.length - 1]);
    }, this);
  };

  // 飛行船の影の作成
  Spriteset_Map.prototype.createShadow = function() {
  };

  // 飛行船の影の更新
  Spriteset_Map.prototype.updateShadow = function() {
  };

  //-----------------------------------------------------------------------------
  // Window_Selectable
  //

  var _Window_Selectable_isOkTriggered = Window_Selectable.prototype.isOkTriggered;
  Window_Selectable.prototype.isOkTriggered = function() {
    return _Window_Selectable_isOkTriggered.call(this) ||
           (actAttackToOk && Input.isRepeated('attack'));
  };

  var _Window_Selectable_isCancelTriggered = Window_Selectable.prototype.isCancelTriggered;
  Window_Selectable.prototype.isCancelTriggered = function() {
    return _Window_Selectable_isCancelTriggered.call(this) ||
           (actJumpToCancel && Input.isRepeated('jump'));
  };

  //-----------------------------------------------------------------------------
  // Window_Option
  //

  var _Window_Option_makeCommandList = Window_Options.prototype.makeCommandList;
  Window_Options.prototype.makeCommandList = function() {
    _Window_Option_makeCommandList.call(this);
    if (padConfigCommand) this.addCommand(padConfigCommand, 'padConfig');
    // 常にダッシュは不要なので削除してしまう。
    for (var i = 0; i < this._list.length; i++) {
      if (this._list[i].symbol === 'alwaysDash') {
        this._list.splice(i, 1);
        break;
      }
    }
  };

  var _Window_Options_statusText = Window_Options.prototype.statusText;
  Window_Options.prototype.statusText = function(index) {
    var symbol = this.commandSymbol(index);
    if (symbol === 'padConfig') return '';
    return _Window_Options_statusText.call(this, index);
  };

  Window_Options.prototype.isPadSymbol = function(symbol) {
    return symbol.contains('padButton');
  };

  var _Window_Options_processOk = Window_Options.prototype.processOk;
  Window_Options.prototype.processOk = function() {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    if (symbol === 'padConfig') {
      this.playOkSound();
      this.updateInputData();
      this.deactivate();
      this.callHandler('padConfig');
    } else {
      _Window_Options_processOk.call(this);
    }
  };

  var _Window_Options_cursorRight = Window_Options.prototype.cursorRight;
  Window_Options.prototype.cursorRight = function(wrap) {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    if (symbol !== 'padConfig') {
      _Window_Options_cursorRight.call(this, wrap);
    }
  };

  var _Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
  Window_Options.prototype.cursorLeft = function(wrap) {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    if (symbol !== 'padConfig') {
      _Window_Options_cursorLeft.call(this, wrap);
    }
  };

  //-----------------------------------------------------------------------------
  // Window_PadOptions
  //

  function Window_PadOptions() {
    this.initialize.apply(this, arguments);
  }

  Window_PadOptions.prototype = Object.create(Window_Options.prototype);
  Window_PadOptions.prototype.constructor = Window_PadOptions;

  Window_PadOptions.prototype.initialize = function() {
    Window_Options.prototype.initialize.call(this, 0, 0);
    this.hide();
    this.deactivate();
  };

  Window_PadOptions.prototype.makeCommandList = function() {
    for (var i = 1; i <= 12; i++) {
      this.addCommand('Button ' + i, 'padButton' + i);
    }
  };

  Window_PadOptions.prototype.statusWidth = function() {
    return 120;
  };

  Window_PadOptions.prototype.statusText = function(index) {
    var value = this.getConfigValue(index);
    return value ? padButtonNames[padButtons.indexOf(value)] : '';
  };

  Window_PadOptions.prototype.processOk = function() {
    var index = this.index();
    var value = this.getConfigValue(index);
    value = padButtons.indexOf(value);
    value = (value + 1) % padButtons.length;
    this.changeValue(index, padButtons[value]);
  };

  Window_PadOptions.prototype.cursorRight = function(wrap) {
    var index = this.index();
    var value = this.getConfigValue(index);
    value = padButtons.indexOf(value);
    value = (value + 1).clamp(0, padButtons.length - 1);
    this.changeValue(index, padButtons[value]);
  };

  Window_PadOptions.prototype.cursorLeft = function(wrap) {
    var index = this.index();
    var value = this.getConfigValue(index);
    value = padButtons.indexOf(value);
    value = (value - 1).clamp(0, padButtons.length - 1);
    this.changeValue(index, padButtons[value]);
  };

  Window_PadOptions.prototype.changeValue = function(index, value) {
    var lastValue = this.getConfigValue(index);
    if (lastValue !== value) {
      this.setConfigValue(index, value);
      this.redrawItem(index);
      SoundManager.playCursor();
    }
  };

  Window_PadOptions.prototype.getConfigValue = function(index) {
    return ConfigManager.getPadButton(index);
  };

  Window_PadOptions.prototype.setConfigValue = function(index, value) {
    ConfigManager.setPadButton(index, value);
  };

  //-----------------------------------------------------------------------------
  // Scene_Map
  //

  var _Scene_Map_start = Scene_Map.prototype.start;
  Scene_Map.prototype.start = function() {
    _Scene_Map_start.call(this);
    $gamePlayer.refresh();
  };

  Scene_Base.prototype.checkGameover = function() {
  };

  Scene_Map.prototype.processMapTouch = function() {
  };

  //-----------------------------------------------------------------------------
  // Scene_Options
  //

  var _Scene_Options_create = Scene_Options.prototype.create;
  Scene_Options.prototype.create = function() {
    _Scene_Options_create.call(this);
    this.createPadOptionsWindow();
  };

  var _Scene_Options_createOptionsWindow = Scene_Options.prototype.createOptionsWindow;
  Scene_Options.prototype.createOptionsWindow = function() {
    _Scene_Options_createOptionsWindow.call(this);
    this._optionsWindow.setHandler('padConfig', this.onPadConfig.bind(this));
  };

  Scene_Options.prototype.createPadOptionsWindow = function() {
    this._padOptionsWindow = new Window_PadOptions();
    this._padOptionsWindow.setHandler('cancel', this.cancelPadConfig.bind(this));
    this.addWindow(this._padOptionsWindow);
  };

  Scene_Options.prototype.onPadConfig = function() {
    this._optionsWindow.hide();
    this._padOptionsWindow.show();
    this._padOptionsWindow.activate();
  };

  Scene_Options.prototype.cancelPadConfig = function() {
    this._padOptionsWindow.hide();
    this._optionsWindow.show();
    this._optionsWindow.activate();
  };

})();
