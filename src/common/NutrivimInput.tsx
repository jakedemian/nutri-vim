import { Input } from 'native-base';
import React from 'react';
import {
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  TextInput,
} from 'react-native';

interface NutrivimInputProps {
  onChangeText: (text: string) => void;
  value?: string;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  mt?: number;
  onSubmitEditing?: () => void;
  refCallback?: (ref: TextInput) => void; // used for finding and tabbing to the next input
  returnKeyType?: ReturnKeyTypeOptions;
}

const NutrivimInput: React.FC<NutrivimInputProps> = props => {
  const {
    onChangeText,
    value,
    placeholder,
    keyboardType,
    mt,
    onSubmitEditing,
    refCallback,
    returnKeyType,
  } = props;

  return (
    <Input
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      keyboardType={keyboardType}
      returnKeyType={returnKeyType}
      mt={mt}
      onSubmitEditing={onSubmitEditing}
      blurOnSubmit={false}
      ref={refCallback}
    />
  );
};

export default NutrivimInput;
