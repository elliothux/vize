---
meta:
  - name: description
    content: 动作
  - name: keywords
    content: 开发 动作 action 素材 dev
---

# 路由控制

当启用 `单页模式` 时，页面将按照单页应用的方式渲染，所有的子页面通过 `dynamic imports` 来动态加载。

Vize 支持注册自定义路由，来控制子页面的加载和渲染方式。

## 1. 实现 RouterController

在页面容器目录下新建 `Router.tsx` 和 `PageLoader.tsx`：

<CodeSwitcher :languages="{r:'Router.tsx',p:'PageLoader.tsx'}">

<template v-slot:r>

```tsx
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Maybe, PageInstance, PageRouter, RouterProps } from '@vize/types';
import { PageLoader } from './pagerLoader';

export function Router({
  setCurrentPageInstance,
  setRouter,
  pages,
  pageImports,
  sharedComponentInstances,
  ComponentsRender,
  PageRender,
}: RouterProps) {
  // 当前页面的 key
  const [currentPage, setCurrentPage] = useState(pages[0].key);
  // 当前页面的实例（动态引入）
  const [pageInstance, setPageInstance] = useState<Maybe<PageInstance>>(null);

  // 页面路由状态
  const router = useMemo<PageRouter>(() => ({ pages, currentPage, setCurrentPage }), [currentPage]);

  // 当路由变更时，执行 set 回调，同步 router 状态
  useEffect(() => {
    setRouter(router);
    setCurrentPageInstance(pageInstance);
  }, [pageInstance, router]);

  return (
    <>
      {/* 渲染跨页面共享的组件 */}
      {sharedComponentInstances && <ComponentsRender componentInstances={sharedComponentInstances} />}
      <PageLoader
        pageImports={pageImports}
        currentPage={currentPage}
        currentPageInstance={pageInstance}
        setCurrentPageInstance={setPageInstance}
        PageRender={PageRender}
      />
    </>
  );
}
```

</template>

<template v-slot:p>

```tsx
import * as React from 'react';
import { useState, useEffect } from 'react';
import { PageInstance, Maybe, RouterProps } from '@vize/types';

interface Props extends Pick<RouterProps, 'PageRender' | 'pageImports' | 'setCurrentPageInstance'> {
  currentPage: number;
  currentPageInstance: Maybe<PageInstance>;
}

export function PageLoader({
  currentPage,
  pageImports,
  currentPageInstance,
  setCurrentPageInstance,
  PageRender,
}: Props) {
  const [[loading, error], setStatus] = useState([true, false]);

  useEffect(() => {
    setStatus([true, false]);
    // 当页面为多页模式时，所有子页面独立存在
    // 这时 pageImports 为空，直接跳转到对应的地址
    const pageImport = pageImports[currentPage];
    if (!pageImport) {
      window.location.href = `/${currentPage}`;
      return;
    }

    // 动态 import 页面实例
    pageImport()
      .then(({ pageInstance }) => {
        setCurrentPageInstance(pageInstance);
        setStatus([false, false]);
      })
      .catch(e => {
        console.error('Load page error:\n', e);
        setStatus([false, true]);
      });
  }, [currentPage]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <LoadError />;
  }

  // 渲染页面实例
  return <PageRender pageInstance={currentPageInstance} />;
}

function Loading() {
  return <div>loading...</div>;
}

function LoadError() {
  return <div>Error occurred</div>;
}
```

</template>

</CodeSwitcher>

## 2. 注册路由

在页面容器目录下编辑 `index.ts`，引入并注册 RouterController：

```ts {2,5,6}
import { ContainerProps } from '@vize/types';
import { MyRouter } from './Router';

export default function({ render, implementRouterController }: ContainerProps) {
  // render 执行前注册 Router
  implementRouterController(MyRouter);
  render();
}
```
