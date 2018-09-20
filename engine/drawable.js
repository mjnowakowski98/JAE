class Drawable {
    constructor(methods) {
        this.methodList = methods;
        this.points = new Array();
        this.path = new Path2D();
        for(let i = 0; i < this.methodList.length; i++) {
            let method = this.methodList[i];
            if(method.toPoint) this.points.push(method.toPoint);

            switch(method.methodName) {
                case "moveTo":
                    this.path.moveTo(method.toPoint.x, method.toPoint.y);
                    break;
                case "lineTo":
                    this.path.lineTo(method.toPoint.x, method.toPoint.y);
                    break;
                case "closePath":
                    this.path.closePath();
                    break;
                default:
                    break;
            }
        }

        this.boundingWidth = 0;
        this.boundingHeight = 0;
    }
}