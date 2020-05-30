import BaseController from '../../core/baseController';
import { Context } from 'egg';
export default class ArticleController extends BaseController {
  articleRule: {};
  constructor(ctx: Context) {
    super(ctx);
    this.articleRule = {
      title: 'string',
      content: 'string',
      tags: { type: 'array', required: false },
      catalogId: 'string',
      isRecommend: 'bool',
      attachs: { type: 'array', required: false },
    };
  }
  /**
   * 创建文章
   */
  async create() {
    const { ctx } = this;
    const params = ctx.request.body;
    const user = ctx.user;
    this.validateParam(this.articleRule, params);
    const result = await ctx.service.article.create(params, user);
    if (result.success) {
      this.returnSuccess({ id: result.message }, 201);
    } else {
      this.returnMessage(400, result.message);
    }
  }
  /**
   * 修改文章
   */
  async update() {
    const { ctx } = this;
    const params = ctx.request.body;
    params.id = ctx.params.id;
    this.validateParam(this.articleRule, params);
    const result = await ctx.service.article.update(params, ctx.user);
    if (result.success) {
      this.returnSuccess({}, 204);
    } else {
      this.returnMessage(400, result.message);
    }
  }

  /**
   * 删除文章
   */
  async destroy() {
    const { ctx } = this;
    const user = ctx.user;
    await ctx.service.article.destroy(ctx.params.id, user);
    this.returnSuccess({}, 204);
  }


  /**
   * 文章详情信息
   */
  async show() {
    const { ctx } = this;
    const { id } = ctx.params;
    const { user } = ctx;
    const [ detail, isColloction ] = await Promise.all([
      ctx.service.article.detail(id),
      ctx.service.collection.isCollection(id, user),
    ]);
    // 修改公告为已读，增加pv到redis
    await Promise.all([
      ctx.service.boardArticle.readRecord(id, user),
      ctx.service.pv.pvTempStorage(id),
    ]);
    if (!ctx.helper.isObjectEmpty(detail)) {
      this.returnSuccess(Object.assign(detail, { isColloction }));
    } else {
      this.returnMessage(404, '文章不存在');
    }
  }

  /**
   * 我的文章列表
   */
  async myArticle() {
    const { ctx } = this;
    const page = parseInt(ctx.query.page);
    const size = parseInt(ctx.query.size);
    const result = await ctx.service.article.myArticle(page, size, ctx.user);
    return this.returnSuccess(result);
  }
