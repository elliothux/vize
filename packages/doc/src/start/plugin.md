---
meta:
  - name: description
    content: 页面容器
  - name: keywords
    content: 开发 快速上手
---

# 开发插件

插件（Plugin）通常作为页面全局逻辑，参考：

## 1. 创建插件

在素材库目录下执行 `vize create-plugin MyFirstPlugin`

## 2. 编辑插件表单

编辑 `src/plugins/MyFirstPlugin/config.ts`:

```ts
// 数据配置表单
// 将展示在编辑器属性编辑栏的【数据】Tab 中
const dataForm = {
  text: {
    title: '提示语',
    default: 'Hello World',
    type: 'string',
  },
};

export default {
  info: { ... },
  dataForm
}
```

## 3. 编辑插件逻辑

编辑 `src/plugins/MyFirstPlugin/index.ts`:

```ts
// 【数据】表单的内容作为 data 传入组件
export default function MyFirstPlugin({ data }) {
  const { text } = data;
  window.alert(text);
}
```
