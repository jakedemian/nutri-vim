import * as React from 'react';
import { View, Modal } from 'native-base';

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
        <Modal.Header
          borderColor={'#0000'}
          borderStyle={'dashed'}
          backgroundColor={'primary.900'}
          mb={-1} // hiding the weird gray "border"
        >
          {title}
        </Modal.Header>
        <Modal.Body backgroundColor={'primary.900'}>
          <View>{children}</View>
        </Modal.Body>
        {!!buttonRow && (
          <Modal.Footer backgroundColor={'primary.900'} borderColor={'#0000'}>
            {buttonRow}
          </Modal.Footer>
        )}
      </Modal.Content>
    </Modal>
  );
};

export default NutrivimModal;
