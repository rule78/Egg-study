import BaseController from '../../core/baseController';

export default class ArticleLog extends BaseController {
  /**
   * 日志列表
   */
  async logList() {
    const { ctx } = this;
    const articlid = ctx.params.id;
    const page: number = parseInt(ctx.query.page);
    const size: number = parseInt(ctx.query.size);
    const result = await ctx.service.articleLog.list(articlid, page, size);
    return this.returnSuccess(result);
  }
}
