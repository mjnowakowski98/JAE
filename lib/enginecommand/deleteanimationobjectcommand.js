const Command = require("./command.js");
const ResponseObject = require("./responseobject.js");

class DeleteAnimationObjectCommand extends Command {
    constructor(objMan, _key) {
        super(objMan);

        let key = _key;

        // Mark specified AnimationObject for delete
        this.execute = function() {
            objMan.markForDelete(key);
            return new ResponseObject(`${objKey} marked for delete`);
        }

        // Unmark specified AnimationObject for delete
        this.undo = function() {
            objMan.unmarkForDelete(key);
            return new ResponseObject(`${objKey} unmarked for delete`);
        }
    }
}

module.exports = DeleteAnimationObjectCommand;