class Frame {
    constructor() {
        let onScreen = new Array();
        this.getOnScreen = function() { return onScreen; }
        this.addObjectToFrame = function(screenObject) {
            onScreen.push(screenObject);
        }
        this.removeObjectFromFrame = function(screenObject) {
            let ndx = onScreen.indexOf(screenObject);
            if(ndx !== -1) onScreen.splice(ndx, 1);
        }
    }
}