---
meta:
  - name: description
    content: 页面容器
  - name: keywords
    content: 开发 快速上手
---

# 了解物料库

## 1. 概念

物料是 Vize 系统内所有可编辑元素的统称，也是页面产物的基本组件元素。

得益于 `editor` 与 `materials` 完全解耦的架构，Vize 系统支持开发者快速接入物料库，而无需运行整个系统，也无需了解系统内部的任何细节。

Vize 的物料库为 **UMD bundle**，通过内置的 loader 加载到编辑器。

::: tip 🌟 提示
Vize 官方维护了一套基础物料，不创建物料库也可使用。
:::

## 2. 创建物料库

物料库可通过 CLI 一键创建。通常一个接入方创建一个独立的物料库，为了方便管理，一个物料库通常为一个独立的 Git 仓库。

- 安装 CLI：`npm install -g @vize/cli`
- 创建项目：`vize create-lib <name>`

::: tip 🌟 提示
可指定 CLI 使用特定软件源，如：  
`vize create-lib <name> -r https://registry.npmjs.org`
:::

## 3. 结构

物料库包含 `Components（组件）`、`Plugins（插件）`、`Actions（动作）`、`Container（页面容器）`四个部分。每一个部分都是 **可选的**。

物料库项目结构如下：

```log{3-6}
Materials
├── src ················ 素材源码
│   ├── components ····· 组件
│   ├── plugins ········ 插件
│   ├── actions ········ 动作
│   ├── containers ····· 页面容器
│   ├── assets ········· 静态资源等（可选）
│   └── lib ············ 公用模块等（可选）
├── dist ··············· 构建输出目录
│── .vizerc ············ 物料库配置文件
│── package.json
└── tsconfig.json
```
