const Util = require("../util.js");
const { Renderer } = require("../engine/module.js");

const { createCanvas } = require("canvas");

class Client {
    constructor() {
        let sessionKey = Util.generateKey();
        this.getSessionKey = function() { return sessionKey; }

        let canvas = createCanvas(800, 600);
        let renderer = new Renderer(canvas.getContext('2d'));
        this.getRenderer = function() { return renderer; }
    }
}

module.exports = Client;