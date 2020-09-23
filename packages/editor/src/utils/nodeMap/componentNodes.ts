import { ComponentInstance, Maybe } from 'types';
import { getBottomOffsetToBodyTop } from '../dom';

export const componentNodes = new Map<number, HTMLDivElement>();

export function setComponentNode(key: number, node: HTMLDivElement) {
  return componentNodes.set(key, node);
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
