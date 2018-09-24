class Animation {
    constructor() {
        Object.assign(this, new LayerContainer());

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

        let framesPerSecond = 0;
        this.getFramesPerSecond = function() { return framesPerSecond; }
        this.setFramesPerSecond = function(fps) {
            framesPerSecond = fps;
            dispatchEvent(Animation._framesPerSecondChangeEvent);
        }
        this.setFramesPerSecond(60);

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
                for(let i in drawbles[ndx])
                    delete drawables[ndx][i];
                    
                dispatchEvent(Animation._drawablesChangeEvent);
            }
        }
    }

    makeSaveFile() {
        let saveObject = new Object();
        saveObject.animName = this.getAnimName();
        saveObject.canvasColor = this.getCanvasColor();
        saveObject.canvasWidth = this.getCanvasWidth();
        saveObject.canvasHeight = this.getcanvasHeight();
        saveObject.framesPerSecond = this.getFramesPerSecond();
        //saveObject.drawables = this.getDrawables();
        //saveObject.layers = this.getLayers();
        return JSON.stringify(saveObject);
    }

    loadAnimation(inputString) {
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
    }
}

Animation._nameChangeEvent = new Event("animationnamechange");
Animation._canvasColorChangeEvent = new Event("canvascolorchange");
Animation._canvasSizeChangeEvent = new Event("canvassizechange");
Animation._framesPerSecondChangeEvent = new Event("animationfpschange");
Animation._drawablesChangeEvent = new Event("animationdrawableschange");