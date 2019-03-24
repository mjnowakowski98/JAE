const env = appConfig.env;

const Uuid = require("uuid/" + env.uuidVersion);

class Client {
	constructor(_remoteAddress, _remotePort) {
		let uuid = Uuid();
		this.getUuid = () => uuid;

		let remoteAddress = _remoteAddress;
		this.getRemoteAddres = () => remoteAddress;

		let remotePort = _remotePort;
		this.getRemotePort = () => remotePort;

		let commandHandler = null;
	}
}