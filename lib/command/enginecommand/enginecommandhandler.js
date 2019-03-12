const NoCommand = require("../nocommand.js");
const SetPlayModeCommand = require("./setplaymodecommand.js");

class EngineCommandHandler {
	constructor(_renderer) {
		let renderer = _renderer;
		this.getRenderer = () => renderer;

		let previousCommands = new Array();

		this.executeCommand = function(commandDescriptor) {
			let constructorArgs = commandDescriptor.constructorArgs;

			let command = new NoCommand(commandDescriptor.commandName);
			let commandMatched = true;

			switch(commandDescriptor.commandName) {
				case "setPlayMode":
					command = new SetPlayModeCommand(this, constructorArgs);
					break;

				default:
					commandMatched = false;
					break;
			}

			if(commandMatched) previousCommands.push(command);
			return command.execute();
		}

		this.undoLastCommand = function() {
			let tmpCommand = previousCommands.pop();
			return tmpCommand.undo();
		}
	}
}

module.exports = EngineCommandHandler;