// eslint-disable-next-line
const { override, addWebpackModuleRule, addWebpackResolve } = require('customize-cra');

module.exports = override(
  addWebpackResolve({ symlinks: false }),
  addWebpackModuleRule({
    test: /\.iframe\.(scss|sass|css)$/,
    use: [{ loader: 'css-to-string-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }],
  }),
  addWebpackModuleRule({
    test: /\.raw\.svg$/,
    use: [{ loader: 'raw-loader' }],
  }),
);
