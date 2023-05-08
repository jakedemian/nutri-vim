import { Input } from 'native-base';
import React, { useState } from 'react';
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
  refCallback?: (ref: TextInput) => void;
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
  const [localValue, setLocalValue] = useState<string | undefined>(value);

  const handleBlur = () => {
    onChangeText(localValue as string);
  };

  return (
    <Input
      onChangeText={setLocalValue}
      value={localValue}
      placeholder={placeholder}
      keyboardType={keyboardType}
      returnKeyType={returnKeyType}
      mt={mt}
      onSubmitEditing={onSubmitEditing}
      onBlur={handleBlur}
      blurOnSubmit={false}
      ref={refCallback}
    />
  );
};

export default NutrivimInput;
