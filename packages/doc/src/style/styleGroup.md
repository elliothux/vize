---
meta:
  - name: description
    content: 开发：StyleGroup
  - name: keywords
    content: 开发 表单 dev style StyleGroup css
---

# Style Group

组件通常有丰富的样式特性可以定制，但这也意味着需要为每一个定制化样式声明表单，并将表单的值手动转换为 CSS 属性后应用到视图节点。

并且存在很多常用样式属性，如颜色、字体等。它们在大多数组件内都会重复出现。这通常意味着大量重复且枯燥的表单开发和属性转换工作。

这时，我们可以通过 Vize 提供的 **Style-Group API** 来方便快速地完成上述工作。

## 1. 概念

Style Group 是一组用于声明样式表单的 Schema。

将一组常用的样式属性作为一个字段声明，Vize 将会根据声明自动生成体验友好的样式表单，并将样式表单值自动自动转换为 CSS 属性，作为 Props 传入组件。

## 2. 声明 Style Group

声明 Style Group 非常简单，只需要在组件配置文件 `config.tx` 中，声明 **`enableStyleGroup`** 字段。

然后就可以在组件视图文件 `index.tsx` 中，以 `commonStyle` 获取样式的值。

示例，实现一个支持定制边框和背景样式，且默认背景色为红色的按钮：

编辑 `config.tx`：

```ts {9,10,11,12,17}
const dataForm = {
  text: {
    title: '按钮文字',
    default: '按钮',
    type: 'string',
  },
};

const enableStyleGroup = {
  border: true,
  background: { color: 'red' },
};

export default {
  info: { ... },
  dataForm,
  enableStyleGroup,
};
```

编辑 `index.tsx`：

```tsx {4}
import * as React from 'react';

export default function Button({ data: { text }, commonStyle }) {
  return <button style={commonStyle}>{text}</button>;
}
```

## 3. 可用的字段

所有的 Style Group 字段都是可选的：

- 值为 `true`，表示启用 Style Group，使用预设默认值。
- 值为 `object | number`，表示启用 Style Group 并具有默认值。所有的默认值字段也是可选的。

### size

```ts
interface Size {
  width?: number;
  height?: number;
}
```

### transform

```ts
interface Transform {
  rotate?: number;
  opacity?: number;
  scale?: number;
  radius?: number;
}
```

### text

```ts
interface Text {
  color?: string;
  fontSize?: number;
  lineHeight?: number;
  textAlign?: 'left' | 'center' | 'right';
  weight?: 'lighter' | 'bolder' | 'normal';
}
```

### border

```ts
interface Border {
  type?: 'none' | 'solid' | 'dashed';
  color?: string;
  width?: number;
}
```

### background

```ts
interface Background {
  color?: string;
  image?: string;
}
```

### zIndex

```ts
type zIndex = number;
```

### margin

```ts
interface Margin {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}
```

### padding

```ts
interface Padding {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}
```

### position

```ts
interface Position {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}
```

示例参考：[vize/materials-universal/components/Text/index.ts](https://github.com/vize-team/vize/blob/master/packages/materials-universal/src/components/Text/index.ts)
