const Command = require("./command.js");
const Path = require("./path.js");

class CreatePathCommand extends Command {
    constructor(objMan, _drawingMethods, name = "") {
        super(objMan);

        let newKey = null;
        let drawingMethods = _drawingMethods;
        let name = _name;

        this.execute = function() {

        }

        this.undo = function() {
            
        }
    }
}

module.exports  = CreatePathCommand;