const http = require("http");
const Routes = require("./routes.js");
const Client = require("./client.js")

class Server {
    constructor() {
        let clients = new Array();

        let server = null;
        this.startServer = function(listenPort) {
            let router = new Routes(this);

            server = http.createServer((req, res) => {
                res.setHeader("Access-Control-Allow-Origin", "*");
                switch(req.method) {
                    case "GET":
                        router.handleGet(req, res);
                        break;
                    case "POST":
                        router.handlePost(req, res);
                        break;
                    case "OPTIONS":
                        res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-JAE-Session-Key");
                        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
                        res.statusCode = 200;
                        res.end();
                        break;
                    default:
                        res.statusCode = 405;
                        res.end();
                        break;
                }
            });
    
            server.listen(listenPort, () => {
                console.log(`Rendering server listening on ${listenPort}`);
            });
        }

        this.createClient = function() {
            let client = new Client();
            clients.push(client);
            return client.getSessionInfo();
        }
    }
}

module.exports = Server;