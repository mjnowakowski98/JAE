const AnimationObject = require("./animationobject.js");

class Frame {
	constructor() {
		Object.assign(this, new AnimationObject());

		let layer = null;
		this.setLayer = function(_layer, frameNdx) {
			if(layer) layer.removeFrame(this);
			if(_layer) {
				layer = _layer;
				layer.addFrame(this, frameNdx);
			}
		}

		let onScreen = new Array();
		this.addSceneObject = function(_sceneobj) {
			onScreen.push(_sceneobj);
			return onScreen.length;
		}
		this.removeSceneObject = function(_sceneobj) {
			let ndx = onScreen.indexOf(_sceneobj);
			if (ndx >= 0)onScreen.splice(ndx, 1);
			return onScreen.length;
		}

		this.onCull = function() {
			if(layer) layer.removeFrame(this);
		}
	}
}

module.exports = Frame;