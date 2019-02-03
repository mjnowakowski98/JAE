// Temporary test driver for engine

const { settings } = require("./config.js");
const { Server } = require("./lib/netclient/module.js");

let s = new Server();
s.startServer(settings.app.server.httpPort, settings.app.server.commandInterval);