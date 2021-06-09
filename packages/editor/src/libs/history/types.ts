export interface Snapshots {
  payload?: any;
  [key: string]: object;
}

export interface TimeTravelerConfig {
  maxStacks: number;
}

export type RestoreCallback = (
  type: 'undo' | 'redo',
  nextSnapshots: Snapshots,
  currentSnapshots: Snapshots,
) => void | Promise<void>;
