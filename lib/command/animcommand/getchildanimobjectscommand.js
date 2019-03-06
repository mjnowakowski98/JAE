const Command = require("../command.js");
const ServerMessage = require("../../netclient/servermessage.js");

class GetChildAnimObjectsCommand extends Command {
    constructor(_handler, constructorArgs) {
        super(_handler);

        let key = constructorArgs.key;

        this.execute = function() {
            
        }

        this.undo = function() {
            
        }
    }
}

module.exports = GetChildAnimObjectsCommand;