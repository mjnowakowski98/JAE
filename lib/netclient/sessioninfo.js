const Util = require("../util.js");

class SessionInfo {
	constructor(_animationKey) {
		// Key used to uniquely identify active sessions
		let sessionKey = Util.generateKey();
		this.getSessionKey = function() { return sessionKey; }

		// Date/time the session expires
		let sessionExpiresDate = new Date();
		this.renewSession = function() { sessionExpiresDate.setDate(sessionExpiresDate.getDate() + 1); }
		this.getSessionExpired = function() { return (sessionExpiresDate <= Date.now()); }
		this.renewSession();

		// Key used to get the animation root object
		let animationKey = _animationKey;
		this.getAnimationKey = function() { return animationKey; }
	}
}

module.exports = SessionInfo;