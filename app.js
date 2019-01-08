const Renderer = require("./lib/engine/module.js").Renderer;
const createCanvas = require("canvas").createCanvas;
const canvas = createCanvas(800, 600);
const ctx = canvas.getContext('2d');

let r = new Renderer(ctx);

