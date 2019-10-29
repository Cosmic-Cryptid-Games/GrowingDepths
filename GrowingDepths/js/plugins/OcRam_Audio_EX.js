//-----------------------------------------------------------------------------
// OcRam plugins - OcRam_Audio_EX.js
//=============================================================================

"use strict"; var Imported = Imported || {};
Imported.OcRam_Audio_EX = true;
var OcRam_Audio_EX = OcRam_Audio_EX || {};
OcRam_Audio_EX.version = '1.06';

/*:
 * @plugindesc v1.06 This plugin provides dynamic sound positioning via event
 * comments. Also adds 2 'generic' BGS channels which will play also in battle.
 * @author OcRam
 *
 * @param Default Distance
 * @desc Default distance in tiles on AEX BGS?
 * @type number
 * @min 1
 * @max 255
 * @default 20
 *
 * @param Default forced play (BGS)
 * @desc Default to forced playback on AEX BGS?
 * (BGS will start playing immediatly on scene start)
 * @type boolean
 * @default true
 *
 * @param Default loop (BGS)
 * @desc Default to loop = on?
 * (will loop the BGS)
 * @type boolean
 * @default true
 *
 * @param Default fade (BGS)
 * @desc Default fade time for BGS in seconds
 * (will fade the BGS start and end)
 * @type number
 * @min 0
 * @max 120
 * @default 2
 *
 * @param Default fade (BGM)
 * @desc Default fade time for BGM in seconds
 * (will fade the BGM start and end)
 * @type number
 * @min 0
 * @max 120
 * @default 2
 *
 * @param Use linear curve
 * @desc Use linear curve on distance check instead of exponential. (Linear math is faster than curved)
 * @type boolean
 * @default true
 *
 * @param Debug mode
 * @type boolean
 * @desc Write some events to console log (F12).
 * @default false
 * 
 * @help
 * ----------------------------------------------------------------------------
 * Introduction
 * ============================================================================
 * This plugin provides dynamic sound positioning via event comments (BGS/SE).
 * You may also play multiple BGS at the same time! All played BGS buffers will
 * be saved automatically on game save. And when game is loaded saved buffers
 * will start playing where they left.
 *
 * Plugin also adds 2 'static' BGS channels which will play also in battles.
 * Generic channels intended things like ambient / rain / storm / wind etc...
 *
 * Sources: W3Schools, http://www.w3.org/TR/webaudio/, RMMV and
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
 * and maybe some https://stackoverflow.com :)
 *
 * ----------------------------------------------------------------------------
 * Comment guide for events
 * ============================================================================
 *
 * <aex:type:distance:fade:loop:forced>
 * type     = Text      {x, y, d, bg} (1)
 * distance = In tiles  {number}
 * fade     = Seconds   {number}
 * loop     = Text      {true, false}
 * forced   = Text      {default_trigger, forced}
 *
 * (1) x = horizontal, y = vertical, d = dynamic, bg = background (everywhere)
 *
 * Following examples are written with default plugin parameters:
 *
 * Comment      <aex> is same as: <aex:d:25:0:true:forced>
 * Play BGS     bgs_fire (90, 100, 0)
 *
 * Comment      <aex:::::default_trigger> is same as:
 *              <aex:d:25:0:true:default_trigger>
 * Play BGS     bgs_fire2 (90, 100, 0)
 *
 * Comment      <aex:x::0> is same as: <aex:x:25:0:true:forced>
 * Play BGS     bgs_ocean (90, 100, 0)
 *
 * Comment      <aex:bg:0:3> is same as: <aex:bg:0:3:true:forced>
 * Play BGS     bgs_rain (90, 100, 0)
 *
 * Below are few notes:
 *
 * NOTE 1: ALL sounds created via <aex*> tags will be erased if player is
 *         transfered to another map.
 *
 * NOTE 2: "forced" parameter will execute BGS/SE always, when scene is loaded.
 *         (even if event trigger would be "Action button" or "on touch")
 *
 * NOTE 3: "default_trigger" parameter will execute BGS/SE ONLY, when
 *         event is triggered as intended.
 *
 * NOTE 4: AEX params will execute ONLY if they are on ACTIVE event page!
 *
 * ----------------------------------------------------------------------------
 * Plugin Commands
 * ============================================================================
 * 
 * Plugin command (to CLEAR aex data on event)
 *   clear_aex [eventId] -OR- clear_aex this
 *   example: clear_aex 1
 *
 * You can also ommit 'this' because it is default
 *   example: clear_aex
 *
 * Plugin command (to control dedicated bgs2, which will play also in battle):
 *   play_bgs2 [bgs_name_here] [volume] [pitch] [pan]
 *   Example: play_bgs2 rain 90 100 0
 *   stop_bgs2
 *
 * Plugin command (to control dedicated bgs3, which will play also in battle):
 *   play_bgs3 [bgs_name_here] [volume] [pitch] [pan]
 *   Example: play_bgs3 wind 40 80 0
 *   stop_bgs3
 *
 * pause_bgs [name] [fade_time]
 * resume_bgs [name] [fade_time]
 * fadeout_bgs [name] [fade_time]
 * erase_bgs [name]
 * (To erase all bgs use: erase_bgs *)
 *
 * fade [name] to [volume] in [fade_time] sec
 * Example: fade Wind to 20 in 6 sec
 * Same as: fade Wind to 20 in 6
 * BGM:     fade *bgm* to 0 in 4 sec
 *
 * ----------------------------------------------------------------------------
 * Terms of Use
 * ============================================================================
 * Edits are allowed as long as "Terms of Use" is not changed in any way.
 *
 * NON-COMMERCIAL USE: Free to use with credits to 'OcRam'
 *
 * If you gain money with your game by ANY MEANS (inc. ads, crypto-mining,
 * micro-transactions etc..) it's considered as COMMERCIAL use of this plugin!
 *
 * COMMERCIAL USE: (Standard license: 4,99 EUR, No-credits license: 39,99 EUR)
 * Payment via PayPal (https://paypal.me/MarkoPaakkunainen), please mention
 * PLUGIN NAME you are buying and your PROJECT NAME.
 *
 * Licenses are purchased per project and standard license requires credits.
 * If you want to buy several licenses: Every license purhased will give you
 * discount of 2 EUR for the next license purchase until minimum price of
 * 2 EUR / license. License discounts can be used to any of my plugins!
 *
 * https://forums.rpgmakerweb.com/index.php?threads/ocram-audio_ex.108209
 *
 * DO NOT COPY, RESELL OR CLAIM ANY PIECE OF THIS SOFTWARE AS YOUR OWN!
 * Copyright (c) 2019, Marko Paakkunainen // mmp_81 (at) hotmail.com
 *
 * ----------------------------------------------------------------------------
 * Version History
 * ============================================================================
 * 2019/04/21 v1.00 - Initial release
 * 2019/04/28 v1.01 - Allow multiple BGS with same name to play same time
 *                    Added new plugin command "clear_aex" to clear AEX sound
 *                    data and buffer from desired event.
 *                    Also made panning more notable + more efficient
 * 2019/04/29 v1.02 - Now compatible with YEP_FootstepSounds
 * 2019/05/21 v1.03 - Fixed issues with BGM (if played same BGM more than once)
 *                    New prop. 'current BGS', this enables normal BGS command!
 *                    OcRam_Weather_EX v2.00 + OcRam_Time_System compatible!
 *                    AEX distance check (linear/curved) is now parameter!
 *                    Linear MATH is faster than curved, but curved fades more
 *                    'smoothly' (starts fading slowly).
 * 2019/05/22 v1.031 >> HOTFIX replayBgm works again... sorry
 * 2019/06/03 v1.04 - Save BGM works even if BGM is nothing
 *                    On game load AEX tagged BGS will now work properly!
 * 2019/06/17 v1.05 - Load game works even if it's not saved with this plugin
 * 2019/09/06 v1.06 - Fixed forced playback on SE command
 */
