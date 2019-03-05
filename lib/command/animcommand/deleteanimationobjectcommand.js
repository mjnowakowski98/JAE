const Command = require("../command.js");
const ServerMessage = require("../../netclient/servermessage.js");

class DeleteAnimationObjectCommand extends Command {
    constructor(_handler, constructorArgs) {
        super();

        let key = constructorArgs.key;

        // Mark specified AnimationObject for delete
        this.execute = function() {
            handler.getObjMan().markForDelete(key);
            return new ServerMessage(`${objKey} marked for delete`);
        }

        // Unmark specified AnimationObject for delete
        this.undo = function() {
            handler.getObjMan().unmarkForDelete(key);
            return new ServerMessage(`${objKey} unmarked for delete`);
        }
    }
}

module.exports = DeleteAnimationObjectCommand;