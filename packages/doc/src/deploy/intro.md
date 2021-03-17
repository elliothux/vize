---
meta:
  - name: description
    content: 页面容器
  - name: keywords
    content: 开发 快速上手
---

# 部署服务

Vize 的服务依赖 [Nodejs](https://nodejs.org/) 、 [Nest](https://nestjs.com/) 、[MySQL](https://dev.mysql.com/) 等技术，只需要以下几步就能完成服务的部署。

## 1. 准备工作

1. 安装 Nodejs：>= v12.x
2. 安装 MySQL：>= 5.7
3. 创建 MySQL DateBase: `vize`，字符集: `utf-8`
4. Clone 模板项目：`git clone https://github.com/vize-team/vize-deploy-boilerplate.git`
5. 在项目下运行：`npm i`

## 2. 配置

修改模板项目下的 `src/config.ts`:

- **`workspacePath`**：Vize 服务的工作目录，包含临时构建目录、静态资源目录等。
- **`port`**：服务运行的端口
- **`db`**：数据库配置
  - `type`：DB 类型，可选 `mysql` 或 `mariadb`
  - `host`：IP 地址
  - `port`：端口
  - `database`：数据库名
  - `username`：用户名
  - `password`：密码
- **`npmRegistry`**（可选）：用来安装物料库依赖的 npm 软件源
- **`middlewares`**（可选）：参考：[中间件](/deploy/middleware.html)
- **`generators`**（可选）：参考：[页面生成](/deploy/generator.html)
- **`publishers`**（可选）：参考：[发布](/deploy/publisher.html)
- **`editorPath`**（可选）：编辑器目录
- **`managementUIPath`**（可选）：管理端目录

## 3. 构建 & 运行

在项目下运行 **`npm run build`**，等待构建完毕后运行 **`npm run start:prod`**
