/* eslint-disable no-relative-import-paths/no-relative-import-paths */
import React, { useRef } from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';
import Toast, { SuccessToast } from 'react-native-toast-message';
import { NativeBaseProvider } from 'native-base';
import { StatusBar } from 'expo-status-bar';

import RootNavigator from './src/RootNavigator';
import { ModalProvider } from './src/context/ModalContext';
import { theme } from './src/theme/theme';

// If using route params, add them here
// eslint-disable-next-line @typescript-eslint/ban-types
type RootStackParamList = {};
const queryClient = new QueryClient();

const toastConfig = {
  success: props => (
    <SuccessToast
      {...props}
      style={{
        backgroundColor: '#222',
        borderLeftColor: '#64E38D',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#64E38D',
        width: 250,
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 18,
        fontWeight: '400',
        color: '#64E38D',
      }}
      text2Style={{
        fontSize: 16,
        fontWeight: '400',
        color: 'white',
      }}
    />
  ),
};

export default function App() {
  const navigation = useRef<NavigationContainerRef<RootStackParamList>>(null);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider theme={theme}>
          <StatusBar style="light" />
          <NavigationContainer ref={navigation}>
            <ModalProvider>
              <RootNavigator />
            </ModalProvider>
          </NavigationContainer>
          <Toast config={toastConfig} />
        </NativeBaseProvider>
      </QueryClientProvider>
    </>
  );
}
