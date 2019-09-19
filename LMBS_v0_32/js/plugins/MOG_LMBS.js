//=============================================================================
// MOG_LMBS.js
//=============================================================================
/*:
 * @plugindesc (v0.32b) Linear Motion Battle System (LMBS).
 * @author Moghunter
 *
 * @param Turn Duration
 * @desc Definição da duração do turno. 
 * @default 240
 *
 * @param Gravity Power
 * @desc Definição da gravidade. 
 * @default 10 
 *
 * @param Ground Height
 * @desc Definição da altura do limite do chão. 
 * @default 0
 *
 * @param Menu Key
 * @desc Definição do botão de menu.
 * shift , alt , a , d , c , s , q , w , cancel , ok
 * @default cancel
 * 
 * @param Guard Key
 * @desc Definição do botão de defesa.
 * shift , alt , a , d , c , s , q , w , cancel , ok
 * @default s
 * 
 * @param Attack Key
 * @desc Definição do botão de attack.
 * shift , alt , a , d , c , s , q , w , cancel , ok
 * @default ok
 *  
 * @param Skill Key
 * @desc Definição do botão de habilidade.
 * shift , alt , a , d , c , s , q , w , cancel , ok 
 * @default d
 *   
 * @param Dash Key
 * @desc Definição do botão de corrida.
 * shift , alt , a , d , c , s , q , w , cancel , ok 
 * @default a
 *   
 * @param Next Actor Key
 * @desc Definição do botão trocar o personagem.
 * shift , alt , a , d , c , s , cancel , ok , pageup , pagedown 
 * @default pagedown
 *   
 * @param Prev Actor Key
 * @desc Definição do botão trocar o personagem.
 * shift , alt , a , d , c , s , cancel , ok , pageup , pagedown 
 * @default pageup
 *   
 * @param Item Com Name
 * @desc Definição do nome do comando do item. 
 * @default Items
 *
 * @param Equip Skill
 * @desc Definição do nome do comando equipar abilidade. 
 * @default Equip Skill
 *
 * @param Guard Animation ID
 * @desc Definição da ID da animação da defesa. 
 * @default 130
 *
 * @param Double Jump Animation ID
 * @desc Definição da ID da animaçõa da pulo duplo. 
 * @default 127
 * 
 * @param Air Dash Animation ID
 * @desc Definição da ID da animaçõa da dash aério. 
 * @default 128
 * 
 * @param Normal Attack Rate
 * @desc Frequência de ataques normais. 
 * @default 60
 * 
 * @param Dead Pose Y OffSet
 * @desc Definição da posição na pose de morto (para ajustes). 
 * @default 24
 *    
 * @param Escape X-Axis
 * @desc Definição da posição X-Axis do layout escapar. 
 * @default 335
 *   
 * @param Escape Y-Axis
 * @desc Definição da posição Y-Axis do layout escapar. 
 * @default 135
 *
 * @param Escape Gauge X-Axis
 * @desc Definição da posição X-Axis do medidor de escapar. 
 * @default 2
 *
 * @param Escape Gauge Y-Axis
 * @desc Definição da posição Y-Axis do medidor de escapar. 
 * @default 26
 *
 * @param Shadow Y-Axis
 * @desc Definição da posição Y-Axis da sombra. 
 * @default -4
 * 
 * @param Player Cursor X-Axis
 * @desc Definição da posição X-Axis do cursor do player.
 * @default 0
 *  
 * @param Player Cursor Y-Axis
 * @desc Definição da posição Y-Axis do cursor do player.
 * @default 0
 * 
 * @help
 * =============================================================================
 * +++ MOG - Linear Motion Battle System (v0.32 Beta) +++
 * By Moghunter 
 * https://atelierrgss.wordpress.com/
 * =============================================================================
 *
 * Sistema de batalha linear com movimentação livre onde a ação acontece em
 * tempo real.
 *
 * =============================================================================
 * ■ NOTA
 * =============================================================================
 *
 * Este plugin está em fase de teste (Versão Beta), portanto algumas funções
 * ainda não foram implementadas,tais como.
 * - Condição confusão. (Aliados atacarem entre si)
 * - Não é possível trocar os battler durante a batalha.
 *
 * =============================================================================
 * ■ COMMANDOS
 * =============================================================================
 *
 * Z - Attack
 * X - Menu
 * A - Dash & Air Dash
 * S - Guard
 * D + ARROW KEYS - Skill
 * Q & W - Change Player
 * UP - Jump & Double Jump
 * 
 * =============================================================================
 * ■ SISTEMAS DE SPRITES (SUFIX)
 * =============================================================================
 *
 * Todas as imagens devem estar na pasta 
 *
 * /img/lmbs/battlers/
 * /img/lmbs/skills/
 *
 * A nomeção deve ser feita da seguinte forma.
 *
 * SPRITE_NAME + [SUFIX].png
 * 
 * Exemplo.
 *
 * Leon[Walk].png
 *
 * Serão necessários as seguintes imgens básicas dos battlers.
 * 
 * Sprite_Name.png
 * Sprite_Name[AirDash].png
 * Sprite_Name[Cast].png
 * Sprite_Name[Damage].png
 * Sprite_Name[Dash].png
 * Sprite_Name[Dead].png
 * Sprite_Name[Fall].png
 * Sprite_Name[Guard].png
 * Sprite_Name[Idle].png
 * Sprite_Name[Jump].png
 * Sprite_Name[Victory].png
 * Sprite_Name[Walk].png
 *
 * NOTA - Será na imagem básica (Sprite_Name.png) que será definida o a área de
 * impacto do battler. A imagem básica é definida atraves das notetags na
 * caixa de notas dos battlers.
 *
 * =============================================================================
 * ■ SISTEMAS DE SPRITES (FRAMES)
 * =============================================================================
 *
 * O sistema permite utilizar quantos frames de animações desejar, ou seja,
 * não há limites.
 * Para definir a quantidade de frames da imagem será necessário seguir a 
 * seguinte norma.
 *
 * WIDTH / HEIGHT = Number of Frames
 *
 * O largura é dividida pela altura o que resultará a quantidade de frames.
 * A atura e a largura do frame devem ter o mesmo tamanho, ou seja, cada frame
 * sempre deve resultar um quadrado perfeito.
 * É importante que a imagem dividida não tenha o resultado em decimais,
 * caso contrário a apresentação de frames não será apresentada corretamente.
 *
 * =============================================================================
 * ■ BATTLER NOTETAGS (Parameters)
 * =============================================================================
 *
 * Adicione os códigos abaixo na caixa de notas dos battlers.
 *
 * ● LMBS Sprite Name: X
 * (Define o nome do sprite do battler, nessa imagem será baseado a área de
 * impácto do battler).
 *
 * ● LMBS Movement: true
 * Ativar o movimento do battler.
 *
 * ● LMBS Move Speed: X
 * Definição da velocidade do battler.
 *
 * ● LMBS Jump Height: X
 * Definição da altura maxima de pular.
 *
 * ● LMBS Double Jump: X
 * Ativar o pulo duplo.
 * 
 * ● LMBS Dash: X
 * Ativar o Dash.
 *
 * ● LMBS Air Dash: true
 * Ativar o Air Dash
 *
 * ● LMBS Guard Rate: X
 * Porcentagem de chance para ativar a defesa.
 *
 * ● LMBS Action Rate: X
 * Frequência para ativar as ações. 
 *
 * ● LMBS Fly Height: X
 * Definição da altura para voar.
 *
 * ● LMBS Knockback: X
 * Ativar o efeito de acerto no battler.
 *
 * ● LMBS Cast Animation ID: X
 * Definição da animação de Cast.
 *
 * ● LMBS Normal Attack ID: X
 * Defnição da ID da ação de ataque normais. (Apenas para os inimigos)
 *
 * =============================================================================
 * ■ SKILL / ITEMS / WEAPONS NOTETAGS (Parameters)
 * =============================================================================
 *
 * Adicione os códigos abaixo na caixa de notas das habilidades.
 *
 * ● LMBS Skill Type: X
 * Define o tipo de utilização da habilidade.
 * - Ground -> Ativar apenas no chão.
 * - Aerial -> Ativar apenas no ar.
 * - Free   -> Ativar em qualquer situação.
 * 
 * ● LMBS Mode: X
 * Define o comportamento de impacto e movimento da ação.
 * - User             -> A posição da ação sempre será igual ao do usuário.
 * - Projectile       -> Movimentação livre.
 * - Auto Target      -> O impacto e posição será baseada no alvo.
 * - Auto Target Area -> O impacto e posição será baseada no alvo nos alvos em volta. 
 * 
 * ● LMBS Duration: X
 * Definição da duração da ação.
 * 
 * ● LMBS Pose Duration: X
 * Definição da duração da pose.
 * 
 * ● LMBS Pose Name: X
 * Definição do sufixo da pose.
 *
 * ● LMBS Pose Loop: X
 * Ativar loop na pose.
 * 
 * ● LMBS Pose Speed: X
 * Velocidade da pose.
 *
 * ● LMBS Projectile Name: X
 * Definição do nome do sprite do projétil.
 * 
 * ● LMBS Animation ID: X
 * Definição da ID da ação.
 * 
 * ● LMBS Piercing: true
 * Atravessar o alvo.
 * 
 * ● LMBS Hit Delay: X
 * Tempo para ativar o impacto inicial.
 * 
 * ● LMBS Knockback Type: X
 * Tipo de Acerto.
 * - Disable   - Desativar o Knockback;
 * - Normal    - Knockback Normal. 
 * - Power     - Faz o battler cair no chão. (Stun effect).
 * 
 * ● LMBS Ignore Guard: X
 * Ignorar defesa.
 * 
 * ● LMBS Ignore Knockback: true
 * Permite acertar o battler durante o Knockback.
 * 
 * ● LMBS Area: X1:X2:X3:X4
 * Define a área de impacto da ação.
 * - X1 - Posição frontal.
 * - X2 - Posição de traz.
 * - Y1 - Posição abaixo.
 * - Y2 - Posição acima.
 * 
 * ● LMBS Projectile Motion: X:Y
 * Define a trajetória do projétil.
 * 
 * ● LMBS User Motion: 0:0
 * Define a movimentação do usuário durante a ação.
 * 
 * ● LMBS User Knockback: X
 * Permitir que usuário receba o efeito knockback durante a ação.
 * 
 * ● LMBS User Invulnerable: false
 * Deixa o  usuário Invencível durante a ação.
 * 
 * ● LMBS Skill Chain: 0
 * Permite ativar uma ação consecutiva após a primeira ação terminar. 
 * 
 * =============================================================================
 * ■ PLUGIN COMMAND
 * =============================================================================
 *
 * ● lmbs_set_skill : ACTOR_ID : SLOT_ID : SKILL_ID
 * Força equipar uma habilidade no personagem.
 *
 * ● lmbs_order_battler_position : X
 * Permite posicionar o battler automaticamente baseado na largura do campo
 * batalha.
 *
 * =============================================================================
 * HISTÓRICO
 * =============================================================================
 * (0.32b)
 *    - Corrigido o erro de não atualizar a AI dos personagens após a seleção
 *      de skills durante a batalha. 
 *    - Correção de não ativar as teclas de mudar de personagem nas cenas de
 *      status e skill.
 * (0.31b)
 *    - Corrigido o erro de não dar scroll na janela de habilidades.
 * (0.3b)
 *    - Correção do crash aleatório relativo a leitura da imagem.
 *    - Adição da opção de configurar o botão. 
 * (0.2b)
 *    - Corrigido o Bug das condições restritivas de movimento (Can't Move)
 *    - Melhoria da AI
 *    - Opção de definir o poder da grávidade.
 */

//=============================================================================
// ** PLUGIN PARAMETERS
//=============================================================================
　　var Imported = Imported || {};
　　Imported.MOG_LMBS = true;
　　var Moghunter = Moghunter || {}; 

  　Moghunter.parameters = PluginManager.parameters('MOG_LMBS');
    Moghunter.lmbsGravityPower = Number(Moghunter.parameters['Gravity Power'] || 10);
    Moghunter.lmbsGuardAnimationID = Number(Moghunter.parameters['Guard Animation ID'] || 130);
	Moghunter.lmbsCastAnimationID = Number(Moghunter.parameters['Cast Animation ID'] || 126);
	Moghunter.lmbsJumpAnimationID = Number(Moghunter.parameters['Double Jump Animation ID'] || 127);
	Moghunter.lmbsAirDashAnimationID = Number(Moghunter.parameters['Air Dash Animation ID'] || 128);	
    Moghunter.lmbsNormalAttackRate = Number(Moghunter.parameters['Normal Attack Rate'] || 60);
    Moghunter.lmbsDeadPoseY_OffSet = Number(Moghunter.parameters['Dead Pose Y OffSet'] || 24);
	Moghunter.lmbsItemComWord = String(Moghunter.parameters['Item Com Name'] || "Items");
	Moghunter.lmbsEquipComWord = String(Moghunter.parameters['Equip Com Name'] || "Equip Skill");
	Moghunter.lmbsEscapePosX = Number(Moghunter.parameters['Escape X-Axis'] || 335);
	Moghunter.lmbsEscapePosY = Number(Moghunter.parameters['Escape Y-Axis'] || 135);
	Moghunter.lmbsEscapeMeterPosX = Number(Moghunter.parameters['Escape Gauge X-Axis'] || 2);
	Moghunter.lmbsEscapeMeterPosY = Number(Moghunter.parameters['Escape Gauge Y-Axis'] || 26);	
	Moghunter.lmbsGroundHeight = Number(Moghunter.parameters['Ground Height'] || 0);	
	Moghunter.lmbsShadowPosY = Number(Moghunter.parameters['Shadow Y-Axis'] || -4);
	Moghunter.lmbsTurnDuration = Number(Moghunter.parameters['Turn Duration'] || 240);
	Moghunter.lmbsCursorPlayerX = Number(Moghunter.parameters['Player Cursor X-Axis'] || 0);
	Moghunter.lmbsCursorPlayerY = Number(Moghunter.parameters['Player Cursor Y-Axis'] || 0);
	Moghunter.lmbsKeyMenu = String(Moghunter.parameters['Menu Key'] || 'cancel');
	Moghunter.lmbsKeyGuard = String(Moghunter.parameters['Guard Key'] || 's');
	Moghunter.lmbsKeyAttack = String(Moghunter.parameters['Attack Key'] || 'ok');
    Moghunter.lmbsKeySkill = String(Moghunter.parameters['Skill Key'] || 'd');
	Moghunter.lmbsKeyDash = String(Moghunter.parameters['Dash Key'] || 'a');
    Moghunter.lmbsKeyNext = String(Moghunter.parameters['Next Actor Key'] || 'w');
    Moghunter.lmbsKeyPrev = String(Moghunter.parameters['Prev Actor Key'] || 'q');

//=============================================================================
//  ****** ImageManager  ******************************************************
//=============================================================================

//==============================
// * load LBSB
//==============================
ImageManager.loadLMBS = function(filename) {
    return this.loadBitmap('img/lmbs/', filename, 0, true);
};

//==============================
// * load LBSBatlers
//==============================
ImageManager.loadLMBSBattlers = function(filename) {
    return this.loadBitmap('img/lmbs/battlers/', filename, 0, true);
};

//==============================
// * load LBSSkill
//==============================
ImageManager.loadLMBSSkills = function(filename) {
    return this.loadBitmap('img/lmbs/skills/', filename, 0, true);
};

//=============================================================================
// ** Game_Interpreter
//=============================================================================	

//==============================
// * PluginCommand
//==============================
var _mog_lmbs_pluginCommand = Game_Interpreter.prototype.pluginCommand
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_mog_lmbs_pluginCommand.call(this,command, args)
	if (command === "lmbs_order_battler_position")  {
		var od = String(args[1]) === "true" ? false : true;
		 $gameSystem._lmbsBattlerOrder[0] = od;
	};
	if (command === "lmbs_set_skill")  {
		var actorID = Number(args[1]);
		var slotID = Number(args[3]);
		var slillID	 = Number(args[5]);
		$gameParty.members().forEach(function(actor) {
			if(actor._actorId === actorID) {
				actor.lmbsSetSkill(slotID,slillID)
			};
		}, this);
	};	
	return true;
};

//=============================================================================
// ****** Game Temp ***********************************************************
//=============================================================================

//==============================
// * Initialize
//==============================
var _mog_lmbs_gtemp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_mog_lmbs_gtemp_initialize.call(this);
	this._lmbsTemp = [true,0,0,0,0];
	this._lmbsFocus = [0,0];
	this._lmbsRefreshZIndex = 0;
	this._lmbsTarget = [null,0,0];
	this._lmbsSelectPhase = [false,0,0];
	this._lmbsMenuPhase = [false,0,0,false];
	this._lmbsEscape = [0,500,false,false];
	this._lmbsEscaped = false;
	this._lmbsActionName = [false,0];
	this._lmbsEndPhase = [0,0,false];
	this._lmbsPlayerCursor = [0,120];
	Input.keyMapper[16] = 'shift';
	Input.keyMapper[18] = 'alt';
	Input.keyMapper[65] = 'a';
	Input.keyMapper[68] = 'd';
	Input.keyMapper[67] = 'c';
	//Input.keyMapper[81] = 'q';
	//Input.keyMapper[87] = 'w';
    Input.keyMapper[83] = 's';
};

//=============================================================================
// ****** Game System *********************************************************
//=============================================================================

//==============================
// * Initialize
//==============================
var _mog_lmbs_gsys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	_mog_lmbs_gsys_initialize.call(this);
	this._lmbsData = [true,0,0,0,0];
	this._lmbsScreenSize = [0,Graphics.boxWidth,0,Graphics.boxHeight];
	this._lmbsBattlerOrder = [false,false];
	var h = Math.floor(Graphics.height - (Graphics.height / 4));
	this._lmbsGroundHeight = h + Moghunter.lmbsGroundHeight;
};

//=============================================================================
// ****** Game Battler ********************************************************
//=============================================================================

//==============================
// * init Members
//==============================
var _mog_lmbs_gbat_initMembers = Game_Battler.prototype.initMembers;
Game_Battler.prototype.initMembers = function() {
	_mog_lmbs_gbat_initMembers.call(this);
	this._lmbs_wait = 0;
	this._lmbs_X = 200 + Math.randomInt(800);
	this._lmbs_Y = 200;
	this._lmbs_Direction = 2;
	this._lmbs_Hit = [false,0,false];
	this._lmbs_SpriteSize = [0,0];
	this._lmbs_MoveSpeed = 5;
	this._lmbs_Walking = false;
	this._lmbs_Movement = true;
	this._lmbs_Jump = [true,false,20,0];
	this._lmbs_DoubleJump = [true,false,20,0];
	this._lmbs_Knockback = [true,0,0,0,0];
	this._lmbs_Dash = [true,false,false];
	this._lmbs_AirDash = [true,false,20,0];
	this._lmbs_Flying = [false,false,10,0];
	this._lmbs_Guard = [true,false,0,false,false,10];
	this._lmbs_Gravity = [true,Moghunter.lmbsGravityPower];
	this._lmbs_bname = "";
    this._lmbs_ActionSkill = [];
	this._lmbs_ActionUser = [];
	this._lmbs_ForcedAction = false;
	this._lmbs_ForceMove = [0,0];
	this._lmbs_AerialActionDone = false;
	this._lmbs_NeedRefSprite = false;
	this._lmbs_SuperGuard = false;
	this._lmbs_Casting = [null,0];
	this._lmbs_target = null;
	this._lmbsAllTargets = [false,0];
	this._lmbsAIMovement = [0,0,2];
	this._lmbsAIAction = [60,0,120];
	this._lmbsAISkillList = [];
	this._lmbsAISkillGround = [];
	this._lmbsAISkillAerial = [];
	this._lmbsAISkillCure = [];	
	this._lmbsSkillSize = [0,0,0,0];
	this._lmbsActionTarget = null;
	this._lmbsNormalAttackID = this.attackSkillId();	
	this._lmbsCastAnimationID = Moghunter.lmbsCastAnimationID;
	this._lmbsDeadPoseYoffset = Moghunter.lmbsDeadPoseY_OffSet;
	this._lmbs_skills = [null,null,null,null,null,null,null];
};

//==============================
// * Lmbs Prepare
//==============================
Game_Battler.prototype.lmbsPrepare = function() {
    this._lmbs_ActionUser = [];
    this._lmbs_ActionSkill = [];
	this._lmbs_Casting = [null,0];
	this._lmbs_target = null;
	this._lmbsAllTargets = [false,0];
	this._lmbsAIMovement = [0,0,2];
	this._lmbsAIAction[0] = Math.floor(Math.randomInt(this._lmbsAIAction[2] / 2) + (this._lmbsAIAction[2] / 2) + 20);
	this._lmbsAISkillList = [];
	this._lmbsAISkillGround = [];
	this._lmbsAISkillAerial = [];
	this._lmbsAISkillCure = [];	
    this._lmbsActionTarget = null;
    this._lmbs_Jump[1] = false;
	this._lmbs_Jump[3] = 0;
    this._lmbs_DoubleJump[1] = false;
	this._lmbs_DoubleJump[3] = 0;			
    this._lmbs_Dash[1] = false;
	this._lmbs_Dash[3] = 0;
    this._lmbs_AirDash[1] = false;
	this._lmbs_AirDash[3] = 0;	
    this._lmbs_Hit = [false,0,false];
	this._lmbs_AerialActionDone = false;
	this._lmbs_Knockback[1] = 0;
	this._lmbs_Knockback[2] = 0;
	this._lmbs_Knockback[3] = 0;
	this._lmbs_Knockback[4] = 0;
	this._lmbs_ForcedAction = false;
	this._lmbs_ForceMove = [0,0];
	this._lmbs_Guard[1] = false;
	this._lmbs_Guard[2] = 0;
	this._lmbs_Guard[3] = false;
	this._lmbs_Guard[4] = false;	
	this._lmbs_Walking = false;
};

//==============================
// * Lmbs On Battle End
//==============================
Game_Battler.prototype.lmbsOnBattleEnd = function() {
    this._lmbs_ActionUser = [];
	this._lmbs_ForceMove = [0,0];
	this._lmbs_ForcedAction = false;
	this._lmbs_Casting = [null,0];
	this._lmbsAllTargets = [false,0];	
	this._lmbs_Knockback[1] = 0;
	this._lmbs_Knockback[2] = 0;
	this._lmbs_Knockback[3] = 0;
	this._lmbs_Knockback[4] = 0;
	this._lmbs_ForcedAction = false;
	this._lmbs_ForceMove = [0,0];
	this._lmbs_Guard[1] = false;
	this._lmbs_Guard[2] = 0;
	this._lmbs_Guard[3] = false;
	this._lmbs_Guard[4] = false;	
    this._lmbs_Jump[1] = false;
	if (this._lmbs_Jump[3] > 5) {this._lmbs_Jump[3] = 5};
    this._lmbs_DoubleJump[1] = false;
	if (this._lmbs_DoubleJump[3]) {this._lmbs_DoubleJump[3] = 5};			
    this._lmbs_Dash[1] = false;
	this._lmbs_Dash[3] = 0;
    this._lmbs_AirDash[1] = false;
	if (this._lmbs_AirDash[3] > 5) {this._lmbs_AirDash[3] = 5};	
    this._lmbs_ActionUser = [];
    this._lmbs_ActionSkill = [];
	this._lmbs_Walking = false;
	this._lmbs_target = null;
};		

//==============================
// * LMBS Cache Action Bitmap
//==============================
Game_Battler.prototype.lmbsCacheActionBitmap = function() {
	if (this.isActor()){
		for (var i = 0; i < this.skills().length; i++) {
			var skill = this.skills()[i];
			if (skill) {this.lmbsCacheBitmap(skill)};
		};
	} else {
		for (var i = 0; i < this.enemy().actions.length; i++) {
			var skillId = this.enemy().actions[i].skillId;
			var skill = $dataSkills[skillId];
			if (skill) {this.lmbsCacheBitmap(skill)};
		};
	};
};

//==============================
// * LMBS Cache Bitmap
//==============================
Game_Battler.prototype.lmbsCacheBitmap = function(skill) {
	var animation = $dataAnimations[skill.animationId];
	this.lmbsCacheAnimation(animation)
    var animation = $dataAnimations[this._lmbsCastAnimationID];
    this.lmbsCacheAnimation(animation);	
	var item_notes = skill.note.split(/[\r\n]+/);		
	item_notes.forEach(function(note) {
	var note_data = note.split(': ')
	if (note_data[0].toLowerCase() == "lmbs animation id"){			 
        var par = note_data[1].split(':');
		var animationID = Number(par[0]);
		var animation = $dataAnimations[animationID];
		this.lmbsCacheAnimation(animation);			
    };	
	if (note_data[0].toLowerCase() == "lmbs projectile name"){			 
         var par = note_data[1].split(':');
		 spriteName = String(par[0]);
		 ImageManager.loadLMBSSkills(spriteName);
    };    
	if (note_data[0].toLowerCase() == "lmbs pose name"){			 
         var par = note_data[1].split(':');
		 var pose = String(par[0]);
		 var poseName = this.lmbsSpriteName() + "[" + pose + "]"
		 ImageManager.loadLMBSBattlers(String(poseName));
    };
 	},this);
};

//==============================
// * Lmbs Cache Animation
//==============================
Game_Battler.prototype.lmbsCacheAnimation = function(animation) {
	if (!animation) {return}
	var name1 = animation.animation1Name;
	var name2 = animation.animation2Name;
	ImageManager.loadAnimation(name1, 0);
	ImageManager.loadAnimation(name2, 0);
};

//==============================
// * Lmbs Target
//==============================
Game_Battler.prototype.lmbsTarget= function() {
	if (!this._lmbs_target) {return false};
	if (this._lmbs_target.isDead()) {return false};
	return this._lmbs_target; 
};

