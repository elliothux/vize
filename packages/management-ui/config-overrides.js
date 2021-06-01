/* eslint-disable @typescript-eslint/no-var-requires */
const {
  override,
  addWebpackModuleRule,
  addWebpackResolve,
  addLessLoader,
  adjustStyleLoaders,
} = require('customize-cra');

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
);