/*
 * ----------------------------------------------------------------------------
 * RMMV CORE function overrides (destructive) are listed here
 * ============================================================================
 *     AudioManager.checkErrors
 *     AudioManager.playBgs
 *     AudioManager.replayBgs
 *     AudioManager.saveBgs
 *     AudioManager.updateBgsParameters
 *     AudioManager.fadeOutBgs
 *     AudioManager.fadeInBgs
 *     AudioManager.playSe
 */

// ------------------------------------------------------------------------------
// ADDITIONAL DEDICATED BGS CHANNELS THAT ARE PLAYED EVEN IN BATTLE SCENE
// (intended usage for weather bgs >> rain, storm and wind etc...)
// ==============================================================================

var _emptyAudioObj_OC = AudioManager.makeEmptyAudioObject();

AudioManager._bgs2Volume = 100; AudioManager._currentBgs2 = null; AudioManager._bgs2Buffer = null;

Object.defineProperty(AudioManager, 'bgs2Volume', {
    get: function () {
        return this._bgs2Volume;
    },
    set: function (value) {
        this._bgs2Volume = value;
        this.updateBgs2Parameters(this._currentBgs2);
    },
    configurable: true
});
AudioManager.playBgs2 = function (bgs2, pos) {
    if (this.isCurrentBgs2(bgs2)) {
        this.updateBgs2Parameters(bgs2);
    } else {
        this.stopBgs2();
        if (bgs2.name) {
            this._bgs2Buffer = this.createBuffer('bgs', bgs2.name);
            this.updateBgs2Parameters(bgs2);
            this._bgs2Buffer.play(true, pos || 0);
            this.fadeInBgs2(4);
        }
    }
    this.updateCurrentBgs2(bgs2, pos);
};
AudioManager.replayBgs2 = function (bgs2) {
    if (this.isCurrentBgs2(bgs2)) {
        this.updateBgs2Parameters(bgs2);
    } else {
        this.playBgs2(bgs2, bgs2.pos);
        if (this._bgs2Buffer) {
            this._bgs2Buffer.fadeIn(this._replayFadeTime);
        }
    }
};
AudioManager.isCurrentBgs2 = function (bgs2) {
    return (this._currentBgs2 && this._bgs2Buffer &&
        this._currentBgs2.name === bgs2.name);
};
AudioManager.updateCurrentBgs2 = function (bgs2, pos) {
    this._currentBgs2 = {
        name: bgs2.name,
        volume: bgs2.volume,
        pitch: bgs2.pitch,
        pan: bgs2.pan,
        pos: pos
    };
};
AudioManager.stopBgs2 = function () {
    if (this._bgs2Buffer) {
        this._bgs2Buffer.stop();
        this._bgs2Buffer = null;
        this._currentBgs2 = null;
    }
};
AudioManager.fadeOutBgs2 = function (duration) {
    if (this._bgs2Buffer && this._currentBgs2) {
        this._bgs2Buffer.fadeOut(duration);
        this._currentBgs2 = null;
    }
};
AudioManager.fadeInBgs2 = function (duration) {
    if (this._bgs2Buffer && this._currentBgs2) {
        this._bgs2Buffer.fadeIn(duration);
    }
};
AudioManager.saveBgs2 = function () {
    if (this._currentBgs2) {
        var bgs2 = this._currentBgs2;
        return {
            name: bgs2.name,
            volume: bgs2.volume,
            pitch: bgs2.pitch,
            pan: bgs2.pan,
            pos: this._bgs2Buffer ? this._bgs2Buffer.seek() : 0
        };
    } else {
        return _emptyAudioObj_OC;
    }
};
AudioManager.updateBgs2Parameters = function (bgs2) {
    this.updateBufferParameters(this._bgs2Buffer, this._bgs2Volume, bgs2);
};


AudioManager._bgs3Volume = 100; AudioManager._currentBgs3 = null; AudioManager._bgs3Buffer = null;

