---
meta:
  - name: description
    content: 组件
  - name: keywords
    content: 开发 组件 component 素材 dev
---

# 组件（Component）

组件是组成页面中最基础的部分，也是 Vize 系统最小粒度的可编辑视图。

目前 Vize 也已经支持使用 **React** 或者 **Rax** 来编写组件，对 Vue 的支持正在规划中。

## 1. 创建组件

使用 Vize CLI 在**物料库库根目录下**运行 `vize create-component <name>`  
组件文件的路径为 `src/components/<name>`

件结构如下：

```
Component
├── config.ts ·········· 组件配置
├── index.tsx ·········· 组件视图
├── thumb.svg ·········· 组件 Icon
├── preview.jpg ········ 组件预览图（可选）
└── index.scss ········· 组件样式（可选）
```

## 2. 组件配置

文件名为 `config.ts`。组件配置包括基础信息、组件表单等属性，作为 Object 导出。

### 组件基础信息

info 字段：

- name: 组件名
- desc: 组件描述提示
- author: 作者

### 组件表单

组件的可配置项在编辑器中以表单的形式出现，表单数据将作为 Props 传入组件。

表单的配置默认为 JSON-Schema 格式，使用方法参考 [JSON Schema Form](/dev-json-schema-form/) 。

JSON-Schema 满足大多场景下的需求。除此之外，Vize 还支持 DynamicForm 等高级特性用于实现表单，参考：[Override Form](/dev-override-form/)。

组件的表单包括以下可选的两项：

- dataForm：数据配置表单，将在编辑器中的 **“数据”** Tab 中展示，值以 `data` 字段传入组件。
- styleForm：样式配置表单，将在编辑器中的 **“样式”** Tab 中展示，值以 `style` 字段传入组件。

示例参考：[materials-universal/components/Text/config.ts](https://github.com/vize-team/vize/blob/master/packages/materials-universal/src/components/Text/config.ts)

## 3. 组件视图

组件的渲染逻辑，以 React 组件的形式导出。

组件的 data 和 style 分别作为 props 以 Object 传入。

组件依赖的样式可以在该文件中直接引入，目前支持 `css`、`scss/sass` 和 `less`。

示例参考：[materials-universal/components/Text/index.ts](https://github.com/vize-team/vize/blob/master/packages/materials-universal/src/components/Text/index.ts)

## 4. Icon 和预览

文件名为 `thumb.*`（必选）和 `preview.*`（可选）。组件在编辑器中展示的 Icon，支持 `svg`、`png`、`jp(e)g`。

## 5. 更多示例

参考：[materials-universal/components](https://github.com/vize-team/vize/blob/master/packages/materials-universal/src/components)
