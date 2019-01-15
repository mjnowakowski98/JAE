const Command = require("./command.js");
const Layer = require("./layer.js");

class CreateLayerCommand extends Command {
    constructor(objMan, _containerKey, _name = "") {
        super(objMan);

        let objKey = null;

        let containerKey = _containerKey;
        let name = _name;

        this.execute = function() {
            let newLayer = new Layer();
            newLayer.setName(name);
            newLayer.setContainer(objMan.getReference(containerKey));
            objKey = objMan.mapObject(newLayer);
        }

        this.undo = function() {
            objMan.markForDelete(objKey);
        }
    }
}

module.exports = CreateLayerCommand;