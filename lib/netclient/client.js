const Util = require("../util.js");
const { Renderer } = require("../engine/module.js");
const { CommandHandler } = require("../enginecommand/module.js");
const { createCanvas } = require("canvas");

class Client {
    constructor() {
        let sessionKey = Util.generateKey();
        this.getSessionKey = function() { return sessionKey; }

        let sessionExpires = new Date();
        sessionExpires.setDate(sessionExpires.getDate() + 1);

        this.getSessionExpires = function() { return sessionExpires; }

        let canvas = createCanvas(800, 600);
        let renderer = new Renderer(canvas.getContext('2d'));
        this.getRenderer = function() { return renderer; }

        let commandHandler = new CommandHandler();
        this.getCommandHandler = function() { return commandHandler; }
    }
}

module.exports = Client;