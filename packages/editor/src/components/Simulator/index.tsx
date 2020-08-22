import * as React from 'react';
import { WithReactChildren } from 'types';
import { useCallback, useEffect, useRef } from 'react';
import { getOffsetToViewport } from '../../utils';

import './index.scss';

type Props = WithReactChildren;
let [clientX, clientY] = [0, 0];
export function Simulator({ children }: Props) {
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

  return (
    <div className="vize-simulator-container">
      <div className="simulator" ref={ref}>
        {children}
      </div>
    </div>
  );
}

export function getSimulatorNodeOffset() {
  return [clientX, clientY];
}
