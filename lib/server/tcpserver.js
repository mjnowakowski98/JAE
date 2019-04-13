// TcpServer

const Net = require("net");

const Server = require("./server.js");
const TcpClient = require("./tcpclient.js");
const ExitCodes = require("./exitcodes.js");

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
				this.saveClient(new TcpClient(socket)); // Save Client
				console.log(`New connection: ${socket.remoteAddress}:${socket.remotePort}`);

				// Socket event listeners
				socket.on("data", (chunk) => { // STUB
					// On Data Buffer read
					//socket.write(chunk);
				}).on("close", (hadError) => {
					// On connection close
					this.dropClient(this.getClientUuidBySocket(socket));
				}).on("error", (err) => console.error(err)); // On error	
			});

			server.listen(listenPort, () => console.log("Tcp Server listening on: " + listenPort)); // Listen on specified port
			server.on("close", () => {
				// On server close (all connections ended)
				console.log("Tcp Server closed");
				server = null;
			}).on("error", (err) => {
				// On error
				console.error(err);
				this.stop(ExitCodes.EXIT_GENERICERROR);
			});
		}

		// Stop the server
		this.stop = function(exitCode) {
			switch(exitCode) {
				default:
					break;
			}
			console.log("Tcp Server closing...");
			server.close();
			for(let i = 0; i < clients.length; i++)
				clients[i].getSocket().end();
		}

		// Get a Client ref by uuid
		this.getClient = function(uuid) {
			let client = null;
			let ndx = clients.length;
			while(--ndx >= 0 && clients[ndx].getUuid() !== uuid) continue;
			if(ndx >= 0) client = clients[ndx];
			//else continue; // TODO: Throw exception here
			return client;
		}

		// Get a Cleint ref by Net.Socket
		this.getClientUuidBySocket = function(socket) {
			let clientUuid = null;
			let ndx = clients.length;
			while(--ndx >= 0 && clients[ndx].getSocket() !== socket) continue;
			if(ndx >= 0 ) clientUuid = clients[ndx].getUuid();
			//else continue; // TODO: Throw expection here
			return clientUuid;
		}

		// Save a new Client
		this.saveClient = function(client) { clients.push(client); }

		// Drop a client on connection end
		this.dropClient = function(uuid) {
			let client = this.getClient(uuid);
			clients.splice(clients.indexOf(client), 1);
			console.log(`Client: ${uuid} disconnected`);
		}

		// Send rendered frames to all client
		this.sendFrames = function() {
			// STUB
		}

		// Send a message to a client
		this.sendMessage = function(serverMessage) {
			// STUB
		}

		// Parse a recieved command
		this.parseMessage = function(messageBuffer) {
			// STUB
		}
	}
}

module.exports = TcpServer;