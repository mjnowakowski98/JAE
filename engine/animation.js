class Animation {
    constructor() {
        this.animName = "Untitled";
        this.canvasColor = "#FFFFFF";
        this.canvasWidth = 800;
        this.canvasHeight = 600;
        this.framesPerSecond = 60;
        this.drawables = new Array();
        this.frames = new Array(new Frame());
    }

    makeSaveFile() {
        return JSON.stringify(this);
    }

    loadAnimation(inputString) {
        let tmp = JSON.parse(inputString);
        this.animName = tmp.animName;
        this.canvasColor = tmp.canvasColor;
        this.canvasWidth = tmp.canvasWidth;
        this.canvasHeight = tmp.canvasHeight;
        this.framesPerSecond = tmp.framesPerSecond;
        this.drawables = tmp.drawables;
        this.frame = tmp.frames;
    }

    registerDrawable(drawable) {
        if(this.drawables.indexOf(drawable) === -1)
            this.drawables.push(drawable);
    }

    unregisterDrawable(drawable) {
        this.drawables.splice(this.drawables.indexOf(drawable));
        for(let i = 0; i < this.frames.length; i++) {
            let frame = this.frames[i];
            let ndx = frame.onScreen.indexOf(drawable);
            if(ndx !== -1)
                frame.splice(ndx, 1);
        }
    }

    addFrame(frameNdx, copy = false) {
        if(frameNdx < 0 || frameNdx >= this.frames.length) {
            console.error("Cannot add frame at: " + frameNdx);
            return;
        }

        this.frames.splice(frameNdx + 1, 0, new Frame());
        if(copy) {
            let newFrame = this.frame[frameNdx + 1].onScreen;
            let oldFrame = this.frame[frameNdx].onScreen;
            for(let i = 0; i < oldFrame.length; i++)
                newFrame[i] = Object.assign({}, oldFrame[i]);
        }
    }

    removeFrame(frameNdx) {
        if(frameNdx < 0 || frameNdx >= this.frames.length) {
            console.error("Cannot remove frame: " + frameNdx);
            return;
        } else if (this.frames.length <= 1) {
            this.clearFrame(frameNdx);
            return;
        }

        this.frames.splice(frameNdx, 1);
        Renderer.scrubFrames(-1);
    }

    clearFrame(frameNdx) {
        this.frames[frameNdx].onScreen = new Array();
    }
}