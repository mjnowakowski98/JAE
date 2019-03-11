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
            newFrame.setLayer(this.getHandler().getObjMan().getReference(layerKey), frameNdx);
            objKey = newFrame.getKey();
            this.getHandler().getObjMan().mapObject(newFrame, layerKey);
            return new ServerMessage("createObject", null, {objKey:objKey, type:newFrame.getType()});
        }

        // Mark new frame for delete
        this.undo = function() {
            this.getHandler().getObjMan().markForDelete(objKey);
            return new ServerMessage("information", null, { message:`${objKey} marked for delete`});
        }
    }
}

module.exports = CreateFramecommand;