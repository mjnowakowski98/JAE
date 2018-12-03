const Animation = require("./animation.js");
const Playmodes = require("./playmodes.js");

class Renderer {
    constructor(_ctx) {
        let requestId = 0;
        let getRequestId = function() { return requestId; }
        let setRequestId = function(_requestId) { requestId = _requestId; }

        let ctx = _ctx;
        this.getContext = function() { return context; }

        let animation = new Animation();
        this.getAnimation = function() { return animation; }

        let playMode = Playmodes.REAL;
        this.getPlaybackMode = function() { return playMode; }
        this.setPlaymode = function(_playMode) { playMode = _playMode; }

        let elapsedTime = 0;
        let oldTime = 0;

        this.frame = function() {

        }

        this.draw = function() {
            
        }

        this.drawLayers = function() {

        }

        this.stepPlayback = function() [

        ]
    }

    static render(_renderer) {
        
    }
}

module.exports = Renderer;