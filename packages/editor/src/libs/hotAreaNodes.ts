import { Maybe } from '@vize/types';
import { getHotAreaId } from 'utils';

// TODO
const hotAreaNodeMap = new Map<number, HTMLDivElement>();

export function setHotAreaNode(key: number, node: HTMLDivElement) {
  return hotAreaNodeMap.set(key, node);
}

export function deleteHotAreaNode(key: number) {
  return hotAreaNodeMap.delete(key);
}

export function getHotAreaNode(key: number): Maybe<HTMLDivElement> {
  return hotAreaNodeMap.get(key) || (document.getElementById(getHotAreaId(key)) as Maybe<HTMLDivElement>);
}
