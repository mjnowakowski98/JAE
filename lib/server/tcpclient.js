const Client = require("./client.js");

class TcpClient {
	constructor(_socket) {
		Object.assign(this, new Client(_socket.remoteAddress, _socket.remotePort));

		let socket = _socket;
		this.getSocket = () => socket;
	}
}

module.exports = TcpClient;