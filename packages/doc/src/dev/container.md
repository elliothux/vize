---
meta:
  - name: description
    content: 页面容器
  - name: keywords
    content: 开发 页面容器 container 素材 dev
---

# 页面容器（Container）

页面容器是生成页面时的模板 HTML 和入口 JavaScript 文件，可以在页面容器中做以下事情：

- 定义页面 HTML 模板
- 执行初始化逻辑，如引入公共样式，初始化上报等
- 定义全局数据（global）
- 注册页面页面路由控制器（通常用于单页应用）

## 1. 创建页面容器

使用 Vize CLI 在**素材库根目录下**运行 `vize create-container <name>`。  
在`src/containers/<name>`目录下创建组件。

文件结构如下：

```
Container
├── config.ts ·············· 页面容器配置
├── index.html.ejs ········· 页面模板 HTML
└── index.ts ··············· 页面入口文件
```

## 2. 页面容器配置

文件名为 `config.ts`。页面容器配置包括基础信息、容器表单等属性。

### 容器基础信息

`info` 包含以下字段：

- name: 页面容器名
- desc: 页面容器描述
- author: 作者

### 全局属性

页面容器配置的 `globalDataForm` 和 `globalStyleForm` 生成的表单将作为编辑器的 **“全局属性”** 配置项。

表单的值将作为 `globalData` 和 `globalStyle` 属性传入组件、插件、动作、统一事件监听回调等。

### 页面属性

页面容器配置的 `pageDataForm` 和 `pageStyleForm` 生成的表单将作为编辑器的 **“页面属性”** 配置项。

表单的值将作为 `pageData` 和 `pageStyle` 属性传入组件、插件、动作、统一事件监听回调等。

示例参考：[vize/materials-universal/containers/universal/config.ts](https://github.com/vize-team/vize/blob/master/packages/materials-universal/src/containers/universal/config.ts)

## 3. 模板 HTML

文件名为 `index.html.ejs`。页面的 HTML 模板，可以在模板中自定义 `favicon`，插入脚本、样式，定义初始化 Loading 态等。

### 模板变量注入

模板中还支持变量注入。在模板中可以通过 `globalData` 与 `globalStyle` 访问[页面全局属性](/dev/container/#全局属性)，通过 `meta` 访问[页面元数据](/dev-meta/)。

如：

```ejs
<meta name="keywords" content="<%= globalData.keywords %>">
<meta name="description" content="<%= meta.desc %>">
<title><%= meta.title %></title>
<body style="background-color: <%= globalStyle.backgroundColor %>"></body>
```

## 4. 页面入口

文件名为 `index.ts` 文件。

可以在此做一些初始化工作，如引入公共库、初始化上报等。

示例参考：[vize/materials-universal/containers/universal/index.ts](https://github.com/vize-team/vize/blob/master/packages/materials-universal/src/containers/universal/index.ts)
