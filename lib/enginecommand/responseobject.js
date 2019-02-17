class ResponseObject {
	constructor(_message = "", _error = "", _extended = null) {
		this.message = _message;
		this.error = _error;
		this.extended = _extended;
	}
}

module.exports = ResponseObject;