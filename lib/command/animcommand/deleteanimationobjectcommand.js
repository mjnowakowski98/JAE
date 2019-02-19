const AnimCommand = require("./animcommand.js");
const ServerMessage = require("../../netclient/servermessage.js");

class DeleteAnimationObjectCommand extends AnimCommand {
    constructor(objMan, _key) {
        super(objMan);

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