Object.defineProperty(AudioManager, 'bgs3Volume', {
    get: function () {
        return this._bgs3Volume;
    },
    set: function (value) {
        this._bgs3Volume = value;
        this.updateBgs3Parameters(this._currentBgs3);
    },
    configurable: true
});
AudioManager.playBgs3 = function (bgs3, pos) {
    if (this.isCurrentBgs3(bgs3)) {
        this.updateBgs3Parameters(bgs3);
    } else {
        this.stopBgs3();
        if (bgs3.name) {
            this._bgs3Buffer = this.createBuffer('bgs', bgs3.name);
            this.updateBgs3Parameters(bgs3);
            this._bgs3Buffer.play(true, pos || 0);
            this.fadeInBgs3(4);
        }
    }
    this.updateCurrentBgs3(bgs3, pos);
};
AudioManager.replayBgs3 = function (bgs3) {
    if (this.isCurrentBgs3(bgs3)) {
        this.updateBgs3Parameters(bgs3);
    } else {
        this.playBgs3(bgs3, bgs3.pos);
        if (this._bgs3Buffer) {
            this._bgs3Buffer.fadeIn(this._replayFadeTime);
        }
    }
};
AudioManager.isCurrentBgs3 = function (bgs3) {
    return (this._currentBgs3 && this._bgs3Buffer &&
        this._currentBgs3.name === bgs3.name);
};
AudioManager.updateBgs3Parameters = function (bgs3) {
    this.updateBufferParameters(this._bgs3Buffer, this._bgs3Volume, bgs3);
};
AudioManager.updateCurrentBgs3 = function (bgs3, pos) {
    this._currentBgs3 = {
        name: bgs3.name,
        volume: bgs3.volume,
        pitch: bgs3.pitch,
        pan: bgs3.pan,
        pos: pos
    };
};
AudioManager.stopBgs3 = function () {
    if (this._bgs3Buffer) {
        this._bgs3Buffer.stop();
        this._bgs3Buffer = null;
        this._currentBgs3 = null;
    }
};
AudioManager.fadeOutBgs3 = function (duration) {
    if (this._bgs3Buffer && this._currentBgs3) {
        this._bgs3Buffer.fadeOut(duration);
        this._currentBgs3 = null;
    }
};
AudioManager.fadeInBgs3 = function (duration) {
    if (this._bgs3Buffer && this._currentBgs3) {
        this._bgs3Buffer.fadeIn(duration);
    }
};
AudioManager.saveBgs3 = function () {
    if (this._currentBgs3) {
        var bgs3 = this._currentBgs3;
        return {
            name: bgs3.name,
            volume: bgs3.volume,
            pitch: bgs3.pitch,
            pan: bgs3.pan,
            pos: this._bgs3Buffer ? this._bgs3Buffer.seek() : 0
        };
    } else {
        return _emptyAudioObj_OC;
    }
};

// Override
AudioManager.checkErrors = function () {
    this.checkWebAudioError(this._bgmBuffer);
    this.checkWebAudioError(this._bgsBuffer);
    this.checkWebAudioError(this._bgs2Buffer);
    this.checkWebAudioError(this._bgs3Buffer);
    this.checkWebAudioError(this._meBuffer);
    this._seBuffers.forEach(function (buffer) {
        this.checkWebAudioError(buffer);
    }.bind(this));
    this._staticBuffers.forEach(function (buffer) {
        this.checkWebAudioError(buffer);
    }.bind(this));
};

