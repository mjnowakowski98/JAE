class Renderer {
    static render() {
        console.log("test");
        Renderer.requestId = requestAnimationFrame(Renderer.render);
    }

    static drawFrame() {

    }

    static scrubFrames() {

    }
}

Renderer.requestId = null;
Renderer.ctx = null;
Renderer.anim = null;
Renderer.playMode = true;
Renderer.framesPerSecond = 0;
Renderer.currentFrame = 0;