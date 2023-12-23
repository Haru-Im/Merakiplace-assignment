import { NavigationContainer } from '@react-navigation/native';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FontProvider } from './providers';
import { RootStack } from './screens';

const queryClient = new QueryClient();

export default function App() {
  return (
    <FontProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </QueryClientProvider>
    </FontProvider>
  );
}
