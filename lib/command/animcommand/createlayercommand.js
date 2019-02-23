const Command = require("../command.js");
const ServerMessage = require("../../netclient/servermessage.js");
const Layer = require("../../engine/layer.js");

class CreateLayerCommand extends Command {
    constructor(_containerKey, _name = "") {
        super();

        let objMan = null;
        let objKey = null;
        let containerKey = _containerKey;
        let name = _name;

        // Create a new Layer and append to specified LayerContainer
        this.execute = function() {
            // Create and initialize Layer
            let newLayer = new Layer();
            objMan = newLayer.getObjectManager();
            newLayer.setName(name); // Set Layer name
            newLayer.setContainer(objMan.getReference(containerKey)); // Give reference to container
            objKey = newLayer.getKey(); // Map new Layer to AnimationObject keymap
            return new ServerMessage(objKey);
        }

        // Mark new Layer for delete
        this.undo = function() {
            objMan.markForDelete(objKey);
            return new ServerMessage(`${objKey} marked for delete`);
        }
    }
}

module.exports = CreateLayerCommand;