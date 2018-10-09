const net = require('net');
const ClientContainer = require('./clientcontainer.js');

class TCPServer {
	constructor() {
		let clients = new Array();

		let listening = false;
		this.isListening = function() { return listening; }

		let getClientIndexBySocket = function(socket) {
			let ndx = clients.length;
			while(--ndx > -1)
				if(clients[ndx].getClientId() === socket) break;
			return ndx;
		}

		let server = net.createServer();
		server.on('connection', (socket) => {
			console.log("New connection from: " + socket.remoteAddress + ":" + socket.remotePort);

			clients.push(new ClientContainer(socket));
			socket.on('end', () => { clients.splice(getClientIndexBySocket(socket), 1); });

			socket.on('error', (err) => {
				console.error(err);
				let clientNdx = getClientIndexBySocket(socket);
				if(clientNdx >= 0) clients.splice(clientNdx, 1);
			});

			socket.on('data', (chunk) => {
				chunk = chunk.toString();
				let client = clients[getClientIndexBySocket(socket)];
				let response = "";
				switch(chunk) {
					case "startCommand":
						client.startCommandBuild();
						break;
					case "executeCommand":
						response = client.endCommandBuild();
						break;
					default:
						client.addCommandObjChunk(chunk);
						break;
				}
				socket.write(response);
			});
		});

		this.startServer = function(port) {
			server.listen(port, () => {
				console.log("Server listening on: " + server.address().port);
				listening = true;
			});
		}
		this.stopServer = function() {
			if(listening) {
				server.close();
				for(let i = 0; i < clients.length; i++)
					clients[i].getClientId().end("INFO: Server is stopping.\nHave a nice day :D");
			}
		}
	}
}

module.exports = TCPServer;