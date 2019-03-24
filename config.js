const env = process.env.NODE_ENV || "dev";

const settings = {
	appDir:__dirname,
	canvas: {
		defaultWidth: parseInt(process.env.JAE_CANVAS_DEFAULTWIDTH) || 1280,
		defaultHeight: parseInt(process.env.JAE_CANVAS_DEFAULTHEIGHT) || 720
	}
};

const dev = {
	uuidVersion:"v1"
};

const production = {
	uuidVersion:"v4"
}


const config = {
	dev,
	production
};

module.exports = {
	settings,
	env: config[env]
};