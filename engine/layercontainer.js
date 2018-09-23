class LayerContainer {
	constructor() {
		let layers = new Array(new Layer());
        this.getLayers = function() { return layers; }
        this.addLayer = function() {
			let newLayer = new Layer();
            layers.push(newLayer);
			dispatchEvent(Animation._layersChangeEvent);
			return newLayer;
        }
        this.removeLayer = function(layerRef) {
			let ndx = layers.indexOf(layerRef);
			if(ndx !== -1) {
            	layers.splice(ndx, 1);
				dispatchEvent(Animation._layersChangeEvent);
			}
        }
	}

	getMaxNumFrames() {
        let layers = this.getLayers();
        let maxNum = 0;
        for(let i = 0; i < layers.length; i++) {
            let framesLength = layers[i].getFrames().length;
            if(framesLength > maxNum) maxNum = framesLength;
        }

        return maxNum;
    }
}