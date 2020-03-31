/*
 * File: Message.js 
 * Text display for dialogue box.
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * Constructor for the message class.
 * 
 * @constructor
 * @param {ObjectArray} text
 * @param {2DArray} center
 * @param {int} w
 * @param {int} h
 * @param {type} txtheight
 * @param {RGBAColorArray} color
 * @returns {Message}
 */
function Message(text, center, w, h, txtheight, color) {
    this.sentences = text;
    this.currentPage = 0;
    this.pages = [];
    this.maxMsgs = h / (txtheight + 2);
    console.log(this.sentences);
    for (var i = 0; i < this.sentences.length; i++) {
        var textCenter = [center[0] - w/2 + txtheight, 
            center[1] + h/2 -(i % this.maxMsgs + 1) * (txtheight + 1)];
        var mMsg = new AnimateText(text[i].text,textCenter,txtheight,color,20);    
        this.pages.push(mMsg);
    }
    this.currentPageTitle = 0;
    this.pagesTitle = [];
    for (var i = 0; i < this.sentences.length; i++) {
        var mMsg = new FontRenderable(text[i].NPCName);
        mMsg.setColor(color);
        var textCenter = [center[0]-w/2, center[1] + h/2+4];
        mMsg.getXform().setPosition(textCenter[0], textCenter[1]);
        mMsg.setTextHeight(txtheight);
        this.pagesTitle.push(mMsg);
    }
}

/**
 * Draws the text message.
 * 
 * @param {CameraObject} camera
 * @returns {void}
 */
Message.prototype.draw = function(camera) {
    var offset = parseInt(this.currentPage/this.maxMsgs);
    for (var i = 0; i< this.maxMsgs; i++){
        if(i + offset * this.maxMsgs<this.pages.length)
            this.pages[i+offset*this.maxMsgs].draw(camera);
    } 
    this.pagesTitle[this.currentPage].draw(camera);
};

/**
 * Moves onto the next line.
 * 
 * @returns {Boolean} Returns true if there are still lines to display else false.
 */
Message.prototype.goNext = function() {
    if(this.currentPage < this.sentences.length - 1){
        this.pages[this.currentPage].drawStatic();
        this.currentPage++;
        this.currentPageTitle++;
        return true;
    } else { // no mo xre text
        return false;
    }
};

/**
 * Animates the words inside the text.
 * 
 * @returns {void}
 */
Message.prototype.animateText = function() {
    this.pages[this.currentPage].animateText();
};
