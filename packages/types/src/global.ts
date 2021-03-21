import { Maybe } from './helper';

export enum LayoutMode {
  STREAM = 'stream',
  FREE = 'free',
}

export interface GlobalMeta {
  title?: string;
  desc?: string;
  longTerm?: boolean;
  duration?: Maybe<[string, string]>;
  expiredJump?: string;
  id: Maybe<number>;
  key: string;
  isTemplate: boolean;
  isEditor: boolean;
}
