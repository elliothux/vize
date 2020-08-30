import { Maybe } from 'types';
import { getHotAreaId } from './common';

export const hotAreaNodeMap = new Map<number, HTMLDivElement>();

export function setHotAreaNode(key: number, node: HTMLDivElement) {
  hotAreaNodeMap.set(key, node);
}

export function deleteHotAreaNode(key: number) {
  return hotAreaNodeMap.delete(key);
}

export function getHotAreaNode(key: number): Maybe<HTMLDivElement> {
  return hotAreaNodeMap.get(key) || (document.getElementById(getHotAreaId(key)) as Maybe<HTMLDivElement>);
}

Object.defineProperty(window, '__hotAreaInstanceNodeMap', {
  get() {
    return hotAreaNodeMap;
  },
});
