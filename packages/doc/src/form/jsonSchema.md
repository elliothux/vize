---
meta:
  - name: description
    content: 开发：JSON Schema Form
  - name: keywords
    content: 开发 表单 dev JSON Schema Form
---

# JSON Schema

表单的默认实现为 JSON-Schema 格式，使用方法参考 [react-jsonschema-form](https://mozilla-services.github.io/react-jsonschema-form/)。

默认的 JSON-Schema 格式为：

```json
{
  "key": {
    "type": "string", // ························ 字段类型（必须）
    "title": "schema title", // ················· 字段标题（必须）
    "description": "schema description", // ····· 字段描述（可选）
    "default": "default value", // ·············· 字段默认值（可选）
    "required": true // ························· 字段是否必须（可选）
    "x-rules": "email" // ······················· 字段校验规则（可选）
  }
}
```

:::warning ⚠️ 注意
Vize 中的 form data 为 Object，因此表单的 JSON-Schema 只需声明 Root Object 的 properties。
:::

## 1. 字段类型（type）

### 默认类型

Vize 的 JSON-Schema 实现支持如下**基础类型**：

- **`string`**：字符串
- **`number`**：数字（支持负数和小数）
- **`integer`**：整数
- **`boolean`**：布尔值

支持如下**复合类型**：

- **`object`**：对象
- **`array`**：数组

### 拓展类型

支持如下**拓展类型**：

- **`radio`**：单选框 `string | number | boolean`，通常配合 [枚举](/form/jsonSchema.html#_2-枚举-enum) 使用
- **`checkbox`**：多选框 `string[] | number[] | boolean[]`，通常配合 [枚举](/form/jsonSchema.html#_2-枚举-enum) 使用
- **`textarea`**：文本 `string`
- **`password`**：密码 `string`
- **`range`**：范围选择 `number`
- **`date`**：日期（年 月 日） `string`
- **`daterange`**：日期范围（年 月 日） `[string, string]`
- **`year`**：年份 `string`
- **`week`**：周 `string`
- **`time`**：时间（时 分 秒） `string`
- **`image`**：图片，URL `string`
- **`rich-text`**：富文本，HTML `string`
- **`color`**：颜色，RGBA 值 `string`，支持通过 `format` 字段指定值得类型，可选的值有：
  - rgb
  - rgba
  - hsv
  - hsl
  - hex
  - hex8

::: tip 🌟 提示
Vize 支持在物料库中注册自定义的表单拓展类型，参考：[注册字段 & 校验规则](/form/registryField.html)。
:::

## 2. 枚举（enum）

Vize 的 JSON-Schema 支持定义枚举类型的表单：

### 下拉选择（select）

如，定义 Select 可选项：

```json {5}
{
  "title": "Select Name",
  "type": "string",
  "default": "Alex",
  "enum": ["Tom", "Alex", "Sim"]
}
```

自定义 Label 和 Value：

```json {5,6,7,8,9}
{
  "title": "Select Name",
  "type": "number",
  "default": 1,
  "enum": [
    { "value": 0, "label": "Tom" },
    { "value": 1, "label": "Alex" },
    { "value": 2, "label": "Sim" }
  ]
}
```

### 单选（radio）

如，定义 Radio 可选项：

```json {5}
{
  "title": "Select Name",
  "type": "radio",
  "default": "Alex",
  "enum": ["Tom", "Alex", "Sim"]
}
```

自定义 Label 和 Value：

```json {5,6,7,8,9}
{
  "title": "Select Name",
  "type": "radio",
  "default": 1,
  "enum": [
    { "value": 0, "label": "Tom" },
    { "value": 1, "label": "Alex" },
    { "value": 2, "label": "Sim" }
  ]
}
```

### 多选（checkbox）

如，定义 Checkbox 可选项：

```json {5}
{
  "title": "Select Names",
  "type": "checkbox",
  "default": ["Alex"],
  "enum": ["Tom", "Alex", "Sim"]
}
```

自定义 Label 和 Value：

```json {5,6,7,8,9}
{
  "title": "Select Name",
  "type": "checkbox",
  "default": [1],
  "enum": [
    { "value": 0, "label": "Tom" },
    { "value": 1, "label": "Alex" },
    { "value": 2, "label": "Sim" }
  ]
}
```

## 3. 类型校验（x-rule）

Vize 的 JSON-Schema 支持类型校验，如下：

- **`email`**：邮箱
- **`url`**：网址
- **`phone`**：手机号
- **`idcard`**：身份证号码
- **`qq`**：QQ 号
- **`money`**：金额，如 “￥ 8.5”
- **`zip`**：邮政编码

如，校验邮箱：

```json {4}
{
  "title": "Input your email",
  "type": "string",
  "x-rules": "email"
}
```
