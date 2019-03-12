const AnimationObject = require("./animationobject.js");
const Layer = require("./layer.js");

class LayerContainer {
	constructor() {
		Object.assign(this, new AnimationObject());

		let layers = new Array();
		this.addLayer = function(layer) {
			layers.push(layer);
			return layers.length;
		}

		let initLayer = new Layer();
		initLayer.setContainer(this);

		this.removeLayer = function(layer) {
			let ndx = layers.indexOf(layer);
			if(ndx >= 0) layers.splice(ndx, 1);
			return layers.length;
		}

		this.getNumFrames = function() {
			let maxFrames = 0;
			for(let i = 0; i < layers.length; i++) {
				let layerLength = layers[i].getFrames().length;
				if(layerLength > maxFrames) maxFrames = layerLength;
			}

			return maxFrames;
		}

		this.getLayers = () => layers;

		this.getType = () => "layercontainer";

		let currentFrame = 0;
		this.getCurrentFrame = () => currentFrame;

		this.scrubFrames = function(_numFrames) {
			if(currentFrame + _numFrames >= 0) {
				if(currentFrame + _numFrames < this.getNumFrames()) currentFrame += _numFrames;
				else currentFrame = 0;
			} else currentFrame = this.getNumFrames() - 1;
		}
	}
}

module.exports = LayerContainer;