// Temporary test driver for engine

const { Renderer } = require("./lib/engine/module.js");
const { createCanvas } = require("canvas");
const canvas = createCanvas(800, 600);
const ctx = canvas.getContext('2d');

const Layer = require("./lib/engine/layer.js");

let r = new Renderer(ctx);
let anim = r.getAnimation();
let objMan = anim.getObjectManager();

let layers = [new Layer(null), new Layer(null), new Layer(null)];
let layerKeys = new Array();
for(let i = 0; i < layers.length; i++) {
    layerKeys.push(layers[i].getKey());
    objMan.mapObject(layers[i]);
}

objMan.markForDelete(layerKeys[1]);
objMan.cullKeyMap();