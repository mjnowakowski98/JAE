const Command = require("./command.js");
const CommandResponse = require("./commandresponse.js");

class DeleteAnimationObjectCommand extends Command {
    constructor(objMan, _key) {
        super(objMan);

        let key = _key;

        // Mark specified AnimationObject for delete
        this.execute = function() {
            objMan.markForDelete(key);
            return new CommandResponse(null, null);
        }

        // Unmark specified AnimationObject for delete
        this.undo = function() {
            objMan.unmarkForDelete(key);
            return new CommandResponse(null, null);
        }
    }
}

module.exports = DeleteAnimationObjectCommand;