//=============================================================================
// MOG_LMBS_EnemyHP.js
//=============================================================================

/*:
 * @plugindesc (v1.0) Apresenta o HP do inimigo ao ataca-lo.
 * @author Moghunter
 *
 * @param Duration
 * @desc Tempo de apresentação do medidor.
 * @default 90
 *
 * @param Font Size
 * @desc Tamanho da fonte.
 * @default 20
 *
 * @param Layout X-Axis
 * @desc Definição X-Axis do layout.
 * @default 0
 *
 * @param Layout Y-Axis
 * @desc Definição Y-Axis do layout.
 * @default 400
 *
 * @param Meter X-Axis
 * @desc Definição X Axis do medidor.
 * @default 27
 *
 * @param Meter Y-Axis
 * @desc Definição Y Axis do medidor.
 * @default 29
 *
 * @param Name X-Axis
 * @desc Definição X Axis do nome.
 * @default 80
 *
 * @param Name Y-Axis
 * @desc Definição Y Axis do nome.
 * @default 0
 *   
 * @help  
 * =============================================================================
 * +++ MOG - LMBS Enemy HP Meter (v1.0) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 * Apresenta o HP do inimigo ao ataca-lo.
 * Serão necessários os arquivos. (img/lmbs/)
 *
 * EnemyHP_A.png
 * EnemyHP_B.png
 * 
 * Para ocultar o HP do inimigo use a seguinte Tag na caixa de notas
 *
 * Hide HP
 *
 */

　　var Imported = Imported || {};
　　Imported.MOG_LMBS_EnemyHP = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_LMBS_EnemyHP');
    Moghunter.lmbs_enemyHP_layout_x = Number(Moghunter.parameters['Layout X-Axis'] || 0);
    Moghunter.lmbs_enemyHP_layout_y= Number(Moghunter.parameters['Layout Y-Axis'] || 400);
    Moghunter.lmbs_enemyHP_meter_x = Number(Moghunter.parameters['Meter X-Axis'] || 27);
    Moghunter.lmbs_enemyHP_meter_y = Number(Moghunter.parameters['Meter Y-Axis'] || 29);
    Moghunter.lmbs_enemyHP_name_x = Number(Moghunter.parameters['Name X-Axis'] || 80);
    Moghunter.lmbs_enemyHP_name_y = Number(Moghunter.parameters['Name Y-Axis'] || 0);		
    Moghunter.lmbs_enemyHP_duration = Number(Moghunter.parameters['Duration'] || 60);
	Moghunter.lmbs_enemyHP_fontSize = Number(Moghunter.parameters['Font Size'] || 20);
	
//=============================================================================
// ** Game Temp
//=============================================================================

//==============================
// * Initialize
//==============================
var _mog_lmbs_enemyHP_gtemp_initialize = Game_Temp.prototype.initialize
Game_Temp.prototype.initialize = function() {
	_mog_lmbs_enemyHP_gtemp_initialize.call(this);
    this._lmbsEnemyHP = [false,null,0,0,0];
};

//=============================================================================
// ** Game Battler
//=============================================================================

//==============================
// * Notetags
//==============================
Game_Battler.prototype.notetags = function() {
	if (this.isEnemy()) {return this.enemy().note.split(/[\r\n]+/)};
	if (this.isActor()) {return this.actor().note.split(/[\r\n]+/)};
};

//=============================================================================
// ** Game_Enemy
//=============================================================================

//==============================
// * initMembers
//==============================
var _mog_lmbs_enemyHP_initMembers = Game_Enemy.prototype.initMembers;
Game_Enemy.prototype.initMembers = function() {
	_mog_lmbs_enemyHP_initMembers .call(this);
	this._lmbshp_meter = true;
};

//==============================
// * Setup
//==============================
var _mog_lmbs_enemyHP_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
	_mog_lmbs_enemyHP_setup.call(this,enemyId, x, y);
	for (var i = 0; i < this.notetags().length; i++) {
		if (this.notetags()[i] == "Hide HP") {this._lmbshp_meter = false};
	};		
};

