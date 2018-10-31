class Path {
    constructor(drawingmethods) {
        let referencers = new Array();
        this.registerReferencer = function(referencer) {

        }
        this.removeReferencer = function(referencer) {

        }

        let methodList = new Array();

        let path = null;
        let key = null;
        this.getKey = function() { return key; }

        let name = "";
        this.getName = function() { return name; }
        this.setName = function(_name) { name = _name; }

        this.draw = function(ctx) {

        }

        this.onDelete = function() {
            
        }
    }
}

module.exports = Path;