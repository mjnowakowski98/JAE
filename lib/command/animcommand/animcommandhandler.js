const NoCommand = require("../nocommand.js");
const CreateLayerCommand = require("./createlayercommand.js");
const CreateFrameCommand = require("./createframecommand.js");
const CreatePathCommand = require("./createframecommand.js");
const CreateSceneObjectCommand = require("./createsceneobjectcommand.js");
const DeleteAnimationObjectCommand = require("./deleteanimationobjectcommand");

class AnimCommandHandler {
    constructor() {
        let previousCommands = new Array(); // List of commands previously executed

        // Execute a recieved command
        this.executeCommand = function(commandDescriptor) {
            let constructorArgs = commandDescriptor.constructorArgs;

            let command = new NoCommand(commandDescriptor.commandName);
            let commandMatched = true;

            // Create new Command Object via descriptor name
            switch(commandDescriptor.commandName) {
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
                    command = new CreatePathCommand(constructorArgs.layerKey, constructorArgs.frameNdx);
                    break;

                case "deleteAnimationObject":
                    command = new DeleteAnimationObjectCommand(constructorArgs.key);
                    break;

                default:
                    commandMatched = false;
                    break;
            }

            if(commandMatched) previousCommands.push(command); // Can't undo what wasn't executed
            return command.execute(); // Execute and return engine response
        }

        this.undoLastCommand = function() {
            let tmpCommand = previousCommands.pop(); // Pop last executed command
            return tmpCommand.undo(); // Undo and return engine response
        }
    }
}

module.exports = AnimCommandHandler;