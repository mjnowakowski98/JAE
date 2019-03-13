const Command = require("../command.js");
const ServerMessage = require("../../netclient/servermessage.js");

class SetSceneObjectPathCommand extends Command {
    constructor(_handler, constructorArgs) {
        super(_handler);

        let sceneObjKey = constructorArgs.sceneObjKey;
        let pathKey = constructorArgs.pathKey;

        let sceneObj = this.getHandler().getObjMan().getReference(sceneObjKey);
        let newPath = this.getHandler().getObjMan().getReference(pathKey);
        let oldPath = sceneObj.getPath();

        // Renames a path
        this.execute = function() {
            sceneObj.setPath(newPath);
            return new ServerMessage("updateObject", null, {objKey:objKey, property:"path", value:pathKey});
        }

        // Set name to old name
        this.undo = function() {
            path.setPath(oldPath);
            return new ServerMessage("updateObject", null, {objKey:objKey, property:"path", value:oldPath.getKey()});
        }
    }
}

module.exports = SetSceneObjectPathCommand;