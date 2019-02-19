class ServerMessage {
	constructor(_action = "", _error = null, _extended = null) {
		this.action = _action;
		this.error = _error;
		this.extended = _extended;
	}
}

module.exports = ServerMessage;