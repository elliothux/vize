---
meta:
  - name: description
    content: 页面容器
  - name: keywords
    content: 开发 快速上手
---

# 用户控制

Vize 将系统的用户控制能力通过[中间件](/deploy/middleware.html)的方式暴露给开发者，便于实现定制化需求（如对接公司内部的 OA 用户系统）。

## 1. 登录

模板项目默认实现了游客登录功能，真实情况下通常需要开发者修改默认的登录实现。

如，实现用户名和密码登录。修改 `/public/login.html`:

```html
<html>
  <body>
    <form action="/login" method="post">
      <div>
        <label for="username">User Name</label>
        <input name="username" id="username" />
      </div>
      <div>
        <label for="pwd">Password</label>
        <input name="pwd" id="pwd" type="password" />
      </div>
      <div>
        <button>Login</button>
      </div>
    </form>
  </body>
</html>
```

修改 `/middlewares/user.ts`:

```ts {7,8,16-18,21-25}
import * as path from 'path';
import { CGIMiddleware, getUserService, MiddlewareRequestMethod, CGIResponse } from '@vize/cgi';

export const user: CGIMiddleware[] = [
  {
    apply: async (request, response) => {
      // GET 请求返回登录页 HTML
      response.sendFile(path.resolve(process.cwd(), 'public/login.html'));
    },
    forRoutes: [{ path: '/login', method: MiddlewareRequestMethod.GET }],
  },
  {
    apply: async (request, response) => {
      const { username, pwd } = request.body;
      const userService = getUserService();
      // 校验用户
      if (!(await validateUser(username, pwd))) {
        response.send(CGIResponse.failed('username or password not correct'));
        return;
      }
      // 查询用户信息
      const user = await userService.getUserEntityByName(username);
      // POST 请求写入用户名到 cookie 并返回用户信息
      response.cookie('vize_user_name', username);
      response.send(CGIResponse.success(user));
    },
    forRoutes: [{ path: '/login', method: MiddlewareRequestMethod.POST }],
  },
];
```

## 2. 用户信息

配合登录逻辑，实现获取当前用户信息，修改 `/middlewares/user.ts`:

```ts {4,5,12-14}
export const user: CGIMiddleware[] = [
  {
    apply: async (request, response) => {
      // 配合登录逻辑，获取用户登录态
      const name = request.cookies['vize_user_name'];
      if (!name) {
        response.send(CGIResponse.failed('need relogin'));
        return;
      }

      const userService = getUserService();
      // 返回当前用户信息
      const result = await userService.getUserEntityByName(name);
      response.send(CGIResponse.success(result));
    },
    forRoutes: [{ path: '/user-info', method: MiddlewareRequestMethod.GET }],
  },
];
```

以此类推，开发者还可以通过中间件自定义用户注册、权限申请等功能。
