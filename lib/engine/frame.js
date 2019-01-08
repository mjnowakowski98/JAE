class Frame {
	constructor() {
		let onScreen = new Array();
		this.getOnScreen = function() { return onScreen(); }
	}
}

module.exports = Frame;