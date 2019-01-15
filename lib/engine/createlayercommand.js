const Command = require("./command.js");
const Layer = requrie("./layer.js");

class CreateLayerCommand extends Command {
    constructor(_containerKey, _name = "") {
        let containerKey = _containerKey;
        let name = _name;

        this.execute = function() {
            let newLayer = new Layer();
        }

        this.undo = function() {

        }
    }
}

module.exports = CreateLayerCommand;