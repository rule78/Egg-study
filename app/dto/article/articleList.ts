export interface ArticleList {
  totalCount: number;
  page: number;
  dataList: SimpleArticle[];
}

export interface SimpleArticle {
  id: string;
  title: string;
  content: string;
  date: Date;
  catalogName: string;
  isAttachs: boolean;
  pv: number;
}
