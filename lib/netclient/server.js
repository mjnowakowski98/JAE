const http = require("http");
const Client = require("./client.js");
const crypto = require("crypto");

const { magicSocketString } = require("../../config.js").settings.app.server;
const WebSocketFrame = require("./websocketframe.js");
const { ResponseObject } = require("../enginecommand/module.js");

class Server {
    constructor() {
        let clients = new Array(); // List of active client connections
        this.getClient = function(socket) {
            let client = null;
            let ndx = clients.length;
            while(--ndx >= 0 && clients[ndx].getSocket() != socket) continue;
            if(ndx >= 0) client = clients[ndx];
            return client;
        }

        // Create a new client session
        this.createClient = function(socket) {
            let client = new Client(socket);
            clients.push(client);
            return client;
        }

        this.dropClient = function(socket) {
            let client = this.getClient(socket);
            if(client) {
                let ndx = clients.indexOf(client);
                clients.splice(ndx, 1);
            }
        }

        // Create a data buffer to send clients from a WebSocketFrame
        this.encodeFrame = function(frame) {
            let szBuffer = 2;
            let payloadLength = frame.getPayloadLength();
            let szPayloadLength = (payloadLength < 126) ? 0 : ((payloadLength == 126) ? 2 : 8);
            szBuffer += (szPayloadLength + payloadLength);
            let buffer = Buffer.alloc(szBuffer);

            let byteNdx = 0;
            let opcode = frame.getOpcode();
            let headerByte = !frame.getIsFinal() ? opcode : opcode + 128;
            buffer.writeUInt8(headerByte, byteNdx++);

            if(szPayloadLength == 2) {
                buffer.writeUInt8(126, byteNdx++);
                buffer.writeUInt16BE(payloadLength, byteNdx++);
            } else if (szPayloadLength == 8) {
                console.error("No");
                return null;
            } else buffer.writeUInt8(payloadLength, byteNdx++);
            buffer.write(frame.getPayload(), byteNdx);

            return buffer;
        }

        // Create new WebSocketFrame from client data buffer
        this.decodeFrame = function(buffer) {
            let byteNdx = 0;
            let readBytes = buffer.readUInt8(byteNdx);
            let isFinal = Boolean(readBytes >>> 7);
            let opcode = readBytes & 0x0F;

            readBytes = buffer.readUInt8(++byteNdx);
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
            for(let i = 0; i < 4; i++, byteNdx++)
                 maskingKey.push(buffer.readUInt8(byteNdx))

            let payload = "";
            for(let i = 0, j = i % 4; i < payloadLength; i++, j = i % 4) {
                let nextPayloadByte = buffer.readUInt8(byteNdx + i);
                nextPayloadByte = nextPayloadByte ^ maskingKey[j];
                payload += String.fromCharCode(nextPayloadByte);
            }

            return new WebSocketFrame(isFinal, opcode, payloadLength, payload);
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
                let client = this.createClient(socket);

                // Send Http response using new WebSocket
                let upgradeResponse = "HTTP/1.1 101 Switching Protocols\r\n";
                upgradeResponse += "Upgrade: websocket\r\n";
                upgradeResponse += "Connection: upgrade\r\n";
                upgradeResponse += `Sec-WebSocket-Accept: ${socketAccept}\r\n`;
                upgradeResponse += "Sec-WebSocket-Protocol: json\r\n\r\n";
                socket.write(upgradeResponse); // Send response

                // Give client a greeting and the Animation Key
                let initResponse = JSON.stringify(new ResponseObject("Connected", null, { animationKey:client.getAnimationKey() }));
                socket.write(this.encodeFrame(new WebSocketFrame(1, 0x01, Buffer.byteLength(initResponse), initResponse)));

                // Decode and interpret client data
                socket.on('data', (buffer) => {
                    let frame = this.decodeFrame(buffer);
                    switch(frame.getOpcode()) {
                        case 0x00: // Continuation
                            // NYI
                            break;

                        case 0x01: // Text
                            let commandDescriptor = JSON.parse(frame.getPayload());
                            let commandHandler = this.getClient(socket).getCommandHandler();
                            let engineResponse = JSON.stringify(commandHandler.executeCommand(commandDescriptor));
                            let responseBuffer = this.encodeFrame(new WebSocketFrame(1, 0x01, Buffer.byteLength(engineResponse), engineResponse));
                            socket.write(responseBuffer);
                            break;

                        case 0x02: // Binary
                            // NYI
                            break;

                        case 0x08: // Closing
                            this.dropClient(socket);
                            break;

                        case 0x09: // Ping
                            // NYI
                            break;
                        
                        case 0x0a: // Pong
                            // NYI
                            break;

                        default:
                            // NYI
                            break;
                    }
                });
            }).listen(listenPort, () => console.log(`HTTP server listening on ${listenPort}`));
        }
    }
}

module.exports = Server;