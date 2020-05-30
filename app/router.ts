import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/health', controller.health.index);
  router.get('/api/v1/articles/search', controller.v1.article.articleSearch);
  router.get('/api/v1/articles/:id/logs', controller.v1.articleLog.logList);
  router.put('/api/v1/articles/:id/audit', controller.v1.article.audit);

  router.resources('articleResource', '/api/v1/articles', controller.v1.article);

};
