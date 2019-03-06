class KeyMapContainer {
    constructor(_animObj = null) {
        let animObj = _animObj;
        this.getAnimObj = () => animObj;

        let childObjects = new Array();
        this.addChild = function(key, type) {
            childObjects.push(new KeyMapContainer(key ,type));
        }

        this.deleteChild = function(key) {
            let ndx = childObjects.length;
            while(--ndx >= 0 && key !== childObjects[ndx].getKey()) continue;
            if(ndx >= 0) childObjects.splice(ndx, 1);
        }
    }
}

module.exports = KeyMapContainer;