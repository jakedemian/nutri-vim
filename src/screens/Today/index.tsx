import React from 'react';
import { View } from 'native-base';

import CalorieDisplay from 'src/screens/Today/CalorieDisplay';

const Today: React.FC = () => {
  return (
    <>
      <View>
        <CalorieDisplay />
      </View>
    </>
  );
};

export default Today;
