const http = require("http");
const Client = require("./client.js");
const crypto = require("crypto");

const { magicSocketString } = require("../../config.js").settings.app.server;
const WebSocketFrame = require("./websocketframe.js");
const ServerMessage = require("./servermessage.js");

class Server {
    constructor() {
        let clients = new Array(); // List of active client connections
        this.getClient = function (socket) {
            let client = null;
            let ndx = clients.length;
            while (--ndx >= 0 && clients[ndx].getSocket() != socket) continue;
            if (ndx >= 0) client = clients[ndx];
            return client;
        }

        // Create a new client session
        this.createClient = function (socket) {
            let client = new Client(socket);
            clients.push(client);
            return client;
        }

        this.dropClient = function (socket) {
            let client = this.getClient(socket);
            if (client) {
                let ndx = clients.indexOf(client);
                clients.splice(ndx, 1);
            }
        }

        // Create a data buffer to send clients from a WebSocketFrame
        this.encodeFrame = function (frame) {
            let szBuffer = 2; // Byte size of the buffer, WebSocket frames always have a 2-byte header
            let payloadLength = frame.getPayloadLength(); // Payload length value to be embedded
            let szPayloadLength = (payloadLength < 256) ? 0 : ((payloadLength < 65536) ? 2 : 8); // Bytes needed to store the length
            szBuffer += (szPayloadLength + payloadLength); // Add length storage and length to buffer byte size
            let buffer = Buffer.alloc(szBuffer); // Allocate a new buffer

            // Byte 0 (opcode/final)
            let byteNdx = 0; // Byte offset to write
            let opcode = frame.getOpcode(); // Get the opcode
            let headerByte = !frame.getIsFinal() ? opcode : opcode + 128; // Create byte value
            buffer.writeUInt8(headerByte, byteNdx++); // Write the byte

            // Byte 1 [+ 2-8]
            if (szPayloadLength == 2) {
                // 2-Byte length
                buffer.writeUIntBE(126, byteNdx++, 1);
                buffer.writeUInt16BE(payloadLength, byteNdx);
                byteNdx += 2;
            } else if (szPayloadLength == 8) {
                // 8-Byte length (NYI)
                console.error("No");
                return null;
            } else buffer.writeUInt8(payloadLength, byteNdx++);

            buffer.write(frame.getPayload(), byteNdx); // Write the payload
            return buffer;
        }

        // Create new WebSocketFrame from client data buffer
        this.decodeFrame = function (buffer) {
            let byteNdx = 0; // Byte offset to read
            let readBytes = buffer.readUInt8(byteNdx); // Read a byte at byteNdx

            // Byte 0
            let isFinal = Boolean(readBytes >>> 7); // FIN flag - bit 0
            let opcode = readBytes & 0x0F; // Opcode - LO half

            // Byte 1
            readBytes = buffer.readUInt8(++byteNdx); // Read next byte
            let isMasked = Boolean(readBytes >>> 7); // MASK flag - bit 0, drop connection if false (NYI)
            let payloadLength = readBytes & 0x7f;  // Regular payload length - bits 1-7
            byteNdx++; // Next instructions might increment more than 1

            // If payload length is bigger than 7 bits can store
            if (payloadLength == 126) {
                // 2-Byte length
                payloadLength = buffer.readUInt16BE(byteNdx); // Read
                byteNdx += 2; // Account for reading 2 bytes
            } else if (payloadLength == 127) {
                // 8-Byte length, unlikely to occur in a single frame
                // Still needs to be implemented soon (tm)
                console.error("No");
                return null;
            }

            // Split masking key into easier offsets
            let maskingKey = new Array();
            for (let i = 0; i < 4; i++)
                maskingKey.push(buffer.readUInt8(byteNdx++))

            // Masking algorithm: *[oct-payload-i] XOR *[oct-mask-j] | WHERE oct-mask-j = i % 4;
            // https://tools.ietf.org/html/rfc6455#section-5.3
            let payload = "";
            for (let i = 0, j = i % 4; i < payloadLength; i++ , j = i % 4) {
                let nextPayloadByte = buffer.readUInt8(byteNdx + i); // Read a payload byte
                nextPayloadByte = nextPayloadByte ^ maskingKey[j]; // Translate byte
                payload += String.fromCharCode(nextPayloadByte); // Add to payload string
            }

            return new WebSocketFrame(isFinal, opcode, payloadLength, payload); // Return the split Frame
        }

        // Start the web/application server
        this.startServer = function (listenPort) {
            // Http.createServer + onRequest callback
            http.createServer((req, res) => {
                res.setHeader("Access-Control-Allow-Origin", "*"); // Always allow cross-origin requests
                switch (req.method) {
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
                console.log(`Upgrade requested from: ${socket.remoteAddress}`);

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
                let initResponse = JSON.stringify(new ServerMessage("newConnection", null, { animationKey: client.getAnimationKey() }));
                socket.write(this.encodeFrame(new WebSocketFrame(1, 0x01, Buffer.byteLength(initResponse), initResponse)));

                // Decode and interpret client data
                socket.on('data', (buffer) => {
                    let frame = this.decodeFrame(buffer);
                    switch (frame.getOpcode()) {
                        case 0x00: // Continuation
                            // NYI
                            break;

                        case 0x01: // Text
                            let commandDescriptor = JSON.parse(frame.getPayload());
                            let client = this.getClient(socket);
                            let engineResponse = JSON.stringify(client.executeCommand(commandDescriptor));
                            let responseBuffer = this.encodeFrame(new WebSocketFrame(1, 0x01, Buffer.byteLength(engineResponse), engineResponse));
                            socket.write(responseBuffer);
                            break;

                        case 0x02: // Binary
                            // NYI, not supported
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
                }).on('close', () => {
                    console.log(`Socket to ${socket.remoteAddress} dropped`);
                    this.dropClient(socket)
                }).on('error', (err) => {
                    console.log(err);
                    this.dropClient(socket);
                });
            }).listen(listenPort, () => console.log(`HTTP server listening on ${listenPort}`));
        }

        // Iterate through clients and render a frame at every immediate
        // Send image data to client
        this.render = function() {
            for(let i = clients.length - 1; i >= 0; i--) {
                let canvasBuffer = clients[i].getRenderer().render();
                let message = JSON.stringify(new ServerMessage("render", null, { frameData:canvasBuffer }));
                let messageBuffer = this.encodeFrame(new WebSocketFrame(1, 0x01, Buffer.byteLength(message), message));
                clients[i].getSocket().write(messageBuffer);
            }
            setImmediate(() => this.render());
        }
        setImmediate(() => this.render());
    }
}

module.exports = Server;