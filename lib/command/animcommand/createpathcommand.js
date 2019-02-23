const AnimCommand = require("./animcommand.js");
const ServerMessage = require("../../netclient/servermessage.js");
const Path = require("../../engine/path.js");

class CreatePathCommand extends AnimCommand {
    constructor(objMan, _drawingMethods, name = "") {
        super(objMan);

        let objKey = null;

        let drawingMethods = _drawingMethods;
        let name = _name;

        // Create new Path
        this.execute = function() {
            // Initialize Path
            let newPath = new Path(drawingMethods);
            newPath.setName(name);
            objKey = newPath.getKey();
            return new ServerMessage(objKey);
        }

        // Mark new Path for delete
        this.undo = function() {
            objMan.markForDelete(objKey);
            return new ServerMessage(`${objKey} marked for delete`);
        }
    }
}

module.exports  = CreatePathCommand;