const Http = require("http");
const { settings } = require("../../config.js");

class Server {
    constructor() {
        let clients = new Array();

        let server = null;
        this.startServer = function() {
            server = Http.createServer((req, res) => {
                res.setHeader("Access-Control-Allow-Origin", "*");

                switch(req.method) {
                    case "GET":
                        res.statusCode = 200;  
                        res.setHeader("Content-Type", "application/json");
                        res.write(JSON.stringify({ test:12 }));
                        break;
                    case "POST":
                        break;
                    case "OPTIONS":
                        res.statusCode = 200;
                        break;
                    default:
                        break;
                }

                res.end();
            });
    
            server.listen(settings.app.server.httpPort, () => {
                console.log(`Rendering server listening on ${settings.app.server.httpPort}`);
            });
        }
    }
}

module.exports = Server;