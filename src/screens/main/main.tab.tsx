import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { memo } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { IRootStackParamList } from '../root.stack';
import { scaleSize } from '../../shared';
import { IHomeScreenParamList, HomeScreen } from '../home';
import { IScrapScreenParamList, ScrapScreen } from '../scrap';
import { View } from 'react-native';

export type IMainTabNavigationProp = NativeStackNavigationProp<
  IRootStackParamList,
  'MainTab',
  undefined
>;
export type IMainTabRouteProp = RouteProp<IRootStackParamList, 'MainTab'>;

export type IMainTabProps = {
  navigation: IMainTabNavigationProp;
  route: IMainTabRouteProp;
};

export type IMainTabParamsList = {
  HomeScreen: NavigatorScreenParams<IHomeScreenParamList>;
  ScrapScreen: NavigatorScreenParams<IScrapScreenParamList>;
};

const Tab = createBottomTabNavigator<IMainTabParamsList>();

export const MainTab = memo<IMainTabProps>(({ navigation, route }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="HomeScreen"
    >
      <Tab.Screen
        options={{
          title: '홈',
          tabBarIcon: ({ focused }) => (
            <View />
            // <Foundation name="home" size={24} color={focused ? 'black' : '#b4b4b4'} />
          ),
          ...tabBarStyles,
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          title: '스크랩',
          tabBarIcon: ({ focused }) => (
            <View />
            // <MaterialIcons name="article" size={24} color={focused ? 'black' : '#b4b4b4'} />
          ),
          ...tabBarStyles,
        }}
        name="ScrapScreen"
        component={ScrapScreen}
      />
    </Tab.Navigator>
  );
});

const tabBarStyles = {
  tabBarInactiveTintColor: '#b4b4b4',
  tabBarActiveTintColor: 'black',
  tabBarLabelStyle: { fontFamily: 'Apple-800', fontSize: 12 },
};

const tabBarTheme = {
  tabBarStyle: {
    height: scaleSize(85),
    paddingTop: scaleSize(10),
    borderTopStartRadius: scaleSize(24),
    borderTopEndRadius: scaleSize(24),
  },
};
