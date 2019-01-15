const Command = require("./command.js");

class CreateSceneObjectCommand extends Command {
    constructor(_frameKey, _pathKey) {
        let frameKey = _frameKey;
        let pathKey = _pathKey;

        this.execute = function() {

        }

        this.undo = function() {

        }
    }
}

module.exports = CreateSceneObjectCommand;