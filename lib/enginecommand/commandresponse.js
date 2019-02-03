class CommandResponse {
	constructor(_headers, _body) {
		let statusCode = 200;
		this.getStatusCode = function() { return statusCode; }
		this.setStatusCode = function(_statusCode) { statusCode = _statusCode; }

		let headers = _headers;
		this.getHeaders = function() { return headers; }

		let body = _body;
		this.getBody = function() { return body; }
	}
}

module.exports = CommandResponse;