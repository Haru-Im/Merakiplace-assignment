import { useCallback, useEffect, useState } from 'react';
import { EGlocations, GLOCATIONS_KO, IArticle, IFilter } from '../../../types';
import { useDidUpdate } from 'rooks';
import { useScrap } from '../../../providers';
import { API_KEY, API_URL } from '@env';

export type IUseFetchArticleType = {
  beginDate: string;
  query: string;
  country: string[];
};

export const useFetchArticle = () => {
  const [articleList, setArticleList] = useState<IArticle[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [filter, setFilter] = useState<IUseFetchArticleType>({
    beginDate: '',
    query: '',
    country: [],
  });

  const { scrappedArticleList } = useScrap();

  const [page, setPage] = useState(1);

  const endpointUrl = useCallback(
    (props: IUseFetchArticleType) => {
      const { beginDate, query, country } = props;
      const URL = [API_URL];

      if (beginDate) {
        URL.push(`begin_date=${beginDate}&sort=oldest`);
      } else {
        URL.push('sort=newest');
      }
      if ((country && country.length > 0) || query) {
        const fq = ['fq='];
        const filterQueryJoin = [];

        if (country && country.length > 0) {
          filterQueryJoin.push(`glocations.contains:(${country.join(',')})`);
        }

        if (query) {
          filterQueryJoin.push(`headline:(${query})`);
        }

        fq.push(filterQueryJoin.join('AND'));

        URL.push(fq.join(''));
      }

      URL.push(`page=${page}`);
      URL.push(`api-key=${API_KEY}`);

      return URL;
    },
    [filter, page],
  );

  const fetchMore = () => {
    setPage((prev) => prev + 1);
  };

  const getData = useCallback(
    async (props: IUseFetchArticleType) => {
      const url = endpointUrl(props);

      try {
        const res = await fetch(url.join('&'));

        if (!res.ok) {
          console.log(res);
          throw new Error('Network Error');
        }
        const json = await res.json();

        return json.response.docs as IArticle[];
      } catch (e) {
        console.log(e);
      }
    },
    [endpointUrl, page],
  );

  const applyFilter = (filterOptions: IUseFetchArticleType) => {
    setPage(1);
    setFilter(filterOptions);
  };

  const fetchData = async () => {
    setIsFetching(true);
    const data = await getData(filter);
    setIsFetching(false);

    if (!data) return;

    setArticleList(data);
  };

  const fetchNextPage = async () => {
    const data = await getData(filter);
    if (!data) return;

    setArticleList((prev) => {
      return [...prev, ...data];
    });
  };

  useDidUpdate(() => {
    fetchNextPage();
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [filter]);

  const queryValue = filter.query;
  const dateValue = filter.beginDate;
  const countryValue =
    filter.country.length > 1
      ? `${GLOCATIONS_KO[filter.country[0] as EGlocations]} 외 ${filter.country.length - 1}개`
      : GLOCATIONS_KO[filter.country[0] as EGlocations];

  const filteredScrappedArticleList = articleList.filter((article) =>
    scrappedArticleList.some((scrappedArticle: IArticle) => article._id === scrappedArticle._id),
  );

  const isEmpty = filteredScrappedArticleList.length === 0 || scrappedArticleList.length === 0;

  return {
    getData,
    fetchMore,
    articleList: queryValue ? filteredScrappedArticleList : scrappedArticleList,
    applyFilter,
    isFetching,
    filter: { queryValue, dateValue, countryValue, countries: filter.country } as IFilter,
    isEmpty,
  };
};
