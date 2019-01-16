const http = require("http");
const Cookies = require("cookies");
const Util = require("../util.js");

class Server {
    constructor() {
        let clients = new Array();

        let server = null;
        this.startServer = function(listenPort) {
            server = http.createServer((req, res) => {
                let cookies = new Cookies(req, res);
                let sessionId = cookies.get("sessionId");
                if(sessionId) console.log(sessionId);
                else (cookies.set("sessionId", Util.generateKey()));

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
    
            server.listen(listenPort, () => {
                console.log(`Rendering server listening on ${listenPort}`);
            });
        }
    }
}

module.exports = Server;