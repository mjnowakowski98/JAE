class Animation {
    constructor() {
        this.animName = "Untitled";
        this.canvasColor = "#FFFFFF";
        this.canvasWidth = 800;
        this.canvasHeight = 600;
        this.framesPerSecond = 60;
        this.drawables = new Array();
        this.layers = new Array(new Layer());
    }

    makeSaveFile() { return JSON.stringify(this); }

    loadAnimation(inputString) {
        let tmp = JSON.parse(inputString);
        this.animName = tmp.animName;
        this.canvasColor = tmp.canvasColor;
        this.canvasWidth = tmp.canvasWidth;
        this.canvasHeight = tmp.canvasHeight;
        this.framesPerSecond = tmp.framesPerSecond;
        this.drawables = tmp.drawables;
        this.frame = tmp.frames;
    }

    registerDrawable(drawable) {
        if(this.drawables.indexOf(drawable) === -1)
            this.drawables.push(drawable);
    }

    unregisterDrawable(drawable) {
        this.drawables.splice(this.drawables.indexOf(drawable));
        for(let i = 0; i < this.frames.length; i++) {
            let frame = this.frames[i];
            let ndx = frame.onScreen.indexOf(drawable);
            if(ndx !== -1)
                frame.splice(ndx, 1);
        }
    }
}