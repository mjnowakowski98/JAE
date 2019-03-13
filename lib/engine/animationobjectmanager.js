class AnimationObjectManager {
    constructor(_animation) {
        let animation = _animation;
        this.getAnimation = () => animation;

        let keyMap = new Array();

        this.mapObject = function(animObj) {
            keyMap.push({key:animObj.getKey(), ref:animObj});
            return animObj.getKey();
        }
        this.mapObject(animation);
        let initLayer = animation.getLayers()[0];
        this.mapObject(initLayer);
        let initFrame = initLayer.getFrames()[0];
        this.mapObject(initFrame);

        this.getPaths = function() {
            let paths = new Array();
            for(let i = 0; i < keyMap.length; i++) {
                if(keyMap[i].ref.getType == "path") paths.push(keyMap[i]);
            }
            return paths;
        }

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
            for(let i = keyMap.length; --i >= 0;) {
                let animObj = keyMap[i].ref
                if(animObj.getDeleted()) {
                    animObj.onCull();
                    keyMap.splice(i, 1);
                }
            }
                

            console.log(keyMap);
        }
    }
}

module.exports = AnimationObjectManager;