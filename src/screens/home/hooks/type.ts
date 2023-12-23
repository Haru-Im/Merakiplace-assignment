export interface IArticleType {
  abstract: string;
  web_url: string;
  snippet: string;
  lead_paragraph: string;
  source: string;
  multimedia: IMediaType[];
  headline: IHeadlineType;
  keywords: any[];
  pub_date: string;
  document_type: string;
  news_desk: string;
  section_name: string;
  byline: IBylineType;
  type_of_material: string;
  _id: string;
  word_count: number;
  uri: string;
}

export interface IMediaType {
  rank: number;
  subtype: string;
  caption: string | null;
  credit: string | null;
  type: string;
  url: string;
  height: number;
  width: number;
  legacy?: Record<string, any>;
  subType: string;
  crop_name: string;
}

export interface IHeadlineType {
  main: string;
  kicker: string | null;
  content_kicker: string | null;
  print_headline: string | null;
  name: string | null;
  seo: string | null;
  sub: string | null;
}

export interface IBylineType {
  original: string;
  person: IBylinePersonType[];
  organization: string | null;
}

export interface IBylinePersonType {
  firstname: string;
  middlename: string | null;
  lastname: string;
  qualifier: string | null;
  title: string | null;
  role: string;
  organization: string;
  rank: number;
}
