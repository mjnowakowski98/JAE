const Command = require("./command.js");
const SceneObject = require("./sceneobject.js");

class CreateSceneObjectCommand extends Command {
    constructor(objMan, _frameKey, _pathKey) {
        super(objMan);

        let objKey = null;

        let frameKey = _frameKey;
        let pathKey = _pathKey;

        this.execute = function() {
            let newSceneObj = new SceneObject();
            newSceneObj.setFrame(objMan.getReference(frameKey));
            newSceneObj.setPath(objMan.getReference(pathKey));
            objKey = objMan.mapObject(newSceneObj);
        }

        this.undo = function() {
            objMan.markForDelete(objKey);
        }
    }
}

module.exports = CreateSceneObjectCommand;