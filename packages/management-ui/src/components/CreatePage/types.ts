import { BizRecord } from '../../types';

export interface ItemProps<T> {
  current: T;
  setCurrent: (current: T) => void;
  showErr?: boolean;
}

export interface PageDetail {
  biz: BizRecord['id'];
  key: string;
  title: string;
  desc: string;
}
