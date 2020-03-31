/**
 * File: MyGame2.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, DyePack, Hero, Minion, Brain,
  GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * 
 * @returns {MyGame}
 */
function MyGame2() {
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kBg = "assets/bg.png";
    
    //dialogue source file
    this.kDialogueFile = "assets/text_introduction.json";

    // The camera to view the scene
    this.mCamera = null;
    this.dCamera = null;
    this.mBg = null;

    // the hero and the support objects
    this.mHero = null;

    this.mDialogue = null;
    this.currentOption = -1;
    this.selectedOption = -1;
    this.mOptions = null;
    this.dialogueParser = null;
    this.currentScene = null;
}
gEngine.Core.inheritPrototype(MyGame2, Scene);

MyGame2.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kBg);
    
    gEngine.TextFileLoader.loadTextFile(this.kDialogueFile, gEngine.TextFileLoader.eTextFileType.eTextFile);
};

MyGame2.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kBg);
    
    gEngine.TextFileLoader.unloadTextFile(this.kDialogueFile);
    var nextLevel = new MyGame();
    gEngine.Core.startScene(nextLevel);
};

MyGame2.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 36), // position of the camera
        100,                       // width of camera
        [0, 0, 640, 480]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    
    // sets the background to gray
    this.dCamera = new Camera(
        vec2.fromValues(50, 36), // position of the camera
        100,                       // width of camera
        [70, 20, 500, 150]           // viewport (orgX, orgY, width, height)
    );
    this.dCamera.setBackgroundColor([0, 0, 0.2, 1]);
    
    // Large background image
    var bgR = new SpriteRenderable(this.kBg);
    bgR.setElementPixelPositions(0, 1024, 0, 1024);
    bgR.getXform().setSize(150, 150);
    bgR.getXform().setPosition(50, 35);
    this.mBg = new GameObject(bgR);

    // Objects in the scene
    this.mHero = new Hero(this.kMinionSprite);
    this.mHero.setPosDye(50, 50);
    this.mHero.setSizeDye(27, 36);
    
    // Dialogue System
    this.dialogueParser = new DialogueParser(this.kDialogueFile);
    this.mDialogue = new Dialogue([50, 100/3], 90, 15, [1,1,1,1]);
    this.mDialogue.load(this.dialogueParser.loadScene("scene3"));
    this.currentScene = "scene3";
    var actions =["Visual novel", "No clue"];
    this.mOptions = new DialogueMultiple([50, 40], 90, 20, actions,"", 0, 1);
};

MyGame2.prototype.drawCamera = function (camera) {
    camera.setupViewProjection();
    
    // Game Objects
    this.mBg.draw(camera);
    this.mHero.draw(camera);
};

// Dialogue User Interface
MyGame2.prototype.drawUI = function (camera) {
    camera.setupViewProjection();
    
    // Dialogue User Interface
    this.mDialogue.draw(camera);
    this.mOptions.draw(camera); 
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame2.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Draw with all three cameras
    this.drawCamera(this.mCamera);
    this.drawUI(this.dCamera);

};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame2.prototype.update = function () {
    this.mCamera.update();  // for smoother camera movements
    this.mDialogue.update();
    
    // Game Progression Logic
    // Move to next line in dialogue
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        if (!(this.mDialogue.goNext()) && this.currentScene === "scene3") {   // No more lines
            this.mOptions.show();
            this.mDialogue.dismiss();
            this.dCamera.setViewport([70, 20, 500, 400]);
        } else if (!(this.mDialogue.goNext())) {
            
        };
    }
    
    if (this.selectedOption === 0) {    // load next scene
        if (this.currentScene !== "scene4") {
            this.mDialogue.load(this.dialogueParser.loadScene("scene4"));
            this.currentScene = "scene4";
            this.mDialogue.show();
            this.dCamera.setViewport([70, 20, 500, 150]);
        }
    }
    
    if (this.selectedOption === 1) {    // load next scene
        if (this.currentScene !== "scene5") {
            this.mDialogue.load(this.dialogueParser.loadScene("scene5"));
            this.currentScene = "scene5";
            this.mDialogue.show();
            this.dCamera.setViewport([70, 20, 500, 150]);
        }
    }
    
    // Scene change
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Five)) {
        gEngine.GameLoop.stop();
    }
    // End of Game Progression Logic
   
    // Show dialogue
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.One)) {
        this.mDialogue.show();
        this.mOptions.show();
    }
    
    // Disappear dialogue
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Two)) {
        this.mDialogue.dismiss();
        this.mOptions.dismiss();
    }  
    
    // Arrow keys for selecting dialogue
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Right)) {
        if(this.currentOption < this.mOptions.numOptions() - 1) {
            this.currentOption++;
        } else {
            this.currentOption = 0;
        }
        
        this.mOptions.selectOption(this.currentOption);
    }   
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Left)) {
        if(this.currentOption > 0) {
            this.currentOption--;
        } else {
            this.currentOption = this.mOptions.numOptions()-1;
        }
        
        this.mOptions.selectOption(this.currentOption);
    }    
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)) {
        if(this.currentOption < this.mOptions.numOptions() - 1) {
            this.currentOption++;
        } else {
            this.currentOption = 0;
        }
        
        this.mOptions.selectOption(this.currentOption);
    }   
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Down)) {
        if(this.currentOption > 0) {
            this.currentOption--;
        } else {
            this.currentOption = this.mOptions.numOptions()-1;
        }
        
        this.mOptions.selectOption(this.currentOption);
    } 
    
    // Confirm choice
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
        this.mOptions.dismiss();
        this.selectedOption = this.mOptions.getSelectedOption();
    }    
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W)) {
            var center = this.mCamera.getWCCenter();
            this.mCamera.setWCCenter(center[0],center[1]+2);
    }   
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.S)) {
            var center = this.mCamera.getWCCenter();
            this.mCamera.setWCCenter(center[0],center[1]-2);
    }  
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.A)) {
            var center = this.mCamera.getWCCenter();
            this.mCamera.setWCCenter(center[0]-2,center[1]);
    }  
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.D)) {
            var center = this.mCamera.getWCCenter();
            this.mCamera.setWCCenter(center[0]+2,center[1]);

    } 
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.O)) {
            var vp=this.dCamera.getViewport();
            if(vp[0]>0)
                this.dCamera.setViewport([-1000,vp[1],vp[2],vp[3]]);
            else
               this.dCamera.setViewport([70,vp[1],vp[2],vp[3]]);

    }   
};