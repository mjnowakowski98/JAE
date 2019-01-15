const Command = require("./command.js");

class DeleteAnimationObjectCommand extends Command {
    constructor(_key) {
        let key = _key;

        this.execute = function() {
            
        }

        this.undo = function() {
            
        }
    }
}

module.exports = DeleteAnimationObjectCommand;