//=============================================================================
// ** Spriteset Battle
//=============================================================================

//==============================
// * Lmbs Create Sprites
//==============================
var _mog_lmbs_enemyHP_lmbsCreateSprites = Spriteset_Battle.prototype.lmbsCreateSprites;
Spriteset_Battle.prototype.lmbsCreateSprites = function() {
	_mog_lmbs_enemyHP_lmbsCreateSprites.call(this);
	this.lmbsCreateEnemyHP();
};

//==============================
// * Lmbs create Enemy HP
//==============================
Spriteset_Battle.prototype.lmbsCreateEnemyHP = function() {
    this.enemyHP = new LMBSEnemyHP()
	this.addChild(this.enemyHP);
};

//=============================================================================
// ** LMBS Skill
//=============================================================================

//==============================
// * hit Effect
//==============================
var _mog_lmbs_enemyHP_hitEffect = LMBS_Skill.prototype.hitEffect;
LMBS_Skill.prototype.hitEffect = function(battler,index) {
	$gameTemp._lmbsEnemyHP[4] = battler.hp; 
	_mog_lmbs_enemyHP_hitEffect.call(this,battler,index);	
};

//==============================
// * execute After Hit
//==============================
var _mog_lmbs_enemyHP_executeAfterHit = LMBS_Skill.prototype.executeAfterHit;
LMBS_Skill.prototype.executeAfterHit = function(battler,index,damaged) {
	_mog_lmbs_enemyHP_executeAfterHit.call(this,battler,index,damaged);
	if (this.lmbsEnemyHPNeedData(battler)) {
		$gameTemp._lmbsEnemyHP[0] = true; 
		$gameTemp._lmbsEnemyHP[1] = battler.name(); 
		$gameTemp._lmbsEnemyHP[2] = battler.hp;
		$gameTemp._lmbsEnemyHP[3] = battler.mhp;
	};
};

//==============================
// * lmbs Enemy HP Need DAta
//==============================
LMBS_Skill.prototype.lmbsEnemyHPNeedData = function(battler) {
	if (this._user.isEnemy()) {return false};
	if (this._user != BattleManager._lmbsActor) {return false};	
	if (battler.isEnemy() && !battler._lmbshp_meter ) {return false};
	return true;
};

//=============================================================================
// ****** LMBS Enemy HP      **************************************************
//=============================================================================
function LMBSEnemyHP() {
    this.initialize.apply(this, arguments);
}

LMBSEnemyHP.prototype = Object.create(Sprite_Base.prototype);
LMBSEnemyHP.prototype.constructor = LMBSEnemyHP;

//==============================
// * initialize
//==============================
LMBSEnemyHP.prototype.initialize = function() {
    Sprite_Base.prototype.initialize.call(this);
	this.opacity = 0;
	this._enemyData = [null,0,0,Moghunter.lmbs_enemyHP_duration];
	this._hpOld = [0,0];
	this._layout = new Sprite(ImageManager.loadLMBS("EnemyHP_A"));
	this._layout.x = Moghunter.lmbs_enemyHP_layout_x;
	this._layout.y = Moghunter.lmbs_enemyHP_layout_y;  
	this.addChild(this._layout);
	this._hpImage = ImageManager.loadLMBS("EnemyHP_B");
	this._meter2 = new Sprite(this._hpImage);
	this._meter2.x = this._layout.x + Moghunter.lmbs_enemyHP_meter_x;
	this._meter2.y = this._layout.y + Moghunter.lmbs_enemyHP_meter_y;
	this.addChild(this._meter2);		
	this._meter = new Sprite(this._hpImage);
	this._meter.x = this._layout.x + Moghunter.lmbs_enemyHP_meter_x;
	this._meter.y = this._layout.y + Moghunter.lmbs_enemyHP_meter_y; 	
	this.addChild(this._meter);
	this._name = new Sprite(new Bitmap(100,32));
	this._name.x = this._layout.x + Moghunter.lmbs_enemyHP_name_x;
	this._name.y = this._layout.y + Moghunter.lmbs_enemyHP_name_y;
	this._name.bitmap.fontSize = Moghunter.lmbs_enemyHP_fontSize;
	this.addChild(this._name);	
	this.refreshName();
};

