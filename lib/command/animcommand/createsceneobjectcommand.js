const Command = require("../command.js");
const ServerMessage = require("../../netclient/servermessage.js");
const SceneObject = require("../../engine/sceneobject.js");

class CreateSceneObjectCommand extends Command {
    constructor(_frameKey, _pathKey) {
        super();

        let objKey = null;
        let frameKey = _frameKey;
        let pathKey = _pathKey;

        // Create a new SceneObject and add it to a Frame
        this.execute = function(objMan) {
            let newSceneObj = new SceneObject();
            newSceneObj.setFrame(objMan.getReference(frameKey));
            newSceneObj.setPath(objMan.getReference(pathKey));
            objKey = newSceneObj.getKey();
            return new ServerMessage(objKey);
        }

        // Mark new SceneObject for delete
        this.undo = function(objMan) {
            objMan.markForDelete(objKey);
            return new ServerMessage(`${objKey} marked for delete`);
        }
    }
}

module.exports = CreateSceneObjectCommand;