const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env) => {
    const isSingle = env.BUILD_MODE === 'Single';
    const isDebug = !env.BUILD_MODE;
    console.log('Build mode:', { isSingle, isDebug });

    console.log('env build mode:', env.BUILD_MODE);
    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
            publicPath: isDebug ? '/' : './',
        },
        mode: isDebug ? 'development' : 'production',
        devtool: 'source-map',
        devServer: {
            compress: true,
            port: 3100,
            devMiddleware: {
                publicPath: '/',
            },
        },
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
                /*{
                                    test: /\.(png|jpg|jpeg|gif)$/i,
                                    type: 'asset/resource', // Handles image files
                                    generator: {
                                        publicPath: './',
                                    },
                                }, */
                {
                    test: /\.yaml$/i,
                    use: 'yaml-loader',
                },
                {
                    test: /\.(ttf|woff|woff2|eot|otf|png|jpg|jpeg|gif)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: isSingle ? 100000000 : 0,
                                publicPath: './',
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