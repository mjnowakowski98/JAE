const { Renderer } = require("../engine/module.js");
const { CommandHandler } = require("../enginecommand/module.js");
const { createCanvas } = require("canvas");

class Client {
    constructor(_socket, _socketKey) {
        // Rendering engine instance
        let canvas = createCanvas(800, 600); // Internal node-canvas
        let renderer = new Renderer(canvas.getContext('2d')); // engine instance
        this.getRenderer = () => renderer;

        let socket = _socket;
        this.getSocket = () => socket;

        let socketKey = _socketKey;
        this.getSocketKey = () => socketKey;

        // Client/rendering engine bridge
        let commandHandler = new CommandHandler();
        this.getCommandHandler = () => commandHandler;

        // Key used to get the animation root object
		let animationKey = renderer.getAnimation().getKey();
		this.getAnimationKey = () => animationKey;
    }
}

module.exports = Client;