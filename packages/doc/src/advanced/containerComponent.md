---
meta:
  - name: description
    content: 开发：组件嵌套
  - name: keywords
    content: 开发 组件嵌套 容器组件 dev
---

# 组件嵌套

常规的组件是互相独立的，但有的场景需要我们的组件能够作为 Parent component（容器父组件）接受子组件（如复杂布局、组合表单等）。Vize 支持对组件进行嵌套。

## 1. 声明 Container

Container 组件只需要在组件配置文件 `config.ts` 内声明 `isContainer: true` 即可。其余特性与普通组件一致。

## 2. 接受子组件

声明了 `isContainer` 的组件在编辑器中将能够添加子组件。与常规的 React 嵌套组件类似，子组件将作为 `ReactNode` 以 `children` 字段传入组件。

## 3. 示例

实现一个弹窗容器组件：

编辑 `config.ts`：

```ts {8}
export default {
  info: { ... },
  isContainer: true,
  hideEditMask: true,
};
```

编辑 `index.tsx`：

```tsx {36}
import './index.scss';
import * as React from 'react';
import { createPortal } from 'react-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface Props {
  onSelected: Function;
}

function createEntryNode(): HTMLDivElement {
  const node = document.createElement('div');
  document.body.appendChild(node);
  return node;
}

function Container({ children, onSelected }: React.PropsWithChildren<Props>) {
  const [visible, setVisible] = useState(false);
  const entry = useMemo<HTMLDivElement>(createEntryNode, []);
  const onClose = useCallback(() => setVisible(false), []);

  useEffect(() => {
    onSelected(({ selected }) => {
      setVisible(selected);
    });
    return () => {
      document.body.removeChild(entry);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return createPortal(
    <div className="my-dialog">
      <div className="content">{children}</div>
      <button className="close" onClick={onClose}>
        关闭
      </button>
    </div>,
    entry,
  );
}

export default Container;
```

编辑 `index.scss`：

```scss
.my-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 2147483647;

  .content {
    width: 80%;
    height: 60%;
    background-color: white;
  }

  .close {
    margin-top: 32px;
  }
}
```

::: tip 🌟 提示
开发容器组件可能会用到一些 React Children 相关的 **Top-Level API**。
参考：[React Top-Level API](https://reactjs.org/docs/react-api.html#reactchildren)
:::
