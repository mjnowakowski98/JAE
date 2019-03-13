const NoCommand = require("../nocommand.js");
const SaveAnimationCommand = require("./saveanimationcommand.js");
const CreateLayerCommand = require("./createlayercommand.js");
const SetLayerNameCommand = require("./setlayernamecommand.js");
const CreateFrameCommand = require("./createframecommand.js");
const CreatePathCommand = require("./createpathcommand.js");
const SetPathNameCommand = require("./setpathnamecommand.js");
const CreateSceneObjectCommand = require("./createsceneobjectcommand.js");
const SetSceneObjectPathCommand = require("./setsceneobjectpathcommand.js");
const SetSceneObjectPositionCommand = require("./setsceneobjectpositioncommand.js");
const DeleteAnimationObjectCommand = require("./deleteanimationobjectcommand.js");
const GetChildAnimationObjectsCommand = require("./getchildanimobjectscommand");

const AnimationObjectManager = require("../../engine/animationobjectmanager.js");

class AnimCommandHandler {
    constructor(animation) {
        let objMan = new AnimationObjectManager(animation);
        this.getObjMan = () => objMan;

        let previousCommands = new Array(); // List of commands previously executed

        // Execute a recieved command
        this.executeCommand = function(commandDescriptor) {
            let constructorArgs = commandDescriptor.constructorArgs;

            let command = new NoCommand(commandDescriptor.commandName);
            let commandMatched = true;

            // Create new Command Object via descriptor name
            switch(commandDescriptor.commandName) {
                case "saveAnimation":
                    command = new SaveAnimationCommand(this, null);
                    break;

                case "createLayer":
                    command = new CreateLayerCommand(this, constructorArgs);
                    break;

                case "setLayerName":
                    command = new SetLayerNameCommand(this, constructorArgs);
                    break;

                case "createFrame":
                    command = new CreateFrameCommand(this, constructorArgs);
                    break;

                case "createSceneObject":
                    command = new CreateSceneObjectCommand(this, constructorArgs);
                    break;

                case "setSceneObjectPath":
                    command = new SetSceneObjectPathCommand(this, constructorArgs);
                    break;

                case "setSceneObjectPosition":
                    command = new SetSceneObjectPositionCommand(this, constructorArgs);
                    break;

                case "createPath":
                    command = new CreatePathCommand(this, constructorArgs);
                    break;

                case "setPathName":
                    command = new SetPathNameCommand(this, constructorArgs);
                    break;

                case "deleteAnimationObject":
                    command = new DeleteAnimationObjectCommand(this, constructorArgs);
                    break;

                case "getChildAnimationObjects":
                    command = new GetChildAnimationObjectsCommand(this, constructorArgs);
                    commandMatched = false;
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