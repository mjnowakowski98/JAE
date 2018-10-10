const { settings, env} = require('./config.js');
const TCPServer = require('./lib/server/tcpserver.js');

let s = new TCPServer();

function closeHandler() {
	console.log("Server ending");
	s.stopServer();
	process.exit();
}
process.on('SIGHUP', closeHandler);
process.on('SIGINT', closeHandler);

s.startServer(settings.app.port);
