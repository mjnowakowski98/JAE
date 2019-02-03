const http = require("http");
const Cookies = require("cookies");
const Routes = require("./routes.js");
const Client = require("./client.js")

class Server {
    constructor() {
        let clients = new Array();

        let server = null;
        this.startServer = function(listenPort) {
            let router = new Routes(this);

            server = http.createServer((req, res) => {
                let cookies = new Cookies(req, res);

                

                res.setHeader("Access-Control-Allow-Origin", "*");
                switch(req.method) {
                    case "GET":
                        router.handleGet(req, res, cookies);
                        break;
                    case "POST":
                        let sessionKey = req.headers["x-jae-session-key"];
                        router.handlePost(req, res, sessionKey);
                        break;
                    case "OPTIONS":
                        res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-JAE-Session-Key");
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

        let getClientIndex = function(sessionKey) {
            let ndx = clients.length;
            while(--ndx >= 0 && clients[ndx].getSessionKey() != sessionKey) continue;
            return ndx;
        }

        let getClient = function(sessionKey) {
            let client = null;
            let ndx = getClientIndex(sessionKey);
            if(ndx != -1) client = clients[ndx];
            return client;
        }

        this.createClient = function(res, cookies = null) {
            let client = new Client();
            clients.push(client);
            res.setHeader("Content-Type", "application/json");
            if(cookies) cookies.set("sessionKey", client.getSessionKey());
            res.statusCode = 200;

            let responseObj = {
                sessionKey: client.getSessionKey(),
                animKey: client.getRenderer().getAnimation().getKey()
            }
            res.write(JSON.stringify(responseObj));
            console.log(client.getSessionExpires());
        }

        this.expireClient = function(sessionKey) {
            let ndx = getClientIndex(sessionKey);
            if(ndx != -1) clients.splice(ndx, 1);
        }

        this.queueCommand = function(sessionKey, commandDesc) {
            let client = getClient(sessionKey);
            commandDesc.objMan = client.getRenderer().getAnimation().getObjectManager();
            if(client) client.getCommandHandler().queueCommand(commandDesc);

        }
    }
}

module.exports = Server;