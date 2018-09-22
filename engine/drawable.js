class Drawable {
    constructor(methods) {
        let methodList = methods;
        this.getMethodList = function() { return methodList; }

        let path = new Path2D();
        for(let i = 0; i < methodList.length; i++) {
            let method = methodList[i];
            path[method.getMethodName()].apply(path, method.getArgsList());
        }
        this.getPath = function() { return path; }

        let registration = new Point(0,0)
        this.getRegistration = function() { return registration; }
        this.setRegistration = function(position) { registration = position; }

        let subLayers = new Array();
        this.getSubLayers = function() { return subLayers; }
    }
}