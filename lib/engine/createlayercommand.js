class CreateLayerCommand {
    constructor(_containerKey, _name = "") {
        let containerKey = _containerKey;
        let name = _name;

        this.execute = function() {

        }

        this.undo = function() {

        }
    }
}

module.exports = CreateLayerCommand;