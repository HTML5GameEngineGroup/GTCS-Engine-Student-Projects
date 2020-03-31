/**
 * File: MyGame.js 
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
function MyGame() {
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kMinionPortal = "assets/minion_portal.png";
    this.kBg = "assets/bg.png";
    
    //dialogue source file
    this.kDialogueFile = "assets/text_introduction.json";

    // The camera to view the scene
    this.mCamera = null;
    this.dCamera = null;
    this.mBg = null;

    // the hero and the support objects
    this.mHero = null;
    this.mPortal = null;

    this.mDialogue = null;
    this.currentOption = -1;
    this.selectedOption = -1;
    this.mOptions = null;
    this.dialogueParser = null;
    this.currentScene = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kMinionPortal);
    gEngine.Textures.loadTexture(this.kBg);
    
    gEngine.TextFileLoader.loadTextFile(this.kDialogueFile, gEngine.TextFileLoader.eTextFileType.eTextFile);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kMinionPortal);
    gEngine.Textures.unloadTexture(this.kBg);
    
    gEngine.TextFileLoader.unloadTextFile(this.kDialogueFile);
    var nextLevel = new MyGame2();
    gEngine.Core.startScene(nextLevel);
};

MyGame.prototype.initialize = function () {
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
        [70, 20, 500, 200]           // viewport (orgX, orgY, width, height)
    );
    this.dCamera.setBackgroundColor([0, 0, 0, 1]);
    
    // Large background image
    var bgR = new SpriteRenderable(this.kBg);
    bgR.setElementPixelPositions(0, 1024, 0, 1024);
    bgR.getXform().setSize(150, 150);
    bgR.getXform().setPosition(50, 35);
    this.mBg = new GameObject(bgR);

    // Objects in the scene
    this.mHero = new Hero(this.kMinionSprite);
    this.mPortal = new TextureObject(this.kMinionPortal, 65, 50, 10, 10);
    
    // Dialogue System
    this.dialogueParser = new DialogueParser(this.kDialogueFile);
    this.mDialogue = new Dialogue([50, 100/3], 90, 30, [1,1,1,1]);
    this.mDialogue.load(this.dialogueParser.loadScene("scene1"));
    this.currentScene = "scene1";
    var actions =["Cool", "Neat"];
    this.mOptions = new DialogueMultiple([50,100/3], 90, 30, actions,"Your choice", 1, 1);
};

MyGame.prototype.drawCamera = function (camera) {
    camera.setupViewProjection();
    
    // Game Objects
    this.mBg.draw(camera);
    this.mHero.draw(camera);
    this.mPortal.draw(camera); 
};

// Dialogue User Interface
MyGame.prototype.drawUI = function (camera) {
    camera.setupViewProjection();
    
    // Dialogue User Interface
    this.mDialogue.draw(camera);
    this.mOptions.draw(camera); 
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Draw with all three cameras
    this.drawCamera(this.mCamera);
    this.drawUI(this.dCamera);

};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    this.mCamera.update();  // for smoother camera movements
    this.mDialogue.update();
    
    // Game Progression Logic
    // Move to next line in dialogue
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        if (!(this.mDialogue.goNext()) && this.currentScene === "scene1") {   // No more lines
            this.mOptions.show();
            this.mDialogue.dismiss();
        } else if (!(this.mDialogue.goNext())) {
            
        };
    }
    
    if (this.selectedOption !== -1) {    // load next scene
        if (this.currentScene !== "scene2") {
            this.mDialogue.show();

            this.mDialogue.load(this.dialogueParser.loadScene("scene2"));
            this.currentScene = "scene2";
            this.mDialogue.show();
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
