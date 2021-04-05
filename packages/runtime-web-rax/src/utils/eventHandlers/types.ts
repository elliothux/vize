import { SyntheticEvent } from 'rax';
import { GlobalMeta, Maybe } from '@vize/types';

export interface HandlerParams {
  meta: GlobalMeta;
  globalData: object;
  pageData: object;
}

export type EventHandler = (originalEvent: Maybe<SyntheticEvent>, params: HandlerParams) => Promise<void>;
