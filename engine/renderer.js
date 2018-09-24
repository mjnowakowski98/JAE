class Renderer {
    constructor(_ctx) {
        let requestId = null;
        this.getRequestId = function() { return requestId; }
        this.setRequestId = function(id) { requestId = id; }

        let ctx = _ctx;
        this.getCtx = function() { return ctx; }

        let anim = new Animation();
        this.getAnimation = function() { return anim; }

        let playMode = false;
        this.getPlaybackMode = function() { return playMode; }
        this.setPlaybackMode = function(mode) { playMode = mode; }

        let elapsedTime = 0;
        let oldTime = 0;
        this.stepPlayback = function() {
            let fpsInterval = anim.getFpsInterval();
            let newTime = performance.now();
            elapsedTime = newTime - oldTime;
            if(elapsedTime > fpsInterval) {
                oldTime = newTime - (elapsedTime % fpsInterval);
                anim.scrubFrames(1);
            }
        }
    }

    static render(renderer) {
        let animation = renderer.getAnimation();
        if(renderer.getPlaybackMode()) renderer.stepPlayback();
        
        let ctx = renderer.getCtx();
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        dispatchEvent(Renderer._frameEvent);

        renderer.drawLayers(animation);

        dispatchEvent(Renderer._frameEndEvent);
        renderer.setRequestId(requestAnimationFrame(function() {
            Renderer.render(renderer);
        }));
    }

    drawLayers(root) {
        let frameNdx = root.getCurrentFrame();
        let layers = root.getLayers();
        for(let i = 0; i < layers.length; i++) {
            let frames = layers[i].getFrames();
            if(!frames[frameNdx]) continue;

            let onScreen = frames[frameNdx].getOnScreen();
            for(let j = 0; j < onScreen.length; j++) this.draw(onScreen[j]);
        }
    }

    draw(screenObject) {
        let ctx = this.getCtx();

        ctx.save();

        ctx.translate(screenObject.getPosition().x, screenObject.getPosition().y);
        let path = screenObject.getDrawable().getPath();
        if(screenObject.getFillStyle()) {
            ctx.fillStyle= screenObject.getFillStyle();
            ctx.fill(path);
        }
        if(screenObject.getStrokeStyle()) {
            ctx.strokeStyle = screenObject.getStrokeStyle();
            ctx.stroke(path);
        }
        
        ctx.restore();
    }
}

Renderer._frameEvent = new Event("editorframe");
Renderer._frameEndEvent = new Event("editorframeend");