import * as React from 'react';
import { Maybe } from 'types';

interface Props {
  component: Maybe<[number, Maybe<string>]>;
  setComponent: (component: [number, Maybe<string>]) => void;
}

export function ComponentTargetSelector({}: Props) {
  return <div>1</div>;
}
