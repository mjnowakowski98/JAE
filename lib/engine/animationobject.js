const Util = require("../util.js");

class AnimationObject {
	constructor() {
		let key = Util.generateKey();
		this.getKey = function() { return key; }

		let deleted = false;
		this.getDeleted = function() { return deleted; }
		this.setDeleted = function(_deleted) { deleted = _deleted; }

		this.onCull = function() {}
	}
}

module.exports = AnimationObject;