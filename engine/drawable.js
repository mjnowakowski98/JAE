class Drawable {
    constructor(methods) {
        this.methodList = methods;
        this.path = new Path2D();
        for(let i = 0; i < this.methodList.length; i++) {
            let method = this.methodList[i];
            this.path[method.methodName].apply(this.path, method.args)
        }
        this.registration = new Point(0,0)
        this.subLayers = new Array();
    }
}