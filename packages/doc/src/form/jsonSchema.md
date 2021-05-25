---
meta:
  - name: description
    content: 开发：JSON Schema Form
  - name: keywords
    content: 开发 表单 dev JSON Schema Form
---

# JSON Schema

表单的默认实现为 JSON-Schema 格式。

Vize 的表单统一采用开源表单解决方案 [Formily](https://github.com/alibaba/formily) 来实现。 Formily 在标准 JSON-Schema 语法基础上拓展了部分字段，可以方便地拓展能力，实现自定义功能。

默认的 JSON-Schema 格式为：

```json
{
  "key": {
    "type": "string", // ························ 字段类型（必须）
    "title": "schema title", // ················· 字段标题（必须）
    "description": "schema description", // ····· 字段描述（可选）
    "default": "default value", // ·············· 字段默认值（可选）
    "required": true, // ························ 字段是否必须（可选）
    "format": "email" // ························ 字段校验规则（可选）
    "x-component": "Input", // ·················· 字段组件（可选）
  }
}
```

:::warning ⚠️ 注意
Vize 中的 form data 为 Object，因此表单的 JSON-Schema 只需声明 Root Object 的 properties。
:::

## 1. 字段类型与组件

Vize 内置了 [@formily/antd](https://antd.formilyjs.org/) 内丰富的组件作为默认的表单组件，通常能满足大部分需求。

### 默认类型（type）

Vize 的 JSON-Schema 实现支持如下**基础类型**：

- **`string`**：字符串，默认使用 `Input` 组件
- **`number`**：数字，默认使用 `NumberPicker` 组件
- **`boolean`**：布尔值，默认使用 `Switch` 组件

支持如下**复合类型**：

- **`object`**：对象，默认使用 `ObjectField` 组件
- **`array`**：数组，默认使用 `ArrayItems` 组件

### 拓展组件 (x-component)

Vize 支持如下内置的**拓展组件**：

| 组件            | 描述               | 适用场景                                     | API 参考                                                                |
| --------------- | ------------------ | -------------------------------------------- | ----------------------------------------------------------------------- |
| ArrayCards      | 卡片列表           | 每行字段数量较多，联动较多的场景             | [array-cards](https://antd.formilyjs.org/components/array-cards)        |
| ArrayItems      | 自增列表           | 简单的自增编辑场景，或者对于空间要求高的场景 | [array-cards](https://antd.formilyjs.org/components/array-items)        |
| ArrayTable      | 自增表格           | 数据量超大的场景                             | [array-table](https://antd.formilyjs.org/components/array-table)        |
| ArrayTabs       | 自增选项卡         | 对于纵向空间要求较高的场景                   | [array-tabs](https://antd.formilyjs.org/components/array-tabs)          |
| Checkbox        | 复选框             | 单项选择                                     | [checkbox](https://antd.formilyjs.org/components/checkbox)              |
| CheckboxGroup   | 复选组             | 多项选择                                     | [checkbox](https://antd.formilyjs.org/components/checkbox)              |
| DatePicker      | 日期选择器         | 选择日期                                     | [date-picker](https://antd.formilyjs.org/components/date-picker)        |
| DateRangePicker | 日期范围选择器     | 选择日期范围                                 | [date-picker](https://antd.formilyjs.org/components/date-picker)        |
| Editable        | 局部编辑器         | 对于空间要求较高的表单                       | [editable](https://antd.formilyjs.org/components/editable)              |
| EditablePopover | 局部编辑器 Popover | 对于空间要求较高的表单                       | [editable](https://antd.formilyjs.org/components/editable)              |
| FormCollapse    | 折叠面板           | 对于空间要求较高的表单                       | [form-collapse](https://antd.formilyjs.org/components/form-collapse)    |
| FormGrid        | 网格表单           | 需要使用网格布局的表单                       | [form-grid](https://antd.formilyjs.org/components/form-grid)            |
| FormItem        | 表单项             | 需要自定义 Form 组件属性的场景               | [form-item](https://antd.formilyjs.org/components/form-item)            |
| FormLayout      | 布局控制组件       | 需要自定义表单布局的场景                     | [form-layout](https://antd.formilyjs.org/components/form-layout)        |
| FormStep        | 分步表单           | 具有步骤逻辑的场景                           | [form-step](https://antd.formilyjs.org/components/form-step)            |
| FormStepPanel   | 分步组件面板       | 具有步骤逻辑的场景                           | [form-step](https://antd.formilyjs.org/components/form-step)            |
| FormTab         | 选项卡表单         | 对于纵向空间要求较高的场景                   | [form-tab](https://antd.formilyjs.org/components/form-tab)              |
| FormTabPanel    | 选项卡面板         | 对于纵向空间要求较高的场景                   | [form-tab](https://antd.formilyjs.org/components/form-tab)              |
| Input           | 文本输入框         | 大多数文本输入场景                           | [input](https://antd.formilyjs.org/components/input)                    |
| TextArea        | 单行文本输入框     | 较长的文本输入场景                           | [input](https://antd.formilyjs.org/components/input)                    |
| NumberPicker    | 数字输入框         | 输入数字的场景                               | [number-picker](https://antd.formilyjs.org/components/number-picker)    |
| ObjectField     | 对象表单           | 需要自定义对象表单属性的场景                 | [object-field](https://react.formilyjs.org/api/components/object-field) |
| Password        | 密码输入框         | 输入密码的场景                               | [password](https://antd.formilyjs.org/api/components/password)          |
| Radio           | 单选               | 单项选择                                     | [radio](https://antd.formilyjs.org/api/components/radio)                |
| RadioGroup      | 单选组             | 单项选择                                     | [radio](https://antd.formilyjs.org/api/components/radio)                |
| Select          | 下拉选择           | 大多数单选或多选场景                         | [select](https://antd.formilyjs.org/api/components/select)              |
| Space           | Flex 布局组件      | 实现表单的并排紧挨布局                       | [space](https://antd.formilyjs.org/api/components/space)                |
| Switch          | 开关组件           | 需要 boolean 值的场景                        | [switch](https://antd.formilyjs.org/api/components/switch)              |
| TimePicker      | 时间选择器         | 选择时间                                     | [time-picker](https://antd.formilyjs.org/api/components/time-picker)    |
| TimeRangePicker | 时间单位选择器     | 选择时间范围                                 | [time-picker](https://antd.formilyjs.org/api/components/time-picker)    |
| Transfer        | 穿梭框             | 在多个可选项中进行多选                       | [transfer](https://antd.formilyjs.org/api/components/transfer)          |
| TreeSelect      | 树选择器           | 选择较多层级的项目                           | [tree-select](https://antd.formilyjs.org/api/components/tree-select)    |

所有的拓展组件可以参考: [SchemaForm/fields.ts](https://github.com/vize-team/vize/blob/master/packages/editor/src/widgets/Form/SchemaForm/fields.ts)

除此之外，Vize 还拓展了一些适用于搭建场景的常用组件：

| 组件     | 描述       | Props                                                                                                       | Value                                                        | API 参考                                                                                                                    |
| -------- | ---------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| Color    | 颜色选择器 | **`format（可选）`：** 颜色格式 <br/>`rgb` <br/>`rgba` <br/>`hsv` <br/>`hsl` <br/>`hex` <br/>`hex8`         | `string`                                                     | [Fields/Color](https://github.com/vize-team/vize/blob/master/packages/editor/src/widgets/Form/Fields/Color/index.tsx)       |
| RichText | 富文本     | **`html（可选）`：** 富文本 HTML <br/>`string` <br/><br/> **`raw（可选）`：** 原始数据 <br/>`TDescendant[]` | **`html`：** `string` <br/><br/> **`raw`：** `TDescendant[]` | [Fields/RichText](https://github.com/vize-team/vize/blob/master/packages/editor/src/widgets/Form/Fields/RichText/index.tsx) |
| Image    | 图片选择器 | -                                                                                                           | `string`                                                     | [Fields/Image](https://github.com/vize-team/vize/blob/master/packages/editor/src/widgets/Form/Fields/Image/index.tsx)       |

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

### 单选

如，定义 Radio 可选项：

```json {5}
{
  "title": "Select Name",
  "type": "radio",
  "default": "Alex",
  "enum": ["Tom", "Alex", "Sim"],
  "x-component": "Radio"
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
  ],
  "x-component": "Radio"
}
```

### 多选

如，定义 Checkbox 可选项：

```json {5}
{
  "title": "Select Names",
  "type": "checkbox",
  "default": ["Alex"],
  "enum": ["Tom", "Alex", "Sim"],
  "x-component": "CheckboxGroup"
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
  ],
  "x-component": "CheckboxGroup"
}
```

## 3. 类型校验（x-rule）

Vize 的 JSON-Schema 支持类型校验，如下：

- **`email`**：邮箱
- **`url`**：网址
- **`phone`**：手机号
- **`idcard`**：身份证号码
- **`ipv6`**：IPV6 地址
- **`ipv4`**：IPV4 地址
- **`number`**：数字
- **`integer`**：证书
- **`qq`**：QQ 号
- **`money`**：金额，如 “￥ 8.5”
- **`zh`**：中文字符
- **`date`**：日期
- **`zip`**：邮政编码

如，校验邮箱：

```json {4}
{
  "title": "Input your email",
  "type": "string",
  "format": "email"
}
```

完整的校验规则参考：[formily/validate](https://v2.formilyjs.org/zh-CN/guide/advanced/validate)
