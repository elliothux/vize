---
meta:
  - name: description
    content: 动作
  - name: keywords
    content: 开发 动作 action 素材 dev
---

# 热区

HotArea（热区）是组件内一快可交互的区域，用户可在 Vize 中为支持热区的组件添加、编辑热区，并为热区绑定事件。

## 1. 声明热区支持

在组件 `config.ts` 内声明 `hotArea: true` 即可支持热区。

:::warning ⚠️ 注意
热区的位置与大小是相对于组件的宽高比计算的，因此支持热区的组件必须保证在编辑器和最终的页面内**宽高比保持一定**。
:::

## 2. 渲染热区

Vize 将会把热区作为 React 节点以 `hotAreas` 字段传入支持热区的组件，物料开发者需要在组件内手动渲染热区。

如，实现支持热区的图片组件：

```tsx {11}
import * as React from 'react';
import { ComponentProps } from '@vize/types';

interface Data {
  src: string;
}

export default function Image({ data: { src }, hotAreas }: ComponentProps<Data>) {
  return (
    <div className="my-image" style={{ position: 'relative' }}>
      {hotAreas}
      <img src={src} alt="image" />
    </div>
  );
}
```

:::warning ⚠️ 注意
热区相对于组件使用 `absolute` 定位，因此组件根节点的 `position` 属性**不能为 `static`**。
:::