//==============================
// * refreshName
//==============================
LMBSEnemyHP.prototype.refreshName = function() {
    this._name.bitmap.clear();
	this._name.bitmap.drawText(this.eName(),0,0,100,32,"left");
};

//==============================
// * Ename
//==============================
LMBSEnemyHP.prototype.eName = function() {
  if (!$gameTemp._lmbsEnemyHP[1]) {return ""};
  return String($gameTemp._lmbsEnemyHP[1]);
};

//==============================
// * Duration
//==============================
LMBSEnemyHP.prototype.duration = function() {
  if (Moghunter.lmbs_enemyHP_duration < 20) {return 20};
  return Moghunter.lmbs_enemyHP_duration;
};

//==============================
// * need Refresh
//==============================
LMBSEnemyHP.prototype.needRefresh = function() {
    if ($gameTemp._lmbsEnemyHP[0]) {return true};
	return false;
};

//==============================
// * refresh Name
//==============================
LMBSEnemyHP.prototype.refreshHP = function() {
	$gameTemp._lmbsEnemyHP[0] = false;
	this._enemyData[3] = this.duration();
	this._hpOld[0] = this.hp2();
	this._meter2.visible = true;
	this.opacity = 255;
    if (this._enemyData[0] != this.eName()) {this.refreshName()};
	this.refreshBlueHP();
};

//==============================
// * hp
//==============================
LMBSEnemyHP.prototype.hp = function() {
	return $gameTemp._lmbsEnemyHP[2];
};

//==============================
// * hp2
//==============================
LMBSEnemyHP.prototype.hp2 = function() {
	return $gameTemp._lmbsEnemyHP[4];
};

//==============================
// * mhp
//==============================
LMBSEnemyHP.prototype.mhp = function() {
	return $gameTemp._lmbsEnemyHP[3];
};

//==============================
// * refresh Blue HP
//==============================
LMBSEnemyHP.prototype.refreshBlueHP= function() {
	var cw = this._hpImage.width;
	var ch = Math.floor(this._hpImage.height / 2);
	var mw = cw * this.hp() / this.mhp();
	this._meter.setFrame(0,0,mw,ch);
};

//==============================
// * update Red Meter
//==============================
LMBSEnemyHP.prototype.updateRedMeter = function() {
	 var dnspeed = 1 + (Math.abs(this._hpOld[0] - this.hp()) / 160);
	 if (this._hpOld[0] > this.hp()) {this._hpOld[0] -= dnspeed;
		  if (this._hpOld[0] < this.hp()) {this._hpOld[0] = this.hp()};}
	 else if (this._hpOld[0] < this.hp()) {this._hpOld[0]  += dnspeed;
		  if (this._hpOld[0]  > this.hp()) {this._hpOld[0]  = this.hp()};			
	 };
	 var cw = this._hpImage.width;
	 var ch = Math.floor(this._hpImage.height / 2);
	 var mw = cw * this._hpOld[0] / this.mhp();	 
	 this._meter2.setFrame(0, ch, mw,ch);	
};

//==============================
// * update
//==============================
LMBSEnemyHP.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);
	if (this.needRefresh()) {this.refreshHP()};
	if (this._enemyData[3] > 0) {this._enemyData[3]--;
	} else {
		if (this._hpOld[0]  === this.hp()) {
			this._meter2.visible = false;
			this.opacity -= 5;
	    };
	};
	if (this.opacity > 0) {this.updateRedMeter()};
};