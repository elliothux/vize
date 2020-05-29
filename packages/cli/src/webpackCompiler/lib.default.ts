import * as path from 'path';
import { Configuration } from 'webpack';
import { LibPaths } from '../utils';
import { LibConfig } from '../config';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function getLibDefaultWebpackConfig(
    {
        root,
        mainEntryTemp,
        metaEntryTemp,
        output,
        nodeModules,
        src,
        container,
        containerEntry,
        containerHTML,
    }: LibPaths,
    { libName }: LibConfig,
    isProd: boolean,
): Configuration {
    return {
        context: root,
        entry: {
            main: mainEntryTemp,
            meta: metaEntryTemp,
            entry: containerEntry,
            html: containerHTML,
        },
        output: {
            path: output,
            filename: `@vize-materials-${libName}-[name].js`,
            library: `@vize-materials-${libName}-[name]`,
            libraryTarget: 'window',
            umdNamedDefine: true,
        },
        externals: {
            react: 'React',
            antd: 'Antd',
            'react-dom': 'ReactDom',
            'react-dom/server': 'ReactDomServer',
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss', '.css'],
            modules: [nodeModules, src],
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx|js|jsx)$/,
                    loader: 'babel-loader',
                    options: {
                        compact: false,
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    targets: {
                                        chrome: '58',
                                        ios: '9',
                                        android: '4.2',
                                    },
                                },
                            ],
                            '@babel/preset-typescript',
                            '@babel/preset-react',
                        ],
                        plugins: [
                            '@babel/plugin-transform-async-to-generator',
                            '@babel/plugin-proposal-class-properties',
                            ['@babel/plugin-proposal-decorators', { legacy: true }],
                            '@babel/plugin-proposal-export-default-from',
                            '@babel/plugin-proposal-export-namespace-from',
                            '@babel/plugin-proposal-optional-chaining',
                        ],
                    },
                },
                {
                    test: /\.(css|scss|sass)$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: false,
                                importLoaders: 2,
                                sourceMap: true,
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                implementation: require('dart-sass'),
                                sassOptions: {
                                    outputStyle: 'expanded',
                                },
                                sourceMap: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.(jpe?g|png|gif|ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                    loader: 'base64-inline-loader',
                },
                {
                    test: /\.(ejs|svg)$/,
                    use: 'raw-loader',
                },
            ],
        },
        plugins: [
            new webpack.HashedModuleIdsPlugin({
                hashFunction: 'sha256',
                hashDigest: 'hex',
                hashDigestLength: 20,
            }),
            new MiniCssExtractPlugin({
                filename: `@vize-materials-${libName}-[name].css`,
                chunkFilename: `@vize-materials-${libName}-[name].css`,
            }),
            // new webpack.EnvironmentPlugin({
            //   SSR: false,
            //   WEBPACK_ENV: "production"
            // })
        ],
        mode: isProd ? 'production' : 'development',
        devtool: 'source-map',
        optimization: {
            minimize: false,
            noEmitOnErrors: true,
        },
    };
}
