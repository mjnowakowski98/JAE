const Command = require("../command.js");
const ServerMessage = require("../../netclient/servermessage.js");

class DeleteAnimationObjectCommand extends Command {
    constructor(_objMan, _key) {
        super();

        let objMan = _objMan;
        let key = _key;

        // Mark specified AnimationObject for delete
        this.execute = function() {
            objMan.markForDelete(key);
            return new ServerMessage(`${objKey} marked for delete`);
        }

        // Unmark specified AnimationObject for delete
        this.undo = function() {
            objMan.unmarkForDelete(key);
            return new ServerMessage(`${objKey} unmarked for delete`);
        }
    }
}

module.exports = DeleteAnimationObjectCommand;