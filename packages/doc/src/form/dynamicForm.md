---
meta:
  - name: description
    content: 开发：Override Form
  - name: keywords
    content: 开发 表单 dev Override Form
---

# 动态表单

JSON-Schema 能够满足大多数的需求，但有时我们需要一些更复杂的表单特性，如：动态化数据、异步校验等。

这时可以使用 Vize 的 DynamicForm 特性来定义表单。

## 1. DynamicForm

要声明一个 DynamicForm 十分简单。默认的 Form 声明是一个包含 JSON-Schema Properties 的 Object，而 DynamicForm 的声明是一个 React 组件，这个组件将作为 Form 被渲染在编辑器中。

DynamicForm 是一个受控组件，接收 `value` 和 `onChange` 字段。

下面是一个简单的例子：实现一个依赖异步数据请求的下拉选择。编辑 `config.ts`：

```tsx {10,32}
import * as React from 'react';
import { useEffect, useState } from 'react';

function fetchAsyncFakeData(): Promise<string[]> {
  return new Promise(resolve => {
    setTimeout(() => resolve(['option1', 'option2', 'option3']), 1000);
  });
}

function Form({ value: { option = '' }, onChange }) {
  const [options, setOptions] = useState<null | string[]>(null);

  useEffect(() => {
    fetchAsyncFakeData().then(setOptions);
  }, []);

  if (!options) {
    return <p>loading...</p>;
  }

  return (
    <select value={option} onChange={option => onChange({ option })}>
      {options.map(i => (
        <option value={i}>{i}</option>
      ))}
    </select>
  );
}

export default {
  info: { ... },
  dataForm: Form,
};
```

::: warning ⚠️ 注意
`onChange` 传入的 value 参数将作为 props 传入 Component，请确保 value 是一个 **Object**。
:::

::: tip 🌟 提示
`value` 初始值是一个空对象。
:::

## 2. 动态 JSON Schema

大多数时候我们不希望完全靠自己实现表单组件，但是又需要动态化特性，静态 JSON-Schema 无法满足需求。

这时可以采用 Vize 提供的 DynamicJSONSchemaForm API，通过动态生成 Schema 来实现表单动态化。

示例，实现一个可以切换显隐，并且带提交按钮的密码输入框：

```tsx {4,17,21}
import * as React from 'react';
import { useCallback, useState } from 'react';

function Form({ value, onChange, JSONSchemaForm }) {
  const [visible, setVisible] = useState(false);
  const toggleVisible = useCallback(() => setVisible(v => !v), []);

  return (
    <>
      <JSONSchemaForm
        value={value}
        onChange={onChange}
        schema={{
          password: {
            title: '密码',
            type: 'string',
            'x-component': visible ? 'Input' : 'Password',
            required: true,
          },
        }}
        submitPorps
      />
      <button onClick={toggleVisible}>toggle</button>
    </>
  );
}

export default {
  info: { ... },
  dataForm: Form,
};
```

## 3. Formily API

Vize 系统内部的表单统一采用开源解决方案 [Formily](https://github.com/alibaba/formily) 来实现。

因此，物料开发者可以根据借助 Formily 的能力，满足更加复杂的表单场景，如联动、动态数据源、异步校验等。

### 基础示例

示例，实现一个具有重置提交和功能的输入框：

```tsx
import * as React from 'react';
import { createForm } from '@formily/core'
import { FormProvider, FormConsumer, Field } from '@formily/react'
import {
  FormItem,
  FormLayout,
  Input,
  FormButtonGroup,
  Submit,
  Reset
} from '@formily/antd'

const form = createForm();

function Form({ value, onChange }) {
  return (
    <FormProvider form={form}>
        <FormLayout layout="vertical">
          <Field
            name="input"
            title="输入框"
            required
            initialValue="Hello world"
            decorator={[FormItem]}
            component={[Input]}
          />
        </FormLayout>

        <FormButtonGroup>
          <Reset>重置</Reset>
          <Submit onSubmit={form.submit}>提交</Submit>
        </FormButtonGroup>
    </FormProvider>
  );
}

export default {
  info: { ... },
  dataForm: Form,
};
```

### 使用内置 Schema Field

Formily 的 SchemaField 需要显式注册需要的 Components（如 Select、TextArea 等）和 Rules。

Vize 将已经注册好所有 [Field Components](/form/jsonSchema.html#拓展组件-x-component) 和 Rules 的 SchemaField 实例暴露给开发者，可以便捷地使用。

示例，实现通过一个可以控制显隐的密码输入框：

```tsx {6,10,18,19}
import * as React from 'react';
import { FormProvider } from '@formily/react';

const form = createForm();

function Form({ value, onChange, Formily: { getSchemaField } }) {
  const [visible, setVisible] = useState(false);
  const toggleVisible = useCallback(() => setVisible(v => !v), []);

  const SchemaField = getSchemaField();

  return (
    <FormProvider form={form}>
      <SchemaField>
        <SchemaField.String
          name="password"
          title="密码"
          {/* 直接使用已经注册的 Field Component */}
          x-component={visible ? 'Password' : 'Password'}
          required
        />
      </SchemaField>
      <button onClick={toggleVisible}>toggle</button>
    </FormProvider>
  );
}

export default {
  info: { ... },
  dataForm: Form,
};
```
