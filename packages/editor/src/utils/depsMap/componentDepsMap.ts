export enum DepsType {
  Component = 'component',
  Plugin = 'plugin',
}

/**
 * @desc Event Instances which deps on component
 * @struct Map<ComponentKey, [DepsType, EventKey]>
 */
const componentDepsMap = new Map<number, [DepsType, number][]>();

export function createComponentEventDepsMap(componentKey: number) {
  return componentDepsMap.set(componentKey, []);
}

export function deleteComponentEventDepsMap(componentKey: number) {
  return componentDepsMap.delete(componentKey);
}

export function getComponentEventDeps(componentKey: number) {
  return componentDepsMap.get(componentKey);
}

export function addComponentEventDep(componentKey: number, type: DepsType, eventKey: number) {
  return componentDepsMap.get(componentKey)!.push([type, eventKey]);
}

export function deleteComponentEventDep(componentKey: number, type: DepsType, eventKey: number) {
  const deps = componentDepsMap.get(componentKey)!;
  const index = deps.findIndex(([depType, depEventKey]) => type === depType && eventKey === depEventKey);
  return deps.splice(index, 1);
}
