class Renderer {
    static render() {
        Renderer.requestId = requestAnimationFrame(Renderer.render);
    }

    static drawFrame() {
        if(Renderer.playMode) {
            let newTime = performance.now();
            Renderer.elapsedTime = newTime - Renderer.oldTime;
            if(Renderer.elapsedTime > Renderer.fpsInterval) {
                Renderer.oldTime = newTime - (Renderer.elapsedTime % Renderer.fpsInterval);
                Renderer.scrubFrames(1);
            }
        } else dispatchEvent(Renderer.frameEvent);



        if(!Renderer.playMode) dispatchEvent(Renderer.frameEndEvent);
    }

    static scrubFrames(numFrames) {
        let numAnimFrames = Renderer.anim.frames.length;
        if(Renderer.currentFrame + numFrames >= 0) {
            if(Renderer.currentFrame + spped < numAnimFrames) Renderer.currentFrame += speed;
            else Renderer.currentFrame = 0;
        } else Renderer.currentFrame = numAnimFrames - 1;
    }
}

Renderer.requestId = null;
Renderer.elapsedTime = 0;
Renderer.oldTime = 0;
Renderer.ctx = null;
Renderer.anim = null;
Renderer.playMode = false;
Renderer.framesPerSecond = 0;
Renderer.fpsInterval = 0;
Renderer.currentFrame = 0;

Renderer.frameEvent = new Event("editorframe");
Renderer.frameEndEvent = new Event("editorframeend");