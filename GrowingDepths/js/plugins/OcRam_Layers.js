//-----------------------------------------------------------------------------
// OcRam plugins - OcRam_Layers.js
//=============================================================================

"use strict"; var Imported = Imported || {};
Imported.OcRam_Layers = true;
var OcRam_Layers = OcRam_Layers || {};
OcRam_Layers.version = '1.06';

/*:
 * @plugindesc v1.06 Display layers like fog or sunray. Layers can be inherited
 * to battle screen. You may also use layered sprites bound to map.
 * @author OcRam
 *
 * @param Layer image directory
 * @desc From where to load layer images?
 * Default: img/pictures/
 * @type text
 * @default img/pictures/
 *
 * @param Sprite image directory
 * @desc From where to load sprite images?
 * Default: img/pictures/
 * @type text
 * @default img/pictures/
 *
 * @param Default fade time
 * @desc Adjusts layer default fade out and fade in time per frame.
 * Default: 0.5 (min:0.01, max:256.00)
 * @type number
 * @max 255
 * @min 0.01
 * @decimals 2
 * @default 0.5
 * 
 * @param Default opacity
 * @desc Default opacity for new layers?
 * Default: 1 (min:0, max:1)
 * @type number
 * @max 1.00
 * @min 0.00
 * @decimals 2
 * @default 1.00
 *
 * @param Default repeat-x
 * @desc Repeat layer image horizontaly as default (image tiling)?
 * Default: true
 * @type boolean
 * @default true
 *
 * @param Default repeat-y
 * @desc Repeat layer image verticaly as default (image tiling)?
 * Default: true
 * @type boolean
 * @default true
 *
 * @param Default fixed to map
 * @desc Fixed to map = true, Fixed to screen = false
 * Fixed to screen will move layer WITH player.
 * @type boolean
 * @default true
 *
 * @param Layer 0 behind tilemap
 * @type boolean
 * @desc Draws layer Z-index 0 behind tilemap, but above parallax.
 * @default false
 *
 * @param Battle layers
 * 
 * @param Layer 0
 * @parent Battle layers
 * @type boolean
 * @desc Inherits layer 0 to battle scene.
 * @default true
 *
 * @param Layer 1
 * @parent Battle layers
 * @type boolean
 * @desc Inherits layer 1 to battle scene.
 * @default true
 *
 * @param Layer 2
 * @parent Battle layers
 * @type boolean
 * @desc Inherits layer 2 to battle scene.
 * @default true
 *
 * @param Use only parallax mapping
 * @type boolean
 * @desc If this parameter is on/true normal tilemapping will be
 * disabled! This will give nice speed-up in parallax mapping!
 * @default false
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
 * Display layers like 'shadow', 'fog' and 'sunray' with plugin commands.
 * Layers can be inherited to battle screen. You may use layered sprites for
 * stuff like 'bomb' holes and other GFX (will be deleted when transfered).
 *
 * This plugin also can be used in parallax mapping.
 *
 * ----------------------------------------------------------------------------
 * Usage
 * ============================================================================
 * Plugin command: layer z img_name scrlx scrly opacity fix_to_map fade repeat
 *
 * layer        This is the plugin command (parameters below) 
 * z            Z-index (also acts layer id) valid values 0, 1 or 2
 * img_name     Image name without extension and spaces
 * scrlx        Horizontal scroll value in pixels per frame
 * scrly        Vertical scroll value in pixels per frame
 * opacity      Opacity of this layer (0 - 1, example: 0.5 = 50% transparent)
 * fix_to_map   true = Fixed to map, false = Fixed to screen
 * fade         Fading time for this layer (gain/lose opacity PER FRAME)
 * repeat       How to repeat img (image tiling)?
 *              repeat:x,y      to fill whole layer
 *              repeat:x        to fill layer horizontaly
 *              repeat:y        to fill layer verticaly
 *              repeat:none     just draw img (img tiling = off)
 * 
 * NOTE: No spaces allowed in any parameter!
 *
 * Examples
 *
 * fixed to map, scrolling and looping 'shadows'
 *      layer 0 shadows 0.3 -0.2 0.8 true 2 repeat:x,y
 *
 * fixed to screen, scrolling and looping 'fog'
 *      layer 1 fog 3 -2 1 false 3 repeat:x,y
 *
 * fixed to screen, not scrolling nor looping foreground with 'sunrays'
 *      layer 2 sunrays 0 0 false 2 repeat:none
 *
 * You may also ommit parameters to use default values like this:
 *      layer 1 fog -2 1
 * 
 * Or if you want ommit parameter from between use asterisk (*)
 *      layer 2 sunrays 0 0 * false * repeat:none
 *
 * CLEAR layers with clear_layer [Z-index] [fade]
 *      clear_layer 0 255
 *
 * Script (for Layers)
 *      $gameMap.setLayer_OC(1, 'fog', 2, -2, 0.9, false, 1, 'repeat:x,y');
 *
 * Plugin command (img_name w/o extension/spaces):
 *      sprite [img_name] [x] [y] [Z-order] [opacity] [align]
 *
 * Script (for Sprites / Pictures)
 *      $gameMap.addSprite_OC('big_hole', x, y, 0, 1, 5);
 *
 * Following Z-orders are possible with sprites
 *      0 = Below characters layer (example shadows / tilemapping)
 *      1 = Middle layer is above characters
 *      2 = Most top layer (above other layers)
 *
 * Align uses 'keypad' align: 1=bottom-left, 5=middle, 8=top-center etc...
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
 * https://forums.rpgmakerweb.com/index.php?threads/ocram-layers.107999
 *
 * DO NOT COPY, RESELL OR CLAIM ANY PIECE OF THIS SOFTWARE AS YOUR OWN!
 * Copyright (c) 2019, Marko Paakkunainen // mmp_81 (at) hotmail.com
 *
 * ----------------------------------------------------------------------------
 * Version History
 * ============================================================================
 * 2019/04/15 v1.00 - Initial release
 * 2019/04/16 v1.01 - Parallax mapping optimization (tilepaint disabled)
 * 2019/04/17 v1.02 - Get tile width and height from system data
 *                    If parallax mapping is used, don't even load tileset 
 *                    Also added new meta tag <parallax> to TILESET note to
 *                    enable parallax mapping when this tileset is used!
 *                    New plugin params to define which layers are inherited
 *                    to battle scene!
 * 2019/04/18 v1.03 - New plugin parameter (Layer 0 behind tilemap) if this
 *                    parameter is on Layer 0 will drawed BEHIND tilemap.
 * 2019/05/16 v1.04 - Fixed bug where sprites above characters didn't work
 *                    Sprite align didn't work with plugin cmds (was always 7)
 *                    Sprites >> width and height params are no longer needed!
 * 2019/05/21 v1.05 - New PARAM [fade] to plugin command "clear_layer"
 *                    Done some pre-calculations on scroll event
 *                    Battle weather works again... (if Weather_EX is used)
 * 2019/09/07 v1.06 - Removed some unused variables
 */
