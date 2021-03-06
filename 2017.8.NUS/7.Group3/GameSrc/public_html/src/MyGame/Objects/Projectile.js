/* File: Projectile.js 
 *
 * Creates and initializes a simple DyePack
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, Renderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

Projectile.kSpeed = 100 / (0.8 * 50);  
        // across the entire screen in 0.5 seconds
Projectile.kTexture = null;

Projectile.mHeroposition=[];

function Projectile(x, y) {
    this.kRefWidth = 5;
    this.kRefHeight = 5;
            
    this.kDetectThreshold = 10;
    this.kChaseThreshold = 2 * this.kDetectThreshold;
    
   //  var rate=1;
    var r = new TextureRenderable(Projectile.kTexture);
    r.setColor([0.8, 1, 0.8, 0.1]);
    r.getXform().setPosition(x, y);
    r.getXform().setSize(this.kRefWidth, this.kRefHeight);
    GameObject.call(this, r);

    this.setCurrentFrontDir([Projectile.mHeroposition[0]-x+5,Projectile.mHeroposition[1]-y]);
    this.setSpeed(Projectile.kSpeed);
    
    // Expired to remove
    this.mExpired = false;
}
gEngine.Core.inheritPrototype(Projectile, GameObject);

Projectile.prototype.setExpired = function() {
    this.mExpired = true;
};
Projectile.prototype.hasExpired = function() {
    return this.mExpired;
};


/*Projectile.prototype.update = function(dyes, aCamera) {
    GameObject.prototype.update.call(this);
    var hit = false;
    var i, obj;
    var p = vec2.fromValues(0, 0);
    for (i=0; i<dyes.size(); i++) {
        obj = dyes.getObjectAt(i);
        if (this.pixelTouches(obj, p)) {
            this.setExpired();
            dyes.removeFromSet(obj); 
            hit = true;
            score=score+100*deltaX*10;
        }
    }
    return hit;
};*/

Projectile.prototype.update = function(Hero,mAllParticles,func,dyes, aCamera) {
    GameObject.prototype.update.call(this);
    //return hit;
};

