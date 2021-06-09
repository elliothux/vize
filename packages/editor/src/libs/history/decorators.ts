import { action } from 'mobx';
import { timeTraveler } from './timeTraveling';
import { recordStoreHistory, recordedStores } from './record';

export const withTimeTravel = <T extends { new (...args: unknown[]): any }>(target: T): T => {
  const original = target;
  const f = function(...args: ConstructorParameters<typeof target>) {
    const { name } = original;
    if (recordedStores[name]) {
      throw new Error(
        `Store "${name}" has already been recorded. Make sure that every store has an unique class name and instantiated only once`,
      );
    }

    const instance = new original(...args);
    recordStoreHistory({ [name]: instance as object });
    return instance;
  };
  f.prototype = original.prototype;
  return f as any;
};

let updating = false;

export const withSnapshot = (payload?: Record<string, any>) => (
  target: object,
  propertyKey: string,
  descriptor?: PropertyDescriptor,
): void => {
  const { initializer } = descriptor as any;
  descriptor!.value = function(...args: Parameters<ReturnType<typeof initializer>>) {
    const inUpdating = updating;
    if (!inUpdating) {
      updating = true;
    }
    const result = initializer.apply(this).apply(this, args);
    if (!inUpdating) {
      setTimeout(async () => {
        if (result instanceof Promise) {
          await result;
        }
        timeTraveler.updateSnapshots(payload);
        updating = false;
      }, 0);
    }
    return result;
  };
};

interface ActionWithSnapshot {
  (target: object, propertyKey: string, descriptor?: PropertyDescriptor): void;
  (payload: Record<string, any>): (target: object, propertyKey: string, descriptor?: PropertyDescriptor) => void;
}

export const actionWithSnapshot: ActionWithSnapshot = (
  payloadOrTarget: Record<string, any> | object,
  propertyKey?: string,
  descriptor?: PropertyDescriptor,
) => {
  if (!propertyKey) {
    const payload = payloadOrTarget as Record<string, any>;
    return (target: object, propertyKey: string, descriptor?: PropertyDescriptor) => {
      withSnapshot(payload)(target, propertyKey, descriptor);
      return action(target, propertyKey, descriptor);
    };
  }

  const target = payloadOrTarget as object;
  withSnapshot(undefined)(target, propertyKey, descriptor);
  return action(target, propertyKey, descriptor) as any;
};
