const Command = require("../command.js");
const ServerMessage = require("../../netclient/servermessage.js");
const SceneObject = require("../../engine/sceneobject.js");

class CreateSceneObjectCommand extends Command {
    constructor(_handler, constructorArgs) {
        super(_handler);

        let objKey = null;
        let frameKey = constructorArgs.frameKey;
        let pathKey = constructorArgs.pathKey;

        // Create a new SceneObject and add it to a Frame
        this.execute = function() {
            let newSceneObj = new SceneObject();
            newSceneObj.setFrame(this.getHandler().getObjMan().getReference(frameKey));
            newSceneObj.setPath(this.getHandler().getObjMan().getReference(pathKey));
            objKey = newSceneObj.getKey();
            this.getHandler().getObjMan().mapObject(newSceneObj, frameKey);
            return new ServerMessage("createObject", null, {objKey:objKey, type:newSceneObj.getType()});
        }

        // Mark new SceneObject for delete
        this.undo = function() {
            this.getHandler().getObjMan().markForDelete(objKey);
            return new ServerMessage(`${objKey} marked for delete`);
        }
    }
}

module.exports = CreateSceneObjectCommand;