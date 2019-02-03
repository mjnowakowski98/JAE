class CommandResponse {
	constructor(_headers, _body) {
		let headers = _headers;
		this.getHeaders = function() { return headers; }

		let body = _body;
		this.getBody = function() { return body; }
	}
}

module.exports = CommandResponse;