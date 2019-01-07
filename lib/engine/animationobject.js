class AnimationObject {
	constructor() {
		let generateKey = function() {
			return "I am a key m9";
		}

		let key = generateKey(); // Generate unique key here
		this.getKey = function() { return key; }

		this.delete = function() {

		}
	}
}

module.exports = AnimationObject;