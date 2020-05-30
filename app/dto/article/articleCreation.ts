export interface ArticleCreation {
  title: string;
  content: string;
  tags: string[];
  catalogId: string;
  isRecommend: boolean;
  attachs: [{
    name: string;
    url: string;
  }];
}
