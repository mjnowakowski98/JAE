const Command = require("../command.js");
const ServerMessage = require("../../netclient/servermessage.js");

class DeleteAnimationObjectCommand extends Command {
    constructor(_key) {
        super();

        let key = _key;

        // Mark specified AnimationObject for delete
        this.execute = function(objMan) {
            objMan.markForDelete(key);
            return new ServerMessage(`${objKey} marked for delete`);
        }

        // Unmark specified AnimationObject for delete
        this.undo = function(objMan) {
            objMan.unmarkForDelete(key);
            return new ServerMessage(`${objKey} unmarked for delete`);
        }
    }
}

module.exports = DeleteAnimationObjectCommand;