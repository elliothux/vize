/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const {
  override,
  addWebpackModuleRule,
  addLessLoader,
  babelInclude,
  adjustStyleLoaders,
  addWebpackPlugin,
} = require('customize-cra');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');

if (process.env.NODE_ENV !== 'production') {
  require('../../scripts/watcher');
}

module.exports = {
  webpack: override(
    adjustStyleLoaders(({ use: [, css, postcss, resolve, processor] }) => {
      css.options.sourceMap = true;
      postcss.options.sourceMap = true;
      if (resolve) {
        resolve.options.sourceMap = true;
      }
      if (processor && processor.loader.includes('sass-loader')) {
        processor.options.sourceMap = true;
        processor.options.implementation = require('sass');
      }
    }),
    addWebpackModuleRule({
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
    }),
    addWebpackModuleRule({
      test: /\.raw\.svg$/,
      use: [{ loader: 'raw-loader' }],
    }),
    babelInclude([path.resolve(__dirname, './src'), path.resolve(__dirname, '../../node_modules/@vize/types')]),
    addLessLoader({
      strictMath: false,
      noIeCompat: true,
      javascriptEnabled: true,
    }),
    setOutputPublicPath('/editor/'),
    addWebpackPlugin(new BundleAnalyzerPlugin()),
    process.env.NODE_ENV === 'production'
      ? addWebpackPlugin(
          new SentryWebpackPlugin({
            authToken: '315829bc1e4e47be9cdcf01cf4af6cd90a87b3f67d664d7991dd0ef935d664c0',
            org: 'vize',
            project: 'editor',
            release: '0.1',
            include: 'src',
            ignore: ['node_modules', 'webpack.config.js'],
          }),
        )
      : undefined,
  ),
};

function setOutputPublicPath(publicPath) {
  return function(config) {
    if (typeof config !== 'object') {
      return config;
    }

    config.output.publicPath = publicPath;
    return config;
  };
}
