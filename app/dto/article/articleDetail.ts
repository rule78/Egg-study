export interface ArticleDetail {
  id: string;
  title: string;
  content: string;
  tags: string[];
  catalogId: string;
  isRecommend: boolean;
  pv: number;
  attachs: [{
    name: string;
    url: string;
  }];
  auditStatus: number;
}
