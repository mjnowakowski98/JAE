const Command = require("./command.js");
const Frame = require("./frame.js");

class CreateFramecommand extends Command {
    constructor(objMan, _layerKey, _frameNdx) {
        super(objMan);

        let newKey = null;

        let layerKey = _layerKey;
        let frameNdx = _frameNdx;

        this.execute = function() {

        }

        this.undo = function() {
            
        }
    }
}

module.exports = CreateFramecommand;