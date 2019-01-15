const CreateLayerCommand = require("./createlayercommand.js");
const CreateFrameCommand = require("./createframecommand.js");
const CreatePathCommand = require("./createframecommand.js");
const CreateSceneObjectCommand = require("./createsceneobjectcommand.js");

class CommandHandler {
    constructor() {
        let queue = new Array();
        let executed = new Array();

        this.queueCommand = function(commandDescriptor) {
            let constructorArgs = commandDescriptor.constructorArgs;
            let command = null;
            switch(commandDescriptor.commandName) {
                case "createLayer":
                    command = new CreateLayerCommand(commandDescriptor.objMan, constructorArgs.containerKey, constructorArgs.name);
                    break;
                case "createFrame":
                    command = new CreateFrameCommand(commandDescriptor.objMan, constructorArgs.layerKey, constructorArgs.frameNdx);
                    break;
                case "createSceneObject":
                    command = new CreateSceneObjectCommand(commandDescriptor.objMan, constructorArgs.frameKey, constructorArgs.pathKey);
                    break;
                case "createPath":
                    command = new CreatePathCommand(commandDescriptor.objMan, constructorArgs.drawingMethods, constructorArgs.name);
                    break;
                default:
                    break;
            }

            if(command) queue.push(command);
        }

        this.executeNextCommand = function() {
            let toExec = queue.shift();
            toExec.execute();
            executed.push(toExec);
        }

        this.undoLastCommand = function() {
            let toUndo = executed.pop();
            toUndo.undo();
        }
    }
}

module.exports = CommandHandler;