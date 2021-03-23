import { ComponentInstance, EventInstance, PluginInstance } from '../types';

export enum DepsFromType {
  Component = 'component',
  Plugin = 'plugin',
  HotArea = 'hotarea',
  Container = 'container',
}

export enum DepsTargetType {
  Component = 'component',
  Plugin = 'plugin',
}

export interface DepFrom {
  depsFromType: DepsFromType;
  parentKey?: number;
  index?: number;
  eventKey: number;
}

type TargetKey = number;
/**
 * @desc Event Instances which deps on component
 * @struct Map<ComponentInstanceKey | PluginInstanceKey, DepFrom[]>
 */
class DepsMap<T = DepsTargetType> {
  private readonly depsMap = new Map<TargetKey, DepFrom[]>();

  public createEventDepsMap = (targetKey: number) => {
    const deps: DepFrom[] = [];
    this.depsMap.set(targetKey, deps);
    return deps;
  };

  public deleteEventDepsMap = (targetKey: number) => {
    return this.depsMap.delete(targetKey);
  };

  public addEventDep = (targetKey: number, dep: DepFrom) => {
    let deps = this.depsMap.get(targetKey);
    if (!deps) {
      deps = this.createEventDepsMap(targetKey);
    }
    return deps.push(dep);
  };

  public getEventDep = (targetKey: number) => {
    return this.depsMap.get(targetKey);
  };

  public deleteEventDep = (key: number, type: DepsFromType, eventInstanceKey: number) => {
    const deps = this.depsMap.get(key)!;
    const index = deps.findIndex(({ depsFromType, eventKey }) => {
      return type === depsFromType && eventInstanceKey === eventKey;
    });
    const [dep] = deps.splice(index, 1);
    return dep;
  };
}

export function generateEventDepFromItem(
  parent: ComponentInstance | PluginInstance,
  { key: eventKey }: EventInstance,
  index?: number,
): DepFrom {
  const isHotArea = typeof index === 'number';
  return {
    depsFromType: isHotArea
      ? DepsFromType.HotArea
      : (parent as ComponentInstance).component
      ? DepsFromType.Component
      : DepsFromType.Plugin,
    parentKey: parent.key,
    index,
    eventKey,
  };
}

export const componentEventDepsMap = new DepsMap<DepsTargetType.Component>();

export const pluginEventDepsMap = new DepsMap<DepsTargetType.Plugin>();
