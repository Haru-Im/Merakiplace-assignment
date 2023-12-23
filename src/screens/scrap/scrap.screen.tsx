import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { memo } from 'react';
import { RouteProp } from '@react-navigation/native';
import { IMainTabParamsList } from '../main';
import { View, Text } from 'react-native';

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

export const ScrapScreen = memo<IScrapScreenProps>(({ navigation, route }) => {
  return (
    <View>
      <Text>Scrap</Text>
    </View>
  );
});
