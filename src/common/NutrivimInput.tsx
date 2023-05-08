import { Input } from 'native-base';
import React from 'react';
import { TextInput, KeyboardTypeOptions } from 'react-native';

type NutrivimInputProps = {
  onChangeText: (text: string) => void;
  value?: string;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
  mt?: number;
  onSubmitEditing?: () => void;
  refCallback?: (ref: TextInput) => void;
};

const NutrivimInput: React.FC<NutrivimInputProps> = props => {
  const {
    onChangeText,
    value,
    placeholder,
    keyboardType,
    mt,
    onSubmitEditing,
    refCallback,
  } = props;

  return (
    <Input
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      keyboardType={keyboardType}
      mt={mt}
      onSubmitEditing={onSubmitEditing}
      blurOnSubmit={false}
      ref={refCallback}
    />
  );
};

export default NutrivimInput;
