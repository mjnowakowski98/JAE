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

        let animLayers = Renderer.anim.getLayers();
        for(let i = 0; i < animLayers.length; i++) {
            let frames = animLayers[i].getFrames();
            for(let j = 0; j < frames.length; j++) {
                if(!frames[j]) continue;
                let onScreen = frames[j].getOnScreen();
                for(let k = 0; k < onScreen.length; k++) {
                    Renderer.draw(onScreen[k]);
                }
            }
        }

        if(!Renderer.playMode) dispatchEvent(Renderer._frameEndEvent);

        Renderer._requestId = requestAnimationFrame(Renderer.render);
    }

    static draw(screenObject) {
        let ctx = Renderer.ctx;

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

    static scrubFrames(numFrames) {
        let numAnimFrames = Renderer.anim.frames.length;
        if(Renderer._currentFrame + numFrames >= 0) {
            if(Renderer._currentFrame + numFrames < numAnimFrames) Renderer._currentFrame += speed;
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

addEventListener("animationfpschange", function() {
    Renderer._framesPerSecond = Renderer.anim.getFramesPerSecond();
    Renderer._fpsInterval = 1000 / Renderer.anim.getFramesPerSecond();
});