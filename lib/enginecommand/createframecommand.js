const Command = require("./command.js");
const CommandResponse = require("./commandresponse.js");
const Frame = require("../engine/frame.js");

class CreateFramecommand extends Command {
    constructor(objMan, _layerKey, _frameNdx) {
        super(objMan);

        let objKey = null;

        let layerKey = _layerKey;
        let frameNdx = _frameNdx;

        // Creates a new frame and adds it to a layer at an index
        this.execute = function() {
            let newFrame = new Frame();
            newFrame.setLayer(objMan.getReference(layerKey), frameNdx);
            objKey = objMan.mapObject(newFrame);

            // Respond with the new object key
            let responseHeaders = [{header:"Content-Type", headerValue:"text/plain"}];
            let responseBody = objKey;
            return new CommandResponse(responseHeaders, responseBody);
        }

        // Mark new frame for delete
        this.undo = function() {
            objMan.markForDelete(objKey);
            return new CommandResponse(null, null);
        }
    }
}

module.exports = CreateFramecommand;