---
meta:
  - name: description
    content: 页面容器
  - name: keywords
    content: 开发 快速上手
---

# 开发组件

## 1. 创建组件

在物料库根目录下执行 `vize create-component MyFirstComponent`

## 2. 编辑组件表单

编辑 `src/components/MyFirstComponent/config.ts`:

```ts
// 数据配置表单
// 将展示在编辑器属性编辑栏的【数据】Tab 中
const dataForm = {
  text: {
    title: '内容',
    description: '请输入内容',
    type: 'string',
    default: 'Hello Vize!',
  },
};

// 样式配置表单
// 将展示在编辑器属性编辑栏的【样式】Tab 中
const styleForm = {
  color: {
    title: '文字颜色',
    type: 'string',
    'x-component': 'Color',
    default: '#000',
  },
};

export default {
  info: { ... },
  dataForm,
  styleForm
}
```

## 3. 编辑组件视图

编辑 `src/components/MyFirstComponent/index.js`:

```tsx
import * as React from 'react';

// 【数据】表单的内容作为 data 传入组件
// 【样式】表单的内容作为 style 传入组件
export default function MyFirstComponent({ data, style }) {
  const { text } = data;
  const { color } = style;

  return <h1 style={{ color }}>{text}</h1>;
}
```
