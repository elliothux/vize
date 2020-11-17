import { useCallback, useEffect } from 'react';

export function useAsyncEffect(asyncFunction: (...args: any[]) => Promise<any>, deps: any[] = []) {
  const fn = useCallback(() => {
    asyncFunction();
  }, [asyncFunction]);
  return useEffect(fn, deps);
}
