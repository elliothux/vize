import { inject, onSnapshot, getSnapshot, applySnapshot } from 'mmlpx';
import { componentsStore, ComponentsStore } from './components';
import { editStore, EditStore } from './edit';
import { IReactionDisposer } from 'mobx';

interface Snapshot {
  [propName: string]: any;
}

interface HistorySnapshot {
  components: Snapshot;
  edit: Snapshot;
}

class HistoryStore {
  private componentsStore = componentsStore;

  private editStore = editStore;

  private stack: any[];

  private cursor = 0;

  public init = () => {
    this.stack.push(getSnapshot());
    onSnapshot(snapshot => {
      this.stack.push(snapshot);
      this.cursor = this.stack.length - 1;
      // this.store.saveSnapshot(snapshot);
    });
  };

  private saveSnapshot = ({ components, edit }: HistorySnapshot) => {
    this.componentsStore.saveSnapshot(components);
  };

  public redo = () => {
    applySnapshot(this.stack[++this.cursor]);
  };

  public undo = () => {
    applySnapshot(this.stack[--this.cursor]);
  };
}
