const Command = require("../command.js");
const ServerMessage = require("../../netclient/servermessage.js");

class SetLayerNameCommand extends Command {
    constructor(_handler, constructorArgs) {
        super(_handler);

        let layerKey = constructorArgs.layerKey;
        let name = constructorArgs.name;

        let layer = this.getHandler().getObjMan().getReference(layerKey);
        let oldName = layer.getName();

        // Renames a layer
        this.execute = function() {
            layer.setName(name);
            return new ServerMessage("updateObject", null, {objKey:objKey, property:"name", value:name});
        }

        // Set name to old name
        this.undo = function() {
            layer.setName(oldName);
            return new ServerMessage("updateObject", null, {objKey:objKey, property:"name", value:oldName});
        }
    }
}

module.exports = SetLayerNameCommand;