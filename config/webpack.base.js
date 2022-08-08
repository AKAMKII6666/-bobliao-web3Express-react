var webpack = require("webpack");
const Version = +new Date();

module.exports = {
	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx"],
		fallback: {
			assert: false,
			os: false,
			fs: false,
			tls: false,
			net: false,
			path: false,
			zlib: false,
			http: require.resolve("http-browserify"),
			https: require.resolve("https-browserify"),
			stream: require.resolve("stream-browserify"),
			crypto: false,
			url: require.resolve("url/"),
			buffer: require.resolve("buffer"),
			"crypto-browserify": require.resolve("crypto-browserify"),
		},
	},
	plugins: [
		// Work around for Buffer is undefined:
		// https://github.com/webpack/changelog-v5/issues/10
		new webpack.ProvidePlugin({
			Buffer: ["buffer", "Buffer"],
		}),
		new webpack.ProvidePlugin({
			process: "process/browser",
		}),
	],
	module: {
		rules: [
			{
				test: /(\.js(x?))|(\.ts(x?))$/,
				exclude: /node_modules/,
				loader: "babel-loader",
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: "url-loader",
						options: {
							name: "[name]_[hash:6].[ext]",
							esModule: false,
							limit: 0,
						},
					},
				],
			},
			{
				test: /\.json$/,
				loader: "file-loader",
				type: "javascript/auto",
				options: {
					name() {
						return "[path][name]." + Version + ".[ext]";
					},
				},
			},
		],
	},
};
