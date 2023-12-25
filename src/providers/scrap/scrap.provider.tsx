import { ReactNode, createContext, useCallback, useContext, useState } from 'react';
import { IArticle } from '../../types';
import { useToast } from 'react-native-toast-notifications';
import { useStorage } from '../storage';
import { useDidUpdate } from 'rooks';

export type IScrapContext = {
  scrap: (data: IArticle) => void;
  scrappedArticleList: IArticle[];
  isScrapped: (id: string) => boolean;
};

export const ScrapContext = createContext<IScrapContext | null>(null);

type IScrapProviderProps = {
  children: ReactNode;
};

export const ScrapProvider = ({ children }: IScrapProviderProps) => {
  const { storage } = useStorage();
  const [scrappedArticleList, setscrappedArticleList] = useState<IArticle[]>(
    JSON.parse(storage.getString('scrappedArticleList') as string) || [],
  );
  const isScrapped = useCallback(
    (id: string) => {
      return scrappedArticleList.some((e) => e._id === id);
    },
    [scrappedArticleList],
  );

  const toast = useToast();

  const scrap = (data: IArticle) => {
    const articleId = data._id;
    const isScrappedArticle = scrappedArticleList.some((e) => e._id === articleId);
    if (isScrappedArticle) {
      toast.show('스크랩을 해제했습니다.', {
        type: 'viewed_toast',
      });
      setscrappedArticleList((prev) => prev.filter((e) => e._id !== articleId));
    } else {
      toast.show('스크랩 했습니다.', {
        type: 'viewed_toast',
      });
      setscrappedArticleList((prev) => [...prev, data]);
    }
  };

  useDidUpdate(() => {
    storage.set('scrappedArticleList', JSON.stringify(scrappedArticleList));
  }, [scrappedArticleList]);

  return (
    <ScrapContext.Provider value={{ scrap, scrappedArticleList, isScrapped }}>
      {children}
    </ScrapContext.Provider>
  );
};

export const useScrap = () => {
  const context = useContext(ScrapContext);

  if (!context) {
    throw new Error('need Scrap provider');
  }

  return context;
};
