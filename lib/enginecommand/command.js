class Command {
    constructor(_objMan) {
        this.objMan = _objMan; // AnimationObjectManager from CommandDescriptor

        this.execute = function() {} // Abstract
        this.undo = function() {} // Abstract
    }
}

module.exports = Command;