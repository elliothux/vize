import * as React from 'react';
import { Fragment } from 'react';
import { HotAreaItem } from 'components/HotAreaItem';
import { ComponentInstance } from '@vize/types';
import { HotAreaContextMenu } from 'components/ContextMenu';

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
        <Fragment key={hotArea.key}>
          <HotAreaItem index={index} componentInstanceKey={key} hotArea={hotArea} />
          <HotAreaContextMenu instance={hotArea} index={index} />
        </Fragment>
      ))}
    </>
  );
}
