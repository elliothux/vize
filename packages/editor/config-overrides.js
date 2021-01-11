// eslint-disable-next-line
const { override, addWebpackModuleRule, addWebpackResolve, setWebpackPublicPath } = require('customize-cra');

module.exports = function override(config, env) {
  if (typeof config !== 'object') {
    return config;
  }

  config.output.publicPath = '/editor';
  return override(
    addWebpackResolve({ symlinks: false }),
    addWebpackModuleRule({
      test: /\.iframe\.(scss|sass|css)$/,
      use: [{ loader: 'css-to-string-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }],
    }),
    addWebpackModuleRule({
      test: /\.raw\.svg$/,
      use: [{ loader: 'raw-loader' }],
    }),
    // setWebpackPublicPath('editor'),
  )(config, env);
};
