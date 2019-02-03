const Util = require("../util.js");

class SessionInfo {
	constructor(_animationKey) {
		let sessionKey = Util.generateKey();
		this.getSessionKey = function() { return sessionKey; }

		let sessionExpiresDate = new Date();
		this.renewSession = function() { sessionExpiresDate.setDate(sessionExpiresDate.getDate() + 1); }
		this.getSessionExpired = function() { return (sessionExpiresDate <= Date.now()); }
		this.renewSession();

		let animationKey = _animationKey;
		this.getAnimationKey = function() { return animationKey; }
	}
}

module.exports = SessionInfo;