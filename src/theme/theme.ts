import { extendTheme } from 'native-base';

export const theme = extendTheme({
  colors: {
    primary: {
      50: '#A69AC2',
      100: '#8F81B3',
      200: '#7968A3',
      300: '#6A5799',
      400: '#55467A',
      500: '#4A3D6B',
      600: '#3A3054',
      700: '#2A233D',
      800: '#1B1626',
      900: '#15111F',
    },
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: 'dark',
  },
});
