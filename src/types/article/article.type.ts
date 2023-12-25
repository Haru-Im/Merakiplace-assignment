export type IArticle = {
  _id: string;
  abstract: string;
  pub_date: string;
  web_url: string;
  source: string;
  journalist: string;
  byline: IBylineType;
  id: string;
  title: string;
  headline: IHeadlineType;
};

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

export type IFilter = {
  queryValue: string;
  dateValue: string;
  countryValue: string;
  countries: string[];
};
