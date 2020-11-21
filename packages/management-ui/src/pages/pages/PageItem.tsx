import * as React from 'react';
import { PageRecord } from '../../types';

interface Props {
  item: PageRecord;
}

export function PageItem({ item }: Props) {
  return <div>{item.id}</div>;
}
