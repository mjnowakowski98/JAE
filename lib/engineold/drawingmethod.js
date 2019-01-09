class DrawingMethod {
    constructor(method, args = new Array()) {
        let methodName = method;
        this.getMethodName = function() { return methodName; }
        
        let argsList = args;
        this.getArgsList = function() { return argsList; }
    }
}

module.exports = DrawingMethod;