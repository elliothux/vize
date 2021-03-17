---
meta:
  - name: description
    content: 页面容器
  - name: keywords
    content: 开发 快速上手
---

# 页面生成

得益于 Vize 的统一 [DSL](/advanced/dsl.html) 架构，开发者可以自定义 generator 来生成不同的产物（如生成小程序等）。

Vize 内置 [generator-web](https://github.com/vize-team/vize/tree/master/packages/generator-web) 作为默认的 generator，用来生成普通 Web 页面。

## 1. 自定义 Generator

若要定制 generator，参考：[generator-web](https://github.com/vize-team/vize/tree/master/packages/generator-web)

## 2. 导入 Generator

修改服务项目目录下的 `src/config.ts`，在 `config` 内新增 **`generators`** 字段：

```ts {4-6}
import { default as myGenerator } from 'path-to-my-generator';

export const config = {
  generators: {
    myGenerator,
  },
};
```

然后就可以在**创建页面**时选择使用 `myGenerator`。
