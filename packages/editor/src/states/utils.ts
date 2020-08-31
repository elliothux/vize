import { action } from 'mobx';

export class StoreWithUtils<T extends Object> {
  @action
  public setState = (setter: (store: T) => void) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return setter(this as T);
  };
}
