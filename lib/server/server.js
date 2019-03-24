// Server Interface

const EventEmitter = require("events");

class Server extends EventEmitter {
	constructor() {
		super(); // Call to EventEmitter constructor

		// Start/Stop the server
		this.start = function(listenPort) {}
		this.stop = function(exitCode) {}

		// Client handling
		this.getClient = function(uuid) {} // Get client ref by uuid
		this.saveClient = function(client) {} // On new connection
		this.dropClient = function(uuid) {} // Drop disconnected

		// Communication
		this.sendFrames = function() {} // Send rendered frames to all clients
		this.sendMessage = function(serverMessage) {} // Send a message
		this.parseMessage = function(messageBuffer) {} // Parse a recieved command
	}
}

module.exports = Server;