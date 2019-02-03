const Command = require("./command.js");
const CommandResponse = require("./commandresponse.js");
const Frame = require("../engine/frame.js");

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

            let responseHeaders = [{header:"Content-Type", headerValue:"text/plain"}];
            let responseBody = objKey;
            return new CommandResponse(responseHeaders, responseBody);
        }

        this.undo = function() {
            objMan.markForDelete(objKey);
        }
    }
}

module.exports = CreateFramecommand;