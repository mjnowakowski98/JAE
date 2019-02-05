const AnimationObject = require("./animationobject.js");
const Point = require("../point.js");

class SceneObject {
	constructor() {
		Object.assign(this, new AnimationObject());

		let frame = null;
		this.setFrame = function(_frame) {
			if(frame) frame.removeSceneObject(this);
			if(_frame) {
				frame = _frame;
				frame.addSceneObject(this);
			}
		}

		let path = null;
		this.setPath = function(_path) {
			if(path) path.unregisterReferencer(this);
			path = _path;
			path.registerReferencer(this);
		}

		let position = new Point(0,0);
		this.getPosition = function() { return position; }
		this.setPosition = function(_position) { position = _position; }

		this.onCull = function() {
			if(frame) frame.removeSceneObject(this);
		}
	}
}

module.exports = SceneObject;