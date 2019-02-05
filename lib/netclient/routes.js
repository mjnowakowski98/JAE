class Routes {
    constructor(server) {
        // Tell requester their session doesn't exist
        let respondBadKey = function(res) {
            res.statusCode = 400; // Bad Request
            res.setHeader("Content-Type", "text/plain");
            res.write("SessionKey is invalid");
        }

        // Pass CommandResponse data back to client
        let respondCommandResponse = function(res, commandResponse) {
            let headers = commandResponse.getHeaders();
            if(headers) {
                for(let i = 0; i < headers.length; i++) // Iterate and set headers
                    res.setHeader(headers[i].header, headers[i].headerValue);
            }

            res.statusCode = commandResponse.getStatusCode(); // Apply status code
            let body = commandResponse.getBody();
            if (body) res.write(body); // Write response body
        }

        // Handle requests that get information from the server
        this.handleGet = function(req, res) {
            // Get sessionKey from header if set
            let sessionKey = (req.headers["x-jae-session-key"]) ? req.headers["x-jae-session-key"] : null;

            // Respond based on requested url
            switch(req.url) {
                case "/startsession": // Create a new client session
                    let sessionInfo = server.createClient(); // Create a new client

                    // Set reponse headers
                    res.setHeader("X-JAE-Session-Key", sessionInfo.getSessionKey());
                    res.setHeader("Content-Type", "application/json");
                    res.statusCode = 200; // OK

                    // Write response body
                    res.write(JSON.stringify({
                        sessionKey:sessionInfo.getSessionKey(),
                        animationKey:sessionInfo.getAnimationKey()
                    }));
                    res.end();
                    break;

                case "/endsession": // Expire a client session
                    if(server.expireClient(sessionKey)) res.statusCode = 200;
                    else respondBadKey(res); // Supplied key was invalid
                    res.end();

                default: // Invalid Url
                    res.statusCode = 400; // Bad Request
                    res.end();
                    break;
            }
        }

        // Handle requests to change engine states
        this.handlePost = function(req, res) {
            // Get sessionKey from header if set
            let sessionKey = (req.headers["x-jae-session-key"]) ? req.headers["x-jae-session-key"] : null;

            switch(req.url) {
                case "/executecommand": // Execute an engine command
                    let commandDescriptor = ""; // Request body
                    req.on('data', (chunk) => commandDescriptor += chunk)
                    .on('end', () => {
                        // Send to client engine to process
                        let commandResponse = server.executeCommand(sessionKey, JSON.parse(commandDescriptor));
                        if(commandResponse) respondCommandResponse(res, commandResponse);
                        else respondBadKey(res); // Invalid key if response is null
                        res.end();
                    });
                    break;

                default: // Invalid Url
                    res.statusCode = 400; // Bad request
                    res.end();
                    break;
            }
        }
    }
}

module.exports = Routes;