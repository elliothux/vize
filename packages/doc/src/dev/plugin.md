---
meta:
  - name: description
    content: 插件
  - name: keywords
    content: 开发 插件 plugin 素材 dev
---

# 插件（Plugin）

插件是页面中执行的一段逻辑，通常用作全局的功能（如环境检测、自定义上报等）。在页面加载完成后立即执行。

:::warning ⚠️ 注意
一个页面中，同一个插件只能被添加一次。插件本身与前端框架不耦合。
:::

## 1. 创建插件

使用 Vize CLI 在**素材库根目录下**运行 `vize create-plugin <name>`。  
在`src/plugins/<name>`目录下创建组件。

插件结构如下：

```
Plugin
├── config.js ·········· 插件配置
├── index.js ··········· 插件逻辑
├── preview.jpg ········ 插件预览图（可选）
└── thumb.svg ·········· 插件 Icon
```

## 2. 插件配置

文件名为 `config.ts`。与组件类似，插件配置包括基础信息、表单等属性。

### 插件基础信息

`info` 包含以下字段：

- `name`: 插件名
- `desc`: 插件描述提示
- `author`: 作者

### 插件表单

与组件类似，插件的可配置项在编辑器中以表单的形式出现，表单数据将作为参数传入插件函数。

表单的配置方式与组件相同，参考：[组件表单](/dev/component.html#组件表单)。

示例参考：[vize/materials-universal/plugins/Share/config.ts](https://github.com/vize-team/vize/blob/master/packages/materials-universal/src/plugins/Share/config.ts)

## 3. 插件逻辑

文件名为 `index.ts`。以 Function 导出。插件的逻辑，将会在页面渲染之后执行。

表单的数据以 `data` 为参数名传入插件函数。

示例参考：[vize/materials-universal/plugins/Share/index.ts](https://github.com/vize-team/vize/blob/master/packages/materials-universal/src/plugins/Share/index.ts)

## 4. Icon 和预览

配置方式与组件相同，参考：[组件 Icon](/dev/component.html#_4-icon-和预览)。

## 5. 更多示例

参考：[vize/materials-universal/plugins](https://github.com/vize-team/vize/blob/master/packages/materials-universal/src/plugins)
