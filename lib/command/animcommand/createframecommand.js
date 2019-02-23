const Command = require("../command.js");
const ServerMessage = require("../../netclient/servermessage.js");
const Frame = require("../../engine/frame.js");

class CreateFramecommand extends Command {
    constructor(_layerKey, _frameNdx) {
        super();

        let objMan = null;
        let objKey = null;
        let layerKey = _layerKey;
        let frameNdx = _frameNdx;

        // Creates a new frame and adds it to a layer at an index
        this.execute = function() {
            let newFrame = new Frame();
            objMan = newFrame.getObjectManager();
            newFrame.setLayer(objMan.getReference(layerKey), frameNdx);
            objKey = newFrame.getKey();
            return new ServerMessage(objKey);
        }

        // Mark new frame for delete
        this.undo = function() {
            objMan.markForDelete(objKey);
            return new ServerMessage(`${objKey} marked for delete`);
        }
    }
}

module.exports = CreateFramecommand;