import { action, computed, observable } from 'mobx';
import { RestoreCallback, Snapshots } from './types';
import { recordedStores, restoreSnapshot } from './record';
import { dehydrate } from './hydrate';

export class TimeTraveler {
  @observable
  private stacks: Snapshots[] = [];

  @observable
  private cursor = 0;

  public getSnapshots = (): Snapshots => {
    return Object.entries(recordedStores).reduce<Snapshots>((accu, [k, v]) => {
      accu[k] = dehydrate(v);
      return accu;
    }, {});
  };

  @action
  public initSnapshots = (payload?: Record<string, any>, snapshots?: Snapshots) => {
    const item = snapshots || this.getSnapshots();
    if (payload) {
      item.payload = payload;
    }
    this.stacks = [item];
    this.cursor = 0;
  };

  @action
  public updateSnapshots = (payload?: Record<string, any>, snapshots?: Snapshots) => {
    const { stacks } = this;
    const item = snapshots || this.getSnapshots();
    if (payload) {
      item.payload = payload;
    }
    stacks.push(item);
    this.cursor = stacks.length - 1;
  };

  @computed
  public get canUndo() {
    const { stacks, cursor } = this;
    return stacks.length > 1 && 0 < cursor && cursor < stacks.length;
  }

  @computed
  public get canRedo() {
    const { stacks, cursor } = this;
    return stacks.length > 1 && 0 <= cursor && cursor < stacks.length - 1;
  }

  @action
  public undo = () => {
    const { stacks, cursor } = this;
    if (!this.canUndo) {
      return;
    }
    const currentSnapshots = stacks[cursor];
    const snapshots = stacks[cursor - 1];
    this.cursor -= 1;
    return restoreSnapshot(snapshots, () => {
      this.restoreCallbacks.forEach(callback => callback('undo', snapshots, currentSnapshots));
    });
  };

  @action
  public redo = () => {
    const { stacks, cursor } = this;
    if (!this.canRedo) {
      return;
    }
    const currentSnapshots = stacks[cursor];
    const snapshots = stacks[cursor + 1];
    this.cursor += 1;
    return restoreSnapshot(snapshots, () => {
      this.restoreCallbacks.forEach(callback => callback('redo', snapshots, currentSnapshots));
    });
  };

  private readonly restoreCallbacks: RestoreCallback[] = [];

  public onRestore = (callback: RestoreCallback) => {
    const { restoreCallbacks } = this;
    const index = restoreCallbacks.findIndex(i => i === callback);
    if (index > -1) {
      return () => restoreCallbacks.splice(index, 1);
    }
    restoreCallbacks.push(callback);
    return () => restoreCallbacks.splice(restoreCallbacks.length - 1, 1);
  };
}

export const timeTraveler = new TimeTraveler();
