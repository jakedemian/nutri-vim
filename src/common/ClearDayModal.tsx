import * as React from 'react';

import NutrivimModal from 'src/common/NutrivimModal';
import { useFoodEntries } from 'src/hooks/useFoodEntries';
import NutriButton from 'src/common/NutriButton';
import { ModalButtonsWrapper, ModalText } from 'src/theme/component-styles';

type ClearDayModalProps = {
  visible: boolean;
  hide: () => void;
};

const ClearDayModal: React.FC<ClearDayModalProps> = ({ visible, hide }) => {
  const { clearFoodEntries } = useFoodEntries();

  return (
    <NutrivimModal visible={visible} hide={hide} title="Clear Day?">
      <ModalText>
        Clear all of today&apos;s entries? Your calorie count will be reset.
      </ModalText>
      <ModalButtonsWrapper>
        <NutriButton
          text="Reset Data"
          onPress={() => {
            clearFoodEntries();
            hide();
          }}
        />
        <NutriButton text="Go Back" onPress={() => hide()} />
      </ModalButtonsWrapper>
    </NutrivimModal>
  );
};

export default ClearDayModal;
