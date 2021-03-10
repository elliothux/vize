import { action, runInAction as withRunInAction } from 'mobx';

export class StoreWithUtils<T extends Object> {
  @action
  public setState = (setter: (store: T) => void, runInAction = false) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const action = () => setter(this as T);
    return runInAction ? withRunInAction(action) : action();
  };
}
