import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { memo } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { IRootStackParamList } from '../root.stack';
import { HomeSvgComponent, SheetSvgComponent, scaleSize } from '../../shared';
import { IHomeScreenParamList, HomeScreen } from '../home';
import { IScrapScreenParamList, ScrapScreen } from '../scrap';

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
        ...tabBarTheme,
      }}
      initialRouteName="HomeScreen"
    >
      <Tab.Screen
        options={{
          title: '홈',
          tabBarIcon: ({ focused }) => <HomeSvgComponent fill={focused ? 'white' : '#b4b4b4'} />,
          ...tabBarStyles,
        }}
        name="HomeScreen"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          title: '스크랩',
          tabBarIcon: ({ focused }) => <SheetSvgComponent stroke={focused ? 'white' : '#b4b4b4'} />,
          ...tabBarStyles,
          unmountOnBlur: true,
        }}
        name="ScrapScreen"
        component={ScrapScreen}
      />
    </Tab.Navigator>
  );
});

const tabBarStyles = {
  tabBarInactiveTintColor: '#b4b4b4',
  tabBarActiveTintColor: 'white',
  tabBarLabelStyle: { fontFamily: 'Pretendard-Bold', fontSize: 12 },
};

const tabBarTheme = {
  tabBarStyle: {
    height: scaleSize(100),
    paddingTop: scaleSize(10),
    borderTopStartRadius: scaleSize(24),
    borderTopEndRadius: scaleSize(24),
    borderBottomStartRadius: scaleSize(24),
    borderBottomEndRadius: scaleSize(24),
    backgroundColor: 'black',
  },
};
