import { useRef, useCallback } from 'react';
import { TextInput } from 'react-native';

export const useInputFocus = () => {
  const inputRefs = useRef<{ [key: string]: TextInput }>({});

  const setInputRef = useCallback((key: string, ref: TextInput) => {
    inputRefs.current[key] = ref;
  }, []);

  const focusNextInput = useCallback((key: string) => {
    if (inputRefs.current[key]) {
      inputRefs.current[key].focus();
    }
  }, []);

  return { setInputRef, focusNextInput };
};
