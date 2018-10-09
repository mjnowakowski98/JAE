const env = process.env.NODE_ENV || "dev";

const settings = {
	app: {
		port: parseInt(process.env.JAE_PORT) || 54198,
		serverMode: process.env.JAE_SERVERMODE || "tcp",
		idLength: parseInt(process.env.JAE_IDLENGTH) || 25
	},
	canvas: {
		defaultWidth: parseInt(process.env.JAE_CANVAS_DEFAULTWIDTH) || 1280,
		defaultHeight: parseInt(process.env.JAE_CANVAS_DEFAULTHEIGHT) || 720
	}
};

const dev = {
	stringGen: {
		charRanges: [
			{
				low: 48,
				high:57
			},
			{
				low:97,
				high:122
			}
		]
	}
};
const test = {
	stringGen: {
		charRanges: [
			{
				low: 48,
				high:57
			},
			{
				low:97,
				high:122
			}
		]
	}
};

const config = {
	dev,
	test
};

module.exports = {
	settings,
	env: config[env]
};