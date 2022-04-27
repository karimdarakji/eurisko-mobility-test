export interface IArticle {
  abstract: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  source: string;
  multimedia?: any;
  headline?: any;
  keywords?: any;
  pub_date: string;
  document_type?: string;
  news_desk?: string;
  section_name?: string;
  byline?: {
    original: string;
    person: any;
    organization: any;
  };
  type_of_material?: string;
  _id: string;
  word_count?: number;
  uri?: string;
  isLoading?: boolean;
}
