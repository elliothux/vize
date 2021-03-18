import './index.scss';
import * as React from 'react';
import { memo, useCallback, useEffect, useRef } from 'react';
import { WithReactChildren } from 'types';
import { getOffsetToViewport } from 'utils';
import { DeviceSimulator } from './DeviceSimulator';

let [clientX, clientY] = [0, 0];

function ISimulator({ children }: WithReactChildren) {
  const ref = useRef<HTMLDivElement>(null);

  const setClientRect = useCallback(() => {
    const { top, left } = getOffsetToViewport(ref.current!);
    [clientX, clientY] = [left, top];
  }, []);

  useEffect(() => {
    window.addEventListener('resize', setClientRect);
    return () => window.removeEventListener('resize', setClientRect);
  }, []);

  useEffect(() => {
    if (ref.current) {
      setClientRect();
    }
  }, [ref.current]);

  return <DeviceSimulator ref={ref}>{children}</DeviceSimulator>;
}

export const Simulator = memo(ISimulator);

export function getSimulatorNodeOffset() {
  return [clientX, clientY];
}
