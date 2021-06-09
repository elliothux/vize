/* eslint-disable @typescript-eslint/no-var-requires */
const {
  override,
  addWebpackModuleRule,
  addWebpackResolve,
  addLessLoader,
  adjustStyleLoaders,
  addWebpackPlugin,
} = require('customize-cra');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');

module.exports = override(
  addWebpackResolve({ symlinks: false }),
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
    test: /\.raw\.svg$/,
    use: [{ loader: 'raw-loader' }],
  }),
  addLessLoader({
    strictMath: false,
    noIeCompat: true,
    javascriptEnabled: true,
  }),
  process.env.NODE_ENV === 'production'
    ? addWebpackPlugin(
        new SentryWebpackPlugin({
          authToken: '315829bc1e4e47be9cdcf01cf4af6cd90a87b3f67d664d7991dd0ef935d664c0',
          org: 'vize',
          project: 'management-ui',
          release: '0.1',
          include: 'src',
          ignore: ['node_modules', 'webpack.config.js'],
        }),
      )
    : undefined,
);
