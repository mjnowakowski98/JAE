const keyGen = require("../config.js").settings.app.keyGen;

class Util {
     static randomBetween(low, high, decMult = 100) {
        let diff = (high + 1) - low;
		return low + Math.round(decMult * Math.random()) % diff;
    }

    static generateKey(length = keyGen.length) {
        let tmpString = "";
        for(let i = 0; i < length; i++) {
            let tmpRange = Util.randomBetween(0, keyGen.charRanges.length - 1);
            let low = keyGen.charRanges[tmpRange].low;
            let high = keyGen.charRanges[tmpRange].high;
            tmpString += String.fromCharCode(Util.randomBetween(low, high));
        }
        return tmpString;
    }
}

module.exports = Util;