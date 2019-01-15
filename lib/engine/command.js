class Command {
    constructor(_objMan) {
        this.objMan = _objMan;

        this.execute = function() {}
        this.undo = function() {}
    }
}

module.exports = Command;