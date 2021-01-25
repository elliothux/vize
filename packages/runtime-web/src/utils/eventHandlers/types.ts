import { GlobalMeta, Maybe } from '@vize/types';
import * as React from 'react';

export interface HandlerParams {
  meta: GlobalMeta;
  global: object;
}

export type EventHandler = (originalEvent: Maybe<React.SyntheticEvent>, params: HandlerParams) => Promise<void>;
