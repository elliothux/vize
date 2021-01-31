import { observable, action } from 'mobx';
import { BizRecord, Maybe } from 'types';
import { queryBiz } from 'api';

export class BizStore {
  public init = () => {
    return this.getBizList();
  };

  @observable
  public bizList: Maybe<BizRecord[]> = null;

  @action
  public setBizList = (list: BizRecord[]) => {
    this.bizList = list;
  };

  public getBizList = async () => {
    const [success, data, response] = await queryBiz();
    if (!success) {
      console.error('query biz failed: ', response);
    }

    this.setBizList(data!);
  };
}

export const bizStore = new BizStore();

bizStore.init();
