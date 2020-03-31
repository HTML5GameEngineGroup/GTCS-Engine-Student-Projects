/*
 * File: AnimateText.js 
 * Converts message text into individual words to display one at a time to
 * similute text animation.
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * Constructor for the AnimateText class.
 * 
 * @constructor
 * @param {ObjectArray} text
 * @param {2DArray} center
 * @param {int} txtheight
 * @param {RGBAColorArray} color
 * @param {int} speed
 * @returns {AnimateText}
 */
function AnimateText(text, center, txtheight, color, speed) {
    this.speed = speed;
    this.text = text;
    this.count = 0;
    this.words = text.split(" ");
    this.wordsToDraw = [];
    this.mMsg = new FontRenderable("");
    this.mMsg.setColor(color);
    this.mMsg.getXform().setPosition(center[0], center[1]);
    this.mMsg.setTextHeight(txtheight);
};

/**
 * Draws the text onto the pass in camera.
 * 
 * @param {CameraObject} camera
 * @returns {void}
 */
AnimateText.prototype.draw = function(camera) {
    this.mMsg.draw(camera);
};

/**
 * Displays the text one word at a time.
 * 
 * @returns {void}
 */
AnimateText.prototype.animateText = function() {
    if(this.speed > 0) {
        if (this.count/this.speed>=this.words.length) {
            return ;
        }
        if (this.count%this.speed === 0) {
            this.wordsToDraw.push(this.words[this.count / this.speed]);
        }
        this.mMsg.setText(this.wordsToDraw.join(" "));
        this.count++;
    } else {
        this.mMsg.setText(this.text);
    }
};

/**
 * Displays the text instantly.
 * 
 * @returns {void}
 */
AnimateText.prototype.drawStatic = function(){
    this.speed=0;
    this.animateText();
};