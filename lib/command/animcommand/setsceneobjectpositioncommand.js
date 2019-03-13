const Command = require("../command.js");
const ServerMessage = require("../../netclient/servermessage.js");

class SetPathNameCommand extends Command {
    constructor(_handler, constructorArgs) {
        super(_handler);

        let key = constructorArgs.key;
        let newPosition = constructorArgs.position;

        let sceneObj = this.getHandler().getObjMan().getReference(key);
        let oldPosition = sceneObj.getPosition();

        // Sets sceneObject position
        this.execute = function() {
            sceneObj.setPosition(newPosition);
            return new ServerMessage("updateObject", null, {objKey:key, property:"position", value:sceneObj.getPosition()});
        }

        // Reset to old position
        this.undo = function() {
            path.setPosition(oldPosition);
            return new ServerMessage("updateObject", null, {objKey:key, property:"position", value:sceneObj.getPosition()});
        }
    }
}

module.exports = SetPathNameCommand;