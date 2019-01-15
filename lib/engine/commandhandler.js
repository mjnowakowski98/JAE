const CreateLayerCommand = require("./createlayercommand.js");
const CreateFrameCommand = require("./createframecommand.js");
const CreatePathCommand = require("./createframecommand.js");
const CreateSceneObjectCommand = require("./createsceneobjectcommand.js");

class CommandHandler {
    constructor() {
        let queue = new Array();

        this.queueCommand = function(commandDescriptor) {
            queue.push(commandDescriptor);
        }

        this.executeNextCommand = function() {
            let commandDesc = queue.shift();
            let constructorArgs = commandDesc.constructorArgs;
            let command = null;
            switch(commandDesc.commandName) {
                case "createLayer":
                    command = new CreateLayerCommand(constructorArgs.containerKey, constructorArgs.name);
                    break;
                case "createFrame":
                    command = new CreateFrameCommand(constructorArgs.layerKey, constructorArgs.frameNdx);
                    break;
                case "createSceneObject":
                    command = new CreateSceneObjectCommand(constructorArgs.frameKey, constructorArgs.pathKey);
                    break;
                case "createPath":
                    command = new CreatePathCommand(constructorArgs.drawingMethods, constructorArgs.name);
                    break;
                default:
                    break;
            }

            if(command) command.execute();
        }
    }
}

module.exports = CommandHandler;