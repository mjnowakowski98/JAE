class Routes {
    constructor(server) {
        console.log(server);

        this.handleGet = function(req, res) {
            switch(req.url) {
                case "/startsession":
                    let sessionInfo = server.createClient();
                    res.setHeader("X-JAE-Session-Key", sessionInfo.getSessionKey());
                    res.setHeader("Content-Type", "application/json");
                    res.statusCode = 200;
                    res.write(JSON.stringify({
                        sessionKey:sessionInfo.getSessionKey(),
                        animationKey:sessionInfo.getAnimationKey()
                    }));
                    res.end();
                    break;
                case "/endsession":
                    server.expireClient(req.headers["x-jae-session-key"]);
                default:
                    res.statusCode = 400;
                    res.end();
                    break;
            }
        }

        this.handlePost = function(req, res) {
            switch(req.url) {
                default:
                    res.statusCode = 400;
                    res.end();
                    break;
            }
        }
    }
}

module.exports = Routes;