class ScreenObject {
    constructor(_drawable, _position) {
        let drawable = _drawable;
        this.getDrawable = function() { return drawable; }
        this.setDrawable = function(newDrawable) { drawable = newDrawable; }

        let position = _position;
        this.getPosition = function() { return position; }
        this.setPosition = function(newPosition) { position = newPosition; }

        let fillStyle = null;
        this.getFillStyle = function() { return fillStyle; }
        this.setFillStyle = function(color) { fillStyle = color; }

        let strokeStyle = null;
        this.getStrokeStyle = function() { return strokeStyle; }
        this.setStrokeStyle = function(color) { strokeStyle = color; }

        let font = null;
        this.getFont = function() { return font; }
        this.setFont = function(_font) { font = _font; }

        let alpha = null;
        this.getAlpha = function() { return alpha; }
        this.setAlpha = function(_alpha) { alpha = _alpha; }

        let lineCap = null;
        this.getLineCap = function() { return lineCap; }
        this.setLineCap = function(_linecap) { lineCap = _linecap; }

        this.lineDashOffset = null;
        this.getLineDashOffset = function() { return this.lineDashOffset; }
        this.setLineDashOffset = function(offset) { this.lineDashOffset = offset; }

        let lineWidth = null;
        this.getLineWidth = function() { return lineWidth; }
        this.setLineWidth = function(width) { lineWidth = width; }

        let miterLimit = null;
        this.getMiterLimit = function() { return miterLimit; }
        this.setMiterLimit = function(limit) { miterLimit = limit; }

        let shadowBlur = null;
        this.getShadowBlur = function() { return shadowBlur; }
        this.setShadowBlur = function(blur) { shadowBlur = blur; }

        let shadowColor = null;
        this.getShadowColor = function() { return shadowColor; }
        this.setShadowColor = function(color) { shadowColor = color; }

        let shadowOffsetX = null;
        this.getShadowOffsetX = function() { return shadowOffsetX; }
        this.setShadowOffsetX = function(offset) { shadowOffsetX = offset; }
        
        let shadowOffsetY = null;
        this.getShadowOffsetY = function() { return shadowOffsetY; }
        this.setShadowOffsetY = function(offset) { shadowOffsetY = offset; }

        let textAlign = null;
        this.gettextAlign = function() { return textAlign; }
        this.setTextAlign = function(alignment) { textAlign = alignment; }

        let textBaseline = null;
        this.getTextBaseline = function() { return textBaseline; }
        this.setTextBaseline = function(baseline) { textBaseline = baseline; }
    }
}