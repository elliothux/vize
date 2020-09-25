import { Controller } from 'egg';
import { QueryParams } from 'types';
import { CGIResponse, defaultPageSize } from 'utils';

export default class PageController extends Controller {
  public async queryPage() {
    const { ctx } = this;
    const { startPage, pageSize = defaultPageSize } = ctx.query as QueryParams;
    console.log(startPage, pageSize);
    ctx.body = CGIResponse.success();
  }

  public async createPage() {
    const { ctx } = this;
    // const result = await ctx.service.page.createPage(ctx.request.body as DSL);
    const result = await ctx.service.biz.createBizRecord({
      key: 'test',
      name: '测试业务',
      logo: 'https://image.flaticon.com/icons/png/128/3428/3428693.png',
    });
    console.log(result);
    ctx.body = CGIResponse.success();
  }
}
