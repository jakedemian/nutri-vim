import * as React from 'react';
import { Modal, Text, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import Color from 'color';

type NutrivimModalProps = {
  children: React.ReactNode;
  hide: () => void;
  visible: boolean;
  title: string;
  onShow?: () => void;
  width?: number;
};

const NutrivimModal: React.FC<NutrivimModalProps> = ({
  children,
  hide,
  visible,
  title,
  onShow,
  width = 256,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => hide()}
      onShow={onShow}
    >
      <CenteredTouchable activeOpacity={1} onPressOut={() => hide()}>
        <TouchableWithoutFeedback>
          <Content style={{ width: width }}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                marginBottom: 16,
                fontWeight: '700',
              }}
            >
              {title}
            </Text>
            {children}
          </Content>
        </TouchableWithoutFeedback>
      </CenteredTouchable>
    </Modal>
  );
};

const Content = styled.View`
  margin: 20px;
  background-color: ${({ theme }) =>
    Color(theme.colors.primary).darken(0.7).desaturate(0.9).hex()};
  border-radius: 4px;
  padding: 35px;
  align-items: center;
`;

const CenteredTouchable = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default NutrivimModal;
