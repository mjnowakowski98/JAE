class Renderer {
    static render() {
        if(Renderer.playMode) {
            let newTime = performance.now();
            Renderer._elapsedTime = newTime - Renderer._oldTime;
            if(Renderer._elapsedTime > Renderer._fpsInterval) {
                Renderer._oldTime = newTime - (Renderer._elapsedTime % Renderer._fpsInterval);
                Renderer.scrubFrames(1);
            }
        }
        
        let c = Renderer.ctx.canvas;
        Renderer.ctx.clearRect(0, 0, c.width, c.height);
        dispatchEvent(Renderer._frameEvent);

        Renderer.drawLayers(Renderer.anim, Renderer._currentFrame);

        if(!Renderer.playMode) dispatchEvent(Renderer._frameEndEvent);
        Renderer._requestId = requestAnimationFrame(Renderer.render);
    }

    static drawLayers(root, frameNdx) {
        let layers = root.getLayers();
        for(let i = 0; i < layers.length; i++) {
            let frames = layers[i].getFrames();
            if(!frames[frameNdx]) continue;

            let onScreen = frames[frameNdx].getOnScreen();
            for(let j = 0; j < onScreen.length; j++) Renderer.draw(onScreen[j]);
        }
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
        let numAnimFrames = Renderer.anim.getNumFrames();
        if(Renderer._currentFrame + numFrames >= 0) {
            if(Renderer._currentFrame + numFrames < numAnimFrames) Renderer._currentFrame += numFrames;
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