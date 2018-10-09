const { settings, env} = require('./config.js');
const TCPServer = require('./lib/server/tcpserver.js');

let s = new TCPServer();

function closeHandler() {
	console.log("Send amberlamps... D:");
	s.stopServer();
	process.exit();
}
process.on('SIGHUP', closeHandler);
process.on('SIGINT', closeHandler);
process.on('SIGTERM', closeHandler);

s.startServer(settings.app.port);
