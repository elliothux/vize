/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { override, addWebpackModuleRule, addWebpackResolve, addLessLoader, babelInclude } = require('customize-cra');

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
  babelInclude([path.resolve(__dirname, './src'), path.resolve(__dirname, '../../node_modules/@vize/types')]),
  addLessLoader({
    strictMath: false,
    noIeCompat: true,
    javascriptEnabled: true,
  }),
  // setWebpackPublicPath('/editor/'),
  setOutputPublicPath('/editor/'),
);

function setOutputPublicPath(publicPath) {
  return function(config) {
    if (typeof config !== 'object') {
      return config;
    }

    config.output.publicPath = publicPath;
    return config;
  };
}
