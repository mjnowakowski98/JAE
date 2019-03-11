const Command = require("../command.js");
const ServerMessage = require("../../netclient/servermessage.js");
const Path = require("../../engine/path.js");

class CreatePathCommand extends Command {
    constructor(_handler, constructorArgs) {
        super(_handler);

        let objKey = null;
        let drawingMethods = constructorArgs.drawingMethods;
        let name = constructorArgs.name;

        // Create new Path
        this.execute = function() {
            // Initialize Path
            let newPath = new Path(drawingMethods);
            newPath.setName(name);
            objKey = newPath.getKey();
            handler.getObjMan().mapObject(newPath, objKey);
            return new ServerMessage(objKey);
        }

        // Mark new Path for delete
        this.undo = function() {
            handler.getObjMan().markForDelete(objKey);
            return new ServerMessage(`${objKey} marked for delete`);
        }
    }
}

module.exports  = CreatePathCommand;