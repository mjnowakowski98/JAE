const Util = require("../util.js");

class AnimationObject {
	constructor(objectManager) {
		let key = Util.generateKey();
		this.getKey = function() { return key; }

		let deleted = false;
		this.getDeleted = function() { return deleted; }
		this.setDeleted = function(_deleted) { deleted = _deleted; }

		this.onCull = function() {} // Abstract
		this.getType = () => "Error";
		
        objectManager.mapObject(this);
	}
}

module.exports = AnimationObject;