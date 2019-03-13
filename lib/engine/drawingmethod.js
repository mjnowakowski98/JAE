class DrawingMethod {
	constructor(_methodName, _argsList) {
		let methodName = _methodName;
		this.getMethodName = function() { return methodName; }

		let argsList = _argsList;
		this.getArgsList = function() { return argsList; }
	}
}

module.exports = DrawingMethod;