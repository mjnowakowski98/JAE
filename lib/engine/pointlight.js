const LightSource = require("./lightsource.js");
const Point = require("./point.js");

class PointLight extends LightSource {
    constructor() {
        let position = new Point();
        this.getPosition = function() { return position; }
        this.setPosition = function(_position) { position = _position; }

        let color = "#ffffff";
        this.getColor = function() { return color; }
        this.setColor = function(_color) { color = _color; }

        let brightness = 1.0;
        this.getBrightness = function() { return brightness; }
        this.setBrightness = function(_brightness) { brightness = _brightness; }

        let radius = 10;
        this.getRadius = function() { return radius; }
        this.setRadius = function(_radius) { radius = _radius; }

        this.emit = function() {

        }
    }
}

module.exports = PointLight;