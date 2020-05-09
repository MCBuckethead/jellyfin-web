const path = require('path');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const packageConfig = require('./package.json');
const postcssConfig = require('./postcss.config.js');

module.exports = merge(common, {
    mode: 'development',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'amd-require'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules[\\/](?!jellyfin-apiclient|query-string|split-on-first|strict-uri-encode)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: packageConfig.babel.presets
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: postcssConfig()
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: ['file-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    }
});
