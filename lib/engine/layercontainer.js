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
		this.removeLayer = function(layer) {
			let ndx = layers.indexOf(layer);
			if(ndx >= 0) layers.splice(ndx, 1);
			return layers.length;
		}

		let currentFrame = 0;
		this.getCurrentFrame = function() { return currentFrame; }

		this.scrubFrames = function(_numFrames) {
			if(currentFrame + _numFrames >= 0) {
				if(currentFrame + _numFrames < numFrames) currentFrame += _numFrames;
				else currentFrame = 0;
			} else currentFrame = numFrames - 1;
		}
	}
}

module.exports = LayerContainer;