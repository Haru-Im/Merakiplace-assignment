import { ReactNode, createContext, useContext, useEffect } from 'react';
import { MMKV, useMMKV } from 'react-native-mmkv';

export type IStorageContext = {
  storage: MMKV;
};

export const StorageContext = createContext<IStorageContext | null>(null);

type IStorageProviderProps = {
  children: ReactNode;
};

export const StorageProvider = ({ children }: IStorageProviderProps) => {
  const storage = useMMKV();

  useEffect(() => {
    if (storage.getAllKeys().length === 0) {
      storage.set('scrappedArticleList', JSON.stringify([]));
    }
  }, []);

  return <StorageContext.Provider value={{ storage }}>{children}</StorageContext.Provider>;
};

export const useStorage = () => {
  const context = useContext(StorageContext);

  if (!context) {
    throw new Error('need Storage provider');
  }

  return context;
};
