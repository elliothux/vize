// eslint-disable-next-line
const { override, addWebpackModuleRule, addWebpackResolve, removeModuleScopePlugin } = require('customize-cra');

module.exports = override(
  addWebpackResolve({ symlinks: false }),
  addWebpackModuleRule({
    test: /\.raw\.svg$/,
    use: [{ loader: 'raw-loader' }],
  }),
);
