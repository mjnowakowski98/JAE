class Drawable {
    constructor(methods, animation) {
        Object.assign(this, new LayerContainer());

        let methodList = methods;
        this.getMethodList = function() { return methodList; }

        let path = new Path2D();
        for(let i = 0; i < methodList.length; i++) {
            let method = methodList[i];
            path[method.getMethodName()].apply(path, method.getArgsList());
        }
        this.getPath = function() { return path; }
        
        animation.registerDrawable(this);
    }
}