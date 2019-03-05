const Command = require("../command.js");
const ServerMessage = require("../../netclient/servermessage.js");
const Path = require("../../engine/path.js");

class CreatePathCommand extends Command {
    constructor(_drawingMethods, name = "") {
        super();

        let objKey = null;
        let drawingMethods = _drawingMethods;
        let name = _name;

        // Create new Path
        this.execute = function(objMan) {
            // Initialize Path
            let newPath = new Path(drawingMethods);
            newPath.setName(name);
            objKey = newPath.getKey();
            return new ServerMessage(objKey);
        }

        // Mark new Path for delete
        this.undo = function(objMan) {
            objMan.markForDelete(objKey);
            return new ServerMessage(`${objKey} marked for delete`);
        }
    }
}

module.exports  = CreatePathCommand;