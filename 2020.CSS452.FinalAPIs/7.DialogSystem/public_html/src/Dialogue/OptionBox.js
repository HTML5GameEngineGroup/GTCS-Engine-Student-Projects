/*
 * File: Options.js 
 * Dialogue options for the dialogue system.
 */

/* global gEngine */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * Constructor for option boxes which is the UI element for choices.
 * 
 * @constructor
 * @param {2DArray} center
 * @param {int} w
 * @param {int} h
 * @param {ObjectArray} text
 * @returns {OptionBox}
 */
function OptionBox(center, w, h,text) {
    this.sq3 = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.sq3.setColor([0.5, 0.5, 0.5, 1]);
    this.sq3.getXform().setPosition(center[0],center[1]-h/2);
    this.sq3.getXform().setSize(w, h);
    this.mMsg = new FontRenderable(text);
    this.mMsg.setColor([1,1,1,1]);
    var padding = 0;
    if(text.length>2)
        padding = text.length/2;
    this.mMsg.getXform().setPosition(center[0]-padding,center[1]-h/2);
    this.mMsg.setTextHeight(3);
    this.mBoudingBox = new BoundingBox([center[0],center[1]-h/2],w,h);
}

/**
 * Draws the option boxes onto current camera.
 * 
 * @param {CameraObject} camera
 * @returns {void}
 */
OptionBox.prototype.draw = function(camera) {
  this.sq3.draw(camera);
  this.mMsg.draw(camera);
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
};

/**
 * Highlights the current selected option.
 * 
 * @returns {void}
 */
OptionBox.prototype.select = function(){
    this.sq3.setColor([0.8, 0.8, 0.8, 1]);
    this.mMsg.setColor([0.2,0.5,1,1]);
};

/**
 * Unhighlights the current selected option.
 * @returns {void}
 */
OptionBox.prototype.deSelect = function(){
    this.sq3.setColor([0.5, 0.5, 0.5, 1]);
    this.mMsg.setColor([1,1,1,1]);
};

