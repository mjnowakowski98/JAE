// Application entry point

global.appConfig = require("./config.js"); // Make appConfig global

// TMP: Start a TcpSever
const TcpServer = require("./lib/server/tcpserver.js");
let s = new TcpServer();
s.start(54321);