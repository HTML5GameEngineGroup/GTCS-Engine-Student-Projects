/*
 * File: Renderable.js
 *  
 * Encapsulate the Shader and VertexBuffer into the same object (and will include
 * other attributes later) to represent a Renderable object on the game screen.
 */
/*jslint node: true, vars: true */
/*global gEngine: false, Transform: false */
/* find out more about jslint: http://www.jslint.com/help.html */

// Constructor and object definition
"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * Default Constructor.<p>
 * Default Constructor creates an instance of Renderable.<p>
 * Encapsulate the Shader and VertexBuffer into the same object (and will include<p>
 * other attributes later) to represent a Renderable object on the game screen.<p>
 * @class Renderable
 * @returns {Renderable} a new instance of Renderable.
 */
function Border() {
    this.mShader = gEngine.DefaultResources.getConstColorShader();  // this is the default
    this.mXform = new Transform(); // transform that moves this object around
    this.mColor = [1, 1, 1, 1];    // color of pixel
    this.pos = [50,40];
    
    //x1, y1, x2, y2
    this.line1 = new LineRenderable(5, 75, 95, 75);
    this.line2 = new LineRenderable(5,  7.5, 95, 7.5);
    this.line3 = new LineRenderable(95, 75, 95, 7.5);
    this.line4 = new LineRenderable(5, 75 ,5, 7.5);
    
    this.top = 75;
    this.bottom = 5;
    this.right = 95;
    this.left = 5;
}

//<editor-fold desc="Public Methods">
//**-----------------------------------------
// Public methods
//**-----------------------------------------





Border.prototype.getLeft = function(){
  
    return this.left;
    
};


Border.prototype.getRight = function(){
  
    return this.right;
    
};


Border.prototype.getTop = function(){
  
    return this.top;
    
};


Border.prototype.getBottom = function(){
  
    return this.bottom;
    
};

/*
 * *
 * Draws the Renderable to the screen in the aCamera viewport.
 * @memberOf Renderable
 * @param {Camera} aCamera Camera object to draw to.
 * @returns {void}
 */
Border.prototype.draw = function (aCamera) {
    var gl = gEngine.Core.getGL();
    this.mShader.activateShader(this.mColor, aCamera);  // always activate the shader first!
    this.mShader.loadObjectTransform(this.mXform.getXform());
    
    this.line1.draw(aCamera);
    this.line2.draw(aCamera);
    this.line3.draw(aCamera);
    this.line4.draw(aCamera);
};

/**
 * Update function called on Gameloop
 * @memberOf Renderable
 * @returns {void}
 */
Border.prototype.update = function () {};

/**
 * Returns the Renderable's Transform.
 * @memberOf Renderable
 * @returns {Transform} the Transform of the Renderable.
 */
Border.prototype.getXform = function () { return this.mXform; };

/**
 * Sets the Color of the Renderable.
 * @memberOf Renderable
 * @param {float[]} color The desired Color of the Renderable.
 * @returns {void}
 */
Border.prototype.setColor = function (color) { this.mColor = color; };

/**
 * Gets the Color of the Renderable.
 * @memberOf Renderable
 * @returns {float[]} The color of the Renderable.
 */
Border.prototype.getColor = function () { return this.mColor; };
//--- end of Public Methods
//</editor-fold>

Border.prototype.setColor = function(input){
  
    this.mColor = input;
    
};

/**
 * Swap the Renderable's Shader.<p>
 * Sets the Renderable's shader and returns the previous shader.
 * @memberOf Renderable
 * @param {Shader} s Shader to set for the Renderable.
 * @returns {SimpleShader} The Renderable's current Shader.
 */
Border.prototype.swapShader = function (s) {
    var out = this.mShader;
    this.mShader = s;
    return out;
};

/**
 * Sets the Renderable's Shader
 * @memberOf Renderable
 * @param {SimpleShader} s Shader to set for the Renderable
 * @returns {void}
 */
Border.prototype._setShader = function (s) { this.mShader = s; };
