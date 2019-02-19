const { Renderer } = require("../engine/module.js");
const { CommandHandler } = require("../enginecommand/module.js");
const { createCanvas } = require("canvas");

class Client {
    constructor(_socket) {
        let canvas = createCanvas(800, 600); // Internal node-canvas
        this.getCanvas = () => canvas;

        // Rendering engine instance
        let renderer = new Renderer(this); // engine instance
        this.getRenderer = () => renderer;

        // Socket
        let socket = _socket;
        this.getSocket = () => socket;

        // Client/rendering engine bridge
        let commandHandler = new CommandHandler();
        this.getCommandHandler = () => commandHandler;

        // Key used to get the animation root object
		let animationKey = renderer.getAnimation().getKey();
        this.getAnimationKey = () => animationKey;
        
        this.excuteCommand = function(commandDescriptor) {
            let objMan = renderer.getAnimation().getObjectManager();
            commandDescriptor.objMan = objMan;
            return commandHandler.executeCommand(commandDescriptor);
        }
    }
}

module.exports = Client;