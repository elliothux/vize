---
meta:
  - name: description
    content: 页面容器
  - name: keywords
    content: 开发 快速上手
---

# 命令

Vize-CLI 为物料库开发者提供强大的工具链支持，输入 `vize --help` 即可获得帮助信息。

## dev

开启调试服务：**`vize dev [options]`**

可选的参数：

- **`-o, --open <true | false>`**：是否自动打开调试编辑器，默认为 `true`
- **`-p, --port <port>`**：dev server 端口
- **`-r, --registry <registry>`**：下载模板和编辑器等的 NPM 软件源地址
- **`-l, --local`**：使用本地版本编辑器，否则默认会从线上获取最新版本的编辑器

## create-material

创建物料，支持如下命令：

- 创建组件：**`vize create-component <name> [options]`**
- 创建插件：**`vize create-plugin <name> [options]`**
- 创建动作：**`vize create-action <name> [options]`**
- 创建页面容器：**`vize create-container <name> [options]`**
- 创建 Schema Field：**`vize create-form-field <name> [options]`**

必须的参数：

- **`name`**：物料名（英文），CLI 将会把自动将 name 转化为符合规范的大驼峰命名

可选的参数：

- **`-r, --registry <registry>`**：下载模板的 NPM 软件源地址

## create-lib

创建物料库：**`vize create-lib <name> [options]`**

必须的参数：

- **`name`**：物料库名（英文），CLI 将会把自动将 name 转化为符合规范的大驼峰命名

可选的参数：

- **`--runtime <runtime>`**：视图层运行时，可用的值为：`react（默认）` `rax`（Vue 支持敬请期待）
- **`-r, --registry <registry>`**：下载模板的 NPM 软件源地址

## release

发布物料库：**`vize release`**

## dist

构建物料库：**`vize dist`**

一般不需要直接运行此命令，Vize-CLI 会在 release 前自动构建物料库

<br/>

::: warning ⚠️ 注意
若 `.vizerc` 和命令中都指定了 `registry`，优先使用命令行参数中的地址
:::
