---
meta:
  - name: description
    content: 页面容器
  - name: keywords
    content: 开发 快速上手
---

# 异步动作 & 回调

Vize 中的多个动作/事件回调按照顺序执行。如果需要后续 Action 等待上一个 Action 中的异步任务执行完毕，需要制定 Action 为异步。

## 返回 Promise

要指定一个 Action 为异步非常简单，只需要在 Action 函数中**返回 `Promise`**。

下一个 Action 就会等待 Promise resolve 或 reject 后继续执行。

## 异常处理

如果一个 Action 抛出错误或者返回的 Promise 被 reject，将会视为执行出现异常，后续的 Action 将**不会继续执行**。

如果你希望当你的 Action 执行出现异常时能够继续执行后续的 Action，需要在 Action 函数内部 catch 错误。

如：

```js {5,6,7,8}
export default function() {
  return new Promise(resolve => {
    doSomething()
      .then(resolve)
      .catch(e => {
        console.error('An error catched but continue execute...', e);
        return resolve();
      });
  });
}
```

## 超时处理

当一个异步动作超过最长等待时间没有 resolve/reject，将会被视为**执行失败**。

默认的最长等待时间为 `10S`，你可以手动指定最长等待时间。

编辑动作 `config.js`，增加 `maxTimeout` 属性，单位为 `ms`：

```javascript {3}
export default {
  info: { ... },
  maxTimeout: 5000,
};
```

::: tip 🌟 提示
也可以指定 `maxTimeout` 为 `Infinity`。这样将不会限制异步 Action 的执行时间。
:::
