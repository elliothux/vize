import * as Rax from 'rax';

export function preventSyntheticEvent<T = HTMLElement, E = Event>(e: Rax.SyntheticEvent<T, E> | Event) {
  e.preventDefault();
  e.stopPropagation();
  return false;
}

export function withPreventEvent<T = HTMLElement, E = Event>(action: Function) {
  return (e: Rax.SyntheticEvent<T, E> | Event) => {
    action();
    return preventSyntheticEvent(e);
  };
}

type ReactEventHandler<T> = (e: T) => void;

export function withPersistReactEvent<T extends Rax.BaseSyntheticEvent = Rax.SyntheticEvent>(
  handler: ReactEventHandler<T>,
): ReactEventHandler<T> {
  return (e: T) => {
    e.persist();
    return handler(e);
  };
}
