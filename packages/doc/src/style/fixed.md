---
meta:
  - name: description
    content: 开发：固定布局
  - name: keywords
    content: 开发 固定布局 layout dev
---

# Fixed 布局

Vize 的编辑器默认采用流式布局。对于需要 `fixed` 定位的组件，需要通过 **Style Group** 声明来支持 Fixed 布局。

这样可以使用户获得自由拖拽定位的编辑体验。

示例，实现一个默认固定在底部的按钮：

```js
const enableStyleGroup = {
  position: { bottom: 0 },
};

export default {
  info: { ... },
  enableStyleGroup,
};
```

::: warning 注意
为保证用户获得无缝的编辑体验，Style Group 的 `position` 属性启用后**并不会**作为 commonStyle 传入组件。

组件开发者无需对其进行任何处理，Vize 将自动对组件进行定位。
:::
