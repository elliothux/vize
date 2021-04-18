import { SyntheticEvent } from 'react';
import { GlobalMeta, Maybe } from '../../../types';

export interface HandlerParams {
  meta: GlobalMeta;
  globalData: object;
  globalStyle: object;
  pageData: object;
  pageStyle: object;
}

export type EventHandler = (originalEvent: Maybe<SyntheticEvent>, params: HandlerParams) => Promise<void>;
