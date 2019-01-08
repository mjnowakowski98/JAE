const Animation = require("./animation.js");
const Playmodes = require("./playmodes.js");

class Renderer {
    constructor(_ctx) {
        let requestId = 0;
        let getRequestId = function() { return requestId; }
        let setRequestId = function(_requestId) { requestId = _requestId; }

        let ctx = _ctx;
        this.getContext = function() { return context; }

        let animation = new Animation();
        this.getAnimation = function() { return animation; }

        let playMode = Playmodes.REAL;
        this.getPlaybackMode = function() { return playMode; }
        this.setPlaymode = function(_playMode) { playMode = _playMode; }

        let elapsedTime = 0;
        let oldTime = 0;

        this.frame = function() {
            _renderer.drawLayers(_renderer.getAnimation());
        }

        this.draw = function(sceneObject) {
            ctx.save();
            ctx.translate({x, y} = sceneObject.getPosition());

            let methodList = sceneObject.getPath().getMethodList();
            for(let i = 0; i < methodList; i++)
                ctx[methodList[i].getMethodName()].apply(ctx, method.getArgsList());

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
                animation.scrubFrames(1);
            }
        }
        
    }

    static render(_renderer) {
        _renderer.frame();
        

        _renderer.requestId = requestAnimationFrame(() => { Renderer.render(_renderer)});
    }
}

module.exports = Renderer;