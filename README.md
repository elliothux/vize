# Vize

## 开发指南

-   先安装`npm i lerna -g`
-   项目根目录下运行 `npm i`
-   项目根目录下运行 `npm run bootstrap`
-   项目根目录下运行 `npm run softlink`
-   构建 CLI：在 `package/cli` 下运行 `npm run dist`
-   使用 CLI 启动 DevServer：在 `packages/materials-universal` 下运行 `<path-to-your-project>/packages/cli/bin/vize.js dev ./`
-   启动编辑器：在 `packages/editor` 下运行 `npm run start`，在打开的页面中加上参数 `debugPorts=4567&libs=universal&key=test&container=universal`

后续每次运行只需要执行最后两步