//==============================
// * Set Parameters Tags
//==============================
Game_Battler.prototype.lmbsSetParametersTags = function() {
    this.notetags().forEach(function(note) {var note_data = note.split(': ')
		 if (note_data[0].toLowerCase() == "lmbs sprite name"){
			 var par = note_data[1].split(':');
		     this._lmbs_bname = String(par[0]);			 
		 };
		 if (note_data[0].toLowerCase() == "lmbs movement"){
			 var par = note_data[1].split(':');
		     this._lmbs_Movement = String(par[0]).toLowerCase() === "true" ? true : false;
		 };			 
		 if (note_data[0].toLowerCase() == "lmbs move speed"){
			 var par = note_data[1].split(':');
		     this._lmbs_MoveSpeed = Number(par[0]);			 
		 };
		 if (note_data[0].toLowerCase() == "lmbs dead pose y-axis offset"){
			 var par = note_data[1].split(':');
		     this._lmbsDeadPoseYoffset = Number(par[0]);			 
		 };		 
		 if (note_data[0].toLowerCase() == "lmbs double jump"){
			 var par = note_data[1].split(':');
		     this._lmbs_DoubleJump[0] = String(par[0]).toLowerCase() === "true" ? true : false;
		 };
		 if (note_data[0].toLowerCase() == "lmbs dash"){
			 var par = note_data[1].split(':');
		     this._lmbs_Dash[0] = String(par[0]).toLowerCase() === "true" ? true : false;
		 };			 		 	 
		 if (note_data[0].toLowerCase() == "lmbs air dash"){
			 var par = note_data[1].split(':');
		     this._lmbs_AirDash[0] = String(par[0]).toLowerCase() === "true" ? true : false;
		 };
		 if (note_data[0].toLowerCase() == "lmbs knockback"){
			 var par = note_data[1].split(':');
		     this._lmbs_SuperGuard = String(par[0]).toLowerCase() === "true" ? false : true;
		 };			 			
		 if (!this.lmbsAllowMovement()) {this._lmbs_SuperGuard = true};		 
		 if (note_data[0].toLowerCase() == "lmbs jump height"){
			 var par = note_data[1].split(':');
			 this._lmbs_Jump[0] = Number(par[0]) > 0 ? true : false;
		     this._lmbs_Jump[2] = Number(par[0]);
			 this._lmbs_DoubleJump[2] = this._lmbs_Jump[2];
			 if (!this._lmbs_Jump[0]) {	
				this._lmbs_DoubleJump[0] = false;
				this._lmbs_AirDash[0] = false; 
			 };
		 };	
		 if (note_data[0].toLowerCase() == "lmbs fly height"){
			 var par = note_data[1].split(':');
			 this._lmbs_Flying[0] = Number(par[0]) > 0 ? true : false;
		     this._lmbs_Flying[2] = Number(par[0]);
			 if (this._lmbs_Flying[0]) {
		   	    this._lmbs_Jump[0] = false;
				this._lmbs_DoubleJump[0] = false;
				this._lmbs_AirDash[0] = false;
			 };
		 };	
		 if (note_data[0].toLowerCase() == "lmbs normal attack id"){
			 var par = note_data[1].split(':');
		     this._lmbsNormalAttackID = Number(par[0]);
		 };		 
		 if (note_data[0].toLowerCase() == "lmbs guard rate"){
			 var par = note_data[1].split(':');
		     this._lmbs_Guard[5] = Number(par[0]);
		 };			
		 if (note_data[0].toLowerCase() == "lmbs cast animation id"){
			 var par = note_data[1].split(':');
		     this._lmbsCastAnimationID = Number(par[0]);
		 };		  
		 if (note_data[0].toLowerCase() == "lmbs action rate"){
			 var par = note_data[1].split(':');
			 this._lmbsAIAction[2] = Math.min(Math.max((Number(par[0])),60),999);
			 this._lmbsAIAction[0] = Math.randomInt(this._lmbsAIAction[2] / 2);
		 };		
	},this);
};

//==============================
// * Lmbs Set Skill
//==============================
Game_Battler.prototype.lmbsSetSkill = function(value,skillid) {
	if (value > 6) {return};
    this._lmbs_skills[Math.abs(value)] = Math.abs(skillid);
};

//==============================
// * Lmbs Request Skill
//==============================
Game_Battler.prototype.lmbsRequestSkill = function() {
	if (this.lmbsIsCasting()) {return false};
    return this._lmbs_ActionSkill[0];
};

//==============================
// * Lmbs Action User Clear
//==============================
Game_Battler.prototype.lmbsActionUserClear = function() {
	var item = this._lmbs_ActionUser[0];
	var chainSkillID = this._lmbs_ActionUser[4];
	var type = DataManager.isSkill(item) ? 0 : 1;
    this._lmbs_ActionUser = [];
	this._lmbs_ForceMove = [0,0];
	this._lmbs_ForcedAction = false;
	this._lmbsAllTargets = [false,0];
	if (chainSkillID === 0 && this.lmbsGroundHeight() != this._lmbs_Y) {
	   this.cancelAerialCommands();
	   this._lmbs_AerialActionDone = true;	
	};	
	this._lmbs_NeedRefSprite = true;
	if (!this.lmbsIsKnockbacking() && chainSkillID && chainSkillID != 0) {
		this._lmbs_wait = 0;
		this._lmbs_ForcedAction = true;
		this._lmbs_AerialActionDone = false;
		this.lmbsAction(chainSkillID,type)
	} else {
		this.lmbsSetTarget();
	};
};

//==============================
// * Lmbs Cancel Aerial Commands
//==============================
Game_Battler.prototype.cancelAerialCommands = function() {
	   this._lmbs_AirDash[1] = true;
	   this._lmbs_AirDash[3] = 0;
	   this._lmbs_Jump[1] = true;
	   this._lmbs_Jump[3] = 0;
	   this._lmbs_DoubleJump[1] = true;
	   this._lmbs_DoubleJump[3] = 0;
};	   

//==============================
// * Lmbs Can Action
//==============================
Game_Battler.prototype.lmbsCanAction = function(item) {
	if (this.lmbsIsActing()) {return false};
	if (this.lmbsIsCasting()) {return false};
	if (this._lmbs_wait > 0) {return false};
	if (this.lmbsIsGuardknockback()) {return false};
	if (this.lmbsIsKnockbacking()) {return false};
	if (!item) {return};
    if (!this._lmbs_ForcedAction && !this.canUse(item)) {return false};
    if (!this.canMove()) {return false};
	if (this._lmbs_AerialActionDone && this.lmbsCanUseAerialSkill()) {return false};
	return true;
};

//==============================
// * LMBS Attack Action
//==============================
Game_Battler.prototype.lmbsAttackAction = function() {
   this.lmbsAction(this.attackSkillId(),0,null);
};

//==============================
// * Lmbs Skill Action Actor
//==============================
Game_Battler.prototype.lmbsSkillActionActor = function() {
	 var skillID = this.lmbsSetSkillIdActor();
	 var item = $dataSkills[skillID];
	 if (this.lmbsNeedTargetSelection(skillID,item) && this.lmbsCanAction(item)) {
		 $gameTemp._lmbsSelectPhase[0] = true;
		 $gameTemp._lmbsSelectPhase[1] = skillID;
		 $gameTemp._lmbsSelectPhase[2] = 0;
		 var f = this.lmbsIsActionForFriends(item)
		 if (this.isActor()) {
			 unitID = f ? 0 : 1;
		 } else {
		     unitID = f ? 1 : 0;
	     };
		 $gameTemp._lmbsSelectPhase[3] = unitID;
		 $gameTemp._lmbsTarget[0] = BattleManager.lmbsNextTarget(0,$gameTemp._lmbsSelectPhase[3],false);
     } else {
       this.lmbsAction(skillID,0,null);
	 };
};

//==============================
// * Lmbs check Item Scope
//==============================
Game_Battler.prototype.lmbscheckItemScope = function(list,item) {
	if (!item) {return false};
    return list.contains(item.scope);
};

//==============================
// * Lmbs Is Action For Friends
//==============================
Game_Battler.prototype.lmbsIsActionForFriends = function(item) {
    return this.lmbscheckItemScope([7, 8, 9, 10, 11],item);
};

//==============================
// * Lmbs Is Action For All
//==============================
Game_Battler.prototype.lmbsIsActionForAll = function(item) {
    return this.lmbscheckItemScope([2, 8, 10],item);
};

//==============================
// * Lmbs Need Target Selection
//==============================
Game_Battler.prototype.lmbsNeedTargetSelection = function(actionID,item) {
	 if (!item) {return false};
	if (item.scope === 0) {return false};
	if (item.scope === 11) {return false};	 
	 var enable = false
	 var item_notes = item.note.split(/[\r\n]+/);
     item_notes.forEach(function(note) {
         var note_data = note.split(': ')	 
		 if (note_data[0].toLowerCase() == "lmbs mode"){
				 var par = note_data[1].split(':');
				 if (String(par[0]).toLowerCase() == "auto target") {enable = true};
				 if (String(par[0]).toLowerCase() == "auto target area") {enable = true};
		 };	 
	 },this);
	 return enable;
};

//==============================
// * Lmbs Skill Action Actor
//==============================
Game_Battler.prototype.lmbsSetSkillIdActor = function() {
     if (this.lmbsCanUseGroundSkill() && !this.lmbsCanFly()) {
		 if (Input.isPressed('left') || Input.isPressed('right')) {
			 return this._lmbs_skills[1];
		 } else if (Input.isPressed('down')){
			 return this._lmbs_skills[2];
		 } else {
		     return this._lmbs_skills[0];
		 };
	 } else if (this.lmbsCanUseAerialSkill()) {
		 if (Input.isPressed('left') || Input.isPressed('right')) {
			 return this._lmbs_skills[4];
		 } else if (Input.isPressed('down')){
			 return this._lmbs_skills[5];
		 } else if (Input.isPressed('up')){
			 return this._lmbs_skills[6];			 
		 } else {
		     return this._lmbs_skills[3];
		 };
	 };
	 return 0;
};

//===============================
// ** Lmbs play Voice Action
//===============================
Game_Battler.prototype.lmbsPlayVoiceAction = function(item) {
	 var action = item;
	 var actionID = item.id;
	 if (!action) {return};
	 if (this.isActor()) {
		 if (this.lmbsIsSkillType() && Moghunter.v_actor_skill[this._actorId] && 
		     Moghunter.v_actor_skill[this._actorId][actionID]) {
    		 SoundManager.selectVoice(Moghunter.v_actor_skill[this._actorId][actionID]);
			 return;
		 } else if (this.lmbsIsItemType() && Moghunter.v_actor_item[this._actorId] &&
		     Moghunter.v_actor_item[this._actorId][actionID]) {
			 SoundManager.selectVoice(Moghunter.v_actor_item[this._actorId][actionID]); 
			 return;
		 };
	 } else if (this.isEnemy()) {
		 if (Moghunter.v_enemy_skill[this._enemyId] && Moghunter.v_enemy_skill[this._enemyId][actionID]) {
    		 SoundManager.selectVoice(Moghunter.v_enemy_skill[this._enemyId][actionID]);
			 return;
		 };		 
	 };
	  SoundManager.selectVoice(this._v_default_action);
};

//==============================
// * Lmbs Can Use Ground Skill
//==============================
Game_Battler.prototype.lmbsCanUseGroundSkill = function() {
	if (this.lmbsGroundHeight() != this._lmbs_Y) {return false};
	return true;
};

//==============================
// * Lmbs Can Use Aerial Skill
//==============================
Game_Battler.prototype.lmbsCanUseAerialSkill = function() {
	if (this.lmbsCanFly()) {return true};
	if (this._lmbs_Y >= (this.lmbsGroundHeight() - 12)) {return false};
	return true;
};

//==============================
// * Lmbs Check Skill Type
//==============================
Game_Battler.prototype.lmbsIsSkillTypeUsable = function(skillType) {
	if (this.lmbsCanFly()) {return true};
	if (this._lmbs_ForcedAction) {return true};
	if (skillType.toLowerCase() == "ground" && !this.lmbsCanUseGroundSkill()){return false};
	if (skillType.toLowerCase() == "aerial" && !this.lmbsCanUseAerialSkill()){return false};
	return true;
};

//==============================
// * Lmbs Action
//==============================
Game_Battler.prototype.lmbsAction = function(actionID,type,target) {
	var item = type === 0 ? $dataSkills[actionID] : $dataItems[actionID];
	if (!this.lmbsCanAction(item)) {return};
	var oldItem = item;
	if (this.isActor() && this.attackSkillId() === item.id && this.equips()[0] && type === 0) {
		item = this.equips()[0];
	};	
    var target = target;
	var position = "projectile";
	var duration = 30;
	var movement = [0,0];
	var spriteName = "";
	var area = [24,24,24,24];
	var multHit = item.repeats;
	var wait = 5;
	var animationID = 0;
	var pose = "";
	var poseLoop = false;
	var userMovement = [0,0];
	var skillLink = 0;
	var poseDuration = 30;		
	var knockback = "normal";	
	var superGuard = false;
	var ignoreKnockback = false;	
	var piercing = false;
	var skillType = "free";
	var poseSpeed = 8;
	var ignoreGuard = false;
	var userInvulnerable = false;
	var skillName = true;
	var OuginAni = [false,""];
    this._lmbs_Dash[2]  = false;
	this._lmbs_Casting = [null,0];
	this._lmbsAllTargets = [false,0];	
	var item_notes = item.note.split(/[\r\n]+/);
    item_notes.forEach(function(note) {
		 if (note == "Disable Name" ) {skillName = false};
         var note_data = note.split(': ')
		 if (note_data[0].toLowerCase() == "lmbs duration"){			 
             var par = note_data[1].split(':');
			 duration = Number(par[0]);
         };
		 if (Imported.MOG_OugiAnimation) {
			 if (note_data[0].toLowerCase() == "ougi animation"){
				 var par = note_data[1].split(':');
				 OuginAni = [true,String(par[0])];
			 };
		 };
		 if (note_data[0].toLowerCase() == "lmbs ignore guard"){			 
             var par = note_data[1].split(':');
			 ignoreGuard = String(par[0]).toLowerCase() === "true" ? true : false;
         };		 
		 if (note_data[0].toLowerCase() == "lmbs knockback type"){
		     var par = note_data[1].split(':');
		     knockback = String(par[0]);
		 };		 		 
		 if (note_data[0].toLowerCase() == "lmbs mode"){
		     var par = note_data[1].split(':');
		     position = String(par[0]);
		 };
		 if (note_data[0].toLowerCase() == "lmbs hit delay"){			 
             var par = note_data[1].split(':');
			 wait = Number(par[0]);
         };		 	 
		 if (note_data[0].toLowerCase() == "lmbs projectile name"){			 
             var par = note_data[1].split(':');
			 spriteName = String(par[0]);
         };
		 if (note_data[0].toLowerCase() == "lmbs area"){			 
             var par = note_data[1].split(':');
			 area = [Number(par[0]),Number(par[1]),Number(par[2]),Number(par[3])];
         };		 
		 if (note_data[0].toLowerCase() == "lmbs projectile motion"){			 
             var par = note_data[1].split(':');
			 movement = [Number(par[0]),Number(par[1])];
         };			
		 if (note_data[0].toLowerCase() == "lmbs pose duration"){			 
             var par = note_data[1].split(':');
			 poseDuration = Number(par[0]);
         };			 
		 if (note_data[0].toLowerCase() == "lmbs user motion"){			 
             var par = note_data[1].split(':');
			 userMovement = [Number(par[0]),Number(par[1])];
         };		 
		 if (note_data[0].toLowerCase() == "lmbs pose name"){			 
             var par = note_data[1].split(':');
			 pose = String(par[0]);
         }; 
		 if (note_data[0].toLowerCase() == "lmbs skill chain"){			 
             var par = note_data[1].split(':');
			 skillLink = Number(par[0]);
         };
		 if (note_data[0].toLowerCase() == "lmbs animation id"){			 
             var par = note_data[1].split(':');
			 animationID = Number(par[0]);
         };
		 if (note_data[0].toLowerCase() == "lmbs user knockback"){			 
             var par = note_data[1].split(':');
			 superGuard = String(par[0]).toLowerCase() === "true" ? false : true;
         };	
		 if (note_data[0].toLowerCase() == "lmbs ignore knockback"){			 
             var par = note_data[1].split(':');
			 ignoreKnockback = String(par[0]).toLowerCase() === "true" ? true : false;
         };				 
		 if (note_data[0].toLowerCase() == "lmbs piercing"){			 
             var par = note_data[1].split(':');
			 piercing = String(par[0]).toLowerCase() === "true" ? true : false;
         };		
		 if (note_data[0].toLowerCase() == "lmbs skill type"){			 
             var par = note_data[1].split(':');
			 skillType = String(par[0]);
         };		
		 if (note_data[0].toLowerCase() == "lmbs pose loop"){			 
             var par = note_data[1].split(':');
			 poseLoop = String(par[0]).toLowerCase() === "true" ? true : false;
         };	
		 if (note_data[0].toLowerCase() == "lmbs pose speed"){			 
             var par = note_data[1].split(':');
			 poseSpeed = Number(par[0]);
         };		
		 if (note_data[0].toLowerCase() == "lmbs user invulnerable"){			 
             var par = note_data[1].split(':');
			 userInvulnerable = String(par[0]).toLowerCase() === "true" ? true : false;
         };			 
	},this);
	if (!this.lmbsIsSkillTypeUsable(skillType)) {this.lmbsActionUserClear();return};
	if (!this._lmbs_ForcedAction) {this.useItem(item)};
	this._lmbs_NeedRefSprite = true;
	var allTargets = this.lmbsIsActionForAll(item);
	var f = this.lmbsIsActionForFriends(item)
	if (this.isActor()) {
		 unitID = f ? 0 : 1;
	} else {
	     unitID = f ? 1 : 0;
	};
    this._lmbsAllTargets = [allTargets,unitID];	
	if (this._lmbs_target) {this._lmbs_target.lmbsSetAIGuard(item)};	
	item = oldItem;
	var normalAttack = this._lmbsNormalAttackID === item.id ? true : false;
	if (!normalAttack) {
	  if (this._lmbs_Jump[3] > 5 ) {this._lmbs_Jump[3] = 5};
	  if (this._lmbs_DoubleJump[3] > 5 ) {this._lmbs_DoubleJump[3] = 5};
	};
	if (!this._lmbs_ForcedAction && item.speed != 0) {this._lmbs_Casting = [item,Math.abs(item.speed)]};
	var aerialMode = skillType.toLowerCase() === "aerial" ? true : false;
	this._lmbs_AerialActionDone = this.lmbsCanFly() ? false : aerialMode;
	this._lmbs_ActionSkill = [item,target,duration,position,movement,spriteName,area,multHit,wait,animationID,knockback,ignoreKnockback,piercing,skillType,ignoreGuard,skillName,OuginAni];
	this._lmbs_ActionUser = [item,pose,poseDuration,userMovement,skillLink,superGuard,skillType,aerialMode,poseLoop,poseSpeed,normalAttack,type,userInvulnerable];
	this._lmbs_ForceMove = userMovement;
	if (this.lmbsNeedForceMove() && this.lmbsGroundHeight() != this._lmbs_Y) {
		this._lmbs_Jump[3] = 0;
		this._lmbs_DoubleJump[3] = 0;
	};	
};

//==============================
// * LMBS Is Invulnerable Action
//==============================
Game_Battler.prototype.lmbsIsInvulnerableAction = function() {
	if (!this.lmbsIsActing()) {return false};
	if (!this._lmbs_ActionUser[12]) {return false};
	return true;
};

//==============================
// * LMBS Is Skill Type
//==============================
Game_Battler.prototype.lmbsIsSkillType = function() {
	return this._lmbs_ActionUser[11] === 0;
};

//==============================
// * LMBS Is Item Type
//==============================
Game_Battler.prototype.lmbsIsItemType = function() {
	return this._lmbs_ActionUser[11] === 1;
};

//==============================
// * LMBS is Casting
//==============================
Game_Battler.prototype.lmbsIsCasting = function() {
	return this._lmbs_Casting[1] > 0;
};

//==============================
// * LMBS current Action
//==============================
Game_Battler.prototype.lmbsCurrentAction = function() {
	return this.lmbsIsActing() ? this._lmbs_ActionUser[0] : -1;
};

//==============================
// * LMBS update Casting
//==============================
Game_Battler.prototype.lmbsUpdateCasting = function() {
	if (this.lmbsIsKnockbacking()) {return};
	this._lmbs_Casting[1]--;
	if (this._lmbs_Casting[1] === 0) {
		this._lmbs_Casting = [null,0];
	};
};

//==============================
// * LMBS is Normal Attack
//==============================
Game_Battler.prototype.lmbsIsNormaAttack = function() {
	return this._lmbs_ActionUser[10] && !this.lmbsIsItemType();
};

//==============================
// * LMBS pose Speed Action
//==============================
Game_Battler.prototype.lmbsPoseSpeedAction = function() {
	return this._lmbs_ActionUser[9];
};

//==============================
// * LMBS pose Loop
//==============================
Game_Battler.prototype.lmbsPoseLoop = function() {
	return this._lmbs_ActionUser[8];
};

//==============================
// * Lmbs Guard Clear
//==============================
Game_Battler.prototype.lmbsGuadClear = function() {
	this._lmbs_Guard[1] = false;
	//this._lmbs_Guard[2] = 0
	this._lmbs_Guard[3] = false;
};

//==============================
// * Lmbs Guard Rate
//==============================
Game_Battler.prototype.lmbsGuardRate = function() {
    return this._lmbs_Guard[5];
};

//==============================
// * LMBS Is Guad Knockback
//==============================
Game_Battler.prototype.lmbsIsGuardknockback = function() {
	return this._lmbs_Guard[2] > 0;
};

//==============================
// * LMBS Update Guard
//==============================
Game_Battler.prototype.lmbsUpdateGuard = function() {
	this._lmbs_Guard[2]--;
	this._lmbs_Guard[1] = true
	if (this.lmbsAllowMovement()) {this._lmbs_X -= this._lmbs_Direction === 2 ? -2 : 2};
};

//==============================
// * LMBS Is Action Aerial
//==============================
Game_Battler.prototype.lmbsIsActionAerial = function() {
	return this._lmbs_ActionUser[7];
};

//==============================
// * LMBS Need Force Move
//==============================
Game_Battler.prototype.lmbsNeedForceMove = function() {
	if (!this.lmbsIsActing()) {return false};
    if (!this.lmbsForcingMove()) {return false};
	if (!this.lmbsAllowMovement()) {return false};
	return true;
};

//==============================
// * LMBS Update Force Move
//==============================
Game_Battler.prototype.lmbsUpdateForceMove = function() {
	var dx = this._lmbs_Direction === 2 ? -this._lmbs_ForceMove[0] : this._lmbs_ForceMove[0]; 
    this._lmbs_X += dx;
	this._lmbs_Y += this._lmbs_ForceMove[1];
	if (!this.lmbsCanFly() && this.lmbsIsActionAerial() && this._lmbs_Y >= this.lmbsGroundHeight()) {
	    this._lmbs_Y = this.lmbsGroundHeight();
		this.lmbsMotionClear();
		this.lmbsGravityClear();
     };
};

//==============================
// * Lmbs Forcing Move
//==============================
Game_Battler.prototype.lmbsForcingMove = function() { 
    if (this._lmbs_ForceMove[0] != 0) {return true};
	if (this._lmbs_ForceMove[1] != 0) {return true};
	return false;
};

//==============================
// * Lmbs Is Knockbacking
//==============================
Game_Battler.prototype.lmbsIsKnockbacking = function() {
	//if (this._lmbs_SuperGuard) {return false};
	if (this._lmbs_Knockback[2] > 0) {return true};
    return false;
};

//==============================
// * Lmbs Is Invunerable
//==============================
Game_Battler.prototype.lmbsIsInvunerable = function() {
	if (this._lmbs_Knockback[3] > 0) {return true};
    return false;
};
//==============================
// * Lmbs Is Invunerable Miss
//==============================
Game_Battler.prototype.lmbsIsInvunerableMiss = function() {
	if (this._lmbs_Knockback[5] > 0) {return true};
    return false;
};

//==============================
// * Lmbs Is Stun
//==============================
Game_Battler.prototype.lmbsIsStun = function() {
	if (this._lmbs_Knockback[2] === 0) {return false};
	if (this._lmbs_Knockback[1] != 2) {return false};
    return true;
};

//==============================
// * Lmbs Can Knockback
//==============================
Game_Battler.prototype.lmbsCanKnockback = function() {
	if (!this._lmbs_Knockback[0]) {return false};
	if (!this.lmbsAllowMovement()) {return false};
	if (this.lmbsIsActingGuardMode()) {return false};
	//if (this.lmbsIsCasting() && this._lmbs_Casting[1] < 70) {return false};
	if (this.lmbsIsCasting() && !this.isDead()) {return false};
	return true;
};

//==============================
// * Lmbs Is Acting Guard Mode
//==============================
Game_Battler.prototype.lmbsIsActingGuardMode = function() {
    if (!this.lmbsIsActing()) {return false};
	if (!this._lmbs_ActionUser[5]) {return false};
	return true;
};

//==============================
// * Lmbs Is Knockbacking
//==============================
Game_Battler.prototype.lmbsUpdateKnockback = function() {
	this._lmbs_Knockback[2]--;
	this._lmbs_Knockback[4]++;
	var gpower = this._lmbs_Knockback[1] == 2 ? this.lmbsGravityPower() : this.lmbsGravityPower() / 2;
	if (this.lmbsCanFly()) {gpower = this._lmbs_Knockback[1] == 2 ? this.lmbsGravityPower() : 1;}
	var gpower2 = this._lmbs_Knockback[1] == 2 ? this.lmbsGravityPower() : 3;
	if (this._lmbs_Knockback[4] < 15) {
		this._lmbs_Y -= this.lmbsCanFly() ? -gpower2 : 2;
		if (this._lmbs_Y < $gameSystem._lmbsGroundHeight) {
		    this._lmbs_X -= this._lmbs_Direction === 2 ? -2 : 2;
	    }
	} else if (this._lmbs_Knockback[4] < 25) {
	    this._lmbs_X -= this._lmbs_Direction === 2 ? -2 : 2;
		this._lmbs_Y += gpower;
	} else {
		this._lmbs_Y += gpower;
	};
	if (this._lmbs_Knockback[2] <= 0) { 
	    this._lmbs_Knockback[1] = 0;
		this._lmbs_Knockback[2] = 0;
		this._lmbs_Knockback[4] = 0;
		this._lmbs_Knockback[5] = 0;
		this.lmbsSetTarget();
    };
};

//==============================
// * Lmbs Update Action
//==============================
Game_Battler.prototype.lmbsUpdateAction = function() {
	this._lmbs_ActionUser[2] --;
	if (this.lmbsCanFly() && this.lmbsIsNormaAttack())this.lmbsUpdateFlyNormalAttack();
	if (this._lmbs_ActionUser[2] <= 0) {
		this._lmbs_wait = 5;
		this.lmbsActionUserClear();
	};
};


//==============================
// * Lmbs Update Fly Normal Atk
//==============================
Game_Battler.prototype.lmbsUpdateFlyNormalAttack = function() {
      this._lmbs_X -= this._lmbs_Direction === 2 ? 2 : -2;
	  if (this._lmbs_Y < this._lmbs_target._lmbs_Y) {
		  this._lmbs_Y += 3;
	  } else if (this._lmbs_Y - this.lmbsBodyHeight() > this._lmbs_target._lmbs_Y) {
		  this._lmbs_Y -= 3;
	  };
};

