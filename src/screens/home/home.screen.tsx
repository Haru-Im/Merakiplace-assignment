import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { memo, useEffect, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { IMainTabParamsList } from '../main';
import { IArticleType, useFetchArticle } from './hooks';
import { EIconType, HeaderFilter } from '../../shared';
import { ArticleFilterView, ArticleListView } from './views';
import { useModal } from '../../providers';

export type IHomeScreenParamList = {};

export type IHomeScreenNavigationProp = NativeStackNavigationProp<
  IMainTabParamsList,
  'HomeScreen',
  undefined
>;
export type IHomeScreenRouteProp = RouteProp<IMainTabParamsList, 'HomeScreen'>;

type IHomeScreenProps = {
  navigation: IHomeScreenNavigationProp;
  route: IHomeScreenRouteProp;
};
const mock_data = [
  {
    buttonTitle: '전체 헤드라인',
    buttonIconType: EIconType.Calendar,
    selected: false,
    onPress: () => console.log(123),
  },
  {
    buttonTitle: '헤드라인',
    buttonIconType: EIconType.Search,
    selected: false,
    onPress: () => console.log(123),
  },
  {
    buttonTitle: '전드라인',
    selected: false,
    onPress: () => console.log(123),
  },
];

export const HomeScreen = memo<IHomeScreenProps>(() => {
  const [articleList, setArticleList] = useState<IArticleType[] | []>([]);
  const { openModal } = useModal();

  const { getData } = useFetchArticle({
    beginDate: '20220101',
    endDate: '20220102',
    page: 1,
    query: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();

      if (!data) return;

      setArticleList(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    openModal({
      prop: <ArticleFilterView />,
    });
  }, []);

  return (
    <View style={styles.container}>
      <HeaderFilter filters={mock_data} />

      <ArticleListView articleList={articleList} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
