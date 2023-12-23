import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { memo, useState } from 'react';
import { RouteProp } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { IMainTabParamsList } from '../main';
import { CtaButton } from '../../shared';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getData } from '../../api';

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
  const [newsList, setNewsList] = useState([]);

  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ['search'],
    queryFn: ({ pageParam = 1 }) => {
      //@ts-ignore
      getData({ pageParam });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const nextPage = pages.length + 1;
      return 1;
      // return lastPage?.data?.length === 0 ? undefined : nextPage;
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.buttonWrapper}>
        <CtaButton title="필터 적용하기" />
      </View>
      <View>
        {newsList.map((list, index) => {
          return <View />;
        })}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonWrapper: {
    width: 250,
    height: 100,
  },
});