//==============================
// * Lmbs Pose Name
//==============================
Game_Battler.prototype.lmbsPoseName = function() {
   return this._lmbs_ActionUser[1];
};

//==============================
// * Notetags
//==============================
Game_Battler.prototype.notetags = function() {
	if (this.isEnemy()) {return this.enemy().note.split(/[\r\n]+/)};
	if (this.isActor()) {return this.actor().note.split(/[\r\n]+/)};
};

//==============================
// * lmbs Sprite Name
//==============================
Game_Battler.prototype.lmbsSpriteName = function() {
	return this._lmbs_bname;
};

//==============================
// * lmbs Width
//==============================
Game_Battler.prototype.lmbsWidth = function() {
	return this._lmbs_SpriteSize[0];
};

//==============================
// * lmbs Height
//==============================
Game_Battler.prototype.lmbsHeight = function() {
	return this._lmbs_SpriteSize[1];
};

//==============================
// * lmbs Body Width
//==============================
Game_Battler.prototype.lmbsBodyWidth = function() {
	var r = (this.lmbsWidth() / 2) - 24;
	return Math.min(Math.max(r,24),this.lmbsWidth());
};

//==============================
// * lmbs Body Height
//==============================
Game_Battler.prototype.lmbsBodyHeight = function() {
	var r = this.lmbsHeight() - 24;
	return Math.min(Math.max(r,24),this.lmbsHeight());
};

//==============================
// * lmbs RangeX1
//==============================
Game_Battler.prototype.lmbsRangeX1 = function() {
	return this._lmbs_X - this.lmbsBodyWidth();
};

//==============================
// * lmbs RangeX2
//==============================
Game_Battler.prototype.lmbsRangeX2 = function() {
	return this._lmbs_X + this.lmbsBodyWidth();
};

//==============================
// * lmbs RangeY1
//==============================
Game_Battler.prototype.lmbsRangeY1 = function() {
	return this._lmbs_Y - this.lmbsBodyHeight();
};

//==============================
// * lmbs RangeY2
//==============================
Game_Battler.prototype.lmbsRangeY2 = function() {
	return this._lmbs_Y;
};

//==============================
// * lmbs In Range
//==============================
Game_Battler.prototype.lmbsInRange = function(posX1,posX2,posY1,posY2) {
    if (posX1 > this.lmbsRangeX2()) {return false};
	if (posX2 < this.lmbsRangeX1()) {return false};
	if (posY1 < this.lmbsRangeY1()) {return false};
	if (posY2 > this.lmbsRangeY2()) {return false};
	return true;
};

//==============================
// * lmbs Move Speed
//==============================
Game_Battler.prototype.lmbsMoveSpeed = function() {
	if (this.lmbsIsAirDashing()) {return this._lmbs_MoveSpeed * 3}
	if (this.lmbsIsDashing()) {return this._lmbs_MoveSpeed * 2}
	return this._lmbs_MoveSpeed;
};

//==============================
// * lmbs Can Flying
//==============================
Game_Battler.prototype.lmbsCanFly = function() {
    return this._lmbs_Flying[0];
};

//==============================
// * lmbs Can Dash
//==============================
Game_Battler.prototype.lmbsCanDash = function() {
	if (this.lmbsGroundHeight() != this._lmbs_Y && !this.lmbsCanFly()) {return false};
	if (!this._lmbs_Dash[0]) {return false};
    return true;
};

//==============================
// * lmbs IsAction Height Min
//==============================
Game_Battler.prototype.lmbsIsActionHeightMin = function() {
    return (this.lmbsGroundHeight() - this._lmbs_Y) > 40;
};

//==============================
// * lmbs Can Air Dash
//==============================
Game_Battler.prototype.lmbsCanAirDash = function() {
	if (!this._lmbs_AirDash[0]) {return false};
	if (this._lmbs_AirDash[1]) {return false}
	if (this.lmbsIsGuardknockback()) {return false};
	if (this.lmbsIsGuarding()) {return false};
	if (!this.lmbsIsActionHeightMin()) {return false};
	if (this.lmbsIsActing()) {return false};
	if (this.lmbsIsCasting()) {return false};
	if (this.lmbsIsKnockbacking()) {return false};
	if (!this.lmbsAllowMovement()) {return false};
    return true;
};

//==============================
// * lmbs Can Jump
//==============================
Game_Battler.prototype.lmbsCanJump = function() {
	if (this._lmbs_wait > 0) {return false};
	if (!this._lmbs_Jump[0]) {return false};
	if (this._lmbs_Jump[1]) {return false};
	if (this.lmbsIsKnockbacking()) {return false};
	if (this.lmbsIsGuardknockback()) {return false};
	if (this.lmbsIsGuarding()) {return false};
	if (this.lmbsIsActing()) {return false};
	if (this.lmbsIsCasting()) {return false};
	if (!this.lmbsAllowMovement()) {return false};
	if (!this.canMove()) {return false};
    return true;	
};

//==============================
// * lmbs Can Double Jump
//==============================
Game_Battler.prototype.lmbsCanDoubleJump = function() {
	if (!this._lmbs_Jump[0]) {return false};
	if (!this._lmbs_DoubleJump[0]) {return false};
	if (this._lmbs_DoubleJump[1]) {return false};
	if (this._lmbs_Jump[3] > 0) {return false};
	if (this.lmbsIsGuardknockback()) {return false};
	if (this.lmbsIsKnockbacking()) {return false};
	if (this.lmbsIsActing()) {return false};
	if (this.lmbsIsCasting()) {return false};
	if (!this.lmbsAllowMovement()) {return false};
	if (!this.canMove()) {return false};
	return true
};

//==============================
// * lmbs Move
//==============================
Game_Battler.prototype.lmbsMove = function(d) {
	if (!this.lmbsCanMove()) {return};
	this._lmbs_Walking = true;
	if (!this.lmbsIsActing()) {this._lmbs_Direction = d};
    this.lmbsMoveTo(d);
};

//==============================
// * lmbs Allow Movement
//==============================
Game_Battler.prototype.lmbsAllowMovement = function() {
    return this._lmbs_Movement;	
};

//==============================
// * lmbs Move To
//==============================
Game_Battler.prototype.lmbsMoveTo = function(d) {
	if (!this.lmbsAllowMovement()) {return};
	if (d === 0) {this._lmbs_Y -= this.lmbsMoveSpeed()};
    if (d === 1) {this._lmbs_Y += this.lmbsMoveSpeed()};
    if (d === 2) {this._lmbs_X -= this.lmbsMoveSpeed()};
	if (d === 3) {this._lmbs_X += this.lmbsMoveSpeed()};
	if (this.lmbsCanEscape(d)) {this.lmbsEscapeRate()};
	this.lmbsCheckScreenLimit();
};

//==============================
// * lmbs Can Escape Rate
//==============================
Game_Battler.prototype.lmbsEscapeRate = function() {
   $gameTemp._lmbsEscape[0] += 7;
   if ($gameTemp._lmbsEscape[0] >= $gameTemp._lmbsEscape[1]) {
	   $gameTemp._lmbsEscape[0] = $gameTemp._lmbsEscape[1];
	   BattleManager.lmbsProcessEscape();
   };
};

//==============================
// * lmbs Can Escape
//==============================
Game_Battler.prototype.lmbsCanEscape = function(d) {
	if (!this._lmbs_Walking ) {return false};
	if (this != BattleManager._lmbsActor) {return false};
	if (this.lmbsIsActing()) {return false};
	if (!this.lmbsCanFly() && !this.lmbsInGround()) {return false};
	if (!BattleManager.canEscape()) {return false};
	if (d === 2 && this._lmbs_X > this.lmbsMoveXL1()) {return false};
	if (d === 3 && this._lmbs_X < this.lmbsMoveXL2()) {return false};
	return true;
};

//==============================
// * Update Escape
//==============================
Game_Battler.prototype.lmbsUpdateEscape = function(d) {
    $gameTemp._lmbsEscape[0]--;
};

//==============================
// * lmbs Move
//==============================
Game_Battler.prototype.lmbsIsEscaping = function(d) {
    return $gameTemp._lmbsEscape[0] > 0;
};


//==============================
// * lmbs Can Move
//==============================
Game_Battler.prototype.lmbsCanMove = function() {
     if (!this.lmbsAllowMovement()) {return};
     if (this.lmbsIsAirDashing()) {return false};
	 if (this.lmbsIsGuarding()) {return false};
	 if (this.lmbsIsGuardknockback()) {return false};
	 if (this.lmbsIsActing()) {
		 if (!this.lmbsIsNormaAttack()) {return false};
	     if (this.lmbsIsNormaAttack() && this._lmbs_Y == this.lmbsGroundHeight()) {return false}
	 };
	 if (this.lmbsIsCasting()) {return false};
	 if (this.lmbsIsKnockbacking()) {return false};
	 if (this.lmbsForcingMove()) {return false};
	 if (this._lmbs_wait > 0) {return false};
	 if (!this.canMove()) {return false};
	 return true;
};

//==============================
// * lmbs Move
//==============================
Game_Battler.prototype.lmbsCheckScreenLimit = function() {
	this._lmbs_X = Math.min(Math.max(this._lmbs_X,this.lmbsMoveXL1()),this.lmbsMoveXL2());
	this._lmbs_Y = Math.min(Math.max(this._lmbs_Y,this.lmbsMoveYL1()),$gameSystem._lmbsGroundHeight);
};

//==============================
// * LMBS Move XL 1
//==============================
Game_Battler.prototype.lmbsMoveXL1 = function() {
	return $gameSystem._lmbsScreenSize[0] + (this._lmbs_SpriteSize[0] / 2);
};

//==============================
// * LMBS Move XL 2
//==============================
Game_Battler.prototype.lmbsMoveXL2 = function() {
	return $gameSystem._lmbsScreenSize[1] - (this._lmbs_SpriteSize[0] / 2);
};

//==============================
// * LMBS Move YL 1
//==============================
Game_Battler.prototype.lmbsMoveYL1 = function() {
	return $gameSystem._lmbsScreenSize[2] + (this._lmbs_SpriteSize[1] / 2);
};

//==============================
// * LMBS Move XL 2
//==============================
Game_Battler.prototype.lmbsMoveYL2 = function() {
	return $gameSystem._lmbsScreenSize[3] - (this._lmbs_SpriteSize[1] / 2);
};

//==============================
// * LMBS Gravity Power
//==============================
Game_Battler.prototype.lmbsGravityPower = function() {
	return this._lmbs_Gravity[1];
};

//==============================
// * LMBS Ground Height
//==============================
Game_Battler.prototype.lmbsGroundHeight = function() {
	if (this.lmbsCanFly() && !this.lmbsIsKnockbacking() && this.canMove() && !this.lmbsIsActing()) {return $gameSystem._lmbsGroundHeight - this._lmbs_Flying[2]};
	return $gameSystem._lmbsGroundHeight;
};

//==============================
// * LMBS In Ground
//==============================
Game_Battler.prototype.lmbsInGround = function() {
	return this._lmbs_Y == $gameSystem._lmbsGroundHeight;
};

//==============================
// * LMBS Is Acting
//==============================
Game_Battler.prototype.lmbsIsActing = function() {
   	 if (this.lmbsIsCasting()) {return false};
	 if (this._lmbs_ActionUser[2] > 0) {return true};
	 return false;
};

//==============================
// * LMBS Can Guarding
//==============================
Game_Battler.prototype.lmbsCanGuard = function() {
	 if (!this._lmbs_Guard[0]) {return false};
	 if (this.lmbsIsActing()) {return false};
	 if (this.lmbsIsCasting()) {return false};
	 if (this.lmbsIsKnockbacking()) {return false};
	 if (!this.lmbsCanFly()) {
		 if (this._lmbs_Y != this.lmbsGroundHeight()) {return false};
	 };
	 return true;
};

//==============================
// * LMBS Is Guarding
//==============================
Game_Battler.prototype.lmbsIsGuarding = function() {
	 return this._lmbs_Guard[1];
};

//==============================
// * LMBS Guard
//==============================
Game_Battler.prototype.lmbsGuard = function() {
	 if (!this.lmbsCanGuard()) {return};
	 this._lmbs_Guard[1] = true;
};

//==============================
// * lmbs Is Walking
//==============================
Game_Battler.prototype.lmbsIsWalking = function() {
	return this._lmbs_Walking;
};

//==============================
// * LMBS Is Dashing
//==============================
Game_Battler.prototype.lmbsIsDashing = function() {
	 if (!this._lmbs_Dash[0]) {return false};
	 if (this._lmbs_Dash[1]) {
		 if (this.lmbsCanFly()) {return true};
		 if (this.lmbsGroundHeight() === this._lmbs_Y) {return true};
	 };
	 if (this._lmbs_Dash[2]) {return true};
	 return false;
};

//==============================
// * LMBS Update Dash
//==============================
Game_Battler.prototype.lmbsUpdateDash = function() {
	 if (!this.lmbsCanDash()) {return};
	 this._lmbs_Dash[1] = true;
};


//==============================
// * LMBS Is Jumping
//==============================
Game_Battler.prototype.lmbsIsJumping = function() {
     if (this._lmbs_Jump[3] > 0) {return true};
	 return false;
};

//==============================
// * LMBS Is Double Jumping
//==============================
Game_Battler.prototype.lmbsIsDoubleJumping = function() {
     if (this._lmbs_DoubleJump[3] > 0) {return true};
	 return false;
};

//==============================
// * LMBS Update Jump
//==============================
Game_Battler.prototype.lmbsUpdateJump = function() {
    this._lmbs_Jump[3] --;
	this._lmbs_Y -= this.lmbsGravityPower();
	if (this._lmbs_Y <= this.lmbsMoveYL1()) {this._lmbs_Jump[3] = 0};
};

//==============================
// * LMBS Update Double Jump
//==============================
Game_Battler.prototype.lmbsUpdateDoubleJump = function() {
    this._lmbs_DoubleJump[3] --;
	this._lmbs_Y -= this.lmbsGravityPower() + 2;
	if (this._lmbs_Y <= this.lmbsMoveYL1()) {this._lmbs_DoubleJump[3] = 0};
};

//==============================
// * LMBS Is Jumping
//==============================
Game_Battler.prototype.lmbsJump = function() {
    if (this.lmbsCanJump()) {
		if (this.lmbsIsDashing()) {this._lmbs_Dash[2] = true};
	    this._lmbs_Jump[1] = true;
	    this._lmbs_Jump[3] = this._lmbs_Jump[2];
	} else if (this.lmbsCanDoubleJump()) {
		this._lmbs_Jump[3] = 0;
		this._lmbs_Dash[1] = false;
		this._lmbs_Dash[2] = false;
	    this._lmbs_DoubleJump[1] = true;
	    this._lmbs_DoubleJump[3] = this._lmbs_DoubleJump[2];
		this.startAnimation(Moghunter.lmbsJumpAnimationID,false,0)	 
	};
};

//==============================
// * lmbs Update Air Dashing
//==============================
Game_Battler.prototype.lmbsUpdateAirDashing = function() {
    this._lmbs_AirDash[3] --;
	this.lmbsMoveTo(this._lmbs_Direction);
};

//==============================
// * lmbs Air Dash
//==============================
Game_Battler.prototype.lmbsAirDash = function() {
	 if (!this.lmbsCanAirDash()) {return};
     this._lmbs_Jump[1] = true;
	 this._lmbs_Jump[3] = 0;
	 this._lmbs_Dash[2] = false;	 
	 this._lmbs_AirDash[1] = true;
	 this._lmbs_AirDash[3] = this._lmbs_AirDash[2];
	 var mirror = this._direction === 2 ? true : false; 
	 this.startAnimation(Moghunter.lmbsAirDashAnimationID,mirror,0);
};

//==============================
// * lmbs Is Air Dashing
//==============================
Game_Battler.prototype.lmbsIsAirDashing = function() {
     if (!this._lmbs_AirDash[1]) {return false};
	 if (this._lmbs_AirDash[3] <= 0) {return false};
	 return true;
};

//==============================
// * LMBS Air Dash Clear
//==============================
Game_Battler.prototype.lmbsAirDashClear = function() {
	this._lmbs_AirDash[1] = false;
	this._lmbs_AirDash[3] = false;
};

//==============================
// * LMBS Jump Clear
//==============================
Game_Battler.prototype.lmbsJumpClear = function() {
	this._lmbs_Jump[1] = false;
	this._lmbs_Jump[3] = 0;
	this._lmbs_Dash[2] = false;
};

//==============================
// * LMBS Double Jump Clear
//==============================
Game_Battler.prototype.lmbsDoubleJumpClear = function() {
	this._lmbs_DoubleJump[1] = false;
	this._lmbs_DoubleJump[3] = 0;
};

//==============================
// * LMBS Gravity Clear
//==============================
Game_Battler.prototype.lmbsGravityClear = function() {
	this.lmbsJumpClear();
	this.lmbsDoubleJumpClear();
	this.lmbsAirDashClear();
	this._lmbs_AerialActionDone = false;
};

//==============================
// * LMBS Motion Clear
//==============================
Game_Battler.prototype.lmbsMotionClear = function() {
	this._lmbs_Dash[1] = false;
	this.lmbsActionUserClear();
	this.lmbsGravityClear();
};

//==============================
// * LMBS Allow Gravity
//==============================
Game_Battler.prototype.lmbsAllowGravity = function() {
	 if (this._lmbs_Y === this.lmbsGroundHeight()) {return false};
     if (this.lmbsIsJumping()) {return false};
	 if (this.lmbsIsDoubleJumping()) {return false};
	 if (this.lmbsIsAirDashing()) {return false};
	 if (this.lmbsForcingMove()) {return false};
	 if (this.lmbsIsKnockbacking()) {return false};
	 if (this.lmbsIsActing() && this.lmbsCanFly()) {return false};
	 if (this.lmbsIsActing() && !this.lmbsIsNormaAttack() && this.lmbsIsSkillType()) {return false};
	 if (!this.lmbsAllowMovement()) {return false};
	 return true;
};

//==============================
// * LMBS Update Gravity Effect
//==============================
Game_Battler.prototype.lmbsUpdateGravityEffect = function() {
     if (this.lmbsCanFly()) {
        this.lmbsUpdateGravityAerialType();
	 } else {
        this.lmbsUpdateGravityGroundType();
	 };
};

//==============================
// * LMBS Update Aerial Type
//==============================
Game_Battler.prototype.lmbsUpdateGravityAerialType = function() {
     if (this._lmbs_Y < this.lmbsGroundHeight()) {
	     this._lmbs_Y += this.lmbsGravityPower() / 2;
	     if (this._lmbs_Y >= this.lmbsGroundHeight()) {
             this.lmbsScreenLimitClear();
		  };
	 } else if (this._lmbs_Y > this.lmbsGroundHeight()) { 
		 this._lmbs_Y -= this.lmbsGravityPower() / 2;
	     if (this._lmbs_Y <= this.lmbsGroundHeight()) {
             this.lmbsScreenLimitClear();
		 };		  
	 };
};

//==============================
// * LMBS Update Ground Type
//==============================
Game_Battler.prototype.lmbsUpdateGravityGroundType = function() {
     if (this._lmbs_Y < this.lmbsGroundHeight()) {
	     this._lmbs_Y += this.lmbsGravityPower();
	     if (this._lmbs_Y >= this.lmbsGroundHeight()) {
	         this.lmbsScreenLimitClear();  
		 };
	  };
};

//==============================
// * LMBS screen limit Clear
//==============================
Game_Battler.prototype.lmbsScreenLimitClear = function() {
      this._lmbs_Y = this.lmbsGroundHeight();
      if (this.lmbsIsActing()) {this._lmbs_wait = 6};
	  if (!this.lmbsIsCasting() && !(this.lmbsIsActing() && this.lmbsIsItemType())) {
		   this.lmbsMotionClear();
	  } else {
		  this.lmbsGravityClear();
		  this._lmbs_Dash[1] = false;				   
      };
};

//==============================
// * Add State
//==============================
var _mog_lmbs_gbat_addState = Game_Battler.prototype.addState;
Game_Battler.prototype.addState = function(stateId) {
    _mog_lmbs_gbat_addState.call(this,stateId);
	if (this.isActor() && this === BattleManager._lmbsActor) {
		if (!this.canMove()) {
		    BattleManager._lmbsActor = BattleManager.lmbsNextTarget(1,0,true);
			$gameTemp._lmbsPlayerCursor[0] = $gameTemp._lmbsPlayerCursor[1];
		};
	};
};

//==============================
// * Remove State
//==============================
var _mog_lmbs_gbat_removeState = Game_Battler.prototype.removeState;
Game_Battler.prototype.removeState = function(stateId) {
	_mog_lmbs_gbat_removeState.call(this,stateId);
	if ($gameSystem._lmbsData[0]) {
		if (this.isActor() && !BattleManager._lmbsActor) {
			 BattleManager._lmbsActor = BattleManager.lmbsNextTarget(1,0,true);
			 $gameTemp._lmbsPlayerCursor[0] = $gameTemp._lmbsPlayerCursor[1];
		};		
	};
};

//==============================
// * LMBS Update Battler
//==============================
Game_Battler.prototype.lmbsUpdateBattler = function() {
	if (this._lmbs_wait > 0) {this._lmbs_wait--};
	if (this._lmbs_Hit[1] > 0) {this._lmbs_Hit[1]--}
	if (this.lmbsAllowGravity()) {this.lmbsUpdateGravityEffect();
	 } else {
         if (this.lmbsIsJumping()) {this.lmbsUpdateJump()};
		 if (this.lmbsIsDoubleJumping()) {this.lmbsUpdateDoubleJump()}; 
		 if (this.lmbsIsAirDashing()) {this.lmbsUpdateAirDashing()}; 
	 };
	 if (this.lmbsNeedForceMove()) {this.lmbsUpdateForceMove()};
	 if (!this.lmbsCanFly() && this._lmbs_Y >= this.lmbsGroundHeight()) {
		 this._lmbs_Y = this.lmbsGroundHeight();
		 this.lmbsGravityClear();
		 
	 };
	 if (this.lmbsIsKnockbacking()) {this.lmbsUpdateKnockback()};
	 if (this.lmbsIsInvunerable()) {this._lmbs_Knockback[3]--};
	 if (this.lmbsIsInvunerableMiss()) {this._lmbs_Knockback[5]--};
	 if (this.lmbsIsActing()) {this.lmbsUpdateAction()};
	 if (this.lmbsIsCasting()) {this.lmbsUpdateCasting()};
	 if (this.lmbsCanUpdateAI()) {this.lmbsUpdateAI()};
	 if (this.lmbsIsGuardknockback()) {this.lmbsUpdateGuard()};
	 this.lmbsCheckScreenLimit();
};

//=============================================================================
// ****** Game Actor **********************************************************
//=============================================================================

//==============================
// * Setup
//==============================
var _mog_lmbs_gAct_setup = Game_Actor.prototype.setup;
Game_Actor.prototype.setup = function(actorId) {
	_mog_lmbs_gAct_setup.call(this,actorId);
	this.lmbsSetParametersTags();	
};

//=============================================================================
// ****** Game Enemy **********************************************************
//=============================================================================

//==============================
// * Setup
//==============================
var _mog_lmbs_gEnemy_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
    _mog_lmbs_gEnemy_setup.call(this,enemyId, x, y)
    this.lmbsSetParametersTags();
};

//==============================
// * Lmbs Can Update AI
//==============================
Game_Battler.prototype.lmbsCanUpdateAI = function() {
	if (!this._lmbs_target) {return false};
	if (this === BattleManager._lmbsActor) {return false};
	if (this.lmbsIsKnockbacking()) {return false};
	if (this.lmbsIsActing()) {return false};
	if (this.lmbsIsCasting()) {return false};
	if (this.lmbsIsGuardknockback()) {return false};
	if (this.lmbsIsGuarding()) {return false};
	if (!this.canMove()) {return false};
	if (BattleManager.lmbsIsEndPhase()) {return false};
	if (BattleManager.isBattleEnd()) {return false};
	return true;
};

//==============================
// * LMBS Make Skill List
//==============================
Game_Battler.prototype.lmbsMakeSkillList = function() {
	this._lmbsAISkillList = [];
	this._lmbsAISkillGround = [[[],[]],[[],[]]];
	this._lmbsAISkillAerial = [[[],[]],[[],[]]];
	if (this.isActor()){
		for (var i = 0; i < this._lmbs_skills.length; i++) {
			var skillId = this._lmbs_skills[i];
			if (skillId) {
				var skill = $dataSkills[skillId];
				if (skill) {this._lmbsAISkillList.push(skill)};
			};
		};
	} else {
		for (var i = 0; i < this.enemy().actions.length; i++) {
			var skillId = this.enemy().actions[i].skillId;
			var skill = $dataSkills[skillId];
			if (skill) {this._lmbsAISkillList.push(skill)};
		};
	};
    this.lmbsMakeSkillListType();
};

