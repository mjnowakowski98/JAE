const Command = require("./command.js");
const CommandResponse = require("./commandresponse.js");
const Layer = require("../engine/layer.js");

class CreateLayerCommand extends Command {
    constructor(objMan, _containerKey, _name = "") {
        super(objMan);

        let objKey = null;

        let containerKey = _containerKey;
        let name = _name;

        // Create a new Layer and append to specified LayerContainer
        this.execute = function() {
            // Create and initialize Layer
            let newLayer = new Layer();
            newLayer.setName(name); // Set Layer name
            newLayer.setContainer(objMan.getReference(containerKey)); // Give reference to container
            objKey = objMan.mapObject(newLayer); // Map new Layer to AnimationObject keymap

            // Respond with the new object key
            let responseHeaders = [{ header:"Content-Type", headerValue:"text/plain" }];
            let responseBody = objKey;
            return new CommandResponse(responseHeaders, responseBody);
        }

        this.undo = function() {
            objMan.markForDelete(objKey);
        }
    }
}

module.exports = CreateLayerCommand;