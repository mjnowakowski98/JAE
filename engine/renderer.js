class Renderer {
    constructor(_ctx) {
        Object.assign(this, new Evt());
        let frameStartEvent = new Event("framestart");
        let frameEndEvent = new Event("frameend");

        let requestId = null;
        this.getRequestId = function() { return requestId; }
        this.setRequestId = function(id) { requestId = id; }

        let ctx = _ctx;
        this.getCtx = function() { return ctx; }

        let playMode = false;
        this.getPlaybackMode = function() { return playMode; }
        this.setPlaybackMode = function(mode) { playMode = mode; }

        let anim = new Animation();
        this.getAnimation = function() { return anim; }
        this.setAnimation = function(_anim) {
            playMode = false;
            anim = _anim;
        }

        let elapsedTime = 0;
        let oldTime = 0;
        this.stepPlayback = function(root) {
            let fpsInterval = anim.getFpsInterval();
            let newTime = performance.now();
            elapsedTime = newTime - oldTime;
            if(elapsedTime > fpsInterval) {
                oldTime = newTime - (elapsedTime % fpsInterval);
                root.scrubFrames(1);
            }
        }

        this.frame = function() {
            if(playMode) this.stepPlayback(anim);
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            this.dispatchEvent(frameStartEvent);
            this.drawLayers(anim);
            this.dispatchEvent(frameEndEvent);
        }
    }

    static render(renderer) {
        renderer.frame();
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