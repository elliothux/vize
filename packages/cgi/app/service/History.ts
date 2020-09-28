import { Service } from 'egg';
import { DSL, HistoryRecord, QueryParams } from 'types';
import { DBTable } from 'utils';

export default class History extends Service {
  public queryHistoryRecords({ startPage = 0, pageSize, pageId }: QueryParams & { pageId: number }) {
    return this.app.mysql.select<HistoryRecord>(DBTable.HISTORY, {
      where: { page: pageId },
      limit: pageSize,
      offset: startPage * pageSize,
    });
  }

  public async getHistoryRecord(id: number) {
    return this.app.mysql.get<HistoryRecord>(DBTable.HISTORY, { id });
  }

  public async createHistoryRecord(
    pageId: number,
    {
      global: {
        metaInfo: { title, desc, duration, expiredJump },
        globalProps,
        globalStyle,
      },
      pageInstances,
      pluginInstances,
      editInfo,
    }: DSL,
  ) {
    return this.app.mysql.insert<HistoryRecord>(DBTable.HISTORY, {
      page: pageId,
      createdTime: new Date(),
      author: 'qy',
      title,
      desc,
      startTime: duration ? new Date(duration?.[0]) : undefined,
      endTime: duration ? new Date(duration?.[1]) : undefined,
      expiredJump,
      globalProps: JSON.stringify(globalProps),
      globalStyle: JSON.stringify(globalStyle),
      pageInstances: JSON.stringify(pageInstances),
      pluginInstances: JSON.stringify(pluginInstances),
      editInfo: JSON.stringify(editInfo),
    });
  }
}
