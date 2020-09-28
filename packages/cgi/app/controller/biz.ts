import { Controller } from 'egg';
import { Biz, QueryParams, WithId } from 'types';
import { CGIResponse } from 'utils';

export default class BizController extends Controller {
  public async queryBiz() {
    const { ctx } = this;
    const query = ctx.request.body as QueryParams;
    const result = await ctx.service.biz.queryBizRecords(query);
    console.log(result);
    ctx.body = CGIResponse.success();
  }

  public async createBiz() {
    const { ctx } = this;
    const biz = ctx.request.body as Biz;
    const result = await ctx.service.biz.createBizRecord(biz);
    console.log(result);
    ctx.body = CGIResponse.success();
  }

  public async updateBiz() {
    const { ctx } = this;
    const biz = ctx.request.body as WithId<Biz>;
    const result = await ctx.service.biz.updateBizRecord(biz);
    console.log(result);
    ctx.body = CGIResponse.success();
  }

  public async deleteBiz() {
    const { ctx } = this;
    const { id } = ctx.request.body as WithId<{}>;
    const result = await ctx.service.biz.deleteBizRecord(id);
    console.log(result);
    ctx.body = CGIResponse.success();
  }
}