//==============================
// * LMBS Make Skill List Type
//==============================
Game_Battler.prototype.lmbsMakeSkillListType = function() {
	var ground = [];
	var aerial = [];	
	var position = "projectile";
	var duration = 30;
	var movement = [0,0];
	var area = [24,24,24,24];
	var userMovement = [0,0];
	var skillType = "free";
	var poseSpeed = 8;
	
	for (var i = 0; i < this._lmbsAISkillList.length; i++) {
		var skill = this._lmbsAISkillList[i];
		var item_notes = skill.note.split(/[\r\n]+/);
		
		item_notes.forEach(function(note) {
		 var note_data = note.split(': ')
		 if (note_data[0].toLowerCase() == "lmbs skill type"){			 
             var par = note_data[1].split(':');
			 skillType = String(par[0]);
	         };					
		 if (note_data[0].toLowerCase() == "lmbs mode"){
		     var par = note_data[1].split(':');
		     position = String(par[0]);
		 };	
	
		 if (note_data[0].toLowerCase() == "lmbs area"){			 
             var par = note_data[1].split(':');
			 area = [Number(par[0]),Number(par[1]),Number(par[2]),Number(par[3])];
         };		 
		 if (note_data[0].toLowerCase() == "lmbs projectile motion"){			 
             var par = note_data[1].split(':');
			 movement = [Number(par[0]),Number(par[1])];
         };			
		 if (note_data[0].toLowerCase() == "lmbs pose duration"){			 
             var par = note_data[1].split(':');
			 poseDuration = Number(par[0]);
         };		
		 if (note_data[0].toLowerCase() == "lmbs user motion"){			 
             var par = note_data[1].split(':');
			 userMovement = [Number(par[0]),Number(par[1])];
         };
 		 },this);
		 
		 
		 
		
	    //---------------------------------------------------------------
		if (skillType.toLowerCase() == "ground") {
			  if (position.toLowerCase() == "user") {
				  if (this.lmbsIsSupportSkill(skill,position)) {
				      this._lmbsAISkillGround[1][0].push(skill);
				  } else {				  
				  this._lmbsAISkillGround[0][0].push(skill);
				  };
			  } else {
				  if (this.lmbsIsSupportSkill(skill,position)) {
				      this._lmbsAISkillGround[1][0].push(skill);
				  } else {
					  this._lmbsAISkillGround[1][1].push(skill);
				  };		
			  };
		} else if (skillType.toLowerCase() == "aerial") {
			  if (position.toLowerCase() == "user") {
				  if (this.lmbsIsSupportSkill(skill,position)) {
				     this._lmbsAISkillAerial[1][0].push(skill);
				  } else {
					 this._lmbsAISkillAerial[0][0].push(skill);
				  };
			  } else {
				  if (this.lmbsIsSupportSkill(skill,position)) {
				      this._lmbsAISkillAerial[1][0].push(skill);
				  } else {
					  this._lmbsAISkillAerial[1][1].push(skill);
				  };		
			  };		
		} else {
		  if (position.toLowerCase() == "user") {
				  if (this.lmbsIsSupportSkill(skill,position)) {
					  this._lmbsAISkillGround[1][0].push(skill);
				      this._lmbsAISkillAerial[1][0].push(skill);
				  } else {			  
   			          this._lmbsAISkillGround[0][0].push(skill);
				      this._lmbsAISkillAerial[0][0].push(skill);
				  };
			  } else {
				  if (this.lmbsIsSupportSkill(skill,position)) {
					  this._lmbsAISkillGround[1][0].push(skill);
				      this._lmbsAISkillAerial[1][0].push(skill);
				  } else {
					  this._lmbsAISkillGround[1][1].push(skill);
					  this._lmbsAISkillAerial[1][1].push(skill);
				  };		
			  };
		};
		//---------------------------------------------------------------
	};
};

//==============================
// * LMBS Support Skill
//==============================
Game_Battler.prototype.lmbsIsSupportSkill = function(skill,position) {
	var support = false;
	
    if (position.toLowerCase() === "auto target" || position.toLowerCase() === "auto target area" ||
	    skill.scope === 8) {

		if (skill.damage.type === 3) {support = true};
		for (var i = 0; i < skill.effects.length; i++) {
		   if (skill.effects[i].code === 11) {support = true};
		};


	};
	if (skill.damage.type === 1) {support = false};
	if (skill.damage.type === 5) {support = false};
	return support
};

//==============================
// * LMBS Ground Skill Short
//==============================
Game_Battler.prototype.lmbsGroundSkillShort = function() {
	return this._lmbsAISkillGround[0][0];
};

//==============================
// * LMBS Ground Skill Long
//==============================
Game_Battler.prototype.lmbsGroundSkillLong = function() {
	return this._lmbsAISkillGround[1][1];
};

//==============================
// * LMBS Ground Skill Support
//==============================
Game_Battler.prototype.lmbsGroundSkillSupport = function() {
	return this._lmbsAISkillGround[1][0];
};

//==============================
// * LMBS Aerial Skill Short
//==============================
Game_Battler.prototype.lmbsAerialSkillShort = function() {
	return this._lmbsAISkillAerial[0][0];
};

//==============================
// * LMBS Aerial Skill Long
//==============================
Game_Battler.prototype.lmbsAerialSkillLong = function() {
	return this._lmbsAISkillAerial[1][1];
};

//==============================
// * LMBS Aerial Skill Support
//==============================
Game_Battler.prototype.lmbsAerialSkillSupport = function() {
	return this._lmbsAISkillAerial[1][0];
};

//==============================
// * Lmbs Update Move to Target
//==============================
Game_Battler.prototype.lmbsUpdateMovetoTarget = function() {
	if (this.lmbsNeedMovetoTarget()) {
		if (this._lmbs_X > this._lmbs_target._lmbs_X) {
			this.lmbsMove(2);			
		} else if (this._lmbs_X < this._lmbs_target._lmbs_X) {
			this.lmbsMove(3);
		};
	} else {
		if (this._lmbsAIAction[0] < (this.lmbsActionFrequence() / 2)) {
			this.lmbsAIexecuteAction();
		};
	    this.lmbsSetNextMovement();
    };
	if (!this.lmbsIsJumping()) {this._lmbsAIMovement[1]--};
	if (this._lmbsAIMovement[1] <= 0) {this.lmbsSetNextMovement()};
};

//==============================
// * Lmbs Turn To Target
//==============================
Game_Battler.prototype.lmbsTurntoTarget = function() {
	if (this === BattleManager._lmbsActor) {return};
	if (!this._lmbs_target || this._lmbs_ForcedAction) {return};
	if (this._lmbs_X > this._lmbs_target._lmbs_X) {
		this._lmbs_Direction = 2;		
	} else if (this._lmbs_X < this._lmbs_target._lmbs_X) {
		this._lmbs_Direction = 3;
	};
};

//==============================
// * Lmbs long Range
//==============================
Game_Battler.prototype.lmbslongRange = function() {
   if (Math.abs(this._lmbs_X - this._lmbs_target._lmbs_X) < 300) {return false};
   return true
};

//==============================
// * Lmbs Check Range
//==============================
Game_Battler.prototype.lmbsRange = function(range) {
   if (Math.abs(this._lmbs_X - this._lmbs_target._lmbs_X) <= range) {return true};
   return false;
};

//==============================
// * Lmbs Need Move to Target
//==============================
Game_Battler.prototype.lmbsNeedMovetoTarget = function() {
   if (Math.abs(this._lmbs_X - this._lmbs_target._lmbs_X) < this._lmbsTargetRange1()) {return false};
   return true
};

//==============================
// * Lmbs Target Range 1
//==============================
Game_Battler.prototype._lmbsTargetRange1 = function() {
   return this.lmbsBodyWidth() + this._lmbs_target.lmbsBodyWidth();
};

//==============================
// * Lmbs Set Target
//==============================
Game_Battler.prototype.lmbsSetTarget = function() {
	if (this.isActor()) {
		targets = $gameTroop.aliveMembers();
	} else {
		targets = $gameParty.aliveMembers();
	};
	var members = [];
	for (var i = 0; i < targets.length; i++) {
		var range = Math.abs(this._lmbs_X - targets[i]._lmbs_X);
		members[i] = [range,targets[i]];
	};
	members.sort(function(a, b){return a[0]-b[0]});
	if (members[0] && members[0][1]) {this._lmbs_target = members[0][1]};
	this.lmbsTurntoTarget();
};

//==============================
// * Lmbs Update Movement
//==============================
Game_Battler.prototype.lmbsUpdateMovement = function() {
	if (this._lmbsAIMovement[0] < 4) {
	    this.lmbsUpdateMovetoTarget();
	} else {
	    this.lmbsUpdateRandomMove();
	};
	if (this.lmbsIsJumping()) {this.lmbsAIUpdateJumping()};	
	if (this.lmbsRange(250)) {this._lmbs_Dash[1] = false};
    if (this._lmbs_X >= this.lmbsMoveXL2()) {this.lmbsSetNextMovement()};
    if (this._lmbs_X <= this.lmbsMoveXL1()) {this.lmbsSetNextMovement()};	
};

//==============================
// * Lmbs AI Update Jumping
//==============================
Game_Battler.prototype.lmbsAIUpdateJumping = function() {
	if (this._lmbs_Jump[3] === 2 || this._lmbs_Y <= (this._lmbs_target._lmbs_Y - 32)) {
		this.lmbsAIexecuteAction();
	};
};

//==============================
// * Lmbs Update Random
//==============================
Game_Battler.prototype.lmbsUpdateRandomMove = function() {
    if (this._lmbsAIMovement[2] != 0) {this.lmbsMove(this._lmbsAIMovement[2])};
	if (!this.lmbsIsJumping() && !this.lmbsIsActing()) {this._lmbsAIMovement[1]--};
	if (this._lmbsAIMovement[1] <= 0) {this.lmbsSetNextMovement()};
};

//==============================
// * Lmbs Set Next Movement
//==============================
Game_Battler.prototype.lmbsSetNextMovement = function() {
	this._lmbsAIMovement[0]++;
	if (this._lmbsAIMovement[0] > 4) {this._lmbsAIMovement[0] = 0};
	if (this._lmbsAIMovement[0] <= 1 && this.lmbsAINeedJump()) {this.lmbsJump();};
	this._lmbsAIMovement[1] = this.lmbsAIMoveFrequence();
    if (this._lmbsAIMovement[0] === 4) {
		this.lmbsSetRandomMove();
		this._lmbs_Dash[1] = false;
	} else {
		this._lmbs_Dash[1] = this.lmbslongRange(); 
	} ; 
	if (this._lmbsAIMovement[0] === 3) {
	   if (this.lmbsNeedSupportAction()) {
		   this.lmbsAIexecuteAction();
	   } else if (this.lmbsAINeedJump()) {
	   };
	};
	this.lmbsSetTarget();
}; 

//==============================
// * Lmbs Set Random Move
//==============================
Game_Battler.prototype.lmbsSetRandomMove = function() {
	this._lmbs_Dash[1] = false;
    this._lmbsAIMovement[1] = this.lmbsAIMoveFrequence();
	this._lmbsAIMovement[2] = 0;
	var r = Math.randomInt(3);
	this._lmbsAIMovement[2] = r === 1 ? 2 : 3;
	if (r === 0) {this._lmbsAIMovement[2] = 0};
};
	
//==============================
// * Lmbs Set execute Action
//==============================
Game_Battler.prototype.lmbsAIexecuteAction = function() {
	 this._lmbsActionTarget = null;
     this._lmbsAIAction[0] = 60;
	 this.lmbsTurntoTarget();
	 var actionID = this.lmbsSelectActionID();
	 if (!actionID) {return};
	 if (this._lmbs_Jump[3]  > 5) {this._lmbs_Jump[3] = 5};
	 this.lmbsAction(actionID,0,this._lmbsActionTarget);	 
	 this._lmbsAIAction[0] = this.lmbsActionFrequence();
};

//==============================	
// * Lmbs Make Target
//==============================
Game_Battler.prototype.lmbsMakeTarget = function(actionID) {
	 var skill = $dataSkills[actionID];
	 return null;
}; 

//==============================	
// * Lmbs Selelect Action ID
//==============================
Game_Battler.prototype.lmbsSelectActionID = function() {
	 var skillList = this.lmbsSelectSkillList();
	 if (skillList.length === 0) {return};
	 var r = Math.randomInt(skillList.length);
	 var skillID = skillList[r].id;
     return skillID;
};

//==============================	
// * Lmbs Need Support Action
//==============================
Game_Battler.prototype.lmbsNeedSupportAction = function() {
	 var needHeal = false
	 if (this.lmbsInGround()) {
         if (this.lmbsGroundSkillSupport().length === 0) {return false};
	 } else {		 
		 if (this.lmbsAerialSkillSupport().length === 0) {return false};
	 };	
	 var members = this.lmbsMembersAlive();
	 members.sort(function(a, b){return a.hp-b.hp});	 
	 var battler = members[0];
	 if (battler.hp <= Math.floor(battler.mhp * 35 / 100)) {
	     this._lmbsActionTarget = battler;	
	     return true
 	 };
	 return false; 
};

//==============================	
// * Lmbs Members Alive
//==============================
Game_Battler.prototype.lmbsMembersAlive = function() {
	if (this.isActor()) {
	   return $gameParty.aliveMembers();
	} else {
       return $gameTroop.aliveMembers();
    };
};

//==============================	
// * Lmbs Selelect Skill List
//==============================
Game_Battler.prototype.lmbsSelectSkillList= function() {
    var skillList = [];
	var normalAttackRate = Math.randomInt(100);
	var normalAttackskill = $dataSkills[this._lmbsNormalAttackID];
    	// Need Heal Allies ---------------------------------------------------
	if (this.lmbsNeedSupportAction()) {
	    slist = this.lmbsInGround() ? this.lmbsGroundSkillSupport() : this.lmbsAerialSkillSupport();
		for (var i = 0; i < slist.length; i++) {
			var skill = slist[i];
			if (this.lmbsCanHitTarget(skill)) {skillList.push(skill)};
		};
		// Normal Attack Frequency---------------------------------------------------	
	} else if (normalAttackRate <= Moghunter.lmbsNormalAttackRate && this.lmbsCanHitTarget(normalAttackskill)) {
		        skillList.push(normalAttackskill)
                return skillList;	
		// Ground Action ------------------------------------------------------------	
    } else if (this.lmbsCanUseGroundSkill() && !this.lmbsCanFly()) {
		if (!this.lmbslongRange()) {
			for (var i = 0; i < this.lmbsGroundSkillShort().length; i++) {
				var skill = this.lmbsGroundSkillShort()[i];
				if (this.lmbsCanHitTarget(skill)) {skillList.push(skill)};
			};
			if (skillList.length === 0) {
				for (var i = 0; i < this.lmbsGroundSkillLong().length; i++) {
					var skill = this.lmbsGroundSkillLong()[i];
					if (this.lmbsCanHitTarget(skill)) {skillList.push(skill)};
				};			
			};
		} else { 
			for (var i = 0; i < this.lmbsGroundSkillLong().length; i++) {
				var skill = this.lmbsGroundSkillLong()[i];
				if (this.lmbsCanHitTarget(skill)) {skillList.push(skill)};
			};
			if (skillList.length === 0) {
				for (var i = 0; i < this.lmbsGroundSkillShort().length; i++) {
					var skill = this.lmbsGroundSkillShort()[i];
					if (this.lmbsCanHitTarget(skill)) {skillList.push(skill)};
				};			
			};		
		};
     } else {
	    // Aerial Action ------------------------------------------------------------		
		if (!this.lmbslongRange()) {
			for (var i = 0; i < this.lmbsAerialSkillShort().length; i++) {
				var skill = this.lmbsAerialSkillShort()[i];
				if (this.lmbsCanHitTarget(skill)) {skillList.push(skill)};
			};
			if (skillList.length === 0) {
				for (var i = 0; i < this.lmbsAerialSkillLong().length; i++) {
					var skill = this.lmbsAerialSkillLong()[i];
					if (this.lmbsCanHitTarget(skill)) {skillList.push(skill)};
				};			
			};
		} else { 
			for (var i = 0; i < this.lmbsAerialSkillLong().length; i++) {
				var skill = this.lmbsAerialSkillLong()[i];
				if (this.lmbsCanHitTarget(skill)) {skillList.push(skill)};
			};
			if (skillList.length === 0) {
				for (var i = 0; i < this.lmbsAerialSkillShort().length; i++) {
					var skill = this.lmbsAerialSkillShort()[i];
					if (this.lmbsCanHitTarget(skill)) {skillList.push(skill)};
				};			
			};			
		};
	};
	// Return Normal Attack  ----------------------------------------------------
	if (skillList.length === 0) {
		var skill = $dataSkills[this._lmbsNormalAttackID];
		if (this.lmbsCanHitTarget(skill)) {skillList.push(skill)};
	};
	return skillList;
};

//==============================
// * Lmbs can Hit Target
//==============================
Game_Battler.prototype.lmbsCanHitTarget = function(skill) {
	 this.lmbsSkillSize = [0,0,0,0];
     if (!this.canUse(skill)) {return false};
	    if (skill.id === this._lmbsNormalAttackID && this.isActor() && this.equips()[0]) {
		    skill = this.equips()[0];
		};
	    if (this.lmbsCanFly() && skill.id === this._lmbsNormalAttackID) {;  
		    if (Math.abs(this._lmbs_target._lmbs_X - this._lmbs_X) < 120 && 
			    Math.abs(this._lmbs_target._lmbs_Y - this._lmbs_Y) < 320) {return true};
		};
	    //-------------------------------------------------------------------------------
	    //-------------------------------------------------------------------------------
		//-------------------------------------------------------------------------------
		var item_notes = skill.note.split(/[\r\n]+/);	
		item_notes.forEach(function(note) {
		 var note_data = note.split(': ')
		 if (note_data[0].toLowerCase() == "lmbs duration"){			 
             var par = note_data[1].split(':');
			 duration = Number(par[0]);
         };	
		 if (note_data[0].toLowerCase() == "lmbs area"){			 
             var par = note_data[1].split(':');
			 skillSize = [Number(par[0]),Number(par[1]),Number(par[2]),Number(par[3])];
         };		 
		 if (note_data[0].toLowerCase() == "lmbs projectile motion"){			 
             var par = note_data[1].split(':');
			 skillMotion = [Number(par[0]),Number(par[1])];
         };			
		 if (note_data[0].toLowerCase() == "lmbs user motion"){			 
             var par = note_data[1].split(':');
			 userMotion = [Number(par[0]),Number(par[1])];
         };
		 if (note_data[0].toLowerCase() == "lmbs mode"){
		     var par = note_data[1].split(':');
		     position = String(par[0]);
		 };		 
 		 },this);	
		 
		 if (position.toLowerCase() === "auto target" || position.toLowerCase() === "auto target area") {		  
		    return true;	  
		 };
		 this._lmbsSkillSize = skillSize;
         var hit = false
		 
		 // ************************************************************************
		 // Projectile
		 // ************************************************************************
		 var motionXY = position.toLowerCase() == "user" ? userMotion : skillMotion; 
		 var xd = this._lmbs_Direction === 3 ? motionXY[0] : -motionXY[0];
		 var x = this._lmbs_X + Math.floor(xd * duration);
		 var y = this._lmbs_Y + Math.floor(motionXY[1] * duration);
		 // LINE -------------------------------------------------------------------
		 if (motionXY[1] === 0) {
			 if ((this.lmbsInGround() && this._lmbs_target.lmbsInGround()) ||
				 (!this.lmbsInGround() && !this._lmbs_target.lmbsInGround())) {
				 
					
					 if (xd > 0 && x >= this._lmbs_target._lmbs_X) {hit = true}; 
					 if (xd < 0 && x <= this._lmbs_target._lmbs_X) {hit = true}; 
			
			 };		 
		 };
		 // LINE VERTICAL DOWN -----------------------------------------------------
         if (xd > 0 && x >= this._lmbs_target._lmbs_X) {
	         if (y >= this._lmbs_target._lmbs_Y - this.lmbsBodyHeight()) {
				if (this._lmbs_Y < this._lmbs_target._lmbs_Y) {
			//	 	 return true;
			    };
			 };
		 } else if (xd < 0 && x <= this._lmbs_target._lmbs_Y) {
			 if (y >= this._lmbs_target._lmbs_Y - this.lmbsBodyHeight()) {
				if (this._lmbs_Y < this._lmbs_target._lmbs_Y) {
				// 	 hit = true;
			    };				 
			 };
         };
		 // LINE VERTICAL UP -----------------------------------------------------
         if (xd > 0 && x >= this._lmbs_target._lmbs_X) {
	         if (y <= this._lmbs_target._lmbs_Y - this.lmbsBodyHeight()) {
				if (this._lmbs_Y > this._lmbs_target._lmbs_Y) {
				 	 hit = true;
			    };
			 };
		 } else if (xd < 0 && x <= this._lmbs_target._lmbs_Y) {
			 if (y <= this._lmbs_target._lmbs_Y - this.lmbsBodyHeight()) {
				if (this._lmbs_Y > this._lmbs_target._lmbs_Y) {
				 	 hit = true;
			    };				 
			 };
         };			 	 		 
		 // ANY DIRECTION------------------------------------------------------------
		 var t = 8;
		 var d = Math.floor(duration / t)
		 for (var i = 0; i < t; i++) {
			 var dt = Math.floor(d * i);
			 var xr = Math.floor(xd * dt);
			 var yr = Math.floor(motionXY[1] * dt)
			 var x1 = this.lmbsX1() + xr;
			 var x2 = this.lmbsX2() + xr;
			 var y1 = this.lmbsY1() + yr;
			 var y2 = this.lmbsY2() + yr;
			 if (this._lmbs_target.lmbsInRange(x1,x2,y1,y2)) {hit = true};
		 };
     return hit;
};	

//==============================
// * X1
//==============================
Game_Battler.prototype.lmbsX1 = function() {
	if (this._lmbs_Direction === 3) {return this._lmbs_X - this._lmbsSkillSize[1]};
    return this._lmbs_X - this._lmbsSkillSize[0];
};

//==============================
// * X2
//==============================
Game_Battler.prototype.lmbsX2 = function() {
	if (this._lmbs_Direction === 3) {return this._lmbs_X + this._lmbsSkillSize[0]};
    return this._lmbs_X + this._lmbsSkillSize[1];
};

//==============================
// * Y1
//==============================
Game_Battler.prototype.lmbsY1 = function() {
    return this._lmbs_Y + this._lmbsSkillSize[2];
};

//==============================
// * Y2
//==============================
Game_Battler.prototype.lmbsY2 = function() {
    return this._lmbs_Y - this._lmbsSkillSize[3];
};

//==============================
// * Lmbs AI Need Jump
//==============================
Game_Battler.prototype.lmbsAINeedJump = function() {
	 if (this.lmbsCanFly()) {return false};
	 if (this._lmbs_Y != this.lmbsGroundHeight()) {return false};
	 if (this._lmbs_target.lmbsInGround()) {return false};
	 if (this._lmbs_target.lmbsInGround()) {return false};
	 if (!this.lmbsRange(300)) {return false}; 
     return true;
};	

//==============================
// * Lmbs Set Ai Guard
//==============================
Game_Battler.prototype.lmbsSetAIGuard = function(item) {
	 var r = Math.randomInt(100);
	 this._lmbs_Guard[4] = r <= this.lmbsGuardRate() ? true : false;
};
	
//==============================
// * Lmbs Update AI Guard
//==============================
Game_Battler.prototype.lmbsUpdateAIGuard = function() {
	 if (this.lmbsAINeedGuard()) {
		 this.lmbsTurntoTarget();
		 this.lmbsGuard();
	 };
};		
	
//==============================
// * Need Guard
//==============================
Game_Battler.prototype.lmbsAINeedGuard = function() {
	 if (!this._lmbs_target.lmbsIsActing()) {return false}
     return this._lmbs_Guard[4];
};		
	
//==============================
// * Lmbs Action Frequence
//==============================
Game_Battler.prototype.lmbsActionFrequence = function() {
     return this._lmbsAIAction[2];
};	
	
//==============================
// * Lmbs Action Frequence
//==============================
Game_Battler.prototype.lmbsAIMoveFrequence = function() {	
	return this.lmbsActionFrequence() / 2;
};

//==============================
// * Lmbs Set execute Action
//==============================
Game_Battler.prototype.lmbsUpdateAIAction = function() {
	 if (this._lmbsAIAction[0] > 0 &&!this.lmbsIsJumping()) {this._lmbsAIAction[0]--;
	     if (this._lmbsAIAction[0] >= 10 && this._lmbsAIAction[0] <= 15) {
	     };
	     if (this._lmbsAIAction[0] <= 0) {this.lmbsAIexecuteAction()};
	 };
};	
	
//==============================
// * Lmbs Update AI
//==============================
Game_Battler.prototype.lmbsUpdateAI = function() {	
	this.lmbsUpdateAIAction();
    this.lmbsUpdateMovement();
    this.lmbsUpdateAIGuard();
};

//=============================================================================
// ****** Battle Manager ******************************************************
//=============================================================================

//==============================
// * init Members
//==============================
var _mog_lmbs_bmngr_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
	_mog_lmbs_bmngr_initMembers.call(this);
	if ($gameSystem._lmbsData[0]) {this.lmbsInit()};
};

//==============================
// * Lmbs Init
//==============================
BattleManager.lmbsInit = function() {
	$gameTemp._lmbsRefreshZIndex = 3;
    this._lmbsActorIndex = 0;
	this._lmbsActor = this.lmbsNextTarget(0,0,true);
	this._lmbsVictory = false;
	this._lmbsTurn = [0,Moghunter.lmbsTurnDuration];
};

//==============================
// * Start Battle
//==============================
var _mog_lmbs_bmngr_startBattle = BattleManager.startBattle;
BattleManager.startBattle = function() {
	_mog_lmbs_bmngr_startBattle.call(this);
	this.lmbsStart();
};

//==============================
// * Lmbs Start
//==============================
BattleManager.lmbsStart = function() {	
    $gameTemp._lmbsEscaped = false;
	$gameTemp._lmbsTemp = [true,0,0,0,0];
	$gameTemp._lmbsFocus = [0,0];
	$gameTemp._lmbsRefreshZIndex = 0;
	$gameTemp._lmbsTarget = [null,0,0];
	$gameTemp._lmbsSelectPhase = [false,0,0];
	$gameTemp._lmbsMenuPhase = [false,0,0,false];	
	$gameTemp._lmbsEscape = [0,500,false,false];
	$gameTemp._lmbsEndPhase = [0,0,false];
	var index = 0
    $gameParty.battleMembers().forEach(function(battler) {
		index ++;
		battler.lmbsPrepare();
        battler.lmbsSetTarget();
		battler.lmbsMakeSkillList();
		battler._lmbs_X = ($gameSystem._lmbsScreenSize[0] + 100) + (80 * index);
		battler._lmbs_Direction = 3;
		battler._lmbs_Y = battler.lmbsGroundHeight();
    });	
	var index = 0
	var enemyUnique = [];
    $gameTroop.members().forEach(function(battler) {
		index ++;
		battler.lmbsPrepare();
        battler.lmbsSetTarget();
		battler.lmbsMakeSkillList();
		battler._lmbs_X = ($gameSystem._lmbsScreenSize[1] - 100) - (80 * index);
		if ($gameSystem._lmbsBattlerOrder[0]) {
	       if (battler.screenX()) {battler._lmbs_X = battler.screenX()};
		};
		battler._lmbs_Y = battler.lmbsGroundHeight();
    });
	this.updateEventMain();
	$gameTemp._lmbsPlayerCursor[0] = $gameTemp._lmbsPlayerCursor[1] + 60;
};

//==============================
// * lmbs Make Skill List
//==============================
BattleManager.lmbsMakeSkillList = function() {
    $gameParty.battleMembers().forEach(function(battler) {
		battler.lmbsMakeSkillList();
    });	
};

