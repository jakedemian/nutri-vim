import { Flex, Text } from 'native-base';
import React from 'react';

import { useFoodEntries } from 'src/hooks/useFoodEntries';

const CalorieDisplay = () => {
  const { isLoading, calorieCount } = useFoodEntries();

  const CALORIE_COUNT_SIZE = 96;
  const CALORIES_LABEL_SIZE = 24;

  return (
    <>
      <Flex alignItems="center" justifyContent="center" height="100%">
        <Text
          color="#fff"
          fontSize={CALORIE_COUNT_SIZE}
          lineHeight={CALORIE_COUNT_SIZE}
        >
          {isLoading ? '----' : calorieCount}
        </Text>
        <Text
          color="#fff"
          fontSize={CALORIES_LABEL_SIZE}
          lineHeight={CALORIES_LABEL_SIZE}
        >
          calories
        </Text>
      </Flex>
    </>
  );
};

export default CalorieDisplay;
