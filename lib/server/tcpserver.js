// TcpServer

const Net = require("net");

const Server = require("./server.js");

class TcpServer {
	constructor() {
		Object.assign(this, new Server()); // Implement Server

		let server = null; // Net.Server instance
		let clients = new Array(); // Clients storage

		// Start the server
		this.start = function(listenPort) {
			// Make a new Net.Server instance
			// Connection Listener
			server = Net.createServer((socket) => {
				// Create a new Client connection
				let newClient = null; // TcpClient (NYI)
				this.saveClient(newClient); // Save Client

				socket.on("data", (chunk) => {
					// On Data Buffer read

				}).on("end", () => {
					// On Data Buffer end

				}).on("close", () => {
					// On connection close
					this.dropClient();

				}).on("error", (err) => {
					// on error
					console.error(err);
				});
			});

			server.listen(listenPort); // Listen on specified port
		}

		// Stop the server
		this.stop = function(exitCode) {

		}

		// Get a Client ref by uuid
		this.getClient = function(uuid) {

		}

		// Save a new Client
		this.saveClient = function(client) {
			
		}

		// Drop a client on connection end
		this.dropClient = function(uuid) {

		}

		// Send rendered frames to all client
		this.sendFrames = function() {

		}

		this.sendMessage = function(serverMessage) {

		}

		this.parseMessage = function(messageBuffer) {

		}
	}
}

module.exports = TcpServer;