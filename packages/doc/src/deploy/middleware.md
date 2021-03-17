---
meta:
  - name: description
    content: 页面容器
  - name: keywords
    content: 开发 快速上手
---

# 中间件

Vize 的服务端架构基于 [Nest](https://nestjs.com/)，并且将中间件的能力开发给开发者。

通过中间件，可以实现很多定制化的需求（如[用户控制](/deploy/user.html)等）。

## 1. 声明中间件

如，实现一个接口鉴权中间件。

在服务项目下新建并编辑 `cgiValidation.ts`:

```ts
import { CGIMiddleware, CGIResponse } from '@vize/cgi';

export const cgiValidation: CGIMiddleware = {
  forRoutes: [{ path: '/cgi/*', method: MiddlewareRequestMethod.ALL }],
  apply: async (request, response) => {
    const username = request.cookies['vize_user_name'];
    if (!(await checkValid(username))) {
      response.send(CGIResponse.failed('invalid user'));
    }
  },
};
```

::: tip 🌟 提示
可以以数组形式同时导出多个中间件
:::

## 2. 应用中间件

修改服务项目目录下的 `src/config.ts`，在 `config.middlewares` 内导入 **`cgiValidation`**:

```ts
import { cgiValidation } from 'path-to-middleware';

export const config = {
  middlewares: {
    cgiValidation,
  },
};
```

## 3. 参考

[Functional middleware | NestJS](https://docs.nestjs.com/middleware#functional-middleware)  
[Request | Express](https://expressjs.com/en/4x/api.html#req)  
[Response | Express](https://expressjs.com/en/4x/api.html#res)
