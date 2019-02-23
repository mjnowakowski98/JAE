const LayerContainer = require("./layercontainer.js");

class Animation {
    constructor() {
        Object.assign(this, new LayerContainer());
        this.setDeleted = function(_deleted) {
            console.error("Error: Can't set deleted state on Animation");
        }

        let animName = "";
        this.getAnimationName = function() { return animName; }
        this.setAnimationName = function(_animName) { animName = _animName; }

        let canvasColor = "#FFFFFF";
        this.getCanvasColor = function() { return canvasColor; }
        this.setCanvasColor = function(_canvasColor) { canvasColor = _canvasColor; }

        let canvasWidth = 1280;
        let canvasHeight = 720;
        this.getCanvasWidth = function() { return canvasWidth; }
        this.getCanvasHeight = function() { return canvasHeight; }
        this.setCanvasWidth = function(_canvasWidth) { canvasWidth = _canvasWidth; }
        this.setCanvasHeight = function(_canvasHeight) { canvasHeight = _canvasHeight; }
        this.setCanvasDimensions = function(width, height) {
            canvasWidth = width;
            canvasHeight = height;
        }

        let framesPerSecond = 60;
        let fpsInterval = framesPerSecond / 1000;
        this.getFramesPerSecond = function() { return framesPerSecond; }
        this.getFpsInterval = function() { return fpsInterval; }
        this.setFramesPerSecond = function(_framesPerSecond) {
            framesPerSecond = _framesPerSecond;
            fpsInterval = framesPerSecond / 1000;
        }

        this.makeSaveFile = function() {

        }

        this.loadAnimation = function() {

        }
    }
}

module.exports = Animation;