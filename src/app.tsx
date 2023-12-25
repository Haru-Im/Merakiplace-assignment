import { NavigationContainer } from '@react-navigation/native';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  CustomToastProvider,
  FontProvider,
  ModalProvider,
  ScrapProvider,
  StorageProvider,
} from './providers';
import { RootStack } from './screens';

const queryClient = new QueryClient();

export default function App() {
  return (
    <StorageProvider>
      <FontProvider>
        <CustomToastProvider>
          <ModalProvider>
            <ScrapProvider>
              <QueryClientProvider client={queryClient}>
                <NavigationContainer>
                  <RootStack />
                </NavigationContainer>
              </QueryClientProvider>
            </ScrapProvider>
          </ModalProvider>
        </CustomToastProvider>
      </FontProvider>
    </StorageProvider>
  );
}
