# Vize: 现代化的 Web 可视化搭建引擎

文档: [https://vize-team.github.io/](https://vize-team.github.io/)

## ⚠️ 警告 Warning

此项目仍处于开发状态，某些功能可能不稳定，部分 API 也可能会有变动。

This is an **experimental** project and is still in development. BUGs may exist. APIs and features may change.

## ✨ 特性 Features

- 友好、便捷的可视化编辑体验
- 完全所见即所得
- 丰富的物料抽象粒度
- 支持物料间联动，强大的可配置事件系统
- 物料与系统完全解耦
- 完备的开发工具链支持
- 便捷的接入方式

## 📦 Packages

| Package                   | Description            |
| ------------------------- | ---------------------- |
| [cgi]                     | 系统后端接口           |
| [cli]                     | CLI                    |
| [doc]                     | 文档                   |
| [editor]                  | 编辑器                 |
| [generator-web]           | DSL 到 Web 页面生成器  |
| [i18n]                    | 国际化支持             |
| [management-ui]           | 管理端 UI              |
| [materials-universal]     | 通用物料库（React）    |
| [materials-universal-rax] | 通用物料库（Rax）      |
| [publisher-web]           | 基础 Web 发布器        |
| [runtime-web]             | Web 公用运行时         |
| [runtime-web-rax]         | Web 公用运行时 for Rax |
| [types]                   | 类型声明               |

## 📦 NPM Packages

| NPM Package                           | Status                                                                             | Description                             |
| ------------------------------------- | ---------------------------------------------------------------------------------- | --------------------------------------- |
| [@vize/cli]                           | ![cli-version] ![cli-download]                                                     | CLI                                     |
| [@vize/editor]                        | ![editor-version] ![editor-download]                                               | Core editor                             |
| [@vize/types]                         | ![types-version] ![types-download]                                                 | Type Definition                         |
| [@vize/cgi]                           | ![cgi-version] ![cgi-download]                                                     | Core CGI                                |
| [@vize/management-ui]                 | ![management-ui-version] ![management-ui-download]                                 | Web Management UI                       |
| [@vize/runtime-web]                   | ![runtime-web-version] ![runtime-web-download]                                     | Web Runtime for React                   |
| [@vize/runtime-web-rax]               | ![runtime-web-rax-version] ![runtime-web-rax-download]                             | Web Runtime for Rax                     |
| [@vize/boilerplate-action]            | ![boilerplate-action-version] ![boilerplate-action-download]                       | Boilerplate of action                   |
| [@vize/boilerplate-component]         | ![boilerplate-component-version] ![boilerplate-component-download]                 | Boilerplate of React component          |
| [@vize/boilerplate-component-rax]     | ![boilerplate-component-rax-version] ![boilerplate-component-rax-download]         | Boilerplate of Rax component            |
| [@vize/boilerplate-container]         | ![boilerplate-container-version] ![boilerplate-container-download]                 | Boilerplate of container                |
| [@vize/boilerplate-plugin]            | ![boilerplate-plugin-version] ![boilerplate-plugin-download]                       | Boilerplate of plugin                   |
| [@vize/boilerplate-form-field]        | ![boilerplate-form-field-version] ![boilerplate-form-field-download]               | Boilerplate of customization form field |
| [@vize/boilerplate-materials-lib]     | ![boilerplate-materials-lib-version] ![boilerplate-materials-lib-download]         | Boilerplate of materials lib for React  |
| [@vize/boilerplate-materials-lib-rax] | ![boilerplate-materials-lib-rax-version] ![boilerplate-materials-lib-rax-download] | Boilerplate of materials lib for Rax    |

[stars]: https://img.shields.io/github/stars/vize-team/vize?style=social&label=Stars&style=plastic
[forks]: https://img.shields.io/github/forks/vize-team/vize?style=social&label=Forks&style=plastic
[issues]: https://img.shields.io/github/issues/vize-team/vize?style=social&label=Issues&style=plastic
[pr]: https://img.shields.io/github/issues-pr/vize-team/vize?style=social&label=PullRequests&style=plastic
[closed-pr]: https://img.shields.io/github/issues-pr-closed/vize-team/vize?style=social&label=PullRequests&style=plastic
[vize]: https://github.com/vize-team/vize
[cgi]: https://github.com/vize-team/vize/tree/master/packages/cgi
[cli]: https://github.com/vize-team/vize/tree/master/packages/cli
[doc]: https://github.com/vize-team/vize/tree/master/packages/doc
[editor]: https://github.com/vize-team/vize/tree/master/packages/editor
[generator-web]: https://github.com/vize-team/vize/tree/master/packages/generator-web
[i18n]: https://github.com/vize-team/vize/tree/master/packages/i18n
[management-ui]: https://github.com/vize-team/vize/tree/master/packages/management-ui
[materials-universal]: https://github.com/vize-team/vize/tree/master/packages/materials-universal
[materials-universal-rax]: https://github.com/vize-team/vize/tree/master/packages/materials-universal-rax
[publisher-web]: https://github.com/vize-team/vize/tree/master/packages/publisher-web
[runtime-web]: https://github.com/vize-team/vize/tree/master/packages/runtime-web
[runtime-web-rax]: https://github.com/vize-team/vize/tree/master/packages/runtime-web-rax
[types]: https://github.com/vize-team/vize/tree/master/packages/types
[@vize/editor]: https://www.npmjs.com/package/@vize/editor
[editor-version]: https://img.shields.io/npm/v/@vize/editor
[editor-download]: https://img.shields.io/npm/dw/@vize/editor
[@vize/cli]: https://www.npmjs.com/package/@vize/cli
[cli-version]: https://img.shields.io/npm/v/@vize/cli
[cli-download]: https://img.shields.io/npm/dw/@vize/cli
[@vize/types]: https://www.npmjs.com/package/@vize/types
[types-version]: https://img.shields.io/npm/v/@vize/types
[types-download]: https://img.shields.io/npm/dw/@vize/types
[@vize/cgi]: https://www.npmjs.com/package/@vize/cgi
[cgi-version]: https://img.shields.io/npm/v/@vize/cgi
[cgi-download]: https://img.shields.io/npm/dw/@vize/cgi
[@vize/management-ui]: https://www.npmjs.com/package/@vize/management-ui
[management-ui-version]: https://img.shields.io/npm/v/@vize/management-ui
[management-ui-download]: https://img.shields.io/npm/dw/@vize/management-ui
[@vize/runtime-web]: https://www.npmjs.com/package/@vize/runtime-web
[runtime-web-version]: https://img.shields.io/npm/v/@vize/runtime-web
[runtime-web-download]: https://img.shields.io/npm/dw/@vize/runtime-web
[@vize/runtime-web-rax]: https://www.npmjs.com/package/@vize/runtime-web-rax
[runtime-web-rax-version]: https://img.shields.io/npm/v/@vize/runtime-web-rax
[runtime-web-rax-download]: https://img.shields.io/npm/dw/@vize/runtime-web-rax
[@vize/boilerplate-action]: https://www.npmjs.com/package/@vize/boilerplate-action
[boilerplate-action-version]: https://img.shields.io/npm/v/@vize/boilerplate-action
[boilerplate-action-download]: https://img.shields.io/npm/dw/@vize/boilerplate-action
[@vize/boilerplate-component]: https://www.npmjs.com/package/@vize/boilerplate-component
[boilerplate-component-version]: https://img.shields.io/npm/v/@vize/boilerplate-component
[boilerplate-component-download]: https://img.shields.io/npm/dw/@vize/boilerplate-component
[@vize/boilerplate-component-rax]: https://www.npmjs.com/package/@vize/boilerplate-component-rax
[boilerplate-component-rax-version]: https://img.shields.io/npm/v/@vize/boilerplate-component-rax
[boilerplate-component-rax-download]: https://img.shields.io/npm/dw/@vize/boilerplate-component-rax
[@vize/boilerplate-container]: https://www.npmjs.com/package/@vize/boilerplate-container
[boilerplate-container-version]: https://img.shields.io/npm/v/@vize/boilerplate-container
[boilerplate-container-download]: https://img.shields.io/npm/dw/@vize/boilerplate-container
[@vize/boilerplate-plugin]: https://www.npmjs.com/package/@vize/boilerplate-plugin
[boilerplate-plugin-version]: https://img.shields.io/npm/v/@vize/boilerplate-plugin
[boilerplate-plugin-download]: https://img.shields.io/npm/dw/@vize/boilerplate-plugin
[@vize/boilerplate-form-field]: https://www.npmjs.com/package/@vize/boilerplate-form-field
[boilerplate-form-field-version]: https://img.shields.io/npm/v/@vize/boilerplate-form-field
[boilerplate-form-field-download]: https://img.shields.io/npm/dw/@vize/boilerplate-form-field
[@vize/boilerplate-materials-lib]: https://www.npmjs.com/package/@vize/boilerplate-materials-lib
[boilerplate-materials-lib-version]: https://img.shields.io/npm/v/@vize/boilerplate-materials-lib
[boilerplate-materials-lib-download]: https://img.shields.io/npm/dw/@vize/boilerplate-materials-lib
[@vize/boilerplate-materials-lib-rax]: https://www.npmjs.com/package/@vize/boilerplate-materials-lib-rax
[boilerplate-materials-lib-rax-version]: https://img.shields.io/npm/v/@vize/boilerplate-materials-lib-rax
[boilerplate-materials-lib-rax-download]: https://img.shields.io/npm/dw/@vize/boilerplate-materials-lib-rax
