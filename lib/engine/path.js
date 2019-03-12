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
			referencers.push(sceneObj);
		}
		this.unregisterReferencer = function(sceneObj) {
			let ndx = referencers.length;
			while(--ndx >= 0 && referencers[ndx] != sceneObj) continue;
			if(ndx >= 0) referencers.splice(ndx, 1);
		}

		let methodList = _methodList;
		this.getMethodList = function() { return methodList; }

		let name = "";
		this.getName = function() { return name; }
		this.setName = function(_name) { name = _name; }

		this.getType = () => "path";
	}
}

module.exports = Path;