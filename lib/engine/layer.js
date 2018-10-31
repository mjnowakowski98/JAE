class Layer {
    constructor(_container) {
        let container = _container;

        let layerName = "";
        this.getName = function() { return layerName; }
        this.setName = function(_layerName) { layerName = _layerName; }

        let frames = new Array();
        this.createFrame = function(insertNdx) {

        }
        this.getFrame = function(frameNdx) {

        }
        this.removeFrame = function(frameNdx) {

        }
        this.clearFrame = function(frameNdx) {

        }
        this.copyFrame = function(copyNdx, insertNdx) {

        }
        this.getNumFrames = function() { return frames.length; }
    }
}

module.exports = Layer;