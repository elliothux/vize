import * as path from 'path';
import webpack from 'webpack';
import { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { GeneratorPaths } from '../types';

export interface BaseConfigParams {
  isProd: boolean;
  generatorPaths: GeneratorPaths;
  containerParams: object;
}

// eslint-disable-next-line max-lines-per-function
export function getWebpackConfig({
  isProd,
  generatorPaths: { containerPath, srcPath },
  containerParams,
}: BaseConfigParams): Configuration {
  return {
    context: srcPath,
    resolve: {
      roots: [srcPath],
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.scss', '.css'],
      symlinks: false,
    },
    module: {
      rules: [
        {
          test: /\.iframe\.(scss|sass|css)$/,
          use: [
            { loader: 'css-to-string-loader' },
            { loader: 'css-loader' },
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass'),
              },
            },
          ],
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
          test: /\.less$/,
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
              loader: 'less-loader',
              options: {
                strictMath: false,
                noIeCompat: true,
                javascriptEnabled: true,
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|png|gif|ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          loader: 'base64-inline-loader',
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: `[name].css`,
      }),
      new webpack.EnvironmentPlugin({
        SSR: false,
        ENV: 'production',
        WEBPACK_ENV: 'production',
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(containerPath, './index.html.ejs'),
        templateParameters: containerParams,
      }),
    ],
    mode: isProd ? 'production' : 'development',
    devtool: 'source-map',
    optimization: {
      minimize: isProd,
      noEmitOnErrors: false,
    },
  };
}
