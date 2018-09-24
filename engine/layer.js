class Layer {
	constructor(container) {
        let parent = container;

        let layerName = "New layer";
        this.getLayerName = function() { return layerName; }
        this.setLayerName = function(name) {
            layerName = name;
        }

        let frames = new Array(new Frame());
        for(let i = 1; i < parent.getNumFrames(); i++) {
            frames.push(null);
        }
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

            let parentFrameCount = parent.getNumFrames();
            if(frames.length > parentFrameCount)
                parent.addToFrameCount(frames.length - parentFrameCount);

            return newFrame;
        }
        this.replaceFrame = function(frameNdx, frame) {
            if(frameNdx >= 0 && frameNdx < frames.length)
                frames[frameNdx] = frame;
            return frame;
        }
        this.removeFrame = function(frame) {
            if (frames.length <= 1) {
                frame.clearFrame();
                return;
            } else {
                let ndx = frames.indexOf(frame);
                if(ndx !== -1) frames[ndx] = null;
            }
        }
	}
}