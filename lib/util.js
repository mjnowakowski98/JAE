const { settings, env } = require("../config.js");

class Util {
     static randomBetween(low, high, decMult = 100) {
        let diff = (high + 1) - low;
		return low + Math.round(decMult * Math.random()) % diff;
    }

    static generateId(length = settings.app.idLength) {
        let tmpString = "";
        for(let i = 0; i < length; i++) {
            let tmpRange = Util.randomBetween(0, env.stringGen.charRanges.length);
            let low = env.stringGen.charRanges[tmpRange].low;
            let high = env.stringGen.charRanges[tmpRange].high;
            tmpString += String.fromCharCode(Util.randomBetween(low, high));
        }
        return tmpString;
    }
}

module.exports = Util;