(function (OcRam_Audio_EX) {

    // ------------------------------------------------------------------------------
    // Plugin variables and parameters
    // ==============================================================================

    var _params = PluginManager.parameters('OcRam_Audio_EX');

    var _defaultDistance = Number(_params['Default Distance'] || 25);
    var _defaultForced = getBoolean(_params['Default forced play (BGS)']);
    var _defaultLoop = getBoolean(_params['Default loop (BGS)']);
    var _defaultFade = Number(_params['Default fade (BGS)'] || 2);
    var _defaultBgmFade = Number(_params['Default fade (BGM)'] || 2);
    var _linearCurve = getBoolean(_params['Use linear curve']);
    var _debugMode = getBoolean(_params['Debug mode']);

    oc_debug("Debug mode:", "Enabled");
    oc_debug("Default fade BGS/BGM: " + _defaultFade + "/" + _defaultBgmFade + " | Default distance: " + _defaultDistance,
        " |  Default loop: " + _defaultLoop + " | Default forced: " + _defaultForced);

    var _pcFade; var _processedBGS = []; var _aexData = {}; var _newVolume = 0;
    AudioManager._bgsBuffers_OC = []; var _gameJustLoaded = false; var distCurve = null;

    if (_linearCurve) {
        oc_debug("DISTANCE CURVE:", "Linear");
        distCurve = function distanceCurve(a, b, m) { // Linear curve with min limit
            a--; return (a > b) ? m : Math.abs(b - a) / b;
        };
    } else {
        oc_debug("DISTANCE CURVE:", "Exponential");
        distCurve = function distanceCurve(a, b, m) { // Exponential curve with min limit
            var c = Math.pow(2, Math.log2(b) * -(a / b));
            if (c < m) { c = m; } return c;
        };
    }

    // ------------------------------------------------------------------------------
    // Plugin commands
    // ==============================================================================
    var OC_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        switch (command) {
            case "play_bgs2":
                var tmp_bgs2 = {
                    name: args[0],
                    volume: args[1],
                    pitch: args[2],
                    pan: args[3],
                    pos: args[4]
                }; oc_debug("play_bgs2", tmp_bgs2); AudioManager.playBgs2(tmp_bgs2); break;
            case "play_bgs3":
                var tmp_bgs3 = {
                    name: args[0],
                    volume: args[1],
                    pitch: args[2],
                    pan: args[3],
                    pos: args[4]
                }; oc_debug("play_bgs3", tmp_bgs3); AudioManager.playBgs3(tmp_bgs3); break;
            case "stop_bgs2":
                oc_debug("stop_bgs2", args);
                AudioManager.stopBgs2(); break;
            case "stop_bgs3":
                oc_debug("stop_bgs3", args);
                AudioManager.stopBgs3(); break;
            case "save_bgs":
                oc_debug("save_bgs", args);
                if (!isN(args[0])) {
                    AudioManager.saveBgs(args[0]);
                } break;
            case "pause_bgs":
                oc_debug("pause_bgs", args);
                if (isN(args[1])) { _pcFade = _defaultFade; } else { _pcFade = Number(args[1]); }
                if (isN(args[0])) { AudioManager.pauseBgs_OC(null, _pcFade); }
                else { AudioManager.pauseBgs_OC(String(args[0]), _pcFade); } break;
            case "resume_bgs":
                oc_debug("resume_bgs", args);
                if (isN(args[1])) { _pcFade = _defaultFade; } else { _pcFade = Number(args[1]); }
                if (isN(args[0])) { AudioManager.replayBgs(null, _pcFade); }
                else { AudioManager.replayBgs(String(args[0]), _pcFade); } break;
            case "fadeout_bgs":
                oc_debug("fadeout_bgs", args);
                if (isN(args[1])) { _pcFade = _defaultFade; } else { _pcFade = Number(args[1]); }
                if (isN(args[0])) { AudioManager.fadeOutBgs(_pcFade, null); }
                else { AudioManager.fadeOutBgs(_pcFade, String(args[0])); } break;
            case "erase_bgs":
                oc_debug("erase_bgs", args);
                if (isN(args[0])) {
                    _processedBGS = []; AudioManager.stopBgs();
                } else {
                    AudioManager.stopBgs(false, String(args[0]));
                } break;
            case "fade": // fade Wind to 20 in 6 sec
                oc_debug("fade", args);
                if (isN(args[0]) || args.length < 3) { return false; } // Name and volume is required
                var tv = Number(args[2]); tv = vmm(tv, 0, 100);
                if (isN(args[4])) {
                    _pcFade = (args[0] == "*bgm*") ? _defaultBgmFade : _defaultFade;
                } else {
                    _pcFade = Number(args[4]);
                } if (args[0] == "*bgm*") {
                    AudioManager.fadeToBgm_OC(_pcFade, tv);
                } else {
                    AudioManager.fadeToBgs_OC(String(args[0]), _pcFade, tv);
                } break;
            case "clear_aex": oc_debug("clear_aex", args);
                if (args[0] === undefined) args[0] = "this";
                var ev_id = ((args[0]).toLowerCase() == "this") ? this._eventId : parseInt(args[0]);
                AudioManager.clearAEXData(ev_id); break;
            default:
                OC_Game_Interpreter_pluginCommand.call(this, command, args);
        }
    };
    
    // Play BGS & SE commands
    var OC_Game_Interpreter_command245 = Game_Interpreter.prototype.command245;
    Game_Interpreter.prototype.command245 = function () {
        AudioManager.setupBGS_OC(this._params[0], this.eventId(), this._comments);
        return OC_Game_Interpreter_command245.call(this);
    };

    var OC_Game_Interpreter_command250 = Game_Interpreter.prototype.command250;
    Game_Interpreter.prototype.command250 = function () {
        AudioManager.setupSE_OC(this._params[0], this.eventId(), this._comments);
        return OC_Game_Interpreter_command250.call(this);
    };

    // ------------------------------------------------------------------------------
    // RMMV core - Game_Player, Scene_Title & Scene_Map - Aliases
    // ==============================================================================
    
    // On scene start >> play forced AEX tags
    var OC_Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function () {
        OC_Scene_Map_start.call(this);
        if (_gameJustLoaded) $gameSystem.playSavedBGS_OC(); // Play saved BGS buffers
        playForcedAEX(); // Play forced AEX sounds
        _gameJustLoaded = false;
    };

    var OC_Game_Event_setupPage = Game_Event.prototype.setupPage;
    Game_Event.prototype.setupPage = function () {
        OC_Game_Event_setupPage.call(this);
        if (!_gameJustLoaded) {
            if (!isEventProcessed(this.eventId())) {
                playForcedAEX(this.eventId()); // Play forced AEX sounds
            }
        }
    };

    // Make sure title BGM is stopped on new game
    var OC_Scene_Title_commandNewGame = Scene_Title.prototype.commandNewGame;
    Scene_Title.prototype.commandNewGame = function () {
        AudioManager.stopBgm(); OC_Scene_Title_commandNewGame.call(this);
    };

    var _titleBgmStarted = false; // Due faders BGM shouldn't be played again
    var OC_Scene_Title_playTitleMusic = Scene_Title.prototype.playTitleMusic;
    Scene_Title.prototype.playTitleMusic = function () {
        if (!_titleBgmStarted) OC_Scene_Title_playTitleMusic.call(this);
        _titleBgmStarted = true;
    };

    // Clear buffers when transfered (called before Scene_Map.start)
    var OC_Game_Player_performTransfer = Game_Player.prototype.performTransfer;
    Game_Player.prototype.performTransfer = function () {
        if (!_gameJustLoaded) clearBuffers();
        OC_Game_Player_performTransfer.call(this);
    };

    // Update sound position when increaseSteps is triggered (player moves 1 tile)
    var OC_Game_Player_increaseSteps = Game_Player.prototype.increaseSteps;
    Game_Player.prototype.increaseSteps = function () {
        AudioManager.updateAEX_OC(); OC_Game_Player_increaseSteps.call(this);
    };

    // ------------------------------------------------------------------------------
    // RMMV core - Game_System - Aliases
    // ==============================================================================

    // (called before OC_Game_Player_performTransfer && OC_Scene_Map_start) 
    var OC_Game_System_onAfterLoad = Game_System.prototype.onAfterLoad;
    Game_System.prototype.onAfterLoad = function () {
        oc_debug("_gameJustLoaded -flag set to true!");
        OC_Game_System_onAfterLoad.call(this);
        AudioManager._currentBgs = this._currentBgs; _gameJustLoaded = true;
    };

    var OC_Game_System_onBeforeSave = Game_System.prototype.onBeforeSave;
    Game_System.prototype.onBeforeSave = function () {
        if (AudioManager._currentBgm && AudioManager._bgmBuffer) {
            AudioManager._currentBgm.volume = AudioManager._bgmBuffer._volume * 100;
            oc_debug("Saved BGM", AudioManager._bgmBuffer);
        } this._currentBgs = AudioManager._currentBgs;
        OC_Game_System_onBeforeSave.call(this);
    };

    // ------------------------------------------------------------------------------
    // RMMV core - AudioManager - Aliases
    // ==============================================================================

    var OC_AudioManager_playBgm = AudioManager.playBgm;
    AudioManager.playBgm = function (bgm, pos) {
        oc_debug("Play BGM", bgm); if (bgm === undefined) return;
        if (this._currentBgm != null) {
            if (this._currentBgm.name === bgm.name) return;
        } var target_vol = bgm.volume; target_vol = vmm(target_vol, 0, 100);
        bgm.volume = 0; OC_AudioManager_playBgm.call(this, bgm, pos);
        bgm.volume = target_vol; this.fadeToBgm_OC(_defaultBgmFade, target_vol);
    };

    

    var OC_AudioManager_saveBgm = AudioManager.saveBgm;
    AudioManager.saveBgm = function () {
        if (this._bgmBuffer != null) {
            this._savedVol_OC = parseInt(this._bgmBuffer._volume * 100);
        } else {
            this._savedVol_OC = 0;
        } return OC_AudioManager_saveBgm.call(this);
    };

    var OC_AudioManager_replayBgm = AudioManager.replayBgm;
    AudioManager.replayBgm = function (bgm) {
        //oc_debug("this._savedVol_OC = ", this._savedVol_OC);
        bgm.volume = this._savedVol_OC;
        OC_AudioManager_replayBgm.call(this, bgm);
    };

    var OC_Game_System_replayWalkingBgm = Game_System.prototype.replayWalkingBgm;
    Game_System.prototype.replayWalkingBgm = function () {
        //oc_debug("this._savedVol_OC = ", this._savedVol_OC);
        this._walkingBgm.volume = AudioManager._savedVol_OC;
        OC_Game_System_replayWalkingBgm.call(this);
    };

    var OC_AudioManager_stopBgs = AudioManager.stopBgs;
    AudioManager.stopBgs = function (p, name) {
        this._bgsBuffers_OC = this._bgsBuffers_OC.filter(function (buffer) {
            if (isValidBGS(p, name, buffer)) {
                buffer.stop(); return false;
            } else { return true; }
        }); if (!p && name === undefined) { // No specific name given erase all
            this._bgsBuffers_OC = []; _processedBGS = [];
        } OC_AudioManager_stopBgs.call(this);
    };  

    var OC_AudioManager_updateSeParameters = AudioManager.updateSeParameters;
    AudioManager.updateSeParameters = function (buffer, se) {
        if (!se) { var new_se = getAEXDataSE(buffer._seAEXData) }
        else { var new_se = getAEXDataSE(se); } 
        if (new_se.isAEX) {
            _aexData = getNewAEXData(buffer, new_se); new_se.volume = _aexData.volume;
            if (_aexData.pan !== null) new_se.pan = _aexData.pan;
        } OC_AudioManager_updateSeParameters.call(this, buffer, new_se);
    };

    // ------------------------------------------------------------------------------
    // RMMV core - AudioManager - New methods
    // ==============================================================================
    // By default RMMV doesn't have possibility to play several BGS at the same time
    // ...so let us create buffer for multiple BGS! (RMMV already has _seBuffers)

    AudioManager.setupBGS_OC = function (aex_data, eid, pcmts, is_forced) {

        var ev = null; if (!isN(eid) && $dataMap !== null) ev = $dataMap.events[eid];
        var cmts = getComments(pcmts); validateVPP(aex_data);

        if (!isEventProcessed(eid)) { // New BGS >> push it to array and set AEX data
            if ((ev || $dataMap === null) && aex_data.name) {
                _processedBGS.push(eid);
                aex_data.eventId = eid; // To which event this BGS belongs to?
                aex_data.type = cmts[1];
                aex_data.isForced = (is_forced) ? true : false;
                aex_data.started = false;
                aex_data.isAEX = false; aex_data.useAutoPan = false; aex_data.aexType = cmts[1];
                if (cmts[1] == "x" || cmts[1] == "y") {
                    aex_data.isAEX = true; aex_data.useAutoPan = (cmts[1] == "x") ? true : false;
                } else {
                    if (cmts[1] == "d") { aex_data.isAEX = true; aex_data.useAutoPan = true; }
                } aex_data.fade = parseInt(cmts[3], 10); aex_data.startTime = 0;
                if (cmts[4] == false) { aex_data.loop = false; } else { aex_data.loop = true; }
                aex_data.distance = parseInt(cmts[2], 10); // Distance in tiles where this BGS can be heard
            }
        }

    };

    AudioManager.prepareCurrentBGS_OC = function (bgs) {
        if (bgs.type == "" || bgs.type === undefined) {
            if (AudioManager._currentBgs != null) {
                if (AudioManager._currentBgs.name != bgs.name) AudioManager.stopBgs(false, AudioManager._currentBgs.name); AudioManager.clearAEXData(0);
            } AudioManager._currentBgs = bgs; bgs.loop = true;
            oc_debug("Current BGS is now ", bgs);
        }
    };

    AudioManager.clearAEXData = function (ev_id) {
        var tmp_bgs = this._bgsBuffers_OC.filter(function (buffer) {
            if (buffer !== undefined) {
                if (buffer._bgsAEXData !== undefined) {
                    if (buffer._bgsAEXData.eventId == ev_id) {
                        removeFromProcessedBGS(ev_id); buffer.stop();
                        oc_debug("CLEAR_AEX DONE FOR eventId: " + ev_id, buffer); return false;
                    }
                }
            } return true;
        }); this._bgsBuffers_OC = tmp_bgs;
    };

    AudioManager.setupSE_OC = function (aex_data, eid, pcmts) {
        var ev = null; if (!isN(eid)) ev = $dataMap.events[eid];
        validateVPP(aex_data); var cmts = getComments(pcmts);
        if (ev && aex_data.name) {
            aex_data.eventId = eid; // To which event this SE belongs to?
            aex_data.isAEX = false; aex_data.useAutoPan = false; aex_data.aexType = cmts[1];
            if (cmts[1] == "x" || cmts[1] == "y") {
                aex_data.isAEX = true; aex_data.useAutoPan = (cmts[1] == "x") ? true : false;
            } else {
                if (cmts[1] == "d") { aex_data.isAEX = true; aex_data.useAutoPan = true; }
            } aex_data.distance = parseInt(cmts[2], 10); // Distance in tiles where this SE can be heard
            oc_debug("New SE", aex_data);
        }
    };

    AudioManager.createAndPlayBGSBuffer_OC = function (bgs, pos) {
        if (bgs.name) {
            if (!bgs.isForced || (bgs.isForced && !bgs.started)) {
                bgs.started = true; // If was 'forced' BGS mark it as started so it won't be started again...
                var buffer = this.createBuffer("bgs", bgs.name);
                buffer._bgsAEXData = getAEXData(bgs);
                buffer._bgsAEXData.pos = pos || 0;
                this.playBuffer_OC(bgs, buffer, pos);
                this._bgsBuffers_OC.push(buffer);
            }
        }
    };

    AudioManager.createAndPlaySEBuffer_OC = function (se) {
        var buffer = this.createBuffer("se", se.name);
        buffer._seAEXData = getAEXDataSE(se);
        this.updateSeParameters(buffer, se);
        buffer.play(false);
        this._seBuffers.push(buffer);
    };

    AudioManager.pauseBgs_OC = function (name, fade) {
        this.saveBgs(name); this.fadeOutBgs(fade, name);
        this._bgsBuffers_OC.forEach(function (buffer) {
            if (!isInvalidBufferName(name, buffer)) buffer._paused = true;
        });
    };

    AudioManager.fadeToBgs_OC = function (name, fade, tv) {
        tv = vmm(tv, 0, 100); // Make target volume valid
        this._bgsBuffers_OC.forEach(function (buffer) {
            if (isInvalidBufferName(name, buffer)) {
                return true;
            } else if (!buffer._paused && buffer._playing) {
                if (fade === null) fade = buffer._bgsAEXData.fade || 0;
                buffer.fadeTo_OC(fade, tv);
            }
        });
    };

    AudioManager.fadeToBgm_OC = function (fade, tv) {
        if (this._bgmBuffer !== null) {
            tv = vmm(tv, 0, 100); // Make target volume valid
            if (fade === null) fade = 0;
            this._bgmBuffer.fadeTo_OC(fade, tv);
        }
    };


    // Play desired BGS buffer
    AudioManager.playBuffer_OC = function (aex_data, bfr, pos) {
        this.updateBgsParameters(aex_data, bfr);
        bfr.play(bfr._bgsAEXData.loop, pos || 0);
        bfr._playing = true; bfr._paused = false;
        if (bfr._bgsAEXData.fade > 0) bfr.fadeIn(bfr._bgsAEXData.fade);
    };

    // Bound to Scene_Map and called on increaseSteps
    AudioManager.updateAEX_OC = function () {
        AudioManager.updateAEX_SE_OC();
        AudioManager.updateAEX_BGS_OC();
    };

    AudioManager.updateAEX_BGS_OC = function () {
        this._bgsBuffers_OC.forEach(function (buffer) {
            updatePlayerPosVsEvent(buffer, "bgs");
        });
    };

    AudioManager.updateAEX_SE_OC = function () {
        this._seBuffers.forEach(function (buffer) {
            updatePlayerPosVsEvent(buffer, "se");
        });
    };

    // ------------------------------------------------------------------------------
    // RMMV core - WebAudio and Game_System - New methods
    // ==============================================================================
    var _gnTries = 0;

    WebAudio.prototype.fadeTo_OC = function (duration, tv) {
        // Source: https://developer.mozilla.org/en-US/docs/Web/API/AudioParam
        if (this.isReady()) {
            if (this._gainNode) {
                tv = Math.abs(tv) / 100; if (tv > 1) tv = 1;
                var g = this._gainNode.gain;
                var currentTime = WebAudio._context.currentTime;
                g.cancelScheduledValues(currentTime); // If already used '...ValueAtTime'
                g.setValueAtTime(this._volume, currentTime); // Set start pos
                g.linearRampToValueAtTime(tv, currentTime + duration); // Init linear fade
                this._volume = tv; // Start fade
            } else {
                this._startPlaying(); this.fadeTo_OC(duration, tv);
            }
        } else {
            // If WebAudio wasn't ready, attach fader to WebAudio load, 
            // which will call this function when ready.
            this.addLoadListener(function () {
                oc_debug("Added fade listener", this);
                this.fadeTo_OC(duration, tv);
            }.bind(this));
        }
    };
    
    Game_System.prototype.playSavedBGS_OC = function () {
        AudioManager._bgsBuffers_OC = []; var tmp_bgs = {}; _processedBGS = [];
        if (this._bgsOnSave.forEach !== undefined) {
            this._bgsOnSave.forEach(function (buffer) {
                tmp_bgs = {
                    name: buffer.name,
                    volume: buffer.volume,
                    pitch: buffer.pitch,
                    pan: buffer.pan,
                    pos: buffer.pos
                }; // 'Current' BGS is handled seperatelly. Because it's not 'AEX'
                if (AudioManager._currentBgs == null || (AudioManager._currentBgs.name != buffer.name)) {
                    oc_debug("Loaded BGS", buffer);
                    if (!buffer.isForced) { // Play only non-forced BGS!
                        var str_cmt = "<aex:" + buffer.aexType + ":" + buffer.distance + ":" + buffer.fade + ":" + buffer.loop + ":default_trigger>";
                        AudioManager.setupBGS_OC(tmp_bgs, buffer.eventId, [str_cmt], true);
                        AudioManager.playBgs(tmp_bgs, buffer.pos);
                    }
                } else {
                    oc_debug("Loaded CURRENT BGS", buffer);
                    AudioManager._currentBgs = null; AudioManager.stopBgs(false, buffer.name); AudioManager.clearAEXData(0);
                    AudioManager.playBgs(tmp_bgs, buffer.pos);
                }
            });
        }
        
    };

    // ------------------------------------------------------------------------------
    // RMMV core - AudioManager (rpg_managers.js) - Overrides
    // ==============================================================================

    AudioManager.playBgs = function (bgs, pos) {

        this._isCurrent_OC = false; oc_debug("Play BGS", bgs);
        AudioManager.prepareCurrentBGS_OC(bgs);
        
        if (bgs && bgs.name) {
            if (pos === undefined) pos = (!isN(bgs.startTime)) ? bgs.startTime : null;
            this._bgsBuffers_OC = this._bgsBuffers_OC.filter(function (buffer) {
                return updateBGSBuffer(buffer, bgs, pos);
            }); if (!this._isCurrent_OC) this.createAndPlayBGSBuffer_OC(bgs, pos);
        } else if (bgs) {
            if (AudioManager._currentBgs != null) this.createAndPlayBGSBuffer_OC(bgs, pos);
            AudioManager.stopBgs(false, bgs.name);
            AudioManager._currentBgs = null;
        }
    };

    AudioManager.replayBgs = function (bgs, fade) {
        this._bgsBuffers_OC.forEach(function (buffer) {
            if ((bgs && !isN(bgs.name)) && buffer._bgsAEXData.name !== bgs.name) { return true; }
            if (!buffer._playing || buffer._paused) {
                if (!isN(fade)) buffer._bgsAEXData.fade = fade;
                AudioManager.playBgs(buffer._bgsAEXData, buffer._bgsAEXData.pos);
            }
        });
    };

    AudioManager.saveBgs = function (name) {
        var bgs_buffers = [];
        this._bgsBuffers_OC.forEach(function (buffer) {
            if (isInvalidBufferName(name, buffer)) return true;
            buffer._bgsAEXData.pos = buffer.seek() || 0;
            _aexData = getAEXData(buffer._bgsAEXData);
            bgs_buffers.push(_aexData);
        });
        if (bgs_buffers.length <= 0) {
            bgs_buffers[0] = _emptyAudioObj_OC;
        } return bgs_buffers;
    };

    AudioManager.updateBgsParameters = function (bgs, buffer) {
        if (buffer !== undefined) {
            var new_bgs = (!bgs) ? getAEXData(buffer._bgsAEXData) : getAEXData(bgs);
            new_bgs.pitch = new_bgs.pitch || 100;
            if (buffer._bgsAEXData.isAEX) { // this is "AEX" sound
                _aexData = getNewAEXData(buffer, buffer._bgsAEXData);
                new_bgs.volume = _aexData.volume;
                if (_aexData.pan !== null) new_bgs.pan = _aexData.pan;
            } this.updateBufferParameters(buffer, this._bgsVolume, new_bgs);
        } else {
           // in case this function is called else where...
        }
    };

    AudioManager.fadeOutBgs = function (duration, name) {
        this._bgsBuffers_OC.forEach(function (buffer) {
            if (isInvalidBufferName(name, buffer) || buffer._paused) {
                return true;
            } else if (buffer._bgsAEXData) {
                if (duration === null) duration = buffer._bgsAEXData.fade || 0;
                buffer._playing = false; buffer.fadeOut(duration);
            }
        });
    };

    AudioManager.fadeInBgs = function (duration, name) {
        this._bgsBuffers_OC.forEach(function (buffer) {
            if (isInvalidBufferName(name, buffer)) { return true; }
            buffer._playing = true; buffer._paused = false; buffer.fadeIn(duration);
        });
    };

    AudioManager.playSE = function (se) {
        if (se.name) {
            this._seBuffers = this._seBuffers.filter(function (audio) { return audio.isPlaying(); });
            this.createAndPlaySEBuffer_OC(se);
        }
    };

    // ------------------------------------------------------------------------------
    // Utility functions
    // ==============================================================================
    function oc_debug(inp_txt, inp_obj) {
        if (_debugMode) console.log("OcRam_Audio_EX", " : ", inp_txt, inp_obj);
    }

    function getBoolean(input) {
        if (input === undefined) return false;
        return (input.toString().toLowerCase() == "true") ? true : false;
    }

    function isValidBGS(p, name, bfr) {
        return (p === undefined || (p === true && bfr._bgsAEXData.isAEX) ||
            (name !== undefined && (bfr._bgsAEXData.name === name || name == "*")))
    }

    function removeFromProcessedBGS(pitem) {
        _processedBGS = _processedBGS.filter(function (item) {
            return item !== pitem;
        });
    }

    function isInvalidBufferName(name, bfr) {
        return (name !== undefined && name !== null) && bfr._bgsAEXData.name !== name;
    }

    function isNN(p) { return !!(p); }

    function getComments(cl) {

        var ca = []; if (isN(cl)) { return ca; }

        ca = (cl + ":::::").split(":");

        /*
        *Comment* <aex:x::0:> == <aex:x:25:0:true>
        ca[0] = Has to be always '<aex'
        ca[1] = 'x', 'y', 'd' or 'bg'
        ca[2] = Distance in tiles (number)
        ca[3] = Fade time in seconds (number)
        ca[4] = Loop in boolean
        ca[5] = Forced play on scene load
        */

        if (ca[0] == "<aex" || ca[0] == "<aex>") {
            switch (ca[1]) {
                case "x": case "x>": ca[1] = "x"; break;
                case "y": case "y>": ca[1] = "y"; break;
                case "bg": case "bg>": ca[1] = "bg"; break;
                default: ca[1] = "d"; break;
            }
            if (ca[1] == "bg") {
                ca[2] = 0;
            } else {
                ca[2] = parseInt(ca[2] + "", 10);
                if (isNaN(ca[2])) ca[2] = _defaultDistance;
            }
            ca[3] = parseInt(ca[3] + "", 10);
            if (isNaN(ca[3])) ca[3] = _defaultFade;
            if (ca[4] === "false" || ca[4] === "false>") { ca[4] = false; }
            else if (ca[4] === "true" || ca[4] === "true>") { ca[4] = true; }
            else { ca[4] = _defaultLoop }
        } else { ca = []; }

        if (ca.length > 0) oc_debug("Event comment array:", ca);

        return ca;

    }

    function isN(p) {
        return (p === undefined || p === null || p === "null") ? true : false;
    }

    function validateVPP(p) { // validate volume, pitch and pan
        if (p.volume !== undefined) p.volume = vmm(p.volume, 0, 100);
        if (p.pitch !== undefined) p.pitch = vmm(p.pitch, 50, 150);
        if (p.pan !== undefined) p.pan = vmm(p.pan, -100, 100);
    }

    function vmm(v, min, max) { // validate min - max
        return (v < min) ? min : (v > max) ? max : v;
    }

    function getAEXData(aex_data) { // Get aexData for BGS
        if (aex_data.name === undefined) {
            var new_aex_data = _emptyAudioObj_OC;
        } else {
            var new_aex_data = makeNewSoundObject(aex_data);
        } return noNullAEXData(new_aex_data, aex_data);
    }

    function getAEXDataSE(aex_data) { // Get aexData for SE
        if (aex_data.name === undefined) {
            var new_aex_data = _emptyAudioObj_OC;
        } else {
            var new_aex_data = makeNewSoundObject(aex_data);
        } return noNullAEXData(new_aex_data, aex_data);
    }

    function noNullAEXData(target, source) { // Make sure that target is not null
        target.isAEX = source.isAEX || false; target.aexType = source.aexType || "";
        target.isForced = source.isForced || false;
        target.useAutoPan = source.useAutoPan || false; target.eventId = source.eventId || 0;
        target.distance = source.distance || _defaultDistance; target.pos = source.pos || null;
        target.loop = source.loop || false; target.fade = source.fade || 0; return target;
    }

    function makeNewSoundObject(aex_data) { // Make new sound object as defined in RMMV
        var tmp_vpp = [100, 100, 0];
        if (aex_data.volume !== undefined) tmp_vpp[0] = aex_data.volume;
        if (aex_data.pitch !== undefined) tmp_vpp[1] = aex_data.pitch;
        if (aex_data.pan !== undefined) tmp_vpp[2] = aex_data.pan;
        return {
            name: aex_data.name,
            volume: tmp_vpp[0],
            pitch: tmp_vpp[1],
            pan: tmp_vpp[2]
        };
    }

    function clearBuffers() {
        AudioManager._bgsBuffers_OC = AudioManager._bgsBuffers_OC.filter(function (buffer) {
            if (isNN(buffer)) {
                buffer.stop(); return false;
            } else { return true; }
        });
        AudioManager._seBuffers = AudioManager._seBuffers.filter(function (buffer) {
            if (isNN(buffer)) {
                buffer.stop(); return false;
            } else { return true; }
        }); _processedBGS = [];
    }

    function updatePlayerPosVsEvent(buffer, type) {
        if (isInvalidBuffer(buffer)) return true; _newVolume = 0;
        _aexData = getNewAEXData(buffer, buffer["_" + type + "AEXData"]);
        _newVolume = (AudioManager["_" + type + "Volume"] * _aexData.volume) / 100;
        if (_aexData.pan !== null) buffer.pan = _aexData.pan / 100;
        buffer.fadeTo_OC(1, _newVolume);
    }

    function isInvalidBuffer(bfr) {
        if (bfr._bgsAEXData === undefined) return true;
        return (!bfr._bgsAEXData.isAEX || bfr._paused || bfr._playing === false);
    }

    function isEventProcessed(eid) {

        if (_processedBGS === undefined) { _processedBGS.push(0); }

        for (var i = 0; i < _processedBGS.length; i++) {
            if (_processedBGS[i] == eid) {
                oc_debug("Event already processed!", _processedBGS[i]);
                return true; // Event is already processed
            }
        } return false;

    }

    function hasAEXData(game_event) {
        if (game_event === undefined) return false;
        if (game_event == null) return false;
        if (game_event.page() === undefined) return false;
        var ret = false;
        game_event.page().list.forEach(function (cline) {
            if (cline.code == 108) { // Comment 108
                if ((cline.parameters[0]).substring(0, 4) == "<aex") ret = true; return;
            }
        }); return ret;
    }

    function playForcedAEX(ev_id) { // Find all forced AEX tags
        var evts = $gameMap.events(); var ev = null; var evl = null; var j = 0;
        var cmt = ""; var bforced = false; var dt = false; var cmts = []; var aex_found = false;
        for (var i = 0; i < evts.length; i++) {
            if (ev_id === undefined || ev_id == evts[i].eventId()) {
                bforced = false; ev = evts[i]; dt = true;
                if (ev._pageIndex > -1 && ev._erased == false) {

                    evl = ev.page().list; // Look for active event page

                    for (j = 0; j < evl.length; j++) {

                        if (evl[j].code == 108) { // Comment 108
                            cmt = evl[j].parameters[0];
                            if (cmt.substring(0, 4) == "<aex") {
                                cmts = []; cmts.push(cmt);
                                if (cmt.substring(cmt.length - 8, cmt.length) == ":forced>") {
                                    bforced = true; dt = false;
                                } else if (cmt.substring(cmt.length - 17, cmt.length) == ":default_trigger>") {
                                    bforced = false; dt = true;
                                } else { bforced = false; dt = false; }
                            }
                        }

                        if (evl[j].code == 245) {
                            bforced = bforced || (!dt && _defaultForced);
                            if (bforced) { // Play forced BGS
                                if (!isEventProcessed(ev._eventId)) {
                                    oc_debug("PLAY FORCED BGS", ev);
                                    AudioManager.setupBGS_OC(evl[j].parameters[0], ev._eventId, cmts, true);
                                    AudioManager.playBgs(evl[j].parameters[0], 0);
                                }
                            }
                        }

                        if (evl[j].code == 250 && bforced) { // Play forced SE
                            oc_debug("PLAY FORCED SE", ev);
                            AudioManager.setupSE_OC(evl[j].parameters[0], ev._eventId, cmts);
                            AudioManager.playSE(evl[j].parameters[0]);
                        }

                    }

                }
            }
        }
    }

    function updateBGSBuffer(bfr, bgs, pos) {
        var result = true;
        if ((!bfr._paused && !bfr._playing)) {
            bfr.stop(); result = false;
        } else if (bfr._bgsAEXData.name === bgs.name && !bfr._bgsAEXData.isAEX) {
            AudioManager._isCurrent_OC = true;
            if (bfr._paused) {
                if (pos === null) pos = bfr._bgsAEXData.pos;
                AudioManager.playBuffer_OC(null, bfr, pos);
            } else {
                AudioManager.updateBgsParameters(bgs, bfr);
            }
        } return result;
    }

    // Check player location vs. sound source
    function getNewAEXData(buffer, aex_data) {

        if (!aex_data) return _emptyAudioObj_OC;

        var ev = $gameMap.event(aex_data.eventId);
        if (!ev) return _emptyAudioObj_OC;

        var pxd = $gamePlayer.x - ev.x; var dY = 0; var dX = 0;
        var ret = { volume: null, pan: null };

        if (aex_data.useAutoPan) dX = Math.abs(pxd);
        if (aex_data.isAEX && aex_data.aexType != "x") dY = Math.abs($gamePlayer.y - ev.y);

        // Calculate volume based on distance (curved or linear)
        ret.volume = aex_data.volume * distCurve(dX + dY, aex_data.distance, 0.01);

        if (aex_data.useAutoPan) { // Pan only d and x AEX tags
            ret.pan = vmm(-((100 / aex_data.distance) * pxd), -100, 100);
        } else { ret.pan = 0; }

        return ret;

    }

}(OcRam_Audio_EX));