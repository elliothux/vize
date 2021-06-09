import { Snapshots } from './types';
import { runInAction } from 'mobx';

export const recordedStores: Snapshots = {};

export function recordStoreHistory(states: Snapshots) {
  return Object.assign(recordedStores, states);
}

export function restoreSnapshot(snapshot: Snapshots, callback?: Function) {
  return runInAction(() => {
    Object.entries(snapshot).forEach(([key, v]) => {
      if (key === 'payload') {
        return;
      }
      Object.assign(recordedStores[key], v);
    });
    callback?.();
  });
}
