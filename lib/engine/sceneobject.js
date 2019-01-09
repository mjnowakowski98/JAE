const AnimationObject = require("./animationobject.js");
const Point = require("./point.js");

class SceneObject {
	constructor(_frame, _path) {
		Object.assign(this, new AnimationObject());

		let frame = _frame;

		let path = _path;

		let position = _position;
		this.getPosition = function() { return position; }
		this.setPosition = function(_position) { position = _position; }
	}
}

module.exports = SceneObject;