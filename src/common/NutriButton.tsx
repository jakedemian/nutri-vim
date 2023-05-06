import { Pressable, Text, View } from 'native-base';
import React from 'react';

type Variant = 'primary' | 'alternate';

type NutriButtonProps = {
  text?: string;
  fullWidth?: boolean;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
};

const NutriButton: React.FC<NutriButtonProps> = ({
  text,
  fullWidth,
  onPress,
  variant = 'primary',
  disabled,
}) => {
  return (
    <View /*fullWidth={!!fullWidth} variant={variant}*/>
      <Pressable onPress={onPress} disabled={disabled}>
        <Text variant={variant}>{text || 'Button'}</Text>
      </Pressable>
    </View>
  );
};

export default NutriButton;
