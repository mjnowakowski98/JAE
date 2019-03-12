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
        let animCommandHandler = new AnimCommandHandler(renderer.getAnimation());
        this.getAnimCommandHandler = () => animCommandHandler;

        let engineCommandHandler = new engineCommandHandler(renderer);
        this.getEngineCommandHandler = () => engineCommandHandler;

        this.getAnimationKey = () => renderer.getAnimation().getKey();
        this.getAnimationType = () => renderer.getAnimation().getType();
        
        this.executeCommand = function(commandDescriptor) {
            let tmpCommand = new NoCommand(commandDescriptor.commandName);
            let commandResponse = tmpCommand.execute();
            switch(commandDescriptor.commandType) {
                case "animation":
                    commandResponse = animCommandHandler.executeCommand(commandDescriptor);
                    break;

                case "engine":
                    commandResponse = engineCommandHandler.executeCommand(commandDescriptor);
                    break;

                default:
                    break;
            }
            return commandResponse;
        }
    }
}

module.exports = Client;