//==============================
// * lmbs Casting Clear
//==============================
BattleManager.lmbsCastingClear = function() {
    $gameParty.battleMembers().forEach(function(battler) {
        battler._lmbs_Casting = [null,0];
    });
    $gameTroop.members().forEach(function(battler) {
	    battler._lmbs_Casting = [null,0];
    });	
};

//==============================
// * lmbs Center Battlers
//==============================
BattleManager.lmbsCenterBattlers = function() {
	var index = 0
	var c = $gameSystem._lmbsScreenSize[0] - $gameSystem._lmbsScreenSize[1]
	var center = Math.floor((Math.abs(c / 2) - 40 * $gameParty.battleMembers().length) - 16);
    $gameParty.battleMembers().forEach(function(battler) {
		index ++;
		battler.lmbsOnBattleEnd();
		battler._lmbs_X = center + (80 * index);
		battler._lmbs_Direction = 3;
		battler._lmbs_Y = battler.lmbsGroundHeight();
    });
};

//==============================
// * lmbs Process Escape
//==============================
BattleManager.lmbsProcessEscape = function() {
    $gameParty.removeBattleStates();
    $gameParty.performEscape();
	$gameTemp._lmbsEscaped = true;
    SoundManager.playEscape();
    this.displayEscapeSuccessMessage();
    this._escaped = true;
    this.processAbort();	
	if (Imported.MOG_BattleCry) {
	   var actor = this.randomActor();
       if (actor) {SoundManager.selectVoice(actor._v_escape)};
	};
};

//==============================
// * lmbs End Battle
//==============================
var _mog_lmbs_bngr_endBattle = BattleManager.endBattle;
BattleManager.endBattle = function(result) {
	_mog_lmbs_bngr_endBattle.call(this,result);
	this.lmbsOnBattleEnd();
};

//==============================
// * lmbs On Battle End
//==============================
BattleManager.lmbsOnBattleEnd = function() {
	$gameTemp._lmbsSelectPhase = [false,0,0];
	$gameTemp._lmbsMenuPhase = [false,0,0,false];	
	$gameTemp._lmbsEscape = [0,500,false,false];	
    $gameParty.battleMembers().forEach(function(battler) {
		battler.lmbsOnBattleEnd();
    });	
    $gameTroop.members().forEach(function(battler) {
		battler.lmbsOnBattleEnd();
    });
	$gameParty.onBattleEnd();
	$gameTemp._lmbsPlayerCursor[0] = 0;
};

//==============================
// * lmbs Next Target
//==============================
BattleManager.lmbsNextTarget = function(value,type,usable) {
	if (type === 0) {
	   var members = $gameParty.battleMembers();
	   $gameTemp._lmbsRefreshZIndex = 2;
	} else {
       var members = $gameTroop.aliveMembers();
    };
	this._lmbsActorIndex += value;
	if (this._lmbsActorIndex >= members.length) {this._lmbsActorIndex = 0};
	var actor = null;
	for (var i = this._lmbsActorIndex; i < members.length; i++) {
		if (!actor && this.lmbsActorUsable(members[i],usable)) {
		     actor = members[i];
			 this._lmbsActorIndex = i;
			 i = members.length;
		};
	};
	if (!actor) {
	for (var i = 0; i < members.length; i++) {
		if (!actor && this.lmbsActorUsable(members[i],usable)) {
		     actor = members[i];
			 this._lmbsActorIndex = i;
			 i = members.length;			 
		};
	};
	};
    return actor;
};

//==============================
// * lmbs Next Target
//==============================
BattleManager.lmbsPrevTarget = function(value,type,usable) {
	if (type === 0) {
	   var members = $gameParty.battleMembers();
	   $gameTemp._lmbsRefreshZIndex = 2;
	} else {
       var members = $gameTroop.aliveMembers();
    };
	value = 1
	this._lmbsActorIndex -= value;
	if (this._lmbsActorIndex < 0) {this._lmbsActorIndex = (members.length - 1)};
	var actor = null;
	for (var i = this._lmbsActorIndex; i >= 0; i--) {
		if (!actor && this.lmbsActorUsable(members[i],usable)) {
		     actor = members[i];
			 this._lmbsActorIndex = i;
			 i = members.length;
		};
	};
	if (!actor) {
	for (var i = members.length; i >= 0; i--) {
		if (!actor && this.lmbsActorUsable(members[i],usable)) {
		     actor = members[i];
			 this._lmbsActorIndex = i;
			 i = members.length;			 
		};
	};
	};
	return actor;
};

//==============================
// * LMBS All Battlers
//==============================
BattleManager.lmbsAllBattlers = function() {
   return $gameParty.battleMembers().concat($gameTroop.members());
};

//==============================
// * Actor Usable
//==============================
BattleManager.lmbsActorUsable = function(actor,usable) {
    if (!actor) {return false};
	if (usable && actor.isRestricted()) {return false};
	return true;
};

//==============================
// * Update
//==============================
var _mog_lmbs_bmngr_update = BattleManager.update;
BattleManager.update = function() {
	if ($gameSystem._lmbsData[0]) {this.lmbsUpdate();return};
	_mog_lmbs_bmngr_update.call(this);
};

//==============================
// * LMBS IS Busy
//==============================
BattleManager.lmbsIsBusy = function() {
   if ($gameMessage.isBusy()) {return true};
   if (Imported.MOG_BattleResult && $gameTemp._bResult[0]) {return true};
   return false;
};

//==============================
// * LMBS Update
//==============================
BattleManager.lmbsUpdate = function() {
	if ($gameTroop.isEventRunning()) {this.lmbsUpdateTurn();return};
	if (this.lmbsIsBusy()) {
		this.lmbsAllBattlers().forEach(function(battler) {
			  battler.lmbsUpdateGravityEffect();
		}, this);	
		return;
	};
	if (this._phase == 'battleEnd') {
		this.updateBattleEnd()
	} else {
		if ($gameTemp._lmbsSelectPhase[0]) {
			this.lmbsUpdateSelection();
		} else {
			this.lmbsUpdateEndPhase();
			this.lmbsAllBattlers().forEach(function(battler) {
				  this.lmbsUpdateBattler(battler);
			}, this);
			if (!this.lmbsIsEndPhase()) {
				if (this._lmbsActor) {this.lmbsUpdateActor()};
				this.lmbsUpdateTurn();
			};
		};
	};
};

//==============================
// * LMBS Update End Phase
//==============================
BattleManager.lmbsUpdateEndPhase = function() {
};

//==============================
// * LMBS is End Phase
//==============================
BattleManager.lmbsIsEndPhase = function() {
	 return $gameTemp._lmbsEndPhase[1] > 0;
};

//==============================
// * LMBS Update
//==============================
BattleManager.lmbsUpdateTurn = function() {
	this._lmbsTurn[0]++;
	if (this._lmbsTurn[0] >= this._lmbsTurn[1]) {
		this._lmbsTurn[0] = 0;
	    $gameTroop.increaseTurn();
		this.lmbsAllBattlers().forEach(function(battler) {
			battler.onTurnEnd();
			battler.startDamagePopup();
		}, this);
		this.updateEventMain();
		BattleManager.checkBattleEnd();
    };
};

//==============================
// * LMBS Update Selection
//==============================
BattleManager.lmbsUpdateSelection = function() {
	if (!$gameTemp._lmbsMenuPhase[0]) {this.lmbsUpdateAutoTarget()};	
};

//==============================
// * LMBS Update Auto Target
//==============================
BattleManager.lmbsUpdateAutoTarget = function() {
	old_target = $gameTemp._lmbsTarget[0];
	if (Input.isTriggered('cancel')) {
		$gameTemp._lmbsSelectPhase[0] = false;
	} else if (Input.isTriggered('ok')) {
    	this._lmbsActor.lmbsAction($gameTemp._lmbsSelectPhase[1],$gameTemp._lmbsSelectPhase[2],$gameTemp._lmbsTarget[0]);
		$gameTemp._lmbsSelectPhase[0] = false;
	}
	if (Input.isTriggered('up')) {			
        $gameTemp._lmbsTarget[0] = BattleManager.lmbsPrevTarget(-1,$gameTemp._lmbsSelectPhase[3],false);
	} else if (Input.isTriggered('down')) {
		$gameTemp._lmbsTarget[0] = BattleManager.lmbsNextTarget(1,$gameTemp._lmbsSelectPhase[3],false);
	} else if (Input.isTriggered('left')) {	
	    $gameTemp._lmbsTarget[0] = BattleManager.lmbsPrevTarget(-1,$gameTemp._lmbsSelectPhase[3],false);
	} else if (Input.isTriggered('right')) {
        $gameTemp._lmbsTarget[0] = BattleManager.lmbsNextTarget(1,$gameTemp._lmbsSelectPhase[3],false);
	};
	if (old_target != $gameTemp._lmbsTarget[0]) {SoundManager.playCursor()};	
};

//==============================
// * LMBS Update Battler
//==============================
BattleManager.lmbsUpdateBattler = function(battler) {
	 battler._lmbs_Walking = false;
	 battler._lmbs_Guard[1] = false;
	 battler.lmbsGuadClear()
     battler.lmbsUpdateBattler();
};

//==============================
// * LMBS Update ACtor
//==============================
BattleManager.lmbsUpdateActor = function() {
    this.lmbsUpdateCommand();
};


//==============================
// * LMBS Can Call Menu
//==============================
BattleManager.lmbsCanCallMenu = function() {
    if (!this._lmbsActor) {return false};
	if (!this._lmbsActor.canMove()) {return false};
	if (this._lmbsActor.lmbsIsGuardknockback()) {return false};
	if (this._lmbsActor.lmbsIsGuarding()) {return false};
	if (this._lmbsActor.lmbsIsActing()) {return false};
	if (this._lmbsActor.lmbsIsCasting()) {return false};
	if (this._lmbsActor.lmbsIsKnockbacking()) {return false};	
	return true;
};

//==============================
// * LMBS Check Battle End
//==============================
var _mog_lmbs_bmngr_checkBattleEnd = BattleManager.checkBattleEnd;
BattleManager.checkBattleEnd = function() {
    _mog_lmbs_bmngr_checkBattleEnd.call(this);
};
//==============================
// * LMBS Check Battle End
//==============================
var _mog_lmbs_bmngr_endBattle = BattleManager.endBattle;
BattleManager.endBattle = function(result) {
	if (result === 0) {this._lmbsVictory = true};
	_mog_lmbs_bmngr_endBattle.call(this,result)
};

//==============================
// * LMBS Update ACtor
//==============================
BattleManager.lmbsUpdateCommand = function() {
	if (Input.isTriggered(Moghunter.lmbsKeyMenu) && this.lmbsCanCallMenu()) {
		$gameTemp._lmbsSelectPhase[0] = true;
		$gameTemp._lmbsMenuPhase[0] = true;
		SoundManager.playCursor();
    	return
	}; 
	if (Input.isPressed(Moghunter.lmbsKeyGuard)) {this._lmbsActor.lmbsGuard()};
	if (Input.isTriggered(Moghunter.lmbsKeyAttack)) {this._lmbsActor.lmbsAttackAction()};
	if (Input.isTriggered(Moghunter.lmbsKeySkill)) {this._lmbsActor.lmbsSkillActionActor()};
    if (Input.isTriggered('up')) {
		this._lmbsActor.lmbsJump();
	} else if (Input.isPressed('down')) {
	};
    if (Input.isPressed('left')) {
		this._lmbsActor.lmbsMove(2);
	} else if (Input.isPressed('right')) {
		this._lmbsActor.lmbsMove(3);
	};
	if (Input.isPressed(Moghunter.lmbsKeyDash)) {this._lmbsActor.lmbsUpdateDash()
	} else {this._lmbsActor._lmbs_Dash[1] = false};	
	if (Input.isTriggered(Moghunter.lmbsKeyDash)) {this._lmbsActor.lmbsAirDash()};
    if (Input.isTriggered(Moghunter.lmbsKeyPrev) && this.lmbsCanCallMenu()) {
		var act = BattleManager._lmbsActor
		BattleManager._lmbsActor = BattleManager.lmbsPrevTarget(-1,0,true);
		$gameTemp._lmbsPlayerCursor[0] = $gameTemp._lmbsPlayerCursor[1];
		SoundManager.playCursor();
		if (act != BattleManager._lmbsActor) {this.lmbsPlayTurnVoice()};
	} else if (Input.isTriggered(Moghunter.lmbsKeyNext) && this.lmbsCanCallMenu()) {
		var act = BattleManager._lmbsActor
		BattleManager._lmbsActor = BattleManager.lmbsNextTarget(1,0,true);
		$gameTemp._lmbsPlayerCursor[0] = $gameTemp._lmbsPlayerCursor[1];
		SoundManager.playCursor();
		if (act != BattleManager._lmbsActor) {this.lmbsPlayTurnVoice()};
	};	
	if (BattleManager._lmbsActor.lmbsIsEscaping()) {BattleManager._lmbsActor.lmbsUpdateEscape()};
		
};

//==============================
// * LMBS Turn Voice
//==============================
BattleManager.lmbsPlayTurnVoice = function() {
	 if (!Imported.MOG_BattleCry) {return};
     if (BattleManager._lmbsActor) {AudioManager.stopSe(); 
		 SoundManager.selectVoice(BattleManager._lmbsActor._v_turn)};
};
//=============================================================================
// ****** Game Interpreter ****************************************************
//=============================================================================

//==============================
// * command129
//==============================
Game_Interpreter.prototype.command129 = function() {
	if ($gameParty.inBattle() && $gameSystem._lmbsData[0]) {
		return true;
	};
    var actor = $gameActors.actor(this._params[0]);
    if (actor) {
        if (this._params[1] === 0) {  // Add
            if (this._params[2]) {   // Initialize
                $gameActors.actor(this._params[0]).setup(this._params[0]);
            }
            $gameParty.addActor(this._params[0]);
        } else {  // Remove
            $gameParty.removeActor(this._params[0]);
        }
    }
    return true;
};

//=============================================================================
// ** Window Skill Status 
//=============================================================================

//==============================
// * Initialize
//==============================
var _mog_lmbs_wsktatus_initialize = Window_SkillStatus.prototype.initialize;
Window_SkillStatus.prototype.initialize = function(x, y, width, height) {
    _mog_lmbs_wsktatus_initialize.call(this,x, y, width, height)
 	for (var i = 0; i < $gameParty.members().length; i++) {
         actor = $gameParty.members()[i];
		 this.drawActorFace(actor, 0, 0,0,0);
	}; 
	this.contents.clear(); 
};	
	
//=============================================================================
// ** LMBS Window Skill Equip
//=============================================================================

function LMBSwindowSkillEquip() {
    this.initialize.apply(this, arguments);
}

LMBSwindowSkillEquip.prototype = Object.create(Window_SkillList.prototype);
LMBSwindowSkillEquip.prototype.constructor = LMBSwindowSkillEquip;

//==============================
// * Initialize
//==============================
LMBSwindowSkillEquip.prototype.initialize = function(x, y, width, height) {
	var height = 290;
	this._comImg = ImageManager.loadLMBS("IconCom");
    Window_SkillList.prototype.initialize.call(this, x, y, width, height);
    this.hide();
};

//==============================
// * Show
//==============================
LMBSwindowSkillEquip.prototype.show = function() {
    this.selectLast();
    this.showHelpWindow();
    Window_SkillList.prototype.show.call(this);
};

//==============================
// * Hide
//==============================
LMBSwindowSkillEquip.prototype.hide = function() {
    this.hideHelpWindow();
    Window_SkillList.prototype.hide.call(this);
};
	
//==============================
// * max Cols
//==============================	
LMBSwindowSkillEquip.prototype.maxCols = function() {
    return 1;
};

//==============================
// * max Items
//==============================
LMBSwindowSkillEquip.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

//==============================
// * Item
//==============================
LMBSwindowSkillEquip.prototype.item = function() {
    return this._data && this.index() >= 0 ? this._data[this.index()] : null;
};	
	
//==============================
// * Make Item List
//==============================	
LMBSwindowSkillEquip.prototype.makeItemList = function() {
	this._data = [];
	if (!this._actor) {return};
	for (var i = 0; i < this._actor._lmbs_skills.length; i++) {
		 var skill = $dataSkills[this._actor._lmbs_skills[i]];
         this._data.push(skill)
	};	
};	

//==============================
// * Update
//==============================
LMBSwindowSkillEquip.prototype.drawItem = function(index) {
    var skill = this._data[index];
	this.lmbsDrawCom(index);
    if (skill) {
        var costWidth = this.costWidth();
        var rect = this.itemRect(index);
        rect.width -= this.textPadding();
        this.drawItemName(skill, rect.x + 38, rect.y, rect.width - costWidth);
        this.drawSkillCost(skill, rect.x + 320, rect.y, rect.width - 320);
    };
};	

//==============================
// * Draw Com
//==============================
LMBSwindowSkillEquip.prototype.lmbsDrawCom = function(index) {
   var bitmap = this._comImg;
   var cw = this._comImg.width / 10
   var ch = this._comImg.height
   if (index === 0) {
       this.contents.blt(bitmap, 0 , 0, cw, ch, cw / 2,ch * index);
   } else if (index === 1) {
	   this.contents.blt(bitmap, cw * 1 , 0, cw, ch, 0,ch * index);
	   this.contents.blt(bitmap, cw * 2, 0, cw, ch, cw,ch * index);
   } else if (index === 2) {	  
	   this.contents.blt(bitmap, cw * 3 , 0, cw, ch, cw / 2,ch * index);
   } else if (index === 3) {	  
	   this.contents.blt(bitmap, cw * 5 , 0, cw, ch, cw / 2,ch * index);
   } else if (index === 4) {
	   this.contents.blt(bitmap, cw * 6 , 0, cw, ch, 0,ch * index);
	   this.contents.blt(bitmap, cw * 7 , 0, cw, ch, cw,ch * index);
   } else if (index === 5) {
	   this.contents.blt(bitmap, cw * 8 , 0, cw, ch, cw / 2,ch * index);	
   } else if (index === 6) {
	   this.contents.blt(bitmap, cw * 9 , 0, cw, ch, cw / 2,ch * index);	     
   };	   
};

//==============================
// * Draw Item Name
//==============================
LMBSwindowSkillEquip.prototype.drawItemName = function(item, x, y, width) {
    width = width || 312;
    if (item) {
        var iconBoxWidth = Window_Base._iconWidth + 4;
        this.resetTextColor();
        this.drawText(item.name, x + iconBoxWidth, y, width - (iconBoxWidth * 3));
    }
};

//==============================
// * Update
//==============================
LMBSwindowSkillEquip.prototype.update = function() {
    Window_SkillList.prototype.update.call(this);
     $gameTemp._lmbsMenuPhase[2] = this.index() < 3 ? 0 : 1;
};
	
//=============================================================================
// ** LMBS Window Skill List
//=============================================================================

function LMBSwindowSkillList() {
    this.initialize.apply(this, arguments);
}

LMBSwindowSkillList.prototype = Object.create(Window_SkillList.prototype);
LMBSwindowSkillList.prototype.constructor = LMBSwindowSkillList;

//==============================
// * Initialize
//==============================
LMBSwindowSkillList.prototype.initialize = function(x, y, width, height) {
	var height = 290;
    Window_SkillList.prototype.initialize.call(this, x, y, width, height);
    this.hide();
	this._lmbsskillType = - 1;
	this._actor = null;
};
 
//==============================
// * Show
//==============================
LMBSwindowSkillList.prototype.show = function() {
    this.selectLast();
    this.showHelpWindow();
    Window_SkillList.prototype.show.call(this);
};

//==============================
// * Hide
//==============================
LMBSwindowSkillList.prototype.hide = function() {
    this.hideHelpWindow();
    Window_SkillList.prototype.hide.call(this);
};
	
//==============================
// * max Cols
//==============================	
LMBSwindowSkillList.prototype.maxCols = function() {
    return 1;
};

//==============================
// * max Items
//==============================
LMBSwindowSkillList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

//==============================
// * Item
//==============================
LMBSwindowSkillList.prototype.item = function() {
    return this._data && this.index() >= 0 ? this._data[this.index()] : null;
};	
	
//==============================
// * Make Item List
//==============================	
LMBSwindowSkillList.prototype.makeItemList = function() {
	this._data = [];
	if (!this._actor) {return};
	var skillType = "Free"
	var index = 0;   
	for (var i = 0; i < this._actor.skills().length; i++) {
		var skill = this._actor.skills()[i];
		if (skill) { 
				var item_notes = skill.note.split(/[\r\n]+/);
				item_notes.forEach(function(note) {
				 var note_data = note.split(': ')
				if (note_data[0].toLowerCase() == "lmbs skill type"){			 
						 var par = note_data[1].split(':');
						 skillType = String(par[0]);
					 };											 
				},this);		 
		};
		if ($gameTemp._lmbsMenuPhase[2] === 0 && skillType.toLowerCase() == "ground") {
            this._data.push(skill);
		} else if ($gameTemp._lmbsMenuPhase[2] === 1 && skillType.toLowerCase() == "aerial") {
			this._data.push(skill);
		} else if (skillType.toLowerCase() == "free") {
            this._data.push(skill);
		};
	};	
};	

//==============================
// * Refresh
//==============================
LMBSwindowSkillList.prototype.refresh = function() {
    Window_SkillList.prototype.refresh.call(this);
    this._lmbsskillType = $gameTemp._lmbsMenuPhase[2];
};	
	
//==============================
// * DrawItem
//==============================
LMBSwindowSkillList.prototype.drawItem = function(index) {
    var skill = this._data[index];
    if (skill) {
        var costWidth = this.costWidth();
        var rect = this.itemRect(index);
		var iconBoxWidth = Window_Base._iconWidth + 4;
        rect.width -= this.textPadding();
        this.drawItemName(skill, rect.x, rect.y, rect.width - (iconBoxWidth * 2));
        this.drawSkillCost(skill, rect.x + 320, rect.y, rect.width - 320);
    };
};	
	
//==============================
// * Update
//==============================
LMBSwindowSkillList.prototype.update = function() {
    Window_SkillList.prototype.update.call(this);
    if (this._lmbsskillType != $gameTemp._lmbsMenuPhase[2]) {this.refresh();this.select(0)};
};

//=============================================================================
// ** LMBS Window_Item
//=============================================================================

function LMBSWindow_Item() {
    this.initialize.apply(this, arguments);
}

LMBSWindow_Item.prototype = Object.create(Window_ItemList.prototype);
LMBSWindow_Item.prototype.constructor = LMBSWindow_Item;

//==============================
// * Initialize
//==============================
LMBSWindow_Item.prototype.initialize = function(x, y, width, height) {
    Window_ItemList.prototype.initialize.call(this, x, y, width, height);
    this.hide();
};

//==============================
// * Includes
//==============================
LMBSWindow_Item.prototype.includes = function(item) {
    return $gameParty.canUse(item);
};

//==============================
// * Show
//==============================
LMBSWindow_Item.prototype.show = function() {
 //   this.selectLast();
    this.showHelpWindow();
    Window_ItemList.prototype.show.call(this);
};

//==============================
// * Hide
//==============================
LMBSWindow_Item.prototype.hide = function() {
    this.hideHelpWindow();
    Window_ItemList.prototype.hide.call(this);
};	
	
//=============================================================================
// ** LMBS Menu Window
//=============================================================================
function LmbsMenuWindow() {
    this.initialize.apply(this, arguments);
}

LmbsMenuWindow.prototype = Object.create(Window_Command.prototype);
LmbsMenuWindow.prototype.constructor = LmbsMenuWindow;

//==============================
// * Initialize
//==============================
LmbsMenuWindow.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.updatePlacement();
    this.openness = 255;
	this.active = false;
	this.visible = false;
};

//==============================
// * window Width
//==============================
LmbsMenuWindow.prototype.windowWidth = function() {
    return 240;
};

//==============================
// * update Placement
//==============================
LmbsMenuWindow.prototype.updatePlacement = function() {
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = (Graphics.boxHeight  / 2) - this.height;
};

//==============================
// * make Command List
//==============================
LmbsMenuWindow.prototype.makeCommandList = function() {
    this.addCommand(Moghunter.lmbsItemComWord, 'item');
    this.addCommand(Moghunter.lmbsEquipComWord,  'equip');
};	
	
//=============================================================================
// ** Scene Battle
//=============================================================================

//==============================
// * create All Windows
//==============================
var _mog_lmbs_sbat_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
	_mog_lmbs_sbat_createAllWindows.call(this);
	if ($gameSystem._lmbsData[0]) {this.lmbsCreateWindows()};
};

//==============================
// * lmbs Create Windows
//==============================
Scene_Battle.prototype.lmbsCreateWindows = function() {
	this._lmbsMenuPhase = false;
    var wx = 0;
    var wy = Graphics.boxHeight - 180;
    var ww = Graphics.boxWidth;
    var wh = 180;	
	this._lmbsWindowActor = new Window_SkillStatus(wx, wy, ww, wh);
	this._lmbsWindowActor.visible = false;
	this._lmbsWindowActor.setActor(BattleManager._lmbsActor)
	this._lmbsWindowActor.refresh();
	this.addChild(this._lmbsWindowActor);
	var wy = this._helpWindow.y + this._helpWindow.height
    var wy = (Graphics.boxHeight / 2) - 180;	
    this._lmbsWindowSkillEquip = new LMBSwindowSkillEquip(0, wy, Graphics.boxWidth / 2, 200);
	this._lmbsWindowSkillEquip.setHelpWindow(this._helpWindow);
	this.addChild(this._lmbsWindowSkillEquip);		
	$gameTemp._lmbsMenuPhase[2] = 1;
    this._lmbsWindowSkillList = new LMBSwindowSkillList(this._lmbsWindowSkillEquip.width, wy, Graphics.boxWidth / 2, 200);
	this._lmbsWindowSkillList.setHelpWindow(this._helpWindow);
	this.addChild(this._lmbsWindowSkillList);		
    this._lmbsitemWindow = new LMBSWindow_Item(0, this._lmbsWindowActor.y, Graphics.boxWidth, this._lmbsWindowActor.height);
    this._lmbsitemWindow.setHelpWindow(this._helpWindow);
    this.addWindow(this._lmbsitemWindow);	
    this._lmbsMenu = new LmbsMenuWindow();
    this._lmbsMenu.setHandler('item',  this.lmbsComItem.bind(this));
    this._lmbsMenu.setHandler('equip',   this.lmbsComEquip.bind(this));
    this.addWindow(this._lmbsMenu);	
};

//==============================
// * Lmbs Com Item
//==============================
Scene_Battle.prototype.lmbsComItem = function() {
	this._lmbsMenu.visible = false;
	this._lmbsMenu.active = false;
	this._lmbsWindowActor.visible = false;
	$gameTemp._lmbsMenuPhase[1] = 1;
	this._lmbsitemWindow.refresh();
    this._lmbsitemWindow.show();
    this._lmbsitemWindow.activate();	
	this._lmbsitemWindow.select(0);
};

