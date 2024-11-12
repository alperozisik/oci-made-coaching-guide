const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env) => {
    const isSingle = env.BUILD_MODE === 'Single';
    const isDebug = !env.BUILD_MODE;
    console.log('Build mode:', env.BUILD_MODE);
    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
            publicPath: '/',
        },
        mode: isDebug ? 'development' : 'production',
        devtool: 'source-map',
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
                    test: /\.(png|jpg|jpeg|gif)$/i,
                    type: 'asset/resource', // Handles image files
                },
                {
                    test: /\.yaml$/i,
                    use: 'yaml-loader',
                },
                {
                    test: /\.(ttf|woff|woff2|eot|otf)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: isSingle ? 2000000 : 8192,
                                name: 'fonts/[name].[hash].[ext]',
                            },
                        },
                    ],
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
            minimize: !isDebug,
            minimizer: [new TerserPlugin()],
        },
    };
};