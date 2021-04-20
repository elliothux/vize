---
meta:
  - name: description
    content: 动作
  - name: keywords
    content: 开发 动作 action 素材 dev
---

# 动作（Action）

动作是页面中由用户主动触发后执行的一段逻辑，通过用户配置的事件触发。

::: tip 🌟 提示
与插件一样，动作本身与前端框架不耦合。
:::

## 1. 创建动作

使用 Vize CLI 在**素材库根目录下**运行 `vize create-action <name>`。  
在`src/actions/<name>`目录下创建组件。

动作结构如下：

```
Action
├── config.ts ·········· 动作配置
└─── index.tsx ·········· 动作逻辑
```

## 2. 动作配置

文件名为 `config.ts`。与组件类似，动作配置包括基础信息、表单等属性。

### 动作基础信息

`info` 包含以下字段：

- `name`: 动作名
- `desc`: 动作描述提示
- `author`: 作者

### 动作表单

与组件类似，动作的可配置项在编辑器中以表单的形式出现，表单数据将作为参数传入动作函数。

表单的配置方式与组件相同，参考：[组件表单](/dev/component.html#组件表单)。

示例参考：[vize/materials-universal/actions/OpenURL/config.ts](https://github.com/vize-team/vize/blob/master/packages/materials-universal/src/actions/OpenURL/config.ts)

## 3. 动作逻辑

文件名为 `index.ts`。以 Function 导出。动作的逻辑，将会在用户手动触发时执行。

表单的数据以 `data` 为参数名传入动作函数。

示例参考：[vize/materials-universal/actions/OpenURL/index.ts](https://github.com/vize-team/vize/blob/master/packages/materials-universal/src/actions/OpenURL/index.ts)
