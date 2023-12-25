import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { memo } from 'react';
import { RouteProp } from '@react-navigation/native';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { IMainTabParamsList } from '../main';

import {
  ArticleFilterView,
  ArticleListView,
  CtaButton,
  EIconType,
  HeaderFilter,
  SheetSvgComponent,
  scaleSize,
} from '../../shared';

import { useModal } from '../../providers';
import { GLOCATIONS_KO } from '../../types';
import { useFetchArticle } from './hooks';

export type IScrapScreenParamList = {};

export type IScrapScreenNavigationProp = NativeStackNavigationProp<
  IMainTabParamsList,
  'ScrapScreen',
  undefined
>;
export type IScrapScreenRouteProp = RouteProp<IMainTabParamsList, 'ScrapScreen'>;

type IScrapScreenProps = {
  navigation: IScrapScreenNavigationProp;
  route: IScrapScreenRouteProp;
};

export const ScrapScreen = memo<IScrapScreenProps>(({ navigation }) => {
  const { openModal } = useModal();

  const { fetchMore, articleList, applyFilter, isFetching, filter, isEmpty } = useFetchArticle();

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

  if (isFetching) {
    return (
      <View style={styles.container}>
        <HeaderFilter filters={filters} />
        <View style={styles.articleListWrapper}>
          {isFetching && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#8e9192" />
            </View>
          )}
        </View>
      </View>
    );
  }

  if (isEmpty) {
    return (
      <View style={styles.container}>
        <View style={styles.centerView}>
          <View style={{ gap: 20 }}>
            <View style={{ alignItems: 'center', gap: 8 }}>
              <SheetSvgComponent stroke="#6D6D6D" />
              <Text>{'저장된 스크랩이 없습니다'}</Text>
            </View>
            <CtaButton
              paddingX={100}
              title="스크랩 하러 가기"
              onPress={() => {
                //@ts-ignore
                navigation.navigate('HomeScreen');
              }}
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderFilter filters={filters} />
      <View style={styles.articleListWrapper}>
        <ArticleListView articleList={articleList} fetchMore={fetchMore} />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F1F4',
  },
  centerView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
