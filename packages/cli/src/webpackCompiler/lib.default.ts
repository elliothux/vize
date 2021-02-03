/* eslint-disable max-lines */
import webpack, { Configuration } from 'webpack';
import { MaterialsLibRuntime } from '@vize/types';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { getLibRaxWebpackConfig } from './lib.rax';
import { Options } from './index';
import { getBabelConfig, getSWConfig } from './babel';

// TODO: refactor
// eslint-disable-next-line max-lines-per-function
export function getLibDefaultWebpackConfig({ libConfig, libPaths, isProd, withForms, useSWC }: Options): Configuration {
  const {
    root,
    mainEntryTemp,
    metaEntryTemp,
    formsEntryTemp,
    dist,
    nodeModules,
    src,
    containerList,
    containerEntry,
    containerHTML,
    containerName,
  } = libPaths;
  const { libName, runtime } = libConfig;

  const config = <Configuration>{
    context: root,
    output: {
      path: dist,
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
        useSWC && runtime === 'react' ? getSWConfig() : getBabelConfig(),
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
    externals: {
      antd: 'Antd',
      react: 'React',
      'react-dom': 'ReactDom',
      'react-dom/server': 'ReactDomServer',
      '@formily/antd': 'Formily',
    },
    mode: isProd ? 'production' : 'development',
    devtool: 'source-map',
    optimization: {
      minimize: false,
      noEmitOnErrors: true,
    },
  };

  const entryConfig: { [key: string]: string } = {
    main: mainEntryTemp,
    meta: metaEntryTemp,
  };

  if (withForms) {
    entryConfig['form'] = formsEntryTemp;
  }

  if (isProd) {
    containerList.forEach(({ name, entry, html }) => {
      entryConfig[`container_${name}-entry`] = entry;
      entryConfig[`container_${name}-html`] = html;
    });

    // const entry: Entry = {};
    // componentsList.forEach(({ name, mainPath }) => (entry[`component-${name}`] = [...commonDeps, mainPath]));
    // pluginsList.forEach(({ name, mainPath }) => (entry[`plugin-${name}`] = [...commonDeps, mainPath]));
    // actionsList.forEach(({ name, mainPath }) => (entry[`action-${name}`] = [...commonDeps, mainPath]));
    //
    // config.entry = entry;
    // config.optimization.splitChunks = {
    //   chunks: 'all',
    //   minSize: 30,
    //   maxSize: 0,
    //   minChunks: 1,
    //   maxAsyncRequests: 6,
    //   maxInitialRequests: 4,
    //   automaticNameDelimiter: '~',
    //   cacheGroups: {
    //     vendor: {
    //       name: 'vendor',
    //       chunks: 'initial',
    //       priority: 2,
    //       minChunks: 2,
    //     },
    //     styles: {
    //       name: 'styles',
    //       test: /\.css$/,
    //       chunks: 'all',
    //       enforce: true,
    //       priority: 20,
    //     },
    //   },
    // };
  } else {
    entryConfig[`container_${containerName}-entry`] = containerEntry;
    entryConfig[`container_${containerName}-html`] = containerHTML;
  }

  config.entry = entryConfig;

  if (runtime === MaterialsLibRuntime.RAX) {
    return getLibRaxWebpackConfig(config);
  }

  return config;
}
