---
meta:
  - name: description
    content: 页面容器
  - name: keywords
    content: 开发 快速上手
---

# 配置文件

物料库下的 `.vizerc` 文件为物料库配置文件。

可用的配置有：

- **`libName`**: 物料库的 name（英文）
- **`displayName`**: 物料库在系统中的展示名
- **`desc`**（可选）: 物料库描述
- **`author`**: 物料库作者
- **`releaseTo`**: 发布地址（一般是系统部署的域名）
- **`runtime`**（可选）: 视图层运行时，可用的值为：`react（默认）` `rax`（Vue 支持敬请期待）
- **`thumb`**（可选）: 缩略图
- **`registry`**（可选）: 下载模板和编辑器等的 NPM 软件源地址
