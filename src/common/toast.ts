import { Platform } from 'react-native';
import Toast from 'react-native-toast-message';

export const showSuccessToast = (message: string) => {
  Toast.show({
    type: 'success',
    text1: 'Success',
    text2: message,
    position: 'bottom',
    bottomOffset: Platform.OS === 'ios' ? 100 : 80,
  });
};
