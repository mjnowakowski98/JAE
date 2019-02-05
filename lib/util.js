const keyGen = require("../config.js").settings.app.keyGen;

class Util {
    // Generate a random number inclusive of high/low
    static randomBetween(low, high, decMult = 100) {
        let diff = (high + 1) - low;
		return low + Math.round(decMult * Math.random()) % diff;
    }

    // Generate a random key string
    static generateKey(length = keyGen.length) {
        let tmpString = ""; // Start empty

        // Append 1 char at a time
        for(let i = 0; i < length; i++) {
            // Generate a random character code (use config to define keycode ranges)
            let tmpRange = Util.randomBetween(0, keyGen.charRanges.length - 1);
            let low = keyGen.charRanges[tmpRange].low;
            let high = keyGen.charRanges[tmpRange].high;
            tmpString += String.fromCharCode(Util.randomBetween(low, high)); // Convert keycode to char and append
        }
        return tmpString; // Return completed key
    }
}

module.exports = Util;