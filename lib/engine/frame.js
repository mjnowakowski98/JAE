const AnimationObject = require("./animationobject.js");

class Frame {
	constructor() {
		Object.assign(this, new AnimationObject());

		let layer = null;
		this.setLayer = function(_layer) {
			if(layer) layer.removeFrame(this);
			layer = _layer;
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