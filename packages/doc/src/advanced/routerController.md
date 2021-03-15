---
meta:
  - name: description
    content: 动作
  - name: keywords
    content: 开发 动作 action 素材 dev
---

# 自定义路由控制

当启用 `单页模式` 时，页面将按照单页应用的方式渲染，所有的子页面通过 `dynamic imports` 来动态加载。

Vize 支持注册自定义路由，来控制子页面的加载和渲染方式。

## 1. 实现路由

在页面容器目录下新建 `Router.tsx`：

```tsx
import * as React from 'react';
import { useState, ComponentType, useEffect } from 'react';
import { RouterProps, PageRouter } from '@vize/types';

export function MyRouter({ pages, dynamicPageImports, SharedComponentInstances }: RouterProps) {
  const [Page, setPageRender] = useState<ComponentType | null>(null);
  const [currentPage, setCurrentPage] = useState(pages[0].key);
  // 声明 router
  const router = useMemo<PageRouter>(() => ({ pages, currentPage, setCurrentPage }), [currentPage]);

  useEffect(() => {
    setPageRender(null);
    // 动态引入页面
    const dynamicPageImport = dynamicPageImports[currentPage];
    dynamicPageImport()
      .then(setPageRender)
      .catch(console.error);
  }, [currentPage]);

  if (!Page) {
    return <div>loading...</div>;
  }

  return (
    <>
      {/* 跨页面共享的组件 */}
      <SharedComponentInstances router={router} />
      {/* 当前页面 */}
      <Page router={router} />
    </>
  );
}
```

## 2. 注册路由

在页面容器目录下编辑 `index.ts`：

```ts {5}
import { ContainerProps} from '@vize/types';
import { MyRouter } from './Router';

export default function({ render, implementRouterController }) {
  // render 执行前注册 Router
  implementRouterController(MyRouter);
  render();
}
```
