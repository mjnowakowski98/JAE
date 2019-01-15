const Command = require("./command.js");
const SceneObject = require("./sceneobject.js");

class CreateSceneObjectCommand extends Command {
    constructor(objMan, _frameKey, _pathKey) {
        super(objMan);

        let newKey = null;

        let frameKey = _frameKey;
        let pathKey = _pathKey;

        this.execute = function() {
            
        }

        this.undo = function() {
            
        }
    }
}

module.exports = CreateSceneObjectCommand;