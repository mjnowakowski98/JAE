const Layer = require("./layer.js");
const Path = require("./path.js");
const SceneObject = require("./sceneobject.js");

class AnimationObjectManager {
    constructor() {
        let keyMap = new Array(); // tmp

        this.createLayer = function(container, name = "") {
            let tmp = new LayerContainer();
            keyMap.push({ key:tmp.getKey(), ref:tmp });
            console.log(keyMap);
        }

        this.createPath = function(name = "") {

        }

        this.createSceneObject = function(layerKey, frameNdx) {

        }

        this.getReference() = function() {

        }
    }
}

module.exports = AnimationObjectManager;