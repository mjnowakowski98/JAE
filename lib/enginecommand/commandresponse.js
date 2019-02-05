class CommandResponse {
	constructor(_headers, _body) {
		// Response status code
		let statusCode = 200;
		this.getStatusCode = function() { return statusCode; }
		this.setStatusCode = function(_statusCode) { statusCode = _statusCode; }

		// Response headers
		let headers = _headers;
		this.getHeaders = function() { return headers; }

		// Response body
		let body = _body;
		this.getBody = function() { return body; }
	}
}

module.exports = CommandResponse;