const CommandResponse = require("./commandresponse.js");
const CreateLayerCommand = require("./createlayercommand.js");
const CreateFrameCommand = require("./createframecommand.js");
const CreatePathCommand = require("./createframecommand.js");
const CreateSceneObjectCommand = require("./createsceneobjectcommand.js");

class CommandHandler {
    constructor() {
        this.executeCommand = function(commandDescriptor) {
            let responseHeaders = null;
            let responseData = null;

            switch(commandDescriptor.commandName) {
                default:
                    break;
            }
        }

        this.undoLastCommand = function() {
            
        }
    }
}

module.exports = CommandHandler;