const Command = require("../command.js");
const ServerMessage = require("../../netclient/servermessage.js");

class GetChildAnimObjectsCommand extends Command {
    constructor(_handler, constructorArgs) {
        super(_handler);

        let key = constructorArgs.key;

        this.execute = function() {
            let parent = this.getHandler().getObjMan().getReference(key);
            if(!parent) return new ServerMessage("error", "Invalid key provided");
            let children = new Array();
            let type = parent.getType();
            switch(type) {
                case "animation":
                case "layercontainer":
                    let layers = parent.getLayers();
                    for(let i = 0; i < layers.length; i++)
                        children.push({key:layers[i].getKey(), type:layers[i].getType() });
                    break;

                case "layer":
                    let frames = parent.getFrames();
                    for(let i = 0; i < frames.length; i++)
                        children.push({key:frames[i].getKey(), type:frames[i].getType() });
                    break;

                case "frame":
                    let sceneObjs = parent.getOnScreen();
                    for(let i = 0; i < sceneObjs.length; i++)
                        children.push({key:sceneObjs[i].getKey(), type:sceneObjs[i].getType() });
                    break;

                case "sceneobj":
                    let path = parent.getPath();
                    children.push({key:path.getKey(), type:path.getType() });
                    break;
                
                default:
                    return new ServerMessage("error", "AnimObject type invalid");
            }

            return new ServerMessage("getChildren", null, { parent:parent.getKey(), children:children });
        }

        this.undo = function() {
            
        }
    }
}

module.exports = GetChildAnimObjectsCommand;