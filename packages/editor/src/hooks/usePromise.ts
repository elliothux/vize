import { useEffect, useState } from 'react';
import { Maybe } from 'types';

export function usePromise<T>(promiseCreator: () => Promise<T>, deps?: any[]) {
  const [state, setPromiseState] = useState<[boolean, Maybe<T>]>([false, null]);

  useEffect(() => {
    promiseCreator()
      .then(result => setPromiseState([true, result]))
      .catch(console.error);
  }, deps || [promiseCreator]);

  return state;
}
