import * as React from 'react';
import { Modal, Text, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';

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
            <Text>{title}</Text>
            {children}
          </Content>
        </TouchableWithoutFeedback>
      </CenteredTouchable>
    </Modal>
  );
};

const Content = styled.View`
  margin: 20px;
  background-color: white;
  border-radius: 20px;
  padding: 35px;
  align-items: center;
  /* shadow-color: '#000'; */
  /* shadow-offset: {
    width: 0,
    height: 2,
  }, */
  /* shadow-opacity: 0.25;
  shadow-radius: 4;
  elevation: 5; */
`;

const CenteredTouchable = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default NutrivimModal;
