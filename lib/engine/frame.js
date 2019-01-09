const AnimationObject = require("./animationobject.js");

class Frame {
	constructor(_layer) {
		Object.assign(this, new AnimationObject());

		let layer = _layer;

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
	}
}

module.exports = Frame;