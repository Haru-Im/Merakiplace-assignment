import { memo } from 'react';
import { RouteProp } from '@react-navigation/native';
import { IRootStackParamList } from '../root.stack';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import { StackNavigationProp } from '@react-navigation/stack';

export type IWebViewScreenNavigationProp = StackNavigationProp<
  IRootStackParamList,
  'WebViewScreen'
>;

export type IWebViewScreenRouteProp = RouteProp<IRootStackParamList, 'WebViewScreen'>;

export type IWebViewScreenProps = {
  navigation: IWebViewScreenNavigationProp;
  route: IWebViewScreenRouteProp;
};

export type IWebViewScreenParamsList = {
  linkUrl: string;
};

export const WebViewScreen = memo<IWebViewScreenProps>(({ navigation, route }) => {
  const { linkUrl } = route.params;
  return (
    <View style={{ flex: 1 }}>
      <WebView
        androidLayerType="software"
        startInLoadingState
        source={{ uri: linkUrl }}
        containerStyle={{ flex: 1 }}
      />
    </View>
  );
});
