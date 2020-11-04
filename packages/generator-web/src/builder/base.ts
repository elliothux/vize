import webpack from 'webpack';
import { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import { GlobalMeta } from '../../types';

export interface BaseConfigParams {
  containerPath: string;
  containerParams: {
    global: object;
    meta: GlobalMeta;
  };
}

export function getBaseWebpackConfig({ containerPath, containerParams }: BaseConfigParams): Configuration {
  return {
    // entry: entryPath,
    // output: { path: output },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.scss', '.css'],
      symlinks: false,
    },
    module: {
      rules: [
        // useSWC ? getSWConfig() : getBabelConfig(),
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
    // mode: 'production',
    mode: 'development',
    devtool: 'source-map',
    optimization: {
      minimize: false,
      noEmitOnErrors: false,
    },
  };
}
