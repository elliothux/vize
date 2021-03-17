import { useCallback, useEffect } from 'react';

export function useAsyncEffect(asyncFunction: (...args: any[]) => any, deps: any[] = []) {
  const fn = useCallback(() => {
    asyncFunction();
  }, [asyncFunction]);
  return useEffect(fn, deps);
}
