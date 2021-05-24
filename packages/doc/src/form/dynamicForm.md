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

::: warning 注意
`onChange` 传入的 value 参数将作为 props 传入 Component，请确保 value 是一个 **Object**。
:::

::: tip 🌟 提示
`value` 初始值是一个空对象。
:::

## 2. 动态 JSON Schema

大多数时候我们不希望完全靠自己实现表单组件，但是又需要动态化特性，静态 JSON-Schema 无法满足需求。

这时可以采用 Vize 提供的 JSONSchemaForm API，通过动态生成 Schema 来实现表单动态化。

示例，实现一个可以切换显隐的密码输入框：

```tsx {4,13,14,15,16,17,18,19}
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
      />
      <button onClick={toggleVisible}>TOGGLE</button>
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

同时，Vize 将完整的 Formily API 暴露给 Dynamic Form，开发者可以借此来便捷地实现动态化、定制化校验等高级表单特性。

### 基础示例

示例，实现一个具有重置功能的表单：

```tsx {4,10}
import * as React from 'react';

function Form({ value, onChange, Formily }) {
  const { SchemaForm, Field, Reset } = Formily;

  return (
    <SchemaForm value={value} onChange={onChange}>
      <Field name="foo" title="Foo Title" type="string" />
      <Field name="bar" title="Bar Title" type="string" />
      <Reset />
    </SchemaForm>
  );
}

export default {
  info: { ... },
  dataForm: Form,
};
```

### JSX Schema 示例

在一些场景下，静态的表单的表单无法满足需求，这时可以借助 [Formily](https://github.com/alibaba/formily) 的 JSX-Schema 的动态化特性来实现表单的联动等需求。

示例，实现通过一个可以控制显隐的输入框：

```tsx {10,11,12,13,14}
import * as React from 'react';

function Form({ value, onChange, Formily }) {
  const { SchemaForm, Field } = Formily;

  return (
    <SchemaForm
      value={value}
      onChange={onChange}
      effects={($, { setFieldState }) => {
        $('onFieldChange', 'visible').subscribe(fieldState => {
          setFieldState('text', state => (state.visible = fieldState.value));
        });
      }}
    >
      <Field
        name="visible"
        type="boolean"
        x-component="radio"
        default={true}
        enum={[
          { label: '是', value: true },
          { label: '否', value: false },
        ]}
        title="展示输入框"
      />
      <Field name="text" type="string" title="输入" />
    </SchemaForm>
  );
}

export default {
  info: { ... },
  dataForm: Form,
};
```
