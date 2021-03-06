/*
 * File: Howtoplay.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, ParticleGameObjectSet, ParticleEmitter
  GameObject, Hero, Minion, Dye, Platform, Wall, DyePack, Particle, coins, score, life, x, deltaX */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Howtoplay() {
    this.kBg = "assets/how.png";
    this.mCamera = null;
    this.kBgm ="assets/sounds/sea.mp3";
}
gEngine.Core.inheritPrototype(Howtoplay, Scene);

Howtoplay.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.AudioClips.loadAudio(this.kBgm);
};

Howtoplay.prototype.unloadScene = function () {    
    gEngine.Textures.unloadTexture(this.kBg); 
    var nextLevel = new MyGame();  // load the next level
    choice=1;
    gEngine.Core.startScene(nextLevel);
    back=1;
};


Howtoplay.prototype.draw = function () {
    //gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.kCue);
};


Howtoplay.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 60), // position of the camera
        200,                         // width of camera
        [0, 0, 1280, 720]            // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.7, 0.7, 0.7, 1]);
    // sets the background to gray

    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    var bgR = new SpriteRenderable(this.kBg);
    bgR.setElementPixelPositions(0, 1024, 0, 512);
    bgR.getXform().setSize(220, 120);
    bgR.getXform().setPosition(50,60);
    this.mBg = new GameObject(bgR);
    
    //gEngine.AudioClips.playBackgroundAudio(this.kBgm);
};


// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Howtoplay.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    
    this.mBg.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
Howtoplay.prototype.update = function () {
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
        //gEngine.AudioClips.playACue(this.kCue);
            gEngine.GameLoop.stop();
    }    
};
