class DrawingMethod {
    constructor(methodName, args) {
        let methodName = methodName;
        this.getMethodName = function() { return methodName; }
        let args = args;
        this.getArgs = function() { return args; }
    }
}