const { Renderer } = require("../engine/module.js");
const { AnimCommandHandler } = require("../command/module.js");
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
        let animCommandHandler = new AnimCommandHandler();
        this.getCommandHandler = () => animCommandHandler;

        // Key used to get the animation root object
		let animationKey = renderer.getAnimation().getKey();
        this.getAnimationKey = () => animationKey;
        
        this.executeCommand = function(commandDescriptor) {
            let objMan = renderer.getAnimation().getObjectManager();
            commandDescriptor.objMan = objMan;
            return animCommandHandler.executeCommand(commandDescriptor);
        }
    }
}

module.exports = Client;