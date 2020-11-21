/* eslint-disable max-lines */
import webpack, { Configuration, Entry } from 'webpack';
import { LibConfigRuntime } from '../config';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { getLibRaxWebpackConfig } from './lib.rax';
import { Options } from './index';
import { getBabelConfig, getSWConfig } from './babel';

const commonDeps = ['react', 'react-dom'];

// TODO: refactor
// eslint-disable-next-line max-lines-per-function
export function getLibDefaultWebpackConfig({ libConfig, libPaths, isProd, useSWC }: Options): Configuration {
  const {
    root,
    mainEntryTemp,
    metaEntryTemp,
    output,
    nodeModules,
    src,
    containerEntry,
    containerHTML,
    componentsList,
    pluginsList,
    actionsList,
  } = libPaths;
  const { libName, runtime } = libConfig;

  const config = <Configuration>{
    context: root,
    output: {
      path: output,
      filename: `@vize-materials-${libName}-[name].js`,
      library: `@vize-materials-${libName}-[name]`,
      libraryTarget: 'window',
      umdNamedDefine: true,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.scss', '.css'],
      modules: [nodeModules, src],
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

  if (isProd) {
    const entry: Entry = {};
    componentsList.forEach(({ name, mainPath }) => (entry[`component-${name}`] = [...commonDeps, mainPath]));
    pluginsList.forEach(({ name, mainPath }) => (entry[`plugin-${name}`] = [...commonDeps, mainPath]));
    actionsList.forEach(({ name, mainPath }) => (entry[`action-${name}`] = [...commonDeps, mainPath]));

    config.entry = entry;
    config.optimization.splitChunks = {
      chunks: 'all',
      minSize: 30,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 6,
      maxInitialRequests: 4,
      automaticNameDelimiter: '~',
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          priority: 2,
          minChunks: 2,
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
          priority: 20,
        },
      },
    };
  } else {
    config.entry = {
      main: mainEntryTemp,
      meta: metaEntryTemp,
      entry: containerEntry,
      html: containerHTML,
    };
    config.externals = {
      react: 'React',
      antd: 'Antd',
      'react-dom': 'ReactDom',
      'react-dom/server': 'ReactDomServer',
    };
  }

  if (runtime === LibConfigRuntime.RAX) {
    return getLibRaxWebpackConfig(config);
  }

  return config;
}
