import { observable, action } from 'mobx';
import { BizRecord, Maybe } from 'types';
import { queryBiz } from 'api';

export class BizStore {
  public init = async () => {
    const [success, data, response] = await queryBiz();
    if (!success) {
      console.error('query biz failed: ', response);
    }

    this.setBizList(data!);
  };

  @observable
  public bizList: Maybe<BizRecord[]> = null;

  @action
  public setBizList = (list: BizRecord[]) => {
    this.bizList = list;
  };
}

export const bizStore = new BizStore();

bizStore.init();
