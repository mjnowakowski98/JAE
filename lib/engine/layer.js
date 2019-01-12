const AnimationObject = require("./animationobject.js");

class Layer {
	constructor(_container) {
		Object.assign(this, new AnimationObject());

		let container = _container;

		let layerName = "New Layer";
		this.getName = function() { return layerName; }
		this.setName = function(_layerName) { layerName = _layerName; }

		let frames = new Array();
		this.addFrame = function(frame, ndx) {
			frames.splice(ndx, 0, frame);
			return frames.length;
		}
		this.removeFrame = function(Frame) {
			let ndx = frames.indexOf(Frame);
			if(ndx >= 0) frames.splice(ndx, 1);
			return frames.length;
		}

		this.onCull = function() {
			
		}
	}
}

module.exports = Layer;