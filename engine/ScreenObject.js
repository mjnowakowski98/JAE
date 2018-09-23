class ScreenObject {
    constructor(_drawable, _position) {
        let drawable = _drawable;
        this.getDrawable = function() { return drawable; }
        this.setDrawable = function(newDrawable) { drawable = newDrawable; }

        let position = _position;
        this.getPosition = function() { return position; }
        this.setPosition = function(newPosition) { position = newPosition; }
    }
}