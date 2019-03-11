class AnimationObjectManager {
    constructor(animation) {
        let keyMap = new Array();

        this.mapObject = function(animObj) {
            keyMap.push({key:animObj.getKey(), ref:animObj});
            return animObj.getKey();
        }
        this.mapObject(animation);

        this.getReference = function(key) {
            let objRef = null;
            let ndx = keyMap.length;
            while(--ndx >= 0 && key != keyMap[ndx].key) continue;
            if(ndx >= 0) objRef = keyMap[ndx].ref;
            return objRef;
        }

        this.markForDelete = function(key) {
            let animObj = this.getReference(key);
            if(animObj) animObj.setDeleted(true);
        }

        this.unmarkForDelete = function(key) {
            let animObj = this.getReference(key);
            if(animObj) animObj.setDeleted(false);
        }

        this.cullKeyMap = function() {
            for(let i = keyMap.length; --i >= 0;)
                if(keyMap[i].ref.getDeleted()) keyMap.splice(i, 1);

            console.log(keyMap);
        }
    }
}

module.exports = AnimationObjectManager;