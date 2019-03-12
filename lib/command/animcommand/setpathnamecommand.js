const Command = require("../command.js");
const ServerMessage = require("../../netclient/servermessage.js");

class SetPathNameCommand extends Command {
    constructor(_handler, constructorArgs) {
        super(_handler);

        let pathKey = constructorArgs.pathKey;
        let name = constructorArgs.name;

        let path = this.getHandler().getObjMan().getReference(pathKey);
        let oldName = layer.getName();

        // Renames a path
        this.execute = function() {
            path.setName(name);
            return new ServerMessage("updateObject", null, {objKey:objKey, property:"name", value:name});
        }

        // Set name to old name
        this.undo = function() {
            path.setName(oldName);
            return new ServerMessage("updateObject", null, {objKey:objKey, property:"name", value:oldName});
        }
    }
}

module.exports = SetPathNameCommand;