---
meta:
  - name: description
    content: 页面容器
  - name: keywords
    content: 开发 快速上手
---

# 发布

Vize 生成的页面，默认发布到当前域名下，与整个系统站点共用同一个静态页面服务。

大多数情况下，开发者需要自定义 publisher，以实现定制化需求（如发布页面静态资源到 CDN、对接外部发布系统等）。

## 1. 自定义 Publisher

若要定制 publisher，参考 Vize 默认的 [publisher-web](https://github.com/vize-team/vize/tree/master/packages/publisher-web)

## 2. 导入 Publisher

修改服务项目目录下的 `src/config.ts`，在 `config` 内新增 **`publishers`** 字段：

```ts {4-6}
import { default as myPublisher } from 'path-to-my-publisher';

export const config = {
  publishers: {
    web: myPublisher,
  },
};
```
