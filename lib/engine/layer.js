const AnimationObject = require("./animationobject.js");
const Frame = require("./frame.js");

class Layer {
	constructor(_container) {
		Object.assign(this, new AnimationObject());

		let container = _container;

		let layerName = "New Layer";
		this.getName = function() { return layerName; }
		this.setName = function(_layerName) { layerName = _layerName; }

		let frames = new Array();
		this.createFrame = function(ndx) {

		}
		this.getFrame = function(ndx) {

		}
		this.removeFrame = function(ndx) {

		}

		this.getNumFrames = function() { return frames.length; }
	}
}

module.exports = Layer;