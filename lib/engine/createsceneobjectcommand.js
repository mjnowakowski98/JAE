class CreateSceneObjectCommand {
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