/*
 * ----------------------------------------------------------------------------
 * RMMV CORE function overrides (destructive) are listed here
 * ============================================================================
 *     If using parallax mapping following overrides are done:
 *          ShaderTilemap.prototype._paintAllTiles
 *          Tileset.prototype._paintAllTiles
 *          Spriteset_Map.prototype.createTilemap
 */

function OcRam_Layer() {
    this.initialize.apply(this, arguments);
}

OcRam_Layer.prototype.initialize = function () {
    this._imgName = "";
    this._newName = "";
    this._x = 0;
    this._y = 0;
    this._z = 0;
    this._repeatX = true;
    this._repeatY = true;
    this._scrollX = 0;
    this._scrollY = 0;
    this._fixedToMap = false;
    this._opacity = 0;
    this._targetOpacity = 0;
    this._fadeTime = 0.5;
    this._instant = false;
    this._fadeIn = false; this._fadeOut = false;
    this._sprite = new TilingSprite();
};

// layer z img_name scrlx scrly opacity fix_to_map fade repeat
OcRam_Layer.prototype.applyParams = function (z, pic_name, sx, sy, o, f2m, fade, lx, ly) {

    this._newName = pic_name;
    this._z = z;
    this._fadeTime = fade;

    this._newRepeatX = lx;
    this._newRepeatY = ly;
    this._newScrollX = sx;
    this._newScrollY = sy;
    this._newFixedToMap = f2m;
    
    this._targetOpacity = o * 256;

    if (pic_name != "") {
        if (this._imgName == "") { // First time when this layer is set
            this.applyNewLayer();
        } else { // Layer already got bitmap start fade out
            this._fadeIn = false; this._fadeOut = true;
        }
    } else {
        this._fadeIn = false; this._fadeOut = true;
    }

};

