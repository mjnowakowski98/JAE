const env = appConfig.env;

const Uuid = require("uuid/" + env.uuidVersion);

class Client {
	constructor(_remoteAddress, _remotePort) {
		// Client uuid
		let uuid = Uuid();
		this.getUuid = () => uuid;

		// Remote address
		let remoteAddress = _remoteAddress;
		this.getRemoteAddres = () => remoteAddress;

		// Remote port
		let remotePort = _remotePort;
		this.getRemotePort = () => remotePort;

		// CommandHandler
		let commandHandler = null; // TMP - Assign new CommandHandler
		this.execute = function(commandDescriptor) { // Execute a command
			// STUB
		}
	}
}

module.exports = Client;