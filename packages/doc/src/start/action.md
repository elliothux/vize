---
meta:
  - name: description
    content: 页面容器
  - name: keywords
    content: 开发 快速上手
---

# 开发动作

动作（Action）是由用户主动触发的一段逻辑，参考：

## 1. 创建动作

在素材库目录下执行 `vize create-action MyFirstAction`

## 2. 编辑动作表单

编辑 `src/actions/MyFirstAction/config.ts`:

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

## 3. 编辑动作逻辑

编辑 `src/actions/MyFirstAction/index.ts`:

```ts
// 【数据】表单的内容作为 data 传入组件
export default function MyFirstAction({ data }) {
  const { text } = data;
  window.alert(text);
}
```
