import * as React from 'react';
import { AppRenderProps } from '../AppRender/types';
import { ComponentItem } from '../ComponentItem';

export function ComponentInstances({
  global,
  meta,
  componentInstances,
}: Pick<AppRenderProps, 'global' | 'meta' | 'componentInstances'>) {
  return (
    <>
      {componentInstances.map(instance => (
        <ComponentItem key={instance.key} instance={instance} global={global} meta={meta} />
      ))}
    </>
  );
}
