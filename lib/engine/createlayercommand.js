const Command = require("./command.js");
const Layer = require("./layer.js");

class CreateLayerCommand extends Command {
    constructor(objMan, _containerKey, _name = "") {
        super(objMan);

        let newKey = null;

        let containerKey = _containerKey;
        let name = _name;

        this.execute = function() {

        }

        this.undo = function() {
            
        }
    }
}

module.exports = CreateLayerCommand;