import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import { IMainTabParamsList, MainTab } from './main';
import { IWebViewScreenParamsList, WebViewScreen } from './web-view';

export type IRootStackParamList = {
  MainTab: NavigatorScreenParams<IMainTabParamsList>;
  WebViewScreen: IWebViewScreenParamsList;
};

const Stack = createNativeStackNavigator<IRootStackParamList>();

export const RootStack = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainTab" component={MainTab} />
      <Stack.Screen name="WebViewScreen" component={WebViewScreen} />
    </Stack.Navigator>
  );
};