OcRam_Layer.prototype.applyNewLayer = function () {

    this._imgName = this._newName;
    this._repeatX = this._newRepeatX;
    this._repeatY = this._newRepeatY;
    this._scrollX = this._newScrollX;
    this._scrollY = this._newScrollY;
    this._fixedToMap = this._newFixedToMap;
    this._opacity = 0;

    this._sprite.move(0, 0, Graphics.width, Graphics.height);
    this._sprite.bitmap = ImageManager.loadOC_Layer(this._imgName);
    this._sprite.opacity = 0;
    this._sprite.origin.x = 0;
    this._sprite.origin.y = 0;

    this._fadeIn = true; this._fadeOut = false;

};

(function (OcRam_Layers) {

    // ------------------------------------------------------------------------------
    // Plugin variables and parameters
    // ==============================================================================

    OcRam_Layers.parameters = PluginManager.parameters('OcRam_Layers');
    var _layerImgDir = String(OcRam_Layers.parameters['Layer image directory'] || 'img/pictures/');
    var _spriteImgDir = String(OcRam_Layers.parameters['Sprite image directory'] || 'img/pictures/');
    var _defaultFadeTime = parseFloat(OcRam_Layers.parameters['Default fade time']);
    var _defaultOpacity = parseFloat(OcRam_Layers.parameters['Default opacity']);
    var _defaultRepeatX = getBoolean(OcRam_Layers.parameters['Default repeat-x']);
    var _defaultRepeatY = getBoolean(OcRam_Layers.parameters['Default repeat-y']);
    var _defaultFixedToMap = getBoolean(OcRam_Layers.parameters['Default fixed to map']);
    var _battleLayer0 = getBoolean(OcRam_Layers.parameters['Layer 0']);
    var _battleLayer1 = getBoolean(OcRam_Layers.parameters['Layer 1']);
    var _battleLayer2 = getBoolean(OcRam_Layers.parameters['Layer 2']);
    var _useOnlyParallaxMapping = getBoolean(OcRam_Layers.parameters['Use only parallax mapping']);
    var _drawLayer0BehindTilemap = getBoolean(OcRam_Layers.parameters['Layer 0 behind tilemap']);
    var _debugMode = getBoolean(OcRam_Layers.parameters['Debug mode']);

    // OC Sprite variables
    var oc_sprites = [];

    // Variables for all layers
    var _allLayers = [new OcRam_Layer(), new OcRam_Layer(), new OcRam_Layer()];

    var _twh = [48, 48]; var _twh50 = [24, 24];

    var _Orginal_ShaderTilemap_paintAllTiles = ShaderTilemap.prototype._paintAllTiles;
    var _Orginal_Tilemap_paintAllTiles = Tilemap.prototype._paintAllTiles;
    var _Orginal_Spriteset_Map_createTilemap = Spriteset_Map.prototype.createTilemap;

    // ------------------------------------------------------------------------------
    // Plugin commands
    // ==============================================================================
    var OC_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        switch (command) {
            case "clear_layer": // layer z img_name scrlx scrly opacity fix_to_map fade repeat
                setLayer(args[0], '', 0, 0, 0, false, args[1]); break;
            case "layer": case "oc_layer":
                setLayer(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]); break;
            case "sprite": case "oc_sprite": // sprite [img_name] [x] [y] [Z-order] [opacity] [align] [w] [h]
                addSprite(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]); break;
            default:
                OC_Game_Interpreter_pluginCommand.call(this, command, args);
        }
    };

    // New methods to $gameMap
    Game_Map.prototype.addSprite_OC = function (pic_name, x, y, z, o, a) {
        addSprite(pic_name, x, y, z, o, a);
    };

    // layer z img_name scrlx scrly opacity fix_to_map fade repeat
    Game_Map.prototype.setLayer_OC = function (z, img_name, sx, sy, o, f2m, fade, repeat) {
        setLayer(z, img_name, sx, sy, o, f2m, fade, repeat);
    };
    Game_Map.prototype.getSprites_OC = function () {
        return oc_sprites;
    };

    // Refresh tiles on scene changes
    var OC_Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function () {
        reloadSprites(); OC_Scene_Map_start.call(this);
        _twh = [$gameMap.tileWidth(), $gameMap.tileHeight()];
        _twh50 = [$gameMap.tileWidth() * 0.5, $gameMap.tileHeight() * 0.5];
    };
    
    var OC_Game_Player_clearTransferInfo = Game_Player.prototype.clearTransferInfo;
    Game_Player.prototype.clearTransferInfo = function () {
        OC_Game_Player_clearTransferInfo.call(this); clearSprites();
    };

    // Image loaders for layers and sprites
    ImageManager.loadOC_Sprite = function (filename) {
        return this.loadBitmap(_spriteImgDir, filename, 0, true);
    };

    ImageManager.loadOC_Layer = function (filename) {
        return this.loadBitmap(_layerImgDir, filename, 0, true);
    };

    // Display foreground - This is first function to encounter in game
    var OC_Game_Map_setDisplayPos = Game_Map.prototype.setDisplayPos;
    Game_Map.prototype.setDisplayPos = function (x, y) {

        OC_Game_Map_setDisplayPos.call(this, x, y);

        if (this.isLoopHorizontal()) { _allLayers[0]._x = x; _allLayers[1]._x = x; _allLayers[2]._x = x; }
        else { _allLayers[0]._x = this._displayX; _allLayers[1]._x = this._displayX; _allLayers[2]._x = this._displayX; }

        if (this.isLoopVertical()) { _allLayers[0]._y = y; _allLayers[1]._y = y; _allLayers[2]._y = y; }
        else { _allLayers[0]._y = this._displayY; _allLayers[1]._y = this._displayY; _allLayers[2]._y = this._displayY; }

    };

    // To scroll layers and sprites
    var OC_Game_Map_scrollLeft = Game_Map.prototype.scrollLeft;
    Game_Map.prototype.scrollLeft = function(distance) {
        var lastX = this._displayX; OC_Game_Map_scrollLeft.call(this, distance);
        this.scrollX_OC(distance, lastX - this._displayX);
    };
    var OC_Game_Map_scrollRight = Game_Map.prototype.scrollRight;
    Game_Map.prototype.scrollRight = function(distance) {
        var lastX = this._displayX; OC_Game_Map_scrollRight.call(this, distance);
        this.scrollX_OC(distance, lastX - this._displayX);
    };
    var OC_Game_Map_scrollDown = Game_Map.prototype.scrollDown;
    Game_Map.prototype.scrollDown = function (distance) {
        var lastY = this._displayY; OC_Game_Map_scrollDown.call(this, distance);
        this.scrollY_OC(distance, lastY - this._displayY);
    };
    var OC_Game_Map_scrollUp = Game_Map.prototype.scrollUp;
    Game_Map.prototype.scrollUp = function(distance) {
        var lastY = this._displayY; OC_Game_Map_scrollUp.call(this, distance);
        this.scrollY_OC(distance, lastY - this._displayY);
    };

    Game_Map.prototype.scrollY_OC = function (distance, difference) {
        if (this.isLoopVertical()) {
            for (var i = 0; i < 3; i++) {
                if (_allLayers[i]._repeatY) { _allLayers[i]._y -= distance; }
            }
        } else if (this.height() >= this.screenTileY()) {
            for (var i = 0; i < 3; i++) {
                _allLayers[i]._y -= (_allLayers[i]._fixedToMap) ? difference * 2 : difference;
            }
        } if (difference !== 0) setSpritesXY(0, Math.floor(difference * _twh[1]));
    };

    Game_Map.prototype.scrollX_OC = function (distance, difference) {
        if (this.isLoopHorizontal()) {
            for (var i = 0; i < 3; i++) {
                if (_allLayers[i]._repeatX) { _allLayers[i]._x += distance; }
            }
        } else if (this.width() >= this.screenTileX()) {
            for (var i = 0; i < 3; i++) {
                _allLayers[i]._x -= (_allLayers[i]._fixedToMap) ? difference * 2 : difference;
            }
        } if (difference !== 0) setSpritesXY(Math.ceil(difference * _twh[0]), 0);
    };

    // Update layers
    var OC_Game_Map_update = Game_Map.prototype.update;
    Game_Map.prototype.update = function (sceneActive) {
        OC_Game_Map_update.call(this, sceneActive); this.updateLayer_OC(0);
        this.updateLayer_OC(1); this.updateLayer_OC(2);
    };

    Game_Map.prototype.updateLayer_OC = function (layer) {
        if (_allLayers[layer]._repeatX) {
            _allLayers[layer]._x += _allLayers[layer]._scrollX / _twh50[0];
        }
        if (_allLayers[layer]._repeatY) {
            _allLayers[layer]._y += _allLayers[layer]._scrollY / _twh50[1];
        }
    };

    var OC_Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
    Spriteset_Map.prototype.createLowerLayer = function() {
        OC_Spriteset_Map_createLowerLayer.call(this); this.createSpriteLayers_OC(); this.createLayers_OC();
        if (!_useOnlyParallaxMapping) {
            if ($dataTilesets[$dataMap.tilesetId].meta["parallax"] !== undefined) {
                useParallaxMapping();
            } else {
                useTileMapping();
            }
        }
    };

    var OC_Spriteset_Map_update = Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.update = function() {
        OC_Spriteset_Map_update.call(this); this.updateLayer_OC(_allLayers[0]);
        this.updateLayer_OC(_allLayers[1]); this.updateLayer_OC(_allLayers[2]);
    };

    Spriteset_Map.prototype.createLayers_OC = function () {
        if (!_drawLayer0BehindTilemap) {
            this._baseSprite.removeChild(this._weather);
            for (var i = 0; i < 3; i++) {
                this._baseSprite.addChild(_allLayers[i]._sprite);
            } this._baseSprite.addChild(this._weather);
        } else {
            this._baseSprite.removeChild(this._weather);
            for (var i = 1; i < 3; i++) {
                this._baseSprite.addChild(_allLayers[i]._sprite);
            } this._baseSprite.addChild(this._weather);
            var index = this._baseSprite.children.indexOf(this._parallax);
            this._baseSprite.addChildAt(_allLayers[0]._sprite, index + 1);
        }
    };

    Spriteset_Map.prototype.createSpriteLayers_OC = function () {
        this._OC_POC_layer = new TilingSprite();
        this._OC_POC_layer.move(0, 0, Graphics.width, Graphics.height);
        this._OC_Shader_layer = new TilingSprite();
        this._OC_Shader_layer.move(0, 0, Graphics.width, Graphics.height);
        this._baseSprite.removeChild(this._weather);
        this._baseSprite.addChild(this._OC_POC_layer);
        this._baseSprite.addChild(this._OC_Shader_layer);
        this._baseSprite.addChild(this._weather);
    };

    Spriteset_Map.prototype.updateLayer_OC = function (layer) {

        if (layer._sprite.bitmap) {
            if (layer._fadeOut) {
                layer._opacity -= layer._fadeTime; layer._sprite.opacity = layer._opacity;
                if (layer._opacity < layer._fadeTime) {
                    oc_debug("changing layer(" + layer._z + ") bitmap to " + layer._newName, "(was " + layer._imgName + ")");
                    layer._imgName = layer._newName;
                    if (layer._newName != "") { // Ready to apply new graphics
                        layer.applyNewLayer(); oc_debug("Applied new layer", layer);
                    } else {
                        // New name was empty
                        layer._opacity = 0; layer._sprite.opacity = 0;
                    } layer._fadeOut = false;
                }
            } else if(layer._fadeIn) {
                if (layer._targetOpacity <= layer._opacity) {
                    oc_debug("_targetOpacity reached (" + layer._targetOpacity + ")! Change complete!", "For layer(" + layer._z + ") bitmap = " + layer._newName);
                    layer._fadeIn = false;
                } else {
                    layer._opacity += layer._fadeTime; layer._sprite.opacity = layer._opacity;
                }
            }

            layer._sprite.origin.x = (layer._repeatX) ? layer._x * _twh50[0] : 0;
            layer._sprite.origin.y = (layer._repeatY) ? layer._y * _twh50[0] : 0;

        }

    };

    // BATTLE Sprites
    var OC_Spriteset_Battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
    Spriteset_Battle.prototype.createLowerLayer = function () {
        OC_Spriteset_Battle_createLowerLayer.call(this); this.createLayers_OC();
    };

    // This is done just once per game and after that UPDATE method is faster (no extra if clauses)
    var OC_Spriteset_Battle_update = Spriteset_Battle.prototype.update;
    if (_battleLayer0 && _battleLayer1 && _battleLayer2) { oc_debug("All layers are", "inherited to battle scene.");
        Spriteset_Battle.prototype.update = function () { OC_Spriteset_Battle_update.call(this); this.updateLayer_OC(0); this.updateLayer_OC(1); this.updateLayer_OC(2); };
    } else if (_battleLayer0 && _battleLayer1) { oc_debug("Layers 0 and 1 are", "inherited to battle scene.");
        Spriteset_Battle.prototype.update = function () { OC_Spriteset_Battle_update.call(this); this.updateLayer_OC(0); this.updateLayer_OC(1); };
    } else if (_battleLayer0 && _battleLayer2) { oc_debug("Layers 0 and 2 are", "inherited to battle scene.");
        Spriteset_Battle.prototype.update = function () { OC_Spriteset_Battle_update.call(this); this.updateLayer_OC(0); this.updateLayer_OC(2); };
    } else if (_battleLayer1 && _battleLayer2) { oc_debug("Layers 1 and 2 are", "inherited to battle scene.");
        Spriteset_Battle.prototype.update = function () { OC_Spriteset_Battle_update.call(this); this.updateLayer_OC(1); this.updateLayer_OC(2); };
    } else if (_battleLayer0) { oc_debug("Layer 0 is", "inherited to battle scene.");
        Spriteset_Battle.prototype.update = function () { OC_Spriteset_Battle_update.call(this); this.updateLayer_OC(0); };
    } else if (_battleLayer1) { oc_debug("Layer 1 is", "inherited to battle scene.");
        Spriteset_Battle.prototype.update = function () { OC_Spriteset_Battle_update.call(this); this.updateLayer_OC(1); };
    } else if (_battleLayer2) { oc_debug("Layer 2 is", "inherited to battle scene.");
        Spriteset_Battle.prototype.update = function () { OC_Spriteset_Battle_update.call(this); this.updateLayer_OC(2); };
    } else { oc_debug("No layers are", "inherited to battle scene."); }
    
    Spriteset_Battle.prototype.createLayers_OC = function () {
        if (_battleLayer0) this._baseSprite.addChild(_allLayers[0]._sprite);
        if (_battleLayer1) this._baseSprite.addChild(_allLayers[1]._sprite);
        if (_battleLayer2) this._baseSprite.addChild(_allLayers[2]._sprite);
    };

    Spriteset_Battle.prototype.updateLayer_OC = function (layer) {
        if (_allLayers[layer]._imgName != '') {
            if (_allLayers[layer]._scrollX != 0) {
                _allLayers[layer]._sprite.origin.x += Number(_allLayers[layer]._scrollX) * 0.5;
            }
            if (_allLayers[layer]._scrollY != 0) {
                _allLayers[layer]._sprite.origin.y += Number(_allLayers[layer]._scrollY) * 0.5;
            }
        }
    };

    // Transfer player
    var OC_Game_Interpreter_command201 = Game_Interpreter.prototype.command201;
    Game_Interpreter.prototype.command201 = function () {
        OC_Game_Interpreter_command201.call(this);
        for (var i = 0; i < 3; i++) { // Boolean flag, for instant opacity
            _allLayers[i]._instant = true;
        }
    };

    if (_drawLayer0BehindTilemap) {
        oc_debug("Draw Layer Z-index 0", "...behind tilemap");
    } else {
        oc_debug("Draw Layer Z-index 0", "...above tilemap");
    }

    if (_useOnlyParallaxMapping) {
        useParallaxMapping();
    } else {
        useTileMapping();
    }

    // ------------------------------------------------------------------------------
    // Utility functions
    // ==============================================================================
    function oc_debug(inp_txt, obj) {
        if (_debugMode) console.log("OcRam_Layers", " : ", inp_txt, obj);
    }

    function getBoolean(input) {
        if (input === undefined) return false;
        return (input.toString().toLowerCase() == "true") ? true : false;
    }

    function useParallaxMapping() {
        
        oc_debug("USE ONLY PARALLAX MAPPING", "!!!");
        ShaderTilemap.prototype._paintAllTiles = function (startX, startY) { };
        Tilemap.prototype._paintAllTiles = function (startX, startY) { };

        Spriteset_Map.prototype.createTilemap = function () {
            if (Graphics.isWebGL()) {
                this._tilemap = new ShaderTilemap();
            } else {
                this._tilemap = new Tilemap();
            }
            this._tilemap.tileWidth = $gameMap.tileWidth();
            this._tilemap.tileHeight = $gameMap.tileHeight();
            this._tilemap.setData($gameMap.width(), $gameMap.height(), $gameMap.data());
            this._tilemap.horizontalWrap = $gameMap.isLoopHorizontal();
            this._tilemap.verticalWrap = $gameMap.isLoopVertical();
            // Do not even load tileset
            //this.loadTileset();
            this._baseSprite.addChild(this._tilemap);
        };
    }

    function useTileMapping() {
        oc_debug("Using normal way to draw tilemaps.", "(no parallax mapping optimization)");
        Spriteset_Map.prototype.createTilemap = function () {
            _Orginal_Spriteset_Map_createTilemap.call(this);
        };
        ShaderTilemap.prototype._paintAllTiles = function (startX, startY) {
            _Orginal_ShaderTilemap_paintAllTiles.call(this, startX, startY);
        };
        Tilemap.prototype._paintAllTiles = function (startX, startY) {
            _Orginal_Tilemap_paintAllTiles.call(this, startX, startY);
        };
    }

    // layer z img_name scrlx scrly opacity fix_to_map fade repeat
    function setLayer(z, img_name, sx, sy, o, f2m, fade, repeat) {

        oc_debug("setLayer", "(" + z + ", " + img_name + ", sx:" + sx + ", sy:" + sy + ", o:" + o + ", f2m:" + f2m + ", fade:" + fade + ", repeat:" + repeat + ")");

        var this_layer = _allLayers[z];
        if (this_layer == null || this_layer === undefined) { oc_debug("Invalid Z-layer", "(z = " + z + ")"); return; }

        // Regulate values
        if (fade === undefined) {
            fade = _defaultFadeTime;
        } else {
            fade = (("" + fade) == "*") ? _defaultFadeTime : parseFloat(fade);
        }

        z = Number(z);
        img_name = img_name || '';
        sx = -Number(sx); sy = -Number(sy);

        if (o === undefined) {
            o = _defaultOpacity;
        } else {
            o = (isNaN(o)) ? _defaultOpacity : parseFloat(o);
        }
        
        if (f2m === undefined) {
            f2m = _defaultFixedToMap;
        } else {
            f2m = (("" + f2m) == "*") ? _defaultFixedToMap : getBoolean(f2m);
        } var lx = _defaultRepeatX; var ly = _defaultRepeatY;
        switch ((repeat + "").toLowerCase()) {
            case "repeat:x": lx = true; break;
            case "repeat:y": ly = true; break;
            case "repeat:x,y": case "repeat:y,x": ly = true; lx = true; break;
            case "repeat:none": ly = false; lx = false; break;
            default:
        }

        oc_debug("REGULATED VALUES: setLayer", "(" + z + ", " + img_name + ", sx:" + sx + ", sy:" + sy + ", o:" + o + ", f2m:" + f2m + ", fade:" + fade + ", lx:" + lx + ", ly:" + ly + ")");

        this_layer.applyParams(z, img_name, sx, sy, o, f2m, fade, lx, ly); // Apply values

    }

    function reloadSprites() {
        for (var i = 0; i < oc_sprites.length; i++) {
            if (oc_sprites[i].z > 8) {
                SceneManager._scene._spriteset._OC_POC_layer.addChild(oc_sprites[i]);
            } else {
                SceneManager._scene._spriteset._tilemap.addChild(oc_sprites[i]);
            }
        }
    }

    function setSpritesXY(x, y) {
        if (oc_sprites !== null) {
            for (var i = 0; i < oc_sprites.length; i++) {
                oc_sprites[i].x += x; oc_sprites[i].y += y;
            }
        }
    }
    function clearSprites() {
        if (SceneManager._scene._spriteset !== undefined) {
            for (var i = 0; i < oc_sprites.length; i++) {
                SceneManager._scene._spriteset._tilemap.removeChild(oc_sprites[i]);
            }
        } oc_sprites = [];
    }

    function addSprite(pic_name, x, y, z, o, a) {

        oc_debug("addSprite", [pic_name, x, y, z, o, a]);
        z = parseInt(z); x = parseInt(x); y = parseInt(y);
        
        if (z == 2) z = 9;

        var xyz_str = pic_name + "." + x + "." + y + "." + z; var b_found = false;

        var tmp_x = (x - $gameMap._displayX) * _twh[0];
        var tmp_y = (y - $gameMap._displayY) * _twh[1];

        for (var i = 0; i < oc_sprites.length; i++) {
            if (oc_sprites[i].xyz == xyz_str) { b_found = true; break; }
        }

        if (b_found == false) {

            var sprite = new Sprite(); sprite.xyz = xyz_str;
            sprite.bitmap = ImageManager.loadOC_Sprite(pic_name);
            sprite.bitmap.addLoadListener(function () {

                // Wait for bitmap to load to get dimensions from it...
                var iw = sprite.bitmap.width; var ih = sprite.bitmap.height;

                switch (parseInt(a)) {
                    case 8: tmp_x -= iw * 0.5; break; // top-middle
                    case 9: tmp_x -= iw; break; // top-right
                    case 4: tmp_y -= ih * 0.5; break; // middle-left *
                    case 5: tmp_y -= ih * 0.5; tmp_x -= iw * 0.5; break; // middle-middle
                    case 6: tmp_y -= ih * 0.5; tmp_x -= iw; break; // middle-right
                    case 1: tmp_y -= ih; break; // bottom-left *
                    case 2: tmp_y -= ih; tmp_x -= iw * 0.5; break; // bottom-middle
                    case 3: tmp_y -= ih; tmp_x -= iw; break; // bottom-right
                    default: break; // top-left *
                }

                sprite.x = tmp_x; sprite.y = tmp_y; sprite.z = z;
                oc_sprites.push(sprite);

                if (z > 8) {
                    SceneManager._scene._spriteset._OC_POC_layer.addChild(sprite);
                } else {
                    SceneManager._scene._spriteset._tilemap.addChild(sprite);
                }

            });

        }

    }

})(OcRam_Layers);