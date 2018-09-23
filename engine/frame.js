class Frame {
    constructor() {
        let onScreen = new Array();
        this.getOnScreen = function() { return onScreen; }
        this.addObject = function(screenObject) {
            onScreen.push(screenObject);
            return screenObject;
        }
        this.removeObject = function(screenObject) {
            let ndx = onScreen.indexOf(screenObject);
            if(ndx !== -1) onScreen.splice(ndx, 1);
        }

        this.clearFrame = function() {
            onScreen = new Array();
        }
    }
}