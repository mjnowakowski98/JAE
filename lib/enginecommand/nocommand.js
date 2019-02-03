const Command = require("./command.js");
const CommandResponse = require("./commandresponse.js");

class NoCommand extends Command {
	constructor() {
		super(null);

		this.execute = function() {
			return new CommandResponse({"Content-Type":"text/plain"}, "Command is invalid");
		}
		this.undo = function() {
			return new CommandResponse({"Content-Type":"text/plain"}, "Warning: Undo NoCommand instance");
		}
	}
}

module.exports = NoCommand;