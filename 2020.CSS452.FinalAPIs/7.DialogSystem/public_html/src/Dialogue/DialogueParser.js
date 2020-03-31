/*
 * File: DialogueParser.js 
 * Reads json files.
 */

/*jslint node: true, vars: true */
/*global gEngine: false, console: false, Camera: false, vec2: false, Renderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

/**
 * Constructor for dialogue parser. Takes in the path to a scene file and loads
 * it into memory.
 * 
 * @constructor
 * @param {PathToFile} sceneFilePath
 * @returns {DialogueParser}
 */
function DialogueParser(sceneFilePath) {
    var jsonString = gEngine.ResourceMap.retrieveAsset(sceneFilePath);
    this.sceneInfo = JSON.parse(jsonString);
}

/**
 * Switches the currently displayed scene object within the file
 * @param {String} sceneName
 * @returns {Array|Object}
 */
DialogueParser.prototype.loadScene = function (sceneName) { // note the function isn't actually doing anything with this param
    return this.sceneInfo[sceneName];
};
