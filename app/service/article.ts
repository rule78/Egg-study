import { Service } from 'egg';
import { ArticleCreation } from '../dto/article/articleCreation';
import { Result } from '../dto/result';
import { ArticleDetail } from '../dto/article/articleDetail';
import moment = require('moment');
import { UserInfo } from '../dto/user/userInfo';
import { AuditStatusEnum, IsValidEnum } from '../dto/enum';
export default class ArticleService extends Service {
  /**
   * 创建文章
   * @param creation 创建文章实体
   * @param user 用户
   */
  async create(creation: ArticleCreation, user: UserInfo): Promise<Result> {
    const titleResult = await this.app.model.Article.findOne({ title: creation.title, isValid: 1 });
    if (titleResult) {
      return { success: false, message: '标题重复' };
    }
    const insertModel = await this.app.model.Article.create(Object.assign(creation, {
       createUser: user.accountId,
       createDate: moment(),
       auditStatus: AuditStatusEnum.Wait,
    }));
    const log = {
      articleId: insertModel.id,
      operator: user.displayName,
      operateContent: '新增文章',
      createUser: user.accountId,
    };
    await this.app.model.ArticleLog.create(log);
    return { success: true, message: insertModel.id };
  }

  /**
   * 文章详情
   * @param id 文章id
   */
  async detail(id: string): Promise<ArticleDetail> {
    const detail = await this.app.model.Article.findOne({ _id: id, isValid: IsValidEnum.True });
    if (detail) {
      const article: ArticleDetail = {} as ArticleDetail;
      article.id = detail._id;
      article.catalogId = detail.catalogId;
      article.attachs = detail.attachs;
      article.isRecommend = detail.isRecommend;
      article.content = detail.content;
      article.title = detail.title;
      article.tags = detail.tags;
      article.auditStatus = detail.auditStatus;
      return article;
    }
    return {} as ArticleDetail;
  }

  /**
   * 修改文章
   * @param article 修改文章实体
   */
  async update(article: ArticleDetail, user: UserInfo): Promise<Result> {
    const titleResult = await this.app.model.Article.findOne({ title: article.title, isValid: IsValidEnum.True });
    if (titleResult && titleResult._id.toString() !== article.id) {
      return { success: false, message: '标题重复' };
    }
    const log = {
      articleId: article.id,
      operator: user.displayName,
      operateContent: '修改文章',
      createUser: user.accountId,
    };
    await Promise.all([
      this.app.model.Article.findByIdAndUpdate(article.id, Object.assign(article, { modifyUser: user.accountId, auditStatus: AuditStatusEnum.Wait })),
      this.app.model.ArticleLog.create(log),
    ]);
    return { success: true, message: '' };
  }

  /**
   * 删除文章
   * @param id 文章id
   * @param user 用户id
   */
  async destroy(id: string, user: UserInfo) {
    const log = {
      articleId: id,
      operator: user.displayName,
      operateContent: '删除文章',
      createUser: user.accountId,
    };
    await Promise.all([
      this.app.model.Article.findByIdAndUpdate(id, { isValid: IsValidEnum.False, modifyUser: user.accountId }),
      this.app.model.ArticleLog.create(log),
    ]);
  }
