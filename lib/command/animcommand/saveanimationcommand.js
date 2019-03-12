const Command = require("../command.js");
const ServerMessage = require("../../netclient/servermessage.js");

class SaveAnimationCommand extends Command {
    constructor(_handler, constructorArgs) {
        super(_handler);

        // Stringifies a save object from animation and sends back to client
        this.execute = function() {
            let saveString = JSON.stringify(this.getHandler().getObjMan().getAnimation().makeSaveFile());
            return new ServerMessage("saveAnimation", null, {saveString:saveString});
        }

        // Does nothing really
        this.undo = function() {
            return new ServerMessage("information", null, { message:`nothing to undo`});
        }
    }
}

module.exports = SaveAnimationCommand;