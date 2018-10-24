const LayerContainer = require("./layercontainer.js");
const Drawable = require("./drawable.js");

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
        this.getDrawable = function(key) {
            let drawable = null;
            let ndx = drawables.length;
            while(--ndx >= 0) {
                if(drawables[ndx].getKey() === key) {
                    drawable = drawables[ndx];
                    break;
                }
            }

            return drawable;
        }
        this.createDrawable = function(drawingmethods) {
            let tmp = new Drawable(drawingmethods);
            return tmp.getKey();
        }
        this.deleteDrawable = function(key) {
            let ndx = drawables.length;
            while(--ndx >=0) {
                if(drawables[ndx].getKey() === key) {
                    drawables.splice(ndx, 1);
                    break;
                }
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