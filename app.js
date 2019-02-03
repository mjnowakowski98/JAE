const { settings } = require("./config.js"); // Get settings object from config.js
const Server = require("./lib/netclient/module.js");

let s = new Server(); // Create a new webserver instance
s.startServer(settings.app.server.httpPort); // Start webserver