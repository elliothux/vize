import { InstanceKeyType } from 'types';
import { isNumber } from 'utils';

const keyMap = new Map<InstanceKeyType, number>();

export function generateKey(type: InstanceKeyType): number {
  const v = keyMap.get(type);

  if (isNumber(v)) {
    keyMap.set(type, v! + 1);
    return v! + 1;
  }

  return createFromType(type);
}

export function setMaxKey(type: InstanceKeyType, max: number): void {
  const v = keyMap.get(type);

  if (!isNumber(v) || max > v!) {
    keyMap.set(type, max);
  }
}

export function getMaxKey(type: InstanceKeyType): number {
  const v = keyMap.get(type);

  if (isNumber(v)) {
    return v!;
  }

  return createFromType(type);
}

function createFromType(type: InstanceKeyType) {
  keyMap.set(type, 1);
  return 1;
}
