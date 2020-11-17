import { useCallback, useState } from 'react';

export function useArray<T>(initValue: T[]) {
  const [array, setArray] = useState(initValue);
  const push = useCallback((...values: T[]) => setArray(current => [...current, ...values]), [setArray]);

  return {
    value: array,
    setValue: setArray,
    push,
  };
}
