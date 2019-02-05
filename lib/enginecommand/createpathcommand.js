const Command = require("./command.js");
const CommandResponse = require("./commandresponse.js");
const Path = require("../engine/path.js");

class CreatePathCommand extends Command {
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
            objKey = objMan.mapObject(newPath);

            // Respond with new object key
            let responseHeaders = [{header:"Content-Type", headerValue:"text/plain"}];
            let responseBody = objKey;
            return new CommandResponse(responseHeaders, responseBody);
        }

        // Mark new Path for delete
        this.undo = function() {
            objMan.markForDelete(objKey);
            return new CommandResponse(null, null);
        }
    }
}

module.exports  = CreatePathCommand;