const { Renderer } = require("./lib/engine/module.js");
const { createCanvas } = require("canvas");
const canvas = createCanvas(800, 600);
const ctx = canvas.getContext('2d');

let r = new Renderer(ctx);
r.getAnimation().getObjectManager().createLayer(null);