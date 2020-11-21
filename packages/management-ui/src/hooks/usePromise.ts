import { useEffect, useState } from 'react';
import { Maybe } from 'types';

export function usePromise<T>(promiseCreator: () => Promise<T>) {
  const [state, setPromiseState] = useState<[boolean, Maybe<T>]>([false, null]);

  useEffect(() => {
    promiseCreator()
      .then(result => setPromiseState([true, result]))
      .catch(console.error);
  }, [promiseCreator]);

  return state;
}
