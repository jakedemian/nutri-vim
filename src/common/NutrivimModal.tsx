import * as React from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { View } from 'native-base';

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
      <TouchableOpacity activeOpacity={1} onPressOut={() => hide()}>
        <TouchableWithoutFeedback>
          <View style={{ width: width }}>
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
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default NutrivimModal;
