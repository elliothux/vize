import { BizRecord } from '../../types';

export interface ItemProps<T> {
  current: T;
  setCurrent: (current: T) => void;
}

export interface PageDetail {
  biz: BizRecord['id'];
  key: string;
  title: string;
  desc: string;
}
