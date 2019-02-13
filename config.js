const env = process.env.NODE_ENV || "dev";

const settings = {
	canvas: {
		defaultWidth: parseInt(process.env.JAE_CANVAS_DEFAULTWIDTH) || 1280,
		defaultHeight: parseInt(process.env.JAE_CANVAS_DEFAULTHEIGHT) || 720
	},
	app: {
		keyGen: {
			charRanges: [
				{
					low:48,
					high:57
				},
				{
					low:97,
					high:122
				}
			],
			length:25
		},
		server: {
			httpPort: process.env.JAE_DEFAULTPORT || 80,
			magicSocketString: process.env.JAE_MAGICSOCKETSTRING || "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"
		}
	}
};

const dev = {
	
};


const config = {
	dev
};

module.exports = {
	settings,
	env: config[env]
};