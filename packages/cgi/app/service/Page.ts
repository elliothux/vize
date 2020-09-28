import { Service } from 'egg';
import { DSL, PageRecord, QueryParams, WithId } from 'types';
import { DBTable } from 'utils';

// interface CreatePageParams {}

export default class Page extends Service {
  public queryPageRecords({ startPage, pageSize }: QueryParams) {
    return this.app.mysql.select<PageRecord>(DBTable.PAGE, {
      where: {},
      limit: pageSize,
      offset: startPage * pageSize,
    });
  }

  public getPageRecord(id: number) {
    return this.app.mysql.get<PageRecord>(DBTable.PAGE, { id });
  }

  public createPageRecord({ pageKey, global: { pageMode, layoutMode } }: DSL) {
    return this.app.mysql.insert(DBTable.PAGE, {
      key: pageKey,
      createdTime: Date.now(),
      author: 'qy',
      biz: 'test',
      layoutMode,
      pageMode,
    });
  }

  public updatePageRecord({ pageKey, global: { pageMode, layoutMode } }: WithId<Partial<DSL>>) {
    return this.app.mysql.insert(DBTable.PAGE, {
      key: pageKey,
      createdTime: Date.now(),
      author: 'qy',
      biz: 'test',
      layoutMode,
      pageMode,
    });
  }
}
