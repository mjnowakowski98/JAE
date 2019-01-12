const LayerContainer = require("./layercontainer.js");

class Path {
	constructor(_methodList) {
		Object.assign(this, new LayerContainer());

		this.markForDelete = function() {
			
		}
		this.unmarkForDelete = function() {

		}

		let referencers = new Array();
		this.registerReferencer = function(sceneObj) {

		}
		this.unregisterReferencer = function(sceneObj) {

		}

		let methodList = _methodList;
		this.getMethodList = function() { return methodList; }

		let name = "";
		this.getName = function() { return name; }
		this.setName = function(_name) { name = _name; }
	}
}

module.exports = Path;