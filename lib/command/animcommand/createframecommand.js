const Command = require("../command.js");
const ServerMessage = require("../../netclient/servermessage.js");
const Frame = require("../../engine/frame.js");

class CreateFramecommand extends Command {
    constructor(_handler, constructorArgs) {
        super(_handler);

        let objKey = null;
        let layerKey = constructorArgs.layerKey;
        let frameNdx = constructorArgs.frameNdx;

        // Creates a new frame and adds it to a layer at an index
        this.execute = function() {
            let newFrame = new Frame();
            newFrame.setLayer(handler.getObjMan().getReference(layerKey), frameNdx);
            objKey = newFrame.getKey();
            return new ServerMessage(objKey);
        }

        // Mark new frame for delete
        this.undo = function() {
            handler.getObjMan().markForDelete(objKey);
            return new ServerMessage(`${objKey} marked for delete`);
        }
    }
}

module.exports = CreateFramecommand;