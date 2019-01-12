class CommandHandler {
    constructor() {
        let queue = new Array();

        this.queueCommand = function(commandDescriptor) {
            queue.push(commandDescriptor);
        }

        this.executeNextCommand = function() {

        }
    }
}

module.exports = CommandHandler;