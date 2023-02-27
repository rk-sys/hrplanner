const path = require('path');

module.exports = {
	outputDir: path.resolve(__dirname, '../myFolder/public'),
	devServer: {
		proxy: {
			[process.env.VITE_APP_SERVER_PROXY]: {
				target: `${process.env.VITE_APP_SERVER_ADDRESS}/${process.env.VITE_APP_SERVER_PROXY}`,
				changeOrigin: true,
				pathRewrite: { '/api': '' }
			}
		}
	},
	publicPath: './',
};
