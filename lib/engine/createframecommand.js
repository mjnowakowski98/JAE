const Command = require("./command.js");
const Frame = require("./frame.js");

class CreateFramecommand extends Command {
    constructor(objMan, _layerKey, _frameNdx) {
        super(objMan);

        let objKey = null;

        let layerKey = _layerKey;
        let frameNdx = _frameNdx;

        this.execute = function() {
            let newFrame = new Frame();
            newFrame.setLayer(objMan.getReference(layerKey), frameNdx);
            objKey = objMan.mapObject(newFrame);
        }

        this.undo = function() {
            objMan.markForDelete(objKey);
        }
    }
}

module.exports = CreateFramecommand;