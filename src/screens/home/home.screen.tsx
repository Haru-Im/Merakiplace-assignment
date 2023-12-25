import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { memo } from 'react';
import { RouteProp } from '@react-navigation/native';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { IMainTabParamsList } from '../main';
import { useFetchArticle } from './hooks';
import {
  ArticleFilterView,
  ArticleListView,
  EIconType,
  HeaderFilter,
  scaleSize,
} from '../../shared';

import { useModal } from '../../providers';
import { GLOCATIONS_KO } from '../../types';

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

export const HomeScreen = memo<IHomeScreenProps>(() => {
  const { openModal } = useModal();

  const { fetchMore, articleList, applyFilter, isFetching, filter } = useFetchArticle();

  const openFilterModal = () => {
    openModal({
      prop: (
        <ArticleFilterView
          filter={filter}
          glocations={Object.values(GLOCATIONS_KO)}
          applyFilter={applyFilter}
        />
      ),
    });
  };

  const filters = [
    {
      buttonTitle: '전체 헤드라인',
      buttonIconType: EIconType.Search,
      selected: false,
      onPress: openFilterModal,
      value: filter.queryValue,
    },
    {
      buttonTitle: '전체날짜',
      buttonIconType: EIconType.Calendar,
      selected: false,
      onPress: openFilterModal,
      value: filter.dateValue,
    },
    {
      buttonTitle: '전체국가',
      selected: false,
      onPress: openFilterModal,
      value: filter.countryValue,
    },
  ];

  return (
    <View style={styles.container}>
      <HeaderFilter filters={filters} />
      <View style={styles.articleListWrapper}>
        {isFetching && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#8e9192" />
          </View>
        )}
        {!isFetching && <ArticleListView articleList={articleList} fetchMore={fetchMore} />}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F1F4',
  },
  articleListWrapper: {
    flex: 1,
    paddingHorizontal: scaleSize(20),
    paddingTop: scaleSize(20),
    justifyContent: 'center',
  },
  loadingContainer: {
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    position: 'absolute',
    alignSelf: 'center',
  },
});
