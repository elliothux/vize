import { EventProxy } from './eventProxy';

export enum RuntimeEventEmitTypes {
  NODE_INTERSECTING_CHANGE = 'node_intersecting_change',
}

export const events = new EventProxy<RuntimeEventEmitTypes>();
