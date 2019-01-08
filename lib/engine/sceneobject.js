const AnimationObject = require("./animationobject.js");
const Point = require("./point.js");

class SceneObject {
	constructor(pathKey, _position) {
		Object.assign(this, new AnimationObject());

		let path = null; // eventually get path ref from AnimationObjectManger

		let position = _position;
		this.getPosition = function() { return position; }
		this.setPosition = function(_position) { position = _position; }
	}
}

module.exports = SceneObject;