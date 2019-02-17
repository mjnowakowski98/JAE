const Command = require("./command.js");
const ResponseObject = require("./responseobject.js");
const SceneObject = require("../engine/sceneobject.js");

class CreateSceneObjectCommand extends Command {
    constructor(objMan, _frameKey, _pathKey) {
        super(objMan);

        let objKey = null;

        let frameKey = _frameKey;
        let pathKey = _pathKey;

        // Create a new SceneObject and add it to a Frame
        this.execute = function() {
            let newSceneObj = new SceneObject();
            newSceneObj.setFrame(objMan.getReference(frameKey));
            newSceneObj.setPath(objMan.getReference(pathKey));
            objKey = objMan.mapObject(newSceneObj);
            return new ResponseObject(objKey);
        }

        // Mark new SceneObject for delete
        this.undo = function() {
            objMan.markForDelete(objKey);
            return new ResponseObject(`${objKey} marked for delete`);
        }
    }
}

module.exports = CreateSceneObjectCommand;