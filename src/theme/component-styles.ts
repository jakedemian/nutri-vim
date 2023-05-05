import styled from 'styled-components/native';
import Color from 'color';

/////////////////////////////
// Modals
export const ModalInput = styled.TextInput.attrs({
  placeholderTextColor: '#aaa',
})`
  height: 40px;
  margin: 6px;
  border-width: 1px;
  padding: 10px;
  background-color: #444;
  color: white;
`;

export const ModalText = styled.Text`
  color: white;
`;

export const ModalAndroidTimeText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 18px;
`;

export const ModalChangeTimeButton = styled.Text`
  color: ${({ theme }) => Color(theme.colors.primary).lighten(0.1).hex()};
  font-weight: 700;
  font-size: 16px;
`;

export const ModalButtonsWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 32px;
  gap: 8px;
`;
