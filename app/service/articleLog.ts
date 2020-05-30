import { Service } from 'egg';
import { ArticleLogList, ArticleLog } from '../dto/articleLog/articleLogList';

export default class ArticleLogService extends Service {
  /**
   * 文章日志列表
   * @param articleId 文章id
   * @param page 页码
   * @param size 每页树
   */
  async list(articleId: string, page: number, size: number): Promise<ArticleLogList> {
    const result: ArticleLogList = { totalCount: 0, page, dataList: [] };
    const [ list, totalCount ] = await Promise.all([
      this.app.model.ArticleLog.find({ articleId, isValid: 1 }).sort({ createDate: -1 }).skip((page - 1) * size).limit(size),
      this.app.model.ArticleLog.count({ articleId, isValid: 1 }),
    ]);
    for (const l of list) {
      const articleLog: ArticleLog = {
        id: l._id,
        operator: l.operator,
        operateContent: l.operateContent,
        date: l.createDate,
      };
      result.dataList.push(articleLog);
     }
    result.totalCount = totalCount;
    return result;
  }
}
