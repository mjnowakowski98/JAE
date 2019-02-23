const AnimCommand = require("./animcommand.js");
const ServerMessage = require("../../netclient/servermessage.js");
const SceneObject = require("../../engine/sceneobject.js");

class CreateSceneObjectCommand extends AnimCommand {
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
            objKey = newSceneObj.getKey();
            return new ServerMessage(objKey);
        }

        // Mark new SceneObject for delete
        this.undo = function() {
            objMan.markForDelete(objKey);
            return new ServerMessage(`${objKey} marked for delete`);
        }
    }
}

module.exports = CreateSceneObjectCommand;