//==============================
// * Update
//==============================
var _mog_lmbs_scbat_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
	_mog_lmbs_scbat_update.call(this);
    this.lmbsUpdateScbat();
};

//==============================
// * LmbsUpdateScbat
//==============================
Scene_Battle.prototype.lmbsUpdateScbat = function() {
	if ($gameTemp._lmbsEndPhase[0] > 0) {this.lmbsUpdateEndPhase()}
	this.lmbsUpdateMenuPhase();
};	

//==============================
// * lmbs Update Menu Phase
//==============================
Scene_Battle.prototype.lmbsUpdateMenuPhase = function() {
	if (this._lmbsMenuPhase) {;
		if ($gameTemp._lmbsMenuPhase[1] === 0) {
			 this.lmbsMenuComPhase();
		} else if ($gameTemp._lmbsMenuPhase[1] === 1) {
			 this.lmbsMenuItemPhase();
		} else if ($gameTemp._lmbsMenuPhase[1] === 2) {
      		 this.lmbsMenuEquipPhase();	 
		};
	};
    if ($gameTemp._lmbsMenuPhase[0] != this._lmbsMenuPhase) {
		this._lmbsMenuPhase = $gameTemp._lmbsMenuPhase[0];
		$gameTemp._lmbsMenuPhase[1] = 0;
		$gameTemp._lmbsMenuPhase[2] = 0;
		if (this._lmbsMenuPhase) {
			this._lmbsWindowActor.setActor(BattleManager._lmbsActor)
			this._lmbsWindowActor.refresh();			
			this._lmbsWindowActor.visible = true;
			this._lmbsMenu.visible = true;
			this._lmbsMenu.active = true;
			this._lmbsMenu.select(0);
		};
	};	
};

//==============================
// * lmbs Update Menu Com Clear
//==============================
Scene_Battle.prototype.lmbsMenuComClear = function() {
		$gameTemp._lmbsMenuPhase[0] = false;
		$gameTemp._lmbsMenuPhase[1] = 0;
		$gameTemp._lmbsMenuPhase[2] = 0;
		$gameTemp._lmbsMenuPhase[3] = false;
		$gameTemp._lmbsSelectPhase[0] = false;
		this._lmbsActor = null;
		this._lmbsMenuPhase = $gameTemp._lmbsMenuPhase[0];
		this._lmbsitemWindow.hide();
		this._lmbsWindowActor.visible = false;
		this._lmbsMenu.visible = false;
		this._lmbsMenu.active = false;	
		this._lmbsitemWindow.hide();
		this._lmbsWindowSkillList.hide();	
		BattleManager.lmbsMakeSkillList();
};

//==============================
// * lmbs Update Menu Item Phase
//==============================
Scene_Battle.prototype.lmbsMenuComPhase = function() {
    if (Input.isTriggered('cancel')) {
		SoundManager.playCancel();
        this.lmbsMenuComClear();		
	};
};

//==============================
// * lmbs Update Menu Item Phase
//==============================
Scene_Battle.prototype.lmbsMenuItemPhase = function() {
    if (Input.isTriggered('cancel')) {
		SoundManager.playCancel();
		$gameTemp._lmbsMenuPhase[3] = false;
		if (this._lmbsitemWindow.visible) {
			$gameTemp._lmbsMenuPhase[1] = 0;
			this._lmbsitemWindow.hide();
			this._lmbsitemWindow.active = false;
			this._lmbsWindowActor.visible = true;
			this._lmbsMenu.visible = true;
			this._lmbsMenu.active = true;
		} else {
			this._lmbsitemWindow.active = true;
			this._lmbsitemWindow.show();	
		};					
	} else if (Input.isTriggered('ok')) {
		var item = this._lmbsitemWindow.item();
		if (!item) {return};
		if (this._lmbsitemWindow.visible) {
			this._lmbsitemWindow.hide();
			this._lmbsitemWindow.active = false;
			$gameTemp._lmbsMenuPhase[3] = false;
				 $gameTemp._lmbsSelectPhase[0] = true;
				 $gameTemp._lmbsSelectPhase[1] = item.id;
				 $gameTemp._lmbsSelectPhase[2] = 1;
				 var f = BattleManager._lmbsActor.lmbsIsActionForFriends(item)
				 if (BattleManager._lmbsActor.isActor()) {
					 unitID = f ? 0 : 1;
				 } else {
					 unitID = f ? 1 : 0;
				 };				 
				 $gameTemp._lmbsSelectPhase[3] = unitID
				 if (item.scope === 2 || item.scope === 8 || item.scope === 10 ) {
					BattleManager._lmbsActor.lmbsAction($gameTemp._lmbsSelectPhase[1],$gameTemp._lmbsSelectPhase[2],null);
					this.lmbsMenuComClear();					 	 
				 } else {
					 $gameTemp._lmbsMenuPhase[3] = true;
				    $gameTemp._lmbsTarget[0] = BattleManager.lmbsNextTarget(0,$gameTemp._lmbsSelectPhase[3],false);
				 };
				 SoundManager.playCursor();
		} else {
			if (this.lmbsMenuCanUseItem(item)) {
				SoundManager.playCursor();
				BattleManager._lmbsActor.lmbsAction($gameTemp._lmbsSelectPhase[1],$gameTemp._lmbsSelectPhase[2],$gameTemp._lmbsTarget[0]);
				this.lmbsMenuComClear();
			} else {
				SoundManager.playBuzzer();
			};
	    };
	}
	if (!this._lmbsitemWindow.visible) {
		this.lmbsUpdateTargetSelectionItem();
	};
};

//==============================
// * lmbs Menu Can Use Item
//==============================
Scene_Battle.prototype.lmbsMenuCanUseItem = function(item) {
	if (!$gameTemp._lmbsTarget[0]) {return false};
    if (item.scope === 8 || item.scope === 9) {
	    if (!$gameTemp._lmbsTarget[0].isDead()) {return false};
	};
	if (item.scope === 11 & $gameTemp._lmbsTarget[0] != BattleManager._lmbsActor) {return false};
	return true;
};

//==============================
// * lmbs Update Target Item
//==============================
Scene_Battle.prototype.lmbsUpdateTargetSelectionItem = function() {
	old_target = $gameTemp._lmbsTarget[0];
	if (Input.isTriggered('up')) {			
        $gameTemp._lmbsTarget[0] = BattleManager.lmbsPrevTarget(-1,$gameTemp._lmbsSelectPhase[3],false);
	} else if (Input.isTriggered('down')) {
		$gameTemp._lmbsTarget[0] = BattleManager.lmbsNextTarget(1,$gameTemp._lmbsSelectPhase[3],false);
	} else if (Input.isTriggered('left')) {	
	    $gameTemp._lmbsTarget[0] = BattleManager.lmbsPrevTarget(-1,$gameTemp._lmbsSelectPhase[3],false);
	} else if (Input.isTriggered('right')) {
        $gameTemp._lmbsTarget[0] = BattleManager.lmbsNextTarget(1,$gameTemp._lmbsSelectPhase[3],false);
	};
	if (old_target != $gameTemp._lmbsTarget[0]) {SoundManager.playCursor()};
};

//==============================
// * Lmbs Com Equip
//==============================
Scene_Battle.prototype.lmbsComEquip = function() {
	this._lmbsActor = BattleManager._lmbsActor
	this._lmbsMenu.visible = false;
	this._lmbsMenu.active = false;
	this._lmbsWindowActor.visible = true;
	$gameTemp._lmbsMenuPhase[1] = 2;
    this._lmbsWindowSkillEquip.setActor(BattleManager._lmbsActor);
    this._lmbsWindowSkillEquip.refresh();
	this._lmbsWindowSkillList.select(0);
    this._lmbsWindowSkillEquip.show();
    this._lmbsWindowSkillEquip.activate();		
    this._lmbsWindowSkillList.setActor(BattleManager._lmbsActor);
    this._lmbsWindowSkillList.refresh();
	this._lmbsWindowSkillList.select(0);
    this._lmbsWindowSkillList.show();
};

//==============================
// * lmbs Menu Equip Phase
//==============================
Scene_Battle.prototype.lmbsMenuEquipPhase = function() {
   if (Input.isTriggered('cancel')) {
	   SoundManager.playCancel();
	   if (this._lmbsWindowSkillEquip.active) {
		   this._lmbsWindowSkillList.hide();
		   this._lmbsWindowSkillEquip.hide();
		   this._lmbsWindowSkillList.deactivate();
		   this._lmbsWindowSkillEquip.deactivate();
		   //---------------
		   $gameTemp._lmbsMenuPhase[1] = 0;
		   this._lmbsWindowActor.visible = true;
		   this._lmbsMenu.visible = true;
		   this._lmbsMenu.active = true;
		   //---------------
	   } else {
		   this._lmbsWindowSkillList.active = false;
		   this._lmbsWindowSkillEquip.active = true;
		   this._lmbsWindowSkillEquip.setHelpWindowItem(this._lmbsWindowSkillEquip.item());	   
	   };	   
   } else if (Input.isTriggered('ok')) {
	   if (this._lmbsWindowSkillEquip.active) {
		   SoundManager.playCursor();
		   this._lmbsWindowSkillEquip.active = false;
		   this._lmbsWindowSkillList.active = true;
		   this._lmbsWindowSkillList.setHelpWindowItem(this._lmbsWindowSkillList.item());
	   } else {
		   this._lmbsWindowSkillList.active = false;
		   this._lmbsWindowSkillEquip.active = true;
		   this.lmbsEquipActorSkill();
	   };
   };
};

//==============================
// * lmbs Menu Equip Actor Skill
//==============================
Scene_Battle.prototype.lmbsEquipActorSkill = function() {
	if (!this._lmbsWindowSkillList.item() || !this._lmbsActor) {
		SoundManager.playBuzzer();
		return
	 };
	 this._lmbsActor._lmbs_skills[this._lmbsWindowSkillEquip.index()] = this._lmbsWindowSkillList.item().id;
	 SoundManager.playEquip();
	 this._lmbsWindowSkillEquip.refresh();
	 this._lmbsWindowSkillEquip.setHelpWindowItem(this._lmbsWindowSkillEquip.item());
};

//=============================================================================
// ** Window MenuCommand
//=============================================================================	

//==============================
// * make Command List
//==============================
var _mog_lmbs_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
	_mog_lmbs_addOriginalCommands.call(this);
	this.addLmbsEquip();
};
	
//==============================
// * Add Lmbs Equip
//==============================	
Window_MenuCommand.prototype.addLmbsEquip = function() {
    this.addCommand(String(Moghunter.lmbsEquipComWord), 'lmbs_equip', true);
};	

//=============================================================================
// ** Scene Menu
//=============================================================================	

//==============================
// * create Command Window
//==============================
var _mog_lmbs_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
	_mog_lmbs_createCommandWindow.call(this); 
    this._commandWindow.setHandler('lmbs_equip',      this.commandPersonal.bind(this));
	this._commandWindow.height -= this._commandWindow.itemHeight(); 
	var comImg = ImageManager.loadLMBS("IconCom"); 
};

//==============================
// * on Personal OK
//==============================
var _mog_lmbs_smenu_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
Scene_Menu.prototype.onPersonalOk = function() {
	_mog_lmbs_smenu_onPersonalOk.call(this)
	if (this._commandWindow.currentSymbol() === 'lmbs_equip') {SceneManager.push(Scene_LMBSEquip);return}
};

//=============================================================================
// ** Scene_LMBS Equip
//=============================================================================	

//==============================
// * create Command Window
//==============================
function Scene_LMBSEquip() {
    this.initialize.apply(this, arguments);
}

Scene_LMBSEquip.prototype = Object.create(Scene_MenuBase.prototype);
Scene_LMBSEquip.prototype.constructor = Scene_LMBSEquip

//==============================
// * initialize
//==============================
Scene_LMBSEquip.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
	this.updateActor();	
};

//==============================
// * Create
//==============================
Scene_LMBSEquip.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this._helpWindow = new Window_Help();
    this._helpWindow.visible = true;
	this._actor = this.actor();
    this.addChild(this._helpWindow);	 	
    var wx = 0;
    var wy = Graphics.boxHeight - 180;
    var ww = Graphics.boxWidth;
    var wh = 180;	
	this._lmbsWindowActor = new Window_SkillStatus(wx, wy, ww, wh);
	this._lmbsWindowActor.setActor(this._actor);
	this._lmbsWindowActor.visible = true;
	this.addChild(this._lmbsWindowActor);
	var wy = this._helpWindow.y + this._helpWindow.height
    var wy = (Graphics.boxHeight / 2) - 180;	
    this._lmbsWindowSkillEquip = new LMBSwindowSkillEquip(0, wy, Graphics.boxWidth / 2, 200);
	this._lmbsWindowSkillEquip.setHelpWindow(this._helpWindow);
	this.addChild(this._lmbsWindowSkillEquip);		
    this._lmbsWindowSkillEquip.setActor(this._actor);
    this._lmbsWindowSkillEquip.refresh();
    this._lmbsWindowSkillEquip.show();
	this._lmbsWindowSkillEquip.visible = true;
    this._lmbsWindowSkillEquip.activate();	
	this._lmbsWindowSkillEquip.select(0);
    this._lmbsWindowSkillList = new LMBSwindowSkillList(this._lmbsWindowSkillEquip.width, wy, Graphics.boxWidth / 2, 200);
	this._lmbsWindowSkillList.setHelpWindow(this._helpWindow);
	this.addChild(this._lmbsWindowSkillList);
    this._lmbsWindowSkillList.setActor(this._actor);
    this._lmbsWindowSkillList.refresh();
    this._lmbsWindowSkillList.show();
 	this._lmbsWindowSkillList.select(0);		
};

//==============================
// * refresh Actor
//==============================
Scene_LMBSEquip.prototype.refreshActor = function() {
    var actor = this.actor();
	this._lmbsWindowActor.setActor(actor);
	this._lmbsWindowSkillEquip.setActor(actor);
    this._lmbsWindowSkillList.setActor(actor);
};

//==============================
// * On Actor Change
//==============================
Scene_LMBSEquip.prototype.onActorChange = function() {
    this.refreshActor();
    this._lmbsWindowSkillEquip.refresh();
	this._lmbsWindowSkillList.select(0);
    this._lmbsWindowSkillEquip.show();
    this._lmbsWindowSkillEquip.activate();		
    this._lmbsWindowSkillList.refresh();
	this._lmbsWindowSkillList.select(0);
    this._lmbsWindowSkillList.show();	
};

//==============================
// * Update
//==============================
Scene_LMBSEquip.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);
    this.lmbsMenuEquipPhase();
};

//==============================
// * lmbs Menu Equip Phase
//==============================
Scene_LMBSEquip.prototype.lmbsMenuEquipPhase = function() {
   if (Input.isTriggered('cancel')) {
	   SoundManager.playCancel();
	   if (this._lmbsWindowSkillEquip.active) {
		   SceneManager.pop();  
	   } else {
		   this._lmbsWindowSkillList.active = false;
		   this._lmbsWindowSkillEquip.active = true;
		   this._lmbsWindowSkillEquip.setHelpWindowItem(this._lmbsWindowSkillEquip.item());	   
	   };	   
   } else if (Input.isTriggered('ok')) {
	   if (this._lmbsWindowSkillEquip.active) {
		   SoundManager.playCursor();
		   this._lmbsWindowSkillEquip.active = false;
		   this._lmbsWindowSkillList.active = true;
		   this._lmbsWindowSkillList.setHelpWindowItem(this._lmbsWindowSkillList.item());
	   } else {
		   this._lmbsWindowSkillList.active = false;
		   this._lmbsWindowSkillEquip.active = true;
		   this.lmbsEquipActorSkill();
	   };
   };
};

//==============================
// * lmbs Menu Equip Actor Skill
//==============================
Scene_LMBSEquip.prototype.lmbsEquipActorSkill = function() {
	if (!this._lmbsWindowSkillList.item() || !this._actor) {
		SoundManager.playBuzzer();
		return
	 };
	 this._actor._lmbs_skills[this._lmbsWindowSkillEquip.index()] = this._lmbsWindowSkillList.item().id;
	 SoundManager.playEquip();
	 this._lmbsWindowSkillEquip.refresh();
	 this._lmbsWindowSkillEquip.setHelpWindowItem(this._lmbsWindowSkillEquip.item());
};

//=============================================================================
// ****** LMBS Skill Sprite  **********************************************
//=============================================================================
function LmbsSkillSprite() {
    this.initialize.apply(this, arguments);
}

LmbsSkillSprite.prototype = Object.create(Sprite_Base.prototype);
LmbsSkillSprite.prototype.constructor = LmbsSkillSprite;

//==============================
// * initialize
//==============================
LmbsSkillSprite.prototype.initialize = function(sprite) {
    Sprite_Base.prototype.initialize.call(this);
	this._zIndex =  3300;
	this._sprite = sprite;
    this._battler = this._sprite._battler;
	this._skillSprites = [];
};
//==============================
// * Update
//==============================
LmbsSkillSprite.prototype.update = function() {
	if ($gameTemp._lmbsSelectPhase[0]) {return};
    Sprite_Base.prototype.update.call(this);
	this._zIndex =  3300;
	if (this._battler) {this.updatePosition()};
};

//==============================
// * Update Position
//==============================
LmbsSkillSprite.prototype.updatePosition = function() {
    this.x = this._battler._lmbs_X;
    this.y = this._battler._lmbs_Y - (this._battler.lmbsHeight() / 2);
	this.updateSkillSprites();
};

//==============================
// * Execute SKill
//==============================
LmbsSkillSprite.prototype.executeSkill = function() {
	this._battler.lmbsPlayVoiceAction(this._battler._lmbs_ActionSkill[0]);
	if (this._battler._lmbsAllTargets[0]) {this.executeSkillForAll();return};
	var sprite = new LMBS_Skill(this._battler,this._battler._lmbs_ActionSkill,this._sprite,0);
	this._skillSprites.push(sprite);
	this.parent.addChild(sprite);
    this._battler._lmbs_ActionSkill = [];
};

//==============================
// * Execute Skill For All
//==============================
LmbsSkillSprite.prototype.executeSkillForAll = function() {
    var members = this._battler._lmbsAllTargets[1] === 0 ? $gameParty.aliveMembers() : $gameTroop.aliveMembers();
    for (var i = 0; i < members.length; i++) {
		var sprite = new LMBS_Skill(this._battler,this._battler._lmbs_ActionSkill,this._sprite,members[i],i);
		this._skillSprites.push(sprite);
		this.parent.addChild(sprite);
	};
	this._battler._lmbsAllTargets = [false,0];
    this._battler._lmbs_ActionSkill = [];
};
		
//==============================
// * Update Skill Sprites
//==============================
LmbsSkillSprite.prototype.updateSkillSprites = function() {
    if (this._battler.lmbsRequestSkill()) {this.executeSkill(null)};
    if (this._skillSprites.length > 0) {
        for (var i = 0; i < this._skillSprites.length; i++) {
            this._skillSprites[i].update();
			if (!this._skillSprites[i].isPlaying()) {
				this._skillSprites[i].removeSprites();
				this.removeChild(this._skillSprites[i]);
			};				
	    };
		if (!this._skillSprites[0].isPlaying()) {
			this._skillSprites[0].removeSprites();
			this.parent.removeChild(this._skillSprites[0]);
			this._skillSprites.shift();	
		};		
    };
};	

//=============================================================================
// ****** LMBS_Skill *************************************************
//=============================================================================
function LMBS_Skill() {
    this.initialize.apply(this, arguments);
}

LMBS_Skill.prototype = Object.create(Sprite_Base.prototype);
LMBS_Skill.prototype.constructor = LMBS_Skill;

//==============================
// * initialize
//==============================
LMBS_Skill.prototype.initialize = function(battler,skill,sprite,target,waitime) {
    Sprite_Base.prototype.initialize.call(this);
	this._zIndex = 3300;
	this._itemData = skill;
	this._item = this._itemData[0];	
	this._target = target;
	this._user = battler;
	this.anchor.x = 0.5;
	this.anchor.y = 0.5;
	if (this._itemData[15]) {
	    $gameTemp._skillNameData = [true,this._item,true];
	    $gameTemp._lmbsActionName[1] = 90;
	};
	if (this._itemData[16][0]) {
    	$gameTemp._ougiData = [true,this._user,0,0,this._itemData[16][1]];
	};
	if (!this._target) {this._target = this._itemData[1]};
	this._ignoreGuard = this._itemData[14];
	if (this._itemData[3].toLowerCase() == "auto target") {
	    this._position = 2;
		if (!this._target && this._user != BattleManager._lmbsActor) {this._target = this._user._lmbs_target};
	} else if (this._itemData[3].toLowerCase() == "auto target area") {
		this._position = 3;	
		if (!this._target && this._user != BattleManager._lmbsActor) {this._target = this._user._lmbs_target};
	} else if (this._itemData[3].toLowerCase() == "user") {
		this._position = 1;
	} else {
		this._position = 0;
	};	
	
	if (this.needRefreshTarget()) {
		var f = this._user.lmbsIsActionForFriends(this._item)
		if (this._user.isActor()) {
			 unitID = f ? 0 : 1;
		} else {
			 unitID = f ? 1 : 0;
		};
		this._target = BattleManager.lmbsNextTarget(1,unitID,true)
	};	
	if (this._target) {
	    this.x = this._target._lmbs_X;
	    this.y = this._target._lmbs_Y - (this._target.lmbsHeight() / 2);		
	} else {
	    this.x = this._user._lmbs_X;
	    this.y = this._user._lmbs_Y - (this._user.lmbsHeight() / 2);
	};
	this._sx = this._itemData[4][0];
	this._sy = this._itemData[4][1];
	if (this._itemData[10].toLowerCase() == "normal") {
	    this._knockbackType = 1;
	} else if (this._itemData[10].toLowerCase() == "power") {  
	    this._knockbackType = 2;
	} else {
	    this._knockbackType = 0;
	};
	this._size = this._itemData[6];
	this._sprite = sprite;
	this._ignoreKnockback = this._itemData[11];
	this._targetHitDone = [];
	this._spriteName = this._itemData[5];
	this._duration = this._itemData[2] * 2;
	this._direction = this._user._lmbs_Direction;
	this._multHit = this._itemData[7] ? this._itemData[7] : 1;
	this._wait = [this._itemData[8],2];
	this._animationID = this._itemData[9];
	this._animationSprites = [];
	this._playAnimation = [true,0];
	this.visible = false;
	this._piercing = this._position === 1 ? true : this._itemData[12];
	this._Anime = [-1,0,0,0];
	this.opacity = 0;
	this._waitTime =  2 * waitime;
	if (!this._waitTime || this._waitTime < 2) {this._waitTime = 2};
	this._allTargets = false;
	if (this._item.scope === 2 || this._item.scope === 8 || this._item.scope === 10) {
		this._allTargets = true;
		this._ignoreGuard = true;
	};
	this.createBitmap();
};

//==============================
// * need Refresh Target
//==============================
LMBS_Skill.prototype.needRefreshTarget = function() {
   if (!this._target) {return false};
   if (!this._target.isDead()) {return false};
   if (this._item.scope === 9) {return false};
   if (this._item.scope === 10) {return false};     
   return true;
};

//==============================
// * playAnimation
//==============================
LMBS_Skill.prototype.playAnimation = function() {
	this._playAnimation[0] = false;
	animation = $dataAnimations[this._animationID];
	if (animation && this._animationID > 0) {
	   var mirror = this._direction === 2 ? true : false; 
	   this.startAnimation(animation,mirror,0);
       for (var i = 0; i < this._animationSprites.length; i++) {
            var sprite = this._animationSprites[i];
			sprite._zIndex = this._zIndex + i;
        };	   
	};
};	
	
//==============================
// * check Item Scope
//==============================
LMBS_Skill.prototype.checkItemScope = function(list) {
    return list.contains(this._item.scope);
};

//==============================
// * create Bitmap
//==============================
LMBS_Skill.prototype.createBitmap = function() {
	if (!this._spriteName || this._spriteName == null || this._spriteName === "" || this._spriteName === "null") {
		this.bitmap = new Bitmap(32,32);
	} else {
	    this.bitmap = ImageManager.loadLMBSSkills(this._spriteName);
	};
};

//==============================
// * getData
//==============================
LMBS_Skill.prototype.getData = function() {
	this._Anime[0] = Math.floor(this.bitmap.width / this.bitmap.height);
	this._Anime[1] = Math.floor(this.bitmap.height);
	this._Anime[2] = 4;
	this._Anime[3] = 0;
	this.refreshFrame();
};


//==============================
// * refresh Frame
//==============================
LMBS_Skill.prototype.refreshFrame = function() {
	this.setFrame(this._Anime[3] * this._Anime[1],0,this._Anime[1],this._Anime[1]);
};

//==============================
// * animation Speed
//==============================
LMBS_Skill.prototype.animationSpeed = function() {
	return 8;
};
	
//==============================
// * update Animation
//==============================
LMBS_Skill.prototype.updateAnimation = function() {
	this._Anime[2]++
	if (this._Anime[2] < this.animationSpeed()) {return};
	this._Anime[2] = 0;
	this.refreshFrame();
	this._Anime[3]++
	if (this._Anime[3] >= this._Anime[0]) {this._Anime[3] = 0};
};

//==============================
// * update
//==============================
LMBS_Skill.prototype.update = function() {
	if ($gameTemp._lmbsSelectPhase[0]) {return};
    Sprite_Base.prototype.update.call(this);
	this._zIndex = 3300;
	if (this._waitTime > 0) {this._waitTime--; return};
    this._duration--;
	if (!this.bitmap || BattleManager.isBattleEnd()) {this._duration = -100;return};
	if (this._Anime[0] === -1 && this.bitmap.isReady()) {this.getData()};
	this.opacity += 25;
	if (!this.visible) {return};
	if (this._wait[0] > 0) {this._wait[0]--};
	if (this._wait[1] > 0) {this._wait[1]--};
	this.updateMovement();
	this.updateAnimation();
};

//==============================
// * update Movement
//==============================
LMBS_Skill.prototype.updateMovement = function() {
	if (this._target) {
	    this.updatePositionTarget();
    } else if (this._position === 0) {	
        this.updatePositionFree();
	} else {
		this.updatePositionUser();
	};
	var index = 0;
    BattleManager.lmbsAllBattlers().forEach(function(battler) {
         this.updateBattlerEffect(battler,index);
		 index++;
    }, this);	
	this.scale.x = this._direction === 2 ? 1.00 : -1.00;
	this.checkScreenLimit();
	if (this._playAnimation[0]) {this.playAnimation()};
};

