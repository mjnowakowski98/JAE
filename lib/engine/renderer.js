const Animation = require("./animation.js");
const Playmodes = require("./playmodes.js");

class Renderer {
    constructor(_client) {
        let client = _client;

        let ctx = client.getCanvas().getContext("2d");
        this.getContext = function() { return context; }

        let animation = new Animation();
        this.getAnimation = function() { return animation; }

        let playMode = Playmodes.REAL;
        this.getPlaybackMode = function() { return playMode; }
        this.setPlaymode = function(_playMode) { playMode = _playMode; }

        let elapsedTime = 0;
        let oldTime = 0;

        this.draw = function(sceneObject) {
            ctx.save();
            ctx.translate({x, y} = sceneObject.getPosition());

            let path = sceneObject.getPath();
            let methodList = path.getMethodList();
            for(let i = 0; i < methodList; i++)
                ctx[methodList[i].getMethodName()].apply(ctx, method.getArgsList());

            this.drawLayers(path);

            ctx.restore();
        }

        this.drawLayers = function(container) {
            let layers = container.getLayers();
            for(let i = 0; i < layers.length; i++) {
                let sceneObjects = layers[i].getFrame(container.getCurrentFrame()).getOnScreen();
                for(let j = 0; j < sceneObjects.length; j++) draw(sceneObjects[i]);
            }
        }

        this.stepPlayback = function() {
            let fpsInterval = animation.getFpsInterval();
            let newTime = performance.now();
            elapsedTime = newTime - oldTime;
            if(elapsedTime > fpsInterval) {
                oldTime = newTime - (elapsedTime % fpsInterval);
                container.scrubFrames(1);
            }
        }

        this.render = function() {
            this.drawLayers(animation);
            return ctx.canvas.toDataURL();
        }

        this.render();
    }
}

module.exports = Renderer;