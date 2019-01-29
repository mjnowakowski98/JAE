class Command {
    constructor(_objMan) {
        this.objMan = _objMan;
        this.returnData = null;

        this.execute = function() {}
        this.undo = function() {}
    }
}

module.exports = Command;