class Renderer {
    static render() {
        if(Renderer.playMode) {
            let newTime = performance.now();
            Renderer._elapsedTime = newTime - Renderer._oldTime;
            if(Renderer._elapsedTime > Renderer._fpsInterval) {
                Renderer._oldTime = newTime - (Renderer._elapsedTime % Renderer._fpsInterval);
                Renderer.scrubFrames(1);
            }
        } else dispatchEvent(Renderer._frameEvent);

        let layers = Renderer.anim.getLayers();
        for(let i = 0; i < layers.length; i++) {
            
        }

        if(!Renderer.playMode) dispatchEvent(Renderer._frameEndEvent);

        Renderer._requestId = requestAnimationFrame(Renderer.render);
    }

    static draw(drawable, position) {
        ctx.save();
        ctx.translate(position.x, position.y);
        
        ctx.fill(drawable);
        
        ctx.restore();
    }

    static scrubFrames(numFrames) {
        let numAnimFrames = Renderer.anim.frames.length;
        if(Renderer._currentFrame + numFrames >= 0) {
            if(Renderer._currentFrame + spped < numAnimFrames) Renderer._currentFrame += speed;
            else Renderer._currentFrame = 0;
        } else Renderer._currentFrame = numAnimFrames - 1;
    }
}

Renderer._requestId = null;
Renderer._elapsedTime = 0;
Renderer._oldTime = 0;
Renderer.ctx = null;
Renderer.anim = null;
Renderer.playMode = false;
Renderer._framesPerSecond = 0;
Renderer._fpsInterval = 0;
Renderer._currentFrame = 0;

Renderer._frameEvent = new Event("editorframe");
Renderer._frameEndEvent = new Event("editorframeend");