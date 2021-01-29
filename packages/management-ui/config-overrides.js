// eslint-disable-next-line
const { override, addWebpackModuleRule, addWebpackResolve, addLessLoader } = require('customize-cra');

module.exports = override(
  addWebpackResolve({ symlinks: false }),
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
