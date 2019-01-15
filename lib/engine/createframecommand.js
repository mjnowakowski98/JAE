const Command = require("./command.js");

class CreateFramecommand extends Command {
    constructor(_layerKey, _frameNdx) {
        let layerKey = _layerKey;
        let frameNdx = _frameNdx;

        this.execute = function() {
            
        }

        this.undo = function() {

        }
    }
}

module.exports = CreateFramecommand;