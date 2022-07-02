


export default (config, env, helpers, options) => {
	if (env.isProd) {
		config.output.publicPath = '/preact-quick-draw/';
		config.plugins.push(
			new helpers.webpack.DefinePlugin({
				'process.env.PUBLIC_PATH': JSON.stringify(config.output.publicPath || '/')
			}),
		);

		config.devtool = false;
	}
	return config;
};
