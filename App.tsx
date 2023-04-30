/* eslint-disable no-relative-import-paths/no-relative-import-paths */
import React, { useRef } from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';

import RootNavigator from './src/RootNavigator';
import { ModalProvider } from './src/context/ModalContext';

// If using route params, add them here
// eslint-disable-next-line @typescript-eslint/ban-types
type RootStackParamList = {};
const queryClient = new QueryClient();

export default function App() {
  const navigation = useRef<NavigationContainerRef<RootStackParamList>>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer ref={navigation}>
        <ModalProvider>
          <RootNavigator />
        </ModalProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
