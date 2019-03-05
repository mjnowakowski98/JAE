class EngineCommandHandler {
	constructor() {
		let previousCommands = new Array();

		this.executeCommand = function(commandDescriptor) {
			let constructorArgs = commandDescriptor.constructorArgs;
			let command = new NoCommand(commandDescriptor.commandName);
			let commandMatched = true;

			switch(commandDescriptor.commandName) {
				default:
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