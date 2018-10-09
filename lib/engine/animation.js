const LayerContainer = require("./layercontainer.js");

class Animation {
    constructor() {
        Object.assign(this, new LayerContainer());

        let animName = "Untitled";
        this.getAnimName = function() { return animName; }
        this.setAnimName = function(name) {
            animName = name;
            this.emit('namechange');
        }

        let canvasColor = "#FFFFFF";
        this.getCanvasColor = function() { return canvasColor; }
        this.setCanvasColor = function(color) {
            canvasColor = color;
            this.emit('canvascolorchange');
        }

        let canvasWidth = 800;
        this.getCanvasWidth = function() { return canvasWidth; }
        this.setCanvasWidth = function(width) {
            canvasWidth = width;
            this.emit('canvassizechange');
        }

        let canvasHeight = 600;
        this.getcanvasHeight = function() { return canvasHeight; }
        this.setCanvasHeight = function(height) {
            canvasHeight = height;
            this.emit('canvassizechange');
        }

        let framesPerSecond = 0;
        let fpsInterval = 1000 / framesPerSecond;
        this.getFramesPerSecond = function() { return framesPerSecond; }
        this.getFpsInterval = function() { return fpsInterval; }
        this.setFramesPerSecond = function(fps) {
            framesPerSecond = fps;
            fpsInterval = 1000 / framesPerSecond;
            this.emit('fpschange');
        }

        let drawables = new Array();
        this.getDrawables = function() { return drawables; }
        this.registerDrawable = function(drawable) {
            if(drawables.indexOf(drawable) === -1) {
                drawables.push(drawable);
                this.emit('drawableschange');
            }
        }
        this.unregisterDrawable = function(drawable) {
            let ndx = drawables.indexOf(drawable);
            if(ndx !== -1) {
                for(let i in drawbles[ndx])
                    delete drawables[ndx][i];
                this.emit('drawableschange');
            }
        }

        this.makeSaveFile = function() {
            let saveObject = new Object();
            saveObject.animName = this.getAnimName();
            saveObject.canvasColor = this.getCanvasColor();
            saveObject.canvasWidth = this.getCanvasWidth();
            saveObject.canvasHeight = this.getcanvasHeight();
            saveObject.framesPerSecond = this.getFramesPerSecond();
            //saveObject.drawables = this.getDrawables();
            //saveObject.layers = this.getLayers();

            this.emit('animationsave');
            return JSON.stringify(saveObject);
        }

        this.loadAnimation = function(inputString) {
            let tmp = JSON.parse(inputString);
            this.setAnimName(tmp.animName);
            this.setCanvasColor(tmp.canvasColor);
            this.setCanvasWidth(tmp.canvasWidth);
            this.setCanvasHeight(tmp.canvasHeight);
            this.setFramesPerSecond(tmp.framesPerSecond);
            /*for(let i = 0; i < tmp.drawables.length; i++)
                this.registerDrawable(tmp.drawables[i]);
    
            for(let i = 0; i < tmp.layers.length; i++)
                i = i;*/

            this.emit('animationload');
        }
    }
}

module.exports = Animation;