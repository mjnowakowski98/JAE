const http = require("http");
const Routes = require("./routes.js");
const Client = require("./client.js")

class Server {
    constructor() {
        let clients = new Array(); // List of active client connections
        let server = null; // Node Http.Server

        // Start the webserver
        this.startServer = function(listenPort) {
            let router = new Routes(this); // Defines routes used to handle client requests

            // Http.createServer + onRequest callback
            server = http.createServer((req, res) => {
                res.setHeader("Access-Control-Allow-Origin", "*"); // Always allow cross-origin requests
                switch(req.method) {
                    case "GET": // Respond to GET requests
                        router.handleGet(req, res);
                        break;

                    case "POST": // Respond to POST requests
                        router.handlePost(req, res);
                        break;

                    case "OPTIONS": // Respond to Pre-fligh requests
                        res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-JAE-Session-Key"); // Allow headers
                        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // Allow methods
                        res.statusCode = 200; // OK
                        res.end();
                        break;
                        
                    default: // Unsupported request methods
                        res.statusCode = 405; // Method Not Allowed
                        res.end();
                        break;
                }
            });
    
            // Open server to incoming requests
            server.listen(listenPort, () => {
                console.log(`Rendering server listening on ${listenPort}`);
            });
        }

        // Get client array index by key
        this.getClientNdx = function(sessionKey) {
            let ndx = clients.length;
            while(--ndx >= 0
                && sessionKey != clients[ndx].getSessionInfo().getSessionKey()) continue;

            return ndx;
        }

        // Get client reference by key
        this.getClient = function(sessionKey) {
            let client = null;
            try { client = clients[this.getClientNdx(sessionKey)]; }
            catch (error) { console.log(error); }
            finally { return client; };
        }

        // Create a new client session
        this.createClient = function() {
            let client = new Client();
            clients.push(client);
            return client.getSessionInfo();
        }

        // End a client session before its expiration
        this.expireClient = function(sessionKey) {
            let success = false;
            let clientNdx = this.getClientNdx(sessionKey);
            if(clientNdx >= 0) {
                clients.splice(clientNdx, 1);
                success = true;
            }
            return success;
        }
    }
}

module.exports = Server;