const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env) => {
    const isSingle = env.BUILD_MODE === 'Single';

    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
        },
        mode: 'production',
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: 'babel-loader',
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.svg$/,
                    use: [
                        {
                            loader: '@svgr/webpack',
                            options: {
                                icon: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|jpg|gif)$/i,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: isSingle ? 2000000 : 0, // 2MB limit for Single build, separate file for Web build
                                fallback: 'file-loader', // Fallback to file-loader for larger files
                            },
                        },
                    ],
                },
                {
                    test: /\.yaml$/i,
                    use: 'yaml-loader',
                },
            ],
        },
        resolve: {
            extensions: ['.js', '.jsx'],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                minify: isSingle,
            }),
            new MiniCssExtractPlugin(),
            ...(isSingle ? [new HtmlInlineScriptPlugin()] : [])
        ],
        optimization: {
            minimize: true,
            minimizer: [new TerserPlugin()],
        },
    };
};