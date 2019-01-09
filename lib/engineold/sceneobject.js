const Point = require("./point.js");

class ScreenObject {
    constructor(_path) {
        let path = _path;
        this.getDrawable = function() { return path; }
        this.setDrawable = function(newDrawable) { path = newDrawable; }

        let position = new Point(0, 0);
        this.getPosition = function() { return position; }
        this.setPosition = function(newPosition) { position = newPosition; }
    }
}

module.exports = ScreenObject;