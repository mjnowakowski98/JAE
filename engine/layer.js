class Layer {
	constructor() {
		this.frames = new Array(new Frame());
		this.layerName = "New layer";
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