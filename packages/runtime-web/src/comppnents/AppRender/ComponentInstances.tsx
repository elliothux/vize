import * as React from 'react';
import { Props } from './types';
import { ComponentItem } from './ComponentItem';

export function ComponentInstances({
  global,
  meta,
  componentInstances,
}: Pick<Props, 'global' | 'meta' | 'componentInstances'>) {
  return (
    <>
      {componentInstances.map(instance => (
        <ComponentItem key={instance.key} instance={instance} global={global} meta={meta} />
      ))}
    </>
  );
}
