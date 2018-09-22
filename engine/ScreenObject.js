class ScreenObject {
    constructor(drawable, position) {
        let drawable = drawable;
        this.getDrawable = function() { return drawable; }
        this.setDrawable = function(newDrawable) { drawable = newDrawable; }

        let position = position;
        this.getPosition = function() { return position; }
        this.setPosition = function(newPosition) { position = newPosition; }
    }
}