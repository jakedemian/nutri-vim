import React from 'react';
import styled from 'styled-components/native';

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
    <StyledButton fullWidth={!!fullWidth} variant={variant}>
      <StyledPressable onPress={onPress} disabled={disabled}>
        <StyledText variant={variant}>{text || 'Button'}</StyledText>
      </StyledPressable>
    </StyledButton>
  );
};

const StyledButton = styled.View<{
  fullWidth: boolean;
  variant: Variant;
}>`
  background-color: ${props =>
    props.variant === 'primary'
      ? props.theme.colors.primary
      : props.theme.colors.white};
  padding: 4px 16px;
  border-radius: 2px;
  width: ${props => (props.fullWidth ? '100%' : 'auto')};
  margin: 0;
`;

const StyledPressable = styled.Pressable`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const StyledText = styled.Text<{ variant: Variant }>`
  color: ${props =>
    props.variant === 'primary'
      ? props.theme.colors.white
      : props.theme.colors.primary};
`;

export default NutriButton;
