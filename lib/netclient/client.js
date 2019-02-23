const { Renderer } = require("../engine/module.js");
const { NoCommand, AnimCommandHandler } = require("../command/module.js");
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
        let animCommandHandler = new AnimCommandHandler(renderer.getAnimation().getObjectManager());
        this.getCommandHandler = () => animCommandHandler;

        // Key used to get the animation root object
		let animationKey = renderer.getAnimation().getKey();
        this.getAnimationKey = () => animationKey;
        
        this.excuteCommand = function(commandDescriptor) {
            let commandResponse = new NoCommand(commandDescriptor.commandName).excuteCommand()
            switch(commandDescriptor.commandType) {
                case "animation":
                    commandResponse = animCommandHandler.executeCommand(commandDescriptor);
                    break;

                default:
                    break;
            }
            return commandResponse;
        }
    }
}

module.exports = Client;