const Command = require("./command.js");

class CreateSceneObjectCommand extends Command {
    constructor(objMan, _frameKey, _pathKey) {
        super(objMan);

        let frameKey = _frameKey;
        let pathKey = _pathKey;

        this.execute = function() {

        }

        this.undo = function() {

        }
    }
}

module.exports = CreateSceneObjectCommand;