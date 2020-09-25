import { Service } from 'egg';
import { HistoryRecord, QueryParams } from 'types';
import { DBTable } from 'utils';

export default class History extends Service {
  public queryHistoryRecords({ startPage = 0, pageSize, pageId }: QueryParams & { pageId: number }) {
    return this.app.mysql.select<HistoryRecord>(DBTable.HISTORY, {
      where: { page: pageId },
      limit: pageSize,
      offset: startPage * pageSize,
    });
  }
}
