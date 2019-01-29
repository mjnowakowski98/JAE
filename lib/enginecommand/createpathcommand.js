const Command = require("./command.js");
const Path = require("../engine/path.js");

class CreatePathCommand extends Command {
    constructor(objMan, _drawingMethods, name = "") {
        super(objMan);

        let objKey = null;
        let drawingMethods = _drawingMethods;
        let name = _name;

        this.execute = function() {
            let newPath = new Path(drawingMethods);
            newPath.setName(name);
            objKey = objMan.mapObject(newPath);
        }

        this.undo = function() {
            objMan.markForDelete(objKey);
        }
    }
}

module.exports  = CreatePathCommand;