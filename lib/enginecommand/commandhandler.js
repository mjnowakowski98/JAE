const CreateLayerCommand = require("./createlayercommand.js");
const CreateFrameCommand = require("./createframecommand.js");
const CreatePathCommand = require("./createframecommand.js");
const CreateSceneObjectCommand = require("./createsceneobjectcommand.js");

class CommandHandler {
    constructor() {
        let queue = new Array();
        let responseQueue = new Array();
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
            if(queue.length <= 0) return null;
            let toExec = queue.shift();
            toExec.execute();
            responseQueue.push(toExec);
            return toExec.returnData;
        }

        this.respondNext = function(res, responseData) {
            if(responseQueue.length <= 0) return;
            res.write(JSON.parse(`\`"response:${responseData}"`));
            res.status = 200;
            res.end();
        }

        this.undoLastCommand = function() {
            let toUndo = responseQueue.pop();
            toUndo.undo();
        }
    }
}

module.exports = CommandHandler;