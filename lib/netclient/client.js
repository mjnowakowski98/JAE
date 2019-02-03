const SessionInfo = require("./sessioninfo.js");

const { Renderer } = require("../engine/module.js");
const { CommandHandler } = require("../enginecommand/module.js");
const { createCanvas } = require("canvas");

class Client {
    constructor() {
        // Rendering engine instance
        let canvas = createCanvas(800, 600); // Internal node-canvas
        let renderer = new Renderer(canvas.getContext('2d')); // engine instance
        this.getRenderer = function() { return renderer; }

        // Client/rendering engine bridge
        let commandHandler = new CommandHandler();
        this.getCommandHandler = function() { return commandHandler; }

        // Information about the client session
        let sessionInfo = new SessionInfo(renderer.getAnimation().getKey());
        this.getSessionInfo = function() { return sessionInfo; }
    }
}

module.exports = Client;