class Command {
    constructor(_handler) {
        let handler = _handler;

        this.execute = function() {}
        this.undo = function() {}
    }
}

module.exports = Command;