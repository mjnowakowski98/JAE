const Command = require("../command.js");

class AnimCommand extends Command {
    constructor(_objMan) {
        this.objMan = _objMan; // AnimationObjectManager from CommandDescriptor
    }
}

module.exports = AnimCommand;