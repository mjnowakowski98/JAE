const KeyMapContainer = require("./keymapcontainer.js");

class KeyMap extends KeyMapContainer {
    constructor() {
        let containers = new Array();
        containers.push()

        this.findContainer = function(containerKey) {
            let container = null;
            let ndx = containers.length;
            while(--ndx >= 0 && containers[ndx].getAnimObj().getKey() != containerKey);
            if(ndx >= 0) container = containers[ndx];
            return container;
        }
    }
}

module.exports = KeyMap;