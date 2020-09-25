import { Service } from 'egg';
import { DSL } from 'types';
import { DBTable } from 'utils';

// interface CreatePageParams {}

export default class Page extends Service {
  public async createPage(dsl: DSL) {
    const result = await this.createPageRecord(dsl);
    console.log(result);
    // const { insertId: historyId } = await this.createHistoryRecord(dsl);
    return '1';
  }

  private createPageRecord({ pageKey, global: { pageMode, layoutMode } }: DSL) {
    return this.app.mysql.insert(DBTable.PAGE, {
      key: pageKey,
      createdTime: Date.now(),
      author: 'qy',
      biz: 'test',
      layoutMode,
      pageMode,
    });
  }

  // private async createHistoryRecord({
  //   global: {
  //     metaInfo: { title, desc, duration, expiredJump },
  //     globalProps,
  //     globalStyle,
  //   },
  //   pageInstances,
  //   pluginInstances,
  //   editInfo,
  // }: DSL) {
  //   return this.app.mysql.insert(DBTable.HISTORY, {
  //     createdTime: new Date(),
  //     author: 'qy',
  //     title,
  //     desc,
  //     startTime: duration ? new Date(duration?.[0]) : undefined,
  //     endTime: duration ? new Date(duration?.[1]) : undefined,
  //     expiredJump,
  //     globalProps: JSON.stringify(globalProps),
  //     globalStyle: JSON.stringify(globalStyle),
  //     pageInstances: JSON.stringify(pageInstances),
  //     pluginInstances: JSON.stringify(pluginInstances),
  //     editInfo: JSON.stringify(editInfo),
  //   });
  // }
}
