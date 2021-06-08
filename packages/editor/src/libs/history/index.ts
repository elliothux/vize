import { walkAndSerialize } from './utils';
import { runInAction } from 'mobx';

const recordStates: { [key: string]: object } = {};
const stacks: typeof recordStates[] = [];
let cursor = 0;

(window as any).stacks = stacks;
(window as any).undo = undo;
(window as any).redo = redo;

export function undo() {
  if (stacks.length <= 1 || cursor === 0) {
    return;
  }
  const snapshot = stacks[--cursor];
  return restoreSnapshot(snapshot);
}

export function redo() {
  if (stacks.length <= 1 || cursor === stacks.length) {
    return;
  }
  const snapshot = stacks[++cursor];
  return restoreSnapshot(snapshot);
}

function restoreSnapshot(snapshot: typeof recordStates) {
  return runInAction(() => {
    Object.entries(snapshot).forEach(([key, v]) => {
      Object.assign(recordStates[key], v);
    });
  });
}

export function recordHistory(states: typeof recordStates) {
  Object.assign(recordStates, states);
  updateSnapshots(true);
}

let inReaction = false;
export const withHistory = (
  target: { [key: string]: any },
  propertyKey: string,
  descriptor?: PropertyDescriptor,
): void => {
  const { initializer } = descriptor as any;
  descriptor!.value = function(...args: Parameters<ReturnType<typeof initializer>>) {
    const reaction = inReaction;
    if (!reaction) {
      inReaction = true;
    }
    const result = initializer.apply(this).apply(this, args);
    if (!reaction) {
      setTimeout(async () => {
        if (result instanceof Promise) {
          await result;
        }
        updateSnapshots();
        inReaction = false;
      }, 0);
    }
    return result;
  };
};

function updateSnapshots(assign = false) {
  const snapshot = Object.entries(recordStates).reduce<{ [key: string]: object }>((accu, [k, v]) => {
    accu[k] = walkAndSerialize(v);
    return accu;
  }, {});
  if (assign && stacks.length) {
    Object.assign(stacks[stacks.length - 1], snapshot);
  } else {
    stacks.push(snapshot);
  }
  cursor = stacks.length - 1;
}
