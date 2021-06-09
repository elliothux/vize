import { useCallback, useState } from 'react';

export function useRerender() {
  const [, setCursor] = useState(0);
  return useCallback(() => setCursor(i => i + 1), []);
}
