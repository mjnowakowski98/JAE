const Command = require("./command.js");
const CommandResponse = require("./commandresponse.js");

class NoCommand extends Command {
	constructor(_commandName) {
		super(null);
		let commandName = _commandName;

		// Tell client they're insane
		this.execute = function() {
			return new ResponseObject("", `Attempted to execute invalid command: ${commandName}`);
		}

		// Tell client something is wrong
		this.undo = function() {
			return new ResponseObject("", `Attempted to undo NoCommand`);
		}
	}
}

module.exports = NoCommand;