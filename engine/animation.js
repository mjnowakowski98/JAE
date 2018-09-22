class Animation {
    constructor() {
        let animName = "Untitled";
        this.getAnimName = function() { return animName; }
        this.setAnimName = function(name) {
            animName = name;
            dispatchEvent(Animation._nameChangeEvent);
        }
        
        let canvasColor = "#FFFFFF";
        this.getCanvasColor = function() { return canvasColor; }
        this.setCanvasColor = function(color) {
            canvasColor = color;
            dispatchEvent(Animation._canvasColorChangeEvent);
        }

        let canvasWidth = 800;
        this.getCanvasWidth = function() { return canvasWidth; }
        this.setCanvasWidth = function(width) {
            canvasWidth = width;
            dispatchEvent(Animation._canvasSizeChangeEvent);
        }

        let canvasHeight = 600;
        this.getcanvasHeight = function() { return canvasHeight; }
        this.setCanvasHeight = function(height) {
            canvasHeight = height;
            dispatchEvent(Animation._canvasSizeChangeEvent);
        }

        let framesPerSecond = 60;
        this.getFramesPerSecond = function() { return framesPerSecond; }
        this.setFramesPerSecond = function(fps) {
            framesPerSecond = fps;
            dispatchEvent(Animation._framesPerSecondChangeEvent);
        }

        let drawables = new Array();
        this.getDrawables = function() { return drawables; }
        this.registerDrawable = function(drawable) {
            if(drawables.indexOf(drawable) === -1) {
                drawables.push(drawable);
                dispatchEvent(Animation._drawablesChangeEvent);
            }
        }
        this.unregisterDrawable = function(drawable) {
            let ndx = drawables.indexOf(drawable);
            if(ndx !== -1) {
                drawable[ndx] = null;
                dispatchEvent(Animation._drawablesChangeEvent);
            }
        }

        let layers = new Array(new Layer());
        this.getLayers = function() { return layers; }
        this.addLayer = function() {
            layers.push(new Layer());
            dispatchEvent(Animation._layersChangeEvent);
        }
        this.removeLayer = function(ndx) {
            layers.splice(ndx, 1);
            dispatchEvent(Animation._layersChangeEvent);
        }
    }

    makeSaveFile() {
        let saveObject = new Object();
        saveObject.animName = this.getAnimName();
        saveObject.canvasColor = this.getCanvasColor();
        saveObject.canvasWidth = this.getCanvasWidth();
        saveObject.canvasHeight = this.getcanvasHeight();
        saveObject.framesPerSecond = this.getFramesPerSecond();
        saveObject.drawables = this.getDrawables();
        saveObject.layers = this.getLayers();
        return JSON.stringify(this);
    }

    loadAnimation(inputString) {
        let tmp = JSON.parse(inputString);
        this.setAnimName(tmp.animName);
        this.setCanvasColor(tmp.canvasColor);
        this.setCanvasWidth(tmp.canvasWidth);
        this.setCanvasHeight(tmp.canvasHeight);
        this.setFramesPerSecond(tmp.framesPerSecond);
        for(let i = 0; i < tmp.drawables.length; i++)
            this.registerDrawable(tmp.drawables[i]);

        for(let i = 0; i < tmp.layers.length; i++)
            i = i;
    }
}

Animation._nameChangeEvent = new Event("animationnamechange");
Animation._canvasColorChangeEvent = new Event("canvascolorchange");
Animation._canvasSizeChangeEvent = new Event("canvassizechange");
Animation._framesPerSecondChangeEvent = new Event("animationfpschange");
Animation._drawablesChangeEvent = new Event("animationdrawableschange");
Animation._layersChangeEvent = new Event("animationlayerschange");