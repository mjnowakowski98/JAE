const Command = require("../command.js");
const ServerMessage = require("../../netclient/servermessage.js");
const Layer = require("../../engine/layer.js");

class CreateLayerCommand extends Command {
    constructor(_handler, constructorArgs) {
        super(_handler);

        let objKey = null;
        let containerKey = constructorArgs.containerKey;
        let name = constructorArgs.name;

        // Create a new Layer and append to specified LayerContainer
        this.execute = function() {
            // Create and initialize Layer
            let newLayer = new Layer();
            newLayer.setName(name); // Set Layer name
            newLayer.setContainer(this.getHandler().getObjMan().getReference(containerKey)); // Give reference to container
            objKey = newLayer.getKey(); // Map new Layer to AnimationObject keymap
            this.getHandler().getObjMan().mapObject(newLayer, objKey);
            return new ServerMessage("createObject", null, {objKey:objKey, type:newLayer.getType()});
        }

        // Mark new Layer for delete
        this.undo = function() {
            this.getHandler().getObjMan().markForDelete(objKey);
            return new ServerMessage(`${objKey} marked for delete`);
        }
    }
}

module.exports = CreateLayerCommand;