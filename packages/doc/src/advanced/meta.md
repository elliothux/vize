---
meta:
  - name: description
    content: 动作
  - name: keywords
    content: 开发 动作 action 素材 dev
---

# 页面元数据

页面的基础元数据，都可以通过 **`meta`** 属性在物料中等处获取。

也可以在其他地方通过 **`window.VIZE.meta`** 获取。

Meta 信息包含的如下字段：

- **`title`**：页面标题 `string`
- **`desc`**：页面描述 `string`
- **`duration`**：页面起始时间（时间戳）`[number, number] | undefined`
- **`expiredJump`**：下线跳转地址 `string | undefined`
- **`id`**：页面 id `number | undefined`
- **`key`**：页面 key `string`
- **`isTemplate`**：是否为模板页面 `boolean`
- **`isEditor`**：是否为编辑器环境 `boolean`
