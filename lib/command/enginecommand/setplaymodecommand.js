const Command = require("../command.js");
const ServerMessage = require("../../netclient/servermessage.js");
const PlayModes = require("../../engine/playmodes.js");

class SetPlayModeCommand extends Command {
    constructor(_handler, constructorArgs) {
        super(_handler);

        let renderer = this.getHandler().getRenderer();
        let oldPlayMode = renderer.getPlayMode();
        let playMode = oldPlayMode;
        switch(constructorArgs.playMode) {
            case "real":
                playMode = PlayModes.REAl;
                break;
            
            case "playback":
                playMode = PlayModes.PLAYBACK;
                break;

            default:
                break;
        }

        // Sets renderer playmode
        this.execute = function() {
            renderer.setPlayMode(playMode);
            return new ServerMessage("information", null, { message:`Set playmode: ${playMode}` });
        }

        // Mark new frame for delete
        this.undo = function() {
            renderer.setPlayMode(oldPlayMode);
            return new ServerMessage("information", null, { message:`Set playmode: ${oldPlayMode}` });
        }
    }
}

module.exports = SetPlayModeCommand;