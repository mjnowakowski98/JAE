const AnimationObject = require("./animationobject.js");

class Layer {
	constructor() {
		Object.assign(this, new AnimationObject());

		let container = null;
		this.setContainer = function(_container) {
			if(container) container.removeLayer(this);
			container = _container;
		}

		let layerName = "New Layer";
		this.getName = function() { return layerName; }
		this.setName = function(_layerName) { layerName = _layerName; }

		let frames = new Array();
		this.addFrame = function(frame, ndx) {
			frame.setLayer(this);
			frames.splice(ndx, 0, frame);
			return frames.length;
		}
		this.removeFrame = function(Frame) {
			let ndx = frames.indexOf(Frame);
			if(ndx >= 0) frames.splice(ndx, 1);
			return frames.length;
		}

		this.onCull = function() {
			if(container) container.removeLayer(this);
		}
	}
}

module.exports = Layer;