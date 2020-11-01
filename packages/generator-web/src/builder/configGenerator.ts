import * as fs from 'fs';
import * as path from 'path';
import webpack from 'webpack';
import { Configuration } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { getBabelConfig, getSWConfig } from './babel';

export interface BuildConfigParams {
  root: string;
  entryPaths: { pageKey: number; entryPath: string }[];
  useSWC?: boolean;
}

export function generateWebpackConfig({ root, useSWC, entryPaths }: BuildConfigParams): Configuration[] {
  const libs = path.resolve(root, './libs');
  const deps = path.resolve(root, './deps');
  const src = path.resolve(root, './src');

  const libPaths = fs.readdirSync(libs).map(name => path.resolve(libs, name));
  const libsNodeModules = libPaths.map(i => path.resolve(i, 'node_modules'));
  const libsSrc = libPaths.map(i => path.resolve(i, 'src'));

  const config = entryPaths.map(({ pageKey, entryPath }) => {
    const output = entryPaths.length > 1 ? path.resolve(root, `./dist/${pageKey}`) : path.resolve(root, `./dist`);
    return <Configuration>{
      entry: entryPath,
      output: { path: output },
      resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.scss', '.css'],
        modules: [entryPath, src, deps, ...libsNodeModules, ...libsSrc],
        symlinks: false,
      },
      module: {
        rules: [
          useSWC ? getSWConfig() : getBabelConfig(),
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
          filename: `index.css`,
        }),
        new webpack.EnvironmentPlugin({
          SSR: false,
          ENV: 'production',
          WEBPACK_ENV: 'production',
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
  });

  console.log('config: ', config);

  return config;
}
