import { Input } from 'native-base';
import React from 'react';
import { KeyboardTypeOptions } from 'react-native';

type NutrivimInputProps = React.ComponentProps<typeof Input> & {
  onChangeText: (value: string) => void;
  value: string | undefined;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions;
};

const NutrivimInput: React.FC<NutrivimInputProps> = ({
  onChangeText,
  value,
  placeholder,
  keyboardType,
  ...props
}) => {
  return (
    <Input
      {...props}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      borderWidth={0}
      backgroundColor="primary.800"
      color="white"
      fontWeight={700}
      placeholderTextColor="primary.400"
      cursorColor={'white'}
      keyboardType={keyboardType || undefined}
    />
  );
};

export default NutrivimInput;
