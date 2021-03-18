---
meta:
  - name: description
    content: 开发：StyleInject
  - name: keywords
    content: 开发 style StyleInject css
---

# 样式自动注入

通常的组件样式是通过 props 的 `style` 属性传入组件。开发者需要把样式手动应用到节点，对于有较深的层级结构或大量复用样式时，会显得较为繁琐。

因此，Vize 支持通过声明 Schema 实现自动的样式注入。

## 1. 启用自动注入

编辑组件 `config.ts`, 将组件 `enableStyleInject` 属性设为 `true`：

```ts {4}
export default {
  info: { ... },
  styleForm: { ... },
  enableStyleInject: true,
};
```

## 2. 声明自动注入

编辑组件 `config.ts` 的 styleForm 属性，给需要注入的样式 Schema 声明增加 `inject` 属性：

```ts {4,5,6,7}
const styleForm = {
  propName: {
    ...,
    inject: {
      selector,
      attr,
      format
    }
  },
};
```

`inject` 属性的类型声明为：

```typescript
interface StyleInjectSchema {
  selector: string | string[];
  attr?: string | string[];
  formatter?: 'px' | 'percent' | ((value: any) => string);
}

type Inject = StyleInjectSchema | StyleInjectSchema[];
```

`inject` 具有以下几个属性：

### selector

注入样式的选择器。  
支持所有合法的 **CSS 选择器**。为**必须字段**。  
如 `.wrapper #header div>h1 footer::after` 等。

### attr（可选）

注入样式的 CSS 属性名。  
支持所有合法的 **CSS 属性名**。为可选字段，默认为该 Schema 字段的 **key**。  
如：`background-color font-size width` 等。

### formatter（可选）

将该 Schema 表单值格式化为 CSS 属性值的方法。

为可选字段，默认为 `(i: any) => i.toString()`。

Vize 默认提供以下几种常用的格式化方法：

- **`px`**：`1 => "1px"`
- **`em`**：`1 => "1em"`
- **`percent`**：`1 => "1%"`
- **`vw`**：`1 => "1vw"`
- **`vh`**：`1 => "1vh"`

另外，你还可以自己手写 formatter，如：`` (i: number) => `calc(50% - ${i}px)` ``

## 3. 示例

通过样式注入实现一个 Card 组件：

编辑组件 `index.tsx`：

```tsx
import * as React from 'react';

export default function() {
  return (
    <div className="my-card">
      <div className="card-head">Head</div>
      <div className="card-body">
        <p>Body</p>
      </div>
      <div className="card-footer">Footer</div>
    </div>
  );
}
```

编辑组件 `config.ts`：

```ts {12-21,32-36,43-57}
const info = {
  name: '卡片',
  desc: 'My Card',
  author: 'Pony',
};

const styleForm = {
  mainColor: {
    type: 'color',
    title: '主题色',
    default: '#3fafff',
    inject: [
      {
        attr: 'background-color',
        selector: ['.card-head', '.card-footer'],
      },
      {
        attr: 'color',
        selector: '.card-body > p',
      },
    ],
  },
  spacing: {
    type: 'radio',
    title: '卡片内间距',
    enum: [
      { value: 32, label: '大' },
      { value: 18, label: '中' },
      { value: 6, label: '小' },
    ],
    default: 18,
    inject: {
      selector: '.card-body',
      attr: ['margin-bottom', 'margin-top'],
      formatter: 'px', // 将 number 格式化为 px
    },
  },
  border: {
    type: 'radio',
    title: '边框',
    enum: ['Solid', 'Dashed', 'None'],
    default: 'Solid',
    inject: {
      // attr 默认值为该 Schema 字段的 Key，此处为 “border”
      selector: '.my-card > div',
      // 自定义格式化方法
      formatter: (border: string) => {
        switch (border) {
          case 'Solid':
            return 'solid 1px gray';
          case 'Dashed':
            return 'dashed 2px gray';
          case 'None':
            return 'none';
        }
      },
    },
  },
};

export default {
  info,
  styleForm,
  enableStyleInject: true,
};
```

然后 Vize 将会注入类似如下的样式规则：

```scss
$main-color-value: #3fafff;

.card-head,
.card-footer {
  background-color: $main-color-value;
}

.card-body > p {
  color: $main-color-value;
}

$spacing-value: 18px;

.card-body {
  margin-top: $spacing-value;
  margin-bottom: $spacing-value;
}

$border-value: solid 1px gray;

.my-card > div {
  border: $border-value;
}
```

:::warning ⚠️ 注意
自动样式注入只会注入局部样式到当前组件，不会污染组件外的样式
:::
