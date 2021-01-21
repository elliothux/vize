---
meta:
  - name: description
    content: 开发：JSON Schema Form
  - name: keywords
    content: 开发 表单 dev JSON Schema Form
---

# 注册 Schema Field

除了默认的 JSON Schema Fields，Vize 还提供的便捷的 API 用来注册自定义的字段类型和校验规则。

## 1. 创建 Field

使用 Vize CLI 在**物料库库根目录下**运行 `vize create-form-field <name>`  
组件文件的路径为 `form/fields/<name>`

件结构如下：

```
Field
├── index.ts ·········· 表单入口
└── index.scss ········ 表单样式（可选）
```

## 2. 开发 Field

编辑 `index.ts`。

**`field`** 是字段类型名，作为 JSON Schema 的 `type` 字段使用。

**`component`** 是表单组件，接收 `value` 和 `onChange` 字段，内部实现表单逻辑。

## 3. 示例

实现一个读取 txt 内容的表单：

```tsx {46,47}
import * as React from 'react';
import { useCallback, ChangeEvent } from 'react';

interface Props {
  value: string;
  onChange: (v: string) => void;
}

function readFile({ files }: HTMLInputElement): Promise<string | null> {
  return new Promise(resolve => {
    if (!files.length) {
      return resolve(null);
    }

    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        resolve(reader.result.toString());
      },
      false,
    );
    reader.readAsText(files[0]);
  });
}

function TXTReader({ value, onChange }: Props) {
  const onFileChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const content = await readFile(e.target);
    console.log('content: ', content);
    if (content) {
      onChange(content);
    }
  }, []);

  return (
    <div>
      <label>选择文件(*.txt)</label>
      <input type="file" accept=".txt" onChange={onFileChange} />
      <p>{value}</p>
    </div>
  );
}

export default {
  field: 'txt',
  component: TXTReader,
};
```

然后就可以在物料 `config.ts` 的 JSON Schema 中使用该 Field：

```ts {5}
const dataForm = {
  text: {
    title: '文本内容',
    description: '请选择txt文件',
    type: 'txt',
  },
};

export default {
  info: { ... },
  dataForm,
}
```
