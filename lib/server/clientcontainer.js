const Renderer = require("../engine/module.js").Renderer;
const Canvas = require("canvas");
const { settings } = require("../../config.js");

class ClientContainer {
	constructor(_clientId, canvasWidth = settings.canvas.defaultWidth,
				canvasHeight = settings.canvas.defaultHeight) {
		
		let clientId = _clientId;
		this.getClientId = function() { return clientId; }
		
		let commandBuildState = false;
		let commandObjString = "";
		let executeCommand = function(commandObj) {
			console.log(commandObj);
			return "value to respond";
		}
		this.startCommandBuild = function() {
			commandBuildState = true;
			commandObjString = "";
		}
		this.addCommandObjChunk = function(chunk) {
			if(commandBuildState)
				commandObjString += chunk;
			else console.error("Command not ready to build");
			return commandObjString;
		}
		this.endCommandBuild = function() {
			let commObj = null;
			let retVal = null;
			try { commObj = JSON.parse(commandObjString);
			} catch(e) {
				if(e instanceof SyntaxError) {
					retVal = "ERROR: Malformed command object\n";
					retVal += e;
				}
				
				console.error(e);
				return retVal;
			}

			retVal = executeCommand(commObj);
			this.commandBuildState = false;
			this.commandObjString = "";
			return retVal;
		}

		let rendererObj = new Renderer(Canvas.createCanvas(canvasWidth, canvasHeight).getContext('2d'));
		this.getRenderer = function() { return rendererObj; }
		this.getAnimation = function() { return rendererObj.getAnimation(); }
	}
}

module.exports = ClientContainer;