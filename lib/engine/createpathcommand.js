const Command = require("./command.js");

class CreatePathCommand extends Command {
    constructor(objMan, _drawingMethods, name = "") {
        super(objMan);

        let drawingMethods = _drawingMethods;
        let name = _name;

        this.execute = function() {
            
        }

        this.undo = function() {
            
        }
    }
}

module.exports  = CreatePathCommand;