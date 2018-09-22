class Layer {
	constructor() {
        let layerName = "New layer";
        this.getLayerName = function() { return layerName; }
        this.setLayerName = function(name) {
            layerName = name;
        }

        let frames = new Array(new Frame());
        this.getFrames = function() { return frames; }
        this.addFrame = function(frameNdx, copy = false) {
            if(frameNdx < 0 || frameNdx >= frames.length) {
                console.error("Cannot add frame at: " + frameNdx);
                return;
            }
    
            frames.splice(frameNdx + 1, 0, new Frame());
            if(copy) {
                let newFrame = frame[frameNdx + 1].onScreen;
                let oldFrame = frame[frameNdx].onScreen;
                for(let i = 0; i < oldFrame.length; i++)
                    newFrame[i] = Object.assign({}, oldFrame[i]);
            }
        }
        this.removeFrame = function(frameNdx) {
            if(frameNdx < 0 || frameNdx >= frames.length) {
                console.error("Cannot remove frame: " + frameNdx);
                return;
            } else if (frames.length <= 1) {
                this.clearFrame(frameNdx);
                return;
            }
    
            frames.splice(frameNdx, 1);
            Renderer.scrubFrames(-1);
        }

        this.clearFrame = function() {
            frames[frameNdx].onScreen = new Array();
        }
	}
}