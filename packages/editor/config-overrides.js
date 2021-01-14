const {
  override,
  addWebpackModuleRule,
  addWebpackResolve,
  addLessLoader,
  setWebpackPublicPath,
  // eslint-disable-next-line
} = require('customize-cra');

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
  addLessLoader({
    strictMath: false,
    noIeCompat: true,
    javascriptEnabled: true,
  }),
  setWebpackPublicPath('/editor/'),
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
