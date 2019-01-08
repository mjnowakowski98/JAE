class AnimationObject {
	constructor() {
		let generateKey = function() {
			return "tmp";
		}

		let key = generateKey(); // Generate unique key here
		this.getKey = function() { return key; }

		this.delete = function() {

		}
	}
}

module.exports = AnimationObject;