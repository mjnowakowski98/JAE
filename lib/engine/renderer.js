const Animation = require("./animation.js");

class Renderer {
    constructor(_ctx) {
        let requestId = 0;
        this.getRequestId = function() { return requestId; }
        this.setRequestId = function(_requestId) { requestId = _requestId; }

        let ctx = _ctx;
        this.getCtx = function() { return ctx; }

        let anim = new Animation();
        this.getAnimation = function() { return anim; }

        let playMode = false;
        this.getPlayMode = function() { return playMode; }
        this.setPlayMode = function(_playMode) { playMode = _playMode; }

        let elapsedTime = 0;
        let oldTime = 0;

        this.frame = function() {

        }

        this.draw = function() {

        }

        this.drawLayers = function() {

        }

        this.stepPlayback = function() {

        }
    }

    static render(renderer) {

    }
}

module.exports = Renderer;