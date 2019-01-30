class Routes {
    constructor(server) {
        console.log(server);

        this.handleGet = function(req, res, cookies) {
            switch(req.url) {
                case "/startsession":
                    server.createClient(res, cookies);
                    break;
                case "/endsession":
                    server.expireClient(cookies.get("sessionKey"));
            }
        }

        this.handlePost = function(req, res, sessionKey) {
            switch(req.url) {
                case "/startsession":
                    server.createClient(res);
                    break;
                case "/endsession":
                    server.expireClient(sessionKey);
                    break;
                case "/queuecommand":
                    let tmp = "";
                    let commandDesc = null;
                    req.on('data', (chunk) => { tmp += chunk; })
                    .on('end', () => {
                        commandDesc = JSON.parse(tmp);
                        server.queueCommand(sessionKey, commandDesc);
                    });
                    res.status = 200;
                    break;
                default:
                    break;
            }
        }
    }
}

module.exports = Routes;