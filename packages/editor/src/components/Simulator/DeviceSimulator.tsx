import * as React from 'react';
import { useCallback, useState } from 'react';
import { editStore } from 'states';
import { SimulatorOperations } from './SimulatorOperations';
import { observer } from 'mobx-react';

function IDeviceSimulator({ children }: React.PropsWithChildren<{}>, ref: React.MutableRefObject<HTMLDivElement>) {
  const {
    device: [, w, h],
    zoom,
  } = editStore;

  const [rotate, setRotate] = useState(false);
  const toggleRotate = useCallback(() => setRotate(i => !i), []);

  const width = rotate ? h : w;
  const height = rotate ? w : h;
  //
  // const transform = useMemo(() => {
  //   const translateX = Math.ceil(-24 - (width / 2) * (zoom / 100 - 1));
  //   const translateY = Math.ceil((height / 2) * (zoom / 100 - 1));
  //   return `translateX(${translateX}px) translateY(${translateY}px)`;
  // }, [width, height, zoom]);

  return (
    <div className="vize-simulator-container">
      <div
        ref={ref}
        className="simulator"
        style={{
          width: width + 2,
          height: height + 2,
          minWidth: width + 2,
          maxWidth: width + 2,
          minHeight: height + 2,
          maxHeight: height + 2,
          transform: `scale(${zoom / 100})`,
        }}
      >
        {children}
      </div>
      <SimulatorOperations toggleRotate={toggleRotate} />
    </div>
  );
}

export const DeviceSimulator = observer(
  React.forwardRef<HTMLDivElement, React.PropsWithChildren<{}>>(IDeviceSimulator as any),
);
