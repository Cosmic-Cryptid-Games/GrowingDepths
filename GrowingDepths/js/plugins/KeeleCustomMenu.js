//=============================================================================
// KeeleCustomMenu.js
//=============================================================================

/*:
 * @plugindesc Customizes the main title screen.
 * @author Reilly Keele
 *
 * @param Offset X
 * @desc The offset value for the x coordinate.
 * @default 0
 *
 * @param Offset Y
 * @desc The offset value for the y coordinate.
 * @default 0
 *
 * @param Width
 * @desc The width of the command window.
 * @default 240
 *
 * @param Background
 * @desc The background type. 0: Normal, 1: Dim, 2: Transparent
 * @default 0
 *
 * @help This plugin does not provide plugin commands.
 */

(function() {

    //-----------------------------------------------------------------------------
    // Window
    //
    // The window for selecting New Game/Continue on the title screen.
    
    var parameters = PluginManager.parameters('KeeleCustomMenu');
    var offsetX = Number(parameters['Offset X'] || 0);
    var offsetY = Number(parameters['Offset Y'] || 0);
    var width = Number(parameters['Width'] || 240);
    var background = Number(parameters['Background'] || 0);
    
    var _Window_TitleCommand_updatePlacement = Window_TitleCommand.prototype.updatePlacement;
    Window_TitleCommand.prototype.updatePlacement = function() {
        _Window_TitleCommand_updatePlacement.call(this);
        this.x += offsetX;
        this.y += offsetY;
        this.setBackgroundType(background);
    };
    
    Window_TitleCommand.prototype.windowWidth = function() {
        return width;
    };

    Window_TitleCommand.prototype.maxCols = function() {
        return 3;
    }

    Window_TitleCommand.prototype.numVisibleRows = function() {
        return 1;
    }

    Window_TitleCommand.prototype.itemTextAlign = function() {
        return 'center'
    }
    
    //-----------------------------------------------------------------------------
    // Scene
    //
    // The scene class of the title screen.

    Scene_Title.prototype.createWindowLayer = function() {
        Scene_Base.prototype.createWindowLayer.call(this)
        
        width = 500;
    };

    

    //-----------------------------------------------------------------------------
    // Menu
    //
    // The scene class of the title screen.

    
    
    })();
    