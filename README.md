# Vize

## 开发指南

-   项目根目录下运行 `npm i`
-   项目根目录下运行 `lerna bootstrap`
-   构建 CLI：在 `package/cli` 下运行 `npm run dist`
-   使用 CLI 启动 DevServer：在 `package/materials-universal` 下运行 `<path-to-your-project>/packages/cli/bin/vize.js dev ./`
-   启动编辑器：在 `package/editor` 下运行 `npm run start`，在打开的页面中加上参数 `debugPorts=4567&libs=universal`

后续每次运行只需要执行最后两步