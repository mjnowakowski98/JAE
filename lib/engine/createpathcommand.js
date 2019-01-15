const Command = require("./command.js");

class CreatePathCommand extends Command {
    constructor(_drawingMethods, name = "") {
        let drawingMethods = _drawingMethods;
        let name = _name;

        this.execute = function() {

        }

        this.undo = function() {
            
        }
    }
}

module.exports  = CreatePathCommand;