import { NavigationContainer } from '@react-navigation/native';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FontProvider, ModalProvider } from './providers';
import { RootStack } from './screens';

const queryClient = new QueryClient();

export default function App() {
  return (
    <FontProvider>
      <ModalProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </QueryClientProvider>
      </ModalProvider>
    </FontProvider>
  );
}
