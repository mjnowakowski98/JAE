const LayerContainer = require("./layercontainer.js");

class Animation {
    constructor(_client) {
        let client = _client;

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

        this.getType = () => "animation";

        this.makeSaveFile = function() {
            let iterateLayers = function(container) {
                let layerSaveArr = new Array();

                let layers = container.getLayers();
                for(let layerNdx = 0; layerNdx < layers.length; layerNdx++) {
                    let layer = layers[layerNdx];
                    layerSaveArr.push({
                        key:layer.getKey(),
                        frames:new Array()
                    });

                    let frames = layer.getFrames();
                    for(let frameNdx = 0; frameNdx < frames.length; frameNdx++) {
                        let frame = frames[frameNdx];
                        layerSaveArr[layerNdx].frames.push({
                            key:frame.getKey(),
                            onScreen:new Array()
                        });

                        let sceneObjs = frame.getOnScreen();
                        for(let sceneObjNdx = 0; sceneObjNdx < sceneObjs.length; sceneObjNdx++) {
                            let sceneObj = sceneObjs[sceneObjNdx];
                            let path = sceneObj.getPath();
                            if(!path) continue;
                            layerSaveArr[layerNdx].frames[frameNdx].onScreen.push({
                                key:sceneObj.getKey(),
                                pathKey:sceneObj.getPath().getKey()
                            });
                        }
                    }
                }

                return layerSaveArr;
            }

            let getPathDrawingMethods = function(path) {
                let methodSaveArr = new Array();
                let methods = path.getMethods();
                for(let i = 0; i < methods.length; i++) {
                    let method = methods[i];
                    methodSaveArr.push({
                        methodName:method.getMethodName(),
                        argsList:method.getArgsList()
                    });
                }
            }

            let objMan = client.getAnimationCommandHandler().getObjMan();
            objMan.cullKeyMap();

            let paths = objMan.getPaths();
            let pathSaves = new Array();
            for(let i = 0; i < paths.length; i++)
                pathSaves.push({layers:iterateLayers(paths[i]), drawingMethods:getPathDrawingMethods(paths[i]) });

            let saveObject = {
                animKey:this.getKey(),
                animName:animName,
                canvasColor:canvasColor,
                canvasWidth:canvasWidth,
                canvasHeight:canvasHeight,
                framesPerSecond:framesPerSecond,
                animLayers:iterateLayers(this),
                paths:pathSaves
            }
            return saveObject;
        }

        this.loadAnimation = function() {

        }
    }
}

module.exports = Animation;