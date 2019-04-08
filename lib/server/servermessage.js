const env = appConfig.env;

const Uuid = require("uuid/" + env.uuidVersion);

const MessageType = require("./messagetype.js");

class ServerMessage {
    constructor(_clientUuid) {
        let messageUuid = Uuid();
        this.getMessageUuid = () => messageUuid;

        let clientUuid = _clientUuid;
        this.getClientUuid = () => clientUuid;

        let type = MessageType.LOG;
        this.getType = () => type;
        this.setType = (_type) => type = _type;

        let message = "";
        this.getMessage = () => message;
        this.setMessage = (_message) => message = _message;
    }
}

module.exports = ServerMessage;