const Animation = require("./animation.js");
const PlayModes = require("./playmodes.js");
const { performance } = require("perf_hooks");

class Renderer {
    constructor(_client) {
        let client = _client;

        let ctx = client.getCanvas().getContext("2d");
        this.getContext = function() { return context; }

        let animation = new Animation(client);
        this.getAnimation = function() { return animation; }

        let playMode = PlayModes.REAL;
        this.getPlayMode = function() { return playMode; }
        this.setPlayMode = function(_playMode) { playMode = _playMode; }

        let elapsedTime = 0;
        let oldTime = 0;

        this.draw = function(sceneObject) {
            ctx.save();
            let position = sceneObject.getPosition();
            ctx.translate(position.x, position.y);

            let path = sceneObject.getPath();
            let methodList = path.getMethodList();
            for(let i = 0; i < methodList.length; i++)
                ctx[methodList[i].getMethodName()].apply(ctx, methodList[i].getArgsList());

            this.drawLayers(path);

            ctx.restore();
        }

        this.stepPlayback = function(container) {
            let fpsInterval = animation.getFpsInterval();
            let newTime = performance.now();
            elapsedTime = newTime - oldTime;
            if(elapsedTime > fpsInterval) {
                oldTime = newTime - (elapsedTime % fpsInterval);
                container.scrubFrames(1);
            }
        }

        this.drawLayers = function(container) {
            if(playMode == PlayModes.PLAYBACK) this.stepPlayback(container);

            let layers = container.getLayers();
            for(let i = 0; i < layers.length; i++) {
                let layer = layers[i];
                let frame = layer.getFrames()[container.getCurrentFrame()];
                let sceneObjects = frame.getOnScreen();
                for(let j = 0; j < sceneObjects.length; j++) this.draw(sceneObjects[i]);
            }
        }

        this.render = function() {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            this.drawLayers(animation);
            return ctx.canvas.toDataURL();
        }

        this.render();
    }
}

module.exports = Renderer;