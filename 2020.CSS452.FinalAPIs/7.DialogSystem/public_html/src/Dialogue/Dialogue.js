/*
 * File: Dialogue.js 
 * Manager for dialogue system. Creates dialogue box and message object to
 * display text.
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * Constructor for the dialogue class.
 * 
 * @constructor
 * @param {2DArray} center
 * @param {int} w
 * @param {int} h
 * @param {RGBAColorArray} color
 * @returns {Dialogue}
 */
function Dialogue(center, w, h, color) {
    this.mBoudingBox = new BoundingBox(center, w, h);
    this.mMessage = null;
    this.isDismissed = false;
    
    this.mCenter = center;
    this.mColor = color;
    this.mWidth = w;
    this.mHeight = h;
}

/**
 * Receives a new scene object to display and creates a new message to display
 * the scene.
 * 
 * @param {ObjectArray} newText
 * @returns {void} 
 */
Dialogue.prototype.load = function (newText) {
    this.mMessage = new Message(newText, this.mCenter, this.mWidth, 
    this.mHeight, 3, this.mColor);
};

/**
 * Updates the message object to display the next word in a sentence to
 * simulate animation.
 * 
 * @returns {void}
 */
Dialogue.prototype.update = function () {
    this.mMessage.animateText();
};

/**
 * Updates the message object to display the next line of text.
 * 
 * @returns {void}
 */
Dialogue.prototype.goNext = function () {
    return this.mMessage.goNext();
};

/**
 * Hides the dialogue UI.
 * 
 * @returns {void}
 */
Dialogue.prototype.dismiss = function () {
    this.isDismissed =true;
};

/**
 * Shows the dialogue UI
 * 
 * @returns {void}
 */
Dialogue.prototype.show = function () {
    this.isDismissed =false;
};

/**
 * Draws the dialogue box and message object.
 * 
 * @param {CameraObject} camera
 * @returns {void}
 */
Dialogue.prototype.draw = function(camera){
    if (this.isDismissed) return; // UI is hidden
    
    var line = new LineRenderable();
    line.setFirstVertex(this.mBoudingBox.minX(), this.mBoudingBox.minY());
    line.setSecondVertex(this.mBoudingBox.maxX(), this.mBoudingBox.minY());
    line.draw(camera);
    line.setFirstVertex(this.mBoudingBox.maxX(), this.mBoudingBox.minY());
    line.setSecondVertex(this.mBoudingBox.maxX(), this.mBoudingBox.maxY());
    line.draw(camera);  
    line.setFirstVertex(this.mBoudingBox.maxX(), this.mBoudingBox.maxY());
    line.setSecondVertex(this.mBoudingBox.minX(), this.mBoudingBox.maxY());
    line.draw(camera);   
    line.setFirstVertex(this.mBoudingBox.minX(), this.mBoudingBox.maxY());
    line.setSecondVertex(this.mBoudingBox.minX(), this.mBoudingBox.minY());
    line.draw(camera);
    
    this.mMessage.draw(camera);
};
