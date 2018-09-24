class LayerContainer {
	constructor() {
		let layers = new Array();
        this.getLayers = function() { return layers; }
        this.addLayer = function() {
			let newLayer = new Layer(this);
            layers.push(newLayer);
			dispatchEvent(LayerContainer._layersChangeEvent);
			return newLayer;
        }
        this.removeLayer = function(layerRef) {
			let ndx = layers.indexOf(layerRef);
			if(ndx !== -1) {
            	layers.splice(ndx, 1);
				dispatchEvent(LayerContainer._layersChangeEvent);
			}
		}

		let numFrames = 1;
		this.getNumFrames = function() { return numFrames; }
		this.addToFrameCount = function(num) {
			numFrames += num;
			for(let i = 0; i < layers.length; i++) {
				let diff = numFrames - layers[i].length;
				for(let j = 0; j < diff; j++)
					layers[i].getFrames().push(null);
			}

			return numFrames;
		}
		this.cleanFrameCount = function() {
			// Implement - set frame count to highest layer framelength
		}

		let currentFrame = 0;
		this.getCurrentFrame = function() { return currentFrame; }
		this.scrubFrames = function(speed) {
			if(currentFrame + speed >= 0) {
				if(currentFrame + speed < numFrames) currentFrame += speed;
				else currentFrame = 0;
			} else currentFrame = numFrames - 1;
		}

		this.addLayer();
	}
}

LayerContainer._layersChangeEvent = new Event("layerschange");