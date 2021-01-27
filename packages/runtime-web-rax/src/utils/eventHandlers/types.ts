import * as Rax from 'rax';
import { GlobalMeta, Maybe } from '@vize/types';

export interface HandlerParams {
  meta: GlobalMeta;
  global: object;
}

export type EventHandler = (originalEvent: Maybe<Rax.SyntheticEvent>, params: HandlerParams) => Promise<void>;
