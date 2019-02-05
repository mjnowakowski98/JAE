const Command = require("./command.js");
const CommandResponse = require("./commandresponse.js");

class NoCommand extends Command {
	constructor() {
		super(null);

		// Tell client they're insane
		this.execute = function() {
			return new CommandResponse({"Content-Type":"text/plain"}, "Command is invalid");
		}

		// Tell client something is wrong
		this.undo = function() {
			return new CommandResponse({"Content-Type":"text/plain"}, "Warning: Undo NoCommand instance");
		}
	}
}

module.exports = NoCommand;