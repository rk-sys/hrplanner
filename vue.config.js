const path = require('path');

module.exports = {
	chainWebpack: config => {
		config.module
				.rule('graphql')
				.test(/\.(graphql|gql)$/)
				.use('graphql-tag/loader')
				.loader('graphql-tag/loader')
				.end()
	},
	outputDir: path.resolve(__dirname, '../myFolder/public'),
	devServer: {
		proxy: {
			[process.env.VITE_APP_SERVER_PROXY]: {
				target: `${process.env.VITE_APP_SERVER_ADDRESS}:${process.env.VITE_APP_SERVER_PORT}/${process.env.VITE_APP_SERVER_PROXY}`,
				changeOrigin: true,
				pathRewrite: { '/api': '' }
			}
		}
	},
	publicPath: './',
};
