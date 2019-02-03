const SessionInfo = require("./sessioninfo.js");

const { Renderer } = require("../engine/module.js");
const { CommandHandler } = require("../enginecommand/module.js");
const { createCanvas } = require("canvas");

class Client {
    constructor() {
        let canvas = createCanvas(800, 600);
        let renderer = new Renderer(canvas.getContext('2d'));
        this.getRenderer = function() { return renderer; }

        let commandHandler = new CommandHandler();
        this.getCommandHandler = function() { return commandHandler; }

        let sessionInfo = new SessionInfo(renderer.getAnimation().getKey());
        this.getSessionInfo = function() { return sessionInfo; }
    }
}

module.exports = Client;