//==============================
// * check Screen Limit
//==============================
LMBS_Skill.prototype.checkScreenLimit= function() {
	if (this.isOutOfScreen()) {this._duration = -100};
};

//==============================
// * is Out of Screen
//==============================
LMBS_Skill.prototype.isOutOfScreen= function() {
	if (this.x < this.lmbsMoveXL1()) {return true};
	if (this.x > this.lmbsMoveXL2()) {return true};
	if (this.y < this.lmbsMoveYL1()) {return true};
	if (this.y > this.lmbsMoveYL2()) {return true};
	return false;
};

//==============================
// * LMBS Move XL 1
//==============================
LMBS_Skill.prototype.lmbsMoveXL1 = function() {
	return $gameSystem._lmbsScreenSize[0] - (this.bitmap.width * 2);
};

//==============================
// * LMBS Move XL 2
//==============================
LMBS_Skill.prototype.lmbsMoveXL2 = function() {
	return $gameSystem._lmbsScreenSize[1] + (this.bitmap.width * 2);
};

//==============================
// * LMBS Move YL 1
//==============================
LMBS_Skill.prototype.lmbsMoveYL1 = function() {
	return $gameSystem._lmbsScreenSize[2] - (this.bitmap.height * 2);
};

//==============================
// * LMBS Move XL 2
//==============================
LMBS_Skill.prototype.lmbsMoveYL2 = function() {
	return $gameSystem._lmbsGroundHeight;
};

//==============================
// * update Position User
//==============================
LMBS_Skill.prototype.updatePositionUser = function() {
	    this.x = this._user._lmbs_X;
	    this.y = this._user._lmbs_Y - (this._user.lmbsHeight() / 2);
	    if (!this._user.lmbsIsActing() || !this._user.canMove() || this._item.id != this._user.lmbsCurrentAction().id) {this._duration = -100};
};

//==============================
// * update Position Target
//==============================
LMBS_Skill.prototype.updatePositionTarget = function() {
	    this.x = this._target._lmbs_X;
	    this.y = this._target._lmbs_Y - (this._target.lmbsHeight() / 2);
};

//==============================
// * update Position User
//==============================
LMBS_Skill.prototype.updatePositionFree = function() {
		if (this._direction === 2) {
			this.x -= this._sx;
		} else {  	
			this.x += this._sx; 
		};
		this.y += this._sy;
};

//==============================
// * X1
//==============================
LMBS_Skill.prototype.X1 = function() {
	if (this._direction === 3) {return this.x - this._size[1]}
    return this.x - this._size[0];
};

//==============================
// * X2
//==============================
LMBS_Skill.prototype.X2 = function() {
	if (this._direction === 3) {return this.x + this._size[0]}
    return this.x + this._size[1];
};

//==============================
// * Y1
//==============================
LMBS_Skill.prototype.Y1 = function() {
    return this.y + this._size[2];
};

//==============================
// * Y2
//==============================
LMBS_Skill.prototype.Y2 = function() {
    return this.y - this._size[3];
};

//==============================
// * update Battler Effect
//==============================
LMBS_Skill.prototype.updateBattlerEffect = function(battler,index) {
	 if (this.canHit(battler,index)) {this.hitEffect(battler,index)};
};

//==============================
// * hit Effect
//==============================
LMBS_Skill.prototype.hitEffect = function(battler,index) {
	     if (this._multHit === 1) {this._targetHitDone[index] = true};
		 battler._lmbs_Hit[1] = 25 - (this._multHit * 2);	
		 this._wait[1] = 2;
		 var oldHp = battler.hp;
         this.applyItemEffect(battler,index);
		 var damaged = oldHp > battler.hp ? true : false;
		 if (!this._piercing && this._duration > 5) {this._duration = 5};	
		 if (battler._lmbs_Hit[2]) {this.executeAfterHit(battler,index,damaged)};
		 if (!battler._lmbs_Hit[2]) {battler._lmbs_Knockback[5] = 30};
		 battler._lmbs_Hit[2] = false;
};

//==============================
// * execute After Hit
//==============================
LMBS_Skill.prototype.executeAfterHit = function(battler,index,damaged) {
		 var mirror = this._direction === 2 ? true : false; 
		 if (this._user.isActor() && this._user.attackSkillId() === this._item.id && DataManager.isSkill(this._item)) {
		    var aniID = this._user.attackAnimationId1();
		 } else {
		    var aniID = this._item.animationId;
	     };
	     battler.startAnimation(aniID,mirror,0);
		 if (this._knockbackType > 0 && battler.lmbsCanKnockback() && damaged) {this.setKnockbackEffect(battler,index)};		 
		 if (!battler.canMove()) {this.setDeadEffect(battler)};
};

//==============================
// * set Dead Effect
//==============================
LMBS_Skill.prototype.setDeadEffect = function(battler) {
    	battler.lmbsMotionClear();
		battler._lmbs_Casting = [null,0];
		this._user.lmbsSetTarget();
	    battler.lmbsGuadClear();
		battler._lmbs_Guard[2] = 0;
		battler.performCollapse();
		if (battler.isActor() && BattleManager._lmbsActor === battler) {
			BattleManager._lmbsActor = BattleManager.lmbsNextTarget(1,0,true);
			$gameTemp._lmbsPlayerCursor[0] = $gameTemp._lmbsPlayerCursor[1];
		};
		if (this.isBattleEnd()) {this.prepareBattleEnd()};
};

//==============================
// * prepare Battle End
//==============================
LMBS_Skill.prototype.prepareBattleEnd = function() {
   BattleManager.lmbsCastingClear();
   $gameTemp._lmbsEndPhase = [1,120,false];
   $gameTemp._lmbsEndPhase[0] = $gameTroop.isAllDead() ? 1 : 4;
   $gameTemp._lmbsPlayerCursor[0] = 0;
};   

//==============================
// * set Knockback Effect
//==============================
LMBS_Skill.prototype.setKnockbackEffect = function(battler,index) {
        battler._lmbs_Knockback[1] = this._knockbackType;
		battler._lmbs_Knockback[2] = this._knockbackType === 1 ? 30 : 70;
		//if (this._multHit > 1) {battler._lmbs_Knockback[2] = battler._lmbs_Hit[1] - 5};
		battler._lmbs_Knockback[3] = battler._lmbs_Knockback[2] + 5;
		battler._lmbs_Knockback[4] = 0;
		battler.lmbsGuadClear();
		battler._lmbs_Guard[2] = 0;
		battler._lmbs_Direction = this._direction === 2 ? 3 : 2;
		if (!battler._lmbs_SuperGuard) {battler.lmbsMotionClear()
		} else {
			battler._lmbs_Knockback[1] = 0;
			battler._lmbs_Knockback[2] = 0;
		};
		battler.lmbsActionUserClear();
};

//==============================
// * appty Item Effect
//==============================
LMBS_Skill.prototype.applyItemEffect = function(battler,index) {
         var action = new Game_Action(this._user);
         if (DataManager.isSkill(this._item)) {
		     action.setSkill(this._item.id);
		 } else {
		     action.setItem(this._item.id);
		 };
         action.apply(battler);
		 battler.startDamagePopup();
};

//==============================
// * Apply Item User Effect
//==============================
var _mog_lmbs_gact_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
	_mog_lmbs_gact_applyItemUserEffect.call(this,target);
	target._lmbs_Hit[2] = true;
};

//==============================
// * can Hit
//==============================
LMBS_Skill.prototype.canHit = function(battler,index) {
	if (this._position === 2 && this._target != battler) {return false};
	if (this._allTargets && this._target) {
		if (this._target != battler) {return false}; 
	};	
	if (battler._lmbs_Hit[0]) {return false};
	if (battler._lmbs_Hit[1] > 0) {return false};
	if (battler.lmbsIsInvulnerableAction()) {return false};
	if (battler.lmbsIsGuardknockback()) {return false};
	if (this._targetHitDone[index]) {return false};
	if (this._wait[0] > 0) {return false};
	if (this._wait[1] > 0) {return false};
	if (battler.lmbsIsInvunerableMiss()) {return false};
	if (!this._ignoreKnockback && battler.lmbsIsInvunerable()) {return false};
	if (!battler.lmbsInRange(this.X1(),this.X2(),this.Y1(),this.Y2())) {return false};
	if (this.isForDeadFriend() && !battler.isDead()) {return false};
	if (!this.isForDeadFriend() && battler.isDead()) {return false};
	if (this.isAlly(battler) && this.isForOpponent()) {return false};
	if (BattleManager.lmbsIsEndPhase()) {return false};
	if (this.isForFriend() && !this.isAlly(battler)) {return false};
	if (this.isForUser() && !this.isUser(battler)) {return false};
	if (this._item.scope === 0) {return false};
	if (BattleManager.isBattleEnd()) {return false};
	if (this.targetCanGuard(battler)) {
		this.executeGuardEffect(battler,index);
		return false;
	};
    return true;
};

//==============================
// * target Can Guard
//==============================
LMBS_Skill.prototype.targetCanGuard = function(battler) {
	if (this._ignoreGuard) {return false};
    if (!battler.lmbsIsGuarding()) {return false};
	if (this._direction === battler._lmbs_Direction) {return false};
	return true;
};

//==============================
// * execute Guard Effect
//==============================
LMBS_Skill.prototype.executeGuardEffect = function(battler,index) {
    battler._lmbs_Guard[2] = 30;
	var mirror = this._direction === 2 ? true : false; 
	battler.startAnimation(Moghunter.lmbsGuardAnimationID,mirror,0);
	if (this._multHit === 1) {this._targetHitDone[index] = true};
	if (!this._piercing && this._duration > 5) {this._duration = 5};	
};

//==============================
// * isForOpponent
//==============================
LMBS_Skill.prototype.isForOpponent = function() {
    return this.checkItemScope([1, 2, 3, 4, 5, 6]);
};

//==============================
// * isFor Friend
//==============================
LMBS_Skill.prototype.isForFriend = function() {
    return this.checkItemScope([7, 8, 9, 10, 11]);
};

//==============================
// * isFor Dead Friend
//==============================
LMBS_Skill.prototype.isForDeadFriend = function() {
    return this.checkItemScope([9, 10]);
};

//==============================
// * isFor Dead Friend
//==============================
LMBS_Skill.prototype.isForUser = function() {
    return this.checkItemScope([11]);
};

//==============================
// * isAlly
//==============================
LMBS_Skill.prototype.isAlly = function(battler) {
    if (this._user.isActor() && battler.isActor()) {return true};
	if (this._user.isEnemy() && battler.isEnemy()) {return true};
	return false;
};

//==============================
// * isUser
//==============================
LMBS_Skill.prototype.isUser = function(battler) {
    if (this._user === battler) {return true};
	return false;
};

//==============================
// * is Playing
//==============================
LMBS_Skill.prototype.isPlaying = function() {
    return this._duration > 0
};

//==============================
// * remove Sprites
//==============================
LMBS_Skill.prototype.removeSprites = function() {	
     for (var i = 0; i < this._animationSprites.length; i++) {
           this._animationSprites[i].remove();
     };
	 this.bitmap = null;
};
	
//==============================
// * is Battle End
//==============================
LMBS_Skill.prototype.isBattleEnd = function() {	
     if ($gameParty.isAllDead()) {return true};
     if ($gameTroop.isAllDead()) {return true};
     return false;   
};	

//=============================================================================
// ****** LMBS Sprite Battler *************************************************
//=============================================================================
function LmbsSpriteBattler() {
    this.initialize.apply(this, arguments);
}

LmbsSpriteBattler.prototype = Object.create(Sprite_Base.prototype);
LmbsSpriteBattler.prototype.constructor = LmbsSpriteBattler;

//==============================
// * initialize
//==============================
LmbsSpriteBattler.prototype.initialize = function(battler,index) {
    Sprite_Base.prototype.initialize.call(this);
	this._zIndex = 1000;
	this._Index = (index * 0.01);
	this.anchor.x = 0.5;
	this.anchor.y = 1.0;
	this._initRef = 5;
    this._battler = battler;
	this.createStateIconSprite();
	this.loadBitmaps();
	this._sizeRange = [0,0,0,0];
	this.visible = false;
	this._fly = [0,0,-(Math.randomInt(10)),0];
};

//==============================
// * create State Icon Sprite
//==============================
LmbsSpriteBattler.prototype.createStateIconSprite = function() {
    this._stateIconSprite = new Sprite_StateIcon();
	this._stateIconSprite._zIndex = 1010;
    this.addChild(this._stateIconSprite);
};

//==============================
// * loadBitmaps
//==============================
LmbsSpriteBattler.prototype.loadBitmaps = function() {
   if (this._battler) {this._battler.lmbsCacheActionBitmap()};
   this._SkillBitmaps = [];
   this._ItemBitmaps = [];
   this._PosesBitmaps = [];
   this._PosesBitmaps[0] = ImageManager.loadLMBSBattlers(this.bname());
   this._PosesBitmaps[3] = ImageManager.loadLMBSBattlers(this.bname())
   if (this.bname() != "") {
       this._PosesBitmaps[1] = ImageManager.loadLMBSBattlers(this.bname() + "[idle]");
	   if (this._battler._lmbs_Movement) {
	       this._PosesBitmaps[2] = ImageManager.loadLMBSBattlers(this.bname() + "[walk]");
		   if (this._battler._lmbs_Dash[0]) {this._PosesBitmaps[3] = ImageManager.loadLMBSBattlers(this.bname() + "[dash]")};
		   if (this._battler._lmbs_Jump[0]) {this._PosesBitmaps[4] = ImageManager.loadLMBSBattlers(this.bname() + "[jump]")};
		   if (this._battler._lmbs_Jump[0]) {this._PosesBitmaps[5] = ImageManager.loadLMBSBattlers(this.bname() + "[fall]")};
		   if (this._battler._lmbs_AirDash[0]) {this._PosesBitmaps[6] = ImageManager.loadLMBSBattlers(this.bname() + "[airdash]")};
	   };
	   if (this._battler._lmbs_Guard[0]) {this._PosesBitmaps[7] = ImageManager.loadLMBSBattlers(this.bname() + "[guard]")};
	   this._PosesBitmaps[8] = ImageManager.loadLMBSBattlers(this.bname() + "[cast]");
	   this._PosesBitmaps[9] = ImageManager.loadLMBSBattlers(this.bname() + "[damage]");
	   this._PosesBitmaps[10] = ImageManager.loadLMBSBattlers(this.bname() + "[dead]");
	   if (this._battler.isActor()) {this._PosesBitmaps[11] = ImageManager.loadLMBSBattlers(this.bname() + "[victory]")};
   };
   this.forceBitmap();
   this.bitmap = this._PosesBitmaps[0];
   this._poseType = -1;
   this._poseIndex = 0;
   this._poseFrameMax = 0;
   this._poseSpeed = [0,10];
   if (this._battler) {this._stateIconSprite.setup(this._battler)};
};

//==============================
// * Pose Type
//==============================
LmbsSpriteBattler.prototype.forceBitmap = function() {
	for (var i = 0; i < 12; i++) {
         if (!this._PosesBitmaps[i]) {
			 if (this._PosesBitmaps[1]) {
				 this._PosesBitmaps[i] = this._PosesBitmaps[1];
			 } else {
		         this._PosesBitmaps[i] = new Bitmap(16,16);
			 };
		 };
    };	
};

//==============================
// * Pose Type
//==============================
LmbsSpriteBattler.prototype.poseType = function() {
	 if (this._battler.lmbsIsStun() || this._battler.isDead()) {return 10};
	 if (this._battler.lmbsIsKnockbacking()) {return 9};
	 if (this._battler.isActor() && BattleManager._lmbsVictory) {return 11}
	 if (this._battler.lmbsIsCasting()) {return 8};
	 if (this._battler.lmbsIsActing()) {return -2};
	 if (this._battler.lmbsAllowGravity() && !this._battler.lmbsCanFly()) {return 5};
	 if (this._battler.lmbsIsAirDashing()) {return 6};
     if (this._battler.lmbsIsJumping()) {return 4};
     if (this._battler.lmbsIsDoubleJumping()) {return 4};
	 if (this._battler.lmbsIsWalking() && this._battler.lmbsIsDashing()) {return 3};
	 if (this._battler.lmbsIsWalking()) {return 2};
	 if (this._battler.lmbsIsGuarding()) {return 7};
	 return 1;
};

//==============================
// * Pose Speed
//==============================
LmbsSpriteBattler.prototype.poseSpeed = function() {
     if (this._battler.lmbsIsActing()) {return this._battler.lmbsPoseSpeedAction()};
	 return Math.floor(44 / this.maxFrames()); 
     return 10;
};

//==============================
// * max Frames
//==============================
LmbsSpriteBattler.prototype.maxFrames = function() {
	if (!this.bitmap || this.bitmap == null) {this.bitmap = new Bitmap(16,16)};
	if (this.bitmap === this._PosesBitmaps[0]) {return 1};
	if (this._battler.lmbsIsActing() && this._SkillBitmaps[this.skillID()] &&  this._SkillBitmaps[this.skillID()] != null && this._SkillBitmaps[this.skillID()].isReady() && this._SkillBitmaps[this.skillID()].width) {
		return Math.floor(this._SkillBitmaps[this.skillID()].width / this._SkillBitmaps[this.skillID()].height)
	};
	if (this._PosesBitmaps[this.poseType()] && this._PosesBitmaps[this.poseType()] != null && this._PosesBitmaps[this.poseType()].width) {
	   return Math.floor(this._PosesBitmaps[this.poseType()].width / this._PosesBitmaps[this.poseType()].height) 	   
	};	
	return 1;
};

//==============================
// * update Poses
//==============================
LmbsSpriteBattler.prototype.setPoseBitmap = function() {
	 if (this._battler.lmbsIsActing() && this._SkillBitmaps[this.skillID()] && this._SkillBitmaps[this.skillID()].width) {
		 return this._SkillBitmaps[this.skillID()];
	 };
     if (this._PosesBitmaps[this.poseType()] && this._PosesBitmaps[this.poseType()].isReady() && this._PosesBitmaps[this.poseType()].width) {
		 return this._PosesBitmaps[this.poseType()];
	 };
	 return this._PosesBitmaps[0];
};

//==============================
// * refresh Bitmap
//==============================
LmbsSpriteBattler.prototype.refreshBitmap = function() {
	     this.clearBaseIndex();
    	 this.bitmap = this.setPoseBitmap();
		 if (!this.bitmap || this.bitmap == null || !this.bitmap.width) {
			 this.bitmap = new Bitmap(16,16);
		 };		 
		 this._poseType = this.poseType();
};

//==============================
// * clearBaseIndex
//==============================
LmbsSpriteBattler.prototype.clearBaseIndex = function() {
		 this._poseSpeed[0] = 0;
		 this._poseIndex = 0;
		 this._poseType = -1;
		 this._battler._lmbs_NeedRefSprite = false;
};

//==============================
// * Skill
//==============================
LmbsSpriteBattler.prototype.skill = function() {
    return this._battler._lmbs_ActionUser[0];
};

//==============================
// * Skill ID
//==============================
LmbsSpriteBattler.prototype.skillID = function() {
	if (!this.skill()) {return 0}
	if (DataManager.isSkill(this.skill())) {
	   return this.skill().id;
    } else {
       return this.skill().id + 5000;
    };
};

//==============================
// * update Poses
//==============================
LmbsSpriteBattler.prototype.updatePoses = function() {
	 if (this._battler.lmbsIsActing() && this.skillID() > 0) {
		 if (!this._SkillBitmaps[this.skillID()]) {
		     var pose = this.bname() + "[" + this._battler.lmbsPoseName() + "]"
		     this._SkillBitmaps[this.skillID()] = ImageManager.loadLMBSBattlers(String(pose));
		     };
		 if (this._poseType != this.poseType() && this._SkillBitmaps[this.skillID()].isReady() && this._SkillBitmaps[this.skillID()].width) {this.refreshBitmap()};
	 } else { 	 
		 if (this._poseType != this.poseType()) {this.refreshBitmap()};
	 };
	 if (!this.bitmap || this.bitmap == null) {
		 this.bitmap = new Bitmap(16,16);
		 return;
	 };
	 this._fm = this.bitmap.height;
	 if (this._fm === 0) {return};	 
	 this._poseSpeed[0] ++;
	 if (this._poseSpeed[0] > this.poseSpeed()) {
		 this._poseSpeed[0] = 0;
		 this._poseIndex++;
		 if (this._poseIndex >= this.maxFrames()) {
			 if ((this._battler.lmbsIsActing() && !this._battler.lmbsPoseLoop())  ||
			     BattleManager._lmbsVictory) {
			    this._poseIndex = this.maxFrames() - 1;
		     } else { 
			    this._poseIndex = 0
		     };
		};
	 }
	 if (this._battler._lmbs_NeedRefSprite) {this.clearBaseIndex()};
	 this.setFrame(this._fm * this._poseIndex,0,this._fm,this._fm);
};

//==============================
// * bname
//==============================
LmbsSpriteBattler.prototype.bname = function() {
   return this._battler ? this._battler.lmbsSpriteName() : ""
};

//==============================
// * update Position
//==============================
LmbsSpriteBattler.prototype.updatePosition = function() {
	if (BattleManager._lmbsActor === this._battler) {
	    $gameTemp._lmbsFocus[0] = this.x;
		$gameTemp._lmbsFocus[1] = this.y - this._fly[2];
	};
	if (this.canUpdateFly()) {this.updateFly()};
    this.x = this._battler._lmbs_X;
    this.y = this._battler._lmbs_Y + this._fly[2];
	if (this._battler.lmbsIsStun() || this._battler.isDead()) {this.y += this._battler._lmbsDeadPoseYoffset} 
    if (this._battler._lmbs_Movement) {this.scale.x = this._battler._lmbs_Direction === 2 ? 1.00 : -1.00};
};


//==============================
// * can Update Fly
//==============================
LmbsSpriteBattler.prototype.canUpdateFly = function() {
	 if (!this._battler.lmbsCanFly()) {return false};
	 if (!this._battler.canMove()) {return false};
	 if (this._battler.lmbsIsKnockbacking()) {return false};
	 return true;
};

//==============================
// * update Fly
//==============================
LmbsSpriteBattler.prototype.updateFly = function() {
    this._fly[1]++
	if (this._fly[1] < 5) {return};
	this._fly[1] = 0;
	if (this._fly[0] === 0) {
	    this._fly[2]--
		if (this._fly[2] < -10) {this._fly[2] = -10;this._fly[0] = 1};
	} else {
	    this._fly[2]++
		if (this._fly[2] > 0) {this._fly[2] = 0;this._fly[0] = 0};		
	};
};

//==============================
// * update Check Z Index
//==============================
LmbsSpriteBattler.prototype.updateZIndex = function() {
	var zbase = Graphics.boxHeight + this._Index;
    this._zIndex = zbase - this.height;
	if (this._battler.isActor()) {
		this._zIndex += zbase;
		if (this._battler === BattleManager._lmbsActor) {this._zIndex += zbase};
	};
	if (this._zIndex < 1) {this._zIndex = 1};
};

//==============================
// * get Data
//==============================
LmbsSpriteBattler.prototype.getData = function() {
   this._battler._lmbs_SpriteSize[0] = this.width;
   this._battler._lmbs_SpriteSize[1] = this.height;
   this.visible = true;
   this.refreshBitmap();
};

//==============================
// * update State Sprite
//==============================
LmbsSpriteBattler.prototype.updateStateSprite = function() {
    this._stateIconSprite.y = -(this._battler.lmbsBodyHeight() + 40);
	this._stateIconSprite.scale.x = this.scale.x < 1.00 ? -1.00 : 1.00;
};

//==============================
// * Update Battler
//==============================
LmbsSpriteBattler.prototype.updateBattler = function() {
	if (this._battler._lmbs_SpriteSize[0] === 0) {
	    if (this.bitmap.isReady()) {this.getData()};
		return;
	};
    this.updatePosition();
	this.updatePoses();
	this.updateStateSprite();
	this.updateZIndex();
	if (this.canCollapse()) {this.updateCollapse()};
	if (this._battler.isActor() && $gameTemp._lmbsEscaped) {this.opacity -= 10};
	if (!this.bitmap || this.bitmap == null || !this.bitmap.width) {this.bitmap = new Bitmap(16,16)};
};

//==============================
// * can Collapse
//==============================
LmbsSpriteBattler.prototype.canCollapse = function() {
	if (!this._battler.isEnemy()) {return false};
	if (!this._battler.isDead()) {return false};
	if (this._battler._lmbs_Y < $gameSystem._lmbsGroundHeight) {return false};
	if (this.opacity === 0) {return false};
	return true;
};

//==============================
// * update Collapse
//==============================
LmbsSpriteBattler.prototype.updateCollapse = function() {
    this.opacity -= 5;
};

//==============================
// * Update
//==============================
LmbsSpriteBattler.prototype.update = function() {
	if ($gameTemp._lmbsSelectPhase[0]) {return};
    Sprite_Base.prototype.update.call(this);
	if (!this.bitmap) {return};
    if (this._battler) {this.updateBattler()
	} else {
	  this.visible = false;	
	};
};

//=============================================================================
// ****** Sprite Battler *************************************************
//=============================================================================

//==============================
// * Update
//==============================
var _mog_lmbs_sprtBat_update = Sprite_Battler.prototype.update;
Sprite_Battler.prototype.update = function() {
	if ($gameSystem._lmbsData[0] && this.bitmap) {
		this.visible = false;
		this._zIndex = -100;
		return;
	};
	_mog_lmbs_sprtBat_update.call(this);
	if ($gameSystem._lmbsData[0]) {
		if (this._battler) {
			this._zIndex = -100;
	        this.x = this._battler_lmbs_Y;
			this.x = this._battler_lmbs_X;
			this.visible = false;
		};
	};		
};

//=============================================================================
// ****** SpritesetBattle *****************************************************
//=============================================================================


//==============================
// * initialize
//==============================
var _mog_lmbs_sptsetbat_initialize = Spriteset_Battle.prototype.initialize;
Spriteset_Battle.prototype.initialize = function() {
	_mog_lmbs_sptsetbat_initialize.call(this);
    if ($gameSystem._lmbsData[0]) {this.lmbsCreateSprites()};
};

