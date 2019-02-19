const Command = require("./command.js");
const ServerMessage = require("../netclient/servermessage.js");

class NoCommand extends Command {
	constructor(_commandName) {
		super(null);
		let commandName = _commandName;

		// Tell client they're insane
		this.execute = function() {
			return new ServerMessage("", `Attempted to execute invalid command: ${commandName}`);
		}

		// Tell client something is wrong
		this.undo = function() {
			return new ServerMessage("", `Attempted to undo NoCommand`);
		}
	}
}

module.exports = NoCommand;