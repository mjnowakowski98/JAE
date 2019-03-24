const env = process.env.NODE_ENV || "dev";

// Global settings
const settings = {
	appDir:__dirname,
	canvas: {
		defaultWidth: parseInt(process.env.JAE_CANVAS_DEFAULTWIDTH) || 1280,
		defaultHeight: parseInt(process.env.JAE_CANVAS_DEFAULTHEIGHT) || 720
	}
};

// Environment settings
// Dev
const dev = {
	uuidVersion:"v1"
};

// Production
const production = {
	uuidVersion:"v4"
}

// Config export setup
const config = {
	dev,
	production
};

// Module export
module.exports = {
	settings,
	env: config[env]
};