//==============================
// * Lmbs Create Sprites
//==============================
Spriteset_Battle.prototype.lmbsCreateSprites = function() {
	this.lmbsNeedRefTime = 2;
    for (var i = 0; i < this._actorSprites.length; i++) {
        this._battleField.removeChild(this._actorSprites[i]);
    };	
    for (var i = 0; i < this._enemySprites.length; i++) {
        this._battleField.removeChild(this._enemySprites[i]);
    };
    this.lmbsCreateBattlers();
	this.lmbsCreateShadow();
	this.lmbsCreateAnimation();	
	this.lmbsCreateSkill();
	this.lmbsCreateDamages();
	this.lmbsCreateEscapeMeter();
	this.lmbsCreateCursor();
	this.lmbsCreateCursorB();
	this._battleField.children.forEach(function(chd) {
          chd._zIndex = 0;
    }, this);
	
};	

//==============================
// * Lmbs Create Escape Meter
//==============================
Spriteset_Battle.prototype.lmbsCreateEscapeMeter = function() {
	this._lmbsEscapeA = new Sprite(ImageManager.loadLMBS("Escape_A"));
	this.addChild(this._lmbsEscapeA);
	this._lmbsEscapeB = new Sprite(ImageManager.loadLMBS("Escape_B"));
	this.addChild(this._lmbsEscapeB);	
	this._lmbsEscapeA.x = Moghunter.lmbsEscapePosX;
	this._lmbsEscapeA.y = Moghunter.lmbsEscapePosY;
	this._lmbsEscapeA.opacity = 0;
    this._lmbsEscapeB.opacity = this._lmbsEscapeA.opacity;
	this._lmbsEscapeB.x = this._lmbsEscapeA.x + Moghunter.lmbsEscapeMeterPosX;
	this._lmbsEscapeB.y = this._lmbsEscapeA.y + Moghunter.lmbsEscapeMeterPosY;
};

//==============================
// * Lmbs Create Escape Meter
//==============================
Spriteset_Battle.prototype.lmbsUpdateEscapeMeter = function() {
	if ($gameTemp._lmbsEscape[0] > 0) {
	     this._lmbsEscapeA.opacity += 15;
	} else {
		 this._lmbsEscapeA.opacity -= 15;
	};	
	this._lmbsEscapeB.opacity = this._lmbsEscapeA.opacity;
	this.lmbsRefreshEscape();
};

//==============================
// * Lmbs Refresh Escape
//==============================
Spriteset_Battle.prototype.lmbsRefreshEscape = function() {
	var wr = this._lmbsEscapeB.bitmap.width * $gameTemp._lmbsEscape[0] / $gameTemp._lmbsEscape[1];
	this._lmbsEscapeB.setFrame(0,0,wr,this._lmbsEscapeB.height)
};

//==============================
// * Lmbs Create Cursor
//==============================
Spriteset_Battle.prototype.lmbsCreateCursor = function() {
	this._lmbsCursorN = [0,0];
	this._lmbsCursor = new Sprite(ImageManager.loadLMBS("Cursor"));
	this._lmbsCursor.opacity = 0;
	this._lmbsCursor.anchor.x = 0.5;
	this._lmbsCursor.anchor.y = 1.0;
	this.addChild(this._lmbsCursor );
	this._lmbsCursorName = new Sprite(new Bitmap(120,32));
	this._lmbsCursorName.opacity = 0;
	this._lmbsCursorName.anchor.x = 0.5;
	this._lmbsCursorName.anchor.y = 1.0;
	this._lmbsCursorNameText = null;
	this.addChild(this._lmbsCursorName);
	
};

//==============================
// * Lmbs Create Cursor
//==============================
Spriteset_Battle.prototype.lmbsCreateCursorB = function() {
	this._lmbsCursorFl = [0,0,0];
	this._lmbsCursorP = new Sprite(ImageManager.loadLMBS("Cursor_B"));
	this._lmbsCursorP.opacity = 0;
	this._lmbsCursorP.anchor.x = 0.5;
	this._lmbsCursorP.anchor.y = 1.0;
	this.addChild(this._lmbsCursorP);
};

//==============================
// * Lmbs Create Battlers
//==============================
Spriteset_Battle.prototype.lmbsCreateShadow = function() {
	this._lmbsShadowSprites = [];
    for (var i = 0; i < this._lmbsBattlersSprites.length; i++) {
        this._lmbsShadowSprites[i] = new LmbsShadowSprite(this._lmbsBattlersSprites[i]);
		this._battleField.addChild(this._lmbsShadowSprites[i]);
    };	
};

//==============================
// * Lmbs Create Animation
//==============================
Spriteset_Battle.prototype.lmbsCreateAnimation = function() {
	this._lmbsAnimationSprites = [];
    for (var i = 0; i < this._lmbsBattlersSprites.length; i++) {
        this._lmbsAnimationSprites[i] = new LmbsAnimationSprite(this._lmbsBattlersSprites[i]);
		this._battleField.addChild(this._lmbsAnimationSprites[i]);
    };	
};

//==============================
// * Lmbs Create Skill
//==============================
Spriteset_Battle.prototype.lmbsCreateSkill = function() {
	this._lmbsSkillSprites = [];
    for (var i = 0; i < this._lmbsBattlersSprites.length; i++) {
        this._lmbsSkillSprites[i] = new LmbsSkillSprite(this._lmbsBattlersSprites[i]);
		this._battleField.addChild(this._lmbsSkillSprites[i]);
    };		
};

//==============================
// * Lmbs Create Damages
//==============================
Spriteset_Battle.prototype.lmbsCreateDamages = function() {
	this._lmbsDamagesSprites = [];
    for (var i = 0; i < this._lmbsBattlersSprites.length; i++) {
        this._lmbsDamagesSprites[i] = new LmbsDamageSprite(this._lmbsBattlersSprites[i]);
		this._battleField.addChild(this._lmbsDamagesSprites[i]);
    };
};

//==============================
// * Lmbs Create Battlers
//==============================
Spriteset_Battle.prototype.lmbsCreateBattlers = function() {
	this._lmbsBattlersSprites = [];
	var battler = null;
    for (var i = 0; i < $gameParty.maxBattleMembers(); i++) {
		battler = null;
		if ($gameParty.battleMembers()[i]) {battler = $gameParty.battleMembers()[i]};
        this._lmbsBattlersSprites[i] = new LmbsSpriteBattler(battler,i);
        this._battleField.addChild(this._lmbsBattlersSprites[i]);
    };
	var s2 = $gameParty.battleMembers().length
    for (var i = s2; i < s2 + $gameTroop.members().length; i++) {
		var index = i - s2;
		if ($gameTroop.members()[index]) {battler = $gameTroop.members()[index]};
        this._lmbsBattlersSprites[i] = new LmbsSpriteBattler(battler,i);
        this._battleField.addChild(this._lmbsBattlersSprites[i]);
    };
};

//==============================
// * update
//==============================
var _mog_lmbs_sprtbat_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {	
    _mog_lmbs_sprtbat_update.call(this);
	if ($gameSystem._lmbsData[0]) {this.lmbsUpdateSprites()};
};

//==============================
// * lmbs update Sprites
//==============================
Spriteset_Battle.prototype.lmbsUpdateSprites = function() {
	if (this._lmbsEscapeA) {this.lmbsUpdateEscapeMeter()};
	if (this._lmbsCursor) {this.lmbsUpdateCursor()};
	if (this._lmbsCursorP) {this.lmbsUpdateCursorB()};
    if (this.lmbsNeedRefTime > 0) {
		this.lmbsNeedRefTime--
		if (this.lmbsNeedRefTime <= 0) {
	       this._battleField.children.forEach(function(chd) {
           chd._zIndex = 0;
           }, this);
		};
	};	
	if (this._Weather_Plane) {this._Weather_Plane._zIndex = 5000};
	if (this._bbPlaneLower) {
		this._bbPlaneLower._zIndex = 0;
		this._bbPlaneUpper._zIndex = 3500;
	};
	this._battleField.children.sort(function(a, b){return a._zIndex-b._zIndex});
	
	if ($gameTemp._lmbsRefreshZIndex > 0) {
		$gameTemp._lmbsRefreshZIndex--;
		if ($gameTemp._lmbsRefreshZIndex <= 0 ) {
			this._battleField.children.sort(function(a, b){return a._zIndex-b._zIndex});
		};
	};
	this.lmbsUpdateAddons();
};

//==============================
// * lmbs update Sprites
//==============================
Spriteset_Battle.prototype.lmbsUpdateAddons = function() {
     if ($gameTemp._lmbsActionName[1] > 0) {
		 $gameTemp._lmbsActionName[1]--;
		 if ($gameTemp._lmbsActionName[1] <= 0) {
			 if (Imported.MOG_ActionName) {$gameTemp._skillNameData = [false,null,false]};
		 };
	 };
};

//==============================
// * LMBS Update Cursor
//==============================
Spriteset_Battle.prototype.lmbsUpdateCursorB = function() {	
	if (this._lmbsCursorP.opacity > 0 && BattleManager._lmbsActor) {
		this.lmbsUpdateCrF();
		var x = BattleManager._lmbsActor._lmbs_X + Moghunter.lmbsCursorPlayerX;
		var y = BattleManager._lmbsActor._lmbs_Y - BattleManager._lmbsActor.lmbsBodyHeight() - 24 + Moghunter.lmbsCursorPlayerY + this._lmbsCursorFl[1] ;
		this._lmbsCursorP.x = this._battleField.x + x;
		this._lmbsCursorP.y = this._battleField.y + y;	
	};
	if ($gameTemp._lmbsPlayerCursor[0] > 0) {
		$gameTemp._lmbsPlayerCursor[0]--;
		this._lmbsCursorP.opacity += 25;
	} else {
      this._lmbsCursorP.opacity -= 15;
	};
};

//==============================
// * LMBS Update Cursor
//==============================
Spriteset_Battle.prototype.lmbsUpdateCrF = function() {
    this._lmbsCursorFl[0]++ 
	if (this._lmbsCursorFl[0] < 15) {
		this._lmbsCursorFl[1]--;
	} else if (this._lmbsCursorFl[0] < 30) {
	    this._lmbsCursorFl[1]++;
	} else {
		this._lmbsCursorFl[0] = 0;
		this._lmbsCursorFl[1] = 0;
	};
};

//==============================
// * LMBS Update Cursor
//==============================
Spriteset_Battle.prototype.lmbsUpdateCursor = function() {
	if (this.lmbsCanUpdateCursor()) {
		if ($gameTemp._lmbsTarget[0].lmbsBodyHeight() > 200) {
		   var y = $gameTemp._lmbsTarget[0]._lmbs_Y - ($gameTemp._lmbsTarget[0].lmbsBodyHeight() / 2);
		} else {
   		   var y = $gameTemp._lmbsTarget[0]._lmbs_Y - $gameTemp._lmbsTarget[0].lmbsBodyHeight();
		};
	    this._lmbsCursorN[0] = this.lmbsCursorMove(this._lmbsCursorN[0],$gameTemp._lmbsTarget[0]._lmbs_X,5);
	    this._lmbsCursorN[1] = this.lmbsCursorMove(this._lmbsCursorN[1],y,5);
		this._lmbsCursor.opacity += 25;
		$gameTemp._lmbsFocus[0] = $gameTemp._lmbsTarget[0]._lmbs_X;
		$gameTemp._lmbsFocus[1] = $gameTemp._lmbsTarget[0]._lmbs_Y;		
	} else {
	    this._lmbsCursor.opacity -= 35;
	};
	this._lmbsCursor.x = this._battleField.x + this._lmbsCursorN[0];
	this._lmbsCursor.y = this._battleField.y + this._lmbsCursorN[1];	
	this._lmbsCursorName.x = this._lmbsCursor.x;
	this._lmbsCursorName.y = this._lmbsCursor.y - this._lmbsCursor.height; 
	this._lmbsCursorName.opacity = this._lmbsCursor.opacity;
	if ($gameTemp._lmbsTarget[0] && this._lmbsCursorNameText != $gameTemp._lmbsTarget[0].name()) {this.lmbsRefreshCursorName()};	
};

//==============================
// * LMBS Refresh Cursor Name
//==============================
Spriteset_Battle.prototype.lmbsRefreshCursorName = function() {
	this._lmbsCursorNameText = $gameTemp._lmbsTarget[0].name();
	this._lmbsCursorName.bitmap.clear();
	this._lmbsCursorName.bitmap.drawText($gameTemp._lmbsTarget[0].name(),0,0,120,32,"center");
};

//==============================
// * LMBS Can Update Cursor
//==============================
Spriteset_Battle.prototype.lmbsCanUpdateCursor = function() {
	if (!$gameTemp._lmbsTarget[0]) {return false};
	if (!$gameTemp._lmbsSelectPhase[0]) {return false};
	if ($gameTemp._lmbsMenuPhase[0] && !$gameTemp._lmbsMenuPhase[3]) {return false};
	return true;
};

//==============================
// * Lmbs Cursor Move To
//==============================
Spriteset_Battle.prototype.lmbsCursorMove = function(value,real_value,speed) {
	if (value == real_value) {return value};
	var dnspeed = 5 + (Math.abs(value - real_value) / 10);
	if (value > real_value) {value -= dnspeed;
	    if (value < real_value) {value = real_value};}
    else if (value < real_value) {value  += dnspeed;
    	if (value  > real_value) {value  = real_value};		
    };
	return Math.floor(value);
};

//==============================
// * update Main
//==============================
if (Imported.MOG_BattleCamera) {	
    //==============================
    // * Update Focus
    //==============================
	var _mog_lmbs_sprtbat_UpdateFocus = Spriteset_Battle.prototype.updateFocus;
	Spriteset_Battle.prototype.updateFocus = function() {
		if ($gameSystem._lmbsData[0]) {
			if ($gameTemp._lmbsEndPhase[2]) {
			    var c = Math.abs($gameSystem._lmbsScreenSize[0] - $gameSystem._lmbsScreenSize[1]) / 2
			    this._cam_X = $gameTemp._lmbsEndPhase[2] ? c : $gameTemp._lmbsFocus[0];
     	        this._cam_Y = $gameTemp._lmbsFocus[1] - 48;	
			} else {
			    this._cam_X = $gameTemp._lmbsFocus[0];
     	        this._cam_Y = $gameTemp._lmbsFocus[1] - 48;					
			};
			return
		};
		 _mog_lmbs_sprtbat_UpdateFocus.call(this);
	};

   //==============================
   // * Battle Cam Setup
   //==============================
   var _mog_lmbs_sprtbat_battleCamSetup = Spriteset_Battle.prototype.battleCamSetup;
   Spriteset_Battle.prototype.battleCamSetup = function() {
	   _mog_lmbs_sprtbat_battleCamSetup.call(this);
	   $gameSystem._lmbsScreenSize[0] = this._cam_limit[0];
	   $gameSystem._lmbsScreenSize[1] = this._cam_limit[1] + Graphics.boxWidth;
	   $gameSystem._lmbsScreenSize[2] = this._cam_limit[2];
	   $gameSystem._lmbsScreenSize[3] = this._cam_limit[3] + Graphics.boxHeight;	   
   };
};
	
	
	
	
	
	
	
	
	
	
	
//=============================================================================
// ****** LMBS SHADOW SPRITE **************************************************
//=============================================================================
function LmbsShadowSprite() {
    this.initialize.apply(this, arguments);
}

LmbsShadowSprite.prototype = Object.create(Sprite_Base.prototype);
LmbsShadowSprite.prototype.constructor = LmbsShadowSprite;

//==============================
// * initialize
//==============================
LmbsShadowSprite.prototype.initialize = function(sprite) {
    Sprite_Base.prototype.initialize.call(this);
	this._zIndex =  0;
	this.anchor.x = 0.5;
	this.anchor.y = 0.6;
	this._sprite = sprite;
	this.visible = false;
    this._battler = this._sprite._battler;
	this.bitmap = ImageManager.loadSystem("Shadow2");
};

//==============================
// * set Sprite Size
//==============================
LmbsShadowSprite.prototype.setSpriteSize = function() {
     this.scale.x =  this._battler.lmbsWidth() / this.width;
};

//==============================
// * Update
//==============================
LmbsShadowSprite.prototype.update = function() {
    Sprite_Base.prototype.update.call(this);
	this._zIndex =  5;
	if (this._battler) {this.updatePosition()};
	if (!this._battler) {this.visible = false};
};

//==============================
// * Update Position
//==============================
LmbsShadowSprite.prototype.updatePosition = function() {
	if (this._battler.lmbsWidth() != 0) {this.setSpriteSize()};
    this.x = this._battler._lmbs_X;
    this.y = $gameSystem._lmbsGroundHeight + Moghunter.lmbsShadowPosY;
	this.opacity = this._sprite.opacity;
	this.visible = this._sprite.visible;
};	
	
	
	
	
	
	
	
	
	
	
	
//=============================================================================
// ****** LMBS Animation Sprite  **********************************************
//=============================================================================
function LmbsAnimationSprite() {
    this.initialize.apply(this, arguments);
}

LmbsAnimationSprite.prototype = Object.create(Sprite_Base.prototype);
LmbsAnimationSprite.prototype.constructor = LmbsAnimationSprite;

//==============================
// * initialize
//==============================
LmbsAnimationSprite.prototype.initialize = function(sprite) {
    Sprite_Base.prototype.initialize.call(this);
	this._zIndex =  0;
	this._sprite = sprite;
	this.visible = false;
    this._battler = this._sprite._battler;
	this._animationSprites = [];
	var aniID = this._battler ? this._battler._lmbsCastAnimationID : Moghunter.lmbsCastAnimationID;
	var aniD = $dataAnimations[aniID].frames.length * 4 + 1;
	this._castingDuration = [aniD,aniID,aniD];
};

//==============================
// * Update
//==============================
LmbsAnimationSprite.prototype.update = function() {
	if ($gameTemp._lmbsSelectPhase[0]) {return};
    Sprite_Base.prototype.update.call(this);
	this._zIndex =  3000;
	if (this._battler) {this.updatePosition()};
};

//==============================
// * Update Position
//==============================
LmbsAnimationSprite.prototype.updatePosition = function() {
	if (this.needCastingAnimation()) {this.updateCasting();
	} else {
		this._castingDuration[0] = this._castingDuration[2];
	};
	this.updateAnimation();
    this.x = this._battler._lmbs_X;
    this.y = this._battler._lmbs_Y - (this._battler.lmbsHeight() / 2);
	this.opacity = this._sprite.opacity;
	this.visible = this._sprite.visible;
};	
	
//==============================
// * Update Casting
//==============================
LmbsAnimationSprite.prototype.updateCasting = function() {
	this._castingDuration[0]++;
	if (this._castingDuration[0] < this._castingDuration[2]) {return};
	this._castingDuration[0] = 0;
	if (this._battler._lmbs_Casting[1] < this._castingDuration[2]) {return false};
    this._battler.startAnimation(this._castingDuration[1],false,0);
};		
		
//==============================
// * Update Position
//==============================
LmbsAnimationSprite.prototype.needCastingAnimation = function() {
	if (!this._battler.lmbsIsCasting()) {return false};
	if (this._battler.lmbsIsKnockbacking()) {return false};
	return true;
};
	
//==============================
// * Setup Animation
//==============================
LmbsAnimationSprite.prototype.setupAnimation = function() {
    while (this._battler.isAnimationRequested()) {
        var data = this._battler.shiftAnimation();
        var animation = $dataAnimations[data.animationId];
		if (!animation) {return};
        var mirror = data.mirror;
        var delay = animation.position === 3 ? 0 : data.delay;
        this.startAnimation(animation, mirror, delay);
		var fixAni = this.needFixAnimation(animation);
        for (var i = 0; i < this._animationSprites.length; i++) {
            var sprite = this._animationSprites[i];
			sprite._zIndex = this._zIndex + i;
			sprite._LmbsFixPos = null;
			if (fixAni) {sprite.lmbsFixPos()};
            sprite.visible = this._battler.isSpriteVisible();
        };
    };
};
	
//==============================
// * Need Fix Animation
//==============================
LmbsAnimationSprite.prototype.needFixAnimation = function(animation) {
	  if (animation.id === Moghunter.lmbsJumpAnimationID) {return true};
	  if (animation.id === Moghunter.lmbsAirDashAnimationID) {return true};
	  return false;
};	
	
//==============================
// * Start Animation
//==============================
LmbsAnimationSprite.prototype.updateAnimation = function() {
    this.setupAnimation();
};
	
	
	
	
	
	
	
	
	
	
	

//=============================================================================
// ****** LMBS Damage Sprite  **********************************************
//=============================================================================
function LmbsDamageSprite() {
    this.initialize.apply(this, arguments);
}

LmbsDamageSprite.prototype = Object.create(Sprite_Base.prototype);
LmbsDamageSprite.prototype.constructor = LmbsDamageSprite;

//==============================
// * initialize
//==============================
LmbsDamageSprite.prototype.initialize = function(sprite) {
    Sprite_Base.prototype.initialize.call(this);
	this._zIndex =  3500;
	this._sprite = sprite;
	this.visible = false;
    this._battler = this._sprite._battler;
	this._damages = [];
};

//==============================
// * Update
//==============================
LmbsDamageSprite.prototype.update = function() {
	if ($gameTemp._lmbsSelectPhase[0]) {return};
    Sprite_Base.prototype.update.call(this);
	this._zIndex =  3500;
	if (this._battler) {this.updatePosition()};
};

//==============================
// * Update Position
//==============================
LmbsDamageSprite.prototype.updatePosition = function() {
    this.updateDamagePopup();
    this.x = this._battler._lmbs_X;
    this.y = this._battler._lmbs_Y - (this._battler.lmbsHeight() / 2);
	this.opacity = this._sprite.opacity;
	this.visible = this._sprite.visible;
};	
	
//==============================
// * Update Damage Popup
//==============================
LmbsDamageSprite.prototype.updateDamagePopup = function() {
    this.setupDamagePopup();
    if (this._damages.length > 0) {
        for (var i = 0; i < this._damages.length; i++) {
			this._damages[i].zIndex =  3500 + i
            this._damages[i].update();
			if (!this._damages[i].isPlaying()) {
				this.removeChild(this._damages[i]);
			};			
        };
		if (!this._damages[0].isPlaying()) {
			this.parent.removeChild(this._damages[0]);
			this._damages.shift();
		};			
    };
};	
	
//==============================
// * Setup Damage Popup
//==============================
LmbsDamageSprite.prototype.setupDamagePopup = function() {
    if (this._battler.isDamagePopupRequested()) {
        if (this._battler.isSpriteVisible()) {
            var sprite = new Sprite_Damage();
            sprite.x = this.x + this.damageOffsetX();
            sprite.y = this.y + this.damageOffsetY();
            sprite.setup(this._battler);
			sprite._zIndex = this._zIndex + i;
            this._damages.push(sprite);
            this.parent.addChild(sprite);
        }
        this._battler.clearDamagePopup();
        this._battler.clearResult();
    };
};

//==============================
// * Damage Offset X
//==============================
LmbsDamageSprite.prototype.damageOffsetX = function() {
    return 0;
};

//==============================
// * Damage Offset Y
//==============================
LmbsDamageSprite.prototype.damageOffsetY = function() {
    return 0;
};	
	
if (Imported.MOG_BattleCamera ) {	
var _mog_lmbs_bcam_sprtbat_cam_center = Spriteset_Battle.prototype.cam_center;
//==============================
// * Cam Center
//==============================
Spriteset_Battle.prototype.cam_center = function() {
	 if ($gameSystem._lmbsData[0]) {return};
	 _mog_lmbs_bcam_sprtbat_cam_center.call(this);
};
};
	
	
	
//=============================================================================
// ****** LMBS Sprite Animation  **********************************************
//=============================================================================	
	
//==============================
// * Update
//==============================
var _mog_lmbs_sprtAni_update = Sprite_Animation.prototype.update;
Sprite_Animation.prototype.update = function() {
	if ($gameTemp._lmbsSelectPhase[0]) {
		this.updateLMBSScreenFlash();
		return;
	};
	_mog_lmbs_sprtAni_update.call(this);
};	
	
//==============================
// * Update LMBS Screen Flash
//==============================	
Sprite_Animation.prototype.updateLMBSScreenFlash = function() {
    if (this._screenFlashDuration > 0) {
           if (this._screenFlashSprite) {
		    var d = this._screenFlashDuration;
            this._screenFlashSprite.x = -this.absoluteX();
            this._screenFlashSprite.y = -this.absoluteY();
            this._screenFlashSprite.opacity *= (d - 1) / d;
            this._screenFlashSprite.visible = (this._screenFlashDuration > 0);
        }
    }
};






//=============================================================================
// ******  Sprite Animation  **********************************************
//=============================================================================	
	
//==============================
// * Update Position
//==============================
var _mog_lmbs_sprtAni_updatePosition = Sprite_Animation.prototype.updatePosition;
Sprite_Animation.prototype.updatePosition = function() {
	if ($gameSystem._lmbsData[0] && this._target._battler) {this.lmbUpdatePositionAni();return};
	_mog_lmbs_sprtAni_updatePosition.call(this);
};


//==============================
// * lmbs Fix Pos
//==============================
Sprite_Animation.prototype.lmbsFixPos = function() {
	  if (!this._target._battler) {return};
	  this._LmbsFixPos = [];
      this._LmbsFixPos[0] = this._target._battler._lmbs_X;
	  this._LmbsFixPos[1] = this._target._battler._lmbs_Y;
};


//==============================
// * Update Position Ani
//==============================
Sprite_Animation.prototype.lmbUpdatePositionAni = function() {
	_mog_lmbs_sprtAni_updatePosition.call(this);
	if (this._LmbsFixPos) {
		this.x = this._LmbsFixPos[0];
		this.y = this._LmbsFixPos[1];
	};
};

//==============================
// * lmbs Update Vict Phase
//==============================
Scene_Battle.prototype.lmbsUpdateEndPhase = function() {
	$gameTemp._lmbsEndPhase[1]--;
	if ($gameTemp._lmbsEndPhase[1] <= 0) {
		if ($gameTemp._lmbsEndPhase[0] === 1) {
			$gameTemp._lmbsEndPhase = [2,60,false];
			AudioManager.fadeOutBgm(4);
			this.startFadeOut(60, false);
		} else if ($gameTemp._lmbsEndPhase[0] === 2) {
			$gameTemp._lmbsEndPhase = [3,60,true];
			BattleManager.lmbsCenterBattlers();
		    this.startFadeIn(60, false);
		} else if ($gameTemp._lmbsEndPhase[0] === 3) {
			$gameTemp._lmbsEndPhase = [0,0,true];
		    BattleManager.checkBattleEnd();
        } else if ($gameTemp._lmbsEndPhase[0] === 4) {
			$gameTemp._lmbsEndPhase = [0,0,false];
		    BattleManager.checkBattleEnd();			
		};
	};
	
};
