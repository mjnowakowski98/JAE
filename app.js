// Temporary test driver for engine

const { Renderer, CommandHandler } = require("./lib/engine/module.js");
const { createCanvas } = require("canvas");
const canvas = createCanvas(800, 600);
const ctx = canvas.getContext('2d');

let r = new Renderer(ctx);
let anim = r.getAnimation();
let objMan = anim.getObjectManager();
let c = new CommandHandler();

let commIn = { objMan:objMan, commandName:"createFrame", constructorArgs: { containerKey:anim.getKey(), name:"test" } };
c.queueCommand(commIn);

c.executeNextCommand();
