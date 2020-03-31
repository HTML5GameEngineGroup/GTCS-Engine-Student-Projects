/*
 * File: DialogueMultiple.js 
 * Manager class for dialogue options.
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * Constructor for dialogue options
 * 
 * @constructor
 * @param {2DArray} center
 * @param {int} w
 * @param {int} h
 * @param {StringArray} actions
 * @param {type} title
 * @param {type} style
 * @param {type} tag
 * @returns {DialogueMultiple}
 */
function DialogueMultiple(center, w, h, actions, title, style, tag) {
    this.count = actions.length;
    this.mMsg = new FontRenderable(title);
    this.mMsg.setColor([0,1,1,1]);

    this.mMsg.getXform().setPosition(center[0]-w/2,center[1]+h/2);
    this.mMsg.setTextHeight(3);
    this.options=[];
    for(var i = 0; i<actions.length; i++){
         var option = null;
         console.log(center[0]-w/2);
         if(style === 0)
             option = new OptionBox([center[0]-w/2+(i+0.5)*(w/(this.count)),center[1]],w/(this.count),h,actions[i]);
          else
             option = new OptionBox([center[0],center[1]-h/2+(i+1)*(h/(this.count+1))],w,h/(this.count+1),actions[i]);
        option.isSelected = false;
        this.options.push(option);
     } 
    this.tag = tag;
    this.isDismissed = true;
    this.selectedValue = -1;
}

/**
 * Draws every option.
 * 
 * @param {CameraObject} camera
 * @returns {void}
 */
DialogueMultiple.prototype.draw = function (camera) {
    if(this.isDismissed===true)
        return ;
    for(var i = 0; i<this.options.length; i++){
        var option = this.options[i];
        option.draw(camera);
    }
    this.mMsg.draw(camera);

};

/**
 * Selects the current option given the option index.
 * 
 * @param {int} index
 * @returns {void}
 */
DialogueMultiple.prototype.selectOption = function (index) {
    for(var i = 0; i < this.options.length; i++){
        var option = this.options[i];
        if(i === index) {
            option.select();
            this.selectedValue = index;
        } else {
            option.deSelect();
        }
    }
};

/**
 * Hides the dialogue options.
 * 
 * @returns {void}
 */
DialogueMultiple.prototype.dismiss = function () {
    this.isDismissed =true;
};

/*
 * Shows the dialogue options.
 * 
 * @returns {void}
 */
DialogueMultiple.prototype.show = function () {
    this.isDismissed =false;
};

/**
 * Returns the number of options.
 * 
 * @returns {int}
 */
DialogueMultiple.prototype.numOptions = function () {
    return this.count;
};

/**
 * Returns the selected option as a int value.
 * 
 * @returns {int}
 */
DialogueMultiple.prototype.getSelectedOption = function () {
    return this.selectedValue;
};
