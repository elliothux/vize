import { action, computed, observable, IObservableValue } from 'mobx';
import { RestoreCallback, Snapshots } from './types';
import { recordedStores, restoreSnapshot } from './record';
import { dehydrate } from './hydrate';
import { config } from './configure';

export class TimeTraveler {
  @observable
  private stacks: IObservableValue<Snapshots>[] = [];

  @observable
  private cursor = 0;

  private lastUpdate = 0;

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
    this.stacks = [observable.box(item, { deep: false })];
    this.cursor = 0;
  };

  @action
  public updateSnapshots = (payload?: Record<string, any>, snapshots?: Snapshots) => {
    const { stacks, cursor } = this;
    const item = snapshots || this.getSnapshots();
    if (payload) {
      item.payload = payload;
    }

    if (cursor < stacks.length - 1) {
      stacks.splice(cursor + 1, stacks.length - cursor);
    }

    const boxedItem = observable.box(item, { deep: false });
    const debounce = Date.now() - this.lastUpdate < config.debounceTime;
    if (debounce) {
      stacks[stacks.length - 1] = boxedItem;
    } else {
      stacks.push(boxedItem);
    }

    if (stacks.length > config.maxStacks) {
      stacks.splice(0, config.maxStacks - stacks.length - 1);
    }

    this.cursor = stacks.length - 1;
    this.lastUpdate = Date.now();
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
    const currentSnapshots = stacks[cursor].get();
    const snapshots = stacks[cursor - 1].get();
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
    const currentSnapshots = stacks[cursor].get();
    const snapshots = stacks[cursor + 1].get();
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
