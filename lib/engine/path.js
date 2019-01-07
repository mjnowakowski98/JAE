class Path {
	constructor(_methodList) {
		Object.assign(this, new LayerContainer());

		let methodList = _methodList;
		this.insertMethod = function(newMethod, ndx) {

		}
		this.deleteMethod = function(ndx) {

		}

		let name = "";
		this.getName = function() { return name; }
		this.setName = function(_name) { name = _name; }
	}
}

module.exports = Path;