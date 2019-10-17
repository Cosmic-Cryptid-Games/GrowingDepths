//=============================================================================
// Toms_Example Template
// by Faytless / Thomas Pham
// Date: 10/25/2015  
 
//=============================================================================
  
 
/*:
 * @plugindesc Reilly's custom test plugin.   // Describe your plugin
 * @author Reilly Keele        // your name goes here
 *
 * @param xxxxx      //name of a parameter you want the user to edit
 * @desc yyyyy       //short description of the parameter
 * @default zzzzz    // set default value for the parameter
 
 */

 // Declare your function
 
// You are telling RPG maker that this plugin exsists.
  (function() {
  var parameters = PluginManager.parameters('template');
  
  // CREATE A WHITE SQUARE ON TITLE SCREEN

  // var jump_orb1 = new Sprite(new Bitmap(5, 5));
  // var jump_orb2 = new Sprite(new Bitmap(5, 5));
  // var dash_orb = new Sprite(new Bitmap(5, 5));

  // var Scene_Map_Start = Scene_Map.prototype.start;
  // Scene_Map.prototype.start = function() {
  //   Scene_Map_Start.call(this);
    
  //   jump_orb1.bitmap.fillAll('blue'); 
  //   jump_orb2.bitmap.fillAll('blue'); 
  //   dash_orb.bitmap.fillAll('red'); 

  //   this.addChild(jump_orb1);
  //   this.addChild(jump_orb2);
  //   this.addChild(dash_orb);
  // };

  // var Scene_Map_Update = Scene_Map.prototype.update;
  // Scene_Map.prototype.update = function() {
  //   Scene_Map_Update.call(this);

  //   jump_orb1.x = $gamePlayer.screenX() - (jump_orb1.width / 2) - 10; 
  //   jump_orb1.y = $gamePlayer.screenY() - (jump_orb1.height / 2) + 10;

  //   jump_orb2.x = $gamePlayer.screenX() - (jump_orb2.width / 2); 
  //   jump_orb2.y = $gamePlayer.screenY() - (jump_orb2.height / 2) + 10;

  //   dash_orb.x = $gamePlayer.screenX() - (dash_orb.width / 2) + 10; 
  //   dash_orb.y = $gamePlayer.screenY() - (dash_orb.height / 2) + 10;

  //   console.log("CALLING FROM MY PLUGIN");
  // };

   
  })();  // dont touch this.