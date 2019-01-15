const Command = require("./command.js");
const Frame = require("./frame.js");

class CreateFramecommand extends Command {
    constructor(objMan, _layerKey, _frameNdx) {
        super(objMan);

        let newKey = null;

        let layerKey = _layerKey;
        let frameNdx = _frameNdx;

        this.execute = function() {
            let layer = objMan.getReference(layerKey);
            let newFrame = new Frame();
            newKey = objMan.mapObject(newFrame);
            layer.addFrame(newFrame, frameNdx);
            console.log(newFrame);
        }

        this.undo = function() {
            objMan.markForDelete(newKey);
        }
    }
}

module.exports = CreateFramecommand;