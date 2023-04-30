import * as React from 'react';
import { Button, Text } from 'react-native';

import NutrivimModal from 'src/common/NutrivimModal';
import { useFoodEntries } from 'src/hooks/useFoodEntries';

type ClearDayModalProps = {
  visible: boolean;
  hide: () => void;
};

const ClearDayModal: React.FC<ClearDayModalProps> = ({ visible, hide }) => {
  const { clearFoodEntries } = useFoodEntries();

  return (
    <NutrivimModal visible={visible} hide={hide} title="Clear Day?">
      <Text>Clear day modal!</Text>
      <Button
        title="Reset Data"
        onPress={() => {
          clearFoodEntries();
          hide();
        }}
      />
      <Button title="Go Back" onPress={() => hide()} />
    </NutrivimModal>
  );
};

export default ClearDayModal;
