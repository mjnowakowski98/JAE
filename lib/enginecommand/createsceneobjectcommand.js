const Command = require("./command.js");
const CommandResponse = require("./commandresponse.js");
const SceneObject = require("../engine/sceneobject.js");

class CreateSceneObjectCommand extends Command {
    constructor(objMan, _frameKey, _pathKey) {
        super(objMan);

        let objKey = null;

        let frameKey = _frameKey;
        let pathKey = _pathKey;

        // Create a new SceneObject and add it to a Frame
        this.execute = function() {
            let newSceneObj = new SceneObject();
            newSceneObj.setFrame(objMan.getReference(frameKey));
            newSceneObj.setPath(objMan.getReference(pathKey));
            objKey = objMan.mapObject(newSceneObj);

            // Respond with new object key
            let responseHeaders = [{ header:"Content-Type", headerValue:"text/plain" }];
            let responseBody = objKey;
            return new CommandResponse(responseHeaders, responseBody);
        }

        // Mark new SceneObject for delete
        this.undo = function() {
            objMan.markForDelete(objKey);
            return new CommandResponse(null, null);
        }
    }
}

module.exports = CreateSceneObjectCommand;