import { FC, ReactNode } from 'react';
import { useCallback } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';

type FontProviderProps = {
  children: ReactNode;
};

export const FontProvider: FC<FontProviderProps> = ({ children }) => {
  // const [fontsLoaded] = useFonts({
  //   'Apple-900': require('../../../assets/fonts/AppleSDGothicNeoH.ttf'),
  //   'Apple-800': require('../../../assets/fonts/AppleSDGothicNeoEB.ttf'),
  //   'Apple-700': require('../../../assets/fonts/AppleSDGothicNeoB.ttf'),
  //   'Apple-600': require('../../../assets/fonts/AppleSDGothicNeoSB.ttf'),
  //   'Apple-500': require('../../../assets/fonts/AppleSDGothicNeoM.ttf'),
  //   'Apple-400': require('../../../assets/fonts/AppleSDGothicNeoR.ttf'),
  //   'Apple-300': require('../../../assets/fonts/AppleSDGothicNeoL.ttf'),
  //   'Apple-200': require('../../../assets/fonts/AppleSDGothicNeoUL.ttf'),
  //   'Apple-100': require('../../../assets/fonts/AppleSDGothicNeoT.ttf'),
  // });

  const fontsLoaded = true;

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hide();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
