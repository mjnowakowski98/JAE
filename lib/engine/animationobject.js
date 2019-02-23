const Util = require("../util.js");
const AnimationObjectManager = require("./animationobjectmanager.js");

class AnimationObject {
	constructor() {
		let key = Util.generateKey();
		this.getKey = function() { return key; }

		let deleted = false;
		this.getDeleted = function() { return deleted; }
		this.setDeleted = function(_deleted) { deleted = _deleted; }

		this.onCull = function() {} // Abstract

		let objectManager = new AnimationObjectManager();
        objectManager.mapObject(this);
        this.getObjectManager = function() { return objectManager; }
	}
}

module.exports = AnimationObject;