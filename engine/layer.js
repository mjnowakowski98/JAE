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
    
            let newFrame = new Frame();
            if(copy) {
                let oldFrame = frame[frameNdx].onScreen;
                for(let i = 0; i < oldFrame.length; i++)
                    newFrame.onScreen[i] = Object.assign({}, oldFrame[i]);
            }
            frames.splice(frameNdx + 1, 0, newFrame);
            return newFrame();
        }
        this.removeFrame = function(frame) {
            if (frames.length <= 1) {
                this.clearFrame(frameNdx);
                return;
            } else {
                let ndx = frames.indexOf(frame);
                if(ndx !== -1) frames.splice(ndx, 1);
            }
        }

        this.clearFrame = function(frame) {
            frame.onScreen = new Array();
        }
	}
}