import 'styled-components/native';
import 'styled-components-react-native';
import { Theme } from 'styled-components/native';

declare module 'styled-components/native' {
  export interface DefaultTheme extends Theme {
    colors: {
      primary: string;
      success: string;
      error: string;
    };
  }
}
