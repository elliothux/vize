const { override, addWebpackModuleRule } = require("customize-cra");

module.exports = override(
  addWebpackModuleRule({
    test: /\.iframe\.(scss|sass|css)$/,
    use: [
      { loader: "css-to-string-loader" },
      { loader: "css-loader" },
      { loader: "sass-loader" }
    ]
  })
);
