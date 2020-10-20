import * as React from 'react';
import { HotAreaItem } from 'components/HotAreaItem';
import { ComponentInstance } from 'types';

interface Props {
  instance: ComponentInstance;
}

export function ComponentHotAreas({ instance: { key, hotAreas } }: Props) {
  if (!hotAreas?.length) {
    return null;
  }

  return (
    <>
      {hotAreas.map((hotArea, index) => (
        <HotAreaItem key={hotArea.key} index={index} componentInstanceKey={key} hotArea={hotArea} />
      ))}
    </>
  );
}
