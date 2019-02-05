const Command = require("./command.js");
const CommandResponse = require("./commandresponse.js");

class DeleteAnimationObjectCommand extends Command {
    constructor(_key) {
        let key = _key;

        this.execute = function() {
            objMan.markForDelete(key);
            return new CommandResponse(null, null);
        }

        this.undo = function() {
            objMan.unmarkFormDelete(key);
            return new CommandResponse(null, null);
        }
    }
}

module.exports = DeleteAnimationObjectCommand;