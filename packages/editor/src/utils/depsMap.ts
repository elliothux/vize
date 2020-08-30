// import { ComponentInstance, EventInstance, PluginInstance } from '../types';

export enum DepsType {
  Component = 'component',
  Plugin = 'plugin',
}

type ParentKey = number;
type InstanceKey = number;

export type DepFrom = [DepsType, ParentKey, InstanceKey];

/**
 * @desc Event Instances which deps on component
 * @struct Map<ComponentInstanceKey | PluginInstanceKey, DepFrom[]>
 */
class DepsMap {
  private readonly depsMap = new Map<number, DepFrom[]>();

  public createEventDepsMap = (key: number) => {
    return this.depsMap.set(key, []);
  };

  public deleteEventDepsMap = (key: number) => {
    return this.depsMap.delete(key);
  };

  public addEventDep = (key: number, dep: DepFrom) => {
    return this.depsMap.get(key)!.push(dep);
  };

  public batchAddEventDep = (key: number, deps: DepFrom[]) => {
    return this.depsMap.get(key)!.push(...deps);
  };

  public getEventDep = (key: number) => {
    return this.depsMap.get(key);
  };

  public deleteEventDep = (key: number, type: DepsType, eventInstanceKey: number) => {
    const deps = this.depsMap.get(key)!;
    const index = deps.findIndex(([depType, depEventKey]) => type === depType && eventInstanceKey === depEventKey);
    const [dep] = deps.splice(index, 1);
    return dep;
  };
}

// export function generateEventDeps(instance: ComponentInstance | PluginInstance) {}

// export function generateEventDepFromItem(event: EventInstance) {}

export const componentEventDepsMap = new DepsMap();

export const pluginEventDepsMap = new DepsMap();
