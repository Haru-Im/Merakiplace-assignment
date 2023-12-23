import { useCallback, useMemo } from 'react';
import { IArticleType } from './type';

type IUseFetchArticleType = {
  beginDate: string;
  endDate: string;
  page: number;
  query: string;
};

export const useFetchArticle = (props: IUseFetchArticleType) => {
  const { endDate, beginDate, page = 1, query } = props;

  const endpointUrl = useMemo(() => {
    const URL = ['https://api.nytimes.com/svc/search/v2/articlesearch.json?'];
    if (beginDate && endDate) {
      URL.push(`begin_date=${beginDate}&end_date=${endDate}`);
    }

    if (query) {
      URL.push(`q=${query}`);
    }

    if (page) {
      URL.push(`page=${page}`);
    }

    URL.push(`api-key=9AVUhjiQVOwFA0IFfUAWrZBOoG3pGqlg`);

    return URL;
  }, [props]);

  const getData = useCallback(async () => {
    try {
      console.log(endpointUrl.join('&'));
      const res = await fetch(endpointUrl.join('&'));

      if (!res.ok) {
        throw new Error('Network Error');
      }
      const json = await res.json();

      return json.response.docs as IArticleType[];
    } catch (e) {
      console.log(e);
    }
  }, [endpointUrl]);

  return { getData };
};
