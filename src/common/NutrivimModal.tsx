import * as React from 'react';
import { View, Modal, Button } from 'native-base';

type NutrivimModalProps = {
  children: React.ReactNode;
  hide: () => void;
  visible: boolean;
  title: string;
  buttonRow?: React.ReactNode;
};

const NutrivimModal: React.FC<NutrivimModalProps> = ({
  children,
  hide,
  visible,
  title,
  buttonRow,
}) => {
  return (
    <Modal
      animationPreset="slide"
      isOpen={visible}
      onClose={() => hide()}
      size="md"
    >
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header backgroundColor={'primary.800'}>{title}</Modal.Header>
        <Modal.Body backgroundColor={'primary.800'}>
          <View>{children}</View>
        </Modal.Body>
        {!!buttonRow && (
          <Modal.Footer backgroundColor={'primary.800'}>
            {buttonRow}
          </Modal.Footer>
        )}
      </Modal.Content>
    </Modal>
  );
};

export default NutrivimModal;
