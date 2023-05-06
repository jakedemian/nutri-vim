import { Text, View } from 'native-base';
import React from 'react';

import { useFoodEntries } from 'src/hooks/useFoodEntries';

const CalorieDisplay = () => {
  const { isLoading, calorieCount } = useFoodEntries();

  return (
    <>
      <View>
        <Text>{isLoading ? '----' : calorieCount}</Text>
        <Text>calories</Text>
      </View>
    </>
  );
};

export default CalorieDisplay;
