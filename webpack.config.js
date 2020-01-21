const path = require("path"),
      HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "none",
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "build"),
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            filename: "./index.html",
            template: './src/static/index.html',
            title: "Tic Tac Toe"
        })
   ]
};
