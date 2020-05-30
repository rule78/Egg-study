export interface ArticleLogList {
  totalCount: number;
  page: number;
  dataList: ArticleLog[];
}

export interface ArticleLog {
  id: string;
  operator: string;
  operateContent: string;
  date: Date;
}
