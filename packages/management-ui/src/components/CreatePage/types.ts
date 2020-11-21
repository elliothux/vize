import { CreatePageParams } from '../../api';

export interface ItemProps<T> {
  current: T;
  setCurrent: (current: T) => void;
  showErr?: boolean;
}

export type PageDetail = Omit<CreatePageParams, 'author' | 'pageMode' | 'layoutMode'>;
