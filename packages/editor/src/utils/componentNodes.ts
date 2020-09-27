import { ComponentInstance, Maybe } from 'types';
import { EventProxy } from './eventProxy';
import { getBottomOffsetToBodyTop } from './dom';

const componentNodes = new Map<number, HTMLDivElement>();

export function setComponentNode(key: number, node: HTMLDivElement) {
  componentNodes.set(key, node);
  // events.emit(getCallbackEventName(key));
  // events.emit('*');
}

export function deleteComponentNode(key: number) {
  return componentNodes.delete(key);
}

export function getComponentNode(key: number): Maybe<HTMLDivElement> {
  return componentNodes.get(key);
}

export function getMaxNodeBottomOffset(instances: ComponentInstance[]): number {
  let y = 0;
  instances.forEach(({ key }) => {
    const node = getComponentNode(key);
    if (!node) {
      return;
    }

    const offset = getBottomOffsetToBodyTop(node!);
    y = offset > y ? offset : y;
  });
  return y;
}

/*
 *** Component Render Callback
 */

const events = new EventProxy();

type ComponentRenderCallback = (node: HTMLDivElement) => void;

function getCallbackEventName(key: number) {
  return `component_render_${key}`;
}

export function afterComponentRender(callback: ComponentRenderCallback, key: number | '*' = '*', once = true) {
  if (key === '*') {
    return events.on('*', callback);
  }
  const eventName = getCallbackEventName(key);
  return once ? events.once(eventName, callback) : events.on(eventName, callback);
}
