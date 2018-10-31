const LayerContainer = require("./layercontainer.js");

class Animation {
    constructor() {
        Object.assign(this, new LayerContainer);

        let animName = "";
        this.getAnimName = function() { return animName; }
        this.setAnimName = function(_animName) { animName = _animName; }

        let useLighting = false;
        this.getUseLighting = function() { return useLighting; }
        this.setUseLighting = function(_useLighting) { useLighting = _useLighting; }
        
        let canvasColor = "#ffffff";
        this.getCanvasColor = function() { return canvasColor; }
        this.setCanvasColor = function(_canvasColor) { canvasColor = _canvasColor; }

        let canvasWidth = 800;
        this.getCanvasWidth = function() { return canvasWidth; }
        this.setCanvasWidth = function(width) { canvasWidth = width; }

        let canvasHeight = 600;
        this.getCanvasHeight = function() { return canvasHeight; }
        this.setCanvasHeight = function(height) { canvasHeight = height; }
        this.setCanvasDimensions = function(width, height) {
            canvasWidth = width;
            canvasHeight = height;
        }

        let framesPerSecond = 60;
        let fpsInterval = 1000 / framesPerSecond;
        this.getFramesPerSecond = function() { return framesPerSecond; }
        this.setFramesPerSecond = function(fps) {
            if(fps <= 0) return;
            framesPerSecond = fps;
            fpsInterval = 1000/framesPerSecond;
        }
        this.getFpsInterval = function() { return fpsInterval; }

        let paths = new Array();
        this.createPath = function(drawingmethods) {

        }
        this.getPathReference = function(key) {

        }
        this.deletePath = function(key) {

        }

        this.makeSaveFile = function() {

        }

        this.loadAnimation = function(saveString) {

        }
    }
}

module.exports = Animation;