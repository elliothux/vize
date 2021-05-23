const DEFAULT_MAX_MEMO_ITEMS = 20;

interface MemoItem<T, U> {
  arg: T;
  result: U;
}

export function withMemo<T, U>(fn: (arg: T) => U, maxItems = DEFAULT_MAX_MEMO_ITEMS) {
  const memo: MemoItem<T, U>[] = [];
  Object.defineProperty(fn, '__memo', {
    get() {
      return memo;
    },
  });
  Object.defineProperty(fn, '__max-memo-items', {
    get() {
      return maxItems;
    },
  });

  return function(arg: T): U {
    const memo = (fn as any).__memo as MemoItem<T, U>[];
    if (memo) {
      const item = memo.find(i => i.arg === arg);
      if (item) {
        return item.result;
      }
    }

    const result = fn(arg);
    memo.push({ arg, result });

    const maxItems = (fn as any)['__max-memo-items'] as number;
    setTimeout(() => {
      if (memo.length > maxItems) {
        memo.splice(0, memo.length - maxItems);
      }
    }, 0);

    return result;
  };
}
