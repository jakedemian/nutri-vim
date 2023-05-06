import * as React from 'react';
import { Text, View } from 'native-base';

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
    <NutrivimModal visible={visible} hide={hide} title="Clear Day?">
      <Text>
        Clear all of today&apos;s entries? Your calorie count will be reset.
      </Text>
      <View>
        <NutriButton
          text="Reset Data"
          onPress={() => {
            clearFoodEntries();
            hide();
          }}
        />
        <NutriButton text="Go Back" onPress={() => hide()} />
      </View>
    </NutrivimModal>
  );
};

export default ClearDayModal;
