const Command = require("./command.js");
const Layer = require("./layer.js");

class CreateLayerCommand extends Command {
    constructor(objMan, _containerKey, _name = "") {
        super(objMan);

        let newKey = null;

        let containerKey = _containerKey;
        let name = _name;

        this.execute = function() {
            let container = objMan.getReference(containerKey);
            let newLayer = new Layer();
            newLayer.setName(name);
            newKey = objMan.mapObject(newLayer);
            container.addLayer(newLayer);
            console.log(container, newLayer);
        }

        this.undo = function() {
            objMan.markForDelete(newKey);
        }
    }
}

module.exports = CreateLayerCommand;