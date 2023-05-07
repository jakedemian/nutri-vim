import * as React from 'react';
import { Button, Text, View } from 'native-base';

import NutrivimModal from 'src/common/NutrivimModal';
import { useFoodEntries } from 'src/hooks/useFoodEntries';
import NutriButton from 'src/common/NutriButton';

type ClearDayModalProps = {
  visible: boolean;
  hide: () => void;
};

const ClearDayModal: React.FC<ClearDayModalProps> = ({ visible, hide }) => {
  const { clearFoodEntries } = useFoodEntries();

  return (
    <NutrivimModal
      visible={visible}
      hide={hide}
      title="Clear Day?"
      buttonRow={
        <Button.Group space={2}>
          <Button
            variant="ghost"
            colorScheme="blueGray"
            onPress={() => {
              hide();
            }}
          >
            Cancel
          </Button>
          <Button
            onPress={() => {
              clearFoodEntries();
              hide();
            }}
            backgroundColor="rose.900"
          >
            Clear Day
          </Button>
        </Button.Group>
      }
    >
      <Text>
        Clear all of today&apos;s entries? Your calorie count will be reset.
      </Text>
    </NutrivimModal>
  );
};

export default ClearDayModal;
