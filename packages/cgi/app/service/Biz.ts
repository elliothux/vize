import { Service } from 'egg';
import { BizRecord, Biz as Business, QueryParams, WithId } from 'types';
import { DBTable } from 'utils';

export default class Biz extends Service {
  public queryBizRecords({ startPage = 0, pageSize }: QueryParams) {
    return this.app.mysql.select<BizRecord>(DBTable.BIZ, {
      where: {},
      limit: pageSize,
      offset: startPage * pageSize,
    });
  }

  public createBizRecord({ key, name, logo }: Business) {
    return this.app.mysql.insert<BizRecord>(DBTable.BIZ, {
      key,
      name,
      logo,
      createdTime: new Date(),
    });
  }

  public updateBizRecord({ id, key, name, logo }: WithId<Partial<Business>>) {
    return this.app.mysql.update<Partial<BizRecord>>(DBTable.BIZ, {
      id,
      key,
      name,
      logo,
      modifiedTime: new Date(),
    });
  }

  public deleteBizRecord(id: number) {
    return this.app.mysql.delete(DBTable.BIZ, { id });
  }
}
