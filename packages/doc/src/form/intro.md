---
meta:
  - name: description
    content: 开发：JSON Schema Form
  - name: keywords
    content: 开发 表单 dev JSON Schema Form
---

# 了解表单

Vize 中的所有物料都是可配置的，而所有的配置项都依赖表单来编辑。

## 1. 实现方式

Vize 同时支持以下几种表单的实现方式：

- **[静态表单](/form/jsonSchema.html)**：声明静态 JSON Schema 实现
- **[动态表单](/form/dynamicForm.html#_1-dynamicform)**：动态渲染自定义的表单组件
- **[动态 Schema](/form/dynamicForm.html#_2-动态-json-schema)**：通过 Vize 提供的 JSON-Schema 组件，动态传入 Schema 来渲染表单

## 2. 字段

所有的表单都在配置文件 **`config.ts`** 中声明：

- **`dataForm`** 字段声明的表单，在编辑器中展示在 **"数据"** Tab 中，表单的值作为 **`data`** 传入物料
- 组件 **`styleForm`** 字段声明的表单，在编辑器中展示在 **"样式"** Tab 中，表单的值作为 **`style`** 传入组件
