const AnimationObject = require("./animationobject.js");
const Frame = require("./frame.js");

class Layer {
	constructor(objMan) {
		Object.assign(this, new AnimationObject(objMan));

		let container = null;
		this.setContainer = function(_container) {
			if(container) container.removeLayer(this);
			if(_container) {
				container = _container;
				container.addLayer(this);
			}
		}

		let layerName = "New Layer";
		this.getName = function() { return layerName; }
		this.setName = function(_layerName) { layerName = _layerName; }

		let frames = new Array();
		this.addFrame = function(frame, ndx) {
			frames.splice(ndx, 0, frame);
			return frames.length;
		}

		let initFrame = new Frame();
		initFrame.setLayer(this);

		this.removeFrame = function(Frame) {
			let ndx = frames.indexOf(Frame);
			if(ndx >= 0) frames.splice(ndx, 1);
			return frames.length;
		}
		this.getFrames = () => frames;

		this.onCull = function() {
			if(container) container.removeLayer(this);
		}
	}
}

module.exports = Layer;