import * as React from 'react';

export function preventSyntheticEvent<T = HTMLElement, E = Event>(e: React.SyntheticEvent<T, E> | Event) {
  e.preventDefault();
  e.stopPropagation();
  return false;
}

export function withPreventEvent<T = HTMLElement, E = Event>(action: Function) {
  return (e: React.SyntheticEvent<T, E> | Event) => {
    action();
    return preventSyntheticEvent(e);
  };
}

type ReactEventHandler<T> = (e: T) => void;

export function withPersistReactEvent<T extends React.BaseSyntheticEvent = React.SyntheticEvent>(
  handler: ReactEventHandler<T>,
): ReactEventHandler<T> {
  return (e: T) => {
    e.persist();
    return handler(e);
  };
}
