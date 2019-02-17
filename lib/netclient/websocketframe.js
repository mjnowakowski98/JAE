class WebSocketFrame {
	constructor(_isFinal, _opcode, _payloadLength, _payload) {
		let isFinal = _isFinal;
		this.getIsFinal = () => isFinal;

		let opcode = _opcode;
		this.getOpcode = () => opcode;

		let payloadLength = _payloadLength;
		this.getPayloadLength = () => payloadLength;

		let payload = _payload;
		this.getPayload = () => payload;
	}
}

module.exports = WebSocketFrame;