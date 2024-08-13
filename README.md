# Vize：现代化的 Web 可视化编排引擎

## ⚠️ 警告 Warning

此项目仍处于开发状态，某些功能可能不稳定，部分 API 也可能会有变动。

This is an **experimental** project and is still in development. BUGs may exist. APIs and features may change.

## ✨ 特性

- 丰富的物料抽象粒度
- 强大的可配置事件系统
- 友好、便捷的可视化编辑体验
- 支持物料间联动
- 友好、一致的物料 API
- 完全所见即所得
- 丰富的拓展接口
- 物料与系统完全解耦
- 完备的开发工具链支持
- 开箱即用的接入方式
- ...

## 📖 文档

[Vize Docs](https://vize-team.github.io/)

## 🛠 部署

参考：[部署服务](https://vize-team.github.io/deploy/intro.html)

## 👨‍💻 开发者

核心架构 & 开发：**[elliothux@github](https://github.com/elliothux)**

贡献者：

- [Copyes@github](https://github.com/Copyes)

## 📦 核心包 Core Packages

| Description    | Package                                                                                           | NPM Package                                                              | Status                                                                                                                      |
| -------------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| 后端服务       | [cgi](https://github.com/vize-team/vize/tree/master/packages/cgi)                                 | [@vize/cgi](https://www.npmjs.com/package/@vize/cgi)                     | ![version](https://img.shields.io/npm/v/@vize/cgi) ![download](https://img.shields.io/npm/dw/@vize/cgi)                     |
| CLI            | [cli](https://github.com/vize-team/vize/tree/master/packages/cli)                                 | [@vize/cli](https://www.npmjs.com/package/@vize/cli)                     | ![version](https://img.shields.io/npm/v/@vize/cli) ![download](https://img.shields.io/npm/dw/@vize/cli)                     |
| 文档           | [doc](https://github.com/vize-team/vize/tree/master/packages/doc)                                 | -                                                                        | -                                                                                                                           |
| 编辑器         | [editor](https://github.com/vize-team/vize/tree/master/packages/editor)                           | [@vize/editor](https://www.npmjs.com/package/@vize/editor)               | ![version](https://img.shields.io/npm/v/@vize/editor) ![download](https://img.shields.io/npm/dw/@vize/editor)               |
| Web 页面生成器 | [generator-web](https://github.com/vize-team/vize/tree/master/packages/generator-web)             | [@vize/generator-web](https://www.npmjs.com/package/@vize/generator-web) | ![version](https://img.shields.io/npm/v/@vize/generator-web) ![download](https://img.shields.io/npm/dw/@vize/generator-web) |
| 国际化支持     | [i18n](https://github.com/vize-team/vize/tree/master/packages/i18n)                               | -                                                                        | -                                                                                                                           |
| 管理端 UI      | [management-ui](https://github.com/vize-team/vize/tree/master/packages/management-ui)             | [@vize/management-ui](https://www.npmjs.com/package/@vize/management-ui) | ![version](https://img.shields.io/npm/v/@vize/management-ui) ![download](https://img.shields.io/npm/dw/@vize/management-ui) |
| 通用物料库     | [materials-universal](https://github.com/vize-team/vize/tree/master/packages/materials-universal) | -                                                                        | -                                                                                                                           |
| Web 页面发布器 | [publisher-web](https://github.com/vize-team/vize/tree/master/packages/publisher-web)             | [@vize/publisher-web](https://www.npmjs.com/package/@vize/publisher-web) | ![version](https://img.shields.io/npm/v/@vize/publisher-web) ![download](https://img.shields.io/npm/dw/@vize/publisher-web) |
| Web 运行时     | [runtime-web](https://github.com/vize-team/vize/tree/master/packages/runtime-web)                 | [@vize/runtime-web](https://www.npmjs.com/package/@vize/runtime-web)     | ![version](https://img.shields.io/npm/v/@vize/runtime-web) ![download](https://img.shields.io/npm/dw/@vize/runtime-web)     |
| 类型声明       | [types](https://github.com/vize-team/vize/tree/master/packages/types)                             | [@vize/types](https://www.npmjs.com/package/@vize/types)                 | ![version](https://img.shields.io/npm/v/@vize/types) ![download](https://img.shields.io/npm/dw/@vize/types)                 |

## 📦 周边生态

| Description       | Package                                                                                       | NPM Package                                                                  | Status                                                                                                                          |
| ----------------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Mobx 状态时间旅行 | [mobx-time-traveler](https://github.com/Aedron/mobx-time-traveler)                            | [mobx-time-traveler](https://www.npmjs.com/package/mobx-time-traveler)       | ![version](https://img.shields.io/npm/v/mobx-time-traveler) ![download](https://img.shields.io/npm/dw/mobx-time-traveler)       |
| 富文本编辑器      | [richtext-editor](https://github.com/vize-team/components/tree/main/packages/richtext-editor) | [@vize/richtext-editor](https://www.npmjs.com/package/@vize/richtext-editor) | ![version](https://img.shields.io/npm/v/@vize/richtext-editor) ![download](https://img.shields.io/npm/dw/@vize/richtext-editor) |
| 富文本渲染器      | [richtext-render](https://github.com/vize-team/components/tree/main/packages/richtext-render) | [@vize/richtext-render](https://www.npmjs.com/package/@vize/richtext-render) | ![version](https://img.shields.io/npm/v/@vize/richtext-render) ![download](https://img.shields.io/npm/dw/@vize/richtext-render) |

## 📦 模板

| Description           | Package                                                                                                      | NPM Package                                                                                           | Status                                                                                                                                              |
| --------------------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| 部署模板项目          | [deploy-boilerplate](https://github.com/vize-team/vize-deploy-boilerplate)                                   | -                                                                                                     | -                                                                                                                                                   |
| 动作模板              | [boilerplate-action](https://github.com/vize-team/boilerplates/tree/main/packages/boilerplate-action)        | [@vize/boilerplate-action](https://www.npmjs.com/package/@vize/boilerplate-action)                    | ![version](https://img.shields.io/npm/v/@vize/boilerplate-action) ![download](https://img.shields.io/npm/dw/@vize/boilerplate-action)               |
| 组件模板              | [boilerplate-action](https://github.com/vize-team/boilerplates/tree/main/packages/boilerplate-component)     | [@vize/boilerplate-component](https://www.npmjs.com/package/@vize/boilerplate-component)              | ![version](https://img.shields.io/npm/v/@vize/boilerplate-component) ![download](https://img.shields.io/npm/dw/@vize/boilerplate-component)         |
| 页面容器模板          | [boilerplate-action](https://github.com/vize-team/boilerplates/tree/main/packages/boilerplate-container)     | [@vize/boilerplate-container](https://www.npmjs.com/package/@vize/boilerplate-container)              | ![version](https://img.shields.io/npm/v/@vize/boilerplate-container) ![download](https://img.shields.io/npm/dw/@vize/boilerplate-container)         |
| 自定义表单 field 模板 | [boilerplate-action](https://github.com/vize-team/boilerplates/tree/main/packages/boilerplate-form-field)    | [@vize/boilerplate-form-field](https://www.npmjs.com/package/@vize/boilerplate-form-field)            | ![version](https://img.shields.io/npm/v/@vize/boilerplate-form-field) ![download](https://img.shields.io/npm/dw/@vize/boilerplate-form-field)       |
| 自定义表单校验模板    | [boilerplate-action](https://github.com/vize-team/boilerplates/tree/main/packages/boilerplate-form-rule)     | [@vize/boilerplate-form-rule](https://www.npmjs.com/package/@vize/boilerplate-form-rule)              | ![version](https://img.shields.io/npm/v/@vize/boilerplate-form-rule) ![download](https://img.shields.io/npm/dw/@vize/boilerplate-form-rule)         |
| 物料库模板            | [boilerplate-action](https://github.com/vize-team/boilerplates/tree/main/packages/boilerplate-materials-lib) | [@vize/boilerplate-form-materials-lib](https://www.npmjs.com/package/@vize/boilerplate-materials-lib) | ![version](https://img.shields.io/npm/v/@vize/boilerplate-materials-lib) ![download](https://img.shields.io/npm/dw/@vize/boilerplate-materials-lib) |
| 插件模板              | [boilerplate-action](https://github.com/vize-team/boilerplates/tree/main/packages/boilerplate-plugin)        | [@vize/boilerplate-plugin](https://www.npmjs.com/package/@vize/boilerplate-plugin)                    | ![version](https://img.shields.io/npm/v/@vize/boilerplate-plugin) ![download](https://img.shields.io/npm/dw/@vize/boilerplate-plugin)               |

[stars]: https://img.shields.io/github/stars/vize-team/vize?style=social&label=Stars&style=plastic
[forks]: https://img.shields.io/github/forks/vize-team/vize?style=social&label=Forks&style=plastic
[issues]: https://img.shields.io/github/issues/vize-team/vize?style=social&label=Issues&style=plastic
[pr]: https://img.shields.io/github/issues-pr/vize-team/vize?style=social&label=PullRequests&style=plastic
[closed-pr]: https://img.shields.io/github/issues-pr-closed/vize-team/vize?style=social&label=PullRequests&style=plastic

