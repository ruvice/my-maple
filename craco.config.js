const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    devServer: {
        port: 8080,
        static: {
          directory: path.resolve(__dirname, 'public'),
        },
        historyApiFallback: {
          rewrites: [
            { from: /^\/config.html$/, to: '/config.html' },
            { from: /^\/index.html$/, to: '/index.html' },
          ],
        },
    },
    webpack: {
        configure: (webpackConfig) => {
        // Override the entry
        webpackConfig.entry = {
            main: path.resolve(__dirname, 'src/index.tsx'),
            config: path.resolve(__dirname, 'src/config.tsx'),
        };

        // Remove the default HtmlWebpackPlugin instance
        webpackConfig.plugins = webpackConfig.plugins.filter(
            (plugin) => !(plugin instanceof HtmlWebpackPlugin)
        );

        // Add separate HTML files for each entry
        webpackConfig.plugins.push(
            new HtmlWebpackPlugin({
            inject: true,
            chunks: ['main'],
            filename: 'index.html',
            template: './public/index.html',
            }),
            new HtmlWebpackPlugin({
            inject: true,
            chunks: ['config'],
            filename: 'config.html',
            template: './public/config.html',
            })
        );

        return webpackConfig;
        },
    },
};
