// eslint-disable-next-line
const { override, addWebpackModuleRule, addWebpackResolve, setWebpackPublicPath } = require('customize-cra');

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
