const AnimationObject = require("./animationobject.js");

class LayerContainer {
	constructor() {
		Object.assign(this, new AnimationObject());

		let layers = new Array();
		let numFrames = 0;

		let currentFrame = 0;
		this.getCurrentFrame = function() { return currentFrame; }

		this.scrubFrames = function(_numFrames) {

		}
	}
}

module.exports = LayerContainer;