/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global vec2, gEngine, Scene */


"use strict";  // Operate in Strict mode such that variables must be declared before used!

function HowToPlay(){
    this.kBg = "assets/how_to_play.png";
    
    this.mCamera = null;
    this.mBg = null;
}

HowToPlay.prototype.loadScene = function(){
    gEngine.Textures.loadTexture(this.kBg);
};

HowToPlay.prototype.unloadScene = function(){
    gEngine.Textures.unloadTexture(this.kBg);
};

HowToPlay.prototype.initialize = function(){
  // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        100,                       // width of camera
        [0, 0, 1024, 512]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    
    var bgR = new SpriteRenderable(this.kBg);
    bgR.setElementPixelPositions(0, 1024, 0, 512);
    bgR.getXform().setSize(100, 50);
    bgR.getXform().setPosition(0, 0);
    this.mBg = new GameObject(bgR);
};

HowToPlay.prototype.draw = function() {
  // Step A: clear the canvas
    gEngine.Core.clearCanvas([1, 1, 1, 1.0]); // clear to bright green

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();

    // Step  C: Draw everything
    this.mBg.draw(this.mCamera);  
    
};

HowToPlay.prototype.update = function(){
  var chooseMenu = new StartGame();
  
  if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Esc)){
      gEngine.Core.startScene(chooseMenu);
  }
};

