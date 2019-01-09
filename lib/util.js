const { settings } = require("../config.js");

class Util {
     static randomBetween(low, high, decMult = 100) {
        let diff = (high + 1) - low;
		return low + Math.round(decMult * Math.random()) % diff;
    }

    static generateKey(length = settings.app.keyGen.length) {
        let tmpString = "";
        for(let i = 0; i < length; i++) {
            let tmpRange = Util.randomBetween(0, settings.app.keyGen.charRanges.length - 1);
            let low = settings.app.keyGen.charRanges[tmpRange].low;
            let high = settings.app.keyGen.charRanges[tmpRange].high;
            tmpString += String.fromCharCode(Util.randomBetween(low, high));
        }
        return tmpString;
    }
}

module.exports = Util;