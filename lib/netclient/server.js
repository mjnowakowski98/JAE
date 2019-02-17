const http = require("http");
const Client = require("./client.js");

const { magicSocketString } = require("../../config.js").settings.app.server;
const crypto = require("crypto");

class Server {
    constructor() {
        let clients = new Array(); // List of active client connections
        this.getClient = function(socket) {
            let client = null;
            let ndx = clients.length;
            while(--ndx >= 0 && clients[ndx].getSocket() != socket) continue;
            return client;
        }

        // Create a new client session
        this.createClient = function(socket) {
            let client = new Client(socket);
            clients.push(client);
            return client;
        }

        this.dropClient = function(socket) {
            let client = getClient(socket);
            if(client) {
                let ndx = clients.indexOf(client);
                clients.splice(ndx, 1);
            }
        }

        // Create a websocket frame to send to clients
        this.encodeFrame = function(json) {
            let byteNdx = 0;
            let szPayload = Buffer.byteLength(json);
            let szPayloadLength = (szPayload < 126) ? 0 : ((szPayload == 126) ? 2 : 8);
            console.log(szPayloadLength);

            let frame = Buffer.alloc(2 + szPayloadLength + szPayload);
            frame.writeUInt8(0x81, byteNdx);
            byteNdx++;

            if(szPayloadLength == 2) {
                frame.writeUInt8(126, byteNdx);
                frame.writeUInt16BE(szPayload, ++byteNdx);
            } else if (szPayloadLength == 8) {
                console.error("No");
                return null;
            } else frame.writeUInt8(szPayload, byteNdx);
            byteNdx++;

            frame.write(json, byteNdx);
            return frame;
        }

        // Get payload data from client frames
        this.decodeFrame = function(buffer) {
            let byteNdx = 0;
            let readBytes = buffer.readUInt8(byteNdx);
            let isFinal = Boolean(readBytes >>> 7);
            let reservedIsZero = Boolean(!(readBytes & 0x70));
            let opcode = readBytes & 0x0F;
            byteNdx++;

            readBytes = buffer.readUInt8(byteNdx);
            let isMasked = Boolean(readBytes >>> 7);
            let payloadLength = readBytes & 0x7f; 
            byteNdx++;
            
            if(payloadLength == 126) {
                payloadLength = buffer.readUInt16BE(byteNdx);
                byteNdx += 2;
            } else if (payloadLength == 127) {
                console.error("No");
                return null;
            }

            let maskingKey = new Array();
            if(isMasked) {
                for(let i = 0; i < 4; i++, byteNdx++)
                    maskingKey.push(buffer.readUInt8(byteNdx))
            }

            let payload = "";
            for(let i = 0; i < payloadLength; i++) {
                let nextPayloadByte = buffer.readUInt8(byteNdx + i);
                if (isMasked) {
                    let j = i % 4;
                    nextPayloadByte = nextPayloadByte ^ maskingKey[j];
                }
                payload += String.fromCharCode(nextPayloadByte);
            }
            return payload;
        }

        // Start the web/application server
        this.startServer = function(listenPort) {
            // Http.createServer + onRequest callback
            http.createServer((req, res) => {
                res.setHeader("Access-Control-Allow-Origin", "*"); // Always allow cross-origin requests
                switch(req.method) {
                    case "OPTIONS": // Respond to Pre-flight requests
                        res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-JAE-Session-Key"); // Allow headers
                        res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS"); // Allow methods
                        res.statusCode = 200; // OK
                        res.end();
                        break;
                        
                    default: // Unsupported request methods
                        res.statusCode = 405; // Method Not Allowed
                        res.end();
                        break;
                }
            }).on('upgrade', (req, socket) => {               
                // Create Socket-Accept header value from request key
                let socketKey = req.headers["sec-websocket-key"];
                let socketAccept = socketKey + magicSocketString;
                let shaSum = crypto.createHash('sha1');
                shaSum.update(socketAccept, 'binary');
                socketAccept = shaSum.digest('base64');

                this.createClient(socket);

                let responseHeader = "HTTP/1.1 101 Switching Protocols\r\n";
                responseHeader += "Upgrade: websocket\r\n";
                responseHeader += "Connection: upgrade\r\n";
                responseHeader += `Sec-WebSocket-Accept: ${socketAccept}\r\n`;
                responseHeader += "Sec-WebSocket-Protocol: json\r\n\r\n";
                socket.write(responseHeader);

                socket.on('data', (buffer) => {
                    let frameData = this.decodeFrame(buffer);
                    console.log(frameData);
                    socket.write(this.encodeFrame(`{"test":12}`));
                });
            }).listen(listenPort, () => console.log(`HTTP server listening on ${listenPort}`));
        }
    }
}

module.exports = Server;

/* Incoming Messages {
    +action : String // Unused for now
    +commandDescriptor : CommandDescriptor (Client formatted)
} */