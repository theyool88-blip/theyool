export interface CaseListItem {
  id: string;
  slug: string;
  title: string;
  categories: string[];
  categoryNames: string[];
  result: string;
  summary?: string;
  bgColor: string;
  coverImage?: string;
  backgroundImage?: string;
  date: string;
}

export interface CaseDetail extends CaseListItem {
  content: string;
}
