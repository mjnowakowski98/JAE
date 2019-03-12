const Command = require("../command.js");
const ServerMessage = require("../../netclient/servermessage.js");
const DrawingMethod = require("../../engine/drawingmethod.js");
const Path = require("../../engine/path.js");

class CreatePathCommand extends Command {
    constructor(_handler, constructorArgs) {
        super(_handler);

        let objKey = null;
        let drawingMethods = new Array();
        for(let i = 0; i < constructorArgs.drawingMethods.length; i++) {
            let method = constructorArgs.drawingMethods[i];
            drawingMethods.push(new DrawingMethod(method.methodName, method.argsList));
        }

        let name = constructorArgs.name;

        // Create new Path
        this.execute = function() {
            // Initialize Path
            let newPath = new Path(drawingMethods);
            newPath.setName(name);
            objKey = newPath.getKey();
            this.getHandler().getObjMan().mapObject(newPath, objKey);
            return new ServerMessage("createObject", null, {objKey:objKey, type:newPath.getType()});
        }

        // Mark new Path for delete
        this.undo = function() {
            this.getHandler().getObjMan().markForDelete(objKey);
            return new ServerMessage(`${objKey} marked for delete`);
        }
    }
}

module.exports  = CreatePathCommand;